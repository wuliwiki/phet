// Copyright 2014-2022, University of Colorado Boulder

/**
 * FlashlightNode - for use inside icons for both screens
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import { Shape } from '../../../../kite/js/imports.js';
import { Image, Node, Path } from '../../../../scenery/js/imports.js';
import flashlightIcon_png from '../../../images/flashlightIcon_png.js';
import colorVision from '../../colorVision.js';

// constants
const SCALE = 0.75;
class FlashlightNode extends Node {
  /**
   * @param {number} rotation
   * @param {string} color - an rgb string or other legitimate color string
   * @param {Object} [options]
   */
  constructor(rotation, color, options) {
    super({
      rotation: rotation
    });

    // draw the flashlight image, with the bulb pointed toward the left
    const flashlightNode = new Image(flashlightIcon_png, {
      scale: SCALE
    });

    // values used for drawing the beam shape
    const startX = flashlightNode.left + 15; // start drawing the beam to the left of the flashlight
    const centerY = flashlightNode.centerY + 0.5; // centerY of beam and flashlight
    const dx = 170 * SCALE; // length of the beam in the x direction
    const dy = 25 * SCALE; // height of the small end of the beam (the large end is 2 * dy)

    // draw a trapezoidal beam shape, just to the left of the flashlight image
    const beamShape = new Shape().moveTo(startX, centerY + dy).lineTo(startX - dx, centerY + dy * 2).lineTo(startX - dx, centerY - dy * 2).lineTo(startX, centerY - dy).close();
    this.addChild(new Path(beamShape, {
      fill: color
    }));
    this.addChild(flashlightNode);
    this.mutate(options);
  }
}
colorVision.register('FlashlightNode', FlashlightNode);
export default FlashlightNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTaGFwZSIsIkltYWdlIiwiTm9kZSIsIlBhdGgiLCJmbGFzaGxpZ2h0SWNvbl9wbmciLCJjb2xvclZpc2lvbiIsIlNDQUxFIiwiRmxhc2hsaWdodE5vZGUiLCJjb25zdHJ1Y3RvciIsInJvdGF0aW9uIiwiY29sb3IiLCJvcHRpb25zIiwiZmxhc2hsaWdodE5vZGUiLCJzY2FsZSIsInN0YXJ0WCIsImxlZnQiLCJjZW50ZXJZIiwiZHgiLCJkeSIsImJlYW1TaGFwZSIsIm1vdmVUbyIsImxpbmVUbyIsImNsb3NlIiwiYWRkQ2hpbGQiLCJmaWxsIiwibXV0YXRlIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJGbGFzaGxpZ2h0Tm9kZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNC0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBGbGFzaGxpZ2h0Tm9kZSAtIGZvciB1c2UgaW5zaWRlIGljb25zIGZvciBib3RoIHNjcmVlbnNcclxuICpcclxuICogQGF1dGhvciBBYXJvbiBEYXZpcyAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgeyBTaGFwZSB9IGZyb20gJy4uLy4uLy4uLy4uL2tpdGUvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCB7IEltYWdlLCBOb2RlLCBQYXRoIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IGZsYXNobGlnaHRJY29uX3BuZyBmcm9tICcuLi8uLi8uLi9pbWFnZXMvZmxhc2hsaWdodEljb25fcG5nLmpzJztcclxuaW1wb3J0IGNvbG9yVmlzaW9uIGZyb20gJy4uLy4uL2NvbG9yVmlzaW9uLmpzJztcclxuXHJcbi8vIGNvbnN0YW50c1xyXG5jb25zdCBTQ0FMRSA9IDAuNzU7XHJcblxyXG5jbGFzcyBGbGFzaGxpZ2h0Tm9kZSBleHRlbmRzIE5vZGUge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge251bWJlcn0gcm90YXRpb25cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3IgLSBhbiByZ2Igc3RyaW5nIG9yIG90aGVyIGxlZ2l0aW1hdGUgY29sb3Igc3RyaW5nXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCByb3RhdGlvbiwgY29sb3IsIG9wdGlvbnMgKSB7XHJcblxyXG4gICAgc3VwZXIoIHsgcm90YXRpb246IHJvdGF0aW9uIH0gKTtcclxuXHJcbiAgICAvLyBkcmF3IHRoZSBmbGFzaGxpZ2h0IGltYWdlLCB3aXRoIHRoZSBidWxiIHBvaW50ZWQgdG93YXJkIHRoZSBsZWZ0XHJcbiAgICBjb25zdCBmbGFzaGxpZ2h0Tm9kZSA9IG5ldyBJbWFnZSggZmxhc2hsaWdodEljb25fcG5nLCB7IHNjYWxlOiBTQ0FMRSB9ICk7XHJcblxyXG4gICAgLy8gdmFsdWVzIHVzZWQgZm9yIGRyYXdpbmcgdGhlIGJlYW0gc2hhcGVcclxuICAgIGNvbnN0IHN0YXJ0WCA9IGZsYXNobGlnaHROb2RlLmxlZnQgKyAxNTsgICAgICAgLy8gc3RhcnQgZHJhd2luZyB0aGUgYmVhbSB0byB0aGUgbGVmdCBvZiB0aGUgZmxhc2hsaWdodFxyXG4gICAgY29uc3QgY2VudGVyWSA9IGZsYXNobGlnaHROb2RlLmNlbnRlclkgKyAwLjU7ICAvLyBjZW50ZXJZIG9mIGJlYW0gYW5kIGZsYXNobGlnaHRcclxuICAgIGNvbnN0IGR4ID0gMTcwICogU0NBTEU7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGVuZ3RoIG9mIHRoZSBiZWFtIGluIHRoZSB4IGRpcmVjdGlvblxyXG4gICAgY29uc3QgZHkgPSAyNSAqIFNDQUxFOyAgICAgICAgICAgICAgICAgICAgICAgICAvLyBoZWlnaHQgb2YgdGhlIHNtYWxsIGVuZCBvZiB0aGUgYmVhbSAodGhlIGxhcmdlIGVuZCBpcyAyICogZHkpXHJcblxyXG4gICAgLy8gZHJhdyBhIHRyYXBlem9pZGFsIGJlYW0gc2hhcGUsIGp1c3QgdG8gdGhlIGxlZnQgb2YgdGhlIGZsYXNobGlnaHQgaW1hZ2VcclxuICAgIGNvbnN0IGJlYW1TaGFwZSA9IG5ldyBTaGFwZSgpXHJcbiAgICAgIC5tb3ZlVG8oIHN0YXJ0WCwgY2VudGVyWSArIGR5IClcclxuICAgICAgLmxpbmVUbyggc3RhcnRYIC0gZHgsIGNlbnRlclkgKyBkeSAqIDIgKVxyXG4gICAgICAubGluZVRvKCBzdGFydFggLSBkeCwgY2VudGVyWSAtIGR5ICogMiApXHJcbiAgICAgIC5saW5lVG8oIHN0YXJ0WCwgY2VudGVyWSAtIGR5IClcclxuICAgICAgLmNsb3NlKCk7XHJcblxyXG4gICAgdGhpcy5hZGRDaGlsZCggbmV3IFBhdGgoIGJlYW1TaGFwZSwgeyBmaWxsOiBjb2xvciB9ICkgKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIGZsYXNobGlnaHROb2RlICk7XHJcblxyXG4gICAgdGhpcy5tdXRhdGUoIG9wdGlvbnMgKTtcclxuICB9XHJcbn1cclxuXHJcbmNvbG9yVmlzaW9uLnJlZ2lzdGVyKCAnRmxhc2hsaWdodE5vZGUnLCBGbGFzaGxpZ2h0Tm9kZSApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmxhc2hsaWdodE5vZGU7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLEtBQUssUUFBUSxnQ0FBZ0M7QUFDdEQsU0FBU0MsS0FBSyxFQUFFQyxJQUFJLEVBQUVDLElBQUksUUFBUSxtQ0FBbUM7QUFDckUsT0FBT0Msa0JBQWtCLE1BQU0sdUNBQXVDO0FBQ3RFLE9BQU9DLFdBQVcsTUFBTSxzQkFBc0I7O0FBRTlDO0FBQ0EsTUFBTUMsS0FBSyxHQUFHLElBQUk7QUFFbEIsTUFBTUMsY0FBYyxTQUFTTCxJQUFJLENBQUM7RUFFaEM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUNFTSxXQUFXQSxDQUFFQyxRQUFRLEVBQUVDLEtBQUssRUFBRUMsT0FBTyxFQUFHO0lBRXRDLEtBQUssQ0FBRTtNQUFFRixRQUFRLEVBQUVBO0lBQVMsQ0FBRSxDQUFDOztJQUUvQjtJQUNBLE1BQU1HLGNBQWMsR0FBRyxJQUFJWCxLQUFLLENBQUVHLGtCQUFrQixFQUFFO01BQUVTLEtBQUssRUFBRVA7SUFBTSxDQUFFLENBQUM7O0lBRXhFO0lBQ0EsTUFBTVEsTUFBTSxHQUFHRixjQUFjLENBQUNHLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBTztJQUMvQyxNQUFNQyxPQUFPLEdBQUdKLGNBQWMsQ0FBQ0ksT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFFO0lBQy9DLE1BQU1DLEVBQUUsR0FBRyxHQUFHLEdBQUdYLEtBQUssQ0FBQyxDQUF3QjtJQUMvQyxNQUFNWSxFQUFFLEdBQUcsRUFBRSxHQUFHWixLQUFLLENBQUMsQ0FBeUI7O0lBRS9DO0lBQ0EsTUFBTWEsU0FBUyxHQUFHLElBQUluQixLQUFLLENBQUMsQ0FBQyxDQUMxQm9CLE1BQU0sQ0FBRU4sTUFBTSxFQUFFRSxPQUFPLEdBQUdFLEVBQUcsQ0FBQyxDQUM5QkcsTUFBTSxDQUFFUCxNQUFNLEdBQUdHLEVBQUUsRUFBRUQsT0FBTyxHQUFHRSxFQUFFLEdBQUcsQ0FBRSxDQUFDLENBQ3ZDRyxNQUFNLENBQUVQLE1BQU0sR0FBR0csRUFBRSxFQUFFRCxPQUFPLEdBQUdFLEVBQUUsR0FBRyxDQUFFLENBQUMsQ0FDdkNHLE1BQU0sQ0FBRVAsTUFBTSxFQUFFRSxPQUFPLEdBQUdFLEVBQUcsQ0FBQyxDQUM5QkksS0FBSyxDQUFDLENBQUM7SUFFVixJQUFJLENBQUNDLFFBQVEsQ0FBRSxJQUFJcEIsSUFBSSxDQUFFZ0IsU0FBUyxFQUFFO01BQUVLLElBQUksRUFBRWQ7SUFBTSxDQUFFLENBQUUsQ0FBQztJQUN2RCxJQUFJLENBQUNhLFFBQVEsQ0FBRVgsY0FBZSxDQUFDO0lBRS9CLElBQUksQ0FBQ2EsTUFBTSxDQUFFZCxPQUFRLENBQUM7RUFDeEI7QUFDRjtBQUVBTixXQUFXLENBQUNxQixRQUFRLENBQUUsZ0JBQWdCLEVBQUVuQixjQUFlLENBQUM7QUFFeEQsZUFBZUEsY0FBYyJ9