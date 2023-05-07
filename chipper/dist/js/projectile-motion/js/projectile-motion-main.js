// Copyright 2015-2022, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Andrea Lin (PhET Interactive Simulations)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import DragScreen from './drag/DragScreen.js';
import IntroScreen from './intro/IntroScreen.js';
import LabScreen from './lab/LabScreen.js';
import StatsScreen from './stats/StatsScreen.js';
import ProjectileMotionStrings from './ProjectileMotionStrings.js';
import VectorsScreen from './vectors/VectorsScreen.js';
const projectileMotionTitleString = ProjectileMotionStrings['projectile-motion'].titleStringProperty;
const simOptions = {
  credits: {
    leadDesign: 'Amy Rouinfar, Mike Dubson',
    softwareDevelopment: 'Andrea Lin, Matthew Blackman',
    team: 'Ariel Paul, Kathy Perkins, Amanda McGarry, Wendy Adams, John Blanco',
    qualityAssurance: 'Steele Dalton, Alex Dornan, Ethan Johnson, Liam Mulhall',
    graphicArts: 'Mariah Hermsmeyer, Cheryl McCutchan'
  }
};
simLauncher.launch(() => {
  const sim = new Sim(projectileMotionTitleString, [new IntroScreen(Tandem.ROOT.createTandem('introScreen')), new VectorsScreen(Tandem.ROOT.createTandem('vectorsScreen')), new DragScreen(Tandem.ROOT.createTandem('dragScreen')), new LabScreen(Tandem.ROOT.createTandem('labScreen')), new StatsScreen(Tandem.ROOT.createTandem('statsScreen'))], simOptions);
  sim.start();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTaW0iLCJzaW1MYXVuY2hlciIsIlRhbmRlbSIsIkRyYWdTY3JlZW4iLCJJbnRyb1NjcmVlbiIsIkxhYlNjcmVlbiIsIlN0YXRzU2NyZWVuIiwiUHJvamVjdGlsZU1vdGlvblN0cmluZ3MiLCJWZWN0b3JzU2NyZWVuIiwicHJvamVjdGlsZU1vdGlvblRpdGxlU3RyaW5nIiwidGl0bGVTdHJpbmdQcm9wZXJ0eSIsInNpbU9wdGlvbnMiLCJjcmVkaXRzIiwibGVhZERlc2lnbiIsInNvZnR3YXJlRGV2ZWxvcG1lbnQiLCJ0ZWFtIiwicXVhbGl0eUFzc3VyYW5jZSIsImdyYXBoaWNBcnRzIiwibGF1bmNoIiwic2ltIiwiUk9PVCIsImNyZWF0ZVRhbmRlbSIsInN0YXJ0Il0sInNvdXJjZXMiOlsicHJvamVjdGlsZS1tb3Rpb24tbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNS0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBNYWluIGVudHJ5IHBvaW50IGZvciB0aGUgc2ltLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEFuZHJlYSBMaW4gKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqL1xyXG5cclxuaW1wb3J0IFNpbSBmcm9tICcuLi8uLi9qb2lzdC9qcy9TaW0uanMnO1xyXG5pbXBvcnQgc2ltTGF1bmNoZXIgZnJvbSAnLi4vLi4vam9pc3QvanMvc2ltTGF1bmNoZXIuanMnO1xyXG5pbXBvcnQgVGFuZGVtIGZyb20gJy4uLy4uL3RhbmRlbS9qcy9UYW5kZW0uanMnO1xyXG5pbXBvcnQgRHJhZ1NjcmVlbiBmcm9tICcuL2RyYWcvRHJhZ1NjcmVlbi5qcyc7XHJcbmltcG9ydCBJbnRyb1NjcmVlbiBmcm9tICcuL2ludHJvL0ludHJvU2NyZWVuLmpzJztcclxuaW1wb3J0IExhYlNjcmVlbiBmcm9tICcuL2xhYi9MYWJTY3JlZW4uanMnO1xyXG5pbXBvcnQgU3RhdHNTY3JlZW4gZnJvbSAnLi9zdGF0cy9TdGF0c1NjcmVlbi5qcyc7XHJcbmltcG9ydCBQcm9qZWN0aWxlTW90aW9uU3RyaW5ncyBmcm9tICcuL1Byb2plY3RpbGVNb3Rpb25TdHJpbmdzLmpzJztcclxuaW1wb3J0IFZlY3RvcnNTY3JlZW4gZnJvbSAnLi92ZWN0b3JzL1ZlY3RvcnNTY3JlZW4uanMnO1xyXG5cclxuY29uc3QgcHJvamVjdGlsZU1vdGlvblRpdGxlU3RyaW5nID1cclxuICBQcm9qZWN0aWxlTW90aW9uU3RyaW5nc1sgJ3Byb2plY3RpbGUtbW90aW9uJyBdLnRpdGxlU3RyaW5nUHJvcGVydHk7XHJcblxyXG5jb25zdCBzaW1PcHRpb25zID0ge1xyXG4gIGNyZWRpdHM6IHtcclxuICAgIGxlYWREZXNpZ246ICdBbXkgUm91aW5mYXIsIE1pa2UgRHVic29uJyxcclxuICAgIHNvZnR3YXJlRGV2ZWxvcG1lbnQ6ICdBbmRyZWEgTGluLCBNYXR0aGV3IEJsYWNrbWFuJyxcclxuICAgIHRlYW06ICdBcmllbCBQYXVsLCBLYXRoeSBQZXJraW5zLCBBbWFuZGEgTWNHYXJyeSwgV2VuZHkgQWRhbXMsIEpvaG4gQmxhbmNvJyxcclxuICAgIHF1YWxpdHlBc3N1cmFuY2U6ICdTdGVlbGUgRGFsdG9uLCBBbGV4IERvcm5hbiwgRXRoYW4gSm9obnNvbiwgTGlhbSBNdWxoYWxsJyxcclxuICAgIGdyYXBoaWNBcnRzOiAnTWFyaWFoIEhlcm1zbWV5ZXIsIENoZXJ5bCBNY0N1dGNoYW4nXHJcbiAgfVxyXG59O1xyXG5cclxuc2ltTGF1bmNoZXIubGF1bmNoKCAoKSA9PiB7XHJcbiAgY29uc3Qgc2ltID0gbmV3IFNpbShcclxuICAgIHByb2plY3RpbGVNb3Rpb25UaXRsZVN0cmluZyxcclxuICAgIFtcclxuICAgICAgbmV3IEludHJvU2NyZWVuKCBUYW5kZW0uUk9PVC5jcmVhdGVUYW5kZW0oICdpbnRyb1NjcmVlbicgKSApLFxyXG4gICAgICBuZXcgVmVjdG9yc1NjcmVlbiggVGFuZGVtLlJPT1QuY3JlYXRlVGFuZGVtKCAndmVjdG9yc1NjcmVlbicgKSApLFxyXG4gICAgICBuZXcgRHJhZ1NjcmVlbiggVGFuZGVtLlJPT1QuY3JlYXRlVGFuZGVtKCAnZHJhZ1NjcmVlbicgKSApLFxyXG4gICAgICBuZXcgTGFiU2NyZWVuKCBUYW5kZW0uUk9PVC5jcmVhdGVUYW5kZW0oICdsYWJTY3JlZW4nICkgKSxcclxuICAgICAgbmV3IFN0YXRzU2NyZWVuKCBUYW5kZW0uUk9PVC5jcmVhdGVUYW5kZW0oICdzdGF0c1NjcmVlbicgKSApXHJcbiAgICBdLFxyXG4gICAgc2ltT3B0aW9uc1xyXG4gICk7XHJcbiAgc2ltLnN0YXJ0KCk7XHJcbn0gKTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLEdBQUcsTUFBTSx1QkFBdUI7QUFDdkMsT0FBT0MsV0FBVyxNQUFNLCtCQUErQjtBQUN2RCxPQUFPQyxNQUFNLE1BQU0sMkJBQTJCO0FBQzlDLE9BQU9DLFVBQVUsTUFBTSxzQkFBc0I7QUFDN0MsT0FBT0MsV0FBVyxNQUFNLHdCQUF3QjtBQUNoRCxPQUFPQyxTQUFTLE1BQU0sb0JBQW9CO0FBQzFDLE9BQU9DLFdBQVcsTUFBTSx3QkFBd0I7QUFDaEQsT0FBT0MsdUJBQXVCLE1BQU0sOEJBQThCO0FBQ2xFLE9BQU9DLGFBQWEsTUFBTSw0QkFBNEI7QUFFdEQsTUFBTUMsMkJBQTJCLEdBQy9CRix1QkFBdUIsQ0FBRSxtQkFBbUIsQ0FBRSxDQUFDRyxtQkFBbUI7QUFFcEUsTUFBTUMsVUFBVSxHQUFHO0VBQ2pCQyxPQUFPLEVBQUU7SUFDUEMsVUFBVSxFQUFFLDJCQUEyQjtJQUN2Q0MsbUJBQW1CLEVBQUUsOEJBQThCO0lBQ25EQyxJQUFJLEVBQUUscUVBQXFFO0lBQzNFQyxnQkFBZ0IsRUFBRSx5REFBeUQ7SUFDM0VDLFdBQVcsRUFBRTtFQUNmO0FBQ0YsQ0FBQztBQUVEaEIsV0FBVyxDQUFDaUIsTUFBTSxDQUFFLE1BQU07RUFDeEIsTUFBTUMsR0FBRyxHQUFHLElBQUluQixHQUFHLENBQ2pCUywyQkFBMkIsRUFDM0IsQ0FDRSxJQUFJTCxXQUFXLENBQUVGLE1BQU0sQ0FBQ2tCLElBQUksQ0FBQ0MsWUFBWSxDQUFFLGFBQWMsQ0FBRSxDQUFDLEVBQzVELElBQUliLGFBQWEsQ0FBRU4sTUFBTSxDQUFDa0IsSUFBSSxDQUFDQyxZQUFZLENBQUUsZUFBZ0IsQ0FBRSxDQUFDLEVBQ2hFLElBQUlsQixVQUFVLENBQUVELE1BQU0sQ0FBQ2tCLElBQUksQ0FBQ0MsWUFBWSxDQUFFLFlBQWEsQ0FBRSxDQUFDLEVBQzFELElBQUloQixTQUFTLENBQUVILE1BQU0sQ0FBQ2tCLElBQUksQ0FBQ0MsWUFBWSxDQUFFLFdBQVksQ0FBRSxDQUFDLEVBQ3hELElBQUlmLFdBQVcsQ0FBRUosTUFBTSxDQUFDa0IsSUFBSSxDQUFDQyxZQUFZLENBQUUsYUFBYyxDQUFFLENBQUMsQ0FDN0QsRUFDRFYsVUFDRixDQUFDO0VBQ0RRLEdBQUcsQ0FBQ0csS0FBSyxDQUFDLENBQUM7QUFDYixDQUFFLENBQUMifQ==