// Copyright 2020-2022, University of Colorado Boulder

/**
 * A lightweight version of Property (that satisfies some of the interface), meant for high-performance applications
 * where validation, phet-io support and other things are not needed. This includes additional logic for conditionally
 * forwarding to/from another Property.
 *
 * Please note that TinyForwardingProperty exclusively supports settable Properties
 * via its TypeScript implementation. If you want to use a read-only Property as the target, please type cast as settable
 * and use runtime assertions to ensure that the target (or this forwarding Property) are not set. See examples like
 * Node.setVisibleProperty.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import axon from './axon.js';
import Property from './Property.js';
import ReadOnlyProperty from './ReadOnlyProperty.js';
import TinyProperty from './TinyProperty.js';
import { isTReadOnlyProperty } from './TReadOnlyProperty.js';
export default class TinyForwardingProperty extends TinyProperty {
  // Set in setTargetProperty()

  // Set lazily in setTargetProperty()

  // TinyProperty is not instrumented for PhET-iO, so when a Node is instrumented, by default, an instrumented
  // `Property` can be forwarded to. This field stores the default instrumented Property when
  // targetPropertyInstrumented is true. - Public for NodeTests
  // when true, automatically set up a PhET-iO instrumented forwarded Property for this TinyProperty, see
  // this.initializePhetioObject() for usage.
  // Guard against double initialization
  constructor(value, targetPropertyInstrumented, onBeforeNotify) {
    super(value, onBeforeNotify);
    if (targetPropertyInstrumented) {
      this.targetPropertyInstrumented = targetPropertyInstrumented;
    }
    if (assert) {
      this.phetioInitialized = false;
    }
  }

  // API support for setting a Property|ValueType onto the forwarding Property
  setValueOrTargetProperty(node, tandemName, newValueOrTargetProperty) {
    if (isTReadOnlyProperty(newValueOrTargetProperty)) {
      // As a new Property
      this.setTargetProperty(node, tandemName, newValueOrTargetProperty);
    } else {
      // as a ValueType
      const oldValue = this.get();
      this.clearTargetProperty();
      assert && assert(!this.targetProperty, 'just cleared');

      // If we're switching away from a targetProperty, prefer no notification (so set our value to the last value)
      this.setPropertyValue(newValueOrTargetProperty);

      // Changing forwarding target COULD change the value, so send notifications if this is the case.
      if (!this.areValuesEqual(oldValue, newValueOrTargetProperty)) {
        this.notifyListeners(oldValue);
      }
    }
  }

  /**
   * Sets (or unsets if `null` is provided) the Property that we use for forwarding changes.
   *
   * @param node - The container of TinyForwardingProperty which supports updateLinkedElementForProperty()
   * @param tandemName - null if the Property does not support PhET-iO instrumentation
   * @param newTargetProperty - null to "unset" forwarding.
   * @returns the passed in Node, for chaining.
   */
  setTargetProperty(node, tandemName, newTargetProperty) {
    assert && node && tandemName === null && this.targetPropertyInstrumented && assert(!node.isPhetioInstrumented(), 'tandemName must be provided for instrumented Nodes');

    // no-op if we are already forwarding to that property OR if we still aren't forwarding
    if (this.targetProperty === newTargetProperty) {
      return node; // for chaining
    }

    const currentForwardingPropertyInstrumented = this.targetProperty && this.targetProperty instanceof ReadOnlyProperty && this.targetProperty.isPhetioInstrumented();
    assert && currentForwardingPropertyInstrumented && assert(newTargetProperty && newTargetProperty instanceof ReadOnlyProperty && newTargetProperty.isPhetioInstrumented(), 'Cannot set swap out a PhET-iO instrumented targetProperty for an uninstrumented one');

    // We need this information eagerly for later on in the function
    const previousTarget = this.targetProperty;

    // If we had the "default instrumented" Property, we'll remove that and then link our new Property. Guard on the fact
    // that ownedPhetioProperty is added via this exact method, see this.initializePhetio() for details
    // Do this before adding a PhET-iO LinkedElement because ownedPhetioProperty has the same phetioID as the LinkedElement
    if (this.ownedPhetioProperty && newTargetProperty !== this.ownedPhetioProperty) {
      this.disposeOwnedPhetioProperty();
    }
    node && tandemName !== null && node.updateLinkedElementForProperty(tandemName, previousTarget, newTargetProperty);
    const oldValue = this.get();
    this.clearTargetProperty();
    this.targetProperty = newTargetProperty;
    if (this.targetProperty) {
      assert && assert(this.forwardingListener, 'forwardingListener is not set yet');
      this.targetProperty.lazyLink(this.forwardingListener);
      this.setPropertyValue(this.targetProperty.value);
    } else {
      // If we're switching away from a targetProperty, prefer no notification (so set our value to the last value)
      this.setPropertyValue(oldValue);
    }

    // Changing forwarding target COULD change the value, so send notifications if this is the case.
    if (!this.areValuesEqual(oldValue, this.get())) {
      this.notifyListeners(oldValue);
    }
    return node; // for chaining
  }

  clearTargetProperty() {
    // Lazily set this value, it will be added as a listener to any targetProperty we have.
    this.forwardingListener = this.forwardingListener || this.onTargetPropertyChange.bind(this);
    if (this.targetProperty) {
      this.targetProperty.unlink(this.forwardingListener);
    }
    this.targetProperty = null;
  }

  /**
   * Notify this Property's listeners when the targetProperty changes.
   * For performance, keep this listener on the prototype.
   */
  onTargetPropertyChange(value) {
    super.set(value);
  }

  /**
   * Sets the value and notifies listeners, unless deferred or disposed. You can also use the es5 getter
   * (property.value) but this means is provided for inner loops or internal code that must be fast. If the value
   * hasn't changed, this is a no-op.
   */
  set(value) {
    if (this.targetProperty) {
      assert && assert(this.targetProperty.isSettable(), 'targetProperty must be settable');
      this.targetProperty.set(value);
    } else {
      super.set(value);
    }
    return this;
  }

  /**
   * Use this to automatically create a forwarded, PhET-iO instrumented Property owned by this TinyForwardingProperty.
   */
  setTargetPropertyInstrumented(targetPropertyInstrumented, node) {
    // See Node.initializePhetioObject for more details on this assertion
    assert && assert(!node.isPhetioInstrumented(), 'this option only works if it is passed in before this Node is instrumented');
    this.targetPropertyInstrumented = targetPropertyInstrumented;
    return node;
  }
  getTargetPropertyInstrumented() {
    return this.targetPropertyInstrumented || false;
  }

  /**
   * @param node - the parent container that supports updateLinkedElementForProperty()
   * @param tandemName
   * @param createProperty - creates an "owned" Property
   */
  initializePhetio(node, tandemName, createProperty) {
    assert && assert(!this.phetioInitialized, 'already initialized');
    assert && assert(!this.ownedPhetioProperty, 'Already created the ownedPhetioProperty');
    if (!this.targetProperty && this.targetPropertyInstrumented) {
      this.ownedPhetioProperty = createProperty();
      assert && assert(this.ownedPhetioProperty instanceof Property, 'The owned property should be an AXON/Property');
      assert && assert(this.ownedPhetioProperty instanceof ReadOnlyProperty && this.ownedPhetioProperty.isPhetioInstrumented(), 'The owned property should be PhET-iO instrumented');
      this.setTargetProperty(node, tandemName, this.ownedPhetioProperty);
    } else if (this.targetProperty && this.targetProperty instanceof ReadOnlyProperty && this.targetProperty.isPhetioInstrumented()) {
      // If the Property was already set, now that it is instrumented, add a LinkedElement for it.
      node.updateLinkedElementForProperty(tandemName, null, this.targetProperty);
    }
    if (assert) {
      this.phetioInitialized = true;
    }
  }

  /**
   * This currently also involves deleting the field.
   */
  disposeOwnedPhetioProperty() {
    if (this.ownedPhetioProperty) {
      this.ownedPhetioProperty.dispose();
      delete this.ownedPhetioProperty; // back to original value
    }
  }

  dispose() {
    this.clearTargetProperty();
    this.disposeOwnedPhetioProperty();
    super.dispose();
  }
}
axon.register('TinyForwardingProperty', TinyForwardingProperty);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJheG9uIiwiUHJvcGVydHkiLCJSZWFkT25seVByb3BlcnR5IiwiVGlueVByb3BlcnR5IiwiaXNUUmVhZE9ubHlQcm9wZXJ0eSIsIlRpbnlGb3J3YXJkaW5nUHJvcGVydHkiLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwidGFyZ2V0UHJvcGVydHlJbnN0cnVtZW50ZWQiLCJvbkJlZm9yZU5vdGlmeSIsImFzc2VydCIsInBoZXRpb0luaXRpYWxpemVkIiwic2V0VmFsdWVPclRhcmdldFByb3BlcnR5Iiwibm9kZSIsInRhbmRlbU5hbWUiLCJuZXdWYWx1ZU9yVGFyZ2V0UHJvcGVydHkiLCJzZXRUYXJnZXRQcm9wZXJ0eSIsIm9sZFZhbHVlIiwiZ2V0IiwiY2xlYXJUYXJnZXRQcm9wZXJ0eSIsInRhcmdldFByb3BlcnR5Iiwic2V0UHJvcGVydHlWYWx1ZSIsImFyZVZhbHVlc0VxdWFsIiwibm90aWZ5TGlzdGVuZXJzIiwibmV3VGFyZ2V0UHJvcGVydHkiLCJpc1BoZXRpb0luc3RydW1lbnRlZCIsImN1cnJlbnRGb3J3YXJkaW5nUHJvcGVydHlJbnN0cnVtZW50ZWQiLCJwcmV2aW91c1RhcmdldCIsIm93bmVkUGhldGlvUHJvcGVydHkiLCJkaXNwb3NlT3duZWRQaGV0aW9Qcm9wZXJ0eSIsInVwZGF0ZUxpbmtlZEVsZW1lbnRGb3JQcm9wZXJ0eSIsImZvcndhcmRpbmdMaXN0ZW5lciIsImxhenlMaW5rIiwib25UYXJnZXRQcm9wZXJ0eUNoYW5nZSIsImJpbmQiLCJ1bmxpbmsiLCJzZXQiLCJpc1NldHRhYmxlIiwic2V0VGFyZ2V0UHJvcGVydHlJbnN0cnVtZW50ZWQiLCJnZXRUYXJnZXRQcm9wZXJ0eUluc3RydW1lbnRlZCIsImluaXRpYWxpemVQaGV0aW8iLCJjcmVhdGVQcm9wZXJ0eSIsImRpc3Bvc2UiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlRpbnlGb3J3YXJkaW5nUHJvcGVydHkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogQSBsaWdodHdlaWdodCB2ZXJzaW9uIG9mIFByb3BlcnR5ICh0aGF0IHNhdGlzZmllcyBzb21lIG9mIHRoZSBpbnRlcmZhY2UpLCBtZWFudCBmb3IgaGlnaC1wZXJmb3JtYW5jZSBhcHBsaWNhdGlvbnNcclxuICogd2hlcmUgdmFsaWRhdGlvbiwgcGhldC1pbyBzdXBwb3J0IGFuZCBvdGhlciB0aGluZ3MgYXJlIG5vdCBuZWVkZWQuIFRoaXMgaW5jbHVkZXMgYWRkaXRpb25hbCBsb2dpYyBmb3IgY29uZGl0aW9uYWxseVxyXG4gKiBmb3J3YXJkaW5nIHRvL2Zyb20gYW5vdGhlciBQcm9wZXJ0eS5cclxuICpcclxuICogUGxlYXNlIG5vdGUgdGhhdCBUaW55Rm9yd2FyZGluZ1Byb3BlcnR5IGV4Y2x1c2l2ZWx5IHN1cHBvcnRzIHNldHRhYmxlIFByb3BlcnRpZXNcclxuICogdmlhIGl0cyBUeXBlU2NyaXB0IGltcGxlbWVudGF0aW9uLiBJZiB5b3Ugd2FudCB0byB1c2UgYSByZWFkLW9ubHkgUHJvcGVydHkgYXMgdGhlIHRhcmdldCwgcGxlYXNlIHR5cGUgY2FzdCBhcyBzZXR0YWJsZVxyXG4gKiBhbmQgdXNlIHJ1bnRpbWUgYXNzZXJ0aW9ucyB0byBlbnN1cmUgdGhhdCB0aGUgdGFyZ2V0IChvciB0aGlzIGZvcndhcmRpbmcgUHJvcGVydHkpIGFyZSBub3Qgc2V0LiBTZWUgZXhhbXBsZXMgbGlrZVxyXG4gKiBOb2RlLnNldFZpc2libGVQcm9wZXJ0eS5cclxuICpcclxuICogQGF1dGhvciBTYW0gUmVpZCAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICogQGF1dGhvciBNaWNoYWVsIEthdXptYW5uIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKiBAYXV0aG9yIEpvbmF0aGFuIE9sc29uIDxqb25hdGhhbi5vbHNvbkBjb2xvcmFkby5lZHU+XHJcbiAqL1xyXG5cclxuaW1wb3J0IGF4b24gZnJvbSAnLi9heG9uLmpzJztcclxuaW1wb3J0IFByb3BlcnR5IGZyb20gJy4vUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgUmVhZE9ubHlQcm9wZXJ0eSBmcm9tICcuL1JlYWRPbmx5UHJvcGVydHkuanMnO1xyXG5pbXBvcnQgVGlueVByb3BlcnR5LCB7IFRpbnlQcm9wZXJ0eU9uQmVmb3JlTm90aWZ5IH0gZnJvbSAnLi9UaW55UHJvcGVydHkuanMnO1xyXG5pbXBvcnQgVFByb3BlcnR5IGZyb20gJy4vVFByb3BlcnR5LmpzJztcclxuaW1wb3J0IFRSZWFkT25seVByb3BlcnR5LCB7IGlzVFJlYWRPbmx5UHJvcGVydHksIFByb3BlcnR5TGF6eUxpbmtMaXN0ZW5lciB9IGZyb20gJy4vVFJlYWRPbmx5UHJvcGVydHkuanMnO1xyXG5cclxudHlwZSBOb2RlTGlrZSA9IHtcclxuICB1cGRhdGVMaW5rZWRFbGVtZW50Rm9yUHJvcGVydHk6IDxWYWx1ZVR5cGU+KCB0YW5kZW1OYW1lOiBzdHJpbmcsIG9sZFByb3BlcnR5PzogVFByb3BlcnR5PFZhbHVlVHlwZT4gfCBudWxsLCBuZXdQcm9wZXJ0eT86IFRQcm9wZXJ0eTxWYWx1ZVR5cGU+IHwgbnVsbCApID0+IHZvaWQ7XHJcbiAgaXNQaGV0aW9JbnN0cnVtZW50ZWQ6ICgpID0+IGJvb2xlYW47XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW55Rm9yd2FyZGluZ1Byb3BlcnR5PFZhbHVlVHlwZT4gZXh0ZW5kcyBUaW55UHJvcGVydHk8VmFsdWVUeXBlPiB7XHJcblxyXG4gIC8vIFNldCBpbiBzZXRUYXJnZXRQcm9wZXJ0eSgpXHJcbiAgcHJpdmF0ZSB0YXJnZXRQcm9wZXJ0eT86IFRQcm9wZXJ0eTxWYWx1ZVR5cGU+IHwgbnVsbDtcclxuXHJcbiAgLy8gU2V0IGxhemlseSBpbiBzZXRUYXJnZXRQcm9wZXJ0eSgpXHJcbiAgcHJvdGVjdGVkIGZvcndhcmRpbmdMaXN0ZW5lcj86IFByb3BlcnR5TGF6eUxpbmtMaXN0ZW5lcjxWYWx1ZVR5cGU+O1xyXG5cclxuICAvLyBUaW55UHJvcGVydHkgaXMgbm90IGluc3RydW1lbnRlZCBmb3IgUGhFVC1pTywgc28gd2hlbiBhIE5vZGUgaXMgaW5zdHJ1bWVudGVkLCBieSBkZWZhdWx0LCBhbiBpbnN0cnVtZW50ZWRcclxuICAvLyBgUHJvcGVydHlgIGNhbiBiZSBmb3J3YXJkZWQgdG8uIFRoaXMgZmllbGQgc3RvcmVzIHRoZSBkZWZhdWx0IGluc3RydW1lbnRlZCBQcm9wZXJ0eSB3aGVuXHJcbiAgLy8gdGFyZ2V0UHJvcGVydHlJbnN0cnVtZW50ZWQgaXMgdHJ1ZS4gLSBQdWJsaWMgZm9yIE5vZGVUZXN0c1xyXG4gIHByaXZhdGUgb3duZWRQaGV0aW9Qcm9wZXJ0eT86IFRQcm9wZXJ0eTxWYWx1ZVR5cGU+O1xyXG5cclxuICAvLyB3aGVuIHRydWUsIGF1dG9tYXRpY2FsbHkgc2V0IHVwIGEgUGhFVC1pTyBpbnN0cnVtZW50ZWQgZm9yd2FyZGVkIFByb3BlcnR5IGZvciB0aGlzIFRpbnlQcm9wZXJ0eSwgc2VlXHJcbiAgLy8gdGhpcy5pbml0aWFsaXplUGhldGlvT2JqZWN0KCkgZm9yIHVzYWdlLlxyXG4gIHByaXZhdGUgdGFyZ2V0UHJvcGVydHlJbnN0cnVtZW50ZWQ/OiBib29sZWFuO1xyXG5cclxuICAvLyBHdWFyZCBhZ2FpbnN0IGRvdWJsZSBpbml0aWFsaXphdGlvblxyXG4gIHByaXZhdGUgcGhldGlvSW5pdGlhbGl6ZWQ/OiBib29sZWFuO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIHZhbHVlOiBWYWx1ZVR5cGUsIHRhcmdldFByb3BlcnR5SW5zdHJ1bWVudGVkOiBib29sZWFuLCBvbkJlZm9yZU5vdGlmeT86IFRpbnlQcm9wZXJ0eU9uQmVmb3JlTm90aWZ5PFZhbHVlVHlwZT4gKSB7XHJcbiAgICBzdXBlciggdmFsdWUsIG9uQmVmb3JlTm90aWZ5ICk7XHJcblxyXG4gICAgaWYgKCB0YXJnZXRQcm9wZXJ0eUluc3RydW1lbnRlZCApIHtcclxuICAgICAgdGhpcy50YXJnZXRQcm9wZXJ0eUluc3RydW1lbnRlZCA9IHRhcmdldFByb3BlcnR5SW5zdHJ1bWVudGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggYXNzZXJ0ICkge1xyXG4gICAgICB0aGlzLnBoZXRpb0luaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBBUEkgc3VwcG9ydCBmb3Igc2V0dGluZyBhIFByb3BlcnR5fFZhbHVlVHlwZSBvbnRvIHRoZSBmb3J3YXJkaW5nIFByb3BlcnR5XHJcbiAgcHVibGljIHNldFZhbHVlT3JUYXJnZXRQcm9wZXJ0eTxOb2RlVHlwZSBleHRlbmRzIE5vZGVMaWtlLCBOb2RlUGFyYW0gZXh0ZW5kcyAoIE5vZGVUeXBlIHwgbnVsbCApPihcclxuICAgIG5vZGU6IE5vZGVQYXJhbSwgdGFuZGVtTmFtZTogc3RyaW5nIHwgbnVsbCwgbmV3VmFsdWVPclRhcmdldFByb3BlcnR5OiBUUmVhZE9ubHlQcm9wZXJ0eTxWYWx1ZVR5cGU+IHwgVmFsdWVUeXBlICk6IHZvaWQge1xyXG5cclxuICAgIGlmICggKCBpc1RSZWFkT25seVByb3BlcnR5KCBuZXdWYWx1ZU9yVGFyZ2V0UHJvcGVydHkgKSApICkge1xyXG5cclxuICAgICAgLy8gQXMgYSBuZXcgUHJvcGVydHlcclxuICAgICAgdGhpcy5zZXRUYXJnZXRQcm9wZXJ0eSggbm9kZSwgdGFuZGVtTmFtZSwgbmV3VmFsdWVPclRhcmdldFByb3BlcnR5IGFzIFRQcm9wZXJ0eTxWYWx1ZVR5cGU+ICk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHsgLy8gYXMgYSBWYWx1ZVR5cGVcclxuICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLmdldCgpO1xyXG5cclxuICAgICAgdGhpcy5jbGVhclRhcmdldFByb3BlcnR5KCk7XHJcblxyXG4gICAgICBhc3NlcnQgJiYgYXNzZXJ0KCAhdGhpcy50YXJnZXRQcm9wZXJ0eSwgJ2p1c3QgY2xlYXJlZCcgKTtcclxuXHJcbiAgICAgIC8vIElmIHdlJ3JlIHN3aXRjaGluZyBhd2F5IGZyb20gYSB0YXJnZXRQcm9wZXJ0eSwgcHJlZmVyIG5vIG5vdGlmaWNhdGlvbiAoc28gc2V0IG91ciB2YWx1ZSB0byB0aGUgbGFzdCB2YWx1ZSlcclxuICAgICAgdGhpcy5zZXRQcm9wZXJ0eVZhbHVlKCBuZXdWYWx1ZU9yVGFyZ2V0UHJvcGVydHkgKTtcclxuXHJcbiAgICAgIC8vIENoYW5naW5nIGZvcndhcmRpbmcgdGFyZ2V0IENPVUxEIGNoYW5nZSB0aGUgdmFsdWUsIHNvIHNlbmQgbm90aWZpY2F0aW9ucyBpZiB0aGlzIGlzIHRoZSBjYXNlLlxyXG4gICAgICBpZiAoICF0aGlzLmFyZVZhbHVlc0VxdWFsKCBvbGRWYWx1ZSwgbmV3VmFsdWVPclRhcmdldFByb3BlcnR5ICkgKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnlMaXN0ZW5lcnMoIG9sZFZhbHVlICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgKG9yIHVuc2V0cyBpZiBgbnVsbGAgaXMgcHJvdmlkZWQpIHRoZSBQcm9wZXJ0eSB0aGF0IHdlIHVzZSBmb3IgZm9yd2FyZGluZyBjaGFuZ2VzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG5vZGUgLSBUaGUgY29udGFpbmVyIG9mIFRpbnlGb3J3YXJkaW5nUHJvcGVydHkgd2hpY2ggc3VwcG9ydHMgdXBkYXRlTGlua2VkRWxlbWVudEZvclByb3BlcnR5KClcclxuICAgKiBAcGFyYW0gdGFuZGVtTmFtZSAtIG51bGwgaWYgdGhlIFByb3BlcnR5IGRvZXMgbm90IHN1cHBvcnQgUGhFVC1pTyBpbnN0cnVtZW50YXRpb25cclxuICAgKiBAcGFyYW0gbmV3VGFyZ2V0UHJvcGVydHkgLSBudWxsIHRvIFwidW5zZXRcIiBmb3J3YXJkaW5nLlxyXG4gICAqIEByZXR1cm5zIHRoZSBwYXNzZWQgaW4gTm9kZSwgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRUYXJnZXRQcm9wZXJ0eTxOb2RlVHlwZSBleHRlbmRzIE5vZGVMaWtlLCBOb2RlUGFyYW0gZXh0ZW5kcyAoIE5vZGVUeXBlIHwgbnVsbCApPiggbm9kZTogTm9kZVBhcmFtLCB0YW5kZW1OYW1lOiBzdHJpbmcgfCBudWxsLCBuZXdUYXJnZXRQcm9wZXJ0eTogVFByb3BlcnR5PFZhbHVlVHlwZT4gfCBudWxsICk6IE5vZGVQYXJhbSB7XHJcbiAgICBhc3NlcnQgJiYgbm9kZSAmJiB0YW5kZW1OYW1lID09PSBudWxsICYmIHRoaXMudGFyZ2V0UHJvcGVydHlJbnN0cnVtZW50ZWQgJiYgYXNzZXJ0KCAhbm9kZS5pc1BoZXRpb0luc3RydW1lbnRlZCgpLCAndGFuZGVtTmFtZSBtdXN0IGJlIHByb3ZpZGVkIGZvciBpbnN0cnVtZW50ZWQgTm9kZXMnICk7XHJcblxyXG4gICAgLy8gbm8tb3AgaWYgd2UgYXJlIGFscmVhZHkgZm9yd2FyZGluZyB0byB0aGF0IHByb3BlcnR5IE9SIGlmIHdlIHN0aWxsIGFyZW4ndCBmb3J3YXJkaW5nXHJcbiAgICBpZiAoIHRoaXMudGFyZ2V0UHJvcGVydHkgPT09IG5ld1RhcmdldFByb3BlcnR5ICkge1xyXG4gICAgICByZXR1cm4gbm9kZTsgLy8gZm9yIGNoYWluaW5nXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY3VycmVudEZvcndhcmRpbmdQcm9wZXJ0eUluc3RydW1lbnRlZCA9IHRoaXMudGFyZ2V0UHJvcGVydHkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldFByb3BlcnR5IGluc3RhbmNlb2YgUmVhZE9ubHlQcm9wZXJ0eSAmJiB0aGlzLnRhcmdldFByb3BlcnR5LmlzUGhldGlvSW5zdHJ1bWVudGVkKCk7XHJcbiAgICBhc3NlcnQgJiYgY3VycmVudEZvcndhcmRpbmdQcm9wZXJ0eUluc3RydW1lbnRlZCAmJiBhc3NlcnQoIG5ld1RhcmdldFByb3BlcnR5ICYmIG5ld1RhcmdldFByb3BlcnR5IGluc3RhbmNlb2YgUmVhZE9ubHlQcm9wZXJ0eSAmJiBuZXdUYXJnZXRQcm9wZXJ0eS5pc1BoZXRpb0luc3RydW1lbnRlZCgpLFxyXG4gICAgICAnQ2Fubm90IHNldCBzd2FwIG91dCBhIFBoRVQtaU8gaW5zdHJ1bWVudGVkIHRhcmdldFByb3BlcnR5IGZvciBhbiB1bmluc3RydW1lbnRlZCBvbmUnICk7XHJcblxyXG4gICAgLy8gV2UgbmVlZCB0aGlzIGluZm9ybWF0aW9uIGVhZ2VybHkgZm9yIGxhdGVyIG9uIGluIHRoZSBmdW5jdGlvblxyXG4gICAgY29uc3QgcHJldmlvdXNUYXJnZXQgPSB0aGlzLnRhcmdldFByb3BlcnR5O1xyXG5cclxuICAgIC8vIElmIHdlIGhhZCB0aGUgXCJkZWZhdWx0IGluc3RydW1lbnRlZFwiIFByb3BlcnR5LCB3ZSdsbCByZW1vdmUgdGhhdCBhbmQgdGhlbiBsaW5rIG91ciBuZXcgUHJvcGVydHkuIEd1YXJkIG9uIHRoZSBmYWN0XHJcbiAgICAvLyB0aGF0IG93bmVkUGhldGlvUHJvcGVydHkgaXMgYWRkZWQgdmlhIHRoaXMgZXhhY3QgbWV0aG9kLCBzZWUgdGhpcy5pbml0aWFsaXplUGhldGlvKCkgZm9yIGRldGFpbHNcclxuICAgIC8vIERvIHRoaXMgYmVmb3JlIGFkZGluZyBhIFBoRVQtaU8gTGlua2VkRWxlbWVudCBiZWNhdXNlIG93bmVkUGhldGlvUHJvcGVydHkgaGFzIHRoZSBzYW1lIHBoZXRpb0lEIGFzIHRoZSBMaW5rZWRFbGVtZW50XHJcbiAgICBpZiAoIHRoaXMub3duZWRQaGV0aW9Qcm9wZXJ0eSAmJiBuZXdUYXJnZXRQcm9wZXJ0eSAhPT0gdGhpcy5vd25lZFBoZXRpb1Byb3BlcnR5ICkge1xyXG4gICAgICB0aGlzLmRpc3Bvc2VPd25lZFBoZXRpb1Byb3BlcnR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbm9kZSAmJiB0YW5kZW1OYW1lICE9PSBudWxsICYmIG5vZGUudXBkYXRlTGlua2VkRWxlbWVudEZvclByb3BlcnR5KCB0YW5kZW1OYW1lLCBwcmV2aW91c1RhcmdldCwgbmV3VGFyZ2V0UHJvcGVydHkgKTtcclxuXHJcbiAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuZ2V0KCk7XHJcblxyXG4gICAgdGhpcy5jbGVhclRhcmdldFByb3BlcnR5KCk7XHJcblxyXG4gICAgdGhpcy50YXJnZXRQcm9wZXJ0eSA9IG5ld1RhcmdldFByb3BlcnR5O1xyXG5cclxuICAgIGlmICggdGhpcy50YXJnZXRQcm9wZXJ0eSApIHtcclxuICAgICAgYXNzZXJ0ICYmIGFzc2VydCggdGhpcy5mb3J3YXJkaW5nTGlzdGVuZXIsICdmb3J3YXJkaW5nTGlzdGVuZXIgaXMgbm90IHNldCB5ZXQnICk7XHJcbiAgICAgIHRoaXMudGFyZ2V0UHJvcGVydHkubGF6eUxpbmsoIHRoaXMuZm9yd2FyZGluZ0xpc3RlbmVyISApO1xyXG4gICAgICB0aGlzLnNldFByb3BlcnR5VmFsdWUoIHRoaXMudGFyZ2V0UHJvcGVydHkudmFsdWUgKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAvLyBJZiB3ZSdyZSBzd2l0Y2hpbmcgYXdheSBmcm9tIGEgdGFyZ2V0UHJvcGVydHksIHByZWZlciBubyBub3RpZmljYXRpb24gKHNvIHNldCBvdXIgdmFsdWUgdG8gdGhlIGxhc3QgdmFsdWUpXHJcbiAgICAgIHRoaXMuc2V0UHJvcGVydHlWYWx1ZSggb2xkVmFsdWUgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGFuZ2luZyBmb3J3YXJkaW5nIHRhcmdldCBDT1VMRCBjaGFuZ2UgdGhlIHZhbHVlLCBzbyBzZW5kIG5vdGlmaWNhdGlvbnMgaWYgdGhpcyBpcyB0aGUgY2FzZS5cclxuICAgIGlmICggIXRoaXMuYXJlVmFsdWVzRXF1YWwoIG9sZFZhbHVlLCB0aGlzLmdldCgpICkgKSB7XHJcbiAgICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKCBvbGRWYWx1ZSApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBub2RlOyAvLyBmb3IgY2hhaW5pbmdcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xlYXJUYXJnZXRQcm9wZXJ0eSgpOiB2b2lkIHtcclxuXHJcbiAgICAvLyBMYXppbHkgc2V0IHRoaXMgdmFsdWUsIGl0IHdpbGwgYmUgYWRkZWQgYXMgYSBsaXN0ZW5lciB0byBhbnkgdGFyZ2V0UHJvcGVydHkgd2UgaGF2ZS5cclxuICAgIHRoaXMuZm9yd2FyZGluZ0xpc3RlbmVyID0gdGhpcy5mb3J3YXJkaW5nTGlzdGVuZXIgfHwgdGhpcy5vblRhcmdldFByb3BlcnR5Q2hhbmdlLmJpbmQoIHRoaXMgKTtcclxuXHJcbiAgICBpZiAoIHRoaXMudGFyZ2V0UHJvcGVydHkgKSB7XHJcbiAgICAgIHRoaXMudGFyZ2V0UHJvcGVydHkudW5saW5rKCB0aGlzLmZvcndhcmRpbmdMaXN0ZW5lciApO1xyXG4gICAgfVxyXG4gICAgdGhpcy50YXJnZXRQcm9wZXJ0eSA9IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBOb3RpZnkgdGhpcyBQcm9wZXJ0eSdzIGxpc3RlbmVycyB3aGVuIHRoZSB0YXJnZXRQcm9wZXJ0eSBjaGFuZ2VzLlxyXG4gICAqIEZvciBwZXJmb3JtYW5jZSwga2VlcCB0aGlzIGxpc3RlbmVyIG9uIHRoZSBwcm90b3R5cGUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblRhcmdldFByb3BlcnR5Q2hhbmdlKCB2YWx1ZTogVmFsdWVUeXBlICk6IHZvaWQge1xyXG4gICAgc3VwZXIuc2V0KCB2YWx1ZSApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdmFsdWUgYW5kIG5vdGlmaWVzIGxpc3RlbmVycywgdW5sZXNzIGRlZmVycmVkIG9yIGRpc3Bvc2VkLiBZb3UgY2FuIGFsc28gdXNlIHRoZSBlczUgZ2V0dGVyXHJcbiAgICogKHByb3BlcnR5LnZhbHVlKSBidXQgdGhpcyBtZWFucyBpcyBwcm92aWRlZCBmb3IgaW5uZXIgbG9vcHMgb3IgaW50ZXJuYWwgY29kZSB0aGF0IG11c3QgYmUgZmFzdC4gSWYgdGhlIHZhbHVlXHJcbiAgICogaGFzbid0IGNoYW5nZWQsIHRoaXMgaXMgYSBuby1vcC5cclxuICAgKi9cclxuICBwdWJsaWMgb3ZlcnJpZGUgc2V0KCB2YWx1ZTogVmFsdWVUeXBlICk6IHRoaXMge1xyXG4gICAgaWYgKCB0aGlzLnRhcmdldFByb3BlcnR5ICkge1xyXG4gICAgICBhc3NlcnQgJiYgYXNzZXJ0KCB0aGlzLnRhcmdldFByb3BlcnR5LmlzU2V0dGFibGUoKSwgJ3RhcmdldFByb3BlcnR5IG11c3QgYmUgc2V0dGFibGUnICk7XHJcbiAgICAgIHRoaXMudGFyZ2V0UHJvcGVydHkuc2V0KCB2YWx1ZSApO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHN1cGVyLnNldCggdmFsdWUgKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgdG8gYXV0b21hdGljYWxseSBjcmVhdGUgYSBmb3J3YXJkZWQsIFBoRVQtaU8gaW5zdHJ1bWVudGVkIFByb3BlcnR5IG93bmVkIGJ5IHRoaXMgVGlueUZvcndhcmRpbmdQcm9wZXJ0eS5cclxuICAgKi9cclxuICBwdWJsaWMgc2V0VGFyZ2V0UHJvcGVydHlJbnN0cnVtZW50ZWQ8Tm9kZVR5cGUgZXh0ZW5kcyBOb2RlTGlrZT4oIHRhcmdldFByb3BlcnR5SW5zdHJ1bWVudGVkOiBib29sZWFuLCBub2RlOiBOb2RlVHlwZSApOiBOb2RlVHlwZSB7XHJcblxyXG4gICAgLy8gU2VlIE5vZGUuaW5pdGlhbGl6ZVBoZXRpb09iamVjdCBmb3IgbW9yZSBkZXRhaWxzIG9uIHRoaXMgYXNzZXJ0aW9uXHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCAhbm9kZS5pc1BoZXRpb0luc3RydW1lbnRlZCgpLCAndGhpcyBvcHRpb24gb25seSB3b3JrcyBpZiBpdCBpcyBwYXNzZWQgaW4gYmVmb3JlIHRoaXMgTm9kZSBpcyBpbnN0cnVtZW50ZWQnICk7XHJcblxyXG4gICAgdGhpcy50YXJnZXRQcm9wZXJ0eUluc3RydW1lbnRlZCA9IHRhcmdldFByb3BlcnR5SW5zdHJ1bWVudGVkO1xyXG5cclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFRhcmdldFByb3BlcnR5SW5zdHJ1bWVudGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMudGFyZ2V0UHJvcGVydHlJbnN0cnVtZW50ZWQgfHwgZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gbm9kZSAtIHRoZSBwYXJlbnQgY29udGFpbmVyIHRoYXQgc3VwcG9ydHMgdXBkYXRlTGlua2VkRWxlbWVudEZvclByb3BlcnR5KClcclxuICAgKiBAcGFyYW0gdGFuZGVtTmFtZVxyXG4gICAqIEBwYXJhbSBjcmVhdGVQcm9wZXJ0eSAtIGNyZWF0ZXMgYW4gXCJvd25lZFwiIFByb3BlcnR5XHJcbiAgICovXHJcbiAgcHVibGljIGluaXRpYWxpemVQaGV0aW8oIG5vZGU6IE5vZGVMaWtlLCB0YW5kZW1OYW1lOiBzdHJpbmcsIGNyZWF0ZVByb3BlcnR5OiAoKSA9PiBUUHJvcGVydHk8VmFsdWVUeXBlPiApOiB2b2lkIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoICF0aGlzLnBoZXRpb0luaXRpYWxpemVkLCAnYWxyZWFkeSBpbml0aWFsaXplZCcgKTtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoICF0aGlzLm93bmVkUGhldGlvUHJvcGVydHksICdBbHJlYWR5IGNyZWF0ZWQgdGhlIG93bmVkUGhldGlvUHJvcGVydHknICk7XHJcblxyXG4gICAgaWYgKCAhdGhpcy50YXJnZXRQcm9wZXJ0eSAmJiB0aGlzLnRhcmdldFByb3BlcnR5SW5zdHJ1bWVudGVkICkge1xyXG5cclxuICAgICAgdGhpcy5vd25lZFBoZXRpb1Byb3BlcnR5ID0gY3JlYXRlUHJvcGVydHkoKTtcclxuICAgICAgYXNzZXJ0ICYmIGFzc2VydCggdGhpcy5vd25lZFBoZXRpb1Byb3BlcnR5IGluc3RhbmNlb2YgUHJvcGVydHksICdUaGUgb3duZWQgcHJvcGVydHkgc2hvdWxkIGJlIGFuIEFYT04vUHJvcGVydHknICk7XHJcbiAgICAgIGFzc2VydCAmJiBhc3NlcnQoIHRoaXMub3duZWRQaGV0aW9Qcm9wZXJ0eSBpbnN0YW5jZW9mIFJlYWRPbmx5UHJvcGVydHkgJiYgdGhpcy5vd25lZFBoZXRpb1Byb3BlcnR5LmlzUGhldGlvSW5zdHJ1bWVudGVkKCksICdUaGUgb3duZWQgcHJvcGVydHkgc2hvdWxkIGJlIFBoRVQtaU8gaW5zdHJ1bWVudGVkJyApO1xyXG5cclxuICAgICAgdGhpcy5zZXRUYXJnZXRQcm9wZXJ0eSggbm9kZSwgdGFuZGVtTmFtZSwgdGhpcy5vd25lZFBoZXRpb1Byb3BlcnR5ICk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICggdGhpcy50YXJnZXRQcm9wZXJ0eSAmJiB0aGlzLnRhcmdldFByb3BlcnR5IGluc3RhbmNlb2YgUmVhZE9ubHlQcm9wZXJ0eSAmJiB0aGlzLnRhcmdldFByb3BlcnR5LmlzUGhldGlvSW5zdHJ1bWVudGVkKCkgKSB7XHJcblxyXG4gICAgICAvLyBJZiB0aGUgUHJvcGVydHkgd2FzIGFscmVhZHkgc2V0LCBub3cgdGhhdCBpdCBpcyBpbnN0cnVtZW50ZWQsIGFkZCBhIExpbmtlZEVsZW1lbnQgZm9yIGl0LlxyXG4gICAgICBub2RlLnVwZGF0ZUxpbmtlZEVsZW1lbnRGb3JQcm9wZXJ0eSggdGFuZGVtTmFtZSwgbnVsbCwgdGhpcy50YXJnZXRQcm9wZXJ0eSApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggYXNzZXJ0ICkge1xyXG4gICAgICB0aGlzLnBoZXRpb0luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgY3VycmVudGx5IGFsc28gaW52b2x2ZXMgZGVsZXRpbmcgdGhlIGZpZWxkLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGlzcG9zZU93bmVkUGhldGlvUHJvcGVydHkoKTogdm9pZCB7XHJcbiAgICBpZiAoIHRoaXMub3duZWRQaGV0aW9Qcm9wZXJ0eSApIHtcclxuICAgICAgdGhpcy5vd25lZFBoZXRpb1Byb3BlcnR5LmRpc3Bvc2UoKTtcclxuICAgICAgZGVsZXRlIHRoaXMub3duZWRQaGV0aW9Qcm9wZXJ0eTsgLy8gYmFjayB0byBvcmlnaW5hbCB2YWx1ZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG92ZXJyaWRlIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsZWFyVGFyZ2V0UHJvcGVydHkoKTtcclxuICAgIHRoaXMuZGlzcG9zZU93bmVkUGhldGlvUHJvcGVydHkoKTtcclxuICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICB9XHJcbn1cclxuXHJcbmF4b24ucmVnaXN0ZXIoICdUaW55Rm9yd2FyZGluZ1Byb3BlcnR5JywgVGlueUZvcndhcmRpbmdQcm9wZXJ0eSApO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsSUFBSSxNQUFNLFdBQVc7QUFDNUIsT0FBT0MsUUFBUSxNQUFNLGVBQWU7QUFDcEMsT0FBT0MsZ0JBQWdCLE1BQU0sdUJBQXVCO0FBQ3BELE9BQU9DLFlBQVksTUFBc0MsbUJBQW1CO0FBRTVFLFNBQTRCQyxtQkFBbUIsUUFBa0Msd0JBQXdCO0FBT3pHLGVBQWUsTUFBTUMsc0JBQXNCLFNBQW9CRixZQUFZLENBQVk7RUFFckY7O0VBR0E7O0VBR0E7RUFDQTtFQUNBO0VBR0E7RUFDQTtFQUdBO0VBR09HLFdBQVdBLENBQUVDLEtBQWdCLEVBQUVDLDBCQUFtQyxFQUFFQyxjQUFzRCxFQUFHO0lBQ2xJLEtBQUssQ0FBRUYsS0FBSyxFQUFFRSxjQUFlLENBQUM7SUFFOUIsSUFBS0QsMEJBQTBCLEVBQUc7TUFDaEMsSUFBSSxDQUFDQSwwQkFBMEIsR0FBR0EsMEJBQTBCO0lBQzlEO0lBRUEsSUFBS0UsTUFBTSxFQUFHO01BQ1osSUFBSSxDQUFDQyxpQkFBaUIsR0FBRyxLQUFLO0lBQ2hDO0VBQ0Y7O0VBRUE7RUFDT0Msd0JBQXdCQSxDQUM3QkMsSUFBZSxF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