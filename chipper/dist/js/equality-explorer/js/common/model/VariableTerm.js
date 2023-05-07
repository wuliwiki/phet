// Copyright 2018-2022, University of Colorado Boulder

/**
 * Term whose value is a coefficient times some variable value.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import equalityExplorer from '../../equalityExplorer.js';
import EqualityExplorerConstants from '../EqualityExplorerConstants.js';
import Term from './Term.js';
import UniversalOperator from './UniversalOperator.js';
export default class VariableTerm extends Term {
  /**
   * @param variable - the variable for this term, e.g. 'x'
   * @param [providedOptions]
   */
  constructor(variable, providedOptions) {
    const options = optionize()({
      // SelfOptions
      coefficient: EqualityExplorerConstants.DEFAULT_COEFFICIENT
    }, providedOptions);
    assert && assert(options.coefficient.isReduced(), `coefficient must be reduced: ${options.coefficient}`);
    super(options.coefficient, options);
    this.coefficient = options.coefficient;
    this.variable = variable;
  }
  getVariable() {
    return this.variable;
  }

  /**
   * For debugging only. Do not rely on the format of toString.
   */
  toString() {
    return `VariableTerm: ${this.coefficient} ${this.variable}`;
  }

  /**
   * Creates the options that would be needed to instantiate a copy of this object.
   */
  copyOptions() {
    return combineOptions({}, super.copyOptions(), {
      coefficient: this.coefficient.copy()
    });
  }

  /**
   * Creates a copy of this term, with modifications through options.
   */
  copy(providedOptions) {
    return new VariableTerm(this.variable, combineOptions({}, this.copyOptions(), providedOptions)); //TODO https://github.com/phetsims/equality-explorer/issues/200 dynamic
  }

  /**
   * Gets the weight of this term.
   */
  get weight() {
    return this.coefficient.timesInteger(this.variable.valueProperty.value).reduced();
  }

  /**
   * Are this term and the specified term 'like terms'?
   * Variable terms are 'like' if they are associated with the same variable.
   */
  isLikeTerm(term) {
    return term instanceof VariableTerm && term.variable === this.variable;
  }

  /**
   * Applies an operation to this term, resulting in a new term.
   * Returns null if the operation is not applicable to this term.
   */
  applyOperation(operation) {
    let term = null;
    if (operation.operand instanceof VariableTerm) {
      // plus or minus a variable
      if (operation.operator === UniversalOperator.PLUS) {
        term = this.plus(operation.operand);
      } else if (operation.operator === UniversalOperator.MINUS) {
        term = this.minus(operation.operand);
      }
    } else {
      // times or divided-by a constant
      if (operation.operator === UniversalOperator.TIMES) {
        term = this.times(operation.operand);
      } else if (operation.operator === UniversalOperator.DIVIDE) {
        term = this.divided(operation.operand);
      }
    }
    return term;
  }

  /**
   * Adds a variable term to this term to create a new term.
   */
  plus(term) {
    assert && assert(this.isLikeTerm(term), `not a like term: ${term}`);
    return this.copy({
      coefficient: this.coefficient.plus(term.coefficient).reduced()
    });
  }

  /**
   * Subtracts a variable term from this term to create a new term.
   */
  minus(term) {
    assert && assert(this.isLikeTerm(term), `not a like term: ${term}`);
    return this.copy({
      coefficient: this.coefficient.minus(term.coefficient).reduced()
    });
  }

  /**
   * Multiplies this term by a constant term to create a new term.
   */
  times(term) {
    return this.copy({
      coefficient: this.coefficient.times(term.constantValue).reduced()
    });
  }

  /**
   * Divides this term by a constant term to create a new term.
   */
  divided(term) {
    assert && assert(term.constantValue.getValue() !== 0, 'attempt to divide by zero');
    return this.copy({
      coefficient: this.coefficient.divided(term.constantValue).reduced()
    });
  }
}
equalityExplorer.register('VariableTerm', VariableTerm);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25pemUiLCJjb21iaW5lT3B0aW9ucyIsImVxdWFsaXR5RXhwbG9yZXIiLCJFcXVhbGl0eUV4cGxvcmVyQ29uc3RhbnRzIiwiVGVybSIsIlVuaXZlcnNhbE9wZXJhdG9yIiwiVmFyaWFibGVUZXJtIiwiY29uc3RydWN0b3IiLCJ2YXJpYWJsZSIsInByb3ZpZGVkT3B0aW9ucyIsIm9wdGlvbnMiLCJjb2VmZmljaWVudCIsIkRFRkFVTFRfQ09FRkZJQ0lFTlQiLCJhc3NlcnQiLCJpc1JlZHVjZWQiLCJnZXRWYXJpYWJsZSIsInRvU3RyaW5nIiwiY29weU9wdGlvbnMiLCJjb3B5Iiwid2VpZ2h0IiwidGltZXNJbnRlZ2VyIiwidmFsdWVQcm9wZXJ0eSIsInZhbHVlIiwicmVkdWNlZCIsImlzTGlrZVRlcm0iLCJ0ZXJtIiwiYXBwbHlPcGVyYXRpb24iLCJvcGVyYXRpb24iLCJvcGVyYW5kIiwib3BlcmF0b3IiLCJQTFVTIiwicGx1cyIsIk1JTlVTIiwibWludXMiLCJUSU1FUyIsInRpbWVzIiwiRElWSURFIiwiZGl2aWRlZCIsImNvbnN0YW50VmFsdWUiLCJnZXRWYWx1ZSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiVmFyaWFibGVUZXJtLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFRlcm0gd2hvc2UgdmFsdWUgaXMgYSBjb2VmZmljaWVudCB0aW1lcyBzb21lIHZhcmlhYmxlIHZhbHVlLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKi9cclxuXHJcbmltcG9ydCBvcHRpb25pemUsIHsgY29tYmluZU9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvb3B0aW9uaXplLmpzJztcclxuaW1wb3J0IEZyYWN0aW9uIGZyb20gJy4uLy4uLy4uLy4uL3BoZXRjb21tb24vanMvbW9kZWwvRnJhY3Rpb24uanMnO1xyXG5pbXBvcnQgZXF1YWxpdHlFeHBsb3JlciBmcm9tICcuLi8uLi9lcXVhbGl0eUV4cGxvcmVyLmpzJztcclxuaW1wb3J0IEVxdWFsaXR5RXhwbG9yZXJDb25zdGFudHMgZnJvbSAnLi4vRXF1YWxpdHlFeHBsb3JlckNvbnN0YW50cy5qcyc7XHJcbmltcG9ydCBDb25zdGFudFRlcm0gZnJvbSAnLi9Db25zdGFudFRlcm0uanMnO1xyXG5pbXBvcnQgVGVybSwgeyBUZXJtT3B0aW9ucyB9IGZyb20gJy4vVGVybS5qcyc7XHJcbmltcG9ydCBVbml2ZXJzYWxPcGVyYXRpb24gZnJvbSAnLi9Vbml2ZXJzYWxPcGVyYXRpb24uanMnO1xyXG5pbXBvcnQgVmFyaWFibGUgZnJvbSAnLi9WYXJpYWJsZS5qcyc7XHJcbmltcG9ydCBVbml2ZXJzYWxPcGVyYXRvciBmcm9tICcuL1VuaXZlcnNhbE9wZXJhdG9yLmpzJztcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSB7XHJcbiAgY29lZmZpY2llbnQ/OiBGcmFjdGlvbjtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFZhcmlhYmxlVGVybU9wdGlvbnMgPSBTZWxmT3B0aW9ucyAmIFRlcm1PcHRpb25zO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFyaWFibGVUZXJtIGV4dGVuZHMgVGVybSB7XHJcblxyXG4gIHB1YmxpYyByZWFkb25seSBjb2VmZmljaWVudDogRnJhY3Rpb247XHJcbiAgcHVibGljIHJlYWRvbmx5IHZhcmlhYmxlOiBWYXJpYWJsZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHZhcmlhYmxlIC0gdGhlIHZhcmlhYmxlIGZvciB0aGlzIHRlcm0sIGUuZy4gJ3gnXHJcbiAgICogQHBhcmFtIFtwcm92aWRlZE9wdGlvbnNdXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCB2YXJpYWJsZTogVmFyaWFibGUsIHByb3ZpZGVkT3B0aW9ucz86IFZhcmlhYmxlVGVybU9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxWYXJpYWJsZVRlcm1PcHRpb25zLCBTZWxmT3B0aW9ucywgVGVybU9wdGlvbnM+KCkoIHtcclxuXHJcbiAgICAgIC8vIFNlbGZPcHRpb25zXHJcbiAgICAgIGNvZWZmaWNpZW50OiBFcXVhbGl0eUV4cGxvcmVyQ29uc3RhbnRzLkRFRkFVTFRfQ09FRkZJQ0lFTlRcclxuICAgIH0sIHByb3ZpZGVkT3B0aW9ucyApO1xyXG5cclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIG9wdGlvbnMuY29lZmZpY2llbnQuaXNSZWR1Y2VkKCksIGBjb2VmZmljaWVudCBtdXN0IGJlIHJlZHVjZWQ6ICR7b3B0aW9ucy5jb2VmZmljaWVudH1gICk7XHJcblxyXG4gICAgc3VwZXIoIG9wdGlvbnMuY29lZmZpY2llbnQsIG9wdGlvbnMgKTtcclxuXHJcbiAgICB0aGlzLmNvZWZmaWNpZW50ID0gb3B0aW9ucy5jb2VmZmljaWVudDtcclxuICAgIHRoaXMudmFyaWFibGUgPSB2YXJpYWJsZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvdmVycmlkZSBnZXRWYXJpYWJsZSgpOiBWYXJpYWJsZSB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMudmFyaWFibGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGb3IgZGVidWdnaW5nIG9ubHkuIERvIG5vdCByZWx5IG9uIHRoZSBmb3JtYXQgb2YgdG9TdHJpbmcuXHJcbiAgICovXHJcbiAgcHVibGljIG92ZXJyaWRlIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYFZhcmlhYmxlVGVybTogJHt0aGlzLmNvZWZmaWNpZW50fSAke3RoaXMudmFyaWFibGV9YDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgdGhlIG9wdGlvbnMgdGhhdCB3b3VsZCBiZSBuZWVkZWQgdG8gaW5zdGFudGlhdGUgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxyXG4gICAqL1xyXG4gIHB1YmxpYyBvdmVycmlkZSBjb3B5T3B0aW9ucygpOiBWYXJpYWJsZVRlcm1PcHRpb25zIHtcclxuICAgIHJldHVybiBjb21iaW5lT3B0aW9uczxWYXJpYWJsZVRlcm1PcHRpb25zPigge30sIHN1cGVyLmNvcHlPcHRpb25zKCksIHtcclxuICAgICAgY29lZmZpY2llbnQ6IHRoaXMuY29lZmZpY2llbnQuY29weSgpXHJcbiAgICB9ICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIHRlcm0sIHdpdGggbW9kaWZpY2F0aW9ucyB0aHJvdWdoIG9wdGlvbnMuXHJcbiAgICovXHJcbiAgcHVibGljIG92ZXJyaWRlIGNvcHkoIHByb3ZpZGVkT3B0aW9ucz86IFZhcmlhYmxlVGVybU9wdGlvbnMgKTogVmFyaWFibGVUZXJtIHtcclxuICAgIHJldHVybiBuZXcgVmFyaWFibGVUZXJtKCB0aGlzLnZhcmlhYmxlLCBjb21iaW5lT3B0aW9uczxWYXJpYWJsZVRlcm1PcHRpb25zPigge30sIHRoaXMuY29weU9wdGlvbnMoKSwgcHJvdmlkZWRPcHRpb25zICkgKTsgLy9UT0RPIGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9lcXVhbGl0eS1leHBsb3Jlci9pc3N1ZXMvMjAwIGR5bmFtaWNcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIHdlaWdodCBvZiB0aGlzIHRlcm0uXHJcbiAgICovXHJcbiAgcHVibGljIG92ZXJyaWRlIGdldCB3ZWlnaHQoKTogRnJhY3Rpb24ge1xyXG4gICAgcmV0dXJuIHRoaXMuY29lZmZpY2llbnQudGltZXNJbnRlZ2VyKCB0aGlzLnZhcmlhYmxlLnZhbHVlUHJvcGVydHkudmFsdWUgKS5yZWR1Y2VkKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcmUgdGhpcyB0ZXJtIGFuZCB0aGUgc3BlY2lmaWVkIHRlcm0gJ2xpa2UgdGVybXMnP1xyXG4gICAqIFZhcmlhYmxlIHRlcm1zIGFyZSAnbGlrZScgaWYgdGhleSBhcmUgYXNzb2NpYXRlZCB3aXRoIHRoZSBzYW1lIHZhcmlhYmxlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBvdmVycmlkZSBpc0xpa2VUZXJtKCB0ZXJtOiBUZXJtICk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICggdGVybSBpbnN0YW5jZW9mIFZhcmlhYmxlVGVybSApICYmICggdGVybS52YXJpYWJsZSA9PT0gdGhpcy52YXJpYWJsZSApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXBwbGllcyBhbiBvcGVyYXRpb24gdG8gdGhpcyB0ZXJtLCByZXN1bHRpbmcgaW4gYSBuZXcgdGVybS5cclxuICAgKiBSZXR1cm5zIG51bGwgaWYgdGhlIG9wZXJhdGlvbiBpcyBub3QgYXBwbGljYWJsZSB0byB0aGlzIHRlcm0uXHJcbiAgICovXHJcbiAgcHVibGljIGFwcGx5T3BlcmF0aW9uKCBvcGVyYXRpb246IFVuaXZlcnNhbE9wZXJhdGlvbiApOiBWYXJpYWJsZVRlcm0gfCBudWxsIHtcclxuXHJcbiAgICBsZXQgdGVybSA9IG51bGw7XHJcblxyXG4gICAgaWYgKCBvcGVyYXRpb24ub3BlcmFuZCBpbnN0YW5jZW9mIFZhcmlhYmxlVGVybSApIHtcclxuXHJcbiAgICAgIC8vIHBsdXMgb3IgbWludXMgYSB2YXJpYWJsZVxyXG4gICAgICBpZiAoIG9wZXJhdGlvbi5vcGVyYXRvciA9PT0gVW5pdmVyc2FsT3BlcmF0b3IuUExVUyApIHtcclxuICAgICAgICB0ZXJtID0gdGhpcy5wbHVzKCBvcGVyYXRpb24ub3BlcmFuZCApO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKCBvcGVyYXRpb24ub3BlcmF0b3IgPT09IFVuaXZlcnNhbE9wZXJhdG9yLk1JTlVTICkge1xyXG4gICAgICAgIHRlcm0gPSB0aGlzLm1pbnVzKCBvcGVyYXRpb24ub3BlcmFuZCApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuXHJcbiAgICAgIC8vIHRpbWVzIG9yIGRpdmlkZWQtYnkgYSBjb25zdGFudFxyXG4gICAgICBpZiAoIG9wZXJhdGlvbi5vcGVyYXRvciA9PT0gVW5pdmVyc2FsT3BlcmF0b3IuVElNRVMgKSB7XHJcbiAgICAgICAgdGVybSA9IHRoaXMudGltZXMoIG9wZXJhdGlvbi5vcGVyYW5kICk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoIG9wZXJhdGlvbi5vcGVyYXRvciA9PT0gVW5pdmVyc2FsT3BlcmF0b3IuRElWSURFICkge1xyXG4gICAgICAgIHRlcm0gPSB0aGlzLmRpdmlkZWQoIG9wZXJhdGlvbi5vcGVyYW5kICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGVybTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSB2YXJpYWJsZSB0ZXJtIHRvIHRoaXMgdGVybSB0byBjcmVhdGUgYSBuZXcgdGVybS5cclxuICAgKi9cclxuICBwdWJsaWMgb3ZlcnJpZGUgcGx1cyggdGVybTogVmFyaWFibGVUZXJtICk6IFZhcmlhYmxlVGVybSB7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCB0aGlzLmlzTGlrZVRlcm0oIHRlcm0gKSwgYG5vdCBhIGxpa2UgdGVybTogJHt0ZXJtfWAgKTtcclxuICAgIHJldHVybiB0aGlzLmNvcHkoIHtcclxuICAgICAgY29lZmZpY2llbnQ6IHRoaXMuY29lZmZpY2llbnQucGx1cyggdGVybS5jb2VmZmljaWVudCApLnJlZHVjZWQoKVxyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3VidHJhY3RzIGEgdmFyaWFibGUgdGVybSBmcm9tIHRoaXMgdGVybSB0byBjcmVhdGUgYSBuZXcgdGVybS5cclxuICAgKi9cclxuICBwdWJsaWMgb3ZlcnJpZGUgbWludXMoIHRlcm06IFZhcmlhYmxlVGVybSApOiBWYXJpYWJsZVRlcm0ge1xyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggdGhpcy5pc0xpa2VUZXJtKCB0ZXJtICksIGBub3QgYSBsaWtlIHRlcm06ICR7dGVybX1gICk7XHJcbiAgICByZXR1cm4gdGhpcy5jb3B5KCB7XHJcbiAgICAgIGNvZWZmaWNpZW50OiB0aGlzLmNvZWZmaWNpZW50Lm1pbnVzKCB0ZXJtLmNvZWZmaWNpZW50ICkucmVkdWNlZCgpXHJcbiAgICB9ICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNdWx0aXBsaWVzIHRoaXMgdGVybSBieSBhIGNvbnN0YW50IHRlcm0gdG8gY3JlYXRlIGEgbmV3IHRlcm0uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0aW1lcyggdGVybTogQ29uc3RhbnRUZXJtICk6IFZhcmlhYmxlVGVybSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb3B5KCB7XHJcbiAgICAgIGNvZWZmaWNpZW50OiB0aGlzLmNvZWZmaWNpZW50LnRpbWVzKCB0ZXJtLmNvbnN0YW50VmFsdWUgKS5yZWR1Y2VkKClcclxuICAgIH0gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpdmlkZXMgdGhpcyB0ZXJtIGJ5IGEgY29uc3RhbnQgdGVybSB0byBjcmVhdGUgYSBuZXcgdGVybS5cclxuICAgKi9cclxuICBwcml2YXRlIGRpdmlkZWQoIHRlcm06IENvbnN0YW50VGVybSApOiBWYXJpYWJsZVRlcm0ge1xyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggdGVybS5jb25zdGFudFZhbHVlLmdldFZhbHVlKCkgIT09IDAsICdhdHRlbXB0IHRvIGRpdmlkZSBieSB6ZXJvJyApO1xyXG4gICAgcmV0dXJuIHRoaXMuY29weSgge1xyXG4gICAgICBjb2VmZmljaWVudDogdGhpcy5jb2VmZmljaWVudC5kaXZpZGVkKCB0ZXJtLmNvbnN0YW50VmFsdWUgKS5yZWR1Y2VkKClcclxuICAgIH0gKTtcclxuICB9XHJcbn1cclxuXHJcbmVxdWFsaXR5RXhwbG9yZXIucmVnaXN0ZXIoICdWYXJpYWJsZVRlcm0nLCBWYXJpYWJsZVRlcm0gKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsU0FBUyxJQUFJQyxjQUFjLFFBQVEsdUNBQXVD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