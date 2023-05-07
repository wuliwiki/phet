// Copyright 2022, University of Colorado Boulder

/**
 * Demo for WavelengthNumberControl
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Range from '../../../../dot/js/Range.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import FineCoarseSpinner from '../../FineCoarseSpinner.js';
import PhetFont from '../../PhetFont.js';
export default function demoFineCoarseSpinner(layoutBounds, providedOptions) {
  const options = optionize()({
    tandem: Tandem.OPTIONAL
  }, providedOptions);
  const numberProperty = new NumberProperty(0, {
    range: new Range(0, 100),
    tandem: options.tandem.createTandem('numberProperty')
  });
  const enabledProperty = new BooleanProperty(true, {
    tandem: options.tandem.createTandem('enabledProperty')
  });
  const spinner = new FineCoarseSpinner(numberProperty, {
    enabledProperty: enabledProperty,
    tandem: options.tandem.createTandem('spinner')
  });
  const checkbox = new Checkbox(enabledProperty, new Text('enabled', {
    font: new PhetFont(20),
    tandem: options.tandem.createTandem('checkbox')
  }));
  return new VBox({
    spacing: 60,
    children: [spinner, checkbox],
    center: layoutBounds.center
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCb29sZWFuUHJvcGVydHkiLCJOdW1iZXJQcm9wZXJ0eSIsIkNoZWNrYm94IiwiUmFuZ2UiLCJvcHRpb25pemUiLCJUZXh0IiwiVkJveCIsIlRhbmRlbSIsIkZpbmVDb2Fyc2VTcGlubmVyIiwiUGhldEZvbnQiLCJkZW1vRmluZUNvYXJzZVNwaW5uZXIiLCJsYXlvdXRCb3VuZHMiLCJwcm92aWRlZE9wdGlvbnMiLCJvcHRpb25zIiwidGFuZGVtIiwiT1BUSU9OQUwiLCJudW1iZXJQcm9wZXJ0eSIsInJhbmdlIiwiY3JlYXRlVGFuZGVtIiwiZW5hYmxlZFByb3BlcnR5Iiwic3Bpbm5lciIsImNoZWNrYm94IiwiZm9udCIsInNwYWNpbmciLCJjaGlsZHJlbiIsImNlbnRlciJdLCJzb3VyY2VzIjpbImRlbW9GaW5lQ29hcnNlU3Bpbm5lci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogRGVtbyBmb3IgV2F2ZWxlbmd0aE51bWJlckNvbnRyb2xcclxuICovXHJcblxyXG5pbXBvcnQgQm9vbGVhblByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvQm9vbGVhblByb3BlcnR5LmpzJztcclxuaW1wb3J0IE51bWJlclByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvTnVtYmVyUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnLi4vLi4vLi4vLi4vc3VuL2pzL0NoZWNrYm94LmpzJztcclxuaW1wb3J0IEJvdW5kczIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL0JvdW5kczIuanMnO1xyXG5pbXBvcnQgUmFuZ2UgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1JhbmdlLmpzJztcclxuaW1wb3J0IG9wdGlvbml6ZSwgeyBFbXB0eVNlbGZPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL29wdGlvbml6ZS5qcyc7XHJcbmltcG9ydCB7IE5vZGUsIE5vZGVPcHRpb25zLCBUZXh0LCBWQm94IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi8uLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuaW1wb3J0IEZpbmVDb2Fyc2VTcGlubmVyIGZyb20gJy4uLy4uL0ZpbmVDb2Fyc2VTcGlubmVyLmpzJztcclxuaW1wb3J0IFBoZXRGb250IGZyb20gJy4uLy4uL1BoZXRGb250LmpzJztcclxuaW1wb3J0IHsgU3VuRGVtb09wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi8uLi9zdW4vanMvZGVtby9EZW1vc1NjcmVlblZpZXcuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVtb0ZpbmVDb2Fyc2VTcGlubmVyKCBsYXlvdXRCb3VuZHM6IEJvdW5kczIsIHByb3ZpZGVkT3B0aW9ucz86IFN1bkRlbW9PcHRpb25zICk6IE5vZGUge1xyXG5cclxuICBjb25zdCBvcHRpb25zID0gb3B0aW9uaXplPE5vZGVPcHRpb25zLCBFbXB0eVNlbGZPcHRpb25zLCBOb2RlT3B0aW9ucz4oKSgge1xyXG4gICAgdGFuZGVtOiBUYW5kZW0uT1BUSU9OQUxcclxuICB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgY29uc3QgbnVtYmVyUHJvcGVydHkgPSBuZXcgTnVtYmVyUHJvcGVydHkoIDAsIHtcclxuICAgIHJhbmdlOiBuZXcgUmFuZ2UoIDAsIDEwMCApLFxyXG4gICAgdGFuZGVtOiBvcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdudW1iZXJQcm9wZXJ0eScgKVxyXG4gIH0gKTtcclxuXHJcbiAgY29uc3QgZW5hYmxlZFByb3BlcnR5ID0gbmV3IEJvb2xlYW5Qcm9wZXJ0eSggdHJ1ZSwge1xyXG4gICAgdGFuZGVtOiBvcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdlbmFibGVkUHJvcGVydHknIClcclxuICB9ICk7XHJcblxyXG4gIGNvbnN0IHNwaW5uZXIgPSBuZXcgRmluZUNvYXJzZVNwaW5uZXIoIG51bWJlclByb3BlcnR5LCB7XHJcbiAgICBlbmFibGVkUHJvcGVydHk6IGVuYWJsZWRQcm9wZXJ0eSxcclxuICAgIHRhbmRlbTogb3B0aW9ucy50YW5kZW0uY3JlYXRlVGFuZGVtKCAnc3Bpbm5lcicgKVxyXG4gIH0gKTtcclxuXHJcbiAgY29uc3QgY2hlY2tib3ggPSBuZXcgQ2hlY2tib3goIGVuYWJsZWRQcm9wZXJ0eSwgbmV3IFRleHQoICdlbmFibGVkJywge1xyXG4gICAgZm9udDogbmV3IFBoZXRGb250KCAyMCApLFxyXG4gICAgdGFuZGVtOiBvcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdjaGVja2JveCcgKVxyXG4gIH0gKSApO1xyXG5cclxuICByZXR1cm4gbmV3IFZCb3goIHtcclxuICAgIHNwYWNpbmc6IDYwLFxyXG4gICAgY2hpbGRyZW46IFsgc3Bpbm5lciwgY2hlY2tib3ggXSxcclxuICAgIGNlbnRlcjogbGF5b3V0Qm91bmRzLmNlbnRlclxyXG4gIH0gKTtcclxufSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLE9BQU9BLGVBQWUsTUFBTSx3Q0FBd0M7QUFDcEUsT0FBT0MsY0FBYyxNQUFNLHVDQUF1QztBQUNsRSxPQUFPQyxRQUFRLE1BQU0sZ0NBQWdDO0FBRXJELE9BQU9DLEtBQUssTUFBTSw2QkFBNkI7QUFDL0MsT0FBT0MsU0FBUyxNQUE0Qix1Q0FBdUM7QUFDbkYsU0FBNEJDLElBQUksRUFBRUMsSUFBSSxRQUFRLG1DQUFtQztBQUNqRixPQUFPQyxNQUFNLE1BQU0saUNBQWlDO0FBQ3BELE9BQU9DLGlCQUFpQixNQUFNLDRCQUE0QjtBQUMxRCxPQUFPQyxRQUFRLE1BQU0sbUJBQW1CO0FBR3hDLGVBQWUsU0FBU0MscUJBQXFCQSxDQUFFQyxZQUFxQixFQUFFQyxlQUFnQyxFQUFTO0VBRTdHLE1BQU1DLE9BQU8sR0FBR1QsU0FBUyxDQUE2QyxDQUFDLENBQUU7SUFDdkVVLE1BQU0sRUFBRVAsTUFBTSxDQUFDUTtFQUNqQixDQUFDLEVBQUVILGVBQWdCLENBQUM7RUFFcEIsTUFBTUksY0FBYyxHQUFHLElBQUlmLGNBQWMsQ0FBRSxDQUFDLEVBQUU7SUFDNUNnQixLQUFLLEVBQUUsSUFBSWQsS0FBSyxDQUFFLENBQUMsRUFBRSxHQUFJLENBQUM7SUFDMUJXLE1BQU0sRUFBRUQsT0FBTyxDQUFDQyxNQUFNLENBQUNJLFlBQVksQ0FBRSxnQkFBaUI7RUFDeEQsQ0FBRSxDQUFDO0VBRUgsTUFBTUMsZUFBZSxHQUFHLElBQUluQixlQUFlLENBQUUsSUFBSSxFQUFFO0lBQ2pEYyxNQUFNLEVBQUVELE9BQU8sQ0FBQ0MsTUFBTSxDQUFDSSxZQUFZLENBQUUsaUJBQWtCO0VBQ3pELENBQUUsQ0FBQztFQUVILE1BQU1FLE9BQU8sR0FBRyxJQUFJWixpQkFBaUIsQ0FBRVEsY0FBYyxFQUFFO0lBQ3JERyxlQUFlLEVBQUVBLGVBQWU7SUFDaENMLE1BQU0sRUFBRUQsT0FBTyxDQUFDQyxNQUFNLENBQUNJLFlBQVksQ0FBRSxTQUFVO0VBQ2pELENBQUUsQ0FBQztFQUVILE1BQU1HLFFBQVEsR0FBRyxJQUFJbkIsUUFBUSxDQUFFaUIsZUFBZSxFQUFFLElBQUlkLElBQUksQ0FBRSxTQUFTLEVBQUU7SUFDbkVpQixJQUFJLEVBQUUsSUFBSWIsUUFBUSxDQUFFLEVBQUcsQ0FBQztJQUN4QkssTUFBTSxFQUFFRCxPQUFPLENBQUNDLE1BQU0sQ0FBQ0ksWUFBWSxDQUFFLFVBQVc7RUFDbEQsQ0FBRSxDQUFFLENBQUM7RUFFTCxPQUFPLElBQUlaLElBQUksQ0FBRTtJQUNmaUIsT0FBTyxFQUFFLEVBQUU7SUFDWEMsUUFBUSxFQUFFLENBQUVKLE9BQU8sRUFBRUMsUUFBUSxDQUFFO0lBQy9CSSxNQUFNLEVBQUVkLFlBQVksQ0FBQ2M7RUFDdkIsQ0FBRSxDQUFDO0FBQ0wifQ==