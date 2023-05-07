// Copyright 2021-2022, University of Colorado Boulder

/**
 * SecondPointNode is the view of the second point-of-interest on a framed object.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2Property from '../../../../dot/js/Vector2Property.js';
import { Shape } from '../../../../kite/js/imports.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import { Circle, DragListener, FocusHighlightFromNode, InteractiveHighlighting, KeyboardDragListener, Node, VBox } from '../../../../scenery/js/imports.js';
import geometricOptics from '../../geometricOptics.js';
import GOColors from '../GOColors.js';
import GOConstants from '../GOConstants.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import CueingArrowsNode from './CueingArrowsNode.js';
export default class SecondPointNode extends InteractiveHighlighting(Node) {
  /**
   * @param secondPoint - model element
   * @param modelViewTransform
   * @param wasDraggedProperty - was the second point dragged?
   * @param providedOptions
   */
  constructor(secondPoint, modelViewTransform, wasDraggedProperty, providedOptions) {
    const options = optionize()({
      // NodeOptions
      cursor: 'ns-resize',
      // second point can only be dragged vertically
      tagName: 'div',
      focusable: true,
      phetioInputEnabledPropertyInstrumented: true
    }, providedOptions);
    super(options);
    const pointNode = new PointNode();
    this.addChild(pointNode);
    this.setFocusHighlight(new FocusHighlightFromNode(pointNode));

    // Cueing arrows
    const cueingArrowsNode = new SecondPointCueingArrowsNode(pointNode.width + 10, {
      center: pointNode.center,
      visibleProperty: CueingArrowsNode.createVisibleProperty(this.inputEnabledProperty, wasDraggedProperty)
    });
    this.addChild(cueingArrowsNode);
    this.touchArea = Shape.circle(0, 0, 2 * pointNode.width + 10);
    secondPoint.positionProperty.link(position => {
      this.center = modelViewTransform.modelToViewPosition(position);
    });

    // The position of the second point cannot be set directly, because it is derived based on the vertical
    // offset from the framed object's position.  So create an adapter Property for use with DragListener.
    const positionProperty = new Vector2Property(secondPoint.positionProperty.value);
    positionProperty.link(position => secondPoint.setSecondPoint(position));

    // Drag action that is common to DragListener and KeyboardDragListener
    const drag = () => {
      wasDraggedProperty.value = true;
    };
    const dragListener = new DragListener({
      positionProperty: positionProperty,
      transform: modelViewTransform,
      drag: drag,
      tandem: options.tandem.createTandem('dragListener')
    });
    this.addInputListener(dragListener);
    const keyboardDragListener = new KeyboardDragListener(combineOptions({}, GOConstants.KEYBOARD_DRAG_LISTENER_OPTIONS, {
      positionProperty: positionProperty,
      transform: modelViewTransform,
      drag: drag,
      tandem: options.tandem.createTandem('keyboardDragListener')
    }));
    this.addInputListener(keyboardDragListener);
    this.addLinkedElement(secondPoint, {
      tandem: options.tandem.createTandem(secondPoint.tandem.name)
    });
  }

  /**
   * Creates an icon to represent the second point.
   */
  static createIcon() {
    return new PointNode();
  }
  dispose() {
    assert && assert(false, 'dispose is not supported, exists for the lifetime of the sim');
    super.dispose();
  }
}

// Circle that denotes the second point
class PointNode extends Circle {
  constructor() {
    super(7, {
      fill: GOColors.secondPointFillProperty,
      stroke: GOColors.secondPointStrokeProperty
    });
  }
}

// Cueing arrow constants
const ARROW_LENGTH = 20;
const ARROW_NODE_OPTIONS = {
  fill: GOColors.secondPointFillProperty,
  headWidth: 12,
  headHeight: 8,
  tailWidth: 3
};

/**
 * SecondPointNode has its own cueing arrows that are very different from the CueingArrowNode used for other UI elements.
 * These arrows point up and down, and are separated by a gap where the second point will appear.
 */
class SecondPointCueingArrowsNode extends VBox {
  constructor(spacing, providedOptions) {
    super(optionize()({
      spacing: spacing,
      align: 'center',
      children: [new ArrowNode(0, 0, 0, -ARROW_LENGTH, ARROW_NODE_OPTIONS),
      // up arrow
      new ArrowNode(0, 0, 0, +ARROW_LENGTH, ARROW_NODE_OPTIONS) // down arrow
      ]
    }, providedOptions));
  }
}
geometricOptics.register('SecondPointNode', SecondPointNode);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWZWN0b3IyUHJvcGVydHkiLCJTaGFwZSIsIkFycm93Tm9kZSIsIkNpcmNsZSIsIkRyYWdMaXN0ZW5lciIsIkZvY3VzSGlnaGxpZ2h0RnJvbU5vZGUiLCJJbnRlcmFjdGl2ZUhpZ2hsaWdodGluZyIsIktleWJvYXJkRHJhZ0xpc3RlbmVyIiwiTm9kZSIsIlZCb3giLCJnZW9tZXRyaWNPcHRpY3MiLCJHT0NvbG9ycyIsIkdPQ29uc3RhbnRzIiwib3B0aW9uaXplIiwiY29tYmluZU9wdGlvbnMiLCJDdWVpbmdBcnJvd3NOb2RlIiwiU2Vjb25kUG9pbnROb2RlIiwiY29uc3RydWN0b3IiLCJzZWNvbmRQb2ludCIsIm1vZGVsVmlld1RyYW5zZm9ybSIsIndhc0RyYWdnZWRQcm9wZXJ0eSIsInByb3ZpZGVkT3B0aW9ucyIsIm9wdGlvbnMiLCJjdXJzb3IiLCJ0YWdOYW1lIiwiZm9jdXNhYmxlIiwicGhldGlvSW5wdXRFbmFibGVkUHJvcGVydHlJbnN0cnVtZW50ZWQiLCJwb2ludE5vZGUiLCJQb2ludE5vZGUiLCJhZGRDaGlsZCIsInNldEZvY3VzSGlnaGxpZ2h0IiwiY3VlaW5nQXJyb3dzTm9kZSIsIlNlY29uZFBvaW50Q3VlaW5nQXJyb3dzTm9kZSIsIndpZHRoIiwiY2VudGVyIiwidmlzaWJsZVByb3BlcnR5IiwiY3JlYXRlVmlzaWJsZVByb3BlcnR5IiwiaW5wdXRFbmFibGVkUHJvcGVydHkiLCJ0b3VjaEFyZWEiLCJjaXJjbGUiLCJwb3NpdGlvblByb3BlcnR5IiwibGluayIsInBvc2l0aW9uIiwibW9kZWxUb1ZpZXdQb3NpdGlvbiIsInZhbHVlIiwic2V0U2Vjb25kUG9pbnQiLCJkcmFnIiwiZHJhZ0xpc3RlbmVyIiwidHJhbnNmb3JtIiwidGFuZGVtIiwiY3JlYXRlVGFuZGVtIiwiYWRkSW5wdXRMaXN0ZW5lciIsImtleWJvYXJkRHJhZ0xpc3RlbmVyIiwiS0VZQk9BUkRfRFJBR19MSVNURU5FUl9PUFRJT05TIiwiYWRkTGlua2VkRWxlbWVudCIsIm5hbWUiLCJjcmVhdGVJY29uIiwiZGlzcG9zZSIsImFzc2VydCIsImZpbGwiLCJzZWNvbmRQb2ludEZpbGxQcm9wZXJ0eSIsInN0cm9rZSIsInNlY29uZFBvaW50U3Ryb2tlUHJvcGVydHkiLCJBUlJPV19MRU5HVEgiLCJBUlJPV19OT0RFX09QVElPTlMiLCJoZWFkV2lkdGgiLCJoZWFkSGVpZ2h0IiwidGFpbFdpZHRoIiwic3BhY2luZyIsImFsaWduIiwiY2hpbGRyZW4iLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlNlY29uZFBvaW50Tm9kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBTZWNvbmRQb2ludE5vZGUgaXMgdGhlIHZpZXcgb2YgdGhlIHNlY29uZCBwb2ludC1vZi1pbnRlcmVzdCBvbiBhIGZyYW1lZCBvYmplY3QuXHJcbiAqXHJcbiAqIEBhdXRob3IgTWFydGluIFZlaWxsZXR0ZVxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKi9cclxuXHJcbmltcG9ydCBWZWN0b3IyUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1ZlY3RvcjJQcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCB7IFNoYXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4va2l0ZS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IE1vZGVsVmlld1RyYW5zZm9ybTIgZnJvbSAnLi4vLi4vLi4vLi4vcGhldGNvbW1vbi9qcy92aWV3L01vZGVsVmlld1RyYW5zZm9ybTIuanMnO1xyXG5pbXBvcnQgQXJyb3dOb2RlIGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnktcGhldC9qcy9BcnJvd05vZGUuanMnO1xyXG5pbXBvcnQgeyBDaXJjbGUsIERyYWdMaXN0ZW5lciwgRm9jdXNIaWdobGlnaHRGcm9tTm9kZSwgSW50ZXJhY3RpdmVIaWdobGlnaHRpbmcsIEtleWJvYXJkRHJhZ0xpc3RlbmVyLCBLZXlib2FyZERyYWdMaXN0ZW5lck9wdGlvbnMsIE5vZGUsIE5vZGVPcHRpb25zLCBWQm94LCBWQm94T3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBnZW9tZXRyaWNPcHRpY3MgZnJvbSAnLi4vLi4vZ2VvbWV0cmljT3B0aWNzLmpzJztcclxuaW1wb3J0IEdPQ29sb3JzIGZyb20gJy4uL0dPQ29sb3JzLmpzJztcclxuaW1wb3J0IFNlY29uZFBvaW50IGZyb20gJy4uL21vZGVsL1NlY29uZFBvaW50LmpzJztcclxuaW1wb3J0IEdPQ29uc3RhbnRzIGZyb20gJy4uL0dPQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IG9wdGlvbml6ZSwgeyBjb21iaW5lT3B0aW9ucywgRW1wdHlTZWxmT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9vcHRpb25pemUuanMnO1xyXG5pbXBvcnQgUGlja1JlcXVpcmVkIGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy90eXBlcy9QaWNrUmVxdWlyZWQuanMnO1xyXG5pbXBvcnQgVFByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvVFByb3BlcnR5LmpzJztcclxuaW1wb3J0IEN1ZWluZ0Fycm93c05vZGUgZnJvbSAnLi9DdWVpbmdBcnJvd3NOb2RlLmpzJztcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSBFbXB0eVNlbGZPcHRpb25zO1xyXG5cclxudHlwZSBTZWNvbmRQb2ludE5vZGVPcHRpb25zID0gU2VsZk9wdGlvbnMgJlxyXG4gIFBpY2tSZXF1aXJlZDxOb2RlT3B0aW9ucywgJ3Zpc2libGVQcm9wZXJ0eScgfCAndGFuZGVtJyB8ICdwaGV0aW9Eb2N1bWVudGF0aW9uJz47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWNvbmRQb2ludE5vZGUgZXh0ZW5kcyBJbnRlcmFjdGl2ZUhpZ2hsaWdodGluZyggTm9kZSApIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHNlY29uZFBvaW50IC0gbW9kZWwgZWxlbWVudFxyXG4gICAqIEBwYXJhbSBtb2RlbFZpZXdUcmFuc2Zvcm1cclxuICAgKiBAcGFyYW0gd2FzRHJhZ2dlZFByb3BlcnR5IC0gd2FzIHRoZSBzZWNvbmQgcG9pbnQgZHJhZ2dlZD9cclxuICAgKiBAcGFyYW0gcHJvdmlkZWRPcHRpb25zXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBzZWNvbmRQb2ludDogU2Vjb25kUG9pbnQsIG1vZGVsVmlld1RyYW5zZm9ybTogTW9kZWxWaWV3VHJhbnNmb3JtMiwgd2FzRHJhZ2dlZFByb3BlcnR5OiBUUHJvcGVydHk8Ym9vbGVhbj4sXHJcbiAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlZE9wdGlvbnM6IFNlY29uZFBvaW50Tm9kZU9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxTZWNvbmRQb2ludE5vZGVPcHRpb25zLCBTZWxmT3B0aW9ucywgTm9kZU9wdGlvbnM+KCkoIHtcclxuXHJcbiAgICAgIC8vIE5vZGVPcHRpb25zXHJcbiAgICAgIGN1cnNvcjogJ25zLXJlc2l6ZScsIC8vIHNlY29uZCBwb2ludCBjYW4gb25seSBiZSBkcmFnZ2VkIHZlcnRpY2FsbHlcclxuICAgICAgdGFnTmFtZTogJ2RpdicsXHJcbiAgICAgIGZvY3VzYWJsZTogdHJ1ZSxcclxuICAgICAgcGhldGlvSW5wdXRFbmFibGVkUHJvcGVydHlJbnN0cnVtZW50ZWQ6IHRydWVcclxuICAgIH0sIHByb3ZpZGVkT3B0aW9ucyApO1xyXG5cclxuICAgIHN1cGVyKCBvcHRpb25zICk7XHJcblxyXG4gICAgY29uc3QgcG9pbnROb2RlID0gbmV3IFBvaW50Tm9kZSgpO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggcG9pbnROb2RlICk7XHJcbiAgICB0aGlzLnNldEZvY3VzSGlnaGxpZ2h0KCBuZXcgRm9jdXNIaWdobGlnaHRGcm9tTm9kZSggcG9pbnROb2RlICkgKTtcclxuXHJcbiAgICAvLyBDdWVpbmcgYXJyb3dzXHJcbiAgICBjb25zdCBjdWVpbmdBcnJvd3NOb2RlID0gbmV3IFNlY29uZFBvaW50Q3VlaW5nQXJyb3dzTm9kZSggcG9pbnROb2RlLndpZHRoICsgMTAsIHtcclxuICAgICAgY2VudGVyOiBwb2ludE5vZGUuY2VudGVyLFxyXG4gICAgICB2aXNpYmxlUHJvcGVydHk6IEN1ZWluZ0Fycm93c05vZGUuY3JlYXRlVmlzaWJsZVByb3BlcnR5KCB0aGlzLmlucHV0RW5hYmxlZFByb3BlcnR5LCB3YXNEcmFnZ2VkUHJvcGVydHkgKVxyXG4gICAgfSApO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggY3VlaW5nQXJyb3dzTm9kZSApO1xyXG5cclxuICAgIHRoaXMudG91Y2hBcmVhID0gU2hhcGUuY2lyY2xlKCAwLCAwLCAyICogcG9pbnROb2RlLndpZHRoICsgMTAgKTtcclxuXHJcbiAgICBzZWNvbmRQb2ludC5wb3NpdGlvblByb3BlcnR5LmxpbmsoIHBvc2l0aW9uID0+IHtcclxuICAgICAgdGhpcy5jZW50ZXIgPSBtb2RlbFZpZXdUcmFuc2Zvcm0ubW9kZWxUb1ZpZXdQb3NpdGlvbiggcG9zaXRpb24gKTtcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBUaGUgcG9zaXRpb24gb2YgdGhlIHNlY29uZCBwb2ludCBjYW5ub3QgYmUgc2V0IGRpcmVjdGx5LCBiZWNhdXNlIGl0IGlzIGRlcml2ZWQgYmFzZWQgb24gdGhlIHZlcnRpY2FsXHJcbiAgICAvLyBvZmZzZXQgZnJvbSB0aGUgZnJhbWVkIG9iamVjdCdzIHBvc2l0aW9uLiAgU28gY3JlYXRlIGFuIGFkYXB0ZXIgUHJvcGVydHkgZm9yIHVzZSB3aXRoIERyYWdMaXN0ZW5lci5cclxuICAgIGNvbnN0IHBvc2l0aW9uUHJvcGVydHkgPSBuZXcgVmVjdG9yMlByb3BlcnR5KCBzZWNvbmRQb2ludC5wb3NpdGlvblByb3BlcnR5LnZhbHVlICk7XHJcbiAgICBwb3NpdGlvblByb3BlcnR5LmxpbmsoIHBvc2l0aW9uID0+IHNlY29uZFBvaW50LnNldFNlY29uZFBvaW50KCBwb3NpdGlvbiApICk7XHJcblxyXG4gICAgLy8gRHJhZyBhY3Rpb24gdGhhdCBpcyBjb21tb24gdG8gRHJhZ0xpc3RlbmVyIGFuZCBLZXlib2FyZERyYWdMaXN0ZW5lclxyXG4gICAgY29uc3QgZHJhZyA9ICgpID0+IHtcclxuICAgICAgd2FzRHJhZ2dlZFByb3BlcnR5LnZhbHVlID0gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZHJhZ0xpc3RlbmVyID0gbmV3IERyYWdMaXN0ZW5lcigge1xyXG4gICAgICBwb3NpdGlvblByb3BlcnR5OiBwb3NpdGlvblByb3BlcnR5LFxyXG4gICAgICB0cmFuc2Zvcm06IG1vZGVsVmlld1RyYW5zZm9ybSxcclxuICAgICAgZHJhZzogZHJhZyxcclxuICAgICAgdGFuZGVtOiBvcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdkcmFnTGlzdGVuZXInIClcclxuICAgIH0gKTtcclxuICAgIHRoaXMuYWRkSW5wdXRMaXN0ZW5lciggZHJhZ0xpc3RlbmVyICk7XHJcblxyXG4gICAgY29uc3Qga2V5Ym9hcmREcmFnTGlzdGVuZXIgPSBuZXcgS2V5Ym9hcmREcmFnTGlzdGVuZXIoXHJcbiAgICAgIGNvbWJpbmVPcHRpb25zPEtleWJvYXJkRHJhZ0xpc3RlbmVyT3B0aW9ucz4oIHt9LCBHT0NvbnN0YW50cy5LRVlCT0FSRF9EUkFHX0xJU1RFTkVSX09QVElPTlMsIHtcclxuICAgICAgICBwb3NpdGlvblByb3BlcnR5OiBwb3NpdGlvblByb3BlcnR5LFxyXG4gICAgICAgIHRyYW5zZm9ybTogbW9kZWxWaWV3VHJhbnNmb3JtLFxyXG4gICAgICAgIGRyYWc6IGRyYWcsXHJcbiAgICAgICAgdGFuZGVtOiBvcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdrZXlib2FyZERyYWdMaXN0ZW5lcicgKVxyXG4gICAgICB9ICkgKTtcclxuICAgIHRoaXMuYWRkSW5wdXRMaXN0ZW5lcigga2V5Ym9hcmREcmFnTGlzdGVuZXIgKTtcclxuXHJcbiAgICB0aGlzLmFkZExpbmtlZEVsZW1lbnQoIHNlY29uZFBvaW50LCB7XHJcbiAgICAgIHRhbmRlbTogb3B0aW9ucy50YW5kZW0uY3JlYXRlVGFuZGVtKCBzZWNvbmRQb2ludC50YW5kZW0ubmFtZSApXHJcbiAgICB9ICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuIGljb24gdG8gcmVwcmVzZW50IHRoZSBzZWNvbmQgcG9pbnQuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBjcmVhdGVJY29uKCk6IE5vZGUge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludE5vZGUoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvdmVycmlkZSBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggZmFsc2UsICdkaXNwb3NlIGlzIG5vdCBzdXBwb3J0ZWQsIGV4aXN0cyBmb3IgdGhlIGxpZmV0aW1lIG9mIHRoZSBzaW0nICk7XHJcbiAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBDaXJjbGUgdGhhdCBkZW5vdGVzIHRoZSBzZWNvbmQgcG9pbnRcclxuY2xhc3MgUG9pbnROb2RlIGV4dGVuZHMgQ2lyY2xlIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlciggNywge1xyXG4gICAgICBmaWxsOiBHT0NvbG9ycy5zZWNvbmRQb2ludEZpbGxQcm9wZXJ0eSxcclxuICAgICAgc3Ryb2tlOiBHT0NvbG9ycy5zZWNvbmRQb2ludFN0cm9rZVByb3BlcnR5XHJcbiAgICB9ICk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBDdWVpbmcgYXJyb3cgY29uc3RhbnRzXHJcbmNvbnN0IEFSUk9XX0xFTkdUSCA9IDIwO1xyXG5jb25zdCBBUlJPV19OT0RFX09QVElPTlMgPSB7XHJcbiAgZmlsbDogR09Db2xvcnMuc2Vjb25kUG9pbnRGaWxsUHJvcGVydHksXHJcbiAgaGVhZFdpZHRoOiAxMixcclxuICBoZWFkSGVpZ2h0OiA4LFxyXG4gIHRhaWxXaWR0aDogM1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNlY29uZFBvaW50Tm9kZSBoYXMgaXRzIG93biBjdWVpbmcgYXJyb3dzIHRoYXQgYXJlIHZlcnkgZGlmZmVyZW50IGZyb20gdGhlIEN1ZWluZ0Fycm93Tm9kZSB1c2VkIGZvciBvdGhlciBVSSBlbGVtZW50cy5cclxuICogVGhlc2UgYXJyb3dzIHBvaW50IHVwIGFuZCBkb3duLCBhbmQgYXJlIHNlcGFyYXRlZCBieSBhIGdhcCB3aGVyZSB0aGUgc2Vjb25kIHBvaW50IHdpbGwgYXBwZWFyLlxyXG4gKi9cclxuY2xhc3MgU2Vjb25kUG9pbnRDdWVpbmdBcnJvd3NOb2RlIGV4dGVuZHMgVkJveCB7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvciggc3BhY2luZzogbnVtYmVyLCBwcm92aWRlZE9wdGlvbnM/OiBOb2RlT3B0aW9ucyApIHtcclxuICAgIHN1cGVyKCBvcHRpb25pemU8Tm9kZU9wdGlvbnMsIEVtcHR5U2VsZk9wdGlvbnMsIFZCb3hPcHRpb25zPigpKCB7XHJcbiAgICAgIHNwYWNpbmc6IHNwYWNpbmcsXHJcbiAgICAgIGFsaWduOiAnY2VudGVyJyxcclxuICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICBuZXcgQXJyb3dOb2RlKCAwLCAwLCAwLCAtQVJST1dfTEVOR1RILCBBUlJPV19OT0RFX09QVElPTlMgKSwgLy8gdXAgYXJyb3dcclxuICAgICAgICBuZXcgQXJyb3dOb2RlKCAwLCAwLCAwLCArQVJST1dfTEVOR1RILCBBUlJPV19OT0RFX09QVElPTlMgKSAvLyBkb3duIGFycm93XHJcbiAgICAgIF1cclxuICAgIH0sIHByb3ZpZGVkT3B0aW9ucyApICk7XHJcbiAgfVxyXG59XHJcblxyXG5nZW9tZXRyaWNPcHRpY3MucmVnaXN0ZXIoICdTZWNvbmRQb2ludE5vZGUnLCBTZWNvbmRQb2ludE5vZGUgKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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