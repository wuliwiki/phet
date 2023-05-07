// Copyright 2018-2022, University of Colorado Boulder

/**
 * The "Game" screen in "Area Model: Multiplication"
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import genericGameScreenIcon_png from '../../mipmaps/genericGameScreenIcon_png.js';
import genericGameScreenNavbar_png from '../../mipmaps/genericGameScreenNavbar_png.js';
import areaModelCommon from '../areaModelCommon.js';
import AreaModelCommonStrings from '../AreaModelCommonStrings.js';
import AreaModelCommonColors from '../common/view/AreaModelCommonColors.js';
import GenericGameAreaModel from '../game/model/GenericGameAreaModel.js';
import GameAreaScreenView from '../game/view/GameAreaScreenView.js';
class GenericGameScreen extends Screen {
  constructor() {
    const options = {
      name: AreaModelCommonStrings.screen.gameStringProperty,
      backgroundColorProperty: AreaModelCommonColors.backgroundProperty,
      homeScreenIcon: new ScreenIcon(new Image(genericGameScreenIcon_png), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      }),
      navigationBarIcon: new ScreenIcon(new Image(genericGameScreenNavbar_png), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      })
    };
    super(() => new GenericGameAreaModel(), model => new GameAreaScreenView(model), options);
  }
}
areaModelCommon.register('GenericGameScreen', GenericGameScreen);
export default GenericGameScreen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTY3JlZW4iLCJTY3JlZW5JY29uIiwiSW1hZ2UiLCJnZW5lcmljR2FtZVNjcmVlbkljb25fcG5nIiwiZ2VuZXJpY0dhbWVTY3JlZW5OYXZiYXJfcG5nIiwiYXJlYU1vZGVsQ29tbW9uIiwiQXJlYU1vZGVsQ29tbW9uU3RyaW5ncyIsIkFyZWFNb2RlbENvbW1vbkNvbG9ycyIsIkdlbmVyaWNHYW1lQXJlYU1vZGVsIiwiR2FtZUFyZWFTY3JlZW5WaWV3IiwiR2VuZXJpY0dhbWVTY3JlZW4iLCJjb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJuYW1lIiwic2NyZWVuIiwiZ2FtZVN0cmluZ1Byb3BlcnR5IiwiYmFja2dyb3VuZENvbG9yUHJvcGVydHkiLCJiYWNrZ3JvdW5kUHJvcGVydHkiLCJob21lU2NyZWVuSWNvbiIsIm1heEljb25XaWR0aFByb3BvcnRpb24iLCJtYXhJY29uSGVpZ2h0UHJvcG9ydGlvbiIsIm5hdmlnYXRpb25CYXJJY29uIiwibW9kZWwiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkdlbmVyaWNHYW1lU2NyZWVuLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFRoZSBcIkdhbWVcIiBzY3JlZW4gaW4gXCJBcmVhIE1vZGVsOiBNdWx0aXBsaWNhdGlvblwiXHJcbiAqXHJcbiAqIEBhdXRob3IgSm9uYXRoYW4gT2xzb24gPGpvbmF0aGFuLm9sc29uQGNvbG9yYWRvLmVkdT5cclxuICovXHJcblxyXG5pbXBvcnQgU2NyZWVuIGZyb20gJy4uLy4uLy4uL2pvaXN0L2pzL1NjcmVlbi5qcyc7XHJcbmltcG9ydCBTY3JlZW5JY29uIGZyb20gJy4uLy4uLy4uL2pvaXN0L2pzL1NjcmVlbkljb24uanMnO1xyXG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gJy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBnZW5lcmljR2FtZVNjcmVlbkljb25fcG5nIGZyb20gJy4uLy4uL21pcG1hcHMvZ2VuZXJpY0dhbWVTY3JlZW5JY29uX3BuZy5qcyc7XHJcbmltcG9ydCBnZW5lcmljR2FtZVNjcmVlbk5hdmJhcl9wbmcgZnJvbSAnLi4vLi4vbWlwbWFwcy9nZW5lcmljR2FtZVNjcmVlbk5hdmJhcl9wbmcuanMnO1xyXG5pbXBvcnQgYXJlYU1vZGVsQ29tbW9uIGZyb20gJy4uL2FyZWFNb2RlbENvbW1vbi5qcyc7XHJcbmltcG9ydCBBcmVhTW9kZWxDb21tb25TdHJpbmdzIGZyb20gJy4uL0FyZWFNb2RlbENvbW1vblN0cmluZ3MuanMnO1xyXG5pbXBvcnQgQXJlYU1vZGVsQ29tbW9uQ29sb3JzIGZyb20gJy4uL2NvbW1vbi92aWV3L0FyZWFNb2RlbENvbW1vbkNvbG9ycy5qcyc7XHJcbmltcG9ydCBHZW5lcmljR2FtZUFyZWFNb2RlbCBmcm9tICcuLi9nYW1lL21vZGVsL0dlbmVyaWNHYW1lQXJlYU1vZGVsLmpzJztcclxuaW1wb3J0IEdhbWVBcmVhU2NyZWVuVmlldyBmcm9tICcuLi9nYW1lL3ZpZXcvR2FtZUFyZWFTY3JlZW5WaWV3LmpzJztcclxuXHJcbmNsYXNzIEdlbmVyaWNHYW1lU2NyZWVuIGV4dGVuZHMgU2NyZWVuIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBuYW1lOiBBcmVhTW9kZWxDb21tb25TdHJpbmdzLnNjcmVlbi5nYW1lU3RyaW5nUHJvcGVydHksXHJcbiAgICAgIGJhY2tncm91bmRDb2xvclByb3BlcnR5OiBBcmVhTW9kZWxDb21tb25Db2xvcnMuYmFja2dyb3VuZFByb3BlcnR5LFxyXG4gICAgICBob21lU2NyZWVuSWNvbjogbmV3IFNjcmVlbkljb24oIG5ldyBJbWFnZSggZ2VuZXJpY0dhbWVTY3JlZW5JY29uX3BuZyApLCB7XHJcbiAgICAgICAgbWF4SWNvbldpZHRoUHJvcG9ydGlvbjogMSxcclxuICAgICAgICBtYXhJY29uSGVpZ2h0UHJvcG9ydGlvbjogMVxyXG4gICAgICB9ICksXHJcbiAgICAgIG5hdmlnYXRpb25CYXJJY29uOiBuZXcgU2NyZWVuSWNvbiggbmV3IEltYWdlKCBnZW5lcmljR2FtZVNjcmVlbk5hdmJhcl9wbmcgKSwge1xyXG4gICAgICAgIG1heEljb25XaWR0aFByb3BvcnRpb246IDEsXHJcbiAgICAgICAgbWF4SWNvbkhlaWdodFByb3BvcnRpb246IDFcclxuICAgICAgfSApXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKFxyXG4gICAgICAoKSA9PiBuZXcgR2VuZXJpY0dhbWVBcmVhTW9kZWwoKSxcclxuICAgICAgbW9kZWwgPT4gbmV3IEdhbWVBcmVhU2NyZWVuVmlldyggbW9kZWwgKSxcclxuICAgICAgb3B0aW9uc1xyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmFyZWFNb2RlbENvbW1vbi5yZWdpc3RlciggJ0dlbmVyaWNHYW1lU2NyZWVuJywgR2VuZXJpY0dhbWVTY3JlZW4gKTtcclxuZXhwb3J0IGRlZmF1bHQgR2VuZXJpY0dhbWVTY3JlZW47Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLE1BQU0sTUFBTSw2QkFBNkI7QUFDaEQsT0FBT0MsVUFBVSxNQUFNLGlDQUFpQztBQUN4RCxTQUFTQyxLQUFLLFFBQVEsZ0NBQWdDO0FBQ3RELE9BQU9DLHlCQUF5QixNQUFNLDRDQUE0QztBQUNsRixPQUFPQywyQkFBMkIsTUFBTSw4Q0FBOEM7QUFDdEYsT0FBT0MsZUFBZSxNQUFNLHVCQUF1QjtBQUNuRCxPQUFPQyxzQkFBc0IsTUFBTSw4QkFBOEI7QUFDakUsT0FBT0MscUJBQXFCLE1BQU0seUNBQXlDO0FBQzNFLE9BQU9DLG9CQUFvQixNQUFNLHVDQUF1QztBQUN4RSxPQUFPQyxrQkFBa0IsTUFBTSxvQ0FBb0M7QUFFbkUsTUFBTUMsaUJBQWlCLFNBQVNWLE1BQU0sQ0FBQztFQUNyQ1csV0FBV0EsQ0FBQSxFQUFHO0lBRVosTUFBTUMsT0FBTyxHQUFHO01BQ2RDLElBQUksRUFBRVAsc0JBQXNCLENBQUNRLE1BQU0sQ0FBQ0Msa0JBQWtCO01BQ3REQyx1QkFBdUIsRUFBRVQscUJBQXFCLENBQUNVLGtCQUFrQjtNQUNqRUMsY0FBYyxFQUFFLElBQUlqQixVQUFVLENBQUUsSUFBSUMsS0FBSyxDQUFFQyx5QkFBMEIsQ0FBQyxFQUFFO1FBQ3RFZ0Isc0JBQXNCLEVBQUUsQ0FBQztRQUN6QkMsdUJBQXVCLEVBQUU7TUFDM0IsQ0FBRSxDQUFDO01BQ0hDLGlCQUFpQixFQUFFLElBQUlwQixVQUFVLENBQUUsSUFBSUMsS0FBSyxDQUFFRSwyQkFBNEIsQ0FBQyxFQUFFO1FBQzNFZSxzQkFBc0IsRUFBRSxDQUFDO1FBQ3pCQyx1QkFBdUIsRUFBRTtNQUMzQixDQUFFO0lBQ0osQ0FBQztJQUVELEtBQUssQ0FDSCxNQUFNLElBQUlaLG9CQUFvQixDQUFDLENBQUMsRUFDaENjLEtBQUssSUFBSSxJQUFJYixrQkFBa0IsQ0FBRWEsS0FBTSxDQUFDLEVBQ3hDVixPQUNGLENBQUM7RUFDSDtBQUNGO0FBRUFQLGVBQWUsQ0FBQ2tCLFFBQVEsQ0FBRSxtQkFBbUIsRUFBRWIsaUJBQWtCLENBQUM7QUFDbEUsZUFBZUEsaUJBQWlCIn0=