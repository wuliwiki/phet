// Copyright 2014-2022, University of Colorado Boulder

/**
 * Panel with slider control for electronegativity.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import ElectronegativitySlider from './ElectronegativitySlider.js';
export default class ElectronegativityPanel extends Panel {
  /**
   * @param atom - the atom whose electronegativity we're controlling
   * @param molecule - molecule that the atom belongs to, for pausing animation while this control is used
   * @param [providedOptions]
   */
  constructor(atom, molecule, providedOptions) {
    const options = optionize()({
      // PanelOptions
      fill: atom.color,
      stroke: 'black',
      xMargin: 15,
      yMargin: 6
    }, providedOptions);
    const titleTextTandem = options.tandem.createTandem('titleText');
    const titleStringProperty = new PatternStringProperty(MoleculePolarityStrings.pattern.atomNameStringProperty, {
      name: atom.labelStringProperty
    }, {
      tandem: titleTextTandem.createTandem(Text.STRING_PROPERTY_TANDEM_NAME),
      phetioValueType: StringIO
    });

    // title
    const titleText = new Text(titleStringProperty, {
      font: new PhetFont({
        size: 20,
        weight: 'bold'
      }),
      maxWidth: 150,
      tandem: titleTextTandem
    });

    // subtitle
    const subtitleText = new Text(MoleculePolarityStrings.electronegativityStringProperty, {
      font: new PhetFont(18),
      maxWidth: titleText.maxWidth,
      tandem: options.tandem.createTandem('subtitleText')
    });
    const titleVBox = new VBox({
      children: [titleText, subtitleText],
      spacing: 0
    });

    // slider
    const slider = new ElectronegativitySlider(molecule, atom, {
      tandem: options.tandem.createTandem('slider')
    });
    const content = new VBox({
      children: [titleVBox, slider],
      spacing: 8
    });
    super(content, options);
  }
  dispose() {
    assert && assert(false, 'dispose is not supported, exists for the lifetime of the sim');
    super.dispose();
  }
}
moleculePolarity.register('ElectronegativityPanel', ElectronegativityPanel);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQYXR0ZXJuU3RyaW5nUHJvcGVydHkiLCJvcHRpb25pemUiLCJQaGV0Rm9udCIsIlRleHQiLCJWQm94IiwiUGFuZWwiLCJTdHJpbmdJTyIsIm1vbGVjdWxlUG9sYXJpdHkiLCJNb2xlY3VsZVBvbGFyaXR5U3RyaW5ncyIsIkVsZWN0cm9uZWdhdGl2aXR5U2xpZGVyIiwiRWxlY3Ryb25lZ2F0aXZpdHlQYW5lbCIsImNvbnN0cnVjdG9yIiwiYXRvbSIsIm1vbGVjdWxlIiwicHJvdmlkZWRPcHRpb25zIiwib3B0aW9ucyIsImZpbGwiLCJjb2xvciIsInN0cm9rZSIsInhNYXJnaW4iLCJ5TWFyZ2luIiwidGl0bGVUZXh0VGFuZGVtIiwidGFuZGVtIiwiY3JlYXRlVGFuZGVtIiwidGl0bGVTdHJpbmdQcm9wZXJ0eSIsInBhdHRlcm4iLCJhdG9tTmFtZVN0cmluZ1Byb3BlcnR5IiwibmFtZSIsImxhYmVsU3RyaW5nUHJvcGVydHkiLCJTVFJJTkdfUFJPUEVSVFlfVEFOREVNX05BTUUiLCJwaGV0aW9WYWx1ZVR5cGUiLCJ0aXRsZVRleHQiLCJmb250Iiwic2l6ZSIsIndlaWdodCIsIm1heFdpZHRoIiwic3VidGl0bGVUZXh0IiwiZWxlY3Ryb25lZ2F0aXZpdHlTdHJpbmdQcm9wZXJ0eSIsInRpdGxlVkJveCIsImNoaWxkcmVuIiwic3BhY2luZyIsInNsaWRlciIsImNvbnRlbnQiLCJkaXNwb3NlIiwiYXNzZXJ0IiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJFbGVjdHJvbmVnYXRpdml0eVBhbmVsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE0LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFBhbmVsIHdpdGggc2xpZGVyIGNvbnRyb2wgZm9yIGVsZWN0cm9uZWdhdGl2aXR5LlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKi9cclxuXHJcbmltcG9ydCBQYXR0ZXJuU3RyaW5nUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9QYXR0ZXJuU3RyaW5nUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgb3B0aW9uaXplLCB7IEVtcHR5U2VsZk9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvb3B0aW9uaXplLmpzJztcclxuaW1wb3J0IFBpY2tSZXF1aXJlZCBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvdHlwZXMvUGlja1JlcXVpcmVkLmpzJztcclxuaW1wb3J0IFBoZXRGb250IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnktcGhldC9qcy9QaGV0Rm9udC5qcyc7XHJcbmltcG9ydCB7IFRleHQsIFZCb3ggfSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgUGFuZWwsIHsgUGFuZWxPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3VuL2pzL1BhbmVsLmpzJztcclxuaW1wb3J0IFN0cmluZ0lPIGZyb20gJy4uLy4uLy4uLy4uL3RhbmRlbS9qcy90eXBlcy9TdHJpbmdJTy5qcyc7XHJcbmltcG9ydCBtb2xlY3VsZVBvbGFyaXR5IGZyb20gJy4uLy4uL21vbGVjdWxlUG9sYXJpdHkuanMnO1xyXG5pbXBvcnQgTW9sZWN1bGVQb2xhcml0eVN0cmluZ3MgZnJvbSAnLi4vLi4vTW9sZWN1bGVQb2xhcml0eVN0cmluZ3MuanMnO1xyXG5pbXBvcnQgQXRvbSBmcm9tICcuLi9tb2RlbC9BdG9tLmpzJztcclxuaW1wb3J0IE1vbGVjdWxlIGZyb20gJy4uL21vZGVsL01vbGVjdWxlLmpzJztcclxuaW1wb3J0IEVsZWN0cm9uZWdhdGl2aXR5U2xpZGVyIGZyb20gJy4vRWxlY3Ryb25lZ2F0aXZpdHlTbGlkZXIuanMnO1xyXG5cclxudHlwZSBTZWxmT3B0aW9ucyA9IEVtcHR5U2VsZk9wdGlvbnM7XHJcblxyXG50eXBlIEVsZWN0cm9uZWdhdGl2aXR5UGFuZWxPcHRpb25zID0gU2VsZk9wdGlvbnMgJiBQaWNrUmVxdWlyZWQ8UGFuZWxPcHRpb25zLCAndGFuZGVtJz47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVjdHJvbmVnYXRpdml0eVBhbmVsIGV4dGVuZHMgUGFuZWwge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gYXRvbSAtIHRoZSBhdG9tIHdob3NlIGVsZWN0cm9uZWdhdGl2aXR5IHdlJ3JlIGNvbnRyb2xsaW5nXHJcbiAgICogQHBhcmFtIG1vbGVjdWxlIC0gbW9sZWN1bGUgdGhhdCB0aGUgYXRvbSBiZWxvbmdzIHRvLCBmb3IgcGF1c2luZyBhbmltYXRpb24gd2hpbGUgdGhpcyBjb250cm9sIGlzIHVzZWRcclxuICAgKiBAcGFyYW0gW3Byb3ZpZGVkT3B0aW9uc11cclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIGF0b206IEF0b20sIG1vbGVjdWxlOiBNb2xlY3VsZSwgcHJvdmlkZWRPcHRpb25zOiBFbGVjdHJvbmVnYXRpdml0eVBhbmVsT3B0aW9ucyApIHtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0gb3B0aW9uaXplPEVsZWN0cm9uZWdhdGl2aXR5UGFuZWxPcHRpb25zLCBTZWxmT3B0aW9ucywgUGFuZWxPcHRpb25zPigpKCB7XHJcblxyXG4gICAgICAvLyBQYW5lbE9wdGlvbnNcclxuICAgICAgZmlsbDogYXRvbS5jb2xvcixcclxuICAgICAgc3Ryb2tlOiAnYmxhY2snLFxyXG4gICAgICB4TWFyZ2luOiAxNSxcclxuICAgICAgeU1hcmdpbjogNlxyXG4gICAgfSwgcHJvdmlkZWRPcHRpb25zICk7XHJcblxyXG4gICAgY29uc3QgdGl0bGVUZXh0VGFuZGVtID0gb3B0aW9ucy50YW5kZW0uY3JlYXRlVGFuZGVtKCAndGl0bGVUZXh0JyApO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlU3RyaW5nUHJvcGVydHkgPSBuZXcgUGF0dGVyblN0cmluZ1Byb3BlcnR5KCBNb2xlY3VsZVBvbGFyaXR5U3RyaW5ncy5wYXR0ZXJuLmF0b21OYW1lU3RyaW5nUHJvcGVydHksIHtcclxuICAgICAgbmFtZTogYXRvbS5sYWJlbFN0cmluZ1Byb3BlcnR5XHJcbiAgICB9LCB7XHJcbiAgICAgIHRhbmRlbTogdGl0bGVUZXh0VGFuZGVtLmNyZWF0ZVRhbmRlbSggVGV4dC5TVFJJTkdfUFJPUEVSVFlfVEFOREVNX05BTUUgKSxcclxuICAgICAgcGhldGlvVmFsdWVUeXBlOiBTdHJpbmdJT1xyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIHRpdGxlXHJcbiAgICBjb25zdCB0aXRsZVRleHQgPSBuZXcgVGV4dCggdGl0bGVTdHJpbmdQcm9wZXJ0eSwge1xyXG4gICAgICBmb250OiBuZXcgUGhldEZvbnQoIHsgc2l6ZTogMjAsIHdlaWdodDogJ2JvbGQnIH0gKSxcclxuICAgICAgbWF4V2lkdGg6IDE1MCxcclxuICAgICAgdGFuZGVtOiB0aXRsZVRleHRUYW5kZW1cclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBzdWJ0aXRsZVxyXG4gICAgY29uc3Qgc3VidGl0bGVUZXh0ID0gbmV3IFRleHQoIE1vbGVjdWxlUG9sYXJpdHlTdHJpbmdzLmVsZWN0cm9uZWdhdGl2aXR5U3RyaW5nUHJvcGVydHksIHtcclxuICAgICAgZm9udDogbmV3IFBoZXRGb250KCAxOCApLFxyXG4gICAgICBtYXhXaWR0aDogdGl0bGVUZXh0Lm1heFdpZHRoLFxyXG4gICAgICB0YW5kZW06IG9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3N1YnRpdGxlVGV4dCcgKVxyXG4gICAgfSApO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlVkJveCA9IG5ldyBWQm94KCB7XHJcbiAgICAgIGNoaWxkcmVuOiBbIHRpdGxlVGV4dCwgc3VidGl0bGVUZXh0IF0sXHJcbiAgICAgIHNwYWNpbmc6IDBcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBzbGlkZXJcclxuICAgIGNvbnN0IHNsaWRlciA9IG5ldyBFbGVjdHJvbmVnYXRpdml0eVNsaWRlciggbW9sZWN1bGUsIGF0b20sIHtcclxuICAgICAgdGFuZGVtOiBvcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdzbGlkZXInIClcclxuICAgIH0gKTtcclxuXHJcbiAgICBjb25zdCBjb250ZW50ID0gbmV3IFZCb3goIHtcclxuICAgICAgY2hpbGRyZW46IFsgdGl0bGVWQm94LCBzbGlkZXIgXSxcclxuICAgICAgc3BhY2luZzogOFxyXG4gICAgfSApO1xyXG5cclxuICAgIHN1cGVyKCBjb250ZW50LCBvcHRpb25zICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3ZlcnJpZGUgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIGZhbHNlLCAnZGlzcG9zZSBpcyBub3Qgc3VwcG9ydGVkLCBleGlzdHMgZm9yIHRoZSBsaWZldGltZSBvZiB0aGUgc2ltJyApO1xyXG4gICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxubW9sZWN1bGVQb2xhcml0eS5yZWdpc3RlciggJ0VsZWN0cm9uZWdhdGl2aXR5UGFuZWwnLCBFbGVjdHJvbmVnYXRpdml0eVBhbmVsICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLHFCQUFxQixNQUFNLDhDQUE4QztBQUNoRixPQUFPQyxTQUFTLE1BQTRCLHVDQUF1QztBQUVuRixPQUFPQyxRQUFRLE1BQU0seUNBQXlDO0FBQzlELFNBQVNDLElBQUksRUFBRUMsSUFBSSxRQUFRLG1DQUFtQztBQUM5RCxPQUFPQyxLQUFLLE1BQXdCLDZCQUE2QjtBQUNqRSxPQUFPQyxRQUFRLE1BQU0seUNBQXlDO0FBQzlELE9BQU9DLGdCQUFnQixNQUFNLDJCQUEyQjtBQUN4RCxPQUFPQyx1QkFBdUIsTUFBTSxrQ0FBa0M7QUFHdEUsT0FBT0MsdUJBQXVCLE1BQU0sOEJBQThCO0FBTWxFLGVBQWUsTUFBTUMsc0JBQXNCLFNBQVNMLEtBQUssQ0FBQztFQUV4RDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBQ1NNLFdBQVdBLENBQUVDLElBQVUs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