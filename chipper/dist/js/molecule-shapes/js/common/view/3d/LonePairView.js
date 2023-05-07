// Copyright 2014-2022, University of Colorado Boulder

/**
 * View of a lone pair
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import moleculeShapes from '../../../moleculeShapes.js';
import LonePairGeometryData from '../../data/LonePairGeometryData.js';
import PairGroup from '../../model/PairGroup.js';
import MoleculeShapesGlobals from '../../MoleculeShapesGlobals.js';
import MoleculeShapesColors from '../MoleculeShapesColors.js';
import ElectronView from './ElectronView.js';
import LocalGeometry from './LocalGeometry.js';
import LocalMaterial from './LocalMaterial.js';
import LocalPool from './LocalPool.js';
const jsonLoader = new THREE.JSONLoader();

// geometry used for display
const masterShellGeometry = jsonLoader.parse(MoleculeShapesGlobals.useWebGLProperty.value ? LonePairGeometryData.HIGH_DETAIL : LonePairGeometryData.LOW_DETAIL_QUADS).geometry;
// renderer-local access
const localShellGeometry = new LocalGeometry(masterShellGeometry);
const localShellMaterial = new LocalMaterial(new THREE.MeshLambertMaterial({
  transparent: true,
  opacity: 0.7,
  depthWrite: false,
  // don't write depth values, so we don't cause other transparent objects to render
  overdraw: MoleculeShapesGlobals.useWebGLProperty.value ? 0 : 0.1 // amount to extend polygons when using Canvas to avoid cracks
}), {
  color: MoleculeShapesColors.lonePairShellProperty
});

// geometries used for hit testing (includes a larger touch hit mesh)
const mouseHitTestGeometry = jsonLoader.parse(LonePairGeometryData.LOW_DETAIL).geometry;
const touchHitTestGeometry = jsonLoader.parse(LonePairGeometryData.LOW_DETAIL_EXTRUDED).geometry;
class LonePairView extends THREE.Object3D {
  /*
   * @param {THREE.Renderer} renderer
   */
  constructor(renderer) {
    super();
    this.renderer = renderer; // @private {THREE.Renderer}
    this.shellGeometry = localShellGeometry.get(renderer); // @private {THREE.Geometry}
    this.shellMaterial = localShellMaterial.get(renderer); // @private {THREE.Material}

    this.shell = new THREE.Mesh(this.shellGeometry, this.shellMaterial); // @private {THREE.Mesh}

    // scale for the shell geometries (for display and hit testing)
    const shellScale = 2.5;
    this.shell.scale.x = this.shell.scale.y = this.shell.scale.z = shellScale;
    this.shell.position.y = 0.001; // slight offset so three.js will z-sort the shells correctly for the transparency pass
    this.add(this.shell);
    this.electronView1 = new ElectronView(renderer); // @private
    this.electronView2 = new ElectronView(renderer); // @private
    this.add(this.electronView1);
    this.add(this.electronView2);
    this.electronView1.position.x = 0.75;
    this.electronView2.position.x = -0.75;
    this.electronView1.position.y = this.electronView2.position.y = 5;
    if (phet.chipper.queryParameters.showPointerAreas) {
      const touchShell = new THREE.Mesh(touchHitTestGeometry.clone(), new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.4,
        depthWrite: false
      }));
      touchShell.scale.x = touchShell.scale.y = touchShell.scale.z = shellScale;
      touchShell.renderDepth = 11;
      this.add(touchShell);
    }

    // @private - per-instance listener, so it's easier to link and unlink
    this.positionListener = position => {
      const offsetFromParentAtom = position.minus(this.parentAtom.positionProperty.value);
      const orientation = offsetFromParentAtom.normalized();
      let translation;
      if (offsetFromParentAtom.magnitude > PairGroup.LONE_PAIR_DISTANCE) {
        translation = position.minus(orientation.times(PairGroup.LONE_PAIR_DISTANCE));
      } else {
        translation = this.parentAtom.positionProperty.value;
      }
      this.position.set(translation.x, translation.y, translation.z);
      this.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),
      // rotate from Y_UNIT to the desired orientation
      new THREE.Vector3().copy(orientation));
    };
  }

  /*
   * Initializes this view. Should be a fresh object, OR should have dispose() called first.
   * @public
   *
   * @param {PairGroup} group
   * @param {PairGroup} parentAtom
   * @param {Property.<boolean>} visibilityProperty
   * @returns {LonePairView} this
   */
  initialize(group, parentAtom, visibilityProperty) {
    this.group = group;
    this.parentAtom = parentAtom;
    this.visibilityProperty = visibilityProperty;
    this.visibilityListener = visibilityProperty.linkAttribute(this, 'visible');
    group.positionProperty.link(this.positionListener);
    return this;
  }

  /**
   * Disposes this view, so that it can be re-initialized later. Also adds it to the object pool.
   * @public
   */
  dispose() {
    this.visibilityListener && this.visibilityProperty.unlink(this.visibilityListener);
    this.group.positionProperty.unlink(this.positionListener);

    // clean references
    this.group = null;
    this.parentAtom = null;
    this.visibilityProperty = null;
    this.visibilityListener = null;
    LonePairView.pool.put(this, this.renderer);
  }

  /*
   * Intersection hit-test to determine if a pointer is over the lone pair view.
   * @public
   *
   * @param {THREE.Ray} worldRay - Camera ray in world space
   * @param {boolean} isTouch - Whether expanded touch regions should be included
   * @returns {THREE.Vector3|null} - The first intersection point (in world coordinates) found if it exists, otherwise
   *                                 null. Note that we short-circuit the handling, so it may pick an intersection
   *                                 point on the opposite side - for now that's deemed an acceptable trade-off for
   *                                 performance.
   */
  intersect(worldRay, isTouch) {
    const inverseMatrix = new THREE.Matrix4();
    const ray = new THREE.Ray();
    const geometry = isTouch ? touchHitTestGeometry : mouseHitTestGeometry;

    // get the ray in our local coordinate frame
    inverseMatrix.getInverse(this.shell.matrixWorld);
    ray.copy(worldRay).applyMatrix4(inverseMatrix);
    const vertices = geometry.vertices;
    const faceCount = geometry.faces.length;

    // hit-test all faces, with early exit in case of intersection (the distance doesn't have to be exact)
    for (let f = 0; f < faceCount; f++) {
      const face = geometry.faces[f];
      const a = vertices[face.a];
      const b = vertices[face.b];
      const c = vertices[face.c];
      const intersectionPoint = ray.intersectTriangle(a, b, c, false); // don't cull
      if (intersectionPoint !== null) {
        return intersectionPoint.applyMatrix4(this.matrixWorld);
      }
    }
    return null;
  }
}

// @private {LocalPool}
LonePairView.pool = new LocalPool('LonePairView', renderer => new LonePairView(renderer));
moleculeShapes.register('LonePairView', LonePairView);
export default LonePairView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2xlY3VsZVNoYXBlcyIsIkxvbmVQYWlyR2VvbWV0cnlEYXRhIiwiUGFpckdyb3VwIiwiTW9sZWN1bGVTaGFwZXNHbG9iYWxzIiwiTW9sZWN1bGVTaGFwZXNDb2xvcnMiLCJFbGVjdHJvblZpZXciLCJMb2NhbEdlb21ldHJ5IiwiTG9jYWxNYXRlcmlhbCIsIkxvY2FsUG9vbCIsImpzb25Mb2FkZXIiLCJUSFJFRSIsIkpTT05Mb2FkZXIiLCJtYXN0ZXJTaGVsbEdlb21ldHJ5IiwicGFyc2UiLCJ1c2VXZWJHTFByb3BlcnR5IiwidmFsdWUiLCJISUdIX0RFVEFJTCIsIkxPV19ERVRBSUxfUVVBRFMiLCJnZW9tZXRyeSIsImxvY2FsU2hlbGxHZW9tZXRyeSIsImxvY2FsU2hlbGxNYXRlcmlhbCIsIk1lc2hMYW1iZXJ0TWF0ZXJpYWwiLCJ0cmFuc3BhcmVudCIsIm9wYWNpdHkiLCJkZXB0aFdyaXRlIiwib3ZlcmRyYXciLCJjb2xvciIsImxvbmVQYWlyU2hlbGxQcm9wZXJ0eSIsIm1vdXNlSGl0VGVzdEdlb21ldHJ5IiwiTE9XX0RFVEFJTCIsInRvdWNoSGl0VGVzdEdlb21ldHJ5IiwiTE9XX0RFVEFJTF9FWFRSVURFRCIsIkxvbmVQYWlyVmlldyIsIk9iamVjdDNEIiwiY29uc3RydWN0b3IiLCJyZW5kZXJlciIsInNoZWxsR2VvbWV0cnkiLCJnZXQiLCJzaGVsbE1hdGVyaWFsIiwic2hlbGwiLCJNZXNoIiwic2hlbGxTY2FsZSIsInNjYWxlIiwieCIsInkiLCJ6IiwicG9zaXRpb24iLCJhZGQiLCJlbGVjdHJvblZpZXcxIiwiZWxlY3Ryb25WaWV3MiIsInBoZXQiLCJjaGlwcGVyIiwicXVlcnlQYXJhbWV0ZXJzIiwic2hvd1BvaW50ZXJBcmVhcyIsInRvdWNoU2hlbGwiLCJjbG9uZSIsIk1lc2hCYXNpY01hdGVyaWFsIiwicmVuZGVyRGVwdGgiLCJwb3NpdGlvbkxpc3RlbmVyIiwib2Zmc2V0RnJvbVBhcmVudEF0b20iLCJtaW51cyIsInBhcmVudEF0b20iLCJwb3NpdGlvblByb3BlcnR5Iiwib3JpZW50YXRpb24iLCJub3JtYWxpemVkIiwidHJhbnNsYXRpb24iLCJtYWduaXR1ZGUiLCJMT05FX1BBSVJfRElTVEFOQ0UiLCJ0aW1lcyIsInNldCIsInF1YXRlcm5pb24iLCJzZXRGcm9tVW5pdFZlY3RvcnMiLCJWZWN0b3IzIiwiY29weSIsImluaXRpYWxpemUiLCJncm91cCIsInZpc2liaWxpdHlQcm9wZXJ0eSIsInZpc2liaWxpdHlMaXN0ZW5lciIsImxpbmtBdHRyaWJ1dGUiLCJsaW5rIiwiZGlzcG9zZSIsInVubGluayIsInBvb2wiLCJwdXQiLCJpbnRlcnNlY3QiLCJ3b3JsZFJheSIsImlzVG91Y2giLCJpbnZlcnNlTWF0cml4IiwiTWF0cml4NCIsInJheSIsIlJheSIsImdldEludmVyc2UiLCJtYXRyaXhXb3JsZCIsImFwcGx5TWF0cml4NCIsInZlcnRpY2VzIiwiZmFjZUNvdW50IiwiZmFjZXMiLCJsZW5ndGgiLCJmIiwiZmFjZSIsImEiLCJiIiwiYyIsImludGVyc2VjdGlvblBvaW50IiwiaW50ZXJzZWN0VHJpYW5nbGUiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkxvbmVQYWlyVmlldy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNC0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBWaWV3IG9mIGEgbG9uZSBwYWlyXHJcbiAqXHJcbiAqIEBhdXRob3IgSm9uYXRoYW4gT2xzb24gPGpvbmF0aGFuLm9sc29uQGNvbG9yYWRvLmVkdT5cclxuICovXHJcblxyXG5pbXBvcnQgbW9sZWN1bGVTaGFwZXMgZnJvbSAnLi4vLi4vLi4vbW9sZWN1bGVTaGFwZXMuanMnO1xyXG5pbXBvcnQgTG9uZVBhaXJHZW9tZXRyeURhdGEgZnJvbSAnLi4vLi4vZGF0YS9Mb25lUGFpckdlb21ldHJ5RGF0YS5qcyc7XHJcbmltcG9ydCBQYWlyR3JvdXAgZnJvbSAnLi4vLi4vbW9kZWwvUGFpckdyb3VwLmpzJztcclxuaW1wb3J0IE1vbGVjdWxlU2hhcGVzR2xvYmFscyBmcm9tICcuLi8uLi9Nb2xlY3VsZVNoYXBlc0dsb2JhbHMuanMnO1xyXG5pbXBvcnQgTW9sZWN1bGVTaGFwZXNDb2xvcnMgZnJvbSAnLi4vTW9sZWN1bGVTaGFwZXNDb2xvcnMuanMnO1xyXG5pbXBvcnQgRWxlY3Ryb25WaWV3IGZyb20gJy4vRWxlY3Ryb25WaWV3LmpzJztcclxuaW1wb3J0IExvY2FsR2VvbWV0cnkgZnJvbSAnLi9Mb2NhbEdlb21ldHJ5LmpzJztcclxuaW1wb3J0IExvY2FsTWF0ZXJpYWwgZnJvbSAnLi9Mb2NhbE1hdGVyaWFsLmpzJztcclxuaW1wb3J0IExvY2FsUG9vbCBmcm9tICcuL0xvY2FsUG9vbC5qcyc7XHJcblxyXG5jb25zdCBqc29uTG9hZGVyID0gbmV3IFRIUkVFLkpTT05Mb2FkZXIoKTtcclxuXHJcbi8vIGdlb21ldHJ5IHVzZWQgZm9yIGRpc3BsYXlcclxuY29uc3QgbWFzdGVyU2hlbGxHZW9tZXRyeSA9IGpzb25Mb2FkZXIucGFyc2UoIE1vbGVjdWxlU2hhcGVzR2xvYmFscy51c2VXZWJHTFByb3BlcnR5LnZhbHVlID8gTG9uZVBhaXJHZW9tZXRyeURhdGEuSElHSF9ERVRBSUwgOiBMb25lUGFpckdlb21ldHJ5RGF0YS5MT1dfREVUQUlMX1FVQURTICkuZ2VvbWV0cnk7XHJcbi8vIHJlbmRlcmVyLWxvY2FsIGFjY2Vzc1xyXG5jb25zdCBsb2NhbFNoZWxsR2VvbWV0cnkgPSBuZXcgTG9jYWxHZW9tZXRyeSggbWFzdGVyU2hlbGxHZW9tZXRyeSApO1xyXG5jb25zdCBsb2NhbFNoZWxsTWF0ZXJpYWwgPSBuZXcgTG9jYWxNYXRlcmlhbCggbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoIHtcclxuICB0cmFuc3BhcmVudDogdHJ1ZSxcclxuICBvcGFjaXR5OiAwLjcsXHJcbiAgZGVwdGhXcml0ZTogZmFsc2UsIC8vIGRvbid0IHdyaXRlIGRlcHRoIHZhbHVlcywgc28gd2UgZG9uJ3QgY2F1c2Ugb3RoZXIgdHJhbnNwYXJlbnQgb2JqZWN0cyB0byByZW5kZXJcclxuICBvdmVyZHJhdzogTW9sZWN1bGVTaGFwZXNHbG9iYWxzLnVzZVdlYkdMUHJvcGVydHkudmFsdWUgPyAwIDogMC4xIC8vIGFtb3VudCB0byBleHRlbmQgcG9seWdvbnMgd2hlbiB1c2luZyBDYW52YXMgdG8gYXZvaWQgY3JhY2tzXHJcbn0gKSwge1xyXG4gIGNvbG9yOiBNb2xlY3VsZVNoYXBlc0NvbG9ycy5sb25lUGFpclNoZWxsUHJvcGVydHlcclxufSApO1xyXG5cclxuLy8gZ2VvbWV0cmllcyB1c2VkIGZvciBoaXQgdGVzdGluZyAoaW5jbHVkZXMgYSBsYXJnZXIgdG91Y2ggaGl0IG1lc2gpXHJcbmNvbnN0IG1vdXNlSGl0VGVzdEdlb21ldHJ5ID0ganNvbkxvYWRlci5wYXJzZSggTG9uZVBhaXJHZW9tZXRyeURhdGEuTE9XX0RFVEFJTCApLmdlb21ldHJ5O1xyXG5jb25zdCB0b3VjaEhpdFRlc3RHZW9tZXRyeSA9IGpzb25Mb2FkZXIucGFyc2UoIExvbmVQYWlyR2VvbWV0cnlEYXRhLkxPV19ERVRBSUxfRVhUUlVERUQgKS5nZW9tZXRyeTtcclxuXHJcbmNsYXNzIExvbmVQYWlyVmlldyBleHRlbmRzIFRIUkVFLk9iamVjdDNEIHtcclxuICAvKlxyXG4gICAqIEBwYXJhbSB7VEhSRUUuUmVuZGVyZXJ9IHJlbmRlcmVyXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIHJlbmRlcmVyICkge1xyXG5cclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyOyAvLyBAcHJpdmF0ZSB7VEhSRUUuUmVuZGVyZXJ9XHJcbiAgICB0aGlzLnNoZWxsR2VvbWV0cnkgPSBsb2NhbFNoZWxsR2VvbWV0cnkuZ2V0KCByZW5kZXJlciApOyAvLyBAcHJpdmF0ZSB7VEhSRUUuR2VvbWV0cnl9XHJcbiAgICB0aGlzLnNoZWxsTWF0ZXJpYWwgPSBsb2NhbFNoZWxsTWF0ZXJpYWwuZ2V0KCByZW5kZXJlciApOyAvLyBAcHJpdmF0ZSB7VEhSRUUuTWF0ZXJpYWx9XHJcblxyXG4gICAgdGhpcy5zaGVsbCA9IG5ldyBUSFJFRS5NZXNoKCB0aGlzLnNoZWxsR2VvbWV0cnksIHRoaXMuc2hlbGxNYXRlcmlhbCApOyAvLyBAcHJpdmF0ZSB7VEhSRUUuTWVzaH1cclxuXHJcbiAgICAvLyBzY2FsZSBmb3IgdGhlIHNoZWxsIGdlb21ldHJpZXMgKGZvciBkaXNwbGF5IGFuZCBoaXQgdGVzdGluZylcclxuICAgIGNvbnN0IHNoZWxsU2NhbGUgPSAyLjU7XHJcblxyXG4gICAgdGhpcy5zaGVsbC5zY2FsZS54ID0gdGhpcy5zaGVsbC5zY2FsZS55ID0gdGhpcy5zaGVsbC5zY2FsZS56ID0gc2hlbGxTY2FsZTtcclxuICAgIHRoaXMuc2hlbGwucG9zaXRpb24ueSA9IDAuMDAxOyAvLyBzbGlnaHQgb2Zmc2V0IHNvIHRocmVlLmpzIHdpbGwgei1zb3J0IHRoZSBzaGVsbHMgY29ycmVjdGx5IGZvciB0aGUgdHJhbnNwYXJlbmN5IHBhc3NcclxuICAgIHRoaXMuYWRkKCB0aGlzLnNoZWxsICk7XHJcblxyXG4gICAgdGhpcy5lbGVjdHJvblZpZXcxID0gbmV3IEVsZWN0cm9uVmlldyggcmVuZGVyZXIgKTsgLy8gQHByaXZhdGVcclxuICAgIHRoaXMuZWxlY3Ryb25WaWV3MiA9IG5ldyBFbGVjdHJvblZpZXcoIHJlbmRlcmVyICk7IC8vIEBwcml2YXRlXHJcbiAgICB0aGlzLmFkZCggdGhpcy5lbGVjdHJvblZpZXcxICk7XHJcbiAgICB0aGlzLmFkZCggdGhpcy5lbGVjdHJvblZpZXcyICk7XHJcblxyXG4gICAgdGhpcy5lbGVjdHJvblZpZXcxLnBvc2l0aW9uLnggPSAwLjc1O1xyXG4gICAgdGhpcy5lbGVjdHJvblZpZXcyLnBvc2l0aW9uLnggPSAtMC43NTtcclxuICAgIHRoaXMuZWxlY3Ryb25WaWV3MS5wb3NpdGlvbi55ID0gdGhpcy5lbGVjdHJvblZpZXcyLnBvc2l0aW9uLnkgPSA1O1xyXG5cclxuICAgIGlmICggcGhldC5jaGlwcGVyLnF1ZXJ5UGFyYW1ldGVycy5zaG93UG9pbnRlckFyZWFzICkge1xyXG4gICAgICBjb25zdCB0b3VjaFNoZWxsID0gbmV3IFRIUkVFLk1lc2goIHRvdWNoSGl0VGVzdEdlb21ldHJ5LmNsb25lKCksIG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCgge1xyXG4gICAgICAgIGNvbG9yOiAweGZmMDAwMCxcclxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcclxuICAgICAgICBvcGFjaXR5OiAwLjQsXHJcbiAgICAgICAgZGVwdGhXcml0ZTogZmFsc2VcclxuICAgICAgfSApICk7XHJcbiAgICAgIHRvdWNoU2hlbGwuc2NhbGUueCA9IHRvdWNoU2hlbGwuc2NhbGUueSA9IHRvdWNoU2hlbGwuc2NhbGUueiA9IHNoZWxsU2NhbGU7XHJcbiAgICAgIHRvdWNoU2hlbGwucmVuZGVyRGVwdGggPSAxMTtcclxuICAgICAgdGhpcy5hZGQoIHRvdWNoU2hlbGwgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAcHJpdmF0ZSAtIHBlci1pbnN0YW5jZSBsaXN0ZW5lciwgc28gaXQncyBlYXNpZXIgdG8gbGluayBhbmQgdW5saW5rXHJcbiAgICB0aGlzLnBvc2l0aW9uTGlzdGVuZXIgPSBwb3NpdGlvbiA9PiB7XHJcbiAgICAgIGNvbnN0IG9mZnNldEZyb21QYXJlbnRBdG9tID0gcG9zaXRpb24ubWludXMoIHRoaXMucGFyZW50QXRvbS5wb3NpdGlvblByb3BlcnR5LnZhbHVlICk7XHJcbiAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gb2Zmc2V0RnJvbVBhcmVudEF0b20ubm9ybWFsaXplZCgpO1xyXG5cclxuICAgICAgbGV0IHRyYW5zbGF0aW9uO1xyXG4gICAgICBpZiAoIG9mZnNldEZyb21QYXJlbnRBdG9tLm1hZ25pdHVkZSA+IFBhaXJHcm91cC5MT05FX1BBSVJfRElTVEFOQ0UgKSB7XHJcbiAgICAgICAgdHJhbnNsYXRpb24gPSBwb3NpdGlvbi5taW51cyggb3JpZW50YXRpb24udGltZXMoIFBhaXJHcm91cC5MT05FX1BBSVJfRElTVEFOQ0UgKSApO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRyYW5zbGF0aW9uID0gdGhpcy5wYXJlbnRBdG9tLnBvc2l0aW9uUHJvcGVydHkudmFsdWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucG9zaXRpb24uc2V0KCB0cmFuc2xhdGlvbi54LCB0cmFuc2xhdGlvbi55LCB0cmFuc2xhdGlvbi56ICk7XHJcbiAgICAgIHRoaXMucXVhdGVybmlvbi5zZXRGcm9tVW5pdFZlY3RvcnMoIG5ldyBUSFJFRS5WZWN0b3IzKCAwLCAxLCAwICksIC8vIHJvdGF0ZSBmcm9tIFlfVU5JVCB0byB0aGUgZGVzaXJlZCBvcmllbnRhdGlvblxyXG4gICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKCkuY29weSggb3JpZW50YXRpb24gKSApO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogSW5pdGlhbGl6ZXMgdGhpcyB2aWV3LiBTaG91bGQgYmUgYSBmcmVzaCBvYmplY3QsIE9SIHNob3VsZCBoYXZlIGRpc3Bvc2UoKSBjYWxsZWQgZmlyc3QuXHJcbiAgICogQHB1YmxpY1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtQYWlyR3JvdXB9IGdyb3VwXHJcbiAgICogQHBhcmFtIHtQYWlyR3JvdXB9IHBhcmVudEF0b21cclxuICAgKiBAcGFyYW0ge1Byb3BlcnR5Ljxib29sZWFuPn0gdmlzaWJpbGl0eVByb3BlcnR5XHJcbiAgICogQHJldHVybnMge0xvbmVQYWlyVmlld30gdGhpc1xyXG4gICAqL1xyXG4gIGluaXRpYWxpemUoIGdyb3VwLCBwYXJlbnRBdG9tLCB2aXNpYmlsaXR5UHJvcGVydHkgKSB7XHJcbiAgICB0aGlzLmdyb3VwID0gZ3JvdXA7XHJcbiAgICB0aGlzLnBhcmVudEF0b20gPSBwYXJlbnRBdG9tO1xyXG4gICAgdGhpcy52aXNpYmlsaXR5UHJvcGVydHkgPSB2aXNpYmlsaXR5UHJvcGVydHk7XHJcbiAgICB0aGlzLnZpc2liaWxpdHlMaXN0ZW5lciA9IHZpc2liaWxpdHlQcm9wZXJ0eS5saW5rQXR0cmlidXRlKCB0aGlzLCAndmlzaWJsZScgKTtcclxuXHJcbiAgICBncm91cC5wb3NpdGlvblByb3BlcnR5LmxpbmsoIHRoaXMucG9zaXRpb25MaXN0ZW5lciApO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEaXNwb3NlcyB0aGlzIHZpZXcsIHNvIHRoYXQgaXQgY2FuIGJlIHJlLWluaXRpYWxpemVkIGxhdGVyLiBBbHNvIGFkZHMgaXQgdG8gdGhlIG9iamVjdCBwb29sLlxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBkaXNwb3NlKCkge1xyXG4gICAgdGhpcy52aXNpYmlsaXR5TGlzdGVuZXIgJiYgdGhpcy52aXNpYmlsaXR5UHJvcGVydHkudW5saW5rKCB0aGlzLnZpc2liaWxpdHlMaXN0ZW5lciApO1xyXG4gICAgdGhpcy5ncm91cC5wb3NpdGlvblByb3BlcnR5LnVubGluayggdGhpcy5wb3NpdGlvbkxpc3RlbmVyICk7XHJcblxyXG4gICAgLy8gY2xlYW4gcmVmZXJlbmNlc1xyXG4gICAgdGhpcy5ncm91cCA9IG51bGw7XHJcbiAgICB0aGlzLnBhcmVudEF0b20gPSBudWxsO1xyXG4gICAgdGhpcy52aXNpYmlsaXR5UHJvcGVydHkgPSBudWxsO1xyXG4gICAgdGhpcy52aXNpYmlsaXR5TGlzdGVuZXIgPSBudWxsO1xyXG5cclxuICAgIExvbmVQYWlyVmlldy5wb29sLnB1dCggdGhpcywgdGhpcy5yZW5kZXJlciApO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBJbnRlcnNlY3Rpb24gaGl0LXRlc3QgdG8gZGV0ZXJtaW5lIGlmIGEgcG9pbnRlciBpcyBvdmVyIHRoZSBsb25lIHBhaXIgdmlldy5cclxuICAgKiBAcHVibGljXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1RIUkVFLlJheX0gd29ybGRSYXkgLSBDYW1lcmEgcmF5IGluIHdvcmxkIHNwYWNlXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBpc1RvdWNoIC0gV2hldGhlciBleHBhbmRlZCB0b3VjaCByZWdpb25zIHNob3VsZCBiZSBpbmNsdWRlZFxyXG4gICAqIEByZXR1cm5zIHtUSFJFRS5WZWN0b3IzfG51bGx9IC0gVGhlIGZpcnN0IGludGVyc2VjdGlvbiBwb2ludCAoaW4gd29ybGQgY29vcmRpbmF0ZXMpIGZvdW5kIGlmIGl0IGV4aXN0cywgb3RoZXJ3aXNlXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLiBOb3RlIHRoYXQgd2Ugc2hvcnQtY2lyY3VpdCB0aGUgaGFuZGxpbmcsIHNvIGl0IG1heSBwaWNrIGFuIGludGVyc2VjdGlvblxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnQgb24gdGhlIG9wcG9zaXRlIHNpZGUgLSBmb3Igbm93IHRoYXQncyBkZWVtZWQgYW4gYWNjZXB0YWJsZSB0cmFkZS1vZmYgZm9yXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJmb3JtYW5jZS5cclxuICAgKi9cclxuICBpbnRlcnNlY3QoIHdvcmxkUmF5LCBpc1RvdWNoICkge1xyXG4gICAgY29uc3QgaW52ZXJzZU1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XHJcbiAgICBjb25zdCByYXkgPSBuZXcgVEhSRUUuUmF5KCk7XHJcblxyXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBpc1RvdWNoID8gdG91Y2hIaXRUZXN0R2VvbWV0cnkgOiBtb3VzZUhpdFRlc3RHZW9tZXRyeTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIHJheSBpbiBvdXIgbG9jYWwgY29vcmRpbmF0ZSBmcmFtZVxyXG4gICAgaW52ZXJzZU1hdHJpeC5nZXRJbnZlcnNlKCB0aGlzLnNoZWxsLm1hdHJpeFdvcmxkICk7XHJcbiAgICByYXkuY29weSggd29ybGRSYXkgKS5hcHBseU1hdHJpeDQoIGludmVyc2VNYXRyaXggKTtcclxuXHJcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IGdlb21ldHJ5LnZlcnRpY2VzO1xyXG4gICAgY29uc3QgZmFjZUNvdW50ID0gZ2VvbWV0cnkuZmFjZXMubGVuZ3RoO1xyXG5cclxuICAgIC8vIGhpdC10ZXN0IGFsbCBmYWNlcywgd2l0aCBlYXJseSBleGl0IGluIGNhc2Ugb2YgaW50ZXJzZWN0aW9uICh0aGUgZGlzdGFuY2UgZG9lc24ndCBoYXZlIHRvIGJlIGV4YWN0KVxyXG4gICAgZm9yICggbGV0IGYgPSAwOyBmIDwgZmFjZUNvdW50OyBmKysgKSB7XHJcbiAgICAgIGNvbnN0IGZhY2UgPSBnZW9tZXRyeS5mYWNlc1sgZiBdO1xyXG4gICAgICBjb25zdCBhID0gdmVydGljZXNbIGZhY2UuYSBdO1xyXG4gICAgICBjb25zdCBiID0gdmVydGljZXNbIGZhY2UuYiBdO1xyXG4gICAgICBjb25zdCBjID0gdmVydGljZXNbIGZhY2UuYyBdO1xyXG4gICAgICBjb25zdCBpbnRlcnNlY3Rpb25Qb2ludCA9IHJheS5pbnRlcnNlY3RUcmlhbmdsZSggYSwgYiwgYywgZmFsc2UgKTsgLy8gZG9uJ3QgY3VsbFxyXG4gICAgICBpZiAoIGludGVyc2VjdGlvblBvaW50ICE9PSBudWxsICkge1xyXG4gICAgICAgIHJldHVybiBpbnRlcnNlY3Rpb25Qb2ludC5hcHBseU1hdHJpeDQoIHRoaXMubWF0cml4V29ybGQgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbi8vIEBwcml2YXRlIHtMb2NhbFBvb2x9XHJcbkxvbmVQYWlyVmlldy5wb29sID0gbmV3IExvY2FsUG9vbCggJ0xvbmVQYWlyVmlldycsIHJlbmRlcmVyID0+IG5ldyBMb25lUGFpclZpZXcoIHJlbmRlcmVyICkgKTtcclxuXHJcbm1vbGVjdWxlU2hhcGVzLnJlZ2lzdGVyKCAnTG9uZVBhaXJWaWV3JywgTG9uZVBhaXJWaWV3ICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMb25lUGFpclZpZXc7Il0sIm1hcHBp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