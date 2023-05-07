// Copyright 2018-2022, University of Colorado Boulder

/**
 * The "Lab" screen for Build a Fraction
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import FractionsCommonColors from '../../../fractions-common/js/common/view/FractionsCommonColors.js';
import BuildingLabModel from '../../../fractions-common/js/lab/model/BuildingLabModel.js';
import BuildingLabScreenView from '../../../fractions-common/js/lab/view/BuildingLabScreenView.js';
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import buildAFraction from '../buildAFraction.js';
import BuildAFractionStrings from '../BuildAFractionStrings.js';
class LabScreen extends Screen {
  constructor() {
    super(() => new BuildingLabModel(true), model => new BuildingLabScreenView(model), {
      name: BuildAFractionStrings.screen.labStringProperty,
      backgroundColorProperty: FractionsCommonColors.otherScreenBackgroundProperty,
      homeScreenIcon: new ScreenIcon(BuildingLabScreenView.createMixedScreenIcon(), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      })
    });
  }
}
buildAFraction.register('LabScreen', LabScreen);
export default LabScreen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJGcmFjdGlvbnNDb21tb25Db2xvcnMiLCJCdWlsZGluZ0xhYk1vZGVsIiwiQnVpbGRpbmdMYWJTY3JlZW5WaWV3IiwiU2NyZWVuIiwiU2NyZWVuSWNvbiIsImJ1aWxkQUZyYWN0aW9uIiwiQnVpbGRBRnJhY3Rpb25TdHJpbmdzIiwiTGFiU2NyZWVuIiwiY29uc3RydWN0b3IiLCJtb2RlbCIsIm5hbWUiLCJzY3JlZW4iLCJsYWJTdHJpbmdQcm9wZXJ0eSIsImJhY2tncm91bmRDb2xvclByb3BlcnR5Iiwib3RoZXJTY3JlZW5CYWNrZ3JvdW5kUHJvcGVydHkiLCJob21lU2NyZWVuSWNvbiIsImNyZWF0ZU1peGVkU2NyZWVuSWNvbiIsIm1heEljb25XaWR0aFByb3BvcnRpb24iLCJtYXhJY29uSGVpZ2h0UHJvcG9ydGlvbiIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiTGFiU2NyZWVuLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFRoZSBcIkxhYlwiIHNjcmVlbiBmb3IgQnVpbGQgYSBGcmFjdGlvblxyXG4gKlxyXG4gKiBAYXV0aG9yIEpvbmF0aGFuIE9sc29uIDxqb25hdGhhbi5vbHNvbkBjb2xvcmFkby5lZHU+XHJcbiAqL1xyXG5cclxuaW1wb3J0IEZyYWN0aW9uc0NvbW1vbkNvbG9ycyBmcm9tICcuLi8uLi8uLi9mcmFjdGlvbnMtY29tbW9uL2pzL2NvbW1vbi92aWV3L0ZyYWN0aW9uc0NvbW1vbkNvbG9ycy5qcyc7XHJcbmltcG9ydCBCdWlsZGluZ0xhYk1vZGVsIGZyb20gJy4uLy4uLy4uL2ZyYWN0aW9ucy1jb21tb24vanMvbGFiL21vZGVsL0J1aWxkaW5nTGFiTW9kZWwuanMnO1xyXG5pbXBvcnQgQnVpbGRpbmdMYWJTY3JlZW5WaWV3IGZyb20gJy4uLy4uLy4uL2ZyYWN0aW9ucy1jb21tb24vanMvbGFiL3ZpZXcvQnVpbGRpbmdMYWJTY3JlZW5WaWV3LmpzJztcclxuaW1wb3J0IFNjcmVlbiBmcm9tICcuLi8uLi8uLi9qb2lzdC9qcy9TY3JlZW4uanMnO1xyXG5pbXBvcnQgU2NyZWVuSWNvbiBmcm9tICcuLi8uLi8uLi9qb2lzdC9qcy9TY3JlZW5JY29uLmpzJztcclxuaW1wb3J0IGJ1aWxkQUZyYWN0aW9uIGZyb20gJy4uL2J1aWxkQUZyYWN0aW9uLmpzJztcclxuaW1wb3J0IEJ1aWxkQUZyYWN0aW9uU3RyaW5ncyBmcm9tICcuLi9CdWlsZEFGcmFjdGlvblN0cmluZ3MuanMnO1xyXG5cclxuY2xhc3MgTGFiU2NyZWVuIGV4dGVuZHMgU2NyZWVuIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKFxyXG4gICAgICAoKSA9PiBuZXcgQnVpbGRpbmdMYWJNb2RlbCggdHJ1ZSApLFxyXG4gICAgICBtb2RlbCA9PiBuZXcgQnVpbGRpbmdMYWJTY3JlZW5WaWV3KCBtb2RlbCApLFxyXG4gICAgICB7XHJcbiAgICAgICAgbmFtZTogQnVpbGRBRnJhY3Rpb25TdHJpbmdzLnNjcmVlbi5sYWJTdHJpbmdQcm9wZXJ0eSxcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eTogRnJhY3Rpb25zQ29tbW9uQ29sb3JzLm90aGVyU2NyZWVuQmFja2dyb3VuZFByb3BlcnR5LFxyXG4gICAgICAgIGhvbWVTY3JlZW5JY29uOiBuZXcgU2NyZWVuSWNvbiggQnVpbGRpbmdMYWJTY3JlZW5WaWV3LmNyZWF0ZU1peGVkU2NyZWVuSWNvbigpLCB7XHJcbiAgICAgICAgICBtYXhJY29uV2lkdGhQcm9wb3J0aW9uOiAxLFxyXG4gICAgICAgICAgbWF4SWNvbkhlaWdodFByb3BvcnRpb246IDFcclxuICAgICAgICB9IClcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmJ1aWxkQUZyYWN0aW9uLnJlZ2lzdGVyKCAnTGFiU2NyZWVuJywgTGFiU2NyZWVuICk7XHJcbmV4cG9ydCBkZWZhdWx0IExhYlNjcmVlbjsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EscUJBQXFCLE1BQU0sbUVBQW1FO0FBQ3JHLE9BQU9DLGdCQUFnQixNQUFNLDREQUE0RDtBQUN6RixPQUFPQyxxQkFBcUIsTUFBTSxnRUFBZ0U7QUFDbEcsT0FBT0MsTUFBTSxNQUFNLDZCQUE2QjtBQUNoRCxPQUFPQyxVQUFVLE1BQU0saUNBQWlDO0FBQ3hELE9BQU9DLGNBQWMsTUFBTSxzQkFBc0I7QUFDakQsT0FBT0MscUJBQXFCLE1BQU0sNkJBQTZCO0FBRS9ELE1BQU1DLFNBQVMsU0FBU0osTUFBTSxDQUFDO0VBQzdCSyxXQUFXQSxDQUFBLEVBQUc7SUFDWixLQUFLLENBQ0gsTUFBTSxJQUFJUCxnQkFBZ0IsQ0FBRSxJQUFLLENBQUMsRUFDbENRLEtBQUssSUFBSSxJQUFJUCxxQkFBcUIsQ0FBRU8sS0FBTSxDQUFDLEVBQzNDO01BQ0VDLElBQUksRUFBRUoscUJBQXFCLENBQUNLLE1BQU0sQ0FBQ0MsaUJBQWlCO01BQ3BEQyx1QkFBdUIsRUFBRWIscUJBQXFCLENBQUNjLDZCQUE2QjtNQUM1RUMsY0FBYyxFQUFFLElBQUlYLFVBQVUsQ0FBRUYscUJBQXFCLENBQUNjLHFCQUFxQixDQUFDLENBQUMsRUFBRTtRQUM3RUMsc0JBQXNCLEVBQUUsQ0FBQztRQUN6QkMsdUJBQXVCLEVBQUU7TUFDM0IsQ0FBRTtJQUNKLENBQ0YsQ0FBQztFQUNIO0FBQ0Y7QUFFQWIsY0FBYyxDQUFDYyxRQUFRLENBQUUsV0FBVyxFQUFFWixTQUFVLENBQUM7QUFDakQsZUFBZUEsU0FBUyJ9