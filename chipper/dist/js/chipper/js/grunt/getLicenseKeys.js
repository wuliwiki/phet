// Copyright 2017-2023, University of Colorado Boulder

/**
 * Gets the license keys for sherpa (third-party) libs that are used.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

const _ = require('lodash');
const getPreloads = require('./getPreloads');
const grunt = require('grunt');

/**
 * Gets the license keys for sherpa (third-party) libs that are used.
 *
 * @param {string} repo
 * @param {string} brand
 * @returns {Array.<string>}
 */
module.exports = function (repo, brand) {
  const packageObject = grunt.file.readJSON(`../${repo}/package.json`);
  let buildObject;
  try {
    buildObject = grunt.file.readJSON('../chipper/build.json');
  } catch (e) {
    buildObject = {};
  }
  const preload = getPreloads(repo, brand);

  // start with package.json
  let licenseKeys = packageObject.phet.licenseKeys || [];

  // add common and brand-specific entries from build.json
  ['common', brand].forEach(id => {
    if (buildObject[id] && buildObject[id].licenseKeys) {
      licenseKeys = licenseKeys.concat(buildObject[id].licenseKeys);
    }
  });

  // Extract keys from preload for sherpa (third-party) dependencies
  preload.forEach(path => {
    if (path.indexOf('/sherpa/') !== -1) {
      const lastSlash = path.lastIndexOf('/');
      const key = path.substring(lastSlash + 1);
      licenseKeys.push(key);
    }
  });

  // sort and remove duplicates
  return _.uniq(_.sortBy(licenseKeys, key => key.toUpperCase()));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfIiwicmVxdWlyZSIsImdldFByZWxvYWRzIiwiZ3J1bnQiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVwbyIsImJyYW5kIiwicGFja2FnZU9iamVjdCIsImZpbGUiLCJyZWFkSlNPTiIsImJ1aWxkT2JqZWN0IiwiZSIsInByZWxvYWQiLCJsaWNlbnNlS2V5cyIsInBoZXQiLCJmb3JFYWNoIiwiaWQiLCJjb25jYXQiLCJwYXRoIiwiaW5kZXhPZiIsImxhc3RTbGFzaCIsImxhc3RJbmRleE9mIiwia2V5Iiwic3Vic3RyaW5nIiwicHVzaCIsInVuaXEiLCJzb3J0QnkiLCJ0b1VwcGVyQ2FzZSJdLCJzb3VyY2VzIjpbImdldExpY2Vuc2VLZXlzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE3LTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIGxpY2Vuc2Uga2V5cyBmb3Igc2hlcnBhICh0aGlyZC1wYXJ0eSkgbGlicyB0aGF0IGFyZSB1c2VkLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKiBAYXV0aG9yIEpvbmF0aGFuIE9sc29uIDxqb25hdGhhbi5vbHNvbkBjb2xvcmFkby5lZHU+XHJcbiAqL1xyXG5cclxuXHJcbmNvbnN0IF8gPSByZXF1aXJlKCAnbG9kYXNoJyApO1xyXG5jb25zdCBnZXRQcmVsb2FkcyA9IHJlcXVpcmUoICcuL2dldFByZWxvYWRzJyApO1xyXG5jb25zdCBncnVudCA9IHJlcXVpcmUoICdncnVudCcgKTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBsaWNlbnNlIGtleXMgZm9yIHNoZXJwYSAodGhpcmQtcGFydHkpIGxpYnMgdGhhdCBhcmUgdXNlZC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHJlcG9cclxuICogQHBhcmFtIHtzdHJpbmd9IGJyYW5kXHJcbiAqIEByZXR1cm5zIHtBcnJheS48c3RyaW5nPn1cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oIHJlcG8sIGJyYW5kICkge1xyXG4gIGNvbnN0IHBhY2thZ2VPYmplY3QgPSBncnVudC5maWxlLnJlYWRKU09OKCBgLi4vJHtyZXBvfS9wYWNrYWdlLmpzb25gICk7XHJcbiAgbGV0IGJ1aWxkT2JqZWN0O1xyXG4gIHRyeSB7XHJcbiAgICBidWlsZE9iamVjdCA9IGdydW50LmZpbGUucmVhZEpTT04oICcuLi9jaGlwcGVyL2J1aWxkLmpzb24nICk7XHJcbiAgfVxyXG4gIGNhdGNoKCBlICkge1xyXG4gICAgYnVpbGRPYmplY3QgPSB7fTtcclxuICB9XHJcbiAgY29uc3QgcHJlbG9hZCA9IGdldFByZWxvYWRzKCByZXBvLCBicmFuZCApO1xyXG5cclxuICAvLyBzdGFydCB3aXRoIHBhY2thZ2UuanNvblxyXG4gIGxldCBsaWNlbnNlS2V5cyA9IHBhY2thZ2VPYmplY3QucGhldC5saWNlbnNlS2V5cyB8fCBbXTtcclxuXHJcbiAgLy8gYWRkIGNvbW1vbiBhbmQgYnJhbmQtc3BlY2lmaWMgZW50cmllcyBmcm9tIGJ1aWxkLmpzb25cclxuICBbICdjb21tb24nLCBicmFuZCBdLmZvckVhY2goIGlkID0+IHtcclxuICAgIGlmICggYnVpbGRPYmplY3RbIGlkIF0gJiYgYnVpbGRPYmplY3RbIGlkIF0ubGljZW5zZUtleXMgKSB7XHJcbiAgICAgIGxpY2Vuc2VLZXlzID0gbGljZW5zZUtleXMuY29uY2F0KCBidWlsZE9iamVjdFsgaWQgXS5saWNlbnNlS2V5cyApO1xyXG4gICAgfVxyXG4gIH0gKTtcclxuXHJcbiAgLy8gRXh0cmFjdCBrZXlzIGZyb20gcHJlbG9hZCBmb3Igc2hlcnBhICh0aGlyZC1wYXJ0eSkgZGVwZW5kZW5jaWVzXHJcbiAgcHJlbG9hZC5mb3JFYWNoKCBwYXRoID0+IHtcclxuICAgIGlmICggcGF0aC5pbmRleE9mKCAnL3NoZXJwYS8nICkgIT09IC0xICkge1xyXG4gICAgICBjb25zdCBsYXN0U2xhc2ggPSBwYXRoLmxhc3RJbmRleE9mKCAnLycgKTtcclxuICAgICAgY29uc3Qga2V5ID0gcGF0aC5zdWJzdHJpbmcoIGxhc3RTbGFzaCArIDEgKTtcclxuICAgICAgbGljZW5zZUtleXMucHVzaCgga2V5ICk7XHJcbiAgICB9XHJcbiAgfSApO1xyXG5cclxuICAvLyBzb3J0IGFuZCByZW1vdmUgZHVwbGljYXRlc1xyXG4gIHJldHVybiBfLnVuaXEoIF8uc29ydEJ5KCBsaWNlbnNlS2V5cywga2V5ID0+IGtleS50b1VwcGVyQ2FzZSgpICkgKTtcclxufTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0EsTUFBTUEsQ0FBQyxHQUFHQyxPQUFPLENBQUUsUUFBUyxDQUFDO0FBQzdCLE1BQU1DLFdBQVcsR0FBR0QsT0FBTyxDQUFFLGVBQWdCLENBQUM7QUFDOUMsTUFBTUUsS0FBSyxHQUFHRixPQUFPLENBQUUsT0FBUSxDQUFDOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBRyxNQUFNLENBQUNDLE9BQU8sR0FBRyxVQUFVQyxJQUFJLEVBQUVDLEtBQUssRUFBRztFQUN2QyxNQUFNQyxhQUFhLEdBQUdMLEtBQUssQ0FBQ00sSUFBSSxDQUFDQyxRQUFRLENBQUcsTUFBS0osSUFBSyxlQUFlLENBQUM7RUFDdEUsSUFBSUssV0FBVztFQUNmLElBQUk7SUFDRkEsV0FBVyxHQUFHUixLQUFLLENBQUNNLElBQUksQ0FBQ0MsUUFBUSxDQUFFLHVCQUF3QixDQUFDO0VBQzlELENBQUMsQ0FDRCxPQUFPRSxDQUFDLEVBQUc7SUFDVEQsV0FBVyxHQUFHLENBQUMsQ0FBQztFQUNsQjtFQUNBLE1BQU1FLE9BQU8sR0FBR1gsV0FBVyxDQUFFSSxJQUFJLEVBQUVDLEtBQU0sQ0FBQzs7RUFFMUM7RUFDQSxJQUFJTyxXQUFXLEdBQUdOLGFBQWEsQ0FBQ08sSUFBSSxDQUFDRCxXQUFXLElBQUksRUFBRTs7RUFFdEQ7RUFDQSxDQUFFLFFBQVEsRUFBRVAsS0FBSyxDQUFFLENBQUNTLE9BQU8sQ0FBRUMsRUFBRSxJQUFJO0lBQ2pDLElBQUtOLFdBQVcsQ0FBRU0sRUFBRSxDQUFFLElBQUlOLFdBQVcsQ0FBRU0sRUFBRSxDQUFFLENBQUNILFdBQVcsRUFBRztNQUN4REEsV0FBVyxHQUFHQSxXQUFXLENBQUNJLE1BQU0sQ0FBRVAsV0FBVyxDQUFFTSxFQUFFLENBQUUsQ0FBQ0gsV0FBWSxDQUFDO0lBQ25FO0VBQ0YsQ0FBRSxDQUFDOztFQUVIO0VBQ0FELE9BQU8sQ0FBQ0csT0FBTyxDQUFFRyxJQUFJLElBQUk7SUFDdkIsSUFBS0EsSUFBSSxDQUFDQyxPQUFPLENBQUUsVUFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUc7TUFDdkMsTUFBTUMsU0FBUyxHQUFHRixJQUFJLENBQUNHLFdBQVcsQ0FBRSxHQUFJLENBQUM7TUFDekMsTUFBTUMsR0FBRyxHQUFHSixJQUFJLENBQUNLLFNBQVMsQ0FBRUgsU0FBUyxHQUFHLENBQUUsQ0FBQztNQUMzQ1AsV0FBVyxDQUFDVyxJQUFJLENBQUVGLEdBQUksQ0FBQztJQUN6QjtFQUNGLENBQUUsQ0FBQzs7RUFFSDtFQUNBLE9BQU92QixDQUFDLENBQUMwQixJQUFJLENBQUUxQixDQUFDLENBQUMyQixNQUFNLENBQUViLFdBQVcsRUFBRVMsR0FBRyxJQUFJQSxHQUFHLENBQUNLLFdBQVcsQ0FBQyxDQUFFLENBQUUsQ0FBQztBQUNwRSxDQUFDIn0=