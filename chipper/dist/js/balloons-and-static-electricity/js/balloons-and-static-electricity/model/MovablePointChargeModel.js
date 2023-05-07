// Copyright 2017-2023, University of Colorado Boulder

/**
 * A single point change, which has a position.  These charges are meant to move dynamically, and
 * include an observable position.  If the charge does not need to move, use PointChargeModel.
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import balloonsAndStaticElectricity from '../../balloonsAndStaticElectricity.js';
import PointChargeModel from './PointChargeModel.js';
class MovablePointChargeModel extends PointChargeModel {
  /**
   * @param {number} x
   * @param {number} y
   * @param {Tandem} tandem
   * @param {boolean} phetioState
   */
  constructor(x, y, tandem, phetioState) {
    super(x, y, tandem, phetioState);

    // @public {Vector2} - position of the point charge
    this.positionProperty = new Vector2Property(this.position, {
      tandem: tandem.createTandem('positionProperty'),
      phetioState: phetioState,
      valueComparisonStrategy: 'equalsFunction'
    });
  }

  /**
   * Reset the point charge.
   * @public
   *
   * @override
   */
  reset() {
    super.reset();
    this.positionProperty.reset();
  }

  /**
   * Get the displacement of the charge from its initial position. Useful as a measure of the induced charge.
   * @public
   *
   *
   * @returns {Vector2}
   */
  getDisplacement() {
    const initialPosition = this.positionProperty.initialValue;
    const displacement = this.positionProperty.get().distance(initialPosition);
    return displacement;
  }

  /**
   * Get the center of the charge.
   * @public
   *
   * @returns {Vector2}
   * @override
   */
  getCenter() {
    return new Vector2(this.positionProperty.get().x + this.radius, this.positionProperty.get().y + this.radius);
  }
}
balloonsAndStaticElectricity.register('MovablePointChargeModel', MovablePointChargeModel);
export default MovablePointChargeModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWZWN0b3IyIiwiVmVjdG9yMlByb3BlcnR5IiwiYmFsbG9vbnNBbmRTdGF0aWNFbGVjdHJpY2l0eSIsIlBvaW50Q2hhcmdlTW9kZWwiLCJNb3ZhYmxlUG9pbnRDaGFyZ2VNb2RlbCIsImNvbnN0cnVjdG9yIiwieCIsInkiLCJ0YW5kZW0iLCJwaGV0aW9TdGF0ZSIsInBvc2l0aW9uUHJvcGVydHkiLCJwb3NpdGlvbiIsImNyZWF0ZVRhbmRlbSIsInZhbHVlQ29tcGFyaXNvblN0cmF0ZWd5IiwicmVzZXQiLCJnZXREaXNwbGFjZW1lbnQiLCJpbml0aWFsUG9zaXRpb24iLCJpbml0aWFsVmFsdWUiLCJkaXNwbGFjZW1lbnQiLCJnZXQiLCJkaXN0YW5jZSIsImdldENlbnRlciIsInJhZGl1cyIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiTW92YWJsZVBvaW50Q2hhcmdlTW9kZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTctMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogQSBzaW5nbGUgcG9pbnQgY2hhbmdlLCB3aGljaCBoYXMgYSBwb3NpdGlvbi4gIFRoZXNlIGNoYXJnZXMgYXJlIG1lYW50IHRvIG1vdmUgZHluYW1pY2FsbHksIGFuZFxyXG4gKiBpbmNsdWRlIGFuIG9ic2VydmFibGUgcG9zaXRpb24uICBJZiB0aGUgY2hhcmdlIGRvZXMgbm90IG5lZWQgdG8gbW92ZSwgdXNlIFBvaW50Q2hhcmdlTW9kZWwuXHJcbiAqXHJcbiAqIEBhdXRob3IgVmFzaWx5IFNoYWtob3YgKE1sZWFybmVyKVxyXG4gKiBAYXV0aG9yIFNhbSBSZWlkIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKiBAYXV0aG9yIEplc3NlIEdyZWVuYmVyZyAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgVmVjdG9yMiBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvVmVjdG9yMi5qcyc7XHJcbmltcG9ydCBWZWN0b3IyUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1ZlY3RvcjJQcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBiYWxsb29uc0FuZFN0YXRpY0VsZWN0cmljaXR5IGZyb20gJy4uLy4uL2JhbGxvb25zQW5kU3RhdGljRWxlY3RyaWNpdHkuanMnO1xyXG5pbXBvcnQgUG9pbnRDaGFyZ2VNb2RlbCBmcm9tICcuL1BvaW50Q2hhcmdlTW9kZWwuanMnO1xyXG5cclxuY2xhc3MgTW92YWJsZVBvaW50Q2hhcmdlTW9kZWwgZXh0ZW5kcyBQb2ludENoYXJnZU1vZGVsIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICAgKiBAcGFyYW0ge251bWJlcn0geVxyXG4gICAqIEBwYXJhbSB7VGFuZGVtfSB0YW5kZW1cclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHBoZXRpb1N0YXRlXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIHgsIHksIHRhbmRlbSwgcGhldGlvU3RhdGUgKSB7XHJcblxyXG4gICAgc3VwZXIoIHgsIHksIHRhbmRlbSwgcGhldGlvU3RhdGUgKTtcclxuXHJcbiAgICAvLyBAcHVibGljIHtWZWN0b3IyfSAtIHBvc2l0aW9uIG9mIHRoZSBwb2ludCBjaGFyZ2VcclxuICAgIHRoaXMucG9zaXRpb25Qcm9wZXJ0eSA9IG5ldyBWZWN0b3IyUHJvcGVydHkoIHRoaXMucG9zaXRpb24sIHtcclxuICAgICAgdGFuZGVtOiB0YW5kZW0uY3JlYXRlVGFuZGVtKCAncG9zaXRpb25Qcm9wZXJ0eScgKSxcclxuICAgICAgcGhldGlvU3RhdGU6IHBoZXRpb1N0YXRlLFxyXG4gICAgICB2YWx1ZUNvbXBhcmlzb25TdHJhdGVneTogJ2VxdWFsc0Z1bmN0aW9uJ1xyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0IHRoZSBwb2ludCBjaGFyZ2UuXHJcbiAgICogQHB1YmxpY1xyXG4gICAqXHJcbiAgICogQG92ZXJyaWRlXHJcbiAgICovXHJcbiAgcmVzZXQoKSB7XHJcbiAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgdGhpcy5wb3NpdGlvblByb3BlcnR5LnJlc2V0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGRpc3BsYWNlbWVudCBvZiB0aGUgY2hhcmdlIGZyb20gaXRzIGluaXRpYWwgcG9zaXRpb24uIFVzZWZ1bCBhcyBhIG1lYXN1cmUgb2YgdGhlIGluZHVjZWQgY2hhcmdlLlxyXG4gICAqIEBwdWJsaWNcclxuICAgKlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge1ZlY3RvcjJ9XHJcbiAgICovXHJcbiAgZ2V0RGlzcGxhY2VtZW50KCkge1xyXG4gICAgY29uc3QgaW5pdGlhbFBvc2l0aW9uID0gdGhpcy5wb3NpdGlvblByb3BlcnR5LmluaXRpYWxWYWx1ZTtcclxuICAgIGNvbnN0IGRpc3BsYWNlbWVudCA9IHRoaXMucG9zaXRpb25Qcm9wZXJ0eS5nZXQoKS5kaXN0YW5jZSggaW5pdGlhbFBvc2l0aW9uICk7XHJcblxyXG4gICAgcmV0dXJuIGRpc3BsYWNlbWVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY2VudGVyIG9mIHRoZSBjaGFyZ2UuXHJcbiAgICogQHB1YmxpY1xyXG4gICAqXHJcbiAgICogQHJldHVybnMge1ZlY3RvcjJ9XHJcbiAgICogQG92ZXJyaWRlXHJcbiAgICovXHJcbiAgZ2V0Q2VudGVyKCkge1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyKCB0aGlzLnBvc2l0aW9uUHJvcGVydHkuZ2V0KCkueCArIHRoaXMucmFkaXVzLCB0aGlzLnBvc2l0aW9uUHJvcGVydHkuZ2V0KCkueSArIHRoaXMucmFkaXVzICk7XHJcbiAgfVxyXG59XHJcblxyXG5iYWxsb29uc0FuZFN0YXRpY0VsZWN0cmljaXR5LnJlZ2lzdGVyKCAnTW92YWJsZVBvaW50Q2hhcmdlTW9kZWwnLCBNb3ZhYmxlUG9pbnRDaGFyZ2VNb2RlbCApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW92YWJsZVBvaW50Q2hhcmdlTW9kZWw7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLE9BQU8sTUFBTSwrQkFBK0I7QUFDbkQsT0FBT0MsZUFBZSxNQUFNLHVDQUF1QztBQUNuRSxPQUFPQyw0QkFBNEIsTUFBTSx1Q0FBdUM7QUFDaEYsT0FBT0MsZ0JBQWdCLE1BQU0sdUJBQXVCO0FBRXBELE1BQU1DLHVCQUF1QixTQUFTRCxnQkFBZ0IsQ0FBQztFQUVyRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDRUUsV0FBV0EsQ0FBRUMsQ0FBQyxFQUFFQyxDQUFDLEVBQUVDLE1BQU0sRUFBRUMsV0FBVyxFQUFHO0lBRXZDLEtBQUssQ0FBRUgsQ0FBQyxFQUFFQyxDQUFDLEVBQUVDLE1BQU0sRUFBRUMsV0FBWSxDQUFDOztJQUVsQztJQUNBLElBQUksQ0FBQ0MsZ0JBQWdCLEdBQUcsSUFBSVQsZUFBZSxDQUFFLElBQUksQ0FBQ1UsUUFBUSxFQUFFO01BQzFESCxNQUFNLEVBQUVBLE1BQU0sQ0FBQ0ksWUFBWSxDQUFFLGtCQUFtQixDQUFDO01BQ2pESCxXQUFXLEVBQUVBLFdBQVc7TUFDeEJJLHVCQUF1QixFQUFFO0lBQzNCLENBQUUsQ0FBQztFQUNMOztFQUdBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFQyxLQUFLQSxDQUFBLEVBQUc7SUFDTixLQUFLLENBQUNBLEtBQUssQ0FBQyxDQUFDO0lBQ2IsSUFBSSxDQUFDSixnQkFBZ0IsQ0FBQ0ksS0FBSyxDQUFDLENBQUM7RUFDL0I7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDRUMsZUFBZUEsQ0FBQSxFQUFHO0lBQ2hCLE1BQU1DLGVBQWUsR0FBRyxJQUFJLENBQUNOLGdCQUFnQixDQUFDTyxZQUFZO0lBQzFELE1BQU1DLFlBQVksR0FBRyxJQUFJLENBQUNSLGdCQUFnQixDQUFDUyxHQUFHLENBQUMsQ0FBQyxDQUFDQyxRQUFRLENBQUVKLGVBQWdCLENBQUM7SUFFNUUsT0FBT0UsWUFBWTtFQUNyQjs7RUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFRyxTQUFTQSxDQUFBLEVBQUc7SUFDVixPQUFPLElBQUlyQixPQUFPLENBQUUsSUFBSSxDQUFDVSxnQkFBZ0IsQ0FBQ1MsR0FBRyxDQUFDLENBQUMsQ0FBQ2IsQ0FBQyxHQUFHLElBQUksQ0FBQ2dCLE1BQU0sRUFBRSxJQUFJLENBQUNaLGdCQUFnQixDQUFDUyxHQUFHLENBQUMsQ0FBQyxDQUFDWixDQUFDLEdBQUcsSUFBSSxDQUFDZSxNQUFPLENBQUM7RUFDaEg7QUFDRjtBQUVBcEIsNEJBQTRCLENBQUNxQixRQUFRLENBQUUseUJBQXlCLEVBQUVuQix1QkFBd0IsQ0FBQztBQUUzRixlQUFlQSx1QkFBdUIifQ==