// Copyright 2016-2022, University of Colorado Boulder

/**
 * The 'To Scale' screen.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import toScaleIcon_png from '../../mipmaps/toScaleIcon_png.js';
import GravityAndOrbitsScreenView from '../common/view/GravityAndOrbitsScreenView.js';
import gravityAndOrbits from '../gravityAndOrbits.js';
import GravityAndOrbitsStrings from '../GravityAndOrbitsStrings.js';
import ToScaleModel from './ToScaleModel.js';
import optionize from '../../../phet-core/js/optionize.js';
class ToScaleScreen extends Screen {
  constructor(providedOptions) {
    const options = optionize()({
      name: GravityAndOrbitsStrings.toScaleStringProperty,
      homeScreenIcon: new ScreenIcon(new Image(toScaleIcon_png), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1,
        fill: 'black'
      })
    }, providedOptions);
    const viewTandem = options.tandem.createTandem('view');
    super(() => new ToScaleModel(options.tandem.createTandem('model'), viewTandem), model => new GravityAndOrbitsScreenView(model, viewTandem), options);
  }
}
gravityAndOrbits.register('ToScaleScreen', ToScaleScreen);
export default ToScaleScreen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTY3JlZW4iLCJTY3JlZW5JY29uIiwiSW1hZ2UiLCJ0b1NjYWxlSWNvbl9wbmciLCJHcmF2aXR5QW5kT3JiaXRzU2NyZWVuVmlldyIsImdyYXZpdHlBbmRPcmJpdHMiLCJHcmF2aXR5QW5kT3JiaXRzU3RyaW5ncyIsIlRvU2NhbGVNb2RlbCIsIm9wdGlvbml6ZSIsIlRvU2NhbGVTY3JlZW4iLCJjb25zdHJ1Y3RvciIsInByb3ZpZGVkT3B0aW9ucyIsIm9wdGlvbnMiLCJuYW1lIiwidG9TY2FsZVN0cmluZ1Byb3BlcnR5IiwiaG9tZVNjcmVlbkljb24iLCJtYXhJY29uV2lkdGhQcm9wb3J0aW9uIiwibWF4SWNvbkhlaWdodFByb3BvcnRpb24iLCJmaWxsIiwidmlld1RhbmRlbSIsInRhbmRlbSIsImNyZWF0ZVRhbmRlbSIsIm1vZGVsIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJUb1NjYWxlU2NyZWVuLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE2LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFRoZSAnVG8gU2NhbGUnIHNjcmVlbi5cclxuICpcclxuICogQGF1dGhvciBKZXNzZSBHcmVlbmJlcmcgKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqL1xyXG5cclxuaW1wb3J0IFNjcmVlbiwgeyBTY3JlZW5PcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vam9pc3QvanMvU2NyZWVuLmpzJztcclxuaW1wb3J0IFNjcmVlbkljb24gZnJvbSAnLi4vLi4vLi4vam9pc3QvanMvU2NyZWVuSWNvbi5qcyc7XHJcbmltcG9ydCB7IEltYWdlIH0gZnJvbSAnLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IHRvU2NhbGVJY29uX3BuZyBmcm9tICcuLi8uLi9taXBtYXBzL3RvU2NhbGVJY29uX3BuZy5qcyc7XHJcbmltcG9ydCBHcmF2aXR5QW5kT3JiaXRzU2NyZWVuVmlldyBmcm9tICcuLi9jb21tb24vdmlldy9HcmF2aXR5QW5kT3JiaXRzU2NyZWVuVmlldy5qcyc7XHJcbmltcG9ydCBncmF2aXR5QW5kT3JiaXRzIGZyb20gJy4uL2dyYXZpdHlBbmRPcmJpdHMuanMnO1xyXG5pbXBvcnQgR3Jhdml0eUFuZE9yYml0c1N0cmluZ3MgZnJvbSAnLi4vR3Jhdml0eUFuZE9yYml0c1N0cmluZ3MuanMnO1xyXG5pbXBvcnQgVG9TY2FsZU1vZGVsIGZyb20gJy4vVG9TY2FsZU1vZGVsLmpzJztcclxuaW1wb3J0IG9wdGlvbml6ZSwgeyBFbXB0eVNlbGZPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vcGhldC1jb3JlL2pzL29wdGlvbml6ZS5qcyc7XHJcblxyXG5jbGFzcyBUb1NjYWxlU2NyZWVuIGV4dGVuZHMgU2NyZWVuPFRvU2NhbGVNb2RlbCwgR3Jhdml0eUFuZE9yYml0c1NjcmVlblZpZXc+IHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IoIHByb3ZpZGVkT3B0aW9ucz86IFNjcmVlbk9wdGlvbnMgKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gb3B0aW9uaXplPFNjcmVlbk9wdGlvbnMsIEVtcHR5U2VsZk9wdGlvbnMsIFNjcmVlbk9wdGlvbnM+KCkoIHtcclxuICAgICAgbmFtZTogR3Jhdml0eUFuZE9yYml0c1N0cmluZ3MudG9TY2FsZVN0cmluZ1Byb3BlcnR5LFxyXG5cclxuICAgICAgaG9tZVNjcmVlbkljb246IG5ldyBTY3JlZW5JY29uKCBuZXcgSW1hZ2UoIHRvU2NhbGVJY29uX3BuZyApLCB7XHJcbiAgICAgICAgbWF4SWNvbldpZHRoUHJvcG9ydGlvbjogMSxcclxuICAgICAgICBtYXhJY29uSGVpZ2h0UHJvcG9ydGlvbjogMSxcclxuICAgICAgICBmaWxsOiAnYmxhY2snXHJcbiAgICAgIH0gKVxyXG4gICAgfSwgcHJvdmlkZWRPcHRpb25zICk7XHJcblxyXG4gICAgY29uc3Qgdmlld1RhbmRlbSA9IG9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3ZpZXcnICk7XHJcbiAgICBzdXBlcihcclxuICAgICAgKCkgPT4gbmV3IFRvU2NhbGVNb2RlbCggb3B0aW9ucy50YW5kZW0uY3JlYXRlVGFuZGVtKCAnbW9kZWwnICksIHZpZXdUYW5kZW0gKSxcclxuICAgICAgbW9kZWwgPT4gbmV3IEdyYXZpdHlBbmRPcmJpdHNTY3JlZW5WaWV3KCBtb2RlbCwgdmlld1RhbmRlbSApLFxyXG4gICAgICBvcHRpb25zXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZ3Jhdml0eUFuZE9yYml0cy5yZWdpc3RlciggJ1RvU2NhbGVTY3JlZW4nLCBUb1NjYWxlU2NyZWVuICk7XHJcbmV4cG9ydCBkZWZhdWx0IFRvU2NhbGVTY3JlZW47Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLE1BQU0sTUFBeUIsNkJBQTZCO0FBQ25FLE9BQU9DLFVBQVUsTUFBTSxpQ0FBaUM7QUFDeEQsU0FBU0MsS0FBSyxRQUFRLGdDQUFnQztBQUN0RCxPQUFPQyxlQUFlLE1BQU0sa0NBQWtDO0FBQzlELE9BQU9DLDBCQUEwQixNQUFNLDhDQUE4QztBQUNyRixPQUFPQyxnQkFBZ0IsTUFBTSx3QkFBd0I7QUFDckQsT0FBT0MsdUJBQXVCLE1BQU0sK0JBQStCO0FBQ25FLE9BQU9DLFlBQVksTUFBTSxtQkFBbUI7QUFDNUMsT0FBT0MsU0FBUyxNQUE0QixvQ0FBb0M7QUFFaEYsTUFBTUMsYUFBYSxTQUFTVCxNQUFNLENBQTJDO0VBQ3BFVSxXQUFXQSxDQUFFQyxlQUErQixFQUFHO0lBQ3BELE1BQU1DLE9BQU8sR0FBR0osU0FBUyxDQUFpRCxDQUFDLENBQUU7TUFDM0VLLElBQUksRUFBRVAsdUJBQXVCLENBQUNRLHFCQUFxQjtNQUVuREMsY0FBYyxFQUFFLElBQUlkLFVBQVUsQ0FBRSxJQUFJQyxLQUFLLENBQUVDLGVBQWdCLENBQUMsRUFBRTtRQUM1RGEsc0JBQXNCLEVBQUUsQ0FBQztRQUN6QkMsdUJBQXVCLEVBQUUsQ0FBQztRQUMxQkMsSUFBSSxFQUFFO01BQ1IsQ0FBRTtJQUNKLENBQUMsRUFBRVAsZUFBZ0IsQ0FBQztJQUVwQixNQUFNUSxVQUFVLEdBQUdQLE9BQU8sQ0FBQ1EsTUFBTSxDQUFDQyxZQUFZLENBQUUsTUFBTyxDQUFDO0lBQ3hELEtBQUssQ0FDSCxNQUFNLElBQUlkLFlBQVksQ0FBRUssT0FBTyxDQUFDUSxNQUFNLENBQUNDLFlBQVksQ0FBRSxPQUFRLENBQUMsRUFBRUYsVUFBVyxDQUFDLEVBQzVFRyxLQUFLLElBQUksSUFBSWxCLDBCQUEwQixDQUFFa0IsS0FBSyxFQUFFSCxVQUFXLENBQUMsRUFDNURQLE9BQ0YsQ0FBQztFQUNIO0FBQ0Y7QUFFQVAsZ0JBQWdCLENBQUNrQixRQUFRLENBQUUsZUFBZSxFQUFFZCxhQUFjLENBQUM7QUFDM0QsZUFBZUEsYUFBYSJ9