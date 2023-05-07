// Copyright 2019-2022, University of Colorado Boulder
// @ts-nocheck
/**
 * Sets up sounds for items on the Waves Screen which are not already associated with pre-existing components.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Utils from '../../../../dot/js/Utils.js';
import SoundClip from '../../../../tambo/js/sound-generators/SoundClip.js';
import soundManager from '../../../../tambo/js/soundManager.js';
import lightBeamLoopV5EqOutBass_mp3 from '../../../sounds/lightBeamLoopV5EqOutBass_mp3.js';
import speakerPulseV4_mp3 from '../../../sounds/speakerPulseV4_mp3.js';
import waterDropV5_001_mp3 from '../../../sounds/waterDropV5_001_mp3.js';
import waterDropV5_002_mp3 from '../../../sounds/waterDropV5_002_mp3.js';
import waterDropV5_003_mp3 from '../../../sounds/waterDropV5_003_mp3.js';
import waterDropV5_mp3 from '../../../sounds/waterDropV5_mp3.js';
import WaveInterferenceConstants from '../../common/WaveInterferenceConstants.js';
import waveInterference from '../../waveInterference.js';
import WaveGenerator from '../../../../tambo/js/sound-generators/WaveGenerator.js';

// sounds
const waterDropSounds = [waterDropV5_mp3, waterDropV5_001_mp3, waterDropV5_002_mp3, waterDropV5_003_mp3];
class WavesScreenSoundView {
  constructor(model, view, options) {
    // The sound scene generates a sine wave when the "Play Tone" checkbox is checked
    if (model.soundScene && options.controlPanelOptions.showPlaySoundControl) {
      const sineWavePlayer = new WaveGenerator(model.soundScene.frequencyProperty, model.soundScene.amplitudeProperty, {
        enableControlProperties: [model.soundScene.isTonePlayingProperty, model.soundScene.button1PressedProperty, model.isRunningProperty, DerivedProperty.not(model.isResettingProperty)]
      });

      // Suppress the tone when another screen is selected
      soundManager.addSoundGenerator(sineWavePlayer, {
        associatedViewNode: view
      });
    }
    if (model.waterScene) {
      const waterDropOptions = {
        initialOutputLevel: 1.5
      };
      const soundClips = waterDropSounds.map(sound => new SoundClip(sound, waterDropOptions));
      soundClips.forEach(soundClip => soundManager.addSoundGenerator(soundClip));

      // The water drop SoundClip that was most recently played, to avoid repeats
      let lastPlayedWaterDropSoundClip = null;

      // When a water drop is absorbed, play a water drop sound.
      model.waterScene.waterDropAbsorbedEmitter.addListener(waterDrop => {
        // The waterDrop.amplitude indicates the size of the water drop and the strength of the resulting wave.
        // Smaller water drops play with a higher frequency.
        const amplitude = Utils.linear(WaveInterferenceConstants.AMPLITUDE_RANGE.min, WaveInterferenceConstants.AMPLITUDE_RANGE.max, 1.0, 0.5, waterDrop.amplitude);

        // Select water drop sounds randomly, but do not let the same sound go twice in a row
        const availableClips = _.without(soundClips, lastPlayedWaterDropSoundClip);
        lastPlayedWaterDropSoundClip = dotRandom.sample(availableClips);
        lastPlayedWaterDropSoundClip.setPlaybackRate(amplitude);

        // The wave meter node takes precedence over the water drop sounds
        lastPlayedWaterDropSoundClip.setOutputLevel(view.waveMeterNode.duckingProperty.value * 0.9, 0);
        lastPlayedWaterDropSoundClip.play();
      });
    }
    if (model.soundScene) {
      const speakerMembraneSoundClip = new SoundClip(speakerPulseV4_mp3, {
        // The sound repeats, so the waveform should not be trimmed
        trimSilence: false,
        initialOutputLevel: 0 // The speaker pulse plays when the speaker membrane oscillates.  The outputLevel is set below.
      });

      soundManager.addSoundGenerator(speakerMembraneSoundClip);

      // When the wave generator completes a full cycle (passing from positive to negative), restart the speaker
      // clip at the corresponding volume and frequency.  Note this means if the frequency or volume changes, the
      // user has to wait for the next cycle to hear the change.
      let previousOscillatorValue = model.soundScene.oscillator1Property.value;
      Multilink.multilink([model.soundScene.oscillator1Property, model.soundScene.isTonePlayingProperty, view.waveMeterNode.duckingProperty, model.isRunningProperty], (oscillatorValue, isTonePlaying, ducking, isRunning) => {
        const maxVolume = isTonePlaying ? 0 : 0.3;
        const outputLevel = Utils.linear(
        // The tone takes precedence over the membrane sound, another level of ducking
        model.soundScene.amplitudeProperty.range.min, model.soundScene.amplitudeProperty.range.max, 0.0, maxVolume, model.soundScene.amplitudeProperty.value);
        const playbackRate = Utils.linear(model.soundScene.frequencyProperty.range.min, model.soundScene.frequencyProperty.range.max, 1, 1.4, model.soundScene.frequencyProperty.value);

        // Wave meter node takes precedence over the sound speaker membrane sound
        speakerMembraneSoundClip.setOutputLevel(outputLevel * ducking, 0.2); // Time constant must work for amplitude changes and ducking
        speakerMembraneSoundClip.setPlaybackRate(playbackRate / 2);

        // Sometimes a cycle ends at 2.0698762975327177e-13, and sometimes a cycle ends at -6.58607807786067e-14
        // To tolerate both kinds of stopping, we detect a cycle a little below zero
        const TRIGGER = -1E-6;
        if (previousOscillatorValue >= TRIGGER && oscillatorValue < TRIGGER) {
          speakerMembraneSoundClip.play();
        }
        if (oscillatorValue === 0 || !isRunning) {
          speakerMembraneSoundClip.stop();
        }
        previousOscillatorValue = oscillatorValue;
      });
    }
    if (model.lightScene) {
      const lightBeamLoopSoundClip = new SoundClip(lightBeamLoopV5EqOutBass_mp3, {
        loop: true
      });
      soundManager.addSoundGenerator(lightBeamLoopSoundClip, {
        associatedViewNode: view
      });
      const lightAmplitudeProperty = model.lightScene.amplitudeProperty;
      const lightFrequencyProperty = model.lightScene.frequencyProperty;
      Multilink.multilink([lightAmplitudeProperty, lightFrequencyProperty, view.waveMeterNode.duckingProperty], (amplitude, frequency, ducking) => {
        // Sound for "Sound Effect" on the light scene.
        const outputLevel = Utils.linear(lightAmplitudeProperty.range.min, lightAmplitudeProperty.range.max, 0.0, 0.67, amplitude);
        const playbackRate = Utils.linear(lightFrequencyProperty.range.min, lightFrequencyProperty.range.max, 1, 1.8, frequency);

        // Wave meter node takes precedence over the light beam sound effect
        lightBeamLoopSoundClip.setOutputLevel(outputLevel * ducking);
        lightBeamLoopSoundClip.setPlaybackRate(playbackRate);
      });
      Multilink.multilink([model.lightScene.button1PressedProperty, model.isRunningProperty, model.lightScene.soundEffectEnabledProperty], (button1Pressed, isRunning, enabled) => {
        const shouldPlay = button1Pressed && isRunning && enabled;
        if (lightBeamLoopSoundClip.isPlaying && !shouldPlay) {
          lightBeamLoopSoundClip.stop();
        } else if (!lightBeamLoopSoundClip.isPlaying && shouldPlay) {
          lightBeamLoopSoundClip.play();
        }
      });
    }
  }
}
waveInterference.register('WavesScreenSoundView', WavesScreenSoundView);
export default WavesScreenSoundView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEZXJpdmVkUHJvcGVydHkiLCJNdWx0aWxpbmsiLCJkb3RSYW5kb20iLCJVdGlscyIsIlNvdW5kQ2xpcCIsInNvdW5kTWFuYWdlciIsImxpZ2h0QmVhbUxvb3BWNUVxT3V0QmFzc19tcDMiLCJzcGVha2VyUHVsc2VWNF9tcDMiLCJ3YXRlckRyb3BWNV8wMDFfbXAzIiwid2F0ZXJEcm9wVjVfMDAyX21wMyIsIndhdGVyRHJvcFY1XzAwM19tcDMiLCJ3YXRlckRyb3BWNV9tcDMiLCJXYXZlSW50ZXJmZXJlbmNlQ29uc3RhbnRzIiwid2F2ZUludGVyZmVyZW5jZSIsIldhdmVHZW5lcmF0b3IiLCJ3YXRlckRyb3BTb3VuZHMiLCJXYXZlc1NjcmVlblNvdW5kVmlldyIsImNvbnN0cnVjdG9yIiwibW9kZWwiLCJ2aWV3Iiwib3B0aW9ucyIsInNvdW5kU2NlbmUiLCJjb250cm9sUGFuZWxPcHRpb25zIiwic2hvd1BsYXlTb3VuZENvbnRyb2wiLCJzaW5lV2F2ZVBsYXllciIsImZyZXF1ZW5jeVByb3BlcnR5IiwiYW1wbGl0dWRlUHJvcGVydHkiLCJlbmFibGVDb250cm9sUHJvcGVydGllcyIsImlzVG9uZVBsYXlpbmdQcm9wZXJ0eSIsImJ1dHRvbjFQcmVzc2VkUHJvcGVydHkiLCJpc1J1bm5pbmdQcm9wZXJ0eSIsIm5vdCIsImlzUmVzZXR0aW5nUHJvcGVydHkiLCJhZGRTb3VuZEdlbmVyYXRvciIsImFzc29jaWF0ZWRWaWV3Tm9kZSIsIndhdGVyU2NlbmUiLCJ3YXRlckRyb3BPcHRpb25zIiwiaW5pdGlhbE91dHB1dExldmVsIiwic291bmRDbGlwcyIsIm1hcCIsInNvdW5kIiwiZm9yRWFjaCIsInNvdW5kQ2xpcCIsImxhc3RQbGF5ZWRXYXRlckRyb3BTb3VuZENsaXAiLCJ3YXRlckRyb3BBYnNvcmJlZEVtaXR0ZXIiLCJhZGRMaXN0ZW5lciIsIndhdGVyRHJvcCIsImFtcGxpdHVkZSIsImxpbmVhciIsIkFNUExJVFVERV9SQU5HRSIsIm1pbiIsIm1heCIsImF2YWlsYWJsZUNsaXBzIiwiXyIsIndpdGhvdXQiLCJzYW1wbGUiLCJzZXRQbGF5YmFja1JhdGUiLCJzZXRPdXRwdXRMZXZlbCIsIndhdmVNZXRlck5vZGUiLCJkdWNraW5nUHJvcGVydHkiLCJ2YWx1ZSIsInBsYXkiLCJzcGVha2VyTWVtYnJhbmVTb3VuZENsaXAiLCJ0cmltU2lsZW5jZSIsInByZXZpb3VzT3NjaWxsYXRvclZhbHVlIiwib3NjaWxsYXRvcjFQcm9wZXJ0eSIsIm11bHRpbGluayIsIm9zY2lsbGF0b3JWYWx1ZSIsImlzVG9uZVBsYXlpbmciLCJkdWNraW5nIiwiaXNSdW5uaW5nIiwibWF4Vm9sdW1lIiwib3V0cHV0TGV2ZWwiLCJyYW5nZSIsInBsYXliYWNrUmF0ZSIsIlRSSUdHRVIiLCJzdG9wIiwibGlnaHRTY2VuZSIsImxpZ2h0QmVhbUxvb3BTb3VuZENsaXAiLCJsb29wIiwibGlnaHRBbXBsaXR1ZGVQcm9wZXJ0eSIsImxpZ2h0RnJlcXVlbmN5UHJvcGVydHkiLCJmcmVxdWVuY3kiLCJzb3VuZEVmZmVjdEVuYWJsZWRQcm9wZXJ0eSIsImJ1dHRvbjFQcmVzc2VkIiwiZW5hYmxlZCIsInNob3VsZFBsYXkiLCJpc1BsYXlpbmciLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIldhdmVzU2NyZWVuU291bmRWaWV3LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE5LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG4vLyBAdHMtbm9jaGVja1xyXG4vKipcclxuICogU2V0cyB1cCBzb3VuZHMgZm9yIGl0ZW1zIG9uIHRoZSBXYXZlcyBTY3JlZW4gd2hpY2ggYXJlIG5vdCBhbHJlYWR5IGFzc29jaWF0ZWQgd2l0aCBwcmUtZXhpc3RpbmcgY29tcG9uZW50cy5cclxuICpcclxuICogQGF1dGhvciBTYW0gUmVpZCAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgRGVyaXZlZFByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvRGVyaXZlZFByb3BlcnR5LmpzJztcclxuaW1wb3J0IE11bHRpbGluayBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL011bHRpbGluay5qcyc7XHJcbmltcG9ydCBkb3RSYW5kb20gZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL2RvdFJhbmRvbS5qcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvVXRpbHMuanMnO1xyXG5pbXBvcnQgU291bmRDbGlwIGZyb20gJy4uLy4uLy4uLy4uL3RhbWJvL2pzL3NvdW5kLWdlbmVyYXRvcnMvU291bmRDbGlwLmpzJztcclxuaW1wb3J0IHNvdW5kTWFuYWdlciBmcm9tICcuLi8uLi8uLi8uLi90YW1iby9qcy9zb3VuZE1hbmFnZXIuanMnO1xyXG5pbXBvcnQgbGlnaHRCZWFtTG9vcFY1RXFPdXRCYXNzX21wMyBmcm9tICcuLi8uLi8uLi9zb3VuZHMvbGlnaHRCZWFtTG9vcFY1RXFPdXRCYXNzX21wMy5qcyc7XHJcbmltcG9ydCBzcGVha2VyUHVsc2VWNF9tcDMgZnJvbSAnLi4vLi4vLi4vc291bmRzL3NwZWFrZXJQdWxzZVY0X21wMy5qcyc7XHJcbmltcG9ydCB3YXRlckRyb3BWNV8wMDFfbXAzIGZyb20gJy4uLy4uLy4uL3NvdW5kcy93YXRlckRyb3BWNV8wMDFfbXAzLmpzJztcclxuaW1wb3J0IHdhdGVyRHJvcFY1XzAwMl9tcDMgZnJvbSAnLi4vLi4vLi4vc291bmRzL3dhdGVyRHJvcFY1XzAwMl9tcDMuanMnO1xyXG5pbXBvcnQgd2F0ZXJEcm9wVjVfMDAzX21wMyBmcm9tICcuLi8uLi8uLi9zb3VuZHMvd2F0ZXJEcm9wVjVfMDAzX21wMy5qcyc7XHJcbmltcG9ydCB3YXRlckRyb3BWNV9tcDMgZnJvbSAnLi4vLi4vLi4vc291bmRzL3dhdGVyRHJvcFY1X21wMy5qcyc7XHJcbmltcG9ydCBXYXZlSW50ZXJmZXJlbmNlQ29uc3RhbnRzIGZyb20gJy4uLy4uL2NvbW1vbi9XYXZlSW50ZXJmZXJlbmNlQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IHdhdmVJbnRlcmZlcmVuY2UgZnJvbSAnLi4vLi4vd2F2ZUludGVyZmVyZW5jZS5qcyc7XHJcbmltcG9ydCBXYXZlR2VuZXJhdG9yIGZyb20gJy4uLy4uLy4uLy4uL3RhbWJvL2pzL3NvdW5kLWdlbmVyYXRvcnMvV2F2ZUdlbmVyYXRvci5qcyc7XHJcblxyXG4vLyBzb3VuZHNcclxuY29uc3Qgd2F0ZXJEcm9wU291bmRzID0gWyB3YXRlckRyb3BWNV9tcDMsIHdhdGVyRHJvcFY1XzAwMV9tcDMsIHdhdGVyRHJvcFY1XzAwMl9tcDMsIHdhdGVyRHJvcFY1XzAwM19tcDMgXTtcclxuXHJcbmNsYXNzIFdhdmVzU2NyZWVuU291bmRWaWV3IHtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBtb2RlbCwgdmlldywgb3B0aW9ucyApIHtcclxuXHJcbiAgICAvLyBUaGUgc291bmQgc2NlbmUgZ2VuZXJhdGVzIGEgc2luZSB3YXZlIHdoZW4gdGhlIFwiUGxheSBUb25lXCIgY2hlY2tib3ggaXMgY2hlY2tlZFxyXG4gICAgaWYgKCBtb2RlbC5zb3VuZFNjZW5lICYmIG9wdGlvbnMuY29udHJvbFBhbmVsT3B0aW9ucy5zaG93UGxheVNvdW5kQ29udHJvbCApIHtcclxuICAgICAgY29uc3Qgc2luZVdhdmVQbGF5ZXIgPSBuZXcgV2F2ZUdlbmVyYXRvcihcclxuICAgICAgICBtb2RlbC5zb3VuZFNjZW5lLmZyZXF1ZW5jeVByb3BlcnR5LFxyXG4gICAgICAgIG1vZGVsLnNvdW5kU2NlbmUuYW1wbGl0dWRlUHJvcGVydHksIHtcclxuICAgICAgICAgIGVuYWJsZUNvbnRyb2xQcm9wZXJ0aWVzOiBbXHJcbiAgICAgICAgICAgIG1vZGVsLnNvdW5kU2NlbmUuaXNUb25lUGxheWluZ1Byb3BlcnR5LFxyXG4gICAgICAgICAgICBtb2RlbC5zb3VuZFNjZW5lLmJ1dHRvbjFQcmVzc2VkUHJvcGVydHksXHJcbiAgICAgICAgICAgIG1vZGVsLmlzUnVubmluZ1Byb3BlcnR5LFxyXG4gICAgICAgICAgICBEZXJpdmVkUHJvcGVydHkubm90KCBtb2RlbC5pc1Jlc2V0dGluZ1Byb3BlcnR5IClcclxuICAgICAgICAgIF1cclxuICAgICAgICB9ICk7XHJcblxyXG4gICAgICAvLyBTdXBwcmVzcyB0aGUgdG9uZSB3aGVuIGFub3RoZXIgc2NyZWVuIGlzIHNlbGVjdGVkXHJcbiAgICAgIHNvdW5kTWFuYWdlci5hZGRTb3VuZEdlbmVyYXRvciggc2luZVdhdmVQbGF5ZXIsIHtcclxuICAgICAgICBhc3NvY2lhdGVkVmlld05vZGU6IHZpZXdcclxuICAgICAgfSApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggbW9kZWwud2F0ZXJTY2VuZSApIHtcclxuICAgICAgY29uc3Qgd2F0ZXJEcm9wT3B0aW9ucyA9IHsgaW5pdGlhbE91dHB1dExldmVsOiAxLjUgfTtcclxuXHJcbiAgICAgIGNvbnN0IHNvdW5kQ2xpcHMgPSB3YXRlckRyb3BTb3VuZHMubWFwKCBzb3VuZCA9PiBuZXcgU291bmRDbGlwKCBzb3VuZCwgd2F0ZXJEcm9wT3B0aW9ucyApICk7XHJcbiAgICAgIHNvdW5kQ2xpcHMuZm9yRWFjaCggc291bmRDbGlwID0+IHNvdW5kTWFuYWdlci5hZGRTb3VuZEdlbmVyYXRvciggc291bmRDbGlwICkgKTtcclxuXHJcbiAgICAgIC8vIFRoZSB3YXRlciBkcm9wIFNvdW5kQ2xpcCB0aGF0IHdhcyBtb3N0IHJlY2VudGx5IHBsYXllZCwgdG8gYXZvaWQgcmVwZWF0c1xyXG4gICAgICBsZXQgbGFzdFBsYXllZFdhdGVyRHJvcFNvdW5kQ2xpcCA9IG51bGw7XHJcblxyXG4gICAgICAvLyBXaGVuIGEgd2F0ZXIgZHJvcCBpcyBhYnNvcmJlZCwgcGxheSBhIHdhdGVyIGRyb3Agc291bmQuXHJcbiAgICAgIG1vZGVsLndhdGVyU2NlbmUud2F0ZXJEcm9wQWJzb3JiZWRFbWl0dGVyLmFkZExpc3RlbmVyKCB3YXRlckRyb3AgPT4ge1xyXG5cclxuICAgICAgICAvLyBUaGUgd2F0ZXJEcm9wLmFtcGxpdHVkZSBpbmRpY2F0ZXMgdGhlIHNpemUgb2YgdGhlIHdhdGVyIGRyb3AgYW5kIHRoZSBzdHJlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHdhdmUuXHJcbiAgICAgICAgLy8gU21hbGxlciB3YXRlciBkcm9wcyBwbGF5IHdpdGggYSBoaWdoZXIgZnJlcXVlbmN5LlxyXG4gICAgICAgIGNvbnN0IGFtcGxpdHVkZSA9IFV0aWxzLmxpbmVhcihcclxuICAgICAgICAgIFdhdmVJbnRlcmZlcmVuY2VDb25zdGFudHMuQU1QTElUVURFX1JBTkdFLm1pbiwgV2F2ZUludGVyZmVyZW5jZUNvbnN0YW50cy5BTVBMSVRVREVfUkFOR0UubWF4LFxyXG4gICAgICAgICAgMS4wLCAwLjUsIHdhdGVyRHJvcC5hbXBsaXR1ZGVcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBTZWxlY3Qgd2F0ZXIgZHJvcCBzb3VuZHMgcmFuZG9tbHksIGJ1dCBkbyBub3QgbGV0IHRoZSBzYW1lIHNvdW5kIGdvIHR3aWNlIGluIGEgcm93XHJcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlQ2xpcHMgPSBfLndpdGhvdXQoIHNvdW5kQ2xpcHMsIGxhc3RQbGF5ZWRXYXRlckRyb3BTb3VuZENsaXAgKTtcclxuICAgICAgICBsYXN0UGxheWVkV2F0ZXJEcm9wU291bmRDbGlwID0gZG90UmFuZG9tLnNhbXBsZSggYXZhaWxhYmxlQ2xpcHMgKTtcclxuICAgICAgICBsYXN0UGxheWVkV2F0ZXJEcm9wU291bmRDbGlwLnNldFBsYXliYWNrUmF0ZSggYW1wbGl0dWRlICk7XHJcblxyXG4gICAgICAgIC8vIFRoZSB3YXZlIG1ldGVyIG5vZGUgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIHRoZSB3YXRlciBkcm9wIHNvdW5kc1xyXG4gICAgICAgIGxhc3RQbGF5ZWRXYXRlckRyb3BTb3VuZENsaXAuc2V0T3V0cHV0TGV2ZWwoIHZpZXcud2F2ZU1ldGVyTm9kZS5kdWNraW5nUHJvcGVydHkudmFsdWUgKiAwLjksIDAgKTtcclxuXHJcbiAgICAgICAgbGFzdFBsYXllZFdhdGVyRHJvcFNvdW5kQ2xpcC5wbGF5KCk7XHJcbiAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIG1vZGVsLnNvdW5kU2NlbmUgKSB7XHJcbiAgICAgIGNvbnN0IHNwZWFrZXJNZW1icmFuZVNvdW5kQ2xpcCA9IG5ldyBTb3VuZENsaXAoIHNwZWFrZXJQdWxzZVY0X21wMywge1xyXG5cclxuICAgICAgICAvLyBUaGUgc291bmQgcmVwZWF0cywgc28gdGhlIHdhdmVmb3JtIHNob3VsZCBub3QgYmUgdHJpbW1lZFxyXG4gICAgICAgIHRyaW1TaWxlbmNlOiBmYWxzZSxcclxuICAgICAgICBpbml0aWFsT3V0cHV0TGV2ZWw6IDAgLy8gVGhlIHNwZWFrZXIgcHVsc2UgcGxheXMgd2hlbiB0aGUgc3BlYWtlciBtZW1icmFuZSBvc2NpbGxhdGVzLiAgVGhlIG91dHB1dExldmVsIGlzIHNldCBiZWxvdy5cclxuICAgICAgfSApO1xyXG4gICAgICBzb3VuZE1hbmFnZXIuYWRkU291bmRHZW5lcmF0b3IoIHNwZWFrZXJNZW1icmFuZVNvdW5kQ2xpcCApO1xyXG5cclxuICAgICAgLy8gV2hlbiB0aGUgd2F2ZSBnZW5lcmF0b3IgY29tcGxldGVzIGEgZnVsbCBjeWNsZSAocGFzc2luZyBmcm9tIHBvc2l0aXZlIHRvIG5lZ2F0aXZlKSwgcmVzdGFydCB0aGUgc3BlYWtlclxyXG4gICAgICAvLyBjbGlwIGF0IHRoZSBjb3JyZXNwb25kaW5nIHZvbHVtZSBhbmQgZnJlcXVlbmN5LiAgTm90ZSB0aGlzIG1lYW5zIGlmIHRoZSBmcmVxdWVuY3kgb3Igdm9sdW1lIGNoYW5nZXMsIHRoZVxyXG4gICAgICAvLyB1c2VyIGhhcyB0byB3YWl0IGZvciB0aGUgbmV4dCBjeWNsZSB0byBoZWFyIHRoZSBjaGFuZ2UuXHJcbiAgICAgIGxldCBwcmV2aW91c09zY2lsbGF0b3JWYWx1ZSA9IG1vZGVsLnNvdW5kU2NlbmUub3NjaWxsYXRvcjFQcm9wZXJ0eS52YWx1ZTtcclxuICAgICAgTXVsdGlsaW5rLm11bHRpbGluayggW1xyXG4gICAgICAgIG1vZGVsLnNvdW5kU2NlbmUub3NjaWxsYXRvcjFQcm9wZXJ0eSxcclxuICAgICAgICBtb2RlbC5zb3VuZFNjZW5lLmlzVG9uZVBsYXlpbmdQcm9wZXJ0eSxcclxuICAgICAgICB2aWV3LndhdmVNZXRlck5vZGUuZHVja2luZ1Byb3BlcnR5LFxyXG4gICAgICAgIG1vZGVsLmlzUnVubmluZ1Byb3BlcnR5XHJcbiAgICAgIF0sICggb3NjaWxsYXRvclZhbHVlLCBpc1RvbmVQbGF5aW5nLCBkdWNraW5nLCBpc1J1bm5pbmcgKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IG1heFZvbHVtZSA9IGlzVG9uZVBsYXlpbmcgPyAwIDogMC4zO1xyXG4gICAgICAgIGNvbnN0IG91dHB1dExldmVsID0gVXRpbHMubGluZWFyKFxyXG4gICAgICAgICAgLy8gVGhlIHRvbmUgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIHRoZSBtZW1icmFuZSBzb3VuZCwgYW5vdGhlciBsZXZlbCBvZiBkdWNraW5nXHJcbiAgICAgICAgICBtb2RlbC5zb3VuZFNjZW5lLmFtcGxpdHVkZVByb3BlcnR5LnJhbmdlLm1pbiwgbW9kZWwuc291bmRTY2VuZS5hbXBsaXR1ZGVQcm9wZXJ0eS5yYW5nZS5tYXgsXHJcbiAgICAgICAgICAwLjAsIG1heFZvbHVtZSwgbW9kZWwuc291bmRTY2VuZS5hbXBsaXR1ZGVQcm9wZXJ0eS52YWx1ZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgcGxheWJhY2tSYXRlID0gVXRpbHMubGluZWFyKFxyXG4gICAgICAgICAgbW9kZWwuc291bmRTY2VuZS5mcmVxdWVuY3lQcm9wZXJ0eS5yYW5nZS5taW4sIG1vZGVsLnNvdW5kU2NlbmUuZnJlcXVlbmN5UHJvcGVydHkucmFuZ2UubWF4LFxyXG4gICAgICAgICAgMSwgMS40LCBtb2RlbC5zb3VuZFNjZW5lLmZyZXF1ZW5jeVByb3BlcnR5LnZhbHVlXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gV2F2ZSBtZXRlciBub2RlIHRha2VzIHByZWNlZGVuY2Ugb3ZlciB0aGUgc291bmQgc3BlYWtlciBtZW1icmFuZSBzb3VuZFxyXG4gICAgICAgIHNwZWFrZXJNZW1icmFuZVNvdW5kQ2xpcC5zZXRPdXRwdXRMZXZlbCggb3V0cHV0TGV2ZWwgKiBkdWNraW5nLCAwLjIgKTsgLy8gVGltZSBjb25zdGFudCBtdXN0IHdvcmsgZm9yIGFtcGxpdHVkZSBjaGFuZ2VzIGFuZCBkdWNraW5nXHJcbiAgICAgICAgc3BlYWtlck1lbWJyYW5lU291bmRDbGlwLnNldFBsYXliYWNrUmF0ZSggcGxheWJhY2tSYXRlIC8gMiApO1xyXG5cclxuICAgICAgICAvLyBTb21ldGltZXMgYSBjeWNsZSBlbmRzIGF0IDIuMDY5ODc2Mjk3NTMyNzE3N2UtMTMsIGFuZCBzb21ldGltZXMgYSBjeWNsZSBlbmRzIGF0IC02LjU4NjA3ODA3Nzg2MDY3ZS0xNFxyXG4gICAgICAgIC8vIFRvIHRvbGVyYXRlIGJvdGgga2luZHMgb2Ygc3RvcHBpbmcsIHdlIGRldGVjdCBhIGN5Y2xlIGEgbGl0dGxlIGJlbG93IHplcm9cclxuICAgICAgICBjb25zdCBUUklHR0VSID0gLTFFLTY7XHJcbiAgICAgICAgaWYgKCBwcmV2aW91c09zY2lsbGF0b3JWYWx1ZSA+PSBUUklHR0VSICYmIG9zY2lsbGF0b3JWYWx1ZSA8IFRSSUdHRVIgKSB7XHJcbiAgICAgICAgICBzcGVha2VyTWVtYnJhbmVTb3VuZENsaXAucGxheSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBvc2NpbGxhdG9yVmFsdWUgPT09IDAgfHwgIWlzUnVubmluZyApIHtcclxuICAgICAgICAgIHNwZWFrZXJNZW1icmFuZVNvdW5kQ2xpcC5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmV2aW91c09zY2lsbGF0b3JWYWx1ZSA9IG9zY2lsbGF0b3JWYWx1ZTtcclxuICAgICAgfSApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggbW9kZWwubGlnaHRTY2VuZSApIHtcclxuXHJcbiAgICAgIGNvbnN0IGxpZ2h0QmVhbUxvb3BTb3VuZENsaXAgPSBuZXcgU291bmRDbGlwKCBsaWdodEJlYW1Mb29wVjVFcU91dEJhc3NfbXAzLCB7XHJcbiAgICAgICAgbG9vcDogdHJ1ZVxyXG4gICAgICB9ICk7XHJcblxyXG4gICAgICBzb3VuZE1hbmFnZXIuYWRkU291bmRHZW5lcmF0b3IoIGxpZ2h0QmVhbUxvb3BTb3VuZENsaXAsIHtcclxuICAgICAgICBhc3NvY2lhdGVkVmlld05vZGU6IHZpZXdcclxuICAgICAgfSApO1xyXG5cclxuICAgICAgY29uc3QgbGlnaHRBbXBsaXR1ZGVQcm9wZXJ0eSA9IG1vZGVsLmxpZ2h0U2NlbmUuYW1wbGl0dWRlUHJvcGVydHk7XHJcbiAgICAgIGNvbnN0IGxpZ2h0RnJlcXVlbmN5UHJvcGVydHkgPSBtb2RlbC5saWdodFNjZW5lLmZyZXF1ZW5jeVByb3BlcnR5O1xyXG4gICAgICBNdWx0aWxpbmsubXVsdGlsaW5rKCBbIGxpZ2h0QW1wbGl0dWRlUHJvcGVydHksIGxpZ2h0RnJlcXVlbmN5UHJvcGVydHksIHZpZXcud2F2ZU1ldGVyTm9kZS5kdWNraW5nUHJvcGVydHkgXSwgKCBhbXBsaXR1ZGUsIGZyZXF1ZW5jeSwgZHVja2luZyApID0+IHtcclxuXHJcbiAgICAgICAgLy8gU291bmQgZm9yIFwiU291bmQgRWZmZWN0XCIgb24gdGhlIGxpZ2h0IHNjZW5lLlxyXG4gICAgICAgIGNvbnN0IG91dHB1dExldmVsID0gVXRpbHMubGluZWFyKCBsaWdodEFtcGxpdHVkZVByb3BlcnR5LnJhbmdlLm1pbiwgbGlnaHRBbXBsaXR1ZGVQcm9wZXJ0eS5yYW5nZS5tYXgsXHJcbiAgICAgICAgICAwLjAsIDAuNjcsIGFtcGxpdHVkZSApO1xyXG4gICAgICAgIGNvbnN0IHBsYXliYWNrUmF0ZSA9IFV0aWxzLmxpbmVhciggbGlnaHRGcmVxdWVuY3lQcm9wZXJ0eS5yYW5nZS5taW4sIGxpZ2h0RnJlcXVlbmN5UHJvcGVydHkucmFuZ2UubWF4LFxyXG4gICAgICAgICAgMSwgMS44LCBmcmVxdWVuY3kgKTtcclxuXHJcbiAgICAgICAgLy8gV2F2ZSBtZXRlciBub2RlIHRha2VzIHByZWNlZGVuY2Ugb3ZlciB0aGUgbGlnaHQgYmVhbSBzb3VuZCBlZmZlY3RcclxuICAgICAgICBsaWdodEJlYW1Mb29wU291bmRDbGlwLnNldE91dHB1dExldmVsKCBvdXRwdXRMZXZlbCAqIGR1Y2tpbmcgKTtcclxuICAgICAgICBsaWdodEJlYW1Mb29wU291bmRDbGlwLnNldFBsYXliYWNrUmF0ZSggcGxheWJhY2tSYXRlICk7XHJcbiAgICAgIH0gKTtcclxuXHJcbiAgICAgIE11bHRpbGluay5tdWx0aWxpbmsoIFtcclxuICAgICAgICBtb2RlbC5saWdodFNjZW5lLmJ1dHRvbjFQcmVzc2VkUHJvcGVydHksXHJcbiAgICAgICAgbW9kZWwuaXNSdW5uaW5nUHJvcGVydHksXHJcbiAgICAgICAgbW9kZWwubGlnaHRTY2VuZS5zb3VuZEVmZmVjdEVuYWJsZWRQcm9wZXJ0eVxyXG4gICAgICBdLCAoIGJ1dHRvbjFQcmVzc2VkLCBpc1J1bm5pbmcsIGVuYWJsZWQgKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2hvdWxkUGxheSA9IGJ1dHRvbjFQcmVzc2VkICYmIGlzUnVubmluZyAmJiBlbmFibGVkO1xyXG4gICAgICAgIGlmICggbGlnaHRCZWFtTG9vcFNvdW5kQ2xpcC5pc1BsYXlpbmcgJiYgIXNob3VsZFBsYXkgKSB7XHJcbiAgICAgICAgICBsaWdodEJlYW1Mb29wU291bmRDbGlwLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoICFsaWdodEJlYW1Mb29wU291bmRDbGlwLmlzUGxheWluZyAmJiBzaG91bGRQbGF5ICkge1xyXG4gICAgICAgICAgbGlnaHRCZWFtTG9vcFNvdW5kQ2xpcC5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9ICk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG53YXZlSW50ZXJmZXJlbmNlLnJlZ2lzdGVyKCAnV2F2ZXNTY3JlZW5Tb3VuZFZpZXcnLCBXYXZlc1NjcmVlblNvdW5kVmlldyApO1xyXG5leHBvcnQgZGVmYXVsdCBXYXZlc1NjcmVlblNvdW5kVmlldzsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLGVBQWUsTUFBTSx3Q0FBd0M7QUFDcEUsT0FBT0MsU0FBUyxNQUFNLGtDQUFrQztBQUN4RCxPQUFPQyxTQUFTLE1BQU0saUNBQWlDO0FBQ3ZELE9BQU9DLEtBQUssTUFBTSw2QkFBNkI7QUFDL0MsT0FBT0MsU0FBUyxNQUFNLG9EQUFvRDtBQUMxRSxPQUFPQyxZQUFZLE1BQU0sc0NBQXNDO0FBQy9ELE9BQU9DLDRCQUE0QixNQUFNLGlEQUFpRDtBQUMxRixPQUFPQyxrQkFBa0IsTUFBTSx1Q0FBdUM7QUFDdEUsT0FBT0MsbUJBQW1CLE1BQU0sd0NBQXdDO0FBQ3hFLE9BQU9DLG1CQUFtQixNQUFNLHdDQUF3QztBQUN4RSxPQUFPQyxtQkFBbUIsTUFBTSx3Q0FBd0M7QUFDeEUsT0FBT0MsZUFBZSxNQUFNLG9DQUFvQztBQUNoRSxPQUFPQyx5QkFBeUIsTUFBTSwyQ0FBMkM7QUFDakYsT0FBT0MsZ0JBQWdCLE1BQU0sMkJBQTJCO0FBQ3hELE9BQU9DLGFBQWEsTUFBTSx3REFBd0Q7O0FBRWxGO0FBQ0EsTUFBTUMsZUFBZSxHQUFHLENBQUVKLGVBQWUsRUFBRUgsbUJBQW1CLEVBQUVDLG1CQUFtQixFQUFFQyxtQkFBbUIsQ0FBRTtBQUUxRyxNQUFNTSxvQkFBb0IsQ0FBQztFQUVsQkMsV0FBV0EsQ0FBRUMsS0FBSyxFQUFFQyxJQUFJLEVBQUVDLE9BQU8sRUFBRztJQUV6QztJQUNBLElBQUtGLEtBQUssQ0FBQ0csVUFBVSxJQUFJRCxPQUFPLENBQUNFLG1CQUFtQixDQUFDQyxvQkFBb0IsRUFBRztNQUMxRSxNQUFNQyxjQUFjLEdBQUcsSUFBSVYsYUFBYSxDQUN0Q0ksS0FBSyxDQUFDRyxVQUFVLENBQUNJLGlCQUFpQixFQUNsQ1AsS0FBSyxDQUFDRyxVQUFVLENBQUNLLGlCQUFpQixFQUFFO1FBQ2xDQyx1QkFBdUIsRUFBRSxDQUN2QlQsS0FBSyxDQUFDRyxVQUFVLENBQUNPLHFCQUFxQixFQUN0Q1YsS0FBSyxDQUFDRyxVQUFVLENBQUNRLHNCQUFzQixFQUN2Q1gsS0FBSyxDQUFDWSxpQkFBaUIsRUFDdkI5QixlQUFlLENBQUMrQixHQUFHLENBQUViLEtBQUssQ0FBQ2MsbUJBQW9CLENBQUM7TUFFcEQsQ0FBRSxDQUFDOztNQUVMO01BQ0EzQixZQUFZLENBQUM0QixpQkFBaUIsQ0FBRVQsY0FBYyxFQUFFO1FBQzlDVSxrQkFBa0IsRUFBRWY7TUFDdEIsQ0FBRSxDQUFDO0lBQ0w7SUFFQSxJQUFLRCxLQUFLLENBQUNpQixVQUFVLEVBQUc7TUFDdEIsTUFBTUMsZ0JBQWdCLEdBQUc7UUFBRUMsa0JBQWtCLEVBQUU7TUFBSSxDQUFDO01BRXBELE1BQU1DLFVBQVUsR0FBR3ZCLGVBQWUsQ0FBQ3dCLEdBQUcsQ0FBRUMsS0FBSyxJQUFJLElBQUlwQyxTQUFTLENBQUVvQyxLQUFLLEVBQUVKLGdCQUFpQixDQUFFLENBQUM7TUFDM0ZFLFVBQVUsQ0FBQ0csT0FBTyxDQUFFQyxTQUFTLElBQUlyQyxZQUFZLENBQUM0QixpQkFBaUIsQ0FBRVMsU0FBVSxDQUFFLENBQUM7O01BRTlFO01BQ0EsSUFBSUMsNEJBQTRCLEdBQUcsSUFBSTs7TUFFdkM7TUFDQXpCLEtBQUssQ0FBQ2lCLFVBQVUsQ0FBQ1Msd0JBQXdCLENBQUNDLFdBQVcsQ0FBRUMsU0FBUyxJQUFJO1FBRWxFO1FBQ0E7UUFDQSxNQUFNQyxTQUFTLEdBQUc1QyxLQUFLLENBQUM2QyxNQUFNLENBQzVCcEMseUJBQXlCLENBQUNxQyxlQUFlLENBQUNDLEdBQUcsRUFBRXRDLHlCQUF5QixDQUFDcUMsZUFBZSxDQUFDRSxHQUFHLEVBQzVGLEdBQUcsRUFBRSxHQUFHLEVBQUVMLFNBQVMsQ0FBQ0MsU0FDdEIsQ0FBQzs7UUFFRDtRQUNBLE1BQU1LLGNBQWMsR0FBR0MsQ0FBQyxDQUFDQyxPQUFPLENBQUVoQixVQUFVLEVBQUVLLDRCQUE2QixDQUFDO1FBQzVFQSw0QkFBNEIsR0FBR3pDLFNBQVMsQ0FBQ3FELE1BQU0sQ0FBRUgsY0FBZSxDQUFDO1FBQ2pFVCw0QkFBNEIsQ0FBQ2EsZUFBZSxDQUFFVCxTQUFVLENBQUM7O1FBRXpEO1FBQ0FKLDRCQUE0QixDQUFDYyxjQUFjLENBQUV0QyxJQUFJLENBQUN1QyxhQUFhLENBQUNDLGVBQWUsQ0FBQ0MsS0FBSyxHQUFHLEdBQUcsRUFBRSxDQUFFLENBQUM7UUFFaEdqQiw0QkFBNEIsQ0FBQ2tCLElBQUksQ0FBQyxDQUFDO01BQ3JDLENBQUUsQ0FBQztJQUNMO0lBRUEsSUFBSzNDLEtBQUssQ0FBQ0csVUFBVSxFQUFHO01BQ3RCLE1BQU15Qyx3QkFBd0IsR0FBRyxJQUFJMUQsU0FBUyxDQUFFRyxrQkFBa0IsRUFBRTtRQUVsRTtRQUNBd0QsV0FBVyxFQUFFLEtBQUs7UUFDbEIxQixrQkFBa0IsRUFBRSxDQUFDLENBQUM7TUFDeEIsQ0FBRSxDQUFDOztNQUNIaEMsWUFBWSxDQUFDNEIsaUJBQWlCLENBQUU2Qix3QkFBeUIsQ0FBQzs7TUFFMUQ7TUFDQTtNQUNBO01BQ0EsSUFBSUUsdUJBQXVCLEdBQUc5QyxLQUFLLENBQUNHLFVBQVUsQ0FBQzRDLG1CQUFtQixDQUFDTCxLQUFLO01BQ3hFM0QsU0FBUyxDQUFDaUUsU0FBUyxDQUFFLENBQ25CaEQsS0FBSyxDQUFDRyxVQUFVLENBQUM0QyxtQkFBbUIsRUFDcEMvQyxLQUFLLENBQUNHLFVBQVUsQ0FBQ08scUJBQXFCLEVBQ3RDVCxJQUFJLENBQUN1QyxhQUFhLENBQUNDLGVBQWUsRUFDbEN6QyxLQUFLLENBQUNZLGlCQUFpQixDQUN4QixFQUFFLENBQUVxQyxlQUFlLEVBQUVDLGFBQWEsRUFBRUMsT0FBTyxFQUFFQyxTQUFTLEtBQU07UUFFM0QsTUFBTUMsU0FBUyxHQUFHSCxhQUFhLEdBQUcsQ0FBQyxHQUFHLEdBQUc7UUFDekMsTUFBTUksV0FBVyxHQUFHckUsS0FBSyxDQUFDNkMsTUFBTTtRQUM5QjtRQUNBOUIsS0FBSyxDQUFDRyxVQUFVLENBQUNLLGlCQUFpQixDQUFDK0MsS0FBSyxDQUFDdkIsR0FBRyxFQUFFaEMsS0FBSyxDQUFDRyxVQUFVLENBQUNLLGlCQUFpQixDQUFDK0MsS0FBSyxDQUFDdEIsR0FBRyxFQUMxRixHQUFHLEVBQUVvQixTQUFTLEVBQUVyRCxLQUFLLENBQUNHLFVBQVUsQ0FBQ0ssaUJBQWlCLENBQUNrQyxLQUNyRCxDQUFDO1FBQ0QsTUFBTWMsWUFBWSxHQUFHdkUsS0FBSyxDQUFDNkMsTUFBTSxDQUMvQjlCLEtBQUssQ0FBQ0csVUFBVSxDQUFDSSxpQkFBaUIsQ0FBQ2dELEtBQUssQ0FBQ3ZCLEdBQUcsRUFBRWhDLEtBQUssQ0FBQ0csVUFBVSxDQUFDSSxpQkFBaUIsQ0FBQ2dELEtBQUssQ0FBQ3RCLEdBQUcsRUFDMUYsQ0FBQyxFQUFFLEdBQUcsRUFBRWpDLEtBQUssQ0FBQ0csVUFBVSxDQUFDSSxpQkFBaUIsQ0FBQ21DLEtBQzdDLENBQUM7O1FBRUQ7UUFDQUUsd0JBQXdCLENBQUNMLGNBQWMsQ0FBRWUsV0FBVyxHQUFHSCxPQUFPLEVBQUUsR0FBSSxDQUFDLENBQUMsQ0FBQztRQUN2RVAsd0JBQXdCLENBQUNOLGVBQWUsQ0FBRWtCLFlBQVksR0FBRyxDQUFFLENBQUM7O1FBRTVEO1FBQ0E7UUFDQSxNQUFNQyxPQUFPLEdBQUcsQ0FBQyxJQUFJO1FBQ3JCLElBQUtYLHVCQUF1QixJQUFJVyxPQUFPLElBQUlSLGVBQWUsR0FBR1EsT0FBTyxFQUFHO1VBQ3JFYix3QkFBd0IsQ0FBQ0QsSUFBSSxDQUFDLENBQUM7UUFDakM7UUFFQSxJQUFLTSxlQUFlLEtBQUssQ0FBQyxJQUFJLENBQUNHLFNBQVMsRUFBRztVQUN6Q1Isd0JBQXdCLENBQUNjLElBQUksQ0FBQyxDQUFDO1FBQ2pDO1FBRUFaLHVCQUF1QixHQUFHRyxlQUFlO01BQzNDLENBQUUsQ0FBQztJQUNMO0lBRUEsSUFBS2pELEtBQUssQ0FBQzJELFVBQVUsRUFBRztNQUV0QixNQUFNQyxzQkFBc0IsR0FBRyxJQUFJMUUsU0FBUyxDQUFFRSw0QkFBNEIsRUFBRTtRQUMxRXlFLElBQUksRUFBRTtNQUNSLENBQUUsQ0FBQztNQUVIMUUsWUFBWSxDQUFDNEIsaUJBQWlCLENBQUU2QyxzQkFBc0IsRUFBRTtRQUN0RDVDLGtCQUFrQixFQUFFZjtNQUN0QixDQUFFLENBQUM7TUFFSCxNQUFNNkQsc0JBQXNCLEdBQUc5RCxLQUFLLENBQUMyRCxVQUFVLENBQUNuRCxpQkFBaUI7TUFDakUsTUFBTXVELHNCQUFzQixHQUFHL0QsS0FBSyxDQUFDMkQsVUFBVSxDQUFDcEQsaUJBQWlCO01BQ2pFeEIsU0FBUyxDQUFDaUUsU0FBUyxDQUFFLENBQUVjLHNCQUFzQixFQUFFQyxzQkFBc0IsRUFBRTlELElBQUksQ0FBQ3VDLGFBQWEsQ0FBQ0MsZUFBZSxDQUFFLEVBQUUsQ0FBRVosU0FBUyxFQUFFbUMsU0FBUyxFQUFFYixPQUFPLEtBQU07UUFFaEo7UUFDQSxNQUFNRyxXQUFXLEdBQUdyRSxLQUFLLENBQUM2QyxNQUFNLENBQUVnQyxzQkFBc0IsQ0FBQ1AsS0FBSyxDQUFDdkIsR0FBRyxFQUFFOEIsc0JBQXNCLENBQUNQLEtBQUssQ0FBQ3RCLEdBQUcsRUFDbEcsR0FBRyxFQUFFLElBQUksRUFBRUosU0FBVSxDQUFDO1FBQ3hCLE1BQU0yQixZQUFZLEdBQUd2RSxLQUFLLENBQUM2QyxNQUFNLENBQUVpQyxzQkFBc0IsQ0FBQ1IsS0FBSyxDQUFDdkIsR0FBRyxFQUFFK0Isc0JBQXNCLENBQUNSLEtBQUssQ0FBQ3RCLEdBQUcsRUFDbkcsQ0FBQyxFQUFFLEdBQUcsRUFBRStCLFNBQVUsQ0FBQzs7UUFFckI7UUFDQUosc0JBQXNCLENBQUNyQixjQUFjLENBQUVlLFdBQVcsR0FBR0gsT0FBUSxDQUFDO1FBQzlEUyxzQkFBc0IsQ0FBQ3RCLGVBQWUsQ0FBRWtCLFlBQWEsQ0FBQztNQUN4RCxDQUFFLENBQUM7TUFFSHpFLFNBQVMsQ0FBQ2lFLFNBQVMsQ0FBRSxDQUNuQmhELEtBQUssQ0FBQzJELFVBQVUsQ0FBQ2hELHNCQUFzQixFQUN2Q1gsS0FBSyxDQUFDWSxpQkFBaUIsRUFDdkJaLEtBQUssQ0FBQzJELFVBQVUsQ0FBQ00sMEJBQTBCLENBQzVDLEVBQUUsQ0FBRUMsY0FBYyxFQUFFZCxTQUFTLEVBQUVlLE9BQU8sS0FBTTtRQUMzQyxNQUFNQyxVQUFVLEdBQUdGLGNBQWMsSUFBSWQsU0FBUyxJQUFJZSxPQUFPO1FBQ3pELElBQUtQLHNCQUFzQixDQUFDUyxTQUFTLElBQUksQ0FBQ0QsVUFBVSxFQUFHO1VBQ3JEUixzQkFBc0IsQ0FBQ0YsSUFBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxNQUNJLElBQUssQ0FBQ0Usc0JBQXNCLENBQUNTLFNBQVMsSUFBSUQsVUFBVSxFQUFHO1VBQzFEUixzQkFBc0IsQ0FBQ2pCLElBQUksQ0FBQyxDQUFDO1FBQy9CO01BQ0YsQ0FBRSxDQUFDO0lBQ0w7RUFDRjtBQUNGO0FBRUFoRCxnQkFBZ0IsQ0FBQzJFLFFBQVEsQ0FBRSxzQkFBc0IsRUFBRXhFLG9CQUFxQixDQUFDO0FBQ3pFLGVBQWVBLG9CQUFvQiJ9