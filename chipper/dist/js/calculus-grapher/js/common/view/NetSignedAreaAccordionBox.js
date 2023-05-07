// Copyright 2023, University of Colorado Boulder

/**
 * NetSignedAreaAccordionBox is the accordion box titled 'Net Signed Area'.
 * It displays the barometer for the area-under-curve tool.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BarometerAccordionBox from './BarometerAccordionBox.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import calculusGrapher from '../../calculusGrapher.js';
import optionize from '../../../../phet-core/js/optionize.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
export default class NetSignedAreaAccordionBox extends BarometerAccordionBox {
  constructor(areaUnderCurveScrubber, predictEnabledProperty, providedOptions) {
    // Color of the vertical bar in the barometer
    const barColorProperty = new DerivedProperty([areaUnderCurveScrubber.integralCurvePointProperty, areaUnderCurveScrubber.positiveFillProperty, areaUnderCurveScrubber.negativeFillProperty], (curvePoint, positiveFill, negativeFill) => curvePoint.y > 0 ? positiveFill : negativeFill);
    const options = optionize()({
      // BarometerAccordionBoxOptions
      barColorProperty: barColorProperty,
      chartTransformOptions: {
        modelYRange: CalculusGrapherConstants.NET_SIGNED_AREA_MODEL_RANGE
      }
    }, providedOptions);
    super(areaUnderCurveScrubber.integralCurvePointProperty, CalculusGrapherStrings.barometer.netSignedAreaStringProperty, areaUnderCurveScrubber.visibleProperty, predictEnabledProperty, options);
  }
}
calculusGrapher.register('NetSignedAreaAccordionBox', NetSignedAreaAccordionBox);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCYXJvbWV0ZXJBY2NvcmRpb25Cb3giLCJDYWxjdWx1c0dyYXBoZXJTdHJpbmdzIiwiY2FsY3VsdXNHcmFwaGVyIiwib3B0aW9uaXplIiwiRGVyaXZlZFByb3BlcnR5IiwiQ2FsY3VsdXNHcmFwaGVyQ29uc3RhbnRzIiwiTmV0U2lnbmVkQXJlYUFjY29yZGlvbkJveCIsImNvbnN0cnVjdG9yIiwiYXJlYVVuZGVyQ3VydmVTY3J1YmJlciIsInByZWRpY3RFbmFibGVkUHJvcGVydHkiLCJwcm92aWRlZE9wdGlvbnMiLCJiYXJDb2xvclByb3BlcnR5IiwiaW50ZWdyYWxDdXJ2ZVBvaW50UHJvcGVydHkiLCJwb3NpdGl2ZUZpbGxQcm9wZXJ0eSIsIm5lZ2F0aXZlRmlsbFByb3BlcnR5IiwiY3VydmVQb2ludCIsInBvc2l0aXZlRmlsbCIsIm5lZ2F0aXZlRmlsbCIsInkiLCJvcHRpb25zIiwiY2hhcnRUcmFuc2Zvcm1PcHRpb25zIiwibW9kZWxZUmFuZ2UiLCJORVRfU0lHTkVEX0FSRUFfTU9ERUxfUkFOR0UiLCJiYXJvbWV0ZXIiLCJuZXRTaWduZWRBcmVhU3RyaW5nUHJvcGVydHkiLCJ2aXNpYmxlUHJvcGVydHkiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIk5ldFNpZ25lZEFyZWFBY2NvcmRpb25Cb3gudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIE5ldFNpZ25lZEFyZWFBY2NvcmRpb25Cb3ggaXMgdGhlIGFjY29yZGlvbiBib3ggdGl0bGVkICdOZXQgU2lnbmVkIEFyZWEnLlxyXG4gKiBJdCBkaXNwbGF5cyB0aGUgYmFyb21ldGVyIGZvciB0aGUgYXJlYS11bmRlci1jdXJ2ZSB0b29sLlxyXG4gKlxyXG4gKiBAYXV0aG9yIE1hcnRpbiBWZWlsbGV0dGVcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgQmFyb21ldGVyQWNjb3JkaW9uQm94LCB7IEJhcm9tZXRlckFjY29yZGlvbkJveE9wdGlvbnMgfSBmcm9tICcuL0Jhcm9tZXRlckFjY29yZGlvbkJveC5qcyc7XHJcbmltcG9ydCBDYWxjdWx1c0dyYXBoZXJTdHJpbmdzIGZyb20gJy4uLy4uL0NhbGN1bHVzR3JhcGhlclN0cmluZ3MuanMnO1xyXG5pbXBvcnQgY2FsY3VsdXNHcmFwaGVyIGZyb20gJy4uLy4uL2NhbGN1bHVzR3JhcGhlci5qcyc7XHJcbmltcG9ydCBvcHRpb25pemUsIHsgRW1wdHlTZWxmT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9vcHRpb25pemUuanMnO1xyXG5pbXBvcnQgUGlja1JlcXVpcmVkIGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy90eXBlcy9QaWNrUmVxdWlyZWQuanMnO1xyXG5pbXBvcnQgRGVyaXZlZFByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvRGVyaXZlZFByb3BlcnR5LmpzJztcclxuaW1wb3J0IENhbGN1bHVzR3JhcGhlckNvbnN0YW50cyBmcm9tICcuLi9DYWxjdWx1c0dyYXBoZXJDb25zdGFudHMuanMnO1xyXG5pbXBvcnQgQXJlYVVuZGVyQ3VydmVTY3J1YmJlciBmcm9tICcuLi9tb2RlbC9BcmVhVW5kZXJDdXJ2ZVNjcnViYmVyLmpzJztcclxuaW1wb3J0IFRSZWFkT25seVByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvVFJlYWRPbmx5UHJvcGVydHkuanMnO1xyXG5cclxudHlwZSBTZWxmT3B0aW9ucyA9IEVtcHR5U2VsZk9wdGlvbnM7XHJcblxyXG50eXBlIE5ldFNpZ25lZEFyZWFBY2NvcmRpb25Cb3hPcHRpb25zID0gU2VsZk9wdGlvbnMgJiBQaWNrUmVxdWlyZWQ8QmFyb21ldGVyQWNjb3JkaW9uQm94T3B0aW9ucywgJ3RhbmRlbSc+O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0U2lnbmVkQXJlYUFjY29yZGlvbkJveCBleHRlbmRzIEJhcm9tZXRlckFjY29yZGlvbkJveCB7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggYXJlYVVuZGVyQ3VydmVTY3J1YmJlcjogQXJlYVVuZGVyQ3VydmVTY3J1YmJlcixcclxuICAgICAgICAgICAgICAgICAgICAgIHByZWRpY3RFbmFibGVkUHJvcGVydHk6IFRSZWFkT25seVByb3BlcnR5PGJvb2xlYW4+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZWRPcHRpb25zOiBOZXRTaWduZWRBcmVhQWNjb3JkaW9uQm94T3B0aW9ucyApIHtcclxuXHJcbiAgICAvLyBDb2xvciBvZiB0aGUgdmVydGljYWwgYmFyIGluIHRoZSBiYXJvbWV0ZXJcclxuICAgIGNvbnN0IGJhckNvbG9yUHJvcGVydHkgPSBuZXcgRGVyaXZlZFByb3BlcnR5KFxyXG4gICAgICBbIGFyZWFVbmRlckN1cnZlU2NydWJiZXIuaW50ZWdyYWxDdXJ2ZVBvaW50UHJvcGVydHksIGFyZWFVbmRlckN1cnZlU2NydWJiZXIucG9zaXRpdmVGaWxsUHJvcGVydHksIGFyZWFVbmRlckN1cnZlU2NydWJiZXIubmVnYXRpdmVGaWxsUHJvcGVydHkgXSxcclxuICAgICAgKCBjdXJ2ZVBvaW50LCBwb3NpdGl2ZUZpbGwsIG5lZ2F0aXZlRmlsbCApID0+ICggY3VydmVQb2ludC55ID4gMCApID8gcG9zaXRpdmVGaWxsIDogbmVnYXRpdmVGaWxsICk7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxOZXRTaWduZWRBcmVhQWNjb3JkaW9uQm94T3B0aW9ucywgU2VsZk9wdGlvbnMsIEJhcm9tZXRlckFjY29yZGlvbkJveE9wdGlvbnM+KCkoIHtcclxuXHJcbiAgICAgIC8vIEJhcm9tZXRlckFjY29yZGlvbkJveE9wdGlvbnNcclxuICAgICAgYmFyQ29sb3JQcm9wZXJ0eTogYmFyQ29sb3JQcm9wZXJ0eSxcclxuICAgICAgY2hhcnRUcmFuc2Zvcm1PcHRpb25zOiB7XHJcbiAgICAgICAgbW9kZWxZUmFuZ2U6IENhbGN1bHVzR3JhcGhlckNvbnN0YW50cy5ORVRfU0lHTkVEX0FSRUFfTU9ERUxfUkFOR0VcclxuICAgICAgfVxyXG4gICAgfSwgcHJvdmlkZWRPcHRpb25zICk7XHJcblxyXG4gICAgc3VwZXIoIGFyZWFVbmRlckN1cnZlU2NydWJiZXIuaW50ZWdyYWxDdXJ2ZVBvaW50UHJvcGVydHksIENhbGN1bHVzR3JhcGhlclN0cmluZ3MuYmFyb21ldGVyLm5ldFNpZ25lZEFyZWFTdHJpbmdQcm9wZXJ0eSxcclxuICAgICAgYXJlYVVuZGVyQ3VydmVTY3J1YmJlci52aXNpYmxlUHJvcGVydHksIHByZWRpY3RFbmFibGVkUHJvcGVydHksIG9wdGlvbnMgKTtcclxuICB9XHJcbn1cclxuXHJcbmNhbGN1bHVzR3JhcGhlci5yZWdpc3RlciggJ05ldFNpZ25lZEFyZWFBY2NvcmRpb25Cb3gnLCBOZXRTaWduZWRBcmVhQWNjb3JkaW9uQm94ICk7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EscUJBQXFCLE1BQXdDLDRCQUE0QjtBQUNoRyxPQUFPQyxzQkFBc0IsTUFBTSxpQ0FBaUM7QUFDcEUsT0FBT0MsZUFBZSxNQUFNLDBCQUEwQjtBQUN0RCxPQUFPQyxTQUFTLE1BQTRCLHVDQUF1QztBQUVuRixPQUFPQyxlQUFlLE1BQU0sd0NBQXdDO0FBQ3BFLE9BQU9DLHdCQUF3QixNQUFNLGdDQUFnQztBQVFyRSxlQUFlLE1BQU1DLHlCQUF5QixTQUFTTixxQkFBcUIsQ0FBQztFQUVwRU8sV0FBV0EsQ0FBRUMsc0JBQThDLEVBQzlDQyxzQkFBa0QsRUFDbERDLGVBQWlELEVBQUc7SUFFdEU7SUFDQSxNQUFNQyxnQkFBZ0IsR0FBRyxJQUFJUCxlQUFlLENBQzFDLENBQUVJLHNCQUFzQixDQUFDSSwwQkFBMEIsRUFBRUosc0JBQXNCLENBQUNLLG9CQUFvQixFQUFFTCxzQkFBc0IsQ0FBQ00sb0JBQW9CLENBQUUsRUFDL0ksQ0FBRUMsVUFBVSxFQUFFQyxZQUFZLEVBQUVDLFlBQVksS0FBUUYsVUFBVSxDQUFDRyxDQUFDLEdBQUcsQ0FBQyxHQUFLRixZQUFZLEdBQUdDLFlBQWEsQ0FBQztJQUVwRyxNQUFNRSxPQUFPLEdBQUdoQixTQUFTLENBQThFLENBQUMsQ0FBRTtNQUV4RztNQUNBUSxnQkFBZ0IsRUFBRUEsZ0JBQWdCO01BQ2xDUyxxQkFBcUIsRUFBRTtRQUNyQkMsV0FBVyxFQUFFaEIsd0JBQXdCLENBQUNpQjtNQUN4QztJQUNGLENBQUMsRUFBRVosZUFBZ0IsQ0FBQztJQUVwQixLQUFLLENBQUVGLHNCQUFzQixDQUFDSSwwQkFBMEIsRUFBRVgsc0JBQXNCLENBQUNzQixTQUFTLENBQUNDLDJCQUEyQixFQUNwSGhCLHNCQUFzQixDQUFDaUIsZUFBZSxFQUFFaEIsc0JBQXNCLEVBQUVVLE9BQVEsQ0FBQztFQUM3RTtBQUNGO0FBRUFqQixlQUFlLENBQUN3QixRQUFRLENBQUUsMkJBQTJCLEVBQUVwQix5QkFBMEIsQ0FBQyJ9