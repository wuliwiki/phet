// Copyright 2020-2022, University of Colorado Boulder

/**
 * Radio button group for choosing what Tick Marks are visible in the ratio view.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import { ParallelDOM, Path } from '../../../../scenery/js/imports.js';
import eyeSlashSolidShape from '../../../../sherpa/js/fontawesome-5/eyeSlashSolidShape.js';
import ActivationUtterance from '../../../../utterance-queue/js/ActivationUtterance.js';
import ratioAndProportion from '../../ratioAndProportion.js';
import RatioAndProportionStrings from '../../RatioAndProportionStrings.js';
import TickMarkView from './TickMarkView.js';
import optionize from '../../../../phet-core/js/optionize.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
// constants
const ICON_SCALE = 0.45;
class TickMarkViewRadioButtonGroup extends RectangularRadioButtonGroup {
  constructor(tickMarkViewProperty, providedOptions) {
    const options = optionize()({
      orientation: 'horizontal',
      radioButtonOptions: {
        baseColor: 'white',
        xMargin: 8,
        yMargin: 14
      },
      // pdom
      labelContent: RatioAndProportionStrings.a11y.tickMark.headingStringProperty,
      helpTextBehavior: ParallelDOM.HELP_TEXT_BEFORE_CONTENT
    }, providedOptions);
    const radioButtonItemData = [{
      createNode: tandem => new Path(eyeSlashSolidShape, {
        scale: 0.05,
        fill: 'black'
      }),
      value: TickMarkView.NONE,
      interactiveDescriptionContextResponse: RatioAndProportionStrings.a11y.tickMark.tickMarksHiddenStringProperty,
      voicingContextResponse: RatioAndProportionStrings.a11y.tickMark.tickMarksHiddenStringProperty,
      // pdom
      labelContent: RatioAndProportionStrings.a11y.tickMark.showNoStringProperty,
      // phet-io
      tandemName: 'showNoRadioButton'
    }, {
      createNode: tandem => new TickMarksIconPath(),
      value: TickMarkView.VISIBLE,
      interactiveDescriptionContextResponse: RatioAndProportionStrings.a11y.tickMark.tickMarksShownStringProperty,
      voicingContextResponse: RatioAndProportionStrings.a11y.tickMark.tickMarksShownStringProperty,
      // pdom
      labelContent: RatioAndProportionStrings.a11y.tickMark.showStringProperty,
      // phet-io
      tandemName: 'showRadioButton'
    }, {
      createNode: tandem => new NumberedTickMarksIconPath(),
      value: TickMarkView.VISIBLE_WITH_UNITS,
      interactiveDescriptionContextResponse: RatioAndProportionStrings.a11y.tickMark.numberedTickMarksShownStringProperty,
      voicingContextResponse: RatioAndProportionStrings.a11y.tickMark.numberedTickMarksShownStringProperty,
      // pdom
      labelContent: RatioAndProportionStrings.a11y.tickMark.showNumberedStringProperty,
      // phet-io
      tandemName: 'showNumberedRadioButton'
    }];
    super(tickMarkViewProperty, radioButtonItemData, options);
    const tickMarkContextResponseUtterance = new ActivationUtterance();
    tickMarkViewProperty.lazyLink(tickMarkView => {
      const currentRadioButtonItem = _.find(radioButtonItemData, item => item.value === tickMarkView);
      assert && assert(currentRadioButtonItem, 'radio button item expected');

      // interactive description alert
      tickMarkContextResponseUtterance.alert = currentRadioButtonItem.interactiveDescriptionContextResponse;
      this.alertDescriptionUtterance(tickMarkContextResponseUtterance);
    });
  }
}
class NumberedTickMarksIconPath extends Path {
  constructor(providedOptions) {
    const options = optionize()({
      fill: 'black',
      scale: ICON_SCALE
    }, providedOptions);
    const shape = 'm60.25 69.833h34v5h-34zm-54.5 0h34v5h-34zm54.5-22.334h34v5h-34zm-54.5 0h34v5h-34zm54.5-22.198h34v5h-34zm-54.5 ' + '0h34v5h-34zm46.985 54.939h-3.019v-11.376c-1.103 1.031-2.402 1.794-3.899 2.288v-2.739c0.788-0.258 1.644-0.747 ' + '2.567-1.467s1.558-1.559 1.901-2.519h2.449v15.813zm2.471-25.138v2.804h-10.581c0.114-1.06 0.458-2.063 ' + '1.031-3.013s1.704-2.208 3.395-3.776c1.36-1.268 2.195-2.127 2.503-2.578 0.415-0.623 0.623-1.239 0.623-1.848 ' + '0-0.673-0.181-1.19-0.543-1.552-0.361-0.361-0.86-0.542-1.498-0.542-0.63 0-1.132 0.19-1.504 0.569-0.372 ' + '0.38-0.587 1.01-0.645 1.891l-3.008-0.301c0.179-1.661 0.741-2.854 1.687-3.577 0.945-0.723 2.127-1.085 ' + '3.545-1.085 1.554 0 2.775 0.419 3.663 1.257s1.332 1.88 1.332 3.126c0 0.709-0.127 1.384-0.381 2.025-0.255 ' + '0.641-0.657 1.312-1.209 2.014-0.365 0.466-1.024 1.135-1.977 2.009-0.952 0.874-1.556 1.454-1.811 1.74-0.254 ' + '0.287-0.46 0.566-0.617 0.838h5.995zm-10.303-23.708 2.922-0.354c0.093 0.745 0.344 1.314 0.752 1.708s0.902 ' + '0.591 1.482 0.591c0.623 0 1.147-0.236 1.573-0.709 0.427-0.473 0.64-1.11 0.64-1.912 ' + '0-0.759-0.204-1.36-0.612-1.805-0.408-0.444-0.906-0.666-1.493-0.666-0.387 ' + '0-0.849 0.075-1.386 0.226l0.333-2.46c0.816 0.021 1.439-0.156 1.869-0.532s0.645-0.875 ' + '0.645-1.499c0-0.53-0.157-0.952-0.473-1.268-0.315-0.315-0.734-0.473-1.257-0.473-0.516 0-0.956 0.179-1.321 0.537s-0.587 0.881-0.666 ' + '1.568l-2.782-0.473c0.193-0.952 0.485-1.713 0.875-2.283 0.391-0.569 0.936-1.017 1.633-1.343 0.699-0.326 1.481-0.489 2.348-0.489 1.482 ' + '0 2.671 0.473 3.566 1.418 0.737 0.773 1.106 1.647 1.106 2.621 0 1.382-0.756 2.485-2.267 3.309 0.902 0.193 1.624 0.627 2.164 1.3 0.541 ' + '0.673 0.812 1.486 0.812 2.438 0 1.382-0.505 2.561-1.515 3.534-1.01 0.974-2.267 1.461-3.771 1.461-1.425 ' + '0-2.606-0.41-3.545-1.23-0.937-0.817-1.481-1.89-1.632-3.215z';
    super(shape, options);
  }
}
class TickMarksIconPath extends Path {
  constructor(providedOptions) {
    const options = optionize()({
      fill: 'black',
      scale: ICON_SCALE
    }, providedOptions);
    const shape = 'm5.25 25.166v5h89v-5zm0 22.334v5h89v-5zm0.5 22.332v5h89v-5z';
    super(shape, options);
  }
}
ratioAndProportion.register('TickMarkViewRadioButtonGroup', TickMarkViewRadioButtonGroup);
export default TickMarkViewRadioButtonGroup;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQYXJhbGxlbERPTSIsIlBhdGgiLCJleWVTbGFzaFNvbGlkU2hhcGUiLCJBY3RpdmF0aW9uVXR0ZXJhbmNlIiwicmF0aW9BbmRQcm9wb3J0aW9uIiwiUmF0aW9BbmRQcm9wb3J0aW9uU3RyaW5ncyIsIlRpY2tNYXJrVmlldyIsIm9wdGlvbml6ZSIsIlJlY3Rhbmd1bGFyUmFkaW9CdXR0b25Hcm91cCIsIklDT05fU0NBTEUiLCJUaWNrTWFya1ZpZXdSYWRpb0J1dHRvbkdyb3VwIiwiY29uc3RydWN0b3IiLCJ0aWNrTWFya1ZpZXdQcm9wZXJ0eSIsInByb3ZpZGVkT3B0aW9ucyIsIm9wdGlvbnMiLCJvcmllbnRhdGlvbiIsInJhZGlvQnV0dG9uT3B0aW9ucyIsImJhc2VDb2xvciIsInhNYXJnaW4iLCJ5TWFyZ2luIiwibGFiZWxDb250ZW50IiwiYTExeSIsInRpY2tNYXJrIiwiaGVhZGluZ1N0cmluZ1Byb3BlcnR5IiwiaGVscFRleHRCZWhhdmlvciIsIkhFTFBfVEVYVF9CRUZPUkVfQ09OVEVOVCIsInJhZGlvQnV0dG9uSXRlbURhdGEiLCJjcmVhdGVOb2RlIiwidGFuZGVtIiwic2NhbGUiLCJmaWxsIiwidmFsdWUiLCJOT05FIiwiaW50ZXJhY3RpdmVEZXNjcmlwdGlvbkNvbnRleHRSZXNwb25zZSIsInRpY2tNYXJrc0hpZGRlblN0cmluZ1Byb3BlcnR5Iiwidm9pY2luZ0NvbnRleHRSZXNwb25zZSIsInNob3dOb1N0cmluZ1Byb3BlcnR5IiwidGFuZGVtTmFtZSIsIlRpY2tNYXJrc0ljb25QYXRoIiwiVklTSUJMRSIsInRpY2tNYXJrc1Nob3duU3RyaW5nUHJvcGVydHkiLCJzaG93U3RyaW5nUHJvcGVydHkiLCJOdW1iZXJlZFRpY2tNYXJrc0ljb25QYXRoIiwiVklTSUJMRV9XSVRIX1VOSVRTIiwibnVtYmVyZWRUaWNrTWFya3NTaG93blN0cmluZ1Byb3BlcnR5Iiwic2hvd051bWJlcmVkU3RyaW5nUHJvcGVydHkiLCJ0aWNrTWFya0NvbnRleHRSZXNwb25zZVV0dGVyYW5jZSIsImxhenlMaW5rIiwidGlja01hcmtWaWV3IiwiY3VycmVudFJhZGlvQnV0dG9uSXRlbSIsIl8iLCJmaW5kIiwiaXRlbSIsImFzc2VydCIsImFsZXJ0IiwiYWxlcnREZXNjcmlwdGlvblV0dGVyYW5jZSIsInNoYXBlIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJUaWNrTWFya1ZpZXdSYWRpb0J1dHRvbkdyb3VwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFJhZGlvIGJ1dHRvbiBncm91cCBmb3IgY2hvb3Npbmcgd2hhdCBUaWNrIE1hcmtzIGFyZSB2aXNpYmxlIGluIHRoZSByYXRpbyB2aWV3LlxyXG4gKlxyXG4gKiBAYXV0aG9yIE1pY2hhZWwgS2F1em1hbm4gKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgUGFyYWxsZWxET00sIFBhdGgsIFBhdGhPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IGV5ZVNsYXNoU29saWRTaGFwZSBmcm9tICcuLi8uLi8uLi8uLi9zaGVycGEvanMvZm9udGF3ZXNvbWUtNS9leWVTbGFzaFNvbGlkU2hhcGUuanMnO1xyXG5pbXBvcnQgQWN0aXZhdGlvblV0dGVyYW5jZSBmcm9tICcuLi8uLi8uLi8uLi91dHRlcmFuY2UtcXVldWUvanMvQWN0aXZhdGlvblV0dGVyYW5jZS5qcyc7XHJcbmltcG9ydCByYXRpb0FuZFByb3BvcnRpb24gZnJvbSAnLi4vLi4vcmF0aW9BbmRQcm9wb3J0aW9uLmpzJztcclxuaW1wb3J0IFJhdGlvQW5kUHJvcG9ydGlvblN0cmluZ3MgZnJvbSAnLi4vLi4vUmF0aW9BbmRQcm9wb3J0aW9uU3RyaW5ncy5qcyc7XHJcbmltcG9ydCBUaWNrTWFya1ZpZXcgZnJvbSAnLi9UaWNrTWFya1ZpZXcuanMnO1xyXG5pbXBvcnQgRW51bWVyYXRpb25Qcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL0VudW1lcmF0aW9uUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgb3B0aW9uaXplLCB7IEVtcHR5U2VsZk9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvb3B0aW9uaXplLmpzJztcclxuaW1wb3J0IFJlY3Rhbmd1bGFyUmFkaW9CdXR0b25Hcm91cCwgeyBSZWN0YW5ndWxhclJhZGlvQnV0dG9uR3JvdXBPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3VuL2pzL2J1dHRvbnMvUmVjdGFuZ3VsYXJSYWRpb0J1dHRvbkdyb3VwLmpzJztcclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi8uLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuXHJcbi8vIGNvbnN0YW50c1xyXG5jb25zdCBJQ09OX1NDQUxFID0gMC40NTtcclxuXHJcbmNsYXNzIFRpY2tNYXJrVmlld1JhZGlvQnV0dG9uR3JvdXAgZXh0ZW5kcyBSZWN0YW5ndWxhclJhZGlvQnV0dG9uR3JvdXA8VGlja01hcmtWaWV3PiB7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggdGlja01hcmtWaWV3UHJvcGVydHk6IEVudW1lcmF0aW9uUHJvcGVydHk8VGlja01hcmtWaWV3PiwgcHJvdmlkZWRPcHRpb25zPzogUmVjdGFuZ3VsYXJSYWRpb0J1dHRvbkdyb3VwT3B0aW9ucyApIHtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0gb3B0aW9uaXplPFJlY3Rhbmd1bGFyUmFkaW9CdXR0b25Hcm91cE9wdGlvbnMsIEVtcHR5U2VsZk9wdGlvbnM+KCkoIHtcclxuICAgICAgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcclxuICAgICAgcmFkaW9CdXR0b25PcHRpb25zOiB7XHJcbiAgICAgICAgYmFzZUNvbG9yOiAnd2hpdGUnLFxyXG4gICAgICAgIHhNYXJnaW46IDgsXHJcbiAgICAgICAgeU1hcmdpbjogMTRcclxuICAgICAgfSxcclxuXHJcbiAgICAgIC8vIHBkb21cclxuICAgICAgbGFiZWxDb250ZW50OiBSYXRpb0FuZFByb3BvcnRpb25TdHJpbmdzLmExMXkudGlja01hcmsuaGVhZGluZ1N0cmluZ1Byb3BlcnR5LFxyXG4gICAgICBoZWxwVGV4dEJlaGF2aW9yOiBQYXJhbGxlbERPTS5IRUxQX1RFWFRfQkVGT1JFX0NPTlRFTlRcclxuICAgIH0sIHByb3ZpZGVkT3B0aW9ucyApO1xyXG5cclxuICAgIGNvbnN0IHJhZGlvQnV0dG9uSXRlbURhdGEgPSBbIHtcclxuICAgICAgY3JlYXRlTm9kZTogKCB0YW5kZW06IFRhbmRlbSApID0+IG5ldyBQYXRoKCBleWVTbGFzaFNvbGlkU2hhcGUsIHsgc2NhbGU6IDAuMDUsIGZpbGw6ICdibGFjaycgfSApLFxyXG4gICAgICB2YWx1ZTogVGlja01hcmtWaWV3Lk5PTkUsXHJcblxyXG4gICAgICBpbnRlcmFjdGl2ZURlc2NyaXB0aW9uQ29udGV4dFJlc3BvbnNlOiBSYXRpb0FuZFByb3BvcnRpb25TdHJpbmdzLmExMXkudGlja01hcmsudGlja01hcmtzSGlkZGVuU3RyaW5nUHJvcGVydHksXHJcbiAgICAgIHZvaWNpbmdDb250ZXh0UmVzcG9uc2U6IFJhdGlvQW5kUHJvcG9ydGlvblN0cmluZ3MuYTExeS50aWNrTWFyay50aWNrTWFya3NIaWRkZW5TdHJpbmdQcm9wZXJ0eSxcclxuXHJcbiAgICAgIC8vIHBkb21cclxuICAgICAgbGFiZWxDb250ZW50OiBSYXRpb0FuZFByb3BvcnRpb25TdHJpbmdzLmExMXkudGlja01hcmsuc2hvd05vU3RyaW5nUHJvcGVydHksXHJcblxyXG4gICAgICAvLyBwaGV0LWlvXHJcbiAgICAgIHRhbmRlbU5hbWU6ICdzaG93Tm9SYWRpb0J1dHRvbidcclxuICAgIH0sIHtcclxuICAgICAgY3JlYXRlTm9kZTogKCB0YW5kZW06IFRhbmRlbSApID0+IG5ldyBUaWNrTWFya3NJY29uUGF0aCgpLFxyXG4gICAgICB2YWx1ZTogVGlja01hcmtWaWV3LlZJU0lCTEUsXHJcblxyXG4gICAgICBpbnRlcmFjdGl2ZURlc2NyaXB0aW9uQ29udGV4dFJlc3BvbnNlOiBSYXRpb0FuZFByb3BvcnRpb25TdHJpbmdzLmExMXkudGlja01hcmsudGlja01hcmtzU2hvd25TdHJpbmdQcm9wZXJ0eSxcclxuICAgICAgdm9pY2luZ0NvbnRleHRSZXNwb25zZTogUmF0aW9BbmRQcm9wb3J0aW9uU3RyaW5ncy5hMTF5LnRpY2tNYXJrLnRpY2tNYXJrc1Nob3duU3RyaW5nUHJvcGVydHksXHJcblxyXG4gICAgICAvLyBwZG9tXHJcbiAgICAgIGxhYmVsQ29udGVudDogUmF0aW9BbmRQcm9wb3J0aW9uU3RyaW5ncy5hMTF5LnRpY2tNYXJrLnNob3dTdHJpbmdQcm9wZXJ0eSxcclxuXHJcbiAgICAgIC8vIHBoZXQtaW9cclxuICAgICAgdGFuZGVtTmFtZTogJ3Nob3dSYWRpb0J1dHRvbidcclxuICAgIH0sIHtcclxuICAgICAgY3JlYXRlTm9kZTogKCB0YW5kZW06IFRhbmRlbSApID0+IG5ldyBOdW1iZXJlZFRpY2tNYXJrc0ljb25QYXRoKCksXHJcbiAgICAgIHZhbHVlOiBUaWNrTWFya1ZpZXcuVklTSUJMRV9XSVRIX1VOSVRTLFxyXG5cclxuICAgICAgaW50ZXJhY3RpdmVEZXNjcmlwdGlvbkNvbnRleHRSZXNwb25zZTogUmF0aW9BbmRQcm9wb3J0aW9uU3RyaW5ncy5hMTF5LnRpY2tNYXJrLm51bWJlcmVkVGlja01hcmtzU2hvd25TdHJpbmdQcm9wZXJ0eSxcclxuICAgICAgdm9pY2luZ0NvbnRleHRSZXNwb25zZTogUmF0aW9BbmRQcm9wb3J0aW9uU3RyaW5ncy5hMTF5LnRpY2tNYXJrLm51bWJlcmVkVGlja01hcmtzU2hvd25TdHJpbmdQcm9wZXJ0eSxcclxuXHJcbiAgICAgIC8vIHBkb21cclxuICAgICAgbGFiZWxDb250ZW50OiBSYXRpb0FuZFByb3BvcnRpb25TdHJpbmdzLmExMXkudGlja01hcmsuc2hvd051bWJlcmVkU3RyaW5nUHJvcGVydHksXHJcblxyXG4gICAgICAvLyBwaGV0LWlvXHJcbiAgICAgIHRhbmRlbU5hbWU6ICdzaG93TnVtYmVyZWRSYWRpb0J1dHRvbidcclxuICAgIH0gXTtcclxuICAgIHN1cGVyKCB0aWNrTWFya1ZpZXdQcm9wZXJ0eSwgcmFkaW9CdXR0b25JdGVtRGF0YSwgb3B0aW9ucyApO1xyXG5cclxuICAgIGNvbnN0IHRpY2tNYXJrQ29udGV4dFJlc3BvbnNlVXR0ZXJhbmNlID0gbmV3IEFjdGl2YXRpb25VdHRlcmFuY2UoKTtcclxuICAgIHRpY2tNYXJrVmlld1Byb3BlcnR5LmxhenlMaW5rKCB0aWNrTWFya1ZpZXcgPT4ge1xyXG4gICAgICBjb25zdCBjdXJyZW50UmFkaW9CdXR0b25JdGVtID0gXy5maW5kKCByYWRpb0J1dHRvbkl0ZW1EYXRhLCBpdGVtID0+IGl0ZW0udmFsdWUgPT09IHRpY2tNYXJrVmlldyApITtcclxuICAgICAgYXNzZXJ0ICYmIGFzc2VydCggY3VycmVudFJhZGlvQnV0dG9uSXRlbSwgJ3JhZGlvIGJ1dHRvbiBpdGVtIGV4cGVjdGVkJyApO1xyXG5cclxuICAgICAgLy8gaW50ZXJhY3RpdmUgZGVzY3JpcHRpb24gYWxlcnRcclxuICAgICAgdGlja01hcmtDb250ZXh0UmVzcG9uc2VVdHRlcmFuY2UuYWxlcnQgPSBjdXJyZW50UmFkaW9CdXR0b25JdGVtLmludGVyYWN0aXZlRGVzY3JpcHRpb25Db250ZXh0UmVzcG9uc2U7XHJcbiAgICAgIHRoaXMuYWxlcnREZXNjcmlwdGlvblV0dGVyYW5jZSggdGlja01hcmtDb250ZXh0UmVzcG9uc2VVdHRlcmFuY2UgKTtcclxuICAgIH0gKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIE51bWJlcmVkVGlja01hcmtzSWNvblBhdGggZXh0ZW5kcyBQYXRoIHtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBwcm92aWRlZE9wdGlvbnM/OiBQYXRoT3B0aW9ucyApIHtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0gb3B0aW9uaXplPFBhdGhPcHRpb25zLCBFbXB0eVNlbGZPcHRpb25zPigpKCB7XHJcbiAgICAgIGZpbGw6ICdibGFjaycsXHJcbiAgICAgIHNjYWxlOiBJQ09OX1NDQUxFXHJcbiAgICB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICBjb25zdCBzaGFwZSA9ICdtNjAuMjUgNjkuODMzaDM0djVoLTM0em0tNTQuNSAwaDM0djVoLTM0em01NC41LTIyLjMzNGgzNHY1aC0zNHptLTU0LjUgMGgzNHY1aC0zNHptNTQuNS0yMi4xOThoMzR2NWgtMzR6bS01NC41ICcgK1xyXG4gICAgICAgICAgICAgICAgICAnMGgzNHY1aC0zNHptNDYuOTg1IDU0LjkzOWgtMy4wMTl2LTExLjM3NmMtMS4xMDMgMS4wMzEtMi40MDIgMS43OTQtMy44OTkgMi4yODh2LTIuNzM5YzAuNzg4LTAuMjU4IDEuNjQ0LTAuNzQ3ICcgK1xyXG4gICAgICAgICAgICAgICAgICAnMi41NjctMS40NjdzMS41NTgtMS41NTkgMS45MDEtMi41MTloMi40NDl2MTUuODEzem0yLjQ3MS0yNS4xMzh2Mi44MDRoLTEwLjU4MWMwLjExNC0xLjA2IDAuNDU4LTIuMDYzICcgK1xyXG4gICAgICAgICAgICAgICAgICAnMS4wMzEtMy4wMTNzMS43MDQtMi4yMDggMy4zOTUtMy43NzZjMS4zNi0xLjI2OCAyLjE5NS0yLjEyNyAyLjUwMy0yLjU3OCAwLjQxNS0wLjYyMyAwLjYyMy0xLjIzOSAwLjYyMy0xLjg0OCAnICtcclxuICAgICAgICAgICAgICAgICAgJzAtMC42NzMtMC4xODEtMS4xOS0wLjU0My0xLjU1Mi0wLjM2MS0wLjM2MS0wLjg2LTAuNTQyLTEuNDk4LTAuNTQyLTAuNjMgMC0xLjEzMiAwLjE5LTEuNTA0IDAuNTY5LTAuMzcyICcgK1xyXG4gICAgICAgICAgICAgICAgICAnMC4zOC0wLjU4NyAxLjAxLTAuNjQ1IDEuODkxbC0zLjAwOC0wLjMwMWMwLjE3OS0xLjY2MSAwLjc0MS0yLjg1NCAxLjY4Ny0zLjU3NyAwLjk0NS0wLjcyMyAyLjEyNy0xLjA4NSAnICtcclxuICAgICAgICAgICAgICAgICAgJzMuNTQ1LTEuMDg1IDEuNTU0IDAgMi43NzUgMC40MTkgMy42NjMgMS4yNTdzMS4zMzIgMS44OCAxLjMzMiAzLjEyNmMwIDAuNzA5LTAuMTI3IDEuMzg0LTAuMzgxIDIuMDI1LTAuMjU1ICcgK1xyXG4gICAgICAgICAgICAgICAgICAnMC42NDEtMC42NTcgMS4zMTItMS4yMDkgMi4wMTQtMC4zNjUgMC40NjYtMS4wMjQgMS4xMzUtMS45NzcgMi4wMDktMC45NTIgMC44NzQtMS41NTYgMS40NTQtMS44MTEgMS43NC0wLjI1NCAnICtcclxuICAgICAgICAgICAgICAgICAgJzAuMjg3LTAuNDYgMC41NjYtMC42MTcgMC44MzhoNS45OTV6bS0xMC4zMDMtMjMuNzA4IDIuOTIyLTAuMzU0YzAuMDkzIDAuNzQ1IDAuMzQ0IDEuMzE0IDAuNzUyIDEuNzA4czAuOTAyICcgK1xyXG4gICAgICAgICAgICAgICAgICAnMC41OTEgMS40ODIgMC41OTFjMC42MjMgMCAxLjE0Ny0wLjIzNiAxLjU3My0wLjcwOSAwLjQyNy0wLjQ3MyAwLjY0LTEuMTEgMC42NC0xLjkxMiAnICtcclxuICAgICAgICAgICAgICAgICAgJzAtMC43NTktMC4yMDQtMS4zNi0wLjYxMi0xLjgwNS0wLjQwOC0wLjQ0NC0wLjkwNi0wLjY2Ni0xLjQ5My0wLjY2Ni0wLjM4NyAnICtcclxuICAgICAgICAgICAgICAgICAgJzAtMC44NDkgMC4wNzUtMS4zODYgMC4yMjZsMC4zMzMtMi40NmMwLjgxNiAwLjAyMSAxLjQzOS0wLjE1NiAxLjg2OS0wLjUzMnMwLjY0NS0wLjg3NSAnICtcclxuICAgICAgICAgICAgICAgICAgJzAuNjQ1LTEuNDk5YzAtMC41My0wLjE1Ny0wLjk1Mi0wLjQ3My0xLjI2OC0wLjMxNS0wLjMxNS0wLjczNC0wLjQ3My0xLjI1Ny0wLjQ3My0wLjUxNiAwLTAuOTU2IDAuMTc5LTEuMzIxIDAuNTM3cy0wLjU4NyAwLjg4MS0wLjY2NiAnICtcclxuICAgICAgICAgICAgICAgICAgJzEuNTY4bC0yLjc4Mi0wLjQ3M2MwLjE5My0wLjk1MiAwLjQ4NS0xLjcxMyAwLjg3NS0yLjI4MyAwLjM5MS0wLjU2OSAwLjkzNi0xLjAxNyAxLjYzMy0xLjM0MyAwLjY5OS0wLjMyNiAxLjQ4MS0wLjQ4OSAyLjM0OC0wLjQ4OSAxLjQ4MiAnICtcclxuICAgICAgICAgICAgICAgICAgJzAgMi42NzEgMC40NzMgMy41NjYgMS40MTggMC43MzcgMC43NzMgMS4xMDYgMS42NDcgMS4xMDYgMi42MjEgMCAxLjM4Mi0wLjc1NiAyLjQ4NS0yLjI2NyAzLjMwOSAwLjkwMiAwLjE5MyAxLjYyNCAwLjYyNyAyLjE2NCAxLjMgMC41NDEgJyArXHJcbiAgICAgICAgICAgICAgICAgICcwLjY3MyAwLjgxMiAxLjQ4NiAwLjgxMiAyLjQzOCAwIDEuMzgyLTAuNTA1IDIuNTYxLTEuNTE1IDMuNTM0LTEuMDEgMC45NzQtMi4yNjcgMS40NjEtMy43NzEgMS40NjEtMS40MjUgJyArXHJcbiAgICAgICAgICAgICAgICAgICcwLTIuNjA2LTAuNDEtMy41NDUtMS4yMy0wLjkzNy0wLjgxNy0xLjQ4MS0xLjg5LTEuNjMyLTMuMjE1eic7XHJcblxyXG4gICAgc3VwZXIoIHNoYXBlLCBvcHRpb25zICk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBUaWNrTWFya3NJY29uUGF0aCBleHRlbmRzIFBhdGgge1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIHByb3ZpZGVkT3B0aW9ucz86IFBhdGhPcHRpb25zICkge1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25pemU8UGF0aE9wdGlvbnMsIEVtcHR5U2VsZk9wdGlvbnM+KCkoIHtcclxuICAgICAgZmlsbDogJ2JsYWNrJyxcclxuICAgICAgc2NhbGU6IElDT05fU0NBTEVcclxuICAgIH0sIHByb3ZpZGVkT3B0aW9ucyApO1xyXG5cclxuICAgIGNvbnN0IHNoYXBlID0gJ201LjI1IDI1LjE2NnY1aDg5di01em0wIDIyLjMzNHY1aDg5di01em0wLjUgMjIuMzMydjVoODl2LTV6JztcclxuXHJcbiAgICBzdXBlciggc2hhcGUsIG9wdGlvbnMgKTtcclxuICB9XHJcbn1cclxuXHJcbnJhdGlvQW5kUHJvcG9ydGlvbi5yZWdpc3RlciggJ1RpY2tNYXJrVmlld1JhZGlvQnV0dG9uR3JvdXAnLCBUaWNrTWFya1ZpZXdSYWRpb0J1dHRvbkdyb3VwICk7XHJcbmV4cG9ydCBkZWZhdWx0IFRpY2tNYXJrVmlld1JhZGlvQnV0dG9uR3JvdXA7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLFdBQVcsRUFBRUMsSUFBSSxRQUFxQixtQ0FBbUM7QUFDbEYsT0FBT0Msa0JBQWtCLE1BQU0sMkRBQTJEO0FBQzFGLE9BQU9DLG1CQUFtQixNQUFNLHVEQUF1RDtBQUN2RixPQUFPQyxrQkFBa0IsTUFBTSw2QkFBNkI7QUFDNUQsT0FBT0MseUJBQXlCLE1BQU0sb0NBQW9DO0FBQzFFLE9BQU9DLFlBQVksTUFBTSxtQkFBbUI7QUFFNUMsT0FBT0MsU0FBUyxNQUE0Qix1Q0FBdUM7QUFDbkYsT0FBT0MsMkJBQTJCLE1BQThDLDJEQUEyRDtBQUczSTtBQUNBLE1BQU1DLFVBQVUsR0FBRyxJQUFJO0FBRXZCLE1BQU1DLDRCQUE0QixTQUFTRiwyQkFBMkIsQ0FBZTtFQUU1RUcsV0FBV0EsQ0FBRUMsb0JBQXVELEVBQUVDLGVBQW9ELEVBQUc7SUFFbEksTUFBTUMsT0FBTyxHQUFHUCxTQUFTLENBQXVELENBQUMsQ0FBRTtNQUNqRlEsV0FBVyxFQUFFLFlBQVk7TUFDekJDLGtCQUFrQixFQUFFO1FBQ2xCQyxTQUFTLEVBQUUsT0FBTztRQUNsQkMsT0FBTyxFQUFFLENBQUM7UUFDVkMsT0FBTyxFQUFFO01BQ1gsQ0FBQztNQUVEO01BQ0FDLFlBQVksRUFBRWYseUJBQXlCLENBQUNnQixJQUFJLENBQUNDLFFBQVEsQ0FBQ0MscUJBQXFCO01BQzNFQyxnQkFBZ0IsRUFBRXhCLFdBQVcsQ0FBQ3lCO0lBQ2hDLENBQUMsRUFBRVosZUFBZ0IsQ0FBQztJQUVwQixNQUFNYSxtQkFB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