// Copyright 2014-2021, University of Colorado Boulder

/**
 * Equation node for 'factor' screen in 'Arithmetic' simulation.
 *
 * @author Andrey Zelenkov (MLearner)
 */

import arithmetic from '../../arithmetic.js';
import GameState from '../../common/model/GameState.js';
import EquationNode from '../../common/view/EquationNode.js';
class FactorEquationNode extends EquationNode {
  /**
   * @param {Property} stateProperty - State of game property.
   * @param {Property} multiplicandProperty - Property necessary for creating multiplicand input.
   * @param {Property} multiplierProperty - Property necessary for creating multiplier input.
   * @param {Property} productProperty - Property necessary for creating product input.
   */
  constructor(stateProperty, multiplicandProperty, multiplierProperty, productProperty) {
    super(multiplicandProperty, multiplierProperty, productProperty);

    // The two multipliers are always interactive in the factor equation, so set this up now.
    this.multiplicandInput.setInteractiveAppearance(true);
    this.multiplierInput.setInteractiveAppearance(true);

    // Update contents and focus at the state changes.
    stateProperty.link(state => {
      this.setShowEqual(state !== GameState.DISPLAYING_INCORRECT_ANSWER_FEEDBACK);
      if (state === GameState.AWAITING_USER_INPUT) {
        // Reset any previous answers from the user.
        multiplicandProperty.reset();
        multiplierProperty.reset();

        // Show the placeholders
        this.multiplicandInput.setPlaceholder();
        this.multiplierInput.setPlaceholder();
      }
    });
  }
}
arithmetic.register('FactorEquationNode', FactorEquationNode);
export default FactorEquationNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhcml0aG1ldGljIiwiR2FtZVN0YXRlIiwiRXF1YXRpb25Ob2RlIiwiRmFjdG9yRXF1YXRpb25Ob2RlIiwiY29uc3RydWN0b3IiLCJzdGF0ZVByb3BlcnR5IiwibXVsdGlwbGljYW5kUHJvcGVydHkiLCJtdWx0aXBsaWVyUHJvcGVydHkiLCJwcm9kdWN0UHJvcGVydHkiLCJtdWx0aXBsaWNhbmRJbnB1dCIsInNldEludGVyYWN0aXZlQXBwZWFyYW5jZSIsIm11bHRpcGxpZXJJbnB1dCIsImxpbmsiLCJzdGF0ZSIsInNldFNob3dFcXVhbCIsIkRJU1BMQVlJTkdfSU5DT1JSRUNUX0FOU1dFUl9GRUVEQkFDSyIsIkFXQUlUSU5HX1VTRVJfSU5QVVQiLCJyZXNldCIsInNldFBsYWNlaG9sZGVyIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJGYWN0b3JFcXVhdGlvbk5vZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTQtMjAyMSwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogRXF1YXRpb24gbm9kZSBmb3IgJ2ZhY3Rvcicgc2NyZWVuIGluICdBcml0aG1ldGljJyBzaW11bGF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEFuZHJleSBaZWxlbmtvdiAoTUxlYXJuZXIpXHJcbiAqL1xyXG5cclxuaW1wb3J0IGFyaXRobWV0aWMgZnJvbSAnLi4vLi4vYXJpdGhtZXRpYy5qcyc7XHJcbmltcG9ydCBHYW1lU3RhdGUgZnJvbSAnLi4vLi4vY29tbW9uL21vZGVsL0dhbWVTdGF0ZS5qcyc7XHJcbmltcG9ydCBFcXVhdGlvbk5vZGUgZnJvbSAnLi4vLi4vY29tbW9uL3ZpZXcvRXF1YXRpb25Ob2RlLmpzJztcclxuXHJcbmNsYXNzIEZhY3RvckVxdWF0aW9uTm9kZSBleHRlbmRzIEVxdWF0aW9uTm9kZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7UHJvcGVydHl9IHN0YXRlUHJvcGVydHkgLSBTdGF0ZSBvZiBnYW1lIHByb3BlcnR5LlxyXG4gICAqIEBwYXJhbSB7UHJvcGVydHl9IG11bHRpcGxpY2FuZFByb3BlcnR5IC0gUHJvcGVydHkgbmVjZXNzYXJ5IGZvciBjcmVhdGluZyBtdWx0aXBsaWNhbmQgaW5wdXQuXHJcbiAgICogQHBhcmFtIHtQcm9wZXJ0eX0gbXVsdGlwbGllclByb3BlcnR5IC0gUHJvcGVydHkgbmVjZXNzYXJ5IGZvciBjcmVhdGluZyBtdWx0aXBsaWVyIGlucHV0LlxyXG4gICAqIEBwYXJhbSB7UHJvcGVydHl9IHByb2R1Y3RQcm9wZXJ0eSAtIFByb3BlcnR5IG5lY2Vzc2FyeSBmb3IgY3JlYXRpbmcgcHJvZHVjdCBpbnB1dC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvciggc3RhdGVQcm9wZXJ0eSwgbXVsdGlwbGljYW5kUHJvcGVydHksIG11bHRpcGxpZXJQcm9wZXJ0eSwgcHJvZHVjdFByb3BlcnR5ICkge1xyXG4gICAgc3VwZXIoIG11bHRpcGxpY2FuZFByb3BlcnR5LCBtdWx0aXBsaWVyUHJvcGVydHksIHByb2R1Y3RQcm9wZXJ0eSApO1xyXG5cclxuICAgIC8vIFRoZSB0d28gbXVsdGlwbGllcnMgYXJlIGFsd2F5cyBpbnRlcmFjdGl2ZSBpbiB0aGUgZmFjdG9yIGVxdWF0aW9uLCBzbyBzZXQgdGhpcyB1cCBub3cuXHJcbiAgICB0aGlzLm11bHRpcGxpY2FuZElucHV0LnNldEludGVyYWN0aXZlQXBwZWFyYW5jZSggdHJ1ZSApO1xyXG4gICAgdGhpcy5tdWx0aXBsaWVySW5wdXQuc2V0SW50ZXJhY3RpdmVBcHBlYXJhbmNlKCB0cnVlICk7XHJcblxyXG4gICAgLy8gVXBkYXRlIGNvbnRlbnRzIGFuZCBmb2N1cyBhdCB0aGUgc3RhdGUgY2hhbmdlcy5cclxuICAgIHN0YXRlUHJvcGVydHkubGluayggc3RhdGUgPT4ge1xyXG4gICAgICB0aGlzLnNldFNob3dFcXVhbCggc3RhdGUgIT09IEdhbWVTdGF0ZS5ESVNQTEFZSU5HX0lOQ09SUkVDVF9BTlNXRVJfRkVFREJBQ0sgKTtcclxuICAgICAgaWYgKCBzdGF0ZSA9PT0gR2FtZVN0YXRlLkFXQUlUSU5HX1VTRVJfSU5QVVQgKSB7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGFueSBwcmV2aW91cyBhbnN3ZXJzIGZyb20gdGhlIHVzZXIuXHJcbiAgICAgICAgbXVsdGlwbGljYW5kUHJvcGVydHkucmVzZXQoKTtcclxuICAgICAgICBtdWx0aXBsaWVyUHJvcGVydHkucmVzZXQoKTtcclxuXHJcbiAgICAgICAgLy8gU2hvdyB0aGUgcGxhY2Vob2xkZXJzXHJcbiAgICAgICAgdGhpcy5tdWx0aXBsaWNhbmRJbnB1dC5zZXRQbGFjZWhvbGRlcigpO1xyXG4gICAgICAgIHRoaXMubXVsdGlwbGllcklucHV0LnNldFBsYWNlaG9sZGVyKCk7XHJcbiAgICAgIH1cclxuICAgIH0gKTtcclxuICB9XHJcbn1cclxuXHJcbmFyaXRobWV0aWMucmVnaXN0ZXIoICdGYWN0b3JFcXVhdGlvbk5vZGUnLCBGYWN0b3JFcXVhdGlvbk5vZGUgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZhY3RvckVxdWF0aW9uTm9kZTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsVUFBVSxNQUFNLHFCQUFxQjtBQUM1QyxPQUFPQyxTQUFTLE1BQU0saUNBQWlDO0FBQ3ZELE9BQU9DLFlBQVksTUFBTSxtQ0FBbUM7QUFFNUQsTUFBTUMsa0JBQWtCLFNBQVNELFlBQVksQ0FBQztFQUU1QztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDRUUsV0FBV0EsQ0FBRUMsYUFBYSxFQUFFQyxvQkFBb0IsRUFBRUMsa0JBQWtCLEVBQUVDLGVBQWUsRUFBRztJQUN0RixLQUFLLENBQUVGLG9CQUFvQixFQUFFQyxrQkFBa0IsRUFBRUMsZUFBZ0IsQ0FBQzs7SUFFbEU7SUFDQSxJQUFJLENBQUNDLGlCQUFpQixDQUFDQyx3QkFBd0IsQ0FBRSxJQUFLLENBQUM7SUFDdkQsSUFBSSxDQUFDQyxlQUFlLENBQUNELHdCQUF3QixDQUFFLElBQUssQ0FBQzs7SUFFckQ7SUFDQUwsYUFBYSxDQUFDTyxJQUFJLENBQUVDLEtBQUssSUFBSTtNQUMzQixJQUFJLENBQUNDLFlBQVksQ0FBRUQsS0FBSyxLQUFLWixTQUFTLENBQUNjLG9DQUFxQyxDQUFDO01BQzdFLElBQUtGLEtBQUssS0FBS1osU0FBUyxDQUFDZSxtQkFBbUIsRUFBRztRQUU3QztRQUNBVixvQkFBb0IsQ0FBQ1csS0FBSyxDQUFDLENBQUM7UUFDNUJWLGtCQUFrQixDQUFDVSxLQUFLLENBQUMsQ0FBQzs7UUFFMUI7UUFDQSxJQUFJLENBQUNSLGlCQUFpQixDQUFDUyxjQUFjLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUNQLGVBQWUsQ0FBQ08sY0FBYyxDQUFDLENBQUM7TUFDdkM7SUFDRixDQUFFLENBQUM7RUFDTDtBQUNGO0FBRUFsQixVQUFVLENBQUNtQixRQUFRLENBQUUsb0JBQW9CLEVBQUVoQixrQkFBbUIsQ0FBQztBQUUvRCxlQUFlQSxrQkFBa0IifQ==