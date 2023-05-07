// Copyright 2023, University of Colorado Boulder

/**
 * Keyboard help content for My Solar System.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import mySolarSystem from '../../mySolarSystem.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import TimeControlKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/TimeControlKeyboardHelpSection.js';
import MoveDraggableItemsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/MoveDraggableItemsKeyboardHelpSection.js';
export default class MySolarSystemKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  constructor() {
    const draggableHelpSection = new MoveDraggableItemsKeyboardHelpSection();
    const sliderHelpSection = new SliderControlsKeyboardHelpSection();
    const timeControlsHelpSection = new TimeControlKeyboardHelpSection();
    const basicActionsHelpSection = new BasicActionsKeyboardHelpSection({
      withCheckboxContent: true,
      withKeypadContent: true
    });
    super([draggableHelpSection, sliderHelpSection], [timeControlsHelpSection, basicActionsHelpSection]);
    this.disposeEmitter.addListener(() => {
      draggableHelpSection.dispose();
      sliderHelpSection.dispose();
      timeControlsHelpSection.dispose();
      basicActionsHelpSection.dispose();
    });
  }
}
mySolarSystem.register('MySolarSystemKeyboardHelpContent', MySolarSystemKeyboardHelpContent);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJteVNvbGFyU3lzdGVtIiwiVHdvQ29sdW1uS2V5Ym9hcmRIZWxwQ29udGVudCIsIkJhc2ljQWN0aW9uc0tleWJvYXJkSGVscFNlY3Rpb24iLCJTbGlkZXJDb250cm9sc0tleWJvYXJkSGVscFNlY3Rpb24iLCJUaW1lQ29udHJvbEtleWJvYXJkSGVscFNlY3Rpb24iLCJNb3ZlRHJhZ2dhYmxlSXRlbXNLZXlib2FyZEhlbHBTZWN0aW9uIiwiTXlTb2xhclN5c3RlbUtleWJvYXJkSGVscENvbnRlbnQiLCJjb25zdHJ1Y3RvciIsImRyYWdnYWJsZUhlbHBTZWN0aW9uIiwic2xpZGVySGVscFNlY3Rpb24iLCJ0aW1lQ29udHJvbHNIZWxwU2VjdGlvbiIsImJhc2ljQWN0aW9uc0hlbHBTZWN0aW9uIiwid2l0aENoZWNrYm94Q29udGVudCIsIndpdGhLZXlwYWRDb250ZW50IiwiZGlzcG9zZUVtaXR0ZXIiLCJhZGRMaXN0ZW5lciIsImRpc3Bvc2UiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIk15U29sYXJTeXN0ZW1LZXlib2FyZEhlbHBDb250ZW50LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBLZXlib2FyZCBoZWxwIGNvbnRlbnQgZm9yIE15IFNvbGFyIFN5c3RlbS5cclxuICpcclxuICogQGF1dGhvciBNaWNoYWVsIEthdXptYW5uIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBteVNvbGFyU3lzdGVtIGZyb20gJy4uLy4uL215U29sYXJTeXN0ZW0uanMnO1xyXG5pbXBvcnQgVHdvQ29sdW1uS2V5Ym9hcmRIZWxwQ29udGVudCBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMva2V5Ym9hcmQvaGVscC9Ud29Db2x1bW5LZXlib2FyZEhlbHBDb250ZW50LmpzJztcclxuaW1wb3J0IEJhc2ljQWN0aW9uc0tleWJvYXJkSGVscFNlY3Rpb24gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL2tleWJvYXJkL2hlbHAvQmFzaWNBY3Rpb25zS2V5Ym9hcmRIZWxwU2VjdGlvbi5qcyc7XHJcbmltcG9ydCBTbGlkZXJDb250cm9sc0tleWJvYXJkSGVscFNlY3Rpb24gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL2tleWJvYXJkL2hlbHAvU2xpZGVyQ29udHJvbHNLZXlib2FyZEhlbHBTZWN0aW9uLmpzJztcclxuaW1wb3J0IFRpbWVDb250cm9sS2V5Ym9hcmRIZWxwU2VjdGlvbiBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMva2V5Ym9hcmQvaGVscC9UaW1lQ29udHJvbEtleWJvYXJkSGVscFNlY3Rpb24uanMnO1xyXG5pbXBvcnQgTW92ZURyYWdnYWJsZUl0ZW1zS2V5Ym9hcmRIZWxwU2VjdGlvbiBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMva2V5Ym9hcmQvaGVscC9Nb3ZlRHJhZ2dhYmxlSXRlbXNLZXlib2FyZEhlbHBTZWN0aW9uLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE15U29sYXJTeXN0ZW1LZXlib2FyZEhlbHBDb250ZW50IGV4dGVuZHMgVHdvQ29sdW1uS2V5Ym9hcmRIZWxwQ29udGVudCB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgY29uc3QgZHJhZ2dhYmxlSGVscFNlY3Rpb24gPSBuZXcgTW92ZURyYWdnYWJsZUl0ZW1zS2V5Ym9hcmRIZWxwU2VjdGlvbigpO1xyXG4gICAgY29uc3Qgc2xpZGVySGVscFNlY3Rpb24gPSBuZXcgU2xpZGVyQ29udHJvbHNLZXlib2FyZEhlbHBTZWN0aW9uKCk7XHJcbiAgICBjb25zdCB0aW1lQ29udHJvbHNIZWxwU2VjdGlvbiA9IG5ldyBUaW1lQ29udHJvbEtleWJvYXJkSGVscFNlY3Rpb24oKTtcclxuICAgIGNvbnN0IGJhc2ljQWN0aW9uc0hlbHBTZWN0aW9uID0gbmV3IEJhc2ljQWN0aW9uc0tleWJvYXJkSGVscFNlY3Rpb24oIHtcclxuICAgICAgd2l0aENoZWNrYm94Q29udGVudDogdHJ1ZSxcclxuICAgICAgd2l0aEtleXBhZENvbnRlbnQ6IHRydWVcclxuICAgIH0gKTtcclxuXHJcbiAgICBzdXBlciggWyBkcmFnZ2FibGVIZWxwU2VjdGlvbiwgc2xpZGVySGVscFNlY3Rpb24gXSwgWyB0aW1lQ29udHJvbHNIZWxwU2VjdGlvbiwgYmFzaWNBY3Rpb25zSGVscFNlY3Rpb24gXSApO1xyXG5cclxuICAgIHRoaXMuZGlzcG9zZUVtaXR0ZXIuYWRkTGlzdGVuZXIoICgpID0+IHtcclxuICAgICAgZHJhZ2dhYmxlSGVscFNlY3Rpb24uZGlzcG9zZSgpO1xyXG4gICAgICBzbGlkZXJIZWxwU2VjdGlvbi5kaXNwb3NlKCk7XHJcbiAgICAgIHRpbWVDb250cm9sc0hlbHBTZWN0aW9uLmRpc3Bvc2UoKTtcclxuICAgICAgYmFzaWNBY3Rpb25zSGVscFNlY3Rpb24uZGlzcG9zZSgpO1xyXG4gICAgfSApO1xyXG4gIH1cclxufVxyXG5cclxubXlTb2xhclN5c3RlbS5yZWdpc3RlciggJ015U29sYXJTeXN0ZW1LZXlib2FyZEhlbHBDb250ZW50JywgTXlTb2xhclN5c3RlbUtleWJvYXJkSGVscENvbnRlbnQgKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsYUFBYSxNQUFNLHdCQUF3QjtBQUNsRCxPQUFPQyw0QkFBNEIsTUFBTSwyRUFBMkU7QUFDcEgsT0FBT0MsK0JBQStCLE1BQU0sOEVBQThFO0FBQzFILE9BQU9DLGlDQUFpQyxNQUFNLGdGQUFnRjtBQUM5SCxPQUFPQyw4QkFBOEIsTUFBTSw2RUFBNkU7QUFDeEgsT0FBT0MscUNBQXFDLE1BQU0sb0ZBQW9GO0FBRXRJLGVBQWUsTUFBTUMsZ0NBQWdDLFNBQVNMLDRCQUE0QixDQUFDO0VBQ2xGTSxXQUFXQSxDQUFBLEVBQUc7SUFDbkIsTUFBTUMsb0JBQW9CLEdBQUcsSUFBSUgscUNBQXFDLENBQUMsQ0FBQztJQUN4RSxNQUFNSSxpQkFBaUIsR0FBRyxJQUFJTixpQ0FBaUMsQ0FBQyxDQUFDO0lBQ2pFLE1BQU1PLHVCQUF1QixHQUFHLElBQUlOLDhCQUE4QixDQUFDLENBQUM7SUFDcEUsTUFBTU8sdUJBQXVCLEdBQUcsSUFBSVQsK0JBQStCLENBQUU7TUFDbkVVLG1CQUFtQixFQUFFLElBQUk7TUFDekJDLGlCQUFpQixFQUFFO0lBQ3JCLENBQUUsQ0FBQztJQUVILEtBQUssQ0FBRSxDQUFFTCxvQkFBb0IsRUFBRUMsaUJBQWlCLENBQUUsRUFBRSxDQUFFQyx1QkFBdUIsRUFBRUMsdUJBQXVCLENBQUcsQ0FBQztJQUUxRyxJQUFJLENBQUNHLGNBQWMsQ0FBQ0MsV0FBVyxDQUFFLE1BQU07TUFDckNQLG9CQUFvQixDQUFDUSxPQUFPLENBQUMsQ0FBQztNQUM5QlAsaUJBQWlCLENBQUNPLE9BQU8sQ0FBQyxDQUFDO01BQzNCTix1QkFBdUIsQ0FBQ00sT0FBTyxDQUFDLENBQUM7TUFDakNMLHVCQUF1QixDQUFDSyxPQUFPLENBQUMsQ0FBQztJQUNuQyxDQUFFLENBQUM7RUFDTDtBQUNGO0FBRUFoQixhQUFhLENBQUNpQixRQUFRLENBQUUsa0NBQWtDLEVBQUVYLGdDQUFpQyxDQUFDIn0=