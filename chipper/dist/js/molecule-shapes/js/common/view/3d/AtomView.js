// Copyright 2014-2021, University of Colorado Boulder

/**
 * View of an atom {THREE.Object3D}
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Ray3 from '../../../../../dot/js/Ray3.js';
import Sphere3 from '../../../../../dot/js/Sphere3.js';
import Vector3 from '../../../../../dot/js/Vector3.js';
import { Color } from '../../../../../scenery/js/imports.js';
import moleculeShapes from '../../../moleculeShapes.js';
import MoleculeShapesGlobals from '../../MoleculeShapesGlobals.js';
import MoleculeShapesColors from '../MoleculeShapesColors.js';
import LocalGeometry from './LocalGeometry.js';
import LocalMaterial from './LocalMaterial.js';
const DISPLAY_RADIUS = 2;
const TOUCH_RADIUS = 3;
const NUM_SAMPLES = MoleculeShapesGlobals.useWebGLProperty.value ? 64 : 12;
const OVERDRAW = MoleculeShapesGlobals.useWebGLProperty.value ? 0 : 0.5; // amount to extend polygons when using Canvas to avoid cracks

// renderer-local access
const localAtomGeometry = new LocalGeometry(new THREE.SphereGeometry(DISPLAY_RADIUS, NUM_SAMPLES, NUM_SAMPLES));
const elementLocalMaterials = {
  // filled in dynamically in getElementLocalMaterial
};
const mouseHitTestSphere = new Sphere3(Vector3.ZERO, DISPLAY_RADIUS);
const touchHitTestSphere = new Sphere3(Vector3.ZERO, TOUCH_RADIUS);
class AtomView extends THREE.Mesh {
  /*
   * @param {PairGroup} group
   * @param {THREE.Renderer} renderer - To know which geometries/materials to use for which renderer (can't share)
   * @param {LocalMaterial} localMaterial - preferably from one of AtomView's static methods/properties
   */
  constructor(group, renderer, localMaterial) {
    super(localAtomGeometry.get(renderer), localMaterial.get(renderer));
    this.group = group; // @private {PairGroup}

    if (phet.chipper.queryParameters.showPointerAreas) {
      if (localMaterial !== AtomView.centralAtomLocalMaterial) {
        this.add(new THREE.Mesh(new THREE.SphereGeometry(TOUCH_RADIUS, NUM_SAMPLES, NUM_SAMPLES), new THREE.MeshBasicMaterial({
          color: 0xff0000,
          transparent: true,
          opacity: 0.4,
          depthWrite: false
        })));
      }
    }
  }

  /*
   * Intersection test for whether the mouse/touch is over this.
   * @public
   *
   * @param {THREE.Ray} worldRay - Camera ray in world space
   * @param {boolean} isTouch - Whether expanded touch regions should be included
   * @returns {THREE.Vector3|null} - The first intersection point (in world coordinates) if it exists, otherwise null
   */
  intersect(worldRay, isTouch) {
    const inverseMatrix = new THREE.Matrix4();
    const ray = new THREE.Ray();
    const sphere = isTouch ? touchHitTestSphere : mouseHitTestSphere;

    // transform the ray into local coordinates
    inverseMatrix.getInverse(this.matrixWorld);
    ray.copy(worldRay).applyMatrix4(inverseMatrix);
    const hitResult = sphere.intersect(new Ray3(new Vector3(0, 0, 0).set(ray.origin), new Vector3(0, 0, 0).set(ray.direction)), 0.00001);
    if (hitResult === null) {
      return null;
    }
    const localPoint = hitResult.hitPoint;
    return new THREE.Vector3().copy(localPoint).applyMatrix4(this.matrixWorld);
  }

  /**
   * Returns the shared LocalMaterial for a specific Element (we don't want to have multiple LocalMaterials for the
   * same element due to memory concerns).
   * @public
   *
   * @param {NITROGLYCERIN.Element} element
   * @returns {LocalMaterial}
   */
  static getElementLocalMaterial(element) {
    // Lazily create LocalMaterials for each element.
    // We'll want one material for each renderer-element pair, since we can't share across renderers, and we want to
    // share the material with the same element when possible.

    let localMaterial = elementLocalMaterials[element.symbol];
    if (!localMaterial) {
      localMaterial = elementLocalMaterials[element.symbol] = new LocalMaterial(new THREE.MeshLambertMaterial({
        color: new Color(element.color).toNumber(),
        overdraw: OVERDRAW
      }));
    }
    return localMaterial;
  }
}

// @public {LocalMaterial} - renderer-local access
AtomView.centralAtomLocalMaterial = new LocalMaterial(new THREE.MeshLambertMaterial({
  overdraw: OVERDRAW
}), {
  color: MoleculeShapesColors.centralAtomProperty
});

// @public {LocalMaterial} - renderer-local access
AtomView.atomLocalMaterial = new LocalMaterial(new THREE.MeshLambertMaterial({
  overdraw: OVERDRAW
}), {
  color: MoleculeShapesColors.atomProperty
});
moleculeShapes.register('AtomView', AtomView);
export default AtomView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSYXkzIiwiU3BoZXJlMyIsIlZlY3RvcjMiLCJDb2xvciIsIm1vbGVjdWxlU2hhcGVzIiwiTW9sZWN1bGVTaGFwZXNHbG9iYWxzIiwiTW9sZWN1bGVTaGFwZXNDb2xvcnMiLCJMb2NhbEdlb21ldHJ5IiwiTG9jYWxNYXRlcmlhbCIsIkRJU1BMQVlfUkFESVVTIiwiVE9VQ0hfUkFESVVTIiwiTlVNX1NBTVBMRVMiLCJ1c2VXZWJHTFByb3BlcnR5IiwidmFsdWUiLCJPVkVSRFJBVyIsImxvY2FsQXRvbUdlb21ldHJ5IiwiVEhSRUUiLCJTcGhlcmVHZW9tZXRyeSIsImVsZW1lbnRMb2NhbE1hdGVyaWFscyIsIm1vdXNlSGl0VGVzdFNwaGVyZSIsIlpFUk8iLCJ0b3VjaEhpdFRlc3RTcGhlcmUiLCJBdG9tVmlldyIsIk1lc2giLCJjb25zdHJ1Y3RvciIsImdyb3VwIiwicmVuZGVyZXIiLCJsb2NhbE1hdGVyaWFsIiwiZ2V0IiwicGhldCIsImNoaXBwZXIiLCJxdWVyeVBhcmFtZXRlcnMiLCJzaG93UG9pbnRlckFyZWFzIiwiY2VudHJhbEF0b21Mb2NhbE1hdGVyaWFsIiwiYWRkIiwiTWVzaEJhc2ljTWF0ZXJpYWwiLCJjb2xvciIsInRyYW5zcGFyZW50Iiwib3BhY2l0eSIsImRlcHRoV3JpdGUiLCJpbnRlcnNlY3QiLCJ3b3JsZFJheSIsImlzVG91Y2giLCJpbnZlcnNlTWF0cml4IiwiTWF0cml4NCIsInJheSIsIlJheSIsInNwaGVyZSIsImdldEludmVyc2UiLCJtYXRyaXhXb3JsZCIsImNvcHkiLCJhcHBseU1hdHJpeDQiLCJoaXRSZXN1bHQiLCJzZXQiLCJvcmlnaW4iLCJkaXJlY3Rpb24iLCJsb2NhbFBvaW50IiwiaGl0UG9pbnQiLCJnZXRFbGVtZW50TG9jYWxNYXRlcmlhbCIsImVsZW1lbnQiLCJzeW1ib2wiLCJNZXNoTGFtYmVydE1hdGVyaWFsIiwidG9OdW1iZXIiLCJvdmVyZHJhdyIsImNlbnRyYWxBdG9tUHJvcGVydHkiLCJhdG9tTG9jYWxNYXRlcmlhbCIsImF0b21Qcm9wZXJ0eSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiQXRvbVZpZXcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTQtMjAyMSwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogVmlldyBvZiBhbiBhdG9tIHtUSFJFRS5PYmplY3QzRH1cclxuICpcclxuICogQGF1dGhvciBKb25hdGhhbiBPbHNvbiA8am9uYXRoYW4ub2xzb25AY29sb3JhZG8uZWR1PlxyXG4gKi9cclxuXHJcbmltcG9ydCBSYXkzIGZyb20gJy4uLy4uLy4uLy4uLy4uL2RvdC9qcy9SYXkzLmpzJztcclxuaW1wb3J0IFNwaGVyZTMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vZG90L2pzL1NwaGVyZTMuanMnO1xyXG5pbXBvcnQgVmVjdG9yMyBmcm9tICcuLi8uLi8uLi8uLi8uLi9kb3QvanMvVmVjdG9yMy5qcyc7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IG1vbGVjdWxlU2hhcGVzIGZyb20gJy4uLy4uLy4uL21vbGVjdWxlU2hhcGVzLmpzJztcclxuaW1wb3J0IE1vbGVjdWxlU2hhcGVzR2xvYmFscyBmcm9tICcuLi8uLi9Nb2xlY3VsZVNoYXBlc0dsb2JhbHMuanMnO1xyXG5pbXBvcnQgTW9sZWN1bGVTaGFwZXNDb2xvcnMgZnJvbSAnLi4vTW9sZWN1bGVTaGFwZXNDb2xvcnMuanMnO1xyXG5pbXBvcnQgTG9jYWxHZW9tZXRyeSBmcm9tICcuL0xvY2FsR2VvbWV0cnkuanMnO1xyXG5pbXBvcnQgTG9jYWxNYXRlcmlhbCBmcm9tICcuL0xvY2FsTWF0ZXJpYWwuanMnO1xyXG5cclxuY29uc3QgRElTUExBWV9SQURJVVMgPSAyO1xyXG5jb25zdCBUT1VDSF9SQURJVVMgPSAzO1xyXG5jb25zdCBOVU1fU0FNUExFUyA9IE1vbGVjdWxlU2hhcGVzR2xvYmFscy51c2VXZWJHTFByb3BlcnR5LnZhbHVlID8gNjQgOiAxMjtcclxuY29uc3QgT1ZFUkRSQVcgPSBNb2xlY3VsZVNoYXBlc0dsb2JhbHMudXNlV2ViR0xQcm9wZXJ0eS52YWx1ZSA/IDAgOiAwLjU7IC8vIGFtb3VudCB0byBleHRlbmQgcG9seWdvbnMgd2hlbiB1c2luZyBDYW52YXMgdG8gYXZvaWQgY3JhY2tzXHJcblxyXG4vLyByZW5kZXJlci1sb2NhbCBhY2Nlc3NcclxuY29uc3QgbG9jYWxBdG9tR2VvbWV0cnkgPSBuZXcgTG9jYWxHZW9tZXRyeSggbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KCBESVNQTEFZX1JBRElVUywgTlVNX1NBTVBMRVMsIE5VTV9TQU1QTEVTICkgKTtcclxuXHJcbmNvbnN0IGVsZW1lbnRMb2NhbE1hdGVyaWFscyA9IHtcclxuICAvLyBmaWxsZWQgaW4gZHluYW1pY2FsbHkgaW4gZ2V0RWxlbWVudExvY2FsTWF0ZXJpYWxcclxufTtcclxuXHJcbmNvbnN0IG1vdXNlSGl0VGVzdFNwaGVyZSA9IG5ldyBTcGhlcmUzKCBWZWN0b3IzLlpFUk8sIERJU1BMQVlfUkFESVVTICk7XHJcbmNvbnN0IHRvdWNoSGl0VGVzdFNwaGVyZSA9IG5ldyBTcGhlcmUzKCBWZWN0b3IzLlpFUk8sIFRPVUNIX1JBRElVUyApO1xyXG5cclxuY2xhc3MgQXRvbVZpZXcgZXh0ZW5kcyBUSFJFRS5NZXNoIHtcclxuICAvKlxyXG4gICAqIEBwYXJhbSB7UGFpckdyb3VwfSBncm91cFxyXG4gICAqIEBwYXJhbSB7VEhSRUUuUmVuZGVyZXJ9IHJlbmRlcmVyIC0gVG8ga25vdyB3aGljaCBnZW9tZXRyaWVzL21hdGVyaWFscyB0byB1c2UgZm9yIHdoaWNoIHJlbmRlcmVyIChjYW4ndCBzaGFyZSlcclxuICAgKiBAcGFyYW0ge0xvY2FsTWF0ZXJpYWx9IGxvY2FsTWF0ZXJpYWwgLSBwcmVmZXJhYmx5IGZyb20gb25lIG9mIEF0b21WaWV3J3Mgc3RhdGljIG1ldGhvZHMvcHJvcGVydGllc1xyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBncm91cCwgcmVuZGVyZXIsIGxvY2FsTWF0ZXJpYWwgKSB7XHJcbiAgICBzdXBlciggbG9jYWxBdG9tR2VvbWV0cnkuZ2V0KCByZW5kZXJlciApLCBsb2NhbE1hdGVyaWFsLmdldCggcmVuZGVyZXIgKSApO1xyXG5cclxuICAgIHRoaXMuZ3JvdXAgPSBncm91cDsgLy8gQHByaXZhdGUge1BhaXJHcm91cH1cclxuXHJcbiAgICBpZiAoIHBoZXQuY2hpcHBlci5xdWVyeVBhcmFtZXRlcnMuc2hvd1BvaW50ZXJBcmVhcyApIHtcclxuICAgICAgaWYgKCBsb2NhbE1hdGVyaWFsICE9PSBBdG9tVmlldy5jZW50cmFsQXRvbUxvY2FsTWF0ZXJpYWwgKSB7XHJcbiAgICAgICAgdGhpcy5hZGQoIG5ldyBUSFJFRS5NZXNoKCBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoIFRPVUNIX1JBRElVUywgTlVNX1NBTVBMRVMsIE5VTV9TQU1QTEVTICksIG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCgge1xyXG4gICAgICAgICAgY29sb3I6IDB4ZmYwMDAwLFxyXG4gICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXHJcbiAgICAgICAgICBvcGFjaXR5OiAwLjQsXHJcbiAgICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZVxyXG4gICAgICAgIH0gKSApICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogSW50ZXJzZWN0aW9uIHRlc3QgZm9yIHdoZXRoZXIgdGhlIG1vdXNlL3RvdWNoIGlzIG92ZXIgdGhpcy5cclxuICAgKiBAcHVibGljXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1RIUkVFLlJheX0gd29ybGRSYXkgLSBDYW1lcmEgcmF5IGluIHdvcmxkIHNwYWNlXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBpc1RvdWNoIC0gV2hldGhlciBleHBhbmRlZCB0b3VjaCByZWdpb25zIHNob3VsZCBiZSBpbmNsdWRlZFxyXG4gICAqIEByZXR1cm5zIHtUSFJFRS5WZWN0b3IzfG51bGx9IC0gVGhlIGZpcnN0IGludGVyc2VjdGlvbiBwb2ludCAoaW4gd29ybGQgY29vcmRpbmF0ZXMpIGlmIGl0IGV4aXN0cywgb3RoZXJ3aXNlIG51bGxcclxuICAgKi9cclxuICBpbnRlcnNlY3QoIHdvcmxkUmF5LCBpc1RvdWNoICkge1xyXG4gICAgY29uc3QgaW52ZXJzZU1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XHJcbiAgICBjb25zdCByYXkgPSBuZXcgVEhSRUUuUmF5KCk7XHJcblxyXG4gICAgY29uc3Qgc3BoZXJlID0gaXNUb3VjaCA/IHRvdWNoSGl0VGVzdFNwaGVyZSA6IG1vdXNlSGl0VGVzdFNwaGVyZTtcclxuXHJcbiAgICAvLyB0cmFuc2Zvcm0gdGhlIHJheSBpbnRvIGxvY2FsIGNvb3JkaW5hdGVzXHJcbiAgICBpbnZlcnNlTWF0cml4LmdldEludmVyc2UoIHRoaXMubWF0cml4V29ybGQgKTtcclxuICAgIHJheS5jb3B5KCB3b3JsZFJheSApLmFwcGx5TWF0cml4NCggaW52ZXJzZU1hdHJpeCApO1xyXG5cclxuICAgIGNvbnN0IGhpdFJlc3VsdCA9IHNwaGVyZS5pbnRlcnNlY3QoIG5ldyBSYXkzKCBuZXcgVmVjdG9yMyggMCwgMCwgMCApLnNldCggcmF5Lm9yaWdpbiApLCBuZXcgVmVjdG9yMyggMCwgMCwgMCApLnNldCggcmF5LmRpcmVjdGlvbiApICksIDAuMDAwMDEgKTtcclxuICAgIGlmICggaGl0UmVzdWx0ID09PSBudWxsICkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbnN0IGxvY2FsUG9pbnQgPSBoaXRSZXN1bHQuaGl0UG9pbnQ7XHJcbiAgICByZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjMoKS5jb3B5KCBsb2NhbFBvaW50ICkuYXBwbHlNYXRyaXg0KCB0aGlzLm1hdHJpeFdvcmxkICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBzaGFyZWQgTG9jYWxNYXRlcmlhbCBmb3IgYSBzcGVjaWZpYyBFbGVtZW50ICh3ZSBkb24ndCB3YW50IHRvIGhhdmUgbXVsdGlwbGUgTG9jYWxNYXRlcmlhbHMgZm9yIHRoZVxyXG4gICAqIHNhbWUgZWxlbWVudCBkdWUgdG8gbWVtb3J5IGNvbmNlcm5zKS5cclxuICAgKiBAcHVibGljXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge05JVFJPR0xZQ0VSSU4uRWxlbWVudH0gZWxlbWVudFxyXG4gICAqIEByZXR1cm5zIHtMb2NhbE1hdGVyaWFsfVxyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRFbGVtZW50TG9jYWxNYXRlcmlhbCggZWxlbWVudCApIHtcclxuICAgIC8vIExhemlseSBjcmVhdGUgTG9jYWxNYXRlcmlhbHMgZm9yIGVhY2ggZWxlbWVudC5cclxuICAgIC8vIFdlJ2xsIHdhbnQgb25lIG1hdGVyaWFsIGZvciBlYWNoIHJlbmRlcmVyLWVsZW1lbnQgcGFpciwgc2luY2Ugd2UgY2FuJ3Qgc2hhcmUgYWNyb3NzIHJlbmRlcmVycywgYW5kIHdlIHdhbnQgdG9cclxuICAgIC8vIHNoYXJlIHRoZSBtYXRlcmlhbCB3aXRoIHRoZSBzYW1lIGVsZW1lbnQgd2hlbiBwb3NzaWJsZS5cclxuXHJcbiAgICBsZXQgbG9jYWxNYXRlcmlhbCA9IGVsZW1lbnRMb2NhbE1hdGVyaWFsc1sgZWxlbWVudC5zeW1ib2wgXTtcclxuICAgIGlmICggIWxvY2FsTWF0ZXJpYWwgKSB7XHJcbiAgICAgIGxvY2FsTWF0ZXJpYWwgPSBlbGVtZW50TG9jYWxNYXRlcmlhbHNbIGVsZW1lbnQuc3ltYm9sIF0gPSBuZXcgTG9jYWxNYXRlcmlhbCggbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoIHtcclxuICAgICAgICBjb2xvcjogbmV3IENvbG9yKCBlbGVtZW50LmNvbG9yICkudG9OdW1iZXIoKSxcclxuICAgICAgICBvdmVyZHJhdzogT1ZFUkRSQVdcclxuICAgICAgfSApICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbG9jYWxNYXRlcmlhbDtcclxuICB9XHJcbn1cclxuXHJcbi8vIEBwdWJsaWMge0xvY2FsTWF0ZXJpYWx9IC0gcmVuZGVyZXItbG9jYWwgYWNjZXNzXHJcbkF0b21WaWV3LmNlbnRyYWxBdG9tTG9jYWxNYXRlcmlhbCA9IG5ldyBMb2NhbE1hdGVyaWFsKCBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCggeyBvdmVyZHJhdzogT1ZFUkRSQVcgfSApLCB7XHJcbiAgY29sb3I6IE1vbGVjdWxlU2hhcGVzQ29sb3JzLmNlbnRyYWxBdG9tUHJvcGVydHlcclxufSApO1xyXG5cclxuLy8gQHB1YmxpYyB7TG9jYWxNYXRlcmlhbH0gLSByZW5kZXJlci1sb2NhbCBhY2Nlc3NcclxuQXRvbVZpZXcuYXRvbUxvY2FsTWF0ZXJpYWwgPSBuZXcgTG9jYWxNYXRlcmlhbCggbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoIHsgb3ZlcmRyYXc6IE9WRVJEUkFXIH0gKSwge1xyXG4gIGNvbG9yOiBNb2xlY3VsZVNoYXBlc0NvbG9ycy5hdG9tUHJvcGVydHlcclxufSApO1xyXG5cclxubW9sZWN1bGVTaGFwZXMucmVnaXN0ZXIoICdBdG9tVmlldycsIEF0b21WaWV3ICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdG9tVmlldzsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsSUFBSSxNQUFNLCtCQUErQjtBQUNoRCxPQUFPQyxPQUFPLE1BQU0sa0NBQWtDO0FBQ3RELE9BQU9DLE9BQU8sTUFBTSxrQ0FBa0M7QUFDdEQsU0FBU0MsS0FBSyxRQUFRLHNDQUFzQztBQUM1RCxPQUFPQyxjQUFjLE1BQU0sNEJBQTRCO0FBQ3ZELE9BQU9DLHFCQUFxQixNQUFNLGdDQUFnQztBQUNsRSxPQUFPQyxvQkFBb0IsTUFBTSw0QkFBNEI7QUFDN0QsT0FBT0MsYUFBYSxNQUFNLG9CQUFvQjtBQUM5QyxPQUFPQyxhQUFhLE1BQU0sb0JBQW9CO0FBRTlDLE1BQU1DLGNBQWMsR0FBRyxDQUFDO0FBQ3hCLE1BQU1DLFlBQVksR0FBRyxD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