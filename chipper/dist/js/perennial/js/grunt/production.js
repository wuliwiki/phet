// Copyright 2017, University of Colorado Boulder

/**
 * Deploys a production version after incrementing the test version number.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

const SimVersion = require('../common/SimVersion');
const booleanPrompt = require('../common/booleanPrompt');
const build = require('../common/build');
const buildServerRequest = require('../common/buildServerRequest');
const checkoutMaster = require('../common/checkoutMaster');
const checkoutTarget = require('../common/checkoutTarget');
const execute = require('../common/execute');
const getDependencies = require('../common/getDependencies');
const getRepoVersion = require('../common/getRepoVersion');
const gitAdd = require('../common/gitAdd');
const gitCommit = require('../common/gitCommit');
const gitIsClean = require('../common/gitIsClean');
const gitPush = require('../common/gitPush');
const grunt = require('grunt');
const gruntCommand = require('../common/gruntCommand');
const hasRemoteBranch = require('../common/hasRemoteBranch');
const isPublished = require('../common/isPublished');
const npmUpdate = require('../common/npmUpdate');
const setRepoVersion = require('../common/setRepoVersion');
const simMetadata = require('../common/simMetadata');
const updateDependenciesJSON = require('../common/updateDependenciesJSON');
const vpnCheck = require('../common/vpnCheck');
const _ = require('lodash'); // eslint-disable-line no-unused-vars

/**
 * Deploys a production version after incrementing the test version number.
 * @public
 *
 * @param {string} repo
 * @param {string} branch
 * @param {Array.<string>} brands
 * @param {boolean} noninteractive
 * @param {string} [message] - Optional message to append to the version-increment commit.
 * @returns {Promise.<SimVersion>}
 */
module.exports = async function (repo, branch, brands, noninteractive, message) {
  SimVersion.ensureReleaseBranch(branch);
  if (!(await vpnCheck())) {
    grunt.fail.fatal('VPN or being on campus is required for this build. Ensure VPN is enabled, or that you have access to phet-server2.int.colorado.edu');
  }
  const isClean = await gitIsClean(repo);
  if (!isClean) {
    throw new Error(`Unclean status in ${repo}, cannot create release branch`);
  }
  if (!(await hasRemoteBranch(repo, branch))) {
    throw new Error(`Cannot find release branch ${branch} for ${repo}`);
  }
  if (!grunt.file.exists(`../${repo}/assets/${repo}-screenshot.png`) && brands.includes('phet')) {
    throw new Error(`Missing screenshot file (${repo}/assets/${repo}-screenshot.png), aborting production deployment`);
  }
  if (!(await booleanPrompt('Are QA credits up-to-date?', noninteractive))) {
    throw new Error('Aborted production deployment');
  }
  if (!(await booleanPrompt('Have all maintenance patches that need spot checks been tested? (An issue would be created in the sim repo)', noninteractive))) {
    throw new Error('Aborted production deployment');
  }
  const published = await isPublished(repo);
  await checkoutTarget(repo, branch, true); // include npm update

  try {
    const previousVersion = await getRepoVersion(repo);
    let version;
    let versionChanged;
    if (previousVersion.testType === null) {
      if (noninteractive || !(await booleanPrompt(`The last deployment was a production deployment (${previousVersion.toString()}) and an RC version is required between production versions. Would you like to redeploy ${previousVersion.toString()} (y) or cancel this process and revert to master (N)`, false))) {
        throw new Error('Aborted production deployment: It appears that the last deployment was for production.');
      }
      version = previousVersion;
      versionChanged = false;
    } else if (previousVersion.testType === 'rc') {
      version = new SimVersion(previousVersion.major, previousVersion.minor, previousVersion.maintenance);
      versionChanged = true;
    } else {
      throw new Error('Aborted production deployment since the version number cannot be incremented safely');
    }
    const isFirstVersion = !(await simMetadata({
      simulation: repo
    })).projects;

    // Initial deployment nags
    if (isFirstVersion) {
      if (!(await booleanPrompt('Is the master checklist complete (e.g. are screenshots added to assets, etc.)', noninteractive))) {
        throw new Error('Aborted production deployment');
      }
    }
    const versionString = version.toString();

    // caps-lock should hopefully shout this at people. do we have a text-to-speech synthesizer we can shout out of their speakers?
    // SECOND THOUGHT: this would be horrible during automated maintenance releases.
    if (!(await booleanPrompt(`DEPLOY ${repo} ${versionString} (brands: ${brands.join(',')}) to PRODUCTION`, noninteractive))) {
      throw new Error('Aborted production deployment');
    }
    if (versionChanged) {
      await setRepoVersion(repo, version, message);
      await gitPush(repo, branch);
    }

    // Make sure our correct npm dependencies are set
    await npmUpdate(repo);
    await npmUpdate('chipper');
    await npmUpdate('perennial-alias');

    // Update the README on the branch
    if (published) {
      grunt.log.writeln('Updating branch README');
      try {
        await execute(gruntCommand, ['published-README'], `../${repo}`);
      } catch (e) {
        grunt.log.writeln('published-README error, may not exist, will try generate-published-README');
        try {
          await execute(gruntCommand, ['generate-published-README'], `../${repo}`);
        } catch (e) {
          grunt.log.writeln('No published README generation found');
        }
      }
      await gitAdd(repo, 'README.md');
      try {
        await gitCommit(repo, `Generated published README.md as part of a production deploy for ${versionString}`);
        await gitPush(repo, branch);
      } catch (e) {
        grunt.log.writeln('Production README is already up-to-date');
      }
    }

    // No special options required here, as we send the main request to the build server
    grunt.log.writeln(await build(repo, {
      brands: brands
    }));

    /**
     * The necessary clean up steps to do if aborting after the build
     * @param {string} message - message to error out with
     * @returns {Promise.<void>}
     */
    const postBuildAbort = async message => {
      // Abort version update
      if (versionChanged) {
        await setRepoVersion(repo, previousVersion, message);
        await gitPush(repo, branch);
      }

      // Abort checkout, (will be caught and master will be checked out
      throw new Error(message);
    };
    if (!(await booleanPrompt(`Please test the built version of ${repo}.\nIs it ready to deploy?`, noninteractive))) {
      await postBuildAbort('Aborted production deployment (aborted version change too).');
    }

    // Move over dependencies.json and commit/push
    await updateDependenciesJSON(repo, brands, versionString, branch);

    // Send the build request
    await buildServerRequest(repo, version, branch, await getDependencies(repo), {
      locales: '*',
      brands: brands,
      servers: ['dev', 'production']
    });

    // Move back to master
    await checkoutMaster(repo, true);
    if (brands.includes('phet')) {
      grunt.log.writeln(`Deployed: https://phet.colorado.edu/sims/html/${repo}/latest/${repo}_all.html`);
    }
    if (brands.includes('phet-io')) {
      grunt.log.writeln(`Deployed: https://phet-io.colorado.edu/sims/${repo}/${versionString}/`);
    }
    grunt.log.writeln('Please wait for the build-server to complete the deployment, and then test!');
    if (isFirstVersion && brands.includes('phet')) {
      grunt.log.writeln('After testing, let the simulation lead know it has been deployed, so they can edit metadata on the website');

      // Update the README on master
      if (published) {
        grunt.log.writeln('Updating master README');
        await execute(gruntCommand, ['published-README'], `../${repo}`);
        await gitAdd(repo, 'README.md');
        try {
          await gitCommit(repo, `Generated published README.md as part of a production deploy for ${versionString}`);
          await gitPush(repo, 'master');
        } catch (e) {
          grunt.log.writeln('Production README is already up-to-date');
        }
      }
    }

    // phet-io nags from the checklist
    if (brands.includes('phet-io')) {
      const phetioLogText = `
PhET-iO deploys involve a couple of extra steps after production. Please ensure the following are accomplished:
1. Make sure the sim is listed in perennial/data/phet-io-api-stable if it has had a designed production release
2. Create an issue in the phet-io repo and assign to @kathy-phet to update the main "PhET-iO Simulations" spreadsheet from this new publication. (https://docs.google.com/spreadsheets/d/18_QNGuVtYtxOEKG9xRBs_PSQpyvzySF1Gk5puR-5Fv4/edit#gid=1881767354)
      `;
      grunt.log.writeln(phetioLogText);
    }
    return version;
  } catch (e) {
    grunt.log.warn('Detected failure during deploy, reverting to master');
    await checkoutMaster(repo, true);
    throw e;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTaW1WZXJzaW9uIiwicmVxdWlyZSIsImJvb2xlYW5Qcm9tcHQiLCJidWlsZCIsImJ1aWxkU2VydmVyUmVxdWVzdCIsImNoZWNrb3V0TWFzdGVyIiwiY2hlY2tvdXRUYXJnZXQiLCJleGVjdXRlIiwiZ2V0RGVwZW5kZW5jaWVzIiwiZ2V0UmVwb1ZlcnNpb24iLCJnaXRBZGQiLCJnaXRDb21taXQiLCJnaXRJc0NsZWFuIiwiZ2l0UHVzaCIsImdydW50IiwiZ3J1bnRDb21tYW5kIiwiaGFzUmVtb3RlQnJhbmNoIiwiaXNQdWJsaXNoZWQiLCJucG1VcGRhdGUiLCJzZXRSZXBvVmVyc2lvbiIsInNpbU1ldGFkYXRhIiwidXBkYXRlRGVwZW5kZW5jaWVzSlNPTiIsInZwbkNoZWNrIiwiXyIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXBvIiwiYnJhbmNoIiwiYnJhbmRzIiwibm9uaW50ZXJhY3RpdmUiLCJtZXNzYWdlIiwiZW5zdXJlUmVsZWFzZUJyYW5jaCIsImZhaWwiLCJmYXRhbCIsImlzQ2xlYW4iLCJFcnJvciIsImZpbGUiLCJleGlzdHMiLCJpbmNsdWRlcyIsInB1Ymxpc2hlZCIsInByZXZpb3VzVmVyc2lvbiIsInZlcnNpb24iLCJ2ZXJzaW9uQ2hhbmdlZCIsInRlc3RUeXBlIiwidG9TdHJpbmciLCJtYWpvciIsIm1pbm9yIiwibWFpbnRlbmFuY2UiLCJpc0ZpcnN0VmVyc2lvbiIsInNpbXVsYXRpb24iLCJwcm9qZWN0cyIsInZlcnNpb25TdHJpbmciLCJqb2luIiwibG9nIiwid3JpdGVsbiIsImUiLCJwb3N0QnVpbGRBYm9ydCIsImxvY2FsZXMiLCJzZXJ2ZXJzIiwicGhldGlvTG9nVGV4dCIsIndhcm4iXSwic291cmNlcyI6WyJwcm9kdWN0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE3LCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBEZXBsb3lzIGEgcHJvZHVjdGlvbiB2ZXJzaW9uIGFmdGVyIGluY3JlbWVudGluZyB0aGUgdGVzdCB2ZXJzaW9uIG51bWJlci5cclxuICpcclxuICogQGF1dGhvciBKb25hdGhhbiBPbHNvbiA8am9uYXRoYW4ub2xzb25AY29sb3JhZG8uZWR1PlxyXG4gKi9cclxuXHJcbmNvbnN0IFNpbVZlcnNpb24gPSByZXF1aXJlKCAnLi4vY29tbW9uL1NpbVZlcnNpb24nICk7XHJcbmNvbnN0IGJvb2xlYW5Qcm9tcHQgPSByZXF1aXJlKCAnLi4vY29tbW9uL2Jvb2xlYW5Qcm9tcHQnICk7XHJcbmNvbnN0IGJ1aWxkID0gcmVxdWlyZSggJy4uL2NvbW1vbi9idWlsZCcgKTtcclxuY29uc3QgYnVpbGRTZXJ2ZXJSZXF1ZXN0ID0gcmVxdWlyZSggJy4uL2NvbW1vbi9idWlsZFNlcnZlclJlcXVlc3QnICk7XHJcbmNvbnN0IGNoZWNrb3V0TWFzdGVyID0gcmVxdWlyZSggJy4uL2NvbW1vbi9jaGVja291dE1hc3RlcicgKTtcclxuY29uc3QgY2hlY2tvdXRUYXJnZXQgPSByZXF1aXJlKCAnLi4vY29tbW9uL2NoZWNrb3V0VGFyZ2V0JyApO1xyXG5jb25zdCBleGVjdXRlID0gcmVxdWlyZSggJy4uL2NvbW1vbi9leGVjdXRlJyApO1xyXG5jb25zdCBnZXREZXBlbmRlbmNpZXMgPSByZXF1aXJlKCAnLi4vY29tbW9uL2dldERlcGVuZGVuY2llcycgKTtcclxuY29uc3QgZ2V0UmVwb1ZlcnNpb24gPSByZXF1aXJlKCAnLi4vY29tbW9uL2dldFJlcG9WZXJzaW9uJyApO1xyXG5jb25zdCBnaXRBZGQgPSByZXF1aXJlKCAnLi4vY29tbW9uL2dpdEFkZCcgKTtcclxuY29uc3QgZ2l0Q29tbWl0ID0gcmVxdWlyZSggJy4uL2NvbW1vbi9naXRDb21taXQnICk7XHJcbmNvbnN0IGdpdElzQ2xlYW4gPSByZXF1aXJlKCAnLi4vY29tbW9uL2dpdElzQ2xlYW4nICk7XHJcbmNvbnN0IGdpdFB1c2ggPSByZXF1aXJlKCAnLi4vY29tbW9uL2dpdFB1c2gnICk7XHJcbmNvbnN0IGdydW50ID0gcmVxdWlyZSggJ2dydW50JyApO1xyXG5jb25zdCBncnVudENvbW1hbmQgPSByZXF1aXJlKCAnLi4vY29tbW9uL2dydW50Q29tbWFuZCcgKTtcclxuY29uc3QgaGFzUmVtb3RlQnJhbmNoID0gcmVxdWlyZSggJy4uL2NvbW1vbi9oYXNSZW1vdGVCcmFuY2gnICk7XHJcbmNvbnN0IGlzUHVibGlzaGVkID0gcmVxdWlyZSggJy4uL2NvbW1vbi9pc1B1Ymxpc2hlZCcgKTtcclxuY29uc3QgbnBtVXBkYXRlID0gcmVxdWlyZSggJy4uL2NvbW1vbi9ucG1VcGRhdGUnICk7XHJcbmNvbnN0IHNldFJlcG9WZXJzaW9uID0gcmVxdWlyZSggJy4uL2NvbW1vbi9zZXRSZXBvVmVyc2lvbicgKTtcclxuY29uc3Qgc2ltTWV0YWRhdGEgPSByZXF1aXJlKCAnLi4vY29tbW9uL3NpbU1ldGFkYXRhJyApO1xyXG5jb25zdCB1cGRhdGVEZXBlbmRlbmNpZXNKU09OID0gcmVxdWlyZSggJy4uL2NvbW1vbi91cGRhdGVEZXBlbmRlbmNpZXNKU09OJyApO1xyXG5jb25zdCB2cG5DaGVjayA9IHJlcXVpcmUoICcuLi9jb21tb24vdnBuQ2hlY2snICk7XHJcbmNvbnN0IF8gPSByZXF1aXJlKCAnbG9kYXNoJyApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcblxyXG4vKipcclxuICogRGVwbG95cyBhIHByb2R1Y3Rpb24gdmVyc2lvbiBhZnRlciBpbmNyZW1lbnRpbmcgdGhlIHRlc3QgdmVyc2lvbiBudW1iZXIuXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHJlcG9cclxuICogQHBhcmFtIHtzdHJpbmd9IGJyYW5jaFxyXG4gKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBicmFuZHNcclxuICogQHBhcmFtIHtib29sZWFufSBub25pbnRlcmFjdGl2ZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW21lc3NhZ2VdIC0gT3B0aW9uYWwgbWVzc2FnZSB0byBhcHBlbmQgdG8gdGhlIHZlcnNpb24taW5jcmVtZW50IGNvbW1pdC5cclxuICogQHJldHVybnMge1Byb21pc2UuPFNpbVZlcnNpb24+fVxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiggcmVwbywgYnJhbmNoLCBicmFuZHMsIG5vbmludGVyYWN0aXZlLCBtZXNzYWdlICkge1xyXG4gIFNpbVZlcnNpb24uZW5zdXJlUmVsZWFzZUJyYW5jaCggYnJhbmNoICk7XHJcblxyXG4gIGlmICggISggYXdhaXQgdnBuQ2hlY2soKSApICkge1xyXG4gICAgZ3J1bnQuZmFpbC5mYXRhbCggJ1ZQTiBvciBiZWluZyBvbiBjYW1wdXMgaXMgcmVxdWlyZWQgZm9yIHRoaXMgYnVpbGQuIEVuc3VyZSBWUE4gaXMgZW5hYmxlZCwgb3IgdGhhdCB5b3UgaGF2ZSBhY2Nlc3MgdG8gcGhldC1zZXJ2ZXIyLmludC5jb2xvcmFkby5lZHUnICk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBpc0NsZWFuID0gYXdhaXQgZ2l0SXNDbGVhbiggcmVwbyApO1xyXG4gIGlmICggIWlzQ2xlYW4gKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoIGBVbmNsZWFuIHN0YXR1cyBpbiAke3JlcG99LCBjYW5ub3QgY3JlYXRlIHJlbGVhc2UgYnJhbmNoYCApO1xyXG4gIH1cclxuXHJcbiAgaWYgKCAhKCBhd2FpdCBoYXNSZW1vdGVCcmFuY2goIHJlcG8sIGJyYW5jaCApICkgKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoIGBDYW5ub3QgZmluZCByZWxlYXNlIGJyYW5jaCAke2JyYW5jaH0gZm9yICR7cmVwb31gICk7XHJcbiAgfVxyXG5cclxuICBpZiAoICFncnVudC5maWxlLmV4aXN0cyggYC4uLyR7cmVwb30vYXNzZXRzLyR7cmVwb30tc2NyZWVuc2hvdC5wbmdgICkgJiYgYnJhbmRzLmluY2x1ZGVzKCAncGhldCcgKSApIHtcclxuICAgIHRocm93IG5ldyBFcnJvciggYE1pc3Npbmcgc2NyZWVuc2hvdCBmaWxlICgke3JlcG99L2Fzc2V0cy8ke3JlcG99LXNjcmVlbnNob3QucG5nKSwgYWJvcnRpbmcgcHJvZHVjdGlvbiBkZXBsb3ltZW50YCApO1xyXG4gIH1cclxuXHJcbiAgaWYgKCAhYXdhaXQgYm9vbGVhblByb21wdCggJ0FyZSBRQSBjcmVkaXRzIHVwLXRvLWRhdGU/Jywgbm9uaW50ZXJhY3RpdmUgKSApIHtcclxuICAgIHRocm93IG5ldyBFcnJvciggJ0Fib3J0ZWQgcHJvZHVjdGlvbiBkZXBsb3ltZW50JyApO1xyXG4gIH1cclxuXHJcbiAgaWYgKCAhYXdhaXQgYm9vbGVhblByb21wdCggJ0hhdmUgYWxsIG1haW50ZW5hbmNlIHBhdGNoZXMgdGhhdCBuZWVkIHNwb3QgY2hlY2tzIGJlZW4gdGVzdGVkPyAoQW4gaXNzdWUgd291bGQgYmUgY3JlYXRlZCBpbiB0aGUgc2ltIHJlcG8pJywgbm9uaW50ZXJhY3RpdmUgKSApIHtcclxuICAgIHRocm93IG5ldyBFcnJvciggJ0Fib3J0ZWQgcHJvZHVjdGlvbiBkZXBsb3ltZW50JyApO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcHVibGlzaGVkID0gYXdhaXQgaXNQdWJsaXNoZWQoIHJlcG8gKTtcclxuXHJcbiAgYXdhaXQgY2hlY2tvdXRUYXJnZXQoIHJlcG8sIGJyYW5jaCwgdHJ1ZSApOyAvLyBpbmNsdWRlIG5wbSB1cGRhdGVcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHByZXZpb3VzVmVyc2lvbiA9IGF3YWl0IGdldFJlcG9WZXJzaW9uKCByZXBvICk7XHJcbiAgICBsZXQgdmVyc2lvbjtcclxuICAgIGxldCB2ZXJzaW9uQ2hhbmdlZDtcclxuXHJcbiAgICBpZiAoIHByZXZpb3VzVmVyc2lvbi50ZXN0VHlwZSA9PT0gbnVsbCApIHtcclxuICAgICAgaWYgKCBub25pbnRlcmFjdGl2ZSB8fCAhYXdhaXQgYm9vbGVhblByb21wdCggYFRoZSBsYXN0IGRlcGxveW1lbnQgd2FzIGEgcHJvZHVjdGlvbiBkZXBsb3ltZW50ICgke3ByZXZpb3VzVmVyc2lvbi50b1N0cmluZygpfSkgYW5kIGFuIFJDIHZlcnNpb24gaXMgcmVxdWlyZWQgYmV0d2VlbiBwcm9kdWN0aW9uIHZlcnNpb25zLiBXb3VsZCB5b3UgbGlrZSB0byByZWRlcGxveSAke3ByZXZpb3VzVmVyc2lvbi50b1N0cmluZygpfSAoeSkgb3IgY2FuY2VsIHRoaXMgcHJvY2VzcyBhbmQgcmV2ZXJ0IHRvIG1hc3RlciAoTilgLCBmYWxzZSApICkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvciggJ0Fib3J0ZWQgcHJvZHVjdGlvbiBkZXBsb3ltZW50OiBJdCBhcHBlYXJzIHRoYXQgdGhlIGxhc3QgZGVwbG95bWVudCB3YXMgZm9yIHByb2R1Y3Rpb24uJyApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2ZXJzaW9uID0gcHJldmlvdXNWZXJzaW9uO1xyXG4gICAgICB2ZXJzaW9uQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoIHByZXZpb3VzVmVyc2lvbi50ZXN0VHlwZSA9PT0gJ3JjJyApIHtcclxuICAgICAgdmVyc2lvbiA9IG5ldyBTaW1WZXJzaW9uKCBwcmV2aW91c1ZlcnNpb24ubWFqb3IsIHByZXZpb3VzVmVyc2lvbi5taW5vciwgcHJldmlvdXNWZXJzaW9uLm1haW50ZW5hbmNlICk7XHJcbiAgICAgIHZlcnNpb25DaGFuZ2VkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoICdBYm9ydGVkIHByb2R1Y3Rpb24gZGVwbG95bWVudCBzaW5jZSB0aGUgdmVyc2lvbiBudW1iZXIgY2Fubm90IGJlIGluY3JlbWVudGVkIHNhZmVseScgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc0ZpcnN0VmVyc2lvbiA9ICEoIGF3YWl0IHNpbU1ldGFkYXRhKCB7XHJcbiAgICAgIHNpbXVsYXRpb246IHJlcG9cclxuICAgIH0gKSApLnByb2plY3RzO1xyXG5cclxuICAgIC8vIEluaXRpYWwgZGVwbG95bWVudCBuYWdzXHJcbiAgICBpZiAoIGlzRmlyc3RWZXJzaW9uICkge1xyXG4gICAgICBpZiAoICFhd2FpdCBib29sZWFuUHJvbXB0KCAnSXMgdGhlIG1hc3RlciBjaGVja2xpc3QgY29tcGxldGUgKGUuZy4gYXJlIHNjcmVlbnNob3RzIGFkZGVkIHRvIGFzc2V0cywgZXRjLiknLCBub25pbnRlcmFjdGl2ZSApICkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvciggJ0Fib3J0ZWQgcHJvZHVjdGlvbiBkZXBsb3ltZW50JyApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmVyc2lvblN0cmluZyA9IHZlcnNpb24udG9TdHJpbmcoKTtcclxuXHJcbiAgICAvLyBjYXBzLWxvY2sgc2hvdWxkIGhvcGVmdWxseSBzaG91dCB0aGlzIGF0IHBlb3BsZS4gZG8gd2UgaGF2ZSBhIHRleHQtdG8tc3BlZWNoIHN5bnRoZXNpemVyIHdlIGNhbiBzaG91dCBvdXQgb2YgdGhlaXIgc3BlYWtlcnM/XHJcbiAgICAvLyBTRUNPTkQgVEhPVUdIVDogdGhpcyB3b3VsZCBiZSBob3JyaWJsZSBkdXJpbmcgYXV0b21hdGVkIG1haW50ZW5hbmNlIHJlbGVhc2VzLlxyXG4gICAgaWYgKCAhYXdhaXQgYm9vbGVhblByb21wdCggYERFUExPWSAke3JlcG99ICR7dmVyc2lvblN0cmluZ30gKGJyYW5kczogJHticmFuZHMuam9pbiggJywnICl9KSB0byBQUk9EVUNUSU9OYCwgbm9uaW50ZXJhY3RpdmUgKSApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCAnQWJvcnRlZCBwcm9kdWN0aW9uIGRlcGxveW1lbnQnICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCB2ZXJzaW9uQ2hhbmdlZCApIHtcclxuICAgICAgYXdhaXQgc2V0UmVwb1ZlcnNpb24oIHJlcG8sIHZlcnNpb24sIG1lc3NhZ2UgKTtcclxuICAgICAgYXdhaXQgZ2l0UHVzaCggcmVwbywgYnJhbmNoICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTWFrZSBzdXJlIG91ciBjb3JyZWN0IG5wbSBkZXBlbmRlbmNpZXMgYXJlIHNldFxyXG4gICAgYXdhaXQgbnBtVXBkYXRlKCByZXBvICk7XHJcbiAgICBhd2FpdCBucG1VcGRhdGUoICdjaGlwcGVyJyApO1xyXG4gICAgYXdhaXQgbnBtVXBkYXRlKCAncGVyZW5uaWFsLWFsaWFzJyApO1xyXG5cclxuICAgIC8vIFVwZGF0ZSB0aGUgUkVBRE1FIG9uIHRoZSBicmFuY2hcclxuICAgIGlmICggcHVibGlzaGVkICkge1xyXG4gICAgICBncnVudC5sb2cud3JpdGVsbiggJ1VwZGF0aW5nIGJyYW5jaCBSRUFETUUnICk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgZXhlY3V0ZSggZ3J1bnRDb21tYW5kLCBbICdwdWJsaXNoZWQtUkVBRE1FJyBdLCBgLi4vJHtyZXBvfWAgKTtcclxuICAgICAgfVxyXG4gICAgICBjYXRjaCggZSApIHtcclxuICAgICAgICBncnVudC5sb2cud3JpdGVsbiggJ3B1Ymxpc2hlZC1SRUFETUUgZXJyb3IsIG1heSBub3QgZXhpc3QsIHdpbGwgdHJ5IGdlbmVyYXRlLXB1Ymxpc2hlZC1SRUFETUUnICk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGF3YWl0IGV4ZWN1dGUoIGdydW50Q29tbWFuZCwgWyAnZ2VuZXJhdGUtcHVibGlzaGVkLVJFQURNRScgXSwgYC4uLyR7cmVwb31gICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKCBlICkge1xyXG4gICAgICAgICAgZ3J1bnQubG9nLndyaXRlbG4oICdObyBwdWJsaXNoZWQgUkVBRE1FIGdlbmVyYXRpb24gZm91bmQnICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGF3YWl0IGdpdEFkZCggcmVwbywgJ1JFQURNRS5tZCcgKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBnaXRDb21taXQoIHJlcG8sIGBHZW5lcmF0ZWQgcHVibGlzaGVkIFJFQURNRS5tZCBhcyBwYXJ0IG9mIGEgcHJvZHVjdGlvbiBkZXBsb3kgZm9yICR7dmVyc2lvblN0cmluZ31gICk7XHJcbiAgICAgICAgYXdhaXQgZ2l0UHVzaCggcmVwbywgYnJhbmNoICk7XHJcbiAgICAgIH1cclxuICAgICAgY2F0Y2goIGUgKSB7XHJcbiAgICAgICAgZ3J1bnQubG9nLndyaXRlbG4oICdQcm9kdWN0aW9uIFJFQURNRSBpcyBhbHJlYWR5IHVwLXRvLWRhdGUnICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBObyBzcGVjaWFsIG9wdGlvbnMgcmVxdWlyZWQgaGVyZSwgYXMgd2Ugc2VuZCB0aGUgbWFpbiByZXF1ZXN0IHRvIHRoZSBidWlsZCBzZXJ2ZXJcclxuICAgIGdydW50LmxvZy53cml0ZWxuKCBhd2FpdCBidWlsZCggcmVwbywge1xyXG4gICAgICBicmFuZHM6IGJyYW5kc1xyXG4gICAgfSApICk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmVjZXNzYXJ5IGNsZWFuIHVwIHN0ZXBzIHRvIGRvIGlmIGFib3J0aW5nIGFmdGVyIHRoZSBidWlsZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBtZXNzYWdlIHRvIGVycm9yIG91dCB3aXRoXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZS48dm9pZD59XHJcbiAgICAgKi9cclxuICAgIGNvbnN0IHBvc3RCdWlsZEFib3J0ID0gYXN5bmMgbWVzc2FnZSA9PiB7XHJcblxyXG4gICAgICAvLyBBYm9ydCB2ZXJzaW9uIHVwZGF0ZVxyXG4gICAgICBpZiAoIHZlcnNpb25DaGFuZ2VkICkge1xyXG4gICAgICAgIGF3YWl0IHNldFJlcG9WZXJzaW9uKCByZXBvLCBwcmV2aW91c1ZlcnNpb24sIG1lc3NhZ2UgKTtcclxuICAgICAgICBhd2FpdCBnaXRQdXNoKCByZXBvLCBicmFuY2ggKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQWJvcnQgY2hlY2tvdXQsICh3aWxsIGJlIGNhdWdodCBhbmQgbWFzdGVyIHdpbGwgYmUgY2hlY2tlZCBvdXRcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCBtZXNzYWdlICk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBpZiAoICFhd2FpdCBib29sZWFuUHJvbXB0KCBgUGxlYXNlIHRlc3QgdGhlIGJ1aWx0IHZlcnNpb24gb2YgJHtyZXBvfS5cXG5JcyBpdCByZWFkeSB0byBkZXBsb3k/YCwgbm9uaW50ZXJhY3RpdmUgKSApIHtcclxuICAgICAgYXdhaXQgcG9zdEJ1aWxkQWJvcnQoICdBYm9ydGVkIHByb2R1Y3Rpb24gZGVwbG95bWVudCAoYWJvcnRlZCB2ZXJzaW9uIGNoYW5nZSB0b28pLicgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb3ZlIG92ZXIgZGVwZW5kZW5jaWVzLmpzb24gYW5kIGNvbW1pdC9wdXNoXHJcbiAgICBhd2FpdCB1cGRhdGVEZXBlbmRlbmNpZXNKU09OKCByZXBvLCBicmFuZHMsIHZlcnNpb25TdHJpbmcsIGJyYW5jaCApO1xyXG5cclxuICAgIC8vIFNlbmQgdGhlIGJ1aWxkIHJlcXVlc3RcclxuICAgIGF3YWl0IGJ1aWxkU2VydmVyUmVxdWVzdCggcmVwbywgdmVyc2lvbiwgYnJhbmNoLCBhd2FpdCBnZXREZXBlbmRlbmNpZXMoIHJlcG8gKSwge1xyXG4gICAgICBsb2NhbGVzOiAnKicsXHJcbiAgICAgIGJyYW5kczogYnJhbmRzLFxyXG4gICAgICBzZXJ2ZXJzOiBbICdkZXYnLCAncHJvZHVjdGlvbicgXVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIE1vdmUgYmFjayB0byBtYXN0ZXJcclxuICAgIGF3YWl0IGNoZWNrb3V0TWFzdGVyKCByZXBvLCB0cnVlICk7XHJcblxyXG4gICAgaWYgKCBicmFuZHMuaW5jbHVkZXMoICdwaGV0JyApICkge1xyXG4gICAgICBncnVudC5sb2cud3JpdGVsbiggYERlcGxveWVkOiBodHRwczovL3BoZXQuY29sb3JhZG8uZWR1L3NpbXMvaHRtbC8ke3JlcG99L2xhdGVzdC8ke3JlcG99X2FsbC5odG1sYCApO1xyXG4gICAgfVxyXG4gICAgaWYgKCBicmFuZHMuaW5jbHVkZXMoICdwaGV0LWlvJyApICkge1xyXG4gICAgICBncnVudC5sb2cud3JpdGVsbiggYERlcGxveWVkOiBodHRwczovL3BoZXQtaW8uY29sb3JhZG8uZWR1L3NpbXMvJHtyZXBvfS8ke3ZlcnNpb25TdHJpbmd9L2AgKTtcclxuICAgIH1cclxuXHJcbiAgICBncnVudC5sb2cud3JpdGVsbiggJ1BsZWFzZSB3YWl0IGZvciB0aGUgYnVpbGQtc2VydmVyIHRvIGNvbXBsZXRlIHRoZSBkZXBsb3ltZW50LCBhbmQgdGhlbiB0ZXN0IScgKTtcclxuXHJcbiAgICBpZiAoIGlzRmlyc3RWZXJzaW9uICYmIGJyYW5kcy5pbmNsdWRlcyggJ3BoZXQnICkgKSB7XHJcbiAgICAgIGdydW50LmxvZy53cml0ZWxuKCAnQWZ0ZXIgdGVzdGluZywgbGV0IHRoZSBzaW11bGF0aW9uIGxlYWQga25vdyBpdCBoYXMgYmVlbiBkZXBsb3llZCwgc28gdGhleSBjYW4gZWRpdCBtZXRhZGF0YSBvbiB0aGUgd2Vic2l0ZScgKTtcclxuXHJcbiAgICAgIC8vIFVwZGF0ZSB0aGUgUkVBRE1FIG9uIG1hc3RlclxyXG4gICAgICBpZiAoIHB1Ymxpc2hlZCApIHtcclxuICAgICAgICBncnVudC5sb2cud3JpdGVsbiggJ1VwZGF0aW5nIG1hc3RlciBSRUFETUUnICk7XHJcbiAgICAgICAgYXdhaXQgZXhlY3V0ZSggZ3J1bnRDb21tYW5kLCBbICdwdWJsaXNoZWQtUkVBRE1FJyBdLCBgLi4vJHtyZXBvfWAgKTtcclxuICAgICAgICBhd2FpdCBnaXRBZGQoIHJlcG8sICdSRUFETUUubWQnICk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGF3YWl0IGdpdENvbW1pdCggcmVwbywgYEdlbmVyYXRlZCBwdWJsaXNoZWQgUkVBRE1FLm1kIGFzIHBhcnQgb2YgYSBwcm9kdWN0aW9uIGRlcGxveSBmb3IgJHt2ZXJzaW9uU3RyaW5nfWAgKTtcclxuICAgICAgICAgIGF3YWl0IGdpdFB1c2goIHJlcG8sICdtYXN0ZXInICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKCBlICkge1xyXG4gICAgICAgICAgZ3J1bnQubG9nLndyaXRlbG4oICdQcm9kdWN0aW9uIFJFQURNRSBpcyBhbHJlYWR5IHVwLXRvLWRhdGUnICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcGhldC1pbyBuYWdzIGZyb20gdGhlIGNoZWNrbGlzdFxyXG4gICAgaWYgKCBicmFuZHMuaW5jbHVkZXMoICdwaGV0LWlvJyApICkge1xyXG4gICAgICBjb25zdCBwaGV0aW9Mb2dUZXh0ID0gYFxyXG5QaEVULWlPIGRlcGxveXMgaW52b2x2ZSBhIGNvdXBsZSBvZiBleHRyYSBzdGVwcyBhZnRlciBwcm9kdWN0aW9uLiBQbGVhc2UgZW5zdXJlIHRoZSBmb2xsb3dpbmcgYXJlIGFjY29tcGxpc2hlZDpcclxuMS4gTWFrZSBzdXJlIHRoZSBzaW0gaXMgbGlzdGVkIGluIHBlcmVubmlhbC9kYXRhL3BoZXQtaW8tYXBpLXN0YWJsZSBpZiBpdCBoYXMgaGFkIGEgZGVzaWduZWQgcHJvZHVjdGlvbiByZWxlYXNlXHJcbjIuIENyZWF0ZSBhbiBpc3N1ZSBpbiB0aGUgcGhldC1pbyByZXBvIGFuZCBhc3NpZ24gdG8gQGthdGh5LXBoZXQgdG8gdXBkYXRlIHRoZSBtYWluIFwiUGhFVC1pTyBTaW11bGF0aW9uc1wiIHNwcmVhZHNoZWV0IGZyb20gdGhpcyBuZXcgcHVibGljYXRpb24uIChodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9zcHJlYWRzaGVldHMvZC8xOF9RTkd1VnRZdHhPRUtHOXhSQnNfUFNRcHl2enlTRjFHazVwdVItNUZ2NC9lZGl0I2dpZD0xODgxNzY3MzU0KVxyXG4gICAgICBgO1xyXG4gICAgICBncnVudC5sb2cud3JpdGVsbiggcGhldGlvTG9nVGV4dCApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2ZXJzaW9uO1xyXG4gIH1cclxuICBjYXRjaCggZSApIHtcclxuICAgIGdydW50LmxvZy53YXJuKCAnRGV0ZWN0ZWQgZmFpbHVyZSBkdXJpbmcgZGVwbG95LCByZXZlcnRpbmcgdG8gbWFzdGVyJyApO1xyXG4gICAgYXdhaXQgY2hlY2tvdXRNYXN0ZXIoIHJlcG8sIHRydWUgKTtcclxuICAgIHRocm93IGU7XHJcbiAgfVxyXG59O1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUUsc0JBQXVCLENBQUM7QUFDcEQsTUFBTUMsYUFBYSxHQUFHRCxPQUFPLENBQUUseUJBQTBCLENBQUM7QUFDMUQsTUFBTUUsS0FBSyxHQUFHRixPQUFPLENBQUUsaUJBQWtCLENBQUM7QUFDMUMsTUFBTUcsa0JBQWtCLEdBQUdILE9BQU8sQ0FBRSw4QkFBK0IsQ0FBQztBQUNwRSxNQUFNSSxjQUFjLEdBQUdKLE9BQU8sQ0FBRSwwQkFBMkIsQ0FBQztBQUM1RCxNQUFNSyxjQUFjLEdBQUdMLE9BQU8sQ0FBRSwwQkFBMkIsQ0FBQztBQUM1RCxNQUFNTSxPQUFPLEdBQUdOLE9BQU8sQ0FBRSxtQkFBb0IsQ0FBQztBQUM5QyxNQUFNTyxlQUFlLEdBQUdQLE9BQU8sQ0FBRSwyQkFBNEIsQ0FBQztBQUM5RCxNQUFNUSxjQUFjLEdBQUdSLE9BQU8sQ0FBRSwwQkFBMkIsQ0FBQztBQUM1RCxNQUFNUyxNQUFNLEdBQUdULE9BQU8sQ0FBRSxrQkFBbUIsQ0FBQztBQUM1QyxNQUFNVSxTQUFTLEdBQUdWLE9BQU8sQ0FBRSxxQkFBc0IsQ0FBQztBQUNsRCxNQUFNVyxVQUFVLEdBQUdYLE9BQU8sQ0FBRSxzQkFBdUIsQ0FBQztBQUNwRCxNQUFNWSxPQUFPLEdBQUdaLE9BQU8sQ0FBRSxtQkFBb0IsQ0FBQztBQUM5QyxNQUFNYSxLQUFLLEdBQUdiLE9BQU8sQ0FBRSxPQUFRLENBQUM7QUFDaEMsTUFBTWMsWUFBWSxHQUFHZCxPQUFPLENBQUUsd0JBQXlCLENBQUM7QUFDeEQsTUFBTWUsZUFBZSxHQUFHZixPQUFPLENBQUUsMkJBQTRCLENBQUM7QUFDOUQs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