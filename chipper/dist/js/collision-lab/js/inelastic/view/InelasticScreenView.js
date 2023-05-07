// Copyright 2019-2020, University of Colorado Boulder

/**
 * Top level view for the 'Inelastic' screen.
 *
 * @author BrandonLi
 */

import merge from '../../../../phet-core/js/merge.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import collisionLab from '../../collisionLab.js';
import BallSystemNode from '../../common/view/BallSystemNode.js';
import CollisionLabScreenView from '../../common/view/CollisionLabScreenView.js';
import CollisionLabViewProperties from '../../common/view/CollisionLabViewProperties.js';
import InelasticModel from '../model/InelasticModel.js';
import InelasticControlPanel from './InelasticControlPanel.js';
import PresetRadioButtonGroup from './PresetRadioButtonGroup.js';
class InelasticScreenView extends CollisionLabScreenView {
  /**
   * @param {InelasticModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor(model, tandem, options) {
    assert && assert(model instanceof InelasticModel, `invalid model: ${model}`);
    assert && assert(tandem instanceof Tandem, `invalid tandem: ${tandem}`);
    options = merge({
      playAreaTopRightControlsOptions: {
        includeNumberOfBallsSpinner: false
      },
      includeStepBack: false
    }, options);
    super(model, tandem, options);

    //----------------------------------------------------------------------------------------

    // Preset radio button group
    const presetRadioButtonGroup = new PresetRadioButtonGroup(model.ballSystem.inelasticPresetProperty, {
      leftTop: this.ballValuesPanel.leftBottom.addXY(0, 10)
    });
    this.addChild(presetRadioButtonGroup);
    presetRadioButtonGroup.moveToBack();
  }

  /**
   * Creates the CollisionLabControlPanel for the 'Inelastic' screen. Called in the constructor of the super-class.
   *
   * @override
   * @protected
   * @param {CollisionLabViewProperties} viewProperties
   * @param {InelasticModel} model
   * @param {Object} [options]
   * @returns {CollisionLabControlPanel}
   */
  createControlPanel(viewProperties, model, options) {
    assert && assert(viewProperties instanceof CollisionLabViewProperties, `invalid viewProperties: ${viewProperties}`);
    assert && assert(model instanceof InelasticModel, `invalid model: ${model}`);
    return new InelasticControlPanel(viewProperties, model.ballSystem.centerOfMassVisibleProperty, model.ballSystem.pathsVisibleProperty, model.playArea.reflectingBorderProperty, model.playArea.elasticityPercentProperty, model.ballSystem.ballsConstantSizeProperty, model.playArea.inelasticCollisionTypeProperty, options);
  }

  /**
   * Creates the BallSystemNode for the 'Inelastic' screen. Called in the constructor of the super-class.
   *
   * @override
   * @protected
   * @param {InelasticModel} model
   * @param {CollisionLabViewProperties} viewProperties
   * @param {ModelViewTransform2} modelViewTransform
   * @returns {BallSystemNode}
   */
  createBallSystemNode(model, viewProperties, modelViewTransform) {
    assert && assert(model instanceof InelasticModel, `invalid model: ${model}`);
    assert && assert(viewProperties instanceof CollisionLabViewProperties, `invalid viewProperties: ${viewProperties}`);
    assert && assert(modelViewTransform instanceof ModelViewTransform2, `invalid modelViewTransform: ${modelViewTransform}`);
    return new BallSystemNode(model.ballSystem, model.playArea, viewProperties.valuesVisibleProperty, viewProperties.velocityVectorVisibleProperty, viewProperties.momentumVectorVisibleProperty, model.isPlayingProperty, modelViewTransform);
  }
}
collisionLab.register('InelasticScreenView', InelasticScreenView);
export default InelasticScreenView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtZXJnZSIsIk1vZGVsVmlld1RyYW5zZm9ybTIiLCJUYW5kZW0iLCJjb2xsaXNpb25MYWIiLCJCYWxsU3lzdGVtTm9kZSIsIkNvbGxpc2lvbkxhYlNjcmVlblZpZXciLCJDb2xsaXNpb25MYWJWaWV3UHJvcGVydGllcyIsIkluZWxhc3RpY01vZGVsIiwiSW5lbGFzdGljQ29udHJvbFBhbmVsIiwiUHJlc2V0UmFkaW9CdXR0b25Hcm91cCIsIkluZWxhc3RpY1NjcmVlblZpZXciLCJjb25zdHJ1Y3RvciIsIm1vZGVsIiwidGFuZGVtIiwib3B0aW9ucyIsImFzc2VydCIsInBsYXlBcmVhVG9wUmlnaHRDb250cm9sc09wdGlvbnMiLCJpbmNsdWRlTnVtYmVyT2ZCYWxsc1NwaW5uZXIiLCJpbmNsdWRlU3RlcEJhY2siLCJwcmVzZXRSYWRpb0J1dHRvbkdyb3VwIiwiYmFsbFN5c3RlbSIsImluZWxhc3RpY1ByZXNldFByb3BlcnR5IiwibGVmdFRvcCIsImJhbGxWYWx1ZXNQYW5lbCIsImxlZnRCb3R0b20iLCJhZGRYWSIsImFkZENoaWxkIiwibW92ZVRvQmFjayIsImNyZWF0ZUNvbnRyb2xQYW5lbCIsInZpZXdQcm9wZXJ0aWVzIiwiY2VudGVyT2ZNYXNzVmlzaWJsZVByb3BlcnR5IiwicGF0aHNWaXNpYmxlUHJvcGVydHkiLCJwbGF5QXJlYSIsInJlZmxlY3RpbmdCb3JkZXJQcm9wZXJ0eSIsImVsYXN0aWNpdHlQZXJjZW50UHJvcGVydHkiLCJiYWxsc0NvbnN0YW50U2l6ZVByb3BlcnR5IiwiaW5lbGFzdGljQ29sbGlzaW9uVHlwZVByb3BlcnR5IiwiY3JlYXRlQmFsbFN5c3RlbU5vZGUiLCJtb2RlbFZpZXdUcmFuc2Zvcm0iLCJ2YWx1ZXNWaXNpYmxlUHJvcGVydHkiLCJ2ZWxvY2l0eVZlY3RvclZpc2libGVQcm9wZXJ0eSIsIm1vbWVudHVtVmVjdG9yVmlzaWJsZVByb3BlcnR5IiwiaXNQbGF5aW5nUHJvcGVydHkiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkluZWxhc3RpY1NjcmVlblZpZXcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogVG9wIGxldmVsIHZpZXcgZm9yIHRoZSAnSW5lbGFzdGljJyBzY3JlZW4uXHJcbiAqXHJcbiAqIEBhdXRob3IgQnJhbmRvbkxpXHJcbiAqL1xyXG5cclxuaW1wb3J0IG1lcmdlIGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9tZXJnZS5qcyc7XHJcbmltcG9ydCBNb2RlbFZpZXdUcmFuc2Zvcm0yIGZyb20gJy4uLy4uLy4uLy4uL3BoZXRjb21tb24vanMvdmlldy9Nb2RlbFZpZXdUcmFuc2Zvcm0yLmpzJztcclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi8uLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuaW1wb3J0IGNvbGxpc2lvbkxhYiBmcm9tICcuLi8uLi9jb2xsaXNpb25MYWIuanMnO1xyXG5pbXBvcnQgQmFsbFN5c3RlbU5vZGUgZnJvbSAnLi4vLi4vY29tbW9uL3ZpZXcvQmFsbFN5c3RlbU5vZGUuanMnO1xyXG5pbXBvcnQgQ29sbGlzaW9uTGFiU2NyZWVuVmlldyBmcm9tICcuLi8uLi9jb21tb24vdmlldy9Db2xsaXNpb25MYWJTY3JlZW5WaWV3LmpzJztcclxuaW1wb3J0IENvbGxpc2lvbkxhYlZpZXdQcm9wZXJ0aWVzIGZyb20gJy4uLy4uL2NvbW1vbi92aWV3L0NvbGxpc2lvbkxhYlZpZXdQcm9wZXJ0aWVzLmpzJztcclxuaW1wb3J0IEluZWxhc3RpY01vZGVsIGZyb20gJy4uL21vZGVsL0luZWxhc3RpY01vZGVsLmpzJztcclxuaW1wb3J0IEluZWxhc3RpY0NvbnRyb2xQYW5lbCBmcm9tICcuL0luZWxhc3RpY0NvbnRyb2xQYW5lbC5qcyc7XHJcbmltcG9ydCBQcmVzZXRSYWRpb0J1dHRvbkdyb3VwIGZyb20gJy4vUHJlc2V0UmFkaW9CdXR0b25Hcm91cC5qcyc7XHJcblxyXG5jbGFzcyBJbmVsYXN0aWNTY3JlZW5WaWV3IGV4dGVuZHMgQ29sbGlzaW9uTGFiU2NyZWVuVmlldyB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7SW5lbGFzdGljTW9kZWx9IG1vZGVsXHJcbiAgICogQHBhcmFtIHtUYW5kZW19IHRhbmRlbVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggbW9kZWwsIHRhbmRlbSwgb3B0aW9ucyApIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIG1vZGVsIGluc3RhbmNlb2YgSW5lbGFzdGljTW9kZWwsIGBpbnZhbGlkIG1vZGVsOiAke21vZGVsfWAgKTtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIHRhbmRlbSBpbnN0YW5jZW9mIFRhbmRlbSwgYGludmFsaWQgdGFuZGVtOiAke3RhbmRlbX1gICk7XHJcblxyXG4gICAgb3B0aW9ucyA9IG1lcmdlKCB7XHJcblxyXG4gICAgICBwbGF5QXJlYVRvcFJpZ2h0Q29udHJvbHNPcHRpb25zOiB7XHJcbiAgICAgICAgaW5jbHVkZU51bWJlck9mQmFsbHNTcGlubmVyOiBmYWxzZVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgaW5jbHVkZVN0ZXBCYWNrOiBmYWxzZVxyXG4gICAgfSwgb3B0aW9ucyApO1xyXG5cclxuICAgIHN1cGVyKCBtb2RlbCwgdGFuZGVtLCBvcHRpb25zICk7XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gUHJlc2V0IHJhZGlvIGJ1dHRvbiBncm91cFxyXG4gICAgY29uc3QgcHJlc2V0UmFkaW9CdXR0b25Hcm91cCA9IG5ldyBQcmVzZXRSYWRpb0J1dHRvbkdyb3VwKCBtb2RlbC5iYWxsU3lzdGVtLmluZWxhc3RpY1ByZXNldFByb3BlcnR5LCB7XHJcbiAgICAgIGxlZnRUb3A6IHRoaXMuYmFsbFZhbHVlc1BhbmVsLmxlZnRCb3R0b20uYWRkWFkoIDAsIDEwIClcclxuICAgIH0gKTtcclxuXHJcbiAgICB0aGlzLmFkZENoaWxkKCBwcmVzZXRSYWRpb0J1dHRvbkdyb3VwICk7XHJcbiAgICBwcmVzZXRSYWRpb0J1dHRvbkdyb3VwLm1vdmVUb0JhY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgdGhlIENvbGxpc2lvbkxhYkNvbnRyb2xQYW5lbCBmb3IgdGhlICdJbmVsYXN0aWMnIHNjcmVlbi4gQ2FsbGVkIGluIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgc3VwZXItY2xhc3MuXHJcbiAgICpcclxuICAgKiBAb3ZlcnJpZGVcclxuICAgKiBAcHJvdGVjdGVkXHJcbiAgICogQHBhcmFtIHtDb2xsaXNpb25MYWJWaWV3UHJvcGVydGllc30gdmlld1Byb3BlcnRpZXNcclxuICAgKiBAcGFyYW0ge0luZWxhc3RpY01vZGVsfSBtb2RlbFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKiBAcmV0dXJucyB7Q29sbGlzaW9uTGFiQ29udHJvbFBhbmVsfVxyXG4gICAqL1xyXG4gIGNyZWF0ZUNvbnRyb2xQYW5lbCggdmlld1Byb3BlcnRpZXMsIG1vZGVsLCBvcHRpb25zICkge1xyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggdmlld1Byb3BlcnRpZXMgaW5zdGFuY2VvZiBDb2xsaXNpb25MYWJWaWV3UHJvcGVydGllcywgYGludmFsaWQgdmlld1Byb3BlcnRpZXM6ICR7dmlld1Byb3BlcnRpZXN9YCApO1xyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggbW9kZWwgaW5zdGFuY2VvZiBJbmVsYXN0aWNNb2RlbCwgYGludmFsaWQgbW9kZWw6ICR7bW9kZWx9YCApO1xyXG5cclxuICAgIHJldHVybiBuZXcgSW5lbGFzdGljQ29udHJvbFBhbmVsKFxyXG4gICAgICB2aWV3UHJvcGVydGllcyxcclxuICAgICAgbW9kZWwuYmFsbFN5c3RlbS5jZW50ZXJPZk1hc3NWaXNpYmxlUHJvcGVydHksXHJcbiAgICAgIG1vZGVsLmJhbGxTeXN0ZW0ucGF0aHNWaXNpYmxlUHJvcGVydHksXHJcbiAgICAgIG1vZGVsLnBsYXlBcmVhLnJlZmxlY3RpbmdCb3JkZXJQcm9wZXJ0eSxcclxuICAgICAgbW9kZWwucGxheUFyZWEuZWxhc3RpY2l0eVBlcmNlbnRQcm9wZXJ0eSxcclxuICAgICAgbW9kZWwuYmFsbFN5c3RlbS5iYWxsc0NvbnN0YW50U2l6ZVByb3BlcnR5LFxyXG4gICAgICBtb2RlbC5wbGF5QXJlYS5pbmVsYXN0aWNDb2xsaXNpb25UeXBlUHJvcGVydHksXHJcbiAgICAgIG9wdGlvbnNcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIHRoZSBCYWxsU3lzdGVtTm9kZSBmb3IgdGhlICdJbmVsYXN0aWMnIHNjcmVlbi4gQ2FsbGVkIGluIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgc3VwZXItY2xhc3MuXHJcbiAgICpcclxuICAgKiBAb3ZlcnJpZGVcclxuICAgKiBAcHJvdGVjdGVkXHJcbiAgICogQHBhcmFtIHtJbmVsYXN0aWNNb2RlbH0gbW9kZWxcclxuICAgKiBAcGFyYW0ge0NvbGxpc2lvbkxhYlZpZXdQcm9wZXJ0aWVzfSB2aWV3UHJvcGVydGllc1xyXG4gICAqIEBwYXJhbSB7TW9kZWxWaWV3VHJhbnNmb3JtMn0gbW9kZWxWaWV3VHJhbnNmb3JtXHJcbiAgICogQHJldHVybnMge0JhbGxTeXN0ZW1Ob2RlfVxyXG4gICAqL1xyXG4gIGNyZWF0ZUJhbGxTeXN0ZW1Ob2RlKCBtb2RlbCwgdmlld1Byb3BlcnRpZXMsIG1vZGVsVmlld1RyYW5zZm9ybSApIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIG1vZGVsIGluc3RhbmNlb2YgSW5lbGFzdGljTW9kZWwsIGBpbnZhbGlkIG1vZGVsOiAke21vZGVsfWAgKTtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIHZpZXdQcm9wZXJ0aWVzIGluc3RhbmNlb2YgQ29sbGlzaW9uTGFiVmlld1Byb3BlcnRpZXMsIGBpbnZhbGlkIHZpZXdQcm9wZXJ0aWVzOiAke3ZpZXdQcm9wZXJ0aWVzfWAgKTtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIG1vZGVsVmlld1RyYW5zZm9ybSBpbnN0YW5jZW9mIE1vZGVsVmlld1RyYW5zZm9ybTIsIGBpbnZhbGlkIG1vZGVsVmlld1RyYW5zZm9ybTogJHttb2RlbFZpZXdUcmFuc2Zvcm19YCApO1xyXG5cclxuICAgIHJldHVybiBuZXcgQmFsbFN5c3RlbU5vZGUoXHJcbiAgICAgIG1vZGVsLmJhbGxTeXN0ZW0sXHJcbiAgICAgIG1vZGVsLnBsYXlBcmVhLFxyXG4gICAgICB2aWV3UHJvcGVydGllcy52YWx1ZXNWaXNpYmxlUHJvcGVydHksXHJcbiAgICAgIHZpZXdQcm9wZXJ0aWVzLnZlbG9jaXR5VmVjdG9yVmlzaWJsZVByb3BlcnR5LFxyXG4gICAgICB2aWV3UHJvcGVydGllcy5tb21lbnR1bVZlY3RvclZpc2libGVQcm9wZXJ0eSxcclxuICAgICAgbW9kZWwuaXNQbGF5aW5nUHJvcGVydHksXHJcbiAgICAgIG1vZGVsVmlld1RyYW5zZm9ybVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmNvbGxpc2lvbkxhYi5yZWdpc3RlciggJ0luZWxhc3RpY1NjcmVlblZpZXcnLCBJbmVsYXN0aWNTY3JlZW5WaWV3ICk7XHJcbmV4cG9ydCBkZWZhdWx0IEluZWxhc3RpY1NjcmVlblZpZXc7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLEtBQUssTUFBTSxtQ0FBbUM7QUFDckQsT0FBT0MsbUJBQW1CLE1BQU0sdURBQXVEO0FBQ3ZGLE9BQU9DLE1BQU0sTUFBTSxpQ0FBaUM7QUFDcEQsT0FBT0MsWUFBWSxNQUFNLHVCQUF1QjtBQUNoRCxPQUFPQyxjQUFjLE1BQU0scUNBQXFDO0FBQ2hFLE9BQU9DLHNCQUFzQixNQUFNLDZDQUE2QztBQUNoRixPQUFPQywwQkFBMEIsTUFBTSxp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