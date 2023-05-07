// Copyright 2017-2020, University of Colorado Boulder

/**
 * model element used in the game that represents the area where an expression or coin term can be collected if it
 * matches the collection specification
 */

import Emitter from '../../../../axon/js/Emitter.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import EESharedConstants from '../../common/EESharedConstants.js';
import CoinTerm from '../../common/model/CoinTerm.js';
import Expression from '../../common/model/Expression.js';
import expressionExchange from '../../expressionExchange.js';

// constants
const REJECTED_ITEM_DISTANCE = 20; // empirically determined

class EECollectionArea {
  /**
   * @param {number} x
   * @param {number} y
   * @param {ViewMode} viewMode
   * @param {Property.<boolean>} undoAllowedProperty
   */
  constructor(x, y, viewMode, undoAllowedProperty) {
    // @public (read-only) {Property.<boolean>} - property indicating whether the undo functionality is enabled
    this.undoAllowedProperty = undoAllowedProperty;

    // @public (read-only) {Expression|CoinTerm} - expression or coin term that has been collected, null if nothing
    this.collectedItemProperty = new Property(null);

    // @public {Property.<ExpressionDescription|null} - description of the expression that this capture area can hold
    this.expressionDescriptionProperty = new Property(null);

    // @public (read-only) {Bounds2} - bounds in model space of this capture area
    this.bounds = EESharedConstants.COLLECTION_AREA_SIZE.toBounds(x, y);

    // @public (read-only) {ViewMode} - view mode (coins or variables)
    this.viewMode = viewMode;

    // @public {Property.<boolean>} - used by the view to turn on/off a "halo" for the collection area, generally used
    // when the user holds something over the collection area
    this.haloActiveProperty = new Property(false);

    // @public (read-only) {Emitter} - emitter that emits an event when an at attempt is made to collect an item, and
    // includes a parameter that is true if the item was collected and false if not
    this.collectionAttemptedEmitter = new Emitter({
      parameters: [{
        valueType: 'boolean'
      }]
    });
  }

  /**
   * Test the provided expression and, if it matches the spec, capture it by moving it into the center of this
   * collection area and, if it doesn't match, push it away.
   * @param {Expression} expression
   * @public
   */
  collectOrRejectExpression(expression) {
    // test that this collection area is in the correct state
    assert && assert(this.expressionDescriptionProperty.get(), 'no expression description for collection area');

    // bounds used for positioning of the expression
    let expressionBounds;

    // results of the attempt to collect this expression
    let collected;
    if (this.isEmpty() && this.expressionDescriptionProperty.get().expressionMatches(expression)) {
      // collect this expression - the collection state must be set first in case it causes an update of the bounds
      expression.collectedProperty.set(true);
      collected = true;
      expressionBounds = expression.getBounds();

      // move the expression into the container, a little below center so there's no overlap with eject button
      expression.travelToDestination(new Vector2(this.bounds.getCenterX() - expressionBounds.width / 2, this.bounds.getCenterY() - expressionBounds.height * 0.4));
      this.collectedItemProperty.set(expression);
    } else {
      // reject this expression
      expressionBounds = expression.getBounds();
      collected = false;
      expression.travelToDestination(new Vector2(this.bounds.minX - expressionBounds.width - REJECTED_ITEM_DISTANCE, this.bounds.getCenterY() - expressionBounds.height / 2));
    }

    // signal the results of this collection attempt
    this.collectionAttemptedEmitter.emit(collected);
  }

  /**
   * Test the provided coin term and, if it matches the spec, capture it by moving it into the center of this
   * collection area and, if it doesn't match, push it away.
   * @param {CoinTerm} coinTerm
   * @public
   */
  collectOrRejectCoinTerm(coinTerm) {
    // test that this collection area is in the correct state
    assert && assert(this.expressionDescriptionProperty.get(), 'no expression description for collection area');

    // get bounds for positioning of the coin term
    const coinTermViewBounds = coinTerm.getViewBounds();

    // results of the attempt to collect this expression
    let collected;
    if (this.isEmpty() && this.expressionDescriptionProperty.get().coinTermMatches(coinTerm)) {
      // collect this coin term
      collected = true;
      coinTerm.travelToDestination(this.bounds.center);
      coinTerm.collectedProperty.set(true);
      this.collectedItemProperty.set(coinTerm);
    } else {
      // reject this coin term
      collected = false;
      coinTerm.travelToDestination(new Vector2(this.bounds.minX - coinTermViewBounds.width - REJECTED_ITEM_DISTANCE, this.bounds.getCenterY()));
    }

    // signal the results of this collection attempt
    this.collectionAttemptedEmitter.emit(collected);
  }

  /**
   * @returns {boolean}
   * @public
   */
  isEmpty() {
    return this.collectedItemProperty.get() === null;
  }

  /**
   * eject the currently collected expression, no-op if no expression is currently collected
   * @public
   */
  ejectCollectedItem() {
    const collectedItem = this.collectedItemProperty.get();
    let collectedItemBounds;
    let yDestination;

    // the item's collected state must be updated first, since this can sometimes cause its bounds to change
    collectedItem.collectedProperty.set(false);

    // figure out the destination, which is slightly different for coin terms versus expressions
    if (collectedItem instanceof Expression) {
      collectedItemBounds = collectedItem.getBounds();
      yDestination = this.bounds.getCenterY() - collectedItemBounds.height / 2;
    } else {
      assert && assert(collectedItem instanceof CoinTerm, 'unexpected item, cannot reject');
      collectedItemBounds = collectedItem.getViewBounds();
      yDestination = this.bounds.getCenterY();
    }

    // send the collected item outside of the collection area
    collectedItem.travelToDestination(new Vector2(this.bounds.minX - collectedItemBounds.width - REJECTED_ITEM_DISTANCE, yDestination));

    // update internal state
    this.collectedItemProperty.reset();
  }

  /**
   * get a reference to this collection area's model bounds, the results should not be changed, this exists to allow
   * polymorphisim with other entities whose bounds are checked
   * @returns {Bounds2}
   * @public
   */
  getBounds() {
    return this.bounds;
  }

  /**
   * reset the collection area
   * @public
   */
  reset() {
    if (this.collectedItemProperty.get()) {
      this.collectedItemProperty.get().collectedProperty.set(false);
    }
    this.collectedItemProperty.reset();
  }
}
expressionExchange.register('EECollectionArea', EECollectionArea);
export default EECollectionArea;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFbWl0dGVyIiwiUHJvcGVydHkiLCJWZWN0b3IyIiwiRUVTaGFyZWRDb25zdGFudHMiLCJDb2luVGVybSIsIkV4cHJlc3Npb24iLCJleHByZXNzaW9uRXhjaGFuZ2UiLCJSRUpFQ1RFRF9JVEVNX0RJU1RBTkNFIiwiRUVDb2xsZWN0aW9uQXJlYSIsImNvbnN0cnVjdG9yIiwieCIsInkiLCJ2aWV3TW9kZSIsInVuZG9BbGxvd2VkUHJvcGVydHkiLCJjb2xsZWN0ZWRJdGVtUHJvcGVydHkiLCJleHByZXNzaW9uRGVzY3JpcHRpb25Qcm9wZXJ0eSIsImJvdW5kcyIsIkNPTExFQ1RJT05fQVJFQV9TSVpFIiwidG9Cb3VuZHMiLCJoYWxvQWN0aXZlUHJvcGVydHkiLCJjb2xsZWN0aW9uQXR0ZW1wdGVkRW1pdHRlciIsInBhcmFtZXRlcnMiLCJ2YWx1ZVR5cGUiLCJjb2xsZWN0T3JSZWplY3RFeHByZXNzaW9uIiwiZXhwcmVzc2lvbiIsImFzc2VydCIsImdldCIsImV4cHJlc3Npb25Cb3VuZHMiLCJjb2xsZWN0ZWQiLCJpc0VtcHR5IiwiZXhwcmVzc2lvbk1hdGNoZXMiLCJjb2xsZWN0ZWRQcm9wZXJ0eSIsInNldCIsImdldEJvdW5kcyIsInRyYXZlbFRvRGVzdGluYXRpb24iLCJnZXRDZW50ZXJYIiwid2lkdGgiLCJnZXRDZW50ZXJZIiwiaGVpZ2h0IiwibWluWCIsImVtaXQiLCJjb2xsZWN0T3JSZWplY3RDb2luVGVybSIsImNvaW5UZXJtIiwiY29pblRlcm1WaWV3Qm91bmRzIiwiZ2V0Vmlld0JvdW5kcyIsImNvaW5UZXJtTWF0Y2hlcyIsImNlbnRlciIsImVqZWN0Q29sbGVjdGVkSXRlbSIsImNvbGxlY3RlZEl0ZW0iLCJjb2xsZWN0ZWRJdGVtQm91bmRzIiwieURlc3RpbmF0aW9uIiwicmVzZXQiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkVFQ29sbGVjdGlvbkFyZWEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTctMjAyMCwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogbW9kZWwgZWxlbWVudCB1c2VkIGluIHRoZSBnYW1lIHRoYXQgcmVwcmVzZW50cyB0aGUgYXJlYSB3aGVyZSBhbiBleHByZXNzaW9uIG9yIGNvaW4gdGVybSBjYW4gYmUgY29sbGVjdGVkIGlmIGl0XHJcbiAqIG1hdGNoZXMgdGhlIGNvbGxlY3Rpb24gc3BlY2lmaWNhdGlvblxyXG4gKi9cclxuXHJcbmltcG9ydCBFbWl0dGVyIGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvRW1pdHRlci5qcyc7XHJcbmltcG9ydCBQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL1Byb3BlcnR5LmpzJztcclxuaW1wb3J0IFZlY3RvcjIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1ZlY3RvcjIuanMnO1xyXG5pbXBvcnQgRUVTaGFyZWRDb25zdGFudHMgZnJvbSAnLi4vLi4vY29tbW9uL0VFU2hhcmVkQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IENvaW5UZXJtIGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbC9Db2luVGVybS5qcyc7XHJcbmltcG9ydCBFeHByZXNzaW9uIGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbC9FeHByZXNzaW9uLmpzJztcclxuaW1wb3J0IGV4cHJlc3Npb25FeGNoYW5nZSBmcm9tICcuLi8uLi9leHByZXNzaW9uRXhjaGFuZ2UuanMnO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IFJFSkVDVEVEX0lURU1fRElTVEFOQ0UgPSAyMDsgLy8gZW1waXJpY2FsbHkgZGV0ZXJtaW5lZFxyXG5cclxuY2xhc3MgRUVDb2xsZWN0aW9uQXJlYSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4XHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHlcclxuICAgKiBAcGFyYW0ge1ZpZXdNb2RlfSB2aWV3TW9kZVxyXG4gICAqIEBwYXJhbSB7UHJvcGVydHkuPGJvb2xlYW4+fSB1bmRvQWxsb3dlZFByb3BlcnR5XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIHgsIHksIHZpZXdNb2RlLCB1bmRvQWxsb3dlZFByb3BlcnR5ICkge1xyXG5cclxuICAgIC8vIEBwdWJsaWMgKHJlYWQtb25seSkge1Byb3BlcnR5Ljxib29sZWFuPn0gLSBwcm9wZXJ0eSBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIHVuZG8gZnVuY3Rpb25hbGl0eSBpcyBlbmFibGVkXHJcbiAgICB0aGlzLnVuZG9BbGxvd2VkUHJvcGVydHkgPSB1bmRvQWxsb3dlZFByb3BlcnR5O1xyXG5cclxuICAgIC8vIEBwdWJsaWMgKHJlYWQtb25seSkge0V4cHJlc3Npb258Q29pblRlcm19IC0gZXhwcmVzc2lvbiBvciBjb2luIHRlcm0gdGhhdCBoYXMgYmVlbiBjb2xsZWN0ZWQsIG51bGwgaWYgbm90aGluZ1xyXG4gICAgdGhpcy5jb2xsZWN0ZWRJdGVtUHJvcGVydHkgPSBuZXcgUHJvcGVydHkoIG51bGwgKTtcclxuXHJcbiAgICAvLyBAcHVibGljIHtQcm9wZXJ0eS48RXhwcmVzc2lvbkRlc2NyaXB0aW9ufG51bGx9IC0gZGVzY3JpcHRpb24gb2YgdGhlIGV4cHJlc3Npb24gdGhhdCB0aGlzIGNhcHR1cmUgYXJlYSBjYW4gaG9sZFxyXG4gICAgdGhpcy5leHByZXNzaW9uRGVzY3JpcHRpb25Qcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eSggbnVsbCApO1xyXG5cclxuICAgIC8vIEBwdWJsaWMgKHJlYWQtb25seSkge0JvdW5kczJ9IC0gYm91bmRzIGluIG1vZGVsIHNwYWNlIG9mIHRoaXMgY2FwdHVyZSBhcmVhXHJcbiAgICB0aGlzLmJvdW5kcyA9IEVFU2hhcmVkQ29uc3RhbnRzLkNPTExFQ1RJT05fQVJFQV9TSVpFLnRvQm91bmRzKCB4LCB5ICk7XHJcblxyXG4gICAgLy8gQHB1YmxpYyAocmVhZC1vbmx5KSB7Vmlld01vZGV9IC0gdmlldyBtb2RlIChjb2lucyBvciB2YXJpYWJsZXMpXHJcbiAgICB0aGlzLnZpZXdNb2RlID0gdmlld01vZGU7XHJcblxyXG4gICAgLy8gQHB1YmxpYyB7UHJvcGVydHkuPGJvb2xlYW4+fSAtIHVzZWQgYnkgdGhlIHZpZXcgdG8gdHVybiBvbi9vZmYgYSBcImhhbG9cIiBmb3IgdGhlIGNvbGxlY3Rpb24gYXJlYSwgZ2VuZXJhbGx5IHVzZWRcclxuICAgIC8vIHdoZW4gdGhlIHVzZXIgaG9sZHMgc29tZXRoaW5nIG92ZXIgdGhlIGNvbGxlY3Rpb24gYXJlYVxyXG4gICAgdGhpcy5oYWxvQWN0aXZlUHJvcGVydHkgPSBuZXcgUHJvcGVydHkoIGZhbHNlICk7XHJcblxyXG4gICAgLy8gQHB1YmxpYyAocmVhZC1vbmx5KSB7RW1pdHRlcn0gLSBlbWl0dGVyIHRoYXQgZW1pdHMgYW4gZXZlbnQgd2hlbiBhbiBhdCBhdHRlbXB0IGlzIG1hZGUgdG8gY29sbGVjdCBhbiBpdGVtLCBhbmRcclxuICAgIC8vIGluY2x1ZGVzIGEgcGFyYW1ldGVyIHRoYXQgaXMgdHJ1ZSBpZiB0aGUgaXRlbSB3YXMgY29sbGVjdGVkIGFuZCBmYWxzZSBpZiBub3RcclxuICAgIHRoaXMuY29sbGVjdGlvbkF0dGVtcHRlZEVtaXR0ZXIgPSBuZXcgRW1pdHRlciggeyBwYXJhbWV0ZXJzOiBbIHsgdmFsdWVUeXBlOiAnYm9vbGVhbicgfSBdIH0gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRlc3QgdGhlIHByb3ZpZGVkIGV4cHJlc3Npb24gYW5kLCBpZiBpdCBtYXRjaGVzIHRoZSBzcGVjLCBjYXB0dXJlIGl0IGJ5IG1vdmluZyBpdCBpbnRvIHRoZSBjZW50ZXIgb2YgdGhpc1xyXG4gICAqIGNvbGxlY3Rpb24gYXJlYSBhbmQsIGlmIGl0IGRvZXNuJ3QgbWF0Y2gsIHB1c2ggaXQgYXdheS5cclxuICAgKiBAcGFyYW0ge0V4cHJlc3Npb259IGV4cHJlc3Npb25cclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgY29sbGVjdE9yUmVqZWN0RXhwcmVzc2lvbiggZXhwcmVzc2lvbiApIHtcclxuXHJcbiAgICAvLyB0ZXN0IHRoYXQgdGhpcyBjb2xsZWN0aW9uIGFyZWEgaXMgaW4gdGhlIGNvcnJlY3Qgc3RhdGVcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIHRoaXMuZXhwcmVzc2lvbkRlc2NyaXB0aW9uUHJvcGVydHkuZ2V0KCksICdubyBleHByZXNzaW9uIGRlc2NyaXB0aW9uIGZvciBjb2xsZWN0aW9uIGFyZWEnICk7XHJcblxyXG4gICAgLy8gYm91bmRzIHVzZWQgZm9yIHBvc2l0aW9uaW5nIG9mIHRoZSBleHByZXNzaW9uXHJcbiAgICBsZXQgZXhwcmVzc2lvbkJvdW5kcztcclxuXHJcbiAgICAvLyByZXN1bHRzIG9mIHRoZSBhdHRlbXB0IHRvIGNvbGxlY3QgdGhpcyBleHByZXNzaW9uXHJcbiAgICBsZXQgY29sbGVjdGVkO1xyXG5cclxuICAgIGlmICggdGhpcy5pc0VtcHR5KCkgJiYgdGhpcy5leHByZXNzaW9uRGVzY3JpcHRpb25Qcm9wZXJ0eS5nZXQoKS5leHByZXNzaW9uTWF0Y2hlcyggZXhwcmVzc2lvbiApICkge1xyXG5cclxuICAgICAgLy8gY29sbGVjdCB0aGlzIGV4cHJlc3Npb24gLSB0aGUgY29sbGVjdGlvbiBzdGF0ZSBtdXN0IGJlIHNldCBmaXJzdCBpbiBjYXNlIGl0IGNhdXNlcyBhbiB1cGRhdGUgb2YgdGhlIGJvdW5kc1xyXG4gICAgICBleHByZXNzaW9uLmNvbGxlY3RlZFByb3BlcnR5LnNldCggdHJ1ZSApO1xyXG4gICAgICBjb2xsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICBleHByZXNzaW9uQm91bmRzID0gZXhwcmVzc2lvbi5nZXRCb3VuZHMoKTtcclxuXHJcbiAgICAgIC8vIG1vdmUgdGhlIGV4cHJlc3Npb24gaW50byB0aGUgY29udGFpbmVyLCBhIGxpdHRsZSBiZWxvdyBjZW50ZXIgc28gdGhlcmUncyBubyBvdmVybGFwIHdpdGggZWplY3QgYnV0dG9uXHJcbiAgICAgIGV4cHJlc3Npb24udHJhdmVsVG9EZXN0aW5hdGlvbiggbmV3IFZlY3RvcjIoXHJcbiAgICAgICAgdGhpcy5ib3VuZHMuZ2V0Q2VudGVyWCgpIC0gZXhwcmVzc2lvbkJvdW5kcy53aWR0aCAvIDIsXHJcbiAgICAgICAgdGhpcy5ib3VuZHMuZ2V0Q2VudGVyWSgpIC0gZXhwcmVzc2lvbkJvdW5kcy5oZWlnaHQgKiAwLjRcclxuICAgICAgKSApO1xyXG4gICAgICB0aGlzLmNvbGxlY3RlZEl0ZW1Qcm9wZXJ0eS5zZXQoIGV4cHJlc3Npb24gKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG5cclxuICAgICAgLy8gcmVqZWN0IHRoaXMgZXhwcmVzc2lvblxyXG4gICAgICBleHByZXNzaW9uQm91bmRzID0gZXhwcmVzc2lvbi5nZXRCb3VuZHMoKTtcclxuICAgICAgY29sbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgIGV4cHJlc3Npb24udHJhdmVsVG9EZXN0aW5hdGlvbiggbmV3IFZlY3RvcjIoXHJcbiAgICAgICAgdGhpcy5ib3VuZHMubWluWCAtIGV4cHJlc3Npb25Cb3VuZHMud2lkdGggLSBSRUpFQ1RFRF9JVEVNX0RJU1RBTkNFLFxyXG4gICAgICAgIHRoaXMuYm91bmRzLmdldENlbnRlclkoKSAtIGV4cHJlc3Npb25Cb3VuZHMuaGVpZ2h0IC8gMlxyXG4gICAgICApICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2lnbmFsIHRoZSByZXN1bHRzIG9mIHRoaXMgY29sbGVjdGlvbiBhdHRlbXB0XHJcbiAgICB0aGlzLmNvbGxlY3Rpb25BdHRlbXB0ZWRFbWl0dGVyLmVtaXQoIGNvbGxlY3RlZCApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGVzdCB0aGUgcHJvdmlkZWQgY29pbiB0ZXJtIGFuZCwgaWYgaXQgbWF0Y2hlcyB0aGUgc3BlYywgY2FwdHVyZSBpdCBieSBtb3ZpbmcgaXQgaW50byB0aGUgY2VudGVyIG9mIHRoaXNcclxuICAgKiBjb2xsZWN0aW9uIGFyZWEgYW5kLCBpZiBpdCBkb2Vzbid0IG1hdGNoLCBwdXNoIGl0IGF3YXkuXHJcbiAgICogQHBhcmFtIHtDb2luVGVybX0gY29pblRlcm1cclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgY29sbGVjdE9yUmVqZWN0Q29pblRlcm0oIGNvaW5UZXJtICkge1xyXG5cclxuICAgIC8vIHRlc3QgdGhhdCB0aGlzIGNvbGxlY3Rpb24gYXJlYSBpcyBpbiB0aGUgY29ycmVjdCBzdGF0ZVxyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggdGhpcy5leHByZXNzaW9uRGVzY3JpcHRpb25Qcm9wZXJ0eS5nZXQoKSwgJ25vIGV4cHJlc3Npb24gZGVzY3JpcHRpb24gZm9yIGNvbGxlY3Rpb24gYXJlYScgKTtcclxuXHJcbiAgICAvLyBnZXQgYm91bmRzIGZvciBwb3NpdGlvbmluZyBvZiB0aGUgY29pbiB0ZXJtXHJcbiAgICBjb25zdCBjb2luVGVybVZpZXdCb3VuZHMgPSBjb2luVGVybS5nZXRWaWV3Qm91bmRzKCk7XHJcblxyXG4gICAgLy8gcmVzdWx0cyBvZiB0aGUgYXR0ZW1wdCB0byBjb2xsZWN0IHRoaXMgZXhwcmVzc2lvblxyXG4gICAgbGV0IGNvbGxlY3RlZDtcclxuXHJcbiAgICBpZiAoIHRoaXMuaXNFbXB0eSgpICYmIHRoaXMuZXhwcmVzc2lvbkRlc2NyaXB0aW9uUHJvcGVydHkuZ2V0KCkuY29pblRlcm1NYXRjaGVzKCBjb2luVGVybSApICkge1xyXG5cclxuICAgICAgLy8gY29sbGVjdCB0aGlzIGNvaW4gdGVybVxyXG4gICAgICBjb2xsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICBjb2luVGVybS50cmF2ZWxUb0Rlc3RpbmF0aW9uKCB0aGlzLmJvdW5kcy5jZW50ZXIgKTtcclxuICAgICAgY29pblRlcm0uY29sbGVjdGVkUHJvcGVydHkuc2V0KCB0cnVlICk7XHJcbiAgICAgIHRoaXMuY29sbGVjdGVkSXRlbVByb3BlcnR5LnNldCggY29pblRlcm0gKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG5cclxuICAgICAgLy8gcmVqZWN0IHRoaXMgY29pbiB0ZXJtXHJcbiAgICAgIGNvbGxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICBjb2luVGVybS50cmF2ZWxUb0Rlc3RpbmF0aW9uKCBuZXcgVmVjdG9yMihcclxuICAgICAgICB0aGlzLmJvdW5kcy5taW5YIC0gY29pblRlcm1WaWV3Qm91bmRzLndpZHRoIC0gUkVKRUNURURfSVRFTV9ESVNUQU5DRSwgdGhpcy5ib3VuZHMuZ2V0Q2VudGVyWSgpXHJcbiAgICAgICkgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaWduYWwgdGhlIHJlc3VsdHMgb2YgdGhpcyBjb2xsZWN0aW9uIGF0dGVtcHRcclxuICAgIHRoaXMuY29sbGVjdGlvbkF0dGVtcHRlZEVtaXR0ZXIuZW1pdCggY29sbGVjdGVkICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgaXNFbXB0eSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbGxlY3RlZEl0ZW1Qcm9wZXJ0eS5nZXQoKSA9PT0gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGVqZWN0IHRoZSBjdXJyZW50bHkgY29sbGVjdGVkIGV4cHJlc3Npb24sIG5vLW9wIGlmIG5vIGV4cHJlc3Npb24gaXMgY3VycmVudGx5IGNvbGxlY3RlZFxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBlamVjdENvbGxlY3RlZEl0ZW0oKSB7XHJcbiAgICBjb25zdCBjb2xsZWN0ZWRJdGVtID0gdGhpcy5jb2xsZWN0ZWRJdGVtUHJvcGVydHkuZ2V0KCk7XHJcbiAgICBsZXQgY29sbGVjdGVkSXRlbUJvdW5kcztcclxuICAgIGxldCB5RGVzdGluYXRpb247XHJcblxyXG4gICAgLy8gdGhlIGl0ZW0ncyBjb2xsZWN0ZWQgc3RhdGUgbXVzdCBiZSB1cGRhdGVkIGZpcnN0LCBzaW5jZSB0aGlzIGNhbiBzb21ldGltZXMgY2F1c2UgaXRzIGJvdW5kcyB0byBjaGFuZ2VcclxuICAgIGNvbGxlY3RlZEl0ZW0uY29sbGVjdGVkUHJvcGVydHkuc2V0KCBmYWxzZSApO1xyXG5cclxuICAgIC8vIGZpZ3VyZSBvdXQgdGhlIGRlc3RpbmF0aW9uLCB3aGljaCBpcyBzbGlnaHRseSBkaWZmZXJlbnQgZm9yIGNvaW4gdGVybXMgdmVyc3VzIGV4cHJlc3Npb25zXHJcbiAgICBpZiAoIGNvbGxlY3RlZEl0ZW0gaW5zdGFuY2VvZiBFeHByZXNzaW9uICkge1xyXG5cclxuICAgICAgY29sbGVjdGVkSXRlbUJvdW5kcyA9IGNvbGxlY3RlZEl0ZW0uZ2V0Qm91bmRzKCk7XHJcbiAgICAgIHlEZXN0aW5hdGlvbiA9IHRoaXMuYm91bmRzLmdldENlbnRlclkoKSAtIGNvbGxlY3RlZEl0ZW1Cb3VuZHMuaGVpZ2h0IC8gMjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBhc3NlcnQgJiYgYXNzZXJ0KCBjb2xsZWN0ZWRJdGVtIGluc3RhbmNlb2YgQ29pblRlcm0sICd1bmV4cGVjdGVkIGl0ZW0sIGNhbm5vdCByZWplY3QnICk7XHJcbiAgICAgIGNvbGxlY3RlZEl0ZW1Cb3VuZHMgPSBjb2xsZWN0ZWRJdGVtLmdldFZpZXdCb3VuZHMoKTtcclxuICAgICAgeURlc3RpbmF0aW9uID0gdGhpcy5ib3VuZHMuZ2V0Q2VudGVyWSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNlbmQgdGhlIGNvbGxlY3RlZCBpdGVtIG91dHNpZGUgb2YgdGhlIGNvbGxlY3Rpb24gYXJlYVxyXG4gICAgY29sbGVjdGVkSXRlbS50cmF2ZWxUb0Rlc3RpbmF0aW9uKCBuZXcgVmVjdG9yMihcclxuICAgICAgdGhpcy5ib3VuZHMubWluWCAtIGNvbGxlY3RlZEl0ZW1Cb3VuZHMud2lkdGggLSBSRUpFQ1RFRF9JVEVNX0RJU1RBTkNFLFxyXG4gICAgICB5RGVzdGluYXRpb25cclxuICAgICkgKTtcclxuXHJcbiAgICAvLyB1cGRhdGUgaW50ZXJuYWwgc3RhdGVcclxuICAgIHRoaXMuY29sbGVjdGVkSXRlbVByb3BlcnR5LnJlc2V0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgYSByZWZlcmVuY2UgdG8gdGhpcyBjb2xsZWN0aW9uIGFyZWEncyBtb2RlbCBib3VuZHMsIHRoZSByZXN1bHRzIHNob3VsZCBub3QgYmUgY2hhbmdlZCwgdGhpcyBleGlzdHMgdG8gYWxsb3dcclxuICAgKiBwb2x5bW9ycGhpc2ltIHdpdGggb3RoZXIgZW50aXRpZXMgd2hvc2UgYm91bmRzIGFyZSBjaGVja2VkXHJcbiAgICogQHJldHVybnMge0JvdW5kczJ9XHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIGdldEJvdW5kcygpIHtcclxuICAgIHJldHVybiB0aGlzLmJvdW5kcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlc2V0IHRoZSBjb2xsZWN0aW9uIGFyZWFcclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgcmVzZXQoKSB7XHJcbiAgICBpZiAoIHRoaXMuY29sbGVjdGVkSXRlbVByb3BlcnR5LmdldCgpICkge1xyXG4gICAgICB0aGlzLmNvbGxlY3RlZEl0ZW1Qcm9wZXJ0eS5nZXQoKS5jb2xsZWN0ZWRQcm9wZXJ0eS5zZXQoIGZhbHNlICk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbGxlY3RlZEl0ZW1Qcm9wZXJ0eS5yZXNldCgpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwcmVzc2lvbkV4Y2hhbmdlLnJlZ2lzdGVyKCAnRUVDb2xsZWN0aW9uQXJlYScsIEVFQ29sbGVjdGlvbkFyZWEgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVFQ29sbGVjdGlvbkFyZWE7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxPQUFPLE1BQU0sZ0NBQWdDO0FBQ3BELE9BQU9DLFFBQVEsTUFBTSxpQ0FBaUM7QUFDdEQsT0FBT0MsT0FBTyxNQUFNLCtCQUErQjtBQUNuRCxPQUFPQyxpQkFBaUIsTUFBTSxtQ0FBbUM7QUFDakUsT0FBT0MsUUFBUSxNQUFNLGdDQUFnQztBQUNyRCxPQUFPQyxVQUFVLE1BQU0sa0NBQWtDO0FBQ3pELE9BQU9DLGtCQUFrQixNQUFNLDZCQUE2Qjs7QUFFNUQ7QUFDQSxNQUFN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