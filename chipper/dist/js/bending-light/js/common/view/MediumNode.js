// Copyright 2015-2022, University of Colorado Boulder
/**
 * Graphic that draws a medium such as air, water, glass, etc.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chandrashekar Bemagoni (Actual Concepts)
 */

import { Node, Path } from '../../../../scenery/js/imports.js';
import bendingLight from '../../bendingLight.js';
class MediumNode extends Node {
  /**
   * @param modelViewTransform - converts between model and view co-ordinates
   * @param mediumProperty - specifies medium
   */
  constructor(modelViewTransform, mediumProperty) {
    super({
      pickable: false
    }); // user can't interact with the medium except through control panels.

    // add the shape that paints the medium
    const mediumRectangleNode = new Path(modelViewTransform.modelToViewShape(mediumProperty.value.shape), {
      stroke: 'gray',
      fill: mediumProperty.value.color
    });
    this.addChild(mediumRectangleNode);

    // Update whenever the medium changes
    mediumProperty.link(medium => {
      mediumRectangleNode.fill = medium.color;
    });
  }
}
bendingLight.register('MediumNode', MediumNode);
export default MediumNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJOb2RlIiwiUGF0aCIsImJlbmRpbmdMaWdodCIsIk1lZGl1bU5vZGUiLCJjb25zdHJ1Y3RvciIsIm1vZGVsVmlld1RyYW5zZm9ybSIsIm1lZGl1bVByb3BlcnR5IiwicGlja2FibGUiLCJtZWRpdW1SZWN0YW5nbGVOb2RlIiwibW9kZWxUb1ZpZXdTaGFwZSIsInZhbHVlIiwic2hhcGUiLCJzdHJva2UiLCJmaWxsIiwiY29sb3IiLCJhZGRDaGlsZCIsImxpbmsiLCJtZWRpdW0iLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIk1lZGl1bU5vZGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTUtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcbi8qKlxyXG4gKiBHcmFwaGljIHRoYXQgZHJhd3MgYSBtZWRpdW0gc3VjaCBhcyBhaXIsIHdhdGVyLCBnbGFzcywgZXRjLlxyXG4gKlxyXG4gKiBAYXV0aG9yIFNhbSBSZWlkIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKiBAYXV0aG9yIENoYW5kcmFzaGVrYXIgQmVtYWdvbmkgKEFjdHVhbCBDb25jZXB0cylcclxuICovXHJcblxyXG5pbXBvcnQgUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9Qcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBNb2RlbFZpZXdUcmFuc2Zvcm0yIGZyb20gJy4uLy4uLy4uLy4uL3BoZXRjb21tb24vanMvdmlldy9Nb2RlbFZpZXdUcmFuc2Zvcm0yLmpzJztcclxuaW1wb3J0IHsgTm9kZSwgUGF0aCB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBiZW5kaW5nTGlnaHQgZnJvbSAnLi4vLi4vYmVuZGluZ0xpZ2h0LmpzJztcclxuaW1wb3J0IE1lZGl1bSBmcm9tICcuLi9tb2RlbC9NZWRpdW0uanMnO1xyXG5cclxuY2xhc3MgTWVkaXVtTm9kZSBleHRlbmRzIE5vZGUge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gbW9kZWxWaWV3VHJhbnNmb3JtIC0gY29udmVydHMgYmV0d2VlbiBtb2RlbCBhbmQgdmlldyBjby1vcmRpbmF0ZXNcclxuICAgKiBAcGFyYW0gbWVkaXVtUHJvcGVydHkgLSBzcGVjaWZpZXMgbWVkaXVtXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBtb2RlbFZpZXdUcmFuc2Zvcm06IE1vZGVsVmlld1RyYW5zZm9ybTIsIG1lZGl1bVByb3BlcnR5OiBQcm9wZXJ0eTxNZWRpdW0+ICkge1xyXG4gICAgc3VwZXIoIHsgcGlja2FibGU6IGZhbHNlIH0gKTsgLy8gdXNlciBjYW4ndCBpbnRlcmFjdCB3aXRoIHRoZSBtZWRpdW0gZXhjZXB0IHRocm91Z2ggY29udHJvbCBwYW5lbHMuXHJcblxyXG4gICAgLy8gYWRkIHRoZSBzaGFwZSB0aGF0IHBhaW50cyB0aGUgbWVkaXVtXHJcbiAgICBjb25zdCBtZWRpdW1SZWN0YW5nbGVOb2RlID0gbmV3IFBhdGgoIG1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld1NoYXBlKCBtZWRpdW1Qcm9wZXJ0eS52YWx1ZS5zaGFwZSApLCB7XHJcbiAgICAgIHN0cm9rZTogJ2dyYXknLFxyXG4gICAgICBmaWxsOiBtZWRpdW1Qcm9wZXJ0eS52YWx1ZS5jb2xvclxyXG4gICAgfSApO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggbWVkaXVtUmVjdGFuZ2xlTm9kZSApO1xyXG5cclxuICAgIC8vIFVwZGF0ZSB3aGVuZXZlciB0aGUgbWVkaXVtIGNoYW5nZXNcclxuICAgIG1lZGl1bVByb3BlcnR5LmxpbmsoIG1lZGl1bSA9PiB7XHJcbiAgICAgIG1lZGl1bVJlY3RhbmdsZU5vZGUuZmlsbCA9IG1lZGl1bS5jb2xvcjtcclxuICAgIH0gKTtcclxuICB9XHJcbn1cclxuXHJcbmJlbmRpbmdMaWdodC5yZWdpc3RlciggJ01lZGl1bU5vZGUnLCBNZWRpdW1Ob2RlICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNZWRpdW1Ob2RlOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUEsU0FBU0EsSUFBSSxFQUFFQyxJQUFJLFFBQVEsbUNBQW1DO0FBQzlELE9BQU9DLFlBQVksTUFBTSx1QkFBdUI7QUFHaEQsTUFBTUMsVUFBVSxTQUFTSCxJQUFJLENBQUM7RUFFNUI7QUFDRjtBQUNBO0FBQ0E7RUFDU0ksV0FBV0EsQ0FBRUMsa0JBQXVDLEVBQUVDLGNBQWdDLEVBQUc7SUFDOUYsS0FBSyxDQUFFO01BQUVDLFFBQVEsRUFBRTtJQUFNLENBQUUsQ0FBQyxDQUFDLENBQUM7O0lBRTlCO0lBQ0EsTUFBTUMsbUJBQW1CLEdBQUcsSUFBSVAsSUFBSSxDQUFFSSxrQkFBa0IsQ0FBQ0ksZ0JBQWdCLENBQUVILGNBQWMsQ0FBQ0ksS0FBSyxDQUFDQyxLQUFNLENBQUMsRUFBRTtNQUN2R0MsTUFBTSxFQUFFLE1BQU07TUFDZEMsSUFBSSxFQUFFUCxjQUFjLENBQUNJLEtBQUssQ0FBQ0k7SUFDN0IsQ0FBRSxDQUFDO0lBQ0gsSUFBSSxDQUFDQyxRQUFRLENBQUVQLG1CQUFvQixDQUFDOztJQUVwQztJQUNBRixjQUFjLENBQUNVLElBQUksQ0FBRUMsTUFBTSxJQUFJO01BQzdCVCxtQkFBbUIsQ0FBQ0ssSUFBSSxHQUFHSSxNQUFNLENBQUNILEtBQUs7SUFDekMsQ0FBRSxDQUFDO0VBQ0w7QUFDRjtBQUVBWixZQUFZLENBQUNnQixRQUFRLENBQUUsWUFBWSxFQUFFZixVQUFXLENBQUM7QUFFakQsZUFBZUEsVUFBVSJ9