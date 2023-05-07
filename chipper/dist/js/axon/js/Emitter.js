// Copyright 2019-2023, University of Colorado Boulder

/**
 * Event & listener abstraction for a single "event" type. The type provides extra functionality beyond just notifying
 * listeners. It adds PhET-iO instrumentation capabilities as well as validation. For the lightest-weight, fastest
 * solution with the smallest memory footprint, see `TinyEmitter`.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import optionize from '../../phet-core/js/optionize.js';
import FunctionIO from '../../tandem/js/types/FunctionIO.js';
import IOType from '../../tandem/js/types/IOType.js';
import VoidIO from '../../tandem/js/types/VoidIO.js';
import PhetioDataHandler from '../../tandem/js/PhetioDataHandler.js';
import axon from './axon.js';
import TinyEmitter from './TinyEmitter.js';
import Tandem from '../../tandem/js/Tandem.js';
// By default, Emitters are not stateful
const PHET_IO_STATE_DEFAULT = false;
export default class Emitter extends PhetioDataHandler {
  // provide Emitter functionality via composition

  constructor(providedOptions) {
    const options = optionize()({
      phetioOuterType: Emitter.EmitterIO,
      phetioState: PHET_IO_STATE_DEFAULT
    }, providedOptions);
    super(options);
    this.tinyEmitter = new TinyEmitter(null, options.hasListenerOrderDependencies);
  }

  /**
   * Emit to notify listeners
   */
  emit(...args) {
    assert && assert(this.tinyEmitter instanceof TinyEmitter, 'Emitter should not emit until constructor complete');
    assert && this.validateArguments(...args);

    // Although this is not the idiomatic pattern (since it is guarded in the phetioStartEvent), this function is
    // called so many times that it is worth the optimization for PhET brand.
    Tandem.PHET_IO_ENABLED && this.isPhetioInstrumented() && this.phetioStartEvent('emitted', {
      data: this.getPhetioData(...args)
    });
    this.tinyEmitter.emit(...args);
    Tandem.PHET_IO_ENABLED && this.isPhetioInstrumented() && this.phetioEndEvent();
  }

  /**
   * Disposes an Emitter. All listeners are removed.
   */
  dispose() {
    this.tinyEmitter.dispose();
    super.dispose();
  }

  /**
   * Adds a listener which will be called during emit.
   */
  addListener(listener) {
    this.tinyEmitter.addListener(listener);
  }

  /**
   * Removes a listener
   */
  removeListener(listener) {
    this.tinyEmitter.removeListener(listener);
  }

  /**
   * Removes all the listeners
   */
  removeAllListeners() {
    this.tinyEmitter.removeAllListeners();
  }

  /**
   * Checks whether a listener is registered with this Emitter
   */
  hasListener(listener) {
    return this.tinyEmitter.hasListener(listener);
  }

  /**
   * Returns true if there are any listeners.
   */
  hasListeners() {
    return this.tinyEmitter.hasListeners();
  }

  /**
   * Returns the number of listeners.
   */
  getListenerCount() {
    return this.tinyEmitter.getListenerCount();
  }

  /**
   * Convenience function for debugging a Property's value. It prints the new value on registration and when changed.
   * @param name - debug name to be printed on the console
   * @returns - the handle to the listener added in case it needs to be removed later
   */
  debug(name) {
    const listener = (...args) => console.log(name, ...args);
    this.addListener(listener);
    return listener;
  }

  /**
   * IO Type for Emitter.
   *
   * Providing validators to instrumented Emitters:
   * Instrumented Emitters should have their `validators` for each argument passed via EmitterIO (the phetioType).
   * To provide validators, there are two methods. First, by default each IOType has its own
   * validator that will be used. So specifying an argument object like `{ type: NumberIO }` will automatically use
   * `NumberIO.validator` as the validator. This can be overridden with the `validator` key (second option), like
   * { type: NumberIO, validator: { isValidValue: v=> typeof v === 'number' &&  v < 5 } }`
   * NOTE: currently the implementation is either/or, if a validator is provided via the `validator` key, the validator
   * from the `type` will be ignored.
   * see https://github.com/phetsims/axon/issues/204 for more details.
   *
   * @author Sam Reid (PhET Interactive Simulations)
   * @author Michael Kauzmann (PhET Interactive Simulations)
   * @author Andrew Adare (PhET Interactive Simulations)
   */
  static EmitterIO = parameterTypes => {
    const key = parameterTypes.map(getTypeName).join(',');
    if (!cache.has(key)) {
      cache.set(key, new IOType(`EmitterIO<${parameterTypes.map(getTypeName).join(', ')}>`, {
        valueType: Emitter,
        documentation: 'Emits when an event occurs and calls added listeners.',
        parameterTypes: parameterTypes,
        events: ['emitted'],
        metadataDefaults: {
          phetioState: PHET_IO_STATE_DEFAULT
        },
        methods: {
          addListener: {
            returnType: VoidIO,
            parameterTypes: [FunctionIO(VoidIO, parameterTypes)],
            implementation: Emitter.prototype.addListener,
            documentation: 'Adds a listener which will be called when the emitter emits.'
          },
          removeListener: {
            returnType: VoidIO,
            parameterTypes: [FunctionIO(VoidIO, parameterTypes)],
            implementation: Emitter.prototype.removeListener,
            documentation: 'Remove a listener.'
          },
          emit: {
            returnType: VoidIO,
            parameterTypes: parameterTypes,
            // Match `Emitter.emit`'s dynamic number of arguments
            implementation: function (...values) {
              const errors = this.getValidationErrors(...values);
              if (errors.length > 0) {
                throw new Error(`Validation errors: ${errors.join(', ')}`);
              } else {
                this.emit(...values);
              }
            },
            documentation: 'Emits a single event to all listeners.',
            invocableForReadOnlyElements: false
          }
        }
      }));
    }
    return cache.get(key);
  };
}
const getTypeName = ioType => ioType.typeName;

// {Map.<string, IOType>} - Cache each parameterized IOType so that
// it is only created once.
const cache = new Map();
axon.register('Emitter', Emitter);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25pemUiLCJGdW5jdGlvbklPIiwiSU9UeXBlIiwiVm9pZElPIiwiUGhldGlvRGF0YUhhbmRsZXIiLCJheG9uIiwiVGlueUVtaXR0ZXIiLCJUYW5kZW0iLCJQSEVUX0lPX1NUQVRFX0RFRkFVTFQiLCJFbWl0dGVyIiwiY29uc3RydWN0b3IiLCJwcm92aWRlZE9wdGlvbnMiLCJvcHRpb25zIiwicGhldGlvT3V0ZXJUeXBlIiwiRW1pdHRlcklPIiwicGhldGlvU3RhdGUiLCJ0aW55RW1pdHRlciIsImhhc0xpc3RlbmVyT3JkZXJEZXBlbmRlbmNpZXMiLCJlbWl0IiwiYXJncyIsImFzc2VydCIsInZhbGlkYXRlQXJndW1lbnRzIiwiUEhFVF9JT19FTkFCTEVEIiwiaXNQaGV0aW9JbnN0cnVtZW50ZWQiLCJwaGV0aW9TdGFydEV2ZW50IiwiZGF0YSIsImdldFBoZXRpb0RhdGEiLCJwaGV0aW9FbmRFdmVudCIsImRpc3Bvc2UiLCJhZGRMaXN0ZW5lciIsImxpc3RlbmVyIiwicmVtb3ZlTGlzdGVuZXIiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJoYXNMaXN0ZW5lciIsImhhc0xpc3RlbmVycyIsImdldExpc3RlbmVyQ291bnQiLCJkZWJ1ZyIsIm5hbWUiLCJjb25zb2xlIiwibG9nIiwicGFyYW1ldGVyVHlwZXMiLCJrZXkiLCJtYXAiLCJnZXRUeXBlTmFtZSIsImpvaW4iLCJjYWNoZSIsImhhcyIsInNldCIsInZhbHVlVHlwZSIsImRvY3VtZW50YXRpb24iLCJldmVudHMiLCJtZXRhZGF0YURlZmF1bHRzIiwibWV0aG9kcyIsInJldHVyblR5cGUiLCJpbXBsZW1lbnRhdGlvbiIsInByb3RvdHlwZSIsInZhbHVlcyIsImVycm9ycyIsImdldFZhbGlkYXRpb25FcnJvcnMiLCJsZW5ndGgiLCJFcnJvciIsImludm9jYWJsZUZvclJlYWRPbmx5RWxlbWVudHMiLCJnZXQiLCJpb1R5cGUiLCJ0eXBlTmFtZSIsIk1hcCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiRW1pdHRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBFdmVudCAmIGxpc3RlbmVyIGFic3RyYWN0aW9uIGZvciBhIHNpbmdsZSBcImV2ZW50XCIgdHlwZS4gVGhlIHR5cGUgcHJvdmlkZXMgZXh0cmEgZnVuY3Rpb25hbGl0eSBiZXlvbmQganVzdCBub3RpZnlpbmdcclxuICogbGlzdGVuZXJzLiBJdCBhZGRzIFBoRVQtaU8gaW5zdHJ1bWVudGF0aW9uIGNhcGFiaWxpdGllcyBhcyB3ZWxsIGFzIHZhbGlkYXRpb24uIEZvciB0aGUgbGlnaHRlc3Qtd2VpZ2h0LCBmYXN0ZXN0XHJcbiAqIHNvbHV0aW9uIHdpdGggdGhlIHNtYWxsZXN0IG1lbW9yeSBmb290cHJpbnQsIHNlZSBgVGlueUVtaXR0ZXJgLlxyXG4gKlxyXG4gKiBAYXV0aG9yIFNhbSBSZWlkIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKiBAYXV0aG9yIE1pY2hhZWwgS2F1em1hbm4gKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqL1xyXG5cclxuaW1wb3J0IG9wdGlvbml6ZSwgeyBFbXB0eVNlbGZPcHRpb25zIH0gZnJvbSAnLi4vLi4vcGhldC1jb3JlL2pzL29wdGlvbml6ZS5qcyc7XHJcbmltcG9ydCBTdHJpY3RPbWl0IGZyb20gJy4uLy4uL3BoZXQtY29yZS9qcy90eXBlcy9TdHJpY3RPbWl0LmpzJztcclxuaW1wb3J0IEZ1bmN0aW9uSU8gZnJvbSAnLi4vLi4vdGFuZGVtL2pzL3R5cGVzL0Z1bmN0aW9uSU8uanMnO1xyXG5pbXBvcnQgSU9UeXBlIGZyb20gJy4uLy4uL3RhbmRlbS9qcy90eXBlcy9JT1R5cGUuanMnO1xyXG5pbXBvcnQgVm9pZElPIGZyb20gJy4uLy4uL3RhbmRlbS9qcy90eXBlcy9Wb2lkSU8uanMnO1xyXG5pbXBvcnQgUGhldGlvRGF0YUhhbmRsZXIsIHsgUGhldGlvRGF0YUhhbmRsZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vdGFuZGVtL2pzL1BoZXRpb0RhdGFIYW5kbGVyLmpzJztcclxuaW1wb3J0IGF4b24gZnJvbSAnLi9heG9uLmpzJztcclxuaW1wb3J0IFRpbnlFbWl0dGVyIGZyb20gJy4vVGlueUVtaXR0ZXIuanMnO1xyXG5pbXBvcnQgVGFuZGVtIGZyb20gJy4uLy4uL3RhbmRlbS9qcy9UYW5kZW0uanMnO1xyXG5pbXBvcnQgVEVtaXR0ZXIsIHsgVEVtaXR0ZXJMaXN0ZW5lciwgVEVtaXR0ZXJQYXJhbWV0ZXIgfSBmcm9tICcuL1RFbWl0dGVyLmpzJztcclxuXHJcbi8vIEJ5IGRlZmF1bHQsIEVtaXR0ZXJzIGFyZSBub3Qgc3RhdGVmdWxcclxuY29uc3QgUEhFVF9JT19TVEFURV9ERUZBVUxUID0gZmFsc2U7XHJcblxyXG50eXBlIFNlbGZPcHRpb25zID0gRW1wdHlTZWxmT3B0aW9ucztcclxudHlwZSBFbWl0dGVyT3B0aW9ucyA9IFNlbGZPcHRpb25zICYgU3RyaWN0T21pdDxQaGV0aW9EYXRhSGFuZGxlck9wdGlvbnMsICdwaGV0aW9PdXRlclR5cGUnPjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtaXR0ZXI8VCBleHRlbmRzIFRFbWl0dGVyUGFyYW1ldGVyW10gPSBbXT4gZXh0ZW5kcyBQaGV0aW9EYXRhSGFuZGxlcjxUPiBpbXBsZW1lbnRzIFRFbWl0dGVyPFQ+IHtcclxuXHJcbiAgLy8gcHJvdmlkZSBFbWl0dGVyIGZ1bmN0aW9uYWxpdHkgdmlhIGNvbXBvc2l0aW9uXHJcbiAgcHJpdmF0ZSByZWFkb25seSB0aW55RW1pdHRlcjogVGlueUVtaXR0ZXI8VD47XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggcHJvdmlkZWRPcHRpb25zPzogRW1pdHRlck9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxFbWl0dGVyT3B0aW9ucywgU2VsZk9wdGlvbnMsIFBoZXRpb0RhdGFIYW5kbGVyT3B0aW9ucz4oKSgge1xyXG4gICAgICBwaGV0aW9PdXRlclR5cGU6IEVtaXR0ZXIuRW1pdHRlcklPLFxyXG4gICAgICBwaGV0aW9TdGF0ZTogUEhFVF9JT19TVEFURV9ERUZBVUxUXHJcbiAgICB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICBzdXBlciggb3B0aW9ucyApO1xyXG4gICAgdGhpcy50aW55RW1pdHRlciA9IG5ldyBUaW55RW1pdHRlciggbnVsbCwgb3B0aW9ucy5oYXNMaXN0ZW5lck9yZGVyRGVwZW5kZW5jaWVzICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0IHRvIG5vdGlmeSBsaXN0ZW5lcnNcclxuICAgKi9cclxuICBwdWJsaWMgZW1pdCggLi4uYXJnczogVCApOiB2b2lkIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIHRoaXMudGlueUVtaXR0ZXIgaW5zdGFuY2VvZiBUaW55RW1pdHRlciwgJ0VtaXR0ZXIgc2hvdWxkIG5vdCBlbWl0IHVudGlsIGNvbnN0cnVjdG9yIGNvbXBsZXRlJyApO1xyXG4gICAgYXNzZXJ0ICYmIHRoaXMudmFsaWRhdGVBcmd1bWVudHMoIC4uLmFyZ3MgKTtcclxuXHJcbiAgICAvLyBBbHRob3VnaCB0aGlzIGlzIG5vdCB0aGUgaWRpb21hdGljIHBhdHRlcm4gKHNpbmNlIGl0IGlzIGd1YXJkZWQgaW4gdGhlIHBoZXRpb1N0YXJ0RXZlbnQpLCB0aGlzIGZ1bmN0aW9uIGlzXHJcbiAgICAvLyBjYWxsZWQgc28gbWFueSB0aW1lcyB0aGF0IGl0IGlzIHdvcnRoIHRoZSBvcHRpbWl6YXRpb24gZm9yIFBoRVQgYnJhbmQuXHJcbiAgICBUYW5kZW0uUEhFVF9JT19FTkFCTEVEICYmIHRoaXMuaXNQaGV0aW9JbnN0cnVtZW50ZWQoKSAmJiB0aGlzLnBoZXRpb1N0YXJ0RXZlbnQoICdlbWl0dGVkJywge1xyXG4gICAgICBkYXRhOiB0aGlzLmdldFBoZXRpb0RhdGEoIC4uLmFyZ3MgKVxyXG4gICAgfSApO1xyXG5cclxuICAgIHRoaXMudGlueUVtaXR0ZXIuZW1pdCggLi4uYXJncyApO1xyXG5cclxuICAgIFRhbmRlbS5QSEVUX0lPX0VOQUJMRUQgJiYgdGhpcy5pc1BoZXRpb0luc3RydW1lbnRlZCgpICYmIHRoaXMucGhldGlvRW5kRXZlbnQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3Bvc2VzIGFuIEVtaXR0ZXIuIEFsbCBsaXN0ZW5lcnMgYXJlIHJlbW92ZWQuXHJcbiAgICovXHJcbiAgcHVibGljIG92ZXJyaWRlIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRpbnlFbWl0dGVyLmRpc3Bvc2UoKTtcclxuICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSBsaXN0ZW5lciB3aGljaCB3aWxsIGJlIGNhbGxlZCBkdXJpbmcgZW1pdC5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkTGlzdGVuZXIoIGxpc3RlbmVyOiBURW1pdHRlckxpc3RlbmVyPFQ+ICk6IHZvaWQge1xyXG4gICAgdGhpcy50aW55RW1pdHRlci5hZGRMaXN0ZW5lciggbGlzdGVuZXIgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYSBsaXN0ZW5lclxyXG4gICAqL1xyXG4gIHB1YmxpYyByZW1vdmVMaXN0ZW5lciggbGlzdGVuZXI6IFRFbWl0dGVyTGlzdGVuZXI8VD4gKTogdm9pZCB7XHJcbiAgICB0aGlzLnRpbnlFbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCBsaXN0ZW5lciApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhbGwgdGhlIGxpc3RlbmVyc1xyXG4gICAqL1xyXG4gIHB1YmxpYyByZW1vdmVBbGxMaXN0ZW5lcnMoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRpbnlFbWl0dGVyLnJlbW92ZUFsbExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHdoZXRoZXIgYSBsaXN0ZW5lciBpcyByZWdpc3RlcmVkIHdpdGggdGhpcyBFbWl0dGVyXHJcbiAgICovXHJcbiAgcHVibGljIGhhc0xpc3RlbmVyKCBsaXN0ZW5lcjogVEVtaXR0ZXJMaXN0ZW5lcjxUPiApOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnRpbnlFbWl0dGVyLmhhc0xpc3RlbmVyKCBsaXN0ZW5lciApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBhbnkgbGlzdGVuZXJzLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBoYXNMaXN0ZW5lcnMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy50aW55RW1pdHRlci5oYXNMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMuXHJcbiAgICovXHJcbiAgcHVibGljIGdldExpc3RlbmVyQ291bnQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnRpbnlFbWl0dGVyLmdldExpc3RlbmVyQ291bnQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnZlbmllbmNlIGZ1bmN0aW9uIGZvciBkZWJ1Z2dpbmcgYSBQcm9wZXJ0eSdzIHZhbHVlLiBJdCBwcmludHMgdGhlIG5ldyB2YWx1ZSBvbiByZWdpc3RyYXRpb24gYW5kIHdoZW4gY2hhbmdlZC5cclxuICAgKiBAcGFyYW0gbmFtZSAtIGRlYnVnIG5hbWUgdG8gYmUgcHJpbnRlZCBvbiB0aGUgY29uc29sZVxyXG4gICAqIEByZXR1cm5zIC0gdGhlIGhhbmRsZSB0byB0aGUgbGlzdGVuZXIgYWRkZWQgaW4gY2FzZSBpdCBuZWVkcyB0byBiZSByZW1vdmVkIGxhdGVyXHJcbiAgICovXHJcbiAgcHVibGljIGRlYnVnKCBuYW1lOiBzdHJpbmcgKTogVEVtaXR0ZXJMaXN0ZW5lcjxUPiB7XHJcbiAgICBjb25zdCBsaXN0ZW5lciA9ICggLi4uYXJnczogVCApID0+IGNvbnNvbGUubG9nKCBuYW1lLCAuLi5hcmdzICk7XHJcbiAgICB0aGlzLmFkZExpc3RlbmVyKCBsaXN0ZW5lciApO1xyXG4gICAgcmV0dXJuIGxpc3RlbmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSU8gVHlwZSBmb3IgRW1pdHRlci5cclxuICAgKlxyXG4gICAqIFByb3ZpZGluZyB2YWxpZGF0b3JzIHRvIGluc3RydW1lbnRlZCBFbWl0dGVyczpcclxuICAgKiBJbnN0cnVtZW50ZWQgRW1pdHRlcnMgc2hvdWxkIGhhdmUgdGhlaXIgYHZhbGlkYXRvcnNgIGZvciBlYWNoIGFyZ3VtZW50IHBhc3NlZCB2aWEgRW1pdHRlcklPICh0aGUgcGhldGlvVHlwZSkuXHJcbiAgICogVG8gcHJvdmlkZSB2YWxpZGF0b3JzLCB0aGVyZSBhcmUgdHdvIG1ldGhvZHMuIEZpcnN0LCBieSBkZWZhdWx0IGVhY2ggSU9UeXBlIGhhcyBpdHMgb3duXHJcbiAgICogdmFsaWRhdG9yIHRoYXQgd2lsbCBiZSB1c2VkLiBTbyBzcGVjaWZ5aW5nIGFuIGFyZ3VtZW50IG9iamVjdCBsaWtlIGB7IHR5cGU6IE51bWJlcklPIH1gIHdpbGwgYXV0b21hdGljYWxseSB1c2VcclxuICAgKiBgTnVtYmVySU8udmFsaWRhdG9yYCBhcyB0aGUgdmFsaWRhdG9yLiBUaGlzIGNhbiBiZSBvdmVycmlkZGVuIHdpdGggdGhlIGB2YWxpZGF0b3JgIGtleSAoc2Vjb25kIG9wdGlvbiksIGxpa2VcclxuICAgKiB7IHR5cGU6IE51bWJlcklPLCB2YWxpZGF0b3I6IHsgaXNWYWxpZFZhbHVlOiB2PT4gdHlwZW9mIHYgPT09ICdudW1iZXInICYmICB2IDwgNSB9IH1gXHJcbiAgICogTk9URTogY3VycmVudGx5IHRoZSBpbXBsZW1lbnRhdGlvbiBpcyBlaXRoZXIvb3IsIGlmIGEgdmFsaWRhdG9yIGlzIHByb3ZpZGVkIHZpYSB0aGUgYHZhbGlkYXRvcmAga2V5LCB0aGUgdmFsaWRhdG9yXHJcbiAgICogZnJvbSB0aGUgYHR5cGVgIHdpbGwgYmUgaWdub3JlZC5cclxuICAgKiBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3BoZXRzaW1zL2F4b24vaXNzdWVzLzIwNCBmb3IgbW9yZSBkZXRhaWxzLlxyXG4gICAqXHJcbiAgICogQGF1dGhvciBTYW0gUmVpZCAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICAgKiBAYXV0aG9yIE1pY2hhZWwgS2F1em1hbm4gKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAgICogQGF1dGhvciBBbmRyZXcgQWRhcmUgKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBFbWl0dGVySU8gPSAoIHBhcmFtZXRlclR5cGVzOiBJT1R5cGVbXSApOiBJT1R5cGUgPT4ge1xyXG5cclxuICAgIGNvbnN0IGtleSA9IHBhcmFtZXRlclR5cGVzLm1hcCggZ2V0VHlwZU5hbWUgKS5qb2luKCAnLCcgKTtcclxuXHJcbiAgICBpZiAoICFjYWNoZS5oYXMoIGtleSApICkge1xyXG4gICAgICBjYWNoZS5zZXQoIGtleSwgbmV3IElPVHlwZSggYEVtaXR0ZXJJTzwke3BhcmFtZXRlclR5cGVzLm1hcCggZ2V0VHlwZU5hbWUgKS5qb2luKCAnLCAnICl9PmAsIHtcclxuICAgICAgICB2YWx1ZVR5cGU6IEVtaXR0ZXIsXHJcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ0VtaXRzIHdoZW4gYW4gZXZlbnQgb2NjdXJzIGFuZCBjYWxscyBhZGRlZCBsaXN0ZW5lcnMuJyxcclxuICAgICAgICBwYXJhbWV0ZXJUeXBlczogcGFyYW1ldGVyVHlwZXMsXHJcbiAgICAgICAgZXZlbnRzOiBbICdlbWl0dGVkJyBdLFxyXG4gICAgICAgIG1ldGFkYXRhRGVmYXVsdHM6IHtcclxuICAgICAgICAgIHBoZXRpb1N0YXRlOiBQSEVUX0lPX1NUQVRFX0RFRkFVTFRcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgIGFkZExpc3RlbmVyOiB7XHJcbiAgICAgICAgICAgIHJldHVyblR5cGU6IFZvaWRJTyxcclxuICAgICAgICAgICAgcGFyYW1ldGVyVHlwZXM6IFsgRnVuY3Rpb25JTyggVm9pZElPLCBwYXJhbWV0ZXJUeXBlcyApIF0sXHJcbiAgICAgICAgICAgIGltcGxlbWVudGF0aW9uOiBFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcixcclxuICAgICAgICAgICAgZG9jdW1lbnRhdGlvbjogJ0FkZHMgYSBsaXN0ZW5lciB3aGljaCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBlbWl0dGVyIGVtaXRzLidcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByZW1vdmVMaXN0ZW5lcjoge1xyXG4gICAgICAgICAgICByZXR1cm5UeXBlOiBWb2lkSU8sXHJcbiAgICAgICAgICAgIHBhcmFtZXRlclR5cGVzOiBbIEZ1bmN0aW9uSU8oIFZvaWRJTywgcGFyYW1ldGVyVHlwZXMgKSBdLFxyXG4gICAgICAgICAgICBpbXBsZW1lbnRhdGlvbjogRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIsXHJcbiAgICAgICAgICAgIGRvY3VtZW50YXRpb246ICdSZW1vdmUgYSBsaXN0ZW5lci4nXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZW1pdDoge1xyXG4gICAgICAgICAgICByZXR1cm5UeXBlOiBWb2lkSU8sXHJcbiAgICAgICAgICAgIHBhcmFtZXRlclR5cGVzOiBwYXJhbWV0ZXJUeXBlcyxcclxuXHJcbiAgICAgICAgICAgIC8vIE1hdGNoIGBFbWl0dGVyLmVtaXRgJ3MgZHluYW1pYyBudW1iZXIgb2YgYXJndW1lbnRzXHJcbiAgICAgICAgICAgIGltcGxlbWVudGF0aW9uOiBmdW5jdGlvbiggdGhpczogRW1pdHRlcjx1bmtub3duW10+LCAuLi52YWx1ZXM6IHVua25vd25bXSApIHtcclxuICAgICAgICAgICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLmdldFZhbGlkYXRpb25FcnJvcnMoIC4uLnZhbHVlcyApO1xyXG4gICAgICAgICAgICAgIGlmICggZXJyb3JzLmxlbmd0aCA+IDAgKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIGBWYWxpZGF0aW9uIGVycm9yczogJHtlcnJvcnMuam9pbiggJywgJyApfWAgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoIC4uLnZhbHVlcyApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZG9jdW1lbnRhdGlvbjogJ0VtaXRzIGEgc2luZ2xlIGV2ZW50IHRvIGFsbCBsaXN0ZW5lcnMuJyxcclxuICAgICAgICAgICAgaW52b2NhYmxlRm9yUmVhZE9ubHlFbGVtZW50czogZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gKSApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNhY2hlLmdldCgga2V5ICkhO1xyXG4gIH07XHJcbn1cclxuXHJcbmNvbnN0IGdldFR5cGVOYW1lID0gKCBpb1R5cGU6IElPVHlwZSApID0+IGlvVHlwZS50eXBlTmFtZTtcclxuXHJcbi8vIHtNYXAuPHN0cmluZywgSU9UeXBlPn0gLSBDYWNoZSBlYWNoIHBhcmFtZXRlcml6ZWQgSU9UeXBlIHNvIHRoYXRcclxuLy8gaXQgaXMgb25seSBjcmVhdGVkIG9uY2UuXHJcbmNvbnN0IGNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIElPVHlwZT4oKTtcclxuXHJcbmF4b24ucmVnaXN0ZXIoICdFbWl0dGVyJywgRW1pdHRlciApO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsU0FBUyxNQUE0QixpQ0FBaUM7QUFFN0UsT0FBT0MsVUFBVSxNQUFNLHFDQUFxQztBQUM1RCxPQUFPQyxNQUFNLE1BQU0saUNBQWlDO0FBQ3BELE9BQU9DLE1BQU0sTUFBTSxpQ0FBaUM7QUFDcEQsT0FBT0MsaUJBQWlC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