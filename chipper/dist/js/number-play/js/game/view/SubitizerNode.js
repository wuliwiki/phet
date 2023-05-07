// Copyright 2021-2023, University of Colorado Boulder

/**
 * SubitizerNode displays the subitized objects in the view and the start sequence for the subitize game.
 *
 * @author Luisa Vargas
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import CountingCommonConstants from '../../../../counting-common/js/common/CountingCommonConstants.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Circle, Color, Image, Node, Path, Rectangle } from '../../../../scenery/js/imports.js';
import numberPlay from '../../numberPlay.js';
import Subitizer from '../model/Subitizer.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import PlayIconShape from '../../../../scenery-phet/js/PlayIconShape.js';
import SubitizeLoadingBarNode from './SubitizeLoadingBarNode.js';
import SubitizeRevealButton from './SubitizeRevealButton.js';
import NumberPlayConstants from '../../common/NumberPlayConstants.js';
import SubitizeObjectType from '../model/SubitizeObjectType.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
// constants
const BACKGROUND_RECTANGLE_CORNER_RADIUS = 10;
const REVEAL_BUTTON_MARGIN = 12;
class SubitizerNode extends Node {
  constructor(subitizer, isChallengeSolvedProperty, newChallengeCallback) {
    super();

    // for scaling the objects
    const scaleMVT = ModelViewTransform2.createOffsetScaleMapping(Vector2.ZERO, 105);

    // create and add the backgroundNode
    const backgroundNode = new Rectangle(0, 0, scaleMVT.modelToViewDeltaX(Subitizer.SUBITIZER_BOUNDS.width), scaleMVT.modelToViewDeltaY(Subitizer.SUBITIZER_BOUNDS.height), BACKGROUND_RECTANGLE_CORNER_RADIUS, BACKGROUND_RECTANGLE_CORNER_RADIUS, {
      fill: Color.WHITE,
      stroke: Color.BLACK,
      lineWidth: 2
    });
    backgroundNode.center = Vector2.ZERO;
    this.addChild(backgroundNode);

    // create and add the subitizeLoadingBarNode
    const subitizeLoadingBarNode = new SubitizeLoadingBarNode(newChallengeCallback, subitizer.isLoadingBarAnimatingProperty);
    subitizeLoadingBarNode.center = this.center;
    this.addChild(subitizeLoadingBarNode);

    // create and add the playButton
    const playButton = new RectangularPushButton({
      baseColor: PhetColorScheme.BUTTON_YELLOW,
      content: new Path(new PlayIconShape(36, 45), {
        fill: Color.BLACK,
        centerX: 1.4,
        centerY: 0
      }),
      xMargin: 25,
      yMargin: 19,
      touchAreaXDilation: NumberPlayConstants.TOUCH_AREA_DILATION,
      touchAreaYDilation: NumberPlayConstants.TOUCH_AREA_DILATION,
      visibleProperty: subitizer.isPlayButtonVisibleProperty,
      listener: () => {
        subitizer.isPlayButtonVisibleProperty.value = false;
        subitizeLoadingBarNode.start();
      }
    });
    playButton.center = this.center;
    this.addChild(playButton);

    // create and add the subitizeRevealButton
    const subitizeRevealButton = new SubitizeRevealButton(isChallengeSolvedProperty, subitizer.isInputEnabledProperty, subitizer.isShapeVisibleProperty);
    subitizeRevealButton.right = this.right - REVEAL_BUTTON_MARGIN;
    subitizeRevealButton.bottom = this.bottom - REVEAL_BUTTON_MARGIN;
    this.addChild(subitizeRevealButton);

    // create and add the drawingNode, which is where the objects are added to
    const drawingNode = new Node({
      visibleProperty: subitizer.isShapeVisibleProperty
    });
    this.addChild(drawingNode);

    // update the view shape when the model points change
    subitizer.pointsProperty.link(points => {
      drawingNode.removeAllChildren();

      // create and add each object to the drawingNode
      points.forEach(point => {
        let object;
        if (subitizer.objectTypeProperty.value === SubitizeObjectType.CIRCLE) {
          object = new Circle(scaleMVT.modelToViewDeltaX(subitizer.objectSize / 2), {
            fill: Color.BLACK
          });
        } else {
          object = new Image(CountingCommonConstants.COUNTING_OBJECT_TYPE_TO_IMAGE.get(subitizer.objectTypeProperty.value), {
            maxHeight: scaleMVT.modelToViewDeltaX(subitizer.objectSize)
          });
        }
        object.centerX = scaleMVT.modelToViewX(point.x);
        object.centerY = scaleMVT.modelToViewY(point.y);
        drawingNode.addChild(object);
      });
    });
  }
  dispose() {
    assert && assert(false, 'dispose is not supported, exists for the lifetime of the sim');
    super.dispose();
  }
}
numberPlay.register('SubitizerNode', SubitizerNode);
export default SubitizerNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb3VudGluZ0NvbW1vbkNvbnN0YW50cyIsIlZlY3RvcjIiLCJNb2RlbFZpZXdUcmFuc2Zvcm0yIiwiQ2lyY2xlIiwiQ29sb3IiLCJJbWFnZSIsIk5vZGUiLCJQYXRoIiwiUmVjdGFuZ2xlIiwibnVtYmVyUGxheSIsIlN1Yml0aXplciIsIlJlY3Rhbmd1bGFyUHVzaEJ1dHRvbiIsIlBsYXlJY29uU2hhcGUiLCJTdWJpdGl6ZUxvYWRpbmdCYXJOb2RlIiwiU3ViaXRpemVSZXZlYWxCdXR0b24iLCJOdW1iZXJQbGF5Q29uc3RhbnRzIiwiU3ViaXRpemVPYmplY3RUeXBlIiwiUGhldENvbG9yU2NoZW1lIiwiQkFDS0dST1VORF9SRUNUQU5HTEVfQ09STkVSX1JBRElVUyIsIlJFVkVBTF9CVVRUT05fTUFSR0lOIiwiU3ViaXRpemVyTm9kZSIsImNvbnN0cnVjdG9yIiwic3ViaXRpemVyIiwiaXNDaGFsbGVuZ2VTb2x2ZWRQcm9wZXJ0eSIsIm5ld0NoYWxsZW5nZUNhbGxiYWNrIiwic2NhbGVNVlQiLCJjcmVhdGVPZmZzZXRTY2FsZU1hcHBpbmciLCJaRVJPIiwiYmFja2dyb3VuZE5vZGUiLCJtb2RlbFRvVmlld0RlbHRhWCIsIlNVQklUSVpFUl9CT1VORFMiLCJ3aWR0aCIsIm1vZGVsVG9WaWV3RGVsdGFZIiwiaGVpZ2h0IiwiZmlsbCIsIldISVRFIiwic3Ryb2tlIiwiQkxBQ0siLCJsaW5lV2lkdGgiLCJjZW50ZXIiLCJhZGRDaGlsZCIsInN1Yml0aXplTG9hZGluZ0Jhck5vZGUiLCJpc0xvYWRpbmdCYXJBbmltYXRpbmdQcm9wZXJ0eSIsInBsYXlCdXR0b24iLCJiYXNlQ29sb3IiLCJCVVRUT05fWUVMTE9XIiwiY29udGVudCIsImNlbnRlclgiLCJjZW50ZXJZIiwieE1hcmdpbiIsInlNYXJnaW4iLCJ0b3VjaEFyZWFYRGlsYXRpb24iLCJUT1VDSF9BUkVBX0RJTEFUSU9OIiwidG91Y2hBcmVhWURpbGF0aW9uIiwidmlzaWJsZVByb3BlcnR5IiwiaXNQbGF5QnV0dG9uVmlzaWJsZVByb3BlcnR5IiwibGlzdGVuZXIiLCJ2YWx1ZSIsInN0YXJ0Iiwic3ViaXRpemVSZXZlYWxCdXR0b24iLCJpc0lucHV0RW5hYmxlZFByb3BlcnR5IiwiaXNTaGFwZVZpc2libGVQcm9wZXJ0eSIsInJpZ2h0IiwiYm90dG9tIiwiZHJhd2luZ05vZGUiLCJwb2ludHNQcm9wZXJ0eSIsImxpbmsiLCJwb2ludHMiLCJyZW1vdmVBbGxDaGlsZHJlbiIsImZvckVhY2giLCJwb2ludCIsIm9iamVjdCIsIm9iamVjdFR5cGVQcm9wZXJ0eSIsIkNJUkNMRSIsIm9iamVjdFNpemUiLCJDT1VOVElOR19PQkpFQ1RfVFlQRV9UT19JTUFHRSIsImdldCIsIm1heEhlaWdodCIsIm1vZGVsVG9WaWV3WCIsIngiLCJtb2RlbFRvVmlld1kiLCJ5IiwiZGlzcG9zZSIsImFzc2VydCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiU3ViaXRpemVyTm9kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBTdWJpdGl6ZXJOb2RlIGRpc3BsYXlzIHRoZSBzdWJpdGl6ZWQgb2JqZWN0cyBpbiB0aGUgdmlldyBhbmQgdGhlIHN0YXJ0IHNlcXVlbmNlIGZvciB0aGUgc3ViaXRpemUgZ2FtZS5cclxuICpcclxuICogQGF1dGhvciBMdWlzYSBWYXJnYXNcclxuICogQGF1dGhvciBDaHJpcyBLbHVzZW5kb3JmIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBDb3VudGluZ0NvbW1vbkNvbnN0YW50cyBmcm9tICcuLi8uLi8uLi8uLi9jb3VudGluZy1jb21tb24vanMvY29tbW9uL0NvdW50aW5nQ29tbW9uQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IFZlY3RvcjIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1ZlY3RvcjIuanMnO1xyXG5pbXBvcnQgTW9kZWxWaWV3VHJhbnNmb3JtMiBmcm9tICcuLi8uLi8uLi8uLi9waGV0Y29tbW9uL2pzL3ZpZXcvTW9kZWxWaWV3VHJhbnNmb3JtMi5qcyc7XHJcbmltcG9ydCB7IENpcmNsZSwgQ29sb3IsIEltYWdlLCBOb2RlLCBQYXRoLCBSZWN0YW5nbGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgbnVtYmVyUGxheSBmcm9tICcuLi8uLi9udW1iZXJQbGF5LmpzJztcclxuaW1wb3J0IFN1Yml0aXplciBmcm9tICcuLi9tb2RlbC9TdWJpdGl6ZXIuanMnO1xyXG5pbXBvcnQgUmVjdGFuZ3VsYXJQdXNoQnV0dG9uIGZyb20gJy4uLy4uLy4uLy4uL3N1bi9qcy9idXR0b25zL1JlY3Rhbmd1bGFyUHVzaEJ1dHRvbi5qcyc7XHJcbmltcG9ydCBQbGF5SWNvblNoYXBlIGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnktcGhldC9qcy9QbGF5SWNvblNoYXBlLmpzJztcclxuaW1wb3J0IFN1Yml0aXplTG9hZGluZ0Jhck5vZGUgZnJvbSAnLi9TdWJpdGl6ZUxvYWRpbmdCYXJOb2RlLmpzJztcclxuaW1wb3J0IFN1Yml0aXplUmV2ZWFsQnV0dG9uIGZyb20gJy4vU3ViaXRpemVSZXZlYWxCdXR0b24uanMnO1xyXG5pbXBvcnQgTnVtYmVyUGxheUNvbnN0YW50cyBmcm9tICcuLi8uLi9jb21tb24vTnVtYmVyUGxheUNvbnN0YW50cy5qcyc7XHJcbmltcG9ydCBTdWJpdGl6ZU9iamVjdFR5cGUgZnJvbSAnLi4vbW9kZWwvU3ViaXRpemVPYmplY3RUeXBlLmpzJztcclxuaW1wb3J0IFBoZXRDb2xvclNjaGVtZSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMvUGhldENvbG9yU2NoZW1lLmpzJztcclxuaW1wb3J0IFRSZWFkT25seVByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvVFJlYWRPbmx5UHJvcGVydHkuanMnO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IEJBQ0tHUk9VTkRfUkVDVEFOR0xFX0NPUk5FUl9SQURJVVMgPSAxMDtcclxuY29uc3QgUkVWRUFMX0JVVFRPTl9NQVJHSU4gPSAxMjtcclxuXHJcbmNsYXNzIFN1Yml0aXplck5vZGUgZXh0ZW5kcyBOb2RlIHtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBzdWJpdGl6ZXI6IFN1Yml0aXplciwgaXNDaGFsbGVuZ2VTb2x2ZWRQcm9wZXJ0eTogVFJlYWRPbmx5UHJvcGVydHk8Ym9vbGVhbj4sIG5ld0NoYWxsZW5nZUNhbGxiYWNrOiAoKSA9PiB2b2lkICkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICAvLyBmb3Igc2NhbGluZyB0aGUgb2JqZWN0c1xyXG4gICAgY29uc3Qgc2NhbGVNVlQgPSBNb2RlbFZpZXdUcmFuc2Zvcm0yLmNyZWF0ZU9mZnNldFNjYWxlTWFwcGluZyggVmVjdG9yMi5aRVJPLCAxMDUgKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgYW5kIGFkZCB0aGUgYmFja2dyb3VuZE5vZGVcclxuICAgIGNvbnN0IGJhY2tncm91bmROb2RlID0gbmV3IFJlY3RhbmdsZSggMCwgMCwgc2NhbGVNVlQubW9kZWxUb1ZpZXdEZWx0YVgoIFN1Yml0aXplci5TVUJJVElaRVJfQk9VTkRTLndpZHRoICksXHJcbiAgICAgIHNjYWxlTVZULm1vZGVsVG9WaWV3RGVsdGFZKCBTdWJpdGl6ZXIuU1VCSVRJWkVSX0JPVU5EUy5oZWlnaHQgKSxcclxuICAgICAgQkFDS0dST1VORF9SRUNUQU5HTEVfQ09STkVSX1JBRElVUywgQkFDS0dST1VORF9SRUNUQU5HTEVfQ09STkVSX1JBRElVUywge1xyXG4gICAgICAgIGZpbGw6IENvbG9yLldISVRFLFxyXG4gICAgICAgIHN0cm9rZTogQ29sb3IuQkxBQ0ssXHJcbiAgICAgICAgbGluZVdpZHRoOiAyXHJcbiAgICAgIH0gKTtcclxuICAgIGJhY2tncm91bmROb2RlLmNlbnRlciA9IFZlY3RvcjIuWkVSTztcclxuICAgIHRoaXMuYWRkQ2hpbGQoIGJhY2tncm91bmROb2RlICk7XHJcblxyXG4gICAgLy8gY3JlYXRlIGFuZCBhZGQgdGhlIHN1Yml0aXplTG9hZGluZ0Jhck5vZGVcclxuICAgIGNvbnN0IHN1Yml0aXplTG9hZGluZ0Jhck5vZGUgPSBuZXcgU3ViaXRpemVMb2FkaW5nQmFyTm9kZSggbmV3Q2hhbGxlbmdlQ2FsbGJhY2ssIHN1Yml0aXplci5pc0xvYWRpbmdCYXJBbmltYXRpbmdQcm9wZXJ0eSApO1xyXG4gICAgc3ViaXRpemVMb2FkaW5nQmFyTm9kZS5jZW50ZXIgPSB0aGlzLmNlbnRlcjtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIHN1Yml0aXplTG9hZGluZ0Jhck5vZGUgKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgYW5kIGFkZCB0aGUgcGxheUJ1dHRvblxyXG4gICAgY29uc3QgcGxheUJ1dHRvbiA9IG5ldyBSZWN0YW5ndWxhclB1c2hCdXR0b24oIHtcclxuICAgICAgYmFzZUNvbG9yOiBQaGV0Q29sb3JTY2hlbWUuQlVUVE9OX1lFTExPVyxcclxuICAgICAgY29udGVudDogbmV3IFBhdGgoIG5ldyBQbGF5SWNvblNoYXBlKCAzNiwgNDUgKSwge1xyXG4gICAgICAgIGZpbGw6IENvbG9yLkJMQUNLLFxyXG4gICAgICAgIGNlbnRlclg6IDEuNCxcclxuICAgICAgICBjZW50ZXJZOiAwXHJcbiAgICAgIH0gKSxcclxuICAgICAgeE1hcmdpbjogMjUsXHJcbiAgICAgIHlNYXJnaW46IDE5LFxyXG4gICAgICB0b3VjaEFyZWFYRGlsYXRpb246IE51bWJlclBsYXlDb25zdGFudHMuVE9VQ0hfQVJFQV9ESUxBVElPTixcclxuICAgICAgdG91Y2hBcmVhWURpbGF0aW9uOiBOdW1iZXJQbGF5Q29uc3RhbnRzLlRPVUNIX0FSRUFfRElMQVRJT04sXHJcbiAgICAgIHZpc2libGVQcm9wZXJ0eTogc3ViaXRpemVyLmlzUGxheUJ1dHRvblZpc2libGVQcm9wZXJ0eSxcclxuICAgICAgbGlzdGVuZXI6ICgpID0+IHtcclxuICAgICAgICBzdWJpdGl6ZXIuaXNQbGF5QnV0dG9uVmlzaWJsZVByb3BlcnR5LnZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgc3ViaXRpemVMb2FkaW5nQmFyTm9kZS5zdGFydCgpO1xyXG4gICAgICB9XHJcbiAgICB9ICk7XHJcbiAgICBwbGF5QnV0dG9uLmNlbnRlciA9IHRoaXMuY2VudGVyO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggcGxheUJ1dHRvbiApO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBhbmQgYWRkIHRoZSBzdWJpdGl6ZVJldmVhbEJ1dHRvblxyXG4gICAgY29uc3Qgc3ViaXRpemVSZXZlYWxCdXR0b24gPSBuZXcgU3ViaXRpemVSZXZlYWxCdXR0b24oXHJcbiAgICAgIGlzQ2hhbGxlbmdlU29sdmVkUHJvcGVydHksXHJcbiAgICAgIHN1Yml0aXplci5pc0lucHV0RW5hYmxlZFByb3BlcnR5LFxyXG4gICAgICBzdWJpdGl6ZXIuaXNTaGFwZVZpc2libGVQcm9wZXJ0eVxyXG4gICAgKTtcclxuICAgIHN1Yml0aXplUmV2ZWFsQnV0dG9uLnJpZ2h0ID0gdGhpcy5yaWdodCAtIFJFVkVBTF9CVVRUT05fTUFSR0lOO1xyXG4gICAgc3ViaXRpemVSZXZlYWxCdXR0b24uYm90dG9tID0gdGhpcy5ib3R0b20gLSBSRVZFQUxfQlVUVE9OX01BUkdJTjtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIHN1Yml0aXplUmV2ZWFsQnV0dG9uICk7XHJcblxyXG4gICAgLy8gY3JlYXRlIGFuZCBhZGQgdGhlIGRyYXdpbmdOb2RlLCB3aGljaCBpcyB3aGVyZSB0aGUgb2JqZWN0cyBhcmUgYWRkZWQgdG9cclxuICAgIGNvbnN0IGRyYXdpbmdOb2RlID0gbmV3IE5vZGUoIHtcclxuICAgICAgdmlzaWJsZVByb3BlcnR5OiBzdWJpdGl6ZXIuaXNTaGFwZVZpc2libGVQcm9wZXJ0eVxyXG4gICAgfSApO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggZHJhd2luZ05vZGUgKTtcclxuXHJcbiAgICAvLyB1cGRhdGUgdGhlIHZpZXcgc2hhcGUgd2hlbiB0aGUgbW9kZWwgcG9pbnRzIGNoYW5nZVxyXG4gICAgc3ViaXRpemVyLnBvaW50c1Byb3BlcnR5LmxpbmsoIHBvaW50cyA9PiB7XHJcbiAgICAgIGRyYXdpbmdOb2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcblxyXG4gICAgICAvLyBjcmVhdGUgYW5kIGFkZCBlYWNoIG9iamVjdCB0byB0aGUgZHJhd2luZ05vZGVcclxuICAgICAgcG9pbnRzLmZvckVhY2goIHBvaW50ID0+IHtcclxuICAgICAgICBsZXQgb2JqZWN0O1xyXG5cclxuICAgICAgICBpZiAoIHN1Yml0aXplci5vYmplY3RUeXBlUHJvcGVydHkudmFsdWUgPT09IFN1Yml0aXplT2JqZWN0VHlwZS5DSVJDTEUgKSB7XHJcbiAgICAgICAgICBvYmplY3QgPSBuZXcgQ2lyY2xlKCBzY2FsZU1WVC5tb2RlbFRvVmlld0RlbHRhWCggc3ViaXRpemVyLm9iamVjdFNpemUgLyAyICksIHsgZmlsbDogQ29sb3IuQkxBQ0sgfSApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIG9iamVjdCA9IG5ldyBJbWFnZShcclxuICAgICAgICAgICAgQ291bnRpbmdDb21tb25Db25zdGFudHMuQ09VTlRJTkdfT0JKRUNUX1RZUEVfVE9fSU1BR0UuZ2V0KCBzdWJpdGl6ZXIub2JqZWN0VHlwZVByb3BlcnR5LnZhbHVlICksIHtcclxuICAgICAgICAgICAgICBtYXhIZWlnaHQ6IHNjYWxlTVZULm1vZGVsVG9WaWV3RGVsdGFYKCBzdWJpdGl6ZXIub2JqZWN0U2l6ZSApXHJcbiAgICAgICAgICAgIH0gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JqZWN0LmNlbnRlclggPSBzY2FsZU1WVC5tb2RlbFRvVmlld1goIHBvaW50LnggKTtcclxuICAgICAgICBvYmplY3QuY2VudGVyWSA9IHNjYWxlTVZULm1vZGVsVG9WaWV3WSggcG9pbnQueSApO1xyXG4gICAgICAgIGRyYXdpbmdOb2RlLmFkZENoaWxkKCBvYmplY3QgKTtcclxuICAgICAgfSApO1xyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG92ZXJyaWRlIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCBmYWxzZSwgJ2Rpc3Bvc2UgaXMgbm90IHN1cHBvcnRlZCwgZXhpc3RzIGZvciB0aGUgbGlmZXRpbWUgb2YgdGhlIHNpbScgKTtcclxuICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICB9XHJcbn1cclxuXHJcbm51bWJlclBsYXkucmVnaXN0ZXIoICdTdWJpdGl6ZXJOb2RlJywgU3ViaXRpemVyTm9kZSApO1xyXG5leHBvcnQgZGVmYXVsdCBTdWJpdGl6ZXJOb2RlOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLHVCQUF1QixNQUFNLGtFQUFrRTtBQUN0RyxPQUFPQyxPQUFPLE1BQU0sK0JBQStCO0FBQ25ELE9BQU9DLG1CQUFtQixNQUFNLHVEQUF1RDtBQUN2RixTQUFTQyxNQUFNLEVBQUVDLEtBQUssRUFBRUMsS0FBSyxFQUFFQyxJQUFJLEVBQUVDLElBQUksRUFBRUMsU0FBUyxRQUFRLG1DQUFtQztBQUMvRixPQUFPQyxVQUFVLE1BQU0scUJBQXFCO0FBQzVDLE9BQU9DLFNBQVMsTUFBTSx1QkFBdUI7QUFDN0MsT0FBT0MscUJBQXFCLE1BQU0scURBQXFEO0FBQ3ZGLE9BQU9DLGFBQWEsTUFBTSw4Q0FBOEM7QUFDeEUsT0FBT0Msc0JBQXNCLE1BQU0sNkJBQTZCO0FBQ2hFLE9BQU9DLG9CQUFvQixNQUFNLDJCQUEyQjtBQUM1RCxPQUFPQyxtQkFBbUIsTUFBTSxxQ0FBcUM7QUFDckUsT0FBT0Msa0JBQWtCLE1BQU0sZ0NBQWdDO0FBQy9ELE9BQU9DLGVBQWUsTUFBTSxnREFBZ0Q7QUFHNUU7QUFDQSxNQUFNQyxrQ0FBa0MsR0FBRyxFQUFFO0FBQzdDLE1BQU1DLG9CQUFvQixHQUFHLEVBQUU7QUFFL0IsTUFBTUMsYUFBYSxTQUFTZCxJQUFJLENBQUM7RUFF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