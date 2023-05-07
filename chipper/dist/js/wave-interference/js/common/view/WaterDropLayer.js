// Copyright 2018-2022, University of Colorado Boulder
// @ts-nocheck
/**
 * Shows the WaterDrop instances.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Node } from '../../../../scenery/js/imports.js';
import waveInterference from '../../waveInterference.js';
import WaterDropImage from './WaterDropImage.js';
class WaterDropLayer extends Node {
  constructor(model, waveAreaNodeBounds, options) {
    super();
    const waterDropX = model.waterScene.getWaterDropX();

    // Preallocate Images that will be associated with different water drop instances.
    const MAX_DROPS = 4;
    const waterDropNodes = _.times(MAX_DROPS, () => new WaterDropImage());
    assert && assert(!options || !options.children, 'children overwritten in WaterDropLayer');
    this.children = waterDropNodes;
    this.mutate(options);
    const updateWaterDropNodes = () => {
      waterDropNodes.forEach(waterDropNode => waterDropNode.setVisible(false));
      model.waterScene.waterDrops.forEach((waterDrop, i) => {
        if (i < waterDropNodes.length) {
          // Indicate which WaterDrop corresponds to this image so when the view goes underwater, the model can
          // be marked as absorbed
          waterDropNodes[i].waterDrop = waterDrop;
          waterDropNodes[i].visible = waterDrop.amplitude > 0 && !waterDrop.absorbed && waterDrop.startsOscillation;
          waterDropNodes[i].setScaleMagnitude(Utils.linear(0, 8, 0.1, 0.3, waterDrop.amplitude));
          const dy = waterDrop.sign * model.waterScene.modelViewTransform.modelToViewDeltaY(waterDrop.sourceSeparation / 2);
          waterDropNodes[i].center = new Vector2(waterDropX, waveAreaNodeBounds.centerY - waterDrop.y + dy);
        }
      });
    };

    // At the end of each model step, update all of the particles as a batch.
    const update = () => {
      if (model.sceneProperty.value === model.waterScene) {
        updateWaterDropNodes();
      }
    };
    model.stepEmitter.addListener(update);
    model.sceneProperty.link(update);

    // @private - for closure.  If any water drop went underwater, mark it as absorbed so it will no longer be shown.
    this.stepWaterDropLayer = waterSideViewNode => {
      for (let i = 0; i < waterDropNodes.length; i++) {
        const dropNode = waterDropNodes[i];
        if (dropNode.visible) {
          const fullyRotated = model.rotationAmountProperty.value === 1.0;
          const beneathSurface = dropNode.top - 50 > waterSideViewNode.waterSideViewNodeTopY;
          if (fullyRotated && dropNode.waterDrop && beneathSurface) {
            dropNode.waterDrop.absorbed = true;
          }
        }
      }
    };
  }

  /**
   * Pass-through for the closure.
   */
  step(waterSideViewNode) {
    // if in side view and the drop is submerged, mark it as absorbed so it won't show any longer.
    this.stepWaterDropLayer(waterSideViewNode);
  }
}
waveInterference.register('WaterDropLayer', WaterDropLayer);
export default WaterDropLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVdGlscyIsIlZlY3RvcjIiLCJOb2RlIiwid2F2ZUludGVyZmVyZW5jZSIsIldhdGVyRHJvcEltYWdlIiwiV2F0ZXJEcm9wTGF5ZXIiLCJjb25zdHJ1Y3RvciIsIm1vZGVsIiwid2F2ZUFyZWFOb2RlQm91bmRzIiwib3B0aW9ucyIsIndhdGVyRHJvcFgiLCJ3YXRlclNjZW5lIiwiZ2V0V2F0ZXJEcm9wWCIsIk1BWF9EUk9QUyIsIndhdGVyRHJvcE5vZGVzIiwiXyIsInRpbWVzIiwiYXNzZXJ0IiwiY2hpbGRyZW4iLCJtdXRhdGUiLCJ1cGRhdGVXYXRlckRyb3BOb2RlcyIsImZvckVhY2giLCJ3YXRlckRyb3BOb2RlIiwic2V0VmlzaWJsZSIsIndhdGVyRHJvcHMiLCJ3YXRlckRyb3AiLCJpIiwibGVuZ3RoIiwidmlzaWJsZSIsImFtcGxpdHVkZSIsImFic29yYmVkIiwic3RhcnRzT3NjaWxsYXRpb24iLCJzZXRTY2FsZU1hZ25pdHVkZSIsImxpbmVhciIsImR5Iiwic2lnbiIsIm1vZGVsVmlld1RyYW5zZm9ybSIsIm1vZGVsVG9WaWV3RGVsdGFZIiwic291cmNlU2VwYXJhdGlvbiIsImNlbnRlciIsImNlbnRlclkiLCJ5IiwidXBkYXRlIiwic2NlbmVQcm9wZXJ0eSIsInZhbHVlIiwic3RlcEVtaXR0ZXIiLCJhZGRMaXN0ZW5lciIsImxpbmsiLCJzdGVwV2F0ZXJEcm9wTGF5ZXIiLCJ3YXRlclNpZGVWaWV3Tm9kZSIsImRyb3BOb2RlIiwiZnVsbHlSb3RhdGVkIiwicm90YXRpb25BbW91bnRQcm9wZXJ0eSIsImJlbmVhdGhTdXJmYWNlIiwidG9wIiwid2F0ZXJTaWRlVmlld05vZGVUb3BZIiwic3RlcCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiV2F0ZXJEcm9wTGF5ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcbi8vIEB0cy1ub2NoZWNrXHJcbi8qKlxyXG4gKiBTaG93cyB0aGUgV2F0ZXJEcm9wIGluc3RhbmNlcy5cclxuICpcclxuICogQGF1dGhvciBTYW0gUmVpZCAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1V0aWxzLmpzJztcclxuaW1wb3J0IFZlY3RvcjIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1ZlY3RvcjIuanMnO1xyXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IHdhdmVJbnRlcmZlcmVuY2UgZnJvbSAnLi4vLi4vd2F2ZUludGVyZmVyZW5jZS5qcyc7XHJcbmltcG9ydCBXYXRlckRyb3BJbWFnZSBmcm9tICcuL1dhdGVyRHJvcEltYWdlLmpzJztcclxuXHJcbmNsYXNzIFdhdGVyRHJvcExheWVyIGV4dGVuZHMgTm9kZSB7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggbW9kZWwsIHdhdmVBcmVhTm9kZUJvdW5kcywgb3B0aW9ucyApIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgY29uc3Qgd2F0ZXJEcm9wWCA9IG1vZGVsLndhdGVyU2NlbmUuZ2V0V2F0ZXJEcm9wWCgpO1xyXG5cclxuICAgIC8vIFByZWFsbG9jYXRlIEltYWdlcyB0aGF0IHdpbGwgYmUgYXNzb2NpYXRlZCB3aXRoIGRpZmZlcmVudCB3YXRlciBkcm9wIGluc3RhbmNlcy5cclxuICAgIGNvbnN0IE1BWF9EUk9QUyA9IDQ7XHJcbiAgICBjb25zdCB3YXRlckRyb3BOb2RlcyA9IF8udGltZXMoIE1BWF9EUk9QUywgKCkgPT4gbmV3IFdhdGVyRHJvcEltYWdlKCkgKTtcclxuXHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCAhb3B0aW9ucyB8fCAhb3B0aW9ucy5jaGlsZHJlbiwgJ2NoaWxkcmVuIG92ZXJ3cml0dGVuIGluIFdhdGVyRHJvcExheWVyJyApO1xyXG4gICAgdGhpcy5jaGlsZHJlbiA9IHdhdGVyRHJvcE5vZGVzO1xyXG4gICAgdGhpcy5tdXRhdGUoIG9wdGlvbnMgKTtcclxuXHJcbiAgICBjb25zdCB1cGRhdGVXYXRlckRyb3BOb2RlcyA9ICgpID0+IHtcclxuICAgICAgd2F0ZXJEcm9wTm9kZXMuZm9yRWFjaCggd2F0ZXJEcm9wTm9kZSA9PiB3YXRlckRyb3BOb2RlLnNldFZpc2libGUoIGZhbHNlICkgKTtcclxuICAgICAgbW9kZWwud2F0ZXJTY2VuZS53YXRlckRyb3BzLmZvckVhY2goICggd2F0ZXJEcm9wLCBpICkgPT4ge1xyXG5cclxuICAgICAgICBpZiAoIGkgPCB3YXRlckRyb3BOb2Rlcy5sZW5ndGggKSB7XHJcblxyXG4gICAgICAgICAgLy8gSW5kaWNhdGUgd2hpY2ggV2F0ZXJEcm9wIGNvcnJlc3BvbmRzIHRvIHRoaXMgaW1hZ2Ugc28gd2hlbiB0aGUgdmlldyBnb2VzIHVuZGVyd2F0ZXIsIHRoZSBtb2RlbCBjYW5cclxuICAgICAgICAgIC8vIGJlIG1hcmtlZCBhcyBhYnNvcmJlZFxyXG4gICAgICAgICAgd2F0ZXJEcm9wTm9kZXNbIGkgXS53YXRlckRyb3AgPSB3YXRlckRyb3A7XHJcblxyXG4gICAgICAgICAgd2F0ZXJEcm9wTm9kZXNbIGkgXS52aXNpYmxlID0gd2F0ZXJEcm9wLmFtcGxpdHVkZSA+IDAgJiYgIXdhdGVyRHJvcC5hYnNvcmJlZCAmJiB3YXRlckRyb3Auc3RhcnRzT3NjaWxsYXRpb247XHJcbiAgICAgICAgICB3YXRlckRyb3BOb2Rlc1sgaSBdLnNldFNjYWxlTWFnbml0dWRlKCBVdGlscy5saW5lYXIoIDAsIDgsIDAuMSwgMC4zLCB3YXRlckRyb3AuYW1wbGl0dWRlICkgKTtcclxuICAgICAgICAgIGNvbnN0IGR5ID0gd2F0ZXJEcm9wLnNpZ24gKiBtb2RlbC53YXRlclNjZW5lLm1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld0RlbHRhWSggd2F0ZXJEcm9wLnNvdXJjZVNlcGFyYXRpb24gLyAyICk7XHJcbiAgICAgICAgICB3YXRlckRyb3BOb2Rlc1sgaSBdLmNlbnRlciA9IG5ldyBWZWN0b3IyKCB3YXRlckRyb3BYLCB3YXZlQXJlYU5vZGVCb3VuZHMuY2VudGVyWSAtIHdhdGVyRHJvcC55ICsgZHkgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQXQgdGhlIGVuZCBvZiBlYWNoIG1vZGVsIHN0ZXAsIHVwZGF0ZSBhbGwgb2YgdGhlIHBhcnRpY2xlcyBhcyBhIGJhdGNoLlxyXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xyXG4gICAgICBpZiAoIG1vZGVsLnNjZW5lUHJvcGVydHkudmFsdWUgPT09IG1vZGVsLndhdGVyU2NlbmUgKSB7XHJcbiAgICAgICAgdXBkYXRlV2F0ZXJEcm9wTm9kZXMoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIG1vZGVsLnN0ZXBFbWl0dGVyLmFkZExpc3RlbmVyKCB1cGRhdGUgKTtcclxuICAgIG1vZGVsLnNjZW5lUHJvcGVydHkubGluayggdXBkYXRlICk7XHJcblxyXG4gICAgLy8gQHByaXZhdGUgLSBmb3IgY2xvc3VyZS4gIElmIGFueSB3YXRlciBkcm9wIHdlbnQgdW5kZXJ3YXRlciwgbWFyayBpdCBhcyBhYnNvcmJlZCBzbyBpdCB3aWxsIG5vIGxvbmdlciBiZSBzaG93bi5cclxuICAgIHRoaXMuc3RlcFdhdGVyRHJvcExheWVyID0gd2F0ZXJTaWRlVmlld05vZGUgPT4ge1xyXG4gICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB3YXRlckRyb3BOb2Rlcy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICBjb25zdCBkcm9wTm9kZSA9IHdhdGVyRHJvcE5vZGVzWyBpIF07XHJcbiAgICAgICAgaWYgKCBkcm9wTm9kZS52aXNpYmxlICkge1xyXG4gICAgICAgICAgY29uc3QgZnVsbHlSb3RhdGVkID0gbW9kZWwucm90YXRpb25BbW91bnRQcm9wZXJ0eS52YWx1ZSA9PT0gMS4wO1xyXG4gICAgICAgICAgY29uc3QgYmVuZWF0aFN1cmZhY2UgPSBkcm9wTm9kZS50b3AgLSA1MCA+IHdhdGVyU2lkZVZpZXdOb2RlLndhdGVyU2lkZVZpZXdOb2RlVG9wWTtcclxuICAgICAgICAgIGlmICggZnVsbHlSb3RhdGVkICYmIGRyb3BOb2RlLndhdGVyRHJvcCAmJiBiZW5lYXRoU3VyZmFjZSApIHtcclxuICAgICAgICAgICAgZHJvcE5vZGUud2F0ZXJEcm9wLmFic29yYmVkID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXNzLXRocm91Z2ggZm9yIHRoZSBjbG9zdXJlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGVwKCB3YXRlclNpZGVWaWV3Tm9kZSApOiB2b2lkIHtcclxuXHJcbiAgICAvLyBpZiBpbiBzaWRlIHZpZXcgYW5kIHRoZSBkcm9wIGlzIHN1Ym1lcmdlZCwgbWFyayBpdCBhcyBhYnNvcmJlZCBzbyBpdCB3b24ndCBzaG93IGFueSBsb25nZXIuXHJcbiAgICB0aGlzLnN0ZXBXYXRlckRyb3BMYXllciggd2F0ZXJTaWRlVmlld05vZGUgKTtcclxuICB9XHJcbn1cclxuXHJcbndhdmVJbnRlcmZlcmVuY2UucmVnaXN0ZXIoICdXYXRlckRyb3BMYXllcicsIFdhdGVyRHJvcExheWVyICk7XHJcbmV4cG9ydCBkZWZhdWx0IFdhdGVyRHJvcExheWVyOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBSyxNQUFNLDZCQUE2QjtBQUMvQyxPQUFPQyxPQUFPLE1BQU0sK0JBQStCO0FBQ25ELFNBQVNDLElBQUksUUFBUSxtQ0FBbUM7QUFDeEQsT0FBT0MsZ0JBQWdCLE1BQU0sMkJBQTJCO0FBQ3hELE9BQU9DLGNBQWMsTUFBTSxxQkFBcUI7QUFFaEQsTUFBTUMsY0FBYyxTQUFTSCxJQUFJLENBQUM7RUFFekJJLFdBQVdBLENBQUVDLEtBQUssRUFBRUMsa0JBQWtCLEVB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