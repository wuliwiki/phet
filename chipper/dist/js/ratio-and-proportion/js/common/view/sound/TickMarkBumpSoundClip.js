// Copyright 2020-2022, University of Colorado Boulder

/**
 * A short sound to indicate when a movable component has crossed over a tick mark.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import SoundClip from '../../../../../tambo/js/sound-generators/SoundClip.js';
import generalSoftClick_mp3 from '../../../../../tambo/sounds/generalSoftClick_mp3.js';
import ratioAndProportion from '../../../ratioAndProportion.js';
// This value was copied from similar sound work done in Waves Intro
const MIN_INTER_CLICK_TIME = 33.3; // min time between clicking sounds, in milliseconds, empirically determined

class TickMarkBumpSoundClip extends SoundClip {
  // by keeping track of the last value, we can test if we passed a tick mark. This is updated with the
  // granularity of how often an interaction occurs, see this.onInteract().
  /**
   * @param tickMarkRangeProperty - serves as the divisor of the position range to yield position
   * where bump sounds should occur.
   * @param positionRange - the total range in position
   * @param [options]
   */
  constructor(tickMarkRangeProperty, positionRange, options) {
    super(generalSoftClick_mp3, options);
    this.tickMarkRangeProperty = tickMarkRangeProperty;
    this.positionRange = positionRange;
    this.timeOfLastClick = 0;
    this.lastValue = null;
  }

  /**
   * Call this when an interaction occurs that could potentially cause a tick mark sound to play.
   */
  onInteract(currentValue) {
    if (this.lastValue !== null) {
      // handle the sound as desired for mouse/touch style input (for vertical changes)
      for (let i = 0; i < this.tickMarkRangeProperty.value; i++) {
        const tickValue = i / this.positionRange.getLength() / this.tickMarkRangeProperty.value;

        // Not at max or min, crossed a tick mark value
        if (currentValue !== this.positionRange.min && currentValue !== this.positionRange.max && (this.lastValue < tickValue && currentValue >= tickValue || this.lastValue > tickValue && currentValue <= tickValue)) {
          // if enough time has passed since the last change
          if (phet.joist.elapsedTime - this.timeOfLastClick >= MIN_INTER_CLICK_TIME) {
            this.play();
            this.timeOfLastClick = phet.joist.elapsedTime;
          }
          break;
        }
      }
    }
    this.lastValue = currentValue;
  }
  reset() {
    this.stop(0);
    this.timeOfLastClick = 0;
    this.lastValue = null;
  }
}
ratioAndProportion.register('TickMarkBumpSoundClip', TickMarkBumpSoundClip);
export default TickMarkBumpSoundClip;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTb3VuZENsaXAiLCJnZW5lcmFsU29mdENsaWNrX21wMyIsInJhdGlvQW5kUHJvcG9ydGlvbiIsIk1JTl9JTlRFUl9DTElDS19USU1FIiwiVGlja01hcmtCdW1wU291bmRDbGlwIiwiY29uc3RydWN0b3IiLCJ0aWNrTWFya1JhbmdlUHJvcGVydHkiLCJwb3NpdGlvblJhbmdlIiwib3B0aW9ucyIsInRpbWVPZkxhc3RDbGljayIsImxhc3RWYWx1ZSIsIm9uSW50ZXJhY3QiLCJjdXJyZW50VmFsdWUiLCJpIiwidmFsdWUiLCJ0aWNrVmFsdWUiLCJnZXRMZW5ndGgiLCJtaW4iLCJtYXgiLCJwaGV0Iiwiam9pc3QiLCJlbGFwc2VkVGltZSIsInBsYXkiLCJyZXNldCIsInN0b3AiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlRpY2tNYXJrQnVtcFNvdW5kQ2xpcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBBIHNob3J0IHNvdW5kIHRvIGluZGljYXRlIHdoZW4gYSBtb3ZhYmxlIGNvbXBvbmVudCBoYXMgY3Jvc3NlZCBvdmVyIGEgdGljayBtYXJrLlxyXG4gKlxyXG4gKiBAYXV0aG9yIE1pY2hhZWwgS2F1em1hbm4gKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqL1xyXG5cclxuaW1wb3J0IFNvdW5kQ2xpcCwgeyBTb3VuZENsaXBPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdGFtYm8vanMvc291bmQtZ2VuZXJhdG9ycy9Tb3VuZENsaXAuanMnO1xyXG5pbXBvcnQgZ2VuZXJhbFNvZnRDbGlja19tcDMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vdGFtYm8vc291bmRzL2dlbmVyYWxTb2Z0Q2xpY2tfbXAzLmpzJztcclxuaW1wb3J0IHJhdGlvQW5kUHJvcG9ydGlvbiBmcm9tICcuLi8uLi8uLi9yYXRpb0FuZFByb3BvcnRpb24uanMnO1xyXG5pbXBvcnQgUmFuZ2UgZnJvbSAnLi4vLi4vLi4vLi4vLi4vZG90L2pzL1JhbmdlLmpzJztcclxuaW1wb3J0IFByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uLy4uL2F4b24vanMvUHJvcGVydHkuanMnO1xyXG5cclxuLy8gVGhpcyB2YWx1ZSB3YXMgY29waWVkIGZyb20gc2ltaWxhciBzb3VuZCB3b3JrIGRvbmUgaW4gV2F2ZXMgSW50cm9cclxuY29uc3QgTUlOX0lOVEVSX0NMSUNLX1RJTUUgPSAzMy4zOyAvLyBtaW4gdGltZSBiZXR3ZWVuIGNsaWNraW5nIHNvdW5kcywgaW4gbWlsbGlzZWNvbmRzLCBlbXBpcmljYWxseSBkZXRlcm1pbmVkXHJcblxyXG5jbGFzcyBUaWNrTWFya0J1bXBTb3VuZENsaXAgZXh0ZW5kcyBTb3VuZENsaXAge1xyXG5cclxuICBwcml2YXRlIHRpY2tNYXJrUmFuZ2VQcm9wZXJ0eTogUHJvcGVydHk8bnVtYmVyPjtcclxuICBwcml2YXRlIHBvc2l0aW9uUmFuZ2U6IFJhbmdlO1xyXG4gIHByaXZhdGUgdGltZU9mTGFzdENsaWNrOiBudW1iZXI7XHJcblxyXG4gIC8vIGJ5IGtlZXBpbmcgdHJhY2sgb2YgdGhlIGxhc3QgdmFsdWUsIHdlIGNhbiB0ZXN0IGlmIHdlIHBhc3NlZCBhIHRpY2sgbWFyay4gVGhpcyBpcyB1cGRhdGVkIHdpdGggdGhlXHJcbiAgLy8gZ3JhbnVsYXJpdHkgb2YgaG93IG9mdGVuIGFuIGludGVyYWN0aW9uIG9jY3Vycywgc2VlIHRoaXMub25JbnRlcmFjdCgpLlxyXG4gIHByaXZhdGUgbGFzdFZhbHVlOiBudWxsIHwgbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gdGlja01hcmtSYW5nZVByb3BlcnR5IC0gc2VydmVzIGFzIHRoZSBkaXZpc29yIG9mIHRoZSBwb3NpdGlvbiByYW5nZSB0byB5aWVsZCBwb3NpdGlvblxyXG4gICAqIHdoZXJlIGJ1bXAgc291bmRzIHNob3VsZCBvY2N1ci5cclxuICAgKiBAcGFyYW0gcG9zaXRpb25SYW5nZSAtIHRoZSB0b3RhbCByYW5nZSBpbiBwb3NpdGlvblxyXG4gICAqIEBwYXJhbSBbb3B0aW9uc11cclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIHRpY2tNYXJrUmFuZ2VQcm9wZXJ0eTogUHJvcGVydHk8bnVtYmVyPiwgcG9zaXRpb25SYW5nZTogUmFuZ2UsIG9wdGlvbnM/OiBTb3VuZENsaXBPcHRpb25zICkge1xyXG4gICAgc3VwZXIoIGdlbmVyYWxTb2Z0Q2xpY2tfbXAzLCBvcHRpb25zICk7XHJcblxyXG4gICAgdGhpcy50aWNrTWFya1JhbmdlUHJvcGVydHkgPSB0aWNrTWFya1JhbmdlUHJvcGVydHk7XHJcbiAgICB0aGlzLnBvc2l0aW9uUmFuZ2UgPSBwb3NpdGlvblJhbmdlO1xyXG4gICAgdGhpcy50aW1lT2ZMYXN0Q2xpY2sgPSAwO1xyXG4gICAgdGhpcy5sYXN0VmFsdWUgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbCB0aGlzIHdoZW4gYW4gaW50ZXJhY3Rpb24gb2NjdXJzIHRoYXQgY291bGQgcG90ZW50aWFsbHkgY2F1c2UgYSB0aWNrIG1hcmsgc291bmQgdG8gcGxheS5cclxuICAgKi9cclxuICBwdWJsaWMgb25JbnRlcmFjdCggY3VycmVudFZhbHVlOiBudW1iZXIgKTogdm9pZCB7XHJcblxyXG4gICAgaWYgKCB0aGlzLmxhc3RWYWx1ZSAhPT0gbnVsbCApIHtcclxuXHJcbiAgICAgIC8vIGhhbmRsZSB0aGUgc291bmQgYXMgZGVzaXJlZCBmb3IgbW91c2UvdG91Y2ggc3R5bGUgaW5wdXQgKGZvciB2ZXJ0aWNhbCBjaGFuZ2VzKVxyXG4gICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnRpY2tNYXJrUmFuZ2VQcm9wZXJ0eS52YWx1ZTsgaSsrICkge1xyXG4gICAgICAgIGNvbnN0IHRpY2tWYWx1ZSA9ICggaSAvIHRoaXMucG9zaXRpb25SYW5nZS5nZXRMZW5ndGgoKSApIC8gdGhpcy50aWNrTWFya1JhbmdlUHJvcGVydHkudmFsdWU7XHJcblxyXG4gICAgICAgIC8vIE5vdCBhdCBtYXggb3IgbWluLCBjcm9zc2VkIGEgdGljayBtYXJrIHZhbHVlXHJcbiAgICAgICAgaWYgKCBjdXJyZW50VmFsdWUgIT09IHRoaXMucG9zaXRpb25SYW5nZS5taW4gJiYgY3VycmVudFZhbHVlICE9PSB0aGlzLnBvc2l0aW9uUmFuZ2UubWF4ICYmXHJcbiAgICAgICAgICAgICAoIHRoaXMubGFzdFZhbHVlIDwgdGlja1ZhbHVlICYmIGN1cnJlbnRWYWx1ZSA+PSB0aWNrVmFsdWUgfHwgdGhpcy5sYXN0VmFsdWUgPiB0aWNrVmFsdWUgJiYgY3VycmVudFZhbHVlIDw9IHRpY2tWYWx1ZSApICkge1xyXG5cclxuICAgICAgICAgIC8vIGlmIGVub3VnaCB0aW1lIGhhcyBwYXNzZWQgc2luY2UgdGhlIGxhc3QgY2hhbmdlXHJcbiAgICAgICAgICBpZiAoIHBoZXQuam9pc3QuZWxhcHNlZFRpbWUgLSB0aGlzLnRpbWVPZkxhc3RDbGljayA+PSBNSU5fSU5URVJfQ0xJQ0tfVElNRSApIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMudGltZU9mTGFzdENsaWNrID0gcGhldC5qb2lzdC5lbGFwc2VkVGltZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGFzdFZhbHVlID0gY3VycmVudFZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdG9wKCAwICk7XHJcbiAgICB0aGlzLnRpbWVPZkxhc3RDbGljayA9IDA7XHJcbiAgICB0aGlzLmxhc3RWYWx1ZSA9IG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5yYXRpb0FuZFByb3BvcnRpb24ucmVnaXN0ZXIoICdUaWNrTWFya0J1bXBTb3VuZENsaXAnLCBUaWNrTWFya0J1bXBTb3VuZENsaXAgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRpY2tNYXJrQnVtcFNvdW5kQ2xpcDsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsU0FBUyxNQUE0Qix1REFBdUQ7QUFDbkcsT0FBT0Msb0JBQW9CLE1BQU0scURBQXFEO0FBQ3RGLE9BQU9DLGtCQUFrQixNQUFNLGdDQUFnQztBQUkvRDtBQUNBLE1BQU1DLG9CQUFvQixHQUFHLElBQUksQ0FBQyxDQUFDOztBQUVuQyxNQUFNQyxxQkFBcUIsU0FBU0osU0FBUyxDQUFDO0VBTTVDO0VBQ0E7RUFHQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDU0ssV0FBV0EsQ0FBRUMscUJBQXVDLEVBQUVDLGFBQW9CLEVBQUVDLE9BQTBCLEVBQUc7SUFDOUcsS0FBSyxDQUFFUCxvQkFBb0IsRUFBRU8sT0FBUSxDQUFDO0lBRXRDLElBQUksQ0FBQ0YscUJBQXFCLEdBQUdBLHFCQUFxQjtJQUNsRCxJQUFJLENBQUNDLGFBQWEsR0FBR0EsYUFBYTtJQUNsQyxJQUFJLENBQUNFLGVBQWUsR0FBRyxDQUFDO0lBQ3hCLElBQUksQ0FBQ0MsU0FBUyxHQUFHLElBQUk7RUFDdkI7O0VBRUE7QUFDRjtBQUNBO0VBQ1NDLFVBQVVBLENBQUVDLFlBQW9CLEVBQVM7SUFFOUMsSUFBSyxJQUFJLENBQUNGLFNBQVMsS0FBSyxJQUFJLEVBQUc7TUFFN0I7TUFDQSxLQUFNLElBQUlHLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxJQUFJLENBQUNQLHFCQUFxQixDQUFDUSxLQUFLLEVBQUVELENBQUMsRUFBRSxFQUFHO1FBQzNELE1BQU1FLFNBQVMsR0FBS0YsQ0FBQyxHQUFHLElBQUksQ0FBQ04sYUFBYSxDQUFDUyxTQUFTLENBQUMsQ0FBQyxHQUFLLElBQUksQ0FBQ1YscUJBQXFCLENBQUNRLEtBQUs7O1FBRTNGO1FBQ0EsSUFBS0YsWUFBWSxLQUFLLElBQUksQ0FBQ0wsYUFBYSxDQUFDVSxHQUFHLElBQUlMLFlBQVksS0FBSyxJQUFJLENBQUNMLGFBQWEsQ0FBQ1csR0FBRyxLQUNoRixJQUFJLENBQUNSLFNBQVMsR0FBR0ssU0FBUyxJQUFJSCxZQUFZLElBQUlHLFNBQVMsSUFBSSxJQUFJLENBQUNMLFNBQVMsR0FBR0ssU0FBUyxJQUFJSCxZQUFZLElBQUlHLFNBQVMsQ0FBRSxFQUFHO1VBRTVIO1VBQ0EsSUFBS0ksSUFBSSxDQUFDQyxLQUFLLENBQUNDLFdBQVcsR0FBRyxJQUFJLENBQUNaLGVBQWUsSUFBSU4sb0JBQW9CLEVBQUc7WUFDM0UsSUFBSSxDQUFDbUIsSUFBSSxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUNiLGVBQWUsR0FBR1UsSUFBSSxDQUFDQyxLQUFLLENBQUNDLFdBQVc7VUFDL0M7VUFDQTtRQUNGO01BQ0Y7SUFDRjtJQUVBLElBQUksQ0FBQ1gsU0FBUyxHQUFHRSxZQUFZO0VBQy9CO0VBRU9XLEtBQUtBLENBQUEsRUFBUztJQUNuQixJQUFJLENBQUNDLElBQUksQ0FBRSxDQUFFLENBQUM7SUFDZCxJQUFJLENBQUNmLGVBQWUsR0FBRyxDQUFDO0lBQ3hCLElBQUksQ0FBQ0MsU0FBUyxHQUFHLElBQUk7RUFDdkI7QUFDRjtBQUVBUixrQkFBa0IsQ0FBQ3VCLFFBQVEsQ0FBRSx1QkFBdUIsRUFBRXJCLHFCQUFzQixDQUFDO0FBRTdFLGVBQWVBLHFCQUFxQiJ9