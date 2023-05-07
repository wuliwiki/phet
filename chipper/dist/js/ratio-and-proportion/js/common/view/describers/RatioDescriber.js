// Copyright 2020-2022, University of Colorado Boulder

/**
 * Class responsible for formulating description strings about the state of the ratio and its fitness.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import LinearFunction from '../../../../../dot/js/LinearFunction.js';
import StringUtils from '../../../../../phetcommon/js/util/StringUtils.js';
import SceneryPhetStrings from '../../../../../scenery-phet/js/SceneryPhetStrings.js';
import ratioAndProportion from '../../../ratioAndProportion.js';
import RatioAndProportionStrings from '../../../RatioAndProportionStrings.js';
import rapConstants from '../../rapConstants.js';
const RATIO_FITNESS_STRINGS_CAPITALIZED = [RatioAndProportionStrings.a11y.ratio.capitalized.extremelyFarFromStringProperty.value, RatioAndProportionStrings.a11y.ratio.capitalized.veryFarFromStringProperty.value, RatioAndProportionStrings.a11y.ratio.capitalized.farFromStringProperty.value, RatioAndProportionStrings.a11y.ratio.capitalized.notSoCloseToStringProperty.value, RatioAndProportionStrings.a11y.ratio.capitalized.somewhatCloseToStringProperty.value, RatioAndProportionStrings.a11y.ratio.capitalized.veryCloseToStringProperty.value, RatioAndProportionStrings.a11y.ratio.capitalized.extremelyCloseToStringProperty.value, RatioAndProportionStrings.a11y.ratio.capitalized.atStringProperty.value];
const atInitialValue = RatioAndProportionStrings.a11y.ratio.lowercase.atStringProperty.value;
const RATIO_FITNESS_STRINGS_LOWERCASE = [RatioAndProportionStrings.a11y.ratio.lowercase.extremelyFarFromStringProperty.value, RatioAndProportionStrings.a11y.ratio.lowercase.veryFarFromStringProperty.value, RatioAndProportionStrings.a11y.ratio.lowercase.farFromStringProperty.value, RatioAndProportionStrings.a11y.ratio.lowercase.notSoCloseToStringProperty.value, RatioAndProportionStrings.a11y.ratio.lowercase.somewhatCloseToStringProperty.value, RatioAndProportionStrings.a11y.ratio.lowercase.veryCloseToStringProperty.value, RatioAndProportionStrings.a11y.ratio.lowercase.extremelyCloseToStringProperty.value, atInitialValue];
const NUMBER_TO_WORD = [SceneryPhetStrings.zeroStringProperty.value, SceneryPhetStrings.oneStringProperty.value, SceneryPhetStrings.twoStringProperty.value, SceneryPhetStrings.threeStringProperty.value, SceneryPhetStrings.fourStringProperty.value, SceneryPhetStrings.fiveStringProperty.value, SceneryPhetStrings.sixStringProperty.value, SceneryPhetStrings.sevenStringProperty.value, SceneryPhetStrings.eightStringProperty.value, SceneryPhetStrings.nineStringProperty.value, SceneryPhetStrings.tenStringProperty.value];

// an unclamped fitness of 0 should map to "somewhatCloseTo" region
const ZERO_FITNESS_REGION_INDEX = 4;
assert && assert(RATIO_FITNESS_STRINGS_LOWERCASE.length === RATIO_FITNESS_STRINGS_CAPITALIZED.length, 'should be the same length');
class RatioDescriber {
  constructor(model) {
    this.ratioFitnessProperty = model.ratioFitnessProperty;
    this.unclampedFitnessProperty = model.unclampedFitnessProperty;
    this.model = model;
    phet.log && model.unclampedFitnessProperty.link(() => {
      phet.log(this.getRatioFitness(false));
    });
  }
  getRatioFitness(capitalized = true) {
    const lastIndex = RATIO_FITNESS_STRINGS_CAPITALIZED.length - 1;
    assert && assert(RATIO_FITNESS_STRINGS_LOWERCASE[lastIndex] === atInitialValue, 'There are assumptions made about the order of these regions, likely this should not change.');
    const ratioRegions = capitalized ? RATIO_FITNESS_STRINGS_CAPITALIZED : RATIO_FITNESS_STRINGS_LOWERCASE;

    // hard coded region for in proportion
    if (this.model.inProportionProperty.value) {
      return ratioRegions[lastIndex];
    }

    // normalize based on the fitness that is not in proportion
    const normalizedMax = rapConstants.RATIO_FITNESS_RANGE.max - this.model.getInProportionThreshold();
    const lessThanZeroMapping = new LinearFunction(this.model.getMinFitness(), rapConstants.RATIO_FITNESS_RANGE.min, 0, ZERO_FITNESS_REGION_INDEX - 1, true);
    const greaterThanZeroMapping = new LinearFunction(rapConstants.RATIO_FITNESS_RANGE.min, normalizedMax, ZERO_FITNESS_REGION_INDEX, lastIndex, true);
    const unclampedFitness = this.unclampedFitnessProperty.value;
    const mappingFunction = unclampedFitness > 0 ? greaterThanZeroMapping : lessThanZeroMapping;
    return ratioRegions[Math.floor(mappingFunction.evaluate(unclampedFitness))];
  }
  getProximityToChallengeRatio() {
    // TODO: PatternStringProperty when time, https://github.com/phetsims/ratio-and-proportion/issues/499
    return StringUtils.fillIn(RatioAndProportionStrings.a11y.ratio.proximityToRatioObjectResponseStringProperty, {
      proximityToRatio: this.getRatioFitness(false)
    });
  }
  getProximityToNewChallengeRatioSentence() {
    // TODO: PatternStringProperty when time, https://github.com/phetsims/ratio-and-proportion/issues/499
    return StringUtils.fillIn(RatioAndProportionStrings.a11y.ratio.proximityToNewRatioPatternStringProperty, {
      proximity: this.getRatioFitness(false)
    });
  }
  getCurrentChallengeSentence(antecedent, consequent) {
    // TODO: PatternStringProperty when time, https://github.com/phetsims/ratio-and-proportion/issues/499
    return StringUtils.fillIn(RatioAndProportionStrings.a11y.ratio.currentChallengeStringProperty, {
      // for consistency with all values, see https://github.com/phetsims/ratio-and-proportion/issues/283
      targetAntecedent: this.getWordFromNumber(antecedent),
      targetConsequent: this.getWordFromNumber(consequent)
    });
  }
  getTargetRatioChangeAlert(antecedent, consequent) {
    // TODO: PatternStringProperty when time, https://github.com/phetsims/ratio-and-proportion/issues/499
    return StringUtils.fillIn(RatioAndProportionStrings.a11y.ratio.targetRatioChangedContextResponseStringProperty, {
      proximityToRatio: this.getProximityToNewChallengeRatioSentence(),
      currentChallenge: this.getCurrentChallengeSentence(antecedent, consequent)
    });
  }
  getWordFromNumber(number) {
    assert && assert(Number.isInteger(number));
    assert && assert(NUMBER_TO_WORD.length > number);
    return NUMBER_TO_WORD[number];
  }
}
ratioAndProportion.register('RatioDescriber', RatioDescriber);
export default RatioDescriber;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJMaW5lYXJGdW5jdGlvbiIsIlN0cmluZ1V0aWxzIiwiU2NlbmVyeVBoZXRTdHJpbmdzIiwicmF0aW9BbmRQcm9wb3J0aW9uIiwiUmF0aW9BbmRQcm9wb3J0aW9uU3RyaW5ncyIsInJhcENvbnN0YW50cyIsIlJBVElPX0ZJVE5FU1NfU1RSSU5HU19DQVBJVEFMSVpFRCIsImExMXkiLCJyYXRpbyIsImNhcGl0YWxpemVkIiwiZXh0cmVtZWx5RmFyRnJvbVN0cmluZ1Byb3BlcnR5IiwidmFsdWUiLCJ2ZXJ5RmFyRnJvbVN0cmluZ1Byb3BlcnR5IiwiZmFyRnJvbVN0cmluZ1Byb3BlcnR5Iiwibm90U29DbG9zZVRvU3RyaW5nUHJvcGVydHkiLCJzb21ld2hhdENsb3NlVG9TdHJpbmdQcm9wZXJ0eSIsInZlcnlDbG9zZVRvU3RyaW5nUHJvcGVydHkiLCJleHRyZW1lbHlDbG9zZVRvU3RyaW5nUHJvcGVydHkiLCJhdFN0cmluZ1Byb3BlcnR5IiwiYXRJbml0aWFsVmFsdWUiLCJsb3dlcmNhc2UiLCJSQVRJT19GSVRORVNTX1NUUklOR1NfTE9XRVJDQVNFIiwiTlVNQkVSX1RPX1dPUkQiLCJ6ZXJvU3RyaW5nUHJvcGVydHkiLCJvbmVTdHJpbmdQcm9wZXJ0eSIsInR3b1N0cmluZ1Byb3BlcnR5IiwidGhyZWVTdHJpbmdQcm9wZXJ0eSIsImZvdXJTdHJpbmdQcm9wZXJ0eSIsImZpdmVTdHJpbmdQcm9wZXJ0eSIsInNpeFN0cmluZ1Byb3BlcnR5Iiwic2V2ZW5TdHJpbmdQcm9wZXJ0eSIsImVpZ2h0U3RyaW5nUHJvcGVydHkiLCJuaW5lU3RyaW5nUHJvcGVydHkiLCJ0ZW5TdHJpbmdQcm9wZXJ0eSIsIlpFUk9fRklUTkVTU19SRUdJT05fSU5ERVgiLCJhc3NlcnQiLCJsZW5ndGgiLCJSYXRpb0Rlc2NyaWJlciIsImNvbnN0cnVjdG9yIiwibW9kZWwiLCJyYXRpb0ZpdG5lc3NQcm9wZXJ0eSIsInVuY2xhbXBlZEZpdG5lc3NQcm9wZXJ0eSIsInBoZXQiLCJsb2ciLCJsaW5rIiwiZ2V0UmF0aW9GaXRuZXNzIiwibGFzdEluZGV4IiwicmF0aW9SZWdpb25zIiwiaW5Qcm9wb3J0aW9uUHJvcGVydHkiLCJub3JtYWxpemVkTWF4IiwiUkFUSU9fRklUTkVTU19SQU5HRSIsIm1heCIsImdldEluUHJvcG9ydGlvblRocmVzaG9sZCIsImxlc3NUaGFuWmVyb01hcHBpbmciLCJnZXRNaW5GaXRuZXNzIiwibWluIiwiZ3JlYXRlclRoYW5aZXJvTWFwcGluZyIsInVuY2xhbXBlZEZpdG5lc3MiLCJtYXBwaW5nRnVuY3Rpb24iLCJNYXRoIiwiZmxvb3IiLCJldmFsdWF0ZSIsImdldFByb3hpbWl0eVRvQ2hhbGxlbmdlUmF0aW8iLCJmaWxsSW4iLCJwcm94aW1pdHlUb1JhdGlvT2JqZWN0UmVzcG9uc2VTdHJpbmdQcm9wZXJ0eSIsInByb3hpbWl0eVRvUmF0aW8iLCJnZXRQcm94aW1pdHlUb05ld0NoYWxsZW5nZVJhdGlvU2VudGVuY2UiLCJwcm94aW1pdHlUb05ld1JhdGlvUGF0dGVyblN0cmluZ1Byb3BlcnR5IiwicHJveGltaXR5IiwiZ2V0Q3VycmVudENoYWxsZW5nZVNlbnRlbmNlIiwiYW50ZWNlZGVudCIsImNvbnNlcXVlbnQiLCJjdXJyZW50Q2hhbGxlbmdlU3RyaW5nUHJvcGVydHkiLCJ0YXJnZXRBbnRlY2VkZW50IiwiZ2V0V29yZEZyb21OdW1iZXIiLCJ0YXJnZXRDb25zZXF1ZW50IiwiZ2V0VGFyZ2V0UmF0aW9DaGFuZ2VBbGVydCIsInRhcmdldFJhdGlvQ2hhbmdlZENvbnRleHRSZXNwb25zZVN0cmluZ1Byb3BlcnR5IiwiY3VycmVudENoYWxsZW5nZSIsIm51bWJlciIsIk51bWJlciIsImlzSW50ZWdlciIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiUmF0aW9EZXNjcmliZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogQ2xhc3MgcmVzcG9uc2libGUgZm9yIGZvcm11bGF0aW5nIGRlc2NyaXB0aW9uIHN0cmluZ3MgYWJvdXQgdGhlIHN0YXRlIG9mIHRoZSByYXRpbyBhbmQgaXRzIGZpdG5lc3MuXHJcbiAqIEBhdXRob3IgTWljaGFlbCBLYXV6bWFubiAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgTGluZWFyRnVuY3Rpb24gZnJvbSAnLi4vLi4vLi4vLi4vLi4vZG90L2pzL0xpbmVhckZ1bmN0aW9uLmpzJztcclxuaW1wb3J0IFN0cmluZ1V0aWxzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3BoZXRjb21tb24vanMvdXRpbC9TdHJpbmdVdGlscy5qcyc7XHJcbmltcG9ydCBTY2VuZXJ5UGhldFN0cmluZ3MgZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL1NjZW5lcnlQaGV0U3RyaW5ncy5qcyc7XHJcbmltcG9ydCByYXRpb0FuZFByb3BvcnRpb24gZnJvbSAnLi4vLi4vLi4vcmF0aW9BbmRQcm9wb3J0aW9uLmpzJztcclxuaW1wb3J0IFJhdGlvQW5kUHJvcG9ydGlvblN0cmluZ3MgZnJvbSAnLi4vLi4vLi4vUmF0aW9BbmRQcm9wb3J0aW9uU3RyaW5ncy5qcyc7XHJcbmltcG9ydCByYXBDb25zdGFudHMgZnJvbSAnLi4vLi4vcmFwQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IFJBUE1vZGVsIGZyb20gJy4uLy4uL21vZGVsL1JBUE1vZGVsLmpzJztcclxuaW1wb3J0IFRSZWFkT25seVByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uLy4uL2F4b24vanMvVFJlYWRPbmx5UHJvcGVydHkuanMnO1xyXG5cclxuY29uc3QgUkFUSU9fRklUTkVTU19TVFJJTkdTX0NBUElUQUxJWkVEID0gW1xyXG4gIFJhdGlvQW5kUHJvcG9ydGlvblN0cmluZ3MuYTExeS5yYXRpby5jYXBpdGFsaXplZC5leHRyZW1lbHlGYXJGcm9tU3RyaW5nUHJvcGVydHkudmFsdWUsXHJcbiAgUmF0aW9BbmRQcm9wb3J0aW9uU3RyaW5ncy5hMTF5LnJhdGlvLmNhcGl0YWxpemVkLnZlcnlGYXJGcm9tU3RyaW5nUHJvcGVydHkudmFsdWUsXHJcbiAgUmF0aW9BbmRQcm9wb3J0aW9uU3RyaW5ncy5hMTF5LnJhdGlvLmNhcGl0YWxpemVkLmZhckZyb21TdHJpbmdQcm9wZXJ0eS52YWx1ZSxcclxuICBSYXRpb0FuZFByb3BvcnRpb25TdHJpbmdzLmExMXkucmF0aW8uY2FwaXRhbGl6ZWQubm90U29DbG9zZVRvU3RyaW5nUHJvcGVydHkudmFsdWUsXHJcbiAgUmF0aW9BbmRQcm9wb3J0aW9uU3RyaW5ncy5hMTF5LnJhdGlvLmNhcGl0YWxpemVkLnNvbWV3aGF0Q2xvc2VUb1N0cmluZ1Byb3BlcnR5LnZhbHVlLFxyXG4gIFJhdGlvQW5kUHJvcG9ydGlvblN0cmluZ3MuYTExeS5yYXRpby5jYXBpdGFsaXplZC52ZXJ5Q2xvc2VUb1N0cmluZ1Byb3BlcnR5LnZhbHVlLFxyXG4gIFJhdGlvQW5kUHJvcG9ydGlvblN0cmluZ3MuYTExeS5yYXRpby5jYXBpdGFsaXplZC5leHRyZW1lbHlDbG9zZVRvU3RyaW5nUHJvcGVydHkudmFsdWUsXHJcbiAgUmF0aW9BbmRQcm9wb3J0aW9uU3RyaW5ncy5hMTF5LnJhdGlvLmNhcGl0YWxpemVkLmF0U3RyaW5nUHJvcGVydHkudmFsdWVcclxuXTtcclxuXHJcbmNvbnN0IGF0SW5pdGlhbFZhbHVlID0gUmF0aW9BbmRQcm9wb3J0aW9uU3RyaW5ncy5hMTF5LnJhdGlvLmxvd2VyY2FzZS5hdFN0cmluZ1Byb3BlcnR5LnZhbHVlO1xyXG5cclxuY29uc3QgUkFUSU9fRklUTkVTU19TVFJJTkdTX0xPV0VSQ0FTRSA9IFtcclxuICBSYXRpb0FuZFByb3BvcnRpb25TdHJpbmdzLmExMXkucmF0aW8ubG93ZXJjYXNlLmV4dHJlbWVseUZhckZyb21TdHJpbmdQcm9wZXJ0eS52YWx1ZSxcclxuICBSYXRpb0FuZFByb3BvcnRpb25TdHJpbmdzLmExMXkucmF0aW8ubG93ZXJjYXNlLnZlcnlGYXJGcm9tU3RyaW5nUHJvcGVydHkudmFsdWUsXHJcbiAgUmF0aW9BbmRQcm9wb3J0aW9uU3RyaW5ncy5hMTF5LnJhdGlvLmxvd2VyY2FzZS5mYXJGcm9tU3RyaW5nUHJvcGVydHkudmFsdWUsXHJcbiAgUmF0aW9BbmRQcm9wb3J0aW9uU3RyaW5ncy5hMTF5LnJhdGlvLmxvd2VyY2FzZS5ub3RTb0Nsb3NlVG9TdHJpbmdQcm9wZXJ0eS52YWx1ZSxcclxuICBSYXRpb0FuZFByb3BvcnRpb25TdHJpbmdzLmExMXkucmF0aW8ubG93ZXJjYXNlLnNvbWV3aGF0Q2xvc2VUb1N0cmluZ1Byb3BlcnR5LnZhbHVlLFxyXG4gIFJhdGlvQW5kUHJvcG9ydGlvblN0cmluZ3MuYTExeS5yYXRpby5sb3dlcmNhc2UudmVyeUNsb3NlVG9TdHJpbmdQcm9wZXJ0eS52YWx1ZSxcclxuICBSYXRpb0FuZFByb3BvcnRpb25TdHJpbmdzLmExMXkucmF0aW8ubG93ZXJjYXNlLmV4dHJlbWVseUNsb3NlVG9TdHJpbmdQcm9wZXJ0eS52YWx1ZSxcclxuICBhdEluaXRpYWxWYWx1ZVxyXG5dO1xyXG5cclxuY29uc3QgTlVNQkVSX1RPX1dPUkQgPSBbXHJcbiAgU2NlbmVyeVBoZXRTdHJpbmdzLnplcm9TdHJpbmdQcm9wZXJ0eS52YWx1ZSxcclxuICBTY2VuZXJ5UGhldFN0cmluZ3Mub25lU3RyaW5nUHJvcGVydHkudmFsdWUsXHJcbiAgU2NlbmVyeVBoZXRTdHJpbmdzLnR3b1N0cmluZ1Byb3BlcnR5LnZhbHVlLFxyXG4gIFNjZW5lcnlQaGV0U3RyaW5ncy50aHJlZVN0cmluZ1Byb3BlcnR5LnZhbHVlLFxyXG4gIFNjZW5lcnlQaGV0U3RyaW5ncy5mb3VyU3RyaW5nUHJvcGVydHkudmFsdWUsXHJcbiAgU2NlbmVyeVBoZXRTdHJpbmdzLmZpdmVTdHJpbmdQcm9wZXJ0eS52YWx1ZSxcclxuICBTY2VuZXJ5UGhldFN0cmluZ3Muc2l4U3RyaW5nUHJvcGVydHkudmFsdWUsXHJcbiAgU2NlbmVyeVBoZXRTdHJpbmdzLnNldmVuU3RyaW5nUHJvcGVydHkudmFsdWUsXHJcbiAgU2NlbmVyeVBoZXRTdHJpbmdzLmVpZ2h0U3RyaW5nUHJvcGVydHkudmFsdWUsXHJcbiAgU2NlbmVyeVBoZXRTdHJpbmdzLm5pbmVTdHJpbmdQcm9wZXJ0eS52YWx1ZSxcclxuICBTY2VuZXJ5UGhldFN0cmluZ3MudGVuU3RyaW5nUHJvcGVydHkudmFsdWVcclxuXTtcclxuXHJcbi8vIGFuIHVuY2xhbXBlZCBmaXRuZXNzIG9mIDAgc2hvdWxkIG1hcCB0byBcInNvbWV3aGF0Q2xvc2VUb1wiIHJlZ2lvblxyXG5jb25zdCBaRVJPX0ZJVE5FU1NfUkVHSU9OX0lOREVYID0gNDtcclxuXHJcbmFzc2VydCAmJiBhc3NlcnQoIFJBVElPX0ZJVE5FU1NfU1RSSU5HU19MT1dFUkNBU0UubGVuZ3RoID09PSBSQVRJT19GSVRORVNTX1NUUklOR1NfQ0FQSVRBTElaRUQubGVuZ3RoLCAnc2hvdWxkIGJlIHRoZSBzYW1lIGxlbmd0aCcgKTtcclxuXHJcbmNsYXNzIFJhdGlvRGVzY3JpYmVyIHtcclxuXHJcbiAgcHJpdmF0ZSByYXRpb0ZpdG5lc3NQcm9wZXJ0eTogVFJlYWRPbmx5UHJvcGVydHk8bnVtYmVyPjtcclxuICBwcml2YXRlIHVuY2xhbXBlZEZpdG5lc3NQcm9wZXJ0eTogVFJlYWRPbmx5UHJvcGVydHk8bnVtYmVyPjtcclxuICBwcml2YXRlIG1vZGVsOiBSQVBNb2RlbDtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBtb2RlbDogUkFQTW9kZWwgKSB7XHJcblxyXG4gICAgdGhpcy5yYXRpb0ZpdG5lc3NQcm9wZXJ0eSA9IG1vZGVsLnJhdGlvRml0bmVzc1Byb3BlcnR5O1xyXG4gICAgdGhpcy51bmNsYW1wZWRGaXRuZXNzUHJvcGVydHkgPSBtb2RlbC51bmNsYW1wZWRGaXRuZXNzUHJvcGVydHk7XHJcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XHJcblxyXG4gICAgcGhldC5sb2cgJiYgbW9kZWwudW5jbGFtcGVkRml0bmVzc1Byb3BlcnR5LmxpbmsoICgpID0+IHtcclxuICAgICAgcGhldC5sb2coIHRoaXMuZ2V0UmF0aW9GaXRuZXNzKCBmYWxzZSApICk7XHJcbiAgICB9ICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UmF0aW9GaXRuZXNzKCBjYXBpdGFsaXplZCA9IHRydWUgKTogc3RyaW5nIHtcclxuXHJcbiAgICBjb25zdCBsYXN0SW5kZXggPSBSQVRJT19GSVRORVNTX1NUUklOR1NfQ0FQSVRBTElaRUQubGVuZ3RoIC0gMTtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIFJBVElPX0ZJVE5FU1NfU1RSSU5HU19MT1dFUkNBU0VbIGxhc3RJbmRleCBdID09PSBhdEluaXRpYWxWYWx1ZSwgJ1RoZXJlIGFyZSBhc3N1bXB0aW9ucyBtYWRlIGFib3V0IHRoZSBvcmRlciBvZiB0aGVzZSByZWdpb25zLCBsaWtlbHkgdGhpcyBzaG91bGQgbm90IGNoYW5nZS4nICk7XHJcblxyXG4gICAgY29uc3QgcmF0aW9SZWdpb25zID0gY2FwaXRhbGl6ZWQgPyBSQVRJT19GSVRORVNTX1NUUklOR1NfQ0FQSVRBTElaRUQgOiBSQVRJT19GSVRORVNTX1NUUklOR1NfTE9XRVJDQVNFO1xyXG5cclxuICAgIC8vIGhhcmQgY29kZWQgcmVnaW9uIGZvciBpbiBwcm9wb3J0aW9uXHJcbiAgICBpZiAoIHRoaXMubW9kZWwuaW5Qcm9wb3J0aW9uUHJvcGVydHkudmFsdWUgKSB7XHJcbiAgICAgIHJldHVybiByYXRpb1JlZ2lvbnNbIGxhc3RJbmRleCBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG5vcm1hbGl6ZSBiYXNlZCBvbiB0aGUgZml0bmVzcyB0aGF0IGlzIG5vdCBpbiBwcm9wb3J0aW9uXHJcbiAgICBjb25zdCBub3JtYWxpemVkTWF4ID0gcmFwQ29uc3RhbnRzLlJBVElPX0ZJVE5FU1NfUkFOR0UubWF4IC0gdGhpcy5tb2RlbC5nZXRJblByb3BvcnRpb25UaHJlc2hvbGQoKTtcclxuXHJcbiAgICBjb25zdCBsZXNzVGhhblplcm9NYXBwaW5nID0gbmV3IExpbmVhckZ1bmN0aW9uKCB0aGlzLm1vZGVsLmdldE1pbkZpdG5lc3MoKSwgcmFwQ29uc3RhbnRzLlJBVElPX0ZJVE5FU1NfUkFOR0UubWluLCAwLCBaRVJPX0ZJVE5FU1NfUkVHSU9OX0lOREVYIC0gMSwgdHJ1ZSApO1xyXG4gICAgY29uc3QgZ3JlYXRlclRoYW5aZXJvTWFwcGluZyA9IG5ldyBMaW5lYXJGdW5jdGlvbiggcmFwQ29uc3RhbnRzLlJBVElPX0ZJVE5FU1NfUkFOR0UubWluLCBub3JtYWxpemVkTWF4LFxyXG4gICAgICBaRVJPX0ZJVE5FU1NfUkVHSU9OX0lOREVYLCBsYXN0SW5kZXgsIHRydWUgKTtcclxuXHJcbiAgICBjb25zdCB1bmNsYW1wZWRGaXRuZXNzID0gdGhpcy51bmNsYW1wZWRGaXRuZXNzUHJvcGVydHkudmFsdWU7XHJcblxyXG4gICAgY29uc3QgbWFwcGluZ0Z1bmN0aW9uID0gdW5jbGFtcGVkRml0bmVzcyA+IDAgPyBncmVhdGVyVGhhblplcm9NYXBwaW5nIDogbGVzc1RoYW5aZXJvTWFwcGluZztcclxuXHJcbiAgICByZXR1cm4gcmF0aW9SZWdpb25zWyBNYXRoLmZsb29yKCBtYXBwaW5nRnVuY3Rpb24uZXZhbHVhdGUoIHVuY2xhbXBlZEZpdG5lc3MgKSApIF07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UHJveGltaXR5VG9DaGFsbGVuZ2VSYXRpbygpOiBzdHJpbmcge1xyXG4gICAgLy8gVE9ETzogUGF0dGVyblN0cmluZ1Byb3BlcnR5IHdoZW4gdGltZSwgaHR0cHM6Ly9naXRodWIuY29tL3BoZXRzaW1zL3JhdGlvLWFuZC1wcm9wb3J0aW9uL2lzc3Vlcy80OTlcclxuICAgIHJldHVybiBTdHJpbmdVdGlscy5maWxsSW4oIFJhdGlvQW5kUHJvcG9ydGlvblN0cmluZ3MuYTExeS5yYXRpby5wcm94aW1pdHlUb1JhdGlvT2JqZWN0UmVzcG9uc2VTdHJpbmdQcm9wZXJ0eSwge1xyXG4gICAgICBwcm94aW1pdHlUb1JhdGlvOiB0aGlzLmdldFJhdGlvRml0bmVzcyggZmFsc2UgKVxyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFByb3hpbWl0eVRvTmV3Q2hhbGxlbmdlUmF0aW9TZW50ZW5jZSgpOiBzdHJpbmcge1xyXG4gICAgLy8gVE9ETzogUGF0dGVyblN0cmluZ1Byb3BlcnR5IHdoZW4gdGltZSwgaHR0cHM6Ly9naXRodWIuY29tL3BoZXRzaW1zL3JhdGlvLWFuZC1wcm9wb3J0aW9uL2lzc3Vlcy80OTlcclxuICAgIHJldHVybiBTdHJpbmdVdGlscy5maWxsSW4oIFJhdGlvQW5kUHJvcG9ydGlvblN0cmluZ3MuYTExeS5yYXRpby5wcm94aW1pdHlUb05ld1JhdGlvUGF0dGVyblN0cmluZ1Byb3BlcnR5LCB7XHJcbiAgICAgIHByb3hpbWl0eTogdGhpcy5nZXRSYXRpb0ZpdG5lc3MoIGZhbHNlIClcclxuICAgIH0gKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDdXJyZW50Q2hhbGxlbmdlU2VudGVuY2UoIGFudGVjZWRlbnQ6IG51bWJlciwgY29uc2VxdWVudDogbnVtYmVyICk6IHN0cmluZyB7XHJcbiAgICAvLyBUT0RPOiBQYXR0ZXJuU3RyaW5nUHJvcGVydHkgd2hlbiB0aW1lLCBodHRwczovL2dpdGh1Yi5jb20vcGhldHNpbXMvcmF0aW8tYW5kLXByb3BvcnRpb24vaXNzdWVzLzQ5OVxyXG4gICAgcmV0dXJuIFN0cmluZ1V0aWxzLmZpbGxJbiggUmF0aW9BbmRQcm9wb3J0aW9uU3RyaW5ncy5hMTF5LnJhdGlvLmN1cnJlbnRDaGFsbGVuZ2VTdHJpbmdQcm9wZXJ0eSwge1xyXG5cclxuICAgICAgLy8gZm9yIGNvbnNpc3RlbmN5IHdpdGggYWxsIHZhbHVlcywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9yYXRpby1hbmQtcHJvcG9ydGlvbi9pc3N1ZXMvMjgzXHJcbiAgICAgIHRhcmdldEFudGVjZWRlbnQ6IHRoaXMuZ2V0V29yZEZyb21OdW1iZXIoIGFudGVjZWRlbnQgKSxcclxuICAgICAgdGFyZ2V0Q29uc2VxdWVudDogdGhpcy5nZXRXb3JkRnJvbU51bWJlciggY29uc2VxdWVudCApXHJcbiAgICB9ICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VGFyZ2V0UmF0aW9DaGFuZ2VBbGVydCggYW50ZWNlZGVudDogbnVtYmVyLCBjb25zZXF1ZW50OiBudW1iZXIgKTogc3RyaW5nIHtcclxuICAgIC8vIFRPRE86IFBhdHRlcm5TdHJpbmdQcm9wZXJ0eSB3aGVuIHRpbWUsIGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9yYXRpby1hbmQtcHJvcG9ydGlvbi9pc3N1ZXMvNDk5XHJcbiAgICByZXR1cm4gU3RyaW5nVXRpbHMuZmlsbEluKCBSYXRpb0FuZFByb3BvcnRpb25TdHJpbmdzLmExMXkucmF0aW8udGFyZ2V0UmF0aW9DaGFuZ2VkQ29udGV4dFJlc3BvbnNlU3RyaW5nUHJvcGVydHksIHtcclxuICAgICAgcHJveGltaXR5VG9SYXRpbzogdGhpcy5nZXRQcm94aW1pdHlUb05ld0NoYWxsZW5nZVJhdGlvU2VudGVuY2UoKSxcclxuICAgICAgY3VycmVudENoYWxsZW5nZTogdGhpcy5nZXRDdXJyZW50Q2hhbGxlbmdlU2VudGVuY2UoIGFudGVjZWRlbnQsIGNvbnNlcXVlbnQgKVxyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFdvcmRGcm9tTnVtYmVyKCBudW1iZXI6IG51bWJlciApOiBzdHJpbmcge1xyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggTnVtYmVyLmlzSW50ZWdlciggbnVtYmVyICkgKTtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIE5VTUJFUl9UT19XT1JELmxlbmd0aCA+IG51bWJlciApO1xyXG4gICAgcmV0dXJuIE5VTUJFUl9UT19XT1JEWyBudW1iZXIgXTtcclxuICB9XHJcbn1cclxuXHJcbnJhdGlvQW5kUHJvcG9ydGlvbi5yZWdpc3RlciggJ1JhdGlvRGVzY3JpYmVyJywgUmF0aW9EZXNjcmliZXIgKTtcclxuZXhwb3J0IGRlZmF1bHQgUmF0aW9EZXNjcmliZXI7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFF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