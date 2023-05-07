// Copyright 2022-2023, University of Colorado Boulder

/**
 * Supports any combination of checkboxes for each of the screens for the bottom objects.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import centerAndVariability from '../../centerAndVariability.js';
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import { GridBox, Node, Text } from '../../../../scenery/js/imports.js';
import CAVConstants from '../CAVConstants.js';
import CenterAndVariabilityStrings from '../../CenterAndVariabilityStrings.js';
import CAVColors from '../CAVColors.js';
import NumberLineNode from './NumberLineNode.js';
import PredictionThumbNode from './PredictionThumbNode.js';
// constants
const TEXT_OPTIONS = {
  font: CAVConstants.MAIN_FONT,
  maxWidth: CAVConstants.CHECKBOX_TEXT_MAX_WIDTH
};
export default class BottomRepresentationCheckboxGroup extends VerticalCheckboxGroup {
  static createGridBox(text, icon, iconGroup) {
    return new GridBox({
      stretch: true,
      spacing: 5,
      grow: 1,
      rows: [[new Node({
        children: [text],
        layoutOptions: {
          xAlign: 'left'
        }
      }), iconGroup.createBox(icon, {
        layoutOptions: {
          xAlign: 'right'
        },
        xAlign: 'center'
      })]]
    });
  }
  static getVariabilityCheckboxItem(alignGroup, model) {
    return {
      createNode: tandem => {
        return BottomRepresentationCheckboxGroup.createGridBox(new Text(CenterAndVariabilityStrings.variabilityStringProperty, TEXT_OPTIONS), NumberLineNode.createMeanIndicatorNode(true, true), alignGroup);
      },
      property: model.isShowingPlayAreaVariabilityProperty,
      tandemName: 'variabilityCheckbox'
    };
  }
  static getMedianCheckboxItem(alignGroup, model) {
    return {
      createNode: tandem => {
        return BottomRepresentationCheckboxGroup.createGridBox(new Text(CenterAndVariabilityStrings.medianStringProperty, TEXT_OPTIONS), new ArrowNode(0, 0, 0, 27, {
          fill: CAVColors.medianColorProperty,
          stroke: CAVColors.arrowStrokeProperty,
          lineWidth: CAVConstants.ARROW_LINE_WIDTH,
          headHeight: 12,
          headWidth: 18,
          maxHeight: 20
        }), alignGroup);
      },
      property: model.isShowingPlayAreaMedianProperty,
      tandemName: 'medianCheckbox'
    };
  }
  static getMeanCheckboxItem(alignGroup, model) {
    return {
      createNode: tandem => BottomRepresentationCheckboxGroup.createGridBox(new Text(CenterAndVariabilityStrings.meanStringProperty, TEXT_OPTIONS), NumberLineNode.createMeanIndicatorNode(true, true), alignGroup),
      property: model.isShowingPlayAreaMeanProperty,
      tandemName: 'meanCheckbox'
    };
  }
  static createPredictionItem(property, stringProperty, color, spacing, tandemName, alignGroup) {
    return {
      createNode: tandem => {
        return BottomRepresentationCheckboxGroup.createGridBox(new Text(stringProperty, TEXT_OPTIONS), new PredictionThumbNode({
          color: color,
          maxHeight: 20,
          pickable: false
        }), alignGroup);
      },
      property: property,
      tandemName: tandemName
    };
  }
  static getPredictMedianCheckboxItem(alignGroup, model) {
    return BottomRepresentationCheckboxGroup.createPredictionItem(model.isShowingMedianPredictionProperty, CenterAndVariabilityStrings.predictMedianStringProperty, CAVColors.medianColorProperty, 8, 'predictMedianCheckbox', alignGroup);
  }
  static getPredictMeanCheckboxItem(alignGroup, model) {
    return BottomRepresentationCheckboxGroup.createPredictionItem(model.isShowingMeanPredictionProperty, CenterAndVariabilityStrings.predictMeanStringProperty, CAVColors.meanColorProperty, 20.3, 'predictMeanCheckbox', alignGroup);
  }
}
centerAndVariability.register('BottomRepresentationCheckboxGroup', BottomRepresentationCheckboxGroup);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBcnJvd05vZGUiLCJjZW50ZXJBbmRWYXJpYWJpbGl0eSIsIlZlcnRpY2FsQ2hlY2tib3hHcm91cCIsIkdyaWRCb3giLCJOb2RlIiwiVGV4dCIsIkNBVkNvbnN0YW50cyIsIkNlbnRlckFuZFZhcmlhYmlsaXR5U3RyaW5ncyIsIkNBVkNvbG9ycyIsIk51bWJlckxpbmVOb2RlIiwiUHJlZGljdGlvblRodW1iTm9kZSIsIlRFWFRfT1BUSU9OUyIsImZvbnQiLCJNQUlOX0ZPTlQiLCJtYXhXaWR0aCIsIkNIRUNLQk9YX1RFWFRfTUFYX1dJRFRIIiwiQm90dG9tUmVwcmVzZW50YXRpb25DaGVja2JveEdyb3VwIiwiY3JlYXRlR3JpZEJveCIsInRleHQiLCJpY29uIiwiaWNvbkdyb3VwIiwic3RyZXRjaCIsInNwYWNpbmciLCJncm93Iiwicm93cyIsImNoaWxkcmVuIiwibGF5b3V0T3B0aW9ucyIsInhBbGlnbiIsImNyZWF0ZUJveCIsImdldFZhcmlhYmlsaXR5Q2hlY2tib3hJdGVtIiwiYWxpZ25Hcm91cCIsIm1vZGVsIiwiY3JlYXRlTm9kZSIsInRhbmRlbSIsInZhcmlhYmlsaXR5U3RyaW5nUHJvcGVydHkiLCJjcmVhdGVNZWFuSW5kaWNhdG9yTm9kZSIsInByb3BlcnR5IiwiaXNTaG93aW5nUGxheUFyZWFWYXJpYWJpbGl0eVByb3BlcnR5IiwidGFuZGVtTmFtZSIsImdldE1lZGlhbkNoZWNrYm94SXRlbSIsIm1lZGlhblN0cmluZ1Byb3BlcnR5IiwiZmlsbCIsIm1lZGlhbkNvbG9yUHJvcGVydHkiLCJzdHJva2UiLCJhcnJvd1N0cm9rZVByb3BlcnR5IiwibGluZVdpZHRoIiwiQVJST1dfTElORV9XSURUSCIsImhlYWRIZWlnaHQiLCJoZWFkV2lkdGgiLCJtYXhIZWlnaHQiLCJpc1Nob3dpbmdQbGF5QXJlYU1lZGlhblByb3BlcnR5IiwiZ2V0TWVhbkNoZWNrYm94SXRlbSIsIm1lYW5TdHJpbmdQcm9wZXJ0eSIsImlzU2hvd2luZ1BsYXlBcmVhTWVhblByb3BlcnR5IiwiY3JlYXRlUHJlZGljdGlvbkl0ZW0iLCJzdHJpbmdQcm9wZXJ0eSIsImNvbG9yIiwicGlja2FibGUiLCJnZXRQcmVkaWN0TWVkaWFuQ2hlY2tib3hJdGVtIiwiaXNTaG93aW5nTWVkaWFuUHJlZGljdGlvblByb3BlcnR5IiwicHJlZGljdE1lZGlhblN0cmluZ1Byb3BlcnR5IiwiZ2V0UHJlZGljdE1lYW5DaGVja2JveEl0ZW0iLCJpc1Nob3dpbmdNZWFuUHJlZGljdGlvblByb3BlcnR5IiwicHJlZGljdE1lYW5TdHJpbmdQcm9wZXJ0eSIsIm1lYW5Db2xvclByb3BlcnR5IiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJCb3R0b21SZXByZXNlbnRhdGlvbkNoZWNrYm94R3JvdXAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjItMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogU3VwcG9ydHMgYW55IGNvbWJpbmF0aW9uIG9mIGNoZWNrYm94ZXMgZm9yIGVhY2ggb2YgdGhlIHNjcmVlbnMgZm9yIHRoZSBib3R0b20gb2JqZWN0cy5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBLbHVzZW5kb3JmIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKiBAYXV0aG9yIFNhbSBSZWlkIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL1Byb3BlcnR5LmpzJztcclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi8uLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuaW1wb3J0IEFycm93Tm9kZSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMvQXJyb3dOb2RlLmpzJztcclxuaW1wb3J0IGNlbnRlckFuZFZhcmlhYmlsaXR5IGZyb20gJy4uLy4uL2NlbnRlckFuZFZhcmlhYmlsaXR5LmpzJztcclxuaW1wb3J0IFZlcnRpY2FsQ2hlY2tib3hHcm91cCwgeyBWZXJ0aWNhbENoZWNrYm94R3JvdXBJdGVtIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3VuL2pzL1ZlcnRpY2FsQ2hlY2tib3hHcm91cC5qcyc7XHJcbmltcG9ydCB7IEFsaWduR3JvdXAsIEdyaWRCb3gsIE5vZGUsIFRDb2xvciwgVGV4dCB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBDQVZDb25zdGFudHMgZnJvbSAnLi4vQ0FWQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IENlbnRlckFuZFZhcmlhYmlsaXR5U3RyaW5ncyBmcm9tICcuLi8uLi9DZW50ZXJBbmRWYXJpYWJpbGl0eVN0cmluZ3MuanMnO1xyXG5pbXBvcnQgQ0FWQ29sb3JzIGZyb20gJy4uL0NBVkNvbG9ycy5qcyc7XHJcbmltcG9ydCBOdW1iZXJMaW5lTm9kZSBmcm9tICcuL051bWJlckxpbmVOb2RlLmpzJztcclxuaW1wb3J0IFByZWRpY3Rpb25UaHVtYk5vZGUgZnJvbSAnLi9QcmVkaWN0aW9uVGh1bWJOb2RlLmpzJztcclxuaW1wb3J0IExpbmthYmxlUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9MaW5rYWJsZVByb3BlcnR5LmpzJztcclxuaW1wb3J0IFZhcmlhYmlsaXR5TW9kZWwgZnJvbSAnLi4vLi4vdmFyaWFiaWxpdHkvbW9kZWwvVmFyaWFiaWxpdHlNb2RlbC5qcyc7XHJcbmltcG9ydCBDQVZNb2RlbCBmcm9tICcuLi9tb2RlbC9DQVZNb2RlbC5qcyc7XHJcbmltcG9ydCBNZWFuQW5kTWVkaWFuTW9kZWwgZnJvbSAnLi4vLi4vbWVhbi1hbmQtbWVkaWFuL21vZGVsL01lYW5BbmRNZWRpYW5Nb2RlbC5qcyc7XHJcblxyXG4vLyBjb25zdGFudHNcclxuY29uc3QgVEVYVF9PUFRJT05TID0ge1xyXG4gIGZvbnQ6IENBVkNvbnN0YW50cy5NQUlOX0ZPTlQsXHJcbiAgbWF4V2lkdGg6IENBVkNvbnN0YW50cy5DSEVDS0JPWF9URVhUX01BWF9XSURUSFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm90dG9tUmVwcmVzZW50YXRpb25DaGVja2JveEdyb3VwIGV4dGVuZHMgVmVydGljYWxDaGVja2JveEdyb3VwIHtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlR3JpZEJveCggdGV4dDogTm9kZSwgaWNvbjogTm9kZSwgaWNvbkdyb3VwOiBBbGlnbkdyb3VwICk6IEdyaWRCb3gge1xyXG4gICAgcmV0dXJuIG5ldyBHcmlkQm94KCB7XHJcbiAgICAgIHN0cmV0Y2g6IHRydWUsXHJcbiAgICAgIHNwYWNpbmc6IDUsXHJcbiAgICAgIGdyb3c6IDEsXHJcbiAgICAgIHJvd3M6IFsgW1xyXG4gICAgICAgIG5ldyBOb2RlKCB7IGNoaWxkcmVuOiBbIHRleHQgXSwgbGF5b3V0T3B0aW9uczogeyB4QWxpZ246ICdsZWZ0JyB9IH0gKSxcclxuICAgICAgICBpY29uR3JvdXAuY3JlYXRlQm94KCBpY29uLCB7IGxheW91dE9wdGlvbnM6IHsgeEFsaWduOiAncmlnaHQnIH0sIHhBbGlnbjogJ2NlbnRlcicgfSApXHJcbiAgICAgIF0gXVxyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXRWYXJpYWJpbGl0eUNoZWNrYm94SXRlbSggYWxpZ25Hcm91cDogQWxpZ25Hcm91cCwgbW9kZWw6IFZhcmlhYmlsaXR5TW9kZWwgKTogVmVydGljYWxDaGVja2JveEdyb3VwSXRlbSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjcmVhdGVOb2RlOiAoIHRhbmRlbTogVGFuZGVtICkgPT4ge1xyXG4gICAgICAgIHJldHVybiBCb3R0b21SZXByZXNlbnRhdGlvbkNoZWNrYm94R3JvdXAuY3JlYXRlR3JpZEJveChcclxuICAgICAgICAgIG5ldyBUZXh0KCBDZW50ZXJBbmRWYXJpYWJpbGl0eVN0cmluZ3MudmFyaWFiaWxpdHlTdHJpbmdQcm9wZXJ0eSwgVEVYVF9PUFRJT05TICksXHJcbiAgICAgICAgICBOdW1iZXJMaW5lTm9kZS5jcmVhdGVNZWFuSW5kaWNhdG9yTm9kZSggdHJ1ZSwgdHJ1ZSApLFxyXG4gICAgICAgICAgYWxpZ25Hcm91cFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHByb3BlcnR5OiBtb2RlbC5pc1Nob3dpbmdQbGF5QXJlYVZhcmlhYmlsaXR5UHJvcGVydHksXHJcbiAgICAgIHRhbmRlbU5hbWU6ICd2YXJpYWJpbGl0eUNoZWNrYm94J1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWVkaWFuQ2hlY2tib3hJdGVtKCBhbGlnbkdyb3VwOiBBbGlnbkdyb3VwLCBtb2RlbDogQ0FWTW9kZWwgKTogVmVydGljYWxDaGVja2JveEdyb3VwSXRlbSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjcmVhdGVOb2RlOiAoIHRhbmRlbTogVGFuZGVtICkgPT4ge1xyXG4gICAgICAgIHJldHVybiBCb3R0b21SZXByZXNlbnRhdGlvbkNoZWNrYm94R3JvdXAuY3JlYXRlR3JpZEJveChcclxuICAgICAgICAgIG5ldyBUZXh0KCBDZW50ZXJBbmRWYXJpYWJpbGl0eVN0cmluZ3MubWVkaWFuU3RyaW5nUHJvcGVydHksIFRFWFRfT1BUSU9OUyApLFxyXG4gICAgICAgICAgbmV3IEFycm93Tm9kZSggMCwgMCwgMCwgMjcsIHtcclxuICAgICAgICAgICAgZmlsbDogQ0FWQ29sb3JzLm1lZGlhbkNvbG9yUHJvcGVydHksXHJcbiAgICAgICAgICAgIHN0cm9rZTogQ0FWQ29sb3JzLmFycm93U3Ryb2tlUHJvcGVydHksXHJcbiAgICAgICAgICAgIGxpbmVXaWR0aDogQ0FWQ29uc3RhbnRzLkFSUk9XX0xJTkVfV0lEVEgsXHJcbiAgICAgICAgICAgIGhlYWRIZWlnaHQ6IDEyLFxyXG4gICAgICAgICAgICBoZWFkV2lkdGg6IDE4LFxyXG4gICAgICAgICAgICBtYXhIZWlnaHQ6IDIwXHJcbiAgICAgICAgICB9ICksIGFsaWduR3JvdXAgKTtcclxuICAgICAgfSxcclxuICAgICAgcHJvcGVydHk6IG1vZGVsLmlzU2hvd2luZ1BsYXlBcmVhTWVkaWFuUHJvcGVydHksXHJcbiAgICAgIHRhbmRlbU5hbWU6ICdtZWRpYW5DaGVja2JveCdcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldE1lYW5DaGVja2JveEl0ZW0oIGFsaWduR3JvdXA6IEFsaWduR3JvdXAsIG1vZGVsOiBDQVZNb2RlbCApOiBWZXJ0aWNhbENoZWNrYm94R3JvdXBJdGVtIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNyZWF0ZU5vZGU6ICggdGFuZGVtOiBUYW5kZW0gKSA9PiBCb3R0b21SZXByZXNlbnRhdGlvbkNoZWNrYm94R3JvdXAuY3JlYXRlR3JpZEJveCggbmV3IFRleHQoIENlbnRlckFuZFZhcmlhYmlsaXR5U3RyaW5ncy5tZWFuU3RyaW5nUHJvcGVydHksIFRFWFRfT1BUSU9OUyApLFxyXG4gICAgICAgIE51bWJlckxpbmVOb2RlLmNyZWF0ZU1lYW5JbmRpY2F0b3JOb2RlKCB0cnVlLCB0cnVlICksIGFsaWduR3JvdXAgKSxcclxuICAgICAgcHJvcGVydHk6IG1vZGVsLmlzU2hvd2luZ1BsYXlBcmVhTWVhblByb3BlcnR5LFxyXG4gICAgICB0YW5kZW1OYW1lOiAnbWVhbkNoZWNrYm94J1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGNyZWF0ZVByZWRpY3Rpb25JdGVtKCBwcm9wZXJ0eTogUHJvcGVydHk8Ym9vbGVhbj4sIHN0cmluZ1Byb3BlcnR5OiBMaW5rYWJsZVByb3BlcnR5PHN0cmluZz4sIGNvbG9yOiBUQ29sb3IsIHNwYWNpbmc6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFuZGVtTmFtZTogc3RyaW5nLCBhbGlnbkdyb3VwOiBBbGlnbkdyb3VwICk6IFZlcnRpY2FsQ2hlY2tib3hHcm91cEl0ZW0ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY3JlYXRlTm9kZTogKCB0YW5kZW06IFRhbmRlbSApID0+IHtcclxuICAgICAgICByZXR1cm4gQm90dG9tUmVwcmVzZW50YXRpb25DaGVja2JveEdyb3VwLmNyZWF0ZUdyaWRCb3goXHJcbiAgICAgICAgICBuZXcgVGV4dCggc3RyaW5nUHJvcGVydHksIFRFWFRfT1BUSU9OUyApLFxyXG4gICAgICAgICAgbmV3IFByZWRpY3Rpb25UaHVtYk5vZGUoIHsgY29sb3I6IGNvbG9yLCBtYXhIZWlnaHQ6IDIwLCBwaWNrYWJsZTogZmFsc2UgfSApLFxyXG4gICAgICAgICAgYWxpZ25Hcm91cCApO1xyXG4gICAgICB9LFxyXG4gICAgICBwcm9wZXJ0eTogcHJvcGVydHksXHJcbiAgICAgIHRhbmRlbU5hbWU6IHRhbmRlbU5hbWVcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldFByZWRpY3RNZWRpYW5DaGVja2JveEl0ZW0oIGFsaWduR3JvdXA6IEFsaWduR3JvdXAsIG1vZGVsOiBDQVZNb2RlbCApOiBWZXJ0aWNhbENoZWNrYm94R3JvdXBJdGVtIHtcclxuICAgIHJldHVybiBCb3R0b21SZXByZXNlbnRhdGlvbkNoZWNrYm94R3JvdXAuY3JlYXRlUHJlZGljdGlvbkl0ZW0oXHJcbiAgICAgIG1vZGVsLmlzU2hvd2luZ01lZGlhblByZWRpY3Rpb25Qcm9wZXJ0eSxcclxuICAgICAgQ2VudGVyQW5kVmFyaWFiaWxpdHlTdHJpbmdzLnByZWRpY3RNZWRpYW5TdHJpbmdQcm9wZXJ0eSxcclxuICAgICAgQ0FWQ29sb3JzLm1lZGlhbkNvbG9yUHJvcGVydHksXHJcbiAgICAgIDgsXHJcbiAgICAgICdwcmVkaWN0TWVkaWFuQ2hlY2tib3gnLFxyXG4gICAgICBhbGlnbkdyb3VwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXRQcmVkaWN0TWVhbkNoZWNrYm94SXRlbSggYWxpZ25Hcm91cDogQWxpZ25Hcm91cCwgbW9kZWw6IE1lYW5BbmRNZWRpYW5Nb2RlbCApOiBWZXJ0aWNhbENoZWNrYm94R3JvdXBJdGVtIHtcclxuICAgIHJldHVybiBCb3R0b21SZXByZXNlbnRhdGlvbkNoZWNrYm94R3JvdXAuY3JlYXRlUHJlZGljdGlvbkl0ZW0oXHJcbiAgICAgIG1vZGVsLmlzU2hvd2luZ01lYW5QcmVkaWN0aW9uUHJvcGVydHksXHJcbiAgICAgIENlbnRlckFuZFZhcmlhYmlsaXR5U3RyaW5ncy5wcmVkaWN0TWVhblN0cmluZ1Byb3BlcnR5LFxyXG4gICAgICBDQVZDb2xvcnMubWVhbkNvbG9yUHJvcGVydHksXHJcbiAgICAgIDIwLjMsXHJcbiAgICAgICdwcmVkaWN0TWVhbkNoZWNrYm94JyxcclxuICAgICAgYWxpZ25Hcm91cFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmNlbnRlckFuZFZhcmlhYmlsaXR5LnJlZ2lzdGVyKCAnQm90dG9tUmVwcmVzZW50YXRpb25DaGVja2JveEdyb3VwJywgQm90dG9tUmVwcmVzZW50YXRpb25DaGVja2JveEdyb3VwICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUEsT0FBT0EsU0FBUyxNQUFNLDBDQUEwQztBQUNoRSxPQUFPQyxvQkFBb0IsTUFBTSwrQkFBK0I7QUFDaEUsT0FBT0MscUJBQXFCLE1BQXFDLDZDQUE2QztBQUM5RyxTQUFxQkMsT0FBTyxFQUFFQyxJQUFJLEVBQVVDLElBQUksUUFBUSxtQ0FBbUM7QUFDM0YsT0FBT0MsWUFBWSxNQUFNLG9CQUFvQjtBQUM3QyxPQUFPQywyQkFBMkIsTUFBTSxzQ0FBc0M7QUFDOUUsT0FBT0MsU0FBUyxNQUFNLGlCQUFpQjtBQUN2QyxPQUFPQyxjQUFjLE1BQU0scUJBQXFCO0FBQ2hELE9BQU9DLG1CQUFtQixNQUFNLDBCQUEwQjtBQU0xRDtBQUNBLE1BQU1DLFlBQVksR0FBRztFQUNuQkMsSUFBSSxFQUFFTixZQUFZLENBQUNPLFNBQVM7RUFDNUJDLFFBQVEsRUFBRVIsWUFBWSxDQUFDUztBQUN6QixDQUFDO0FBRUQs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