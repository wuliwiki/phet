// Copyright 2021, University of Colorado Boulder

/**
 * Support gracefully binding a global function to itself. Returns null if the global doesn't exist.
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';

/**
 * If the path exists on the window global, return it as a bound function, otherwise returns null
 * @param {string} path a path to a method, dot-separated, including the method, such as 'phet.joist.sim.showPopup'
 * @returns {function|null}
 */
const gracefulBind = path => {
  assert && assert(typeof path === 'string', 'path must be a string');
  assert && assert(path.split('.').length > 1, 'path must have multiple parts');
  assert && assert(path.trim() === path, 'path must be trimmed');
  const terms = path.split('.');
  const method = terms.pop(); // mutates terms to become the method container
  const object = _.get(window, terms);
  return object ? object[method].bind(object) : null;
};
phetCore.register('gracefulBind', gracefulBind);
export default gracefulBind;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwaGV0Q29yZSIsImdyYWNlZnVsQmluZCIsInBhdGgiLCJhc3NlcnQiLCJzcGxpdCIsImxlbmd0aCIsInRyaW0iLCJ0ZXJtcyIsIm1ldGhvZCIsInBvcCIsIm9iamVjdCIsIl8iLCJnZXQiLCJ3aW5kb3ciLCJiaW5kIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJncmFjZWZ1bEJpbmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjEsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFN1cHBvcnQgZ3JhY2VmdWxseSBiaW5kaW5nIGEgZ2xvYmFsIGZ1bmN0aW9uIHRvIGl0c2VsZi4gUmV0dXJucyBudWxsIGlmIHRoZSBnbG9iYWwgZG9lc24ndCBleGlzdC5cclxuICogQGF1dGhvciBTYW0gUmVpZCAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICogQGF1dGhvciBNaWNoYWVsIEthdXptYW5uIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBwaGV0Q29yZSBmcm9tICcuL3BoZXRDb3JlLmpzJztcclxuXHJcbi8qKlxyXG4gKiBJZiB0aGUgcGF0aCBleGlzdHMgb24gdGhlIHdpbmRvdyBnbG9iYWwsIHJldHVybiBpdCBhcyBhIGJvdW5kIGZ1bmN0aW9uLCBvdGhlcndpc2UgcmV0dXJucyBudWxsXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIGEgcGF0aCB0byBhIG1ldGhvZCwgZG90LXNlcGFyYXRlZCwgaW5jbHVkaW5nIHRoZSBtZXRob2QsIHN1Y2ggYXMgJ3BoZXQuam9pc3Quc2ltLnNob3dQb3B1cCdcclxuICogQHJldHVybnMge2Z1bmN0aW9ufG51bGx9XHJcbiAqL1xyXG5jb25zdCBncmFjZWZ1bEJpbmQgPSBwYXRoID0+IHtcclxuICBhc3NlcnQgJiYgYXNzZXJ0KCB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycsICdwYXRoIG11c3QgYmUgYSBzdHJpbmcnICk7XHJcbiAgYXNzZXJ0ICYmIGFzc2VydCggcGF0aC5zcGxpdCggJy4nICkubGVuZ3RoID4gMSwgJ3BhdGggbXVzdCBoYXZlIG11bHRpcGxlIHBhcnRzJyApO1xyXG4gIGFzc2VydCAmJiBhc3NlcnQoIHBhdGgudHJpbSgpID09PSBwYXRoLCAncGF0aCBtdXN0IGJlIHRyaW1tZWQnICk7XHJcbiAgY29uc3QgdGVybXMgPSBwYXRoLnNwbGl0KCAnLicgKTtcclxuICBjb25zdCBtZXRob2QgPSB0ZXJtcy5wb3AoKTsgLy8gbXV0YXRlcyB0ZXJtcyB0byBiZWNvbWUgdGhlIG1ldGhvZCBjb250YWluZXJcclxuICBjb25zdCBvYmplY3QgPSBfLmdldCggd2luZG93LCB0ZXJtcyApO1xyXG4gIHJldHVybiBvYmplY3QgPyBvYmplY3RbIG1ldGhvZCBdLmJpbmQoIG9iamVjdCApIDogbnVsbDtcclxufTtcclxuXHJcbnBoZXRDb3JlLnJlZ2lzdGVyKCAnZ3JhY2VmdWxCaW5kJywgZ3JhY2VmdWxCaW5kICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBncmFjZWZ1bEJpbmQ7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFFBQVEsTUFBTSxlQUFlOztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTUMsWUFBWSxHQUFHQyxJQUFJLElBQUk7RUFDM0JDLE1BQU0sSUFBSUEsTUFBTSxDQUFFLE9BQU9ELElBQUksS0FBSyxRQUFRLEVBQUUsdUJBQXdCLENBQUM7RUFDckVDLE1BQU0sSUFBSUEsTUFBTSxDQUFFRCxJQUFJLENBQUNFLEtBQUssQ0FBRSxHQUFJLENBQUMsQ0FBQ0MsTUFBTSxHQUFHLENBQUMsRUFBRSwrQkFBZ0MsQ0FBQztFQUNqRkYsTUFBTSxJQUFJQSxNQUFNLENBQUVELElBQUksQ0FBQ0ksSUFBSSxDQUFDLENBQUMsS0FBS0osSUFBSSxFQUFFLHNCQUF1QixDQUFDO0VBQ2hFLE1BQU1LLEtBQUssR0FBR0wsSUFBSSxDQUFDRSxLQUFLLENBQUUsR0FBSSxDQUFDO0VBQy9CLE1BQU1JLE1BQU0sR0FBR0QsS0FBSyxDQUFDRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDNUIsTUFBTUMsTUFBTSxHQUFHQyxDQUFDLENBQUNDLEdBQUcsQ0FBRUMsTUFBTSxFQUFFTixLQUFNLENBQUM7RUFDckMsT0FBT0csTUFBTSxHQUFHQSxNQUFNLENBQUVGLE1BQU0sQ0FBRSxDQUFDTSxJQUFJLENBQUVKLE1BQU8sQ0FBQyxHQUFHLElBQUk7QUFDeEQsQ0FBQztBQUVEVixRQUFRLENBQUNlLFFBQVEsQ0FBRSxjQUFjLEVBQUVkLFlBQWEsQ0FBQztBQUVqRCxlQUFlQSxZQUFZIn0=