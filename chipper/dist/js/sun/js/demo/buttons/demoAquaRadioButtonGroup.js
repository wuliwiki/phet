// Copyright 2022-2023, University of Colorado Boulder

/**
 * Demo for AquaRadioButtonGroup
 */

import StringProperty from '../../../../axon/js/StringProperty.js';
import { Font, Text, VBox } from '../../../../scenery/js/imports.js';
import AquaRadioButtonGroup from '../../AquaRadioButtonGroup.js';
export default function demoAquaRadioButtonGroup(layoutBounds) {
  const font = new Font({
    size: 20
  });
  const horizontalChoices = ['left', 'center', 'right'];
  const horizontalProperty = new StringProperty(horizontalChoices[0]);
  const horizontalItems = _.map(horizontalChoices, choice => {
    return {
      createNode: () => new Text(choice, {
        font: font
      }),
      value: choice
    };
  });
  const horizontalGroup = new AquaRadioButtonGroup(horizontalProperty, horizontalItems, {
    orientation: 'horizontal',
    spacing: 20
  });
  const verticalChoices = ['top', 'center', 'bottom'];
  const verticalProperty = new StringProperty(verticalChoices[0]);
  const verticalItems = _.map(verticalChoices, choice => {
    return {
      createNode: () => new Text(choice, {
        font: font
      }),
      value: choice
    };
  });
  const verticalGroup = new AquaRadioButtonGroup(verticalProperty, verticalItems, {
    orientation: 'vertical'
  });
  return new VBox({
    children: [horizontalGroup, verticalGroup],
    spacing: 80,
    center: layoutBounds.center
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTdHJpbmdQcm9wZXJ0eSIsIkZvbnQiLCJUZXh0IiwiVkJveCIsIkFxdWFSYWRpb0J1dHRvbkdyb3VwIiwiZGVtb0FxdWFSYWRpb0J1dHRvbkdyb3VwIiwibGF5b3V0Qm91bmRzIiwiZm9udCIsInNpemUiLCJob3Jpem9udGFsQ2hvaWNlcyIsImhvcml6b250YWxQcm9wZXJ0eSIsImhvcml6b250YWxJdGVtcyIsIl8iLCJtYXAiLCJjaG9pY2UiLCJjcmVhdGVOb2RlIiwidmFsdWUiLCJob3Jpem9udGFsR3JvdXAiLCJvcmllbnRhdGlvbiIsInNwYWNpbmciLCJ2ZXJ0aWNhbENob2ljZXMiLCJ2ZXJ0aWNhbFByb3BlcnR5IiwidmVydGljYWxJdGVtcyIsInZlcnRpY2FsR3JvdXAiLCJjaGlsZHJlbiIsImNlbnRlciJdLCJzb3VyY2VzIjpbImRlbW9BcXVhUmFkaW9CdXR0b25Hcm91cC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMi0yMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBEZW1vIGZvciBBcXVhUmFkaW9CdXR0b25Hcm91cFxyXG4gKi9cclxuXHJcbmltcG9ydCBTdHJpbmdQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL1N0cmluZ1Byb3BlcnR5LmpzJztcclxuaW1wb3J0IEJvdW5kczIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL0JvdW5kczIuanMnO1xyXG5pbXBvcnQgeyBGb250LCBOb2RlLCBUZXh0LCBWQm94IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IEFxdWFSYWRpb0J1dHRvbkdyb3VwIGZyb20gJy4uLy4uL0FxdWFSYWRpb0J1dHRvbkdyb3VwLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlbW9BcXVhUmFkaW9CdXR0b25Hcm91cCggbGF5b3V0Qm91bmRzOiBCb3VuZHMyICk6IE5vZGUge1xyXG5cclxuICBjb25zdCBmb250ID0gbmV3IEZvbnQoIHsgc2l6ZTogMjAgfSApO1xyXG5cclxuICBjb25zdCBob3Jpem9udGFsQ2hvaWNlcyA9IFsgJ2xlZnQnLCAnY2VudGVyJywgJ3JpZ2h0JyBdO1xyXG4gIGNvbnN0IGhvcml6b250YWxQcm9wZXJ0eSA9IG5ldyBTdHJpbmdQcm9wZXJ0eSggaG9yaXpvbnRhbENob2ljZXNbIDAgXSApO1xyXG4gIGNvbnN0IGhvcml6b250YWxJdGVtcyA9IF8ubWFwKCBob3Jpem9udGFsQ2hvaWNlcyxcclxuICAgIGNob2ljZSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlTm9kZTogKCkgPT4gbmV3IFRleHQoIGNob2ljZSwgeyBmb250OiBmb250IH0gKSxcclxuICAgICAgICB2YWx1ZTogY2hvaWNlXHJcbiAgICAgIH07XHJcbiAgICB9ICk7XHJcbiAgY29uc3QgaG9yaXpvbnRhbEdyb3VwID0gbmV3IEFxdWFSYWRpb0J1dHRvbkdyb3VwKCBob3Jpem9udGFsUHJvcGVydHksIGhvcml6b250YWxJdGVtcywge1xyXG4gICAgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcclxuICAgIHNwYWNpbmc6IDIwXHJcbiAgfSApO1xyXG5cclxuICBjb25zdCB2ZXJ0aWNhbENob2ljZXMgPSBbICd0b3AnLCAnY2VudGVyJywgJ2JvdHRvbScgXTtcclxuICBjb25zdCB2ZXJ0aWNhbFByb3BlcnR5ID0gbmV3IFN0cmluZ1Byb3BlcnR5KCB2ZXJ0aWNhbENob2ljZXNbIDAgXSApO1xyXG4gIGNvbnN0IHZlcnRpY2FsSXRlbXMgPSBfLm1hcCggdmVydGljYWxDaG9pY2VzLFxyXG4gICAgY2hvaWNlID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGVOb2RlOiAoKSA9PiBuZXcgVGV4dCggY2hvaWNlLCB7IGZvbnQ6IGZvbnQgfSApLFxyXG4gICAgICAgIHZhbHVlOiBjaG9pY2VcclxuICAgICAgfTtcclxuICAgIH0gKTtcclxuICBjb25zdCB2ZXJ0aWNhbEdyb3VwID0gbmV3IEFxdWFSYWRpb0J1dHRvbkdyb3VwKCB2ZXJ0aWNhbFByb3BlcnR5LCB2ZXJ0aWNhbEl0ZW1zLCB7XHJcbiAgICBvcmllbnRhdGlvbjogJ3ZlcnRpY2FsJ1xyXG4gIH0gKTtcclxuXHJcbiAgcmV0dXJuIG5ldyBWQm94KCB7XHJcbiAgICBjaGlsZHJlbjogWyBob3Jpem9udGFsR3JvdXAsIHZlcnRpY2FsR3JvdXAgXSxcclxuICAgIHNwYWNpbmc6IDgwLFxyXG4gICAgY2VudGVyOiBsYXlvdXRCb3VuZHMuY2VudGVyXHJcbiAgfSApO1xyXG59Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsY0FBYyxNQUFNLHVDQUF1QztBQUVsRSxTQUFTQyxJQUFJLEVBQVFDLElBQUksRUFBRUMsSUFBSSxRQUFRLG1DQUFtQztBQUMxRSxPQUFPQyxvQkFBb0IsTUFBTSwrQkFBK0I7QUFFaEUsZUFBZSxTQUFTQyx3QkFBd0JBLENBQUVDLFlBQXFCLEVBQVM7RUFFOUUsTUFBTUMsSUFBSSxHQUFHLElBQUlOLElBQUksQ0FBRTtJQUFFTyxJQUFJLEVBQUU7RUFBRyxDQUFFLENBQUM7RUFFckMsTUFBTUMsaUJBQWlCLEdBQUcsQ0FBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBRTtFQUN2RCxNQUFNQyxrQkFBa0IsR0FBRyxJQUFJVixjQUFjLENBQUVTLGlCQUFpQixDQUFFLENBQUMsQ0FBRyxDQUFDO0VBQ3ZFLE1BQU1FLGVBQWUsR0FBR0MsQ0FBQyxDQUFDQyxHQUFHLENBQUVKLGlCQUFpQixFQUM5Q0ssTUFBTSxJQUFJO0lBQ1IsT0FBTztNQUNMQyxVQUFVLEVBQUVBLENBQUEsS0FBTSxJQUFJYixJQUFJLENBQUVZLE1BQU0sRUFBRTtRQUFFUCxJQUFJLEVBQUVBO01BQUssQ0FBRSxDQUFDO01BQ3BEUyxLQUFLLEVBQUVGO0lBQ1QsQ0FBQztFQUNILENBQUUsQ0FBQztFQUNMLE1BQU1HLGVBQWUsR0FBRyxJQUFJYixvQkFBb0IsQ0FBRU0sa0JBQWtCLEVBQUVDLGVBQWUsRUFBRTtJQUNyRk8sV0FBVyxFQUFFLFlBQVk7SUFDekJDLE9BQU8sRUFBRTtFQUNYLENBQUUsQ0FBQztFQUVILE1BQU1DLGVBQWUsR0FBRyxDQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFFO0VBQ3JELE1BQU1DLGdCQUFnQixHQUFHLElBQUlyQixjQUFjLENBQUVvQixlQUFlLENBQUUsQ0FBQyxDQUFHLENBQUM7RUFDbkUsTUFBTUUsYUFBYSxHQUFHVixDQUFDLENBQUNDLEdBQUcsQ0FBRU8sZUFBZSxFQUMxQ04sTUFBTSxJQUFJO0lBQ1IsT0FBTztNQUNMQyxVQUFVLEVBQUVBLENBQUEsS0FBTSxJQUFJYixJQUFJLENBQUVZLE1BQU0sRUFBRTtRQUFFUCxJQUFJLEVBQUVBO01BQUssQ0FBRSxDQUFDO01BQ3BEUyxLQUFLLEVBQUVGO0lBQ1QsQ0FBQztFQUNILENBQUUsQ0FBQztFQUNMLE1BQU1TLGFBQWEsR0FBRyxJQUFJbkIsb0JBQW9CLENBQUVpQixnQkFBZ0IsRUFBRUMsYUFBYSxFQUFFO0lBQy9FSixXQUFXLEVBQUU7RUFDZixDQUFFLENBQUM7RUFFSCxPQUFPLElBQUlmLElBQUksQ0FBRTtJQUNmcUIsUUFBUSxFQUFFLENBQUVQLGVBQWUsRUFBRU0sYUFBYSxDQUFFO0lBQzVDSixPQUFPLEVBQUUsRUFBRTtJQUNYTSxNQUFNLEVBQUVuQixZQUFZLENBQUNtQjtFQUN2QixDQUFFLENBQUM7QUFDTCJ9