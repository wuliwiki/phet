// Copyright 2018-2022, University of Colorado Boulder

/**
 * Monitors the memory usage over time.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import RunningAverage from '../../dot/js/RunningAverage.js';
import optionize from '../../phet-core/js/optionize.js';
import joist from './joist.js';

// constants
const MB = 1024 * 1024;

// globals
let hadMemoryFailure = false;
class MemoryMonitor {
  constructor(providedOptions) {
    const options = optionize()({
      // {number} - Quantity of measurements in the running average
      windowSize: 2000,
      // {number} - Number of megabytes before operations will throw an error
      memoryLimit: phet.chipper.queryParameters.memoryLimit
    }, providedOptions);
    this.memoryLimit = options.memoryLimit * MB;
    this.runningAverage = new RunningAverage(options.windowSize);
    this.lastMemory = 0;
  }

  /**
   * Records a memory measurement.
   */
  measure() {
    // @ts-expect-error Until we make typescript know about performance.memory
    if (!window.performance || !window.performance.memory || !window.performance.memory.usedJSHeapSize) {
      return;
    }

    // @ts-expect-error Until we make typescript know about performance.memory
    const currentMemory = window.performance.memory.usedJSHeapSize;
    this.lastMemory = currentMemory;
    const averageMemory = this.runningAverage.updateRunningAverage(currentMemory);
    if (this.memoryLimit && this.runningAverage.isSaturated() && !hadMemoryFailure && averageMemory > this.memoryLimit && currentMemory > this.memoryLimit * 0.5) {
      hadMemoryFailure = true;
      throw new Error(`Average memory used (${MemoryMonitor.memoryString(averageMemory)}) is above our memoryLimit (${MemoryMonitor.memoryString(this.memoryLimit)}). Current memory: ${MemoryMonitor.memoryString(currentMemory)}.`);
    }
  }

  /**
   * Converts a number of bytes into a quick-to-read memory string.
   */
  static memoryString(bytes) {
    return `${Math.ceil(bytes / MB)}MB`;
  }
}
joist.register('MemoryMonitor', MemoryMonitor);
export default MemoryMonitor;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSdW5uaW5nQXZlcmFnZSIsIm9wdGlvbml6ZSIsImpvaXN0IiwiTUIiLCJoYWRNZW1vcnlGYWlsdXJlIiwiTWVtb3J5TW9uaXRvciIsImNvbnN0cnVjdG9yIiwicHJvdmlkZWRPcHRpb25zIiwib3B0aW9ucyIsIndpbmRvd1NpemUiLCJtZW1vcnlMaW1pdCIsInBoZXQiLCJjaGlwcGVyIiwicXVlcnlQYXJhbWV0ZXJzIiwicnVubmluZ0F2ZXJhZ2UiLCJsYXN0TWVtb3J5IiwibWVhc3VyZSIsIndpbmRvdyIsInBlcmZvcm1hbmNlIiwibWVtb3J5IiwidXNlZEpTSGVhcFNpemUiLCJjdXJyZW50TWVtb3J5IiwiYXZlcmFnZU1lbW9yeSIsInVwZGF0ZVJ1bm5pbmdBdmVyYWdlIiwiaXNTYXR1cmF0ZWQiLCJFcnJvciIsIm1lbW9yeVN0cmluZyIsImJ5dGVzIiwiTWF0aCIsImNlaWwiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIk1lbW9yeU1vbml0b3IudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogTW9uaXRvcnMgdGhlIG1lbW9yeSB1c2FnZSBvdmVyIHRpbWUuXHJcbiAqXHJcbiAqIEBhdXRob3IgSm9uYXRoYW4gT2xzb24gPGpvbmF0aGFuLm9sc29uQGNvbG9yYWRvLmVkdT5cclxuICovXHJcblxyXG5pbXBvcnQgUnVubmluZ0F2ZXJhZ2UgZnJvbSAnLi4vLi4vZG90L2pzL1J1bm5pbmdBdmVyYWdlLmpzJztcclxuaW1wb3J0IG9wdGlvbml6ZSBmcm9tICcuLi8uLi9waGV0LWNvcmUvanMvb3B0aW9uaXplLmpzJztcclxuaW1wb3J0IGpvaXN0IGZyb20gJy4vam9pc3QuanMnO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IE1CID0gMTAyNCAqIDEwMjQ7XHJcblxyXG4vLyBnbG9iYWxzXHJcbmxldCBoYWRNZW1vcnlGYWlsdXJlID0gZmFsc2U7XHJcblxyXG50eXBlIE1lbW9yeU1vbml0b3JPcHRpb25zID0ge1xyXG4gIHdpbmRvd1NpemU/OiBudW1iZXI7XHJcbiAgbWVtb3J5TGltaXQ/OiBudW1iZXI7XHJcbn07XHJcblxyXG5jbGFzcyBNZW1vcnlNb25pdG9yIHtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBtZW1vcnlMaW1pdDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBydW5uaW5nQXZlcmFnZTogUnVubmluZ0F2ZXJhZ2U7XHJcbiAgcHJpdmF0ZSBsYXN0TWVtb3J5OiBudW1iZXI7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggcHJvdmlkZWRPcHRpb25zPzogTWVtb3J5TW9uaXRvck9wdGlvbnMgKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gb3B0aW9uaXplPE1lbW9yeU1vbml0b3JPcHRpb25zPigpKCB7XHJcblxyXG4gICAgICAvLyB7bnVtYmVyfSAtIFF1YW50aXR5IG9mIG1lYXN1cmVtZW50cyBpbiB0aGUgcnVubmluZyBhdmVyYWdlXHJcbiAgICAgIHdpbmRvd1NpemU6IDIwMDAsXHJcblxyXG4gICAgICAvLyB7bnVtYmVyfSAtIE51bWJlciBvZiBtZWdhYnl0ZXMgYmVmb3JlIG9wZXJhdGlvbnMgd2lsbCB0aHJvdyBhbiBlcnJvclxyXG4gICAgICBtZW1vcnlMaW1pdDogcGhldC5jaGlwcGVyLnF1ZXJ5UGFyYW1ldGVycy5tZW1vcnlMaW1pdFxyXG4gICAgfSwgcHJvdmlkZWRPcHRpb25zICk7XHJcblxyXG4gICAgdGhpcy5tZW1vcnlMaW1pdCA9IG9wdGlvbnMubWVtb3J5TGltaXQgKiBNQjtcclxuICAgIHRoaXMucnVubmluZ0F2ZXJhZ2UgPSBuZXcgUnVubmluZ0F2ZXJhZ2UoIG9wdGlvbnMud2luZG93U2l6ZSApO1xyXG4gICAgdGhpcy5sYXN0TWVtb3J5ID0gMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlY29yZHMgYSBtZW1vcnkgbWVhc3VyZW1lbnQuXHJcbiAgICovXHJcbiAgcHVibGljIG1lYXN1cmUoKTogdm9pZCB7XHJcblxyXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciBVbnRpbCB3ZSBtYWtlIHR5cGVzY3JpcHQga25vdyBhYm91dCBwZXJmb3JtYW5jZS5tZW1vcnlcclxuICAgIGlmICggIXdpbmRvdy5wZXJmb3JtYW5jZSB8fCAhd2luZG93LnBlcmZvcm1hbmNlLm1lbW9yeSB8fCAhd2luZG93LnBlcmZvcm1hbmNlLm1lbW9yeS51c2VkSlNIZWFwU2l6ZSApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgVW50aWwgd2UgbWFrZSB0eXBlc2NyaXB0IGtub3cgYWJvdXQgcGVyZm9ybWFuY2UubWVtb3J5XHJcbiAgICBjb25zdCBjdXJyZW50TWVtb3J5ID0gd2luZG93LnBlcmZvcm1hbmNlLm1lbW9yeS51c2VkSlNIZWFwU2l6ZTtcclxuICAgIHRoaXMubGFzdE1lbW9yeSA9IGN1cnJlbnRNZW1vcnk7XHJcbiAgICBjb25zdCBhdmVyYWdlTWVtb3J5ID0gdGhpcy5ydW5uaW5nQXZlcmFnZS51cGRhdGVSdW5uaW5nQXZlcmFnZSggY3VycmVudE1lbW9yeSApO1xyXG5cclxuICAgIGlmICggdGhpcy5tZW1vcnlMaW1pdCAmJlxyXG4gICAgICAgICB0aGlzLnJ1bm5pbmdBdmVyYWdlLmlzU2F0dXJhdGVkKCkgJiZcclxuICAgICAgICAgIWhhZE1lbW9yeUZhaWx1cmUgJiZcclxuICAgICAgICAgYXZlcmFnZU1lbW9yeSA+IHRoaXMubWVtb3J5TGltaXQgJiZcclxuICAgICAgICAgY3VycmVudE1lbW9yeSA+IHRoaXMubWVtb3J5TGltaXQgKiAwLjUgKSB7XHJcbiAgICAgIGhhZE1lbW9yeUZhaWx1cmUgPSB0cnVlO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoIGBBdmVyYWdlIG1lbW9yeSB1c2VkICgke01lbW9yeU1vbml0b3IubWVtb3J5U3RyaW5nKCBhdmVyYWdlTWVtb3J5ICl9KSBpcyBhYm92ZSBvdXIgbWVtb3J5TGltaXQgKCR7TWVtb3J5TW9uaXRvci5tZW1vcnlTdHJpbmcoIHRoaXMubWVtb3J5TGltaXQgKX0pLiBDdXJyZW50IG1lbW9yeTogJHtNZW1vcnlNb25pdG9yLm1lbW9yeVN0cmluZyggY3VycmVudE1lbW9yeSApfS5gICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb252ZXJ0cyBhIG51bWJlciBvZiBieXRlcyBpbnRvIGEgcXVpY2stdG8tcmVhZCBtZW1vcnkgc3RyaW5nLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdGljIG1lbW9yeVN0cmluZyggYnl0ZXM6IG51bWJlciApOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGAke01hdGguY2VpbCggYnl0ZXMgLyBNQiApfU1CYDtcclxuICB9XHJcbn1cclxuXHJcbmpvaXN0LnJlZ2lzdGVyKCAnTWVtb3J5TW9uaXRvcicsIE1lbW9yeU1vbml0b3IgKTtcclxuZXhwb3J0IGRlZmF1bHQgTWVtb3J5TW9uaXRvcjsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsY0FBYyxNQUFNLGdDQUFnQztBQUMzRCxPQUFPQyxTQUFTLE1BQU0saUNBQWlDO0FBQ3ZELE9BQU9DLEtBQUssTUFBTSxZQUFZOztBQUU5QjtBQUNBLE1BQU1DLEVBQUUsR0FBRyxJQUFJLEdBQUcsSUFBSTs7QUFFdEI7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBRyxLQUFLO0FBTzVCLE1BQU1DLGFBQWEsQ0FBQztFQU1YQyxXQUFXQSxDQUFFQyxlQUFzQyxFQUFHO0lBQzNELE1BQU1DLE9BQU8sR0FBR1AsU0FBUyxDQUF1QixDQUFDLENBQUU7TUFFakQ7TUFDQVEsVUFBVSxFQUFFLElBQUk7TUFFaEI7TUFDQUMsV0FBVyxFQUFFQyxJQUFJLENBQUNDLE9BQU8sQ0FBQ0MsZUFBZSxDQUFDSDtJQUM1QyxDQUFDLEVBQUVILGVBQWdCLENBQUM7SUFFcEIsSUFBSSxDQUFDRyxXQUFXLEdBQUdGLE9BQU8sQ0FBQ0UsV0FBVyxHQUFHUCxFQUFFO0lBQzNDLElBQUksQ0FBQ1csY0FBYyxHQUFHLElBQUlkLGNBQWMsQ0FBRVEsT0FBTyxDQUFDQyxVQUFXLENBQUM7SUFDOUQsSUFBSSxDQUFDTSxVQUFVLEdBQUcsQ0FBQztFQUNyQjs7RUFFQTtBQUNGO0FBQ0E7RUFDU0MsT0FBT0EsQ0FBQSxFQUFTO0lBRXJCO0lBQ0EsSUFBSyxDQUFDQyxNQUFNLENBQUNDLFdBQVcsSUFBSSxDQUFDRCxNQUFNLENBQUNDLFdBQVcsQ0FBQ0MsTUFBTSxJQUFJLENBQUNGLE1BQU0sQ0FBQ0MsV0FBVyxDQUFDQyxNQUFNLENBQUNDLGNBQWMsRUFBRztNQUNwRztJQUNGOztJQUVBO0lBQ0EsTUFBTUMsYUFBYSxHQUFHSixNQUFNLENBQUNDLFdBQVcsQ0FBQ0MsTUFBTSxDQUFDQyxjQUFjO0lBQzlELElBQUksQ0FBQ0wsVUFBVSxHQUFHTSxhQUFhO0lBQy9CLE1BQU1DLGFBQWEsR0FBRyxJQUFJLENBQUNSLGNBQWMsQ0FBQ1Msb0JBQW9CLENBQUVGLGFBQWMsQ0FBQztJQUUvRSxJQUFLLElBQUksQ0FBQ1gsV0FBVyxJQUNoQixJQUFJLENBQUNJLGNBQWMsQ0FBQ1UsV0FBVyxDQUFDLENBQUMsSUFDakMsQ0FBQ3BCLGdCQUFnQixJQUNqQmtCLGFBQWEsR0FBRyxJQUFJLENBQUNaLFdBQVcsSUFDaENXLGFBQWEsR0FBRyxJQUFJLENBQUNYLFdBQVcsR0FBRyxHQUFHLEVBQUc7TUFDNUNOLGdCQUFnQixHQUFHLElBQUk7TUFDdkIsTUFBTSxJQUFJcUIsS0FBSyxDQUFHLHdCQUF1QnBCLGFBQWEsQ0FBQ3FCLFlBQVksQ0FBRUosYUFBYyxDQUFFLCtCQUE4QmpCLGFBQWEsQ0FBQ3FCLFlBQVksQ0FBRSxJQUFJLENBQUNoQixXQUFZLENBQUUsc0JBQXFCTCxhQUFhLENBQUNxQixZQUFZLENBQUVMLGFBQWMsQ0FBRSxHQUFHLENBQUM7SUFDek87RUFDRjs7RUFFQTtBQUNGO0FBQ0E7RUFDRSxPQUFlSyxZQUFZQSxDQUFFQyxLQUFhLEVBQVc7SUFDbkQsT0FBUSxHQUFFQyxJQUFJLENBQUNDLElBQUksQ0FBRUYsS0FBSyxHQUFHeEIsRUFBRyxDQUFFLElBQUc7RUFDdkM7QUFDRjtBQUVBRCxLQUFLLENBQUM0QixRQUFRLENBQUUsZUFBZSxFQUFFekIsYUFBYyxDQUFDO0FBQ2hELGVBQWVBLGFBQWEifQ==