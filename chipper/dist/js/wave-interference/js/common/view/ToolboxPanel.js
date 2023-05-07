// Copyright 2018-2022, University of Colorado Boulder
// @ts-nocheck
/**
 * Shows the toolbox from whence tools (measuring tape, timer, probe) can be dragged.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import MeasuringTapeNode from '../../../../scenery-phet/js/MeasuringTapeNode.js';
import { DragListener, HBox, InteractiveHighlightingNode } from '../../../../scenery/js/imports.js';
import waveInterference from '../../waveInterference.js';
import WaveInterferenceConstants from '../WaveInterferenceConstants.js';
import WaveInterferencePanel from './WaveInterferencePanel.js';
class ToolboxPanel extends WaveInterferencePanel {
  constructor(measuringTapeNode, stopwatchNode, waveMeterNode, alignGroup, isMeasuringTapeInPlayAreaProperty, measuringTapeTipPositionProperty, isStopwatchVisibleProperty, isWaveMeterInPlayAreaProperty) {
    // icon for the measuring tape
    const measuringTapeIcon = MeasuringTapeNode.createIcon({
      scale: 0.65,
      tapeLength: 20
    });
    const interactiveMeasuringTapeIcon = initializeIcon(measuringTapeIcon, isMeasuringTapeInPlayAreaProperty, event => {
      // When clicking on the measuring tape icon, pop it out into the play area
      const targetPosition = this.globalToParentPoint(event.pointer.point);
      const currentPosition = measuringTapeNode.basePositionProperty.value;
      const delta = targetPosition.minus(currentPosition);
      measuringTapeNode.basePositionProperty.set(measuringTapeNode.basePositionProperty.value.plus(delta));
      measuringTapeNode.tipPositionProperty.set(measuringTapeNode.tipPositionProperty.value.plus(delta));
      measuringTapeNode.startBaseDrag(event);
      isMeasuringTapeInPlayAreaProperty.value = true;
    });

    // Node used to create the icon
    isStopwatchVisibleProperty.value = true;
    const stopwatchNodeIcon = stopwatchNode.rasterized().mutate({
      scale: 0.45
    });
    isStopwatchVisibleProperty.value = false;

    // The draggable icon, which has an overlay to make the buttons draggable instead of pressable
    const interactiveStopwatchNodeIcon = initializeIcon(stopwatchNodeIcon, isStopwatchVisibleProperty, event => {
      stopwatchNode.center = this.globalToParentPoint(event.pointer.point);

      // stopwatchNode provided as targetNode in the DragListener constructor, so this press will target it
      stopwatchNode.dragListener.press(event);
      isStopwatchVisibleProperty.value = true;
    });

    // Make sure the probes have enough breathing room so they don't get shoved into the WaveMeterNode icon.  Anything
    // above 60 seems to work equally well, closer than that causes the probes to overlap each other or the meter
    // body. The true translation is set when dragged out of the toolbox.
    waveMeterNode.backgroundNode.translate(60, 0);

    // The draggable icon, which has an overlay to make the buttons draggable instead of pressable
    // Temporarily show the node so it can be rasterized for an icon
    isWaveMeterInPlayAreaProperty.value = true;
    const waveMeterIcon = waveMeterNode.rasterized().mutate({
      scale: 0.25
    });
    isWaveMeterInPlayAreaProperty.value = false;
    const interactiveWaveMeterIcon = initializeIcon(waveMeterIcon, isWaveMeterInPlayAreaProperty, event => {
      // Fine-tuned empirically to set the drag point to be the center of the chart.
      waveMeterNode.backgroundNode.setTranslation(this.globalToParentPoint(event.pointer.point).plusXY(-60, -66));

      // Set the internal flag that indicates the probes should remain in alignment during the drag
      waveMeterNode.synchronizeProbePositions = true;
      waveMeterNode.startDrag(event);
      isWaveMeterInPlayAreaProperty.value = true;
    });

    // Layout for the toolbox
    super(alignGroup.createBox(new HBox({
      spacing: 10,
      children: [interactiveMeasuringTapeIcon, interactiveStopwatchNodeIcon, interactiveWaveMeterIcon],
      excludeInvisibleChildrenFromBounds: false
    })), {
      // Panel options
      yMargin: 9.55,
      maxWidth: WaveInterferenceConstants.PANEL_MAX_WIDTH
    });
  }
}

/**
 * Initialize the icon for use in the toolbox. Returns an InteractiveHighlightingNode so that the icon shows
 * mouse and touch highlights for accessibility to indicate that these components are interactive.
 * @param node
 * @param inPlayAreaProperty
 * @param down
 */
const initializeIcon = (node, inPlayAreaProperty, down) => {
  const interactiveIcon = new InteractiveHighlightingNode({
    children: [node],
    cursor: 'pointer'
  });
  inPlayAreaProperty.link(inPlayArea => {
    interactiveIcon.visible = !inPlayArea;
  });
  interactiveIcon.addInputListener(DragListener.createForwardingListener(down));
  return interactiveIcon;
};
waveInterference.register('ToolboxPanel', ToolboxPanel);
export default ToolboxPanel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNZWFzdXJpbmdUYXBlTm9kZSIsIkRyYWdMaXN0ZW5lciIsIkhCb3giLCJJbnRlcmFjdGl2ZUhpZ2hsaWdodGluZ05vZGUiLCJ3YXZlSW50ZXJmZXJlbmNlIiwiV2F2ZUludGVyZmVyZW5jZUNvbnN0YW50cyIsIldhdmVJbnRlcmZlcmVuY2VQYW5lbCIsIlRvb2xib3hQYW5lbCIsImNvbnN0cnVjdG9yIiwibWVhc3VyaW5nVGFwZU5vZGUiLCJzdG9wd2F0Y2hOb2RlIiwid2F2ZU1ldGVyTm9kZSIsImFsaWduR3JvdXAiLCJpc01lYXN1cmluZ1RhcGVJblBsYXlBcmVhUHJvcGVydHkiLCJtZWFzdXJpbmdUYXBlVGlwUG9zaXRpb25Qcm9wZXJ0eSIsImlzU3RvcHdhdGNoVmlzaWJsZVByb3BlcnR5IiwiaXNXYXZlTWV0ZXJJblBsYXlBcmVhUHJvcGVydHkiLCJtZWFzdXJpbmdUYXBlSWNvbiIsImNyZWF0ZUljb24iLCJzY2FsZSIsInRhcGVMZW5ndGgiLCJpbnRlcmFjdGl2ZU1lYXN1cmluZ1RhcGVJY29uIiwiaW5pdGlhbGl6ZUljb24iLCJldmVudCIsInRhcmdldFBvc2l0aW9uIiwiZ2xvYmFsVG9QYXJlbnRQb2ludCIsInBvaW50ZXIiLCJwb2ludCIsImN1cnJlbnRQb3NpdGlvbiIsImJhc2VQb3NpdGlvblByb3BlcnR5IiwidmFsdWUiLCJkZWx0YSIsIm1pbnVzIiwic2V0IiwicGx1cyIsInRpcFBvc2l0aW9uUHJvcGVydHkiLCJzdGFydEJhc2VEcmFnIiwic3RvcHdhdGNoTm9kZUljb24iLCJyYXN0ZXJpemVkIiwibXV0YXRlIiwiaW50ZXJhY3RpdmVTdG9wd2F0Y2hOb2RlSWNvbiIsImNlbnRlciIsImRyYWdMaXN0ZW5lciIsInByZXNzIiwiYmFja2dyb3VuZE5vZGUiLCJ0cmFuc2xhdGUiLCJ3YXZlTWV0ZXJJY29uIiwiaW50ZXJhY3RpdmVXYXZlTWV0ZXJJY29uIiwic2V0VHJhbnNsYXRpb24iLCJwbHVzWFkiLCJzeW5jaHJvbml6ZVByb2JlUG9zaXRpb25zIiwic3RhcnREcmFnIiwiY3JlYXRlQm94Iiwic3BhY2luZyIsImNoaWxkcmVuIiwiZXhjbHVkZUludmlzaWJsZUNoaWxkcmVuRnJvbUJvdW5kcyIsInlNYXJnaW4iLCJtYXhXaWR0aCIsIlBBTkVMX01BWF9XSURUSCIsIm5vZGUiLCJpblBsYXlBcmVhUHJvcGVydHkiLCJkb3duIiwiaW50ZXJhY3RpdmVJY29uIiwiY3Vyc29yIiwibGluayIsImluUGxheUFyZWEiLCJ2aXNpYmxlIiwiYWRkSW5wdXRMaXN0ZW5lciIsImNyZWF0ZUZvcndhcmRpbmdMaXN0ZW5lciIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiVG9vbGJveFBhbmVsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG4vLyBAdHMtbm9jaGVja1xyXG4vKipcclxuICogU2hvd3MgdGhlIHRvb2xib3ggZnJvbSB3aGVuY2UgdG9vbHMgKG1lYXN1cmluZyB0YXBlLCB0aW1lciwgcHJvYmUpIGNhbiBiZSBkcmFnZ2VkLlxyXG4gKlxyXG4gKiBAYXV0aG9yIFNhbSBSZWlkIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBNZWFzdXJpbmdUYXBlTm9kZSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMvTWVhc3VyaW5nVGFwZU5vZGUuanMnO1xyXG5pbXBvcnQgU3RvcHdhdGNoTm9kZSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMvU3RvcHdhdGNoTm9kZS5qcyc7XHJcbmltcG9ydCBUUmVhZE9ubHlQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL1RSZWFkT25seVByb3BlcnR5LmpzJztcclxuaW1wb3J0IHsgQWxpZ25Hcm91cCwgRHJhZ0xpc3RlbmVyLCBIQm94LCBJbnRlcmFjdGl2ZUhpZ2hsaWdodGluZ05vZGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgd2F2ZUludGVyZmVyZW5jZSBmcm9tICcuLi8uLi93YXZlSW50ZXJmZXJlbmNlLmpzJztcclxuaW1wb3J0IFdhdmVJbnRlcmZlcmVuY2VDb25zdGFudHMgZnJvbSAnLi4vV2F2ZUludGVyZmVyZW5jZUNvbnN0YW50cy5qcyc7XHJcbmltcG9ydCBXYXZlSW50ZXJmZXJlbmNlUGFuZWwgZnJvbSAnLi9XYXZlSW50ZXJmZXJlbmNlUGFuZWwuanMnO1xyXG5pbXBvcnQgV2F2ZU1ldGVyTm9kZSBmcm9tICcuL1dhdmVNZXRlck5vZGUuanMnO1xyXG5cclxuY2xhc3MgVG9vbGJveFBhbmVsIGV4dGVuZHMgV2F2ZUludGVyZmVyZW5jZVBhbmVsIHtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBtZWFzdXJpbmdUYXBlTm9kZTogTWVhc3VyaW5nVGFwZU5vZGUsIHN0b3B3YXRjaE5vZGU6IFN0b3B3YXRjaE5vZGUsIHdhdmVNZXRlck5vZGU6IFdhdmVNZXRlck5vZGUsIGFsaWduR3JvdXA6IEFsaWduR3JvdXAsIGlzTWVhc3VyaW5nVGFwZUluUGxheUFyZWFQcm9wZXJ0eTogVFJlYWRPbmx5UHJvcGVydHk8Ym9vbGVhbj4sXHJcbiAgICAgICAgICAgICAgICAgICAgICBtZWFzdXJpbmdUYXBlVGlwUG9zaXRpb25Qcm9wZXJ0eTogVFJlYWRPbmx5UHJvcGVydHk8VmVjdG9yMj4sIGlzU3RvcHdhdGNoVmlzaWJsZVByb3BlcnR5OiBUUmVhZE9ubHlQcm9wZXJ0eTxib29sZWFuPiwgaXNXYXZlTWV0ZXJJblBsYXlBcmVhUHJvcGVydHk6IFRSZWFkT25seVByb3BlcnR5PGJvb2xlYW4+ICkge1xyXG5cclxuICAgIC8vIGljb24gZm9yIHRoZSBtZWFzdXJpbmcgdGFwZVxyXG4gICAgY29uc3QgbWVhc3VyaW5nVGFwZUljb24gPSBNZWFzdXJpbmdUYXBlTm9kZS5jcmVhdGVJY29uKCB7XHJcbiAgICAgIHNjYWxlOiAwLjY1LFxyXG4gICAgICB0YXBlTGVuZ3RoOiAyMFxyXG4gICAgfSApO1xyXG5cclxuICAgIGNvbnN0IGludGVyYWN0aXZlTWVhc3VyaW5nVGFwZUljb24gPSBpbml0aWFsaXplSWNvbiggbWVhc3VyaW5nVGFwZUljb24sIGlzTWVhc3VyaW5nVGFwZUluUGxheUFyZWFQcm9wZXJ0eSwgZXZlbnQgPT4ge1xyXG5cclxuICAgICAgLy8gV2hlbiBjbGlja2luZyBvbiB0aGUgbWVhc3VyaW5nIHRhcGUgaWNvbiwgcG9wIGl0IG91dCBpbnRvIHRoZSBwbGF5IGFyZWFcclxuICAgICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSB0aGlzLmdsb2JhbFRvUGFyZW50UG9pbnQoIGV2ZW50LnBvaW50ZXIucG9pbnQgKTtcclxuICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gbWVhc3VyaW5nVGFwZU5vZGUuYmFzZVBvc2l0aW9uUHJvcGVydHkudmFsdWU7XHJcbiAgICAgIGNvbnN0IGRlbHRhID0gdGFyZ2V0UG9zaXRpb24ubWludXMoIGN1cnJlbnRQb3NpdGlvbiApO1xyXG4gICAgICBtZWFzdXJpbmdUYXBlTm9kZS5iYXNlUG9zaXRpb25Qcm9wZXJ0eS5zZXQoIG1lYXN1cmluZ1RhcGVOb2RlLmJhc2VQb3NpdGlvblByb3BlcnR5LnZhbHVlLnBsdXMoIGRlbHRhICkgKTtcclxuICAgICAgbWVhc3VyaW5nVGFwZU5vZGUudGlwUG9zaXRpb25Qcm9wZXJ0eS5zZXQoIG1lYXN1cmluZ1RhcGVOb2RlLnRpcFBvc2l0aW9uUHJvcGVydHkudmFsdWUucGx1cyggZGVsdGEgKSApO1xyXG4gICAgICBtZWFzdXJpbmdUYXBlTm9kZS5zdGFydEJhc2VEcmFnKCBldmVudCApO1xyXG4gICAgICBpc01lYXN1cmluZ1RhcGVJblBsYXlBcmVhUHJvcGVydHkudmFsdWUgPSB0cnVlO1xyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIE5vZGUgdXNlZCB0byBjcmVhdGUgdGhlIGljb25cclxuICAgIGlzU3RvcHdhdGNoVmlzaWJsZVByb3BlcnR5LnZhbHVlID0gdHJ1ZTtcclxuICAgIGNvbnN0IHN0b3B3YXRjaE5vZGVJY29uID0gc3RvcHdhdGNoTm9kZS5yYXN0ZXJpemVkKCkubXV0YXRlKCB7IHNjYWxlOiAwLjQ1IH0gKTtcclxuICAgIGlzU3RvcHdhdGNoVmlzaWJsZVByb3BlcnR5LnZhbHVlID0gZmFsc2U7XHJcblxyXG4gICAgLy8gVGhlIGRyYWdnYWJsZSBpY29uLCB3aGljaCBoYXMgYW4gb3ZlcmxheSB0byBtYWtlIHRoZSBidXR0b25zIGRyYWdnYWJsZSBpbnN0ZWFkIG9mIHByZXNzYWJsZVxyXG4gICAgY29uc3QgaW50ZXJhY3RpdmVTdG9wd2F0Y2hOb2RlSWNvbiA9IGluaXRpYWxpemVJY29uKCBzdG9wd2F0Y2hOb2RlSWNvbiwgaXNTdG9wd2F0Y2hWaXNpYmxlUHJvcGVydHksIGV2ZW50ID0+IHtcclxuICAgICAgc3RvcHdhdGNoTm9kZS5jZW50ZXIgPSB0aGlzLmdsb2JhbFRvUGFyZW50UG9pbnQoIGV2ZW50LnBvaW50ZXIucG9pbnQgKTtcclxuXHJcbiAgICAgIC8vIHN0b3B3YXRjaE5vZGUgcHJvdmlkZWQgYXMgdGFyZ2V0Tm9kZSBpbiB0aGUgRHJhZ0xpc3RlbmVyIGNvbnN0cnVjdG9yLCBzbyB0aGlzIHByZXNzIHdpbGwgdGFyZ2V0IGl0XHJcbiAgICAgIHN0b3B3YXRjaE5vZGUuZHJhZ0xpc3RlbmVyLnByZXNzKCBldmVudCApO1xyXG4gICAgICBpc1N0b3B3YXRjaFZpc2libGVQcm9wZXJ0eS52YWx1ZSA9IHRydWU7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gTWFrZSBzdXJlIHRoZSBwcm9iZXMgaGF2ZSBlbm91Z2ggYnJlYXRoaW5nIHJvb20gc28gdGhleSBkb24ndCBnZXQgc2hvdmVkIGludG8gdGhlIFdhdmVNZXRlck5vZGUgaWNvbi4gIEFueXRoaW5nXHJcbiAgICAvLyBhYm92ZSA2MCBzZWVtcyB0byB3b3JrIGVxdWFsbHkgd2VsbCwgY2xvc2VyIHRoYW4gdGhhdCBjYXVzZXMgdGhlIHByb2JlcyB0byBvdmVybGFwIGVhY2ggb3RoZXIgb3IgdGhlIG1ldGVyXHJcbiAgICAvLyBib2R5LiBUaGUgdHJ1ZSB0cmFuc2xhdGlvbiBpcyBzZXQgd2hlbiBkcmFnZ2VkIG91dCBvZiB0aGUgdG9vbGJveC5cclxuICAgIHdhdmVNZXRlck5vZGUuYmFja2dyb3VuZE5vZGUudHJhbnNsYXRlKCA2MCwgMCApO1xyXG5cclxuICAgIC8vIFRoZSBkcmFnZ2FibGUgaWNvbiwgd2hpY2ggaGFzIGFuIG92ZXJsYXkgdG8gbWFrZSB0aGUgYnV0dG9ucyBkcmFnZ2FibGUgaW5zdGVhZCBvZiBwcmVzc2FibGVcclxuICAgIC8vIFRlbXBvcmFyaWx5IHNob3cgdGhlIG5vZGUgc28gaXQgY2FuIGJlIHJhc3Rlcml6ZWQgZm9yIGFuIGljb25cclxuICAgIGlzV2F2ZU1ldGVySW5QbGF5QXJlYVByb3BlcnR5LnZhbHVlID0gdHJ1ZTtcclxuICAgIGNvbnN0IHdhdmVNZXRlckljb24gPSB3YXZlTWV0ZXJOb2RlLnJhc3Rlcml6ZWQoKS5tdXRhdGUoIHsgc2NhbGU6IDAuMjUgfSApO1xyXG4gICAgaXNXYXZlTWV0ZXJJblBsYXlBcmVhUHJvcGVydHkudmFsdWUgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBpbnRlcmFjdGl2ZVdhdmVNZXRlckljb24gPSBpbml0aWFsaXplSWNvbiggd2F2ZU1ldGVySWNvbiwgaXNXYXZlTWV0ZXJJblBsYXlBcmVhUHJvcGVydHksIGV2ZW50ID0+IHtcclxuXHJcbiAgICAgIC8vIEZpbmUtdHVuZWQgZW1waXJpY2FsbHkgdG8gc2V0IHRoZSBkcmFnIHBvaW50IHRvIGJlIHRoZSBjZW50ZXIgb2YgdGhlIGNoYXJ0LlxyXG4gICAgICB3YXZlTWV0ZXJOb2RlLmJhY2tncm91bmROb2RlLnNldFRyYW5zbGF0aW9uKCB0aGlzLmdsb2JhbFRvUGFyZW50UG9pbnQoIGV2ZW50LnBvaW50ZXIucG9pbnQgKS5wbHVzWFkoIC02MCwgLTY2ICkgKTtcclxuXHJcbiAgICAgIC8vIFNldCB0aGUgaW50ZXJuYWwgZmxhZyB0aGF0IGluZGljYXRlcyB0aGUgcHJvYmVzIHNob3VsZCByZW1haW4gaW4gYWxpZ25tZW50IGR1cmluZyB0aGUgZHJhZ1xyXG4gICAgICB3YXZlTWV0ZXJOb2RlLnN5bmNocm9uaXplUHJvYmVQb3NpdGlvbnMgPSB0cnVlO1xyXG4gICAgICB3YXZlTWV0ZXJOb2RlLnN0YXJ0RHJhZyggZXZlbnQgKTtcclxuICAgICAgaXNXYXZlTWV0ZXJJblBsYXlBcmVhUHJvcGVydHkudmFsdWUgPSB0cnVlO1xyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIExheW91dCBmb3IgdGhlIHRvb2xib3hcclxuICAgIHN1cGVyKCBhbGlnbkdyb3VwLmNyZWF0ZUJveCggbmV3IEhCb3goIHtcclxuICAgICAgICBzcGFjaW5nOiAxMCxcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgaW50ZXJhY3RpdmVNZWFzdXJpbmdUYXBlSWNvbixcclxuICAgICAgICAgIGludGVyYWN0aXZlU3RvcHdhdGNoTm9kZUljb24sXHJcbiAgICAgICAgICBpbnRlcmFjdGl2ZVdhdmVNZXRlckljb25cclxuICAgICAgICBdLFxyXG4gICAgICAgIGV4Y2x1ZGVJbnZpc2libGVDaGlsZHJlbkZyb21Cb3VuZHM6IGZhbHNlXHJcbiAgICAgIH0gKSApLCB7XHJcblxyXG4gICAgICAgIC8vIFBhbmVsIG9wdGlvbnNcclxuICAgICAgICB5TWFyZ2luOiA5LjU1LFxyXG4gICAgICAgIG1heFdpZHRoOiBXYXZlSW50ZXJmZXJlbmNlQ29uc3RhbnRzLlBBTkVMX01BWF9XSURUSFxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIGljb24gZm9yIHVzZSBpbiB0aGUgdG9vbGJveC4gUmV0dXJucyBhbiBJbnRlcmFjdGl2ZUhpZ2hsaWdodGluZ05vZGUgc28gdGhhdCB0aGUgaWNvbiBzaG93c1xyXG4gKiBtb3VzZSBhbmQgdG91Y2ggaGlnaGxpZ2h0cyBmb3IgYWNjZXNzaWJpbGl0eSB0byBpbmRpY2F0ZSB0aGF0IHRoZXNlIGNvbXBvbmVudHMgYXJlIGludGVyYWN0aXZlLlxyXG4gKiBAcGFyYW0gbm9kZVxyXG4gKiBAcGFyYW0gaW5QbGF5QXJlYVByb3BlcnR5XHJcbiAqIEBwYXJhbSBkb3duXHJcbiAqL1xyXG5jb25zdCBpbml0aWFsaXplSWNvbiA9ICggbm9kZSwgaW5QbGF5QXJlYVByb3BlcnR5LCBkb3duICkgPT4ge1xyXG4gIGNvbnN0IGludGVyYWN0aXZlSWNvbiA9IG5ldyBJbnRlcmFjdGl2ZUhpZ2hsaWdodGluZ05vZGUoIHtcclxuICAgIGNoaWxkcmVuOiBbIG5vZGUgXSxcclxuICAgIGN1cnNvcjogJ3BvaW50ZXInXHJcbiAgfSApO1xyXG5cclxuICBpblBsYXlBcmVhUHJvcGVydHkubGluayggaW5QbGF5QXJlYSA9PiB7IGludGVyYWN0aXZlSWNvbi52aXNpYmxlID0gIWluUGxheUFyZWE7IH0gKTtcclxuICBpbnRlcmFjdGl2ZUljb24uYWRkSW5wdXRMaXN0ZW5lciggRHJhZ0xpc3RlbmVyLmNyZWF0ZUZvcndhcmRpbmdMaXN0ZW5lciggZG93biApICk7XHJcblxyXG4gIHJldHVybiBpbnRlcmFjdGl2ZUljb247XHJcbn07XHJcblxyXG53YXZlSW50ZXJmZXJlbmNlLnJlZ2lzdGVyKCAnVG9vbGJveFBhbmVsJywgVG9vbGJveFBhbmVsICk7XHJcbmV4cG9ydCBkZWZhdWx0IFRvb2xib3hQYW5lbDtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxpQkFBaUIsTUFBTSxrREFBa0Q7QUFHaEYsU0FBcUJDLFlBQVksRUFBRUMsSUFBSSxFQUFFQywyQkFBMkIsUUFBUSxtQ0FBbUM7QUFFL0csT0FBT0MsZ0JBQWdCLE1BQU0sMkJBQTJCO0FBQ3hELE9BQU9DLHlCQUF5QixNQUFNLGlDQUFpQztBQUN2RSxPQUFPQyxxQkFBcUIsTUFBTSw0QkFBNEI7QUFHOUQsTUFBTUMsWUFBWSxTQUFTRCxxQkFBcUIsQ0FBQztFQUV4Q0UsV0FBV0EsQ0FBRUMsaUJBQW9DLEVBQUVDLGFBQTRCLEVBQUVDLGFBQTRCLEVBQUVDLFVBQXNCLEVBQUVDLGlDQUE2RCxFQUN2TEMsZ0NBQTRELEVBQUVDLDBCQUFzRCxFQUFFQyw2QkFBeUQsRUFBRztJQUVwTTtJQUNBLE1BQU1DLGlCQUFpQixHQUFHakIsaUJBQWlCLENBQUNrQixVQUFVLENBQUU7TUFDdERDLEtBQUssRUFBRSxJQUFJO01BQ1hDLFVBQVUsRUFBRTtJQUNkLENBQUUsQ0FBQztJQUVILE1BQU1DLDRCQUE0QixHQUFHQyxjQUFjLENBQUVMLGlCQUFpQixFQUFFSixpQ0FBaUMsRUFBRVUsS0FBSyxJQUFJO01BRWxIO01BQ0EsTUFBTUMsY0FBYyxHQUFHLElBQUksQ0FBQ0MsbUJBQW1CLENBQUVGLEtBQUssQ0FBQ0csT0FBTyxDQUFDQyxLQUFNLENBQUM7TUFDdEUsTUFBTUMsZUFBZSxHQUFHbkIsaUJBQWlCLENBQUNvQixvQkFBb0IsQ0FBQ0MsS0FBSztNQUNwRSxNQUFNQyxLQUFLLEdBQUdQLGNBQWMsQ0FBQ1EsS0FBSyxDQUFFSixlQUFnQixDQUFDO01BQ3JEbkIsaUJBQWlCLENBQUNvQixvQkFBb0IsQ0FBQ0ksR0FBRyxDQUFFeEIsaUJBQWlCLENBQUNvQixvQkFBb0IsQ0FBQ0MsS0FBSyxDQUFDSSxJQUFJLENBQUVILEtBQU0sQ0FBRSxDQUFDO01BQ3hHdEIsaUJBQWlCLENBQUMwQixtQkFBbUIsQ0FBQ0YsR0FBRyxDQUFFeEIsaUJBQWlCLENBQUMwQixtQkFBbUIsQ0FBQ0wsS0FBSyxDQUFDSSxJQUFJLENBQUVILEtBQU0sQ0FBRSxDQUFDO01BQ3RHdEIsaUJBQWlCLENBQUMyQixhQUFhLENBQUViLEtBQU0sQ0FBQztNQUN4Q1YsaUNBQWlDLENBQUNpQixLQUFLLEdBQUcsSUFBSTtJQUNoRCxDQUFFLENBQUM7O0lBRUg7SUFDQWYsMEJBQTBCLENBQUNlLEtBQUssR0FBRyxJQUFJO0lBQ3ZDLE1BQU1PLGlCQUFpQixHQUFHM0IsYUFBYSxDQUFDNEIsVUFBVSxDQUFDLENBQUMsQ0FBQ0MsTUFBTSxDQUFFO01BQUVwQixLQUFLLEVBQUU7SUFBSyxDQUFFLENBQUM7SUFDOUVKLDBCQUEwQixDQUFDZSxLQUFLLEdBQUcsS0FBSzs7SUFFeEM7SUFDQSxNQUFNVSw0QkFBNEIsR0FBR2xCLGNBQWMsQ0FBRWUsaUJBQWlCLEVBQUV0QiwwQkFBMEIsRUFBRVEsS0FBSyxJQUFJO01BQzNHYixhQUFhLENBQUMrQixNQUFNLEdBQUcsSUFBSSxDQUFDaEIsbUJBQW1CLENBQUVGLEtBQUssQ0FBQ0csT0FBTyxDQUFDQyxLQUFNLENBQUM7O01BRXRFO01BQ0FqQixhQUFhLENBQUNnQyxZQUFZLENBQUNDLEtBQUssQ0FBRXBCLEtBQU0sQ0FBQztNQUN6Q1IsMEJBQTBCLENBQUNlLEtBQUssR0FBRyxJQUFJO0lBQ3pDLENBQUUsQ0FBQzs7SUFFSDtJQUNBO0lBQ0E7SUFDQW5CLGFBQWEsQ0FBQ2lDLGNBQWMsQ0FBQ0MsU0FBUyxDQUFFLEVBQUUsRUFBRSxDQUFFLENBQUM7O0lBRS9DO0lBQ0E7SUFDQTdCLDZCQUE2QixDQUFDYyxLQUFLLEdBQUcsSUFBSTtJQUMxQyxNQUFNZ0IsYUFBYSxHQUFHbkMsYUFBYSxDQUFDMkIsVUFBVSxDQUFDLENBQUMsQ0FBQ0MsTUFBTSxDQUFFO01BQUVwQixLQUFLLEVBQUU7SUFBSyxDQUFFLENBQUM7SUFDMUVILDZCQUE2QixDQUFDYyxLQUFLLEdBQUcsS0FBSztJQUUzQyxNQUFNaUIsd0JBQXdCLEdBQUd6QixjQUFjLENBQUV3QixhQUFhLEVBQUU5Qiw2QkFBNkIsRUFBRU8sS0FBSyxJQUFJO01BRXRHO01BQ0FaLGFBQWEsQ0FBQ2lDLGNBQWMsQ0FBQ0ksY0FBYyxDQUFFLElBQUksQ0FBQ3ZCLG1CQUFtQixDQUFFRixLQUFLLENBQUNHLE9BQU8sQ0FBQ0MsS0FBTSxDQUFDLENBQUNzQixNQUFNLENBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFHLENBQUUsQ0FBQzs7TUFFakg7TUFDQXRDLGFBQWEsQ0FBQ3VDLHlCQUF5QixHQUFHLElBQUk7TUFDOUN2QyxhQUFhLENBQUN3QyxTQUFTLENBQUU1QixLQUFNLENBQUM7TUFDaENQLDZCQUE2QixDQUFDYyxLQUFLLEdBQUcsSUFBSTtJQUM1QyxDQUFFLENBQUM7O0lBRUg7SUFDQSxLQUFLLENBQUVsQixVQUFVLENBQUN3QyxTQUFTLENBQUUsSUFBSWxELElBQUksQ0FBRTtNQUNuQ21ELE9BQU8sRUFBRSxFQUFFO01BQ1hDLFFBQVEsRUFBRSxDQUNSakMsNEJBQTRCLEVBQzVCbUIsNEJBQTRCLEVBQzVCTyx3QkFBd0IsQ0FDekI7TUFDRFEsa0NBQWtDLEVBQUU7SUFDdEMsQ0FBRSxDQUFFLENBQUMsRUFBRTtNQUVMO01BQ0FDLE9BQU8sRUFBRSxJQUFJO01BQ2JDLFFBQVEsRUFBRXBELHlCQUF5QixDQUFDcUQ7SUFDdEMsQ0FDRixDQUFDO0VBQ0g7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU1wQyxjQUFjLEdBQUdBLENBQUVxQyxJQUFJLEVBQUVDLGtCQUFrQixFQUFFQyxJQUFJLEtBQU07RUFDM0QsTUFBTUMsZUFBZSxHQUFHLElBQUkzRCwyQkFBMkIsQ0FBRTtJQUN2RG1ELFFBQVEsRUFBRSxDQUFFSyxJQUFJLENBQUU7SUFDbEJJLE1BQU0sRUFBRTtFQUNWLENBQUUsQ0FBQztFQUVISCxrQkFBa0IsQ0FBQ0ksSUFBSSxDQUFFQyxVQUFVLElBQUk7SUFBRUgsZUFBZSxDQUFDSSxPQUFPLEdBQUcsQ0FBQ0QsVUFBVTtFQUFFLENBQUUsQ0FBQztFQUNuRkgsZUFBZSxDQUFDSyxnQkFBZ0IsQ0FBRWxFLFlBQVksQ0FBQ21FLHdCQUF3QixDQUFFUCxJQUFLLENBQUUsQ0FBQztFQUVqRixPQUFPQyxlQUFlO0FBQ3hCLENBQUM7QUFFRDFELGdCQUFnQixDQUFDaUUsUUFBUSxDQUFFLGNBQWMsRUFBRTlELFlBQWEsQ0FBQztBQUN6RCxlQUFlQSxZQUFZIn0=