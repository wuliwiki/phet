// Copyright 2023, University of Colorado Boulder

/**
 * Kepler's second law panel control: Swept area
 *
 * This class is mostly empty and only has SecondLawGraph as a child to keep code consistency across the three laws.
 *
 * @author Agustín Vallejo
 */

import { HBox, Text, VBox } from '../../../../scenery/js/imports.js';
import SecondLawGraph from './SecondLawGraph.js';
import keplersLaws from '../../keplersLaws.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import SolarSystemCommonConstants from '../../../../solar-system-common/js/SolarSystemCommonConstants.js';
import ArrowButton from '../../../../sun/js/buttons/ArrowButton.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import KeplersLawsStrings from '../../KeplersLawsStrings.js';
import Panel from '../../../../sun/js/Panel.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import KeplersLawsConstants from '../../KeplersLawsConstants.js';
export default class SecondLawPanels extends VBox {
  constructor(model) {
    super({
      margin: 5,
      stretch: true,
      children: [new SecondLawPanel(model), new SecondLawGraph(model)],
      visibleProperty: model.isSecondLawProperty
    });
  }
}
class SecondLawPanel extends Panel {
  constructor(model) {
    const options = combineOptions({
      visibleProperty: model.isSecondLawProperty
    }, SolarSystemCommonConstants.CONTROL_PANEL_OPTIONS);
    super(new VBox({
      spacing: SolarSystemCommonConstants.CHECKBOX_SPACING,
      children: [new Text(KeplersLawsStrings.area.periodDivisionStringProperty, SolarSystemCommonConstants.TEXT_OPTIONS), new DivisionsArrowButtonsBox(model), new Checkbox(model.areaValuesVisibleProperty, new Text(KeplersLawsStrings.area.valuesStringProperty, SolarSystemCommonConstants.TEXT_OPTIONS), SolarSystemCommonConstants.CHECKBOX_OPTIONS)]
    }), options);
  }
}
class DivisionsArrowButtonsBox extends HBox {
  constructor(model) {
    const divisionsRange = new RangeWithValue(KeplersLawsConstants.MIN_ORBITAL_DIVISIONS, KeplersLawsConstants.MAX_ORBITAL_DIVISIONS, 4);
    const arrowButtonOptions = {
      baseColor: 'white',
      stroke: 'black',
      lineWidth: 1
    };

    // increment button
    const incrementButton = new ArrowButton('right', () => {
      const numberValue = model.periodDivisionProperty.value;
      model.periodDivisionProperty.value = numberValue < divisionsRange.max ? numberValue + 1 : numberValue;
    }, combineOptions({
      enabledProperty: new DerivedProperty([model.periodDivisionProperty], periodDivisions => {
        return periodDivisions < divisionsRange.max;
      })
    }, arrowButtonOptions));

    // decrement button
    const decrementButton = new ArrowButton('left', () => {
      const numberValue = model.periodDivisionProperty.value;
      model.periodDivisionProperty.value = numberValue > divisionsRange.min ? numberValue - 1 : numberValue;
    }, combineOptions({
      enabledProperty: new DerivedProperty([model.periodDivisionProperty], periodDivisions => {
        return periodDivisions > divisionsRange.min;
      })
    }, arrowButtonOptions));
    super({
      spacing: 5,
      children: [decrementButton, new NumberDisplay(model.periodDivisionProperty, divisionsRange), incrementButton]
    });
  }
}
keplersLaws.register('SecondLawPanels', SecondLawPanels);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJIQm94IiwiVGV4dCIsIlZCb3giLCJTZWNvbmRMYXdHcmFwaCIsImtlcGxlcnNMYXdzIiwiUmFuZ2VXaXRoVmFsdWUiLCJTb2xhclN5c3RlbUNvbW1vbkNvbnN0YW50cyIsIkFycm93QnV0dG9uIiwiY29tYmluZU9wdGlvbnMiLCJEZXJpdmVkUHJvcGVydHkiLCJDaGVja2JveCIsIktlcGxlcnNMYXdzU3RyaW5ncyIsIlBhbmVsIiwiTnVtYmVyRGlzcGxheSIsIktlcGxlcnNMYXdzQ29uc3RhbnRzIiwiU2Vjb25kTGF3UGFuZWxzIiwiY29uc3RydWN0b3IiLCJtb2RlbCIsIm1hcmdpbiIsInN0cmV0Y2giLCJjaGlsZHJlbiIsIlNlY29uZExhd1BhbmVsIiwidmlzaWJsZVByb3BlcnR5IiwiaXNTZWNvbmRMYXdQcm9wZXJ0eSIsIm9wdGlvbnMiLCJDT05UUk9MX1BBTkVMX09QVElPTlMiLCJzcGFjaW5nIiwiQ0hFQ0tCT1hfU1BBQ0lORyIsImFyZWEiLCJwZXJpb2REaXZpc2lvblN0cmluZ1Byb3BlcnR5IiwiVEVYVF9PUFRJT05TIiwiRGl2aXNpb25zQXJyb3dCdXR0b25zQm94IiwiYXJlYVZhbHVlc1Zpc2libGVQcm9wZXJ0eSIsInZhbHVlc1N0cmluZ1Byb3BlcnR5IiwiQ0hFQ0tCT1hfT1BUSU9OUyIsImRpdmlzaW9uc1JhbmdlIiwiTUlOX09SQklUQUxfRElWSVNJT05TIiwiTUFYX09SQklUQUxfRElWSVNJT05TIiwiYXJyb3dCdXR0b25PcHRpb25zIiwiYmFzZUNvbG9yIiwic3Ryb2tlIiwibGluZVdpZHRoIiwiaW5jcmVtZW50QnV0dG9uIiwibnVtYmVyVmFsdWUiLCJwZXJpb2REaXZpc2lvblByb3BlcnR5IiwidmFsdWUiLCJtYXgiLCJlbmFibGVkUHJvcGVydHkiLCJwZXJpb2REaXZpc2lvbnMiLCJkZWNyZW1lbnRCdXR0b24iLCJtaW4iLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlNlY29uZExhd1BhbmVscy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogS2VwbGVyJ3Mgc2Vjb25kIGxhdyBwYW5lbCBjb250cm9sOiBTd2VwdCBhcmVhXHJcbiAqXHJcbiAqIFRoaXMgY2xhc3MgaXMgbW9zdGx5IGVtcHR5IGFuZCBvbmx5IGhhcyBTZWNvbmRMYXdHcmFwaCBhcyBhIGNoaWxkIHRvIGtlZXAgY29kZSBjb25zaXN0ZW5jeSBhY3Jvc3MgdGhlIHRocmVlIGxhd3MuXHJcbiAqXHJcbiAqIEBhdXRob3IgQWd1c3TDrW4gVmFsbGVqb1xyXG4gKi9cclxuXHJcbmltcG9ydCBLZXBsZXJzTGF3c01vZGVsIGZyb20gJy4uL21vZGVsL0tlcGxlcnNMYXdzTW9kZWwuanMnO1xyXG5pbXBvcnQgeyBIQm94LCBUZXh0LCBWQm94IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IFNlY29uZExhd0dyYXBoIGZyb20gJy4vU2Vjb25kTGF3R3JhcGguanMnO1xyXG5pbXBvcnQga2VwbGVyc0xhd3MgZnJvbSAnLi4vLi4va2VwbGVyc0xhd3MuanMnO1xyXG5pbXBvcnQgUmFuZ2VXaXRoVmFsdWUgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1JhbmdlV2l0aFZhbHVlLmpzJztcclxuaW1wb3J0IFNvbGFyU3lzdGVtQ29tbW9uQ29uc3RhbnRzIGZyb20gJy4uLy4uLy4uLy4uL3NvbGFyLXN5c3RlbS1jb21tb24vanMvU29sYXJTeXN0ZW1Db21tb25Db25zdGFudHMuanMnO1xyXG5pbXBvcnQgQXJyb3dCdXR0b24sIHsgQXJyb3dCdXR0b25PcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3VuL2pzL2J1dHRvbnMvQXJyb3dCdXR0b24uanMnO1xyXG5pbXBvcnQgeyBjb21iaW5lT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9vcHRpb25pemUuanMnO1xyXG5pbXBvcnQgRGVyaXZlZFByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvRGVyaXZlZFByb3BlcnR5LmpzJztcclxuaW1wb3J0IENoZWNrYm94IGZyb20gJy4uLy4uLy4uLy4uL3N1bi9qcy9DaGVja2JveC5qcyc7XHJcbmltcG9ydCBLZXBsZXJzTGF3c1N0cmluZ3MgZnJvbSAnLi4vLi4vS2VwbGVyc0xhd3NTdHJpbmdzLmpzJztcclxuaW1wb3J0IHsgQWNjb3JkaW9uQm94T3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3N1bi9qcy9BY2NvcmRpb25Cb3guanMnO1xyXG5pbXBvcnQgUGFuZWwgZnJvbSAnLi4vLi4vLi4vLi4vc3VuL2pzL1BhbmVsLmpzJztcclxuaW1wb3J0IE51bWJlckRpc3BsYXkgZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL051bWJlckRpc3BsYXkuanMnO1xyXG5pbXBvcnQgS2VwbGVyc0xhd3NDb25zdGFudHMgZnJvbSAnLi4vLi4vS2VwbGVyc0xhd3NDb25zdGFudHMuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vjb25kTGF3UGFuZWxzIGV4dGVuZHMgVkJveCB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBtb2RlbDogS2VwbGVyc0xhd3NNb2RlbCApIHtcclxuICAgIHN1cGVyKCB7XHJcbiAgICAgIG1hcmdpbjogNSxcclxuICAgICAgc3RyZXRjaDogdHJ1ZSxcclxuICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICBuZXcgU2Vjb25kTGF3UGFuZWwoIG1vZGVsICksXHJcbiAgICAgICAgbmV3IFNlY29uZExhd0dyYXBoKCBtb2RlbCApXHJcbiAgICAgIF0sXHJcbiAgICAgIHZpc2libGVQcm9wZXJ0eTogbW9kZWwuaXNTZWNvbmRMYXdQcm9wZXJ0eVxyXG4gICAgfSApO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgU2Vjb25kTGF3UGFuZWwgZXh0ZW5kcyBQYW5lbCB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBtb2RlbDogS2VwbGVyc0xhd3NNb2RlbCApIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSBjb21iaW5lT3B0aW9uczxBY2NvcmRpb25Cb3hPcHRpb25zPigge1xyXG4gICAgICB2aXNpYmxlUHJvcGVydHk6IG1vZGVsLmlzU2Vjb25kTGF3UHJvcGVydHlcclxuICAgIH0sIFNvbGFyU3lzdGVtQ29tbW9uQ29uc3RhbnRzLkNPTlRST0xfUEFORUxfT1BUSU9OUyApO1xyXG5cclxuICAgIHN1cGVyKCBuZXcgVkJveCgge1xyXG4gICAgICBzcGFjaW5nOiBTb2xhclN5c3RlbUNvbW1vbkNvbnN0YW50cy5DSEVDS0JPWF9TUEFDSU5HLFxyXG4gICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgIG5ldyBUZXh0KCBLZXBsZXJzTGF3c1N0cmluZ3MuYXJlYS5wZXJpb2REaXZpc2lvblN0cmluZ1Byb3BlcnR5LCBTb2xhclN5c3RlbUNvbW1vbkNvbnN0YW50cy5URVhUX09QVElPTlMgKSxcclxuICAgICAgICBuZXcgRGl2aXNpb25zQXJyb3dCdXR0b25zQm94KCBtb2RlbCApLFxyXG4gICAgICAgIG5ldyBDaGVja2JveCggbW9kZWwuYXJlYVZhbHVlc1Zpc2libGVQcm9wZXJ0eSwgbmV3IFRleHQoIEtlcGxlcnNMYXdzU3RyaW5ncy5hcmVhLnZhbHVlc1N0cmluZ1Byb3BlcnR5LCBTb2xhclN5c3RlbUNvbW1vbkNvbnN0YW50cy5URVhUX09QVElPTlMgKSwgU29sYXJTeXN0ZW1Db21tb25Db25zdGFudHMuQ0hFQ0tCT1hfT1BUSU9OUyApXHJcbiAgICAgIF1cclxuICAgIH0gKSwgb3B0aW9ucyApO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgRGl2aXNpb25zQXJyb3dCdXR0b25zQm94IGV4dGVuZHMgSEJveCB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBtb2RlbDogS2VwbGVyc0xhd3NNb2RlbCApIHtcclxuXHJcbiAgICBjb25zdCBkaXZpc2lvbnNSYW5nZSA9IG5ldyBSYW5nZVdpdGhWYWx1ZShcclxuICAgICAgS2VwbGVyc0xhd3NDb25zdGFudHMuTUlOX09SQklUQUxfRElWSVNJT05TLFxyXG4gICAgICBLZXBsZXJzTGF3c0NvbnN0YW50cy5NQVhfT1JCSVRBTF9ESVZJU0lPTlMsXHJcbiAgICAgIDQgKTtcclxuXHJcbiAgICBjb25zdCBhcnJvd0J1dHRvbk9wdGlvbnM6IEFycm93QnV0dG9uT3B0aW9ucyA9IHtcclxuICAgICAgYmFzZUNvbG9yOiAnd2hpdGUnLFxyXG4gICAgICBzdHJva2U6ICdibGFjaycsXHJcbiAgICAgIGxpbmVXaWR0aDogMVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBpbmNyZW1lbnQgYnV0dG9uXHJcbiAgICBjb25zdCBpbmNyZW1lbnRCdXR0b24gPSBuZXcgQXJyb3dCdXR0b24oXHJcbiAgICAgICdyaWdodCcsXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICBjb25zdCBudW1iZXJWYWx1ZSA9IG1vZGVsLnBlcmlvZERpdmlzaW9uUHJvcGVydHkudmFsdWU7XHJcbiAgICAgICAgbW9kZWwucGVyaW9kRGl2aXNpb25Qcm9wZXJ0eS52YWx1ZSA9XHJcbiAgICAgICAgICBudW1iZXJWYWx1ZSA8IGRpdmlzaW9uc1JhbmdlLm1heCA/XHJcbiAgICAgICAgICBudW1iZXJWYWx1ZSArIDEgOlxyXG4gICAgICAgICAgbnVtYmVyVmFsdWU7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbWJpbmVPcHRpb25zPEFycm93QnV0dG9uT3B0aW9ucz4oIHtcclxuICAgICAgICBlbmFibGVkUHJvcGVydHk6IG5ldyBEZXJpdmVkUHJvcGVydHkoXHJcbiAgICAgICAgICBbIG1vZGVsLnBlcmlvZERpdmlzaW9uUHJvcGVydHkgXSxcclxuICAgICAgICAgIHBlcmlvZERpdmlzaW9ucyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwZXJpb2REaXZpc2lvbnMgPCBkaXZpc2lvbnNSYW5nZS5tYXg7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICB9LCBhcnJvd0J1dHRvbk9wdGlvbnMgKVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBkZWNyZW1lbnQgYnV0dG9uXHJcbiAgICBjb25zdCBkZWNyZW1lbnRCdXR0b24gPSBuZXcgQXJyb3dCdXR0b24oXHJcbiAgICAgICdsZWZ0JyxcclxuICAgICAgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG51bWJlclZhbHVlID0gbW9kZWwucGVyaW9kRGl2aXNpb25Qcm9wZXJ0eS52YWx1ZTtcclxuICAgICAgICBtb2RlbC5wZXJpb2REaXZpc2lvblByb3BlcnR5LnZhbHVlID1cclxuICAgICAgICAgIG51bWJlclZhbHVlID4gZGl2aXNpb25zUmFuZ2UubWluID9cclxuICAgICAgICAgIG51bWJlclZhbHVlIC0gMSA6XHJcbiAgICAgICAgICBudW1iZXJWYWx1ZTtcclxuICAgICAgfSxcclxuICAgICAgY29tYmluZU9wdGlvbnM8QXJyb3dCdXR0b25PcHRpb25zPigge1xyXG4gICAgICAgIGVuYWJsZWRQcm9wZXJ0eTogbmV3IERlcml2ZWRQcm9wZXJ0eShcclxuICAgICAgICAgIFsgbW9kZWwucGVyaW9kRGl2aXNpb25Qcm9wZXJ0eSBdLFxyXG4gICAgICAgICAgcGVyaW9kRGl2aXNpb25zID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHBlcmlvZERpdmlzaW9ucyA+IGRpdmlzaW9uc1JhbmdlLm1pbjtcclxuICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgIH0sIGFycm93QnV0dG9uT3B0aW9ucyApXHJcbiAgICApO1xyXG5cclxuICAgIHN1cGVyKCB7XHJcbiAgICAgIHNwYWNpbmc6IDUsXHJcbiAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgZGVjcmVtZW50QnV0dG9uLFxyXG4gICAgICAgIG5ldyBOdW1iZXJEaXNwbGF5KCBtb2RlbC5wZXJpb2REaXZpc2lvblByb3BlcnR5LCBkaXZpc2lvbnNSYW5nZSApLFxyXG4gICAgICAgIGluY3JlbWVudEJ1dHRvblxyXG4gICAgICBdXHJcbiAgICB9ICk7XHJcbiAgfVxyXG59XHJcblxyXG5rZXBsZXJzTGF3cy5y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