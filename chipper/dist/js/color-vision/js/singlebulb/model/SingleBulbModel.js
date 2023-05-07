// Copyright 2014-2022, University of Colorado Boulder

/**
 * Model for 'Single Bulb' screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import Range from '../../../../dot/js/Range.js';
import EventTimer from '../../../../phet-core/js/EventTimer.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import { Color } from '../../../../scenery/js/imports.js';
import colorVision from '../../colorVision.js';
import ColorVisionModel from '../../common/model/ColorVisionModel.js';
import SingleBulbConstants from '../SingleBulbConstants.js';
import SingleBulbPhotonBeam from './SingleBulbPhotonBeam.js';
class SingleBulbModel extends ColorVisionModel {
  /**
   * @param {Tandem} tandem
   */
  constructor(tandem) {
    super(tandem);
    const flashlightTandem = tandem.createTandem('flashlight');
    const filterTandem = tandem.createTandem('filter');

    // @public {Property.<string>} kind of light in the beam
    // TODO: Why not an enum?
    this.lightTypeProperty = new StringProperty('colored', {
      validValues: ['white', 'colored'],
      tandem: tandem.createTandem('lightTypeProperty')
    });

    // @public {Property.<string>} indicates solid beam vs individual photons
    this.beamTypeProperty = new StringProperty('beam', {
      validValues: ['beam', 'photon'],
      tandem: tandem.createTandem('beamTypeProperty')
    });

    // @public {Property.<number>} in units of nm, default wavelength is yellow
    this.flashlightWavelengthProperty = new NumberProperty(570, {
      tandem: flashlightTandem.createTandem('flashlightWavelengthProperty'),
      units: 'nm',
      range: new Range(VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH)
    });

    // @public {Property.<number>} in units of nm, default wavelength is yellow
    this.filterWavelengthProperty = new NumberProperty(570, {
      tandem: filterTandem.createTandem('filterWavelengthProperty'),
      units: 'nm',
      range: new Range(VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH)
    });

    // @public {Property.<boolean>} is the flashlight on?
    this.flashlightOnProperty = new BooleanProperty(false, {
      tandem: flashlightTandem.createTandem('flashlightOnProperty')
    });

    // @public {Property.<boolean>} is the filter on?
    this.filterVisibleProperty = new BooleanProperty(false, {
      tandem: filterTandem.createTandem('filterVisibleProperty')
    });

    // @public {Property.<Color|string>} keep track of the last photon to hit the eye,
    // for use in calculating the perceived color
    this.lastPhotonColorProperty = new Property(new Color(0, 0, 0, 0));

    // @public {DerivedProperty.<Color|string>} the color perceived by the person depends on almost every property
    this.perceivedColorProperty = new DerivedProperty([this.flashlightWavelengthProperty, this.filterWavelengthProperty, this.flashlightOnProperty, this.filterVisibleProperty, this.lightTypeProperty, this.beamTypeProperty, this.lastPhotonColorProperty], (flashlightWavelength, filterWavelength, flashlightOn, filterVisible, lightType, beamType, lastPhotonColor) => {
      // If the beam is in photon mode, return the color of the last photon to hit the eye.
      // The logic for handling all of the cases where the beam is in photon mode is in the file
      // SingleBulbPhotonBeam, where lastPhotonColor is set.
      if (beamType === 'photon') {
        return lastPhotonColor;
      }
      // if flashlight is not on, the perceived color is black
      else if (!flashlightOn) {
        return Color.BLACK;
      }
      // if the filter is visible, and the beam type is colored, calculate the percentage of color to pass
      else if (filterVisible && lightType === 'colored') {
        let alpha; // the new alpha value for the color, proportional to the percentage of light to pass through the filter
        const halfWidth = SingleBulbConstants.GAUSSIAN_WIDTH / 2;

        // If the flashlightWavelength is outside the transmission width, no color passes.
        if (flashlightWavelength < filterWavelength - halfWidth || flashlightWavelength > filterWavelength + halfWidth) {
          alpha = 0;
        }
        // flashlightWavelength is within the transmission width, pass a linear percentage.
        else {
          alpha = 1 - Math.abs(filterWavelength - flashlightWavelength) / halfWidth;
        }
        return VisibleColor.wavelengthToColor(flashlightWavelength).withAlpha(alpha);
      }
      // if the filter is visible, and the beam is white, return the filter wavelength's color
      else if (filterVisible && lightType === 'white') {
        return VisibleColor.wavelengthToColor(filterWavelength);
      }
      // if the beam is white and the filter is not visible, return white
      else if (!filterVisible && lightType === 'white') {
        return Color.WHITE;
      }
      // if the filter is not visible, return the flashlight wavelength's color
      else {
        return VisibleColor.wavelengthToColor(flashlightWavelength);
      }
    }, {
      tandem: tandem.createTandem('perceivedColorProperty'),
      phetioValueType: Color.ColorIO
    });

    // @public
    this.photonBeam = new SingleBulbPhotonBeam(this, SingleBulbConstants.SINGLE_BEAM_LENGTH, {
      tandem: tandem.createTandem('photonBeam')
    });

    // create a new photon every 1/120 seconds
    // @private
    this.eventTimer = new EventTimer(new EventTimer.ConstantEventModel(120), timeElapsed => {
      this.photonBeam.createPhoton(timeElapsed);
    });
  }

  // @public
  step(dt) {
    // Cap dt, see https://github.com/phetsims/color-vision/issues/115 and https://github.com/phetsims/joist/issues/130
    dt = Math.min(dt, 0.5);
    if (this.playingProperty.value) {
      this.photonBeam.updateAnimationFrame(dt);
      this.eventTimer.step(dt);
    }
  }

  // @public @override
  // step one frame, assuming 60fps
  manualStep() {
    this.photonBeam.updateAnimationFrame(1 / 60);
    this.eventTimer.step(1 / 60);
  }

  // @public @override
  reset() {
    super.reset();
    this.lightTypeProperty.reset();
    this.beamTypeProperty.reset();
    this.flashlightWavelengthProperty.reset();
    this.filterWavelengthProperty.reset();
    this.flashlightOnProperty.reset();
    this.filterVisibleProperty.reset();
    this.lastPhotonColorProperty.reset();
    this.photonBeam.reset();
  }
}
colorVision.register('SingleBulbModel', SingleBulbModel);
export default SingleBulbModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCb29sZWFuUHJvcGVydHkiLCJEZXJpdmVkUHJvcGVydHkiLCJOdW1iZXJQcm9wZXJ0eSIsIlByb3BlcnR5IiwiU3RyaW5nUHJvcGVydHkiLCJSYW5nZSIsIkV2ZW50VGltZXIiLCJWaXNpYmxlQ29sb3IiLCJDb2xvciIsImNvbG9yVmlzaW9uIiwiQ29sb3JWaXNpb25Nb2RlbCIsIlNpbmdsZUJ1bGJDb25zdGFudHMiLCJTaW5nbGVCdWxiUGhvdG9uQmVhbSIsIlNpbmdsZUJ1bGJNb2RlbCIsImNvbnN0cnVjdG9yIiwidGFuZGVtIiwiZmxhc2hsaWdodFRhbmRlbSIsImNyZWF0ZVRhbmRlbSIsImZpbHRlclRhbmRlbSIsImxpZ2h0VHlwZVByb3BlcnR5IiwidmFsaWRWYWx1ZXMiLCJiZWFtVHlwZVByb3BlcnR5IiwiZmxhc2hsaWdodFdhdmVsZW5ndGhQcm9wZXJ0eSIsInVuaXRzIiwicmFuZ2UiLCJNSU5fV0FWRUxFTkdUSCIsIk1BWF9XQVZFTEVOR1RIIiwiZmlsdGVyV2F2ZWxlbmd0aFByb3BlcnR5IiwiZmxhc2hsaWdodE9uUHJvcGVydHkiLCJmaWx0ZXJWaXNpYmxlUHJvcGVydHkiLCJsYXN0UGhvdG9uQ29sb3JQcm9wZXJ0eSIsInBlcmNlaXZlZENvbG9yUHJvcGVydHkiLCJmbGFzaGxpZ2h0V2F2ZWxlbmd0aCIsImZpbHRlcldhdmVsZW5ndGgiLCJmbGFzaGxpZ2h0T24iLCJmaWx0ZXJWaXNpYmxlIiwibGlnaHRUeXBlIiwiYmVhbVR5cGUiLCJsYXN0UGhvdG9uQ29sb3IiLCJCTEFDSyIsImFscGhhIiwiaGFsZldpZHRoIiwiR0FVU1NJQU5fV0lEVEgiLCJNYXRoIiwiYWJzIiwid2F2ZWxlbmd0aFRvQ29sb3IiLCJ3aXRoQWxwaGEiLCJXSElURSIsInBoZXRpb1ZhbHVlVHlwZSIsIkNvbG9ySU8iLCJwaG90b25CZWFtIiwiU0lOR0xFX0JFQU1fTEVOR1RIIiwiZXZlbnRUaW1lciIsIkNvbnN0YW50RXZlbnRNb2RlbCIsInRpbWVFbGFwc2VkIiwiY3JlYXRlUGhvdG9uIiwic3RlcCIsImR0IiwibWluIiwicGxheWluZ1Byb3BlcnR5IiwidmFsdWUiLCJ1cGRhdGVBbmltYXRpb25GcmFtZSIsIm1hbnVhbFN0ZXAiLCJyZXNldCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiU2luZ2xlQnVsYk1vZGVsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE0LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIE1vZGVsIGZvciAnU2luZ2xlIEJ1bGInIHNjcmVlblxyXG4gKlxyXG4gKiBAYXV0aG9yIEFhcm9uIERhdmlzIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBCb29sZWFuUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9Cb29sZWFuUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgRGVyaXZlZFByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvRGVyaXZlZFByb3BlcnR5LmpzJztcclxuaW1wb3J0IE51bWJlclByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvTnVtYmVyUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9Qcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBTdHJpbmdQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL1N0cmluZ1Byb3BlcnR5LmpzJztcclxuaW1wb3J0IFJhbmdlIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9SYW5nZS5qcyc7XHJcbmltcG9ydCBFdmVudFRpbWVyIGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9FdmVudFRpbWVyLmpzJztcclxuaW1wb3J0IFZpc2libGVDb2xvciBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMvVmlzaWJsZUNvbG9yLmpzJztcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgY29sb3JWaXNpb24gZnJvbSAnLi4vLi4vY29sb3JWaXNpb24uanMnO1xyXG5pbXBvcnQgQ29sb3JWaXNpb25Nb2RlbCBmcm9tICcuLi8uLi9jb21tb24vbW9kZWwvQ29sb3JWaXNpb25Nb2RlbC5qcyc7XHJcbmltcG9ydCBTaW5nbGVCdWxiQ29uc3RhbnRzIGZyb20gJy4uL1NpbmdsZUJ1bGJDb25zdGFudHMuanMnO1xyXG5pbXBvcnQgU2luZ2xlQnVsYlBob3RvbkJlYW0gZnJvbSAnLi9TaW5nbGVCdWxiUGhvdG9uQmVhbS5qcyc7XHJcblxyXG5jbGFzcyBTaW5nbGVCdWxiTW9kZWwgZXh0ZW5kcyBDb2xvclZpc2lvbk1vZGVsIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtUYW5kZW19IHRhbmRlbVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCB0YW5kZW0gKSB7XHJcblxyXG4gICAgc3VwZXIoIHRhbmRlbSApO1xyXG5cclxuICAgIGNvbnN0IGZsYXNobGlnaHRUYW5kZW0gPSB0YW5kZW0uY3JlYXRlVGFuZGVtKCAnZmxhc2hsaWdodCcgKTtcclxuICAgIGNvbnN0IGZpbHRlclRhbmRlbSA9IHRhbmRlbS5jcmVhdGVUYW5kZW0oICdmaWx0ZXInICk7XHJcblxyXG4gICAgLy8gQHB1YmxpYyB7UHJvcGVydHkuPHN0cmluZz59IGtpbmQgb2YgbGlnaHQgaW4gdGhlIGJlYW1cclxuICAgIC8vIFRPRE86IFdoeSBub3QgYW4gZW51bT9cclxuICAgIHRoaXMubGlnaHRUeXBlUHJvcGVydHkgPSBuZXcgU3RyaW5nUHJvcGVydHkoICdjb2xvcmVkJywge1xyXG4gICAgICB2YWxpZFZhbHVlczogWyAnd2hpdGUnLCAnY29sb3JlZCcgXSxcclxuICAgICAgdGFuZGVtOiB0YW5kZW0uY3JlYXRlVGFuZGVtKCAnbGlnaHRUeXBlUHJvcGVydHknIClcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBAcHVibGljIHtQcm9wZXJ0eS48c3RyaW5nPn0gaW5kaWNhdGVzIHNvbGlkIGJlYW0gdnMgaW5kaXZpZHVhbCBwaG90b25zXHJcbiAgICB0aGlzLmJlYW1UeXBlUHJvcGVydHkgPSBuZXcgU3RyaW5nUHJvcGVydHkoICdiZWFtJywge1xyXG4gICAgICB2YWxpZFZhbHVlczogWyAnYmVhbScsICdwaG90b24nIF0sXHJcbiAgICAgIHRhbmRlbTogdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ2JlYW1UeXBlUHJvcGVydHknIClcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBAcHVibGljIHtQcm9wZXJ0eS48bnVtYmVyPn0gaW4gdW5pdHMgb2Ygbm0sIGRlZmF1bHQgd2F2ZWxlbmd0aCBpcyB5ZWxsb3dcclxuICAgIHRoaXMuZmxhc2hsaWdodFdhdmVsZW5ndGhQcm9wZXJ0eSA9IG5ldyBOdW1iZXJQcm9wZXJ0eSggNTcwLCB7XHJcbiAgICAgIHRhbmRlbTogZmxhc2hsaWdodFRhbmRlbS5jcmVhdGVUYW5kZW0oICdmbGFzaGxpZ2h0V2F2ZWxlbmd0aFByb3BlcnR5JyApLFxyXG4gICAgICB1bml0czogJ25tJyxcclxuICAgICAgcmFuZ2U6IG5ldyBSYW5nZSggVmlzaWJsZUNvbG9yLk1JTl9XQVZFTEVOR1RILCBWaXNpYmxlQ29sb3IuTUFYX1dBVkVMRU5HVEggKVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIEBwdWJsaWMge1Byb3BlcnR5LjxudW1iZXI+fSBpbiB1bml0cyBvZiBubSwgZGVmYXVsdCB3YXZlbGVuZ3RoIGlzIHllbGxvd1xyXG4gICAgdGhpcy5maWx0ZXJXYXZlbGVuZ3RoUHJvcGVydHkgPSBuZXcgTnVtYmVyUHJvcGVydHkoIDU3MCwge1xyXG4gICAgICB0YW5kZW06IGZpbHRlclRhbmRlbS5jcmVhdGVUYW5kZW0oICdmaWx0ZXJXYXZlbGVuZ3RoUHJvcGVydHknICksXHJcbiAgICAgIHVuaXRzOiAnbm0nLFxyXG4gICAgICByYW5nZTogbmV3IFJhbmdlKCBWaXNpYmxlQ29sb3IuTUlOX1dBVkVMRU5HVEgsIFZpc2libGVDb2xvci5NQVhfV0FWRUxFTkdUSCApXHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gQHB1YmxpYyB7UHJvcGVydHkuPGJvb2xlYW4+fSBpcyB0aGUgZmxhc2hsaWdodCBvbj9cclxuICAgIHRoaXMuZmxhc2hsaWdodE9uUHJvcGVydHkgPSBuZXcgQm9vbGVhblByb3BlcnR5KCBmYWxzZSwge1xyXG4gICAgICB0YW5kZW06IGZsYXNobGlnaHRUYW5kZW0uY3JlYXRlVGFuZGVtKCAnZmxhc2hsaWdodE9uUHJvcGVydHknIClcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBAcHVibGljIHtQcm9wZXJ0eS48Ym9vbGVhbj59IGlzIHRoZSBmaWx0ZXIgb24/XHJcbiAgICB0aGlzLmZpbHRlclZpc2libGVQcm9wZXJ0eSA9IG5ldyBCb29sZWFuUHJvcGVydHkoIGZhbHNlLCB7XHJcbiAgICAgIHRhbmRlbTogZmlsdGVyVGFuZGVtLmNyZWF0ZVRhbmRlbSggJ2ZpbHRlclZpc2libGVQcm9wZXJ0eScgKVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIEBwdWJsaWMge1Byb3BlcnR5LjxDb2xvcnxzdHJpbmc+fSBrZWVwIHRyYWNrIG9mIHRoZSBsYXN0IHBob3RvbiB0byBoaXQgdGhlIGV5ZSxcclxuICAgIC8vIGZvciB1c2UgaW4gY2FsY3VsYXRpbmcgdGhlIHBlcmNlaXZlZCBjb2xvclxyXG4gICAgdGhpcy5sYXN0UGhvdG9uQ29sb3JQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eSggbmV3IENvbG9yKCAwLCAwLCAwLCAwICkgKTtcclxuXHJcbiAgICAvLyBAcHVibGljIHtEZXJpdmVkUHJvcGVydHkuPENvbG9yfHN0cmluZz59IHRoZSBjb2xvciBwZXJjZWl2ZWQgYnkgdGhlIHBlcnNvbiBkZXBlbmRzIG9uIGFsbW9zdCBldmVyeSBwcm9wZXJ0eVxyXG4gICAgdGhpcy5wZXJjZWl2ZWRDb2xvclByb3BlcnR5ID0gbmV3IERlcml2ZWRQcm9wZXJ0eSggW1xyXG4gICAgICAgIHRoaXMuZmxhc2hsaWdodFdhdmVsZW5ndGhQcm9wZXJ0eSxcclxuICAgICAgICB0aGlzLmZpbHRlcldhdmVsZW5ndGhQcm9wZXJ0eSxcclxuICAgICAgICB0aGlzLmZsYXNobGlnaHRPblByb3BlcnR5LFxyXG4gICAgICAgIHRoaXMuZmlsdGVyVmlzaWJsZVByb3BlcnR5LFxyXG4gICAgICAgIHRoaXMubGlnaHRUeXBlUHJvcGVydHksXHJcbiAgICAgICAgdGhpcy5iZWFtVHlwZVByb3BlcnR5LFxyXG4gICAgICAgIHRoaXMubGFzdFBob3RvbkNvbG9yUHJvcGVydHlcclxuICAgICAgXSxcclxuICAgICAgKCBmbGFzaGxpZ2h0V2F2ZWxlbmd0aCwgZmlsdGVyV2F2ZWxlbmd0aCwgZmxhc2hsaWdodE9uLCBmaWx0ZXJWaXNpYmxlLCBsaWdodFR5cGUsIGJlYW1UeXBlLCBsYXN0UGhvdG9uQ29sb3IgKSA9PiB7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBiZWFtIGlzIGluIHBob3RvbiBtb2RlLCByZXR1cm4gdGhlIGNvbG9yIG9mIHRoZSBsYXN0IHBob3RvbiB0byBoaXQgdGhlIGV5ZS5cclxuICAgICAgICAvLyBUaGUgbG9naWMgZm9yIGhhbmRsaW5nIGFsbCBvZiB0aGUgY2FzZXMgd2hlcmUgdGhlIGJlYW0gaXMgaW4gcGhvdG9uIG1vZGUgaXMgaW4gdGhlIGZpbGVcclxuICAgICAgICAvLyBTaW5nbGVCdWxiUGhvdG9uQmVhbSwgd2hlcmUgbGFzdFBob3RvbkNvbG9yIGlzIHNldC5cclxuICAgICAgICBpZiAoIGJlYW1UeXBlID09PSAncGhvdG9uJyApIHtcclxuICAgICAgICAgIHJldHVybiBsYXN0UGhvdG9uQ29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIGZsYXNobGlnaHQgaXMgbm90IG9uLCB0aGUgcGVyY2VpdmVkIGNvbG9yIGlzIGJsYWNrXHJcbiAgICAgICAgZWxzZSBpZiAoICFmbGFzaGxpZ2h0T24gKSB7XHJcbiAgICAgICAgICByZXR1cm4gQ29sb3IuQkxBQ0s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIHRoZSBmaWx0ZXIgaXMgdmlzaWJsZSwgYW5kIHRoZSBiZWFtIHR5cGUgaXMgY29sb3JlZCwgY2FsY3VsYXRlIHRoZSBwZXJjZW50YWdlIG9mIGNvbG9yIHRvIHBhc3NcclxuICAgICAgICBlbHNlIGlmICggZmlsdGVyVmlzaWJsZSAmJiBsaWdodFR5cGUgPT09ICdjb2xvcmVkJyApIHtcclxuICAgICAgICAgIGxldCBhbHBoYTsgLy8gdGhlIG5ldyBhbHBoYSB2YWx1ZSBmb3IgdGhlIGNvbG9yLCBwcm9wb3J0aW9uYWwgdG8gdGhlIHBlcmNlbnRhZ2Ugb2YgbGlnaHQgdG8gcGFzcyB0aHJvdWdoIHRoZSBmaWx0ZXJcclxuICAgICAgICAgIGNvbnN0IGhhbGZXaWR0aCA9IFNpbmdsZUJ1bGJDb25zdGFudHMuR0FVU1NJQU5fV0lEVEggLyAyO1xyXG5cclxuICAgICAgICAgIC8vIElmIHRoZSBmbGFzaGxpZ2h0V2F2ZWxlbmd0aCBpcyBvdXRzaWRlIHRoZSB0cmFuc21pc3Npb24gd2lkdGgsIG5vIGNvbG9yIHBhc3Nlcy5cclxuICAgICAgICAgIGlmICggZmxhc2hsaWdodFdhdmVsZW5ndGggPCBmaWx0ZXJXYXZlbGVuZ3RoIC0gaGFsZldpZHRoIHx8IGZsYXNobGlnaHRXYXZlbGVuZ3RoID4gZmlsdGVyV2F2ZWxlbmd0aCArIGhhbGZXaWR0aCApIHtcclxuICAgICAgICAgICAgYWxwaGEgPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gZmxhc2hsaWdodFdhdmVsZW5ndGggaXMgd2l0aGluIHRoZSB0cmFuc21pc3Npb24gd2lkdGgsIHBhc3MgYSBsaW5lYXIgcGVyY2VudGFnZS5cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbHBoYSA9IDEgLSBNYXRoLmFicyggZmlsdGVyV2F2ZWxlbmd0aCAtIGZsYXNobGlnaHRXYXZlbGVuZ3RoICkgLyBoYWxmV2lkdGg7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gVmlzaWJsZUNvbG9yLndhdmVsZW5ndGhUb0NvbG9yKCBmbGFzaGxpZ2h0V2F2ZWxlbmd0aCApLndpdGhBbHBoYSggYWxwaGEgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgdGhlIGZpbHRlciBpcyB2aXNpYmxlLCBhbmQgdGhlIGJlYW0gaXMgd2hpdGUsIHJldHVybiB0aGUgZmlsdGVyIHdhdmVsZW5ndGgncyBjb2xvclxyXG4gICAgICAgIGVsc2UgaWYgKCBmaWx0ZXJWaXNpYmxlICYmIGxpZ2h0VHlwZSA9PT0gJ3doaXRlJyApIHtcclxuICAgICAgICAgIHJldHVybiBWaXNpYmxlQ29sb3Iud2F2ZWxlbmd0aFRvQ29sb3IoIGZpbHRlcldhdmVsZW5ndGggKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgdGhlIGJlYW0gaXMgd2hpdGUgYW5kIHRoZSBmaWx0ZXIgaXMgbm90IHZpc2libGUsIHJldHVybiB3aGl0ZVxyXG4gICAgICAgIGVsc2UgaWYgKCAhZmlsdGVyVmlzaWJsZSAmJiBsaWdodFR5cGUgPT09ICd3aGl0ZScgKSB7XHJcbiAgICAgICAgICByZXR1cm4gQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIHRoZSBmaWx0ZXIgaXMgbm90IHZpc2libGUsIHJldHVybiB0aGUgZmxhc2hsaWdodCB3YXZlbGVuZ3RoJ3MgY29sb3JcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBWaXNpYmxlQ29sb3Iud2F2ZWxlbmd0aFRvQ29sb3IoIGZsYXNobGlnaHRXYXZlbGVuZ3RoICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgdGFuZGVtOiB0YW5kZW0uY3JlYXRlVGFuZGVtKCAncGVyY2VpdmVkQ29sb3JQcm9wZXJ0eScgKSxcclxuICAgICAgICBwaGV0aW9WYWx1ZVR5cGU6IENvbG9yLkNvbG9ySU9cclxuICAgICAgfSApO1xyXG5cclxuICAgIC8vIEBwdWJsaWNcclxuICAgIHRoaXMucGhvdG9uQmVhbSA9IG5ldyBTaW5nbGVCdWxiUGhvdG9uQmVhbSggdGhpcywgU2luZ2xlQnVsYkNvbnN0YW50cy5TSU5HTEVfQkVBTV9MRU5HVEgsIHtcclxuICAgICAgdGFuZGVtOiB0YW5kZW0uY3JlYXRlVGFuZGVtKCAncGhvdG9uQmVhbScgKVxyXG4gICAgfSApO1xyXG5cclxuXHJcbiAgICAvLyBjcmVhdGUgYSBuZXcgcGhvdG9uIGV2ZXJ5IDEvMTIwIHNlY29uZHNcclxuICAgIC8vIEBwcml2YXRlXHJcbiAgICB0aGlzLmV2ZW50VGltZXIgPSBuZXcgRXZlbnRUaW1lciggbmV3IEV2ZW50VGltZXIuQ29uc3RhbnRFdmVudE1vZGVsKCAxMjAgKSwgdGltZUVsYXBzZWQgPT4ge1xyXG4gICAgICB0aGlzLnBob3RvbkJlYW0uY3JlYXRlUGhvdG9uKCB0aW1lRWxhcHNlZCApO1xyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIEBwdWJsaWNcclxuICBzdGVwKCBkdCApIHtcclxuXHJcbiAgICAvLyBDYXAgZHQsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vcGhldHNpbXMvY29sb3ItdmlzaW9uL2lzc3Vlcy8xMTUgYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9qb2lzdC9pc3N1ZXMvMTMwXHJcbiAgICBkdCA9IE1hdGgubWluKCBkdCwgMC41ICk7XHJcblxyXG4gICAgaWYgKCB0aGlzLnBsYXlpbmdQcm9wZXJ0eS52YWx1ZSApIHtcclxuICAgICAgdGhpcy5waG90b25CZWFtLnVwZGF0ZUFuaW1hdGlvbkZyYW1lKCBkdCApO1xyXG4gICAgICB0aGlzLmV2ZW50VGltZXIuc3RlcCggZHQgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEBwdWJsaWMgQG92ZXJyaWRlXHJcbiAgLy8gc3RlcCBvbmUgZnJhbWUsIGFzc3VtaW5nIDYwZnBzXHJcbiAgbWFudWFsU3RlcCgpIHtcclxuICAgIHRoaXMucGhvdG9uQmVhbS51cGRhdGVBbmltYXRpb25GcmFtZSggMSAvIDYwICk7XHJcbiAgICB0aGlzLmV2ZW50VGltZXIuc3RlcCggMSAvIDYwICk7XHJcbiAgfVxyXG5cclxuICAvLyBAcHVibGljIEBvdmVycmlkZVxyXG4gIHJlc2V0KCkge1xyXG5cclxuICAgIHN1cGVyLnJlc2V0KCk7XHJcblxyXG4gICAgdGhpcy5saWdodFR5cGVQcm9wZXJ0eS5yZXNldCgpO1xyXG4gICAgdGhpcy5iZWFtVHlwZVByb3BlcnR5LnJlc2V0KCk7XHJcbiAgICB0aGlzLmZsYXNobGlnaHRXYXZlbGVuZ3RoUHJvcGVydHkucmVzZXQoKTtcclxuICAgIHRoaXMuZmlsdGVyV2F2ZWxlbmd0aFByb3BlcnR5LnJlc2V0KCk7XHJcbiAgICB0aGlzLmZsYXNobGlnaHRPblByb3BlcnR5LnJlc2V0KCk7XHJcbiAgICB0aGlzLmZpbHRlclZpc2libGVQcm9wZXJ0eS5yZXNldCgpO1xyXG4gICAgdGhpcy5sYXN0UGhvdG9uQ29sb3JQcm9wZXJ0eS5yZXNldCgpO1xyXG5cclxuICAgIHRoaXMucGhvdG9uQmVhbS5yZXNldCgpO1xyXG4gIH1cclxufVxyXG5cclxuY29sb3JWaXNpb24ucmVnaXN0ZXIoICdTaW5nbGVCdWxiTW9kZWwnLCBTaW5nbGVCdWxiTW9kZWwgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNpbmdsZUJ1bGJNb2RlbDsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsZUFBZSxNQUFNLHdDQUF3QztBQUNwRSxPQUFPQyxlQUFlLE1BQU0sd0NBQXdDO0FBQ3BFLE9BQU9DLGNBQWMsTUFBTSx1Q0FBdUM7QUFDbEUsT0FBT0MsUUFBUSxNQUFNLGlDQUFpQztBQUN0RCxPQUFPQyxjQUFjLE1BQU0sdUNBQXVDO0FBQ2xFLE9BQU9DLEtBQUssTUFBTSw2QkFBNkI7QUFDL0MsT0FBT0MsVUFBVSxNQUFNLHdDQUF3QztBQUMvRCxPQUFPQyxZQUFZLE1BQU0sNkNBQTZDO0FBQ3RFLFNBQVNDLEtBQUssUUFBUSxtQ0FBbUM7QUFDekQsT0FBT0MsV0FBVyxNQUFNLHNCQUFz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