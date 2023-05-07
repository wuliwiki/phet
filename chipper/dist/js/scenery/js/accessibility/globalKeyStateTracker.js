// Copyright 2020-2022, University of Colorado Boulder

/**
 * A global object that tracks the state of the keyboard for the Window. Use this
 * to get information about which keyboard keys are pressed down and for how long.
 *
 * @author Michael Kauzmann
 * @author Jesse Greenberg
 */

import Tandem from '../../../tandem/js/Tandem.js';
import { KeyStateTracker, scenery } from '../imports.js';
class GlobalKeyStateTracker extends KeyStateTracker {
  constructor(options) {
    super(options);
  }
}
const globalKeyStateTracker = new GlobalKeyStateTracker({
  tandem: Tandem.GENERAL_CONTROLLER.createTandem('keyStateTracker')
});
scenery.register('globalKeyStateTracker', globalKeyStateTracker);
export default globalKeyStateTracker;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUYW5kZW0iLCJLZXlTdGF0ZVRyYWNrZXIiLCJzY2VuZXJ5IiwiR2xvYmFsS2V5U3RhdGVUcmFja2VyIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwiZ2xvYmFsS2V5U3RhdGVUcmFja2VyIiwidGFuZGVtIiwiR0VORVJBTF9DT05UUk9MTEVSIiwiY3JlYXRlVGFuZGVtIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJnbG9iYWxLZXlTdGF0ZVRyYWNrZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogQSBnbG9iYWwgb2JqZWN0IHRoYXQgdHJhY2tzIHRoZSBzdGF0ZSBvZiB0aGUga2V5Ym9hcmQgZm9yIHRoZSBXaW5kb3cuIFVzZSB0aGlzXHJcbiAqIHRvIGdldCBpbmZvcm1hdGlvbiBhYm91dCB3aGljaCBrZXlib2FyZCBrZXlzIGFyZSBwcmVzc2VkIGRvd24gYW5kIGZvciBob3cgbG9uZy5cclxuICpcclxuICogQGF1dGhvciBNaWNoYWVsIEthdXptYW5uXHJcbiAqIEBhdXRob3IgSmVzc2UgR3JlZW5iZXJnXHJcbiAqL1xyXG5cclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuaW1wb3J0IHsgS2V5U3RhdGVUcmFja2VyLCBzY2VuZXJ5IH0gZnJvbSAnLi4vaW1wb3J0cy5qcyc7XHJcbmltcG9ydCB7IEtleVN0YXRlVHJhY2tlck9wdGlvbnMgfSBmcm9tICcuL0tleVN0YXRlVHJhY2tlci5qcyc7XHJcblxyXG5jbGFzcyBHbG9iYWxLZXlTdGF0ZVRyYWNrZXIgZXh0ZW5kcyBLZXlTdGF0ZVRyYWNrZXIge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvciggb3B0aW9ucz86IEtleVN0YXRlVHJhY2tlck9wdGlvbnMgKSB7XHJcbiAgICBzdXBlciggb3B0aW9ucyApO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgZ2xvYmFsS2V5U3RhdGVUcmFja2VyID0gbmV3IEdsb2JhbEtleVN0YXRlVHJhY2tlcigge1xyXG4gIHRhbmRlbTogVGFuZGVtLkdFTkVSQUxfQ09OVFJPTExFUi5jcmVhdGVUYW5kZW0oICdrZXlTdGF0ZVRyYWNrZXInIClcclxufSApO1xyXG5cclxuc2NlbmVyeS5yZWdpc3RlciggJ2dsb2JhbEtleVN0YXRlVHJhY2tlcicsIGdsb2JhbEtleVN0YXRlVHJhY2tlciApO1xyXG5leHBvcnQgZGVmYXVsdCBnbG9iYWxLZXlTdGF0ZVRyYWNrZXI7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxNQUFNLE1BQU0sOEJBQThCO0FBQ2pELFNBQVNDLGVBQWUsRUFBRUMsT0FBTyxRQUFRLGVBQWU7QUFHeEQsTUFBTUMscUJBQXFCLFNBQVNGLGVBQWUsQ0FBQztFQUMzQ0csV0FBV0EsQ0FBRUMsT0FBZ0MsRUFBRztJQUNyRCxLQUFLLENBQUVBLE9BQVEsQ0FBQztFQUNsQjtBQUNGO0FBRUEsTUFBTUMscUJBQXFCLEdBQUcsSUFBSUgscUJBQXFCLENBQUU7RUFDdkRJLE1BQU0sRUFBRVAsTUFBTSxDQUFDUSxrQkFBa0IsQ0FBQ0MsWUFBWSxDQUFFLGlCQUFrQjtBQUNwRSxDQUFFLENBQUM7QUFFSFAsT0FBTyxDQUFDUSxRQUFRLENBQUUsdUJBQXVCLEVBQUVKLHFCQUFzQixDQUFDO0FBQ2xFLGVBQWVBLHFCQUFxQiJ9