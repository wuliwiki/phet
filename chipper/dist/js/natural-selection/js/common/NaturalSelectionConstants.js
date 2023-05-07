// Copyright 2019-2022, University of Colorado Boulder

/**
 * NaturalSelectionConstants defines constants used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Range from '../../../dot/js/Range.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import ButtonNode from '../../../sun/js/buttons/ButtonNode.js';
import naturalSelection from '../naturalSelection.js';
import NaturalSelectionColors from './NaturalSelectionColors.js';
import NaturalSelectionUtils from './NaturalSelectionUtils.js';

// constants
const CORNER_RADIUS = 5;
const ARROW_BUTTON_OPTIONS = {
  baseColor: NaturalSelectionColors.ARROW_BUTTONS,
  stroke: 'black',
  buttonAppearanceStrategy: ButtonNode.FlatAppearanceStrategy,
  cornerRadius: 2,
  lineWidth: 0.5,
  arrowWidth: 8,
  // width of base
  arrowHeight: 10,
  // from tip to base
  xMargin: 6,
  yMargin: 4,
  touchAreaXDilation: 10,
  touchAreaYDilation: 6,
  mouseAreaXDilation: 5,
  mouseAreaYDilation: 3
};
const CHECKBOX_OPTIONS = {
  spacing: 4,
  boxWidth: 16
};
const DIALOG_OPTIONS = {
  closeButtonTouchAreaXDilation: 20,
  closeButtonTouchAreaYDilation: 20,
  closeButtonMouseAreaXDilation: 10,
  closeButtonMouseAreaYDilation: 10
};
const PANEL_OPTIONS = {
  align: 'left',
  cornerRadius: CORNER_RADIUS,
  xMargin: 15,
  yMargin: 10,
  fill: NaturalSelectionColors.PANEL_FILL,
  stroke: NaturalSelectionColors.PANEL_STROKE
};
const VBOX_OPTIONS = {
  spacing: 11,
  align: 'left'
};
const NaturalSelectionConstants = {
  // Model ===========================================================================================================

  // Generation Clock
  // clock slice for wolves, as a percentage range [0,1]. This correspond to 2:00-6:00 on the clock.
  CLOCK_WOLVES_RANGE: new Range(2 / 12, 6 / 12),
  // clock slice for food, as a percentage range [0,1]. This correspond to 6:00-10:00 on the clock.
  CLOCK_FOOD_RANGE: new Range(6 / 12, 10 / 12),
  // Shrubs
  // Seeds for random number generator used to position shrubs. These specific seeds were chosen because they
  // produce a desirable layout. See https://github.com/phetsims/natural-selection/issues/176
  INTRO_SHRUBS_SEED: 0.5286575215756223,
  LAB_SHRUBS_SEED: 0.9578375636205664,
  // View ============================================================================================================N

  // ScreenView
  SCREEN_VIEW_X_MARGIN: 15,
  // margins at left and right edges of the ScreenView
  SCREEN_VIEW_Y_MARGIN: 15,
  // margins at top and bottom edges of the ScreenView
  SCREEN_VIEW_X_SPACING: 10,
  // horizontal spacing between UI components in the ScreenView
  SCREEN_VIEW_Y_SPACING: 10,
  // vertical spacing between UI components in the ScreenView

  // EnvironmentNode
  ENVIRONMENT_DISPLAY_X_MARGIN: 15,
  // margins at left and right edges of the viewport
  ENVIRONMENT_DISPLAY_Y_MARGIN: 15,
  // margins at top and bottom edges of the viewport

  CORNER_RADIUS: CORNER_RADIUS,
  // ArrowButton
  ARROW_BUTTON_OPTIONS: ARROW_BUTTON_OPTIONS,
  // Checkbox
  CHECKBOX_OPTIONS: CHECKBOX_OPTIONS,
  CHECKBOX_X_SPACING: 6,
  // Panel
  PANEL_OPTIONS: PANEL_OPTIONS,
  // VBox
  VBOX_OPTIONS: VBOX_OPTIONS,
  // Dialog
  DIALOG_OPTIONS: DIALOG_OPTIONS,
  // Fonts
  CHECKBOX_FONT: new PhetFont(16),
  PUSH_BUTTON_FONT: new PhetFont(16),
  RADIO_BUTTON_FONT: new PhetFont(16),
  INSTRUCTIONS_FONT: new PhetFont(16),
  TITLE_FONT: new PhetFont({
    size: 16,
    weight: 'bold'
  }),
  ADD_MUTATION_GENE_FONT: new PhetFont(16),
  ADD_MUTATION_COLUMN_HEADING_FONT: new PhetFont(14),
  MUTATION_COMING_FONT: new PhetFont(16),
  POPULATION_AXIS_FONT: new PhetFont(14),
  PROPORTIONS_GENERATION_CONTROL_FONT: new PhetFont(16),
  PROPORTIONS_LEGEND_FONT: new PhetFont(16),
  DIALOG_FONT: new PhetFont(16),
  // Scale factors for images, determined empirically and dependent on image-file sizes
  BUNNY_IMAGE_SCALE: 0.4,
  WOLF_IMAGE_SCALE: 0.5,
  SHRUB_IMAGE_SCALE: 0.5,
  // Population graph
  POPULATION_POINT_RADIUS: 2.4,
  // point radius, in view coordinates
  POPULATION_LINE_WIDTH: 2,
  // line segment width, in view coordinates
  POPULATION_MUTANT_LINE_DASH: [3, 2],
  // Pedigree graph
  PEDIGREE_TREE_DEPTH: 4
};
assert && assert(NaturalSelectionUtils.isPercentRange(NaturalSelectionConstants.CLOCK_FOOD_RANGE));
assert && assert(NaturalSelectionUtils.isPercentRange(NaturalSelectionConstants.CLOCK_WOLVES_RANGE));
naturalSelection.register('NaturalSelectionConstants', NaturalSelectionConstants);
export default NaturalSelectionConstants;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSYW5nZSIsIlBoZXRGb250IiwiQnV0dG9uTm9kZSIsIm5hdHVyYWxTZWxlY3Rpb24iLCJOYXR1cmFsU2VsZWN0aW9uQ29sb3JzIiwiTmF0dXJhbFNlbGVjdGlvblV0aWxzIiwiQ09STkVSX1JBRElVUyIsIkFSUk9XX0JVVFRPTl9PUFRJT05TIiwiYmFzZUNvbG9yIiwiQVJST1dfQlVUVE9OUyIsInN0cm9rZSIsImJ1dHRvbkFwcGVhcmFuY2VTdHJhdGVneSIsIkZsYXRBcHBlYXJhbmNlU3RyYXRlZ3kiLCJjb3JuZXJSYWRpdXMiLCJsaW5lV2lkdGgiLCJhcnJvd1dpZHRoIiwiYXJyb3dIZWlnaHQiLCJ4TWFyZ2luIiwieU1hcmdpbiIsInRvdWNoQXJlYVhEaWxhdGlvbiIsInRvdWNoQXJlYVlEaWxhdGlvbiIsIm1vdXNlQXJlYVhEaWxhdGlvbiIsIm1vdXNlQXJlYVlEaWxhdGlvbiIsIkNIRUNLQk9YX09QVElPTlMiLCJzcGFjaW5nIiwiYm94V2lkdGgiLCJESUFMT0dfT1BUSU9OUyIsImNsb3NlQnV0dG9uVG91Y2hBcmVhWERpbGF0aW9uIiwiY2xvc2VCdXR0b25Ub3VjaEFyZWFZRGlsYXRpb24iLCJjbG9zZUJ1dHRvbk1vdXNlQXJlYVhEaWxhdGlvbiIsImNsb3NlQnV0dG9uTW91c2VBcmVhWURpbGF0aW9uIiwiUEFORUxfT1BUSU9OUyIsImFsaWduIiwiZmlsbCIsIlBBTkVMX0ZJTEwiLCJQQU5FTF9TVFJPS0UiLCJWQk9YX09QVElPTlMiLCJOYXR1cmFsU2VsZWN0aW9uQ29uc3RhbnRzIiwiQ0xPQ0tfV09MVkVTX1JBTkdFIiwiQ0xPQ0tfRk9PRF9SQU5HRSIsIklOVFJPX1NIUlVCU19TRUVEIiwiTEFCX1NIUlVCU19TRUVEIiwiU0NSRUVOX1ZJRVdfWF9NQVJHSU4iLCJTQ1JFRU5fVklFV19ZX01BUkdJTiIsIlNDUkVFTl9WSUVXX1hfU1BBQ0lORyIsIlNDUkVFTl9WSUVXX1lfU1BBQ0lORyIsIkVOVklST05NRU5UX0RJU1BMQVlfWF9NQVJHSU4iLCJFTlZJUk9OTUVOVF9ESVNQTEFZX1lfTUFSR0lOIiwiQ0hFQ0tCT1hfWF9TUEFDSU5HIiwiQ0hFQ0tCT1hfRk9OVCIsIlBVU0hfQlVUVE9OX0ZPTlQiLCJSQURJT19CVVRUT05fRk9OVCIsIklOU1RSVUNUSU9OU19GT05UIiwiVElUTEVfRk9OVCIsInNpemUiLCJ3ZWlnaHQiLCJBRERfTVVUQVRJT05fR0VORV9GT05UIiwiQUREX01VVEFUSU9OX0NPTFVNTl9IRUFESU5HX0ZPTlQiLCJNVVRBVElPTl9DT01JTkdfRk9OVCIsIlBPUFVMQVRJT05fQVhJU19GT05UIiwiUFJPUE9SVElPTlNfR0VORVJBVElPTl9DT05UUk9MX0ZPTlQiLCJQUk9QT1JUSU9OU19MRUdFTkRfRk9OVCIsIkRJQUxPR19GT05UIiwiQlVOTllfSU1BR0VfU0NBTEUiLCJXT0xGX0lNQUdFX1NDQUxFIiwiU0hSVUJfSU1BR0VfU0NBTEUiLCJQT1BVTEFUSU9OX1BPSU5UX1JBRElVUyIsIlBPUFVMQVRJT05fTElORV9XSURUSCIsIlBPUFVMQVRJT05fTVVUQU5UX0xJTkVfREFTSCIsIlBFRElHUkVFX1RSRUVfREVQVEgiLCJhc3NlcnQiLCJpc1BlcmNlbnRSYW5nZSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiTmF0dXJhbFNlbGVjdGlvbkNvbnN0YW50cy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBOYXR1cmFsU2VsZWN0aW9uQ29uc3RhbnRzIGRlZmluZXMgY29uc3RhbnRzIHVzZWQgdGhyb3VnaG91dCB0aGlzIHNpbXVsYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgQ2hyaXMgTWFsbGV5IChQaXhlbFpvb20sIEluYy4pXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJhbmdlIGZyb20gJy4uLy4uLy4uL2RvdC9qcy9SYW5nZS5qcyc7XHJcbmltcG9ydCBQaGV0Rm9udCBmcm9tICcuLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMvUGhldEZvbnQuanMnO1xyXG5pbXBvcnQgeyBWQm94T3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCB7IEFycm93QnV0dG9uT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL3N1bi9qcy9idXR0b25zL0Fycm93QnV0dG9uLmpzJztcclxuaW1wb3J0IEJ1dHRvbk5vZGUgZnJvbSAnLi4vLi4vLi4vc3VuL2pzL2J1dHRvbnMvQnV0dG9uTm9kZS5qcyc7XHJcbmltcG9ydCB7IENoZWNrYm94T3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL3N1bi9qcy9DaGVja2JveC5qcyc7XHJcbmltcG9ydCB7IERpYWxvZ09wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9zdW4vanMvRGlhbG9nLmpzJztcclxuaW1wb3J0IHsgUGFuZWxPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vc3VuL2pzL1BhbmVsLmpzJztcclxuaW1wb3J0IG5hdHVyYWxTZWxlY3Rpb24gZnJvbSAnLi4vbmF0dXJhbFNlbGVjdGlvbi5qcyc7XHJcbmltcG9ydCBOYXR1cmFsU2VsZWN0aW9uQ29sb3JzIGZyb20gJy4vTmF0dXJhbFNlbGVjdGlvbkNvbG9ycy5qcyc7XHJcbmltcG9ydCBOYXR1cmFsU2VsZWN0aW9uVXRpbHMgZnJvbSAnLi9OYXR1cmFsU2VsZWN0aW9uVXRpbHMuanMnO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IENPUk5FUl9SQURJVVMgPSA1O1xyXG5cclxuY29uc3QgQVJST1dfQlVUVE9OX09QVElPTlM6IEFycm93QnV0dG9uT3B0aW9ucyA9IHtcclxuICBiYXNlQ29sb3I6IE5hdHVyYWxTZWxlY3Rpb25Db2xvcnMuQVJST1dfQlVUVE9OUyxcclxuICBzdHJva2U6ICdibGFjaycsXHJcbiAgYnV0dG9uQXBwZWFyYW5jZVN0cmF0ZWd5OiBCdXR0b25Ob2RlLkZsYXRBcHBlYXJhbmNlU3RyYXRlZ3ksXHJcbiAgY29ybmVyUmFkaXVzOiAyLFxyXG4gIGxpbmVXaWR0aDogMC41LFxyXG4gIGFycm93V2lkdGg6IDgsIC8vIHdpZHRoIG9mIGJhc2VcclxuICBhcnJvd0hlaWdodDogMTAsIC8vIGZyb20gdGlwIHRvIGJhc2VcclxuICB4TWFyZ2luOiA2LFxyXG4gIHlNYXJnaW46IDQsXHJcbiAgdG91Y2hBcmVhWERpbGF0aW9uOiAxMCxcclxuICB0b3VjaEFyZWFZRGlsYXRpb246IDYsXHJcbiAgbW91c2VBcmVhWERpbGF0aW9uOiA1LFxyXG4gIG1vdXNlQXJlYVlEaWxhdGlvbjogM1xyXG59O1xyXG5cclxuY29uc3QgQ0hFQ0tCT1hfT1BUSU9OUzogQ2hlY2tib3hPcHRpb25zID0ge1xyXG4gIHNwYWNpbmc6IDQsXHJcbiAgYm94V2lkdGg6IDE2XHJcbn07XHJcblxyXG5jb25zdCBESUFMT0dfT1BUSU9OUzogRGlhbG9nT3B0aW9ucyA9IHtcclxuICBjbG9zZUJ1dHRvblRvdWNoQXJlYVhEaWxhdGlvbjogMjAsXHJcbiAgY2xvc2VCdXR0b25Ub3VjaEFyZWFZRGlsYXRpb246IDIwLFxyXG4gIGNsb3NlQnV0dG9uTW91c2VBcmVhWERpbGF0aW9uOiAxMCxcclxuICBjbG9zZUJ1dHRvbk1vdXNlQXJlYVlEaWxhdGlvbjogMTBcclxufTtcclxuXHJcbmNvbnN0IFBBTkVMX09QVElPTlM6IFBhbmVsT3B0aW9ucyA9IHtcclxuICBhbGlnbjogJ2xlZnQnLFxyXG4gIGNvcm5lclJhZGl1czogQ09STkVSX1JBRElVUyxcclxuICB4TWFyZ2luOiAxNSxcclxuICB5TWFyZ2luOiAxMCxcclxuICBmaWxsOiBOYXR1cmFsU2VsZWN0aW9uQ29sb3JzLlBBTkVMX0ZJTEwsXHJcbiAgc3Ryb2tlOiBOYXR1cmFsU2VsZWN0aW9uQ29sb3JzLlBBTkVMX1NUUk9LRVxyXG59O1xyXG5cclxuY29uc3QgVkJPWF9PUFRJT05TOiBWQm94T3B0aW9ucyA9IHtcclxuICBzcGFjaW5nOiAxMSxcclxuICBhbGlnbjogJ2xlZnQnXHJcbn07XHJcblxyXG5jb25zdCBOYXR1cmFsU2VsZWN0aW9uQ29uc3RhbnRzID0ge1xyXG5cclxuICAvLyBNb2RlbCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAvLyBHZW5lcmF0aW9uIENsb2NrXHJcbiAgLy8gY2xvY2sgc2xpY2UgZm9yIHdvbHZlcywgYXMgYSBwZXJjZW50YWdlIHJhbmdlIFswLDFdLiBUaGlzIGNvcnJlc3BvbmQgdG8gMjowMC02OjAwIG9uIHRoZSBjbG9jay5cclxuICBDTE9DS19XT0xWRVNfUkFOR0U6IG5ldyBSYW5nZSggMiAvIDEyLCA2IC8gMTIgKSxcclxuICAvLyBjbG9jayBzbGljZSBmb3IgZm9vZCwgYXMgYSBwZXJjZW50YWdlIHJhbmdlIFswLDFdLiBUaGlzIGNvcnJlc3BvbmQgdG8gNjowMC0xMDowMCBvbiB0aGUgY2xvY2suXHJcbiAgQ0xPQ0tfRk9PRF9SQU5HRTogbmV3IFJhbmdlKCA2IC8gMTIsIDEwIC8gMTIgKSxcclxuXHJcbiAgLy8gU2hydWJzXHJcbiAgLy8gU2VlZHMgZm9yIHJhbmRvbSBudW1iZXIgZ2VuZXJhdG9yIHVzZWQgdG8gcG9zaXRpb24gc2hydWJzLiBUaGVzZSBzcGVjaWZpYyBzZWVkcyB3ZXJlIGNob3NlbiBiZWNhdXNlIHRoZXlcclxuICAvLyBwcm9kdWNlIGEgZGVzaXJhYmxlIGxheW91dC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9uYXR1cmFsLXNlbGVjdGlvbi9pc3N1ZXMvMTc2XHJcbiAgSU5UUk9fU0hSVUJTX1NFRUQ6IDAuNTI4NjU3NTIxNTc1NjIyMyxcclxuICBMQUJfU0hSVUJTX1NFRUQ6IDAuOTU3ODM3NTYzNjIwNTY2NCxcclxuXHJcbiAgLy8gVmlldyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1OXHJcblxyXG4gIC8vIFNjcmVlblZpZXdcclxuICBTQ1JFRU5fVklFV19YX01BUkdJTjogMTUsIC8vIG1hcmdpbnMgYXQgbGVmdCBhbmQgcmlnaHQgZWRnZXMgb2YgdGhlIFNjcmVlblZpZXdcclxuICBTQ1JFRU5fVklFV19ZX01BUkdJTjogMTUsIC8vIG1hcmdpbnMgYXQgdG9wIGFuZCBib3R0b20gZWRnZXMgb2YgdGhlIFNjcmVlblZpZXdcclxuICBTQ1JFRU5fVklFV19YX1NQQUNJTkc6IDEwLCAvLyBob3Jpem9udGFsIHNwYWNpbmcgYmV0d2VlbiBVSSBjb21wb25lbnRzIGluIHRoZSBTY3JlZW5WaWV3XHJcbiAgU0NSRUVOX1ZJRVdfWV9TUEFDSU5HOiAxMCwgLy8gdmVydGljYWwgc3BhY2luZyBiZXR3ZWVuIFVJIGNvbXBvbmVudHMgaW4gdGhlIFNjcmVlblZpZXdcclxuXHJcbiAgLy8gRW52aXJvbm1lbnROb2RlXHJcbiAgRU5WSVJPTk1FTlRfRElTUExBWV9YX01BUkdJTjogMTUsIC8vIG1hcmdpbnMgYXQgbGVmdCBhbmQgcmlnaHQgZWRnZXMgb2YgdGhlIHZpZXdwb3J0XHJcbiAgRU5WSVJPTk1FTlRfRElTUExBWV9ZX01BUkdJTjogMTUsIC8vIG1hcmdpbnMgYXQgdG9wIGFuZCBib3R0b20gZWRnZXMgb2YgdGhlIHZpZXdwb3J0XHJcblxyXG4gIENPUk5FUl9SQURJVVM6IENPUk5FUl9SQURJVVMsXHJcblxyXG4gIC8vIEFycm93QnV0dG9uXHJcbiAgQVJST1dfQlVUVE9OX09QVElPTlM6IEFSUk9XX0JVVFRPTl9PUFRJT05TLFxyXG5cclxuICAvLyBDaGVja2JveFxyXG4gIENIRUNLQk9YX09QVElPTlM6IENIRUNLQk9YX09QVElPTlMsXHJcbiAgQ0hFQ0tCT1hfWF9TUEFDSU5HOiA2LFxyXG5cclxuICAvLyBQYW5lbFxyXG4gIFBBTkVMX09QVElPTlM6IFBBTkVMX09QVElPTlMsXHJcblxyXG4gIC8vIFZCb3hcclxuICBWQk9YX09QVElPTlM6IFZCT1hfT1BUSU9OUyxcclxuXHJcbiAgLy8gRGlhbG9nXHJcbiAgRElBTE9HX09QVElPTlM6IERJQUxPR19PUFRJT05TLFxyXG5cclxuICAvLyBGb250c1xyXG4gIENIRUNLQk9YX0ZPTlQ6IG5ldyBQaGV0Rm9udCggMTYgKSxcclxuICBQVVNIX0JVVFRPTl9GT05UOiBuZXcgUGhldEZvbnQoIDE2ICksXHJcbiAgUkFESU9fQlVUVE9OX0ZPTlQ6IG5ldyBQaGV0Rm9udCggMTYgKSxcclxuICBJTlNUUlVDVElPTlNfRk9OVDogbmV3IFBoZXRGb250KCAxNiApLFxyXG4gIFRJVExFX0ZPTlQ6IG5ldyBQaGV0Rm9udCggeyBzaXplOiAxNiwgd2VpZ2h0OiAnYm9sZCcgfSApLFxyXG4gIEFERF9NVVRBVElPTl9HRU5FX0ZPTlQ6IG5ldyBQaGV0Rm9udCggMTYgKSxcclxuICBBRERfTVVUQVRJT05fQ09MVU1OX0hFQURJTkdfRk9OVDogbmV3IFBoZXRGb250KCAxNCApLFxyXG4gIE1VVEFUSU9OX0NPTUlOR19GT05UOiBuZXcgUGhldEZvbnQoIDE2ICksXHJcbiAgUE9QVUxBVElPTl9BWElTX0ZPTlQ6IG5ldyBQaGV0Rm9udCggMTQgKSxcclxuICBQUk9QT1JUSU9OU19HRU5FUkFUSU9OX0NPTlRST0xfRk9OVDogbmV3IFBoZXRGb250KCAxNiApLFxyXG4gIFBST1BPUlRJT05TX0xFR0VORF9GT05UOiBuZXcgUGhldEZvbnQoIDE2ICksXHJcbiAgRElBTE9HX0ZPTlQ6IG5ldyBQaGV0Rm9udCggMTYgKSxcclxuXHJcbiAgLy8gU2NhbGUgZmFjdG9ycyBmb3IgaW1hZ2VzLCBkZXRlcm1pbmVkIGVtcGlyaWNhbGx5IGFuZCBkZXBlbmRlbnQgb24gaW1hZ2UtZmlsZSBzaXplc1xyXG4gIEJVTk5ZX0lNQUdFX1NDQUxFOiAwLjQsXHJcbiAgV09MRl9JTUFHRV9TQ0FMRTogMC41LFxyXG4gIFNIUlVCX0lNQUdFX1NDQUxFOiAwLjUsXHJcblxyXG4gIC8vIFBvcHVsYXRpb24gZ3JhcGhcclxuICBQT1BVTEFUSU9OX1BPSU5UX1JBRElVUzogMi40LCAvLyBwb2ludCByYWRpdXMsIGluIHZpZXcgY29vcmRpbmF0ZXNcclxuICBQT1BVTEFUSU9OX0xJTkVfV0lEVEg6IDIsICAvLyBsaW5lIHNlZ21lbnQgd2lkdGgsIGluIHZpZXcgY29vcmRpbmF0ZXNcclxuICBQT1BVTEFUSU9OX01VVEFOVF9MSU5FX0RBU0g6IFsgMywgMiBdLFxyXG5cclxuICAvLyBQZWRpZ3JlZSBncmFwaFxyXG4gIFBFRElHUkVFX1RSRUVfREVQVEg6IDRcclxufTtcclxuXHJcbmFzc2VydCAmJiBhc3NlcnQoIE5hdHVyYWxTZWxlY3Rpb25VdGlscy5pc1BlcmNlbnRSYW5nZSggTmF0dXJhbFNlbGVjdGlvbkNvbnN0YW50cy5DTE9DS19GT09EX1JBTkdFICkgKTtcclxuYXNzZXJ0ICYmIGFzc2VydCggTmF0dXJhbFNlbGVjdGlvblV0aWxzLmlzUGVyY2VudFJhbmdlKCBOYXR1cmFsU2VsZWN0aW9uQ29uc3RhbnRzLkNMT0NLX1dPTFZFU19SQU5HRSApICk7XHJcblxyXG5uYXR1cmFsU2VsZWN0aW9uLnJlZ2lzdGVyKCAnTmF0dXJhbFNlbGVjdGlvbkNvbnN0YW50cycsIE5hdHVyYWxTZWxlY3Rpb25Db25zdGFudHMgKTtcclxuZXhwb3J0IGRlZmF1bHQgTmF0dXJhbFNlbGVjdGlvbkNvbnN0YW50czsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBSyxNQUFNLDBCQUEwQjtBQUM1QyxPQUFPQyxRQUFRLE1BQU0sc0NBQXNDO0FBRzNELE9BQU9DLFVBQVUsTUFBTSx1Q0FBdUM7QUFJOUQsT0FBT0MsZ0JBQWdCLE1BQU0sd0JBQXdCO0FBQ3JELE9BQU9DLHNCQUFzQixNQUFNLDZCQUE2QjtBQUNoRSxPQUFPQyxxQkFBcUIsTUFBTSw0QkFBNEI7O0FBRTlEO0FBQ0EsTUFBTUMsYUFBYSxHQUFHLENBQUM7QUFFdkIsTUFBTUMsb0JBQXdDLEdBQUc7RUFDL0NDLFNBQVMsRUFBRUosc0JBQXNCLENBQUNL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