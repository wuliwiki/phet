// Copyright 2017-2023, University of Colorado Boulder

/**
 * Static utilities for the Circuit Construction Kit: DC simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Utils from '../../dot/js/Utils.js';
import StringUtils from '../../phetcommon/js/util/StringUtils.js';
import CCKCQueryParameters from './CCKCQueryParameters.js';
import CircuitConstructionKitCommonStrings from './CircuitConstructionKitCommonStrings.js';
import circuitConstructionKitCommon from './circuitConstructionKitCommon.js';
import ammeterReadoutTypeProperty from './view/ammeterReadoutTypeProperty.js';
import MathSymbols from '../../scenery-phet/js/MathSymbols.js';
import AmmeterReadoutType from './model/AmmeterReadoutType.js';
import CCKCConstants from './CCKCConstants.js';
const currentUnitsStringProperty = CircuitConstructionKitCommonStrings.currentUnitsStringProperty;
const voltageUnitsStringProperty = CircuitConstructionKitCommonStrings.voltageUnitsStringProperty;

// Number of accumulated solve steps within a single frame.  We use high precision for the first
// several steps, then go to high performance for remaining steps.
const CCKCUtils = {
  /**
   * Returns a string that adjusts its ampere value.
   * @param current - in Amps
   */
  createCurrentReadout: function (current, blackBoxStudy) {
    if (CCKCQueryParameters.fullPrecisionAmmeter) {
      return current + '';
    } else {
      const max = blackBoxStudy ? 1E3 : 1E10;
      const maxString = blackBoxStudy ? '> 10^3' : '> 10^10';
      const minString = blackBoxStudy ? '< -10^3' : '< -10^10';
      const ammeterReadoutType = ammeterReadoutTypeProperty.value;
      if (current === null) {
        return MathSymbols.NO_VALUE;
      } else if (ammeterReadoutType === AmmeterReadoutType.MAGNITUDE && Math.abs(current) > max) {
        return maxString;
      } else if (ammeterReadoutType === AmmeterReadoutType.SIGNED && current > max) {
        return maxString;
      } else if (ammeterReadoutType === AmmeterReadoutType.SIGNED && current < -max) {
        return minString;
      } else {
        const signedCurrent = ammeterReadoutTypeProperty.value === AmmeterReadoutType.MAGNITUDE ? Math.abs(current) : current;
        return StringUtils.fillIn(currentUnitsStringProperty, {
          current: Utils.toFixed(signedCurrent, CCKCConstants.METER_PRECISION)
        });
      }
    }
  },
  /**
   * Returns a string that adjusts its voltage value.
   * @param value - voltage value in Volts
   */
  createVoltageReadout: function (value) {
    return StringUtils.fillIn(voltageUnitsStringProperty, {
      voltage: Utils.toFixed(value, CCKCConstants.METER_PRECISION)
    });
  },
  /**
   * Checks whether a child should be in the scene graph and adds/removes it as necessary.  This is to improve
   * performance so that the DOM only contains displayed items and doesn't try to update invisible ones.
   * @param inSceneGraph - should the child be shown in the scene graph
   * @param parent - parent that contains the child in the scene graph
   * @param child - child added/removed from scene graph
   */
  setInSceneGraph: function (inSceneGraph, parent, child) {
    if (inSceneGraph && !parent.hasChild(child)) {
      parent.addChild(child);
    } else if (!inSceneGraph && parent.hasChild(child)) {
      parent.removeChild(child);
    }
  },
  /**
   * Clamp the magnitude of a signed number to keep it in range.
   */
  clampMagnitude(value, magnitude = 1E20) {
    assert && assert(magnitude >= 0, 'magnitude should be non-negative');
    if (Math.abs(value) > magnitude) {
      return Math.sign(value) * magnitude;
    } else {
      return value;
    }
  },
  /**
   * Erode bounds to make hit box dimensions RETURN_ITEM_HIT_BOX_RATIO * nodeBounds
   */
  getDropItemHitBoxForBounds(nodeBounds) {
    const erosionRatio = 0.5 * (1 - CCKCConstants.RETURN_ITEM_HIT_BOX_RATIO);
    return nodeBounds.erodedXY(erosionRatio * nodeBounds.width, erosionRatio * nodeBounds.height);
  }
};
circuitConstructionKitCommon.register('CCKCUtils', CCKCUtils);
export default CCKCUtils;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVdGlscyIsIlN0cmluZ1V0aWxzIiwiQ0NLQ1F1ZXJ5UGFyYW1ldGVycyIsIkNpcmN1aXRDb25zdHJ1Y3Rpb25LaXRDb21tb25TdHJpbmdzIiwiY2lyY3VpdENvbnN0cnVjdGlvbktpdENvbW1vbiIsImFtbWV0ZXJSZWFkb3V0VHlwZVByb3BlcnR5IiwiTWF0aFN5bWJvbHMiLCJBbW1ldGVyUmVhZG91dFR5cGUiLCJDQ0tDQ29uc3RhbnRzIiwiY3VycmVudFVuaXRzU3RyaW5nUHJvcGVydHkiLCJ2b2x0YWdlVW5pdHNTdHJpbmdQcm9wZXJ0eSIsIkNDS0NVdGlscyIsImNyZWF0ZUN1cnJlbnRSZWFkb3V0IiwiY3VycmVudCIsImJsYWNrQm94U3R1ZHkiLCJmdWxsUHJlY2lzaW9uQW1tZXRlciIsIm1heCIsIm1heFN0cmluZyIsIm1pblN0cmluZyIsImFtbWV0ZXJSZWFkb3V0VHlwZSIsInZhbHVlIiwiTk9fVkFMVUUiLCJNQUdOSVRVREUiLCJNYXRoIiwiYWJzIiwiU0lHTkVEIiwic2lnbmVkQ3VycmVudCIsImZpbGxJbiIsInRvRml4ZWQiLCJNRVRFUl9QUkVDSVNJT04iLCJjcmVhdGVWb2x0YWdlUmVhZG91dCIsInZvbHRhZ2UiLCJzZXRJblNjZW5lR3JhcGgiLCJpblNjZW5lR3JhcGgiLCJwYXJlbnQiLCJjaGlsZCIsImhhc0NoaWxkIiwiYWRkQ2hpbGQiLCJyZW1vdmVDaGlsZCIsImNsYW1wTWFnbml0dWRlIiwibWFnbml0dWRlIiwiYXNzZXJ0Iiwic2lnbiIsImdldERyb3BJdGVtSGl0Qm94Rm9yQm91bmRzIiwibm9kZUJvdW5kcyIsImVyb3Npb25SYXRpbyIsIlJFVFVSTl9JVEVNX0hJVF9CT1hfUkFUSU8iLCJlcm9kZWRYWSIsIndpZHRoIiwiaGVpZ2h0IiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJDQ0tDVXRpbHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTctMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogU3RhdGljIHV0aWxpdGllcyBmb3IgdGhlIENpcmN1aXQgQ29uc3RydWN0aW9uIEtpdDogREMgc2ltdWxhdGlvbi5cclxuICpcclxuICogQGF1dGhvciBTYW0gUmVpZCAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vZG90L2pzL1V0aWxzLmpzJztcclxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBTdHJpbmdVdGlscyBmcm9tICcuLi8uLi9waGV0Y29tbW9uL2pzL3V0aWwvU3RyaW5nVXRpbHMuanMnO1xyXG5pbXBvcnQgQ0NLQ1F1ZXJ5UGFyYW1ldGVycyBmcm9tICcuL0NDS0NRdWVyeVBhcmFtZXRlcnMuanMnO1xyXG5pbXBvcnQgQ2lyY3VpdENvbnN0cnVjdGlvbktpdENvbW1vblN0cmluZ3MgZnJvbSAnLi9DaXJjdWl0Q29uc3RydWN0aW9uS2l0Q29tbW9uU3RyaW5ncy5qcyc7XHJcbmltcG9ydCBjaXJjdWl0Q29uc3RydWN0aW9uS2l0Q29tbW9uIGZyb20gJy4vY2lyY3VpdENvbnN0cnVjdGlvbktpdENvbW1vbi5qcyc7XHJcbmltcG9ydCBhbW1ldGVyUmVhZG91dFR5cGVQcm9wZXJ0eSBmcm9tICcuL3ZpZXcvYW1tZXRlclJlYWRvdXRUeXBlUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgTWF0aFN5bWJvbHMgZnJvbSAnLi4vLi4vc2NlbmVyeS1waGV0L2pzL01hdGhTeW1ib2xzLmpzJztcclxuaW1wb3J0IEFtbWV0ZXJSZWFkb3V0VHlwZSBmcm9tICcuL21vZGVsL0FtbWV0ZXJSZWFkb3V0VHlwZS5qcyc7XHJcbmltcG9ydCBDQ0tDQ29uc3RhbnRzIGZyb20gJy4vQ0NLQ0NvbnN0YW50cy5qcyc7XHJcbmltcG9ydCBCb3VuZHMyIGZyb20gJy4uLy4uL2RvdC9qcy9Cb3VuZHMyLmpzJztcclxuXHJcbmNvbnN0IGN1cnJlbnRVbml0c1N0cmluZ1Byb3BlcnR5ID0gQ2lyY3VpdENvbnN0cnVjdGlvbktpdENvbW1vblN0cmluZ3MuY3VycmVudFVuaXRzU3RyaW5nUHJvcGVydHk7XHJcbmNvbnN0IHZvbHRhZ2VVbml0c1N0cmluZ1Byb3BlcnR5ID0gQ2lyY3VpdENvbnN0cnVjdGlvbktpdENvbW1vblN0cmluZ3Mudm9sdGFnZVVuaXRzU3RyaW5nUHJvcGVydHk7XHJcblxyXG4vLyBOdW1iZXIgb2YgYWNjdW11bGF0ZWQgc29sdmUgc3RlcHMgd2l0aGluIGEgc2luZ2xlIGZyYW1lLiAgV2UgdXNlIGhpZ2ggcHJlY2lzaW9uIGZvciB0aGUgZmlyc3RcclxuLy8gc2V2ZXJhbCBzdGVwcywgdGhlbiBnbyB0byBoaWdoIHBlcmZvcm1hbmNlIGZvciByZW1haW5pbmcgc3RlcHMuXHJcbmNvbnN0IENDS0NVdGlscyA9IHtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIHN0cmluZyB0aGF0IGFkanVzdHMgaXRzIGFtcGVyZSB2YWx1ZS5cclxuICAgKiBAcGFyYW0gY3VycmVudCAtIGluIEFtcHNcclxuICAgKi9cclxuICBjcmVhdGVDdXJyZW50UmVhZG91dDogZnVuY3Rpb24oIGN1cnJlbnQ6IG51bWJlciB8IG51bGwsIGJsYWNrQm94U3R1ZHk6IGJvb2xlYW4gKTogc3RyaW5nIHtcclxuICAgIGlmICggQ0NLQ1F1ZXJ5UGFyYW1ldGVycy5mdWxsUHJlY2lzaW9uQW1tZXRlciApIHtcclxuICAgICAgcmV0dXJuIGN1cnJlbnQgKyAnJztcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG5cclxuICAgICAgY29uc3QgbWF4ID0gYmxhY2tCb3hTdHVkeSA/IDFFMyA6IDFFMTA7XHJcbiAgICAgIGNvbnN0IG1heFN0cmluZyA9IGJsYWNrQm94U3R1ZHkgPyAnPiAxMF4zJyA6ICc+IDEwXjEwJztcclxuICAgICAgY29uc3QgbWluU3RyaW5nID0gYmxhY2tCb3hTdHVkeSA/ICc8IC0xMF4zJyA6ICc8IC0xMF4xMCc7XHJcbiAgICAgIGNvbnN0IGFtbWV0ZXJSZWFkb3V0VHlwZSA9IGFtbWV0ZXJSZWFkb3V0VHlwZVByb3BlcnR5LnZhbHVlO1xyXG5cclxuICAgICAgaWYgKCBjdXJyZW50ID09PSBudWxsICkge1xyXG4gICAgICAgIHJldHVybiBNYXRoU3ltYm9scy5OT19WQUxVRTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICggYW1tZXRlclJlYWRvdXRUeXBlID09PSBBbW1ldGVyUmVhZG91dFR5cGUuTUFHTklUVURFICYmIE1hdGguYWJzKCBjdXJyZW50ICkgPiBtYXggKSB7XHJcbiAgICAgICAgcmV0dXJuIG1heFN0cmluZztcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICggYW1tZXRlclJlYWRvdXRUeXBlID09PSBBbW1ldGVyUmVhZG91dFR5cGUuU0lHTkVEICYmIGN1cnJlbnQgPiBtYXggKSB7XHJcbiAgICAgICAgcmV0dXJuIG1heFN0cmluZztcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICggYW1tZXRlclJlYWRvdXRUeXBlID09PSBBbW1ldGVyUmVhZG91dFR5cGUuU0lHTkVEICYmIGN1cnJlbnQgPCAtbWF4ICkge1xyXG4gICAgICAgIHJldHVybiBtaW5TdHJpbmc7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc2lnbmVkQ3VycmVudCA9IGFtbWV0ZXJSZWFkb3V0VHlwZVByb3BlcnR5LnZhbHVlID09PSBBbW1ldGVyUmVhZG91dFR5cGUuTUFHTklUVURFID8gTWF0aC5hYnMoIGN1cnJlbnQgKSA6IGN1cnJlbnQ7XHJcbiAgICAgICAgcmV0dXJuIFN0cmluZ1V0aWxzLmZpbGxJbiggY3VycmVudFVuaXRzU3RyaW5nUHJvcGVydHksIHsgY3VycmVudDogVXRpbHMudG9GaXhlZCggc2lnbmVkQ3VycmVudCwgQ0NLQ0NvbnN0YW50cy5NRVRFUl9QUkVDSVNJT04gKSB9ICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgYWRqdXN0cyBpdHMgdm9sdGFnZSB2YWx1ZS5cclxuICAgKiBAcGFyYW0gdmFsdWUgLSB2b2x0YWdlIHZhbHVlIGluIFZvbHRzXHJcbiAgICovXHJcbiAgY3JlYXRlVm9sdGFnZVJlYWRvdXQ6IGZ1bmN0aW9uKCB2YWx1ZTogbnVtYmVyICk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gU3RyaW5nVXRpbHMuZmlsbEluKCB2b2x0YWdlVW5pdHNTdHJpbmdQcm9wZXJ0eSwgeyB2b2x0YWdlOiBVdGlscy50b0ZpeGVkKCB2YWx1ZSwgQ0NLQ0NvbnN0YW50cy5NRVRFUl9QUkVDSVNJT04gKSB9ICk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHdoZXRoZXIgYSBjaGlsZCBzaG91bGQgYmUgaW4gdGhlIHNjZW5lIGdyYXBoIGFuZCBhZGRzL3JlbW92ZXMgaXQgYXMgbmVjZXNzYXJ5LiAgVGhpcyBpcyB0byBpbXByb3ZlXHJcbiAgICogcGVyZm9ybWFuY2Ugc28gdGhhdCB0aGUgRE9NIG9ubHkgY29udGFpbnMgZGlzcGxheWVkIGl0ZW1zIGFuZCBkb2Vzbid0IHRyeSB0byB1cGRhdGUgaW52aXNpYmxlIG9uZXMuXHJcbiAgICogQHBhcmFtIGluU2NlbmVHcmFwaCAtIHNob3VsZCB0aGUgY2hpbGQgYmUgc2hvd24gaW4gdGhlIHNjZW5lIGdyYXBoXHJcbiAgICogQHBhcmFtIHBhcmVudCAtIHBhcmVudCB0aGF0IGNvbnRhaW5zIHRoZSBjaGlsZCBpbiB0aGUgc2NlbmUgZ3JhcGhcclxuICAgKiBAcGFyYW0gY2hpbGQgLSBjaGlsZCBhZGRlZC9yZW1vdmVkIGZyb20gc2NlbmUgZ3JhcGhcclxuICAgKi9cclxuICBzZXRJblNjZW5lR3JhcGg6IGZ1bmN0aW9uKCBpblNjZW5lR3JhcGg6IGJvb2xlYW4sIHBhcmVudDogTm9kZSwgY2hpbGQ6IE5vZGUgKTogdm9pZCB7XHJcbiAgICBpZiAoIGluU2NlbmVHcmFwaCAmJiAhcGFyZW50Lmhhc0NoaWxkKCBjaGlsZCApICkge1xyXG4gICAgICBwYXJlbnQuYWRkQ2hpbGQoIGNoaWxkICk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICggIWluU2NlbmVHcmFwaCAmJiBwYXJlbnQuaGFzQ2hpbGQoIGNoaWxkICkgKSB7XHJcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZCggY2hpbGQgKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBDbGFtcCB0aGUgbWFnbml0dWRlIG9mIGEgc2lnbmVkIG51bWJlciB0byBrZWVwIGl0IGluIHJhbmdlLlxyXG4gICAqL1xyXG4gIGNsYW1wTWFnbml0dWRlKCB2YWx1ZTogbnVtYmVyLCBtYWduaXR1ZGUgPSAxRTIwICk6IG51bWJlciB7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCBtYWduaXR1ZGUgPj0gMCwgJ21hZ25pdHVkZSBzaG91bGQgYmUgbm9uLW5lZ2F0aXZlJyApO1xyXG4gICAgaWYgKCBNYXRoLmFicyggdmFsdWUgKSA+IG1hZ25pdHVkZSApIHtcclxuICAgICAgcmV0dXJuIE1hdGguc2lnbiggdmFsdWUgKSAqIG1hZ25pdHVkZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogRXJvZGUgYm91bmRzIHRvIG1ha2UgaGl0IGJveCBkaW1lbnNpb25zIFJFVFVSTl9JVEVNX0hJVF9CT1hfUkFUSU8gKiBub2RlQm91bmRzXHJcbiAgICovXHJcbiAgZ2V0RHJvcEl0ZW1IaXRCb3hGb3JCb3VuZHMoIG5vZGVCb3VuZHM6IEJvdW5kczIgKTogQm91bmRzMiB7XHJcbiAgICBjb25zdCBlcm9zaW9uUmF0aW8gPSAwLjUgKiAoIDEgLSBDQ0tDQ29uc3RhbnRzLlJFVFVSTl9JVEVNX0hJVF9CT1hfUkFUSU8gKTtcclxuICAgIHJldHVybiBub2RlQm91bmRzLmVyb2RlZFhZKCBlcm9zaW9uUmF0aW8gKiBub2RlQm91bmRzLndpZHRoLCBlcm9zaW9uUmF0aW8gKiBub2RlQm91bmRzLmhlaWdodCApO1xyXG4gIH1cclxufTtcclxuXHJcbmNpcmN1aXRDb25zdHJ1Y3Rpb25LaXRDb21tb24ucmVnaXN0ZXIoICdDQ0tDVXRpbHMnLCBDQ0tDVXRpbHMgKTtcclxuZXhwb3J0IGRlZmF1bHQgQ0NLQ1V0aWxzOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxLQUFLLE1BQU0sdUJBQXVCO0FBRXpDLE9BQU9DLFdBQVcsTUFBTSx5Q0FBeUM7QUFDakUsT0FBT0MsbUJBQW1CLE1BQU0sMEJBQTBCO0FBQzFELE9BQU9DLG1DQUFtQyxNQUFNLDBDQUEwQztBQUMxRixPQUFPQyw0QkFBNEIsTUFBTSxtQ0FBbUM7QUFDNUUsT0FBT0MsMEJBQTBCLE1BQU0sc0NBQXNDO0FBQzdFLE9BQU9DLFdBQVcsTUFBTSxzQ0FBc0M7QUFDOUQsT0FBT0Msa0JBQWtCLE1BQU0sK0JBQStCO0FBQzlELE9BQU9DLGFBQWEsTUFBTSxvQkFBb0I7QUFHOUMsTUFBTUMsMEJBQTBCLEdBQUdOLG1DQUFtQyxDQUFDTSwwQkFBMEI7QUFDakcsTUFBTUMsMEJBQTBCLEdBQUdQLG1DQUFtQyxDQUFDTywwQkFBMEI7O0FBRWpHO0FBQ0E7QUFDQSxNQUFNQyxTQUFTLEdBQUc7RUFFaEI7QUFDRjtBQUNBO0FBQ0E7RUFDRUMsb0JBQW9CLEVBQUUsU0FBQUEsQ0FBVUMsT0FBc0IsRUFBRUMsYUFBc0IsRUFBVztJQUN2RixJQUFLWixtQkFBbUIsQ0FBQ2Esb0JBQW9CLEVBQUc7TUFDOUMsT0FBT0YsT0FBTyxHQUFHLEVBQUU7SUFDckIsQ0FBQyxNQUNJO01BRUgsTUFBTUcsR0FBRyxHQUFHRixhQUFhLEdBQUcsR0FBRyxHQUFHLElBQUk7TUFDdEMsTUFBTUcsU0FBUyxHQUFHSCxhQUFhLEdBQUcsUUFBUSxHQUFHLFNBQVM7TUFDdEQsTUFBTUksU0FBUyxHQUFHSixhQUFhLEdBQUcsU0FBUyxHQUFHLFVBQVU7TUFDeEQsTUFBTUssa0JBQWtCLEdBQUdkLDBCQUEw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