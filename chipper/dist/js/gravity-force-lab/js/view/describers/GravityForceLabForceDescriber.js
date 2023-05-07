// Copyright 2018-2022, University of Colorado Boulder

/**
 * This describer is responsible for all gravity-force-lab specific string forming related to force.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import InverseSquareLawCommonStrings from '../../../../inverse-square-law-common/js/InverseSquareLawCommonStrings.js';
import ISLCConstants from '../../../../inverse-square-law-common/js/ISLCConstants.js';
import ForceValuesDisplayEnum from '../../../../inverse-square-law-common/js/model/ForceValuesDisplayEnum.js';
import ForceDescriber from '../../../../inverse-square-law-common/js/view/describers/ForceDescriber.js';
import gravityForceLab from '../../gravityForceLab.js';
import GravityForceLabStrings from '../../GravityForceLabStrings.js';
const unitsNewtonsString = InverseSquareLawCommonStrings.units.newtons;
const micronewtonsString = GravityForceLabStrings.a11y.micronewtons;

// constants
const MICRO_CONVERSION_FACTOR = 1e6;
const convertForceToMicronewtons = force => {
  return Utils.toFixedNumber(force * MICRO_CONVERSION_FACTOR, 6);
};
class GravityForceLabForceDescriber extends ForceDescriber {
  /**
   * @param {GravityForceLabModel} model
   * @param {string} object1Label
   * @param {string} object2Label
   * @param {PositionDescriber} positionDescriber
   */
  constructor(model, object1Label, object2Label, positionDescriber) {
    const options = {
      units: micronewtonsString,
      convertForce: force => {
        if (this.forceValuesDisplayProperty.value !== ForceValuesDisplayEnum.SCIENTIFIC) {
          return convertForceToMicronewtons(force);
        }
        return force;
      },
      forceValueToString: convertedForce => {
        if (this.forceValuesDisplayProperty.value === ForceValuesDisplayEnum.SCIENTIFIC) {
          return ForceDescriber.getForceInScientificNotation(convertedForce, ISLCConstants.SCIENTIFIC_NOTATION_PRECISION);
        }
        return `${convertedForce}`;
      }
    };
    super(model, object1Label, object2Label, positionDescriber, options);
    model.forceValuesDisplayProperty.link(forceValuesDisplay => {
      this.units = forceValuesDisplay === ForceValuesDisplayEnum.SCIENTIFIC ? unitsNewtonsString : micronewtonsString;
    });
  }

  /**
   * Returns the mapped index based on the given force value. Force values in ISLC sims range from piconewtons to
   * newtons, so it's necessary for sim-specific subtypes to specify this logic.
   * These empirically determined values were designed, see https://docs.google.com/document/d/1-37qAgde2XrlXBQae2SgjartM35_EnzDD9pdtd3nXAM/edit#heading=h.nhqxjbby3dgu
   * @protected
   *
   * @override
   * @param  {number} force
   * @param {number} numberOfRegions - for crosscheck
   * @returns {number} - integer within the range of force strings, see ForceDescriber.js
   */
  getForceVectorIndex(force, numberOfRegions) {
    const convertedForce = convertForceToMicronewtons(force);
    assert && assert(numberOfRegions === 7, 'If numberOfRegions changes, this function should too.');
    if (convertedForce < 0.166852) {
      return 0;
    }
    if (convertedForce < 2.206307) {
      return 1;
    }
    if (convertedForce < 4.412615) {
      return 2;
    }
    if (convertedForce < 8.687337) {
      return 3;
    }
    if (convertedForce < 19.856768) {
      return 4;
    }
    if (convertedForce < 35.300920) {
      return 5;
    }
    return 6;
  }
}
gravityForceLab.register('GravityForceLabForceDescriber', GravityForceLabForceDescriber);
export default GravityForceLabForceDescriber;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVdGlscyIsIkludmVyc2VTcXVhcmVMYXdDb21tb25TdHJpbmdzIiwiSVNMQ0NvbnN0YW50cyIsIkZvcmNlVmFsdWVzRGlzcGxheUVudW0iLCJGb3JjZURlc2NyaWJlciIsImdyYXZpdHlGb3JjZUxhYiIsIkdyYXZpdHlGb3JjZUxhYlN0cmluZ3MiLCJ1bml0c05ld3RvbnNTdHJpbmciLCJ1bml0cyIsIm5ld3RvbnMiLCJtaWNyb25ld3RvbnNTdHJpbmciLCJhMTF5IiwibWljcm9uZXd0b25zIiwiTUlDUk9fQ09OVkVSU0lPTl9GQUNUT1IiLCJjb252ZXJ0Rm9yY2VUb01pY3JvbmV3dG9ucyIsImZvcmNlIiwidG9GaXhlZE51bWJlciIsIkdyYXZpdHlGb3JjZUxhYkZvcmNlRGVzY3JpYmVyIiwiY29uc3RydWN0b3IiLCJtb2RlbCIsIm9iamVjdDFMYWJlbCIsIm9iamVjdDJMYWJlbCIsInBvc2l0aW9uRGVzY3JpYmVyIiwib3B0aW9ucyIsImNvbnZlcnRGb3JjZSIsImZvcmNlVmFsdWVzRGlzcGxheVByb3BlcnR5IiwidmFsdWUiLCJTQ0lFTlRJRklDIiwiZm9yY2VWYWx1ZVRvU3RyaW5nIiwiY29udmVydGVkRm9yY2UiLCJnZXRGb3JjZUluU2NpZW50aWZpY05vdGF0aW9uIiwiU0NJRU5USUZJQ19OT1RBVElPTl9QUkVDSVNJT04iLCJsaW5rIiwiZm9yY2VWYWx1ZXNEaXNwbGF5IiwiZ2V0Rm9yY2VWZWN0b3JJbmRleCIsIm51bWJlck9mUmVnaW9ucyIsImFzc2VydCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiR3Jhdml0eUZvcmNlTGFiRm9yY2VEZXNjcmliZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogVGhpcyBkZXNjcmliZXIgaXMgcmVzcG9uc2libGUgZm9yIGFsbCBncmF2aXR5LWZvcmNlLWxhYiBzcGVjaWZpYyBzdHJpbmcgZm9ybWluZyByZWxhdGVkIHRvIGZvcmNlLlxyXG4gKlxyXG4gKiBAYXV0aG9yIE1pY2hhZWwgS2F1em1hbm4gKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqL1xyXG5cclxuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9VdGlscy5qcyc7XHJcbmltcG9ydCBJbnZlcnNlU3F1YXJlTGF3Q29tbW9uU3RyaW5ncyBmcm9tICcuLi8uLi8uLi8uLi9pbnZlcnNlLXNxdWFyZS1sYXctY29tbW9uL2pzL0ludmVyc2VTcXVhcmVMYXdDb21tb25TdHJpbmdzLmpzJztcclxuaW1wb3J0IElTTENDb25zdGFudHMgZnJvbSAnLi4vLi4vLi4vLi4vaW52ZXJzZS1zcXVhcmUtbGF3LWNvbW1vbi9qcy9JU0xDQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IEZvcmNlVmFsdWVzRGlzcGxheUVudW0gZnJvbSAnLi4vLi4vLi4vLi4vaW52ZXJzZS1zcXVhcmUtbGF3LWNvbW1vbi9qcy9tb2RlbC9Gb3JjZVZhbHVlc0Rpc3BsYXlFbnVtLmpzJztcclxuaW1wb3J0IEZvcmNlRGVzY3JpYmVyIGZyb20gJy4uLy4uLy4uLy4uL2ludmVyc2Utc3F1YXJlLWxhdy1jb21tb24vanMvdmlldy9kZXNjcmliZXJzL0ZvcmNlRGVzY3JpYmVyLmpzJztcclxuaW1wb3J0IGdyYXZpdHlGb3JjZUxhYiBmcm9tICcuLi8uLi9ncmF2aXR5Rm9yY2VMYWIuanMnO1xyXG5pbXBvcnQgR3Jhdml0eUZvcmNlTGFiU3RyaW5ncyBmcm9tICcuLi8uLi9HcmF2aXR5Rm9yY2VMYWJTdHJpbmdzLmpzJztcclxuXHJcbmNvbnN0IHVuaXRzTmV3dG9uc1N0cmluZyA9IEludmVyc2VTcXVhcmVMYXdDb21tb25TdHJpbmdzLnVuaXRzLm5ld3RvbnM7XHJcblxyXG5jb25zdCBtaWNyb25ld3RvbnNTdHJpbmcgPSBHcmF2aXR5Rm9yY2VMYWJTdHJpbmdzLmExMXkubWljcm9uZXd0b25zO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IE1JQ1JPX0NPTlZFUlNJT05fRkFDVE9SID0gMWU2O1xyXG5jb25zdCBjb252ZXJ0Rm9yY2VUb01pY3JvbmV3dG9ucyA9IGZvcmNlID0+IHtcclxuICByZXR1cm4gVXRpbHMudG9GaXhlZE51bWJlciggZm9yY2UgKiBNSUNST19DT05WRVJTSU9OX0ZBQ1RPUiwgNiApO1xyXG59O1xyXG5cclxuY2xhc3MgR3Jhdml0eUZvcmNlTGFiRm9yY2VEZXNjcmliZXIgZXh0ZW5kcyBGb3JjZURlc2NyaWJlciB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7R3Jhdml0eUZvcmNlTGFiTW9kZWx9IG1vZGVsXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9iamVjdDFMYWJlbFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvYmplY3QyTGFiZWxcclxuICAgKiBAcGFyYW0ge1Bvc2l0aW9uRGVzY3JpYmVyfSBwb3NpdGlvbkRlc2NyaWJlclxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBtb2RlbCwgb2JqZWN0MUxhYmVsLCBvYmplY3QyTGFiZWwsIHBvc2l0aW9uRGVzY3JpYmVyICkge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgdW5pdHM6IG1pY3JvbmV3dG9uc1N0cmluZyxcclxuXHJcbiAgICAgIGNvbnZlcnRGb3JjZTogZm9yY2UgPT4ge1xyXG4gICAgICAgIGlmICggdGhpcy5mb3JjZVZhbHVlc0Rpc3BsYXlQcm9wZXJ0eS52YWx1ZSAhPT0gRm9yY2VWYWx1ZXNEaXNwbGF5RW51bS5TQ0lFTlRJRklDICkge1xyXG4gICAgICAgICAgcmV0dXJuIGNvbnZlcnRGb3JjZVRvTWljcm9uZXd0b25zKCBmb3JjZSApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm9yY2U7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBmb3JjZVZhbHVlVG9TdHJpbmc6IGNvbnZlcnRlZEZvcmNlID0+IHtcclxuICAgICAgICBpZiAoIHRoaXMuZm9yY2VWYWx1ZXNEaXNwbGF5UHJvcGVydHkudmFsdWUgPT09IEZvcmNlVmFsdWVzRGlzcGxheUVudW0uU0NJRU5USUZJQyApIHtcclxuICAgICAgICAgIHJldHVybiBGb3JjZURlc2NyaWJlci5nZXRGb3JjZUluU2NpZW50aWZpY05vdGF0aW9uKCBjb252ZXJ0ZWRGb3JjZSwgSVNMQ0NvbnN0YW50cy5TQ0lFTlRJRklDX05PVEFUSU9OX1BSRUNJU0lPTiApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYCR7Y29udmVydGVkRm9yY2V9YDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlciggbW9kZWwsIG9iamVjdDFMYWJlbCwgb2JqZWN0MkxhYmVsLCBwb3NpdGlvbkRlc2NyaWJlciwgb3B0aW9ucyApO1xyXG5cclxuICAgIG1vZGVsLmZvcmNlVmFsdWVzRGlzcGxheVByb3BlcnR5LmxpbmsoIGZvcmNlVmFsdWVzRGlzcGxheSA9PiB7XHJcbiAgICAgIHRoaXMudW5pdHMgPSBmb3JjZVZhbHVlc0Rpc3BsYXkgPT09IEZvcmNlVmFsdWVzRGlzcGxheUVudW0uU0NJRU5USUZJQyA/IHVuaXRzTmV3dG9uc1N0cmluZyA6IG1pY3JvbmV3dG9uc1N0cmluZztcclxuICAgIH0gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIG1hcHBlZCBpbmRleCBiYXNlZCBvbiB0aGUgZ2l2ZW4gZm9yY2UgdmFsdWUuIEZvcmNlIHZhbHVlcyBpbiBJU0xDIHNpbXMgcmFuZ2UgZnJvbSBwaWNvbmV3dG9ucyB0b1xyXG4gICAqIG5ld3RvbnMsIHNvIGl0J3MgbmVjZXNzYXJ5IGZvciBzaW0tc3BlY2lmaWMgc3VidHlwZXMgdG8gc3BlY2lmeSB0aGlzIGxvZ2ljLlxyXG4gICAqIFRoZXNlIGVtcGlyaWNhbGx5IGRldGVybWluZWQgdmFsdWVzIHdlcmUgZGVzaWduZWQsIHNlZSBodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9kb2N1bWVudC9kLzEtMzdxQWdkZTJYcmxYQlFhZTJTZ2phcnRNMzVfRW56REQ5cGR0ZDNuWEFNL2VkaXQjaGVhZGluZz1oLm5ocXhqYmJ5M2RndVxyXG4gICAqIEBwcm90ZWN0ZWRcclxuICAgKlxyXG4gICAqIEBvdmVycmlkZVxyXG4gICAqIEBwYXJhbSAge251bWJlcn0gZm9yY2VcclxuICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyT2ZSZWdpb25zIC0gZm9yIGNyb3NzY2hlY2tcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSAtIGludGVnZXIgd2l0aGluIHRoZSByYW5nZSBvZiBmb3JjZSBzdHJpbmdzLCBzZWUgRm9yY2VEZXNjcmliZXIuanNcclxuICAgKi9cclxuICBnZXRGb3JjZVZlY3RvckluZGV4KCBmb3JjZSwgbnVtYmVyT2ZSZWdpb25zICkge1xyXG4gICAgY29uc3QgY29udmVydGVkRm9yY2UgPSBjb252ZXJ0Rm9yY2VUb01pY3JvbmV3dG9ucyggZm9yY2UgKTtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIG51bWJlck9mUmVnaW9ucyA9PT0gNywgJ0lmIG51bWJlck9mUmVnaW9ucyBjaGFuZ2VzLCB0aGlzIGZ1bmN0aW9uIHNob3VsZCB0b28uJyApO1xyXG5cclxuICAgIGlmICggY29udmVydGVkRm9yY2UgPCAwLjE2Njg1MiApIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBpZiAoIGNvbnZlcnRlZEZvcmNlIDwgMi4yMDYzMDcgKSB7XHJcbiAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG4gICAgaWYgKCBjb252ZXJ0ZWRGb3JjZSA8IDQuNDEyNjE1ICkge1xyXG4gICAgICByZXR1cm4gMjtcclxuICAgIH1cclxuICAgIGlmICggY29udmVydGVkRm9yY2UgPCA4LjY4NzMzNyApIHtcclxuICAgICAgcmV0dXJuIDM7XHJcbiAgICB9XHJcbiAgICBpZiAoIGNvbnZlcnRlZEZvcmNlIDwgMTkuODU2NzY4ICkge1xyXG4gICAgICByZXR1cm4gNDtcclxuICAgIH1cclxuICAgIGlmICggY29udmVydGVkRm9yY2UgPCAzNS4zMDA5MjAgKSB7XHJcbiAgICAgIHJldHVybiA1O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIDY7XHJcbiAgfVxyXG59XHJcblxyXG5ncmF2aXR5Rm9yY2VMYWIucmVnaXN0ZXIoICdHcmF2aXR5Rm9yY2VMYWJGb3JjZURlc2NyaWJlcicsIEdyYXZpdHlGb3JjZUxhYkZvcmNlRGVzY3JpYmVyICk7XHJcbmV4cG9ydCBkZWZhdWx0IEdyYXZpdHlGb3JjZUxhYkZvcmNlRGVzY3JpYmVyOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxLQUFLLE1BQU0sNkJBQTZCO0FBQy9DLE9BQU9DLDZCQUE2QixNQUFNLDJFQUEyRTtBQUNySCxPQUFPQyxhQUFhLE1BQU0sMkRBQTJEO0FBQ3JGLE9BQU9DLHNCQUFzQixNQUFNLDBFQUEwRTtBQUM3RyxPQUFPQyxjQUFjLE1BQU0sNEVBQTRFO0FBQ3ZHLE9BQU9DLGVBQWUsTUFBTSwwQkFBMEI7QUFDdEQsT0FBT0Msc0JBQXNCLE1BQU0saUNBQWlDO0FBRXBFLE1BQU1DLGtCQUFrQixHQUFHTiw2QkFBNkIsQ0FBQ08sS0FBSyxDQUFDQyxPQUFPO0FBRXRFLE1BQU1DLGtCQUFrQixHQUFHSixzQkFBc0IsQ0FBQ0ssSUFBSSxDQUFDQyxZQUFZOztBQUVuRTtBQUNBLE1BQU1DLHVCQUF1QixHQUFHLEdBQUc7QUFDbkMsTUFBTUMsMEJBQTBCLEdBQUdDLEtBQUssSUFBSTtFQUMxQyxPQUFPZixLQUFLLENBQUNnQixhQUFhLENBQUVELEtBQUssR0FBR0YsdUJBQXVCLEVBQUUsQ0FBRSxDQUFDO0FBQ2xFLENBQUM7QUFFRCxNQUFNSSw2QkFBNkIsU0FBU2IsY0FBYyxDQUFDO0VBRXpEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFYyxXQUFXQSxDQUFFQyxLQUFLLEVBQUVDLFlBQVksRUFBRUMsWUFBWSxFQUFFQyxpQkFBaUIsRUFBRztJQUNsRSxNQUFNQyxPQUFPLEdBQUc7TUFDZGYsS0FBSyxFQUFFRSxrQkFBa0I7TUFFekJjLFlBQVksRUFBRVQsS0FBSyxJQUFJO1FBQ3JCLElBQUssSUFBSSxDQUFDVSwwQkFBMEIsQ0FBQ0MsS0FBSyxLQUFLdkIsc0JBQXNCLENBQUN3QixVQUFVLEVBQUc7VUFDakYsT0FBT2IsMEJBQTBCLENBQUVDLEtBQU0sQ0FBQztRQUM1QztRQUNBLE9BQU9BLEtBQUs7TUFDZCxDQUFDO01BRURhLGtCQUFrQixFQUFFQyxjQUFjLElBQUk7UUFDcEMsSUFBSyxJQUFJLENBQUNKLDBCQUEwQixDQUFDQyxLQUFLLEtBQUt2QixzQkFBc0IsQ0FBQ3dCLFVBQVUsRUFBRztVQUNqRixPQUFPdkIsY0FBYyxDQUFDMEIsNEJBQTRCLENBQUVELGNBQWMsRUFBRTNCLGFBQWEsQ0FBQzZCLDZCQUE4QixDQUFDO1FBQ25IO1FBQ0EsT0FBUSxHQUFFRixjQUFlLEVBQUM7TUFDNUI7SUFDRixDQUFDO0lBRUQsS0FBSyxDQUFFVixLQUFLLEVBQUVDLFlBQVksRUFBRUMsWUFBWSxFQUFFQyxpQkFBaUIsRUFBRUMsT0FBUSxDQUFDO0lBRXRFSixLQUFLLENBQUNNLDBCQUEwQixDQUFDTyxJQUFJLENBQUVDLGtCQUFrQixJQUFJO01BQzNELElBQUksQ0FBQ3pCLEtBQUssR0FBR3lCLGtCQUFrQixLQUFLOUIsc0JBQXNCLENBQUN3QixVQUFVLEdBQUdwQixrQkFBa0IsR0FBR0csa0JBQWtCO0lBQ2pILENBQUUsQ0FBQztFQUNMOztFQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDRXdCLG1CQUFtQkEsQ0FBRW5CLEtBQUssRUFBRW9CLGVBQWUsRUFBRztJQUM1QyxNQUFNTixjQUFjLEdBQUdmLDBCQUEwQixDQUFFQyxLQUFNLENBQUM7SUFDMURxQixNQUFNLElBQUlBLE1BQU0sQ0FBRUQsZUFBZSxLQUFLLENBQUMsRUFBRSx1REFBd0QsQ0FBQztJQUVsRyxJQUFLTixjQUFjLEdBQUcsUUFBUSxFQUFHO01BQy9CLE9BQU8sQ0FBQztJQUNWO0lBQ0EsSUFBS0EsY0FBYyxHQUFHLFFBQVEsRUFBRztNQUMvQixPQUFPLENBQUM7SUFDVjtJQUNBLElBQUtBLGNBQWMsR0FBRyxRQUFRLEVBQUc7TUFDL0IsT0FBTyxDQUFDO0lBQ1Y7SUFDQSxJQUFLQSxjQUFjLEdBQUcsUUFBUSxFQUFHO01BQy9CLE9BQU8sQ0FBQztJQUNWO0lBQ0EsSUFBS0EsY0FBYyxHQUFHLFNBQVMsRUFBRztNQUNoQyxPQUFPLENBQUM7SUFDVjtJQUNBLElBQUtBLGNBQWMsR0FBRyxTQUFTLEVBQUc7TUFDaEMsT0FBTyxDQUFDO0lBQ1Y7SUFDQSxPQUFPLENBQUM7RUFDVjtBQUNGO0FBRUF4QixlQUFlLENBQUNnQyxRQUFRLENBQUUsK0JBQStCLEVBQUVwQiw2QkFBOEIsQ0FBQztBQUMxRixlQUFlQSw2QkFBNkIifQ==