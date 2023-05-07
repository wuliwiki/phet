// Copyright 2018-2020, University of Colorado Boulder

/**
 * View for a NumberGroupStack.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import fractionsCommon from '../../fractionsCommon.js';
import NumberGroupNode from './NumberGroupNode.js';
import StackNode from './StackNode.js';
class NumberGroupStackNode extends StackNode {
  /**
   * @param {NumberStackGroup} numberGroupStack
   * @param {Object} [options]
   */
  constructor(numberGroupStack, options) {
    super(numberGroupStack);

    // @private {boolean}
    this.isMixedNumber = numberGroupStack.isMixedNumber;

    // @private {Node}
    this.icon = NumberGroupNode.createIcon(numberGroupStack.isMixedNumber);
    this.addChild(this.icon);

    // @private {function}
    this.stackLengthListener = this.onStackLengthChange.bind(this);
    this.stack.numberGroups.lengthProperty.link(this.stackLengthListener);

    // Inform about our available layout bounds
    this.layoutBounds = this.icon.bounds;
    this.mutate(options);
  }

  /**
   * How to handle changes to the stack length.
   * @private
   *
   * @param {number} length
   */
  onStackLengthChange(length) {
    this.icon.visible = length > 0;
  }

  /**
   * Releases references.
   * @public
   * @override
   */
  dispose() {
    this.icon.dispose();
    this.stack.numberGroups.lengthProperty.unlink(this.stackLengthListener);
    super.dispose();
  }
}
fractionsCommon.register('NumberGroupStackNode', NumberGroupStackNode);
export default NumberGroupStackNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmcmFjdGlvbnNDb21tb24iLCJOdW1iZXJHcm91cE5vZGUiLCJTdGFja05vZGUiLCJOdW1iZXJHcm91cFN0YWNrTm9kZSIsImNvbnN0cnVjdG9yIiwibnVtYmVyR3JvdXBTdGFjayIsIm9wdGlvbnMiLCJpc01peGVkTnVtYmVyIiwiaWNvbiIsImNyZWF0ZUljb24iLCJhZGRDaGlsZCIsInN0YWNrTGVuZ3RoTGlzdGVuZXIiLCJvblN0YWNrTGVuZ3RoQ2hhbmdlIiwiYmluZCIsInN0YWNrIiwibnVtYmVyR3JvdXBzIiwibGVuZ3RoUHJvcGVydHkiLCJsaW5rIiwibGF5b3V0Qm91bmRzIiwiYm91bmRzIiwibXV0YXRlIiwibGVuZ3RoIiwidmlzaWJsZSIsImRpc3Bvc2UiLCJ1bmxpbmsiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIk51bWJlckdyb3VwU3RhY2tOb2RlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjAsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFZpZXcgZm9yIGEgTnVtYmVyR3JvdXBTdGFjay5cclxuICpcclxuICogQGF1dGhvciBKb25hdGhhbiBPbHNvbiA8am9uYXRoYW4ub2xzb25AY29sb3JhZG8uZWR1PlxyXG4gKi9cclxuXHJcbmltcG9ydCBmcmFjdGlvbnNDb21tb24gZnJvbSAnLi4vLi4vZnJhY3Rpb25zQ29tbW9uLmpzJztcclxuaW1wb3J0IE51bWJlckdyb3VwTm9kZSBmcm9tICcuL051bWJlckdyb3VwTm9kZS5qcyc7XHJcbmltcG9ydCBTdGFja05vZGUgZnJvbSAnLi9TdGFja05vZGUuanMnO1xyXG5cclxuY2xhc3MgTnVtYmVyR3JvdXBTdGFja05vZGUgZXh0ZW5kcyBTdGFja05vZGUge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7TnVtYmVyU3RhY2tHcm91cH0gbnVtYmVyR3JvdXBTdGFja1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggbnVtYmVyR3JvdXBTdGFjaywgb3B0aW9ucyApIHtcclxuICAgIHN1cGVyKCBudW1iZXJHcm91cFN0YWNrICk7XHJcblxyXG4gICAgLy8gQHByaXZhdGUge2Jvb2xlYW59XHJcbiAgICB0aGlzLmlzTWl4ZWROdW1iZXIgPSBudW1iZXJHcm91cFN0YWNrLmlzTWl4ZWROdW1iZXI7XHJcblxyXG4gICAgLy8gQHByaXZhdGUge05vZGV9XHJcbiAgICB0aGlzLmljb24gPSBOdW1iZXJHcm91cE5vZGUuY3JlYXRlSWNvbiggbnVtYmVyR3JvdXBTdGFjay5pc01peGVkTnVtYmVyICk7XHJcblxyXG4gICAgdGhpcy5hZGRDaGlsZCggdGhpcy5pY29uICk7XHJcblxyXG4gICAgLy8gQHByaXZhdGUge2Z1bmN0aW9ufVxyXG4gICAgdGhpcy5zdGFja0xlbmd0aExpc3RlbmVyID0gdGhpcy5vblN0YWNrTGVuZ3RoQ2hhbmdlLmJpbmQoIHRoaXMgKTtcclxuICAgIHRoaXMuc3RhY2subnVtYmVyR3JvdXBzLmxlbmd0aFByb3BlcnR5LmxpbmsoIHRoaXMuc3RhY2tMZW5ndGhMaXN0ZW5lciApO1xyXG5cclxuICAgIC8vIEluZm9ybSBhYm91dCBvdXIgYXZhaWxhYmxlIGxheW91dCBib3VuZHNcclxuICAgIHRoaXMubGF5b3V0Qm91bmRzID0gdGhpcy5pY29uLmJvdW5kcztcclxuXHJcbiAgICB0aGlzLm11dGF0ZSggb3B0aW9ucyApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSG93IHRvIGhhbmRsZSBjaGFuZ2VzIHRvIHRoZSBzdGFjayBsZW5ndGguXHJcbiAgICogQHByaXZhdGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGhcclxuICAgKi9cclxuICBvblN0YWNrTGVuZ3RoQ2hhbmdlKCBsZW5ndGggKSB7XHJcbiAgICB0aGlzLmljb24udmlzaWJsZSA9IGxlbmd0aCA+IDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWxlYXNlcyByZWZlcmVuY2VzLlxyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAb3ZlcnJpZGVcclxuICAgKi9cclxuICBkaXNwb3NlKCkge1xyXG4gICAgdGhpcy5pY29uLmRpc3Bvc2UoKTtcclxuICAgIHRoaXMuc3RhY2subnVtYmVyR3JvdXBzLmxlbmd0aFByb3BlcnR5LnVubGluayggdGhpcy5zdGFja0xlbmd0aExpc3RlbmVyICk7XHJcblxyXG4gICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZnJhY3Rpb25zQ29tbW9uLnJlZ2lzdGVyKCAnTnVtYmVyR3JvdXBTdGFja05vZGUnLCBOdW1iZXJHcm91cFN0YWNrTm9kZSApO1xyXG5leHBvcnQgZGVmYXVsdCBOdW1iZXJHcm91cFN0YWNrTm9kZTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsZUFBZSxNQUFNLDBCQUEwQjtBQUN0RCxPQUFPQyxlQUFlLE1BQU0sc0JBQXNCO0FBQ2xELE9BQU9DLFNBQVMsTUFBTSxnQkFBZ0I7QUFFdEMsTUFBTUMsb0JBQW9CLFNBQVNELFNBQVMsQ0FBQztFQUMzQztBQUNGO0FBQ0E7QUFDQTtFQUNFRSxXQUFXQSxDQUFFQyxnQkFBZ0IsRUFBRUMsT0FBTyxFQUFHO0lBQ3ZDLEtBQUssQ0FBRUQsZ0JBQWlCLENBQUM7O0lBRXpCO0lBQ0EsSUFBSSxDQUFDRSxhQUFhLEdBQUdGLGdCQUFnQixDQUFDRSxhQUFhOztJQUVuRDtJQUNBLElBQUksQ0FBQ0MsSUFBSSxHQUFHUCxlQUFlLENBQUNRLFVBQVUsQ0FBRUosZ0JBQWdCLENBQUNFLGFBQWMsQ0FBQztJQUV4RSxJQUFJLENBQUNHLFFBQVEsQ0FBRSxJQUFJLENBQUNGLElBQUssQ0FBQzs7SUFFMUI7SUFDQSxJQUFJLENBQUNHLG1CQUFtQixHQUFHLElBQUksQ0FBQ0MsbUJBQW1CLENBQUNDLElBQUksQ0FBRSxJQUFLLENBQUM7SUFDaEUsSUFBSSxDQUFDQyxLQUFLLENBQUNDLFlBQVksQ0FBQ0MsY0FBYyxDQUFDQyxJQUFJLENBQUUsSUFBSSxDQUFDTixtQkFBb0IsQ0FBQzs7SUFFdkU7SUFDQSxJQUFJLENBQUNPLFlBQVksR0FBRyxJQUFJLENBQUNWLElBQUksQ0FBQ1csTUFBTTtJQUVwQyxJQUFJLENBQUNDLE1BQU0sQ0FBRWQsT0FBUSxDQUFDO0VBQ3hCOztFQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFTSxtQkFBbUJBLENBQUVTLE1BQU0sRUFBRztJQUM1QixJQUFJLENBQUNiLElBQUksQ0FBQ2MsT0FBTyxHQUFHRCxNQUFNLEdBQUcsQ0FBQztFQUNoQzs7RUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBQ0VFLE9BQU9BLENBQUEsRUFBRztJQUNSLElBQUksQ0FBQ2YsSUFBSSxDQUFDZSxPQUFPLENBQUMsQ0FBQztJQUNuQixJQUFJLENBQUNULEtBQUssQ0FBQ0MsWUFBWSxDQUFDQyxjQUFjLENBQUNRLE1BQU0sQ0FBRSxJQUFJLENBQUNiLG1CQUFvQixDQUFDO0lBRXpFLEtBQUssQ0FBQ1ksT0FBTyxDQUFDLENBQUM7RUFDakI7QUFDRjtBQUVBdkIsZUFBZSxDQUFDeUIsUUFBUSxDQUFFLHNCQUFzQixFQUFFdEIsb0JBQXFCLENBQUM7QUFDeEUsZUFBZUEsb0JBQW9CIn0=