// Copyright 2014-2022, University of Colorado Boulder

/**
 * SolidBeamNode shows the light beam when in beam mode, not as individual photons
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import { Shape } from '../../../../kite/js/imports.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import { Color, Node, Path } from '../../../../scenery/js/imports.js';
import colorVision from '../../colorVision.js';

// constants
const DEFAULT_BEAM_ALPHA = 0.8;
const WHITE_WITH_ALPHA = Color.WHITE.withAlpha(DEFAULT_BEAM_ALPHA);
class SolidBeamNode extends Node {
  /**
   * @param {SingleBulbModel} model
   * @param {Bounds2} bounds
   * @param {number} cutoff the x-coordinate of the filter
   */
  constructor(model, bounds, cutoff) {
    super();

    // use the principle of similar triangles to calculate where to split the beam
    const width = bounds.maxX - bounds.minX;
    const triangleHeight = 30; // height of right triangle the overlaps with the beam fanning
    const smallTriangleWidth = cutoff - bounds.minX;
    const smallTriangleHeight = smallTriangleWidth * triangleHeight / width;
    const leftHalfShape = new Shape().moveTo(bounds.minX, bounds.minY).lineTo(bounds.minX, bounds.maxY).lineTo(cutoff, bounds.maxY + smallTriangleHeight).lineTo(cutoff, bounds.minY - smallTriangleHeight).close();
    const rightHalfShape = new Shape().moveTo(cutoff, bounds.minY - smallTriangleHeight).lineTo(cutoff, bounds.maxY + smallTriangleHeight).lineTo(bounds.maxX, bounds.maxY + triangleHeight).lineTo(bounds.maxX, bounds.minY - triangleHeight).close();

    // use the whole beam when the filter is disabled, to avoid seeing the cut between the halves
    const wholeBeamShape = new Shape().moveTo(bounds.minX, bounds.minY).lineTo(bounds.minX, bounds.maxY).lineTo(bounds.maxX, bounds.maxY + triangleHeight).lineTo(bounds.maxX, bounds.minY - triangleHeight).close();
    const leftHalf = new Path(leftHalfShape);
    const rightHalf = new Path(rightHalfShape);
    const wholeBeam = new Path(wholeBeamShape);
    model.flashlightWavelengthProperty.link(wavelength => {
      const newColor = VisibleColor.wavelengthToColor(wavelength).withAlpha(DEFAULT_BEAM_ALPHA);
      rightHalf.fill = newColor;
      wholeBeam.fill = newColor;
    });
    model.filterVisibleProperty.link(visible => {
      // when the filter turns off, make the whole beam visible and the halves invisible
      wholeBeam.visible = !visible;
      leftHalf.visible = visible;
      rightHalf.visible = visible;
      if (wholeBeam.visible) {
        wholeBeam.fill = rightHalf.fill.withAlpha(DEFAULT_BEAM_ALPHA);
      }
    });

    // listen for any changes to the model that condition when the beam should be white.
    Multilink.multilink([model.flashlightWavelengthProperty, model.filterWavelengthProperty, model.lightTypeProperty, model.filterVisibleProperty, model.beamTypeProperty], (flashlightWavelength, filterWavelength, lightType, filterVisible, beamMode) => {
      // update the beam only if it is visible
      if (beamMode === 'beam') {
        if (lightType === 'white' && filterVisible) {
          leftHalf.fill = VisibleColor.wavelengthToColor(filterWavelength).withAlpha(DEFAULT_BEAM_ALPHA);
          rightHalf.fill = WHITE_WITH_ALPHA;
        } else if (lightType === 'white' && !filterVisible) {
          wholeBeam.fill = WHITE_WITH_ALPHA;
        } else if (lightType === 'colored' && filterVisible) {
          rightHalf.fill = VisibleColor.wavelengthToColor(flashlightWavelength).withAlpha(DEFAULT_BEAM_ALPHA);
        } else if (lightType === 'colored' && !filterVisible) {
          wholeBeam.fill = VisibleColor.wavelengthToColor(flashlightWavelength).withAlpha(DEFAULT_BEAM_ALPHA);
        }
      }
    });
    const visibleProperty = new DerivedProperty([model.flashlightOnProperty, model.beamTypeProperty], (flashlightOn, beamType) => flashlightOn && beamType === 'beam');
    visibleProperty.linkAttribute(this, 'visible');
    Multilink.multilink([model.perceivedColorProperty, visibleProperty], (perceivedColor, visible) => {
      if (visible) {
        // scale the alpha between 0 and DEFAULT_BEAM_ALPHA instead of 0 and 1 so the beam always retains some transparency
        leftHalf.fill = perceivedColor.withAlpha(DEFAULT_BEAM_ALPHA * perceivedColor.a);
      }
    });
    this.addChild(leftHalf);
    this.addChild(rightHalf);
    this.addChild(wholeBeam);
  }
}
colorVision.register('SolidBeamNode', SolidBeamNode);
export default SolidBeamNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEZXJpdmVkUHJvcGVydHkiLCJNdWx0aWxpbmsiLCJTaGFwZSIsIlZpc2libGVDb2xvciIsIkNvbG9yIiwiTm9kZSIsIlBhdGgiLCJjb2xvclZpc2lvbiIsIkRFRkFVTFRfQkVBTV9BTFBIQSIsIldISVRFX1dJVEhfQUxQSEEiLCJXSElURSIsIndpdGhBbHBoYSIsIlNvbGlkQmVhbU5vZGUiLCJjb25zdHJ1Y3RvciIsIm1vZGVsIiwiYm91bmRzIiwiY3V0b2ZmIiwid2lkdGgiLCJtYXhYIiwibWluWCIsInRyaWFuZ2xlSGVpZ2h0Iiwic21hbGxUcmlhbmdsZVdpZHRoIiwic21hbGxUcmlhbmdsZUhlaWdodCIsImxlZnRIYWxmU2hhcGUiLCJtb3ZlVG8iLCJtaW5ZIiwibGluZVRvIiwibWF4WSIsImNsb3NlIiwicmlnaHRIYWxmU2hhcGUiLCJ3aG9sZUJlYW1TaGFwZSIsImxlZnRIYWxmIiwicmlnaHRIYWxmIiwid2hvbGVCZWFtIiwiZmxhc2hsaWdodFdhdmVsZW5ndGhQcm9wZXJ0eSIsImxpbmsiLCJ3YXZlbGVuZ3RoIiwibmV3Q29sb3IiLCJ3YXZlbGVuZ3RoVG9Db2xvciIsImZpbGwiLCJmaWx0ZXJWaXNpYmxlUHJvcGVydHkiLCJ2aXNpYmxlIiwibXVsdGlsaW5rIiwiZmlsdGVyV2F2ZWxlbmd0aFByb3BlcnR5IiwibGlnaHRUeXBlUHJvcGVydHkiLCJiZWFtVHlwZVByb3BlcnR5IiwiZmxhc2hsaWdodFdhdmVsZW5ndGgiLCJmaWx0ZXJXYXZlbGVuZ3RoIiwibGlnaHRUeXBlIiwiZmlsdGVyVmlzaWJsZSIsImJlYW1Nb2RlIiwidmlzaWJsZVByb3BlcnR5IiwiZmxhc2hsaWdodE9uUHJvcGVydHkiLCJmbGFzaGxpZ2h0T24iLCJiZWFtVHlwZSIsImxpbmtBdHRyaWJ1dGUiLCJwZXJjZWl2ZWRDb2xvclByb3BlcnR5IiwicGVyY2VpdmVkQ29sb3IiLCJhIiwiYWRkQ2hpbGQiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlNvbGlkQmVhbU5vZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTQtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogU29saWRCZWFtTm9kZSBzaG93cyB0aGUgbGlnaHQgYmVhbSB3aGVuIGluIGJlYW0gbW9kZSwgbm90IGFzIGluZGl2aWR1YWwgcGhvdG9uc1xyXG4gKlxyXG4gKiBAYXV0aG9yIEFhcm9uIERhdmlzIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBEZXJpdmVkUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9EZXJpdmVkUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgTXVsdGlsaW5rIGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvTXVsdGlsaW5rLmpzJztcclxuaW1wb3J0IHsgU2hhcGUgfSBmcm9tICcuLi8uLi8uLi8uLi9raXRlL2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgVmlzaWJsZUNvbG9yIGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnktcGhldC9qcy9WaXNpYmxlQ29sb3IuanMnO1xyXG5pbXBvcnQgeyBDb2xvciwgTm9kZSwgUGF0aCB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBjb2xvclZpc2lvbiBmcm9tICcuLi8uLi9jb2xvclZpc2lvbi5qcyc7XHJcblxyXG4vLyBjb25zdGFudHNcclxuY29uc3QgREVGQVVMVF9CRUFNX0FMUEhBID0gMC44O1xyXG5jb25zdCBXSElURV9XSVRIX0FMUEhBID0gQ29sb3IuV0hJVEUud2l0aEFscGhhKCBERUZBVUxUX0JFQU1fQUxQSEEgKTtcclxuXHJcbmNsYXNzIFNvbGlkQmVhbU5vZGUgZXh0ZW5kcyBOb2RlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtTaW5nbGVCdWxiTW9kZWx9IG1vZGVsXHJcbiAgICogQHBhcmFtIHtCb3VuZHMyfSBib3VuZHNcclxuICAgKiBAcGFyYW0ge251bWJlcn0gY3V0b2ZmIHRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIGZpbHRlclxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBtb2RlbCwgYm91bmRzLCBjdXRvZmYgKSB7XHJcblxyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICAvLyB1c2UgdGhlIHByaW5jaXBsZSBvZiBzaW1pbGFyIHRyaWFuZ2xlcyB0byBjYWxjdWxhdGUgd2hlcmUgdG8gc3BsaXQgdGhlIGJlYW1cclxuICAgIGNvbnN0IHdpZHRoID0gYm91bmRzLm1heFggLSBib3VuZHMubWluWDtcclxuICAgIGNvbnN0IHRyaWFuZ2xlSGVpZ2h0ID0gMzA7IC8vIGhlaWdodCBvZiByaWdodCB0cmlhbmdsZSB0aGUgb3ZlcmxhcHMgd2l0aCB0aGUgYmVhbSBmYW5uaW5nXHJcbiAgICBjb25zdCBzbWFsbFRyaWFuZ2xlV2lkdGggPSBjdXRvZmYgLSBib3VuZHMubWluWDtcclxuICAgIGNvbnN0IHNtYWxsVHJpYW5nbGVIZWlnaHQgPSBzbWFsbFRyaWFuZ2xlV2lkdGggKiB0cmlhbmdsZUhlaWdodCAvIHdpZHRoO1xyXG5cclxuICAgIGNvbnN0IGxlZnRIYWxmU2hhcGUgPSBuZXcgU2hhcGUoKVxyXG4gICAgICAubW92ZVRvKCBib3VuZHMubWluWCwgYm91bmRzLm1pblkgKVxyXG4gICAgICAubGluZVRvKCBib3VuZHMubWluWCwgYm91bmRzLm1heFkgKVxyXG4gICAgICAubGluZVRvKCBjdXRvZmYsIGJvdW5kcy5tYXhZICsgc21hbGxUcmlhbmdsZUhlaWdodCApXHJcbiAgICAgIC5saW5lVG8oIGN1dG9mZiwgYm91bmRzLm1pblkgLSBzbWFsbFRyaWFuZ2xlSGVpZ2h0IClcclxuICAgICAgLmNsb3NlKCk7XHJcblxyXG4gICAgY29uc3QgcmlnaHRIYWxmU2hhcGUgPSBuZXcgU2hhcGUoKVxyXG4gICAgICAubW92ZVRvKCBjdXRvZmYsIGJvdW5kcy5taW5ZIC0gc21hbGxUcmlhbmdsZUhlaWdodCApXHJcbiAgICAgIC5saW5lVG8oIGN1dG9mZiwgYm91bmRzLm1heFkgKyBzbWFsbFRyaWFuZ2xlSGVpZ2h0IClcclxuICAgICAgLmxpbmVUbyggYm91bmRzLm1heFgsIGJvdW5kcy5tYXhZICsgdHJpYW5nbGVIZWlnaHQgKVxyXG4gICAgICAubGluZVRvKCBib3VuZHMubWF4WCwgYm91bmRzLm1pblkgLSB0cmlhbmdsZUhlaWdodCApXHJcbiAgICAgIC5jbG9zZSgpO1xyXG5cclxuICAgIC8vIHVzZSB0aGUgd2hvbGUgYmVhbSB3aGVuIHRoZSBmaWx0ZXIgaXMgZGlzYWJsZWQsIHRvIGF2b2lkIHNlZWluZyB0aGUgY3V0IGJldHdlZW4gdGhlIGhhbHZlc1xyXG4gICAgY29uc3Qgd2hvbGVCZWFtU2hhcGUgPSBuZXcgU2hhcGUoKVxyXG4gICAgICAubW92ZVRvKCBib3VuZHMubWluWCwgYm91bmRzLm1pblkgKVxyXG4gICAgICAubGluZVRvKCBib3VuZHMubWluWCwgYm91bmRzLm1heFkgKVxyXG4gICAgICAubGluZVRvKCBib3VuZHMubWF4WCwgYm91bmRzLm1heFkgKyB0cmlhbmdsZUhlaWdodCApXHJcbiAgICAgIC5saW5lVG8oIGJvdW5kcy5tYXhYLCBib3VuZHMubWluWSAtIHRyaWFuZ2xlSGVpZ2h0IClcclxuICAgICAgLmNsb3NlKCk7XHJcblxyXG4gICAgY29uc3QgbGVmdEhhbGYgPSBuZXcgUGF0aCggbGVmdEhhbGZTaGFwZSApO1xyXG4gICAgY29uc3QgcmlnaHRIYWxmID0gbmV3IFBhdGgoIHJpZ2h0SGFsZlNoYXBlICk7XHJcbiAgICBjb25zdCB3aG9sZUJlYW0gPSBuZXcgUGF0aCggd2hvbGVCZWFtU2hhcGUgKTtcclxuXHJcbiAgICBtb2RlbC5mbGFzaGxpZ2h0V2F2ZWxlbmd0aFByb3BlcnR5LmxpbmsoIHdhdmVsZW5ndGggPT4ge1xyXG4gICAgICBjb25zdCBuZXdDb2xvciA9IFZpc2libGVDb2xvci53YXZlbGVuZ3RoVG9Db2xvciggd2F2ZWxlbmd0aCApLndpdGhBbHBoYSggREVGQVVMVF9CRUFNX0FMUEhBICk7XHJcbiAgICAgIHJpZ2h0SGFsZi5maWxsID0gbmV3Q29sb3I7XHJcbiAgICAgIHdob2xlQmVhbS5maWxsID0gbmV3Q29sb3I7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgbW9kZWwuZmlsdGVyVmlzaWJsZVByb3BlcnR5LmxpbmsoIHZpc2libGUgPT4ge1xyXG4gICAgICAvLyB3aGVuIHRoZSBmaWx0ZXIgdHVybnMgb2ZmLCBtYWtlIHRoZSB3aG9sZSBiZWFtIHZpc2libGUgYW5kIHRoZSBoYWx2ZXMgaW52aXNpYmxlXHJcbiAgICAgIHdob2xlQmVhbS52aXNpYmxlID0gIXZpc2libGU7XHJcbiAgICAgIGxlZnRIYWxmLnZpc2libGUgPSB2aXNpYmxlO1xyXG4gICAgICByaWdodEhhbGYudmlzaWJsZSA9IHZpc2libGU7XHJcblxyXG4gICAgICBpZiAoIHdob2xlQmVhbS52aXNpYmxlICkge1xyXG4gICAgICAgIHdob2xlQmVhbS5maWxsID0gcmlnaHRIYWxmLmZpbGwud2l0aEFscGhhKCBERUZBVUxUX0JFQU1fQUxQSEEgKTtcclxuICAgICAgfVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIGxpc3RlbiBmb3IgYW55IGNoYW5nZXMgdG8gdGhlIG1vZGVsIHRoYXQgY29uZGl0aW9uIHdoZW4gdGhlIGJlYW0gc2hvdWxkIGJlIHdoaXRlLlxyXG4gICAgTXVsdGlsaW5rLm11bHRpbGluayggW1xyXG4gICAgICAgIG1vZGVsLmZsYXNobGlnaHRXYXZlbGVuZ3RoUHJvcGVydHksXHJcbiAgICAgICAgbW9kZWwuZmlsdGVyV2F2ZWxlbmd0aFByb3BlcnR5LFxyXG4gICAgICAgIG1vZGVsLmxpZ2h0VHlwZVByb3BlcnR5LFxyXG4gICAgICAgIG1vZGVsLmZpbHRlclZpc2libGVQcm9wZXJ0eSxcclxuICAgICAgICBtb2RlbC5iZWFtVHlwZVByb3BlcnR5XHJcbiAgICAgIF0sXHJcbiAgICAgICggZmxhc2hsaWdodFdhdmVsZW5ndGgsIGZpbHRlcldhdmVsZW5ndGgsIGxpZ2h0VHlwZSwgZmlsdGVyVmlzaWJsZSwgYmVhbU1vZGUgKSA9PiB7XHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBiZWFtIG9ubHkgaWYgaXQgaXMgdmlzaWJsZVxyXG4gICAgICAgIGlmICggYmVhbU1vZGUgPT09ICdiZWFtJyApIHtcclxuICAgICAgICAgIGlmICggbGlnaHRUeXBlID09PSAnd2hpdGUnICYmIGZpbHRlclZpc2libGUgKSB7XHJcbiAgICAgICAgICAgIGxlZnRIYWxmLmZpbGwgPSBWaXNpYmxlQ29sb3Iud2F2ZWxlbmd0aFRvQ29sb3IoIGZpbHRlcldhdmVsZW5ndGggKS53aXRoQWxwaGEoIERFRkFVTFRfQkVBTV9BTFBIQSApO1xyXG4gICAgICAgICAgICByaWdodEhhbGYuZmlsbCA9IFdISVRFX1dJVEhfQUxQSEE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIGlmICggbGlnaHRUeXBlID09PSAnd2hpdGUnICYmICFmaWx0ZXJWaXNpYmxlICkge1xyXG4gICAgICAgICAgICB3aG9sZUJlYW0uZmlsbCA9IFdISVRFX1dJVEhfQUxQSEE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIGlmICggbGlnaHRUeXBlID09PSAnY29sb3JlZCcgJiYgZmlsdGVyVmlzaWJsZSApIHtcclxuICAgICAgICAgICAgcmlnaHRIYWxmLmZpbGwgPSBWaXNpYmxlQ29sb3Iud2F2ZWxlbmd0aFRvQ29sb3IoIGZsYXNobGlnaHRXYXZlbGVuZ3RoICkud2l0aEFscGhhKCBERUZBVUxUX0JFQU1fQUxQSEEgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgaWYgKCBsaWdodFR5cGUgPT09ICdjb2xvcmVkJyAmJiAhZmlsdGVyVmlzaWJsZSApIHtcclxuICAgICAgICAgICAgd2hvbGVCZWFtLmZpbGwgPSBWaXNpYmxlQ29sb3Iud2F2ZWxlbmd0aFRvQ29sb3IoIGZsYXNobGlnaHRXYXZlbGVuZ3RoICkud2l0aEFscGhhKCBERUZBVUxUX0JFQU1fQUxQSEEgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gKTtcclxuXHJcbiAgICBjb25zdCB2aXNpYmxlUHJvcGVydHkgPSBuZXcgRGVyaXZlZFByb3BlcnR5KCBbIG1vZGVsLmZsYXNobGlnaHRPblByb3BlcnR5LCBtb2RlbC5iZWFtVHlwZVByb3BlcnR5IF0sXHJcbiAgICAgICggZmxhc2hsaWdodE9uLCBiZWFtVHlwZSApID0+IGZsYXNobGlnaHRPbiAmJiBiZWFtVHlwZSA9PT0gJ2JlYW0nICk7XHJcbiAgICB2aXNpYmxlUHJvcGVydHkubGlua0F0dHJpYnV0ZSggdGhpcywgJ3Zpc2libGUnICk7XHJcblxyXG4gICAgTXVsdGlsaW5rLm11bHRpbGluayggWyBtb2RlbC5wZXJjZWl2ZWRDb2xvclByb3BlcnR5LCB2aXNpYmxlUHJvcGVydHkgXSxcclxuICAgICAgKCBwZXJjZWl2ZWRDb2xvciwgdmlzaWJsZSApID0+IHtcclxuICAgICAgICBpZiAoIHZpc2libGUgKSB7XHJcbiAgICAgICAgICAvLyBzY2FsZSB0aGUgYWxwaGEgYmV0d2VlbiAwIGFuZCBERUZBVUxUX0JFQU1fQUxQSEEgaW5zdGVhZCBvZiAwIGFuZCAxIHNvIHRoZSBiZWFtIGFsd2F5cyByZXRhaW5zIHNvbWUgdHJhbnNwYXJlbmN5XHJcbiAgICAgICAgICBsZWZ0SGFsZi5maWxsID0gcGVyY2VpdmVkQ29sb3Iud2l0aEFscGhhKCBERUZBVUxUX0JFQU1fQUxQSEEgKiBwZXJjZWl2ZWRDb2xvci5hICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9ICk7XHJcblxyXG4gICAgdGhpcy5hZGRDaGlsZCggbGVmdEhhbGYgKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIHJpZ2h0SGFsZiApO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggd2hvbGVCZWFtICk7XHJcbiAgfVxyXG59XHJcblxyXG5jb2xvclZpc2lvbi5yZWdpc3RlciggJ1NvbGlkQmVhbU5vZGUnLCBTb2xpZEJlYW1Ob2RlICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTb2xpZEJlYW1Ob2RlOyJdLCJtYXBwaW5n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