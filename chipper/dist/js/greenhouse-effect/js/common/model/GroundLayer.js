// Copyright 2021-2023, University of Colorado Boulder

/**
 * GroundLayer is a subclass of EnergyAbsorbingEmittingLayer and adds the behavior that is specific to the ground.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import greenhouseEffect from '../../greenhouseEffect.js';
import EnergyAbsorbingEmittingLayer from './EnergyAbsorbingEmittingLayer.js';
import EnergyDirection from './EnergyDirection.js';
import optionize from '../../../../phet-core/js/optionize.js';
// constants
// The minimum temperature that the ground reaches at night (i.e. when no sunlight is present) when modeling the Earth.
const MINIMUM_EARTH_AT_NIGHT_TEMPERATURE = 245;

// Albedo values, see https://github.com/phetsims/greenhouse-effect/issues/124 for information on where these values
// came from.
const GROUND_ALBEDO = 0.2;
const PARTIALLY_GLACIATED_LAND_ALBEDO = 0.225;
class GroundLayer extends EnergyAbsorbingEmittingLayer {
  constructor(tandem, providedOptions) {
    const options = optionize()({
      initialAlbedo: GROUND_ALBEDO,
      substance: EnergyAbsorbingEmittingLayer.Substance.EARTH,
      initialEnergyAbsorptionProportion: 1,
      // Set the minimum temperature to a value that is reasonable for surface of the Earth.
      minimumTemperature: MINIMUM_EARTH_AT_NIGHT_TEMPERATURE,
      // phet-io
      tandem: tandem,
      phetioReadOnly: true,
      phetioState: false
    }, providedOptions);
    super(0, options);

    // albedo of the ground, meaning how much of the incoming light will be reflected
    this.albedoProperty = new NumberProperty(options.initialAlbedo, {
      range: new Range(0, 1),
      tandem: tandem.createTandem('albedoProperty'),
      phetioReadOnly: true,
      phetioDocumentation: 'Proportion of incident light reflected from the ground from 0 (no reflection) to 1 (all light is reflected).'
    });
  }

  /**
   * Interact with the provided energy packets in a way that is specific to the ground.
   */
  interactWithEnergyPackets(emEnergyPackets) {
    let absorbedEnergy = 0;
    emEnergyPackets.forEach(energyPacket => {
      if (energyPacket.direction === EnergyDirection.DOWN && this.energyPacketCrossedThisLayer(energyPacket)) {
        // Only visible light is reflected, IR is fully absorbed.
        const albedo = energyPacket.isVisible ? this.albedoProperty.value : 0;
        absorbedEnergy += energyPacket.energy * (1 - albedo);
        const reflectedEnergy = energyPacket.energy - absorbedEnergy;
        if (reflectedEnergy > 0) {
          // Some of the energy in this packet has been reflected.  Reverse the direction of the packet and set its
          // energy accordingly.
          energyPacket.energy = reflectedEnergy;
          energyPacket.direction = EnergyDirection.UP;
        } else {
          // All energy was absorbed.  Reduce the energy in the packet to zero, which will cause it to be removed from
          // the list in the next step.
          energyPacket.energy = 0;
        }
      }
    });
    return absorbedEnergy;
  }
  reset() {
    this.albedoProperty.reset();
    super.reset();
  }
  static MINIMUM_EARTH_AT_NIGHT_TEMPERATURE = MINIMUM_EARTH_AT_NIGHT_TEMPERATURE;
  static GREEN_MEADOW_ALBEDO = GROUND_ALBEDO;
  static PARTIALLY_GLACIATED_LAND_ALBEDO = PARTIALLY_GLACIATED_LAND_ALBEDO;
}
greenhouseEffect.register('GroundLayer', GroundLayer);
export default GroundLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJOdW1iZXJQcm9wZXJ0eSIsIlJhbmdlIiwiZ3JlZW5ob3VzZUVmZmVjdCIsIkVuZXJneUFic29yYmluZ0VtaXR0aW5nTGF5ZXIiLCJFbmVyZ3lEaXJlY3Rpb24iLCJvcHRpb25pemUiLCJNSU5JTVVNX0VBUlRIX0FUX05JR0hUX1RFTVBFUkFUVVJFIiwiR1JPVU5EX0FMQkVETyIsIlBBUlRJQUxMWV9HTEFDSUFURURfTEFORF9BTEJFRE8iLCJHcm91bmRMYXllciIsImNvbnN0cnVjdG9yIiwidGFuZGVtIiwicHJvdmlkZWRPcHRpb25zIiwib3B0aW9ucyIsImluaXRpYWxBbGJlZG8iLCJzdWJzdGFuY2UiLCJTdWJzdGFuY2UiLCJFQVJUSCIsImluaXRpYWxFbmVyZ3lBYnNvcnB0aW9uUHJvcG9ydGlvbiIsIm1pbmltdW1UZW1wZXJhdHVyZSIsInBoZXRpb1JlYWRPbmx5IiwicGhldGlvU3RhdGUiLCJhbGJlZG9Qcm9wZXJ0eSIsInJhbmdlIiwiY3JlYXRlVGFuZGVtIiwicGhldGlvRG9jdW1lbnRhdGlvbiIsImludGVyYWN0V2l0aEVuZXJneVBhY2tldHMiLCJlbUVuZXJneVBhY2tldHMiLCJhYnNvcmJlZEVuZXJneSIsImZvckVhY2giLCJlbmVyZ3lQYWNrZXQiLCJkaXJlY3Rpb24iLCJET1dOIiwiZW5lcmd5UGFja2V0Q3Jvc3NlZFRoaXNMYXllciIsImFsYmVkbyIsImlzVmlzaWJsZSIsInZhbHVlIiwiZW5lcmd5IiwicmVmbGVjdGVkRW5lcmd5IiwiVVAiLCJyZXNldCIsIkdSRUVOX01FQURPV19BTEJFRE8iLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkdyb3VuZExheWVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIxLTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIEdyb3VuZExheWVyIGlzIGEgc3ViY2xhc3Mgb2YgRW5lcmd5QWJzb3JiaW5nRW1pdHRpbmdMYXllciBhbmQgYWRkcyB0aGUgYmVoYXZpb3IgdGhhdCBpcyBzcGVjaWZpYyB0byB0aGUgZ3JvdW5kLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEpvaG4gQmxhbmNvIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBOdW1iZXJQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL051bWJlclByb3BlcnR5LmpzJztcclxuaW1wb3J0IFJhbmdlIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9SYW5nZS5qcyc7XHJcbmltcG9ydCBncmVlbmhvdXNlRWZmZWN0IGZyb20gJy4uLy4uL2dyZWVuaG91c2VFZmZlY3QuanMnO1xyXG5pbXBvcnQgRW5lcmd5QWJzb3JiaW5nRW1pdHRpbmdMYXllciwgeyBFbmVyZ3lBYnNvcmJpbmdFbWl0dGluZ0xheWVyT3B0aW9ucyB9IGZyb20gJy4vRW5lcmd5QWJzb3JiaW5nRW1pdHRpbmdMYXllci5qcyc7XHJcbmltcG9ydCBFbmVyZ3lEaXJlY3Rpb24gZnJvbSAnLi9FbmVyZ3lEaXJlY3Rpb24uanMnO1xyXG5pbXBvcnQgVGFuZGVtIGZyb20gJy4uLy4uLy4uLy4uL3RhbmRlbS9qcy9UYW5kZW0uanMnO1xyXG5pbXBvcnQgRU1FbmVyZ3lQYWNrZXQgZnJvbSAnLi9FTUVuZXJneVBhY2tldC5qcyc7XHJcbmltcG9ydCBvcHRpb25pemUgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL29wdGlvbml6ZS5qcyc7XHJcbmltcG9ydCBXaXRoT3B0aW9uYWwgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL3R5cGVzL1dpdGhPcHRpb25hbC5qcyc7XHJcblxyXG4vLyBjb25zdGFudHNcclxuXHJcbi8vIFRoZSBtaW5pbXVtIHRlbXBlcmF0dXJlIHRoYXQgdGhlIGdyb3VuZCByZWFjaGVzIGF0IG5pZ2h0IChpLmUuIHdoZW4gbm8gc3VubGlnaHQgaXMgcHJlc2VudCkgd2hlbiBtb2RlbGluZyB0aGUgRWFydGguXHJcbmNvbnN0IE1JTklNVU1fRUFSVEhfQVRfTklHSFRfVEVNUEVSQVRVUkUgPSAyNDU7XHJcblxyXG4vLyBBbGJlZG8gdmFsdWVzLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3BoZXRzaW1zL2dyZWVuaG91c2UtZWZmZWN0L2lzc3Vlcy8xMjQgZm9yIGluZm9ybWF0aW9uIG9uIHdoZXJlIHRoZXNlIHZhbHVlc1xyXG4vLyBjYW1lIGZyb20uXHJcbmNvbnN0IEdST1VORF9BTEJFRE8gPSAwLjI7XHJcbmNvbnN0IFBBUlRJQUxMWV9HTEFDSUFURURfTEFORF9BTEJFRE8gPSAwLjIyNTtcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSB7XHJcbiAgaW5pdGlhbEFsYmVkbz86IG51bWJlcjtcclxufTtcclxuZXhwb3J0IHR5cGUgR3JvdW5kTGF5ZXJPcHRpb25zID0gU2VsZk9wdGlvbnMgJiBXaXRoT3B0aW9uYWw8RW5lcmd5QWJzb3JiaW5nRW1pdHRpbmdMYXllck9wdGlvbnMsICd0YW5kZW0nPjtcclxuXHJcbmNsYXNzIEdyb3VuZExheWVyIGV4dGVuZHMgRW5lcmd5QWJzb3JiaW5nRW1pdHRpbmdMYXllciB7XHJcbiAgcHVibGljIHJlYWRvbmx5IGFsYmVkb1Byb3BlcnR5OiBOdW1iZXJQcm9wZXJ0eTtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCB0YW5kZW06IFRhbmRlbSwgcHJvdmlkZWRPcHRpb25zPzogR3JvdW5kTGF5ZXJPcHRpb25zICkge1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25pemU8R3JvdW5kTGF5ZXJPcHRpb25zLCBTZWxmT3B0aW9ucywgRW5lcmd5QWJzb3JiaW5nRW1pdHRpbmdMYXllck9wdGlvbnM+KCkoIHtcclxuXHJcbiAgICAgIGluaXRpYWxBbGJlZG86IEdST1VORF9BTEJFRE8sXHJcblxyXG4gICAgICBzdWJzdGFuY2U6IEVuZXJneUFic29yYmluZ0VtaXR0aW5nTGF5ZXIuU3Vic3RhbmNlLkVBUlRILFxyXG4gICAgICBpbml0aWFsRW5lcmd5QWJzb3JwdGlvblByb3BvcnRpb246IDEsXHJcblxyXG4gICAgICAvLyBTZXQgdGhlIG1pbmltdW0gdGVtcGVyYXR1cmUgdG8gYSB2YWx1ZSB0aGF0IGlzIHJlYXNvbmFibGUgZm9yIHN1cmZhY2Ugb2YgdGhlIEVhcnRoLlxyXG4gICAgICBtaW5pbXVtVGVtcGVyYXR1cmU6IE1JTklNVU1fRUFSVEhfQVRfTklHSFRfVEVNUEVSQVRVUkUsXHJcblxyXG4gICAgICAvLyBwaGV0LWlvXHJcbiAgICAgIHRhbmRlbTogdGFuZGVtLFxyXG4gICAgICBwaGV0aW9SZWFkT25seTogdHJ1ZSxcclxuICAgICAgcGhldGlvU3RhdGU6IGZhbHNlXHJcblxyXG4gICAgfSwgcHJvdmlkZWRPcHRpb25zICk7XHJcblxyXG4gICAgc3VwZXIoIDAsIG9wdGlvbnMgKTtcclxuXHJcbiAgICAvLyBhbGJlZG8gb2YgdGhlIGdyb3VuZCwgbWVhbmluZyBob3cgbXVjaCBvZiB0aGUgaW5jb21pbmcgbGlnaHQgd2lsbCBiZSByZWZsZWN0ZWRcclxuICAgIHRoaXMuYWxiZWRvUHJvcGVydHkgPSBuZXcgTnVtYmVyUHJvcGVydHkoIG9wdGlvbnMuaW5pdGlhbEFsYmVkbywge1xyXG4gICAgICByYW5nZTogbmV3IFJhbmdlKCAwLCAxICksXHJcbiAgICAgIHRhbmRlbTogdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ2FsYmVkb1Byb3BlcnR5JyApLFxyXG4gICAgICBwaGV0aW9SZWFkT25seTogdHJ1ZSxcclxuICAgICAgcGhldGlvRG9jdW1lbnRhdGlvbjogJ1Byb3BvcnRpb24gb2YgaW5jaWRlbnQgbGlnaHQgcmVmbGVjdGVkIGZyb20gdGhlIGdyb3VuZCBmcm9tIDAgKG5vIHJlZmxlY3Rpb24pIHRvIDEgKGFsbCBsaWdodCBpcyByZWZsZWN0ZWQpLidcclxuICAgIH0gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEludGVyYWN0IHdpdGggdGhlIHByb3ZpZGVkIGVuZXJneSBwYWNrZXRzIGluIGEgd2F5IHRoYXQgaXMgc3BlY2lmaWMgdG8gdGhlIGdyb3VuZC5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW50ZXJhY3RXaXRoRW5lcmd5UGFja2V0cyggZW1FbmVyZ3lQYWNrZXRzOiBFTUVuZXJneVBhY2tldFtdICk6IG51bWJlciB7XHJcbiAgICBsZXQgYWJzb3JiZWRFbmVyZ3kgPSAwO1xyXG4gICAgZW1FbmVyZ3lQYWNrZXRzLmZvckVhY2goIGVuZXJneVBhY2tldCA9PiB7XHJcbiAgICAgIGlmICggZW5lcmd5UGFja2V0LmRpcmVjdGlvbiA9PT0gRW5lcmd5RGlyZWN0aW9uLkRPV04gJiYgdGhpcy5lbmVyZ3lQYWNrZXRDcm9zc2VkVGhpc0xheWVyKCBlbmVyZ3lQYWNrZXQgKSApIHtcclxuXHJcbiAgICAgICAgLy8gT25seSB2aXNpYmxlIGxpZ2h0IGlzIHJlZmxlY3RlZCwgSVIgaXMgZnVsbHkgYWJzb3JiZWQuXHJcbiAgICAgICAgY29uc3QgYWxiZWRvID0gZW5lcmd5UGFja2V0LmlzVmlzaWJsZSA/IHRoaXMuYWxiZWRvUHJvcGVydHkudmFsdWUgOiAwO1xyXG5cclxuICAgICAgICBhYnNvcmJlZEVuZXJneSArPSBlbmVyZ3lQYWNrZXQuZW5lcmd5ICogKCAxIC0gYWxiZWRvICk7XHJcbiAgICAgICAgY29uc3QgcmVmbGVjdGVkRW5lcmd5ID0gZW5lcmd5UGFja2V0LmVuZXJneSAtIGFic29yYmVkRW5lcmd5O1xyXG4gICAgICAgIGlmICggcmVmbGVjdGVkRW5lcmd5ID4gMCApIHtcclxuXHJcbiAgICAgICAgICAvLyBTb21lIG9mIHRoZSBlbmVyZ3kgaW4gdGhpcyBwYWNrZXQgaGFzIGJlZW4gcmVmbGVjdGVkLiAgUmV2ZXJzZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBwYWNrZXQgYW5kIHNldCBpdHNcclxuICAgICAgICAgIC8vIGVuZXJneSBhY2NvcmRpbmdseS5cclxuICAgICAgICAgIGVuZXJneVBhY2tldC5lbmVyZ3kgPSByZWZsZWN0ZWRFbmVyZ3k7XHJcbiAgICAgICAgICBlbmVyZ3lQYWNrZXQuZGlyZWN0aW9uID0gRW5lcmd5RGlyZWN0aW9uLlVQO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAvLyBBbGwgZW5lcmd5IHdhcyBhYnNvcmJlZC4gIFJlZHVjZSB0aGUgZW5lcmd5IGluIHRoZSBwYWNrZXQgdG8gemVybywgd2hpY2ggd2lsbCBjYXVzZSBpdCB0byBiZSByZW1vdmVkIGZyb21cclxuICAgICAgICAgIC8vIHRoZSBsaXN0IGluIHRoZSBuZXh0IHN0ZXAuXHJcbiAgICAgICAgICBlbmVyZ3lQYWNrZXQuZW5lcmd5ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gKTtcclxuICAgIHJldHVybiBhYnNvcmJlZEVuZXJneTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvdmVycmlkZSByZXNldCgpOiB2b2lkIHtcclxuICAgIHRoaXMuYWxiZWRvUHJvcGVydHkucmVzZXQoKTtcclxuICAgIHN1cGVyLnJlc2V0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE1JTklNVU1fRUFSVEhfQVRfTklHSFRfVEVNUEVSQVRVUkUgPSBNSU5JTVVNX0VBUlRIX0FUX05JR0hUX1RFTVBFUkFUVVJFO1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR1JFRU5fTUVBRE9XX0FMQkVETyA9IEdST1VORF9BTEJFRE87XHJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBQQVJUSUFMTFlfR0xBQ0lBVEVEX0xBTkRfQUxCRURPID0gUEFSVElBTExZX0dMQUNJQVRFRF9MQU5EX0FMQkVETztcclxufVxyXG5cclxuZ3JlZW5ob3VzZUVmZmVjdC5yZWdpc3RlciggJ0dyb3VuZExheWVyJywgR3JvdW5kTGF5ZXIgKTtcclxuZXhwb3J0IGRlZmF1bHQgR3JvdW5kTGF5ZXI7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLGNBQWMsTUFBTSx1Q0FBdUM7QUFDbEUsT0FBT0MsS0FBSyxNQUFNLDZCQUE2QjtB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