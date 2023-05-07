// Copyright 2014-2023, University of Colorado Boulder

/**
 * Visual representation of a bond dipole.
 * Controls its own position, so clients should not attempt to position this node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPColors from '../MPColors.js';
import DipoleNode from './DipoleNode.js';

// constants
const PERPENDICULAR_OFFSET = 55; // offset perpendicular to the axis of the bond

export default class BondDipoleNode extends DipoleNode {
  constructor(bond, providedOptions) {
    const options = optionize()({
      // DipoleNodeOptions
      fill: MPColors.BOND_DIPOLE
    }, providedOptions);
    super(bond.dipoleProperty, options);

    // position the dipole to be parallel with the bond, with some perpendicular offset
    bond.dipoleProperty.link(dipole => {
      const bondAngle = bond.getAngle();
      const isInPhase = Math.abs(bondAngle - dipole.angle) < Math.PI / 4;
      const dipoleViewLength = dipole.magnitude * (this.referenceLength / this.referenceMagnitude);

      // position of tail in polar coordinates, relative to center of bond
      const offsetX = isInPhase ? dipoleViewLength / 2 : -(dipoleViewLength / 2);
      const offsetAngle = Math.atan(offsetX / PERPENDICULAR_OFFSET);
      const tailDistance = PERPENDICULAR_OFFSET / Math.cos(offsetAngle);
      const tailAngle = bondAngle - Math.PI / 2 - offsetAngle;

      // position of tail in Cartesian coordinates, relative to center of bond
      const tailX = tailDistance * Math.cos(tailAngle);
      const tailY = tailDistance * Math.sin(tailAngle);

      // position of tail in global coordinate frame
      this.translation = bond.getCenter().plusXY(tailX, tailY);
    });
  }
  dispose() {
    assert && assert(false, 'dispose is not supported, exists for the lifetime of the sim');
    super.dispose();
  }

  /**
   * Creates an icon, for use in control panels.
   */
  static createIcon() {
    return DipoleNode.createIcon({
      fill: MPColors.BOND_DIPOLE
    });
  }
}
moleculePolarity.register('BondDipoleNode', BondDipoleNode);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25pemUiLCJtb2xlY3VsZVBvbGFyaXR5IiwiTVBDb2xvcnMiLCJEaXBvbGVOb2RlIiwiUEVSUEVORElDVUxBUl9PRkZTRVQiLCJCb25kRGlwb2xlTm9kZSIsImNvbnN0cnVjdG9yIiwiYm9uZCIsInByb3ZpZGVkT3B0aW9ucyIsIm9wdGlvbnMiLCJmaWxsIiwiQk9ORF9ESVBPTEUiLCJkaXBvbGVQcm9wZXJ0eSIsImxpbmsiLCJkaXBvbGUiLCJib25kQW5nbGUiLCJnZXRBbmdsZSIsImlzSW5QaGFzZSIsIk1hdGgiLCJhYnMiLCJhbmdsZSIsIlBJIiwiZGlwb2xlVmlld0xlbmd0aCIsIm1hZ25pdHVkZSIsInJlZmVyZW5jZUxlbmd0aCIsInJlZmVyZW5jZU1hZ25pdHVkZSIsIm9mZnNldFgiLCJvZmZzZXRBbmdsZSIsImF0YW4iLCJ0YWlsRGlzdGFuY2UiLCJjb3MiLCJ0YWlsQW5nbGUiLCJ0YWlsWCIsInRhaWxZIiwic2luIiwidHJhbnNsYXRpb24iLCJnZXRDZW50ZXIiLCJwbHVzWFkiLCJkaXNwb3NlIiwiYXNzZXJ0IiwiY3JlYXRlSWNvbiIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiQm9uZERpcG9sZU5vZGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTQtMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogVmlzdWFsIHJlcHJlc2VudGF0aW9uIG9mIGEgYm9uZCBkaXBvbGUuXHJcbiAqIENvbnRyb2xzIGl0cyBvd24gcG9zaXRpb24sIHNvIGNsaWVudHMgc2hvdWxkIG5vdCBhdHRlbXB0IHRvIHBvc2l0aW9uIHRoaXMgbm9kZS5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgb3B0aW9uaXplLCB7IEVtcHR5U2VsZk9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvb3B0aW9uaXplLmpzJztcclxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBtb2xlY3VsZVBvbGFyaXR5IGZyb20gJy4uLy4uL21vbGVjdWxlUG9sYXJpdHkuanMnO1xyXG5pbXBvcnQgQm9uZCBmcm9tICcuLi9tb2RlbC9Cb25kLmpzJztcclxuaW1wb3J0IE1QQ29sb3JzIGZyb20gJy4uL01QQ29sb3JzLmpzJztcclxuaW1wb3J0IERpcG9sZU5vZGUsIHsgRGlwb2xlTm9kZU9wdGlvbnMgfSBmcm9tICcuL0RpcG9sZU5vZGUuanMnO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IFBFUlBFTkRJQ1VMQVJfT0ZGU0VUID0gNTU7IC8vIG9mZnNldCBwZXJwZW5kaWN1bGFyIHRvIHRoZSBheGlzIG9mIHRoZSBib25kXHJcblxyXG50eXBlIFNlbGZPcHRpb25zID0gRW1wdHlTZWxmT3B0aW9ucztcclxuXHJcbnR5cGUgQm9uZERpcG9sZU5vZGVPcHRpb25zID0gU2VsZk9wdGlvbnMgJiBEaXBvbGVOb2RlT3B0aW9ucztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvbmREaXBvbGVOb2RlIGV4dGVuZHMgRGlwb2xlTm9kZSB7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggYm9uZDogQm9uZCwgcHJvdmlkZWRPcHRpb25zPzogQm9uZERpcG9sZU5vZGVPcHRpb25zICkge1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25pemU8Qm9uZERpcG9sZU5vZGVPcHRpb25zLCBTZWxmT3B0aW9ucywgRGlwb2xlTm9kZU9wdGlvbnM+KCkoIHtcclxuXHJcbiAgICAgIC8vIERpcG9sZU5vZGVPcHRpb25zXHJcbiAgICAgIGZpbGw6IE1QQ29sb3JzLkJPTkRfRElQT0xFXHJcbiAgICB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICBzdXBlciggYm9uZC5kaXBvbGVQcm9wZXJ0eSwgb3B0aW9ucyApO1xyXG5cclxuICAgIC8vIHBvc2l0aW9uIHRoZSBkaXBvbGUgdG8gYmUgcGFyYWxsZWwgd2l0aCB0aGUgYm9uZCwgd2l0aCBzb21lIHBlcnBlbmRpY3VsYXIgb2Zmc2V0XHJcbiAgICBib25kLmRpcG9sZVByb3BlcnR5LmxpbmsoIGRpcG9sZSA9PiB7XHJcblxyXG4gICAgICBjb25zdCBib25kQW5nbGUgPSBib25kLmdldEFuZ2xlKCk7XHJcbiAgICAgIGNvbnN0IGlzSW5QaGFzZSA9IE1hdGguYWJzKCBib25kQW5nbGUgLSBkaXBvbGUuYW5nbGUgKSA8ICggTWF0aC5QSSAvIDQgKTtcclxuICAgICAgY29uc3QgZGlwb2xlVmlld0xlbmd0aCA9IGRpcG9sZS5tYWduaXR1ZGUgKiAoIHRoaXMucmVmZXJlbmNlTGVuZ3RoIC8gdGhpcy5yZWZlcmVuY2VNYWduaXR1ZGUgKTtcclxuXHJcbiAgICAgIC8vIHBvc2l0aW9uIG9mIHRhaWwgaW4gcG9sYXIgY29vcmRpbmF0ZXMsIHJlbGF0aXZlIHRvIGNlbnRlciBvZiBib25kXHJcbiAgICAgIGNvbnN0IG9mZnNldFggPSBpc0luUGhhc2UgPyAoIGRpcG9sZVZpZXdMZW5ndGggLyAyICkgOiAtKCBkaXBvbGVWaWV3TGVuZ3RoIC8gMiApO1xyXG4gICAgICBjb25zdCBvZmZzZXRBbmdsZSA9IE1hdGguYXRhbiggb2Zmc2V0WCAvIFBFUlBFTkRJQ1VMQVJfT0ZGU0VUICk7XHJcbiAgICAgIGNvbnN0IHRhaWxEaXN0YW5jZSA9IFBFUlBFTkRJQ1VMQVJfT0ZGU0VUIC8gTWF0aC5jb3MoIG9mZnNldEFuZ2xlICk7XHJcbiAgICAgIGNvbnN0IHRhaWxBbmdsZSA9IGJvbmRBbmdsZSAtICggTWF0aC5QSSAvIDIgKSAtIG9mZnNldEFuZ2xlO1xyXG5cclxuICAgICAgLy8gcG9zaXRpb24gb2YgdGFpbCBpbiBDYXJ0ZXNpYW4gY29vcmRpbmF0ZXMsIHJlbGF0aXZlIHRvIGNlbnRlciBvZiBib25kXHJcbiAgICAgIGNvbnN0IHRhaWxYID0gdGFpbERpc3RhbmNlICogTWF0aC5jb3MoIHRhaWxBbmdsZSApO1xyXG4gICAgICBjb25zdCB0YWlsWSA9IHRhaWxEaXN0YW5jZSAqIE1hdGguc2luKCB0YWlsQW5nbGUgKTtcclxuXHJcbiAgICAgIC8vIHBvc2l0aW9uIG9mIHRhaWwgaW4gZ2xvYmFsIGNvb3JkaW5hdGUgZnJhbWVcclxuICAgICAgdGhpcy50cmFuc2xhdGlvbiA9IGJvbmQuZ2V0Q2VudGVyKCkucGx1c1hZKCB0YWlsWCwgdGFpbFkgKTtcclxuICAgIH0gKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvdmVycmlkZSBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggZmFsc2UsICdkaXNwb3NlIGlzIG5vdCBzdXBwb3J0ZWQsIGV4aXN0cyBmb3IgdGhlIGxpZmV0aW1lIG9mIHRoZSBzaW0nICk7XHJcbiAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuIGljb24sIGZvciB1c2UgaW4gY29udHJvbCBwYW5lbHMuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBvdmVycmlkZSBjcmVhdGVJY29uKCk6IE5vZGUge1xyXG4gICAgcmV0dXJuIERpcG9sZU5vZGUuY3JlYXRlSWNvbiggeyBmaWxsOiBNUENvbG9ycy5CT05EX0RJUE9MRSB9ICk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2xlY3VsZVBvbGFyaXR5LnJlZ2lzdGVyKCAnQm9uZERpcG9sZU5vZGUnLCBCb25kRGlwb2xlTm9kZSApOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFNBQVMsTUFBNEIsdUNBQXVDO0FBRW5GLE9BQU9DLGdCQUFnQixNQUFNLDJCQUEyQjtBQUV4RCxPQUFPQyxRQUFRLE1BQU0sZ0JBQWdCO0FBQ3JDLE9BQU9DLFVBQVUsTUFBNkIsaUJBQWlCOztBQUUvRDtBQUNBLE1BQU1DLG9CQUFvQixHQUFHLEVBQUUsQ0FBQyxDQUFDOztBQU1qQyxlQUFlLE1BQU1DLGNBQWMsU0FBU0YsVUFBVSxDQUFDO0VBRTlDRyxXQUFXQSxDQUFFQyxJQUFVLEVBQUVDLGVBQXVDLEVBQUc7SUFFeEUsTUFBTUMsT0FBTyxHQUFHVCxTQUFTLENBQXdELENBQUMsQ0FBRTtNQUVsRjtNQUNBVSxJQUFJLEVBQUVSLFFBQVEsQ0FBQ1M7SUFDakIsQ0FBQyxFQUFFSCxlQUFnQixDQUFDO0lBRXBCLEtBQUssQ0FBRUQsSUFBSSxDQUFDSyxjQUFjLEVBQUVILE9BQVEsQ0FBQzs7SUFFckM7SUFDQUYsSUFBSSxDQUFDSyxjQUFjLENBQUNDLElBQUksQ0FBRUMsTUFBTSxJQUFJO01BRWxDLE1BQU1DLFNBQVMsR0FBR1IsSUFBSSxDQUFDUyxRQUFRLENBQUMsQ0FBQztNQUNqQyxNQUFNQyxTQUFTLEdBQUdDLElBQUksQ0FBQ0MsR0FBRyxDQUFFSixTQUFTLEdBQUdELE1BQU0sQ0FBQ00sS0FBTSxDQUFDLEdBQUtGLElBQUksQ0FBQ0csRUFBRSxHQUFHLENBQUc7TUFDeEUsTUFBTUMsZ0JBQWdCLEdBQUdSLE1BQU0sQ0FBQ1MsU0FBUyxJQUFLLElBQUksQ0FBQ0MsZUFBZSxHQUFHLElBQUksQ0FBQ0Msa0JBQWtCLENBQUU7O01BRTlGO01BQ0EsTUFBTUMsT0FBTyxHQUFHVCxTQUFTLEdBQUtLLGdCQUFnQixHQUFHLENBQUMsR0FBSyxFQUFHQSxnQkFBZ0IsR0FBRyxDQUFDLENBQUU7TUFDaEYsTUFBTUssV0FBVyxHQUFHVCxJQUFJLENBQUNVLElBQUksQ0FBRUYsT0FBTyxHQUFHdEIsb0JBQXFCLENBQUM7TUFDL0QsTUFBTXlCLFlBQVksR0FBR3pCLG9CQUFvQixHQUFHYyxJQUFJLENBQUNZLEdBQUcsQ0FBRUgsV0FBWSxDQUFDO01BQ25FLE1BQU1JLFNBQVMsR0FBR2hCLFNBQVMsR0FBS0csSUFBSSxDQUFDRyxFQUFFLEdBQUcsQ0FBRyxHQUFHTSxXQUFXOztNQUUzRDtNQUNBLE1BQU1LLEtBQUssR0FBR0gsWUFBWSxHQUFHWCxJQUFJLENBQUNZLEdBQUcsQ0FBRUMsU0FBVSxDQUFDO01BQ2xELE1BQU1FLEtBQUssR0FBR0osWUFBWSxHQUFHWCxJQUFJLENBQUNnQixHQUFHLENBQUVILFNBQVUsQ0FBQzs7TUFFbEQ7TUFDQSxJQUFJLENBQUNJLFdBQVcsR0FBRzVCLElBQUksQ0FBQzZCLFNBQVMsQ0FBQyxDQUFDLENBQUNDLE1BQU0sQ0FBRUwsS0FBSyxFQUFFQyxLQUFNLENBQUM7SUFDNUQsQ0FBRSxDQUFDO0VBQ0w7RUFFZ0JLLE9BQU9BLENBQUEsRUFBUztJQUM5QkMsTUFBTSxJQUFJQSxNQUFNLENBQUUsS0FBSyxFQUFFLDhEQUErRCxDQUFDO0lBQ3pGLEtBQUssQ0FBQ0QsT0FBTyxDQUFDLENBQUM7RUFDakI7O0VBRUE7QUFDRjtBQUNBO0VBQ0UsT0FBdUJFLFVBQVVBLENBQUEsRUFBUztJQUN4QyxPQUFPckMsVUFBVSxDQUFDcUMsVUFBVSxDQUFFO01BQUU5QixJQUFJLEVBQUVSLFFBQVEsQ0FBQ1M7SUFBWSxDQUFFLENBQUM7RUFDaEU7QUFDRjtBQUVBVixnQkFBZ0IsQ0FBQ3dDLFFBQVEsQ0FBRSxnQkFBZ0IsRUFBRXBDLGNBQWUsQ0FBQyJ9