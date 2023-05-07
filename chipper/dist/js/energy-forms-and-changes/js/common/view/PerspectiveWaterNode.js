// Copyright 2018-2022, University of Colorado Boulder

/**
 * a scenery node that looks like water in a cylindrical container as seen from slightly above the horizon
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import { Shape } from '../../../../kite/js/imports.js';
import { Node, Path } from '../../../../scenery/js/imports.js';
import energyFormsAndChanges from '../../energyFormsAndChanges.js';
import EFACConstants from '../EFACConstants.js';
import BeakerSteamCanvasNode from './BeakerSteamCanvasNode.js';

// constants
const PERSPECTIVE_PROPORTION = -EFACConstants.Z_TO_Y_OFFSET_MULTIPLIER;

// constants for the PerspectiveWaterNode
const FLUID_LINE_WIDTH = 2;
class PerspectiveWaterNode extends Node {
  /**
   * @param {Rectangle} beakerOutlineRect
   * @param {Property.<number>} fluidProportionProperty
   * @param {Property.<number>} temperatureProperty
   * @param {number} fluidBoilingPoint
   * @param {Color} fluidColor
   * @param {Color} steamColor
   */
  constructor(beakerOutlineRect, fluidProportionProperty, temperatureProperty, fluidBoilingPoint, fluidColor, steamColor) {
    super();

    // @private
    this.beakerOutlineRect = beakerOutlineRect;
    this.fluidProportionProperty = fluidProportionProperty;
    this.temperatureProperty = temperatureProperty;
    this.fluidBoilingPoint = fluidBoilingPoint;
    this.fluidColor = fluidColor;
    this.steamColor = steamColor;

    // @private - a rectangle that defines the size of the fluid within the beaker
    this.fluidBounds = Bounds2.NOTHING.copy();

    // @private - nodes that represent the top and body of the water
    this.liquidWaterTopNode = new Path(null, {
      fill: this.fluidColor.colorUtilsBrighter(0.25),
      lineWidth: FLUID_LINE_WIDTH,
      stroke: this.fluidColor.colorUtilsDarker(0.2)
    });
    this.liquidWaterBodyNode = new Path(null, {
      fill: this.fluidColor,
      lineWidth: FLUID_LINE_WIDTH,
      stroke: this.fluidColor.colorUtilsDarker(0.2)
    });

    // @private
    this.steamCanvasNode = new BeakerSteamCanvasNode(this.beakerOutlineRect, this.fluidProportionProperty, this.temperatureProperty, this.fluidBoilingPoint, this.steamColor, {
      canvasBounds: new Bounds2(-EFACConstants.SCREEN_LAYOUT_BOUNDS.maxX / 2, -EFACConstants.SCREEN_LAYOUT_BOUNDS.maxY, EFACConstants.SCREEN_LAYOUT_BOUNDS.maxX / 2, EFACConstants.SCREEN_LAYOUT_BOUNDS.maxY)
    });
    this.addChild(this.liquidWaterBodyNode);
    this.addChild(this.liquidWaterTopNode);
    this.addChild(this.steamCanvasNode);

    // update the appearance of the water as the level changes
    this.fluidProportionProperty.link(fluidProportion => {
      const fluidHeight = beakerOutlineRect.height * fluidProportion;
      this.fluidBounds.setMinMax(beakerOutlineRect.minX, beakerOutlineRect.maxY - fluidHeight, beakerOutlineRect.maxX, 0);
      this.updateWaterAppearance();
    });
  }

  /**
   * @public
   */
  reset() {
    this.steamCanvasNode.reset();
  }

  /**
   * time step function for the water
   * @param {number} dt - the change in time
   * @public
   */
  step(dt) {
    this.steamCanvasNode.step(dt);
  }

  /**
   * update the appearance of the water
   * @private
   */
  updateWaterAppearance() {
    const ellipseWidth = this.fluidBounds.width;
    const ellipseHeight = PERSPECTIVE_PROPORTION * ellipseWidth;
    const liquidWaterTopEllipse = Shape.ellipse(this.fluidBounds.centerX, this.fluidBounds.minY, ellipseWidth / 2, ellipseHeight / 2, 0, 0, Math.PI / 2, false);
    const halfWidth = this.fluidBounds.width / 2;
    const halfHeight = ellipseHeight / 2;
    const liquidWaterBodyShape = new Shape().moveTo(this.fluidBounds.minX, this.fluidBounds.minY) // Top left of the beaker body.
    .ellipticalArc(this.fluidBounds.centerX, this.fluidBounds.minY, halfWidth, halfHeight, 0, Math.PI, 0, false).lineTo(this.fluidBounds.maxX, this.fluidBounds.maxY) // Bottom right of the beaker body.
    .ellipticalArc(this.fluidBounds.centerX, this.fluidBounds.maxY, halfWidth, halfHeight, 0, 0, Math.PI, false).close();
    this.liquidWaterBodyNode.setShape(liquidWaterBodyShape);
    this.liquidWaterTopNode.setShape(liquidWaterTopEllipse);
  }
}
energyFormsAndChanges.register('PerspectiveWaterNode', PerspectiveWaterNode);
export default PerspectiveWaterNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCb3VuZHMyIiwiU2hhcGUiLCJOb2RlIiwiUGF0aCIsImVuZXJneUZvcm1zQW5kQ2hhbmdlcyIsIkVGQUNDb25zdGFudHMiLCJCZWFrZXJTdGVhbUNhbnZhc05vZGUiLCJQRVJTUEVDVElWRV9QUk9QT1JUSU9OIiwiWl9UT19ZX09GRlNFVF9NVUxUSVBMSUVSIiwiRkxVSURfTElORV9XSURUSCIsIlBlcnNwZWN0aXZlV2F0ZXJOb2RlIiwiY29uc3RydWN0b3IiLCJiZWFrZXJPdXRsaW5lUmVjdCIsImZsdWlkUHJvcG9ydGlvblByb3BlcnR5IiwidGVtcGVyYXR1cmVQcm9wZXJ0eSIsImZsdWlkQm9pbGluZ1BvaW50IiwiZmx1aWRDb2xvciIsInN0ZWFtQ29sb3IiLCJmbHVpZEJvdW5kcyIsIk5PVEhJTkciLCJjb3B5IiwibGlxdWlkV2F0ZXJUb3BOb2RlIiwiZmlsbCIsImNvbG9yVXRpbHNCcmlnaHRlciIsImxpbmVXaWR0aCIsInN0cm9rZSIsImNvbG9yVXRpbHNEYXJrZXIiLCJsaXF1aWRXYXRlckJvZHlOb2RlIiwic3RlYW1DYW52YXNOb2RlIiwiY2FudmFzQm91bmRzIiwiU0NSRUVOX0xBWU9VVF9CT1VORFMiLCJtYXhYIiwibWF4WSIsImFkZENoaWxkIiwibGluayIsImZsdWlkUHJvcG9ydGlvbiIsImZsdWlkSGVpZ2h0IiwiaGVpZ2h0Iiwic2V0TWluTWF4IiwibWluWCIsInVwZGF0ZVdhdGVyQXBwZWFyYW5jZSIsInJlc2V0Iiwic3RlcCIsImR0IiwiZWxsaXBzZVdpZHRoIiwid2lkdGgiLCJlbGxpcHNlSGVpZ2h0IiwibGlxdWlkV2F0ZXJUb3BFbGxpcHNlIiwiZWxsaXBzZSIsImNlbnRlclgiLCJtaW5ZIiwiTWF0aCIsIlBJIiwiaGFsZldpZHRoIiwiaGFsZkhlaWdodCIsImxpcXVpZFdhdGVyQm9keVNoYXBlIiwibW92ZVRvIiwiZWxsaXB0aWNhbEFyYyIsImxpbmVUbyIsImNsb3NlIiwic2V0U2hhcGUiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlBlcnNwZWN0aXZlV2F0ZXJOb2RlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIGEgc2NlbmVyeSBub2RlIHRoYXQgbG9va3MgbGlrZSB3YXRlciBpbiBhIGN5bGluZHJpY2FsIGNvbnRhaW5lciBhcyBzZWVuIGZyb20gc2xpZ2h0bHkgYWJvdmUgdGhlIGhvcml6b25cclxuICogQGF1dGhvciBKb2huIEJsYW5jb1xyXG4gKi9cclxuXHJcbmltcG9ydCBCb3VuZHMyIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9Cb3VuZHMyLmpzJztcclxuaW1wb3J0IHsgU2hhcGUgfSBmcm9tICcuLi8uLi8uLi8uLi9raXRlL2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgeyBOb2RlLCBQYXRoIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IGVuZXJneUZvcm1zQW5kQ2hhbmdlcyBmcm9tICcuLi8uLi9lbmVyZ3lGb3Jtc0FuZENoYW5nZXMuanMnO1xyXG5pbXBvcnQgRUZBQ0NvbnN0YW50cyBmcm9tICcuLi9FRkFDQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IEJlYWtlclN0ZWFtQ2FudmFzTm9kZSBmcm9tICcuL0JlYWtlclN0ZWFtQ2FudmFzTm9kZS5qcyc7XHJcblxyXG4vLyBjb25zdGFudHNcclxuY29uc3QgUEVSU1BFQ1RJVkVfUFJPUE9SVElPTiA9IC1FRkFDQ29uc3RhbnRzLlpfVE9fWV9PRkZTRVRfTVVMVElQTElFUjtcclxuXHJcbi8vIGNvbnN0YW50cyBmb3IgdGhlIFBlcnNwZWN0aXZlV2F0ZXJOb2RlXHJcbmNvbnN0IEZMVUlEX0xJTkVfV0lEVEggPSAyO1xyXG5cclxuY2xhc3MgUGVyc3BlY3RpdmVXYXRlck5vZGUgZXh0ZW5kcyBOb2RlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtSZWN0YW5nbGV9IGJlYWtlck91dGxpbmVSZWN0XHJcbiAgICogQHBhcmFtIHtQcm9wZXJ0eS48bnVtYmVyPn0gZmx1aWRQcm9wb3J0aW9uUHJvcGVydHlcclxuICAgKiBAcGFyYW0ge1Byb3BlcnR5LjxudW1iZXI+fSB0ZW1wZXJhdHVyZVByb3BlcnR5XHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGZsdWlkQm9pbGluZ1BvaW50XHJcbiAgICogQHBhcmFtIHtDb2xvcn0gZmx1aWRDb2xvclxyXG4gICAqIEBwYXJhbSB7Q29sb3J9IHN0ZWFtQ29sb3JcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggYmVha2VyT3V0bGluZVJlY3QsIGZsdWlkUHJvcG9ydGlvblByb3BlcnR5LCB0ZW1wZXJhdHVyZVByb3BlcnR5LCBmbHVpZEJvaWxpbmdQb2ludCwgZmx1aWRDb2xvciwgc3RlYW1Db2xvciApIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgLy8gQHByaXZhdGVcclxuICAgIHRoaXMuYmVha2VyT3V0bGluZVJlY3QgPSBiZWFrZXJPdXRsaW5lUmVjdDtcclxuICAgIHRoaXMuZmx1aWRQcm9wb3J0aW9uUHJvcGVydHkgPSBmbHVpZFByb3BvcnRpb25Qcm9wZXJ0eTtcclxuICAgIHRoaXMudGVtcGVyYXR1cmVQcm9wZXJ0eSA9IHRlbXBlcmF0dXJlUHJvcGVydHk7XHJcbiAgICB0aGlzLmZsdWlkQm9pbGluZ1BvaW50ID0gZmx1aWRCb2lsaW5nUG9pbnQ7XHJcbiAgICB0aGlzLmZsdWlkQ29sb3IgPSBmbHVpZENvbG9yO1xyXG4gICAgdGhpcy5zdGVhbUNvbG9yID0gc3RlYW1Db2xvcjtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZSAtIGEgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgc2l6ZSBvZiB0aGUgZmx1aWQgd2l0aGluIHRoZSBiZWFrZXJcclxuICAgIHRoaXMuZmx1aWRCb3VuZHMgPSBCb3VuZHMyLk5PVEhJTkcuY29weSgpO1xyXG5cclxuICAgIC8vIEBwcml2YXRlIC0gbm9kZXMgdGhhdCByZXByZXNlbnQgdGhlIHRvcCBhbmQgYm9keSBvZiB0aGUgd2F0ZXJcclxuICAgIHRoaXMubGlxdWlkV2F0ZXJUb3BOb2RlID0gbmV3IFBhdGgoIG51bGwsIHtcclxuICAgICAgZmlsbDogdGhpcy5mbHVpZENvbG9yLmNvbG9yVXRpbHNCcmlnaHRlciggMC4yNSApLFxyXG4gICAgICBsaW5lV2lkdGg6IEZMVUlEX0xJTkVfV0lEVEgsXHJcbiAgICAgIHN0cm9rZTogdGhpcy5mbHVpZENvbG9yLmNvbG9yVXRpbHNEYXJrZXIoIDAuMiApXHJcbiAgICB9ICk7XHJcbiAgICB0aGlzLmxpcXVpZFdhdGVyQm9keU5vZGUgPSBuZXcgUGF0aCggbnVsbCwge1xyXG4gICAgICBmaWxsOiB0aGlzLmZsdWlkQ29sb3IsXHJcbiAgICAgIGxpbmVXaWR0aDogRkxVSURfTElORV9XSURUSCxcclxuICAgICAgc3Ryb2tlOiB0aGlzLmZsdWlkQ29sb3IuY29sb3JVdGlsc0RhcmtlciggMC4yIClcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZVxyXG4gICAgdGhpcy5zdGVhbUNhbnZhc05vZGUgPSBuZXcgQmVha2VyU3RlYW1DYW52YXNOb2RlKFxyXG4gICAgICB0aGlzLmJlYWtlck91dGxpbmVSZWN0LFxyXG4gICAgICB0aGlzLmZsdWlkUHJvcG9ydGlvblByb3BlcnR5LFxyXG4gICAgICB0aGlzLnRlbXBlcmF0dXJlUHJvcGVydHksXHJcbiAgICAgIHRoaXMuZmx1aWRCb2lsaW5nUG9pbnQsXHJcbiAgICAgIHRoaXMuc3RlYW1Db2xvciwge1xyXG4gICAgICAgIGNhbnZhc0JvdW5kczogbmV3IEJvdW5kczIoXHJcbiAgICAgICAgICAtRUZBQ0NvbnN0YW50cy5TQ1JFRU5fTEFZT1VUX0JPVU5EUy5tYXhYIC8gMixcclxuICAgICAgICAgIC1FRkFDQ29uc3RhbnRzLlNDUkVFTl9MQVlPVVRfQk9VTkRTLm1heFksXHJcbiAgICAgICAgICBFRkFDQ29uc3RhbnRzLlNDUkVFTl9MQVlPVVRfQk9VTkRTLm1heFggLyAyLFxyXG4gICAgICAgICAgRUZBQ0NvbnN0YW50cy5TQ1JFRU5fTEFZT1VUX0JPVU5EUy5tYXhZXHJcbiAgICAgICAgKVxyXG4gICAgICB9ICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCB0aGlzLmxpcXVpZFdhdGVyQm9keU5vZGUgKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIHRoaXMubGlxdWlkV2F0ZXJUb3BOb2RlICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCB0aGlzLnN0ZWFtQ2FudmFzTm9kZSApO1xyXG5cclxuICAgIC8vIHVwZGF0ZSB0aGUgYXBwZWFyYW5jZSBvZiB0aGUgd2F0ZXIgYXMgdGhlIGxldmVsIGNoYW5nZXNcclxuICAgIHRoaXMuZmx1aWRQcm9wb3J0aW9uUHJvcGVydHkubGluayggZmx1aWRQcm9wb3J0aW9uID0+IHtcclxuICAgICAgY29uc3QgZmx1aWRIZWlnaHQgPSBiZWFrZXJPdXRsaW5lUmVjdC5oZWlnaHQgKiBmbHVpZFByb3BvcnRpb247XHJcbiAgICAgIHRoaXMuZmx1aWRCb3VuZHMuc2V0TWluTWF4KFxyXG4gICAgICAgIGJlYWtlck91dGxpbmVSZWN0Lm1pblgsXHJcbiAgICAgICAgYmVha2VyT3V0bGluZVJlY3QubWF4WSAtIGZsdWlkSGVpZ2h0LFxyXG4gICAgICAgIGJlYWtlck91dGxpbmVSZWN0Lm1heFgsXHJcbiAgICAgICAgMFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnVwZGF0ZVdhdGVyQXBwZWFyYW5jZSgpO1xyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIHJlc2V0KCkge1xyXG4gICAgdGhpcy5zdGVhbUNhbnZhc05vZGUucmVzZXQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHRpbWUgc3RlcCBmdW5jdGlvbiBmb3IgdGhlIHdhdGVyXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGR0IC0gdGhlIGNoYW5nZSBpbiB0aW1lXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIHN0ZXAoIGR0ICkge1xyXG4gICAgdGhpcy5zdGVhbUNhbnZhc05vZGUuc3RlcCggZHQgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHVwZGF0ZSB0aGUgYXBwZWFyYW5jZSBvZiB0aGUgd2F0ZXJcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHVwZGF0ZVdhdGVyQXBwZWFyYW5jZSgpIHtcclxuICAgIGNvbnN0IGVsbGlwc2VXaWR0aCA9IHRoaXMuZmx1aWRCb3VuZHMud2lkdGg7XHJcbiAgICBjb25zdCBlbGxpcHNlSGVpZ2h0ID0gUEVSU1BFQ1RJVkVfUFJPUE9SVElPTiAqIGVsbGlwc2VXaWR0aDtcclxuICAgIGNvbnN0IGxpcXVpZFdhdGVyVG9wRWxsaXBzZSA9IFNoYXBlLmVsbGlwc2UoXHJcbiAgICAgIHRoaXMuZmx1aWRCb3VuZHMuY2VudGVyWCxcclxuICAgICAgdGhpcy5mbHVpZEJvdW5kcy5taW5ZLFxyXG4gICAgICBlbGxpcHNlV2lkdGggLyAyLFxyXG4gICAgICBlbGxpcHNlSGVpZ2h0IC8gMixcclxuICAgICAgMCxcclxuICAgICAgMCxcclxuICAgICAgTWF0aC5QSSAvIDIsXHJcbiAgICAgIGZhbHNlXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGhhbGZXaWR0aCA9IHRoaXMuZmx1aWRCb3VuZHMud2lkdGggLyAyO1xyXG4gICAgY29uc3QgaGFsZkhlaWdodCA9IGVsbGlwc2VIZWlnaHQgLyAyO1xyXG4gICAgY29uc3QgbGlxdWlkV2F0ZXJCb2R5U2hhcGUgPSBuZXcgU2hhcGUoKVxyXG4gICAgICAubW92ZVRvKCB0aGlzLmZsdWlkQm91bmRzLm1pblgsIHRoaXMuZmx1aWRCb3VuZHMubWluWSApIC8vIFRvcCBsZWZ0IG9mIHRoZSBiZWFrZXIgYm9keS5cclxuICAgICAgLmVsbGlwdGljYWxBcmMoIHRoaXMuZmx1aWRCb3VuZHMuY2VudGVyWCwgdGhpcy5mbHVpZEJvdW5kcy5taW5ZLCBoYWxmV2lkdGgsIGhhbGZIZWlnaHQsIDAsIE1hdGguUEksIDAsIGZhbHNlIClcclxuICAgICAgLmxpbmVUbyggdGhpcy5mbHVpZEJvdW5kcy5tYXhYLCB0aGlzLmZsdWlkQm91bmRzLm1heFkgKSAvLyBCb3R0b20gcmlnaHQgb2YgdGhlIGJlYWtlciBib2R5LlxyXG4gICAgICAuZWxsaXB0aWNhbEFyYyggdGhpcy5mbHVpZEJvdW5kcy5jZW50ZXJYLCB0aGlzLmZsdWlkQm91bmRzLm1heFksIGhhbGZXaWR0aCwgaGFsZkhlaWdodCwgMCwgMCwgTWF0aC5QSSwgZmFsc2UgKVxyXG4gICAgICAuY2xvc2UoKTtcclxuXHJcbiAgICB0aGlzLmxpcXVpZFdhdGVyQm9keU5vZGUuc2V0U2hhcGUoIGxpcXVpZFdhdGVyQm9keVNoYXBlICk7XHJcbiAgICB0aGlzLmxpcXVpZFdhdGVyVG9wTm9kZS5zZXRTaGFwZSggbGlxdWlkV2F0ZXJUb3BFbGxpcHNlICk7XHJcbiAgfVxyXG59XHJcblxyXG5lbmVyZ3lGb3Jtc0FuZENoYW5nZXMucmVnaXN0ZXIoICdQZXJzcGVjdGl2ZVdhdGVyTm9kZScsIFBlcnNwZWN0aXZlV2F0ZXJOb2RlICk7XHJcbmV4cG9ydCBkZWZhdWx0IFBlcnNwZWN0aXZlV2F0ZXJOb2RlOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsT0FBTyxNQUFNLCtCQUErQjtBQUNuRCxTQUFTQyxLQUFLLFFBQVEsZ0NBQWdDO0FBQ3RELFNBQVNDLElBQUksRUFBRUMsSUFBSSxRQUFRLG1DQUFtQztBQUM5RCxPQUFPQyxxQkFBcUIsTUFBTSxnQ0FBZ0M7QUFDbEUsT0FBT0MsYUFBYSxNQUFNLHFCQUFxQjtBQUMvQyxPQUFPQyxxQkFBcUIsTUFBTSw0QkFBNEI7O0FBRTlEO0FBQ0EsTUFBTUMsc0JBQXNCLEdBQUcsQ0FBQ0YsYUFBYSxDQUFDRyx3QkFBd0I7O0FBRXRFO0FBQ0EsTUFBTUMsZ0JBQWdCLEdBQUcsQ0FBQztBQUUxQixNQUFNQyxvQkFBb0IsU0FBU1IsSUFBSSxDQUFDO0VBRXRDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDRVMsV0FBV0EsQ0FBRUMsaUJBQWlCLEVBQUVDLHVCQUF1QixFQUFFQyxtQkFBbUIsRUFBRUMsaUJBQWlCLEVBQUVDLFVBQVUsRUFBRUMsVUFBVSxFQUFHO0lBQ3hILEtBQUssQ0FBQyxDQUFDOztJQUVQO0lBQ0EsSUFBSSxDQUFDTCxpQkFBaUIsR0FBR0EsaUJBQWlCO0lBQzFDLElBQUksQ0FBQ0MsdUJBQXVCLEdBQUdBLHVCQUF1QjtJQUN0RCxJQUFJLENBQUNDLG1CQUFtQixHQUFHQSxtQkFBbUI7SUFDOUMsSUFBSSxDQUFDQyxpQkFBaUIsR0FBR0EsaUJBQWlCO0lBQzFDLElBQUksQ0FBQ0MsVUFBVSxHQUFHQSxVQUFVO0lBQzVCLElBQUksQ0FBQ0MsVUFBVSxHQUFHQSxVQUFVOztJQUU1QjtJQUNBLElBQUksQ0FBQ0MsV0FBVyxHQUFHbEIsT0FBTyxDQUFDbUIsT0FBTyxDQUFDQyxJQUFJLENBQUMsQ0FBQzs7SUFFekM7SUFDQSxJQUFJLENBQUNDLGtCQUFrQixHQUFHLElBQUlsQixJQUFJLENBQUUsSUFBSSxFQUFFO01BQ3hDbUIsSUFBSSxFQUFFLElBQUksQ0FBQ04sVUFBVSxDQUFDTyxrQkFBa0IsQ0FBRSxJQUFLLENBQUM7TUFDaERDLFNBQVMsRUFBRWYsZ0JBQWdCO01BQzNCZ0IsTUFBTSxFQUFFLElBQUksQ0FBQ1QsVUFBVSxDQUFDVSxnQkFBZ0IsQ0FBRSxHQUFJO0lBQ2hELENBQUUsQ0FBQztJQUNILElBQUksQ0FBQ0MsbUJBQW1CLEdBQUcsSUFBSXhCLElBQUksQ0FBRSxJQUFJLEVBQUU7TUFDekNtQixJQUFJLEVBQUUsSUFBSSxDQUFDTixVQUFVO01BQ3JCUSxTQUFTLEVBQUVmLGdCQUFnQjtNQUMzQmdCLE1BQU0sRUFBRSxJQUFJLENBQUNULFVBQVUsQ0FBQ1UsZ0JBQWdCLENBQUUsR0FBSTtJQUNoRCxDQUFFLENBQUM7O0lBRUg7SUFDQSxJQUFJLENBQUNFLGVBQWUsR0FBRyxJQUFJdEIscUJBQXFCLENBQzlDLElBQUksQ0FBQ00saUJBQWlCLEVBQ3RCLElBQUksQ0FBQ0MsdUJBQXVCLEVBQzVCLElBQUksQ0FBQ0MsbUJBQW1CLEVBQ3hCLElBQUksQ0FBQ0MsaUJBQWlCLEVBQ3RCLElBQUksQ0FBQ0UsVUFBVSxFQUFFO01BQ2ZZLFlBQVksRUFBRSxJQUFJN0IsT0FBTyxDQUN2QixDQUFDSyxhQUFhLENBQUN5QixvQkFBb0IsQ0FBQ0MsSUFBSSxHQUFHLENBQUMsRUFDNUMsQ0FBQzFCLGFBQWEsQ0FBQ3lCLG9CQUFvQixDQUFDRSxJQUFJLEVBQ3hDM0IsYUFBYSxDQUFDeUIsb0JBQW9CLENBQUNDLElBQUksR0FBRyxDQUFDLEVBQzNDMUIsYUFBYSxDQUFDeUIsb0JBQW9CLENBQUNFLElBQ3JDO0lBQ0YsQ0FBRSxDQUFDO0lBQ0wsSUFBSSxDQUFDQyxRQUFRLENBQUUsSUFBSSxDQUFDTixtQkFBb0IsQ0FBQztJQUN6QyxJQUFJLENBQUNNLFFBQVEsQ0FBRSxJQUFJLENBQUNaLGtCQUFtQixDQUFDO0lBQ3hDLElBQUksQ0FBQ1ksUUFBUSxDQUFFLElBQUksQ0FBQ0wsZUFBZ0IsQ0FBQzs7SUFFckM7SUFDQSxJQUFJLENBQUNmLHVCQUF1QixDQUFDcUIsSUFBSSxDQUFFQyxlQUFlLElBQUk7TUFDcEQsTUFBTUMsV0FBVyxHQUFHeEIsaUJBQWlCLENBQUN5QixNQUFNLEdBQUdGLGVBQWU7TUFDOUQsSUFBSSxDQUFDakIsV0FBVyxDQUFDb0IsU0FBUyxDQUN4QjFCLGlCQUFpQixDQUFDMkIsSUFBSSxFQUN0QjNCLGlCQUFpQixDQUFDb0IsSUFBSSxHQUFHSSxXQUFXLEVBQ3BDeEIsaUJBQWlCLENBQUNtQixJQUFJLEVBQ3RCLENBQ0YsQ0FBQztNQUNELElBQUksQ0FBQ1MscUJBQXFCLENBQUMsQ0FBQztJQUM5QixDQUFFLENBQUM7RUFDTDs7RUFFQTtBQUNGO0FBQ0E7RUFDRUMsS0FBS0EsQ0FBQSxFQUFHO0lBQ04sSUFBSSxDQUFDYixlQUFlLENBQUNhLEtBQUssQ0FBQyxDQUFDO0VBQzlCOztFQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7RUFDRUMsSUFBSUEsQ0FBRUMsRUFBRSxFQUFHO0lBQ1QsSUFBSSxDQUFDZixlQUFlLENBQUNjLElBQUksQ0FBRUMsRUFBRyxDQUFDO0VBQ2pDOztFQUVBO0FBQ0Y7QUFDQTtBQUNBO0VBQ0VILHFCQUFxQkEsQ0FBQSxFQUFHO0lBQ3RCLE1BQU1JLFlBQVksR0FBRyxJQUFJLENBQUMxQixXQUFXLENBQUMyQixLQUFLO0lBQzNDLE1BQU1DLGFBQWEsR0FBR3ZDLHNCQUFzQixHQUFHcUMsWUFBWTtJQUMzRCxNQUFNRyxxQkFBcUIsR0FBRzlDLEtBQUssQ0FBQytDLE9BQU8sQ0FDekMsSUFBSSxDQUFDOUIsV0FBVyxDQUFDK0IsT0FBTyxFQUN4QixJQUFJLENBQUMvQixXQUFXLENBQUNnQyxJQUFJLEVBQ3JCTixZQUFZLEdBQUcsQ0FBQyxFQUNoQkUsYUFBYSxHQUFHLENBQUMsRUFDakIsQ0FBQyxFQUNELENBQUMsRUFDREssSUFBSSxDQUFDQyxFQUFFLEdBQUcsQ0FBQyxFQUNYLEtBQ0YsQ0FBQztJQUVELE1BQU1DLFNBQVMsR0FBRyxJQUFJLENBQUNuQyxXQUFXLENBQUMyQixLQUFLLEdBQUcsQ0FBQztJQUM1QyxNQUFNUyxVQUFVLEdBQUdSLGFBQWEsR0FBRyxDQUFDO0lBQ3BDLE1BQU1TLG9CQUFvQixHQUFHLElBQUl0RCxLQUFLLENBQUMsQ0FBQyxDQUNyQ3VELE1BQU0sQ0FBRSxJQUFJLENBQUN0QyxXQUFXLENBQUNxQixJQUFJLEVBQUUsSUFBSSxDQUFDckIsV0FBVyxDQUFDZ0MsSUFBSyxDQUFDLENBQUM7SUFBQSxDQUN2RE8sYUFBYSxDQUFFLElBQUksQ0FBQ3ZDLFdBQVcsQ0FBQytCLE9BQU8sRUFBRSxJQUFJLENBQUMvQixXQUFXLENBQUNnQyxJQUFJLEVBQUVHLFNBQVMsRUFBRUMsVUFBVSxFQUFFLENBQUMsRUFBRUgsSUFBSSxDQUFDQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQU0sQ0FBQyxDQUM3R00sTUFBTSxDQUFFLElBQUksQ0FBQ3hDLFdBQVcsQ0FBQ2EsSUFBSSxFQUFFLElBQUksQ0FBQ2IsV0FBVyxDQUFDYyxJQUFLLENBQUMsQ0FBQztJQUFBLENBQ3ZEeUIsYUFBYSxDQUFFLElBQUksQ0FBQ3ZDLFdBQVcsQ0FBQytCLE9BQU8sRUFBRSxJQUFJLENBQUMvQixXQUFXLENBQUNjLElBQUksRUFBRXFCLFNBQVMsRUFBRUMsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUVILElBQUksQ0FBQ0MsRUFBRSxFQUFFLEtBQU0sQ0FBQyxDQUM3R08sS0FBSyxDQUFDLENBQUM7SUFFVixJQUFJLENBQUNoQyxtQkFBbUIsQ0FBQ2lDLFFBQVEsQ0FBRUwsb0JBQXFCLENBQUM7SUFDekQsSUFBSSxDQUFDbEMsa0JBQWtCLENBQUN1QyxRQUFRLENBQUViLHFCQUFzQixDQUFDO0VBQzNEO0FBQ0Y7QUFFQTNDLHFCQUFxQixDQUFDeUQsUUFBUSxDQUFFLHNCQUFzQixFQUFFbkQsb0JBQXFCLENBQUM7QUFDOUUsZUFBZUEsb0JBQW9CIn0=