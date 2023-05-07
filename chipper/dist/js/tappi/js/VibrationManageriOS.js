// Copyright 2020-2022, University of Colorado Boulder

/**
 * A class that controls vibrations when running the sim in a native iOS App. It sends messages form the simulation
 * WebView to its containing native swift application. This is the only way to request vibration on that platform
 * since Web vibration is not supported in Safari.
 *
 * This is a prototype, and this strategy has since been abandoned. We have since moved on to explore vibration
 * in Android devices, where tablets have vibration support. There we can use the web vibration API and also
 * use native android vibration for more sophisticated things like vibration intensity.
 */

import Utils from '../../dot/js/Utils.js';
import optionize from '../../phet-core/js/optionize.js';
import tappi from './tappi.js';

/**
 * @deprecated - This strategy is being abandoned for an android specific solution.
 */
class VibrationManageriOS {
  // Message handlers for the Webkit window, only available in Safari.
  // The actual type for the values of the Record are WKScriptMessageHandler, see
  // https://developer.apple.com/documentation/webkit/wkscriptmessagehandler. But that type is only available
  // on iOS Safari and so WKScriptMessageHandler is not a known type. This is prototype code that will probably
  // never see the light of day, so I (JG) is deciding not to re-implement the interface.

  constructor() {
    // @ts-expect-error - Only available in Safari environments. Further typing not necessary for prototype code.
    if (window.webkit) {
      // @ts-expect-error - Only available in Safari environments. Further typing not necessary for prototype code.
      this.vibrationMessageHandlers = window.webkit.messageHandlers;
    } else {
      // TODO: Put something reasonable here.
      throw new Error('not on this device!');
    }
  }

  /**
   * Start a timed vibration for the provided time in seconds.
   */
  vibrate(seconds) {
    if (this.vibrationMessageHandlers && this.vibrationMessageHandlers.vibrateMessageHandler) {
      this.vibrationMessageHandlers.vibrateMessageHandler.postMessage({
        duration: seconds
      });
    }
  }

  /**
   * Start a vibration that will continue forever.
   */
  vibrateForever() {
    if (this.vibrationMessageHandlers && this.vibrationMessageHandlers.vibrateForeverMessageHandler) {
      this.vibrationMessageHandlers.vibrateForeverMessageHandler.postMessage({});
    }
  }

  /**
   * Request a continuous vibration with provided parameters. This should replace all other functions in the future.
   */
  vibrateContinuous(providedOptions) {
    const options = optionize()({
      // {number[]} - a pattern for the vibration, alternating values in seconds where even indices are time when the
      // vibration is "on" and odd indices have the motor off. The pattern will repeat for options.duration or forever
      // if that option is null.
      pattern: [],
      // {number}
      sharpness: 1,
      // {number}
      intensity: 1,
      // TODO: add support for frequency
      frequency: null,
      // {number|null} - duration indicates that this vibration will proceed forever
      duration: null
    }, providedOptions);
    if (this.vibrationMessageHandlers && this.vibrationMessageHandlers.vibrateContinuousMessageHandler) {
      this.vibrationMessageHandlers.vibrateContinuousMessageHandler.postMessage({
        pattern: options.pattern,
        sharpness: options.sharpness,
        duration: options.duration,
        intensity: options.intensity,
        frequency: options.frequency
      });
    }
  }

  /**
   * Request a transient vibration. A transient vibration is a single pulse at a particular time without any duration.
   * It is used typically for basic UI components to indicate successful activation or change. Use vibrateContinuous for
   * longer and more complicated vibrations.
   */
  vibrateTransient(providedOptions) {
    const options = optionize()({
      sharpness: 1,
      intensity: 1
    }, providedOptions);
    if (this.vibrationMessageHandlers && this.vibrationMessageHandlers.vibrateTransientMessageHandler) {
      this.vibrationMessageHandlers.vibrateTransientMessageHandler.postMessage({
        sharpness: options.sharpness,
        intensity: options.intensity
      });
    }
  }

  /**
   * Start a vibration for the provided duration, with a provided frequency.
   */
  vibrateAtFrequency(seconds, frequency) {
    if (this.vibrationMessageHandlers && this.vibrationMessageHandlers.vibrateFrequencyMessageHandler) {
      this.vibrationMessageHandlers.vibrateFrequencyMessageHandler.postMessage({
        duration: seconds,
        frequency: frequency
      });
    }
  }

  /**
   * Vibrate at the desired frequency.
   * @param frequency
   * @param [intensity] - from 0 to 1
   */
  vibrateAtFrequencyForever(frequency, intensity) {
    intensity = typeof intensity === 'number' ? intensity : 1;
    intensity = Utils.clamp(intensity, 0, 1);
    this.debug(`${intensity}`);
    if (this.vibrationMessageHandlers && this.vibrationMessageHandlers.vibrateFrequencyForeverMessageHandler) {
      this.vibrationMessageHandlers.messageHandlers.vibrateFrequencyForeverMessageHandler.postMessage({
        frequency: frequency,
        intensity: intensity
      });
    }
  }

  /**
   * Request a vibration with a custom pattern that loops forever.
   * @param vibrationPattern - alternating values where even indexes are "on" time, odd indices are "off"
   * @param seconds - time in seconds, how long to run the vibration
   * @param loopForever - should this loop forever?
   */
  vibrateWithCustomPattern(vibrationPattern, seconds, loopForever) {
    if (this.vibrationMessageHandlers && this.vibrationMessageHandlers.vibrateWithCustomPatternMessageHandler) {
      this.vibrationMessageHandlers.vibrateWithCustomPatternMessageHandler.postMessage({
        vibrationPattern: vibrationPattern,
        duration: seconds,
        loopForever: loopForever
      });
    }
  }

  /**
   * Vibrate with a custom pattern for the provided duration.
   * @param vibrationPattern - alternative values where even indexes are "on" time and odd indexes are "off"
   * @param seconds
   */
  vibrateWithCustomPatternDuration(vibrationPattern, seconds) {
    if (this.vibrationMessageHandlers && this.vibrationMessageHandlers.vibrateWithCustomPatternDurationMessageHandler) {
      this.vibrationMessageHandlers.vibrateWithCustomPatternDurationMessageHandler.postMessage({
        vibrationPattern: vibrationPattern,
        duration: seconds
      });
    }
  }

  /**
   * Vibrate with a custom pattern forever.
   * @param vibrationPattern - alternating values of "on" and "off" time in seconds, starting with "on" time.
   */
  vibrateWithCustomPatternForever(vibrationPattern) {
    if (this.vibrationMessageHandlers && this.vibrationMessageHandlers.vibrateWithCustomPatternForeverMessageHandler) {
      this.vibrationMessageHandlers.vibrateWithCustomPatternForeverMessageHandler.postMessage({
        vibrationPattern: vibrationPattern
      });
    }
  }

  /**
   * Sets the intensity of the current vibration. No effect if there is no active vibration.
   * @param intensity - from 0 to 1
   */
  setVibrationIntensity(intensity) {
    if (this.vibrationMessageHandlers && this.vibrationMessageHandlers.vibrationIntensityMessageHandler) {
      this.vibrationMessageHandlers.vibrationIntensityMessageHandler.postMessage({
        intensity: intensity
      });
    }
  }

  /**
   * Sets the sharpness for the current vibration. No effect if there is no active vibration.
   * @param sharpness - from 0 to 1
   */
  setVibrationSharpness(sharpness) {
    if (this.vibrationMessageHandlers && this.vibrationMessageHandlers.vibrationSharpnessMessageHandler) {
      this.vibrationMessageHandlers.vibrationSharpnessMessageHandler.postMessage({
        sharpness: sharpness
      });
    }
  }

  /**
   * Stop any active vibration immediately.
   */
  stop() {
    if (this.vibrationMessageHandlers && this.vibrationMessageHandlers.stopMessageHandler) {
      this.vibrationMessageHandlers.stopMessageHandler.postMessage({});
    }
  }

  /**
   * Saves the provided data string to the containing Swift app. Data string is generated by VibrationTestEventRecorder.
   * @param dataString - the string to save
   */
  saveTestEvents(dataString) {
    if (this.vibrationMessageHandlers && this.vibrationMessageHandlers.saveDataMessageHandler) {
      this.vibrationMessageHandlers.saveDataMessageHandler.postMessage({
        dataString: dataString
      });
    }
  }

  /**
   * Send a debug message to the containing app that will be printed in the debugging tools.
   */
  debug(debugString) {
    if (this.vibrationMessageHandlers && this.vibrationMessageHandlers.debugMessageHandler) {
      this.vibrationMessageHandlers.debugMessageHandler.postMessage({
        debugString: debugString
      });
    }
  }
}
tappi.register('VibrationManageriOS', VibrationManageriOS);
export default VibrationManageriOS;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVdGlscyIsIm9wdGlvbml6ZSIsInRhcHBpIiwiVmlicmF0aW9uTWFuYWdlcmlPUyIsImNvbnN0cnVjdG9yIiwid2luZG93Iiwid2Via2l0IiwidmlicmF0aW9uTWVzc2FnZUhhbmRsZXJzIiwibWVzc2FnZUhhbmRsZXJzIiwiRXJyb3IiLCJ2aWJyYXRlIiwic2Vjb25kcyIsInZpYnJhdGVNZXNzYWdlSGFuZGxlciIsInBvc3RNZXNzYWdlIiwiZHVyYXRpb24iLCJ2aWJyYXRlRm9yZXZlciIsInZpYnJhdGVGb3JldmVyTWVzc2FnZUhhbmRsZXIiLCJ2aWJyYXRlQ29udGludW91cyIsInByb3ZpZGVkT3B0aW9ucyIsIm9wdGlvbnMiLCJwYXR0ZXJuIiwic2hhcnBuZXNzIiwiaW50ZW5zaXR5IiwiZnJlcXVlbmN5IiwidmlicmF0ZUNvbnRpbnVvdXNNZXNzYWdlSGFuZGxlciIsInZpYnJhdGVUcmFuc2llbnQiLCJ2aWJyYXRlVHJhbnNpZW50TWVzc2FnZUhhbmRsZXIiLCJ2aWJyYXRlQXRGcmVxdWVuY3kiLCJ2aWJyYXRlRnJlcXVlbmN5TWVzc2FnZUhhbmRsZXIiLCJ2aWJyYXRlQXRGcmVxdWVuY3lGb3JldmVyIiwiY2xhbXAiLCJkZWJ1ZyIsInZpYnJhdGVGcmVxdWVuY3lGb3JldmVyTWVzc2FnZUhhbmRsZXIiLCJ2aWJyYXRlV2l0aEN1c3RvbVBhdHRlcm4iLCJ2aWJyYXRpb25QYXR0ZXJuIiwibG9vcEZvcmV2ZXIiLCJ2aWJyYXRlV2l0aEN1c3RvbVBhdHRlcm5NZXNzYWdlSGFuZGxlciIsInZpYnJhdGVXaXRoQ3VzdG9tUGF0dGVybkR1cmF0aW9uIiwidmlicmF0ZVdpdGhDdXN0b21QYXR0ZXJuRHVyYXRpb25NZXNzYWdlSGFuZGxlciIsInZpYnJhdGVXaXRoQ3VzdG9tUGF0dGVybkZvcmV2ZXIiLCJ2aWJyYXRlV2l0aEN1c3RvbVBhdHRlcm5Gb3JldmVyTWVzc2FnZUhhbmRsZXIiLCJzZXRWaWJyYXRpb25JbnRlbnNpdHkiLCJ2aWJyYXRpb25JbnRlbnNpdHlNZXNzYWdlSGFuZGxlciIsInNldFZpYnJhdGlvblNoYXJwbmVzcyIsInZpYnJhdGlvblNoYXJwbmVzc01lc3NhZ2VIYW5kbGVyIiwic3RvcCIsInN0b3BNZXNzYWdlSGFuZGxlciIsInNhdmVUZXN0RXZlbnRzIiwiZGF0YVN0cmluZyIsInNhdmVEYXRhTWVzc2FnZUhhbmRsZXIiLCJkZWJ1Z1N0cmluZyIsImRlYnVnTWVzc2FnZUhhbmRsZXIiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlZpYnJhdGlvbk1hbmFnZXJpT1MudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogQSBjbGFzcyB0aGF0IGNvbnRyb2xzIHZpYnJhdGlvbnMgd2hlbiBydW5uaW5nIHRoZSBzaW0gaW4gYSBuYXRpdmUgaU9TIEFwcC4gSXQgc2VuZHMgbWVzc2FnZXMgZm9ybSB0aGUgc2ltdWxhdGlvblxyXG4gKiBXZWJWaWV3IHRvIGl0cyBjb250YWluaW5nIG5hdGl2ZSBzd2lmdCBhcHBsaWNhdGlvbi4gVGhpcyBpcyB0aGUgb25seSB3YXkgdG8gcmVxdWVzdCB2aWJyYXRpb24gb24gdGhhdCBwbGF0Zm9ybVxyXG4gKiBzaW5jZSBXZWIgdmlicmF0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgaW4gU2FmYXJpLlxyXG4gKlxyXG4gKiBUaGlzIGlzIGEgcHJvdG90eXBlLCBhbmQgdGhpcyBzdHJhdGVneSBoYXMgc2luY2UgYmVlbiBhYmFuZG9uZWQuIFdlIGhhdmUgc2luY2UgbW92ZWQgb24gdG8gZXhwbG9yZSB2aWJyYXRpb25cclxuICogaW4gQW5kcm9pZCBkZXZpY2VzLCB3aGVyZSB0YWJsZXRzIGhhdmUgdmlicmF0aW9uIHN1cHBvcnQuIFRoZXJlIHdlIGNhbiB1c2UgdGhlIHdlYiB2aWJyYXRpb24gQVBJIGFuZCBhbHNvXHJcbiAqIHVzZSBuYXRpdmUgYW5kcm9pZCB2aWJyYXRpb24gZm9yIG1vcmUgc29waGlzdGljYXRlZCB0aGluZ3MgbGlrZSB2aWJyYXRpb24gaW50ZW5zaXR5LlxyXG4gKi9cclxuXHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi9kb3QvanMvVXRpbHMuanMnO1xyXG5pbXBvcnQgb3B0aW9uaXplLCB7IEVtcHR5U2VsZk9wdGlvbnMgfSBmcm9tICcuLi8uLi9waGV0LWNvcmUvanMvb3B0aW9uaXplLmpzJztcclxuaW1wb3J0IEludGVudGlvbmFsQW55IGZyb20gJy4uLy4uL3BoZXQtY29yZS9qcy90eXBlcy9JbnRlbnRpb25hbEFueS5qcyc7XHJcbmltcG9ydCB0YXBwaSBmcm9tICcuL3RhcHBpLmpzJztcclxuXHJcbi8qKlxyXG4gKiBAZGVwcmVjYXRlZCAtIFRoaXMgc3RyYXRlZ3kgaXMgYmVpbmcgYWJhbmRvbmVkIGZvciBhbiBhbmRyb2lkIHNwZWNpZmljIHNvbHV0aW9uLlxyXG4gKi9cclxuY2xhc3MgVmlicmF0aW9uTWFuYWdlcmlPUyB7XHJcblxyXG4gIC8vIE1lc3NhZ2UgaGFuZGxlcnMgZm9yIHRoZSBXZWJraXQgd2luZG93LCBvbmx5IGF2YWlsYWJsZSBpbiBTYWZhcmkuXHJcbiAgLy8gVGhlIGFjdHVhbCB0eXBlIGZvciB0aGUgdmFsdWVzIG9mIHRoZSBSZWNvcmQgYXJlIFdLU2NyaXB0TWVzc2FnZUhhbmRsZXIsIHNlZVxyXG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL3dlYmtpdC93a3NjcmlwdG1lc3NhZ2VoYW5kbGVyLiBCdXQgdGhhdCB0eXBlIGlzIG9ubHkgYXZhaWxhYmxlXHJcbiAgLy8gb24gaU9TIFNhZmFyaSBhbmQgc28gV0tTY3JpcHRNZXNzYWdlSGFuZGxlciBpcyBub3QgYSBrbm93biB0eXBlLiBUaGlzIGlzIHByb3RvdHlwZSBjb2RlIHRoYXQgd2lsbCBwcm9iYWJseVxyXG4gIC8vIG5ldmVyIHNlZSB0aGUgbGlnaHQgb2YgZGF5LCBzbyBJIChKRykgaXMgZGVjaWRpbmcgbm90IHRvIHJlLWltcGxlbWVudCB0aGUgaW50ZXJmYWNlLlxyXG4gIHByaXZhdGUgcmVhZG9ubHkgdmlicmF0aW9uTWVzc2FnZUhhbmRsZXJzOiBSZWNvcmQ8c3RyaW5nLCBJbnRlbnRpb25hbEFueT47XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gT25seSBhdmFpbGFibGUgaW4gU2FmYXJpIGVudmlyb25tZW50cy4gRnVydGhlciB0eXBpbmcgbm90IG5lY2Vzc2FyeSBmb3IgcHJvdG90eXBlIGNvZGUuXHJcbiAgICBpZiAoIHdpbmRvdy53ZWJraXQgKSB7XHJcblxyXG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gT25seSBhdmFpbGFibGUgaW4gU2FmYXJpIGVudmlyb25tZW50cy4gRnVydGhlciB0eXBpbmcgbm90IG5lY2Vzc2FyeSBmb3IgcHJvdG90eXBlIGNvZGUuXHJcbiAgICAgIHRoaXMudmlicmF0aW9uTWVzc2FnZUhhbmRsZXJzID0gd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnM7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuXHJcbiAgICAgIC8vIFRPRE86IFB1dCBzb21ldGhpbmcgcmVhc29uYWJsZSBoZXJlLlxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoICdub3Qgb24gdGhpcyBkZXZpY2UhJyApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgYSB0aW1lZCB2aWJyYXRpb24gZm9yIHRoZSBwcm92aWRlZCB0aW1lIGluIHNlY29uZHMuXHJcbiAgICovXHJcbiAgcHVibGljIHZpYnJhdGUoIHNlY29uZHM6IG51bWJlciApOiB2b2lkIHtcclxuICAgIGlmICggdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMgJiYgdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMudmlicmF0ZU1lc3NhZ2VIYW5kbGVyICkge1xyXG4gICAgICB0aGlzLnZpYnJhdGlvbk1lc3NhZ2VIYW5kbGVycy52aWJyYXRlTWVzc2FnZUhhbmRsZXIucG9zdE1lc3NhZ2UoIHsgZHVyYXRpb246IHNlY29uZHMgfSApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgYSB2aWJyYXRpb24gdGhhdCB3aWxsIGNvbnRpbnVlIGZvcmV2ZXIuXHJcbiAgICovXHJcbiAgcHVibGljIHZpYnJhdGVGb3JldmVyKCk6IHZvaWQge1xyXG5cclxuICAgIGlmICggdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMgJiZcclxuICAgICAgICAgdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMudmlicmF0ZUZvcmV2ZXJNZXNzYWdlSGFuZGxlciApIHtcclxuXHJcbiAgICAgIHRoaXMudmlicmF0aW9uTWVzc2FnZUhhbmRsZXJzLnZpYnJhdGVGb3JldmVyTWVzc2FnZUhhbmRsZXIucG9zdE1lc3NhZ2UoIHt9ICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXF1ZXN0IGEgY29udGludW91cyB2aWJyYXRpb24gd2l0aCBwcm92aWRlZCBwYXJhbWV0ZXJzLiBUaGlzIHNob3VsZCByZXBsYWNlIGFsbCBvdGhlciBmdW5jdGlvbnMgaW4gdGhlIGZ1dHVyZS5cclxuICAgKi9cclxuICBwdWJsaWMgdmlicmF0ZUNvbnRpbnVvdXMoIHByb3ZpZGVkT3B0aW9ucz86IFZpYnJhdGVPcHRpb25zICk6IHZvaWQge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxWaWJyYXRlT3B0aW9ucz4oKSgge1xyXG5cclxuICAgICAgLy8ge251bWJlcltdfSAtIGEgcGF0dGVybiBmb3IgdGhlIHZpYnJhdGlvbiwgYWx0ZXJuYXRpbmcgdmFsdWVzIGluIHNlY29uZHMgd2hlcmUgZXZlbiBpbmRpY2VzIGFyZSB0aW1lIHdoZW4gdGhlXHJcbiAgICAgIC8vIHZpYnJhdGlvbiBpcyBcIm9uXCIgYW5kIG9kZCBpbmRpY2VzIGhhdmUgdGhlIG1vdG9yIG9mZi4gVGhlIHBhdHRlcm4gd2lsbCByZXBlYXQgZm9yIG9wdGlvbnMuZHVyYXRpb24gb3IgZm9yZXZlclxyXG4gICAgICAvLyBpZiB0aGF0IG9wdGlvbiBpcyBudWxsLlxyXG4gICAgICBwYXR0ZXJuOiBbXSxcclxuXHJcbiAgICAgIC8vIHtudW1iZXJ9XHJcbiAgICAgIHNoYXJwbmVzczogMSxcclxuXHJcbiAgICAgIC8vIHtudW1iZXJ9XHJcbiAgICAgIGludGVuc2l0eTogMSxcclxuXHJcbiAgICAgIC8vIFRPRE86IGFkZCBzdXBwb3J0IGZvciBmcmVxdWVuY3lcclxuICAgICAgZnJlcXVlbmN5OiBudWxsLFxyXG5cclxuICAgICAgLy8ge251bWJlcnxudWxsfSAtIGR1cmF0aW9uIGluZGljYXRlcyB0aGF0IHRoaXMgdmlicmF0aW9uIHdpbGwgcHJvY2VlZCBmb3JldmVyXHJcbiAgICAgIGR1cmF0aW9uOiBudWxsXHJcbiAgICB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICBpZiAoIHRoaXMudmlicmF0aW9uTWVzc2FnZUhhbmRsZXJzICYmIHRoaXMudmlicmF0aW9uTWVzc2FnZUhhbmRsZXJzLnZpYnJhdGVDb250aW51b3VzTWVzc2FnZUhhbmRsZXIgKSB7XHJcbiAgICAgIHRoaXMudmlicmF0aW9uTWVzc2FnZUhhbmRsZXJzLnZpYnJhdGVDb250aW51b3VzTWVzc2FnZUhhbmRsZXIucG9zdE1lc3NhZ2UoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGF0dGVybjogb3B0aW9ucy5wYXR0ZXJuLFxyXG4gICAgICAgICAgc2hhcnBuZXNzOiBvcHRpb25zLnNoYXJwbmVzcyxcclxuICAgICAgICAgIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uLFxyXG4gICAgICAgICAgaW50ZW5zaXR5OiBvcHRpb25zLmludGVuc2l0eSxcclxuICAgICAgICAgIGZyZXF1ZW5jeTogb3B0aW9ucy5mcmVxdWVuY3lcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogUmVxdWVzdCBhIHRyYW5zaWVudCB2aWJyYXRpb24uIEEgdHJhbnNpZW50IHZpYnJhdGlvbiBpcyBhIHNpbmdsZSBwdWxzZSBhdCBhIHBhcnRpY3VsYXIgdGltZSB3aXRob3V0IGFueSBkdXJhdGlvbi5cclxuICAgKiBJdCBpcyB1c2VkIHR5cGljYWxseSBmb3IgYmFzaWMgVUkgY29tcG9uZW50cyB0byBpbmRpY2F0ZSBzdWNjZXNzZnVsIGFjdGl2YXRpb24gb3IgY2hhbmdlLiBVc2UgdmlicmF0ZUNvbnRpbnVvdXMgZm9yXHJcbiAgICogbG9uZ2VyIGFuZCBtb3JlIGNvbXBsaWNhdGVkIHZpYnJhdGlvbnMuXHJcbiAgICovXHJcbiAgcHVibGljIHZpYnJhdGVUcmFuc2llbnQoIHByb3ZpZGVkT3B0aW9ucz86IFZpYnJhdGVPcHRpb25zICk6IHZvaWQge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxWaWJyYXRlT3B0aW9ucywgRW1wdHlTZWxmT3B0aW9ucz4oKSgge1xyXG4gICAgICBzaGFycG5lc3M6IDEsXHJcbiAgICAgIGludGVuc2l0eTogMVxyXG4gICAgfSwgcHJvdmlkZWRPcHRpb25zICk7XHJcblxyXG4gICAgaWYgKCB0aGlzLnZpYnJhdGlvbk1lc3NhZ2VIYW5kbGVycyAmJiB0aGlzLnZpYnJhdGlvbk1lc3NhZ2VIYW5kbGVycy52aWJyYXRlVHJhbnNpZW50TWVzc2FnZUhhbmRsZXIgKSB7XHJcbiAgICAgIHRoaXMudmlicmF0aW9uTWVzc2FnZUhhbmRsZXJzLnZpYnJhdGVUcmFuc2llbnRNZXNzYWdlSGFuZGxlci5wb3N0TWVzc2FnZShcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzaGFycG5lc3M6IG9wdGlvbnMuc2hhcnBuZXNzLFxyXG4gICAgICAgICAgaW50ZW5zaXR5OiBvcHRpb25zLmludGVuc2l0eVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0IGEgdmlicmF0aW9uIGZvciB0aGUgcHJvdmlkZWQgZHVyYXRpb24sIHdpdGggYSBwcm92aWRlZCBmcmVxdWVuY3kuXHJcbiAgICovXHJcbiAgcHVibGljIHZpYnJhdGVBdEZyZXF1ZW5jeSggc2Vjb25kczogbnVtYmVyLCBmcmVxdWVuY3k6IG51bWJlciApOiB2b2lkIHtcclxuICAgIGlmICggdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMgJiYgdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMudmlicmF0ZUZyZXF1ZW5jeU1lc3NhZ2VIYW5kbGVyICkge1xyXG4gICAgICB0aGlzLnZpYnJhdGlvbk1lc3NhZ2VIYW5kbGVycy52aWJyYXRlRnJlcXVlbmN5TWVzc2FnZUhhbmRsZXIucG9zdE1lc3NhZ2UoXHJcbiAgICAgICAgeyBkdXJhdGlvbjogc2Vjb25kcywgZnJlcXVlbmN5OiBmcmVxdWVuY3kgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVmlicmF0ZSBhdCB0aGUgZGVzaXJlZCBmcmVxdWVuY3kuXHJcbiAgICogQHBhcmFtIGZyZXF1ZW5jeVxyXG4gICAqIEBwYXJhbSBbaW50ZW5zaXR5XSAtIGZyb20gMCB0byAxXHJcbiAgICovXHJcbiAgcHVibGljIHZpYnJhdGVBdEZyZXF1ZW5jeUZvcmV2ZXIoIGZyZXF1ZW5jeTogbnVtYmVyLCBpbnRlbnNpdHk/OiBudW1iZXIgKTogdm9pZCB7XHJcbiAgICBpbnRlbnNpdHkgPSB0eXBlb2YgaW50ZW5zaXR5ID09PSAnbnVtYmVyJyA/IGludGVuc2l0eSA6IDE7XHJcbiAgICBpbnRlbnNpdHkgPSBVdGlscy5jbGFtcCggaW50ZW5zaXR5LCAwLCAxICk7XHJcbiAgICB0aGlzLmRlYnVnKCBgJHtpbnRlbnNpdHl9YCApO1xyXG5cclxuICAgIGlmICggdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMgJiYgdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMudmlicmF0ZUZyZXF1ZW5jeUZvcmV2ZXJNZXNzYWdlSGFuZGxlciApIHtcclxuICAgICAgdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMubWVzc2FnZUhhbmRsZXJzLnZpYnJhdGVGcmVxdWVuY3lGb3JldmVyTWVzc2FnZUhhbmRsZXIucG9zdE1lc3NhZ2UoXHJcbiAgICAgICAgeyBmcmVxdWVuY3k6IGZyZXF1ZW5jeSwgaW50ZW5zaXR5OiBpbnRlbnNpdHkgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVxdWVzdCBhIHZpYnJhdGlvbiB3aXRoIGEgY3VzdG9tIHBhdHRlcm4gdGhhdCBsb29wcyBmb3JldmVyLlxyXG4gICAqIEBwYXJhbSB2aWJyYXRpb25QYXR0ZXJuIC0gYWx0ZXJuYXRpbmcgdmFsdWVzIHdoZXJlIGV2ZW4gaW5kZXhlcyBhcmUgXCJvblwiIHRpbWUsIG9kZCBpbmRpY2VzIGFyZSBcIm9mZlwiXHJcbiAgICogQHBhcmFtIHNlY29uZHMgLSB0aW1lIGluIHNlY29uZHMsIGhvdyBsb25nIHRvIHJ1biB0aGUgdmlicmF0aW9uXHJcbiAgICogQHBhcmFtIGxvb3BGb3JldmVyIC0gc2hvdWxkIHRoaXMgbG9vcCBmb3JldmVyP1xyXG4gICAqL1xyXG4gIHB1YmxpYyB2aWJyYXRlV2l0aEN1c3RvbVBhdHRlcm4oIHZpYnJhdGlvblBhdHRlcm46IG51bWJlcltdLCBzZWNvbmRzOiBudW1iZXIsIGxvb3BGb3JldmVyOiBib29sZWFuICk6IHZvaWQge1xyXG4gICAgaWYgKCB0aGlzLnZpYnJhdGlvbk1lc3NhZ2VIYW5kbGVycyAmJiB0aGlzLnZpYnJhdGlvbk1lc3NhZ2VIYW5kbGVycy52aWJyYXRlV2l0aEN1c3RvbVBhdHRlcm5NZXNzYWdlSGFuZGxlciApIHtcclxuICAgICAgdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMudmlicmF0ZVdpdGhDdXN0b21QYXR0ZXJuTWVzc2FnZUhhbmRsZXIucG9zdE1lc3NhZ2UoIHtcclxuICAgICAgICB2aWJyYXRpb25QYXR0ZXJuOiB2aWJyYXRpb25QYXR0ZXJuLFxyXG4gICAgICAgIGR1cmF0aW9uOiBzZWNvbmRzLFxyXG4gICAgICAgIGxvb3BGb3JldmVyOiBsb29wRm9yZXZlclxyXG4gICAgICB9ICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBWaWJyYXRlIHdpdGggYSBjdXN0b20gcGF0dGVybiBmb3IgdGhlIHByb3ZpZGVkIGR1cmF0aW9uLlxyXG4gICAqIEBwYXJhbSB2aWJyYXRpb25QYXR0ZXJuIC0gYWx0ZXJuYXRpdmUgdmFsdWVzIHdoZXJlIGV2ZW4gaW5kZXhlcyBhcmUgXCJvblwiIHRpbWUgYW5kIG9kZCBpbmRleGVzIGFyZSBcIm9mZlwiXHJcbiAgICogQHBhcmFtIHNlY29uZHNcclxuICAgKi9cclxuICBwdWJsaWMgdmlicmF0ZVdpdGhDdXN0b21QYXR0ZXJuRHVyYXRpb24oIHZpYnJhdGlvblBhdHRlcm46IG51bWJlcltdLCBzZWNvbmRzOiBudW1iZXIgKTogdm9pZCB7XHJcbiAgICBpZiAoIHRoaXMudmlicmF0aW9uTWVzc2FnZUhhbmRsZXJzICYmIHRoaXMudmlicmF0aW9uTWVzc2FnZUhhbmRsZXJzLnZpYnJhdGVXaXRoQ3VzdG9tUGF0dGVybkR1cmF0aW9uTWVzc2FnZUhhbmRsZXIgKSB7XHJcbiAgICAgIHRoaXMudmlicmF0aW9uTWVzc2FnZUhhbmRsZXJzLnZpYnJhdGVXaXRoQ3VzdG9tUGF0dGVybkR1cmF0aW9uTWVzc2FnZUhhbmRsZXIucG9zdE1lc3NhZ2UoIHtcclxuICAgICAgICB2aWJyYXRpb25QYXR0ZXJuOiB2aWJyYXRpb25QYXR0ZXJuLFxyXG4gICAgICAgIGR1cmF0aW9uOiBzZWNvbmRzXHJcbiAgICAgIH0gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZpYnJhdGUgd2l0aCBhIGN1c3RvbSBwYXR0ZXJuIGZvcmV2ZXIuXHJcbiAgICogQHBhcmFtIHZpYnJhdGlvblBhdHRlcm4gLSBhbHRlcm5hdGluZyB2YWx1ZXMgb2YgXCJvblwiIGFuZCBcIm9mZlwiIHRpbWUgaW4gc2Vjb25kcywgc3RhcnRpbmcgd2l0aCBcIm9uXCIgdGltZS5cclxuICAgKi9cclxuICBwdWJsaWMgdmlicmF0ZVdpdGhDdXN0b21QYXR0ZXJuRm9yZXZlciggdmlicmF0aW9uUGF0dGVybjogbnVtYmVyW10gKTogdm9pZCB7XHJcbiAgICBpZiAoIHRoaXMudmlicmF0aW9uTWVzc2FnZUhhbmRsZXJzICYmIHRoaXMudmlicmF0aW9uTWVzc2FnZUhhbmRsZXJzLnZpYnJhdGVXaXRoQ3VzdG9tUGF0dGVybkZvcmV2ZXJNZXNzYWdlSGFuZGxlciApIHtcclxuICAgICAgdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMudmlicmF0ZVdpdGhDdXN0b21QYXR0ZXJuRm9yZXZlck1lc3NhZ2VIYW5kbGVyLnBvc3RNZXNzYWdlKFxyXG4gICAgICAgIHsgdmlicmF0aW9uUGF0dGVybjogdmlicmF0aW9uUGF0dGVybiB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBpbnRlbnNpdHkgb2YgdGhlIGN1cnJlbnQgdmlicmF0aW9uLiBObyBlZmZlY3QgaWYgdGhlcmUgaXMgbm8gYWN0aXZlIHZpYnJhdGlvbi5cclxuICAgKiBAcGFyYW0gaW50ZW5zaXR5IC0gZnJvbSAwIHRvIDFcclxuICAgKi9cclxuICBwdWJsaWMgc2V0VmlicmF0aW9uSW50ZW5zaXR5KCBpbnRlbnNpdHk6IG51bWJlciApOiB2b2lkIHtcclxuICAgIGlmICggdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMgJiYgdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMudmlicmF0aW9uSW50ZW5zaXR5TWVzc2FnZUhhbmRsZXIgKSB7XHJcbiAgICAgIHRoaXMudmlicmF0aW9uTWVzc2FnZUhhbmRsZXJzLnZpYnJhdGlvbkludGVuc2l0eU1lc3NhZ2VIYW5kbGVyLnBvc3RNZXNzYWdlKCB7IGludGVuc2l0eTogaW50ZW5zaXR5IH0gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHNoYXJwbmVzcyBmb3IgdGhlIGN1cnJlbnQgdmlicmF0aW9uLiBObyBlZmZlY3QgaWYgdGhlcmUgaXMgbm8gYWN0aXZlIHZpYnJhdGlvbi5cclxuICAgKiBAcGFyYW0gc2hhcnBuZXNzIC0gZnJvbSAwIHRvIDFcclxuICAgKi9cclxuICBwdWJsaWMgc2V0VmlicmF0aW9uU2hhcnBuZXNzKCBzaGFycG5lc3M6IG51bWJlciApOiB2b2lkIHtcclxuICAgIGlmICggdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMgJiYgdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMudmlicmF0aW9uU2hhcnBuZXNzTWVzc2FnZUhhbmRsZXIgKSB7XHJcbiAgICAgIHRoaXMudmlicmF0aW9uTWVzc2FnZUhhbmRsZXJzLnZpYnJhdGlvblNoYXJwbmVzc01lc3NhZ2VIYW5kbGVyLnBvc3RNZXNzYWdlKCB7IHNoYXJwbmVzczogc2hhcnBuZXNzIH0gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgYW55IGFjdGl2ZSB2aWJyYXRpb24gaW1tZWRpYXRlbHkuXHJcbiAgICovXHJcbiAgcHVibGljIHN0b3AoKTogdm9pZCB7XHJcbiAgICBpZiAoIHRoaXMudmlicmF0aW9uTWVzc2FnZUhhbmRsZXJzICYmIHRoaXMudmlicmF0aW9uTWVzc2FnZUhhbmRsZXJzLnN0b3BNZXNzYWdlSGFuZGxlciApIHtcclxuICAgICAgdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMuc3RvcE1lc3NhZ2VIYW5kbGVyLnBvc3RNZXNzYWdlKFxyXG4gICAgICAgIHt9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTYXZlcyB0aGUgcHJvdmlkZWQgZGF0YSBzdHJpbmcgdG8gdGhlIGNvbnRhaW5pbmcgU3dpZnQgYXBwLiBEYXRhIHN0cmluZyBpcyBnZW5lcmF0ZWQgYnkgVmlicmF0aW9uVGVzdEV2ZW50UmVjb3JkZXIuXHJcbiAgICogQHBhcmFtIGRhdGFTdHJpbmcgLSB0aGUgc3RyaW5nIHRvIHNhdmVcclxuICAgKi9cclxuICBwdWJsaWMgc2F2ZVRlc3RFdmVudHMoIGRhdGFTdHJpbmc6IHN0cmluZyApOiB2b2lkIHtcclxuICAgIGlmICggdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMgJiYgdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMuc2F2ZURhdGFNZXNzYWdlSGFuZGxlciApIHtcclxuICAgICAgdGhpcy52aWJyYXRpb25NZXNzYWdlSGFuZGxlcnMuc2F2ZURhdGFNZXNzYWdlSGFuZGxlci5wb3N0TWVzc2FnZSgge1xyXG4gICAgICAgIGRhdGFTdHJpbmc6IGRhdGFTdHJpbmdcclxuICAgICAgfSApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VuZCBhIGRlYnVnIG1lc3NhZ2UgdG8gdGhlIGNvbnRhaW5pbmcgYXBwIHRoYXQgd2lsbCBiZSBwcmludGVkIGluIHRoZSBkZWJ1Z2dpbmcgdG9vbHMuXHJcbiAgICovXHJcbiAgcHVibGljIGRlYnVnKCBkZWJ1Z1N0cmluZzogc3RyaW5nICk6IHZvaWQge1xyXG4gICAgaWYgKCB0aGlzLnZpYnJhdGlvbk1lc3NhZ2VIYW5kbGVycyAmJiB0aGlzLnZpYnJhdGlvbk1lc3NhZ2VIYW5kbGVycy5kZWJ1Z01lc3NhZ2VIYW5kbGVyICkge1xyXG4gICAgICB0aGlzLnZpYnJhdGlvbk1lc3NhZ2VIYW5kbGVycy5kZWJ1Z01lc3NhZ2VIYW5kbGVyLnBvc3RNZXNzYWdlKCB7XHJcbiAgICAgICAgZGVidWdTdHJpbmc6IGRlYnVnU3RyaW5nXHJcbiAgICAgIH0gKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFZpYnJhdGVPcHRpb25zID0ge1xyXG5cclxuICAvLyBBIHBhdHRlcm4gZm9yIHRoZSB2aWJyYXRpb24sIGFsdGVybmF0aW5nIHZhbHVlcyBpbiBzZWNvbmRzIHdoZXJlIGV2ZW4gaW5kaWNlcyBhcmUgdGltZSB3aGVuIHRoZSBtb3RvciBpcyBcIm9uXCIgYW5kXHJcbiAgLy8gb2RkIGluZGljZXMgaGF2ZSB0aGUgbW90b3Igb2ZmLiBUaGUgcGF0dGVybiB3aWxsIHJlcGVhdCBmb3Igb3B0aW9ucy5kdXJhdGlvbiBvciBmb3JldmVyIGlmIHRoYXQgb3B0aW9uIGlzIG51bGxcclxuICBwYXR0ZXJuPzogbnVtYmVyW107XHJcblxyXG4gIHNoYXJwbmVzcz86IG51bWJlcjtcclxuICBpbnRlbnNpdHk/OiBudW1iZXI7XHJcblxyXG4gIC8vIFRPRE86IGFkZCBzdXBwb3J0IGZvciBmcmVxdWVuY3lcclxuICBmcmVxdWVuY3k/OiBudW1iZXIgfCBudWxsO1xyXG5cclxuICAvLyBkdXJhdGlvbiBpbmRpY2F0ZXMgdGhhdCB0aGlzIHZpYnJhdGlvbiB3aWxsIHByb2NlZWQgZm9yZXZlclxyXG4gIGR1cmF0aW9uPzogbnVtYmVyIHwgbnVsbDtcclxufTtcclxuXHJcbnRhcHBpLnJlZ2lzdGVyKCAnVmlicmF0aW9uTWFuYWdlcmlPUycsIFZpYnJhdGlvbk1hbmFnZXJpT1MgKTtcclxuZXhwb3J0IGRlZmF1bHQgVmlicmF0aW9uTWFuYWdlcmlPUzsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxLQUFLLE1BQU0sdUJBQXVCO0FBQ3pDLE9BQU9DLFNBQVMsTUFBNEIsaUNBQWlDO0FBRTdFLE9BQU9DLEtBQUssTUFBTSxZQUFZOztBQUU5QjtBQUNBO0FBQ0E7QUFDQSxNQUFNQyxtQkFBbUIsQ0FBQztFQUV4QjtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUdPQyxXQUFXQSxDQUFBLEVBQUc7SUFFbkI7SUFDQSxJQUFLQyxNQUFNLENBQUNDLE1BQU0sRUFBRztNQUVuQjtNQUNBLElBQUksQ0FBQ0Msd0JBQXdCLEdBQUdGLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDRSxlQUFlO0lBQy9ELENBQUMsTUFDSTtNQUVIO01BQ0EsTUFBTSxJQUFJQyxLQUFLLENBQUUscUJBQXNCLENBQUM7SUFD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