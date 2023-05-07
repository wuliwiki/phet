// Copyright 2022-2023, University of Colorado Boulder

/**
 * GraphSetRadioButtonGroup is a group of buttons for controlling the visibility of a set of graph nodes
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import { LabelColorIcon } from './LabelColorIcon.js';
export default class GraphSetRadioButtonGroup extends RectangularRadioButtonGroup {
  constructor(graphSetProperty, graphSetRadioButtonGroupItems, tandem) {
    super(graphSetProperty, graphSetRadioButtonGroupItems, {
      spacing: 5,
      radioButtonOptions: {
        baseColor: CalculusGrapherColors.panelFillProperty,
        xMargin: 10,
        yMargin: 10,
        phetioVisiblePropertyInstrumented: false
      },
      tandem: tandem
    });
  }

  /**
   * Creates an item for this radio button group.
   */
  static createItem(graphSet, graphType, labelAlignGroup) {
    assert && assert(graphSet.includes(graphType));
    return {
      createNode: () => new LabelColorIcon(new GraphTypeLabelNode(graphType), labelAlignGroup, graphType.strokeProperty),
      value: graphSet,
      tandemName: `${graphType.tandemNamePrefix}${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
    };
  }
}
calculusGrapher.register('GraphSetRadioButtonGroup', GraphSetRadioButtonGroup);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSZWN0YW5ndWxhclJhZGlvQnV0dG9uR3JvdXAiLCJjYWxjdWx1c0dyYXBoZXIiLCJDYWxjdWx1c0dyYXBoZXJDb2xvcnMiLCJSZWN0YW5ndWxhclJhZGlvQnV0dG9uIiwiR3JhcGhUeXBlTGFiZWxOb2RlIiwiTGFiZWxDb2xvckljb24iLCJHcmFwaFNldFJhZGlvQnV0dG9uR3JvdXAiLCJjb25zdHJ1Y3RvciIsImdyYXBoU2V0UHJvcGVydHkiLCJncmFwaFNldFJhZGlvQnV0dG9uR3JvdXBJdGVtcyIsInRhbmRlbSIsInNwYWNpbmciLCJyYWRpb0J1dHRvbk9wdGlvbnMiLCJiYXNlQ29sb3IiLCJwYW5lbEZpbGxQcm9wZXJ0eSIsInhNYXJnaW4iLCJ5TWFyZ2luIiwicGhldGlvVmlzaWJsZVByb3BlcnR5SW5zdHJ1bWVudGVkIiwiY3JlYXRlSXRlbSIsImdyYXBoU2V0IiwiZ3JhcGhUeXBlIiwibGFiZWxBbGlnbkdyb3VwIiwiYXNzZXJ0IiwiaW5jbHVkZXMiLCJjcmVhdGVOb2RlIiwic3Ryb2tlUHJvcGVydHkiLCJ2YWx1ZSIsInRhbmRlbU5hbWUiLCJ0YW5kZW1OYW1lUHJlZml4IiwiVEFOREVNX05BTUVfU1VGRklYIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJHcmFwaFNldFJhZGlvQnV0dG9uR3JvdXAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjItMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogR3JhcGhTZXRSYWRpb0J1dHRvbkdyb3VwIGlzIGEgZ3JvdXAgb2YgYnV0dG9ucyBmb3IgY29udHJvbGxpbmcgdGhlIHZpc2liaWxpdHkgb2YgYSBzZXQgb2YgZ3JhcGggbm9kZXNcclxuICpcclxuICogQGF1dGhvciBNYXJ0aW4gVmVpbGxldHRlXHJcbiAqIEBhdXRob3IgQ2hyaXMgTWFsbGV5IChQaXhlbFpvb20sIEluYy4pXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlY3Rhbmd1bGFyUmFkaW9CdXR0b25Hcm91cCwgeyBSZWN0YW5ndWxhclJhZGlvQnV0dG9uR3JvdXBJdGVtIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3VuL2pzL2J1dHRvbnMvUmVjdGFuZ3VsYXJSYWRpb0J1dHRvbkdyb3VwLmpzJztcclxuaW1wb3J0IGNhbGN1bHVzR3JhcGhlciBmcm9tICcuLi8uLi9jYWxjdWx1c0dyYXBoZXIuanMnO1xyXG5pbXBvcnQgUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9Qcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBHcmFwaFR5cGUgZnJvbSAnLi4vbW9kZWwvR3JhcGhUeXBlLmpzJztcclxuaW1wb3J0IENhbGN1bHVzR3JhcGhlckNvbG9ycyBmcm9tICcuLi9DYWxjdWx1c0dyYXBoZXJDb2xvcnMuanMnO1xyXG5pbXBvcnQgUmVjdGFuZ3VsYXJSYWRpb0J1dHRvbiBmcm9tICcuLi8uLi8uLi8uLi9zdW4vanMvYnV0dG9ucy9SZWN0YW5ndWxhclJhZGlvQnV0dG9uLmpzJztcclxuaW1wb3J0IHsgQWxpZ25Hcm91cCB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBHcmFwaFR5cGVMYWJlbE5vZGUgZnJvbSAnLi9HcmFwaFR5cGVMYWJlbE5vZGUuanMnO1xyXG5pbXBvcnQgeyBMYWJlbENvbG9ySWNvbiB9IGZyb20gJy4vTGFiZWxDb2xvckljb24uanMnO1xyXG5pbXBvcnQgVGFuZGVtIGZyb20gJy4uLy4uLy4uLy4uL3RhbmRlbS9qcy9UYW5kZW0uanMnO1xyXG5pbXBvcnQgR3JhcGhTZXQgZnJvbSAnLi4vbW9kZWwvR3JhcGhTZXQuanMnO1xyXG5cclxuZXhwb3J0IHR5cGUgR3JhcGhTZXRSYWRpb0J1dHRvbkdyb3VwSXRlbSA9IFJlY3Rhbmd1bGFyUmFkaW9CdXR0b25Hcm91cEl0ZW08R3JhcGhTZXQ+O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhTZXRSYWRpb0J1dHRvbkdyb3VwIGV4dGVuZHMgUmVjdGFuZ3VsYXJSYWRpb0J1dHRvbkdyb3VwPEdyYXBoU2V0PiB7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZ3JhcGhTZXRQcm9wZXJ0eTogUHJvcGVydHk8R3JhcGhTZXQ+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgZ3JhcGhTZXRSYWRpb0J1dHRvbkdyb3VwSXRlbXM6IEdyYXBoU2V0UmFkaW9CdXR0b25Hcm91cEl0ZW1bXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRhbmRlbTogVGFuZGVtICkge1xyXG5cclxuICAgIHN1cGVyKCBncmFwaFNldFByb3BlcnR5LCBncmFwaFNldFJhZGlvQnV0dG9uR3JvdXBJdGVtcywge1xyXG4gICAgICBzcGFjaW5nOiA1LFxyXG4gICAgICByYWRpb0J1dHRvbk9wdGlvbnM6IHtcclxuICAgICAgICBiYXNlQ29sb3I6IENhbGN1bHVzR3JhcGhlckNvbG9ycy5wYW5lbEZpbGxQcm9wZXJ0eSxcclxuICAgICAgICB4TWFyZ2luOiAxMCxcclxuICAgICAgICB5TWFyZ2luOiAxMCxcclxuICAgICAgICBwaGV0aW9WaXNpYmxlUHJvcGVydHlJbnN0cnVtZW50ZWQ6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIHRhbmRlbTogdGFuZGVtXHJcbiAgICB9ICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuIGl0ZW0gZm9yIHRoaXMgcmFkaW8gYnV0dG9uIGdyb3VwLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlSXRlbSggZ3JhcGhTZXQ6IEdyYXBoU2V0LCBncmFwaFR5cGU6IEdyYXBoVHlwZSwgbGFiZWxBbGlnbkdyb3VwOiBBbGlnbkdyb3VwICk6IEdyYXBoU2V0UmFkaW9CdXR0b25Hcm91cEl0ZW0ge1xyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggZ3JhcGhTZXQuaW5jbHVkZXMoIGdyYXBoVHlwZSApICk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjcmVhdGVOb2RlOiAoKSA9PiBuZXcgTGFiZWxDb2xvckljb24oIG5ldyBHcmFwaFR5cGVMYWJlbE5vZGUoIGdyYXBoVHlwZSApLCBsYWJlbEFsaWduR3JvdXAsIGdyYXBoVHlwZS5zdHJva2VQcm9wZXJ0eSApLFxyXG4gICAgICB2YWx1ZTogZ3JhcGhTZXQsXHJcbiAgICAgIHRhbmRlbU5hbWU6IGAke2dyYXBoVHlwZS50YW5kZW1OYW1lUHJlZml4fSR7UmVjdGFuZ3VsYXJSYWRpb0J1dHRvbi5UQU5ERU1fTkFNRV9TVUZGSVh9YFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbmNhbGN1bHVzR3JhcGhlci5yZWdpc3RlciggJ0dyYXBoU2V0UmFkaW9CdXR0b25Hcm91cCcsIEdyYXBoU2V0UmFkaW9CdXR0b25Hcm91cCApO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSwyQkFBMkIsTUFBMkMsMkRBQTJEO0FBQ3hJLE9BQU9DLGVBQWUsTUFBTSwwQkFBMEI7QUFHdEQsT0FBT0MscUJBQXFCLE1BQU0sNkJBQTZCO0FBQy9ELE9BQU9DLHNCQUFzQixNQUFNLHNEQUFzRDtBQUV6RixPQUFPQyxrQkFBa0IsTUFBTSx5QkFBeUI7QUFDeEQsU0FBU0MsY0FBYyxRQUFRLHFCQUFxQjtBQU1wRCxlQUFlLE1BQU1DLHdCQUF3QixTQUFTTiwyQkFBMkIsQ0FBVztFQUVuRk8sV0FBV0EsQ0FBRUMsZ0JBQW9DLEVBQ3BDQyw2QkFBNkQsRUFDN0RDLE1BQWMsRUFBRztJQUVuQyxLQUFLLENBQUVGLGdCQUFnQixFQUFFQyw2QkFBNkIsRUFBRTtNQUN0REUsT0FBTyxFQUFFLENBQUM7TUFDVkMsa0JBQWtCLEVBQUU7UUFDbEJDLFNBQVMsRUFBRVgscUJBQXFCLENBQUNZLGlCQUFpQjtRQUNsREMsT0FBTyxFQUFFLEVBQUU7UUFDWEMsT0FBTyxFQUFFLEVBQUU7UUFDWEMsaUNBQWlDLEVBQUU7TUFDckMsQ0FBQztNQUNEUCxNQUFNLEVBQUVBO0lBQ1YsQ0FBRSxDQUFDO0VBQ0w7O0VBRUE7QUFDRjtBQUNBO0VBQ0UsT0FBY1EsVUFBVUEsQ0FBRUMsUUFBa0IsRUFBRUMsU0FBb0IsRUFBRUMsZUFBMkIsRUFBaUM7SUFDOUhDLE1BQU0sSUFBSUEsTUFBTSxDQUFFSCxRQUFRLENBQUNJLFFBQVEsQ0FBRUgsU0FBVSxDQUFFLENBQUM7SUFDbEQsT0FBTztNQUNMSSxVQUFVLEVBQUVBLENBQUEsS0FBTSxJQUFJbkIsY0FBYyxDQUFFLElBQUlELGtCQUFrQixDQUFFZ0IsU0FBVSxDQUFDLEVBQUVDLGVBQWUsRUFBRUQsU0FBUyxDQUFDSyxjQUFlLENBQUM7TUFDdEhDLEtBQUssRUFBRVAsUUFBUTtNQUNmUSxVQUFVLEVBQUcsR0FBRVAsU0FBUyxDQUFDUSxnQkFBaUIsR0FBRXpCLHNCQUFzQixDQUFDMEIsa0JBQW1CO0lBQ3hGLENBQUM7RUFDSDtBQUNGO0FBRUE1QixlQUFlLENBQUM2QixRQUFRLENBQUUsMEJBQTBCLEVBQUV4Qix3QkFBeUIsQ0FBQyJ9