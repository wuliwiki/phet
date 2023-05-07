// Copyright 2018-2022, University of Colorado Boulder

/**
 * Model for the 'Two Variables' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EqualityExplorerModel from '../../../../equality-explorer/js/common/model/EqualityExplorerModel.js';
import equalityExplorerTwoVariables from '../../equalityExplorerTwoVariables.js';
import TwoVariablesScene from './TwoVariablesScene.js';
export default class TwoVariablesModel extends EqualityExplorerModel {
  constructor(tandem) {
    const scenes = [new TwoVariablesScene(tandem.createTandem('twoVariablesScene'))];
    super(scenes, tandem);
  }
}
equalityExplorerTwoVariables.register('TwoVariablesModel', TwoVariablesModel);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFcXVhbGl0eUV4cGxvcmVyTW9kZWwiLCJlcXVhbGl0eUV4cGxvcmVyVHdvVmFyaWFibGVzIiwiVHdvVmFyaWFibGVzU2NlbmUiLCJUd29WYXJpYWJsZXNNb2RlbCIsImNvbnN0cnVjdG9yIiwidGFuZGVtIiwic2NlbmVzIiwiY3JlYXRlVGFuZGVtIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJUd29WYXJpYWJsZXNNb2RlbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBNb2RlbCBmb3IgdGhlICdUd28gVmFyaWFibGVzJyBzY3JlZW4uXHJcbiAqXHJcbiAqIEBhdXRob3IgQ2hyaXMgTWFsbGV5IChQaXhlbFpvb20sIEluYy4pXHJcbiAqL1xyXG5cclxuaW1wb3J0IEVxdWFsaXR5RXhwbG9yZXJNb2RlbCBmcm9tICcuLi8uLi8uLi8uLi9lcXVhbGl0eS1leHBsb3Jlci9qcy9jb21tb24vbW9kZWwvRXF1YWxpdHlFeHBsb3Jlck1vZGVsLmpzJztcclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi8uLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuaW1wb3J0IGVxdWFsaXR5RXhwbG9yZXJUd29WYXJpYWJsZXMgZnJvbSAnLi4vLi4vZXF1YWxpdHlFeHBsb3JlclR3b1ZhcmlhYmxlcy5qcyc7XHJcbmltcG9ydCBUd29WYXJpYWJsZXNTY2VuZSBmcm9tICcuL1R3b1ZhcmlhYmxlc1NjZW5lLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR3b1ZhcmlhYmxlc01vZGVsIGV4dGVuZHMgRXF1YWxpdHlFeHBsb3Jlck1vZGVsIHtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCB0YW5kZW06IFRhbmRlbSApIHtcclxuXHJcbiAgICBjb25zdCBzY2VuZXMgPSBbXHJcbiAgICAgIG5ldyBUd29WYXJpYWJsZXNTY2VuZSggdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3R3b1ZhcmlhYmxlc1NjZW5lJyApIClcclxuICAgIF07XHJcblxyXG4gICAgc3VwZXIoIHNjZW5lcywgdGFuZGVtICk7XHJcbiAgfVxyXG59XHJcblxyXG5lcXVhbGl0eUV4cGxvcmVyVHdvVmFyaWFibGVzLnJlZ2lzdGVyKCAnVHdvVmFyaWFibGVzTW9kZWwnLCBUd29WYXJpYWJsZXNNb2RlbCApOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxxQkFBcUIsTUFBTSx3RUFBd0U7QUFFMUcsT0FBT0MsNEJBQTRCLE1BQU0sdUNBQXVDO0FBQ2hGLE9BQU9DLGlCQUFpQixNQUFNLHdCQUF3QjtBQUV0RCxlQUFlLE1BQU1DLGlCQUFpQixTQUFTSCxxQkFBcUIsQ0FBQztFQUU1REksV0FBV0EsQ0FBRUMsTUFBYyxFQUFHO0lBRW5DLE1BQU1DLE1BQU0sR0FBRyxDQUNiLElBQUlKLGlCQUFpQixDQUFFRyxNQUFNLENBQUNFLFlBQVksQ0FBRSxtQkFBb0IsQ0FBRSxDQUFDLENBQ3BFO0lBRUQsS0FBSyxDQUFFRCxNQUFNLEVBQUVELE1BQU8sQ0FBQztFQUN6QjtBQUNGO0FBRUFKLDRCQUE0QixDQUFDTyxRQUFRLENBQUUsbUJBQW1CLEVBQUVMLGlCQUFrQixDQUFDIn0=