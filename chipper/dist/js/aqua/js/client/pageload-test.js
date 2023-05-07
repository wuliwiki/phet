// Copyright 2020-2022, University of Colorado Boulder

/*
 * Runs arbitrary content in an iframe (that presumably loads pageload-connector.js) and reports if it successfully
 * loads and runs for a short amount of time without erroring
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

(() => {
  const options = QueryStringMachine.getAll({
    url: {
      type: 'string',
      defaultValue: ''
    },
    // If the page doesn't report back by this {number} of milliseconds, then report a failure.
    duration: {
      type: 'number',
      defaultValue: 30000
    }
  });
  const iframe = aqua.createFrame();
  iframe.src = options.url;
  setTimeout(() => {
    aqua.simpleFail(`Did not load in the time allowed: ${options.duration}ms`);
  }, options.duration);

  // handling messages from the page
  window.addEventListener('message', async evt => {
    if (typeof evt.data !== 'string') {
      return;
    }
    const data = JSON.parse(evt.data);

    // Sent by Joist due to the postMessage* query parameters
    if (data.type === 'pageload-load') {
      aqua.simplePass();
    } else if (data.type === 'pageload-error') {
      const transpiledStacktrace = await window.transpileStacktrace(data.stack);
      aqua.simpleFail(`${data.message}\n${transpiledStacktrace}`);
    }
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25zIiwiUXVlcnlTdHJpbmdNYWNoaW5lIiwiZ2V0QWxsIiwidXJsIiwidHlwZSIsImRlZmF1bHRWYWx1ZSIsImR1cmF0aW9uIiwiaWZyYW1lIiwiYXF1YSIsImNyZWF0ZUZyYW1lIiwic3JjIiwic2V0VGltZW91dCIsInNpbXBsZUZhaWwiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZ0IiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsInNpbXBsZVBhc3MiLCJ0cmFuc3BpbGVkU3RhY2t0cmFjZSIsInRyYW5zcGlsZVN0YWNrdHJhY2UiLCJzdGFjayIsIm1lc3NhZ2UiXSwic291cmNlcyI6WyJwYWdlbG9hZC10ZXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLypcclxuICogUnVucyBhcmJpdHJhcnkgY29udGVudCBpbiBhbiBpZnJhbWUgKHRoYXQgcHJlc3VtYWJseSBsb2FkcyBwYWdlbG9hZC1jb25uZWN0b3IuanMpIGFuZCByZXBvcnRzIGlmIGl0IHN1Y2Nlc3NmdWxseVxyXG4gKiBsb2FkcyBhbmQgcnVucyBmb3IgYSBzaG9ydCBhbW91bnQgb2YgdGltZSB3aXRob3V0IGVycm9yaW5nXHJcbiAqXHJcbiAqIEBhdXRob3IgSm9uYXRoYW4gT2xzb24gPGpvbmF0aGFuLm9sc29uQGNvbG9yYWRvLmVkdT5cclxuICovXHJcblxyXG5cclxuKCAoKSA9PiB7XHJcbiAgY29uc3Qgb3B0aW9ucyA9IFF1ZXJ5U3RyaW5nTWFjaGluZS5nZXRBbGwoIHtcclxuICAgIHVybDoge1xyXG4gICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgZGVmYXVsdFZhbHVlOiAnJ1xyXG4gICAgfSxcclxuICAgIC8vIElmIHRoZSBwYWdlIGRvZXNuJ3QgcmVwb3J0IGJhY2sgYnkgdGhpcyB7bnVtYmVyfSBvZiBtaWxsaXNlY29uZHMsIHRoZW4gcmVwb3J0IGEgZmFpbHVyZS5cclxuICAgIGR1cmF0aW9uOiB7XHJcbiAgICAgIHR5cGU6ICdudW1iZXInLFxyXG4gICAgICBkZWZhdWx0VmFsdWU6IDMwMDAwXHJcbiAgICB9XHJcbiAgfSApO1xyXG5cclxuICBjb25zdCBpZnJhbWUgPSBhcXVhLmNyZWF0ZUZyYW1lKCk7XHJcbiAgaWZyYW1lLnNyYyA9IG9wdGlvbnMudXJsO1xyXG5cclxuICBzZXRUaW1lb3V0KCAoKSA9PiB7XHJcbiAgICBhcXVhLnNpbXBsZUZhaWwoIGBEaWQgbm90IGxvYWQgaW4gdGhlIHRpbWUgYWxsb3dlZDogJHtvcHRpb25zLmR1cmF0aW9ufW1zYCApO1xyXG4gIH0sIG9wdGlvbnMuZHVyYXRpb24gKTtcclxuXHJcbiAgLy8gaGFuZGxpbmcgbWVzc2FnZXMgZnJvbSB0aGUgcGFnZVxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnbWVzc2FnZScsIGFzeW5jIGV2dCA9PiB7XHJcbiAgICBpZiAoIHR5cGVvZiBldnQuZGF0YSAhPT0gJ3N0cmluZycgKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZSggZXZ0LmRhdGEgKTtcclxuXHJcbiAgICAvLyBTZW50IGJ5IEpvaXN0IGR1ZSB0byB0aGUgcG9zdE1lc3NhZ2UqIHF1ZXJ5IHBhcmFtZXRlcnNcclxuICAgIGlmICggZGF0YS50eXBlID09PSAncGFnZWxvYWQtbG9hZCcgKSB7XHJcbiAgICAgIGFxdWEuc2ltcGxlUGFzcygpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoIGRhdGEudHlwZSA9PT0gJ3BhZ2Vsb2FkLWVycm9yJyApIHtcclxuICAgICAgY29uc3QgdHJhbnNwaWxlZFN0YWNrdHJhY2UgPSBhd2FpdCB3aW5kb3cudHJhbnNwaWxlU3RhY2t0cmFjZSggZGF0YS5zdGFjayApO1xyXG4gICAgICBhcXVhLnNpbXBsZUZhaWwoIGAke2RhdGEubWVzc2FnZX1cXG4ke3RyYW5zcGlsZWRTdGFja3RyYWNlfWAgKTtcclxuICAgIH1cclxuICB9ICk7XHJcbn0gKSgpO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQSxDQUFFLE1BQU07RUFDTixNQUFNQSxPQUFPLEdBQUdDLGtCQUFrQixDQUFDQyxNQUFNLENBQUU7SUFDekNDLEdBQUcsRUFBRTtNQUNIQyxJQUFJLEVBQUUsUUFBUTtNQUNkQyxZQUFZLEVBQUU7SUFDaEIsQ0FBQztJQUNEO0lBQ0FDLFFBQVEsRUFBRTtNQUNSRixJQUFJLEVBQUUsUUFBUTtNQUNkQyxZQUFZLEVBQUU7SUFDaEI7RUFDRixDQUFFLENBQUM7RUFFSCxNQUFNRSxNQUFNLEdBQUdDLElBQUksQ0FBQ0MsV0FBVyxDQUFDLENBQUM7RUFDakNGLE1BQU0sQ0FBQ0csR0FBRyxHQUFHVixPQUFPLENBQUNHLEdBQUc7RUFFeEJRLFVBQVUsQ0FBRSxNQUFNO0lBQ2hCSCxJQUFJLENBQUNJLFVBQVUsQ0FBRyxxQ0FBb0NaLE9BQU8sQ0FBQ00sUUFBUyxJQUFJLENBQUM7RUFDOUUsQ0FBQyxFQUFFTixPQUFPLENBQUNNLFFBQVMsQ0FBQzs7RUFFckI7RUFDQU8sTUFBTSxDQUFDQyxnQkFBZ0IsQ0FBRSxTQUFTLEVBQUUsTUFBTUMsR0FBRyxJQUFJO0lBQy9DLElBQUssT0FBT0EsR0FBRyxDQUFDQyxJQUFJLEtBQUssUUFBUSxFQUFHO01BQ2xDO0lBQ0Y7SUFFQSxNQUFNQSxJQUFJLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFFSCxHQUFHLENBQUNDLElBQUssQ0FBQzs7SUFFbkM7SUFDQSxJQUFLQSxJQUFJLENBQUNaLElBQUksS0FBSyxlQUFlLEVBQUc7TUFDbkNJLElBQUksQ0FBQ1csVUFBVSxDQUFDLENBQUM7SUFDbkIsQ0FBQyxNQUNJLElBQUtILElBQUksQ0FBQ1osSUFBSSxLQUFLLGdCQUFnQixFQUFHO01BQ3pDLE1BQU1nQixvQkFBb0IsR0FBRyxNQUFNUCxNQUFNLENBQUNRLG1CQUFtQixDQUFFTCxJQUFJLENBQUNNLEtBQU0sQ0FBQztNQUMzRWQsSUFBSSxDQUFDSSxVQUFVLENBQUcsR0FBRUksSUFBSSxDQUFDTyxPQUFRLEtBQUlILG9CQUFxQixFQUFFLENBQUM7SUFDL0Q7RUFDRixDQUFFLENBQUM7QUFDTCxDQUFDLEVBQUcsQ0FBQyJ9