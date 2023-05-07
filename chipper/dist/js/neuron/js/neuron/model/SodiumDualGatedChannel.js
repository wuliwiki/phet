// Copyright 2014-2021, University of Colorado Boulder
/**
 * A gated channel through which sodium passes when the channel is open.  This implementation has two different gates,
 * which is apparently closer to real- life voltage-gated sodium channels.
 *
 * @author John Blanco
 * @author Sharfudeen Ashraf (for Ghent University)
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import neuron from '../../neuron.js';
import MathUtils from '../common/MathUtils.js';
import NeuronConstants from '../common/NeuronConstants.js';
import DualGateChannelTraversalMotionStrategy from './DualGateChannelTraversalMotionStrategy.js';
import GatedChannel from './GatedChannel.js';
import MembraneChannelTypes from './MembraneChannelTypes.js';
import MembraneCrossingDirection from './MembraneCrossingDirection.js';
import ParticleType from './ParticleType.js';
import PieSliceShapedCaptureZone from './PieSliceShapedCaptureZone.js';

// constants
const CHANNEL_HEIGHT = NeuronConstants.MEMBRANE_THICKNESS * 1.2; // In nanometers.
const CHANNEL_WIDTH = NeuronConstants.MEMBRANE_THICKNESS * 0.50; // In nanometers.

// Constant used when calculating how open this gate should be based on a value that exists within the Hodgkin-Huxley
// model.  This was empirically determined.
const M3H_WHEN_FULLY_OPEN = 0.25;

// Possible values for internal state.
const GateState = {
  IDLE: 'IDLE',
  OPENING: 'OPENING',
  BECOMING_INACTIVE: 'BECOMING_INACTIVE',
  INACTIVATED: 'INACTIVATED',
  RESETTING: 'RESETTING'
};

// verify that enum is immutable without the runtime penalty in production code
if (assert) {
  Object.freeze(GateState);
}

// Values used for deciding on state transitions.  These were empirically determined.
const ACTIVATION_DECISION_THRESHOLD = 0.002;
const FULLY_INACTIVE_DECISION_THRESHOLD = 0.98;

// Values used for timed state transitions.
const INACTIVE_TO_RESETTING_TIME = 0.001; // In seconds of sim time.
const RESETTING_TO_IDLE_TIME = 0.001; // In seconds of sim time.

// Constants that control the rate at which this channel will capture ions when it is open.  Smaller numbers here will
// increase the capture rate and thus make the flow appear to be faster.
const MIN_INTER_CAPTURE_TIME = 0.00003; // In seconds of sim time.
const MAX_INTER_CAPTURE_TIME = 0.00013; // In seconds of sim time.

// Delay range - used to make the timing of the instances of this gate vary a little bit in terms of when they open
// and close.
const MAX_STAGGER_DELAY = NeuronConstants.MIN_ACTION_POTENTIAL_CLOCK_DT * 5; // In seconds of sim time.

class SodiumDualGatedChannel extends GatedChannel {
  /**
   * @param {NeuronModel} modelContainingParticles
   * @param {ModifiedHodgkinHuxleyModel} hodgkinHuxleyModel
   */
  constructor(modelContainingParticles, hodgkinHuxleyModel) {
    super(CHANNEL_WIDTH, CHANNEL_HEIGHT, modelContainingParticles);
    this.gateState = GateState.IDLE;
    this.hodgkinHuxleyModel = hodgkinHuxleyModel;
    this.stateTransitionTimer = 0;
    this.staggerDelay = 0;
    this.previousNormalizedConductance = 0;
    this.setExteriorCaptureZone(new PieSliceShapedCaptureZone(this.getCenterPosition(), CHANNEL_WIDTH * 5, 0, Math.PI * 0.7));
    this.reset();
    this.channelColor = NeuronConstants.SODIUM_COLOR.colorUtilsDarker(0.2);
  }

  // @public
  stepInTime(dt) {
    // A note to maintainers: originally, several properties were maintained that were observed in the view, such as
    // openness and inactivation.  Handling these separately compromised performance, so a flag was added to mark
    // whether any change occurred, and if so, the view knows to update the representation.
    const prevOpenness = this.openness;
    const prevInActivationAmt = this.inactivationAmount;
    super.stepInTime(dt);

    // Get the conductance normalized from 0 to 1.
    let normalizedConductance = this.calculateNormalizedConductance();
    assert && assert(normalizedConductance >= 0 && normalizedConductance <= 1, `SodiumDualGatedChannel normalized conductance out of range, = ${normalizedConductance}`);

    // Trim off some digits to limit very small changes.
    normalizedConductance = MathUtils.round(normalizedConductance, 4);

    // Update the state.
    switch (this.gateState) {
      case GateState.IDLE:
        if (normalizedConductance > ACTIVATION_DECISION_THRESHOLD) {
          // We are opening, change to the appropriate state.
          this.setOpenness(this.mapOpennessToNormalizedConductance(normalizedConductance));
          this.gateState = GateState.OPENING;
        }
        break;
      case GateState.OPENING:
        // We are on the way down, so set a new state.
        if (this.isOpen() && this.getCaptureCountdownTimer() === Number.POSITIVE_INFINITY) {
          // We are open enough to start capturing particles.
          this.restartCaptureCountdownTimer(true);
        }
        if (this.previousNormalizedConductance > normalizedConductance) {
          this.gateState = GateState.BECOMING_INACTIVE;
          // Should be fully open at this point.
          this.setOpenness(1);
        } else {
          // Set the openness based on the normalized conductance value. Note the non-linear mapping.  This was done
          // to make them appear to be fully open earlier in the action potential, which was requested by the
          // Integrated Physiology folks.
          this.setOpenness(this.mapOpennessToNormalizedConductance(normalizedConductance));
        }
        break;
      case GateState.BECOMING_INACTIVE:
        if (this.getInactivationAmount() < FULLY_INACTIVE_DECISION_THRESHOLD) {
          // Not yet fully inactive - update the level.  Note the non-
          // linear mapping to the conductance amount.
          this.setInactivationAmount(1 - Math.pow(normalizedConductance, 7));
        } else {
          // Fully inactive, move to next state.
          this.setInactivationAmount(1);
          this.gateState = GateState.INACTIVATED;
          this.stateTransitionTimer = INACTIVE_TO_RESETTING_TIME;
        }
        break;
      case GateState.INACTIVATED:
        this.stateTransitionTimer -= dt;
        if (this.stateTransitionTimer < 0) {
          // Time to start resetting.
          this.gateState = GateState.RESETTING;
          this.stateTransitionTimer = RESETTING_TO_IDLE_TIME;
        }
        break;
      case GateState.RESETTING:
        this.stateTransitionTimer -= dt;
        if (this.stateTransitionTimer >= 0) {
          // Move the values of openness and activation back towards their idle (i.e. resting) states.  The mapping of
          // the inactivation amount as a function of time is very non- linear.  This is because the IPHY people
          // requested that the "little ball doesn't pop out" until the gate has closed up.
          this.setOpenness(1 - Math.pow(this.stateTransitionTimer / RESETTING_TO_IDLE_TIME - 1, 10));
          this.setInactivationAmount(1 - Math.pow(this.stateTransitionTimer / RESETTING_TO_IDLE_TIME - 1, 20));
        } else {
          // Go back to the idle, or resting, state.
          this.setOpenness(0);
          this.setInactivationAmount(0);
          this.updateStaggerDelay();
          this.gateState = GateState.IDLE;
        }
        break;
      default:
        throw new Error(`invalid gateState: ${this.gateState}`);
    }

    // Save values for the next time through.
    this.previousNormalizedConductance = normalizedConductance;
    this.notifyIfMembraneStateChanged(prevOpenness, prevInActivationAmt);
  }

  // @public, @override
  reset() {
    super.reset();

    // Set up the capture time range, which will be used to control the rate of particle capture when this gate is open.
    this.setMinInterCaptureTime(MIN_INTER_CAPTURE_TIME);
    this.setMaxInterCaptureTime(MAX_INTER_CAPTURE_TIME);

    // Initialize some internal state.
    this.gateState = GateState.IDLE;
    this.stateTransitionTimer = 0;
    if (this.hodgkinHuxleyModel) {
      this.previousNormalizedConductance = this.calculateNormalizedConductance();
    }

    // Initialize the stagger delay.
    this.updateStaggerDelay();
  }

  // @public, @override
  getState() {
    const state = super.getState();
    state.inactivationAmount = this.inactivationAmount;
    state.previousNormalizedConductance = this.previousNormalizedConductance;
    state.gateState = this.gateState;
    state.stateTransitionTimer = this.stateTransitionTimer;
    return state;
  }

  // @public, @override
  setState(state) {
    this.gateState = state.gateState;
    this.previousNormalizedConductance = state.previousNormalizedConductance;
    this.stateTransitionTimer = state.stateTransitionTimer;
    super.setState(state);
  }

  // @public, @override
  getChannelColor() {
    return this.channelColor;
  }

  // @public, @override
  getEdgeColor() {
    return NeuronConstants.SODIUM_COLOR;
  }

  // @public, @override
  getParticleTypeToCapture() {
    return ParticleType.SODIUM_ION;
  }

  // @private
  updateStaggerDelay() {
    this.staggerDelay = dotRandom.nextDouble() * MAX_STAGGER_DELAY;
  }

  // @public, @override
  chooseCrossingDirection() {
    return MembraneCrossingDirection.OUT_TO_IN;
  }

  // @public, @override
  getHasInactivationGate() {
    return true;
  }

  // @public, @override
  moveParticleThroughNeuronMembrane(particle, maxVelocity) {
    particle.setMotionStrategy(new DualGateChannelTraversalMotionStrategy(this, particle.getPositionX(), particle.getPositionY()));
  }

  // @private
  mapOpennessToNormalizedConductance(normalizedConductance) {
    assert && assert(normalizedConductance >= 0 && normalizedConductance <= 1);
    return 1 - Math.pow(normalizedConductance - 1, 20);
  }

  // @private
  calculateNormalizedConductance() {
    return Math.min(Math.abs(this.hodgkinHuxleyModel.get_delayed_m3h(this.staggerDelay)) / M3H_WHEN_FULLY_OPEN, 1);
  }

  // @public, @override
  getChannelType() {
    return MembraneChannelTypes.SODIUM_GATED_CHANNEL;
  }
}
neuron.register('SodiumDualGatedChannel', SodiumDualGatedChannel);
export default SodiumDualGatedChannel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkb3RSYW5kb20iLCJuZXVyb24iLCJNYXRoVXRpbHMiLCJOZXVyb25Db25zdGFudHMiLCJEdWFsR2F0ZUNoYW5uZWxUcmF2ZXJzYWxNb3Rpb25TdHJhdGVneSIsIkdhdGVkQ2hhbm5lbCIsIk1lbWJyYW5lQ2hhbm5lbFR5cGVzIiwiTWVtYnJhbmVDcm9zc2luZ0RpcmVjdGlvbiIsIlBhcnRpY2xlVHlwZSIsIlBpZVNsaWNlU2hhcGVkQ2FwdHVyZVpvbmUiLCJDSEFOTkVMX0hFSUdIVCIsIk1FTUJSQU5FX1RISUNLTkVTUyIsIkNIQU5ORUxfV0lEVEgiLCJNM0hfV0hFTl9GVUxMWV9PUEVOIiwiR2F0ZVN0YXRlIiwiSURMRSIsIk9QRU5JTkciLCJCRUNPTUlOR19JTkFDVElWRSIsIklOQUNUSVZBVEVEIiwiUkVTRVRUSU5HIiwiYXNzZXJ0IiwiT2JqZWN0IiwiZnJlZXplIiwiQUNUSVZBVElPTl9ERUNJU0lPTl9USFJFU0hPTEQiLCJGVUxMWV9JTkFDVElWRV9ERUNJU0lPTl9USFJFU0hPTEQiLCJJTkFDVElWRV9UT19SRVNFVFRJTkdfVElNRSIsIlJFU0VUVElOR19UT19JRExFX1RJTUUiLCJNSU5fSU5URVJfQ0FQVFVSRV9USU1FIiwiTUFYX0lOVEVSX0NBUFRVUkVfVElNRSIsIk1BWF9TVEFHR0VSX0RFTEFZIiwiTUlOX0FDVElPTl9QT1RFTlRJQUxfQ0xPQ0tfRFQiLCJTb2RpdW1EdWFsR2F0ZWRDaGFubmVsIiwiY29uc3RydWN0b3IiLCJtb2RlbENvbnRhaW5pbmdQYXJ0aWNsZXMiLCJob2Rna2luSHV4bGV5TW9kZWwiLCJnYXRlU3RhdGUiLCJzdGF0ZVRyYW5zaXRpb25UaW1lciIsInN0YWdnZXJEZWxheSIsInByZXZpb3VzTm9ybWFsaXplZENvbmR1Y3RhbmNlIiwic2V0RXh0ZXJpb3JDYXB0dXJlWm9uZSIsImdldENlbnRlclBvc2l0aW9uIiwiTWF0aCIsIlBJIiwicmVzZXQiLCJjaGFubmVsQ29sb3IiLCJTT0RJVU1fQ09MT1IiLCJjb2xvclV0aWxzRGFya2VyIiwic3RlcEluVGltZSIsImR0IiwicHJldk9wZW5uZXNzIiwib3Blbm5lc3MiLCJwcmV2SW5BY3RpdmF0aW9uQW10IiwiaW5hY3RpdmF0aW9uQW1vdW50Iiwibm9ybWFsaXplZENvbmR1Y3RhbmNlIiwiY2FsY3VsYXRlTm9ybWFsaXplZENvbmR1Y3RhbmNlIiwicm91bmQiLCJzZXRPcGVubmVzcyIsIm1hcE9wZW5uZXNzVG9Ob3JtYWxpemVkQ29uZHVjdGFuY2UiLCJpc09wZW4iLCJnZXRDYXB0dXJlQ291bnRkb3duVGltZXIiLCJOdW1iZXIiLCJQT1NJVElWRV9JTkZJTklUWSIsInJlc3RhcnRDYXB0dXJlQ291bnRkb3duVGltZXIiLCJnZXRJbmFjdGl2YXRpb25BbW91bnQiLCJzZXRJbmFjdGl2YXRpb25BbW91bnQiLCJwb3ciLCJ1cGRhdGVTdGFnZ2VyRGVsYXkiLCJFcnJvciIsIm5vdGlmeUlmTWVtYnJhbmVTdGF0ZUNoYW5nZWQiLCJzZXRNaW5JbnRlckNhcHR1cmVUaW1lIiwic2V0TWF4SW50ZXJDYXB0dXJlVGltZSIsImdldFN0YXRlIiwic3RhdGUiLCJzZXRTdGF0ZSIsImdldENoYW5uZWxDb2xvciIsImdldEVkZ2VDb2xvciIsImdldFBhcnRpY2xlVHlwZVRvQ2FwdHVyZSIsIlNPRElVTV9JT04iLCJuZXh0RG91YmxlIiwiY2hvb3NlQ3Jvc3NpbmdEaXJlY3Rpb24iLCJPVVRfVE9fSU4iLCJnZXRIYXNJbmFjdGl2YXRpb25HYXRlIiwibW92ZVBhcnRpY2xlVGhyb3VnaE5ldXJvbk1lbWJyYW5lIiwicGFydGljbGUiLCJtYXhWZWxvY2l0eSIsInNldE1vdGlvblN0cmF0ZWd5IiwiZ2V0UG9zaXRpb25YIiwiZ2V0UG9zaXRpb25ZIiwibWluIiwiYWJzIiwiZ2V0X2RlbGF5ZWRfbTNoIiwiZ2V0Q2hhbm5lbFR5cGUiLCJTT0RJVU1fR0FURURfQ0hBTk5FTCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiU29kaXVtRHVhbEdhdGVkQ2hhbm5lbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNC0yMDIxLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuLyoqXHJcbiAqIEEgZ2F0ZWQgY2hhbm5lbCB0aHJvdWdoIHdoaWNoIHNvZGl1bSBwYXNzZXMgd2hlbiB0aGUgY2hhbm5lbCBpcyBvcGVuLiAgVGhpcyBpbXBsZW1lbnRhdGlvbiBoYXMgdHdvIGRpZmZlcmVudCBnYXRlcyxcclxuICogd2hpY2ggaXMgYXBwYXJlbnRseSBjbG9zZXIgdG8gcmVhbC0gbGlmZSB2b2x0YWdlLWdhdGVkIHNvZGl1bSBjaGFubmVscy5cclxuICpcclxuICogQGF1dGhvciBKb2huIEJsYW5jb1xyXG4gKiBAYXV0aG9yIFNoYXJmdWRlZW4gQXNocmFmIChmb3IgR2hlbnQgVW5pdmVyc2l0eSlcclxuICovXHJcblxyXG5pbXBvcnQgZG90UmFuZG9tIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9kb3RSYW5kb20uanMnO1xyXG5pbXBvcnQgbmV1cm9uIGZyb20gJy4uLy4uL25ldXJvbi5qcyc7XHJcbmltcG9ydCBNYXRoVXRpbHMgZnJvbSAnLi4vY29tbW9uL01hdGhVdGlscy5qcyc7XHJcbmltcG9ydCBOZXVyb25Db25zdGFudHMgZnJvbSAnLi4vY29tbW9uL05ldXJvbkNvbnN0YW50cy5qcyc7XHJcbmltcG9ydCBEdWFsR2F0ZUNoYW5uZWxUcmF2ZXJzYWxNb3Rpb25TdHJhdGVneSBmcm9tICcuL0R1YWxHYXRlQ2hhbm5lbFRyYXZlcnNhbE1vdGlvblN0cmF0ZWd5LmpzJztcclxuaW1wb3J0IEdhdGVkQ2hhbm5lbCBmcm9tICcuL0dhdGVkQ2hhbm5lbC5qcyc7XHJcbmltcG9ydCBNZW1icmFuZUNoYW5uZWxUeXBlcyBmcm9tICcuL01lbWJyYW5lQ2hhbm5lbFR5cGVzLmpzJztcclxuaW1wb3J0IE1lbWJyYW5lQ3Jvc3NpbmdEaXJlY3Rpb24gZnJvbSAnLi9NZW1icmFuZUNyb3NzaW5nRGlyZWN0aW9uLmpzJztcclxuaW1wb3J0IFBhcnRpY2xlVHlwZSBmcm9tICcuL1BhcnRpY2xlVHlwZS5qcyc7XHJcbmltcG9ydCBQaWVTbGljZVNoYXBlZENhcHR1cmVab25lIGZyb20gJy4vUGllU2xpY2VTaGFwZWRDYXB0dXJlWm9uZS5qcyc7XHJcblxyXG4vLyBjb25zdGFudHNcclxuY29uc3QgQ0hBTk5FTF9IRUlHSFQgPSBOZXVyb25Db25zdGFudHMuTUVNQlJBTkVfVEhJQ0tORVNTICogMS4yOyAvLyBJbiBuYW5vbWV0ZXJzLlxyXG5jb25zdCBDSEFOTkVMX1dJRFRIID0gTmV1cm9uQ29uc3RhbnRzLk1FTUJSQU5FX1RISUNLTkVTUyAqIDAuNTA7IC8vIEluIG5hbm9tZXRlcnMuXHJcblxyXG4vLyBDb25zdGFudCB1c2VkIHdoZW4gY2FsY3VsYXRpbmcgaG93IG9wZW4gdGhpcyBnYXRlIHNob3VsZCBiZSBiYXNlZCBvbiBhIHZhbHVlIHRoYXQgZXhpc3RzIHdpdGhpbiB0aGUgSG9kZ2tpbi1IdXhsZXlcclxuLy8gbW9kZWwuICBUaGlzIHdhcyBlbXBpcmljYWxseSBkZXRlcm1pbmVkLlxyXG5jb25zdCBNM0hfV0hFTl9GVUxMWV9PUEVOID0gMC4yNTtcclxuXHJcbi8vIFBvc3NpYmxlIHZhbHVlcyBmb3IgaW50ZXJuYWwgc3RhdGUuXHJcbmNvbnN0IEdhdGVTdGF0ZSA9IHtcclxuICBJRExFOiAnSURMRScsXHJcbiAgT1BFTklORzogJ09QRU5JTkcnLFxyXG4gIEJFQ09NSU5HX0lOQUNUSVZFOiAnQkVDT01JTkdfSU5BQ1RJVkUnLFxyXG4gIElOQUNUSVZBVEVEOiAnSU5BQ1RJVkFURUQnLFxyXG4gIFJFU0VUVElORzogJ1JFU0VUVElORydcclxufTtcclxuXHJcbi8vIHZlcmlmeSB0aGF0IGVudW0gaXMgaW1tdXRhYmxlIHdpdGhvdXQgdGhlIHJ1bnRpbWUgcGVuYWx0eSBpbiBwcm9kdWN0aW9uIGNvZGVcclxuaWYgKCBhc3NlcnQgKSB7IE9iamVjdC5mcmVlemUoIEdhdGVTdGF0ZSApOyB9XHJcblxyXG4vLyBWYWx1ZXMgdXNlZCBmb3IgZGVjaWRpbmcgb24gc3RhdGUgdHJhbnNpdGlvbnMuICBUaGVzZSB3ZXJlIGVtcGlyaWNhbGx5IGRldGVybWluZWQuXHJcbmNvbnN0IEFDVElWQVRJT05fREVDSVNJT05fVEhSRVNIT0xEID0gMC4wMDI7XHJcbmNvbnN0IEZVTExZX0lOQUNUSVZFX0RFQ0lTSU9OX1RIUkVTSE9MRCA9IDAuOTg7XHJcblxyXG4vLyBWYWx1ZXMgdXNlZCBmb3IgdGltZWQgc3RhdGUgdHJhbnNpdGlvbnMuXHJcbmNvbnN0IElOQUNUSVZFX1RPX1JFU0VUVElOR19USU1FID0gMC4wMDE7IC8vIEluIHNlY29uZHMgb2Ygc2ltIHRpbWUuXHJcbmNvbnN0IFJFU0VUVElOR19UT19JRExFX1RJTUUgPSAwLjAwMTsgLy8gSW4gc2Vjb25kcyBvZiBzaW0gdGltZS5cclxuXHJcbi8vIENvbnN0YW50cyB0aGF0IGNvbnRyb2wgdGhlIHJhdGUgYXQgd2hpY2ggdGhpcyBjaGFubmVsIHdpbGwgY2FwdHVyZSBpb25zIHdoZW4gaXQgaXMgb3Blbi4gIFNtYWxsZXIgbnVtYmVycyBoZXJlIHdpbGxcclxuLy8gaW5jcmVhc2UgdGhlIGNhcHR1cmUgcmF0ZSBhbmQgdGh1cyBtYWtlIHRoZSBmbG93IGFwcGVhciB0byBiZSBmYXN0ZXIuXHJcbmNvbnN0IE1JTl9JTlRFUl9DQVBUVVJFX1RJTUUgPSAwLjAwMDAzOyAvLyBJbiBzZWNvbmRzIG9mIHNpbSB0aW1lLlxyXG5jb25zdCBNQVhfSU5URVJfQ0FQVFVSRV9USU1FID0gMC4wMDAxMzsgLy8gSW4gc2Vjb25kcyBvZiBzaW0gdGltZS5cclxuXHJcbi8vIERlbGF5IHJhbmdlIC0gdXNlZCB0byBtYWtlIHRoZSB0aW1pbmcgb2YgdGhlIGluc3RhbmNlcyBvZiB0aGlzIGdhdGUgdmFyeSBhIGxpdHRsZSBiaXQgaW4gdGVybXMgb2Ygd2hlbiB0aGV5IG9wZW5cclxuLy8gYW5kIGNsb3NlLlxyXG5jb25zdCBNQVhfU1RBR0dFUl9ERUxBWSA9IE5ldXJvbkNvbnN0YW50cy5NSU5fQUNUSU9OX1BPVEVOVElBTF9DTE9DS19EVCAqIDU7IC8vIEluIHNlY29uZHMgb2Ygc2ltIHRpbWUuXHJcblxyXG5jbGFzcyBTb2RpdW1EdWFsR2F0ZWRDaGFubmVsIGV4dGVuZHMgR2F0ZWRDaGFubmVsIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtOZXVyb25Nb2RlbH0gbW9kZWxDb250YWluaW5nUGFydGljbGVzXHJcbiAgICogQHBhcmFtIHtNb2RpZmllZEhvZGdraW5IdXhsZXlNb2RlbH0gaG9kZ2tpbkh1eGxleU1vZGVsXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIG1vZGVsQ29udGFpbmluZ1BhcnRpY2xlcywgaG9kZ2tpbkh1eGxleU1vZGVsICkge1xyXG4gICAgc3VwZXIoIENIQU5ORUxfV0lEVEgsIENIQU5ORUxfSEVJR0hULCBtb2RlbENvbnRhaW5pbmdQYXJ0aWNsZXMgKTtcclxuICAgIHRoaXMuZ2F0ZVN0YXRlID0gR2F0ZVN0YXRlLklETEU7XHJcbiAgICB0aGlzLmhvZGdraW5IdXhsZXlNb2RlbCA9IGhvZGdraW5IdXhsZXlNb2RlbDtcclxuICAgIHRoaXMuc3RhdGVUcmFuc2l0aW9uVGltZXIgPSAwO1xyXG4gICAgdGhpcy5zdGFnZ2VyRGVsYXkgPSAwO1xyXG4gICAgdGhpcy5wcmV2aW91c05vcm1hbGl6ZWRDb25kdWN0YW5jZSA9IDA7XHJcbiAgICB0aGlzLnNldEV4dGVyaW9yQ2FwdHVyZVpvbmUoIG5ldyBQaWVTbGljZVNoYXBlZENhcHR1cmVab25lKCB0aGlzLmdldENlbnRlclBvc2l0aW9uKCksIENIQU5ORUxfV0lEVEggKiA1LCAwLCBNYXRoLlBJICogMC43ICkgKTtcclxuICAgIHRoaXMucmVzZXQoKTtcclxuICAgIHRoaXMuY2hhbm5lbENvbG9yID0gTmV1cm9uQ29uc3RhbnRzLlNPRElVTV9DT0xPUi5jb2xvclV0aWxzRGFya2VyKCAwLjIgKTtcclxuICB9XHJcblxyXG4gIC8vIEBwdWJsaWNcclxuICBzdGVwSW5UaW1lKCBkdCApIHtcclxuXHJcbiAgICAvLyBBIG5vdGUgdG8gbWFpbnRhaW5lcnM6IG9yaWdpbmFsbHksIHNldmVyYWwgcHJvcGVydGllcyB3ZXJlIG1haW50YWluZWQgdGhhdCB3ZXJlIG9ic2VydmVkIGluIHRoZSB2aWV3LCBzdWNoIGFzXHJcbiAgICAvLyBvcGVubmVzcyBhbmQgaW5hY3RpdmF0aW9uLiAgSGFuZGxpbmcgdGhlc2Ugc2VwYXJhdGVseSBjb21wcm9taXNlZCBwZXJmb3JtYW5jZSwgc28gYSBmbGFnIHdhcyBhZGRlZCB0byBtYXJrXHJcbiAgICAvLyB3aGV0aGVyIGFueSBjaGFuZ2Ugb2NjdXJyZWQsIGFuZCBpZiBzbywgdGhlIHZpZXcga25vd3MgdG8gdXBkYXRlIHRoZSByZXByZXNlbnRhdGlvbi5cclxuICAgIGNvbnN0IHByZXZPcGVubmVzcyA9IHRoaXMub3Blbm5lc3M7XHJcbiAgICBjb25zdCBwcmV2SW5BY3RpdmF0aW9uQW10ID0gdGhpcy5pbmFjdGl2YXRpb25BbW91bnQ7XHJcblxyXG4gICAgc3VwZXIuc3RlcEluVGltZSggZHQgKTtcclxuXHJcbiAgICAvLyBHZXQgdGhlIGNvbmR1Y3RhbmNlIG5vcm1hbGl6ZWQgZnJvbSAwIHRvIDEuXHJcbiAgICBsZXQgbm9ybWFsaXplZENvbmR1Y3RhbmNlID0gdGhpcy5jYWxjdWxhdGVOb3JtYWxpemVkQ29uZHVjdGFuY2UoKTtcclxuXHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCBub3JtYWxpemVkQ29uZHVjdGFuY2UgPj0gMCAmJiBub3JtYWxpemVkQ29uZHVjdGFuY2UgPD0gMSxcclxuICAgICAgYFNvZGl1bUR1YWxHYXRlZENoYW5uZWwgbm9ybWFsaXplZCBjb25kdWN0YW5jZSBvdXQgb2YgcmFuZ2UsID0gJHtub3JtYWxpemVkQ29uZHVjdGFuY2V9YCApO1xyXG5cclxuICAgIC8vIFRyaW0gb2ZmIHNvbWUgZGlnaXRzIHRvIGxpbWl0IHZlcnkgc21hbGwgY2hhbmdlcy5cclxuICAgIG5vcm1hbGl6ZWRDb25kdWN0YW5jZSA9IE1hdGhVdGlscy5yb3VuZCggbm9ybWFsaXplZENvbmR1Y3RhbmNlLCA0ICk7XHJcblxyXG4gICAgLy8gVXBkYXRlIHRoZSBzdGF0ZS5cclxuICAgIHN3aXRjaCggdGhpcy5nYXRlU3RhdGUgKSB7XHJcblxyXG4gICAgICBjYXNlIEdhdGVTdGF0ZS5JRExFOlxyXG4gICAgICAgIGlmICggbm9ybWFsaXplZENvbmR1Y3RhbmNlID4gQUNUSVZBVElPTl9ERUNJU0lPTl9USFJFU0hPTEQgKSB7XHJcbiAgICAgICAgICAvLyBXZSBhcmUgb3BlbmluZywgY2hhbmdlIHRvIHRoZSBhcHByb3ByaWF0ZSBzdGF0ZS5cclxuICAgICAgICAgIHRoaXMuc2V0T3Blbm5lc3MoIHRoaXMubWFwT3Blbm5lc3NUb05vcm1hbGl6ZWRDb25kdWN0YW5jZSggbm9ybWFsaXplZENvbmR1Y3RhbmNlICkgKTtcclxuICAgICAgICAgIHRoaXMuZ2F0ZVN0YXRlID0gR2F0ZVN0YXRlLk9QRU5JTkc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBHYXRlU3RhdGUuT1BFTklORzpcclxuICAgICAgICAvLyBXZSBhcmUgb24gdGhlIHdheSBkb3duLCBzbyBzZXQgYSBuZXcgc3RhdGUuXHJcbiAgICAgICAgaWYgKCB0aGlzLmlzT3BlbigpICYmIHRoaXMuZ2V0Q2FwdHVyZUNvdW50ZG93blRpbWVyKCkgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSApIHtcclxuICAgICAgICAgIC8vIFdlIGFyZSBvcGVuIGVub3VnaCB0byBzdGFydCBjYXB0dXJpbmcgcGFydGljbGVzLlxyXG4gICAgICAgICAgdGhpcy5yZXN0YXJ0Q2FwdHVyZUNvdW50ZG93blRpbWVyKCB0cnVlICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggdGhpcy5wcmV2aW91c05vcm1hbGl6ZWRDb25kdWN0YW5jZSA+IG5vcm1hbGl6ZWRDb25kdWN0YW5jZSApIHtcclxuICAgICAgICAgIHRoaXMuZ2F0ZVN0YXRlID0gR2F0ZVN0YXRlLkJFQ09NSU5HX0lOQUNUSVZFO1xyXG4gICAgICAgICAgLy8gU2hvdWxkIGJlIGZ1bGx5IG9wZW4gYXQgdGhpcyBwb2ludC5cclxuICAgICAgICAgIHRoaXMuc2V0T3Blbm5lc3MoIDEgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAvLyBTZXQgdGhlIG9wZW5uZXNzIGJhc2VkIG9uIHRoZSBub3JtYWxpemVkIGNvbmR1Y3RhbmNlIHZhbHVlLiBOb3RlIHRoZSBub24tbGluZWFyIG1hcHBpbmcuICBUaGlzIHdhcyBkb25lXHJcbiAgICAgICAgICAvLyB0byBtYWtlIHRoZW0gYXBwZWFyIHRvIGJlIGZ1bGx5IG9wZW4gZWFybGllciBpbiB0aGUgYWN0aW9uIHBvdGVudGlhbCwgd2hpY2ggd2FzIHJlcXVlc3RlZCBieSB0aGVcclxuICAgICAgICAgIC8vIEludGVncmF0ZWQgUGh5c2lvbG9neSBmb2xrcy5cclxuICAgICAgICAgIHRoaXMuc2V0T3Blbm5lc3MoIHRoaXMubWFwT3Blbm5lc3NUb05vcm1hbGl6ZWRDb25kdWN0YW5jZSggbm9ybWFsaXplZENvbmR1Y3RhbmNlICkgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIEdhdGVTdGF0ZS5CRUNPTUlOR19JTkFDVElWRTpcclxuICAgICAgICBpZiAoIHRoaXMuZ2V0SW5hY3RpdmF0aW9uQW1vdW50KCkgPCBGVUxMWV9JTkFDVElWRV9ERUNJU0lPTl9USFJFU0hPTEQgKSB7XHJcbiAgICAgICAgICAvLyBOb3QgeWV0IGZ1bGx5IGluYWN0aXZlIC0gdXBkYXRlIHRoZSBsZXZlbC4gIE5vdGUgdGhlIG5vbi1cclxuICAgICAgICAgIC8vIGxpbmVhciBtYXBwaW5nIHRvIHRoZSBjb25kdWN0YW5jZSBhbW91bnQuXHJcbiAgICAgICAgICB0aGlzLnNldEluYWN0aXZhdGlvbkFtb3VudCggMSAtIE1hdGgucG93KCBub3JtYWxpemVkQ29uZHVjdGFuY2UsIDcgKSApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIC8vIEZ1bGx5IGluYWN0aXZlLCBtb3ZlIHRvIG5leHQgc3RhdGUuXHJcbiAgICAgICAgICB0aGlzLnNldEluYWN0aXZhdGlvbkFtb3VudCggMSApO1xyXG4gICAgICAgICAgdGhpcy5nYXRlU3RhdGUgPSBHYXRlU3RhdGUuSU5BQ1RJVkFURUQ7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlVHJhbnNpdGlvblRpbWVyID0gSU5BQ1RJVkVfVE9fUkVTRVRUSU5HX1RJTUU7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgR2F0ZVN0YXRlLklOQUNUSVZBVEVEOlxyXG4gICAgICAgIHRoaXMuc3RhdGVUcmFuc2l0aW9uVGltZXIgLT0gZHQ7XHJcbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlVHJhbnNpdGlvblRpbWVyIDwgMCApIHtcclxuICAgICAgICAgIC8vIFRpbWUgdG8gc3RhcnQgcmVzZXR0aW5nLlxyXG4gICAgICAgICAgdGhpcy5nYXRlU3RhdGUgPSBHYXRlU3RhdGUuUkVTRVRUSU5HO1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZVRyYW5zaXRpb25UaW1lciA9IFJFU0VUVElOR19UT19JRExFX1RJTUU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBHYXRlU3RhdGUuUkVTRVRUSU5HOlxyXG4gICAgICAgIHRoaXMuc3RhdGVUcmFuc2l0aW9uVGltZXIgLT0gZHQ7XHJcbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlVHJhbnNpdGlvblRpbWVyID49IDAgKSB7XHJcbiAgICAgICAgICAvLyBNb3ZlIHRoZSB2YWx1ZXMgb2Ygb3Blbm5lc3MgYW5kIGFjdGl2YXRpb24gYmFjayB0b3dhcmRzIHRoZWlyIGlkbGUgKGkuZS4gcmVzdGluZykgc3RhdGVzLiAgVGhlIG1hcHBpbmcgb2ZcclxuICAgICAgICAgIC8vIHRoZSBpbmFjdGl2YXRpb24gYW1vdW50IGFzIGEgZnVuY3Rpb24gb2YgdGltZSBpcyB2ZXJ5IG5vbi0gbGluZWFyLiAgVGhpcyBpcyBiZWNhdXNlIHRoZSBJUEhZIHBlb3BsZVxyXG4gICAgICAgICAgLy8gcmVxdWVzdGVkIHRoYXQgdGhlIFwibGl0dGxlIGJhbGwgZG9lc24ndCBwb3Agb3V0XCIgdW50aWwgdGhlIGdhdGUgaGFzIGNsb3NlZCB1cC5cclxuICAgICAgICAgIHRoaXMuc2V0T3Blbm5lc3MoIDEgLSBNYXRoLnBvdyggdGhpcy5zdGF0ZVRyYW5zaXRpb25UaW1lciAvIFJFU0VUVElOR19UT19JRExFX1RJTUUgLSAxLCAxMCApICk7XHJcbiAgICAgICAgICB0aGlzLnNldEluYWN0aXZhdGlvbkFtb3VudCggMSAtIE1hdGgucG93KCB0aGlzLnN0YXRlVHJhbnNpdGlvblRpbWVyIC8gUkVTRVRUSU5HX1RPX0lETEVfVElNRSAtIDEsIDIwICkgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAvLyBHbyBiYWNrIHRvIHRoZSBpZGxlLCBvciByZXN0aW5nLCBzdGF0ZS5cclxuICAgICAgICAgIHRoaXMuc2V0T3Blbm5lc3MoIDAgKTtcclxuICAgICAgICAgIHRoaXMuc2V0SW5hY3RpdmF0aW9uQW1vdW50KCAwICk7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZVN0YWdnZXJEZWxheSgpO1xyXG4gICAgICAgICAgdGhpcy5nYXRlU3RhdGUgPSBHYXRlU3RhdGUuSURMRTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvciggYGludmFsaWQgZ2F0ZVN0YXRlOiAke3RoaXMuZ2F0ZVN0YXRlfWAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTYXZlIHZhbHVlcyBmb3IgdGhlIG5leHQgdGltZSB0aHJvdWdoLlxyXG4gICAgdGhpcy5wcmV2aW91c05vcm1hbGl6ZWRDb25kdWN0YW5jZSA9IG5vcm1hbGl6ZWRDb25kdWN0YW5jZTtcclxuXHJcbiAgICB0aGlzLm5vdGlmeUlmTWVtYnJhbmVTdGF0ZUNoYW5nZWQoIHByZXZPcGVubmVzcywgcHJldkluQWN0aXZhdGlvbkFtdCApO1xyXG4gIH1cclxuXHJcbiAgLy8gQHB1YmxpYywgQG92ZXJyaWRlXHJcbiAgcmVzZXQoKSB7XHJcbiAgICBzdXBlci5yZXNldCgpO1xyXG5cclxuICAgIC8vIFNldCB1cCB0aGUgY2FwdHVyZSB0aW1lIHJhbmdlLCB3aGljaCB3aWxsIGJlIHVzZWQgdG8gY29udHJvbCB0aGUgcmF0ZSBvZiBwYXJ0aWNsZSBjYXB0dXJlIHdoZW4gdGhpcyBnYXRlIGlzIG9wZW4uXHJcbiAgICB0aGlzLnNldE1pbkludGVyQ2FwdHVyZVRpbWUoIE1JTl9JTlRFUl9DQVBUVVJFX1RJTUUgKTtcclxuICAgIHRoaXMuc2V0TWF4SW50ZXJDYXB0dXJlVGltZSggTUFYX0lOVEVSX0NBUFRVUkVfVElNRSApO1xyXG5cclxuICAgIC8vIEluaXRpYWxpemUgc29tZSBpbnRlcm5hbCBzdGF0ZS5cclxuICAgIHRoaXMuZ2F0ZVN0YXRlID0gR2F0ZVN0YXRlLklETEU7XHJcbiAgICB0aGlzLnN0YXRlVHJhbnNpdGlvblRpbWVyID0gMDtcclxuICAgIGlmICggdGhpcy5ob2Rna2luSHV4bGV5TW9kZWwgKSB7XHJcbiAgICAgIHRoaXMucHJldmlvdXNOb3JtYWxpemVkQ29uZHVjdGFuY2UgPSB0aGlzLmNhbGN1bGF0ZU5vcm1hbGl6ZWRDb25kdWN0YW5jZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEluaXRpYWxpemUgdGhlIHN0YWdnZXIgZGVsYXkuXHJcbiAgICB0aGlzLnVwZGF0ZVN0YWdnZXJEZWxheSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gQHB1YmxpYywgQG92ZXJyaWRlXHJcbiAgZ2V0U3RhdGUoKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHN1cGVyLmdldFN0YXRlKCk7XHJcbiAgICBzdGF0ZS5pbmFjdGl2YXRpb25BbW91bnQgPSB0aGlzLmluYWN0aXZhdGlvbkFtb3VudDtcclxuICAgIHN0YXRlLnByZXZpb3VzTm9ybWFsaXplZENvbmR1Y3RhbmNlID0gdGhpcy5wcmV2aW91c05vcm1hbGl6ZWRDb25kdWN0YW5jZTtcclxuICAgIHN0YXRlLmdhdGVTdGF0ZSA9IHRoaXMuZ2F0ZVN0YXRlO1xyXG4gICAgc3RhdGUuc3RhdGVUcmFuc2l0aW9uVGltZXIgPSB0aGlzLnN0YXRlVHJhbnNpdGlvblRpbWVyO1xyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxuXHJcbiAgLy8gQHB1YmxpYywgQG92ZXJyaWRlXHJcbiAgc2V0U3RhdGUoIHN0YXRlICkge1xyXG4gICAgdGhpcy5nYXRlU3RhdGUgPSBzdGF0ZS5nYXRlU3RhdGU7XHJcbiAgICB0aGlzLnByZXZpb3VzTm9ybWFsaXplZENvbmR1Y3RhbmNlID0gc3RhdGUucHJldmlvdXNOb3JtYWxpemVkQ29uZHVjdGFuY2U7XHJcbiAgICB0aGlzLnN0YXRlVHJhbnNpdGlvblRpbWVyID0gc3RhdGUuc3RhdGVUcmFuc2l0aW9uVGltZXI7XHJcbiAgICBzdXBlci5zZXRTdGF0ZSggc3RhdGUgKTtcclxuICB9XHJcblxyXG4gIC8vIEBwdWJsaWMsIEBvdmVycmlkZVxyXG4gIGdldENoYW5uZWxDb2xvcigpIHtcclxuICAgIHJldHVybiB0aGlzLmNoYW5uZWxDb2xvcjtcclxuICB9XHJcblxyXG4gIC8vIEBwdWJsaWMsIEBvdmVycmlkZVxyXG4gIGdldEVkZ2VDb2xvcigpIHtcclxuICAgIHJldHVybiBOZXVyb25Db25zdGFudHMuU09ESVVNX0NPTE9SO1xyXG4gIH1cclxuXHJcbiAgLy8gQHB1YmxpYywgQG92ZXJyaWRlXHJcbiAgZ2V0UGFydGljbGVUeXBlVG9DYXB0dXJlKCkge1xyXG4gICAgcmV0dXJuIFBhcnRpY2xlVHlwZS5TT0RJVU1fSU9OO1xyXG4gIH1cclxuXHJcbiAgLy8gQHByaXZhdGVcclxuICB1cGRhdGVTdGFnZ2VyRGVsYXkoKSB7XHJcbiAgICB0aGlzLnN0YWdnZXJEZWxheSA9IGRvdFJhbmRvbS5uZXh0RG91YmxlKCkgKiBNQVhfU1RBR0dFUl9ERUxBWTtcclxuICB9XHJcblxyXG4gIC8vIEBwdWJsaWMsIEBvdmVycmlkZVxyXG4gIGNob29zZUNyb3NzaW5nRGlyZWN0aW9uKCkge1xyXG4gICAgcmV0dXJuIE1lbWJyYW5lQ3Jvc3NpbmdEaXJlY3Rpb24uT1VUX1RPX0lOO1xyXG4gIH1cclxuXHJcbiAgLy8gQHB1YmxpYywgQG92ZXJyaWRlXHJcbiAgZ2V0SGFzSW5hY3RpdmF0aW9uR2F0ZSgpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLy8gQHB1YmxpYywgQG92ZXJyaWRlXHJcbiAgbW92ZVBhcnRpY2xlVGhyb3VnaE5ldXJvbk1lbWJyYW5lKCBwYXJ0aWNsZSwgbWF4VmVsb2NpdHkgKSB7XHJcbiAgICBwYXJ0aWNsZS5zZXRNb3Rpb25TdHJhdGVneSggbmV3IER1YWxHYXRlQ2hhbm5lbFRyYXZlcnNhbE1vdGlvblN0cmF0ZWd5KCB0aGlzLCBwYXJ0aWNsZS5nZXRQb3NpdGlvblgoKSwgcGFydGljbGUuZ2V0UG9zaXRpb25ZKCkgKSApO1xyXG4gIH1cclxuXHJcbiAgLy8gQHByaXZhdGVcclxuICBtYXBPcGVubmVzc1RvTm9ybWFsaXplZENvbmR1Y3RhbmNlKCBub3JtYWxpemVkQ29uZHVjdGFuY2UgKSB7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCBub3JtYWxpemVkQ29uZHVjdGFuY2UgPj0gMCAmJiBub3JtYWxpemVkQ29uZHVjdGFuY2UgPD0gMSApO1xyXG4gICAgcmV0dXJuIDEgLSBNYXRoLnBvdyggbm9ybWFsaXplZENvbmR1Y3RhbmNlIC0gMSwgMjAgKTtcclxuICB9XHJcblxyXG4gIC8vIEBwcml2YXRlXHJcbiAgY2FsY3VsYXRlTm9ybWFsaXplZENvbmR1Y3RhbmNlKCkge1xyXG4gICAgcmV0dXJuIE1hdGgubWluKCBNYXRoLmFicyggdGhpcy5ob2Rna2luSHV4bGV5TW9kZWwuZ2V0X2RlbGF5ZWRfbTNoKCB0aGlzLnN0YWdnZXJEZWxheSApICkgLyBNM0hfV0hFTl9GVUxMWV9PUEVOLCAxICk7XHJcbiAgfVxyXG5cclxuICAvLyBAcHVibGljLCBAb3ZlcnJpZGVcclxuICBnZXRDaGFubmVsVHlwZSgpIHtcclxuICAgIHJldHVybiBNZW1icmFuZUNoYW5uZWxUeXBlcy5TT0RJVU1fR0FURURfQ0hBTk5FTDtcclxuICB9XHJcbn1cclxuXHJcbm5ldXJvbi5yZWdpc3RlciggJ1NvZGl1bUR1YWxHYXRlZENoYW5uZWwnLCBTb2RpdW1EdWFsR2F0ZWRDaGFubmVsICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTb2RpdW1EdWFsR2F0ZWRDaGFubmVsO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsU0FBUyxNQUFNLGlDQUFpQztBQUN2RCxPQUFPQyxNQUFNLE1BQU0saUJBQWlCO0FBQ3BDLE9BQU9DLFNBQVMsTUFBTSx3QkFBd0I7QUFDOUMsT0FBT0MsZUFBZSxNQUFNLDhCQUE4QjtBQUMxRCxPQUFPQyxzQ0FBc0MsTUFBTSw2Q0FBNkM7QUFDaEcsT0FBT0MsWUFBWSxNQUFNLG1CQUFtQjtBQUM1QyxPQUFPQyxvQkFBb0IsTUFBTSwyQkFBMkI7QUFDNUQsT0FBT0MseUJBQXlCLE1BQU0sZ0NBQWdDO0FBQ3RFLE9BQU9DLFlBQVksTUFBTSxtQkFBbUI7QUFDNUMsT0FBT0MseUJBQXlCLE1BQU0sZ0NBQWdDOztBQUV0RTtBQUNBLE1BQU1DLGNBQWMsR0FBR1AsZUFBZSxDQUFDUSxrQkFBa0IsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNqRSxNQUFNQyxhQUFhLEdBQUdULGVBQWUsQ0FBQ1Esa0JBQWtCLEdBQUcsSUFBSSxDQUFDLENBQUM7O0FBRWpFO0FBQ0E7QUFDQSxNQUFNRSxtQkFBbUIsR0FBRyxJQUFJOztBQUVoQztBQUNBLE1BQU1DLFNBQVMsR0FBRztFQUNoQkMsSUFBSSxFQUFFLE1BQU07RUFDWkMsT0FBTyxFQUFFLFNBQVM7RUFDbEJDLGlCQUFpQixFQUFFLG1CQUFtQjtFQUN0Q0MsV0FBVyxFQUFFLGFBQWE7RUFDMUJDLFNBQVMsRUFBRTtBQUNiLENBQUM7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