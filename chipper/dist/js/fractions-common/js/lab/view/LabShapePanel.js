// Copyright 2018-2023, University of Colorado Boulder

/**
 * The top panel on the Lab screen which is two StackNodesBoxes and a toggle on the left to switch between them.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Fraction from '../../../../phetcommon/js/model/Fraction.js';
import { AlignBox, AlignGroup, HBox, Node } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Panel from '../../../../sun/js/Panel.js';
import BuildingRepresentation from '../../building/model/BuildingRepresentation.js';
import ShapePiece from '../../building/model/ShapePiece.js';
import ShapePieceNode from '../../building/view/ShapePieceNode.js';
import StackNodesBox from '../../building/view/StackNodesBox.js';
import FractionsCommonColors from '../../common/view/FractionsCommonColors.js';
import fractionsCommon from '../../fractionsCommon.js';
class LabShapePanel extends Panel {
  /**
   * NOTE: Adds permanent listeners, will leak if created many times.
   *
   * @param {BuildingLabModel} model
   * @param {function} pressCallback - function( {SceneryEvent}, {Stack} ) - Called when a press is started.
   */
  constructor(model, pressCallback) {
    const shapeBox = new HBox({
      spacing: 20
    });
    super(shapeBox, {
      xMargin: 15,
      yMargin: 10
    });
    const boxAlignGroup = new AlignGroup();
    const createBox = representation => {
      const stacks = model.shapeStacks.filter(shapeStack => {
        return shapeStack.representation === representation;
      });
      const groupStacks = model.shapeGroupStacks.filter(shapeGroupStack => {
        return shapeGroupStack.representation === representation;
      });
      return new StackNodesBox(stacks.concat(groupStacks), pressCallback, {
        padding: 37
      });
    };

    // @private {StackNodesBox}
    this.pieBox = createBox(BuildingRepresentation.PIE);
    this.barBox = createBox(BuildingRepresentation.BAR);
    const boxContainer = new Node({
      children: [new AlignBox(this.pieBox, {
        group: boxAlignGroup
      }), new AlignBox(this.barBox, {
        group: boxAlignGroup
      })]
    });

    // @private {Property.<BuildingRepresentation>}
    this.representationProperty = model.topRepresentationProperty;
    const representationRadioButtonGroup = new RectangularRadioButtonGroup(this.representationProperty, [{
      value: BuildingRepresentation.PIE,
      createNode: () => new ShapePieceNode(new ShapePiece(Fraction.ONE, BuildingRepresentation.PIE, FractionsCommonColors.labPieFillProperty), {
        scale: 0.3
      })
    }, {
      value: BuildingRepresentation.BAR,
      createNode: () => new ShapePieceNode(new ShapePiece(Fraction.ONE, BuildingRepresentation.BAR, FractionsCommonColors.labBarFillProperty), {
        scale: 0.3
      })
    }], {
      orientation: 'vertical',
      spacing: 5,
      touchAreaXDilation: 5,
      touchAreaYDilation: 2.5,
      radioButtonOptions: {
        baseColor: FractionsCommonColors.radioBaseProperty,
        xMargin: 6,
        yMargin: 6,
        buttonAppearanceStrategyOptions: {
          selectedLineWidth: 2,
          selectedStroke: FractionsCommonColors.radioStrokeProperty
        }
      }
    });
    shapeBox.children = [new AlignBox(representationRadioButtonGroup, {
      rightMargin: 10
    }), boxContainer];

    // Does not need an unlink, since this type is permanent.
    this.representationProperty.link(representation => {
      this.pieBox.visible = representation === BuildingRepresentation.PIE;
      this.barBox.visible = representation === BuildingRepresentation.BAR;
    });
  }

  /**
   * Sets the model positions of our model objects corresponding to their displayed (view) positions.
   * @public
   *
   * @param {ModelViewTransform2} modelViewTransform
   */
  updateModelPositions(modelViewTransform) {
    this.pieBox.updateModelPositions(modelViewTransform, this);
    this.barBox.updateModelPositions(modelViewTransform, this);
  }
}
fractionsCommon.register('LabShapePanel', LabShapePanel);
export default LabShapePanel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJGcmFjdGlvbiIsIkFsaWduQm94IiwiQWxpZ25Hcm91cCIsIkhCb3giLCJOb2RlIiwiUmVjdGFuZ3VsYXJSYWRpb0J1dHRvbkdyb3VwIiwiUGFuZWwiLCJCdWlsZGluZ1JlcHJlc2VudGF0aW9uIiwiU2hhcGVQaWVjZSIsIlNoYXBlUGllY2VOb2RlIiwiU3RhY2tOb2Rlc0JveCIsIkZyYWN0aW9uc0NvbW1vbkNvbG9ycyIsImZyYWN0aW9uc0NvbW1vbiIsIkxhYlNoYXBlUGFuZWwiLCJjb25zdHJ1Y3RvciIsIm1vZGVsIiwicHJlc3NDYWxsYmFjayIsInNoYXBlQm94Iiwic3BhY2luZyIsInhNYXJnaW4iLCJ5TWFyZ2luIiwiYm94QWxpZ25Hcm91cCIsImNyZWF0ZUJveCIsInJlcHJlc2VudGF0aW9uIiwic3RhY2tzIiwic2hhcGVTdGFja3MiLCJmaWx0ZXIiLCJzaGFwZVN0YWNrIiwiZ3JvdXBTdGFja3MiLCJzaGFwZUdyb3VwU3RhY2tzIiwic2hhcGVHcm91cFN0YWNrIiwiY29uY2F0IiwicGFkZGluZyIsInBpZUJveCIsIlBJRSIsImJhckJveCIsIkJBUiIsImJveENvbnRhaW5lciIsImNoaWxkcmVuIiwiZ3JvdXAiLCJyZXByZXNlbnRhdGlvblByb3BlcnR5IiwidG9wUmVwcmVzZW50YXRpb25Qcm9wZXJ0eSIsInJlcHJlc2VudGF0aW9uUmFkaW9CdXR0b25Hcm91cCIsInZhbHVlIiwiY3JlYXRlTm9kZSIsIk9ORSIsImxhYlBpZUZpbGxQcm9wZXJ0eSIsInNjYWxlIiwibGFiQmFyRmlsbFByb3BlcnR5Iiwib3JpZW50YXRpb24iLCJ0b3VjaEFyZWFYRGlsYXRpb24iLCJ0b3VjaEFyZWFZRGlsYXRpb24iLCJyYWRpb0J1dHRvbk9wdGlvbnMiLCJiYXNlQ29sb3IiLCJyYWRpb0Jhc2VQcm9wZXJ0eSIsImJ1dHRvbkFwcGVhcmFuY2VTdHJhdGVneU9wdGlvbnMiLCJzZWxlY3RlZExpbmVXaWR0aCIsInNlbGVjdGVkU3Ryb2tlIiwicmFkaW9TdHJva2VQcm9wZXJ0eSIsInJpZ2h0TWFyZ2luIiwibGluayIsInZpc2libGUiLCJ1cGRhdGVNb2RlbFBvc2l0aW9ucyIsIm1vZGVsVmlld1RyYW5zZm9ybSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiTGFiU2hhcGVQYW5lbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBUaGUgdG9wIHBhbmVsIG9uIHRoZSBMYWIgc2NyZWVuIHdoaWNoIGlzIHR3byBTdGFja05vZGVzQm94ZXMgYW5kIGEgdG9nZ2xlIG9uIHRoZSBsZWZ0IHRvIHN3aXRjaCBiZXR3ZWVuIHRoZW0uXHJcbiAqXHJcbiAqIEBhdXRob3IgSm9uYXRoYW4gT2xzb24gPGpvbmF0aGFuLm9sc29uQGNvbG9yYWRvLmVkdT5cclxuICovXHJcblxyXG5pbXBvcnQgRnJhY3Rpb24gZnJvbSAnLi4vLi4vLi4vLi4vcGhldGNvbW1vbi9qcy9tb2RlbC9GcmFjdGlvbi5qcyc7XHJcbmltcG9ydCB7IEFsaWduQm94LCBBbGlnbkdyb3VwLCBIQm94LCBOb2RlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IFJlY3Rhbmd1bGFyUmFkaW9CdXR0b25Hcm91cCBmcm9tICcuLi8uLi8uLi8uLi9zdW4vanMvYnV0dG9ucy9SZWN0YW5ndWxhclJhZGlvQnV0dG9uR3JvdXAuanMnO1xyXG5pbXBvcnQgUGFuZWwgZnJvbSAnLi4vLi4vLi4vLi4vc3VuL2pzL1BhbmVsLmpzJztcclxuaW1wb3J0IEJ1aWxkaW5nUmVwcmVzZW50YXRpb24gZnJvbSAnLi4vLi4vYnVpbGRpbmcvbW9kZWwvQnVpbGRpbmdSZXByZXNlbnRhdGlvbi5qcyc7XHJcbmltcG9ydCBTaGFwZVBpZWNlIGZyb20gJy4uLy4uL2J1aWxkaW5nL21vZGVsL1NoYXBlUGllY2UuanMnO1xyXG5pbXBvcnQgU2hhcGVQaWVjZU5vZGUgZnJvbSAnLi4vLi4vYnVpbGRpbmcvdmlldy9TaGFwZVBpZWNlTm9kZS5qcyc7XHJcbmltcG9ydCBTdGFja05vZGVzQm94IGZyb20gJy4uLy4uL2J1aWxkaW5nL3ZpZXcvU3RhY2tOb2Rlc0JveC5qcyc7XHJcbmltcG9ydCBGcmFjdGlvbnNDb21tb25Db2xvcnMgZnJvbSAnLi4vLi4vY29tbW9uL3ZpZXcvRnJhY3Rpb25zQ29tbW9uQ29sb3JzLmpzJztcclxuaW1wb3J0IGZyYWN0aW9uc0NvbW1vbiBmcm9tICcuLi8uLi9mcmFjdGlvbnNDb21tb24uanMnO1xyXG5cclxuY2xhc3MgTGFiU2hhcGVQYW5lbCBleHRlbmRzIFBhbmVsIHtcclxuICAvKipcclxuICAgKiBOT1RFOiBBZGRzIHBlcm1hbmVudCBsaXN0ZW5lcnMsIHdpbGwgbGVhayBpZiBjcmVhdGVkIG1hbnkgdGltZXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0J1aWxkaW5nTGFiTW9kZWx9IG1vZGVsXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJlc3NDYWxsYmFjayAtIGZ1bmN0aW9uKCB7U2NlbmVyeUV2ZW50fSwge1N0YWNrfSApIC0gQ2FsbGVkIHdoZW4gYSBwcmVzcyBpcyBzdGFydGVkLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBtb2RlbCwgcHJlc3NDYWxsYmFjayApIHtcclxuICAgIGNvbnN0IHNoYXBlQm94ID0gbmV3IEhCb3goIHtcclxuICAgICAgc3BhY2luZzogMjBcclxuICAgIH0gKTtcclxuXHJcbiAgICBzdXBlciggc2hhcGVCb3gsIHtcclxuICAgICAgeE1hcmdpbjogMTUsXHJcbiAgICAgIHlNYXJnaW46IDEwXHJcbiAgICB9ICk7XHJcblxyXG4gICAgY29uc3QgYm94QWxpZ25Hcm91cCA9IG5ldyBBbGlnbkdyb3VwKCk7XHJcblxyXG4gICAgY29uc3QgY3JlYXRlQm94ID0gcmVwcmVzZW50YXRpb24gPT4ge1xyXG4gICAgICBjb25zdCBzdGFja3MgPSBtb2RlbC5zaGFwZVN0YWNrcy5maWx0ZXIoIHNoYXBlU3RhY2sgPT4ge1xyXG4gICAgICAgIHJldHVybiBzaGFwZVN0YWNrLnJlcHJlc2VudGF0aW9uID09PSByZXByZXNlbnRhdGlvbjtcclxuICAgICAgfSApO1xyXG4gICAgICBjb25zdCBncm91cFN0YWNrcyA9IG1vZGVsLnNoYXBlR3JvdXBTdGFja3MuZmlsdGVyKCBzaGFwZUdyb3VwU3RhY2sgPT4ge1xyXG4gICAgICAgIHJldHVybiBzaGFwZUdyb3VwU3RhY2sucmVwcmVzZW50YXRpb24gPT09IHJlcHJlc2VudGF0aW9uO1xyXG4gICAgICB9ICk7XHJcbiAgICAgIHJldHVybiBuZXcgU3RhY2tOb2Rlc0JveCggc3RhY2tzLmNvbmNhdCggZ3JvdXBTdGFja3MgKSwgcHJlc3NDYWxsYmFjaywge1xyXG4gICAgICAgIHBhZGRpbmc6IDM3XHJcbiAgICAgIH0gKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQHByaXZhdGUge1N0YWNrTm9kZXNCb3h9XHJcbiAgICB0aGlzLnBpZUJveCA9IGNyZWF0ZUJveCggQnVpbGRpbmdSZXByZXNlbnRhdGlvbi5QSUUgKTtcclxuICAgIHRoaXMuYmFyQm94ID0gY3JlYXRlQm94KCBCdWlsZGluZ1JlcHJlc2VudGF0aW9uLkJBUiApO1xyXG5cclxuICAgIGNvbnN0IGJveENvbnRhaW5lciA9IG5ldyBOb2RlKCB7XHJcbiAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgbmV3IEFsaWduQm94KCB0aGlzLnBpZUJveCwgeyBncm91cDogYm94QWxpZ25Hcm91cCB9ICksXHJcbiAgICAgICAgbmV3IEFsaWduQm94KCB0aGlzLmJhckJveCwgeyBncm91cDogYm94QWxpZ25Hcm91cCB9IClcclxuICAgICAgXVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIEBwcml2YXRlIHtQcm9wZXJ0eS48QnVpbGRpbmdSZXByZXNlbnRhdGlvbj59XHJcbiAgICB0aGlzLnJlcHJlc2VudGF0aW9uUHJvcGVydHkgPSBtb2RlbC50b3BSZXByZXNlbnRhdGlvblByb3BlcnR5O1xyXG5cclxuICAgIGNvbnN0IHJlcHJlc2VudGF0aW9uUmFkaW9CdXR0b25Hcm91cCA9IG5ldyBSZWN0YW5ndWxhclJhZGlvQnV0dG9uR3JvdXAoIHRoaXMucmVwcmVzZW50YXRpb25Qcm9wZXJ0eSwgW1xyXG4gICAgICB7XHJcbiAgICAgICAgdmFsdWU6IEJ1aWxkaW5nUmVwcmVzZW50YXRpb24uUElFLFxyXG4gICAgICAgIGNyZWF0ZU5vZGU6ICgpID0+IG5ldyBTaGFwZVBpZWNlTm9kZSggbmV3IFNoYXBlUGllY2UoIEZyYWN0aW9uLk9ORSwgQnVpbGRpbmdSZXByZXNlbnRhdGlvbi5QSUUsIEZyYWN0aW9uc0NvbW1vbkNvbG9ycy5sYWJQaWVGaWxsUHJvcGVydHkgKSwge1xyXG4gICAgICAgICAgc2NhbGU6IDAuM1xyXG4gICAgICAgIH0gKVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdmFsdWU6IEJ1aWxkaW5nUmVwcmVzZW50YXRpb24uQkFSLFxyXG4gICAgICAgIGNyZWF0ZU5vZGU6ICgpID0+IG5ldyBTaGFwZVBpZWNlTm9kZSggbmV3IFNoYXBlUGllY2UoIEZyYWN0aW9uLk9ORSwgQnVpbGRpbmdSZXByZXNlbnRhdGlvbi5CQVIsIEZyYWN0aW9uc0NvbW1vbkNvbG9ycy5sYWJCYXJGaWxsUHJvcGVydHkgKSwge1xyXG4gICAgICAgICAgc2NhbGU6IDAuM1xyXG4gICAgICAgIH0gKVxyXG4gICAgICB9XHJcbiAgICBdLCB7XHJcbiAgICAgIG9yaWVudGF0aW9uOiAndmVydGljYWwnLFxyXG4gICAgICBzcGFjaW5nOiA1LFxyXG4gICAgICB0b3VjaEFyZWFYRGlsYXRpb246IDUsXHJcbiAgICAgIHRvdWNoQXJlYVlEaWxhdGlvbjogMi41LFxyXG4gICAgICByYWRpb0J1dHRvbk9wdGlvbnM6IHtcclxuICAgICAgICBiYXNlQ29sb3I6IEZyYWN0aW9uc0NvbW1vbkNvbG9ycy5yYWRpb0Jhc2VQcm9wZXJ0eSxcclxuICAgICAgICB4TWFyZ2luOiA2LFxyXG4gICAgICAgIHlNYXJnaW46IDYsXHJcbiAgICAgICAgYnV0dG9uQXBwZWFyYW5jZVN0cmF0ZWd5T3B0aW9uczoge1xyXG4gICAgICAgICAgc2VsZWN0ZWRMaW5lV2lkdGg6IDIsXHJcbiAgICAgICAgICBzZWxlY3RlZFN0cm9rZTogRnJhY3Rpb25zQ29tbW9uQ29sb3JzLnJhZGlvU3Ryb2tlUHJvcGVydHlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gKTtcclxuXHJcbiAgICBzaGFwZUJveC5jaGlsZHJlbiA9IFtcclxuICAgICAgbmV3IEFsaWduQm94KCByZXByZXNlbnRhdGlvblJhZGlvQnV0dG9uR3JvdXAsIHtcclxuICAgICAgICByaWdodE1hcmdpbjogMTBcclxuICAgICAgfSApLFxyXG4gICAgICBib3hDb250YWluZXJcclxuICAgIF07XHJcblxyXG4gICAgLy8gRG9lcyBub3QgbmVlZCBhbiB1bmxpbmssIHNpbmNlIHRoaXMgdHlwZSBpcyBwZXJtYW5lbnQuXHJcbiAgICB0aGlzLnJlcHJlc2VudGF0aW9uUHJvcGVydHkubGluayggcmVwcmVzZW50YXRpb24gPT4ge1xyXG4gICAgICB0aGlzLnBpZUJveC52aXNpYmxlID0gcmVwcmVzZW50YXRpb24gPT09IEJ1aWxkaW5nUmVwcmVzZW50YXRpb24uUElFO1xyXG4gICAgICB0aGlzLmJhckJveC52aXNpYmxlID0gcmVwcmVzZW50YXRpb24gPT09IEJ1aWxkaW5nUmVwcmVzZW50YXRpb24uQkFSO1xyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgbW9kZWwgcG9zaXRpb25zIG9mIG91ciBtb2RlbCBvYmplY3RzIGNvcnJlc3BvbmRpbmcgdG8gdGhlaXIgZGlzcGxheWVkICh2aWV3KSBwb3NpdGlvbnMuXHJcbiAgICogQHB1YmxpY1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtNb2RlbFZpZXdUcmFuc2Zvcm0yfSBtb2RlbFZpZXdUcmFuc2Zvcm1cclxuICAgKi9cclxuICB1cGRhdGVNb2RlbFBvc2l0aW9ucyggbW9kZWxWaWV3VHJhbnNmb3JtICkge1xyXG4gICAgdGhpcy5waWVCb3gudXBkYXRlTW9kZWxQb3NpdGlvbnMoIG1vZGVsVmlld1RyYW5zZm9ybSwgdGhpcyApO1xyXG4gICAgdGhpcy5iYXJCb3gudXBkYXRlTW9kZWxQb3NpdGlvbnMoIG1vZGVsVmlld1RyYW5zZm9ybSwgdGhpcyApO1xyXG4gIH1cclxufVxyXG5cclxuZnJhY3Rpb25zQ29tbW9uLnJlZ2lzdGVyKCAnTGFiU2hhcGVQYW5lbCcsIExhYlNoYXBlUGFuZWwgKTtcclxuZXhwb3J0IGRlZmF1bHQgTGFiU2hhcGVQYW5lbDtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFFBQVEsTUFBTSw2Q0FBNkM7QUFDbEUsU0FBU0MsUUFBUSxFQUFFQyxVQUFVLEVBQUVDLElBQUksRUFBRUMsSUFBSSxRQUFRLG1DQUFtQztBQUNwRixPQUFPQywyQkFBMkIsTUFBTSwyREFBMkQ7QUFDbkcsT0FBT0MsS0FBSyxNQUFNLDZCQUE2QjtBQUMvQyxPQUFPQyxzQkFBc0IsTUFBTSxnREFBZ0Q7QUFDbkYsT0FBT0MsVUFBVSxNQUFNLG9DQUFvQztBQUMzRCxPQUFPQyxjQUFjLE1BQU0sdUNBQXVDO0FBQ2xFLE9BQU9DLGFBQWEsTUFBTSxzQ0FBc0M7QUFDaEUsT0FBT0MscUJBQXFCLE1BQU0sNENBQTRDO0FBQzlFLE9BQU9DLGVBQWUsTUFBTSwwQkFBMEI7QUFFdEQsTUFBTUMsYUFBYSxTQUFTUCxLQUFLLENBQUM7RUFDaEM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0VRLFdBQVdBLENBQUVDLEtBQUssRUFBRUMsYUFBYSxFQUFHO0lBQ2xDLE1BQU1DLFFBQVEsR0FBRyxJQUFJZCxJQUFJLENBQUU7TUFDekJlLE9BQU8sRUFBRTtJQUNYLENBQUUsQ0FBQztJQUVILEtBQUssQ0FBRUQsUUFBUSxFQUFFO01BQ2ZFLE9BQU8sRUFBRSxFQUFFO01BQ1hDLE9BQU8sRUFBRTtJQUNYLENBQUUsQ0FBQztJQUVILE1BQU1D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