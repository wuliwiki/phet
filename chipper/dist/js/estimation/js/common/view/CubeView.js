// Copyright 2014-2022, University of Colorado Boulder

/**
 * View representation of a cube used within the Estimation simulation.
 * The cube is defined by a position, size, and color.  Some of these
 * attributes may change.
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import { Color, Node, Path, Rectangle } from '../../../../scenery/js/imports.js';
import estimation from '../../estimation.js';
import EstimationConstants from '../EstimationConstants.js';
class CubeView extends Node {
  /**
   * @param {CubeModel} cubeModel
   * @param {ModelViewTransform2} modelViewTransform
   */
  constructor(cubeModel, modelViewTransform) {
    super();
    const baseColor = cubeModel.color instanceof Color ? cubeModel.color : new Color(cubeModel.color);
    const top = new Path(null, {
      fill: baseColor.colorUtilsBrighter(0.3),
      stroke: cubeModel.showOutline ? 'white' : null
    });
    this.addChild(top);
    const side = new Path(null, {
      fill: baseColor.colorUtilsDarker(0.3),
      stroke: cubeModel.showOutline ? 'white' : null
    });
    this.addChild(side);
    const front = new Rectangle(0, 0, 1, 1, 0, 0, {
      fill: baseColor,
      stroke: cubeModel.showOutline ? 'white' : null
    });
    this.addChild(front);
    const updatePosition = () => {
      const transformedPosition = modelViewTransform.modelToViewPosition(cubeModel.positionProperty.value);
      // Position is defined as the bottom left in this sim.
      this.left = transformedPosition.x;
      this.bottom = transformedPosition.y;
    };

    // Hook up the update functions
    cubeModel.sizeProperty.link(() => {
      const faceWidth = modelViewTransform.modelToViewDeltaX(cubeModel.sizeProperty.value.width);
      const projectedDepth = modelViewTransform.modelToViewDeltaX(cubeModel.sizeProperty.value.depth) * EstimationConstants.DEPTH_PROJECTION_PROPORTION; // Assumes x & y scales are the same.
      const projectionVector = Vector2.createPolar(projectedDepth, -EstimationConstants.CUBE_PROJECTION_ANGLE);
      const height = -modelViewTransform.modelToViewDeltaY(cubeModel.sizeProperty.value.height);
      front.setRect(0, 0, faceWidth, height);
      side.setShape(new Shape().moveTo(faceWidth, height).lineToRelative(projectionVector.x, projectionVector.y).lineToRelative(0, -height).lineToRelative(-projectionVector.x, -projectionVector.y).close());
      top.setShape(new Shape().moveTo(0, 0).lineToRelative(projectionVector.x, projectionVector.y).lineToRelative(faceWidth, 0).lineToRelative(-projectionVector.x, -projectionVector.y).close());
      updatePosition();
    });
    cubeModel.positionProperty.link(updatePosition);
    cubeModel.visibleProperty.link(visible => {
      this.visible = visible;
    });
  }
}
estimation.register('CubeView', CubeView);
export default CubeView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWZWN0b3IyIiwiU2hhcGUiLCJDb2xvciIsIk5vZGUiLCJQYXRoIiwiUmVjdGFuZ2xlIiwiZXN0aW1hdGlvbiIsIkVzdGltYXRpb25Db25zdGFudHMiLCJDdWJlVmlldyIsImNvbnN0cnVjdG9yIiwiY3ViZU1vZGVsIiwibW9kZWxWaWV3VHJhbnNmb3JtIiwiYmFzZUNvbG9yIiwiY29sb3IiLCJ0b3AiLCJmaWxsIiwiY29sb3JVdGlsc0JyaWdodGVyIiwic3Ryb2tlIiwic2hvd091dGxpbmUiLCJhZGRDaGlsZCIsInNpZGUiLCJjb2xvclV0aWxzRGFya2VyIiwiZnJvbnQiLCJ1cGRhdGVQb3NpdGlvbiIsInRyYW5zZm9ybWVkUG9zaXRpb24iLCJtb2RlbFRvVmlld1Bvc2l0aW9uIiwicG9zaXRpb25Qcm9wZXJ0eSIsInZhbHVlIiwibGVmdCIsIngiLCJib3R0b20iLCJ5Iiwic2l6ZVByb3BlcnR5IiwibGluayIsImZhY2VXaWR0aCIsIm1vZGVsVG9WaWV3RGVsdGFYIiwid2lkdGgiLCJwcm9qZWN0ZWREZXB0aCIsImRlcHRoIiwiREVQVEhfUFJPSkVDVElPTl9QUk9QT1JUSU9OIiwicHJvamVjdGlvblZlY3RvciIsImNyZWF0ZVBvbGFyIiwiQ1VCRV9QUk9KRUNUSU9OX0FOR0xFIiwiaGVpZ2h0IiwibW9kZWxUb1ZpZXdEZWx0YVkiLCJzZXRSZWN0Iiwic2V0U2hhcGUiLCJtb3ZlVG8iLCJsaW5lVG9SZWxhdGl2ZSIsImNsb3NlIiwidmlzaWJsZVByb3BlcnR5IiwidmlzaWJsZSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiQ3ViZVZpZXcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTQtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogVmlldyByZXByZXNlbnRhdGlvbiBvZiBhIGN1YmUgdXNlZCB3aXRoaW4gdGhlIEVzdGltYXRpb24gc2ltdWxhdGlvbi5cclxuICogVGhlIGN1YmUgaXMgZGVmaW5lZCBieSBhIHBvc2l0aW9uLCBzaXplLCBhbmQgY29sb3IuICBTb21lIG9mIHRoZXNlXHJcbiAqIGF0dHJpYnV0ZXMgbWF5IGNoYW5nZS5cclxuICovXHJcblxyXG5pbXBvcnQgVmVjdG9yMiBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvVmVjdG9yMi5qcyc7XHJcbmltcG9ydCB7IFNoYXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4va2l0ZS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IHsgQ29sb3IsIE5vZGUsIFBhdGgsIFJlY3RhbmdsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBlc3RpbWF0aW9uIGZyb20gJy4uLy4uL2VzdGltYXRpb24uanMnO1xyXG5pbXBvcnQgRXN0aW1hdGlvbkNvbnN0YW50cyBmcm9tICcuLi9Fc3RpbWF0aW9uQ29uc3RhbnRzLmpzJztcclxuXHJcbmNsYXNzIEN1YmVWaWV3IGV4dGVuZHMgTm9kZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7Q3ViZU1vZGVsfSBjdWJlTW9kZWxcclxuICAgKiBAcGFyYW0ge01vZGVsVmlld1RyYW5zZm9ybTJ9IG1vZGVsVmlld1RyYW5zZm9ybVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBjdWJlTW9kZWwsIG1vZGVsVmlld1RyYW5zZm9ybSApIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgY29uc3QgYmFzZUNvbG9yID0gY3ViZU1vZGVsLmNvbG9yIGluc3RhbmNlb2YgQ29sb3IgPyBjdWJlTW9kZWwuY29sb3IgOiBuZXcgQ29sb3IoIGN1YmVNb2RlbC5jb2xvciApO1xyXG5cclxuICAgIGNvbnN0IHRvcCA9IG5ldyBQYXRoKCBudWxsLCB7XHJcbiAgICAgIGZpbGw6IGJhc2VDb2xvci5jb2xvclV0aWxzQnJpZ2h0ZXIoIDAuMyApLFxyXG4gICAgICBzdHJva2U6ICggY3ViZU1vZGVsLnNob3dPdXRsaW5lID8gJ3doaXRlJyA6IG51bGwgKVxyXG4gICAgfSApO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggdG9wICk7XHJcbiAgICBjb25zdCBzaWRlID0gbmV3IFBhdGgoIG51bGwsIHtcclxuICAgICAgZmlsbDogYmFzZUNvbG9yLmNvbG9yVXRpbHNEYXJrZXIoIDAuMyApLFxyXG4gICAgICBzdHJva2U6ICggY3ViZU1vZGVsLnNob3dPdXRsaW5lID8gJ3doaXRlJyA6IG51bGwgKVxyXG4gICAgfSApO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggc2lkZSApO1xyXG4gICAgY29uc3QgZnJvbnQgPSBuZXcgUmVjdGFuZ2xlKCAwLCAwLCAxLCAxLCAwLCAwLCB7XHJcbiAgICAgIGZpbGw6IGJhc2VDb2xvcixcclxuICAgICAgc3Ryb2tlOiAoIGN1YmVNb2RlbC5zaG93T3V0bGluZSA/ICd3aGl0ZScgOiBudWxsIClcclxuICAgIH0gKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIGZyb250ICk7XHJcblxyXG4gICAgY29uc3QgdXBkYXRlUG9zaXRpb24gPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRyYW5zZm9ybWVkUG9zaXRpb24gPSBtb2RlbFZpZXdUcmFuc2Zvcm0ubW9kZWxUb1ZpZXdQb3NpdGlvbiggY3ViZU1vZGVsLnBvc2l0aW9uUHJvcGVydHkudmFsdWUgKTtcclxuICAgICAgLy8gUG9zaXRpb24gaXMgZGVmaW5lZCBhcyB0aGUgYm90dG9tIGxlZnQgaW4gdGhpcyBzaW0uXHJcbiAgICAgIHRoaXMubGVmdCA9IHRyYW5zZm9ybWVkUG9zaXRpb24ueDtcclxuICAgICAgdGhpcy5ib3R0b20gPSB0cmFuc2Zvcm1lZFBvc2l0aW9uLnk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEhvb2sgdXAgdGhlIHVwZGF0ZSBmdW5jdGlvbnNcclxuICAgIGN1YmVNb2RlbC5zaXplUHJvcGVydHkubGluayggKCkgPT4ge1xyXG4gICAgICBjb25zdCBmYWNlV2lkdGggPSBtb2RlbFZpZXdUcmFuc2Zvcm0ubW9kZWxUb1ZpZXdEZWx0YVgoIGN1YmVNb2RlbC5zaXplUHJvcGVydHkudmFsdWUud2lkdGggKTtcclxuICAgICAgY29uc3QgcHJvamVjdGVkRGVwdGggPSBtb2RlbFZpZXdUcmFuc2Zvcm0ubW9kZWxUb1ZpZXdEZWx0YVgoIGN1YmVNb2RlbC5zaXplUHJvcGVydHkudmFsdWUuZGVwdGggKSAqIEVzdGltYXRpb25Db25zdGFudHMuREVQVEhfUFJPSkVDVElPTl9QUk9QT1JUSU9OOyAvLyBBc3N1bWVzIHggJiB5IHNjYWxlcyBhcmUgdGhlIHNhbWUuXHJcbiAgICAgIGNvbnN0IHByb2plY3Rpb25WZWN0b3IgPSBWZWN0b3IyLmNyZWF0ZVBvbGFyKCBwcm9qZWN0ZWREZXB0aCwgLUVzdGltYXRpb25Db25zdGFudHMuQ1VCRV9QUk9KRUNUSU9OX0FOR0xFICk7XHJcbiAgICAgIGNvbnN0IGhlaWdodCA9IC1tb2RlbFZpZXdUcmFuc2Zvcm0ubW9kZWxUb1ZpZXdEZWx0YVkoIGN1YmVNb2RlbC5zaXplUHJvcGVydHkudmFsdWUuaGVpZ2h0ICk7XHJcblxyXG4gICAgICBmcm9udC5zZXRSZWN0KCAwLCAwLCBmYWNlV2lkdGgsIGhlaWdodCApO1xyXG4gICAgICBzaWRlLnNldFNoYXBlKCBuZXcgU2hhcGUoKVxyXG4gICAgICAgIC5tb3ZlVG8oIGZhY2VXaWR0aCwgaGVpZ2h0IClcclxuICAgICAgICAubGluZVRvUmVsYXRpdmUoIHByb2plY3Rpb25WZWN0b3IueCwgcHJvamVjdGlvblZlY3Rvci55IClcclxuICAgICAgICAubGluZVRvUmVsYXRpdmUoIDAsIC1oZWlnaHQgKVxyXG4gICAgICAgIC5saW5lVG9SZWxhdGl2ZSggLXByb2plY3Rpb25WZWN0b3IueCwgLXByb2plY3Rpb25WZWN0b3IueSApXHJcbiAgICAgICAgLmNsb3NlKClcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRvcC5zZXRTaGFwZSggbmV3IFNoYXBlKClcclxuICAgICAgICAubW92ZVRvKCAwLCAwIClcclxuICAgICAgICAubGluZVRvUmVsYXRpdmUoIHByb2plY3Rpb25WZWN0b3IueCwgcHJvamVjdGlvblZlY3Rvci55IClcclxuICAgICAgICAubGluZVRvUmVsYXRpdmUoIGZhY2VXaWR0aCwgMCApXHJcbiAgICAgICAgLmxpbmVUb1JlbGF0aXZlKCAtcHJvamVjdGlvblZlY3Rvci54LCAtcHJvamVjdGlvblZlY3Rvci55IClcclxuICAgICAgICAuY2xvc2UoKVxyXG4gICAgICApO1xyXG5cclxuICAgICAgdXBkYXRlUG9zaXRpb24oKTtcclxuICAgIH0gKTtcclxuICAgIGN1YmVNb2RlbC5wb3NpdGlvblByb3BlcnR5LmxpbmsoIHVwZGF0ZVBvc2l0aW9uICk7XHJcbiAgICBjdWJlTW9kZWwudmlzaWJsZVByb3BlcnR5LmxpbmsoIHZpc2libGUgPT4ge1xyXG4gICAgICB0aGlzLnZpc2libGUgPSB2aXNpYmxlO1xyXG4gICAgfSApO1xyXG4gIH1cclxufVxyXG5cclxuZXN0aW1hdGlvbi5yZWdpc3RlciggJ0N1YmVWaWV3JywgQ3ViZVZpZXcgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEN1YmVWaWV3OyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxPQUFPLE1BQU0sK0JBQStCO0FBQ25ELFNBQVNDLEtBQUssUUFBUSxnQ0FBZ0M7QUFDdEQsU0FBU0MsS0FBSyxFQUFFQyxJQUFJLEVBQUVDLElBQUksRUFBRUMsU0FBUyxRQUFRLG1DQUFtQztBQUNoRixPQUFPQyxVQUFVLE1BQU0scUJBQXFCO0FBQzVDLE9BQU9DLG1CQUFtQixNQUFNLDJCQUEyQjtBQUUzRCxNQUFNQyxRQUFRLFNBQVNMLElBQUksQ0FBQztFQUUxQjtBQUNGO0FBQ0E7QUFDQTtFQUNFTSxXQUFXQSxDQUFFQyxTQUFTLEVBQUVDLGtCQUFrQixFQUFHO0lBQzNDLEtBQUssQ0FBQyxDQUFDO0lBRVAsTUFBTUMsU0FBUyxHQUFHRixTQUFTLENBQUNHLEtBQUssWUFBWVgsS0FBSyxHQUFHUSxTQUFTLENBQUNHLEtBQUssR0FBRyxJQUFJWCxLQUFLLENBQUVRLFNBQVMsQ0FBQ0cs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