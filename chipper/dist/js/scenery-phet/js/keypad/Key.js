// Copyright 2022-2023, University of Colorado Boulder

/**
 * key object, intended for use in the PhET common-code keypad
 *
 * @author Aadish Gupta
 * @author John Blanco
 */

import optionize from '../../../phet-core/js/optionize.js';
import sceneryPhet from '../sceneryPhet.js';
class Key {
  // number of horizontal cells in the keypad grid that this key occupies

  // number of vertical cells in the keypad grid that this key occupies

  // The tandem component name to use when creating a button from this key.

  // For keyboard input, this is used to identify the keystroke to activate this key (see KeyboardListener.ts)

  /**
   * @param label - node or string that will appear on the key
   * @param identifier - ID for this key, see KeyID.js
   * @param [providedOptions]
   */
  constructor(label, identifier, providedOptions) {
    this.label = label;
    this.identifier = identifier;
    const options = optionize()({
      horizontalSpan: 1,
      verticalSpan: 1,
      keyboardIdentifiers: []
    }, providedOptions);
    this.horizontalSpan = options.horizontalSpan;
    this.verticalSpan = options.verticalSpan;
    this.keyboardIdentifiers = options.keyboardIdentifiers;
    this.buttonTandemName = `${_.camelCase(this.identifier)}Button`;
  }
}
sceneryPhet.register('Key', Key);
export default Key;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25pemUiLCJzY2VuZXJ5UGhldCIsIktleSIsImNvbnN0cnVjdG9yIiwibGFiZWwiLCJpZGVudGlmaWVyIiwicHJvdmlkZWRPcHRpb25zIiwib3B0aW9ucyIsImhvcml6b250YWxTcGFuIiwidmVydGljYWxTcGFuIiwia2V5Ym9hcmRJZGVudGlmaWVycyIsImJ1dHRvblRhbmRlbU5hbWUiLCJfIiwiY2FtZWxDYXNlIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJLZXkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjItMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICoga2V5IG9iamVjdCwgaW50ZW5kZWQgZm9yIHVzZSBpbiB0aGUgUGhFVCBjb21tb24tY29kZSBrZXlwYWRcclxuICpcclxuICogQGF1dGhvciBBYWRpc2ggR3VwdGFcclxuICogQGF1dGhvciBKb2huIEJsYW5jb1xyXG4gKi9cclxuXHJcbmltcG9ydCBvcHRpb25pemUgZnJvbSAnLi4vLi4vLi4vcGhldC1jb3JlL2pzL29wdGlvbml6ZS5qcyc7XHJcbmltcG9ydCB7IE5vZGUsIE9uZUtleVN0cm9rZSB9IGZyb20gJy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBzY2VuZXJ5UGhldCBmcm9tICcuLi9zY2VuZXJ5UGhldC5qcyc7XHJcbmltcG9ydCB7IEtleUlEVmFsdWUgfSBmcm9tICcuL0tleUlELmpzJztcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSB7XHJcbiAgaG9yaXpvbnRhbFNwYW4/OiBudW1iZXI7XHJcbiAgdmVydGljYWxTcGFuPzogbnVtYmVyO1xyXG4gIGtleWJvYXJkSWRlbnRpZmllcnM/OiBPbmVLZXlTdHJva2VbIF07XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBLZXlPcHRpb25zID0gU2VsZk9wdGlvbnM7XHJcblxyXG5jbGFzcyBLZXkge1xyXG5cclxuICAvLyBudW1iZXIgb2YgaG9yaXpvbnRhbCBjZWxscyBpbiB0aGUga2V5cGFkIGdyaWQgdGhhdCB0aGlzIGtleSBvY2N1cGllc1xyXG4gIHB1YmxpYyByZWFkb25seSBob3Jpem9udGFsU3BhbjogbnVtYmVyO1xyXG5cclxuICAvLyBudW1iZXIgb2YgdmVydGljYWwgY2VsbHMgaW4gdGhlIGtleXBhZCBncmlkIHRoYXQgdGhpcyBrZXkgb2NjdXBpZXNcclxuICBwdWJsaWMgcmVhZG9ubHkgdmVydGljYWxTcGFuOiBudW1iZXI7XHJcblxyXG4gIC8vIFRoZSB0YW5kZW0gY29tcG9uZW50IG5hbWUgdG8gdXNlIHdoZW4gY3JlYXRpbmcgYSBidXR0b24gZnJvbSB0aGlzIGtleS5cclxuICBwdWJsaWMgcmVhZG9ubHkgYnV0dG9uVGFuZGVtTmFtZTogc3RyaW5nO1xyXG5cclxuICAvLyBGb3Iga2V5Ym9hcmQgaW5wdXQsIHRoaXMgaXMgdXNlZCB0byBpZGVudGlmeSB0aGUga2V5c3Ryb2tlIHRvIGFjdGl2YXRlIHRoaXMga2V5IChzZWUgS2V5Ym9hcmRMaXN0ZW5lci50cylcclxuICBwdWJsaWMgcmVhZG9ubHkga2V5Ym9hcmRJZGVudGlmaWVyczogT25lS2V5U3Ryb2tlW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBsYWJlbCAtIG5vZGUgb3Igc3RyaW5nIHRoYXQgd2lsbCBhcHBlYXIgb24gdGhlIGtleVxyXG4gICAqIEBwYXJhbSBpZGVudGlmaWVyIC0gSUQgZm9yIHRoaXMga2V5LCBzZWUgS2V5SUQuanNcclxuICAgKiBAcGFyYW0gW3Byb3ZpZGVkT3B0aW9uc11cclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbGFiZWw6IE5vZGUgfCBzdHJpbmcsXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgaWRlbnRpZmllcjogS2V5SURWYWx1ZSxcclxuICAgIHByb3ZpZGVkT3B0aW9ucz86IEtleU9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxLZXlPcHRpb25zLCBTZWxmT3B0aW9ucz4oKSgge1xyXG4gICAgICBob3Jpem9udGFsU3BhbjogMSxcclxuICAgICAgdmVydGljYWxTcGFuOiAxLFxyXG4gICAgICBrZXlib2FyZElkZW50aWZpZXJzOiBbXVxyXG4gICAgfSwgcHJvdmlkZWRPcHRpb25zICk7XHJcblxyXG4gICAgdGhpcy5ob3Jpem9udGFsU3BhbiA9IG9wdGlvbnMuaG9yaXpvbnRhbFNwYW47XHJcbiAgICB0aGlzLnZlcnRpY2FsU3BhbiA9IG9wdGlvbnMudmVydGljYWxTcGFuO1xyXG4gICAgdGhpcy5rZXlib2FyZElkZW50aWZpZXJzID0gb3B0aW9ucy5rZXlib2FyZElkZW50aWZpZXJzO1xyXG5cclxuICAgIHRoaXMuYnV0dG9uVGFuZGVtTmFtZSA9IGAke18uY2FtZWxDYXNlKCB0aGlzLmlkZW50aWZpZXIgKX1CdXR0b25gO1xyXG4gIH1cclxufVxyXG5cclxuc2NlbmVyeVBoZXQucmVnaXN0ZXIoICdLZXknLCBLZXkgKTtcclxuZXhwb3J0IGRlZmF1bHQgS2V5OyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFNBQVMsTUFBTSxvQ0FBb0M7QUFFMUQsT0FBT0MsV0FBVyxNQUFNLG1CQUFtQjtBQVczQyxNQUFNQyxHQUFHLENBQUM7RUFFUjs7RUFHQTs7RUFHQTs7RUFHQTs7RUFHQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBQ1NDLFdBQVdBLENBQ0FDLEtBQW9CLEVBQ3BCQyxVQUFzQixFQUN0Q0MsZUFBNEIsRUFBRztJQUFBLEtBRmZGLEtBQW9CLEdBQXBCQSxLQUFvQjtJQUFBLEtBQ3BCQyxVQUFzQixHQUF0QkEsVUFBc0I7SUFHdEMsTUFBTUUsT0FBTyxHQUFHUCxTQUFTLENBQTBCLENBQUMsQ0FBRTtNQUNwRFEsY0FBYyxFQUFFLENBQUM7TUFDakJDLFlBQVksRUFBRSxDQUFDO01BQ2ZDLG1CQUFtQixFQUFFO0lBQ3ZCLENBQUMsRUFBRUosZUFBZ0IsQ0FBQztJQUVwQixJQUFJLENBQUNFLGNBQWMsR0FBR0QsT0FBTyxDQUFDQyxjQUFjO0lBQzVDLElBQUksQ0FBQ0MsWUFBWSxHQUFHRixPQUFPLENBQUNFLFlBQVk7SUFDeEMsSUFBSSxDQUFDQyxtQkFBbUIsR0FBR0gsT0FBTyxDQUFDRyxtQkFBbUI7SUFFdEQsSUFBSSxDQUFDQyxnQkFBZ0IsR0FBSSxHQUFFQyxDQUFDLENBQUNDLFNBQVMsQ0FBRSxJQUFJLENBQUNSLFVBQVcsQ0FBRSxRQUFPO0VBQ25FO0FBQ0Y7QUFFQUosV0FBVyxDQUFDYSxRQUFRLENBQUUsS0FBSyxFQUFFWixHQUFJLENBQUM7QUFDbEMsZUFBZUEsR0FBRyJ9