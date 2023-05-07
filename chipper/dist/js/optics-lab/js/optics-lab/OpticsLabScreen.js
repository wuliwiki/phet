// Copyright 2014-2020, University of Colorado Boulder

/**
 * The 'Optics Lab' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Michael Dubson (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import opticsLab from '../opticsLab.js';
import OpticsLabModel from './model/OpticsLabModel.js';
import OpticsLabScreenView from './view/OpticsLabScreenView.js';
class OpticsLabScreen extends Screen {
  constructor() {
    super(() => new OpticsLabModel(), model => new OpticsLabScreenView(model), {
      backgroundColorProperty: new Property('#0000CC')
    });
  }
}
opticsLab.register('OpticsLabScreen', OpticsLabScreen);
export default OpticsLabScreen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQcm9wZXJ0eSIsIlNjcmVlbiIsIm9wdGljc0xhYiIsIk9wdGljc0xhYk1vZGVsIiwiT3B0aWNzTGFiU2NyZWVuVmlldyIsIk9wdGljc0xhYlNjcmVlbiIsImNvbnN0cnVjdG9yIiwibW9kZWwiLCJiYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiT3B0aWNzTGFiU2NyZWVuLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE0LTIwMjAsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFRoZSAnT3B0aWNzIExhYicgc2NyZWVuLiBDb25mb3JtcyB0byB0aGUgY29udHJhY3Qgc3BlY2lmaWVkIGluIGpvaXN0L1NjcmVlbi5cclxuICpcclxuICogQGF1dGhvciBNaWNoYWVsIER1YnNvbiAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vYXhvbi9qcy9Qcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBTY3JlZW4gZnJvbSAnLi4vLi4vLi4vam9pc3QvanMvU2NyZWVuLmpzJztcclxuaW1wb3J0IG9wdGljc0xhYiBmcm9tICcuLi9vcHRpY3NMYWIuanMnO1xyXG5pbXBvcnQgT3B0aWNzTGFiTW9kZWwgZnJvbSAnLi9tb2RlbC9PcHRpY3NMYWJNb2RlbC5qcyc7XHJcbmltcG9ydCBPcHRpY3NMYWJTY3JlZW5WaWV3IGZyb20gJy4vdmlldy9PcHRpY3NMYWJTY3JlZW5WaWV3LmpzJztcclxuXHJcbmNsYXNzIE9wdGljc0xhYlNjcmVlbiBleHRlbmRzIFNjcmVlbiB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoXHJcbiAgICAgICgpID0+IG5ldyBPcHRpY3NMYWJNb2RlbCgpLFxyXG4gICAgICBtb2RlbCA9PiBuZXcgT3B0aWNzTGFiU2NyZWVuVmlldyggbW9kZWwgKSxcclxuICAgICAgeyBiYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eTogbmV3IFByb3BlcnR5KCAnIzAwMDBDQycgKSB9XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxub3B0aWNzTGFiLnJlZ2lzdGVyKCAnT3B0aWNzTGFiU2NyZWVuJywgT3B0aWNzTGFiU2NyZWVuICk7XHJcbmV4cG9ydCBkZWZhdWx0IE9wdGljc0xhYlNjcmVlbjsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsUUFBUSxNQUFNLDhCQUE4QjtBQUNuRCxPQUFPQyxNQUFNLE1BQU0sNkJBQTZCO0FBQ2hELE9BQU9DLFNBQVMsTUFBTSxpQkFBaUI7QUFDdkMsT0FBT0MsY0FBYyxNQUFNLDJCQUEyQjtBQUN0RCxPQUFPQyxtQkFBbUIsTUFBTSwrQkFBK0I7QUFFL0QsTUFBTUMsZUFBZSxTQUFTSixNQUFNLENBQUM7RUFFbkNLLFdBQVdBLENBQUEsRUFBRztJQUNaLEtBQUssQ0FDSCxNQUFNLElBQUlILGNBQWMsQ0FBQyxDQUFDLEVBQzFCSSxLQUFLLElBQUksSUFBSUgsbUJBQW1CLENBQUVHLEtBQU0sQ0FBQyxFQUN6QztNQUFFQyx1QkFBdUIsRUFBRSxJQUFJUixRQUFRLENBQUUsU0FBVTtJQUFFLENBQ3ZELENBQUM7RUFDSDtBQUNGO0FBRUFFLFNBQVMsQ0FBQ08sUUFBUSxDQUFFLGlCQUFpQixFQUFFSixlQUFnQixDQUFDO0FBQ3hELGVBQWVBLGVBQWUifQ==