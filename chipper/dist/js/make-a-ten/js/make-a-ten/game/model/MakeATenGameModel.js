// Copyright 2015-2022, University of Colorado Boulder

/**
 * Model for the game screen of Make a Ten.
 *
 * @author Sharfudeen Ashraf
 */

import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import Property from '../../../../../axon/js/Property.js';
import CountingCommonModel from '../../../../../counting-common/js/common/model/CountingCommonModel.js';
import level10_png from '../../../../images/level10_png.js';
import level1_png from '../../../../images/level1_png.js';
import level2_png from '../../../../images/level2_png.js';
import level3_png from '../../../../images/level3_png.js';
import level4_png from '../../../../images/level4_png.js';
import level5_png from '../../../../images/level5_png.js';
import level6_png from '../../../../images/level6_png.js';
import level7_png from '../../../../images/level7_png.js';
import level8_png from '../../../../images/level8_png.js';
import level9_png from '../../../../images/level9_png.js';
import makeATen from '../../../makeATen.js';
import MakeATenStrings from '../../../MakeATenStrings.js';
import MakeATenConstants from '../../common/MakeATenConstants.js';
import AdditionTerms from '../../common/model/AdditionTerms.js';
import GameState from './GameState.js';
import Level from './Level.js';
import NumberChallengeFactory from './NumberChallengeFactory.js';

// Level descriptions
const level10DescriptionString = MakeATenStrings.level10Description;
const level1DescriptionString = MakeATenStrings.level1Description;
const level2DescriptionString = MakeATenStrings.level2Description;
const level3DescriptionString = MakeATenStrings.level3Description;
const level4DescriptionString = MakeATenStrings.level4Description;
const level5DescriptionString = MakeATenStrings.level5Description;
const level6DescriptionString = MakeATenStrings.level6Description;
const level7DescriptionString = MakeATenStrings.level7Description;
const level8DescriptionString = MakeATenStrings.level8Description;
const level9DescriptionString = MakeATenStrings.level9Description;

// Level icons

class MakeATenGameModel extends CountingCommonModel {
  constructor() {
    super(MakeATenConstants.MAX_SUM);

    // Created here, since due to the initialization of dotRandom to support PhET-iO, we need to delay until the model
    // is created (can't do at static load time), thus we have a separate challenge factory.
    const numberChallengeFactory = new NumberChallengeFactory();

    // @public {Array.<Level>} - All of the game levels for this screen.
    this.levels = [new Level(1, '#FC4280', level1_png, level1DescriptionString, numberChallengeFactory), new Level(2, '#FC4280', level2_png, level2DescriptionString, numberChallengeFactory), new Level(3, '#FC4280', level3_png, level3DescriptionString, numberChallengeFactory), new Level(4, '#06A5AD', level4_png, level4DescriptionString, numberChallengeFactory), new Level(5, '#06A5AD', level5_png, level5DescriptionString, numberChallengeFactory), new Level(6, '#06A5AD', level6_png, level6DescriptionString, numberChallengeFactory), new Level(7, '#06A5AD', level7_png, level7DescriptionString, numberChallengeFactory), new Level(8, '#9778CC', level8_png, level8DescriptionString, numberChallengeFactory), new Level(9, '#9778CC', level9_png, level9DescriptionString, numberChallengeFactory), new Level(10, '#9778CC', level10_png, level10DescriptionString, numberChallengeFactory)];

    // @public {Property.<Level>} - The current level
    this.currentLevelProperty = new Property(this.levels[0]);

    // @public {NumberProperty} - The score for whatever the current level is.
    this.currentScoreProperty = new NumberProperty(0);

    // @public {Property.<NumberChallenge|null>} - The current challenge when in a level
    this.currentChallengeProperty = new Property(null);

    // @public {Property.<GameState>} - Current game state
    this.gameStateProperty = new Property(GameState.CHOOSING_LEVEL);

    // @public {AdditionTerms} - Our left and right terms to be added.
    this.additionTerms = new AdditionTerms();

    // Check for when the challenge is completed
    this.countingObjects.lengthProperty.link((newLength, oldLength) => {
      // Check oldLength to make sure it's not from the counting objects just added.
      if (newLength === 1 && oldLength === 2 && this.gameStateProperty.value === GameState.PRESENTING_INTERACTIVE_CHALLENGE) {
        // The user has added the two numbers, trigger success state
        this.gameStateProperty.value = GameState.CORRECT_ANSWER;
      }
    });

    // Keep our currentScore updated when the level changes.
    this.currentLevelProperty.link(level => {
      this.currentScoreProperty.value = level.scoreProperty.value;
    });

    // Keep our currentScore updated when our current level's score changes.
    this.levels.forEach(level => {
      level.scoreProperty.link(score => {
        if (level === this.currentLevelProperty.value) {
          this.currentScoreProperty.value = score;
        }
      });
    });
  }

  /**
   * Starts a new challenge with the level specified
   * @public
   *
   * @param {Level} level
   */
  startLevel(level) {
    this.removeAllCountingObjects();
    this.currentLevelProperty.value = level;

    // Set up the model for the next challenge
    this.currentChallengeProperty.value = level.generateChallenge();

    // Change to new game state.
    this.gameStateProperty.value = GameState.PRESENTING_INTERACTIVE_CHALLENGE;
  }

  /**
   * Increments the score of the current level.
   * @public
   */
  incrementScore() {
    this.currentLevelProperty.value.scoreProperty.value++;
  }

  /**
   * Moves to the next challenge (the current challenge's solution was correct).
   * @public
   */
  moveToNextChallenge() {
    this.removeAllCountingObjects();
    this.currentChallengeProperty.value = this.currentLevelProperty.value.generateChallenge();
    this.gameStateProperty.value = GameState.PRESENTING_INTERACTIVE_CHALLENGE;
  }

  /**
   * Moves back to the level selection.
   * @public
   */
  moveToChoosingLevel() {
    this.gameStateProperty.value = GameState.CHOOSING_LEVEL;
  }

  /**
   * Creates counting objects for the specified challenge.
   * @public
   *
   * @param {NumberChallenge} numberChallenge
   */
  setupChallenge(numberChallenge) {
    this.removeAllCountingObjects();
    this.additionTerms.leftTermProperty.value = numberChallenge.leftTerm;
    this.additionTerms.rightTermProperty.value = numberChallenge.rightTerm;
    this.addMultipleNumbers([numberChallenge.leftTerm, numberChallenge.rightTerm]);
  }

  /**
   * Resets our game model.
   * @public
   */
  reset() {
    super.reset();
    this.currentLevelProperty.reset();
    this.currentScoreProperty.reset();
    this.currentChallengeProperty.reset();
    this.gameStateProperty.reset();
    for (let i = 0; i < this.levels.length; i++) {
      this.levels[i].reset();
    }
  }
}
makeATen.register('MakeATenGameModel', MakeATenGameModel);
export default MakeATenGameModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJOdW1iZXJQcm9wZXJ0eSIsIlByb3BlcnR5IiwiQ291bnRpbmdDb21tb25Nb2RlbCIsImxldmVsMTBfcG5nIiwibGV2ZWwxX3BuZyIsImxldmVsMl9wbmciLCJsZXZlbDNfcG5nIiwibGV2ZWw0X3BuZyIsImxldmVsNV9wbmciLCJsZXZlbDZfcG5nIiwibGV2ZWw3X3BuZyIsImxldmVsOF9wbmciLCJsZXZlbDlfcG5nIiwibWFrZUFUZW4iLCJNYWtlQVRlblN0cmluZ3MiLCJNYWtlQVRlbkNvbnN0YW50cyIsIkFkZGl0aW9uVGVybXMiLCJHYW1lU3RhdGUiLCJMZXZlbCIsIk51bWJlckNoYWxsZW5nZUZhY3RvcnkiLCJsZXZlbDEwRGVzY3JpcHRpb25TdHJpbmciLCJsZXZlbDEwRGVzY3JpcHRpb24iLCJsZXZlbDFEZXNjcmlwdGlvblN0cmluZyIsImxldmVsMURlc2NyaXB0aW9uIiwibGV2ZWwyRGVzY3JpcHRpb25TdHJpbmciLCJsZXZlbDJEZXNjcmlwdGlvbiIsImxldmVsM0Rlc2NyaXB0aW9uU3RyaW5nIiwibGV2ZWwzRGVzY3JpcHRpb24iLCJsZXZlbDREZXNjcmlwdGlvblN0cmluZyIsImxldmVsNERlc2NyaXB0aW9uIiwibGV2ZWw1RGVzY3JpcHRpb25TdHJpbmciLCJsZXZlbDVEZXNjcmlwdGlvbiIsImxldmVsNkRlc2NyaXB0aW9uU3RyaW5nIiwibGV2ZWw2RGVzY3JpcHRpb24iLCJsZXZlbDdEZXNjcmlwdGlvblN0cmluZyIsImxldmVsN0Rlc2NyaXB0aW9uIiwibGV2ZWw4RGVzY3JpcHRpb25TdHJpbmciLCJsZXZlbDhEZXNjcmlwdGlvbiIsImxldmVsOURlc2NyaXB0aW9uU3RyaW5nIiwibGV2ZWw5RGVzY3JpcHRpb24iLCJNYWtlQVRlbkdhbWVNb2RlbCIsImNvbnN0cnVjdG9yIiwiTUFYX1NVTSIsIm51bWJlckNoYWxsZW5nZUZhY3RvcnkiLCJsZXZlbHMiLCJjdXJyZW50TGV2ZWxQcm9wZXJ0eSIsImN1cnJlbnRTY29yZVByb3BlcnR5IiwiY3VycmVudENoYWxsZW5nZVByb3BlcnR5IiwiZ2FtZVN0YXRlUHJvcGVydHkiLCJDSE9PU0lOR19MRVZFTCIsImFkZGl0aW9uVGVybXMiLCJjb3VudGluZ09iamVjdHMiLCJsZW5ndGhQcm9wZXJ0eSIsImxpbmsiLCJuZXdMZW5ndGgiLCJvbGRMZW5ndGgiLCJ2YWx1ZSIsIlBSRVNFTlRJTkdfSU5URVJBQ1RJVkVfQ0hBTExFTkdFIiwiQ09SUkVDVF9BTlNXRVIiLCJsZXZlbCIsInNjb3JlUHJvcGVydHkiLCJmb3JFYWNoIiwic2NvcmUiLCJzdGFydExldmVsIiwicmVtb3ZlQWxsQ291bnRpbmdPYmplY3RzIiwiZ2VuZXJhdGVDaGFsbGVuZ2UiLCJpbmNyZW1lbnRTY29yZSIsIm1vdmVUb05leHRDaGFsbGVuZ2UiLCJtb3ZlVG9DaG9vc2luZ0xldmVsIiwic2V0dXBDaGFsbGVuZ2UiLCJudW1iZXJDaGFsbGVuZ2UiLCJsZWZ0VGVybVByb3BlcnR5IiwibGVmdFRlcm0iLCJyaWdodFRlcm1Qcm9wZXJ0eSIsInJpZ2h0VGVybSIsImFkZE11bHRpcGxlTnVtYmVycyIsInJlc2V0IiwiaSIsImxlbmd0aCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiTWFrZUFUZW5HYW1lTW9kZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTUtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogTW9kZWwgZm9yIHRoZSBnYW1lIHNjcmVlbiBvZiBNYWtlIGEgVGVuLlxyXG4gKlxyXG4gKiBAYXV0aG9yIFNoYXJmdWRlZW4gQXNocmFmXHJcbiAqL1xyXG5cclxuaW1wb3J0IE51bWJlclByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uLy4uL2F4b24vanMvTnVtYmVyUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vLi4vYXhvbi9qcy9Qcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBDb3VudGluZ0NvbW1vbk1vZGVsIGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvdW50aW5nLWNvbW1vbi9qcy9jb21tb24vbW9kZWwvQ291bnRpbmdDb21tb25Nb2RlbC5qcyc7XHJcbmltcG9ydCBsZXZlbDEwX3BuZyBmcm9tICcuLi8uLi8uLi8uLi9pbWFnZXMvbGV2ZWwxMF9wbmcuanMnO1xyXG5pbXBvcnQgbGV2ZWwxX3BuZyBmcm9tICcuLi8uLi8uLi8uLi9pbWFnZXMvbGV2ZWwxX3BuZy5qcyc7XHJcbmltcG9ydCBsZXZlbDJfcG5nIGZyb20gJy4uLy4uLy4uLy4uL2ltYWdlcy9sZXZlbDJfcG5nLmpzJztcclxuaW1wb3J0IGxldmVsM19wbmcgZnJvbSAnLi4vLi4vLi4vLi4vaW1hZ2VzL2xldmVsM19wbmcuanMnO1xyXG5pbXBvcnQgbGV2ZWw0X3BuZyBmcm9tICcuLi8uLi8uLi8uLi9pbWFnZXMvbGV2ZWw0X3BuZy5qcyc7XHJcbmltcG9ydCBsZXZlbDVfcG5nIGZyb20gJy4uLy4uLy4uLy4uL2ltYWdlcy9sZXZlbDVfcG5nLmpzJztcclxuaW1wb3J0IGxldmVsNl9wbmcgZnJvbSAnLi4vLi4vLi4vLi4vaW1hZ2VzL2xldmVsNl9wbmcuanMnO1xyXG5pbXBvcnQgbGV2ZWw3X3BuZyBmcm9tICcuLi8uLi8uLi8uLi9pbWFnZXMvbGV2ZWw3X3BuZy5qcyc7XHJcbmltcG9ydCBsZXZlbDhfcG5nIGZyb20gJy4uLy4uLy4uLy4uL2ltYWdlcy9sZXZlbDhfcG5nLmpzJztcclxuaW1wb3J0IGxldmVsOV9wbmcgZnJvbSAnLi4vLi4vLi4vLi4vaW1hZ2VzL2xldmVsOV9wbmcuanMnO1xyXG5pbXBvcnQgbWFrZUFUZW4gZnJvbSAnLi4vLi4vLi4vbWFrZUFUZW4uanMnO1xyXG5pbXBvcnQgTWFrZUFUZW5TdHJpbmdzIGZyb20gJy4uLy4uLy4uL01ha2VBVGVuU3RyaW5ncy5qcyc7XHJcbmltcG9ydCBNYWtlQVRlbkNvbnN0YW50cyBmcm9tICcuLi8uLi9jb21tb24vTWFrZUFUZW5Db25zdGFudHMuanMnO1xyXG5pbXBvcnQgQWRkaXRpb25UZXJtcyBmcm9tICcuLi8uLi9jb21tb24vbW9kZWwvQWRkaXRpb25UZXJtcy5qcyc7XHJcbmltcG9ydCBHYW1lU3RhdGUgZnJvbSAnLi9HYW1lU3RhdGUuanMnO1xyXG5pbXBvcnQgTGV2ZWwgZnJvbSAnLi9MZXZlbC5qcyc7XHJcbmltcG9ydCBOdW1iZXJDaGFsbGVuZ2VGYWN0b3J5IGZyb20gJy4vTnVtYmVyQ2hhbGxlbmdlRmFjdG9yeS5qcyc7XHJcblxyXG4vLyBMZXZlbCBkZXNjcmlwdGlvbnNcclxuY29uc3QgbGV2ZWwxMERlc2NyaXB0aW9uU3RyaW5nID0gTWFrZUFUZW5TdHJpbmdzLmxldmVsMTBEZXNjcmlwdGlvbjtcclxuY29uc3QgbGV2ZWwxRGVzY3JpcHRpb25TdHJpbmcgPSBNYWtlQVRlblN0cmluZ3MubGV2ZWwxRGVzY3JpcHRpb247XHJcbmNvbnN0IGxldmVsMkRlc2NyaXB0aW9uU3RyaW5nID0gTWFrZUFUZW5TdHJpbmdzLmxldmVsMkRlc2NyaXB0aW9uO1xyXG5jb25zdCBsZXZlbDNEZXNjcmlwdGlvblN0cmluZyA9IE1ha2VBVGVuU3RyaW5ncy5sZXZlbDNEZXNjcmlwdGlvbjtcclxuY29uc3QgbGV2ZWw0RGVzY3JpcHRpb25TdHJpbmcgPSBNYWtlQVRlblN0cmluZ3MubGV2ZWw0RGVzY3JpcHRpb247XHJcbmNvbnN0IGxldmVsNURlc2NyaXB0aW9uU3RyaW5nID0gTWFrZUFUZW5TdHJpbmdzLmxldmVsNURlc2NyaXB0aW9uO1xyXG5jb25zdCBsZXZlbDZEZXNjcmlwdGlvblN0cmluZyA9IE1ha2VBVGVuU3RyaW5ncy5sZXZlbDZEZXNjcmlwdGlvbjtcclxuY29uc3QgbGV2ZWw3RGVzY3JpcHRpb25TdHJpbmcgPSBNYWtlQVRlblN0cmluZ3MubGV2ZWw3RGVzY3JpcHRpb247XHJcbmNvbnN0IGxldmVsOERlc2NyaXB0aW9uU3RyaW5nID0gTWFrZUFUZW5TdHJpbmdzLmxldmVsOERlc2NyaXB0aW9uO1xyXG5jb25zdCBsZXZlbDlEZXNjcmlwdGlvblN0cmluZyA9IE1ha2VBVGVuU3RyaW5ncy5sZXZlbDlEZXNjcmlwdGlvbjtcclxuXHJcbi8vIExldmVsIGljb25zXHJcblxyXG5jbGFzcyBNYWtlQVRlbkdhbWVNb2RlbCBleHRlbmRzIENvdW50aW5nQ29tbW9uTW9kZWwge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoIE1ha2VBVGVuQ29uc3RhbnRzLk1BWF9TVU0gKTtcclxuXHJcbiAgICAvLyBDcmVhdGVkIGhlcmUsIHNpbmNlIGR1ZSB0byB0aGUgaW5pdGlhbGl6YXRpb24gb2YgZG90UmFuZG9tIHRvIHN1cHBvcnQgUGhFVC1pTywgd2UgbmVlZCB0byBkZWxheSB1bnRpbCB0aGUgbW9kZWxcclxuICAgIC8vIGlzIGNyZWF0ZWQgKGNhbid0IGRvIGF0IHN0YXRpYyBsb2FkIHRpbWUpLCB0aHVzIHdlIGhhdmUgYSBzZXBhcmF0ZSBjaGFsbGVuZ2UgZmFjdG9yeS5cclxuICAgIGNvbnN0IG51bWJlckNoYWxsZW5nZUZhY3RvcnkgPSBuZXcgTnVtYmVyQ2hhbGxlbmdlRmFjdG9yeSgpO1xyXG5cclxuICAgIC8vIEBwdWJsaWMge0FycmF5LjxMZXZlbD59IC0gQWxsIG9mIHRoZSBnYW1lIGxldmVscyBmb3IgdGhpcyBzY3JlZW4uXHJcbiAgICB0aGlzLmxldmVscyA9IFtcclxuICAgICAgbmV3IExldmVsKCAxLCAnI0ZDNDI4MCcsIGxldmVsMV9wbmcsIGxldmVsMURlc2NyaXB0aW9uU3RyaW5nLCBudW1iZXJDaGFsbGVuZ2VGYWN0b3J5ICksXHJcbiAgICAgIG5ldyBMZXZlbCggMiwgJyNGQzQyODAnLCBsZXZlbDJfcG5nLCBsZXZlbDJEZXNjcmlwdGlvblN0cmluZywgbnVtYmVyQ2hhbGxlbmdlRmFjdG9yeSApLFxyXG4gICAgICBuZXcgTGV2ZWwoIDMsICcjRkM0MjgwJywgbGV2ZWwzX3BuZywgbGV2ZWwzRGVzY3JpcHRpb25TdHJpbmcsIG51bWJlckNoYWxsZW5nZUZhY3RvcnkgKSxcclxuICAgICAgbmV3IExldmVsKCA0LCAnIzA2QTVBRCcsIGxldmVsNF9wbmcsIGxldmVsNERlc2NyaXB0aW9uU3RyaW5nLCBudW1iZXJDaGFsbGVuZ2VGYWN0b3J5ICksXHJcbiAgICAgIG5ldyBMZXZlbCggNSwgJyMwNkE1QUQnLCBsZXZlbDVfcG5nLCBsZXZlbDVEZXNjcmlwdGlvblN0cmluZywgbnVtYmVyQ2hhbGxlbmdlRmFjdG9yeSApLFxyXG4gICAgICBuZXcgTGV2ZWwoIDYsICcjMDZBNUFEJywgbGV2ZWw2X3BuZywgbGV2ZWw2RGVzY3JpcHRpb25TdHJpbmcsIG51bWJlckNoYWxsZW5nZUZhY3RvcnkgKSxcclxuICAgICAgbmV3IExldmVsKCA3LCAnIzA2QTVBRCcsIGxldmVsN19wbmcsIGxldmVsN0Rlc2NyaXB0aW9uU3RyaW5nLCBudW1iZXJDaGFsbGVuZ2VGYWN0b3J5ICksXHJcbiAgICAgIG5ldyBMZXZlbCggOCwgJyM5Nzc4Q0MnLCBsZXZlbDhfcG5nLCBsZXZlbDhEZXNjcmlwdGlvblN0cmluZywgbnVtYmVyQ2hhbGxlbmdlRmFjdG9yeSApLFxyXG4gICAgICBuZXcgTGV2ZWwoIDksICcjOTc3OENDJywgbGV2ZWw5X3BuZywgbGV2ZWw5RGVzY3JpcHRpb25TdHJpbmcsIG51bWJlckNoYWxsZW5nZUZhY3RvcnkgKSxcclxuICAgICAgbmV3IExldmVsKCAxMCwgJyM5Nzc4Q0MnLCBsZXZlbDEwX3BuZywgbGV2ZWwxMERlc2NyaXB0aW9uU3RyaW5nLCBudW1iZXJDaGFsbGVuZ2VGYWN0b3J5IClcclxuICAgIF07XHJcblxyXG4gICAgLy8gQHB1YmxpYyB7UHJvcGVydHkuPExldmVsPn0gLSBUaGUgY3VycmVudCBsZXZlbFxyXG4gICAgdGhpcy5jdXJyZW50TGV2ZWxQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eSggdGhpcy5sZXZlbHNbIDAgXSApO1xyXG5cclxuICAgIC8vIEBwdWJsaWMge051bWJlclByb3BlcnR5fSAtIFRoZSBzY29yZSBmb3Igd2hhdGV2ZXIgdGhlIGN1cnJlbnQgbGV2ZWwgaXMuXHJcbiAgICB0aGlzLmN1cnJlbnRTY29yZVByb3BlcnR5ID0gbmV3IE51bWJlclByb3BlcnR5KCAwICk7XHJcblxyXG4gICAgLy8gQHB1YmxpYyB7UHJvcGVydHkuPE51bWJlckNoYWxsZW5nZXxudWxsPn0gLSBUaGUgY3VycmVudCBjaGFsbGVuZ2Ugd2hlbiBpbiBhIGxldmVsXHJcbiAgICB0aGlzLmN1cnJlbnRDaGFsbGVuZ2VQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eSggbnVsbCApO1xyXG5cclxuICAgIC8vIEBwdWJsaWMge1Byb3BlcnR5LjxHYW1lU3RhdGU+fSAtIEN1cnJlbnQgZ2FtZSBzdGF0ZVxyXG4gICAgdGhpcy5nYW1lU3RhdGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eSggR2FtZVN0YXRlLkNIT09TSU5HX0xFVkVMICk7XHJcblxyXG4gICAgLy8gQHB1YmxpYyB7QWRkaXRpb25UZXJtc30gLSBPdXIgbGVmdCBhbmQgcmlnaHQgdGVybXMgdG8gYmUgYWRkZWQuXHJcbiAgICB0aGlzLmFkZGl0aW9uVGVybXMgPSBuZXcgQWRkaXRpb25UZXJtcygpO1xyXG5cclxuICAgIC8vIENoZWNrIGZvciB3aGVuIHRoZSBjaGFsbGVuZ2UgaXMgY29tcGxldGVkXHJcbiAgICB0aGlzLmNvdW50aW5nT2JqZWN0cy5sZW5ndGhQcm9wZXJ0eS5saW5rKCAoIG5ld0xlbmd0aCwgb2xkTGVuZ3RoICkgPT4ge1xyXG4gICAgICAvLyBDaGVjayBvbGRMZW5ndGggdG8gbWFrZSBzdXJlIGl0J3Mgbm90IGZyb20gdGhlIGNvdW50aW5nIG9iamVjdHMganVzdCBhZGRlZC5cclxuICAgICAgaWYgKCBuZXdMZW5ndGggPT09IDEgJiYgb2xkTGVuZ3RoID09PSAyICYmIHRoaXMuZ2FtZVN0YXRlUHJvcGVydHkudmFsdWUgPT09IEdhbWVTdGF0ZS5QUkVTRU5USU5HX0lOVEVSQUNUSVZFX0NIQUxMRU5HRSApIHsgLy8gVGhlIHVzZXIgaGFzIGFkZGVkIHRoZSB0d28gbnVtYmVycywgdHJpZ2dlciBzdWNjZXNzIHN0YXRlXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGVQcm9wZXJ0eS52YWx1ZSA9IEdhbWVTdGF0ZS5DT1JSRUNUX0FOU1dFUjtcclxuICAgICAgfVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIEtlZXAgb3VyIGN1cnJlbnRTY29yZSB1cGRhdGVkIHdoZW4gdGhlIGxldmVsIGNoYW5nZXMuXHJcbiAgICB0aGlzLmN1cnJlbnRMZXZlbFByb3BlcnR5LmxpbmsoIGxldmVsID0+IHtcclxuICAgICAgdGhpcy5jdXJyZW50U2NvcmVQcm9wZXJ0eS52YWx1ZSA9IGxldmVsLnNjb3JlUHJvcGVydHkudmFsdWU7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gS2VlcCBvdXIgY3VycmVudFNjb3JlIHVwZGF0ZWQgd2hlbiBvdXIgY3VycmVudCBsZXZlbCdzIHNjb3JlIGNoYW5nZXMuXHJcbiAgICB0aGlzLmxldmVscy5mb3JFYWNoKCBsZXZlbCA9PiB7XHJcbiAgICAgIGxldmVsLnNjb3JlUHJvcGVydHkubGluayggc2NvcmUgPT4ge1xyXG4gICAgICAgIGlmICggbGV2ZWwgPT09IHRoaXMuY3VycmVudExldmVsUHJvcGVydHkudmFsdWUgKSB7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRTY29yZVByb3BlcnR5LnZhbHVlID0gc2NvcmU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9ICk7XHJcbiAgICB9ICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgYSBuZXcgY2hhbGxlbmdlIHdpdGggdGhlIGxldmVsIHNwZWNpZmllZFxyXG4gICAqIEBwdWJsaWNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7TGV2ZWx9IGxldmVsXHJcbiAgICovXHJcbiAgc3RhcnRMZXZlbCggbGV2ZWwgKSB7XHJcbiAgICB0aGlzLnJlbW92ZUFsbENvdW50aW5nT2JqZWN0cygpO1xyXG5cclxuICAgIHRoaXMuY3VycmVudExldmVsUHJvcGVydHkudmFsdWUgPSBsZXZlbDtcclxuXHJcbiAgICAvLyBTZXQgdXAgdGhlIG1vZGVsIGZvciB0aGUgbmV4dCBjaGFsbGVuZ2VcclxuICAgIHRoaXMuY3VycmVudENoYWxsZW5nZVByb3BlcnR5LnZhbHVlID0gbGV2ZWwuZ2VuZXJhdGVDaGFsbGVuZ2UoKTtcclxuXHJcbiAgICAvLyBDaGFuZ2UgdG8gbmV3IGdhbWUgc3RhdGUuXHJcbiAgICB0aGlzLmdhbWVTdGF0ZVByb3BlcnR5LnZhbHVlID0gR2FtZVN0YXRlLlBSRVNFTlRJTkdfSU5URVJBQ1RJVkVfQ0hBTExFTkdFO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5jcmVtZW50cyB0aGUgc2NvcmUgb2YgdGhlIGN1cnJlbnQgbGV2ZWwuXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIGluY3JlbWVudFNjb3JlKCkge1xyXG4gICAgdGhpcy5jdXJyZW50TGV2ZWxQcm9wZXJ0eS52YWx1ZS5zY29yZVByb3BlcnR5LnZhbHVlKys7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNb3ZlcyB0byB0aGUgbmV4dCBjaGFsbGVuZ2UgKHRoZSBjdXJyZW50IGNoYWxsZW5nZSdzIHNvbHV0aW9uIHdhcyBjb3JyZWN0KS5cclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgbW92ZVRvTmV4dENoYWxsZW5nZSgpIHtcclxuICAgIHRoaXMucmVtb3ZlQWxsQ291bnRpbmdPYmplY3RzKCk7XHJcblxyXG4gICAgdGhpcy5jdXJyZW50Q2hhbGxlbmdlUHJvcGVydHkudmFsdWUgPSB0aGlzLmN1cnJlbnRMZXZlbFByb3BlcnR5LnZhbHVlLmdlbmVyYXRlQ2hhbGxlbmdlKCk7XHJcbiAgICB0aGlzLmdhbWVTdGF0ZVByb3BlcnR5LnZhbHVlID0gR2FtZVN0YXRlLlBSRVNFTlRJTkdfSU5URVJBQ1RJVkVfQ0hBTExFTkdFO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZXMgYmFjayB0byB0aGUgbGV2ZWwgc2VsZWN0aW9uLlxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBtb3ZlVG9DaG9vc2luZ0xldmVsKCkge1xyXG4gICAgdGhpcy5nYW1lU3RhdGVQcm9wZXJ0eS52YWx1ZSA9IEdhbWVTdGF0ZS5DSE9PU0lOR19MRVZFTDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgY291bnRpbmcgb2JqZWN0cyBmb3IgdGhlIHNwZWNpZmllZCBjaGFsbGVuZ2UuXHJcbiAgICogQHB1YmxpY1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtOdW1iZXJDaGFsbGVuZ2V9IG51bWJlckNoYWxsZW5nZVxyXG4gICAqL1xyXG4gIHNldHVwQ2hhbGxlbmdlKCBudW1iZXJDaGFsbGVuZ2UgKSB7XHJcbiAgICB0aGlzLnJlbW92ZUFsbENvdW50aW5nT2JqZWN0cygpO1xyXG4gICAgdGhpcy5hZGRpdGlvblRlcm1zLmxlZnRUZXJtUHJvcGVydHkudmFsdWUgPSBudW1iZXJDaGFsbGVuZ2UubGVmdFRlcm07XHJcbiAgICB0aGlzLmFkZGl0aW9uVGVybXMucmlnaHRUZXJtUHJvcGVydHkudmFsdWUgPSBudW1iZXJDaGFsbGVuZ2UucmlnaHRUZXJtO1xyXG4gICAgdGhpcy5hZGRNdWx0aXBsZU51bWJlcnMoIFsgbnVtYmVyQ2hhbGxlbmdlLmxlZnRUZXJtLCBudW1iZXJDaGFsbGVuZ2UucmlnaHRUZXJtIF0gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0cyBvdXIgZ2FtZSBtb2RlbC5cclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgcmVzZXQoKSB7XHJcbiAgICBzdXBlci5yZXNldCgpO1xyXG5cclxuICAgIHRoaXMuY3VycmVudExldmVsUHJvcGVydHkucmVzZXQoKTtcclxuICAgIHRoaXMuY3VycmVudFNjb3JlUHJvcGVydHkucmVzZXQoKTtcclxuICAgIHRoaXMuY3VycmVudENoYWxsZW5nZVByb3BlcnR5LnJlc2V0KCk7XHJcbiAgICB0aGlzLmdhbWVTdGF0ZVByb3BlcnR5LnJlc2V0KCk7XHJcblxyXG4gICAgZm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5sZXZlbHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgIHRoaXMubGV2ZWxzWyBpIF0ucmVzZXQoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbm1ha2VBVGVuLnJlZ2lzdGVyKCAnTWFrZUFUZW5HYW1lTW9kZWwnLCBNYWtlQVRlbkdhbWVNb2RlbCApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFrZUFUZW5HYW1lTW9kZWw7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLGNBQWMsTUFBTSwwQ0FBMEM7QUFDckUsT0FBT0MsUUFBUSxNQUFNLG9DQUFvQztBQUN6RCxPQUFPQyxtQkFBbUIsTUFBTSx1RUFBdUU7QUFDdkcsT0FBT0MsV0FBVyxNQUFNLG1DQUFtQztBQUMzRCxPQUFPQyxVQUFVLE1BQU0sa0NBQWtDO0FBQ3pELE9BQU9DLFVBQVUsTUFBTSxrQ0FBa0M7QUFDekQsT0FBT0MsVUFBVSxNQUFNLGtDQUFrQztBQUN6RCxPQUFPQyxVQUFVLE1BQU0sa0NBQWtDO0FBQ3pELE9BQU9DLFVBQVUsTUFBTSxrQ0FBa0M7QUFDekQsT0FBT0MsVUFBVSxNQUFNLGtDQUFrQztBQUN6RCxPQUFPQyxVQUFVLE1BQU0sa0NBQWtDO0FBQ3pELE9BQU9DLFVBQVUsTUFBTSxrQ0FBa0M7QUFDekQsT0FBT0MsVUFBVSxNQUFNLGtDQUFrQztBQUN6RCxPQUFPQyxRQUFRLE1BQU0sc0JBQXNCO0FBQzNDLE9BQU9DLGVBQWUsTUFBTSw2QkFBNkI7QUFDekQsT0FBT0MsaUJBQWlCLE1BQU0sbUNBQW1DO0FBQ2pFLE9BQU9DLGFBQWEsTUFBTSxxQ0FBcUM7QUFDL0QsT0FBT0MsU0FBUyxNQUFNLGdCQUFnQjtBQUN0QyxPQUFPQyxLQUFLLE1BQU0sWUFBWTtBQUM5QixPQUFPQyxzQkFBc0IsTUFBTSw2QkFBNkI7O0FBRWhFO0FBQ0EsTUFBTUMsd0JBQXdCLEdBQUdOLGVBQWUsQ0FBQ08sa0JBQWtCO0FBQ25FLE1BQU1DLHVCQUF1QixHQUFHUixlQUFlLENBQUNTLGlCQUFpQjtBQUNqRSxNQUFNQyx1QkFBdUIsR0FBR1YsZUFBZSxDQUFDVyxpQkFBaUI7QUFD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