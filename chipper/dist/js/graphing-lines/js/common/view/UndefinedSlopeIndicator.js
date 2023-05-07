// Copyright 2013-2023, University of Colorado Boulder

/**
 * A translucent red 'X', to be placed on top of an equation whose slope is undefined.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Line, Node } from '../../../../scenery/js/imports.js';
import graphingLines from '../../graphingLines.js';
const LINE_OPTIONS = {
  stroke: 'rgba( 255, 0, 0, 0.3 )',
  lineWidth: 4
};
export default class UndefinedSlopeIndicator extends Node {
  constructor(width, height) {
    const line1 = new Line(0, 0, 0, 1, LINE_OPTIONS);
    const line2 = new Line(0, 0, 0, 1, LINE_OPTIONS);
    super({
      children: [line1, line2]
    });
    this.line1 = line1;
    this.line2 = line2;

    // initialize
    this.setSize(width, height);
  }

  // Sets the size of the 'X'.
  setSize(width, height) {
    this.line1.setLine(0, 0, width, height);
    this.line2.setLine(0, height, width, 0);
  }
}
graphingLines.register('UndefinedSlopeIndicator', UndefinedSlopeIndicator);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJMaW5lIiwiTm9kZSIsImdyYXBoaW5nTGluZXMiLCJMSU5FX09QVElPTlMiLCJzdHJva2UiLCJsaW5lV2lkdGgiLCJVbmRlZmluZWRTbG9wZUluZGljYXRvciIsImNvbnN0cnVjdG9yIiwid2lkdGgiLCJoZWlnaHQiLCJsaW5lMSIsImxpbmUyIiwiY2hpbGRyZW4iLCJzZXRTaXplIiwic2V0TGluZSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiVW5kZWZpbmVkU2xvcGVJbmRpY2F0b3IudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTMtMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogQSB0cmFuc2x1Y2VudCByZWQgJ1gnLCB0byBiZSBwbGFjZWQgb24gdG9wIG9mIGFuIGVxdWF0aW9uIHdob3NlIHNsb3BlIGlzIHVuZGVmaW5lZC5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgeyBMaW5lLCBOb2RlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IGdyYXBoaW5nTGluZXMgZnJvbSAnLi4vLi4vZ3JhcGhpbmdMaW5lcy5qcyc7XHJcblxyXG5jb25zdCBMSU5FX09QVElPTlMgPSB7XHJcbiAgc3Ryb2tlOiAncmdiYSggMjU1LCAwLCAwLCAwLjMgKScsXHJcbiAgbGluZVdpZHRoOiA0XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbmRlZmluZWRTbG9wZUluZGljYXRvciBleHRlbmRzIE5vZGUge1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGxpbmUxOiBMaW5lO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgbGluZTI6IExpbmU7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvciggd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgKSB7XHJcblxyXG4gICAgY29uc3QgbGluZTEgPSBuZXcgTGluZSggMCwgMCwgMCwgMSwgTElORV9PUFRJT05TICk7XHJcbiAgICBjb25zdCBsaW5lMiA9IG5ldyBMaW5lKCAwLCAwLCAwLCAxLCBMSU5FX09QVElPTlMgKTtcclxuXHJcbiAgICBzdXBlcigge1xyXG4gICAgICBjaGlsZHJlbjogWyBsaW5lMSwgbGluZTIgXVxyXG4gICAgfSApO1xyXG5cclxuICAgIHRoaXMubGluZTEgPSBsaW5lMTtcclxuICAgIHRoaXMubGluZTIgPSBsaW5lMjtcclxuXHJcbiAgICAvLyBpbml0aWFsaXplXHJcbiAgICB0aGlzLnNldFNpemUoIHdpZHRoLCBoZWlnaHQgKTtcclxuICB9XHJcblxyXG4gIC8vIFNldHMgdGhlIHNpemUgb2YgdGhlICdYJy5cclxuICBwdWJsaWMgc2V0U2l6ZSggd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgKTogdm9pZCB7XHJcbiAgICB0aGlzLmxpbmUxLnNldExpbmUoIDAsIDAsIHdpZHRoLCBoZWlnaHQgKTtcclxuICAgIHRoaXMubGluZTIuc2V0TGluZSggMCwgaGVpZ2h0LCB3aWR0aCwgMCApO1xyXG4gIH1cclxufVxyXG5cclxuZ3JhcGhpbmdMaW5lcy5yZWdpc3RlciggJ1VuZGVmaW5lZFNsb3BlSW5kaWNhdG9yJywgVW5kZWZpbmVkU2xvcGVJbmRpY2F0b3IgKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsSUFBSSxFQUFFQyxJQUFJLFFBQVEsbUNBQW1DO0FBQzlELE9BQU9DLGFBQWEsTUFBTSx3QkFBd0I7QUFFbEQsTUFBTUMsWUFBWSxHQUFHO0VBQ25CQyxNQUFNLEVBQUUsd0JBQXdCO0VBQ2hDQyxTQUFTLEVBQUU7QUFDYixDQUFDO0FBRUQsZUFBZSxNQUFNQyx1QkFBdUIsU0FBU0wsSUFBSSxDQUFDO0VBS2pETSxXQUFXQSxDQUFFQyxLQUFhLEVBQUVDLE1BQWMsRUFBRztJQUVsRCxNQUFNQyxLQUFLLEdBQUcsSUFBSVYsSUFBSSxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRUcsWUFBYSxDQUFDO0lBQ2xELE1BQU1RLEtBQUssR0FBRyxJQUFJWCxJQUFJLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFRyxZQUFhLENBQUM7SUFFbEQsS0FBSyxDQUFFO01BQ0xTLFFBQVEsRUFBRSxDQUFFRixLQUFLLEVBQUVDLEtBQUs7SUFDMUIsQ0FBRSxDQUFDO0lBRUgsSUFBSSxDQUFDRCxLQUFLLEdBQUdBLEtBQUs7SUFDbEIsSUFBSSxDQUFDQyxLQUFLLEdBQUdBLEtBQUs7O0lBRWxCO0lBQ0EsSUFBSSxDQUFDRSxPQUFPLENBQUVMLEtBQUssRUFBRUMsTUFBTyxDQUFDO0VBQy9COztFQUVBO0VBQ09JLE9BQU9BLENBQUVMLEtBQWEsRUFBRUMsTUFBYyxFQUFTO0lBQ3BELElBQUksQ0FBQ0MsS0FBSyxDQUFDSSxPQUFPLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRU4sS0FBSyxFQUFFQyxNQUFPLENBQUM7SUFDekMsSUFBSSxDQUFDRSxLQUFLLENBQUNHLE9BQU8sQ0FBRSxDQUFDLEVBQUVMLE1BQU0sRUFBRUQsS0FBSyxFQUFFLENBQUUsQ0FBQztFQUMzQztBQUNGO0FBRUFOLGFBQWEsQ0FBQ2EsUUFBUSxDQUFFLHlCQUF5QixFQUFFVCx1QkFBd0IsQ0FBQyJ9