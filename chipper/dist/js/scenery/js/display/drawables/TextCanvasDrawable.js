// Copyright 2016-2022, University of Colorado Boulder

/**
 * Canvas drawable for Text nodes.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Poolable from '../../../../phet-core/js/Poolable.js';
import { CanvasSelfDrawable, PaintableStatelessDrawable, scenery } from '../../imports.js';
class TextCanvasDrawable extends PaintableStatelessDrawable(CanvasSelfDrawable) {
  /**
   * Paints this drawable to a Canvas (the wrapper contains both a Canvas reference and its drawing context).
   * @public
   *
   * Assumes that the Canvas's context is already in the proper local coordinate frame for the node, and that any
   * other required effects (opacity, clipping, etc.) have already been prepared.
   *
   * This is part of the CanvasSelfDrawable API required to be implemented for subtypes.
   *
   * @param {CanvasContextWrapper} wrapper - Contains the Canvas and its drawing context
   * @param {scenery.Node} node - Our node that is being drawn
   * @param {Matrix3} matrix - The transformation matrix applied for this node's coordinate system.
   */
  paintCanvas(wrapper, node, matrix) {
    const context = wrapper.context;

    // extra parameters we need to set, but should avoid setting if we aren't drawing anything
    if (node.hasFill() || node.hasPaintableStroke()) {
      wrapper.setFont(node._font.getFont());
      wrapper.setDirection('ltr');
    }
    if (node.hasFill()) {
      node.beforeCanvasFill(wrapper); // defined in Paintable
      context.fillText(node.renderedText, 0, 0);
      node.afterCanvasFill(wrapper); // defined in Paintable
    }

    if (node.hasPaintableStroke()) {
      node.beforeCanvasStroke(wrapper); // defined in Paintable
      context.strokeText(node.renderedText, 0, 0);
      node.afterCanvasStroke(wrapper); // defined in Paintable
    }
  }

  /**
   * @public
   */
  markDirtyText() {
    this.markPaintDirty();
  }

  /**
   * @public
   */
  markDirtyFont() {
    this.markPaintDirty();
  }

  /**
   * @public
   */
  markDirtyBounds() {
    this.markPaintDirty();
  }
}
scenery.register('TextCanvasDrawable', TextCanvasDrawable);
Poolable.mixInto(TextCanvasDrawable);
export default TextCanvasDrawable;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQb29sYWJsZSIsIkNhbnZhc1NlbGZEcmF3YWJsZSIsIlBhaW50YWJsZVN0YXRlbGVzc0RyYXdhYmxlIiwic2NlbmVyeSIsIlRleHRDYW52YXNEcmF3YWJsZSIsInBhaW50Q2FudmFzIiwid3JhcHBlciIsIm5vZGUiLCJtYXRyaXgiLCJjb250ZXh0IiwiaGFzRmlsbCIsImhhc1BhaW50YWJsZVN0cm9rZSIsInNldEZvbnQiLCJfZm9udCIsImdldEZvbnQiLCJzZXREaXJlY3Rpb24iLCJiZWZvcmVDYW52YXNGaWxsIiwiZmlsbFRleHQiLCJyZW5kZXJlZFRleHQiLCJhZnRlckNhbnZhc0ZpbGwiLCJiZWZvcmVDYW52YXNTdHJva2UiLCJzdHJva2VUZXh0IiwiYWZ0ZXJDYW52YXNTdHJva2UiLCJtYXJrRGlydHlUZXh0IiwibWFya1BhaW50RGlydHkiLCJtYXJrRGlydHlGb250IiwibWFya0RpcnR5Qm91bmRzIiwicmVnaXN0ZXIiLCJtaXhJbnRvIl0sInNvdXJjZXMiOlsiVGV4dENhbnZhc0RyYXdhYmxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE2LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIENhbnZhcyBkcmF3YWJsZSBmb3IgVGV4dCBub2Rlcy5cclxuICpcclxuICogQGF1dGhvciBKb25hdGhhbiBPbHNvbiA8am9uYXRoYW4ub2xzb25AY29sb3JhZG8uZWR1PlxyXG4gKi9cclxuXHJcbmltcG9ydCBQb29sYWJsZSBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvUG9vbGFibGUuanMnO1xyXG5pbXBvcnQgeyBDYW52YXNTZWxmRHJhd2FibGUsIFBhaW50YWJsZVN0YXRlbGVzc0RyYXdhYmxlLCBzY2VuZXJ5IH0gZnJvbSAnLi4vLi4vaW1wb3J0cy5qcyc7XHJcblxyXG5jbGFzcyBUZXh0Q2FudmFzRHJhd2FibGUgZXh0ZW5kcyBQYWludGFibGVTdGF0ZWxlc3NEcmF3YWJsZSggQ2FudmFzU2VsZkRyYXdhYmxlICkge1xyXG4gIC8qKlxyXG4gICAqIFBhaW50cyB0aGlzIGRyYXdhYmxlIHRvIGEgQ2FudmFzICh0aGUgd3JhcHBlciBjb250YWlucyBib3RoIGEgQ2FudmFzIHJlZmVyZW5jZSBhbmQgaXRzIGRyYXdpbmcgY29udGV4dCkuXHJcbiAgICogQHB1YmxpY1xyXG4gICAqXHJcbiAgICogQXNzdW1lcyB0aGF0IHRoZSBDYW52YXMncyBjb250ZXh0IGlzIGFscmVhZHkgaW4gdGhlIHByb3BlciBsb2NhbCBjb29yZGluYXRlIGZyYW1lIGZvciB0aGUgbm9kZSwgYW5kIHRoYXQgYW55XHJcbiAgICogb3RoZXIgcmVxdWlyZWQgZWZmZWN0cyAob3BhY2l0eSwgY2xpcHBpbmcsIGV0Yy4pIGhhdmUgYWxyZWFkeSBiZWVuIHByZXBhcmVkLlxyXG4gICAqXHJcbiAgICogVGhpcyBpcyBwYXJ0IG9mIHRoZSBDYW52YXNTZWxmRHJhd2FibGUgQVBJIHJlcXVpcmVkIHRvIGJlIGltcGxlbWVudGVkIGZvciBzdWJ0eXBlcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Q2FudmFzQ29udGV4dFdyYXBwZXJ9IHdyYXBwZXIgLSBDb250YWlucyB0aGUgQ2FudmFzIGFuZCBpdHMgZHJhd2luZyBjb250ZXh0XHJcbiAgICogQHBhcmFtIHtzY2VuZXJ5Lk5vZGV9IG5vZGUgLSBPdXIgbm9kZSB0aGF0IGlzIGJlaW5nIGRyYXduXHJcbiAgICogQHBhcmFtIHtNYXRyaXgzfSBtYXRyaXggLSBUaGUgdHJhbnNmb3JtYXRpb24gbWF0cml4IGFwcGxpZWQgZm9yIHRoaXMgbm9kZSdzIGNvb3JkaW5hdGUgc3lzdGVtLlxyXG4gICAqL1xyXG4gIHBhaW50Q2FudmFzKCB3cmFwcGVyLCBub2RlLCBtYXRyaXggKSB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gd3JhcHBlci5jb250ZXh0O1xyXG5cclxuICAgIC8vIGV4dHJhIHBhcmFtZXRlcnMgd2UgbmVlZCB0byBzZXQsIGJ1dCBzaG91bGQgYXZvaWQgc2V0dGluZyBpZiB3ZSBhcmVuJ3QgZHJhd2luZyBhbnl0aGluZ1xyXG4gICAgaWYgKCBub2RlLmhhc0ZpbGwoKSB8fCBub2RlLmhhc1BhaW50YWJsZVN0cm9rZSgpICkge1xyXG4gICAgICB3cmFwcGVyLnNldEZvbnQoIG5vZGUuX2ZvbnQuZ2V0Rm9udCgpICk7XHJcbiAgICAgIHdyYXBwZXIuc2V0RGlyZWN0aW9uKCAnbHRyJyApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggbm9kZS5oYXNGaWxsKCkgKSB7XHJcbiAgICAgIG5vZGUuYmVmb3JlQ2FudmFzRmlsbCggd3JhcHBlciApOyAvLyBkZWZpbmVkIGluIFBhaW50YWJsZVxyXG4gICAgICBjb250ZXh0LmZpbGxUZXh0KCBub2RlLnJlbmRlcmVkVGV4dCwgMCwgMCApO1xyXG4gICAgICBub2RlLmFmdGVyQ2FudmFzRmlsbCggd3JhcHBlciApOyAvLyBkZWZpbmVkIGluIFBhaW50YWJsZVxyXG4gICAgfVxyXG4gICAgaWYgKCBub2RlLmhhc1BhaW50YWJsZVN0cm9rZSgpICkge1xyXG4gICAgICBub2RlLmJlZm9yZUNhbnZhc1N0cm9rZSggd3JhcHBlciApOyAvLyBkZWZpbmVkIGluIFBhaW50YWJsZVxyXG4gICAgICBjb250ZXh0LnN0cm9rZVRleHQoIG5vZGUucmVuZGVyZWRUZXh0LCAwLCAwICk7XHJcbiAgICAgIG5vZGUuYWZ0ZXJDYW52YXNTdHJva2UoIHdyYXBwZXIgKTsgLy8gZGVmaW5lZCBpbiBQYWludGFibGVcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBtYXJrRGlydHlUZXh0KCkge1xyXG4gICAgdGhpcy5tYXJrUGFpbnREaXJ0eSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIG1hcmtEaXJ0eUZvbnQoKSB7XHJcbiAgICB0aGlzLm1hcmtQYWludERpcnR5KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgbWFya0RpcnR5Qm91bmRzKCkge1xyXG4gICAgdGhpcy5tYXJrUGFpbnREaXJ0eSgpO1xyXG4gIH1cclxufVxyXG5cclxuc2NlbmVyeS5yZWdpc3RlciggJ1RleHRDYW52YXNEcmF3YWJsZScsIFRleHRDYW52YXNEcmF3YWJsZSApO1xyXG5cclxuUG9vbGFibGUubWl4SW50byggVGV4dENhbnZhc0RyYXdhYmxlICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXh0Q2FudmFzRHJhd2FibGU7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFFBQVEsTUFBTSxzQ0FBc0M7QUFDM0QsU0FBU0Msa0JBQWtCLEVBQUVDLDBCQUEwQixFQUFFQyxPQUFPLFFBQVEsa0JBQWtCO0FBRTFGLE1BQU1DLGtCQUFrQixTQUFTRiwwQkFBMEIsQ0FBRUQsa0JBQW1CLENBQUMsQ0FBQztFQUNoRjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFSSxXQUFXQSxDQUFFQyxPQUFPLEVBQUVDLElBQUksRUFBRUMsTUFBTSxFQUFHO0lBQ25DLE1BQU1DLE9BQU8sR0FBR0gsT0FBTyxDQUFDRyxPQUFPOztJQUUvQjtJQUNBLElBQUtGLElBQUksQ0FBQ0csT0FBTyxDQUFDLENBQUMsSUFBSUgsSUFBSSxDQUFDSSxrQkFBa0IsQ0FBQyxDQUFDLEVBQUc7TUFDakRMLE9BQU8sQ0FBQ00sT0FBTyxDQUFFTCxJQUFJLENBQUNNLEtBQUssQ0FBQ0MsT0FBTyxDQUFDLENBQUUsQ0FBQztNQUN2Q1IsT0FBTyxDQUFDUyxZQUFZLENBQUUsS0FBTSxDQUFDO0lBQy9CO0lBRUEsSUFBS1IsSUFBSSxDQUFDRyxPQUFPLENBQUMsQ0FBQyxFQUFHO01BQ3BCSCxJQUFJLENBQUNTLGdCQUFnQixDQUFFVixPQUFRLENBQUMsQ0FBQyxDQUFDO01BQ2xDRyxPQUFPLENBQUNRLFFBQVEsQ0FBRVYsSUFBSSxDQUFDVyxZQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUUsQ0FBQztNQUMzQ1gsSUFBSSxDQUFDWSxlQUFlLENBQUViLE9BQVEsQ0FBQyxDQUFDLENBQUM7SUFDbkM7O0lBQ0EsSUFBS0MsSUFBSSxDQUFDSSxrQkFBa0IsQ0FBQyxDQUFDLEVBQUc7TUFDL0JKLElBQUksQ0FBQ2Esa0JBQWtCLENBQUVkLE9BQVEsQ0FBQyxDQUFDLENBQUM7TUFDcENHLE9BQU8sQ0FBQ1ksVUFBVSxDQUFFZCxJQUFJLENBQUNXLFlBQVksRUFBRSxDQUFDLEVBQUUsQ0FBRSxDQUFDO01BQzdDWCxJQUFJLENBQUNlLGlCQUFpQixDQUFFaEIsT0FBUSxDQUFDLENBQUMsQ0FBQztJQUNyQztFQUNGOztFQUVBO0FBQ0Y7QUFDQTtFQUNFaUIsYUFBYUEsQ0FBQSxFQUFHO0lBQ2QsSUFBSSxDQUFDQyxjQUFjLENBQUMsQ0FBQztFQUN2Qjs7RUFFQTtBQUNGO0FBQ0E7RUFDRUMsYUFBYUEsQ0FBQSxFQUFHO0lBQ2QsSUFBSSxDQUFDRCxjQUFjLENBQUMsQ0FBQztFQUN2Qjs7RUFFQTtBQUNGO0FBQ0E7RUFDRUUsZUFBZUEsQ0FBQSxFQUFHO0lBQ2hCLElBQUksQ0FBQ0YsY0FBYyxDQUFDLENBQUM7RUFDdkI7QUFDRjtBQUVBckIsT0FBTyxDQUFDd0IsUUFBUSxDQUFFLG9CQUFvQixFQUFFdkIsa0JBQW1CLENBQUM7QUFFNURKLFFBQVEsQ0FBQzRCLE9BQU8sQ0FBRXhCLGtCQUFtQixDQUFDO0FBRXRDLGVBQWVBLGtCQUFrQiJ9