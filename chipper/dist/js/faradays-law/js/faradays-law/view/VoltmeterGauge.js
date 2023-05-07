// Copyright 2014-2022, University of Colorado Boulder

/**
 * Voltmeter gauge (panel with needle) for 'Faradays Law'
 *
 * @author Vasily Shakhov (MLearner)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Utils from '../../../../dot/js/Utils.js';
import { Shape } from '../../../../kite/js/imports.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import MinusNode from '../../../../scenery-phet/js/MinusNode.js';
import PlusNode from '../../../../scenery-phet/js/PlusNode.js';
import { Circle, Node, Path } from '../../../../scenery/js/imports.js';
import SoundClip from '../../../../tambo/js/sound-generators/SoundClip.js';
import soundManager from '../../../../tambo/js/soundManager.js';
import voltageMaxClick_mp3 from '../../../sounds/voltageMaxClick_mp3.js';
import faradaysLaw from '../../faradaysLaw.js';

// constants
const MIN_ANGLE = -Math.PI / 2;
const MAX_ANGLE = Math.PI / 2;
const CLICK_SOUND_OUTPUT_LEVEL = 0.15; // empirically determined

class VoltmeterGauge extends Node {
  /**
   * @param {NumberProperty} needleAngleProperty - angle of needle in voltmeter
   * @param {Object} [options]
   */
  constructor(needleAngleProperty, options) {
    super();
    const arcRadius = 55; // radius of voltmeter scale, empirically determined
    const needleColor = '#3954a5'; // blue

    // background panel within which the needle moves
    const background = new Path(new Shape().moveTo(0, 0).lineTo(0, -arcRadius).moveTo(-arcRadius, 0).arc(0, 0, arcRadius, -Math.PI, 0, false).lineTo(-arcRadius, 0).close(), {
      stroke: 'black',
      lineWidth: 1
    });
    this.addChild(background);

    // plus and minus signs
    this.addChild(new PlusNode({
      centerX: arcRadius / 2.3,
      centerY: -arcRadius / 2.5,
      size: new Dimension2(12, 2)
    }));
    this.addChild(new MinusNode({
      centerX: -arcRadius / 2.3,
      centerY: -arcRadius / 2.5,
      size: new Dimension2(12, 2)
    }));

    // needle base
    this.addChild(new Circle(4, {
      fill: needleColor
    }));

    // needle
    const needleArrowNode = new ArrowNode(0, 0, 0, -53, {
      headHeight: 12,
      headWidth: 8,
      tailWidth: 2,
      fill: needleColor,
      lineWidth: 0
    });
    this.addChild(needleArrowNode);

    // sound generators
    const maxPositiveVoltageSoundClip = new SoundClip(voltageMaxClick_mp3, {
      initialOutputLevel: CLICK_SOUND_OUTPUT_LEVEL,
      initialPlaybackRate: 1.12246204831
    });
    soundManager.addSoundGenerator(maxPositiveVoltageSoundClip);
    const maxNegativeVoltageSoundClip = new SoundClip(voltageMaxClick_mp3, {
      initialOutputLevel: CLICK_SOUND_OUTPUT_LEVEL
    });
    soundManager.addSoundGenerator(maxNegativeVoltageSoundClip);

    // observers
    let previousClampedNeedleAngle = needleAngleProperty.value;
    needleAngleProperty.link(needleAngle => {
      // Set the angle of the needle, making sure that it doesn't exceed the max or min values.
      const clampedNeedleAngle = Utils.clamp(needleAngle, MIN_ANGLE, MAX_ANGLE);
      needleArrowNode.rotation = clampedNeedleAngle;

      // Play a sound when the needle first hits the min or max value, but only if visible.
      if (_.some(this.getTrailsTo(phet.joist.display.rootNode), trail => trail.isVisible())) {
        if (clampedNeedleAngle === MAX_ANGLE && previousClampedNeedleAngle < MAX_ANGLE) {
          maxPositiveVoltageSoundClip.play();
        } else if (clampedNeedleAngle === MIN_ANGLE && previousClampedNeedleAngle > MIN_ANGLE) {
          maxNegativeVoltageSoundClip.play();
        }
      }

      // Save the needle angle for comparison the next time through.
      previousClampedNeedleAngle = clampedNeedleAngle;
    });
    this.mutate(options);
  }
}
faradaysLaw.register('VoltmeterGauge', VoltmeterGauge);
export default VoltmeterGauge;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEaW1lbnNpb24yIiwiVXRpbHMiLCJTaGFwZSIsIkFycm93Tm9kZSIsIk1pbnVzTm9kZSIsIlBsdXNOb2RlIiwiQ2lyY2xlIiwiTm9kZSIsIlBhdGgiLCJTb3VuZENsaXAiLCJzb3VuZE1hbmFnZXIiLCJ2b2x0YWdlTWF4Q2xpY2tfbXAzIiwiZmFyYWRheXNMYXciLCJNSU5fQU5HTEUiLCJNYXRoIiwiUEkiLCJNQVhfQU5HTEUiLCJDTElDS19TT1VORF9PVVRQVVRfTEVWRUwiLCJWb2x0bWV0ZXJHYXVnZSIsImNvbnN0cnVjdG9yIiwibmVlZGxlQW5nbGVQcm9wZXJ0eSIsIm9wdGlvbnMiLCJhcmNSYWRpdXMiLCJuZWVkbGVDb2xvciIsImJhY2tncm91bmQiLCJtb3ZlVG8iLCJsaW5lVG8iLCJhcmMiLCJjbG9zZSIsInN0cm9rZSIsImxpbmVXaWR0aCIsImFkZENoaWxkIiwiY2VudGVyWCIsImNlbnRlclkiLCJzaXplIiwiZmlsbCIsIm5lZWRsZUFycm93Tm9kZSIsImhlYWRIZWlnaHQiLCJoZWFkV2lkdGgiLCJ0YWlsV2lkdGgiLCJtYXhQb3NpdGl2ZVZvbHRhZ2VTb3VuZENsaXAiLCJpbml0aWFsT3V0cHV0TGV2ZWwiLCJpbml0aWFsUGxheWJhY2tSYXRlIiwiYWRkU291bmRHZW5lcmF0b3IiLCJtYXhOZWdhdGl2ZVZvbHRhZ2VTb3VuZENsaXAiLCJwcmV2aW91c0NsYW1wZWROZWVkbGVBbmdsZSIsInZhbHVlIiwibGluayIsIm5lZWRsZUFuZ2xlIiwiY2xhbXBlZE5lZWRsZUFuZ2xlIiwiY2xhbXAiLCJyb3RhdGlvbiIsIl8iLCJzb21lIiwiZ2V0VHJhaWxzVG8iLCJwaGV0Iiwiam9pc3QiLCJkaXNwbGF5Iiwicm9vdE5vZGUiLCJ0cmFpbCIsImlzVmlzaWJsZSIsInBsYXkiLCJtdXRhdGUiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlZvbHRtZXRlckdhdWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE0LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFZvbHRtZXRlciBnYXVnZSAocGFuZWwgd2l0aCBuZWVkbGUpIGZvciAnRmFyYWRheXMgTGF3J1xyXG4gKlxyXG4gKiBAYXV0aG9yIFZhc2lseSBTaGFraG92IChNTGVhcm5lcilcclxuICogQGF1dGhvciBTYW0gUmVpZCAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgRGltZW5zaW9uMiBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvRGltZW5zaW9uMi5qcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvVXRpbHMuanMnO1xyXG5pbXBvcnQgeyBTaGFwZSB9IGZyb20gJy4uLy4uLy4uLy4uL2tpdGUvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBBcnJvd05vZGUgZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL0Fycm93Tm9kZS5qcyc7XHJcbmltcG9ydCBNaW51c05vZGUgZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL01pbnVzTm9kZS5qcyc7XHJcbmltcG9ydCBQbHVzTm9kZSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMvUGx1c05vZGUuanMnO1xyXG5pbXBvcnQgeyBDaXJjbGUsIE5vZGUsIFBhdGggfSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgU291bmRDbGlwIGZyb20gJy4uLy4uLy4uLy4uL3RhbWJvL2pzL3NvdW5kLWdlbmVyYXRvcnMvU291bmRDbGlwLmpzJztcclxuaW1wb3J0IHNvdW5kTWFuYWdlciBmcm9tICcuLi8uLi8uLi8uLi90YW1iby9qcy9zb3VuZE1hbmFnZXIuanMnO1xyXG5pbXBvcnQgdm9sdGFnZU1heENsaWNrX21wMyBmcm9tICcuLi8uLi8uLi9zb3VuZHMvdm9sdGFnZU1heENsaWNrX21wMy5qcyc7XHJcbmltcG9ydCBmYXJhZGF5c0xhdyBmcm9tICcuLi8uLi9mYXJhZGF5c0xhdy5qcyc7XHJcblxyXG4vLyBjb25zdGFudHNcclxuY29uc3QgTUlOX0FOR0xFID0gLU1hdGguUEkgLyAyO1xyXG5jb25zdCBNQVhfQU5HTEUgPSBNYXRoLlBJIC8gMjtcclxuY29uc3QgQ0xJQ0tfU09VTkRfT1VUUFVUX0xFVkVMID0gMC4xNTsgLy8gZW1waXJpY2FsbHkgZGV0ZXJtaW5lZFxyXG5cclxuY2xhc3MgVm9sdG1ldGVyR2F1Z2UgZXh0ZW5kcyBOb2RlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtOdW1iZXJQcm9wZXJ0eX0gbmVlZGxlQW5nbGVQcm9wZXJ0eSAtIGFuZ2xlIG9mIG5lZWRsZSBpbiB2b2x0bWV0ZXJcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIG5lZWRsZUFuZ2xlUHJvcGVydHksIG9wdGlvbnMgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgY29uc3QgYXJjUmFkaXVzID0gNTU7IC8vIHJhZGl1cyBvZiB2b2x0bWV0ZXIgc2NhbGUsIGVtcGlyaWNhbGx5IGRldGVybWluZWRcclxuICAgIGNvbnN0IG5lZWRsZUNvbG9yID0gJyMzOTU0YTUnOyAvLyBibHVlXHJcblxyXG4gICAgLy8gYmFja2dyb3VuZCBwYW5lbCB3aXRoaW4gd2hpY2ggdGhlIG5lZWRsZSBtb3Zlc1xyXG4gICAgY29uc3QgYmFja2dyb3VuZCA9IG5ldyBQYXRoKCBuZXcgU2hhcGUoKVxyXG4gICAgICAubW92ZVRvKCAwLCAwIClcclxuICAgICAgLmxpbmVUbyggMCwgLWFyY1JhZGl1cyApXHJcbiAgICAgIC5tb3ZlVG8oIC1hcmNSYWRpdXMsIDAgKVxyXG4gICAgICAuYXJjKCAwLCAwLCBhcmNSYWRpdXMsIC1NYXRoLlBJLCAwLCBmYWxzZSApXHJcbiAgICAgIC5saW5lVG8oIC1hcmNSYWRpdXMsIDAgKVxyXG4gICAgICAuY2xvc2UoKSwge1xyXG4gICAgICBzdHJva2U6ICdibGFjaycsXHJcbiAgICAgIGxpbmVXaWR0aDogMVxyXG4gICAgfSApO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggYmFja2dyb3VuZCApO1xyXG5cclxuICAgIC8vIHBsdXMgYW5kIG1pbnVzIHNpZ25zXHJcbiAgICB0aGlzLmFkZENoaWxkKCBuZXcgUGx1c05vZGUoIHtcclxuICAgICAgY2VudGVyWDogYXJjUmFkaXVzIC8gMi4zLFxyXG4gICAgICBjZW50ZXJZOiAtYXJjUmFkaXVzIC8gMi41LFxyXG4gICAgICBzaXplOiBuZXcgRGltZW5zaW9uMiggMTIsIDIgKVxyXG4gICAgfSApICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCBuZXcgTWludXNOb2RlKCB7XHJcbiAgICAgIGNlbnRlclg6IC1hcmNSYWRpdXMgLyAyLjMsXHJcbiAgICAgIGNlbnRlclk6IC1hcmNSYWRpdXMgLyAyLjUsXHJcbiAgICAgIHNpemU6IG5ldyBEaW1lbnNpb24yKCAxMiwgMiApXHJcbiAgICB9ICkgKTtcclxuXHJcbiAgICAvLyBuZWVkbGUgYmFzZVxyXG4gICAgdGhpcy5hZGRDaGlsZCggbmV3IENpcmNsZSggNCwge1xyXG4gICAgICBmaWxsOiBuZWVkbGVDb2xvclxyXG4gICAgfSApICk7XHJcblxyXG4gICAgLy8gbmVlZGxlXHJcbiAgICBjb25zdCBuZWVkbGVBcnJvd05vZGUgPSBuZXcgQXJyb3dOb2RlKCAwLCAwLCAwLCAtNTMsIHtcclxuICAgICAgaGVhZEhlaWdodDogMTIsXHJcbiAgICAgIGhlYWRXaWR0aDogOCxcclxuICAgICAgdGFpbFdpZHRoOiAyLFxyXG4gICAgICBmaWxsOiBuZWVkbGVDb2xvcixcclxuICAgICAgbGluZVdpZHRoOiAwXHJcbiAgICB9ICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCBuZWVkbGVBcnJvd05vZGUgKTtcclxuXHJcbiAgICAvLyBzb3VuZCBnZW5lcmF0b3JzXHJcbiAgICBjb25zdCBtYXhQb3NpdGl2ZVZvbHRhZ2VTb3VuZENsaXAgPSBuZXcgU291bmRDbGlwKCB2b2x0YWdlTWF4Q2xpY2tfbXAzLCB7XHJcbiAgICAgIGluaXRpYWxPdXRwdXRMZXZlbDogQ0xJQ0tfU09VTkRfT1VUUFVUX0xFVkVMLFxyXG4gICAgICBpbml0aWFsUGxheWJhY2tSYXRlOiAxLjEyMjQ2MjA0ODMxXHJcbiAgICB9ICk7XHJcbiAgICBzb3VuZE1hbmFnZXIuYWRkU291bmRHZW5lcmF0b3IoIG1heFBvc2l0aXZlVm9sdGFnZVNvdW5kQ2xpcCApO1xyXG4gICAgY29uc3QgbWF4TmVnYXRpdmVWb2x0YWdlU291bmRDbGlwID0gbmV3IFNvdW5kQ2xpcCggdm9sdGFnZU1heENsaWNrX21wMywge1xyXG4gICAgICBpbml0aWFsT3V0cHV0TGV2ZWw6IENMSUNLX1NPVU5EX09VVFBVVF9MRVZFTFxyXG4gICAgfSApO1xyXG4gICAgc291bmRNYW5hZ2VyLmFkZFNvdW5kR2VuZXJhdG9yKCBtYXhOZWdhdGl2ZVZvbHRhZ2VTb3VuZENsaXAgKTtcclxuXHJcbiAgICAvLyBvYnNlcnZlcnNcclxuICAgIGxldCBwcmV2aW91c0NsYW1wZWROZWVkbGVBbmdsZSA9IG5lZWRsZUFuZ2xlUHJvcGVydHkudmFsdWU7XHJcbiAgICBuZWVkbGVBbmdsZVByb3BlcnR5LmxpbmsoIG5lZWRsZUFuZ2xlID0+IHtcclxuXHJcbiAgICAgIC8vIFNldCB0aGUgYW5nbGUgb2YgdGhlIG5lZWRsZSwgbWFraW5nIHN1cmUgdGhhdCBpdCBkb2Vzbid0IGV4Y2VlZCB0aGUgbWF4IG9yIG1pbiB2YWx1ZXMuXHJcbiAgICAgIGNvbnN0IGNsYW1wZWROZWVkbGVBbmdsZSA9IFV0aWxzLmNsYW1wKCBuZWVkbGVBbmdsZSwgTUlOX0FOR0xFLCBNQVhfQU5HTEUgKTtcclxuICAgICAgbmVlZGxlQXJyb3dOb2RlLnJvdGF0aW9uID0gY2xhbXBlZE5lZWRsZUFuZ2xlO1xyXG5cclxuICAgICAgLy8gUGxheSBhIHNvdW5kIHdoZW4gdGhlIG5lZWRsZSBmaXJzdCBoaXRzIHRoZSBtaW4gb3IgbWF4IHZhbHVlLCBidXQgb25seSBpZiB2aXNpYmxlLlxyXG4gICAgICBpZiAoIF8uc29tZSggdGhpcy5nZXRUcmFpbHNUbyggcGhldC5qb2lzdC5kaXNwbGF5LnJvb3ROb2RlICksIHRyYWlsID0+IHRyYWlsLmlzVmlzaWJsZSgpICkgKSB7XHJcbiAgICAgICAgaWYgKCBjbGFtcGVkTmVlZGxlQW5nbGUgPT09IE1BWF9BTkdMRSAmJiBwcmV2aW91c0NsYW1wZWROZWVkbGVBbmdsZSA8IE1BWF9BTkdMRSApIHtcclxuICAgICAgICAgIG1heFBvc2l0aXZlVm9sdGFnZVNvdW5kQ2xpcC5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCBjbGFtcGVkTmVlZGxlQW5nbGUgPT09IE1JTl9BTkdMRSAmJiBwcmV2aW91c0NsYW1wZWROZWVkbGVBbmdsZSA+IE1JTl9BTkdMRSApIHtcclxuICAgICAgICAgIG1heE5lZ2F0aXZlVm9sdGFnZVNvdW5kQ2xpcC5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTYXZlIHRoZSBuZWVkbGUgYW5nbGUgZm9yIGNvbXBhcmlzb24gdGhlIG5leHQgdGltZSB0aHJvdWdoLlxyXG4gICAgICBwcmV2aW91c0NsYW1wZWROZWVkbGVBbmdsZSA9IGNsYW1wZWROZWVkbGVBbmdsZTtcclxuICAgIH0gKTtcclxuXHJcbiAgICB0aGlzLm11dGF0ZSggb3B0aW9ucyApO1xyXG4gIH1cclxufVxyXG5cclxuZmFyYWRheXNMYXcucmVnaXN0ZXIoICdWb2x0bWV0ZXJHYXVnZScsIFZvbHRtZXRlckdhdWdlICk7XHJcbmV4cG9ydCBkZWZhdWx0IFZvbHRtZXRlckdhdWdlOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFVBQVUsTUFBTSxrQ0FBa0M7QUFDekQsT0FBT0MsS0FBSyxNQUFNLDZCQUE2QjtBQUMvQyxTQUFTQyxLQUFLLFFBQVEsZ0NBQWdDO0FBQ3RELE9BQU9DLFNBQVMsTUFBTSwwQ0FBMEM7QUFDaEUsT0FBT0Ms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