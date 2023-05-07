// Copyright 2015-2022, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Michael Dubson (PhET)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import TrigTourScreen from './trig-tour/TrigTourScreen.js';
import TrigTourStrings from './TrigTourStrings.js';
const trigTourTitleStringProperty = TrigTourStrings['trig-tour'].titleStringProperty;
const simOptions = {
  credits: {
    leadDesign: 'Michael Dubson, Amanda McGarry',
    softwareDevelopment: 'Michael Dubson, Jesse Greenberg',
    team: 'Ariel Paul, Kathy Perkins',
    qualityAssurance: 'Steele Dalton, Elise Morgan, Oliver Orejola, Bryan Yoelin'
  }
};
simLauncher.launch(() => {
  const sim = new Sim(trigTourTitleStringProperty, [new TrigTourScreen()], simOptions);
  sim.start();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTaW0iLCJzaW1MYXVuY2hlciIsIlRyaWdUb3VyU2NyZWVuIiwiVHJpZ1RvdXJTdHJpbmdzIiwidHJpZ1RvdXJUaXRsZVN0cmluZ1Byb3BlcnR5IiwidGl0bGVTdHJpbmdQcm9wZXJ0eSIsInNpbU9wdGlvbnMiLCJjcmVkaXRzIiwibGVhZERlc2lnbiIsInNvZnR3YXJlRGV2ZWxvcG1lbnQiLCJ0ZWFtIiwicXVhbGl0eUFzc3VyYW5jZSIsImxhdW5jaCIsInNpbSIsInN0YXJ0Il0sInNvdXJjZXMiOlsidHJpZy10b3VyLW1haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTUtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogTWFpbiBlbnRyeSBwb2ludCBmb3IgdGhlIHNpbS5cclxuICpcclxuICogQGF1dGhvciBNaWNoYWVsIER1YnNvbiAoUGhFVClcclxuICovXHJcblxyXG5pbXBvcnQgU2ltIGZyb20gJy4uLy4uL2pvaXN0L2pzL1NpbS5qcyc7XHJcbmltcG9ydCBzaW1MYXVuY2hlciBmcm9tICcuLi8uLi9qb2lzdC9qcy9zaW1MYXVuY2hlci5qcyc7XHJcbmltcG9ydCBUcmlnVG91clNjcmVlbiBmcm9tICcuL3RyaWctdG91ci9UcmlnVG91clNjcmVlbi5qcyc7XHJcbmltcG9ydCBUcmlnVG91clN0cmluZ3MgZnJvbSAnLi9UcmlnVG91clN0cmluZ3MuanMnO1xyXG5cclxuY29uc3QgdHJpZ1RvdXJUaXRsZVN0cmluZ1Byb3BlcnR5ID0gVHJpZ1RvdXJTdHJpbmdzWyAndHJpZy10b3VyJyBdLnRpdGxlU3RyaW5nUHJvcGVydHk7XHJcblxyXG5jb25zdCBzaW1PcHRpb25zID0ge1xyXG4gIGNyZWRpdHM6IHtcclxuICAgIGxlYWREZXNpZ246ICdNaWNoYWVsIER1YnNvbiwgQW1hbmRhIE1jR2FycnknLFxyXG4gICAgc29mdHdhcmVEZXZlbG9wbWVudDogJ01pY2hhZWwgRHVic29uLCBKZXNzZSBHcmVlbmJlcmcnLFxyXG4gICAgdGVhbTogJ0FyaWVsIFBhdWwsIEthdGh5IFBlcmtpbnMnLFxyXG4gICAgcXVhbGl0eUFzc3VyYW5jZTogJ1N0ZWVsZSBEYWx0b24sIEVsaXNlIE1vcmdhbiwgT2xpdmVyIE9yZWpvbGEsIEJyeWFuIFlvZWxpbidcclxuICB9XHJcbn07XHJcblxyXG5zaW1MYXVuY2hlci5sYXVuY2goICgpID0+IHtcclxuICBjb25zdCBzaW0gPSBuZXcgU2ltKCB0cmlnVG91clRpdGxlU3RyaW5nUHJvcGVydHksIFsgbmV3IFRyaWdUb3VyU2NyZWVuKCkgXSwgc2ltT3B0aW9ucyApO1xyXG4gIHNpbS5zdGFydCgpO1xyXG59ICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLEdBQUcsTUFBTSx1QkFBdUI7QUFDdkMsT0FBT0MsV0FBVyxNQUFNLCtCQUErQjtBQUN2RCxPQUFPQyxjQUFjLE1BQU0sK0JBQStCO0FBQzFELE9BQU9DLGVBQWUsTUFBTSxzQkFBc0I7QUFFbEQsTUFBTUMsMkJBQTJCLEdBQUdELGVBQWUsQ0FBRSxXQUFXLENBQUUsQ0FBQ0UsbUJBQW1CO0FBRXRGLE1BQU1DLFVBQVUsR0FBRztFQUNqQkMsT0FBTyxFQUFFO0lBQ1BDLFVBQVUsRUFBRSxnQ0FBZ0M7SUFDNUNDLG1CQUFtQixFQUFFLGlDQUFpQztJQUN0REMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQ0MsZ0JBQWdCLEVBQUU7RUFDcEI7QUFDRixDQUFDO0FBRURWLFdBQVcsQ0FBQ1csTUFBTSxDQUFFLE1BQU07RUFDeEIsTUFBTUMsR0FBRyxHQUFHLElBQUliLEdBQUcsQ0FBRUksMkJBQTJCLEVBQUUsQ0FBRSxJQUFJRixjQUFjLENBQUMsQ0FBQyxDQUFFLEVBQUVJLFVBQVcsQ0FBQztFQUN4Rk8sR0FBRyxDQUFDQyxLQUFLLENBQUMsQ0FBQztBQUNiLENBQUUsQ0FBQyJ9