// Copyright 2019-2023, University of Colorado Boulder

/**
 * A boat (Mass) that can contain some liquid inside.  Boats exist for the lifetime of the sim and do not need to be
 * disposed.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import { Shape } from '../../../../kite/js/imports.js';
import ThreeUtils from '../../../../mobius/js/ThreeUtils.js';
import Mass from '../../common/model/Mass.js';
import Material from '../../common/model/Material.js';
import densityBuoyancyCommon from '../../densityBuoyancyCommon.js';
import BoatBasin from './BoatBasin.js';
import BoatDesign from './BoatDesign.js';
import Multilink from '../../../../axon/js/Multilink.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import { MassShape } from '../../common/model/MassShape.js';
import optionize from '../../../../phet-core/js/optionize.js';
export default class Boat extends Mass {
  // Amount of volume contained in the basin

  // How to multiply our one-liter size up to the model coordinates

  constructor(engine, blockWidthProperty, liquidMaterialProperty, providedConfig) {
    const displacementVolumeProperty = new NumberProperty(0.01);
    const boatIntersectionVertices = BoatDesign.getIntersectionVertices(blockWidthProperty.value / 2, displacementVolumeProperty.value * 1000);
    const volume = BoatDesign.ONE_LITER_HULL_VOLUME * displacementVolumeProperty.value * 1000;
    const config = optionize()({
      body: engine.createFromVertices(boatIntersectionVertices, true),
      shape: Shape.polygon(boatIntersectionVertices),
      volume: volume,
      massShape: MassShape.BLOCK,
      // material
      material: Material.ALUMINUM
    }, providedConfig);
    assert && assert(!config.canRotate);

    // TODO: Ask MK about why the parent options seem to be made optional, this cast shouldn't be needed
    super(engine, config);

    // Update the shape when the block width or displacement changes
    Multilink.multilink([blockWidthProperty, displacementVolumeProperty], (blockWidth, displacementVolume) => {
      if (displacementVolume === 0) {
        return;
      }
      const vertices = BoatDesign.getIntersectionVertices(blockWidth / 2, displacementVolume * 1000);
      const volume = BoatDesign.ONE_LITER_HULL_VOLUME * displacementVolume * 1000;
      engine.updateFromVertices(this.body, vertices, true);
      this.shapeProperty.value = Shape.polygon(vertices); // TODO: remove shapeProperty for perf?

      this.volumeLock = true;
      this.volumeProperty.value = volume;
      this.volumeLock = false;
      this.bodyOffsetProperty.value = Utils.centroidOfPolygon(vertices).negated();
      this.writeData();
    });
    this.displacementVolumeProperty = displacementVolumeProperty;
    this.liquidMaterialProperty = liquidMaterialProperty;
    this.basin = new BoatBasin(this);
    Multilink.multilink([this.liquidMaterialProperty, this.basin.liquidVolumeProperty], (material, volume) => {
      this.containedMassProperty.value = material.density * volume;
    });
    this.stepInternalVolume = 0;
    this.stepMultiplier = 0;
    this.intersectionGroup = new THREE.Group();
    const intersectionMesh = new THREE.Mesh(BoatDesign.getPrimaryGeometry(1), new THREE.MeshLambertMaterial());
    this.intersectionGroup.add(intersectionMesh);
  }

  /**
   * Steps forward in time.
   */
  step(dt, interpolationRatio) {
    super.step(dt, interpolationRatio);
    this.basin.liquidYInterpolatedProperty.setRatio(interpolationRatio);
  }

  /**
   * Returns whether this is a boat (as more complicated handling is needed in this case).
   */
  isBoat() {
    return true;
  }

  /**
   * Called after a engine-physics-model step once before doing other operations (like computing buoyant forces,
   * displacement, etc.) so that it can set high-performance flags used for this purpose.
   *
   * Type-specific values are likely to be set, but this should set at least stepX/stepBottom/stepTop
   */
  updateStepInformation() {
    super.updateStepInformation();
    const xOffset = this.stepMatrix.m02();
    const yOffset = this.stepMatrix.m12();
    const displacedVolume = this.displacementVolumeProperty.value;
    this.stepMultiplier = Math.pow(displacedVolume / 0.001, 1 / 3);
    this.stepInternalVolume = BoatDesign.ONE_LITER_INTERNAL_VOLUMES[BoatDesign.ONE_LITER_INTERNAL_VOLUMES.length - 1] * this.stepMultiplier * this.stepMultiplier * this.stepMultiplier;
    this.stepX = xOffset;
    this.stepBottom = yOffset + this.stepMultiplier * BoatDesign.ONE_LITER_BOUNDS.minY;
    this.stepTop = yOffset + this.stepMultiplier * BoatDesign.ONE_LITER_BOUNDS.maxY;
    this.basin.stepTop = this.stepTop;
    this.basin.stepBottom = yOffset + this.stepMultiplier * BoatDesign.ONE_LITER_INTERIOR_BOTTOM;
  }

  /**
   * If there is an intersection with the ray and this mass, the t-value (distance the ray would need to travel to
   * reach the intersection, e.g. ray.position + ray.distance * t === intersectionPoint) will be returned. Otherwise
   * if there is no intersection, null will be returned.
   */
  intersect(ray, isTouch) {
    const scale = Math.pow(this.displacementVolumeProperty.value / 0.001, 1 / 3);
    // TODO: somewhat borrowed with Bottle, let's combine
    const translation = this.matrix.translation;
    const adjustedPosition = ray.position.minusXYZ(translation.x, translation.y, 0).dividedScalar(scale);
    const raycaster = new THREE.Raycaster(ThreeUtils.vectorToThree(adjustedPosition), ThreeUtils.vectorToThree(ray.direction));
    const intersections = [];
    raycaster.intersectObject(this.intersectionGroup, true, intersections);
    return intersections.length ? intersections[0].distance * scale : null;
  }

  /**
   * Returns the displayed area of this object at a given y level
   *
   * Assumes step information was updated.
   */
  getDisplacedArea(liquidLevel) {
    const bottom = this.stepBottom;
    const top = this.stepTop;
    if (liquidLevel < bottom || liquidLevel > top) {
      return 0;
    }
    const ratio = (liquidLevel - bottom) / (top - bottom);
    return Mass.evaluatePiecewiseLinear(BoatDesign.ONE_LITER_DISPLACED_AREAS, ratio) * this.stepMultiplier * this.stepMultiplier;
  }

  /**
   * Returns the displaced volume of this object up to a given y level, assuming a y value for the given liquid level.
   *
   * Assumes step information was updated.
   */
  getDisplacedVolume(liquidLevel) {
    const bottom = this.stepBottom;
    const top = this.stepTop;
    if (liquidLevel <= bottom) {
      return 0;
    } else if (liquidLevel >= top) {
      return this.displacementVolumeProperty.value;
    } else {
      const ratio = (liquidLevel - bottom) / (top - bottom);
      return Mass.evaluatePiecewiseLinear(BoatDesign.ONE_LITER_DISPLACED_VOLUMES, ratio) * this.stepMultiplier * this.stepMultiplier * this.stepMultiplier;
    }
  }

  /**
   * Returns the internal basin area of this object up to a given y level, assuming a y value for the given liquid level.
   *
   * Assumes step information was updated.
   */
  getBasinArea(liquidLevel) {
    const bottom = this.stepBottom;
    const top = this.stepTop;
    if (liquidLevel <= bottom || liquidLevel >= top) {
      return 0;
    } else {
      const ratio = (liquidLevel - bottom) / (top - bottom);
      return Mass.evaluatePiecewiseLinear(BoatDesign.ONE_LITER_INTERNAL_AREAS, ratio) * this.stepMultiplier * this.stepMultiplier;
    }
  }

  /**
   * Returns the displaced volume of this object up to a given y level, assuming a y value for the given liquid level.
   *
   * Assumes step information was updated.
   */
  getBasinVolume(liquidLevel) {
    const bottom = this.stepBottom;
    const top = this.stepTop;
    if (liquidLevel <= bottom) {
      return 0;
    } else if (liquidLevel >= top) {
      return this.stepInternalVolume;
    } else {
      const ratio = (liquidLevel - bottom) / (top - bottom);
      return Mass.evaluatePiecewiseLinear(BoatDesign.ONE_LITER_INTERNAL_VOLUMES, ratio) * this.stepMultiplier * this.stepMultiplier * this.stepMultiplier;
    }
  }
  setRatios(widthRatio, heightRatio) {
    // See subclass for implementation
  }

  /**
   * Resets values to their original state
   */
  reset() {
    this.displacementVolumeProperty.reset();
    this.basin.reset();
    super.reset();
  }
  static BoatIO = new IOType('BoatIO', {
    valueType: Boat,
    supertype: Mass.MassIO,
    documentation: 'Represents a boat'
  });
}
densityBuoyancyCommon.register('Boat', Boat);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJOdW1iZXJQcm9wZXJ0eSIsIlV0aWxzIiwiU2hhcGUiLCJUaHJlZVV0aWxzIiwiTWFzcyIsIk1hdGVyaWFsIiwiZGVuc2l0eUJ1b3lhbmN5Q29tbW9uIiwiQm9hdEJhc2luIiwiQm9hdERlc2lnbiIsIk11bHRpbGluayIsIklPVHlwZSIsIk1hc3NTaGFwZSIsIm9wdGlvbml6ZSIsIkJvYXQiLCJjb25zdHJ1Y3RvciIsImVuZ2luZSIsImJsb2NrV2lkdGhQcm9wZXJ0eSIsImxpcXVpZE1hdGVyaWFsUHJvcGVydHkiLCJwcm92aWRlZENvbmZpZyIsImRpc3BsYWNlbWVudFZvbHVtZVByb3BlcnR5IiwiYm9hdEludGVyc2VjdGlvblZlcnRpY2VzIiwiZ2V0SW50ZXJzZWN0aW9uVmVydGljZXMiLCJ2YWx1ZSIsInZvbHVtZSIsIk9ORV9MSVRFUl9IVUxMX1ZPTFVNRSIsImNvbmZpZyIsImJvZHkiLCJjcmVhdGVGcm9tVmVydGljZXMiLCJzaGFwZSIsInBvbHlnb24iLCJtYXNzU2hhcGUiLCJCTE9DSyIsIm1hdGVyaWFsIiwiQUxVTUlOVU0iLCJhc3NlcnQiLCJjYW5Sb3RhdGUiLCJtdWx0aWxpbmsiLCJibG9ja1dpZHRoIiwiZGlzcGxhY2VtZW50Vm9sdW1lIiwidmVydGljZXMiLCJ1cGRhdGVGcm9tVmVydGljZXMiLCJzaGFwZVByb3BlcnR5Iiwidm9sdW1lTG9jayIsInZvbHVtZVByb3BlcnR5IiwiYm9keU9mZnNldFByb3BlcnR5IiwiY2VudHJvaWRPZlBvbHlnb24iLCJuZWdhdGVkIiwid3JpdGVEYXRhIiwiYmFzaW4iLCJsaXF1aWRWb2x1bWVQcm9wZXJ0eSIsImNvbnRhaW5lZE1hc3NQcm9wZXJ0eSIsImRlbnNpdHkiLCJzdGVwSW50ZXJuYWxWb2x1bWUiLCJzdGVwTXVsdGlwbGllciIsImludGVyc2VjdGlvbkdyb3VwIiwiVEhSRUUiLCJHcm91cCIsImludGVyc2VjdGlvbk1lc2giLCJNZXNoIiwiZ2V0UHJpbWFyeUdlb21ldHJ5IiwiTWVzaExhbWJlcnRNYXRlcmlhbCIsImFkZCIsInN0ZXAiLCJkdCIsImludGVycG9sYXRpb25SYXRpbyIsImxpcXVpZFlJbnRlcnBvbGF0ZWRQcm9wZXJ0eSIsInNldFJhdGlvIiwiaXNCb2F0IiwidXBkYXRlU3RlcEluZm9ybWF0aW9uIiwieE9mZnNldCIsInN0ZXBNYXRyaXgiLCJtMDIiLCJ5T2Zmc2V0IiwibTEyIiwiZGlzcGxhY2VkVm9sdW1lIiwiTWF0aCIsInBvdyIsIk9ORV9MSVRFUl9JTlRFUk5BTF9WT0xVTUVTIiwibGVuZ3RoIiwic3RlcFgiLCJzdGVwQm90dG9tIiwiT05FX0xJVEVSX0JPVU5EUyIsIm1pblkiLCJzdGVwVG9wIiwibWF4WSIsIk9ORV9MSVRFUl9JTlRFUklPUl9CT1RUT00iLCJpbnRlcnNlY3QiLCJyYXkiLCJpc1RvdWNoIiwic2NhbGUiLCJ0cmFuc2xhdGlvbiIsIm1hdHJpeCIsImFkanVzdGVkUG9zaXRpb24iLCJwb3NpdGlvbiIsIm1pbnVzWFlaIiwieCIsInkiLCJkaXZpZGVkU2NhbGFyIiwicmF5Y2FzdGVyIiwiUmF5Y2FzdGVyIiwidmVjdG9yVG9UaHJlZSIsImRpcmVjdGlvbiIsImludGVyc2VjdGlvbnMiLCJpbnRlcnNlY3RPYmplY3QiLCJkaXN0YW5jZSIsImdldERpc3BsYWNlZEFyZWEiLCJsaXF1aWRMZXZlbCIsImJvdHRvbSIsInRvcCIsInJhdGlvIiwiZXZhbHVhdGVQaWVjZXdpc2VMaW5lYXIiLCJPTkVfTElURVJfRElTUExBQ0VEX0FSRUFTIiwiZ2V0RGlzcGxhY2VkVm9sdW1lIiwiT05FX0xJVEVSX0RJU1BMQUNFRF9WT0xVTUVTIiwiZ2V0QmFzaW5BcmVhIiwiT05FX0xJVEVSX0lOVEVSTkFMX0FSRUFTIiwiZ2V0QmFzaW5Wb2x1bWUiLCJzZXRSYXRpb3MiLCJ3aWR0aFJhdGlvIiwiaGVpZ2h0UmF0aW8iLCJyZXNldCIsIkJvYXRJTyIsInZhbHVlVHlwZSIsInN1cGVydHlwZSIsIk1hc3NJTyIsImRvY3VtZW50YXRpb24iLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkJvYXQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogQSBib2F0IChNYXNzKSB0aGF0IGNhbiBjb250YWluIHNvbWUgbGlxdWlkIGluc2lkZS4gIEJvYXRzIGV4aXN0IGZvciB0aGUgbGlmZXRpbWUgb2YgdGhlIHNpbSBhbmQgZG8gbm90IG5lZWQgdG8gYmVcclxuICogZGlzcG9zZWQuXHJcbiAqXHJcbiAqIEBhdXRob3IgSm9uYXRoYW4gT2xzb24gPGpvbmF0aGFuLm9sc29uQGNvbG9yYWRvLmVkdT5cclxuICovXHJcblxyXG5pbXBvcnQgTnVtYmVyUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9OdW1iZXJQcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBTdHJpY3RPbWl0IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy90eXBlcy9TdHJpY3RPbWl0LmpzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9VdGlscy5qcyc7XHJcbmltcG9ydCB7IFNoYXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4va2l0ZS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IFRocmVlVXRpbHMgZnJvbSAnLi4vLi4vLi4vLi4vbW9iaXVzL2pzL1RocmVlVXRpbHMuanMnO1xyXG5pbXBvcnQgTWFzcywgeyBJbnN0cnVtZW50ZWRNYXNzT3B0aW9ucywgTWFzc09wdGlvbnMgfSBmcm9tICcuLi8uLi9jb21tb24vbW9kZWwvTWFzcy5qcyc7XHJcbmltcG9ydCBNYXRlcmlhbCBmcm9tICcuLi8uLi9jb21tb24vbW9kZWwvTWF0ZXJpYWwuanMnO1xyXG5pbXBvcnQgZGVuc2l0eUJ1b3lhbmN5Q29tbW9uIGZyb20gJy4uLy4uL2RlbnNpdHlCdW95YW5jeUNvbW1vbi5qcyc7XHJcbmltcG9ydCBCb2F0QmFzaW4gZnJvbSAnLi9Cb2F0QmFzaW4uanMnO1xyXG5pbXBvcnQgQm9hdERlc2lnbiBmcm9tICcuL0JvYXREZXNpZ24uanMnO1xyXG5pbXBvcnQgUGh5c2ljc0VuZ2luZSBmcm9tICcuLi8uLi9jb21tb24vbW9kZWwvUGh5c2ljc0VuZ2luZS5qcyc7XHJcbmltcG9ydCBUUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9UUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgUmF5MyBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvUmF5My5qcyc7XHJcbmltcG9ydCBNdWx0aWxpbmsgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9NdWx0aWxpbmsuanMnO1xyXG5pbXBvcnQgVFJlYWRPbmx5UHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9UUmVhZE9ubHlQcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBJT1R5cGUgZnJvbSAnLi4vLi4vLi4vLi4vdGFuZGVtL2pzL3R5cGVzL0lPVHlwZS5qcyc7XHJcbmltcG9ydCB7IE1hc3NTaGFwZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbC9NYXNzU2hhcGUuanMnO1xyXG5pbXBvcnQgb3B0aW9uaXplLCB7IEVtcHR5U2VsZk9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvb3B0aW9uaXplLmpzJztcclxuXHJcbmV4cG9ydCB0eXBlIEJvYXRPcHRpb25zID0gU3RyaWN0T21pdDxJbnN0cnVtZW50ZWRNYXNzT3B0aW9ucywgJ2JvZHknIHwgJ3NoYXBlJyB8ICd2b2x1bWUnIHwgJ21hdGVyaWFsJyB8ICdtYXNzU2hhcGUnPjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXQgZXh0ZW5kcyBNYXNzIHtcclxuXHJcbiAgcHVibGljIHJlYWRvbmx5IGRpc3BsYWNlbWVudFZvbHVtZVByb3BlcnR5OiBOdW1iZXJQcm9wZXJ0eTtcclxuICBwdWJsaWMgcmVhZG9ubHkgbGlxdWlkTWF0ZXJpYWxQcm9wZXJ0eTogVFByb3BlcnR5PE1hdGVyaWFsPjtcclxuICBwdWJsaWMgcmVhZG9ubHkgYmFzaW46IEJvYXRCYXNpbjtcclxuXHJcbiAgLy8gQW1vdW50IG9mIHZvbHVtZSBjb250YWluZWQgaW4gdGhlIGJhc2luXHJcbiAgcHVibGljIHN0ZXBJbnRlcm5hbFZvbHVtZTogbnVtYmVyO1xyXG5cclxuICAvLyBIb3cgdG8gbXVsdGlwbHkgb3VyIG9uZS1saXRlciBzaXplIHVwIHRvIHRoZSBtb2RlbCBjb29yZGluYXRlc1xyXG4gIHB1YmxpYyBzdGVwTXVsdGlwbGllcjogbnVtYmVyO1xyXG5cclxuICBwdWJsaWMgcmVhZG9ubHkgaW50ZXJzZWN0aW9uR3JvdXA6IFRIUkVFLkdyb3VwO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIGVuZ2luZTogUGh5c2ljc0VuZ2luZSwgYmxvY2tXaWR0aFByb3BlcnR5OiBUUmVhZE9ubHlQcm9wZXJ0eTxudW1iZXI+LCBsaXF1aWRNYXRlcmlhbFByb3BlcnR5OiBUUHJvcGVydHk8TWF0ZXJpYWw+LCBwcm92aWRlZENvbmZpZzogQm9hdE9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3QgZGlzcGxhY2VtZW50Vm9sdW1lUHJvcGVydHkgPSBuZXcgTnVtYmVyUHJvcGVydHkoIDAuMDEgKTtcclxuXHJcbiAgICBjb25zdCBib2F0SW50ZXJzZWN0aW9uVmVydGljZXMgPSBCb2F0RGVzaWduLmdldEludGVyc2VjdGlvblZlcnRpY2VzKCBibG9ja1dpZHRoUHJvcGVydHkudmFsdWUgLyAyLCBkaXNwbGFjZW1lbnRWb2x1bWVQcm9wZXJ0eS52YWx1ZSAqIDEwMDAgKTtcclxuICAgIGNvbnN0IHZvbHVtZSA9IEJvYXREZXNpZ24uT05FX0xJVEVSX0hVTExfVk9MVU1FICogZGlzcGxhY2VtZW50Vm9sdW1lUHJvcGVydHkudmFsdWUgKiAxMDAwO1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZyA9IG9wdGlvbml6ZTxCb2F0T3B0aW9ucywgRW1wdHlTZWxmT3B0aW9ucywgTWFzc09wdGlvbnM+KCkoIHtcclxuICAgICAgYm9keTogZW5naW5lLmNyZWF0ZUZyb21WZXJ0aWNlcyggYm9hdEludGVyc2VjdGlvblZlcnRpY2VzLCB0cnVlICksXHJcbiAgICAgIHNoYXBlOiBTaGFwZS5wb2x5Z29uKCBib2F0SW50ZXJzZWN0aW9uVmVydGljZXMgKSxcclxuICAgICAgdm9sdW1lOiB2b2x1bWUsXHJcbiAgICAgIG1hc3NTaGFwZTogTWFzc1NoYXBlLkJMT0NLLFxyXG5cclxuICAgICAgLy8gbWF0ZXJpYWxcclxuICAgICAgbWF0ZXJpYWw6IE1hdGVyaWFsLkFMVU1JTlVNXHJcbiAgICB9LCBwcm92aWRlZENvbmZpZyApO1xyXG5cclxuICAgIGFzc2VydCAmJiBhc3NlcnQoICFjb25maWcuY2FuUm90YXRlICk7XHJcblxyXG4gICAgLy8gVE9ETzogQXNrIE1LIGFib3V0IHdoeSB0aGUgcGFyZW50IG9wdGlvbnMgc2VlbSB0byBiZSBtYWRlIG9wdGlvbmFsLCB0aGlzIGNhc3Qgc2hvdWxkbid0IGJlIG5lZWRlZFxyXG4gICAgc3VwZXIoIGVuZ2luZSwgY29uZmlnIGFzIEluc3RydW1lbnRlZE1hc3NPcHRpb25zICk7XHJcblxyXG4gICAgLy8gVXBkYXRlIHRoZSBzaGFwZSB3aGVuIHRoZSBibG9jayB3aWR0aCBvciBkaXNwbGFjZW1lbnQgY2hhbmdlc1xyXG4gICAgTXVsdGlsaW5rLm11bHRpbGluayggWyBibG9ja1dpZHRoUHJvcGVydHksIGRpc3BsYWNlbWVudFZvbHVtZVByb3BlcnR5IF0sICggYmxvY2tXaWR0aCwgZGlzcGxhY2VtZW50Vm9sdW1lICkgPT4ge1xyXG4gICAgICBpZiAoIGRpc3BsYWNlbWVudFZvbHVtZSA9PT0gMCApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHZlcnRpY2VzID0gQm9hdERlc2lnbi5nZXRJbnRlcnNlY3Rpb25WZXJ0aWNlcyggYmxvY2tXaWR0aCAvIDIsIGRpc3BsYWNlbWVudFZvbHVtZSAqIDEwMDAgKTtcclxuICAgICAgY29uc3Qgdm9sdW1lID0gQm9hdERlc2lnbi5PTkVfTElURVJfSFVMTF9WT0xVTUUgKiBkaXNwbGFjZW1lbnRWb2x1bWUgKiAxMDAwO1xyXG5cclxuICAgICAgZW5naW5lLnVwZGF0ZUZyb21WZXJ0aWNlcyggdGhpcy5ib2R5LCB2ZXJ0aWNlcywgdHJ1ZSApO1xyXG4gICAgICB0aGlzLnNoYXBlUHJvcGVydHkudmFsdWUgPSBTaGFwZS5wb2x5Z29uKCB2ZXJ0aWNlcyApOyAvLyBUT0RPOiByZW1vdmUgc2hhcGVQcm9wZXJ0eSBmb3IgcGVyZj9cclxuXHJcbiAgICAgIHRoaXMudm9sdW1lTG9jayA9IHRydWU7XHJcbiAgICAgIHRoaXMudm9sdW1lUHJvcGVydHkudmFsdWUgPSB2b2x1bWU7XHJcbiAgICAgIHRoaXMudm9sdW1lTG9jayA9IGZhbHNlO1xyXG5cclxuICAgICAgdGhpcy5ib2R5T2Zmc2V0UHJvcGVydHkudmFsdWUgPSBVdGlscy5jZW50cm9pZE9mUG9seWdvbiggdmVydGljZXMgKS5uZWdhdGVkKCk7XHJcbiAgICAgIHRoaXMud3JpdGVEYXRhKCk7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgdGhpcy5kaXNwbGFjZW1lbnRWb2x1bWVQcm9wZXJ0eSA9IGRpc3BsYWNlbWVudFZvbHVtZVByb3BlcnR5O1xyXG4gICAgdGhpcy5saXF1aWRNYXRlcmlhbFByb3BlcnR5ID0gbGlxdWlkTWF0ZXJpYWxQcm9wZXJ0eTtcclxuXHJcbiAgICB0aGlzLmJhc2luID0gbmV3IEJvYXRCYXNpbiggdGhpcyApO1xyXG5cclxuICAgIE11bHRpbGluay5tdWx0aWxpbmsoIFsgdGhpcy5saXF1aWRNYXRlcmlhbFByb3BlcnR5LCB0aGlzLmJhc2luLmxpcXVpZFZvbHVtZVByb3BlcnR5IF0sICggbWF0ZXJpYWwsIHZvbHVtZSApID0+IHtcclxuICAgICAgdGhpcy5jb250YWluZWRNYXNzUHJvcGVydHkudmFsdWUgPSBtYXRlcmlhbC5kZW5zaXR5ICogdm9sdW1lO1xyXG4gICAgfSApO1xyXG5cclxuICAgIHRoaXMuc3RlcEludGVybmFsVm9sdW1lID0gMDtcclxuICAgIHRoaXMuc3RlcE11bHRpcGxpZXIgPSAwO1xyXG5cclxuICAgIHRoaXMuaW50ZXJzZWN0aW9uR3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcclxuICAgIGNvbnN0IGludGVyc2VjdGlvbk1lc2ggPSBuZXcgVEhSRUUuTWVzaCggQm9hdERlc2lnbi5nZXRQcmltYXJ5R2VvbWV0cnkoIDEgKSwgbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoKSApO1xyXG4gICAgdGhpcy5pbnRlcnNlY3Rpb25Hcm91cC5hZGQoIGludGVyc2VjdGlvbk1lc2ggKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0ZXBzIGZvcndhcmQgaW4gdGltZS5cclxuICAgKi9cclxuICBwdWJsaWMgb3ZlcnJpZGUgc3RlcCggZHQ6IG51bWJlciwgaW50ZXJwb2xhdGlvblJhdGlvOiBudW1iZXIgKTogdm9pZCB7XHJcbiAgICBzdXBlci5zdGVwKCBkdCwgaW50ZXJwb2xhdGlvblJhdGlvICk7XHJcblxyXG4gICAgdGhpcy5iYXNpbi5saXF1aWRZSW50ZXJwb2xhdGVkUHJvcGVydHkuc2V0UmF0aW8oIGludGVycG9sYXRpb25SYXRpbyApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB3aGV0aGVyIHRoaXMgaXMgYSBib2F0IChhcyBtb3JlIGNvbXBsaWNhdGVkIGhhbmRsaW5nIGlzIG5lZWRlZCBpbiB0aGlzIGNhc2UpLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBvdmVycmlkZSBpc0JvYXQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGxlZCBhZnRlciBhIGVuZ2luZS1waHlzaWNzLW1vZGVsIHN0ZXAgb25jZSBiZWZvcmUgZG9pbmcgb3RoZXIgb3BlcmF0aW9ucyAobGlrZSBjb21wdXRpbmcgYnVveWFudCBmb3JjZXMsXHJcbiAgICogZGlzcGxhY2VtZW50LCBldGMuKSBzbyB0aGF0IGl0IGNhbiBzZXQgaGlnaC1wZXJmb3JtYW5jZSBmbGFncyB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXHJcbiAgICpcclxuICAgKiBUeXBlLXNwZWNpZmljIHZhbHVlcyBhcmUgbGlrZWx5IHRvIGJlIHNldCwgYnV0IHRoaXMgc2hvdWxkIHNldCBhdCBsZWFzdCBzdGVwWC9zdGVwQm90dG9tL3N0ZXBUb3BcclxuICAgKi9cclxuICBwdWJsaWMgb3ZlcnJpZGUgdXBkYXRlU3RlcEluZm9ybWF0aW9uKCk6IHZvaWQge1xyXG4gICAgc3VwZXIudXBkYXRlU3RlcEluZm9ybWF0aW9uKCk7XHJcblxyXG4gICAgY29uc3QgeE9mZnNldCA9IHRoaXMuc3RlcE1hdHJpeC5tMDIoKTtcclxuICAgIGNvbnN0IHlPZmZzZXQgPSB0aGlzLnN0ZXBNYXRyaXgubTEyKCk7XHJcblxyXG4gICAgY29uc3QgZGlzcGxhY2VkVm9sdW1lID0gdGhpcy5kaXNwbGFjZW1lbnRWb2x1bWVQcm9wZXJ0eS52YWx1ZTtcclxuICAgIHRoaXMuc3RlcE11bHRpcGxpZXIgPSBNYXRoLnBvdyggZGlzcGxhY2VkVm9sdW1lIC8gMC4wMDEsIDEgLyAzICk7XHJcbiAgICB0aGlzLnN0ZXBJbnRlcm5hbFZvbHVtZSA9IEJvYXREZXNpZ24uT05FX0xJVEVSX0lOVEVSTkFMX1ZPTFVNRVNbIEJvYXREZXNpZ24uT05FX0xJVEVSX0lOVEVSTkFMX1ZPTFVNRVMubGVuZ3RoIC0gMSBdICogdGhpcy5zdGVwTXVsdGlwbGllciAqIHRoaXMuc3RlcE11bHRpcGxpZXIgKiB0aGlzLnN0ZXBNdWx0aXBsaWVyO1xyXG5cclxuICAgIHRoaXMuc3RlcFggPSB4T2Zmc2V0O1xyXG4gICAgdGhpcy5zdGVwQm90dG9tID0geU9mZnNldCArIHRoaXMuc3RlcE11bHRpcGxpZXIgKiBCb2F0RGVzaWduLk9ORV9MSVRFUl9CT1VORFMubWluWTtcclxuICAgIHRoaXMuc3RlcFRvcCA9IHlPZmZzZXQgKyB0aGlzLnN0ZXBNdWx0aXBsaWVyICogQm9hdERlc2lnbi5PTkVfTElURVJfQk9VTkRTLm1heFk7XHJcblxyXG4gICAgdGhpcy5iYXNpbi5zdGVwVG9wID0gdGhpcy5zdGVwVG9wO1xyXG4gICAgdGhpcy5iYXNpbi5zdGVwQm90dG9tID0geU9mZnNldCArIHRoaXMuc3RlcE11bHRpcGxpZXIgKiBCb2F0RGVzaWduLk9ORV9MSVRFUl9JTlRFUklPUl9CT1RUT007XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJZiB0aGVyZSBpcyBhbiBpbnRlcnNlY3Rpb24gd2l0aCB0aGUgcmF5IGFuZCB0aGlzIG1hc3MsIHRoZSB0LXZhbHVlIChkaXN0YW5jZSB0aGUgcmF5IHdvdWxkIG5lZWQgdG8gdHJhdmVsIHRvXHJcbiAgICogcmVhY2ggdGhlIGludGVyc2VjdGlvbiwgZS5nLiByYXkucG9zaXRpb24gKyByYXkuZGlzdGFuY2UgKiB0ID09PSBpbnRlcnNlY3Rpb25Qb2ludCkgd2lsbCBiZSByZXR1cm5lZC4gT3RoZXJ3aXNlXHJcbiAgICogaWYgdGhlcmUgaXMgbm8gaW50ZXJzZWN0aW9uLCBudWxsIHdpbGwgYmUgcmV0dXJuZWQuXHJcbiAgICovXHJcbiAgcHVibGljIG92ZXJyaWRlIGludGVyc2VjdCggcmF5OiBSYXkzLCBpc1RvdWNoOiBib29sZWFuICk6IG51bWJlciB8IG51bGwge1xyXG4gICAgY29uc3Qgc2NhbGUgPSBNYXRoLnBvdyggdGhpcy5kaXNwbGFjZW1lbnRWb2x1bWVQcm9wZXJ0eS52YWx1ZSAvIDAuMDAxLCAxIC8gMyApO1xyXG4gICAgLy8gVE9ETzogc29tZXdoYXQgYm9ycm93ZWQgd2l0aCBCb3R0bGUsIGxldCdzIGNvbWJpbmVcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gdGhpcy5tYXRyaXgudHJhbnNsYXRpb247XHJcbiAgICBjb25zdCBhZGp1c3RlZFBvc2l0aW9uID0gcmF5LnBvc2l0aW9uLm1pbnVzWFlaKCB0cmFuc2xhdGlvbi54LCB0cmFuc2xhdGlvbi55LCAwICkuZGl2aWRlZFNjYWxhciggc2NhbGUgKTtcclxuXHJcbiAgICBjb25zdCByYXljYXN0ZXIgPSBuZXcgVEhSRUUuUmF5Y2FzdGVyKCBUaHJlZVV0aWxzLnZlY3RvclRvVGhyZWUoIGFkanVzdGVkUG9zaXRpb24gKSwgVGhyZWVVdGlscy52ZWN0b3JUb1RocmVlKCByYXkuZGlyZWN0aW9uICkgKTtcclxuICAgIGNvbnN0IGludGVyc2VjdGlvbnM6IFRIUkVFLkludGVyc2VjdGlvbjxUSFJFRS5Hcm91cD5bXSA9IFtdO1xyXG4gICAgcmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdCggdGhpcy5pbnRlcnNlY3Rpb25Hcm91cCwgdHJ1ZSwgaW50ZXJzZWN0aW9ucyApO1xyXG5cclxuICAgIHJldHVybiBpbnRlcnNlY3Rpb25zLmxlbmd0aCA/IGludGVyc2VjdGlvbnNbIDAgXS5kaXN0YW5jZSAqIHNjYWxlIDogbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGRpc3BsYXllZCBhcmVhIG9mIHRoaXMgb2JqZWN0IGF0IGEgZ2l2ZW4geSBsZXZlbFxyXG4gICAqXHJcbiAgICogQXNzdW1lcyBzdGVwIGluZm9ybWF0aW9uIHdhcyB1cGRhdGVkLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXREaXNwbGFjZWRBcmVhKCBsaXF1aWRMZXZlbDogbnVtYmVyICk6IG51bWJlciB7XHJcbiAgICBjb25zdCBib3R0b20gPSB0aGlzLnN0ZXBCb3R0b207XHJcbiAgICBjb25zdCB0b3AgPSB0aGlzLnN0ZXBUb3A7XHJcblxyXG4gICAgaWYgKCBsaXF1aWRMZXZlbCA8IGJvdHRvbSB8fCBsaXF1aWRMZXZlbCA+IHRvcCApIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmF0aW8gPSAoIGxpcXVpZExldmVsIC0gYm90dG9tICkgLyAoIHRvcCAtIGJvdHRvbSApO1xyXG5cclxuICAgIHJldHVybiBNYXNzLmV2YWx1YXRlUGllY2V3aXNlTGluZWFyKCBCb2F0RGVzaWduLk9ORV9MSVRFUl9ESVNQTEFDRURfQVJFQVMsIHJhdGlvICkgKiB0aGlzLnN0ZXBNdWx0aXBsaWVyICogdGhpcy5zdGVwTXVsdGlwbGllcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGRpc3BsYWNlZCB2b2x1bWUgb2YgdGhpcyBvYmplY3QgdXAgdG8gYSBnaXZlbiB5IGxldmVsLCBhc3N1bWluZyBhIHkgdmFsdWUgZm9yIHRoZSBnaXZlbiBsaXF1aWQgbGV2ZWwuXHJcbiAgICpcclxuICAgKiBBc3N1bWVzIHN0ZXAgaW5mb3JtYXRpb24gd2FzIHVwZGF0ZWQuXHJcbiAgICovXHJcbiAgcHVibGljIGdldERpc3BsYWNlZFZvbHVtZSggbGlxdWlkTGV2ZWw6IG51bWJlciApOiBudW1iZXIge1xyXG4gICAgY29uc3QgYm90dG9tID0gdGhpcy5zdGVwQm90dG9tO1xyXG4gICAgY29uc3QgdG9wID0gdGhpcy5zdGVwVG9wO1xyXG5cclxuICAgIGlmICggbGlxdWlkTGV2ZWwgPD0gYm90dG9tICkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCBsaXF1aWRMZXZlbCA+PSB0b3AgKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRpc3BsYWNlbWVudFZvbHVtZVByb3BlcnR5LnZhbHVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGNvbnN0IHJhdGlvID0gKCBsaXF1aWRMZXZlbCAtIGJvdHRvbSApIC8gKCB0b3AgLSBib3R0b20gKTtcclxuXHJcbiAgICAgIHJldHVybiBNYXNzLmV2YWx1YXRlUGllY2V3aXNlTGluZWFyKCBCb2F0RGVzaWduLk9ORV9MSVRFUl9ESVNQTEFDRURfVk9MVU1FUywgcmF0aW8gKSAqIHRoaXMuc3RlcE11bHRpcGxpZXIgKiB0aGlzLnN0ZXBNdWx0aXBsaWVyICogdGhpcy5zdGVwTXVsdGlwbGllcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGludGVybmFsIGJhc2luIGFyZWEgb2YgdGhpcyBvYmplY3QgdXAgdG8gYSBnaXZlbiB5IGxldmVsLCBhc3N1bWluZyBhIHkgdmFsdWUgZm9yIHRoZSBnaXZlbiBsaXF1aWQgbGV2ZWwuXHJcbiAgICpcclxuICAgKiBBc3N1bWVzIHN0ZXAgaW5mb3JtYXRpb24gd2FzIHVwZGF0ZWQuXHJcbiAgICovXHJcbiAgcHVibGljIGdldEJhc2luQXJlYSggbGlxdWlkTGV2ZWw6IG51bWJlciApOiBudW1iZXIge1xyXG4gICAgY29uc3QgYm90dG9tID0gdGhpcy5zdGVwQm90dG9tO1xyXG4gICAgY29uc3QgdG9wID0gdGhpcy5zdGVwVG9wO1xyXG5cclxuICAgIGlmICggbGlxdWlkTGV2ZWwgPD0gYm90dG9tIHx8IGxpcXVpZExldmVsID49IHRvcCApIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgY29uc3QgcmF0aW8gPSAoIGxpcXVpZExldmVsIC0gYm90dG9tICkgLyAoIHRvcCAtIGJvdHRvbSApO1xyXG5cclxuICAgICAgcmV0dXJuIE1hc3MuZXZhbHVhdGVQaWVjZXdpc2VMaW5lYXIoIEJvYXREZXNpZ24uT05FX0xJVEVSX0lOVEVSTkFMX0FSRUFTLCByYXRpbyApICogdGhpcy5zdGVwTXVsdGlwbGllciAqIHRoaXMuc3RlcE11bHRpcGxpZXI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBkaXNwbGFjZWQgdm9sdW1lIG9mIHRoaXMgb2JqZWN0IHVwIHRvIGEgZ2l2ZW4geSBsZXZlbCwgYXNzdW1pbmcgYSB5IHZhbHVlIGZvciB0aGUgZ2l2ZW4gbGlxdWlkIGxldmVsLlxyXG4gICAqXHJcbiAgICogQXNzdW1lcyBzdGVwIGluZm9ybWF0aW9uIHdhcyB1cGRhdGVkLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRCYXNpblZvbHVtZSggbGlxdWlkTGV2ZWw6IG51bWJlciApOiBudW1iZXIge1xyXG4gICAgY29uc3QgYm90dG9tID0gdGhpcy5zdGVwQm90dG9tO1xyXG4gICAgY29uc3QgdG9wID0gdGhpcy5zdGVwVG9wO1xyXG5cclxuICAgIGlmICggbGlxdWlkTGV2ZWwgPD0gYm90dG9tICkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCBsaXF1aWRMZXZlbCA+PSB0b3AgKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnN0ZXBJbnRlcm5hbFZvbHVtZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBjb25zdCByYXRpbyA9ICggbGlxdWlkTGV2ZWwgLSBib3R0b20gKSAvICggdG9wIC0gYm90dG9tICk7XHJcblxyXG4gICAgICByZXR1cm4gTWFzcy5ldmFsdWF0ZVBpZWNld2lzZUxpbmVhciggQm9hdERlc2lnbi5PTkVfTElURVJfSU5URVJOQUxfVk9MVU1FUywgcmF0aW8gKSAqIHRoaXMuc3RlcE11bHRpcGxpZXIgKiB0aGlzLnN0ZXBNdWx0aXBsaWVyICogdGhpcy5zdGVwTXVsdGlwbGllcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRSYXRpb3MoIHdpZHRoUmF0aW86IG51bWJlciwgaGVpZ2h0UmF0aW86IG51bWJlciApOiB2b2lkIHtcclxuICAgIC8vIFNlZSBzdWJjbGFzcyBmb3IgaW1wbGVtZW50YXRpb25cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0cyB2YWx1ZXMgdG8gdGhlaXIgb3JpZ2luYWwgc3RhdGVcclxuICAgKi9cclxuICBwdWJsaWMgb3ZlcnJpZGUgcmVzZXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmRpc3BsYWNlbWVudFZvbHVtZVByb3BlcnR5LnJlc2V0KCk7XHJcblxyXG4gICAgdGhpcy5iYXNpbi5yZXNldCgpO1xyXG5cclxuICAgIHN1cGVyLnJlc2V0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEJvYXRJTyA9IG5ldyBJT1R5cGUoICdCb2F0SU8nLCB7XHJcbiAgICB2YWx1ZVR5cGU6IEJvYXQsXHJcbiAgICBzdXBlcnR5cGU6IE1hc3MuTWFzc0lPLFxyXG4gICAgZG9jdW1lbnRhdGlvbjogJ1JlcHJlc2VudHMgYSBib2F0J1xyXG4gIH0gKTtcclxufVxyXG5cclxuZGVuc2l0eUJ1b3lhbmN5Q29tbW9uLnJlZ2lzdGVyKCAnQm9hdCcsIEJvYXQgKTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsY0FBYyxNQUFNLHVDQUF1QztBQUVsRSxPQUFPQyxLQUFLLE1BQU0sNkJBQTZCO0FBQy9DLFNBQVNDLEtBQUssUUFBUSxnQ0FBZ0M7QUFDdEQsT0FBT0MsVUFBVSxNQUFNLHFDQUFxQztBQUM1RCxPQUFPQyxJQUFJLE1BQWdELDRCQUE0QjtBQUN2RixPQUFPQyxRQUFRLE1BQU0sZ0NBQWdDO0FBQ3JELE9BQU9DLHFCQUFxQixNQUFNLGdDQUFnQztBQUNsRSxPQUFPQyxTQUFTLE1BQU0sZ0JBQWdCO0FBQ3RDLE9BQU9DLFVBQVUsTUFBTSxpQkFBaUI7QUFJeEMsT0FBT0MsU0FBUyxNQUFNLGtDQUFrQztBQUV4RCxPQUFPQyxNQUFNLE1BQU0sdUNBQXVDO0FBQzFELFNBQVNDLFNBQVMsUUFBUSxpQ0FBaUM7QUFDM0QsT0FBT0MsU0FBUyxNQUE0Qix1Q0FBdUM7QUFJbkYsZUFBZSxNQUFNQyxJQUFJLFNBQVNULElBQUksQ0FBQztFQU1yQzs7RUFHQTs7RUFLT1UsV0FBV0EsQ0FBRUMsTUFBcUIsRUFBRUMsa0JBQTZDLEVBQUVDLHNCQUEyQyxFQUFFQyxjQUEyQixFQUFHO0lBRW5LLE1BQU1DLDBCQUEwQixHQUFHLElBQUluQixjQUFjLENBQUUsSUFBSyxDQUFDO0lBRTdELE1BQU1vQix3QkFBd0IsR0FBR1osVUFBVSxDQUFDYSx1QkFBdUIsQ0FBRUwsa0JBQWtCLENBQUNNLEtBQUssR0FBRyxDQUFDLEVBQUVILDBCQUEwQixDQUFDRyxLQUFLLEdBQUcsSUFBSyxDQUFDO0lBQzVJLE1BQU1DLE1BQU0sR0FBR2YsVUFBVSxDQUFDZ0IscUJBQXFCLEdBQUdMLDBCQUEwQixDQUFDRyxLQUFLLEdBQUcsSUFBSTtJQUV6RixNQUFNRyxNQUFNLEdBQUdiLFNBQVMsQ0FBNkMsQ0FBQyxDQUFFO01BQ3RFYyxJQUFJLEVBQUVYLE1BQU0sQ0FBQ1ksa0JBQWtCLENBQUVQLHdCQUF3QixFQUFFLElBQUssQ0FBQztNQUNqRVEsS0FBSyxFQUFFMUIsS0FBSyxDQUFDMkIsT0FBTyxDQUFFVCx3QkFBeUIsQ0FBQztNQUNoREcsTUFBTSxFQUFFQSxNQUFNO01BQ2RPLFNBQVMsRUFBRW5CLFNBQVMsQ0FBQ29CLEtBQUs7TUFFMUI7TUFDQUMsUUFBUSxFQUFFM0IsUUFBUSxDQUFDNEI7SUFDckIsQ0FBQyxFQUFFZixjQUFlLENBQUM7SUFFbkJnQixNQUFNLElBQUlBLE1BQU0sQ0FBRSxDQUFDVCxNQUFNLENBQUNVLFNBQVUsQ0FBQzs7SUFFckM7SUFDQSxLQUFLLENBQUVwQixNQUFNLEVBQUVVLE1BQWtDLENBQUM7O0lBRWxEO0lBQ0FoQixTQUFTLENBQUMyQixTQUFTLENBQUUsQ0FBRXBCLGtCQUFrQixFQUFFRywwQkFBMEIsQ0FBRSxFQUFFLENBQUVrQixVQUFVLEVBQUVDLGtCQUFrQixLQUFNO01BQzdHLElBQUtBLGtCQUFrQixLQUFLLENBQUMsRUFBRztRQUM5QjtNQUNGO01BRUEsTUFBTUMsUUFBUSxHQUFHL0IsVUFBVSxDQUFDYSx1QkFBdUIsQ0FBRWdCLFVBQVUsR0FBRyxDQUFDLEVBQUVDLGtCQUFrQixHQUFHLElBQUssQ0FBQztNQUNoRyxNQUFNZixNQUFNLEdBQUdmLFVBQVUsQ0FBQ2dCLHFCQUFxQixHQUFHYyxrQkFBa0IsR0FBRyxJQUFJO01BRTNFdkIsTUFBTSxDQUFDeUIsa0JBQWtCLENBQUUsSUFBSSxDQUFDZCxJQUFJLEVBQUVhLFFBQVEsRUFBRSxJQUFLLENBQUM7TUFDdEQsSUFBSSxDQUFDRSxhQUFhLENBQUNuQixLQUFLLEdBQUdwQixLQUFLLENBQUMyQixPQUFPLENBQUVVLFFBQVMsQ0FBQyxDQUFDLENBQUM7O01BRXRELElBQUksQ0FBQ0csVUFBVSxHQUFHLElBQUk7TUFDdEIsSUFBSSxDQUFDQyxjQUFjLENBQUNyQixLQUFLLEdBQUdDLE1BQU07TUFDbEMsSUFBSSxDQUFDbUIsVUFBVSxHQUFHLEtBQUs7TUFFdkIsSUFBSSxDQUFDRSxrQkFBa0IsQ0FBQ3RCLEtBQUssR0FBR3JCLEtBQUssQ0FBQzRDLGlCQUFpQixDQUFFTixRQUFTLENBQUMsQ0FBQ08sT0FBTyxDQUFDLENBQUM7TUFDN0UsSUFBSSxDQUFDQyxTQUFTLENBQUMsQ0FBQztJQUNsQixDQUFFLENBQUM7SUFFSCxJQUFJLENBQUM1QiwwQkFBMEIsR0FBR0EsMEJBQTBCO0lBQzVELElBQUksQ0FBQ0Ysc0JBQXNCLEdBQUdBLHNCQUFzQjtJQUVwRCxJQUFJLENBQUMrQixLQUFLLEdBQUcsSUFBSXpDLFNBQVMsQ0FBRSxJQUFLLENBQUM7SUFFbENFLFNBQVMsQ0FBQzJCLFNBQVMsQ0FBRSxDQUFFLElBQUksQ0FBQ25CLHNCQUFzQixFQUFFLElBQUksQ0FBQytCLEtBQUssQ0FBQ0Msb0JBQW9CLENBQUUsRUFBRSxDQUFFakIsUUFBUSxFQUFFVCxNQUFNLEtBQU07TUFDN0csSUFBSSxDQUFDMkIscUJBQXFCLENBQUM1QixLQUFLLEdBQUdVLFFBQVEsQ0FBQ21CLE9BQU8sR0FBRzVCLE1BQU07SUFDOUQsQ0FBRSxDQUFDO0lBRUgsSUFBSSxDQUFDNkIsa0JBQWtCLEdBQUcsQ0FBQztJQUMzQixJQUFJLENBQUNDLGNBQWMsR0FBRyxDQUFDO0lBRXZCLElBQUksQ0FBQ0MsaUJBQWlCLEdBQUcsSUFBSUMsS0FBSyxDQUFDQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxNQUFNQyxnQkFBZ0IsR0FBRyxJQUFJRixLQUFLLENBQUNHLElBQUksQ0FBRWxELFVBQVUsQ0FBQ21ELGtCQUFrQixDQUFFLENBQUUsQ0FBQyxFQUFFLElBQUlKLEtBQUssQ0FBQ0ssbUJBQW1CLENBQUMsQ0FBRSxDQUFDO0lBQzlHLElBQUksQ0FBQ04saUJBQWlCLENBQUNPLEdBQUcsQ0FBRUosZ0JBQWlCLENBQUM7RUFDaEQ7O0VBRUE7QUFDRjtBQUNBO0VBQ2tCSyxJQUFJQSxDQUFFQyxFQUFVLEVBQUVDLGtCQUEwQixFQUFTO0lBQ25FLEtBQUssQ0FBQ0YsSUFBSSxDQUFFQyxFQUFFLEVBQUVDLGtCQUFtQixDQUFDO0lBRXBDLElBQUksQ0FBQ2hCLEtBQUssQ0FBQ2lCLDJCQUEyQixDQUFDQyxRQUFRLENBQUVGLGtCQUFtQixDQUFDO0VBQ3ZFOztFQUVBO0FBQ0Y7QUFDQTtFQUNrQkcsTUFBTUEsQ0FBQSxFQUFZO0lBQ2hDLE9BQU8sSUFBSTtFQUNiOztFQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNrQkMscUJBQXFCQSxDQUFBLEVBQVM7SUFDNUMsS0FBSyxDQUFDQSxxQkFBcUIsQ0FBQyxDQUFDO0lBRTdCLE1BQU1DLE9BQU8sR0FBRyxJQUFJLENBQUNDLFVBQVUsQ0FBQ0MsR0FBRyxDQUFDLENBQUM7SUFDckMsTUFBTUMsT0FBTyxHQUFHLElBQUksQ0FBQ0YsVUFBVSxDQUFDRyxHQUFHLENBQUMsQ0FBQztJQUVyQyxNQUFNQyxlQUFlLEdBQUcsSUFBSSxDQUFDdkQsMEJBQTBCLENBQUNHLEtBQUs7SUFDN0QsSUFBSSxDQUFDK0IsY0FBYyxHQUFHc0IsSUFBSSxDQUFDQyxHQUFHLENBQUVGLGVBQWUsR0FBRyxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUUsQ0FBQztJQUNoRSxJQUFJLENBQUN0QixrQkFBa0IsR0FBRzVDLFVBQVUsQ0FBQ3FFLDBCQUEwQixDQUFFckUsVUFBVSxDQUFDcUUsMEJBQTBCLENBQUNDLE1BQU0sR0FBRyxDQUFDLENBQUUsR0FBRyxJQUFJLENBQUN6QixjQUFjLEdBQUcsSUFBSSxDQUFDQSxjQUFjLEdBQUcsSUFBSSxDQUFDQSxjQUFjO0lBRXJMLElBQUksQ0FBQzBCLEtBQUssR0FBR1YsT0FBTztJQUNwQixJQUFJLENBQUNXLFVBQVUsR0FBR1IsT0FBTyxHQUFHLElBQUksQ0FBQ25CLGNBQWMsR0FBRzdDLFVBQVUsQ0FBQ3lFLGdCQUFnQixDQUFDQyxJQUFJO0lBQ2xGLElBQUksQ0FBQ0MsT0FBTyxHQUFHWCxPQUFPLEdBQUcsSUFBSSxDQUFDbkIsY0FBYyxHQUFHN0MsVUFBVSxDQUFDeUUsZ0JBQWdCLENBQUNHLElBQUk7SUFFL0UsSUFBSSxDQUFDcEMsS0FBSyxDQUFDbUMsT0FBTyxHQUFHLElBQUksQ0FBQ0EsT0FBTztJQUNqQyxJQUFJLENBQUNuQyxLQUFLLENBQUNnQyxVQUFVLEdBQUdSLE9BQU8sR0FBRyxJQUFJLENBQUNuQixjQUFjLEdBQUc3QyxVQUFVLENBQUM2RSx5QkFBeUI7RUFDOUY7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUNrQkMsU0FBU0EsQ0FBRUMsR0FBUyxFQUFFQyxPQUFnQixFQUFrQjtJQUN0RSxNQUFNQyxLQUFLLEdBQUdkLElBQUksQ0FBQ0MsR0FBRyxDQUFFLElBQUksQ0FBQ3pELDBCQUEwQixDQUFDRyxLQUFLLEdBQUcsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFFLENBQUM7SUFDOUU7SUFDQSxNQUFNb0UsV0FBVyxHQUFHLElBQUksQ0FBQ0MsTUFBTSxDQUFDRCxXQUFXO0lBQzNDLE1BQU1FLGdCQUFnQixHQUFHTCxHQUFHLENBQUNNLFFBQVEsQ0FBQ0MsUUFBUSxDQUFFSixXQUFXLENBQUNLLENBQUMsRUFBRUwsV0FBVyxDQUFDTSxDQUFDLEVBQUUsQ0FBRSxDQUFDLENBQUNDLGFBQWEsQ0FBRVIsS0FBTSxDQUFDO0lBRXhHLE1BQU1TLFNBQVMsR0FBRyxJQUFJM0MsS0FBSyxDQUFDNEMsU0FBUyxDQUFFaEcsVUFBVSxDQUFDaUcsYUFBYSxDQUFFUixnQkFBaUIsQ0FBQyxFQUFFekYsVUFBVSxDQUFDaUcsYUFBYSxDQUFFYixHQUFHLENBQUNjLFNBQVUsQ0FBRSxDQUFDO0lBQ2hJLE1BQU1DLGFBQWdELEdBQUcsRUFBRTtJQUMzREosU0FBUyxDQUFDSyxlQUFlLENBQUUsSUFBSSxDQUFDakQsaUJBQWlCLEVBQUUsSUFBSSxFQUFFZ0QsYUFBYyxDQUFDO0lBRXhFLE9BQU9BLGFBQWEsQ0FBQ3hCLE1BQU0sR0FBR3dCLGFBQWEsQ0FBRSxDQUFDLENBQUUsQ0FBQ0UsUUFBUSxHQUFHZixLQUFLLEdBQUcsSUFBSTtFQUMxRTs7RUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBQ1NnQixnQkFBZ0JBLENBQUVDLFdBQW1CLEVBQVc7SUFDckQsTUFBTUMsTUFBTSxHQUFHLElBQUksQ0FBQzNCLFVBQVU7SUFDOUIsTUFBTTRCLEdBQUcsR0FBRyxJQUFJLENBQUN6QixPQUFPO0lBRXhCLElBQUt1QixXQUFXLEdBQUdDLE1BQU0sSUFBSUQsV0FBVyxHQUFHRSxHQUFHLEVBQUc7TUFDL0MsT0FBTyxDQUFDO0lBQ1Y7SUFFQSxNQUFNQyxLQUFLLEdBQUcsQ0FBRUgsV0FBVyxHQUFHQyxNQUFNLEtBQU9DLEdBQUcsR0FBR0QsTUFBTSxDQUFFO0lBRXpELE9BQU92RyxJQUFJLENBQUMwRyx1QkFBdUIsQ0FBRXRHLFVBQVUsQ0FBQ3VHLHlCQUF5QixFQUFFRixLQUFNLENBQUMsR0FBRyxJQUFJLENBQUN4RCxjQUFjLEdBQUcsSUFBSSxDQUFDQSxjQUFjO0VBQ2hJOztFQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7RUFDUzJELGtCQUFrQkEsQ0FBRU4sV0FBbUIsRUFBVztJQUN2RCxNQUFNQyxNQUFNLEdBQUcsSUFBSSxDQUFDM0IsVUFBVTtJQUM5QixNQUFNNEIsR0FBRyxHQUFHLElBQUksQ0FBQ3pCLE9BQU87SUFFeEIsSUFBS3VCLFdBQVcsSUFBSUMsTUFBTSxFQUFHO01BQzNCLE9BQU8sQ0FBQztJQUNWLENBQUMsTUFDSSxJQUFLRCxXQUFXLElBQUlFLEdBQUcsRUFBRztNQUM3QixPQUFPLElBQUksQ0FBQ3pGLDBCQUEwQixDQUFDRyxLQUFLO0lBQzlDLENBQUMsTUFDSTtNQUNILE1BQU11RixLQUFLLEdBQUcsQ0FBRUgsV0FBVyxHQUFHQyxNQUFNLEtBQU9DLEdBQUcsR0FBR0QsTUFBTSxDQUFFO01BRXpELE9BQU92RyxJQUFJLENBQUMwRyx1QkFBdUIsQ0FBRXRHLFVBQVUsQ0FBQ3lHLDJCQUEyQixFQUFFSixLQUFNLENBQUMsR0FBRyxJQUFJLENBQUN4RCxjQUFjLEdBQUcsSUFBSSxDQUFDQSxjQUFjLEdBQUcsSUFBSSxDQUFDQSxjQUFjO0lBQ3hKO0VBQ0Y7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUNTNkQsWUFBWUEsQ0FBRVIsV0FBbUIsRUFBVztJQUNqRCxNQUFNQyxNQUFNLEdBQUcsSUFBSSxDQUFDM0IsVUFBVTtJQUM5QixNQUFNNEIsR0FBRyxHQUFHLElBQUksQ0FBQ3pCLE9BQU87SUFFeEIsSUFBS3VCLFdBQVcsSUFBSUMsTUFBTSxJQUFJRCxXQUFXLElBQUlFLEdBQUcsRUFBRztNQUNqRCxPQUFPLENBQUM7SUFDVixDQUFDLE1BQ0k7TUFDSCxNQUFNQyxLQUFLLEdBQUcsQ0FBRUgsV0FBVyxHQUFHQyxNQUFNLEtBQU9DLEdBQUcsR0FBR0QsTUFBTSxDQUFFO01BRXpELE9BQU92RyxJQUFJLENBQUMwRyx1QkFBdUIsQ0FBRXRHLFVBQVUsQ0FBQzJHLHdCQUF3QixFQUFFTixLQUFNLENBQUMsR0FBRyxJQUFJLENBQUN4RCxjQUFjLEdBQUcsSUFBSSxDQUFDQSxjQUFjO0lBQy9IO0VBQ0Y7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUNTK0QsY0FBY0EsQ0FBRVYsV0FBbUIsRUFBVztJQUNuRCxNQUFNQyxNQUFNLEdBQUcsSUFBSSxDQUFDM0IsVUFBVTtJQUM5QixNQUFNNEIsR0FBRyxHQUFHLElBQUksQ0FBQ3pCLE9BQU87SUFFeEIsSUFBS3VCLFdBQVcsSUFBSUMsTUFBTSxFQUFHO01BQzNCLE9BQU8sQ0FBQztJQUNWLENBQUMsTUFDSSxJQUFLRCxXQUFXLElBQUlFLEdBQUcsRUFBRztNQUM3QixPQUFPLElBQUksQ0FBQ3hELGtCQUFrQjtJQUNoQyxDQUFDLE1BQ0k7TUFDSCxNQUFNeUQsS0FBSyxHQUFHLENBQUVILFdBQVcsR0FBR0MsTUFBTSxLQUFPQyxHQUFHLEdBQUdELE1BQU0sQ0FBRTtNQUV6RCxPQUFPdkcsSUFBSSxDQUFDMEcsdUJBQXVCLENBQUV0RyxVQUFVLENBQUNxRSwwQkFBMEIsRUFBRWdDLEtBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQ3hELGNBQWMsR0FBRyxJQUFJLENBQUNBLGNBQWMsR0FBRyxJQUFJLENBQUNBLGNBQWM7SUFDdko7RUFDRjtFQUVPZ0UsU0FBU0EsQ0FBRUMsVUFBa0IsRUFBRUMsV0FBbUIsRUFBUztJQUNoRTtFQUFBOztFQUdGO0FBQ0Y7QUFDQTtFQUNrQkMsS0FBS0EsQ0FBQSxFQUFTO0lBQzVCLElBQUksQ0FBQ3JHLDBCQUEwQixDQUFDcUcsS0FBSyxDQUFDLENBQUM7SUFFdkMsSUFBSSxDQUFDeEUsS0FBSyxDQUFDd0UsS0FBSyxDQUFDLENBQUM7SUFFbEIsS0FBSyxDQUFDQSxLQUFLLENBQUMsQ0FBQztFQUNmO0VBRUEsT0FBdUJDLE1BQU0sR0FBRyxJQUFJL0csTUFBTSxDQUFFLFFBQVEsRUFBRTtJQUNwRGdILFNBQVMsRUFBRTdHLElBQUk7SUFDZjhHLFNBQVMsRUFBRXZILElBQUksQ0FBQ3dILE1BQU07SUFDdEJDLGFBQWEsRUFBRTtFQUNqQixDQUFFLENBQUM7QUFDTDtBQUVBdkgscUJBQXFCLENBQUN3SCxRQUFRLENBQUUsTUFBTSxFQUFFakgsSUFBSyxDQUFDIn0=