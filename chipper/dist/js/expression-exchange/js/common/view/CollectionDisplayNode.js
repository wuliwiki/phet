// Copyright 2016-2021, University of Colorado Boulder

/**
 * a node that monitors the coin terms in the model and displays a summary of what has been created (a.k.a. "collected")
 * by the user
 */

import merge from '../../../../phet-core/js/merge.js';
import { Node } from '../../../../scenery/js/imports.js';
import expressionExchange from '../../expressionExchange.js';
import CoinTermIconNode from './CoinTermIconNode.js';

// constants
const DEFAULT_WIDTH = 200; // empirically determined
const MAX_COIN_TERMS_PER_ROW = 4;
const MAX_COINS_TERMS_PER_TYPE = 8;
const COIN_CENTER_INSET = 12; // empirically determined
const SAME_TYPE_VERTICAL_SPACING = 2;
const DIFFERENT_TYPE_VERTICAL_SPACING = 8;
class CollectionDisplayNode extends Node {
  /**
   * @param {ExpressionManipulationModel} model
   * @param {Array.<CoinTermTypeID>} displayList - a list of the coin terms types to display in the desired order
   * @param {Object} [options]
   */
  constructor(model, displayList, options) {
    options = merge({
      // width of the panel, adjustable to accommodate different sites of coin terms whose individual widths can vary
      width: DEFAULT_WIDTH,
      // flag that controls whether negative coin terms should be shown on the panel
      showNegatives: false
    }, options);
    super();

    // number of sections in which the icons will appear
    const numberOfDisplaySections = options.showNegatives ? displayList.length * 2 : displayList.length;

    // variables used in the loop that creates the icons shown in the display
    let bottomOfPreviousRow;
    let coinTermTypeID = null;

    // add icon display sections in the order in which they are listed
    _.times(numberOfDisplaySections, displaySectionIndex => {
      if (options.showNegatives) {
        coinTermTypeID = displayList[Math.floor(displaySectionIndex / 2)];
      } else {
        coinTermTypeID = displayList[displaySectionIndex];
      }

      // create a single instance of the icon
      const coinTermIcon = new CoinTermIconNode(model.coinTermFactory.createCoinTerm(coinTermTypeID, {
        // set initial count to +1 or -1 based on whether this icon is meant to display positive or negative values
        initialCount: options.showNegatives && displaySectionIndex % 2 === 1 ? -1 : 1
      }), model.viewModeProperty, model.showCoinValuesProperty, model.showVariableValuesProperty);
      if (!bottomOfPreviousRow) {
        bottomOfPreviousRow = COIN_CENTER_INSET - coinTermIcon.height / 2;
      }

      // calculate the values used to position the coin term nodes
      const interCoinTermHorizontalSpacing = (options.width - 2 * COIN_CENTER_INSET) / (MAX_COIN_TERMS_PER_ROW - 1);

      // wrap the icon in separate nodes so that it can appear in multiple places, and set the position of each
      const wrappedIconNodes = [];
      for (let j = 0; j < MAX_COINS_TERMS_PER_TYPE / MAX_COIN_TERMS_PER_ROW; j++) {
        let wrappedIconNode = null;
        for (let k = 0; k < MAX_COIN_TERMS_PER_ROW; k++) {
          wrappedIconNode = new Node({
            children: [coinTermIcon],
            centerX: COIN_CENTER_INSET + k * interCoinTermHorizontalSpacing,
            top: j === 0 ? bottomOfPreviousRow + DIFFERENT_TYPE_VERTICAL_SPACING : bottomOfPreviousRow + SAME_TYPE_VERTICAL_SPACING
          });
          this.addChild(wrappedIconNode);
          wrappedIconNodes.push(wrappedIconNode);
        }
        bottomOfPreviousRow = wrappedIconNode.bottom;
      }

      // Get a property from the model that tracks the number of this type of coin term and use it to update the
      // visibility of the icons in the display section.
      model.getCoinTermCountProperty(coinTermTypeID, options.showNegatives && displaySectionIndex % 2 === 1 ? -1 : 1, true).link(count => {
        wrappedIconNodes.forEach((wrappedIconNode, index) => {
          wrappedIconNode.visible = index < count;
        });
      });
    });
  }
}
expressionExchange.register('CollectionDisplayNode', CollectionDisplayNode);
export default CollectionDisplayNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtZXJnZSIsIk5vZGUiLCJleHByZXNzaW9uRXhjaGFuZ2UiLCJDb2luVGVybUljb25Ob2RlIiwiREVGQVVMVF9XSURUSCIsIk1BWF9DT0lOX1RFUk1TX1BFUl9ST1ciLCJNQVhfQ09JTlNfVEVSTVNfUEVSX1RZUEUiLCJDT0lOX0NFTlRFUl9JTlNFVCIsIlNBTUVfVFlQRV9WRVJUSUNBTF9TUEFDSU5HIiwiRElGRkVSRU5UX1RZUEVfVkVSVElDQUxfU1BBQ0lORyIsIkNvbGxlY3Rpb25EaXNwbGF5Tm9kZSIsImNvbnN0cnVjdG9yIiwibW9kZWwiLCJkaXNwbGF5TGlzdCIsIm9wdGlvbnMiLCJ3aWR0aCIsInNob3dOZWdhdGl2ZXMiLCJudW1iZXJPZkRpc3BsYXlTZWN0aW9ucyIsImxlbmd0aCIsImJvdHRvbU9mUHJldmlvdXNSb3ciLCJjb2luVGVybVR5cGVJRCIsIl8iLCJ0aW1lcyIsImRpc3BsYXlTZWN0aW9uSW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJjb2luVGVybUljb24iLCJjb2luVGVybUZhY3RvcnkiLCJjcmVhdGVDb2luVGVybSIsImluaXRpYWxDb3VudCIsInZpZXdNb2RlUHJvcGVydHkiLCJzaG93Q29pblZhbHVlc1Byb3BlcnR5Iiwic2hvd1ZhcmlhYmxlVmFsdWVzUHJvcGVydHkiLCJoZWlnaHQiLCJpbnRlckNvaW5UZXJtSG9yaXpvbnRhbFNwYWNpbmciLCJ3cmFwcGVkSWNvbk5vZGVzIiwiaiIsIndyYXBwZWRJY29uTm9kZSIsImsiLCJjaGlsZHJlbiIsImNlbnRlclgiLCJ0b3AiLCJhZGRDaGlsZCIsInB1c2giLCJib3R0b20iLCJnZXRDb2luVGVybUNvdW50UHJvcGVydHkiLCJsaW5rIiwiY291bnQiLCJmb3JFYWNoIiwiaW5kZXgiLCJ2aXNpYmxlIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJDb2xsZWN0aW9uRGlzcGxheU5vZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTYtMjAyMSwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogYSBub2RlIHRoYXQgbW9uaXRvcnMgdGhlIGNvaW4gdGVybXMgaW4gdGhlIG1vZGVsIGFuZCBkaXNwbGF5cyBhIHN1bW1hcnkgb2Ygd2hhdCBoYXMgYmVlbiBjcmVhdGVkIChhLmsuYS4gXCJjb2xsZWN0ZWRcIilcclxuICogYnkgdGhlIHVzZXJcclxuICovXHJcblxyXG5pbXBvcnQgbWVyZ2UgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL21lcmdlLmpzJztcclxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBleHByZXNzaW9uRXhjaGFuZ2UgZnJvbSAnLi4vLi4vZXhwcmVzc2lvbkV4Y2hhbmdlLmpzJztcclxuaW1wb3J0IENvaW5UZXJtSWNvbk5vZGUgZnJvbSAnLi9Db2luVGVybUljb25Ob2RlLmpzJztcclxuXHJcbi8vIGNvbnN0YW50c1xyXG5jb25zdCBERUZBVUxUX1dJRFRIID0gMjAwOyAvLyBlbXBpcmljYWxseSBkZXRlcm1pbmVkXHJcbmNvbnN0IE1BWF9DT0lOX1RFUk1TX1BFUl9ST1cgPSA0O1xyXG5jb25zdCBNQVhfQ09JTlNfVEVSTVNfUEVSX1RZUEUgPSA4O1xyXG5jb25zdCBDT0lOX0NFTlRFUl9JTlNFVCA9IDEyOyAvLyBlbXBpcmljYWxseSBkZXRlcm1pbmVkXHJcbmNvbnN0IFNBTUVfVFlQRV9WRVJUSUNBTF9TUEFDSU5HID0gMjtcclxuY29uc3QgRElGRkVSRU5UX1RZUEVfVkVSVElDQUxfU1BBQ0lORyA9IDg7XHJcblxyXG5jbGFzcyBDb2xsZWN0aW9uRGlzcGxheU5vZGUgZXh0ZW5kcyBOb2RlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtFeHByZXNzaW9uTWFuaXB1bGF0aW9uTW9kZWx9IG1vZGVsXHJcbiAgICogQHBhcmFtIHtBcnJheS48Q29pblRlcm1UeXBlSUQ+fSBkaXNwbGF5TGlzdCAtIGEgbGlzdCBvZiB0aGUgY29pbiB0ZXJtcyB0eXBlcyB0byBkaXNwbGF5IGluIHRoZSBkZXNpcmVkIG9yZGVyXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBtb2RlbCwgZGlzcGxheUxpc3QsIG9wdGlvbnMgKSB7XHJcblxyXG4gICAgb3B0aW9ucyA9IG1lcmdlKCB7XHJcblxyXG4gICAgICAvLyB3aWR0aCBvZiB0aGUgcGFuZWwsIGFkanVzdGFibGUgdG8gYWNjb21tb2RhdGUgZGlmZmVyZW50IHNpdGVzIG9mIGNvaW4gdGVybXMgd2hvc2UgaW5kaXZpZHVhbCB3aWR0aHMgY2FuIHZhcnlcclxuICAgICAgd2lkdGg6IERFRkFVTFRfV0lEVEgsXHJcblxyXG4gICAgICAvLyBmbGFnIHRoYXQgY29udHJvbHMgd2hldGhlciBuZWdhdGl2ZSBjb2luIHRlcm1zIHNob3VsZCBiZSBzaG93biBvbiB0aGUgcGFuZWxcclxuICAgICAgc2hvd05lZ2F0aXZlczogZmFsc2VcclxuICAgIH0sIG9wdGlvbnMgKTtcclxuXHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIC8vIG51bWJlciBvZiBzZWN0aW9ucyBpbiB3aGljaCB0aGUgaWNvbnMgd2lsbCBhcHBlYXJcclxuICAgIGNvbnN0IG51bWJlck9mRGlzcGxheVNlY3Rpb25zID0gb3B0aW9ucy5zaG93TmVnYXRpdmVzID8gZGlzcGxheUxpc3QubGVuZ3RoICogMiA6IGRpc3BsYXlMaXN0Lmxlbmd0aDtcclxuXHJcbiAgICAvLyB2YXJpYWJsZXMgdXNlZCBpbiB0aGUgbG9vcCB0aGF0IGNyZWF0ZXMgdGhlIGljb25zIHNob3duIGluIHRoZSBkaXNwbGF5XHJcbiAgICBsZXQgYm90dG9tT2ZQcmV2aW91c1JvdztcclxuICAgIGxldCBjb2luVGVybVR5cGVJRCA9IG51bGw7XHJcblxyXG4gICAgLy8gYWRkIGljb24gZGlzcGxheSBzZWN0aW9ucyBpbiB0aGUgb3JkZXIgaW4gd2hpY2ggdGhleSBhcmUgbGlzdGVkXHJcbiAgICBfLnRpbWVzKCBudW1iZXJPZkRpc3BsYXlTZWN0aW9ucywgZGlzcGxheVNlY3Rpb25JbmRleCA9PiB7XHJcblxyXG4gICAgICBpZiAoIG9wdGlvbnMuc2hvd05lZ2F0aXZlcyApIHtcclxuICAgICAgICBjb2luVGVybVR5cGVJRCA9IGRpc3BsYXlMaXN0WyBNYXRoLmZsb29yKCBkaXNwbGF5U2VjdGlvbkluZGV4IC8gMiApIF07XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgY29pblRlcm1UeXBlSUQgPSBkaXNwbGF5TGlzdFsgZGlzcGxheVNlY3Rpb25JbmRleCBdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjcmVhdGUgYSBzaW5nbGUgaW5zdGFuY2Ugb2YgdGhlIGljb25cclxuICAgICAgY29uc3QgY29pblRlcm1JY29uID0gbmV3IENvaW5UZXJtSWNvbk5vZGUoXHJcbiAgICAgICAgbW9kZWwuY29pblRlcm1GYWN0b3J5LmNyZWF0ZUNvaW5UZXJtKCBjb2luVGVybVR5cGVJRCwge1xyXG4gICAgICAgICAgLy8gc2V0IGluaXRpYWwgY291bnQgdG8gKzEgb3IgLTEgYmFzZWQgb24gd2hldGhlciB0aGlzIGljb24gaXMgbWVhbnQgdG8gZGlzcGxheSBwb3NpdGl2ZSBvciBuZWdhdGl2ZSB2YWx1ZXNcclxuICAgICAgICAgIGluaXRpYWxDb3VudDogb3B0aW9ucy5zaG93TmVnYXRpdmVzICYmIGRpc3BsYXlTZWN0aW9uSW5kZXggJSAyID09PSAxID8gLTEgOiAxXHJcbiAgICAgICAgfSApLFxyXG4gICAgICAgIG1vZGVsLnZpZXdNb2RlUHJvcGVydHksXHJcbiAgICAgICAgbW9kZWwuc2hvd0NvaW5WYWx1ZXNQcm9wZXJ0eSxcclxuICAgICAgICBtb2RlbC5zaG93VmFyaWFibGVWYWx1ZXNQcm9wZXJ0eVxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKCAhYm90dG9tT2ZQcmV2aW91c1JvdyApIHtcclxuICAgICAgICBib3R0b21PZlByZXZpb3VzUm93ID0gQ09JTl9DRU5URVJfSU5TRVQgLSBjb2luVGVybUljb24uaGVpZ2h0IC8gMjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY2FsY3VsYXRlIHRoZSB2YWx1ZXMgdXNlZCB0byBwb3NpdGlvbiB0aGUgY29pbiB0ZXJtIG5vZGVzXHJcbiAgICAgIGNvbnN0IGludGVyQ29pblRlcm1Ib3Jpem9udGFsU3BhY2luZyA9ICggb3B0aW9ucy53aWR0aCAtICggMiAqIENPSU5fQ0VOVEVSX0lOU0VUICkgKSAvICggTUFYX0NPSU5fVEVSTVNfUEVSX1JPVyAtIDEgKTtcclxuXHJcbiAgICAgIC8vIHdyYXAgdGhlIGljb24gaW4gc2VwYXJhdGUgbm9kZXMgc28gdGhhdCBpdCBjYW4gYXBwZWFyIGluIG11bHRpcGxlIHBsYWNlcywgYW5kIHNldCB0aGUgcG9zaXRpb24gb2YgZWFjaFxyXG4gICAgICBjb25zdCB3cmFwcGVkSWNvbk5vZGVzID0gW107XHJcbiAgICAgIGZvciAoIGxldCBqID0gMDsgaiA8IE1BWF9DT0lOU19URVJNU19QRVJfVFlQRSAvIE1BWF9DT0lOX1RFUk1TX1BFUl9ST1c7IGorKyApIHtcclxuICAgICAgICBsZXQgd3JhcHBlZEljb25Ob2RlID0gbnVsbDtcclxuICAgICAgICBmb3IgKCBsZXQgayA9IDA7IGsgPCBNQVhfQ09JTl9URVJNU19QRVJfUk9XOyBrKysgKSB7XHJcbiAgICAgICAgICB3cmFwcGVkSWNvbk5vZGUgPSBuZXcgTm9kZSgge1xyXG4gICAgICAgICAgICBjaGlsZHJlbjogWyBjb2luVGVybUljb24gXSxcclxuICAgICAgICAgICAgY2VudGVyWDogQ09JTl9DRU5URVJfSU5TRVQgKyBrICogaW50ZXJDb2luVGVybUhvcml6b250YWxTcGFjaW5nLFxyXG4gICAgICAgICAgICB0b3A6IGogPT09IDAgPyBib3R0b21PZlByZXZpb3VzUm93ICsgRElGRkVSRU5UX1RZUEVfVkVSVElDQUxfU1BBQ0lORyA6IGJvdHRvbU9mUHJldmlvdXNSb3cgKyBTQU1FX1RZUEVfVkVSVElDQUxfU1BBQ0lOR1xyXG4gICAgICAgICAgfSApO1xyXG4gICAgICAgICAgdGhpcy5hZGRDaGlsZCggd3JhcHBlZEljb25Ob2RlICk7XHJcbiAgICAgICAgICB3cmFwcGVkSWNvbk5vZGVzLnB1c2goIHdyYXBwZWRJY29uTm9kZSApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBib3R0b21PZlByZXZpb3VzUm93ID0gd3JhcHBlZEljb25Ob2RlLmJvdHRvbTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gR2V0IGEgcHJvcGVydHkgZnJvbSB0aGUgbW9kZWwgdGhhdCB0cmFja3MgdGhlIG51bWJlciBvZiB0aGlzIHR5cGUgb2YgY29pbiB0ZXJtIGFuZCB1c2UgaXQgdG8gdXBkYXRlIHRoZVxyXG4gICAgICAvLyB2aXNpYmlsaXR5IG9mIHRoZSBpY29ucyBpbiB0aGUgZGlzcGxheSBzZWN0aW9uLlxyXG4gICAgICBtb2RlbC5nZXRDb2luVGVybUNvdW50UHJvcGVydHkoXHJcbiAgICAgICAgY29pblRlcm1UeXBlSUQsXHJcbiAgICAgICAgb3B0aW9ucy5zaG93TmVnYXRpdmVzICYmIGRpc3BsYXlTZWN0aW9uSW5kZXggJSAyID09PSAxID8gLTEgOiAxLFxyXG4gICAgICAgIHRydWVcclxuICAgICAgKS5saW5rKCBjb3VudCA9PiB7XHJcbiAgICAgICAgd3JhcHBlZEljb25Ob2Rlcy5mb3JFYWNoKCAoIHdyYXBwZWRJY29uTm9kZSwgaW5kZXggKSA9PiB7XHJcbiAgICAgICAgICB3cmFwcGVkSWNvbk5vZGUudmlzaWJsZSA9IGluZGV4IDwgY291bnQ7XHJcbiAgICAgICAgfSApO1xyXG4gICAgICB9ICk7XHJcbiAgICB9ICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHByZXNzaW9uRXhjaGFuZ2UucmVnaXN0ZXIoICdDb2xsZWN0aW9uRGlzcGxheU5vZGUnLCBDb2xsZWN0aW9uRGlzcGxheU5vZGUgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbGxlY3Rpb25EaXNwbGF5Tm9kZTsiXSwibWFwcGluZ3MiOiJB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