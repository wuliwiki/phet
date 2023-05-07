// Copyright 2019-2023, University of Colorado Boulder

/**
 * EquationsScreenView is the view for the 'Equations' screen.
 *
 * @author Martin Veillette
 */

import { AlignGroup } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import CoordinateSnapModes from '../../common/model/CoordinateSnapModes.js';
import VectorAdditionConstants from '../../common/VectorAdditionConstants.js';
import CoordinateSnapRadioButtonGroup from '../../common/view/CoordinateSnapRadioButtonGroup.js';
import VectorAdditionScreenView from '../../common/view/VectorAdditionScreenView.js';
import vectorAddition from '../../vectorAddition.js';
import EquationsModel from '../model/EquationsModel.js';
import EquationsGraphControlPanel from './EquationsGraphControlPanel.js';
import EquationsSceneNode from './EquationsSceneNode.js';
import EquationsViewProperties from './EquationsViewProperties.js';
export default class EquationsScreenView extends VectorAdditionScreenView {
  /**
   * @param {EquationsModel} model
   * @param {Tandem} tandem
   */
  constructor(model, tandem) {
    assert && assert(model instanceof EquationsModel, `invalid model: ${model}`);
    assert && assert(tandem instanceof Tandem, `invalid tandem: ${tandem}`);
    super(model, tandem);

    // @private view-specific Properties
    this.viewProperties = new EquationsViewProperties();

    // Controls for the graph, at upper right
    const graphControlPanel = new EquationsGraphControlPanel(model.cartesianGraph.vectorSet, model.polarGraph.vectorSet, model.componentStyleProperty, this.viewProperties, {
      right: VectorAdditionConstants.SCREEN_VIEW_BOUNDS.right - VectorAdditionConstants.SCREEN_VIEW_X_MARGIN,
      top: VectorAdditionConstants.SCREEN_VIEW_BOUNDS.top + VectorAdditionConstants.SCREEN_VIEW_Y_MARGIN
    });

    // Coordinate Snap radio buttons, at lower right
    const coordinateSnapRadioButtonGroup = new CoordinateSnapRadioButtonGroup(this.viewProperties.coordinateSnapModeProperty, model.cartesianVectorColorPalette, model.polarVectorColorPalette, {
      left: graphControlPanel.left,
      bottom: this.resetAllButton.bottom
    });

    // Used to make all of the radio button in the Equation toggle box the same effective size.
    const equationButtonsAlignGroup = new AlignGroup({
      matchHorizontal: true,
      matchVertical: true
    });

    // Used to make all of the interactive equations in the Equation toggle box the same effective size.
    const equationsAlignGroup = new AlignGroup({
      matchHorizontal: true,
      matchVertical: true
    });
    const polarScene = new EquationsSceneNode(model.polarGraph, this.viewProperties, model.componentStyleProperty, graphControlPanel.bottom, equationButtonsAlignGroup, equationsAlignGroup);
    const cartesianScene = new EquationsSceneNode(model.cartesianGraph, this.viewProperties, model.componentStyleProperty, graphControlPanel.bottom, equationButtonsAlignGroup, equationsAlignGroup);

    // Switch between scenes to match coordinate snap mode.
    // unlink is unnecessary, exists for the lifetime of the sim.
    this.viewProperties.coordinateSnapModeProperty.link(coordinateSnapMode => {
      this.interruptSubtreeInput(); // cancel interactions when switching scenes
      polarScene.visible = coordinateSnapMode === CoordinateSnapModes.POLAR;
      cartesianScene.visible = coordinateSnapMode === CoordinateSnapModes.CARTESIAN;
    });
    this.addChild(graphControlPanel);
    this.addChild(coordinateSnapRadioButtonGroup);
    this.addChild(polarScene);
    this.addChild(cartesianScene);
  }

  /**
   * @public
   * @override
   */
  reset() {
    super.reset();
    this.viewProperties.reset();
  }
}
vectorAddition.register('EquationsScreenView', EquationsScreenView);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBbGlnbkdyb3VwIiwiVGFuZGVtIiwiQ29vcmRpbmF0ZVNuYXBNb2RlcyIsIlZlY3RvckFkZGl0aW9uQ29uc3RhbnRzIiwiQ29vcmRpbmF0ZVNuYXBSYWRpb0J1dHRvbkdyb3VwIiwiVmVjdG9yQWRkaXRpb25TY3JlZW5WaWV3IiwidmVjdG9yQWRkaXRpb24iLCJFcXVhdGlvbnNNb2RlbCIsIkVxdWF0aW9uc0dyYXBoQ29udHJvbFBhbmVsIiwiRXF1YXRpb25zU2NlbmVOb2RlIiwiRXF1YXRpb25zVmlld1Byb3BlcnRpZXMiLCJFcXVhdGlvbnNTY3JlZW5WaWV3IiwiY29uc3RydWN0b3IiLCJtb2RlbCIsInRhbmRlbSIsImFzc2VydCIsInZpZXdQcm9wZXJ0aWVzIiwiZ3JhcGhDb250cm9sUGFuZWwiLCJjYXJ0ZXNpYW5HcmFwaCIsInZlY3RvclNldCIsInBvbGFyR3JhcGgiLCJjb21wb25lbnRTdHlsZVByb3BlcnR5IiwicmlnaHQiLCJTQ1JFRU5fVklFV19CT1VORFMiLCJTQ1JFRU5fVklFV19YX01BUkdJTiIsInRvcCIsIlNDUkVFTl9WSUVXX1lfTUFSR0lOIiwiY29vcmRpbmF0ZVNuYXBSYWRpb0J1dHRvbkdyb3VwIiwiY29vcmRpbmF0ZVNuYXBNb2RlUHJvcGVydHkiLCJjYXJ0ZXNpYW5WZWN0b3JDb2xvclBhbGV0dGUiLCJwb2xhclZlY3RvckNvbG9yUGFsZXR0ZSIsImxlZnQiLCJib3R0b20iLCJyZXNldEFsbEJ1dHRvbiIsImVxdWF0aW9uQnV0dG9uc0FsaWduR3JvdXAiLCJtYXRjaEhvcml6b250YWwiLCJtYXRjaFZlcnRpY2FsIiwiZXF1YXRpb25zQWxpZ25Hcm91cCIsInBvbGFyU2NlbmUiLCJjYXJ0ZXNpYW5TY2VuZSIsImxpbmsiLCJjb29yZGluYXRlU25hcE1vZGUiLCJpbnRlcnJ1cHRTdWJ0cmVlSW5wdXQiLCJ2aXNpYmxlIiwiUE9MQVIiLCJDQVJURVNJQU4iLCJhZGRDaGlsZCIsInJlc2V0IiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJFcXVhdGlvbnNTY3JlZW5WaWV3LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE5LTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIEVxdWF0aW9uc1NjcmVlblZpZXcgaXMgdGhlIHZpZXcgZm9yIHRoZSAnRXF1YXRpb25zJyBzY3JlZW4uXHJcbiAqXHJcbiAqIEBhdXRob3IgTWFydGluIFZlaWxsZXR0ZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEFsaWduR3JvdXAgfSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgVGFuZGVtIGZyb20gJy4uLy4uLy4uLy4uL3RhbmRlbS9qcy9UYW5kZW0uanMnO1xyXG5pbXBvcnQgQ29vcmRpbmF0ZVNuYXBNb2RlcyBmcm9tICcuLi8uLi9jb21tb24vbW9kZWwvQ29vcmRpbmF0ZVNuYXBNb2Rlcy5qcyc7XHJcbmltcG9ydCBWZWN0b3JBZGRpdGlvbkNvbnN0YW50cyBmcm9tICcuLi8uLi9jb21tb24vVmVjdG9yQWRkaXRpb25Db25zdGFudHMuanMnO1xyXG5pbXBvcnQgQ29vcmRpbmF0ZVNuYXBSYWRpb0J1dHRvbkdyb3VwIGZyb20gJy4uLy4uL2NvbW1vbi92aWV3L0Nvb3JkaW5hdGVTbmFwUmFkaW9CdXR0b25Hcm91cC5qcyc7XHJcbmltcG9ydCBWZWN0b3JBZGRpdGlvblNjcmVlblZpZXcgZnJvbSAnLi4vLi4vY29tbW9uL3ZpZXcvVmVjdG9yQWRkaXRpb25TY3JlZW5WaWV3LmpzJztcclxuaW1wb3J0IHZlY3RvckFkZGl0aW9uIGZyb20gJy4uLy4uL3ZlY3RvckFkZGl0aW9uLmpzJztcclxuaW1wb3J0IEVxdWF0aW9uc01vZGVsIGZyb20gJy4uL21vZGVsL0VxdWF0aW9uc01vZGVsLmpzJztcclxuaW1wb3J0IEVxdWF0aW9uc0dyYXBoQ29udHJvbFBhbmVsIGZyb20gJy4vRXF1YXRpb25zR3JhcGhDb250cm9sUGFuZWwuanMnO1xyXG5pbXBvcnQgRXF1YXRpb25zU2NlbmVOb2RlIGZyb20gJy4vRXF1YXRpb25zU2NlbmVOb2RlLmpzJztcclxuaW1wb3J0IEVxdWF0aW9uc1ZpZXdQcm9wZXJ0aWVzIGZyb20gJy4vRXF1YXRpb25zVmlld1Byb3BlcnRpZXMuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXF1YXRpb25zU2NyZWVuVmlldyBleHRlbmRzIFZlY3RvckFkZGl0aW9uU2NyZWVuVmlldyB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7RXF1YXRpb25zTW9kZWx9IG1vZGVsXHJcbiAgICogQHBhcmFtIHtUYW5kZW19IHRhbmRlbVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBtb2RlbCwgdGFuZGVtICkge1xyXG5cclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIG1vZGVsIGluc3RhbmNlb2YgRXF1YXRpb25zTW9kZWwsIGBpbnZhbGlkIG1vZGVsOiAke21vZGVsfWAgKTtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIHRhbmRlbSBpbnN0YW5jZW9mIFRhbmRlbSwgYGludmFsaWQgdGFuZGVtOiAke3RhbmRlbX1gICk7XHJcblxyXG4gICAgc3VwZXIoIG1vZGVsLCB0YW5kZW0gKTtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZSB2aWV3LXNwZWNpZmljIFByb3BlcnRpZXNcclxuICAgIHRoaXMudmlld1Byb3BlcnRpZXMgPSBuZXcgRXF1YXRpb25zVmlld1Byb3BlcnRpZXMoKTtcclxuXHJcbiAgICAvLyBDb250cm9scyBmb3IgdGhlIGdyYXBoLCBhdCB1cHBlciByaWdodFxyXG4gICAgY29uc3QgZ3JhcGhDb250cm9sUGFuZWwgPSBuZXcgRXF1YXRpb25zR3JhcGhDb250cm9sUGFuZWwoXHJcbiAgICAgIG1vZGVsLmNhcnRlc2lhbkdyYXBoLnZlY3RvclNldCxcclxuICAgICAgbW9kZWwucG9sYXJHcmFwaC52ZWN0b3JTZXQsXHJcbiAgICAgIG1vZGVsLmNvbXBvbmVudFN0eWxlUHJvcGVydHksXHJcbiAgICAgIHRoaXMudmlld1Byb3BlcnRpZXMsIHtcclxuICAgICAgICByaWdodDogVmVjdG9yQWRkaXRpb25Db25zdGFudHMuU0NSRUVOX1ZJRVdfQk9VTkRTLnJpZ2h0IC0gVmVjdG9yQWRkaXRpb25Db25zdGFudHMuU0NSRUVOX1ZJRVdfWF9NQVJHSU4sXHJcbiAgICAgICAgdG9wOiBWZWN0b3JBZGRpdGlvbkNvbnN0YW50cy5TQ1JFRU5fVklFV19CT1VORFMudG9wICsgVmVjdG9yQWRkaXRpb25Db25zdGFudHMuU0NSRUVOX1ZJRVdfWV9NQVJHSU5cclxuICAgICAgfSApO1xyXG5cclxuICAgIC8vIENvb3JkaW5hdGUgU25hcCByYWRpbyBidXR0b25zLCBhdCBsb3dlciByaWdodFxyXG4gICAgY29uc3QgY29vcmRpbmF0ZVNuYXBSYWRpb0J1dHRvbkdyb3VwID0gbmV3IENvb3JkaW5hdGVTbmFwUmFkaW9CdXR0b25Hcm91cChcclxuICAgICAgdGhpcy52aWV3UHJvcGVydGllcy5jb29yZGluYXRlU25hcE1vZGVQcm9wZXJ0eSxcclxuICAgICAgbW9kZWwuY2FydGVzaWFuVmVjdG9yQ29sb3JQYWxldHRlLFxyXG4gICAgICBtb2RlbC5wb2xhclZlY3RvckNvbG9yUGFsZXR0ZSwge1xyXG4gICAgICAgIGxlZnQ6IGdyYXBoQ29udHJvbFBhbmVsLmxlZnQsXHJcbiAgICAgICAgYm90dG9tOiB0aGlzLnJlc2V0QWxsQnV0dG9uLmJvdHRvbVxyXG4gICAgICB9ICk7XHJcblxyXG4gICAgLy8gVXNlZCB0byBtYWtlIGFsbCBvZiB0aGUgcmFkaW8gYnV0dG9uIGluIHRoZSBFcXVhdGlvbiB0b2dnbGUgYm94IHRoZSBzYW1lIGVmZmVjdGl2ZSBzaXplLlxyXG4gICAgY29uc3QgZXF1YXRpb25CdXR0b25zQWxpZ25Hcm91cCA9IG5ldyBBbGlnbkdyb3VwKCB7XHJcbiAgICAgIG1hdGNoSG9yaXpvbnRhbDogdHJ1ZSxcclxuICAgICAgbWF0Y2hWZXJ0aWNhbDogdHJ1ZVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIFVzZWQgdG8gbWFrZSBhbGwgb2YgdGhlIGludGVyYWN0aXZlIGVxdWF0aW9ucyBpbiB0aGUgRXF1YXRpb24gdG9nZ2xlIGJveCB0aGUgc2FtZSBlZmZlY3RpdmUgc2l6ZS5cclxuICAgIGNvbnN0IGVxdWF0aW9uc0FsaWduR3JvdXAgPSBuZXcgQWxpZ25Hcm91cCgge1xyXG4gICAgICBtYXRjaEhvcml6b250YWw6IHRydWUsXHJcbiAgICAgIG1hdGNoVmVydGljYWw6IHRydWVcclxuICAgIH0gKTtcclxuXHJcbiAgICBjb25zdCBwb2xhclNjZW5lID0gbmV3IEVxdWF0aW9uc1NjZW5lTm9kZShcclxuICAgICAgbW9kZWwucG9sYXJHcmFwaCxcclxuICAgICAgdGhpcy52aWV3UHJvcGVydGllcyxcclxuICAgICAgbW9kZWwuY29tcG9uZW50U3R5bGVQcm9wZXJ0eSxcclxuICAgICAgZ3JhcGhDb250cm9sUGFuZWwuYm90dG9tLFxyXG4gICAgICBlcXVhdGlvbkJ1dHRvbnNBbGlnbkdyb3VwLFxyXG4gICAgICBlcXVhdGlvbnNBbGlnbkdyb3VwXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNhcnRlc2lhblNjZW5lID0gbmV3IEVxdWF0aW9uc1NjZW5lTm9kZShcclxuICAgICAgbW9kZWwuY2FydGVzaWFuR3JhcGgsXHJcbiAgICAgIHRoaXMudmlld1Byb3BlcnRpZXMsXHJcbiAgICAgIG1vZGVsLmNvbXBvbmVudFN0eWxlUHJvcGVydHksXHJcbiAgICAgIGdyYXBoQ29udHJvbFBhbmVsLmJvdHRvbSxcclxuICAgICAgZXF1YXRpb25CdXR0b25zQWxpZ25Hcm91cCxcclxuICAgICAgZXF1YXRpb25zQWxpZ25Hcm91cFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBTd2l0Y2ggYmV0d2VlbiBzY2VuZXMgdG8gbWF0Y2ggY29vcmRpbmF0ZSBzbmFwIG1vZGUuXHJcbiAgICAvLyB1bmxpbmsgaXMgdW5uZWNlc3NhcnksIGV4aXN0cyBmb3IgdGhlIGxpZmV0aW1lIG9mIHRoZSBzaW0uXHJcbiAgICB0aGlzLnZpZXdQcm9wZXJ0aWVzLmNvb3JkaW5hdGVTbmFwTW9kZVByb3BlcnR5LmxpbmsoIGNvb3JkaW5hdGVTbmFwTW9kZSA9PiB7XHJcbiAgICAgIHRoaXMuaW50ZXJydXB0U3VidHJlZUlucHV0KCk7IC8vIGNhbmNlbCBpbnRlcmFjdGlvbnMgd2hlbiBzd2l0Y2hpbmcgc2NlbmVzXHJcbiAgICAgIHBvbGFyU2NlbmUudmlzaWJsZSA9ICggY29vcmRpbmF0ZVNuYXBNb2RlID09PSBDb29yZGluYXRlU25hcE1vZGVzLlBPTEFSICk7XHJcbiAgICAgIGNhcnRlc2lhblNjZW5lLnZpc2libGUgPSAoIGNvb3JkaW5hdGVTbmFwTW9kZSA9PT0gQ29vcmRpbmF0ZVNuYXBNb2Rlcy5DQVJURVNJQU4gKTtcclxuICAgIH0gKTtcclxuXHJcbiAgICB0aGlzLmFkZENoaWxkKCBncmFwaENvbnRyb2xQYW5lbCApO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggY29vcmRpbmF0ZVNuYXBSYWRpb0J1dHRvbkdyb3VwICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCBwb2xhclNjZW5lICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCBjYXJ0ZXNpYW5TY2VuZSApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqIEBvdmVycmlkZVxyXG4gICAqL1xyXG4gIHJlc2V0KCkge1xyXG4gICAgc3VwZXIucmVzZXQoKTtcclxuICAgIHRoaXMudmlld1Byb3BlcnRpZXMucmVzZXQoKTtcclxuICB9XHJcbn1cclxuXHJcbnZlY3RvckFkZGl0aW9uLnJlZ2lzdGVyKCAnRXF1YXRpb25zU2NyZWVuVmlldycsIEVxdWF0aW9uc1NjcmVlblZpZXcgKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsVUFBVSxRQUFRLG1DQUFtQztBQUM5RCxPQUFPQyxNQUFNLE1BQU0saUNBQWlDO0FBQ3BELE9BQU9DLG1CQUFtQixNQUFNLDJDQUEyQztBQUMzRSxPQUFPQyx1QkFBdUIsTUFBTSx5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