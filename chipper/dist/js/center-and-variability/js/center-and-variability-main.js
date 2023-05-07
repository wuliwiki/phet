// Copyright 2022-2023, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import CenterAndVariabilityStrings from './CenterAndVariabilityStrings.js';
import MedianScreen from './median/MedianScreen.js';
import SimulationPreferencesContentNode from './common/view/SimulationPreferencesContentNode.js';
import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import MeanAndMedianScreen from './mean-and-median/MeanAndMedianScreen.js';
import VariabilityScreen from './variability/VariabilityScreen.js';
const centerAndVariabilityTitleStringProperty = CenterAndVariabilityStrings['center-and-variability'].titleStringProperty;
const simOptions = {
  credits: {
    leadDesign: 'Amanda McGarry',
    softwareDevelopment: 'Chris Klusendorf, Sam Reid',
    team: 'Kelly Findley, Marilyn Hartzell, Ariel Paul, Kathy Perkins, David Webb',
    qualityAssurance: 'Clifford Hardin, Emily Miller, Devon Quispe, Nancy Salpepi, Kathryn Woessner',
    graphicArts: 'Mariah Hermsmeyer'
  },
  preferencesModel: new PreferencesModel({
    simulationOptions: {
      customPreferences: [{
        createContent: tandem => new SimulationPreferencesContentNode(tandem.createTandem('simPreferences'))
      }]
    }
  })
};
simLauncher.launch(() => {
  const sim = new Sim(centerAndVariabilityTitleStringProperty, [new MedianScreen({
    tandem: Tandem.ROOT.createTandem('medianScreen')
  }), new MeanAndMedianScreen({
    tandem: Tandem.ROOT.createTandem('meanAndMedianScreen')
  }), new VariabilityScreen({
    tandem: Tandem.ROOT.createTandem('variabilityScreen')
  })], simOptions);
  sim.start();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTaW0iLCJzaW1MYXVuY2hlciIsIlRhbmRlbSIsIkNlbnRlckFuZFZhcmlhYmlsaXR5U3RyaW5ncyIsIk1lZGlhblNjcmVlbiIsIlNpbXVsYXRpb25QcmVmZXJlbmNlc0NvbnRlbnROb2RlIiwiUHJlZmVyZW5jZXNNb2RlbCIsIk1lYW5BbmRNZWRpYW5TY3JlZW4iLCJWYXJpYWJpbGl0eVNjcmVlbiIsImNlbnRlckFuZFZhcmlhYmlsaXR5VGl0bGVTdHJpbmdQcm9wZXJ0eSIsInRpdGxlU3RyaW5nUHJvcGVydHkiLCJzaW1PcHRpb25zIiwiY3JlZGl0cyIsImxlYWREZXNpZ24iLCJzb2Z0d2FyZURldmVsb3BtZW50IiwidGVhbSIsInF1YWxpdHlBc3N1cmFuY2UiLCJncmFwaGljQXJ0cyIsInByZWZlcmVuY2VzTW9kZWwiLCJzaW11bGF0aW9uT3B0aW9ucyIsImN1c3RvbVByZWZlcmVuY2VzIiwiY3JlYXRlQ29udGVudCIsInRhbmRlbSIsImNyZWF0ZVRhbmRlbSIsImxhdW5jaCIsInNpbSIsIlJPT1QiLCJzdGFydCJdLCJzb3VyY2VzIjpbImNlbnRlci1hbmQtdmFyaWFiaWxpdHktbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMi0yMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBNYWluIGVudHJ5IHBvaW50IGZvciB0aGUgc2ltLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIEtsdXNlbmRvcmYgKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqIEBhdXRob3IgU2FtIFJlaWQgKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqL1xyXG5cclxuaW1wb3J0IFNpbSwgeyBTaW1PcHRpb25zIH0gZnJvbSAnLi4vLi4vam9pc3QvanMvU2ltLmpzJztcclxuaW1wb3J0IHNpbUxhdW5jaGVyIGZyb20gJy4uLy4uL2pvaXN0L2pzL3NpbUxhdW5jaGVyLmpzJztcclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuaW1wb3J0IENlbnRlckFuZFZhcmlhYmlsaXR5U3RyaW5ncyBmcm9tICcuL0NlbnRlckFuZFZhcmlhYmlsaXR5U3RyaW5ncy5qcyc7XHJcbmltcG9ydCBNZWRpYW5TY3JlZW4gZnJvbSAnLi9tZWRpYW4vTWVkaWFuU2NyZWVuLmpzJztcclxuaW1wb3J0IFNpbXVsYXRpb25QcmVmZXJlbmNlc0NvbnRlbnROb2RlIGZyb20gJy4vY29tbW9uL3ZpZXcvU2ltdWxhdGlvblByZWZlcmVuY2VzQ29udGVudE5vZGUuanMnO1xyXG5pbXBvcnQgUHJlZmVyZW5jZXNNb2RlbCBmcm9tICcuLi8uLi9qb2lzdC9qcy9wcmVmZXJlbmNlcy9QcmVmZXJlbmNlc01vZGVsLmpzJztcclxuaW1wb3J0IE1lYW5BbmRNZWRpYW5TY3JlZW4gZnJvbSAnLi9tZWFuLWFuZC1tZWRpYW4vTWVhbkFuZE1lZGlhblNjcmVlbi5qcyc7XHJcbmltcG9ydCBWYXJpYWJpbGl0eVNjcmVlbiBmcm9tICcuL3ZhcmlhYmlsaXR5L1ZhcmlhYmlsaXR5U2NyZWVuLmpzJztcclxuXHJcbmNvbnN0IGNlbnRlckFuZFZhcmlhYmlsaXR5VGl0bGVTdHJpbmdQcm9wZXJ0eSA9IENlbnRlckFuZFZhcmlhYmlsaXR5U3RyaW5nc1sgJ2NlbnRlci1hbmQtdmFyaWFiaWxpdHknIF0udGl0bGVTdHJpbmdQcm9wZXJ0eTtcclxuXHJcbmNvbnN0IHNpbU9wdGlvbnM6IFNpbU9wdGlvbnMgPSB7XHJcbiAgY3JlZGl0czoge1xyXG4gICAgbGVhZERlc2lnbjogJ0FtYW5kYSBNY0dhcnJ5JyxcclxuICAgIHNvZnR3YXJlRGV2ZWxvcG1lbnQ6ICdDaHJpcyBLbHVzZW5kb3JmLCBTYW0gUmVpZCcsXHJcbiAgICB0ZWFtOiAnS2VsbHkgRmluZGxleSwgTWFyaWx5biBIYXJ0emVsbCwgQXJpZWwgUGF1bCwgS2F0aHkgUGVya2lucywgRGF2aWQgV2ViYicsXHJcbiAgICBxdWFsaXR5QXNzdXJhbmNlOiAnQ2xpZmZvcmQgSGFyZGluLCBFbWlseSBNaWxsZXIsIERldm9uIFF1aXNwZSwgTmFuY3kgU2FscGVwaSwgS2F0aHJ5biBXb2Vzc25lcicsXHJcbiAgICBncmFwaGljQXJ0czogJ01hcmlhaCBIZXJtc21leWVyJ1xyXG4gIH0sXHJcbiAgcHJlZmVyZW5jZXNNb2RlbDogbmV3IFByZWZlcmVuY2VzTW9kZWwoIHtcclxuICAgIHNpbXVsYXRpb25PcHRpb25zOiB7XHJcbiAgICAgIGN1c3RvbVByZWZlcmVuY2VzOiBbIHtcclxuICAgICAgICBjcmVhdGVDb250ZW50OiB0YW5kZW0gPT4gbmV3IFNpbXVsYXRpb25QcmVmZXJlbmNlc0NvbnRlbnROb2RlKCB0YW5kZW0uY3JlYXRlVGFuZGVtKCAnc2ltUHJlZmVyZW5jZXMnICkgKVxyXG4gICAgICB9IF1cclxuICAgIH1cclxuICB9IClcclxufTtcclxuXHJcbnNpbUxhdW5jaGVyLmxhdW5jaCggKCkgPT4ge1xyXG4gIGNvbnN0IHNpbSA9IG5ldyBTaW0oIGNlbnRlckFuZFZhcmlhYmlsaXR5VGl0bGVTdHJpbmdQcm9wZXJ0eSwgW1xyXG4gICAgbmV3IE1lZGlhblNjcmVlbiggeyB0YW5kZW06IFRhbmRlbS5ST09ULmNyZWF0ZVRhbmRlbSggJ21lZGlhblNjcmVlbicgKSB9ICksXHJcbiAgICBuZXcgTWVhbkFuZE1lZGlhblNjcmVlbiggeyB0YW5kZW06IFRhbmRlbS5ST09ULmNyZWF0ZVRhbmRlbSggJ21lYW5BbmRNZWRpYW5TY3JlZW4nICkgfSApLFxyXG4gICAgbmV3IFZhcmlhYmlsaXR5U2NyZWVuKCB7IHRhbmRlbTogVGFuZGVtLlJPT1QuY3JlYXRlVGFuZGVtKCAndmFyaWFiaWxpdHlTY3JlZW4nICkgfSApXHJcbiAgXSwgc2ltT3B0aW9ucyApO1xyXG4gIHNpbS5zdGFydCgpO1xyXG59ICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsR0FBRyxNQUFzQix1QkFBdUI7QUFDdkQsT0FBT0MsV0FBVyxNQUFNLCtCQUErQjtBQUN2RCxPQUFPQyxNQUFNLE1BQU0sMkJBQTJCO0FBQzlDLE9BQU9DLDJCQUEyQixNQUFNLGtDQUFrQztBQUMxRSxPQUFPQyxZQUFZLE1BQU0sMEJBQTBCO0FBQ25ELE9BQU9DLGdDQUFnQyxNQUFNLG1EQUFtRDtBQUNoRyxPQUFPQyxnQkFBZ0IsTUFBTSxnREFBZ0Q7QUFDN0UsT0FBT0MsbUJBQW1CLE1BQU0sMENBQTBDO0FBQzFFLE9BQU9DLGlCQUFpQixNQUFNLG9DQUFvQztBQUVsRSxNQUFNQyx1Q0FBdUMsR0FBR04sMkJBQTJCLENBQUUsd0JBQXdCLENBQUUsQ0FBQ08sbUJBQW1CO0FBRTNILE1BQU1DLFVBQXNCLEdBQUc7RUFDN0JDLE9BQU8sRUFBRTtJQUNQQyxVQUFVLEVBQUUsZ0JBQWdCO0lBQzVCQyxtQkFBbUIsRUFBRSw0QkFBNEI7SUFDakRDLElBQUksRUFBRSx3RUFBd0U7SUFDOUVDLGdCQUFnQixFQUFFLDhFQUE4RTtJQUNoR0MsV0FBVyxFQUFFO0VBQ2YsQ0FBQztFQUNEQyxnQkFBZ0IsRUFBRSxJQUFJWixnQkFBZ0IsQ0FBRTtJQUN0Q2EsaUJBQWlCLEVBQUU7TUFDakJDLGlCQUFpQixFQUFFLENBQUU7UUFDbkJDLGFBQWEsRUFBRUMsTUFBTSxJQUFJLElBQUlqQixnQ0FBZ0MsQ0FBRWlCLE1BQU0sQ0FBQ0MsWUFBWSxDQUFFLGdCQUFpQixDQUFFO01BQ3pHLENBQUM7SUFDSDtFQUNGLENBQUU7QUFDSixDQUFDO0FBRUR0QixXQUFXLENBQUN1QixNQUFNLENBQUUsTUFBTTtFQUN4QixNQUFNQyxHQUFHLEdBQUcsSUFBSXpCLEdBQUcsQ0FBRVMsdUNBQXVDLEVBQUUsQ0FDNUQsSUFBSUwsWUFBWSxDQUFFO0lBQUVrQixNQUFNLEVBQUVwQixNQUFNLENBQUN3QixJQUFJLENBQUNILFlBQVksQ0FBRSxjQUFlO0VBQUUsQ0FBRSxDQUFDLEVBQzFFLElBQUloQixtQkFBbUIsQ0FBRTtJQUFFZSxNQUFNLEVBQUVwQixNQUFNLENBQUN3QixJQUFJLENBQUNILFlBQVksQ0FBRSxxQkFBc0I7RUFBRSxDQUFFLENBQUMsRUFDeEYsSUFBSWYsaUJBQWlCLENBQUU7SUFBRWMsTUFBTSxFQUFFcEIsTUFBTSxDQUFDd0IsSUFBSSxDQUFDSCxZQUFZLENBQUUsbUJBQW9CO0VBQUUsQ0FBRSxDQUFDLENBQ3JGLEVBQUVaLFVBQVcsQ0FBQztFQUNmYyxHQUFHLENBQUNFLEtBQUssQ0FBQyxDQUFDO0FBQ2IsQ0FBRSxDQUFDIn0=