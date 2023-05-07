// Copyright 2019-2020, University of Colorado Boulder

/**
 * A separate panel just with EnergySkateParkVisibilityControls for this sim, used to save space when there are
 * already too many items in the EnergySkateParkControlPanel.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import Panel from '../../../../sun/js/Panel.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import EnergySkateParkVisibilityControls from './EnergySkateParkVisibilityControls.js';
class VisibilityControlsPanel extends Panel {
  /**
   * @param {EnergySkateParkModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor(model, tandem, options) {
    options = merge({}, EnergySkateParkConstants.PANEL_OPTIONS, options);
    const content = new EnergySkateParkVisibilityControls(model, tandem, {
      showPieChartCheckbox: false,
      showSpeedCheckbox: false,
      showGridCheckbox: true,
      showReferenceHeightCheckbox: true
    });
    super(content, options);
  }
}
energySkatePark.register('VisibilityControlsPanel', VisibilityControlsPanel);
export default VisibilityControlsPanel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtZXJnZSIsIlBhbmVsIiwiZW5lcmd5U2thdGVQYXJrIiwiRW5lcmd5U2thdGVQYXJrQ29uc3RhbnRzIiwiRW5lcmd5U2thdGVQYXJrVmlzaWJpbGl0eUNvbnRyb2xzIiwiVmlzaWJpbGl0eUNvbnRyb2xzUGFuZWwiLCJjb25zdHJ1Y3RvciIsIm1vZGVsIiwidGFuZGVtIiwib3B0aW9ucyIsIlBBTkVMX09QVElPTlMiLCJjb250ZW50Iiwic2hvd1BpZUNoYXJ0Q2hlY2tib3giLCJzaG93U3BlZWRDaGVja2JveCIsInNob3dHcmlkQ2hlY2tib3giLCJzaG93UmVmZXJlbmNlSGVpZ2h0Q2hlY2tib3giLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlZpc2liaWxpdHlDb250cm9sc1BhbmVsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIEEgc2VwYXJhdGUgcGFuZWwganVzdCB3aXRoIEVuZXJneVNrYXRlUGFya1Zpc2liaWxpdHlDb250cm9scyBmb3IgdGhpcyBzaW0sIHVzZWQgdG8gc2F2ZSBzcGFjZSB3aGVuIHRoZXJlIGFyZVxyXG4gKiBhbHJlYWR5IHRvbyBtYW55IGl0ZW1zIGluIHRoZSBFbmVyZ3lTa2F0ZVBhcmtDb250cm9sUGFuZWwuXHJcbiAqXHJcbiAqIEBhdXRob3IgSmVzc2UgR3JlZW5iZXJnIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBtZXJnZSBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvbWVyZ2UuanMnO1xyXG5pbXBvcnQgUGFuZWwgZnJvbSAnLi4vLi4vLi4vLi4vc3VuL2pzL1BhbmVsLmpzJztcclxuaW1wb3J0IGVuZXJneVNrYXRlUGFyayBmcm9tICcuLi8uLi9lbmVyZ3lTa2F0ZVBhcmsuanMnO1xyXG5pbXBvcnQgRW5lcmd5U2thdGVQYXJrQ29uc3RhbnRzIGZyb20gJy4uL0VuZXJneVNrYXRlUGFya0NvbnN0YW50cy5qcyc7XHJcbmltcG9ydCBFbmVyZ3lTa2F0ZVBhcmtWaXNpYmlsaXR5Q29udHJvbHMgZnJvbSAnLi9FbmVyZ3lTa2F0ZVBhcmtWaXNpYmlsaXR5Q29udHJvbHMuanMnO1xyXG5cclxuY2xhc3MgVmlzaWJpbGl0eUNvbnRyb2xzUGFuZWwgZXh0ZW5kcyBQYW5lbCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7RW5lcmd5U2thdGVQYXJrTW9kZWx9IG1vZGVsXHJcbiAgICogQHBhcmFtIHtUYW5kZW19IHRhbmRlbVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggbW9kZWwsIHRhbmRlbSwgb3B0aW9ucyApIHtcclxuICAgIG9wdGlvbnMgPSBtZXJnZSgge30sIEVuZXJneVNrYXRlUGFya0NvbnN0YW50cy5QQU5FTF9PUFRJT05TLCBvcHRpb25zICk7XHJcblxyXG4gICAgY29uc3QgY29udGVudCA9IG5ldyBFbmVyZ3lTa2F0ZVBhcmtWaXNpYmlsaXR5Q29udHJvbHMoIG1vZGVsLCB0YW5kZW0sIHtcclxuICAgICAgc2hvd1BpZUNoYXJ0Q2hlY2tib3g6IGZhbHNlLFxyXG4gICAgICBzaG93U3BlZWRDaGVja2JveDogZmFsc2UsXHJcbiAgICAgIHNob3dHcmlkQ2hlY2tib3g6IHRydWUsXHJcbiAgICAgIHNob3dSZWZlcmVuY2VIZWlnaHRDaGVja2JveDogdHJ1ZVxyXG4gICAgfSApO1xyXG5cclxuICAgIHN1cGVyKCBjb250ZW50LCBvcHRpb25zICk7XHJcbiAgfVxyXG59XHJcblxyXG5lbmVyZ3lTa2F0ZVBhcmsucmVnaXN0ZXIoICdWaXNpYmlsaXR5Q29udHJvbHNQYW5lbCcsIFZpc2liaWxpdHlDb250cm9sc1BhbmVsICk7XHJcbmV4cG9ydCBkZWZhdWx0IFZpc2liaWxpdHlDb250cm9sc1BhbmVsOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLEtBQUssTUFBTSxtQ0FBbUM7QUFDckQsT0FBT0MsS0FBSyxNQUFNLDZCQUE2QjtBQUMvQyxPQUFPQyxlQUFlLE1BQU0sMEJBQTBCO0FBQ3RELE9BQU9DLHdCQUF3QixNQUFNLGdDQUFnQztBQUNyRSxPQUFPQyxpQ0FBaUMsTUFBTSx3Q0FBd0M7QUFFdEYsTUFBTUMsdUJBQXVCLFNBQVNKLEtBQUssQ0FBQztFQUUxQztBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBQ0VLLFdBQVdBLENBQUVDLEtBQUssRUFBRUMsTUFBTSxFQUFFQyxPQUFPLEVBQUc7SUFDcENBLE9BQU8sR0FBR1QsS0FBSyxDQUFFLENBQUMsQ0FBQyxFQUFFRyx3QkFBd0IsQ0FBQ08sYUFBYSxFQUFFRCxPQUFRLENBQUM7SUFFdEUsTUFBTUUsT0FBTyxHQUFHLElBQUlQLGlDQUFpQyxDQUFFRyxLQUFLLEVBQUVDLE1BQU0sRUFBRTtNQUNwRUksb0JBQW9CLEVBQUUsS0FBSztNQUMzQkMsaUJBQWlCLEVBQUUsS0FBSztNQUN4QkMsZ0JBQWdCLEVBQUUsSUFBSTtNQUN0QkMsMkJBQTJCLEVBQUU7SUFDL0IsQ0FBRSxDQUFDO0lBRUgsS0FBSyxDQUFFSixPQUFPLEVBQUVGLE9BQVEsQ0FBQztFQUMzQjtBQUNGO0FBRUFQLGVBQWUsQ0FBQ2MsUUFBUSxDQUFFLHlCQUF5QixFQUFFWCx1QkFBd0IsQ0FBQztBQUM5RSxlQUFlQSx1QkFBdUIifQ==