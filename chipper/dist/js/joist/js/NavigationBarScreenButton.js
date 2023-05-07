// Copyright 2013-2023, University of Colorado Boulder

/**
 * Button for a single screen in the navigation bar, shows the text and the navigation bar icon.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../axon/js/DerivedProperty.js';
import Multilink from '../../axon/js/Multilink.js';
import Utils from '../../dot/js/Utils.js';
import { Shape } from '../../kite/js/imports.js';
import optionize from '../../phet-core/js/optionize.js';
import PhetColorScheme from '../../scenery-phet/js/PhetColorScheme.js';
import PhetFont from '../../scenery-phet/js/PhetFont.js';
import { Color, FocusHighlightPath, Node, Rectangle, Text, VBox, Voicing } from '../../scenery/js/imports.js';
import PushButtonModel from '../../sun/js/buttons/PushButtonModel.js';
import HighlightNode from './HighlightNode.js';
import joist from './joist.js';
// constants
const HIGHLIGHT_SPACING = 4;
const getHighlightWidth = overlay => overlay.width + 2 * HIGHLIGHT_SPACING;
class NavigationBarScreenButton extends Voicing(Node) {
  /**
   * @param navigationBarFillProperty - the color of the navbar, as a string.
   * @param screenProperty
   * @param screen
   * @param simScreenIndex - the index (within sim screens only) of the screen corresponding to this button
   * @param navBarHeight
   * @param [providedOptions]
   */
  constructor(navigationBarFillProperty, screenProperty, screen, simScreenIndex, navBarHeight, providedOptions) {
    assert && assert(screen.nameProperty.value, `name is required for screen ${simScreenIndex}`);
    assert && assert(screen.navigationBarIcon, `navigationBarIcon is required for screen ${screen.nameProperty.value}`);
    const options = optionize()({
      cursor: 'pointer',
      phetioDocumentation: `Button in the navigation bar that selects the '${screen.tandem.name}' screen`,
      maxButtonWidth: null,
      // {number|null} the maximum width of the button, causes text and/or icon to be scaled down if necessary

      // pdom
      tagName: 'button',
      containerTagName: 'li',
      descriptionContent: screen.descriptionContent,
      appendDescription: true,
      // voicing
      voicingHintResponse: screen.descriptionContent
    }, providedOptions);
    assert && assert(!options.innerContent, 'NavigationBarScreenButton sets its own innerContent');
    super();
    this.screen = screen;
    screen.pdomDisplayNameProperty.link(name => {
      this.innerContent = name;
      this.voicingNameResponse = name;
    });
    assert && assert(screen.navigationBarIcon, 'navigationBarIcon should exist');
    // icon
    const icon = new Node({
      children: [screen.navigationBarIcon],
      // wrap in case this icon is used in multiple place (eg, home screen and navbar)
      maxHeight: 0.625 * navBarHeight,
      // pdom - the icon may have focusable components in its graphic, but they should be invisible for Interactive
      // Description, all accessibility should go through this button
      pdomVisible: false
    });

    // frame around the icon
    const iconFrame = new Rectangle(0, 0, icon.width, icon.height);
    const iconAndFrame = new Node({
      children: [icon, iconFrame]
    });
    const text = new Text(screen.nameProperty, {
      font: new PhetFont(10),
      tandem: options.tandem.createTandem('text'),
      stringPropertyOptions: {
        phetioReadOnly: true
      } // text is updated via screen.nameProperty
    });

    // spacing set by Property link below
    const iconAndText = new VBox({
      children: [iconAndFrame, text],
      pickable: false,
      usesOpacity: true,
      // hint, since we change its opacity
      maxHeight: navBarHeight
    });

    // add a transparent overlay for input handling and to size touchArea/mouseArea
    const overlay = new Rectangle({
      rectBounds: iconAndText.bounds
    });

    // highlights
    const highlightWidth = getHighlightWidth(overlay);
    const brightenHighlight = new HighlightNode(highlightWidth, overlay.height, {
      center: iconAndText.center,
      fill: 'white'
    });
    const darkenHighlight = new HighlightNode(highlightWidth, overlay.height, {
      center: iconAndText.center,
      fill: 'black'
    });

    // Is this button's screen selected?
    const selectedProperty = new DerivedProperty([screenProperty], currentScreen => currentScreen === screen);

    // (phet-io) Create the button model, needs to be public so that PhET-iO wrappers can hook up to it if
    // needed. Note it shares a tandem with this, so the emitter will be instrumented as a child of the button.
    // Note that this buttonModel will always be phetioReadOnly false despite the parent value.
    this.buttonModel = new PushButtonModel({
      listener: () => {
        screenProperty.value !== screen && this.voicingSpeakFullResponse({
          objectResponse: null,
          hintResponse: null
        });
        screenProperty.value = screen;
      },
      tandem: options.tandem,
      phetioEnabledPropertyInstrumented: false
    });

    // Hook up the input listener
    const pressListener = this.buttonModel.createPressListener({
      tandem: options.tandem.createTandem('pressListener')
    });
    this.addInputListener(pressListener);
    this.addInputListener({
      focus: () => {
        this.voicingSpeakFullResponse({
          objectResponse: null,
          contextResponse: null
        });
      }
    });

    // manage interaction feedback
    Multilink.multilink([selectedProperty, this.buttonModel.looksPressedProperty, this.buttonModel.looksOverProperty, navigationBarFillProperty, this.buttonModel.enabledProperty], (selected, looksPressed, looksOver, navigationBarFill, enabled) => {
      const useDarkenHighlights = !navigationBarFill.equals(Color.BLACK);

      // Color match yellow with the PhET Logo
      const selectedTextColor = useDarkenHighlights ? 'black' : PhetColorScheme.BUTTON_YELLOW;
      const unselectedTextColor = useDarkenHighlights ? 'gray' : 'white';
      text.fill = selected ? selectedTextColor : unselectedTextColor;
      iconAndText.opacity = selected ? 1.0 : looksPressed ? 0.65 : 0.5;
      brightenHighlight.visible = !useDarkenHighlights && enabled && (looksOver || looksPressed);
      darkenHighlight.visible = useDarkenHighlights && enabled && (looksOver || looksPressed);

      // Put a frame around the screen icon, depending on the navigation bar background color.
      if (screen.showScreenIconFrameForNavigationBarFill === 'black' && navigationBarFill.equals(Color.BLACK)) {
        iconFrame.stroke = PhetColorScheme.SCREEN_ICON_FRAME;
      } else if (screen.showScreenIconFrameForNavigationBarFill === 'white' && navigationBarFill.equals(Color.WHITE)) {
        iconFrame.stroke = 'black'; // black frame on a white navbar
      } else {
        iconFrame.stroke = 'transparent'; // keep the same bounds for simplicity
      }
    });

    // Keep the cursor in sync with if the button is enabled. This doesn't need to be disposed.
    this.buttonModel.enabledProperty.link(enabled => {
      this.cursor = enabled ? options.cursor : null;
    });

    // Update the button's layout
    const updateLayout = () => {
      // adjust the vertical space between icon and text, see https://github.com/phetsims/joist/issues/143
      iconAndText.spacing = Utils.clamp(12 - text.height, 0, 3);

      // adjust the overlay
      overlay.setRectBounds(iconAndText.bounds);

      // adjust the highlights
      brightenHighlight.spacing = darkenHighlight.spacing = getHighlightWidth(overlay);
      brightenHighlight.center = darkenHighlight.center = iconAndText.center;
    };

    // Update the button's layout when the screen name changes
    iconAndText.boundsProperty.lazyLink(updateLayout);
    text.boundsProperty.link(updateLayout);
    this.children = [iconAndText, overlay, brightenHighlight, darkenHighlight];
    const needsIconMaxWidth = options.maxButtonWidth && this.width > options.maxButtonWidth;

    // Constrain text and icon width, if necessary
    if (needsIconMaxWidth) {
      text.maxWidth = icon.maxWidth = options.maxButtonWidth - (this.width - iconAndText.width);
    } else {
      // Don't allow the text to grow larger than the icon if changed later on using PhET-iO, see #438
      // Text is allowed to go beyond the bounds of the icon, hence we use `this.width` instead of `icon.width`
      text.maxWidth = this.width;
    }
    needsIconMaxWidth && assert && assert(Utils.toFixed(this.width, 0) === Utils.toFixed(options.maxButtonWidth, 0), `this.width ${this.width} !== options.maxButtonWidth ${options.maxButtonWidth}`);

    // pdom - Pass a shape to the focusHighlight to prevent dilation, then tweak the top up just a hair.
    const highlightLineWidth = FocusHighlightPath.getOuterLineWidthFromNode(this);
    this.focusHighlight = Shape.bounds(this.bounds.withMinY(this.bounds.minY - highlightLineWidth / 2));
    this.mutate(options);
  }
}
joist.register('NavigationBarScreenButton', NavigationBarScreenButton);
export default NavigationBarScreenButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEZXJpdmVkUHJvcGVydHkiLCJNdWx0aWxpbmsiLCJVdGlscyIsIlNoYXBlIiwib3B0aW9uaXplIiwiUGhldENvbG9yU2NoZW1lIiwiUGhldEZvbnQiLCJDb2xvciIsIkZvY3VzSGlnaGxpZ2h0UGF0aCIsIk5vZGUiLCJSZWN0YW5nbGUiLCJUZXh0IiwiVkJveCIsIlZvaWNpbmciLCJQdXNoQnV0dG9uTW9kZWwiLCJIaWdobGlnaHROb2RlIiwiam9pc3QiLCJISUdITElHSFRfU1BBQ0lORyIsImdldEhpZ2hsaWdodFdpZHRoIiwib3ZlcmxheSIsIndpZHRoIiwiTmF2aWdhdGlvbkJhclNjcmVlbkJ1dHRvbiIsImNvbnN0cnVjdG9yIiwibmF2aWdhdGlvbkJhckZpbGxQcm9wZXJ0eSIsInNjcmVlblByb3BlcnR5Iiwic2NyZWVuIiwic2ltU2NyZWVuSW5kZXgiLCJuYXZCYXJIZWlnaHQiLCJwcm92aWRlZE9wdGlvbnMiLCJhc3NlcnQiLCJuYW1lUHJvcGVydHkiLCJ2YWx1ZSIsIm5hdmlnYXRpb25CYXJJY29uIiwib3B0aW9ucyIsImN1cnNvciIsInBoZXRpb0RvY3VtZW50YXRpb24iLCJ0YW5kZW0iLCJuYW1lIiwibWF4QnV0dG9uV2lkdGgiLCJ0YWdOYW1lIiwiY29udGFpbmVyVGFnTmFtZSIsImRlc2NyaXB0aW9uQ29udGVudCIsImFwcGVuZERlc2NyaXB0aW9uIiwidm9pY2luZ0hpbnRSZXNwb25zZSIsImlubmVyQ29udGVudCIsInBkb21EaXNwbGF5TmFtZVByb3BlcnR5IiwibGluayIsInZvaWNpbmdOYW1lUmVzcG9uc2UiLCJpY29uIiwiY2hpbGRyZW4iLCJtYXhIZWlnaHQiLCJwZG9tVmlzaWJsZSIsImljb25GcmFtZSIsImhlaWdodCIsImljb25BbmRGcmFtZSIsInRleHQiLCJmb250IiwiY3JlYXRlVGFuZGVtIiwic3RyaW5nUHJvcGVydHlPcHRpb25zIiwicGhldGlvUmVhZE9ubHkiLCJpY29uQW5kVGV4dCIsInBpY2thYmxlIiwidXNlc09wYWNpdHkiLCJyZWN0Qm91bmRzIiwiYm91bmRzIiwiaGlnaGxpZ2h0V2lkdGgiLCJicmlnaHRlbkhpZ2hsaWdodCIsImNlbnRlciIsImZpbGwiLCJkYXJrZW5IaWdobGlnaHQiLCJzZWxlY3RlZFByb3BlcnR5IiwiY3VycmVudFNjcmVlbiIsImJ1dHRvbk1vZGVsIiwibGlzdGVuZXIiLCJ2b2ljaW5nU3BlYWtGdWxsUmVzcG9uc2UiLCJvYmplY3RSZXNwb25zZSIsImhpbnRSZXNwb25zZSIsInBoZXRpb0VuYWJsZWRQcm9wZXJ0eUluc3RydW1lbnRlZCIsInByZXNzTGlzdGVuZXIiLCJjcmVhdGVQcmVzc0xpc3RlbmVyIiwiYWRkSW5wdXRMaXN0ZW5lciIsImZvY3VzIiwiY29udGV4dFJlc3BvbnNlIiwibXVsdGlsaW5rIiwibG9va3NQcmVzc2VkUHJvcGVydHkiLCJsb29rc092ZXJQcm9wZXJ0eSIsImVuYWJsZWRQcm9wZXJ0eSIsInNlbGVjdGVkIiwibG9va3NQcmVzc2VkIiwibG9va3NPdmVyIiwibmF2aWdhdGlvbkJhckZpbGwiLCJlbmFibGVkIiwidXNlRGFya2VuSGlnaGxpZ2h0cyIsImVxdWFscyIsIkJMQUNLIiwic2VsZWN0ZWRUZXh0Q29sb3IiLCJCVVRUT05fWUVMTE9XIiwidW5zZWxlY3RlZFRleHRDb2xvciIsIm9wYWNpdHkiLCJ2aXNpYmxlIiwic2hvd1NjcmVlbkljb25GcmFtZUZvck5hdmlnYXRpb25CYXJGaWxsIiwic3Ryb2tlIiwiU0NSRUVOX0lDT05fRlJBTUUiLCJXSElURSIsInVwZGF0ZUxheW91dCIsInNwYWNpbmciLCJjbGFtcCIsInNldFJlY3RCb3VuZHMiLCJib3VuZHNQcm9wZXJ0eSIsImxhenlMaW5rIiwibmVlZHNJY29uTWF4V2lkdGgiLCJtYXhXaWR0aCIsInRvRml4ZWQiLCJoaWdobGlnaHRMaW5lV2lkdGgiLCJnZXRPdXRlckxpbmVXaWR0aEZyb21Ob2RlIiwiZm9jdXNIaWdobGlnaHQiLCJ3aXRoTWluWSIsIm1pblkiLCJtdXRhdGUiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIk5hdmlnYXRpb25CYXJTY3JlZW5CdXR0b24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTMtMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogQnV0dG9uIGZvciBhIHNpbmdsZSBzY3JlZW4gaW4gdGhlIG5hdmlnYXRpb24gYmFyLCBzaG93cyB0aGUgdGV4dCBhbmQgdGhlIG5hdmlnYXRpb24gYmFyIGljb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgU2FtIFJlaWQgKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqIEBhdXRob3IgSm9uYXRoYW4gT2xzb24gPGpvbmF0aGFuLm9sc29uQGNvbG9yYWRvLmVkdT5cclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgRGVyaXZlZFByb3BlcnR5IGZyb20gJy4uLy4uL2F4b24vanMvRGVyaXZlZFByb3BlcnR5LmpzJztcclxuaW1wb3J0IFRSZWFkT25seVByb3BlcnR5IGZyb20gJy4uLy4uL2F4b24vanMvVFJlYWRPbmx5UHJvcGVydHkuanMnO1xyXG5pbXBvcnQgTXVsdGlsaW5rIGZyb20gJy4uLy4uL2F4b24vanMvTXVsdGlsaW5rLmpzJztcclxuaW1wb3J0IFByb3BlcnR5IGZyb20gJy4uLy4uL2F4b24vanMvUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vZG90L2pzL1V0aWxzLmpzJztcclxuaW1wb3J0IHsgU2hhcGUgfSBmcm9tICcuLi8uLi9raXRlL2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgb3B0aW9uaXplIGZyb20gJy4uLy4uL3BoZXQtY29yZS9qcy9vcHRpb25pemUuanMnO1xyXG5pbXBvcnQgUGhldENvbG9yU2NoZW1lIGZyb20gJy4uLy4uL3NjZW5lcnktcGhldC9qcy9QaGV0Q29sb3JTY2hlbWUuanMnO1xyXG5pbXBvcnQgUGhldEZvbnQgZnJvbSAnLi4vLi4vc2NlbmVyeS1waGV0L2pzL1BoZXRGb250LmpzJztcclxuaW1wb3J0IHsgQ29sb3IsIEZvY3VzSGlnaGxpZ2h0UGF0aCwgTm9kZSwgTm9kZU9wdGlvbnMsIFJlY3RhbmdsZSwgVGV4dCwgVkJveCwgVm9pY2luZywgVm9pY2luZ09wdGlvbnMgfSBmcm9tICcuLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgUHVzaEJ1dHRvbk1vZGVsIGZyb20gJy4uLy4uL3N1bi9qcy9idXR0b25zL1B1c2hCdXR0b25Nb2RlbC5qcyc7XHJcbmltcG9ydCBIaWdobGlnaHROb2RlIGZyb20gJy4vSGlnaGxpZ2h0Tm9kZS5qcyc7XHJcbmltcG9ydCBqb2lzdCBmcm9tICcuL2pvaXN0LmpzJztcclxuaW1wb3J0IHsgQW55U2NyZWVuIH0gZnJvbSAnLi9TY3JlZW4uanMnO1xyXG5pbXBvcnQgUGlja1JlcXVpcmVkIGZyb20gJy4uLy4uL3BoZXQtY29yZS9qcy90eXBlcy9QaWNrUmVxdWlyZWQuanMnO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IEhJR0hMSUdIVF9TUEFDSU5HID0gNDtcclxuY29uc3QgZ2V0SGlnaGxpZ2h0V2lkdGggPSAoIG92ZXJsYXk6IE5vZGUgKSA9PiBvdmVybGF5LndpZHRoICsgKCAyICogSElHSExJR0hUX1NQQUNJTkcgKTtcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSB7XHJcbiAgbWF4QnV0dG9uV2lkdGg/OiBudW1iZXIgfCBudWxsO1xyXG59O1xyXG50eXBlIFBhcmVudE9wdGlvbnMgPSBWb2ljaW5nT3B0aW9ucyAmIE5vZGVPcHRpb25zO1xyXG50eXBlIE5hdmlnYXRpb25CYXJTY3JlZW5CdXR0b25PcHRpb25zID0gU2VsZk9wdGlvbnMgJiBQYXJlbnRPcHRpb25zICYgUGlja1JlcXVpcmVkPFBhcmVudE9wdGlvbnMsICd0YW5kZW0nPjtcclxuXHJcbmNsYXNzIE5hdmlnYXRpb25CYXJTY3JlZW5CdXR0b24gZXh0ZW5kcyBWb2ljaW5nKCBOb2RlICkge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgYnV0dG9uTW9kZWw6IFB1c2hCdXR0b25Nb2RlbDtcclxuXHJcbiAgcHVibGljIHJlYWRvbmx5IHNjcmVlbjogQW55U2NyZWVuO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gbmF2aWdhdGlvbkJhckZpbGxQcm9wZXJ0eSAtIHRoZSBjb2xvciBvZiB0aGUgbmF2YmFyLCBhcyBhIHN0cmluZy5cclxuICAgKiBAcGFyYW0gc2NyZWVuUHJvcGVydHlcclxuICAgKiBAcGFyYW0gc2NyZWVuXHJcbiAgICogQHBhcmFtIHNpbVNjcmVlbkluZGV4IC0gdGhlIGluZGV4ICh3aXRoaW4gc2ltIHNjcmVlbnMgb25seSkgb2YgdGhlIHNjcmVlbiBjb3JyZXNwb25kaW5nIHRvIHRoaXMgYnV0dG9uXHJcbiAgICogQHBhcmFtIG5hdkJhckhlaWdodFxyXG4gICAqIEBwYXJhbSBbcHJvdmlkZWRPcHRpb25zXVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggbmF2aWdhdGlvbkJhckZpbGxQcm9wZXJ0eTogVFJlYWRPbmx5UHJvcGVydHk8Q29sb3I+LCBzY3JlZW5Qcm9wZXJ0eTogUHJvcGVydHk8QW55U2NyZWVuPixcclxuICAgICAgICAgICAgICAgICAgICAgIHNjcmVlbjogQW55U2NyZWVuLCBzaW1TY3JlZW5JbmRleDogbnVtYmVyLCBuYXZCYXJIZWlnaHQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVkT3B0aW9uczogTmF2aWdhdGlvbkJhclNjcmVlbkJ1dHRvbk9wdGlvbnMgKSB7XHJcblxyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggc2NyZWVuLm5hbWVQcm9wZXJ0eS52YWx1ZSwgYG5hbWUgaXMgcmVxdWlyZWQgZm9yIHNjcmVlbiAke3NpbVNjcmVlbkluZGV4fWAgKTtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIHNjcmVlbi5uYXZpZ2F0aW9uQmFySWNvbiwgYG5hdmlnYXRpb25CYXJJY29uIGlzIHJlcXVpcmVkIGZvciBzY3JlZW4gJHtzY3JlZW4ubmFtZVByb3BlcnR5LnZhbHVlfWAgKTtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0gb3B0aW9uaXplPE5hdmlnYXRpb25CYXJTY3JlZW5CdXR0b25PcHRpb25zLCBTZWxmT3B0aW9ucywgUGFyZW50T3B0aW9ucz4oKSgge1xyXG4gICAgICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgcGhldGlvRG9jdW1lbnRhdGlvbjogYEJ1dHRvbiBpbiB0aGUgbmF2aWdhdGlvbiBiYXIgdGhhdCBzZWxlY3RzIHRoZSAnJHtzY3JlZW4udGFuZGVtLm5hbWV9JyBzY3JlZW5gLFxyXG4gICAgICBtYXhCdXR0b25XaWR0aDogbnVsbCwgLy8ge251bWJlcnxudWxsfSB0aGUgbWF4aW11bSB3aWR0aCBvZiB0aGUgYnV0dG9uLCBjYXVzZXMgdGV4dCBhbmQvb3IgaWNvbiB0byBiZSBzY2FsZWQgZG93biBpZiBuZWNlc3NhcnlcclxuXHJcbiAgICAgIC8vIHBkb21cclxuICAgICAgdGFnTmFtZTogJ2J1dHRvbicsXHJcbiAgICAgIGNvbnRhaW5lclRhZ05hbWU6ICdsaScsXHJcbiAgICAgIGRlc2NyaXB0aW9uQ29udGVudDogc2NyZWVuLmRlc2NyaXB0aW9uQ29udGVudCxcclxuICAgICAgYXBwZW5kRGVzY3JpcHRpb246IHRydWUsXHJcblxyXG4gICAgICAvLyB2b2ljaW5nXHJcbiAgICAgIHZvaWNpbmdIaW50UmVzcG9uc2U6IHNjcmVlbi5kZXNjcmlwdGlvbkNvbnRlbnRcclxuICAgIH0sIHByb3ZpZGVkT3B0aW9ucyApO1xyXG5cclxuICAgIGFzc2VydCAmJiBhc3NlcnQoICFvcHRpb25zLmlubmVyQ29udGVudCwgJ05hdmlnYXRpb25CYXJTY3JlZW5CdXR0b24gc2V0cyBpdHMgb3duIGlubmVyQ29udGVudCcgKTtcclxuXHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIHRoaXMuc2NyZWVuID0gc2NyZWVuO1xyXG5cclxuICAgIHNjcmVlbi5wZG9tRGlzcGxheU5hbWVQcm9wZXJ0eS5saW5rKCBuYW1lID0+IHtcclxuICAgICAgdGhpcy5pbm5lckNvbnRlbnQgPSBuYW1lO1xyXG4gICAgICB0aGlzLnZvaWNpbmdOYW1lUmVzcG9uc2UgPSBuYW1lO1xyXG4gICAgfSApO1xyXG5cclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIHNjcmVlbi5uYXZpZ2F0aW9uQmFySWNvbiwgJ25hdmlnYXRpb25CYXJJY29uIHNob3VsZCBleGlzdCcgKTtcclxuICAgIC8vIGljb25cclxuICAgIGNvbnN0IGljb24gPSBuZXcgTm9kZSgge1xyXG4gICAgICBjaGlsZHJlbjogWyBzY3JlZW4ubmF2aWdhdGlvbkJhckljb24hIF0sIC8vIHdyYXAgaW4gY2FzZSB0aGlzIGljb24gaXMgdXNlZCBpbiBtdWx0aXBsZSBwbGFjZSAoZWcsIGhvbWUgc2NyZWVuIGFuZCBuYXZiYXIpXHJcbiAgICAgIG1heEhlaWdodDogMC42MjUgKiBuYXZCYXJIZWlnaHQsXHJcblxyXG4gICAgICAvLyBwZG9tIC0gdGhlIGljb24gbWF5IGhhdmUgZm9jdXNhYmxlIGNvbXBvbmVudHMgaW4gaXRzIGdyYXBoaWMsIGJ1dCB0aGV5IHNob3VsZCBiZSBpbnZpc2libGUgZm9yIEludGVyYWN0aXZlXHJcbiAgICAgIC8vIERlc2NyaXB0aW9uLCBhbGwgYWNjZXNzaWJpbGl0eSBzaG91bGQgZ28gdGhyb3VnaCB0aGlzIGJ1dHRvblxyXG4gICAgICBwZG9tVmlzaWJsZTogZmFsc2VcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBmcmFtZSBhcm91bmQgdGhlIGljb25cclxuICAgIGNvbnN0IGljb25GcmFtZSA9IG5ldyBSZWN0YW5nbGUoIDAsIDAsIGljb24ud2lkdGgsIGljb24uaGVpZ2h0ICk7XHJcblxyXG4gICAgY29uc3QgaWNvbkFuZEZyYW1lID0gbmV3IE5vZGUoIHtcclxuICAgICAgY2hpbGRyZW46IFsgaWNvbiwgaWNvbkZyYW1lIF1cclxuICAgIH0gKTtcclxuXHJcbiAgICBjb25zdCB0ZXh0ID0gbmV3IFRleHQoIHNjcmVlbi5uYW1lUHJvcGVydHksIHtcclxuICAgICAgZm9udDogbmV3IFBoZXRGb250KCAxMCApLFxyXG4gICAgICB0YW5kZW06IG9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3RleHQnICksXHJcbiAgICAgIHN0cmluZ1Byb3BlcnR5T3B0aW9uczogeyBwaGV0aW9SZWFkT25seTogdHJ1ZSB9IC8vIHRleHQgaXMgdXBkYXRlZCB2aWEgc2NyZWVuLm5hbWVQcm9wZXJ0eVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIHNwYWNpbmcgc2V0IGJ5IFByb3BlcnR5IGxpbmsgYmVsb3dcclxuICAgIGNvbnN0IGljb25BbmRUZXh0ID0gbmV3IFZCb3goIHtcclxuICAgICAgY2hpbGRyZW46IFsgaWNvbkFuZEZyYW1lLCB0ZXh0IF0sXHJcbiAgICAgIHBpY2thYmxlOiBmYWxzZSxcclxuICAgICAgdXNlc09wYWNpdHk6IHRydWUsIC8vIGhpbnQsIHNpbmNlIHdlIGNoYW5nZSBpdHMgb3BhY2l0eVxyXG4gICAgICBtYXhIZWlnaHQ6IG5hdkJhckhlaWdodFxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIGFkZCBhIHRyYW5zcGFyZW50IG92ZXJsYXkgZm9yIGlucHV0IGhhbmRsaW5nIGFuZCB0byBzaXplIHRvdWNoQXJlYS9tb3VzZUFyZWFcclxuICAgIGNvbnN0IG92ZXJsYXkgPSBuZXcgUmVjdGFuZ2xlKCB7IHJlY3RCb3VuZHM6IGljb25BbmRUZXh0LmJvdW5kcyB9ICk7XHJcblxyXG4gICAgLy8gaGlnaGxpZ2h0c1xyXG4gICAgY29uc3QgaGlnaGxpZ2h0V2lkdGggPSBnZXRIaWdobGlnaHRXaWR0aCggb3ZlcmxheSApO1xyXG4gICAgY29uc3QgYnJpZ2h0ZW5IaWdobGlnaHQgPSBuZXcgSGlnaGxpZ2h0Tm9kZSggaGlnaGxpZ2h0V2lkdGgsIG92ZXJsYXkuaGVpZ2h0LCB7XHJcbiAgICAgIGNlbnRlcjogaWNvbkFuZFRleHQuY2VudGVyLFxyXG4gICAgICBmaWxsOiAnd2hpdGUnXHJcbiAgICB9ICk7XHJcbiAgICBjb25zdCBkYXJrZW5IaWdobGlnaHQgPSBuZXcgSGlnaGxpZ2h0Tm9kZSggaGlnaGxpZ2h0V2lkdGgsIG92ZXJsYXkuaGVpZ2h0LCB7XHJcbiAgICAgIGNlbnRlcjogaWNvbkFuZFRleHQuY2VudGVyLFxyXG4gICAgICBmaWxsOiAnYmxhY2snXHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gSXMgdGhpcyBidXR0b24ncyBzY3JlZW4gc2VsZWN0ZWQ/XHJcbiAgICBjb25zdCBzZWxlY3RlZFByb3BlcnR5ID0gbmV3IERlcml2ZWRQcm9wZXJ0eSggWyBzY3JlZW5Qcm9wZXJ0eSBdLCBjdXJyZW50U2NyZWVuID0+ICggY3VycmVudFNjcmVlbiA9PT0gc2NyZWVuICkgKTtcclxuXHJcbiAgICAvLyAocGhldC1pbykgQ3JlYXRlIHRoZSBidXR0b24gbW9kZWwsIG5lZWRzIHRvIGJlIHB1YmxpYyBzbyB0aGF0IFBoRVQtaU8gd3JhcHBlcnMgY2FuIGhvb2sgdXAgdG8gaXQgaWZcclxuICAgIC8vIG5lZWRlZC4gTm90ZSBpdCBzaGFyZXMgYSB0YW5kZW0gd2l0aCB0aGlzLCBzbyB0aGUgZW1pdHRlciB3aWxsIGJlIGluc3RydW1lbnRlZCBhcyBhIGNoaWxkIG9mIHRoZSBidXR0b24uXHJcbiAgICAvLyBOb3RlIHRoYXQgdGhpcyBidXR0b25Nb2RlbCB3aWxsIGFsd2F5cyBiZSBwaGV0aW9SZWFkT25seSBmYWxzZSBkZXNwaXRlIHRoZSBwYXJlbnQgdmFsdWUuXHJcbiAgICB0aGlzLmJ1dHRvbk1vZGVsID0gbmV3IFB1c2hCdXR0b25Nb2RlbCgge1xyXG4gICAgICBsaXN0ZW5lcjogKCkgPT4ge1xyXG5cclxuICAgICAgICBzY3JlZW5Qcm9wZXJ0eS52YWx1ZSAhPT0gc2NyZWVuICYmIHRoaXMudm9pY2luZ1NwZWFrRnVsbFJlc3BvbnNlKCB7XHJcbiAgICAgICAgICBvYmplY3RSZXNwb25zZTogbnVsbCxcclxuICAgICAgICAgIGhpbnRSZXNwb25zZTogbnVsbFxyXG4gICAgICAgIH0gKTtcclxuICAgICAgICBzY3JlZW5Qcm9wZXJ0eS52YWx1ZSA9IHNjcmVlbjtcclxuICAgICAgfSxcclxuICAgICAgdGFuZGVtOiBvcHRpb25zLnRhbmRlbSxcclxuICAgICAgcGhldGlvRW5hYmxlZFByb3BlcnR5SW5zdHJ1bWVudGVkOiBmYWxzZVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIEhvb2sgdXAgdGhlIGlucHV0IGxpc3RlbmVyXHJcbiAgICBjb25zdCBwcmVzc0xpc3RlbmVyID0gdGhpcy5idXR0b25Nb2RlbC5jcmVhdGVQcmVzc0xpc3RlbmVyKCB7XHJcbiAgICAgIHRhbmRlbTogb3B0aW9ucy50YW5kZW0uY3JlYXRlVGFuZGVtKCAncHJlc3NMaXN0ZW5lcicgKVxyXG4gICAgfSApO1xyXG4gICAgdGhpcy5hZGRJbnB1dExpc3RlbmVyKCBwcmVzc0xpc3RlbmVyICk7XHJcblxyXG4gICAgdGhpcy5hZGRJbnB1dExpc3RlbmVyKCB7XHJcbiAgICAgIGZvY3VzOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy52b2ljaW5nU3BlYWtGdWxsUmVzcG9uc2UoIHtcclxuICAgICAgICAgIG9iamVjdFJlc3BvbnNlOiBudWxsLFxyXG4gICAgICAgICAgY29udGV4dFJlc3BvbnNlOiBudWxsXHJcbiAgICAgICAgfSApO1xyXG4gICAgICB9XHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gbWFuYWdlIGludGVyYWN0aW9uIGZlZWRiYWNrXHJcbiAgICBNdWx0aWxpbmsubXVsdGlsaW5rKFxyXG4gICAgICBbIHNlbGVjdGVkUHJvcGVydHksIHRoaXMuYnV0dG9uTW9kZWwubG9va3NQcmVzc2VkUHJvcGVydHksIHRoaXMuYnV0dG9uTW9kZWwubG9va3NPdmVyUHJvcGVydHksIG5hdmlnYXRpb25CYXJGaWxsUHJvcGVydHksIHRoaXMuYnV0dG9uTW9kZWwuZW5hYmxlZFByb3BlcnR5IF0sXHJcbiAgICAgICggc2VsZWN0ZWQsIGxvb2tzUHJlc3NlZCwgbG9va3NPdmVyLCBuYXZpZ2F0aW9uQmFyRmlsbCwgZW5hYmxlZCApID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgdXNlRGFya2VuSGlnaGxpZ2h0cyA9ICFuYXZpZ2F0aW9uQmFyRmlsbC5lcXVhbHMoIENvbG9yLkJMQUNLICk7XHJcblxyXG4gICAgICAgIC8vIENvbG9yIG1hdGNoIHllbGxvdyB3aXRoIHRoZSBQaEVUIExvZ29cclxuICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRDb2xvciA9IHVzZURhcmtlbkhpZ2hsaWdodHMgPyAnYmxhY2snIDogUGhldENvbG9yU2NoZW1lLkJVVFRPTl9ZRUxMT1c7XHJcbiAgICAgICAgY29uc3QgdW5zZWxlY3RlZFRleHRDb2xvciA9IHVzZURhcmtlbkhpZ2hsaWdodHMgPyAnZ3JheScgOiAnd2hpdGUnO1xyXG5cclxuICAgICAgICB0ZXh0LmZpbGwgPSBzZWxlY3RlZCA/IHNlbGVjdGVkVGV4dENvbG9yIDogdW5zZWxlY3RlZFRleHRDb2xvcjtcclxuICAgICAgICBpY29uQW5kVGV4dC5vcGFjaXR5ID0gc2VsZWN0ZWQgPyAxLjAgOiAoIGxvb2tzUHJlc3NlZCA/IDAuNjUgOiAwLjUgKTtcclxuXHJcbiAgICAgICAgYnJpZ2h0ZW5IaWdobGlnaHQudmlzaWJsZSA9ICF1c2VEYXJrZW5IaWdobGlnaHRzICYmIGVuYWJsZWQgJiYgKCBsb29rc092ZXIgfHwgbG9va3NQcmVzc2VkICk7XHJcbiAgICAgICAgZGFya2VuSGlnaGxpZ2h0LnZpc2libGUgPSB1c2VEYXJrZW5IaWdobGlnaHRzICYmIGVuYWJsZWQgJiYgKCBsb29rc092ZXIgfHwgbG9va3NQcmVzc2VkICk7XHJcblxyXG4gICAgICAgIC8vIFB1dCBhIGZyYW1lIGFyb3VuZCB0aGUgc2NyZWVuIGljb24sIGRlcGVuZGluZyBvbiB0aGUgbmF2aWdhdGlvbiBiYXIgYmFja2dyb3VuZCBjb2xvci5cclxuICAgICAgICBpZiAoIHNjcmVlbi5zaG93U2NyZWVuSWNvbkZyYW1lRm9yTmF2aWdhdGlvbkJhckZpbGwgPT09ICdibGFjaycgJiYgbmF2aWdhdGlvbkJhckZpbGwuZXF1YWxzKCBDb2xvci5CTEFDSyApICkge1xyXG4gICAgICAgICAgaWNvbkZyYW1lLnN0cm9rZSA9IFBoZXRDb2xvclNjaGVtZS5TQ1JFRU5fSUNPTl9GUkFNRTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsc2UgaWYgKCBzY3JlZW4uc2hvd1NjcmVlbkljb25GcmFtZUZvck5hdmlnYXRpb25CYXJGaWxsID09PSAnd2hpdGUnICYmIG5hdmlnYXRpb25CYXJGaWxsLmVxdWFscyggQ29sb3IuV0hJVEUgKSApIHtcclxuICAgICAgICAgIGljb25GcmFtZS5zdHJva2UgPSAnYmxhY2snOyAvLyBibGFjayBmcmFtZSBvbiBhIHdoaXRlIG5hdmJhclxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGljb25GcmFtZS5zdHJva2UgPSAndHJhbnNwYXJlbnQnOyAvLyBrZWVwIHRoZSBzYW1lIGJvdW5kcyBmb3Igc2ltcGxpY2l0eVxyXG4gICAgICAgIH1cclxuICAgICAgfSApO1xyXG5cclxuICAgIC8vIEtlZXAgdGhlIGN1cnNvciBpbiBzeW5jIHdpdGggaWYgdGhlIGJ1dHRvbiBpcyBlbmFibGVkLiBUaGlzIGRvZXNuJ3QgbmVlZCB0byBiZSBkaXNwb3NlZC5cclxuICAgIHRoaXMuYnV0dG9uTW9kZWwuZW5hYmxlZFByb3BlcnR5LmxpbmsoIGVuYWJsZWQgPT4ge1xyXG4gICAgICB0aGlzLmN1cnNvciA9IGVuYWJsZWQgPyBvcHRpb25zLmN1cnNvciA6IG51bGw7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gVXBkYXRlIHRoZSBidXR0b24ncyBsYXlvdXRcclxuICAgIGNvbnN0IHVwZGF0ZUxheW91dCA9ICgpID0+IHtcclxuXHJcbiAgICAgIC8vIGFkanVzdCB0aGUgdmVydGljYWwgc3BhY2UgYmV0d2VlbiBpY29uIGFuZCB0ZXh0LCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3BoZXRzaW1zL2pvaXN0L2lzc3Vlcy8xNDNcclxuICAgICAgaWNvbkFuZFRleHQuc3BhY2luZyA9IFV0aWxzLmNsYW1wKCAxMiAtIHRleHQuaGVpZ2h0LCAwLCAzICk7XHJcblxyXG4gICAgICAvLyBhZGp1c3QgdGhlIG92ZXJsYXlcclxuICAgICAgb3ZlcmxheS5zZXRSZWN0Qm91bmRzKCBpY29uQW5kVGV4dC5ib3VuZHMgKTtcclxuXHJcbiAgICAgIC8vIGFkanVzdCB0aGUgaGlnaGxpZ2h0c1xyXG4gICAgICBicmlnaHRlbkhpZ2hsaWdodC5zcGFjaW5nID0gZGFya2VuSGlnaGxpZ2h0LnNwYWNpbmcgPSBnZXRIaWdobGlnaHRXaWR0aCggb3ZlcmxheSApO1xyXG4gICAgICBicmlnaHRlbkhpZ2hsaWdodC5jZW50ZXIgPSBkYXJrZW5IaWdobGlnaHQuY2VudGVyID0gaWNvbkFuZFRleHQuY2VudGVyO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBVcGRhdGUgdGhlIGJ1dHRvbidzIGxheW91dCB3aGVuIHRoZSBzY3JlZW4gbmFtZSBjaGFuZ2VzXHJcbiAgICBpY29uQW5kVGV4dC5ib3VuZHNQcm9wZXJ0eS5sYXp5TGluayggdXBkYXRlTGF5b3V0ICk7XHJcbiAgICB0ZXh0LmJvdW5kc1Byb3BlcnR5LmxpbmsoIHVwZGF0ZUxheW91dCApO1xyXG5cclxuICAgIHRoaXMuY2hpbGRyZW4gPSBbXHJcbiAgICAgIGljb25BbmRUZXh0LFxyXG4gICAgICBvdmVybGF5LFxyXG4gICAgICBicmlnaHRlbkhpZ2hsaWdodCxcclxuICAgICAgZGFya2VuSGlnaGxpZ2h0XHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IG5lZWRzSWNvbk1heFdpZHRoID0gb3B0aW9ucy5tYXhCdXR0b25XaWR0aCAmJiAoIHRoaXMud2lkdGggPiBvcHRpb25zLm1heEJ1dHRvbldpZHRoICk7XHJcblxyXG4gICAgLy8gQ29uc3RyYWluIHRleHQgYW5kIGljb24gd2lkdGgsIGlmIG5lY2Vzc2FyeVxyXG4gICAgaWYgKCBuZWVkc0ljb25NYXhXaWR0aCApIHtcclxuICAgICAgdGV4dC5tYXhXaWR0aCA9IGljb24ubWF4V2lkdGggPSBvcHRpb25zLm1heEJ1dHRvbldpZHRoISAtICggdGhpcy53aWR0aCAtIGljb25BbmRUZXh0LndpZHRoICk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgLy8gRG9uJ3QgYWxsb3cgdGhlIHRleHQgdG8gZ3JvdyBsYXJnZXIgdGhhbiB0aGUgaWNvbiBpZiBjaGFuZ2VkIGxhdGVyIG9uIHVzaW5nIFBoRVQtaU8sIHNlZSAjNDM4XHJcbiAgICAgIC8vIFRleHQgaXMgYWxsb3dlZCB0byBnbyBiZXlvbmQgdGhlIGJvdW5kcyBvZiB0aGUgaWNvbiwgaGVuY2Ugd2UgdXNlIGB0aGlzLndpZHRoYCBpbnN0ZWFkIG9mIGBpY29uLndpZHRoYFxyXG4gICAgICB0ZXh0Lm1heFdpZHRoID0gdGhpcy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBuZWVkc0ljb25NYXhXaWR0aCAmJiBhc3NlcnQgJiYgYXNzZXJ0KCBVdGlscy50b0ZpeGVkKCB0aGlzLndpZHRoLCAwICkgPT09IFV0aWxzLnRvRml4ZWQoIG9wdGlvbnMubWF4QnV0dG9uV2lkdGghLCAwICksXHJcbiAgICAgIGB0aGlzLndpZHRoICR7dGhpcy53aWR0aH0gIT09IG9wdGlvbnMubWF4QnV0dG9uV2lkdGggJHtvcHRpb25zLm1heEJ1dHRvbldpZHRofWAgKTtcclxuXHJcbiAgICAvLyBwZG9tIC0gUGFzcyBhIHNoYXBlIHRvIHRoZSBmb2N1c0hpZ2hsaWdodCB0byBwcmV2ZW50IGRpbGF0aW9uLCB0aGVuIHR3ZWFrIHRoZSB0b3AgdXAganVzdCBhIGhhaXIuXHJcbiAgICBjb25zdCBoaWdobGlnaHRMaW5lV2lkdGggPSBGb2N1c0hpZ2hsaWdodFBhdGguZ2V0T3V0ZXJMaW5lV2lkdGhGcm9tTm9kZSggdGhpcyApO1xyXG4gICAgdGhpcy5mb2N1c0hpZ2hsaWdodCA9IFNoYXBlLmJvdW5kcyggdGhpcy5ib3VuZHMud2l0aE1pblkoIHRoaXMuYm91bmRzLm1pblkgLSBoaWdobGlnaHRMaW5lV2lkdGggLyAyICkgKTtcclxuXHJcbiAgICB0aGlzLm11dGF0ZSggb3B0aW9ucyApO1xyXG4gIH1cclxufVxyXG5cclxuam9pc3QucmVnaXN0ZXIoICdOYXZpZ2F0aW9uQmFyU2NyZWVuQnV0dG9uJywgTmF2aWdhdGlvbkJhclNjcmVlbkJ1dHRvbiApO1xyXG5leHBvcnQgZGVmYXVsdCBOYXZpZ2F0aW9uQmFyU2NyZWVuQnV0dG9uOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsZUFBZSxNQUFNLGtDQUFrQztBQUU5RCxPQUFPQyxTQUFTLE1BQU0sNEJBQTRCO0FBRWxELE9BQU9DLEtBQUssTUFBTSx1QkFBdUI7QUFDekMsU0FBU0MsS0FBSyxRQUFRLDBCQUEwQjtBQUNoRCxPQUFPQyxTQUFTLE1BQU0saUNBQWlDO0FBQ3ZELE9BQU9DLGVBQWUsTUFBTSwwQ0FBMEM7QUFDdEUsT0FBT0MsUUFBUSxNQUFNLG1DQUFtQztBQUN4RCxTQUFTQyxLQUFLLEVBQUVDLGtCQUFrQixFQUFFQyxJQUFJLEVBQWVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxJQUFJLEVBQUVDLE9BQU8sUUFBd0IsNkJBQTZCO0FBQzFJLE9BQU9DLGVBQWUsTUFBTSx5Q0FBeUM7QUFDckUsT0FBT0MsYUFBYSxNQUFNLG9CQUFvQjtBQUM5QyxPQUFPQyxLQUFLLE1BQU0sWUFBWTtBQUk5QjtBQUNBLE1BQU1DLGlCQUFpQixHQUFHLENBQUM7QUFDM0IsTUFBTUMsaUJBQWlCLEdBQUtDLE9BQWEsSUFBTUEsT0FBTyxDQUFDQyxLQUFLLEdBQUssQ0FBQyxHQUFHSCxpQkFBbUI7QUFReEYsTUFBTUkseUJBQXlCLFNBQVNSLE9BQU8sQ0FBRUosSUFBSyxDQUFDLENBQUM7RUFLdEQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNTYSxXQUFXQSxDQUFFQyx5QkFBbUQsRUFBRUMsY0FBbUMsRUFDeEZDLE1BQWlCLEVBQUVDLGNBQXNCLEVBQUVDLFlBQW9CLEVBQy9EQyxlQUFpRCxFQUFHO0lB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