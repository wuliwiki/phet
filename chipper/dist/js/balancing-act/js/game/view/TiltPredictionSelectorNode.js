// Copyright 2014-2022, University of Colorado Boulder

/**
 * A Scenery node that defines a user interface element which allows the user
 * to select one of three possible ways in which the balance might behave -
 * tilt left, tilt right, or stay balanced.
 *
 * @author John Blanco
 */

import Property from '../../../../axon/js/Property.js';
import { HBox, Node } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import plankBalanced_png from '../../../images/plankBalanced_png.js';
import plankTippedLeft_png from '../../../images/plankTippedLeft_png.js';
import plankTippedRight_png from '../../../images/plankTippedRight_png.js';
import balancingAct from '../../balancingAct.js';
import TiltPredictionSelectionPanel from './TiltPredictionSelectionPanel.js';
class TiltPredictionSelectorNode extends Node {
  /**
   * @param gameStateProperty
   */
  constructor(gameStateProperty) {
    super();

    // Property that tracks the selected prediction.  Valid values are 'none',
    // 'tiltDownOnLeftSide', 'stayBalanced', and 'tiltDownOnRightSide'.
    this.tiltPredictionProperty = new Property('none'); // TODO: Enumeration

    const panelContents = new HBox({
      children: [new TiltPredictionSelectionPanel(plankTippedLeft_png, 'tiltDownOnLeftSide', this.tiltPredictionProperty, gameStateProperty), new TiltPredictionSelectionPanel(plankBalanced_png, 'stayBalanced', this.tiltPredictionProperty, gameStateProperty), new TiltPredictionSelectionPanel(plankTippedRight_png, 'tiltDownOnRightSide', this.tiltPredictionProperty, gameStateProperty)],
      spacing: 5
    });
    this.addChild(new Panel(panelContents, {
      cornerRadius: 5
    }));
  }
}
balancingAct.register('TiltPredictionSelectorNode', TiltPredictionSelectorNode);
export default TiltPredictionSelectorNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQcm9wZXJ0eSIsIkhCb3giLCJOb2RlIiwiUGFuZWwiLCJwbGFua0JhbGFuY2VkX3BuZyIsInBsYW5rVGlwcGVkTGVmdF9wbmciLCJwbGFua1RpcHBlZFJpZ2h0X3BuZyIsImJhbGFuY2luZ0FjdCIsIlRpbHRQcmVkaWN0aW9uU2VsZWN0aW9uUGFuZWwiLCJUaWx0UHJlZGljdGlvblNlbGVjdG9yTm9kZSIsImNvbnN0cnVjdG9yIiwiZ2FtZVN0YXRlUHJvcGVydHkiLCJ0aWx0UHJlZGljdGlvblByb3BlcnR5IiwicGFuZWxDb250ZW50cyIsImNoaWxkcmVuIiwic3BhY2luZyIsImFkZENoaWxkIiwiY29ybmVyUmFkaXVzIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJUaWx0UHJlZGljdGlvblNlbGVjdG9yTm9kZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNC0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBBIFNjZW5lcnkgbm9kZSB0aGF0IGRlZmluZXMgYSB1c2VyIGludGVyZmFjZSBlbGVtZW50IHdoaWNoIGFsbG93cyB0aGUgdXNlclxyXG4gKiB0byBzZWxlY3Qgb25lIG9mIHRocmVlIHBvc3NpYmxlIHdheXMgaW4gd2hpY2ggdGhlIGJhbGFuY2UgbWlnaHQgYmVoYXZlIC1cclxuICogdGlsdCBsZWZ0LCB0aWx0IHJpZ2h0LCBvciBzdGF5IGJhbGFuY2VkLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEpvaG4gQmxhbmNvXHJcbiAqL1xyXG5cclxuaW1wb3J0IFByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgeyBIQm94LCBOb2RlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IFBhbmVsIGZyb20gJy4uLy4uLy4uLy4uL3N1bi9qcy9QYW5lbC5qcyc7XHJcbmltcG9ydCBwbGFua0JhbGFuY2VkX3BuZyBmcm9tICcuLi8uLi8uLi9pbWFnZXMvcGxhbmtCYWxhbmNlZF9wbmcuanMnO1xyXG5pbXBvcnQgcGxhbmtUaXBwZWRMZWZ0X3BuZyBmcm9tICcuLi8uLi8uLi9pbWFnZXMvcGxhbmtUaXBwZWRMZWZ0X3BuZy5qcyc7XHJcbmltcG9ydCBwbGFua1RpcHBlZFJpZ2h0X3BuZyBmcm9tICcuLi8uLi8uLi9pbWFnZXMvcGxhbmtUaXBwZWRSaWdodF9wbmcuanMnO1xyXG5pbXBvcnQgYmFsYW5jaW5nQWN0IGZyb20gJy4uLy4uL2JhbGFuY2luZ0FjdC5qcyc7XHJcbmltcG9ydCBUaWx0UHJlZGljdGlvblNlbGVjdGlvblBhbmVsIGZyb20gJy4vVGlsdFByZWRpY3Rpb25TZWxlY3Rpb25QYW5lbC5qcyc7XHJcblxyXG5jbGFzcyBUaWx0UHJlZGljdGlvblNlbGVjdG9yTm9kZSBleHRlbmRzIE5vZGUge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gZ2FtZVN0YXRlUHJvcGVydHlcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggZ2FtZVN0YXRlUHJvcGVydHkgKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIC8vIFByb3BlcnR5IHRoYXQgdHJhY2tzIHRoZSBzZWxlY3RlZCBwcmVkaWN0aW9uLiAgVmFsaWQgdmFsdWVzIGFyZSAnbm9uZScsXHJcbiAgICAvLyAndGlsdERvd25PbkxlZnRTaWRlJywgJ3N0YXlCYWxhbmNlZCcsIGFuZCAndGlsdERvd25PblJpZ2h0U2lkZScuXHJcbiAgICB0aGlzLnRpbHRQcmVkaWN0aW9uUHJvcGVydHkgPSBuZXcgUHJvcGVydHkoICdub25lJyApOyAvLyBUT0RPOiBFbnVtZXJhdGlvblxyXG5cclxuICAgIGNvbnN0IHBhbmVsQ29udGVudHMgPSBuZXcgSEJveChcclxuICAgICAge1xyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICBuZXcgVGlsdFByZWRpY3Rpb25TZWxlY3Rpb25QYW5lbCggcGxhbmtUaXBwZWRMZWZ0X3BuZywgJ3RpbHREb3duT25MZWZ0U2lkZScsIHRoaXMudGlsdFByZWRpY3Rpb25Qcm9wZXJ0eSwgZ2FtZVN0YXRlUHJvcGVydHkgKSxcclxuICAgICAgICAgIG5ldyBUaWx0UHJlZGljdGlvblNlbGVjdGlvblBhbmVsKCBwbGFua0JhbGFuY2VkX3BuZywgJ3N0YXlCYWxhbmNlZCcsIHRoaXMudGlsdFByZWRpY3Rpb25Qcm9wZXJ0eSwgZ2FtZVN0YXRlUHJvcGVydHkgKSxcclxuICAgICAgICAgIG5ldyBUaWx0UHJlZGljdGlvblNlbGVjdGlvblBhbmVsKCBwbGFua1RpcHBlZFJpZ2h0X3BuZywgJ3RpbHREb3duT25SaWdodFNpZGUnLCB0aGlzLnRpbHRQcmVkaWN0aW9uUHJvcGVydHksIGdhbWVTdGF0ZVByb3BlcnR5IClcclxuICAgICAgICBdLCBzcGFjaW5nOiA1XHJcbiAgICAgIH0gKTtcclxuXHJcbiAgICB0aGlzLmFkZENoaWxkKCBuZXcgUGFuZWwoIHBhbmVsQ29udGVudHMsIHsgY29ybmVyUmFkaXVzOiA1IH0gKSApO1xyXG4gIH1cclxufVxyXG5cclxuYmFsYW5jaW5nQWN0LnJlZ2lzdGVyKCAnVGlsdFByZWRpY3Rpb25TZWxlY3Rvck5vZGUnLCBUaWx0UHJlZGljdGlvblNlbGVjdG9yTm9kZSApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGlsdFByZWRpY3Rpb25TZWxlY3Rvck5vZGU7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxRQUFRLE1BQU0saUNBQWlDO0FBQ3RELFNBQVNDLElBQUksRUFBRUMsSUFBSSxRQUFRLG1DQUFtQztBQUM5RCxPQUFPQyxLQUFLLE1BQU0sNkJBQTZCO0FBQy9DLE9BQU9DLGlCQUFpQixNQUFNLHNDQUFzQztBQUNwRSxPQUFPQyxtQkFBbUIsTUFBTSx3Q0FBd0M7QUFDeEUsT0FBT0Msb0JBQW9CLE1BQU0seUNBQXlDO0FBQzFFLE9BQU9DLFlBQVksTUFBTSx1QkFBdUI7QUFDaEQsT0FBT0MsNEJBQTRCLE1BQU0sbUNBQW1DO0FBRTVFLE1BQU1DLDBCQUEwQixTQUFTUCxJQUFJLENBQUM7RUFFNUM7QUFDRjtBQUNBO0VBQ0VRLFdBQVdBLENBQUVDLGlCQUFpQixFQUFHO0lBQy9CLEtBQUssQ0FBQyxDQUFDOztJQUVQO0lBQ0E7SUFDQSxJQUFJLENBQUNDLHNCQUFzQixHQUFHLElBQUlaLFFBQVEsQ0FBRSxNQUFPLENBQUMsQ0FBQyxDQUFDOztJQUV0RCxNQUFNYSxhQUFhLEdBQUcsSUFBSVosSUFBSSxDQUM1QjtNQUNFYSxRQUFRLEVBQUUsQ0FDUixJQUFJTiw0QkFBNEIsQ0FBRUgsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxDQUFDTyxzQkFBc0IsRUFBRUQsaUJBQWtCLENBQUMsRUFDN0gsSUFBSUgsNEJBQTRCLENBQUVKLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUNRLHNCQUFzQixFQUFFRCxpQkFBa0IsQ0FBQyxFQUNySCxJQUFJSCw0QkFBNEIsQ0FBRUYsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxDQUFDTSxzQkFBc0IsRUFBRUQsaUJBQWtCLENBQUMsQ0FDaEk7TUFBRUksT0FBTyxFQUFFO0lBQ2QsQ0FBRSxDQUFDO0lBRUwsSUFBSSxDQUFDQyxRQUFRLENBQUUsSUFBSWIsS0FBSyxDQUFFVSxhQUFhLEVBQUU7TUFBRUksWUFBWSxFQUFFO0lBQUUsQ0FBRSxDQUFFLENBQUM7RUFDbEU7QUFDRjtBQUVBVixZQUFZLENBQUNXLFFBQVEsQ0FBRSw0QkFBNEIsRUFBRVQsMEJBQTJCLENBQUM7QUFFakYsZUFBZUEsMEJBQTBCIn0=