// Copyright 2016-2023, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards

/**
 * The 'Black Box' screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import Property from '../../../axon/js/Property.js';
import CCKCConstants from '../../../circuit-construction-kit-common/js/CCKCConstants.js';
import CCKCColors from '../../../circuit-construction-kit-common/js/view/CCKCColors.js';
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Rectangle } from '../../../scenery/js/imports.js';
import circuitConstructionKitBlackBoxStudy from '../circuitConstructionKitBlackBoxStudy.js';
import BlackBoxModel from './model/BlackBoxModel.js';
import BlackBoxNode from './view/BlackBoxNode.js';
import BlackBoxScreenView from './view/BlackBoxScreenView.js';

// constants
const BACKGROUND_COLOR = CCKCColors.screenBackgroundColorProperty;
class BlackBoxScreen extends Screen {
  constructor(tandem) {
    const icon = new Rectangle(0, 0, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height, {
      fill: BACKGROUND_COLOR
    });
    const blackBoxNode = new BlackBoxNode(220, 160, new BooleanProperty(true));
    blackBoxNode.mutate({
      scale: icon.width / blackBoxNode.bounds.width / 2,
      centerX: icon.centerX,
      centerY: icon.centerY
    });
    icon.addChild(blackBoxNode);
    const options = {
      name: new Property('Black Box'),
      //TODO i18n
      homeScreenIcon: new ScreenIcon(icon, {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      }),
      tandem: tandem,
      maxDT: CCKCConstants.MAX_DT
    };
    super(() => new BlackBoxModel(tandem.createTandem('model')), model => new BlackBoxScreenView(model, tandem.createTandem('view')), options);
  }
}
circuitConstructionKitBlackBoxStudy.register('BlackBoxScreen', BlackBoxScreen);
export default BlackBoxScreen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCb29sZWFuUHJvcGVydHkiLCJQcm9wZXJ0eSIsIkNDS0NDb25zdGFudHMiLCJDQ0tDQ29sb3JzIiwiU2NyZWVuIiwiU2NyZWVuSWNvbiIsIlJlY3RhbmdsZSIsImNpcmN1aXRDb25zdHJ1Y3Rpb25LaXRCbGFja0JveFN0dWR5IiwiQmxhY2tCb3hNb2RlbCIsIkJsYWNrQm94Tm9kZSIsIkJsYWNrQm94U2NyZWVuVmlldyIsIkJBQ0tHUk9VTkRfQ09MT1IiLCJzY3JlZW5CYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eSIsIkJsYWNrQm94U2NyZWVuIiwiY29uc3RydWN0b3IiLCJ0YW5kZW0iLCJpY29uIiwiTUlOSU1VTV9IT01FX1NDUkVFTl9JQ09OX1NJWkUiLCJ3aWR0aCIsImhlaWdodCIsImZpbGwiLCJibGFja0JveE5vZGUiLCJtdXRhdGUiLCJzY2FsZSIsImJvdW5kcyIsImNlbnRlclgiLCJjZW50ZXJZIiwiYWRkQ2hpbGQiLCJvcHRpb25zIiwibmFtZSIsImhvbWVTY3JlZW5JY29uIiwibWF4SWNvbldpZHRoUHJvcG9ydGlvbiIsIm1heEljb25IZWlnaHRQcm9wb3J0aW9uIiwibWF4RFQiLCJNQVhfRFQiLCJjcmVhdGVUYW5kZW0iLCJtb2RlbCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiQmxhY2tCb3hTY3JlZW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTYtMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcbi8vIFRPRE86IFJldmlldywgZG9jdW1lbnQsIGFubm90YXRlLCBpMThuLCBicmluZyB1cCB0byBzdGFuZGFyZHNcclxuXHJcbi8qKlxyXG4gKiBUaGUgJ0JsYWNrIEJveCcgc2NyZWVuLlxyXG4gKlxyXG4gKiBAYXV0aG9yIFNhbSBSZWlkIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBCb29sZWFuUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vYXhvbi9qcy9Cb29sZWFuUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vYXhvbi9qcy9Qcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBDQ0tDQ29uc3RhbnRzIGZyb20gJy4uLy4uLy4uL2NpcmN1aXQtY29uc3RydWN0aW9uLWtpdC1jb21tb24vanMvQ0NLQ0NvbnN0YW50cy5qcyc7XHJcbmltcG9ydCBDQ0tDQ29sb3JzIGZyb20gJy4uLy4uLy4uL2NpcmN1aXQtY29uc3RydWN0aW9uLWtpdC1jb21tb24vanMvdmlldy9DQ0tDQ29sb3JzLmpzJztcclxuaW1wb3J0IFNjcmVlbiBmcm9tICcuLi8uLi8uLi9qb2lzdC9qcy9TY3JlZW4uanMnO1xyXG5pbXBvcnQgU2NyZWVuSWNvbiBmcm9tICcuLi8uLi8uLi9qb2lzdC9qcy9TY3JlZW5JY29uLmpzJztcclxuaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSAnLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IGNpcmN1aXRDb25zdHJ1Y3Rpb25LaXRCbGFja0JveFN0dWR5IGZyb20gJy4uL2NpcmN1aXRDb25zdHJ1Y3Rpb25LaXRCbGFja0JveFN0dWR5LmpzJztcclxuaW1wb3J0IEJsYWNrQm94TW9kZWwgZnJvbSAnLi9tb2RlbC9CbGFja0JveE1vZGVsLmpzJztcclxuaW1wb3J0IEJsYWNrQm94Tm9kZSBmcm9tICcuL3ZpZXcvQmxhY2tCb3hOb2RlLmpzJztcclxuaW1wb3J0IEJsYWNrQm94U2NyZWVuVmlldyBmcm9tICcuL3ZpZXcvQmxhY2tCb3hTY3JlZW5WaWV3LmpzJztcclxuXHJcbi8vIGNvbnN0YW50c1xyXG5jb25zdCBCQUNLR1JPVU5EX0NPTE9SID0gQ0NLQ0NvbG9ycy5zY3JlZW5CYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eTtcclxuXHJcbmNsYXNzIEJsYWNrQm94U2NyZWVuIGV4dGVuZHMgU2NyZWVuIHtcclxuXHJcbiAgY29uc3RydWN0b3IoIHRhbmRlbSApIHtcclxuXHJcbiAgICBjb25zdCBpY29uID0gbmV3IFJlY3RhbmdsZSggMCwgMCwgU2NyZWVuLk1JTklNVU1fSE9NRV9TQ1JFRU5fSUNPTl9TSVpFLndpZHRoLCBTY3JlZW4uTUlOSU1VTV9IT01FX1NDUkVFTl9JQ09OX1NJWkUuaGVpZ2h0LCB7XHJcbiAgICAgIGZpbGw6IEJBQ0tHUk9VTkRfQ09MT1JcclxuICAgIH0gKTtcclxuICAgIGNvbnN0IGJsYWNrQm94Tm9kZSA9IG5ldyBCbGFja0JveE5vZGUoIDIyMCwgMTYwLCBuZXcgQm9vbGVhblByb3BlcnR5KCB0cnVlICkgKTtcclxuICAgIGJsYWNrQm94Tm9kZS5tdXRhdGUoIHtcclxuICAgICAgc2NhbGU6IGljb24ud2lkdGggLyBibGFja0JveE5vZGUuYm91bmRzLndpZHRoIC8gMixcclxuICAgICAgY2VudGVyWDogaWNvbi5jZW50ZXJYLFxyXG4gICAgICBjZW50ZXJZOiBpY29uLmNlbnRlcllcclxuICAgIH0gKTtcclxuICAgIGljb24uYWRkQ2hpbGQoIGJsYWNrQm94Tm9kZSApO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIG5hbWU6IG5ldyBQcm9wZXJ0eSggJ0JsYWNrIEJveCcgKSwgLy9UT0RPIGkxOG5cclxuICAgICAgaG9tZVNjcmVlbkljb246IG5ldyBTY3JlZW5JY29uKCBpY29uLCB7XHJcbiAgICAgICAgbWF4SWNvbldpZHRoUHJvcG9ydGlvbjogMSxcclxuICAgICAgICBtYXhJY29uSGVpZ2h0UHJvcG9ydGlvbjogMVxyXG4gICAgICB9ICksXHJcbiAgICAgIHRhbmRlbTogdGFuZGVtLFxyXG4gICAgICBtYXhEVDogQ0NLQ0NvbnN0YW50cy5NQVhfRFRcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoXHJcbiAgICAgICgpID0+IG5ldyBCbGFja0JveE1vZGVsKCB0YW5kZW0uY3JlYXRlVGFuZGVtKCAnbW9kZWwnICkgKSxcclxuICAgICAgbW9kZWwgPT4gbmV3IEJsYWNrQm94U2NyZWVuVmlldyggbW9kZWwsIHRhbmRlbS5jcmVhdGVUYW5kZW0oICd2aWV3JyApICksXHJcbiAgICAgIG9wdGlvbnMgKTtcclxuICB9XHJcbn1cclxuXHJcbmNpcmN1aXRDb25zdHJ1Y3Rpb25LaXRCbGFja0JveFN0dWR5LnJlZ2lzdGVyKCAnQmxhY2tCb3hTY3JlZW4nLCBCbGFja0JveFNjcmVlbiApO1xyXG5leHBvcnQgZGVmYXVsdCBCbGFja0JveFNjcmVlbjsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxlQUFlLE1BQU0scUNBQXFDO0FBQ2pFLE9BQU9DLFFBQVEsTUFBTSw4QkFBOEI7QUFDbkQsT0FBT0MsYUFBYSxNQUFNLDhEQUE4RDtBQUN4RixPQUFPQyxVQUFVLE1BQU0sZ0VBQWdFO0FBQ3ZGLE9BQU9DLE1BQU0sTUFBTSw2QkFBNkI7QUFDaEQsT0FBT0MsVUFBVSxNQUFNLGlDQUFpQztBQUN4RCxTQUFTQyxTQUFTLFFBQVEsZ0NBQWdDO0FBQzFELE9BQU9DLG1DQUFtQyxNQUFNLDJDQUEyQztBQUMzRixPQUFPQyxhQUFhLE1BQU0sMEJBQTBCO0FBQ3BELE9BQU9DLFlBQVksTUFBTSx3QkFBd0I7QUFDakQsT0FBT0Msa0JBQWtCLE1BQU0sOEJBQThCOztBQUU3RDtBQUNBLE1BQU1DLGdCQUFnQixHQUFHUixVQUFVLENBQUNTLDZCQUE2QjtBQUVqRSxNQUFNQyxjQUFjLFNBQVNULE1BQU0sQ0FBQztFQUVsQ1UsV0FBV0EsQ0FBRUMsTUFBTSxFQUFHO0lBRXBCLE1BQU1DLElBQUksR0FBRyxJQUFJVixTQUFTLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRUYsTUFBTSxDQUFDYSw2QkFBNkIsQ0FBQ0MsS0FBSyxFQUFFZCxNQUFNLENBQUNhLDZCQUE2QixDQUFDRSxNQUFNLEVBQUU7TUFDekhDLElBQUksRUFBRVQ7SUFDUixDQUFFLENBQUM7SUFDSCxNQUFNVSxZQUFZLEdBQUcsSUFBSVosWUFBWSxDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSVQsZUFBZSxDQUFFLElBQUssQ0FBRSxDQUFDO0lBQzlFcUIsWUFBWSxDQUFDQyxNQUFNLENBQUU7TUFDbkJDLEtBQUssRUFBRVAsSUFBSSxDQUFDRSxLQUFLLEdBQUdHLFlBQVksQ0FBQ0csTUFBTSxDQUFDTixLQUFLLEdBQUcsQ0FBQztNQUNqRE8sT0FBTyxFQUFFVCxJQUFJLENBQUNTLE9BQU87TUFDckJDLE9BQU8sRUFBRVYsSUFBSSxDQUFDVTtJQUNoQixDQUFFLENBQUM7SUFDSFYsSUFBSSxDQUFDVyxRQUFRLENBQUVOLFlBQWEsQ0FBQztJQUU3QixNQUFNTyxPQUFPLEdBQUc7TUFDZEMsSUFBSSxFQUFFLElBQUk1QixRQUFRLENBQUUsV0FBWSxDQUFDO01BQUU7TUFDbkM2QixjQUFjLEVBQUUsSUFBSXpCLFVBQVUsQ0FBRVcsSUFBSSxFQUFFO1FBQ3BDZSxzQkFBc0IsRUFBRSxDQUFDO1FBQ3pCQyx1QkFBdUIsRUFBRTtNQUMzQixDQUFFLENBQUM7TUFDSGpCLE1BQU0sRUFBRUEsTUFBTTtNQUNka0IsS0FBSyxFQUFFL0IsYUFBYSxDQUFDZ0M7SUFDdkIsQ0FBQztJQUVELEtBQUssQ0FDSCxNQUFNLElBQUkxQixhQUFhLENBQUVPLE1BQU0sQ0FBQ29CLFlBQVksQ0FBRSxPQUFRLENBQUUsQ0FBQyxFQUN6REMsS0FBSyxJQUFJLElBQUkxQixrQkFBa0IsQ0FBRTBCLEtBQUssRUFBRXJCLE1BQU0sQ0FBQ29CLFlBQVksQ0FBRSxNQUFPLENBQUUsQ0FBQyxFQUN2RVAsT0FBUSxDQUFDO0VBQ2I7QUFDRjtBQUVBckIsbUNBQW1DLENBQUM4QixRQUFRLENBQUUsZ0JBQWdCLEVBQUV4QixjQUFlLENBQUM7QUFDaEYsZUFBZUEsY0FBYyJ9