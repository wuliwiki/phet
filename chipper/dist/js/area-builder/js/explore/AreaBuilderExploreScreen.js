// Copyright 2014-2022, University of Colorado Boulder

/**
 * The 'Explore' screen in the Area Builder simulation. Conforms to the contract specified in joist/Screen.
 *
 * @author John Blanco
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import exploreIcon_png from '../../images/exploreIcon_png.js';
import areaBuilder from '../areaBuilder.js';
import AreaBuilderStrings from '../AreaBuilderStrings.js';
import AreaBuilderSharedConstants from '../common/AreaBuilderSharedConstants.js';
import AreaBuilderIconFactory from '../common/view/AreaBuilderIconFactory.js';
import AreaBuilderExploreModel from './model/AreaBuilderExploreModel.js';
import AreaBuilderExploreView from './view/AreaBuilderExploreView.js';
class AreaBuilderExploreScreen extends Screen {
  /**
   * @param {Tandem} tandem
   */
  constructor(tandem) {
    const options = {
      name: AreaBuilderStrings.exploreStringProperty,
      backgroundColorProperty: new Property(AreaBuilderSharedConstants.BACKGROUND_COLOR),
      homeScreenIcon: new ScreenIcon(new Image(exploreIcon_png), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      }),
      navigationBarIcon: AreaBuilderIconFactory.createExploreScreenNavBarIcon(),
      tandem: tandem
    };
    super(() => new AreaBuilderExploreModel(), model => new AreaBuilderExploreView(model), options);
  }
}
areaBuilder.register('AreaBuilderExploreScreen', AreaBuilderExploreScreen);
export default AreaBuilderExploreScreen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQcm9wZXJ0eSIsIlNjcmVlbiIsIlNjcmVlbkljb24iLCJJbWFnZSIsImV4cGxvcmVJY29uX3BuZyIsImFyZWFCdWlsZGVyIiwiQXJlYUJ1aWxkZXJTdHJpbmdzIiwiQXJlYUJ1aWxkZXJTaGFyZWRDb25zdGFudHMiLCJBcmVhQnVpbGRlckljb25GYWN0b3J5IiwiQXJlYUJ1aWxkZXJFeHBsb3JlTW9kZWwiLCJBcmVhQnVpbGRlckV4cGxvcmVWaWV3IiwiQXJlYUJ1aWxkZXJFeHBsb3JlU2NyZWVuIiwiY29uc3RydWN0b3IiLCJ0YW5kZW0iLCJvcHRpb25zIiwibmFtZSIsImV4cGxvcmVTdHJpbmdQcm9wZXJ0eSIsImJhY2tncm91bmRDb2xvclByb3BlcnR5IiwiQkFDS0dST1VORF9DT0xPUiIsImhvbWVTY3JlZW5JY29uIiwibWF4SWNvbldpZHRoUHJvcG9ydGlvbiIsIm1heEljb25IZWlnaHRQcm9wb3J0aW9uIiwibmF2aWdhdGlvbkJhckljb24iLCJjcmVhdGVFeHBsb3JlU2NyZWVuTmF2QmFySWNvbiIsIm1vZGVsIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJBcmVhQnVpbGRlckV4cGxvcmVTY3JlZW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTQtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogVGhlICdFeHBsb3JlJyBzY3JlZW4gaW4gdGhlIEFyZWEgQnVpbGRlciBzaW11bGF0aW9uLiBDb25mb3JtcyB0byB0aGUgY29udHJhY3Qgc3BlY2lmaWVkIGluIGpvaXN0L1NjcmVlbi5cclxuICpcclxuICogQGF1dGhvciBKb2huIEJsYW5jb1xyXG4gKi9cclxuXHJcbmltcG9ydCBQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi9heG9uL2pzL1Byb3BlcnR5LmpzJztcclxuaW1wb3J0IFNjcmVlbiBmcm9tICcuLi8uLi8uLi9qb2lzdC9qcy9TY3JlZW4uanMnO1xyXG5pbXBvcnQgU2NyZWVuSWNvbiBmcm9tICcuLi8uLi8uLi9qb2lzdC9qcy9TY3JlZW5JY29uLmpzJztcclxuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tICcuLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgZXhwbG9yZUljb25fcG5nIGZyb20gJy4uLy4uL2ltYWdlcy9leHBsb3JlSWNvbl9wbmcuanMnO1xyXG5pbXBvcnQgYXJlYUJ1aWxkZXIgZnJvbSAnLi4vYXJlYUJ1aWxkZXIuanMnO1xyXG5pbXBvcnQgQXJlYUJ1aWxkZXJTdHJpbmdzIGZyb20gJy4uL0FyZWFCdWlsZGVyU3RyaW5ncy5qcyc7XHJcbmltcG9ydCBBcmVhQnVpbGRlclNoYXJlZENvbnN0YW50cyBmcm9tICcuLi9jb21tb24vQXJlYUJ1aWxkZXJTaGFyZWRDb25zdGFudHMuanMnO1xyXG5pbXBvcnQgQXJlYUJ1aWxkZXJJY29uRmFjdG9yeSBmcm9tICcuLi9jb21tb24vdmlldy9BcmVhQnVpbGRlckljb25GYWN0b3J5LmpzJztcclxuaW1wb3J0IEFyZWFCdWlsZGVyRXhwbG9yZU1vZGVsIGZyb20gJy4vbW9kZWwvQXJlYUJ1aWxkZXJFeHBsb3JlTW9kZWwuanMnO1xyXG5pbXBvcnQgQXJlYUJ1aWxkZXJFeHBsb3JlVmlldyBmcm9tICcuL3ZpZXcvQXJlYUJ1aWxkZXJFeHBsb3JlVmlldy5qcyc7XHJcblxyXG5cclxuY2xhc3MgQXJlYUJ1aWxkZXJFeHBsb3JlU2NyZWVuIGV4dGVuZHMgU2NyZWVuIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtUYW5kZW19IHRhbmRlbVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCB0YW5kZW0gKSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgbmFtZTogQXJlYUJ1aWxkZXJTdHJpbmdzLmV4cGxvcmVTdHJpbmdQcm9wZXJ0eSxcclxuICAgICAgYmFja2dyb3VuZENvbG9yUHJvcGVydHk6IG5ldyBQcm9wZXJ0eSggQXJlYUJ1aWxkZXJTaGFyZWRDb25zdGFudHMuQkFDS0dST1VORF9DT0xPUiApLFxyXG4gICAgICBob21lU2NyZWVuSWNvbjogbmV3IFNjcmVlbkljb24oIG5ldyBJbWFnZSggZXhwbG9yZUljb25fcG5nICksIHtcclxuICAgICAgICBtYXhJY29uV2lkdGhQcm9wb3J0aW9uOiAxLFxyXG4gICAgICAgIG1heEljb25IZWlnaHRQcm9wb3J0aW9uOiAxXHJcbiAgICAgIH0gKSxcclxuICAgICAgbmF2aWdhdGlvbkJhckljb246IEFyZWFCdWlsZGVySWNvbkZhY3RvcnkuY3JlYXRlRXhwbG9yZVNjcmVlbk5hdkJhckljb24oKSxcclxuICAgICAgdGFuZGVtOiB0YW5kZW1cclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoXHJcbiAgICAgICgpID0+IG5ldyBBcmVhQnVpbGRlckV4cGxvcmVNb2RlbCgpLFxyXG4gICAgICBtb2RlbCA9PiBuZXcgQXJlYUJ1aWxkZXJFeHBsb3JlVmlldyggbW9kZWwgKSxcclxuICAgICAgb3B0aW9uc1xyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmFyZWFCdWlsZGVyLnJlZ2lzdGVyKCAnQXJlYUJ1aWxkZXJFeHBsb3JlU2NyZWVuJywgQXJlYUJ1aWxkZXJFeHBsb3JlU2NyZWVuICk7XHJcbmV4cG9ydCBkZWZhdWx0IEFyZWFCdWlsZGVyRXhwbG9yZVNjcmVlbjsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsUUFBUSxNQUFNLDhCQUE4QjtBQUNuRCxPQUFPQyxNQUFNLE1BQU0sNkJBQTZCO0FBQ2hELE9BQU9DLFVBQVUsTUFBTSxpQ0FBaUM7QUFDeEQsU0FBU0MsS0FBSyxRQUFRLGdDQUFnQztBQUN0RCxPQUFPQyxlQUFlLE1BQU0saUNBQWlDO0FBQzdELE9BQU9DLFdBQVcsTUFBTSxtQkFBbUI7QUFDM0MsT0FBT0Msa0JBQWtCLE1BQU0sMEJBQTBCO0FBQ3pELE9BQU9DLDBCQUEwQixNQUFNLHlDQUF5QztBQUNoRixPQUFPQyxzQkFBc0IsTUFBTSwwQ0FBMEM7QUFDN0UsT0FBT0MsdUJBQXVCLE1BQU0sb0NBQW9DO0FBQ3hFLE9BQU9DLHNCQUFzQixNQUFNLGtDQUFrQztBQUdyRSxNQUFNQyx3QkFBd0IsU0FBU1YsTUFBTSxDQUFDO0VBRTVDO0FBQ0Y7QUFDQTtFQUNFVyxXQUFXQSxDQUFFQyxNQUFNLEVBQUc7SUFFcEIsTUFBTUMsT0FBTyxHQUFHO01BQ2RDLElBQUksRUFBRVQsa0JBQWtCLENBQUNVLHFCQUFxQjtNQUM5Q0MsdUJBQXVCLEVBQUUsSUFBSWpCLFFBQVEsQ0FBRU8sMEJBQTBCLENBQUNXLGdCQUFpQixDQUFDO01BQ3BGQyxjQUFjLEVBQUUsSUFBSWpCLFVBQVUsQ0FBRSxJQUFJQyxLQUFLLENBQUVDLGVBQWdCLENBQUMsRUFBRTtRQUM1RGdCLHNCQUFzQixFQUFFLENBQUM7UUFDekJDLHVCQUF1QixFQUFFO01BQzNCLENBQUUsQ0FBQztNQUNIQyxpQkFBaUIsRUFBRWQsc0JBQXNCLENBQUNlLDZCQUE2QixDQUFDLENBQUM7TUFDekVWLE1BQU0sRUFBRUE7SUFDVixDQUFDO0lBRUQsS0FBSyxDQUNILE1BQU0sSUFBSUosdUJBQXVCLENBQUMsQ0FBQyxFQUNuQ2UsS0FBSyxJQUFJLElBQUlkLHNCQUFzQixDQUFFYyxLQUFNLENBQUMsRUFDNUNWLE9BQ0YsQ0FBQztFQUNIO0FBQ0Y7QUFFQVQsV0FBVyxDQUFDb0IsUUFBUSxDQUFFLDBCQUEwQixFQUFFZCx3QkFBeUIsQ0FBQztBQUM1RSxlQUFlQSx3QkFBd0IifQ==