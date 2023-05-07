// Copyright 2021-2022, University of Colorado Boulder

/**
 * MicroPhoton targets for a photon absorption model.  The photon target names correspond to molecules which the photons are
 * being fired at.
 *
 * @author Jesse Greenberg
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import greenhouseEffect from '../../greenhouseEffect.js';
import GreenhouseEffectStrings from '../../GreenhouseEffectStrings.js';
const controlPanelCarbonDioxideString = GreenhouseEffectStrings.ControlPanel.CarbonDioxide;
const controlPanelCarbonMonoxideString = GreenhouseEffectStrings.ControlPanel.CarbonMonoxide;
const controlPanelMethaneString = GreenhouseEffectStrings.ControlPanel.Methane;
const controlPanelNitrogenDioxideString = GreenhouseEffectStrings.ControlPanel.NitrogenDioxide;
const controlPanelNitrogenString = GreenhouseEffectStrings.ControlPanel.Nitrogen;
const controlPanelOxygenString = GreenhouseEffectStrings.ControlPanel.Oxygen;
const controlPanelOzoneString = GreenhouseEffectStrings.ControlPanel.Ozone;
const controlPanelWaterString = GreenhouseEffectStrings.ControlPanel.Water;
class PhotonTarget extends EnumerationValue {
  static SINGLE_CO_MOLECULE = new PhotonTarget();
  static SINGLE_N2_MOLECULE = new PhotonTarget();
  static SINGLE_O2_MOLECULE = new PhotonTarget();
  static SINGLE_CO2_MOLECULE = new PhotonTarget();
  static SINGLE_CH4_MOLECULE = new PhotonTarget();
  static SINGLE_H2O_MOLECULE = new PhotonTarget();
  static SINGLE_NO2_MOLECULE = new PhotonTarget();
  static SINGLE_O3_MOLECULE = new PhotonTarget();
  static enumeration = new Enumeration(PhotonTarget);

  /**
   * maps photon target to translatable string
   * @param {PhotonTarget} photonTarget
   * @returns {string} - the control panel molecule name
   * @public
   */
  static getMoleculeName(photonTarget) {
    return photonTarget === PhotonTarget.SINGLE_CO_MOLECULE ? controlPanelCarbonMonoxideString : photonTarget === PhotonTarget.SINGLE_N2_MOLECULE ? controlPanelNitrogenString : photonTarget === PhotonTarget.SINGLE_O2_MOLECULE ? controlPanelOxygenString : photonTarget === PhotonTarget.SINGLE_CO2_MOLECULE ? controlPanelCarbonDioxideString : photonTarget === PhotonTarget.SINGLE_NO2_MOLECULE ? controlPanelNitrogenDioxideString : photonTarget === PhotonTarget.SINGLE_H2O_MOLECULE ? controlPanelWaterString : photonTarget === PhotonTarget.SINGLE_O3_MOLECULE ? controlPanelOzoneString : photonTarget === PhotonTarget.SINGLE_CH4_MOLECULE ? controlPanelMethaneString : assert && assert(false, 'unknown');
  }
}
greenhouseEffect.register('PhotonTarget', PhotonTarget);
export default PhotonTarget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFbnVtZXJhdGlvbiIsIkVudW1lcmF0aW9uVmFsdWUiLCJncmVlbmhvdXNlRWZmZWN0IiwiR3JlZW5ob3VzZUVmZmVjdFN0cmluZ3MiLCJjb250cm9sUGFuZWxDYXJib25EaW94aWRlU3RyaW5nIiwiQ29udHJvbFBhbmVsIiwiQ2FyYm9uRGlveGlkZSIsImNvbnRyb2xQYW5lbENhcmJvbk1vbm94aWRlU3RyaW5nIiwiQ2FyYm9uTW9ub3hpZGUiLCJjb250cm9sUGFuZWxNZXRoYW5lU3RyaW5nIiwiTWV0aGFuZSIsImNvbnRyb2xQYW5lbE5pdHJvZ2VuRGlveGlkZVN0cmluZyIsIk5pdHJvZ2VuRGlveGlkZSIsImNvbnRyb2xQYW5lbE5pdHJvZ2VuU3RyaW5nIiwiTml0cm9nZW4iLCJjb250cm9sUGFuZWxPeHlnZW5TdHJpbmciLCJPeHlnZW4iLCJjb250cm9sUGFuZWxPem9uZVN0cmluZyIsIk96b25lIiwiY29udHJvbFBhbmVsV2F0ZXJTdHJpbmciLCJXYXRlciIsIlBob3RvblRhcmdldCIsIlNJTkdMRV9DT19NT0xFQ1VMRSIsIlNJTkdMRV9OMl9NT0xFQ1VMRSIsIlNJTkdMRV9PMl9NT0xFQ1VMRSIsIlNJTkdMRV9DTzJfTU9MRUNVTEUiLCJTSU5HTEVfQ0g0X01PTEVDVUxFIiwiU0lOR0xFX0gyT19NT0xFQ1VMRSIsIlNJTkdMRV9OTzJfTU9MRUNVTEUiLCJTSU5HTEVfTzNfTU9MRUNVTEUiLCJlbnVtZXJhdGlvbiIsImdldE1vbGVjdWxlTmFtZSIsInBob3RvblRhcmdldCIsImFzc2VydCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiUGhvdG9uVGFyZ2V0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIE1pY3JvUGhvdG9uIHRhcmdldHMgZm9yIGEgcGhvdG9uIGFic29ycHRpb24gbW9kZWwuICBUaGUgcGhvdG9uIHRhcmdldCBuYW1lcyBjb3JyZXNwb25kIHRvIG1vbGVjdWxlcyB3aGljaCB0aGUgcGhvdG9ucyBhcmVcclxuICogYmVpbmcgZmlyZWQgYXQuXHJcbiAqXHJcbiAqIEBhdXRob3IgSmVzc2UgR3JlZW5iZXJnXHJcbiAqL1xyXG5cclxuaW1wb3J0IEVudW1lcmF0aW9uIGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9FbnVtZXJhdGlvbi5qcyc7XHJcbmltcG9ydCBFbnVtZXJhdGlvblZhbHVlIGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9FbnVtZXJhdGlvblZhbHVlLmpzJztcclxuaW1wb3J0IGdyZWVuaG91c2VFZmZlY3QgZnJvbSAnLi4vLi4vZ3JlZW5ob3VzZUVmZmVjdC5qcyc7XHJcbmltcG9ydCBHcmVlbmhvdXNlRWZmZWN0U3RyaW5ncyBmcm9tICcuLi8uLi9HcmVlbmhvdXNlRWZmZWN0U3RyaW5ncy5qcyc7XHJcblxyXG5jb25zdCBjb250cm9sUGFuZWxDYXJib25EaW94aWRlU3RyaW5nID0gR3JlZW5ob3VzZUVmZmVjdFN0cmluZ3MuQ29udHJvbFBhbmVsLkNhcmJvbkRpb3hpZGU7XHJcbmNvbnN0IGNvbnRyb2xQYW5lbENhcmJvbk1vbm94aWRlU3RyaW5nID0gR3JlZW5ob3VzZUVmZmVjdFN0cmluZ3MuQ29udHJvbFBhbmVsLkNhcmJvbk1vbm94aWRlO1xyXG5jb25zdCBjb250cm9sUGFuZWxNZXRoYW5lU3RyaW5nID0gR3JlZW5ob3VzZUVmZmVjdFN0cmluZ3MuQ29udHJvbFBhbmVsLk1ldGhhbmU7XHJcbmNvbnN0IGNvbnRyb2xQYW5lbE5pdHJvZ2VuRGlveGlkZVN0cmluZyA9IEdyZWVuaG91c2VFZmZlY3RTdHJpbmdzLkNvbnRyb2xQYW5lbC5OaXRyb2dlbkRpb3hpZGU7XHJcbmNvbnN0IGNvbnRyb2xQYW5lbE5pdHJvZ2VuU3RyaW5nID0gR3JlZW5ob3VzZUVmZmVjdFN0cmluZ3MuQ29udHJvbFBhbmVsLk5pdHJvZ2VuO1xyXG5jb25zdCBjb250cm9sUGFuZWxPeHlnZW5TdHJpbmcgPSBHcmVlbmhvdXNlRWZmZWN0U3RyaW5ncy5Db250cm9sUGFuZWwuT3h5Z2VuO1xyXG5jb25zdCBjb250cm9sUGFuZWxPem9uZVN0cmluZyA9IEdyZWVuaG91c2VFZmZlY3RTdHJpbmdzLkNvbnRyb2xQYW5lbC5Pem9uZTtcclxuY29uc3QgY29udHJvbFBhbmVsV2F0ZXJTdHJpbmcgPSBHcmVlbmhvdXNlRWZmZWN0U3RyaW5ncy5Db250cm9sUGFuZWwuV2F0ZXI7XHJcblxyXG5jbGFzcyBQaG90b25UYXJnZXQgZXh0ZW5kcyBFbnVtZXJhdGlvblZhbHVlIHtcclxuICBzdGF0aWMgU0lOR0xFX0NPX01PTEVDVUxFID0gbmV3IFBob3RvblRhcmdldCgpO1xyXG4gIHN0YXRpYyBTSU5HTEVfTjJfTU9MRUNVTEUgPSBuZXcgUGhvdG9uVGFyZ2V0KCk7XHJcbiAgc3RhdGljIFNJTkdMRV9PMl9NT0xFQ1VMRSA9IG5ldyBQaG90b25UYXJnZXQoKTtcclxuICBzdGF0aWMgU0lOR0xFX0NPMl9NT0xFQ1VMRSA9IG5ldyBQaG90b25UYXJnZXQoKTtcclxuICBzdGF0aWMgU0lOR0xFX0NINF9NT0xFQ1VMRSA9IG5ldyBQaG90b25UYXJnZXQoKTtcclxuICBzdGF0aWMgU0lOR0xFX0gyT19NT0xFQ1VMRSA9IG5ldyBQaG90b25UYXJnZXQoKTtcclxuICBzdGF0aWMgU0lOR0xFX05PMl9NT0xFQ1VMRSA9IG5ldyBQaG90b25UYXJnZXQoKTtcclxuICBzdGF0aWMgU0lOR0xFX08zX01PTEVDVUxFID0gbmV3IFBob3RvblRhcmdldCgpO1xyXG5cclxuICBzdGF0aWMgZW51bWVyYXRpb24gPSBuZXcgRW51bWVyYXRpb24oIFBob3RvblRhcmdldCApO1xyXG5cclxuICAvKipcclxuICAgKiBtYXBzIHBob3RvbiB0YXJnZXQgdG8gdHJhbnNsYXRhYmxlIHN0cmluZ1xyXG4gICAqIEBwYXJhbSB7UGhvdG9uVGFyZ2V0fSBwaG90b25UYXJnZXRcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIHRoZSBjb250cm9sIHBhbmVsIG1vbGVjdWxlIG5hbWVcclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgc3RhdGljIGdldE1vbGVjdWxlTmFtZSggcGhvdG9uVGFyZ2V0ICkge1xyXG4gICAgcmV0dXJuIHBob3RvblRhcmdldCA9PT0gUGhvdG9uVGFyZ2V0LlNJTkdMRV9DT19NT0xFQ1VMRSA/IGNvbnRyb2xQYW5lbENhcmJvbk1vbm94aWRlU3RyaW5nIDpcclxuICAgICAgICAgICBwaG90b25UYXJnZXQgPT09IFBob3RvblRhcmdldC5TSU5HTEVfTjJfTU9MRUNVTEUgPyBjb250cm9sUGFuZWxOaXRyb2dlblN0cmluZyA6XHJcbiAgICAgICAgICAgcGhvdG9uVGFyZ2V0ID09PSBQaG90b25UYXJnZXQuU0lOR0xFX08yX01PTEVDVUxFID8gY29udHJvbFBhbmVsT3h5Z2VuU3RyaW5nIDpcclxuICAgICAgICAgICBwaG90b25UYXJnZXQgPT09IFBob3RvblRhcmdldC5TSU5HTEVfQ08yX01PTEVDVUxFID8gY29udHJvbFBhbmVsQ2FyYm9uRGlveGlkZVN0cmluZyA6XHJcbiAgICAgICAgICAgcGhvdG9uVGFyZ2V0ID09PSBQaG90b25UYXJnZXQuU0lOR0xFX05PMl9NT0xFQ1VMRSA/IGNvbnRyb2xQYW5lbE5pdHJvZ2VuRGlveGlkZVN0cmluZyA6XHJcbiAgICAgICAgICAgcGhvdG9uVGFyZ2V0ID09PSBQaG90b25UYXJnZXQuU0lOR0xFX0gyT19NT0xFQ1VMRSA/IGNvbnRyb2xQYW5lbFdhdGVyU3RyaW5nIDpcclxuICAgICAgICAgICBwaG90b25UYXJnZXQgPT09IFBob3RvblRhcmdldC5TSU5HTEVfTzNfTU9MRUNVTEUgPyBjb250cm9sUGFuZWxPem9uZVN0cmluZyA6XHJcbiAgICAgICAgICAgcGhvdG9uVGFyZ2V0ID09PSBQaG90b25UYXJnZXQuU0lOR0xFX0NINF9NT0xFQ1VMRSA/IGNvbnRyb2xQYW5lbE1ldGhhbmVTdHJpbmcgOlxyXG4gICAgICAgICAgIGFzc2VydCAmJiBhc3NlcnQoIGZhbHNlLCAndW5rbm93bicgKTtcclxuXHJcbiAgfVxyXG59XHJcblxyXG5ncmVlbmhvdXNlRWZmZWN0LnJlZ2lzdGVyKCAnUGhvdG9uVGFyZ2V0JywgUGhvdG9uVGFyZ2V0ICk7XHJcbmV4cG9ydCBkZWZhdWx0IFBob3RvblRhcmdldDsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxXQUFXLE1BQU0seUNBQXlDO0FBQ2pFLE9BQU9DLGdCQUFnQixNQUFNLDhDQUE4QztBQUMzRSxPQUFPQyxnQkFBZ0IsTUFBTSwyQkFBMkI7QUFDeEQsT0FBT0MsdUJBQXVCLE1BQU0sa0NBQWtDO0FBRXRFLE1BQU1DLCtCQUErQixHQUFHRCx1QkFBdUIsQ0FBQ0UsWUFBWSxDQUFDQyxhQUFhO0FBQzFGLE1BQU1DLGdDQUFnQyxHQUFHSix1QkFBdUIsQ0FBQ0UsWUFBWSxDQUFDRyxjQUFjO0FBQzVGLE1BQU1DLHlCQUF5QixHQUFHTix1QkFBdUIsQ0FBQ0UsWUFBWSxDQUFDSyxPQUFPO0FBQzlFLE1BQU1DLGlDQUFpQyxHQUFHUix1QkFBdUIsQ0FBQ0UsWUFBWSxDQUFDTyxlQUFlO0FBQzlGLE1BQU1DLDBCQUEwQixHQUFHVix1QkFBdUIsQ0FBQ0UsWUFBWSxDQUFDUyxRQUFRO0FBQ2hGLE1BQU1DLHdCQUF3QixHQUFHWix1QkFBdUIsQ0FBQ0UsWUFBWSxDQUFDVyxNQUFNO0FBQzVFLE1BQU1DLHVCQUF1QixHQUFHZCx1QkFBdUIsQ0FBQ0UsWUFBWSxDQUFDYSxLQUFLO0FBQzFFLE1BQU1DLHVCQUF1QixHQUFHaEIsdUJBQXVCLENBQUNFLFlBQVksQ0FBQ2UsS0FBSztBQUUxRSxNQUFNQyxZQUFZLFNBQVNwQixnQkFBZ0IsQ0FBQztFQUMxQyxPQUFPcUIsa0JBQWtCLEdBQUcsSUFBSUQsWUFBWSxDQUFDLENBQUM7RUFDOUMsT0FBT0Usa0JBQWtCLEdBQUcsSUFBSUYsWUFBWSxDQUFDLENBQUM7RUFDOUMsT0FBT0csa0JBQWtCLEdBQUcsSUFBSUgsWUFBWSxDQUFDLENBQUM7RUFDOUMsT0FBT0ksbUJBQW1CLEdBQUcsSUFBSUosWUFBWSxDQUFDLENBQUM7RUFDL0MsT0FBT0ssbUJBQW1CLEdBQUcsSUFBSUwsWUFBWSxDQUFDLENBQUM7RUFDL0MsT0FBT00sbUJBQW1CLEdBQUcsSUFBSU4sWUFBWSxDQUFDLENBQUM7RUFDL0MsT0FBT08sbUJBQW1CLEdBQUcsSUFBSVAsWUFBWSxDQUFDLENBQUM7RUFDL0MsT0FBT1Esa0JBQWtCLEdBQUcsSUFBSVIsWUFBWSxDQUFDLENBQUM7RUFFOUMsT0FBT1MsV0FBVyxHQUFHLElBQUk5QixXQUFXLENBQUVxQixZQUFhLENBQUM7O0VBRXBEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFLE9BQU9VLGVBQWVBLENBQUVDLFlBQVksRUFBRztJQUNyQyxPQUFPQSxZQUFZLEtBQUtYLFlBQVksQ0FBQ0Msa0JBQWtCLEdBQUdmLGdDQUFnQyxHQUNuRnlCLFlBQVksS0FBS1gsWUFBWSxDQUFDRSxrQkFBa0IsR0FBR1YsMEJBQTBCLEdBQzdFbUIsWUFBWSxLQUFLWCxZQUFZLENBQUNHLGtCQUFrQixHQUFHVCx3QkFBd0IsR0FDM0VpQixZQUFZLEtBQUtYLFlBQVksQ0FBQ0ksbUJBQW1CLEdBQUdyQiwrQkFBK0IsR0FDbkY0QixZQUFZLEtBQUtYLFlBQVksQ0FBQ08sbUJBQW1CLEdBQUdqQixpQ0FBaUMsR0FDckZxQixZQUFZLEtBQUtYLFlBQVksQ0FBQ00sbUJBQW1CLEdBQUdSLHVCQUF1QixHQUMzRWEsWUFBWSxLQUFLWCxZQUFZLENBQUNRLGtCQUFrQixHQUFHWix1QkFBdUIsR0FDMUVlLFlBQVksS0FBS1gsWUFBWSxDQUFDSyxtQkFBbUIsR0FBR2pCLHlCQUF5QixHQUM3RXdCLE1BQU0sSUFBSUEsTUFBTSxDQUFFLEtBQUssRUFBRSxTQUFVLENBQUM7RUFFN0M7QUFDRjtBQUVBL0IsZ0JBQWdCLENBQUNnQyxRQUFRLENBQUUsY0FBYyxFQUFFYixZQUFhLENBQUM7QUFDekQsZUFBZUEsWUFBWSJ9