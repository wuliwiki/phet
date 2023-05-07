// Copyright 2016-2021, University of Colorado Boulder

/**
 *
 * The bar meter node is composed of a rectangular bar graph and a value node.
 * The composite parts are added to layout boxes in the BarMeterPanel so that
 * alignment can be perfectly set.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Dimension2 from '../../../../../dot/js/Dimension2.js';
import { Rectangle } from '../../../../../scenery/js/imports.js';
import capacitorLabBasics from '../../../capacitorLabBasics.js';

// constants
const BASE_LINE_LENGTH = 25;
const BAR_SIZE = new Dimension2(280, 18); // Controls width and height of the bars
const BASE_LINE_OFFSET = (BASE_LINE_LENGTH - BAR_SIZE.height) / 2;
const BAR_STROKE_COLOR = 'black';
const BAR_LINE_WIDTH = 1;
class BarNode extends Rectangle {
  /**
   * The bar which indicates the magnitude of the value being read by the meter. Origin is
   * at upper left of track.
   *
   * @param {string} barColor
   * @param {number} value
   * @param {number} maxValue
   */
  constructor(barColor, value, maxValue) {
    assert && assert(value >= 0, `value must be >= 0 : ${value}`);
    super(0, 0, BAR_SIZE.width, BAR_SIZE.height, {
      fill: barColor,
      stroke: BAR_STROKE_COLOR,
      lineWidth: BAR_LINE_WIDTH
    });

    // @private - see https://github.com/phetsims/capacitor-lab-basics/issues/287
    this.transparentWorkaroundBar = new Rectangle(0, 0, BAR_SIZE.width, BAR_SIZE.height, {
      fill: 'transparent'
    });
    this.addChild(this.transparentWorkaroundBar);

    // @public
    this.value = value;
    this.maxValue = maxValue;
    this.barSize = BAR_SIZE;
    this.update();
  }

  /**
   * Set bar value
   * @public
   *
   * @param {number} value
   */
  setValue(value) {
    assert && assert(value >= 0, `value must be >= 0 : ${value}`);
    if (value !== this.value) {
      this.value = value;
      this.update();
    }
  }

  /**
   * Update the bar
   * @public
   */
  update() {
    const percent = Math.min(1, Math.abs(this.value) / this.maxValue);
    const x = (1 - percent) * BAR_SIZE.width;
    const width = BAR_SIZE.width - x;
    this.setRect(0, -BASE_LINE_LENGTH / 2 + BASE_LINE_OFFSET, width, BAR_SIZE.height);
    this.transparentWorkaroundBar.setRect(width, -BASE_LINE_LENGTH / 2 + BASE_LINE_OFFSET, BAR_SIZE.width, BAR_SIZE.height);
  }
}
capacitorLabBasics.register('BarNode', BarNode);
export default BarNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEaW1lbnNpb24yIiwiUmVjdGFuZ2xlIiwiY2FwYWNpdG9yTGFiQmFzaWNzIiwiQkFTRV9MSU5FX0xFTkdUSCIsIkJBUl9TSVpFIiwiQkFTRV9MSU5FX09GRlNFVCIsImhlaWdodCIsIkJBUl9TVFJPS0VfQ09MT1IiLCJCQVJfTElORV9XSURUSCIsIkJhck5vZGUiLCJjb25zdHJ1Y3RvciIsImJhckNvbG9yIiwidmFsdWUiLCJtYXhWYWx1ZSIsImFzc2VydCIsIndpZHRoIiwiZmlsbCIsInN0cm9rZSIsImxpbmVXaWR0aCIsInRyYW5zcGFyZW50V29ya2Fyb3VuZEJhciIsImFkZENoaWxkIiwiYmFyU2l6ZSIsInVwZGF0ZSIsInNldFZhbHVlIiwicGVyY2VudCIsIk1hdGgiLCJtaW4iLCJhYnMiLCJ4Iiwic2V0UmVjdCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiQmFyTm9kZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNi0yMDIxLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBUaGUgYmFyIG1ldGVyIG5vZGUgaXMgY29tcG9zZWQgb2YgYSByZWN0YW5ndWxhciBiYXIgZ3JhcGggYW5kIGEgdmFsdWUgbm9kZS5cclxuICogVGhlIGNvbXBvc2l0ZSBwYXJ0cyBhcmUgYWRkZWQgdG8gbGF5b3V0IGJveGVzIGluIHRoZSBCYXJNZXRlclBhbmVsIHNvIHRoYXRcclxuICogYWxpZ25tZW50IGNhbiBiZSBwZXJmZWN0bHkgc2V0LlxyXG4gKlxyXG4gKiBAYXV0aG9yIEplc3NlIEdyZWVuYmVyZyAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgRGltZW5zaW9uMiBmcm9tICcuLi8uLi8uLi8uLi8uLi9kb3QvanMvRGltZW5zaW9uMi5qcyc7XHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBjYXBhY2l0b3JMYWJCYXNpY3MgZnJvbSAnLi4vLi4vLi4vY2FwYWNpdG9yTGFiQmFzaWNzLmpzJztcclxuXHJcbi8vIGNvbnN0YW50c1xyXG5jb25zdCBCQVNFX0xJTkVfTEVOR1RIID0gMjU7XHJcbmNvbnN0IEJBUl9TSVpFID0gbmV3IERpbWVuc2lvbjIoIDI4MCwgMTggKTsgLy8gQ29udHJvbHMgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgYmFyc1xyXG5jb25zdCBCQVNFX0xJTkVfT0ZGU0VUID0gKCBCQVNFX0xJTkVfTEVOR1RIIC0gQkFSX1NJWkUuaGVpZ2h0ICkgLyAyO1xyXG5jb25zdCBCQVJfU1RST0tFX0NPTE9SID0gJ2JsYWNrJztcclxuY29uc3QgQkFSX0xJTkVfV0lEVEggPSAxO1xyXG5cclxuY2xhc3MgQmFyTm9kZSBleHRlbmRzIFJlY3RhbmdsZSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGJhciB3aGljaCBpbmRpY2F0ZXMgdGhlIG1hZ25pdHVkZSBvZiB0aGUgdmFsdWUgYmVpbmcgcmVhZCBieSB0aGUgbWV0ZXIuIE9yaWdpbiBpc1xyXG4gICAqIGF0IHVwcGVyIGxlZnQgb2YgdHJhY2suXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gYmFyQ29sb3JcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcclxuICAgKiBAcGFyYW0ge251bWJlcn0gbWF4VmFsdWVcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggYmFyQ29sb3IsIHZhbHVlLCBtYXhWYWx1ZSApIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIHZhbHVlID49IDAsIGB2YWx1ZSBtdXN0IGJlID49IDAgOiAke3ZhbHVlfWAgKTtcclxuICAgIHN1cGVyKCAwLCAwLCBCQVJfU0laRS53aWR0aCwgQkFSX1NJWkUuaGVpZ2h0LCB7XHJcbiAgICAgIGZpbGw6IGJhckNvbG9yLFxyXG4gICAgICBzdHJva2U6IEJBUl9TVFJPS0VfQ09MT1IsXHJcbiAgICAgIGxpbmVXaWR0aDogQkFSX0xJTkVfV0lEVEhcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZSAtIHNlZSBodHRwczovL2dpdGh1Yi5jb20vcGhldHNpbXMvY2FwYWNpdG9yLWxhYi1iYXNpY3MvaXNzdWVzLzI4N1xyXG4gICAgdGhpcy50cmFuc3BhcmVudFdvcmthcm91bmRCYXIgPSBuZXcgUmVjdGFuZ2xlKCAwLCAwLCBCQVJfU0laRS53aWR0aCwgQkFSX1NJWkUuaGVpZ2h0LCB7XHJcbiAgICAgIGZpbGw6ICd0cmFuc3BhcmVudCdcclxuICAgIH0gKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIHRoaXMudHJhbnNwYXJlbnRXb3JrYXJvdW5kQmFyICk7XHJcblxyXG4gICAgLy8gQHB1YmxpY1xyXG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5tYXhWYWx1ZSA9IG1heFZhbHVlO1xyXG4gICAgdGhpcy5iYXJTaXplID0gQkFSX1NJWkU7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBiYXIgdmFsdWVcclxuICAgKiBAcHVibGljXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcclxuICAgKi9cclxuICBzZXRWYWx1ZSggdmFsdWUgKSB7XHJcblxyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggdmFsdWUgPj0gMCwgYHZhbHVlIG11c3QgYmUgPj0gMCA6ICR7dmFsdWV9YCApO1xyXG5cclxuICAgIGlmICggdmFsdWUgIT09IHRoaXMudmFsdWUgKSB7XHJcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgYmFyXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIHVwZGF0ZSgpIHtcclxuICAgIGNvbnN0IHBlcmNlbnQgPSBNYXRoLm1pbiggMSwgTWF0aC5hYnMoIHRoaXMudmFsdWUgKSAvIHRoaXMubWF4VmFsdWUgKTtcclxuICAgIGNvbnN0IHggPSAoIDEgLSBwZXJjZW50ICkgKiBCQVJfU0laRS53aWR0aDtcclxuICAgIGNvbnN0IHdpZHRoID0gQkFSX1NJWkUud2lkdGggLSB4O1xyXG4gICAgdGhpcy5zZXRSZWN0KCAwLCAtQkFTRV9MSU5FX0xFTkdUSCAvIDIgKyBCQVNFX0xJTkVfT0ZGU0VULCB3aWR0aCwgQkFSX1NJWkUuaGVpZ2h0ICk7XHJcbiAgICB0aGlzLnRyYW5zcGFyZW50V29ya2Fyb3VuZEJhci5zZXRSZWN0KCB3aWR0aCwgLUJBU0VfTElORV9MRU5HVEggLyAyICsgQkFTRV9MSU5FX09GRlNFVCwgQkFSX1NJWkUud2lkdGgsIEJBUl9TSVpFLmhlaWdodCApO1xyXG4gIH1cclxufVxyXG5cclxuY2FwYWNpdG9yTGFiQmFzaWNzLnJlZ2lzdGVyKCAnQmFyTm9kZScsIEJhck5vZGUgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhck5vZGU7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFVBQVUsTUFBTSxxQ0FBcUM7QUFDNUQsU0FBU0MsU0FBUyxRQUFRLHNDQUFzQztBQUNoRSxPQUFPQyxrQkFBa0IsTUFBTSxnQ0FBZ0M7O0FBRS9EO0FBQ0EsTUFBTUMsZ0JBQWdCLEdBQUcsRUFBRTtBQUMzQixNQUFNQyxRQUFRLEdBQUcsSUFBSUosVUFBVSxDQUFFLEdBQUcsRUFBRSxFQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzVDLE1BQU1LLGdCQUFnQixHQUFHLENBQUVGLGdCQUFnQixHQUFHQyxRQUFRLENBQUNFLE1BQU0sSUFBSyxDQUFDO0FBQ25FLE1BQU1DLGdCQUFnQixHQUFHLE9BQU87QUFDaEMsTUFBTUMsY0FBYyxHQUFHLENBQUM7QUFFeEIsTUFBTUMsT0FBTyxTQUFTUixTQUFTLENBQUM7RUFDOUI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFUyxXQUFXQSxDQUFFQyxRQUFRLEVBQUVDLEtBQUssRUFBRUMsUUFBUSxFQUFHO0lBQ3ZDQyxNQUFNLElBQUlBLE1BQU0sQ0FBRUYsS0FBSyxJQUFJLENBQUMsRUFBRyx3QkFBdUJBLEtBQU0sRUFBRSxDQUFDO0lBQy9ELEtBQUssQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFUixRQUFRLENBQUNXLEtBQUssRUFBRVgsUUFBUSxDQUFDRSxNQUFNLEVBQUU7TUFDNUNVLElBQUksRUFBRUwsUUFBUTtNQUNkTSxNQUFNLEVBQUVWLGdCQUFnQjtNQUN4QlcsU0FBUyxFQUFFVjtJQUNiLENBQUUsQ0FBQzs7SUFFSDtJQUNBLElBQUksQ0FBQ1csd0JBQXdCLEdBQUcsSUFBSWxCLFNBQVMsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFRyxRQUFRLENBQUNXLEtBQUssRUFBRVgsUUFBUSxDQUFDRSxNQUFNLEVBQUU7TUFDcEZVLElBQUksRUFBRTtJQUNSLENBQUUsQ0FBQztJQUNILElBQUksQ0FBQ0ksUUFBUSxDQUFFLElBQUksQ0FBQ0Qsd0JBQXlCLENBQUM7O0lBRTlDO0lBQ0EsSUFBSSxDQUFDUCxLQUFLLEdBQUdBLEtBQUs7SUFDbEIsSUFBSSxDQUFDQyxRQUFRLEdBQUdBLFFBQVE7SUFDeEIsSUFBSSxDQUFDUSxPQUFPLEdBQUdqQixRQUFRO0lBQ3ZCLElBQUksQ0FBQ2tCLE1BQU0sQ0FBQyxDQUFDO0VBQ2Y7O0VBR0E7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0VDLFFBQVFBLENBQUVYLEtBQUssRUFBRztJQUVoQkUsTUFBTSxJQUFJQSxNQUFNLENBQUVGLEtBQUssSUFBSSxDQUFDLEVBQUcsd0JBQXVCQSxLQUFNLEVBQUUsQ0FBQztJQUUvRCxJQUFLQSxLQUFLLEtBQUssSUFBSSxDQUFDQSxLQUFLLEVBQUc7TUFDMUIsSUFBSSxDQUFDQSxLQUFLLEdBQUdBLEtBQUs7TUFDbEIsSUFBSSxDQUFDVSxNQUFNLENBQUMsQ0FBQztJQUNmO0VBQ0Y7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7RUFDRUEsTUFBTUEsQ0FBQSxFQUFHO0lBQ1AsTUFBTUUsT0FBTyxHQUFHQyxJQUFJLENBQUNDLEdBQUcsQ0FBRSxDQUFDLEVBQUVELElBQUksQ0FBQ0UsR0FBRyxDQUFFLElBQUksQ0FBQ2YsS0FBTSxDQUFDLEdBQUcsSUFBSSxDQUFDQyxRQUFTLENBQUM7SUFDckUsTUFBTWUsQ0FBQyxHQUFHLENBQUUsQ0FBQyxHQUFHSixPQUFPLElBQUtwQixRQUFRLENBQUNXLEtBQUs7SUFDMUMsTUFBTUEsS0FBSyxHQUFHWCxRQUFRLENBQUNXLEtBQUssR0FBR2EsQ0FBQztJQUNoQyxJQUFJLENBQUNDLE9BQU8sQ0FBRSxDQUFDLEVBQUUsQ0FBQzFCLGdCQUFnQixHQUFHLENBQUMsR0FBR0UsZ0JBQWdCLEVBQUVVLEtBQUssRUFBRVgsUUFBUSxDQUFDRSxNQUFPLENBQUM7SUFDbkYsSUFBSSxDQUFDYSx3QkFBd0IsQ0FBQ1UsT0FBTyxDQUFFZCxLQUFLLEVBQUUsQ0FBQ1osZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHRSxnQkFBZ0IsRUFBRUQsUUFBUSxDQUFDVyxLQUFLLEVBQUVYLFFBQVEsQ0FBQ0UsTUFBTyxDQUFDO0VBQzNIO0FBQ0Y7QUFFQUosa0JBQWtCLENBQUM0QixRQUFRLENBQUUsU0FBUyxFQUFFckIsT0FBUSxDQUFDO0FBRWpELGVBQWVBLE9BQU8ifQ==