// Copyright 2020-2022, University of Colorado Boulder

/**
 * Main model for the 'Explore' screen. This model holds all the scene models.
 *
 * @author Saurabh Totey
 */

import Property from '../../../../axon/js/Property.js';
import numberLineDistance from '../../numberLineDistance.js';
import DistanceSceneModel from './DistanceSceneModel.js';
import ElevationSceneModel from './ElevationSceneModel.js';
import TemperatureSceneModel from './TemperatureSceneModel.js';
class NLDExploreModel {
  /**
   * @param {Tandem} tandem
   */
  constructor(tandem) {
    // @public the instance for the model of the 'Distance' scene
    this.distanceSceneModel = new DistanceSceneModel(tandem);

    // @public the instance for the model of the 'Temperature' scene
    this.temperatureSceneModel = new TemperatureSceneModel(tandem);

    // @public the instance for the model of the 'Elevation' scene
    this.elevationSceneModel = new ElevationSceneModel(tandem);

    // @public {Property.<AbstractNLDBaseModel>} the currently selected scene model for the explore screen
    this.selectedSceneModelProperty = new Property(this.distanceSceneModel, {
      validValues: [this.distanceSceneModel, this.temperatureSceneModel, this.elevationSceneModel]
    });
  }

  /**
   * Resets the model.
   * @public
   */
  reset() {
    this.selectedSceneModelProperty.reset();
    this.distanceSceneModel.reset();
    this.temperatureSceneModel.reset();
    this.elevationSceneModel.reset();
  }
}
numberLineDistance.register('NLDExploreModel', NLDExploreModel);
export default NLDExploreModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQcm9wZXJ0eSIsIm51bWJlckxpbmVEaXN0YW5jZSIsIkRpc3RhbmNlU2NlbmVNb2RlbCIsIkVsZXZhdGlvblNjZW5lTW9kZWwiLCJUZW1wZXJhdHVyZVNjZW5lTW9kZWwiLCJOTERFeHBsb3JlTW9kZWwiLCJjb25zdHJ1Y3RvciIsInRhbmRlbSIsImRpc3RhbmNlU2NlbmVNb2RlbCIsInRlbXBlcmF0dXJlU2NlbmVNb2RlbCIsImVsZXZhdGlvblNjZW5lTW9kZWwiLCJzZWxlY3RlZFNjZW5lTW9kZWxQcm9wZXJ0eSIsInZhbGlkVmFsdWVzIiwicmVzZXQiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIk5MREV4cGxvcmVNb2RlbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBNYWluIG1vZGVsIGZvciB0aGUgJ0V4cGxvcmUnIHNjcmVlbi4gVGhpcyBtb2RlbCBob2xkcyBhbGwgdGhlIHNjZW5lIG1vZGVscy5cclxuICpcclxuICogQGF1dGhvciBTYXVyYWJoIFRvdGV5XHJcbiAqL1xyXG5cclxuaW1wb3J0IFByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgbnVtYmVyTGluZURpc3RhbmNlIGZyb20gJy4uLy4uL251bWJlckxpbmVEaXN0YW5jZS5qcyc7XHJcbmltcG9ydCBEaXN0YW5jZVNjZW5lTW9kZWwgZnJvbSAnLi9EaXN0YW5jZVNjZW5lTW9kZWwuanMnO1xyXG5pbXBvcnQgRWxldmF0aW9uU2NlbmVNb2RlbCBmcm9tICcuL0VsZXZhdGlvblNjZW5lTW9kZWwuanMnO1xyXG5pbXBvcnQgVGVtcGVyYXR1cmVTY2VuZU1vZGVsIGZyb20gJy4vVGVtcGVyYXR1cmVTY2VuZU1vZGVsLmpzJztcclxuXHJcbmNsYXNzIE5MREV4cGxvcmVNb2RlbCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7VGFuZGVtfSB0YW5kZW1cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggdGFuZGVtICkge1xyXG5cclxuICAgIC8vIEBwdWJsaWMgdGhlIGluc3RhbmNlIGZvciB0aGUgbW9kZWwgb2YgdGhlICdEaXN0YW5jZScgc2NlbmVcclxuICAgIHRoaXMuZGlzdGFuY2VTY2VuZU1vZGVsID0gbmV3IERpc3RhbmNlU2NlbmVNb2RlbCggdGFuZGVtICk7XHJcblxyXG4gICAgLy8gQHB1YmxpYyB0aGUgaW5zdGFuY2UgZm9yIHRoZSBtb2RlbCBvZiB0aGUgJ1RlbXBlcmF0dXJlJyBzY2VuZVxyXG4gICAgdGhpcy50ZW1wZXJhdHVyZVNjZW5lTW9kZWwgPSBuZXcgVGVtcGVyYXR1cmVTY2VuZU1vZGVsKCB0YW5kZW0gKTtcclxuXHJcbiAgICAvLyBAcHVibGljIHRoZSBpbnN0YW5jZSBmb3IgdGhlIG1vZGVsIG9mIHRoZSAnRWxldmF0aW9uJyBzY2VuZVxyXG4gICAgdGhpcy5lbGV2YXRpb25TY2VuZU1vZGVsID0gbmV3IEVsZXZhdGlvblNjZW5lTW9kZWwoIHRhbmRlbSApO1xyXG5cclxuICAgIC8vIEBwdWJsaWMge1Byb3BlcnR5LjxBYnN0cmFjdE5MREJhc2VNb2RlbD59IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgc2NlbmUgbW9kZWwgZm9yIHRoZSBleHBsb3JlIHNjcmVlblxyXG4gICAgdGhpcy5zZWxlY3RlZFNjZW5lTW9kZWxQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eSggdGhpcy5kaXN0YW5jZVNjZW5lTW9kZWwsIHtcclxuICAgICAgdmFsaWRWYWx1ZXM6IFsgdGhpcy5kaXN0YW5jZVNjZW5lTW9kZWwsIHRoaXMudGVtcGVyYXR1cmVTY2VuZU1vZGVsLCB0aGlzLmVsZXZhdGlvblNjZW5lTW9kZWwgXVxyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzZXRzIHRoZSBtb2RlbC5cclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgcmVzZXQoKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkU2NlbmVNb2RlbFByb3BlcnR5LnJlc2V0KCk7XHJcbiAgICB0aGlzLmRpc3RhbmNlU2NlbmVNb2RlbC5yZXNldCgpO1xyXG4gICAgdGhpcy50ZW1wZXJhdHVyZVNjZW5lTW9kZWwucmVzZXQoKTtcclxuICAgIHRoaXMuZWxldmF0aW9uU2NlbmVNb2RlbC5yZXNldCgpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbm51bWJlckxpbmVEaXN0YW5jZS5yZWdpc3RlciggJ05MREV4cGxvcmVNb2RlbCcsIE5MREV4cGxvcmVNb2RlbCApO1xyXG5leHBvcnQgZGVmYXVsdCBOTERFeHBsb3JlTW9kZWw7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxRQUFRLE1BQU0saUNBQWlDO0FBQ3RELE9BQU9DLGtCQUFrQixNQUFNLDZCQUE2QjtBQUM1RCxPQUFPQyxrQkFBa0IsTUFBTSx5QkFBeUI7QUFDeEQsT0FBT0MsbUJBQW1CLE1BQU0sMEJBQTBCO0FBQzFELE9BQU9DLHFCQUFxQixNQUFNLDRCQUE0QjtBQUU5RCxNQUFNQyxlQUFlLENBQUM7RUFFcEI7QUFDRjtBQUNBO0VBQ0VDLFdBQVdBLENBQUVDLE1BQU0sRUFBRztJQUVwQjtJQUNBLElBQUksQ0FBQ0Msa0JBQWtCLEdBQUcsSUFBSU4sa0JBQWtCLENBQUVLLE1BQU8sQ0FBQzs7SUFFMUQ7SUFDQSxJQUFJLENBQUNFLHFCQUFxQixHQUFHLElBQUlMLHFCQUFxQixDQUFFRyxNQUFPLENBQUM7O0lBRWhFO0lBQ0EsSUFBSSxDQUFDRyxtQkFBbUIsR0FBRyxJQUFJUCxtQkFBbUIsQ0FBRUksTUFBTyxDQUFDOztJQUU1RDtJQUNBLElBQUksQ0FBQ0ksMEJBQTBCLEdBQUcsSUFBSVgsUUFBUSxDQUFFLElBQUksQ0FBQ1Esa0JBQWtCLEVBQUU7TUFDdkVJLFdBQVcsRUFBRSxDQUFFLElBQUksQ0FBQ0osa0JBQWtCLEVBQUUsSUFBSSxDQUFDQyxxQkFBcUIsRUFBRSxJQUFJLENBQUNDLG1CQUFtQjtJQUM5RixDQUFFLENBQUM7RUFDTDs7RUFFQTtBQUNGO0FBQ0E7QUFDQTtFQUNFRyxLQUFLQSxDQUFBLEVBQUc7SUFDTixJQUFJLENBQUNGLDBCQUEwQixDQUFDRSxLQUFLLENBQUMsQ0FBQztJQUN2QyxJQUFJLENBQUNMLGtCQUFrQixDQUFDSyxLQUFLLENBQUMsQ0FBQztJQUMvQixJQUFJLENBQUNKLHFCQUFxQixDQUFDSSxLQUFLLENBQUMsQ0FBQztJQUNsQyxJQUFJLENBQUNILG1CQUFtQixDQUFDRyxLQUFLLENBQUMsQ0FBQztFQUNsQztBQUVGO0FBRUFaLGtCQUFrQixDQUFDYSxRQUFRLENBQUUsaUJBQWlCLEVBQUVULGVBQWdCLENBQUM7QUFDakUsZUFBZUEsZUFBZSJ9