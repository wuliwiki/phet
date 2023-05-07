// Copyright 2023, University of Colorado Boulder

/**
 * A Property that will contain a set of all ancestor Nodes of a given Node.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import TinyEmitter from '../../../axon/js/TinyEmitter.js';
import TinyProperty from '../../../axon/js/TinyProperty.js';
import { scenery } from '../imports.js';
export default class AncestorNodesProperty extends TinyProperty {
  // A set of nodes where we are listening to whether their parents change
  listenedNodeSet = new Set();
  // Fired whenever we need to update the internal value (i.e. a parent was added or removed somewhere in the chain)
  updateEmitter = new TinyEmitter();
  constructor(node) {
    super(new Set());
    this.node = node;
    this._nodeUpdateListener = this.update.bind(this);

    // Listen to our own parent changes too (even though we aren't an ancestor)
    this.addNodeListener(node);
    this.update();
  }
  areValuesEqual(a, b) {
    // Don't fire notifications if it hasn't changed.
    return a.size === b.size && _.every([...a], node => b.has(node));
  }
  update() {
    // Nodes that were touched in the scan (we should listen to changes to ANY of these to see if there is a connection
    // or disconnection). This could potentially cause our Property to change
    const nodeSet = new Set();

    // Recursively scan to identify all ancestors
    (function recurse(node) {
      const parents = node.parents;
      parents.forEach(parent => {
        nodeSet.add(parent);
        recurse(parent);
      });
    })(this.node);

    // Add in new needed listeners
    nodeSet.forEach(node => {
      if (!this.listenedNodeSet.has(node)) {
        this.addNodeListener(node);
      }
    });

    // Remove listeners not needed anymore
    this.listenedNodeSet.forEach(node => {
      // NOTE: do NOT remove the listener that is listening to our node for changes (it's not an ancestor, and won't
      // come up in this list)
      if (!nodeSet.has(node) && node !== this.node) {
        this.removeNodeListener(node);
      }
    });
    this.value = nodeSet;
    this.updateEmitter.emit();
  }
  addNodeListener(node) {
    this.listenedNodeSet.add(node);
    node.parentAddedEmitter.addListener(this._nodeUpdateListener);
    node.parentRemovedEmitter.addListener(this._nodeUpdateListener);
  }
  removeNodeListener(node) {
    this.listenedNodeSet.delete(node);
    node.parentAddedEmitter.removeListener(this._nodeUpdateListener);
    node.parentRemovedEmitter.removeListener(this._nodeUpdateListener);
  }
  dispose() {
    this.listenedNodeSet.forEach(node => this.removeNodeListener(node));
    super.dispose();
  }
}
scenery.register('AncestorNodesProperty', AncestorNodesProperty);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUaW55RW1pdHRlciIsIlRpbnlQcm9wZXJ0eSIsInNjZW5lcnkiLCJBbmNlc3Rvck5vZGVzUHJvcGVydHkiLCJsaXN0ZW5lZE5vZGVTZXQiLCJTZXQiLCJ1cGRhdGVFbWl0dGVyIiwiY29uc3RydWN0b3IiLCJub2RlIiwiX25vZGVVcGRhdGVMaXN0ZW5lciIsInVwZGF0ZSIsImJpbmQiLCJhZGROb2RlTGlzdGVuZXIiLCJhcmVWYWx1ZXNFcXVhbCIsImEiLCJiIiwic2l6ZSIsIl8iLCJldmVyeSIsImhhcyIsIm5vZGVTZXQiLCJyZWN1cnNlIiwicGFyZW50cyIsImZvckVhY2giLCJwYXJlbnQiLCJhZGQiLCJyZW1vdmVOb2RlTGlzdGVuZXIiLCJ2YWx1ZSIsImVtaXQiLCJwYXJlbnRBZGRlZEVtaXR0ZXIiLCJhZGRMaXN0ZW5lciIsInBhcmVudFJlbW92ZWRFbWl0dGVyIiwiZGVsZXRlIiwicmVtb3ZlTGlzdGVuZXIiLCJkaXNwb3NlIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJBbmNlc3Rvck5vZGVzUHJvcGVydHkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIEEgUHJvcGVydHkgdGhhdCB3aWxsIGNvbnRhaW4gYSBzZXQgb2YgYWxsIGFuY2VzdG9yIE5vZGVzIG9mIGEgZ2l2ZW4gTm9kZS5cclxuICpcclxuICogQGF1dGhvciBKb25hdGhhbiBPbHNvbiA8am9uYXRoYW4ub2xzb25AY29sb3JhZG8uZWR1PlxyXG4gKi9cclxuXHJcbmltcG9ydCBUaW55RW1pdHRlciBmcm9tICcuLi8uLi8uLi9heG9uL2pzL1RpbnlFbWl0dGVyLmpzJztcclxuaW1wb3J0IFRpbnlQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi9heG9uL2pzL1RpbnlQcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCB7IE5vZGUsIHNjZW5lcnkgfSBmcm9tICcuLi9pbXBvcnRzLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuY2VzdG9yTm9kZXNQcm9wZXJ0eSBleHRlbmRzIFRpbnlQcm9wZXJ0eTxTZXQ8Tm9kZT4+IHtcclxuXHJcbiAgLy8gQSBzZXQgb2Ygbm9kZXMgd2hlcmUgd2UgYXJlIGxpc3RlbmluZyB0byB3aGV0aGVyIHRoZWlyIHBhcmVudHMgY2hhbmdlXHJcbiAgcHJpdmF0ZSByZWFkb25seSBsaXN0ZW5lZE5vZGVTZXQgPSBuZXcgU2V0PE5vZGU+KCk7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgX25vZGVVcGRhdGVMaXN0ZW5lcjogKCkgPT4gdm9pZDtcclxuXHJcbiAgLy8gRmlyZWQgd2hlbmV2ZXIgd2UgbmVlZCB0byB1cGRhdGUgdGhlIGludGVybmFsIHZhbHVlIChpLmUuIGEgcGFyZW50IHdhcyBhZGRlZCBvciByZW1vdmVkIHNvbWV3aGVyZSBpbiB0aGUgY2hhaW4pXHJcbiAgcHVibGljIHJlYWRvbmx5IHVwZGF0ZUVtaXR0ZXIgPSBuZXcgVGlueUVtaXR0ZXIoKTtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBwdWJsaWMgcmVhZG9ubHkgbm9kZTogTm9kZSApIHtcclxuICAgIHN1cGVyKCBuZXcgU2V0KCkgKTtcclxuXHJcbiAgICB0aGlzLl9ub2RlVXBkYXRlTGlzdGVuZXIgPSB0aGlzLnVwZGF0ZS5iaW5kKCB0aGlzICk7XHJcblxyXG4gICAgLy8gTGlzdGVuIHRvIG91ciBvd24gcGFyZW50IGNoYW5nZXMgdG9vIChldmVuIHRob3VnaCB3ZSBhcmVuJ3QgYW4gYW5jZXN0b3IpXHJcbiAgICB0aGlzLmFkZE5vZGVMaXN0ZW5lciggbm9kZSApO1xyXG5cclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3ZlcnJpZGUgYXJlVmFsdWVzRXF1YWwoIGE6IFNldDxOb2RlPiwgYjogU2V0PE5vZGU+ICk6IGJvb2xlYW4ge1xyXG4gICAgLy8gRG9uJ3QgZmlyZSBub3RpZmljYXRpb25zIGlmIGl0IGhhc24ndCBjaGFuZ2VkLlxyXG4gICAgcmV0dXJuIGEuc2l6ZSA9PT0gYi5zaXplICYmIF8uZXZlcnkoIFsgLi4uYSBdLCBub2RlID0+IGIuaGFzKCBub2RlICkgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgLy8gTm9kZXMgdGhhdCB3ZXJlIHRvdWNoZWQgaW4gdGhlIHNjYW4gKHdlIHNob3VsZCBsaXN0ZW4gdG8gY2hhbmdlcyB0byBBTlkgb2YgdGhlc2UgdG8gc2VlIGlmIHRoZXJlIGlzIGEgY29ubmVjdGlvblxyXG4gICAgLy8gb3IgZGlzY29ubmVjdGlvbikuIFRoaXMgY291bGQgcG90ZW50aWFsbHkgY2F1c2Ugb3VyIFByb3BlcnR5IHRvIGNoYW5nZVxyXG4gICAgY29uc3Qgbm9kZVNldCA9IG5ldyBTZXQ8Tm9kZT4oKTtcclxuXHJcbiAgICAvLyBSZWN1cnNpdmVseSBzY2FuIHRvIGlkZW50aWZ5IGFsbCBhbmNlc3RvcnNcclxuICAgICggZnVuY3Rpb24gcmVjdXJzZSggbm9kZTogTm9kZSApIHtcclxuICAgICAgY29uc3QgcGFyZW50cyA9IG5vZGUucGFyZW50cztcclxuXHJcbiAgICAgIHBhcmVudHMuZm9yRWFjaCggcGFyZW50ID0+IHtcclxuICAgICAgICBub2RlU2V0LmFkZCggcGFyZW50ICk7XHJcbiAgICAgICAgcmVjdXJzZSggcGFyZW50ICk7XHJcbiAgICAgIH0gKTtcclxuICAgIH0gKSggdGhpcy5ub2RlICk7XHJcblxyXG4gICAgLy8gQWRkIGluIG5ldyBuZWVkZWQgbGlzdGVuZXJzXHJcbiAgICBub2RlU2V0LmZvckVhY2goIG5vZGUgPT4ge1xyXG4gICAgICBpZiAoICF0aGlzLmxpc3RlbmVkTm9kZVNldC5oYXMoIG5vZGUgKSApIHtcclxuICAgICAgICB0aGlzLmFkZE5vZGVMaXN0ZW5lciggbm9kZSApO1xyXG4gICAgICB9XHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGxpc3RlbmVycyBub3QgbmVlZGVkIGFueW1vcmVcclxuICAgIHRoaXMubGlzdGVuZWROb2RlU2V0LmZvckVhY2goIG5vZGUgPT4ge1xyXG4gICAgICAvLyBOT1RFOiBkbyBOT1QgcmVtb3ZlIHRoZSBsaXN0ZW5lciB0aGF0IGlzIGxpc3RlbmluZyB0byBvdXIgbm9kZSBmb3IgY2hhbmdlcyAoaXQncyBub3QgYW4gYW5jZXN0b3IsIGFuZCB3b24ndFxyXG4gICAgICAvLyBjb21lIHVwIGluIHRoaXMgbGlzdClcclxuICAgICAgaWYgKCAhbm9kZVNldC5oYXMoIG5vZGUgKSAmJiBub2RlICE9PSB0aGlzLm5vZGUgKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVOb2RlTGlzdGVuZXIoIG5vZGUgKTtcclxuICAgICAgfVxyXG4gICAgfSApO1xyXG5cclxuICAgIHRoaXMudmFsdWUgPSBub2RlU2V0O1xyXG5cclxuICAgIHRoaXMudXBkYXRlRW1pdHRlci5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZE5vZGVMaXN0ZW5lciggbm9kZTogTm9kZSApOiB2b2lkIHtcclxuICAgIHRoaXMubGlzdGVuZWROb2RlU2V0LmFkZCggbm9kZSApO1xyXG4gICAgbm9kZS5wYXJlbnRBZGRlZEVtaXR0ZXIuYWRkTGlzdGVuZXIoIHRoaXMuX25vZGVVcGRhdGVMaXN0ZW5lciApO1xyXG4gICAgbm9kZS5wYXJlbnRSZW1vdmVkRW1pdHRlci5hZGRMaXN0ZW5lciggdGhpcy5fbm9kZVVwZGF0ZUxpc3RlbmVyICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZU5vZGVMaXN0ZW5lciggbm9kZTogTm9kZSApOiB2b2lkIHtcclxuICAgIHRoaXMubGlzdGVuZWROb2RlU2V0LmRlbGV0ZSggbm9kZSApO1xyXG4gICAgbm9kZS5wYXJlbnRBZGRlZEVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoIHRoaXMuX25vZGVVcGRhdGVMaXN0ZW5lciApO1xyXG4gICAgbm9kZS5wYXJlbnRSZW1vdmVkRW1pdHRlci5yZW1vdmVMaXN0ZW5lciggdGhpcy5fbm9kZVVwZGF0ZUxpc3RlbmVyICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3ZlcnJpZGUgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubGlzdGVuZWROb2RlU2V0LmZvckVhY2goIG5vZGUgPT4gdGhpcy5yZW1vdmVOb2RlTGlzdGVuZXIoIG5vZGUgKSApO1xyXG5cclxuICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICB9XHJcbn1cclxuXHJcbnNjZW5lcnkucmVnaXN0ZXIoICdBbmNlc3Rvck5vZGVzUHJvcGVydHknLCBBbmNlc3Rvck5vZGVzUHJvcGVydHkgKTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFdBQVcsTUFBTSxpQ0FBaUM7QUFDekQsT0FBT0MsWUFBWSxNQUFNLGtDQUFrQztBQUMzRCxTQUFlQyxPQUFPLFFBQVEsZUFBZTtBQUU3QyxlQUFlLE1BQU1DLHFCQUFxQixTQUFTRixZQUFZLENBQVk7RUFFekU7RUFDaUJHLGVBQWUsR0FBRyxJQUFJQyxHQUFHLENBQU8sQ0FBQztFQUlsRDtFQUNnQkMsYUFBYSxHQUFHLElBQUlOLFdBQVcsQ0FBQyxDQUFDO0VBRTFDTyxXQUFXQSxDQUFrQkMsSUFBVSxFQUFHO0lBQy9DLEtBQUssQ0FBRSxJQUFJSCxHQUFHLENBQUMsQ0FBRSxDQUFDO0lBQUMsS0FEZUcsSUFBVSxHQUFWQSxJQUFVO0lBRzVDLElBQUksQ0FBQ0MsbUJBQW1CLEdBQUcsSUFBSSxDQUFDQyxNQUFNLENBQUNDLElBQUksQ0FBRSxJQUFLLENBQUM7O0lBRW5EO0lBQ0EsSUFBSSxDQUFDQyxlQUFlLENBQUVKLElBQUssQ0FBQztJQUU1QixJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDO0VBQ2Y7RUFFZ0JHLGNBQWNBLENBQUVDLENBQVksRUFBRUMsQ0FBWSxFQUFZO0lBQ3BFO0lBQ0EsT0FBT0QsQ0FBQyxDQUFDRSxJQUFJLEtBQUtELENBQUMsQ0FBQ0MsSUFBSSxJQUFJQyxDQUFDLENBQUNDLEtBQUssQ0FBRSxDQUFFLEdBQUdKLENBQUMsQ0FBRSxFQUFFTixJQUFJLElBQUlPLENBQUMsQ0FBQ0ksR0FBRyxDQUFFWCxJQUFLLENBQUUsQ0FBQztFQUN4RTtFQUVRRSxNQUFNQSxDQUFBLEVBQVM7SUFDckI7SUFDQTtJQUNBLE1BQU1VLE9BQU8sR0FBRyxJQUFJZixHQUFHLENBQU8sQ0FBQzs7SUFFL0I7SUFDQSxDQUFFLFNBQVNnQixPQUFPQSxDQUFFYixJQUFVLEVBQUc7TUFDL0IsTUFBTWMsT0FBTyxHQUFHZCxJQUFJLENBQUNjLE9BQU87TUFFNUJBLE9BQU8sQ0FBQ0MsT0FBTyxDQUFFQyxNQUFNLElBQUk7UUFDekJKLE9BQU8sQ0FBQ0ssR0FBRyxDQUFFRCxNQUFPLENBQUM7UUFDckJILE9BQU8sQ0FBRUcsTUFBTyxDQUFDO01BQ25CLENBQUUsQ0FBQztJQUNMLENBQUMsRUFBSSxJQUFJLENBQUNoQixJQUFLLENBQUM7O0lBRWhCO0lBQ0FZLE9BQU8sQ0FBQ0csT0FBTyxDQUFFZixJQUFJLElBQUk7TUFDdkIsSUFBSyxDQUFDLElBQUksQ0FBQ0osZUFBZSxDQUFDZSxHQUFHLENBQUVYLElBQUssQ0FBQyxFQUFHO1FBQ3ZDLElBQUksQ0FBQ0ksZUFBZSxDQUFFSixJQUFLLENBQUM7TUFDOUI7SUFDRixDQUFFLENBQUM7O0lBRUg7SUFDQSxJQUFJLENBQUNKLGVBQWUsQ0FBQ21CLE9BQU8sQ0FBRWYsSUFBSSxJQUFJO01BQ3BDO01BQ0E7TUFDQSxJQUFLLENBQUNZLE9BQU8sQ0FBQ0QsR0FBRyxDQUFFWCxJQUFLLENBQUMsSUFBSUEsSUFBSSxLQUFLLElBQUksQ0FBQ0EsSUFBSSxFQUFHO1FBQ2hELElBQUksQ0FBQ2tCLGtCQUFrQixDQUFFbEIsSUFBSyxDQUFDO01BQ2pDO0lBQ0YsQ0FBRSxDQUFDO0lBRUgsSUFBSSxDQUFDbUIsS0FBSyxHQUFHUCxPQUFPO0lBRXBCLElBQUksQ0FBQ2QsYUFBYSxDQUFDc0IsSUFBSSxDQUFDLENBQUM7RUFDM0I7RUFFUWhCLGVBQWVBLENBQUVKLElBQVUsRUFBUztJQUMxQyxJQUFJLENBQUNKLGVBQWUsQ0FBQ3FCLEdBQUcsQ0FBRWpCLElBQUssQ0FBQztJQUNoQ0EsSUFBSSxDQUFDcUIsa0JBQWtCLENBQUNDLFdBQVcsQ0FBRSxJQUFJLENBQUNyQixtQkFBb0IsQ0FBQztJQUMvREQsSUFBSSxDQUFDdUIsb0JBQW9CLENBQUNELFdBQVcsQ0FBRSxJQUFJLENBQUNyQixtQkFBb0IsQ0FBQztFQUNuRTtFQUVRaUIsa0JBQWtCQSxDQUFFbEIsSUFBVSxFQUFTO0lBQzdDLElBQUksQ0FBQ0osZUFBZSxDQUFDNEIsTUFBTSxDQUFFeEIsSUFBSyxDQUFDO0lBQ25DQSxJQUFJLENBQUNxQixrQkFBa0IsQ0FBQ0ksY0FBYyxDQUFFLElBQUksQ0FBQ3hCLG1CQUFvQixDQUFDO0lBQ2xFRCxJQUFJLENBQUN1QixvQkFBb0IsQ0FBQ0UsY0FBYyxDQUFFLElBQUksQ0FBQ3hCLG1CQUFvQixDQUFDO0VBQ3RFO0VBRWdCeUIsT0FBT0EsQ0FBQSxFQUFTO0lBQzlCLElBQUksQ0FBQzlCLGVBQWUsQ0FBQ21CLE9BQU8sQ0FBRWYsSUFBSSxJQUFJLElBQUksQ0FBQ2tCLGtCQUFrQixDQUFFbEIsSUFBSyxDQUFFLENBQUM7SUFFdkUsS0FBSyxDQUFDMEIsT0FBTyxDQUFDLENBQUM7RUFDakI7QUFDRjtBQUVBaEMsT0FBTyxDQUFDaUMsUUFBUSxDQUFFLHVCQUF1QixFQUFFaEMscUJBQXNCLENBQUMifQ==