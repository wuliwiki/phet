// Copyright 2014-2022, University of Colorado Boulder

//TODO rename to BestFitLineAccordionBox
/**
 * Accordion Box Node that displays checkboxes associated with properties of Best Fit Line
 * This Node also displays the best Fit Line Equation and the sum of Squares Barometer Chart
 *
 * @author Martin Veillette (Berea College)
 */

import merge from '../../../../phet-core/js/merge.js';
import { HBox, HStrut, SceneryConstants, Text, VBox } from '../../../../scenery/js/imports.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Panel from '../../../../sun/js/Panel.js';
import leastSquaresRegression from '../../leastSquaresRegression.js';
import LeastSquaresRegressionStrings from '../../LeastSquaresRegressionStrings.js';
import LeastSquaresRegressionConstants from '../LeastSquaresRegressionConstants.js';
import EquationNode from './EquationNode.js';
import SumOfSquaredResidualsChart from './SumOfSquaredResidualsChart.js';

// constants
const MAX_LABEL_WIDTH = 120; // max length of label text for i18n

const bestFitLineString = LeastSquaresRegressionStrings.bestFitLine;
const residualsString = LeastSquaresRegressionStrings.residuals;
const squaredResidualsString = LeastSquaresRegressionStrings.squaredResiduals;
class BestFitLineControlPanel extends AccordionBox {
  /**
   * @param {Graph} graph - model of the graph
   * @param {Array.<DataPoint>} dataPoints
   * @param {Emitter} dataPointsAddedEmitter
   * @param {Object} [options]
   */
  constructor(graph, dataPoints, dataPointsAddedEmitter, options) {
    // options for the accordion box
    options = merge({
      cornerRadius: 3,
      buttonXMargin: 10,
      buttonYMargin: 10,
      expandCollapseButtonOptions: {
        touchAreaXDilation: 16,
        touchAreaYDilation: 16
      },
      titleNode: new Text(bestFitLineString, {
        font: LeastSquaresRegressionConstants.TEXT_BOLD_FONT,
        maxWidth: MAX_LABEL_WIDTH
      }),
      titleXMargin: 0,
      contentXMargin: 10,
      contentYMargin: 10
    }, options);

    // Create the chart (barometer) displaying the sum of the squares
    const sumOfSquaredResidualsChart = new SumOfSquaredResidualsChart(graph, graph.getBestFitLineSumOfSquaredResiduals.bind(graph), dataPointsAddedEmitter, LeastSquaresRegressionConstants.BEST_FIT_LINE_COLOR.SUM_OF_SQUARES_COLOR, graph.bestFitLineSquaredResidualsVisibleProperty);

    // Create the 'Best Fit Line' equation
    // initial values set the spacing, the correct values for the slope and the intercept will be updated below
    const equationText = new EquationNode({
      mode: 'bestFitLine'
    });
    equationText.visible = false;
    const equationPanel = new Panel(equationText, {
      fill: 'white',
      stroke: LeastSquaresRegressionConstants.SMALL_PANEL_STROKE,
      cornerRadius: LeastSquaresRegressionConstants.SMALL_PANEL_CORNER_RADIUS,
      resize: false
    });
    const textOptions = {
      font: LeastSquaresRegressionConstants.CHECKBOX_TEXT_FONT,
      maxWidth: MAX_LABEL_WIDTH
    };

    // Create the checkboxes
    const lineCheckbox = new Checkbox(graph.bestFitLineVisibleProperty, new Text(bestFitLineString, textOptions));
    const residualsCheckbox = new Checkbox(graph.bestFitLineShowResidualsProperty, new Text(residualsString, textOptions));
    const squaredResidualsCheckbox = new Checkbox(graph.bestFitLineShowSquaredResidualsProperty, new Text(squaredResidualsString, textOptions));

    // Expand the touch Area
    lineCheckbox.touchArea = lineCheckbox.localBounds.dilatedXY(8, 8);
    residualsCheckbox.touchArea = residualsCheckbox.localBounds.dilatedXY(8, 8);
    squaredResidualsCheckbox.touchArea = squaredResidualsCheckbox.localBounds.dilatedXY(8, 8);

    // Update the control Panel upon a change of the status of the Best Fit Line Checkbox
    // No need to unlink, present for the lifetime of the sim
    graph.bestFitLineVisibleProperty.link(enabled => {
      // Set Equation to invisible if there is less than one point on the graph
      if (graph.isLinearFitDefined()) {
        equationText.visible = enabled;
      }
      equationPanel.opacity = enabled ? 1 : SceneryConstants.DISABLED_OPACITY;
      residualsCheckbox.enabled = enabled;
      squaredResidualsCheckbox.enabled = enabled;
    });
    const content = new VBox({
      spacing: 10,
      children: [lineCheckbox, new HBox({
        children: [new HStrut(20), equationPanel]
      }), residualsCheckbox, squaredResidualsCheckbox, sumOfSquaredResidualsChart],
      excludeInvisibleChildrenFromBounds: false,
      align: 'left'
    });
    super(content, options);

    // @private
    this.graph = graph;
    this.equationText = equationText;
    this.sumOfSquaredResidualsChart = sumOfSquaredResidualsChart;
    this.updateBestFitLineEquation();
  }

  /**
   * @public
   * @override
   */
  reset() {
    this.sumOfSquaredResidualsChart.reset();
    super.reset();
  }

  /**
   * Update the text of the best Fit Line Equation
   * @public
   */
  updateBestFitLineEquation() {
    if (this.graph.isLinearFitDefined()) {
      const linearFitParameters = this.graph.getLinearFit();
      this.equationText.setSlopeText(linearFitParameters.slope * this.graph.slopeFactor);
      this.equationText.setInterceptText(linearFitParameters.intercept * this.graph.interceptFactor + this.graph.interceptOffset);
      if (this.graph.bestFitLineVisibleProperty.value) {
        this.equationText.visible = true;
      }
    } else {
      this.equationText.visible = false;
    }
  }
}
leastSquaresRegression.register('BestFitLineControlPanel', BestFitLineControlPanel);
export default BestFitLineControlPanel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtZXJnZSIsIkhCb3giLCJIU3RydXQiLCJTY2VuZXJ5Q29uc3RhbnRzIiwiVGV4dCIsIlZCb3giLCJBY2NvcmRpb25Cb3giLCJDaGVja2JveCIsIlBhbmVsIiwibGVhc3RTcXVhcmVzUmVncmVzc2lvbiIsIkxlYXN0U3F1YXJlc1JlZ3Jlc3Npb25TdHJpbmdzIiwiTGVhc3RTcXVhcmVzUmVncmVzc2lvbkNvbnN0YW50cyIsIkVxdWF0aW9uTm9kZSIsIlN1bU9mU3F1YXJlZFJlc2lkdWFsc0NoYXJ0IiwiTUFYX0xBQkVMX1dJRFRIIiwiYmVzdEZpdExpbmVTdHJpbmciLCJiZXN0Rml0TGluZSIsInJlc2lkdWFsc1N0cmluZyIsInJlc2lkdWFscyIsInNxdWFyZWRSZXNpZHVhbHNTdHJpbmciLCJzcXVhcmVkUmVzaWR1YWxzIiwiQmVzdEZpdExpbmVDb250cm9sUGFuZWwiLCJjb25zdHJ1Y3RvciIsImdyYXBoIiwiZGF0YVBvaW50cyIsImRhdGFQb2ludHNBZGRlZEVtaXR0ZXIiLCJvcHRpb25zIiwiY29ybmVyUmFkaXVzIiwiYnV0dG9uWE1hcmdpbiIsImJ1dHRvbllNYXJnaW4iLCJleHBhbmRDb2xsYXBzZUJ1dHRvbk9wdGlvbnMiLCJ0b3VjaEFyZWFYRGlsYXRpb24iLCJ0b3VjaEFyZWFZRGlsYXRpb24iLCJ0aXRsZU5vZGUiLCJmb250IiwiVEVYVF9CT0xEX0ZPTlQiLCJtYXhXaWR0aCIsInRpdGxlWE1hcmdpbiIsImNvbnRlbnRYTWFyZ2luIiwiY29udGVudFlNYXJnaW4iLCJzdW1PZlNxdWFyZWRSZXNpZHVhbHNDaGFydCIsImdldEJlc3RGaXRMaW5lU3VtT2ZTcXVhcmVkUmVzaWR1YWxzIiwiYmluZCIsIkJFU1RfRklUX0xJTkVfQ09MT1IiLCJTVU1fT0ZfU1FVQVJFU19DT0xPUiIsImJlc3RGaXRMaW5lU3F1YXJlZFJlc2lkdWFsc1Zpc2libGVQcm9wZXJ0eSIsImVxdWF0aW9uVGV4dCIsIm1vZGUiLCJ2aXNpYmxlIiwiZXF1YXRpb25QYW5lbCIsImZpbGwiLCJzdHJva2UiLCJTTUFMTF9QQU5FTF9TVFJPS0UiLCJTTUFMTF9QQU5FTF9DT1JORVJfUkFESVVTIiwicmVzaXplIiwidGV4dE9wdGlvbnMiLCJDSEVDS0JPWF9URVhUX0ZPTlQiLCJsaW5lQ2hlY2tib3giLCJiZXN0Rml0TGluZVZpc2libGVQcm9wZXJ0eSIsInJlc2lkdWFsc0NoZWNrYm94IiwiYmVzdEZpdExpbmVTaG93UmVzaWR1YWxzUHJvcGVydHkiLCJzcXVhcmVkUmVzaWR1YWxzQ2hlY2tib3giLCJiZXN0Rml0TGluZVNob3dTcXVhcmVkUmVzaWR1YWxzUHJvcGVydHkiLCJ0b3VjaEFyZWEiLCJsb2NhbEJvdW5kcyIsImRpbGF0ZWRYWSIsImxpbmsiLCJlbmFibGVkIiwiaXNMaW5lYXJGaXREZWZpbmVkIiwib3BhY2l0eSIsIkRJU0FCTEVEX09QQUNJVFkiLCJjb250ZW50Iiwic3BhY2luZyIsImNoaWxkcmVuIiwiZXhjbHVkZUludmlzaWJsZUNoaWxkcmVuRnJvbUJvdW5kcyIsImFsaWduIiwidXBkYXRlQmVzdEZpdExpbmVFcXVhdGlvbiIsInJlc2V0IiwibGluZWFyRml0UGFyYW1ldGVycyIsImdldExpbmVhckZpdCIsInNldFNsb3BlVGV4dCIsInNsb3BlIiwic2xvcGVGYWN0b3IiLCJzZXRJbnRlcmNlcHRUZXh0IiwiaW50ZXJjZXB0IiwiaW50ZXJjZXB0RmFjdG9yIiwiaW50ZXJjZXB0T2Zmc2V0IiwidmFsdWUiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkJlc3RGaXRMaW5lQ29udHJvbFBhbmVsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE0LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLy9UT0RPIHJlbmFtZSB0byBCZXN0Rml0TGluZUFjY29yZGlvbkJveFxyXG4vKipcclxuICogQWNjb3JkaW9uIEJveCBOb2RlIHRoYXQgZGlzcGxheXMgY2hlY2tib3hlcyBhc3NvY2lhdGVkIHdpdGggcHJvcGVydGllcyBvZiBCZXN0IEZpdCBMaW5lXHJcbiAqIFRoaXMgTm9kZSBhbHNvIGRpc3BsYXlzIHRoZSBiZXN0IEZpdCBMaW5lIEVxdWF0aW9uIGFuZCB0aGUgc3VtIG9mIFNxdWFyZXMgQmFyb21ldGVyIENoYXJ0XHJcbiAqXHJcbiAqIEBhdXRob3IgTWFydGluIFZlaWxsZXR0ZSAoQmVyZWEgQ29sbGVnZSlcclxuICovXHJcblxyXG5pbXBvcnQgbWVyZ2UgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL21lcmdlLmpzJztcclxuaW1wb3J0IHsgSEJveCwgSFN0cnV0LCBTY2VuZXJ5Q29uc3RhbnRzLCBUZXh0LCBWQm94IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IEFjY29yZGlvbkJveCBmcm9tICcuLi8uLi8uLi8uLi9zdW4vanMvQWNjb3JkaW9uQm94LmpzJztcclxuaW1wb3J0IENoZWNrYm94IGZyb20gJy4uLy4uLy4uLy4uL3N1bi9qcy9DaGVja2JveC5qcyc7XHJcbmltcG9ydCBQYW5lbCBmcm9tICcuLi8uLi8uLi8uLi9zdW4vanMvUGFuZWwuanMnO1xyXG5pbXBvcnQgbGVhc3RTcXVhcmVzUmVncmVzc2lvbiBmcm9tICcuLi8uLi9sZWFzdFNxdWFyZXNSZWdyZXNzaW9uLmpzJztcclxuaW1wb3J0IExlYXN0U3F1YXJlc1JlZ3Jlc3Npb25TdHJpbmdzIGZyb20gJy4uLy4uL0xlYXN0U3F1YXJlc1JlZ3Jlc3Npb25TdHJpbmdzLmpzJztcclxuaW1wb3J0IExlYXN0U3F1YXJlc1JlZ3Jlc3Npb25Db25zdGFudHMgZnJvbSAnLi4vTGVhc3RTcXVhcmVzUmVncmVzc2lvbkNvbnN0YW50cy5qcyc7XHJcbmltcG9ydCBFcXVhdGlvbk5vZGUgZnJvbSAnLi9FcXVhdGlvbk5vZGUuanMnO1xyXG5pbXBvcnQgU3VtT2ZTcXVhcmVkUmVzaWR1YWxzQ2hhcnQgZnJvbSAnLi9TdW1PZlNxdWFyZWRSZXNpZHVhbHNDaGFydC5qcyc7XHJcblxyXG4vLyBjb25zdGFudHNcclxuY29uc3QgTUFYX0xBQkVMX1dJRFRIID0gMTIwOyAvLyBtYXggbGVuZ3RoIG9mIGxhYmVsIHRleHQgZm9yIGkxOG5cclxuXHJcbmNvbnN0IGJlc3RGaXRMaW5lU3RyaW5nID0gTGVhc3RTcXVhcmVzUmVncmVzc2lvblN0cmluZ3MuYmVzdEZpdExpbmU7XHJcbmNvbnN0IHJlc2lkdWFsc1N0cmluZyA9IExlYXN0U3F1YXJlc1JlZ3Jlc3Npb25TdHJpbmdzLnJlc2lkdWFscztcclxuY29uc3Qgc3F1YXJlZFJlc2lkdWFsc1N0cmluZyA9IExlYXN0U3F1YXJlc1JlZ3Jlc3Npb25TdHJpbmdzLnNxdWFyZWRSZXNpZHVhbHM7XHJcblxyXG5jbGFzcyBCZXN0Rml0TGluZUNvbnRyb2xQYW5lbCBleHRlbmRzIEFjY29yZGlvbkJveCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7R3JhcGh9IGdyYXBoIC0gbW9kZWwgb2YgdGhlIGdyYXBoXHJcbiAgICogQHBhcmFtIHtBcnJheS48RGF0YVBvaW50Pn0gZGF0YVBvaW50c1xyXG4gICAqIEBwYXJhbSB7RW1pdHRlcn0gZGF0YVBvaW50c0FkZGVkRW1pdHRlclxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggZ3JhcGgsIGRhdGFQb2ludHMsIGRhdGFQb2ludHNBZGRlZEVtaXR0ZXIsIG9wdGlvbnMgKSB7XHJcblxyXG4gICAgLy8gb3B0aW9ucyBmb3IgdGhlIGFjY29yZGlvbiBib3hcclxuICAgIG9wdGlvbnMgPSBtZXJnZSgge1xyXG4gICAgICBjb3JuZXJSYWRpdXM6IDMsXHJcbiAgICAgIGJ1dHRvblhNYXJnaW46IDEwLFxyXG4gICAgICBidXR0b25ZTWFyZ2luOiAxMCxcclxuICAgICAgZXhwYW5kQ29sbGFwc2VCdXR0b25PcHRpb25zOiB7XHJcbiAgICAgICAgdG91Y2hBcmVhWERpbGF0aW9uOiAxNixcclxuICAgICAgICB0b3VjaEFyZWFZRGlsYXRpb246IDE2XHJcbiAgICAgIH0sXHJcbiAgICAgIHRpdGxlTm9kZTogbmV3IFRleHQoIGJlc3RGaXRMaW5lU3RyaW5nLCB7XHJcbiAgICAgICAgZm9udDogTGVhc3RTcXVhcmVzUmVncmVzc2lvbkNvbnN0YW50cy5URVhUX0JPTERfRk9OVCxcclxuICAgICAgICBtYXhXaWR0aDogTUFYX0xBQkVMX1dJRFRIXHJcbiAgICAgIH0gKSxcclxuICAgICAgdGl0bGVYTWFyZ2luOiAwLFxyXG4gICAgICBjb250ZW50WE1hcmdpbjogMTAsXHJcbiAgICAgIGNvbnRlbnRZTWFyZ2luOiAxMFxyXG4gICAgfSwgb3B0aW9ucyApO1xyXG5cclxuICAgIC8vIENyZWF0ZSB0aGUgY2hhcnQgKGJhcm9tZXRlcikgZGlzcGxheWluZyB0aGUgc3VtIG9mIHRoZSBzcXVhcmVzXHJcbiAgICBjb25zdCBzdW1PZlNxdWFyZWRSZXNpZHVhbHNDaGFydCA9IG5ldyBTdW1PZlNxdWFyZWRSZXNpZHVhbHNDaGFydChcclxuICAgICAgZ3JhcGgsXHJcbiAgICAgIGdyYXBoLmdldEJlc3RGaXRMaW5lU3VtT2ZTcXVhcmVkUmVzaWR1YWxzLmJpbmQoIGdyYXBoICksXHJcbiAgICAgIGRhdGFQb2ludHNBZGRlZEVtaXR0ZXIsXHJcbiAgICAgIExlYXN0U3F1YXJlc1JlZ3Jlc3Npb25Db25zdGFudHMuQkVTVF9GSVRfTElORV9DT0xPUi5TVU1fT0ZfU1FVQVJFU19DT0xPUixcclxuICAgICAgZ3JhcGguYmVzdEZpdExpbmVTcXVhcmVkUmVzaWR1YWxzVmlzaWJsZVByb3BlcnR5XHJcbiAgICApO1xyXG5cclxuICAgIC8vIENyZWF0ZSB0aGUgJ0Jlc3QgRml0IExpbmUnIGVxdWF0aW9uXHJcbiAgICAvLyBpbml0aWFsIHZhbHVlcyBzZXQgdGhlIHNwYWNpbmcsIHRoZSBjb3JyZWN0IHZhbHVlcyBmb3IgdGhlIHNsb3BlIGFuZCB0aGUgaW50ZXJjZXB0IHdpbGwgYmUgdXBkYXRlZCBiZWxvd1xyXG4gICAgY29uc3QgZXF1YXRpb25UZXh0ID0gbmV3IEVxdWF0aW9uTm9kZSggeyBtb2RlOiAnYmVzdEZpdExpbmUnIH0gKTtcclxuICAgIGVxdWF0aW9uVGV4dC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICBjb25zdCBlcXVhdGlvblBhbmVsID0gbmV3IFBhbmVsKCBlcXVhdGlvblRleHQsIHtcclxuICAgICAgZmlsbDogJ3doaXRlJyxcclxuICAgICAgc3Ryb2tlOiBMZWFzdFNxdWFyZXNSZWdyZXNzaW9uQ29uc3RhbnRzLlNNQUxMX1BBTkVMX1NUUk9LRSxcclxuICAgICAgY29ybmVyUmFkaXVzOiBMZWFzdFNxdWFyZXNSZWdyZXNzaW9uQ29uc3RhbnRzLlNNQUxMX1BBTkVMX0NPUk5FUl9SQURJVVMsXHJcbiAgICAgIHJlc2l6ZTogZmFsc2VcclxuICAgIH0gKTtcclxuXHJcbiAgICBjb25zdCB0ZXh0T3B0aW9ucyA9IHtcclxuICAgICAgZm9udDogTGVhc3RTcXVhcmVzUmVncmVzc2lvbkNvbnN0YW50cy5DSEVDS0JPWF9URVhUX0ZPTlQsXHJcbiAgICAgIG1heFdpZHRoOiBNQVhfTEFCRUxfV0lEVEhcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYXRlIHRoZSBjaGVja2JveGVzXHJcbiAgICBjb25zdCBsaW5lQ2hlY2tib3ggPSBuZXcgQ2hlY2tib3goIGdyYXBoLmJlc3RGaXRMaW5lVmlzaWJsZVByb3BlcnR5LCBuZXcgVGV4dCggYmVzdEZpdExpbmVTdHJpbmcsIHRleHRPcHRpb25zICkgKTtcclxuICAgIGNvbnN0IHJlc2lkdWFsc0NoZWNrYm94ID0gbmV3IENoZWNrYm94KCBncmFwaC5iZXN0Rml0TGluZVNob3dSZXNpZHVhbHNQcm9wZXJ0eSwgbmV3IFRleHQoIHJlc2lkdWFsc1N0cmluZywgdGV4dE9wdGlvbnMgKSApO1xyXG4gICAgY29uc3Qgc3F1YXJlZFJlc2lkdWFsc0NoZWNrYm94ID0gbmV3IENoZWNrYm94KCBncmFwaC5iZXN0Rml0TGluZVNob3dTcXVhcmVkUmVzaWR1YWxzUHJvcGVydHksIG5ldyBUZXh0KCBzcXVhcmVkUmVzaWR1YWxzU3RyaW5nLCB0ZXh0T3B0aW9ucyApICk7XHJcblxyXG4gICAgLy8gRXhwYW5kIHRoZSB0b3VjaCBBcmVhXHJcbiAgICBsaW5lQ2hlY2tib3gudG91Y2hBcmVhID0gbGluZUNoZWNrYm94LmxvY2FsQm91bmRzLmRpbGF0ZWRYWSggOCwgOCApO1xyXG4gICAgcmVzaWR1YWxzQ2hlY2tib3gudG91Y2hBcmVhID0gcmVzaWR1YWxzQ2hlY2tib3gubG9jYWxCb3VuZHMuZGlsYXRlZFhZKCA4LCA4ICk7XHJcbiAgICBzcXVhcmVkUmVzaWR1YWxzQ2hlY2tib3gudG91Y2hBcmVhID0gc3F1YXJlZFJlc2lkdWFsc0NoZWNrYm94LmxvY2FsQm91bmRzLmRpbGF0ZWRYWSggOCwgOCApO1xyXG5cclxuICAgIC8vIFVwZGF0ZSB0aGUgY29udHJvbCBQYW5lbCB1cG9uIGEgY2hhbmdlIG9mIHRoZSBzdGF0dXMgb2YgdGhlIEJlc3QgRml0IExpbmUgQ2hlY2tib3hcclxuICAgIC8vIE5vIG5lZWQgdG8gdW5saW5rLCBwcmVzZW50IGZvciB0aGUgbGlmZXRpbWUgb2YgdGhlIHNpbVxyXG4gICAgZ3JhcGguYmVzdEZpdExpbmVWaXNpYmxlUHJvcGVydHkubGluayggZW5hYmxlZCA9PiB7XHJcbiAgICAgIC8vIFNldCBFcXVhdGlvbiB0byBpbnZpc2libGUgaWYgdGhlcmUgaXMgbGVzcyB0aGFuIG9uZSBwb2ludCBvbiB0aGUgZ3JhcGhcclxuICAgICAgaWYgKCBncmFwaC5pc0xpbmVhckZpdERlZmluZWQoKSApIHtcclxuICAgICAgICBlcXVhdGlvblRleHQudmlzaWJsZSA9IGVuYWJsZWQ7XHJcbiAgICAgIH1cclxuICAgICAgZXF1YXRpb25QYW5lbC5vcGFjaXR5ID0gZW5hYmxlZCA/IDEgOiBTY2VuZXJ5Q29uc3RhbnRzLkRJU0FCTEVEX09QQUNJVFk7XHJcbiAgICAgIHJlc2lkdWFsc0NoZWNrYm94LmVuYWJsZWQgPSBlbmFibGVkO1xyXG4gICAgICBzcXVhcmVkUmVzaWR1YWxzQ2hlY2tib3guZW5hYmxlZCA9IGVuYWJsZWQ7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgY29uc3QgY29udGVudCA9IG5ldyBWQm94KCB7XHJcbiAgICAgIHNwYWNpbmc6IDEwLFxyXG4gICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgIGxpbmVDaGVja2JveCxcclxuICAgICAgICBuZXcgSEJveCggeyBjaGlsZHJlbjogWyBuZXcgSFN0cnV0KCAyMCApLCBlcXVhdGlvblBhbmVsIF0gfSApLFxyXG4gICAgICAgIHJlc2lkdWFsc0NoZWNrYm94LFxyXG4gICAgICAgIHNxdWFyZWRSZXNpZHVhbHNDaGVja2JveCxcclxuICAgICAgICBzdW1PZlNxdWFyZWRSZXNpZHVhbHNDaGFydFxyXG4gICAgICBdLFxyXG4gICAgICBleGNsdWRlSW52aXNpYmxlQ2hpbGRyZW5Gcm9tQm91bmRzOiBmYWxzZSxcclxuICAgICAgYWxpZ246ICdsZWZ0J1xyXG4gICAgfSApO1xyXG5cclxuICAgIHN1cGVyKCBjb250ZW50LCBvcHRpb25zICk7XHJcblxyXG4gICAgLy8gQHByaXZhdGVcclxuICAgIHRoaXMuZ3JhcGggPSBncmFwaDtcclxuICAgIHRoaXMuZXF1YXRpb25UZXh0ID0gZXF1YXRpb25UZXh0O1xyXG4gICAgdGhpcy5zdW1PZlNxdWFyZWRSZXNpZHVhbHNDaGFydCA9IHN1bU9mU3F1YXJlZFJlc2lkdWFsc0NoYXJ0O1xyXG5cclxuICAgIHRoaXMudXBkYXRlQmVzdEZpdExpbmVFcXVhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqIEBvdmVycmlkZVxyXG4gICAqL1xyXG4gIHJlc2V0KCkge1xyXG4gICAgdGhpcy5zdW1PZlNxdWFyZWRSZXNpZHVhbHNDaGFydC5yZXNldCgpO1xyXG4gICAgc3VwZXIucmVzZXQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgdGV4dCBvZiB0aGUgYmVzdCBGaXQgTGluZSBFcXVhdGlvblxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICB1cGRhdGVCZXN0Rml0TGluZUVxdWF0aW9uKCkge1xyXG4gICAgaWYgKCB0aGlzLmdyYXBoLmlzTGluZWFyRml0RGVmaW5lZCgpICkge1xyXG4gICAgICBjb25zdCBsaW5lYXJGaXRQYXJhbWV0ZXJzID0gdGhpcy5ncmFwaC5nZXRMaW5lYXJGaXQoKTtcclxuICAgICAgdGhpcy5lcXVhdGlvblRleHQuc2V0U2xvcGVUZXh0KCBsaW5lYXJGaXRQYXJhbWV0ZXJzLnNsb3BlICogdGhpcy5ncmFwaC5zbG9wZUZhY3RvciApO1xyXG4gICAgICB0aGlzLmVxdWF0aW9uVGV4dC5zZXRJbnRlcmNlcHRUZXh0KCBsaW5lYXJGaXRQYXJhbWV0ZXJzLmludGVyY2VwdCAqIHRoaXMuZ3JhcGguaW50ZXJjZXB0RmFjdG9yICsgdGhpcy5ncmFwaC5pbnRlcmNlcHRPZmZzZXQgKTtcclxuICAgICAgaWYgKCB0aGlzLmdyYXBoLmJlc3RGaXRMaW5lVmlzaWJsZVByb3BlcnR5LnZhbHVlICkge1xyXG4gICAgICAgIHRoaXMuZXF1YXRpb25UZXh0LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5lcXVhdGlvblRleHQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubGVhc3RTcXVhcmVzUmVncmVzc2lvbi5yZWdpc3RlciggJ0Jlc3RGaXRMaW5lQ29udHJvbFBhbmVsJywgQmVzdEZpdExpbmVDb250cm9sUGFuZWwgKTtcclxuZXhwb3J0IGRlZmF1bHQgQmVzdEZpdExpbmVDb250cm9sUGFuZWw7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxLQUFLLE1BQU0sbUNBQW1DO0FBQ3JELFNBQVNDLElBQUksRUFBRUMsTUFBTSxFQUFFQyxnQkFBZ0IsRUFBRUMsSUFBSSxFQUFFQyxJQUFJLFFBQVEsbUNBQW1DO0FBQzlGLE9BQU9DLFlBQVksTUFBTSxvQ0FBb0M7QUFD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