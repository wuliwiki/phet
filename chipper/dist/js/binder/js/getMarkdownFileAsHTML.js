// Copyright 2018-2021, University of Colorado Boulder

/**
 * Get the hand written markdown file for a component. Return the converted HTML from the markdown converted by "marked"
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

// modules
const fs = require('fs');
const marked = require('marked');

/**
 * This markdown file is converted to HTML with the 'marked' module.
 * @param {string} repo
 * @param {string} component
 * @returns {string} - HTML
 */
module.exports = function (repo, component) {
  let markdown = '';
  try {
    const m = fs.readFileSync(`${__dirname}/../../${repo}/docs/${component}.md`);
    markdown = marked(m.toString());

    // Use subdirectory for images, so that different directories can have images of the same name
    // TODO: This may yield false positives, say if code examples have this same term, see https://github.com/phetsims/binder/issues/28
    markdown = markdown.split('<img src="images/').join(`<img src="images/${repo}/`);
  } catch (e) {
    markdown = marked('# TODO: *documentation*');
  }
  return markdown;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJtYXJrZWQiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVwbyIsImNvbXBvbmVudCIsIm1hcmtkb3duIiwibSIsInJlYWRGaWxlU3luYyIsIl9fZGlybmFtZSIsInRvU3RyaW5nIiwic3BsaXQiLCJqb2luIiwiZSJdLCJzb3VyY2VzIjpbImdldE1hcmtkb3duRmlsZUFzSFRNTC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGhhbmQgd3JpdHRlbiBtYXJrZG93biBmaWxlIGZvciBhIGNvbXBvbmVudC4gUmV0dXJuIHRoZSBjb252ZXJ0ZWQgSFRNTCBmcm9tIHRoZSBtYXJrZG93biBjb252ZXJ0ZWQgYnkgXCJtYXJrZWRcIlxyXG4gKiBAYXV0aG9yIE1pY2hhZWwgS2F1em1hbm4gKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqL1xyXG5cclxuXHJcbi8vIG1vZHVsZXNcclxuY29uc3QgZnMgPSByZXF1aXJlKCAnZnMnICk7XHJcbmNvbnN0IG1hcmtlZCA9IHJlcXVpcmUoICdtYXJrZWQnICk7XHJcblxyXG4vKipcclxuICogVGhpcyBtYXJrZG93biBmaWxlIGlzIGNvbnZlcnRlZCB0byBIVE1MIHdpdGggdGhlICdtYXJrZWQnIG1vZHVsZS5cclxuICogQHBhcmFtIHtzdHJpbmd9IHJlcG9cclxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtIEhUTUxcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oIHJlcG8sIGNvbXBvbmVudCApIHtcclxuXHJcbiAgbGV0IG1hcmtkb3duID0gJyc7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IG0gPSBmcy5yZWFkRmlsZVN5bmMoIGAke19fZGlybmFtZX0vLi4vLi4vJHtyZXBvfS9kb2NzLyR7Y29tcG9uZW50fS5tZGAgKTtcclxuICAgIG1hcmtkb3duID0gbWFya2VkKCBtLnRvU3RyaW5nKCkgKTtcclxuXHJcbiAgICAvLyBVc2Ugc3ViZGlyZWN0b3J5IGZvciBpbWFnZXMsIHNvIHRoYXQgZGlmZmVyZW50IGRpcmVjdG9yaWVzIGNhbiBoYXZlIGltYWdlcyBvZiB0aGUgc2FtZSBuYW1lXHJcbiAgICAvLyBUT0RPOiBUaGlzIG1heSB5aWVsZCBmYWxzZSBwb3NpdGl2ZXMsIHNheSBpZiBjb2RlIGV4YW1wbGVzIGhhdmUgdGhpcyBzYW1lIHRlcm0sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vcGhldHNpbXMvYmluZGVyL2lzc3Vlcy8yOFxyXG4gICAgbWFya2Rvd24gPSBtYXJrZG93bi5zcGxpdCggJzxpbWcgc3JjPVwiaW1hZ2VzLycgKS5qb2luKCBgPGltZyBzcmM9XCJpbWFnZXMvJHtyZXBvfS9gICk7XHJcbiAgfVxyXG4gIGNhdGNoKCBlICkge1xyXG4gICAgbWFya2Rvd24gPSBtYXJrZWQoICcjIFRPRE86ICpkb2N1bWVudGF0aW9uKicgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBtYXJrZG93bjtcclxufTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBLE1BQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFFLElBQUssQ0FBQztBQUMxQixNQUFNQyxNQUFNLEdBQUdELE9BQU8sQ0FBRSxRQUFTLENBQUM7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBRSxNQUFNLENBQUNDLE9BQU8sR0FBRyxVQUFVQyxJQUFJLEVBQUVDLFNBQVMsRUFBRztFQUUzQyxJQUFJQyxRQUFRLEdBQUcsRUFBRTtFQUNqQixJQUFJO0lBQ0YsTUFBTUMsQ0FBQyxHQUFHUixFQUFFLENBQUNTLFlBQVksQ0FBRyxHQUFFQyxTQUFVLFVBQVNMLElBQUssU0FBUUMsU0FBVSxLQUFLLENBQUM7SUFDOUVDLFFBQVEsR0FBR0wsTUFBTSxDQUFFTSxDQUFDLENBQUNHLFFBQVEsQ0FBQyxDQUFFLENBQUM7O0lBRWpDO0lBQ0E7SUFDQUosUUFBUSxHQUFHQSxRQUFRLENBQUNLLEtBQUssQ0FBRSxtQkFBb0IsQ0FBQyxDQUFDQyxJQUFJLENBQUcsb0JBQW1CUixJQUFLLEdBQUcsQ0FBQztFQUN0RixDQUFDLENBQ0QsT0FBT1MsQ0FBQyxFQUFHO0lBQ1RQLFFBQVEsR0FBR0wsTUFBTSxDQUFFLHlCQUEwQixDQUFDO0VBQ2hEO0VBRUEsT0FBT0ssUUFBUTtBQUNqQixDQUFDIn0=