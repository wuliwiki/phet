// Copyright 2018-2022, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EqualityExplorerConstants from '../../equality-explorer/js/common/EqualityExplorerConstants.js';
import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import EqualityExplorerTwoVariablesStrings from './EqualityExplorerTwoVariablesStrings.js';
import TwoVariablesScreen from './twovariables/TwoVariablesScreen.js';
simLauncher.launch(() => {
  const screens = [new TwoVariablesScreen({
    tandem: Tandem.ROOT.createTandem('twoVariablesScreen')
  })];
  const sim = new Sim(EqualityExplorerTwoVariablesStrings['equality-explorer-two-variables'].titleStringProperty, screens, {
    credits: EqualityExplorerConstants.CREDITS
  });
  sim.start();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFcXVhbGl0eUV4cGxvcmVyQ29uc3RhbnRzIiwiU2ltIiwic2ltTGF1bmNoZXIiLCJUYW5kZW0iLCJFcXVhbGl0eUV4cGxvcmVyVHdvVmFyaWFibGVzU3RyaW5ncyIsIlR3b1ZhcmlhYmxlc1NjcmVlbiIsImxhdW5jaCIsInNjcmVlbnMiLCJ0YW5kZW0iLCJST09UIiwiY3JlYXRlVGFuZGVtIiwic2ltIiwidGl0bGVTdHJpbmdQcm9wZXJ0eSIsImNyZWRpdHMiLCJDUkVESVRTIiwic3RhcnQiXSwic291cmNlcyI6WyJlcXVhbGl0eS1leHBsb3Jlci10d28tdmFyaWFibGVzLW1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogTWFpbiBlbnRyeSBwb2ludCBmb3IgdGhlIHNpbS5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgRXF1YWxpdHlFeHBsb3JlckNvbnN0YW50cyBmcm9tICcuLi8uLi9lcXVhbGl0eS1leHBsb3Jlci9qcy9jb21tb24vRXF1YWxpdHlFeHBsb3JlckNvbnN0YW50cy5qcyc7XHJcbmltcG9ydCBTaW0gZnJvbSAnLi4vLi4vam9pc3QvanMvU2ltLmpzJztcclxuaW1wb3J0IHNpbUxhdW5jaGVyIGZyb20gJy4uLy4uL2pvaXN0L2pzL3NpbUxhdW5jaGVyLmpzJztcclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuaW1wb3J0IEVxdWFsaXR5RXhwbG9yZXJUd29WYXJpYWJsZXNTdHJpbmdzIGZyb20gJy4vRXF1YWxpdHlFeHBsb3JlclR3b1ZhcmlhYmxlc1N0cmluZ3MuanMnO1xyXG5pbXBvcnQgVHdvVmFyaWFibGVzU2NyZWVuIGZyb20gJy4vdHdvdmFyaWFibGVzL1R3b1ZhcmlhYmxlc1NjcmVlbi5qcyc7XHJcblxyXG5zaW1MYXVuY2hlci5sYXVuY2goICgpID0+IHtcclxuXHJcbiAgY29uc3Qgc2NyZWVucyA9IFtcclxuICAgIG5ldyBUd29WYXJpYWJsZXNTY3JlZW4oIHsgdGFuZGVtOiBUYW5kZW0uUk9PVC5jcmVhdGVUYW5kZW0oICd0d29WYXJpYWJsZXNTY3JlZW4nICkgfSApXHJcbiAgXTtcclxuXHJcbiAgY29uc3Qgc2ltID0gbmV3IFNpbSggRXF1YWxpdHlFeHBsb3JlclR3b1ZhcmlhYmxlc1N0cmluZ3NbICdlcXVhbGl0eS1leHBsb3Jlci10d28tdmFyaWFibGVzJyBdLnRpdGxlU3RyaW5nUHJvcGVydHksIHNjcmVlbnMsIHtcclxuICAgIGNyZWRpdHM6IEVxdWFsaXR5RXhwbG9yZXJDb25zdGFudHMuQ1JFRElUU1xyXG4gIH0gKTtcclxuXHJcbiAgc2ltLnN0YXJ0KCk7XHJcbn0gKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EseUJBQXlCLE1BQU0sZ0VBQWdFO0FBQ3RHLE9BQU9DLEdBQUcsTUFBTSx1QkFBdUI7QUFDdkMsT0FBT0MsV0FBVyxNQUFNLCtCQUErQjtBQUN2RCxPQUFPQyxNQUFNLE1BQU0sMkJBQTJCO0FBQzlDLE9BQU9DLG1DQUFtQyxNQUFNLDBDQUEwQztBQUMxRixPQUFPQyxrQkFBa0IsTUFBTSxzQ0FBc0M7QUFFckVILFdBQVcsQ0FBQ0ksTUFBTSxDQUFFLE1BQU07RUFFeEIsTUFBTUMsT0FBTyxHQUFHLENBQ2QsSUFBSUYsa0JBQWtCLENBQUU7SUFBRUcsTUFBTSxFQUFFTCxNQUFNLENBQUNNLElBQUksQ0FBQ0MsWUFBWSxDQUFFLG9CQUFxQjtFQUFFLENBQUUsQ0FBQyxDQUN2RjtFQUVELE1BQU1DLEdBQUcsR0FBRyxJQUFJVixHQUFHLENBQUVHLG1DQUFtQyxDQUFFLGlDQUFpQyxDQUFFLENBQUNRLG1CQUFtQixFQUFFTCxPQUFPLEVBQUU7SUFDMUhNLE9BQU8sRUFBRWIseUJBQXlCLENBQUNjO0VBQ3JDLENBQUUsQ0FBQztFQUVISCxHQUFHLENBQUNJLEtBQUssQ0FBQyxDQUFDO0FBQ2IsQ0FBRSxDQUFDIn0=