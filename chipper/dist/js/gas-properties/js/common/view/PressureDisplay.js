// Copyright 2018-2022, University of Colorado Boulder

/**
 * PressureDisplay displays the pressure value, with the ability to switch units via a combo box.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Range from '../../../../dot/js/Range.js';
import { optionize3 } from '../../../../phet-core/js/optionize.js';
import ComboBoxDisplay from '../../../../scenery-phet/js/ComboBoxDisplay.js';
import gasProperties from '../../gasProperties.js';
import GasPropertiesStrings from '../../GasPropertiesStrings.js';
import GasPropertiesConstants from '../GasPropertiesConstants.js';
import GasPropertiesQueryParameters from '../GasPropertiesQueryParameters.js';
// constants
const NUMBER_DISPLAY_RANGE = new Range(0, GasPropertiesQueryParameters.maxPressure);
export default class PressureDisplay extends ComboBoxDisplay {
  constructor(pressureGauge, listboxParent, providedOptions) {
    const options = optionize3()({}, GasPropertiesConstants.COMBO_BOX_DISPLAY_OPTIONS, providedOptions);
    const items = [{
      choice: 'atmospheres',
      tandemName: `atmospheres${ComboBoxDisplay.ITEM_TANDEM_NAME_SUFFIX}`,
      numberProperty: pressureGauge.pressureAtmospheresProperty,
      range: NUMBER_DISPLAY_RANGE,
      units: GasPropertiesStrings.atmospheresStringProperty,
      numberDisplayOptions: {
        decimalPlaces: 1
      }
    }, {
      choice: 'kilopascals',
      tandemName: `kilopascals${ComboBoxDisplay.ITEM_TANDEM_NAME_SUFFIX}`,
      numberProperty: pressureGauge.pressureKilopascalsProperty,
      range: NUMBER_DISPLAY_RANGE,
      units: GasPropertiesStrings.kilopascalsStringProperty,
      numberDisplayOptions: {
        decimalPlaces: 0
      }
    }];
    super(pressureGauge.unitsProperty, items, listboxParent, options);
  }
  dispose() {
    assert && assert(false, 'dispose is not supported, exists for the lifetime of the sim');
    super.dispose();
  }
}
gasProperties.register('PressureDisplay', PressureDisplay);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSYW5nZSIsIm9wdGlvbml6ZTMiLCJDb21ib0JveERpc3BsYXkiLCJnYXNQcm9wZXJ0aWVzIiwiR2FzUHJvcGVydGllc1N0cmluZ3MiLCJHYXNQcm9wZXJ0aWVzQ29uc3RhbnRzIiwiR2FzUHJvcGVydGllc1F1ZXJ5UGFyYW1ldGVycyIsIk5VTUJFUl9ESVNQTEFZX1JBTkdFIiwibWF4UHJlc3N1cmUiLCJQcmVzc3VyZURpc3BsYXkiLCJjb25zdHJ1Y3RvciIsInByZXNzdXJlR2F1Z2UiLCJsaXN0Ym94UGFyZW50IiwicHJvdmlkZWRPcHRpb25zIiwib3B0aW9ucyIsIkNPTUJPX0JPWF9ESVNQTEFZX09QVElPTlMiLCJpdGVtcyIsImNob2ljZSIsInRhbmRlbU5hbWUiLCJJVEVNX1RBTkRFTV9OQU1FX1NVRkZJWCIsIm51bWJlclByb3BlcnR5IiwicHJlc3N1cmVBdG1vc3BoZXJlc1Byb3BlcnR5IiwicmFuZ2UiLCJ1bml0cyIsImF0bW9zcGhlcmVzU3RyaW5nUHJvcGVydHkiLCJudW1iZXJEaXNwbGF5T3B0aW9ucyIsImRlY2ltYWxQbGFjZXMiLCJwcmVzc3VyZUtpbG9wYXNjYWxzUHJvcGVydHkiLCJraWxvcGFzY2Fsc1N0cmluZ1Byb3BlcnR5IiwidW5pdHNQcm9wZXJ0eSIsImRpc3Bvc2UiLCJhc3NlcnQiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlByZXNzdXJlRGlzcGxheS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBQcmVzc3VyZURpc3BsYXkgZGlzcGxheXMgdGhlIHByZXNzdXJlIHZhbHVlLCB3aXRoIHRoZSBhYmlsaXR5IHRvIHN3aXRjaCB1bml0cyB2aWEgYSBjb21ibyBib3guXHJcbiAqXHJcbiAqIEBhdXRob3IgQ2hyaXMgTWFsbGV5IChQaXhlbFpvb20sIEluYy4pXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJhbmdlIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9SYW5nZS5qcyc7XHJcbmltcG9ydCB7IEVtcHR5U2VsZk9wdGlvbnMsIG9wdGlvbml6ZTMgfSBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvb3B0aW9uaXplLmpzJztcclxuaW1wb3J0IFBpY2tPcHRpb25hbCBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvdHlwZXMvUGlja09wdGlvbmFsLmpzJztcclxuaW1wb3J0IFBpY2tSZXF1aXJlZCBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvdHlwZXMvUGlja1JlcXVpcmVkLmpzJztcclxuaW1wb3J0IENvbWJvQm94RGlzcGxheSwgeyBDb21ib0JveERpc3BsYXlJdGVtLCBDb21ib0JveERpc3BsYXlPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL0NvbWJvQm94RGlzcGxheS5qcyc7XHJcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgZ2FzUHJvcGVydGllcyBmcm9tICcuLi8uLi9nYXNQcm9wZXJ0aWVzLmpzJztcclxuaW1wb3J0IEdhc1Byb3BlcnRpZXNTdHJpbmdzIGZyb20gJy4uLy4uL0dhc1Byb3BlcnRpZXNTdHJpbmdzLmpzJztcclxuaW1wb3J0IEdhc1Byb3BlcnRpZXNDb25zdGFudHMgZnJvbSAnLi4vR2FzUHJvcGVydGllc0NvbnN0YW50cy5qcyc7XHJcbmltcG9ydCBHYXNQcm9wZXJ0aWVzUXVlcnlQYXJhbWV0ZXJzIGZyb20gJy4uL0dhc1Byb3BlcnRpZXNRdWVyeVBhcmFtZXRlcnMuanMnO1xyXG5pbXBvcnQgUHJlc3N1cmVHYXVnZSBmcm9tICcuLi9tb2RlbC9QcmVzc3VyZUdhdWdlLmpzJztcclxuaW1wb3J0IHsgUHJlc3N1cmVVbml0cyB9IGZyb20gJy4uL21vZGVsL1ByZXNzdXJlVW5pdHMuanMnO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IE5VTUJFUl9ESVNQTEFZX1JBTkdFID0gbmV3IFJhbmdlKCAwLCBHYXNQcm9wZXJ0aWVzUXVlcnlQYXJhbWV0ZXJzLm1heFByZXNzdXJlICk7XHJcblxyXG50eXBlIFNlbGZPcHRpb25zID0gRW1wdHlTZWxmT3B0aW9ucztcclxuXHJcbnR5cGUgUHJlc3N1cmVEaXNwbGF5T3B0aW9ucyA9IFNlbGZPcHRpb25zICZcclxuICBQaWNrT3B0aW9uYWw8Q29tYm9Cb3hEaXNwbGF5T3B0aW9ucywgJ21heFdpZHRoJz4gJlxyXG4gIFBpY2tSZXF1aXJlZDxDb21ib0JveERpc3BsYXlPcHRpb25zLCAndGFuZGVtJz47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVzc3VyZURpc3BsYXkgZXh0ZW5kcyBDb21ib0JveERpc3BsYXk8UHJlc3N1cmVVbml0cz4ge1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIHByZXNzdXJlR2F1Z2U6IFByZXNzdXJlR2F1Z2UsIGxpc3Rib3hQYXJlbnQ6IE5vZGUsIHByb3ZpZGVkT3B0aW9uczogUHJlc3N1cmVEaXNwbGF5T3B0aW9ucyApIHtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0gb3B0aW9uaXplMzxQcmVzc3VyZURpc3BsYXlPcHRpb25zLCBTZWxmT3B0aW9ucywgQ29tYm9Cb3hEaXNwbGF5T3B0aW9ucz4oKShcclxuICAgICAge30sIEdhc1Byb3BlcnRpZXNDb25zdGFudHMuQ09NQk9fQk9YX0RJU1BMQVlfT1BUSU9OUywgcHJvdmlkZWRPcHRpb25zICk7XHJcblxyXG4gICAgY29uc3QgaXRlbXM6IENvbWJvQm94RGlzcGxheUl0ZW08UHJlc3N1cmVVbml0cz5bXSA9IFtcclxuICAgICAge1xyXG4gICAgICAgIGNob2ljZTogJ2F0bW9zcGhlcmVzJyxcclxuICAgICAgICB0YW5kZW1OYW1lOiBgYXRtb3NwaGVyZXMke0NvbWJvQm94RGlzcGxheS5JVEVNX1RBTkRFTV9OQU1FX1NVRkZJWH1gLFxyXG4gICAgICAgIG51bWJlclByb3BlcnR5OiBwcmVzc3VyZUdhdWdlLnByZXNzdXJlQXRtb3NwaGVyZXNQcm9wZXJ0eSxcclxuICAgICAgICByYW5nZTogTlVNQkVSX0RJU1BMQVlfUkFOR0UsXHJcbiAgICAgICAgdW5pdHM6IEdhc1Byb3BlcnRpZXNTdHJpbmdzLmF0bW9zcGhlcmVzU3RyaW5nUHJvcGVydHksXHJcbiAgICAgICAgbnVtYmVyRGlzcGxheU9wdGlvbnM6IHtcclxuICAgICAgICAgIGRlY2ltYWxQbGFjZXM6IDFcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBjaG9pY2U6ICdraWxvcGFzY2FscycsXHJcbiAgICAgICAgdGFuZGVtTmFtZTogYGtpbG9wYXNjYWxzJHtDb21ib0JveERpc3BsYXkuSVRFTV9UQU5ERU1fTkFNRV9TVUZGSVh9YCxcclxuICAgICAgICBudW1iZXJQcm9wZXJ0eTogcHJlc3N1cmVHYXVnZS5wcmVzc3VyZUtpbG9wYXNjYWxzUHJvcGVydHksXHJcbiAgICAgICAgcmFuZ2U6IE5VTUJFUl9ESVNQTEFZX1JBTkdFLFxyXG4gICAgICAgIHVuaXRzOiBHYXNQcm9wZXJ0aWVzU3RyaW5ncy5raWxvcGFzY2Fsc1N0cmluZ1Byb3BlcnR5LFxyXG4gICAgICAgIG51bWJlckRpc3BsYXlPcHRpb25zOiB7XHJcbiAgICAgICAgICBkZWNpbWFsUGxhY2VzOiAwXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBdO1xyXG5cclxuICAgIHN1cGVyKCBwcmVzc3VyZUdhdWdlLnVuaXRzUHJvcGVydHksIGl0ZW1zLCBsaXN0Ym94UGFyZW50LCBvcHRpb25zICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3ZlcnJpZGUgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIGZhbHNlLCAnZGlzcG9zZSBpcyBub3Qgc3VwcG9ydGVkLCBleGlzdHMgZm9yIHRoZSBsaWZldGltZSBvZiB0aGUgc2ltJyApO1xyXG4gICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZ2FzUHJvcGVydGllcy5yZWdpc3RlciggJ1ByZXNzdXJlRGlzcGxheScsIFByZXNzdXJlRGlzcGxheSApOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxLQUFLLE1BQU0sNkJBQTZCO0FBQy9DLFNBQTJCQyxVQUFVLFFBQVEsdUNBQXVDO0FBR3BGLE9BQU9DLGVBQWUsTUFBdUQsZ0RBQWdEO0FBRTdILE9BQU9DLGFBQWEsTUFBTSx3QkFBd0I7QUFDbEQsT0FBT0Msb0JBQW9CLE1BQU0sK0JBQStCO0FBQ2hFLE9BQU9DLHNCQUFzQixNQUFNLDhCQUE4QjtBQUNqRSxPQUFPQyw0QkFBNEIsTUFBTSxvQ0FBb0M7QUFJN0U7QUFDQSxNQUFNQyxvQkFBb0IsR0FBRyxJQUFJUCxLQUFLLENBQUUsQ0FBQyxFQUFFTSw0QkFBNEIsQ0FBQ0UsV0FBWSxDQUFDO0FBUXJGLGVBQWUsTUFBTUMsZUFBZSxTQUFTUCxlQUFlLENBQWdCO0VBRW5FUSxXQUFXQSxDQUFFQyxhQUE0QixFQUFFQyxhQUFtQixFQUFFQyxlQUF1QyxFQUFHO0lBRS9HLE1BQU1DLE9BQU8sR0FBR2IsVUFBVSxDQUE4RCxDQUFDLENBQ3ZGLENBQUMsQ0FBQyxFQUFFSSxzQkFBc0IsQ0FBQ1UseUJBQXlCLEVBQUVGLGVBQWdCLENBQUM7SUFFekUsTUFBTUcsS0FBMkMsR0FBRyxDQUNsRDtNQUNFQyxNQUFNLEVBQUUsYUFBYTtNQUNyQkMsVUFBVSxFQUFHLGNBQWFoQixlQUFlLENBQUNpQix1QkFBd0IsRUFBQztNQUNuRUMsY0FBYyxFQUFFVCxhQUFhLENBQUNVLDJCQUEyQjtNQUN6REMsS0FBSyxFQUFFZixvQkFBb0I7TUFDM0JnQixLQUFLLEVBQUVuQixvQkFBb0IsQ0FBQ29CLHlCQUF5QjtNQUNyREMsb0JBQW9CLEVBQUU7UUFDcEJDLGFBQWEsRUFBRTtNQUNqQjtJQUNGLENBQUMsRUFDRDtNQUNFVCxNQUFNLEVBQUUsYUFBYTtNQUNyQkMsVUFBVSxFQUFHLGNBQWFoQixlQUFlLENBQUNpQix1QkFBd0IsRUFBQztNQUNuRUMsY0FBYyxFQUFFVCxhQUFhLENBQUNnQiwyQkFBMkI7TUFDekRMLEtBQUssRUFBRWYsb0JBQW9CO01BQzNCZ0IsS0FBSyxFQUFFbkIsb0JBQW9CLENBQUN3Qix5QkFBeUI7TUFDckRILG9CQUFvQixFQUFFO1FBQ3BCQyxhQUFhLEVBQUU7TUFDakI7SUFDRixDQUFDLENBQ0Y7SUFFRCxLQUFLLENBQUVmLGFBQWEsQ0FBQ2tCLGFBQWEsRUFBRWIsS0FBSyxFQUFFSixhQUFhLEVBQUVFLE9BQVEsQ0FBQztFQUNyRTtFQUVnQmdCLE9BQU9BLENBQUEsRUFBUztJQUM5QkMsTUFBTSxJQUFJQSxNQUFNLENBQUUsS0FBSyxFQUFFLDhEQUErRCxDQUFDO0lBQ3pGLEtBQUssQ0FBQ0QsT0FBTyxDQUFDLENBQUM7RUFDakI7QUFDRjtBQUVBM0IsYUFBYSxDQUFDNkIsUUFBUSxDQUFFLGlCQUFpQixFQUFFdkIsZUFBZ0IsQ0FBQyJ9