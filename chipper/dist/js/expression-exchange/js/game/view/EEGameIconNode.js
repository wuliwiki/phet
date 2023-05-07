// Copyright 2016-2022, University of Colorado Boulder

/**
 * icon node for 'Game' screen
 *
 * @author John Blanco
 */

import Screen from '../../../../joist/js/Screen.js';
import FaceNode from '../../../../scenery-phet/js/FaceNode.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox, HStrut, Rectangle, Text } from '../../../../scenery/js/imports.js';
import EESharedConstants from '../../common/EESharedConstants.js';
import CoinTermTypeID from '../../common/enum/CoinTermTypeID.js';
import CoinNodeFactory from '../../common/view/CoinNodeFactory.js';
import expressionExchange from '../../expressionExchange.js';

// constants
const BACKGROUND_COLOR = EESharedConstants.GAME_SCREEN_BACKGROUND_COLOR;
const ICON_SIZE = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE;
const COIN_SPACING = ICON_SIZE.width * 0.02; // empirically determined
const TEXT_FONT = new PhetFont(50);
const PLUS_SIGN_X_MARGIN = 10;
class EEGameIconNode extends Rectangle {
  /**
   */
  constructor() {
    // create the background
    super(0, 0, ICON_SIZE.width, ICON_SIZE.height, {
      fill: BACKGROUND_COLOR
    });

    // created a rounded rectangle that looks like a card
    const cardBackground = new Rectangle(0, 0, ICON_SIZE.width / 2, ICON_SIZE.height / 2, {
      x: ICON_SIZE.width * 0.1,
      y: ICON_SIZE.height * 0.1,
      fill: 'white',
      stroke: 'black',
      lineWidth: 2,
      cornerRadius: 20
    });
    this.addChild(cardBackground);

    // create a "coin equation" that includes coins and numbers
    const coinRadius = ICON_SIZE.width * 0.04; // empirically determined
    const coinEquation = new HBox({
      children: [new Text('2', {
        font: TEXT_FONT
      }), CoinNodeFactory.createIconNode(CoinTermTypeID.X, coinRadius), new HStrut(PLUS_SIGN_X_MARGIN), new Text(MathSymbols.PLUS, {
        font: TEXT_FONT
      }), new HStrut(PLUS_SIGN_X_MARGIN), new Text('3', {
        font: TEXT_FONT
      }), CoinNodeFactory.createIconNode(CoinTermTypeID.Y, coinRadius)]
    });

    // add the coin equation to the card
    coinEquation.centerX = cardBackground.width / 2;
    coinEquation.centerY = cardBackground.height / 2;
    cardBackground.addChild(coinEquation);

    // create and add coins next to the card
    const topCoinRowCenterY = cardBackground.top + cardBackground.height * 0.3;
    const secondCoinRowCenterY = cardBackground.top + cardBackground.height * 0.7;
    this.addChild(CoinNodeFactory.createIconNode(CoinTermTypeID.X, coinRadius, {
      left: cardBackground.right + COIN_SPACING,
      centerY: topCoinRowCenterY
    }));
    this.addChild(CoinNodeFactory.createIconNode(CoinTermTypeID.X, coinRadius, {
      left: cardBackground.right + coinRadius * 2 + COIN_SPACING * 2,
      centerY: topCoinRowCenterY
    }));
    this.addChild(CoinNodeFactory.createIconNode(CoinTermTypeID.Y, coinRadius, {
      left: cardBackground.right + COIN_SPACING,
      centerY: secondCoinRowCenterY
    }));
    this.addChild(CoinNodeFactory.createIconNode(CoinTermTypeID.Y, coinRadius, {
      left: cardBackground.right + coinRadius * 2 + COIN_SPACING * 2,
      centerY: secondCoinRowCenterY
    }));
    this.addChild(CoinNodeFactory.createIconNode(CoinTermTypeID.Y, coinRadius, {
      left: cardBackground.right + coinRadius * 4 + COIN_SPACING * 3,
      centerY: secondCoinRowCenterY
    }));
    this.addChild(new FaceNode(ICON_SIZE.width * 0.35, {
      centerX: ICON_SIZE.width * 0.6,
      centerY: ICON_SIZE.height * 0.67
    }));
  }
}
expressionExchange.register('EEGameIconNode', EEGameIconNode);
export default EEGameIconNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTY3JlZW4iLCJGYWNlTm9kZSIsIk1hdGhTeW1ib2xzIiwiUGhldEZvbnQiLCJIQm94IiwiSFN0cnV0IiwiUmVjdGFuZ2xlIiwiVGV4dCIsIkVFU2hhcmVkQ29uc3RhbnRzIiwiQ29pblRlcm1UeXBlSUQiLCJDb2luTm9kZUZhY3RvcnkiLCJleHByZXNzaW9uRXhjaGFuZ2UiLCJCQUNLR1JPVU5EX0NPTE9SIiwiR0FNRV9TQ1JFRU5fQkFDS0dST1VORF9DT0xPUiIsIklDT05fU0laRSIsIk1JTklNVU1fSE9NRV9TQ1JFRU5fSUNPTl9TSVpFIiwiQ09JTl9TUEFDSU5HIiwid2lkdGgiLCJURVhUX0ZPTlQiLCJQTFVTX1NJR05fWF9NQVJHSU4iLCJFRUdhbWVJY29uTm9kZSIsImNvbnN0cnVjdG9yIiwiaGVpZ2h0IiwiZmlsbCIsImNhcmRCYWNrZ3JvdW5kIiwieCIsInkiLCJzdHJva2UiLCJsaW5lV2lkdGgiLCJjb3JuZXJSYWRpdXMiLCJhZGRDaGlsZCIsImNvaW5SYWRpdXMiLCJjb2luRXF1YXRpb24iLCJjaGlsZHJlbiIsImZvbnQiLCJjcmVhdGVJY29uTm9kZSIsIlgiLCJQTFVTIiwiWSIsImNlbnRlclgiLCJjZW50ZXJZIiwidG9wQ29pblJvd0NlbnRlclkiLCJ0b3AiLCJzZWNvbmRDb2luUm93Q2VudGVyWSIsImxlZnQiLCJyaWdodCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiRUVHYW1lSWNvbk5vZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTYtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogaWNvbiBub2RlIGZvciAnR2FtZScgc2NyZWVuXHJcbiAqXHJcbiAqIEBhdXRob3IgSm9obiBCbGFuY29cclxuICovXHJcblxyXG5pbXBvcnQgU2NyZWVuIGZyb20gJy4uLy4uLy4uLy4uL2pvaXN0L2pzL1NjcmVlbi5qcyc7XHJcbmltcG9ydCBGYWNlTm9kZSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMvRmFjZU5vZGUuanMnO1xyXG5pbXBvcnQgTWF0aFN5bWJvbHMgZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL01hdGhTeW1ib2xzLmpzJztcclxuaW1wb3J0IFBoZXRGb250IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnktcGhldC9qcy9QaGV0Rm9udC5qcyc7XHJcbmltcG9ydCB7IEhCb3gsIEhTdHJ1dCwgUmVjdGFuZ2xlLCBUZXh0IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IEVFU2hhcmVkQ29uc3RhbnRzIGZyb20gJy4uLy4uL2NvbW1vbi9FRVNoYXJlZENvbnN0YW50cy5qcyc7XHJcbmltcG9ydCBDb2luVGVybVR5cGVJRCBmcm9tICcuLi8uLi9jb21tb24vZW51bS9Db2luVGVybVR5cGVJRC5qcyc7XHJcbmltcG9ydCBDb2luTm9kZUZhY3RvcnkgZnJvbSAnLi4vLi4vY29tbW9uL3ZpZXcvQ29pbk5vZGVGYWN0b3J5LmpzJztcclxuaW1wb3J0IGV4cHJlc3Npb25FeGNoYW5nZSBmcm9tICcuLi8uLi9leHByZXNzaW9uRXhjaGFuZ2UuanMnO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IEJBQ0tHUk9VTkRfQ09MT1IgPSBFRVNoYXJlZENvbnN0YW50cy5HQU1FX1NDUkVFTl9CQUNLR1JPVU5EX0NPTE9SO1xyXG5jb25zdCBJQ09OX1NJWkUgPSBTY3JlZW4uTUlOSU1VTV9IT01FX1NDUkVFTl9JQ09OX1NJWkU7XHJcbmNvbnN0IENPSU5fU1BBQ0lORyA9IElDT05fU0laRS53aWR0aCAqIDAuMDI7IC8vIGVtcGlyaWNhbGx5IGRldGVybWluZWRcclxuY29uc3QgVEVYVF9GT05UID0gbmV3IFBoZXRGb250KCA1MCApO1xyXG5jb25zdCBQTFVTX1NJR05fWF9NQVJHSU4gPSAxMDtcclxuXHJcbmNsYXNzIEVFR2FtZUljb25Ob2RlIGV4dGVuZHMgUmVjdGFuZ2xlIHtcclxuXHJcbiAgLyoqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgLy8gY3JlYXRlIHRoZSBiYWNrZ3JvdW5kXHJcbiAgICBzdXBlciggMCwgMCwgSUNPTl9TSVpFLndpZHRoLCBJQ09OX1NJWkUuaGVpZ2h0LCB7IGZpbGw6IEJBQ0tHUk9VTkRfQ09MT1IgfSApO1xyXG5cclxuICAgIC8vIGNyZWF0ZWQgYSByb3VuZGVkIHJlY3RhbmdsZSB0aGF0IGxvb2tzIGxpa2UgYSBjYXJkXHJcbiAgICBjb25zdCBjYXJkQmFja2dyb3VuZCA9IG5ldyBSZWN0YW5nbGUoIDAsIDAsIElDT05fU0laRS53aWR0aCAvIDIsIElDT05fU0laRS5oZWlnaHQgLyAyLCB7XHJcbiAgICAgIHg6IElDT05fU0laRS53aWR0aCAqIDAuMSxcclxuICAgICAgeTogSUNPTl9TSVpFLmhlaWdodCAqIDAuMSxcclxuICAgICAgZmlsbDogJ3doaXRlJyxcclxuICAgICAgc3Ryb2tlOiAnYmxhY2snLFxyXG4gICAgICBsaW5lV2lkdGg6IDIsXHJcbiAgICAgIGNvcm5lclJhZGl1czogMjBcclxuICAgIH0gKTtcclxuXHJcbiAgICB0aGlzLmFkZENoaWxkKCBjYXJkQmFja2dyb3VuZCApO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBhIFwiY29pbiBlcXVhdGlvblwiIHRoYXQgaW5jbHVkZXMgY29pbnMgYW5kIG51bWJlcnNcclxuICAgIGNvbnN0IGNvaW5SYWRpdXMgPSBJQ09OX1NJWkUud2lkdGggKiAwLjA0OyAvLyBlbXBpcmljYWxseSBkZXRlcm1pbmVkXHJcbiAgICBjb25zdCBjb2luRXF1YXRpb24gPSBuZXcgSEJveCgge1xyXG4gICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgIG5ldyBUZXh0KCAnMicsIHsgZm9udDogVEVYVF9GT05UIH0gKSxcclxuICAgICAgICBDb2luTm9kZUZhY3RvcnkuY3JlYXRlSWNvbk5vZGUoIENvaW5UZXJtVHlwZUlELlgsIGNvaW5SYWRpdXMgKSxcclxuICAgICAgICBuZXcgSFN0cnV0KCBQTFVTX1NJR05fWF9NQVJHSU4gKSxcclxuICAgICAgICBuZXcgVGV4dCggTWF0aFN5bWJvbHMuUExVUywgeyBmb250OiBURVhUX0ZPTlQgfSApLFxyXG4gICAgICAgIG5ldyBIU3RydXQoIFBMVVNfU0lHTl9YX01BUkdJTiApLFxyXG4gICAgICAgIG5ldyBUZXh0KCAnMycsIHsgZm9udDogVEVYVF9GT05UIH0gKSxcclxuICAgICAgICBDb2luTm9kZUZhY3RvcnkuY3JlYXRlSWNvbk5vZGUoIENvaW5UZXJtVHlwZUlELlksIGNvaW5SYWRpdXMgKVxyXG4gICAgICBdXHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gYWRkIHRoZSBjb2luIGVxdWF0aW9uIHRvIHRoZSBjYXJkXHJcbiAgICBjb2luRXF1YXRpb24uY2VudGVyWCA9IGNhcmRCYWNrZ3JvdW5kLndpZHRoIC8gMjtcclxuICAgIGNvaW5FcXVhdGlvbi5jZW50ZXJZID0gY2FyZEJhY2tncm91bmQuaGVpZ2h0IC8gMjtcclxuICAgIGNhcmRCYWNrZ3JvdW5kLmFkZENoaWxkKCBjb2luRXF1YXRpb24gKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgYW5kIGFkZCBjb2lucyBuZXh0IHRvIHRoZSBjYXJkXHJcbiAgICBjb25zdCB0b3BDb2luUm93Q2VudGVyWSA9IGNhcmRCYWNrZ3JvdW5kLnRvcCArIGNhcmRCYWNrZ3JvdW5kLmhlaWdodCAqIDAuMztcclxuICAgIGNvbnN0IHNlY29uZENvaW5Sb3dDZW50ZXJZID0gY2FyZEJhY2tncm91bmQudG9wICsgY2FyZEJhY2tncm91bmQuaGVpZ2h0ICogMC43O1xyXG4gICAgdGhpcy5hZGRDaGlsZCggQ29pbk5vZGVGYWN0b3J5LmNyZWF0ZUljb25Ob2RlKCBDb2luVGVybVR5cGVJRC5YLCBjb2luUmFkaXVzLCB7XHJcbiAgICAgIGxlZnQ6IGNhcmRCYWNrZ3JvdW5kLnJpZ2h0ICsgQ09JTl9TUEFDSU5HLFxyXG4gICAgICBjZW50ZXJZOiB0b3BDb2luUm93Q2VudGVyWVxyXG4gICAgfSApICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCBDb2luTm9kZUZhY3RvcnkuY3JlYXRlSWNvbk5vZGUoIENvaW5UZXJtVHlwZUlELlgsIGNvaW5SYWRpdXMsIHtcclxuICAgICAgbGVmdDogY2FyZEJhY2tncm91bmQucmlnaHQgKyBjb2luUmFkaXVzICogMiArIENPSU5fU1BBQ0lORyAqIDIsXHJcbiAgICAgIGNlbnRlclk6IHRvcENvaW5Sb3dDZW50ZXJZXHJcbiAgICB9ICkgKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIENvaW5Ob2RlRmFjdG9yeS5jcmVhdGVJY29uTm9kZSggQ29pblRlcm1UeXBlSUQuWSwgY29pblJhZGl1cywge1xyXG4gICAgICBsZWZ0OiBjYXJkQmFja2dyb3VuZC5yaWdodCArIENPSU5fU1BBQ0lORyxcclxuICAgICAgY2VudGVyWTogc2Vjb25kQ29pblJvd0NlbnRlcllcclxuICAgIH0gKSApO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggQ29pbk5vZGVGYWN0b3J5LmNyZWF0ZUljb25Ob2RlKCBDb2luVGVybVR5cGVJRC5ZLCBjb2luUmFkaXVzLCB7XHJcbiAgICAgIGxlZnQ6IGNhcmRCYWNrZ3JvdW5kLnJpZ2h0ICsgY29pblJhZGl1cyAqIDIgKyBDT0lOX1NQQUNJTkcgKiAyLFxyXG4gICAgICBjZW50ZXJZOiBzZWNvbmRDb2luUm93Q2VudGVyWVxyXG4gICAgfSApICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCBDb2luTm9kZUZhY3RvcnkuY3JlYXRlSWNvbk5vZGUoIENvaW5UZXJtVHlwZUlELlksIGNvaW5SYWRpdXMsIHtcclxuICAgICAgbGVmdDogY2FyZEJhY2tncm91bmQucmlnaHQgKyBjb2luUmFkaXVzICogNCArIENPSU5fU1BBQ0lORyAqIDMsXHJcbiAgICAgIGNlbnRlclk6IHNlY29uZENvaW5Sb3dDZW50ZXJZXHJcbiAgICB9ICkgKTtcclxuXHJcbiAgICB0aGlzLmFkZENoaWxkKCBuZXcgRmFjZU5vZGUoIElDT05fU0laRS53aWR0aCAqIDAuMzUsIHtcclxuICAgICAgY2VudGVyWDogSUNPTl9TSVpFLndpZHRoICogMC42LFxyXG4gICAgICBjZW50ZXJZOiBJQ09OX1NJWkUuaGVpZ2h0ICogMC42N1xyXG4gICAgfSApICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHByZXNzaW9uRXhjaGFuZ2UucmVnaXN0ZXIoICdFRUdhbWVJY29uTm9kZScsIEVFR2FtZUljb25Ob2RlICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFRUdhbWVJY29uTm9kZTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsTUFBTSxNQUFNLGdDQUFnQztBQUNuRCxPQUFPQyxRQUFRLE1BQU0seUNBQXlDO0FBQzlELE9BQU9DLFdBQVcsTUFBTSw0Q0FBNEM7QUFDcEUsT0FBT0MsUUFBUSxNQUFNLHlDQUF5QztBQUM5RCxTQUFTQyxJQUFJLEVBQUVDLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxJQUFJLFFBQVEsbUNBQW1DO0FBQ2pGLE9BQU9DLGlCQUFpQixNQUFNLG1DQUFtQztBQUNqRSxPQUFPQyxjQUFjLE1BQU0scUNBQXFDO0FBQ2hFLE9BQU9DLGVBQWUsTUFBTSxzQ0FBc0M7QUFDbEUsT0FBT0Msa0JBQWtCLE1BQU0sNkJBQTZCOztBQUU1RDtBQUNBLE1BQU1DLGdCQUFnQixHQUFHSixpQkFBaUIsQ0FBQ0ssNEJBQTRCO0FBQ3ZFLE1BQU1DLFNBQVMsR0FBR2QsTUFBTSxDQUFDZSw2QkFBNkI7QUFDdEQsTUFBTUMsWUFBWSxHQUFHRixTQUFTLENBQUNHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztBQUM3QyxNQUFNQyxTQUFTLEdBQUcsSUFBSWYsUUFBUSxDQUFFLEVBQUcsQ0FBQztBQUNwQyxNQUFNZ0Isa0JBQWtCLEdBQUcsRUFBRTtBQUU3QixNQUFNQyxjQUFjLFNBQVNkLFNBQVMsQ0FBQztFQUVyQztBQUNGO0VBQ0VlLFdBQVdBLENBQUEsRUFBRztJQUVaO0lBQ0EsS0FBSyxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUVQLFNBQVMsQ0FBQ0csS0FBSyxFQUFF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