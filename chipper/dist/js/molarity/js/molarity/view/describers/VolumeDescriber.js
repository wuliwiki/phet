// Copyright 2019-2022, University of Colorado Boulder

/**
 * VolumeDescriber is responsible for generating strings about Solution.volumeProperty.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Taylor Want (PhET Interactive Simulations)
 */

import Utils from '../../../../../dot/js/Utils.js';
import StringUtils from '../../../../../phetcommon/js/util/StringUtils.js';
import molarity from '../../../molarity.js';
import MolarityStrings from '../../../MolarityStrings.js';
import MolarityConstants from '../../MolarityConstants.js';
import SolutionQuantityDescriber from './SolutionQuantityDescriber.js';
const quantitativeHasVolumePatternString = MolarityStrings.a11y.quantitative.hasVolumePattern;
const quantityChangeColorChangePatternString = MolarityStrings.a11y.quantityChange.colorChangePattern;
const qualitativeVolumeStatePatternString = MolarityStrings.a11y.qualitative.volumeStatePattern;
const quantitativeSolutionVolumeAndUnitPatternString = MolarityStrings.a11y.quantitative.solutionVolumeAndUnitPattern;
const quantityChangeVolumeChangePatternString = MolarityStrings.a11y.quantityChange.volumeChangePattern;

// volume regions strings
const volumeRegionsPassiveFullString = MolarityStrings.a11y.volumeRegions.passive.full;
const volumeRegionsPassiveHalfFullString = MolarityStrings.a11y.volumeRegions.passive.halfFull;
const volumeRegionsPassiveNearlyEmptyString = MolarityStrings.a11y.volumeRegions.passive.nearlyEmpty;
const volumeRegionsPassiveNearlyFullString = MolarityStrings.a11y.volumeRegions.passive.nearlyFull;
const volumeRegionsPassiveOverHalfFullString = MolarityStrings.a11y.volumeRegions.passive.overHalfFull;
const volumeRegionsPassiveUnderHalfFullString = MolarityStrings.a11y.volumeRegions.passive.underHalfFull;
const volumeRegionsPassiveAtLowestAmountString = MolarityStrings.a11y.volumeRegions.passive.atLowestAmount;

// volume active regions strings
const volumeRegionsActiveIsFullString = MolarityStrings.a11y.volumeRegions.active.isFull;
const volumeRegionsActiveIsNearlyFullString = MolarityStrings.a11y.volumeRegions.active.isNearlyFull;
const volumeRegionsActiveIsOverHalfFullString = MolarityStrings.a11y.volumeRegions.active.isOverHalfFull;
const volumeRegionsActiveIsHalfFullString = MolarityStrings.a11y.volumeRegions.active.isHalfFull;
const volumeRegionsActiveIsUnderHalfFullString = MolarityStrings.a11y.volumeRegions.active.isUnderHalfFull;
const volumeRegionsActiveIsAtLowestAmountString = MolarityStrings.a11y.volumeRegions.active.isAtLowestAmount;
const volumeRegionsActiveIsNearlyEmptyString = MolarityStrings.a11y.volumeRegions.active.isNearlyEmpty;

// change strings
const lessCapitalizedString = MolarityStrings.a11y.less.capitalized;
const moreCapitalizedString = MolarityStrings.a11y.more.capitalized;
const quantityChangeLighterString = MolarityStrings.a11y.quantityChange.lighter;
const quantityChangeDarkerString = MolarityStrings.a11y.quantityChange.darker;

// constants
const VOLUME_STRINGS = [volumeRegionsPassiveAtLowestAmountString, volumeRegionsPassiveNearlyEmptyString, volumeRegionsPassiveUnderHalfFullString, volumeRegionsPassiveHalfFullString, volumeRegionsPassiveOverHalfFullString, volumeRegionsPassiveNearlyFullString, volumeRegionsPassiveFullString];
const VOLUME_ACTIVE_STRINGS = [volumeRegionsActiveIsAtLowestAmountString, volumeRegionsActiveIsNearlyEmptyString, volumeRegionsActiveIsUnderHalfFullString, volumeRegionsActiveIsHalfFullString, volumeRegionsActiveIsOverHalfFullString, volumeRegionsActiveIsNearlyFullString, volumeRegionsActiveIsFullString];
class VolumeDescriber extends SolutionQuantityDescriber {
  /**
   * @param {Property.<number>} volumeProperty - the volume of the solution
   * @param {Property.<boolean>} useQuantitativeDescriptionsProperty
   */
  constructor(volumeProperty, useQuantitativeDescriptionsProperty) {
    super();

    // @private
    this.volumeProperty = volumeProperty;
    this.useQuantitativeDescriptionsProperty = useQuantitativeDescriptionsProperty;

    // @private
    // {number} - the index of the descriptive region from VOLUME_STRINGS array.
    let currentRegion = volumeToIndex(this.volumeProperty.value);

    // @private
    // {boolean} - tracks whether the descriptive volume region has just changed.
    this.volumeRegionChanged = false;

    // @private
    // {boolean|null} - tracks whether volume has just increased or decreased. null when simulation starts or resets.
    this.volumeIncreased = null;
    this.volumeProperty.link((newValue, oldValue) => {
      assert && oldValue && assert(currentRegion === volumeToIndex(oldValue), 'current volume region not tracking the previous region as expected');
      const oldRegion = currentRegion;
      currentRegion = volumeToIndex(newValue);
      this.volumeRegionChanged = currentRegion !== oldRegion;
      this.volumeIncreased = newValue > oldValue;
    });
  }

  /**
   * Note: this getter name must be the same as its counterpart in SoluteAmountDescriber
   * @public
   * @returns {boolean}
   * @override
   */
  getRegionChanged() {
    return this.volumeRegionChanged;
  }

  /**
   * Gets the current value of volume either quantitatively or quantitatively to put into descriptions.
   * @param {boolean} [isActive]
   * @public
   * @returns {string} - examples: "1.500 Liters" for quantitative or "half full" for qualitative.
   */
  getCurrentVolume(isActive = false) {
    const volumeIndex = volumeToIndex(this.volumeProperty.value);
    if (this.useQuantitativeDescriptionsProperty.value) {
      const quantitativeString = isActive ? quantitativeHasVolumePatternString : quantitativeSolutionVolumeAndUnitPatternString;
      return StringUtils.fillIn(quantitativeString, {
        volume: Utils.toFixed(this.volumeProperty.value, MolarityConstants.SOLUTION_VOLUME_DECIMAL_PLACES)
      });
    } else if (isActive) {
      return VOLUME_ACTIVE_STRINGS[volumeIndex];
    } else {
      return VOLUME_STRINGS[volumeIndex];
    }
  }

  /**
   * Creates the substrings to describe the change in volume and the resulting change in solution color.
   * This function must have the same name as its counterpart in VolumeDescriber. This function should only be called
   * as a result of the volumeProperty changing (hence usage of `this.volumeIncreased`.
   * @public
   * @returns {StringsFromSliderChange} - contains two strings.
   * @override
   */
  getStringsFromSliderChange() {
    return {
      // "quantity" meaning "volume" here
      quantityChangeString: StringUtils.fillIn(quantityChangeVolumeChangePatternString, {
        moreLess: this.volumeIncreased ? moreCapitalizedString : lessCapitalizedString
      }),
      colorChangeString: StringUtils.fillIn(quantityChangeColorChangePatternString, {
        lighterDarker: this.volumeIncreased ? quantityChangeLighterString : quantityChangeDarkerString
      })
    };
  }

  /**
   * Generates the aria-valuetext for the volume slider.
   * @public
   * @returns {string}
   */
  getVolumeAriaValueText() {
    return this.useQuantitativeDescriptionsProperty.value ? this.getCurrentVolume() : StringUtils.fillIn(qualitativeVolumeStatePatternString, {
      volume: this.getCurrentVolume()
    });
  }
}

/**
 * Calculates which item to use from the VOLUME_STRINGS array. Region cutoff numbers are based on keypress balances,
 * which are documented here: https://github.com/phetsims/molarity/issues/128
 * @param {number} volume
 * @returns {number} - index to pull from VOLUME_STRINGS array.
 */
const volumeToIndex = volume => {
  // normalize in case the range changes in the future.
  const normalizedVolume = MolarityConstants.SOLUTION_VOLUME_RANGE.getNormalizedValue(volume);
  if (normalizedVolume <= 0.00125) {
    return 0;
  } else if (normalizedVolume <= 0.18625) {
    return 1;
  } else if (normalizedVolume <= 0.37375) {
    return 2;
  } else if (normalizedVolume <= 0.37625) {
    return 3;
  } else if (normalizedVolume <= 0.74875) {
    return 4;
  } else if (normalizedVolume <= 0.99875) {
    return 5;
  } else {
    assert && assert(volume <= MolarityConstants.SOLUTION_VOLUME_RANGE.max, 'unexpected volume provided');
    return 6;
  }
};
molarity.register('VolumeDescriber', VolumeDescriber);
export default VolumeDescriber;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVdGlscyIsIlN0cmluZ1V0aWxzIiwibW9sYXJpdHkiLCJNb2xhcml0eVN0cmluZ3MiLCJNb2xhcml0eUNvbnN0YW50cyIsIlNvbHV0aW9uUXVhbnRpdHlEZXNjcmliZXIiLCJxdWFudGl0YXRpdmVIYXNWb2x1bWVQYXR0ZXJuU3RyaW5nIiwiYTExeSIsInF1YW50aXRhdGl2ZSIsImhhc1ZvbHVtZVBhdHRlcm4iLCJxdWFudGl0eUNoYW5nZUNvbG9yQ2hhbmdlUGF0dGVyblN0cmluZyIsInF1YW50aXR5Q2hhbmdlIiwiY29sb3JDaGFuZ2VQYXR0ZXJuIiwicXVhbGl0YXRpdmVWb2x1bWVTdGF0ZVBhdHRlcm5TdHJpbmciLCJxdWFsaXRhdGl2ZSIsInZvbHVtZVN0YXRlUGF0dGVybiIsInF1YW50aXRhdGl2ZVNvbHV0aW9uVm9sdW1lQW5kVW5pdFBhdHRlcm5TdHJpbmciLCJzb2x1dGlvblZvbHVtZUFuZFVuaXRQYXR0ZXJuIiwicXVhbnRpdHlDaGFuZ2VWb2x1bWVDaGFuZ2VQYXR0ZXJuU3RyaW5nIiwidm9sdW1lQ2hhbmdlUGF0dGVybiIsInZvbHVtZVJlZ2lvbnNQYXNzaXZlRnVsbFN0cmluZyIsInZvbHVtZVJlZ2lvbnMiLCJwYXNzaXZlIiwiZnVsbCIsInZvbHVtZVJlZ2lvbnNQYXNzaXZlSGFsZkZ1bGxTdHJpbmciLCJoYWxmRnVsbCIsInZvbHVtZVJlZ2lvbnNQYXNzaXZlTmVhcmx5RW1wdHlTdHJpbmciLCJuZWFybHlFbXB0eSIsInZvbHVtZVJlZ2lvbnNQYXNzaXZlTmVhcmx5RnVsbFN0cmluZyIsIm5lYXJseUZ1bGwiLCJ2b2x1bWVSZWdpb25zUGFzc2l2ZU92ZXJIYWxmRnVsbFN0cmluZyIsIm92ZXJIYWxmRnVsbCIsInZvbHVtZVJlZ2lvbnNQYXNzaXZlVW5kZXJIYWxmRnVsbFN0cmluZyIsInVuZGVySGFsZkZ1bGwiLCJ2b2x1bWVSZWdpb25zUGFzc2l2ZUF0TG93ZXN0QW1vdW50U3RyaW5nIiwiYXRMb3dlc3RBbW91bnQiLCJ2b2x1bWVSZWdpb25zQWN0aXZlSXNGdWxsU3RyaW5nIiwiYWN0aXZlIiwiaXNGdWxsIiwidm9sdW1lUmVnaW9uc0FjdGl2ZUlzTmVhcmx5RnVsbFN0cmluZyIsImlzTmVhcmx5RnVsbCIsInZvbHVtZVJlZ2lvbnNBY3RpdmVJc092ZXJIYWxmRnVsbFN0cmluZyIsImlzT3ZlckhhbGZGdWxsIiwidm9sdW1lUmVnaW9uc0FjdGl2ZUlzSGFsZkZ1bGxTdHJpbmciLCJpc0hhbGZGdWxsIiwidm9sdW1lUmVnaW9uc0FjdGl2ZUlzVW5kZXJIYWxmRnVsbFN0cmluZyIsImlzVW5kZXJIYWxmRnVsbCIsInZvbHVtZVJlZ2lvbnNBY3RpdmVJc0F0TG93ZXN0QW1vdW50U3RyaW5nIiwiaXNBdExvd2VzdEFtb3VudCIsInZvbHVtZVJlZ2lvbnNBY3RpdmVJc05lYXJseUVtcHR5U3RyaW5nIiwiaXNOZWFybHlFbXB0eSIsImxlc3NDYXBpdGFsaXplZFN0cmluZyIsImxlc3MiLCJjYXBpdGFsaXplZCIsIm1vcmVDYXBpdGFsaXplZFN0cmluZyIsIm1vcmUiLCJxdWFudGl0eUNoYW5nZUxpZ2h0ZXJTdHJpbmciLCJsaWdodGVyIiwicXVhbnRpdHlDaGFuZ2VEYXJrZXJTdHJpbmciLCJkYXJrZXIiLCJWT0xVTUVfU1RSSU5HUyIsIlZPTFVNRV9BQ1RJVkVfU1RSSU5HUyIsIlZvbHVtZURlc2NyaWJlciIsImNvbnN0cnVjdG9yIiwidm9sdW1lUHJvcGVydHkiLCJ1c2VRdWFudGl0YXRpdmVEZXNjcmlwdGlvbnNQcm9wZXJ0eSIsImN1cnJlbnRSZWdpb24iLCJ2b2x1bWVUb0luZGV4IiwidmFsdWUiLCJ2b2x1bWVSZWdpb25DaGFuZ2VkIiwidm9sdW1lSW5jcmVhc2VkIiwibGluayIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJhc3NlcnQiLCJvbGRSZWdpb24iLCJnZXRSZWdpb25DaGFuZ2VkIiwiZ2V0Q3VycmVudFZvbHVtZSIsImlzQWN0aXZlIiwidm9sdW1lSW5kZXgiLCJxdWFudGl0YXRpdmVTdHJpbmciLCJmaWxsSW4iLCJ2b2x1bWUiLCJ0b0ZpeGVkIiwiU09MVVRJT05fVk9MVU1FX0RFQ0lNQUxfUExBQ0VTIiwiZ2V0U3RyaW5nc0Zyb21TbGlkZXJDaGFuZ2UiLCJxdWFudGl0eUNoYW5nZVN0cmluZyIsIm1vcmVMZXNzIiwiY29sb3JDaGFuZ2VTdHJpbmciLCJsaWdodGVyRGFya2VyIiwiZ2V0Vm9sdW1lQXJpYVZhbHVlVGV4dCIsIm5vcm1hbGl6ZWRWb2x1bWUiLCJTT0xVVElPTl9WT0xVTUVfUkFOR0UiLCJnZXROb3JtYWxpemVkVmFsdWUiLCJtYXgiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlZvbHVtZURlc2NyaWJlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBWb2x1bWVEZXNjcmliZXIgaXMgcmVzcG9uc2libGUgZm9yIGdlbmVyYXRpbmcgc3RyaW5ncyBhYm91dCBTb2x1dGlvbi52b2x1bWVQcm9wZXJ0eS5cclxuICpcclxuICogQGF1dGhvciBNaWNoYWVsIEthdXptYW5uIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKiBAYXV0aG9yIFRheWxvciBXYW50IChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi8uLi8uLi8uLi9kb3QvanMvVXRpbHMuanMnO1xyXG5pbXBvcnQgU3RyaW5nVXRpbHMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcGhldGNvbW1vbi9qcy91dGlsL1N0cmluZ1V0aWxzLmpzJztcclxuaW1wb3J0IG1vbGFyaXR5IGZyb20gJy4uLy4uLy4uL21vbGFyaXR5LmpzJztcclxuaW1wb3J0IE1vbGFyaXR5U3RyaW5ncyBmcm9tICcuLi8uLi8uLi9Nb2xhcml0eVN0cmluZ3MuanMnO1xyXG5pbXBvcnQgTW9sYXJpdHlDb25zdGFudHMgZnJvbSAnLi4vLi4vTW9sYXJpdHlDb25zdGFudHMuanMnO1xyXG5pbXBvcnQgU29sdXRpb25RdWFudGl0eURlc2NyaWJlciBmcm9tICcuL1NvbHV0aW9uUXVhbnRpdHlEZXNjcmliZXIuanMnO1xyXG5cclxuY29uc3QgcXVhbnRpdGF0aXZlSGFzVm9sdW1lUGF0dGVyblN0cmluZyA9IE1vbGFyaXR5U3RyaW5ncy5hMTF5LnF1YW50aXRhdGl2ZS5oYXNWb2x1bWVQYXR0ZXJuO1xyXG5jb25zdCBxdWFudGl0eUNoYW5nZUNvbG9yQ2hhbmdlUGF0dGVyblN0cmluZyA9IE1vbGFyaXR5U3RyaW5ncy5hMTF5LnF1YW50aXR5Q2hhbmdlLmNvbG9yQ2hhbmdlUGF0dGVybjtcclxuY29uc3QgcXVhbGl0YXRpdmVWb2x1bWVTdGF0ZVBhdHRlcm5TdHJpbmcgPSBNb2xhcml0eVN0cmluZ3MuYTExeS5xdWFsaXRhdGl2ZS52b2x1bWVTdGF0ZVBhdHRlcm47XHJcbmNvbnN0IHF1YW50aXRhdGl2ZVNvbHV0aW9uVm9sdW1lQW5kVW5pdFBhdHRlcm5TdHJpbmcgPSBNb2xhcml0eVN0cmluZ3MuYTExeS5xdWFudGl0YXRpdmUuc29sdXRpb25Wb2x1bWVBbmRVbml0UGF0dGVybjtcclxuY29uc3QgcXVhbnRpdHlDaGFuZ2VWb2x1bWVDaGFuZ2VQYXR0ZXJuU3RyaW5nID0gTW9sYXJpdHlTdHJpbmdzLmExMXkucXVhbnRpdHlDaGFuZ2Uudm9sdW1lQ2hhbmdlUGF0dGVybjtcclxuXHJcbi8vIHZvbHVtZSByZWdpb25zIHN0cmluZ3NcclxuY29uc3Qgdm9sdW1lUmVnaW9uc1Bhc3NpdmVGdWxsU3RyaW5nID0gTW9sYXJpdHlTdHJpbmdzLmExMXkudm9sdW1lUmVnaW9ucy5wYXNzaXZlLmZ1bGw7XHJcbmNvbnN0IHZvbHVtZVJlZ2lvbnNQYXNzaXZlSGFsZkZ1bGxTdHJpbmcgPSBNb2xhcml0eVN0cmluZ3MuYTExeS52b2x1bWVSZWdpb25zLnBhc3NpdmUuaGFsZkZ1bGw7XHJcbmNvbnN0IHZvbHVtZVJlZ2lvbnNQYXNzaXZlTmVhcmx5RW1wdHlTdHJpbmcgPSBNb2xhcml0eVN0cmluZ3MuYTExeS52b2x1bWVSZWdpb25zLnBhc3NpdmUubmVhcmx5RW1wdHk7XHJcbmNvbnN0IHZvbHVtZVJlZ2lvbnNQYXNzaXZlTmVhcmx5RnVsbFN0cmluZyA9IE1vbGFyaXR5U3RyaW5ncy5hMTF5LnZvbHVtZVJlZ2lvbnMucGFzc2l2ZS5uZWFybHlGdWxsO1xyXG5jb25zdCB2b2x1bWVSZWdpb25zUGFzc2l2ZU92ZXJIYWxmRnVsbFN0cmluZyA9IE1vbGFyaXR5U3RyaW5ncy5hMTF5LnZvbHVtZVJlZ2lvbnMucGFzc2l2ZS5vdmVySGFsZkZ1bGw7XHJcbmNvbnN0IHZvbHVtZVJlZ2lvbnNQYXNzaXZlVW5kZXJIYWxmRnVsbFN0cmluZyA9IE1vbGFyaXR5U3RyaW5ncy5hMTF5LnZvbHVtZVJlZ2lvbnMucGFzc2l2ZS51bmRlckhhbGZGdWxsO1xyXG5jb25zdCB2b2x1bWVSZWdpb25zUGFzc2l2ZUF0TG93ZXN0QW1vdW50U3RyaW5nID0gTW9sYXJpdHlTdHJpbmdzLmExMXkudm9sdW1lUmVnaW9ucy5wYXNzaXZlLmF0TG93ZXN0QW1vdW50O1xyXG5cclxuLy8gdm9sdW1lIGFjdGl2ZSByZWdpb25zIHN0cmluZ3NcclxuY29uc3Qgdm9sdW1lUmVnaW9uc0FjdGl2ZUlzRnVsbFN0cmluZyA9IE1vbGFyaXR5U3RyaW5ncy5hMTF5LnZvbHVtZVJlZ2lvbnMuYWN0aXZlLmlzRnVsbDtcclxuY29uc3Qgdm9sdW1lUmVnaW9uc0FjdGl2ZUlzTmVhcmx5RnVsbFN0cmluZyA9IE1vbGFyaXR5U3RyaW5ncy5hMTF5LnZvbHVtZVJlZ2lvbnMuYWN0aXZlLmlzTmVhcmx5RnVsbDtcclxuY29uc3Qgdm9sdW1lUmVnaW9uc0FjdGl2ZUlzT3ZlckhhbGZGdWxsU3RyaW5nID0gTW9sYXJpdHlTdHJpbmdzLmExMXkudm9sdW1lUmVnaW9ucy5hY3RpdmUuaXNPdmVySGFsZkZ1bGw7XHJcbmNvbnN0IHZvbHVtZVJlZ2lvbnNBY3RpdmVJc0hhbGZGdWxsU3RyaW5nID0gTW9sYXJpdHlTdHJpbmdzLmExMXkudm9sdW1lUmVnaW9ucy5hY3RpdmUuaXNIYWxmRnVsbDtcclxuY29uc3Qgdm9sdW1lUmVnaW9uc0FjdGl2ZUlzVW5kZXJIYWxmRnVsbFN0cmluZyA9IE1vbGFyaXR5U3RyaW5ncy5hMTF5LnZvbHVtZVJlZ2lvbnMuYWN0aXZlLmlzVW5kZXJIYWxmRnVsbDtcclxuY29uc3Qgdm9sdW1lUmVnaW9uc0FjdGl2ZUlzQXRMb3dlc3RBbW91bnRTdHJpbmcgPSBNb2xhcml0eVN0cmluZ3MuYTExeS52b2x1bWVSZWdpb25zLmFjdGl2ZS5pc0F0TG93ZXN0QW1vdW50O1xyXG5jb25zdCB2b2x1bWVSZWdpb25zQWN0aXZlSXNOZWFybHlFbXB0eVN0cmluZyA9IE1vbGFyaXR5U3RyaW5ncy5hMTF5LnZvbHVtZVJlZ2lvbnMuYWN0aXZlLmlzTmVhcmx5RW1wdHk7XHJcblxyXG4vLyBjaGFuZ2Ugc3RyaW5nc1xyXG5jb25zdCBsZXNzQ2FwaXRhbGl6ZWRTdHJpbmcgPSBNb2xhcml0eVN0cmluZ3MuYTExeS5sZXNzLmNhcGl0YWxpemVkO1xyXG5jb25zdCBtb3JlQ2FwaXRhbGl6ZWRTdHJpbmcgPSBNb2xhcml0eVN0cmluZ3MuYTExeS5tb3JlLmNhcGl0YWxpemVkO1xyXG5jb25zdCBxdWFudGl0eUNoYW5nZUxpZ2h0ZXJTdHJpbmcgPSBNb2xhcml0eVN0cmluZ3MuYTExeS5xdWFudGl0eUNoYW5nZS5saWdodGVyO1xyXG5jb25zdCBxdWFudGl0eUNoYW5nZURhcmtlclN0cmluZyA9IE1vbGFyaXR5U3RyaW5ncy5hMTF5LnF1YW50aXR5Q2hhbmdlLmRhcmtlcjtcclxuXHJcbi8vIGNvbnN0YW50c1xyXG5jb25zdCBWT0xVTUVfU1RSSU5HUyA9IFtcclxuICB2b2x1bWVSZWdpb25zUGFzc2l2ZUF0TG93ZXN0QW1vdW50U3RyaW5nLFxyXG4gIHZvbHVtZVJlZ2lvbnNQYXNzaXZlTmVhcmx5RW1wdHlTdHJpbmcsXHJcbiAgdm9sdW1lUmVnaW9uc1Bhc3NpdmVVbmRlckhhbGZGdWxsU3RyaW5nLFxyXG4gIHZvbHVtZVJlZ2lvbnNQYXNzaXZlSGFsZkZ1bGxTdHJpbmcsXHJcbiAgdm9sdW1lUmVnaW9uc1Bhc3NpdmVPdmVySGFsZkZ1bGxTdHJpbmcsXHJcbiAgdm9sdW1lUmVnaW9uc1Bhc3NpdmVOZWFybHlGdWxsU3RyaW5nLFxyXG4gIHZvbHVtZVJlZ2lvbnNQYXNzaXZlRnVsbFN0cmluZ1xyXG5dO1xyXG5cclxuY29uc3QgVk9MVU1FX0FDVElWRV9TVFJJTkdTID0gW1xyXG4gIHZvbHVtZVJlZ2lvbnNBY3RpdmVJc0F0TG93ZXN0QW1vdW50U3RyaW5nLFxyXG4gIHZvbHVtZVJlZ2lvbnNBY3RpdmVJc05lYXJseUVtcHR5U3RyaW5nLFxyXG4gIHZvbHVtZVJlZ2lvbnNBY3RpdmVJc1VuZGVySGFsZkZ1bGxTdHJpbmcsXHJcbiAgdm9sdW1lUmVnaW9uc0FjdGl2ZUlzSGFsZkZ1bGxTdHJpbmcsXHJcbiAgdm9sdW1lUmVnaW9uc0FjdGl2ZUlzT3ZlckhhbGZGdWxsU3RyaW5nLFxyXG4gIHZvbHVtZVJlZ2lvbnNBY3RpdmVJc05lYXJseUZ1bGxTdHJpbmcsXHJcbiAgdm9sdW1lUmVnaW9uc0FjdGl2ZUlzRnVsbFN0cmluZ1xyXG5dO1xyXG5cclxuY2xhc3MgVm9sdW1lRGVzY3JpYmVyIGV4dGVuZHMgU29sdXRpb25RdWFudGl0eURlc2NyaWJlciB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7UHJvcGVydHkuPG51bWJlcj59IHZvbHVtZVByb3BlcnR5IC0gdGhlIHZvbHVtZSBvZiB0aGUgc29sdXRpb25cclxuICAgKiBAcGFyYW0ge1Byb3BlcnR5Ljxib29sZWFuPn0gdXNlUXVhbnRpdGF0aXZlRGVzY3JpcHRpb25zUHJvcGVydHlcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvciggdm9sdW1lUHJvcGVydHksIHVzZVF1YW50aXRhdGl2ZURlc2NyaXB0aW9uc1Byb3BlcnR5ICkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZVxyXG4gICAgdGhpcy52b2x1bWVQcm9wZXJ0eSA9IHZvbHVtZVByb3BlcnR5O1xyXG4gICAgdGhpcy51c2VRdWFudGl0YXRpdmVEZXNjcmlwdGlvbnNQcm9wZXJ0eSA9IHVzZVF1YW50aXRhdGl2ZURlc2NyaXB0aW9uc1Byb3BlcnR5O1xyXG5cclxuICAgIC8vIEBwcml2YXRlXHJcbiAgICAvLyB7bnVtYmVyfSAtIHRoZSBpbmRleCBvZiB0aGUgZGVzY3JpcHRpdmUgcmVnaW9uIGZyb20gVk9MVU1FX1NUUklOR1MgYXJyYXkuXHJcbiAgICBsZXQgY3VycmVudFJlZ2lvbiA9IHZvbHVtZVRvSW5kZXgoIHRoaXMudm9sdW1lUHJvcGVydHkudmFsdWUgKTtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZVxyXG4gICAgLy8ge2Jvb2xlYW59IC0gdHJhY2tzIHdoZXRoZXIgdGhlIGRlc2NyaXB0aXZlIHZvbHVtZSByZWdpb24gaGFzIGp1c3QgY2hhbmdlZC5cclxuICAgIHRoaXMudm9sdW1lUmVnaW9uQ2hhbmdlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIEBwcml2YXRlXHJcbiAgICAvLyB7Ym9vbGVhbnxudWxsfSAtIHRyYWNrcyB3aGV0aGVyIHZvbHVtZSBoYXMganVzdCBpbmNyZWFzZWQgb3IgZGVjcmVhc2VkLiBudWxsIHdoZW4gc2ltdWxhdGlvbiBzdGFydHMgb3IgcmVzZXRzLlxyXG4gICAgdGhpcy52b2x1bWVJbmNyZWFzZWQgPSBudWxsO1xyXG5cclxuICAgIHRoaXMudm9sdW1lUHJvcGVydHkubGluayggKCBuZXdWYWx1ZSwgb2xkVmFsdWUgKSA9PiB7XHJcbiAgICAgIGFzc2VydCAmJiBvbGRWYWx1ZSAmJiBhc3NlcnQoIGN1cnJlbnRSZWdpb24gPT09IHZvbHVtZVRvSW5kZXgoIG9sZFZhbHVlICksXHJcbiAgICAgICAgJ2N1cnJlbnQgdm9sdW1lIHJlZ2lvbiBub3QgdHJhY2tpbmcgdGhlIHByZXZpb3VzIHJlZ2lvbiBhcyBleHBlY3RlZCcgKTtcclxuICAgICAgY29uc3Qgb2xkUmVnaW9uID0gY3VycmVudFJlZ2lvbjtcclxuICAgICAgY3VycmVudFJlZ2lvbiA9IHZvbHVtZVRvSW5kZXgoIG5ld1ZhbHVlICk7XHJcbiAgICAgIHRoaXMudm9sdW1lUmVnaW9uQ2hhbmdlZCA9IGN1cnJlbnRSZWdpb24gIT09IG9sZFJlZ2lvbjtcclxuICAgICAgdGhpcy52b2x1bWVJbmNyZWFzZWQgPSBuZXdWYWx1ZSA+IG9sZFZhbHVlO1xyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTm90ZTogdGhpcyBnZXR0ZXIgbmFtZSBtdXN0IGJlIHRoZSBzYW1lIGFzIGl0cyBjb3VudGVycGFydCBpbiBTb2x1dGVBbW91bnREZXNjcmliZXJcclxuICAgKiBAcHVibGljXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICogQG92ZXJyaWRlXHJcbiAgICovXHJcbiAgZ2V0UmVnaW9uQ2hhbmdlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLnZvbHVtZVJlZ2lvbkNoYW5nZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBjdXJyZW50IHZhbHVlIG9mIHZvbHVtZSBlaXRoZXIgcXVhbnRpdGF0aXZlbHkgb3IgcXVhbnRpdGF0aXZlbHkgdG8gcHV0IGludG8gZGVzY3JpcHRpb25zLlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzQWN0aXZlXVxyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIGV4YW1wbGVzOiBcIjEuNTAwIExpdGVyc1wiIGZvciBxdWFudGl0YXRpdmUgb3IgXCJoYWxmIGZ1bGxcIiBmb3IgcXVhbGl0YXRpdmUuXHJcbiAgICovXHJcbiAgZ2V0Q3VycmVudFZvbHVtZSggaXNBY3RpdmUgPSBmYWxzZSApIHtcclxuICAgIGNvbnN0IHZvbHVtZUluZGV4ID0gdm9sdW1lVG9JbmRleCggdGhpcy52b2x1bWVQcm9wZXJ0eS52YWx1ZSApO1xyXG4gICAgaWYgKCB0aGlzLnVzZVF1YW50aXRhdGl2ZURlc2NyaXB0aW9uc1Byb3BlcnR5LnZhbHVlICkge1xyXG4gICAgICBjb25zdCBxdWFudGl0YXRpdmVTdHJpbmcgPSBpc0FjdGl2ZSA/IHF1YW50aXRhdGl2ZUhhc1ZvbHVtZVBhdHRlcm5TdHJpbmcgOiBxdWFudGl0YXRpdmVTb2x1dGlvblZvbHVtZUFuZFVuaXRQYXR0ZXJuU3RyaW5nO1xyXG4gICAgICByZXR1cm4gU3RyaW5nVXRpbHMuZmlsbEluKCBxdWFudGl0YXRpdmVTdHJpbmcsIHtcclxuICAgICAgICB2b2x1bWU6IFV0aWxzLnRvRml4ZWQoIHRoaXMudm9sdW1lUHJvcGVydHkudmFsdWUsIE1vbGFyaXR5Q29uc3RhbnRzLlNPTFVUSU9OX1ZPTFVNRV9ERUNJTUFMX1BMQUNFUyApXHJcbiAgICAgIH0gKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCBpc0FjdGl2ZSApIHtcclxuICAgICAgcmV0dXJuIFZPTFVNRV9BQ1RJVkVfU1RSSU5HU1sgdm9sdW1lSW5kZXggXTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICByZXR1cm4gVk9MVU1FX1NUUklOR1NbIHZvbHVtZUluZGV4IF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIHRoZSBzdWJzdHJpbmdzIHRvIGRlc2NyaWJlIHRoZSBjaGFuZ2UgaW4gdm9sdW1lIGFuZCB0aGUgcmVzdWx0aW5nIGNoYW5nZSBpbiBzb2x1dGlvbiBjb2xvci5cclxuICAgKiBUaGlzIGZ1bmN0aW9uIG11c3QgaGF2ZSB0aGUgc2FtZSBuYW1lIGFzIGl0cyBjb3VudGVycGFydCBpbiBWb2x1bWVEZXNjcmliZXIuIFRoaXMgZnVuY3Rpb24gc2hvdWxkIG9ubHkgYmUgY2FsbGVkXHJcbiAgICogYXMgYSByZXN1bHQgb2YgdGhlIHZvbHVtZVByb3BlcnR5IGNoYW5naW5nIChoZW5jZSB1c2FnZSBvZiBgdGhpcy52b2x1bWVJbmNyZWFzZWRgLlxyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAcmV0dXJucyB7U3RyaW5nc0Zyb21TbGlkZXJDaGFuZ2V9IC0gY29udGFpbnMgdHdvIHN0cmluZ3MuXHJcbiAgICogQG92ZXJyaWRlXHJcbiAgICovXHJcbiAgZ2V0U3RyaW5nc0Zyb21TbGlkZXJDaGFuZ2UoKSB7XHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgLy8gXCJxdWFudGl0eVwiIG1lYW5pbmcgXCJ2b2x1bWVcIiBoZXJlXHJcbiAgICAgIHF1YW50aXR5Q2hhbmdlU3RyaW5nOiBTdHJpbmdVdGlscy5maWxsSW4oIHF1YW50aXR5Q2hhbmdlVm9sdW1lQ2hhbmdlUGF0dGVyblN0cmluZywge1xyXG4gICAgICAgIG1vcmVMZXNzOiB0aGlzLnZvbHVtZUluY3JlYXNlZCA/IG1vcmVDYXBpdGFsaXplZFN0cmluZyA6IGxlc3NDYXBpdGFsaXplZFN0cmluZ1xyXG4gICAgICB9ICksXHJcbiAgICAgIGNvbG9yQ2hhbmdlU3RyaW5nOiBTdHJpbmdVdGlscy5maWxsSW4oIHF1YW50aXR5Q2hhbmdlQ29sb3JDaGFuZ2VQYXR0ZXJuU3RyaW5nLCB7XHJcbiAgICAgICAgbGlnaHRlckRhcmtlcjogdGhpcy52b2x1bWVJbmNyZWFzZWQgPyBxdWFudGl0eUNoYW5nZUxpZ2h0ZXJTdHJpbmcgOiBxdWFudGl0eUNoYW5nZURhcmtlclN0cmluZ1xyXG4gICAgICB9IClcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZW5lcmF0ZXMgdGhlIGFyaWEtdmFsdWV0ZXh0IGZvciB0aGUgdm9sdW1lIHNsaWRlci5cclxuICAgKiBAcHVibGljXHJcbiAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgKi9cclxuICBnZXRWb2x1bWVBcmlhVmFsdWVUZXh0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlUXVhbnRpdGF0aXZlRGVzY3JpcHRpb25zUHJvcGVydHkudmFsdWUgP1xyXG4gICAgICAgICAgIHRoaXMuZ2V0Q3VycmVudFZvbHVtZSgpIDpcclxuICAgICAgICAgICBTdHJpbmdVdGlscy5maWxsSW4oIHF1YWxpdGF0aXZlVm9sdW1lU3RhdGVQYXR0ZXJuU3RyaW5nLCB7XHJcbiAgICAgICAgICAgICB2b2x1bWU6IHRoaXMuZ2V0Q3VycmVudFZvbHVtZSgpXHJcbiAgICAgICAgICAgfSApO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgd2hpY2ggaXRlbSB0byB1c2UgZnJvbSB0aGUgVk9MVU1FX1NUUklOR1MgYXJyYXkuIFJlZ2lvbiBjdXRvZmYgbnVtYmVycyBhcmUgYmFzZWQgb24ga2V5cHJlc3MgYmFsYW5jZXMsXHJcbiAqIHdoaWNoIGFyZSBkb2N1bWVudGVkIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9tb2xhcml0eS9pc3N1ZXMvMTI4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2b2x1bWVcclxuICogQHJldHVybnMge251bWJlcn0gLSBpbmRleCB0byBwdWxsIGZyb20gVk9MVU1FX1NUUklOR1MgYXJyYXkuXHJcbiAqL1xyXG5jb25zdCB2b2x1bWVUb0luZGV4ID0gdm9sdW1lID0+IHtcclxuXHJcbiAgLy8gbm9ybWFsaXplIGluIGNhc2UgdGhlIHJhbmdlIGNoYW5nZXMgaW4gdGhlIGZ1dHVyZS5cclxuICBjb25zdCBub3JtYWxpemVkVm9sdW1lID0gTW9sYXJpdHlDb25zdGFudHMuU09MVVRJT05fVk9MVU1FX1JBTkdFLmdldE5vcm1hbGl6ZWRWYWx1ZSggdm9sdW1lICk7XHJcbiAgaWYgKCBub3JtYWxpemVkVm9sdW1lIDw9IDAuMDAxMjUgKSB7XHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcbiAgZWxzZSBpZiAoIG5vcm1hbGl6ZWRWb2x1bWUgPD0gMC4xODYyNSApIHtcclxuICAgIHJldHVybiAxO1xyXG4gIH1cclxuICBlbHNlIGlmICggbm9ybWFsaXplZFZvbHVtZSA8PSAwLjM3Mzc1ICkge1xyXG4gICAgcmV0dXJuIDI7XHJcbiAgfVxyXG4gIGVsc2UgaWYgKCBub3JtYWxpemVkVm9sdW1lIDw9IDAuMzc2MjUgKSB7XHJcbiAgICByZXR1cm4gMztcclxuICB9XHJcbiAgZWxzZSBpZiAoIG5vcm1hbGl6ZWRWb2x1bWUgPD0gMC43NDg3NSApIHtcclxuICAgIHJldHVybiA0O1xyXG4gIH1cclxuICBlbHNlIGlmICggbm9ybWFsaXplZFZvbHVtZSA8PSAwLjk5ODc1ICkge1xyXG4gICAgcmV0dXJuIDU7XHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggdm9sdW1lIDw9IE1vbGFyaXR5Q29uc3RhbnRzLlNPTFVUSU9OX1ZPTFVNRV9SQU5HRS5tYXgsICd1bmV4cGVjdGVkIHZvbHVtZSBwcm92aWRlZCcgKTtcclxuICAgIHJldHVybiA2O1xyXG4gIH1cclxufTtcclxuXHJcbm1vbGFyaXR5LnJlZ2lzdGVyKCAnVm9sdW1lRGVzY3JpYmVyJywgVm9sdW1lRGVzY3JpYmVyICk7XHJcbmV4cG9ydCBkZWZhdWx0IFZvbHVtZURlc2NyaWJlcjsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxLQUFLLE1BQU0sZ0NBQWdDO0FBQ2xELE9BQU9DLFdBQVcsTUFBTSxrREFBa0Q7QUFDMUUsT0FBT0MsUUFBUSxNQUFNLHNCQUFzQjtBQUMzQyxPQUFPQyxlQUFlLE1BQU0sNkJBQTZCO0FBQ3pELE9BQU9DLGlCQUFpQixNQUFNLDRCQUE0QjtBQUMxRCxPQUFPQyx5QkFBeUIsTUFBTSxnQ0FBZ0M7QUFFdEUsTUFBTUMsa0NBQWtDLEdBQUdILGVBQWUsQ0FBQ0ksSUFBSSxDQUFDQyxZQUFZLENBQUNDLGdCQUFnQjtBQUM3RixNQUFNQyxzQ0FBc0MsR0FBR1AsZUFBZSxDQUFDSSxJQUFJLENBQUNJLGNBQWMsQ0FBQ0Msa0JBQWtCO0FBQ3JHLE1BQU1DLG1DQUFtQyxHQUFHVixlQUFlLENBQUNJLElBQUksQ0FBQ08sV0FBVyxDQUFDQyxrQkFBa0I7QUFDL0YsTUFBTUMsOENBQThDLEdBQUdiLGVBQWUsQ0FBQ0ksSUFBSSxDQUFDQyxZQUFZLENBQUNTLDRCQUE0QjtBQUNySCxNQUFNQyx1Q0FBdUMsR0FBR2YsZUFBZSxDQUFDSSxJQUFJLENBQUNJLGNBQWMsQ0FBQ1EsbUJBQW1COztBQUV2RztBQUNBLE1BQU1D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