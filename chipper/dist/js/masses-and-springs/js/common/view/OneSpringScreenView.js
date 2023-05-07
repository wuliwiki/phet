// Copyright 2016-2022, University of Colorado Boulder

/**
 * Common ScreenView for using one mass.
 *
 * @author Matt Pennington (PhET Interactive Simulations)
 * @author Denzell Barnett (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { HBox, Text } from '../../../../scenery/js/imports.js';
import massesAndSprings from '../../massesAndSprings.js';
import MassesAndSpringsStrings from '../../MassesAndSpringsStrings.js';
import DisplacementArrowNode from '../../vectors/view/DisplacementArrowNode.js';
import MassesAndSpringsConstants from '../MassesAndSpringsConstants.js';
import Mass from '../model/Mass.js';
import EnergyGraphAccordionBox from './EnergyGraphAccordionBox.js';
import MassesAndSpringsColors from './MassesAndSpringsColors.js';
import MassNode from './MassNode.js';
import MassValueControlPanel from './MassValueControlPanel.js';
import MovableLineNode from './MovableLineNode.js';
import ReferenceLineNode from './ReferenceLineNode.js';
import SpringHangerNode from './SpringHangerNode.js';
import SpringScreenView from './SpringScreenView.js';
const heightEqualsZeroString = MassesAndSpringsStrings.heightEqualsZero;
const largeString = MassesAndSpringsStrings.large;
const smallString = MassesAndSpringsStrings.small;
class OneSpringScreenView extends SpringScreenView {
  /**
   * @param {MassesAndSpringsModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor(model, tandem, options) {
    super(model, tandem, options);
    // @public {number} centerX of the spring in view coordinates
    this.springCenter = this.modelViewTransform.modelToViewX(model.firstSpring.positionProperty.value.x);

    // Spring Constant Control Panel
    const minMaxLabels = [new Text(smallString, {
      font: MassesAndSpringsConstants.LABEL_FONT,
      maxWidth: 60
    }), new Text(largeString, {
      font: MassesAndSpringsConstants.LABEL_FONT,
      maxWidth: 60
    })];

    // @public {Property.<boolean>} Equilibrium of mass is dependent on the mass being attached and the visibility of the equilibrium line.
    this.equilibriumVisibilityProperty = new DerivedProperty([model.equilibriumPositionVisibleProperty, model.firstSpring.massAttachedProperty], (equilibriumPositionVisible, massAttached) => {
      if (massAttached) {
        return equilibriumPositionVisible;
      } else {
        return false;
      }
    });

    // @public {MassNode} Icon used in massValueControlPanel in both Basics and non-Basics version
    this.massNodeIcon = new MassNode(new Mass(0.0055, 0, MassesAndSpringsColors.adjustableMassProperty, model.gravityProperty, tandem, {
      icon: true
    }), this.modelViewTransform, this.visibleBoundsProperty, model, tandem.createTandem('massIcon'));
    const massValueControlPanel = new MassValueControlPanel(model.masses[0], this.massNodeIcon, tandem.createTandem('massValueControlPanel'), {
      maxWidth: MassesAndSpringsConstants.PANEL_MAX_WIDTH - 8,
      yMargin: 5
    });
    this.springHangerNode = new SpringHangerNode(model.springs, this.modelViewTransform, tandem.createTandem('springHangerNode'), {
      singleSpring: true
    });
    this.springStopperButtonNode = this.createStopperButton(this.model.firstSpring, tandem);

    // @public {SpringControlPanel} Accessed in Basics version
    this.springConstantControlPanel = this.createSpringConstantPanel(0, minMaxLabels, tandem);

    // @public {ReferenceLineNode} Initializes equilibrium line for an attached mass
    this.massEquilibriumLineNode = new ReferenceLineNode(this.modelViewTransform, model.firstSpring, model.firstSpring.massEquilibriumYPositionProperty, this.equilibriumVisibilityProperty, {
      stroke: 'black'
    });

    // Initializes natural line for the spring
    const naturalLengthLineNode = new ReferenceLineNode(this.modelViewTransform, model.firstSpring, model.firstSpring.bottomProperty, model.naturalLengthVisibleProperty, {
      stroke: MassesAndSpringsColors.unstretchedLengthProperty,
      // Naming convention pulled from basics version.
      fixedPosition: true
    });
    this.model.firstSpring.buttonEnabledProperty.link(buttonEnabled => {
      this.springStopperButtonNode.enabled = buttonEnabled;
    });
    if (!model.basicsVersion) {
      // @public {EnergyGraphAccordionBox} energy graph that displays energy values for the spring system.
      this.energyGraphAccordionBox = new EnergyGraphAccordionBox(model, tandem);
      this.addChild(this.energyGraphAccordionBox);
    }

    // Property that determines the zero height in the view.
    const zeroHeightProperty = new Property(this.modelViewTransform.modelToViewY(MassesAndSpringsConstants.FLOOR_Y));

    // Initializes movable line
    const xBoundsLimit = this.springCenter + this.spacing * 1.1;
    this.movableLineNode = new MovableLineNode(this.springHangerNode.center.plus(new Vector2(45, 200)), 100, model.movableLineVisibleProperty, new Bounds2(xBoundsLimit, 85, xBoundsLimit, zeroHeightProperty.value), tandem.createTandem('movableLineNode'));
    let displacementArrowNode;

    // Masses and Springs:Basics should not include a zero height reference line
    if (!model.basicsVersion) {
      // Displacement arrows added for each springs
      displacementArrowNode = new DisplacementArrowNode(this.springNodes[0].nodeProperty.value.spring.displacementProperty, model.naturalLengthVisibleProperty, tandem, {
        modelViewTransform: this.modelViewTransform,
        left: this.springNodes[0].nodeProperty.value.right + 12,
        centerY: this.modelViewTransform.modelToViewY(this.springNodes[0].nodeProperty.value.spring.bottomProperty.value)
      });

      // Zero height reference line
      const zeroHeightLine = new ReferenceLineNode(this.modelViewTransform, model.firstSpring, zeroHeightProperty, new Property(true), {
        stroke: '#5798de',
        zeroPointLine: true,
        label: new Text(heightEqualsZeroString, {
          font: MassesAndSpringsConstants.TITLE_FONT,
          fill: '#5798de',
          maxWidth: 125
        })
      });
      zeroHeightLine.x = this.massEquilibriumLineNode.x;
      zeroHeightLine.y = zeroHeightProperty.get();
      this.addChild(zeroHeightLine);
      this.resetAllButton.addListener(() => {
        this.movableLineNode.reset();
        this.energyGraphAccordionBox && this.energyGraphAccordionBox.reset();
      });
    }

    // @public {HBox} Contains Panels/Nodes that hover near the spring system at the center of the screen.
    this.springSystemControlsNode = new HBox({
      children: [massValueControlPanel, this.springHangerNode, this.springStopperButtonNode],
      spacing: this.spacing * 1.4,
      align: 'top',
      excludeInvisibleChildrenFromBounds: false
    });

    // Adding system controls and energy graph to scene graph
    this.addChild(this.springSystemControlsNode);
    this.addChild(this.springConstantControlPanel);

    // Reference lines from indicator visibility box
    if (!model.basicsVersion) {
      this.addChild(this.massEquilibriumLineNode);
    }
    this.addChild(naturalLengthLineNode);

    // This is handled here to maintain line node layering order
    if (!model.basicsVersion) {
      this.addChild(displacementArrowNode);
    }
    this.addChild(this.movableLineNode);

    // Adding layers for draggable objects
    this.addChild(this.massLayer);
    this.addChild(this.toolsLayer);

    // Adjust the floating panels to the visibleBounds of the screen.
    this.visibleBoundsProperty.link(visibleBounds => {
      this.adjustViewComponents(true, visibleBounds);
    });
  }

  /**
   * Responsible for updating the energy bar graph
   *
   * @public
   */
  step() {
    this.energyGraphAccordionBox.update();
  }
}
massesAndSprings.register('OneSpringScreenView', OneSpringScreenView);
export default OneSpringScreenView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEZXJpdmVkUHJvcGVydHkiLCJQcm9wZXJ0eSIsIkJvdW5kczIiLCJWZWN0b3IyIiwiSEJveCIsIlRleHQiLCJtYXNzZXNBbmRTcHJpbmdzIiwiTWFzc2VzQW5kU3ByaW5nc1N0cmluZ3MiLCJEaXNwbGFjZW1lbnRBcnJvd05vZGUiLCJNYXNzZXNBbmRTcHJpbmdzQ29uc3RhbnRzIiwiTWFzcyIsIkVuZXJneUdyYXBoQWNjb3JkaW9uQm94IiwiTWFzc2VzQW5kU3ByaW5nc0NvbG9ycyIsIk1hc3NOb2RlIiwiTWFzc1ZhbHVlQ29udHJvbFBhbmVsIiwiTW92YWJsZUxpbmVOb2RlIiwiUmVmZXJlbmNlTGluZU5vZGUiLCJTcHJpbmdIYW5nZXJOb2RlIiwiU3ByaW5nU2NyZWVuVmlldyIsImhlaWdodEVxdWFsc1plcm9TdHJpbmciLCJoZWlnaHRFcXVhbHNaZXJvIiwibGFyZ2VTdHJpbmciLCJsYXJnZSIsInNtYWxsU3RyaW5nIiwic21hbGwiLCJPbmVTcHJpbmdTY3JlZW5WaWV3IiwiY29uc3RydWN0b3IiLCJtb2RlbCIsInRhbmRlbSIsIm9wdGlvbnMiLCJzcHJpbmdDZW50ZXIiLCJtb2RlbFZpZXdUcmFuc2Zvcm0iLCJtb2RlbFRvVmlld1giLCJmaXJzdFNwcmluZyIsInBvc2l0aW9uUHJvcGVydHkiLCJ2YWx1ZSIsIngiLCJtaW5NYXhMYWJlbHMiLCJmb250IiwiTEFCRUxfRk9OVCIsIm1heFdpZHRoIiwiZXF1aWxpYnJpdW1WaXNpYmlsaXR5UHJvcGVydHkiLCJlcXVpbGlicml1bVBvc2l0aW9uVmlzaWJsZVByb3BlcnR5IiwibWFzc0F0dGFjaGVkUHJvcGVydHkiLCJlcXVpbGlicml1bVBvc2l0aW9uVmlzaWJsZSIsIm1hc3NBdHRhY2hlZCIsIm1hc3NOb2RlSWNvbiIsImFkanVzdGFibGVNYXNzUHJvcGVydHkiLCJncmF2aXR5UHJvcGVydHkiLCJpY29uIiwidmlzaWJsZUJvdW5kc1Byb3BlcnR5IiwiY3JlYXRlVGFuZGVtIiwibWFzc1ZhbHVlQ29udHJvbFBhbmVsIiwibWFzc2VzIiwiUEFORUxfTUFYX1dJRFRIIiwieU1hcmdpbiIsInNwcmluZ0hhbmdlck5vZGUiLCJzcHJpbmdzIiwic2luZ2xlU3ByaW5nIiwic3ByaW5nU3RvcHBlckJ1dHRvbk5vZGUiLCJjcmVhdGVTdG9wcGVyQnV0dG9uIiwic3ByaW5nQ29uc3RhbnRDb250cm9sUGFuZWwiLCJjcmVhdGVTcHJpbmdDb25zdGFudFBhbmVsIiwibWFzc0VxdWlsaWJyaXVtTGluZU5vZGUiLCJtYXNzRXF1aWxpYnJpdW1ZUG9zaXRpb25Qcm9wZXJ0eSIsInN0cm9rZSIsIm5hdHVyYWxMZW5ndGhMaW5lTm9kZSIsImJvdHRvbVByb3BlcnR5IiwibmF0dXJhbExlbmd0aFZpc2libGVQcm9wZXJ0eSIsInVuc3RyZXRjaGVkTGVuZ3RoUHJvcGVydHkiLCJmaXhlZFBvc2l0aW9uIiwiYnV0dG9uRW5hYmxlZFByb3BlcnR5IiwibGluayIsImJ1dHRvbkVuYWJsZWQiLCJlbmFibGVkIiwiYmFzaWNzVmVyc2lvbiIsImVuZXJneUdyYXBoQWNjb3JkaW9uQm94IiwiYWRkQ2hpbGQiLCJ6ZXJvSGVpZ2h0UHJvcGVydHkiLCJtb2RlbFRvVmlld1kiLCJGTE9PUl9ZIiwieEJvdW5kc0xpbWl0Iiwic3BhY2luZyIsIm1vdmFibGVMaW5lTm9kZSIsImNlbnRlciIsInBsdXMiLCJtb3ZhYmxlTGluZVZpc2libGVQcm9wZXJ0eSIsImRpc3BsYWNlbWVudEFycm93Tm9kZSIsInNwcmluZ05vZGVzIiwibm9kZVByb3BlcnR5Iiwic3ByaW5nIiwiZGlzcGxhY2VtZW50UHJvcGVydHkiLCJsZWZ0IiwicmlnaHQiLCJjZW50ZXJZIiwiemVyb0hlaWdodExpbmUiLCJ6ZXJvUG9pbnRMaW5lIiwibGFiZWwiLCJUSVRMRV9GT05UIiwiZmlsbCIsInkiLCJnZXQiLCJyZXNldEFsbEJ1dHRvbiIsImFkZExpc3RlbmVyIiwicmVzZXQiLCJzcHJpbmdTeXN0ZW1Db250cm9sc05vZGUiLCJjaGlsZHJlbiIsImFsaWduIiwiZXhjbHVkZUludmlzaWJsZUNoaWxkcmVuRnJvbUJvdW5kcyIsIm1hc3NMYXllciIsInRvb2xzTGF5ZXIiLCJ2aXNpYmxlQm91bmRzIiwiYWRqdXN0Vmlld0NvbXBvbmVudHMiLCJzdGVwIiwidXBkYXRlIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJPbmVTcHJpbmdTY3JlZW5WaWV3LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE2LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIENvbW1vbiBTY3JlZW5WaWV3IGZvciB1c2luZyBvbmUgbWFzcy5cclxuICpcclxuICogQGF1dGhvciBNYXR0IFBlbm5pbmd0b24gKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqIEBhdXRob3IgRGVuemVsbCBCYXJuZXR0IChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBEZXJpdmVkUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9EZXJpdmVkUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9Qcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBCb3VuZHMyIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9Cb3VuZHMyLmpzJztcclxuaW1wb3J0IFZlY3RvcjIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1ZlY3RvcjIuanMnO1xyXG5pbXBvcnQgeyBIQm94LCBUZXh0IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IG1hc3Nlc0FuZFNwcmluZ3MgZnJvbSAnLi4vLi4vbWFzc2VzQW5kU3ByaW5ncy5qcyc7XHJcbmltcG9ydCBNYXNzZXNBbmRTcHJpbmdzU3RyaW5ncyBmcm9tICcuLi8uLi9NYXNzZXNBbmRTcHJpbmdzU3RyaW5ncy5qcyc7XHJcbmltcG9ydCBEaXNwbGFjZW1lbnRBcnJvd05vZGUgZnJvbSAnLi4vLi4vdmVjdG9ycy92aWV3L0Rpc3BsYWNlbWVudEFycm93Tm9kZS5qcyc7XHJcbmltcG9ydCBNYXNzZXNBbmRTcHJpbmdzQ29uc3RhbnRzIGZyb20gJy4uL01hc3Nlc0FuZFNwcmluZ3NDb25zdGFudHMuanMnO1xyXG5pbXBvcnQgTWFzcyBmcm9tICcuLi9tb2RlbC9NYXNzLmpzJztcclxuaW1wb3J0IEVuZXJneUdyYXBoQWNjb3JkaW9uQm94IGZyb20gJy4vRW5lcmd5R3JhcGhBY2NvcmRpb25Cb3guanMnO1xyXG5pbXBvcnQgTWFzc2VzQW5kU3ByaW5nc0NvbG9ycyBmcm9tICcuL01hc3Nlc0FuZFNwcmluZ3NDb2xvcnMuanMnO1xyXG5pbXBvcnQgTWFzc05vZGUgZnJvbSAnLi9NYXNzTm9kZS5qcyc7XHJcbmltcG9ydCBNYXNzVmFsdWVDb250cm9sUGFuZWwgZnJvbSAnLi9NYXNzVmFsdWVDb250cm9sUGFuZWwuanMnO1xyXG5pbXBvcnQgTW92YWJsZUxpbmVOb2RlIGZyb20gJy4vTW92YWJsZUxpbmVOb2RlLmpzJztcclxuaW1wb3J0IFJlZmVyZW5jZUxpbmVOb2RlIGZyb20gJy4vUmVmZXJlbmNlTGluZU5vZGUuanMnO1xyXG5pbXBvcnQgU3ByaW5nSGFuZ2VyTm9kZSBmcm9tICcuL1NwcmluZ0hhbmdlck5vZGUuanMnO1xyXG5pbXBvcnQgU3ByaW5nU2NyZWVuVmlldyBmcm9tICcuL1NwcmluZ1NjcmVlblZpZXcuanMnO1xyXG5cclxuY29uc3QgaGVpZ2h0RXF1YWxzWmVyb1N0cmluZyA9IE1hc3Nlc0FuZFNwcmluZ3NTdHJpbmdzLmhlaWdodEVxdWFsc1plcm87XHJcbmNvbnN0IGxhcmdlU3RyaW5nID0gTWFzc2VzQW5kU3ByaW5nc1N0cmluZ3MubGFyZ2U7XHJcbmNvbnN0IHNtYWxsU3RyaW5nID0gTWFzc2VzQW5kU3ByaW5nc1N0cmluZ3Muc21hbGw7XHJcblxyXG5jbGFzcyBPbmVTcHJpbmdTY3JlZW5WaWV3IGV4dGVuZHMgU3ByaW5nU2NyZWVuVmlldyB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7TWFzc2VzQW5kU3ByaW5nc01vZGVsfSBtb2RlbFxyXG4gICAqIEBwYXJhbSB7VGFuZGVtfSB0YW5kZW1cclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIG1vZGVsLCB0YW5kZW0sIG9wdGlvbnMgKSB7XHJcbiAgICBzdXBlciggbW9kZWwsIHRhbmRlbSwgb3B0aW9ucyApO1xyXG4gICAgLy8gQHB1YmxpYyB7bnVtYmVyfSBjZW50ZXJYIG9mIHRoZSBzcHJpbmcgaW4gdmlldyBjb29yZGluYXRlc1xyXG4gICAgdGhpcy5zcHJpbmdDZW50ZXIgPSB0aGlzLm1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld1goIG1vZGVsLmZpcnN0U3ByaW5nLnBvc2l0aW9uUHJvcGVydHkudmFsdWUueCApO1xyXG5cclxuICAgIC8vIFNwcmluZyBDb25zdGFudCBDb250cm9sIFBhbmVsXHJcbiAgICBjb25zdCBtaW5NYXhMYWJlbHMgPSBbXHJcbiAgICAgIG5ldyBUZXh0KCBzbWFsbFN0cmluZywgeyBmb250OiBNYXNzZXNBbmRTcHJpbmdzQ29uc3RhbnRzLkxBQkVMX0ZPTlQsIG1heFdpZHRoOiA2MCB9ICksXHJcbiAgICAgIG5ldyBUZXh0KCBsYXJnZVN0cmluZywgeyBmb250OiBNYXNzZXNBbmRTcHJpbmdzQ29uc3RhbnRzLkxBQkVMX0ZPTlQsIG1heFdpZHRoOiA2MCB9IClcclxuICAgIF07XHJcblxyXG4gICAgLy8gQHB1YmxpYyB7UHJvcGVydHkuPGJvb2xlYW4+fSBFcXVpbGlicml1bSBvZiBtYXNzIGlzIGRlcGVuZGVudCBvbiB0aGUgbWFzcyBiZWluZyBhdHRhY2hlZCBhbmQgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGVxdWlsaWJyaXVtIGxpbmUuXHJcbiAgICB0aGlzLmVxdWlsaWJyaXVtVmlzaWJpbGl0eVByb3BlcnR5ID0gbmV3IERlcml2ZWRQcm9wZXJ0eShcclxuICAgICAgWyBtb2RlbC5lcXVpbGlicml1bVBvc2l0aW9uVmlzaWJsZVByb3BlcnR5LCBtb2RlbC5maXJzdFNwcmluZy5tYXNzQXR0YWNoZWRQcm9wZXJ0eSBdLFxyXG4gICAgICAoIGVxdWlsaWJyaXVtUG9zaXRpb25WaXNpYmxlLCBtYXNzQXR0YWNoZWQgKSA9PiB7XHJcbiAgICAgICAgaWYgKCBtYXNzQXR0YWNoZWQgKSB7XHJcbiAgICAgICAgICByZXR1cm4gZXF1aWxpYnJpdW1Qb3NpdGlvblZpc2libGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSApO1xyXG5cclxuICAgIC8vIEBwdWJsaWMge01hc3NOb2RlfSBJY29uIHVzZWQgaW4gbWFzc1ZhbHVlQ29udHJvbFBhbmVsIGluIGJvdGggQmFzaWNzIGFuZCBub24tQmFzaWNzIHZlcnNpb25cclxuICAgIHRoaXMubWFzc05vZGVJY29uID0gbmV3IE1hc3NOb2RlKFxyXG4gICAgICBuZXcgTWFzcyggMC4wMDU1LCAwLCBNYXNzZXNBbmRTcHJpbmdzQ29sb3JzLmFkanVzdGFibGVNYXNzUHJvcGVydHksIG1vZGVsLmdyYXZpdHlQcm9wZXJ0eSwgdGFuZGVtLCB7IGljb246IHRydWUgfSApLFxyXG4gICAgICB0aGlzLm1vZGVsVmlld1RyYW5zZm9ybSxcclxuICAgICAgdGhpcy52aXNpYmxlQm91bmRzUHJvcGVydHksXHJcbiAgICAgIG1vZGVsLFxyXG4gICAgICB0YW5kZW0uY3JlYXRlVGFuZGVtKCAnbWFzc0ljb24nICkgKTtcclxuXHJcbiAgICBjb25zdCBtYXNzVmFsdWVDb250cm9sUGFuZWwgPSBuZXcgTWFzc1ZhbHVlQ29udHJvbFBhbmVsKFxyXG4gICAgICBtb2RlbC5tYXNzZXNbIDAgXSxcclxuICAgICAgdGhpcy5tYXNzTm9kZUljb24sXHJcbiAgICAgIHRhbmRlbS5jcmVhdGVUYW5kZW0oICdtYXNzVmFsdWVDb250cm9sUGFuZWwnICksIHtcclxuICAgICAgICBtYXhXaWR0aDogTWFzc2VzQW5kU3ByaW5nc0NvbnN0YW50cy5QQU5FTF9NQVhfV0lEVEggLSA4LFxyXG4gICAgICAgIHlNYXJnaW46IDVcclxuICAgICAgfSApO1xyXG5cclxuICAgIHRoaXMuc3ByaW5nSGFuZ2VyTm9kZSA9IG5ldyBTcHJpbmdIYW5nZXJOb2RlKCBtb2RlbC5zcHJpbmdzLFxyXG4gICAgICB0aGlzLm1vZGVsVmlld1RyYW5zZm9ybSxcclxuICAgICAgdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3NwcmluZ0hhbmdlck5vZGUnICksXHJcbiAgICAgIHtcclxuICAgICAgICBzaW5nbGVTcHJpbmc6IHRydWVcclxuICAgICAgfSApO1xyXG4gICAgdGhpcy5zcHJpbmdTdG9wcGVyQnV0dG9uTm9kZSA9IHRoaXMuY3JlYXRlU3RvcHBlckJ1dHRvbiggdGhpcy5tb2RlbC5maXJzdFNwcmluZywgdGFuZGVtICk7XHJcblxyXG4gICAgLy8gQHB1YmxpYyB7U3ByaW5nQ29udHJvbFBhbmVsfSBBY2Nlc3NlZCBpbiBCYXNpY3MgdmVyc2lvblxyXG4gICAgdGhpcy5zcHJpbmdDb25zdGFudENvbnRyb2xQYW5lbCA9IHRoaXMuY3JlYXRlU3ByaW5nQ29uc3RhbnRQYW5lbCggMCwgbWluTWF4TGFiZWxzLCB0YW5kZW0gKTtcclxuXHJcbiAgICAvLyBAcHVibGljIHtSZWZlcmVuY2VMaW5lTm9kZX0gSW5pdGlhbGl6ZXMgZXF1aWxpYnJpdW0gbGluZSBmb3IgYW4gYXR0YWNoZWQgbWFzc1xyXG4gICAgdGhpcy5tYXNzRXF1aWxpYnJpdW1MaW5lTm9kZSA9IG5ldyBSZWZlcmVuY2VMaW5lTm9kZShcclxuICAgICAgdGhpcy5tb2RlbFZpZXdUcmFuc2Zvcm0sXHJcbiAgICAgIG1vZGVsLmZpcnN0U3ByaW5nLFxyXG4gICAgICBtb2RlbC5maXJzdFNwcmluZy5tYXNzRXF1aWxpYnJpdW1ZUG9zaXRpb25Qcm9wZXJ0eSxcclxuICAgICAgdGhpcy5lcXVpbGlicml1bVZpc2liaWxpdHlQcm9wZXJ0eSwge1xyXG4gICAgICAgIHN0cm9rZTogJ2JsYWNrJ1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIEluaXRpYWxpemVzIG5hdHVyYWwgbGluZSBmb3IgdGhlIHNwcmluZ1xyXG4gICAgY29uc3QgbmF0dXJhbExlbmd0aExpbmVOb2RlID0gbmV3IFJlZmVyZW5jZUxpbmVOb2RlKFxyXG4gICAgICB0aGlzLm1vZGVsVmlld1RyYW5zZm9ybSxcclxuICAgICAgbW9kZWwuZmlyc3RTcHJpbmcsXHJcbiAgICAgIG1vZGVsLmZpcnN0U3ByaW5nLmJvdHRvbVByb3BlcnR5LFxyXG4gICAgICBtb2RlbC5uYXR1cmFsTGVuZ3RoVmlzaWJsZVByb3BlcnR5LCB7XHJcbiAgICAgICAgc3Ryb2tlOiBNYXNzZXNBbmRTcHJpbmdzQ29sb3JzLnVuc3RyZXRjaGVkTGVuZ3RoUHJvcGVydHksIC8vIE5hbWluZyBjb252ZW50aW9uIHB1bGxlZCBmcm9tIGJhc2ljcyB2ZXJzaW9uLlxyXG4gICAgICAgIGZpeGVkUG9zaXRpb246IHRydWVcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLm1vZGVsLmZpcnN0U3ByaW5nLmJ1dHRvbkVuYWJsZWRQcm9wZXJ0eS5saW5rKFxyXG4gICAgICBidXR0b25FbmFibGVkID0+IHtcclxuICAgICAgICB0aGlzLnNwcmluZ1N0b3BwZXJCdXR0b25Ob2RlLmVuYWJsZWQgPSBidXR0b25FbmFibGVkO1xyXG4gICAgICB9ICk7XHJcblxyXG4gICAgaWYgKCAhbW9kZWwuYmFzaWNzVmVyc2lvbiApIHtcclxuICAgICAgLy8gQHB1YmxpYyB7RW5lcmd5R3JhcGhBY2NvcmRpb25Cb3h9IGVuZXJneSBncmFwaCB0aGF0IGRpc3BsYXlzIGVuZXJneSB2YWx1ZXMgZm9yIHRoZSBzcHJpbmcgc3lzdGVtLlxyXG4gICAgICB0aGlzLmVuZXJneUdyYXBoQWNjb3JkaW9uQm94ID0gbmV3IEVuZXJneUdyYXBoQWNjb3JkaW9uQm94KCBtb2RlbCwgdGFuZGVtICk7XHJcbiAgICAgIHRoaXMuYWRkQ2hpbGQoIHRoaXMuZW5lcmd5R3JhcGhBY2NvcmRpb25Cb3ggKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQcm9wZXJ0eSB0aGF0IGRldGVybWluZXMgdGhlIHplcm8gaGVpZ2h0IGluIHRoZSB2aWV3LlxyXG4gICAgY29uc3QgemVyb0hlaWdodFByb3BlcnR5ID0gbmV3IFByb3BlcnR5KCB0aGlzLm1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld1koIE1hc3Nlc0FuZFNwcmluZ3NDb25zdGFudHMuRkxPT1JfWSApICk7XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZXMgbW92YWJsZSBsaW5lXHJcbiAgICBjb25zdCB4Qm91bmRzTGltaXQgPSB0aGlzLnNwcmluZ0NlbnRlciArIHRoaXMuc3BhY2luZyAqIDEuMTtcclxuICAgIHRoaXMubW92YWJsZUxpbmVOb2RlID0gbmV3IE1vdmFibGVMaW5lTm9kZShcclxuICAgICAgdGhpcy5zcHJpbmdIYW5nZXJOb2RlLmNlbnRlci5wbHVzKCBuZXcgVmVjdG9yMiggNDUsIDIwMCApICksXHJcbiAgICAgIDEwMCxcclxuICAgICAgbW9kZWwubW92YWJsZUxpbmVWaXNpYmxlUHJvcGVydHksXHJcbiAgICAgIG5ldyBCb3VuZHMyKCB4Qm91bmRzTGltaXQsIDg1LCB4Qm91bmRzTGltaXQsIHplcm9IZWlnaHRQcm9wZXJ0eS52YWx1ZSApLFxyXG4gICAgICB0YW5kZW0uY3JlYXRlVGFuZGVtKCAnbW92YWJsZUxpbmVOb2RlJyApXHJcbiAgICApO1xyXG5cclxuICAgIGxldCBkaXNwbGFjZW1lbnRBcnJvd05vZGU7XHJcblxyXG4gICAgLy8gTWFzc2VzIGFuZCBTcHJpbmdzOkJhc2ljcyBzaG91bGQgbm90IGluY2x1ZGUgYSB6ZXJvIGhlaWdodCByZWZlcmVuY2UgbGluZVxyXG4gICAgaWYgKCAhbW9kZWwuYmFzaWNzVmVyc2lvbiApIHtcclxuXHJcbiAgICAgIC8vIERpc3BsYWNlbWVudCBhcnJvd3MgYWRkZWQgZm9yIGVhY2ggc3ByaW5nc1xyXG4gICAgICBkaXNwbGFjZW1lbnRBcnJvd05vZGUgPSBuZXcgRGlzcGxhY2VtZW50QXJyb3dOb2RlKFxyXG4gICAgICAgIHRoaXMuc3ByaW5nTm9kZXNbIDAgXS5ub2RlUHJvcGVydHkudmFsdWUuc3ByaW5nLmRpc3BsYWNlbWVudFByb3BlcnR5LFxyXG4gICAgICAgIG1vZGVsLm5hdHVyYWxMZW5ndGhWaXNpYmxlUHJvcGVydHksXHJcbiAgICAgICAgdGFuZGVtLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG1vZGVsVmlld1RyYW5zZm9ybTogdGhpcy5tb2RlbFZpZXdUcmFuc2Zvcm0sXHJcbiAgICAgICAgICBsZWZ0OiB0aGlzLnNwcmluZ05vZGVzWyAwIF0ubm9kZVByb3BlcnR5LnZhbHVlLnJpZ2h0ICsgMTIsXHJcbiAgICAgICAgICBjZW50ZXJZOiB0aGlzLm1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld1koIHRoaXMuc3ByaW5nTm9kZXNbIDAgXS5ub2RlUHJvcGVydHkudmFsdWUuc3ByaW5nLmJvdHRvbVByb3BlcnR5LnZhbHVlIClcclxuICAgICAgICB9ICk7XHJcblxyXG4gICAgICAvLyBaZXJvIGhlaWdodCByZWZlcmVuY2UgbGluZVxyXG4gICAgICBjb25zdCB6ZXJvSGVpZ2h0TGluZSA9IG5ldyBSZWZlcmVuY2VMaW5lTm9kZShcclxuICAgICAgICB0aGlzLm1vZGVsVmlld1RyYW5zZm9ybSxcclxuICAgICAgICBtb2RlbC5maXJzdFNwcmluZyxcclxuICAgICAgICB6ZXJvSGVpZ2h0UHJvcGVydHksXHJcbiAgICAgICAgbmV3IFByb3BlcnR5KCB0cnVlICksIHtcclxuICAgICAgICAgIHN0cm9rZTogJyM1Nzk4ZGUnLFxyXG4gICAgICAgICAgemVyb1BvaW50TGluZTogdHJ1ZSxcclxuICAgICAgICAgIGxhYmVsOiBuZXcgVGV4dCggaGVpZ2h0RXF1YWxzWmVyb1N0cmluZywge1xyXG4gICAgICAgICAgICBmb250OiBNYXNzZXNBbmRTcHJpbmdzQ29uc3RhbnRzLlRJVExFX0ZPTlQsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjNTc5OGRlJyxcclxuICAgICAgICAgICAgbWF4V2lkdGg6IDEyNVxyXG4gICAgICAgICAgfSApXHJcbiAgICAgICAgfSApO1xyXG5cclxuICAgICAgemVyb0hlaWdodExpbmUueCA9IHRoaXMubWFzc0VxdWlsaWJyaXVtTGluZU5vZGUueDtcclxuICAgICAgemVyb0hlaWdodExpbmUueSA9IHplcm9IZWlnaHRQcm9wZXJ0eS5nZXQoKTtcclxuICAgICAgdGhpcy5hZGRDaGlsZCggemVyb0hlaWdodExpbmUgKTtcclxuXHJcbiAgICAgIHRoaXMucmVzZXRBbGxCdXR0b24uYWRkTGlzdGVuZXIoICgpID0+IHtcclxuICAgICAgICB0aGlzLm1vdmFibGVMaW5lTm9kZS5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuZW5lcmd5R3JhcGhBY2NvcmRpb25Cb3ggJiYgdGhpcy5lbmVyZ3lHcmFwaEFjY29yZGlvbkJveC5yZXNldCgpO1xyXG4gICAgICB9ICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQHB1YmxpYyB7SEJveH0gQ29udGFpbnMgUGFuZWxzL05vZGVzIHRoYXQgaG92ZXIgbmVhciB0aGUgc3ByaW5nIHN5c3RlbSBhdCB0aGUgY2VudGVyIG9mIHRoZSBzY3JlZW4uXHJcbiAgICB0aGlzLnNwcmluZ1N5c3RlbUNvbnRyb2xzTm9kZSA9IG5ldyBIQm94KCB7XHJcbiAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgbWFzc1ZhbHVlQ29udHJvbFBhbmVsLFxyXG4gICAgICAgIHRoaXMuc3ByaW5nSGFuZ2VyTm9kZSxcclxuICAgICAgICB0aGlzLnNwcmluZ1N0b3BwZXJCdXR0b25Ob2RlXHJcbiAgICAgIF0sXHJcbiAgICAgIHNwYWNpbmc6IHRoaXMuc3BhY2luZyAqIDEuNCxcclxuICAgICAgYWxpZ246ICd0b3AnLFxyXG4gICAgICBleGNsdWRlSW52aXNpYmxlQ2hpbGRyZW5Gcm9tQm91bmRzOiBmYWxzZVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIEFkZGluZyBzeXN0ZW0gY29udHJvbHMgYW5kIGVuZXJneSBncmFwaCB0byBzY2VuZSBncmFwaFxyXG4gICAgdGhpcy5hZGRDaGlsZCggdGhpcy5zcHJpbmdTeXN0ZW1Db250cm9sc05vZGUgKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIHRoaXMuc3ByaW5nQ29uc3RhbnRDb250cm9sUGFuZWwgKTtcclxuXHJcbiAgICAvLyBSZWZlcmVuY2UgbGluZXMgZnJvbSBpbmRpY2F0b3IgdmlzaWJpbGl0eSBib3hcclxuICAgIGlmICggIW1vZGVsLmJhc2ljc1ZlcnNpb24gKSB7XHJcbiAgICAgIHRoaXMuYWRkQ2hpbGQoIHRoaXMubWFzc0VxdWlsaWJyaXVtTGluZU5vZGUgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkZENoaWxkKCBuYXR1cmFsTGVuZ3RoTGluZU5vZGUgKTtcclxuXHJcbiAgICAvLyBUaGlzIGlzIGhhbmRsZWQgaGVyZSB0byBtYWludGFpbiBsaW5lIG5vZGUgbGF5ZXJpbmcgb3JkZXJcclxuICAgIGlmICggIW1vZGVsLmJhc2ljc1ZlcnNpb24gKSB7XHJcbiAgICAgIHRoaXMuYWRkQ2hpbGQoIGRpc3BsYWNlbWVudEFycm93Tm9kZSApO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hZGRDaGlsZCggdGhpcy5tb3ZhYmxlTGluZU5vZGUgKTtcclxuXHJcbiAgICAvLyBBZGRpbmcgbGF5ZXJzIGZvciBkcmFnZ2FibGUgb2JqZWN0c1xyXG4gICAgdGhpcy5hZGRDaGlsZCggdGhpcy5tYXNzTGF5ZXIgKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIHRoaXMudG9vbHNMYXllciApO1xyXG5cclxuICAgIC8vIEFkanVzdCB0aGUgZmxvYXRpbmcgcGFuZWxzIHRvIHRoZSB2aXNpYmxlQm91bmRzIG9mIHRoZSBzY3JlZW4uXHJcbiAgICB0aGlzLnZpc2libGVCb3VuZHNQcm9wZXJ0eS5saW5rKCB2aXNpYmxlQm91bmRzID0+IHtcclxuICAgICAgdGhpcy5hZGp1c3RWaWV3Q29tcG9uZW50cyggdHJ1ZSwgdmlzaWJsZUJvdW5kcyApO1xyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzcG9uc2libGUgZm9yIHVwZGF0aW5nIHRoZSBlbmVyZ3kgYmFyIGdyYXBoXHJcbiAgICpcclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgc3RlcCgpIHtcclxuICAgIHRoaXMuZW5lcmd5R3JhcGhBY2NvcmRpb25Cb3gudXBkYXRlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5tYXNzZXNBbmRTcHJpbmdzLnJlZ2lzdGVyKCAnT25lU3ByaW5nU2NyZWVuVmlldycsIE9uZVNwcmluZ1NjcmVlblZpZXcgKTtcclxuZXhwb3J0IGRlZmF1bHQgT25lU3ByaW5nU2NyZWVuVmlldzsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxlQUFlLE1BQU0sd0NBQXdDO0FBQ3BFLE9BQU9DLFFBQVEsTUFBTSxpQ0FBaUM7QUFDdEQsT0FBT0MsT0FBTyxNQUFNLCtCQUErQjtBQUNuRCxPQUFPQyxPQUFPLE1BQU0sK0JBQStCO0FBQ25ELFNBQVNDLElBQUksRUFBRUMsSUFBSSxRQUFRLG1DQUFtQztBQUM5RCxPQUFPQyxnQkFBZ0IsTUFBTSwyQkFBMkI7QUFDeEQsT0FBT0MsdUJBQXVCLE1BQU0sa0NBQWtDO0FBQ3RFLE9BQU9DLHFCQUFxQixNQUFNLDZDQUE2QztBQUMvRSxPQUFPQyx5QkFBeUIsTUFBTSxpQ0FBaUM7QUFDdkUsT0FBT0MsSUFBSSxNQUFNLGtCQUFrQjtBQUNuQyxPQUFPQyx1QkFBdUIsTUFBTSw4QkFBOEI7QUFDbEUsT0FBT0Msc0JBQXNCLE1BQU0sNkJBQTZCO0FBQ2hFLE9BQU9DLFFBQVEsTUFBTSxlQUFlO0FBQ3BDLE9BQU9DLHFCQUFxQixNQUFNLDRCQUE0QjtBQUM5RCxPQUFPQyxlQUFlLE1BQU0sc0JBQXNCO0FBQ2xELE9BQU9DLGlCQUFpQixNQUFNLHdCQUF3QjtBQUN0RCxPQUFPQyxnQkFBZ0IsTUFBTSx1QkFBdUI7QUFD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