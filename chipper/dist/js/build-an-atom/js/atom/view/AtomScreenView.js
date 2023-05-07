// Copyright 2013-2022, University of Colorado Boulder

/**
 * Main view for the first screen of the Build an Atom simulation.
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import { HBox, Text } from '../../../../scenery/js/imports.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAScreenView from '../../common/view/BAAScreenView.js';
import ChargeMeter from '../../common/view/ChargeMeter.js';
import ChargeComparisonDisplay from './ChargeComparisonDisplay.js';
import MassNumberDisplay from './MassNumberDisplay.js';
const massNumberString = BuildAnAtomStrings.massNumber;
const netChargeString = BuildAnAtomStrings.netCharge;

// constants
const INTER_BOX_SPACING = 7;
const ACCORDION_BOX_BUTTON_DILATION = 12;
class AtomScreenView extends BAAScreenView {
  /**
   * @param {BuildAnAtomModel} model Build an Atom model object.
   * @param {Tandem} tandem
   */
  constructor(model, tandem) {
    super(model, tandem);

    // @private - properties that are passed to the accordion boxes that control their expansion state
    this.netChargeAccordionBoxExpandedProperty = new BooleanProperty(false, {
      tandem: tandem.createTandem('netChargeAccordionBoxExpandedProperty')
    });
    this.massNumberAccordionBoxExpandedProperty = new BooleanProperty(false, {
      tandem: tandem.createTandem('massNumberAccordionBoxExpandedProperty')
    });

    // options that are common to all of the accordion boxes in this view
    const commonAccordionBoxOptions = {
      cornerRadius: 3,
      fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      contentAlign: 'left',
      titleAlignX: 'left',
      buttonAlign: 'right',
      minWidth: this.periodicTableAccordionBox.width,
      expandCollapseButtonOptions: {
        touchAreaXDilation: ACCORDION_BOX_BUTTON_DILATION,
        touchAreaYDilation: ACCORDION_BOX_BUTTON_DILATION
      }
    };

    // Add the charge meter and charge comparison display inside of an accordion box.
    const netChargeAccordionBoxContents = new HBox({
      children: [new ChargeMeter(model.particleAtom, tandem.createTandem('chargeMeter')), new ChargeComparisonDisplay(model.particleAtom, tandem.createTandem('chargeComparisonDisplay'), {
        pickable: false
      })],
      spacing: 5,
      scale: 0.85,
      // empirically determined to keep the box height reasonable
      pickable: false,
      tandem: tandem.createTandem('netChargeAccordionBoxContents'),
      // pdom
      tagName: 'h6',
      innerContent: 'Net Charge Content' // TODO: export to a11y strings file
    });

    const netChargeAccordionBox = new AccordionBox(netChargeAccordionBoxContents, merge({}, {
      titleNode: new Text(netChargeString, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
        tandem: tandem.createTandem('netChargeAccordionBoxTitleText')
      }),
      expandedProperty: this.netChargeAccordionBoxExpandedProperty,
      // phet-io
      tandem: tandem.createTandem('netChargeAccordionBox'),
      // pdom
      labelContent: netChargeString
    }, commonAccordionBoxOptions));
    this.controlPanelLayer.addChild(netChargeAccordionBox);

    // Add the mass indicator inside of an accordion box.
    const massNumberDisplay = new MassNumberDisplay(model.particleAtom, tandem.createTandem('massNumberDisplay'), {
      pickable: false,
      scale: 0.85,
      // empirically determined to make the control panels all fit on the screen

      // pdom
      tagName: 'h6',
      innerContent: 'Mass Number Content' // TODO: export to a11y strings file
    });

    const massNumberAccordionBox = new AccordionBox(massNumberDisplay, merge({}, {
      titleNode: new Text(massNumberString, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
        tandem: tandem.createTandem('massNumberAccordionBoxTitleText')
      }),
      expandedProperty: this.massNumberAccordionBoxExpandedProperty,
      // phet-io
      tandem: tandem.createTandem('massNumberAccordionBox'),
      // pdom
      labelContent: massNumberString
    }, commonAccordionBoxOptions));
    this.controlPanelLayer.addChild(massNumberAccordionBox);

    // Do the layout.
    netChargeAccordionBox.right = this.periodicTableAccordionBox.right;
    netChargeAccordionBox.top = this.periodicTableAccordionBox.bottom + INTER_BOX_SPACING;
    massNumberAccordionBox.right = this.periodicTableAccordionBox.right;
    massNumberAccordionBox.top = netChargeAccordionBox.top + netChargeAccordionBox.height + INTER_BOX_SPACING;

    // pdom - set navigation order for the Atom screen view
    this.pdomPlayAreaNode.pdomOrder = [this.periodicTableAccordionBox, netChargeAccordionBox, massNumberAccordionBox];
  }

  /**
   * @public
   */
  reset() {
    super.reset();
    this.netChargeAccordionBoxExpandedProperty.reset();
    this.massNumberAccordionBoxExpandedProperty.reset();
  }
}
buildAnAtom.register('AtomScreenView', AtomScreenView);
export default AtomScreenView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCb29sZWFuUHJvcGVydHkiLCJtZXJnZSIsIkhCb3giLCJUZXh0IiwiU2hyZWRDb25zdGFudHMiLCJBY2NvcmRpb25Cb3giLCJidWlsZEFuQXRvbSIsIkJ1aWxkQW5BdG9tU3RyaW5ncyIsIkJBQVNjcmVlblZpZXciLCJDaGFyZ2VNZXRlciIsIkNoYXJnZUNvbXBhcmlzb25EaXNwbGF5IiwiTWFzc051bWJlckRpc3BsYXkiLCJtYXNzTnVtYmVyU3RyaW5nIiwibWFzc051bWJlciIsIm5ldENoYXJnZVN0cmluZyIsIm5ldENoYXJnZSIsIklOVEVSX0JPWF9TUEFDSU5HIiwiQUNDT1JESU9OX0JPWF9CVVRUT05fRElMQVRJT04iLCJBdG9tU2NyZWVuVmlldyIsImNvbnN0cnVjdG9yIiwibW9kZWwiLCJ0YW5kZW0iLCJuZXRDaGFyZ2VBY2NvcmRpb25Cb3hFeHBhbmRlZFByb3BlcnR5IiwiY3JlYXRlVGFuZGVtIiwibWFzc051bWJlckFjY29yZGlvbkJveEV4cGFuZGVkUHJvcGVydHkiLCJjb21tb25BY2NvcmRpb25Cb3hPcHRpb25zIiwiY29ybmVyUmFkaXVzIiwiZmlsbCIsIkRJU1BMQVlfUEFORUxfQkFDS0dST1VORF9DT0xPUiIsImNvbnRlbnRBbGlnbiIsInRpdGxlQWxpZ25YIiwiYnV0dG9uQWxpZ24iLCJtaW5XaWR0aCIsInBlcmlvZGljVGFibGVBY2NvcmRpb25Cb3giLCJ3aWR0aCIsImV4cGFuZENvbGxhcHNlQnV0dG9uT3B0aW9ucyIsInRvdWNoQXJlYVhEaWxhdGlvbiIsInRvdWNoQXJlYVlEaWxhdGlvbiIsIm5ldENoYXJnZUFjY29yZGlvbkJveENvbnRlbnRzIiwiY2hpbGRyZW4iLCJwYXJ0aWNsZUF0b20iLCJwaWNrYWJsZSIsInNwYWNpbmciLCJzY2FsZSIsInRhZ05hbWUiLCJpbm5lckNvbnRlbnQiLCJuZXRDaGFyZ2VBY2NvcmRpb25Cb3giLCJ0aXRsZU5vZGUiLCJmb250IiwiQUNDT1JESU9OX0JPWF9USVRMRV9GT05UIiwibWF4V2lkdGgiLCJBQ0NPUkRJT05fQk9YX1RJVExFX01BWF9XSURUSCIsImV4cGFuZGVkUHJvcGVydHkiLCJsYWJlbENvbnRlbnQiLCJjb250cm9sUGFuZWxMYXllciIsImFkZENoaWxkIiwibWFzc051bWJlckRpc3BsYXkiLCJtYXNzTnVtYmVyQWNjb3JkaW9uQm94IiwicmlnaHQiLCJ0b3AiLCJib3R0b20iLCJoZWlnaHQiLCJwZG9tUGxheUFyZWFOb2RlIiwicGRvbU9yZGVyIiwicmVzZXQiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkF0b21TY3JlZW5WaWV3LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDEzLTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIE1haW4gdmlldyBmb3IgdGhlIGZpcnN0IHNjcmVlbiBvZiB0aGUgQnVpbGQgYW4gQXRvbSBzaW11bGF0aW9uLlxyXG4gKi9cclxuXHJcbmltcG9ydCBCb29sZWFuUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9Cb29sZWFuUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgbWVyZ2UgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL21lcmdlLmpzJztcclxuaW1wb3J0IHsgSEJveCwgVGV4dCB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBTaHJlZENvbnN0YW50cyBmcm9tICcuLi8uLi8uLi8uLi9zaHJlZC9qcy9TaHJlZENvbnN0YW50cy5qcyc7XHJcbmltcG9ydCBBY2NvcmRpb25Cb3ggZnJvbSAnLi4vLi4vLi4vLi4vc3VuL2pzL0FjY29yZGlvbkJveC5qcyc7XHJcbmltcG9ydCBidWlsZEFuQXRvbSBmcm9tICcuLi8uLi9idWlsZEFuQXRvbS5qcyc7XHJcbmltcG9ydCBCdWlsZEFuQXRvbVN0cmluZ3MgZnJvbSAnLi4vLi4vQnVpbGRBbkF0b21TdHJpbmdzLmpzJztcclxuaW1wb3J0IEJBQVNjcmVlblZpZXcgZnJvbSAnLi4vLi4vY29tbW9uL3ZpZXcvQkFBU2NyZWVuVmlldy5qcyc7XHJcbmltcG9ydCBDaGFyZ2VNZXRlciBmcm9tICcuLi8uLi9jb21tb24vdmlldy9DaGFyZ2VNZXRlci5qcyc7XHJcbmltcG9ydCBDaGFyZ2VDb21wYXJpc29uRGlzcGxheSBmcm9tICcuL0NoYXJnZUNvbXBhcmlzb25EaXNwbGF5LmpzJztcclxuaW1wb3J0IE1hc3NOdW1iZXJEaXNwbGF5IGZyb20gJy4vTWFzc051bWJlckRpc3BsYXkuanMnO1xyXG5cclxuY29uc3QgbWFzc051bWJlclN0cmluZyA9IEJ1aWxkQW5BdG9tU3RyaW5ncy5tYXNzTnVtYmVyO1xyXG5jb25zdCBuZXRDaGFyZ2VTdHJpbmcgPSBCdWlsZEFuQXRvbVN0cmluZ3MubmV0Q2hhcmdlO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IElOVEVSX0JPWF9TUEFDSU5HID0gNztcclxuY29uc3QgQUNDT1JESU9OX0JPWF9CVVRUT05fRElMQVRJT04gPSAxMjtcclxuXHJcbmNsYXNzIEF0b21TY3JlZW5WaWV3IGV4dGVuZHMgQkFBU2NyZWVuVmlldyB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7QnVpbGRBbkF0b21Nb2RlbH0gbW9kZWwgQnVpbGQgYW4gQXRvbSBtb2RlbCBvYmplY3QuXHJcbiAgICogQHBhcmFtIHtUYW5kZW19IHRhbmRlbVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBtb2RlbCwgdGFuZGVtICkge1xyXG4gICAgc3VwZXIoIG1vZGVsLCB0YW5kZW0gKTtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZSAtIHByb3BlcnRpZXMgdGhhdCBhcmUgcGFzc2VkIHRvIHRoZSBhY2NvcmRpb24gYm94ZXMgdGhhdCBjb250cm9sIHRoZWlyIGV4cGFuc2lvbiBzdGF0ZVxyXG4gICAgdGhpcy5uZXRDaGFyZ2VBY2NvcmRpb25Cb3hFeHBhbmRlZFByb3BlcnR5ID0gbmV3IEJvb2xlYW5Qcm9wZXJ0eSggZmFsc2UsIHtcclxuICAgICAgdGFuZGVtOiB0YW5kZW0uY3JlYXRlVGFuZGVtKCAnbmV0Q2hhcmdlQWNjb3JkaW9uQm94RXhwYW5kZWRQcm9wZXJ0eScgKVxyXG4gICAgfSApO1xyXG4gICAgdGhpcy5tYXNzTnVtYmVyQWNjb3JkaW9uQm94RXhwYW5kZWRQcm9wZXJ0eSA9IG5ldyBCb29sZWFuUHJvcGVydHkoIGZhbHNlLCB7XHJcbiAgICAgIHRhbmRlbTogdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ21hc3NOdW1iZXJBY2NvcmRpb25Cb3hFeHBhbmRlZFByb3BlcnR5JyApXHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gb3B0aW9ucyB0aGF0IGFyZSBjb21tb24gdG8gYWxsIG9mIHRoZSBhY2NvcmRpb24gYm94ZXMgaW4gdGhpcyB2aWV3XHJcbiAgICBjb25zdCBjb21tb25BY2NvcmRpb25Cb3hPcHRpb25zID0ge1xyXG4gICAgICBjb3JuZXJSYWRpdXM6IDMsXHJcbiAgICAgIGZpbGw6IFNocmVkQ29uc3RhbnRzLkRJU1BMQVlfUEFORUxfQkFDS0dST1VORF9DT0xPUixcclxuICAgICAgY29udGVudEFsaWduOiAnbGVmdCcsXHJcbiAgICAgIHRpdGxlQWxpZ25YOiAnbGVmdCcsXHJcbiAgICAgIGJ1dHRvbkFsaWduOiAncmlnaHQnLFxyXG4gICAgICBtaW5XaWR0aDogdGhpcy5wZXJpb2RpY1RhYmxlQWNjb3JkaW9uQm94LndpZHRoLFxyXG4gICAgICBleHBhbmRDb2xsYXBzZUJ1dHRvbk9wdGlvbnM6IHtcclxuICAgICAgICB0b3VjaEFyZWFYRGlsYXRpb246IEFDQ09SRElPTl9CT1hfQlVUVE9OX0RJTEFUSU9OLFxyXG4gICAgICAgIHRvdWNoQXJlYVlEaWxhdGlvbjogQUNDT1JESU9OX0JPWF9CVVRUT05fRElMQVRJT05cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZGQgdGhlIGNoYXJnZSBtZXRlciBhbmQgY2hhcmdlIGNvbXBhcmlzb24gZGlzcGxheSBpbnNpZGUgb2YgYW4gYWNjb3JkaW9uIGJveC5cclxuICAgIGNvbnN0IG5ldENoYXJnZUFjY29yZGlvbkJveENvbnRlbnRzID0gbmV3IEhCb3goIHtcclxuICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICBuZXcgQ2hhcmdlTWV0ZXIoIG1vZGVsLnBhcnRpY2xlQXRvbSwgdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ2NoYXJnZU1ldGVyJyApICksXHJcbiAgICAgICAgbmV3IENoYXJnZUNvbXBhcmlzb25EaXNwbGF5KFxyXG4gICAgICAgICAgbW9kZWwucGFydGljbGVBdG9tLFxyXG4gICAgICAgICAgdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ2NoYXJnZUNvbXBhcmlzb25EaXNwbGF5JyApLFxyXG4gICAgICAgICAgeyBwaWNrYWJsZTogZmFsc2UgfVxyXG4gICAgICAgIClcclxuICAgICAgXSxcclxuICAgICAgc3BhY2luZzogNSxcclxuICAgICAgc2NhbGU6IDAuODUsIC8vIGVtcGlyaWNhbGx5IGRldGVybWluZWQgdG8ga2VlcCB0aGUgYm94IGhlaWdodCByZWFzb25hYmxlXHJcbiAgICAgIHBpY2thYmxlOiBmYWxzZSxcclxuICAgICAgdGFuZGVtOiB0YW5kZW0uY3JlYXRlVGFuZGVtKCAnbmV0Q2hhcmdlQWNjb3JkaW9uQm94Q29udGVudHMnICksXHJcblxyXG4gICAgICAvLyBwZG9tXHJcbiAgICAgIHRhZ05hbWU6ICdoNicsXHJcbiAgICAgIGlubmVyQ29udGVudDogJ05ldCBDaGFyZ2UgQ29udGVudCcgLy8gVE9ETzogZXhwb3J0IHRvIGExMXkgc3RyaW5ncyBmaWxlXHJcbiAgICB9ICk7XHJcbiAgICBjb25zdCBuZXRDaGFyZ2VBY2NvcmRpb25Cb3ggPSBuZXcgQWNjb3JkaW9uQm94KFxyXG4gICAgICBuZXRDaGFyZ2VBY2NvcmRpb25Cb3hDb250ZW50cyxcclxuICAgICAgbWVyZ2UoIHt9LCB7XHJcbiAgICAgICAgdGl0bGVOb2RlOiBuZXcgVGV4dCggbmV0Q2hhcmdlU3RyaW5nLCB7XHJcbiAgICAgICAgICBmb250OiBTaHJlZENvbnN0YW50cy5BQ0NPUkRJT05fQk9YX1RJVExFX0ZPTlQsXHJcbiAgICAgICAgICBtYXhXaWR0aDogU2hyZWRDb25zdGFudHMuQUNDT1JESU9OX0JPWF9USVRMRV9NQVhfV0lEVEgsXHJcbiAgICAgICAgICB0YW5kZW06IHRhbmRlbS5jcmVhdGVUYW5kZW0oICduZXRDaGFyZ2VBY2NvcmRpb25Cb3hUaXRsZVRleHQnIClcclxuICAgICAgICB9ICksXHJcbiAgICAgICAgZXhwYW5kZWRQcm9wZXJ0eTogdGhpcy5uZXRDaGFyZ2VBY2NvcmRpb25Cb3hFeHBhbmRlZFByb3BlcnR5LFxyXG5cclxuICAgICAgICAvLyBwaGV0LWlvXHJcbiAgICAgICAgdGFuZGVtOiB0YW5kZW0uY3JlYXRlVGFuZGVtKCAnbmV0Q2hhcmdlQWNjb3JkaW9uQm94JyApLFxyXG5cclxuICAgICAgICAvLyBwZG9tXHJcbiAgICAgICAgbGFiZWxDb250ZW50OiBuZXRDaGFyZ2VTdHJpbmdcclxuICAgICAgfSwgY29tbW9uQWNjb3JkaW9uQm94T3B0aW9ucyApXHJcbiAgICApO1xyXG4gICAgdGhpcy5jb250cm9sUGFuZWxMYXllci5hZGRDaGlsZCggbmV0Q2hhcmdlQWNjb3JkaW9uQm94ICk7XHJcblxyXG4gICAgLy8gQWRkIHRoZSBtYXNzIGluZGljYXRvciBpbnNpZGUgb2YgYW4gYWNjb3JkaW9uIGJveC5cclxuICAgIGNvbnN0IG1hc3NOdW1iZXJEaXNwbGF5ID0gbmV3IE1hc3NOdW1iZXJEaXNwbGF5KFxyXG4gICAgICBtb2RlbC5wYXJ0aWNsZUF0b20sXHJcbiAgICAgIHRhbmRlbS5jcmVhdGVUYW5kZW0oICdtYXNzTnVtYmVyRGlzcGxheScgKSxcclxuICAgICAge1xyXG4gICAgICAgIHBpY2thYmxlOiBmYWxzZSxcclxuICAgICAgICBzY2FsZTogMC44NSwgLy8gZW1waXJpY2FsbHkgZGV0ZXJtaW5lZCB0byBtYWtlIHRoZSBjb250cm9sIHBhbmVscyBhbGwgZml0IG9uIHRoZSBzY3JlZW5cclxuXHJcbiAgICAgICAgLy8gcGRvbVxyXG4gICAgICAgIHRhZ05hbWU6ICdoNicsXHJcbiAgICAgICAgaW5uZXJDb250ZW50OiAnTWFzcyBOdW1iZXIgQ29udGVudCcgLy8gVE9ETzogZXhwb3J0IHRvIGExMXkgc3RyaW5ncyBmaWxlXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICBjb25zdCBtYXNzTnVtYmVyQWNjb3JkaW9uQm94ID0gbmV3IEFjY29yZGlvbkJveChcclxuICAgICAgbWFzc051bWJlckRpc3BsYXksXHJcbiAgICAgIG1lcmdlKCB7fSwge1xyXG4gICAgICAgIHRpdGxlTm9kZTogbmV3IFRleHQoIG1hc3NOdW1iZXJTdHJpbmcsIHtcclxuICAgICAgICAgIGZvbnQ6IFNocmVkQ29uc3RhbnRzLkFDQ09SRElPTl9CT1hfVElUTEVfRk9OVCxcclxuICAgICAgICAgIG1heFdpZHRoOiBTaHJlZENvbnN0YW50cy5BQ0NPUkRJT05fQk9YX1RJVExFX01BWF9XSURUSCxcclxuICAgICAgICAgIHRhbmRlbTogdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ21hc3NOdW1iZXJBY2NvcmRpb25Cb3hUaXRsZVRleHQnIClcclxuICAgICAgICB9ICksXHJcbiAgICAgICAgZXhwYW5kZWRQcm9wZXJ0eTogdGhpcy5tYXNzTnVtYmVyQWNjb3JkaW9uQm94RXhwYW5kZWRQcm9wZXJ0eSxcclxuXHJcbiAgICAgICAgLy8gcGhldC1pb1xyXG4gICAgICAgIHRhbmRlbTogdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ21hc3NOdW1iZXJBY2NvcmRpb25Cb3gnICksXHJcblxyXG4gICAgICAgIC8vIHBkb21cclxuICAgICAgICBsYWJlbENvbnRlbnQ6IG1hc3NOdW1iZXJTdHJpbmdcclxuICAgICAgfSwgY29tbW9uQWNjb3JkaW9uQm94T3B0aW9ucyApXHJcbiAgICApO1xyXG4gICAgdGhpcy5jb250cm9sUGFuZWxMYXllci5hZGRDaGlsZCggbWFzc051bWJlckFjY29yZGlvbkJveCApO1xyXG5cclxuICAgIC8vIERvIHRoZSBsYXlvdXQuXHJcbiAgICBuZXRDaGFyZ2VBY2NvcmRpb25Cb3gucmlnaHQgPSB0aGlzLnBlcmlvZGljVGFibGVBY2NvcmRpb25Cb3gucmlnaHQ7XHJcbiAgICBuZXRDaGFyZ2VBY2NvcmRpb25Cb3gudG9wID0gdGhpcy5wZXJpb2RpY1RhYmxlQWNjb3JkaW9uQm94LmJvdHRvbSArIElOVEVSX0JPWF9TUEFDSU5HO1xyXG4gICAgbWFzc051bWJlckFjY29yZGlvbkJveC5yaWdodCA9IHRoaXMucGVyaW9kaWNUYWJsZUFjY29yZGlvbkJveC5yaWdodDtcclxuICAgIG1hc3NOdW1iZXJBY2NvcmRpb25Cb3gudG9wID0gbmV0Q2hhcmdlQWNjb3JkaW9uQm94LnRvcCArIG5ldENoYXJnZUFjY29yZGlvbkJveC5oZWlnaHQgKyBJTlRFUl9CT1hfU1BBQ0lORztcclxuXHJcbiAgICAvLyBwZG9tIC0gc2V0IG5hdmlnYXRpb24gb3JkZXIgZm9yIHRoZSBBdG9tIHNjcmVlbiB2aWV3XHJcbiAgICB0aGlzLnBkb21QbGF5QXJlYU5vZGUucGRvbU9yZGVyID0gWyB0aGlzLnBlcmlvZGljVGFibGVBY2NvcmRpb25Cb3gsIG5ldENoYXJnZUFjY29yZGlvbkJveCwgbWFzc051bWJlckFjY29yZGlvbkJveCBdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIHJlc2V0KCkge1xyXG4gICAgc3VwZXIucmVzZXQoKTtcclxuICAgIHRoaXMubmV0Q2hhcmdlQWNjb3JkaW9uQm94RXhwYW5kZWRQcm9wZXJ0eS5yZXNldCgpO1xyXG4gICAgdGhpcy5tYXNzTnVtYmVyQWNjb3JkaW9uQm94RXhwYW5kZWRQcm9wZXJ0eS5yZXNldCgpO1xyXG4gIH1cclxufVxyXG5cclxuYnVpbGRBbkF0b20ucmVnaXN0ZXIoICdBdG9tU2NyZWVuVmlldycsIEF0b21TY3JlZW5WaWV3ICk7XHJcbmV4cG9ydCBkZWZhdWx0IEF0b21TY3JlZW5WaWV3OyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLE9BQU9BLGVBQWUsTUFBTSx3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