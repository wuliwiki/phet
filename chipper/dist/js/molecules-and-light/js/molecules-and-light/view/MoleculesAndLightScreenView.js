// Copyright 2014-2023, University of Colorado Boulder

/**
 * View for Molecules and Light.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author John Blanco (PhET Interactive Simulations)
 *
 */

import MicroScreenView from '../../../../greenhouse-effect/js/micro/view/MicroScreenView.js';
import moleculesAndLight from '../../moleculesAndLight.js';
class MoleculesAndLightScreenView extends MicroScreenView {
  /**
   * @param {PhotonAbsorptionModel} photonAbsorptionModel
   * @param {Tandem} tandem
   */
  constructor(photonAbsorptionModel, tandem) {
    super(photonAbsorptionModel, tandem);
  }
}
moleculesAndLight.register('MoleculesAndLightScreenView', MoleculesAndLightScreenView);
export default MoleculesAndLightScreenView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNaWNyb1NjcmVlblZpZXciLCJtb2xlY3VsZXNBbmRMaWdodCIsIk1vbGVjdWxlc0FuZExpZ2h0U2NyZWVuVmlldyIsImNvbnN0cnVjdG9yIiwicGhvdG9uQWJzb3JwdGlvbk1vZGVsIiwidGFuZGVtIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJNb2xlY3VsZXNBbmRMaWdodFNjcmVlblZpZXcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTQtMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogVmlldyBmb3IgTW9sZWN1bGVzIGFuZCBMaWdodC5cclxuICpcclxuICogQGF1dGhvciBKZXNzZSBHcmVlbmJlcmcgKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqIEBhdXRob3IgU2FtIFJlaWQgKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqIEBhdXRob3IgSm9obiBCbGFuY28gKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqXHJcbiAqL1xyXG5cclxuaW1wb3J0IE1pY3JvU2NyZWVuVmlldyBmcm9tICcuLi8uLi8uLi8uLi9ncmVlbmhvdXNlLWVmZmVjdC9qcy9taWNyby92aWV3L01pY3JvU2NyZWVuVmlldy5qcyc7XHJcbmltcG9ydCBtb2xlY3VsZXNBbmRMaWdodCBmcm9tICcuLi8uLi9tb2xlY3VsZXNBbmRMaWdodC5qcyc7XHJcblxyXG5jbGFzcyBNb2xlY3VsZXNBbmRMaWdodFNjcmVlblZpZXcgZXh0ZW5kcyBNaWNyb1NjcmVlblZpZXcge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1Bob3RvbkFic29ycHRpb25Nb2RlbH0gcGhvdG9uQWJzb3JwdGlvbk1vZGVsXHJcbiAgICogQHBhcmFtIHtUYW5kZW19IHRhbmRlbVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBwaG90b25BYnNvcnB0aW9uTW9kZWwsIHRhbmRlbSApIHtcclxuICAgIHN1cGVyKCBwaG90b25BYnNvcnB0aW9uTW9kZWwsIHRhbmRlbSApO1xyXG4gIH1cclxufVxyXG5cclxubW9sZWN1bGVzQW5kTGlnaHQucmVnaXN0ZXIoICdNb2xlY3VsZXNBbmRMaWdodFNjcmVlblZpZXcnLCBNb2xlY3VsZXNBbmRMaWdodFNjcmVlblZpZXcgKTtcclxuZXhwb3J0IGRlZmF1bHQgTW9sZWN1bGVzQW5kTGlnaHRTY3JlZW5WaWV3O1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsZUFBZSxNQUFNLGdFQUFnRTtBQUM1RixPQUFPQyxpQkFBaUIsTUFBTSw0QkFBNEI7QUFFMUQsTUFBTUMsMkJBQTJCLFNBQVNGLGVBQWUsQ0FBQztFQUV4RDtBQUNGO0FBQ0E7QUFDQTtFQUNFRyxXQUFXQSxDQUFFQyxxQkFBcUIsRUFBRUMsTUFBTSxFQUFHO0lBQzNDLEtBQUssQ0FBRUQscUJBQXFCLEVBQUVDLE1BQU8sQ0FBQztFQUN4QztBQUNGO0FBRUFKLGlCQUFpQixDQUFDSyxRQUFRLENBQUUsNkJBQTZCLEVBQUVKLDJCQUE0QixDQUFDO0FBQ3hGLGVBQWVBLDJCQUEyQiJ9