// Copyright 2014-2022, University of Colorado Boulder

/**
 * Scenery Node representing a Control Panel with check Boxes and Sliders that controls properties of My Line
 *
 * @author Martin Veillette (Berea College)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import merge from '../../../../phet-core/js/merge.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import { HStrut, Node, SceneryConstants, Text, VBox } from '../../../../scenery/js/imports.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Panel from '../../../../sun/js/Panel.js';
import VSlider from '../../../../sun/js/VSlider.js';
import leastSquaresRegression from '../../leastSquaresRegression.js';
import LeastSquaresRegressionStrings from '../../LeastSquaresRegressionStrings.js';
import LeastSquaresRegressionConstants from '../LeastSquaresRegressionConstants.js';
import EquationNode from './EquationNode.js';
import SumOfSquaredResidualsChart from './SumOfSquaredResidualsChart.js';
const aString = LeastSquaresRegressionStrings.a;
const bString = LeastSquaresRegressionStrings.b;
const myLineString = LeastSquaresRegressionStrings.myLine;
const residualsString = LeastSquaresRegressionStrings.residuals;
const squaredResidualsString = LeastSquaresRegressionStrings.squaredResiduals;
const symbolXString = LeastSquaresRegressionStrings.symbol.x;
const symbolYString = LeastSquaresRegressionStrings.symbol.y;

// constants
const SLIDER_OPTIONS = {
  trackFill: 'black',
  trackSize: new Dimension2(2, 190),
  thumbSize: new Dimension2(30, 15),
  thumbTouchAreaXDilation: 8,
  majorTickLength: 18
};
const MAX_WIDTH = 150;
class MyLineControlPanel extends Panel {
  /**
   *
   * @param {Graph} graph
   * @param {Array.<DataPoint>} dataPoints
   * @param {Emitter} dataPointsAddedEmitter
   * @param {Object} [options]
   */
  constructor(graph, dataPoints, dataPointsAddedEmitter, options) {
    // Create a mutable equation y = {1} x + {2} , the slope and intercept are updated later
    // max width determined empirically, and there are 6 elements that make up the equation node
    const equationCharacterMaxWidth = MAX_WIDTH / 6;
    const equationText = new EquationNode({
      maxCharacterWidth: equationCharacterMaxWidth
    });

    /**
     * Function that updates the value of the current slope (based on the angle of the line)
     * @param {number} angle
     */
    function updateTextSlope(angle) {
      const slope = graph.slope(angle);
      equationText.setSlopeText(slope * graph.slopeFactor);
    }

    /**
     * Function that updates the value of the intercept
     * @param {number} intercept
     */
    function updateTextIntercept(intercept) {
      equationText.setInterceptText(intercept * graph.interceptFactor + graph.interceptOffset);
    }
    updateTextIntercept(0);
    updateTextSlope(0);

    // Create an immutable equation y = a x + b
    const blackOptions = {
      font: LeastSquaresRegressionConstants.TEXT_FONT,
      fill: 'black',
      maxWidth: equationCharacterMaxWidth
    };
    const boldOptions = {
      font: LeastSquaresRegressionConstants.TEXT_BOLD_FONT,
      fill: LeastSquaresRegressionConstants.MY_LINE_COLOR.BASE_COLOR,
      maxWidth: equationCharacterMaxWidth
    };
    const yText = new Text(symbolYString, blackOptions); // 'y'
    const equalText = new Text('=', blackOptions); // the '=' sign
    const aText = new Text(aString, boldOptions); // a number
    const xText = new Text(symbolXString, blackOptions); // 'x'
    const signInterceptText = new Text(MathSymbols.PLUS, blackOptions); // '+'
    const bText = new Text(bString, boldOptions); // a number

    const immutableEquationText = new Node({
      children: [yText, equalText, aText, xText, signInterceptText, bText]
    });

    // Layout the immutable equation
    yText.left = equationText.yText.left;
    equalText.left = equationText.equalText.left;
    aText.center = equationText.valueSlopeText.center;
    xText.left = equationText.xText.left;
    signInterceptText.left = equationText.signInterceptText.left;
    bText.center = equationText.valueInterceptText.center;

    // create the equation panel with white background
    const equationPanel = new Panel(equationText, {
      fill: 'white',
      cornerRadius: LeastSquaresRegressionConstants.SMALL_PANEL_CORNER_RADIUS,
      stroke: LeastSquaresRegressionConstants.SMALL_PANEL_STROKE,
      resize: false
    });

    // Create two sliders: The aSlider controls the angle of the line and by proxy the slope, the bSlider controls the intercept
    const sliderInterceptRange = new Range(-1.5 * graph.bounds.maxY, 1.5 * graph.bounds.maxY);
    const maxSlope = 10; // determines the maximum slope (using the graph bounds as reference, i.e. the unit square)

    const aSlider = new VSlider(graph.angleProperty, new Range(-Math.atan(maxSlope), Math.atan(maxSlope)), SLIDER_OPTIONS);
    aSlider.addMajorTick(0);
    const bSlider = new VSlider(graph.interceptProperty, sliderInterceptRange, SLIDER_OPTIONS);
    bSlider.addMajorTick(0);

    // Create label below the sliders
    const aSliderText = new Text(aString, merge({
      maxWidth: MAX_WIDTH
    }, boldOptions));
    const bSliderText = new Text(bString, merge({
      maxWidth: MAX_WIDTH
    }, boldOptions));

    // collect the immutable equation, the mutable equation and the sliders in one node
    const rightAlignedNode = new Node();
    const hStrut = new HStrut(20);
    rightAlignedNode.addChild(equationPanel);
    rightAlignedNode.addChild(immutableEquationText);
    rightAlignedNode.addChild(aSlider);
    rightAlignedNode.addChild(bSlider);
    rightAlignedNode.addChild(aSliderText);
    rightAlignedNode.addChild(bSliderText);
    rightAlignedNode.addChild(hStrut);

    // Create three checkboxes
    const checkboxTextOptions = {
      font: LeastSquaresRegressionConstants.CHECKBOX_TEXT_FONT,
      maxWidth: MAX_WIDTH
    };
    const lineCheckbox = new Checkbox(graph.myLineVisibleProperty, new Text(myLineString, checkboxTextOptions));
    const residualsCheckbox = new Checkbox(graph.myLineShowResidualsProperty, new Text(residualsString, checkboxTextOptions));
    const squaredResidualsCheckbox = new Checkbox(graph.myLineShowSquaredResidualsProperty, new Text(squaredResidualsString, checkboxTextOptions));

    // Expand the touch Area
    lineCheckbox.touchArea = lineCheckbox.localBounds.dilatedXY(8, 8);
    residualsCheckbox.touchArea = residualsCheckbox.localBounds.dilatedXY(8, 8);
    squaredResidualsCheckbox.touchArea = squaredResidualsCheckbox.localBounds.dilatedXY(8, 8);

    // Create the barometer chart for the sum of the squares
    const sumOfSquaredResiduals = new SumOfSquaredResidualsChart(graph, graph.getMyLineSumOfSquaredResiduals.bind(graph), dataPointsAddedEmitter, LeastSquaresRegressionConstants.MY_LINE_COLOR.SUM_OF_SQUARES_COLOR, graph.myLineSquaredResidualsVisibleProperty, {
      maxLabelWidth: MAX_WIDTH
    });

    // assemble all the previous nodes in a vertical box
    const mainBox = new VBox({
      spacing: 10,
      children: [lineCheckbox, rightAlignedNode, residualsCheckbox, squaredResidualsCheckbox, sumOfSquaredResiduals],
      align: 'left',
      excludeInvisibleChildrenFromBounds: false
    });

    // layout the internal nodes of the right Aligned Node
    equationPanel.left = hStrut.right;
    equationPanel.top = lineCheckbox.bottom;
    immutableEquationText.top = equationPanel.bottom + 12;
    immutableEquationText.left = equationPanel.left + 5;
    aSlider.top = immutableEquationText.bottom + 10;
    bSlider.top = immutableEquationText.bottom + 10;
    aSlider.centerX = immutableEquationText.left + aText.centerX;
    bSlider.centerX = immutableEquationText.left + bText.centerX;
    aSliderText.top = aSlider.bottom + 8;
    bSliderText.top = bSlider.bottom + 8;
    aSliderText.centerX = aSlider.centerX;
    bSliderText.centerX = bSlider.centerX;
    super(mainBox, options);

    // Trigger the opacity/non-opacity when checking the myLine checkbox
    graph.myLineVisibleProperty.link(enabled => {
      equationText.visible = enabled;
      aSlider.pickable = enabled; // enable/disable slider
      bSlider.pickable = enabled; // enable/disable slider
      residualsCheckbox.enabled = enabled;
      squaredResidualsCheckbox.enabled = enabled;
      rightAlignedNode.opacity = enabled ? 1 : SceneryConstants.DISABLED_OPACITY;
    });

    // update the text (slope) of the equation when the aSlider is moving
    graph.angleProperty.link(angle => {
      updateTextSlope(angle);
    });

    // update the text (intercept) of the equation when the bSlider is moving
    graph.interceptProperty.link(intercept => {
      updateTextIntercept(intercept);
    });

    // Trigger an update after all the points have been added in bulk to the model
    // Update the equation text
    dataPointsAddedEmitter.addListener(() => {
      updateTextSlope(graph.angleProperty.value);
      updateTextIntercept(graph.interceptProperty.value);
    });

    // @private
    this.sumOfSquaredResiduals = sumOfSquaredResiduals;
  }

  // @public
  reset() {
    this.sumOfSquaredResiduals.reset();
  }
}
leastSquaresRegression.register('MyLineControlPanel', MyLineControlPanel);
export default MyLineControlPanel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEaW1lbnNpb24yIiwiUmFuZ2UiLCJtZXJnZSIsIk1hdGhTeW1ib2xzIiwiSFN0cnV0IiwiTm9kZSIsIlNjZW5lcnlDb25zdGFudHMiLCJUZXh0IiwiVkJveCIsIkNoZWNrYm94IiwiUGFuZWwiLCJWU2xpZGVyIiwibGVhc3RTcXVhcmVzUmVncmVzc2lvbiIsIkxlYXN0U3F1YXJlc1JlZ3Jlc3Npb25TdHJpbmdzIiwiTGVhc3RTcXVhcmVzUmVncmVzc2lvbkNvbnN0YW50cyIsIkVxdWF0aW9uTm9kZSIsIlN1bU9mU3F1YXJlZFJlc2lkdWFsc0NoYXJ0IiwiYVN0cmluZyIsImEiLCJiU3RyaW5nIiwiYiIsIm15TGluZVN0cmluZyIsIm15TGluZSIsInJlc2lkdWFsc1N0cmluZyIsInJlc2lkdWFscyIsInNxdWFyZWRSZXNpZHVhbHNTdHJpbmciLCJzcXVhcmVkUmVzaWR1YWxzIiwic3ltYm9sWFN0cmluZyIsInN5bWJvbCIsIngiLCJzeW1ib2xZU3RyaW5nIiwieSIsIlNMSURFUl9PUFRJT05TIiwidHJhY2tGaWxsIiwidHJhY2tTaXplIiwidGh1bWJTaXplIiwidGh1bWJUb3VjaEFyZWFYRGlsYXRpb24iLCJtYWpvclRpY2tMZW5ndGgiLCJNQVhfV0lEVEgiLCJNeUxpbmVDb250cm9sUGFuZWwiLCJjb25zdHJ1Y3RvciIsImdyYXBoIiwiZGF0YVBvaW50cyIsImRhdGFQb2ludHNBZGRlZEVtaXR0ZXIiLCJvcHRpb25zIiwiZXF1YXRpb25DaGFyYWN0ZXJNYXhXaWR0aCIsImVxdWF0aW9uVGV4dCIsIm1heENoYXJhY3RlcldpZHRoIiwidXBkYXRlVGV4dFNsb3BlIiwiYW5nbGUiLCJzbG9wZSIsInNldFNsb3BlVGV4dCIsInNsb3BlRmFjdG9yIiwidXBkYXRlVGV4dEludGVyY2VwdCIsImludGVyY2VwdCIsInNldEludGVyY2VwdFRleHQiLCJpbnRlcmNlcHRGYWN0b3IiLCJpbnRlcmNlcHRPZmZzZXQiLCJibGFja09wdGlvbnMiLCJmb250IiwiVEVYVF9GT05UIiwiZmlsbCIsIm1heFdpZHRoIiwiYm9sZE9wdGlvbnMiLCJURVhUX0JPTERfRk9OVCIsIk1ZX0xJTkVfQ09MT1IiLCJCQVNFX0NPTE9SIiwieVRleHQiLCJlcXVhbFRleHQiLCJhVGV4dCIsInhUZXh0Iiwic2lnbkludGVyY2VwdFRleHQiLCJQTFVTIiwiYlRleHQiLCJpbW11dGFibGVFcXVhdGlvblRleHQiLCJjaGlsZHJlbiIsImxlZnQiLCJjZW50ZXIiLCJ2YWx1ZVNsb3BlVGV4dCIsInZhbHVlSW50ZXJjZXB0VGV4dCIsImVxdWF0aW9uUGFuZWwiLCJjb3JuZXJSYWRpdXMiLCJTTUFMTF9QQU5FTF9DT1JORVJfUkFESVVTIiwic3Ryb2tlIiwiU01BTExfUEFORUxfU1RST0tFIiwicmVzaXplIiwic2xpZGVySW50ZXJjZXB0UmFuZ2UiLCJib3VuZHMiLCJtYXhZIiwibWF4U2xvcGUiLCJhU2xpZGVyIiwiYW5nbGVQcm9wZXJ0eSIsIk1hdGgiLCJhdGFuIiwiYWRkTWFqb3JUaWNrIiwiYlNsaWRlciIsImludGVyY2VwdFByb3BlcnR5IiwiYVNsaWRlclRleHQiLCJiU2xpZGVyVGV4dCIsInJpZ2h0QWxpZ25lZE5vZGUiLCJoU3RydXQiLCJhZGRDaGlsZCIsImNoZWNrYm94VGV4dE9wdGlvbnMiLCJDSEVDS0JPWF9URVhUX0ZPTlQiLCJsaW5lQ2hlY2tib3giLCJteUxpbmVWaXNpYmxlUHJvcGVydHkiLCJyZXNpZHVhbHNDaGVja2JveCIsIm15TGluZVNob3dSZXNpZHVhbHNQcm9wZXJ0eSIsInNxdWFyZWRSZXNpZHVhbHNDaGVja2JveCIsIm15TGluZVNob3dTcXVhcmVkUmVzaWR1YWxzUHJvcGVydHkiLCJ0b3VjaEFyZWEiLCJsb2NhbEJvdW5kcyIsImRpbGF0ZWRYWSIsInN1bU9mU3F1YXJlZFJlc2lkdWFscyIsImdldE15TGluZVN1bU9mU3F1YXJlZFJlc2lkdWFscyIsImJpbmQiLCJTVU1fT0ZfU1FVQVJFU19DT0xPUiIsIm15TGluZVNxdWFyZWRSZXNpZHVhbHNWaXNpYmxlUHJvcGVydHkiLCJtYXhMYWJlbFdpZHRoIiwibWFpbkJveCIsInNwYWNpbmciLCJhbGlnbiIsImV4Y2x1ZGVJbnZpc2libGVDaGlsZHJlbkZyb21Cb3VuZHMiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsImNlbnRlclgiLCJsaW5rIiwiZW5hYmxlZCIsInZpc2libGUiLCJwaWNrYWJsZSIsIm9wYWNpdHkiLCJESVNBQkxFRF9PUEFDSVRZIiwiYWRkTGlzdGVuZXIiLCJ2YWx1ZSIsInJlc2V0IiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJNeUxpbmVDb250cm9sUGFuZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTQtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogU2NlbmVyeSBOb2RlIHJlcHJlc2VudGluZyBhIENvbnRyb2wgUGFuZWwgd2l0aCBjaGVjayBCb3hlcyBhbmQgU2xpZGVycyB0aGF0IGNvbnRyb2xzIHByb3BlcnRpZXMgb2YgTXkgTGluZVxyXG4gKlxyXG4gKiBAYXV0aG9yIE1hcnRpbiBWZWlsbGV0dGUgKEJlcmVhIENvbGxlZ2UpXHJcbiAqL1xyXG5cclxuaW1wb3J0IERpbWVuc2lvbjIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL0RpbWVuc2lvbjIuanMnO1xyXG5pbXBvcnQgUmFuZ2UgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1JhbmdlLmpzJztcclxuaW1wb3J0IG1lcmdlIGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9tZXJnZS5qcyc7XHJcbmltcG9ydCBNYXRoU3ltYm9scyBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMvTWF0aFN5bWJvbHMuanMnO1xyXG5pbXBvcnQgeyBIU3RydXQsIE5vZGUsIFNjZW5lcnlDb25zdGFudHMsIFRleHQsIFZCb3ggfSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnLi4vLi4vLi4vLi4vc3VuL2pzL0NoZWNrYm94LmpzJztcclxuaW1wb3J0IFBhbmVsIGZyb20gJy4uLy4uLy4uLy4uL3N1bi9qcy9QYW5lbC5qcyc7XHJcbmltcG9ydCBWU2xpZGVyIGZyb20gJy4uLy4uLy4uLy4uL3N1bi9qcy9WU2xpZGVyLmpzJztcclxuaW1wb3J0IGxlYXN0U3F1YXJlc1JlZ3Jlc3Npb24gZnJvbSAnLi4vLi4vbGVhc3RTcXVhcmVzUmVncmVzc2lvbi5qcyc7XHJcbmltcG9ydCBMZWFzdFNxdWFyZXNSZWdyZXNzaW9uU3RyaW5ncyBmcm9tICcuLi8uLi9MZWFzdFNxdWFyZXNSZWdyZXNzaW9uU3RyaW5ncy5qcyc7XHJcbmltcG9ydCBMZWFzdFNxdWFyZXNSZWdyZXNzaW9uQ29uc3RhbnRzIGZyb20gJy4uL0xlYXN0U3F1YXJlc1JlZ3Jlc3Npb25Db25zdGFudHMuanMnO1xyXG5pbXBvcnQgRXF1YXRpb25Ob2RlIGZyb20gJy4vRXF1YXRpb25Ob2RlLmpzJztcclxuaW1wb3J0IFN1bU9mU3F1YXJlZFJlc2lkdWFsc0NoYXJ0IGZyb20gJy4vU3VtT2ZTcXVhcmVkUmVzaWR1YWxzQ2hhcnQuanMnO1xyXG5cclxuY29uc3QgYVN0cmluZyA9IExlYXN0U3F1YXJlc1JlZ3Jlc3Npb25TdHJpbmdzLmE7XHJcbmNvbnN0IGJTdHJpbmcgPSBMZWFzdFNxdWFyZXNSZWdyZXNzaW9uU3RyaW5ncy5iO1xyXG5jb25zdCBteUxpbmVTdHJpbmcgPSBMZWFzdFNxdWFyZXNSZWdyZXNzaW9uU3RyaW5ncy5teUxpbmU7XHJcbmNvbnN0IHJlc2lkdWFsc1N0cmluZyA9IExlYXN0U3F1YXJlc1JlZ3Jlc3Npb25TdHJpbmdzLnJlc2lkdWFscztcclxuY29uc3Qgc3F1YXJlZFJlc2lkdWFsc1N0cmluZyA9IExlYXN0U3F1YXJlc1JlZ3Jlc3Npb25TdHJpbmdzLnNxdWFyZWRSZXNpZHVhbHM7XHJcbmNvbnN0IHN5bWJvbFhTdHJpbmcgPSBMZWFzdFNxdWFyZXNSZWdyZXNzaW9uU3RyaW5ncy5zeW1ib2wueDtcclxuY29uc3Qgc3ltYm9sWVN0cmluZyA9IExlYXN0U3F1YXJlc1JlZ3Jlc3Npb25TdHJpbmdzLnN5bWJvbC55O1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IFNMSURFUl9PUFRJT05TID0ge1xyXG4gIHRyYWNrRmlsbDogJ2JsYWNrJyxcclxuICB0cmFja1NpemU6IG5ldyBEaW1lbnNpb24yKCAyLCAxOTAgKSxcclxuICB0aHVtYlNpemU6IG5ldyBEaW1lbnNpb24yKCAzMCwgMTUgKSxcclxuICB0aHVtYlRvdWNoQXJlYVhEaWxhdGlvbjogOCxcclxuICBtYWpvclRpY2tMZW5ndGg6IDE4XHJcbn07XHJcbmNvbnN0IE1BWF9XSURUSCA9IDE1MDtcclxuXHJcbmNsYXNzIE15TGluZUNvbnRyb2xQYW5lbCBleHRlbmRzIFBhbmVsIHtcclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7R3JhcGh9IGdyYXBoXHJcbiAgICogQHBhcmFtIHtBcnJheS48RGF0YVBvaW50Pn0gZGF0YVBvaW50c1xyXG4gICAqIEBwYXJhbSB7RW1pdHRlcn0gZGF0YVBvaW50c0FkZGVkRW1pdHRlclxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggZ3JhcGgsIGRhdGFQb2ludHMsIGRhdGFQb2ludHNBZGRlZEVtaXR0ZXIsIG9wdGlvbnMgKSB7XHJcblxyXG5cclxuICAgIC8vIENyZWF0ZSBhIG11dGFibGUgZXF1YXRpb24geSA9IHsxfSB4ICsgezJ9ICwgdGhlIHNsb3BlIGFuZCBpbnRlcmNlcHQgYXJlIHVwZGF0ZWQgbGF0ZXJcclxuICAgIC8vIG1heCB3aWR0aCBkZXRlcm1pbmVkIGVtcGlyaWNhbGx5LCBhbmQgdGhlcmUgYXJlIDYgZWxlbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBlcXVhdGlvbiBub2RlXHJcbiAgICBjb25zdCBlcXVhdGlvbkNoYXJhY3Rlck1heFdpZHRoID0gTUFYX1dJRFRIIC8gNjtcclxuICAgIGNvbnN0IGVxdWF0aW9uVGV4dCA9IG5ldyBFcXVhdGlvbk5vZGUoIHsgbWF4Q2hhcmFjdGVyV2lkdGg6IGVxdWF0aW9uQ2hhcmFjdGVyTWF4V2lkdGggfSApO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdGhhdCB1cGRhdGVzIHRoZSB2YWx1ZSBvZiB0aGUgY3VycmVudCBzbG9wZSAoYmFzZWQgb24gdGhlIGFuZ2xlIG9mIHRoZSBsaW5lKVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRleHRTbG9wZSggYW5nbGUgKSB7XHJcbiAgICAgIGNvbnN0IHNsb3BlID0gZ3JhcGguc2xvcGUoIGFuZ2xlICk7XHJcbiAgICAgIGVxdWF0aW9uVGV4dC5zZXRTbG9wZVRleHQoIHNsb3BlICogZ3JhcGguc2xvcGVGYWN0b3IgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRoYXQgdXBkYXRlcyB0aGUgdmFsdWUgb2YgdGhlIGludGVyY2VwdFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGludGVyY2VwdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVUZXh0SW50ZXJjZXB0KCBpbnRlcmNlcHQgKSB7XHJcbiAgICAgIGVxdWF0aW9uVGV4dC5zZXRJbnRlcmNlcHRUZXh0KCBpbnRlcmNlcHQgKiBncmFwaC5pbnRlcmNlcHRGYWN0b3IgKyBncmFwaC5pbnRlcmNlcHRPZmZzZXQgKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVUZXh0SW50ZXJjZXB0KCAwICk7XHJcbiAgICB1cGRhdGVUZXh0U2xvcGUoIDAgKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgYW4gaW1tdXRhYmxlIGVxdWF0aW9uIHkgPSBhIHggKyBiXHJcbiAgICBjb25zdCBibGFja09wdGlvbnMgPSB7XHJcbiAgICAgIGZvbnQ6IExlYXN0U3F1YXJlc1JlZ3Jlc3Npb25Db25zdGFudHMuVEVYVF9GT05ULFxyXG4gICAgICBmaWxsOiAnYmxhY2snLFxyXG4gICAgICBtYXhXaWR0aDogZXF1YXRpb25DaGFyYWN0ZXJNYXhXaWR0aFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGJvbGRPcHRpb25zID0ge1xyXG4gICAgICBmb250OiBMZWFzdFNxdWFyZXNSZWdyZXNzaW9uQ29uc3RhbnRzLlRFWFRfQk9MRF9GT05ULFxyXG4gICAgICBmaWxsOiBMZWFzdFNxdWFyZXNSZWdyZXNzaW9uQ29uc3RhbnRzLk1ZX0xJTkVfQ09MT1IuQkFTRV9DT0xPUixcclxuICAgICAgbWF4V2lkdGg6IGVxdWF0aW9uQ2hhcmFjdGVyTWF4V2lkdGhcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgeVRleHQgPSBuZXcgVGV4dCggc3ltYm9sWVN0cmluZywgYmxhY2tPcHRpb25zICk7IC8vICd5J1xyXG4gICAgY29uc3QgZXF1YWxUZXh0ID0gbmV3IFRleHQoICc9JywgYmxhY2tPcHRpb25zICk7IC8vIHRoZSAnPScgc2lnblxyXG4gICAgY29uc3QgYVRleHQgPSBuZXcgVGV4dCggYVN0cmluZywgYm9sZE9wdGlvbnMgKTsgLy8gYSBudW1iZXJcclxuICAgIGNvbnN0IHhUZXh0ID0gbmV3IFRleHQoIHN5bWJvbFhTdHJpbmcsIGJsYWNrT3B0aW9ucyApOyAvLyAneCdcclxuICAgIGNvbnN0IHNpZ25JbnRlcmNlcHRUZXh0ID0gbmV3IFRleHQoIE1hdGhTeW1ib2xzLlBMVVMsIGJsYWNrT3B0aW9ucyApOy8vICcrJ1xyXG4gICAgY29uc3QgYlRleHQgPSBuZXcgVGV4dCggYlN0cmluZywgYm9sZE9wdGlvbnMgKTsvLyBhIG51bWJlclxyXG5cclxuICAgIGNvbnN0IGltbXV0YWJsZUVxdWF0aW9uVGV4dCA9IG5ldyBOb2RlKCB7XHJcbiAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgeVRleHQsXHJcbiAgICAgICAgZXF1YWxUZXh0LFxyXG4gICAgICAgIGFUZXh0LFxyXG4gICAgICAgIHhUZXh0LFxyXG4gICAgICAgIHNpZ25JbnRlcmNlcHRUZXh0LFxyXG4gICAgICAgIGJUZXh0XHJcbiAgICAgIF1cclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBMYXlvdXQgdGhlIGltbXV0YWJsZSBlcXVhdGlvblxyXG4gICAgeVRleHQubGVmdCA9IGVxdWF0aW9uVGV4dC55VGV4dC5sZWZ0O1xyXG4gICAgZXF1YWxUZXh0LmxlZnQgPSBlcXVhdGlvblRleHQuZXF1YWxUZXh0LmxlZnQ7XHJcbiAgICBhVGV4dC5jZW50ZXIgPSBlcXVhdGlvblRleHQudmFsdWVTbG9wZVRleHQuY2VudGVyO1xyXG4gICAgeFRleHQubGVmdCA9IGVxdWF0aW9uVGV4dC54VGV4dC5sZWZ0O1xyXG4gICAgc2lnbkludGVyY2VwdFRleHQubGVmdCA9IGVxdWF0aW9uVGV4dC5zaWduSW50ZXJjZXB0VGV4dC5sZWZ0O1xyXG4gICAgYlRleHQuY2VudGVyID0gZXF1YXRpb25UZXh0LnZhbHVlSW50ZXJjZXB0VGV4dC5jZW50ZXI7XHJcblxyXG4gICAgLy8gY3JlYXRlIHRoZSBlcXVhdGlvbiBwYW5lbCB3aXRoIHdoaXRlIGJhY2tncm91bmRcclxuICAgIGNvbnN0IGVxdWF0aW9uUGFuZWwgPSBuZXcgUGFuZWwoIGVxdWF0aW9uVGV4dCwge1xyXG4gICAgICBmaWxsOiAnd2hpdGUnLFxyXG4gICAgICBjb3JuZXJSYWRpdXM6IExlYXN0U3F1YXJlc1JlZ3Jlc3Npb25Db25zdGFudHMuU01BTExfUEFORUxfQ09STkVSX1JBRElVUyxcclxuICAgICAgc3Ryb2tlOiBMZWFzdFNxdWFyZXNSZWdyZXNzaW9uQ29uc3RhbnRzLlNNQUxMX1BBTkVMX1NUUk9LRSxcclxuICAgICAgcmVzaXplOiBmYWxzZVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIENyZWF0ZSB0d28gc2xpZGVyczogVGhlIGFTbGlkZXIgY29udHJvbHMgdGhlIGFuZ2xlIG9mIHRoZSBsaW5lIGFuZCBieSBwcm94eSB0aGUgc2xvcGUsIHRoZSBiU2xpZGVyIGNvbnRyb2xzIHRoZSBpbnRlcmNlcHRcclxuICAgIGNvbnN0IHNsaWRlckludGVyY2VwdFJhbmdlID0gbmV3IFJhbmdlKCAtMS41ICogZ3JhcGguYm91bmRzLm1heFksIDEuNSAqIGdyYXBoLmJvdW5kcy5tYXhZICk7XHJcbiAgICBjb25zdCBtYXhTbG9wZSA9IDEwOyAvLyBkZXRlcm1pbmVzIHRoZSBtYXhpbXVtIHNsb3BlICh1c2luZyB0aGUgZ3JhcGggYm91bmRzIGFzIHJlZmVyZW5jZSwgaS5lLiB0aGUgdW5pdCBzcXVhcmUpXHJcblxyXG4gICAgY29uc3QgYVNsaWRlciA9IG5ldyBWU2xpZGVyKCBncmFwaC5hbmdsZVByb3BlcnR5LCBuZXcgUmFuZ2UoIC1NYXRoLmF0YW4oIG1heFNsb3BlICksIE1hdGguYXRhbiggbWF4U2xvcGUgKSApLCBTTElERVJfT1BUSU9OUyApO1xyXG4gICAgYVNsaWRlci5hZGRNYWpvclRpY2soIDAgKTtcclxuICAgIGNvbnN0IGJTbGlkZXIgPSBuZXcgVlNsaWRlciggZ3JhcGguaW50ZXJjZXB0UHJvcGVydHksIHNsaWRlckludGVyY2VwdFJhbmdlLCBTTElERVJfT1BUSU9OUyApO1xyXG4gICAgYlNsaWRlci5hZGRNYWpvclRpY2soIDAgKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgbGFiZWwgYmVsb3cgdGhlIHNsaWRlcnNcclxuICAgIGNvbnN0IGFTbGlkZXJUZXh0ID0gbmV3IFRleHQoIGFTdHJpbmcsIG1lcmdlKCB7IG1heFdpZHRoOiBNQVhfV0lEVEggfSwgYm9sZE9wdGlvbnMgKSApO1xyXG4gICAgY29uc3QgYlNsaWRlclRleHQgPSBuZXcgVGV4dCggYlN0cmluZywgbWVyZ2UoIHsgbWF4V2lkdGg6IE1BWF9XSURUSCB9LCBib2xkT3B0aW9ucyApICk7XHJcblxyXG4gICAgLy8gY29sbGVjdCB0aGUgaW1tdXRhYmxlIGVxdWF0aW9uLCB0aGUgbXV0YWJsZSBlcXVhdGlvbiBhbmQgdGhlIHNsaWRlcnMgaW4gb25lIG5vZGVcclxuICAgIGNvbnN0IHJpZ2h0QWxpZ25lZE5vZGUgPSBuZXcgTm9kZSgpO1xyXG4gICAgY29uc3QgaFN0cnV0ID0gbmV3IEhTdHJ1dCggMjAgKTtcclxuICAgIHJpZ2h0QWxpZ25lZE5vZGUuYWRkQ2hpbGQoIGVxdWF0aW9uUGFuZWwgKTtcclxuICAgIHJpZ2h0QWxpZ25lZE5vZGUuYWRkQ2hpbGQoIGltbXV0YWJsZUVxdWF0aW9uVGV4dCApO1xyXG4gICAgcmlnaHRBbGlnbmVkTm9kZS5hZGRDaGlsZCggYVNsaWRlciApO1xyXG4gICAgcmlnaHRBbGlnbmVkTm9kZS5hZGRDaGlsZCggYlNsaWRlciApO1xyXG4gICAgcmlnaHRBbGlnbmVkTm9kZS5hZGRDaGlsZCggYVNsaWRlclRleHQgKTtcclxuICAgIHJpZ2h0QWxpZ25lZE5vZGUuYWRkQ2hpbGQoIGJTbGlkZXJUZXh0ICk7XHJcbiAgICByaWdodEFsaWduZWROb2RlLmFkZENoaWxkKCBoU3RydXQgKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgdGhyZWUgY2hlY2tib3hlc1xyXG4gICAgY29uc3QgY2hlY2tib3hUZXh0T3B0aW9ucyA9IHsgZm9udDogTGVhc3RTcXVhcmVzUmVncmVzc2lvbkNvbnN0YW50cy5DSEVDS0JPWF9URVhUX0ZPTlQsIG1heFdpZHRoOiBNQVhfV0lEVEggfTtcclxuICAgIGNvbnN0IGxpbmVDaGVja2JveCA9IG5ldyBDaGVja2JveCggZ3JhcGgubXlMaW5lVmlzaWJsZVByb3BlcnR5LCBuZXcgVGV4dCggbXlMaW5lU3RyaW5nLCBjaGVja2JveFRleHRPcHRpb25zICkgKTtcclxuICAgIGNvbnN0IHJlc2lkdWFsc0NoZWNrYm94ID0gbmV3IENoZWNrYm94KCBncmFwaC5teUxpbmVTaG93UmVzaWR1YWxzUHJvcGVydHksIG5ldyBUZXh0KCByZXNpZHVhbHNTdHJpbmcsIGNoZWNrYm94VGV4dE9wdGlvbnMgKSApO1xyXG4gICAgY29uc3Qgc3F1YXJlZFJlc2lkdWFsc0NoZWNrYm94ID0gbmV3IENoZWNrYm94KCBncmFwaC5teUxpbmVTaG93U3F1YXJlZFJlc2lkdWFsc1Byb3BlcnR5LCBuZXcgVGV4dCggc3F1YXJlZFJlc2lkdWFsc1N0cmluZywgY2hlY2tib3hUZXh0T3B0aW9ucyApICk7XHJcblxyXG4gICAgLy8gRXhwYW5kIHRoZSB0b3VjaCBBcmVhXHJcbiAgICBsaW5lQ2hlY2tib3gudG91Y2hBcmVhID0gbGluZUNoZWNrYm94LmxvY2FsQm91bmRzLmRpbGF0ZWRYWSggOCwgOCApO1xyXG4gICAgcmVzaWR1YWxzQ2hlY2tib3gudG91Y2hBcmVhID0gcmVzaWR1YWxzQ2hlY2tib3gubG9jYWxCb3VuZHMuZGlsYXRlZFhZKCA4LCA4ICk7XHJcbiAgICBzcXVhcmVkUmVzaWR1YWxzQ2hlY2tib3gudG91Y2hBcmVhID0gc3F1YXJlZFJlc2lkdWFsc0NoZWNrYm94LmxvY2FsQm91bmRzLmRpbGF0ZWRYWSggOCwgOCApO1xyXG5cclxuICAgIC8vIENyZWF0ZSB0aGUgYmFyb21ldGVyIGNoYXJ0IGZvciB0aGUgc3VtIG9mIHRoZSBzcXVhcmVzXHJcbiAgICBjb25zdCBzdW1PZlNxdWFyZWRSZXNpZHVhbHMgPSBuZXcgU3VtT2ZTcXVhcmVkUmVzaWR1YWxzQ2hhcnQoXHJcbiAgICAgIGdyYXBoLFxyXG4gICAgICBncmFwaC5nZXRNeUxpbmVTdW1PZlNxdWFyZWRSZXNpZHVhbHMuYmluZCggZ3JhcGggKSxcclxuICAgICAgZGF0YVBvaW50c0FkZGVkRW1pdHRlcixcclxuICAgICAgTGVhc3RTcXVhcmVzUmVncmVzc2lvbkNvbnN0YW50cy5NWV9MSU5FX0NPTE9SLlNVTV9PRl9TUVVBUkVTX0NPTE9SLFxyXG4gICAgICBncmFwaC5teUxpbmVTcXVhcmVkUmVzaWR1YWxzVmlzaWJsZVByb3BlcnR5LCB7XHJcbiAgICAgICAgbWF4TGFiZWxXaWR0aDogTUFYX1dJRFRIXHJcbiAgICAgIH0gKTtcclxuXHJcbiAgICAvLyBhc3NlbWJsZSBhbGwgdGhlIHByZXZpb3VzIG5vZGVzIGluIGEgdmVydGljYWwgYm94XHJcbiAgICBjb25zdCBtYWluQm94ID0gbmV3IFZCb3goIHtcclxuICAgICAgc3BhY2luZzogMTAsXHJcbiAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgbGluZUNoZWNrYm94LFxyXG4gICAgICAgIHJpZ2h0QWxpZ25lZE5vZGUsXHJcbiAgICAgICAgcmVzaWR1YWxzQ2hlY2tib3gsXHJcbiAgICAgICAgc3F1YXJlZFJlc2lkdWFsc0NoZWNrYm94LFxyXG4gICAgICAgIHN1bU9mU3F1YXJlZFJlc2lkdWFsc1xyXG4gICAgICBdLFxyXG4gICAgICBhbGlnbjogJ2xlZnQnLFxyXG4gICAgICBleGNsdWRlSW52aXNpYmxlQ2hpbGRyZW5Gcm9tQm91bmRzOiBmYWxzZVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIGxheW91dCB0aGUgaW50ZXJuYWwgbm9kZXMgb2YgdGhlIHJpZ2h0IEFsaWduZWQgTm9kZVxyXG4gICAgZXF1YXRpb25QYW5lbC5sZWZ0ID0gaFN0cnV0LnJpZ2h0O1xyXG4gICAgZXF1YXRpb25QYW5lbC50b3AgPSBsaW5lQ2hlY2tib3guYm90dG9tO1xyXG4gICAgaW1tdXRhYmxlRXF1YXRpb25UZXh0LnRvcCA9IGVxdWF0aW9uUGFuZWwuYm90dG9tICsgMTI7XHJcbiAgICBpbW11dGFibGVFcXVhdGlvblRleHQubGVmdCA9IGVxdWF0aW9uUGFuZWwubGVmdCArIDU7XHJcbiAgICBhU2xpZGVyLnRvcCA9IGltbXV0YWJsZUVxdWF0aW9uVGV4dC5ib3R0b20gKyAxMDtcclxuICAgIGJTbGlkZXIudG9wID0gaW1tdXRhYmxlRXF1YXRpb25UZXh0LmJvdHRvbSArIDEwO1xyXG4gICAgYVNsaWRlci5jZW50ZXJYID0gaW1tdXRhYmxlRXF1YXRpb25UZXh0LmxlZnQgKyBhVGV4dC5jZW50ZXJYO1xyXG4gICAgYlNsaWRlci5jZW50ZXJYID0gaW1tdXRhYmxlRXF1YXRpb25UZXh0LmxlZnQgKyBiVGV4dC5jZW50ZXJYO1xyXG4gICAgYVNsaWRlclRleHQudG9wID0gYVNsaWRlci5ib3R0b20gKyA4O1xyXG4gICAgYlNsaWRlclRleHQudG9wID0gYlNsaWRlci5ib3R0b20gKyA4O1xyXG4gICAgYVNsaWRlclRleHQuY2VudGVyWCA9IGFTbGlkZXIuY2VudGVyWDtcclxuICAgIGJTbGlkZXJUZXh0LmNlbnRlclggPSBiU2xpZGVyLmNlbnRlclg7XHJcblxyXG4gICAgc3VwZXIoIG1haW5Cb3gsIG9wdGlvbnMgKTtcclxuXHJcbiAgICAvLyBUcmlnZ2VyIHRoZSBvcGFjaXR5L25vbi1vcGFjaXR5IHdoZW4gY2hlY2tpbmcgdGhlIG15TGluZSBjaGVja2JveFxyXG4gICAgZ3JhcGgubXlMaW5lVmlzaWJsZVByb3BlcnR5LmxpbmsoIGVuYWJsZWQgPT4ge1xyXG4gICAgICBlcXVhdGlvblRleHQudmlzaWJsZSA9IGVuYWJsZWQ7XHJcbiAgICAgIGFTbGlkZXIucGlja2FibGUgPSBlbmFibGVkOyAvLyBlbmFibGUvZGlzYWJsZSBzbGlkZXJcclxuICAgICAgYlNsaWRlci5waWNrYWJsZSA9IGVuYWJsZWQ7Ly8gZW5hYmxlL2Rpc2FibGUgc2xpZGVyXHJcbiAgICAgIHJlc2lkdWFsc0NoZWNrYm94LmVuYWJsZWQgPSBlbmFibGVkO1xyXG4gICAgICBzcXVhcmVkUmVzaWR1YWxzQ2hlY2tib3guZW5hYmxlZCA9IGVuYWJsZWQ7XHJcbiAgICAgIHJpZ2h0QWxpZ25lZE5vZGUub3BhY2l0eSA9IGVuYWJsZWQgPyAxIDogU2NlbmVyeUNvbnN0YW50cy5ESVNBQkxFRF9PUEFDSVRZO1xyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIHVwZGF0ZSB0aGUgdGV4dCAoc2xvcGUpIG9mIHRoZSBlcXVhdGlvbiB3aGVuIHRoZSBhU2xpZGVyIGlzIG1vdmluZ1xyXG4gICAgZ3JhcGguYW5nbGVQcm9wZXJ0eS5saW5rKCBhbmdsZSA9PiB7XHJcbiAgICAgIHVwZGF0ZVRleHRTbG9wZSggYW5nbGUgKTtcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyB1cGRhdGUgdGhlIHRleHQgKGludGVyY2VwdCkgb2YgdGhlIGVxdWF0aW9uIHdoZW4gdGhlIGJTbGlkZXIgaXMgbW92aW5nXHJcbiAgICBncmFwaC5pbnRlcmNlcHRQcm9wZXJ0eS5saW5rKCBpbnRlcmNlcHQgPT4ge1xyXG4gICAgICB1cGRhdGVUZXh0SW50ZXJjZXB0KCBpbnRlcmNlcHQgKTtcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBUcmlnZ2VyIGFuIHVwZGF0ZSBhZnRlciBhbGwgdGhlIHBvaW50cyBoYXZlIGJlZW4gYWRkZWQgaW4gYnVsayB0byB0aGUgbW9kZWxcclxuICAgIC8vIFVwZGF0ZSB0aGUgZXF1YXRpb24gdGV4dFxyXG4gICAgZGF0YVBvaW50c0FkZGVkRW1pdHRlci5hZGRMaXN0ZW5lciggKCkgPT4ge1xyXG4gICAgICB1cGRhdGVUZXh0U2xvcGUoIGdyYXBoLmFuZ2xlUHJvcGVydHkudmFsdWUgKTtcclxuICAgICAgdXBkYXRlVGV4dEludGVyY2VwdCggZ3JhcGguaW50ZXJjZXB0UHJvcGVydHkudmFsdWUgKTtcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZVxyXG4gICAgdGhpcy5zdW1PZlNxdWFyZWRSZXNpZHVhbHMgPSBzdW1PZlNxdWFyZWRSZXNpZHVhbHM7XHJcbiAgfVxyXG5cclxuICAvLyBAcHVibGljXHJcbiAgcmVzZXQoKSB7XHJcbiAgICB0aGlzLnN1bU9mU3F1YXJlZFJlc2lkdWFscy5yZXNldCgpO1xyXG4gIH1cclxufVxyXG5cclxubGVhc3RTcXVhcmVzUmVncmVzc2lvbi5yZWdpc3RlciggJ015TGluZUNvbnRyb2xQYW5lbCcsIE15TGluZUNvbnRyb2xQYW5lbCApO1xyXG5leHBvcnQgZGVmYXVsdCBNeUxpbmVDb250cm9sUGFuZWw7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFVBQVUsTUFBTSxrQ0FBa0M7QUFDekQsT0FBT0MsS0FBSyxNQUFNLDZCQUE2QjtBQUMvQyxPQUFPQyxLQUFLLE1BQU0sbUNBQW1DO0FBQ3JELE9BQU9DLFdBQVcsTUFBTSw0Q0FBNEM7QUFDcEUsU0FBU0MsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLGdCQUFnQixFQUFFQyxJQUFJLEVBQUVDLElBQUksUUFBUSxtQ0FBbUM7QUFDOUYsT0FBT0MsUUFBUSxN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