// Copyright 2022, University of Colorado Boulder

/**
 * Parent ScreenView that contains components shared across screens such as: QuestionBar, Controls Layout,
 * SyncDataButton, and ResetAll
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import MeanShareAndBalanceConstants from '../MeanShareAndBalanceConstants.js';
import meanShareAndBalance from '../../meanShareAndBalance.js';
import { Node } from '../../../../scenery/js/imports.js';
import QuestionBar from '../../../../scenery-phet/js/QuestionBar.js';
export default class MeanShareAndBalanceScreenView extends ScreenView {
  constructor(model, questionBarStringProperty, questionBarColor, providedOptions) {
    const options = providedOptions;
    super(options);
    this.questionBar = new QuestionBar(this.layoutBounds, this.visibleBoundsProperty, {
      questionString: questionBarStringProperty,
      barFill: questionBarColor,
      // phet-io
      tandem: options.tandem.createTandem('questionBar')
    });
    this.resetAllButton = new ResetAllButton({
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - MeanShareAndBalanceConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - MeanShareAndBalanceConstants.SCREEN_VIEW_Y_MARGIN,
      // phet-io
      tandem: options.tandem.createTandem('resetAllButton')
    });
    this.screenViewRootNode = new Node({
      children: [this.questionBar, this.resetAllButton]
    });
    this.addChild(this.screenViewRootNode);
  }

  /**
   * Resets the view.
   */
  reset() {
    // May be used for future screens
  }
}
meanShareAndBalance.register('MeanShareAndBalanceScreenView', MeanShareAndBalanceScreenView);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTY3JlZW5WaWV3IiwiUmVzZXRBbGxCdXR0b24iLCJNZWFuU2hhcmVBbmRCYWxhbmNlQ29uc3RhbnRzIiwibWVhblNoYXJlQW5kQmFsYW5jZSIsIk5vZGUiLCJRdWVzdGlvbkJhciIsIk1lYW5TaGFyZUFuZEJhbGFuY2VTY3JlZW5WaWV3IiwiY29uc3RydWN0b3IiLCJtb2RlbCIsInF1ZXN0aW9uQmFyU3RyaW5nUHJvcGVydHkiLCJxdWVzdGlvbkJhckNvbG9yIiwicHJvdmlkZWRPcHRpb25zIiwib3B0aW9ucyIsInF1ZXN0aW9uQmFyIiwibGF5b3V0Qm91bmRzIiwidmlzaWJsZUJvdW5kc1Byb3BlcnR5IiwicXVlc3Rpb25TdHJpbmciLCJiYXJGaWxsIiwidGFuZGVtIiwiY3JlYXRlVGFuZGVtIiwicmVzZXRBbGxCdXR0b24iLCJsaXN0ZW5lciIsImludGVycnVwdFN1YnRyZWVJbnB1dCIsInJlc2V0IiwicmlnaHQiLCJtYXhYIiwiU0NSRUVOX1ZJRVdfWF9NQVJHSU4iLCJib3R0b20iLCJtYXhZIiwiU0NSRUVOX1ZJRVdfWV9NQVJHSU4iLCJzY3JlZW5WaWV3Um9vdE5vZGUiLCJjaGlsZHJlbiIsImFkZENoaWxkIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJNZWFuU2hhcmVBbmRCYWxhbmNlU2NyZWVuVmlldy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogUGFyZW50IFNjcmVlblZpZXcgdGhhdCBjb250YWlucyBjb21wb25lbnRzIHNoYXJlZCBhY3Jvc3Mgc2NyZWVucyBzdWNoIGFzOiBRdWVzdGlvbkJhciwgQ29udHJvbHMgTGF5b3V0LFxyXG4gKiBTeW5jRGF0YUJ1dHRvbiwgYW5kIFJlc2V0QWxsXHJcbiAqXHJcbiAqIEBhdXRob3IgTWFybGEgU2NodWx6IChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKiBAYXV0aG9yIFNhbSBSZWlkIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBTY3JlZW5WaWV3LCB7IFNjcmVlblZpZXdPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vam9pc3QvanMvU2NyZWVuVmlldy5qcyc7XHJcbmltcG9ydCBSZXNldEFsbEJ1dHRvbiBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMvYnV0dG9ucy9SZXNldEFsbEJ1dHRvbi5qcyc7XHJcbmltcG9ydCBNZWFuU2hhcmVBbmRCYWxhbmNlQ29uc3RhbnRzIGZyb20gJy4uL01lYW5TaGFyZUFuZEJhbGFuY2VDb25zdGFudHMuanMnO1xyXG5pbXBvcnQgbWVhblNoYXJlQW5kQmFsYW5jZSBmcm9tICcuLi8uLi9tZWFuU2hhcmVBbmRCYWxhbmNlLmpzJztcclxuaW1wb3J0IE1lYW5TaGFyZUFuZEJhbGFuY2VNb2RlbCBmcm9tICcuLi9tb2RlbC9NZWFuU2hhcmVBbmRCYWxhbmNlTW9kZWwuanMnO1xyXG5pbXBvcnQgeyBOb2RlLCBUQ29sb3IgfSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgUXVlc3Rpb25CYXIgZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL1F1ZXN0aW9uQmFyLmpzJztcclxuaW1wb3J0IFRSZWFkT25seVByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvVFJlYWRPbmx5UHJvcGVydHkuanMnO1xyXG5pbXBvcnQgV2l0aFJlcXVpcmVkIGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy90eXBlcy9XaXRoUmVxdWlyZWQuanMnO1xyXG5cclxuZXhwb3J0IHR5cGUgTWVhblNoYXJlQW5kQmFsYW5jZVNjcmVlblZpZXdPcHRpb25zID0gV2l0aFJlcXVpcmVkPFNjcmVlblZpZXdPcHRpb25zLCAndGFuZGVtJz47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZWFuU2hhcmVBbmRCYWxhbmNlU2NyZWVuVmlldyBleHRlbmRzIFNjcmVlblZpZXcge1xyXG4gIHByb3RlY3RlZCByZWFkb25seSByZXNldEFsbEJ1dHRvbjogUmVzZXRBbGxCdXR0b247XHJcbiAgcHVibGljIHJlYWRvbmx5IHF1ZXN0aW9uQmFyOiBRdWVzdGlvbkJhcjtcclxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc2NyZWVuVmlld1Jvb3ROb2RlOiBOb2RlO1xyXG5cclxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoIG1vZGVsOiBNZWFuU2hhcmVBbmRCYWxhbmNlTW9kZWwsIHF1ZXN0aW9uQmFyU3RyaW5nUHJvcGVydHk6IFRSZWFkT25seVByb3BlcnR5PHN0cmluZz4sIHF1ZXN0aW9uQmFyQ29sb3I6IFRDb2xvciwgcHJvdmlkZWRPcHRpb25zOiBNZWFuU2hhcmVBbmRCYWxhbmNlU2NyZWVuVmlld09wdGlvbnMgKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gcHJvdmlkZWRPcHRpb25zO1xyXG5cclxuICAgIHN1cGVyKCBvcHRpb25zICk7XHJcblxyXG4gICAgdGhpcy5xdWVzdGlvbkJhciA9IG5ldyBRdWVzdGlvbkJhciggdGhpcy5sYXlvdXRCb3VuZHMsIHRoaXMudmlzaWJsZUJvdW5kc1Byb3BlcnR5LCB7XHJcbiAgICAgIHF1ZXN0aW9uU3RyaW5nOiBxdWVzdGlvbkJhclN0cmluZ1Byb3BlcnR5LFxyXG4gICAgICBiYXJGaWxsOiBxdWVzdGlvbkJhckNvbG9yLFxyXG5cclxuICAgICAgLy8gcGhldC1pb1xyXG4gICAgICB0YW5kZW06IG9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3F1ZXN0aW9uQmFyJyApXHJcbiAgICB9ICk7XHJcblxyXG4gICAgdGhpcy5yZXNldEFsbEJ1dHRvbiA9IG5ldyBSZXNldEFsbEJ1dHRvbigge1xyXG4gICAgICBsaXN0ZW5lcjogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaW50ZXJydXB0U3VidHJlZUlucHV0KCk7IC8vIGNhbmNlbCBpbnRlcmFjdGlvbnMgdGhhdCBtYXkgYmUgaW4gcHJvZ3Jlc3NcclxuICAgICAgICBtb2RlbC5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgfSxcclxuICAgICAgcmlnaHQ6IHRoaXMubGF5b3V0Qm91bmRzLm1heFggLSBNZWFuU2hhcmVBbmRCYWxhbmNlQ29uc3RhbnRzLlNDUkVFTl9WSUVXX1hfTUFSR0lOLFxyXG4gICAgICBib3R0b206IHRoaXMubGF5b3V0Qm91bmRzLm1heFkgLSBNZWFuU2hhcmVBbmRCYWxhbmNlQ29uc3RhbnRzLlNDUkVFTl9WSUVXX1lfTUFSR0lOLFxyXG5cclxuICAgICAgLy8gcGhldC1pb1xyXG4gICAgICB0YW5kZW06IG9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3Jlc2V0QWxsQnV0dG9uJyApXHJcbiAgICB9ICk7XHJcblxyXG4gICAgdGhpcy5zY3JlZW5WaWV3Um9vdE5vZGUgPSBuZXcgTm9kZSgge1xyXG4gICAgICBjaGlsZHJlbjogWyB0aGlzLnF1ZXN0aW9uQmFyLCB0aGlzLnJlc2V0QWxsQnV0dG9uIF1cclxuICAgIH0gKTtcclxuXHJcbiAgICB0aGlzLmFkZENoaWxkKCB0aGlzLnNjcmVlblZpZXdSb290Tm9kZSApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzZXRzIHRoZSB2aWV3LlxyXG4gICAqL1xyXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgIC8vIE1heSBiZSB1c2VkIGZvciBmdXR1cmUgc2NyZWVuc1xyXG4gIH1cclxufVxyXG5cclxubWVhblNoYXJlQW5kQmFsYW5jZS5yZWdpc3RlciggJ01lYW5TaGFyZUFuZEJhbGFuY2VTY3JlZW5WaWV3JywgTWVhblNoYXJlQW5kQmFsYW5jZVNjcmVlblZpZXcgKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFVBQVUsTUFBNkIsb0NBQW9DO0FBQ2xGLE9BQU9DLGNBQWMsTUFBTSx1REFBdUQ7QUFDbEYsT0FBT0MsNEJBQTRCLE1BQU0sb0NBQW9DO0FBQzdFLE9BQU9DLG1CQUFtQixNQUFNLDhCQUE4QjtBQUU5RCxTQUFTQyxJQUFJLFFBQWdCLG1DQUFtQztBQUNoRSxPQUFPQyxXQUFXLE1BQU0sNENBQTRDO0FBTXBFLGVBQWUsTUFBTUMsNkJBQTZCLFNBQVNOLFVBQVUsQ0FBQztFQUsxRE8sV0FBV0EsQ0FBRUMsS0FBK0IsRUFBRUMseUJBQW9ELEVBQUVDLGdCQUF3QixFQUFFQyxlQUFxRCxFQUFHO0lBQzlMLE1BQU1DLE9BQU8sR0FBR0QsZUFBZTtJQUUvQixLQUFLLENBQUVDLE9BQVEsQ0FBQztJQUVoQixJQUFJLENBQUNDLFdBQVcsR0FBRyxJQUFJUixXQUFXLENBQUUsSUFBSSxDQUFDUyxZQUFZLEVBQUUsSUFBSSxDQUFDQyxxQkFBcUIsRUFBRTtNQUNqRkMsY0FBYyxFQUFFUCx5QkFBeUI7TUFDekNRLE9BQU8sRUFBRVAsZ0JBQWdCO01BRXpCO01BQ0FRLE1BQU0sRUFBRU4sT0FBTyxDQUFDTSxNQUFNLENBQUNDLFlBQVksQ0FBRSxhQUFjO0lBQ3JELENBQUUsQ0FBQztJQUVILElBQUksQ0FBQ0MsY0FBYyxHQUFHLElBQUluQixjQUFjLENBQUU7TUFDeENvQixRQUFRLEVBQUVBLENBQUEsS0FBTTtRQUNkLElBQUksQ0FBQ0MscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUJkLEtBQUssQ0FBQ2UsS0FBSyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUNBLEtBQUssQ0FBQyxDQUFDO01BQ2QsQ0FBQztNQUNEQyxLQUFLLEVBQUUsSUFBSSxDQUFDVixZQUFZLENBQUNXLElBQUksR0FBR3ZCLDRCQUE0QixDQUFDd0Isb0JBQW9CO01BQ2pGQyxNQUFNLEVBQUUsSUFBSSxDQUFDYixZQUFZLENBQUNjLElBQUksR0FBRzFCLDRCQUE0QixDQUFDMkIsb0JBQW9CO01BRWxGO01BQ0FYLE1BQU0sRUFBRU4sT0FBTyxDQUFDTSxNQUFNLENBQUNDLFlBQVksQ0FBRSxnQkFBaUI7SUFDeEQsQ0FBRSxDQUFDO0lBRUgsSUFBSSxDQUFDVyxrQkFBa0IsR0FBRyxJQUFJMUIsSUFBSSxDQUFFO01BQ2xDMkIsUUFBUSxFQUFFLENBQUUsSUFBSSxDQUFDbEIsV0FBVyxFQUFFLElBQUksQ0FBQ08sY0FBYztJQUNuRCxDQUFFLENBQUM7SUFFSCxJQUFJLENBQUNZLFFBQVEsQ0FBRSxJQUFJLENBQUNGLGtCQUFtQixDQUFDO0VBQzFDOztFQUVBO0FBQ0Y7QUFDQTtFQUNTUCxLQUFLQSxDQUFBLEVBQVM7SUFDbkI7RUFBQTtBQUVKO0FBRUFwQixtQkFBbUIsQ0FBQzhCLFFBQVEsQ0FBRSwrQkFBK0IsRUFBRTNCLDZCQUE4QixDQUFDIn0=