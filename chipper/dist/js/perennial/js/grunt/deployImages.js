// Copyright 2020, University of Colorado Boulder

/**
 * Sends a request to the build server.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

// modules
const buildLocal = require('../common/buildLocal');
const winston = require('winston');
const axios = require('axios');

/**
 * Sends a request to the build server.
 * @public
 *
 * @param {Object} [options]
 * @property {string} options.branch
 * @property {string} options.brands - CSV
 * @property {string} options.simulation - sim name
 * @returns {Promise} - No resolved value
 */
const deployImages = async function ({
  branch,
  brands,
  simulation
}) {
  const requestObject = {
    brands: brands || 'phet',
    branch: branch || 'master',
    authorizationCode: buildLocal.buildServerAuthorizationCode
  };
  if (buildLocal.buildServerNotifyEmail) {
    requestObject.email = buildLocal.buildServerNotifyEmail;
  }
  if (simulation) {
    requestObject.simulation = simulation;
    try {
      const metadataResponse = await axios.get(`https://phet.colorado.edu/services/metadata/1.2/simulations?format=json&summary&locale=en&type=html&simulation=${simulation}`);
      if (metadataResponse.data && metadataResponse.data?.projects?.[0]?.version?.string) {
        requestObject.version = metadataResponse.data.projects[0].version.string;
      } else {
        console.error('Unable to find version for simulation', metadataResponse.data);
        return;
      }
    } catch (e) {
      console.error('Unable to deploy images for sim due to error in metadata retrival', e);
      return;
    }
  }
  winston.info(`sending image deploy request for ${requestObject.branch}, ${requestObject.brands}`);
  const url = `${buildLocal.productionServerURL}/deploy-images`;
  winston.info(url);
  winston.info(JSON.stringify(requestObject));
  let response;
  try {
    response = await axios({
      method: 'post',
      url: url,
      data: requestObject
    });
  } catch (error) {
    throw new Error(`Image deploy request failed with error ${error}.`);
  }
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(`Image deploy request failed with status code ${response.status}.`);
  } else {
    winston.info('Image deploy request sent successfully.  If additional alternative images were deployed, go to the main admin page and trigger a recount.');
  }
};
module.exports = deployImages;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJidWlsZExvY2FsIiwicmVxdWlyZSIsIndpbnN0b24iLCJheGlvcyIsImRlcGxveUltYWdlcyIsImJyYW5jaCIsImJyYW5kcyIsInNpbXVsYXRpb24iLCJyZXF1ZXN0T2JqZWN0IiwiYXV0aG9yaXphdGlvbkNvZGUiLCJidWlsZFNlcnZlckF1dGhvcml6YXRpb25Db2RlIiwiYnVpbGRTZXJ2ZXJOb3RpZnlFbWFpbCIsImVtYWlsIiwibWV0YWRhdGFSZXNwb25zZSIsImdldCIsImRhdGEiLCJwcm9qZWN0cyIsInZlcnNpb24iLCJzdHJpbmciLCJjb25zb2xlIiwiZXJyb3IiLCJlIiwiaW5mbyIsInVybCIsInByb2R1Y3Rpb25TZXJ2ZXJVUkwiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzcG9uc2UiLCJtZXRob2QiLCJFcnJvciIsInN0YXR1cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyJkZXBsb3lJbWFnZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjAsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFNlbmRzIGEgcmVxdWVzdCB0byB0aGUgYnVpbGQgc2VydmVyLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEpvbmF0aGFuIE9sc29uIDxqb25hdGhhbi5vbHNvbkBjb2xvcmFkby5lZHU+XHJcbiAqL1xyXG5cclxuLy8gbW9kdWxlc1xyXG5jb25zdCBidWlsZExvY2FsID0gcmVxdWlyZSggJy4uL2NvbW1vbi9idWlsZExvY2FsJyApO1xyXG5jb25zdCB3aW5zdG9uID0gcmVxdWlyZSggJ3dpbnN0b24nICk7XHJcbmNvbnN0IGF4aW9zID0gcmVxdWlyZSggJ2F4aW9zJyApO1xyXG5cclxuLyoqXHJcbiAqIFNlbmRzIGEgcmVxdWVzdCB0byB0aGUgYnVpbGQgc2VydmVyLlxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IG9wdGlvbnMuYnJhbmNoXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBvcHRpb25zLmJyYW5kcyAtIENTVlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gb3B0aW9ucy5zaW11bGF0aW9uIC0gc2ltIG5hbWVcclxuICogQHJldHVybnMge1Byb21pc2V9IC0gTm8gcmVzb2x2ZWQgdmFsdWVcclxuICovXHJcbmNvbnN0IGRlcGxveUltYWdlcyA9IGFzeW5jIGZ1bmN0aW9uKCB7IGJyYW5jaCwgYnJhbmRzLCBzaW11bGF0aW9uIH0gKSB7XHJcbiAgY29uc3QgcmVxdWVzdE9iamVjdCA9IHtcclxuICAgIGJyYW5kczogYnJhbmRzIHx8ICdwaGV0JyxcclxuICAgIGJyYW5jaDogYnJhbmNoIHx8ICdtYXN0ZXInLFxyXG4gICAgYXV0aG9yaXphdGlvbkNvZGU6IGJ1aWxkTG9jYWwuYnVpbGRTZXJ2ZXJBdXRob3JpemF0aW9uQ29kZVxyXG4gIH07XHJcbiAgaWYgKCBidWlsZExvY2FsLmJ1aWxkU2VydmVyTm90aWZ5RW1haWwgKSB7XHJcbiAgICByZXF1ZXN0T2JqZWN0LmVtYWlsID0gYnVpbGRMb2NhbC5idWlsZFNlcnZlck5vdGlmeUVtYWlsO1xyXG4gIH1cclxuICBpZiAoIHNpbXVsYXRpb24gKSB7XHJcbiAgICByZXF1ZXN0T2JqZWN0LnNpbXVsYXRpb24gPSBzaW11bGF0aW9uO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgbWV0YWRhdGFSZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldCggYGh0dHBzOi8vcGhldC5jb2xvcmFkby5lZHUvc2VydmljZXMvbWV0YWRhdGEvMS4yL3NpbXVsYXRpb25zP2Zvcm1hdD1qc29uJnN1bW1hcnkmbG9jYWxlPWVuJnR5cGU9aHRtbCZzaW11bGF0aW9uPSR7c2ltdWxhdGlvbn1gICk7XHJcbiAgICAgIGlmICggbWV0YWRhdGFSZXNwb25zZS5kYXRhICYmIG1ldGFkYXRhUmVzcG9uc2UuZGF0YT8ucHJvamVjdHM/LlsgMCBdPy52ZXJzaW9uPy5zdHJpbmcgKSB7XHJcbiAgICAgICAgcmVxdWVzdE9iamVjdC52ZXJzaW9uID0gbWV0YWRhdGFSZXNwb25zZS5kYXRhLnByb2plY3RzWyAwIF0udmVyc2lvbi5zdHJpbmc7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvciggJ1VuYWJsZSB0byBmaW5kIHZlcnNpb24gZm9yIHNpbXVsYXRpb24nLCBtZXRhZGF0YVJlc3BvbnNlLmRhdGEgKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoKCBlICkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCAnVW5hYmxlIHRvIGRlcGxveSBpbWFnZXMgZm9yIHNpbSBkdWUgdG8gZXJyb3IgaW4gbWV0YWRhdGEgcmV0cml2YWwnLCBlICk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHdpbnN0b24uaW5mbyggYHNlbmRpbmcgaW1hZ2UgZGVwbG95IHJlcXVlc3QgZm9yICR7cmVxdWVzdE9iamVjdC5icmFuY2h9LCAke3JlcXVlc3RPYmplY3QuYnJhbmRzfWAgKTtcclxuXHJcbiAgY29uc3QgdXJsID0gYCR7YnVpbGRMb2NhbC5wcm9kdWN0aW9uU2VydmVyVVJMfS9kZXBsb3ktaW1hZ2VzYDtcclxuXHJcbiAgd2luc3Rvbi5pbmZvKCB1cmwgKTtcclxuICB3aW5zdG9uLmluZm8oIEpTT04uc3RyaW5naWZ5KCByZXF1ZXN0T2JqZWN0ICkgKTtcclxuXHJcbiAgbGV0IHJlc3BvbnNlO1xyXG4gIHRyeSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGF4aW9zKCB7IG1ldGhvZDogJ3Bvc3QnLCB1cmw6IHVybCwgZGF0YTogcmVxdWVzdE9iamVjdCB9ICk7XHJcbiAgfVxyXG4gIGNhdGNoKCBlcnJvciApIHtcclxuICAgIHRocm93IG5ldyBFcnJvciggYEltYWdlIGRlcGxveSByZXF1ZXN0IGZhaWxlZCB3aXRoIGVycm9yICR7ZXJyb3J9LmAgKTtcclxuICB9XHJcblxyXG4gIGlmICggcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDIgKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoIGBJbWFnZSBkZXBsb3kgcmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAke3Jlc3BvbnNlLnN0YXR1c30uYCApO1xyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIHdpbnN0b24uaW5mbyggJ0ltYWdlIGRlcGxveSByZXF1ZXN0IHNlbnQgc3VjY2Vzc2Z1bGx5LiAgSWYgYWRkaXRpb25hbCBhbHRlcm5hdGl2ZSBpbWFnZXMgd2VyZSBkZXBsb3llZCwgZ28gdG8gdGhlIG1haW4gYWRtaW4gcGFnZSBhbmQgdHJpZ2dlciBhIHJlY291bnQuJyApO1xyXG4gIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGVwbG95SW1hZ2VzOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU1BLFVBQVUsR0FBR0MsT0FBTyxDQUFFLHNCQUF1QixDQUFDO0FBQ3BELE1BQU1DLE9BQU8sR0FBR0QsT0FBTyxDQUFFLFNBQVUsQ0FBQztBQUNwQyxNQUFNRSxLQUFLLEdBQUdGLE9BQU8sQ0FBRSxPQUFRLENBQUM7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTUcsWUFBWSxHQUFHLGVBQUFBLENBQWdCO0VBQUVDLE1BQU07RUFBRUMsTUFBTTtFQUFFQztBQUFXLENBQUMsRUFBRztFQUNwRSxNQUFNQyxhQUFhLEdBQUc7SUFDcEJGLE1BQU0sRUFBRUEsTUFBTSxJQUFJLE1BQU07SUFDeEJELE1BQU0sRUFBRUEsTUFBTSxJQUFJLFFBQVE7SUFDMUJJLGlCQUFpQixFQUFFVCxVQUFVLENBQUNVO0VBQ2hDLENBQUM7RUFDRCxJQUFLVixVQUFVLENBQUNXLHNCQUFzQixFQUFHO0lBQ3ZDSCxhQUFhLENBQUNJLEtBQUssR0FBR1osVUFBVSxDQUFDVyxzQkFBc0I7RUFDekQ7RUFDQSxJQUFLSixVQUFVLEVBQUc7SUFDaEJDLGFBQWEsQ0FBQ0QsVUFBVSxHQUFHQSxVQUFVO0lBQ3JDLElBQUk7TUFDRixNQUFNTSxnQkFBZ0IsR0FBRyxNQUFNVixLQUFLLENBQUNXLEdBQUcsQ0FBRyxrSEFBaUhQLFVBQVcsRUFBRSxDQUFDO01BQzFLLElBQUtNLGdCQUFnQixDQUFDRSxJQUFJLElBQUlGLGdCQUFnQixDQUFDRSxJQUFJLEVBQUVDLFFBQVEsR0FBSSxDQUFDLENBQUUsRUFBRUMsT0FBTyxFQUFFQyxNQUFNLEVBQUc7UUFDdEZWLGFBQWEsQ0FBQ1MsT0FBTyxHQUFHSixnQkFBZ0IsQ0FBQ0UsSUFBSSxDQUFDQyxRQUFRLENBQUUsQ0FBQyxDQUFFLENBQUNDLE9BQU8sQ0FBQ0MsTUFBTTtNQUM1RSxDQUFDLE1BQ0k7UUFDSEMsT0FBTyxDQUFDQyxLQUFLLENBQUUsdUNBQXVDLEVBQUVQLGdCQUFnQixDQUFDRSxJQUFLLENBQUM7UUFDL0U7TUFDRjtJQUNGLENBQUMsQ0FDRCxPQUFPTSxDQUFDLEVBQUc7TUFDVEYsT0FBTyxDQUFDQyxLQUFLLENBQUUsbUVBQW1FLEVBQUVDLENBQUUsQ0FBQztNQUN2RjtJQUNGO0VBQ0Y7RUFFQW5CLE9BQU8sQ0FBQ29CLElBQUksQ0FBRyxvQ0FBbUNkLGFBQWEsQ0FBQ0gsTUFBTyxLQUFJRyxhQUFhLENBQUNGLE1BQU8sRUFBRSxDQUFDO0VBRW5HLE1BQU1pQixHQUFHLEdBQUksR0FBRXZCLFVBQVUsQ0FBQ3dCLG1CQUFvQixnQkFBZTtFQUU3RHRCLE9BQU8sQ0FBQ29CLElBQUksQ0FBRUMsR0FBSSxDQUFDO0VBQ25CckIsT0FBTyxDQUFDb0IsSUFBSSxDQUFFRyxJQUFJLENBQUNDLFNBQVMsQ0FBRWxCLGFBQWMsQ0FBRSxDQUFDO0VBRS9DLElBQUltQixRQUFRO0VBQ1osSUFBSTtJQUNGQSxRQUFRLEdBQUcsTUFBTXhCLEtBQUssQ0FBRTtNQUFFeUIsTUFBTSxFQUFFLE1BQU07TUFBRUwsR0FBRyxFQUFFQSxHQUFHO01BQUVSLElBQUksRUFBRVA7SUFBYyxDQUFFLENBQUM7RUFDN0UsQ0FBQyxDQUNELE9BQU9ZLEtBQUssRUFBRztJQUNiLE1BQU0sSUFBSVMsS0FBSyxDQUFHLDBDQUF5Q1QsS0FBTSxHQUFHLENBQUM7RUFDdkU7RUFFQSxJQUFLTyxRQUFRLENBQUNHLE1BQU0sS0FBSyxHQUFHLElBQUlILFFBQVEsQ0FBQ0csTUFBTSxLQUFLLEdBQUcsRUFBRztJQUN4RCxNQUFNLElBQUlELEtBQUssQ0FBRyxnREFBK0NGLFFBQVEsQ0FBQ0csTUFBTyxHQUFHLENBQUM7RUFDdkYsQ0FBQyxNQUNJO0lBQ0g1QixPQUFPLENBQUNvQixJQUFJLENBQUUsMklBQTRJLENBQUM7RUFDN0o7QUFDRixDQUFDO0FBRURTLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHNUIsWUFBWSJ9