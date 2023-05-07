// Copyright 2015-2022, University of Colorado Boulder

/**
 * Control for selecting surface color that appears in the Preferences dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MPConstants from '../MPConstants.js';
import optionize from '../../../../phet-core/js/optionize.js';
import SurfaceColorKey from './SurfaceColorKey.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import VerticalAquaRadioButtonGroup from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import PreferencesDialog from '../../../../joist/js/preferences/PreferencesDialog.js';
// constants
const COLOR_KEY_OPTIONS = {
  size: new Dimension2(150, 15),
  titleVisible: false,
  rangeFont: new PhetFont(8),
  xMargin: 0,
  ySpacing: 2,
  tandem: Tandem.OPT_OUT
};
export default class SurfaceColorControl extends VBox {
  constructor(surfaceColorProperty, providedOptions) {
    const options = optionize()({
      // VBoxOptions
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING
    }, providedOptions);
    const titleText = new Text(MoleculePolarityStrings.surfaceColorRealMoleculesStringProperty, {
      font: PreferencesDialog.CONTENT_FONT,
      maxWidth: 400,
      tandem: options.tandem.createTandem('titleText')
    });
    const radioButtonGroup = new SurfaceColorRadioButtonGroup(surfaceColorProperty, {
      tandem: options.tandem.createTandem('radioButtonGroup')
    });
    options.children = [titleText, radioButtonGroup];
    super(options);
    this.disposeSurfaceColorControl = () => {
      titleText.dispose();
      radioButtonGroup.dispose();
    };
  }
  dispose() {
    this.disposeSurfaceColorControl();
    super.dispose();
  }
}

/**
 * SurfaceColorRadioButtonGroup is the radio button group for choosing a color for the molecule surface.
 */

class SurfaceColorRadioButtonGroup extends VerticalAquaRadioButtonGroup {
  constructor(surfaceColorProperty, providedOptions) {
    const options = optionize()({
      // VerticalAquaRadioButtonGroupOptions
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS
    }, providedOptions);
    const radioButtonGroupItems = [{
      value: 'RWB',
      createNode: tandem => SurfaceColorKey.createElectrostaticPotentialRWBColorKey(COLOR_KEY_OPTIONS),
      tandemName: 'RWBRadioButton'
    }, {
      value: 'ROYGB',
      createNode: tandem => SurfaceColorKey.createElectrostaticPotentialROYGBColorKey(COLOR_KEY_OPTIONS),
      tandemName: 'ROYGBRadioButton'
    }];
    super(surfaceColorProperty, radioButtonGroupItems, options);
  }
}
moleculePolarity.register('SurfaceColorControl', SurfaceColorControl);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQaGV0Rm9udCIsIlRleHQiLCJWQm94IiwibW9sZWN1bGVQb2xhcml0eSIsIk1vbGVjdWxlUG9sYXJpdHlTdHJpbmdzIiwiTVBDb25zdGFudHMiLCJvcHRpb25pemUiLCJTdXJmYWNlQ29sb3JLZXkiLCJEaW1lbnNpb24yIiwiVGFuZGVtIiwiVmVydGljYWxBcXVhUmFkaW9CdXR0b25Hcm91cCIsIlByZWZlcmVuY2VzRGlhbG9nIiwiQ09MT1JfS0VZX09QVElPTlMiLCJzaXplIiwidGl0bGVWaXNpYmxlIiwicmFuZ2VGb250IiwieE1hcmdpbiIsInlTcGFjaW5nIiwidGFuZGVtIiwiT1BUX09VVCIsIlN1cmZhY2VDb2xvckNvbnRyb2wiLCJjb25zdHJ1Y3RvciIsInN1cmZhY2VDb2xvclByb3BlcnR5IiwicHJvdmlkZWRPcHRpb25zIiwib3B0aW9ucyIsImFsaWduIiwic3BhY2luZyIsIkNPTlRST0xfUEFORUxfWV9TUEFDSU5HIiwidGl0bGVUZXh0Iiwic3VyZmFjZUNvbG9yUmVhbE1vbGVjdWxlc1N0cmluZ1Byb3BlcnR5IiwiZm9udCIsIkNPTlRFTlRfRk9OVCIsIm1heFdpZHRoIiwiY3JlYXRlVGFuZGVtIiwicmFkaW9CdXR0b25Hcm91cCIsIlN1cmZhY2VDb2xvclJhZGlvQnV0dG9uR3JvdXAiLCJjaGlsZHJlbiIsImRpc3Bvc2VTdXJmYWNlQ29sb3JDb250cm9sIiwiZGlzcG9zZSIsInJhZGlvQnV0dG9uT3B0aW9ucyIsIkFRVUFfUkFESU9fQlVUVE9OX09QVElPTlMiLCJyYWRpb0J1dHRvbkdyb3VwSXRlbXMiLCJ2YWx1ZSIsImNyZWF0ZU5vZGUiLCJjcmVhdGVFbGVjdHJvc3RhdGljUG90ZW50aWFsUldCQ29sb3JLZXkiLCJ0YW5kZW1OYW1lIiwiY3JlYXRlRWxlY3Ryb3N0YXRpY1BvdGVudGlhbFJPWUdCQ29sb3JLZXkiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlN1cmZhY2VDb2xvckNvbnRyb2wudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTUtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogQ29udHJvbCBmb3Igc2VsZWN0aW5nIHN1cmZhY2UgY29sb3IgdGhhdCBhcHBlYXJzIGluIHRoZSBQcmVmZXJlbmNlcyBkaWFsb2cuXHJcbiAqXHJcbiAqIEBhdXRob3IgQ2hyaXMgTWFsbGV5IChQaXhlbFpvb20sIEluYy4pXHJcbiAqL1xyXG5cclxuaW1wb3J0IFBoZXRGb250IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnktcGhldC9qcy9QaGV0Rm9udC5qcyc7XHJcbmltcG9ydCB7IFRleHQsIFZCb3gsIFZCb3hPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IG1vbGVjdWxlUG9sYXJpdHkgZnJvbSAnLi4vLi4vbW9sZWN1bGVQb2xhcml0eS5qcyc7XHJcbmltcG9ydCBNb2xlY3VsZVBvbGFyaXR5U3RyaW5ncyBmcm9tICcuLi8uLi9Nb2xlY3VsZVBvbGFyaXR5U3RyaW5ncy5qcyc7XHJcbmltcG9ydCBNUENvbnN0YW50cyBmcm9tICcuLi9NUENvbnN0YW50cy5qcyc7XHJcbmltcG9ydCB7IFN1cmZhY2VDb2xvciB9IGZyb20gJy4uL21vZGVsL1N1cmZhY2VDb2xvci5qcyc7XHJcbmltcG9ydCBTdHJpbmdVbmlvblByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvU3RyaW5nVW5pb25Qcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBQaWNrUmVxdWlyZWQgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL3R5cGVzL1BpY2tSZXF1aXJlZC5qcyc7XHJcbmltcG9ydCBvcHRpb25pemUsIHsgRW1wdHlTZWxmT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9vcHRpb25pemUuanMnO1xyXG5pbXBvcnQgU3VyZmFjZUNvbG9yS2V5IGZyb20gJy4vU3VyZmFjZUNvbG9yS2V5LmpzJztcclxuaW1wb3J0IERpbWVuc2lvbjIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL0RpbWVuc2lvbjIuanMnO1xyXG5pbXBvcnQgVGFuZGVtIGZyb20gJy4uLy4uLy4uLy4uL3RhbmRlbS9qcy9UYW5kZW0uanMnO1xyXG5pbXBvcnQgVmVydGljYWxBcXVhUmFkaW9CdXR0b25Hcm91cCwgeyBWZXJ0aWNhbEFxdWFSYWRpb0J1dHRvbkdyb3VwT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3N1bi9qcy9WZXJ0aWNhbEFxdWFSYWRpb0J1dHRvbkdyb3VwLmpzJztcclxuaW1wb3J0IFByZWZlcmVuY2VzRGlhbG9nIGZyb20gJy4uLy4uLy4uLy4uL2pvaXN0L2pzL3ByZWZlcmVuY2VzL1ByZWZlcmVuY2VzRGlhbG9nLmpzJztcclxuaW1wb3J0IHsgQXF1YVJhZGlvQnV0dG9uR3JvdXBJdGVtIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3VuL2pzL0FxdWFSYWRpb0J1dHRvbkdyb3VwLmpzJztcclxuXHJcbi8vIGNvbnN0YW50c1xyXG5jb25zdCBDT0xPUl9LRVlfT1BUSU9OUyA9IHtcclxuICBzaXplOiBuZXcgRGltZW5zaW9uMiggMTUwLCAxNSApLFxyXG4gIHRpdGxlVmlzaWJsZTogZmFsc2UsXHJcbiAgcmFuZ2VGb250OiBuZXcgUGhldEZvbnQoIDggKSxcclxuICB4TWFyZ2luOiAwLFxyXG4gIHlTcGFjaW5nOiAyLFxyXG4gIHRhbmRlbTogVGFuZGVtLk9QVF9PVVRcclxufTtcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSBFbXB0eVNlbGZPcHRpb25zO1xyXG5cclxudHlwZSBTdXJmYWNlQ29sb3JDb250cm9sT3B0aW9ucyA9IFNlbGZPcHRpb25zICYgUGlja1JlcXVpcmVkPFZCb3hPcHRpb25zLCAndGFuZGVtJz47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXJmYWNlQ29sb3JDb250cm9sIGV4dGVuZHMgVkJveCB7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgZGlzcG9zZVN1cmZhY2VDb2xvckNvbnRyb2w6ICgpID0+IHZvaWQ7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvciggc3VyZmFjZUNvbG9yUHJvcGVydHk6IFN0cmluZ1VuaW9uUHJvcGVydHk8U3VyZmFjZUNvbG9yPixcclxuICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVkT3B0aW9uczogU3VyZmFjZUNvbG9yQ29udHJvbE9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxTdXJmYWNlQ29sb3JDb250cm9sT3B0aW9ucywgU2VsZk9wdGlvbnMsIFZCb3hPcHRpb25zPigpKCB7XHJcblxyXG4gICAgICAvLyBWQm94T3B0aW9uc1xyXG4gICAgICBhbGlnbjogJ2xlZnQnLFxyXG4gICAgICBzcGFjaW5nOiBNUENvbnN0YW50cy5DT05UUk9MX1BBTkVMX1lfU1BBQ0lOR1xyXG4gICAgfSwgcHJvdmlkZWRPcHRpb25zICk7XHJcblxyXG4gICAgY29uc3QgdGl0bGVUZXh0ID0gbmV3IFRleHQoIE1vbGVjdWxlUG9sYXJpdHlTdHJpbmdzLnN1cmZhY2VDb2xvclJlYWxNb2xlY3VsZXNTdHJpbmdQcm9wZXJ0eSwge1xyXG4gICAgICBmb250OiBQcmVmZXJlbmNlc0RpYWxvZy5DT05URU5UX0ZPTlQsXHJcbiAgICAgIG1heFdpZHRoOiA0MDAsXHJcbiAgICAgIHRhbmRlbTogb3B0aW9ucy50YW5kZW0uY3JlYXRlVGFuZGVtKCAndGl0bGVUZXh0JyApXHJcbiAgICB9ICk7XHJcblxyXG4gICAgY29uc3QgcmFkaW9CdXR0b25Hcm91cCA9IG5ldyBTdXJmYWNlQ29sb3JSYWRpb0J1dHRvbkdyb3VwKCBzdXJmYWNlQ29sb3JQcm9wZXJ0eSwge1xyXG4gICAgICB0YW5kZW06IG9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3JhZGlvQnV0dG9uR3JvdXAnIClcclxuICAgIH0gKTtcclxuXHJcbiAgICBvcHRpb25zLmNoaWxkcmVuID0gWyB0aXRsZVRleHQsIHJhZGlvQnV0dG9uR3JvdXAgXTtcclxuXHJcbiAgICBzdXBlciggb3B0aW9ucyApO1xyXG5cclxuICAgIHRoaXMuZGlzcG9zZVN1cmZhY2VDb2xvckNvbnRyb2wgPSAoKSA9PiB7XHJcbiAgICAgIHRpdGxlVGV4dC5kaXNwb3NlKCk7XHJcbiAgICAgIHJhZGlvQnV0dG9uR3JvdXAuZGlzcG9zZSgpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvdmVycmlkZSBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kaXNwb3NlU3VyZmFjZUNvbG9yQ29udHJvbCgpO1xyXG4gICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFN1cmZhY2VDb2xvclJhZGlvQnV0dG9uR3JvdXAgaXMgdGhlIHJhZGlvIGJ1dHRvbiBncm91cCBmb3IgY2hvb3NpbmcgYSBjb2xvciBmb3IgdGhlIG1vbGVjdWxlIHN1cmZhY2UuXHJcbiAqL1xyXG5cclxudHlwZSBTdXJmYWNlQ29sb3JSYWRpb0J1dHRvbkdyb3VwU2VsZk9wdGlvbnMgPSBFbXB0eVNlbGZPcHRpb25zO1xyXG5cclxudHlwZSBTdXJmYWNlQ29sb3JSYWRpb0J1dHRvbkdyb3VwT3B0aW9ucyA9IFNlbGZPcHRpb25zICYgUGlja1JlcXVpcmVkPFZlcnRpY2FsQXF1YVJhZGlvQnV0dG9uR3JvdXBPcHRpb25zLCAndGFuZGVtJz47XHJcblxyXG5jbGFzcyBTdXJmYWNlQ29sb3JSYWRpb0J1dHRvbkdyb3VwIGV4dGVuZHMgVmVydGljYWxBcXVhUmFkaW9CdXR0b25Hcm91cDxTdXJmYWNlQ29sb3I+IHtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBzdXJmYWNlQ29sb3JQcm9wZXJ0eTogU3RyaW5nVW5pb25Qcm9wZXJ0eTxTdXJmYWNlQ29sb3I+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZWRPcHRpb25zOiBTdXJmYWNlQ29sb3JSYWRpb0J1dHRvbkdyb3VwT3B0aW9ucyApIHtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0gb3B0aW9uaXplPFN1cmZhY2VDb2xvclJhZGlvQnV0dG9uR3JvdXBPcHRpb25zLCBTdXJmYWNlQ29sb3JSYWRpb0J1dHRvbkdyb3VwU2VsZk9wdGlvbnMsIFZlcnRpY2FsQXF1YVJhZGlvQnV0dG9uR3JvdXBPcHRpb25zPigpKCB7XHJcblxyXG4gICAgICAvLyBWZXJ0aWNhbEFxdWFSYWRpb0J1dHRvbkdyb3VwT3B0aW9uc1xyXG4gICAgICBzcGFjaW5nOiBNUENvbnN0YW50cy5DT05UUk9MX1BBTkVMX1lfU1BBQ0lORyxcclxuICAgICAgcmFkaW9CdXR0b25PcHRpb25zOiBNUENvbnN0YW50cy5BUVVBX1JBRElPX0JVVFRPTl9PUFRJT05TXHJcbiAgICB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICBjb25zdCByYWRpb0J1dHRvbkdyb3VwSXRlbXM6IEFxdWFSYWRpb0J1dHRvbkdyb3VwSXRlbTxTdXJmYWNlQ29sb3I+W10gPSBbXHJcbiAgICAgIHtcclxuICAgICAgICB2YWx1ZTogJ1JXQicsXHJcbiAgICAgICAgY3JlYXRlTm9kZTogKCB0YW5kZW06IFRhbmRlbSApID0+IFN1cmZhY2VDb2xvcktleS5jcmVhdGVFbGVjdHJvc3RhdGljUG90ZW50aWFsUldCQ29sb3JLZXkoIENPTE9SX0tFWV9PUFRJT05TICksXHJcbiAgICAgICAgdGFuZGVtTmFtZTogJ1JXQlJhZGlvQnV0dG9uJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdmFsdWU6ICdST1lHQicsXHJcbiAgICAgICAgY3JlYXRlTm9kZTogKCB0YW5kZW06IFRhbmRlbSApID0+IFN1cmZhY2VDb2xvcktleS5jcmVhdGVFbGVjdHJvc3RhdGljUG90ZW50aWFsUk9ZR0JDb2xvcktleSggQ09MT1JfS0VZX09QVElPTlMgKSxcclxuICAgICAgICB0YW5kZW1OYW1lOiAnUk9ZR0JSYWRpb0J1dHRvbidcclxuICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICBzdXBlciggc3VyZmFjZUNvbG9yUHJvcGVydHksIHJhZGlvQnV0dG9uR3JvdXBJdGVtcywgb3B0aW9ucyApO1xyXG4gIH1cclxufVxyXG5cclxubW9sZWN1bGVQb2xhcml0eS5yZWdpc3RlciggJ1N1cmZhY2VDb2xvckNvbnRyb2wnLCBTdXJmYWNlQ29sb3JDb250cm9sICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFFBQVEsTUFBTSx5Q0FBeUM7QUFDOUQsU0FBU0MsSUFBSSxFQUFFQyxJQUFJLFFBQXFCLG1DQUFtQztBQUMzRSxPQUFPQyxnQkFBZ0IsTUFBTSwyQkFBMkI7QUFDeEQsT0FBT0MsdUJBQXVCLE1BQU0sa0NBQWtDO0FBQ3RFLE9BQU9DLFdBQVcsTUFBTSxtQkFBbUI7QUFJM0MsT0FBT0MsU0FBUyxNQUE0Qix1Q0FBdUM7QUFDbkYsT0FBT0MsZUFBZSxNQUFNLHNCQUFzQjtBQUNsRCxPQUFPQyxVQUFVLE1BQU0sa0NBQWtDO0FBQ3pELE9BQU9DLE1BQU0sTUFBTSxpQ0FBaUM7QUFDcEQsT0FBT0MsNEJBQTRCLE1BQStDLG9EQUFvRDtBQUN0SSxPQUFPQyxpQkFBaUIsTUFBTSx1REFBdUQ7QUFHckY7QUFDQSxNQUFNQyxpQkFBaUIsR0FBRztFQUN4QkMsSUFBSSxFQUFFLElBQUlMLFVBQVUsQ0FBRSxHQUFHLEVBQUUsRUFBRyxDQUFDO0VBQy9CTSxZQUFZLEVBQUUsS0FBSztFQUNuQkMsU0FBUyxFQUFFLElBQUlmLFFBQVEsQ0FBRSxDQUFFLENBQUM7RUFDNUJnQixPQUFPLEVBQUUsQ0FBQztFQUNWQyxRQUFRLEVBQUUsQ0FBQztFQUNYQyxNQUFNLEVBQUVULE1BQU0sQ0FBQ1U7QUFDakIsQ0FBQztBQU1ELGVBQWUsTUFBTUMsbUJBQW1CLFNBQVNsQixJQUFJLENBQUM7RUFJN0NtQixXQUFXQSxDQUFFQyxvQkFBdUQsRUFDdkRDLGVBQTJDLEVBQUc7SUFFaEUsTUFBTUMsT0FBTyxHQUFHbEIsU0FBUyxDQUF1RCxDQUFDLENBQUU7TUFFakY7TUFDQW1CLEtBQUssRUFBRSxNQUFNO01BQ2JDLE9BQU8sRUFBRXJCLFdBQVcsQ0FBQ3NCO0lBQ3ZCLENBQUMsRUFBRUosZUFBZ0IsQ0FBQztJQUVwQixNQUFNSyxTQUFTLEdBQUcsSUFBSTNCLElBQUksQ0FBRUcsdUJBQXVCLENBQUN5Qix1Q0FBdUMsRUFBRTtNQUMzRkMsSUFBSSxFQUFFbkIsaUJBQWlCLENBQUNvQixZQUFZO01BQ3BDQyxRQUFRLEVBQUUsR0FBRztNQUNiZCxNQUFNLEVBQUVNLE9BQU8sQ0FBQ04sTUFBTSxDQUFDZSxZQUFZLENBQUUsV0FBWTtJQUNuRCxDQUFFLENBQUM7SUFFSCxNQUFNQyxnQkFBZ0IsR0FBRyxJQUFJQyw0QkFBNEIsQ0FBRWIsb0JBQW9CLEVBQUU7TUFDL0VKLE1BQU0sRUFBRU0sT0FBTyxDQUFDTixNQUFNLENBQUNlLFlBQVksQ0FBRSxrQkFBbUI7SUFDMUQsQ0FBRSxDQUFDO0lBRUhULE9BQU8sQ0FBQ1ksUUFBUSxHQUFHLENBQUVSLFNBQVMsRUFBRU0sZ0JBQWdCLENBQUU7SUFFbEQsS0FBSyxDQUFFVixPQUFRLENBQUM7SUFFaEIsSUFBSSxDQUFDYSwwQkFBMEIsR0FBRyxNQUFNO01BQ3RDVCxTQUFTLENBQUNVLE9BQU8sQ0FBQyxDQUFDO01BQ25CSixnQkFBZ0IsQ0FBQ0ksT0FBTyxDQUFDLENBQUM7SUFDNUIsQ0FBQztFQUNIO0VBRWdCQSxPQUFPQSxDQUFBLEVBQVM7SUFDOUIsSUFBSSxDQUFDRCwwQkFBMEIsQ0FBQyxDQUFDO0lBQ2pDLEtBQUssQ0FBQ0MsT0FBTyxDQUFDLENBQUM7RUFDakI7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7O0FBTUEsTUFBTUgsNEJBQTRCLFNBQVN6Qiw0QkFBNEIsQ0FBZTtFQUU3RVcsV0FBV0EsQ0FBRUMsb0JBQXVELEVBQ3ZEQyxlQUFvRCxFQUFHO0lBRXpFLE1BQU1DLE9BQU8sR0FBR2xCLFNBQVMsQ0FBb0gsQ0FBQyxDQUFFO01BRTlJO01BQ0FvQixPQUFPLEVBQUVyQixXQUFXLENBQUNzQix1QkFBdUI7TUFDNUNZLGtCQUFrQixFQUFFbEMsV0FBVyxDQUFDbUM7SUFDbEMsQ0FBQyxFQUFFakIsZUFBZ0IsQ0FBQztJQUVwQixNQUFNa0IscUJBQStELEdBQUcsQ0FDdEU7TUFDRUMsS0FBSyxFQUFFLEtBQUs7TUFDWkMsVUFBVSxFQUFJekIsTUFBYyxJQUFNWCxlQUFlLENBQUNxQyx1Q0FBdUMsQ0FBRWhDLGlCQUFrQixDQUFDO01BQzlHaUMsVUFBVSxFQUFFO0lBQ2QsQ0FBQyxFQUNEO01BQ0VILEtBQUssRUFBRSxPQUFPO01BQ2RDLFVBQVUsRUFBSXpCLE1BQWMsSUFBTVgsZUFBZSxDQUFDdUMseUNBQXlDLENBQUVsQyxpQkFBa0IsQ0FBQztNQUNoSGlDLFVBQVUsRUFBRTtJQUNkLENBQUMsQ0FDRjtJQUVELEtBQUssQ0FBRXZCLG9CQUFvQixFQUFFbUIscUJBQXFCLEVBQUVqQixPQUFRLENBQUM7RUFDL0Q7QUFDRjtBQUVBckIsZ0JBQWdCLENBQUM0QyxRQUFRLENBQUUscUJBQXFCLEVBQUUzQixtQkFBb0IsQ0FBQyJ9