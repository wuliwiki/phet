// Copyright 2017, University of Colorado Boulder

const fs = require('graceful-fs'); // eslint-disable-line require-statement-match

/**
 * Define a helper function that will get a list of the PhET-style version directories at the given path.  The
 * directories must be named with three numbers separated by periods, e.g. 1.2.5.  The directories are sorted in
 * numerical order, which is different from the lexical ordering used by the Linux file system.  So, for example, valid
 * output from this method could be the array [ "1.1.8", "1.1.9", "1.1.10" ].  For more information on why this is
 * necessary, see https://github.com/phetsims/perennial/issues/28.
 *
 * @param path - Filename of the directory.  It's ok if the path does not exist.
 * @returns {Array} - returns a sorted array of version directories.  Returns an empty array if none exist or if the
 * path does not exist.
 */
module.exports = async function getSortedVersionDirectories(path) {
  let versions;
  if (fs.existsSync(path)) {
    versions = fs.readdirSync(path);
  } else {
    versions = [];
  }

  // filter out names that don't match the required format
  versions = versions.filter(path => {
    const splitPath = path.split('.');
    if (splitPath.length !== 3) {
      return false;
    }
    for (let i = 0; i < 3; i++) {
      if (isNaN(splitPath[i])) {
        return false;
      }
    }
    return true;
  });

  // sort the names in numerical (not lexical) order
  versions.sort((a, b) => {
    const aTokenized = a.split('.');
    const bTokenized = b.split('.');
    let result = 0;
    for (let i = 0; i < aTokenized.length; i++) {
      if (Number(aTokenized[i]) < Number(bTokenized[i])) {
        result = -1;
        break;
      } else if (Number(aTokenized[i]) > Number(bTokenized[i])) {
        result = 1;
        break;
      }
    }
    return result;
  });
  return versions;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiZ2V0U29ydGVkVmVyc2lvbkRpcmVjdG9yaWVzIiwicGF0aCIsInZlcnNpb25zIiwiZXhpc3RzU3luYyIsInJlYWRkaXJTeW5jIiwiZmlsdGVyIiwic3BsaXRQYXRoIiwic3BsaXQiLCJsZW5ndGgiLCJpIiwiaXNOYU4iLCJzb3J0IiwiYSIsImIiLCJhVG9rZW5pemVkIiwiYlRva2VuaXplZCIsInJlc3VsdCIsIk51bWJlciJdLCJzb3VyY2VzIjpbImdldFNvcnRlZFZlcnNpb25EaXJlY3Rvcmllcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG5cclxuY29uc3QgZnMgPSByZXF1aXJlKCAnZ3JhY2VmdWwtZnMnICk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVxdWlyZS1zdGF0ZW1lbnQtbWF0Y2hcclxuXHJcbi8qKlxyXG4gKiBEZWZpbmUgYSBoZWxwZXIgZnVuY3Rpb24gdGhhdCB3aWxsIGdldCBhIGxpc3Qgb2YgdGhlIFBoRVQtc3R5bGUgdmVyc2lvbiBkaXJlY3RvcmllcyBhdCB0aGUgZ2l2ZW4gcGF0aC4gIFRoZVxyXG4gKiBkaXJlY3RvcmllcyBtdXN0IGJlIG5hbWVkIHdpdGggdGhyZWUgbnVtYmVycyBzZXBhcmF0ZWQgYnkgcGVyaW9kcywgZS5nLiAxLjIuNS4gIFRoZSBkaXJlY3RvcmllcyBhcmUgc29ydGVkIGluXHJcbiAqIG51bWVyaWNhbCBvcmRlciwgd2hpY2ggaXMgZGlmZmVyZW50IGZyb20gdGhlIGxleGljYWwgb3JkZXJpbmcgdXNlZCBieSB0aGUgTGludXggZmlsZSBzeXN0ZW0uICBTbywgZm9yIGV4YW1wbGUsIHZhbGlkXHJcbiAqIG91dHB1dCBmcm9tIHRoaXMgbWV0aG9kIGNvdWxkIGJlIHRoZSBhcnJheSBbIFwiMS4xLjhcIiwgXCIxLjEuOVwiLCBcIjEuMS4xMFwiIF0uICBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiB3aHkgdGhpcyBpc1xyXG4gKiBuZWNlc3NhcnksIHNlZSBodHRwczovL2dpdGh1Yi5jb20vcGhldHNpbXMvcGVyZW5uaWFsL2lzc3Vlcy8yOC5cclxuICpcclxuICogQHBhcmFtIHBhdGggLSBGaWxlbmFtZSBvZiB0aGUgZGlyZWN0b3J5LiAgSXQncyBvayBpZiB0aGUgcGF0aCBkb2VzIG5vdCBleGlzdC5cclxuICogQHJldHVybnMge0FycmF5fSAtIHJldHVybnMgYSBzb3J0ZWQgYXJyYXkgb2YgdmVyc2lvbiBkaXJlY3Rvcmllcy4gIFJldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgbm9uZSBleGlzdCBvciBpZiB0aGVcclxuICogcGF0aCBkb2VzIG5vdCBleGlzdC5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgZnVuY3Rpb24gZ2V0U29ydGVkVmVyc2lvbkRpcmVjdG9yaWVzKCBwYXRoICkge1xyXG5cclxuICBsZXQgdmVyc2lvbnM7XHJcblxyXG4gIGlmICggZnMuZXhpc3RzU3luYyggcGF0aCApICkge1xyXG4gICAgdmVyc2lvbnMgPSBmcy5yZWFkZGlyU3luYyggcGF0aCApO1xyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIHZlcnNpb25zID0gW107XHJcbiAgfVxyXG5cclxuICAvLyBmaWx0ZXIgb3V0IG5hbWVzIHRoYXQgZG9uJ3QgbWF0Y2ggdGhlIHJlcXVpcmVkIGZvcm1hdFxyXG4gIHZlcnNpb25zID0gdmVyc2lvbnMuZmlsdGVyKCBwYXRoID0+IHtcclxuICAgIGNvbnN0IHNwbGl0UGF0aCA9IHBhdGguc3BsaXQoICcuJyApO1xyXG4gICAgaWYgKCBzcGxpdFBhdGgubGVuZ3RoICE9PSAzICkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCAzOyBpKysgKSB7XHJcbiAgICAgIGlmICggaXNOYU4oIHNwbGl0UGF0aFsgaSBdICkgKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9ICk7XHJcblxyXG4gIC8vIHNvcnQgdGhlIG5hbWVzIGluIG51bWVyaWNhbCAobm90IGxleGljYWwpIG9yZGVyXHJcbiAgdmVyc2lvbnMuc29ydCggKCBhLCBiICkgPT4ge1xyXG4gICAgY29uc3QgYVRva2VuaXplZCA9IGEuc3BsaXQoICcuJyApO1xyXG4gICAgY29uc3QgYlRva2VuaXplZCA9IGIuc3BsaXQoICcuJyApO1xyXG4gICAgbGV0IHJlc3VsdCA9IDA7XHJcbiAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBhVG9rZW5pemVkLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICBpZiAoIE51bWJlciggYVRva2VuaXplZFsgaSBdICkgPCBOdW1iZXIoIGJUb2tlbml6ZWRbIGkgXSApICkge1xyXG4gICAgICAgIHJlc3VsdCA9IC0xO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKCBOdW1iZXIoIGFUb2tlbml6ZWRbIGkgXSApID4gTnVtYmVyKCBiVG9rZW5pemVkWyBpIF0gKSApIHtcclxuICAgICAgICByZXN1bHQgPSAxO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH0gKTtcclxuICByZXR1cm4gdmVyc2lvbnM7XHJcbn07Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFHQSxNQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBRSxhQUFjLENBQUMsQ0FBQyxDQUFDOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHLGVBQWVDLDJCQUEyQkEsQ0FBRUMsSUFBSSxFQUFHO0VBRWxFLElBQUlDLFFBQVE7RUFFWixJQUFLTixFQUFFLENBQUNPLFVBQVUsQ0FBRUYsSUFBSyxDQUFDLEVBQUc7SUFDM0JDLFFBQVEsR0FBR04sRUFBRSxDQUFDUSxXQUFXLENBQUVILElBQUssQ0FBQztFQUNuQyxDQUFDLE1BQ0k7SUFDSEMsUUFBUSxHQUFHLEVBQUU7RUFDZjs7RUFFQTtFQUNBQSxRQUFRLEdBQUdBLFFBQVEsQ0FBQ0csTUFBTSxDQUFFSixJQUFJLElBQUk7SUFDbEMsTUFBTUssU0FBUyxHQUFHTCxJQUFJLENBQUNNLEtBQUssQ0FBRSxHQUFJLENBQUM7SUFDbkMsSUFBS0QsU0FBUyxDQUFDRSxNQUFNLEtBQUssQ0FBQyxFQUFHO01BQzVCLE9BQU8sS0FBSztJQUNkO0lBQ0EsS0FBTSxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEVBQUUsRUFBRztNQUM1QixJQUFLQyxLQUFLLENBQUVKLFNBQVMsQ0FBRUcsQ0FBQyxDQUFHLENBQUMsRUFBRztRQUM3QixPQUFPLEtBQUs7TUFDZDtJQUNGO0lBQ0EsT0FBTyxJQUFJO0VBQ2IsQ0FBRSxDQUFDOztFQUVIO0VBQ0FQLFFBQVEsQ0FBQ1MsSUFBSSxDQUFFLENBQUVDLENBQUMsRUFBRUMsQ0FBQyxLQUFNO0lBQ3pCLE1BQU1DLFVBQVUsR0FBR0YsQ0FBQyxDQUFDTCxLQUFLLENBQUUsR0FBSSxDQUFDO0lBQ2pDLE1BQU1RLFVBQVUsR0FBR0YsQ0FBQyxDQUFDTixLQUFLLENBQUUsR0FBSSxDQUFDO0lBQ2pDLElBQUlTLE1BQU0sR0FBRyxDQUFDO0lBQ2QsS0FBTSxJQUFJUCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdLLFVBQVUsQ0FBQ04sTUFBTSxFQUFFQyxDQUFDLEVBQUUsRUFBRztNQUM1QyxJQUFLUSxNQUFNLENBQUVILFVBQVUsQ0FBRUwsQ0FBQyxDQUFHLENBQUMsR0FBR1EsTUFBTSxDQUFFRixVQUFVLENBQUVOLENBQUMsQ0FBRyxDQUFDLEVBQUc7UUFDM0RPLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDWDtNQUNGLENBQUMsTUFDSSxJQUFLQyxNQUFNLENBQUVILFVBQVUsQ0FBRUwsQ0FBQyxDQUFHLENBQUMsR0FBR1EsTUFBTSxDQUFFRixVQUFVLENBQUVOLENBQUMsQ0FBRyxDQUFDLEVBQUc7UUFDaEVPLE1BQU0sR0FBRyxDQUFDO1FBQ1Y7TUFDRjtJQUNGO0lBQ0EsT0FBT0EsTUFBTTtFQUNmLENBQUUsQ0FBQztFQUNILE9BQU9kLFFBQVE7QUFDakIsQ0FBQyJ9