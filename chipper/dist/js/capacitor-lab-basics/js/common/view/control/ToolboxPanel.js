// Copyright 2015-2023, University of Colorado Boulder

/**
 * Toolbox that contains a voltmeter and timer.  The user can drag the voltmeter out of the toolbox for
 * use.  TODO: Perhaps it should be renamed now that it contains tools other than the Voltmeter
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import merge from '../../../../../phet-core/js/merge.js';
import Stopwatch from '../../../../../scenery-phet/js/Stopwatch.js';
import StopwatchNode from '../../../../../scenery-phet/js/StopwatchNode.js';
import { AlignBox, DragListener, HBox, Node } from '../../../../../scenery/js/imports.js';
import Panel from '../../../../../sun/js/Panel.js';
import EventType from '../../../../../tandem/js/EventType.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import capacitorLabBasics from '../../../capacitorLabBasics.js';
import CLBConstants from '../../CLBConstants.js';
import VoltmeterNode from '../meters/VoltmeterNode.js';
class ToolboxPanel extends Node {
  /**
   * @param {StopwatchNode|null} stopwatchNode
   * @param {VoltmeterNode} voltmeterNode
   * @param {YawPitchModelViewTransform3} modelViewTransform
   * @param {Property.<boolean>} isDraggedProperty
   * @param {Stopwatch} stopwatch
   * @param {Property.<boolean>} voltmeterVisibleProperty
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor(stopwatchNode, voltmeterNode, modelViewTransform, isDraggedProperty, stopwatch, voltmeterVisibleProperty, tandem, options) {
    options = merge({
      includeTimer: true,
      alignGroup: null
    }, options);

    // wrap all off this content inside of a node that will hold the input element and its descriptions
    super({
      tandem: tandem,
      phetioEventType: EventType.USER
    });

    // @private {VoltmeterNode}
    this.voltmeterNode = voltmeterNode;

    // create the icon for the toolbox.
    const voltmeterScale = options.includeTimer === true ? 0.6 : 1;
    const voltmeterIconNode = VoltmeterNode.createVoltmeterIconNode(voltmeterScale, tandem.createTandem('voltmeterIcon'));
    voltmeterIconNode.cursor = 'pointer';
    voltmeterIconNode.addInputListener(DragListener.createForwardingListener(event => {
      this.phetioStartEvent('dragged');
      voltmeterVisibleProperty.set(true);

      // initial position of the pointer in the screenView coordinates
      const initialPosition = this.globalToParentPoint(event.pointer.point);

      // make sure that the center of the voltmeter body is offset by the body dimensions
      const offsetPosition = new Vector2(-voltmeterNode.bodyNode.width / 2, -voltmeterNode.bodyNode.height / 2);
      const voltmeterBodyPosition = initialPosition.plus(offsetPosition);
      voltmeterNode.bodyNode.bodyPositionProperty.set(modelViewTransform.viewToModelPosition(voltmeterBodyPosition));

      // start drag from the body node's movable drag handler
      voltmeterNode.bodyNode.dragListener.press(event);
      this.phetioEndEvent();
    }));

    // Create timer to be turned into icon
    const placeholderTimer = new StopwatchNode(new Stopwatch({
      isVisible: true,
      tandem: Tandem.OPT_OUT
    }), {
      numberDisplayOptions: {
        numberFormatter: StopwatchNode.createRichTextNumberFormatter({
          showAsMinutesAndSeconds: true,
          numberOfDecimalPlaces: 1
        })
      },
      scale: 0.60,
      tandem: Tandem.OPT_OUT
    });
    const timeNodeIconTandem = tandem.createTandem('timerIcon');

    // {Node} Create timer icon. Visible option is used only for reset() in ToolboxPanel.js
    const timerIconNode = placeholderTimer.rasterized({
      resolution: 5,
      imageOptions: {
        cursor: 'pointer',
        pickable: true,
        tandem: options.includeTimer ? timeNodeIconTandem : Tandem.OPT_OUT
      }
    });

    // create a forwarding listener for the StopwatchNode DragListener
    timerIconNode.addInputListener(DragListener.createForwardingListener(event => {
      if (!stopwatch.isVisibleProperty.get()) {
        stopwatch.isVisibleProperty.value = true;
        const coordinate = this.globalToParentPoint(event.pointer.point).minusXY(stopwatchNode.width / 2, stopwatchNode.height / 2);
        stopwatch.positionProperty.set(coordinate);
        stopwatchNode.dragListener.press(event, stopwatchNode);
      }
    }, {
      // allow moving a finger (on a touchscreen) dragged across this node to interact with it
      allowTouchSnag: true,
      tandem: timeNodeIconTandem.createTandem('dragListener')
    }));
    stopwatch.isVisibleProperty.link(visible => {
      timerIconNode.visible = !visible;
    });
    const toolbox = new HBox({
      spacing: 13,
      align: 'center',
      xMargin: 0,
      excludeInvisibleChildrenFromBounds: false
    });
    if (options.includeTimer) {
      toolbox.addChild(voltmeterIconNode);
      toolbox.addChild(timerIconNode);
    } else {
      toolbox.addChild(voltmeterIconNode);
    }

    // {AlignBox|HBox}
    const content = options.alignGroup ? new AlignBox(toolbox, {
      group: options.alignGroup,
      xAlign: 'center'
    }) : toolbox;
    this.addChild(new Panel(content, {
      xMargin: 10,
      yMargin: 15,
      align: 'center',
      minWidth: 175,
      fill: CLBConstants.METER_PANEL_FILL
    }));
    voltmeterVisibleProperty.link(voltmeterVisible => {
      voltmeterIconNode.visible = !voltmeterVisible;
    });

    // track user control of the voltmeter and place the voltmeter back in the toolbox if bounds collide
    // panel exists for lifetime of sim, no need for dispose
    isDraggedProperty.link(isDragged => {
      if (!isDragged && this.bounds.intersectsBounds(voltmeterNode.bodyNode.bounds.eroded(40))) {
        voltmeterVisibleProperty.set(false);
      }
    });
  }
}
capacitorLabBasics.register('ToolboxPanel', ToolboxPanel);
export default ToolboxPanel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWZWN0b3IyIiwibWVyZ2UiLCJTdG9wd2F0Y2giLCJTdG9wd2F0Y2hOb2RlIiwiQWxpZ25Cb3giLCJEcmFnTGlzdGVuZXIiLCJIQm94IiwiTm9kZSIsIlBhbmVsIiwiRXZlbnRUeXBlIiwiVGFuZGVtIiwiY2FwYWNpdG9yTGFiQmFzaWNzIiwiQ0xCQ29uc3RhbnRzIiwiVm9sdG1ldGVyTm9kZSIsIlRvb2xib3hQYW5lbCIsImNvbnN0cnVjdG9yIiwic3RvcHdhdGNoTm9kZSIsInZvbHRtZXRlck5vZGUiLCJtb2RlbFZpZXdUcmFuc2Zvcm0iLCJpc0RyYWdnZWRQcm9wZXJ0eSIsInN0b3B3YXRjaCIsInZvbHRtZXRlclZpc2libGVQcm9wZXJ0eSIsInRhbmRlbSIsIm9wdGlvbnMiLCJpbmNsdWRlVGltZXIiLCJhbGlnbkdyb3VwIiwicGhldGlvRXZlbnRUeXBlIiwiVVNFUiIsInZvbHRtZXRlclNjYWxlIiwidm9sdG1ldGVySWNvbk5vZGUiLCJjcmVhdGVWb2x0bWV0ZXJJY29uTm9kZSIsImNyZWF0ZVRhbmRlbSIsImN1cnNvciIsImFkZElucHV0TGlzdGVuZXIiLCJjcmVhdGVGb3J3YXJkaW5nTGlzdGVuZXIiLCJldmVudCIsInBoZXRpb1N0YXJ0RXZlbnQiLCJzZXQiLCJpbml0aWFsUG9zaXRpb24iLCJnbG9iYWxUb1BhcmVudFBvaW50IiwicG9pbnRlciIsInBvaW50Iiwib2Zmc2V0UG9zaXRpb24iLCJib2R5Tm9kZSIsIndpZHRoIiwiaGVpZ2h0Iiwidm9sdG1ldGVyQm9keVBvc2l0aW9uIiwicGx1cyIsImJvZHlQb3NpdGlvblByb3BlcnR5Iiwidmlld1RvTW9kZWxQb3NpdGlvbiIsImRyYWdMaXN0ZW5lciIsInByZXNzIiwicGhldGlvRW5kRXZlbnQiLCJwbGFjZWhvbGRlclRpbWVyIiwiaXNWaXNpYmxlIiwiT1BUX09VVCIsIm51bWJlckRpc3BsYXlPcHRpb25zIiwibnVtYmVyRm9ybWF0dGVyIiwiY3JlYXRlUmljaFRleHROdW1iZXJGb3JtYXR0ZXIiLCJzaG93QXNNaW51dGVzQW5kU2Vjb25kcyIsIm51bWJlck9mRGVjaW1hbFBsYWNlcyIsInNjYWxlIiwidGltZU5vZGVJY29uVGFuZGVtIiwidGltZXJJY29uTm9kZSIsInJhc3Rlcml6ZWQiLCJyZXNvbHV0aW9uIiwiaW1hZ2VPcHRpb25zIiwicGlja2FibGUiLCJpc1Zpc2libGVQcm9wZXJ0eSIsImdldCIsInZhbHVlIiwiY29vcmRpbmF0ZSIsIm1pbnVzWFkiLCJwb3NpdGlvblByb3BlcnR5IiwiYWxsb3dUb3VjaFNuYWciLCJsaW5rIiwidmlzaWJsZSIsInRvb2xib3giLCJzcGFjaW5nIiwiYWxpZ24iLCJ4TWFyZ2luIiwiZXhjbHVkZUludmlzaWJsZUNoaWxkcmVuRnJvbUJvdW5kcyIsImFkZENoaWxkIiwiY29udGVudCIsImdyb3VwIiwieEFsaWduIiwieU1hcmdpbiIsIm1pbldpZHRoIiwiZmlsbCIsIk1FVEVSX1BBTkVMX0ZJTEwiLCJ2b2x0bWV0ZXJWaXNpYmxlIiwiaXNEcmFnZ2VkIiwiYm91bmRzIiwiaW50ZXJzZWN0c0JvdW5kcyIsImVyb2RlZCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiVG9vbGJveFBhbmVsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE1LTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFRvb2xib3ggdGhhdCBjb250YWlucyBhIHZvbHRtZXRlciBhbmQgdGltZXIuICBUaGUgdXNlciBjYW4gZHJhZyB0aGUgdm9sdG1ldGVyIG91dCBvZiB0aGUgdG9vbGJveCBmb3JcclxuICogdXNlLiAgVE9ETzogUGVyaGFwcyBpdCBzaG91bGQgYmUgcmVuYW1lZCBub3cgdGhhdCBpdCBjb250YWlucyB0b29scyBvdGhlciB0aGFuIHRoZSBWb2x0bWV0ZXJcclxuICpcclxuICogQGF1dGhvciBKZXNzZSBHcmVlbmJlcmcgKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqL1xyXG5cclxuaW1wb3J0IFZlY3RvcjIgZnJvbSAnLi4vLi4vLi4vLi4vLi4vZG90L2pzL1ZlY3RvcjIuanMnO1xyXG5pbXBvcnQgbWVyZ2UgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL21lcmdlLmpzJztcclxuaW1wb3J0IFN0b3B3YXRjaCBmcm9tICcuLi8uLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMvU3RvcHdhdGNoLmpzJztcclxuaW1wb3J0IFN0b3B3YXRjaE5vZGUgZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL1N0b3B3YXRjaE5vZGUuanMnO1xyXG5pbXBvcnQgeyBBbGlnbkJveCwgRHJhZ0xpc3RlbmVyLCBIQm94LCBOb2RlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IFBhbmVsIGZyb20gJy4uLy4uLy4uLy4uLy4uL3N1bi9qcy9QYW5lbC5qcyc7XHJcbmltcG9ydCBFdmVudFR5cGUgZnJvbSAnLi4vLi4vLi4vLi4vLi4vdGFuZGVtL2pzL0V2ZW50VHlwZS5qcyc7XHJcbmltcG9ydCBUYW5kZW0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdGFuZGVtL2pzL1RhbmRlbS5qcyc7XHJcbmltcG9ydCBjYXBhY2l0b3JMYWJCYXNpY3MgZnJvbSAnLi4vLi4vLi4vY2FwYWNpdG9yTGFiQmFzaWNzLmpzJztcclxuaW1wb3J0IENMQkNvbnN0YW50cyBmcm9tICcuLi8uLi9DTEJDb25zdGFudHMuanMnO1xyXG5pbXBvcnQgVm9sdG1ldGVyTm9kZSBmcm9tICcuLi9tZXRlcnMvVm9sdG1ldGVyTm9kZS5qcyc7XHJcblxyXG5jbGFzcyBUb29sYm94UGFuZWwgZXh0ZW5kcyBOb2RlIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge1N0b3B3YXRjaE5vZGV8bnVsbH0gc3RvcHdhdGNoTm9kZVxyXG4gICAqIEBwYXJhbSB7Vm9sdG1ldGVyTm9kZX0gdm9sdG1ldGVyTm9kZVxyXG4gICAqIEBwYXJhbSB7WWF3UGl0Y2hNb2RlbFZpZXdUcmFuc2Zvcm0zfSBtb2RlbFZpZXdUcmFuc2Zvcm1cclxuICAgKiBAcGFyYW0ge1Byb3BlcnR5Ljxib29sZWFuPn0gaXNEcmFnZ2VkUHJvcGVydHlcclxuICAgKiBAcGFyYW0ge1N0b3B3YXRjaH0gc3RvcHdhdGNoXHJcbiAgICogQHBhcmFtIHtQcm9wZXJ0eS48Ym9vbGVhbj59IHZvbHRtZXRlclZpc2libGVQcm9wZXJ0eVxyXG4gICAqIEBwYXJhbSB7VGFuZGVtfSB0YW5kZW1cclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIHN0b3B3YXRjaE5vZGUsIHZvbHRtZXRlck5vZGUsIG1vZGVsVmlld1RyYW5zZm9ybSwgaXNEcmFnZ2VkUHJvcGVydHksIHN0b3B3YXRjaCwgdm9sdG1ldGVyVmlzaWJsZVByb3BlcnR5LCB0YW5kZW0sIG9wdGlvbnMgKSB7XHJcbiAgICBvcHRpb25zID0gbWVyZ2UoIHtcclxuICAgICAgaW5jbHVkZVRpbWVyOiB0cnVlLFxyXG4gICAgICBhbGlnbkdyb3VwOiBudWxsXHJcbiAgICB9LCBvcHRpb25zICk7XHJcblxyXG5cclxuICAgIC8vIHdyYXAgYWxsIG9mZiB0aGlzIGNvbnRlbnQgaW5zaWRlIG9mIGEgbm9kZSB0aGF0IHdpbGwgaG9sZCB0aGUgaW5wdXQgZWxlbWVudCBhbmQgaXRzIGRlc2NyaXB0aW9uc1xyXG4gICAgc3VwZXIoIHtcclxuICAgICAgdGFuZGVtOiB0YW5kZW0sXHJcbiAgICAgIHBoZXRpb0V2ZW50VHlwZTogRXZlbnRUeXBlLlVTRVJcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZSB7Vm9sdG1ldGVyTm9kZX1cclxuICAgIHRoaXMudm9sdG1ldGVyTm9kZSA9IHZvbHRtZXRlck5vZGU7XHJcblxyXG4gICAgLy8gY3JlYXRlIHRoZSBpY29uIGZvciB0aGUgdG9vbGJveC5cclxuICAgIGNvbnN0IHZvbHRtZXRlclNjYWxlID0gb3B0aW9ucy5pbmNsdWRlVGltZXIgPT09IHRydWUgPyAwLjYgOiAxO1xyXG4gICAgY29uc3Qgdm9sdG1ldGVySWNvbk5vZGUgPSBWb2x0bWV0ZXJOb2RlLmNyZWF0ZVZvbHRtZXRlckljb25Ob2RlKCB2b2x0bWV0ZXJTY2FsZSwgdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3ZvbHRtZXRlckljb24nICkgKTtcclxuICAgIHZvbHRtZXRlckljb25Ob2RlLmN1cnNvciA9ICdwb2ludGVyJztcclxuXHJcbiAgICB2b2x0bWV0ZXJJY29uTm9kZS5hZGRJbnB1dExpc3RlbmVyKCBEcmFnTGlzdGVuZXIuY3JlYXRlRm9yd2FyZGluZ0xpc3RlbmVyKCBldmVudCA9PiB7XHJcbiAgICAgIHRoaXMucGhldGlvU3RhcnRFdmVudCggJ2RyYWdnZWQnICk7XHJcbiAgICAgIHZvbHRtZXRlclZpc2libGVQcm9wZXJ0eS5zZXQoIHRydWUgKTtcclxuXHJcbiAgICAgIC8vIGluaXRpYWwgcG9zaXRpb24gb2YgdGhlIHBvaW50ZXIgaW4gdGhlIHNjcmVlblZpZXcgY29vcmRpbmF0ZXNcclxuICAgICAgY29uc3QgaW5pdGlhbFBvc2l0aW9uID0gdGhpcy5nbG9iYWxUb1BhcmVudFBvaW50KCBldmVudC5wb2ludGVyLnBvaW50ICk7XHJcblxyXG4gICAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgY2VudGVyIG9mIHRoZSB2b2x0bWV0ZXIgYm9keSBpcyBvZmZzZXQgYnkgdGhlIGJvZHkgZGltZW5zaW9uc1xyXG4gICAgICBjb25zdCBvZmZzZXRQb3NpdGlvbiA9IG5ldyBWZWN0b3IyKCAtdm9sdG1ldGVyTm9kZS5ib2R5Tm9kZS53aWR0aCAvIDIsIC12b2x0bWV0ZXJOb2RlLmJvZHlOb2RlLmhlaWdodCAvIDIgKTtcclxuXHJcbiAgICAgIGNvbnN0IHZvbHRtZXRlckJvZHlQb3NpdGlvbiA9IGluaXRpYWxQb3NpdGlvbi5wbHVzKCBvZmZzZXRQb3NpdGlvbiApO1xyXG4gICAgICB2b2x0bWV0ZXJOb2RlLmJvZHlOb2RlLmJvZHlQb3NpdGlvblByb3BlcnR5LnNldCggbW9kZWxWaWV3VHJhbnNmb3JtLnZpZXdUb01vZGVsUG9zaXRpb24oIHZvbHRtZXRlckJvZHlQb3NpdGlvbiApICk7XHJcblxyXG4gICAgICAvLyBzdGFydCBkcmFnIGZyb20gdGhlIGJvZHkgbm9kZSdzIG1vdmFibGUgZHJhZyBoYW5kbGVyXHJcbiAgICAgIHZvbHRtZXRlck5vZGUuYm9keU5vZGUuZHJhZ0xpc3RlbmVyLnByZXNzKCBldmVudCApO1xyXG4gICAgICB0aGlzLnBoZXRpb0VuZEV2ZW50KCk7XHJcbiAgICB9ICkgKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgdGltZXIgdG8gYmUgdHVybmVkIGludG8gaWNvblxyXG4gICAgY29uc3QgcGxhY2Vob2xkZXJUaW1lciA9IG5ldyBTdG9wd2F0Y2hOb2RlKCBuZXcgU3RvcHdhdGNoKCB7IGlzVmlzaWJsZTogdHJ1ZSwgdGFuZGVtOiBUYW5kZW0uT1BUX09VVCB9ICksIHtcclxuICAgICAgbnVtYmVyRGlzcGxheU9wdGlvbnM6IHtcclxuICAgICAgICBudW1iZXJGb3JtYXR0ZXI6IFN0b3B3YXRjaE5vZGUuY3JlYXRlUmljaFRleHROdW1iZXJGb3JtYXR0ZXIoIHtcclxuICAgICAgICAgIHNob3dBc01pbnV0ZXNBbmRTZWNvbmRzOiB0cnVlLFxyXG4gICAgICAgICAgbnVtYmVyT2ZEZWNpbWFsUGxhY2VzOiAxXHJcbiAgICAgICAgfSApXHJcbiAgICAgIH0sXHJcbiAgICAgIHNjYWxlOiAwLjYwLFxyXG4gICAgICB0YW5kZW06IFRhbmRlbS5PUFRfT1VUXHJcbiAgICB9ICk7XHJcblxyXG4gICAgY29uc3QgdGltZU5vZGVJY29uVGFuZGVtID0gdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3RpbWVySWNvbicgKTtcclxuXHJcbiAgICAvLyB7Tm9kZX0gQ3JlYXRlIHRpbWVyIGljb24uIFZpc2libGUgb3B0aW9uIGlzIHVzZWQgb25seSBmb3IgcmVzZXQoKSBpbiBUb29sYm94UGFuZWwuanNcclxuICAgIGNvbnN0IHRpbWVySWNvbk5vZGUgPSBwbGFjZWhvbGRlclRpbWVyLnJhc3Rlcml6ZWQoIHtcclxuICAgICAgcmVzb2x1dGlvbjogNSxcclxuICAgICAgaW1hZ2VPcHRpb25zOiB7XHJcbiAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgcGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgdGFuZGVtOiBvcHRpb25zLmluY2x1ZGVUaW1lciA/IHRpbWVOb2RlSWNvblRhbmRlbSA6IFRhbmRlbS5PUFRfT1VUXHJcbiAgICAgIH1cclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgYSBmb3J3YXJkaW5nIGxpc3RlbmVyIGZvciB0aGUgU3RvcHdhdGNoTm9kZSBEcmFnTGlzdGVuZXJcclxuICAgIHRpbWVySWNvbk5vZGUuYWRkSW5wdXRMaXN0ZW5lciggRHJhZ0xpc3RlbmVyLmNyZWF0ZUZvcndhcmRpbmdMaXN0ZW5lciggZXZlbnQgPT4ge1xyXG4gICAgICBpZiAoICFzdG9wd2F0Y2guaXNWaXNpYmxlUHJvcGVydHkuZ2V0KCkgKSB7XHJcbiAgICAgICAgc3RvcHdhdGNoLmlzVmlzaWJsZVByb3BlcnR5LnZhbHVlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IHRoaXMuZ2xvYmFsVG9QYXJlbnRQb2ludCggZXZlbnQucG9pbnRlci5wb2ludCApLm1pbnVzWFkoXHJcbiAgICAgICAgICBzdG9wd2F0Y2hOb2RlLndpZHRoIC8gMixcclxuICAgICAgICAgIHN0b3B3YXRjaE5vZGUuaGVpZ2h0IC8gMlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc3RvcHdhdGNoLnBvc2l0aW9uUHJvcGVydHkuc2V0KCBjb29yZGluYXRlICk7XHJcbiAgICAgICAgc3RvcHdhdGNoTm9kZS5kcmFnTGlzdGVuZXIucHJlc3MoIGV2ZW50LCBzdG9wd2F0Y2hOb2RlICk7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuXHJcbiAgICAgIC8vIGFsbG93IG1vdmluZyBhIGZpbmdlciAob24gYSB0b3VjaHNjcmVlbikgZHJhZ2dlZCBhY3Jvc3MgdGhpcyBub2RlIHRvIGludGVyYWN0IHdpdGggaXRcclxuICAgICAgYWxsb3dUb3VjaFNuYWc6IHRydWUsXHJcbiAgICAgIHRhbmRlbTogdGltZU5vZGVJY29uVGFuZGVtLmNyZWF0ZVRhbmRlbSggJ2RyYWdMaXN0ZW5lcicgKVxyXG4gICAgfSApICk7XHJcblxyXG4gICAgc3RvcHdhdGNoLmlzVmlzaWJsZVByb3BlcnR5LmxpbmsoIHZpc2libGUgPT4ge1xyXG4gICAgICB0aW1lckljb25Ob2RlLnZpc2libGUgPSAhdmlzaWJsZTtcclxuICAgIH0gKTtcclxuXHJcbiAgICBjb25zdCB0b29sYm94ID0gbmV3IEhCb3goIHtcclxuICAgICAgc3BhY2luZzogMTMsXHJcbiAgICAgIGFsaWduOiAnY2VudGVyJyxcclxuICAgICAgeE1hcmdpbjogMCxcclxuICAgICAgZXhjbHVkZUludmlzaWJsZUNoaWxkcmVuRnJvbUJvdW5kczogZmFsc2VcclxuICAgIH0gKTtcclxuICAgIGlmICggb3B0aW9ucy5pbmNsdWRlVGltZXIgKSB7XHJcbiAgICAgIHRvb2xib3guYWRkQ2hpbGQoIHZvbHRtZXRlckljb25Ob2RlICk7XHJcbiAgICAgIHRvb2xib3guYWRkQ2hpbGQoIHRpbWVySWNvbk5vZGUgKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0b29sYm94LmFkZENoaWxkKCB2b2x0bWV0ZXJJY29uTm9kZSApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHtBbGlnbkJveHxIQm94fVxyXG4gICAgY29uc3QgY29udGVudCA9IG9wdGlvbnMuYWxpZ25Hcm91cCA/IG5ldyBBbGlnbkJveCggdG9vbGJveCwge1xyXG4gICAgICBncm91cDogb3B0aW9ucy5hbGlnbkdyb3VwLFxyXG4gICAgICB4QWxpZ246ICdjZW50ZXInXHJcbiAgICB9ICkgOiB0b29sYm94O1xyXG4gICAgdGhpcy5hZGRDaGlsZCggbmV3IFBhbmVsKCBjb250ZW50LCB7XHJcbiAgICAgIHhNYXJnaW46IDEwLFxyXG4gICAgICB5TWFyZ2luOiAxNSxcclxuICAgICAgYWxpZ246ICdjZW50ZXInLFxyXG4gICAgICBtaW5XaWR0aDogMTc1LFxyXG4gICAgICBmaWxsOiBDTEJDb25zdGFudHMuTUVURVJfUEFORUxfRklMTFxyXG4gICAgfSApICk7XHJcblxyXG4gICAgdm9sdG1ldGVyVmlzaWJsZVByb3BlcnR5LmxpbmsoIHZvbHRtZXRlclZpc2libGUgPT4ge1xyXG4gICAgICB2b2x0bWV0ZXJJY29uTm9kZS52aXNpYmxlID0gIXZvbHRtZXRlclZpc2libGU7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gdHJhY2sgdXNlciBjb250cm9sIG9mIHRoZSB2b2x0bWV0ZXIgYW5kIHBsYWNlIHRoZSB2b2x0bWV0ZXIgYmFjayBpbiB0aGUgdG9vbGJveCBpZiBib3VuZHMgY29sbGlkZVxyXG4gICAgLy8gcGFuZWwgZXhpc3RzIGZvciBsaWZldGltZSBvZiBzaW0sIG5vIG5lZWQgZm9yIGRpc3Bvc2VcclxuICAgIGlzRHJhZ2dlZFByb3BlcnR5LmxpbmsoIGlzRHJhZ2dlZCA9PiB7XHJcbiAgICAgIGlmICggIWlzRHJhZ2dlZCAmJiB0aGlzLmJvdW5kcy5pbnRlcnNlY3RzQm91bmRzKCB2b2x0bWV0ZXJOb2RlLmJvZHlOb2RlLmJvdW5kcy5lcm9kZWQoIDQwICkgKSApIHtcclxuICAgICAgICB2b2x0bWV0ZXJWaXNpYmxlUHJvcGVydHkuc2V0KCBmYWxzZSApO1xyXG4gICAgICB9XHJcbiAgICB9ICk7XHJcbiAgfVxyXG59XHJcblxyXG5jYXBhY2l0b3JMYWJCYXNpY3MucmVnaXN0ZXIoICdUb29sYm94UGFuZWwnLCBUb29sYm94UGFuZWwgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvb2xib3hQYW5lbDtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsT0FBTyxNQUFNLGtDQUFrQztBQUN0RCxPQUFPQyxLQUFLLE1BQU0sc0NBQXNDO0FBQ3hELE9BQU9DLFNBQVMsTUFBTSw2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