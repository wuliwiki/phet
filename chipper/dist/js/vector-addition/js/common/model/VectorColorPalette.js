// Copyright 2019-2023, University of Colorado Boulder

/**
 * Color palette used for rendering vectors.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Color } from '../../../../scenery/js/imports.js';
import vectorAddition from '../../vectorAddition.js';
export default class VectorColorPalette {
  constructor(options) {
    // all colors are {Color|string|null}, where {string} is a CSS color string, and null is 'no color'
    options = merge({
      // colors used for main vectors (aka parent vectors)
      mainFill: Color.BLACK,
      mainStroke: null,
      // colors used for component vectors. They are of type DashedArrowNode, which cannot be stroked.
      componentFill: null,
      // defaults to options.mainFill

      // colors used for sum vectors
      sumFill: Color.BLACK,
      sumStroke: null,
      // color used for sum component vectors. They are of type DashedArrowNode, which cannot be stroked.
      sumComponentFill: null,
      // defaults to options.sumFill

      // colors used for base vectors
      baseVectorFill: Color.WHITE,
      baseVectorStroke: null // defaults to options.mainFill
    }, options);

    // Component vectors cannot be stroked, so flag attempts to specify a stroke.
    assert && assert(options.componentStroke === undefined, 'componentStroke is not supported');
    assert && assert(options.sumComponentStroke === undefined, 'sumComponentStroke is not supported');

    // @public (read-only)
    this.mainFill = options.mainFill;
    this.mainStroke = options.mainStroke;
    this.componentFill = options.componentFill || options.mainFill;
    this.sumFill = options.sumFill;
    this.sumStroke = options.sumStroke;
    this.sumComponentFill = options.sumComponentFill || options.sumFill;
    this.baseVectorFill = options.baseVectorFill;
    this.baseVectorStroke = options.baseVectorStroke || options.mainFill;
  }

  /**
   * Catches attempts to use stroke fields that do not exist for component vectors.
   * Component vectors are rendered using DashedArrowNode, which does not support stroke.
   * @public
   */
  get componentStroke() {
    assert && assert(false, 'VectorColorPalette does not have componentStroke');
    return null;
  }
  get sumComponentStroke() {
    assert && assert(false, 'VectorColorPalette does not have sumComponentStroke');
    return null;
  }
}
vectorAddition.register('VectorColorPalette', VectorColorPalette);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtZXJnZSIsIkNvbG9yIiwidmVjdG9yQWRkaXRpb24iLCJWZWN0b3JDb2xvclBhbGV0dGUiLCJjb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJtYWluRmlsbCIsIkJMQUNLIiwibWFpblN0cm9rZSIsImNvbXBvbmVudEZpbGwiLCJzdW1GaWxsIiwic3VtU3Ryb2tlIiwic3VtQ29tcG9uZW50RmlsbCIsImJhc2VWZWN0b3JGaWxsIiwiV0hJVEUiLCJiYXNlVmVjdG9yU3Ryb2tlIiwiYXNzZXJ0IiwiY29tcG9uZW50U3Ryb2tlIiwidW5kZWZpbmVkIiwic3VtQ29tcG9uZW50U3Ryb2tlIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJWZWN0b3JDb2xvclBhbGV0dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogQ29sb3IgcGFsZXR0ZSB1c2VkIGZvciByZW5kZXJpbmcgdmVjdG9ycy5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgbWVyZ2UgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL21lcmdlLmpzJztcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgdmVjdG9yQWRkaXRpb24gZnJvbSAnLi4vLi4vdmVjdG9yQWRkaXRpb24uanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yQ29sb3JQYWxldHRlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoIG9wdGlvbnMgKSB7XHJcblxyXG4gICAgLy8gYWxsIGNvbG9ycyBhcmUge0NvbG9yfHN0cmluZ3xudWxsfSwgd2hlcmUge3N0cmluZ30gaXMgYSBDU1MgY29sb3Igc3RyaW5nLCBhbmQgbnVsbCBpcyAnbm8gY29sb3InXHJcbiAgICBvcHRpb25zID0gbWVyZ2UoIHtcclxuXHJcbiAgICAgIC8vIGNvbG9ycyB1c2VkIGZvciBtYWluIHZlY3RvcnMgKGFrYSBwYXJlbnQgdmVjdG9ycylcclxuICAgICAgbWFpbkZpbGw6IENvbG9yLkJMQUNLLFxyXG4gICAgICBtYWluU3Ryb2tlOiBudWxsLFxyXG5cclxuICAgICAgLy8gY29sb3JzIHVzZWQgZm9yIGNvbXBvbmVudCB2ZWN0b3JzLiBUaGV5IGFyZSBvZiB0eXBlIERhc2hlZEFycm93Tm9kZSwgd2hpY2ggY2Fubm90IGJlIHN0cm9rZWQuXHJcbiAgICAgIGNvbXBvbmVudEZpbGw6IG51bGwsIC8vIGRlZmF1bHRzIHRvIG9wdGlvbnMubWFpbkZpbGxcclxuXHJcbiAgICAgIC8vIGNvbG9ycyB1c2VkIGZvciBzdW0gdmVjdG9yc1xyXG4gICAgICBzdW1GaWxsOiBDb2xvci5CTEFDSyxcclxuICAgICAgc3VtU3Ryb2tlOiBudWxsLFxyXG5cclxuICAgICAgLy8gY29sb3IgdXNlZCBmb3Igc3VtIGNvbXBvbmVudCB2ZWN0b3JzLiBUaGV5IGFyZSBvZiB0eXBlIERhc2hlZEFycm93Tm9kZSwgd2hpY2ggY2Fubm90IGJlIHN0cm9rZWQuXHJcbiAgICAgIHN1bUNvbXBvbmVudEZpbGw6IG51bGwsIC8vIGRlZmF1bHRzIHRvIG9wdGlvbnMuc3VtRmlsbFxyXG5cclxuICAgICAgLy8gY29sb3JzIHVzZWQgZm9yIGJhc2UgdmVjdG9yc1xyXG4gICAgICBiYXNlVmVjdG9yRmlsbDogQ29sb3IuV0hJVEUsXHJcbiAgICAgIGJhc2VWZWN0b3JTdHJva2U6IG51bGwgLy8gZGVmYXVsdHMgdG8gb3B0aW9ucy5tYWluRmlsbFxyXG5cclxuICAgIH0sIG9wdGlvbnMgKTtcclxuXHJcbiAgICAvLyBDb21wb25lbnQgdmVjdG9ycyBjYW5ub3QgYmUgc3Ryb2tlZCwgc28gZmxhZyBhdHRlbXB0cyB0byBzcGVjaWZ5IGEgc3Ryb2tlLlxyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggb3B0aW9ucy5jb21wb25lbnRTdHJva2UgPT09IHVuZGVmaW5lZCwgJ2NvbXBvbmVudFN0cm9rZSBpcyBub3Qgc3VwcG9ydGVkJyApO1xyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggb3B0aW9ucy5zdW1Db21wb25lbnRTdHJva2UgPT09IHVuZGVmaW5lZCwgJ3N1bUNvbXBvbmVudFN0cm9rZSBpcyBub3Qgc3VwcG9ydGVkJyApO1xyXG5cclxuICAgIC8vIEBwdWJsaWMgKHJlYWQtb25seSlcclxuICAgIHRoaXMubWFpbkZpbGwgPSBvcHRpb25zLm1haW5GaWxsO1xyXG4gICAgdGhpcy5tYWluU3Ryb2tlID0gb3B0aW9ucy5tYWluU3Ryb2tlO1xyXG4gICAgdGhpcy5jb21wb25lbnRGaWxsID0gKCBvcHRpb25zLmNvbXBvbmVudEZpbGwgfHwgb3B0aW9ucy5tYWluRmlsbCApO1xyXG4gICAgdGhpcy5zdW1GaWxsID0gb3B0aW9ucy5zdW1GaWxsO1xyXG4gICAgdGhpcy5zdW1TdHJva2UgPSBvcHRpb25zLnN1bVN0cm9rZTtcclxuICAgIHRoaXMuc3VtQ29tcG9uZW50RmlsbCA9ICggb3B0aW9ucy5zdW1Db21wb25lbnRGaWxsIHx8IG9wdGlvbnMuc3VtRmlsbCApO1xyXG4gICAgdGhpcy5iYXNlVmVjdG9yRmlsbCA9IG9wdGlvbnMuYmFzZVZlY3RvckZpbGw7XHJcbiAgICB0aGlzLmJhc2VWZWN0b3JTdHJva2UgPSAoIG9wdGlvbnMuYmFzZVZlY3RvclN0cm9rZSB8fCBvcHRpb25zLm1haW5GaWxsICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYXRjaGVzIGF0dGVtcHRzIHRvIHVzZSBzdHJva2UgZmllbGRzIHRoYXQgZG8gbm90IGV4aXN0IGZvciBjb21wb25lbnQgdmVjdG9ycy5cclxuICAgKiBDb21wb25lbnQgdmVjdG9ycyBhcmUgcmVuZGVyZWQgdXNpbmcgRGFzaGVkQXJyb3dOb2RlLCB3aGljaCBkb2VzIG5vdCBzdXBwb3J0IHN0cm9rZS5cclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgZ2V0IGNvbXBvbmVudFN0cm9rZSgpIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIGZhbHNlLCAnVmVjdG9yQ29sb3JQYWxldHRlIGRvZXMgbm90IGhhdmUgY29tcG9uZW50U3Ryb2tlJyApO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXQgc3VtQ29tcG9uZW50U3Ryb2tlKCkge1xyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggZmFsc2UsICdWZWN0b3JDb2xvclBhbGV0dGUgZG9lcyBub3QgaGF2ZSBzdW1Db21wb25lbnRTdHJva2UnICk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuXHJcbnZlY3RvckFkZGl0aW9uLnJlZ2lzdGVyKCAnVmVjdG9yQ29sb3JQYWxldHRlJywgVmVjdG9yQ29sb3JQYWxldHRlICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLEtBQUssTUFBTSxtQ0FBbUM7QUFDckQsU0FBU0MsS0FBSyxRQUFRLG1DQUFtQztBQUN6RCxPQUFPQyxjQUFjLE1BQU0seUJBQXlCO0FBRXBELGVBQWUsTUFBTUMsa0JBQWtCLENBQUM7RUFFdENDLFdBQVdBLENBQUVDLE9BQU8sRUFBRztJQUVyQjtJQUNBQSxPQUFPLEdBQUdMLEtBQUssQ0FBRTtNQUVmO01BQ0FNLFFBQVEsRUFBRUwsS0FBSyxDQUFDTSxLQUFLO01BQ3JCQyxVQUFVLEVBQUUsSUFBSTtNQUVoQjtNQUNBQyxhQUFhLEVBQUUsSUFBSTtNQUFFOztNQUVyQjtNQUNBQyxPQUFPLEVBQUVULEtBQUssQ0FBQ00sS0FBSztNQUNwQkksU0FBUyxFQUFFLElBQUk7TUFFZjtNQUNBQyxnQkFBZ0IsRUFBRSxJQUFJO01BQUU7O01BRXhCO01BQ0FDLGNBQWMsRUFBRVosS0FBSyxDQUFDYSxLQUFLO01BQzNCQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUM7SUFFekIsQ0FBQyxFQUFFVixPQUFRLENBQUM7O0lBRVo7SUFDQVcsTUFBTSxJQUFJQSxNQUFNLENBQUVYLE9BQU8sQ0FBQ1ksZUFBZSxLQUFLQyxTQUFTLEVBQUUsa0NBQW1DLENBQUM7SUFDN0ZGLE1BQU0sSUFBSUEsTUFBTSxDQUFFWCxPQUFPLENBQUNjLGtCQUFrQixLQUFLRCxTQUFTLEVBQUUscUNBQXNDLENBQUM7O0lBRW5HO0lBQ0EsSUFBSSxDQUFDWixRQUFRLEdBQUdELE9BQU8sQ0FBQ0MsUUFBUTtJQUNoQyxJQUFJLENBQUNFLFVBQVUsR0FBR0gsT0FBTyxDQUFDRyxVQUFVO0lBQ3BDLElBQUksQ0FBQ0MsYUFBYSxHQUFLSixPQUFPLENBQUNJLGFBQWEsSUFBSUosT0FBTyxDQUFDQyxRQUFVO0lBQ2xFLElBQUksQ0FBQ0ksT0FBTyxHQUFHTCxPQUFPLENBQUNLLE9BQU87SUFDOUIsSUFBSSxDQUFDQyxTQUFTLEdBQUdOLE9BQU8sQ0FBQ00sU0FBUztJQUNsQyxJQUFJLENBQUNDLGdCQUFnQixHQUFLUCxPQUFPLENBQUNPLGdCQUFnQixJQUFJUCxPQUFPLENBQUNLLE9BQVM7SUFDdkUsSUFBSSxDQUFDRyxjQUFjLEdBQUdSLE9BQU8sQ0FBQ1EsY0FBYztJQUM1QyxJQUFJLENBQUNFLGdCQUFnQixHQUFLVixPQUFPLENBQUNVLGdCQUFnQixJQUFJVixPQUFPLENBQUNDLFFBQVU7RUFDMUU7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUNFLElBQUlXLGVBQWVBLENBQUEsRUFBRztJQUNwQkQsTUFBTSxJQUFJQSxNQUFNLENBQUUsS0FBSyxFQUFFLGtEQUFtRCxDQUFDO0lBQzdFLE9BQU8sSUFBSTtFQUNiO0VBRUEsSUFBSUcsa0JBQWtCQSxDQUFBLEVBQUc7SUFDdkJILE1BQU0sSUFBSUEsTUFBTSxDQUFFLEtBQUssRUFBRSxxREFBc0QsQ0FBQztJQUNoRixPQUFPLElBQUk7RUFDYjtBQUNGO0FBRUFkLGNBQWMsQ0FBQ2tCLFFBQVEsQ0FBRSxvQkFBb0IsRUFBRWpCLGtCQUFtQixDQUFDIn0=