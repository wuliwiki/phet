// Copyright 2016-2022, University of Colorado Boulder

/**
 * Vertical color gradient that shows triangles that move based on user input events. Very similar in intent and
 * implementation to AppleGraphNode.js
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../../axon/js/Multilink.js';
import TriangleNode from '../../../../../scenery-phet/js/TriangleNode.js';
import { Node } from '../../../../../scenery/js/imports.js';
import proportionPlayground from '../../../proportionPlayground.js';
import PaintChoice from '../../model/paint/PaintChoice.js';
import PaintChoiceGradientNode from './PaintChoiceGradientNode.js';

// constants
const GRADIENT_WIDTH = 20;
const GRADIENT_HEIGHT = 300;
class GradientIndicatorNode extends Node {
  /**
   * @param {Bounds2} layoutBounds - the visible region for the screen
   * @param {PaintScene} scene - the model
   * @param {Property.<boolean>} revealProperty - true if the gradient triangle indicators representation should be shown
   * @param {Object} [options] - node options
   */
  constructor(layoutBounds, scene, revealProperty, options) {
    // Create the gradients
    const gradientNodes = PaintChoice.CHOICES.map(paintChoice => {
      const gradientNode = new PaintChoiceGradientNode(GRADIENT_WIDTH, GRADIENT_HEIGHT, paintChoice);
      gradientNode.paintChoice = paintChoice;
      return gradientNode;
    });

    // Triangle indicators on the left/right
    const leftIndicator = new TriangleNode({
      pointDirection: 'right',
      triangleHeight: 10,
      triangleWidth: 17
    });
    const rightIndicator = new TriangleNode({
      pointDirection: 'left',
      triangleHeight: 10,
      triangleWidth: 17
    });

    // Show colored/gray based on the user selection
    scene.paintChoiceProperty.link(paintChoice => {
      gradientNodes.forEach(gradientNode => {
        gradientNode.visible = gradientNode.paintChoice === paintChoice;
        if (gradientNode.visible) {
          leftIndicator.right = gradientNode.left;
          rightIndicator.left = gradientNode.right;
        }
      });
    });
    super({
      children: gradientNodes.concat([leftIndicator, rightIndicator])
    });

    /**
     * Auxiliary function that updates the left or right triangle indicator node.
     *
     * @param {Node} indicator - the left or right triangle node
     * @param {Splotch} splotchModel - the model
     * @param {function} condition - additional condition indicating whether the indicator node should be shown.
     * @returns {function}
     */
    const createIndicatorUpdateFunction = (indicator, splotchModel, condition) => () => {
      const total = splotchModel.visibleLeftColorProperty.value + splotchModel.visibleRightColorProperty.value;
      if (total < 1e-6) {
        indicator.visible = false;
      } else {
        indicator.visible = condition() && revealProperty.get();
        const proportion = splotchModel.visibleRightColorProperty.value / total;
        indicator.centerY = proportion * GRADIENT_HEIGHT;
      }
    };

    // Update the left triangle indicator node when its parameters change.
    Multilink.multilink([scene.leftSplotch.visibleLeftColorProperty, scene.leftSplotch.visibleRightColorProperty, revealProperty], createIndicatorUpdateFunction(leftIndicator, scene.leftSplotch, () => true));

    // Update the right triangle indicator node when its parameters change.
    Multilink.multilink([scene.rightSplotch.visibleLeftColorProperty, scene.rightSplotch.visibleRightColorProperty, scene.showBothProperty, revealProperty], createIndicatorUpdateFunction(rightIndicator, scene.rightSplotch, () => scene.showBothProperty.value));

    // Update the fills of the triangle indicator nodes
    Multilink.multilink([scene.leftSplotch.visibleLeftColorProperty, scene.leftSplotch.visibleRightColorProperty, scene.rightSplotch.visibleLeftColorProperty, scene.rightSplotch.visibleRightColorProperty, scene.showBothProperty], () => {
      const fill = scene.areVisualRatiosEquivalent() && scene.showBothProperty.value ? 'black' : null;
      rightIndicator.fill = fill;
      leftIndicator.fill = fill;
    });

    // Position the node
    scene.showBothProperty.link(showBoth => {
      this.centerX = showBoth ? layoutBounds.centerX : layoutBounds.right * 0.7;
    });
    this.mutate(options);
  }
}
proportionPlayground.register('GradientIndicatorNode', GradientIndicatorNode);
export default GradientIndicatorNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNdWx0aWxpbmsiLCJUcmlhbmdsZU5vZGUiLCJOb2RlIiwicHJvcG9ydGlvblBsYXlncm91bmQiLCJQYWludENob2ljZSIsIlBhaW50Q2hvaWNlR3JhZGllbnROb2RlIiwiR1JBRElFTlRfV0lEVEgiLCJHUkFESUVOVF9IRUlHSFQiLCJHcmFkaWVudEluZGljYXRvck5vZGUiLCJjb25zdHJ1Y3RvciIsImxheW91dEJvdW5kcyIsInNjZW5lIiwicmV2ZWFsUHJvcGVydHkiLCJvcHRpb25zIiwiZ3JhZGllbnROb2RlcyIsIkNIT0lDRVMiLCJtYXAiLCJwYWludENob2ljZSIsImdyYWRpZW50Tm9kZSIsImxlZnRJbmRpY2F0b3IiLCJwb2ludERpcmVjdGlvbiIsInRyaWFuZ2xlSGVpZ2h0IiwidHJpYW5nbGVXaWR0aCIsInJpZ2h0SW5kaWNhdG9yIiwicGFpbnRDaG9pY2VQcm9wZXJ0eSIsImxpbmsiLCJmb3JFYWNoIiwidmlzaWJsZSIsInJpZ2h0IiwibGVmdCIsImNoaWxkcmVuIiwiY29uY2F0IiwiY3JlYXRlSW5kaWNhdG9yVXBkYXRlRnVuY3Rpb24iLCJpbmRpY2F0b3IiLCJzcGxvdGNoTW9kZWwiLCJjb25kaXRpb24iLCJ0b3RhbCIsInZpc2libGVMZWZ0Q29sb3JQcm9wZXJ0eSIsInZhbHVlIiwidmlzaWJsZVJpZ2h0Q29sb3JQcm9wZXJ0eSIsImdldCIsInByb3BvcnRpb24iLCJjZW50ZXJZIiwibXVsdGlsaW5rIiwibGVmdFNwbG90Y2giLCJyaWdodFNwbG90Y2giLCJzaG93Qm90aFByb3BlcnR5IiwiZmlsbCIsImFyZVZpc3VhbFJhdGlvc0VxdWl2YWxlbnQiLCJzaG93Qm90aCIsImNlbnRlclgiLCJtdXRhdGUiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkdyYWRpZW50SW5kaWNhdG9yTm9kZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNi0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBWZXJ0aWNhbCBjb2xvciBncmFkaWVudCB0aGF0IHNob3dzIHRyaWFuZ2xlcyB0aGF0IG1vdmUgYmFzZWQgb24gdXNlciBpbnB1dCBldmVudHMuIFZlcnkgc2ltaWxhciBpbiBpbnRlbnQgYW5kXHJcbiAqIGltcGxlbWVudGF0aW9uIHRvIEFwcGxlR3JhcGhOb2RlLmpzXHJcbiAqXHJcbiAqIEBhdXRob3IgU2FtIFJlaWQgKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqL1xyXG5cclxuaW1wb3J0IE11bHRpbGluayBmcm9tICcuLi8uLi8uLi8uLi8uLi9heG9uL2pzL011bHRpbGluay5qcyc7XHJcbmltcG9ydCBUcmlhbmdsZU5vZGUgZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL1RyaWFuZ2xlTm9kZS5qcyc7XHJcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgcHJvcG9ydGlvblBsYXlncm91bmQgZnJvbSAnLi4vLi4vLi4vcHJvcG9ydGlvblBsYXlncm91bmQuanMnO1xyXG5pbXBvcnQgUGFpbnRDaG9pY2UgZnJvbSAnLi4vLi4vbW9kZWwvcGFpbnQvUGFpbnRDaG9pY2UuanMnO1xyXG5pbXBvcnQgUGFpbnRDaG9pY2VHcmFkaWVudE5vZGUgZnJvbSAnLi9QYWludENob2ljZUdyYWRpZW50Tm9kZS5qcyc7XHJcblxyXG4vLyBjb25zdGFudHNcclxuY29uc3QgR1JBRElFTlRfV0lEVEggPSAyMDtcclxuY29uc3QgR1JBRElFTlRfSEVJR0hUID0gMzAwO1xyXG5cclxuY2xhc3MgR3JhZGllbnRJbmRpY2F0b3JOb2RlIGV4dGVuZHMgTm9kZSB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtCb3VuZHMyfSBsYXlvdXRCb3VuZHMgLSB0aGUgdmlzaWJsZSByZWdpb24gZm9yIHRoZSBzY3JlZW5cclxuICAgKiBAcGFyYW0ge1BhaW50U2NlbmV9IHNjZW5lIC0gdGhlIG1vZGVsXHJcbiAgICogQHBhcmFtIHtQcm9wZXJ0eS48Ym9vbGVhbj59IHJldmVhbFByb3BlcnR5IC0gdHJ1ZSBpZiB0aGUgZ3JhZGllbnQgdHJpYW5nbGUgaW5kaWNhdG9ycyByZXByZXNlbnRhdGlvbiBzaG91bGQgYmUgc2hvd25cclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gbm9kZSBvcHRpb25zXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIGxheW91dEJvdW5kcywgc2NlbmUsIHJldmVhbFByb3BlcnR5LCBvcHRpb25zICkge1xyXG5cclxuICAgIC8vIENyZWF0ZSB0aGUgZ3JhZGllbnRzXHJcbiAgICBjb25zdCBncmFkaWVudE5vZGVzID0gUGFpbnRDaG9pY2UuQ0hPSUNFUy5tYXAoIHBhaW50Q2hvaWNlID0+IHtcclxuICAgICAgY29uc3QgZ3JhZGllbnROb2RlID0gbmV3IFBhaW50Q2hvaWNlR3JhZGllbnROb2RlKCBHUkFESUVOVF9XSURUSCwgR1JBRElFTlRfSEVJR0hULCBwYWludENob2ljZSApO1xyXG4gICAgICBncmFkaWVudE5vZGUucGFpbnRDaG9pY2UgPSBwYWludENob2ljZTtcclxuICAgICAgcmV0dXJuIGdyYWRpZW50Tm9kZTtcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBUcmlhbmdsZSBpbmRpY2F0b3JzIG9uIHRoZSBsZWZ0L3JpZ2h0XHJcbiAgICBjb25zdCBsZWZ0SW5kaWNhdG9yID0gbmV3IFRyaWFuZ2xlTm9kZSggeyBwb2ludERpcmVjdGlvbjogJ3JpZ2h0JywgdHJpYW5nbGVIZWlnaHQ6IDEwLFxyXG4gICAgICB0cmlhbmdsZVdpZHRoOiAxNyB9ICk7XHJcbiAgICBjb25zdCByaWdodEluZGljYXRvciA9IG5ldyBUcmlhbmdsZU5vZGUoIHsgcG9pbnREaXJlY3Rpb246ICdsZWZ0JywgdHJpYW5nbGVIZWlnaHQ6IDEwLFxyXG4gICAgICB0cmlhbmdsZVdpZHRoOiAxNyB9ICk7XHJcblxyXG4gICAgLy8gU2hvdyBjb2xvcmVkL2dyYXkgYmFzZWQgb24gdGhlIHVzZXIgc2VsZWN0aW9uXHJcbiAgICBzY2VuZS5wYWludENob2ljZVByb3BlcnR5LmxpbmsoIHBhaW50Q2hvaWNlID0+IHtcclxuICAgICAgZ3JhZGllbnROb2Rlcy5mb3JFYWNoKCBncmFkaWVudE5vZGUgPT4ge1xyXG4gICAgICAgIGdyYWRpZW50Tm9kZS52aXNpYmxlID0gZ3JhZGllbnROb2RlLnBhaW50Q2hvaWNlID09PSBwYWludENob2ljZTtcclxuICAgICAgICBpZiAoIGdyYWRpZW50Tm9kZS52aXNpYmxlICkge1xyXG4gICAgICAgICAgbGVmdEluZGljYXRvci5yaWdodCA9IGdyYWRpZW50Tm9kZS5sZWZ0O1xyXG4gICAgICAgICAgcmlnaHRJbmRpY2F0b3IubGVmdCA9IGdyYWRpZW50Tm9kZS5yaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gKTtcclxuICAgIH0gKTtcclxuXHJcbiAgICBzdXBlcigge1xyXG4gICAgICBjaGlsZHJlbjogZ3JhZGllbnROb2Rlcy5jb25jYXQoIFtcclxuICAgICAgICBsZWZ0SW5kaWNhdG9yLFxyXG4gICAgICAgIHJpZ2h0SW5kaWNhdG9yXHJcbiAgICAgIF0gKVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXV4aWxpYXJ5IGZ1bmN0aW9uIHRoYXQgdXBkYXRlcyB0aGUgbGVmdCBvciByaWdodCB0cmlhbmdsZSBpbmRpY2F0b3Igbm9kZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge05vZGV9IGluZGljYXRvciAtIHRoZSBsZWZ0IG9yIHJpZ2h0IHRyaWFuZ2xlIG5vZGVcclxuICAgICAqIEBwYXJhbSB7U3Bsb3RjaH0gc3Bsb3RjaE1vZGVsIC0gdGhlIG1vZGVsXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25kaXRpb24gLSBhZGRpdGlvbmFsIGNvbmRpdGlvbiBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGluZGljYXRvciBub2RlIHNob3VsZCBiZSBzaG93bi5cclxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cclxuICAgICAqL1xyXG4gICAgY29uc3QgY3JlYXRlSW5kaWNhdG9yVXBkYXRlRnVuY3Rpb24gPSAoIGluZGljYXRvciwgc3Bsb3RjaE1vZGVsLCBjb25kaXRpb24gKSA9PiAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRvdGFsID0gc3Bsb3RjaE1vZGVsLnZpc2libGVMZWZ0Q29sb3JQcm9wZXJ0eS52YWx1ZSArIHNwbG90Y2hNb2RlbC52aXNpYmxlUmlnaHRDb2xvclByb3BlcnR5LnZhbHVlO1xyXG4gICAgICBpZiAoIHRvdGFsIDwgMWUtNiApIHtcclxuICAgICAgICBpbmRpY2F0b3IudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGluZGljYXRvci52aXNpYmxlID0gY29uZGl0aW9uKCkgJiYgcmV2ZWFsUHJvcGVydHkuZ2V0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByb3BvcnRpb24gPSBzcGxvdGNoTW9kZWwudmlzaWJsZVJpZ2h0Q29sb3JQcm9wZXJ0eS52YWx1ZSAvIHRvdGFsO1xyXG4gICAgICAgIGluZGljYXRvci5jZW50ZXJZID0gcHJvcG9ydGlvbiAqIEdSQURJRU5UX0hFSUdIVDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBVcGRhdGUgdGhlIGxlZnQgdHJpYW5nbGUgaW5kaWNhdG9yIG5vZGUgd2hlbiBpdHMgcGFyYW1ldGVycyBjaGFuZ2UuXHJcbiAgICBNdWx0aWxpbmsubXVsdGlsaW5rKCBbXHJcbiAgICAgIHNjZW5lLmxlZnRTcGxvdGNoLnZpc2libGVMZWZ0Q29sb3JQcm9wZXJ0eSxcclxuICAgICAgc2NlbmUubGVmdFNwbG90Y2gudmlzaWJsZVJpZ2h0Q29sb3JQcm9wZXJ0eSxcclxuICAgICAgcmV2ZWFsUHJvcGVydHlcclxuICAgIF0sIGNyZWF0ZUluZGljYXRvclVwZGF0ZUZ1bmN0aW9uKCBsZWZ0SW5kaWNhdG9yLCBzY2VuZS5sZWZ0U3Bsb3RjaCwgKCkgPT4gdHJ1ZSApICk7XHJcblxyXG4gICAgLy8gVXBkYXRlIHRoZSByaWdodCB0cmlhbmdsZSBpbmRpY2F0b3Igbm9kZSB3aGVuIGl0cyBwYXJhbWV0ZXJzIGNoYW5nZS5cclxuICAgIE11bHRpbGluay5tdWx0aWxpbmsoIFtcclxuICAgICAgc2NlbmUucmlnaHRTcGxvdGNoLnZpc2libGVMZWZ0Q29sb3JQcm9wZXJ0eSxcclxuICAgICAgc2NlbmUucmlnaHRTcGxvdGNoLnZpc2libGVSaWdodENvbG9yUHJvcGVydHksXHJcbiAgICAgIHNjZW5lLnNob3dCb3RoUHJvcGVydHksXHJcbiAgICAgIHJldmVhbFByb3BlcnR5XHJcbiAgICBdLCBjcmVhdGVJbmRpY2F0b3JVcGRhdGVGdW5jdGlvbiggcmlnaHRJbmRpY2F0b3IsIHNjZW5lLnJpZ2h0U3Bsb3RjaCwgKCkgPT4gc2NlbmUuc2hvd0JvdGhQcm9wZXJ0eS52YWx1ZSApICk7XHJcblxyXG4gICAgLy8gVXBkYXRlIHRoZSBmaWxscyBvZiB0aGUgdHJpYW5nbGUgaW5kaWNhdG9yIG5vZGVzXHJcbiAgICBNdWx0aWxpbmsubXVsdGlsaW5rKCBbXHJcbiAgICAgIHNjZW5lLmxlZnRTcGxvdGNoLnZpc2libGVMZWZ0Q29sb3JQcm9wZXJ0eSxcclxuICAgICAgc2NlbmUubGVmdFNwbG90Y2gudmlzaWJsZVJpZ2h0Q29sb3JQcm9wZXJ0eSxcclxuICAgICAgc2NlbmUucmlnaHRTcGxvdGNoLnZpc2libGVMZWZ0Q29sb3JQcm9wZXJ0eSxcclxuICAgICAgc2NlbmUucmlnaHRTcGxvdGNoLnZpc2libGVSaWdodENvbG9yUHJvcGVydHksXHJcbiAgICAgIHNjZW5lLnNob3dCb3RoUHJvcGVydHlcclxuICAgIF0sICgpID0+IHtcclxuICAgICAgY29uc3QgZmlsbCA9ICggc2NlbmUuYXJlVmlzdWFsUmF0aW9zRXF1aXZhbGVudCgpICYmIHNjZW5lLnNob3dCb3RoUHJvcGVydHkudmFsdWUgKSA/ICdibGFjaycgOiBudWxsO1xyXG4gICAgICByaWdodEluZGljYXRvci5maWxsID0gZmlsbDtcclxuICAgICAgbGVmdEluZGljYXRvci5maWxsID0gZmlsbDtcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBQb3NpdGlvbiB0aGUgbm9kZVxyXG4gICAgc2NlbmUuc2hvd0JvdGhQcm9wZXJ0eS5saW5rKCBzaG93Qm90aCA9PiB7XHJcbiAgICAgIHRoaXMuY2VudGVyWCA9IHNob3dCb3RoID8gbGF5b3V0Qm91bmRzLmNlbnRlclggOiBsYXlvdXRCb3VuZHMucmlnaHQgKiAwLjc7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgdGhpcy5tdXRhdGUoIG9wdGlvbnMgKTtcclxuICB9XHJcbn1cclxuXHJcbnByb3BvcnRpb25QbGF5Z3JvdW5kLnJlZ2lzdGVyKCAnR3JhZGllbnRJbmRpY2F0b3JOb2RlJywgR3JhZGllbnRJbmRpY2F0b3JOb2RlICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHcmFkaWVudEluZGljYXRvck5vZGU7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsU0FBUyxNQUFNLHFDQUFxQztBQUMzRCxPQUFPQyxZQUFZLE1BQU0sZ0RBQWdEO0FBQ3pFLFNBQVNDLElBQUksUUFBUSxzQ0FBc0M7QUFDM0QsT0FBT0Msb0JBQW9CLE1BQU0sa0NBQWtDO0FBQ25FLE9BQU9DLFdBQVcsTUFBTSxrQ0FBa0M7QUFDMUQsT0FBT0MsdUJBQXVCLE1BQU0sOEJBQThCOztBQUVsRTtBQUNBLE1BQU1DLGNBQWMsR0FBRyxFQUFFO0FBQ3pCLE1BQU1DLGVBQWUsR0FBRyxHQUFHO0FBRTNCLE1BQU1DLHFCQUFxQixTQUFTTixJQUFJLENBQUM7RUFDdkM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0VPLFdBQVdBLENBQUVDLFlBQVksRUFBRUMsS0FBSyxFQUFFQyxjQUFjLEVBQUVDLE9BQU8sRUFBRztJQUUxRDtJQUNBLE1BQU1DLGFBQWEsR0FBR1YsV0FBVyxDQUFDVyxPQUFPLENBQUNDLEdBQUcsQ0FBRUMsV0FBVyxJQUFJO01BQzVELE1B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