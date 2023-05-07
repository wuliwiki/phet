// Copyright 2018-2020, University of Colorado Boulder

/**
 * The rectangular variant of a piece node.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import merge from '../../../../../phet-core/js/merge.js';
import fractionsCommon from '../../../fractionsCommon.js';
import PieceNode from '../PieceNode.js';
import RectangularNode from './RectangularNode.js';
class RectangularPieceNode extends PieceNode {
  /**
   * @param {Piece} piece
   * @param {function} finishedAnimatingCallback - Called as function( {Piece} ) with the piece to finish animating.
   * @param {function} droppedCallback - Called as function( {Piece} )
   * @param {Object} [options]
   */
  constructor(piece, finishedAnimatingCallback, droppedCallback, options) {
    super(piece, finishedAnimatingCallback, droppedCallback, {
      graphic: new RectangularNode(piece.denominator, merge({
        dropShadow: true
      }, options))
    });
    this.mutate(options);
  }

  /**
   * Releases references.
   * @public
   * @override
   */
  dispose() {
    this.interruptSubtreeInput();
    super.dispose();
  }
}
fractionsCommon.register('RectangularPieceNode', RectangularPieceNode);
export default RectangularPieceNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtZXJnZSIsImZyYWN0aW9uc0NvbW1vbiIsIlBpZWNlTm9kZSIsIlJlY3Rhbmd1bGFyTm9kZSIsIlJlY3Rhbmd1bGFyUGllY2VOb2RlIiwiY29uc3RydWN0b3IiLCJwaWVjZSIsImZpbmlzaGVkQW5pbWF0aW5nQ2FsbGJhY2siLCJkcm9wcGVkQ2FsbGJhY2siLCJvcHRpb25zIiwiZ3JhcGhpYyIsImRlbm9taW5hdG9yIiwiZHJvcFNoYWRvdyIsIm11dGF0ZSIsImRpc3Bvc2UiLCJpbnRlcnJ1cHRTdWJ0cmVlSW5wdXQiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlJlY3Rhbmd1bGFyUGllY2VOb2RlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjAsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFRoZSByZWN0YW5ndWxhciB2YXJpYW50IG9mIGEgcGllY2Ugbm9kZS5cclxuICpcclxuICogQGF1dGhvciBKb25hdGhhbiBPbHNvbiA8am9uYXRoYW4ub2xzb25AY29sb3JhZG8uZWR1PlxyXG4gKi9cclxuXHJcbmltcG9ydCBtZXJnZSBmcm9tICcuLi8uLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvbWVyZ2UuanMnO1xyXG5pbXBvcnQgZnJhY3Rpb25zQ29tbW9uIGZyb20gJy4uLy4uLy4uL2ZyYWN0aW9uc0NvbW1vbi5qcyc7XHJcbmltcG9ydCBQaWVjZU5vZGUgZnJvbSAnLi4vUGllY2VOb2RlLmpzJztcclxuaW1wb3J0IFJlY3Rhbmd1bGFyTm9kZSBmcm9tICcuL1JlY3Rhbmd1bGFyTm9kZS5qcyc7XHJcblxyXG5jbGFzcyBSZWN0YW5ndWxhclBpZWNlTm9kZSBleHRlbmRzIFBpZWNlTm9kZSB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtQaWVjZX0gcGllY2VcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmaW5pc2hlZEFuaW1hdGluZ0NhbGxiYWNrIC0gQ2FsbGVkIGFzIGZ1bmN0aW9uKCB7UGllY2V9ICkgd2l0aCB0aGUgcGllY2UgdG8gZmluaXNoIGFuaW1hdGluZy5cclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBkcm9wcGVkQ2FsbGJhY2sgLSBDYWxsZWQgYXMgZnVuY3Rpb24oIHtQaWVjZX0gKVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggcGllY2UsIGZpbmlzaGVkQW5pbWF0aW5nQ2FsbGJhY2ssIGRyb3BwZWRDYWxsYmFjaywgb3B0aW9ucyApIHtcclxuICAgIHN1cGVyKCBwaWVjZSwgZmluaXNoZWRBbmltYXRpbmdDYWxsYmFjaywgZHJvcHBlZENhbGxiYWNrLCB7XHJcbiAgICAgIGdyYXBoaWM6IG5ldyBSZWN0YW5ndWxhck5vZGUoIHBpZWNlLmRlbm9taW5hdG9yLCBtZXJnZSgge1xyXG4gICAgICAgIGRyb3BTaGFkb3c6IHRydWVcclxuICAgICAgfSwgb3B0aW9ucyApIClcclxuICAgIH0gKTtcclxuXHJcbiAgICB0aGlzLm11dGF0ZSggb3B0aW9ucyApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVsZWFzZXMgcmVmZXJlbmNlcy5cclxuICAgKiBAcHVibGljXHJcbiAgICogQG92ZXJyaWRlXHJcbiAgICovXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIHRoaXMuaW50ZXJydXB0U3VidHJlZUlucHV0KCk7XHJcblxyXG4gICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZnJhY3Rpb25zQ29tbW9uLnJlZ2lzdGVyKCAnUmVjdGFuZ3VsYXJQaWVjZU5vZGUnLCBSZWN0YW5ndWxhclBpZWNlTm9kZSApO1xyXG5leHBvcnQgZGVmYXVsdCBSZWN0YW5ndWxhclBpZWNlTm9kZTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBSyxNQUFNLHNDQUFzQztBQUN4RCxPQUFPQyxlQUFlLE1BQU0sNkJBQTZCO0FBQ3pELE9BQU9DLFNBQVMsTUFBTSxpQkFBaUI7QUFDdkMsT0FBT0MsZUFBZSxNQUFNLHNCQUFzQjtBQUVsRCxNQUFNQyxvQkFBb0IsU0FBU0YsU0FBUyxDQUFDO0VBQzNDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFRyxXQUFXQSxDQUFFQyxLQUFLLEVBQUVDLHlCQUF5QixFQUFFQyxlQUFlLEVBQUVDLE9BQU8sRUFBRztJQUN4RSxLQUFLLENBQUVILEtBQUssRUFBRUMseUJBQXlCLEVBQUVDLGVBQWUsRUFBRTtNQUN4REUsT0FBTyxFQUFFLElBQUlQLGVBQWUsQ0FBRUcsS0FBSyxDQUFDSyxXQUFXLEVBQUVYLEtBQUssQ0FBRTtRQUN0RFksVUFBVSxFQUFFO01BQ2QsQ0FBQyxFQUFFSCxPQUFRLENBQUU7SUFDZixDQUFFLENBQUM7SUFFSCxJQUFJLENBQUNJLE1BQU0sQ0FBRUosT0FBUSxDQUFDO0VBQ3hCOztFQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7RUFDRUssT0FBT0EsQ0FBQSxFQUFHO0lBQ1IsSUFBSSxDQUFDQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRTVCLEtBQUssQ0FBQ0QsT0FBTyxDQUFDLENBQUM7RUFDakI7QUFDRjtBQUVBYixlQUFlLENBQUNlLFFBQVEsQ0FBRSxzQkFBc0IsRUFBRVosb0JBQXFCLENBQUM7QUFDeEUsZUFBZUEsb0JBQW9CIn0=