// Copyright 2013-2021, University of Colorado Boulder

/**
 * Colors used in Energy Skate Park, using PhetColorScheme to color energies.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import { Color } from '../../../../scenery/js/imports.js';
import energySkatePark from '../../energySkatePark.js';
const EnergySkateParkColorScheme = {
  // Use color instances here to prevent parsing these values multiple times, luckily PhetColorScheme also
  // uses Color instances
  kineticEnergy: PhetColorScheme.KINETIC_ENERGY,
  potentialEnergy: PhetColorScheme.GRAVITATIONAL_POTENTIAL_ENERGY,
  thermalEnergy: PhetColorScheme.HEAT_THERMAL_ENERGY,
  totalEnergy: PhetColorScheme.TOTAL_ENERGY,
  // fill of circles that show the skater path
  pathFill: new Color(220, 175, 250),
  pathStroke: new Color('black'),
  haloFill: new Color(225, 231, 86, 0.75),
  // for radio buttons
  radioButtonBaseColor: 'white',
  radioButtonSelectedStroke: 'rgb(87,178,226)',
  // associated with the Skater to represent position of the important particle coordinate
  particleCircle: 'red',
  // colors for the Track
  roadFill: 'gray',
  roadLine: 'black',
  // colors for the reference height line
  referenceLineFill: 'rgb(74,133,208)',
  referenceLineStroke: 'black',
  // color for the reference line arrow
  referenceArrowFill: new Color(254, 240, 53),
  panelFill: new Color('#F0F0F0'),
  panelStroke: new Color('#ababab'),
  // chart panels have a white fill so that energy colors are easier to see
  chartPanelFill: 'white',
  // surrounds text for better visibility
  transparentPanelFill: new Color(255, 255, 255, 0.5)
};
energySkatePark.register('EnergySkateParkColorScheme', EnergySkateParkColorScheme);
export default EnergySkateParkColorScheme;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQaGV0Q29sb3JTY2hlbWUiLCJDb2xvciIsImVuZXJneVNrYXRlUGFyayIsIkVuZXJneVNrYXRlUGFya0NvbG9yU2NoZW1lIiwia2luZXRpY0VuZXJneSIsIktJTkVUSUNfRU5FUkdZIiwicG90ZW50aWFsRW5lcmd5IiwiR1JBVklUQVRJT05BTF9QT1RFTlRJQUxfRU5FUkdZIiwidGhlcm1hbEVuZXJneSIsIkhFQVRfVEhFUk1BTF9FTkVSR1kiLCJ0b3RhbEVuZXJneSIsIlRPVEFMX0VORVJHWSIsInBhdGhGaWxsIiwicGF0aFN0cm9rZSIsImhhbG9GaWxsIiwicmFkaW9CdXR0b25CYXNlQ29sb3IiLCJyYWRpb0J1dHRvblNlbGVjdGVkU3Ryb2tlIiwicGFydGljbGVDaXJjbGUiLCJyb2FkRmlsbCIsInJvYWRMaW5lIiwicmVmZXJlbmNlTGluZUZpbGwiLCJyZWZlcmVuY2VMaW5lU3Ryb2tlIiwicmVmZXJlbmNlQXJyb3dGaWxsIiwicGFuZWxGaWxsIiwicGFuZWxTdHJva2UiLCJjaGFydFBhbmVsRmlsbCIsInRyYW5zcGFyZW50UGFuZWxGaWxsIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJFbmVyZ3lTa2F0ZVBhcmtDb2xvclNjaGVtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxMy0yMDIxLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBDb2xvcnMgdXNlZCBpbiBFbmVyZ3kgU2thdGUgUGFyaywgdXNpbmcgUGhldENvbG9yU2NoZW1lIHRvIGNvbG9yIGVuZXJnaWVzLlxyXG4gKlxyXG4gKiBAYXV0aG9yIFNhbSBSZWlkIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBQaGV0Q29sb3JTY2hlbWUgZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL1BoZXRDb2xvclNjaGVtZS5qcyc7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IGVuZXJneVNrYXRlUGFyayBmcm9tICcuLi8uLi9lbmVyZ3lTa2F0ZVBhcmsuanMnO1xyXG5cclxuY29uc3QgRW5lcmd5U2thdGVQYXJrQ29sb3JTY2hlbWUgPSB7XHJcblxyXG4gIC8vIFVzZSBjb2xvciBpbnN0YW5jZXMgaGVyZSB0byBwcmV2ZW50IHBhcnNpbmcgdGhlc2UgdmFsdWVzIG11bHRpcGxlIHRpbWVzLCBsdWNraWx5IFBoZXRDb2xvclNjaGVtZSBhbHNvXHJcbiAgLy8gdXNlcyBDb2xvciBpbnN0YW5jZXNcclxuICBraW5ldGljRW5lcmd5OiBQaGV0Q29sb3JTY2hlbWUuS0lORVRJQ19FTkVSR1ksXHJcbiAgcG90ZW50aWFsRW5lcmd5OiBQaGV0Q29sb3JTY2hlbWUuR1JBVklUQVRJT05BTF9QT1RFTlRJQUxfRU5FUkdZLFxyXG4gIHRoZXJtYWxFbmVyZ3k6IFBoZXRDb2xvclNjaGVtZS5IRUFUX1RIRVJNQUxfRU5FUkdZLFxyXG4gIHRvdGFsRW5lcmd5OiBQaGV0Q29sb3JTY2hlbWUuVE9UQUxfRU5FUkdZLFxyXG5cclxuICAvLyBmaWxsIG9mIGNpcmNsZXMgdGhhdCBzaG93IHRoZSBza2F0ZXIgcGF0aFxyXG4gIHBhdGhGaWxsOiBuZXcgQ29sb3IoIDIyMCwgMTc1LCAyNTAgKSxcclxuICBwYXRoU3Ryb2tlOiBuZXcgQ29sb3IoICdibGFjaycgKSxcclxuICBoYWxvRmlsbDogbmV3IENvbG9yKCAyMjUsIDIzMSwgODYsIDAuNzUgKSxcclxuXHJcbiAgLy8gZm9yIHJhZGlvIGJ1dHRvbnNcclxuICByYWRpb0J1dHRvbkJhc2VDb2xvcjogJ3doaXRlJyxcclxuICByYWRpb0J1dHRvblNlbGVjdGVkU3Ryb2tlOiAncmdiKDg3LDE3OCwyMjYpJyxcclxuXHJcbiAgLy8gYXNzb2NpYXRlZCB3aXRoIHRoZSBTa2F0ZXIgdG8gcmVwcmVzZW50IHBvc2l0aW9uIG9mIHRoZSBpbXBvcnRhbnQgcGFydGljbGUgY29vcmRpbmF0ZVxyXG4gIHBhcnRpY2xlQ2lyY2xlOiAncmVkJyxcclxuXHJcbiAgLy8gY29sb3JzIGZvciB0aGUgVHJhY2tcclxuICByb2FkRmlsbDogJ2dyYXknLFxyXG4gIHJvYWRMaW5lOiAnYmxhY2snLFxyXG5cclxuICAvLyBjb2xvcnMgZm9yIHRoZSByZWZlcmVuY2UgaGVpZ2h0IGxpbmVcclxuICByZWZlcmVuY2VMaW5lRmlsbDogJ3JnYig3NCwxMzMsMjA4KScsXHJcbiAgcmVmZXJlbmNlTGluZVN0cm9rZTogJ2JsYWNrJyxcclxuXHJcbiAgLy8gY29sb3IgZm9yIHRoZSByZWZlcmVuY2UgbGluZSBhcnJvd1xyXG4gIHJlZmVyZW5jZUFycm93RmlsbDogbmV3IENvbG9yKCAyNTQsIDI0MCwgNTMgKSxcclxuXHJcbiAgcGFuZWxGaWxsOiBuZXcgQ29sb3IoICcjRjBGMEYwJyApLFxyXG4gIHBhbmVsU3Ryb2tlOiBuZXcgQ29sb3IoICcjYWJhYmFiJyApLFxyXG5cclxuICAvLyBjaGFydCBwYW5lbHMgaGF2ZSBhIHdoaXRlIGZpbGwgc28gdGhhdCBlbmVyZ3kgY29sb3JzIGFyZSBlYXNpZXIgdG8gc2VlXHJcbiAgY2hhcnRQYW5lbEZpbGw6ICd3aGl0ZScsXHJcblxyXG4gIC8vIHN1cnJvdW5kcyB0ZXh0IGZvciBiZXR0ZXIgdmlzaWJpbGl0eVxyXG4gIHRyYW5zcGFyZW50UGFuZWxGaWxsOiBuZXcgQ29sb3IoIDI1NSwgMjU1LCAyNTUsIDAuNSApXHJcbn07XHJcblxyXG5lbmVyZ3lTa2F0ZVBhcmsucmVnaXN0ZXIoICdFbmVyZ3lTa2F0ZVBhcmtDb2xvclNjaGVtZScsIEVuZXJneVNrYXRlUGFya0NvbG9yU2NoZW1lICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFbmVyZ3lTa2F0ZVBhcmtDb2xvclNjaGVtZTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsZUFBZSxNQUFNLGdEQUFnRDtBQUM1RSxTQUFTQyxLQUFLLFFBQVEsbUNBQW1DO0FBQ3pELE9BQU9DLGVBQWUsTUFBTSwwQkFBMEI7QUFFdEQsTUFBTUMsMEJBQTBCLEdBQUc7RUFFakM7RUFDQTtFQUNBQyxhQUFhLEVBQUVKLGVBQWUsQ0FBQ0ssY0FBYztFQUM3Q0MsZUFBZSxFQUFFTixlQUFlLENBQUNPLDhCQUE4QjtFQUMvREMsYUFBYSxFQUFFUixlQUFlLENBQUNTLG1CQUFtQjtFQUNsREMsV0FBVyxFQUFFVixlQUFlLENBQUNXLFlBQVk7RUFFekM7RUFDQUMsUUFBUSxFQUFFLElBQUlYLEtBQUssQ0FBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUksQ0FBQztFQUNwQ1ksVUFBVSxFQUFFLElBQUlaLEtBQUssQ0FBRSxPQUFRLENBQUM7RUFDaENhLFFBQVEsRUFBRSxJQUFJYixLQUFLLENBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSyxDQUFDO0VBRXpDO0VBQ0FjLG9CQUFvQixFQUFFLE9BQU87RUFDN0JDLHlCQUF5QixFQUFFLGlCQUFpQjtFQUU1QztFQUNBQyxjQUFjLEVBQUUsS0FBSztFQUVyQjtFQUNBQyxRQUFRLEVBQUUsTUFBTTtFQUNoQkMsUUFBUSxFQUFFLE9BQU87RUFFakI7RUFDQUMsaUJBQWlCLEVBQUUsaUJBQWlCO0VBQ3BDQyxtQkFBbUIsRUFBRSxPQUFPO0VBRTVCO0VBQ0FDLGtCQUFrQixFQUFFLElBQUlyQixLQUFLLENBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFHLENBQUM7RUFFN0NzQixTQUFTLEVBQUUsSUFBSXRCLEtBQUssQ0FBRSxTQUFVLENBQUM7RUFDakN1QixXQUFXLEVBQUUsSUFBSXZCLEtBQUssQ0FBRSxTQUFVLENBQUM7RUFFbkM7RUFDQXdCLGNBQWMsRUFBRSxPQUFPO0VBRXZCO0VBQ0FDLG9CQUFvQixFQUFFLElBQUl6QixLQUFLLENBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBSTtBQUN0RCxDQUFDO0FBRURDLGVBQWUsQ0FBQ3lCLFFBQVEsQ0FBRSw0QkFBNEIsRUFBRXhCLDBCQUEyQixDQUFDO0FBRXBGLGVBQWVBLDBCQUEwQiJ9