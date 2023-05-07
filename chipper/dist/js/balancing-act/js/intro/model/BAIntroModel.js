// Copyright 2013-2021, University of Colorado Boulder

/**
 * Primary model class for the intro screen in the balancing act simulation.
 * This model depicts a plank on a fulcrum with a few masses that the user can
 * put on and remove from the plank.
 *
 * @author John Blanco
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import balancingAct from '../../balancingAct.js';
import BalanceModel from '../../common/model/BalanceModel.js';
import FireExtinguisher from '../../common/model/masses/FireExtinguisher.js';
import SmallTrashCan from '../../common/model/masses/SmallTrashCan.js';
class BAIntroModel extends BalanceModel {
  /**
   * @param {Tandem} tandem
   */
  constructor(tandem) {
    super(tandem);

    // Add the initial masses and save their initial positions.
    this.addMass(new FireExtinguisher(new Vector2(2.7, 0), false, {
      tandem: tandem.createTandem('fireExtinguisher1')
    }));
    this.addMass(new FireExtinguisher(new Vector2(3.2, 0), false, {
      tandem: tandem.createTandem('fireExtinguisher2')
    }));
    this.addMass(new SmallTrashCan(new Vector2(3.7, 0), false, {
      tandem: tandem.createTandem('smallTrashCan')
    }));
  }

  /**
   * @public
   */
  reset() {
    this.massList.forEach(mass => {
      mass.positionProperty.reset();
      mass.rotationAngleProperty.reset();
    });
    super.reset();
  }
}
balancingAct.register('BAIntroModel', BAIntroModel);
export default BAIntroModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWZWN0b3IyIiwiYmFsYW5jaW5nQWN0IiwiQmFsYW5jZU1vZGVsIiwiRmlyZUV4dGluZ3Vpc2hlciIsIlNtYWxsVHJhc2hDYW4iLCJCQUludHJvTW9kZWwiLCJjb25zdHJ1Y3RvciIsInRhbmRlbSIsImFkZE1hc3MiLCJjcmVhdGVUYW5kZW0iLCJyZXNldCIsIm1hc3NMaXN0IiwiZm9yRWFjaCIsIm1hc3MiLCJwb3NpdGlvblByb3BlcnR5Iiwicm90YXRpb25BbmdsZVByb3BlcnR5IiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJCQUludHJvTW9kZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTMtMjAyMSwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogUHJpbWFyeSBtb2RlbCBjbGFzcyBmb3IgdGhlIGludHJvIHNjcmVlbiBpbiB0aGUgYmFsYW5jaW5nIGFjdCBzaW11bGF0aW9uLlxyXG4gKiBUaGlzIG1vZGVsIGRlcGljdHMgYSBwbGFuayBvbiBhIGZ1bGNydW0gd2l0aCBhIGZldyBtYXNzZXMgdGhhdCB0aGUgdXNlciBjYW5cclxuICogcHV0IG9uIGFuZCByZW1vdmUgZnJvbSB0aGUgcGxhbmsuXHJcbiAqXHJcbiAqIEBhdXRob3IgSm9obiBCbGFuY29cclxuICovXHJcblxyXG5pbXBvcnQgVmVjdG9yMiBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvVmVjdG9yMi5qcyc7XHJcbmltcG9ydCBiYWxhbmNpbmdBY3QgZnJvbSAnLi4vLi4vYmFsYW5jaW5nQWN0LmpzJztcclxuaW1wb3J0IEJhbGFuY2VNb2RlbCBmcm9tICcuLi8uLi9jb21tb24vbW9kZWwvQmFsYW5jZU1vZGVsLmpzJztcclxuaW1wb3J0IEZpcmVFeHRpbmd1aXNoZXIgZnJvbSAnLi4vLi4vY29tbW9uL21vZGVsL21hc3Nlcy9GaXJlRXh0aW5ndWlzaGVyLmpzJztcclxuaW1wb3J0IFNtYWxsVHJhc2hDYW4gZnJvbSAnLi4vLi4vY29tbW9uL21vZGVsL21hc3Nlcy9TbWFsbFRyYXNoQ2FuLmpzJztcclxuXHJcbmNsYXNzIEJBSW50cm9Nb2RlbCBleHRlbmRzIEJhbGFuY2VNb2RlbCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7VGFuZGVtfSB0YW5kZW1cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggdGFuZGVtICkge1xyXG4gICAgc3VwZXIoIHRhbmRlbSApO1xyXG5cclxuICAgIC8vIEFkZCB0aGUgaW5pdGlhbCBtYXNzZXMgYW5kIHNhdmUgdGhlaXIgaW5pdGlhbCBwb3NpdGlvbnMuXHJcbiAgICB0aGlzLmFkZE1hc3MoIG5ldyBGaXJlRXh0aW5ndWlzaGVyKCBuZXcgVmVjdG9yMiggMi43LCAwICksIGZhbHNlLCB7IHRhbmRlbTogdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ2ZpcmVFeHRpbmd1aXNoZXIxJyApIH0gKSApO1xyXG4gICAgdGhpcy5hZGRNYXNzKCBuZXcgRmlyZUV4dGluZ3Vpc2hlciggbmV3IFZlY3RvcjIoIDMuMiwgMCApLCBmYWxzZSwgeyB0YW5kZW06IHRhbmRlbS5jcmVhdGVUYW5kZW0oICdmaXJlRXh0aW5ndWlzaGVyMicgKSB9ICkgKTtcclxuICAgIHRoaXMuYWRkTWFzcyggbmV3IFNtYWxsVHJhc2hDYW4oIG5ldyBWZWN0b3IyKCAzLjcsIDAgKSwgZmFsc2UsIHsgdGFuZGVtOiB0YW5kZW0uY3JlYXRlVGFuZGVtKCAnc21hbGxUcmFzaENhbicgKSB9ICkgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICByZXNldCgpIHtcclxuICAgIHRoaXMubWFzc0xpc3QuZm9yRWFjaCggbWFzcyA9PiB7XHJcbiAgICAgIG1hc3MucG9zaXRpb25Qcm9wZXJ0eS5yZXNldCgpO1xyXG4gICAgICBtYXNzLnJvdGF0aW9uQW5nbGVQcm9wZXJ0eS5yZXNldCgpO1xyXG4gICAgfSApO1xyXG4gICAgc3VwZXIucmVzZXQoKTtcclxuICB9XHJcbn1cclxuXHJcbmJhbGFuY2luZ0FjdC5yZWdpc3RlciggJ0JBSW50cm9Nb2RlbCcsIEJBSW50cm9Nb2RlbCApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQkFJbnRyb01vZGVsOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsT0FBTyxNQUFNLCtCQUErQjtBQUNuRCxPQUFPQyxZQUFZLE1BQU0sdUJBQXVCO0FBQ2hELE9BQU9DLFlBQVksTUFBTSxvQ0FBb0M7QUFDN0QsT0FBT0MsZ0JBQWdCLE1BQU0sK0NBQStDO0FBQzVFLE9BQU9DLGFBQWEsTUFBTSw0Q0FBNEM7QUFFdEUsTUFBTUMsWUFBWSxTQUFTSCxZQUFZLENBQUM7RUFFdEM7QUFDRjtBQUNBO0VBQ0VJLFdBQVdBLENBQUVDLE1BQU0sRUFBRztJQUNwQixLQUFLLENBQUVBLE1BQU8sQ0FBQzs7SUFFZjtJQUNBLElBQUksQ0FBQ0MsT0FBTyxDQUFFLElBQUlMLGdCQUFnQixDQUFFLElBQUlILE9BQU8sQ0FBRSxHQUFHLEVBQUUsQ0FBRSxDQUFDLEVBQUUsS0FBSyxFQUFFO01BQUVPLE1BQU0sRUFBRUEsTUFBTSxDQUFDRSxZQUFZLENBQUUsbUJBQW9CO0lBQUUsQ0FBRSxDQUFFLENBQUM7SUFDNUgsSUFBSSxDQUFDRCxPQUFPLENBQUUsSUFBSUwsZ0JBQWdCLENBQUUsSUFBSUgsT0FBTyxDQUFFLEdBQUcsRUFBRSxDQUFFLENBQUMsRUFBRSxLQUFLLEVBQUU7TUFBRU8sTUFBTSxFQUFFQSxNQUFNLENBQUNFLFlBQVksQ0FBRSxtQkFBb0I7SUFBRSxDQUFFLENBQUUsQ0FBQztJQUM1SCxJQUFJLENBQUNELE9BQU8sQ0FBRSxJQUFJSixhQUFhLENBQUUsSUFBSUosT0FBTyxDQUFFLEdBQUcsRUFBRSxDQUFFLENBQUMsRUFBRSxLQUFLLEVBQUU7TUFBRU8sTUFBTSxFQUFFQSxNQUFNLENBQUNFLFlBQVksQ0FBRSxlQUFnQjtJQUFFLENBQUUsQ0FBRSxDQUFDO0VBQ3ZIOztFQUVBO0FBQ0Y7QUFDQTtFQUNFQyxLQUFLQSxDQUFBLEVBQUc7SUFDTixJQUFJLENBQUNDLFFBQVEsQ0FBQ0MsT0FBTyxDQUFFQyxJQUFJLElBQUk7TUFDN0JBLElBQUksQ0FBQ0MsZ0JBQWdCLENBQUNKLEtBQUssQ0FBQyxDQUFDO01BQzdCRyxJQUFJLENBQUNFLHFCQUFxQixDQUFDTCxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFFLENBQUM7SUFDSCxLQUFLLENBQUNBLEtBQUssQ0FBQyxDQUFDO0VBQ2Y7QUFDRjtBQUVBVCxZQUFZLENBQUNlLFFBQVEsQ0FBRSxjQUFjLEVBQUVYLFlBQWEsQ0FBQztBQUVyRCxlQUFlQSxZQUFZIn0=