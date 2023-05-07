// Copyright 2013-2022, University of Colorado Boulder

/**
 * GraphIndicatorNode points to a value on a graph's vertical scale.
 * Origin is at the indicator's pointer, and the pointer can be attached to any corner of the indicator (see options.pointerPosition).
 * Interactive indicators are decorated with a double-headed arrow, indicating the direction of dragging.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Matrix3 from '../../../../../dot/js/Matrix3.js';
import { Shape } from '../../../../../kite/js/imports.js';
import optionize, { combineOptions } from '../../../../../phet-core/js/optionize.js';
import ArrowNode from '../../../../../scenery-phet/js/ArrowNode.js';
import PhetFont from '../../../../../scenery-phet/js/PhetFont.js';
import ScientificNotationNode from '../../../../../scenery-phet/js/ScientificNotationNode.js';
import { InteractiveHighlighting, Node, Path, Rectangle, RichText } from '../../../../../scenery/js/imports.js';
import phScale from '../../../phScale.js';
import PHScaleColors from '../../PHScaleColors.js';
import PHScaleConstants from '../../PHScaleConstants.js';
import H2ONode from '../particles/H2ONode.js';
import H3ONode from '../particles/H3ONode.js';
import OHNode from '../particles/OHNode.js';

// constants
const POINTER_WIDTH_PERCENTAGE = 0.15; // used to compute width of the pointy part of the indicator
const POINTER_HEIGHT_PERCENTAGE = 0.5; // used to compute height of the pointy part of the indicator

export default class GraphIndicatorNode extends InteractiveHighlighting(Node) {
  constructor(valueProperty, particleNode, formulaNode, providedOptions) {
    const options = optionize()({
      // SelfOptions
      pointerPosition: 'topRight',
      backgroundFill: 'white',
      backgroundStroke: 'black',
      backgroundWidth: 160,
      backgroundHeight: 80,
      backgroundCornerRadius: 10,
      backgroundLineWidth: 2,
      backgroundXMargin: 10,
      backgroundYMargin: 8,
      valueXMargin: 5,
      valueYMargin: 3,
      xSpacing: 8,
      ySpacing: 4,
      mantissaDecimalPlaces: PHScaleConstants.LOGARITHMIC_MANTISSA_DECIMAL_PLACES,
      exponent: null,
      isInteractive: false,
      arrowFill: 'rgb( 0, 200, 0 )',
      arrowXSpacing: 5,
      // NodeOptions
      scale: 0.75,
      // specified by design team
      tagName: 'div'
    }, providedOptions);

    // Instrument interactiveProperty for interactive indicators.
    if (options.isInteractive) {
      options.focusable = true;
      options.phetioInputEnabledPropertyInstrumented = true;
    }
    super();

    // Transform shapes to support various orientations of pointer.
    let shapeMatrix;
    if (options.pointerPosition === 'topRight') {
      shapeMatrix = Matrix3.identity(); // background shape will be drawn with pointer at top-right
    } else if (options.pointerPosition === 'topLeft') {
      shapeMatrix = Matrix3.scaling(-1, 1);
    } else if (options.pointerPosition === 'bottomRight') {
      shapeMatrix = Matrix3.scaling(1, -1);
    } else if (options.pointerPosition === 'bottomLeft') {
      shapeMatrix = Matrix3.scaling(-1, -1);
    } else {
      throw new Error(`unsupported options.pointerPosition: ${options.pointerPosition}`);
    }

    // Background with the pointer at top-right. Proceed clockwise from the tip of the pointer.
    const backgroundShape = new Shape().moveTo(0, 0).lineTo(-POINTER_WIDTH_PERCENTAGE * options.backgroundWidth, POINTER_HEIGHT_PERCENTAGE * options.backgroundHeight - options.backgroundCornerRadius).arc(-POINTER_WIDTH_PERCENTAGE * options.backgroundWidth - options.backgroundCornerRadius, options.backgroundHeight - options.backgroundCornerRadius, options.backgroundCornerRadius, 0, Math.PI / 2, false).lineTo(-options.backgroundWidth + options.backgroundCornerRadius, options.backgroundHeight).arc(-options.backgroundWidth + options.backgroundCornerRadius, options.backgroundHeight - options.backgroundCornerRadius, options.backgroundCornerRadius, Math.PI / 2, Math.PI, false).lineTo(-options.backgroundWidth, options.backgroundCornerRadius).arc(-options.backgroundWidth + options.backgroundCornerRadius, options.backgroundCornerRadius, options.backgroundCornerRadius, Math.PI, 1.5 * Math.PI, false).close().transformed(shapeMatrix);
    const backgroundNode = new Path(backgroundShape, {
      lineWidth: options.backgroundLineWidth,
      stroke: options.backgroundStroke,
      fill: options.backgroundFill
    });

    // Cutout where the value is displayed.
    const valueBackgroundNode = new Rectangle(0, 0, (1 - POINTER_WIDTH_PERCENTAGE) * options.backgroundWidth - 2 * options.backgroundXMargin, 0.5 * options.backgroundHeight - options.backgroundYMargin - options.ySpacing / 2, 0.5 * options.backgroundCornerRadius, 0.5 * options.backgroundCornerRadius, {
      fill: 'white',
      stroke: 'gray'
    });

    // Value, scaled to fit background height
    const valueNode = new ScientificNotationNode(valueProperty, {
      font: new PhetFont(28),
      fill: 'black',
      mantissaDecimalPlaces: options.mantissaDecimalPlaces,
      exponent: options.exponent
    });
    valueNode.setScaleMagnitude(0.7);

    // particle and formula, scaled to fit available height
    const particleAndFormula = new Node();
    particleAndFormula.addChild(particleNode);
    particleAndFormula.addChild(formulaNode);
    formulaNode.left = particleNode.right + options.xSpacing;
    formulaNode.centerY = particleNode.centerY;
    particleAndFormula.setScaleMagnitude(0.7);

    // rendering order
    this.addChild(backgroundNode);
    this.addChild(valueBackgroundNode);
    this.addChild(valueNode);
    this.addChild(particleAndFormula);

    // layout, relative to backgroundNode
    if (options.pointerPosition === 'topRight' || options.pointerPosition === 'bottomRight') {
      valueBackgroundNode.left = backgroundNode.left + options.backgroundXMargin;
    } else {
      valueBackgroundNode.right = backgroundNode.right - options.backgroundXMargin;
    }
    valueNode.centerY = valueBackgroundNode.centerY;
    valueBackgroundNode.top = backgroundNode.top + options.backgroundYMargin;
    particleAndFormula.centerX = valueBackgroundNode.centerX;
    particleAndFormula.top = valueBackgroundNode.bottom + options.ySpacing;
    if (options.isInteractive) {
      // add double-headed arrow
      const arrowNode = new ArrowNode(0, 0, 0, 0.75 * options.backgroundHeight, {
        doubleHead: true,
        tailWidth: 10,
        headWidth: 28,
        headHeight: 22,
        fill: options.arrowFill,
        stroke: 'black',
        lineWidth: 2
      });
      this.addChild(arrowNode);

      // put the arrow on opposite side of the indicator's pointer
      if (options.pointerPosition === 'topRight' || options.pointerPosition === 'bottomRight') {
        arrowNode.right = backgroundNode.left - options.arrowXSpacing;
      } else {
        arrowNode.left = backgroundNode.right + options.arrowXSpacing;
      }
      arrowNode.centerY = backgroundNode.centerY;

      // make the entire bounds interactive, so there's no dead space between background and arrows
      this.mouseArea = this.touchArea = this.localBounds;

      // set pickable false for nodes that don't need to be interactive, to improve performance.
      valueNode.pickable = false;
      valueBackgroundNode.pickable = false;
      particleAndFormula.pickable = false;

      // Hide the arrow if the indicator is not pickable.
      // See https://github.com/phetsims/ph-scale/issues/126
      this.pickableProperty.lazyLink(() => {
        arrowNode.visible = this.pickable !== false; // pickable may be true, false, or null
      });

      // Hide the arrow when input is enabled.
      this.inputEnabledProperty.link(inputEnabled => {
        arrowNode.visible = inputEnabled;
      });
    } else {
      // The interactive highlight should only activate for "interactive" components
      this.interactiveHighlightEnabled = false;
    }

    // center value on the background
    valueNode.boundsProperty.link(() => {
      valueNode.center = valueBackgroundNode.center;
    });
    this.mutate(options);
  }

  /**
   * Creates an indicator for H2O.
   */
  static createH2OIndicator(valueProperty, options) {
    return new GraphIndicatorNode(valueProperty, new H2ONode(), new RichText(PHScaleConstants.H2O_FORMULA, {
      font: new PhetFont(28),
      fill: 'white'
    }), combineOptions({
      backgroundFill: PHScaleColors.H2O_BACKGROUND,
      pointerPosition: 'bottomLeft',
      mantissaDecimalPlaces: 0,
      exponent: 0
    }, options));
  }

  /**
   * Creates an indicator for H3O+.
   */
  static createH3OIndicator(valueProperty, options) {
    return new GraphIndicatorNode(valueProperty, new H3ONode(), new RichText(PHScaleConstants.H3O_FORMULA, {
      font: new PhetFont(28),
      fill: 'white'
    }), combineOptions({
      backgroundFill: PHScaleColors.ACIDIC,
      pointerPosition: 'topRight'
    }, options));
  }

  /**
   * Creates an indicator for OH-.
   */
  static createOHIndicator(valueProperty, options) {
    return new GraphIndicatorNode(valueProperty, new OHNode(), new RichText(PHScaleConstants.OH_FORMULA, {
      font: new PhetFont(28),
      fill: 'white'
    }), combineOptions({
      backgroundFill: PHScaleColors.BASIC,
      pointerPosition: 'topLeft'
    }, options));
  }
}
phScale.register('GraphIndicatorNode', GraphIndicatorNode);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNYXRyaXgzIiwiU2hhcGUiLCJvcHRpb25pemUiLCJjb21iaW5lT3B0aW9ucyIsIkFycm93Tm9kZSIsIlBoZXRGb250IiwiU2NpZW50aWZpY05vdGF0aW9uTm9kZSIsIkludGVyYWN0aXZlSGlnaGxpZ2h0aW5nIiwiTm9kZSIsIlBhdGgiLCJSZWN0YW5nbGUiLCJSaWNoVGV4dCIsInBoU2NhbGUiLCJQSFNjYWxlQ29sb3JzIiwiUEhTY2FsZUNvbnN0YW50cyIsIkgyT05vZGUiLCJIM09Ob2RlIiwiT0hOb2RlIiwiUE9JTlRFUl9XSURUSF9QRVJDRU5UQUdFIiwiUE9JTlRFUl9IRUlHSFRfUEVSQ0VOVEFHRSIsIkdyYXBoSW5kaWNhdG9yTm9kZSIsImNvbnN0cnVjdG9yIiwidmFsdWVQcm9wZXJ0eSIsInBhcnRpY2xlTm9kZSIsImZvcm11bGFOb2RlIiwicHJvdmlkZWRPcHRpb25zIiwib3B0aW9ucyIsInBvaW50ZXJQb3NpdGlvbiIsImJhY2tncm91bmRGaWxsIiwiYmFja2dyb3VuZFN0cm9rZSIsImJhY2tncm91bmRXaWR0aCIsImJhY2tncm91bmRIZWlnaHQiLCJiYWNrZ3JvdW5kQ29ybmVyUmFkaXVzIiwiYmFja2dyb3VuZExpbmVXaWR0aCIsImJhY2tncm91bmRYTWFyZ2luIiwiYmFja2dyb3VuZFlNYXJnaW4iLCJ2YWx1ZVhNYXJnaW4iLCJ2YWx1ZVlNYXJnaW4iLCJ4U3BhY2luZyIsInlTcGFjaW5nIiwibWFudGlzc2FEZWNpbWFsUGxhY2VzIiwiTE9HQVJJVEhNSUNfTUFOVElTU0FfREVDSU1BTF9QTEFDRVMiLCJleHBvbmVudCIsImlzSW50ZXJhY3RpdmUiLCJhcnJvd0ZpbGwiLCJhcnJvd1hTcGFjaW5nIiwic2NhbGUiLCJ0YWdOYW1lIiwiZm9jdXNhYmxlIiwicGhldGlvSW5wdXRFbmFibGVkUHJvcGVydHlJbnN0cnVtZW50ZWQiLCJzaGFwZU1hdHJpeCIsImlkZW50aXR5Iiwic2NhbGluZyIsIkVycm9yIiwiYmFja2dyb3VuZFNoYXBlIiwibW92ZVRvIiwibGluZVRvIiwiYXJjIiwiTWF0aCIsIlBJIiwiY2xvc2UiLCJ0cmFuc2Zvcm1lZCIsImJhY2tncm91bmROb2RlIiwibGluZVdpZHRoIiwic3Ryb2tlIiwiZmlsbCIsInZhbHVlQmFja2dyb3VuZE5vZGUiLCJ2YWx1ZU5vZGUiLCJmb250Iiwic2V0U2NhbGVNYWduaXR1ZGUiLCJwYXJ0aWNsZUFuZEZvcm11bGEiLCJhZGRDaGlsZCIsImxlZnQiLCJyaWdodCIsImNlbnRlclkiLCJ0b3AiLCJjZW50ZXJYIiwiYm90dG9tIiwiYXJyb3dOb2RlIiwiZG91YmxlSGVhZCIsInRhaWxXaWR0aCIsImhlYWRXaWR0aCIsImhlYWRIZWlnaHQiLCJtb3VzZUFyZWEiLCJ0b3VjaEFyZWEiLCJsb2NhbEJvdW5kcyIsInBpY2thYmxlIiwicGlja2FibGVQcm9wZXJ0eSIsImxhenlMaW5rIiwidmlzaWJsZSIsImlucHV0RW5hYmxlZFByb3BlcnR5IiwibGluayIsImlucHV0RW5hYmxlZCIsImludGVyYWN0aXZlSGlnaGxpZ2h0RW5hYmxlZCIsImJvdW5kc1Byb3BlcnR5IiwiY2VudGVyIiwibXV0YXRlIiwiY3JlYXRlSDJPSW5kaWNhdG9yIiwiSDJPX0ZPUk1VTEEiLCJIMk9fQkFDS0dST1VORCIsImNyZWF0ZUgzT0luZGljYXRvciIsIkgzT19GT1JNVUxBIiwiQUNJRElDIiwiY3JlYXRlT0hJbmRpY2F0b3IiLCJPSF9GT1JNVUxBIiwiQkFTSUMiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkdyYXBoSW5kaWNhdG9yTm9kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxMy0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBHcmFwaEluZGljYXRvck5vZGUgcG9pbnRzIHRvIGEgdmFsdWUgb24gYSBncmFwaCdzIHZlcnRpY2FsIHNjYWxlLlxyXG4gKiBPcmlnaW4gaXMgYXQgdGhlIGluZGljYXRvcidzIHBvaW50ZXIsIGFuZCB0aGUgcG9pbnRlciBjYW4gYmUgYXR0YWNoZWQgdG8gYW55IGNvcm5lciBvZiB0aGUgaW5kaWNhdG9yIChzZWUgb3B0aW9ucy5wb2ludGVyUG9zaXRpb24pLlxyXG4gKiBJbnRlcmFjdGl2ZSBpbmRpY2F0b3JzIGFyZSBkZWNvcmF0ZWQgd2l0aCBhIGRvdWJsZS1oZWFkZWQgYXJyb3csIGluZGljYXRpbmcgdGhlIGRpcmVjdGlvbiBvZiBkcmFnZ2luZy5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgVFJlYWRPbmx5UHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vLi4vYXhvbi9qcy9UUmVhZE9ubHlQcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBNYXRyaXgzIGZyb20gJy4uLy4uLy4uLy4uLy4uL2RvdC9qcy9NYXRyaXgzLmpzJztcclxuaW1wb3J0IHsgU2hhcGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9raXRlL2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgb3B0aW9uaXplLCB7IGNvbWJpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL29wdGlvbml6ZS5qcyc7XHJcbmltcG9ydCBQaWNrUmVxdWlyZWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL3R5cGVzL1BpY2tSZXF1aXJlZC5qcyc7XHJcbmltcG9ydCBBcnJvd05vZGUgZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL0Fycm93Tm9kZS5qcyc7XHJcbmltcG9ydCBQaGV0Rm9udCBmcm9tICcuLi8uLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMvUGhldEZvbnQuanMnO1xyXG5pbXBvcnQgU2NpZW50aWZpY05vdGF0aW9uTm9kZSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMvU2NpZW50aWZpY05vdGF0aW9uTm9kZS5qcyc7XHJcbmltcG9ydCB7IEludGVyYWN0aXZlSGlnaGxpZ2h0aW5nLCBOb2RlLCBOb2RlT3B0aW9ucywgTm9kZVRyYW5zbGF0aW9uT3B0aW9ucywgUGF0aCwgUmVjdGFuZ2xlLCBSaWNoVGV4dCwgVENvbG9yIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IHBoU2NhbGUgZnJvbSAnLi4vLi4vLi4vcGhTY2FsZS5qcyc7XHJcbmltcG9ydCBQSFNjYWxlQ29sb3JzIGZyb20gJy4uLy4uL1BIU2NhbGVDb2xvcnMuanMnO1xyXG5pbXBvcnQgUEhTY2FsZUNvbnN0YW50cyBmcm9tICcuLi8uLi9QSFNjYWxlQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IEgyT05vZGUgZnJvbSAnLi4vcGFydGljbGVzL0gyT05vZGUuanMnO1xyXG5pbXBvcnQgSDNPTm9kZSBmcm9tICcuLi9wYXJ0aWNsZXMvSDNPTm9kZS5qcyc7XHJcbmltcG9ydCBPSE5vZGUgZnJvbSAnLi4vcGFydGljbGVzL09ITm9kZS5qcyc7XHJcblxyXG4vLyBjb25zdGFudHNcclxuY29uc3QgUE9JTlRFUl9XSURUSF9QRVJDRU5UQUdFID0gMC4xNTsgLy8gdXNlZCB0byBjb21wdXRlIHdpZHRoIG9mIHRoZSBwb2ludHkgcGFydCBvZiB0aGUgaW5kaWNhdG9yXHJcbmNvbnN0IFBPSU5URVJfSEVJR0hUX1BFUkNFTlRBR0UgPSAwLjU7IC8vIHVzZWQgdG8gY29tcHV0ZSBoZWlnaHQgb2YgdGhlIHBvaW50eSBwYXJ0IG9mIHRoZSBpbmRpY2F0b3JcclxuXHJcbnR5cGUgUG9pbnRlclBvc2l0aW9uID0gJ3RvcExlZnQnIHwgJ3RvcFJpZ2h0JyB8ICdib3R0b21MZWZ0JyB8ICdib3R0b21SaWdodCc7XHJcblxyXG50eXBlIFNlbGZPcHRpb25zID0ge1xyXG4gIHBvaW50ZXJQb3NpdGlvbj86IFBvaW50ZXJQb3NpdGlvbjtcclxuICBiYWNrZ3JvdW5kRmlsbD86IFRDb2xvcjtcclxuICBiYWNrZ3JvdW5kU3Ryb2tlPzogVENvbG9yO1xyXG4gIGJhY2tncm91bmRXaWR0aD86IG51bWJlcjtcclxuICBiYWNrZ3JvdW5kSGVpZ2h0PzogbnVtYmVyO1xyXG4gIGJhY2tncm91bmRDb3JuZXJSYWRpdXM/OiBudW1iZXI7XHJcbiAgYmFja2dyb3VuZExpbmVXaWR0aD86IG51bWJlcjtcclxuICBiYWNrZ3JvdW5kWE1hcmdpbj86IG51bWJlcjtcclxuICBiYWNrZ3JvdW5kWU1hcmdpbj86IG51bWJlcjtcclxuICB2YWx1ZVhNYXJnaW4/OiBudW1iZXI7XHJcbiAgdmFsdWVZTWFyZ2luPzogbnVtYmVyO1xyXG4gIHhTcGFjaW5nPzogbnVtYmVyO1xyXG4gIHlTcGFjaW5nPzogbnVtYmVyO1xyXG4gIG1hbnRpc3NhRGVjaW1hbFBsYWNlcz86IG51bWJlcjtcclxuICBleHBvbmVudD86IG51bWJlciB8IG51bGw7IC8vIG51bGwgY2F1c2VzIGV4cG9uZW50IHRvIGJlIGNvbXB1dGVkXHJcbiAgaXNJbnRlcmFjdGl2ZT86IGJvb2xlYW47XHJcbiAgYXJyb3dGaWxsPzogVENvbG9yO1xyXG4gIGFycm93WFNwYWNpbmc/OiBudW1iZXI7XHJcbn07XHJcblxyXG50eXBlIEdyYXBoSW5kaWNhdG9yTm9kZU9wdGlvbnMgPSBTZWxmT3B0aW9ucyAmIE5vZGVUcmFuc2xhdGlvbk9wdGlvbnMgJiBQaWNrUmVxdWlyZWQ8Tm9kZU9wdGlvbnMsICd0YW5kZW0nPjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoSW5kaWNhdG9yTm9kZSBleHRlbmRzIEludGVyYWN0aXZlSGlnaGxpZ2h0aW5nKCBOb2RlICkge1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIHZhbHVlUHJvcGVydHk6IFRSZWFkT25seVByb3BlcnR5PG51bWJlciB8IG51bGw+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgcGFydGljbGVOb2RlOiBOb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZm9ybXVsYU5vZGU6IE5vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlZE9wdGlvbnM6IEdyYXBoSW5kaWNhdG9yTm9kZU9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxHcmFwaEluZGljYXRvck5vZGVPcHRpb25zLCBTZWxmT3B0aW9ucywgTm9kZU9wdGlvbnM+KCkoIHtcclxuXHJcbiAgICAgIC8vIFNlbGZPcHRpb25zXHJcbiAgICAgIHBvaW50ZXJQb3NpdGlvbjogJ3RvcFJpZ2h0JyxcclxuICAgICAgYmFja2dyb3VuZEZpbGw6ICd3aGl0ZScsXHJcbiAgICAgIGJhY2tncm91bmRTdHJva2U6ICdibGFjaycsXHJcbiAgICAgIGJhY2tncm91bmRXaWR0aDogMTYwLFxyXG4gICAgICBiYWNrZ3JvdW5kSGVpZ2h0OiA4MCxcclxuICAgICAgYmFja2dyb3VuZENvcm5lclJhZGl1czogMTAsXHJcbiAgICAgIGJhY2tncm91bmRMaW5lV2lkdGg6IDIsXHJcbiAgICAgIGJhY2tncm91bmRYTWFyZ2luOiAxMCxcclxuICAgICAgYmFja2dyb3VuZFlNYXJnaW46IDgsXHJcbiAgICAgIHZhbHVlWE1hcmdpbjogNSxcclxuICAgICAgdmFsdWVZTWFyZ2luOiAzLFxyXG4gICAgICB4U3BhY2luZzogOCxcclxuICAgICAgeVNwYWNpbmc6IDQsXHJcbiAgICAgIG1hbnRpc3NhRGVjaW1hbFBsYWNlczogUEhTY2FsZUNvbnN0YW50cy5MT0dBUklUSE1JQ19NQU5USVNTQV9ERUNJTUFMX1BMQUNFUyxcclxuICAgICAgZXhwb25lbnQ6IG51bGwsXHJcbiAgICAgIGlzSW50ZXJhY3RpdmU6IGZhbHNlLFxyXG4gICAgICBhcnJvd0ZpbGw6ICdyZ2IoIDAsIDIwMCwgMCApJyxcclxuICAgICAgYXJyb3dYU3BhY2luZzogNSxcclxuXHJcbiAgICAgIC8vIE5vZGVPcHRpb25zXHJcbiAgICAgIHNjYWxlOiAwLjc1LCAvLyBzcGVjaWZpZWQgYnkgZGVzaWduIHRlYW1cclxuICAgICAgdGFnTmFtZTogJ2RpdidcclxuICAgIH0sIHByb3ZpZGVkT3B0aW9ucyApO1xyXG5cclxuICAgIC8vIEluc3RydW1lbnQgaW50ZXJhY3RpdmVQcm9wZXJ0eSBmb3IgaW50ZXJhY3RpdmUgaW5kaWNhdG9ycy5cclxuICAgIGlmICggb3B0aW9ucy5pc0ludGVyYWN0aXZlICkge1xyXG4gICAgICBvcHRpb25zLmZvY3VzYWJsZSA9IHRydWU7XHJcbiAgICAgIG9wdGlvbnMucGhldGlvSW5wdXRFbmFibGVkUHJvcGVydHlJbnN0cnVtZW50ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgLy8gVHJhbnNmb3JtIHNoYXBlcyB0byBzdXBwb3J0IHZhcmlvdXMgb3JpZW50YXRpb25zIG9mIHBvaW50ZXIuXHJcbiAgICBsZXQgc2hhcGVNYXRyaXg7XHJcbiAgICBpZiAoIG9wdGlvbnMucG9pbnRlclBvc2l0aW9uID09PSAndG9wUmlnaHQnICkge1xyXG4gICAgICBzaGFwZU1hdHJpeCA9IE1hdHJpeDMuaWRlbnRpdHkoKTsgLy8gYmFja2dyb3VuZCBzaGFwZSB3aWxsIGJlIGRyYXduIHdpdGggcG9pbnRlciBhdCB0b3AtcmlnaHRcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCBvcHRpb25zLnBvaW50ZXJQb3NpdGlvbiA9PT0gJ3RvcExlZnQnICkge1xyXG4gICAgICBzaGFwZU1hdHJpeCA9IE1hdHJpeDMuc2NhbGluZyggLTEsIDEgKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCBvcHRpb25zLnBvaW50ZXJQb3NpdGlvbiA9PT0gJ2JvdHRvbVJpZ2h0JyApIHtcclxuICAgICAgc2hhcGVNYXRyaXggPSBNYXRyaXgzLnNjYWxpbmcoIDEsIC0xICk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICggb3B0aW9ucy5wb2ludGVyUG9zaXRpb24gPT09ICdib3R0b21MZWZ0JyApIHtcclxuICAgICAgc2hhcGVNYXRyaXggPSBNYXRyaXgzLnNjYWxpbmcoIC0xLCAtMSApO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvciggYHVuc3VwcG9ydGVkIG9wdGlvbnMucG9pbnRlclBvc2l0aW9uOiAke29wdGlvbnMucG9pbnRlclBvc2l0aW9ufWAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBCYWNrZ3JvdW5kIHdpdGggdGhlIHBvaW50ZXIgYXQgdG9wLXJpZ2h0LiBQcm9jZWVkIGNsb2Nrd2lzZSBmcm9tIHRoZSB0aXAgb2YgdGhlIHBvaW50ZXIuXHJcbiAgICBjb25zdCBiYWNrZ3JvdW5kU2hhcGUgPSBuZXcgU2hhcGUoKVxyXG4gICAgICAubW92ZVRvKCAwLCAwIClcclxuICAgICAgLmxpbmVUbyggLVBPSU5URVJfV0lEVEhfUEVSQ0VOVEFHRSAqIG9wdGlvbnMuYmFja2dyb3VuZFdpZHRoLCAoIFBPSU5URVJfSEVJR0hUX1BFUkNFTlRBR0UgKiBvcHRpb25zLmJhY2tncm91bmRIZWlnaHQgKSAtIG9wdGlvbnMuYmFja2dyb3VuZENvcm5lclJhZGl1cyApXHJcbiAgICAgIC5hcmMoICggLVBPSU5URVJfV0lEVEhfUEVSQ0VOVEFHRSAqIG9wdGlvbnMuYmFja2dyb3VuZFdpZHRoICkgLSBvcHRpb25zLmJhY2tncm91bmRDb3JuZXJSYWRpdXMsIG9wdGlvbnMuYmFja2dyb3VuZEhlaWdodCAtIG9wdGlvbnMuYmFja2dyb3VuZENvcm5lclJhZGl1cywgb3B0aW9ucy5iYWNrZ3JvdW5kQ29ybmVyUmFkaXVzLCAwLCBNYXRoLlBJIC8gMiwgZmFsc2UgKVxyXG4gICAgICAubGluZVRvKCAtb3B0aW9ucy5iYWNrZ3JvdW5kV2lkdGggKyBvcHRpb25zLmJhY2tncm91bmRDb3JuZXJSYWRpdXMsIG9wdGlvbnMuYmFja2dyb3VuZEhlaWdodCApXHJcbiAgICAgIC5hcmMoIC1vcHRpb25zLmJhY2tncm91bmRXaWR0aCArIG9wdGlvbnMuYmFja2dyb3VuZENvcm5lclJhZGl1cywgb3B0aW9ucy5iYWNrZ3JvdW5kSGVpZ2h0IC0gb3B0aW9ucy5iYWNrZ3JvdW5kQ29ybmVyUmFkaXVzLCBvcHRpb25zLmJhY2tncm91bmRDb3JuZXJSYWRpdXMsIE1hdGguUEkgLyAyLCBNYXRoLlBJLCBmYWxzZSApXHJcbiAgICAgIC5saW5lVG8oIC1vcHRpb25zLmJhY2tncm91bmRXaWR0aCwgb3B0aW9ucy5iYWNrZ3JvdW5kQ29ybmVyUmFkaXVzIClcclxuICAgICAgLmFyYyggLW9wdGlvbnMuYmFja2dyb3VuZFdpZHRoICsgb3B0aW9ucy5iYWNrZ3JvdW5kQ29ybmVyUmFkaXVzLCBvcHRpb25zLmJhY2tncm91bmRDb3JuZXJSYWRpdXMsIG9wdGlvbnMuYmFja2dyb3VuZENvcm5lclJhZGl1cywgTWF0aC5QSSwgMS41ICogTWF0aC5QSSwgZmFsc2UgKVxyXG4gICAgICAuY2xvc2UoKVxyXG4gICAgICAudHJhbnNmb3JtZWQoIHNoYXBlTWF0cml4ICk7XHJcbiAgICBjb25zdCBiYWNrZ3JvdW5kTm9kZSA9IG5ldyBQYXRoKCBiYWNrZ3JvdW5kU2hhcGUsIHtcclxuICAgICAgbGluZVdpZHRoOiBvcHRpb25zLmJhY2tncm91bmRMaW5lV2lkdGgsXHJcbiAgICAgIHN0cm9rZTogb3B0aW9ucy5iYWNrZ3JvdW5kU3Ryb2tlLFxyXG4gICAgICBmaWxsOiBvcHRpb25zLmJhY2tncm91bmRGaWxsXHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gQ3V0b3V0IHdoZXJlIHRoZSB2YWx1ZSBpcyBkaXNwbGF5ZWQuXHJcbiAgICBjb25zdCB2YWx1ZUJhY2tncm91bmROb2RlID0gbmV3IFJlY3RhbmdsZSggMCwgMCxcclxuICAgICAgKCAoIDEgLSBQT0lOVEVSX1dJRFRIX1BFUkNFTlRBR0UgKSAqIG9wdGlvbnMuYmFja2dyb3VuZFdpZHRoICkgLSAoIDIgKiBvcHRpb25zLmJhY2tncm91bmRYTWFyZ2luICksXHJcbiAgICAgIDAuNSAqIG9wdGlvbnMuYmFja2dyb3VuZEhlaWdodCAtIG9wdGlvbnMuYmFja2dyb3VuZFlNYXJnaW4gLSAoIG9wdGlvbnMueVNwYWNpbmcgLyAyICksXHJcbiAgICAgIDAuNSAqIG9wdGlvbnMuYmFja2dyb3VuZENvcm5lclJhZGl1cywgMC41ICogb3B0aW9ucy5iYWNrZ3JvdW5kQ29ybmVyUmFkaXVzLCB7XHJcbiAgICAgICAgZmlsbDogJ3doaXRlJyxcclxuICAgICAgICBzdHJva2U6ICdncmF5J1xyXG4gICAgICB9ICk7XHJcblxyXG4gICAgLy8gVmFsdWUsIHNjYWxlZCB0byBmaXQgYmFja2dyb3VuZCBoZWlnaHRcclxuICAgIGNvbnN0IHZhbHVlTm9kZSA9IG5ldyBTY2llbnRpZmljTm90YXRpb25Ob2RlKCB2YWx1ZVByb3BlcnR5LCB7XHJcbiAgICAgIGZvbnQ6IG5ldyBQaGV0Rm9udCggMjggKSxcclxuICAgICAgZmlsbDogJ2JsYWNrJyxcclxuICAgICAgbWFudGlzc2FEZWNpbWFsUGxhY2VzOiBvcHRpb25zLm1hbnRpc3NhRGVjaW1hbFBsYWNlcyxcclxuICAgICAgZXhwb25lbnQ6IG9wdGlvbnMuZXhwb25lbnRcclxuICAgIH0gKTtcclxuICAgIHZhbHVlTm9kZS5zZXRTY2FsZU1hZ25pdHVkZSggMC43ICk7XHJcblxyXG4gICAgLy8gcGFydGljbGUgYW5kIGZvcm11bGEsIHNjYWxlZCB0byBmaXQgYXZhaWxhYmxlIGhlaWdodFxyXG4gICAgY29uc3QgcGFydGljbGVBbmRGb3JtdWxhID0gbmV3IE5vZGUoKTtcclxuICAgIHBhcnRpY2xlQW5kRm9ybXVsYS5hZGRDaGlsZCggcGFydGljbGVOb2RlICk7XHJcbiAgICBwYXJ0aWNsZUFuZEZvcm11bGEuYWRkQ2hpbGQoIGZvcm11bGFOb2RlICk7XHJcbiAgICBmb3JtdWxhTm9kZS5sZWZ0ID0gcGFydGljbGVOb2RlLnJpZ2h0ICsgb3B0aW9ucy54U3BhY2luZztcclxuICAgIGZvcm11bGFOb2RlLmNlbnRlclkgPSBwYXJ0aWNsZU5vZGUuY2VudGVyWTtcclxuICAgIHBhcnRpY2xlQW5kRm9ybXVsYS5zZXRTY2FsZU1hZ25pdHVkZSggMC43ICk7XHJcblxyXG4gICAgLy8gcmVuZGVyaW5nIG9yZGVyXHJcbiAgICB0aGlzLmFkZENoaWxkKCBiYWNrZ3JvdW5kTm9kZSApO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggdmFsdWVCYWNrZ3JvdW5kTm9kZSApO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggdmFsdWVOb2RlICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCBwYXJ0aWNsZUFuZEZvcm11bGEgKTtcclxuXHJcbiAgICAvLyBsYXlvdXQsIHJlbGF0aXZlIHRvIGJhY2tncm91bmROb2RlXHJcbiAgICBpZiAoIG9wdGlvbnMucG9pbnRlclBvc2l0aW9uID09PSAndG9wUmlnaHQnIHx8IG9wdGlvbnMucG9pbnRlclBvc2l0aW9uID09PSAnYm90dG9tUmlnaHQnICkge1xyXG4gICAgICB2YWx1ZUJhY2tncm91bmROb2RlLmxlZnQgPSBiYWNrZ3JvdW5kTm9kZS5sZWZ0ICsgb3B0aW9ucy5iYWNrZ3JvdW5kWE1hcmdpbjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB2YWx1ZUJhY2tncm91bmROb2RlLnJpZ2h0ID0gYmFja2dyb3VuZE5vZGUucmlnaHQgLSBvcHRpb25zLmJhY2tncm91bmRYTWFyZ2luO1xyXG4gICAgfVxyXG4gICAgdmFsdWVOb2RlLmNlbnRlclkgPSB2YWx1ZUJhY2tncm91bmROb2RlLmNlbnRlclk7XHJcbiAgICB2YWx1ZUJhY2tncm91bmROb2RlLnRvcCA9IGJhY2tncm91bmROb2RlLnRvcCArIG9wdGlvbnMuYmFja2dyb3VuZFlNYXJnaW47XHJcbiAgICBwYXJ0aWNsZUFuZEZvcm11bGEuY2VudGVyWCA9IHZhbHVlQmFja2dyb3VuZE5vZGUuY2VudGVyWDtcclxuICAgIHBhcnRpY2xlQW5kRm9ybXVsYS50b3AgPSB2YWx1ZUJhY2tncm91bmROb2RlLmJvdHRvbSArIG9wdGlvbnMueVNwYWNpbmc7XHJcblxyXG4gICAgaWYgKCBvcHRpb25zLmlzSW50ZXJhY3RpdmUgKSB7XHJcblxyXG4gICAgICAvLyBhZGQgZG91YmxlLWhlYWRlZCBhcnJvd1xyXG4gICAgICBjb25zdCBhcnJvd05vZGUgPSBuZXcgQXJyb3dOb2RlKCAwLCAwLCAwLCAwLjc1ICogb3B0aW9ucy5iYWNrZ3JvdW5kSGVpZ2h0LCB7XHJcbiAgICAgICAgZG91YmxlSGVhZDogdHJ1ZSxcclxuICAgICAgICB0YWlsV2lkdGg6IDEwLFxyXG4gICAgICAgIGhlYWRXaWR0aDogMjgsXHJcbiAgICAgICAgaGVhZEhlaWdodDogMjIsXHJcbiAgICAgICAgZmlsbDogb3B0aW9ucy5hcnJvd0ZpbGwsXHJcbiAgICAgICAgc3Ryb2tlOiAnYmxhY2snLFxyXG4gICAgICAgIGxpbmVXaWR0aDogMlxyXG4gICAgICB9ICk7XHJcbiAgICAgIHRoaXMuYWRkQ2hpbGQoIGFycm93Tm9kZSApO1xyXG5cclxuICAgICAgLy8gcHV0IHRoZSBhcnJvdyBvbiBvcHBvc2l0ZSBzaWRlIG9mIHRoZSBpbmRpY2F0b3IncyBwb2ludGVyXHJcbiAgICAgIGlmICggb3B0aW9ucy5wb2ludGVyUG9zaXRpb24gPT09ICd0b3BSaWdodCcgfHwgb3B0aW9ucy5wb2ludGVyUG9zaXRpb24gPT09ICdib3R0b21SaWdodCcgKSB7XHJcbiAgICAgICAgYXJyb3dOb2RlLnJpZ2h0ID0gYmFja2dyb3VuZE5vZGUubGVmdCAtIG9wdGlvbnMuYXJyb3dYU3BhY2luZztcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBhcnJvd05vZGUubGVmdCA9IGJhY2tncm91bmROb2RlLnJpZ2h0ICsgb3B0aW9ucy5hcnJvd1hTcGFjaW5nO1xyXG4gICAgICB9XHJcbiAgICAgIGFycm93Tm9kZS5jZW50ZXJZID0gYmFja2dyb3VuZE5vZGUuY2VudGVyWTtcclxuXHJcbiAgICAgIC8vIG1ha2UgdGhlIGVudGlyZSBib3VuZHMgaW50ZXJhY3RpdmUsIHNvIHRoZXJlJ3Mgbm8gZGVhZCBzcGFjZSBiZXR3ZWVuIGJhY2tncm91bmQgYW5kIGFycm93c1xyXG4gICAgICB0aGlzLm1vdXNlQXJlYSA9IHRoaXMudG91Y2hBcmVhID0gdGhpcy5sb2NhbEJvdW5kcztcclxuXHJcbiAgICAgIC8vIHNldCBwaWNrYWJsZSBmYWxzZSBmb3Igbm9kZXMgdGhhdCBkb24ndCBuZWVkIHRvIGJlIGludGVyYWN0aXZlLCB0byBpbXByb3ZlIHBlcmZvcm1hbmNlLlxyXG4gICAgICB2YWx1ZU5vZGUucGlja2FibGUgPSBmYWxzZTtcclxuICAgICAgdmFsdWVCYWNrZ3JvdW5kTm9kZS5waWNrYWJsZSA9IGZhbHNlO1xyXG4gICAgICBwYXJ0aWNsZUFuZEZvcm11bGEucGlja2FibGUgPSBmYWxzZTtcclxuXHJcbiAgICAgIC8vIEhpZGUgdGhlIGFycm93IGlmIHRoZSBpbmRpY2F0b3IgaXMgbm90IHBpY2thYmxlLlxyXG4gICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3BoZXRzaW1zL3BoLXNjYWxlL2lzc3Vlcy8xMjZcclxuICAgICAgdGhpcy5waWNrYWJsZVByb3BlcnR5LmxhenlMaW5rKCAoKSA9PiB7XHJcbiAgICAgICAgYXJyb3dOb2RlLnZpc2libGUgPSAoIHRoaXMucGlja2FibGUgIT09IGZhbHNlICk7IC8vIHBpY2thYmxlIG1heSBiZSB0cnVlLCBmYWxzZSwgb3IgbnVsbFxyXG4gICAgICB9ICk7XHJcblxyXG4gICAgICAvLyBIaWRlIHRoZSBhcnJvdyB3aGVuIGlucHV0IGlzIGVuYWJsZWQuXHJcbiAgICAgIHRoaXMuaW5wdXRFbmFibGVkUHJvcGVydHkubGluayggaW5wdXRFbmFibGVkID0+IHtcclxuICAgICAgICBhcnJvd05vZGUudmlzaWJsZSA9IGlucHV0RW5hYmxlZDtcclxuICAgICAgfSApO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcblxyXG4gICAgICAvLyBUaGUgaW50ZXJhY3RpdmUgaGlnaGxpZ2h0IHNob3VsZCBvbmx5IGFjdGl2YXRlIGZvciBcImludGVyYWN0aXZlXCIgY29tcG9uZW50c1xyXG4gICAgICB0aGlzLmludGVyYWN0aXZlSGlnaGxpZ2h0RW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNlbnRlciB2YWx1ZSBvbiB0aGUgYmFja2dyb3VuZFxyXG4gICAgdmFsdWVOb2RlLmJvdW5kc1Byb3BlcnR5LmxpbmsoICgpID0+IHtcclxuICAgICAgdmFsdWVOb2RlLmNlbnRlciA9IHZhbHVlQmFja2dyb3VuZE5vZGUuY2VudGVyO1xyXG4gICAgfSApO1xyXG5cclxuICAgIHRoaXMubXV0YXRlKCBvcHRpb25zICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuIGluZGljYXRvciBmb3IgSDJPLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlSDJPSW5kaWNhdG9yKCB2YWx1ZVByb3BlcnR5OiBUUmVhZE9ubHlQcm9wZXJ0eTxudW1iZXIgfCBudWxsPixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogR3JhcGhJbmRpY2F0b3JOb2RlT3B0aW9ucyApOiBHcmFwaEluZGljYXRvck5vZGUge1xyXG4gICAgcmV0dXJuIG5ldyBHcmFwaEluZGljYXRvck5vZGUoIHZhbHVlUHJvcGVydHksXHJcbiAgICAgIG5ldyBIMk9Ob2RlKCksXHJcbiAgICAgIG5ldyBSaWNoVGV4dCggUEhTY2FsZUNvbnN0YW50cy5IMk9fRk9STVVMQSwgeyBmb250OiBuZXcgUGhldEZvbnQoIDI4ICksIGZpbGw6ICd3aGl0ZScgfSApLFxyXG4gICAgICBjb21iaW5lT3B0aW9uczxHcmFwaEluZGljYXRvck5vZGVPcHRpb25zPigge1xyXG4gICAgICAgIGJhY2tncm91bmRGaWxsOiBQSFNjYWxlQ29sb3JzLkgyT19CQUNLR1JPVU5ELFxyXG4gICAgICAgIHBvaW50ZXJQb3NpdGlvbjogJ2JvdHRvbUxlZnQnLFxyXG4gICAgICAgIG1hbnRpc3NhRGVjaW1hbFBsYWNlczogMCxcclxuICAgICAgICBleHBvbmVudDogMFxyXG4gICAgICB9LCBvcHRpb25zICkgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYW4gaW5kaWNhdG9yIGZvciBIM08rLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlSDNPSW5kaWNhdG9yKCB2YWx1ZVByb3BlcnR5OiBUUmVhZE9ubHlQcm9wZXJ0eTxudW1iZXIgfCBudWxsPixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogR3JhcGhJbmRpY2F0b3JOb2RlT3B0aW9ucyApOiBHcmFwaEluZGljYXRvck5vZGUge1xyXG4gICAgcmV0dXJuIG5ldyBHcmFwaEluZGljYXRvck5vZGUoIHZhbHVlUHJvcGVydHksXHJcbiAgICAgIG5ldyBIM09Ob2RlKCksXHJcbiAgICAgIG5ldyBSaWNoVGV4dCggUEhTY2FsZUNvbnN0YW50cy5IM09fRk9STVVMQSwgeyBmb250OiBuZXcgUGhldEZvbnQoIDI4ICksIGZpbGw6ICd3aGl0ZScgfSApLFxyXG4gICAgICBjb21iaW5lT3B0aW9uczxHcmFwaEluZGljYXRvck5vZGVPcHRpb25zPigge1xyXG4gICAgICAgIGJhY2tncm91bmRGaWxsOiBQSFNjYWxlQ29sb3JzLkFDSURJQyxcclxuICAgICAgICBwb2ludGVyUG9zaXRpb246ICd0b3BSaWdodCdcclxuICAgICAgfSwgb3B0aW9ucyApICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuIGluZGljYXRvciBmb3IgT0gtLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlT0hJbmRpY2F0b3IoIHZhbHVlUHJvcGVydHk6IFRSZWFkT25seVByb3BlcnR5PG51bWJlciB8IG51bGw+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IEdyYXBoSW5kaWNhdG9yTm9kZU9wdGlvbnMgKTogR3JhcGhJbmRpY2F0b3JOb2RlIHtcclxuICAgIHJldHVybiBuZXcgR3JhcGhJbmRpY2F0b3JOb2RlKCB2YWx1ZVByb3BlcnR5LFxyXG4gICAgICBuZXcgT0hOb2RlKCksXHJcbiAgICAgIG5ldyBSaWNoVGV4dCggUEhTY2FsZUNvbnN0YW50cy5PSF9GT1JNVUxBLCB7IGZvbnQ6IG5ldyBQaGV0Rm9udCggMjggKSwgZmlsbDogJ3doaXRlJyB9ICksXHJcbiAgICAgIGNvbWJpbmVPcHRpb25zPEdyYXBoSW5kaWNhdG9yTm9kZU9wdGlvbnM+KCB7XHJcbiAgICAgICAgYmFja2dyb3VuZEZpbGw6IFBIU2NhbGVDb2xvcnMuQkFTSUMsXHJcbiAgICAgICAgcG9pbnRlclBvc2l0aW9uOiAndG9wTGVmdCdcclxuICAgICAgfSwgb3B0aW9ucyApICk7XHJcbiAgfVxyXG59XHJcblxyXG5waFNjYWxlLnJlZ2lzdGVyKCAnR3JhcGhJbmRpY2F0b3JOb2RlJywgR3JhcGhJbmRpY2F0b3JOb2RlICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQSxPQUFPQSxPQUFPLE1BQU0sa0NBQWtDO0FBQ3RELFNBQVNDLEtBQUssUUFBUSxtQ0FBbUM7QUFDekQsT0FBT0MsU0FBUyxJQUFJQyxjQUFjLFFBQVEsMENBQTBDO0FBRXBGLE9BQU9DLFNBQVMsTUFBTSw2Q0FBNkM7QUFDbkUsT0FBT0MsUUFBUSxNQUFNLDRDQUE0QztBQUNqRSxPQUFPQyxzQkFBc0IsTUFBTSwwREFBMEQ7QUFDN0YsU0FBU0MsdUJBQXVCLEVBQUVDLElBQUksRUFBdUNDLElBQUksRUFBRUMsU0FBUyxFQUFFQyxRQUFRLFFBQWdCLHNDQUFzQztBQUM1SixPQUFPQyxPQUFPLE1BQU0scUJBQXFCO0FBQ3pDLE9BQU9DLGFBQWEsTUFBTSx3QkFBd0I7QUFDbEQsT0FBT0MsZ0JBQWdCLE1BQU0sMkJBQTJCO0FBQ3hELE9BQU9DLE9BQU8sTUFBTSx5QkFBeUI7QUFDN0MsT0FBT0MsT0FBTyxNQUFNLHlCQUF5QjtBQUM3QyxPQUFPQyxNQUFNLE1BQU0sd0JBQXdCOztBQUUzQztBQUNBLE1BQU1DLHdCQUF3QixHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLE1BQU1DLHlCQUF5QixHQUFHLEdBQUcsQ0FBQyxDQUFDOztBQTJCdkMsZUFBZSxNQUFNQyxrQkFBa0IsU0FBU2IsdUJBQXVCLENBQUVDLElBQUssQ0FBQyxDQUFDO0VBRXZFYSxXQUFXQSxDQUFF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