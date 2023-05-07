// Copyright 2014-2021, University of Colorado Boulder

/**
 * A motion strategy for showing some slow Brownian motion, which is basically just an occasional small jump from its
 * initial position to a new nearby position and then back.  This is intended to create noticeable but non-distracting
 * motion that doesn't consume much processor time.
 *
 * @author John Blanco
 * @author Sharfudeen Ashraf (for Ghent University)
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import neuron from '../../neuron.js';
import MotionStrategy from './MotionStrategy.js';

// constants
const MAX_JUMP_DISTANCE = 1; // In nanometers.
const MIN_JUMP_DISTANCE = 0.1; // In nanometers.
const MIN_TIME_TO_NEXT_JUMP = 0.0009; // In seconds of sim time, not wall time.
const MAX_TIME_TO_NEXT_JUMP = 0.0015; // In seconds of sim time, not wall time.

class SlowBrownianMotionStrategy extends MotionStrategy {
  /**
   * @param {number} initialPositionX
   * @param {number} initialPositionY
   */
  constructor(initialPositionX, initialPositionY) {
    super();
    this.initialPositionX = initialPositionX;
    this.initialPositionY = initialPositionY;
    // In seconds of sim time.
    this.timeUntilNextJump = this.generateNewJumpTime();
  }

  // @public, @override
  move(movableModelElement, fadableModelElement, dt) {
    this.timeUntilNextJump -= dt;
    if (this.timeUntilNextJump <= 0) {
      // It is time to jump.
      if (movableModelElement.isPositionEqual(this.initialPositionX, this.initialPositionY)) {
        // Jump away from this position.
        const jumpAngle = this.generateNewJumpAngle();
        const jumpDistance = this.generateNewJumpDistance();
        const currentPosRefX = movableModelElement.getPositionX();
        const currentPosRefY = movableModelElement.getPositionY();
        movableModelElement.setPosition(currentPosRefX + jumpDistance * Math.cos(jumpAngle), currentPosRefY + jumpDistance * Math.sin(jumpAngle));
      } else {
        // Jump back to initial position.
        movableModelElement.setPosition(this.initialPositionX, this.initialPositionY);
      }
      // Reset the jump counter time.
      this.timeUntilNextJump = this.generateNewJumpTime();
    }
  }

  // @private
  generateNewJumpTime() {
    return MIN_TIME_TO_NEXT_JUMP + dotRandom.nextDouble() * (MAX_TIME_TO_NEXT_JUMP - MIN_TIME_TO_NEXT_JUMP);
  }

  // @private
  generateNewJumpDistance() {
    return MIN_JUMP_DISTANCE + dotRandom.nextDouble() * (MAX_JUMP_DISTANCE - MIN_JUMP_DISTANCE);
  }

  // @private
  generateNewJumpAngle() {
    return dotRandom.nextDouble() * Math.PI * 2;
  }
}
neuron.register('SlowBrownianMotionStrategy', SlowBrownianMotionStrategy);
export default SlowBrownianMotionStrategy;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkb3RSYW5kb20iLCJuZXVyb24iLCJNb3Rpb25TdHJhdGVneSIsIk1BWF9KVU1QX0RJU1RBTkNFIiwiTUlOX0pVTVBfRElTVEFOQ0UiLCJNSU5fVElNRV9UT19ORVhUX0pVTVAiLCJNQVhfVElNRV9UT19ORVhUX0pVTVAiLCJTbG93QnJvd25pYW5Nb3Rpb25TdHJhdGVneSIsImNvbnN0cnVjdG9yIiwiaW5pdGlhbFBvc2l0aW9uWCIsImluaXRpYWxQb3NpdGlvblkiLCJ0aW1lVW50aWxOZXh0SnVtcCIsImdlbmVyYXRlTmV3SnVtcFRpbWUiLCJtb3ZlIiwibW92YWJsZU1vZGVsRWxlbWVudCIsImZhZGFibGVNb2RlbEVsZW1lbnQiLCJkdCIsImlzUG9zaXRpb25FcXVhbCIsImp1bXBBbmdsZSIsImdlbmVyYXRlTmV3SnVtcEFuZ2xlIiwianVtcERpc3RhbmNlIiwiZ2VuZXJhdGVOZXdKdW1wRGlzdGFuY2UiLCJjdXJyZW50UG9zUmVmWCIsImdldFBvc2l0aW9uWCIsImN1cnJlbnRQb3NSZWZZIiwiZ2V0UG9zaXRpb25ZIiwic2V0UG9zaXRpb24iLCJNYXRoIiwiY29zIiwic2luIiwibmV4dERvdWJsZSIsIlBJIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJTbG93QnJvd25pYW5Nb3Rpb25TdHJhdGVneS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNC0yMDIxLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBBIG1vdGlvbiBzdHJhdGVneSBmb3Igc2hvd2luZyBzb21lIHNsb3cgQnJvd25pYW4gbW90aW9uLCB3aGljaCBpcyBiYXNpY2FsbHkganVzdCBhbiBvY2Nhc2lvbmFsIHNtYWxsIGp1bXAgZnJvbSBpdHNcclxuICogaW5pdGlhbCBwb3NpdGlvbiB0byBhIG5ldyBuZWFyYnkgcG9zaXRpb24gYW5kIHRoZW4gYmFjay4gIFRoaXMgaXMgaW50ZW5kZWQgdG8gY3JlYXRlIG5vdGljZWFibGUgYnV0IG5vbi1kaXN0cmFjdGluZ1xyXG4gKiBtb3Rpb24gdGhhdCBkb2Vzbid0IGNvbnN1bWUgbXVjaCBwcm9jZXNzb3IgdGltZS5cclxuICpcclxuICogQGF1dGhvciBKb2huIEJsYW5jb1xyXG4gKiBAYXV0aG9yIFNoYXJmdWRlZW4gQXNocmFmIChmb3IgR2hlbnQgVW5pdmVyc2l0eSlcclxuICovXHJcblxyXG5pbXBvcnQgZG90UmFuZG9tIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9kb3RSYW5kb20uanMnO1xyXG5pbXBvcnQgbmV1cm9uIGZyb20gJy4uLy4uL25ldXJvbi5qcyc7XHJcbmltcG9ydCBNb3Rpb25TdHJhdGVneSBmcm9tICcuL01vdGlvblN0cmF0ZWd5LmpzJztcclxuXHJcbi8vIGNvbnN0YW50c1xyXG5jb25zdCBNQVhfSlVNUF9ESVNUQU5DRSA9IDE7IC8vIEluIG5hbm9tZXRlcnMuXHJcbmNvbnN0IE1JTl9KVU1QX0RJU1RBTkNFID0gMC4xOyAgLy8gSW4gbmFub21ldGVycy5cclxuY29uc3QgTUlOX1RJTUVfVE9fTkVYVF9KVU1QID0gMC4wMDA5OyAgLy8gSW4gc2Vjb25kcyBvZiBzaW0gdGltZSwgbm90IHdhbGwgdGltZS5cclxuY29uc3QgTUFYX1RJTUVfVE9fTkVYVF9KVU1QID0gMC4wMDE1OyAgLy8gSW4gc2Vjb25kcyBvZiBzaW0gdGltZSwgbm90IHdhbGwgdGltZS5cclxuXHJcbmNsYXNzIFNsb3dCcm93bmlhbk1vdGlvblN0cmF0ZWd5IGV4dGVuZHMgTW90aW9uU3RyYXRlZ3kge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5pdGlhbFBvc2l0aW9uWFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbml0aWFsUG9zaXRpb25ZXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIGluaXRpYWxQb3NpdGlvblgsIGluaXRpYWxQb3NpdGlvblkgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5pbml0aWFsUG9zaXRpb25YID0gaW5pdGlhbFBvc2l0aW9uWDtcclxuICAgIHRoaXMuaW5pdGlhbFBvc2l0aW9uWSA9IGluaXRpYWxQb3NpdGlvblk7XHJcbiAgICAvLyBJbiBzZWNvbmRzIG9mIHNpbSB0aW1lLlxyXG4gICAgdGhpcy50aW1lVW50aWxOZXh0SnVtcCA9IHRoaXMuZ2VuZXJhdGVOZXdKdW1wVGltZSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gQHB1YmxpYywgQG92ZXJyaWRlXHJcbiAgbW92ZSggbW92YWJsZU1vZGVsRWxlbWVudCwgZmFkYWJsZU1vZGVsRWxlbWVudCwgZHQgKSB7XHJcbiAgICB0aGlzLnRpbWVVbnRpbE5leHRKdW1wIC09IGR0O1xyXG4gICAgaWYgKCB0aGlzLnRpbWVVbnRpbE5leHRKdW1wIDw9IDAgKSB7XHJcbiAgICAgIC8vIEl0IGlzIHRpbWUgdG8ganVtcC5cclxuICAgICAgaWYgKCBtb3ZhYmxlTW9kZWxFbGVtZW50LmlzUG9zaXRpb25FcXVhbCggdGhpcy5pbml0aWFsUG9zaXRpb25YLCB0aGlzLmluaXRpYWxQb3NpdGlvblkgKSApIHtcclxuICAgICAgICAvLyBKdW1wIGF3YXkgZnJvbSB0aGlzIHBvc2l0aW9uLlxyXG4gICAgICAgIGNvbnN0IGp1bXBBbmdsZSA9IHRoaXMuZ2VuZXJhdGVOZXdKdW1wQW5nbGUoKTtcclxuICAgICAgICBjb25zdCBqdW1wRGlzdGFuY2UgPSB0aGlzLmdlbmVyYXRlTmV3SnVtcERpc3RhbmNlKCk7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFBvc1JlZlggPSBtb3ZhYmxlTW9kZWxFbGVtZW50LmdldFBvc2l0aW9uWCgpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRQb3NSZWZZID0gbW92YWJsZU1vZGVsRWxlbWVudC5nZXRQb3NpdGlvblkoKTtcclxuICAgICAgICBtb3ZhYmxlTW9kZWxFbGVtZW50LnNldFBvc2l0aW9uKCBjdXJyZW50UG9zUmVmWCArIGp1bXBEaXN0YW5jZSAqIE1hdGguY29zKCBqdW1wQW5nbGUgKSxcclxuICAgICAgICAgIGN1cnJlbnRQb3NSZWZZICsganVtcERpc3RhbmNlICogTWF0aC5zaW4oIGp1bXBBbmdsZSApICk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgLy8gSnVtcCBiYWNrIHRvIGluaXRpYWwgcG9zaXRpb24uXHJcbiAgICAgICAgbW92YWJsZU1vZGVsRWxlbWVudC5zZXRQb3NpdGlvbiggdGhpcy5pbml0aWFsUG9zaXRpb25YLCB0aGlzLmluaXRpYWxQb3NpdGlvblkgKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBSZXNldCB0aGUganVtcCBjb3VudGVyIHRpbWUuXHJcbiAgICAgIHRoaXMudGltZVVudGlsTmV4dEp1bXAgPSB0aGlzLmdlbmVyYXRlTmV3SnVtcFRpbWUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEBwcml2YXRlXHJcbiAgZ2VuZXJhdGVOZXdKdW1wVGltZSgpIHtcclxuICAgIHJldHVybiBNSU5fVElNRV9UT19ORVhUX0pVTVAgKyBkb3RSYW5kb20ubmV4dERvdWJsZSgpICogKCBNQVhfVElNRV9UT19ORVhUX0pVTVAgLSBNSU5fVElNRV9UT19ORVhUX0pVTVAgKTtcclxuICB9XHJcblxyXG4gIC8vIEBwcml2YXRlXHJcbiAgZ2VuZXJhdGVOZXdKdW1wRGlzdGFuY2UoKSB7XHJcbiAgICByZXR1cm4gTUlOX0pVTVBfRElTVEFOQ0UgKyBkb3RSYW5kb20ubmV4dERvdWJsZSgpICogKCBNQVhfSlVNUF9ESVNUQU5DRSAtIE1JTl9KVU1QX0RJU1RBTkNFICk7XHJcbiAgfVxyXG5cclxuICAvLyBAcHJpdmF0ZVxyXG4gIGdlbmVyYXRlTmV3SnVtcEFuZ2xlKCkge1xyXG4gICAgcmV0dXJuIGRvdFJhbmRvbS5uZXh0RG91YmxlKCkgKiBNYXRoLlBJICogMjtcclxuICB9XHJcbn1cclxuXHJcbm5ldXJvbi5yZWdpc3RlciggJ1Nsb3dCcm93bmlhbk1vdGlvblN0cmF0ZWd5JywgU2xvd0Jyb3duaWFuTW90aW9uU3RyYXRlZ3kgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNsb3dCcm93bmlh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