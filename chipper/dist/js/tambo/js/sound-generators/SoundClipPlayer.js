// Copyright 2019-2022, University of Colorado Boulder

/**
 * SoundClipPlayer is a limited and automatically registered sound clip.  It is intended to be used for sounds that
 * can be shared in multiple places within a simulation so that separate instances of sound clips don't need to be
 * created and registered in as many places.  See resetAllSoundPlayer for an example.
 *
 * This type wraps the sound clip and only supports the play and stop methods so that attributes such as output level
 * and playback rate can't be easily altered.  A method is supported for retrieving the sound clip itself in case
 * additional information about or manipulation of the sound clip is necessary.
 *
 * If you're familiar with PhET graphics rendering library "scenery", this class is intended to support a feature that
 * is similar to the DAG (directed acyclic graph) feature in that library.  As with that feature, SoundClipPlayer can
 * get a little weird if not used as intended.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import soundManager from '../soundManager.js';
import tambo from '../tambo.js';
import SoundClip from './SoundClip.js';
import optionize from '../../../phet-core/js/optionize.js';
class SoundClipPlayer {
  /**
   * @param wrappedAudioBuffer - a Web Audio audio buffer containing decoded audio samples
   * @param [providedOptions]
   */
  constructor(wrappedAudioBuffer, providedOptions) {
    const options = optionize()({
      soundClipOptions: {},
      soundManagerOptions: {}
    }, providedOptions);
    this._soundClip = new SoundClip(wrappedAudioBuffer, options.soundClipOptions);

    // automatically register this sound clip with the sound manager
    soundManager.addSoundGenerator(this._soundClip, options.soundManagerOptions);
  }

  /**
   * Play the sound clip.
   */
  play() {
    this._soundClip.play();
  }

  /**
   * Stop the sound clip.  Does nothing if the sound clip is not playing.
   */
  stop() {
    this._soundClip.stop();
  }

  /**
   * Get the sound clip that is wrapped by this player.  USE THIS METHOD CAREFULLY, IF AT ALL.  This class is intended
   * primarily for use in singletons that play a sound.  If the underlying sound clip is manipulated, it will change for
   * all users, so this method should be used with caution and clear intention.
   */
  getSoundClip() {
    return this._soundClip;
  }
}
tambo.register('SoundClipPlayer', SoundClipPlayer);
export default SoundClipPlayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzb3VuZE1hbmFnZXIiLCJ0YW1ibyIsIlNvdW5kQ2xpcCIsIm9wdGlvbml6ZSIsIlNvdW5kQ2xpcFBsYXllciIsImNvbnN0cnVjdG9yIiwid3JhcHBlZEF1ZGlvQnVmZmVyIiwicHJvdmlkZWRPcHRpb25zIiwib3B0aW9ucyIsInNvdW5kQ2xpcE9wdGlvbnMiLCJzb3VuZE1hbmFnZXJPcHRpb25zIiwiX3NvdW5kQ2xpcCIsImFkZFNvdW5kR2VuZXJhdG9yIiwicGxheSIsInN0b3AiLCJnZXRTb3VuZENsaXAiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlNvdW5kQ2xpcFBsYXllci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBTb3VuZENsaXBQbGF5ZXIgaXMgYSBsaW1pdGVkIGFuZCBhdXRvbWF0aWNhbGx5IHJlZ2lzdGVyZWQgc291bmQgY2xpcC4gIEl0IGlzIGludGVuZGVkIHRvIGJlIHVzZWQgZm9yIHNvdW5kcyB0aGF0XHJcbiAqIGNhbiBiZSBzaGFyZWQgaW4gbXVsdGlwbGUgcGxhY2VzIHdpdGhpbiBhIHNpbXVsYXRpb24gc28gdGhhdCBzZXBhcmF0ZSBpbnN0YW5jZXMgb2Ygc291bmQgY2xpcHMgZG9uJ3QgbmVlZCB0byBiZVxyXG4gKiBjcmVhdGVkIGFuZCByZWdpc3RlcmVkIGluIGFzIG1hbnkgcGxhY2VzLiAgU2VlIHJlc2V0QWxsU291bmRQbGF5ZXIgZm9yIGFuIGV4YW1wbGUuXHJcbiAqXHJcbiAqIFRoaXMgdHlwZSB3cmFwcyB0aGUgc291bmQgY2xpcCBhbmQgb25seSBzdXBwb3J0cyB0aGUgcGxheSBhbmQgc3RvcCBtZXRob2RzIHNvIHRoYXQgYXR0cmlidXRlcyBzdWNoIGFzIG91dHB1dCBsZXZlbFxyXG4gKiBhbmQgcGxheWJhY2sgcmF0ZSBjYW4ndCBiZSBlYXNpbHkgYWx0ZXJlZC4gIEEgbWV0aG9kIGlzIHN1cHBvcnRlZCBmb3IgcmV0cmlldmluZyB0aGUgc291bmQgY2xpcCBpdHNlbGYgaW4gY2FzZVxyXG4gKiBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIGFib3V0IG9yIG1hbmlwdWxhdGlvbiBvZiB0aGUgc291bmQgY2xpcCBpcyBuZWNlc3NhcnkuXHJcbiAqXHJcbiAqIElmIHlvdSdyZSBmYW1pbGlhciB3aXRoIFBoRVQgZ3JhcGhpY3MgcmVuZGVyaW5nIGxpYnJhcnkgXCJzY2VuZXJ5XCIsIHRoaXMgY2xhc3MgaXMgaW50ZW5kZWQgdG8gc3VwcG9ydCBhIGZlYXR1cmUgdGhhdFxyXG4gKiBpcyBzaW1pbGFyIHRvIHRoZSBEQUcgKGRpcmVjdGVkIGFjeWNsaWMgZ3JhcGgpIGZlYXR1cmUgaW4gdGhhdCBsaWJyYXJ5LiAgQXMgd2l0aCB0aGF0IGZlYXR1cmUsIFNvdW5kQ2xpcFBsYXllciBjYW5cclxuICogZ2V0IGEgbGl0dGxlIHdlaXJkIGlmIG5vdCB1c2VkIGFzIGludGVuZGVkLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEpvaG4gQmxhbmNvIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBzb3VuZE1hbmFnZXIsIHsgU291bmRHZW5lcmF0b3JBZGRPcHRpb25zIH0gZnJvbSAnLi4vc291bmRNYW5hZ2VyLmpzJztcclxuaW1wb3J0IHRhbWJvIGZyb20gJy4uL3RhbWJvLmpzJztcclxuaW1wb3J0IFNvdW5kQ2xpcCwgeyBTb3VuZENsaXBPcHRpb25zIH0gZnJvbSAnLi9Tb3VuZENsaXAuanMnO1xyXG5pbXBvcnQgV3JhcHBlZEF1ZGlvQnVmZmVyIGZyb20gJy4uL1dyYXBwZWRBdWRpb0J1ZmZlci5qcyc7XHJcbmltcG9ydCBvcHRpb25pemUgZnJvbSAnLi4vLi4vLi4vcGhldC1jb3JlL2pzL29wdGlvbml6ZS5qcyc7XHJcblxyXG5leHBvcnQgdHlwZSBTb3VuZENsaXBQbGF5ZXJPcHRpb25zID0ge1xyXG4gIHNvdW5kQ2xpcE9wdGlvbnM/OiBTb3VuZENsaXBPcHRpb25zO1xyXG4gIHNvdW5kTWFuYWdlck9wdGlvbnM/OiBTb3VuZEdlbmVyYXRvckFkZE9wdGlvbnM7XHJcbn07XHJcblxyXG5jbGFzcyBTb3VuZENsaXBQbGF5ZXIge1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IF9zb3VuZENsaXA6IFNvdW5kQ2xpcDtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHdyYXBwZWRBdWRpb0J1ZmZlciAtIGEgV2ViIEF1ZGlvIGF1ZGlvIGJ1ZmZlciBjb250YWluaW5nIGRlY29kZWQgYXVkaW8gc2FtcGxlc1xyXG4gICAqIEBwYXJhbSBbcHJvdmlkZWRPcHRpb25zXVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvciggd3JhcHBlZEF1ZGlvQnVmZmVyOiBXcmFwcGVkQXVkaW9CdWZmZXIsIHByb3ZpZGVkT3B0aW9ucz86IFNvdW5kQ2xpcFBsYXllck9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxTb3VuZENsaXBQbGF5ZXJPcHRpb25zLCBTb3VuZENsaXBQbGF5ZXJPcHRpb25zPigpKCB7XHJcbiAgICAgIHNvdW5kQ2xpcE9wdGlvbnM6IHt9LFxyXG4gICAgICBzb3VuZE1hbmFnZXJPcHRpb25zOiB7fVxyXG4gICAgfSwgcHJvdmlkZWRPcHRpb25zICk7XHJcblxyXG4gICAgdGhpcy5fc291bmRDbGlwID0gbmV3IFNvdW5kQ2xpcCggd3JhcHBlZEF1ZGlvQnVmZmVyLCBvcHRpb25zLnNvdW5kQ2xpcE9wdGlvbnMgKTtcclxuXHJcbiAgICAvLyBhdXRvbWF0aWNhbGx5IHJlZ2lzdGVyIHRoaXMgc291bmQgY2xpcCB3aXRoIHRoZSBzb3VuZCBtYW5hZ2VyXHJcbiAgICBzb3VuZE1hbmFnZXIuYWRkU291bmRHZW5lcmF0b3IoIHRoaXMuX3NvdW5kQ2xpcCwgb3B0aW9ucy5zb3VuZE1hbmFnZXJPcHRpb25zICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQbGF5IHRoZSBzb3VuZCBjbGlwLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBwbGF5KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc291bmRDbGlwLnBsYXkoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgdGhlIHNvdW5kIGNsaXAuICBEb2VzIG5vdGhpbmcgaWYgdGhlIHNvdW5kIGNsaXAgaXMgbm90IHBsYXlpbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHN0b3AoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zb3VuZENsaXAuc3RvcCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzb3VuZCBjbGlwIHRoYXQgaXMgd3JhcHBlZCBieSB0aGlzIHBsYXllci4gIFVTRSBUSElTIE1FVEhPRCBDQVJFRlVMTFksIElGIEFUIEFMTC4gIFRoaXMgY2xhc3MgaXMgaW50ZW5kZWRcclxuICAgKiBwcmltYXJpbHkgZm9yIHVzZSBpbiBzaW5nbGV0b25zIHRoYXQgcGxheSBhIHNvdW5kLiAgSWYgdGhlIHVuZGVybHlpbmcgc291bmQgY2xpcCBpcyBtYW5pcHVsYXRlZCwgaXQgd2lsbCBjaGFuZ2UgZm9yXHJcbiAgICogYWxsIHVzZXJzLCBzbyB0aGlzIG1ldGhvZCBzaG91bGQgYmUgdXNlZCB3aXRoIGNhdXRpb24gYW5kIGNsZWFyIGludGVudGlvbi5cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0U291bmRDbGlwKCk6IFNvdW5kQ2xpcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fc291bmRDbGlwO1xyXG4gIH1cclxufVxyXG5cclxudGFtYm8ucmVnaXN0ZXIoICdTb3VuZENsaXBQbGF5ZXInLCBTb3VuZENsaXBQbGF5ZXIgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNvdW5kQ2xpcFBsYXllcjsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxZQUFZLE1BQW9DLG9CQUFvQjtBQUMzRSxPQUFPQyxLQUFLLE1BQU0sYUFBYTtBQUMvQixPQUFPQyxTQUFTLE1BQTRCLGdCQUFnQjtBQUU1RCxPQUFPQyxTQUFTLE1BQU0sb0NBQW9DO0FBTzFELE1BQU1DLGVBQWUsQ0FBQztFQUlwQjtBQUNGO0FBQ0E7QUFDQTtFQUNTQyxXQUFXQSxDQUFFQyxrQkFBc0MsRUFBRUMsZUFBd0MsRUFBRztJQUVyRyxNQUFNQyxPQUFPLEdBQUdMLFNBQVMsQ0FBaUQsQ0FBQyxDQUFFO01BQzNFTSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7TUFDcEJDLG1CQUFtQixFQUFFLENBQUM7SUFDeEIsQ0FBQyxFQUFFSCxlQUFnQixDQUFDO0lBRXBCLElBQUksQ0FBQ0ksVUFBVSxHQUFHLElBQUlULFNBQVMsQ0FBRUksa0JBQWtCLEVBQUVFLE9BQU8sQ0FBQ0MsZ0JBQWlCLENBQUM7O0lBRS9FO0lBQ0FULFlBQVksQ0FBQ1ksaUJBQWlCLENBQUUsSUFBSSxDQUFDRCxVQUFVLEVBQUVILE9BQU8sQ0FBQ0UsbUJBQW9CLENBQUM7RUFDaEY7O0VBRUE7QUFDRjtBQUNBO0VBQ1NHLElBQUlBLENBQUEsRUFBUztJQUNsQixJQUFJLENBQUNGLFVBQVUsQ0FBQ0UsSUFBSSxDQUFDLENBQUM7RUFDeEI7O0VBRUE7QUFDRjtBQUNBO0VBQ1NDLElBQUlBLENBQUEsRUFBUztJQUNsQixJQUFJLENBQUNILFVBQVUsQ0FBQ0csSUFBSSxDQUFDLENBQUM7RUFDeEI7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUNTQyxZQUFZQSxDQUFBLEVBQWM7SUFDL0IsT0FBTyxJQUFJLENBQUNKLFVBQVU7RUFDeEI7QUFDRjtBQUVBVixLQUFLLENBQUNlLFFBQVEsQ0FBRSxpQkFBaUIsRUFBRVosZUFBZ0IsQ0FBQztBQUVwRCxlQUFlQSxlQUFlIn0=