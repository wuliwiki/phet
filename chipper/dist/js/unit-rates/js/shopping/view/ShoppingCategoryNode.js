// Copyright 2016-2023, University of Colorado Boulder

/**
 * View components that are specific to a category in the 'Shopping' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node } from '../../../../scenery/js/imports.js';
import URConstants from '../../common/URConstants.js';
import unitRates from '../../unitRates.js';
import ShoppingSceneComboBox from './ShoppingSceneComboBox.js';
import ShoppingSceneNode from './ShoppingSceneNode.js';
export default class ShoppingCategoryNode extends Node {
  /**
   * @param {ShoppingCategory} category
   * @param {Property.<ShoppingCategory>} categoryProperty
   * @param {Bounds2} layoutBounds
   * @param {KeypadLayer} keypadLayer
   * @param {ShoppingViewProperties} viewProperties
   * @param {Object} [options]
   */
  constructor(category, categoryProperty, layoutBounds, keypadLayer, viewProperties, options) {
    super();

    // parent for stuff that's specific to a scene, to maintain rendering order
    let shoppingSceneNode = null; // created below
    const shoppingSceneParent = new Node();
    this.addChild(shoppingSceneParent);

    // combo box, for selecting a scene, dispose required
    const comboBox = new ShoppingSceneComboBox(category.shoppingSceneProperty, category.shoppingScenes, this, {
      left: layoutBounds.left + URConstants.SCREEN_X_MARGIN,
      bottom: layoutBounds.bottom - 80
    });
    this.addChild(comboBox);
    this.mutate(options);

    // Show this category when it's selected.
    const categoryObserver = newCategory => {
      this.visible = newCategory === category;
    };
    categoryProperty.link(categoryObserver); // unlink in dispose

    // When the selected scene changes, replace the UI elements that are item-specific
    const shoppingSceneObserver = shoppingScene => {
      // remove the old scene
      if (shoppingSceneNode) {
        shoppingSceneNode.interruptSubtreeInput(); // cancel drags that are in progress
        shoppingSceneParent.removeChild(shoppingSceneNode);
        shoppingSceneNode.dispose();
      }

      // add the new scene
      shoppingSceneNode = new ShoppingSceneNode(shoppingScene, layoutBounds, keypadLayer, viewProperties);
      shoppingSceneParent.addChild(shoppingSceneNode);
    };
    category.shoppingSceneProperty.link(shoppingSceneObserver); // unlink in dispose

    // @private
    this.disposeShoppingCategoryNode = () => {
      comboBox.dispose();
      categoryProperty.unlink(categoryObserver);
      category.shoppingSceneProperty.unlink(shoppingSceneObserver);
      shoppingSceneNode.dispose();
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeShoppingCategoryNode();
    super.dispose();
  }
}
unitRates.register('ShoppingCategoryNode', ShoppingCategoryNode);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJOb2RlIiwiVVJDb25zdGFudHMiLCJ1bml0UmF0ZXMiLCJTaG9wcGluZ1NjZW5lQ29tYm9Cb3giLCJTaG9wcGluZ1NjZW5lTm9kZSIsIlNob3BwaW5nQ2F0ZWdvcnlOb2RlIiwiY29uc3RydWN0b3IiLCJjYXRlZ29yeSIsImNhdGVnb3J5UHJvcGVydHkiLCJsYXlvdXRCb3VuZHMiLCJrZXlwYWRMYXllciIsInZpZXdQcm9wZXJ0aWVzIiwib3B0aW9ucyIsInNob3BwaW5nU2NlbmVOb2RlIiwic2hvcHBpbmdTY2VuZVBhcmVudCIsImFkZENoaWxkIiwiY29tYm9Cb3giLCJzaG9wcGluZ1NjZW5lUHJvcGVydHkiLCJzaG9wcGluZ1NjZW5lcyIsImxlZnQiLCJTQ1JFRU5fWF9NQVJHSU4iLCJib3R0b20iLCJtdXRhdGUiLCJjYXRlZ29yeU9ic2VydmVyIiwibmV3Q2F0ZWdvcnkiLCJ2aXNpYmxlIiwibGluayIsInNob3BwaW5nU2NlbmVPYnNlcnZlciIsInNob3BwaW5nU2NlbmUiLCJpbnRlcnJ1cHRTdWJ0cmVlSW5wdXQiLCJyZW1vdmVDaGlsZCIsImRpc3Bvc2UiLCJkaXNwb3NlU2hvcHBpbmdDYXRlZ29yeU5vZGUiLCJ1bmxpbmsiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlNob3BwaW5nQ2F0ZWdvcnlOb2RlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE2LTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFZpZXcgY29tcG9uZW50cyB0aGF0IGFyZSBzcGVjaWZpYyB0byBhIGNhdGVnb3J5IGluIHRoZSAnU2hvcHBpbmcnIHNjcmVlbi5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IFVSQ29uc3RhbnRzIGZyb20gJy4uLy4uL2NvbW1vbi9VUkNvbnN0YW50cy5qcyc7XHJcbmltcG9ydCB1bml0UmF0ZXMgZnJvbSAnLi4vLi4vdW5pdFJhdGVzLmpzJztcclxuaW1wb3J0IFNob3BwaW5nU2NlbmVDb21ib0JveCBmcm9tICcuL1Nob3BwaW5nU2NlbmVDb21ib0JveC5qcyc7XHJcbmltcG9ydCBTaG9wcGluZ1NjZW5lTm9kZSBmcm9tICcuL1Nob3BwaW5nU2NlbmVOb2RlLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BwaW5nQ2F0ZWdvcnlOb2RlIGV4dGVuZHMgTm9kZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7U2hvcHBpbmdDYXRlZ29yeX0gY2F0ZWdvcnlcclxuICAgKiBAcGFyYW0ge1Byb3BlcnR5LjxTaG9wcGluZ0NhdGVnb3J5Pn0gY2F0ZWdvcnlQcm9wZXJ0eVxyXG4gICAqIEBwYXJhbSB7Qm91bmRzMn0gbGF5b3V0Qm91bmRzXHJcbiAgICogQHBhcmFtIHtLZXlwYWRMYXllcn0ga2V5cGFkTGF5ZXJcclxuICAgKiBAcGFyYW0ge1Nob3BwaW5nVmlld1Byb3BlcnRpZXN9IHZpZXdQcm9wZXJ0aWVzXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBjYXRlZ29yeSwgY2F0ZWdvcnlQcm9wZXJ0eSwgbGF5b3V0Qm91bmRzLCBrZXlwYWRMYXllciwgdmlld1Byb3BlcnRpZXMsIG9wdGlvbnMgKSB7XHJcblxyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICAvLyBwYXJlbnQgZm9yIHN0dWZmIHRoYXQncyBzcGVjaWZpYyB0byBhIHNjZW5lLCB0byBtYWludGFpbiByZW5kZXJpbmcgb3JkZXJcclxuICAgIGxldCBzaG9wcGluZ1NjZW5lTm9kZSA9IG51bGw7IC8vIGNyZWF0ZWQgYmVsb3dcclxuICAgIGNvbnN0IHNob3BwaW5nU2NlbmVQYXJlbnQgPSBuZXcgTm9kZSgpO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggc2hvcHBpbmdTY2VuZVBhcmVudCApO1xyXG5cclxuICAgIC8vIGNvbWJvIGJveCwgZm9yIHNlbGVjdGluZyBhIHNjZW5lLCBkaXNwb3NlIHJlcXVpcmVkXHJcbiAgICBjb25zdCBjb21ib0JveCA9IG5ldyBTaG9wcGluZ1NjZW5lQ29tYm9Cb3goIGNhdGVnb3J5LnNob3BwaW5nU2NlbmVQcm9wZXJ0eSwgY2F0ZWdvcnkuc2hvcHBpbmdTY2VuZXMsIHRoaXMsIHtcclxuICAgICAgbGVmdDogbGF5b3V0Qm91bmRzLmxlZnQgKyBVUkNvbnN0YW50cy5TQ1JFRU5fWF9NQVJHSU4sXHJcbiAgICAgIGJvdHRvbTogbGF5b3V0Qm91bmRzLmJvdHRvbSAtIDgwXHJcbiAgICB9ICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCBjb21ib0JveCApO1xyXG5cclxuICAgIHRoaXMubXV0YXRlKCBvcHRpb25zICk7XHJcblxyXG4gICAgLy8gU2hvdyB0aGlzIGNhdGVnb3J5IHdoZW4gaXQncyBzZWxlY3RlZC5cclxuICAgIGNvbnN0IGNhdGVnb3J5T2JzZXJ2ZXIgPSBuZXdDYXRlZ29yeSA9PiB7XHJcbiAgICAgIHRoaXMudmlzaWJsZSA9ICggbmV3Q2F0ZWdvcnkgPT09IGNhdGVnb3J5ICk7XHJcbiAgICB9O1xyXG4gICAgY2F0ZWdvcnlQcm9wZXJ0eS5saW5rKCBjYXRlZ29yeU9ic2VydmVyICk7IC8vIHVubGluayBpbiBkaXNwb3NlXHJcblxyXG4gICAgLy8gV2hlbiB0aGUgc2VsZWN0ZWQgc2NlbmUgY2hhbmdlcywgcmVwbGFjZSB0aGUgVUkgZWxlbWVudHMgdGhhdCBhcmUgaXRlbS1zcGVjaWZpY1xyXG4gICAgY29uc3Qgc2hvcHBpbmdTY2VuZU9ic2VydmVyID0gc2hvcHBpbmdTY2VuZSA9PiB7XHJcblxyXG4gICAgICAvLyByZW1vdmUgdGhlIG9sZCBzY2VuZVxyXG4gICAgICBpZiAoIHNob3BwaW5nU2NlbmVOb2RlICkge1xyXG4gICAgICAgIHNob3BwaW5nU2NlbmVOb2RlLmludGVycnVwdFN1YnRyZWVJbnB1dCgpOyAvLyBjYW5jZWwgZHJhZ3MgdGhhdCBhcmUgaW4gcHJvZ3Jlc3NcclxuICAgICAgICBzaG9wcGluZ1NjZW5lUGFyZW50LnJlbW92ZUNoaWxkKCBzaG9wcGluZ1NjZW5lTm9kZSApO1xyXG4gICAgICAgIHNob3BwaW5nU2NlbmVOb2RlLmRpc3Bvc2UoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYWRkIHRoZSBuZXcgc2NlbmVcclxuICAgICAgc2hvcHBpbmdTY2VuZU5vZGUgPSBuZXcgU2hvcHBpbmdTY2VuZU5vZGUoIHNob3BwaW5nU2NlbmUsIGxheW91dEJvdW5kcywga2V5cGFkTGF5ZXIsIHZpZXdQcm9wZXJ0aWVzICk7XHJcbiAgICAgIHNob3BwaW5nU2NlbmVQYXJlbnQuYWRkQ2hpbGQoIHNob3BwaW5nU2NlbmVOb2RlICk7XHJcbiAgICB9O1xyXG4gICAgY2F0ZWdvcnkuc2hvcHBpbmdTY2VuZVByb3BlcnR5LmxpbmsoIHNob3BwaW5nU2NlbmVPYnNlcnZlciApOyAvLyB1bmxpbmsgaW4gZGlzcG9zZVxyXG5cclxuICAgIC8vIEBwcml2YXRlXHJcbiAgICB0aGlzLmRpc3Bvc2VTaG9wcGluZ0NhdGVnb3J5Tm9kZSA9ICgpID0+IHtcclxuICAgICAgY29tYm9Cb3guZGlzcG9zZSgpO1xyXG4gICAgICBjYXRlZ29yeVByb3BlcnR5LnVubGluayggY2F0ZWdvcnlPYnNlcnZlciApO1xyXG4gICAgICBjYXRlZ29yeS5zaG9wcGluZ1NjZW5lUHJvcGVydHkudW5saW5rKCBzaG9wcGluZ1NjZW5lT2JzZXJ2ZXIgKTtcclxuICAgICAgc2hvcHBpbmdTY2VuZU5vZGUuZGlzcG9zZSgpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAb3ZlcnJpZGVcclxuICAgKi9cclxuICBkaXNwb3NlKCkge1xyXG4gICAgdGhpcy5kaXNwb3NlU2hvcHBpbmdDYXRlZ29yeU5vZGUoKTtcclxuICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICB9XHJcbn1cclxuXHJcbnVuaXRSYXRlcy5yZWdpc3RlciggJ1Nob3BwaW5nQ2F0ZWdvcnlOb2RlJywgU2hvcHBpbmdDYXRlZ29yeU5vZGUgKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsSUFBSSxRQUFRLG1DQUFtQztBQUN4RCxPQUFPQyxXQUFXLE1BQU0sNkJBQTZCO0FBQ3JELE9BQU9DLFNBQVMsTUFBTSxvQkFBb0I7QUFDMUMsT0FBT0MscUJBQXFCLE1BQU0sNEJBQTRCO0FBQzlELE9BQU9DLGlCQUFpQixNQUFNLHdCQUF3QjtBQUV0RCxlQUFlLE1BQU1DLG9CQUFvQixTQUFTTCxJQUFJLENBQUM7RUFFckQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFTSxXQUFXQSxDQUFFQyxRQUFRLEVBQUVDLGdCQUFnQixFQUFFQyxZQUFZLEVBQUVDLFdBQVcsRUFBRUMsY0FBYyxFQUFFQyxPQUFPLEVBQUc7SUFFNUYsS0FBSyxDQUFDLENBQUM7O0lBRVA7SUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUM5QixNQUFNQyxtQkFBbUIsR0FBRyxJQUFJZCxJQUFJLENBQUMsQ0FBQztJQUN0QyxJQUFJLENBQUNlLFFBQVEsQ0FBRUQsbUJBQW9CLENBQUM7O0lBRXBDO0lBQ0EsTUFBTUUsUUFBUSxHQUFHLElBQUliLHFCQUFxQixDQUFFSSxRQUFRLENBQUNVLHFCQUFxQixFQUFFVixRQUFRLENBQUNXLGNBQWMsRUFBRSxJQUFJLEVBQUU7TUFDekdDLElBQUksRUFBRVYsWUFBWSxDQUFDVSxJQUFJLEdBQUdsQixXQUFXLENBQUNtQixlQUFlO01BQ3JEQyxNQUFNLEVBQUVaLFlBQVksQ0FBQ1ksTUFBTSxHQUFHO0lBQ2hDLENBQUUsQ0FBQztJQUNILElBQUksQ0FBQ04sUUFBUSxDQUFFQyxRQUFTLENBQUM7SUFFekIsSUFBSSxDQUFDTSxNQUFNLENBQUVWLE9BQVEsQ0FBQzs7SUFFdEI7SUFDQSxNQUFNVyxnQkFBZ0IsR0FBR0MsV0FBVyxJQUFJO01BQ3RDLElBQUksQ0FBQ0MsT0FBTyxHQUFLRCxXQUFXLEtBQUtqQixRQUFVO0lBQzdDLENBQUM7SUFDREMsZ0JBQWdCLENBQUNrQixJQUFJLENBQUVILGdCQUFpQixDQUFDLENBQUMsQ0FBQzs7SUFFM0M7SUFDQSxNQUFNSSxxQkFBcUIsR0FBR0MsYUFBYSxJQUFJO01BRTdDO01BQ0EsSUFBS2YsaUJBQWlCLEVBQUc7UUFDdkJBLGlCQUFpQixDQUFDZ0IscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0NmLG1CQUFtQixDQUFDZ0IsV0FBVyxDQUFFakIsaUJBQWtCLENBQUM7UUFDcERBLGlCQUFpQixDQUFDa0IsT0FBTyxDQUFDLENBQUM7TUFDN0I7O01BRUE7TUFDQWxCLGlCQUFpQixHQUFHLElBQUlULGlCQUFpQixDQUFFd0IsYUFBYSxFQUFFbkIsWUFBWSxFQUFFQyxXQUFXLEVBQUVDLGNBQWUsQ0FBQztNQUNyR0csbUJBQW1CLENBQUNDLFFBQVEsQ0FBRUYsaUJBQWtCLENBQUM7SUFDbkQsQ0FBQztJQUNETixRQUFRLENBQUNVLHFCQUFxQixDQUFDUyxJQUFJLENBQUVDLHFCQUFzQixDQUFDLENBQUMsQ0FBQzs7SUFFOUQ7SUFDQSxJQUFJLENBQUNLLDJCQUEyQixHQUFHLE1BQU07TUFDdkNoQixRQUFRLENBQUNlLE9BQU8sQ0FBQyxDQUFDO01BQ2xCdkIsZ0JBQWdCLENBQUN5QixNQUFNLENBQUVWLGdCQUFpQixDQUFDO01BQzNDaEIsUUFBUSxDQUFDVSxxQkFBcUIsQ0FBQ2dCLE1BQU0sQ0FBRU4scUJBQXNCLENBQUM7TUFDOURkLGlCQUFpQixDQUFDa0IsT0FBTyxDQUFDLENBQUM7SUFDN0IsQ0FBQztFQUNIOztFQUVBO0FBQ0Y7QUFDQTtBQUNBO0VBQ0VBLE9BQU9BLENBQUEsRUFBRztJQUNSLElBQUksQ0FBQ0MsMkJBQTJCLENBQUMsQ0FBQztJQUNsQyxLQUFLLENBQUNELE9BQU8sQ0FBQyxDQUFDO0VBQ2pCO0FBQ0Y7QUFFQTdCLFNBQVMsQ0FBQ2dDLFFBQVEsQ0FBRSxzQkFBc0IsRUFBRTdCLG9CQUFxQixDQUFDIn0=