// Copyright 2014-2022, University of Colorado Boulder

/**
 * View representation of a line used within the Estimation simulation.  The
 * line is defined by a position, width, and color.  Some of these attributes
 * may change.
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import { Node, Path } from '../../../../scenery/js/imports.js';
import estimation from '../../estimation.js';
class LineView extends Node {
  /**
   * @param {LineModel} lineModel
   * @param {ModelViewTransform2} modelViewTransform
   */
  constructor(lineModel, modelViewTransform) {
    super();
    const path = new Path(null, {
      stroke: lineModel.color,
      lineWidth: 3
    });
    this.addChild(path);
    lineModel.lengthProperty.link(width => {
      const transformedOrigin = modelViewTransform.modelToViewPosition(lineModel.positionProperty.value);
      const transformedEndpoint = transformedOrigin.plus(new Vector2(modelViewTransform.modelToViewDeltaX(lineModel.lengthProperty.value, 0), 0));
      path.setShape(Shape.lineSegment(transformedOrigin.x, transformedOrigin.y, transformedEndpoint.x, transformedEndpoint.y));
    });
    lineModel.visibleProperty.link(visible => {
      this.visible = visible;
    });
  }
}
estimation.register('LineView', LineView);
export default LineView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWZWN0b3IyIiwiU2hhcGUiLCJOb2RlIiwiUGF0aCIsImVzdGltYXRpb24iLCJMaW5lVmlldyIsImNvbnN0cnVjdG9yIiwibGluZU1vZGVsIiwibW9kZWxWaWV3VHJhbnNmb3JtIiwicGF0aCIsInN0cm9rZSIsImNvbG9yIiwibGluZVdpZHRoIiwiYWRkQ2hpbGQiLCJsZW5ndGhQcm9wZXJ0eSIsImxpbmsiLCJ3aWR0aCIsInRyYW5zZm9ybWVkT3JpZ2luIiwibW9kZWxUb1ZpZXdQb3NpdGlvbiIsInBvc2l0aW9uUHJvcGVydHkiLCJ2YWx1ZSIsInRyYW5zZm9ybWVkRW5kcG9pbnQiLCJwbHVzIiwibW9kZWxUb1ZpZXdEZWx0YVgiLCJzZXRTaGFwZSIsImxpbmVTZWdtZW50IiwieCIsInkiLCJ2aXNpYmxlUHJvcGVydHkiLCJ2aXNpYmxlIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJMaW5lVmlldy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNC0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBWaWV3IHJlcHJlc2VudGF0aW9uIG9mIGEgbGluZSB1c2VkIHdpdGhpbiB0aGUgRXN0aW1hdGlvbiBzaW11bGF0aW9uLiAgVGhlXHJcbiAqIGxpbmUgaXMgZGVmaW5lZCBieSBhIHBvc2l0aW9uLCB3aWR0aCwgYW5kIGNvbG9yLiAgU29tZSBvZiB0aGVzZSBhdHRyaWJ1dGVzXHJcbiAqIG1heSBjaGFuZ2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFZlY3RvcjIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1ZlY3RvcjIuanMnO1xyXG5pbXBvcnQgeyBTaGFwZSB9IGZyb20gJy4uLy4uLy4uLy4uL2tpdGUvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCB7IE5vZGUsIFBhdGggfSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgZXN0aW1hdGlvbiBmcm9tICcuLi8uLi9lc3RpbWF0aW9uLmpzJztcclxuXHJcbmNsYXNzIExpbmVWaWV3IGV4dGVuZHMgTm9kZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7TGluZU1vZGVsfSBsaW5lTW9kZWxcclxuICAgKiBAcGFyYW0ge01vZGVsVmlld1RyYW5zZm9ybTJ9IG1vZGVsVmlld1RyYW5zZm9ybVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBsaW5lTW9kZWwsIG1vZGVsVmlld1RyYW5zZm9ybSApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBjb25zdCBwYXRoID0gbmV3IFBhdGgoIG51bGwsIHsgc3Ryb2tlOiBsaW5lTW9kZWwuY29sb3IsIGxpbmVXaWR0aDogMyB9ICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCBwYXRoICk7XHJcbiAgICBsaW5lTW9kZWwubGVuZ3RoUHJvcGVydHkubGluayggd2lkdGggPT4ge1xyXG4gICAgICBjb25zdCB0cmFuc2Zvcm1lZE9yaWdpbiA9IG1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld1Bvc2l0aW9uKCBsaW5lTW9kZWwucG9zaXRpb25Qcm9wZXJ0eS52YWx1ZSApO1xyXG4gICAgICBjb25zdCB0cmFuc2Zvcm1lZEVuZHBvaW50ID0gdHJhbnNmb3JtZWRPcmlnaW4ucGx1cyggbmV3IFZlY3RvcjIoIG1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld0RlbHRhWCggbGluZU1vZGVsLmxlbmd0aFByb3BlcnR5LnZhbHVlLCAwICksIDAgKSApO1xyXG4gICAgICBwYXRoLnNldFNoYXBlKCBTaGFwZS5saW5lU2VnbWVudCggdHJhbnNmb3JtZWRPcmlnaW4ueCwgdHJhbnNmb3JtZWRPcmlnaW4ueSwgdHJhbnNmb3JtZWRFbmRwb2ludC54LCB0cmFuc2Zvcm1lZEVuZHBvaW50LnkgKSApO1xyXG4gICAgfSApO1xyXG4gICAgbGluZU1vZGVsLnZpc2libGVQcm9wZXJ0eS5saW5rKCB2aXNpYmxlID0+IHtcclxuICAgICAgdGhpcy52aXNpYmxlID0gdmlzaWJsZTtcclxuICAgIH0gKTtcclxuICB9XHJcbn1cclxuXHJcbmVzdGltYXRpb24ucmVnaXN0ZXIoICdMaW5lVmlldycsIExpbmVWaWV3ICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW5lVmlldzsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsT0FBTyxNQUFNLCtCQUErQjtBQUNuRCxTQUFTQyxLQUFLLFFBQVEsZ0NBQWdDO0FBQ3RELFNBQVNDLElBQUksRUFBRUMsSUFBSSxRQUFRLG1DQUFtQztBQUM5RCxPQUFPQyxVQUFVLE1BQU0scUJBQXFCO0FBRTVDLE1BQU1DLFFBQVEsU0FBU0gsSUFBSSxDQUFDO0VBRTFCO0FBQ0Y7QUFDQTtBQUNBO0VBQ0VJLFdBQVdBLENBQUVDLFNBQVMsRUFBRUMsa0JBQWtCLEVBQUc7SUFDM0MsS0FBSyxDQUFDLENBQUM7SUFDUCxNQUFNQyxJQUFJLEdBQUcsSUFBSU4sSUFBSSxDQUFFLElBQUksRUFBRTtNQUFFTyxNQUFNLEVBQUVILFNBQVMsQ0FBQ0ksS0FBSztNQUFFQyxTQUFTLEVBQUU7SUFBRSxDQUFFLENBQUM7SUFDeEUsSUFBSSxDQUFDQyxRQUFRLENBQUVKLElBQUssQ0FBQztJQUNyQkYsU0FBUyxDQUFDTyxjQUFjLENBQUNDLElBQUksQ0FBRUMsS0FBSyxJQUFJO01BQ3RDLE1BQU1DLGlCQUFpQixHQUFHVCxrQkFBa0IsQ0FBQ1UsbUJBQW1CLENBQUVYLFNBQVMsQ0FBQ1ksZ0JBQWdCLENBQUNDLEtBQU0sQ0FBQztNQUNwRyxNQUFNQyxtQkFBbUIsR0FBR0osaUJBQWlCLENBQUNLLElBQUksQ0FBRSxJQUFJdEIsT0FBTyxDQUFFUSxrQkFBa0IsQ0FBQ2UsaUJBQWlCLENBQUVoQixTQUFTLENBQUNPLGNBQWMsQ0FBQ00sS0FBSyxFQUFFLENBQUUsQ0FBQyxFQUFFLENBQUUsQ0FBRSxDQUFDO01BQ2pKWCxJQUFJLENBQUNlLFFBQVEsQ0FBRXZCLEtBQUssQ0FBQ3dCLFdBQVcsQ0FBRVIsaUJBQWlCLENBQUNTLENBQUMsRUFBRVQsaUJBQWlCLENBQUNVLENBQUMsRUFBRU4sbUJBQW1CLENBQUNLLENBQUMsRUFBRUwsbUJBQW1CLENBQUNNLENBQUUsQ0FBRSxDQUFDO0lBQzlILENBQUUsQ0FBQztJQUNIcEIsU0FBUyxDQUFDcUIsZUFBZSxDQUFDYixJQUFJLENBQUVjLE9BQU8sSUFBSTtNQUN6QyxJQUFJLENBQUNBLE9BQU8sR0FBR0EsT0FBTztJQUN4QixDQUFFLENBQUM7RUFDTDtBQUNGO0FBRUF6QixVQUFVLENBQUMwQixRQUFRLENBQUUsVUFBVSxFQUFFekIsUUFBUyxDQUFDO0FBRTNDLGVBQWVBLFFBQVEifQ==