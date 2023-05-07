// Copyright 2014-2022, University of Colorado Boulder

/**
 * Basic model for a push button, including over/down/enabled properties.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author John Blanco (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import CallbackTimer from '../../../axon/js/CallbackTimer.js';
import Emitter from '../../../axon/js/Emitter.js';
import optionize from '../../../phet-core/js/optionize.js';
import EventType from '../../../tandem/js/EventType.js';
import PhetioObject from '../../../tandem/js/PhetioObject.js';
import Tandem from '../../../tandem/js/Tandem.js';
import sun from '../sun.js';
import ButtonModel from './ButtonModel.js';
export default class PushButtonModel extends ButtonModel {
  // used by ResetAllButton to call functions during reset start/end

  // sends out notifications when the button is released.

  constructor(providedOptions) {
    const options = optionize()({
      fireOnDown: false,
      listener: null,
      fireOnHold: false,
      fireOnHoldDelay: 400,
      fireOnHoldInterval: 100,
      tandem: Tandem.REQUIRED,
      phetioReadOnly: PhetioObject.DEFAULT_OPTIONS.phetioReadOnly
    }, providedOptions);
    super(options);
    this.isFiringProperty = new BooleanProperty(false);
    this.firedEmitter = new Emitter({
      tandem: options.tandem.createTandem('firedEmitter'),
      phetioDocumentation: 'Emits when the button is fired',
      phetioReadOnly: options.phetioReadOnly,
      phetioEventType: EventType.USER
    });
    if (options.listener !== null) {
      this.firedEmitter.addListener(options.listener);
    }

    // Create a timer to handle the optional fire-on-hold feature.
    // When that feature is enabled, calling this.fire is delegated to the timer.
    if (options.fireOnHold) {
      this.timer = new CallbackTimer({
        callback: this.fire.bind(this),
        delay: options.fireOnHoldDelay,
        interval: options.fireOnHoldInterval
      });
    }

    // Point down
    const downPropertyObserver = down => {
      if (down) {
        if (this.enabledProperty.get()) {
          if (options.fireOnDown) {
            this.fire();
          }
          if (this.timer) {
            this.timer.start();
          }
          if (options.fireOnDown || this.timer) {
            this.produceSoundEmitter.emit();
          }
        }
      } else {
        // should the button fire?
        const fire = !options.fireOnDown && (this.overProperty.get() || this.focusedProperty.get()) && this.enabledProperty.get() && !this.interrupted;
        if (this.timer) {
          this.timer.stop(fire);
        } else if (fire) {
          // Produce sound before firing, in case firing causes the disposal of this PushButtonModel
          this.produceSoundEmitter.emit();
          this.fire();
        }
      }
    };
    this.downProperty.link(downPropertyObserver);

    // Stop the timer when the button is disabled.
    const enabledPropertyObserver = enabled => {
      if (!enabled && this.timer) {
        this.timer.stop(false); // Stop the timer, don't fire if we haven't already
      }
    };

    this.enabledProperty.link(enabledPropertyObserver);
    this.disposePushButtonModel = () => {
      // If the button was firing, we must complete the PhET-iO transaction before disposing.
      // see https://github.com/phetsims/energy-skate-park-basics/issues/380
      this.isFiringProperty.value = false;
      this.isFiringProperty.dispose();
      this.firedEmitter.dispose();
      this.downProperty.unlink(downPropertyObserver);
      this.enabledProperty.unlink(enabledPropertyObserver);
      if (this.timer) {
        this.timer.dispose();
        this.timer = null;
      }
    };
  }
  dispose() {
    this.disposePushButtonModel();
    super.dispose();
  }

  /**
   * Adds a listener. If already a listener, this is a no-op.
   * @param listener - function called when the button is pressed, no args
   */
  addListener(listener) {
    this.firedEmitter.addListener(listener);
  }

  /**
   * Removes a listener. If not a listener, this is a no-op.
   */
  removeListener(listener) {
    this.firedEmitter.removeListener(listener);
  }

  /**
   * Fires all listeners.  Public for phet-io and a11y use.
   */
  fire() {
    // Make sure the button is not already firing, see https://github.com/phetsims/energy-skate-park-basics/issues/380
    assert && assert(!this.isFiringProperty.value, 'Cannot fire when already firing');
    this.isFiringProperty.value = true;
    this.firedEmitter.emit();
    this.isFiringProperty.value = false;
  }
}
sun.register('PushButtonModel', PushButtonModel);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCb29sZWFuUHJvcGVydHkiLCJDYWxsYmFja1RpbWVyIiwiRW1pdHRlciIsIm9wdGlvbml6ZSIsIkV2ZW50VHlwZSIsIlBoZXRpb09iamVjdCIsIlRhbmRlbSIsInN1biIsIkJ1dHRvbk1vZGVsIiwiUHVzaEJ1dHRvbk1vZGVsIiwiY29uc3RydWN0b3IiLCJwcm92aWRlZE9wdGlvbnMiLCJvcHRpb25zIiwiZmlyZU9uRG93biIsImxpc3RlbmVyIiwiZmlyZU9uSG9sZCIsImZpcmVPbkhvbGREZWxheSIsImZpcmVPbkhvbGRJbnRlcnZhbCIsInRhbmRlbSIsIlJFUVVJUkVEIiwicGhldGlvUmVhZE9ubHkiLCJERUZBVUxUX09QVElPTlMiLCJpc0ZpcmluZ1Byb3BlcnR5IiwiZmlyZWRFbWl0dGVyIiwiY3JlYXRlVGFuZGVtIiwicGhldGlvRG9jdW1lbnRhdGlvbiIsInBoZXRpb0V2ZW50VHlwZSIsIlVTRVIiLCJhZGRMaXN0ZW5lciIsInRpbWVyIiwiY2FsbGJhY2siLCJmaXJlIiwiYmluZCIsImRlbGF5IiwiaW50ZXJ2YWwiLCJkb3duUHJvcGVydHlPYnNlcnZlciIsImRvd24iLCJlbmFibGVkUHJvcGVydHkiLCJnZXQiLCJzdGFydCIsInByb2R1Y2VTb3VuZEVtaXR0ZXIiLCJlbWl0Iiwib3ZlclByb3BlcnR5IiwiZm9jdXNlZFByb3BlcnR5IiwiaW50ZXJydXB0ZWQiLCJzdG9wIiwiZG93blByb3BlcnR5IiwibGluayIsImVuYWJsZWRQcm9wZXJ0eU9ic2VydmVyIiwiZW5hYmxlZCIsImRpc3Bvc2VQdXNoQnV0dG9uTW9kZWwiLCJ2YWx1ZSIsImRpc3Bvc2UiLCJ1bmxpbmsiLCJyZW1vdmVMaXN0ZW5lciIsImFzc2VydCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiUHVzaEJ1dHRvbk1vZGVsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE0LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIEJhc2ljIG1vZGVsIGZvciBhIHB1c2ggYnV0dG9uLCBpbmNsdWRpbmcgb3Zlci9kb3duL2VuYWJsZWQgcHJvcGVydGllcy5cclxuICpcclxuICogQGF1dGhvciBTYW0gUmVpZCAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICogQGF1dGhvciBKb2huIEJsYW5jbyAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgQm9vbGVhblByb3BlcnR5IGZyb20gJy4uLy4uLy4uL2F4b24vanMvQm9vbGVhblByb3BlcnR5LmpzJztcclxuaW1wb3J0IENhbGxiYWNrVGltZXIgZnJvbSAnLi4vLi4vLi4vYXhvbi9qcy9DYWxsYmFja1RpbWVyLmpzJztcclxuaW1wb3J0IEVtaXR0ZXIgZnJvbSAnLi4vLi4vLi4vYXhvbi9qcy9FbWl0dGVyLmpzJztcclxuaW1wb3J0IFRFbWl0dGVyIGZyb20gJy4uLy4uLy4uL2F4b24vanMvVEVtaXR0ZXIuanMnO1xyXG5pbXBvcnQgUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vYXhvbi9qcy9Qcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBvcHRpb25pemUgZnJvbSAnLi4vLi4vLi4vcGhldC1jb3JlL2pzL29wdGlvbml6ZS5qcyc7XHJcbmltcG9ydCBFdmVudFR5cGUgZnJvbSAnLi4vLi4vLi4vdGFuZGVtL2pzL0V2ZW50VHlwZS5qcyc7XHJcbmltcG9ydCBQaGV0aW9PYmplY3QgZnJvbSAnLi4vLi4vLi4vdGFuZGVtL2pzL1BoZXRpb09iamVjdC5qcyc7XHJcbmltcG9ydCBUYW5kZW0gZnJvbSAnLi4vLi4vLi4vdGFuZGVtL2pzL1RhbmRlbS5qcyc7XHJcbmltcG9ydCBzdW4gZnJvbSAnLi4vc3VuLmpzJztcclxuaW1wb3J0IEJ1dHRvbk1vZGVsLCB7IEJ1dHRvbk1vZGVsT3B0aW9ucyB9IGZyb20gJy4vQnV0dG9uTW9kZWwuanMnO1xyXG5cclxuZXhwb3J0IHR5cGUgUHVzaEJ1dHRvbkxpc3RlbmVyID0gKCkgPT4gdm9pZDtcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSB7XHJcblxyXG4gIC8vIHRydWU6IGZpcmUgb24gcG9pbnRlciBkb3duOyBmYWxzZTogZmlyZSBvbiBwb2ludGVyIHVwIGlmIHBvaW50ZXIgaXMgb3ZlciBidXR0b25cclxuICBmaXJlT25Eb3duPzogYm9vbGVhbjtcclxuXHJcbiAgLy8gY29udmVuaWVuY2UgZm9yIGFkZGluZyAxIGxpc3RlbmVyLCBubyBhcmdzXHJcbiAgbGlzdGVuZXI/OiBQdXNoQnV0dG9uTGlzdGVuZXIgfCBudWxsO1xyXG5cclxuICAvLyBmaXJlLW9uLWhvbGQgZmVhdHVyZVxyXG4gIC8vIFRPRE86IHRoZXNlIG9wdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCBQRE9NIGludGVyYWN0aW9uLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3BoZXRzaW1zL3NjZW5lcnkvaXNzdWVzLzExMTdcclxuICBmaXJlT25Ib2xkPzogYm9vbGVhbjsgLy8gaXMgdGhlIGZpcmUtb24taG9sZCBmZWF0dXJlIGVuYWJsZWQ/XHJcbiAgZmlyZU9uSG9sZERlbGF5PzogbnVtYmVyOyAvLyBzdGFydCB0byBmaXJlIGNvbnRpbnVvdXNseSBhZnRlciBwcmVzc2luZyBmb3IgdGhpcyBsb25nIChtaWxsaXNlY29uZHMpXHJcbiAgZmlyZU9uSG9sZEludGVydmFsPzogbnVtYmVyOyAvLyBmaXJlIGNvbnRpbnVvdXNseSBhdCB0aGlzIGludGVydmFsIChtaWxsaXNlY29uZHMpLCBzYW1lIGRlZmF1bHQgYXMgaW4gQnV0dG9uTW9kZWxcclxuXHJcbiAgLy8gdG8gc3VwcG9ydCBwcm9wZXJseSBwYXNzaW5nIHRoaXMgdG8gY2hpbGRyZW4sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vcGhldHNpbXMvdGFuZGVtL2lzc3Vlcy82MFxyXG4gIHBoZXRpb1JlYWRPbmx5PzogYm9vbGVhbjtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFB1c2hCdXR0b25Nb2RlbE9wdGlvbnMgPSBTZWxmT3B0aW9ucyAmIEJ1dHRvbk1vZGVsT3B0aW9ucztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1c2hCdXR0b25Nb2RlbCBleHRlbmRzIEJ1dHRvbk1vZGVsIHtcclxuXHJcbiAgLy8gdXNlZCBieSBSZXNldEFsbEJ1dHRvbiB0byBjYWxsIGZ1bmN0aW9ucyBkdXJpbmcgcmVzZXQgc3RhcnQvZW5kXHJcbiAgcHVibGljIHJlYWRvbmx5IGlzRmlyaW5nUHJvcGVydHk6IFByb3BlcnR5PGJvb2xlYW4+O1xyXG5cclxuICAvLyBzZW5kcyBvdXQgbm90aWZpY2F0aW9ucyB3aGVuIHRoZSBidXR0b24gaXMgcmVsZWFzZWQuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBmaXJlZEVtaXR0ZXI6IFRFbWl0dGVyO1xyXG5cclxuICBwcml2YXRlIHRpbWVyPzogQ2FsbGJhY2tUaW1lciB8IG51bGw7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgZGlzcG9zZVB1c2hCdXR0b25Nb2RlbDogKCkgPT4gdm9pZDtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBwcm92aWRlZE9wdGlvbnM/OiBQdXNoQnV0dG9uTW9kZWxPcHRpb25zICkge1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25pemU8UHVzaEJ1dHRvbk1vZGVsT3B0aW9ucywgU2VsZk9wdGlvbnMsIEJ1dHRvbk1vZGVsT3B0aW9ucz4oKSgge1xyXG5cclxuICAgICAgZmlyZU9uRG93bjogZmFsc2UsXHJcbiAgICAgIGxpc3RlbmVyOiBudWxsLFxyXG4gICAgICBmaXJlT25Ib2xkOiBmYWxzZSxcclxuICAgICAgZmlyZU9uSG9sZERlbGF5OiA0MDAsXHJcbiAgICAgIGZpcmVPbkhvbGRJbnRlcnZhbDogMTAwLFxyXG5cclxuICAgICAgdGFuZGVtOiBUYW5kZW0uUkVRVUlSRUQsXHJcbiAgICAgIHBoZXRpb1JlYWRPbmx5OiBQaGV0aW9PYmplY3QuREVGQVVMVF9PUFRJT05TLnBoZXRpb1JlYWRPbmx5XHJcbiAgICB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICBzdXBlciggb3B0aW9ucyApO1xyXG5cclxuICAgIHRoaXMuaXNGaXJpbmdQcm9wZXJ0eSA9IG5ldyBCb29sZWFuUHJvcGVydHkoIGZhbHNlICk7XHJcblxyXG4gICAgdGhpcy5maXJlZEVtaXR0ZXIgPSBuZXcgRW1pdHRlcigge1xyXG4gICAgICB0YW5kZW06IG9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ2ZpcmVkRW1pdHRlcicgKSxcclxuICAgICAgcGhldGlvRG9jdW1lbnRhdGlvbjogJ0VtaXRzIHdoZW4gdGhlIGJ1dHRvbiBpcyBmaXJlZCcsXHJcbiAgICAgIHBoZXRpb1JlYWRPbmx5OiBvcHRpb25zLnBoZXRpb1JlYWRPbmx5LFxyXG4gICAgICBwaGV0aW9FdmVudFR5cGU6IEV2ZW50VHlwZS5VU0VSXHJcbiAgICB9ICk7XHJcbiAgICBpZiAoIG9wdGlvbnMubGlzdGVuZXIgIT09IG51bGwgKSB7XHJcbiAgICAgIHRoaXMuZmlyZWRFbWl0dGVyLmFkZExpc3RlbmVyKCBvcHRpb25zLmxpc3RlbmVyICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ3JlYXRlIGEgdGltZXIgdG8gaGFuZGxlIHRoZSBvcHRpb25hbCBmaXJlLW9uLWhvbGQgZmVhdHVyZS5cclxuICAgIC8vIFdoZW4gdGhhdCBmZWF0dXJlIGlzIGVuYWJsZWQsIGNhbGxpbmcgdGhpcy5maXJlIGlzIGRlbGVnYXRlZCB0byB0aGUgdGltZXIuXHJcbiAgICBpZiAoIG9wdGlvbnMuZmlyZU9uSG9sZCApIHtcclxuICAgICAgdGhpcy50aW1lciA9IG5ldyBDYWxsYmFja1RpbWVyKCB7XHJcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuZmlyZS5iaW5kKCB0aGlzICksXHJcbiAgICAgICAgZGVsYXk6IG9wdGlvbnMuZmlyZU9uSG9sZERlbGF5LFxyXG4gICAgICAgIGludGVydmFsOiBvcHRpb25zLmZpcmVPbkhvbGRJbnRlcnZhbFxyXG4gICAgICB9ICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUG9pbnQgZG93blxyXG4gICAgY29uc3QgZG93blByb3BlcnR5T2JzZXJ2ZXIgPSAoIGRvd246IGJvb2xlYW4gKSA9PiB7XHJcbiAgICAgIGlmICggZG93biApIHtcclxuICAgICAgICBpZiAoIHRoaXMuZW5hYmxlZFByb3BlcnR5LmdldCgpICkge1xyXG4gICAgICAgICAgaWYgKCBvcHRpb25zLmZpcmVPbkRvd24gKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCB0aGlzLnRpbWVyICkge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyLnN0YXJ0KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIG9wdGlvbnMuZmlyZU9uRG93biB8fCB0aGlzLnRpbWVyICkge1xyXG4gICAgICAgICAgICB0aGlzLnByb2R1Y2VTb3VuZEVtaXR0ZXIuZW1pdCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgLy8gc2hvdWxkIHRoZSBidXR0b24gZmlyZT9cclxuICAgICAgICBjb25zdCBmaXJlID0gKCAhb3B0aW9ucy5maXJlT25Eb3duICYmICggdGhpcy5vdmVyUHJvcGVydHkuZ2V0KCkgfHwgdGhpcy5mb2N1c2VkUHJvcGVydHkuZ2V0KCkgKSAmJiB0aGlzLmVuYWJsZWRQcm9wZXJ0eS5nZXQoKSAmJiAhdGhpcy5pbnRlcnJ1cHRlZCApO1xyXG4gICAgICAgIGlmICggdGhpcy50aW1lciApIHtcclxuICAgICAgICAgIHRoaXMudGltZXIuc3RvcCggZmlyZSApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICggZmlyZSApIHtcclxuXHJcbiAgICAgICAgICAvLyBQcm9kdWNlIHNvdW5kIGJlZm9yZSBmaXJpbmcsIGluIGNhc2UgZmlyaW5nIGNhdXNlcyB0aGUgZGlzcG9zYWwgb2YgdGhpcyBQdXNoQnV0dG9uTW9kZWxcclxuICAgICAgICAgIHRoaXMucHJvZHVjZVNvdW5kRW1pdHRlci5lbWl0KCk7XHJcbiAgICAgICAgICB0aGlzLmZpcmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGlzLmRvd25Qcm9wZXJ0eS5saW5rKCBkb3duUHJvcGVydHlPYnNlcnZlciApO1xyXG5cclxuICAgIC8vIFN0b3AgdGhlIHRpbWVyIHdoZW4gdGhlIGJ1dHRvbiBpcyBkaXNhYmxlZC5cclxuICAgIGNvbnN0IGVuYWJsZWRQcm9wZXJ0eU9ic2VydmVyID0gKCBlbmFibGVkOiBib29sZWFuICkgPT4ge1xyXG4gICAgICBpZiAoICFlbmFibGVkICYmIHRoaXMudGltZXIgKSB7XHJcbiAgICAgICAgdGhpcy50aW1lci5zdG9wKCBmYWxzZSApOyAvLyBTdG9wIHRoZSB0aW1lciwgZG9uJ3QgZmlyZSBpZiB3ZSBoYXZlbid0IGFscmVhZHlcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoaXMuZW5hYmxlZFByb3BlcnR5LmxpbmsoIGVuYWJsZWRQcm9wZXJ0eU9ic2VydmVyICk7XHJcblxyXG4gICAgdGhpcy5kaXNwb3NlUHVzaEJ1dHRvbk1vZGVsID0gKCkgPT4ge1xyXG5cclxuICAgICAgLy8gSWYgdGhlIGJ1dHRvbiB3YXMgZmlyaW5nLCB3ZSBtdXN0IGNvbXBsZXRlIHRoZSBQaEVULWlPIHRyYW5zYWN0aW9uIGJlZm9yZSBkaXNwb3NpbmcuXHJcbiAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vcGhldHNpbXMvZW5lcmd5LXNrYXRlLXBhcmstYmFzaWNzL2lzc3Vlcy8zODBcclxuICAgICAgdGhpcy5pc0ZpcmluZ1Byb3BlcnR5LnZhbHVlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaXNGaXJpbmdQcm9wZXJ0eS5kaXNwb3NlKCk7XHJcbiAgICAgIHRoaXMuZmlyZWRFbWl0dGVyLmRpc3Bvc2UoKTtcclxuICAgICAgdGhpcy5kb3duUHJvcGVydHkudW5saW5rKCBkb3duUHJvcGVydHlPYnNlcnZlciApO1xyXG4gICAgICB0aGlzLmVuYWJsZWRQcm9wZXJ0eS51bmxpbmsoIGVuYWJsZWRQcm9wZXJ0eU9ic2VydmVyICk7XHJcbiAgICAgIGlmICggdGhpcy50aW1lciApIHtcclxuICAgICAgICB0aGlzLnRpbWVyLmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLnRpbWVyID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvdmVycmlkZSBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kaXNwb3NlUHVzaEJ1dHRvbk1vZGVsKCk7XHJcbiAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgbGlzdGVuZXIuIElmIGFscmVhZHkgYSBsaXN0ZW5lciwgdGhpcyBpcyBhIG5vLW9wLlxyXG4gICAqIEBwYXJhbSBsaXN0ZW5lciAtIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIHRoZSBidXR0b24gaXMgcHJlc3NlZCwgbm8gYXJnc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBhZGRMaXN0ZW5lciggbGlzdGVuZXI6IFB1c2hCdXR0b25MaXN0ZW5lciApOiB2b2lkIHtcclxuICAgIHRoaXMuZmlyZWRFbWl0dGVyLmFkZExpc3RlbmVyKCBsaXN0ZW5lciApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhIGxpc3RlbmVyLiBJZiBub3QgYSBsaXN0ZW5lciwgdGhpcyBpcyBhIG5vLW9wLlxyXG4gICAqL1xyXG4gIHB1YmxpYyByZW1vdmVMaXN0ZW5lciggbGlzdGVuZXI6IFB1c2hCdXR0b25MaXN0ZW5lciApOiB2b2lkIHtcclxuICAgIHRoaXMuZmlyZWRFbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCBsaXN0ZW5lciApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmlyZXMgYWxsIGxpc3RlbmVycy4gIFB1YmxpYyBmb3IgcGhldC1pbyBhbmQgYTExeSB1c2UuXHJcbiAgICovXHJcbiAgcHVibGljIGZpcmUoKTogdm9pZCB7XHJcblxyXG4gICAgLy8gTWFrZSBzdXJlIHRoZSBidXR0b24gaXMgbm90IGFscmVhZHkgZmlyaW5nLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3BoZXRzaW1zL2VuZXJneS1za2F0ZS1wYXJrLWJhc2ljcy9pc3N1ZXMvMzgwXHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCAhdGhpcy5pc0ZpcmluZ1Byb3BlcnR5LnZhbHVlLCAnQ2Fubm90IGZpcmUgd2hlbiBhbHJlYWR5IGZpcmluZycgKTtcclxuICAgIHRoaXMuaXNGaXJpbmdQcm9wZXJ0eS52YWx1ZSA9IHRydWU7XHJcbiAgICB0aGlzLmZpcmVkRW1pdHRlci5lbWl0KCk7XHJcbiAgICB0aGlzLmlzRmlyaW5nUHJvcGVydHkudmFsdWUgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbnN1bi5yZWdpc3RlciggJ1B1c2hCdXR0b25Nb2RlbCcsIFB1c2hCdXR0b25Nb2RlbCApO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLGVBQWUsTUFBTSxxQ0FBcUM7QUFDakUsT0FBT0MsYUFBYSxNQUFNLG1DQUFtQztBQUM3RCxPQUFPQyxPQUFPLE1BQU0sNkJBQTZCO0FBR2pELE9BQU9DLFNBQVMsTUFBTSxvQ0FBb0M7QUFDMUQsT0FBT0MsU0FBUyxNQUFNLGlDQUFpQztBQUN2RCxPQUFPQyxZQUFZLE1BQU0sb0NBQW9DO0FBQzdELE9BQU9DLE1BQU0sTUFBTSw4QkFBOEI7QUFDakQsT0FBT0MsR0FBRyxNQUFNLFdBQVc7QUFDM0IsT0FBT0MsV0FBVyxNQUE4QixrQkFBa0I7QUF3QmxFLGVBQWUsTUFBTUMsZUFBZSxTQUFTRCxXQUFXLENBQUM7RUFFdkQ7O0VBR0E7O0VBT09FLFdBQVdBLENBQUVDLGVBQXdDLEVBQUc7SUFFN0QsTUFBTUMsT0FBTyxHQUFHVCxTQUFTLENBQTBELENBQUMsQ0FBRTtNQUVwRlUsVUFB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