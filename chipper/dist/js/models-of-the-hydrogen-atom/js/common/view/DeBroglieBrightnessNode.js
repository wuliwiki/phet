// Copyright 2022, University of Colorado Boulder

/**
 * DeBroglieBrightnessNode represents the de Broglie model as a standing wave. A ring is drawn that corresponds
 * to the electron's orbit. The color brightness of the ring is a function of the amplitude of the standing wave.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Color, Node, Path } from '../../../../scenery/js/imports.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import OrbitsNode from './OrbitsNode.js';
import Utils from '../../../../dot/js/Utils.js';
import MOTHAColors from '../MOTHAColors.js';
import Multilink from '../../../../axon/js/Multilink.js';
import { Shape } from '../../../../kite/js/imports.js';
import MOTHAConstants from '../MOTHAConstants.js';

// Distance along the ring's circumference that each polygon occupies, in view coordinates. This value was
// tuned empirically, so that the ring looks acceptably smooth. Since larger values result in creation of
// more polygons (Path nodes), it's important to keep this value as small as possible.
const POLYGON_SIZE = 3;
export default class DeBroglieBrightnessNode extends Node {
  constructor(hydrogenAtom, modelViewTransform, providedOptions) {
    const options = optionize()({
      // visible when the view choice is 'brightness'
      visibleProperty: new DerivedProperty([hydrogenAtom.deBroglieViewProperty], deBroglieView => deBroglieView === 'brightness', {
        tandem: providedOptions.tandem.createTandem('visibleProperty'),
        phetioValueType: BooleanIO
      })
    }, providedOptions);

    // Electron orbits
    const orbitsNode = new OrbitsNode(hydrogenAtom, modelViewTransform, {
      tandem: options.tandem.createTandem('orbitsNode')
    });

    // Ring whose brightness represents the standing wave
    const ringNode = new RingNode(hydrogenAtom, modelViewTransform, {
      // Synchronize visibility with the parent Node, because RingNode is optimized to update only when visible.
      visibleProperty: options.visibleProperty,
      tandem: options.tandem.createTandem('ringNode')
    });
    options.children = [orbitsNode, ringNode];
    super(options);
  }
  dispose() {
    assert && assert(false, 'dispose is not supported, exists for the lifetime of the sim');
    super.dispose();
  }
}
/**
 * RingNode is the brightness ring that represents the standing wave.
 */
class RingNode extends Node {
  // in view coordinates
  // radial width of the ring, in view coordinates
  // an ordered pool of polygons, used to approximate the ring
  // range of colors used for the ring, based on electron amplitude
  constructor(hydrogenAtom, modelViewTransform, providedOptions) {
    super(providedOptions);
    this.hydrogenAtom = hydrogenAtom;
    this.modelViewTransform = modelViewTransform;
    this.hydrogenAtomPosition = modelViewTransform.modelToViewPosition(hydrogenAtom.position);
    this.ringThickness = modelViewTransform.modelToViewDeltaX(DeBroglieModel.BRIGHTNESS_RING_THICKNESS);

    // Pre-allocate the maximum number of polygon (Path) nodes. Based on the radius of the electron's current orbit,
    // some subset of these polygons will actually be added to the scene graph.
    const maxState = MOTHAConstants.GROUND_STATE + DeBroglieModel.getNumberOfStates() - 1;
    const maxRadius = modelViewTransform.modelToViewDeltaX(hydrogenAtom.getElectronOrbitRadius(maxState));
    const maxPolygons = calculateNumberOfPolygons(maxRadius);
    this.polygonNodes = [];
    for (let i = 0; i < maxPolygons; i++) {
      this.polygonNodes.push(new Path(null));
    }
    this.positiveAmplitudeColorProperty = MOTHAColors.electronBaseColorProperty;
    this.negativeAmplitudeColorProperty = MOTHAColors.deBroglieNegativeAmplitudeColorProperty;
    this.zeroAmplitudeColorProperty = new DerivedProperty([this.negativeAmplitudeColorProperty, this.positiveAmplitudeColorProperty], (negativeAmplitudeColor, positiveAmplitudeColor) => Color.interpolateRGBA(negativeAmplitudeColor, positiveAmplitudeColor, 0.5));
    Multilink.multilink([this.hydrogenAtom.getElectronStateProperty(), this.visibleProperty], (electronState, visible) => {
      if (visible) {
        this.updateGeometry();
        this.updateColor();
      }
    });
    this.hydrogenAtom.electronAngleProperty.link(electronAngle => {
      this.visible && this.updateColor();
    });
  }
  dispose() {
    assert && assert(false, 'dispose is not supported, exists for the lifetime of the sim');
    super.dispose();
  }

  /**
   * Updates the ring's geometry. Polygons (Paths) are reused, and new Shapes are computed.
   * This should be called only when the electron state changes, resulting in the electron moving
   * to a different orbit, and therefore requiring the ring to be revised to match that orbit.
   */
  updateGeometry() {
    assert && assert(this.visible, 'should only be called when visible');

    // Compute the number of polygons needed to represent this electron state.
    const electronState = this.hydrogenAtom.getElectronState();
    const modelRadius = this.hydrogenAtom.getElectronOrbitRadius(electronState);
    const viewRadius = this.modelViewTransform.modelToViewDeltaX(modelRadius);
    const numberOfPolygons = calculateNumberOfPolygons(viewRadius);
    assert && assert(numberOfPolygons <= this.polygonNodes.length);

    // Select polygons in order from the pool, and create their Shapes.
    const children = [];
    for (let i = 0; i < numberOfPolygons; i++) {
      const polygonNode = this.polygonNodes[i];
      polygonNode.shape = new RingPolygonShape(i, numberOfPolygons, viewRadius, this.ringThickness, this.hydrogenAtomPosition);
      children.push(polygonNode);
    }
    this.children = children;
  }

  /**
   * Updates the ring color. The color for each polygon (Path) in the ring is computed based on the amplitude at
   * that polygon's position. This should be called when the electron's state or angle changes.
   * NOTE: This assumes that updateGeometry and updateColor use the same ordering for this.polygonNodes.
   */
  updateColor() {
    assert && assert(this.visible, 'should only be called when visible');
    const electronState = this.hydrogenAtom.getElectronState();

    // the number of relevant polygons, NOT this.polygonNodes.length
    assert && assert(_.every(this.children, child => child instanceof Path));
    const numberOfPolygons = this.getChildrenCount();

    // Visit polygons in the same order as updateGeometry.
    for (let i = 0; i < numberOfPolygons; i++) {
      const angle = 2 * Math.PI * (i / numberOfPolygons);
      const amplitude = this.hydrogenAtom.getAmplitude(angle, electronState);
      this.polygonNodes[i].fill = this.amplitudeToColor(amplitude);
    }
  }

  /**
   * Maps the specified amplitude to a color.
   */
  amplitudeToColor(amplitude) {
    assert && assert(amplitude >= -1 && amplitude <= 1, `amplitude=${amplitude}`);
    if (amplitude === 0) {
      return this.zeroAmplitudeColorProperty.value;
    } else if (amplitude > 0) {
      return Color.interpolateRGBA(this.zeroAmplitudeColorProperty.value, this.positiveAmplitudeColorProperty.value, amplitude);
    } else {
      return Color.interpolateRGBA(this.zeroAmplitudeColorProperty.value, this.negativeAmplitudeColorProperty.value, -amplitude);
    }
  }
}

/**
 * RingPolygonShape is the Shape of one of the polygons used to approximate the ring.
 */
class RingPolygonShape extends Shape {
  // All quantities are in view coordinates.
  constructor(index, numberOfPolygons, radius, ringThickness, hydrogenAtomPosition) {
    super();
    const a1 = 2 * Math.PI * (index / numberOfPolygons);
    const a2 = a1 + 2 * Math.PI / numberOfPolygons + 0.001; // add a tiny bit of overlap, to hide seams
    const r1 = radius - ringThickness;
    const r2 = radius + ringThickness;
    const cos1 = Math.cos(a1);
    const sin1 = Math.sin(a1);
    const cos2 = Math.cos(a2);
    const sin2 = Math.sin(a2);

    // Points that define the polygon
    const xAtom = hydrogenAtomPosition.x;
    const yAtom = hydrogenAtomPosition.y;
    const x1 = r1 * cos1 + xAtom;
    const y1 = r1 * sin1 + yAtom;
    const x2 = r2 * cos1 + xAtom;
    const y2 = r2 * sin1 + yAtom;
    const x3 = r2 * cos2 + xAtom;
    const y3 = r2 * sin2 + yAtom;
    const x4 = r1 * cos2 + xAtom;
    const y4 = r1 * sin2 + yAtom;
    this.moveTo(x1, y1).lineTo(x2, y2).lineTo(x3, y3).lineTo(x4, y4).close();
  }
}

/**
 * Calculates the number of polygons required to approximate a ring with the specified radius.
 */
function calculateNumberOfPolygons(radius) {
  const circumference = Math.PI * (2 * radius);
  return Utils.toFixedNumber(circumference / POLYGON_SIZE, 0) + 1;
}
modelsOfTheHydrogenAtom.register('DeBroglieBrightnessNode', DeBroglieBrightnessNode);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEZXJpdmVkUHJvcGVydHkiLCJvcHRpb25pemUiLCJDb2xvciIsIk5vZGUiLCJQYXRoIiwiQm9vbGVhbklPIiwibW9kZWxzT2ZUaGVIeWRyb2dlbkF0b20iLCJEZUJyb2dsaWVNb2RlbCIsIk9yYml0c05vZGUiLCJVdGlscyIsIk1PVEhBQ29sb3JzIiwiTXVsdGlsaW5rIiwiU2hhcGUiLCJNT1RIQUNvbnN0YW50cyIsIlBPTFlHT05fU0laRSIsIkRlQnJvZ2xpZUJyaWdodG5lc3NOb2RlIiwiY29uc3RydWN0b3IiLCJoeWRyb2dlbkF0b20iLCJtb2RlbFZpZXdUcmFuc2Zvcm0iLCJwcm92aWRlZE9wdGlvbnMiLCJvcHRpb25zIiwidmlzaWJsZVByb3BlcnR5IiwiZGVCcm9nbGllVmlld1Byb3BlcnR5IiwiZGVCcm9nbGllVmlldyIsInRhbmRlbSIsImNyZWF0ZVRhbmRlbSIsInBoZXRpb1ZhbHVlVHlwZSIsIm9yYml0c05vZGUiLCJyaW5nTm9kZSIsIlJpbmdOb2RlIiwiY2hpbGRyZW4iLCJkaXNwb3NlIiwiYXNzZXJ0IiwiaHlkcm9nZW5BdG9tUG9zaXRpb24iLCJtb2RlbFRvVmlld1Bvc2l0aW9uIiwicG9zaXRpb24iLCJyaW5nVGhpY2tuZXNzIiwibW9kZWxUb1ZpZXdEZWx0YVgiLCJCUklHSFRORVNTX1JJTkdfVEhJQ0tORVNTIiwibWF4U3RhdGUiLCJHUk9VTkRfU1RBVEUiLCJnZXROdW1iZXJPZlN0YXRlcyIsIm1heFJhZGl1cyIsImdldEVsZWN0cm9uT3JiaXRSYWRpdXMiLCJtYXhQb2x5Z29ucyIsImNhbGN1bGF0ZU51bWJlck9mUG9seWdvbnMiLCJwb2x5Z29uTm9kZXMiLCJpIiwicHVzaCIsInBvc2l0aXZlQW1wbGl0dWRlQ29sb3JQcm9wZXJ0eSIsImVsZWN0cm9uQmFzZUNvbG9yUHJvcGVydHkiLCJuZWdhdGl2ZUFtcGxpdHVkZUNvbG9yUHJvcGVydHkiLCJkZUJyb2dsaWVOZWdhdGl2ZUFtcGxpdHVkZUNvbG9yUHJvcGVydHkiLCJ6ZXJvQW1wbGl0dWRlQ29sb3JQcm9wZXJ0eSIsIm5lZ2F0aXZlQW1wbGl0dWRlQ29sb3IiLCJwb3NpdGl2ZUFtcGxpdHVkZUNvbG9yIiwiaW50ZXJwb2xhdGVSR0JBIiwibXVsdGlsaW5rIiwiZ2V0RWxlY3Ryb25TdGF0ZVByb3BlcnR5IiwiZWxlY3Ryb25TdGF0ZSIsInZpc2libGUiLCJ1cGRhdGVHZW9tZXRyeSIsInVwZGF0ZUNvbG9yIiwiZWxlY3Ryb25BbmdsZVByb3BlcnR5IiwibGluayIsImVsZWN0cm9uQW5nbGUiLCJnZXRFbGVjdHJvblN0YXRlIiwibW9kZWxSYWRpdXMiLCJ2aWV3UmFkaXVzIiwibnVtYmVyT2ZQb2x5Z29ucyIsImxlbmd0aCIsInBvbHlnb25Ob2RlIiwic2hhcGUiLCJSaW5nUG9seWdvblNoYXBlIiwiXyIsImV2ZXJ5IiwiY2hpbGQiLCJnZXRDaGlsZHJlbkNvdW50IiwiYW5nbGUiLCJNYXRoIiwiUEkiLCJhbXBsaXR1ZGUiLCJnZXRBbXBsaXR1ZGUiLCJmaWxsIiwiYW1wbGl0dWRlVG9Db2xvciIsInZhbHVlIiwiaW5kZXgiLCJyYWRpdXMiLCJhMSIsImEyIiwicjEiLCJyMiIsImNvczEiLCJjb3MiLCJzaW4xIiwic2luIiwiY29zMiIsInNpbjIiLCJ4QXRvbSIsIngiLCJ5QXRvbSIsInkiLCJ4MSIsInkxIiwieDIiLCJ5MiIsIngzIiwieTMiLCJ4NCIsInk0IiwibW92ZVRvIiwibGluZVRvIiwiY2xvc2UiLCJjaXJjdW1mZXJlbmNlIiwidG9GaXhlZE51bWJlciIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiRGVCcm9nbGllQnJpZ2h0bmVzc05vZGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIERlQnJvZ2xpZUJyaWdodG5lc3NOb2RlIHJlcHJlc2VudHMgdGhlIGRlIEJyb2dsaWUgbW9kZWwgYXMgYSBzdGFuZGluZyB3YXZlLiBBIHJpbmcgaXMgZHJhd24gdGhhdCBjb3JyZXNwb25kc1xyXG4gKiB0byB0aGUgZWxlY3Ryb24ncyBvcmJpdC4gVGhlIGNvbG9yIGJyaWdodG5lc3Mgb2YgdGhlIHJpbmcgaXMgYSBmdW5jdGlvbiBvZiB0aGUgYW1wbGl0dWRlIG9mIHRoZSBzdGFuZGluZyB3YXZlLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKi9cclxuXHJcbmltcG9ydCBEZXJpdmVkUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9EZXJpdmVkUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgb3B0aW9uaXplLCB7IEVtcHR5U2VsZk9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvb3B0aW9uaXplLmpzJztcclxuaW1wb3J0IFBpY2tSZXF1aXJlZCBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvdHlwZXMvUGlja1JlcXVpcmVkLmpzJztcclxuaW1wb3J0IE1vZGVsVmlld1RyYW5zZm9ybTIgZnJvbSAnLi4vLi4vLi4vLi4vcGhldGNvbW1vbi9qcy92aWV3L01vZGVsVmlld1RyYW5zZm9ybTIuanMnO1xyXG5pbXBvcnQgeyBDb2xvciwgVENvbG9yLCBOb2RlLCBOb2RlT3B0aW9ucywgUGF0aCB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBCb29sZWFuSU8gZnJvbSAnLi4vLi4vLi4vLi4vdGFuZGVtL2pzL3R5cGVzL0Jvb2xlYW5JTy5qcyc7XHJcbmltcG9ydCBtb2RlbHNPZlRoZUh5ZHJvZ2VuQXRvbSBmcm9tICcuLi8uLi9tb2RlbHNPZlRoZUh5ZHJvZ2VuQXRvbS5qcyc7XHJcbmltcG9ydCBEZUJyb2dsaWVNb2RlbCBmcm9tICcuLi9tb2RlbC9EZUJyb2dsaWVNb2RlbC5qcyc7XHJcbmltcG9ydCBPcmJpdHNOb2RlIGZyb20gJy4vT3JiaXRzTm9kZS5qcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvVXRpbHMuanMnO1xyXG5pbXBvcnQgVFJlYWRPbmx5UHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9UUmVhZE9ubHlQcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBNT1RIQUNvbG9ycyBmcm9tICcuLi9NT1RIQUNvbG9ycy5qcyc7XHJcbmltcG9ydCBNdWx0aWxpbmsgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9NdWx0aWxpbmsuanMnO1xyXG5pbXBvcnQgeyBTaGFwZSB9IGZyb20gJy4uLy4uLy4uLy4uL2tpdGUvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBWZWN0b3IyIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9WZWN0b3IyLmpzJztcclxuaW1wb3J0IE1PVEhBQ29uc3RhbnRzIGZyb20gJy4uL01PVEhBQ29uc3RhbnRzLmpzJztcclxuXHJcbi8vIERpc3RhbmNlIGFsb25nIHRoZSByaW5nJ3MgY2lyY3VtZmVyZW5jZSB0aGF0IGVhY2ggcG9seWdvbiBvY2N1cGllcywgaW4gdmlldyBjb29yZGluYXRlcy4gVGhpcyB2YWx1ZSB3YXNcclxuLy8gdHVuZWQgZW1waXJpY2FsbHksIHNvIHRoYXQgdGhlIHJpbmcgbG9va3MgYWNjZXB0YWJseSBzbW9vdGguIFNpbmNlIGxhcmdlciB2YWx1ZXMgcmVzdWx0IGluIGNyZWF0aW9uIG9mXHJcbi8vIG1vcmUgcG9seWdvbnMgKFBhdGggbm9kZXMpLCBpdCdzIGltcG9ydGFudCB0byBrZWVwIHRoaXMgdmFsdWUgYXMgc21hbGwgYXMgcG9zc2libGUuXHJcbmNvbnN0IFBPTFlHT05fU0laRSA9IDM7XHJcblxyXG50eXBlIFNlbGZPcHRpb25zID0gRW1wdHlTZWxmT3B0aW9ucztcclxuXHJcbnR5cGUgRGVCcm9nbGllQnJpZ2h0bmVzc05vZGVPcHRpb25zID0gU2VsZk9wdGlvbnMgJiBQaWNrUmVxdWlyZWQ8Tm9kZU9wdGlvbnMsICd0YW5kZW0nPjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlQnJvZ2xpZUJyaWdodG5lc3NOb2RlIGV4dGVuZHMgTm9kZSB7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggaHlkcm9nZW5BdG9tOiBEZUJyb2dsaWVNb2RlbCxcclxuICAgICAgICAgICAgICAgICAgICAgIG1vZGVsVmlld1RyYW5zZm9ybTogTW9kZWxWaWV3VHJhbnNmb3JtMixcclxuICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVkT3B0aW9uczogRGVCcm9nbGllQnJpZ2h0bmVzc05vZGVPcHRpb25zICkge1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25pemU8RGVCcm9nbGllQnJpZ2h0bmVzc05vZGVPcHRpb25zLCBTZWxmT3B0aW9ucywgTm9kZU9wdGlvbnM+KCkoIHtcclxuXHJcbiAgICAgIC8vIHZpc2libGUgd2hlbiB0aGUgdmlldyBjaG9pY2UgaXMgJ2JyaWdodG5lc3MnXHJcbiAgICAgIHZpc2libGVQcm9wZXJ0eTogbmV3IERlcml2ZWRQcm9wZXJ0eSggWyBoeWRyb2dlbkF0b20uZGVCcm9nbGllVmlld1Byb3BlcnR5IF0sXHJcbiAgICAgICAgZGVCcm9nbGllVmlldyA9PiAoIGRlQnJvZ2xpZVZpZXcgPT09ICdicmlnaHRuZXNzJyApLCB7XHJcbiAgICAgICAgICB0YW5kZW06IHByb3ZpZGVkT3B0aW9ucy50YW5kZW0uY3JlYXRlVGFuZGVtKCAndmlzaWJsZVByb3BlcnR5JyApLFxyXG4gICAgICAgICAgcGhldGlvVmFsdWVUeXBlOiBCb29sZWFuSU9cclxuICAgICAgICB9IClcclxuICAgIH0sIHByb3ZpZGVkT3B0aW9ucyApO1xyXG5cclxuICAgIC8vIEVsZWN0cm9uIG9yYml0c1xyXG4gICAgY29uc3Qgb3JiaXRzTm9kZSA9IG5ldyBPcmJpdHNOb2RlKCBoeWRyb2dlbkF0b20sIG1vZGVsVmlld1RyYW5zZm9ybSwge1xyXG4gICAgICB0YW5kZW06IG9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ29yYml0c05vZGUnIClcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBSaW5nIHdob3NlIGJyaWdodG5lc3MgcmVwcmVzZW50cyB0aGUgc3RhbmRpbmcgd2F2ZVxyXG4gICAgY29uc3QgcmluZ05vZGUgPSBuZXcgUmluZ05vZGUoIGh5ZHJvZ2VuQXRvbSwgbW9kZWxWaWV3VHJhbnNmb3JtLCB7XHJcblxyXG4gICAgICAvLyBTeW5jaHJvbml6ZSB2aXNpYmlsaXR5IHdpdGggdGhlIHBhcmVudCBOb2RlLCBiZWNhdXNlIFJpbmdOb2RlIGlzIG9wdGltaXplZCB0byB1cGRhdGUgb25seSB3aGVuIHZpc2libGUuXHJcbiAgICAgIHZpc2libGVQcm9wZXJ0eTogb3B0aW9ucy52aXNpYmxlUHJvcGVydHksXHJcbiAgICAgIHRhbmRlbTogb3B0aW9ucy50YW5kZW0uY3JlYXRlVGFuZGVtKCAncmluZ05vZGUnIClcclxuICAgIH0gKTtcclxuXHJcbiAgICBvcHRpb25zLmNoaWxkcmVuID0gWyBvcmJpdHNOb2RlLCByaW5nTm9kZSBdO1xyXG5cclxuICAgIHN1cGVyKCBvcHRpb25zICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3ZlcnJpZGUgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIGZhbHNlLCAnZGlzcG9zZSBpcyBub3Qgc3VwcG9ydGVkLCBleGlzdHMgZm9yIHRoZSBsaWZldGltZSBvZiB0aGUgc2ltJyApO1xyXG4gICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxudHlwZSBSaW5nTm9kZVNlbGZPcHRpb25zID0gRW1wdHlTZWxmT3B0aW9ucztcclxudHlwZSBSaW5nTm9kZU9wdGlvbnMgPSBSaW5nTm9kZVNlbGZPcHRpb25zICYgUGlja1JlcXVpcmVkPE5vZGVPcHRpb25zLCAndmlzaWJsZVByb3BlcnR5JyB8ICd0YW5kZW0nPjtcclxuXHJcbi8qKlxyXG4gKiBSaW5nTm9kZSBpcyB0aGUgYnJpZ2h0bmVzcyByaW5nIHRoYXQgcmVwcmVzZW50cyB0aGUgc3RhbmRpbmcgd2F2ZS5cclxuICovXHJcbmNsYXNzIFJpbmdOb2RlIGV4dGVuZHMgTm9kZSB7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgaHlkcm9nZW5BdG9tOiBEZUJyb2dsaWVNb2RlbDtcclxuICBwcml2YXRlIHJlYWRvbmx5IG1vZGVsVmlld1RyYW5zZm9ybTogTW9kZWxWaWV3VHJhbnNmb3JtMjtcclxuICBwcml2YXRlIHJlYWRvbmx5IGh5ZHJvZ2VuQXRvbVBvc2l0aW9uOiBWZWN0b3IyOyAvLyBpbiB2aWV3IGNvb3JkaW5hdGVzXHJcbiAgcHJpdmF0ZSByZWFkb25seSByaW5nVGhpY2tuZXNzOiBudW1iZXI7IC8vIHJhZGlhbCB3aWR0aCBvZiB0aGUgcmluZywgaW4gdmlldyBjb29yZGluYXRlc1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgcG9seWdvbk5vZGVzOiBQYXRoW107IC8vIGFuIG9yZGVyZWQgcG9vbCBvZiBwb2x5Z29ucywgdXNlZCB0byBhcHByb3hpbWF0ZSB0aGUgcmluZ1xyXG5cclxuICAvLyByYW5nZSBvZiBjb2xvcnMgdXNlZCBmb3IgdGhlIHJpbmcsIGJhc2VkIG9uIGVsZWN0cm9uIGFtcGxpdHVkZVxyXG4gIHByaXZhdGUgcmVhZG9ubHkgcG9zaXRpdmVBbXBsaXR1ZGVDb2xvclByb3BlcnR5OiBUUmVhZE9ubHlQcm9wZXJ0eTxDb2xvcj47XHJcbiAgcHJpdmF0ZSByZWFkb25seSBuZWdhdGl2ZUFtcGxpdHVkZUNvbG9yUHJvcGVydHk6IFRSZWFkT25seVByb3BlcnR5PENvbG9yPjtcclxuICBwcml2YXRlIHJlYWRvbmx5IHplcm9BbXBsaXR1ZGVDb2xvclByb3BlcnR5OiBUUmVhZE9ubHlQcm9wZXJ0eTxDb2xvcj47XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggaHlkcm9nZW5BdG9tOiBEZUJyb2dsaWVNb2RlbCxcclxuICAgICAgICAgICAgICAgICAgICAgIG1vZGVsVmlld1RyYW5zZm9ybTogTW9kZWxWaWV3VHJhbnNmb3JtMixcclxuICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVkT3B0aW9uczogUmluZ05vZGVPcHRpb25zICkge1xyXG5cclxuICAgIHN1cGVyKCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICB0aGlzLmh5ZHJvZ2VuQXRvbSA9IGh5ZHJvZ2VuQXRvbTtcclxuICAgIHRoaXMubW9kZWxWaWV3VHJhbnNmb3JtID0gbW9kZWxWaWV3VHJhbnNmb3JtO1xyXG4gICAgdGhpcy5oeWRyb2dlbkF0b21Qb3NpdGlvbiA9IG1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld1Bvc2l0aW9uKCBoeWRyb2dlbkF0b20ucG9zaXRpb24gKTtcclxuICAgIHRoaXMucmluZ1RoaWNrbmVzcyA9IG1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld0RlbHRhWCggRGVCcm9nbGllTW9kZWwuQlJJR0hUTkVTU19SSU5HX1RISUNLTkVTUyApO1xyXG5cclxuICAgIC8vIFByZS1hbGxvY2F0ZSB0aGUgbWF4aW11bSBudW1iZXIgb2YgcG9seWdvbiAoUGF0aCkgbm9kZXMuIEJhc2VkIG9uIHRoZSByYWRpdXMgb2YgdGhlIGVsZWN0cm9uJ3MgY3VycmVudCBvcmJpdCxcclxuICAgIC8vIHNvbWUgc3Vic2V0IG9mIHRoZXNlIHBvbHlnb25zIHdpbGwgYWN0dWFsbHkgYmUgYWRkZWQgdG8gdGhlIHNjZW5lIGdyYXBoLlxyXG4gICAgY29uc3QgbWF4U3RhdGUgPSBNT1RIQUNvbnN0YW50cy5HUk9VTkRfU1RBVEUgKyBEZUJyb2dsaWVNb2RlbC5nZXROdW1iZXJPZlN0YXRlcygpIC0gMTtcclxuICAgIGNvbnN0IG1heFJhZGl1cyA9IG1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld0RlbHRhWCggaHlkcm9nZW5BdG9tLmdldEVsZWN0cm9uT3JiaXRSYWRpdXMoIG1heFN0YXRlICkgKTtcclxuICAgIGNvbnN0IG1heFBvbHlnb25zID0gY2FsY3VsYXRlTnVtYmVyT2ZQb2x5Z29ucyggbWF4UmFkaXVzICk7XHJcbiAgICB0aGlzLnBvbHlnb25Ob2RlcyA9IFtdO1xyXG4gICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbWF4UG9seWdvbnM7IGkrKyApIHtcclxuICAgICAgdGhpcy5wb2x5Z29uTm9kZXMucHVzaCggbmV3IFBhdGgoIG51bGwgKSApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucG9zaXRpdmVBbXBsaXR1ZGVDb2xvclByb3BlcnR5ID0gTU9USEFDb2xvcnMuZWxlY3Ryb25CYXNlQ29sb3JQcm9wZXJ0eTtcclxuICAgIHRoaXMubmVnYXRpdmVBbXBsaXR1ZGVDb2xvclByb3BlcnR5ID0gTU9USEFDb2xvcnMuZGVCcm9nbGllTmVnYXRpdmVBbXBsaXR1ZGVDb2xvclByb3BlcnR5O1xyXG4gICAgdGhpcy56ZXJvQW1wbGl0dWRlQ29sb3JQcm9wZXJ0eSA9IG5ldyBEZXJpdmVkUHJvcGVydHkoXHJcbiAgICAgIFsgdGhpcy5uZWdhdGl2ZUFtcGxpdHVkZUNvbG9yUHJvcGVydHksIHRoaXMucG9zaXRpdmVBbXBsaXR1ZGVDb2xvclByb3BlcnR5IF0sXHJcbiAgICAgICggbmVnYXRpdmVBbXBsaXR1ZGVDb2xvciwgcG9zaXRpdmVBbXBsaXR1ZGVDb2xvciApID0+XHJcbiAgICAgICAgQ29sb3IuaW50ZXJwb2xhdGVSR0JBKCBuZWdhdGl2ZUFtcGxpdHVkZUNvbG9yLCBwb3NpdGl2ZUFtcGxpdHVkZUNvbG9yLCAwLjUgKVxyXG4gICAgKTtcclxuXHJcbiAgICBNdWx0aWxpbmsubXVsdGlsaW5rKCBbIHRoaXMuaHlkcm9nZW5BdG9tLmdldEVsZWN0cm9uU3RhdGVQcm9wZXJ0eSgpLCB0aGlzLnZpc2libGVQcm9wZXJ0eSBdLFxyXG4gICAgICAoIGVsZWN0cm9uU3RhdGUsIHZpc2libGUgKSA9PiB7XHJcbiAgICAgICAgaWYgKCB2aXNpYmxlICkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVHZW9tZXRyeSgpO1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVDb2xvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSApO1xyXG5cclxuICAgIHRoaXMuaHlkcm9nZW5BdG9tLmVsZWN0cm9uQW5nbGVQcm9wZXJ0eS5saW5rKCBlbGVjdHJvbkFuZ2xlID0+IHtcclxuICAgICAgdGhpcy52aXNpYmxlICYmIHRoaXMudXBkYXRlQ29sb3IoKTtcclxuICAgIH0gKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvdmVycmlkZSBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggZmFsc2UsICdkaXNwb3NlIGlzIG5vdCBzdXBwb3J0ZWQsIGV4aXN0cyBmb3IgdGhlIGxpZmV0aW1lIG9mIHRoZSBzaW0nICk7XHJcbiAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSByaW5nJ3MgZ2VvbWV0cnkuIFBvbHlnb25zIChQYXRocykgYXJlIHJldXNlZCwgYW5kIG5ldyBTaGFwZXMgYXJlIGNvbXB1dGVkLlxyXG4gICAqIFRoaXMgc2hvdWxkIGJlIGNhbGxlZCBvbmx5IHdoZW4gdGhlIGVsZWN0cm9uIHN0YXRlIGNoYW5nZXMsIHJlc3VsdGluZyBpbiB0aGUgZWxlY3Ryb24gbW92aW5nXHJcbiAgICogdG8gYSBkaWZmZXJlbnQgb3JiaXQsIGFuZCB0aGVyZWZvcmUgcmVxdWlyaW5nIHRoZSByaW5nIHRvIGJlIHJldmlzZWQgdG8gbWF0Y2ggdGhhdCBvcmJpdC5cclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZUdlb21ldHJ5KCk6IHZvaWQge1xyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggdGhpcy52aXNpYmxlLCAnc2hvdWxkIG9ubHkgYmUgY2FsbGVkIHdoZW4gdmlzaWJsZScgKTtcclxuXHJcbiAgICAvLyBDb21wdXRlIHRoZSBudW1iZXIgb2YgcG9seWdvbnMgbmVlZGVkIHRvIHJlcHJlc2VudCB0aGlzIGVsZWN0cm9uIHN0YXRlLlxyXG4gICAgY29uc3QgZWxlY3Ryb25TdGF0ZSA9IHRoaXMuaHlkcm9nZW5BdG9tLmdldEVsZWN0cm9uU3RhdGUoKTtcclxuICAgIGNvbnN0IG1vZGVsUmFkaXVzID0gdGhpcy5oeWRyb2dlbkF0b20uZ2V0RWxlY3Ryb25PcmJpdFJhZGl1cyggZWxlY3Ryb25TdGF0ZSApO1xyXG4gICAgY29uc3Qgdmlld1JhZGl1cyA9IHRoaXMubW9kZWxWaWV3VHJhbnNmb3JtLm1vZGVsVG9WaWV3RGVsdGFYKCBtb2RlbFJhZGl1cyApO1xyXG4gICAgY29uc3QgbnVtYmVyT2ZQb2x5Z29ucyA9IGNhbGN1bGF0ZU51bWJlck9mUG9seWdvbnMoIHZpZXdSYWRpdXMgKTtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIG51bWJlck9mUG9seWdvbnMgPD0gdGhpcy5wb2x5Z29uTm9kZXMubGVuZ3RoICk7XHJcblxyXG4gICAgLy8gU2VsZWN0IHBvbHlnb25zIGluIG9yZGVyIGZyb20gdGhlIHBvb2wsIGFuZCBjcmVhdGUgdGhlaXIgU2hhcGVzLlxyXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXTtcclxuICAgIGZvciAoIGxldCBpID0gMDsgaSA8IG51bWJlck9mUG9seWdvbnM7IGkrKyApIHtcclxuICAgICAgY29uc3QgcG9seWdvbk5vZGUgPSB0aGlzLnBvbHlnb25Ob2Rlc1sgaSBdO1xyXG4gICAgICBwb2x5Z29uTm9kZS5zaGFwZSA9IG5ldyBSaW5nUG9seWdvblNoYXBlKCBpLCBudW1iZXJPZlBvbHlnb25zLCB2aWV3UmFkaXVzLCB0aGlzLnJpbmdUaGlja25lc3MsIHRoaXMuaHlkcm9nZW5BdG9tUG9zaXRpb24gKTtcclxuICAgICAgY2hpbGRyZW4ucHVzaCggcG9seWdvbk5vZGUgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSByaW5nIGNvbG9yLiBUaGUgY29sb3IgZm9yIGVhY2ggcG9seWdvbiAoUGF0aCkgaW4gdGhlIHJpbmcgaXMgY29tcHV0ZWQgYmFzZWQgb24gdGhlIGFtcGxpdHVkZSBhdFxyXG4gICAqIHRoYXQgcG9seWdvbidzIHBvc2l0aW9uLiBUaGlzIHNob3VsZCBiZSBjYWxsZWQgd2hlbiB0aGUgZWxlY3Ryb24ncyBzdGF0ZSBvciBhbmdsZSBjaGFuZ2VzLlxyXG4gICAqIE5PVEU6IFRoaXMgYXNzdW1lcyB0aGF0IHVwZGF0ZUdlb21ldHJ5IGFuZCB1cGRhdGVDb2xvciB1c2UgdGhlIHNhbWUgb3JkZXJpbmcgZm9yIHRoaXMucG9seWdvbk5vZGVzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlQ29sb3IoKTogdm9pZCB7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCB0aGlzLnZpc2libGUsICdzaG91bGQgb25seSBiZSBjYWxsZWQgd2hlbiB2aXNpYmxlJyApO1xyXG5cclxuICAgIGNvbnN0IGVsZWN0cm9uU3RhdGUgPSB0aGlzLmh5ZHJvZ2VuQXRvbS5nZXRFbGVjdHJvblN0YXRlKCk7XHJcblxyXG4gICAgLy8gdGhlIG51bWJlciBvZiByZWxldmFudCBwb2x5Z29ucywgTk9UIHRoaXMucG9seWdvbk5vZGVzLmxlbmd0aFxyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggXy5ldmVyeSggdGhpcy5jaGlsZHJlbiwgY2hpbGQgPT4gY2hpbGQgaW5zdGFuY2VvZiBQYXRoICkgKTtcclxuICAgIGNvbnN0IG51bWJlck9mUG9seWdvbnMgPSB0aGlzLmdldENoaWxkcmVuQ291bnQoKTtcclxuXHJcbiAgICAvLyBWaXNpdCBwb2x5Z29ucyBpbiB0aGUgc2FtZSBvcmRlciBhcyB1cGRhdGVHZW9tZXRyeS5cclxuICAgIGZvciAoIGxldCBpID0gMDsgaSA8IG51bWJlck9mUG9seWdvbnM7IGkrKyApIHtcclxuICAgICAgY29uc3QgYW5nbGUgPSAoIDIgKiBNYXRoLlBJICkgKiAoIGkgLyBudW1iZXJPZlBvbHlnb25zICk7XHJcbiAgICAgIGNvbnN0IGFtcGxpdHVkZSA9IHRoaXMuaHlkcm9nZW5BdG9tLmdldEFtcGxpdHVkZSggYW5nbGUsIGVsZWN0cm9uU3RhdGUgKTtcclxuICAgICAgdGhpcy5wb2x5Z29uTm9kZXNbIGkgXS5maWxsID0gdGhpcy5hbXBsaXR1ZGVUb0NvbG9yKCBhbXBsaXR1ZGUgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcHMgdGhlIHNwZWNpZmllZCBhbXBsaXR1ZGUgdG8gYSBjb2xvci5cclxuICAgKi9cclxuICBwcml2YXRlIGFtcGxpdHVkZVRvQ29sb3IoIGFtcGxpdHVkZTogbnVtYmVyICk6IFRDb2xvciB7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCBhbXBsaXR1ZGUgPj0gLTEgJiYgYW1wbGl0dWRlIDw9IDEsIGBhbXBsaXR1ZGU9JHthbXBsaXR1ZGV9YCApO1xyXG4gICAgaWYgKCBhbXBsaXR1ZGUgPT09IDAgKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnplcm9BbXBsaXR1ZGVDb2xvclByb3BlcnR5LnZhbHVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoIGFtcGxpdHVkZSA+IDAgKSB7XHJcbiAgICAgIHJldHVybiBDb2xvci5pbnRlcnBvbGF0ZVJHQkEoIHRoaXMuemVyb0FtcGxpdHVkZUNvbG9yUHJvcGVydHkudmFsdWUsIHRoaXMucG9zaXRpdmVBbXBsaXR1ZGVDb2xvclByb3BlcnR5LnZhbHVlLCBhbXBsaXR1ZGUgKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICByZXR1cm4gQ29sb3IuaW50ZXJwb2xhdGVSR0JBKCB0aGlzLnplcm9BbXBsaXR1ZGVDb2xvclByb3BlcnR5LnZhbHVlLCB0aGlzLm5lZ2F0aXZlQW1wbGl0dWRlQ29sb3JQcm9wZXJ0eS52YWx1ZSwgLWFtcGxpdHVkZSApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJpbmdQb2x5Z29uU2hhcGUgaXMgdGhlIFNoYXBlIG9mIG9uZSBvZiB0aGUgcG9seWdvbnMgdXNlZCB0byBhcHByb3hpbWF0ZSB0aGUgcmluZy5cclxuICovXHJcbmNsYXNzIFJpbmdQb2x5Z29uU2hhcGUgZXh0ZW5kcyBTaGFwZSB7XHJcblxyXG4gIC8vIEFsbCBxdWFudGl0aWVzIGFyZSBpbiB2aWV3IGNvb3JkaW5hdGVzLlxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggaW5kZXg6IG51bWJlciwgbnVtYmVyT2ZQb2x5Z29uczogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgcmluZ1RoaWNrbmVzczogbnVtYmVyLCBoeWRyb2dlbkF0b21Qb3NpdGlvbjogVmVjdG9yMiApIHtcclxuXHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIGNvbnN0IGExID0gKCAyICogTWF0aC5QSSApICogKCBpbmRleCAvIG51bWJlck9mUG9seWdvbnMgKTtcclxuICAgIGNvbnN0IGEyID0gYTEgKyAoIDIgKiBNYXRoLlBJIC8gbnVtYmVyT2ZQb2x5Z29ucyApICsgMC4wMDE7IC8vIGFkZCBhIHRpbnkgYml0IG9mIG92ZXJsYXAsIHRvIGhpZGUgc2VhbXNcclxuICAgIGNvbnN0IHIxID0gcmFkaXVzIC0gcmluZ1RoaWNrbmVzcztcclxuICAgIGNvbnN0IHIyID0gcmFkaXVzICsgcmluZ1RoaWNrbmVzcztcclxuICAgIGNvbnN0IGNvczEgPSBNYXRoLmNvcyggYTEgKTtcclxuICAgIGNvbnN0IHNpbjEgPSBNYXRoLnNpbiggYTEgKTtcclxuICAgIGNvbnN0IGNvczIgPSBNYXRoLmNvcyggYTIgKTtcclxuICAgIGNvbnN0IHNpbjIgPSBNYXRoLnNpbiggYTIgKTtcclxuXHJcbiAgICAvLyBQb2ludHMgdGhhdCBkZWZpbmUgdGhlIHBvbHlnb25cclxuICAgIGNvbnN0IHhBdG9tID0gaHlkcm9nZW5BdG9tUG9zaXRpb24ueDtcclxuICAgIGNvbnN0IHlBdG9tID0gaHlkcm9nZW5BdG9tUG9zaXRpb24ueTtcclxuICAgIGNvbnN0IHgxID0gcjEgKiBjb3MxICsgeEF0b207XHJcbiAgICBjb25zdCB5MSA9IHIxICogc2luMSArIHlBdG9tO1xyXG4gICAgY29uc3QgeDIgPSByMiAqIGNvczEgKyB4QXRvbTtcclxuICAgIGNvbnN0IHkyID0gcjIgKiBzaW4xICsgeUF0b207XHJcbiAgICBjb25zdCB4MyA9IHIyICogY29zMiArIHhBdG9tO1xyXG4gICAgY29uc3QgeTMgPSByMiAqIHNpbjIgKyB5QXRvbTtcclxuICAgIGNvbnN0IHg0ID0gcjEgKiBjb3MyICsgeEF0b207XHJcbiAgICBjb25zdCB5NCA9IHIxICogc2luMiArIHlBdG9tO1xyXG5cclxuICAgIHRoaXMubW92ZVRvKCB4MSwgeTEgKS5saW5lVG8oIHgyLCB5MiApLmxpbmVUbyggeDMsIHkzICkubGluZVRvKCB4NCwgeTQgKS5jbG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIG51bWJlciBvZiBwb2x5Z29ucyByZXF1aXJlZCB0byBhcHByb3hpbWF0ZSBhIHJpbmcgd2l0aCB0aGUgc3BlY2lmaWVkIHJhZGl1cy5cclxuICovXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZU51bWJlck9mUG9seWdvbnMoIHJhZGl1czogbnVtYmVyICk6IG51bWJlciB7XHJcbiAgY29uc3QgY2lyY3VtZmVyZW5jZSA9IE1hdGguUEkgKiAoIDIgKiByYWRpdXMgKTtcclxuICByZXR1cm4gVXRpbHMudG9GaXhlZE51bWJlciggY2lyY3VtZmVyZW5jZSAvIFBPTFlHT05fU0laRSwgMCApICsgMTtcclxufVxyXG5cclxubW9kZWxzT2ZUaGVIeWRyb2dlbkF0b20ucmVnaXN0ZXIoICdEZUJyb2dsaWVCcmlnaHRuZXNzTm9kZScsIERlQnJvZ2xpZUJyaWdodG5lc3NOb2RlICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsZUFBZSxNQUFNLHdDQUF3QztBQUNwRSxPQUFPQyxTQUFTLE1BQTRCLHVDQUF1QztBQUduRixTQUFTQyxLQUFLLEVBQVVDLElBQUksRUFBZUMsSUFBSSxRQUFRLG1DQUFtQztBQUMxRixPQUFPQyxTQUFTLE1BQU0sMENBQTBDO0FBQ2hFLE9BQU9DLHVCQUF1QixNQUFNLGtDQUFrQztBQUN0RSxPQUFPQyxjQUFjLE1BQU0sNEJBQTRCO0FBQ3ZELE9BQU9DLFVBQVUsTUFBTSxpQkFBaUI7QUFDeEMsT0FBT0MsS0FBSyxNQUFNLDZCQUE2QjtBQUUvQyxPQUFPQyxXQUFX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