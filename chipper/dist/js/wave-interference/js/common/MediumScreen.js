// Copyright 2017-2022, University of Colorado Boulder

/**
 * Screen that just shown the specified medium.  Very similar to WavesScreen.  It creates model and view elements
 * for all scenes, but only shows for the specified scene.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { combineOptions } from '../../../phet-core/js/optionize.js';
import waveInterference from '../waveInterference.js';
import BaseScreen from './BaseScreen.js';
class MediumScreen extends BaseScreen {
  /**
   * @param alignGroup - for aligning the control panels on the right side of the lattice
   * @param [options]
   */
  constructor(alignGroup, options) {
    options = combineOptions({
      showSceneRadioButtons: false
    }, options);
    super(alignGroup, options);
  }
}
waveInterference.register('MediumScreen', MediumScreen);
export default MediumScreen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb21iaW5lT3B0aW9ucyIsIndhdmVJbnRlcmZlcmVuY2UiLCJCYXNlU2NyZWVuIiwiTWVkaXVtU2NyZWVuIiwiY29uc3RydWN0b3IiLCJhbGlnbkdyb3VwIiwib3B0aW9ucyIsInNob3dTY2VuZVJhZGlvQnV0dG9ucyIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiTWVkaXVtU2NyZWVuLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE3LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFNjcmVlbiB0aGF0IGp1c3Qgc2hvd24gdGhlIHNwZWNpZmllZCBtZWRpdW0uICBWZXJ5IHNpbWlsYXIgdG8gV2F2ZXNTY3JlZW4uICBJdCBjcmVhdGVzIG1vZGVsIGFuZCB2aWV3IGVsZW1lbnRzXHJcbiAqIGZvciBhbGwgc2NlbmVzLCBidXQgb25seSBzaG93cyBmb3IgdGhlIHNwZWNpZmllZCBzY2VuZS5cclxuICpcclxuICogQGF1dGhvciBTYW0gUmVpZCAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgeyBjb21iaW5lT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL3BoZXQtY29yZS9qcy9vcHRpb25pemUuanMnO1xyXG5pbXBvcnQgeyBBbGlnbkdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IHdhdmVJbnRlcmZlcmVuY2UgZnJvbSAnLi4vd2F2ZUludGVyZmVyZW5jZS5qcyc7XHJcbmltcG9ydCBCYXNlU2NyZWVuLCB7IEJhc2VTY3JlZW5PcHRpb25zIH0gZnJvbSAnLi9CYXNlU2NyZWVuLmpzJztcclxuXHJcbmNsYXNzIE1lZGl1bVNjcmVlbiBleHRlbmRzIEJhc2VTY3JlZW4ge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gYWxpZ25Hcm91cCAtIGZvciBhbGlnbmluZyB0aGUgY29udHJvbCBwYW5lbHMgb24gdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIGxhdHRpY2VcclxuICAgKiBAcGFyYW0gW29wdGlvbnNdXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBhbGlnbkdyb3VwOiBBbGlnbkdyb3VwLCBvcHRpb25zPzogQmFzZVNjcmVlbk9wdGlvbnMgKSB7XHJcbiAgICBvcHRpb25zID0gY29tYmluZU9wdGlvbnM8QmFzZVNjcmVlbk9wdGlvbnM+KCB7XHJcbiAgICAgIHNob3dTY2VuZVJhZGlvQnV0dG9uczogZmFsc2VcclxuICAgIH0sIG9wdGlvbnMgKTtcclxuICAgIHN1cGVyKCBhbGlnbkdyb3VwLCBvcHRpb25zICk7XHJcbiAgfVxyXG59XHJcblxyXG53YXZlSW50ZXJmZXJlbmNlLnJlZ2lzdGVyKCAnTWVkaXVtU2NyZWVuJywgTWVkaXVtU2NyZWVuICk7XHJcbmV4cG9ydCBkZWZhdWx0IE1lZGl1bVNjcmVlbjsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxjQUFjLFFBQVEsb0NBQW9DO0FBRW5FLE9BQU9DLGdCQUFnQixNQUFNLHdCQUF3QjtBQUNyRCxPQUFPQyxVQUFVLE1BQTZCLGlCQUFpQjtBQUUvRCxNQUFNQyxZQUFZLFNBQVNELFVBQVUsQ0FBQztFQUVwQztBQUNGO0FBQ0E7QUFDQTtFQUNTRSxXQUFXQSxDQUFFQyxVQUFzQixFQUFFQyxPQUEyQixFQUFHO0lBQ3hFQSxPQUFPLEdBQUdOLGNBQWMsQ0FBcUI7TUFDM0NPLHFCQUFxQixFQUFFO0lBQ3pCLENBQUMsRUFBRUQsT0FBUSxDQUFDO0lBQ1osS0FBSyxDQUFFRCxVQUFVLEVBQUVDLE9BQVEsQ0FBQztFQUM5QjtBQUNGO0FBRUFMLGdCQUFnQixDQUFDTyxRQUFRLENBQUUsY0FBYyxFQUFFTCxZQUFhLENBQUM7QUFDekQsZUFBZUEsWUFBWSJ9