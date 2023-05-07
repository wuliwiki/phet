// Copyright 2015-2022, University of Colorado Boulder

/**
 * The 'Lab' screen
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import labHomescreen_png from '../../images/labHomescreen_png.js';
import labNavbar_png from '../../images/labNavbar_png.js';
import PlinkoProbabilityConstants from '../common/PlinkoProbabilityConstants.js';
import PlinkoProbabilityKeyboardHelpContent from '../common/view/PlinkoProbabilityKeyboardHelpContent.js';
import plinkoProbability from '../plinkoProbability.js';
import PlinkoProbabilityStrings from '../PlinkoProbabilityStrings.js';
import LabModel from './model/LabModel.js';
import LabScreenView from './view/LabScreenView.js';
class LabScreen extends Screen {
  constructor() {
    const options = {
      name: PlinkoProbabilityStrings.screen.labStringProperty,
      backgroundColorProperty: new Property(PlinkoProbabilityConstants.BACKGROUND_COLOR),
      homeScreenIcon: new ScreenIcon(new Image(labHomescreen_png), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      }),
      navigationBarIcon: new ScreenIcon(new Image(labNavbar_png), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      }),
      createKeyboardHelpNode: () => new PlinkoProbabilityKeyboardHelpContent()
    };
    super(() => new LabModel(), model => new LabScreenView(model), options);
  }
}
plinkoProbability.register('LabScreen', LabScreen);
export default LabScreen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQcm9wZXJ0eSIsIlNjcmVlbiIsIlNjcmVlbkljb24iLCJJbWFnZSIsImxhYkhvbWVzY3JlZW5fcG5nIiwibGFiTmF2YmFyX3BuZyIsIlBsaW5rb1Byb2JhYmlsaXR5Q29uc3RhbnRzIiwiUGxpbmtvUHJvYmFiaWxpdHlLZXlib2FyZEhlbHBDb250ZW50IiwicGxpbmtvUHJvYmFiaWxpdHkiLCJQbGlua29Qcm9iYWJpbGl0eVN0cmluZ3MiLCJMYWJNb2RlbCIsIkxhYlNjcmVlblZpZXciLCJMYWJTY3JlZW4iLCJjb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJuYW1lIiwic2NyZWVuIiwibGFiU3RyaW5nUHJvcGVydHkiLCJiYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eSIsIkJBQ0tHUk9VTkRfQ09MT1IiLCJob21lU2NyZWVuSWNvbiIsIm1heEljb25XaWR0aFByb3BvcnRpb24iLCJtYXhJY29uSGVpZ2h0UHJvcG9ydGlvbiIsIm5hdmlnYXRpb25CYXJJY29uIiwiY3JlYXRlS2V5Ym9hcmRIZWxwTm9kZSIsIm1vZGVsIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJMYWJTY3JlZW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTUtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogVGhlICdMYWInIHNjcmVlblxyXG4gKi9cclxuXHJcbmltcG9ydCBQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi9heG9uL2pzL1Byb3BlcnR5LmpzJztcclxuaW1wb3J0IFNjcmVlbiBmcm9tICcuLi8uLi8uLi9qb2lzdC9qcy9TY3JlZW4uanMnO1xyXG5pbXBvcnQgU2NyZWVuSWNvbiBmcm9tICcuLi8uLi8uLi9qb2lzdC9qcy9TY3JlZW5JY29uLmpzJztcclxuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tICcuLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgbGFiSG9tZXNjcmVlbl9wbmcgZnJvbSAnLi4vLi4vaW1hZ2VzL2xhYkhvbWVzY3JlZW5fcG5nLmpzJztcclxuaW1wb3J0IGxhYk5hdmJhcl9wbmcgZnJvbSAnLi4vLi4vaW1hZ2VzL2xhYk5hdmJhcl9wbmcuanMnO1xyXG5pbXBvcnQgUGxpbmtvUHJvYmFiaWxpdHlDb25zdGFudHMgZnJvbSAnLi4vY29tbW9uL1BsaW5rb1Byb2JhYmlsaXR5Q29uc3RhbnRzLmpzJztcclxuaW1wb3J0IFBsaW5rb1Byb2JhYmlsaXR5S2V5Ym9hcmRIZWxwQ29udGVudCBmcm9tICcuLi9jb21tb24vdmlldy9QbGlua29Qcm9iYWJpbGl0eUtleWJvYXJkSGVscENvbnRlbnQuanMnO1xyXG5pbXBvcnQgcGxpbmtvUHJvYmFiaWxpdHkgZnJvbSAnLi4vcGxpbmtvUHJvYmFiaWxpdHkuanMnO1xyXG5pbXBvcnQgUGxpbmtvUHJvYmFiaWxpdHlTdHJpbmdzIGZyb20gJy4uL1BsaW5rb1Byb2JhYmlsaXR5U3RyaW5ncy5qcyc7XHJcbmltcG9ydCBMYWJNb2RlbCBmcm9tICcuL21vZGVsL0xhYk1vZGVsLmpzJztcclxuaW1wb3J0IExhYlNjcmVlblZpZXcgZnJvbSAnLi92aWV3L0xhYlNjcmVlblZpZXcuanMnO1xyXG5cclxuY2xhc3MgTGFiU2NyZWVuIGV4dGVuZHMgU2NyZWVuIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBuYW1lOiBQbGlua29Qcm9iYWJpbGl0eVN0cmluZ3Muc2NyZWVuLmxhYlN0cmluZ1Byb3BlcnR5LFxyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eTogbmV3IFByb3BlcnR5KCBQbGlua29Qcm9iYWJpbGl0eUNvbnN0YW50cy5CQUNLR1JPVU5EX0NPTE9SICksXHJcbiAgICAgIGhvbWVTY3JlZW5JY29uOiBuZXcgU2NyZWVuSWNvbiggbmV3IEltYWdlKCBsYWJIb21lc2NyZWVuX3BuZyApLCB7XHJcbiAgICAgICAgbWF4SWNvbldpZHRoUHJvcG9ydGlvbjogMSxcclxuICAgICAgICBtYXhJY29uSGVpZ2h0UHJvcG9ydGlvbjogMVxyXG4gICAgICB9ICksXHJcbiAgICAgIG5hdmlnYXRpb25CYXJJY29uOiBuZXcgU2NyZWVuSWNvbiggbmV3IEltYWdlKCBsYWJOYXZiYXJfcG5nICksIHtcclxuICAgICAgICBtYXhJY29uV2lkdGhQcm9wb3J0aW9uOiAxLFxyXG4gICAgICAgIG1heEljb25IZWlnaHRQcm9wb3J0aW9uOiAxXHJcbiAgICAgIH0gKSxcclxuICAgICAgY3JlYXRlS2V5Ym9hcmRIZWxwTm9kZTogKCkgPT4gbmV3IFBsaW5rb1Byb2JhYmlsaXR5S2V5Ym9hcmRIZWxwQ29udGVudCgpXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKFxyXG4gICAgICAoKSA9PiBuZXcgTGFiTW9kZWwoKSxcclxuICAgICAgbW9kZWwgPT4gbmV3IExhYlNjcmVlblZpZXcoIG1vZGVsICksXHJcbiAgICAgIG9wdGlvbnNcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5wbGlua29Qcm9iYWJpbGl0eS5yZWdpc3RlciggJ0xhYlNjcmVlbicsIExhYlNjcmVlbiApO1xyXG5leHBvcnQgZGVmYXVsdCBMYWJTY3JlZW47Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsUUFBUSxNQUFNLDhCQUE4QjtBQUNuRCxPQUFPQyxNQUFNLE1BQU0sNkJBQTZCO0FBQ2hELE9BQU9DLFVBQVUsTUFBTSxpQ0FBaUM7QUFDeEQsU0FBU0MsS0FBSyxRQUFRLGdDQUFnQztBQUN0RCxPQUFPQyxpQkFBaUIsTUFBTSxtQ0FBbUM7QUFDakUsT0FBT0MsYUFBYSxNQUFNLCtCQUErQjtBQUN6RCxPQUFPQywwQkFBMEIsTUFBTSx5Q0FBeUM7QUFDaEYsT0FBT0Msb0NBQW9DLE1BQU0sd0RBQXdEO0FBQ3pHLE9BQU9DLGlCQUFpQixNQUFNLHlCQUF5QjtBQUN2RCxPQUFPQyx3QkFBd0IsTUFBTSxnQ0FBZ0M7QUFDckUsT0FBT0MsUUFBUSxNQUFNLHFCQUFxQjtBQUMxQyxPQUFPQyxhQUFhLE1BQU0seUJBQXlCO0FBRW5ELE1BQU1DLFNBQVMsU0FBU1gsTUFBTSxDQUFDO0VBQzdCWSxXQUFXQSxDQUFBLEVBQUc7SUFFWixNQUFNQyxPQUFPLEdBQUc7TUFDZEMsSUFBSSxFQUFFTix3QkFBd0IsQ0FBQ08sTUFBTSxDQUFDQyxpQkFBaUI7TUFDdkRDLHVCQUF1QixFQUFFLElBQUlsQixRQUFRLENBQUVNLDBCQUEwQixDQUFDYSxnQkFBaUIsQ0FBQztNQUNwRkMsY0FBYyxFQUFFLElBQUlsQixVQUFVLENBQUUsSUFBSUMsS0FBSyxDQUFFQyxpQkFBa0IsQ0FBQyxFQUFFO1FBQzlEaUIsc0JBQXNCLEVBQUUsQ0FBQztRQUN6QkMsdUJBQXVCLEVBQUU7TUFDM0IsQ0FBRSxDQUFDO01BQ0hDLGlCQUFpQixFQUFFLElBQUlyQixVQUFVLENBQUUsSUFBSUMsS0FBSyxDQUFFRSxhQUFjLENBQUMsRUFBRTtRQUM3RGdCLHNCQUFzQixFQUFFLENBQUM7UUFDekJDLHVCQUF1QixFQUFFO01BQzNCLENBQUUsQ0FBQztNQUNIRSxzQkFBc0IsRUFBRUEsQ0FBQSxLQUFNLElBQUlqQixvQ0FBb0MsQ0FBQztJQUN6RSxDQUFDO0lBRUQsS0FBSyxDQUNILE1BQU0sSUFBSUcsUUFBUSxDQUFDLENBQUMsRUFDcEJlLEtBQUssSUFBSSxJQUFJZCxhQUFhLENBQUVjLEtBQU0sQ0FBQyxFQUNuQ1gsT0FDRixDQUFDO0VBQ0g7QUFDRjtBQUVBTixpQkFBaUIsQ0FBQ2tCLFFBQVEsQ0FBRSxXQUFXLEVBQUVkLFNBQVUsQ0FBQztBQUNwRCxlQUFlQSxTQUFTIn0=