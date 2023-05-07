// Copyright 2020-2022, University of Colorado Boulder

/**
 * A view that renders the trailing 'Paths' behind all Balls and the Center of Mass, using their PathDataPoints array.
 *
 * PathsNode subtypes CanvasNode to linearly reduce the stroke-alpha to give a "fade over-time" illusion. Opacity is
 * determined by how long ago the PathDataPoint was recorded. See https://github.com/phetsims/collision-lab/issues/61
 * for context on the decision to use CanvasNode.
 *
 * For performance reasons, PathsNode draws all 'Paths' in one canvas instead of having one PathNode for each
 * Ball and CenterOfMass, including for Balls that aren't in the system. There is no performance loss since Balls that
 * aren't in the BallSystem have empty Paths and all moving objects have empty paths if 'Paths' are not visible.
 *
 * NOTE: Do not translate this node. It's origin must be at the origin of the view coordinate frame.
 *
 * @author Brandon Li
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { CanvasNode, Color, PaintDef } from '../../../../scenery/js/imports.js';
import collisionLab from '../../collisionLab.js';
import CollisionLabColors from '../CollisionLabColors.js';
import Ball from '../model/Ball.js';
import CollisionLabPath from '../model/CollisionLabPath.js';

// constants
const LINE_WIDTH = 2.3; // lineWidth of Paths

class PathsNode extends CanvasNode {
  /**
   * @param {Ball[]} prepopulatedBalls - an array of All possible balls in the system.
   * @param {CollisionLabPath} centerOfMassPath - path of the CenterOfMass of the system.
   * @param {Bounds2} playAreaBounds
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   */
  constructor(prepopulatedBalls, centerOfMassPath, playAreaBounds, modelViewTransform, options) {
    assert && AssertUtils.assertArrayOf(prepopulatedBalls, Ball);
    assert && assert(centerOfMassPath instanceof CollisionLabPath, `invalid centerOfMassPath: ${centerOfMassPath}`);
    assert && assert(playAreaBounds instanceof Bounds2, `invalid playAreaBounds: ${playAreaBounds}`);
    assert && assert(modelViewTransform instanceof ModelViewTransform2, `invalid modelViewTransform: ${modelViewTransform}`);
    options = merge({
      // superclass options
      canvasBounds: modelViewTransform.modelToViewBounds(playAreaBounds)
    }, options);
    super(options);

    // @private {Ball[]} - reference the passed-in prepopulatedBalls.
    this.prepopulatedBalls = prepopulatedBalls;

    // @private {CollisionLabPath[]} - reference the passed-in centerOfMassPath.
    this.centerOfMassPath = centerOfMassPath;

    // @private {ModelViewTransform2} - reference the passed-in modelViewTransform.
    this.modelViewTransform = modelViewTransform;

    // @private {Color} - mutated in critical code to reduce the number of redundant Color instances.
    this.scratchColor = new Color(0, 0, 0);

    //----------------------------------------------------------------------------------------

    // Observe when any of the trailing 'Paths' have changed and should be redrawn to call invalidatePaint(). Listeners
    // are never removed since CollisionLabPaths are never disposed and persist for the lifetime of the simulation.
    [centerOfMassPath, ...prepopulatedBalls.map(ball => ball.path)].forEach(path => {
      // When a path has changed, it results in a call to paintCanvas.
      path.pathChangedEmitter.addListener(this.invalidatePaint.bind(this));
    });
  }

  /**
   * Draws the path along the data points of the Path.
   * @private
   *
   * @param {CollisionLabPath} path - the model for the Path
   * @param {PaintDef} baseColor - the base color of the Path. Alpha will be linearly reduced.
   * @param {CanvasRenderingContext2D} context
   */
  drawPath(path, baseColor, context) {
    assert && assert(PaintDef.isPaintDef(baseColor), `invalid baseColor: ${baseColor}`);
    assert && assert(path instanceof CollisionLabPath, `invalid path: ${path}`);
    assert && assert(context instanceof CanvasRenderingContext2D, `invalid context: ${context}`);

    // If there aren't enough PathDataPoints, do not repaint.
    if (path.dataPoints.length <= 1) {
      return; /* Do nothing */
    }

    // Reference the time of the first and last PathDataPoints.
    const firstPathDataPointTime = path.dataPoints[0].time;
    const lastPathDataPointTime = _.last(path.dataPoints).time;

    // Draw the segments that connect each of the PathDataPoints by iterating pairwise. Storing the previous view
    // position, so we will only need to compute the view position of each point once.
    let previousViewPosition = path.dataPoints.length ? this.modelViewTransform.modelToViewPosition(path.dataPoints[0].position) : new Vector2(0, 0);
    for (let i = 1; i < path.dataPoints.length; i++) {
      const dataPoint = path.dataPoints[i];

      // Each segment of the dataPoint path needs a new canvas path to create the gradient effect.
      context.beginPath();

      // Get the start and end positions of the line-segment.
      const segmentStartPosition = previousViewPosition;
      const segmentEndPosition = this.modelViewTransform.modelToViewPosition(dataPoint.position);
      previousViewPosition = segmentEndPosition;

      // Draw the line-segment that connects the start and end positions.
      context.moveTo(segmentStartPosition.x, segmentStartPosition.y);
      context.lineTo(segmentEndPosition.x, segmentEndPosition.y);

      // Linearly reduce the stroke-alpha to give a "fade over-time" illusion.
      const alpha = Utils.linear(firstPathDataPointTime, lastPathDataPointTime, 0, 1, dataPoint.time);

      // Using built-in toFixed for performance reasons (similar to Color.computeCSS()), and in addition avoiding a lot
      // of the mutation and overhead by just directly creating the CSS color string.
      context.strokeStyle = `rgba(${baseColor.r},${baseColor.g},${baseColor.b},${Utils.toFixed(alpha, 20)})`;
      context.stroke();
    }
  }

  /**
   * Draws the 'Paths' behind all Balls and the Center of Mass.
   * @public
   * @override
   *
   * @param {CanvasRenderingContext2D} context
   */
  paintCanvas(context) {
    assert && assert(context instanceof CanvasRenderingContext2D, `invalid context: ${context}`);

    // Set once only for performance.
    context.lineWidth = LINE_WIDTH;

    // First draw the trailing 'Paths' behind every Ball.
    for (let i = 0; i < this.prepopulatedBalls.length; i++) {
      const ball = this.prepopulatedBalls[i];
      this.drawPath(ball.path, CollisionLabColors.BALL_COLORS[ball.index - 1], context);
    }

    // Draw the trailing 'Path' behind the CenterOfMass.
    this.drawPath(this.centerOfMassPath, CollisionLabColors.CENTER_OF_MASS_FILL, context);
  }
}
collisionLab.register('PathsNode', PathsNode);
export default PathsNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCb3VuZHMyIiwiVXRpbHMiLCJWZWN0b3IyIiwibWVyZ2UiLCJBc3NlcnRVdGlscyIsIk1vZGVsVmlld1RyYW5zZm9ybTIiLCJDYW52YXNOb2RlIiwiQ29sb3IiLCJQYWludERlZiIsImNvbGxpc2lvbkxhYiIsIkNvbGxpc2lvbkxhYkNvbG9ycyIsIkJhbGwiLCJDb2xsaXNpb25MYWJQYXRoIiwiTElORV9XSURUSCIsIlBhdGhzTm9kZSIsImNvbnN0cnVjdG9yIiwicHJlcG9wdWxhdGVkQmFsbHMiLCJjZW50ZXJPZk1hc3NQYXRoIiwicGxheUFyZWFCb3VuZHMiLCJtb2RlbFZpZXdUcmFuc2Zvcm0iLCJvcHRpb25zIiwiYXNzZXJ0IiwiYXNzZXJ0QXJyYXlPZiIsImNhbnZhc0JvdW5kcyIsIm1vZGVsVG9WaWV3Qm91bmRzIiwic2NyYXRjaENvbG9yIiwibWFwIiwiYmFsbCIsInBhdGgiLCJmb3JFYWNoIiwicGF0aENoYW5nZWRFbWl0dGVyIiwiYWRkTGlzdGVuZXIiLCJpbnZhbGlkYXRlUGFpbnQiLCJiaW5kIiwiZHJhd1BhdGgiLCJiYXNlQ29sb3IiLCJjb250ZXh0IiwiaXNQYWludERlZiIsIkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCIsImRhdGFQb2ludHMiLCJsZW5ndGgiLCJmaXJzdFBhdGhEYXRhUG9pbnRUaW1lIiwidGltZSIsImxhc3RQYXRoRGF0YVBvaW50VGltZSIsIl8iLCJsYXN0IiwicHJldmlvdXNWaWV3UG9zaXRpb24iLCJtb2RlbFRvVmlld1Bvc2l0aW9uIiwicG9zaXRpb24iLCJpIiwiZGF0YVBvaW50IiwiYmVnaW5QYXRoIiwic2VnbWVudFN0YXJ0UG9zaXRpb24iLCJzZWdtZW50RW5kUG9zaXRpb24iLCJtb3ZlVG8iLCJ4IiwieSIsImxpbmVUbyIsImFscGhhIiwibGluZWFyIiwic3Ryb2tlU3R5bGUiLCJyIiwiZyIsImIiLCJ0b0ZpeGVkIiwic3Ryb2tlIiwicGFpbnRDYW52YXMiLCJsaW5lV2lkdGgiLCJCQUxMX0NPTE9SUyIsImluZGV4IiwiQ0VOVEVSX09GX01BU1NfRklMTCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiUGF0aHNOb2RlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIEEgdmlldyB0aGF0IHJlbmRlcnMgdGhlIHRyYWlsaW5nICdQYXRocycgYmVoaW5kIGFsbCBCYWxscyBhbmQgdGhlIENlbnRlciBvZiBNYXNzLCB1c2luZyB0aGVpciBQYXRoRGF0YVBvaW50cyBhcnJheS5cclxuICpcclxuICogUGF0aHNOb2RlIHN1YnR5cGVzIENhbnZhc05vZGUgdG8gbGluZWFybHkgcmVkdWNlIHRoZSBzdHJva2UtYWxwaGEgdG8gZ2l2ZSBhIFwiZmFkZSBvdmVyLXRpbWVcIiBpbGx1c2lvbi4gT3BhY2l0eSBpc1xyXG4gKiBkZXRlcm1pbmVkIGJ5IGhvdyBsb25nIGFnbyB0aGUgUGF0aERhdGFQb2ludCB3YXMgcmVjb3JkZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vcGhldHNpbXMvY29sbGlzaW9uLWxhYi9pc3N1ZXMvNjFcclxuICogZm9yIGNvbnRleHQgb24gdGhlIGRlY2lzaW9uIHRvIHVzZSBDYW52YXNOb2RlLlxyXG4gKlxyXG4gKiBGb3IgcGVyZm9ybWFuY2UgcmVhc29ucywgUGF0aHNOb2RlIGRyYXdzIGFsbCAnUGF0aHMnIGluIG9uZSBjYW52YXMgaW5zdGVhZCBvZiBoYXZpbmcgb25lIFBhdGhOb2RlIGZvciBlYWNoXHJcbiAqIEJhbGwgYW5kIENlbnRlck9mTWFzcywgaW5jbHVkaW5nIGZvciBCYWxscyB0aGF0IGFyZW4ndCBpbiB0aGUgc3lzdGVtLiBUaGVyZSBpcyBubyBwZXJmb3JtYW5jZSBsb3NzIHNpbmNlIEJhbGxzIHRoYXRcclxuICogYXJlbid0IGluIHRoZSBCYWxsU3lzdGVtIGhhdmUgZW1wdHkgUGF0aHMgYW5kIGFsbCBtb3Zpbmcgb2JqZWN0cyBoYXZlIGVtcHR5IHBhdGhzIGlmICdQYXRocycgYXJlIG5vdCB2aXNpYmxlLlxyXG4gKlxyXG4gKiBOT1RFOiBEbyBub3QgdHJhbnNsYXRlIHRoaXMgbm9kZS4gSXQncyBvcmlnaW4gbXVzdCBiZSBhdCB0aGUgb3JpZ2luIG9mIHRoZSB2aWV3IGNvb3JkaW5hdGUgZnJhbWUuXHJcbiAqXHJcbiAqIEBhdXRob3IgQnJhbmRvbiBMaVxyXG4gKi9cclxuXHJcbmltcG9ydCBCb3VuZHMyIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9Cb3VuZHMyLmpzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9VdGlscy5qcyc7XHJcbmltcG9ydCBWZWN0b3IyIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9WZWN0b3IyLmpzJztcclxuaW1wb3J0IG1lcmdlIGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9tZXJnZS5qcyc7XHJcbmltcG9ydCBBc3NlcnRVdGlscyBmcm9tICcuLi8uLi8uLi8uLi9waGV0Y29tbW9uL2pzL0Fzc2VydFV0aWxzLmpzJztcclxuaW1wb3J0IE1vZGVsVmlld1RyYW5zZm9ybTIgZnJvbSAnLi4vLi4vLi4vLi4vcGhldGNvbW1vbi9qcy92aWV3L01vZGVsVmlld1RyYW5zZm9ybTIuanMnO1xyXG5pbXBvcnQgeyBDYW52YXNOb2RlLCBDb2xvciwgUGFpbnREZWYgfSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgY29sbGlzaW9uTGFiIGZyb20gJy4uLy4uL2NvbGxpc2lvbkxhYi5qcyc7XHJcbmltcG9ydCBDb2xsaXNpb25MYWJDb2xvcnMgZnJvbSAnLi4vQ29sbGlzaW9uTGFiQ29sb3JzLmpzJztcclxuaW1wb3J0IEJhbGwgZnJvbSAnLi4vbW9kZWwvQmFsbC5qcyc7XHJcbmltcG9ydCBDb2xsaXNpb25MYWJQYXRoIGZyb20gJy4uL21vZGVsL0NvbGxpc2lvbkxhYlBhdGguanMnO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IExJTkVfV0lEVEggPSAyLjM7IC8vIGxpbmVXaWR0aCBvZiBQYXRoc1xyXG5cclxuY2xhc3MgUGF0aHNOb2RlIGV4dGVuZHMgQ2FudmFzTm9kZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7QmFsbFtdfSBwcmVwb3B1bGF0ZWRCYWxscyAtIGFuIGFycmF5IG9mIEFsbCBwb3NzaWJsZSBiYWxscyBpbiB0aGUgc3lzdGVtLlxyXG4gICAqIEBwYXJhbSB7Q29sbGlzaW9uTGFiUGF0aH0gY2VudGVyT2ZNYXNzUGF0aCAtIHBhdGggb2YgdGhlIENlbnRlck9mTWFzcyBvZiB0aGUgc3lzdGVtLlxyXG4gICAqIEBwYXJhbSB7Qm91bmRzMn0gcGxheUFyZWFCb3VuZHNcclxuICAgKiBAcGFyYW0ge01vZGVsVmlld1RyYW5zZm9ybTJ9IG1vZGVsVmlld1RyYW5zZm9ybVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggcHJlcG9wdWxhdGVkQmFsbHMsIGNlbnRlck9mTWFzc1BhdGgsIHBsYXlBcmVhQm91bmRzLCBtb2RlbFZpZXdUcmFuc2Zvcm0sIG9wdGlvbnMgKSB7XHJcbiAgICBhc3NlcnQgJiYgQXNzZXJ0VXRpbHMuYXNzZXJ0QXJyYXlPZiggcHJlcG9wdWxhdGVkQmFsbHMsIEJhbGwgKTtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIGNlbnRlck9mTWFzc1BhdGggaW5zdGFuY2VvZiBDb2xsaXNpb25MYWJQYXRoLCBgaW52YWxpZCBjZW50ZXJPZk1hc3NQYXRoOiAke2NlbnRlck9mTWFzc1BhdGh9YCApO1xyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggcGxheUFyZWFCb3VuZHMgaW5zdGFuY2VvZiBCb3VuZHMyLCBgaW52YWxpZCBwbGF5QXJlYUJvdW5kczogJHtwbGF5QXJlYUJvdW5kc31gICk7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCBtb2RlbFZpZXdUcmFuc2Zvcm0gaW5zdGFuY2VvZiBNb2RlbFZpZXdUcmFuc2Zvcm0yLCBgaW52YWxpZCBtb2RlbFZpZXdUcmFuc2Zvcm06ICR7bW9kZWxWaWV3VHJhbnNmb3JtfWAgKTtcclxuXHJcbiAgICBvcHRpb25zID0gbWVyZ2UoIHtcclxuXHJcbiAgICAgIC8vIHN1cGVyY2xhc3Mgb3B0aW9uc1xyXG4gICAgICBjYW52YXNCb3VuZHM6IG1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld0JvdW5kcyggcGxheUFyZWFCb3VuZHMgKVxyXG5cclxuICAgIH0sIG9wdGlvbnMgKTtcclxuXHJcbiAgICBzdXBlciggb3B0aW9ucyApO1xyXG5cclxuICAgIC8vIEBwcml2YXRlIHtCYWxsW119IC0gcmVmZXJlbmNlIHRoZSBwYXNzZWQtaW4gcHJlcG9wdWxhdGVkQmFsbHMuXHJcbiAgICB0aGlzLnByZXBvcHVsYXRlZEJhbGxzID0gcHJlcG9wdWxhdGVkQmFsbHM7XHJcblxyXG4gICAgLy8gQHByaXZhdGUge0NvbGxpc2lvbkxhYlBhdGhbXX0gLSByZWZlcmVuY2UgdGhlIHBhc3NlZC1pbiBjZW50ZXJPZk1hc3NQYXRoLlxyXG4gICAgdGhpcy5jZW50ZXJPZk1hc3NQYXRoID0gY2VudGVyT2ZNYXNzUGF0aDtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZSB7TW9kZWxWaWV3VHJhbnNmb3JtMn0gLSByZWZlcmVuY2UgdGhlIHBhc3NlZC1pbiBtb2RlbFZpZXdUcmFuc2Zvcm0uXHJcbiAgICB0aGlzLm1vZGVsVmlld1RyYW5zZm9ybSA9IG1vZGVsVmlld1RyYW5zZm9ybTtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZSB7Q29sb3J9IC0gbXV0YXRlZCBpbiBjcml0aWNhbCBjb2RlIHRvIHJlZHVjZSB0aGUgbnVtYmVyIG9mIHJlZHVuZGFudCBDb2xvciBpbnN0YW5jZXMuXHJcbiAgICB0aGlzLnNjcmF0Y2hDb2xvciA9IG5ldyBDb2xvciggMCwgMCwgMCApO1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIE9ic2VydmUgd2hlbiBhbnkgb2YgdGhlIHRyYWlsaW5nICdQYXRocycgaGF2ZSBjaGFuZ2VkIGFuZCBzaG91bGQgYmUgcmVkcmF3biB0byBjYWxsIGludmFsaWRhdGVQYWludCgpLiBMaXN0ZW5lcnNcclxuICAgIC8vIGFyZSBuZXZlciByZW1vdmVkIHNpbmNlIENvbGxpc2lvbkxhYlBhdGhzIGFyZSBuZXZlciBkaXNwb3NlZCBhbmQgcGVyc2lzdCBmb3IgdGhlIGxpZmV0aW1lIG9mIHRoZSBzaW11bGF0aW9uLlxyXG4gICAgWyBjZW50ZXJPZk1hc3NQYXRoLCAuLi5wcmVwb3B1bGF0ZWRCYWxscy5tYXAoIGJhbGwgPT4gYmFsbC5wYXRoICkgXS5mb3JFYWNoKCBwYXRoID0+IHtcclxuXHJcbiAgICAgIC8vIFdoZW4gYSBwYXRoIGhhcyBjaGFuZ2VkLCBpdCByZXN1bHRzIGluIGEgY2FsbCB0byBwYWludENhbnZhcy5cclxuICAgICAgcGF0aC5wYXRoQ2hhbmdlZEVtaXR0ZXIuYWRkTGlzdGVuZXIoIHRoaXMuaW52YWxpZGF0ZVBhaW50LmJpbmQoIHRoaXMgKSApO1xyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRHJhd3MgdGhlIHBhdGggYWxvbmcgdGhlIGRhdGEgcG9pbnRzIG9mIHRoZSBQYXRoLlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0NvbGxpc2lvbkxhYlBhdGh9IHBhdGggLSB0aGUgbW9kZWwgZm9yIHRoZSBQYXRoXHJcbiAgICogQHBhcmFtIHtQYWludERlZn0gYmFzZUNvbG9yIC0gdGhlIGJhc2UgY29sb3Igb2YgdGhlIFBhdGguIEFscGhhIHdpbGwgYmUgbGluZWFybHkgcmVkdWNlZC5cclxuICAgKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxyXG4gICAqL1xyXG4gIGRyYXdQYXRoKCBwYXRoLCBiYXNlQ29sb3IsIGNvbnRleHQgKSB7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCBQYWludERlZi5pc1BhaW50RGVmKCBiYXNlQ29sb3IgKSwgYGludmFsaWQgYmFzZUNvbG9yOiAke2Jhc2VDb2xvcn1gICk7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCBwYXRoIGluc3RhbmNlb2YgQ29sbGlzaW9uTGFiUGF0aCwgYGludmFsaWQgcGF0aDogJHtwYXRofWAgKTtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIGNvbnRleHQgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGBpbnZhbGlkIGNvbnRleHQ6ICR7Y29udGV4dH1gICk7XHJcblxyXG4gICAgLy8gSWYgdGhlcmUgYXJlbid0IGVub3VnaCBQYXRoRGF0YVBvaW50cywgZG8gbm90IHJlcGFpbnQuXHJcbiAgICBpZiAoIHBhdGguZGF0YVBvaW50cy5sZW5ndGggPD0gMSApIHsgcmV0dXJuOyAvKiBEbyBub3RoaW5nICovIH1cclxuXHJcbiAgICAvLyBSZWZlcmVuY2UgdGhlIHRpbWUgb2YgdGhlIGZpcnN0IGFuZCBsYXN0IFBhdGhEYXRhUG9pbnRzLlxyXG4gICAgY29uc3QgZmlyc3RQYXRoRGF0YVBvaW50VGltZSA9IHBhdGguZGF0YVBvaW50c1sgMCBdLnRpbWU7XHJcbiAgICBjb25zdCBsYXN0UGF0aERhdGFQb2ludFRpbWUgPSBfLmxhc3QoIHBhdGguZGF0YVBvaW50cyApLnRpbWU7XHJcblxyXG4gICAgLy8gRHJhdyB0aGUgc2VnbWVudHMgdGhhdCBjb25uZWN0IGVhY2ggb2YgdGhlIFBhdGhEYXRhUG9pbnRzIGJ5IGl0ZXJhdGluZyBwYWlyd2lzZS4gU3RvcmluZyB0aGUgcHJldmlvdXMgdmlld1xyXG4gICAgLy8gcG9zaXRpb24sIHNvIHdlIHdpbGwgb25seSBuZWVkIHRvIGNvbXB1dGUgdGhlIHZpZXcgcG9zaXRpb24gb2YgZWFjaCBwb2ludCBvbmNlLlxyXG4gICAgbGV0IHByZXZpb3VzVmlld1Bvc2l0aW9uID0gcGF0aC5kYXRhUG9pbnRzLmxlbmd0aCA/IHRoaXMubW9kZWxWaWV3VHJhbnNmb3JtLm1vZGVsVG9WaWV3UG9zaXRpb24oIHBhdGguZGF0YVBvaW50c1sgMCBdLnBvc2l0aW9uICkgOiBuZXcgVmVjdG9yMiggMCwgMCApO1xyXG4gICAgZm9yICggbGV0IGkgPSAxOyBpIDwgcGF0aC5kYXRhUG9pbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICBjb25zdCBkYXRhUG9pbnQgPSBwYXRoLmRhdGFQb2ludHNbIGkgXTtcclxuXHJcbiAgICAgIC8vIEVhY2ggc2VnbWVudCBvZiB0aGUgZGF0YVBvaW50IHBhdGggbmVlZHMgYSBuZXcgY2FudmFzIHBhdGggdG8gY3JlYXRlIHRoZSBncmFkaWVudCBlZmZlY3QuXHJcbiAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcblxyXG4gICAgICAvLyBHZXQgdGhlIHN0YXJ0IGFuZCBlbmQgcG9zaXRpb25zIG9mIHRoZSBsaW5lLXNlZ21lbnQuXHJcbiAgICAgIGNvbnN0IHNlZ21lbnRTdGFydFBvc2l0aW9uID0gcHJldmlvdXNWaWV3UG9zaXRpb247XHJcbiAgICAgIGNvbnN0IHNlZ21lbnRFbmRQb3NpdGlvbiA9IHRoaXMubW9kZWxWaWV3VHJhbnNmb3JtLm1vZGVsVG9WaWV3UG9zaXRpb24oIGRhdGFQb2ludC5wb3NpdGlvbiApO1xyXG4gICAgICBwcmV2aW91c1ZpZXdQb3NpdGlvbiA9IHNlZ21lbnRFbmRQb3NpdGlvbjtcclxuXHJcbiAgICAgIC8vIERyYXcgdGhlIGxpbmUtc2VnbWVudCB0aGF0IGNvbm5lY3RzIHRoZSBzdGFydCBhbmQgZW5kIHBvc2l0aW9ucy5cclxuICAgICAgY29udGV4dC5tb3ZlVG8oIHNlZ21lbnRTdGFydFBvc2l0aW9uLngsIHNlZ21lbnRTdGFydFBvc2l0aW9uLnkgKTtcclxuICAgICAgY29udGV4dC5saW5lVG8oIHNlZ21lbnRFbmRQb3NpdGlvbi54LCBzZWdtZW50RW5kUG9zaXRpb24ueSApO1xyXG5cclxuICAgICAgLy8gTGluZWFybHkgcmVkdWNlIHRoZSBzdHJva2UtYWxwaGEgdG8gZ2l2ZSBhIFwiZmFkZSBvdmVyLXRpbWVcIiBpbGx1c2lvbi5cclxuICAgICAgY29uc3QgYWxwaGEgPSBVdGlscy5saW5lYXIoIGZpcnN0UGF0aERhdGFQb2ludFRpbWUsIGxhc3RQYXRoRGF0YVBvaW50VGltZSwgMCwgMSwgZGF0YVBvaW50LnRpbWUgKTtcclxuXHJcbiAgICAgIC8vIFVzaW5nIGJ1aWx0LWluIHRvRml4ZWQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgKHNpbWlsYXIgdG8gQ29sb3IuY29tcHV0ZUNTUygpKSwgYW5kIGluIGFkZGl0aW9uIGF2b2lkaW5nIGEgbG90XHJcbiAgICAgIC8vIG9mIHRoZSBtdXRhdGlvbiBhbmQgb3ZlcmhlYWQgYnkganVzdCBkaXJlY3RseSBjcmVhdGluZyB0aGUgQ1NTIGNvbG9yIHN0cmluZy5cclxuICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGByZ2JhKCR7YmFzZUNvbG9yLnJ9LCR7YmFzZUNvbG9yLmd9LCR7YmFzZUNvbG9yLmJ9LCR7VXRpbHMudG9GaXhlZCggYWxwaGEsIDIwICl9KWA7XHJcbiAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEcmF3cyB0aGUgJ1BhdGhzJyBiZWhpbmQgYWxsIEJhbGxzIGFuZCB0aGUgQ2VudGVyIG9mIE1hc3MuXHJcbiAgICogQHB1YmxpY1xyXG4gICAqIEBvdmVycmlkZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcclxuICAgKi9cclxuICBwYWludENhbnZhcyggY29udGV4dCApIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIGNvbnRleHQgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGBpbnZhbGlkIGNvbnRleHQ6ICR7Y29udGV4dH1gICk7XHJcblxyXG4gICAgLy8gU2V0IG9uY2Ugb25seSBmb3IgcGVyZm9ybWFuY2UuXHJcbiAgICBjb250ZXh0LmxpbmVXaWR0aCA9IExJTkVfV0lEVEg7XHJcblxyXG4gICAgLy8gRmlyc3QgZHJhdyB0aGUgdHJhaWxpbmcgJ1BhdGhzJyBiZWhpbmQgZXZlcnkgQmFsbC5cclxuICAgIGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMucHJlcG9wdWxhdGVkQmFsbHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgIGNvbnN0IGJhbGwgPSB0aGlzLnByZXBvcHVsYXRlZEJhbGxzWyBpIF07XHJcbiAgICAgIHRoaXMuZHJhd1BhdGgoIGJhbGwucGF0aCwgQ29sbGlzaW9uTGFiQ29sb3JzLkJBTExfQ09MT1JTWyBiYWxsLmluZGV4IC0gMSBdLCBjb250ZXh0ICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRHJhdyB0aGUgdHJhaWxpbmcgJ1BhdGgnIGJlaGluZCB0aGUgQ2VudGVyT2ZNYXNzLlxyXG4gICAgdGhpcy5kcmF3UGF0aCggdGhpcy5jZW50ZXJPZk1hc3NQYXRoLCBDb2xsaXNpb25MYWJDb2xvcnMuQ0VOVEVSX09GX01BU1NfRklMTCwgY29udGV4dCApO1xyXG4gIH1cclxufVxyXG5cclxuY29sbGlzaW9uTGFiLnJlZ2lzdGVyKCAnUGF0aHNOb2RlJywgUGF0aHNOb2RlICk7XHJcbmV4cG9ydCBkZWZhdWx0IFBhdGhzTm9kZTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxPQUFPLE1BQU0sK0JBQStCO0FBQ25ELE9BQU9DLEtBQUssTUFBTSw2QkFBNkI7QUFDL0MsT0FBT0MsT0FBTyxNQUFNLCtCQUErQjtBQUNuRCxPQUFPQyxLQUFLLE1BQU0sbUNBQW1DO0FBQ3JELE9BQU9DLFdBQVcsTUFBTSwwQ0FBMEM7QUFDbEUsT0FBT0MsbUJBQW1CLE1BQU0sdURBQXVEO0FBQ3ZGLFNBQVNDLFVBQVUsRUFBRUMsS0FBSyxFQUFFQyxRQUFRLFFBQVEsbUNBQW1DO0FBQy9FLE9B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