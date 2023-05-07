// Copyright 2013-2022, University of Colorado Boulder

/**
 * Main entry point for the 'pH Scale: Basics' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import PHScaleConstants from '../../ph-scale/js/common/PHScaleConstants.js';
import PHScaleQueryParameters from '../../ph-scale/js/common/PHScaleQueryParameters.js';
import MacroScreen from '../../ph-scale/js/macro/MacroScreen.js';
import Tandem from '../../tandem/js/Tandem.js';
import PhScaleBasicsStrings from './PhScaleBasicsStrings.js';

// If autofill query parameter was not in the URL, change the default.
if (!QueryStringMachine.containsKey('autofill')) {
  PHScaleQueryParameters.autofill = false;
}
simLauncher.launch(() => {
  const screens = [new MacroScreen({
    tandem: Tandem.ROOT.createTandem('macroScreen')
  })];
  const sim = new Sim(PhScaleBasicsStrings['ph-scale-basics'].titleStringProperty, screens, {
    credits: PHScaleConstants.CREDITS,
    phetioDesigned: true
  });
  sim.start();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTaW0iLCJzaW1MYXVuY2hlciIsIlBIU2NhbGVDb25zdGFudHMiLCJQSFNjYWxlUXVlcnlQYXJhbWV0ZXJzIiwiTWFjcm9TY3JlZW4iLCJUYW5kZW0iLCJQaFNjYWxlQmFzaWNzU3RyaW5ncyIsIlF1ZXJ5U3RyaW5nTWFjaGluZSIsImNvbnRhaW5zS2V5IiwiYXV0b2ZpbGwiLCJsYXVuY2giLCJzY3JlZW5zIiwidGFuZGVtIiwiUk9PVCIsImNyZWF0ZVRhbmRlbSIsInNpbSIsInRpdGxlU3RyaW5nUHJvcGVydHkiLCJjcmVkaXRzIiwiQ1JFRElUUyIsInBoZXRpb0Rlc2lnbmVkIiwic3RhcnQiXSwic291cmNlcyI6WyJwaC1zY2FsZS1iYXNpY3MtbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxMy0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBNYWluIGVudHJ5IHBvaW50IGZvciB0aGUgJ3BIIFNjYWxlOiBCYXNpY3MnIHNpbS5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgU2ltIGZyb20gJy4uLy4uL2pvaXN0L2pzL1NpbS5qcyc7XHJcbmltcG9ydCBzaW1MYXVuY2hlciBmcm9tICcuLi8uLi9qb2lzdC9qcy9zaW1MYXVuY2hlci5qcyc7XHJcbmltcG9ydCBQSFNjYWxlQ29uc3RhbnRzIGZyb20gJy4uLy4uL3BoLXNjYWxlL2pzL2NvbW1vbi9QSFNjYWxlQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IFBIU2NhbGVRdWVyeVBhcmFtZXRlcnMgZnJvbSAnLi4vLi4vcGgtc2NhbGUvanMvY29tbW9uL1BIU2NhbGVRdWVyeVBhcmFtZXRlcnMuanMnO1xyXG5pbXBvcnQgTWFjcm9TY3JlZW4gZnJvbSAnLi4vLi4vcGgtc2NhbGUvanMvbWFjcm8vTWFjcm9TY3JlZW4uanMnO1xyXG5pbXBvcnQgVGFuZGVtIGZyb20gJy4uLy4uL3RhbmRlbS9qcy9UYW5kZW0uanMnO1xyXG5pbXBvcnQgUGhTY2FsZUJhc2ljc1N0cmluZ3MgZnJvbSAnLi9QaFNjYWxlQmFzaWNzU3RyaW5ncy5qcyc7XHJcblxyXG4vLyBJZiBhdXRvZmlsbCBxdWVyeSBwYXJhbWV0ZXIgd2FzIG5vdCBpbiB0aGUgVVJMLCBjaGFuZ2UgdGhlIGRlZmF1bHQuXHJcbmlmICggIVF1ZXJ5U3RyaW5nTWFjaGluZS5jb250YWluc0tleSggJ2F1dG9maWxsJyApICkge1xyXG4gIFBIU2NhbGVRdWVyeVBhcmFtZXRlcnMuYXV0b2ZpbGwgPSBmYWxzZTtcclxufVxyXG5cclxuc2ltTGF1bmNoZXIubGF1bmNoKCAoKSA9PiB7XHJcblxyXG4gIGNvbnN0IHNjcmVlbnMgPSBbXHJcbiAgICBuZXcgTWFjcm9TY3JlZW4oIHtcclxuICAgICAgdGFuZGVtOiBUYW5kZW0uUk9PVC5jcmVhdGVUYW5kZW0oICdtYWNyb1NjcmVlbicgKVxyXG4gICAgfSApXHJcbiAgXTtcclxuXHJcbiAgY29uc3Qgc2ltID0gbmV3IFNpbSggUGhTY2FsZUJhc2ljc1N0cmluZ3NbICdwaC1zY2FsZS1iYXNpY3MnIF0udGl0bGVTdHJpbmdQcm9wZXJ0eSwgc2NyZWVucywge1xyXG4gICAgY3JlZGl0czogUEhTY2FsZUNvbnN0YW50cy5DUkVESVRTLFxyXG4gICAgcGhldGlvRGVzaWduZWQ6IHRydWVcclxuICB9ICk7XHJcblxyXG4gIHNpbS5zdGFydCgpO1xyXG59ICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLEdBQUcsTUFBTSx1QkFBdUI7QUFDdkMsT0FBT0MsV0FBVyxNQUFNLCtCQUErQjtBQUN2RCxPQUFPQyxnQkFBZ0IsTUFBTSw4Q0FBOEM7QUFDM0UsT0FBT0Msc0JBQXNCLE1BQU0sb0RBQW9EO0FBQ3ZGLE9BQU9DLFdBQVcsTUFBTSx3Q0FBd0M7QUFDaEUsT0FBT0MsTUFBTSxNQUFNLDJCQUEyQjtBQUM5QyxPQUFPQyxvQkFBb0IsTUFBTSwyQkFBMkI7O0FBRTVEO0FBQ0EsSUFBSyxDQUFDQyxrQkFBa0IsQ0FBQ0MsV0FBVyxDQUFFLFVBQVcsQ0FBQyxFQUFHO0VBQ25ETCxzQkFBc0IsQ0FBQ00sUUFBUSxHQUFHLEtBQUs7QUFDekM7QUFFQVIsV0FBVyxDQUFDUyxNQUFNLENBQUUsTUFBTTtFQUV4QixNQUFNQyxPQUFPLEdBQUcsQ0FDZCxJQUFJUCxXQUFXLENBQUU7SUFDZlEsTUFBTSxFQUFFUCxNQUFNLENBQUNRLElBQUksQ0FBQ0MsWUFBWSxDQUFFLGFBQWM7RUFDbEQsQ0FBRSxDQUFDLENBQ0o7RUFFRCxNQUFNQyxHQUFHLEdBQUcsSUFBSWYsR0FBRyxDQUFFTSxvQkFBb0IsQ0FBRSxpQkFBaUIsQ0FBRSxDQUFDVSxtQkFBbUIsRUFBRUwsT0FBTyxFQUFFO0lBQzNGTSxPQUFPLEVBQUVmLGdCQUFnQixDQUFDZ0IsT0FBTztJQUNqQ0MsY0FBYyxFQUFFO0VBQ2xCLENBQUUsQ0FBQztFQUVISixHQUFHLENBQUNLLEtBQUssQ0FBQyxDQUFDO0FBQ2IsQ0FBRSxDQUFDIn0=