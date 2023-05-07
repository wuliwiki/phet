// Copyright 2020-2022, University of Colorado Boulder

/**
 * LeaderLinesNode is a specialized view to display guiding dashed lines from a location to the edge of a bounding box.
 * In the 'Collision Lab' simulation, its purpose is to allow the user to line up Balls within the PlayArea's
 * coordinate system.
 *
 * LeaderLinesNode appears when Balls are being dragged. It contains a method to set the reticle position. They should
 * be instantiated once for every BallNode for multi-touch (since dragging multiple Balls at once is allowed). Like
 * BallNodes, they are created at the start of the sim and are never disposed.
 *
 * @author Brandon Li
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import merge from '../../../../phet-core/js/merge.js';
import { Path } from '../../../../scenery/js/imports.js';
import collisionLab from '../../collisionLab.js';
import CollisionLabColors from '../CollisionLabColors.js';
class LeaderLinesNode extends Path {
  /**
   * @param {Bounds2} leaderLinesBounds - the Bounding box of the lines, in the parent-coordinate frame.
   * @param {Object} [options]
   */
  constructor(leaderLinesBounds, options) {
    assert && assert(leaderLinesBounds instanceof Bounds2, `invalid leaderLinesBounds: ${leaderLinesBounds}`);
    options = merge({
      lineDash: [10, 2],
      stroke: CollisionLabColors.BALL_LEADER_LINES_COLOR
    }, options);
    super(new Shape().makeImmutable(), options);

    //----------------------------------------------------------------------------------------

    // @private {Bounds2} - reference to the passed-in leaderLinesBounds
    this.leaderLinesBounds = leaderLinesBounds;
  }

  /**
   * Sets the position of the reticle (intersection point) of the leader lines, in the parent coordinate-frame.
   * @public
   *
   * @param {Vector2} reticle - in view coordinates
   */
  setReticle(reticle) {
    assert && assert(reticle instanceof Vector2 && reticle.isFinite(), `invalid reticle: ${reticle}`);
    assert && assert(this.leaderLinesBounds.containsPoint(reticle), `reticle out of bounds: ${reticle}`);

    // Update the shape.
    this.shape = new Shape().moveTo(this.leaderLinesBounds.minX, reticle.y).horizontalLineTo(this.leaderLinesBounds.maxX).moveTo(reticle.x, this.leaderLinesBounds.minY).verticalLineTo(this.leaderLinesBounds.maxY).makeImmutable();
  }
}
collisionLab.register('LeaderLinesNode', LeaderLinesNode);
export default LeaderLinesNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCb3VuZHMyIiwiVmVjdG9yMiIsIlNoYXBlIiwibWVyZ2UiLCJQYXRoIiwiY29sbGlzaW9uTGFiIiwiQ29sbGlzaW9uTGFiQ29sb3JzIiwiTGVhZGVyTGluZXNOb2RlIiwiY29uc3RydWN0b3IiLCJsZWFkZXJMaW5lc0JvdW5kcyIsIm9wdGlvbnMiLCJhc3NlcnQiLCJsaW5lRGFzaCIsInN0cm9rZSIsIkJBTExfTEVBREVSX0xJTkVTX0NPTE9SIiwibWFrZUltbXV0YWJsZSIsInNldFJldGljbGUiLCJyZXRpY2xlIiwiaXNGaW5pdGUiLCJjb250YWluc1BvaW50Iiwic2hhcGUiLCJtb3ZlVG8iLCJtaW5YIiwieSIsImhvcml6b250YWxMaW5lVG8iLCJtYXhYIiwieCIsIm1pblkiLCJ2ZXJ0aWNhbExpbmVUbyIsIm1heFkiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkxlYWRlckxpbmVzTm9kZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBMZWFkZXJMaW5lc05vZGUgaXMgYSBzcGVjaWFsaXplZCB2aWV3IHRvIGRpc3BsYXkgZ3VpZGluZyBkYXNoZWQgbGluZXMgZnJvbSBhIGxvY2F0aW9uIHRvIHRoZSBlZGdlIG9mIGEgYm91bmRpbmcgYm94LlxyXG4gKiBJbiB0aGUgJ0NvbGxpc2lvbiBMYWInIHNpbXVsYXRpb24sIGl0cyBwdXJwb3NlIGlzIHRvIGFsbG93IHRoZSB1c2VyIHRvIGxpbmUgdXAgQmFsbHMgd2l0aGluIHRoZSBQbGF5QXJlYSdzXHJcbiAqIGNvb3JkaW5hdGUgc3lzdGVtLlxyXG4gKlxyXG4gKiBMZWFkZXJMaW5lc05vZGUgYXBwZWFycyB3aGVuIEJhbGxzIGFyZSBiZWluZyBkcmFnZ2VkLiBJdCBjb250YWlucyBhIG1ldGhvZCB0byBzZXQgdGhlIHJldGljbGUgcG9zaXRpb24uIFRoZXkgc2hvdWxkXHJcbiAqIGJlIGluc3RhbnRpYXRlZCBvbmNlIGZvciBldmVyeSBCYWxsTm9kZSBmb3IgbXVsdGktdG91Y2ggKHNpbmNlIGRyYWdnaW5nIG11bHRpcGxlIEJhbGxzIGF0IG9uY2UgaXMgYWxsb3dlZCkuIExpa2VcclxuICogQmFsbE5vZGVzLCB0aGV5IGFyZSBjcmVhdGVkIGF0IHRoZSBzdGFydCBvZiB0aGUgc2ltIGFuZCBhcmUgbmV2ZXIgZGlzcG9zZWQuXHJcbiAqXHJcbiAqIEBhdXRob3IgQnJhbmRvbiBMaVxyXG4gKi9cclxuXHJcbmltcG9ydCBCb3VuZHMyIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9Cb3VuZHMyLmpzJztcclxuaW1wb3J0IFZlY3RvcjIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1ZlY3RvcjIuanMnO1xyXG5pbXBvcnQgeyBTaGFwZSB9IGZyb20gJy4uLy4uLy4uLy4uL2tpdGUvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBtZXJnZSBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvbWVyZ2UuanMnO1xyXG5pbXBvcnQgeyBQYXRoIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IGNvbGxpc2lvbkxhYiBmcm9tICcuLi8uLi9jb2xsaXNpb25MYWIuanMnO1xyXG5pbXBvcnQgQ29sbGlzaW9uTGFiQ29sb3JzIGZyb20gJy4uL0NvbGxpc2lvbkxhYkNvbG9ycy5qcyc7XHJcblxyXG5jbGFzcyBMZWFkZXJMaW5lc05vZGUgZXh0ZW5kcyBQYXRoIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtCb3VuZHMyfSBsZWFkZXJMaW5lc0JvdW5kcyAtIHRoZSBCb3VuZGluZyBib3ggb2YgdGhlIGxpbmVzLCBpbiB0aGUgcGFyZW50LWNvb3JkaW5hdGUgZnJhbWUuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBsZWFkZXJMaW5lc0JvdW5kcywgb3B0aW9ucyApIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIGxlYWRlckxpbmVzQm91bmRzIGluc3RhbmNlb2YgQm91bmRzMiwgYGludmFsaWQgbGVhZGVyTGluZXNCb3VuZHM6ICR7bGVhZGVyTGluZXNCb3VuZHN9YCApO1xyXG5cclxuICAgIG9wdGlvbnMgPSBtZXJnZSgge1xyXG5cclxuICAgICAgbGluZURhc2g6IFsgMTAsIDIgXSxcclxuICAgICAgc3Ryb2tlOiBDb2xsaXNpb25MYWJDb2xvcnMuQkFMTF9MRUFERVJfTElORVNfQ09MT1JcclxuXHJcbiAgICB9LCBvcHRpb25zICk7XHJcblxyXG4gICAgc3VwZXIoIG5ldyBTaGFwZSgpLm1ha2VJbW11dGFibGUoKSwgb3B0aW9ucyApO1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIEBwcml2YXRlIHtCb3VuZHMyfSAtIHJlZmVyZW5jZSB0byB0aGUgcGFzc2VkLWluIGxlYWRlckxpbmVzQm91bmRzXHJcbiAgICB0aGlzLmxlYWRlckxpbmVzQm91bmRzID0gbGVhZGVyTGluZXNCb3VuZHM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgcmV0aWNsZSAoaW50ZXJzZWN0aW9uIHBvaW50KSBvZiB0aGUgbGVhZGVyIGxpbmVzLCBpbiB0aGUgcGFyZW50IGNvb3JkaW5hdGUtZnJhbWUuXHJcbiAgICogQHB1YmxpY1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtWZWN0b3IyfSByZXRpY2xlIC0gaW4gdmlldyBjb29yZGluYXRlc1xyXG4gICAqL1xyXG4gIHNldFJldGljbGUoIHJldGljbGUgKSB7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCByZXRpY2xlIGluc3RhbmNlb2YgVmVjdG9yMiAmJiByZXRpY2xlLmlzRmluaXRlKCksIGBpbnZhbGlkIHJldGljbGU6ICR7cmV0aWNsZX1gICk7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCB0aGlzLmxlYWRlckxpbmVzQm91bmRzLmNvbnRhaW5zUG9pbnQoIHJldGljbGUgKSwgYHJldGljbGUgb3V0IG9mIGJvdW5kczogJHtyZXRpY2xlfWAgKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgdGhlIHNoYXBlLlxyXG4gICAgdGhpcy5zaGFwZSA9IG5ldyBTaGFwZSgpXHJcbiAgICAgIC5tb3ZlVG8oIHRoaXMubGVhZGVyTGluZXNCb3VuZHMubWluWCwgcmV0aWNsZS55IClcclxuICAgICAgLmhvcml6b250YWxMaW5lVG8oIHRoaXMubGVhZGVyTGluZXNCb3VuZHMubWF4WCApXHJcbiAgICAgIC5tb3ZlVG8oIHJldGljbGUueCwgdGhpcy5sZWFkZXJMaW5lc0JvdW5kcy5taW5ZIClcclxuICAgICAgLnZlcnRpY2FsTGluZVRvKCB0aGlzLmxlYWRlckxpbmVzQm91bmRzLm1heFkgKVxyXG4gICAgICAubWFrZUltbXV0YWJsZSgpO1xyXG4gIH1cclxufVxyXG5cclxuY29sbGlzaW9uTGFiLnJlZ2lzdGVyKCAnTGVhZGVyTGluZXNOb2RlJywgTGVhZGVyTGluZXNOb2RlICk7XHJcbmV4cG9ydCBkZWZhdWx0IExlYWRlckxpbmVzTm9kZTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsT0FBTyxNQUFNLCtCQUErQjtBQUNuRCxPQUFPQyxPQUFPLE1BQU0sK0JBQStCO0FBQ25ELFNBQVNDLEtBQUssUUFBUSxnQ0FBZ0M7QUFDdEQsT0FBT0MsS0FBSyxNQUFNLG1DQUFtQztBQUNyRCxTQUFTQyxJQUFJLFFBQVEsbUNBQW1DO0FBQ3hELE9BQU9DLFlBQVksTUFBTSx1QkFBdUI7QUFDaEQsT0FBT0Msa0JBQWtCLE1BQU0sMEJBQTBCO0FBRXpELE1BQU1DLGVBQWUsU0FBU0gsSUFBSSxDQUFDO0VBRWpDO0FBQ0Y7QUFDQTtBQUNBO0VBQ0VJLFdBQVdBLENBQUVDLGlCQUFpQixFQUFFQyxPQUFPLEVBQUc7SUFDeENDLE1BQU0sSUFBSUEsTUFBTSxDQUFFRixpQkFBaUIsWUFBWVQsT0FBTyxFQUFHLDhCQUE2QlMsaUJBQWtCLEVBQUUsQ0FBQztJQUUzR0MsT0FBTyxHQUFHUCxLQUFLLENBQUU7TUFFZlMsUUFBUSxFQUFFLENBQUUsRUFBRSxFQUFFLENBQUMsQ0FBRTtNQUNuQkMsTUFBTSxFQUFFUCxrQkFBa0IsQ0FBQ1E7SUFFN0IsQ0FBQyxFQUFFSixPQUFRLENBQUM7SUFFWixLQUFLLENBQUUsSUFBSVIsS0FBSyxDQUFDLENBQUMsQ0FBQ2EsYUFBYSxDQUFDLENBQUMsRUFBRUwsT0FBUSxDQUFDOztJQUU3Qzs7SUFFQTtJQUNBLElBQUksQ0FBQ0QsaUJBQWlCLEdBQUdBLGlCQUFpQjtFQUM1Qzs7RUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDRU8sVUFBVUEsQ0FBRUMsT0FBTyxFQUFHO0lBQ3BCTixNQUFNLElBQUlBLE1BQU0sQ0FBRU0sT0FBTyxZQUFZaEIsT0FBTyxJQUFJZ0IsT0FBTyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxFQUFHLG9CQUFtQkQsT0FBUSxFQUFFLENBQUM7SUFDbkdOLE1BQU0sSUFBSUEsTUFBTSxDQUFFLElBQUksQ0FBQ0YsaUJBQWlCLENBQUNVLGFBQWEsQ0FBRUYsT0FBUSxDQUFDLEVBQUcsMEJBQXlCQSxPQUFRLEVBQUUsQ0FBQzs7SUFFeEc7SUFDQSxJQUFJLENBQUNHLEtBQUssR0FBRyxJQUFJbEIsS0FBSyxDQUFDLENBQUMsQ0FDckJtQixNQUFNLENBQUUsSUFBSSxDQUFDWixpQkFBaUIsQ0FBQ2EsSUFBSSxFQUFFTCxPQUFPLENBQUNNLENBQUUsQ0FBQyxDQUNoREMsZ0JBQWdCLENBQUUsSUFBSSxDQUFDZixpQkFBaUIsQ0FBQ2dCLElBQUssQ0FBQyxDQUMvQ0osTUFBTSxDQUFFSixPQUFPLENBQUNTLENBQUMsRUFBRSxJQUFJLENBQUNqQixpQkFBaUIsQ0FBQ2tCLElBQUssQ0FBQyxDQUNoREMsY0FBYyxDQUFFLElBQUksQ0FBQ25CLGlCQUFpQixDQUFDb0IsSUFBSyxDQUFDLENBQzdDZCxhQUFhLENBQUMsQ0FBQztFQUNwQjtBQUNGO0FBRUFWLFlBQVksQ0FBQ3lCLFFBQVEsQ0FBRSxpQkFBaUIsRUFBRXZCLGVBQWdCLENBQUM7QUFDM0QsZUFBZUEsZUFBZSJ9