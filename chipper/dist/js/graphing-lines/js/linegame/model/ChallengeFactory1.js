// Copyright 2013-2023, University of Colorado Boulder

/**
 * Creates game challenges for Level 1, as specified in the design document.
 * Slope, intercept, and point (x1,y1) are all uniquely chosen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Fraction from '../../../../phetcommon/js/model/Fraction.js';
import graphingLines from '../../graphingLines.js';
import BaseChallengeFactory from './BaseChallengeFactory.js';
import EquationForm from './EquationForm.js';
import GraphTheLine from './GraphTheLine.js';
import MakeTheEquation from './MakeTheEquation.js';
import ManipulationMode from './ManipulationMode.js';
import ValuePool from './ValuePool.js';
export default class ChallengeFactory1 extends BaseChallengeFactory {
  constructor() {
    super();
  }

  /**
   * Creates challenges for this game level.
   */
  createChallenges() {
    const challenges = [];

    // hoist vars
    let slope;
    let point;
    let description;
    let manipulationMode;

    // pools of values for slope, y-intercept and point
    const slopePool = new ValuePool(this.createSlopeArrays());
    const yInterceptPool = new ValuePool(this.createYInterceptArrays());
    const pointPool = new ValuePool(this.createPointArrays());

    // CHALLENGE 1: Graph-the-Line, slope-intercept form
    challenges.push(new GraphTheLine('1: GraphTheLine, required slopes, slope variable', this.createSlopeInterceptLine(slopePool.chooseRequired(), yInterceptPool.chooseOptional()), EquationForm.SLOPE_INTERCEPT, ManipulationMode.SLOPE, this.xRange, this.yRange));

    // CHALLENGE 2: Graph-the-Line, slope-intercept form
    challenges.push(new GraphTheLine('2: GraphTheLine, required y-intercept, y-intercept variable', this.createSlopeInterceptLine(slopePool.chooseOptional(), yInterceptPool.chooseRequired()), EquationForm.SLOPE_INTERCEPT, ManipulationMode.INTERCEPT, this.xRange, this.yRange));

    // CHALLENGE 3: Make-the-Equation, slope-intercept form
    challenges.push(new MakeTheEquation('3: MakeTheEquation, required slope, slope variable', this.createSlopeInterceptLine(slopePool.chooseRequired(), yInterceptPool.chooseOptional()), EquationForm.SLOPE_INTERCEPT, ManipulationMode.SLOPE, this.xRange, this.yRange));

    // CHALLENGE 4: Make-the-Equation, slope-intercept form
    challenges.push(new MakeTheEquation('4: MakeTheEquation, required y-intercept, y-intercept variable', this.createSlopeInterceptLine(slopePool.chooseOptional(), yInterceptPool.chooseRequired()), EquationForm.SLOPE_INTERCEPT, ManipulationMode.INTERCEPT, this.xRange, this.yRange));

    // for point-slope form, one of each manipulation mode
    const pointSlopeManipulationModes = [ManipulationMode.POINT, ManipulationMode.SLOPE];

    // CHALLENGE 5: Graph-the-Line, point-slope form, point or slope variable (random choice)
    {
      // manipulation mode
      manipulationMode = ValuePool.choose(pointSlopeManipulationModes);
      if (manipulationMode === ManipulationMode.SLOPE) {
        point = pointPool.chooseOptional();
        slope = slopePool.chooseRequired();
        description = '5: GraphTheLine, required slope, slope variable';
      } else {
        point = pointPool.chooseRequired();
        slope = slopePool.chooseOptional();
        description = '5: GraphTheLine, required point, point variable';
      }

      // challenge
      challenges.push(new GraphTheLine(description, this.createPointSlopeLine(point, slope), EquationForm.POINT_SLOPE, manipulationMode, this.xRange, this.yRange));
    }

    // CHALLENGE 6: Make-the-Equation, point-slope form, point or slope variable (whichever was not chosen above)
    {
      // manipulation mode
      manipulationMode = ValuePool.choose(pointSlopeManipulationModes);
      if (manipulationMode === ManipulationMode.SLOPE) {
        point = pointPool.chooseOptional();
        slope = slopePool.chooseRequired();
        description = '6: MakeTheEquation, required slope, slope variable';
      } else {
        point = pointPool.chooseRequired();
        slope = slopePool.chooseOptional();
        description = '6: MakeTheEquation, required point, point variable';
      }

      // challenge
      challenges.push(new MakeTheEquation(description, this.createPointSlopeLine(point, slope), EquationForm.POINT_SLOPE, manipulationMode, this.xRange, this.yRange));
    }
    return challenges;
  }

  /**
   * Creates the sets of slopes used for generating challenges.
   */
  createSlopeArrays() {
    return [[new Fraction(3, 2), new Fraction(4, 3), new Fraction(5, 2), new Fraction(5, 3)], [new Fraction(1, 2), new Fraction(1, 3), new Fraction(1, 4), new Fraction(1, 5)], [new Fraction(2, 3), new Fraction(3, 4), new Fraction(3, 5), new Fraction(2, 5)]];
  }

  /**
   * Creates the sets of y-intercepts used for generating challenges.
   */
  createYInterceptArrays() {
    const yRangeSubset = new Range(-6, 4);
    assert && assert(this.yRange.containsRange(yRangeSubset), 'values are out of range');
    return [ValuePool.rangeToArray(new Range(yRangeSubset.min, -1)),
    // negative intercepts
    ValuePool.rangeToArray(new Range(1, yRangeSubset.max)) // positive intercepts
    ];
  }

  /**
   * Creates the set of points used for generating challenges.
   * Points are in Quadrant 1 (both coordinates positive) or Quadrant 3 (both coordinates negative).
   */
  createPointArrays() {
    const x1Range = new Range(-9, 4);
    const y1Range = new Range(-9, 4);
    assert && assert(this.xRange.containsRange(x1Range) && this.yRange.containsRange(y1Range));
    let x;
    let y;

    // all points in Quadrant 1
    const quadrant1Points = [];
    for (x = 1; x < this.xRange.max; x++) {
      for (y = 1; y < this.yRange.max; y++) {
        quadrant1Points.push(new Vector2(x, y));
      }
    }

    // all points in Quadrant 3
    const quadrant3Points = [];
    for (x = x1Range.min; x < 0; x++) {
      for (y = y1Range.min; y < 0; y++) {
        quadrant3Points.push(new Vector2(x, y));
      }
    }
    return [quadrant1Points, quadrant3Points];
  }
}
graphingLines.register('ChallengeFactory1', ChallengeFactory1);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSYW5nZSIsIlZlY3RvcjIiLCJGcmFjdGlvbiIsImdyYXBoaW5nTGluZXMiLCJCYXNlQ2hhbGxlbmdlRmFjdG9yeSIsIkVxdWF0aW9uRm9ybSIsIkdyYXBoVGhlTGluZSIsIk1ha2VUaGVFcXVhdGlvbiIsIk1hbmlwdWxhdGlvbk1vZGUiLCJWYWx1ZVBvb2wiLCJDaGFsbGVuZ2VGYWN0b3J5MSIsImNvbnN0cnVjdG9yIiwiY3JlYXRlQ2hhbGxlbmdlcyIsImNoYWxsZW5nZXMiLCJzbG9wZSIsInBvaW50IiwiZGVzY3JpcHRpb24iLCJtYW5pcHVsYXRpb25Nb2RlIiwic2xvcGVQb29sIiwiY3JlYXRlU2xvcGVBcnJheXMiLCJ5SW50ZXJjZXB0UG9vbCIsImNyZWF0ZVlJbnRlcmNlcHRBcnJheXMiLCJwb2ludFBvb2wiLCJjcmVhdGVQb2ludEFycmF5cyIsInB1c2giLCJjcmVhdGVTbG9wZUludGVyY2VwdExpbmUiLCJjaG9vc2VSZXF1aXJlZCIsImNob29zZU9wdGlvbmFsIiwiU0xPUEVfSU5URVJDRVBUIiwiU0xPUEUiLCJ4UmFuZ2UiLCJ5UmFuZ2UiLCJJTlRFUkNFUFQiLCJwb2ludFNsb3BlTWFuaXB1bGF0aW9uTW9kZXMiLCJQT0lOVCIsImNob29zZSIsImNyZWF0ZVBvaW50U2xvcGVMaW5lIiwiUE9JTlRfU0xPUEUiLCJ5UmFuZ2VTdWJzZXQiLCJhc3NlcnQiLCJjb250YWluc1JhbmdlIiwicmFuZ2VUb0FycmF5IiwibWluIiwibWF4IiwieDFSYW5nZSIsInkxUmFuZ2UiLCJ4IiwieSIsInF1YWRyYW50MVBvaW50cyIsInF1YWRyYW50M1BvaW50cyIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiQ2hhbGxlbmdlRmFjdG9yeTEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTMtMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBnYW1lIGNoYWxsZW5nZXMgZm9yIExldmVsIDEsIGFzIHNwZWNpZmllZCBpbiB0aGUgZGVzaWduIGRvY3VtZW50LlxyXG4gKiBTbG9wZSwgaW50ZXJjZXB0LCBhbmQgcG9pbnQgKHgxLHkxKSBhcmUgYWxsIHVuaXF1ZWx5IGNob3Nlbi5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgUmFuZ2UgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1JhbmdlLmpzJztcclxuaW1wb3J0IFZlY3RvcjIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1ZlY3RvcjIuanMnO1xyXG5pbXBvcnQgRnJhY3Rpb24gZnJvbSAnLi4vLi4vLi4vLi4vcGhldGNvbW1vbi9qcy9tb2RlbC9GcmFjdGlvbi5qcyc7XHJcbmltcG9ydCBncmFwaGluZ0xpbmVzIGZyb20gJy4uLy4uL2dyYXBoaW5nTGluZXMuanMnO1xyXG5pbXBvcnQgQmFzZUNoYWxsZW5nZUZhY3RvcnkgZnJvbSAnLi9CYXNlQ2hhbGxlbmdlRmFjdG9yeS5qcyc7XHJcbmltcG9ydCBDaGFsbGVuZ2UgZnJvbSAnLi9DaGFsbGVuZ2UuanMnO1xyXG5pbXBvcnQgRXF1YXRpb25Gb3JtIGZyb20gJy4vRXF1YXRpb25Gb3JtLmpzJztcclxuaW1wb3J0IEdyYXBoVGhlTGluZSBmcm9tICcuL0dyYXBoVGhlTGluZS5qcyc7XHJcbmltcG9ydCBNYWtlVGhlRXF1YXRpb24gZnJvbSAnLi9NYWtlVGhlRXF1YXRpb24uanMnO1xyXG5pbXBvcnQgTWFuaXB1bGF0aW9uTW9kZSBmcm9tICcuL01hbmlwdWxhdGlvbk1vZGUuanMnO1xyXG5pbXBvcnQgVmFsdWVQb29sIGZyb20gJy4vVmFsdWVQb29sLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYWxsZW5nZUZhY3RvcnkxIGV4dGVuZHMgQmFzZUNoYWxsZW5nZUZhY3Rvcnkge1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBjaGFsbGVuZ2VzIGZvciB0aGlzIGdhbWUgbGV2ZWwuXHJcbiAgICovXHJcbiAgcHVibGljIG92ZXJyaWRlIGNyZWF0ZUNoYWxsZW5nZXMoKTogQ2hhbGxlbmdlW10ge1xyXG5cclxuICAgIGNvbnN0IGNoYWxsZW5nZXMgPSBbXTtcclxuXHJcbiAgICAvLyBob2lzdCB2YXJzXHJcbiAgICBsZXQgc2xvcGU7XHJcbiAgICBsZXQgcG9pbnQ7XHJcbiAgICBsZXQgZGVzY3JpcHRpb247XHJcbiAgICBsZXQgbWFuaXB1bGF0aW9uTW9kZTtcclxuXHJcbiAgICAvLyBwb29scyBvZiB2YWx1ZXMgZm9yIHNsb3BlLCB5LWludGVyY2VwdCBhbmQgcG9pbnRcclxuICAgIGNvbnN0IHNsb3BlUG9vbCA9IG5ldyBWYWx1ZVBvb2woIHRoaXMuY3JlYXRlU2xvcGVBcnJheXMoKSApO1xyXG4gICAgY29uc3QgeUludGVyY2VwdFBvb2wgPSBuZXcgVmFsdWVQb29sKCB0aGlzLmNyZWF0ZVlJbnRlcmNlcHRBcnJheXMoKSApO1xyXG4gICAgY29uc3QgcG9pbnRQb29sID0gbmV3IFZhbHVlUG9vbCggdGhpcy5jcmVhdGVQb2ludEFycmF5cygpICk7XHJcblxyXG4gICAgLy8gQ0hBTExFTkdFIDE6IEdyYXBoLXRoZS1MaW5lLCBzbG9wZS1pbnRlcmNlcHQgZm9ybVxyXG4gICAgY2hhbGxlbmdlcy5wdXNoKCBuZXcgR3JhcGhUaGVMaW5lKFxyXG4gICAgICAnMTogR3JhcGhUaGVMaW5lLCByZXF1aXJlZCBzbG9wZXMsIHNsb3BlIHZhcmlhYmxlJyxcclxuICAgICAgdGhpcy5jcmVhdGVTbG9wZUludGVyY2VwdExpbmUoIHNsb3BlUG9vbC5jaG9vc2VSZXF1aXJlZCgpLCB5SW50ZXJjZXB0UG9vbC5jaG9vc2VPcHRpb25hbCgpICksXHJcbiAgICAgIEVxdWF0aW9uRm9ybS5TTE9QRV9JTlRFUkNFUFQsXHJcbiAgICAgIE1hbmlwdWxhdGlvbk1vZGUuU0xPUEUsXHJcbiAgICAgIHRoaXMueFJhbmdlLCB0aGlzLnlSYW5nZSApICk7XHJcblxyXG4gICAgLy8gQ0hBTExFTkdFIDI6IEdyYXBoLXRoZS1MaW5lLCBzbG9wZS1pbnRlcmNlcHQgZm9ybVxyXG4gICAgY2hhbGxlbmdlcy5wdXNoKCBuZXcgR3JhcGhUaGVMaW5lKFxyXG4gICAgICAnMjogR3JhcGhUaGVMaW5lLCByZXF1aXJlZCB5LWludGVyY2VwdCwgeS1pbnRlcmNlcHQgdmFyaWFibGUnLFxyXG4gICAgICB0aGlzLmNyZWF0ZVNsb3BlSW50ZXJjZXB0TGluZSggc2xvcGVQb29sLmNob29zZU9wdGlvbmFsKCksIHlJbnRlcmNlcHRQb29sLmNob29zZVJlcXVpcmVkKCkgKSxcclxuICAgICAgRXF1YXRpb25Gb3JtLlNMT1BFX0lOVEVSQ0VQVCxcclxuICAgICAgTWFuaXB1bGF0aW9uTW9kZS5JTlRFUkNFUFQsXHJcbiAgICAgIHRoaXMueFJhbmdlLCB0aGlzLnlSYW5nZSApICk7XHJcblxyXG4gICAgLy8gQ0hBTExFTkdFIDM6IE1ha2UtdGhlLUVxdWF0aW9uLCBzbG9wZS1pbnRlcmNlcHQgZm9ybVxyXG4gICAgY2hhbGxlbmdlcy5wdXNoKCBuZXcgTWFrZVRoZUVxdWF0aW9uKFxyXG4gICAgICAnMzogTWFrZVRoZUVxdWF0aW9uLCByZXF1aXJlZCBzbG9wZSwgc2xvcGUgdmFyaWFibGUnLFxyXG4gICAgICB0aGlzLmNyZWF0ZVNsb3BlSW50ZXJjZXB0TGluZSggc2xvcGVQb29sLmNob29zZVJlcXVpcmVkKCksIHlJbnRlcmNlcHRQb29sLmNob29zZU9wdGlvbmFsKCkgKSxcclxuICAgICAgRXF1YXRpb25Gb3JtLlNMT1BFX0lOVEVSQ0VQVCxcclxuICAgICAgTWFuaXB1bGF0aW9uTW9kZS5TTE9QRSxcclxuICAgICAgdGhpcy54UmFuZ2UsIHRoaXMueVJhbmdlICkgKTtcclxuXHJcbiAgICAvLyBDSEFMTEVOR0UgNDogTWFrZS10aGUtRXF1YXRpb24sIHNsb3BlLWludGVyY2VwdCBmb3JtXHJcbiAgICBjaGFsbGVuZ2VzLnB1c2goIG5ldyBNYWtlVGhlRXF1YXRpb24oXHJcbiAgICAgICc0OiBNYWtlVGhlRXF1YXRpb24sIHJlcXVpcmVkIHktaW50ZXJjZXB0LCB5LWludGVyY2VwdCB2YXJpYWJsZScsXHJcbiAgICAgIHRoaXMuY3JlYXRlU2xvcGVJbnRlcmNlcHRMaW5lKCBzbG9wZVBvb2wuY2hvb3NlT3B0aW9uYWwoKSwgeUludGVyY2VwdFBvb2wuY2hvb3NlUmVxdWlyZWQoKSApLFxyXG4gICAgICBFcXVhdGlvbkZvcm0uU0xPUEVfSU5URVJDRVBULFxyXG4gICAgICBNYW5pcHVsYXRpb25Nb2RlLklOVEVSQ0VQVCxcclxuICAgICAgdGhpcy54UmFuZ2UsIHRoaXMueVJhbmdlICkgKTtcclxuXHJcbiAgICAvLyBmb3IgcG9pbnQtc2xvcGUgZm9ybSwgb25lIG9mIGVhY2ggbWFuaXB1bGF0aW9uIG1vZGVcclxuICAgIGNvbnN0IHBvaW50U2xvcGVNYW5pcHVsYXRpb25Nb2RlcyA9IFsgTWFuaXB1bGF0aW9uTW9kZS5QT0lOVCwgTWFuaXB1bGF0aW9uTW9kZS5TTE9QRSBdO1xyXG5cclxuICAgIC8vIENIQUxMRU5HRSA1OiBHcmFwaC10aGUtTGluZSwgcG9pbnQtc2xvcGUgZm9ybSwgcG9pbnQgb3Igc2xvcGUgdmFyaWFibGUgKHJhbmRvbSBjaG9pY2UpXHJcbiAgICB7XHJcbiAgICAgIC8vIG1hbmlwdWxhdGlvbiBtb2RlXHJcbiAgICAgIG1hbmlwdWxhdGlvbk1vZGUgPSBWYWx1ZVBvb2wuY2hvb3NlKCBwb2ludFNsb3BlTWFuaXB1bGF0aW9uTW9kZXMgKTtcclxuXHJcbiAgICAgIGlmICggbWFuaXB1bGF0aW9uTW9kZSA9PT0gTWFuaXB1bGF0aW9uTW9kZS5TTE9QRSApIHtcclxuICAgICAgICBwb2ludCA9IHBvaW50UG9vbC5jaG9vc2VPcHRpb25hbCgpO1xyXG4gICAgICAgIHNsb3BlID0gc2xvcGVQb29sLmNob29zZVJlcXVpcmVkKCk7XHJcbiAgICAgICAgZGVzY3JpcHRpb24gPSAnNTogR3JhcGhUaGVMaW5lLCByZXF1aXJlZCBzbG9wZSwgc2xvcGUgdmFyaWFibGUnO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHBvaW50ID0gcG9pbnRQb29sLmNob29zZVJlcXVpcmVkKCk7XHJcbiAgICAgICAgc2xvcGUgPSBzbG9wZVBvb2wuY2hvb3NlT3B0aW9uYWwoKTtcclxuICAgICAgICBkZXNjcmlwdGlvbiA9ICc1OiBHcmFwaFRoZUxpbmUsIHJlcXVpcmVkIHBvaW50LCBwb2ludCB2YXJpYWJsZSc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNoYWxsZW5nZVxyXG4gICAgICBjaGFsbGVuZ2VzLnB1c2goIG5ldyBHcmFwaFRoZUxpbmUoIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIHRoaXMuY3JlYXRlUG9pbnRTbG9wZUxpbmUoIHBvaW50LCBzbG9wZSApLFxyXG4gICAgICAgIEVxdWF0aW9uRm9ybS5QT0lOVF9TTE9QRSxcclxuICAgICAgICBtYW5pcHVsYXRpb25Nb2RlLFxyXG4gICAgICAgIHRoaXMueFJhbmdlLCB0aGlzLnlSYW5nZSApICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ0hBTExFTkdFIDY6IE1ha2UtdGhlLUVxdWF0aW9uLCBwb2ludC1zbG9wZSBmb3JtLCBwb2ludCBvciBzbG9wZSB2YXJpYWJsZSAod2hpY2hldmVyIHdhcyBub3QgY2hvc2VuIGFib3ZlKVxyXG4gICAge1xyXG4gICAgICAvLyBtYW5pcHVsYXRpb24gbW9kZVxyXG4gICAgICBtYW5pcHVsYXRpb25Nb2RlID0gVmFsdWVQb29sLmNob29zZSggcG9pbnRTbG9wZU1hbmlwdWxhdGlvbk1vZGVzICk7XHJcblxyXG4gICAgICBpZiAoIG1hbmlwdWxhdGlvbk1vZGUgPT09IE1hbmlwdWxhdGlvbk1vZGUuU0xPUEUgKSB7XHJcbiAgICAgICAgcG9pbnQgPSBwb2ludFBvb2wuY2hvb3NlT3B0aW9uYWwoKTtcclxuICAgICAgICBzbG9wZSA9IHNsb3BlUG9vbC5jaG9vc2VSZXF1aXJlZCgpO1xyXG4gICAgICAgIGRlc2NyaXB0aW9uID0gJzY6IE1ha2VUaGVFcXVhdGlvbiwgcmVxdWlyZWQgc2xvcGUsIHNsb3BlIHZhcmlhYmxlJztcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBwb2ludCA9IHBvaW50UG9vbC5jaG9vc2VSZXF1aXJlZCgpO1xyXG4gICAgICAgIHNsb3BlID0gc2xvcGVQb29sLmNob29zZU9wdGlvbmFsKCk7XHJcbiAgICAgICAgZGVzY3JpcHRpb24gPSAnNjogTWFrZVRoZUVxdWF0aW9uLCByZXF1aXJlZCBwb2ludCwgcG9pbnQgdmFyaWFibGUnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjaGFsbGVuZ2VcclxuICAgICAgY2hhbGxlbmdlcy5wdXNoKCBuZXcgTWFrZVRoZUVxdWF0aW9uKCBkZXNjcmlwdGlvbixcclxuICAgICAgICB0aGlzLmNyZWF0ZVBvaW50U2xvcGVMaW5lKCBwb2ludCwgc2xvcGUgKSxcclxuICAgICAgICBFcXVhdGlvbkZvcm0uUE9JTlRfU0xPUEUsXHJcbiAgICAgICAgbWFuaXB1bGF0aW9uTW9kZSxcclxuICAgICAgICB0aGlzLnhSYW5nZSwgdGhpcy55UmFuZ2UgKSApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjaGFsbGVuZ2VzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyB0aGUgc2V0cyBvZiBzbG9wZXMgdXNlZCBmb3IgZ2VuZXJhdGluZyBjaGFsbGVuZ2VzLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBjcmVhdGVTbG9wZUFycmF5cygpOiBGcmFjdGlvbltdW10ge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgWyBuZXcgRnJhY3Rpb24oIDMsIDIgKSwgbmV3IEZyYWN0aW9uKCA0LCAzICksIG5ldyBGcmFjdGlvbiggNSwgMiApLCBuZXcgRnJhY3Rpb24oIDUsIDMgKSBdLFxyXG4gICAgICBbIG5ldyBGcmFjdGlvbiggMSwgMiApLCBuZXcgRnJhY3Rpb24oIDEsIDMgKSwgbmV3IEZyYWN0aW9uKCAxLCA0ICksIG5ldyBGcmFjdGlvbiggMSwgNSApIF0sXHJcbiAgICAgIFsgbmV3IEZyYWN0aW9uKCAyLCAzICksIG5ldyBGcmFjdGlvbiggMywgNCApLCBuZXcgRnJhY3Rpb24oIDMsIDUgKSwgbmV3IEZyYWN0aW9uKCAyLCA1ICkgXVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgdGhlIHNldHMgb2YgeS1pbnRlcmNlcHRzIHVzZWQgZm9yIGdlbmVyYXRpbmcgY2hhbGxlbmdlcy5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgY3JlYXRlWUludGVyY2VwdEFycmF5cygpOiBudW1iZXJbXVtdIHtcclxuICAgIGNvbnN0IHlSYW5nZVN1YnNldCA9IG5ldyBSYW5nZSggLTYsIDQgKTtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIHRoaXMueVJhbmdlLmNvbnRhaW5zUmFuZ2UoIHlSYW5nZVN1YnNldCApLCAndmFsdWVzIGFyZSBvdXQgb2YgcmFuZ2UnICk7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICBWYWx1ZVBvb2wucmFuZ2VUb0FycmF5KCBuZXcgUmFuZ2UoIHlSYW5nZVN1YnNldC5taW4sIC0xICkgKSwgLy8gbmVnYXRpdmUgaW50ZXJjZXB0c1xyXG4gICAgICBWYWx1ZVBvb2wucmFuZ2VUb0FycmF5KCBuZXcgUmFuZ2UoIDEsIHlSYW5nZVN1YnNldC5tYXggKSApICAgLy8gcG9zaXRpdmUgaW50ZXJjZXB0c1xyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgdGhlIHNldCBvZiBwb2ludHMgdXNlZCBmb3IgZ2VuZXJhdGluZyBjaGFsbGVuZ2VzLlxyXG4gICAqIFBvaW50cyBhcmUgaW4gUXVhZHJhbnQgMSAoYm90aCBjb29yZGluYXRlcyBwb3NpdGl2ZSkgb3IgUXVhZHJhbnQgMyAoYm90aCBjb29yZGluYXRlcyBuZWdhdGl2ZSkuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVQb2ludEFycmF5cygpOiBWZWN0b3IyW11bXSB7XHJcblxyXG4gICAgY29uc3QgeDFSYW5nZSA9IG5ldyBSYW5nZSggLTksIDQgKTtcclxuICAgIGNvbnN0IHkxUmFuZ2UgPSBuZXcgUmFuZ2UoIC05LCA0ICk7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCB0aGlzLnhSYW5nZS5jb250YWluc1JhbmdlKCB4MVJhbmdlICkgJiYgdGhpcy55UmFuZ2UuY29udGFpbnNSYW5nZSggeTFSYW5nZSApICk7XHJcblxyXG4gICAgbGV0IHg7XHJcbiAgICBsZXQgeTtcclxuXHJcbiAgICAvLyBhbGwgcG9pbnRzIGluIFF1YWRyYW50IDFcclxuICAgIGNvbnN0IHF1YWRyYW50MVBvaW50cyA9IFtdO1xyXG4gICAgZm9yICggeCA9IDE7IHggPCB0aGlzLnhSYW5nZS5tYXg7IHgrKyApIHtcclxuICAgICAgZm9yICggeSA9IDE7IHkgPCB0aGlzLnlSYW5nZS5tYXg7IHkrKyApIHtcclxuICAgICAgICBxdWFkcmFudDFQb2ludHMucHVzaCggbmV3IFZlY3RvcjIoIHgsIHkgKSApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWxsIHBvaW50cyBpbiBRdWFkcmFudCAzXHJcbiAgICBjb25zdCBxdWFkcmFudDNQb2ludHMgPSBbXTtcclxuICAgIGZvciAoIHggPSB4MVJhbmdlLm1pbjsgeCA8IDA7IHgrKyApIHtcclxuICAgICAgZm9yICggeSA9IHkxUmFuZ2UubWluOyB5IDwgMDsgeSsrICkge1xyXG4gICAgICAgIHF1YWRyYW50M1BvaW50cy5wdXNoKCBuZXcgVmVjdG9yMiggeCwgeSApICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gWyBxdWFkcmFudDFQb2ludHMsIHF1YWRyYW50M1BvaW50cyBdO1xyXG4gIH1cclxufVxyXG5cclxuZ3JhcGhpbmdMaW5lcy5yZWdpc3RlciggJ0NoYWxsZW5nZUZhY3RvcnkxJywgQ2hhbGxlbmdlRmFjdG9yeTEgKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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