// Copyright 2016-2023, University of Colorado Boulder

/**
 * Creates the third row for the ReadoutNode of Trig Tour.  This row contains a label for the trig function,
 * a fraction representation of the value, and the numeric value.  This row is organized, separated by the equality
 * sign.  It looks like this:
 *
 * trig function label = trig fraction = trig value
 *
 * @author Michael Dubson (PhET developer) on 6/10/2015
 * @author Jesse Greenberg
 */

import Utils from '../../../../../dot/js/Utils.js';
import MathSymbols from '../../../../../scenery-phet/js/MathSymbols.js';
import PhetFont from '../../../../../scenery-phet/js/PhetFont.js';
import { Node, Text } from '../../../../../scenery/js/imports.js';
import trigTour from '../../../trigTour.js';
import TrigTourStrings from '../../../TrigTourStrings.js';
import SpecialAngles from '../../SpecialAngles.js';
import TrigTourMathStrings from '../../TrigTourMathStrings.js';
import TrigFunctionLabelText from '../TrigFunctionLabelText.js';
import TrigTourColors from '../TrigTourColors.js';
import FractionNode from './FractionNode.js';
const cosString = TrigTourStrings.cos;
const sinString = TrigTourStrings.sin;
const tanString = TrigTourStrings.tan;
const xString = TrigTourStrings.x;
const yString = TrigTourStrings.y;

// non translatable string
const equalString = TrigTourMathStrings.EQUALS_STRING;

//constants
const DISPLAY_FONT = new PhetFont(20);
const DISPLAY_FONT_LARGE = new PhetFont(30);
const DISPLAY_FONT_LARGE_BOLD = new PhetFont({
  size: 20,
  weight: 'bold'
});
const DISPLAY_FONT_LARGE_BOLD_ITALIC = new PhetFont({
  size: 20,
  weight: 'bold',
  style: 'italic'
});
const TEXT_COLOR = TrigTourColors.TEXT_COLOR;
class LabelFractionValueRow extends Node {
  /**
   * Constructor.
   *
   * @param {string} trigLabelString - string representing the trig function for this row
   * @param {TrigTourModel} trigTourModel
   * @param {ViewProperties} viewProperties
   * @param {Object} [options]
   */
  constructor(trigLabelString, trigTourModel, viewProperties, options) {
    super(options);

    // prevent block fitting of this row as a performance optimization
    this.preventFit = true;
    this.trigTourModel = trigTourModel; // @private
    this.viewProperties = viewProperties; // @private
    this.trigLabelString = trigLabelString; // @private

    const fontOptions = {
      font: DISPLAY_FONT,
      fill: TEXT_COLOR
    };

    // initialize strings and variables for the row, depending on trigLabelString
    let trigString;
    let numeratorString;
    let denominatorString;
    this.trigModelFunction; // @private - trig function for this value
    this.specialAngles; // @private - collection of special angles for this trig function

    // get the values needed to represent the special angle as a fraction, dependent on trig function type
    switch (trigLabelString) {
      case 'sin':
        {
          trigString = sinString;
          numeratorString = yString;
          denominatorString = '1';
          this.specialAngles = SpecialAngles.SPECIAL_SIN_FRACTIONS;
          break;
        }
      case 'cos':
        {
          trigString = cosString;
          numeratorString = xString;
          denominatorString = '1';
          this.specialAngles = SpecialAngles.SPECIAL_COS_FRACTIONS;
          break;
        }
      case 'tan':
        {
          trigString = tanString;
          numeratorString = yString;
          denominatorString = xString;
          this.specialAngles = SpecialAngles.SPECIAL_TAN_FRACTIONS;
          break;
        }
      default:
        throw new Error(`invalid trigLabelString: ${trigLabelString}`);
    }

    // label section of the row, something like 'Cos θ ='
    const trigLabelText = new TrigFunctionLabelText(trigString, {
      trigFunctionLabelFont: DISPLAY_FONT_LARGE_BOLD,
      thetaLabelFont: DISPLAY_FONT_LARGE_BOLD_ITALIC
    });
    const leftEqualText = new Text(equalString, {
      font: DISPLAY_FONT_LARGE_BOLD
    });

    // label fraction for the row defining the shown value, something like 'x/1'
    const trigFraction = new FractionNode(numeratorString, denominatorString, {
      size: 20,
      fontWeight: 'bold'
    });

    // value presented by this row as a number, updates with the model and depends on the angle
    const trigValueNumberText = new Text('trigModelValue', fontOptions);

    // value presented by this row as a fraction, updates with the model and depends on the angle
    const trigValueFraction = new FractionNode('', '', fontOptions);

    // create an text representation of the equal sign
    const rightEqualText = new Text(equalString, {
      font: DISPLAY_FONT_LARGE_BOLD
    });
    this.children = [trigLabelText, leftEqualText, trigFraction, rightEqualText, trigValueNumberText, trigValueFraction];

    // layout
    const space = 4;
    leftEqualText.leftCenter = trigLabelText.rightCenter.plusXY(space, 0);
    trigFraction.leftCenter = leftEqualText.rightCenter.plusXY(space, 0);
    rightEqualText.leftCenter = trigFraction.rightCenter.plusXY(space, 0);
    trigValueNumberText.leftCenter = rightEqualText.rightCenter.plusXY(space, 0);
    trigValueFraction.leftCenter = rightEqualText.rightCenter.plusXY(space, 0);

    // if this row is for 'tan', create and add an infinity symbol to represent the singularity
    if (trigLabelString === 'tan') {
      const plusMinusInfinityNode = new Node();
      const plusMinusText = new Text(MathSymbols.PLUS_MINUS, {
        font: DISPLAY_FONT,
        fill: TEXT_COLOR
      });
      const infinityText = new Text(MathSymbols.INFINITY, {
        font: DISPLAY_FONT_LARGE,
        fill: TEXT_COLOR
      });
      plusMinusInfinityNode.children = [plusMinusText, infinityText];
      plusMinusText.left = 0;
      infinityText.left = plusMinusText.right;
      infinityText.centerY = -5;
      plusMinusInfinityNode.leftCenter = rightEqualText.rightCenter;
      this.addChild(plusMinusInfinityNode);
      trigTourModel.singularityProperty.link(singularity => {
        plusMinusInfinityNode.visible = singularity;
        if (!viewProperties.specialAnglesVisibleProperty.value) {
          trigValueNumberText.visible = !singularity;
        }
      });
    }

    // synchronize row values with model
    trigTourModel.fullAngleProperty.link(fullAngle => {
      this.setTrigReadout(trigValueNumberText, trigValueFraction);
    });

    // synchronize component visibility with view properties
    viewProperties.specialAnglesVisibleProperty.link(specialAnglesVisible => {
      trigValueFraction.visible = specialAnglesVisible;
      trigValueNumberText.visible = !specialAnglesVisible;
      this.setTrigReadout(trigValueNumberText, trigValueFraction);
    });
  }

  /**
   * Set the value of the trig value.
   * @private
   *
   * @param {Text} trigValueNumberText
   * @param {FractionNode} trigValueFraction
   */
  setTrigReadout(trigValueNumberText, trigValueFraction) {
    if (this.viewProperties.specialAnglesVisibleProperty.value) {
      this.setSpecialAngleTrigReadout(trigValueFraction);
    }
    let trigValue;
    if (this.trigLabelString === 'sin') {
      trigValue = this.trigTourModel.sin();
    } else if (this.trigLabelString === 'cos') {
      trigValue = this.trigTourModel.cos();
    } else if (this.trigLabelString === 'tan') {
      trigValue = this.trigTourModel.tan();
    }
    assert && assert(typeof trigValue !== 'undefined', 'trigLabelString must be one of cos, tan, or sin');
    trigValueNumberText.string = Utils.toFixed(trigValue, 3);
  }

  /**
   * Set the special angle readout display.
   * @private
   *
   * @param {FractionNode} trigValueFraction
   */
  setSpecialAngleTrigReadout(trigValueFraction) {
    const smallAngleInDegrees = Utils.roundSymmetric(this.trigTourModel.getSmallAngle0To360());

    // get the values needed to represent the special angle as a fraction.
    const specialFraction = this.specialAngles[smallAngleInDegrees];
    const setFractionValues = (readoutFraction, specialFraction) => {
      // sanity check to make sure that the special fraction is defined in the special fractions objects above
      if (specialFraction) {
        readoutFraction.setValues(specialFraction.numerator, specialFraction.denominator, specialFraction.radical, specialFraction.negative);
      }
    };
    setFractionValues(trigValueFraction, specialFraction);
  }
}
trigTour.register('LabelFractionValueRow', LabelFractionValueRow);
export default LabelFractionValueRow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVdGlscyIsIk1hdGhTeW1ib2xzIiwiUGhldEZvbnQiLCJOb2RlIiwiVGV4dCIsInRyaWdUb3VyIiwiVHJpZ1RvdXJTdHJpbmdzIiwiU3BlY2lhbEFuZ2xlcyIsIlRyaWdUb3VyTWF0aFN0cmluZ3MiLCJUcmlnRnVuY3Rpb25MYWJlbFRleHQiLCJUcmlnVG91ckNvbG9ycyIsIkZyYWN0aW9uTm9kZSIsImNvc1N0cmluZyIsImNvcyIsInNpblN0cmluZyIsInNpbiIsInRhblN0cmluZyIsInRhbiIsInhTdHJpbmciLCJ4IiwieVN0cmluZyIsInkiLCJlcXVhbFN0cmluZyIsIkVRVUFMU19TVFJJTkciLCJESVNQTEFZX0ZPTlQiLCJESVNQTEFZX0ZPTlRfTEFSR0UiLCJESVNQTEFZX0ZPTlRfTEFSR0VfQk9MRCIsInNpemUiLCJ3ZWlnaHQiLCJESVNQTEFZX0ZPTlRfTEFSR0VfQk9MRF9JVEFMSUMiLCJzdHlsZSIsIlRFWFRfQ09MT1IiLCJMYWJlbEZyYWN0aW9uVmFsdWVSb3ciLCJjb25zdHJ1Y3RvciIsInRyaWdMYWJlbFN0cmluZyIsInRyaWdUb3VyTW9kZWwiLCJ2aWV3UHJvcGVydGllcyIsIm9wdGlvbnMiLCJwcmV2ZW50Rml0IiwiZm9udE9wdGlvbnMiLCJmb250IiwiZmlsbCIsInRyaWdTdHJpbmciLCJudW1lcmF0b3JTdHJpbmciLCJkZW5vbWluYXRvclN0cmluZyIsInRyaWdNb2RlbEZ1bmN0aW9uIiwic3BlY2lhbEFuZ2xlcyIsIlNQRUNJQUxfU0lOX0ZSQUNUSU9OUyIsIlNQRUNJQUxfQ09TX0ZSQUNUSU9OUyIsIlNQRUNJQUxfVEFOX0ZSQUNUSU9OUyIsIkVycm9yIiwidHJpZ0xhYmVsVGV4dCIsInRyaWdGdW5jdGlvbkxhYmVsRm9udCIsInRoZXRhTGFiZWxGb250IiwibGVmdEVxdWFsVGV4dCIsInRyaWdGcmFjdGlvbiIsImZvbnRXZWlnaHQiLCJ0cmlnVmFsdWVOdW1iZXJUZXh0IiwidHJpZ1ZhbHVlRnJhY3Rpb24iLCJyaWdodEVxdWFsVGV4dCIsImNoaWxkcmVuIiwic3BhY2UiLCJsZWZ0Q2VudGVyIiwicmlnaHRDZW50ZXIiLCJwbHVzWFkiLCJwbHVzTWludXNJbmZpbml0eU5vZGUiLCJwbHVzTWludXNUZXh0IiwiUExVU19NSU5VUyIsImluZmluaXR5VGV4dCIsIklORklOSVRZIiwibGVmdCIsInJpZ2h0IiwiY2VudGVyWSIsImFkZENoaWxkIiwic2luZ3VsYXJpdHlQcm9wZXJ0eSIsImxpbmsiLCJzaW5ndWxhcml0eSIsInZpc2libGUiLCJzcGVjaWFsQW5nbGVzVmlzaWJsZVByb3BlcnR5IiwidmFsdWUiLCJmdWxsQW5nbGVQcm9wZXJ0eSIsImZ1bGxBbmdsZSIsInNldFRyaWdSZWFkb3V0Iiwic3BlY2lhbEFuZ2xlc1Zpc2libGUiLCJzZXRTcGVjaWFsQW5nbGVUcmlnUmVhZG91dCIsInRyaWdWYWx1ZSIsImFzc2VydCIsInN0cmluZyIsInRvRml4ZWQiLCJzbWFsbEFuZ2xlSW5EZWdyZWVzIiwicm91bmRTeW1tZXRyaWMiLCJnZXRTbWFsbEFuZ2xlMFRvMzYwIiwic3BlY2lhbEZyYWN0aW9uIiwic2V0RnJhY3Rpb25WYWx1ZXMiLCJyZWFkb3V0RnJhY3Rpb24iLCJzZXRWYWx1ZXMiLCJudW1lcmF0b3IiLCJkZW5vbWluYXRvciIsInJhZGljYWwiLCJuZWdhdGl2ZSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiTGFiZWxGcmFjdGlvblZhbHVlUm93LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE2LTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgdGhlIHRoaXJkIHJvdyBmb3IgdGhlIFJlYWRvdXROb2RlIG9mIFRyaWcgVG91ci4gIFRoaXMgcm93IGNvbnRhaW5zIGEgbGFiZWwgZm9yIHRoZSB0cmlnIGZ1bmN0aW9uLFxyXG4gKiBhIGZyYWN0aW9uIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2YWx1ZSwgYW5kIHRoZSBudW1lcmljIHZhbHVlLiAgVGhpcyByb3cgaXMgb3JnYW5pemVkLCBzZXBhcmF0ZWQgYnkgdGhlIGVxdWFsaXR5XHJcbiAqIHNpZ24uICBJdCBsb29rcyBsaWtlIHRoaXM6XHJcbiAqXHJcbiAqIHRyaWcgZnVuY3Rpb24gbGFiZWwgPSB0cmlnIGZyYWN0aW9uID0gdHJpZyB2YWx1ZVxyXG4gKlxyXG4gKiBAYXV0aG9yIE1pY2hhZWwgRHVic29uIChQaEVUIGRldmVsb3Blcikgb24gNi8xMC8yMDE1XHJcbiAqIEBhdXRob3IgSmVzc2UgR3JlZW5iZXJnXHJcbiAqL1xyXG5cclxuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uLy4uLy4uLy4uL2RvdC9qcy9VdGlscy5qcyc7XHJcbmltcG9ydCBNYXRoU3ltYm9scyBmcm9tICcuLi8uLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMvTWF0aFN5bWJvbHMuanMnO1xyXG5pbXBvcnQgUGhldEZvbnQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL1BoZXRGb250LmpzJztcclxuaW1wb3J0IHsgTm9kZSwgVGV4dCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCB0cmlnVG91ciBmcm9tICcuLi8uLi8uLi90cmlnVG91ci5qcyc7XHJcbmltcG9ydCBUcmlnVG91clN0cmluZ3MgZnJvbSAnLi4vLi4vLi4vVHJpZ1RvdXJTdHJpbmdzLmpzJztcclxuaW1wb3J0IFNwZWNpYWxBbmdsZXMgZnJvbSAnLi4vLi4vU3BlY2lhbEFuZ2xlcy5qcyc7XHJcbmltcG9ydCBUcmlnVG91ck1hdGhTdHJpbmdzIGZyb20gJy4uLy4uL1RyaWdUb3VyTWF0aFN0cmluZ3MuanMnO1xyXG5pbXBvcnQgVHJpZ0Z1bmN0aW9uTGFiZWxUZXh0IGZyb20gJy4uL1RyaWdGdW5jdGlvbkxhYmVsVGV4dC5qcyc7XHJcbmltcG9ydCBUcmlnVG91ckNvbG9ycyBmcm9tICcuLi9UcmlnVG91ckNvbG9ycy5qcyc7XHJcbmltcG9ydCBGcmFjdGlvbk5vZGUgZnJvbSAnLi9GcmFjdGlvbk5vZGUuanMnO1xyXG5cclxuY29uc3QgY29zU3RyaW5nID0gVHJpZ1RvdXJTdHJpbmdzLmNvcztcclxuY29uc3Qgc2luU3RyaW5nID0gVHJpZ1RvdXJTdHJpbmdzLnNpbjtcclxuY29uc3QgdGFuU3RyaW5nID0gVHJpZ1RvdXJTdHJpbmdzLnRhbjtcclxuY29uc3QgeFN0cmluZyA9IFRyaWdUb3VyU3RyaW5ncy54O1xyXG5jb25zdCB5U3RyaW5nID0gVHJpZ1RvdXJTdHJpbmdzLnk7XHJcblxyXG4vLyBub24gdHJhbnNsYXRhYmxlIHN0cmluZ1xyXG5jb25zdCBlcXVhbFN0cmluZyA9IFRyaWdUb3VyTWF0aFN0cmluZ3MuRVFVQUxTX1NUUklORztcclxuXHJcbi8vY29uc3RhbnRzXHJcbmNvbnN0IERJU1BMQVlfRk9OVCA9IG5ldyBQaGV0Rm9udCggMjAgKTtcclxuY29uc3QgRElTUExBWV9GT05UX0xBUkdFID0gbmV3IFBoZXRGb250KCAzMCApO1xyXG5jb25zdCBESVNQTEFZX0ZPTlRfTEFSR0VfQk9MRCA9IG5ldyBQaGV0Rm9udCggeyBzaXplOiAyMCwgd2VpZ2h0OiAnYm9sZCcgfSApO1xyXG5jb25zdCBESVNQTEFZX0ZPTlRfTEFSR0VfQk9MRF9JVEFMSUMgPSBuZXcgUGhldEZvbnQoIHsgc2l6ZTogMjAsIHdlaWdodDogJ2JvbGQnLCBzdHlsZTogJ2l0YWxpYycgfSApO1xyXG5jb25zdCBURVhUX0NPTE9SID0gVHJpZ1RvdXJDb2xvcnMuVEVYVF9DT0xPUjtcclxuXHJcbmNsYXNzIExhYmVsRnJhY3Rpb25WYWx1ZVJvdyBleHRlbmRzIE5vZGUge1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdG9yLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRyaWdMYWJlbFN0cmluZyAtIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHRyaWcgZnVuY3Rpb24gZm9yIHRoaXMgcm93XHJcbiAgICogQHBhcmFtIHtUcmlnVG91ck1vZGVsfSB0cmlnVG91ck1vZGVsXHJcbiAgICogQHBhcmFtIHtWaWV3UHJvcGVydGllc30gdmlld1Byb3BlcnRpZXNcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIHRyaWdMYWJlbFN0cmluZywgdHJpZ1RvdXJNb2RlbCwgdmlld1Byb3BlcnRpZXMsIG9wdGlvbnMgKSB7XHJcblxyXG4gICAgc3VwZXIoIG9wdGlvbnMgKTtcclxuXHJcbiAgICAvLyBwcmV2ZW50IGJsb2NrIGZpdHRpbmcgb2YgdGhpcyByb3cgYXMgYSBwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb25cclxuICAgIHRoaXMucHJldmVudEZpdCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy50cmlnVG91ck1vZGVsID0gdHJpZ1RvdXJNb2RlbDsgLy8gQHByaXZhdGVcclxuICAgIHRoaXMudmlld1Byb3BlcnRpZXMgPSB2aWV3UHJvcGVydGllczsgLy8gQHByaXZhdGVcclxuICAgIHRoaXMudHJpZ0xhYmVsU3RyaW5nID0gdHJpZ0xhYmVsU3RyaW5nOyAvLyBAcHJpdmF0ZVxyXG5cclxuICAgIGNvbnN0IGZvbnRPcHRpb25zID0geyBmb250OiBESVNQTEFZX0ZPTlQsIGZpbGw6IFRFWFRfQ09MT1IgfTtcclxuXHJcbiAgICAvLyBpbml0aWFsaXplIHN0cmluZ3MgYW5kIHZhcmlhYmxlcyBmb3IgdGhlIHJvdywgZGVwZW5kaW5nIG9uIHRyaWdMYWJlbFN0cmluZ1xyXG4gICAgbGV0IHRyaWdTdHJpbmc7XHJcbiAgICBsZXQgbnVtZXJhdG9yU3RyaW5nO1xyXG4gICAgbGV0IGRlbm9taW5hdG9yU3RyaW5nO1xyXG4gICAgdGhpcy50cmlnTW9kZWxGdW5jdGlvbjsgLy8gQHByaXZhdGUgLSB0cmlnIGZ1bmN0aW9uIGZvciB0aGlzIHZhbHVlXHJcbiAgICB0aGlzLnNwZWNpYWxBbmdsZXM7IC8vIEBwcml2YXRlIC0gY29sbGVjdGlvbiBvZiBzcGVjaWFsIGFuZ2xlcyBmb3IgdGhpcyB0cmlnIGZ1bmN0aW9uXHJcblxyXG4gICAgLy8gZ2V0IHRoZSB2YWx1ZXMgbmVlZGVkIHRvIHJlcHJlc2VudCB0aGUgc3BlY2lhbCBhbmdsZSBhcyBhIGZyYWN0aW9uLCBkZXBlbmRlbnQgb24gdHJpZyBmdW5jdGlvbiB0eXBlXHJcbiAgICBzd2l0Y2goIHRyaWdMYWJlbFN0cmluZyApIHtcclxuICAgICAgY2FzZSAnc2luJzoge1xyXG4gICAgICAgIHRyaWdTdHJpbmcgPSBzaW5TdHJpbmc7XHJcbiAgICAgICAgbnVtZXJhdG9yU3RyaW5nID0geVN0cmluZztcclxuICAgICAgICBkZW5vbWluYXRvclN0cmluZyA9ICcxJztcclxuICAgICAgICB0aGlzLnNwZWNpYWxBbmdsZXMgPSBTcGVjaWFsQW5nbGVzLlNQRUNJQUxfU0lOX0ZSQUNUSU9OUztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdjb3MnOiB7XHJcbiAgICAgICAgdHJpZ1N0cmluZyA9IGNvc1N0cmluZztcclxuICAgICAgICBudW1lcmF0b3JTdHJpbmcgPSB4U3RyaW5nO1xyXG4gICAgICAgIGRlbm9taW5hdG9yU3RyaW5nID0gJzEnO1xyXG4gICAgICAgIHRoaXMuc3BlY2lhbEFuZ2xlcyA9IFNwZWNpYWxBbmdsZXMuU1BFQ0lBTF9DT1NfRlJBQ1RJT05TO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3Rhbic6IHtcclxuICAgICAgICB0cmlnU3RyaW5nID0gdGFuU3RyaW5nO1xyXG4gICAgICAgIG51bWVyYXRvclN0cmluZyA9IHlTdHJpbmc7XHJcbiAgICAgICAgZGVub21pbmF0b3JTdHJpbmcgPSB4U3RyaW5nO1xyXG4gICAgICAgIHRoaXMuc3BlY2lhbEFuZ2xlcyA9IFNwZWNpYWxBbmdsZXMuU1BFQ0lBTF9UQU5fRlJBQ1RJT05TO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCBgaW52YWxpZCB0cmlnTGFiZWxTdHJpbmc6ICR7dHJpZ0xhYmVsU3RyaW5nfWAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBsYWJlbCBzZWN0aW9uIG9mIHRoZSByb3csIHNvbWV0aGluZyBsaWtlICdDb3MgzrggPSdcclxuICAgIGNvbnN0IHRyaWdMYWJlbFRleHQgPSBuZXcgVHJpZ0Z1bmN0aW9uTGFiZWxUZXh0KCB0cmlnU3RyaW5nLCB7XHJcbiAgICAgIHRyaWdGdW5jdGlvbkxhYmVsRm9udDogRElTUExBWV9GT05UX0xBUkdFX0JPTEQsXHJcbiAgICAgIHRoZXRhTGFiZWxGb250OiBESVNQTEFZX0ZPTlRfTEFSR0VfQk9MRF9JVEFMSUNcclxuICAgIH0gKTtcclxuICAgIGNvbnN0IGxlZnRFcXVhbFRleHQgPSBuZXcgVGV4dCggZXF1YWxTdHJpbmcsIHsgZm9udDogRElTUExBWV9GT05UX0xBUkdFX0JPTEQgfSApO1xyXG5cclxuICAgIC8vIGxhYmVsIGZyYWN0aW9uIGZvciB0aGUgcm93IGRlZmluaW5nIHRoZSBzaG93biB2YWx1ZSwgc29tZXRoaW5nIGxpa2UgJ3gvMSdcclxuICAgIGNvbnN0IHRyaWdGcmFjdGlvbiA9IG5ldyBGcmFjdGlvbk5vZGUoIG51bWVyYXRvclN0cmluZywgZGVub21pbmF0b3JTdHJpbmcsIHsgc2l6ZTogMjAsIGZvbnRXZWlnaHQ6ICdib2xkJyB9ICk7XHJcblxyXG4gICAgLy8gdmFsdWUgcHJlc2VudGVkIGJ5IHRoaXMgcm93IGFzIGEgbnVtYmVyLCB1cGRhdGVzIHdpdGggdGhlIG1vZGVsIGFuZCBkZXBlbmRzIG9uIHRoZSBhbmdsZVxyXG4gICAgY29uc3QgdHJpZ1ZhbHVlTnVtYmVyVGV4dCA9IG5ldyBUZXh0KCAndHJpZ01vZGVsVmFsdWUnLCBmb250T3B0aW9ucyApO1xyXG5cclxuICAgIC8vIHZhbHVlIHByZXNlbnRlZCBieSB0aGlzIHJvdyBhcyBhIGZyYWN0aW9uLCB1cGRhdGVzIHdpdGggdGhlIG1vZGVsIGFuZCBkZXBlbmRzIG9uIHRoZSBhbmdsZVxyXG4gICAgY29uc3QgdHJpZ1ZhbHVlRnJhY3Rpb24gPSBuZXcgRnJhY3Rpb25Ob2RlKCAnJywgJycsIGZvbnRPcHRpb25zICk7XHJcblxyXG4gICAgLy8gY3JlYXRlIGFuIHRleHQgcmVwcmVzZW50YXRpb24gb2YgdGhlIGVxdWFsIHNpZ25cclxuICAgIGNvbnN0IHJpZ2h0RXF1YWxUZXh0ID0gbmV3IFRleHQoIGVxdWFsU3RyaW5nLCB7IGZvbnQ6IERJU1BMQVlfRk9OVF9MQVJHRV9CT0xEIH0gKTtcclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuID0gWyB0cmlnTGFiZWxUZXh0LCBsZWZ0RXF1YWxUZXh0LCB0cmlnRnJhY3Rpb24sIHJpZ2h0RXF1YWxUZXh0LCB0cmlnVmFsdWVOdW1iZXJUZXh0LCB0cmlnVmFsdWVGcmFjdGlvbiBdO1xyXG5cclxuICAgIC8vIGxheW91dFxyXG4gICAgY29uc3Qgc3BhY2UgPSA0O1xyXG4gICAgbGVmdEVxdWFsVGV4dC5sZWZ0Q2VudGVyID0gdHJpZ0xhYmVsVGV4dC5yaWdodENlbnRlci5wbHVzWFkoIHNwYWNlLCAwICk7XHJcbiAgICB0cmlnRnJhY3Rpb24ubGVmdENlbnRlciA9IGxlZnRFcXVhbFRleHQucmlnaHRDZW50ZXIucGx1c1hZKCBzcGFjZSwgMCApO1xyXG4gICAgcmlnaHRFcXVhbFRleHQubGVmdENlbnRlciA9IHRyaWdGcmFjdGlvbi5yaWdodENlbnRlci5wbHVzWFkoIHNwYWNlLCAwICk7XHJcbiAgICB0cmlnVmFsdWVOdW1iZXJUZXh0LmxlZnRDZW50ZXIgPSByaWdodEVxdWFsVGV4dC5yaWdodENlbnRlci5wbHVzWFkoIHNwYWNlLCAwICk7XHJcbiAgICB0cmlnVmFsdWVGcmFjdGlvbi5sZWZ0Q2VudGVyID0gcmlnaHRFcXVhbFRleHQucmlnaHRDZW50ZXIucGx1c1hZKCBzcGFjZSwgMCApO1xyXG5cclxuICAgIC8vIGlmIHRoaXMgcm93IGlzIGZvciAndGFuJywgY3JlYXRlIGFuZCBhZGQgYW4gaW5maW5pdHkgc3ltYm9sIHRvIHJlcHJlc2VudCB0aGUgc2luZ3VsYXJpdHlcclxuICAgIGlmICggdHJpZ0xhYmVsU3RyaW5nID09PSAndGFuJyApIHtcclxuICAgICAgY29uc3QgcGx1c01pbnVzSW5maW5pdHlOb2RlID0gbmV3IE5vZGUoKTtcclxuICAgICAgY29uc3QgcGx1c01pbnVzVGV4dCA9IG5ldyBUZXh0KCBNYXRoU3ltYm9scy5QTFVTX01JTlVTLCB7IGZvbnQ6IERJU1BMQVlfRk9OVCwgZmlsbDogVEVYVF9DT0xPUiB9ICk7XHJcbiAgICAgIGNvbnN0IGluZmluaXR5VGV4dCA9IG5ldyBUZXh0KCBNYXRoU3ltYm9scy5JTkZJTklUWSwgeyBmb250OiBESVNQTEFZX0ZPTlRfTEFSR0UsIGZpbGw6IFRFWFRfQ09MT1IgfSApO1xyXG4gICAgICBwbHVzTWludXNJbmZpbml0eU5vZGUuY2hpbGRyZW4gPSBbIHBsdXNNaW51c1RleHQsIGluZmluaXR5VGV4dCBdO1xyXG4gICAgICBwbHVzTWludXNUZXh0LmxlZnQgPSAwO1xyXG4gICAgICBpbmZpbml0eVRleHQubGVmdCA9IHBsdXNNaW51c1RleHQucmlnaHQ7XHJcbiAgICAgIGluZmluaXR5VGV4dC5jZW50ZXJZID0gLTU7XHJcbiAgICAgIHBsdXNNaW51c0luZmluaXR5Tm9kZS5sZWZ0Q2VudGVyID0gcmlnaHRFcXVhbFRleHQucmlnaHRDZW50ZXI7XHJcbiAgICAgIHRoaXMuYWRkQ2hpbGQoIHBsdXNNaW51c0luZmluaXR5Tm9kZSApO1xyXG5cclxuICAgICAgdHJpZ1RvdXJNb2RlbC5zaW5ndWxhcml0eVByb3BlcnR5LmxpbmsoIHNpbmd1bGFyaXR5ID0+IHtcclxuICAgICAgICBwbHVzTWludXNJbmZpbml0eU5vZGUudmlzaWJsZSA9IHNpbmd1bGFyaXR5O1xyXG4gICAgICAgIGlmICggIXZpZXdQcm9wZXJ0aWVzLnNwZWNpYWxBbmdsZXNWaXNpYmxlUHJvcGVydHkudmFsdWUgKSB7XHJcbiAgICAgICAgICB0cmlnVmFsdWVOdW1iZXJUZXh0LnZpc2libGUgPSAhc2luZ3VsYXJpdHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9ICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3luY2hyb25pemUgcm93IHZhbHVlcyB3aXRoIG1vZGVsXHJcbiAgICB0cmlnVG91ck1vZGVsLmZ1bGxBbmdsZVByb3BlcnR5LmxpbmsoIGZ1bGxBbmdsZSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0VHJpZ1JlYWRvdXQoIHRyaWdWYWx1ZU51bWJlclRleHQsIHRyaWdWYWx1ZUZyYWN0aW9uICk7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gc3luY2hyb25pemUgY29tcG9uZW50IHZpc2liaWxpdHkgd2l0aCB2aWV3IHByb3BlcnRpZXNcclxuICAgIHZpZXdQcm9wZXJ0aWVzLnNwZWNpYWxBbmdsZXNWaXNpYmxlUHJvcGVydHkubGluayggc3BlY2lhbEFuZ2xlc1Zpc2libGUgPT4ge1xyXG4gICAgICB0cmlnVmFsdWVGcmFjdGlvbi52aXNpYmxlID0gc3BlY2lhbEFuZ2xlc1Zpc2libGU7XHJcbiAgICAgIHRyaWdWYWx1ZU51bWJlclRleHQudmlzaWJsZSA9ICFzcGVjaWFsQW5nbGVzVmlzaWJsZTtcclxuICAgICAgdGhpcy5zZXRUcmlnUmVhZG91dCggdHJpZ1ZhbHVlTnVtYmVyVGV4dCwgdHJpZ1ZhbHVlRnJhY3Rpb24gKTtcclxuICAgIH0gKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHZhbHVlIG9mIHRoZSB0cmlnIHZhbHVlLlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1RleHR9IHRyaWdWYWx1ZU51bWJlclRleHRcclxuICAgKiBAcGFyYW0ge0ZyYWN0aW9uTm9kZX0gdHJpZ1ZhbHVlRnJhY3Rpb25cclxuICAgKi9cclxuICBzZXRUcmlnUmVhZG91dCggdHJpZ1ZhbHVlTnVtYmVyVGV4dCwgdHJpZ1ZhbHVlRnJhY3Rpb24gKSB7XHJcbiAgICBpZiAoIHRoaXMudmlld1Byb3BlcnRpZXMuc3BlY2lhbEFuZ2xlc1Zpc2libGVQcm9wZXJ0eS52YWx1ZSApIHtcclxuICAgICAgdGhpcy5zZXRTcGVjaWFsQW5nbGVUcmlnUmVhZG91dCggdHJpZ1ZhbHVlRnJhY3Rpb24gKTtcclxuICAgIH1cclxuICAgIGxldCB0cmlnVmFsdWU7XHJcbiAgICBpZiAoIHRoaXMudHJpZ0xhYmVsU3RyaW5nID09PSAnc2luJyApIHtcclxuICAgICAgdHJpZ1ZhbHVlID0gdGhpcy50cmlnVG91ck1vZGVsLnNpbigpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoIHRoaXMudHJpZ0xhYmVsU3RyaW5nID09PSAnY29zJyApIHtcclxuICAgICAgdHJpZ1ZhbHVlID0gdGhpcy50cmlnVG91ck1vZGVsLmNvcygpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoIHRoaXMudHJpZ0xhYmVsU3RyaW5nID09PSAndGFuJyApIHtcclxuICAgICAgdHJpZ1ZhbHVlID0gdGhpcy50cmlnVG91ck1vZGVsLnRhbigpO1xyXG4gICAgfVxyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggdHlwZW9mIHRyaWdWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcsICd0cmlnTGFiZWxTdHJpbmcgbXVzdCBiZSBvbmUgb2YgY29zLCB0YW4sIG9yIHNpbicgKTtcclxuXHJcbiAgICB0cmlnVmFsdWVOdW1iZXJUZXh0LnN0cmluZyA9IFV0aWxzLnRvRml4ZWQoIHRyaWdWYWx1ZSwgMyApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBzcGVjaWFsIGFuZ2xlIHJlYWRvdXQgZGlzcGxheS5cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtGcmFjdGlvbk5vZGV9IHRyaWdWYWx1ZUZyYWN0aW9uXHJcbiAgICovXHJcbiAgc2V0U3BlY2lhbEFuZ2xlVHJpZ1JlYWRvdXQoIHRyaWdWYWx1ZUZyYWN0aW9uICkge1xyXG4gICAgY29uc3Qgc21hbGxBbmdsZUluRGVncmVlcyA9IFV0aWxzLnJvdW5kU3ltbWV0cmljKCB0aGlzLnRyaWdUb3VyTW9kZWwuZ2V0U21hbGxBbmdsZTBUbzM2MCgpICk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSB2YWx1ZXMgbmVlZGVkIHRvIHJlcHJlc2VudCB0aGUgc3BlY2lhbCBhbmdsZSBhcyBhIGZyYWN0aW9uLlxyXG4gICAgY29uc3Qgc3BlY2lhbEZyYWN0aW9uID0gdGhpcy5zcGVjaWFsQW5nbGVzWyBzbWFsbEFuZ2xlSW5EZWdyZWVzIF07XHJcblxyXG4gICAgY29uc3Qgc2V0RnJhY3Rpb25WYWx1ZXMgPSAoIHJlYWRvdXRGcmFjdGlvbiwgc3BlY2lhbEZyYWN0aW9uICkgPT4ge1xyXG4gICAgICAvLyBzYW5pdHkgY2hlY2sgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHNwZWNpYWwgZnJhY3Rpb24gaXMgZGVmaW5lZCBpbiB0aGUgc3BlY2lhbCBmcmFjdGlvbnMgb2JqZWN0cyBhYm92ZVxyXG4gICAgICBpZiAoIHNwZWNpYWxGcmFjdGlvbiApIHtcclxuICAgICAgICByZWFkb3V0RnJhY3Rpb24uc2V0VmFsdWVzKFxyXG4gICAgICAgICAgc3BlY2lhbEZyYWN0aW9uLm51bWVyYXRvcixcclxuICAgICAgICAgIHNwZWNpYWxGcmFjdGlvbi5kZW5vbWluYXRvcixcclxuICAgICAgICAgIHNwZWNpYWxGcmFjdGlvbi5yYWRpY2FsLFxyXG4gICAgICAgICAgc3BlY2lhbEZyYWN0aW9uLm5lZ2F0aXZlXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHNldEZyYWN0aW9uVmFsdWVzKCB0cmlnVmFsdWVGcmFjdGlvbiwgc3BlY2lhbEZyYWN0aW9uICk7XHJcbiAgfVxyXG59XHJcblxyXG50cmlnVG91ci5yZWdpc3RlciggJ0xhYmVsRnJhY3Rpb25WYWx1ZVJvdycsIExhYmVsRnJhY3Rpb25WYWx1ZVJvdyApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGFiZWxGcmFjdGlvblZhbHVlUm93OyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBSyxNQUFNLGdDQUFnQztBQUNsRCxP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