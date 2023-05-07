// Copyright 2017-2022, University of Colorado Boulder

/**
 * icon node for the 'Vectors' screen
 * @author Andrea Lin (PhET Interactive Simulations)
 */

import Screen from '../../../../joist/js/Screen.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import { Circle, LinearGradient, Rectangle } from '../../../../scenery/js/imports.js';
import projectileMotion from '../../projectileMotion.js';

// constants
const SCREEN_ICON_SIZE = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE;
const NAV_ICON_SIZE = Screen.MINIMUM_NAVBAR_ICON_SIZE;
const VELOCITY_ARROW_FILL = 'rgb( 50, 255, 50 )';
const ACCELERATION_ARROW_FILL = 'rgb( 255, 255, 50 )';
const ARROW_TAIL_WIDTH = 6;
const ARROW_HEAD_WIDTH = 12;
const ARROW_HEAD_HEIGHT = 12;
class VectorsIconNode extends Rectangle {
  /**
   * @param {string} type - 'nav' or 'screen'
   */
  constructor(type) {
    super(0, 0, 0, 0);
    assert && assert(type === 'nav' || type === 'screen', `invalid value for type: ${type}`);
    let width;
    let height;
    let projectileX;
    let projectileY;
    let projectile;
    let arrowScale;
    let velocityArrow;
    let accelerationArrow;

    // the nav bar icon has larger projectile object and vectors than those of the home screen icon
    if (type === 'nav') {
      width = NAV_ICON_SIZE.width;
      height = NAV_ICON_SIZE.height;
      projectileX = width * 0.4;
      projectileY = height / 2;
      projectile = new Circle(height / 4, {
        x: projectileX,
        y: projectileY,
        fill: 'black'
      });
      this.addChild(projectile);
      arrowScale = 1.5;
      velocityArrow = new ArrowNode(projectileX, projectileY, width * 0.7, height * 0.1, {
        pickable: false,
        fill: VELOCITY_ARROW_FILL,
        tailWidth: ARROW_TAIL_WIDTH * arrowScale,
        headWidth: ARROW_HEAD_WIDTH * arrowScale,
        headHeight: ARROW_HEAD_HEIGHT * arrowScale
      });
      this.addChild(velocityArrow);
      accelerationArrow = new ArrowNode(projectileX, projectileY, projectileX, height * 0.9, {
        pickable: false,
        fill: ACCELERATION_ARROW_FILL,
        tailWidth: ARROW_TAIL_WIDTH * arrowScale,
        headWidth: ARROW_HEAD_WIDTH * arrowScale,
        headHeight: ARROW_HEAD_HEIGHT * arrowScale
      });
      this.addChild(accelerationArrow);
    } else {
      width = SCREEN_ICON_SIZE.width;
      height = SCREEN_ICON_SIZE.height;
      projectileX = width * 0.4;
      projectileY = height / 2;
      projectile = new Circle(height / 6, {
        x: projectileX,
        y: projectileY,
        fill: 'black'
      });
      this.addChild(projectile);
      arrowScale = 4;
      velocityArrow = new ArrowNode(projectileX, projectileY, width * 0.7, height * 0.2, {
        pickable: false,
        fill: VELOCITY_ARROW_FILL,
        tailWidth: ARROW_TAIL_WIDTH * arrowScale,
        headWidth: ARROW_HEAD_WIDTH * arrowScale,
        headHeight: ARROW_HEAD_HEIGHT * arrowScale
      });
      this.addChild(velocityArrow);
      accelerationArrow = new ArrowNode(projectileX, projectileY, projectileX, height * 0.85, {
        pickable: false,
        fill: ACCELERATION_ARROW_FILL,
        tailWidth: ARROW_TAIL_WIDTH * arrowScale,
        headWidth: ARROW_HEAD_WIDTH * arrowScale,
        headHeight: ARROW_HEAD_HEIGHT * arrowScale
      });
      this.addChild(accelerationArrow);
    }

    // create the background
    const backgroundFill = new LinearGradient(0, 0, 0, height).addColorStop(0, '#02ace4').addColorStop(1, '#cfecfc');
    this.mutate({
      fill: backgroundFill
    });
    this.setRectWidth(width);
    this.setRectHeight(height);
  }
}
projectileMotion.register('VectorsIconNode', VectorsIconNode);
export default VectorsIconNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTY3JlZW4iLCJBcnJvd05vZGUiLCJDaXJjbGUiLCJMaW5lYXJHcmFkaWVudCIsIlJlY3RhbmdsZSIsInByb2plY3RpbGVNb3Rpb24iLCJTQ1JFRU5fSUNPTl9TSVpFIiwiTUlOSU1VTV9IT01FX1NDUkVFTl9JQ09OX1NJWkUiLCJOQVZfSUNPTl9TSVpFIiwiTUlOSU1VTV9OQVZCQVJfSUNPTl9TSVpFIiwiVkVMT0NJVFlfQVJST1dfRklMTCIsIkFDQ0VMRVJBVElPTl9BUlJPV19GSUxMIiwiQVJST1dfVEFJTF9XSURUSCIsIkFSUk9XX0hFQURfV0lEVEgiLCJBUlJPV19IRUFEX0hFSUdIVCIsIlZlY3RvcnNJY29uTm9kZSIsImNvbnN0cnVjdG9yIiwidHlwZSIsImFzc2VydCIsIndpZHRoIiwiaGVpZ2h0IiwicHJvamVjdGlsZVgiLCJwcm9qZWN0aWxlWSIsInByb2plY3RpbGUiLCJhcnJvd1NjYWxlIiwidmVsb2NpdHlBcnJvdyIsImFjY2VsZXJhdGlvbkFycm93IiwieCIsInkiLCJmaWxsIiwiYWRkQ2hpbGQiLCJwaWNrYWJsZSIsInRhaWxXaWR0aCIsImhlYWRXaWR0aCIsImhlYWRIZWlnaHQiLCJiYWNrZ3JvdW5kRmlsbCIsImFkZENvbG9yU3RvcCIsIm11dGF0ZSIsInNldFJlY3RXaWR0aCIsInNldFJlY3RIZWlnaHQiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlZlY3RvcnNJY29uTm9kZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNy0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBpY29uIG5vZGUgZm9yIHRoZSAnVmVjdG9ycycgc2NyZWVuXHJcbiAqIEBhdXRob3IgQW5kcmVhIExpbiAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgU2NyZWVuIGZyb20gJy4uLy4uLy4uLy4uL2pvaXN0L2pzL1NjcmVlbi5qcyc7XHJcbmltcG9ydCBBcnJvd05vZGUgZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL0Fycm93Tm9kZS5qcyc7XHJcbmltcG9ydCB7IENpcmNsZSwgTGluZWFyR3JhZGllbnQsIFJlY3RhbmdsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBwcm9qZWN0aWxlTW90aW9uIGZyb20gJy4uLy4uL3Byb2plY3RpbGVNb3Rpb24uanMnO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IFNDUkVFTl9JQ09OX1NJWkUgPSBTY3JlZW4uTUlOSU1VTV9IT01FX1NDUkVFTl9JQ09OX1NJWkU7XHJcbmNvbnN0IE5BVl9JQ09OX1NJWkUgPSBTY3JlZW4uTUlOSU1VTV9OQVZCQVJfSUNPTl9TSVpFO1xyXG5jb25zdCBWRUxPQ0lUWV9BUlJPV19GSUxMID0gJ3JnYiggNTAsIDI1NSwgNTAgKSc7XHJcbmNvbnN0IEFDQ0VMRVJBVElPTl9BUlJPV19GSUxMID0gJ3JnYiggMjU1LCAyNTUsIDUwICknO1xyXG5jb25zdCBBUlJPV19UQUlMX1dJRFRIID0gNjtcclxuY29uc3QgQVJST1dfSEVBRF9XSURUSCA9IDEyO1xyXG5jb25zdCBBUlJPV19IRUFEX0hFSUdIVCA9IDEyO1xyXG5cclxuY2xhc3MgVmVjdG9yc0ljb25Ob2RlIGV4dGVuZHMgUmVjdGFuZ2xlIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtICduYXYnIG9yICdzY3JlZW4nXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIHR5cGUgKSB7XHJcblxyXG4gICAgc3VwZXIoIDAsIDAsIDAsIDAgKTtcclxuXHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCB0eXBlID09PSAnbmF2JyB8fCB0eXBlID09PSAnc2NyZWVuJywgYGludmFsaWQgdmFsdWUgZm9yIHR5cGU6ICR7dHlwZX1gICk7XHJcblxyXG4gICAgbGV0IHdpZHRoO1xyXG4gICAgbGV0IGhlaWdodDtcclxuICAgIGxldCBwcm9qZWN0aWxlWDtcclxuICAgIGxldCBwcm9qZWN0aWxlWTtcclxuICAgIGxldCBwcm9qZWN0aWxlO1xyXG4gICAgbGV0IGFycm93U2NhbGU7XHJcbiAgICBsZXQgdmVsb2NpdHlBcnJvdztcclxuICAgIGxldCBhY2NlbGVyYXRpb25BcnJvdztcclxuXHJcbiAgICAvLyB0aGUgbmF2IGJhciBpY29uIGhhcyBsYXJnZXIgcHJvamVjdGlsZSBvYmplY3QgYW5kIHZlY3RvcnMgdGhhbiB0aG9zZSBvZiB0aGUgaG9tZSBzY3JlZW4gaWNvblxyXG4gICAgaWYgKCB0eXBlID09PSAnbmF2JyApIHtcclxuICAgICAgd2lkdGggPSBOQVZfSUNPTl9TSVpFLndpZHRoO1xyXG4gICAgICBoZWlnaHQgPSBOQVZfSUNPTl9TSVpFLmhlaWdodDtcclxuICAgICAgcHJvamVjdGlsZVggPSB3aWR0aCAqIDAuNDtcclxuICAgICAgcHJvamVjdGlsZVkgPSBoZWlnaHQgLyAyO1xyXG4gICAgICBwcm9qZWN0aWxlID0gbmV3IENpcmNsZSggaGVpZ2h0IC8gNCwgeyB4OiBwcm9qZWN0aWxlWCwgeTogcHJvamVjdGlsZVksIGZpbGw6ICdibGFjaycgfSApO1xyXG4gICAgICB0aGlzLmFkZENoaWxkKCBwcm9qZWN0aWxlICk7XHJcbiAgICAgIGFycm93U2NhbGUgPSAxLjU7XHJcbiAgICAgIHZlbG9jaXR5QXJyb3cgPSBuZXcgQXJyb3dOb2RlKCBwcm9qZWN0aWxlWCwgcHJvamVjdGlsZVksIHdpZHRoICogMC43LCBoZWlnaHQgKiAwLjEsIHtcclxuICAgICAgICBwaWNrYWJsZTogZmFsc2UsXHJcbiAgICAgICAgZmlsbDogVkVMT0NJVFlfQVJST1dfRklMTCxcclxuICAgICAgICB0YWlsV2lkdGg6IEFSUk9XX1RBSUxfV0lEVEggKiBhcnJvd1NjYWxlLFxyXG4gICAgICAgIGhlYWRXaWR0aDogQVJST1dfSEVBRF9XSURUSCAqIGFycm93U2NhbGUsXHJcbiAgICAgICAgaGVhZEhlaWdodDogQVJST1dfSEVBRF9IRUlHSFQgKiBhcnJvd1NjYWxlXHJcbiAgICAgIH0gKTtcclxuICAgICAgdGhpcy5hZGRDaGlsZCggdmVsb2NpdHlBcnJvdyApO1xyXG4gICAgICBhY2NlbGVyYXRpb25BcnJvdyA9IG5ldyBBcnJvd05vZGUoIHByb2plY3RpbGVYLCBwcm9qZWN0aWxlWSwgcHJvamVjdGlsZVgsIGhlaWdodCAqIDAuOSwge1xyXG4gICAgICAgIHBpY2thYmxlOiBmYWxzZSxcclxuICAgICAgICBmaWxsOiBBQ0NFTEVSQVRJT05fQVJST1dfRklMTCxcclxuICAgICAgICB0YWlsV2lkdGg6IEFSUk9XX1RBSUxfV0lEVEggKiBhcnJvd1NjYWxlLFxyXG4gICAgICAgIGhlYWRXaWR0aDogQVJST1dfSEVBRF9XSURUSCAqIGFycm93U2NhbGUsXHJcbiAgICAgICAgaGVhZEhlaWdodDogQVJST1dfSEVBRF9IRUlHSFQgKiBhcnJvd1NjYWxlXHJcbiAgICAgIH0gKTtcclxuICAgICAgdGhpcy5hZGRDaGlsZCggYWNjZWxlcmF0aW9uQXJyb3cgKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB3aWR0aCA9IFNDUkVFTl9JQ09OX1NJWkUud2lkdGg7XHJcbiAgICAgIGhlaWdodCA9IFNDUkVFTl9JQ09OX1NJWkUuaGVpZ2h0O1xyXG4gICAgICBwcm9qZWN0aWxlWCA9IHdpZHRoICogMC40O1xyXG4gICAgICBwcm9qZWN0aWxlWSA9IGhlaWdodCAvIDI7XHJcbiAgICAgIHByb2plY3RpbGUgPSBuZXcgQ2lyY2xlKCBoZWlnaHQgLyA2LCB7IHg6IHByb2plY3RpbGVYLCB5OiBwcm9qZWN0aWxlWSwgZmlsbDogJ2JsYWNrJyB9ICk7XHJcbiAgICAgIHRoaXMuYWRkQ2hpbGQoIHByb2plY3RpbGUgKTtcclxuICAgICAgYXJyb3dTY2FsZSA9IDQ7XHJcbiAgICAgIHZlbG9jaXR5QXJyb3cgPSBuZXcgQXJyb3dOb2RlKCBwcm9qZWN0aWxlWCwgcHJvamVjdGlsZVksIHdpZHRoICogMC43LCBoZWlnaHQgKiAwLjIsIHtcclxuICAgICAgICBwaWNrYWJsZTogZmFsc2UsXHJcbiAgICAgICAgZmlsbDogVkVMT0NJVFlfQVJST1dfRklMTCxcclxuICAgICAgICB0YWlsV2lkdGg6IEFSUk9XX1RBSUxfV0lEVEggKiBhcnJvd1NjYWxlLFxyXG4gICAgICAgIGhlYWRXaWR0aDogQVJST1dfSEVBRF9XSURUSCAqIGFycm93U2NhbGUsXHJcbiAgICAgICAgaGVhZEhlaWdodDogQVJST1dfSEVBRF9IRUlHSFQgKiBhcnJvd1NjYWxlXHJcbiAgICAgIH0gKTtcclxuICAgICAgdGhpcy5hZGRDaGlsZCggdmVsb2NpdHlBcnJvdyApO1xyXG4gICAgICBhY2NlbGVyYXRpb25BcnJvdyA9IG5ldyBBcnJvd05vZGUoIHByb2plY3RpbGVYLCBwcm9qZWN0aWxlWSwgcHJvamVjdGlsZVgsIGhlaWdodCAqIDAuODUsIHtcclxuICAgICAgICBwaWNrYWJsZTogZmFsc2UsXHJcbiAgICAgICAgZmlsbDogQUNDRUxFUkFUSU9OX0FSUk9XX0ZJTEwsXHJcbiAgICAgICAgdGFpbFdpZHRoOiBBUlJPV19UQUlMX1dJRFRIICogYXJyb3dTY2FsZSxcclxuICAgICAgICBoZWFkV2lkdGg6IEFSUk9XX0hFQURfV0lEVEggKiBhcnJvd1NjYWxlLFxyXG4gICAgICAgIGhlYWRIZWlnaHQ6IEFSUk9XX0hFQURfSEVJR0hUICogYXJyb3dTY2FsZVxyXG4gICAgICB9ICk7XHJcbiAgICAgIHRoaXMuYWRkQ2hpbGQoIGFjY2VsZXJhdGlvbkFycm93ICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3JlYXRlIHRoZSBiYWNrZ3JvdW5kXHJcbiAgICBjb25zdCBiYWNrZ3JvdW5kRmlsbCA9IG5ldyBMaW5lYXJHcmFkaWVudCggMCwgMCwgMCwgaGVpZ2h0ICkuYWRkQ29sb3JTdG9wKCAwLCAnIzAyYWNlNCcgKS5hZGRDb2xvclN0b3AoIDEsICcjY2ZlY2ZjJyApO1xyXG4gICAgdGhpcy5tdXRhdGUoIHsgZmlsbDogYmFja2dyb3VuZEZpbGwgfSApO1xyXG4gICAgdGhpcy5zZXRSZWN0V2lkdGgoIHdpZHRoICk7XHJcbiAgICB0aGlzLnNldFJlY3RIZWlnaHQoIGhlaWdodCApO1xyXG4gIH1cclxufVxyXG5cclxucHJvamVjdGlsZU1vdGlvbi5yZWdpc3RlciggJ1ZlY3RvcnNJY29uTm9kZScsIFZlY3RvcnNJY29uTm9kZSApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmVjdG9yc0ljb25Ob2RlOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsTUFBTSxNQUFNLGdDQUFnQztBQUNuRCxPQUFPQyxTQUFTLE1BQU0sMENBQTBDO0FBQ2hFLFNBQVNDLE1BQU0sRUFBRUMsY0FBYyxFQUFFQyxTQUFTLFFBQVEsbUNBQW1DO0FBQ3JGLE9BQU9DLGdCQUFnQixNQUFNLDJCQUEyQjs7QUFFeEQ7QUFDQSxNQUFNQyxnQkFBZ0IsR0FBR04sTUFBTSxDQUFDTyw2QkFBNkI7QUFDN0QsTUFBTUMsYUFBYSxHQUFHUixNQUFNLENBQUNTLHdCQUF3QjtBQUNyRCxNQUFNQyxtQkFBbUIsR0FBRyxvQkFBb0I7QUFDaEQsTUFBTUMsdUJBQXVCLEdBQUcscUJBQXFCO0FBQ3JELE1BQU1DLGdCQUFnQixHQUFHLENBQUM7QUFDMUIsTUFBTUMsZ0JBQWdCLEdBQUcsRUFBRTtBQUMzQixNQUFNQyxpQkFBaUIsR0FBRyxFQUFFO0FBRTVCLE1BQU1DLGVBQWUsU0FBU1gsU0FBUyxDQUFDO0VBQ3RDO0FBQ0Y7QUFDQTtFQUNFWSxXQUFXQSxDQUFFQyxJQUFJLEVBQUc7SUFFbEIsS0FBSyxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUUsQ0FBQztJQUVuQkMsTUFBTSxJQUFJQSxNQUFNLENBQUVELElBQUksS0FBSyxLQUFLLElBQUlBLElBQUksS0FBSyxRQUFRLEVBQUcsMkJBQTBCQSxJQUFLLEVBQUUsQ0FBQztJQUUxRixJQUFJRSxLQUFLO0lBQ1QsSUFBSUMsTUFBTTtJQUNWLElBQUlDLFdBQVc7SUFDZixJQUFJQyxXQUFXO0lBQ2YsSUFBSUMsVUFBVTtJQUNk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