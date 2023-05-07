// Copyright 2021-2023, University of Colorado Boulder

/**
 * WaveformEnvelopeCheckbox is the checkbox that is used to show the waveform envelope.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import SecondaryWaveformCheckbox from '../../common/view/SecondaryWaveformCheckbox.js';
import fourierMakingWaves from '../../fourierMakingWaves.js';
import FourierMakingWavesStrings from '../../FourierMakingWavesStrings.js';
export default class WaveformEnvelopeCheckbox extends SecondaryWaveformCheckbox {
  /**
   * @param {Property.<boolean>} waveformEnvelopeVisibleProperty
   * @param {Object} [options]
   */
  constructor(waveformEnvelopeVisibleProperty, options) {
    super(waveformEnvelopeVisibleProperty, FourierMakingWavesStrings.waveformEnvelopeStringProperty, options);
  }
}
fourierMakingWaves.register('WaveformEnvelopeCheckbox', WaveformEnvelopeCheckbox);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTZWNvbmRhcnlXYXZlZm9ybUNoZWNrYm94IiwiZm91cmllck1ha2luZ1dhdmVzIiwiRm91cmllck1ha2luZ1dhdmVzU3RyaW5ncyIsIldhdmVmb3JtRW52ZWxvcGVDaGVja2JveCIsImNvbnN0cnVjdG9yIiwid2F2ZWZvcm1FbnZlbG9wZVZpc2libGVQcm9wZXJ0eSIsIm9wdGlvbnMiLCJ3YXZlZm9ybUVudmVsb3BlU3RyaW5nUHJvcGVydHkiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIldhdmVmb3JtRW52ZWxvcGVDaGVja2JveC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBXYXZlZm9ybUVudmVsb3BlQ2hlY2tib3ggaXMgdGhlIGNoZWNrYm94IHRoYXQgaXMgdXNlZCB0byBzaG93IHRoZSB3YXZlZm9ybSBlbnZlbG9wZS5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgU2Vjb25kYXJ5V2F2ZWZvcm1DaGVja2JveCBmcm9tICcuLi8uLi9jb21tb24vdmlldy9TZWNvbmRhcnlXYXZlZm9ybUNoZWNrYm94LmpzJztcclxuaW1wb3J0IGZvdXJpZXJNYWtpbmdXYXZlcyBmcm9tICcuLi8uLi9mb3VyaWVyTWFraW5nV2F2ZXMuanMnO1xyXG5pbXBvcnQgRm91cmllck1ha2luZ1dhdmVzU3RyaW5ncyBmcm9tICcuLi8uLi9Gb3VyaWVyTWFraW5nV2F2ZXNTdHJpbmdzLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdmVmb3JtRW52ZWxvcGVDaGVja2JveCBleHRlbmRzIFNlY29uZGFyeVdhdmVmb3JtQ2hlY2tib3gge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1Byb3BlcnR5Ljxib29sZWFuPn0gd2F2ZWZvcm1FbnZlbG9wZVZpc2libGVQcm9wZXJ0eVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvciggd2F2ZWZvcm1FbnZlbG9wZVZpc2libGVQcm9wZXJ0eSwgb3B0aW9ucyApIHtcclxuICAgIHN1cGVyKCB3YXZlZm9ybUVudmVsb3BlVmlzaWJsZVByb3BlcnR5LCBGb3VyaWVyTWFraW5nV2F2ZXNTdHJpbmdzLndhdmVmb3JtRW52ZWxvcGVTdHJpbmdQcm9wZXJ0eSwgb3B0aW9ucyApO1xyXG4gIH1cclxufVxyXG5cclxuZm91cmllck1ha2luZ1dhdmVzLnJlZ2lzdGVyKCAnV2F2ZWZvcm1FbnZlbG9wZUNoZWNrYm94JywgV2F2ZWZvcm1FbnZlbG9wZUNoZWNrYm94ICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLHlCQUF5QixNQUFNLGdEQUFnRDtBQUN0RixPQUFPQyxrQkFBa0IsTUFBTSw2QkFBNkI7QUFDNUQsT0FBT0MseUJBQXlCLE1BQU0sb0NBQW9DO0FBRTFFLGVBQWUsTUFBTUMsd0JBQXdCLFNBQVNILHlCQUF5QixDQUFDO0VBRTlFO0FBQ0Y7QUFDQTtBQUNBO0VBQ0VJLFdBQVdBLENBQUVDLCtCQUErQixFQUFFQyxPQUFPLEVBQUc7SUFDdEQsS0FBSyxDQUFFRCwrQkFBK0IsRUFBRUgseUJBQXlCLENBQUNLLDhCQUE4QixFQUFFRCxPQUFRLENBQUM7RUFDN0c7QUFDRjtBQUVBTCxrQkFBa0IsQ0FBQ08sUUFBUSxDQUFFLDBCQUEwQixFQUFFTCx3QkFBeUIsQ0FBQyJ9