// Copyright 2013-2021, University of Colorado Boulder

/**
 * Feature detection
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import detectPrefix from '../../../phet-core/js/detectPrefix.js';
import { scenery } from '../imports.js';
const Features = {};
scenery.register('Features', Features);
function supportsDataURLFormatOutput(format) {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const context = canvas.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(0, 0, 1, 1);
    const url = canvas.toDataURL([format]);
    const target = `data:${format}`;
    // var pngFallback = 'data:image/png';

    return url.slice(0, target.length) === target;
  } catch (e) {
    return false;
  }
}
function supportsDataURLFormatOrigin(name, black1x1Url) {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext('2d');
  const img = document.createElement('img');
  img.crossOrigin = 'Anonymous'; // maybe setting the CORS attribute will help?

  const loadCall = () => {
    try {
      context.drawImage(img, 0, 0);
      canvas.toDataURL();
      Features[name] = true;
    } catch (e) {
      Features[name] = false;
    }
  };
  img.onload = loadCall;
  try {
    img.src = black1x1Url;
    if (img.complete) {
      loadCall();
    }
  } catch (e) {
    Features[name] = false;
  }
}
Features.canvasPNGOutput = supportsDataURLFormatOutput('image/png');
Features.canvasJPEGOutput = supportsDataURLFormatOutput('image/jpeg');
Features.canvasGIFOutput = supportsDataURLFormatOutput('image/gif');
Features.canvasICONOutput = supportsDataURLFormatOutput('image/x-icon');

// 1x1 black output from Chrome Canvas in PNG
supportsDataURLFormatOrigin('canvasPNGInput', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABCQEBtxmN7wAAAABJRU5ErkJggg==');

// 1x1 black output from Chrome Canvas in JPEG
supportsDataURLFormatOrigin('canvasJPEGInput', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD8qqKKKAP/2Q==');

/*
 * This is from the following SVG:
 *
 * <?xml version="1.0"?>
 * <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewport="0 0 1 1" width="1" height="1" >
 *   <rect x="0" y="0" width="1" height="1" rx="0" ry="0" style="fill: black; stroke: none;"></rect>
 * </svg>
 */
supportsDataURLFormatOrigin('canvasSVGInput', 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+DQo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3cG9ydD0iMCAwIDEgMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgPg0KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiByeD0iMCIgcnk9IjAiIHN0eWxlPSJmaWxsOiBibGFjazsgc3Ryb2tlOiBub25lOyI+PC9yZWN0Pg0KPC9zdmc+DQo=');

// 1x1 black output from Photoshop in GIF
supportsDataURLFormatOrigin('canvasGIFInput', 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICRAEAOw==');

// canvas prefixed names
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
Features.toDataURLHD = detectPrefix(canvas, 'toDataURLHD');
Features.createImageDataHD = detectPrefix(ctx, 'createImageDataHD');
Features.getImageDataHD = detectPrefix(ctx, 'getImageDataHD');
Features.putImageDataHD = detectPrefix(ctx, 'putImageDataHD');
Features.currentTransform = detectPrefix(ctx, 'currentTransform');
Features.canvasFilter = detectPrefix(ctx, 'filter');
const span = document.createElement('span');
const div = document.createElement('div');
Features.textStroke = detectPrefix(span.style, 'textStroke');
Features.textStrokeColor = detectPrefix(span.style, 'textStrokeColor');
Features.textStrokeWidth = detectPrefix(span.style, 'textStrokeWidth');
Features.transform = detectPrefix(div.style, 'transform');
Features.transformOrigin = detectPrefix(div.style, 'transformOrigin');
Features.backfaceVisibility = detectPrefix(div.style, 'backfaceVisibility');
Features.borderRadius = detectPrefix(div.style, 'borderRadius');
Features.userSelect = detectPrefix(div.style, 'userSelect');
Features.touchAction = detectPrefix(div.style, 'touchAction');
Features.touchCallout = detectPrefix(div.style, 'touchCallout');
Features.userDrag = detectPrefix(div.style, 'userDrag');
Features.tapHighlightColor = detectPrefix(div.style, 'tapHighlightColor');
Features.fontSmoothing = detectPrefix(div.style, 'fontSmoothing');
Features.requestAnimationFrame = detectPrefix(window, 'requestAnimationFrame');
Features.cancelAnimationFrame = detectPrefix(window, 'cancelAnimationFrame');

// e.g. Features.setStyle( domElement, Features.transform, '...' ), and doesn't set it if no 'transform' attribute (prefixed or no) is found
Features.setStyle = (domElement, optionalKey, value) => {
  if (optionalKey !== undefined) {
    domElement.style[optionalKey] = value;
  }
};

// Whether passive is a supported option for adding event listeners,
// see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
Features.passive = false;
window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
  get: () => {
    // eslint-disable-line getter-return
    Features.passive = true;
  }
}));
export default Features;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkZXRlY3RQcmVmaXgiLCJzY2VuZXJ5IiwiRmVhdHVyZXMiLCJyZWdpc3RlciIsInN1cHBvcnRzRGF0YVVSTEZvcm1hdE91dHB1dCIsImZvcm1hdCIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIndpZHRoIiwiaGVpZ2h0IiwiY29udGV4dCIsImdldENvbnRleHQiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsInVybCIsInRvRGF0YVVSTCIsInRhcmdldCIsInNsaWNlIiwibGVuZ3RoIiwiZSIsInN1cHBvcnRzRGF0YVVSTEZvcm1hdE9yaWdpbiIsIm5hbWUiLCJibGFjazF4MVVybCIsImltZyIsImNyb3NzT3JpZ2luIiwibG9hZENhbGwiLCJkcmF3SW1hZ2UiLCJvbmxvYWQiLCJzcmMiLCJjb21wbGV0ZSIsImNhbnZhc1BOR091dHB1dCIsImNhbnZhc0pQRUdPdXRwdXQiLCJjYW52YXNHSUZPdXRwdXQiLCJjYW52YXNJQ09OT3V0cHV0IiwiY3R4IiwidG9EYXRhVVJMSEQiLCJjcmVhdGVJbWFnZURhdGFIRCIsImdldEltYWdlRGF0YUhEIiwicHV0SW1hZ2VEYXRhSEQiLCJjdXJyZW50VHJhbnNmb3JtIiwiY2FudmFzRmlsdGVyIiwic3BhbiIsImRpdiIsInRleHRTdHJva2UiLCJzdHlsZSIsInRleHRTdHJva2VDb2xvciIsInRleHRTdHJva2VXaWR0aCIsInRyYW5zZm9ybSIsInRyYW5zZm9ybU9yaWdpbiIsImJhY2tmYWNlVmlzaWJpbGl0eSIsImJvcmRlclJhZGl1cyIsInVzZXJTZWxlY3QiLCJ0b3VjaEFjdGlvbiIsInRvdWNoQ2FsbG91dCIsInVzZXJEcmFnIiwidGFwSGlnaGxpZ2h0Q29sb3IiLCJmb250U21vb3RoaW5nIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2luZG93IiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJzZXRTdHlsZSIsImRvbUVsZW1lbnQiLCJvcHRpb25hbEtleSIsInZhbHVlIiwidW5kZWZpbmVkIiwicGFzc2l2ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCJdLCJzb3VyY2VzIjpbIkZlYXR1cmVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDEzLTIwMjEsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIEZlYXR1cmUgZGV0ZWN0aW9uXHJcbiAqXHJcbiAqIEBhdXRob3IgSm9uYXRoYW4gT2xzb24gPGpvbmF0aGFuLm9sc29uQGNvbG9yYWRvLmVkdT5cclxuICovXHJcblxyXG5pbXBvcnQgZGV0ZWN0UHJlZml4IGZyb20gJy4uLy4uLy4uL3BoZXQtY29yZS9qcy9kZXRlY3RQcmVmaXguanMnO1xyXG5pbXBvcnQgeyBzY2VuZXJ5IH0gZnJvbSAnLi4vaW1wb3J0cy5qcyc7XHJcblxyXG5jb25zdCBGZWF0dXJlcyA9IHt9O1xyXG5zY2VuZXJ5LnJlZ2lzdGVyKCAnRmVhdHVyZXMnLCBGZWF0dXJlcyApO1xyXG5cclxuZnVuY3Rpb24gc3VwcG9ydHNEYXRhVVJMRm9ybWF0T3V0cHV0KCBmb3JtYXQgKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XHJcbiAgICBjYW52YXMud2lkdGggPSAxO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IDE7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoICcyZCcgKTtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ2JsYWNrJztcclxuICAgIGNvbnRleHQuZmlsbFJlY3QoIDAsIDAsIDEsIDEgKTtcclxuICAgIGNvbnN0IHVybCA9IGNhbnZhcy50b0RhdGFVUkwoIFsgZm9ybWF0IF0gKTtcclxuXHJcbiAgICBjb25zdCB0YXJnZXQgPSBgZGF0YToke2Zvcm1hdH1gO1xyXG4gICAgLy8gdmFyIHBuZ0ZhbGxiYWNrID0gJ2RhdGE6aW1hZ2UvcG5nJztcclxuXHJcbiAgICByZXR1cm4gdXJsLnNsaWNlKCAwLCB0YXJnZXQubGVuZ3RoICkgPT09IHRhcmdldDtcclxuICB9XHJcbiAgY2F0Y2goIGUgKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzdXBwb3J0c0RhdGFVUkxGb3JtYXRPcmlnaW4oIG5hbWUsIGJsYWNrMXgxVXJsICkge1xyXG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XHJcbiAgY2FudmFzLndpZHRoID0gMTtcclxuICBjYW52YXMuaGVpZ2h0ID0gMTtcclxuICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoICcyZCcgKTtcclxuXHJcbiAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2ltZycgKTtcclxuICBpbWcuY3Jvc3NPcmlnaW4gPSAnQW5vbnltb3VzJzsgLy8gbWF5YmUgc2V0dGluZyB0aGUgQ09SUyBhdHRyaWJ1dGUgd2lsbCBoZWxwP1xyXG5cclxuICBjb25zdCBsb2FkQ2FsbCA9ICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKCBpbWcsIDAsIDAgKTtcclxuICAgICAgY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgICBGZWF0dXJlc1sgbmFtZSBdID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGNhdGNoKCBlICkge1xyXG4gICAgICBGZWF0dXJlc1sgbmFtZSBdID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfTtcclxuICBpbWcub25sb2FkID0gbG9hZENhbGw7XHJcbiAgdHJ5IHtcclxuICAgIGltZy5zcmMgPSBibGFjazF4MVVybDtcclxuICAgIGlmICggaW1nLmNvbXBsZXRlICkge1xyXG4gICAgICBsb2FkQ2FsbCgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBjYXRjaCggZSApIHtcclxuICAgIEZlYXR1cmVzWyBuYW1lIF0gPSBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbkZlYXR1cmVzLmNhbnZhc1BOR091dHB1dCA9IHN1cHBvcnRzRGF0YVVSTEZvcm1hdE91dHB1dCggJ2ltYWdlL3BuZycgKTtcclxuRmVhdHVyZXMuY2FudmFzSlBFR091dHB1dCA9IHN1cHBvcnRzRGF0YVVSTEZvcm1hdE91dHB1dCggJ2ltYWdlL2pwZWcnICk7XHJcbkZlYXR1cmVzLmNhbnZhc0dJRk91dHB1dCA9IHN1cHBvcnRzRGF0YVVSTEZvcm1hdE91dHB1dCggJ2ltYWdlL2dpZicgKTtcclxuRmVhdHVyZXMuY2FudmFzSUNPTk91dHB1dCA9IHN1cHBvcnRzRGF0YVVSTEZvcm1hdE91dHB1dCggJ2ltYWdlL3gtaWNvbicgKTtcclxuXHJcbi8vIDF4MSBibGFjayBvdXRwdXQgZnJvbSBDaHJvbWUgQ2FudmFzIGluIFBOR1xyXG5zdXBwb3J0c0RhdGFVUkxGb3JtYXRPcmlnaW4oICdjYW52YXNQTkdJbnB1dCcsICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUJDQVlBQUFBZkZjU0pBQUFBRFVsRVFWUUlXMk5rWUdENER3QUJDUUVCdHhtTjd3QUFBQUJKUlU1RXJrSmdnZz09JyApO1xyXG5cclxuLy8gMXgxIGJsYWNrIG91dHB1dCBmcm9tIENocm9tZSBDYW52YXMgaW4gSlBFR1xyXG5zdXBwb3J0c0RhdGFVUkxGb3JtYXRPcmlnaW4oICdjYW52YXNKUEVHSW5wdXQnLCAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwvOWovNEFBUVNrWkpSZ0FCQVFBQUFRQUJBQUQvMndCREFBTUNBZ0lDQWdNQ0FnSURBd01EQkFZRUJBUUVCQWdHQmdVR0NRZ0tDZ2tJQ1FrS0RBOE1DZ3NPQ3drSkRSRU5EZzhRRUJFUUNnd1NFeElRRXc4UUVCRC8yd0JEQVFNREF3UURCQWdFQkFnUUN3a0xFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJEL3dBQVJDQUFCQUFFREFTSUFBaEVCQXhFQi84UUFId0FBQVFVQkFRRUJBUUVBQUFBQUFBQUFBQUVDQXdRRkJnY0lDUW9MLzhRQXRSQUFBZ0VEQXdJRUF3VUZCQVFBQUFGOUFRSURBQVFSQlJJaE1VRUdFMUZoQnlKeEZES0JrYUVJSTBLeHdSVlMwZkFrTTJKeWdna0tGaGNZR1JvbEppY29LU28wTlRZM09EazZRMFJGUmtkSVNVcFRWRlZXVjFoWldtTmtaV1puYUdscWMzUjFkbmQ0ZVhxRGhJV0doNGlKaXBLVGxKV1dsNWlabXFLanBLV21wNmlwcXJLenRMVzJ0N2k1dXNMRHhNWEd4OGpKeXRMVDFOWFcxOWpaMnVIaTQrVGw1dWZvNmVyeDh2UDA5ZmIzK1BuNi84UUFId0VBQXdFQkFRRUJBUUVCQVFBQUFBQUFBQUVDQXdRRkJnY0lDUW9MLzhRQXRSRUFBZ0VDQkFRREJBY0ZCQVFBQVFKM0FBRUNBeEVFQlNFeEJoSkJVUWRoY1JNaU1vRUlGRUtSb2JIQkNTTXpVdkFWWW5MUkNoWWtOT0VsOFJjWUdSb21KeWdwS2pVMk56ZzVPa05FUlVaSFNFbEtVMVJWVmxkWVdWcGpaR1ZtWjJocGFuTjBkWFozZUhsNmdvT0VoWWFIaUltS2twT1VsWmFYbUptYW9xT2twYWFucUttcXNyTzB0YmEzdUxtNndzUEV4Y2JIeU1uSzB0UFUxZGJYMk5uYTR1UGs1ZWJuNk9ucTh2UDA5ZmIzK1BuNi85b0FEQU1CQUFJUkF4RUFQd0Q4cXFLS0tBUC8yUT09JyApO1xyXG5cclxuLypcclxuICogVGhpcyBpcyBmcm9tIHRoZSBmb2xsb3dpbmcgU1ZHOlxyXG4gKlxyXG4gKiA8P3htbCB2ZXJzaW9uPVwiMS4wXCI/PlxyXG4gKiA8c3ZnIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld3BvcnQ9XCIwIDAgMSAxXCIgd2lkdGg9XCIxXCIgaGVpZ2h0PVwiMVwiID5cclxuICogICA8cmVjdCB4PVwiMFwiIHk9XCIwXCIgd2lkdGg9XCIxXCIgaGVpZ2h0PVwiMVwiIHJ4PVwiMFwiIHJ5PVwiMFwiIHN0eWxlPVwiZmlsbDogYmxhY2s7IHN0cm9rZTogbm9uZTtcIj48L3JlY3Q+XHJcbiAqIDwvc3ZnPlxyXG4gKi9cclxuc3VwcG9ydHNEYXRhVVJMRm9ybWF0T3JpZ2luKCAnY2FudmFzU1ZHSW5wdXQnLCAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJajgrRFFvOGMzWm5JSFpsY25OcGIyNDlJakV1TVNJZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCMmFXVjNjRzl5ZEQwaU1DQXdJREVnTVNJZ2QybGtkR2c5SWpFaUlHaGxhV2RvZEQwaU1TSWdQZzBLSUNBOGNtVmpkQ0I0UFNJd0lpQjVQU0l3SWlCM2FXUjBhRDBpTVNJZ2FHVnBaMmgwUFNJeElpQnllRDBpTUNJZ2NuazlJakFpSUhOMGVXeGxQU0ptYVd4c09pQmliR0ZqYXpzZ2MzUnliMnRsT2lCdWIyNWxPeUkrUEM5eVpXTjBQZzBLUEM5emRtYytEUW89JyApO1xyXG5cclxuLy8gMXgxIGJsYWNrIG91dHB1dCBmcm9tIFBob3Rvc2hvcCBpbiBHSUZcclxuc3VwcG9ydHNEYXRhVVJMRm9ybWF0T3JpZ2luKCAnY2FudmFzR0lGSW5wdXQnLCAnZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFKRUFBQUFBQVAvLy8vLy8vd0FBQUNINUJBRUFBQUlBTEFBQUFBQUJBQUVBQUFJQ1JBRUFPdz09JyApO1xyXG5cclxuLy8gY2FudmFzIHByZWZpeGVkIG5hbWVzXHJcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XHJcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XHJcbkZlYXR1cmVzLnRvRGF0YVVSTEhEID0gZGV0ZWN0UHJlZml4KCBjYW52YXMsICd0b0RhdGFVUkxIRCcgKTtcclxuRmVhdHVyZXMuY3JlYXRlSW1hZ2VEYXRhSEQgPSBkZXRlY3RQcmVmaXgoIGN0eCwgJ2NyZWF0ZUltYWdlRGF0YUhEJyApO1xyXG5GZWF0dXJlcy5nZXRJbWFnZURhdGFIRCA9IGRldGVjdFByZWZpeCggY3R4LCAnZ2V0SW1hZ2VEYXRhSEQnICk7XHJcbkZlYXR1cmVzLnB1dEltYWdlRGF0YUhEID0gZGV0ZWN0UHJlZml4KCBjdHgsICdwdXRJbWFnZURhdGFIRCcgKTtcclxuRmVhdHVyZXMuY3VycmVudFRyYW5zZm9ybSA9IGRldGVjdFByZWZpeCggY3R4LCAnY3VycmVudFRyYW5zZm9ybScgKTtcclxuRmVhdHVyZXMuY2FudmFzRmlsdGVyID0gZGV0ZWN0UHJlZml4KCBjdHgsICdmaWx0ZXInICk7XHJcblxyXG5jb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3NwYW4nICk7XHJcbmNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XHJcbkZlYXR1cmVzLnRleHRTdHJva2UgPSBkZXRlY3RQcmVmaXgoIHNwYW4uc3R5bGUsICd0ZXh0U3Ryb2tlJyApO1xyXG5GZWF0dXJlcy50ZXh0U3Ryb2tlQ29sb3IgPSBkZXRlY3RQcmVmaXgoIHNwYW4uc3R5bGUsICd0ZXh0U3Ryb2tlQ29sb3InICk7XHJcbkZlYXR1cmVzLnRleHRTdHJva2VXaWR0aCA9IGRldGVjdFByZWZpeCggc3Bhbi5zdHlsZSwgJ3RleHRTdHJva2VXaWR0aCcgKTtcclxuXHJcbkZlYXR1cmVzLnRyYW5zZm9ybSA9IGRldGVjdFByZWZpeCggZGl2LnN0eWxlLCAndHJhbnNmb3JtJyApO1xyXG5GZWF0dXJlcy50cmFuc2Zvcm1PcmlnaW4gPSBkZXRlY3RQcmVmaXgoIGRpdi5zdHlsZSwgJ3RyYW5zZm9ybU9yaWdpbicgKTtcclxuRmVhdHVyZXMuYmFja2ZhY2VWaXNpYmlsaXR5ID0gZGV0ZWN0UHJlZml4KCBkaXYuc3R5bGUsICdiYWNrZmFjZVZpc2liaWxpdHknICk7XHJcbkZlYXR1cmVzLmJvcmRlclJhZGl1cyA9IGRldGVjdFByZWZpeCggZGl2LnN0eWxlLCAnYm9yZGVyUmFkaXVzJyApO1xyXG5cclxuRmVhdHVyZXMudXNlclNlbGVjdCA9IGRldGVjdFByZWZpeCggZGl2LnN0eWxlLCAndXNlclNlbGVjdCcgKTtcclxuRmVhdHVyZXMudG91Y2hBY3Rpb24gPSBkZXRlY3RQcmVmaXgoIGRpdi5zdHlsZSwgJ3RvdWNoQWN0aW9uJyApO1xyXG5GZWF0dXJlcy50b3VjaENhbGxvdXQgPSBkZXRlY3RQcmVmaXgoIGRpdi5zdHlsZSwgJ3RvdWNoQ2FsbG91dCcgKTtcclxuRmVhdHVyZXMudXNlckRyYWcgPSBkZXRlY3RQcmVmaXgoIGRpdi5zdHlsZSwgJ3VzZXJEcmFnJyApO1xyXG5GZWF0dXJlcy50YXBIaWdobGlnaHRDb2xvciA9IGRldGVjdFByZWZpeCggZGl2LnN0eWxlLCAndGFwSGlnaGxpZ2h0Q29sb3InICk7XHJcblxyXG5GZWF0dXJlcy5mb250U21vb3RoaW5nID0gZGV0ZWN0UHJlZml4KCBkaXYuc3R5bGUsICdmb250U21vb3RoaW5nJyApO1xyXG5cclxuRmVhdHVyZXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZGV0ZWN0UHJlZml4KCB3aW5kb3csICdyZXF1ZXN0QW5pbWF0aW9uRnJhbWUnICk7XHJcbkZlYXR1cmVzLmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZGV0ZWN0UHJlZml4KCB3aW5kb3csICdjYW5jZWxBbmltYXRpb25GcmFtZScgKTtcclxuXHJcblxyXG4vLyBlLmcuIEZlYXR1cmVzLnNldFN0eWxlKCBkb21FbGVtZW50LCBGZWF0dXJlcy50cmFuc2Zvcm0sICcuLi4nICksIGFuZCBkb2Vzbid0IHNldCBpdCBpZiBubyAndHJhbnNmb3JtJyBhdHRyaWJ1dGUgKHByZWZpeGVkIG9yIG5vKSBpcyBmb3VuZFxyXG5GZWF0dXJlcy5zZXRTdHlsZSA9ICggZG9tRWxlbWVudCwgb3B0aW9uYWxLZXksIHZhbHVlICkgPT4ge1xyXG4gIGlmICggb3B0aW9uYWxLZXkgIT09IHVuZGVmaW5lZCApIHtcclxuICAgIGRvbUVsZW1lbnQuc3R5bGVbIG9wdGlvbmFsS2V5IF0gPSB2YWx1ZTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBXaGV0aGVyIHBhc3NpdmUgaXMgYSBzdXBwb3J0ZWQgb3B0aW9uIGZvciBhZGRpbmcgZXZlbnQgbGlzdGVuZXJzLFxyXG4vLyBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0V2ZW50VGFyZ2V0L2FkZEV2ZW50TGlzdGVuZXIjSW1wcm92aW5nX3Njcm9sbGluZ19wZXJmb3JtYW5jZV93aXRoX3Bhc3NpdmVfbGlzdGVuZXJzXHJcbkZlYXR1cmVzLnBhc3NpdmUgPSBmYWxzZTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICd0ZXN0JywgbnVsbCwgT2JqZWN0LmRlZmluZVByb3BlcnR5KCB7fSwgJ3Bhc3NpdmUnLCB7XHJcbiAgZ2V0OiAoKSA9PiB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZ2V0dGVyLXJldHVyblxyXG4gICAgRmVhdHVyZXMucGFzc2l2ZSA9IHRydWU7XHJcbiAgfVxyXG59ICkgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZlYXR1cmVzOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxZQUFZLE1BQU0sdUNBQXVDO0FBQ2hFLFNBQVNDLE9BQU8sUUFBUSxlQUFlO0FBRXZDLE1BQU1DLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDbkJELE9BQU8sQ0FBQ0UsUUFBUSxDQUFFLFVBQVUsRUFBRUQsUUFBUyxDQUFDO0FBRXhDLFNBQVNFLDJCQUEyQkEsQ0FBRUMsTUFBTSxFQUFHO0VBQzdDLElBQUk7SUFDRixNQUFNQyxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFFLFFBQVMsQ0FBQztJQUNqREYsTUFBTSxDQUFDRyxLQUFLLEdBQUcsQ0FBQztJQUNoQkgsTUFBTSxDQUFDSSxNQUFNLEdBQUcsQ0FBQztJQUNqQixNQUFNQyxPQUFPLEdBQUdMLE1BQU0sQ0FBQ00sVUFBVSxDQUFFLElBQUssQ0FBQztJQUN6Q0QsT0FBTyxDQUFDRSxTQUFTLEdBQUcsT0FBTztJQUMzQkYs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