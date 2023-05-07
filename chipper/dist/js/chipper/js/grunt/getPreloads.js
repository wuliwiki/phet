// Copyright 2017-2023, University of Colorado Boulder

/**
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

const _ = require('lodash');
const assert = require('assert');
const ChipperStringUtils = require('../common/ChipperStringUtils');
const getPhetLibs = require('./getPhetLibs');
const grunt = require('grunt');

/**
 * Gets preload, the set of scripts to be preloaded in the .html file.
 * NOTE! Order of the return value is significant, since it corresponds to the order in which scripts will be preloaded.
 *
 * @param {string} repo
 * @param {string} brand
 * @param {boolean} [forSim] - if the preloads are specifically for a simulation
 * @returns {Array.<string>}
 */
module.exports = function (repo, brand, forSim) {
  const packageObject = grunt.file.readJSON(`../${repo}/package.json`);
  let buildObject;
  try {
    const buildString = grunt.file.read('../chipper/build.json');
    const filledInBuildString = ChipperStringUtils.replaceAll(buildString, '{{REPO}}', repo);
    buildObject = JSON.parse(filledInBuildString);
  } catch (e) {
    buildObject = {};
  }
  let preload = [];

  // add preloads that are common to all sims, from build.json
  if (buildObject.common && buildObject.common.preload) {
    assert(Array.isArray(buildObject.common.preload), 'preload should be an array');
    preload = preload.concat(buildObject.common.preload);
  }

  // add sim-specific preloads from package.json
  if (packageObject.phet.preload) {
    assert(Array.isArray(packageObject.phet.preload), 'preload should be an array');
    preload = preload.concat(packageObject.phet.preload);
  }

  // add brand-specific preloads from build.json
  if (buildObject[brand] && buildObject[brand].preload) {
    assert(Array.isArray(buildObject[brand].preload), 'preload should be an array');
    preload = preload.concat(buildObject[brand].preload);
  }

  // simulationSpecificPreload are not needed for any other runtimes, like tests
  // No need to support this for package.json, just in chipper for now.
  if (forSim && buildObject[brand] && buildObject[brand].simulationSpecificPreload) {
    preload = preload.concat(buildObject[brand].simulationSpecificPreload);
  }

  // add brand-specific preloads from package.json
  if (packageObject.phet[brand] && packageObject.phet[brand].preload) {
    assert(Array.isArray(packageObject.phet[brand].preload), 'preload should be an array');
    preload = preload.concat(packageObject.phet[brand].preload);
  }

  // remove duplicates (do NOT sort, order is significant!)
  preload = _.uniq(preload);

  // Verifies that preload repositories are included in phetLib.
  const phetLibs = getPhetLibs(repo, brand);
  const missingRepositories = [];
  preload.forEach(entry => {
    // preload entries should start with '..', e.g. "../assert/js/assert.js"
    assert(entry.split('/')[0] === '..', `malformed preload entry: ${entry}`);

    // the preload's repository should be in phetLib
    const repositoryName = entry.split('/')[1];
    if (phetLibs.indexOf(repositoryName) === -1 && missingRepositories.indexOf(repositoryName) === -1) {
      missingRepositories.push(repositoryName);
    }
  });
  assert(missingRepositories.length === 0, `phetLib is missing repositories required by preload: ${missingRepositories.toString()}`);
  return preload;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfIiwicmVxdWlyZSIsImFzc2VydCIsIkNoaXBwZXJTdHJpbmdVdGlscyIsImdldFBoZXRMaWJzIiwiZ3J1bnQiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVwbyIsImJyYW5kIiwiZm9yU2ltIiwicGFja2FnZU9iamVjdCIsImZpbGUiLCJyZWFkSlNPTiIsImJ1aWxkT2JqZWN0IiwiYnVpbGRTdHJpbmciLCJyZWFkIiwiZmlsbGVkSW5CdWlsZFN0cmluZyIsInJlcGxhY2VBbGwiLCJKU09OIiwicGFyc2UiLCJlIiwicHJlbG9hZCIsImNvbW1vbiIsIkFycmF5IiwiaXNBcnJheSIsImNvbmNhdCIsInBoZXQiLCJzaW11bGF0aW9uU3BlY2lmaWNQcmVsb2FkIiwidW5pcSIsInBoZXRMaWJzIiwibWlzc2luZ1JlcG9zaXRvcmllcyIsImZvckVhY2giLCJlbnRyeSIsInNwbGl0IiwicmVwb3NpdG9yeU5hbWUiLCJpbmRleE9mIiwicHVzaCIsImxlbmd0aCIsInRvU3RyaW5nIl0sInNvdXJjZXMiOlsiZ2V0UHJlbG9hZHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTctMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICogQGF1dGhvciBKb25hdGhhbiBPbHNvbiA8am9uYXRoYW4ub2xzb25AY29sb3JhZG8uZWR1PlxyXG4gKi9cclxuXHJcblxyXG5jb25zdCBfID0gcmVxdWlyZSggJ2xvZGFzaCcgKTtcclxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSggJ2Fzc2VydCcgKTtcclxuY29uc3QgQ2hpcHBlclN0cmluZ1V0aWxzID0gcmVxdWlyZSggJy4uL2NvbW1vbi9DaGlwcGVyU3RyaW5nVXRpbHMnICk7XHJcbmNvbnN0IGdldFBoZXRMaWJzID0gcmVxdWlyZSggJy4vZ2V0UGhldExpYnMnICk7XHJcbmNvbnN0IGdydW50ID0gcmVxdWlyZSggJ2dydW50JyApO1xyXG5cclxuLyoqXHJcbiAqIEdldHMgcHJlbG9hZCwgdGhlIHNldCBvZiBzY3JpcHRzIHRvIGJlIHByZWxvYWRlZCBpbiB0aGUgLmh0bWwgZmlsZS5cclxuICogTk9URSEgT3JkZXIgb2YgdGhlIHJldHVybiB2YWx1ZSBpcyBzaWduaWZpY2FudCwgc2luY2UgaXQgY29ycmVzcG9uZHMgdG8gdGhlIG9yZGVyIGluIHdoaWNoIHNjcmlwdHMgd2lsbCBiZSBwcmVsb2FkZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXBvXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBicmFuZFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmb3JTaW1dIC0gaWYgdGhlIHByZWxvYWRzIGFyZSBzcGVjaWZpY2FsbHkgZm9yIGEgc2ltdWxhdGlvblxyXG4gKiBAcmV0dXJucyB7QXJyYXkuPHN0cmluZz59XHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCByZXBvLCBicmFuZCwgZm9yU2ltICkge1xyXG5cclxuICBjb25zdCBwYWNrYWdlT2JqZWN0ID0gZ3J1bnQuZmlsZS5yZWFkSlNPTiggYC4uLyR7cmVwb30vcGFja2FnZS5qc29uYCApO1xyXG4gIGxldCBidWlsZE9iamVjdDtcclxuICB0cnkge1xyXG4gICAgY29uc3QgYnVpbGRTdHJpbmcgPSBncnVudC5maWxlLnJlYWQoICcuLi9jaGlwcGVyL2J1aWxkLmpzb24nICk7XHJcbiAgICBjb25zdCBmaWxsZWRJbkJ1aWxkU3RyaW5nID0gQ2hpcHBlclN0cmluZ1V0aWxzLnJlcGxhY2VBbGwoIGJ1aWxkU3RyaW5nLCAne3tSRVBPfX0nLCByZXBvICk7XHJcbiAgICBidWlsZE9iamVjdCA9IEpTT04ucGFyc2UoIGZpbGxlZEluQnVpbGRTdHJpbmcgKTtcclxuICB9XHJcbiAgY2F0Y2goIGUgKSB7XHJcbiAgICBidWlsZE9iamVjdCA9IHt9O1xyXG4gIH1cclxuXHJcbiAgbGV0IHByZWxvYWQgPSBbXTtcclxuXHJcbiAgLy8gYWRkIHByZWxvYWRzIHRoYXQgYXJlIGNvbW1vbiB0byBhbGwgc2ltcywgZnJvbSBidWlsZC5qc29uXHJcbiAgaWYgKCBidWlsZE9iamVjdC5jb21tb24gJiYgYnVpbGRPYmplY3QuY29tbW9uLnByZWxvYWQgKSB7XHJcbiAgICBhc3NlcnQoIEFycmF5LmlzQXJyYXkoIGJ1aWxkT2JqZWN0LmNvbW1vbi5wcmVsb2FkICksICdwcmVsb2FkIHNob3VsZCBiZSBhbiBhcnJheScgKTtcclxuICAgIHByZWxvYWQgPSBwcmVsb2FkLmNvbmNhdCggYnVpbGRPYmplY3QuY29tbW9uLnByZWxvYWQgKTtcclxuICB9XHJcblxyXG4gIC8vIGFkZCBzaW0tc3BlY2lmaWMgcHJlbG9hZHMgZnJvbSBwYWNrYWdlLmpzb25cclxuICBpZiAoIHBhY2thZ2VPYmplY3QucGhldC5wcmVsb2FkICkge1xyXG4gICAgYXNzZXJ0KCBBcnJheS5pc0FycmF5KCBwYWNrYWdlT2JqZWN0LnBoZXQucHJlbG9hZCApLCAncHJlbG9hZCBzaG91bGQgYmUgYW4gYXJyYXknICk7XHJcbiAgICBwcmVsb2FkID0gcHJlbG9hZC5jb25jYXQoIHBhY2thZ2VPYmplY3QucGhldC5wcmVsb2FkICk7XHJcbiAgfVxyXG5cclxuICAvLyBhZGQgYnJhbmQtc3BlY2lmaWMgcHJlbG9hZHMgZnJvbSBidWlsZC5qc29uXHJcbiAgaWYgKCBidWlsZE9iamVjdFsgYnJhbmQgXSAmJiBidWlsZE9iamVjdFsgYnJhbmQgXS5wcmVsb2FkICkge1xyXG4gICAgYXNzZXJ0KCBBcnJheS5pc0FycmF5KCBidWlsZE9iamVjdFsgYnJhbmQgXS5wcmVsb2FkICksICdwcmVsb2FkIHNob3VsZCBiZSBhbiBhcnJheScgKTtcclxuICAgIHByZWxvYWQgPSBwcmVsb2FkLmNvbmNhdCggYnVpbGRPYmplY3RbIGJyYW5kIF0ucHJlbG9hZCApO1xyXG4gIH1cclxuXHJcbiAgLy8gc2ltdWxhdGlvblNwZWNpZmljUHJlbG9hZCBhcmUgbm90IG5lZWRlZCBmb3IgYW55IG90aGVyIHJ1bnRpbWVzLCBsaWtlIHRlc3RzXHJcbiAgLy8gTm8gbmVlZCB0byBzdXBwb3J0IHRoaXMgZm9yIHBhY2thZ2UuanNvbiwganVzdCBpbiBjaGlwcGVyIGZvciBub3cuXHJcbiAgaWYgKCBmb3JTaW0gJiYgYnVpbGRPYmplY3RbIGJyYW5kIF0gJiYgYnVpbGRPYmplY3RbIGJyYW5kIF0uc2ltdWxhdGlvblNwZWNpZmljUHJlbG9hZCApIHtcclxuICAgIHByZWxvYWQgPSBwcmVsb2FkLmNvbmNhdCggYnVpbGRPYmplY3RbIGJyYW5kIF0uc2ltdWxhdGlvblNwZWNpZmljUHJlbG9hZCApO1xyXG4gIH1cclxuXHJcbiAgLy8gYWRkIGJyYW5kLXNwZWNpZmljIHByZWxvYWRzIGZyb20gcGFja2FnZS5qc29uXHJcbiAgaWYgKCBwYWNrYWdlT2JqZWN0LnBoZXRbIGJyYW5kIF0gJiYgcGFja2FnZU9iamVjdC5waGV0WyBicmFuZCBdLnByZWxvYWQgKSB7XHJcbiAgICBhc3NlcnQoIEFycmF5LmlzQXJyYXkoIHBhY2thZ2VPYmplY3QucGhldFsgYnJhbmQgXS5wcmVsb2FkICksICdwcmVsb2FkIHNob3VsZCBiZSBhbiBhcnJheScgKTtcclxuICAgIHByZWxvYWQgPSBwcmVsb2FkLmNvbmNhdCggcGFja2FnZU9iamVjdC5waGV0WyBicmFuZCBdLnByZWxvYWQgKTtcclxuICB9XHJcblxyXG4gIC8vIHJlbW92ZSBkdXBsaWNhdGVzIChkbyBOT1Qgc29ydCwgb3JkZXIgaXMgc2lnbmlmaWNhbnQhKVxyXG4gIHByZWxvYWQgPSBfLnVuaXEoIHByZWxvYWQgKTtcclxuXHJcbiAgLy8gVmVyaWZpZXMgdGhhdCBwcmVsb2FkIHJlcG9zaXRvcmllcyBhcmUgaW5jbHVkZWQgaW4gcGhldExpYi5cclxuICBjb25zdCBwaGV0TGlicyA9IGdldFBoZXRMaWJzKCByZXBvLCBicmFuZCApO1xyXG4gIGNvbnN0IG1pc3NpbmdSZXBvc2l0b3JpZXMgPSBbXTtcclxuICBwcmVsb2FkLmZvckVhY2goIGVudHJ5ID0+IHtcclxuXHJcbiAgICAvLyBwcmVsb2FkIGVudHJpZXMgc2hvdWxkIHN0YXJ0IHdpdGggJy4uJywgZS5nLiBcIi4uL2Fzc2VydC9qcy9hc3NlcnQuanNcIlxyXG4gICAgYXNzZXJ0KCBlbnRyeS5zcGxpdCggJy8nIClbIDAgXSA9PT0gJy4uJywgYG1hbGZvcm1lZCBwcmVsb2FkIGVudHJ5OiAke2VudHJ5fWAgKTtcclxuXHJcbiAgICAvLyB0aGUgcHJlbG9hZCdzIHJlcG9zaXRvcnkgc2hvdWxkIGJlIGluIHBoZXRMaWJcclxuICAgIGNvbnN0IHJlcG9zaXRvcnlOYW1lID0gZW50cnkuc3BsaXQoICcvJyApWyAxIF07XHJcbiAgICBpZiAoIHBoZXRMaWJzLmluZGV4T2YoIHJlcG9zaXRvcnlOYW1lICkgPT09IC0xICYmIG1pc3NpbmdSZXBvc2l0b3JpZXMuaW5kZXhPZiggcmVwb3NpdG9yeU5hbWUgKSA9PT0gLTEgKSB7XHJcbiAgICAgIG1pc3NpbmdSZXBvc2l0b3JpZXMucHVzaCggcmVwb3NpdG9yeU5hbWUgKTtcclxuICAgIH1cclxuICB9ICk7XHJcbiAgYXNzZXJ0KCBtaXNzaW5nUmVwb3NpdG9yaWVzLmxlbmd0aCA9PT0gMCxcclxuICAgIGBwaGV0TGliIGlzIG1pc3NpbmcgcmVwb3NpdG9yaWVzIHJlcXVpcmVkIGJ5IHByZWxvYWQ6ICR7bWlzc2luZ1JlcG9zaXRvcmllcy50b1N0cmluZygpfWAgKTtcclxuXHJcbiAgcmV0dXJuIHByZWxvYWQ7XHJcbn07XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBR0EsTUFBTUEsQ0FBQyxHQUFHQyxPQUFPLENBQUUsUUFBUyxDQUFDO0FBQzdCLE1BQU1DLE1BQU0sR0FBR0QsT0FBTyxDQUFFLFFBQVMsQ0FBQztBQUNsQyxNQUFNRSxrQkFBa0IsR0FBR0YsT0FBTyxDQUFFLDhCQUErQixDQUFDO0FBQ3BFLE1BQU1HLFdBQVcsR0FBR0gsT0FBTyxDQUFFLGVBQWdCLENBQUM7QUFDOUMsTUFBTUksS0FBSyxHQUFHSixPQUFPLENB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