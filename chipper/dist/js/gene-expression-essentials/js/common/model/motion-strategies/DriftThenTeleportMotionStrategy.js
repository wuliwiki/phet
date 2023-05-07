// Copyright 2015-2021, University of Colorado Boulder

/**
 * Motion strategy where the controlled entity drifts at the front of a Z dimension, then moves to the back of Z space,
 * then moves instantly to a new randomly generated position within a set of possible "destination zones" (hence the
 * "teleport" portion of the name). This was created to use when a polymerase molecule needs to return to the beginning
 * of the transcribed area of a gene when it completes transcription. It may, at some point, have other applications.
 *
 * @author John Blanco
 * @author Mohamed Safi
 * @author Aadish Gupta
 */

import dotRandom from '../../../../../dot/js/dotRandom.js';
import Utils from '../../../../../dot/js/Utils.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import Vector3 from '../../../../../dot/js/Vector3.js';
import geneExpressionEssentials from '../../../geneExpressionEssentials.js';
import MotionStrategy from './MotionStrategy.js';

// constants
const PRE_FADE_DRIFT_TIME = 1.5; // In seconds.
const FADE_AND_DRIFT_TIME = 1; // In seconds.
const PRE_TELEPORT_VELOCITY = 250; // In picometers per second.

class DriftThenTeleportMotionStrategy extends MotionStrategy {
  /**
   * @param {Vector2} wanderDirection
   * @param {Array.<Rectangle>} destinationZones
   * @param {Property.<MotionBounds>} motionBoundsProperty
   */
  constructor(wanderDirection, destinationZones, motionBoundsProperty) {
    super();
    const handleMotionBoundsChanged = motionBounds => {
      this.motionBounds = motionBounds;
    };
    motionBoundsProperty.link(handleMotionBoundsChanged);
    this.disposeDriftThenTeleportMotionStrategy = () => {
      motionBoundsProperty.unlink(handleMotionBoundsChanged);
    };

    // list of valid places where the item can teleport
    this.destinationZones = destinationZones; // @private
    this.preFadeCountdown = PRE_FADE_DRIFT_TIME; // @private
    this.velocityXY = wanderDirection.timesScalar(PRE_TELEPORT_VELOCITY); // @private
    this.velocityZ = -1 / FADE_AND_DRIFT_TIME; // @private
  }

  /**
   * @override
   * @public
   */
  dispose() {
    this.disposeDriftThenTeleportMotionStrategy();
  }

  /**
   * @param {Array.<Bounds2>} destinationZones
   * @param {Bounds2} bounds
   * @returns {Vector2}
   * @private
   */
  generateRandomPositionInBounds(destinationZones, bounds) {
    // randomly choose one of the destination zones
    const destinationBounds = dotRandom.sample(destinationZones);

    // generate a random valid position within the chosen zone
    const reducedBoundsWidth = destinationBounds.getWidth() - bounds.getWidth();
    const reducedBoundsHeight = destinationBounds.getHeight() - bounds.getHeight();
    assert && assert(reducedBoundsWidth > 0 && reducedBoundsHeight > 0, 'earning: bounds cannot contain shape');
    return new Vector2(destinationBounds.x + bounds.getWidth() / 2 + dotRandom.nextDouble() * reducedBoundsWidth, destinationBounds.y + bounds.getHeight() / 2 + dotRandom.nextDouble() * reducedBoundsHeight);
  }

  /**
   * @override
   * @param {Vector2} currentPosition
   * @param {Bounds2} bounds
   * @param {number} dt
   * @returns {Vector2}
   * @public
   */
  getNextPosition(currentPosition, bounds, dt) {
    const position3D = this.getNextPosition3D(new Vector3(currentPosition.x, currentPosition.x, 0), bounds, dt);
    return new Vector2(position3D.x, position3D.y);
  }

  /**
   * @override
   * @param {Vector2} currentPosition
   * @param {Bounds2} bounds
   * @param {number} dt
   * @returns {Vector3}
   * @public
   */
  getNextPosition3D(currentPosition, bounds, dt) {
    // Check if it is time to teleport.  This occurs when back of Z-space is reached.
    if (currentPosition.z <= -1) {
      // Time to teleport.
      const destination2D = this.generateRandomPositionInBounds(this.destinationZones, bounds);
      return new Vector3(destination2D.x, destination2D.y, -1);
    }

    // Determine movement for drift.
    let xyMovement;
    if (this.motionBounds.testIfInMotionBoundsWithDelta(bounds, this.velocityXY, dt)) {
      xyMovement = this.velocityXY.timesScalar(dt);
    } else {
      xyMovement = new Vector2(0, 0);
    }
    let zMovement = 0;
    if (this.preFadeCountdown > 0) {
      // In pre-fade state, so no movement in Z direction.
      this.preFadeCountdown -= dt;
    } else {
      // In fade-out state.
      zMovement = this.velocityZ * dt;
    }
    return new Vector3(currentPosition.x + xyMovement.x, currentPosition.y + xyMovement.y, Utils.clamp(currentPosition.z + zMovement, -1, 0));
  }
}
geneExpressionEssentials.register('DriftThenTeleportMotionStrategy', DriftThenTeleportMotionStrategy);
export default DriftThenTeleportMotionStrategy;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkb3RSYW5kb20iLCJVdGlscyIsIlZlY3RvcjIiLCJWZWN0b3IzIiwiZ2VuZUV4cHJlc3Npb25Fc3NlbnRpYWxzIiwiTW90aW9uU3RyYXRlZ3kiLCJQUkVfRkFERV9EUklGVF9USU1FIiwiRkFERV9BTkRfRFJJRlRfVElNRSIsIlBSRV9URUxFUE9SVF9WRUxPQ0lUWSIsIkRyaWZ0VGhlblRlbGVwb3J0TW90aW9uU3RyYXRlZ3kiLCJjb25zdHJ1Y3RvciIsIndhbmRlckRpcmVjdGlvbiIsImRlc3RpbmF0aW9uWm9uZXMiLCJtb3Rpb25Cb3VuZHNQcm9wZXJ0eSIsImhhbmRsZU1vdGlvbkJvdW5kc0NoYW5nZWQiLCJtb3Rpb25Cb3VuZHMiLCJsaW5rIiwiZGlzcG9zZURyaWZ0VGhlblRlbGVwb3J0TW90aW9uU3RyYXRlZ3kiLCJ1bmxpbmsiLCJwcmVGYWRlQ291bnRkb3duIiwidmVsb2NpdHlYWSIsInRpbWVzU2NhbGFyIiwidmVsb2NpdHlaIiwiZGlzcG9zZSIsImdlbmVyYXRlUmFuZG9tUG9zaXRpb25JbkJvdW5kcyIsImJvdW5kcyIsImRlc3RpbmF0aW9uQm91bmRzIiwic2FtcGxlIiwicmVkdWNlZEJvdW5kc1dpZHRoIiwiZ2V0V2lkdGgiLCJyZWR1Y2VkQm91bmRzSGVpZ2h0IiwiZ2V0SGVpZ2h0IiwiYXNzZXJ0IiwieCIsIm5leHREb3VibGUiLCJ5IiwiZ2V0TmV4dFBvc2l0aW9uIiwiY3VycmVudFBvc2l0aW9uIiwiZHQiLCJwb3NpdGlvbjNEIiwiZ2V0TmV4dFBvc2l0aW9uM0QiLCJ6IiwiZGVzdGluYXRpb24yRCIsInh5TW92ZW1lbnQiLCJ0ZXN0SWZJbk1vdGlvbkJvdW5kc1dpdGhEZWx0YSIsInpNb3ZlbWVudCIsImNsYW1wIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJEcmlmdFRoZW5UZWxlcG9ydE1vdGlvblN0cmF0ZWd5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE1LTIwMjEsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIE1vdGlvbiBzdHJhdGVneSB3aGVyZSB0aGUgY29udHJvbGxlZCBlbnRpdHkgZHJpZnRzIGF0IHRoZSBmcm9udCBvZiBhIFogZGltZW5zaW9uLCB0aGVuIG1vdmVzIHRvIHRoZSBiYWNrIG9mIFogc3BhY2UsXHJcbiAqIHRoZW4gbW92ZXMgaW5zdGFudGx5IHRvIGEgbmV3IHJhbmRvbWx5IGdlbmVyYXRlZCBwb3NpdGlvbiB3aXRoaW4gYSBzZXQgb2YgcG9zc2libGUgXCJkZXN0aW5hdGlvbiB6b25lc1wiIChoZW5jZSB0aGVcclxuICogXCJ0ZWxlcG9ydFwiIHBvcnRpb24gb2YgdGhlIG5hbWUpLiBUaGlzIHdhcyBjcmVhdGVkIHRvIHVzZSB3aGVuIGEgcG9seW1lcmFzZSBtb2xlY3VsZSBuZWVkcyB0byByZXR1cm4gdG8gdGhlIGJlZ2lubmluZ1xyXG4gKiBvZiB0aGUgdHJhbnNjcmliZWQgYXJlYSBvZiBhIGdlbmUgd2hlbiBpdCBjb21wbGV0ZXMgdHJhbnNjcmlwdGlvbi4gSXQgbWF5LCBhdCBzb21lIHBvaW50LCBoYXZlIG90aGVyIGFwcGxpY2F0aW9ucy5cclxuICpcclxuICogQGF1dGhvciBKb2huIEJsYW5jb1xyXG4gKiBAYXV0aG9yIE1vaGFtZWQgU2FmaVxyXG4gKiBAYXV0aG9yIEFhZGlzaCBHdXB0YVxyXG4gKi9cclxuXHJcbmltcG9ydCBkb3RSYW5kb20gZnJvbSAnLi4vLi4vLi4vLi4vLi4vZG90L2pzL2RvdFJhbmRvbS5qcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi8uLi8uLi8uLi9kb3QvanMvVXRpbHMuanMnO1xyXG5pbXBvcnQgVmVjdG9yMiBmcm9tICcuLi8uLi8uLi8uLi8uLi9kb3QvanMvVmVjdG9yMi5qcyc7XHJcbmltcG9ydCBWZWN0b3IzIGZyb20gJy4uLy4uLy4uLy4uLy4uL2RvdC9qcy9WZWN0b3IzLmpzJztcclxuaW1wb3J0IGdlbmVFeHByZXNzaW9uRXNzZW50aWFscyBmcm9tICcuLi8uLi8uLi9nZW5lRXhwcmVzc2lvbkVzc2VudGlhbHMuanMnO1xyXG5pbXBvcnQgTW90aW9uU3RyYXRlZ3kgZnJvbSAnLi9Nb3Rpb25TdHJhdGVneS5qcyc7XHJcblxyXG4vLyBjb25zdGFudHNcclxuY29uc3QgUFJFX0ZBREVfRFJJRlRfVElNRSA9IDEuNTsgLy8gSW4gc2Vjb25kcy5cclxuY29uc3QgRkFERV9BTkRfRFJJRlRfVElNRSA9IDE7IC8vIEluIHNlY29uZHMuXHJcbmNvbnN0IFBSRV9URUxFUE9SVF9WRUxPQ0lUWSA9IDI1MDsgLy8gSW4gcGljb21ldGVycyBwZXIgc2Vjb25kLlxyXG5cclxuY2xhc3MgRHJpZnRUaGVuVGVsZXBvcnRNb3Rpb25TdHJhdGVneSBleHRlbmRzIE1vdGlvblN0cmF0ZWd5IHtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtWZWN0b3IyfSB3YW5kZXJEaXJlY3Rpb25cclxuICAgKiBAcGFyYW0ge0FycmF5LjxSZWN0YW5nbGU+fSBkZXN0aW5hdGlvblpvbmVzXHJcbiAgICogQHBhcmFtIHtQcm9wZXJ0eS48TW90aW9uQm91bmRzPn0gbW90aW9uQm91bmRzUHJvcGVydHlcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvciggd2FuZGVyRGlyZWN0aW9uLCBkZXN0aW5hdGlvblpvbmVzLCBtb3Rpb25Cb3VuZHNQcm9wZXJ0eSApIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlTW90aW9uQm91bmRzQ2hhbmdlZCA9IG1vdGlvbkJvdW5kcyA9PiB7XHJcbiAgICAgIHRoaXMubW90aW9uQm91bmRzID0gbW90aW9uQm91bmRzO1xyXG4gICAgfTtcclxuXHJcbiAgICBtb3Rpb25Cb3VuZHNQcm9wZXJ0eS5saW5rKCBoYW5kbGVNb3Rpb25Cb3VuZHNDaGFuZ2VkICk7XHJcblxyXG4gICAgdGhpcy5kaXNwb3NlRHJpZnRUaGVuVGVsZXBvcnRNb3Rpb25TdHJhdGVneSA9ICgpID0+IHtcclxuICAgICAgbW90aW9uQm91bmRzUHJvcGVydHkudW5saW5rKCBoYW5kbGVNb3Rpb25Cb3VuZHNDaGFuZ2VkICk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGxpc3Qgb2YgdmFsaWQgcGxhY2VzIHdoZXJlIHRoZSBpdGVtIGNhbiB0ZWxlcG9ydFxyXG4gICAgdGhpcy5kZXN0aW5hdGlvblpvbmVzID0gZGVzdGluYXRpb25ab25lczsgLy8gQHByaXZhdGVcclxuICAgIHRoaXMucHJlRmFkZUNvdW50ZG93biA9IFBSRV9GQURFX0RSSUZUX1RJTUU7IC8vIEBwcml2YXRlXHJcbiAgICB0aGlzLnZlbG9jaXR5WFkgPSB3YW5kZXJEaXJlY3Rpb24udGltZXNTY2FsYXIoIFBSRV9URUxFUE9SVF9WRUxPQ0lUWSApOyAvLyBAcHJpdmF0ZVxyXG4gICAgdGhpcy52ZWxvY2l0eVogPSAtMSAvIEZBREVfQU5EX0RSSUZUX1RJTUU7IC8vIEBwcml2YXRlXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAb3ZlcnJpZGVcclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIHRoaXMuZGlzcG9zZURyaWZ0VGhlblRlbGVwb3J0TW90aW9uU3RyYXRlZ3koKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7QXJyYXkuPEJvdW5kczI+fSBkZXN0aW5hdGlvblpvbmVzXHJcbiAgICogQHBhcmFtIHtCb3VuZHMyfSBib3VuZHNcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yMn1cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIGdlbmVyYXRlUmFuZG9tUG9zaXRpb25JbkJvdW5kcyggZGVzdGluYXRpb25ab25lcywgYm91bmRzICkge1xyXG5cclxuICAgIC8vIHJhbmRvbWx5IGNob29zZSBvbmUgb2YgdGhlIGRlc3RpbmF0aW9uIHpvbmVzXHJcbiAgICBjb25zdCBkZXN0aW5hdGlvbkJvdW5kcyA9IGRvdFJhbmRvbS5zYW1wbGUoIGRlc3RpbmF0aW9uWm9uZXMgKTtcclxuXHJcbiAgICAvLyBnZW5lcmF0ZSBhIHJhbmRvbSB2YWxpZCBwb3NpdGlvbiB3aXRoaW4gdGhlIGNob3NlbiB6b25lXHJcbiAgICBjb25zdCByZWR1Y2VkQm91bmRzV2lkdGggPSBkZXN0aW5hdGlvbkJvdW5kcy5nZXRXaWR0aCgpIC0gYm91bmRzLmdldFdpZHRoKCk7XHJcbiAgICBjb25zdCByZWR1Y2VkQm91bmRzSGVpZ2h0ID0gZGVzdGluYXRpb25Cb3VuZHMuZ2V0SGVpZ2h0KCkgLSBib3VuZHMuZ2V0SGVpZ2h0KCk7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KFxyXG4gICAgcmVkdWNlZEJvdW5kc1dpZHRoID4gMCAmJiByZWR1Y2VkQm91bmRzSGVpZ2h0ID4gMCxcclxuICAgICAgJ2Vhcm5pbmc6IGJvdW5kcyBjYW5ub3QgY29udGFpbiBzaGFwZSdcclxuICAgICk7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjIoXHJcbiAgICAgIGRlc3RpbmF0aW9uQm91bmRzLnggKyBib3VuZHMuZ2V0V2lkdGgoKSAvIDIgKyBkb3RSYW5kb20ubmV4dERvdWJsZSgpICogcmVkdWNlZEJvdW5kc1dpZHRoLFxyXG4gICAgICBkZXN0aW5hdGlvbkJvdW5kcy55ICsgYm91bmRzLmdldEhlaWdodCgpIC8gMiArIGRvdFJhbmRvbS5uZXh0RG91YmxlKCkgKiByZWR1Y2VkQm91bmRzSGVpZ2h0XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG92ZXJyaWRlXHJcbiAgICogQHBhcmFtIHtWZWN0b3IyfSBjdXJyZW50UG9zaXRpb25cclxuICAgKiBAcGFyYW0ge0JvdW5kczJ9IGJvdW5kc1xyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkdFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyfVxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBnZXROZXh0UG9zaXRpb24oIGN1cnJlbnRQb3NpdGlvbiwgYm91bmRzLCBkdCApIHtcclxuICAgIGNvbnN0IHBvc2l0aW9uM0QgPSB0aGlzLmdldE5leHRQb3NpdGlvbjNEKCBuZXcgVmVjdG9yMyggY3VycmVudFBvc2l0aW9uLngsIGN1cnJlbnRQb3NpdGlvbi54LCAwICksIGJvdW5kcywgZHQgKTtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMiggcG9zaXRpb24zRC54LCBwb3NpdGlvbjNELnkgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBvdmVycmlkZVxyXG4gICAqIEBwYXJhbSB7VmVjdG9yMn0gY3VycmVudFBvc2l0aW9uXHJcbiAgICogQHBhcmFtIHtCb3VuZHMyfSBib3VuZHNcclxuICAgKiBAcGFyYW0ge251bWJlcn0gZHRcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yM31cclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgZ2V0TmV4dFBvc2l0aW9uM0QoIGN1cnJlbnRQb3NpdGlvbiwgYm91bmRzLCBkdCApIHtcclxuXHJcbiAgICAvLyBDaGVjayBpZiBpdCBpcyB0aW1lIHRvIHRlbGVwb3J0LiAgVGhpcyBvY2N1cnMgd2hlbiBiYWNrIG9mIFotc3BhY2UgaXMgcmVhY2hlZC5cclxuICAgIGlmICggY3VycmVudFBvc2l0aW9uLnogPD0gLTEgKSB7XHJcblxyXG4gICAgICAvLyBUaW1lIHRvIHRlbGVwb3J0LlxyXG4gICAgICBjb25zdCBkZXN0aW5hdGlvbjJEID0gdGhpcy5nZW5lcmF0ZVJhbmRvbVBvc2l0aW9uSW5Cb3VuZHMoIHRoaXMuZGVzdGluYXRpb25ab25lcywgYm91bmRzICk7XHJcbiAgICAgIHJldHVybiBuZXcgVmVjdG9yMyggZGVzdGluYXRpb24yRC54LCBkZXN0aW5hdGlvbjJELnksIC0xICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGV0ZXJtaW5lIG1vdmVtZW50IGZvciBkcmlmdC5cclxuICAgIGxldCB4eU1vdmVtZW50O1xyXG4gICAgaWYgKCB0aGlzLm1vdGlvbkJvdW5kcy50ZXN0SWZJbk1vdGlvbkJvdW5kc1dpdGhEZWx0YSggYm91bmRzLCB0aGlzLnZlbG9jaXR5WFksIGR0ICkgKSB7XHJcbiAgICAgIHh5TW92ZW1lbnQgPSB0aGlzLnZlbG9jaXR5WFkudGltZXNTY2FsYXIoIGR0ICk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgeHlNb3ZlbWVudCA9IG5ldyBWZWN0b3IyKCAwLCAwICk7XHJcbiAgICB9XHJcbiAgICBsZXQgek1vdmVtZW50ID0gMDtcclxuICAgIGlmICggdGhpcy5wcmVGYWRlQ291bnRkb3duID4gMCApIHtcclxuXHJcbiAgICAgIC8vIEluIHByZS1mYWRlIHN0YXRlLCBzbyBubyBtb3ZlbWVudCBpbiBaIGRpcmVjdGlvbi5cclxuICAgICAgdGhpcy5wcmVGYWRlQ291bnRkb3duIC09IGR0O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcblxyXG4gICAgICAvLyBJbiBmYWRlLW91dCBzdGF0ZS5cclxuICAgICAgek1vdmVtZW50ID0gdGhpcy52ZWxvY2l0eVogKiBkdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoXHJcbiAgICAgIGN1cnJlbnRQb3NpdGlvbi54ICsgeHlNb3ZlbWVudC54LFxyXG4gICAgICBjdXJyZW50UG9zaXRpb24ueSArIHh5TW92ZW1lbnQueSxcclxuICAgICAgVXRpbHMuY2xhbXAoIGN1cnJlbnRQb3NpdGlvbi56ICsgek1vdmVtZW50LCAtMSwgMCApXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZ2VuZUV4cHJlc3Npb25Fc3NlbnRpYWxzLnJlZ2lzdGVyKCAnRHJpZnRUaGVuVGVsZXBvcnRNb3Rpb25TdHJhdGVneScsIERyaWZ0VGhlblRlbGVwb3J0TW90aW9uU3RyYXRlZ3kgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERyaWZ0VGhlblRlbGVwb3J0TW90aW9uU3RyYXRlZ3k7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsU0FBUyxNQUFNLG9DQUFvQztBQUMxRCxPQUFPQyxLQUFLLE1BQU0sZ0NBQWdDO0FBQ2xELE9BQU9DLE9BQU8sTUFBTSxrQ0FBa0M7QUFDdEQs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