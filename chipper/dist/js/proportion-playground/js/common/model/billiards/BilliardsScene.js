// Copyright 2016-2020, University of Colorado Boulder

/**
 * The model for the Billiards Scene (including both tables).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import proportionPlayground from '../../../proportionPlayground.js';
import Scene from '../Scene.js';
import BilliardsTable from './BilliardsTable.js';
class BilliardsScene extends Scene {
  /**
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   * @param {Tandem} tandem
   */
  constructor(predictMode, tandem) {
    assert && assert(tandem);
    super(predictMode, tandem);

    // @public
    this.leftTable = new BilliardsTable(tandem.createTandem('leftTable'), {
      visibleProperty: this.leftVisibleProperty,
      controlsVisibleProperty: this.leftControlsVisibleProperty
    });
    this.rightTable = new BilliardsTable(tandem.createTandem('rightTable'), {
      visibleProperty: this.rightVisibleProperty,
      controlsVisibleProperty: this.rightControlsVisibleProperty
    });
    this.initializeRatios(this.leftTable, this.rightTable);
  }

  /**
   * Moves the balls which have been revealed.
   * @public
   * @override
   *
   * @param {number} dt
   */
  step(dt) {
    super.step(dt);
    if (this.revealProperty.value) {
      this.leftTable.step(dt);
      if (this.showBothProperty.value || this.rightTable.hasStartedAnimating) {
        this.rightTable.step(dt);
      }
    }
  }
}
proportionPlayground.register('BilliardsScene', BilliardsScene);
export default BilliardsScene;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwcm9wb3J0aW9uUGxheWdyb3VuZCIsIlNjZW5lIiwiQmlsbGlhcmRzVGFibGUiLCJCaWxsaWFyZHNTY2VuZSIsImNvbnN0cnVjdG9yIiwicHJlZGljdE1vZGUiLCJ0YW5kZW0iLCJhc3NlcnQiLCJsZWZ0VGFibGUiLCJjcmVhdGVUYW5kZW0iLCJ2aXNpYmxlUHJvcGVydHkiLCJsZWZ0VmlzaWJsZVByb3BlcnR5IiwiY29udHJvbHNWaXNpYmxlUHJvcGVydHkiLCJsZWZ0Q29udHJvbHNWaXNpYmxlUHJvcGVydHkiLCJyaWdodFRhYmxlIiwicmlnaHRWaXNpYmxlUHJvcGVydHkiLCJyaWdodENvbnRyb2xzVmlzaWJsZVByb3BlcnR5IiwiaW5pdGlhbGl6ZVJhdGlvcyIsInN0ZXAiLCJkdCIsInJldmVhbFByb3BlcnR5IiwidmFsdWUiLCJzaG93Qm90aFByb3BlcnR5IiwiaGFzU3RhcnRlZEFuaW1hdGluZyIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiQmlsbGlhcmRzU2NlbmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTYtMjAyMCwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogVGhlIG1vZGVsIGZvciB0aGUgQmlsbGlhcmRzIFNjZW5lIChpbmNsdWRpbmcgYm90aCB0YWJsZXMpLlxyXG4gKlxyXG4gKiBAYXV0aG9yIFNhbSBSZWlkIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBwcm9wb3J0aW9uUGxheWdyb3VuZCBmcm9tICcuLi8uLi8uLi9wcm9wb3J0aW9uUGxheWdyb3VuZC5qcyc7XHJcbmltcG9ydCBTY2VuZSBmcm9tICcuLi9TY2VuZS5qcyc7XHJcbmltcG9ydCBCaWxsaWFyZHNUYWJsZSBmcm9tICcuL0JpbGxpYXJkc1RhYmxlLmpzJztcclxuXHJcbmNsYXNzIEJpbGxpYXJkc1NjZW5lIGV4dGVuZHMgU2NlbmUge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcHJlZGljdE1vZGUgLSB0cnVlIGZvciB0aGUgUHJlZGljdCBTY3JlZW4gd2hpY2ggaGFzIGEgcmV2ZWFsIGJ1dHRvblxyXG4gICAqIEBwYXJhbSB7VGFuZGVtfSB0YW5kZW1cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggcHJlZGljdE1vZGUsIHRhbmRlbSApIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIHRhbmRlbSApO1xyXG5cclxuICAgIHN1cGVyKCBwcmVkaWN0TW9kZSwgdGFuZGVtICk7XHJcblxyXG4gICAgLy8gQHB1YmxpY1xyXG4gICAgdGhpcy5sZWZ0VGFibGUgPSBuZXcgQmlsbGlhcmRzVGFibGUoIHRhbmRlbS5jcmVhdGVUYW5kZW0oICdsZWZ0VGFibGUnICksIHtcclxuICAgICAgdmlzaWJsZVByb3BlcnR5OiB0aGlzLmxlZnRWaXNpYmxlUHJvcGVydHksXHJcbiAgICAgIGNvbnRyb2xzVmlzaWJsZVByb3BlcnR5OiB0aGlzLmxlZnRDb250cm9sc1Zpc2libGVQcm9wZXJ0eVxyXG4gICAgfSApO1xyXG4gICAgdGhpcy5yaWdodFRhYmxlID0gbmV3IEJpbGxpYXJkc1RhYmxlKCB0YW5kZW0uY3JlYXRlVGFuZGVtKCAncmlnaHRUYWJsZScgKSwge1xyXG4gICAgICB2aXNpYmxlUHJvcGVydHk6IHRoaXMucmlnaHRWaXNpYmxlUHJvcGVydHksXHJcbiAgICAgIGNvbnRyb2xzVmlzaWJsZVByb3BlcnR5OiB0aGlzLnJpZ2h0Q29udHJvbHNWaXNpYmxlUHJvcGVydHlcclxuICAgIH0gKTtcclxuXHJcbiAgICB0aGlzLmluaXRpYWxpemVSYXRpb3MoIHRoaXMubGVmdFRhYmxlLCB0aGlzLnJpZ2h0VGFibGUgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vdmVzIHRoZSBiYWxscyB3aGljaCBoYXZlIGJlZW4gcmV2ZWFsZWQuXHJcbiAgICogQHB1YmxpY1xyXG4gICAqIEBvdmVycmlkZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGR0XHJcbiAgICovXHJcbiAgc3RlcCggZHQgKSB7XHJcbiAgICBzdXBlci5zdGVwKCBkdCApO1xyXG5cclxuICAgIGlmICggdGhpcy5yZXZlYWxQcm9wZXJ0eS52YWx1ZSApIHtcclxuICAgICAgdGhpcy5sZWZ0VGFibGUuc3RlcCggZHQgKTtcclxuICAgICAgaWYgKCB0aGlzLnNob3dCb3RoUHJvcGVydHkudmFsdWUgfHwgdGhpcy5yaWdodFRhYmxlLmhhc1N0YXJ0ZWRBbmltYXRpbmcgKSB7XHJcbiAgICAgICAgdGhpcy5yaWdodFRhYmxlLnN0ZXAoIGR0ICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbnByb3BvcnRpb25QbGF5Z3JvdW5kLnJlZ2lzdGVyKCAnQmlsbGlhcmRzU2NlbmUnLCBCaWxsaWFyZHNTY2VuZSApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmlsbGlhcmRzU2NlbmU7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLG9CQUFvQixNQUFNLGtDQUFrQztBQUNuRSxPQUFPQyxLQUFLLE1BQU0sYUFBYTtBQUMvQixPQUFPQyxjQUFjLE1BQU0scUJBQXFCO0FBRWhELE1BQU1DLGNBQWMsU0FBU0YsS0FBSyxDQUFDO0VBQ2pDO0FBQ0Y7QUFDQTtBQUNBO0VBQ0VHLFdBQVdBLENBQUVDLFdBQVcsRUFBRUMsTUFBTSxFQUFHO0lBQ2pDQyxNQUFNLElBQUlBLE1BQU0sQ0FBRUQsTUFBTyxDQUFDO0lBRTFCLEtBQUssQ0FBRUQsV0FBVyxFQUFFQyxNQUFPLENBQUM7O0lBRTVCO0lBQ0EsSUFBSSxDQUFDRSxTQUFTLEdBQUcsSUFBSU4sY0FBYyxDQUFFSSxNQUFNLENBQUNHLFlBQVksQ0FBRSxXQUFZLENBQUMsRUFBRTtNQUN2RUMsZUFBZSxFQUFFLElBQUksQ0FBQ0MsbUJBQW1CO01BQ3pDQyx1QkFBdUIsRUFBRSxJQUFJLENBQUNDO0lBQ2hDLENBQUUsQ0FBQztJQUNILElBQUksQ0FBQ0MsVUFBVSxHQUFHLElBQUlaLGNBQWMsQ0FBRUksTUFBTSxDQUFDRyxZQUFZLENBQUUsWUFBYSxDQUFDLEVBQUU7TUFDekVDLGVBQWUsRUFBRSxJQUFJLENBQUNLLG9CQUFvQjtNQUMxQ0gsdUJBQXVCLEVBQUUsSUFBSSxDQUFDSTtJQUNoQyxDQUFFLENBQUM7SUFFSCxJQUFJLENBQUNDLGdCQUFnQixDQUFFLElBQUksQ0FBQ1QsU0FBUyxFQUFFLElBQUksQ0FBQ00sVUFBVyxDQUFDO0VBQzFEOztFQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0VJLElBQUlBLENBQUVDLEVBQUUsRUFBRztJQUNULEtBQUssQ0FBQ0QsSUFBSSxDQUFFQyxFQUFHLENBQUM7SUFFaEIsSUFBSyxJQUFJLENBQUNDLGNBQWMsQ0FBQ0MsS0FBSyxFQUFHO01BQy9CLElBQUksQ0FBQ2IsU0FBUyxDQUFDVSxJQUFJLENBQUVDLEVBQUcsQ0FBQztNQUN6QixJQUFLLElBQUksQ0FBQ0csZ0JBQWdCLENBQUNELEtBQUssSUFBSSxJQUFJLENBQUNQLFVBQVUsQ0FBQ1MsbUJBQW1CLEVBQUc7UUFDeEUsSUFBSSxDQUFDVCxVQUFVLENBQUNJLElBQUksQ0FBRUMsRUFBRyxDQUFDO01BQzVCO0lBQ0Y7RUFDRjtBQUNGO0FBRUFuQixvQkFBb0IsQ0FBQ3dCLFFBQVEsQ0FBRSxnQkFBZ0IsRUFBRXJCLGNBQWUsQ0FBQztBQUVqRSxlQUFlQSxjQUFjIn0=