// Copyright 2014-2023, University of Colorado Boulder

/**
 * Screen view where the user makes isotopes of a given element by adding and removing neutrons.
 *
 * @author John Blanco
 * @author Jesse Greenberg
 * @author Aadish Gupta
 */

import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import ExpandedPeriodicTableNode from '../../../../shred/js/view/ExpandedPeriodicTableNode.js';
import ParticleCountDisplay from '../../../../shred/js/view/ParticleCountDisplay.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import isotopesAndAtomicMass from '../../isotopesAndAtomicMass.js';
import IsotopesAndAtomicMassStrings from '../../IsotopesAndAtomicMassStrings.js';
import AtomScaleNode from './AtomScaleNode.js';
import InteractiveIsotopeNode from './InteractiveIsotopeNode.js';
import TwoItemPieChartNode from './TwoItemPieChartNode.js';

// constants
const NUMBER_FONT = new PhetFont(70);
const NUMBER_INSET = 20; // In screen coords, which are roughly pixels.
const SYMBOL_BOX_WIDTH = 275; // In screen coords, which are roughly pixels.
const SYMBOL_BOX_HEIGHT = 300; // In screen coords, which are roughly pixels.
const OPEN_CLOSE_BUTTON_TOUCH_AREA_DILATION = 12;
const abundanceInNatureString = IsotopesAndAtomicMassStrings.abundanceInNature;
const symbolString = IsotopesAndAtomicMassStrings.symbol;
class MakeIsotopesScreenView extends ScreenView {
  /**
   * @param {MakeIsotopesModel} makeIsotopesModel
   * @param {Tandem} tandem
   */
  constructor(makeIsotopesModel, tandem) {
    super({
      layoutBounds: ShredConstants.LAYOUT_BOUNDS
    });

    // Set up the model-canvas transform.  IMPORTANT NOTES: The multiplier factors for the point in the view can be
    // adjusted to shift the center right or left, and the scale factor can be adjusted to zoom in or out (smaller
    // numbers zoom out, larger ones zoom in).
    this.modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(Vector2.ZERO, new Vector2(Utils.roundSymmetric(this.layoutBounds.width * 0.4), Utils.roundSymmetric(this.layoutBounds.height * 0.49)), 1.0);

    // Layers upon which the various display elements are placed. This allows us to create the desired layering effects.
    const indicatorLayer = new Node();
    this.addChild(indicatorLayer);
    //adding this layer later so that its on the top
    const atomLayer = new Node();

    // Create and add the Reset All Button in the bottom right, which resets the model
    const resetAllButton = new ResetAllButton({
      listener: () => {
        makeIsotopesModel.reset();
        scaleNode.reset();
        symbolBox.expandedProperty.reset();
        abundanceBox.expandedProperty.reset();
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    });
    resetAllButton.scale(0.85);
    this.addChild(resetAllButton);

    // Create the node that represents the scale upon which the atom sits.
    const scaleNode = new AtomScaleNode(makeIsotopesModel.particleAtom);

    // The scale needs to sit just below the atom, and there are some "tweak factors" needed to get it looking right.
    scaleNode.setCenterBottom(new Vector2(this.modelViewTransform.modelToViewX(0), this.bottom));
    this.addChild(scaleNode);

    // Create the node that contains both the atom and the neutron bucket.
    const bottomOfAtomPosition = new Vector2(scaleNode.centerX, scaleNode.top + 15); //empirically determined

    const atomAndBucketNode = new InteractiveIsotopeNode(makeIsotopesModel, this.modelViewTransform, bottomOfAtomPosition);
    atomLayer.addChild(atomAndBucketNode);

    // Add the interactive periodic table that allows the user to select the current element.  Heaviest interactive
    // element is Neon for this sim.
    const periodicTableNode = new ExpandedPeriodicTableNode(makeIsotopesModel.numberAtom, 10, {
      tandem: tandem
    });
    periodicTableNode.scale(0.65);
    periodicTableNode.top = 10;
    periodicTableNode.right = this.layoutBounds.width - 10;
    this.addChild(periodicTableNode);

    // Add the legend/particle count indicator.
    const particleCountLegend = new ParticleCountDisplay(makeIsotopesModel.particleAtom, 13, 250);
    particleCountLegend.scale(1.1);
    particleCountLegend.left = 20;
    particleCountLegend.top = periodicTableNode.visibleBounds.minY;
    indicatorLayer.addChild(particleCountLegend);
    const symbolRectangle = new Rectangle(0, 0, SYMBOL_BOX_WIDTH, SYMBOL_BOX_HEIGHT, 0, 0, {
      fill: 'white',
      stroke: 'black',
      lineWidth: 2
    });

    // Add the symbol text.
    const symbolText = new Text('', {
      font: new PhetFont(150),
      fill: 'black',
      center: new Vector2(symbolRectangle.width / 2, symbolRectangle.height / 2)
    });

    // Add the listener to update the symbol text.
    const textCenter = new Vector2(symbolRectangle.width / 2, symbolRectangle.height / 2);
    // Doesn't need unlink as it stays through out the sim life
    makeIsotopesModel.particleAtom.protonCountProperty.link(protonCount => {
      const symbol = AtomIdentifier.getSymbol(protonCount);
      symbolText.string = protonCount > 0 ? symbol : '';
      symbolText.center = textCenter;
    });
    symbolRectangle.addChild(symbolText);

    // Add the proton count display.
    const protonCountDisplay = new Text('0', {
      font: NUMBER_FONT,
      fill: 'red'
    });
    symbolRectangle.addChild(protonCountDisplay);

    // Add the listener to update the proton count.
    // Doesn't need unlink as it stays through out the sim life
    makeIsotopesModel.particleAtom.protonCountProperty.link(protonCount => {
      protonCountDisplay.string = protonCount;
      protonCountDisplay.left = NUMBER_INSET;
      protonCountDisplay.bottom = SYMBOL_BOX_HEIGHT - NUMBER_INSET;
    });

    // Add the mass number display.
    const massNumberDisplay = new Text('0', {
      font: NUMBER_FONT,
      fill: 'black'
    });
    symbolRectangle.addChild(massNumberDisplay);

    // Add the listener to update the mass number.
    // Doesn't need unlink as it stays through out the sim life
    makeIsotopesModel.particleAtom.massNumberProperty.link(massNumber => {
      massNumberDisplay.string = massNumber;
      massNumberDisplay.left = NUMBER_INSET;
      massNumberDisplay.top = NUMBER_INSET;
    });
    symbolRectangle.scale(0.20);
    const symbolBox = new AccordionBox(symbolRectangle, {
      cornerRadius: 3,
      titleNode: new Text(symbolString, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH
      }),
      fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      expandedProperty: new Property(false),
      minWidth: periodicTableNode.visibleBounds.width,
      contentAlign: 'center',
      titleAlignX: 'left',
      buttonAlign: 'right',
      expandCollapseButtonOptions: {
        touchAreaXDilation: OPEN_CLOSE_BUTTON_TOUCH_AREA_DILATION,
        touchAreaYDilation: OPEN_CLOSE_BUTTON_TOUCH_AREA_DILATION
      }
    });
    symbolBox.left = periodicTableNode.visibleBounds.minX;
    symbolBox.top = periodicTableNode.bottom + 10;
    this.addChild(symbolBox);
    const abundanceBox = new AccordionBox(new TwoItemPieChartNode(makeIsotopesModel), {
      cornerRadius: 3,
      titleNode: new Text(abundanceInNatureString, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH
      }),
      fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      expandedProperty: new Property(false),
      minWidth: periodicTableNode.visibleBounds.width,
      contentAlign: 'center',
      contentXMargin: 0,
      titleAlignX: 'left',
      buttonAlign: 'right',
      expandCollapseButtonOptions: {
        touchAreaXDilation: OPEN_CLOSE_BUTTON_TOUCH_AREA_DILATION,
        touchAreaYDilation: OPEN_CLOSE_BUTTON_TOUCH_AREA_DILATION
      }
    });
    abundanceBox.left = symbolBox.left;
    abundanceBox.top = symbolBox.bottom + 10;
    this.addChild(abundanceBox);
    this.addChild(atomLayer);
  }
}
isotopesAndAtomicMass.register('MakeIsotopesScreenView', MakeIsotopesScreenView);
export default MakeIsotopesScreenView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQcm9wZXJ0eSIsIlV0aWxzIiwiVmVjdG9yMiIsIlNjcmVlblZpZXciLCJNb2RlbFZpZXdUcmFuc2Zvcm0yIiwiUmVzZXRBbGxCdXR0b24iLCJQaGV0Rm9udCIsIk5vZGUiLCJSZWN0YW5nbGUiLCJUZXh0IiwiQXRvbUlkZW50aWZpZXIiLCJTaHJlZENvbnN0YW50cyIsIkV4cGFuZGVkUGVyaW9kaWNUYWJsZU5vZGUiLCJQYXJ0aWNsZUNvdW50RGlzcGxheSIsIkFjY29yZGlvbkJveCIsImlzb3RvcGVzQW5kQXRvbWljTWFzcyIsIklzb3RvcGVzQW5kQXRvbWljTWFzc1N0cmluZ3MiLCJBdG9tU2NhbGVOb2RlIiwiSW50ZXJhY3RpdmVJc290b3BlTm9kZSIsIlR3b0l0ZW1QaWVDaGFydE5vZGUiLCJOVU1CRVJfRk9OVCIsIk5VTUJFUl9JTlNFVCIsIlNZTUJPTF9CT1hfV0lEVEgiLCJTWU1CT0xfQk9YX0hFSUdIVCIsIk9QRU5fQ0xPU0VfQlVUVE9OX1RPVUNIX0FSRUFfRElMQVRJT04iLCJhYnVuZGFuY2VJbk5hdHVyZVN0cmluZyIsImFidW5kYW5jZUluTmF0dXJlIiwic3ltYm9sU3RyaW5nIiwic3ltYm9sIiwiTWFrZUlzb3RvcGVzU2NyZWVuVmlldyIsImNvbnN0cnVjdG9yIiwibWFrZUlzb3RvcGVzTW9kZWwiLCJ0YW5kZW0iLCJsYXlvdXRCb3VuZHMiLCJMQVlPVVRfQk9VTkRTIiwibW9kZWxWaWV3VHJhbnNmb3JtIiwiY3JlYXRlU2luZ2xlUG9pbnRTY2FsZUludmVydGVkWU1hcHBpbmciLCJaRVJPIiwicm91bmRTeW1tZXRyaWMiLCJ3aWR0aCIsImhlaWdodCIsImluZGljYXRvckxheWVyIiwiYWRkQ2hpbGQiLCJhdG9tTGF5ZXIiLCJyZXNldEFsbEJ1dHRvbiIsImxpc3RlbmVyIiwicmVzZXQiLCJzY2FsZU5vZGUiLCJzeW1ib2xCb3giLCJleHBhbmRlZFByb3BlcnR5IiwiYWJ1bmRhbmNlQm94IiwicmlnaHQiLCJtYXhYIiwiYm90dG9tIiwibWF4WSIsInNjYWxlIiwicGFydGljbGVBdG9tIiwic2V0Q2VudGVyQm90dG9tIiwibW9kZWxUb1ZpZXdYIiwiYm90dG9tT2ZBdG9tUG9zaXRpb24iLCJjZW50ZXJYIiwidG9wIiwiYXRvbUFuZEJ1Y2tldE5vZGUiLCJwZXJpb2RpY1RhYmxlTm9kZSIsIm51bWJlckF0b20iLCJwYXJ0aWNsZUNvdW50TGVnZW5kIiwibGVmdCIsInZpc2libGVCb3VuZHMiLCJtaW5ZIiwic3ltYm9sUmVjdGFuZ2xlIiwiZmlsbCIsInN0cm9rZSIsImxpbmVXaWR0aCIsInN5bWJvbFRleHQiLCJmb250IiwiY2VudGVyIiwidGV4dENlbnRlciIsInByb3RvbkNvdW50UHJvcGVydHkiLCJsaW5rIiwicHJvdG9uQ291bnQiLCJnZXRTeW1ib2wiLCJzdHJpbmciLCJwcm90b25Db3VudERpc3BsYXkiLCJtYXNzTnVtYmVyRGlzcGxheSIsIm1hc3NOdW1iZXJQcm9wZXJ0eSIsIm1hc3NOdW1iZXIiLCJjb3JuZXJSYWRpdXMiLCJ0aXRsZU5vZGUiLCJBQ0NPUkRJT05fQk9YX1RJVExFX0ZPTlQiLCJtYXhXaWR0aCIsIkFDQ09SRElPTl9CT1hfVElUTEVfTUFYX1dJRFRIIiwiRElTUExBWV9QQU5FTF9CQUNLR1JPVU5EX0NPTE9SIiwibWluV2lkdGgiLCJjb250ZW50QWxpZ24iLCJ0aXRsZUFsaWduWCIsImJ1dHRvbkFsaWduIiwiZXhwYW5kQ29sbGFwc2VCdXR0b25PcHRpb25zIiwidG91Y2hBcmVhWERpbGF0aW9uIiwidG91Y2hBcmVhWURpbGF0aW9uIiwibWluWCIsImNvbnRlbnRYTWFyZ2luIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJNYWtlSXNvdG9wZXNTY3JlZW5WaWV3LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE0LTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFNjcmVlbiB2aWV3IHdoZXJlIHRoZSB1c2VyIG1ha2VzIGlzb3RvcGVzIG9mIGEgZ2l2ZW4gZWxlbWVudCBieSBhZGRpbmcgYW5kIHJlbW92aW5nIG5ldXRyb25zLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEpvaG4gQmxhbmNvXHJcbiAqIEBhdXRob3IgSmVzc2UgR3JlZW5iZXJnXHJcbiAqIEBhdXRob3IgQWFkaXNoIEd1cHRhXHJcbiAqL1xyXG5cclxuaW1wb3J0IFByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1V0aWxzLmpzJztcclxuaW1wb3J0IFZlY3RvcjIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1ZlY3RvcjIuanMnO1xyXG5pbXBvcnQgU2NyZWVuVmlldyBmcm9tICcuLi8uLi8uLi8uLi9qb2lzdC9qcy9TY3JlZW5WaWV3LmpzJztcclxuaW1wb3J0IE1vZGVsVmlld1RyYW5zZm9ybTIgZnJvbSAnLi4vLi4vLi4vLi4vcGhldGNvbW1vbi9qcy92aWV3L01vZGVsVmlld1RyYW5zZm9ybTIuanMnO1xyXG5pbXBvcnQgUmVzZXRBbGxCdXR0b24gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL2J1dHRvbnMvUmVzZXRBbGxCdXR0b24uanMnO1xyXG5pbXBvcnQgUGhldEZvbnQgZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL1BoZXRGb250LmpzJztcclxuaW1wb3J0IHsgTm9kZSwgUmVjdGFuZ2xlLCBUZXh0IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IEF0b21JZGVudGlmaWVyIGZyb20gJy4uLy4uLy4uLy4uL3NocmVkL2pzL0F0b21JZGVudGlmaWVyLmpzJztcclxuaW1wb3J0IFNocmVkQ29uc3RhbnRzIGZyb20gJy4uLy4uLy4uLy4uL3NocmVkL2pzL1NocmVkQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IEV4cGFuZGVkUGVyaW9kaWNUYWJsZU5vZGUgZnJvbSAnLi4vLi4vLi4vLi4vc2hyZWQvanMvdmlldy9FeHBhbmRlZFBlcmlvZGljVGFibGVOb2RlLmpzJztcclxuaW1wb3J0IFBhcnRpY2xlQ291bnREaXNwbGF5IGZyb20gJy4uLy4uLy4uLy4uL3NocmVkL2pzL3ZpZXcvUGFydGljbGVDb3VudERpc3BsYXkuanMnO1xyXG5pbXBvcnQgQWNjb3JkaW9uQm94IGZyb20gJy4uLy4uLy4uLy4uL3N1bi9qcy9BY2NvcmRpb25Cb3guanMnO1xyXG5pbXBvcnQgaXNvdG9wZXNBbmRBdG9taWNNYXNzIGZyb20gJy4uLy4uL2lzb3RvcGVzQW5kQXRvbWljTWFzcy5qcyc7XHJcbmltcG9ydCBJc290b3Blc0FuZEF0b21pY01hc3NTdHJpbmdzIGZyb20gJy4uLy4uL0lzb3RvcGVzQW5kQXRvbWljTWFzc1N0cmluZ3MuanMnO1xyXG5pbXBvcnQgQXRvbVNjYWxlTm9kZSBmcm9tICcuL0F0b21TY2FsZU5vZGUuanMnO1xyXG5pbXBvcnQgSW50ZXJhY3RpdmVJc290b3BlTm9kZSBmcm9tICcuL0ludGVyYWN0aXZlSXNvdG9wZU5vZGUuanMnO1xyXG5pbXBvcnQgVHdvSXRlbVBpZUNoYXJ0Tm9kZSBmcm9tICcuL1R3b0l0ZW1QaWVDaGFydE5vZGUuanMnO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IE5VTUJFUl9GT05UID0gbmV3IFBoZXRGb250KCA3MCApO1xyXG5jb25zdCBOVU1CRVJfSU5TRVQgPSAyMDsgLy8gSW4gc2NyZWVuIGNvb3Jkcywgd2hpY2ggYXJlIHJvdWdobHkgcGl4ZWxzLlxyXG5jb25zdCBTWU1CT0xfQk9YX1dJRFRIID0gMjc1OyAvLyBJbiBzY3JlZW4gY29vcmRzLCB3aGljaCBhcmUgcm91Z2hseSBwaXhlbHMuXHJcbmNvbnN0IFNZTUJPTF9CT1hfSEVJR0hUID0gMzAwOyAvLyBJbiBzY3JlZW4gY29vcmRzLCB3aGljaCBhcmUgcm91Z2hseSBwaXhlbHMuXHJcbmNvbnN0IE9QRU5fQ0xPU0VfQlVUVE9OX1RPVUNIX0FSRUFfRElMQVRJT04gPSAxMjtcclxuXHJcbmNvbnN0IGFidW5kYW5jZUluTmF0dXJlU3RyaW5nID0gSXNvdG9wZXNBbmRBdG9taWNNYXNzU3RyaW5ncy5hYnVuZGFuY2VJbk5hdHVyZTtcclxuY29uc3Qgc3ltYm9sU3RyaW5nID0gSXNvdG9wZXNBbmRBdG9taWNNYXNzU3RyaW5ncy5zeW1ib2w7XHJcblxyXG5jbGFzcyBNYWtlSXNvdG9wZXNTY3JlZW5WaWV3IGV4dGVuZHMgU2NyZWVuVmlldyB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7TWFrZUlzb3RvcGVzTW9kZWx9IG1ha2VJc290b3Blc01vZGVsXHJcbiAgICogQHBhcmFtIHtUYW5kZW19IHRhbmRlbVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBtYWtlSXNvdG9wZXNNb2RlbCwgdGFuZGVtICkge1xyXG4gICAgc3VwZXIoIHsgbGF5b3V0Qm91bmRzOiBTaHJlZENvbnN0YW50cy5MQVlPVVRfQk9VTkRTIH0gKTtcclxuXHJcbiAgICAvLyBTZXQgdXAgdGhlIG1vZGVsLWNhbnZhcyB0cmFuc2Zvcm0uICBJTVBPUlRBTlQgTk9URVM6IFRoZSBtdWx0aXBsaWVyIGZhY3RvcnMgZm9yIHRoZSBwb2ludCBpbiB0aGUgdmlldyBjYW4gYmVcclxuICAgIC8vIGFkanVzdGVkIHRvIHNoaWZ0IHRoZSBjZW50ZXIgcmlnaHQgb3IgbGVmdCwgYW5kIHRoZSBzY2FsZSBmYWN0b3IgY2FuIGJlIGFkanVzdGVkIHRvIHpvb20gaW4gb3Igb3V0IChzbWFsbGVyXHJcbiAgICAvLyBudW1iZXJzIHpvb20gb3V0LCBsYXJnZXIgb25lcyB6b29tIGluKS5cclxuICAgIHRoaXMubW9kZWxWaWV3VHJhbnNmb3JtID0gTW9kZWxWaWV3VHJhbnNmb3JtMi5jcmVhdGVTaW5nbGVQb2ludFNjYWxlSW52ZXJ0ZWRZTWFwcGluZyggVmVjdG9yMi5aRVJPLFxyXG4gICAgICBuZXcgVmVjdG9yMiggVXRpbHMucm91bmRTeW1tZXRyaWMoIHRoaXMubGF5b3V0Qm91bmRzLndpZHRoICogMC40ICksXHJcbiAgICAgICAgVXRpbHMucm91bmRTeW1tZXRyaWMoIHRoaXMubGF5b3V0Qm91bmRzLmhlaWdodCAqIDAuNDkgKSApLFxyXG4gICAgICAxLjBcclxuICAgICk7XHJcblxyXG4gICAgLy8gTGF5ZXJzIHVwb24gd2hpY2ggdGhlIHZhcmlvdXMgZGlzcGxheSBlbGVtZW50cyBhcmUgcGxhY2VkLiBUaGlzIGFsbG93cyB1cyB0byBjcmVhdGUgdGhlIGRlc2lyZWQgbGF5ZXJpbmcgZWZmZWN0cy5cclxuICAgIGNvbnN0IGluZGljYXRvckxheWVyID0gbmV3IE5vZGUoKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIGluZGljYXRvckxheWVyICk7XHJcbiAgICAvL2FkZGluZyB0aGlzIGxheWVyIGxhdGVyIHNvIHRoYXQgaXRzIG9uIHRoZSB0b3BcclxuICAgIGNvbnN0IGF0b21MYXllciA9IG5ldyBOb2RlKCk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIGFuZCBhZGQgdGhlIFJlc2V0IEFsbCBCdXR0b24gaW4gdGhlIGJvdHRvbSByaWdodCwgd2hpY2ggcmVzZXRzIHRoZSBtb2RlbFxyXG4gICAgY29uc3QgcmVzZXRBbGxCdXR0b24gPSBuZXcgUmVzZXRBbGxCdXR0b24oIHtcclxuICAgICAgbGlzdGVuZXI6ICgpID0+IHtcclxuICAgICAgICBtYWtlSXNvdG9wZXNNb2RlbC5yZXNldCgpO1xyXG4gICAgICAgIHNjYWxlTm9kZS5yZXNldCgpO1xyXG4gICAgICAgIHN5bWJvbEJveC5leHBhbmRlZFByb3BlcnR5LnJlc2V0KCk7XHJcbiAgICAgICAgYWJ1bmRhbmNlQm94LmV4cGFuZGVkUHJvcGVydHkucmVzZXQoKTtcclxuICAgICAgfSxcclxuICAgICAgcmlnaHQ6IHRoaXMubGF5b3V0Qm91bmRzLm1heFggLSAxMCxcclxuICAgICAgYm90dG9tOiB0aGlzLmxheW91dEJvdW5kcy5tYXhZIC0gMTBcclxuICAgIH0gKTtcclxuICAgIHJlc2V0QWxsQnV0dG9uLnNjYWxlKCAwLjg1ICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCByZXNldEFsbEJ1dHRvbiApO1xyXG5cclxuXHJcbiAgICAvLyBDcmVhdGUgdGhlIG5vZGUgdGhhdCByZXByZXNlbnRzIHRoZSBzY2FsZSB1cG9uIHdoaWNoIHRoZSBhdG9tIHNpdHMuXHJcbiAgICBjb25zdCBzY2FsZU5vZGUgPSBuZXcgQXRvbVNjYWxlTm9kZSggbWFrZUlzb3RvcGVzTW9kZWwucGFydGljbGVBdG9tICk7XHJcblxyXG4gICAgLy8gVGhlIHNjYWxlIG5lZWRzIHRvIHNpdCBqdXN0IGJlbG93IHRoZSBhdG9tLCBhbmQgdGhlcmUgYXJlIHNvbWUgXCJ0d2VhayBmYWN0b3JzXCIgbmVlZGVkIHRvIGdldCBpdCBsb29raW5nIHJpZ2h0LlxyXG4gICAgc2NhbGVOb2RlLnNldENlbnRlckJvdHRvbSggbmV3IFZlY3RvcjIoIHRoaXMubW9kZWxWaWV3VHJhbnNmb3JtLm1vZGVsVG9WaWV3WCggMCApLCB0aGlzLmJvdHRvbSApICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCBzY2FsZU5vZGUgKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgdGhlIG5vZGUgdGhhdCBjb250YWlucyBib3RoIHRoZSBhdG9tIGFuZCB0aGUgbmV1dHJvbiBidWNrZXQuXHJcbiAgICBjb25zdCBib3R0b21PZkF0b21Qb3NpdGlvbiA9IG5ldyBWZWN0b3IyKCBzY2FsZU5vZGUuY2VudGVyWCwgc2NhbGVOb2RlLnRvcCArIDE1ICk7IC8vZW1waXJpY2FsbHkgZGV0ZXJtaW5lZFxyXG5cclxuICAgIGNvbnN0IGF0b21BbmRCdWNrZXROb2RlID0gbmV3IEludGVyYWN0aXZlSXNvdG9wZU5vZGUoIG1ha2VJc290b3Blc01vZGVsLCB0aGlzLm1vZGVsVmlld1RyYW5zZm9ybSwgYm90dG9tT2ZBdG9tUG9zaXRpb24gKTtcclxuICAgIGF0b21MYXllci5hZGRDaGlsZCggYXRvbUFuZEJ1Y2tldE5vZGUgKTtcclxuXHJcbiAgICAvLyBBZGQgdGhlIGludGVyYWN0aXZlIHBlcmlvZGljIHRhYmxlIHRoYXQgYWxsb3dzIHRoZSB1c2VyIHRvIHNlbGVjdCB0aGUgY3VycmVudCBlbGVtZW50LiAgSGVhdmllc3QgaW50ZXJhY3RpdmVcclxuICAgIC8vIGVsZW1lbnQgaXMgTmVvbiBmb3IgdGhpcyBzaW0uXHJcbiAgICBjb25zdCBwZXJpb2RpY1RhYmxlTm9kZSA9IG5ldyBFeHBhbmRlZFBlcmlvZGljVGFibGVOb2RlKCBtYWtlSXNvdG9wZXNNb2RlbC5udW1iZXJBdG9tLCAxMCwge1xyXG4gICAgICB0YW5kZW06IHRhbmRlbVxyXG4gICAgfSApO1xyXG4gICAgcGVyaW9kaWNUYWJsZU5vZGUuc2NhbGUoIDAuNjUgKTtcclxuICAgIHBlcmlvZGljVGFibGVOb2RlLnRvcCA9IDEwO1xyXG4gICAgcGVyaW9kaWNUYWJsZU5vZGUucmlnaHQgPSB0aGlzLmxheW91dEJvdW5kcy53aWR0aCAtIDEwO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggcGVyaW9kaWNUYWJsZU5vZGUgKTtcclxuXHJcbiAgICAvLyBBZGQgdGhlIGxlZ2VuZC9wYXJ0aWNsZSBjb3VudCBpbmRpY2F0b3IuXHJcbiAgICBjb25zdCBwYXJ0aWNsZUNvdW50TGVnZW5kID0gbmV3IFBhcnRpY2xlQ291bnREaXNwbGF5KCBtYWtlSXNvdG9wZXNNb2RlbC5wYXJ0aWNsZUF0b20sIDEzLCAyNTAgKTtcclxuICAgIHBhcnRpY2xlQ291bnRMZWdlbmQuc2NhbGUoIDEuMSApO1xyXG4gICAgcGFydGljbGVDb3VudExlZ2VuZC5sZWZ0ID0gMjA7XHJcbiAgICBwYXJ0aWNsZUNvdW50TGVnZW5kLnRvcCA9IHBlcmlvZGljVGFibGVOb2RlLnZpc2libGVCb3VuZHMubWluWTtcclxuICAgIGluZGljYXRvckxheWVyLmFkZENoaWxkKCBwYXJ0aWNsZUNvdW50TGVnZW5kICk7XHJcblxyXG4gICAgY29uc3Qgc3ltYm9sUmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSggMCwgMCwgU1lNQk9MX0JPWF9XSURUSCwgU1lNQk9MX0JPWF9IRUlHSFQsIDAsIDAsIHtcclxuICAgICAgZmlsbDogJ3doaXRlJyxcclxuICAgICAgc3Ryb2tlOiAnYmxhY2snLFxyXG4gICAgICBsaW5lV2lkdGg6IDJcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBBZGQgdGhlIHN5bWJvbCB0ZXh0LlxyXG4gICAgY29uc3Qgc3ltYm9sVGV4dCA9IG5ldyBUZXh0KCAnJywge1xyXG4gICAgICBmb250OiBuZXcgUGhldEZvbnQoIDE1MCApLFxyXG4gICAgICBmaWxsOiAnYmxhY2snLFxyXG4gICAgICBjZW50ZXI6IG5ldyBWZWN0b3IyKCBzeW1ib2xSZWN0YW5nbGUud2lkdGggLyAyLCBzeW1ib2xSZWN0YW5nbGUuaGVpZ2h0IC8gMiApXHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gQWRkIHRoZSBsaXN0ZW5lciB0byB1cGRhdGUgdGhlIHN5bWJvbCB0ZXh0LlxyXG4gICAgY29uc3QgdGV4dENlbnRlciA9IG5ldyBWZWN0b3IyKCBzeW1ib2xSZWN0YW5nbGUud2lkdGggLyAyLCBzeW1ib2xSZWN0YW5nbGUuaGVpZ2h0IC8gMiApO1xyXG4gICAgLy8gRG9lc24ndCBuZWVkIHVubGluayBhcyBpdCBzdGF5cyB0aHJvdWdoIG91dCB0aGUgc2ltIGxpZmVcclxuICAgIG1ha2VJc290b3Blc01vZGVsLnBhcnRpY2xlQXRvbS5wcm90b25Db3VudFByb3BlcnR5LmxpbmsoIHByb3RvbkNvdW50ID0+IHtcclxuICAgICAgY29uc3Qgc3ltYm9sID0gQXRvbUlkZW50aWZpZXIuZ2V0U3ltYm9sKCBwcm90b25Db3VudCApO1xyXG4gICAgICBzeW1ib2xUZXh0LnN0cmluZyA9IHByb3RvbkNvdW50ID4gMCA/IHN5bWJvbCA6ICcnO1xyXG4gICAgICBzeW1ib2xUZXh0LmNlbnRlciA9IHRleHRDZW50ZXI7XHJcbiAgICB9ICk7XHJcbiAgICBzeW1ib2xSZWN0YW5nbGUuYWRkQ2hpbGQoIHN5bWJvbFRleHQgKTtcclxuXHJcbiAgICAvLyBBZGQgdGhlIHByb3RvbiBjb3VudCBkaXNwbGF5LlxyXG4gICAgY29uc3QgcHJvdG9uQ291bnREaXNwbGF5ID0gbmV3IFRleHQoICcwJywge1xyXG4gICAgICBmb250OiBOVU1CRVJfRk9OVCxcclxuICAgICAgZmlsbDogJ3JlZCdcclxuICAgIH0gKTtcclxuICAgIHN5bWJvbFJlY3RhbmdsZS5hZGRDaGlsZCggcHJvdG9uQ291bnREaXNwbGF5ICk7XHJcblxyXG4gICAgLy8gQWRkIHRoZSBsaXN0ZW5lciB0byB1cGRhdGUgdGhlIHByb3RvbiBjb3VudC5cclxuICAgIC8vIERvZXNuJ3QgbmVlZCB1bmxpbmsgYXMgaXQgc3RheXMgdGhyb3VnaCBvdXQgdGhlIHNpbSBsaWZlXHJcbiAgICBtYWtlSXNvdG9wZXNNb2RlbC5wYXJ0aWNsZUF0b20ucHJvdG9uQ291bnRQcm9wZXJ0eS5saW5rKCBwcm90b25Db3VudCA9PiB7XHJcbiAgICAgIHByb3RvbkNvdW50RGlzcGxheS5zdHJpbmcgPSBwcm90b25Db3VudDtcclxuICAgICAgcHJvdG9uQ291bnREaXNwbGF5LmxlZnQgPSBOVU1CRVJfSU5TRVQ7XHJcbiAgICAgIHByb3RvbkNvdW50RGlzcGxheS5ib3R0b20gPSBTWU1CT0xfQk9YX0hFSUdIVCAtIE5VTUJFUl9JTlNFVDtcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBBZGQgdGhlIG1hc3MgbnVtYmVyIGRpc3BsYXkuXHJcbiAgICBjb25zdCBtYXNzTnVtYmVyRGlzcGxheSA9IG5ldyBUZXh0KCAnMCcsIHtcclxuICAgICAgZm9udDogTlVNQkVSX0ZPTlQsXHJcbiAgICAgIGZpbGw6ICdibGFjaydcclxuICAgIH0gKTtcclxuICAgIHN5bWJvbFJlY3RhbmdsZS5hZGRDaGlsZCggbWFzc051bWJlckRpc3BsYXkgKTtcclxuXHJcbiAgICAvLyBBZGQgdGhlIGxpc3RlbmVyIHRvIHVwZGF0ZSB0aGUgbWFzcyBudW1iZXIuXHJcbiAgICAvLyBEb2Vzbid0IG5lZWQgdW5saW5rIGFzIGl0IHN0YXlzIHRocm91Z2ggb3V0IHRoZSBzaW0gbGlmZVxyXG4gICAgbWFrZUlzb3RvcGVzTW9kZWwucGFydGljbGVBdG9tLm1hc3NOdW1iZXJQcm9wZXJ0eS5saW5rKCBtYXNzTnVtYmVyID0+IHtcclxuICAgICAgbWFzc051bWJlckRpc3BsYXkuc3RyaW5nID0gbWFzc051bWJlcjtcclxuICAgICAgbWFzc051bWJlckRpc3BsYXkubGVmdCA9IE5VTUJFUl9JTlNFVDtcclxuICAgICAgbWFzc051bWJlckRpc3BsYXkudG9wID0gTlVNQkVSX0lOU0VUO1xyXG4gICAgfSApO1xyXG5cclxuICAgIHN5bWJvbFJlY3RhbmdsZS5zY2FsZSggMC4yMCApO1xyXG4gICAgY29uc3Qgc3ltYm9sQm94ID0gbmV3IEFjY29yZGlvbkJveCggc3ltYm9sUmVjdGFuZ2xlLCB7XHJcbiAgICAgIGNvcm5lclJhZGl1czogMyxcclxuICAgICAgdGl0bGVOb2RlOiBuZXcgVGV4dCggc3ltYm9sU3RyaW5nLCB7XHJcbiAgICAgICAgZm9udDogU2hyZWRDb25zdGFudHMuQUNDT1JESU9OX0JPWF9USVRMRV9GT05ULFxyXG4gICAgICAgIG1heFdpZHRoOiBTaHJlZENvbnN0YW50cy5BQ0NPUkRJT05fQk9YX1RJVExFX01BWF9XSURUSFxyXG4gICAgICB9ICksXHJcbiAgICAgIGZpbGw6IFNocmVkQ29uc3RhbnRzLkRJU1BMQVlfUEFORUxfQkFDS0dST1VORF9DT0xPUixcclxuICAgICAgZXhwYW5kZWRQcm9wZXJ0eTogbmV3IFByb3BlcnR5KCBmYWxzZSApLFxyXG4gICAgICBtaW5XaWR0aDogcGVyaW9kaWNUYWJsZU5vZGUudmlzaWJsZUJvdW5kcy53aWR0aCxcclxuICAgICAgY29udGVudEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgdGl0bGVBbGlnblg6ICdsZWZ0JyxcclxuICAgICAgYnV0dG9uQWxpZ246ICdyaWdodCcsXHJcbiAgICAgIGV4cGFuZENvbGxhcHNlQnV0dG9uT3B0aW9uczoge1xyXG4gICAgICAgIHRvdWNoQXJlYVhEaWxhdGlvbjogT1BFTl9DTE9TRV9CVVRUT05fVE9VQ0hfQVJFQV9ESUxBVElPTixcclxuICAgICAgICB0b3VjaEFyZWFZRGlsYXRpb246IE9QRU5fQ0xPU0VfQlVUVE9OX1RPVUNIX0FSRUFfRElMQVRJT05cclxuICAgICAgfVxyXG4gICAgfSApO1xyXG4gICAgc3ltYm9sQm94LmxlZnQgPSBwZXJpb2RpY1RhYmxlTm9kZS52aXNpYmxlQm91bmRzLm1pblg7XHJcbiAgICBzeW1ib2xCb3gudG9wID0gcGVyaW9kaWNUYWJsZU5vZGUuYm90dG9tICsgMTA7XHJcbiAgICB0aGlzLmFkZENoaWxkKCBzeW1ib2xCb3ggKTtcclxuXHJcbiAgICBjb25zdCBhYnVuZGFuY2VCb3ggPSBuZXcgQWNjb3JkaW9uQm94KCBuZXcgVHdvSXRlbVBpZUNoYXJ0Tm9kZSggbWFrZUlzb3RvcGVzTW9kZWwgKSwge1xyXG4gICAgICBjb3JuZXJSYWRpdXM6IDMsXHJcbiAgICAgIHRpdGxlTm9kZTogbmV3IFRleHQoIGFidW5kYW5jZUluTmF0dXJlU3RyaW5nLCB7XHJcbiAgICAgICAgZm9udDogU2hyZWRDb25zdGFudHMuQUNDT1JESU9OX0JPWF9USVRMRV9GT05ULFxyXG4gICAgICAgIG1heFdpZHRoOiBTaHJlZENvbnN0YW50cy5BQ0NPUkRJT05fQk9YX1RJVExFX01BWF9XSURUSFxyXG4gICAgICB9ICksXHJcbiAgICAgIGZpbGw6IFNocmVkQ29uc3RhbnRzLkRJU1BMQVlfUEFORUxfQkFDS0dST1VORF9DT0xPUixcclxuICAgICAgZXhwYW5kZWRQcm9wZXJ0eTogbmV3IFByb3BlcnR5KCBmYWxzZSApLFxyXG4gICAgICBtaW5XaWR0aDogcGVyaW9kaWNUYWJsZU5vZGUudmlzaWJsZUJvdW5kcy53aWR0aCxcclxuICAgICAgY29udGVudEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgY29udGVudFhNYXJnaW46IDAsXHJcbiAgICAgIHRpdGxlQWxpZ25YOiAnbGVmdCcsXHJcbiAgICAgIGJ1dHRvbkFsaWduOiAncmlnaHQnLFxyXG4gICAgICBleHBhbmRDb2xsYXBzZUJ1dHRvbk9wdGlvbnM6IHtcclxuICAgICAgICB0b3VjaEFyZWFYRGlsYXRpb246IE9QRU5fQ0xPU0VfQlVUVE9OX1RPVUNIX0FSRUFfRElMQVRJT04sXHJcbiAgICAgICAgdG91Y2hBcmVhWURpbGF0aW9uOiBPUEVOX0NMT1NFX0JVVFRPTl9UT1VDSF9BUkVBX0RJTEFUSU9OXHJcbiAgICAgIH1cclxuICAgIH0gKTtcclxuICAgIGFidW5kYW5jZUJveC5sZWZ0ID0gc3ltYm9sQm94LmxlZnQ7XHJcbiAgICBhYnVuZGFuY2VCb3gudG9wID0gc3ltYm9sQm94LmJvdHRvbSArIDEwO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggYWJ1bmRhbmNlQm94ICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCBhdG9tTGF5ZXIgKTtcclxuICB9XHJcbn1cclxuXHJcbmlzb3RvcGVzQW5kQXRvbWljTWFzcy5yZWdpc3RlciggJ01ha2VJc290b3Blc1NjcmVlblZpZXcnLCBNYWtlSXNvdG9wZXNTY3JlZW5WaWV3ICk7XHJcbmV4cG9ydCBkZWZhdWx0IE1ha2VJc290b3Blc1NjcmVlblZpZXc7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxRQUFRLE1BQU0saUNBQWlDO0FBQ3RELE9BQU9DLEtBQUssTUFBTSw2QkFBNkI7QUFDL0MsT0FBT0MsT0FBTyxNQUFNLCtCQUErQjtBQUNuRCxPQUFPQyxVQUFVLE1BQU0sb0NBQW9DO0FBQzNELE9BQU9DLG1CQUFtQixNQUFNLHVEQUF1RDtBQUN2RixPQUFPQyxjQUFjLE1BQU0sdURBQXVEO0FBQ2xGLE9BQU9DLFFBQVEsTUFBTSx5Q0FBeUM7QUFDOUQsU0FBU0MsSUFBSSxFQUFFQyxTQUFTLEVBQUVDLElBQUksUUFBUSxtQ0FBbUM7QUFDekUsT0FBT0MsY0FBYyxNQUFNLHdDQUF3QztBQUNuRSxPQUFPQyxjQUFjLE1BQU0sd0NBQXdDO0FBQ25FLE9BQU9DLHlCQUF5QixNQUFNLHdEQUF3RDtBQUM5RixPQUFPQyxvQkFBb0IsTUFBTSxtREFBbUQ7QUFDcEYsT0FBT0MsWUFBWSxNQUFNLG9DQUFvQztB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