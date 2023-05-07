// Copyright 2013-2022, University of Colorado Boulder

/**
 * View representation for the plank.
 *
 * @author John Blanco
 */

import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import { Node, Path, Rectangle } from '../../../../scenery/js/imports.js';
import balancingAct from '../../balancingAct.js';
import Plank from '../model/Plank.js';

// constants
const NORMAL_TICK_MARK_LINE_WIDTH = 1;
const BOLD_TICK_MARK_LINE_WIDTH = 3;
const HIGHLIGHT_COLOR = 'white';
const HIGHLIGHT_WIDTH = 12;
class PlankNode extends Node {
  /**
   * @param modelViewTransform
   * @param plank
   */
  constructor(modelViewTransform, plank) {
    super();
    const self = this;

    // Create and position the plank.
    const plankViewBounds = modelViewTransform.modelToViewShape(plank.unrotatedShape).bounds;
    const plankNode = new Rectangle(plankViewBounds.minX, plankViewBounds.minY, plankViewBounds.width, plankViewBounds.height, {
      fill: 'rgb( 243, 203, 127 )',
      stroke: 'black',
      lineThickness: 1
    });
    this.addChild(plankNode);

    // Function for mapping plank distance relative to the center point to a highlight.
    function mapPositionToHighlightIndex(distanceFromCenter) {
      return Utils.roundSymmetric((distanceFromCenter + Plank.LENGTH / 2) * ((Plank.NUM_SNAP_TO_POSITIONS + 1) / Plank.LENGTH)) - 1;
    }

    // Function for updating the highlights
    function updateHighlights() {
      self.highlights.forEach(highlight => {
        highlight.visible = false;
      });
      plank.activeDropPositions.forEach(position => {
        self.highlights[mapPositionToHighlightIndex(position)].visible = true;
      });
    }

    // Update the tick mark highlights as the active drop positions change.
    plank.activeDropPositions.addItemAddedListener(updateHighlights);
    plank.activeDropPositions.addItemRemovedListener(updateHighlights);

    // Create and add the tick mark layer.
    const tickMarkLayer = new Node();
    const tickMarkShape = Shape.lineSegment(0, 0, 0, modelViewTransform.modelToViewDeltaY(Plank.THICKNESS));
    const plankLeftEdge = new Vector2(modelViewTransform.modelToViewX(plank.getPlankSurfaceCenter().x - Plank.LENGTH / 2), modelViewTransform.modelToViewY(plank.getPlankSurfaceCenter().y));
    const tickMarkDeltaX = modelViewTransform.modelToViewDeltaX(Plank.INTER_SNAP_TO_MARKER_DISTANCE);
    this.highlights = [];
    for (let i = 0; i < Plank.NUM_SNAP_TO_POSITIONS; i++) {
      let tickMarkStroke = NORMAL_TICK_MARK_LINE_WIDTH;
      if (i % 2 === 0) {
        // Make some marks bold for easier placement of masses.
        // The 'if' clause can be tweaked to put marks in
        // different places.
        tickMarkStroke = BOLD_TICK_MARK_LINE_WIDTH;
      }
      const tickMark = new Path(tickMarkShape, {
        centerX: plankLeftEdge.x + (i + 1) * tickMarkDeltaX,
        top: plankLeftEdge.y,
        lineWidth: tickMarkStroke,
        stroke: 'black'
      });
      const highlight = new Rectangle(tickMark.centerX - HIGHLIGHT_WIDTH / 2, tickMark.top, HIGHLIGHT_WIDTH, tickMark.bounds.height, 0, 0, {
        fill: HIGHLIGHT_COLOR,
        visible: false
      });
      tickMarkLayer.addChild(highlight);
      this.highlights.push(highlight);
      tickMarkLayer.addChild(tickMark);
    }
    plankNode.addChild(tickMarkLayer);

    // Track the rotational angle of the plank and update this node accordingly.
    let nodeRotation = 0;
    const rotationPoint = modelViewTransform.modelToViewPosition(plank.pivotPoint);
    plank.tiltAngleProperty.link(tiltAngle => {
      plankNode.rotateAround(rotationPoint, nodeRotation - tiltAngle);
      nodeRotation = tiltAngle;
    });
  }
}
balancingAct.register('PlankNode', PlankNode);
export default PlankNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVdGlscyIsIlZlY3RvcjIiLCJTaGFwZSIsIk5vZGUiLCJQYXRoIiwiUmVjdGFuZ2xlIiwiYmFsYW5jaW5nQWN0IiwiUGxhbmsiLCJOT1JNQUxfVElDS19NQVJLX0xJTkVfV0lEVEgiLCJCT0xEX1RJQ0tfTUFSS19MSU5FX1dJRFRIIiwiSElHSExJR0hUX0NPTE9SIiwiSElHSExJR0hUX1dJRFRIIiwiUGxhbmtOb2RlIiwiY29uc3RydWN0b3IiLCJtb2RlbFZpZXdUcmFuc2Zvcm0iLCJwbGFuayIsInNlbGYiLCJwbGFua1ZpZXdCb3VuZHMiLCJtb2RlbFRvVmlld1NoYXBlIiwidW5yb3RhdGVkU2hhcGUiLCJib3VuZHMiLCJwbGFua05vZGUiLCJtaW5YIiwibWluWSIsIndpZHRoIiwiaGVpZ2h0IiwiZmlsbCIsInN0cm9rZSIsImxpbmVUaGlja25lc3MiLCJhZGRDaGlsZCIsIm1hcFBvc2l0aW9uVG9IaWdobGlnaHRJbmRleCIsImRpc3RhbmNlRnJvbUNlbnRlciIsInJvdW5kU3ltbWV0cmljIiwiTEVOR1RIIiwiTlVNX1NOQVBfVE9fUE9TSVRJT05TIiwidXBkYXRlSGlnaGxpZ2h0cyIsImhpZ2hsaWdodHMiLCJmb3JFYWNoIiwiaGlnaGxpZ2h0IiwidmlzaWJsZSIsImFjdGl2ZURyb3BQb3NpdGlvbnMiLCJwb3NpdGlvbiIsImFkZEl0ZW1BZGRlZExpc3RlbmVyIiwiYWRkSXRlbVJlbW92ZWRMaXN0ZW5lciIsInRpY2tNYXJrTGF5ZXIiLCJ0aWNrTWFya1NoYXBlIiwibGluZVNlZ21lbnQiLCJtb2RlbFRvVmlld0RlbHRhWSIsIlRISUNLTkVTUyIsInBsYW5rTGVmdEVkZ2UiLCJtb2RlbFRvVmlld1giLCJnZXRQbGFua1N1cmZhY2VDZW50ZXIiLCJ4IiwibW9kZWxUb1ZpZXdZIiwieSIsInRpY2tNYXJrRGVsdGFYIiwibW9kZWxUb1ZpZXdEZWx0YVgiLCJJTlRFUl9TTkFQX1RPX01BUktFUl9ESVNUQU5DRSIsImkiLCJ0aWNrTWFya1N0cm9rZSIsInRpY2tNYXJrIiwiY2VudGVyWCIsInRvcCIsImxpbmVXaWR0aCIsInB1c2giLCJub2RlUm90YXRpb24iLCJyb3RhdGlvblBvaW50IiwibW9kZWxUb1ZpZXdQb3NpdGlvbiIsInBpdm90UG9pbnQiLCJ0aWx0QW5nbGVQcm9wZXJ0eSIsImxpbmsiLCJ0aWx0QW5nbGUiLCJyb3RhdGVBcm91bmQiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlBsYW5rTm9kZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxMy0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBWaWV3IHJlcHJlc2VudGF0aW9uIGZvciB0aGUgcGxhbmsuXHJcbiAqXHJcbiAqIEBhdXRob3IgSm9obiBCbGFuY29cclxuICovXHJcblxyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1V0aWxzLmpzJztcclxuaW1wb3J0IFZlY3RvcjIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1ZlY3RvcjIuanMnO1xyXG5pbXBvcnQgeyBTaGFwZSB9IGZyb20gJy4uLy4uLy4uLy4uL2tpdGUvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCB7IE5vZGUsIFBhdGgsIFJlY3RhbmdsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBiYWxhbmNpbmdBY3QgZnJvbSAnLi4vLi4vYmFsYW5jaW5nQWN0LmpzJztcclxuaW1wb3J0IFBsYW5rIGZyb20gJy4uL21vZGVsL1BsYW5rLmpzJztcclxuXHJcbi8vIGNvbnN0YW50c1xyXG5jb25zdCBOT1JNQUxfVElDS19NQVJLX0xJTkVfV0lEVEggPSAxO1xyXG5jb25zdCBCT0xEX1RJQ0tfTUFSS19MSU5FX1dJRFRIID0gMztcclxuY29uc3QgSElHSExJR0hUX0NPTE9SID0gJ3doaXRlJztcclxuY29uc3QgSElHSExJR0hUX1dJRFRIID0gMTI7XHJcblxyXG5jbGFzcyBQbGFua05vZGUgZXh0ZW5kcyBOb2RlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIG1vZGVsVmlld1RyYW5zZm9ybVxyXG4gICAqIEBwYXJhbSBwbGFua1xyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBtb2RlbFZpZXdUcmFuc2Zvcm0sIHBsYW5rICkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhbmQgcG9zaXRpb24gdGhlIHBsYW5rLlxyXG4gICAgY29uc3QgcGxhbmtWaWV3Qm91bmRzID0gbW9kZWxWaWV3VHJhbnNmb3JtLm1vZGVsVG9WaWV3U2hhcGUoIHBsYW5rLnVucm90YXRlZFNoYXBlICkuYm91bmRzO1xyXG4gICAgY29uc3QgcGxhbmtOb2RlID0gbmV3IFJlY3RhbmdsZSggcGxhbmtWaWV3Qm91bmRzLm1pblgsIHBsYW5rVmlld0JvdW5kcy5taW5ZLCBwbGFua1ZpZXdCb3VuZHMud2lkdGgsIHBsYW5rVmlld0JvdW5kcy5oZWlnaHQsXHJcbiAgICAgIHtcclxuICAgICAgICBmaWxsOiAncmdiKCAyNDMsIDIwMywgMTI3ICknLFxyXG4gICAgICAgIHN0cm9rZTogJ2JsYWNrJyxcclxuICAgICAgICBsaW5lVGhpY2tuZXNzOiAxXHJcbiAgICAgIH0gKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIHBsYW5rTm9kZSApO1xyXG5cclxuICAgIC8vIEZ1bmN0aW9uIGZvciBtYXBwaW5nIHBsYW5rIGRpc3RhbmNlIHJlbGF0aXZlIHRvIHRoZSBjZW50ZXIgcG9pbnQgdG8gYSBoaWdobGlnaHQuXHJcbiAgICBmdW5jdGlvbiBtYXBQb3NpdGlvblRvSGlnaGxpZ2h0SW5kZXgoIGRpc3RhbmNlRnJvbUNlbnRlciApIHtcclxuICAgICAgcmV0dXJuIFV0aWxzLnJvdW5kU3ltbWV0cmljKFxyXG4gICAgICAgICggZGlzdGFuY2VGcm9tQ2VudGVyICsgUGxhbmsuTEVOR1RIIC8gMiApICogKCAoIFBsYW5rLk5VTV9TTkFQX1RPX1BPU0lUSU9OUyArIDEgKSAvIFBsYW5rLkxFTkdUSCApXHJcbiAgICAgICkgLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZ1bmN0aW9uIGZvciB1cGRhdGluZyB0aGUgaGlnaGxpZ2h0c1xyXG4gICAgZnVuY3Rpb24gdXBkYXRlSGlnaGxpZ2h0cygpIHtcclxuICAgICAgc2VsZi5oaWdobGlnaHRzLmZvckVhY2goIGhpZ2hsaWdodCA9PiB7XHJcbiAgICAgICAgaGlnaGxpZ2h0LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgfSApO1xyXG4gICAgICBwbGFuay5hY3RpdmVEcm9wUG9zaXRpb25zLmZvckVhY2goIHBvc2l0aW9uID0+IHtcclxuICAgICAgICBzZWxmLmhpZ2hsaWdodHNbIG1hcFBvc2l0aW9uVG9IaWdobGlnaHRJbmRleCggcG9zaXRpb24gKSBdLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICB9ICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVXBkYXRlIHRoZSB0aWNrIG1hcmsgaGlnaGxpZ2h0cyBhcyB0aGUgYWN0aXZlIGRyb3AgcG9zaXRpb25zIGNoYW5nZS5cclxuICAgIHBsYW5rLmFjdGl2ZURyb3BQb3NpdGlvbnMuYWRkSXRlbUFkZGVkTGlzdGVuZXIoIHVwZGF0ZUhpZ2hsaWdodHMgKTtcclxuICAgIHBsYW5rLmFjdGl2ZURyb3BQb3NpdGlvbnMuYWRkSXRlbVJlbW92ZWRMaXN0ZW5lciggdXBkYXRlSGlnaGxpZ2h0cyApO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhbmQgYWRkIHRoZSB0aWNrIG1hcmsgbGF5ZXIuXHJcbiAgICBjb25zdCB0aWNrTWFya0xheWVyID0gbmV3IE5vZGUoKTtcclxuICAgIGNvbnN0IHRpY2tNYXJrU2hhcGUgPSBTaGFwZS5saW5lU2VnbWVudCggMCwgMCwgMCwgbW9kZWxWaWV3VHJhbnNmb3JtLm1vZGVsVG9WaWV3RGVsdGFZKCBQbGFuay5USElDS05FU1MgKSApO1xyXG4gICAgY29uc3QgcGxhbmtMZWZ0RWRnZSA9IG5ldyBWZWN0b3IyKCBtb2RlbFZpZXdUcmFuc2Zvcm0ubW9kZWxUb1ZpZXdYKCBwbGFuay5nZXRQbGFua1N1cmZhY2VDZW50ZXIoKS54IC0gUGxhbmsuTEVOR1RIIC8gMiApLFxyXG4gICAgICBtb2RlbFZpZXdUcmFuc2Zvcm0ubW9kZWxUb1ZpZXdZKCBwbGFuay5nZXRQbGFua1N1cmZhY2VDZW50ZXIoKS55ICkgKTtcclxuICAgIGNvbnN0IHRpY2tNYXJrRGVsdGFYID0gbW9kZWxWaWV3VHJhbnNmb3JtLm1vZGVsVG9WaWV3RGVsdGFYKCBQbGFuay5JTlRFUl9TTkFQX1RPX01BUktFUl9ESVNUQU5DRSApO1xyXG4gICAgdGhpcy5oaWdobGlnaHRzID0gW107XHJcbiAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBQbGFuay5OVU1fU05BUF9UT19QT1NJVElPTlM7IGkrKyApIHtcclxuICAgICAgbGV0IHRpY2tNYXJrU3Ryb2tlID0gTk9STUFMX1RJQ0tfTUFSS19MSU5FX1dJRFRIO1xyXG4gICAgICBpZiAoIGkgJSAyID09PSAwICkge1xyXG4gICAgICAgIC8vIE1ha2Ugc29tZSBtYXJrcyBib2xkIGZvciBlYXNpZXIgcGxhY2VtZW50IG9mIG1hc3Nlcy5cclxuICAgICAgICAvLyBUaGUgJ2lmJyBjbGF1c2UgY2FuIGJlIHR3ZWFrZWQgdG8gcHV0IG1hcmtzIGluXHJcbiAgICAgICAgLy8gZGlmZmVyZW50IHBsYWNlcy5cclxuICAgICAgICB0aWNrTWFya1N0cm9rZSA9IEJPTERfVElDS19NQVJLX0xJTkVfV0lEVEg7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdGlja01hcmsgPSBuZXcgUGF0aCggdGlja01hcmtTaGFwZSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjZW50ZXJYOiBwbGFua0xlZnRFZGdlLnggKyAoIGkgKyAxICkgKiB0aWNrTWFya0RlbHRhWCxcclxuICAgICAgICAgIHRvcDogcGxhbmtMZWZ0RWRnZS55LFxyXG4gICAgICAgICAgbGluZVdpZHRoOiB0aWNrTWFya1N0cm9rZSxcclxuICAgICAgICAgIHN0cm9rZTogJ2JsYWNrJ1xyXG4gICAgICAgIH0gKTtcclxuICAgICAgY29uc3QgaGlnaGxpZ2h0ID0gbmV3IFJlY3RhbmdsZShcclxuICAgICAgICB0aWNrTWFyay5jZW50ZXJYIC0gSElHSExJR0hUX1dJRFRIIC8gMixcclxuICAgICAgICB0aWNrTWFyay50b3AsXHJcbiAgICAgICAgSElHSExJR0hUX1dJRFRILFxyXG4gICAgICAgIHRpY2tNYXJrLmJvdW5kcy5oZWlnaHQsXHJcbiAgICAgICAgMCxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHsgZmlsbDogSElHSExJR0hUX0NPTE9SLCB2aXNpYmxlOiBmYWxzZSB9XHJcbiAgICAgICk7XHJcbiAgICAgIHRpY2tNYXJrTGF5ZXIuYWRkQ2hpbGQoIGhpZ2hsaWdodCApO1xyXG4gICAgICB0aGlzLmhpZ2hsaWdodHMucHVzaCggaGlnaGxpZ2h0ICk7XHJcbiAgICAgIHRpY2tNYXJrTGF5ZXIuYWRkQ2hpbGQoIHRpY2tNYXJrICk7XHJcbiAgICB9XHJcbiAgICBwbGFua05vZGUuYWRkQ2hpbGQoIHRpY2tNYXJrTGF5ZXIgKTtcclxuXHJcbiAgICAvLyBUcmFjayB0aGUgcm90YXRpb25hbCBhbmdsZSBvZiB0aGUgcGxhbmsgYW5kIHVwZGF0ZSB0aGlzIG5vZGUgYWNjb3JkaW5nbHkuXHJcbiAgICBsZXQgbm9kZVJvdGF0aW9uID0gMDtcclxuICAgIGNvbnN0IHJvdGF0aW9uUG9pbnQgPSBtb2RlbFZpZXdUcmFuc2Zvcm0ubW9kZWxUb1ZpZXdQb3NpdGlvbiggcGxhbmsucGl2b3RQb2ludCApO1xyXG4gICAgcGxhbmsudGlsdEFuZ2xlUHJvcGVydHkubGluayggdGlsdEFuZ2xlID0+IHtcclxuICAgICAgcGxhbmtOb2RlLnJvdGF0ZUFyb3VuZCggcm90YXRpb25Qb2ludCwgbm9kZVJvdGF0aW9uIC0gdGlsdEFuZ2xlICk7XHJcbiAgICAgIG5vZGVSb3RhdGlvbiA9IHRpbHRBbmdsZTtcclxuICAgIH0gKTtcclxuICB9XHJcbn1cclxuXHJcbmJhbGFuY2luZ0FjdC5yZWdpc3RlciggJ1BsYW5rTm9kZScsIFBsYW5rTm9kZSApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxhbmtOb2RlO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBSyxNQUFNLDZCQUE2QjtBQUMvQyxPQUFPQyxPQUFPLE1BQU0sK0JBQStCO0FBQ25ELFNBQVNDLEtBQUssUUFBUSxnQ0FBZ0M7QUFDdEQsU0FBU0MsSUFBSSxFQUFFQyxJQUFJLEVBQUVDLFNBQVMsUUFBUSxtQ0FBbUM7QUFDekUsT0FBT0MsWUFBWSxNQUFNLHVCQUF1QjtBQUNoRCxPQUFPQyxLQUFLLE1BQU0sbUJBQW1COztBQUVyQztBQUNBLE1BQU1DLDJCQUEyQixHQUFHLENBQUM7QUFDckMsTUFBTUMseUJBQXlCLEdBQUcsQ0FBQztBQUNuQyxNQUFNQyxlQUFlLEdBQUcsT0FBTztBQUMvQixNQUFNQyxlQUFlLEdBQUcsRUFBRTtBQUUxQixNQUFNQyxTQUFTLFNBQVNULElBQUksQ0FBQztFQUUzQjtBQUNGO0FBQ0E7QUFDQTtFQUNFVSxXQUFXQSxDQUFFQyxrQkFBa0IsRUFBRUMsS0FBSyxFQUFHO0lBQ3ZDLEtBQUssQ0FBQyxDQUFDO0lBQ1AsTUFBTUMsSUFBSSxHQUFHLElBQUk7O0lBRWpCO0lBQ0EsTUFBTUMsZUFBZSxHQUFHSCxrQkFBa0IsQ0FBQ0ksZ0JBQWdCLENBQUVILEtBQUssQ0FBQ0ksY0FBZSxDQUFDLENBQUNDLE1BQU07SUFDMUYsTUFBTUMsU0FBUyxHQUFHLElBQUloQixTQUFTLENBQUVZLGVBQWUsQ0FBQ0ssSUFBSSxFQUFFTCxlQUFlLENBQUNNLElBQUksRUFBRU4sZUFBZSxDQUFDTyxLQUFLLEVBQUVQLGVBQWUsQ0FBQ1EsTUFBTSxFQUN4SDtNQUNFQyxJQUFJLEVBQUUsc0JBQXNCO01BQzVCQyxNQUFNLEVBQUUsT0FBTztNQUNmQyxhQUFhLEVBQUU7SUFDakIsQ0FBRSxDQUFDO0lBQ0wsSUFBSSxDQUFDQyxRQUFRLENBQUVSLFNBQVUsQ0FB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