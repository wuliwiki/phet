// Copyright 2018-2020, University of Colorado Boulder

/**
 * Provides a wrapper for handling animation logic for an assorted number of different properties.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import Easing from '../../../../twixt/js/Easing.js';
import fractionsCommon from '../../fractionsCommon.js';
class Animator {
  /**
   * @param {Object} config
   */
  constructor(config) {
    config = merge({
      // {Property.<Vector2>}
      positionProperty: null,
      // {Property.<boolean>}
      isAnimatingProperty: null,
      // {Property.<number>|null}
      rotationProperty: null,
      scaleProperty: null,
      shadowProperty: null
    }, config);
    assert && assert(config.positionProperty instanceof Property);
    assert && assert(config.isAnimatingProperty instanceof Property);

    // @private {Property.<Vector2>} - The position of the element
    this.positionProperty = config.positionProperty;

    // @private {Property.<number>|null} - The rotation of the element (will interpolate to closest rotation)
    this.rotationProperty = config.rotationProperty;

    // @private {Property.<number>|null} - The scale of the element
    this.scaleProperty = config.scaleProperty;

    // @private {Property.<number>|null} - The shadow "offset" ratio, from 0 (shadow directly under) to 1 (shadow
    // at full offset)
    this.shadowProperty = config.shadowProperty;

    // @private {Property.<boolean>} - Whether the element is being animated
    this.isAnimatingProperty = config.isAnimatingProperty;

    // @private {Property.<Vector2>|null} - If non-null, changes to this Property will end the animation
    this.animationInvalidationProperty = null;

    // @private {function}
    this.endAnimationListener = this.endAnimation.bind(this);

    // @private {number} - Ratio of the animation, from 0 (the start) to 1 (the end)
    this.ratio = 0;

    // @private {number}
    this.animationSpeed = 0;

    // @private {Vector2|null}
    this.originPosition = null;
    this.destinationPosition = null;

    // @private {number|null}
    this.originRotation = null;
    this.destinationRotation = null;

    // @private {number|null}
    this.originScale = null;
    this.destinationScale = null;

    // @private {number|null}
    this.originShadow = null;
    this.destinationShadow = null;

    // @private {function|null}
    this.endAnimationCallback = null;

    // @private {Easing|null}
    this.easing = null;
  }

  /**
   * Animates to the defined set of values.
   * @public
   *
   * @param {Object} config
   */
  animateTo(config) {
    config = merge({
      // {Vector2}
      position: null,
      // {number|null}
      rotation: null,
      scale: null,
      shadow: null,
      // {Property.<*>|null}
      animationInvalidationProperty: null,
      // {Easing}
      easing: Easing.QUADRATIC_IN,
      // {number}
      velocity: 40,
      // {function|null} - Called with no arguments
      endAnimationCallback: null
    }, config);
    if (this.isAnimatingProperty.value) {
      this.endAnimation();
    }
    this.isAnimatingProperty.value = true;
    this.ratio = 0;
    if (this.positionProperty) {
      this.originPosition = this.positionProperty.value;
      this.destinationPosition = config.position;
    }
    if (this.rotationProperty) {
      this.originRotation = this.rotationProperty.value;
      this.destinationRotation = config.rotation;
    }
    if (this.scaleProperty) {
      this.originScale = this.scaleProperty.value;
      this.destinationScale = config.scale;
    }
    if (this.shadowProperty) {
      this.originShadow = this.shadowProperty.value;
      this.destinationShadow = config.shadow;
    }
    this.animationInvalidationProperty = config.animationInvalidationProperty;
    this.animationInvalidationProperty && this.animationInvalidationProperty.lazyLink(this.endAnimationListener);
    this.animationSpeed = config.velocity / Math.sqrt(config.position.distance(this.positionProperty.value));
    this.endAnimationCallback = config.endAnimationCallback;
    this.easing = config.easing;
  }

  /**
   * Ends the animation.
   * @public
   */
  endAnimation() {
    if (this.isAnimatingProperty.value) {
      if (this.positionProperty) {
        this.positionProperty.value = this.destinationPosition;
      }
      if (this.rotationProperty) {
        this.rotationProperty.value = this.destinationRotation;
      }
      if (this.scaleProperty) {
        this.scaleProperty.value = this.destinationScale;
      }
      if (this.shadowProperty) {
        this.shadowProperty.value = this.destinationShadow;
      }
      this.isAnimatingProperty.value = false;
      this.animationInvalidationProperty && this.animationInvalidationProperty.unlink(this.endAnimationListener);
      this.endAnimationCallback && this.endAnimationCallback();
    }
  }

  /**
   * Steps forward in time.
   * @public
   *
   * @param {number} dt
   */
  step(dt) {
    if (this.isAnimatingProperty.value) {
      this.ratio = Math.min(1, this.ratio + dt * this.animationSpeed);
      if (this.ratio === 1) {
        this.endAnimation();
      } else {
        const easedRatio = this.easing.value(this.ratio);
        if (this.positionProperty) {
          this.positionProperty.value = this.originPosition.blend(this.destinationPosition, easedRatio);
        }
        if (this.rotationProperty) {
          this.rotationProperty.value = Animator.clerp(this.originRotation, this.destinationRotation, easedRatio);
        }
        if (this.scaleProperty) {
          this.scaleProperty.value = this.originScale * (1 - easedRatio) + this.destinationScale * easedRatio;
        }
        if (this.shadowProperty) {
          this.shadowProperty.value = this.originShadow * (1 - easedRatio) + this.destinationShadow * easedRatio;
        }
      }
    }
  }

  /**
   * Returns the equivalent endAngle closest to the startAngle (mod 2pi).
   * @public
   *
   * @param {number} startAngle
   * @param {number} endAngle
   * @returns {number}
   */
  static modifiedEndAngle(startAngle, endAngle) {
    let modifiedEndAngle = Utils.moduloBetweenDown(endAngle, startAngle, startAngle + 2 * Math.PI);
    if (modifiedEndAngle > startAngle + Math.PI) {
      modifiedEndAngle -= 2 * Math.PI;
    }
    return modifiedEndAngle;
  }

  /**
   * Circular linear interpolation (like slerp, but on a plane).
   * @public
   *
   * NOTE: my Google search for "slerp on a plane" didn't come up with anything useful besides neck pillows, so this
   * is just called clerp. :P
   *
   * @param {number} startAngle
   * @param {number} endAngle
   * @param {number} ratio
   * @returns {number}
   */
  static clerp(startAngle, endAngle, ratio) {
    return startAngle * (1 - ratio) + Animator.modifiedEndAngle(startAngle, endAngle) * ratio;
  }
}
fractionsCommon.register('Animator', Animator);
export default Animator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQcm9wZXJ0eSIsIlV0aWxzIiwibWVyZ2UiLCJFYXNpbmciLCJmcmFjdGlvbnNDb21tb24iLCJBbmltYXRvciIsImNvbnN0cnVjdG9yIiwiY29uZmlnIiwicG9zaXRpb25Qcm9wZXJ0eSIsImlzQW5pbWF0aW5nUHJvcGVydHkiLCJyb3RhdGlvblByb3BlcnR5Iiwic2NhbGVQcm9wZXJ0eSIsInNoYWRvd1Byb3BlcnR5IiwiYXNzZXJ0IiwiYW5pbWF0aW9uSW52YWxpZGF0aW9uUHJvcGVydHkiLCJlbmRBbmltYXRpb25MaXN0ZW5lciIsImVuZEFuaW1hdGlvbiIsImJpbmQiLCJyYXRpbyIsImFuaW1hdGlvblNwZWVkIiwib3JpZ2luUG9zaXRpb24iLCJkZXN0aW5hdGlvblBvc2l0aW9uIiwib3JpZ2luUm90YXRpb24iLCJkZXN0aW5hdGlvblJvdGF0aW9uIiwib3JpZ2luU2NhbGUiLCJkZXN0aW5hdGlvblNjYWxlIiwib3JpZ2luU2hhZG93IiwiZGVzdGluYXRpb25TaGFkb3ciLCJlbmRBbmltYXRpb25DYWxsYmFjayIsImVhc2luZyIsImFuaW1hdGVUbyIsInBvc2l0aW9uIiwicm90YXRpb24iLCJzY2FsZSIsInNoYWRvdyIsIlFVQURSQVRJQ19JTiIsInZlbG9jaXR5IiwidmFsdWUiLCJsYXp5TGluayIsIk1hdGgiLCJzcXJ0IiwiZGlzdGFuY2UiLCJ1bmxpbmsiLCJzdGVwIiwiZHQiLCJtaW4iLCJlYXNlZFJhdGlvIiwiYmxlbmQiLCJjbGVycCIsIm1vZGlmaWVkRW5kQW5nbGUiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJtb2R1bG9CZXR3ZWVuRG93biIsIlBJIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJBbmltYXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIwLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlcyBhIHdyYXBwZXIgZm9yIGhhbmRsaW5nIGFuaW1hdGlvbiBsb2dpYyBmb3IgYW4gYXNzb3J0ZWQgbnVtYmVyIG9mIGRpZmZlcmVudCBwcm9wZXJ0aWVzLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEpvbmF0aGFuIE9sc29uIDxqb25hdGhhbi5vbHNvbkBjb2xvcmFkby5lZHU+XHJcbiAqL1xyXG5cclxuaW1wb3J0IFByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1V0aWxzLmpzJztcclxuaW1wb3J0IG1lcmdlIGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9tZXJnZS5qcyc7XHJcbmltcG9ydCBFYXNpbmcgZnJvbSAnLi4vLi4vLi4vLi4vdHdpeHQvanMvRWFzaW5nLmpzJztcclxuaW1wb3J0IGZyYWN0aW9uc0NvbW1vbiBmcm9tICcuLi8uLi9mcmFjdGlvbnNDb21tb24uanMnO1xyXG5cclxuY2xhc3MgQW5pbWF0b3Ige1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggY29uZmlnICkge1xyXG4gICAgY29uZmlnID0gbWVyZ2UoIHtcclxuXHJcbiAgICAgIC8vIHtQcm9wZXJ0eS48VmVjdG9yMj59XHJcbiAgICAgIHBvc2l0aW9uUHJvcGVydHk6IG51bGwsXHJcblxyXG4gICAgICAvLyB7UHJvcGVydHkuPGJvb2xlYW4+fVxyXG4gICAgICBpc0FuaW1hdGluZ1Byb3BlcnR5OiBudWxsLFxyXG5cclxuICAgICAgLy8ge1Byb3BlcnR5LjxudW1iZXI+fG51bGx9XHJcbiAgICAgIHJvdGF0aW9uUHJvcGVydHk6IG51bGwsXHJcbiAgICAgIHNjYWxlUHJvcGVydHk6IG51bGwsXHJcbiAgICAgIHNoYWRvd1Byb3BlcnR5OiBudWxsXHJcbiAgICB9LCBjb25maWcgKTtcclxuXHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCBjb25maWcucG9zaXRpb25Qcm9wZXJ0eSBpbnN0YW5jZW9mIFByb3BlcnR5ICk7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCBjb25maWcuaXNBbmltYXRpbmdQcm9wZXJ0eSBpbnN0YW5jZW9mIFByb3BlcnR5ICk7XHJcblxyXG4gICAgLy8gQHByaXZhdGUge1Byb3BlcnR5LjxWZWN0b3IyPn0gLSBUaGUgcG9zaXRpb24gb2YgdGhlIGVsZW1lbnRcclxuICAgIHRoaXMucG9zaXRpb25Qcm9wZXJ0eSA9IGNvbmZpZy5wb3NpdGlvblByb3BlcnR5O1xyXG5cclxuICAgIC8vIEBwcml2YXRlIHtQcm9wZXJ0eS48bnVtYmVyPnxudWxsfSAtIFRoZSByb3RhdGlvbiBvZiB0aGUgZWxlbWVudCAod2lsbCBpbnRlcnBvbGF0ZSB0byBjbG9zZXN0IHJvdGF0aW9uKVxyXG4gICAgdGhpcy5yb3RhdGlvblByb3BlcnR5ID0gY29uZmlnLnJvdGF0aW9uUHJvcGVydHk7XHJcblxyXG4gICAgLy8gQHByaXZhdGUge1Byb3BlcnR5LjxudW1iZXI+fG51bGx9IC0gVGhlIHNjYWxlIG9mIHRoZSBlbGVtZW50XHJcbiAgICB0aGlzLnNjYWxlUHJvcGVydHkgPSBjb25maWcuc2NhbGVQcm9wZXJ0eTtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZSB7UHJvcGVydHkuPG51bWJlcj58bnVsbH0gLSBUaGUgc2hhZG93IFwib2Zmc2V0XCIgcmF0aW8sIGZyb20gMCAoc2hhZG93IGRpcmVjdGx5IHVuZGVyKSB0byAxIChzaGFkb3dcclxuICAgIC8vIGF0IGZ1bGwgb2Zmc2V0KVxyXG4gICAgdGhpcy5zaGFkb3dQcm9wZXJ0eSA9IGNvbmZpZy5zaGFkb3dQcm9wZXJ0eTtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZSB7UHJvcGVydHkuPGJvb2xlYW4+fSAtIFdoZXRoZXIgdGhlIGVsZW1lbnQgaXMgYmVpbmcgYW5pbWF0ZWRcclxuICAgIHRoaXMuaXNBbmltYXRpbmdQcm9wZXJ0eSA9IGNvbmZpZy5pc0FuaW1hdGluZ1Byb3BlcnR5O1xyXG5cclxuICAgIC8vIEBwcml2YXRlIHtQcm9wZXJ0eS48VmVjdG9yMj58bnVsbH0gLSBJZiBub24tbnVsbCwgY2hhbmdlcyB0byB0aGlzIFByb3BlcnR5IHdpbGwgZW5kIHRoZSBhbmltYXRpb25cclxuICAgIHRoaXMuYW5pbWF0aW9uSW52YWxpZGF0aW9uUHJvcGVydHkgPSBudWxsO1xyXG5cclxuICAgIC8vIEBwcml2YXRlIHtmdW5jdGlvbn1cclxuICAgIHRoaXMuZW5kQW5pbWF0aW9uTGlzdGVuZXIgPSB0aGlzLmVuZEFuaW1hdGlvbi5iaW5kKCB0aGlzICk7XHJcblxyXG4gICAgLy8gQHByaXZhdGUge251bWJlcn0gLSBSYXRpbyBvZiB0aGUgYW5pbWF0aW9uLCBmcm9tIDAgKHRoZSBzdGFydCkgdG8gMSAodGhlIGVuZClcclxuICAgIHRoaXMucmF0aW8gPSAwO1xyXG5cclxuICAgIC8vIEBwcml2YXRlIHtudW1iZXJ9XHJcbiAgICB0aGlzLmFuaW1hdGlvblNwZWVkID0gMDtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZSB7VmVjdG9yMnxudWxsfVxyXG4gICAgdGhpcy5vcmlnaW5Qb3NpdGlvbiA9IG51bGw7XHJcbiAgICB0aGlzLmRlc3RpbmF0aW9uUG9zaXRpb24gPSBudWxsO1xyXG5cclxuICAgIC8vIEBwcml2YXRlIHtudW1iZXJ8bnVsbH1cclxuICAgIHRoaXMub3JpZ2luUm90YXRpb24gPSBudWxsO1xyXG4gICAgdGhpcy5kZXN0aW5hdGlvblJvdGF0aW9uID0gbnVsbDtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZSB7bnVtYmVyfG51bGx9XHJcbiAgICB0aGlzLm9yaWdpblNjYWxlID0gbnVsbDtcclxuICAgIHRoaXMuZGVzdGluYXRpb25TY2FsZSA9IG51bGw7XHJcblxyXG4gICAgLy8gQHByaXZhdGUge251bWJlcnxudWxsfVxyXG4gICAgdGhpcy5vcmlnaW5TaGFkb3cgPSBudWxsO1xyXG4gICAgdGhpcy5kZXN0aW5hdGlvblNoYWRvdyA9IG51bGw7XHJcblxyXG4gICAgLy8gQHByaXZhdGUge2Z1bmN0aW9ufG51bGx9XHJcbiAgICB0aGlzLmVuZEFuaW1hdGlvbkNhbGxiYWNrID0gbnVsbDtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZSB7RWFzaW5nfG51bGx9XHJcbiAgICB0aGlzLmVhc2luZyA9IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBbmltYXRlcyB0byB0aGUgZGVmaW5lZCBzZXQgb2YgdmFsdWVzLlxyXG4gICAqIEBwdWJsaWNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcclxuICAgKi9cclxuICBhbmltYXRlVG8oIGNvbmZpZyApIHtcclxuICAgIGNvbmZpZyA9IG1lcmdlKCB7XHJcblxyXG4gICAgICAvLyB7VmVjdG9yMn1cclxuICAgICAgcG9zaXRpb246IG51bGwsXHJcblxyXG4gICAgICAvLyB7bnVtYmVyfG51bGx9XHJcbiAgICAgIHJvdGF0aW9uOiBudWxsLFxyXG4gICAgICBzY2FsZTogbnVsbCxcclxuICAgICAgc2hhZG93OiBudWxsLFxyXG5cclxuICAgICAgLy8ge1Byb3BlcnR5LjwqPnxudWxsfVxyXG4gICAgICBhbmltYXRpb25JbnZhbGlkYXRpb25Qcm9wZXJ0eTogbnVsbCxcclxuXHJcbiAgICAgIC8vIHtFYXNpbmd9XHJcbiAgICAgIGVhc2luZzogRWFzaW5nLlFVQURSQVRJQ19JTixcclxuXHJcbiAgICAgIC8vIHtudW1iZXJ9XHJcbiAgICAgIHZlbG9jaXR5OiA0MCxcclxuXHJcbiAgICAgIC8vIHtmdW5jdGlvbnxudWxsfSAtIENhbGxlZCB3aXRoIG5vIGFyZ3VtZW50c1xyXG4gICAgICBlbmRBbmltYXRpb25DYWxsYmFjazogbnVsbFxyXG4gICAgfSwgY29uZmlnICk7XHJcblxyXG4gICAgaWYgKCB0aGlzLmlzQW5pbWF0aW5nUHJvcGVydHkudmFsdWUgKSB7XHJcbiAgICAgIHRoaXMuZW5kQW5pbWF0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pc0FuaW1hdGluZ1Byb3BlcnR5LnZhbHVlID0gdHJ1ZTtcclxuICAgIHRoaXMucmF0aW8gPSAwO1xyXG5cclxuICAgIGlmICggdGhpcy5wb3NpdGlvblByb3BlcnR5ICkge1xyXG4gICAgICB0aGlzLm9yaWdpblBvc2l0aW9uID0gdGhpcy5wb3NpdGlvblByb3BlcnR5LnZhbHVlO1xyXG4gICAgICB0aGlzLmRlc3RpbmF0aW9uUG9zaXRpb24gPSBjb25maWcucG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCB0aGlzLnJvdGF0aW9uUHJvcGVydHkgKSB7XHJcbiAgICAgIHRoaXMub3JpZ2luUm90YXRpb24gPSB0aGlzLnJvdGF0aW9uUHJvcGVydHkudmFsdWU7XHJcbiAgICAgIHRoaXMuZGVzdGluYXRpb25Sb3RhdGlvbiA9IGNvbmZpZy5yb3RhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIHRoaXMuc2NhbGVQcm9wZXJ0eSApIHtcclxuICAgICAgdGhpcy5vcmlnaW5TY2FsZSA9IHRoaXMuc2NhbGVQcm9wZXJ0eS52YWx1ZTtcclxuICAgICAgdGhpcy5kZXN0aW5hdGlvblNjYWxlID0gY29uZmlnLnNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggdGhpcy5zaGFkb3dQcm9wZXJ0eSApIHtcclxuICAgICAgdGhpcy5vcmlnaW5TaGFkb3cgPSB0aGlzLnNoYWRvd1Byb3BlcnR5LnZhbHVlO1xyXG4gICAgICB0aGlzLmRlc3RpbmF0aW9uU2hhZG93ID0gY29uZmlnLnNoYWRvdztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFuaW1hdGlvbkludmFsaWRhdGlvblByb3BlcnR5ID0gY29uZmlnLmFuaW1hdGlvbkludmFsaWRhdGlvblByb3BlcnR5O1xyXG4gICAgdGhpcy5hbmltYXRpb25JbnZhbGlkYXRpb25Qcm9wZXJ0eSAmJiB0aGlzLmFuaW1hdGlvbkludmFsaWRhdGlvblByb3BlcnR5LmxhenlMaW5rKCB0aGlzLmVuZEFuaW1hdGlvbkxpc3RlbmVyICk7XHJcblxyXG4gICAgdGhpcy5hbmltYXRpb25TcGVlZCA9IGNvbmZpZy52ZWxvY2l0eSAvIE1hdGguc3FydCggY29uZmlnLnBvc2l0aW9uLmRpc3RhbmNlKCB0aGlzLnBvc2l0aW9uUHJvcGVydHkudmFsdWUgKSApO1xyXG4gICAgdGhpcy5lbmRBbmltYXRpb25DYWxsYmFjayA9IGNvbmZpZy5lbmRBbmltYXRpb25DYWxsYmFjaztcclxuICAgIHRoaXMuZWFzaW5nID0gY29uZmlnLmVhc2luZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuZHMgdGhlIGFuaW1hdGlvbi5cclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgZW5kQW5pbWF0aW9uKCkge1xyXG4gICAgaWYgKCB0aGlzLmlzQW5pbWF0aW5nUHJvcGVydHkudmFsdWUgKSB7XHJcbiAgICAgIGlmICggdGhpcy5wb3NpdGlvblByb3BlcnR5ICkge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb25Qcm9wZXJ0eS52YWx1ZSA9IHRoaXMuZGVzdGluYXRpb25Qb3NpdGlvbjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIHRoaXMucm90YXRpb25Qcm9wZXJ0eSApIHtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uUHJvcGVydHkudmFsdWUgPSB0aGlzLmRlc3RpbmF0aW9uUm90YXRpb247XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCB0aGlzLnNjYWxlUHJvcGVydHkgKSB7XHJcbiAgICAgICAgdGhpcy5zY2FsZVByb3BlcnR5LnZhbHVlID0gdGhpcy5kZXN0aW5hdGlvblNjYWxlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICggdGhpcy5zaGFkb3dQcm9wZXJ0eSApIHtcclxuICAgICAgICB0aGlzLnNoYWRvd1Byb3BlcnR5LnZhbHVlID0gdGhpcy5kZXN0aW5hdGlvblNoYWRvdztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlzQW5pbWF0aW5nUHJvcGVydHkudmFsdWUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5hbmltYXRpb25JbnZhbGlkYXRpb25Qcm9wZXJ0eSAmJiB0aGlzLmFuaW1hdGlvbkludmFsaWRhdGlvblByb3BlcnR5LnVubGluayggdGhpcy5lbmRBbmltYXRpb25MaXN0ZW5lciApO1xyXG4gICAgICB0aGlzLmVuZEFuaW1hdGlvbkNhbGxiYWNrICYmIHRoaXMuZW5kQW5pbWF0aW9uQ2FsbGJhY2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0ZXBzIGZvcndhcmQgaW4gdGltZS5cclxuICAgKiBAcHVibGljXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcn0gZHRcclxuICAgKi9cclxuICBzdGVwKCBkdCApIHtcclxuICAgIGlmICggdGhpcy5pc0FuaW1hdGluZ1Byb3BlcnR5LnZhbHVlICkge1xyXG4gICAgICB0aGlzLnJhdGlvID0gTWF0aC5taW4oIDEsIHRoaXMucmF0aW8gKyBkdCAqIHRoaXMuYW5pbWF0aW9uU3BlZWQgKTtcclxuICAgICAgaWYgKCB0aGlzLnJhdGlvID09PSAxICkge1xyXG4gICAgICAgIHRoaXMuZW5kQW5pbWF0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZWFzZWRSYXRpbyA9IHRoaXMuZWFzaW5nLnZhbHVlKCB0aGlzLnJhdGlvICk7XHJcbiAgICAgICAgaWYgKCB0aGlzLnBvc2l0aW9uUHJvcGVydHkgKSB7XHJcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uUHJvcGVydHkudmFsdWUgPSB0aGlzLm9yaWdpblBvc2l0aW9uLmJsZW5kKCB0aGlzLmRlc3RpbmF0aW9uUG9zaXRpb24sIGVhc2VkUmF0aW8gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCB0aGlzLnJvdGF0aW9uUHJvcGVydHkgKSB7XHJcbiAgICAgICAgICB0aGlzLnJvdGF0aW9uUHJvcGVydHkudmFsdWUgPSBBbmltYXRvci5jbGVycCggdGhpcy5vcmlnaW5Sb3RhdGlvbiwgdGhpcy5kZXN0aW5hdGlvblJvdGF0aW9uLCBlYXNlZFJhdGlvICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggdGhpcy5zY2FsZVByb3BlcnR5ICkge1xyXG4gICAgICAgICAgdGhpcy5zY2FsZVByb3BlcnR5LnZhbHVlID0gdGhpcy5vcmlnaW5TY2FsZSAqICggMSAtIGVhc2VkUmF0aW8gKSArIHRoaXMuZGVzdGluYXRpb25TY2FsZSAqIGVhc2VkUmF0aW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggdGhpcy5zaGFkb3dQcm9wZXJ0eSApIHtcclxuICAgICAgICAgIHRoaXMuc2hhZG93UHJvcGVydHkudmFsdWUgPSB0aGlzLm9yaWdpblNoYWRvdyAqICggMSAtIGVhc2VkUmF0aW8gKSArIHRoaXMuZGVzdGluYXRpb25TaGFkb3cgKiBlYXNlZFJhdGlvO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBlbmRBbmdsZSBjbG9zZXN0IHRvIHRoZSBzdGFydEFuZ2xlIChtb2QgMnBpKS5cclxuICAgKiBAcHVibGljXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRBbmdsZVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBlbmRBbmdsZVxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgc3RhdGljIG1vZGlmaWVkRW5kQW5nbGUoIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlICkge1xyXG4gICAgbGV0IG1vZGlmaWVkRW5kQW5nbGUgPSBVdGlscy5tb2R1bG9CZXR3ZWVuRG93biggZW5kQW5nbGUsIHN0YXJ0QW5nbGUsIHN0YXJ0QW5nbGUgKyAyICogTWF0aC5QSSApO1xyXG4gICAgaWYgKCBtb2RpZmllZEVuZEFuZ2xlID4gc3RhcnRBbmdsZSArIE1hdGguUEkgKSB7XHJcbiAgICAgIG1vZGlmaWVkRW5kQW5nbGUgLT0gMiAqIE1hdGguUEk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbW9kaWZpZWRFbmRBbmdsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENpcmN1bGFyIGxpbmVhciBpbnRlcnBvbGF0aW9uIChsaWtlIHNsZXJwLCBidXQgb24gYSBwbGFuZSkuXHJcbiAgICogQHB1YmxpY1xyXG4gICAqXHJcbiAgICogTk9URTogbXkgR29vZ2xlIHNlYXJjaCBmb3IgXCJzbGVycCBvbiBhIHBsYW5lXCIgZGlkbid0IGNvbWUgdXAgd2l0aCBhbnl0aGluZyB1c2VmdWwgYmVzaWRlcyBuZWNrIHBpbGxvd3MsIHNvIHRoaXNcclxuICAgKiBpcyBqdXN0IGNhbGxlZCBjbGVycC4gOlBcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydEFuZ2xlXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGVuZEFuZ2xlXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJhdGlvXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBzdGF0aWMgY2xlcnAoIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlLCByYXRpbyApIHtcclxuICAgIHJldHVybiBzdGFydEFuZ2xlICogKCAxIC0gcmF0aW8gKSArIEFuaW1hdG9yLm1vZGlmaWVkRW5kQW5nbGUoIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlICkgKiByYXRpbztcclxuICB9XHJcbn1cclxuXHJcbmZyYWN0aW9uc0NvbW1vbi5yZWdpc3RlciggJ0FuaW1hdG9yJywgQW5pbWF0b3IgKTtcclxuZXhwb3J0IGRlZmF1bHQgQW5pbWF0b3I7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFFBQVEsTUFBTSxpQ0FBaUM7QUFDdEQsT0FBT0MsS0FBSyxNQUFNLDZCQUE2QjtBQUMvQyxPQUFPQyxLQUFLLE1BQU0sbUNBQW1DO0FBQ3JELE9BQU9DLE1BQU0sTUFBTSxnQ0FBZ0M7QUFDbkQsT0FBT0MsZUFBZSxNQUFNLDBCQUEwQjtBQUV0RCxNQUFNQyxRQUFRLENBQUM7RUFDYjtBQUNGO0FBQ0E7RUFDRUMsV0FBV0EsQ0FBRUMsTUFBTSxFQUFHO0lBQ3BCQSxNQUFNLEdBQUdMLEtBQUssQ0FBRTtNQUVkO01BQ0FNLGdCQUFnQixFQUFFLElB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