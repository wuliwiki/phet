// Copyright 2018-2022, University of Colorado Boulder

/**
 * @author AUTHOR
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import wilder from '../../wilder.js';
import WilderNode from './WilderNode.js';
class WilderScreenView extends ScreenView {
  constructor(wilderModel, providedOptions) {
    super(providedOptions);
    const wilderNode = new WilderNode({
      x: 100,
      y: 100
    });
    wilderNode.flipOver();
    this.addChild(wilderNode);

    // Reset All button
    const resetAllButton = new ResetAllButton({
      listener: () => {
        wilderModel.reset();
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10,
      tandem: providedOptions.tandem.createTandem('resetAllButton')
    });
    this.addChild(resetAllButton);
  }
}
wilder.register('WilderScreenView', WilderScreenView);
export default WilderScreenView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTY3JlZW5WaWV3IiwiUmVzZXRBbGxCdXR0b24iLCJ3aWxkZXIiLCJXaWxkZXJOb2RlIiwiV2lsZGVyU2NyZWVuVmlldyIsImNvbnN0cnVjdG9yIiwid2lsZGVyTW9kZWwiLCJwcm92aWRlZE9wdGlvbnMiLCJ3aWxkZXJOb2RlIiwieCIsInkiLCJmbGlwT3ZlciIsImFkZENoaWxkIiwicmVzZXRBbGxCdXR0b24iLCJsaXN0ZW5lciIsInJlc2V0IiwicmlnaHQiLCJsYXlvdXRCb3VuZHMiLCJtYXhYIiwiYm90dG9tIiwibWF4WSIsInRhbmRlbSIsImNyZWF0ZVRhbmRlbSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiV2lsZGVyU2NyZWVuVmlldy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIEFVVEhPUlxyXG4gKi9cclxuXHJcbmltcG9ydCBTY3JlZW5WaWV3IGZyb20gJy4uLy4uLy4uLy4uL2pvaXN0L2pzL1NjcmVlblZpZXcuanMnO1xyXG5pbXBvcnQgUmVzZXRBbGxCdXR0b24gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS1waGV0L2pzL2J1dHRvbnMvUmVzZXRBbGxCdXR0b24uanMnO1xyXG5pbXBvcnQgd2lsZGVyIGZyb20gJy4uLy4uL3dpbGRlci5qcyc7XHJcbmltcG9ydCBXaWxkZXJOb2RlIGZyb20gJy4vV2lsZGVyTm9kZS5qcyc7XHJcbmltcG9ydCBXaWxkZXJNb2RlbCBmcm9tICcuLi9tb2RlbC9XaWxkZXJNb2RlbC5qcyc7XHJcbmltcG9ydCBUYW5kZW0gZnJvbSAnLi4vLi4vLi4vLi4vdGFuZGVtL2pzL1RhbmRlbS5qcyc7XHJcblxyXG50eXBlIFdpbGRlclNjcmVlblZpZXdPcHRpb25zID0ge1xyXG4gIHRhbmRlbTogVGFuZGVtO1xyXG59O1xyXG5cclxuY2xhc3MgV2lsZGVyU2NyZWVuVmlldyBleHRlbmRzIFNjcmVlblZpZXcge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvciggd2lsZGVyTW9kZWw6IFdpbGRlck1vZGVsLCBwcm92aWRlZE9wdGlvbnM6IFdpbGRlclNjcmVlblZpZXdPcHRpb25zICkge1xyXG4gICAgc3VwZXIoIHByb3ZpZGVkT3B0aW9ucyApO1xyXG5cclxuICAgIGNvbnN0IHdpbGRlck5vZGUgPSBuZXcgV2lsZGVyTm9kZSggeyB4OiAxMDAsIHk6IDEwMCB9ICk7XHJcbiAgICB3aWxkZXJOb2RlLmZsaXBPdmVyKCk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCB3aWxkZXJOb2RlICk7XHJcblxyXG4gICAgLy8gUmVzZXQgQWxsIGJ1dHRvblxyXG4gICAgY29uc3QgcmVzZXRBbGxCdXR0b24gPSBuZXcgUmVzZXRBbGxCdXR0b24oIHtcclxuICAgICAgbGlzdGVuZXI6ICgpID0+IHtcclxuICAgICAgICB3aWxkZXJNb2RlbC5yZXNldCgpO1xyXG4gICAgICB9LFxyXG4gICAgICByaWdodDogdGhpcy5sYXlvdXRCb3VuZHMubWF4WCAtIDEwLFxyXG4gICAgICBib3R0b206IHRoaXMubGF5b3V0Qm91bmRzLm1heFkgLSAxMCxcclxuICAgICAgdGFuZGVtOiBwcm92aWRlZE9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3Jlc2V0QWxsQnV0dG9uJyApXHJcbiAgICB9ICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCByZXNldEFsbEJ1dHRvbiApO1xyXG4gIH1cclxufVxyXG5cclxud2lsZGVyLnJlZ2lzdGVyKCAnV2lsZGVyU2NyZWVuVmlldycsIFdpbGRlclNjcmVlblZpZXcgKTtcclxuZXhwb3J0IGRlZmF1bHQgV2lsZGVyU2NyZWVuVmlldzsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxVQUFVLE1BQU0sb0NBQW9DO0FBQzNELE9BQU9DLGNBQWMsTUFBTSx1REFBdUQ7QUFDbEYsT0FBT0MsTUFBTSxNQUFNLGlCQUFpQjtBQUNwQyxPQUFPQyxVQUFVLE1BQU0saUJBQWlCO0FBUXhDLE1BQU1DLGdCQUFnQixTQUFTSixVQUFVLENBQUM7RUFDakNLLFdBQVdBLENBQUVDLFdBQXdCLEVBQUVDLGVBQXdDLEVBQUc7SUFDdkYsS0FBSyxDQUFFQSxlQUFnQixDQUFDO0lBRXhCLE1BQU1DLFVBQVUsR0FBRyxJQUFJTCxVQUFVLENBQUU7TUFBRU0sQ0FBQyxFQUFFLEdBQUc7TUFBRUMsQ0FBQyxFQUFFO0lBQUksQ0FBRSxDQUFDO0lBQ3ZERixVQUFVLENBQUNHLFFBQVEsQ0FBQyxDQUFDO0lBQ3JCLElBQUksQ0FBQ0MsUUFBUSxDQUFFSixVQUFXLENBQUM7O0lBRTNCO0lBQ0EsTUFBTUssY0FBYyxHQUFHLElBQUlaLGNBQWMsQ0FBRTtNQUN6Q2EsUUFBUSxFQUFFQSxDQUFBLEtBQU07UUFDZFIsV0FBVyxDQUFDUyxLQUFLLENBQUMsQ0FBQztNQUNyQixDQUFDO01BQ0RDLEtBQUssRUFBRSxJQUFJLENBQUNDLFlBQVksQ0FBQ0MsSUFBSSxHQUFHLEVBQUU7TUFDbENDLE1BQU0sRUFBRSxJQUFJLENBQUNGLFlBQVksQ0FBQ0csSUFBSSxHQUFHLEVBQUU7TUFDbkNDLE1BQU0sRUFBRWQsZUFBZSxDQUFDYyxNQUFNLENBQUNDLFlBQVksQ0FBRSxnQkFBaUI7SUFDaEUsQ0FBRSxDQUFDO0lBQ0gsSUFBSSxDQUFDVixRQUFRLENBQUVDLGNBQWUsQ0FBQztFQUNqQztBQUNGO0FBRUFYLE1BQU0sQ0FBQ3FCLFFBQVEsQ0FBRSxrQkFBa0IsRUFBRW5CLGdCQUFpQixDQUFDO0FBQ3ZELGVBQWVBLGdCQUFnQiJ9