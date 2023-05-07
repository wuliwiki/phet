// Copyright 2015-2022, University of Colorado Boulder

/**
 * Floats the control panels and reset all buttons to the right to give a bit more room in the play area for
 * wide screens.  See https://github.com/phetsims/bending-light/issues/171
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import bendingLight from '../../bendingLight.js';
// The fraction the objects can float out of the layout bounds
const floatFraction = 0.3;

// Distance of each object from the edge of the screen
const topBottomPadding = 15;
const leftRightPadding = 10;
const FloatingLayout = {
  /**
   * Move the nodes to the edge when the screen resizes, but not too far
   */
  floatRight: (screenView, nodes) => {
    screenView.visibleBoundsProperty.link(visibleBounds => {
      // Let the panels move to the right, but not too far
      const right = Math.min(visibleBounds.right - leftRightPadding, screenView.layoutBounds.width * (1 + floatFraction));
      nodes.forEach(node => {
        node.right = right;
      });
    });
  },
  /**
   * Move the nodes to the edge when the screen resizes, but not too far
   */
  floatLeft: (screenView, nodes, delta = 0) => {
    screenView.visibleBoundsProperty.link(visibleBounds => {
      // Let the panels move to the left, but not too far
      const left = Math.max(visibleBounds.left + leftRightPadding, -screenView.layoutBounds.width * floatFraction);
      nodes.forEach(node => {
        node.left = left + delta;
      });
    });
  },
  /**
   * Move the nodes to the edge when the screen resizes, but not too far
   */
  floatTop: (screenView, nodes) => {
    screenView.visibleBoundsProperty.link(visibleBounds => {
      // Let the panels move to the top, but not too far
      const top = Math.max(visibleBounds.top + topBottomPadding, -screenView.layoutBounds.width * floatFraction);
      nodes.forEach(node => {
        node.top = top;
      });
    });
  },
  /**
   * Move the nodes to the edge when the screen resizes, but not too far
   */
  floatBottom: (screenView, nodes) => {
    screenView.visibleBoundsProperty.link(visibleBounds => {
      // Let the panels move to the bottom, but not too far
      const bottom = Math.min(visibleBounds.bottom - topBottomPadding, screenView.layoutBounds.width * (1 + floatFraction));
      nodes.forEach(node => {
        node.bottom = bottom;
      });
    });
  }
};
bendingLight.register('FloatingLayout', FloatingLayout);
export default FloatingLayout;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJiZW5kaW5nTGlnaHQiLCJmbG9hdEZyYWN0aW9uIiwidG9wQm90dG9tUGFkZGluZyIsImxlZnRSaWdodFBhZGRpbmciLCJGbG9hdGluZ0xheW91dCIsImZsb2F0UmlnaHQiLCJzY3JlZW5WaWV3Iiwibm9kZXMiLCJ2aXNpYmxlQm91bmRzUHJvcGVydHkiLCJsaW5rIiwidmlzaWJsZUJvdW5kcyIsInJpZ2h0IiwiTWF0aCIsIm1pbiIsImxheW91dEJvdW5kcyIsIndpZHRoIiwiZm9yRWFjaCIsIm5vZGUiLCJmbG9hdExlZnQiLCJkZWx0YSIsImxlZnQiLCJtYXgiLCJmbG9hdFRvcCIsInRvcCIsImZsb2F0Qm90dG9tIiwiYm90dG9tIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJGbG9hdGluZ0xheW91dC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNS0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBGbG9hdHMgdGhlIGNvbnRyb2wgcGFuZWxzIGFuZCByZXNldCBhbGwgYnV0dG9ucyB0byB0aGUgcmlnaHQgdG8gZ2l2ZSBhIGJpdCBtb3JlIHJvb20gaW4gdGhlIHBsYXkgYXJlYSBmb3JcclxuICogd2lkZSBzY3JlZW5zLiAgU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9iZW5kaW5nLWxpZ2h0L2lzc3Vlcy8xNzFcclxuICpcclxuICogQGF1dGhvciBTYW0gUmVpZCAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgU2NyZWVuVmlldyBmcm9tICcuLi8uLi8uLi8uLi9qb2lzdC9qcy9TY3JlZW5WaWV3LmpzJztcclxuaW1wb3J0IGJlbmRpbmdMaWdodCBmcm9tICcuLi8uLi9iZW5kaW5nTGlnaHQuanMnO1xyXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IEJvdW5kczIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL0JvdW5kczIuanMnO1xyXG5cclxuLy8gVGhlIGZyYWN0aW9uIHRoZSBvYmplY3RzIGNhbiBmbG9hdCBvdXQgb2YgdGhlIGxheW91dCBib3VuZHNcclxuY29uc3QgZmxvYXRGcmFjdGlvbiA9IDAuMztcclxuXHJcbi8vIERpc3RhbmNlIG9mIGVhY2ggb2JqZWN0IGZyb20gdGhlIGVkZ2Ugb2YgdGhlIHNjcmVlblxyXG5jb25zdCB0b3BCb3R0b21QYWRkaW5nID0gMTU7XHJcbmNvbnN0IGxlZnRSaWdodFBhZGRpbmcgPSAxMDtcclxuXHJcbmNvbnN0IEZsb2F0aW5nTGF5b3V0ID0ge1xyXG5cclxuICAvKipcclxuICAgKiBNb3ZlIHRoZSBub2RlcyB0byB0aGUgZWRnZSB3aGVuIHRoZSBzY3JlZW4gcmVzaXplcywgYnV0IG5vdCB0b28gZmFyXHJcbiAgICovXHJcbiAgZmxvYXRSaWdodDogKCBzY3JlZW5WaWV3OiBTY3JlZW5WaWV3LCBub2RlczogTm9kZVtdICk6IHZvaWQgPT4ge1xyXG4gICAgc2NyZWVuVmlldy52aXNpYmxlQm91bmRzUHJvcGVydHkubGluayggKCB2aXNpYmxlQm91bmRzOiBCb3VuZHMyICkgPT4ge1xyXG5cclxuICAgICAgLy8gTGV0IHRoZSBwYW5lbHMgbW92ZSB0byB0aGUgcmlnaHQsIGJ1dCBub3QgdG9vIGZhclxyXG4gICAgICBjb25zdCByaWdodCA9IE1hdGgubWluKCB2aXNpYmxlQm91bmRzLnJpZ2h0IC0gbGVmdFJpZ2h0UGFkZGluZywgc2NyZWVuVmlldy5sYXlvdXRCb3VuZHMud2lkdGggKiAoIDEgKyBmbG9hdEZyYWN0aW9uICkgKTtcclxuICAgICAgbm9kZXMuZm9yRWFjaCggbm9kZSA9PiB7XHJcbiAgICAgICAgbm9kZS5yaWdodCA9IHJpZ2h0O1xyXG4gICAgICB9ICk7XHJcbiAgICB9ICk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZSB0aGUgbm9kZXMgdG8gdGhlIGVkZ2Ugd2hlbiB0aGUgc2NyZWVuIHJlc2l6ZXMsIGJ1dCBub3QgdG9vIGZhclxyXG4gICAqL1xyXG4gIGZsb2F0TGVmdDogKCBzY3JlZW5WaWV3OiBTY3JlZW5WaWV3LCBub2RlczogTm9kZVtdLCBkZWx0YSA9IDAgKTogdm9pZCA9PiB7XHJcbiAgICBzY3JlZW5WaWV3LnZpc2libGVCb3VuZHNQcm9wZXJ0eS5saW5rKCAoIHZpc2libGVCb3VuZHM6IEJvdW5kczIgKSA9PiB7XHJcblxyXG4gICAgICAvLyBMZXQgdGhlIHBhbmVscyBtb3ZlIHRvIHRoZSBsZWZ0LCBidXQgbm90IHRvbyBmYXJcclxuICAgICAgY29uc3QgbGVmdCA9IE1hdGgubWF4KCB2aXNpYmxlQm91bmRzLmxlZnQgKyBsZWZ0UmlnaHRQYWRkaW5nLCAtc2NyZWVuVmlldy5sYXlvdXRCb3VuZHMud2lkdGggKiBmbG9hdEZyYWN0aW9uICk7XHJcbiAgICAgIG5vZGVzLmZvckVhY2goIG5vZGUgPT4ge1xyXG4gICAgICAgIG5vZGUubGVmdCA9IGxlZnQgKyBkZWx0YTtcclxuICAgICAgfSApO1xyXG4gICAgfSApO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIE1vdmUgdGhlIG5vZGVzIHRvIHRoZSBlZGdlIHdoZW4gdGhlIHNjcmVlbiByZXNpemVzLCBidXQgbm90IHRvbyBmYXJcclxuICAgKi9cclxuICBmbG9hdFRvcDogKCBzY3JlZW5WaWV3OiBTY3JlZW5WaWV3LCBub2RlczogTm9kZVtdICk6IHZvaWQgPT4ge1xyXG4gICAgc2NyZWVuVmlldy52aXNpYmxlQm91bmRzUHJvcGVydHkubGluayggKCB2aXNpYmxlQm91bmRzOiBCb3VuZHMyICkgPT4ge1xyXG5cclxuICAgICAgLy8gTGV0IHRoZSBwYW5lbHMgbW92ZSB0byB0aGUgdG9wLCBidXQgbm90IHRvbyBmYXJcclxuICAgICAgY29uc3QgdG9wID0gTWF0aC5tYXgoIHZpc2libGVCb3VuZHMudG9wICsgdG9wQm90dG9tUGFkZGluZywgLXNjcmVlblZpZXcubGF5b3V0Qm91bmRzLndpZHRoICogZmxvYXRGcmFjdGlvbiApO1xyXG4gICAgICBub2Rlcy5mb3JFYWNoKCBub2RlID0+IHtcclxuICAgICAgICBub2RlLnRvcCA9IHRvcDtcclxuICAgICAgfSApO1xyXG4gICAgfSApO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIE1vdmUgdGhlIG5vZGVzIHRvIHRoZSBlZGdlIHdoZW4gdGhlIHNjcmVlbiByZXNpemVzLCBidXQgbm90IHRvbyBmYXJcclxuICAgKi9cclxuICBmbG9hdEJvdHRvbTogKCBzY3JlZW5WaWV3OiBTY3JlZW5WaWV3LCBub2RlczogTm9kZVtdICk6IHZvaWQgPT4ge1xyXG4gICAgc2NyZWVuVmlldy52aXNpYmxlQm91bmRzUHJvcGVydHkubGluayggKCB2aXNpYmxlQm91bmRzOiBCb3VuZHMyICkgPT4ge1xyXG5cclxuICAgICAgLy8gTGV0IHRoZSBwYW5lbHMgbW92ZSB0byB0aGUgYm90dG9tLCBidXQgbm90IHRvbyBmYXJcclxuICAgICAgY29uc3QgYm90dG9tID0gTWF0aC5taW4oIHZpc2libGVCb3VuZHMuYm90dG9tIC0gdG9wQm90dG9tUGFkZGluZywgc2NyZWVuVmlldy5sYXlvdXRCb3VuZHMud2lkdGggKiAoIDEgKyBmbG9hdEZyYWN0aW9uICkgKTtcclxuICAgICAgbm9kZXMuZm9yRWFjaCggbm9kZSA9PiB7XHJcbiAgICAgICAgbm9kZS5ib3R0b20gPSBib3R0b207XHJcbiAgICAgIH0gKTtcclxuICAgIH0gKTtcclxuICB9XHJcbn07XHJcblxyXG5iZW5kaW5nTGlnaHQucmVnaXN0ZXIoICdGbG9hdGluZ0xheW91dCcsIEZsb2F0aW5nTGF5b3V0ICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGbG9hdGluZ0xheW91dDsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQSxPQUFPQSxZQUFZLE1BQU0sdUJBQXVCO0FBSWhEO0FBQ0EsTUFBTUMsYUFBYSxHQUFHLEdBQUc7O0FBRXpCO0FBQ0EsTUFBTUMs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