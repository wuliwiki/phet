// Copyright 2021-2023, University of Colorado Boulder

/**
 * CountingGameLevelNode is the class for a 'Counting' game level view.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import NumberPlayGameLevelNode from './NumberPlayGameLevelNode.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import numberPlay from '../../numberPlay.js';
import NumberPlayGameAnswerButtons from './NumberPlayGameAnswerButtons.js';
import CountingAreaNode from '../../../../number-suite-common/js/common/view/CountingAreaNode.js';
import { Rectangle } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import TenFrameNode from '../../../../number-suite-common/js/common/view/TenFrameNode.js';
import NumberPlayColors from '../../common/NumberPlayColors.js';
import NumberSuiteCommonColors from '../../../../number-suite-common/js/common/NumberSuiteCommonColors.js';
// constants
const BACKGROUND_WIDTH = 550;
const BACKGROUND_HEIGHT = 325;
const PANEL_LINE_WIDTH = 2;
const TEN_FRAME_MARGIN = 10;
class CountingGameLevelNode extends NumberPlayGameLevelNode {
  constructor(level, levelProperty, rewardDialog, layoutBounds, visibleBoundsProperty) {
    super(level, levelProperty, layoutBounds, visibleBoundsProperty, {
      statusBarOptions: {
        barFill: NumberPlayColors.countingGameColorProperty
      }
    });

    // create and add the answerButtons
    this.answerButtons = new NumberPlayGameAnswerButtons(level, this.pointAwardedNodeVisibleProperty, rewardDialog, () => this.setFrownyFaceVisibility(false), () => this.setFrownyFaceVisibility(true), {
      buttonColor: NumberPlayColors.countingGameLightColorProperty
    });
    this.answerButtons.centerX = layoutBounds.centerX;
    this.answerButtons.bottom = layoutBounds.maxY - NumberPlayGameLevelNode.ANSWER_BUTTONS_BOTTOM_MARGIN_Y;
    this.addChild(this.answerButtons);

    // create and add the objectsCountingAreaNode
    const objectsCountingAreaNode = new CountingAreaNode(level.objectsCountingArea, level.countingObjectTypeProperty, new Property(new Bounds2(0, 0, BACKGROUND_WIDTH, BACKGROUND_HEIGHT)), {
      includeCountingObjectCreatorPanel: false
    });

    // Override the localBounds so they don't change.
    objectsCountingAreaNode.localBounds = objectsCountingAreaNode.localBounds.copy();

    // create and add the countingAreaPanel, a panel for the countingArea
    const countingAreaPanel = new Panel(objectsCountingAreaNode, {
      xMargin: 0,
      yMargin: 0,
      fill: NumberPlayColors.blueBackgroundColorProperty,
      lineWidth: PANEL_LINE_WIDTH
    });
    countingAreaPanel.centerX = layoutBounds.centerX;
    countingAreaPanel.bottom = this.answerButtons.top - NumberPlayGameLevelNode.GAME_AREA_NODE_BOTTOM_MARGIN_Y;
    this.addChild(countingAreaPanel);
    const tenFrameBackgroundNode = new Rectangle({
      rectWidth: BACKGROUND_WIDTH - TEN_FRAME_MARGIN * 2,
      rectHeight: BACKGROUND_HEIGHT - TEN_FRAME_MARGIN * 2,
      fill: NumberSuiteCommonColors.lightPurpleBackgroundColorProperty
    });

    // create and add the tenFrameNode
    const tenFrameNode = new TenFrameNode(level.challengeNumberProperty, level.challengeRange);
    tenFrameNode.scale(BACKGROUND_HEIGHT / tenFrameNode.height / 3.5);
    tenFrameNode.center = tenFrameBackgroundNode.center;
    tenFrameBackgroundNode.addChild(tenFrameNode);

    // create and add the tenFramePanel, a panel for the ten frame
    const tenFramePanel = new Panel(tenFrameBackgroundNode, {
      xMargin: TEN_FRAME_MARGIN,
      yMargin: TEN_FRAME_MARGIN,
      fill: NumberSuiteCommonColors.lightPurpleBackgroundColorProperty,
      lineWidth: PANEL_LINE_WIDTH
    });
    tenFramePanel.centerX = layoutBounds.centerX;
    tenFramePanel.bottom = this.answerButtons.top - NumberPlayGameLevelNode.GAME_AREA_NODE_BOTTOM_MARGIN_Y;
    this.addChild(tenFramePanel);

    // update the visibility of the panels when the representation types change
    level.isObjectsRepresentationProperty.link(isObjects => {
      countingAreaPanel.visible = isObjects;
      tenFramePanel.visible = !isObjects;
    });
  }
  dispose() {
    assert && assert(false, 'dispose is not supported, exists for the lifetime of the sim');
    super.dispose();
  }
}
numberPlay.register('CountingGameLevelNode', CountingGameLevelNode);
export default CountingGameLevelNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJOdW1iZXJQbGF5R2FtZUxldmVsTm9kZSIsIlByb3BlcnR5IiwiQm91bmRzMiIsIm51bWJlclBsYXkiLCJOdW1iZXJQbGF5R2FtZUFuc3dlckJ1dHRvbnMiLCJDb3VudGluZ0FyZWFOb2RlIiwiUmVjdGFuZ2xlIiwiUGFuZWwiLCJUZW5GcmFtZU5vZGUiLCJOdW1iZXJQbGF5Q29sb3JzIiwiTnVtYmVyU3VpdGVDb21tb25Db2xvcnMiLCJCQUNLR1JPVU5EX1dJRFRIIiwiQkFDS0dST1VORF9IRUlHSFQiLCJQQU5FTF9MSU5FX1dJRFRIIiwiVEVOX0ZSQU1FX01BUkdJTiIsIkNvdW50aW5nR2FtZUxldmVsTm9kZSIsImNvbnN0cnVjdG9yIiwibGV2ZWwiLCJsZXZlbFByb3BlcnR5IiwicmV3YXJkRGlhbG9nIiwibGF5b3V0Qm91bmRzIiwidmlzaWJsZUJvdW5kc1Byb3BlcnR5Iiwic3RhdHVzQmFyT3B0aW9ucyIsImJhckZpbGwiLCJjb3VudGluZ0dhbWVDb2xvclByb3BlcnR5IiwiYW5zd2VyQnV0dG9ucyIsInBvaW50QXdhcmRlZE5vZGVWaXNpYmxlUHJvcGVydHkiLCJzZXRGcm93bnlGYWNlVmlzaWJpbGl0eSIsImJ1dHRvbkNvbG9yIiwiY291bnRpbmdHYW1lTGlnaHRDb2xvclByb3BlcnR5IiwiY2VudGVyWCIsImJvdHRvbSIsIm1heFkiLCJBTlNXRVJfQlVUVE9OU19CT1RUT01fTUFSR0lOX1kiLCJhZGRDaGlsZCIsIm9iamVjdHNDb3VudGluZ0FyZWFOb2RlIiwib2JqZWN0c0NvdW50aW5nQXJlYSIsImNvdW50aW5nT2JqZWN0VHlwZVByb3BlcnR5IiwiaW5jbHVkZUNvdW50aW5nT2JqZWN0Q3JlYXRvclBhbmVsIiwibG9jYWxCb3VuZHMiLCJjb3B5IiwiY291bnRpbmdBcmVhUGFuZWwiLCJ4TWFyZ2luIiwieU1hcmdpbiIsImZpbGwiLCJibHVlQmFja2dyb3VuZENvbG9yUHJvcGVydHkiLCJsaW5lV2lkdGgiLCJ0b3AiLCJHQU1FX0FSRUFfTk9ERV9CT1RUT01fTUFSR0lOX1kiLCJ0ZW5GcmFtZUJhY2tncm91bmROb2RlIiwicmVjdFdpZHRoIiwicmVjdEhlaWdodCIsImxpZ2h0UHVycGxlQmFja2dyb3VuZENvbG9yUHJvcGVydHkiLCJ0ZW5GcmFtZU5vZGUiLCJjaGFsbGVuZ2VOdW1iZXJQcm9wZXJ0eSIsImNoYWxsZW5nZVJhbmdlIiwic2NhbGUiLCJoZWlnaHQiLCJjZW50ZXIiLCJ0ZW5GcmFtZVBhbmVsIiwiaXNPYmplY3RzUmVwcmVzZW50YXRpb25Qcm9wZXJ0eSIsImxpbmsiLCJpc09iamVjdHMiLCJ2aXNpYmxlIiwiZGlzcG9zZSIsImFzc2VydCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiQ291bnRpbmdHYW1lTGV2ZWxOb2RlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIxLTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIENvdW50aW5nR2FtZUxldmVsTm9kZSBpcyB0aGUgY2xhc3MgZm9yIGEgJ0NvdW50aW5nJyBnYW1lIGxldmVsIHZpZXcuXHJcbiAqXHJcbiAqIEBhdXRob3IgQ2hyaXMgS2x1c2VuZG9yZiAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgTnVtYmVyUGxheUdhbWVMZXZlbE5vZGUgZnJvbSAnLi9OdW1iZXJQbGF5R2FtZUxldmVsTm9kZS5qcyc7XHJcbmltcG9ydCBQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL1Byb3BlcnR5LmpzJztcclxuaW1wb3J0IEJvdW5kczIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL0JvdW5kczIuanMnO1xyXG5pbXBvcnQgQ291bnRpbmdHYW1lTGV2ZWwgZnJvbSAnLi4vbW9kZWwvQ291bnRpbmdHYW1lTGV2ZWwuanMnO1xyXG5pbXBvcnQgbnVtYmVyUGxheSBmcm9tICcuLi8uLi9udW1iZXJQbGF5LmpzJztcclxuaW1wb3J0IE51bWJlclBsYXlHYW1lQW5zd2VyQnV0dG9ucyBmcm9tICcuL051bWJlclBsYXlHYW1lQW5zd2VyQnV0dG9ucy5qcyc7XHJcbmltcG9ydCBDb3VudGluZ0FyZWFOb2RlIGZyb20gJy4uLy4uLy4uLy4uL251bWJlci1zdWl0ZS1jb21tb24vanMvY29tbW9uL3ZpZXcvQ291bnRpbmdBcmVhTm9kZS5qcyc7XHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBQYW5lbCBmcm9tICcuLi8uLi8uLi8uLi9zdW4vanMvUGFuZWwuanMnO1xyXG5pbXBvcnQgVGVuRnJhbWVOb2RlIGZyb20gJy4uLy4uLy4uLy4uL251bWJlci1zdWl0ZS1jb21tb24vanMvY29tbW9uL3ZpZXcvVGVuRnJhbWVOb2RlLmpzJztcclxuaW1wb3J0IE51bWJlclBsYXlDb2xvcnMgZnJvbSAnLi4vLi4vY29tbW9uL051bWJlclBsYXlDb2xvcnMuanMnO1xyXG5pbXBvcnQgTnVtYmVyUGxheUdhbWVMZXZlbCBmcm9tICcuLi9tb2RlbC9OdW1iZXJQbGF5R2FtZUxldmVsLmpzJztcclxuaW1wb3J0IFRQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL1RQcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBOdW1iZXJTdWl0ZUNvbW1vbkNvbG9ycyBmcm9tICcuLi8uLi8uLi8uLi9udW1iZXItc3VpdGUtY29tbW9uL2pzL2NvbW1vbi9OdW1iZXJTdWl0ZUNvbW1vbkNvbG9ycy5qcyc7XHJcbmltcG9ydCBOdW1iZXJQbGF5R2FtZVJld2FyZERpYWxvZyBmcm9tICcuL051bWJlclBsYXlHYW1lUmV3YXJkRGlhbG9nLmpzJztcclxuXHJcbi8vIGNvbnN0YW50c1xyXG5jb25zdCBCQUNLR1JPVU5EX1dJRFRIID0gNTUwO1xyXG5jb25zdCBCQUNLR1JPVU5EX0hFSUdIVCA9IDMyNTtcclxuY29uc3QgUEFORUxfTElORV9XSURUSCA9IDI7XHJcbmNvbnN0IFRFTl9GUkFNRV9NQVJHSU4gPSAxMDtcclxuXHJcbmNsYXNzIENvdW50aW5nR2FtZUxldmVsTm9kZSBleHRlbmRzIE51bWJlclBsYXlHYW1lTGV2ZWxOb2RlPENvdW50aW5nR2FtZUxldmVsPiB7XHJcblxyXG4gIHByb3RlY3RlZCByZWFkb25seSBhbnN3ZXJCdXR0b25zOiBOdW1iZXJQbGF5R2FtZUFuc3dlckJ1dHRvbnM7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggbGV2ZWw6IENvdW50aW5nR2FtZUxldmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgbGV2ZWxQcm9wZXJ0eTogVFByb3BlcnR5PE51bWJlclBsYXlHYW1lTGV2ZWwgfCBudWxsPixcclxuICAgICAgICAgICAgICAgICAgICAgIHJld2FyZERpYWxvZzogTnVtYmVyUGxheUdhbWVSZXdhcmREaWFsb2csXHJcbiAgICAgICAgICAgICAgICAgICAgICBsYXlvdXRCb3VuZHM6IEJvdW5kczIsXHJcbiAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlQm91bmRzUHJvcGVydHk6IFByb3BlcnR5PEJvdW5kczI+ICkge1xyXG5cclxuICAgIHN1cGVyKCBsZXZlbCwgbGV2ZWxQcm9wZXJ0eSwgbGF5b3V0Qm91bmRzLCB2aXNpYmxlQm91bmRzUHJvcGVydHksIHtcclxuICAgICAgc3RhdHVzQmFyT3B0aW9uczoge1xyXG4gICAgICAgIGJhckZpbGw6IE51bWJlclBsYXlDb2xvcnMuY291bnRpbmdHYW1lQ29sb3JQcm9wZXJ0eVxyXG4gICAgICB9XHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gY3JlYXRlIGFuZCBhZGQgdGhlIGFuc3dlckJ1dHRvbnNcclxuICAgIHRoaXMuYW5zd2VyQnV0dG9ucyA9IG5ldyBOdW1iZXJQbGF5R2FtZUFuc3dlckJ1dHRvbnMoXHJcbiAgICAgIGxldmVsLFxyXG4gICAgICB0aGlzLnBvaW50QXdhcmRlZE5vZGVWaXNpYmxlUHJvcGVydHksXHJcbiAgICAgIHJld2FyZERpYWxvZyxcclxuICAgICAgKCkgPT4gdGhpcy5zZXRGcm93bnlGYWNlVmlzaWJpbGl0eSggZmFsc2UgKSxcclxuICAgICAgKCkgPT4gdGhpcy5zZXRGcm93bnlGYWNlVmlzaWJpbGl0eSggdHJ1ZSApLCB7XHJcbiAgICAgICAgYnV0dG9uQ29sb3I6IE51bWJlclBsYXlDb2xvcnMuY291bnRpbmdHYW1lTGlnaHRDb2xvclByb3BlcnR5XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICB0aGlzLmFuc3dlckJ1dHRvbnMuY2VudGVyWCA9IGxheW91dEJvdW5kcy5jZW50ZXJYO1xyXG4gICAgdGhpcy5hbnN3ZXJCdXR0b25zLmJvdHRvbSA9IGxheW91dEJvdW5kcy5tYXhZIC0gTnVtYmVyUGxheUdhbWVMZXZlbE5vZGUuQU5TV0VSX0JVVFRPTlNfQk9UVE9NX01BUkdJTl9ZO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggdGhpcy5hbnN3ZXJCdXR0b25zICk7XHJcblxyXG4gICAgLy8gY3JlYXRlIGFuZCBhZGQgdGhlIG9iamVjdHNDb3VudGluZ0FyZWFOb2RlXHJcbiAgICBjb25zdCBvYmplY3RzQ291bnRpbmdBcmVhTm9kZSA9IG5ldyBDb3VudGluZ0FyZWFOb2RlKFxyXG4gICAgICBsZXZlbC5vYmplY3RzQ291bnRpbmdBcmVhLFxyXG4gICAgICBsZXZlbC5jb3VudGluZ09iamVjdFR5cGVQcm9wZXJ0eSxcclxuICAgICAgbmV3IFByb3BlcnR5KCBuZXcgQm91bmRzMiggMCwgMCwgQkFDS0dST1VORF9XSURUSCwgQkFDS0dST1VORF9IRUlHSFQgKSApLCB7XHJcbiAgICAgICAgaW5jbHVkZUNvdW50aW5nT2JqZWN0Q3JlYXRvclBhbmVsOiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIE92ZXJyaWRlIHRoZSBsb2NhbEJvdW5kcyBzbyB0aGV5IGRvbid0IGNoYW5nZS5cclxuICAgIG9iamVjdHNDb3VudGluZ0FyZWFOb2RlLmxvY2FsQm91bmRzID0gb2JqZWN0c0NvdW50aW5nQXJlYU5vZGUubG9jYWxCb3VuZHMuY29weSgpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBhbmQgYWRkIHRoZSBjb3VudGluZ0FyZWFQYW5lbCwgYSBwYW5lbCBmb3IgdGhlIGNvdW50aW5nQXJlYVxyXG4gICAgY29uc3QgY291bnRpbmdBcmVhUGFuZWwgPSBuZXcgUGFuZWwoIG9iamVjdHNDb3VudGluZ0FyZWFOb2RlLCB7XHJcbiAgICAgIHhNYXJnaW46IDAsXHJcbiAgICAgIHlNYXJnaW46IDAsXHJcbiAgICAgIGZpbGw6IE51bWJlclBsYXlDb2xvcnMuYmx1ZUJhY2tncm91bmRDb2xvclByb3BlcnR5LFxyXG4gICAgICBsaW5lV2lkdGg6IFBBTkVMX0xJTkVfV0lEVEhcclxuICAgIH0gKTtcclxuICAgIGNvdW50aW5nQXJlYVBhbmVsLmNlbnRlclggPSBsYXlvdXRCb3VuZHMuY2VudGVyWDtcclxuICAgIGNvdW50aW5nQXJlYVBhbmVsLmJvdHRvbSA9IHRoaXMuYW5zd2VyQnV0dG9ucy50b3AgLSBOdW1iZXJQbGF5R2FtZUxldmVsTm9kZS5HQU1FX0FSRUFfTk9ERV9CT1RUT01fTUFSR0lOX1k7XHJcbiAgICB0aGlzLmFkZENoaWxkKCBjb3VudGluZ0FyZWFQYW5lbCApO1xyXG5cclxuICAgIGNvbnN0IHRlbkZyYW1lQmFja2dyb3VuZE5vZGUgPSBuZXcgUmVjdGFuZ2xlKCB7XHJcbiAgICAgIHJlY3RXaWR0aDogQkFDS0dST1VORF9XSURUSCAtIFRFTl9GUkFNRV9NQVJHSU4gKiAyLFxyXG4gICAgICByZWN0SGVpZ2h0OiBCQUNLR1JPVU5EX0hFSUdIVCAtIFRFTl9GUkFNRV9NQVJHSU4gKiAyLFxyXG4gICAgICBmaWxsOiBOdW1iZXJTdWl0ZUNvbW1vbkNvbG9ycy5saWdodFB1cnBsZUJhY2tncm91bmRDb2xvclByb3BlcnR5XHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gY3JlYXRlIGFuZCBhZGQgdGhlIHRlbkZyYW1lTm9kZVxyXG4gICAgY29uc3QgdGVuRnJhbWVOb2RlID0gbmV3IFRlbkZyYW1lTm9kZSggbGV2ZWwuY2hhbGxlbmdlTnVtYmVyUHJvcGVydHksIGxldmVsLmNoYWxsZW5nZVJhbmdlICk7XHJcbiAgICB0ZW5GcmFtZU5vZGUuc2NhbGUoIEJBQ0tHUk9VTkRfSEVJR0hUIC8gdGVuRnJhbWVOb2RlLmhlaWdodCAvIDMuNSApO1xyXG4gICAgdGVuRnJhbWVOb2RlLmNlbnRlciA9IHRlbkZyYW1lQmFja2dyb3VuZE5vZGUuY2VudGVyO1xyXG4gICAgdGVuRnJhbWVCYWNrZ3JvdW5kTm9kZS5hZGRDaGlsZCggdGVuRnJhbWVOb2RlICk7XHJcblxyXG4gICAgLy8gY3JlYXRlIGFuZCBhZGQgdGhlIHRlbkZyYW1lUGFuZWwsIGEgcGFuZWwgZm9yIHRoZSB0ZW4gZnJhbWVcclxuICAgIGNvbnN0IHRlbkZyYW1lUGFuZWwgPSBuZXcgUGFuZWwoIHRlbkZyYW1lQmFja2dyb3VuZE5vZGUsIHtcclxuICAgICAgeE1hcmdpbjogVEVOX0ZSQU1FX01BUkdJTixcclxuICAgICAgeU1hcmdpbjogVEVOX0ZSQU1FX01BUkdJTixcclxuICAgICAgZmlsbDogTnVtYmVyU3VpdGVDb21tb25Db2xvcnMubGlnaHRQdXJwbGVCYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eSxcclxuICAgICAgbGluZVdpZHRoOiBQQU5FTF9MSU5FX1dJRFRIXHJcbiAgICB9ICk7XHJcbiAgICB0ZW5GcmFtZVBhbmVsLmNlbnRlclggPSBsYXlvdXRCb3VuZHMuY2VudGVyWDtcclxuICAgIHRlbkZyYW1lUGFuZWwuYm90dG9tID0gdGhpcy5hbnN3ZXJCdXR0b25zLnRvcCAtIE51bWJlclBsYXlHYW1lTGV2ZWxOb2RlLkdBTUVfQVJFQV9OT0RFX0JPVFRPTV9NQVJHSU5fWTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIHRlbkZyYW1lUGFuZWwgKTtcclxuXHJcbiAgICAvLyB1cGRhdGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIHBhbmVscyB3aGVuIHRoZSByZXByZXNlbnRhdGlvbiB0eXBlcyBjaGFuZ2VcclxuICAgIGxldmVsLmlzT2JqZWN0c1JlcHJlc2VudGF0aW9uUHJvcGVydHkubGluayggaXNPYmplY3RzID0+IHtcclxuICAgICAgY291bnRpbmdBcmVhUGFuZWwudmlzaWJsZSA9IGlzT2JqZWN0cztcclxuICAgICAgdGVuRnJhbWVQYW5lbC52aXNpYmxlID0gIWlzT2JqZWN0cztcclxuICAgIH0gKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvdmVycmlkZSBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggZmFsc2UsICdkaXNwb3NlIGlzIG5vdCBzdXBwb3J0ZWQsIGV4aXN0cyBmb3IgdGhlIGxpZmV0aW1lIG9mIHRoZSBzaW0nICk7XHJcbiAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5udW1iZXJQbGF5LnJlZ2lzdGVyKCAnQ291bnRpbmdHYW1lTGV2ZWxOb2RlJywgQ291bnRpbmdHYW1lTGV2ZWxOb2RlICk7XHJcbmV4cG9ydCBkZWZhdWx0IENvdW50aW5nR2FtZUxldmVsTm9kZTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsdUJBQXVCLE1BQU0sOEJBQThCO0FBQ2xFLE9BQU9DLFFBQVEsTUFBTSxpQ0FBaUM7QUFDdEQsT0FBT0MsT0FBTyxNQUFNLCtCQUErQjtBQUVuRCxPQUFPQyxVQUFVLE1BQU0scUJBQXFCO0FBQzVDLE9BQU9DLDJCQUEyQixNQUFNLGtDQUFrQztBQUMxRSxPQUFPQyxnQkFBZ0IsTUFBTSxvRUFBb0U7QUFDakcsU0FBU0MsU0FBUyxRQUFRLG1DQUFtQztBQUM3RCxPQUFPQyxLQUFLLE1BQU0sNkJBQTZCO0FBQy9DLE9BQU9DLFlBQVksTUFBTSxnRUFBZ0U7QUFDekYsT0FBT0MsZ0JBQWdCLE1BQU0sa0NBQWtDO0FBRy9ELE9BQU9DLHVCQUF1QixNQUFNLHNFQUFzRTtBQUcxRztBQUNBLE1BQU1DLGdCQUFnQixHQUFHLEdBQUc7QUFDNUIsTUFBTUMsaUJBQWlCLEdBQUcsR0FBRztBQUM3QixNQUFNQyxnQkFBZ0IsR0FBRyxDQUFDO0FBQzFCLE1BQU1DLGdC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