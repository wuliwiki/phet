// Copyright 2013-2021, University of Colorado Boulder

/**
 * Visual representation of a challenge where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab) and has to adjust some or all portions of an
 * interactive chemical symbol to match.
 *
 * @author John Blanco
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import buildAnAtom from '../../buildAnAtom.js';
import ChallengeView from './ChallengeView.js';
import InteractiveSymbolNode from './InteractiveSymbolNode.js';
import NonInteractiveSchematicAtomNode from './NonInteractiveSchematicAtomNode.js';
class SchematicToSymbolChallengeView extends ChallengeView {
  /**
   * @param {BAAGameChallenge} toSymbolChallenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   */
  constructor(toSymbolChallenge, layoutBounds, tandem) {
    super(toSymbolChallenge, layoutBounds, tandem);
    this.interactiveSymbolNode = new InteractiveSymbolNode(toSymbolChallenge.answerAtom, tandem.createTandem('interactiveSymbolNode'), {
      interactiveProtonCount: toSymbolChallenge.configurableProtonCount,
      interactiveMassNumber: toSymbolChallenge.configurableMassNumber,
      interactiveCharge: toSymbolChallenge.configurableCharge
    });

    // Add the interactive symbol.
    this.interactiveSymbolNode.scale(0.75);
    this.interactiveAnswerNode.addChild(this.interactiveSymbolNode);

    // Create the model-view transform used by the schematic atom.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(Vector2.ZERO, new Vector2(layoutBounds.width * 0.275, layoutBounds.height * 0.5), 0.8);

    // Add the schematic representation of the atom.
    const schematicAtomNode = new NonInteractiveSchematicAtomNode(toSymbolChallenge.answerAtom, modelViewTransform, tandem.createTandem('noninteractiveSchematicAtomNode'));
    this.challengePresentationNode.addChild(schematicAtomNode);

    // Layout - bounds of AtomNode is dependent on its stability indicator text, so place relative to left
    schematicAtomNode.left = layoutBounds.width * 0.15;
    schematicAtomNode.centerY = layoutBounds.height * 0.50;
    this.interactiveSymbolNode.centerX = layoutBounds.width * 0.745;
    this.interactiveSymbolNode.centerY = layoutBounds.height * 0.54;

    // @private called by dispose
    this.disposeSchematicToSymbolChallengeView = function () {
      schematicAtomNode.dispose();
      this.interactiveSymbolNode.dispose();
    };
  }

  // @public
  checkAnswer() {
    const userSubmittedAtom = new NumberAtom({
      protonCount: this.interactiveSymbolNode.protonCountProperty.value,
      neutronCount: this.interactiveSymbolNode.massNumberProperty.value - this.interactiveSymbolNode.protonCountProperty.value,
      electronCount: this.interactiveSymbolNode.protonCountProperty.value - this.interactiveSymbolNode.chargeProperty.value
    });
    this.challenge.checkAnswer(userSubmittedAtom);
  }

  // @public
  displayCorrectAnswer() {
    this.interactiveSymbolNode.protonCountProperty.value = this.challenge.answerAtom.protonCountProperty.get();
    this.interactiveSymbolNode.massNumberProperty.value = this.challenge.answerAtom.massNumberProperty.get();
    this.interactiveSymbolNode.chargeProperty.value = this.challenge.answerAtom.chargeProperty.get();
  }

  // @public
  dispose() {
    this.disposeSchematicToSymbolChallengeView();
    super.dispose();
  }
}
buildAnAtom.register('SchematicToSymbolChallengeView', SchematicToSymbolChallengeView);
export default SchematicToSymbolChallengeView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWZWN0b3IyIiwiTW9kZWxWaWV3VHJhbnNmb3JtMiIsIk51bWJlckF0b20iLCJidWlsZEFuQXRvbSIsIkNoYWxsZW5nZVZpZXciLCJJbnRlcmFjdGl2ZVN5bWJvbE5vZGUiLCJOb25JbnRlcmFjdGl2ZVNjaGVtYXRpY0F0b21Ob2RlIiwiU2NoZW1hdGljVG9TeW1ib2xDaGFsbGVuZ2VWaWV3IiwiY29uc3RydWN0b3IiLCJ0b1N5bWJvbENoYWxsZW5nZSIsImxheW91dEJvdW5kcyIsInRhbmRlbSIsImludGVyYWN0aXZlU3ltYm9sTm9kZSIsImFuc3dlckF0b20iLCJjcmVhdGVUYW5kZW0iLCJpbnRlcmFjdGl2ZVByb3RvbkNvdW50IiwiY29uZmlndXJhYmxlUHJvdG9uQ291bnQiLCJpbnRlcmFjdGl2ZU1hc3NOdW1iZXIiLCJjb25maWd1cmFibGVNYXNzTnVtYmVyIiwiaW50ZXJhY3RpdmVDaGFyZ2UiLCJjb25maWd1cmFibGVDaGFyZ2UiLCJzY2FsZSIsImludGVyYWN0aXZlQW5zd2VyTm9kZSIsImFkZENoaWxkIiwibW9kZWxWaWV3VHJhbnNmb3JtIiwiY3JlYXRlU2luZ2xlUG9pbnRTY2FsZUludmVydGVkWU1hcHBpbmciLCJaRVJPIiwid2lkdGgiLCJoZWlnaHQiLCJzY2hlbWF0aWNBdG9tTm9kZSIsImNoYWxsZW5nZVByZXNlbnRhdGlvbk5vZGUiLCJsZWZ0IiwiY2VudGVyWSIsImNlbnRlclgiLCJkaXNwb3NlU2NoZW1hdGljVG9TeW1ib2xDaGFsbGVuZ2VWaWV3IiwiZGlzcG9zZSIsImNoZWNrQW5zd2VyIiwidXNlclN1Ym1pdHRlZEF0b20iLCJwcm90b25Db3VudCIsInByb3RvbkNvdW50UHJvcGVydHkiLCJ2YWx1ZSIsIm5ldXRyb25Db3VudCIsIm1hc3NOdW1iZXJQcm9wZXJ0eSIsImVsZWN0cm9uQ291bnQiLCJjaGFyZ2VQcm9wZXJ0eSIsImNoYWxsZW5nZSIsImRpc3BsYXlDb3JyZWN0QW5zd2VyIiwiZ2V0IiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJTY2hlbWF0aWNUb1N5bWJvbENoYWxsZW5nZVZpZXcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTMtMjAyMSwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogVmlzdWFsIHJlcHJlc2VudGF0aW9uIG9mIGEgY2hhbGxlbmdlIHdoZXJlIHRoZSB1c2VyIGlzIHByZXNlbnRlZCB3aXRoIGFcclxuICogc2NoZW1hdGljIHJlcHJlc2VudGF0aW9uIG9mIGFuIGF0b20gKHdoaWNoIGxvb2tzIG11Y2ggbGlrZSB0aGUgYXRvbXNcclxuICogY29uc3RydWN0ZWQgb24gdGhlIDFzdCB0YWIpIGFuZCBoYXMgdG8gYWRqdXN0IHNvbWUgb3IgYWxsIHBvcnRpb25zIG9mIGFuXHJcbiAqIGludGVyYWN0aXZlIGNoZW1pY2FsIHN5bWJvbCB0byBtYXRjaC5cclxuICpcclxuICogQGF1dGhvciBKb2huIEJsYW5jb1xyXG4gKi9cclxuXHJcbmltcG9ydCBWZWN0b3IyIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9WZWN0b3IyLmpzJztcclxuaW1wb3J0IE1vZGVsVmlld1RyYW5zZm9ybTIgZnJvbSAnLi4vLi4vLi4vLi4vcGhldGNvbW1vbi9qcy92aWV3L01vZGVsVmlld1RyYW5zZm9ybTIuanMnO1xyXG5pbXBvcnQgTnVtYmVyQXRvbSBmcm9tICcuLi8uLi8uLi8uLi9zaHJlZC9qcy9tb2RlbC9OdW1iZXJBdG9tLmpzJztcclxuaW1wb3J0IGJ1aWxkQW5BdG9tIGZyb20gJy4uLy4uL2J1aWxkQW5BdG9tLmpzJztcclxuaW1wb3J0IENoYWxsZW5nZVZpZXcgZnJvbSAnLi9DaGFsbGVuZ2VWaWV3LmpzJztcclxuaW1wb3J0IEludGVyYWN0aXZlU3ltYm9sTm9kZSBmcm9tICcuL0ludGVyYWN0aXZlU3ltYm9sTm9kZS5qcyc7XHJcbmltcG9ydCBOb25JbnRlcmFjdGl2ZVNjaGVtYXRpY0F0b21Ob2RlIGZyb20gJy4vTm9uSW50ZXJhY3RpdmVTY2hlbWF0aWNBdG9tTm9kZS5qcyc7XHJcblxyXG5jbGFzcyBTY2hlbWF0aWNUb1N5bWJvbENoYWxsZW5nZVZpZXcgZXh0ZW5kcyBDaGFsbGVuZ2VWaWV3IHtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtCQUFHYW1lQ2hhbGxlbmdlfSB0b1N5bWJvbENoYWxsZW5nZVxyXG4gICAqIEBwYXJhbSB7Qm91bmRzMn0gbGF5b3V0Qm91bmRzXHJcbiAgICogQHBhcmFtIHtUYW5kZW19IHRhbmRlbVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCB0b1N5bWJvbENoYWxsZW5nZSwgbGF5b3V0Qm91bmRzLCB0YW5kZW0gKSB7XHJcblxyXG4gICAgc3VwZXIoIHRvU3ltYm9sQ2hhbGxlbmdlLCBsYXlvdXRCb3VuZHMsIHRhbmRlbSApO1xyXG5cclxuICAgIHRoaXMuaW50ZXJhY3RpdmVTeW1ib2xOb2RlID0gbmV3IEludGVyYWN0aXZlU3ltYm9sTm9kZShcclxuICAgICAgdG9TeW1ib2xDaGFsbGVuZ2UuYW5zd2VyQXRvbSxcclxuICAgICAgdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ2ludGVyYWN0aXZlU3ltYm9sTm9kZScgKSwge1xyXG4gICAgICAgIGludGVyYWN0aXZlUHJvdG9uQ291bnQ6IHRvU3ltYm9sQ2hhbGxlbmdlLmNvbmZpZ3VyYWJsZVByb3RvbkNvdW50LFxyXG4gICAgICAgIGludGVyYWN0aXZlTWFzc051bWJlcjogdG9TeW1ib2xDaGFsbGVuZ2UuY29uZmlndXJhYmxlTWFzc051bWJlcixcclxuICAgICAgICBpbnRlcmFjdGl2ZUNoYXJnZTogdG9TeW1ib2xDaGFsbGVuZ2UuY29uZmlndXJhYmxlQ2hhcmdlXHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgLy8gQWRkIHRoZSBpbnRlcmFjdGl2ZSBzeW1ib2wuXHJcbiAgICB0aGlzLmludGVyYWN0aXZlU3ltYm9sTm9kZS5zY2FsZSggMC43NSApO1xyXG4gICAgdGhpcy5pbnRlcmFjdGl2ZUFuc3dlck5vZGUuYWRkQ2hpbGQoIHRoaXMuaW50ZXJhY3RpdmVTeW1ib2xOb2RlICk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIHRoZSBtb2RlbC12aWV3IHRyYW5zZm9ybSB1c2VkIGJ5IHRoZSBzY2hlbWF0aWMgYXRvbS5cclxuICAgIGNvbnN0IG1vZGVsVmlld1RyYW5zZm9ybSA9IE1vZGVsVmlld1RyYW5zZm9ybTIuY3JlYXRlU2luZ2xlUG9pbnRTY2FsZUludmVydGVkWU1hcHBpbmcoXHJcbiAgICAgIFZlY3RvcjIuWkVSTyxcclxuICAgICAgbmV3IFZlY3RvcjIoIGxheW91dEJvdW5kcy53aWR0aCAqIDAuMjc1LCBsYXlvdXRCb3VuZHMuaGVpZ2h0ICogMC41ICksXHJcbiAgICAgIDAuOCApO1xyXG5cclxuICAgIC8vIEFkZCB0aGUgc2NoZW1hdGljIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBhdG9tLlxyXG4gICAgY29uc3Qgc2NoZW1hdGljQXRvbU5vZGUgPSBuZXcgTm9uSW50ZXJhY3RpdmVTY2hlbWF0aWNBdG9tTm9kZSggdG9TeW1ib2xDaGFsbGVuZ2UuYW5zd2VyQXRvbSwgbW9kZWxWaWV3VHJhbnNmb3JtLCB0YW5kZW0uY3JlYXRlVGFuZGVtKCAnbm9uaW50ZXJhY3RpdmVTY2hlbWF0aWNBdG9tTm9kZScgKSApO1xyXG4gICAgdGhpcy5jaGFsbGVuZ2VQcmVzZW50YXRpb25Ob2RlLmFkZENoaWxkKCBzY2hlbWF0aWNBdG9tTm9kZSApO1xyXG5cclxuICAgIC8vIExheW91dCAtIGJvdW5kcyBvZiBBdG9tTm9kZSBpcyBkZXBlbmRlbnQgb24gaXRzIHN0YWJpbGl0eSBpbmRpY2F0b3IgdGV4dCwgc28gcGxhY2UgcmVsYXRpdmUgdG8gbGVmdFxyXG4gICAgc2NoZW1hdGljQXRvbU5vZGUubGVmdCA9IGxheW91dEJvdW5kcy53aWR0aCAqIDAuMTU7XHJcbiAgICBzY2hlbWF0aWNBdG9tTm9kZS5jZW50ZXJZID0gbGF5b3V0Qm91bmRzLmhlaWdodCAqIDAuNTA7XHJcbiAgICB0aGlzLmludGVyYWN0aXZlU3ltYm9sTm9kZS5jZW50ZXJYID0gbGF5b3V0Qm91bmRzLndpZHRoICogMC43NDU7XHJcbiAgICB0aGlzLmludGVyYWN0aXZlU3ltYm9sTm9kZS5jZW50ZXJZID0gbGF5b3V0Qm91bmRzLmhlaWdodCAqIDAuNTQ7XHJcblxyXG4gICAgLy8gQHByaXZhdGUgY2FsbGVkIGJ5IGRpc3Bvc2VcclxuICAgIHRoaXMuZGlzcG9zZVNjaGVtYXRpY1RvU3ltYm9sQ2hhbGxlbmdlVmlldyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBzY2hlbWF0aWNBdG9tTm9kZS5kaXNwb3NlKCk7XHJcbiAgICAgIHRoaXMuaW50ZXJhY3RpdmVTeW1ib2xOb2RlLmRpc3Bvc2UoKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBAcHVibGljXHJcbiAgY2hlY2tBbnN3ZXIoKSB7XHJcbiAgICBjb25zdCB1c2VyU3VibWl0dGVkQXRvbSA9IG5ldyBOdW1iZXJBdG9tKCB7XHJcbiAgICAgIHByb3RvbkNvdW50OiB0aGlzLmludGVyYWN0aXZlU3ltYm9sTm9kZS5wcm90b25Db3VudFByb3BlcnR5LnZhbHVlLFxyXG4gICAgICBuZXV0cm9uQ291bnQ6IHRoaXMuaW50ZXJhY3RpdmVTeW1ib2xOb2RlLm1hc3NOdW1iZXJQcm9wZXJ0eS52YWx1ZSAtIHRoaXMuaW50ZXJhY3RpdmVTeW1ib2xOb2RlLnByb3RvbkNvdW50UHJvcGVydHkudmFsdWUsXHJcbiAgICAgIGVsZWN0cm9uQ291bnQ6IHRoaXMuaW50ZXJhY3RpdmVTeW1ib2xOb2RlLnByb3RvbkNvdW50UHJvcGVydHkudmFsdWUgLSB0aGlzLmludGVyYWN0aXZlU3ltYm9sTm9kZS5jaGFyZ2VQcm9wZXJ0eS52YWx1ZVxyXG4gICAgfSApO1xyXG4gICAgdGhpcy5jaGFsbGVuZ2UuY2hlY2tBbnN3ZXIoIHVzZXJTdWJtaXR0ZWRBdG9tICk7XHJcbiAgfVxyXG5cclxuICAvLyBAcHVibGljXHJcbiAgZGlzcGxheUNvcnJlY3RBbnN3ZXIoKSB7XHJcbiAgICB0aGlzLmludGVyYWN0aXZlU3ltYm9sTm9kZS5wcm90b25Db3VudFByb3BlcnR5LnZhbHVlID0gdGhpcy5jaGFsbGVuZ2UuYW5zd2VyQXRvbS5wcm90b25Db3VudFByb3BlcnR5LmdldCgpO1xyXG4gICAgdGhpcy5pbnRlcmFjdGl2ZVN5bWJvbE5vZGUubWFzc051bWJlclByb3BlcnR5LnZhbHVlID0gdGhpcy5jaGFsbGVuZ2UuYW5zd2VyQXRvbS5tYXNzTnVtYmVyUHJvcGVydHkuZ2V0KCk7XHJcbiAgICB0aGlzLmludGVyYWN0aXZlU3ltYm9sTm9kZS5jaGFyZ2VQcm9wZXJ0eS52YWx1ZSA9IHRoaXMuY2hhbGxlbmdlLmFuc3dlckF0b20uY2hhcmdlUHJvcGVydHkuZ2V0KCk7XHJcbiAgfVxyXG5cclxuICAvLyBAcHVibGljXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIHRoaXMuZGlzcG9zZVNjaGVtYXRpY1RvU3ltYm9sQ2hhbGxlbmdlVmlldygpO1xyXG4gICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxuYnVpbGRBbkF0b20ucmVnaXN0ZXIoICdTY2hlbWF0aWNUb1N5bWJvbENoYWxsZW5nZVZpZXcnLCBTY2hlbWF0aWNUb1N5bWJvbENoYWxsZW5nZVZpZXcgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNjaGVtYXRpY1RvU3ltYm9sQ2hhbGxlbmdlVmlldzsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsT0FBTyxNQUFNLCtCQUErQjtBQUNuRCxPQUFPQyxtQkFBbUIsTUFBTSx1REFBdUQ7QUFDdkYsT0FBT0MsVUFBVSxNQUFNLDBDQUEwQztBQUNqRSxPQUFPQyxXQUFXLE1BQU0sc0JBQXNCO0FBQzlDLE9BQU9DLGFBQWEsTUFBTSxvQkFBb0I7QUFDOUMsT0FBT0MscUJBQXFCLE1BQU0sNEJBQTRCO0FBQzlELE9BQU9DLCtCQUErQixNQUFNLHNDQUFzQztBQUVsRixNQUFNQyw4QkFBOEIsU0FBU0gsYUFBYSxDQUFDO0VBRXpEO0FBQ0Y7QUFDQTtBQUNB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