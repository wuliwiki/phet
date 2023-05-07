// Copyright 2013-2022, University of Colorado Boulder

/**
 * Main entry point for the Balancing Act simulation.
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import BalanceLabScreen from './balancelab/BalanceLabScreen.js';
import BalancingActStrings from './BalancingActStrings.js';
import BalanceGameScreen from './game/BalanceGameScreen.js';
import BAIntroScreen from './intro/BAIntroScreen.js';
const balancingActTitleStringProperty = BalancingActStrings['balancing-act'].titleStringProperty;

// constants
const tandem = Tandem.ROOT;
simLauncher.launch(() => {
  const simOptions = {
    credits: {
      leadDesign: 'Kathy Perkins, John Blanco, Ariel Paul',
      softwareDevelopment: 'John Blanco',
      graphicArts: 'John Blanco, Mariah Hermsmeyer',
      team: 'Michael Dubson, Trish Loeblein'
    }
  };

  // Create and start the sim
  const screens = [new BAIntroScreen(tandem.createTandem('introScreen')), new BalanceLabScreen(tandem.createTandem('balanceLabScreen')),
  // Game screen not available in phet-io
  ...(Tandem.PHET_IO_ENABLED ? [] : [new BalanceGameScreen(tandem.createTandem('gameScreen'))])];
  new Sim(balancingActTitleStringProperty, screens, simOptions).start();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTaW0iLCJzaW1MYXVuY2hlciIsIlRhbmRlbSIsIkJhbGFuY2VMYWJTY3JlZW4iLCJCYWxhbmNpbmdBY3RTdHJpbmdzIiwiQmFsYW5jZUdhbWVTY3JlZW4iLCJCQUludHJvU2NyZWVuIiwiYmFsYW5jaW5nQWN0VGl0bGVTdHJpbmdQcm9wZXJ0eSIsInRpdGxlU3RyaW5nUHJvcGVydHkiLCJ0YW5kZW0iLCJST09UIiwibGF1bmNoIiwic2ltT3B0aW9ucyIsImNyZWRpdHMiLCJsZWFkRGVzaWduIiwic29mdHdhcmVEZXZlbG9wbWVudCIsImdyYXBoaWNBcnRzIiwidGVhbSIsInNjcmVlbnMiLCJjcmVhdGVUYW5kZW0iLCJQSEVUX0lPX0VOQUJMRUQiLCJzdGFydCJdLCJzb3VyY2VzIjpbImJhbGFuY2luZy1hY3QtbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxMy0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBNYWluIGVudHJ5IHBvaW50IGZvciB0aGUgQmFsYW5jaW5nIEFjdCBzaW11bGF0aW9uLlxyXG4gKi9cclxuXHJcbmltcG9ydCBTaW0gZnJvbSAnLi4vLi4vam9pc3QvanMvU2ltLmpzJztcclxuaW1wb3J0IHNpbUxhdW5jaGVyIGZyb20gJy4uLy4uL2pvaXN0L2pzL3NpbUxhdW5jaGVyLmpzJztcclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuaW1wb3J0IEJhbGFuY2VMYWJTY3JlZW4gZnJvbSAnLi9iYWxhbmNlbGFiL0JhbGFuY2VMYWJTY3JlZW4uanMnO1xyXG5pbXBvcnQgQmFsYW5jaW5nQWN0U3RyaW5ncyBmcm9tICcuL0JhbGFuY2luZ0FjdFN0cmluZ3MuanMnO1xyXG5pbXBvcnQgQmFsYW5jZUdhbWVTY3JlZW4gZnJvbSAnLi9nYW1lL0JhbGFuY2VHYW1lU2NyZWVuLmpzJztcclxuaW1wb3J0IEJBSW50cm9TY3JlZW4gZnJvbSAnLi9pbnRyby9CQUludHJvU2NyZWVuLmpzJztcclxuXHJcbmNvbnN0IGJhbGFuY2luZ0FjdFRpdGxlU3RyaW5nUHJvcGVydHkgPSBCYWxhbmNpbmdBY3RTdHJpbmdzWyAnYmFsYW5jaW5nLWFjdCcgXS50aXRsZVN0cmluZ1Byb3BlcnR5O1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IHRhbmRlbSA9IFRhbmRlbS5ST09UO1xyXG5cclxuc2ltTGF1bmNoZXIubGF1bmNoKCAoKSA9PiB7XHJcblxyXG4gIGNvbnN0IHNpbU9wdGlvbnMgPSB7XHJcbiAgICBjcmVkaXRzOiB7XHJcbiAgICAgIGxlYWREZXNpZ246ICdLYXRoeSBQZXJraW5zLCBKb2huIEJsYW5jbywgQXJpZWwgUGF1bCcsXHJcbiAgICAgIHNvZnR3YXJlRGV2ZWxvcG1lbnQ6ICdKb2huIEJsYW5jbycsXHJcbiAgICAgIGdyYXBoaWNBcnRzOiAnSm9obiBCbGFuY28sIE1hcmlhaCBIZXJtc21leWVyJyxcclxuICAgICAgdGVhbTogJ01pY2hhZWwgRHVic29uLCBUcmlzaCBMb2VibGVpbidcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBDcmVhdGUgYW5kIHN0YXJ0IHRoZSBzaW1cclxuICBjb25zdCBzY3JlZW5zID0gW1xyXG4gICAgbmV3IEJBSW50cm9TY3JlZW4oIHRhbmRlbS5jcmVhdGVUYW5kZW0oICdpbnRyb1NjcmVlbicgKSApLFxyXG4gICAgbmV3IEJhbGFuY2VMYWJTY3JlZW4oIHRhbmRlbS5jcmVhdGVUYW5kZW0oICdiYWxhbmNlTGFiU2NyZWVuJyApICksXHJcblxyXG4gICAgLy8gR2FtZSBzY3JlZW4gbm90IGF2YWlsYWJsZSBpbiBwaGV0LWlvXHJcbiAgICAuLi4oIFRhbmRlbS5QSEVUX0lPX0VOQUJMRUQgPyBbXSA6IFsgbmV3IEJhbGFuY2VHYW1lU2NyZWVuKCB0YW5kZW0uY3JlYXRlVGFuZGVtKCAnZ2FtZVNjcmVlbicgKSApIF0gKVxyXG4gIF07XHJcblxyXG4gIG5ldyBTaW0oIGJhbGFuY2luZ0FjdFRpdGxlU3RyaW5nUHJvcGVydHksIHNjcmVlbnMsIHNpbU9wdGlvbnMgKS5zdGFydCgpO1xyXG59ICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsR0FBRyxNQUFNLHVCQUF1QjtBQUN2QyxPQUFPQyxXQUFXLE1BQU0sK0JBQStCO0FBQ3ZELE9BQU9DLE1BQU0sTUFBTSwyQkFBMkI7QUFDOUMsT0FBT0MsZ0JBQWdCLE1BQU0sa0NBQWtDO0FBQy9ELE9BQU9DLG1CQUFtQixNQUFNLDBCQUEwQjtBQUMxRCxPQUFPQyxpQkFBaUIsTUFBTSw2QkFBNkI7QUFDM0QsT0FBT0MsYUFBYSxNQUFNLDBCQUEwQjtBQUVwRCxNQUFNQywrQkFBK0IsR0FBR0gsbUJBQW1CLENBQUUsZUFBZSxDQUFFLENBQUNJLG1CQUFtQjs7QUFFbEc7QUFDQSxNQUFNQyxNQUFNLEdBQUdQLE1BQU0sQ0FBQ1EsSUFBSTtBQUUxQlQsV0FBVyxDQUFDVSxNQUFNLENBQUUsTUFBTTtFQUV4QixNQUFNQyxVQUFVLEdBQUc7SUFDakJDLE9BQU8sRUFBRTtNQUNQQyxVQUFVLEVBQUUsd0NBQXdDO01BQ3BEQyxtQkFBbUIsRUFBRSxhQUFhO01BQ2xDQyxXQUFXLEVBQUUsZ0NBQWdDO01BQzdDQyxJQUFJLEVBQUU7SUFDUjtFQUNGLENBQUM7O0VBRUQ7RUFDQSxNQUFNQyxPQUFPLEdBQUcsQ0FDZCxJQUFJWixhQUFhLENBQUVHLE1BQU0sQ0FBQ1UsWUFBWSxDQUFFLGFBQWMsQ0FBRSxDQUFDLEVBQ3pELElBQUloQixnQkFBZ0IsQ0FBRU0sTUFBTSxDQUFDVSxZQUFZLENBQUUsa0JBQW1CLENBQUUsQ0FBQztFQUVqRTtFQUNBLElBQUtqQixNQUFNLENBQUNrQixlQUFlLEdBQUcsRUFBRSxHQUFHLENBQUUsSUFBSWYsaUJBQWlCLENBQUVJLE1BQU0sQ0FBQ1UsWUFBWSxDQUFFLFlBQWEsQ0FBRSxDQUFDLENBQUUsQ0FBRSxDQUN0RztFQUVELElBQUluQixHQUFHLENBQUVPLCtCQUErQixFQUFFVyxPQUFPLEVBQUVOLFVBQVcsQ0FBQyxDQUFDUyxLQUFLLENBQUMsQ0FBQztBQUN6RSxDQUFFLENBQUMifQ==