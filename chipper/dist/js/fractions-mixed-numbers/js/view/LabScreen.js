// Copyright 2018-2022, University of Colorado Boulder

/**
 * Lab screen for Fractions: Mixed Numbers
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import FractionsCommonColors from '../../../fractions-common/js/common/view/FractionsCommonColors.js';
import BuildingLabModel from '../../../fractions-common/js/lab/model/BuildingLabModel.js';
import BuildingLabScreenView from '../../../fractions-common/js/lab/view/BuildingLabScreenView.js';
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import fractionsMixedNumbers from '../fractionsMixedNumbers.js';
import FractionsMixedNumbersStrings from '../FractionsMixedNumbersStrings.js';
class LabScreen extends Screen {
  constructor() {
    super(() => new BuildingLabModel(true), model => new BuildingLabScreenView(model), {
      name: FractionsMixedNumbersStrings.screen.labStringProperty,
      backgroundColorProperty: FractionsCommonColors.otherScreenBackgroundProperty,
      homeScreenIcon: new ScreenIcon(BuildingLabScreenView.createMixedScreenIcon(), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      })
    });
  }
}
fractionsMixedNumbers.register('LabScreen', LabScreen);
export default LabScreen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJGcmFjdGlvbnNDb21tb25Db2xvcnMiLCJCdWlsZGluZ0xhYk1vZGVsIiwiQnVpbGRpbmdMYWJTY3JlZW5WaWV3IiwiU2NyZWVuIiwiU2NyZWVuSWNvbiIsImZyYWN0aW9uc01peGVkTnVtYmVycyIsIkZyYWN0aW9uc01peGVkTnVtYmVyc1N0cmluZ3MiLCJMYWJTY3JlZW4iLCJjb25zdHJ1Y3RvciIsIm1vZGVsIiwibmFtZSIsInNjcmVlbiIsImxhYlN0cmluZ1Byb3BlcnR5IiwiYmFja2dyb3VuZENvbG9yUHJvcGVydHkiLCJvdGhlclNjcmVlbkJhY2tncm91bmRQcm9wZXJ0eSIsImhvbWVTY3JlZW5JY29uIiwiY3JlYXRlTWl4ZWRTY3JlZW5JY29uIiwibWF4SWNvbldpZHRoUHJvcG9ydGlvbiIsIm1heEljb25IZWlnaHRQcm9wb3J0aW9uIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJMYWJTY3JlZW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogTGFiIHNjcmVlbiBmb3IgRnJhY3Rpb25zOiBNaXhlZCBOdW1iZXJzXHJcbiAqXHJcbiAqIEBhdXRob3IgSm9uYXRoYW4gT2xzb24gPGpvbmF0aGFuLm9sc29uQGNvbG9yYWRvLmVkdT5cclxuICovXHJcblxyXG5pbXBvcnQgRnJhY3Rpb25zQ29tbW9uQ29sb3JzIGZyb20gJy4uLy4uLy4uL2ZyYWN0aW9ucy1jb21tb24vanMvY29tbW9uL3ZpZXcvRnJhY3Rpb25zQ29tbW9uQ29sb3JzLmpzJztcclxuaW1wb3J0IEJ1aWxkaW5nTGFiTW9kZWwgZnJvbSAnLi4vLi4vLi4vZnJhY3Rpb25zLWNvbW1vbi9qcy9sYWIvbW9kZWwvQnVpbGRpbmdMYWJNb2RlbC5qcyc7XHJcbmltcG9ydCBCdWlsZGluZ0xhYlNjcmVlblZpZXcgZnJvbSAnLi4vLi4vLi4vZnJhY3Rpb25zLWNvbW1vbi9qcy9sYWIvdmlldy9CdWlsZGluZ0xhYlNjcmVlblZpZXcuanMnO1xyXG5pbXBvcnQgU2NyZWVuIGZyb20gJy4uLy4uLy4uL2pvaXN0L2pzL1NjcmVlbi5qcyc7XHJcbmltcG9ydCBTY3JlZW5JY29uIGZyb20gJy4uLy4uLy4uL2pvaXN0L2pzL1NjcmVlbkljb24uanMnO1xyXG5pbXBvcnQgZnJhY3Rpb25zTWl4ZWROdW1iZXJzIGZyb20gJy4uL2ZyYWN0aW9uc01peGVkTnVtYmVycy5qcyc7XHJcbmltcG9ydCBGcmFjdGlvbnNNaXhlZE51bWJlcnNTdHJpbmdzIGZyb20gJy4uL0ZyYWN0aW9uc01peGVkTnVtYmVyc1N0cmluZ3MuanMnO1xyXG5cclxuY2xhc3MgTGFiU2NyZWVuIGV4dGVuZHMgU2NyZWVuIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKFxyXG4gICAgICAoKSA9PiBuZXcgQnVpbGRpbmdMYWJNb2RlbCggdHJ1ZSApLFxyXG4gICAgICBtb2RlbCA9PiBuZXcgQnVpbGRpbmdMYWJTY3JlZW5WaWV3KCBtb2RlbCApLFxyXG4gICAgICB7XHJcbiAgICAgICAgbmFtZTogRnJhY3Rpb25zTWl4ZWROdW1iZXJzU3RyaW5ncy5zY3JlZW4ubGFiU3RyaW5nUHJvcGVydHksXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yUHJvcGVydHk6IEZyYWN0aW9uc0NvbW1vbkNvbG9ycy5vdGhlclNjcmVlbkJhY2tncm91bmRQcm9wZXJ0eSxcclxuICAgICAgICBob21lU2NyZWVuSWNvbjogbmV3IFNjcmVlbkljb24oIEJ1aWxkaW5nTGFiU2NyZWVuVmlldy5jcmVhdGVNaXhlZFNjcmVlbkljb24oKSwge1xyXG4gICAgICAgICAgbWF4SWNvbldpZHRoUHJvcG9ydGlvbjogMSxcclxuICAgICAgICAgIG1heEljb25IZWlnaHRQcm9wb3J0aW9uOiAxXHJcbiAgICAgICAgfSApXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5mcmFjdGlvbnNNaXhlZE51bWJlcnMucmVnaXN0ZXIoICdMYWJTY3JlZW4nLCBMYWJTY3JlZW4gKTtcclxuZXhwb3J0IGRlZmF1bHQgTGFiU2NyZWVuOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxxQkFBcUIsTUFBTSxtRUFBbUU7QUFDckcsT0FBT0MsZ0JBQWdCLE1BQU0sNERBQTREO0FBQ3pGLE9BQU9DLHFCQUFxQixNQUFNLGdFQUFnRTtBQUNsRyxPQUFPQyxNQUFNLE1BQU0sNkJBQTZCO0FBQ2hELE9BQU9DLFVBQVUsTUFBTSxpQ0FBaUM7QUFDeEQsT0FBT0MscUJBQXFCLE1BQU0sNkJBQTZCO0FBQy9ELE9BQU9DLDRCQUE0QixNQUFNLG9DQUFvQztBQUU3RSxNQUFNQyxTQUFTLFNBQVNKLE1BQU0sQ0FBQztFQUM3QkssV0FBV0EsQ0FBQSxFQUFHO0lBQ1osS0FBSyxDQUNILE1BQU0sSUFBSVAsZ0JBQWdCLENBQUUsSUFBSyxDQUFDLEVBQ2xDUSxLQUFLLElBQUksSUFBSVAscUJBQXFCLENBQUVPLEtBQU0sQ0FBQyxFQUMzQztNQUNFQyxJQUFJLEVBQUVKLDRCQUE0QixDQUFDSyxNQUFNLENBQUNDLGlCQUFpQjtNQUMzREMsdUJBQXVCLEVBQUViLHFCQUFxQixDQUFDYyw2QkFBNkI7TUFDNUVDLGNBQWMsRUFBRSxJQUFJWCxVQUFVLENBQUVGLHFCQUFxQixDQUFDYyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUU7UUFDN0VDLHNCQUFzQixFQUFFLENBQUM7UUFDekJDLHVCQUF1QixFQUFFO01BQzNCLENBQUU7SUFDSixDQUNGLENBQUM7RUFDSDtBQUNGO0FBRUFiLHFCQUFxQixDQUFDYyxRQUFRLENBQUUsV0FBVyxFQUFFWixTQUFVLENBQUM7QUFDeEQsZUFBZUEsU0FBUyJ9