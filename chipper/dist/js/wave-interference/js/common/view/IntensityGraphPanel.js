// Copyright 2018-2022, University of Colorado Boulder
// @ts-nocheck
/**
 * Shows a graph of intensity as a function of position at the right-side of the lattice (when selected).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import Utils from '../../../../dot/js/Utils.js';
import { Shape } from '../../../../kite/js/imports.js';
import MagnifyingGlassZoomButtonGroup from '../../../../scenery-phet/js/MagnifyingGlassZoomButtonGroup.js';
import { Color, Line, Node, Path, Rectangle } from '../../../../scenery/js/imports.js';
import ColorConstants from '../../../../sun/js/ColorConstants.js';
import waveInterference from '../../waveInterference.js';
import WaveInterferenceStrings from '../../WaveInterferenceStrings.js';
import WaveInterferenceConstants from '../WaveInterferenceConstants.js';
import WaveInterferencePanel from './WaveInterferencePanel.js';
import WaveInterferenceText from './WaveInterferenceText.js';
const intensityString = WaveInterferenceStrings.intensity;

// constants
const TITLE_Y_MARGIN = 4;
const DARK_GRAY = new Color(90, 90, 90);
const LINE_DASH = [9.1, 9.1];
const CHART_WIDTH = 100;
class IntensityGraphPanel extends WaveInterferencePanel {
  /**
   * @param graphHeight - the height of the graph in view coordinates
   * @param intensitySample - values for the intensity
   * @param numberGridLines - how many vertical grid lines to show
   * @param resetEmitter - emits when the sim is reset
   * @param [options]
   */
  constructor(graphHeight, intensitySample, numberGridLines, resetEmitter, options) {
    const chartRectangle = new Rectangle(0, 0, CHART_WIDTH, graphHeight, {
      fill: 'white',
      stroke: 'black',
      lineWidth: 1
    });

    /**
     * Creates a line on the given y-coordinate.
     */
    const createLine = (index, y) => new Line(chartRectangle.left, y, chartRectangle.right, y, {
      stroke: index % 2 === 0 ? DARK_GRAY : 'lightGray',
      lineDash: LINE_DASH // Solid part touches each edge
    });

    for (let i = 0; i < numberGridLines; i++) {
      const yTop = Utils.linear(0, numberGridLines, chartRectangle.centerY, chartRectangle.top, i);
      const yBottom = Utils.linear(0, numberGridLines, chartRectangle.centerY, chartRectangle.bottom, i);
      chartRectangle.addChild(createLine(i, yTop));
      if (i !== 0) {
        chartRectangle.addChild(createLine(i, yBottom));
      }
    }
    chartRectangle.addChild(new Line(chartRectangle.centerX, chartRectangle.bottom, chartRectangle.centerX, chartRectangle.top, {
      stroke: DARK_GRAY,
      lineDash: LINE_DASH
    }));
    const titleNode = new WaveInterferenceText(intensityString, {
      maxWidth: CHART_WIDTH,
      centerX: chartRectangle.centerX,
      top: chartRectangle.bottom + TITLE_Y_MARGIN
    });
    const clipArea = Shape.rectangle(0, 0, CHART_WIDTH, graphHeight);
    const curve = new Path(null, {
      stroke: 'black',
      lineWidth: 2,
      // Prevent rendering outside the charting area
      clipArea: clipArea
    });

    // Prevent recomputing the bounds of the curve at each time step to improve performance
    curve.computeShapeBounds = () => chartRectangle.bounds;

    // Support for zoom in/out
    const zoomRange = new RangeWithValue(1, 5, 3);
    const zoomLevelProperty = new NumberProperty(zoomRange.defaultValue, {
      range: zoomRange
    });

    // Reset zoom level when sim is reset
    resetEmitter.addListener(() => zoomLevelProperty.reset());
    const zoomButtonGroup = new MagnifyingGlassZoomButtonGroup(zoomLevelProperty, {
      spacing: 35,
      top: titleNode.bottom + 13,
      buttonOptions: {
        baseColor: ColorConstants.LIGHT_BLUE
      },
      magnifyingGlassNodeOptions: {
        glassRadius: 6
      }
    });
    const chartNode = new Node({
      children: [chartRectangle, curve, titleNode, zoomButtonGroup]
    });
    super(chartNode, options);

    // @private
    this.chartRectangle = chartRectangle;
    const updateChart = () => {
      const intensityValues = intensitySample.getIntensityValues();
      const shape = new Shape();
      for (let i = 0; i < intensityValues.length; i++) {
        // default scaling is 2
        const SCALING = Utils.linear(zoomRange.min, zoomRange.max, 0.5, 3.5, zoomLevelProperty.value);
        const intensityPlotValue = Utils.linear(0, WaveInterferenceConstants.MAX_AMPLITUDE_TO_PLOT_ON_RIGHT, 0, CHART_WIDTH * SCALING, intensityValues[i]);
        const positionPlotValue = Utils.linear(0, intensityValues.length - 1, chartRectangle.top, chartRectangle.bottom, i);
        shape.lineTo(intensityPlotValue, positionPlotValue);
      }

      // Add an extension (that will be invisible due to clipping) that has been observed to trick Firefox into
      // increasing its "dirty bounds" area for the shape changes, to prevent duplicate lines from appearing, see
      // https://github.com/phetsims/wave-interference/issues/235.  Perhaps one day when Firefox clipping/svg gets
      // the bounds computation correct, this workaround could be removed.
      shape.lineToRelative(50, 50).lineToRelative(-100, 0);
      curve.shape = shape;
    };
    intensitySample.changedEmitter.addListener(updateChart);
    zoomLevelProperty.link(updateChart);
  }

  /**
   * Returns the bounds of the chart background in the global coordinate frame, used to align the LightScreenNode
   */
  getChartGlobalBounds() {
    return this.chartRectangle.globalBounds;
  }
}
waveInterference.register('IntensityGraphPanel', IntensityGraphPanel);
export default IntensityGraphPanel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJOdW1iZXJQcm9wZXJ0eSIsIlJhbmdlV2l0aFZhbHVlIiwiVXRpbHMiLCJTaGFwZSIsIk1hZ25pZnlpbmdHbGFzc1pvb21CdXR0b25Hcm91cCIsIkNvbG9yIiwiTGluZSIsIk5vZGUiLCJQYXRoIiwiUmVjdGFuZ2xlIiwiQ29sb3JDb25zdGFudHMiLCJ3YXZlSW50ZXJmZXJlbmNlIiwiV2F2ZUludGVyZmVyZW5jZVN0cmluZ3MiLCJXYXZlSW50ZXJmZXJlbmNlQ29uc3RhbnRzIiwiV2F2ZUludGVyZmVyZW5jZVBhbmVsIiwiV2F2ZUludGVyZmVyZW5jZVRleHQiLCJpbnRlbnNpdHlTdHJpbmciLCJpbnRlbnNpdHkiLCJUSVRMRV9ZX01BUkdJTiIsIkRBUktfR1JBWSIsIkxJTkVfREFTSCIsIkNIQVJUX1dJRFRIIiwiSW50ZW5zaXR5R3JhcGhQYW5lbCIsImNvbnN0cnVjdG9yIiwiZ3JhcGhIZWlnaHQiLCJpbnRlbnNpdHlTYW1wbGUiLCJudW1iZXJHcmlkTGluZXMiLCJyZXNldEVtaXR0ZXIiLCJvcHRpb25zIiwiY2hhcnRSZWN0YW5nbGUiLCJmaWxsIiwic3Ryb2tlIiwibGluZVdpZHRoIiwiY3JlYXRlTGluZSIsImluZGV4IiwieSIsImxlZnQiLCJyaWdodCIsImxpbmVEYXNoIiwiaSIsInlUb3AiLCJsaW5lYXIiLCJjZW50ZXJZIiwidG9wIiwieUJvdHRvbSIsImJvdHRvbSIsImFkZENoaWxkIiwiY2VudGVyWCIsInRpdGxlTm9kZSIsIm1heFdpZHRoIiwiY2xpcEFyZWEiLCJyZWN0YW5nbGUiLCJjdXJ2ZSIsImNvbXB1dGVTaGFwZUJvdW5kcyIsImJvdW5kcyIsInpvb21SYW5nZSIsInpvb21MZXZlbFByb3BlcnR5IiwiZGVmYXVsdFZhbHVlIiwicmFuZ2UiLCJhZGRMaXN0ZW5lciIsInJlc2V0Iiwiem9vbUJ1dHRvbkdyb3VwIiwic3BhY2luZyIsImJ1dHRvbk9wdGlvbnMiLCJiYXNlQ29sb3IiLCJMSUdIVF9CTFVFIiwibWFnbmlmeWluZ0dsYXNzTm9kZU9wdGlvbnMiLCJnbGFzc1JhZGl1cyIsImNoYXJ0Tm9kZSIsImNoaWxkcmVuIiwidXBkYXRlQ2hhcnQiLCJpbnRlbnNpdHlWYWx1ZXMiLCJnZXRJbnRlbnNpdHlWYWx1ZXMiLCJzaGFwZSIsImxlbmd0aCIsIlNDQUxJTkciLCJtaW4iLCJtYXgiLCJ2YWx1ZSIsImludGVuc2l0eVBsb3RWYWx1ZSIsIk1BWF9BTVBMSVRVREVfVE9fUExPVF9PTl9SSUdIVCIsInBvc2l0aW9uUGxvdFZhbHVlIiwibGluZVRvIiwibGluZVRvUmVsYXRpdmUiLCJjaGFuZ2VkRW1pdHRlciIsImxpbmsiLCJnZXRDaGFydEdsb2JhbEJvdW5kcyIsImdsb2JhbEJvdW5kcyIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiSW50ZW5zaXR5R3JhcGhQYW5lbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuLy8gQHRzLW5vY2hlY2tcclxuLyoqXHJcbiAqIFNob3dzIGEgZ3JhcGggb2YgaW50ZW5zaXR5IGFzIGEgZnVuY3Rpb24gb2YgcG9zaXRpb24gYXQgdGhlIHJpZ2h0LXNpZGUgb2YgdGhlIGxhdHRpY2UgKHdoZW4gc2VsZWN0ZWQpLlxyXG4gKlxyXG4gKiBAYXV0aG9yIFNhbSBSZWlkIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBOdW1iZXJQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL051bWJlclByb3BlcnR5LmpzJztcclxuaW1wb3J0IEJvdW5kczIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL0JvdW5kczIuanMnO1xyXG5pbXBvcnQgUmFuZ2VXaXRoVmFsdWUgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1JhbmdlV2l0aFZhbHVlLmpzJztcclxuaW1wb3J0IEVtcHR5U2VsZk9wdGlvbnMgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL3R5cGVzL2pzL0VtcHR5U2VsZk9wdGlvbnMuanMnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1V0aWxzLmpzJztcclxuaW1wb3J0IEVtaXR0ZXIgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9FbWl0dGVyLmpzJztcclxuaW1wb3J0IHsgU2hhcGUgfSBmcm9tICcuLi8uLi8uLi8uLi9raXRlL2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgTWFnbmlmeWluZ0dsYXNzWm9vbUJ1dHRvbkdyb3VwIGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnktcGhldC9qcy9NYWduaWZ5aW5nR2xhc3Nab29tQnV0dG9uR3JvdXAuanMnO1xyXG5pbXBvcnQgeyBDb2xvciwgTGluZSwgTm9kZSwgUGF0aCwgUmVjdGFuZ2xlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IENvbG9yQ29uc3RhbnRzIGZyb20gJy4uLy4uLy4uLy4uL3N1bi9qcy9Db2xvckNvbnN0YW50cy5qcyc7XHJcbmltcG9ydCB3YXZlSW50ZXJmZXJlbmNlIGZyb20gJy4uLy4uL3dhdmVJbnRlcmZlcmVuY2UuanMnO1xyXG5pbXBvcnQgV2F2ZUludGVyZmVyZW5jZVN0cmluZ3MgZnJvbSAnLi4vLi4vV2F2ZUludGVyZmVyZW5jZVN0cmluZ3MuanMnO1xyXG5pbXBvcnQgV2F2ZUludGVyZmVyZW5jZUNvbnN0YW50cyBmcm9tICcuLi9XYXZlSW50ZXJmZXJlbmNlQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IFdhdmVJbnRlcmZlcmVuY2VQYW5lbCBmcm9tICcuL1dhdmVJbnRlcmZlcmVuY2VQYW5lbC5qcyc7XHJcbmltcG9ydCBXYXZlSW50ZXJmZXJlbmNlVGV4dCBmcm9tICcuL1dhdmVJbnRlcmZlcmVuY2VUZXh0LmpzJztcclxuXHJcbmNvbnN0IGludGVuc2l0eVN0cmluZyA9IFdhdmVJbnRlcmZlcmVuY2VTdHJpbmdzLmludGVuc2l0eTtcclxuXHJcbi8vIGNvbnN0YW50c1xyXG5jb25zdCBUSVRMRV9ZX01BUkdJTiA9IDQ7XHJcbmNvbnN0IERBUktfR1JBWSA9IG5ldyBDb2xvciggOTAsIDkwLCA5MCApO1xyXG5jb25zdCBMSU5FX0RBU0ggPSBbIDkuMSwgOS4xIF07XHJcbmNvbnN0IENIQVJUX1dJRFRIID0gMTAwO1xyXG5cclxudHlwZSBJbnRlbnNpdHlHcmFwaFBhbmVsT3B0aW9ucyA9IEVtcHR5U2VsZk9wdGlvbnM7XHJcblxyXG5jbGFzcyBJbnRlbnNpdHlHcmFwaFBhbmVsIGV4dGVuZHMgV2F2ZUludGVyZmVyZW5jZVBhbmVsIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGdyYXBoSGVpZ2h0IC0gdGhlIGhlaWdodCBvZiB0aGUgZ3JhcGggaW4gdmlldyBjb29yZGluYXRlc1xyXG4gICAqIEBwYXJhbSBpbnRlbnNpdHlTYW1wbGUgLSB2YWx1ZXMgZm9yIHRoZSBpbnRlbnNpdHlcclxuICAgKiBAcGFyYW0gbnVtYmVyR3JpZExpbmVzIC0gaG93IG1hbnkgdmVydGljYWwgZ3JpZCBsaW5lcyB0byBzaG93XHJcbiAgICogQHBhcmFtIHJlc2V0RW1pdHRlciAtIGVtaXRzIHdoZW4gdGhlIHNpbSBpcyByZXNldFxyXG4gICAqIEBwYXJhbSBbb3B0aW9uc11cclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIGdyYXBoSGVpZ2h0OiBudW1iZXIsIGludGVuc2l0eVNhbXBsZTogbnVtYmVyW10sIG51bWJlckdyaWRMaW5lczogbnVtYmVyLCByZXNldEVtaXR0ZXI6IEVtaXR0ZXIsIG9wdGlvbnM/OiBJbnRlbnNpdHlHcmFwaFBhbmVsT3B0aW9ucyApIHtcclxuXHJcbiAgICBjb25zdCBjaGFydFJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoIDAsIDAsIENIQVJUX1dJRFRILCBncmFwaEhlaWdodCwge1xyXG4gICAgICBmaWxsOiAnd2hpdGUnLFxyXG4gICAgICBzdHJva2U6ICdibGFjaycsXHJcbiAgICAgIGxpbmVXaWR0aDogMVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGxpbmUgb24gdGhlIGdpdmVuIHktY29vcmRpbmF0ZS5cclxuICAgICAqL1xyXG4gICAgY29uc3QgY3JlYXRlTGluZSA9ICggaW5kZXgsIHkgKSA9PiBuZXcgTGluZSggY2hhcnRSZWN0YW5nbGUubGVmdCwgeSwgY2hhcnRSZWN0YW5nbGUucmlnaHQsIHksIHtcclxuICAgICAgc3Ryb2tlOiBpbmRleCAlIDIgPT09IDAgPyBEQVJLX0dSQVkgOiAnbGlnaHRHcmF5JyxcclxuICAgICAgbGluZURhc2g6IExJTkVfREFTSCAvLyBTb2xpZCBwYXJ0IHRvdWNoZXMgZWFjaCBlZGdlXHJcbiAgICB9ICk7XHJcblxyXG4gICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbnVtYmVyR3JpZExpbmVzOyBpKysgKSB7XHJcbiAgICAgIGNvbnN0IHlUb3AgPSBVdGlscy5saW5lYXIoIDAsIG51bWJlckdyaWRMaW5lcywgY2hhcnRSZWN0YW5nbGUuY2VudGVyWSwgY2hhcnRSZWN0YW5nbGUudG9wLCBpICk7XHJcbiAgICAgIGNvbnN0IHlCb3R0b20gPSBVdGlscy5saW5lYXIoIDAsIG51bWJlckdyaWRMaW5lcywgY2hhcnRSZWN0YW5nbGUuY2VudGVyWSwgY2hhcnRSZWN0YW5nbGUuYm90dG9tLCBpICk7XHJcbiAgICAgIGNoYXJ0UmVjdGFuZ2xlLmFkZENoaWxkKCBjcmVhdGVMaW5lKCBpLCB5VG9wICkgKTtcclxuICAgICAgaWYgKCBpICE9PSAwICkge1xyXG4gICAgICAgIGNoYXJ0UmVjdGFuZ2xlLmFkZENoaWxkKCBjcmVhdGVMaW5lKCBpLCB5Qm90dG9tICkgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYXJ0UmVjdGFuZ2xlLmFkZENoaWxkKCBuZXcgTGluZShcclxuICAgICAgY2hhcnRSZWN0YW5nbGUuY2VudGVyWCxcclxuICAgICAgY2hhcnRSZWN0YW5nbGUuYm90dG9tLFxyXG4gICAgICBjaGFydFJlY3RhbmdsZS5jZW50ZXJYLFxyXG4gICAgICBjaGFydFJlY3RhbmdsZS50b3AsIHtcclxuICAgICAgICBzdHJva2U6IERBUktfR1JBWSxcclxuICAgICAgICBsaW5lRGFzaDogTElORV9EQVNIXHJcbiAgICAgIH0gKSApO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlTm9kZSA9IG5ldyBXYXZlSW50ZXJmZXJlbmNlVGV4dCggaW50ZW5zaXR5U3RyaW5nLCB7XHJcbiAgICAgIG1heFdpZHRoOiBDSEFSVF9XSURUSCxcclxuICAgICAgY2VudGVyWDogY2hhcnRSZWN0YW5nbGUuY2VudGVyWCxcclxuICAgICAgdG9wOiBjaGFydFJlY3RhbmdsZS5ib3R0b20gKyBUSVRMRV9ZX01BUkdJTlxyXG4gICAgfSApO1xyXG4gICAgY29uc3QgY2xpcEFyZWEgPSBTaGFwZS5yZWN0YW5nbGUoIDAsIDAsIENIQVJUX1dJRFRILCBncmFwaEhlaWdodCApO1xyXG4gICAgY29uc3QgY3VydmUgPSBuZXcgUGF0aCggbnVsbCwge1xyXG4gICAgICBzdHJva2U6ICdibGFjaycsXHJcbiAgICAgIGxpbmVXaWR0aDogMixcclxuXHJcbiAgICAgIC8vIFByZXZlbnQgcmVuZGVyaW5nIG91dHNpZGUgdGhlIGNoYXJ0aW5nIGFyZWFcclxuICAgICAgY2xpcEFyZWE6IGNsaXBBcmVhXHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gUHJldmVudCByZWNvbXB1dGluZyB0aGUgYm91bmRzIG9mIHRoZSBjdXJ2ZSBhdCBlYWNoIHRpbWUgc3RlcCB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXHJcbiAgICBjdXJ2ZS5jb21wdXRlU2hhcGVCb3VuZHMgPSAoKSA9PiBjaGFydFJlY3RhbmdsZS5ib3VuZHM7XHJcblxyXG4gICAgLy8gU3VwcG9ydCBmb3Igem9vbSBpbi9vdXRcclxuICAgIGNvbnN0IHpvb21SYW5nZSA9IG5ldyBSYW5nZVdpdGhWYWx1ZSggMSwgNSwgMyApO1xyXG4gICAgY29uc3Qgem9vbUxldmVsUHJvcGVydHkgPSBuZXcgTnVtYmVyUHJvcGVydHkoIHpvb21SYW5nZS5kZWZhdWx0VmFsdWUsIHtcclxuICAgICAgcmFuZ2U6IHpvb21SYW5nZVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIFJlc2V0IHpvb20gbGV2ZWwgd2hlbiBzaW0gaXMgcmVzZXRcclxuICAgIHJlc2V0RW1pdHRlci5hZGRMaXN0ZW5lciggKCkgPT4gem9vbUxldmVsUHJvcGVydHkucmVzZXQoKSApO1xyXG5cclxuICAgIGNvbnN0IHpvb21CdXR0b25Hcm91cCA9IG5ldyBNYWduaWZ5aW5nR2xhc3Nab29tQnV0dG9uR3JvdXAoIHpvb21MZXZlbFByb3BlcnR5LCB7XHJcbiAgICAgIHNwYWNpbmc6IDM1LFxyXG4gICAgICB0b3A6IHRpdGxlTm9kZS5ib3R0b20gKyAxMyxcclxuICAgICAgYnV0dG9uT3B0aW9uczoge1xyXG4gICAgICAgIGJhc2VDb2xvcjogQ29sb3JDb25zdGFudHMuTElHSFRfQkxVRVxyXG4gICAgICB9LFxyXG4gICAgICBtYWduaWZ5aW5nR2xhc3NOb2RlT3B0aW9uczoge1xyXG4gICAgICAgIGdsYXNzUmFkaXVzOiA2XHJcbiAgICAgIH1cclxuICAgIH0gKTtcclxuXHJcbiAgICBjb25zdCBjaGFydE5vZGUgPSBuZXcgTm9kZSgge1xyXG4gICAgICBjaGlsZHJlbjogWyBjaGFydFJlY3RhbmdsZSwgY3VydmUsIHRpdGxlTm9kZSwgem9vbUJ1dHRvbkdyb3VwIF1cclxuICAgIH0gKTtcclxuXHJcbiAgICBzdXBlciggY2hhcnROb2RlLCBvcHRpb25zICk7XHJcblxyXG4gICAgLy8gQHByaXZhdGVcclxuICAgIHRoaXMuY2hhcnRSZWN0YW5nbGUgPSBjaGFydFJlY3RhbmdsZTtcclxuXHJcbiAgICBjb25zdCB1cGRhdGVDaGFydCA9ICgpID0+IHtcclxuICAgICAgY29uc3QgaW50ZW5zaXR5VmFsdWVzID0gaW50ZW5zaXR5U2FtcGxlLmdldEludGVuc2l0eVZhbHVlcygpO1xyXG4gICAgICBjb25zdCBzaGFwZSA9IG5ldyBTaGFwZSgpO1xyXG4gICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBpbnRlbnNpdHlWYWx1ZXMubGVuZ3RoOyBpKysgKSB7XHJcblxyXG4gICAgICAgIC8vIGRlZmF1bHQgc2NhbGluZyBpcyAyXHJcbiAgICAgICAgY29uc3QgU0NBTElORyA9IFV0aWxzLmxpbmVhciggem9vbVJhbmdlLm1pbiwgem9vbVJhbmdlLm1heCwgMC41LCAzLjUsIHpvb21MZXZlbFByb3BlcnR5LnZhbHVlICk7XHJcbiAgICAgICAgY29uc3QgaW50ZW5zaXR5UGxvdFZhbHVlID0gVXRpbHMubGluZWFyKFxyXG4gICAgICAgICAgMCwgV2F2ZUludGVyZmVyZW5jZUNvbnN0YW50cy5NQVhfQU1QTElUVURFX1RPX1BMT1RfT05fUklHSFQsXHJcbiAgICAgICAgICAwLCBDSEFSVF9XSURUSCAqIFNDQUxJTkcsXHJcbiAgICAgICAgICBpbnRlbnNpdHlWYWx1ZXNbIGkgXVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25QbG90VmFsdWUgPSBVdGlscy5saW5lYXIoXHJcbiAgICAgICAgICAwLCBpbnRlbnNpdHlWYWx1ZXMubGVuZ3RoIC0gMSxcclxuICAgICAgICAgIGNoYXJ0UmVjdGFuZ2xlLnRvcCwgY2hhcnRSZWN0YW5nbGUuYm90dG9tLFxyXG4gICAgICAgICAgaVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc2hhcGUubGluZVRvKCBpbnRlbnNpdHlQbG90VmFsdWUsIHBvc2l0aW9uUGxvdFZhbHVlICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFkZCBhbiBleHRlbnNpb24gKHRoYXQgd2lsbCBiZSBpbnZpc2libGUgZHVlIHRvIGNsaXBwaW5nKSB0aGF0IGhhcyBiZWVuIG9ic2VydmVkIHRvIHRyaWNrIEZpcmVmb3ggaW50b1xyXG4gICAgICAvLyBpbmNyZWFzaW5nIGl0cyBcImRpcnR5IGJvdW5kc1wiIGFyZWEgZm9yIHRoZSBzaGFwZSBjaGFuZ2VzLCB0byBwcmV2ZW50IGR1cGxpY2F0ZSBsaW5lcyBmcm9tIGFwcGVhcmluZywgc2VlXHJcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy93YXZlLWludGVyZmVyZW5jZS9pc3N1ZXMvMjM1LiAgUGVyaGFwcyBvbmUgZGF5IHdoZW4gRmlyZWZveCBjbGlwcGluZy9zdmcgZ2V0c1xyXG4gICAgICAvLyB0aGUgYm91bmRzIGNvbXB1dGF0aW9uIGNvcnJlY3QsIHRoaXMgd29ya2Fyb3VuZCBjb3VsZCBiZSByZW1vdmVkLlxyXG4gICAgICBzaGFwZS5saW5lVG9SZWxhdGl2ZSggNTAsIDUwICkubGluZVRvUmVsYXRpdmUoIC0xMDAsIDAgKTtcclxuXHJcbiAgICAgIGN1cnZlLnNoYXBlID0gc2hhcGU7XHJcbiAgICB9O1xyXG4gICAgaW50ZW5zaXR5U2FtcGxlLmNoYW5nZWRFbWl0dGVyLmFkZExpc3RlbmVyKCB1cGRhdGVDaGFydCApO1xyXG4gICAgem9vbUxldmVsUHJvcGVydHkubGluayggdXBkYXRlQ2hhcnQgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGJvdW5kcyBvZiB0aGUgY2hhcnQgYmFja2dyb3VuZCBpbiB0aGUgZ2xvYmFsIGNvb3JkaW5hdGUgZnJhbWUsIHVzZWQgdG8gYWxpZ24gdGhlIExpZ2h0U2NyZWVuTm9kZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRDaGFydEdsb2JhbEJvdW5kcygpOiBCb3VuZHMyIHtcclxuICAgIHJldHVybiB0aGlzLmNoYXJ0UmVjdGFuZ2xlLmdsb2JhbEJvdW5kcztcclxuICB9XHJcbn1cclxuXHJcbndhdmVJbnRlcmZlcmVuY2UucmVnaXN0ZXIoICdJbnRlbnNpdHlHcmFwaFBhbmVsJywgSW50ZW5zaXR5R3JhcGhQYW5lbCApO1xyXG5leHBvcnQgZGVmYXVsdCBJbnRlbnNpdHlHcmFwaFBhbmVsOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsY0FBYyxNQUFNLHVDQUF1QztBQUVsRSxPQUFPQyxjQUFjLE1BQU0sc0NBQXNDO0FBRWpFLE9BQU9DLEtBQUssTUFB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