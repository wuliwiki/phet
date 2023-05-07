// Copyright 2021, University of Colorado Boulder

/**
 * Support gracefully getting a global object to itself. Returns null if the global doesn't exist.
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';

/**
 * If the path exists on the window global, return it, otherwise returns null
 * @param {string} path a path to global, such as 'phet.joist.sim'
 * @returns {*|null}
 */
const getGlobal = path => {
  assert && assert(typeof path === 'string', 'path must be a string');
  assert && assert(path.trim() === path, 'path must be trimmed');
  const global = _.get(window, path);
  return global !== undefined ? global : null;
};
phetCore.register('getGlobal', getGlobal);
export default getGlobal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwaGV0Q29yZSIsImdldEdsb2JhbCIsInBhdGgiLCJhc3NlcnQiLCJ0cmltIiwiZ2xvYmFsIiwiXyIsImdldCIsIndpbmRvdyIsInVuZGVmaW5lZCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiZ2V0R2xvYmFsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIxLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBTdXBwb3J0IGdyYWNlZnVsbHkgZ2V0dGluZyBhIGdsb2JhbCBvYmplY3QgdG8gaXRzZWxmLiBSZXR1cm5zIG51bGwgaWYgdGhlIGdsb2JhbCBkb2Vzbid0IGV4aXN0LlxyXG4gKiBAYXV0aG9yIFNhbSBSZWlkIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKiBAYXV0aG9yIE1pY2hhZWwgS2F1em1hbm4gKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqL1xyXG5cclxuaW1wb3J0IHBoZXRDb3JlIGZyb20gJy4vcGhldENvcmUuanMnO1xyXG5cclxuLyoqXHJcbiAqIElmIHRoZSBwYXRoIGV4aXN0cyBvbiB0aGUgd2luZG93IGdsb2JhbCwgcmV0dXJuIGl0LCBvdGhlcndpc2UgcmV0dXJucyBudWxsXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIGEgcGF0aCB0byBnbG9iYWwsIHN1Y2ggYXMgJ3BoZXQuam9pc3Quc2ltJ1xyXG4gKiBAcmV0dXJucyB7KnxudWxsfVxyXG4gKi9cclxuY29uc3QgZ2V0R2xvYmFsID0gcGF0aCA9PiB7XHJcbiAgYXNzZXJ0ICYmIGFzc2VydCggdHlwZW9mIHBhdGggPT09ICdzdHJpbmcnLCAncGF0aCBtdXN0IGJlIGEgc3RyaW5nJyApO1xyXG4gIGFzc2VydCAmJiBhc3NlcnQoIHBhdGgudHJpbSgpID09PSBwYXRoLCAncGF0aCBtdXN0IGJlIHRyaW1tZWQnICk7XHJcbiAgY29uc3QgZ2xvYmFsID0gXy5nZXQoIHdpbmRvdywgcGF0aCApO1xyXG4gIHJldHVybiBnbG9iYWwgIT09IHVuZGVmaW5lZCA/IGdsb2JhbCA6IG51bGw7XHJcbn07XHJcblxyXG5waGV0Q29yZS5yZWdpc3RlciggJ2dldEdsb2JhbCcsIGdldEdsb2JhbCApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2V0R2xvYmFsOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxRQUFRLE1BQU0sZUFBZTs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU1DLFNBQVMsR0FBR0MsSUFBSSxJQUFJO0VBQ3hCQyxNQUFNLElBQUlBLE1BQU0sQ0FBRSxPQUFPRCxJQUFJLEtBQUssUUFBUSxFQUFFLHVCQUF3QixDQUFDO0VBQ3JFQyxNQUFNLElBQUlBLE1BQU0sQ0FBRUQsSUFBSSxDQUFDRSxJQUFJLENBQUMsQ0FBQyxLQUFLRixJQUFJLEVBQUUsc0JBQXVCLENBQUM7RUFDaEUsTUFBTUcsTUFBTSxHQUFHQyxDQUFDLENBQUNDLEdBQUcsQ0FBRUMsTUFBTSxFQUFFTixJQUFLLENBQUM7RUFDcEMsT0FBT0csTUFBTSxLQUFLSSxTQUFTLEdBQUdKLE1BQU0sR0FBRyxJQUFJO0FBQzdDLENBQUM7QUFFREwsUUFBUSxDQUFDVSxRQUFRLENBQUUsV0FBVyxFQUFFVCxTQUFVLENBQUM7QUFFM0MsZUFBZUEsU0FBUyJ9