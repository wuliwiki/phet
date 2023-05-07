// Copyright 2014-2022, University of Colorado Boulder

/**
 * View representation of a Graph. Responsible for the view of 'MyLine', 'BestFitLine'
 * and the residuals on the graph. The view of the dataPoints is handled in the main ScreenView
 *
 * @author Martin Veillette (Berea College)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import { Shape } from '../../../../kite/js/imports.js';
import { Line, Node } from '../../../../scenery/js/imports.js';
import leastSquaresRegression from '../../leastSquaresRegression.js';
import LeastSquaresRegressionConstants from '../LeastSquaresRegressionConstants.js';
import ResidualLineAndSquareNode from './ResidualLineAndSquareNode.js';
class GraphNode extends Node {
  /**
   * @param {Graph} graph
   * @param {Bounds2} viewBounds
   * @param {ModelViewTransform2} modelViewTransform
   */
  constructor(graph, viewBounds, modelViewTransform) {
    super();
    const self = this;
    this.graph = graph;
    this.viewBounds = viewBounds;
    this.modelViewTransform = modelViewTransform;

    // Create 'MyLine'
    // First, get the two points formed by the intersection of the line and the boundary of the graph
    const myLineBoundaryPoints = graph.getBoundaryPoints(graph.slope(graph.angleProperty.value), graph.interceptProperty.value);
    this.myLine = new Line(modelViewTransform.modelToViewPosition(myLineBoundaryPoints.point1), modelViewTransform.modelToViewPosition(myLineBoundaryPoints.point2), {
      stroke: LeastSquaresRegressionConstants.MY_LINE_COLOR.BASE_COLOR,
      lineWidth: LeastSquaresRegressionConstants.LINE_WIDTH
    });

    // Create 'Best Fit Line'; initially set bestFitLine to zero length and then update it
    this.bestFitLine = new Line(0, 0, 0, 0, {
      stroke: LeastSquaresRegressionConstants.BEST_FIT_LINE_COLOR.BASE_COLOR,
      lineWidth: LeastSquaresRegressionConstants.LINE_WIDTH
    });
    if (graph.isLinearFitDefined()) {
      const linearFitParameters = graph.getLinearFit();
      const bestFitLineBoundaryPoints = graph.getBoundaryPoints(linearFitParameters.slope, linearFitParameters.intercept);
      this.bestFitLine = new Line(modelViewTransform.modelToViewPosition(bestFitLineBoundaryPoints.point1), modelViewTransform.modelToViewPosition(bestFitLineBoundaryPoints.point2), {
        stroke: LeastSquaresRegressionConstants.BEST_FIT_LINE_COLOR.BASE_COLOR,
        lineWidth: LeastSquaresRegressionConstants.LINE_WIDTH
      });
    }

    /**
     * Update 'My Line'
     * @param {number} slope
     * @param {number} intercept
     */
    const updateMyLine = (slope, intercept) => {
      const boundaryPoints = graph.getBoundaryPoints(slope, intercept);
      this.myLine.setPoint1(modelViewTransform.modelToViewPosition(boundaryPoints.point1));
      this.myLine.setPoint2(modelViewTransform.modelToViewPosition(boundaryPoints.point2));
      this.myLine.clipArea = Shape.bounds(this.viewBounds);
    };

    // Update 'MyLine' and update 'MyLine' Residuals upon of change of angle (a proxy for the slope), or intercept
    // No need to unlink, listener is present for the lifetime of the sim
    Multilink.multilink([graph.angleProperty, graph.interceptProperty], (angle, intercept) => {
      const slope = graph.slope(angle);
      updateMyLine(slope, intercept);
      graph.updateMyLineResiduals();
    });

    // we will add all the residuals in a separate node
    const residualsLayer = new Node();

    // we need to track the best fit residuals in a separate array so that we can toggle their visibility when
    // the best fit is undefined
    this.bestFitResiduals = [];

    // Handle the comings and goings of 'My Line' Residuals. Recall that graph.myLineResiduals is an
    // observable array of Property.<Residual>
    graph.myLineResiduals.addItemAddedListener(addedResidualProperty => {
      // Create and add the view representation for this residual.
      const residualNode = ResidualLineAndSquareNode.createFromPool(addedResidualProperty, LeastSquaresRegressionConstants.MY_LINE_COLOR, this.viewBounds, modelViewTransform, graph.myLineResidualsVisibleProperty, graph.myLineSquaredResidualsVisibleProperty);
      residualsLayer.addChild(residualNode);

      // Add the removal listener for if and when this residual is removed from the model.
      graph.myLineResiduals.addItemRemovedListener(function removalListener(removedResidualProperty) {
        if (removedResidualProperty === addedResidualProperty) {
          residualNode.release();
          residualsLayer.removeChild(residualNode);
          graph.myLineResiduals.removeItemRemovedListener(removalListener);
        }
      });
    });

    // Handle the comings and goings of Best Fit Line Residuals. Recall that graph.bestFitResiduals is an
    // observable array of Property.<Residual>
    graph.bestFitLineResiduals.addItemAddedListener(addedResidualProperty => {
      // Create and add the view representation for this residual.
      const residualNode = ResidualLineAndSquareNode.createFromPool(addedResidualProperty, LeastSquaresRegressionConstants.BEST_FIT_LINE_COLOR, this.viewBounds, modelViewTransform, graph.bestFitLineResidualsVisibleProperty, graph.bestFitLineSquaredResidualsVisibleProperty);
      residualsLayer.addChild(residualNode);
      this.bestFitResiduals.push(residualNode);

      // Add the removal listener for if and when this residual is removed from the model.
      graph.bestFitLineResiduals.addItemRemovedListener(removedResidualProperty => {
        if (removedResidualProperty === addedResidualProperty) {
          // remove the residualNode from this.bestFitResiduals
          const index = self.bestFitResiduals.indexOf(residualNode);
          if (index > -1) {
            self.bestFitResiduals.splice(index, 1);
          }
          residualNode.release();
          residualsLayer.removeChild(residualNode);
        }
      });
    });

    // Hide or show the visibility of 'MyLine' and 'BestFitLine', both listeners are present for the lifetime of the sim
    graph.myLineVisibleProperty.linkAttribute(this.myLine, 'visible');
    graph.bestFitLineVisibleProperty.linkAttribute(this.bestFitLine, 'visible');

    // Add the residualsLayer
    this.addChild(residualsLayer);

    // Add the two lines to this Node
    this.addChild(this.myLine);
    this.addChild(this.bestFitLine);
  }

  /**
   * Resets values to their original state
   * @public
   */
  reset() {
    this.updateBestFitLine();
  }

  /**
   * @public
   */
  update() {
    this.updateBestFitLine();

    // make sure that the best fit residuals are only visible when the best fit line is defined
    this.updateBestFitResidualsVisible();
  }

  /**
   * Update Best Fit Line
   * @private
   */
  updateBestFitLine() {
    if (this.graph.isLinearFitDefined()) {
      const linearFitParameters = this.graph.getLinearFit();
      const boundaryPoints = this.graph.getBoundaryPoints(linearFitParameters.slope, linearFitParameters.intercept);
      this.bestFitLine.setPoint1(this.modelViewTransform.modelToViewPosition(boundaryPoints.point1));
      this.bestFitLine.setPoint2(this.modelViewTransform.modelToViewPosition(boundaryPoints.point2));
      this.bestFitLine.clipArea = Shape.bounds(this.viewBounds);
    } else {
      this.bestFitLine.setPoint1(0, 0); // set line in the upper left corner
      this.bestFitLine.setPoint2(0, 0); // of length zero
    }
  }

  /**
   * Make sure that the best fit residuals and squares are only visible if the linear fit is defined.
   * This visibility is separate from the visibility handled by the control panel
   * @public
   */
  updateBestFitResidualsVisible() {
    for (let i = 0; i < this.bestFitResiduals.length; i++) {
      this.bestFitResiduals[i].visible = this.graph.isLinearFitDefined();
    }
  }
}
leastSquaresRegression.register('GraphNode', GraphNode);
export default GraphNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNdWx0aWxpbmsiLCJTaGFwZSIsIkxpbmUiLCJOb2RlIiwibGVhc3RTcXVhcmVzUmVncmVzc2lvbiIsIkxlYXN0U3F1YXJlc1JlZ3Jlc3Npb25Db25zdGFudHMiLCJSZXNpZHVhbExpbmVBbmRTcXVhcmVOb2RlIiwiR3JhcGhOb2RlIiwiY29uc3RydWN0b3IiLCJncmFwaCIsInZpZXdCb3VuZHMiLCJtb2RlbFZpZXdUcmFuc2Zvcm0iLCJzZWxmIiwibXlMaW5lQm91bmRhcnlQb2ludHMiLCJnZXRCb3VuZGFyeVBvaW50cyIsInNsb3BlIiwiYW5nbGVQcm9wZXJ0eSIsInZhbHVlIiwiaW50ZXJjZXB0UHJvcGVydHkiLCJteUxpbmUiLCJtb2RlbFRvVmlld1Bvc2l0aW9uIiwicG9pbnQxIiwicG9pbnQyIiwic3Ryb2tlIiwiTVlfTElORV9DT0xPUiIsIkJBU0VfQ09MT1IiLCJsaW5lV2lkdGgiLCJMSU5FX1dJRFRIIiwiYmVzdEZpdExpbmUiLCJCRVNUX0ZJVF9MSU5FX0NPTE9SIiwiaXNMaW5lYXJGaXREZWZpbmVkIiwibGluZWFyRml0UGFyYW1ldGVycyIsImdldExpbmVhckZpdCIsImJlc3RGaXRMaW5lQm91bmRhcnlQb2ludHMiLCJpbnRlcmNlcHQiLCJ1cGRhdGVNeUxpbmUiLCJib3VuZGFyeVBvaW50cyIsInNldFBvaW50MSIsInNldFBvaW50MiIsImNsaXBBcmVhIiwiYm91bmRzIiwibXVsdGlsaW5rIiwiYW5nbGUiLCJ1cGRhdGVNeUxpbmVSZXNpZHVhbHMiLCJyZXNpZHVhbHNMYXllciIsImJlc3RGaXRSZXNpZHVhbHMiLCJteUxpbmVSZXNpZHVhbHMiLCJhZGRJdGVtQWRkZWRMaXN0ZW5lciIsImFkZGVkUmVzaWR1YWxQcm9wZXJ0eSIsInJlc2lkdWFsTm9kZSIsImNyZWF0ZUZyb21Qb29sIiwibXlMaW5lUmVzaWR1YWxzVmlzaWJsZVByb3BlcnR5IiwibXlMaW5lU3F1YXJlZFJlc2lkdWFsc1Zpc2libGVQcm9wZXJ0eSIsImFkZENoaWxkIiwiYWRkSXRlbVJlbW92ZWRMaXN0ZW5lciIsInJlbW92YWxMaXN0ZW5lciIsInJlbW92ZWRSZXNpZHVhbFByb3BlcnR5IiwicmVsZWFzZSIsInJlbW92ZUNoaWxkIiwicmVtb3ZlSXRlbVJlbW92ZWRMaXN0ZW5lciIsImJlc3RGaXRMaW5lUmVzaWR1YWxzIiwiYmVzdEZpdExpbmVSZXNpZHVhbHNWaXNpYmxlUHJvcGVydHkiLCJiZXN0Rml0TGluZVNxdWFyZWRSZXNpZHVhbHNWaXNpYmxlUHJvcGVydHkiLCJwdXNoIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwibXlMaW5lVmlzaWJsZVByb3BlcnR5IiwibGlua0F0dHJpYnV0ZSIsImJlc3RGaXRMaW5lVmlzaWJsZVByb3BlcnR5IiwicmVzZXQiLCJ1cGRhdGVCZXN0Rml0TGluZSIsInVwZGF0ZSIsInVwZGF0ZUJlc3RGaXRSZXNpZHVhbHNWaXNpYmxlIiwiaSIsImxlbmd0aCIsInZpc2libGUiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkdyYXBoTm9kZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNC0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBWaWV3IHJlcHJlc2VudGF0aW9uIG9mIGEgR3JhcGguIFJlc3BvbnNpYmxlIGZvciB0aGUgdmlldyBvZiAnTXlMaW5lJywgJ0Jlc3RGaXRMaW5lJ1xyXG4gKiBhbmQgdGhlIHJlc2lkdWFscyBvbiB0aGUgZ3JhcGguIFRoZSB2aWV3IG9mIHRoZSBkYXRhUG9pbnRzIGlzIGhhbmRsZWQgaW4gdGhlIG1haW4gU2NyZWVuVmlld1xyXG4gKlxyXG4gKiBAYXV0aG9yIE1hcnRpbiBWZWlsbGV0dGUgKEJlcmVhIENvbGxlZ2UpXHJcbiAqL1xyXG5cclxuaW1wb3J0IE11bHRpbGluayBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL011bHRpbGluay5qcyc7XHJcbmltcG9ydCB7IFNoYXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4va2l0ZS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IHsgTGluZSwgTm9kZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBsZWFzdFNxdWFyZXNSZWdyZXNzaW9uIGZyb20gJy4uLy4uL2xlYXN0U3F1YXJlc1JlZ3Jlc3Npb24uanMnO1xyXG5pbXBvcnQgTGVhc3RTcXVhcmVzUmVncmVzc2lvbkNvbnN0YW50cyBmcm9tICcuLi9MZWFzdFNxdWFyZXNSZWdyZXNzaW9uQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IFJlc2lkdWFsTGluZUFuZFNxdWFyZU5vZGUgZnJvbSAnLi9SZXNpZHVhbExpbmVBbmRTcXVhcmVOb2RlLmpzJztcclxuXHJcbmNsYXNzIEdyYXBoTm9kZSBleHRlbmRzIE5vZGUge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7R3JhcGh9IGdyYXBoXHJcbiAgICogQHBhcmFtIHtCb3VuZHMyfSB2aWV3Qm91bmRzXHJcbiAgICogQHBhcmFtIHtNb2RlbFZpZXdUcmFuc2Zvcm0yfSBtb2RlbFZpZXdUcmFuc2Zvcm1cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggZ3JhcGgsIHZpZXdCb3VuZHMsIG1vZGVsVmlld1RyYW5zZm9ybSApIHtcclxuXHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuZ3JhcGggPSBncmFwaDtcclxuICAgIHRoaXMudmlld0JvdW5kcyA9IHZpZXdCb3VuZHM7XHJcbiAgICB0aGlzLm1vZGVsVmlld1RyYW5zZm9ybSA9IG1vZGVsVmlld1RyYW5zZm9ybTtcclxuXHJcbiAgICAvLyBDcmVhdGUgJ015TGluZSdcclxuICAgIC8vIEZpcnN0LCBnZXQgdGhlIHR3byBwb2ludHMgZm9ybWVkIGJ5IHRoZSBpbnRlcnNlY3Rpb24gb2YgdGhlIGxpbmUgYW5kIHRoZSBib3VuZGFyeSBvZiB0aGUgZ3JhcGhcclxuICAgIGNvbnN0IG15TGluZUJvdW5kYXJ5UG9pbnRzID0gZ3JhcGguZ2V0Qm91bmRhcnlQb2ludHMoIGdyYXBoLnNsb3BlKCBncmFwaC5hbmdsZVByb3BlcnR5LnZhbHVlICksIGdyYXBoLmludGVyY2VwdFByb3BlcnR5LnZhbHVlICk7XHJcbiAgICB0aGlzLm15TGluZSA9IG5ldyBMaW5lKFxyXG4gICAgICBtb2RlbFZpZXdUcmFuc2Zvcm0ubW9kZWxUb1ZpZXdQb3NpdGlvbiggbXlMaW5lQm91bmRhcnlQb2ludHMucG9pbnQxICksXHJcbiAgICAgIG1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld1Bvc2l0aW9uKCBteUxpbmVCb3VuZGFyeVBvaW50cy5wb2ludDIgKSxcclxuICAgICAge1xyXG4gICAgICAgIHN0cm9rZTogTGVhc3RTcXVhcmVzUmVncmVzc2lvbkNvbnN0YW50cy5NWV9MSU5FX0NPTE9SLkJBU0VfQ09MT1IsXHJcbiAgICAgICAgbGluZVdpZHRoOiBMZWFzdFNxdWFyZXNSZWdyZXNzaW9uQ29uc3RhbnRzLkxJTkVfV0lEVEhcclxuICAgICAgfSApO1xyXG5cclxuICAgIC8vIENyZWF0ZSAnQmVzdCBGaXQgTGluZSc7IGluaXRpYWxseSBzZXQgYmVzdEZpdExpbmUgdG8gemVybyBsZW5ndGggYW5kIHRoZW4gdXBkYXRlIGl0XHJcbiAgICB0aGlzLmJlc3RGaXRMaW5lID0gbmV3IExpbmUoIDAsIDAsIDAsIDAsIHtcclxuICAgICAgc3Ryb2tlOiBMZWFzdFNxdWFyZXNSZWdyZXNzaW9uQ29uc3RhbnRzLkJFU1RfRklUX0xJTkVfQ09MT1IuQkFTRV9DT0xPUixcclxuICAgICAgbGluZVdpZHRoOiBMZWFzdFNxdWFyZXNSZWdyZXNzaW9uQ29uc3RhbnRzLkxJTkVfV0lEVEhcclxuICAgIH0gKTtcclxuXHJcbiAgICBpZiAoIGdyYXBoLmlzTGluZWFyRml0RGVmaW5lZCgpICkge1xyXG4gICAgICBjb25zdCBsaW5lYXJGaXRQYXJhbWV0ZXJzID0gZ3JhcGguZ2V0TGluZWFyRml0KCk7XHJcbiAgICAgIGNvbnN0IGJlc3RGaXRMaW5lQm91bmRhcnlQb2ludHMgPSBncmFwaC5nZXRCb3VuZGFyeVBvaW50cyggbGluZWFyRml0UGFyYW1ldGVycy5zbG9wZSwgbGluZWFyRml0UGFyYW1ldGVycy5pbnRlcmNlcHQgKTtcclxuICAgICAgdGhpcy5iZXN0Rml0TGluZSA9IG5ldyBMaW5lKFxyXG4gICAgICAgIG1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld1Bvc2l0aW9uKCBiZXN0Rml0TGluZUJvdW5kYXJ5UG9pbnRzLnBvaW50MSApLFxyXG4gICAgICAgIG1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld1Bvc2l0aW9uKCBiZXN0Rml0TGluZUJvdW5kYXJ5UG9pbnRzLnBvaW50MiApLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN0cm9rZTogTGVhc3RTcXVhcmVzUmVncmVzc2lvbkNvbnN0YW50cy5CRVNUX0ZJVF9MSU5FX0NPTE9SLkJBU0VfQ09MT1IsXHJcbiAgICAgICAgICBsaW5lV2lkdGg6IExlYXN0U3F1YXJlc1JlZ3Jlc3Npb25Db25zdGFudHMuTElORV9XSURUSFxyXG4gICAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSAnTXkgTGluZSdcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzbG9wZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGludGVyY2VwdFxyXG4gICAgICovXHJcbiAgICBjb25zdCB1cGRhdGVNeUxpbmUgPSAoIHNsb3BlLCBpbnRlcmNlcHQgKSA9PiB7XHJcbiAgICAgIGNvbnN0IGJvdW5kYXJ5UG9pbnRzID0gZ3JhcGguZ2V0Qm91bmRhcnlQb2ludHMoIHNsb3BlLCBpbnRlcmNlcHQgKTtcclxuICAgICAgdGhpcy5teUxpbmUuc2V0UG9pbnQxKCBtb2RlbFZpZXdUcmFuc2Zvcm0ubW9kZWxUb1ZpZXdQb3NpdGlvbiggYm91bmRhcnlQb2ludHMucG9pbnQxICkgKTtcclxuICAgICAgdGhpcy5teUxpbmUuc2V0UG9pbnQyKCBtb2RlbFZpZXdUcmFuc2Zvcm0ubW9kZWxUb1ZpZXdQb3NpdGlvbiggYm91bmRhcnlQb2ludHMucG9pbnQyICkgKTtcclxuICAgICAgdGhpcy5teUxpbmUuY2xpcEFyZWEgPSBTaGFwZS5ib3VuZHMoIHRoaXMudmlld0JvdW5kcyApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBVcGRhdGUgJ015TGluZScgYW5kIHVwZGF0ZSAnTXlMaW5lJyBSZXNpZHVhbHMgdXBvbiBvZiBjaGFuZ2Ugb2YgYW5nbGUgKGEgcHJveHkgZm9yIHRoZSBzbG9wZSksIG9yIGludGVyY2VwdFxyXG4gICAgLy8gTm8gbmVlZCB0byB1bmxpbmssIGxpc3RlbmVyIGlzIHByZXNlbnQgZm9yIHRoZSBsaWZldGltZSBvZiB0aGUgc2ltXHJcbiAgICBNdWx0aWxpbmsubXVsdGlsaW5rKCBbIGdyYXBoLmFuZ2xlUHJvcGVydHksIGdyYXBoLmludGVyY2VwdFByb3BlcnR5IF0sICggYW5nbGUsIGludGVyY2VwdCApID0+IHtcclxuICAgICAgY29uc3Qgc2xvcGUgPSBncmFwaC5zbG9wZSggYW5nbGUgKTtcclxuICAgICAgdXBkYXRlTXlMaW5lKCBzbG9wZSwgaW50ZXJjZXB0ICk7XHJcbiAgICAgIGdyYXBoLnVwZGF0ZU15TGluZVJlc2lkdWFscygpO1xyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIHdlIHdpbGwgYWRkIGFsbCB0aGUgcmVzaWR1YWxzIGluIGEgc2VwYXJhdGUgbm9kZVxyXG4gICAgY29uc3QgcmVzaWR1YWxzTGF5ZXIgPSBuZXcgTm9kZSgpO1xyXG5cclxuICAgIC8vIHdlIG5lZWQgdG8gdHJhY2sgdGhlIGJlc3QgZml0IHJlc2lkdWFscyBpbiBhIHNlcGFyYXRlIGFycmF5IHNvIHRoYXQgd2UgY2FuIHRvZ2dsZSB0aGVpciB2aXNpYmlsaXR5IHdoZW5cclxuICAgIC8vIHRoZSBiZXN0IGZpdCBpcyB1bmRlZmluZWRcclxuICAgIHRoaXMuYmVzdEZpdFJlc2lkdWFscyA9IFtdO1xyXG5cclxuICAgIC8vIEhhbmRsZSB0aGUgY29taW5ncyBhbmQgZ29pbmdzIG9mICdNeSBMaW5lJyBSZXNpZHVhbHMuIFJlY2FsbCB0aGF0IGdyYXBoLm15TGluZVJlc2lkdWFscyBpcyBhblxyXG4gICAgLy8gb2JzZXJ2YWJsZSBhcnJheSBvZiBQcm9wZXJ0eS48UmVzaWR1YWw+XHJcbiAgICBncmFwaC5teUxpbmVSZXNpZHVhbHMuYWRkSXRlbUFkZGVkTGlzdGVuZXIoIGFkZGVkUmVzaWR1YWxQcm9wZXJ0eSA9PiB7XHJcblxyXG4gICAgICAvLyBDcmVhdGUgYW5kIGFkZCB0aGUgdmlldyByZXByZXNlbnRhdGlvbiBmb3IgdGhpcyByZXNpZHVhbC5cclxuICAgICAgY29uc3QgcmVzaWR1YWxOb2RlID0gUmVzaWR1YWxMaW5lQW5kU3F1YXJlTm9kZS5jcmVhdGVGcm9tUG9vbChcclxuICAgICAgICBhZGRlZFJlc2lkdWFsUHJvcGVydHksXHJcbiAgICAgICAgTGVhc3RTcXVhcmVzUmVncmVzc2lvbkNvbnN0YW50cy5NWV9MSU5FX0NPTE9SLFxyXG4gICAgICAgIHRoaXMudmlld0JvdW5kcyxcclxuICAgICAgICBtb2RlbFZpZXdUcmFuc2Zvcm0sXHJcbiAgICAgICAgZ3JhcGgubXlMaW5lUmVzaWR1YWxzVmlzaWJsZVByb3BlcnR5LFxyXG4gICAgICAgIGdyYXBoLm15TGluZVNxdWFyZWRSZXNpZHVhbHNWaXNpYmxlUHJvcGVydHkgKTtcclxuICAgICAgcmVzaWR1YWxzTGF5ZXIuYWRkQ2hpbGQoIHJlc2lkdWFsTm9kZSApO1xyXG5cclxuICAgICAgLy8gQWRkIHRoZSByZW1vdmFsIGxpc3RlbmVyIGZvciBpZiBhbmQgd2hlbiB0aGlzIHJlc2lkdWFsIGlzIHJlbW92ZWQgZnJvbSB0aGUgbW9kZWwuXHJcbiAgICAgIGdyYXBoLm15TGluZVJlc2lkdWFscy5hZGRJdGVtUmVtb3ZlZExpc3RlbmVyKCBmdW5jdGlvbiByZW1vdmFsTGlzdGVuZXIoIHJlbW92ZWRSZXNpZHVhbFByb3BlcnR5ICkge1xyXG4gICAgICAgIGlmICggcmVtb3ZlZFJlc2lkdWFsUHJvcGVydHkgPT09IGFkZGVkUmVzaWR1YWxQcm9wZXJ0eSApIHtcclxuICAgICAgICAgIHJlc2lkdWFsTm9kZS5yZWxlYXNlKCk7XHJcbiAgICAgICAgICByZXNpZHVhbHNMYXllci5yZW1vdmVDaGlsZCggcmVzaWR1YWxOb2RlICk7XHJcbiAgICAgICAgICBncmFwaC5teUxpbmVSZXNpZHVhbHMucmVtb3ZlSXRlbVJlbW92ZWRMaXN0ZW5lciggcmVtb3ZhbExpc3RlbmVyICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9ICk7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gSGFuZGxlIHRoZSBjb21pbmdzIGFuZCBnb2luZ3Mgb2YgQmVzdCBGaXQgTGluZSBSZXNpZHVhbHMuIFJlY2FsbCB0aGF0IGdyYXBoLmJlc3RGaXRSZXNpZHVhbHMgaXMgYW5cclxuICAgIC8vIG9ic2VydmFibGUgYXJyYXkgb2YgUHJvcGVydHkuPFJlc2lkdWFsPlxyXG4gICAgZ3JhcGguYmVzdEZpdExpbmVSZXNpZHVhbHMuYWRkSXRlbUFkZGVkTGlzdGVuZXIoIGFkZGVkUmVzaWR1YWxQcm9wZXJ0eSA9PiB7XHJcblxyXG4gICAgICAvLyBDcmVhdGUgYW5kIGFkZCB0aGUgdmlldyByZXByZXNlbnRhdGlvbiBmb3IgdGhpcyByZXNpZHVhbC5cclxuICAgICAgY29uc3QgcmVzaWR1YWxOb2RlID0gUmVzaWR1YWxMaW5lQW5kU3F1YXJlTm9kZS5jcmVhdGVGcm9tUG9vbChcclxuICAgICAgICBhZGRlZFJlc2lkdWFsUHJvcGVydHksXHJcbiAgICAgICAgTGVhc3RTcXVhcmVzUmVncmVzc2lvbkNvbnN0YW50cy5CRVNUX0ZJVF9MSU5FX0NPTE9SLFxyXG4gICAgICAgIHRoaXMudmlld0JvdW5kcyxcclxuICAgICAgICBtb2RlbFZpZXdUcmFuc2Zvcm0sXHJcbiAgICAgICAgZ3JhcGguYmVzdEZpdExpbmVSZXNpZHVhbHNWaXNpYmxlUHJvcGVydHksXHJcbiAgICAgICAgZ3JhcGguYmVzdEZpdExpbmVTcXVhcmVkUmVzaWR1YWxzVmlzaWJsZVByb3BlcnR5ICk7XHJcbiAgICAgIHJlc2lkdWFsc0xheWVyLmFkZENoaWxkKCByZXNpZHVhbE5vZGUgKTtcclxuXHJcbiAgICAgIHRoaXMuYmVzdEZpdFJlc2lkdWFscy5wdXNoKCByZXNpZHVhbE5vZGUgKTtcclxuXHJcbiAgICAgIC8vIEFkZCB0aGUgcmVtb3ZhbCBsaXN0ZW5lciBmb3IgaWYgYW5kIHdoZW4gdGhpcyByZXNpZHVhbCBpcyByZW1vdmVkIGZyb20gdGhlIG1vZGVsLlxyXG4gICAgICBncmFwaC5iZXN0Rml0TGluZVJlc2lkdWFscy5hZGRJdGVtUmVtb3ZlZExpc3RlbmVyKCByZW1vdmVkUmVzaWR1YWxQcm9wZXJ0eSA9PiB7XHJcbiAgICAgICAgaWYgKCByZW1vdmVkUmVzaWR1YWxQcm9wZXJ0eSA9PT0gYWRkZWRSZXNpZHVhbFByb3BlcnR5ICkge1xyXG5cclxuICAgICAgICAgIC8vIHJlbW92ZSB0aGUgcmVzaWR1YWxOb2RlIGZyb20gdGhpcy5iZXN0Rml0UmVzaWR1YWxzXHJcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHNlbGYuYmVzdEZpdFJlc2lkdWFscy5pbmRleE9mKCByZXNpZHVhbE5vZGUgKTtcclxuICAgICAgICAgIGlmICggaW5kZXggPiAtMSApIHtcclxuICAgICAgICAgICAgc2VsZi5iZXN0Rml0UmVzaWR1YWxzLnNwbGljZSggaW5kZXgsIDEgKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXNpZHVhbE5vZGUucmVsZWFzZSgpO1xyXG4gICAgICAgICAgcmVzaWR1YWxzTGF5ZXIucmVtb3ZlQ2hpbGQoIHJlc2lkdWFsTm9kZSApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSApO1xyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIEhpZGUgb3Igc2hvdyB0aGUgdmlzaWJpbGl0eSBvZiAnTXlMaW5lJyBhbmQgJ0Jlc3RGaXRMaW5lJywgYm90aCBsaXN0ZW5lcnMgYXJlIHByZXNlbnQgZm9yIHRoZSBsaWZldGltZSBvZiB0aGUgc2ltXHJcbiAgICBncmFwaC5teUxpbmVWaXNpYmxlUHJvcGVydHkubGlua0F0dHJpYnV0ZSggdGhpcy5teUxpbmUsICd2aXNpYmxlJyApO1xyXG4gICAgZ3JhcGguYmVzdEZpdExpbmVWaXNpYmxlUHJvcGVydHkubGlua0F0dHJpYnV0ZSggdGhpcy5iZXN0Rml0TGluZSwgJ3Zpc2libGUnICk7XHJcblxyXG4gICAgLy8gQWRkIHRoZSByZXNpZHVhbHNMYXllclxyXG4gICAgdGhpcy5hZGRDaGlsZCggcmVzaWR1YWxzTGF5ZXIgKTtcclxuXHJcbiAgICAvLyBBZGQgdGhlIHR3byBsaW5lcyB0byB0aGlzIE5vZGVcclxuICAgIHRoaXMuYWRkQ2hpbGQoIHRoaXMubXlMaW5lICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCB0aGlzLmJlc3RGaXRMaW5lICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldHMgdmFsdWVzIHRvIHRoZWlyIG9yaWdpbmFsIHN0YXRlXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIHJlc2V0KCkge1xyXG4gICAgdGhpcy51cGRhdGVCZXN0Rml0TGluZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIHVwZGF0ZSgpIHtcclxuICAgIHRoaXMudXBkYXRlQmVzdEZpdExpbmUoKTtcclxuXHJcbiAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgYmVzdCBmaXQgcmVzaWR1YWxzIGFyZSBvbmx5IHZpc2libGUgd2hlbiB0aGUgYmVzdCBmaXQgbGluZSBpcyBkZWZpbmVkXHJcbiAgICB0aGlzLnVwZGF0ZUJlc3RGaXRSZXNpZHVhbHNWaXNpYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgQmVzdCBGaXQgTGluZVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgdXBkYXRlQmVzdEZpdExpbmUoKSB7XHJcbiAgICBpZiAoIHRoaXMuZ3JhcGguaXNMaW5lYXJGaXREZWZpbmVkKCkgKSB7XHJcbiAgICAgIGNvbnN0IGxpbmVhckZpdFBhcmFtZXRlcnMgPSB0aGlzLmdyYXBoLmdldExpbmVhckZpdCgpO1xyXG4gICAgICBjb25zdCBib3VuZGFyeVBvaW50cyA9IHRoaXMuZ3JhcGguZ2V0Qm91bmRhcnlQb2ludHMoIGxpbmVhckZpdFBhcmFtZXRlcnMuc2xvcGUsIGxpbmVhckZpdFBhcmFtZXRlcnMuaW50ZXJjZXB0ICk7XHJcbiAgICAgIHRoaXMuYmVzdEZpdExpbmUuc2V0UG9pbnQxKCB0aGlzLm1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld1Bvc2l0aW9uKCBib3VuZGFyeVBvaW50cy5wb2ludDEgKSApO1xyXG4gICAgICB0aGlzLmJlc3RGaXRMaW5lLnNldFBvaW50MiggdGhpcy5tb2RlbFZpZXdUcmFuc2Zvcm0ubW9kZWxUb1ZpZXdQb3NpdGlvbiggYm91bmRhcnlQb2ludHMucG9pbnQyICkgKTtcclxuICAgICAgdGhpcy5iZXN0Rml0TGluZS5jbGlwQXJlYSA9IFNoYXBlLmJvdW5kcyggdGhpcy52aWV3Qm91bmRzICk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5iZXN0Rml0TGluZS5zZXRQb2ludDEoIDAsIDAgKTsgLy8gc2V0IGxpbmUgaW4gdGhlIHVwcGVyIGxlZnQgY29ybmVyXHJcbiAgICAgIHRoaXMuYmVzdEZpdExpbmUuc2V0UG9pbnQyKCAwLCAwICk7IC8vIG9mIGxlbmd0aCB6ZXJvXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNYWtlIHN1cmUgdGhhdCB0aGUgYmVzdCBmaXQgcmVzaWR1YWxzIGFuZCBzcXVhcmVzIGFyZSBvbmx5IHZpc2libGUgaWYgdGhlIGxpbmVhciBmaXQgaXMgZGVmaW5lZC5cclxuICAgKiBUaGlzIHZpc2liaWxpdHkgaXMgc2VwYXJhdGUgZnJvbSB0aGUgdmlzaWJpbGl0eSBoYW5kbGVkIGJ5IHRoZSBjb250cm9sIHBhbmVsXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIHVwZGF0ZUJlc3RGaXRSZXNpZHVhbHNWaXNpYmxlKCkge1xyXG4gICAgZm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5iZXN0Rml0UmVzaWR1YWxzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICB0aGlzLmJlc3RGaXRSZXNpZHVhbHNbIGkgXS52aXNpYmxlID0gdGhpcy5ncmFwaC5pc0xpbmVhckZpdERlZmluZWQoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmxlYXN0U3F1YXJlc1JlZ3Jlc3Npb24ucmVnaXN0ZXIoICdHcmFwaE5vZGUnLCBHcmFwaE5vZGUgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyYXBoTm9kZTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsU0FBUyxNQUFNLGtDQUFrQztBQUN4RCxTQUFTQyxLQUFLLFFBQVEsZ0NBQWdDO0FBQ3RELFNBQVNDLElBQUksRUFBRUMsSUFBSSxRQUFRLG1DQUFtQztBQUM5RCxPQUFPQyxzQkFBc0IsTUFBTSxpQ0FBaUM7QUFDcEUsT0FBT0MsK0JBQStCLE1BQU0sdUNBQXVDO0FBQ25GLE9BQU9DLHlCQUF5QixNQUFNLGdDQUFnQztBQUV0RSxNQUFNQyxTQUFTLFNBQVNKLElBQUksQ0FBQztFQUMzQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBQ0VLLFdBQVdBLENBQUVDLEtBQUssRUFBRUMsVUFBVSxFQUFFQyxrQkFBa0IsRUFBRztJQUVuRCxLQUFLLENBQUMsQ0FBQztJQUVQLE1BQU1DLElBQUksR0FBRyxJQUFJO0lBRWpCLElBQUksQ0FBQ0gsS0FBSyxHQUFHQSxLQUFLO0lBQ2xCLElBQUksQ0FBQ0MsVUFBVSxHQUFHQSxVQUFVO0lBQzVCLElBQUksQ0FBQ0Msa0JBQWtCLEdBQUdBLGtCQUFrQjs7SUFFNUM7SUFDQTtJQUNBLE1BQU1FLG9CQUFvQixHQUFHSixLQUFLLENBQUNLLGlCQUFpQixDQUFFTCxLQUFLLENBQUNNLEtBQUssQ0FBRU4sS0FBSyxDQUFDTyxhQUFhLENBQUNDLEtBQU0sQ0FBQyxFQUFFUixLQUFLLENB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