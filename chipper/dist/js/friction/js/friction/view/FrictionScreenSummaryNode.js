// Copyright 2018-2022, University of Colorado Boulder

/**
 * Node that holds the PDOM content for the screen summary in Friction.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import { Node } from '../../../../scenery/js/imports.js';
import friction from '../../friction.js';
import FrictionStrings from '../../FrictionStrings.js';
import FrictionConstants from '../FrictionConstants.js';
import FrictionModel from '../model/FrictionModel.js';

// constants
const summarySentencePatternString = FrictionStrings.a11y.screenSummary.summarySentencePattern;
const droppingAsAtomsJiggleLessString = FrictionStrings.a11y.screenSummary.droppingAsAtomsJiggleLess;
const atomsJigglePatternString = FrictionStrings.a11y.screenSummary.atomsJigglePattern;
const jiggleClausePatternString = FrictionStrings.a11y.screenSummary.jiggleClausePattern;
const jiggleTemperatureScaleSentenceString = FrictionStrings.a11y.screenSummary.jiggleTemperatureScaleSentence;
const temperaturePatternString = FrictionStrings.a11y.temperature.pattern;
const temperatureThermometerPatternString = FrictionStrings.a11y.temperature.thermometerPattern;
const grabChemistryBookPlayString = FrictionStrings.a11y.screenSummary.grabChemistryBookPlay;
const resetSimMoreObservationSentenceString = FrictionStrings.a11y.resetSimMoreObservationSentence;
const startingChemistryBookPatternString = FrictionStrings.a11y.screenSummary.startingChemistryBookPattern;
const startingChemistryBookLightlyPatternString = FrictionStrings.a11y.screenSummary.startingChemistryBookLightlyPattern;
const amountOfAtomsString = FrictionStrings.a11y.amountOfAtoms.sentence;
const fewerString = FrictionStrings.a11y.amountOfAtoms.fewer;
const farFewerString = FrictionStrings.a11y.amountOfAtoms.farFewer;
const someString = FrictionStrings.a11y.amountOfAtoms.some;
const manyString = FrictionStrings.a11y.amountOfAtoms.many;
class FrictionScreenSummaryNode extends Node {
  /**
   *
   * @param contactProperty
   * @param numberOfAtomsShearedOffProperty
   * @param vibrationAmplitudeProperty
   * @param thermometerMinTemp
   * @param thermometerMaxTemp
   * @param temperatureDecreasingAlerter
   */
  constructor(contactProperty, numberOfAtomsShearedOffProperty, vibrationAmplitudeProperty, thermometerMinTemp, thermometerMaxTemp, temperatureDecreasingAlerter) {
    super();

    // @private
    this.contactProperty = contactProperty;
    this.numberOfAtomsShearedOffProperty = numberOfAtomsShearedOffProperty;
    this.vibrationAmplitudeProperty = vibrationAmplitudeProperty;
    this.booksParagraph = new Node({
      tagName: 'p'
    });
    this.interactionHintParagraph = new Node({
      tagName: 'p'
    });
    this.thermometerMinTemp = thermometerMinTemp;
    this.thermometerMaxTemp = thermometerMaxTemp;

    // requires an init
    this.updateSummaryString();

    // pdom - update the screen summary when the model changes
    let previousTempString = this.amplitudeToTempString(this.vibrationAmplitudeProperty.value);
    let previousJiggleString = this.amplitudeToJiggleString(this.vibrationAmplitudeProperty.value);

    // make a11y updates as the amplitude changes in the model, no need to unlink, exists for sim lifetime.
    this.vibrationAmplitudeProperty.link(amplitude => {
      // the temperature is decreasing
      const tempDecreasing = temperatureDecreasingAlerter.tempDecreasing;

      // Not if it is completely cool, so we don't trigger the update too much.
      const amplitudeSettledButNotMin = amplitude < FrictionModel.AMPLITUDE_SETTLED_THRESHOLD &&
      // considered in a "settled" state
      amplitude !== FrictionModel.VIBRATION_AMPLITUDE_MIN; // not the minimum amplitude

      // nested if statements so that we don't have to calculate these strings as much
      if (tempDecreasing || amplitudeSettledButNotMin || this.amplitudeToTempString(amplitude) !== previousTempString || this.amplitudeToJiggleString(amplitude) !== previousJiggleString) {
        // if jiggle or temperature changed, update the string
        this.updateSummaryString();
        previousTempString = this.amplitudeToTempString(amplitude); // compute this again for a more efficient if statement
        previousJiggleString = this.amplitudeToJiggleString(amplitude); // compute this again for a more efficient if statement
      }
    });

    // exists for the lifetime of the sim, no need to unlink
    this.contactProperty.link(() => {
      this.updateSummaryString();
    });
    this.mutate({
      children: [this.booksParagraph, this.interactionHintParagraph],
      // pdom
      tagName: 'div'
    });
  }

  /**
   * Given the number of atoms that have sheared off from the model so far, get the first screen summary sentence,
   * describing the chemistry book.
   * @param {number} numberAtomsShearedOff
   * @returns {string} the first sentence of the screen summary
   * @private
   */
  getFirstSummarySentence(numberAtomsShearedOff) {
    // There are three ranges based on how many atoms have sheared off

    let relativeChemistryBookSentence = null;
    // "no shearable atoms"
    if (numberAtomsShearedOff === 0) {
      relativeChemistryBookSentence = ''; // blank initial sentence of "First Sentence"
    }

    // some atoms have sheared off, describe the chemistry book with some atoms "broken away"
    else if (numberAtomsShearedOff < FrictionModel.NUMBER_OF_SHEARABLE_ATOMS) {
      relativeChemistryBookSentence = StringUtils.fillIn(amountOfAtomsString, {
        comparisonAmount: fewerString,
        breakAwayAmount: someString,
        space: ' '
      });
    }

    // lots of atoms sheared off, describe many missing atoms
    else {
      relativeChemistryBookSentence = StringUtils.fillIn(amountOfAtomsString, {
        comparisonAmount: farFewerString,
        breakAwayAmount: manyString,
        space: ' '
      });
    }
    return StringUtils.fillIn(this.contactProperty.value ? startingChemistryBookPatternString : startingChemistryBookLightlyPatternString, {
      relativeChemistryBookSentence: relativeChemistryBookSentence
    });
  }

  /**
   * Implementation to go from amplitude to an index for a list of strings to describe the model amplitude. Either
   * the temperature or the amount of jiggling.
   * @private
   * @param {number} amplitude
   * @param {Array.<string>} stringsList
   * @returns {number}
   */
  amplitudeToIndex(amplitude, stringsList) {
    if (amplitude > this.thermometerMaxTemp) {
      amplitude = this.thermometerMaxTemp;
    }

    // cancel out the range
    const normalized = (amplitude - this.thermometerMinTemp) / this.thermometerMaxTemp;
    let i = Math.floor(normalized * stringsList.length);

    // to account for javascript rounding problems
    if (i === stringsList.length) {
      i = stringsList.length - 1;
    }
    assert && assert(i >= 0 && i < stringsList.length);
    return i;
  }

  /**
   * Map the amplitude of the model to a temperature string
   * @private
   * @a11y
   * @param {number} amplitude
   * @returns {string} the temp string based on the amplitude of the model
   */
  amplitudeToTempString(amplitude) {
    const i = this.amplitudeToIndex(amplitude, FrictionConstants.TEMPERATURE_STRINGS);
    return FrictionConstants.TEMPERATURE_STRINGS[i];
  }

  /**
   * Map the amplitude of the model to a "jiggle" string
   * @private
   * @a11y
   * @param {number} amplitude
   * @returns {string} the "jiggle" amount string based on the amplitude of the model
   */
  amplitudeToJiggleString(amplitude) {
    const i = this.amplitudeToIndex(amplitude, FrictionConstants.JIGGLE_STRINGS);
    return FrictionConstants.JIGGLE_STRINGS[i];
  }

  /**
   * Construct the second screen summary sentence about the zoomed in chemistry book.
   * @param {Property.<number>} vibrationAmplitudeProperty
   * @returns {*|string}
   * @private
   */
  getSecondSummarySentence(vibrationAmplitudeProperty) {
    // {{boolean}} is sim "in transition"? meaning it is changing, because it isn't settled (settled is the opposite of "in transition"
    const inTransition = vibrationAmplitudeProperty.value > FrictionModel.AMPLITUDE_SETTLED_THRESHOLD;

    // Default to describing the jiggling of the atoms
    const jiggleAmount = StringUtils.fillIn(atomsJigglePatternString, {
      jiggleAmount: this.amplitudeToJiggleString(vibrationAmplitudeProperty.value)
    });
    let jiggleClause = StringUtils.fillIn(jiggleClausePatternString, {
      jiggleAmount: jiggleAmount
    });

    // If the temperature is decreasing, then describe the jiggling relatively
    if (inTransition) {
      jiggleClause = StringUtils.fillIn(jiggleClausePatternString, {
        jiggleAmount: droppingAsAtomsJiggleLessString
      });
    }

    // Fill in the current temperature string
    const tempString = StringUtils.fillIn(inTransition ? temperaturePatternString : temperatureThermometerPatternString, {
      temp: this.amplitudeToTempString(vibrationAmplitudeProperty.value)
    });

    // Construct the final sentence from its parts
    return StringUtils.fillIn(jiggleTemperatureScaleSentenceString, {
      jigglingClause: jiggleClause,
      temperatureClause: tempString
    });
  }

  /**
   * @private
   * @param {number} numberOfAtomsShearedOff
   * @returns {string}
   */
  getThirdSupplementarySentence(numberOfAtomsShearedOff) {
    // Queue moving the book if there are still many atoms left, queue reset if there are many atoms sheared off
    return numberOfAtomsShearedOff === FrictionModel.NUMBER_OF_SHEARABLE_ATOMS ? resetSimMoreObservationSentenceString : grabChemistryBookPlayString;
  }

  /**
   * Update the summary string in the PDOM
   * @private
   * @a11y
   */
  updateSummaryString() {
    this.booksParagraph.innerContent = this.getCurrentDetailsString();

    // SUPPLEMENTARY THIRD SENTENCE
    this.interactionHintParagraph.innerContent = this.getHintString();
  }

  /**
   * @public
   * @returns {string}
   */
  getCurrentDetailsString() {
    // FIRST SENTENCE
    const chemistryBookString = this.getFirstSummarySentence(this.numberOfAtomsShearedOffProperty.value);

    // SECOND SENTENCE (ZOOMED-IN)
    const jiggleTempSentence = this.getSecondSummarySentence(this.vibrationAmplitudeProperty);
    return StringUtils.fillIn(summarySentencePatternString, {
      chemistryBookString: chemistryBookString,
      jiggleTemperatureScaleSentence: jiggleTempSentence
    });
  }

  /**
   * @public
   * @returns {string}
   */
  getHintString() {
    return this.numberOfAtomsShearedOffProperty.value === FrictionModel.NUMBER_OF_SHEARABLE_ATOMS ? resetSimMoreObservationSentenceString : this.contactProperty.value ? FrictionStrings.a11y.screenSummary.continueRubbing : FrictionStrings.a11y.screenSummary.grabChemistryBookPlay;
  }
}
friction.register('FrictionScreenSummaryNode', FrictionScreenSummaryNode);
export default FrictionScreenSummaryNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTdHJpbmdVdGlscyIsIk5vZGUiLCJmcmljdGlvbiIsIkZyaWN0aW9uU3RyaW5ncyIsIkZyaWN0aW9uQ29uc3RhbnRzIiwiRnJpY3Rpb25Nb2RlbCIsInN1bW1hcnlTZW50ZW5jZVBhdHRlcm5TdHJpbmciLCJhMTF5Iiwic2NyZWVuU3VtbWFyeSIsInN1bW1hcnlTZW50ZW5jZVBhdHRlcm4iLCJkcm9wcGluZ0FzQXRvbXNKaWdnbGVMZXNzU3RyaW5nIiwiZHJvcHBpbmdBc0F0b21zSmlnZ2xlTGVzcyIsImF0b21zSmlnZ2xlUGF0dGVyblN0cmluZyIsImF0b21zSmlnZ2xlUGF0dGVybiIsImppZ2dsZUNsYXVzZVBhdHRlcm5TdHJpbmciLCJqaWdnbGVDbGF1c2VQYXR0ZXJuIiwiamlnZ2xlVGVtcGVyYXR1cmVTY2FsZVNlbnRlbmNlU3RyaW5nIiwiamlnZ2xlVGVtcGVyYXR1cmVTY2FsZVNlbnRlbmNlIiwidGVtcGVyYXR1cmVQYXR0ZXJuU3RyaW5nIiwidGVtcGVyYXR1cmUiLCJwYXR0ZXJuIiwidGVtcGVyYXR1cmVUaGVybW9tZXRlclBhdHRlcm5TdHJpbmciLCJ0aGVybW9tZXRlclBhdHRlcm4iLCJncmFiQ2hlbWlzdHJ5Qm9va1BsYXlTdHJpbmciLCJncmFiQ2hlbWlzdHJ5Qm9va1BsYXkiLCJyZXNldFNpbU1vcmVPYnNlcnZhdGlvblNlbnRlbmNlU3RyaW5nIiwicmVzZXRTaW1Nb3JlT2JzZXJ2YXRpb25TZW50ZW5jZSIsInN0YXJ0aW5nQ2hlbWlzdHJ5Qm9va1BhdHRlcm5TdHJpbmciLCJzdGFydGluZ0NoZW1pc3RyeUJvb2tQYXR0ZXJuIiwic3RhcnRpbmdDaGVtaXN0cnlCb29rTGlnaHRseVBhdHRlcm5TdHJpbmciLCJzdGFydGluZ0NoZW1pc3RyeUJvb2tMaWdodGx5UGF0dGVybiIsImFtb3VudE9mQXRvbXNTdHJpbmciLCJhbW91bnRPZkF0b21zIiwic2VudGVuY2UiLCJmZXdlclN0cmluZyIsImZld2VyIiwiZmFyRmV3ZXJTdHJpbmciLCJmYXJGZXdlciIsInNvbWVTdHJpbmciLCJzb21lIiwibWFueVN0cmluZyIsIm1hbnkiLCJGcmljdGlvblNjcmVlblN1bW1hcnlOb2RlIiwiY29uc3RydWN0b3IiLCJjb250YWN0UHJvcGVydHkiLCJudW1iZXJPZkF0b21zU2hlYXJlZE9mZlByb3BlcnR5IiwidmlicmF0aW9uQW1wbGl0dWRlUHJvcGVydHkiLCJ0aGVybW9tZXRlck1pblRlbXAiLCJ0aGVybW9tZXRlck1heFRlbXAiLCJ0ZW1wZXJhdHVyZURlY3JlYXNpbmdBbGVydGVyIiwiYm9va3NQYXJhZ3JhcGgiLCJ0YWdOYW1lIiwiaW50ZXJhY3Rpb25IaW50UGFyYWdyYXBoIiwidXBkYXRlU3VtbWFyeVN0cmluZyIsInByZXZpb3VzVGVtcFN0cmluZyIsImFtcGxpdHVkZVRvVGVtcFN0cmluZyIsInZhbHVlIiwicHJldmlvdXNKaWdnbGVTdHJpbmciLCJhbXBsaXR1ZGVUb0ppZ2dsZVN0cmluZyIsImxpbmsiLCJhbXBsaXR1ZGUiLCJ0ZW1wRGVjcmVhc2luZyIsImFtcGxpdHVkZVNldHRsZWRCdXROb3RNaW4iLCJBTVBMSVRVREVfU0VUVExFRF9USFJFU0hPTEQiLCJWSUJSQVRJT05fQU1QTElUVURFX01JTiIsIm11dGF0ZSIsImNoaWxkcmVuIiwiZ2V0Rmlyc3RTdW1tYXJ5U2VudGVuY2UiLCJudW1iZXJBdG9tc1NoZWFyZWRPZmYiLCJyZWxhdGl2ZUNoZW1pc3RyeUJvb2tTZW50ZW5jZSIsIk5VTUJFUl9PRl9TSEVBUkFCTEVfQVRPTVMiLCJmaWxsSW4iLCJjb21wYXJpc29uQW1vdW50IiwiYnJlYWtBd2F5QW1vdW50Iiwic3BhY2UiLCJhbXBsaXR1ZGVUb0luZGV4Iiwic3RyaW5nc0xpc3QiLCJub3JtYWxpemVkIiwiaSIsIk1hdGgiLCJmbG9vciIsImxlbmd0aCIsImFzc2VydCIsIlRFTVBFUkFUVVJFX1NUUklOR1MiLCJKSUdHTEVfU1RSSU5HUyIsImdldFNlY29uZFN1bW1hcnlTZW50ZW5jZSIsImluVHJhbnNpdGlvbiIsImppZ2dsZUFtb3VudCIsImppZ2dsZUNsYXVzZSIsInRlbXBTdHJpbmciLCJ0ZW1wIiwiamlnZ2xpbmdDbGF1c2UiLCJ0ZW1wZXJhdHVyZUNsYXVzZSIsImdldFRoaXJkU3VwcGxlbWVudGFyeVNlbnRlbmNlIiwibnVtYmVyT2ZBdG9tc1NoZWFyZWRPZmYiLCJpbm5lckNvbnRlbnQiLCJnZXRDdXJyZW50RGV0YWlsc1N0cmluZyIsImdldEhpbnRTdHJpbmciLCJjaGVtaXN0cnlCb29rU3RyaW5nIiwiamlnZ2xlVGVtcFNlbnRlbmNlIiwiY29udGludWVSdWJiaW5nIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJGcmljdGlvblNjcmVlblN1bW1hcnlOb2RlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIE5vZGUgdGhhdCBob2xkcyB0aGUgUERPTSBjb250ZW50IGZvciB0aGUgc2NyZWVuIHN1bW1hcnkgaW4gRnJpY3Rpb24uXHJcbiAqIEBhdXRob3IgTWljaGFlbCBLYXV6bWFubiAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgU3RyaW5nVXRpbHMgZnJvbSAnLi4vLi4vLi4vLi4vcGhldGNvbW1vbi9qcy91dGlsL1N0cmluZ1V0aWxzLmpzJztcclxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBmcmljdGlvbiBmcm9tICcuLi8uLi9mcmljdGlvbi5qcyc7XHJcbmltcG9ydCBGcmljdGlvblN0cmluZ3MgZnJvbSAnLi4vLi4vRnJpY3Rpb25TdHJpbmdzLmpzJztcclxuaW1wb3J0IEZyaWN0aW9uQ29uc3RhbnRzIGZyb20gJy4uL0ZyaWN0aW9uQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IEZyaWN0aW9uTW9kZWwgZnJvbSAnLi4vbW9kZWwvRnJpY3Rpb25Nb2RlbC5qcyc7XHJcblxyXG4vLyBjb25zdGFudHNcclxuY29uc3Qgc3VtbWFyeVNlbnRlbmNlUGF0dGVyblN0cmluZyA9IEZyaWN0aW9uU3RyaW5ncy5hMTF5LnNjcmVlblN1bW1hcnkuc3VtbWFyeVNlbnRlbmNlUGF0dGVybjtcclxuY29uc3QgZHJvcHBpbmdBc0F0b21zSmlnZ2xlTGVzc1N0cmluZyA9IEZyaWN0aW9uU3RyaW5ncy5hMTF5LnNjcmVlblN1bW1hcnkuZHJvcHBpbmdBc0F0b21zSmlnZ2xlTGVzcztcclxuY29uc3QgYXRvbXNKaWdnbGVQYXR0ZXJuU3RyaW5nID0gRnJpY3Rpb25TdHJpbmdzLmExMXkuc2NyZWVuU3VtbWFyeS5hdG9tc0ppZ2dsZVBhdHRlcm47XHJcbmNvbnN0IGppZ2dsZUNsYXVzZVBhdHRlcm5TdHJpbmcgPSBGcmljdGlvblN0cmluZ3MuYTExeS5zY3JlZW5TdW1tYXJ5LmppZ2dsZUNsYXVzZVBhdHRlcm47XHJcbmNvbnN0IGppZ2dsZVRlbXBlcmF0dXJlU2NhbGVTZW50ZW5jZVN0cmluZyA9IEZyaWN0aW9uU3RyaW5ncy5hMTF5LnNjcmVlblN1bW1hcnkuamlnZ2xlVGVtcGVyYXR1cmVTY2FsZVNlbnRlbmNlO1xyXG5jb25zdCB0ZW1wZXJhdHVyZVBhdHRlcm5TdHJpbmcgPSBGcmljdGlvblN0cmluZ3MuYTExeS50ZW1wZXJhdHVyZS5wYXR0ZXJuO1xyXG5jb25zdCB0ZW1wZXJhdHVyZVRoZXJtb21ldGVyUGF0dGVyblN0cmluZyA9IEZyaWN0aW9uU3RyaW5ncy5hMTF5LnRlbXBlcmF0dXJlLnRoZXJtb21ldGVyUGF0dGVybjtcclxuY29uc3QgZ3JhYkNoZW1pc3RyeUJvb2tQbGF5U3RyaW5nID0gRnJpY3Rpb25TdHJpbmdzLmExMXkuc2NyZWVuU3VtbWFyeS5ncmFiQ2hlbWlzdHJ5Qm9va1BsYXk7XHJcbmNvbnN0IHJlc2V0U2ltTW9yZU9ic2VydmF0aW9uU2VudGVuY2VTdHJpbmcgPSBGcmljdGlvblN0cmluZ3MuYTExeS5yZXNldFNpbU1vcmVPYnNlcnZhdGlvblNlbnRlbmNlO1xyXG5jb25zdCBzdGFydGluZ0NoZW1pc3RyeUJvb2tQYXR0ZXJuU3RyaW5nID0gRnJpY3Rpb25TdHJpbmdzLmExMXkuc2NyZWVuU3VtbWFyeS5zdGFydGluZ0NoZW1pc3RyeUJvb2tQYXR0ZXJuO1xyXG5jb25zdCBzdGFydGluZ0NoZW1pc3RyeUJvb2tMaWdodGx5UGF0dGVyblN0cmluZyA9IEZyaWN0aW9uU3RyaW5ncy5hMTF5LnNjcmVlblN1bW1hcnkuc3RhcnRpbmdDaGVtaXN0cnlCb29rTGlnaHRseVBhdHRlcm47XHJcbmNvbnN0IGFtb3VudE9mQXRvbXNTdHJpbmcgPSBGcmljdGlvblN0cmluZ3MuYTExeS5hbW91bnRPZkF0b21zLnNlbnRlbmNlO1xyXG5jb25zdCBmZXdlclN0cmluZyA9IEZyaWN0aW9uU3RyaW5ncy5hMTF5LmFtb3VudE9mQXRvbXMuZmV3ZXI7XHJcbmNvbnN0IGZhckZld2VyU3RyaW5nID0gRnJpY3Rpb25TdHJpbmdzLmExMXkuYW1vdW50T2ZBdG9tcy5mYXJGZXdlcjtcclxuY29uc3Qgc29tZVN0cmluZyA9IEZyaWN0aW9uU3RyaW5ncy5hMTF5LmFtb3VudE9mQXRvbXMuc29tZTtcclxuY29uc3QgbWFueVN0cmluZyA9IEZyaWN0aW9uU3RyaW5ncy5hMTF5LmFtb3VudE9mQXRvbXMubWFueTtcclxuXHJcbmNsYXNzIEZyaWN0aW9uU2NyZWVuU3VtbWFyeU5vZGUgZXh0ZW5kcyBOb2RlIHtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gY29udGFjdFByb3BlcnR5XHJcbiAgICogQHBhcmFtIG51bWJlck9mQXRvbXNTaGVhcmVkT2ZmUHJvcGVydHlcclxuICAgKiBAcGFyYW0gdmlicmF0aW9uQW1wbGl0dWRlUHJvcGVydHlcclxuICAgKiBAcGFyYW0gdGhlcm1vbWV0ZXJNaW5UZW1wXHJcbiAgICogQHBhcmFtIHRoZXJtb21ldGVyTWF4VGVtcFxyXG4gICAqIEBwYXJhbSB0ZW1wZXJhdHVyZURlY3JlYXNpbmdBbGVydGVyXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIGNvbnRhY3RQcm9wZXJ0eSwgbnVtYmVyT2ZBdG9tc1NoZWFyZWRPZmZQcm9wZXJ0eSwgdmlicmF0aW9uQW1wbGl0dWRlUHJvcGVydHksIHRoZXJtb21ldGVyTWluVGVtcCxcclxuICAgICAgICAgICAgICAgdGhlcm1vbWV0ZXJNYXhUZW1wLCB0ZW1wZXJhdHVyZURlY3JlYXNpbmdBbGVydGVyICkge1xyXG5cclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgLy8gQHByaXZhdGVcclxuICAgIHRoaXMuY29udGFjdFByb3BlcnR5ID0gY29udGFjdFByb3BlcnR5O1xyXG4gICAgdGhpcy5udW1iZXJPZkF0b21zU2hlYXJlZE9mZlByb3BlcnR5ID0gbnVtYmVyT2ZBdG9tc1NoZWFyZWRPZmZQcm9wZXJ0eTtcclxuICAgIHRoaXMudmlicmF0aW9uQW1wbGl0dWRlUHJvcGVydHkgPSB2aWJyYXRpb25BbXBsaXR1ZGVQcm9wZXJ0eTtcclxuICAgIHRoaXMuYm9va3NQYXJhZ3JhcGggPSBuZXcgTm9kZSggeyB0YWdOYW1lOiAncCcgfSApO1xyXG4gICAgdGhpcy5pbnRlcmFjdGlvbkhpbnRQYXJhZ3JhcGggPSBuZXcgTm9kZSggeyB0YWdOYW1lOiAncCcgfSApO1xyXG4gICAgdGhpcy50aGVybW9tZXRlck1pblRlbXAgPSB0aGVybW9tZXRlck1pblRlbXA7XHJcbiAgICB0aGlzLnRoZXJtb21ldGVyTWF4VGVtcCA9IHRoZXJtb21ldGVyTWF4VGVtcDtcclxuXHJcbiAgICAvLyByZXF1aXJlcyBhbiBpbml0XHJcbiAgICB0aGlzLnVwZGF0ZVN1bW1hcnlTdHJpbmcoKTtcclxuXHJcbiAgICAvLyBwZG9tIC0gdXBkYXRlIHRoZSBzY3JlZW4gc3VtbWFyeSB3aGVuIHRoZSBtb2RlbCBjaGFuZ2VzXHJcbiAgICBsZXQgcHJldmlvdXNUZW1wU3RyaW5nID0gdGhpcy5hbXBsaXR1ZGVUb1RlbXBTdHJpbmcoIHRoaXMudmlicmF0aW9uQW1wbGl0dWRlUHJvcGVydHkudmFsdWUgKTtcclxuICAgIGxldCBwcmV2aW91c0ppZ2dsZVN0cmluZyA9IHRoaXMuYW1wbGl0dWRlVG9KaWdnbGVTdHJpbmcoIHRoaXMudmlicmF0aW9uQW1wbGl0dWRlUHJvcGVydHkudmFsdWUgKTtcclxuXHJcbiAgICAvLyBtYWtlIGExMXkgdXBkYXRlcyBhcyB0aGUgYW1wbGl0dWRlIGNoYW5nZXMgaW4gdGhlIG1vZGVsLCBubyBuZWVkIHRvIHVubGluaywgZXhpc3RzIGZvciBzaW0gbGlmZXRpbWUuXHJcbiAgICB0aGlzLnZpYnJhdGlvbkFtcGxpdHVkZVByb3BlcnR5LmxpbmsoIGFtcGxpdHVkZSA9PiB7XHJcblxyXG4gICAgICAgIC8vIHRoZSB0ZW1wZXJhdHVyZSBpcyBkZWNyZWFzaW5nXHJcbiAgICAgICAgY29uc3QgdGVtcERlY3JlYXNpbmcgPSB0ZW1wZXJhdHVyZURlY3JlYXNpbmdBbGVydGVyLnRlbXBEZWNyZWFzaW5nO1xyXG5cclxuICAgICAgICAvLyBOb3QgaWYgaXQgaXMgY29tcGxldGVseSBjb29sLCBzbyB3ZSBkb24ndCB0cmlnZ2VyIHRoZSB1cGRhdGUgdG9vIG11Y2guXHJcbiAgICAgICAgY29uc3QgYW1wbGl0dWRlU2V0dGxlZEJ1dE5vdE1pbiA9IGFtcGxpdHVkZSA8IEZyaWN0aW9uTW9kZWwuQU1QTElUVURFX1NFVFRMRURfVEhSRVNIT0xEICYmIC8vIGNvbnNpZGVyZWQgaW4gYSBcInNldHRsZWRcIiBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbXBsaXR1ZGUgIT09IEZyaWN0aW9uTW9kZWwuVklCUkFUSU9OX0FNUExJVFVERV9NSU47IC8vIG5vdCB0aGUgbWluaW11bSBhbXBsaXR1ZGVcclxuXHJcbiAgICAgICAgLy8gbmVzdGVkIGlmIHN0YXRlbWVudHMgc28gdGhhdCB3ZSBkb24ndCBoYXZlIHRvIGNhbGN1bGF0ZSB0aGVzZSBzdHJpbmdzIGFzIG11Y2hcclxuICAgICAgICBpZiAoIHRlbXBEZWNyZWFzaW5nIHx8XHJcbiAgICAgICAgICAgICBhbXBsaXR1ZGVTZXR0bGVkQnV0Tm90TWluIHx8XHJcbiAgICAgICAgICAgICB0aGlzLmFtcGxpdHVkZVRvVGVtcFN0cmluZyggYW1wbGl0dWRlICkgIT09IHByZXZpb3VzVGVtcFN0cmluZyB8fFxyXG4gICAgICAgICAgICAgdGhpcy5hbXBsaXR1ZGVUb0ppZ2dsZVN0cmluZyggYW1wbGl0dWRlICkgIT09IHByZXZpb3VzSmlnZ2xlU3RyaW5nICkge1xyXG5cclxuICAgICAgICAgIC8vIGlmIGppZ2dsZSBvciB0ZW1wZXJhdHVyZSBjaGFuZ2VkLCB1cGRhdGUgdGhlIHN0cmluZ1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVTdW1tYXJ5U3RyaW5nKCk7XHJcbiAgICAgICAgICBwcmV2aW91c1RlbXBTdHJpbmcgPSB0aGlzLmFtcGxpdHVkZVRvVGVtcFN0cmluZyggYW1wbGl0dWRlICk7IC8vIGNvbXB1dGUgdGhpcyBhZ2FpbiBmb3IgYSBtb3JlIGVmZmljaWVudCBpZiBzdGF0ZW1lbnRcclxuICAgICAgICAgIHByZXZpb3VzSmlnZ2xlU3RyaW5nID0gdGhpcy5hbXBsaXR1ZGVUb0ppZ2dsZVN0cmluZyggYW1wbGl0dWRlICk7IC8vIGNvbXB1dGUgdGhpcyBhZ2FpbiBmb3IgYSBtb3JlIGVmZmljaWVudCBpZiBzdGF0ZW1lbnRcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIGV4aXN0cyBmb3IgdGhlIGxpZmV0aW1lIG9mIHRoZSBzaW0sIG5vIG5lZWQgdG8gdW5saW5rXHJcbiAgICB0aGlzLmNvbnRhY3RQcm9wZXJ0eS5saW5rKCAoKSA9PiB7IHRoaXMudXBkYXRlU3VtbWFyeVN0cmluZygpO30gKTtcclxuXHJcbiAgICB0aGlzLm11dGF0ZSgge1xyXG4gICAgICBjaGlsZHJlbjogWyB0aGlzLmJvb2tzUGFyYWdyYXBoLCB0aGlzLmludGVyYWN0aW9uSGludFBhcmFncmFwaCBdLFxyXG5cclxuICAgICAgLy8gcGRvbVxyXG4gICAgICB0YWdOYW1lOiAnZGl2J1xyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIEdpdmVuIHRoZSBudW1iZXIgb2YgYXRvbXMgdGhhdCBoYXZlIHNoZWFyZWQgb2ZmIGZyb20gdGhlIG1vZGVsIHNvIGZhciwgZ2V0IHRoZSBmaXJzdCBzY3JlZW4gc3VtbWFyeSBzZW50ZW5jZSxcclxuICAgKiBkZXNjcmliaW5nIHRoZSBjaGVtaXN0cnkgYm9vay5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyQXRvbXNTaGVhcmVkT2ZmXHJcbiAgICogQHJldHVybnMge3N0cmluZ30gdGhlIGZpcnN0IHNlbnRlbmNlIG9mIHRoZSBzY3JlZW4gc3VtbWFyeVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgZ2V0Rmlyc3RTdW1tYXJ5U2VudGVuY2UoIG51bWJlckF0b21zU2hlYXJlZE9mZiApIHtcclxuXHJcbiAgICAvLyBUaGVyZSBhcmUgdGhyZWUgcmFuZ2VzIGJhc2VkIG9uIGhvdyBtYW55IGF0b21zIGhhdmUgc2hlYXJlZCBvZmZcclxuXHJcbiAgICBsZXQgcmVsYXRpdmVDaGVtaXN0cnlCb29rU2VudGVuY2UgPSBudWxsO1xyXG4gICAgLy8gXCJubyBzaGVhcmFibGUgYXRvbXNcIlxyXG4gICAgaWYgKCBudW1iZXJBdG9tc1NoZWFyZWRPZmYgPT09IDAgKSB7XHJcbiAgICAgIHJlbGF0aXZlQ2hlbWlzdHJ5Qm9va1NlbnRlbmNlID0gJyc7IC8vIGJsYW5rIGluaXRpYWwgc2VudGVuY2Ugb2YgXCJGaXJzdCBTZW50ZW5jZVwiXHJcbiAgICB9XHJcblxyXG4gICAgLy8gc29tZSBhdG9tcyBoYXZlIHNoZWFyZWQgb2ZmLCBkZXNjcmliZSB0aGUgY2hlbWlzdHJ5IGJvb2sgd2l0aCBzb21lIGF0b21zIFwiYnJva2VuIGF3YXlcIlxyXG4gICAgZWxzZSBpZiAoIG51bWJlckF0b21zU2hlYXJlZE9mZiA8IEZyaWN0aW9uTW9kZWwuTlVNQkVSX09GX1NIRUFSQUJMRV9BVE9NUyApIHtcclxuICAgICAgcmVsYXRpdmVDaGVtaXN0cnlCb29rU2VudGVuY2UgPSBTdHJpbmdVdGlscy5maWxsSW4oIGFtb3VudE9mQXRvbXNTdHJpbmcsIHtcclxuICAgICAgICBjb21wYXJpc29uQW1vdW50OiBmZXdlclN0cmluZyxcclxuICAgICAgICBicmVha0F3YXlBbW91bnQ6IHNvbWVTdHJpbmcsXHJcbiAgICAgICAgc3BhY2U6ICcgJ1xyXG4gICAgICB9ICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbG90cyBvZiBhdG9tcyBzaGVhcmVkIG9mZiwgZGVzY3JpYmUgbWFueSBtaXNzaW5nIGF0b21zXHJcbiAgICBlbHNlIHtcclxuICAgICAgcmVsYXRpdmVDaGVtaXN0cnlCb29rU2VudGVuY2UgPSBTdHJpbmdVdGlscy5maWxsSW4oIGFtb3VudE9mQXRvbXNTdHJpbmcsIHtcclxuICAgICAgICBjb21wYXJpc29uQW1vdW50OiBmYXJGZXdlclN0cmluZyxcclxuICAgICAgICBicmVha0F3YXlBbW91bnQ6IG1hbnlTdHJpbmcsXHJcbiAgICAgICAgc3BhY2U6ICcgJ1xyXG4gICAgICB9ICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFN0cmluZ1V0aWxzLmZpbGxJbiggdGhpcy5jb250YWN0UHJvcGVydHkudmFsdWUgPyBzdGFydGluZ0NoZW1pc3RyeUJvb2tQYXR0ZXJuU3RyaW5nIDogc3RhcnRpbmdDaGVtaXN0cnlCb29rTGlnaHRseVBhdHRlcm5TdHJpbmcsIHtcclxuICAgICAgcmVsYXRpdmVDaGVtaXN0cnlCb29rU2VudGVuY2U6IHJlbGF0aXZlQ2hlbWlzdHJ5Qm9va1NlbnRlbmNlXHJcbiAgICB9ICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbXBsZW1lbnRhdGlvbiB0byBnbyBmcm9tIGFtcGxpdHVkZSB0byBhbiBpbmRleCBmb3IgYSBsaXN0IG9mIHN0cmluZ3MgdG8gZGVzY3JpYmUgdGhlIG1vZGVsIGFtcGxpdHVkZS4gRWl0aGVyXHJcbiAgICogdGhlIHRlbXBlcmF0dXJlIG9yIHRoZSBhbW91bnQgb2YgamlnZ2xpbmcuXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW1wbGl0dWRlXHJcbiAgICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gc3RyaW5nc0xpc3RcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGFtcGxpdHVkZVRvSW5kZXgoIGFtcGxpdHVkZSwgc3RyaW5nc0xpc3QgKSB7XHJcbiAgICBpZiAoIGFtcGxpdHVkZSA+IHRoaXMudGhlcm1vbWV0ZXJNYXhUZW1wICkge1xyXG4gICAgICBhbXBsaXR1ZGUgPSB0aGlzLnRoZXJtb21ldGVyTWF4VGVtcDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjYW5jZWwgb3V0IHRoZSByYW5nZVxyXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9ICggYW1wbGl0dWRlIC0gdGhpcy50aGVybW9tZXRlck1pblRlbXAgKSAvIHRoaXMudGhlcm1vbWV0ZXJNYXhUZW1wO1xyXG4gICAgbGV0IGkgPSBNYXRoLmZsb29yKCBub3JtYWxpemVkICogc3RyaW5nc0xpc3QubGVuZ3RoICk7XHJcblxyXG4gICAgLy8gdG8gYWNjb3VudCBmb3IgamF2YXNjcmlwdCByb3VuZGluZyBwcm9ibGVtc1xyXG4gICAgaWYgKCBpID09PSBzdHJpbmdzTGlzdC5sZW5ndGggKSB7XHJcbiAgICAgIGkgPSBzdHJpbmdzTGlzdC5sZW5ndGggLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIGkgPj0gMCAmJiBpIDwgc3RyaW5nc0xpc3QubGVuZ3RoICk7XHJcbiAgICByZXR1cm4gaTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcCB0aGUgYW1wbGl0dWRlIG9mIHRoZSBtb2RlbCB0byBhIHRlbXBlcmF0dXJlIHN0cmluZ1xyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQGExMXlcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW1wbGl0dWRlXHJcbiAgICogQHJldHVybnMge3N0cmluZ30gdGhlIHRlbXAgc3RyaW5nIGJhc2VkIG9uIHRoZSBhbXBsaXR1ZGUgb2YgdGhlIG1vZGVsXHJcbiAgICovXHJcbiAgYW1wbGl0dWRlVG9UZW1wU3RyaW5nKCBhbXBsaXR1ZGUgKSB7XHJcbiAgICBjb25zdCBpID0gdGhpcy5hbXBsaXR1ZGVUb0luZGV4KCBhbXBsaXR1ZGUsIEZyaWN0aW9uQ29uc3RhbnRzLlRFTVBFUkFUVVJFX1NUUklOR1MgKTtcclxuICAgIHJldHVybiBGcmljdGlvbkNvbnN0YW50cy5URU1QRVJBVFVSRV9TVFJJTkdTWyBpIF07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNYXAgdGhlIGFtcGxpdHVkZSBvZiB0aGUgbW9kZWwgdG8gYSBcImppZ2dsZVwiIHN0cmluZ1xyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQGExMXlcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW1wbGl0dWRlXHJcbiAgICogQHJldHVybnMge3N0cmluZ30gdGhlIFwiamlnZ2xlXCIgYW1vdW50IHN0cmluZyBiYXNlZCBvbiB0aGUgYW1wbGl0dWRlIG9mIHRoZSBtb2RlbFxyXG4gICAqL1xyXG4gIGFtcGxpdHVkZVRvSmlnZ2xlU3RyaW5nKCBhbXBsaXR1ZGUgKSB7XHJcbiAgICBjb25zdCBpID0gdGhpcy5hbXBsaXR1ZGVUb0luZGV4KCBhbXBsaXR1ZGUsIEZyaWN0aW9uQ29uc3RhbnRzLkpJR0dMRV9TVFJJTkdTICk7XHJcbiAgICByZXR1cm4gRnJpY3Rpb25Db25zdGFudHMuSklHR0xFX1NUUklOR1NbIGkgXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCB0aGUgc2Vjb25kIHNjcmVlbiBzdW1tYXJ5IHNlbnRlbmNlIGFib3V0IHRoZSB6b29tZWQgaW4gY2hlbWlzdHJ5IGJvb2suXHJcbiAgICogQHBhcmFtIHtQcm9wZXJ0eS48bnVtYmVyPn0gdmlicmF0aW9uQW1wbGl0dWRlUHJvcGVydHlcclxuICAgKiBAcmV0dXJucyB7KnxzdHJpbmd9XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBnZXRTZWNvbmRTdW1tYXJ5U2VudGVuY2UoIHZpYnJhdGlvbkFtcGxpdHVkZVByb3BlcnR5ICkge1xyXG5cclxuICAgIC8vIHt7Ym9vbGVhbn19IGlzIHNpbSBcImluIHRyYW5zaXRpb25cIj8gbWVhbmluZyBpdCBpcyBjaGFuZ2luZywgYmVjYXVzZSBpdCBpc24ndCBzZXR0bGVkIChzZXR0bGVkIGlzIHRoZSBvcHBvc2l0ZSBvZiBcImluIHRyYW5zaXRpb25cIlxyXG4gICAgY29uc3QgaW5UcmFuc2l0aW9uID0gdmlicmF0aW9uQW1wbGl0dWRlUHJvcGVydHkudmFsdWUgPiBGcmljdGlvbk1vZGVsLkFNUExJVFVERV9TRVRUTEVEX1RIUkVTSE9MRDtcclxuXHJcblxyXG4gICAgLy8gRGVmYXVsdCB0byBkZXNjcmliaW5nIHRoZSBqaWdnbGluZyBvZiB0aGUgYXRvbXNcclxuICAgIGNvbnN0IGppZ2dsZUFtb3VudCA9IFN0cmluZ1V0aWxzLmZpbGxJbiggYXRvbXNKaWdnbGVQYXR0ZXJuU3RyaW5nLCB7XHJcbiAgICAgIGppZ2dsZUFtb3VudDogdGhpcy5hbXBsaXR1ZGVUb0ppZ2dsZVN0cmluZyggdmlicmF0aW9uQW1wbGl0dWRlUHJvcGVydHkudmFsdWUgKVxyXG4gICAgfSApO1xyXG4gICAgbGV0IGppZ2dsZUNsYXVzZSA9IFN0cmluZ1V0aWxzLmZpbGxJbiggamlnZ2xlQ2xhdXNlUGF0dGVyblN0cmluZywge1xyXG4gICAgICBqaWdnbGVBbW91bnQ6IGppZ2dsZUFtb3VudFxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIElmIHRoZSB0ZW1wZXJhdHVyZSBpcyBkZWNyZWFzaW5nLCB0aGVuIGRlc2NyaWJlIHRoZSBqaWdnbGluZyByZWxhdGl2ZWx5XHJcbiAgICBpZiAoIGluVHJhbnNpdGlvbiApIHtcclxuICAgICAgamlnZ2xlQ2xhdXNlID0gU3RyaW5nVXRpbHMuZmlsbEluKCBqaWdnbGVDbGF1c2VQYXR0ZXJuU3RyaW5nLCB7XHJcbiAgICAgICAgamlnZ2xlQW1vdW50OiBkcm9wcGluZ0FzQXRvbXNKaWdnbGVMZXNzU3RyaW5nXHJcbiAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGaWxsIGluIHRoZSBjdXJyZW50IHRlbXBlcmF0dXJlIHN0cmluZ1xyXG4gICAgY29uc3QgdGVtcFN0cmluZyA9IFN0cmluZ1V0aWxzLmZpbGxJbiggaW5UcmFuc2l0aW9uID8gdGVtcGVyYXR1cmVQYXR0ZXJuU3RyaW5nIDogdGVtcGVyYXR1cmVUaGVybW9tZXRlclBhdHRlcm5TdHJpbmcsIHtcclxuICAgICAgdGVtcDogdGhpcy5hbXBsaXR1ZGVUb1RlbXBTdHJpbmcoIHZpYnJhdGlvbkFtcGxpdHVkZVByb3BlcnR5LnZhbHVlIClcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGZpbmFsIHNlbnRlbmNlIGZyb20gaXRzIHBhcnRzXHJcbiAgICByZXR1cm4gU3RyaW5nVXRpbHMuZmlsbEluKCBqaWdnbGVUZW1wZXJhdHVyZVNjYWxlU2VudGVuY2VTdHJpbmcsIHtcclxuICAgICAgamlnZ2xpbmdDbGF1c2U6IGppZ2dsZUNsYXVzZSxcclxuICAgICAgdGVtcGVyYXR1cmVDbGF1c2U6IHRlbXBTdHJpbmdcclxuICAgIH0gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlck9mQXRvbXNTaGVhcmVkT2ZmXHJcbiAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgKi9cclxuICBnZXRUaGlyZFN1cHBsZW1lbnRhcnlTZW50ZW5jZSggbnVtYmVyT2ZBdG9tc1NoZWFyZWRPZmYgKSB7XHJcblxyXG4gICAgLy8gUXVldWUgbW92aW5nIHRoZSBib29rIGlmIHRoZXJlIGFyZSBzdGlsbCBtYW55IGF0b21zIGxlZnQsIHF1ZXVlIHJlc2V0IGlmIHRoZXJlIGFyZSBtYW55IGF0b21zIHNoZWFyZWQgb2ZmXHJcbiAgICByZXR1cm4gbnVtYmVyT2ZBdG9tc1NoZWFyZWRPZmYgPT09IEZyaWN0aW9uTW9kZWwuTlVNQkVSX09GX1NIRUFSQUJMRV9BVE9NUyA/XHJcbiAgICAgICAgICAgcmVzZXRTaW1Nb3JlT2JzZXJ2YXRpb25TZW50ZW5jZVN0cmluZyA6IGdyYWJDaGVtaXN0cnlCb29rUGxheVN0cmluZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgc3VtbWFyeSBzdHJpbmcgaW4gdGhlIFBET01cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBhMTF5XHJcbiAgICovXHJcbiAgdXBkYXRlU3VtbWFyeVN0cmluZygpIHtcclxuXHJcbiAgICB0aGlzLmJvb2tzUGFyYWdyYXBoLmlubmVyQ29udGVudCA9IHRoaXMuZ2V0Q3VycmVudERldGFpbHNTdHJpbmcoKTtcclxuXHJcbiAgICAvLyBTVVBQTEVNRU5UQVJZIFRISVJEIFNFTlRFTkNFXHJcbiAgICB0aGlzLmludGVyYWN0aW9uSGludFBhcmFncmFwaC5pbm5lckNvbnRlbnQgPSB0aGlzLmdldEhpbnRTdHJpbmcoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIGdldEN1cnJlbnREZXRhaWxzU3RyaW5nKCkge1xyXG5cclxuICAgIC8vIEZJUlNUIFNFTlRFTkNFXHJcbiAgICBjb25zdCBjaGVtaXN0cnlCb29rU3RyaW5nID0gdGhpcy5nZXRGaXJzdFN1bW1hcnlTZW50ZW5jZSggdGhpcy5udW1iZXJPZkF0b21zU2hlYXJlZE9mZlByb3BlcnR5LnZhbHVlICk7XHJcblxyXG4gICAgLy8gU0VDT05EIFNFTlRFTkNFIChaT09NRUQtSU4pXHJcbiAgICBjb25zdCBqaWdnbGVUZW1wU2VudGVuY2UgPSB0aGlzLmdldFNlY29uZFN1bW1hcnlTZW50ZW5jZSggdGhpcy52aWJyYXRpb25BbXBsaXR1ZGVQcm9wZXJ0eSApO1xyXG5cclxuICAgIHJldHVybiBTdHJpbmdVdGlscy5maWxsSW4oIHN1bW1hcnlTZW50ZW5jZVBhdHRlcm5TdHJpbmcsIHtcclxuICAgICAgY2hlbWlzdHJ5Qm9va1N0cmluZzogY2hlbWlzdHJ5Qm9va1N0cmluZyxcclxuICAgICAgamlnZ2xlVGVtcGVyYXR1cmVTY2FsZVNlbnRlbmNlOiBqaWdnbGVUZW1wU2VudGVuY2VcclxuICAgIH0gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIGdldEhpbnRTdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5udW1iZXJPZkF0b21zU2hlYXJlZE9mZlByb3BlcnR5LnZhbHVlID09PSBGcmljdGlvbk1vZGVsLk5VTUJFUl9PRl9TSEVBUkFCTEVfQVRPTVMgPyByZXNldFNpbU1vcmVPYnNlcnZhdGlvblNlbnRlbmNlU3RyaW5nIDpcclxuICAgICAgICAgICB0aGlzLmNvbnRhY3RQcm9wZXJ0eS52YWx1ZSA/IEZyaWN0aW9uU3RyaW5ncy5hMTF5LnNjcmVlblN1bW1hcnkuY29udGludWVSdWJiaW5nIDpcclxuICAgICAgICAgICBGcmljdGlvblN0cmluZ3MuYTExeS5zY3JlZW5TdW1tYXJ5LmdyYWJDaGVtaXN0cnlCb29rUGxheTtcclxuICB9XHJcbn1cclxuXHJcbmZyaWN0aW9uLnJlZ2lzdGVyKCAnRnJpY3Rpb25TY3JlZW5TdW1tYXJ5Tm9kZScsIEZyaWN0aW9uU2NyZWVuU3VtbWFyeU5vZGUgKTtcclxuZXhwb3J0IGRlZmF1bHQgRnJpY3Rpb25TY3JlZW5TdW1tYXJ5Tm9kZTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFdBQVcsTUFBTSwrQ0FBK0M7QUFDdkUsU0FBU0MsSUFBSSxRQUFRLG1DQUFtQztBQUN4RCxPQUFPQyxRQUFRLE1BQU0sbUJBQW1CO0FBQ3hDLE9BQU9DLGVBQWUsTUFBTSwwQkFBMEI7QUFDdEQsT0FBT0MsaUJBQWlCLE1BQU0seUJBQXlCO0FBQ3ZELE9BQU9DLGFBQWEsTUFBTSwyQkFBMkI7O0FBRXJEO0FBQ0EsTUFBTUMsNEJB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