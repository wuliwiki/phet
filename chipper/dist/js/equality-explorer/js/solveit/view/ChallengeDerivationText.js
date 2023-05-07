// Copyright 2018-2023, University of Colorado Boulder

/**
 * Shows how the current challenge was derived. Used exclusively for debugging.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { RichText } from '../../../../scenery/js/imports.js';
import equalityExplorer from '../../equalityExplorer.js';
// constants
const DEFAULT_FONT = new PhetFont(14);
export default class ChallengeDerivationText extends RichText {
  constructor(challengeProperty, providedOptions) {
    const options = optionize()({
      // RichTextOptions
      font: DEFAULT_FONT
    }, providedOptions);
    super('', options);

    // display derivation of the current challenge
    challengeProperty.link(challenge => {
      this.string = challenge ? challenge.debugDerivation : '';
    });
  }
  dispose() {
    assert && assert(false, 'dispose is not supported, exists for the lifetime of the sim');
    super.dispose();
  }
}
equalityExplorer.register('ChallengeDerivationText', ChallengeDerivationText);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25pemUiLCJQaGV0Rm9udCIsIlJpY2hUZXh0IiwiZXF1YWxpdHlFeHBsb3JlciIsIkRFRkFVTFRfRk9OVCIsIkNoYWxsZW5nZURlcml2YXRpb25UZXh0IiwiY29uc3RydWN0b3IiLCJjaGFsbGVuZ2VQcm9wZXJ0eSIsInByb3ZpZGVkT3B0aW9ucyIsIm9wdGlvbnMiLCJmb250IiwibGluayIsImNoYWxsZW5nZSIsInN0cmluZyIsImRlYnVnRGVyaXZhdGlvbiIsImRpc3Bvc2UiLCJhc3NlcnQiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkNoYWxsZW5nZURlcml2YXRpb25UZXh0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFNob3dzIGhvdyB0aGUgY3VycmVudCBjaGFsbGVuZ2Ugd2FzIGRlcml2ZWQuIFVzZWQgZXhjbHVzaXZlbHkgZm9yIGRlYnVnZ2luZy5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9Qcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBvcHRpb25pemUsIHsgRW1wdHlTZWxmT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9vcHRpb25pemUuanMnO1xyXG5pbXBvcnQgUGhldEZvbnQgZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL1BoZXRGb250LmpzJztcclxuaW1wb3J0IHsgTm9kZVRyYW5zbGF0aW9uT3B0aW9ucywgUmljaFRleHQsIFJpY2hUZXh0T3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBlcXVhbGl0eUV4cGxvcmVyIGZyb20gJy4uLy4uL2VxdWFsaXR5RXhwbG9yZXIuanMnO1xyXG5pbXBvcnQgQ2hhbGxlbmdlIGZyb20gJy4uL21vZGVsL0NoYWxsZW5nZS5qcyc7XHJcblxyXG4vLyBjb25zdGFudHNcclxuY29uc3QgREVGQVVMVF9GT05UID0gbmV3IFBoZXRGb250KCAxNCApO1xyXG5cclxudHlwZSBTZWxmT3B0aW9ucyA9IEVtcHR5U2VsZk9wdGlvbnM7XHJcblxyXG50eXBlIENoYWxsZW5nZURlcml2YXRpb25UZXh0T3B0aW9ucyA9IFNlbGZPcHRpb25zICYgTm9kZVRyYW5zbGF0aW9uT3B0aW9ucztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYWxsZW5nZURlcml2YXRpb25UZXh0IGV4dGVuZHMgUmljaFRleHQge1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIGNoYWxsZW5nZVByb3BlcnR5OiBQcm9wZXJ0eTxDaGFsbGVuZ2UgfCBudWxsPiwgcHJvdmlkZWRPcHRpb25zPzogQ2hhbGxlbmdlRGVyaXZhdGlvblRleHRPcHRpb25zICkge1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25pemU8Q2hhbGxlbmdlRGVyaXZhdGlvblRleHRPcHRpb25zLCBTZWxmT3B0aW9ucywgUmljaFRleHRPcHRpb25zPigpKCB7XHJcblxyXG4gICAgICAvLyBSaWNoVGV4dE9wdGlvbnNcclxuICAgICAgZm9udDogREVGQVVMVF9GT05UXHJcbiAgICB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICBzdXBlciggJycsIG9wdGlvbnMgKTtcclxuXHJcbiAgICAvLyBkaXNwbGF5IGRlcml2YXRpb24gb2YgdGhlIGN1cnJlbnQgY2hhbGxlbmdlXHJcbiAgICBjaGFsbGVuZ2VQcm9wZXJ0eS5saW5rKCBjaGFsbGVuZ2UgPT4ge1xyXG4gICAgICB0aGlzLnN0cmluZyA9ICggY2hhbGxlbmdlID8gY2hhbGxlbmdlLmRlYnVnRGVyaXZhdGlvbiA6ICcnICk7XHJcbiAgICB9ICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3ZlcnJpZGUgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIGZhbHNlLCAnZGlzcG9zZSBpcyBub3Qgc3VwcG9ydGVkLCBleGlzdHMgZm9yIHRoZSBsaWZldGltZSBvZiB0aGUgc2ltJyApO1xyXG4gICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmVxdWFsaXR5RXhwbG9yZXIucmVnaXN0ZXIoICdDaGFsbGVuZ2VEZXJpdmF0aW9uVGV4dCcsIENoYWxsZW5nZURlcml2YXRpb25UZXh0ICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBLE9BQU9BLFNBQVMsTUFBNEIsdUNBQXVDO0FBQ25GLE9BQU9DLFFBQVEsTUFBTSx5Q0FBeUM7QUFDOUQsU0FBaUNDLFFBQVEsUUFBeUIsbUNBQW1DO0FBQ3JHLE9BQU9DLGdCQUFnQixNQUFNLDJCQUEyQjtBQUd4RDtBQUNBLE1BQU1DLFlBQVksR0FBRyxJQUFJSCxRQUFRLENBQUUsRUFBRyxDQUFDO0FBTXZDLGVBQWUsTUFBTUksdUJBQXVCLFNBQVNILFFBQVEsQ0FBQztFQUVyREksV0FBV0EsQ0FBRUMsaUJBQTZDLEVBQUVDLGVBQWdELEVBQUc7SUFFcEgsTUFBTUMsT0FBTyxHQUFHVCxTQUFTLENBQStELENBQUMsQ0FBRTtNQUV6RjtNQUNBVSxJQUFJLEVBQUVOO0lBQ1IsQ0FBQyxFQUFFSSxlQUFnQixDQUFDO0lBRXBCLEtBQUssQ0FBRSxFQUFFLEVBQUVDLE9BQVEsQ0FBQzs7SUFFcEI7SUFDQUYsaUJBQWlCLENBQUNJLElBQUksQ0FBRUMsU0FBUyxJQUFJO01BQ25DLElBQUksQ0FBQ0MsTUFBTSxHQUFLRCxTQUFTLEdBQUdBLFNBQVMsQ0FBQ0UsZUFBZSxHQUFHLEVBQUk7SUFDOUQsQ0FBRSxDQUFDO0VBQ0w7RUFFZ0JDLE9BQU9BLENBQUEsRUFBUztJQUM5QkMsTUFBTSxJQUFJQSxNQUFNLENBQUUsS0FBSyxFQUFFLDhEQUErRCxDQUFDO0lBQ3pGLEtBQUssQ0FBQ0QsT0FBTyxDQUFDLENBQUM7RUFDakI7QUFFRjtBQUVBWixnQkFBZ0IsQ0FBQ2MsUUFBUSxDQUFFLHlCQUF5QixFQUFFWix1QkFBd0IsQ0FBQyJ9