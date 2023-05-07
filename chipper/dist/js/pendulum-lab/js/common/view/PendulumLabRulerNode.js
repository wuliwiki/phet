// Copyright 2014-2022, University of Colorado Boulder

/**
 *  Ruler node in 'Pendulum Lab' simulation.
 *  Ruler is rotated 90 degrees.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import RulerNode from '../../../../scenery-phet/js/RulerNode.js';
import { DragListener } from '../../../../scenery/js/imports.js';
import Property from '../../../../axon/js/Property.js';
import pendulumLab from '../../pendulumLab.js';
import PendulumLabStrings from '../../PendulumLabStrings.js';
import PendulumLabConstants from '../PendulumLabConstants.js';
const rulerUnitsString = PendulumLabStrings.rulerUnits;

// constants
const RULER_HEIGHT = 34;
const TICK_INTERVAL = 5; // tick interval in cm

class PendulumLabRulerNode extends RulerNode {
  /**
   * @param {Ruler} ruler - Model for ruler.
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Bounds2} layoutBounds - Bounds of screen view
   */
  constructor(ruler, modelViewTransform, layoutBounds) {
    // create tick labels
    let tickLabel;
    const rulerTicks = ['']; // zero tick is not labeled
    for (let currentTick = TICK_INTERVAL; currentTick < ruler.length * 100; currentTick += TICK_INTERVAL) {
      // if the current tick is a multiple of twice the Tick interval then label it as such otherwise it is not labeled.
      tickLabel = currentTick % (2 * TICK_INTERVAL) ? '' : currentTick.toString();
      rulerTicks.push(tickLabel);
    }
    rulerTicks.push(''); // last tick is not labeled

    // define ruler params in view coordinates
    const rulerWidth = modelViewTransform.modelToViewDeltaX(ruler.length);
    const tickWidth = rulerWidth / (rulerTicks.length - 1);
    super(rulerWidth, RULER_HEIGHT, tickWidth, rulerTicks, rulerUnitsString, {
      backgroundFill: 'rgb( 237, 225, 121 )',
      cursor: 'pointer',
      insetsWidth: 0,
      majorTickFont: PendulumLabConstants.RULER_FONT,
      majorTickHeight: 12,
      minorTickHeight: 6,
      unitsFont: PendulumLabConstants.RULER_FONT,
      unitsMajorTickIndex: rulerTicks.length - 3,
      minorTicksPerMajorTick: 4,
      tickMarksOnBottom: false
    });

    // make it a vertical ruler
    this.rotate(Math.PI / 2);

    // @public
    this.dragListener = new DragListener({
      positionProperty: ruler.positionProperty,
      useParentOffset: true,
      dragBoundsProperty: new Property(layoutBounds.erodedXY(this.width / 2, this.height / 2))
    });

    // add drag and drop events
    this.addInputListener(this.dragListener);

    // add update of node position
    ruler.positionProperty.lazyLink(position => {
      // because it's initially null, and will be null on a reset
      if (position) {
        this.center = position;
      }
    });

    // set visibility observer
    ruler.isVisibleProperty.linkAttribute(this, 'visible');
  }
}
pendulumLab.register('PendulumLabRulerNode', PendulumLabRulerNode);
export default PendulumLabRulerNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSdWxlck5vZGUiLCJEcmFnTGlzdGVuZXIiLCJQcm9wZXJ0eSIsInBlbmR1bHVtTGFiIiwiUGVuZHVsdW1MYWJTdHJpbmdzIiwiUGVuZHVsdW1MYWJDb25zdGFudHMiLCJydWxlclVuaXRzU3RyaW5nIiwicnVsZXJVbml0cyIsIlJVTEVSX0hFSUdIVCIsIlRJQ0tfSU5URVJWQUwiLCJQZW5kdWx1bUxhYlJ1bGVyTm9kZSIsImNvbnN0cnVjdG9yIiwicnVsZXIiLCJtb2RlbFZpZXdUcmFuc2Zvcm0iLCJsYXlvdXRCb3VuZHMiLCJ0aWNrTGFiZWwiLCJydWxlclRpY2tzIiwiY3VycmVudFRpY2siLCJsZW5ndGgiLCJ0b1N0cmluZyIsInB1c2giLCJydWxlcldpZHRoIiwibW9kZWxUb1ZpZXdEZWx0YVgiLCJ0aWNrV2lkdGgiLCJiYWNrZ3JvdW5kRmlsbCIsImN1cnNvciIsImluc2V0c1dpZHRoIiwibWFqb3JUaWNrRm9udCIsIlJVTEVSX0ZPTlQiLCJtYWpvclRpY2tIZWlnaHQiLCJtaW5vclRpY2tIZWlnaHQiLCJ1bml0c0ZvbnQiLCJ1bml0c01ham9yVGlja0luZGV4IiwibWlub3JUaWNrc1Blck1ham9yVGljayIsInRpY2tNYXJrc09uQm90dG9tIiwicm90YXRlIiwiTWF0aCIsIlBJIiwiZHJhZ0xpc3RlbmVyIiwicG9zaXRpb25Qcm9wZXJ0eSIsInVzZVBhcmVudE9mZnNldCIsImRyYWdCb3VuZHNQcm9wZXJ0eSIsImVyb2RlZFhZIiwid2lkdGgiLCJoZWlnaHQiLCJhZGRJbnB1dExpc3RlbmVyIiwibGF6eUxpbmsiLCJwb3NpdGlvbiIsImNlbnRlciIsImlzVmlzaWJsZVByb3BlcnR5IiwibGlua0F0dHJpYnV0ZSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiUGVuZHVsdW1MYWJSdWxlck5vZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTQtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogIFJ1bGVyIG5vZGUgaW4gJ1BlbmR1bHVtIExhYicgc2ltdWxhdGlvbi5cclxuICogIFJ1bGVyIGlzIHJvdGF0ZWQgOTAgZGVncmVlcy5cclxuICpcclxuICogQGF1dGhvciBBbmRyZXkgWmVsZW5rb3YgKE1sZWFybmVyKVxyXG4gKi9cclxuXHJcbmltcG9ydCBSdWxlck5vZGUgZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL1J1bGVyTm9kZS5qcyc7XHJcbmltcG9ydCB7IERyYWdMaXN0ZW5lciB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL1Byb3BlcnR5LmpzJztcclxuaW1wb3J0IHBlbmR1bHVtTGFiIGZyb20gJy4uLy4uL3BlbmR1bHVtTGFiLmpzJztcclxuaW1wb3J0IFBlbmR1bHVtTGFiU3RyaW5ncyBmcm9tICcuLi8uLi9QZW5kdWx1bUxhYlN0cmluZ3MuanMnO1xyXG5pbXBvcnQgUGVuZHVsdW1MYWJDb25zdGFudHMgZnJvbSAnLi4vUGVuZHVsdW1MYWJDb25zdGFudHMuanMnO1xyXG5cclxuY29uc3QgcnVsZXJVbml0c1N0cmluZyA9IFBlbmR1bHVtTGFiU3RyaW5ncy5ydWxlclVuaXRzO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IFJVTEVSX0hFSUdIVCA9IDM0O1xyXG5jb25zdCBUSUNLX0lOVEVSVkFMID0gNTsgLy8gdGljayBpbnRlcnZhbCBpbiBjbVxyXG5cclxuY2xhc3MgUGVuZHVsdW1MYWJSdWxlck5vZGUgZXh0ZW5kcyBSdWxlck5vZGUge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7UnVsZXJ9IHJ1bGVyIC0gTW9kZWwgZm9yIHJ1bGVyLlxyXG4gICAqIEBwYXJhbSB7TW9kZWxWaWV3VHJhbnNmb3JtMn0gbW9kZWxWaWV3VHJhbnNmb3JtXHJcbiAgICogQHBhcmFtIHtCb3VuZHMyfSBsYXlvdXRCb3VuZHMgLSBCb3VuZHMgb2Ygc2NyZWVuIHZpZXdcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggcnVsZXIsIG1vZGVsVmlld1RyYW5zZm9ybSwgbGF5b3V0Qm91bmRzICkge1xyXG5cclxuICAgIC8vIGNyZWF0ZSB0aWNrIGxhYmVsc1xyXG4gICAgbGV0IHRpY2tMYWJlbDtcclxuICAgIGNvbnN0IHJ1bGVyVGlja3MgPSBbICcnIF07IC8vIHplcm8gdGljayBpcyBub3QgbGFiZWxlZFxyXG4gICAgZm9yICggbGV0IGN1cnJlbnRUaWNrID0gVElDS19JTlRFUlZBTDsgY3VycmVudFRpY2sgPCBydWxlci5sZW5ndGggKiAxMDA7IGN1cnJlbnRUaWNrICs9IFRJQ0tfSU5URVJWQUwgKSB7XHJcbiAgICAgIC8vIGlmIHRoZSBjdXJyZW50IHRpY2sgaXMgYSBtdWx0aXBsZSBvZiB0d2ljZSB0aGUgVGljayBpbnRlcnZhbCB0aGVuIGxhYmVsIGl0IGFzIHN1Y2ggb3RoZXJ3aXNlIGl0IGlzIG5vdCBsYWJlbGVkLlxyXG4gICAgICB0aWNrTGFiZWwgPSBjdXJyZW50VGljayAlICggMiAqIFRJQ0tfSU5URVJWQUwgKSA/ICcnIDogY3VycmVudFRpY2sudG9TdHJpbmcoKTtcclxuICAgICAgcnVsZXJUaWNrcy5wdXNoKCB0aWNrTGFiZWwgKTtcclxuICAgIH1cclxuICAgIHJ1bGVyVGlja3MucHVzaCggJycgKTsgLy8gbGFzdCB0aWNrIGlzIG5vdCBsYWJlbGVkXHJcblxyXG4gICAgLy8gZGVmaW5lIHJ1bGVyIHBhcmFtcyBpbiB2aWV3IGNvb3JkaW5hdGVzXHJcbiAgICBjb25zdCBydWxlcldpZHRoID0gbW9kZWxWaWV3VHJhbnNmb3JtLm1vZGVsVG9WaWV3RGVsdGFYKCBydWxlci5sZW5ndGggKTtcclxuICAgIGNvbnN0IHRpY2tXaWR0aCA9IHJ1bGVyV2lkdGggLyAoIHJ1bGVyVGlja3MubGVuZ3RoIC0gMSApO1xyXG5cclxuICAgIHN1cGVyKCBydWxlcldpZHRoLCBSVUxFUl9IRUlHSFQsIHRpY2tXaWR0aCwgcnVsZXJUaWNrcywgcnVsZXJVbml0c1N0cmluZywge1xyXG4gICAgICBiYWNrZ3JvdW5kRmlsbDogJ3JnYiggMjM3LCAyMjUsIDEyMSApJyxcclxuICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgIGluc2V0c1dpZHRoOiAwLFxyXG4gICAgICBtYWpvclRpY2tGb250OiBQZW5kdWx1bUxhYkNvbnN0YW50cy5SVUxFUl9GT05ULFxyXG4gICAgICBtYWpvclRpY2tIZWlnaHQ6IDEyLFxyXG4gICAgICBtaW5vclRpY2tIZWlnaHQ6IDYsXHJcbiAgICAgIHVuaXRzRm9udDogUGVuZHVsdW1MYWJDb25zdGFudHMuUlVMRVJfRk9OVCxcclxuICAgICAgdW5pdHNNYWpvclRpY2tJbmRleDogcnVsZXJUaWNrcy5sZW5ndGggLSAzLFxyXG4gICAgICBtaW5vclRpY2tzUGVyTWFqb3JUaWNrOiA0LFxyXG4gICAgICB0aWNrTWFya3NPbkJvdHRvbTogZmFsc2VcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBtYWtlIGl0IGEgdmVydGljYWwgcnVsZXJcclxuICAgIHRoaXMucm90YXRlKCBNYXRoLlBJIC8gMiApO1xyXG5cclxuICAgIC8vIEBwdWJsaWNcclxuICAgIHRoaXMuZHJhZ0xpc3RlbmVyID0gbmV3IERyYWdMaXN0ZW5lcigge1xyXG4gICAgICBwb3NpdGlvblByb3BlcnR5OiBydWxlci5wb3NpdGlvblByb3BlcnR5LFxyXG4gICAgICB1c2VQYXJlbnRPZmZzZXQ6IHRydWUsXHJcbiAgICAgIGRyYWdCb3VuZHNQcm9wZXJ0eTogbmV3IFByb3BlcnR5KCBsYXlvdXRCb3VuZHMuZXJvZGVkWFkoIHRoaXMud2lkdGggLyAyLCB0aGlzLmhlaWdodCAvIDIgKSApXHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gYWRkIGRyYWcgYW5kIGRyb3AgZXZlbnRzXHJcbiAgICB0aGlzLmFkZElucHV0TGlzdGVuZXIoIHRoaXMuZHJhZ0xpc3RlbmVyICk7XHJcblxyXG4gICAgLy8gYWRkIHVwZGF0ZSBvZiBub2RlIHBvc2l0aW9uXHJcbiAgICBydWxlci5wb3NpdGlvblByb3BlcnR5LmxhenlMaW5rKCBwb3NpdGlvbiA9PiB7XHJcbiAgICAgIC8vIGJlY2F1c2UgaXQncyBpbml0aWFsbHkgbnVsbCwgYW5kIHdpbGwgYmUgbnVsbCBvbiBhIHJlc2V0XHJcbiAgICAgIGlmICggcG9zaXRpb24gKSB7XHJcbiAgICAgICAgdGhpcy5jZW50ZXIgPSBwb3NpdGlvbjtcclxuICAgICAgfVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIHNldCB2aXNpYmlsaXR5IG9ic2VydmVyXHJcbiAgICBydWxlci5pc1Zpc2libGVQcm9wZXJ0eS5saW5rQXR0cmlidXRlKCB0aGlzLCAndmlzaWJsZScgKTtcclxuICB9XHJcbn1cclxuXHJcbnBlbmR1bHVtTGFiLnJlZ2lzdGVyKCAnUGVuZHVsdW1MYWJSdWxlck5vZGUnLCBQZW5kdWx1bUxhYlJ1bGVyTm9kZSApO1xyXG5leHBvcnQgZGVmYXVsdCBQZW5kdWx1bUxhYlJ1bGVyTm9kZTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsU0FBUyxNQUFNLDBDQUEwQztBQUNoRSxTQUFTQyxZQUFZLFFBQVEsbUNBQW1DO0FBQ2hFLE9BQU9DLFFBQVEsTUFBTSxpQ0FBaUM7QUFDdEQsT0FBT0MsV0FBVyxNQUFNLHNCQUFzQjtBQUM5QyxPQUFPQyxrQkFBa0IsTUFBTSw2QkFBNkI7QUFDNUQsT0FBT0Msb0JBQW9CLE1BQU0sNEJBQTRCO0FBRTdELE1BQU1DLGdCQUFnQixHQUFHRixrQkFBa0IsQ0FBQ0csVUFBVTs7QUFFdEQ7QUFDQSxNQUFNQyxZQUFZLEdBQUcsRUFBRTtBQUN2QixNQUFNQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0FBRXpCLE1BQU1DLG9CQUFvQixTQUFTVixTQUFTLENBQUM7RUFDM0M7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUNFVyxXQUFXQSxDQUFFQyxLQUFLLEVBQUVDLGtCQUFrQixFQUFFQyxZQUFZLEVBQUc7SUFFckQ7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