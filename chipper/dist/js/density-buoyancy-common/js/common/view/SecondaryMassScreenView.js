// Copyright 2020-2022, University of Colorado Boulder

/**
 * A subtype of ScreenView that has a primary/secondary mass (with visibility controls for the second mass)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Vector3 from '../../../../dot/js/Vector3.js';
import densityBuoyancyCommon from '../../densityBuoyancyCommon.js';
import BlocksRadioButtonGroup from './BlocksRadioButtonGroup.js';
import DensityBuoyancyScreenView from './DensityBuoyancyScreenView.js';
export default class SecondaryMassScreenView extends DensityBuoyancyScreenView {
  /**
   * Adding the second-mass control.
   */
  addSecondMassControl(modeProperty) {
    assert && assert(this.rightBox, 'SecondaryMassScreenView requires a this.rightBox be defined to add this control');
    this.blocksRadioButtonGroup = new BlocksRadioButtonGroup(modeProperty, {
      tandem: this.tandem.createTandem('blocksRadioButtonGroup')
    });
    this.addChild(this.blocksRadioButtonGroup);

    // This instance lives for the lifetime of the simulation, so we don't need to remove this listener
    this.rightBox.transformEmitter.addListener(() => this.positionSecondMassControl());
    this.transformEmitter.addListener(() => this.positionSecondMassControl());
  }

  /**
   * Positions the second-mass control.
   */
  positionSecondMassControl() {
    this.blocksRadioButtonGroup.bottom = this.modelToViewPoint(new Vector3(0, this.model.poolBounds.minY, this.model.poolBounds.maxZ)).y;
    this.blocksRadioButtonGroup.left = this.rightBox.left;
  }
  layout(viewBounds) {
    super.layout(viewBounds);

    // If the simulation was not able to load for WebGL, bail out
    if (!this.sceneNode) {
      return;
    }
    this.positionSecondMassControl();
  }
}
densityBuoyancyCommon.register('SecondaryMassScreenView', SecondaryMassScreenView);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWZWN0b3IzIiwiZGVuc2l0eUJ1b3lhbmN5Q29tbW9uIiwiQmxvY2tzUmFkaW9CdXR0b25Hcm91cCIsIkRlbnNpdHlCdW95YW5jeVNjcmVlblZpZXciLCJTZWNvbmRhcnlNYXNzU2NyZWVuVmlldyIsImFkZFNlY29uZE1hc3NDb250cm9sIiwibW9kZVByb3BlcnR5IiwiYXNzZXJ0IiwicmlnaHRCb3giLCJibG9ja3NSYWRpb0J1dHRvbkdyb3VwIiwidGFuZGVtIiwiY3JlYXRlVGFuZGVtIiwiYWRkQ2hpbGQiLCJ0cmFuc2Zvcm1FbWl0dGVyIiwiYWRkTGlzdGVuZXIiLCJwb3NpdGlvblNlY29uZE1hc3NDb250cm9sIiwiYm90dG9tIiwibW9kZWxUb1ZpZXdQb2ludCIsIm1vZGVsIiwicG9vbEJvdW5kcyIsIm1pblkiLCJtYXhaIiwieSIsImxlZnQiLCJsYXlvdXQiLCJ2aWV3Qm91bmRzIiwic2NlbmVOb2RlIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJTZWNvbmRhcnlNYXNzU2NyZWVuVmlldy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBBIHN1YnR5cGUgb2YgU2NyZWVuVmlldyB0aGF0IGhhcyBhIHByaW1hcnkvc2Vjb25kYXJ5IG1hc3MgKHdpdGggdmlzaWJpbGl0eSBjb250cm9scyBmb3IgdGhlIHNlY29uZCBtYXNzKVxyXG4gKlxyXG4gKiBAYXV0aG9yIEpvbmF0aGFuIE9sc29uIDxqb25hdGhhbi5vbHNvbkBjb2xvcmFkby5lZHU+XHJcbiAqL1xyXG5cclxuaW1wb3J0IFZlY3RvcjMgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1ZlY3RvcjMuanMnO1xyXG5pbXBvcnQgZGVuc2l0eUJ1b3lhbmN5Q29tbW9uIGZyb20gJy4uLy4uL2RlbnNpdHlCdW95YW5jeUNvbW1vbi5qcyc7XHJcbmltcG9ydCBCbG9ja3NSYWRpb0J1dHRvbkdyb3VwIGZyb20gJy4vQmxvY2tzUmFkaW9CdXR0b25Hcm91cC5qcyc7XHJcbmltcG9ydCBEZW5zaXR5QnVveWFuY3lTY3JlZW5WaWV3IGZyb20gJy4vRGVuc2l0eUJ1b3lhbmN5U2NyZWVuVmlldy5qcyc7XHJcbmltcG9ydCBUd29CbG9ja01vZGUgZnJvbSAnLi4vbW9kZWwvVHdvQmxvY2tNb2RlLmpzJztcclxuaW1wb3J0IFByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgQm91bmRzMiBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvQm91bmRzMi5qcyc7XHJcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgRGVuc2l0eUJ1b3lhbmN5TW9kZWwgZnJvbSAnLi4vbW9kZWwvRGVuc2l0eUJ1b3lhbmN5TW9kZWwuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgU2Vjb25kYXJ5TWFzc1NjcmVlblZpZXc8TW9kZWwgZXh0ZW5kcyBEZW5zaXR5QnVveWFuY3lNb2RlbD4gZXh0ZW5kcyBEZW5zaXR5QnVveWFuY3lTY3JlZW5WaWV3PE1vZGVsPiB7XHJcblxyXG4gIHByb3RlY3RlZCBhYnN0cmFjdCByaWdodEJveDogTm9kZTtcclxuICBwcml2YXRlIGJsb2Nrc1JhZGlvQnV0dG9uR3JvdXA/OiBOb2RlO1xyXG5cclxuICAvKipcclxuICAgKiBBZGRpbmcgdGhlIHNlY29uZC1tYXNzIGNvbnRyb2wuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGFkZFNlY29uZE1hc3NDb250cm9sKCBtb2RlUHJvcGVydHk6IFByb3BlcnR5PFR3b0Jsb2NrTW9kZT4gKTogdm9pZCB7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCB0aGlzLnJpZ2h0Qm94LCAnU2Vjb25kYXJ5TWFzc1NjcmVlblZpZXcgcmVxdWlyZXMgYSB0aGlzLnJpZ2h0Qm94IGJlIGRlZmluZWQgdG8gYWRkIHRoaXMgY29udHJvbCcgKTtcclxuXHJcbiAgICB0aGlzLmJsb2Nrc1JhZGlvQnV0dG9uR3JvdXAgPSBuZXcgQmxvY2tzUmFkaW9CdXR0b25Hcm91cCggbW9kZVByb3BlcnR5LCB7XHJcbiAgICAgIHRhbmRlbTogdGhpcy50YW5kZW0uY3JlYXRlVGFuZGVtKCAnYmxvY2tzUmFkaW9CdXR0b25Hcm91cCcgKVxyXG4gICAgfSApO1xyXG5cclxuICAgIHRoaXMuYWRkQ2hpbGQoIHRoaXMuYmxvY2tzUmFkaW9CdXR0b25Hcm91cCApO1xyXG5cclxuICAgIC8vIFRoaXMgaW5zdGFuY2UgbGl2ZXMgZm9yIHRoZSBsaWZldGltZSBvZiB0aGUgc2ltdWxhdGlvbiwgc28gd2UgZG9uJ3QgbmVlZCB0byByZW1vdmUgdGhpcyBsaXN0ZW5lclxyXG4gICAgdGhpcy5yaWdodEJveC50cmFuc2Zvcm1FbWl0dGVyLmFkZExpc3RlbmVyKCAoKSA9PiB0aGlzLnBvc2l0aW9uU2Vjb25kTWFzc0NvbnRyb2woKSApO1xyXG4gICAgdGhpcy50cmFuc2Zvcm1FbWl0dGVyLmFkZExpc3RlbmVyKCAoKSA9PiB0aGlzLnBvc2l0aW9uU2Vjb25kTWFzc0NvbnRyb2woKSApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUG9zaXRpb25zIHRoZSBzZWNvbmQtbWFzcyBjb250cm9sLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgcG9zaXRpb25TZWNvbmRNYXNzQ29udHJvbCgpOiB2b2lkIHtcclxuICAgIHRoaXMuYmxvY2tzUmFkaW9CdXR0b25Hcm91cCEuYm90dG9tID0gdGhpcy5tb2RlbFRvVmlld1BvaW50KCBuZXcgVmVjdG9yMyhcclxuICAgICAgMCxcclxuICAgICAgdGhpcy5tb2RlbC5wb29sQm91bmRzLm1pblksXHJcbiAgICAgIHRoaXMubW9kZWwucG9vbEJvdW5kcy5tYXhaXHJcbiAgICApICkueTtcclxuICAgIHRoaXMuYmxvY2tzUmFkaW9CdXR0b25Hcm91cCEubGVmdCA9IHRoaXMucmlnaHRCb3gubGVmdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvdmVycmlkZSBsYXlvdXQoIHZpZXdCb3VuZHM6IEJvdW5kczIgKTogdm9pZCB7XHJcbiAgICBzdXBlci5sYXlvdXQoIHZpZXdCb3VuZHMgKTtcclxuXHJcbiAgICAvLyBJZiB0aGUgc2ltdWxhdGlvbiB3YXMgbm90IGFibGUgdG8gbG9hZCBmb3IgV2ViR0wsIGJhaWwgb3V0XHJcbiAgICBpZiAoICF0aGlzLnNjZW5lTm9kZSApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucG9zaXRpb25TZWNvbmRNYXNzQ29udHJvbCgpO1xyXG4gIH1cclxufVxyXG5cclxuZGVuc2l0eUJ1b3lhbmN5Q29tbW9uLnJlZ2lzdGVyKCAnU2Vjb25kYXJ5TWFzc1NjcmVlblZpZXcnLCBTZWNvbmRhcnlNYXNzU2NyZWVuVmlldyApO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsT0FBTyxNQUFNLCtCQUErQjtBQUNuRCxPQUFPQyxxQkFBcUIsTUFBTSxnQ0FBZ0M7QUFDbEUsT0FBT0Msc0JBQXNCLE1BQU0sNkJBQTZCO0FBQ2hFLE9BQU9DLHlCQUF5QixNQUFNLGdDQUFnQztBQU90RSxlQUFlLE1BQWVDLHVCQUF1QixTQUE2Q0QseUJBQXlCLENBQVE7RUFLakk7QUFDRjtBQUNBO0VBQ1lFLG9CQUFvQkEsQ0FBRUMsWUFBb0MsRUFBUztJQUMzRUMsTUFBTSxJQUFJQSxNQUFNLENBQUUsSUFBSSxDQUFDQyxRQUFRLEVBQUUsaUZBQWtGLENBQUM7SUFFcEgsSUFBSSxDQUFDQyxzQkFBc0IsR0FBRyxJQUFJUCxzQkFBc0IsQ0FBRUksWUFBWSxFQUFFO01BQ3RFSSxNQUFNLEVBQUUsSUFBSSxDQUFDQSxNQUFNLENBQUNDLFlBQVksQ0FBRSx3QkFBeUI7SUFDN0QsQ0FBRSxDQUFDO0lBRUgsSUFBSSxDQUFDQyxRQUFRLENBQUUsSUFBSSxDQUFDSCxzQkFBdUIsQ0FBQzs7SUFFNUM7SUFDQSxJQUFJLENBQUNELFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUNDLFdBQVcsQ0FBRSxNQUFNLElBQUksQ0FBQ0MseUJBQXlCLENBQUMsQ0FBRSxDQUFDO0lBQ3BGLElBQUksQ0FBQ0YsZ0JBQWdCLENBQUNDLFdBQVcsQ0FBRSxNQUFNLElBQUksQ0FBQ0MseUJBQXlCLENBQUMsQ0FBRSxDQUFDO0VBQzdFOztFQUVBO0FBQ0Y7QUFDQTtFQUNVQSx5QkFBeUJBLENBQUEsRUFBUztJQUN4QyxJQUFJLENBQUNOLHNCQUFzQixDQUFFTyxNQUFNLEdBQUcsSUFBSSxDQUFDQyxnQkFBZ0IsQ0FBRSxJQUFJakIsT0FBTyxDQUN0RSxDQUFDLEVBQ0QsSUFBSSxDQUFDa0IsS0FBSyxDQUFDQyxVQUFVLENBQUNDLElBQUksRUFDMUIsSUFBSSxDQUFDRixLQUFLLENBQUNDLFVBQVUsQ0FBQ0UsSUFDeEIsQ0FBRSxDQUFDLENBQUNDLENBQUM7SUFDTCxJQUFJLENBQUNiLHNCQUFzQixDQUFFYyxJQUFJLEdBQUcsSUFBSSxDQUFDZixRQUFRLENBQUNlLElBQUk7RUFDeEQ7RUFFZ0JDLE1BQU1BLENBQUVDLFVBQW1CLEVBQVM7SUFDbEQsS0FBSyxDQUFDRCxNQUFNLENBQUVDLFVBQVcsQ0FBQzs7SUFFMUI7SUFDQSxJQUFLLENBQUMsSUFBSSxDQUFDQyxTQUFTLEVBQUc7TUFDckI7SUFDRjtJQUVBLElBQUksQ0FBQ1gseUJBQXlCLENBQUMsQ0FBQztFQUNsQztBQUNGO0FBRUFkLHFCQUFxQixDQUFDMEIsUUFBUSxDQUFFLHlCQUF5QixFQUFFdkIsdUJBQXdCLENBQUMifQ==