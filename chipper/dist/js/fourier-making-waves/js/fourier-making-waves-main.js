// Copyright 2020-2023, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import DiscreteScreen from './discrete/DiscreteScreen.js';
import FourierMakingWavesStrings from './FourierMakingWavesStrings.js';
import WaveGameScreen from './waveGame/WaveGameScreen.js';
import WavePacketScreen from './wavepacket/WavePacketScreen.js';
const titleStringProperty = FourierMakingWavesStrings['fourier-making-waves'].titleStringProperty;
simLauncher.launch(() => {
  const screens = [new DiscreteScreen(Tandem.ROOT.createTandem('discreteScreen')), new WaveGameScreen(Tandem.ROOT.createTandem('waveGameScreen')), new WavePacketScreen(Tandem.ROOT.createTandem('wavePacketScreen'))];
  const sim = new Sim(titleStringProperty, screens, {
    credits: {
      leadDesign: 'Amy Rouinfar, Sam McKagan',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Wendy Adams, Mike Dubson, Danielle Harlow, Ariel Paul, Kathy Perkins, Carl Wieman',
      qualityAssurance: 'Logan Bray, Clifford Hardin, Brooklyn Lash, Emily Miller, Nancy Salpepi, Kathryn Woessner',
      thanks: 'We gratefully acknowledge support from STROBE NSF Science & Technology Center Grant DMR-1548924. ' + 'Any opinions, findings, and conclusions or recommendations expressed in this material are those of ' + 'the author(s) and do not necessarily reflect the views of the National Science Foundation.'
    }
  });
  sim.start();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTaW0iLCJzaW1MYXVuY2hlciIsIlRhbmRlbSIsIkRpc2NyZXRlU2NyZWVuIiwiRm91cmllck1ha2luZ1dhdmVzU3RyaW5ncyIsIldhdmVHYW1lU2NyZWVuIiwiV2F2ZVBhY2tldFNjcmVlbiIsInRpdGxlU3RyaW5nUHJvcGVydHkiLCJsYXVuY2giLCJzY3JlZW5zIiwiUk9PVCIsImNyZWF0ZVRhbmRlbSIsInNpbSIsImNyZWRpdHMiLCJsZWFkRGVzaWduIiwic29mdHdhcmVEZXZlbG9wbWVudCIsInRlYW0iLCJxdWFsaXR5QXNzdXJhbmNlIiwidGhhbmtzIiwic3RhcnQiXSwic291cmNlcyI6WyJmb3VyaWVyLW1ha2luZy13YXZlcy1tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIwLTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIE1haW4gZW50cnkgcG9pbnQgZm9yIHRoZSBzaW0uXHJcbiAqXHJcbiAqIEBhdXRob3IgQ2hyaXMgTWFsbGV5IChQaXhlbFpvb20sIEluYy5cclxuICovXHJcblxyXG5pbXBvcnQgU2ltIGZyb20gJy4uLy4uL2pvaXN0L2pzL1NpbS5qcyc7XHJcbmltcG9ydCBzaW1MYXVuY2hlciBmcm9tICcuLi8uLi9qb2lzdC9qcy9zaW1MYXVuY2hlci5qcyc7XHJcbmltcG9ydCBUYW5kZW0gZnJvbSAnLi4vLi4vdGFuZGVtL2pzL1RhbmRlbS5qcyc7XHJcbmltcG9ydCBEaXNjcmV0ZVNjcmVlbiBmcm9tICcuL2Rpc2NyZXRlL0Rpc2NyZXRlU2NyZWVuLmpzJztcclxuaW1wb3J0IEZvdXJpZXJNYWtpbmdXYXZlc1N0cmluZ3MgZnJvbSAnLi9Gb3VyaWVyTWFraW5nV2F2ZXNTdHJpbmdzLmpzJztcclxuaW1wb3J0IFdhdmVHYW1lU2NyZWVuIGZyb20gJy4vd2F2ZUdhbWUvV2F2ZUdhbWVTY3JlZW4uanMnO1xyXG5pbXBvcnQgV2F2ZVBhY2tldFNjcmVlbiBmcm9tICcuL3dhdmVwYWNrZXQvV2F2ZVBhY2tldFNjcmVlbi5qcyc7XHJcblxyXG5jb25zdCB0aXRsZVN0cmluZ1Byb3BlcnR5ID0gRm91cmllck1ha2luZ1dhdmVzU3RyaW5nc1sgJ2ZvdXJpZXItbWFraW5nLXdhdmVzJyBdLnRpdGxlU3RyaW5nUHJvcGVydHk7XHJcblxyXG5zaW1MYXVuY2hlci5sYXVuY2goICgpID0+IHtcclxuXHJcbiAgY29uc3Qgc2NyZWVucyA9IFtcclxuICAgIG5ldyBEaXNjcmV0ZVNjcmVlbiggVGFuZGVtLlJPT1QuY3JlYXRlVGFuZGVtKCAnZGlzY3JldGVTY3JlZW4nICkgKSxcclxuICAgIG5ldyBXYXZlR2FtZVNjcmVlbiggVGFuZGVtLlJPT1QuY3JlYXRlVGFuZGVtKCAnd2F2ZUdhbWVTY3JlZW4nICkgKSxcclxuICAgIG5ldyBXYXZlUGFja2V0U2NyZWVuKCBUYW5kZW0uUk9PVC5jcmVhdGVUYW5kZW0oICd3YXZlUGFja2V0U2NyZWVuJyApIClcclxuICBdO1xyXG5cclxuICBjb25zdCBzaW0gPSBuZXcgU2ltKCB0aXRsZVN0cmluZ1Byb3BlcnR5LCBzY3JlZW5zLCB7XHJcbiAgICBjcmVkaXRzOiB7XHJcbiAgICAgIGxlYWREZXNpZ246ICdBbXkgUm91aW5mYXIsIFNhbSBNY0thZ2FuJyxcclxuICAgICAgc29mdHdhcmVEZXZlbG9wbWVudDogJ0NocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKScsXHJcbiAgICAgIHRlYW06ICdXZW5keSBBZGFtcywgTWlrZSBEdWJzb24sIERhbmllbGxlIEhhcmxvdywgQXJpZWwgUGF1bCwgS2F0aHkgUGVya2lucywgQ2FybCBXaWVtYW4nLFxyXG4gICAgICBxdWFsaXR5QXNzdXJhbmNlOiAnTG9nYW4gQnJheSwgQ2xpZmZvcmQgSGFyZGluLCBCcm9va2x5biBMYXNoLCBFbWlseSBNaWxsZXIsIE5hbmN5IFNhbHBlcGksIEthdGhyeW4gV29lc3NuZXInLFxyXG4gICAgICB0aGFua3M6ICdXZSBncmF0ZWZ1bGx5IGFja25vd2xlZGdlIHN1cHBvcnQgZnJvbSBTVFJPQkUgTlNGIFNjaWVuY2UgJiBUZWNobm9sb2d5IENlbnRlciBHcmFudCBETVItMTU0ODkyNC4gJyArXHJcbiAgICAgICAgICAgICAgJ0FueSBvcGluaW9ucywgZmluZGluZ3MsIGFuZCBjb25jbHVzaW9ucyBvciByZWNvbW1lbmRhdGlvbnMgZXhwcmVzc2VkIGluIHRoaXMgbWF0ZXJpYWwgYXJlIHRob3NlIG9mICcgK1xyXG4gICAgICAgICAgICAgICd0aGUgYXV0aG9yKHMpIGFuZCBkbyBub3QgbmVjZXNzYXJpbHkgcmVmbGVjdCB0aGUgdmlld3Mgb2YgdGhlIE5hdGlvbmFsIFNjaWVuY2UgRm91bmRhdGlvbi4nXHJcbiAgICB9XHJcbiAgfSApO1xyXG5cclxuICBzaW0uc3RhcnQoKTtcclxufSApOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxHQUFHLE1BQU0sdUJBQXVCO0FBQ3ZDLE9BQU9DLFdBQVcsTUFBTSwrQkFBK0I7QUFDdkQsT0FBT0MsTUFBTSxNQUFNLDJCQUEyQjtBQUM5QyxPQUFPQyxjQUFjLE1BQU0sOEJBQThCO0FBQ3pELE9BQU9DLHlCQUF5QixNQUFNLGdDQUFnQztBQUN0RSxPQUFPQyxjQUFjLE1BQU0sOEJBQThCO0FBQ3pELE9BQU9DLGdCQUFnQixNQUFNLGtDQUFrQztBQUUvRCxNQUFNQyxtQkFBbUIsR0FBR0gseUJBQXlCLENBQUUsc0JBQXNCLENBQUUsQ0FBQ0csbUJBQW1CO0FBRW5HTixXQUFXLENBQUNPLE1BQU0sQ0FBRSxNQUFNO0VBRXhCLE1BQU1DLE9BQU8sR0FBRyxDQUNkLElBQUlOLGNBQWMsQ0FBRUQsTUFBTSxDQUFDUSxJQUFJLENBQUNDLFlBQVksQ0FBRSxnQkFBaUIsQ0FBRSxDQUFDLEVBQ2xFLElBQUlOLGNBQWMsQ0FBRUgsTUFBTSxDQUFDUSxJQUFJLENBQUNDLFlBQVksQ0FBRSxnQkFBaUIsQ0FBRSxDQUFDLEVBQ2xFLElBQUlMLGdCQUFnQixDQUFFSixNQUFNLENBQUNRLElBQUksQ0FBQ0MsWUFBWSxDQUFFLGtCQUFtQixDQUFFLENBQUMsQ0FDdkU7RUFFRCxNQUFNQyxHQUFHLEdBQUcsSUFBSVosR0FBRyxDQUFFTyxtQkFBbUIsRUFBRUUsT0FBTyxFQUFFO0lBQ2pESSxPQUFPLEVBQUU7TUFDUEMsVUFBVSxFQUFFLDJCQUEyQjtNQUN2Q0MsbUJBQW1CLEVBQUUsZ0NBQWdDO01BQ3JEQyxJQUFJLEVBQUUsbUZBQW1GO01BQ3pGQyxnQkFBZ0IsRUFBRSwyRkFBMkY7TUFDN0dDLE1BQU0sRUFBRSxtR0FBbUcsR0FDbkcscUdBQXFHLEdBQ3JHO0lBQ1Y7RUFDRixDQUFFLENBQUM7RUFFSE4sR0FBRyxDQUFDTyxLQUFLLENBQUMsQ0FBQztBQUNiLENBQUUsQ0FBQyJ9