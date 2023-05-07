// Copyright 2023, University of Colorado Boulder

/**
 * Colors for the 'Circuit Construction Kit' sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Matthew Blackman (PhET Interactive Simulations)
 */

import { ProfileColorProperty } from '../../../scenery/js/imports.js';
import circuitConstructionKitCommon from '../circuitConstructionKitCommon.js';
import Tandem from '../../../tandem/js/Tandem.js';
const tandem = Tandem.GLOBAL_VIEW.createTandem('colorProfile');
const CCKCColors = {
  // Background color used for all screens
  screenBackgroundColorProperty: new ProfileColorProperty(circuitConstructionKitCommon, 'screenBackgroundColor', {
    default: '#99c1ff'
  }),
  textFillProperty: new ProfileColorProperty(circuitConstructionKitCommon, 'textFill', {
    default: 'black'
  }),
  // Fill for Panel-like Containers
  panelFillProperty: new ProfileColorProperty(circuitConstructionKitCommon, 'panelFill', {
    default: '#f1f1f2'
  }),
  // Stroke for Panel-like Containers
  panelStrokeProperty: new ProfileColorProperty(circuitConstructionKitCommon, 'panelStroke', {
    default: 'black'
  }),
  // Color for selected objects (CircuitElement and Vertex)
  highlightStrokeProperty: new ProfileColorProperty(circuitConstructionKitCommon, 'highlightStroke', {
    default: 'yellow'
  }),
  editPanelFillProperty: new ProfileColorProperty(circuitConstructionKitCommon, 'editPanelFill', {
    default: 'rgba( 255, 255, 255, 0.5 )'
  }),
  conventionalCurrentArrowFillProperty: new ProfileColorProperty(circuitConstructionKitCommon, 'conventionalCurrentArrowFill', {
    default: 'red'
  }, {
    tandem: tandem.createTandem('conventionalCurrentArrowFillProperty')
  }),
  conventionalCurrentArrowStrokeProperty: new ProfileColorProperty(circuitConstructionKitCommon, 'conventionalCurrentArrowStroke', {
    default: 'white'
  }, {
    tandem: tandem.createTandem('conventionalCurrentArrowStrokeProperty')
  })
};
circuitConstructionKitCommon.register('CCKCColors', CCKCColors);
export default CCKCColors;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQcm9maWxlQ29sb3JQcm9wZXJ0eSIsImNpcmN1aXRDb25zdHJ1Y3Rpb25LaXRDb21tb24iLCJUYW5kZW0iLCJ0YW5kZW0iLCJHTE9CQUxfVklFVyIsImNyZWF0ZVRhbmRlbSIsIkNDS0NDb2xvcnMiLCJzY3JlZW5CYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eSIsImRlZmF1bHQiLCJ0ZXh0RmlsbFByb3BlcnR5IiwicGFuZWxGaWxsUHJvcGVydHkiLCJwYW5lbFN0cm9rZVByb3BlcnR5IiwiaGlnaGxpZ2h0U3Ryb2tlUHJvcGVydHkiLCJlZGl0UGFuZWxGaWxsUHJvcGVydHkiLCJjb252ZW50aW9uYWxDdXJyZW50QXJyb3dGaWxsUHJvcGVydHkiLCJjb252ZW50aW9uYWxDdXJyZW50QXJyb3dTdHJva2VQcm9wZXJ0eSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiQ0NLQ0NvbG9ycy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogQ29sb3JzIGZvciB0aGUgJ0NpcmN1aXQgQ29uc3RydWN0aW9uIEtpdCcgc2ltLlxyXG4gKlxyXG4gKiBAYXV0aG9yIFNhbSBSZWlkIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKiBAYXV0aG9yIE1hdHRoZXcgQmxhY2ttYW4gKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgUHJvZmlsZUNvbG9yUHJvcGVydHkgfSBmcm9tICcuLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgY2lyY3VpdENvbnN0cnVjdGlvbktpdENvbW1vbiBmcm9tICcuLi9jaXJjdWl0Q29uc3RydWN0aW9uS2l0Q29tbW9uLmpzJztcclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuXHJcbmNvbnN0IHRhbmRlbSA9IFRhbmRlbS5HTE9CQUxfVklFVy5jcmVhdGVUYW5kZW0oICdjb2xvclByb2ZpbGUnICk7XHJcblxyXG5jb25zdCBDQ0tDQ29sb3JzID0ge1xyXG5cclxuICAvLyBCYWNrZ3JvdW5kIGNvbG9yIHVzZWQgZm9yIGFsbCBzY3JlZW5zXHJcbiAgc2NyZWVuQmFja2dyb3VuZENvbG9yUHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2lyY3VpdENvbnN0cnVjdGlvbktpdENvbW1vbiwgJ3NjcmVlbkJhY2tncm91bmRDb2xvcicsIHtcclxuICAgIGRlZmF1bHQ6ICcjOTljMWZmJ1xyXG4gIH0gKSxcclxuXHJcbiAgdGV4dEZpbGxQcm9wZXJ0eTogbmV3IFByb2ZpbGVDb2xvclByb3BlcnR5KCBjaXJjdWl0Q29uc3RydWN0aW9uS2l0Q29tbW9uLCAndGV4dEZpbGwnLCB7XHJcbiAgICBkZWZhdWx0OiAnYmxhY2snXHJcbiAgfSApLFxyXG5cclxuICAvLyBGaWxsIGZvciBQYW5lbC1saWtlIENvbnRhaW5lcnNcclxuICBwYW5lbEZpbGxQcm9wZXJ0eTogbmV3IFByb2ZpbGVDb2xvclByb3BlcnR5KCBjaXJjdWl0Q29uc3RydWN0aW9uS2l0Q29tbW9uLCAncGFuZWxGaWxsJywge1xyXG4gICAgZGVmYXVsdDogJyNmMWYxZjInXHJcbiAgfSApLFxyXG5cclxuICAvLyBTdHJva2UgZm9yIFBhbmVsLWxpa2UgQ29udGFpbmVyc1xyXG4gIHBhbmVsU3Ryb2tlUHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2lyY3VpdENvbnN0cnVjdGlvbktpdENvbW1vbiwgJ3BhbmVsU3Ryb2tlJywge1xyXG4gICAgZGVmYXVsdDogJ2JsYWNrJ1xyXG4gIH0gKSxcclxuXHJcbiAgLy8gQ29sb3IgZm9yIHNlbGVjdGVkIG9iamVjdHMgKENpcmN1aXRFbGVtZW50IGFuZCBWZXJ0ZXgpXHJcbiAgaGlnaGxpZ2h0U3Ryb2tlUHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2lyY3VpdENvbnN0cnVjdGlvbktpdENvbW1vbiwgJ2hpZ2hsaWdodFN0cm9rZScsIHtcclxuICAgIGRlZmF1bHQ6ICd5ZWxsb3cnXHJcbiAgfSApLFxyXG5cclxuICBlZGl0UGFuZWxGaWxsUHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2lyY3VpdENvbnN0cnVjdGlvbktpdENvbW1vbiwgJ2VkaXRQYW5lbEZpbGwnLCB7XHJcbiAgICBkZWZhdWx0OiAncmdiYSggMjU1LCAyNTUsIDI1NSwgMC41ICknXHJcbiAgfSApLFxyXG5cclxuICBjb252ZW50aW9uYWxDdXJyZW50QXJyb3dGaWxsUHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2lyY3VpdENvbnN0cnVjdGlvbktpdENvbW1vbiwgJ2NvbnZlbnRpb25hbEN1cnJlbnRBcnJvd0ZpbGwnLCB7XHJcbiAgICBkZWZhdWx0OiAncmVkJ1xyXG4gIH0sIHtcclxuICAgIHRhbmRlbTogdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ2NvbnZlbnRpb25hbEN1cnJlbnRBcnJvd0ZpbGxQcm9wZXJ0eScgKVxyXG4gIH0gKSxcclxuXHJcbiAgY29udmVudGlvbmFsQ3VycmVudEFycm93U3Ryb2tlUHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2lyY3VpdENvbnN0cnVjdGlvbktpdENvbW1vbiwgJ2NvbnZlbnRpb25hbEN1cnJlbnRBcnJvd1N0cm9rZScsIHtcclxuICAgIGRlZmF1bHQ6ICd3aGl0ZSdcclxuICB9LCB7XHJcbiAgICB0YW5kZW06IHRhbmRlbS5jcmVhdGVUYW5kZW0oICdjb252ZW50aW9uYWxDdXJyZW50QXJyb3dTdHJva2VQcm9wZXJ0eScgKVxyXG4gIH0gKVxyXG59O1xyXG5cclxuY2lyY3VpdENvbnN0cnVjdGlvbktpdENvbW1vbi5yZWdpc3RlciggJ0NDS0NDb2xvcnMnLCBDQ0tDQ29sb3JzICk7XHJcbmV4cG9ydCBkZWZhdWx0IENDS0NDb2xvcnM7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLG9CQUFvQixRQUFRLGdDQUFnQztBQUNyRSxPQUFPQyw0QkFBNEIsTUFBTSxvQ0FBb0M7QUFDN0UsT0FBT0MsTUFBTSxNQUFNLDhCQUE4QjtBQUVqRCxNQUFNQyxNQUFNLEdBQUdELE1BQU0sQ0FBQ0UsV0FBVyxDQUFDQyxZQUFZLENBQUUsY0FBZSxDQUFDO0FBRWhFLE1BQU1DLFVBQVUsR0FBRztFQUVqQjtFQUNBQyw2QkFBNkIsRUFBRSxJQUFJUCxvQkFBb0IsQ0FBRUMsNEJBQTRCLEVBQUUsdUJBQXVCLEVBQUU7SUFDOUdPLE9BQU8sRUFBRTtFQUNYLENBQUUsQ0FBQztFQUVIQyxnQkFBZ0IsRUFBRSxJQUFJVCxvQkFBb0IsQ0FBRUMsNEJBQTRCLEVBQUUsVUFBVSxFQUFFO0lBQ3BGTyxPQUFPLEVBQUU7RUFDWCxDQUFFLENBQUM7RUFFSDtFQUNBRSxpQkFBaUIsRUFBRSxJQUFJVixvQkFBb0IsQ0FBRUMsNEJBQTRCLEVBQUUsV0FBVyxFQUFFO0lBQ3RGTyxPQUFPLEVBQUU7RUFDWCxDQUFFLENBQUM7RUFFSDtFQUNBRyxtQkFBbUIsRUFBRSxJQUFJWCxvQkFBb0IsQ0FBRUMsNEJBQTRCLEVBQUUsYUFBYSxFQUFFO0lBQzFGTyxPQUFPLEVBQUU7RUFDWCxDQUFFLENBQUM7RUFFSDtFQUNBSSx1QkFBdUIsRUFBRSxJQUFJWixvQkFBb0IsQ0FBRUMsNEJBQTRCLEVBQUUsaUJBQWlCLEVBQUU7SUFDbEdPLE9BQU8sRUFBRTtFQUNYLENBQUUsQ0FBQztFQUVISyxxQkFBcUIsRUFBRSxJQUFJYixvQkFBb0IsQ0FBRUMsNEJBQTRCLEVBQUUsZUFBZSxFQUFFO0lBQzlGTyxPQUFPLEVBQUU7RUFDWCxDQUFFLENBQUM7RUFFSE0sb0NBQW9DLEVBQUUsSUFBSWQsb0JBQW9CLENBQUVDLDRCQUE0QixFQUFFLDhCQUE4QixFQUFFO0lBQzVITyxPQUFPLEVBQUU7RUFDWCxDQUFDLEVBQUU7SUFDREwsTUFBTSxFQUFFQSxNQUFNLENBQUNFLFlBQVksQ0FBRSxzQ0FBdUM7RUFDdEUsQ0FBRSxDQUFDO0VBRUhVLHNDQUFzQyxFQUFFLElBQUlmLG9CQUFvQixDQUFFQyw0QkFBNEIsRUFBRSxnQ0FBZ0MsRUFBRTtJQUNoSU8sT0FBTyxFQUFFO0VBQ1gsQ0FBQyxFQUFFO0lBQ0RMLE1BQU0sRUFBRUEsTUFBTSxDQUFDRSxZQUFZLENBQUUsd0NBQXlDO0VBQ3hFLENBQUU7QUFDSixDQUFDO0FBRURKLDRCQUE0QixDQUFDZSxRQUFRLENBQUUsWUFBWSxFQUFFVixVQUFXLENBQUM7QUFDakUsZUFBZUEsVUFBVSJ9