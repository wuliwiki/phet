// Copyright 2021-2022, University of Colorado Boulder

/**
 * RadiusOfCurvatureControl is the control for changing the optic's ROC. It actually changes the ROC magnitude, and
 * indicates the sign by an annotation in the control's label, e.g. 'Radius of Curvature (-)'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberControl from '../../../../scenery-phet/js/NumberControl.js';
import geometricOptics from '../../geometricOptics.js';
import GeometricOpticsStrings from '../../GeometricOpticsStrings.js';
import GOConstants from '../GOConstants.js';
import Utils from '../../../../dot/js/Utils.js';
import { optionize4 } from '../../../../phet-core/js/optionize.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
export default class RadiusOfCurvatureControl extends NumberControl {
  /**
   * @param radiusOfCurvatureMagnitudeProperty - unsigned
   * @param radiusOfCurvatureProperty - signed
   * @param providedOptions
   */
  constructor(radiusOfCurvatureMagnitudeProperty, radiusOfCurvatureProperty, providedOptions) {
    const range = radiusOfCurvatureMagnitudeProperty.range;
    const titleStringProperty = new DerivedProperty([radiusOfCurvatureProperty, GeometricOpticsStrings.radiusOfCurvaturePositiveStringProperty, GeometricOpticsStrings.radiusOfCurvatureNegativeStringProperty], (radiusOfCurvature, radiusOfCurvaturePositiveString, radiusOfCurvatureNegativeString) => radiusOfCurvature >= 0 ? radiusOfCurvaturePositiveString : radiusOfCurvatureNegativeString, {
      tandem: providedOptions.tandem.createTandem('titleStringProperty'),
      phetioValueType: StringIO
    });
    const options = optionize4()({}, GOConstants.NUMBER_CONTROL_OPTIONS, {
      // NumberControlOptions
      delta: GOConstants.RADIUS_OF_CURVATURE_SPINNER_STEP,
      numberDisplayOptions: {
        decimalPlaces: GOConstants.RADIUS_OF_CURVATURE_DECIMAL_PLACES,
        valuePattern: GeometricOpticsStrings.valueCentimetersPatternStringProperty
      },
      sliderOptions: {
        constrainValue: value => Utils.roundToInterval(value, GOConstants.RADIUS_OF_CURVATURE_SLIDER_STEP),
        keyboardStep: GOConstants.RADIUS_OF_CURVATURE_KEYBOARD_STEP,
        // used by all alternative-input devices
        shiftKeyboardStep: GOConstants.RADIUS_OF_CURVATURE_SHIFT_KEYBOARD_STEP,
        // finer grain, used by keyboard only
        pageKeyboardStep: GOConstants.RADIUS_OF_CURVATURE_PAGE_KEYBOARD_STEP
      }
    }, providedOptions);
    super(titleStringProperty, radiusOfCurvatureMagnitudeProperty, range, options);
    this.addLinkedElement(radiusOfCurvatureMagnitudeProperty, {
      tandem: options.tandem.createTandem(radiusOfCurvatureMagnitudeProperty.tandem.name)
    });
  }
  dispose() {
    assert && assert(false, 'dispose is not supported, exists for the lifetime of the sim');
    super.dispose();
  }
}
geometricOptics.register('RadiusOfCurvatureControl', RadiusOfCurvatureControl);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJOdW1iZXJDb250cm9sIiwiZ2VvbWV0cmljT3B0aWNzIiwiR2VvbWV0cmljT3B0aWNzU3RyaW5ncyIsIkdPQ29uc3RhbnRzIiwiVXRpbHMiLCJvcHRpb25pemU0IiwiU3RyaW5nSU8iLCJEZXJpdmVkUHJvcGVydHkiLCJSYWRpdXNPZkN1cnZhdHVyZUNvbnRyb2wiLCJjb25zdHJ1Y3RvciIsInJhZGl1c09mQ3VydmF0dXJlTWFnbml0dWRlUHJvcGVydHkiLCJyYWRpdXNPZkN1cnZhdHVyZVByb3BlcnR5IiwicHJvdmlkZWRPcHRpb25zIiwicmFuZ2UiLCJ0aXRsZVN0cmluZ1Byb3BlcnR5IiwicmFkaXVzT2ZDdXJ2YXR1cmVQb3NpdGl2ZVN0cmluZ1Byb3BlcnR5IiwicmFkaXVzT2ZDdXJ2YXR1cmVOZWdhdGl2ZVN0cmluZ1Byb3BlcnR5IiwicmFkaXVzT2ZDdXJ2YXR1cmUiLCJyYWRpdXNPZkN1cnZhdHVyZVBvc2l0aXZlU3RyaW5nIiwicmFkaXVzT2ZDdXJ2YXR1cmVOZWdhdGl2ZVN0cmluZyIsInRhbmRlbSIsImNyZWF0ZVRhbmRlbSIsInBoZXRpb1ZhbHVlVHlwZSIsIm9wdGlvbnMiLCJOVU1CRVJfQ09OVFJPTF9PUFRJT05TIiwiZGVsdGEiLCJSQURJVVNfT0ZfQ1VSVkFUVVJFX1NQSU5ORVJfU1RFUCIsIm51bWJlckRpc3BsYXlPcHRpb25zIiwiZGVjaW1hbFBsYWNlcyIsIlJBRElVU19PRl9DVVJWQVRVUkVfREVDSU1BTF9QTEFDRVMiLCJ2YWx1ZVBhdHRlcm4iLCJ2YWx1ZUNlbnRpbWV0ZXJzUGF0dGVyblN0cmluZ1Byb3BlcnR5Iiwic2xpZGVyT3B0aW9ucyIsImNvbnN0cmFpblZhbHVlIiwidmFsdWUiLCJyb3VuZFRvSW50ZXJ2YWwiLCJSQURJVVNfT0ZfQ1VSVkFUVVJFX1NMSURFUl9TVEVQIiwia2V5Ym9hcmRTdGVwIiwiUkFESVVTX09GX0NVUlZBVFVSRV9LRVlCT0FSRF9TVEVQIiwic2hpZnRLZXlib2FyZFN0ZXAiLCJSQURJVVNfT0ZfQ1VSVkFUVVJFX1NISUZUX0tFWUJPQVJEX1NURVAiLCJwYWdlS2V5Ym9hcmRTdGVwIiwiUkFESVVTX09GX0NVUlZBVFVSRV9QQUdFX0tFWUJPQVJEX1NURVAiLCJhZGRMaW5rZWRFbGVtZW50IiwibmFtZSIsImRpc3Bvc2UiLCJhc3NlcnQiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlJhZGl1c09mQ3VydmF0dXJlQ29udHJvbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBSYWRpdXNPZkN1cnZhdHVyZUNvbnRyb2wgaXMgdGhlIGNvbnRyb2wgZm9yIGNoYW5naW5nIHRoZSBvcHRpYydzIFJPQy4gSXQgYWN0dWFsbHkgY2hhbmdlcyB0aGUgUk9DIG1hZ25pdHVkZSwgYW5kXHJcbiAqIGluZGljYXRlcyB0aGUgc2lnbiBieSBhbiBhbm5vdGF0aW9uIGluIHRoZSBjb250cm9sJ3MgbGFiZWwsIGUuZy4gJ1JhZGl1cyBvZiBDdXJ2YXR1cmUgKC0pJy5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgTnVtYmVyQ29udHJvbCwgeyBOdW1iZXJDb250cm9sT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnktcGhldC9qcy9OdW1iZXJDb250cm9sLmpzJztcclxuaW1wb3J0IGdlb21ldHJpY09wdGljcyBmcm9tICcuLi8uLi9nZW9tZXRyaWNPcHRpY3MuanMnO1xyXG5pbXBvcnQgR2VvbWV0cmljT3B0aWNzU3RyaW5ncyBmcm9tICcuLi8uLi9HZW9tZXRyaWNPcHRpY3NTdHJpbmdzLmpzJztcclxuaW1wb3J0IEdPQ29uc3RhbnRzIGZyb20gJy4uL0dPQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9VdGlscy5qcyc7XHJcbmltcG9ydCBOdW1iZXJQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL051bWJlclByb3BlcnR5LmpzJztcclxuaW1wb3J0IFRSZWFkT25seVByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvVFJlYWRPbmx5UHJvcGVydHkuanMnO1xyXG5pbXBvcnQgUGlja1JlcXVpcmVkIGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy90eXBlcy9QaWNrUmVxdWlyZWQuanMnO1xyXG5pbXBvcnQgeyBFbXB0eVNlbGZPcHRpb25zLCBvcHRpb25pemU0IH0gZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL29wdGlvbml6ZS5qcyc7XHJcbmltcG9ydCBTdHJpbmdJTyBmcm9tICcuLi8uLi8uLi8uLi90YW5kZW0vanMvdHlwZXMvU3RyaW5nSU8uanMnO1xyXG5pbXBvcnQgRGVyaXZlZFByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvRGVyaXZlZFByb3BlcnR5LmpzJztcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSBFbXB0eVNlbGZPcHRpb25zO1xyXG5cclxudHlwZSBSYWRpdXNPZkN1cnZhdHVyZUNvbnRyb2xPcHRpb25zID0gU2VsZk9wdGlvbnMgJiBQaWNrUmVxdWlyZWQ8TnVtYmVyQ29udHJvbE9wdGlvbnMsICd0YW5kZW0nPjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhZGl1c09mQ3VydmF0dXJlQ29udHJvbCBleHRlbmRzIE51bWJlckNvbnRyb2wge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gcmFkaXVzT2ZDdXJ2YXR1cmVNYWduaXR1ZGVQcm9wZXJ0eSAtIHVuc2lnbmVkXHJcbiAgICogQHBhcmFtIHJhZGl1c09mQ3VydmF0dXJlUHJvcGVydHkgLSBzaWduZWRcclxuICAgKiBAcGFyYW0gcHJvdmlkZWRPcHRpb25zXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCByYWRpdXNPZkN1cnZhdHVyZU1hZ25pdHVkZVByb3BlcnR5OiBOdW1iZXJQcm9wZXJ0eSxcclxuICAgICAgICAgICAgICAgICAgICAgIHJhZGl1c09mQ3VydmF0dXJlUHJvcGVydHk6IFRSZWFkT25seVByb3BlcnR5PG51bWJlcj4sXHJcbiAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlZE9wdGlvbnM6IFJhZGl1c09mQ3VydmF0dXJlQ29udHJvbE9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3QgcmFuZ2UgPSByYWRpdXNPZkN1cnZhdHVyZU1hZ25pdHVkZVByb3BlcnR5LnJhbmdlO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlU3RyaW5nUHJvcGVydHkgPSBuZXcgRGVyaXZlZFByb3BlcnR5KCBbXHJcbiAgICAgIHJhZGl1c09mQ3VydmF0dXJlUHJvcGVydHksXHJcbiAgICAgIEdlb21ldHJpY09wdGljc1N0cmluZ3MucmFkaXVzT2ZDdXJ2YXR1cmVQb3NpdGl2ZVN0cmluZ1Byb3BlcnR5LFxyXG4gICAgICBHZW9tZXRyaWNPcHRpY3NTdHJpbmdzLnJhZGl1c09mQ3VydmF0dXJlTmVnYXRpdmVTdHJpbmdQcm9wZXJ0eVxyXG4gICAgXSwgKCByYWRpdXNPZkN1cnZhdHVyZTogbnVtYmVyLCByYWRpdXNPZkN1cnZhdHVyZVBvc2l0aXZlU3RyaW5nOiBzdHJpbmcsIHJhZGl1c09mQ3VydmF0dXJlTmVnYXRpdmVTdHJpbmc6IHN0cmluZyApID0+XHJcbiAgICAgICggcmFkaXVzT2ZDdXJ2YXR1cmUgPj0gMCApID8gcmFkaXVzT2ZDdXJ2YXR1cmVQb3NpdGl2ZVN0cmluZyA6IHJhZGl1c09mQ3VydmF0dXJlTmVnYXRpdmVTdHJpbmcsIHtcclxuICAgICAgdGFuZGVtOiBwcm92aWRlZE9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3RpdGxlU3RyaW5nUHJvcGVydHknICksXHJcbiAgICAgIHBoZXRpb1ZhbHVlVHlwZTogU3RyaW5nSU9cclxuICAgIH0gKTtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0gb3B0aW9uaXplNDxSYWRpdXNPZkN1cnZhdHVyZUNvbnRyb2xPcHRpb25zLCBTZWxmT3B0aW9ucywgTnVtYmVyQ29udHJvbE9wdGlvbnM+KCkoXHJcbiAgICAgIHt9LCBHT0NvbnN0YW50cy5OVU1CRVJfQ09OVFJPTF9PUFRJT05TLCB7XHJcblxyXG4gICAgICAgIC8vIE51bWJlckNvbnRyb2xPcHRpb25zXHJcbiAgICAgICAgZGVsdGE6IEdPQ29uc3RhbnRzLlJBRElVU19PRl9DVVJWQVRVUkVfU1BJTk5FUl9TVEVQLFxyXG4gICAgICAgIG51bWJlckRpc3BsYXlPcHRpb25zOiB7XHJcbiAgICAgICAgICBkZWNpbWFsUGxhY2VzOiBHT0NvbnN0YW50cy5SQURJVVNfT0ZfQ1VSVkFUVVJFX0RFQ0lNQUxfUExBQ0VTLFxyXG4gICAgICAgICAgdmFsdWVQYXR0ZXJuOiBHZW9tZXRyaWNPcHRpY3NTdHJpbmdzLnZhbHVlQ2VudGltZXRlcnNQYXR0ZXJuU3RyaW5nUHJvcGVydHlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNsaWRlck9wdGlvbnM6IHtcclxuICAgICAgICAgIGNvbnN0cmFpblZhbHVlOiAoIHZhbHVlOiBudW1iZXIgKSA9PiBVdGlscy5yb3VuZFRvSW50ZXJ2YWwoIHZhbHVlLCBHT0NvbnN0YW50cy5SQURJVVNfT0ZfQ1VSVkFUVVJFX1NMSURFUl9TVEVQICksXHJcbiAgICAgICAgICBrZXlib2FyZFN0ZXA6IEdPQ29uc3RhbnRzLlJBRElVU19PRl9DVVJWQVRVUkVfS0VZQk9BUkRfU1RFUCwgLy8gdXNlZCBieSBhbGwgYWx0ZXJuYXRpdmUtaW5wdXQgZGV2aWNlc1xyXG4gICAgICAgICAgc2hpZnRLZXlib2FyZFN0ZXA6IEdPQ29uc3RhbnRzLlJBRElVU19PRl9DVVJWQVRVUkVfU0hJRlRfS0VZQk9BUkRfU1RFUCwgLy8gZmluZXIgZ3JhaW4sIHVzZWQgYnkga2V5Ym9hcmQgb25seVxyXG4gICAgICAgICAgcGFnZUtleWJvYXJkU3RlcDogR09Db25zdGFudHMuUkFESVVTX09GX0NVUlZBVFVSRV9QQUdFX0tFWUJPQVJEX1NURVBcclxuICAgICAgICB9XHJcbiAgICAgIH0sIHByb3ZpZGVkT3B0aW9ucyApO1xyXG5cclxuICAgIHN1cGVyKCB0aXRsZVN0cmluZ1Byb3BlcnR5LCByYWRpdXNPZkN1cnZhdHVyZU1hZ25pdHVkZVByb3BlcnR5LCByYW5nZSwgb3B0aW9ucyApO1xyXG5cclxuICAgIHRoaXMuYWRkTGlua2VkRWxlbWVudCggcmFkaXVzT2ZDdXJ2YXR1cmVNYWduaXR1ZGVQcm9wZXJ0eSwge1xyXG4gICAgICB0YW5kZW06IG9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggcmFkaXVzT2ZDdXJ2YXR1cmVNYWduaXR1ZGVQcm9wZXJ0eS50YW5kZW0ubmFtZSApXHJcbiAgICB9ICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3ZlcnJpZGUgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIGZhbHNlLCAnZGlzcG9zZSBpcyBub3Qgc3VwcG9ydGVkLCBleGlzdHMgZm9yIHRoZSBsaWZldGltZSBvZiB0aGUgc2ltJyApO1xyXG4gICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZ2VvbWV0cmljT3B0aWNzLnJlZ2lzdGVyKCAnUmFkaXVzT2ZDdXJ2YXR1cmVDb250cm9sJywgUmFkaXVzT2ZDdXJ2YXR1cmVDb250cm9sICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsYUFBYSxNQUFnQyw4Q0FBOEM7QUFDbEcsT0FBT0MsZUFBZSxNQUFNLDBCQUEwQjtBQUN0RCxPQUFPQyxzQkFBc0IsTUFBTSxpQ0FBaUM7QUFDcEUsT0FBT0MsV0FBVyxNQUFNLG1CQUFtQjtBQUMzQyxPQUFPQyxLQUFLLE1BQU0sNkJBQTZCO0FBSS9DLFNBQTJCQyxVQUFVLFFBQVEsdUNBQXVDO0FBQ3BGLE9BQU9DLFFBQVEsTUFBTSx5Q0FBeUM7QUFDOUQsT0FBT0MsZUFBZSxNQUFNLHdDQUF3QztBQU1wRSxlQUFlLE1BQU1DLHdCQUF3QixTQUFTUixhQUFhLENBQUM7RUFFbEU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUNTUyxXQUFXQSxDQUFFQyxrQ0FBa0QsRUFDbERDLHlCQUFvRCxFQUNwREMsZUFBZ0QsRUFBRztJQUVyRSxNQUFNQyxLQUFLLEdBQUdILGtDQUFrQyxDQUFDRyxLQUFLO0lBRXRELE1BQU1DLG1CQUFtQixHQUFHLElBQUlQLGVBQWUsQ0FBRSxDQUMvQ0kseUJBQXlCLEVBQ3pCVCxzQkFBc0IsQ0FBQ2EsdUNBQXVDLEVBQzlEYixzQkFBc0IsQ0FBQ2MsdUNBQXVDLENBQy9ELEVBQUUsQ0FBRUMsaUJBQXlCLEVBQUVDLCtCQUF1QyxFQUFFQywrQkFBdUMsS0FDNUdGLGlCQUFpQixJQUFJLENBQUMsR0FBS0MsK0JBQStCLEdBQUdDLCtCQUErQixFQUFFO01BQ2hHQyxNQUFNLEVBQUVSLGVBQWUsQ0FBQ1EsTUFBTSxDQUFDQyxZQUFZLENBQUUscUJBQXNCLENBQUM7TUFDcEVDLGVBQWUsRUFBRWhCO0lBQ25CLENBQUUsQ0FBQztJQUVILE1BQU1pQixPQUFPLEdBQUdsQixVQUFVLENBQXFFLENBQUMsQ0FDOUYsQ0FBQyxDQUFDLEVBQUVGLFdBQVcsQ0FBQ3FCLHNCQUFzQixFQUFFO01BRXRDO01BQ0FDLEtBQUssRUFBRXRCLFdBQVcsQ0FBQ3VCLGdDQUFnQztNQUNuREMsb0JBQW9CLEVBQUU7UUFDcEJDLGFBQWEsRUFBRXpCLFdBQVcsQ0FBQzBCLGtDQUFrQztRQUM3REMsWUFBWSxFQUFFNUIsc0JBQXNCLENBQUM2QjtNQUN2QyxDQUFDO01BQ0RDLGFBQWEsRUFBRTtRQUNiQyxjQUFjLEVBQUlDLEtBQWEsSUFBTTlCLEtBQUssQ0FBQytCLGVBQWUsQ0FBRUQsS0FBSyxFQUFFL0IsV0FBVyxDQUFDaUMsK0JBQWdDLENBQUM7UUFDaEhDLFlBQVksRUFBRWxDLFdBQVcsQ0FBQ21DLGlDQUFpQztRQUFFO1FBQzdEQyxpQkFBaUIsRUFBRXBDLFdBQVcsQ0FBQ3FDLHVDQUF1QztRQUFFO1FBQ3hFQyxnQkFBZ0IsRUFBRXRDLFdBQVcsQ0FBQ3VDO01BQ2hDO0lBQ0YsQ0FBQyxFQUFFOUIsZUFBZ0IsQ0FBQztJQUV0QixLQUFLLENBQUVFLG1CQUFtQixFQUFFSixrQ0FBa0MsRUFBRUcsS0FBSyxFQUFFVSxPQUFRLENBQUM7SUFFaEYsSUFBSSxDQUFDb0IsZ0JBQWdCLENBQUVqQyxrQ0FBa0MsRUFBRTtNQUN6RFUsTUFBTSxFQUFFRyxPQUFPLENBQUNILE1BQU0sQ0FBQ0MsWUFBWSxDQUFFWCxrQ0FBa0MsQ0FBQ1UsTUFBTSxDQUFDd0IsSUFBSztJQUN0RixDQUFFLENBQUM7RUFDTDtFQUVnQkMsT0FBT0EsQ0FBQSxFQUFTO0lBQzlCQyxNQUFNLElBQUlBLE1BQU0sQ0FBRSxLQUFLLEVBQUUsOERBQStELENBQUM7SUFDekYsS0FBSyxDQUFDRCxPQUFPLENBQUMsQ0FBQztFQUNqQjtBQUNGO0FBRUE1QyxlQUFlLENBQUM4QyxRQUFRLENBQUUsMEJBQTBCLEVBQUV2Qyx3QkFBeUIsQ0FBQyJ9