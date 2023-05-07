// Copyright 2021-2023, University of Colorado Boulder

/**
 * Ported from the original file MicroPhoton.java.  This will model a particular photon.  Primarily keeps track of
 * wavelength, position, and velocity (as odd as that may seem) and can be stepped in order to make the photon move in
 * model space.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import greenhouseEffect from '../../greenhouseEffect.js';
class MicroPhoton extends PhetioObject {
  /**
   * Constructor for a photon.
   *
   * @param {Number} wavelength
   * @param {Object} [options]
   */
  constructor(wavelength, options) {
    options = merge({
      tandem: Tandem.REQUIRED,
      phetioType: MicroPhoton.PhotonIO,
      phetioDynamicElement: true
    }, options);

    // Photons in the play area are instrumented, those in the control panel (for icons) are not.
    super(options);
    this.positionProperty = new Vector2Property(new Vector2(0, 0), {
      tandem: options.tandem.createTandem('positionProperty')
    });

    // @private
    this.wavelength = wavelength;
    this.vx = 0; // x component of the photon velocity
    this.vy = 0; // y component of the photon velocity
  }

  /**
   * @public
   */
  dispose() {
    this.positionProperty.unlinkAll(); // TODO: this seems like a hack, but is it a good hack?
    this.positionProperty.dispose();
    super.dispose();
  }

  /**
   * Set the velocity of this photon from vector components.
   * @public
   * @param {number} vx - The x component of the velocity vector.
   * @param {number} vy - The y component of the velocity vector.
   */
  setVelocity(vx, vy) {
    this.vx = vx;
    this.vy = vy;
  }

  /**
   * Change the state of this photon by stepping it in time.
   * @public
   *
   * @param {number} dt - The incremental time step.
   */
  step(dt) {
    this.positionProperty.set(new Vector2(this.positionProperty.get().x + this.vx * dt, this.positionProperty.get().y + this.vy * dt));
  }
}
greenhouseEffect.register('MicroPhoton', MicroPhoton);
MicroPhoton.PhotonIO = new IOType('PhotonIO', {
  valueType: MicroPhoton,
  toStateObject: photon => ({
    // position is tracked via a child Property
    wavelength: photon.wavelength
  }),
  stateSchema: {
    wavelength: NumberIO
  },
  stateObjectToCreateElementArguments: stateObject => [stateObject.wavelength]
});
export default MicroPhoton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWZWN0b3IyIiwiVmVjdG9yMlByb3BlcnR5IiwibWVyZ2UiLCJQaGV0aW9PYmplY3QiLCJUYW5kZW0iLCJJT1R5cGUiLCJOdW1iZXJJTyIsImdyZWVuaG91c2VFZmZlY3QiLCJNaWNyb1Bob3RvbiIsImNvbnN0cnVjdG9yIiwid2F2ZWxlbmd0aCIsIm9wdGlvbnMiLCJ0YW5kZW0iLCJSRVFVSVJFRCIsInBoZXRpb1R5cGUiLCJQaG90b25JTyIsInBoZXRpb0R5bmFtaWNFbGVtZW50IiwicG9zaXRpb25Qcm9wZXJ0eSIsImNyZWF0ZVRhbmRlbSIsInZ4IiwidnkiLCJkaXNwb3NlIiwidW5saW5rQWxsIiwic2V0VmVsb2NpdHkiLCJzdGVwIiwiZHQiLCJzZXQiLCJnZXQiLCJ4IiwieSIsInJlZ2lzdGVyIiwidmFsdWVUeXBlIiwidG9TdGF0ZU9iamVjdCIsInBob3RvbiIsInN0YXRlU2NoZW1hIiwic3RhdGVPYmplY3RUb0NyZWF0ZUVsZW1lbnRBcmd1bWVudHMiLCJzdGF0ZU9iamVjdCJdLCJzb3VyY2VzIjpbIk1pY3JvUGhvdG9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIxLTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFBvcnRlZCBmcm9tIHRoZSBvcmlnaW5hbCBmaWxlIE1pY3JvUGhvdG9uLmphdmEuICBUaGlzIHdpbGwgbW9kZWwgYSBwYXJ0aWN1bGFyIHBob3Rvbi4gIFByaW1hcmlseSBrZWVwcyB0cmFjayBvZlxyXG4gKiB3YXZlbGVuZ3RoLCBwb3NpdGlvbiwgYW5kIHZlbG9jaXR5IChhcyBvZGQgYXMgdGhhdCBtYXkgc2VlbSkgYW5kIGNhbiBiZSBzdGVwcGVkIGluIG9yZGVyIHRvIG1ha2UgdGhlIHBob3RvbiBtb3ZlIGluXHJcbiAqIG1vZGVsIHNwYWNlLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEpvaG4gQmxhbmNvXHJcbiAqIEBhdXRob3IgSmVzc2UgR3JlZW5iZXJnXHJcbiAqL1xyXG5cclxuaW1wb3J0IFZlY3RvcjIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1ZlY3RvcjIuanMnO1xyXG5pbXBvcnQgVmVjdG9yMlByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9WZWN0b3IyUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgbWVyZ2UgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL21lcmdlLmpzJztcclxuaW1wb3J0IFBoZXRpb09iamVjdCBmcm9tICcuLi8uLi8uLi8uLi90YW5kZW0vanMvUGhldGlvT2JqZWN0LmpzJztcclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi8uLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuaW1wb3J0IElPVHlwZSBmcm9tICcuLi8uLi8uLi8uLi90YW5kZW0vanMvdHlwZXMvSU9UeXBlLmpzJztcclxuaW1wb3J0IE51bWJlcklPIGZyb20gJy4uLy4uLy4uLy4uL3RhbmRlbS9qcy90eXBlcy9OdW1iZXJJTy5qcyc7XHJcbmltcG9ydCBncmVlbmhvdXNlRWZmZWN0IGZyb20gJy4uLy4uL2dyZWVuaG91c2VFZmZlY3QuanMnO1xyXG5cclxuY2xhc3MgTWljcm9QaG90b24gZXh0ZW5kcyBQaGV0aW9PYmplY3Qge1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvciBmb3IgYSBwaG90b24uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge051bWJlcn0gd2F2ZWxlbmd0aFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvciggd2F2ZWxlbmd0aCwgb3B0aW9ucyApIHtcclxuXHJcbiAgICBvcHRpb25zID0gbWVyZ2UoIHtcclxuICAgICAgdGFuZGVtOiBUYW5kZW0uUkVRVUlSRUQsXHJcbiAgICAgIHBoZXRpb1R5cGU6IE1pY3JvUGhvdG9uLlBob3RvbklPLFxyXG4gICAgICBwaGV0aW9EeW5hbWljRWxlbWVudDogdHJ1ZVxyXG4gICAgfSwgb3B0aW9ucyApO1xyXG5cclxuICAgIC8vIFBob3RvbnMgaW4gdGhlIHBsYXkgYXJlYSBhcmUgaW5zdHJ1bWVudGVkLCB0aG9zZSBpbiB0aGUgY29udHJvbCBwYW5lbCAoZm9yIGljb25zKSBhcmUgbm90LlxyXG4gICAgc3VwZXIoIG9wdGlvbnMgKTtcclxuXHJcbiAgICB0aGlzLnBvc2l0aW9uUHJvcGVydHkgPSBuZXcgVmVjdG9yMlByb3BlcnR5KCBuZXcgVmVjdG9yMiggMCwgMCApLCB7XHJcbiAgICAgIHRhbmRlbTogb3B0aW9ucy50YW5kZW0uY3JlYXRlVGFuZGVtKCAncG9zaXRpb25Qcm9wZXJ0eScgKVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIEBwcml2YXRlXHJcbiAgICB0aGlzLndhdmVsZW5ndGggPSB3YXZlbGVuZ3RoO1xyXG4gICAgdGhpcy52eCA9IDA7IC8vIHggY29tcG9uZW50IG9mIHRoZSBwaG90b24gdmVsb2NpdHlcclxuICAgIHRoaXMudnkgPSAwOyAvLyB5IGNvbXBvbmVudCBvZiB0aGUgcGhvdG9uIHZlbG9jaXR5XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICB0aGlzLnBvc2l0aW9uUHJvcGVydHkudW5saW5rQWxsKCk7IC8vIFRPRE86IHRoaXMgc2VlbXMgbGlrZSBhIGhhY2ssIGJ1dCBpcyBpdCBhIGdvb2QgaGFjaz9cclxuICAgIHRoaXMucG9zaXRpb25Qcm9wZXJ0eS5kaXNwb3NlKCk7XHJcbiAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHZlbG9jaXR5IG9mIHRoaXMgcGhvdG9uIGZyb20gdmVjdG9yIGNvbXBvbmVudHMuXHJcbiAgICogQHB1YmxpY1xyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2eCAtIFRoZSB4IGNvbXBvbmVudCBvZiB0aGUgdmVsb2NpdHkgdmVjdG9yLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2eSAtIFRoZSB5IGNvbXBvbmVudCBvZiB0aGUgdmVsb2NpdHkgdmVjdG9yLlxyXG4gICAqL1xyXG4gIHNldFZlbG9jaXR5KCB2eCwgdnkgKSB7XHJcbiAgICB0aGlzLnZ4ID0gdng7XHJcbiAgICB0aGlzLnZ5ID0gdnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2UgdGhlIHN0YXRlIG9mIHRoaXMgcGhvdG9uIGJ5IHN0ZXBwaW5nIGl0IGluIHRpbWUuXHJcbiAgICogQHB1YmxpY1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGR0IC0gVGhlIGluY3JlbWVudGFsIHRpbWUgc3RlcC5cclxuICAgKi9cclxuICBzdGVwKCBkdCApIHtcclxuICAgIHRoaXMucG9zaXRpb25Qcm9wZXJ0eS5zZXQoIG5ldyBWZWN0b3IyKCB0aGlzLnBvc2l0aW9uUHJvcGVydHkuZ2V0KCkueCArIHRoaXMudnggKiBkdCwgdGhpcy5wb3NpdGlvblByb3BlcnR5LmdldCgpLnkgKyB0aGlzLnZ5ICogZHQgKSApO1xyXG4gIH1cclxufVxyXG5cclxuZ3JlZW5ob3VzZUVmZmVjdC5yZWdpc3RlciggJ01pY3JvUGhvdG9uJywgTWljcm9QaG90b24gKTtcclxuXHJcbk1pY3JvUGhvdG9uLlBob3RvbklPID0gbmV3IElPVHlwZSggJ1Bob3RvbklPJywge1xyXG4gICAgdmFsdWVUeXBlOiBNaWNyb1Bob3RvbixcclxuICAgIHRvU3RhdGVPYmplY3Q6IHBob3RvbiA9PiAoIHtcclxuXHJcbiAgICAgIC8vIHBvc2l0aW9uIGlzIHRyYWNrZWQgdmlhIGEgY2hpbGQgUHJvcGVydHlcclxuICAgICAgd2F2ZWxlbmd0aDogcGhvdG9uLndhdmVsZW5ndGhcclxuICAgIH0gKSxcclxuICAgIHN0YXRlU2NoZW1hOiB7XHJcbiAgICAgIHdhdmVsZW5ndGg6IE51bWJlcklPXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRlT2JqZWN0VG9DcmVhdGVFbGVtZW50QXJndW1lbnRzOiBzdGF0ZU9iamVjdCA9PiBbIHN0YXRlT2JqZWN0LndhdmVsZW5n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