// Copyright 2016-2023, University of Colorado Boulder

/**
 * The button that pops up the Keyboard Help Dialog, which appears in the right side of the navbar and
 * to the left of the PhetButton.
 *
 * @author Jesse Greenberg
 */

import optionize from '../../phet-core/js/optionize.js';
import { Color, Image } from '../../scenery/js/imports.js';
import Dialog from '../../sun/js/Dialog.js';
import PhetioCapsule from '../../tandem/js/PhetioCapsule.js';
import keyboardIconOnWhite_png from '../images/keyboardIconOnWhite_png.js'; // on a white navbar
import keyboardIcon_png from '../images/keyboardIcon_png.js'; // on a black navbar
import joist from './joist.js';
import JoistButton from './JoistButton.js';
import JoistStrings from './JoistStrings.js';
import KeyboardHelpDialog from './KeyboardHelpDialog.js';
// constants
const keyboardShortcutsStringProperty = JoistStrings.a11y.keyboardHelp.keyboardShortcutsStringProperty;
const ICON_DESIRED_HEIGHT = 17.085; // empirically determined

class KeyboardHelpButton extends JoistButton {
  constructor(screens, screenProperty, backgroundColorProperty, providedOptions) {
    const options = optionize()({
      highlightExtensionWidth: 5 + 3.6,
      highlightExtensionHeight: 10,
      // The keyboard button is not vertically symmetric, due to the cable on the top.
      // This offset adjusts the body of the keyboard to be in the center, so it
      // will align with the speaker button and the PhET logo
      highlightCenterOffsetY: 2,
      // phet-io
      visiblePropertyOptions: {
        phetioFeatured: true
      },
      // pdom
      innerContent: keyboardShortcutsStringProperty,
      // voicing
      voicingNameResponse: keyboardShortcutsStringProperty
    }, providedOptions);
    let keyboardHelpDialogCapsule = null; // set after calling super
    options.listener = () => {
      assert && assert(keyboardHelpDialogCapsule);
      const keyboardHelpDialog = keyboardHelpDialogCapsule.getElement();
      keyboardHelpDialog.show();
    };
    const icon = new Image(keyboardIcon_png, {
      scale: ICON_DESIRED_HEIGHT / keyboardIcon_png.height,
      pickable: false
    });
    super(icon, backgroundColorProperty, options);
    keyboardHelpDialogCapsule = new PhetioCapsule(tandem => {
      // Wrap in a node to prevent DAG problems if archetypes are also created
      return new KeyboardHelpDialog(screens, screenProperty, {
        tandem: tandem,
        focusOnHideNode: this
      });
    }, [], {
      tandem: options.tandem.createTandem('keyboardHelpDialogCapsule'),
      phetioType: PhetioCapsule.PhetioCapsuleIO(Dialog.DialogIO)
    });

    // change the icon so that it is visible when the background changes from dark to light
    backgroundColorProperty.link(backgroundColor => {
      icon.image = backgroundColor.equals(Color.BLACK) ? keyboardIcon_png : keyboardIconOnWhite_png;
    });
  }
}
joist.register('KeyboardHelpButton', KeyboardHelpButton);
export default KeyboardHelpButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25pemUiLCJDb2xvciIsIkltYWdlIiwiRGlhbG9nIiwiUGhldGlvQ2Fwc3VsZSIsImtleWJvYXJkSWNvbk9uV2hpdGVfcG5nIiwia2V5Ym9hcmRJY29uX3BuZyIsImpvaXN0IiwiSm9pc3RCdXR0b24iLCJKb2lzdFN0cmluZ3MiLCJLZXlib2FyZEhlbHBEaWFsb2ciLCJrZXlib2FyZFNob3J0Y3V0c1N0cmluZ1Byb3BlcnR5IiwiYTExeSIsImtleWJvYXJkSGVscCIsIklDT05fREVTSVJFRF9IRUlHSFQiLCJLZXlib2FyZEhlbHBCdXR0b24iLCJjb25zdHJ1Y3RvciIsInNjcmVlbnMiLCJzY3JlZW5Qcm9wZXJ0eSIsImJhY2tncm91bmRDb2xvclByb3BlcnR5IiwicHJvdmlkZWRPcHRpb25zIiwib3B0aW9ucyIsImhpZ2hsaWdodEV4dGVuc2lvbldpZHRoIiwiaGlnaGxpZ2h0RXh0ZW5zaW9uSGVpZ2h0IiwiaGlnaGxpZ2h0Q2VudGVyT2Zmc2V0WSIsInZpc2libGVQcm9wZXJ0eU9wdGlvbnMiLCJwaGV0aW9GZWF0dXJlZCIsImlubmVyQ29udGVudCIsInZvaWNpbmdOYW1lUmVzcG9uc2UiLCJrZXlib2FyZEhlbHBEaWFsb2dDYXBzdWxlIiwibGlzdGVuZXIiLCJhc3NlcnQiLCJrZXlib2FyZEhlbHBEaWFsb2ciLCJnZXRFbGVtZW50Iiwic2hvdyIsImljb24iLCJzY2FsZSIsImhlaWdodCIsInBpY2thYmxlIiwidGFuZGVtIiwiZm9jdXNPbkhpZGVOb2RlIiwiY3JlYXRlVGFuZGVtIiwicGhldGlvVHlwZSIsIlBoZXRpb0NhcHN1bGVJTyIsIkRpYWxvZ0lPIiwibGluayIsImJhY2tncm91bmRDb2xvciIsImltYWdlIiwiZXF1YWxzIiwiQkxBQ0siLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIktleWJvYXJkSGVscEJ1dHRvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNi0yMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBUaGUgYnV0dG9uIHRoYXQgcG9wcyB1cCB0aGUgS2V5Ym9hcmQgSGVscCBEaWFsb2csIHdoaWNoIGFwcGVhcnMgaW4gdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIG5hdmJhciBhbmRcclxuICogdG8gdGhlIGxlZnQgb2YgdGhlIFBoZXRCdXR0b24uXHJcbiAqXHJcbiAqIEBhdXRob3IgSmVzc2UgR3JlZW5iZXJnXHJcbiAqL1xyXG5cclxuaW1wb3J0IFByb3BlcnR5IGZyb20gJy4uLy4uL2F4b24vanMvUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgb3B0aW9uaXplLCB7IEVtcHR5U2VsZk9wdGlvbnMgfSBmcm9tICcuLi8uLi9waGV0LWNvcmUvanMvb3B0aW9uaXplLmpzJztcclxuaW1wb3J0IHsgQ29sb3IsIEltYWdlIH0gZnJvbSAnLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IERpYWxvZyBmcm9tICcuLi8uLi9zdW4vanMvRGlhbG9nLmpzJztcclxuaW1wb3J0IFBoZXRpb0NhcHN1bGUgZnJvbSAnLi4vLi4vdGFuZGVtL2pzL1BoZXRpb0NhcHN1bGUuanMnO1xyXG5pbXBvcnQga2V5Ym9hcmRJY29uT25XaGl0ZV9wbmcgZnJvbSAnLi4vaW1hZ2VzL2tleWJvYXJkSWNvbk9uV2hpdGVfcG5nLmpzJzsgLy8gb24gYSB3aGl0ZSBuYXZiYXJcclxuaW1wb3J0IGtleWJvYXJkSWNvbl9wbmcgZnJvbSAnLi4vaW1hZ2VzL2tleWJvYXJkSWNvbl9wbmcuanMnOyAvLyBvbiBhIGJsYWNrIG5hdmJhclxyXG5pbXBvcnQgam9pc3QgZnJvbSAnLi9qb2lzdC5qcyc7XHJcbmltcG9ydCBKb2lzdEJ1dHRvbiwgeyBKb2lzdEJ1dHRvbk9wdGlvbnMgfSBmcm9tICcuL0pvaXN0QnV0dG9uLmpzJztcclxuaW1wb3J0IEpvaXN0U3RyaW5ncyBmcm9tICcuL0pvaXN0U3RyaW5ncy5qcyc7XHJcbmltcG9ydCBLZXlib2FyZEhlbHBEaWFsb2cgZnJvbSAnLi9LZXlib2FyZEhlbHBEaWFsb2cuanMnO1xyXG5pbXBvcnQgeyBBbnlTY3JlZW4gfSBmcm9tICcuL1NjcmVlbi5qcyc7XHJcbmltcG9ydCBQaWNrUmVxdWlyZWQgZnJvbSAnLi4vLi4vcGhldC1jb3JlL2pzL3R5cGVzL1BpY2tSZXF1aXJlZC5qcyc7XHJcbmltcG9ydCBUUmVhZE9ubHlQcm9wZXJ0eSBmcm9tICcuLi8uLi9heG9uL2pzL1RSZWFkT25seVByb3BlcnR5LmpzJztcclxuXHJcbi8vIGNvbnN0YW50c1xyXG5jb25zdCBrZXlib2FyZFNob3J0Y3V0c1N0cmluZ1Byb3BlcnR5ID0gSm9pc3RTdHJpbmdzLmExMXkua2V5Ym9hcmRIZWxwLmtleWJvYXJkU2hvcnRjdXRzU3RyaW5nUHJvcGVydHk7XHJcbmNvbnN0IElDT05fREVTSVJFRF9IRUlHSFQgPSAxNy4wODU7IC8vIGVtcGlyaWNhbGx5IGRldGVybWluZWRcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSBFbXB0eVNlbGZPcHRpb25zO1xyXG5leHBvcnQgdHlwZSBLZXlib2FyZEhlbHBCdXR0b25PcHRpb25zID0gU2VsZk9wdGlvbnMgJiBQaWNrUmVxdWlyZWQ8Sm9pc3RCdXR0b25PcHRpb25zLCAndGFuZGVtJz4gJiBQaWNrPEpvaXN0QnV0dG9uT3B0aW9ucywgJ3BvaW50ZXJBcmVhRGlsYXRpb25YJyB8ICdwb2ludGVyQXJlYURpbGF0aW9uWSc+O1xyXG5cclxuY2xhc3MgS2V5Ym9hcmRIZWxwQnV0dG9uIGV4dGVuZHMgSm9pc3RCdXR0b24ge1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIHNjcmVlbnM6IEFueVNjcmVlbltdLCBzY3JlZW5Qcm9wZXJ0eTogUHJvcGVydHk8QW55U2NyZWVuPixcclxuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvclByb3BlcnR5OiBUUmVhZE9ubHlQcm9wZXJ0eTxDb2xvcj4sXHJcbiAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlZE9wdGlvbnM6IEtleWJvYXJkSGVscEJ1dHRvbk9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxLZXlib2FyZEhlbHBCdXR0b25PcHRpb25zLCBTZWxmT3B0aW9ucywgSm9pc3RCdXR0b25PcHRpb25zPigpKCB7XHJcbiAgICAgIGhpZ2hsaWdodEV4dGVuc2lvbldpZHRoOiA1ICsgMy42LFxyXG4gICAgICBoaWdobGlnaHRFeHRlbnNpb25IZWlnaHQ6IDEwLFxyXG5cclxuICAgICAgLy8gVGhlIGtleWJvYXJkIGJ1dHRvbiBpcyBub3QgdmVydGljYWxseSBzeW1tZXRyaWMsIGR1ZSB0byB0aGUgY2FibGUgb24gdGhlIHRvcC5cclxuICAgICAgLy8gVGhpcyBvZmZzZXQgYWRqdXN0cyB0aGUgYm9keSBvZiB0aGUga2V5Ym9hcmQgdG8gYmUgaW4gdGhlIGNlbnRlciwgc28gaXRcclxuICAgICAgLy8gd2lsbCBhbGlnbiB3aXRoIHRoZSBzcGVha2VyIGJ1dHRvbiBhbmQgdGhlIFBoRVQgbG9nb1xyXG4gICAgICBoaWdobGlnaHRDZW50ZXJPZmZzZXRZOiAyLFxyXG5cclxuICAgICAgLy8gcGhldC1pb1xyXG4gICAgICB2aXNpYmxlUHJvcGVydHlPcHRpb25zOiB7IHBoZXRpb0ZlYXR1cmVkOiB0cnVlIH0sXHJcblxyXG4gICAgICAvLyBwZG9tXHJcbiAgICAgIGlubmVyQ29udGVudDoga2V5Ym9hcmRTaG9ydGN1dHNTdHJpbmdQcm9wZXJ0eSxcclxuXHJcbiAgICAgIC8vIHZvaWNpbmdcclxuICAgICAgdm9pY2luZ05hbWVSZXNwb25zZToga2V5Ym9hcmRTaG9ydGN1dHNTdHJpbmdQcm9wZXJ0eVxyXG4gICAgfSwgcHJvdmlkZWRPcHRpb25zICk7XHJcblxyXG4gICAgbGV0IGtleWJvYXJkSGVscERpYWxvZ0NhcHN1bGU6IFBoZXRpb0NhcHN1bGU8S2V5Ym9hcmRIZWxwRGlhbG9nPiB8IG51bGwgPSBudWxsOyAvLyBzZXQgYWZ0ZXIgY2FsbGluZyBzdXBlclxyXG4gICAgb3B0aW9ucy5saXN0ZW5lciA9ICgpID0+IHtcclxuICAgICAgYXNzZXJ0ICYmIGFzc2VydCgga2V5Ym9hcmRIZWxwRGlhbG9nQ2Fwc3VsZSApO1xyXG5cclxuICAgICAgY29uc3Qga2V5Ym9hcmRIZWxwRGlhbG9nID0ga2V5Ym9hcmRIZWxwRGlhbG9nQ2Fwc3VsZSEuZ2V0RWxlbWVudCgpO1xyXG5cclxuICAgICAga2V5Ym9hcmRIZWxwRGlhbG9nLnNob3coKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaWNvbiA9IG5ldyBJbWFnZSgga2V5Ym9hcmRJY29uX3BuZywge1xyXG4gICAgICBzY2FsZTogSUNPTl9ERVNJUkVEX0hFSUdIVCAvIGtleWJvYXJkSWNvbl9wbmcuaGVpZ2h0LFxyXG4gICAgICBwaWNrYWJsZTogZmFsc2VcclxuICAgIH0gKTtcclxuXHJcbiAgICBzdXBlciggaWNvbiwgYmFja2dyb3VuZENvbG9yUHJvcGVydHksIG9wdGlvbnMgKTtcclxuXHJcbiAgICBrZXlib2FyZEhlbHBEaWFsb2dDYXBzdWxlID0gbmV3IFBoZXRpb0NhcHN1bGU8S2V5Ym9hcmRIZWxwRGlhbG9nPiggdGFuZGVtID0+IHtcclxuXHJcbiAgICAgIC8vIFdyYXAgaW4gYSBub2RlIHRvIHByZXZlbnQgREFHIHByb2JsZW1zIGlmIGFyY2hldHlwZXMgYXJlIGFsc28gY3JlYXRlZFxyXG4gICAgICByZXR1cm4gbmV3IEtleWJvYXJkSGVscERpYWxvZyggc2NyZWVucywgc2NyZWVuUHJvcGVydHksIHtcclxuICAgICAgICB0YW5kZW06IHRhbmRlbSxcclxuICAgICAgICBmb2N1c09uSGlkZU5vZGU6IHRoaXNcclxuICAgICAgfSApO1xyXG4gICAgfSwgW10sIHtcclxuICAgICAgdGFuZGVtOiBvcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdrZXlib2FyZEhlbHBEaWFsb2dDYXBzdWxlJyApLFxyXG4gICAgICBwaGV0aW9UeXBlOiBQaGV0aW9DYXBzdWxlLlBoZXRpb0NhcHN1bGVJTyggRGlhbG9nLkRpYWxvZ0lPIClcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBjaGFuZ2UgdGhlIGljb24gc28gdGhhdCBpdCBpcyB2aXNpYmxlIHdoZW4gdGhlIGJhY2tncm91bmQgY2hhbmdlcyBmcm9tIGRhcmsgdG8gbGlnaHRcclxuICAgIGJhY2tncm91bmRDb2xvclByb3BlcnR5LmxpbmsoIGJhY2tncm91bmRDb2xvciA9PiB7XHJcbiAgICAgIGljb24uaW1hZ2UgPSBiYWNrZ3JvdW5kQ29sb3IuZXF1YWxzKCBDb2xvci5CTEFDSyApID8ga2V5Ym9hcmRJY29uX3BuZyA6IGtleWJvYXJkSWNvbk9uV2hpdGVfcG5nO1xyXG4gICAgfSApO1xyXG4gIH1cclxufVxyXG5cclxuam9pc3QucmVnaXN0ZXIoICdLZXlib2FyZEhlbHBCdXR0b24nLCBLZXlib2FyZEhlbHBCdXR0b24gKTtcclxuZXhwb3J0IGRlZmF1bHQgS2V5Ym9hcmRIZWxwQnV0dG9uOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBLE9BQU9BLFNBQVMsTUFBNEIsaUNBQWlDO0FBQzdFLFNBQVNDLEtBQUssRUFBRUMsS0FBSyxRQUFRLDZCQUE2QjtBQUMxRCxPQUFPQyxNQUFNLE1BQU0sd0JBQXdCO0FBQzNDLE9BQU9DLGFBQWEsTUFBTSxrQ0FBa0M7QUFDNUQsT0FBT0MsdUJBQXVCLE1BQU0sc0NBQXNDLENBQUMsQ0FBQztBQUM1RSxPQUFPQyxnQkFBZ0IsTUFBTSwrQkFBK0IsQ0FBQyxDQUFDO0FBQzlELE9BQU9DLEtBQUssTUFBTSxZQUFZO0FBQzlCLE9BQU9DLFdBQVcsTUFBOEIsa0JBQWtCO0FBQ2xFLE9BQU9DLFlBQVksTUFBTSxtQkFBbUI7QUFDNUMsT0FBT0Msa0JBQWtCLE1BQU0seUJBQXlCO0FBS3hEO0FBQ0EsTUFBTUMsK0JBQStCLEdBQUdGLFlBQVksQ0FBQ0csSUFBSSxDQUFDQyxZQUFZLENBQUNGLCtCQUErQjtBQUN0RyxNQUFNRyxtQkFBbUIsR0FBRyxNQUFNLENBQUMsQ0FBQzs7QUFLcEMsTUFBTUMsa0JBQWtCLFNBQVNQLFdBQVcsQ0FBQztFQUVwQ1EsV0FBV0EsQ0FBRUMsT0FBb0IsRUFBRUMsY0FBbUMsRUFDekRDLHVCQUFpRCxFQUNqREMsZUFBMEMsRUFBRztJQUUvRCxNQUFNQyxPQUFPLEdBQUdyQixTQUFTLENBQTZELENBQUMsQ0FBRTtNQUN2RnNCLHVCQUF1QixFQUFFLENBQUMsR0FBRyxHQUFHO01BQ2hDQyx3QkFBd0IsRUFBRSxFQUFFO01BRTVCO01BQ0E7TUFDQTtNQUNBQyxzQkFBc0IsRUFBRSxDQUFDO01BRXpCO01BQ0FDLHNCQUFzQixFQUFFO1FBQUVDLGNBQWMsRUFBRTtNQUFLLENBQUM7TUFFaEQ7TUFDQUMsWUFBWSxFQUFFaEIsK0JBQStCO01BRTdDO01BQ0FpQixtQkFBbUIsRUFBRWpCO0lBQ3ZCLENBQUMsRUFBRVMsZUFBZ0IsQ0FBQztJQUVwQixJQUFJUyx5QkFBbUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNoRlIsT0FBTyxDQUFDUyxRQUFRLEdBQUcsTUFBTTtNQUN2QkMsTUFBTSxJQUFJQSxNQUFNLENBQUVGLHlCQUEwQixDQUFDO01BRTdDLE1BQU1HLGtCQUFrQixHQUFHSCx5QkFBeUIsQ0FBRUksVUFBVSxDQUFDLENBQUM7TUFFbEVELGtCQUFrQixDQUFDRSxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsTUFBTUMsSUFBSSxHQUFHLElBQUlqQyxLQUFLLENBQUVJLGdCQUFnQixFQUFFO01BQ3hDOEIsS0FBSyxFQUFFdEIsbUJBQW1CLEdBQUdSLGdCQUFnQixDQUFDK0IsTUFBTTtNQUNwREMsUUFBUSxFQUFFO0lBQ1osQ0FBRSxDQUFDO0lBRUgsS0FBSyxDQUFFSCxJQUFJLEVBQUVoQix1QkFBdUIsRUFBRUUsT0FBUSxDQUFDO0lBRS9DUSx5QkFBeUIsR0FBRyxJQUFJekIsYUFBYSxDQUFzQm1DLE1BQU0sSUFBSTtNQUUzRTtNQUNBLE9BQU8sSUFBSTdCLGtCQUFrQixDQUFFTyxPQUFPLEVBQUVDLGNBQWMsRUFBRTtRQUN0RHFCLE1BQU0sRUFBRUEsTUFBTTtRQUNkQyxlQUFlLEVBQUU7TUFDbkIsQ0FBRSxDQUFDO0lBQ0wsQ0FBQyxFQUFFLEVBQUUsRUFBRTtNQUNMRCxNQUFNLEVBQUVsQixPQUFPLENBQUNrQixNQUFNLENBQUNFLFlBQVksQ0FBRSwyQkFBNEIsQ0FBQztNQUNsRUMsVUFBVSxFQUFFdEMsYUFBYSxDQUFDdUMsZUFBZSxDQUFFeEMsTUFBTSxDQUFDeUMsUUFBUztJQUM3RCxDQUFFLENBQUM7O0lBRUg7SUFDQXpCLHVCQUF1QixDQUFDMEIsSUFBSSxDQUFFQyxlQUFlLElBQUk7TUFDL0NYLElBQUksQ0FBQ1ksS0FBSyxHQUFHRCxlQUFlLENBQUNFLE1BQU0sQ0FBRS9DLEtBQUssQ0FBQ2dELEtBQU0sQ0FBQyxHQUFHM0MsZ0JBQWdCLEdBQUdELHVCQUF1QjtJQUNqRyxDQUFFLENBQUM7RUFDTDtBQUNGO0FBRUFFLEtBQUssQ0FBQzJDLFFBQVEsQ0FBRSxvQkFBb0IsRUFBRW5DLGtCQUFtQixDQUFDO0FBQzFELGVBQWVBLGtCQUFrQiJ9