// Copyright 2022-2023, University of Colorado Boulder

/**
 * NumberPlayPreferencesNode is the user interface for sim-specific preferences for Number Play, accessed via the
 * Preferences dialog. These preferences are global, and affect all screens.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import numberPlay from '../../numberPlay.js';
import NumberSuiteCommonPreferencesNode from '../../../../number-suite-common/js/common/view/NumberSuiteCommonPreferencesNode.js';
import NumberPlayGameScreen from '../../game/NumberPlayGameScreen.js';
import TenScreen from '../../ten/TenScreen.js';
import TwentyScreen from '../../twenty/TwentyScreen.js';
import SubitizeTimeControl from './SubitizeTimeControl.js';
import numberPlayPreferences from '../model/numberPlayPreferences.js';
import numberPlayUtteranceQueue from './numberPlayUtteranceQueue.js';
export default class NumberPlayPreferencesNode extends NumberSuiteCommonPreferencesNode {
  constructor() {
    const subitizeTimeControl = new SubitizeTimeControl(numberPlayPreferences.subitizeTimeShownProperty, {
      visible: NumberSuiteCommonPreferencesNode.hasScreenType(NumberPlayGameScreen)
    });
    super(numberPlayPreferences, numberPlayUtteranceQueue, [subitizeTimeControl], {
      secondLanguageControlEnabled: NumberSuiteCommonPreferencesNode.hasScreenType(TenScreen) || NumberSuiteCommonPreferencesNode.hasScreenType(TwentyScreen)
    });
  }
  dispose() {
    assert && assert(false, 'dispose is not supported, exists for the lifetime of the sim');
    super.dispose();
  }
}
numberPlay.register('NumberPlayPreferencesNode', NumberPlayPreferencesNode);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJudW1iZXJQbGF5IiwiTnVtYmVyU3VpdGVDb21tb25QcmVmZXJlbmNlc05vZGUiLCJOdW1iZXJQbGF5R2FtZVNjcmVlbiIsIlRlblNjcmVlbiIsIlR3ZW50eVNjcmVlbiIsIlN1Yml0aXplVGltZUNvbnRyb2wiLCJudW1iZXJQbGF5UHJlZmVyZW5jZXMiLCJudW1iZXJQbGF5VXR0ZXJhbmNlUXVldWUiLCJOdW1iZXJQbGF5UHJlZmVyZW5jZXNOb2RlIiwiY29uc3RydWN0b3IiLCJzdWJpdGl6ZVRpbWVDb250cm9sIiwic3ViaXRpemVUaW1lU2hvd25Qcm9wZXJ0eSIsInZpc2libGUiLCJoYXNTY3JlZW5UeXBlIiwic2Vjb25kTGFuZ3VhZ2VDb250cm9sRW5hYmxlZCIsImRpc3Bvc2UiLCJhc3NlcnQiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIk51bWJlclBsYXlQcmVmZXJlbmNlc05vZGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjItMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogTnVtYmVyUGxheVByZWZlcmVuY2VzTm9kZSBpcyB0aGUgdXNlciBpbnRlcmZhY2UgZm9yIHNpbS1zcGVjaWZpYyBwcmVmZXJlbmNlcyBmb3IgTnVtYmVyIFBsYXksIGFjY2Vzc2VkIHZpYSB0aGVcclxuICogUHJlZmVyZW5jZXMgZGlhbG9nLiBUaGVzZSBwcmVmZXJlbmNlcyBhcmUgZ2xvYmFsLCBhbmQgYWZmZWN0IGFsbCBzY3JlZW5zLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIEtsdXNlbmRvcmYgKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqL1xyXG5cclxuaW1wb3J0IG51bWJlclBsYXkgZnJvbSAnLi4vLi4vbnVtYmVyUGxheS5qcyc7XHJcbmltcG9ydCBOdW1iZXJTdWl0ZUNvbW1vblByZWZlcmVuY2VzTm9kZSBmcm9tICcuLi8uLi8uLi8uLi9udW1iZXItc3VpdGUtY29tbW9uL2pzL2NvbW1vbi92aWV3L051bWJlclN1aXRlQ29tbW9uUHJlZmVyZW5jZXNOb2RlLmpzJztcclxuaW1wb3J0IE51bWJlclBsYXlHYW1lU2NyZWVuIGZyb20gJy4uLy4uL2dhbWUvTnVtYmVyUGxheUdhbWVTY3JlZW4uanMnO1xyXG5pbXBvcnQgVGVuU2NyZWVuIGZyb20gJy4uLy4uL3Rlbi9UZW5TY3JlZW4uanMnO1xyXG5pbXBvcnQgVHdlbnR5U2NyZWVuIGZyb20gJy4uLy4uL3R3ZW50eS9Ud2VudHlTY3JlZW4uanMnO1xyXG5pbXBvcnQgU3ViaXRpemVUaW1lQ29udHJvbCBmcm9tICcuL1N1Yml0aXplVGltZUNvbnRyb2wuanMnO1xyXG5pbXBvcnQgbnVtYmVyUGxheVByZWZlcmVuY2VzIGZyb20gJy4uL21vZGVsL251bWJlclBsYXlQcmVmZXJlbmNlcy5qcyc7XHJcbmltcG9ydCBudW1iZXJQbGF5VXR0ZXJhbmNlUXVldWUgZnJvbSAnLi9udW1iZXJQbGF5VXR0ZXJhbmNlUXVldWUuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVtYmVyUGxheVByZWZlcmVuY2VzTm9kZSBleHRlbmRzIE51bWJlclN1aXRlQ29tbW9uUHJlZmVyZW5jZXNOb2RlIHtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIGNvbnN0IHN1Yml0aXplVGltZUNvbnRyb2wgPSBuZXcgU3ViaXRpemVUaW1lQ29udHJvbCggbnVtYmVyUGxheVByZWZlcmVuY2VzLnN1Yml0aXplVGltZVNob3duUHJvcGVydHksIHtcclxuICAgICAgdmlzaWJsZTogTnVtYmVyU3VpdGVDb21tb25QcmVmZXJlbmNlc05vZGUuaGFzU2NyZWVuVHlwZSggTnVtYmVyUGxheUdhbWVTY3JlZW4gKVxyXG4gICAgfSApO1xyXG5cclxuICAgIHN1cGVyKCBudW1iZXJQbGF5UHJlZmVyZW5jZXMsIG51bWJlclBsYXlVdHRlcmFuY2VRdWV1ZSwgWyBzdWJpdGl6ZVRpbWVDb250cm9sIF0sIHtcclxuICAgICAgc2Vjb25kTGFuZ3VhZ2VDb250cm9sRW5hYmxlZDogTnVtYmVyU3VpdGVDb21tb25QcmVmZXJlbmNlc05vZGUuaGFzU2NyZWVuVHlwZSggVGVuU2NyZWVuICkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyU3VpdGVDb21tb25QcmVmZXJlbmNlc05vZGUuaGFzU2NyZWVuVHlwZSggVHdlbnR5U2NyZWVuIClcclxuICAgIH0gKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvdmVycmlkZSBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggZmFsc2UsICdkaXNwb3NlIGlzIG5vdCBzdXBwb3J0ZWQsIGV4aXN0cyBmb3IgdGhlIGxpZmV0aW1lIG9mIHRoZSBzaW0nICk7XHJcbiAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5udW1iZXJQbGF5LnJlZ2lzdGVyKCAnTnVtYmVyUGxheVByZWZlcmVuY2VzTm9kZScsIE51bWJlclBsYXlQcmVmZXJlbmNlc05vZGUgKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxVQUFVLE1BQU0scUJBQXFCO0FBQzVDLE9BQU9DLGdDQUFnQyxNQUFNLG9GQUFvRjtBQUNqSSxPQUFPQyxvQkFBb0IsTUFBTSxvQ0FBb0M7QUFDckUsT0FBT0MsU0FBUyxNQUFNLHdCQUF3QjtBQUM5QyxPQUFPQyxZQUFZLE1BQU0sOEJBQThCO0FBQ3ZELE9BQU9DLG1CQUFtQixNQUFNLDBCQUEwQjtBQUMxRCxPQUFPQyxxQkFBcUIsTUFBTSxtQ0FBbUM7QUFDckUsT0FBT0Msd0JBQXdCLE1BQU0sK0JBQStCO0FBRXBFLGVBQWUsTUFBTUMseUJBQXlCLFNBQVNQLGdDQUFnQyxDQUFDO0VBRS9FUSxXQUFXQSxDQUFBLEVBQUc7SUFFbkIsTUFBTUMsbUJBQW1CLEdBQUcsSUFBSUwsbUJBQW1CLENBQUVDLHFCQUFxQixDQUFDSyx5QkFBeUIsRUFBRTtNQUNwR0MsT0FBTyxFQUFFWCxnQ0FBZ0MsQ0FBQ1ksYUFBYSxDQUFFWCxvQkFBcUI7SUFDaEYsQ0FBRSxDQUFDO0lBRUgsS0FBSyxDQUFFSSxxQkFBcUIsRUFBRUMsd0JBQXdCLEVBQUUsQ0FBRUcsbUJBQW1CLENBQUUsRUFBRTtNQUMvRUksNEJBQTRCLEVBQUViLGdDQUFnQyxDQUFDWSxhQUFhLENBQUVWLFNBQVUsQ0FBQyxJQUMzREYsZ0NBQWdDLENBQUNZLGFBQWEsQ0FBRVQsWUFBYTtJQUM3RixDQUFFLENBQUM7RUFDTDtFQUVnQlcsT0FBT0EsQ0FBQSxFQUFTO0lBQzlCQyxNQUFNLElBQUlBLE1BQU0sQ0FBRSxLQUFLLEVBQUUsOERBQStELENBQUM7SUFDekYsS0FBSyxDQUFDRCxPQUFPLENBQUMsQ0FBQztFQUNqQjtBQUNGO0FBRUFmLFVBQVUsQ0FBQ2lCLFFBQVEsQ0FBRSwyQkFBMkIsRUFBRVQseUJBQTBCLENBQUMifQ==