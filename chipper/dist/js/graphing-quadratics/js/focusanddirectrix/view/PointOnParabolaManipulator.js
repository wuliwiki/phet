// Copyright 2018-2023, University of Colorado Boulder

/**
 * PointOnParabolaManipulator is the manipulator for editing a point on a parabola.
 * It displays the coordinates of the point.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { DragListener } from '../../../../scenery/js/imports.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import GQManipulator from '../../common/view/GQManipulator.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
// constants
const COORDINATES_X_SPACING = 1;
export default class PointOnParabolaManipulator extends GQManipulator {
  constructor(pointOnParabolaProperty, quadraticProperty, graph, modelViewTransform, coordinatesVisibleProperty, providedOptions) {
    const options = optionize()({
      // GQManipulatorOptions
      radius: modelViewTransform.modelToViewDeltaX(GQConstants.MANIPULATOR_RADIUS),
      color: GQColors.POINT_ON_PARABOLA,
      coordinatesForegroundColor: 'white',
      coordinatesBackgroundColor: GQColors.POINT_ON_PARABOLA,
      coordinatesDecimals: GQConstants.POINT_ON_PARABOLA_DECIMALS,
      phetioDocumentation: 'manipulator for a point on the parabola'
    }, providedOptions);

    // position coordinates based on which side of the parabola the point is on
    assert && assert(!options.layoutCoordinates, 'PointOnParabolaManipulator sets layoutCoordinates');
    options.layoutCoordinates = (coordinates, coordinatesNode, radius) => {
      assert && assert(coordinates, 'expected coordinates');
      const vertex = quadraticProperty.value.vertex;
      assert && assert(vertex, 'expected a parabola');
      const xOffset = radius + COORDINATES_X_SPACING;
      if (coordinates.x >= vertex.x) {
        coordinatesNode.left = xOffset;
      } else {
        coordinatesNode.right = -xOffset;
      }
      coordinatesNode.centerY = 0;
    };

    // Coordinates are identical to pointOnParabolaProperty. We're using a separate Property here
    // for PhET-iO instrumentation symmetry with other manipulators.
    const coordinatesProperty = new DerivedProperty([pointOnParabolaProperty], pointOnParabola => pointOnParabola, {
      valueType: Vector2,
      tandem: options.tandem.createTandem('coordinatesProperty'),
      phetioDocumentation: 'coordinates displayed on the point-on-quadratic manipulator',
      phetioValueType: Vector2.Vector2IO
    });
    super(coordinatesProperty, coordinatesVisibleProperty, options);

    // add drag handler
    this.addInputListener(new PointOnParabolaDragListener(this, pointOnParabolaProperty, quadraticProperty, modelViewTransform, graph, {
      tandem: options.tandem.createTandem('dragListener')
    }));

    // move the manipulator
    pointOnParabolaProperty.link(pointOnParabola => {
      this.translation = modelViewTransform.modelToViewPosition(pointOnParabola);
    });
  }
}
class PointOnParabolaDragListener extends DragListener {
  /**
   * @param targetNode - the Node that we attached this listener to
   * @param pointOnParabolaProperty - the point
   * @param quadraticProperty - the interactive quadratic
   * @param modelViewTransform
   * @param graph
   * @param [providedOptions]
   */
  constructor(targetNode, pointOnParabolaProperty, quadraticProperty, modelViewTransform, graph, providedOptions) {
    let startOffset; // where the drag started, relative to the manipulator

    const options = combineOptions({
      allowTouchSnag: true,
      // note where the drag started
      start: (event, listener) => {
        const position = modelViewTransform.modelToViewPosition(pointOnParabolaProperty.value);
        startOffset = targetNode.globalToParentPoint(event.pointer.point).minus(position);
      },
      drag: (event, listener) => {
        // transform the drag point from view to model coordinate frame
        const parentPoint = targetNode.globalToParentPoint(event.pointer.point).minus(startOffset);
        const point = modelViewTransform.viewToModelPosition(parentPoint);

        // get the closest point on the parabola
        const pointOnParabola = quadraticProperty.value.getClosestPoint(point);

        // constrain to the range of the graph. x & y may both be out of range.
        if (!graph.xRange.contains(pointOnParabola.x)) {
          // x is out of range, so constrain x, and solve for y
          pointOnParabola.setX(graph.xRange.constrainValue(pointOnParabola.x));
          pointOnParabola.setY(quadraticProperty.value.solveY(pointOnParabola.x));
        }
        if (!graph.yRange.contains(pointOnParabola.y)) {
          // y is out of range, so constrain y, solve for x, and choose the closer of the 2 solutions
          pointOnParabola.setY(graph.yRange.constrainValue(pointOnParabola.y));
          const xSolutions = quadraticProperty.value.solveX(pointOnParabola.y);
          assert && assert(xSolutions && xSolutions.length === 2, `expected 2 solutions for x: ${xSolutions}`);
          const xClosest = Math.abs(xSolutions[0] - pointOnParabola.x) < Math.abs(xSolutions[1] - pointOnParabola.x) ? xSolutions[0] : xSolutions[1];
          pointOnParabola.setX(xClosest);
        }

        // Snap to the x value as it will be displayed, by solving for y.
        // This is so we don't see different y values for the same x value.
        // See https://github.com/phetsims/graphing-quadratics/issues/172.
        const x = Utils.toFixedNumber(pointOnParabola.x, GQConstants.POINT_ON_PARABOLA_DECIMALS);
        const y = quadraticProperty.value.solveY(x);
        pointOnParabolaProperty.value = new Vector2(x, y);
      }
    }, providedOptions);
    super(options);
  }
}
graphingQuadratics.register('PointOnParabolaManipulator', PointOnParabolaManipulator);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEZXJpdmVkUHJvcGVydHkiLCJVdGlscyIsIlZlY3RvcjIiLCJEcmFnTGlzdGVuZXIiLCJHUUNvbG9ycyIsIkdRQ29uc3RhbnRzIiwiR1FNYW5pcHVsYXRvciIsImdyYXBoaW5nUXVhZHJhdGljcyIsIm9wdGlvbml6ZSIsImNvbWJpbmVPcHRpb25zIiwiQ09PUkRJTkFURVNfWF9TUEFDSU5HIiwiUG9pbnRPblBhcmFib2xhTWFuaXB1bGF0b3IiLCJjb25zdHJ1Y3RvciIsInBvaW50T25QYXJhYm9sYVByb3BlcnR5IiwicXVhZHJhdGljUHJvcGVydHkiLCJncmFwaCIsIm1vZGVsVmlld1RyYW5zZm9ybSIsImNvb3JkaW5hdGVzVmlzaWJsZVByb3BlcnR5IiwicHJvdmlkZWRPcHRpb25zIiwib3B0aW9ucyIsInJhZGl1cyIsIm1vZGVsVG9WaWV3RGVsdGFYIiwiTUFOSVBVTEFUT1JfUkFESVVTIiwiY29sb3IiLCJQT0lOVF9PTl9QQVJBQk9MQSIsImNvb3JkaW5hdGVzRm9yZWdyb3VuZENvbG9yIiwiY29vcmRpbmF0ZXNCYWNrZ3JvdW5kQ29sb3IiLCJjb29yZGluYXRlc0RlY2ltYWxzIiwiUE9JTlRfT05fUEFSQUJPTEFfREVDSU1BTFMiLCJwaGV0aW9Eb2N1bWVudGF0aW9uIiwiYXNzZXJ0IiwibGF5b3V0Q29vcmRpbmF0ZXMiLCJjb29yZGluYXRlcyIsImNvb3JkaW5hdGVzTm9kZSIsInZlcnRleCIsInZhbHVlIiwieE9mZnNldCIsIngiLCJsZWZ0IiwicmlnaHQiLCJjZW50ZXJZIiwiY29vcmRpbmF0ZXNQcm9wZXJ0eSIsInBvaW50T25QYXJhYm9sYSIsInZhbHVlVHlwZSIsInRhbmRlbSIsImNyZWF0ZVRhbmRlbSIsInBoZXRpb1ZhbHVlVHlwZSIsIlZlY3RvcjJJTyIsImFkZElucHV0TGlzdGVuZXIiLCJQb2ludE9uUGFyYWJvbGFEcmFnTGlzdGVuZXIiLCJsaW5rIiwidHJhbnNsYXRpb24iLCJtb2RlbFRvVmlld1Bvc2l0aW9uIiwidGFyZ2V0Tm9kZSIsInN0YXJ0T2Zmc2V0IiwiYWxsb3dUb3VjaFNuYWciLCJzdGFydCIsImV2ZW50IiwibGlzdGVuZXIiLCJwb3NpdGlvbiIsImdsb2JhbFRvUGFyZW50UG9pbnQiLCJwb2ludGVyIiwicG9pbnQiLCJtaW51cyIsImRyYWciLCJwYXJlbnRQb2ludCIsInZpZXdUb01vZGVsUG9zaXRpb24iLCJnZXRDbG9zZXN0UG9pbnQiLCJ4UmFuZ2UiLCJjb250YWlucyIsInNldFgiLCJjb25zdHJhaW5WYWx1ZSIsInNldFkiLCJzb2x2ZVkiLCJ5UmFuZ2UiLCJ5IiwieFNvbHV0aW9ucyIsInNvbHZlWCIsImxlbmd0aCIsInhDbG9zZXN0IiwiTWF0aCIsImFicyIsInRvRml4ZWROdW1iZXIiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlBvaW50T25QYXJhYm9sYU1hbmlwdWxhdG9yLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFBvaW50T25QYXJhYm9sYU1hbmlwdWxhdG9yIGlzIHRoZSBtYW5pcHVsYXRvciBmb3IgZWRpdGluZyBhIHBvaW50IG9uIGEgcGFyYWJvbGEuXHJcbiAqIEl0IGRpc3BsYXlzIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgcG9pbnQuXHJcbiAqXHJcbiAqIEBhdXRob3IgQ2hyaXMgTWFsbGV5IChQaXhlbFpvb20sIEluYy4pXHJcbiAqL1xyXG5cclxuaW1wb3J0IERlcml2ZWRQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL0Rlcml2ZWRQcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL1Byb3BlcnR5LmpzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9VdGlscy5qcyc7XHJcbmltcG9ydCBWZWN0b3IyIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9WZWN0b3IyLmpzJztcclxuaW1wb3J0IHsgRHJhZ0xpc3RlbmVyLCBEcmFnTGlzdGVuZXJPcHRpb25zLCBOb2RlLCBQcmVzc2VkRHJhZ0xpc3RlbmVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IEdRQ29sb3JzIGZyb20gJy4uLy4uL2NvbW1vbi9HUUNvbG9ycy5qcyc7XHJcbmltcG9ydCBHUUNvbnN0YW50cyBmcm9tICcuLi8uLi9jb21tb24vR1FDb25zdGFudHMuanMnO1xyXG5pbXBvcnQgR1FNYW5pcHVsYXRvciwgeyBHUU1hbmlwdWxhdG9yT3B0aW9ucyB9IGZyb20gJy4uLy4uL2NvbW1vbi92aWV3L0dRTWFuaXB1bGF0b3IuanMnO1xyXG5pbXBvcnQgZ3JhcGhpbmdRdWFkcmF0aWNzIGZyb20gJy4uLy4uL2dyYXBoaW5nUXVhZHJhdGljcy5qcyc7XHJcbmltcG9ydCBRdWFkcmF0aWMgZnJvbSAnLi4vLi4vY29tbW9uL21vZGVsL1F1YWRyYXRpYy5qcyc7XHJcbmltcG9ydCBNb2RlbFZpZXdUcmFuc2Zvcm0yIGZyb20gJy4uLy4uLy4uLy4uL3BoZXRjb21tb24vanMvdmlldy9Nb2RlbFZpZXdUcmFuc2Zvcm0yLmpzJztcclxuaW1wb3J0IEdyYXBoIGZyb20gJy4uLy4uLy4uLy4uL2dyYXBoaW5nLWxpbmVzL2pzL2NvbW1vbi9tb2RlbC9HcmFwaC5qcyc7XHJcbmltcG9ydCBvcHRpb25pemUsIHsgY29tYmluZU9wdGlvbnMsIEVtcHR5U2VsZk9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvb3B0aW9uaXplLmpzJztcclxuaW1wb3J0IFN0cmljdE9taXQgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL3R5cGVzL1N0cmljdE9taXQuanMnO1xyXG5pbXBvcnQgVFJlYWRPbmx5UHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9UUmVhZE9ubHlQcm9wZXJ0eS5qcyc7XHJcblxyXG4vLyBjb25zdGFudHNcclxuY29uc3QgQ09PUkRJTkFURVNfWF9TUEFDSU5HID0gMTtcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSBFbXB0eVNlbGZPcHRpb25zO1xyXG5cclxudHlwZSBQb2ludE9uUGFyYWJvbGFNYW5pcHVsYXRvck9wdGlvbnMgPSBTZWxmT3B0aW9ucyAmIFN0cmljdE9taXQ8R1FNYW5pcHVsYXRvck9wdGlvbnMsICdsYXlvdXRDb29yZGluYXRlcyc+O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnRPblBhcmFib2xhTWFuaXB1bGF0b3IgZXh0ZW5kcyBHUU1hbmlwdWxhdG9yIHtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBwb2ludE9uUGFyYWJvbGFQcm9wZXJ0eTogUHJvcGVydHk8VmVjdG9yMj4sXHJcbiAgICAgICAgICAgICAgICAgICAgICBxdWFkcmF0aWNQcm9wZXJ0eTogVFJlYWRPbmx5UHJvcGVydHk8UXVhZHJhdGljPixcclxuICAgICAgICAgICAgICAgICAgICAgIGdyYXBoOiBHcmFwaCxcclxuICAgICAgICAgICAgICAgICAgICAgIG1vZGVsVmlld1RyYW5zZm9ybTogTW9kZWxWaWV3VHJhbnNmb3JtMixcclxuICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzVmlzaWJsZVByb3BlcnR5OiBUUmVhZE9ubHlQcm9wZXJ0eTxib29sZWFuPixcclxuICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVkT3B0aW9uczogUG9pbnRPblBhcmFib2xhTWFuaXB1bGF0b3JPcHRpb25zICkge1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25pemU8UG9pbnRPblBhcmFib2xhTWFuaXB1bGF0b3JPcHRpb25zLCBTZWxmT3B0aW9ucywgR1FNYW5pcHVsYXRvck9wdGlvbnM+KCkoIHtcclxuXHJcbiAgICAgIC8vIEdRTWFuaXB1bGF0b3JPcHRpb25zXHJcbiAgICAgIHJhZGl1czogbW9kZWxWaWV3VHJhbnNmb3JtLm1vZGVsVG9WaWV3RGVsdGFYKCBHUUNvbnN0YW50cy5NQU5JUFVMQVRPUl9SQURJVVMgKSxcclxuICAgICAgY29sb3I6IEdRQ29sb3JzLlBPSU5UX09OX1BBUkFCT0xBLFxyXG4gICAgICBjb29yZGluYXRlc0ZvcmVncm91bmRDb2xvcjogJ3doaXRlJyxcclxuICAgICAgY29vcmRpbmF0ZXNCYWNrZ3JvdW5kQ29sb3I6IEdRQ29sb3JzLlBPSU5UX09OX1BBUkFCT0xBLFxyXG4gICAgICBjb29yZGluYXRlc0RlY2ltYWxzOiBHUUNvbnN0YW50cy5QT0lOVF9PTl9QQVJBQk9MQV9ERUNJTUFMUyxcclxuICAgICAgcGhldGlvRG9jdW1lbnRhdGlvbjogJ21hbmlwdWxhdG9yIGZvciBhIHBvaW50IG9uIHRoZSBwYXJhYm9sYSdcclxuICAgIH0sIHByb3ZpZGVkT3B0aW9ucyApO1xyXG5cclxuICAgIC8vIHBvc2l0aW9uIGNvb3JkaW5hdGVzIGJhc2VkIG9uIHdoaWNoIHNpZGUgb2YgdGhlIHBhcmFib2xhIHRoZSBwb2ludCBpcyBvblxyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggIW9wdGlvbnMubGF5b3V0Q29vcmRpbmF0ZXMsICdQb2ludE9uUGFyYWJvbGFNYW5pcHVsYXRvciBzZXRzIGxheW91dENvb3JkaW5hdGVzJyApO1xyXG4gICAgb3B0aW9ucy5sYXlvdXRDb29yZGluYXRlcyA9ICggY29vcmRpbmF0ZXMsIGNvb3JkaW5hdGVzTm9kZSwgcmFkaXVzICkgPT4ge1xyXG4gICAgICBhc3NlcnQgJiYgYXNzZXJ0KCBjb29yZGluYXRlcywgJ2V4cGVjdGVkIGNvb3JkaW5hdGVzJyApO1xyXG4gICAgICBjb25zdCB2ZXJ0ZXggPSBxdWFkcmF0aWNQcm9wZXJ0eS52YWx1ZS52ZXJ0ZXghO1xyXG4gICAgICBhc3NlcnQgJiYgYXNzZXJ0KCB2ZXJ0ZXgsICdleHBlY3RlZCBhIHBhcmFib2xhJyApO1xyXG4gICAgICBjb25zdCB4T2Zmc2V0ID0gcmFkaXVzICsgQ09PUkRJTkFURVNfWF9TUEFDSU5HO1xyXG4gICAgICBpZiAoIGNvb3JkaW5hdGVzIS54ID49IHZlcnRleC54ICkge1xyXG4gICAgICAgIGNvb3JkaW5hdGVzTm9kZS5sZWZ0ID0geE9mZnNldDtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBjb29yZGluYXRlc05vZGUucmlnaHQgPSAteE9mZnNldDtcclxuICAgICAgfVxyXG4gICAgICBjb29yZGluYXRlc05vZGUuY2VudGVyWSA9IDA7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENvb3JkaW5hdGVzIGFyZSBpZGVudGljYWwgdG8gcG9pbnRPblBhcmFib2xhUHJvcGVydHkuIFdlJ3JlIHVzaW5nIGEgc2VwYXJhdGUgUHJvcGVydHkgaGVyZVxyXG4gICAgLy8gZm9yIFBoRVQtaU8gaW5zdHJ1bWVudGF0aW9uIHN5bW1ldHJ5IHdpdGggb3RoZXIgbWFuaXB1bGF0b3JzLlxyXG4gICAgY29uc3QgY29vcmRpbmF0ZXNQcm9wZXJ0eSA9IG5ldyBEZXJpdmVkUHJvcGVydHkoIFsgcG9pbnRPblBhcmFib2xhUHJvcGVydHkgXSxcclxuICAgICAgcG9pbnRPblBhcmFib2xhID0+IHBvaW50T25QYXJhYm9sYSwge1xyXG4gICAgICAgIHZhbHVlVHlwZTogVmVjdG9yMixcclxuICAgICAgICB0YW5kZW06IG9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ2Nvb3JkaW5hdGVzUHJvcGVydHknICksXHJcbiAgICAgICAgcGhldGlvRG9jdW1lbnRhdGlvbjogJ2Nvb3JkaW5hdGVzIGRpc3BsYXllZCBvbiB0aGUgcG9pbnQtb24tcXVhZHJhdGljIG1hbmlwdWxhdG9yJyxcclxuICAgICAgICBwaGV0aW9WYWx1ZVR5cGU6IFZlY3RvcjIuVmVjdG9yMklPXHJcbiAgICAgIH0gKTtcclxuXHJcbiAgICBzdXBlciggY29vcmRpbmF0ZXNQcm9wZXJ0eSwgY29vcmRpbmF0ZXNWaXNpYmxlUHJvcGVydHksIG9wdGlvbnMgKTtcclxuXHJcbiAgICAvLyBhZGQgZHJhZyBoYW5kbGVyXHJcbiAgICB0aGlzLmFkZElucHV0TGlzdGVuZXIoIG5ldyBQb2ludE9uUGFyYWJvbGFEcmFnTGlzdGVuZXIoIHRoaXMsIHBvaW50T25QYXJhYm9sYVByb3BlcnR5LCBxdWFkcmF0aWNQcm9wZXJ0eSxcclxuICAgICAgbW9kZWxWaWV3VHJhbnNmb3JtLCBncmFwaCwge1xyXG4gICAgICAgIHRhbmRlbTogb3B0aW9ucy50YW5kZW0uY3JlYXRlVGFuZGVtKCAnZHJhZ0xpc3RlbmVyJyApXHJcbiAgICAgIH0gKSApO1xyXG5cclxuICAgIC8vIG1vdmUgdGhlIG1hbmlwdWxhdG9yXHJcbiAgICBwb2ludE9uUGFyYWJvbGFQcm9wZXJ0eS5saW5rKCBwb2ludE9uUGFyYWJvbGEgPT4ge1xyXG4gICAgICB0aGlzLnRyYW5zbGF0aW9uID0gbW9kZWxWaWV3VHJhbnNmb3JtLm1vZGVsVG9WaWV3UG9zaXRpb24oIHBvaW50T25QYXJhYm9sYSApO1xyXG4gICAgfSApO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgUG9pbnRPblBhcmFib2xhRHJhZ0xpc3RlbmVyIGV4dGVuZHMgRHJhZ0xpc3RlbmVyIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHRhcmdldE5vZGUgLSB0aGUgTm9kZSB0aGF0IHdlIGF0dGFjaGVkIHRoaXMgbGlzdGVuZXIgdG9cclxuICAgKiBAcGFyYW0gcG9pbnRPblBhcmFib2xhUHJvcGVydHkgLSB0aGUgcG9pbnRcclxuICAgKiBAcGFyYW0gcXVhZHJhdGljUHJvcGVydHkgLSB0aGUgaW50ZXJhY3RpdmUgcXVhZHJhdGljXHJcbiAgICogQHBhcmFtIG1vZGVsVmlld1RyYW5zZm9ybVxyXG4gICAqIEBwYXJhbSBncmFwaFxyXG4gICAqIEBwYXJhbSBbcHJvdmlkZWRPcHRpb25zXVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggdGFyZ2V0Tm9kZTogTm9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgIHBvaW50T25QYXJhYm9sYVByb3BlcnR5OiBQcm9wZXJ0eTxWZWN0b3IyPixcclxuICAgICAgICAgICAgICAgICAgICAgIHF1YWRyYXRpY1Byb3BlcnR5OiBUUmVhZE9ubHlQcm9wZXJ0eTxRdWFkcmF0aWM+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgbW9kZWxWaWV3VHJhbnNmb3JtOiBNb2RlbFZpZXdUcmFuc2Zvcm0yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZ3JhcGg6IEdyYXBoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZWRPcHRpb25zOiBEcmFnTGlzdGVuZXJPcHRpb25zPFByZXNzZWREcmFnTGlzdGVuZXI+ICkge1xyXG5cclxuICAgIGxldCBzdGFydE9mZnNldDogVmVjdG9yMjsgLy8gd2hlcmUgdGhlIGRyYWcgc3RhcnRlZCwgcmVsYXRpdmUgdG8gdGhlIG1hbmlwdWxhdG9yXHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IGNvbWJpbmVPcHRpb25zPERyYWdMaXN0ZW5lck9wdGlvbnM8UHJlc3NlZERyYWdMaXN0ZW5lcj4+KCB7XHJcblxyXG4gICAgICBhbGxvd1RvdWNoU25hZzogdHJ1ZSxcclxuXHJcbiAgICAgIC8vIG5vdGUgd2hlcmUgdGhlIGRyYWcgc3RhcnRlZFxyXG4gICAgICBzdGFydDogKCBldmVudCwgbGlzdGVuZXIgKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBtb2RlbFZpZXdUcmFuc2Zvcm0ubW9kZWxUb1ZpZXdQb3NpdGlvbiggcG9pbnRPblBhcmFib2xhUHJvcGVydHkudmFsdWUgKTtcclxuICAgICAgICBzdGFydE9mZnNldCA9IHRhcmdldE5vZGUuZ2xvYmFsVG9QYXJlbnRQb2ludCggZXZlbnQucG9pbnRlci5wb2ludCApLm1pbnVzKCBwb3NpdGlvbiApO1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgZHJhZzogKCBldmVudCwgbGlzdGVuZXIgKSA9PiB7XHJcblxyXG4gICAgICAgIC8vIHRyYW5zZm9ybSB0aGUgZHJhZyBwb2ludCBmcm9tIHZpZXcgdG8gbW9kZWwgY29vcmRpbmF0ZSBmcmFtZVxyXG4gICAgICAgIGNvbnN0IHBhcmVudFBvaW50ID0gdGFyZ2V0Tm9kZS5nbG9iYWxUb1BhcmVudFBvaW50KCBldmVudC5wb2ludGVyLnBvaW50ICkubWludXMoIHN0YXJ0T2Zmc2V0ICk7XHJcbiAgICAgICAgY29uc3QgcG9pbnQgPSBtb2RlbFZpZXdUcmFuc2Zvcm0udmlld1RvTW9kZWxQb3NpdGlvbiggcGFyZW50UG9pbnQgKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjbG9zZXN0IHBvaW50IG9uIHRoZSBwYXJhYm9sYVxyXG4gICAgICAgIGNvbnN0IHBvaW50T25QYXJhYm9sYSA9IHF1YWRyYXRpY1Byb3BlcnR5LnZhbHVlLmdldENsb3Nlc3RQb2ludCggcG9pbnQgKTtcclxuXHJcbiAgICAgICAgLy8gY29uc3RyYWluIHRvIHRoZSByYW5nZSBvZiB0aGUgZ3JhcGguIHggJiB5IG1heSBib3RoIGJlIG91dCBvZiByYW5nZS5cclxuICAgICAgICBpZiAoICFncmFwaC54UmFuZ2UuY29udGFpbnMoIHBvaW50T25QYXJhYm9sYS54ICkgKSB7XHJcblxyXG4gICAgICAgICAgLy8geCBpcyBvdXQgb2YgcmFuZ2UsIHNvIGNvbnN0cmFpbiB4LCBhbmQgc29sdmUgZm9yIHlcclxuICAgICAgICAgIHBvaW50T25QYXJhYm9sYS5zZXRYKCBncmFwaC54UmFuZ2UuY29uc3RyYWluVmFsdWUoIHBvaW50T25QYXJhYm9sYS54ICkgKTtcclxuICAgICAgICAgIHBvaW50T25QYXJhYm9sYS5zZXRZKCBxdWFkcmF0aWNQcm9wZXJ0eS52YWx1ZS5zb2x2ZVkoIHBvaW50T25QYXJhYm9sYS54ICkgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggIWdyYXBoLnlSYW5nZS5jb250YWlucyggcG9pbnRPblBhcmFib2xhLnkgKSApIHtcclxuXHJcbiAgICAgICAgICAvLyB5IGlzIG91dCBvZiByYW5nZSwgc28gY29uc3RyYWluIHksIHNvbHZlIGZvciB4LCBhbmQgY2hvb3NlIHRoZSBjbG9zZXIgb2YgdGhlIDIgc29sdXRpb25zXHJcbiAgICAgICAgICBwb2ludE9uUGFyYWJvbGEuc2V0WSggZ3JhcGgueVJhbmdlLmNvbnN0cmFpblZhbHVlKCBwb2ludE9uUGFyYWJvbGEueSApICk7XHJcbiAgICAgICAgICBjb25zdCB4U29sdXRpb25zID0gcXVhZHJhdGljUHJvcGVydHkudmFsdWUuc29sdmVYKCBwb2ludE9uUGFyYWJvbGEueSApITtcclxuICAgICAgICAgIGFzc2VydCAmJiBhc3NlcnQoIHhTb2x1dGlvbnMgJiYgeFNvbHV0aW9ucy5sZW5ndGggPT09IDIsIGBleHBlY3RlZCAyIHNvbHV0aW9ucyBmb3IgeDogJHt4U29sdXRpb25zfWAgKTtcclxuICAgICAgICAgIGNvbnN0IHhDbG9zZXN0ID0gKCBNYXRoLmFicyggeFNvbHV0aW9uc1sgMCBdIC0gcG9pbnRPblBhcmFib2xhLnggKSA8IE1hdGguYWJzKCB4U29sdXRpb25zWyAxIF0gLSBwb2ludE9uUGFyYWJvbGEueCApIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB4U29sdXRpb25zWyAwIF0gOiB4U29sdXRpb25zWyAxIF07XHJcbiAgICAgICAgICBwb2ludE9uUGFyYWJvbGEuc2V0WCggeENsb3Nlc3QgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNuYXAgdG8gdGhlIHggdmFsdWUgYXMgaXQgd2lsbCBiZSBkaXNwbGF5ZWQsIGJ5IHNvbHZpbmcgZm9yIHkuXHJcbiAgICAgICAgLy8gVGhpcyBpcyBzbyB3ZSBkb24ndCBzZWUgZGlmZmVyZW50IHkgdmFsdWVzIGZvciB0aGUgc2FtZSB4IHZhbHVlLlxyXG4gICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vcGhldHNpbXMvZ3JhcGhpbmctcXVhZHJhdGljcy9pc3N1ZXMvMTcyLlxyXG4gICAgICAgIGNvbnN0IHggPSBVdGlscy50b0ZpeGVkTnVtYmVyKCBwb2ludE9uUGFyYWJvbGEueCwgR1FDb25zdGFudHMuUE9JTlRfT05fUEFSQUJPTEFfREVDSU1BTFMgKTtcclxuICAgICAgICBjb25zdCB5ID0gcXVhZHJhdGljUHJvcGVydHkudmFsdWUuc29sdmVZKCB4ICk7XHJcblxyXG4gICAgICAgIHBvaW50T25QYXJhYm9sYVByb3BlcnR5LnZhbHVlID0gbmV3IFZlY3RvcjIoIHgsIHkgKTtcclxuICAgICAgfVxyXG4gICAgfSwgcHJvdmlkZWRPcHRpb25zICk7XHJcblxyXG4gICAgc3VwZXIoIG9wdGlvbnMgKTtcclxuICB9XHJcbn1cclxuXHJcbmdyYXBoaW5nUXVhZHJhdGljcy5yZWdpc3RlciggJ1BvaW50T25QYXJhYm9sYU1hbmlwdWxhdG9yJywgUG9pbnRPblBhcmFib2xhTWFuaXB1bGF0b3IgKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxlQUFlLE1BQU0sd0NBQXdDO0FBRXBFLE9BQU9DLEtBQUssTUFBTSw2QkFBNkI7QUFDL0MsT0FBT0MsT0FBTyxNQUFNLCtCQUErQjtBQUNuRCxTQUFTQyxZQUFZLFFBQXdELG1DQUFtQztBQUNoSCxPQUFPQyxRQUFRLE1BQU0sMEJBQTBCO0FBQy9DLE9BQU9DLFdBQVcsTUFBTSw2QkFBNkI7QUFDckQsT0FBT0MsYUFBYSxNQUFnQyxvQ0FBb0M7QUFDeEYsT0FBT0Msa0JBQWtCLE1BQU0sNkJBQTZCO0FBSTVELE9BQU9DLFNBQVMsSUFBSUMsY0FBYyxRQUEwQix1Q0FBdUM7QUFJbkc7QUFDQSxNQUFNQyxxQkFBcUIsR0FBRyxDQUFDO0FBTS9CLGVBQWUsTUFBTUMsMEJBQTBCLFNBQVNMLGFBQWEsQ0FBQztFQUU3RE0sV0FBV0EsQ0FBRUMsdUJBQTBDLEVBQzFDQyxpQkFBK0MsRUFDL0NDLEtBQVksRUFDWkMsa0JBQXVDLEVBQ3ZDQywwQkFBc0QsRUFDdERDLGVBQWtELEVBQUc7SUFFdkUsTUFBTUMsT0FBTyxHQUFHWCxTQUFTLENBQXVFLENBQUMsQ0FBRTtNQUVqRztNQUNBWSxNQUFNLEVBQUVKLGtCQUFrQixDQUFDSyxpQkFBaUIsQ0FBRWhCLFdBQVcsQ0FBQ2lCLGtCQUFtQixDQUFDO01BQzlFQyxLQUFLLEVBQUVu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