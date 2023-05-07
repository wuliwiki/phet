// Copyright 2014-2022, University of Colorado Boulder

/**
 * The 'Water Tower' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import waterTowerMockup_png from '../../images/waterTowerMockup_png.js';
import fluidPressureAndFlow from '../fluidPressureAndFlow.js';
import FluidPressureAndFlowStrings from '../FluidPressureAndFlowStrings.js';
import WaterTowerModel from './model/WaterTowerModel.js';
import WaterTowerScreenView from './view/WaterTowerScreenView.js';
class WaterTowerScreen extends Screen {
  constructor() {
    const options = {
      name: FluidPressureAndFlowStrings.waterTowerScreenTitleStringProperty,
      backgroundColorProperty: new Property('white'),
      homeScreenIcon: new ScreenIcon(new Image(waterTowerMockup_png), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      })
    };
    super(() => new WaterTowerModel(), model => new WaterTowerScreenView(model), options);
  }
}
fluidPressureAndFlow.register('WaterTowerScreen', WaterTowerScreen);
export default WaterTowerScreen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQcm9wZXJ0eSIsIlNjcmVlbiIsIlNjcmVlbkljb24iLCJJbWFnZSIsIndhdGVyVG93ZXJNb2NrdXBfcG5nIiwiZmx1aWRQcmVzc3VyZUFuZEZsb3ciLCJGbHVpZFByZXNzdXJlQW5kRmxvd1N0cmluZ3MiLCJXYXRlclRvd2VyTW9kZWwiLCJXYXRlclRvd2VyU2NyZWVuVmlldyIsIldhdGVyVG93ZXJTY3JlZW4iLCJjb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJuYW1lIiwid2F0ZXJUb3dlclNjcmVlblRpdGxlU3RyaW5nUHJvcGVydHkiLCJiYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eSIsImhvbWVTY3JlZW5JY29uIiwibWF4SWNvbldpZHRoUHJvcG9ydGlvbiIsIm1heEljb25IZWlnaHRQcm9wb3J0aW9uIiwibW9kZWwiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIldhdGVyVG93ZXJTY3JlZW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTQtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogVGhlICdXYXRlciBUb3dlcicgc2NyZWVuLiBDb25mb3JtcyB0byB0aGUgY29udHJhY3Qgc3BlY2lmaWVkIGluIGpvaXN0L1NjcmVlbi5cclxuICpcclxuICogQGF1dGhvciBTYW0gUmVpZCAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vYXhvbi9qcy9Qcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBTY3JlZW4gZnJvbSAnLi4vLi4vLi4vam9pc3QvanMvU2NyZWVuLmpzJztcclxuaW1wb3J0IFNjcmVlbkljb24gZnJvbSAnLi4vLi4vLi4vam9pc3QvanMvU2NyZWVuSWNvbi5qcyc7XHJcbmltcG9ydCB7IEltYWdlIH0gZnJvbSAnLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IHdhdGVyVG93ZXJNb2NrdXBfcG5nIGZyb20gJy4uLy4uL2ltYWdlcy93YXRlclRvd2VyTW9ja3VwX3BuZy5qcyc7XHJcbmltcG9ydCBmbHVpZFByZXNzdXJlQW5kRmxvdyBmcm9tICcuLi9mbHVpZFByZXNzdXJlQW5kRmxvdy5qcyc7XHJcbmltcG9ydCBGbHVpZFByZXNzdXJlQW5kRmxvd1N0cmluZ3MgZnJvbSAnLi4vRmx1aWRQcmVzc3VyZUFuZEZsb3dTdHJpbmdzLmpzJztcclxuaW1wb3J0IFdhdGVyVG93ZXJNb2RlbCBmcm9tICcuL21vZGVsL1dhdGVyVG93ZXJNb2RlbC5qcyc7XHJcbmltcG9ydCBXYXRlclRvd2VyU2NyZWVuVmlldyBmcm9tICcuL3ZpZXcvV2F0ZXJUb3dlclNjcmVlblZpZXcuanMnO1xyXG5cclxuXHJcbmNsYXNzIFdhdGVyVG93ZXJTY3JlZW4gZXh0ZW5kcyBTY3JlZW4ge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBuYW1lOiBGbHVpZFByZXNzdXJlQW5kRmxvd1N0cmluZ3Mud2F0ZXJUb3dlclNjcmVlblRpdGxlU3RyaW5nUHJvcGVydHksXHJcbiAgICAgIGJhY2tncm91bmRDb2xvclByb3BlcnR5OiBuZXcgUHJvcGVydHkoICd3aGl0ZScgKSxcclxuICAgICAgaG9tZVNjcmVlbkljb246IG5ldyBTY3JlZW5JY29uKCBuZXcgSW1hZ2UoIHdhdGVyVG93ZXJNb2NrdXBfcG5nICksIHtcclxuICAgICAgICBtYXhJY29uV2lkdGhQcm9wb3J0aW9uOiAxLFxyXG4gICAgICAgIG1heEljb25IZWlnaHRQcm9wb3J0aW9uOiAxXHJcbiAgICAgIH0gKVxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihcclxuICAgICAgKCkgPT4gbmV3IFdhdGVyVG93ZXJNb2RlbCgpLFxyXG4gICAgICBtb2RlbCA9PiBuZXcgV2F0ZXJUb3dlclNjcmVlblZpZXcoIG1vZGVsICksXHJcbiAgICAgIG9wdGlvbnNcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5mbHVpZFByZXNzdXJlQW5kRmxvdy5yZWdpc3RlciggJ1dhdGVyVG93ZXJTY3JlZW4nLCBXYXRlclRvd2VyU2NyZWVuICk7XHJcbmV4cG9ydCBkZWZhdWx0IFdhdGVyVG93ZXJTY3JlZW47Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFFBQVEsTUFBTSw4QkFBOEI7QUFDbkQsT0FBT0MsTUFBTSxNQUFNLDZCQUE2QjtBQUNoRCxPQUFPQyxVQUFVLE1BQU0saUNBQWlDO0FBQ3hELFNBQVNDLEtBQUssUUFBUSxnQ0FBZ0M7QUFDdEQsT0FBT0Msb0JBQW9CLE1BQU0sc0NBQXNDO0FBQ3ZFLE9BQU9DLG9CQUFvQixNQUFNLDRCQUE0QjtBQUM3RCxPQUFPQywyQkFBMkIsTUFBTSxtQ0FBbUM7QUFDM0UsT0FBT0MsZUFBZSxNQUFNLDRCQUE0QjtBQUN4RCxPQUFPQyxvQkFBb0IsTUFBTSxnQ0FBZ0M7QUFHakUsTUFBTUMsZ0JBQWdCLFNBQVNSLE1BQU0sQ0FBQztFQUVwQ1MsV0FBV0EsQ0FBQSxFQUFHO0lBRVosTUFBTUMsT0FBTyxHQUFHO01BQ2RDLElBQUksRUFBRU4sMkJBQTJCLENBQUNPLG1DQUFtQztNQUNyRUMsdUJBQXVCLEVBQUUsSUFBSWQsUUFBUSxDQUFFLE9BQVEsQ0FBQztNQUNoRGUsY0FBYyxFQUFFLElBQUliLFVBQVUsQ0FBRSxJQUFJQyxLQUFLLENBQUVDLG9CQUFxQixDQUFDLEVBQUU7UUFDakVZLHNCQUFzQixFQUFFLENBQUM7UUFDekJDLHVCQUF1QixFQUFFO01BQzNCLENBQUU7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUNILE1BQU0sSUFBSVYsZUFBZSxDQUFDLENBQUMsRUFDM0JXLEtBQUssSUFBSSxJQUFJVixvQkFBb0IsQ0FBRVUsS0FBTSxDQUFDLEVBQzFDUCxPQUNGLENBQUM7RUFDSDtBQUNGO0FBRUFOLG9CQUFvQixDQUFDYyxRQUFRLENBQUUsa0JBQWtCLEVBQUVWLGdCQUFpQixDQUFDO0FBQ3JFLGVBQWVBLGdCQUFnQiJ9