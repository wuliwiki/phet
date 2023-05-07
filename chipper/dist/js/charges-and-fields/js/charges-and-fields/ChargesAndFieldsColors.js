// Copyright 2015-2022, University of Colorado Boulder

/**
 * Location for most colors of the simulation (especially those that could be tweaked)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Martin Veillette (Berea College)
 * @author Andrew Adare <andrew.adare@colorado.edu>
 */

import { Color, ProfileColorProperty } from '../../../scenery/js/imports.js';
import chargesAndFields from '../chargesAndFields.js';

// constants
const BLACK = new Color(0, 0, 0);
const WHITE = new Color(255, 255, 255);
const RED = new Color(255, 0, 0);
const BLUE = new Color(0, 0, 255);
const ChargesAndFieldsColors = {
  backgroundProperty: new ProfileColorProperty(chargesAndFields, 'background', {
    default: BLACK,
    projector: WHITE
  }),
  reversedBackgroundProperty: new ProfileColorProperty(chargesAndFields, 'reversedBackground', {
    default: WHITE,
    projector: BLACK
  }),
  controlPanelBorderProperty: new ProfileColorProperty(chargesAndFields, 'controlPanelBorder', {
    default: new Color(210, 210, 210),
    projector: new Color(192, 192, 192)
  }),
  controlPanelFillProperty: new ProfileColorProperty(chargesAndFields, 'controlPanelFill', {
    default: new Color(10, 10, 10),
    projector: new Color(238, 238, 238)
  }),
  controlPanelTextProperty: new ProfileColorProperty(chargesAndFields, 'controlPanelText', {
    default: new Color(229, 229, 126),
    projector: BLACK
  }),
  enclosureTextProperty: new ProfileColorProperty(chargesAndFields, 'enclosureText', {
    default: WHITE,
    projector: BLACK
  }),
  enclosureFillProperty: new ProfileColorProperty(chargesAndFields, 'enclosureFill', {
    default: new Color(10, 10, 10),
    projector: new Color(238, 238, 238)
  }),
  enclosureBorderProperty: new ProfileColorProperty(chargesAndFields, 'enclosureBorder', {
    default: new Color(210, 210, 210),
    projector: new Color(192, 192, 192)
  }),
  checkboxProperty: new ProfileColorProperty(chargesAndFields, 'checkbox', {
    default: new Color(230, 230, 230),
    projector: BLACK
  }),
  checkboxBackgroundProperty: new ProfileColorProperty(chargesAndFields, 'checkboxBackground', {
    default: new Color(30, 30, 30),
    projector: WHITE
  }),
  voltageLabelProperty: new ProfileColorProperty(chargesAndFields, 'voltageLabel', {
    default: WHITE,
    projector: BLACK
  }),
  voltageLabelBackgroundProperty: new ProfileColorProperty(chargesAndFields, 'voltageLabelBackground', {
    default: new Color(0, 0, 0, 0.5),
    projector: new Color(255, 255, 255, 0.5)
  }),
  electricPotentialLineProperty: new ProfileColorProperty(chargesAndFields, 'electricPotentialLine', {
    default: new Color(50, 255, 100),
    projector: BLACK
  }),
  measuringTapeTextProperty: new ProfileColorProperty(chargesAndFields, 'measuringTapeText', {
    default: WHITE,
    projector: BLACK
  }),
  electricFieldSensorCircleFillProperty: new ProfileColorProperty(chargesAndFields, 'electricFieldSensorCircleFill', {
    default: new Color(255, 255, 0),
    projector: new Color(255, 153, 0)
  }),
  electricFieldSensorCircleStrokeProperty: new ProfileColorProperty(chargesAndFields, 'electricFieldSensorCircleStroke', {
    default: new Color(128, 120, 133),
    projector: BLACK
  }),
  electricFieldSensorArrowProperty: new ProfileColorProperty(chargesAndFields, 'electricFieldSensorArrow', {
    default: RED,
    projector: RED
  }),
  electricFieldSensorLabelProperty: new ProfileColorProperty(chargesAndFields, 'electricFieldSensorLabel', {
    default: new Color(229, 229, 126),
    projector: BLACK
  }),
  gridStrokeProperty: new ProfileColorProperty(chargesAndFields, 'gridStroke', {
    default: new Color(50, 50, 50),
    projector: new Color(255, 204, 51)
  }),
  gridLengthScaleArrowStrokeProperty: new ProfileColorProperty(chargesAndFields, 'gridLengthScaleArrowStroke', {
    default: WHITE,
    projector: RED
  }),
  gridLengthScaleArrowFillProperty: new ProfileColorProperty(chargesAndFields, 'gridLengthScaleArrowFill', {
    default: WHITE,
    projector: new Color(255, 153, 0)
  }),
  gridTextFillProperty: new ProfileColorProperty(chargesAndFields, 'gridTextFill', {
    default: WHITE,
    projector: BLACK
  }),
  electricPotentialSensorCircleStrokeProperty: new ProfileColorProperty(chargesAndFields, 'electricPotentialSensorCircleStroke', {
    default: WHITE,
    projector: BLACK
  }),
  electricPotentialSensorCrosshairStrokeProperty: new ProfileColorProperty(chargesAndFields, 'electricPotentialSensorCrosshairStroke', {
    default: WHITE,
    projector: BLACK
  }),
  electricPotentialPanelTitleTextProperty: new ProfileColorProperty(chargesAndFields, 'electricPotentialPanelTitleText', {
    default: WHITE,
    projector: WHITE
  }),
  electricPotentialSensorTextPanelTextFillProperty: new ProfileColorProperty(chargesAndFields, 'electricPotentialSensorTextPanelTextFill', {
    default: BLACK,
    projector: BLACK
  }),
  electricPotentialSensorTextPanelBorderProperty: new ProfileColorProperty(chargesAndFields, 'electricPotentialSensorTextPanelBorder', {
    default: BLACK,
    projector: new Color(250, 250, 250)
  }),
  electricPotentialSensorTextPanelBackgroundProperty: new ProfileColorProperty(chargesAndFields, 'electricPotentialSensorTextPanelBackground', {
    default: WHITE,
    projector: WHITE
  }),
  electricFieldGridSaturationProperty: new ProfileColorProperty(chargesAndFields, 'electricFieldGridSaturation', {
    default: WHITE,
    projector: RED
  }),
  electricFieldGridSaturationStrokeProperty: new ProfileColorProperty(chargesAndFields, 'electricFieldGridSaturationStroke', {
    default: BLACK,
    projector: BLACK
  }),
  electricFieldGridZeroProperty: new ProfileColorProperty(chargesAndFields, 'electricFieldGridZero', {
    default: BLACK,
    projector: WHITE
  }),
  electricPotentialGridSaturationPositiveProperty: new ProfileColorProperty(chargesAndFields, 'electricPotentialGridSaturationPositive', {
    default: new Color(210, 0, 0),
    projector: new Color(210, 0, 0)
  }),
  electricPotentialGridZeroProperty: new ProfileColorProperty(chargesAndFields, 'electricPotentialGridZero', {
    default: BLACK,
    projector: WHITE
  }),
  electricPotentialGridSaturationNegativeProperty: new ProfileColorProperty(chargesAndFields, 'electricPotentialGridSaturationNegative', {
    default: BLUE,
    projector: BLUE
  })
};
chargesAndFields.register('ChargesAndFieldsColors', ChargesAndFieldsColors);
export default ChargesAndFieldsColors;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb2xvciIsIlByb2ZpbGVDb2xvclByb3BlcnR5IiwiY2hhcmdlc0FuZEZpZWxkcyIsIkJMQUNLIiwiV0hJVEUiLCJSRUQiLCJCTFVFIiwiQ2hhcmdlc0FuZEZpZWxkc0NvbG9ycyIsImJhY2tncm91bmRQcm9wZXJ0eSIsImRlZmF1bHQiLCJwcm9qZWN0b3IiLCJyZXZlcnNlZEJhY2tncm91bmRQcm9wZXJ0eSIsImNvbnRyb2xQYW5lbEJvcmRlclByb3BlcnR5IiwiY29udHJvbFBhbmVsRmlsbFByb3BlcnR5IiwiY29udHJvbFBhbmVsVGV4dFByb3BlcnR5IiwiZW5jbG9zdXJlVGV4dFByb3BlcnR5IiwiZW5jbG9zdXJlRmlsbFByb3BlcnR5IiwiZW5jbG9zdXJlQm9yZGVyUHJvcGVydHkiLCJjaGVja2JveFByb3BlcnR5IiwiY2hlY2tib3hCYWNrZ3JvdW5kUHJvcGVydHkiLCJ2b2x0YWdlTGFiZWxQcm9wZXJ0eSIsInZvbHRhZ2VMYWJlbEJhY2tncm91bmRQcm9wZXJ0eSIsImVsZWN0cmljUG90ZW50aWFsTGluZVByb3BlcnR5IiwibWVhc3VyaW5nVGFwZVRleHRQcm9wZXJ0eSIsImVsZWN0cmljRmllbGRTZW5zb3JDaXJjbGVGaWxsUHJvcGVydHkiLCJlbGVjdHJpY0ZpZWxkU2Vuc29yQ2lyY2xlU3Ryb2tlUHJvcGVydHkiLCJlbGVjdHJpY0ZpZWxkU2Vuc29yQXJyb3dQcm9wZXJ0eSIsImVsZWN0cmljRmllbGRTZW5zb3JMYWJlbFByb3BlcnR5IiwiZ3JpZFN0cm9rZVByb3BlcnR5IiwiZ3JpZExlbmd0aFNjYWxlQXJyb3dTdHJva2VQcm9wZXJ0eSIsImdyaWRMZW5ndGhTY2FsZUFycm93RmlsbFByb3BlcnR5IiwiZ3JpZFRleHRGaWxsUHJvcGVydHkiLCJlbGVjdHJpY1BvdGVudGlhbFNlbnNvckNpcmNsZVN0cm9rZVByb3BlcnR5IiwiZWxlY3RyaWNQb3RlbnRpYWxTZW5zb3JDcm9zc2hhaXJTdHJva2VQcm9wZXJ0eSIsImVsZWN0cmljUG90ZW50aWFsUGFuZWxUaXRsZVRleHRQcm9wZXJ0eSIsImVsZWN0cmljUG90ZW50aWFsU2Vuc29yVGV4dFBhbmVsVGV4dEZpbGxQcm9wZXJ0eSIsImVsZWN0cmljUG90ZW50aWFsU2Vuc29yVGV4dFBhbmVsQm9yZGVyUHJvcGVydHkiLCJlbGVjdHJpY1BvdGVudGlhbFNlbnNvclRleHRQYW5lbEJhY2tncm91bmRQcm9wZXJ0eSIsImVsZWN0cmljRmllbGRHcmlkU2F0dXJhdGlvblByb3BlcnR5IiwiZWxlY3RyaWNGaWVsZEdyaWRTYXR1cmF0aW9uU3Ryb2tlUHJvcGVydHkiLCJlbGVjdHJpY0ZpZWxkR3JpZFplcm9Qcm9wZXJ0eSIsImVsZWN0cmljUG90ZW50aWFsR3JpZFNhdHVyYXRpb25Qb3NpdGl2ZVByb3BlcnR5IiwiZWxlY3RyaWNQb3RlbnRpYWxHcmlkWmVyb1Byb3BlcnR5IiwiZWxlY3RyaWNQb3RlbnRpYWxHcmlkU2F0dXJhdGlvbk5lZ2F0aXZlUHJvcGVydHkiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkNoYXJnZXNBbmRGaWVsZHNDb2xvcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTUtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogTG9jYXRpb24gZm9yIG1vc3QgY29sb3JzIG9mIHRoZSBzaW11bGF0aW9uIChlc3BlY2lhbGx5IHRob3NlIHRoYXQgY291bGQgYmUgdHdlYWtlZClcclxuICpcclxuICogQGF1dGhvciBKb25hdGhhbiBPbHNvbiA8am9uYXRoYW4ub2xzb25AY29sb3JhZG8uZWR1PlxyXG4gKiBAYXV0aG9yIE1hcnRpbiBWZWlsbGV0dGUgKEJlcmVhIENvbGxlZ2UpXHJcbiAqIEBhdXRob3IgQW5kcmV3IEFkYXJlIDxhbmRyZXcuYWRhcmVAY29sb3JhZG8uZWR1PlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IENvbG9yLCBQcm9maWxlQ29sb3JQcm9wZXJ0eSB9IGZyb20gJy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBjaGFyZ2VzQW5kRmllbGRzIGZyb20gJy4uL2NoYXJnZXNBbmRGaWVsZHMuanMnO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IEJMQUNLID0gbmV3IENvbG9yKCAwLCAwLCAwICk7XHJcbmNvbnN0IFdISVRFID0gbmV3IENvbG9yKCAyNTUsIDI1NSwgMjU1ICk7XHJcbmNvbnN0IFJFRCA9IG5ldyBDb2xvciggMjU1LCAwLCAwICk7XHJcbmNvbnN0IEJMVUUgPSBuZXcgQ29sb3IoIDAsIDAsIDI1NSApO1xyXG5cclxuY29uc3QgQ2hhcmdlc0FuZEZpZWxkc0NvbG9ycyA9IHtcclxuICBiYWNrZ3JvdW5kUHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2hhcmdlc0FuZEZpZWxkcywgJ2JhY2tncm91bmQnLCB7XHJcbiAgICBkZWZhdWx0OiBCTEFDSyxcclxuICAgIHByb2plY3RvcjogV0hJVEVcclxuICB9ICksXHJcbiAgcmV2ZXJzZWRCYWNrZ3JvdW5kUHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2hhcmdlc0FuZEZpZWxkcywgJ3JldmVyc2VkQmFja2dyb3VuZCcsIHtcclxuICAgIGRlZmF1bHQ6IFdISVRFLFxyXG4gICAgcHJvamVjdG9yOiBCTEFDS1xyXG4gIH0gKSxcclxuICBjb250cm9sUGFuZWxCb3JkZXJQcm9wZXJ0eTogbmV3IFByb2ZpbGVDb2xvclByb3BlcnR5KCBjaGFyZ2VzQW5kRmllbGRzLCAnY29udHJvbFBhbmVsQm9yZGVyJywge1xyXG4gICAgZGVmYXVsdDogbmV3IENvbG9yKCAyMTAsIDIxMCwgMjEwICksXHJcbiAgICBwcm9qZWN0b3I6IG5ldyBDb2xvciggMTkyLCAxOTIsIDE5MiApXHJcbiAgfSApLFxyXG4gIGNvbnRyb2xQYW5lbEZpbGxQcm9wZXJ0eTogbmV3IFByb2ZpbGVDb2xvclByb3BlcnR5KCBjaGFyZ2VzQW5kRmllbGRzLCAnY29udHJvbFBhbmVsRmlsbCcsIHtcclxuICAgIGRlZmF1bHQ6IG5ldyBDb2xvciggMTAsIDEwLCAxMCApLFxyXG4gICAgcHJvamVjdG9yOiBuZXcgQ29sb3IoIDIzOCwgMjM4LCAyMzggKVxyXG4gIH0gKSxcclxuICBjb250cm9sUGFuZWxUZXh0UHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2hhcmdlc0FuZEZpZWxkcywgJ2NvbnRyb2xQYW5lbFRleHQnLCB7XHJcbiAgICBkZWZhdWx0OiBuZXcgQ29sb3IoIDIyOSwgMjI5LCAxMjYgKSxcclxuICAgIHByb2plY3RvcjogQkxBQ0tcclxuICB9ICksXHJcbiAgZW5jbG9zdXJlVGV4dFByb3BlcnR5OiBuZXcgUHJvZmlsZUNvbG9yUHJvcGVydHkoIGNoYXJnZXNBbmRGaWVsZHMsICdlbmNsb3N1cmVUZXh0Jywge1xyXG4gICAgZGVmYXVsdDogV0hJVEUsXHJcbiAgICBwcm9qZWN0b3I6IEJMQUNLXHJcbiAgfSApLFxyXG4gIGVuY2xvc3VyZUZpbGxQcm9wZXJ0eTogbmV3IFByb2ZpbGVDb2xvclByb3BlcnR5KCBjaGFyZ2VzQW5kRmllbGRzLCAnZW5jbG9zdXJlRmlsbCcsIHtcclxuICAgIGRlZmF1bHQ6IG5ldyBDb2xvciggMTAsIDEwLCAxMCApLFxyXG4gICAgcHJvamVjdG9yOiBuZXcgQ29sb3IoIDIzOCwgMjM4LCAyMzggKVxyXG4gIH0gKSxcclxuICBlbmNsb3N1cmVCb3JkZXJQcm9wZXJ0eTogbmV3IFByb2ZpbGVDb2xvclByb3BlcnR5KCBjaGFyZ2VzQW5kRmllbGRzLCAnZW5jbG9zdXJlQm9yZGVyJywge1xyXG4gICAgZGVmYXVsdDogbmV3IENvbG9yKCAyMTAsIDIxMCwgMjEwICksXHJcbiAgICBwcm9qZWN0b3I6IG5ldyBDb2xvciggMTkyLCAxOTIsIDE5MiApXHJcbiAgfSApLFxyXG4gIGNoZWNrYm94UHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2hhcmdlc0FuZEZpZWxkcywgJ2NoZWNrYm94Jywge1xyXG4gICAgZGVmYXVsdDogbmV3IENvbG9yKCAyMzAsIDIzMCwgMjMwICksXHJcbiAgICBwcm9qZWN0b3I6IEJMQUNLXHJcbiAgfSApLFxyXG4gIGNoZWNrYm94QmFja2dyb3VuZFByb3BlcnR5OiBuZXcgUHJvZmlsZUNvbG9yUHJvcGVydHkoIGNoYXJnZXNBbmRGaWVsZHMsICdjaGVja2JveEJhY2tncm91bmQnLCB7XHJcbiAgICBkZWZhdWx0OiBuZXcgQ29sb3IoIDMwLCAzMCwgMzAgKSxcclxuICAgIHByb2plY3RvcjogV0hJVEVcclxuICB9ICksXHJcbiAgdm9sdGFnZUxhYmVsUHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2hhcmdlc0FuZEZpZWxkcywgJ3ZvbHRhZ2VMYWJlbCcsIHtcclxuICAgIGRlZmF1bHQ6IFdISVRFLFxyXG4gICAgcHJvamVjdG9yOiBCTEFDS1xyXG4gIH0gKSxcclxuICB2b2x0YWdlTGFiZWxCYWNrZ3JvdW5kUHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2hhcmdlc0FuZEZpZWxkcywgJ3ZvbHRhZ2VMYWJlbEJhY2tncm91bmQnLCB7XHJcbiAgICBkZWZhdWx0OiBuZXcgQ29sb3IoIDAsIDAsIDAsIDAuNSApLFxyXG4gICAgcHJvamVjdG9yOiBuZXcgQ29sb3IoIDI1NSwgMjU1LCAyNTUsIDAuNSApXHJcbiAgfSApLFxyXG4gIGVsZWN0cmljUG90ZW50aWFsTGluZVByb3BlcnR5OiBuZXcgUHJvZmlsZUNvbG9yUHJvcGVydHkoIGNoYXJnZXNBbmRGaWVsZHMsICdlbGVjdHJpY1BvdGVudGlhbExpbmUnLCB7XHJcbiAgICBkZWZhdWx0OiBuZXcgQ29sb3IoIDUwLCAyNTUsIDEwMCApLFxyXG4gICAgcHJvamVjdG9yOiBCTEFDS1xyXG4gIH0gKSxcclxuICBtZWFzdXJpbmdUYXBlVGV4dFByb3BlcnR5OiBuZXcgUHJvZmlsZUNvbG9yUHJvcGVydHkoIGNoYXJnZXNBbmRGaWVsZHMsICdtZWFzdXJpbmdUYXBlVGV4dCcsIHtcclxuICAgIGRlZmF1bHQ6IFdISVRFLFxyXG4gICAgcHJvamVjdG9yOiBCTEFDS1xyXG4gIH0gKSxcclxuICBlbGVjdHJpY0ZpZWxkU2Vuc29yQ2lyY2xlRmlsbFByb3BlcnR5OiBuZXcgUHJvZmlsZUNvbG9yUHJvcGVydHkoIGNoYXJnZXNBbmRGaWVsZHMsICdlbGVjdHJpY0ZpZWxkU2Vuc29yQ2lyY2xlRmlsbCcsIHtcclxuICAgIGRlZmF1bHQ6IG5ldyBDb2xvciggMjU1LCAyNTUsIDAgKSxcclxuICAgIHByb2plY3RvcjogbmV3IENvbG9yKCAyNTUsIDE1MywgMCApXHJcbiAgfSApLFxyXG4gIGVsZWN0cmljRmllbGRTZW5zb3JDaXJjbGVTdHJva2VQcm9wZXJ0eTogbmV3IFByb2ZpbGVDb2xvclByb3BlcnR5KCBjaGFyZ2VzQW5kRmllbGRzLCAnZWxlY3RyaWNGaWVsZFNlbnNvckNpcmNsZVN0cm9rZScsIHtcclxuICAgIGRlZmF1bHQ6IG5ldyBDb2xvciggMTI4LCAxMjAsIDEzMyApLFxyXG4gICAgcHJvamVjdG9yOiBCTEFDS1xyXG4gIH0gKSxcclxuICBlbGVjdHJpY0ZpZWxkU2Vuc29yQXJyb3dQcm9wZXJ0eTogbmV3IFByb2ZpbGVDb2xvclByb3BlcnR5KCBjaGFyZ2VzQW5kRmllbGRzLCAnZWxlY3RyaWNGaWVsZFNlbnNvckFycm93Jywge1xyXG4gICAgZGVmYXVsdDogUkVELFxyXG4gICAgcHJvamVjdG9yOiBSRURcclxuICB9ICksXHJcbiAgZWxlY3RyaWNGaWVsZFNlbnNvckxhYmVsUHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2hhcmdlc0FuZEZpZWxkcywgJ2VsZWN0cmljRmllbGRTZW5zb3JMYWJlbCcsIHtcclxuICAgIGRlZmF1bHQ6IG5ldyBDb2xvciggMjI5LCAyMjksIDEyNiApLFxyXG4gICAgcHJvamVjdG9yOiBCTEFDS1xyXG4gIH0gKSxcclxuICBncmlkU3Ryb2tlUHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2hhcmdlc0FuZEZpZWxkcywgJ2dyaWRTdHJva2UnLCB7XHJcbiAgICBkZWZhdWx0OiBuZXcgQ29sb3IoIDUwLCA1MCwgNTAgKSxcclxuICAgIHByb2plY3RvcjogbmV3IENvbG9yKCAyNTUsIDIwNCwgNTEgKVxyXG4gIH0gKSxcclxuICBncmlkTGVuZ3RoU2NhbGVBcnJvd1N0cm9rZVByb3BlcnR5OiBuZXcgUHJvZmlsZUNvbG9yUHJvcGVydHkoIGNoYXJnZXNBbmRGaWVsZHMsICdncmlkTGVuZ3RoU2NhbGVBcnJvd1N0cm9rZScsIHtcclxuICAgIGRlZmF1bHQ6IFdISVRFLFxyXG4gICAgcHJvamVjdG9yOiBSRURcclxuICB9ICksXHJcbiAgZ3JpZExlbmd0aFNjYWxlQXJyb3dGaWxsUHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2hhcmdlc0FuZEZpZWxkcywgJ2dyaWRMZW5ndGhTY2FsZUFycm93RmlsbCcsIHtcclxuICAgIGRlZmF1bHQ6IFdISVRFLFxyXG4gICAgcHJvamVjdG9yOiBuZXcgQ29sb3IoIDI1NSwgMTUzLCAwIClcclxuICB9ICksXHJcbiAgZ3JpZFRleHRGaWxsUHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2hhcmdlc0FuZEZpZWxkcywgJ2dyaWRUZXh0RmlsbCcsIHtcclxuICAgIGRlZmF1bHQ6IFdISVRFLFxyXG4gICAgcHJvamVjdG9yOiBCTEFDS1xyXG4gIH0gKSxcclxuICBlbGVjdHJpY1BvdGVudGlhbFNlbnNvckNpcmNsZVN0cm9rZVByb3BlcnR5OiBuZXcgUHJvZmlsZUNvbG9yUHJvcGVydHkoIGNoYXJnZXNBbmRGaWVsZHMsICdlbGVjdHJpY1BvdGVudGlhbFNlbnNvckNpcmNsZVN0cm9rZScsIHtcclxuICAgIGRlZmF1bHQ6IFdISVRFLFxyXG4gICAgcHJvamVjdG9yOiBCTEFDS1xyXG4gIH0gKSxcclxuICBlbGVjdHJpY1BvdGVudGlhbFNlbnNvckNyb3NzaGFpclN0cm9rZVByb3BlcnR5OiBuZXcgUHJvZmlsZUNvbG9yUHJvcGVydHkoIGNoYXJnZXNBbmRGaWVsZHMsICdlbGVjdHJpY1BvdGVudGlhbFNlbnNvckNyb3NzaGFpclN0cm9rZScsIHtcclxuICAgIGRlZmF1bHQ6IFdISVRFLFxyXG4gICAgcHJvamVjdG9yOiBCTEFDS1xyXG4gIH0gKSxcclxuICBlbGVjdHJpY1BvdGVudGlhbFBhbmVsVGl0bGVUZXh0UHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2hhcmdlc0FuZEZpZWxkcywgJ2VsZWN0cmljUG90ZW50aWFsUGFuZWxUaXRsZVRleHQnLCB7XHJcbiAgICBkZWZhdWx0OiBXSElURSxcclxuICAgIHByb2plY3RvcjogV0hJVEVcclxuICB9ICksXHJcbiAgZWxlY3RyaWNQb3RlbnRpYWxTZW5zb3JUZXh0UGFuZWxUZXh0RmlsbFByb3BlcnR5OiBuZXcgUHJvZmlsZUNvbG9yUHJvcGVydHkoIGNoYXJnZXNBbmRGaWVsZHMsICdlbGVjdHJpY1BvdGVudGlhbFNlbnNvclRleHRQYW5lbFRleHRGaWxsJywge1xyXG4gICAgZGVmYXVsdDogQkxBQ0ssXHJcbiAgICBwcm9qZWN0b3I6IEJMQUNLXHJcbiAgfSApLFxyXG4gIGVsZWN0cmljUG90ZW50aWFsU2Vuc29yVGV4dFBhbmVsQm9yZGVyUHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2hhcmdlc0FuZEZpZWxkcywgJ2VsZWN0cmljUG90ZW50aWFsU2Vuc29yVGV4dFBhbmVsQm9yZGVyJywge1xyXG4gICAgZGVmYXVsdDogQkxBQ0ssXHJcbiAgICBwcm9qZWN0b3I6IG5ldyBDb2xvciggMjUwLCAyNTAsIDI1MCApXHJcbiAgfSApLFxyXG4gIGVsZWN0cmljUG90ZW50aWFsU2Vuc29yVGV4dFBhbmVsQmFja2dyb3VuZFByb3BlcnR5OiBuZXcgUHJvZmlsZUNvbG9yUHJvcGVydHkoIGNoYXJnZXNBbmRGaWVsZHMsICdlbGVjdHJpY1BvdGVudGlhbFNlbnNvclRleHRQYW5lbEJhY2tncm91bmQnLCB7XHJcbiAgICBkZWZhdWx0OiBXSElURSxcclxuICAgIHByb2plY3RvcjogV0hJVEVcclxuICB9ICksXHJcbiAgZWxlY3RyaWNGaWVsZEdyaWRTYXR1cmF0aW9uUHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2hhcmdlc0FuZEZpZWxkcywgJ2VsZWN0cmljRmllbGRHcmlkU2F0dXJhdGlvbicsIHtcclxuICAgIGRlZmF1bHQ6IFdISVRFLFxyXG4gICAgcHJvamVjdG9yOiBSRURcclxuICB9ICksXHJcbiAgZWxlY3RyaWNGaWVsZEdyaWRTYXR1cmF0aW9uU3Ryb2tlUHJvcGVydHk6IG5ldyBQcm9maWxlQ29sb3JQcm9wZXJ0eSggY2hhcmdlc0FuZEZpZWxkcywgJ2VsZWN0cmljRmllbGRHcmlkU2F0dXJhdGlvblN0cm9rZScsIHtcclxuICAgIGRlZmF1bHQ6IEJMQUNLLFxyXG4gICAgcHJvamVjdG9yOiBCTEFDS1xyXG4gIH0gKSxcclxuICBlbGVjdHJpY0ZpZWxkR3JpZFplcm9Qcm9wZXJ0eTogbmV3IFByb2ZpbGVDb2xvclByb3BlcnR5KCBjaGFyZ2VzQW5kRmllbGRzLCAnZWxlY3RyaWNGaWVsZEdyaWRaZXJvJywge1xyXG4gICAgZGVmYXVsdDogQkxBQ0ssXHJcbiAgICBwcm9qZWN0b3I6IFdISVRFXHJcbiAgfSApLFxyXG4gIGVsZWN0cmljUG90ZW50aWFsR3JpZFNhdHVyYXRpb25Qb3NpdGl2ZVByb3BlcnR5OiBuZXcgUHJvZmlsZUNvbG9yUHJvcGVydHkoIGNoYXJnZXNBbmRGaWVsZHMsICdlbGVjdHJpY1BvdGVudGlhbEdyaWRTYXR1cmF0aW9uUG9zaXRpdmUnLCB7XHJcbiAgICBkZWZhdWx0OiBuZXcgQ29sb3IoIDIxMCwgMCwgMCApLFxyXG4gICAgcHJvamVjdG9yOiBuZXcgQ29sb3IoIDIxMCwgMCwgMCApXHJcbiAgfSApLFxyXG4gIGVsZWN0cmljUG90ZW50aWFsR3JpZFplcm9Qcm9wZXJ0eTogbmV3IFByb2ZpbGVDb2xvclByb3BlcnR5KCBjaGFyZ2VzQW5kRmllbGRzLCAnZWxlY3RyaWNQb3RlbnRpYWxHcmlkWmVybycsIHtcclxuICAgIGRlZmF1bHQ6IEJMQUNLLFxyXG4gICAgcHJvamVjdG9yOiBXSElURVxyXG4gIH0gKSxcclxuICBlbGVjdHJpY1BvdGVudGlhbEdyaWRTYXR1cmF0aW9uTmVnYXRpdmVQcm9wZXJ0eTogbmV3IFByb2ZpbGVDb2xvclByb3BlcnR5KCBjaGFyZ2VzQW5kRmllbGRzLCAnZWxlY3RyaWNQb3RlbnRpYWxHcmlkU2F0dXJhdGlvbk5lZ2F0aXZlJywge1xyXG4gICAgZGVmYXVsdDogQkxVRSxcclxuICAgIHByb2plY3RvcjogQkxVRVxyXG4gIH0gKVxyXG59O1xyXG5cclxuY2hhcmdlc0FuZEZpZWxkcy5yZWdpc3RlciggJ0NoYXJnZXNBbmRGaWVsZHNDb2xvcnMnLCBDaGFyZ2VzQW5kRmllbGRzQ29sb3JzICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaGFyZ2VzQW5kRmllbGRzQ29sb3JzOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsS0FBSyxFQUFFQyxvQkFBb0IsUUFBUSxnQ0FBZ0M7QUFDNUUsT0FBT0MsZ0JBQWdCLE1BQU0sd0JBQXdCOztBQUVyRDtBQUNBLE1BQU1DLEtBQUssR0FBRyxJQUFJSCxLQUFLLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFFLENBQUM7QUFDbEMsTUFBTUksS0FBSyxHQUFHLElBQUlKLEtBQUssQ0FBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUksQ0FBQztBQUN4QyxNQUFNSyxHQUFHLEdBQUcsSUFBSUwsS0FBSyxDQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBRSxDQUFDO0FBQ2xDLE1BQU1NLElBQUksR0FBRyxJQUFJTixLQUFLLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFJLENBQUM7QUFFbkMsTUFBTU8sc0JBQXNCLEdBQUc7RUFDN0JDLGtCQUFrQixFQUFFLElBQUlQLG9CQUFvQixDQUFFQyxnQkFBZ0IsRUFBRSxZQUFZLEVBQUU7SUFDNUVPLE9BQU8sRUFBRU4sS0FBSztJQUNkTyxTQUFTLEVBQUVOO0VBQ2IsQ0FBRSxD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