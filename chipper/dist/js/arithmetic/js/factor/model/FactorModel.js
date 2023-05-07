// Copyright 2014-2021, University of Colorado Boulder

/**
 * Model for factor game in 'Arithmetic' simulation.
 *
 * @author Andrey Zelenkov (MLearner)
 * @author John Blanco
 */

import soundManager from '../../../../tambo/js/soundManager.js';
import arithmetic from '../../arithmetic.js';
import ArithmeticModel from '../../common/model/ArithmeticModel.js';
import GameState from '../../common/model/GameState.js';
class FactorModel extends ArithmeticModel {
  /**
   * @param {Tandem} tandem
   */
  constructor(tandem) {
    super(tandem);
  }

  // @public
  setUpUnansweredProblem() {
    // get available multiplier pair
    const multiplierPair = this.selectUnusedMultiplierPair();
    if (multiplierPair) {
      // reset multiplierPair and score properties
      this.problemModel.possiblePointsProperty.reset();
      this.problemModel.multiplicandProperty.reset();
      this.problemModel.multiplierProperty.reset();

      // set product
      this.problemModel.productProperty.set(multiplierPair.multiplicand * multiplierPair.multiplier);
      return true;
    }

    // All multiplier pairs have been used, so false is returned.
    return false;
  }

  /**
   * Submit an answer for the currently active problem.  This override exists to handle one very special case on the
   * Factor screen: the situation where the user submits two or more incorrect answers in a row without pressing the
   * "Try Again" button in between.  In this case, there is no natural state transition, so the feedback sound is
   * never played.  This override forces the state transition.
   *
   * See https://github.com/phetsims/arithmetic/issues/160#issuecomment-164507798 for more.
   *
   * @override
   * @public
   */
  submitAnswer() {
    if (this.stateProperty.get() === GameState.DISPLAYING_INCORRECT_ANSWER_FEEDBACK) {
      // force a change to the AWAITING_USER_INPUT state before checking the answer
      const multiplicand = this.problemModel.multiplicandProperty.get();
      const multiplier = this.problemModel.multiplierProperty.get();
      this.retryProblem();
      this.problemModel.multiplicandProperty.set(multiplicand);
      this.problemModel.multiplierProperty.set(multiplier);
    }
    super.submitAnswer();
  }

  /**
   * Automatically answer most of the questions.  This is useful for testing, since it can save time when testing
   * how the sim behaves when a user finishing answering all questions for a level.  We need to be very careful that
   * this is never available in the published sim.
   * @override
   * @protected
   */
  autoAnswer() {
    // make sure that sound is off, since otherwise it dings for every solved problem
    const soundState = soundManager.enabled;
    soundManager.enabled = false;

    // answer the questions
    const tableSize = this.activeLevelModel.tableSize;
    const numQuestions = tableSize * tableSize;
    const numQuestionsToAnswer = numQuestions - 1;
    const levelModel = this.activeLevelModel; // convenience var
    console.log('Automatically answering', numQuestionsToAnswer, 'of', numQuestions, 'questions.');
    _.times(numQuestionsToAnswer, index => {
      // do a brute-force factoring method, since performance isn't really an issue here
      let answerFound = false;
      for (let multiplicand = 1; multiplicand <= tableSize && !answerFound; multiplicand++) {
        for (let multiplier = 1; multiplier <= tableSize && !answerFound; multiplier++) {
          if (multiplicand * multiplier === this.problemModel.productProperty.get() && !levelModel.isCellUsed(multiplicand, multiplier)) {
            answerFound = true;
            levelModel.markCellAsUsed(multiplicand, multiplier);
          }
        }
      }
      levelModel.currentScoreProperty.value += this.problemModel.possiblePointsProperty.get();
      levelModel.displayScoreProperty.set(this.activeLevelModel.currentScoreProperty.get());
      this.stateProperty.set(GameState.DISPLAYING_CORRECT_ANSWER_FEEDBACK);
      this.nextProblem();
    });

    // restore the original sound state
    soundManager.enabled = soundState;
  }
}
arithmetic.register('FactorModel', FactorModel);
export default FactorModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzb3VuZE1hbmFnZXIiLCJhcml0aG1ldGljIiwiQXJpdGhtZXRpY01vZGVsIiwiR2FtZVN0YXRlIiwiRmFjdG9yTW9kZWwiLCJjb25zdHJ1Y3RvciIsInRhbmRlbSIsInNldFVwVW5hbnN3ZXJlZFByb2JsZW0iLCJtdWx0aXBsaWVyUGFpciIsInNlbGVjdFVudXNlZE11bHRpcGxpZXJQYWlyIiwicHJvYmxlbU1vZGVsIiwicG9zc2libGVQb2ludHNQcm9wZXJ0eSIsInJlc2V0IiwibXVsdGlwbGljYW5kUHJvcGVydHkiLCJtdWx0aXBsaWVyUHJvcGVydHkiLCJwcm9kdWN0UHJvcGVydHkiLCJzZXQiLCJtdWx0aXBsaWNhbmQiLCJtdWx0aXBsaWVyIiwic3VibWl0QW5zd2VyIiwic3RhdGVQcm9wZXJ0eSIsImdldCIsIkRJU1BMQVlJTkdfSU5DT1JSRUNUX0FOU1dFUl9GRUVEQkFDSyIsInJldHJ5UHJvYmxlbSIsImF1dG9BbnN3ZXIiLCJzb3VuZFN0YXRlIiwiZW5hYmxlZCIsInRhYmxlU2l6ZSIsImFjdGl2ZUxldmVsTW9kZWwiLCJudW1RdWVzdGlvbnMiLCJudW1RdWVzdGlvbnNUb0Fuc3dlciIsImxldmVsTW9kZWwiLCJjb25zb2xlIiwibG9nIiwiXyIsInRpbWVzIiwiaW5kZXgiLCJhbnN3ZXJGb3VuZCIsImlzQ2VsbFVzZWQiLCJtYXJrQ2VsbEFzVXNlZCIsImN1cnJlbnRTY29yZVByb3BlcnR5IiwidmFsdWUiLCJkaXNwbGF5U2NvcmVQcm9wZXJ0eSIsIkRJU1BMQVlJTkdfQ09SUkVDVF9BTlNXRVJfRkVFREJBQ0siLCJuZXh0UHJvYmxlbSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiRmFjdG9yTW9kZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTQtMjAyMSwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogTW9kZWwgZm9yIGZhY3RvciBnYW1lIGluICdBcml0aG1ldGljJyBzaW11bGF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEFuZHJleSBaZWxlbmtvdiAoTUxlYXJuZXIpXHJcbiAqIEBhdXRob3IgSm9obiBCbGFuY29cclxuICovXHJcblxyXG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4uLy4uLy4uLy4uL3RhbWJvL2pzL3NvdW5kTWFuYWdlci5qcyc7XHJcbmltcG9ydCBhcml0aG1ldGljIGZyb20gJy4uLy4uL2FyaXRobWV0aWMuanMnO1xyXG5pbXBvcnQgQXJpdGhtZXRpY01vZGVsIGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbC9Bcml0aG1ldGljTW9kZWwuanMnO1xyXG5pbXBvcnQgR2FtZVN0YXRlIGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbC9HYW1lU3RhdGUuanMnO1xyXG5cclxuY2xhc3MgRmFjdG9yTW9kZWwgZXh0ZW5kcyBBcml0aG1ldGljTW9kZWwge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1RhbmRlbX0gdGFuZGVtXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIHRhbmRlbSApIHtcclxuICAgIHN1cGVyKCB0YW5kZW0gKTtcclxuICB9XHJcblxyXG4gIC8vIEBwdWJsaWNcclxuICBzZXRVcFVuYW5zd2VyZWRQcm9ibGVtKCkge1xyXG5cclxuICAgIC8vIGdldCBhdmFpbGFibGUgbXVsdGlwbGllciBwYWlyXHJcbiAgICBjb25zdCBtdWx0aXBsaWVyUGFpciA9IHRoaXMuc2VsZWN0VW51c2VkTXVsdGlwbGllclBhaXIoKTtcclxuXHJcbiAgICBpZiAoIG11bHRpcGxpZXJQYWlyICkge1xyXG5cclxuICAgICAgLy8gcmVzZXQgbXVsdGlwbGllclBhaXIgYW5kIHNjb3JlIHByb3BlcnRpZXNcclxuICAgICAgdGhpcy5wcm9ibGVtTW9kZWwucG9zc2libGVQb2ludHNQcm9wZXJ0eS5yZXNldCgpO1xyXG4gICAgICB0aGlzLnByb2JsZW1Nb2RlbC5tdWx0aXBsaWNhbmRQcm9wZXJ0eS5yZXNldCgpO1xyXG4gICAgICB0aGlzLnByb2JsZW1Nb2RlbC5tdWx0aXBsaWVyUHJvcGVydHkucmVzZXQoKTtcclxuXHJcbiAgICAgIC8vIHNldCBwcm9kdWN0XHJcbiAgICAgIHRoaXMucHJvYmxlbU1vZGVsLnByb2R1Y3RQcm9wZXJ0eS5zZXQoXHJcbiAgICAgICAgbXVsdGlwbGllclBhaXIubXVsdGlwbGljYW5kICogbXVsdGlwbGllclBhaXIubXVsdGlwbGllclxyXG4gICAgICApO1xyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWxsIG11bHRpcGxpZXIgcGFpcnMgaGF2ZSBiZWVuIHVzZWQsIHNvIGZhbHNlIGlzIHJldHVybmVkLlxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3VibWl0IGFuIGFuc3dlciBmb3IgdGhlIGN1cnJlbnRseSBhY3RpdmUgcHJvYmxlbS4gIFRoaXMgb3ZlcnJpZGUgZXhpc3RzIHRvIGhhbmRsZSBvbmUgdmVyeSBzcGVjaWFsIGNhc2Ugb24gdGhlXHJcbiAgICogRmFjdG9yIHNjcmVlbjogdGhlIHNpdHVhdGlvbiB3aGVyZSB0aGUgdXNlciBzdWJtaXRzIHR3byBvciBtb3JlIGluY29ycmVjdCBhbnN3ZXJzIGluIGEgcm93IHdpdGhvdXQgcHJlc3NpbmcgdGhlXHJcbiAgICogXCJUcnkgQWdhaW5cIiBidXR0b24gaW4gYmV0d2Vlbi4gIEluIHRoaXMgY2FzZSwgdGhlcmUgaXMgbm8gbmF0dXJhbCBzdGF0ZSB0cmFuc2l0aW9uLCBzbyB0aGUgZmVlZGJhY2sgc291bmQgaXNcclxuICAgKiBuZXZlciBwbGF5ZWQuICBUaGlzIG92ZXJyaWRlIGZvcmNlcyB0aGUgc3RhdGUgdHJhbnNpdGlvbi5cclxuICAgKlxyXG4gICAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vcGhldHNpbXMvYXJpdGhtZXRpYy9pc3N1ZXMvMTYwI2lzc3VlY29tbWVudC0xNjQ1MDc3OTggZm9yIG1vcmUuXHJcbiAgICpcclxuICAgKiBAb3ZlcnJpZGVcclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgc3VibWl0QW5zd2VyKCkge1xyXG4gICAgaWYgKCB0aGlzLnN0YXRlUHJvcGVydHkuZ2V0KCkgPT09IEdhbWVTdGF0ZS5ESVNQTEFZSU5HX0lOQ09SUkVDVF9BTlNXRVJfRkVFREJBQ0sgKSB7XHJcblxyXG4gICAgICAvLyBmb3JjZSBhIGNoYW5nZSB0byB0aGUgQVdBSVRJTkdfVVNFUl9JTlBVVCBzdGF0ZSBiZWZvcmUgY2hlY2tpbmcgdGhlIGFuc3dlclxyXG4gICAgICBjb25zdCBtdWx0aXBsaWNhbmQgPSB0aGlzLnByb2JsZW1Nb2RlbC5tdWx0aXBsaWNhbmRQcm9wZXJ0eS5nZXQoKTtcclxuICAgICAgY29uc3QgbXVsdGlwbGllciA9IHRoaXMucHJvYmxlbU1vZGVsLm11bHRpcGxpZXJQcm9wZXJ0eS5nZXQoKTtcclxuICAgICAgdGhpcy5yZXRyeVByb2JsZW0oKTtcclxuICAgICAgdGhpcy5wcm9ibGVtTW9kZWwubXVsdGlwbGljYW5kUHJvcGVydHkuc2V0KCBtdWx0aXBsaWNhbmQgKTtcclxuICAgICAgdGhpcy5wcm9ibGVtTW9kZWwubXVsdGlwbGllclByb3BlcnR5LnNldCggbXVsdGlwbGllciApO1xyXG4gICAgfVxyXG4gICAgc3VwZXIuc3VibWl0QW5zd2VyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdXRvbWF0aWNhbGx5IGFuc3dlciBtb3N0IG9mIHRoZSBxdWVzdGlvbnMuICBUaGlzIGlzIHVzZWZ1bCBmb3IgdGVzdGluZywgc2luY2UgaXQgY2FuIHNhdmUgdGltZSB3aGVuIHRlc3RpbmdcclxuICAgKiBob3cgdGhlIHNpbSBiZWhhdmVzIHdoZW4gYSB1c2VyIGZpbmlzaGluZyBhbnN3ZXJpbmcgYWxsIHF1ZXN0aW9ucyBmb3IgYSBsZXZlbC4gIFdlIG5lZWQgdG8gYmUgdmVyeSBjYXJlZnVsIHRoYXRcclxuICAgKiB0aGlzIGlzIG5ldmVyIGF2YWlsYWJsZSBpbiB0aGUgcHVibGlzaGVkIHNpbS5cclxuICAgKiBAb3ZlcnJpZGVcclxuICAgKiBAcHJvdGVjdGVkXHJcbiAgICovXHJcbiAgYXV0b0Fuc3dlcigpIHtcclxuXHJcbiAgICAvLyBtYWtlIHN1cmUgdGhhdCBzb3VuZCBpcyBvZmYsIHNpbmNlIG90aGVyd2lzZSBpdCBkaW5ncyBmb3IgZXZlcnkgc29sdmVkIHByb2JsZW1cclxuICAgIGNvbnN0IHNvdW5kU3RhdGUgPSBzb3VuZE1hbmFnZXIuZW5hYmxlZDtcclxuICAgIHNvdW5kTWFuYWdlci5lbmFibGVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gYW5zd2VyIHRoZSBxdWVzdGlvbnNcclxuICAgIGNvbnN0IHRhYmxlU2l6ZSA9IHRoaXMuYWN0aXZlTGV2ZWxNb2RlbC50YWJsZVNpemU7XHJcbiAgICBjb25zdCBudW1RdWVzdGlvbnMgPSB0YWJsZVNpemUgKiB0YWJsZVNpemU7XHJcbiAgICBjb25zdCBudW1RdWVzdGlvbnNUb0Fuc3dlciA9IG51bVF1ZXN0aW9ucyAtIDE7XHJcbiAgICBjb25zdCBsZXZlbE1vZGVsID0gdGhpcy5hY3RpdmVMZXZlbE1vZGVsOyAvLyBjb252ZW5pZW5jZSB2YXJcclxuICAgIGNvbnNvbGUubG9nKCAnQXV0b21hdGljYWxseSBhbnN3ZXJpbmcnLCBudW1RdWVzdGlvbnNUb0Fuc3dlciwgJ29mJywgbnVtUXVlc3Rpb25zLCAncXVlc3Rpb25zLicgKTtcclxuICAgIF8udGltZXMoIG51bVF1ZXN0aW9uc1RvQW5zd2VyLCBpbmRleCA9PiB7XHJcbiAgICAgIC8vIGRvIGEgYnJ1dGUtZm9yY2UgZmFjdG9yaW5nIG1ldGhvZCwgc2luY2UgcGVyZm9ybWFuY2UgaXNuJ3QgcmVhbGx5IGFuIGlzc3VlIGhlcmVcclxuICAgICAgbGV0IGFuc3dlckZvdW5kID0gZmFsc2U7XHJcbiAgICAgIGZvciAoIGxldCBtdWx0aXBsaWNhbmQgPSAxOyBtdWx0aXBsaWNhbmQgPD0gdGFibGVTaXplICYmICFhbnN3ZXJGb3VuZDsgbXVsdGlwbGljYW5kKysgKSB7XHJcbiAgICAgICAgZm9yICggbGV0IG11bHRpcGxpZXIgPSAxOyBtdWx0aXBsaWVyIDw9IHRhYmxlU2l6ZSAmJiAhYW5zd2VyRm91bmQ7IG11bHRpcGxpZXIrKyApIHtcclxuICAgICAgICAgIGlmICggbXVsdGlwbGljYW5kICogbXVsdGlwbGllciA9PT0gdGhpcy5wcm9ibGVtTW9kZWwucHJvZHVjdFByb3BlcnR5LmdldCgpICYmICFsZXZlbE1vZGVsLmlzQ2VsbFVzZWQoIG11bHRpcGxpY2FuZCwgbXVsdGlwbGllciApICkge1xyXG5cclxuICAgICAgICAgICAgYW5zd2VyRm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXZlbE1vZGVsLm1hcmtDZWxsQXNVc2VkKCBtdWx0aXBsaWNhbmQsIG11bHRpcGxpZXIgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgbGV2ZWxNb2RlbC5jdXJyZW50U2NvcmVQcm9wZXJ0eS52YWx1ZSArPSB0aGlzLnByb2JsZW1Nb2RlbC5wb3NzaWJsZVBvaW50c1Byb3BlcnR5LmdldCgpO1xyXG4gICAgICBsZXZlbE1vZGVsLmRpc3BsYXlTY29yZVByb3BlcnR5LnNldCggdGhpcy5hY3RpdmVMZXZlbE1vZGVsLmN1cnJlbnRTY29yZVByb3BlcnR5LmdldCgpICk7XHJcbiAgICAgIHRoaXMuc3RhdGVQcm9wZXJ0eS5zZXQoIEdhbWVTdGF0ZS5ESVNQTEFZSU5HX0NPUlJFQ1RfQU5TV0VSX0ZFRURCQUNLICk7XHJcbiAgICAgIHRoaXMubmV4dFByb2JsZW0oKTtcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyByZXN0b3JlIHRoZSBvcmlnaW5hbCBzb3VuZCBzdGF0ZVxyXG4gICAgc291bmRNYW5hZ2VyLmVuYWJsZWQgPSBzb3VuZFN0YXRlO1xyXG4gIH1cclxufVxyXG5cclxuYXJpdGhtZXRpYy5yZWdpc3RlciggJ0ZhY3Rvck1vZGVsJywgRmFjdG9yTW9kZWwgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZhY3Rvck1vZGVsOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtB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