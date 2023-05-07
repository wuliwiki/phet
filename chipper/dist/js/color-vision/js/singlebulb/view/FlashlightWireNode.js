// Copyright 2014-2022, University of Colorado Boulder

/**
 * FlashlightWireNode forms the wire from the flashlight to the bulb color slider.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import { Shape } from '../../../../kite/js/imports.js';
import { Path } from '../../../../scenery/js/imports.js';
import colorVision from '../../colorVision.js';
class FlashlightWireNode extends Path {
  /**
   * @param {Vector2} start
   * @param {Vector2} end
   * @param {number} width the distance the wire extends beyond the flashlight before turning up to the slider
   */
  constructor(start, end, width) {
    const radius = 5;
    const wire = new Shape().moveTo(start.x, start.y).lineTo(start.x + width - radius, start.y).arc(start.x + width - radius, start.y - radius, radius, Math.PI / 2, 0, true).lineTo(start.x + width, end.y + radius).arc(start.x + width - radius, end.y + radius, radius, 0, 3 * Math.PI / 2, true).lineTo(end.x, end.y);
    super(wire, {
      lineWidth: 5,
      stroke: '#999999',
      lineJoin: 'round'
    });
  }
}
colorVision.register('FlashlightWireNode', FlashlightWireNode);
export default FlashlightWireNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTaGFwZSIsIlBhdGgiLCJjb2xvclZpc2lvbiIsIkZsYXNobGlnaHRXaXJlTm9kZSIsImNvbnN0cnVjdG9yIiwic3RhcnQiLCJlbmQiLCJ3aWR0aCIsInJhZGl1cyIsIndpcmUiLCJtb3ZlVG8iLCJ4IiwieSIsImxpbmVUbyIsImFyYyIsIk1hdGgiLCJQSSIsImxpbmVXaWR0aCIsInN0cm9rZSIsImxpbmVKb2luIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJGbGFzaGxpZ2h0V2lyZU5vZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTQtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogRmxhc2hsaWdodFdpcmVOb2RlIGZvcm1zIHRoZSB3aXJlIGZyb20gdGhlIGZsYXNobGlnaHQgdG8gdGhlIGJ1bGIgY29sb3Igc2xpZGVyLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEFhcm9uIERhdmlzIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IFNoYXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4va2l0ZS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IHsgUGF0aCB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBjb2xvclZpc2lvbiBmcm9tICcuLi8uLi9jb2xvclZpc2lvbi5qcyc7XHJcblxyXG5jbGFzcyBGbGFzaGxpZ2h0V2lyZU5vZGUgZXh0ZW5kcyBQYXRoIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtWZWN0b3IyfSBzdGFydFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yMn0gZW5kXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIHRoZSBkaXN0YW5jZSB0aGUgd2lyZSBleHRlbmRzIGJleW9uZCB0aGUgZmxhc2hsaWdodCBiZWZvcmUgdHVybmluZyB1cCB0byB0aGUgc2xpZGVyXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIHN0YXJ0LCBlbmQsIHdpZHRoICkge1xyXG5cclxuICAgIGNvbnN0IHJhZGl1cyA9IDU7XHJcbiAgICBjb25zdCB3aXJlID0gbmV3IFNoYXBlKClcclxuICAgICAgLm1vdmVUbyggc3RhcnQueCwgc3RhcnQueSApXHJcbiAgICAgIC5saW5lVG8oIHN0YXJ0LnggKyB3aWR0aCAtIHJhZGl1cywgc3RhcnQueSApXHJcbiAgICAgIC5hcmMoIHN0YXJ0LnggKyB3aWR0aCAtIHJhZGl1cywgc3RhcnQueSAtIHJhZGl1cywgcmFkaXVzLCBNYXRoLlBJIC8gMiwgMCwgdHJ1ZSApXHJcbiAgICAgIC5saW5lVG8oIHN0YXJ0LnggKyB3aWR0aCwgZW5kLnkgKyByYWRpdXMgKVxyXG4gICAgICAuYXJjKCBzdGFydC54ICsgd2lkdGggLSByYWRpdXMsIGVuZC55ICsgcmFkaXVzLCByYWRpdXMsIDAsIDMgKiBNYXRoLlBJIC8gMiwgdHJ1ZSApXHJcbiAgICAgIC5saW5lVG8oIGVuZC54LCBlbmQueSApO1xyXG5cclxuICAgIHN1cGVyKCB3aXJlLFxyXG4gICAgICB7XHJcbiAgICAgICAgbGluZVdpZHRoOiA1LFxyXG4gICAgICAgIHN0cm9rZTogJyM5OTk5OTknLFxyXG4gICAgICAgIGxpbmVKb2luOiAncm91bmQnXHJcbiAgICAgIH0gKTtcclxuICB9XHJcbn1cclxuXHJcbmNvbG9yVmlzaW9uLnJlZ2lzdGVyKCAnRmxhc2hsaWdodFdpcmVOb2RlJywgRmxhc2hsaWdodFdpcmVOb2RlICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGbGFzaGxpZ2h0V2lyZU5vZGU7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLEtBQUssUUFBUSxnQ0FBZ0M7QUFDdEQsU0FBU0MsSUFBSSxRQUFRLG1DQUFtQztBQUN4RCxPQUFPQyxXQUFXLE1BQU0sc0JBQXNCO0FBRTlDLE1BQU1DLGtCQUFrQixTQUFTRixJQUFJLENBQUM7RUFFcEM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUNFRyxXQUFXQSxDQUFFQyxLQUFLLEVBQUVDLEdBQUcsRUFBRUMsS0FBSyxFQUFHO0lBRS9CLE1BQU1DLE1BQU0sR0FBRyxDQUFDO0lBQ2hCLE1BQU1DLElBQUksR0FBRyxJQUFJVCxLQUFLLENBQUMsQ0FBQyxDQUNyQlUsTUFBTSxDQUFFTCxLQUFLLENBQUNNLENBQUMsRUFBRU4sS0FBSyxDQUFDTyxDQUFFLENBQUMsQ0FDMUJDLE1BQU0sQ0FBRVIsS0FBSyxDQUFDTSxDQUFDLEdBQUdKLEtBQUssR0FBR0MsTUFBTSxFQUFFSCxLQUFLLENBQUNPLENBQUUsQ0FBQyxDQUMzQ0UsR0FBRyxDQUFFVCxLQUFLLENBQUNNLENBQUMsR0FBR0osS0FBSyxHQUFHQyxNQUFNLEVBQUVILEtBQUssQ0FBQ08sQ0FBQyxHQUFHSixNQUFNLEVBQUVBLE1BQU0sRUFBRU8sSUFBSSxDQUFDQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFLLENBQUMsQ0FDL0VILE1BQU0sQ0FBRVIsS0FBSyxDQUFDTSxDQUFDLEdBQUdKLEtBQUssRUFBRUQsR0FBRyxDQUFDTSxDQUFDLEdBQUdKLE1BQU8sQ0FBQyxDQUN6Q00sR0FBRyxDQUFFVCxLQUFLLENBQUNNLENBQUMsR0FBR0osS0FBSyxHQUFHQyxNQUFNLEVBQUVGLEdBQUcsQ0FBQ00sQ0FBQyxHQUFHSixNQUFNLEVBQUVBLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHTyxJQUFJLENBQUNDLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSyxDQUFDLENBQ2pGSCxNQUFNLENBQUVQLEdBQUcsQ0FBQ0ssQ0FBQyxFQUFFTCxHQUFHLENBQUNNLENBQUUsQ0FBQztJQUV6QixLQUFLLENBQUVILElBQUksRUFDVDtNQUNFUSxTQUFTLEVBQUUsQ0FBQztNQUNaQyxNQUFNLEVBQUUsU0FBUztNQUNqQkMsUUFBUSxFQUFFO0lBQ1osQ0FBRSxDQUFDO0VBQ1A7QUFDRjtBQUVBakIsV0FBVyxDQUFDa0IsUUFBUSxDQUFFLG9CQUFvQixFQUFFakIsa0JBQW1CLENBQUM7QUFFaEUsZUFBZUEsa0JBQWtCIn0=