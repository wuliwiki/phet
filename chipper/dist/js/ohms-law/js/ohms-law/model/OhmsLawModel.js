// Copyright 2013-2022, University of Colorado Boulder

/**
 * Primary model for the Ohm's Law simulation, see doc/model.md for more information.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import EnumerationDeprecatedProperty from '../../../../axon/js/EnumerationDeprecatedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import ohmsLaw from '../../ohmsLaw.js';
import OhmsLawConstants from '../OhmsLawConstants.js';
import CurrentUnit from './CurrentUnit.js';
class OhmsLawModel {
  /**
   */
  constructor(tandem) {
    // @public {Property.<number>} in volts
    this.voltageProperty = new NumberProperty(OhmsLawConstants.VOLTAGE_RANGE.getDefaultValue(), {
      tandem: tandem.createTandem('voltageProperty'),
      units: 'V',
      range: OhmsLawConstants.VOLTAGE_RANGE,
      phetioDocumentation: 'The voltage in the circuit'
    });

    // @public {Property.<number>} in Ohms
    this.resistanceProperty = new NumberProperty(OhmsLawConstants.RESISTANCE_RANGE.getDefaultValue(), {
      tandem: tandem.createTandem('resistanceProperty'),
      units: '\u2126',
      // ohms
      range: OhmsLawConstants.RESISTANCE_RANGE,
      phetioDocumentation: 'The resistance in the circuit'
    });

    // @public {Property.<number>} create a derived property that tracks the current in milli amps
    this.currentProperty = new DerivedProperty([this.voltageProperty, this.resistanceProperty], computeCurrent, {
      tandem: tandem.createTandem('currentProperty'),
      units: 'mA',
      phetioValueType: NumberIO,
      phetioDocumentation: 'The current flowing in the circuit'
    });

    // @public
    this.currentUnitsProperty = new EnumerationDeprecatedProperty(CurrentUnit, CurrentUnit.MILLIAMPS, {
      tandem: tandem.createTandem('currentUnitsProperty'),
      phetioDocumentation: 'Determines the displayed unit for the current'
    });

    // @public (read-only) {BooleanProperty} - true when a reset is in progress, false otherwise
    this.resetInProgressProperty = new BooleanProperty(false);
  }

  /**
   * resets the properties of the model
   * @public
   */
  reset() {
    this.resetInProgressProperty.set(true);
    this.voltageProperty.reset();
    this.resistanceProperty.reset();
    this.resetInProgressProperty.set(false);
  }

  /**
   * Get the normalized voltage over the range of allowed voltages in this sim.
   * @public
   * @returns {number}
   */
  getNormalizedVoltage() {
    const range = OhmsLawConstants.VOLTAGE_RANGE;
    return (this.voltageProperty.get() - range.min) / range.getLength();
  }

  /**
   * Get the normalized current, based on the allowable values for current in this sim.
   * @public
   * @returns {number}
   */
  getNormalizedCurrent() {
    const range = OhmsLawModel.getCurrentRange();
    return (this.currentProperty.get() - range.min) / range.getLength();
  }

  /**
   * Get the normalized resistance, based on the allowable values for resistance in this
   * sim.
   * @public
   * @returns {number}
   */
  getNormalizedResistance() {
    const range = OhmsLawConstants.RESISTANCE_RANGE;
    return (this.resistanceProperty.get() - range.min) / range.getLength();
  }

  /**
   * Get the current as a number formatted based on the appropriate decimal places for the display unit.
   * @public
   * @returns {string}
   */
  getFixedCurrent() {
    let current = this.currentProperty.value;
    const units = this.currentUnitsProperty.value;
    if (units === CurrentUnit.AMPS) {
      current = current / 100;
    }
    return Utils.toFixed(current, CurrentUnit.getSigFigs(units));
  }

  /**
   * Get the maximum current that can be computed by the model
   * @returns {number} - the max current.
   * @public
   */
  static getMaxCurrent() {
    return computeCurrent(OhmsLawConstants.VOLTAGE_RANGE.max, OhmsLawConstants.RESISTANCE_RANGE.min);
  }

  /**
   * Get the minimum current that can be computed by the model.
   * @returns {number} [description]
   * @private
   */
  static getMinCurrent() {
    return computeCurrent(OhmsLawConstants.VOLTAGE_RANGE.min, OhmsLawConstants.RESISTANCE_RANGE.max);
  }

  /**
   * Get the Range of the current, will construct a new range if not yet set
   * @returns {Range}
   * @public
   */
  static getCurrentRange() {
    if (!this.currentRange) {
      // @private, use the getter
      this.currentRange = new Range(OhmsLawModel.getMinCurrent(), OhmsLawModel.getMaxCurrent());
    }
    return this.currentRange;
  }
}

/**
 * The main model function, used to compute the current of the model
 * @param voltage
 * @param resistance
 * @returns {number} - current in milliamps
 */
function computeCurrent(voltage, resistance) {
  return 1000 * voltage / resistance;
}
ohmsLaw.register('OhmsLawModel', OhmsLawModel);
export default OhmsLawModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCb29sZWFuUHJvcGVydHkiLCJEZXJpdmVkUHJvcGVydHkiLCJFbnVtZXJhdGlvbkRlcHJlY2F0ZWRQcm9wZXJ0eSIsIk51bWJlclByb3BlcnR5IiwiUmFuZ2UiLCJVdGlscyIsIk51bWJlcklPIiwib2htc0xhdyIsIk9obXNMYXdDb25zdGFudHMiLCJDdXJyZW50VW5pdCIsIk9obXNMYXdNb2RlbCIsImNvbnN0cnVjdG9yIiwidGFuZGVtIiwidm9sdGFnZVByb3BlcnR5IiwiVk9MVEFHRV9SQU5HRSIsImdldERlZmF1bHRWYWx1ZSIsImNyZWF0ZVRhbmRlbSIsInVuaXRzIiwicmFuZ2UiLCJwaGV0aW9Eb2N1bWVudGF0aW9uIiwicmVzaXN0YW5jZVByb3BlcnR5IiwiUkVTSVNUQU5DRV9SQU5HRSIsImN1cnJlbnRQcm9wZXJ0eSIsImNvbXB1dGVDdXJyZW50IiwicGhldGlvVmFsdWVUeXBlIiwiY3VycmVudFVuaXRzUHJvcGVydHkiLCJNSUxMSUFNUFMiLCJyZXNldEluUHJvZ3Jlc3NQcm9wZXJ0eSIsInJlc2V0Iiwic2V0IiwiZ2V0Tm9ybWFsaXplZFZvbHRhZ2UiLCJnZXQiLCJtaW4iLCJnZXRMZW5ndGgiLCJnZXROb3JtYWxpemVkQ3VycmVudCIsImdldEN1cnJlbnRSYW5nZSIsImdldE5vcm1hbGl6ZWRSZXNpc3RhbmNlIiwiZ2V0Rml4ZWRDdXJyZW50IiwiY3VycmVudCIsInZhbHVlIiwiQU1QUyIsInRvRml4ZWQiLCJnZXRTaWdGaWdzIiwiZ2V0TWF4Q3VycmVudCIsIm1heCIsImdldE1pbkN1cnJlbnQiLCJjdXJyZW50UmFuZ2UiLCJ2b2x0YWdlIiwicmVzaXN0YW5jZSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiT2htc0xhd01vZGVsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDEzLTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFByaW1hcnkgbW9kZWwgZm9yIHRoZSBPaG0ncyBMYXcgc2ltdWxhdGlvbiwgc2VlIGRvYy9tb2RlbC5tZCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICogQGF1dGhvciBWYXNpbHkgU2hha2hvdiAoTWxlYXJuZXIpXHJcbiAqIEBhdXRob3IgQW50b24gVWx5YW5vdiAoTWxlYXJuZXIpXHJcbiAqL1xyXG5cclxuaW1wb3J0IEJvb2xlYW5Qcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL0Jvb2xlYW5Qcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBEZXJpdmVkUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9EZXJpdmVkUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgRW51bWVyYXRpb25EZXByZWNhdGVkUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9FbnVtZXJhdGlvbkRlcHJlY2F0ZWRQcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBOdW1iZXJQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL051bWJlclByb3BlcnR5LmpzJztcclxuaW1wb3J0IFJhbmdlIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9SYW5nZS5qcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvVXRpbHMuanMnO1xyXG5pbXBvcnQgTnVtYmVySU8gZnJvbSAnLi4vLi4vLi4vLi4vdGFuZGVtL2pzL3R5cGVzL051bWJlcklPLmpzJztcclxuaW1wb3J0IG9obXNMYXcgZnJvbSAnLi4vLi4vb2htc0xhdy5qcyc7XHJcbmltcG9ydCBPaG1zTGF3Q29uc3RhbnRzIGZyb20gJy4uL09obXNMYXdDb25zdGFudHMuanMnO1xyXG5pbXBvcnQgQ3VycmVudFVuaXQgZnJvbSAnLi9DdXJyZW50VW5pdC5qcyc7XHJcblxyXG5jbGFzcyBPaG1zTGF3TW9kZWwge1xyXG4gIC8qKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCB0YW5kZW0gKSB7XHJcblxyXG4gICAgLy8gQHB1YmxpYyB7UHJvcGVydHkuPG51bWJlcj59IGluIHZvbHRzXHJcbiAgICB0aGlzLnZvbHRhZ2VQcm9wZXJ0eSA9IG5ldyBOdW1iZXJQcm9wZXJ0eSggT2htc0xhd0NvbnN0YW50cy5WT0xUQUdFX1JBTkdFLmdldERlZmF1bHRWYWx1ZSgpLCB7XHJcbiAgICAgIHRhbmRlbTogdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3ZvbHRhZ2VQcm9wZXJ0eScgKSxcclxuICAgICAgdW5pdHM6ICdWJyxcclxuICAgICAgcmFuZ2U6IE9obXNMYXdDb25zdGFudHMuVk9MVEFHRV9SQU5HRSxcclxuICAgICAgcGhldGlvRG9jdW1lbnRhdGlvbjogJ1RoZSB2b2x0YWdlIGluIHRoZSBjaXJjdWl0J1xyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIEBwdWJsaWMge1Byb3BlcnR5LjxudW1iZXI+fSBpbiBPaG1zXHJcbiAgICB0aGlzLnJlc2lzdGFuY2VQcm9wZXJ0eSA9IG5ldyBOdW1iZXJQcm9wZXJ0eSggT2htc0xhd0NvbnN0YW50cy5SRVNJU1RBTkNFX1JBTkdFLmdldERlZmF1bHRWYWx1ZSgpLCB7XHJcbiAgICAgIHRhbmRlbTogdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3Jlc2lzdGFuY2VQcm9wZXJ0eScgKSxcclxuICAgICAgdW5pdHM6ICdcXHUyMTI2JywgLy8gb2htc1xyXG4gICAgICByYW5nZTogT2htc0xhd0NvbnN0YW50cy5SRVNJU1RBTkNFX1JBTkdFLFxyXG4gICAgICBwaGV0aW9Eb2N1bWVudGF0aW9uOiAnVGhlIHJlc2lzdGFuY2UgaW4gdGhlIGNpcmN1aXQnXHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gQHB1YmxpYyB7UHJvcGVydHkuPG51bWJlcj59IGNyZWF0ZSBhIGRlcml2ZWQgcHJvcGVydHkgdGhhdCB0cmFja3MgdGhlIGN1cnJlbnQgaW4gbWlsbGkgYW1wc1xyXG4gICAgdGhpcy5jdXJyZW50UHJvcGVydHkgPSBuZXcgRGVyaXZlZFByb3BlcnR5KFxyXG4gICAgICBbIHRoaXMudm9sdGFnZVByb3BlcnR5LCB0aGlzLnJlc2lzdGFuY2VQcm9wZXJ0eSBdLFxyXG4gICAgICBjb21wdXRlQ3VycmVudCwge1xyXG4gICAgICAgIHRhbmRlbTogdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ2N1cnJlbnRQcm9wZXJ0eScgKSxcclxuICAgICAgICB1bml0czogJ21BJyxcclxuICAgICAgICBwaGV0aW9WYWx1ZVR5cGU6IE51bWJlcklPLFxyXG4gICAgICAgIHBoZXRpb0RvY3VtZW50YXRpb246ICdUaGUgY3VycmVudCBmbG93aW5nIGluIHRoZSBjaXJjdWl0J1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIEBwdWJsaWNcclxuICAgIHRoaXMuY3VycmVudFVuaXRzUHJvcGVydHkgPSBuZXcgRW51bWVyYXRpb25EZXByZWNhdGVkUHJvcGVydHkoIEN1cnJlbnRVbml0LCBDdXJyZW50VW5pdC5NSUxMSUFNUFMsIHtcclxuICAgICAgdGFuZGVtOiB0YW5kZW0uY3JlYXRlVGFuZGVtKCAnY3VycmVudFVuaXRzUHJvcGVydHknICksXHJcbiAgICAgIHBoZXRpb0RvY3VtZW50YXRpb246ICdEZXRlcm1pbmVzIHRoZSBkaXNwbGF5ZWQgdW5pdCBmb3IgdGhlIGN1cnJlbnQnXHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gQHB1YmxpYyAocmVhZC1vbmx5KSB7Qm9vbGVhblByb3BlcnR5fSAtIHRydWUgd2hlbiBhIHJlc2V0IGlzIGluIHByb2dyZXNzLCBmYWxzZSBvdGhlcndpc2VcclxuICAgIHRoaXMucmVzZXRJblByb2dyZXNzUHJvcGVydHkgPSBuZXcgQm9vbGVhblByb3BlcnR5KCBmYWxzZSApO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIHJlc2V0cyB0aGUgcHJvcGVydGllcyBvZiB0aGUgbW9kZWxcclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgcmVzZXQoKSB7XHJcbiAgICB0aGlzLnJlc2V0SW5Qcm9ncmVzc1Byb3BlcnR5LnNldCggdHJ1ZSApO1xyXG4gICAgdGhpcy52b2x0YWdlUHJvcGVydHkucmVzZXQoKTtcclxuICAgIHRoaXMucmVzaXN0YW5jZVByb3BlcnR5LnJlc2V0KCk7XHJcbiAgICB0aGlzLnJlc2V0SW5Qcm9ncmVzc1Byb3BlcnR5LnNldCggZmFsc2UgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbm9ybWFsaXplZCB2b2x0YWdlIG92ZXIgdGhlIHJhbmdlIG9mIGFsbG93ZWQgdm9sdGFnZXMgaW4gdGhpcyBzaW0uXHJcbiAgICogQHB1YmxpY1xyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0Tm9ybWFsaXplZFZvbHRhZ2UoKSB7XHJcbiAgICBjb25zdCByYW5nZSA9IE9obXNMYXdDb25zdGFudHMuVk9MVEFHRV9SQU5HRTtcclxuICAgIHJldHVybiAoIHRoaXMudm9sdGFnZVByb3BlcnR5LmdldCgpIC0gcmFuZ2UubWluICkgLyByYW5nZS5nZXRMZW5ndGgoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbm9ybWFsaXplZCBjdXJyZW50LCBiYXNlZCBvbiB0aGUgYWxsb3dhYmxlIHZhbHVlcyBmb3IgY3VycmVudCBpbiB0aGlzIHNpbS5cclxuICAgKiBAcHVibGljXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBnZXROb3JtYWxpemVkQ3VycmVudCgpIHtcclxuICAgIGNvbnN0IHJhbmdlID0gT2htc0xhd01vZGVsLmdldEN1cnJlbnRSYW5nZSgpO1xyXG4gICAgcmV0dXJuICggdGhpcy5jdXJyZW50UHJvcGVydHkuZ2V0KCkgLSByYW5nZS5taW4gKSAvIHJhbmdlLmdldExlbmd0aCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBub3JtYWxpemVkIHJlc2lzdGFuY2UsIGJhc2VkIG9uIHRoZSBhbGxvd2FibGUgdmFsdWVzIGZvciByZXNpc3RhbmNlIGluIHRoaXNcclxuICAgKiBzaW0uXHJcbiAgICogQHB1YmxpY1xyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0Tm9ybWFsaXplZFJlc2lzdGFuY2UoKSB7XHJcbiAgICBjb25zdCByYW5nZSA9IE9obXNMYXdDb25zdGFudHMuUkVTSVNUQU5DRV9SQU5HRTtcclxuICAgIHJldHVybiAoIHRoaXMucmVzaXN0YW5jZVByb3BlcnR5LmdldCgpIC0gcmFuZ2UubWluICkgLyByYW5nZS5nZXRMZW5ndGgoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY3VycmVudCBhcyBhIG51bWJlciBmb3JtYXR0ZWQgYmFzZWQgb24gdGhlIGFwcHJvcHJpYXRlIGRlY2ltYWwgcGxhY2VzIGZvciB0aGUgZGlzcGxheSB1bml0LlxyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIGdldEZpeGVkQ3VycmVudCgpIHtcclxuICAgIGxldCBjdXJyZW50ID0gdGhpcy5jdXJyZW50UHJvcGVydHkudmFsdWU7XHJcbiAgICBjb25zdCB1bml0cyA9IHRoaXMuY3VycmVudFVuaXRzUHJvcGVydHkudmFsdWU7XHJcbiAgICBpZiAoIHVuaXRzID09PSBDdXJyZW50VW5pdC5BTVBTICkge1xyXG4gICAgICBjdXJyZW50ID0gY3VycmVudCAvIDEwMDtcclxuICAgIH1cclxuICAgIHJldHVybiBVdGlscy50b0ZpeGVkKCBjdXJyZW50LCBDdXJyZW50VW5pdC5nZXRTaWdGaWdzKCB1bml0cyApICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIG1heGltdW0gY3VycmVudCB0aGF0IGNhbiBiZSBjb21wdXRlZCBieSB0aGUgbW9kZWxcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBtYXggY3VycmVudC5cclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgc3RhdGljIGdldE1heEN1cnJlbnQoKSB7XHJcbiAgICByZXR1cm4gY29tcHV0ZUN1cnJlbnQoIE9obXNMYXdDb25zdGFudHMuVk9MVEFHRV9SQU5HRS5tYXgsIE9obXNMYXdDb25zdGFudHMuUkVTSVNUQU5DRV9SQU5HRS5taW4gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbWluaW11bSBjdXJyZW50IHRoYXQgY2FuIGJlIGNvbXB1dGVkIGJ5IHRoZSBtb2RlbC5cclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBbZGVzY3JpcHRpb25dXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBzdGF0aWMgZ2V0TWluQ3VycmVudCgpIHtcclxuICAgIHJldHVybiBjb21wdXRlQ3VycmVudCggT2htc0xhd0NvbnN0YW50cy5WT0xUQUdFX1JBTkdFLm1pbiwgT2htc0xhd0NvbnN0YW50cy5SRVNJU1RBTkNFX1JBTkdFLm1heCApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBSYW5nZSBvZiB0aGUgY3VycmVudCwgd2lsbCBjb25zdHJ1Y3QgYSBuZXcgcmFuZ2UgaWYgbm90IHlldCBzZXRcclxuICAgKiBAcmV0dXJucyB7UmFuZ2V9XHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRDdXJyZW50UmFuZ2UoKSB7XHJcblxyXG4gICAgaWYgKCAhdGhpcy5jdXJyZW50UmFuZ2UgKSB7XHJcblxyXG4gICAgICAvLyBAcHJpdmF0ZSwgdXNlIHRoZSBnZXR0ZXJcclxuICAgICAgdGhpcy5jdXJyZW50UmFuZ2UgPSBuZXcgUmFuZ2UoIE9obXNMYXdNb2RlbC5nZXRNaW5DdXJyZW50KCksIE9obXNMYXdNb2RlbC5nZXRNYXhDdXJyZW50KCkgKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRSYW5nZTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgbWFpbiBtb2RlbCBmdW5jdGlvbiwgdXNlZCB0byBjb21wdXRlIHRoZSBjdXJyZW50IG9mIHRoZSBtb2RlbFxyXG4gKiBAcGFyYW0gdm9sdGFnZVxyXG4gKiBAcGFyYW0gcmVzaXN0YW5jZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGN1cnJlbnQgaW4gbWlsbGlhbXBzXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wdXRlQ3VycmVudCggdm9sdGFnZSwgcmVzaXN0YW5jZSApIHtcclxuICByZXR1cm4gMTAwMCAqIHZvbHRhZ2UgLyByZXNpc3RhbmNlO1xyXG59XHJcblxyXG5vaG1zTGF3LnJlZ2lzdGVyKCAnT2htc0xhd01vZGVsJywgT2htc0xhd01vZGVsICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPaG1zTGF3TW9kZWw7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLGVBQWUsTUFBTSx3Q0FBd0M7QUFDcEUsT0FBT0MsZUFBZSxNQUFNLHdDQUF3QztBQUNwRSxPQUFPQyw2QkFBNkIsTUFBTSxzREFBc0Q7QUFDaEcsT0FBT0MsY0FBYyxNQUFNLHVDQUF1QztBQUNsRSxPQUFPQyxLQUFLLE1BQU0sNkJBQTZCO0FBQy9DLE9BQU9DLEtBQUssTUFBTSw2QkFBNkI7QUFDL0MsT0FBT0MsUUFBUSxNQUFNLHlDQUF5QztBQUM5RCxPQUFPQyxPQUFPLE1BQU0sa0JBQWtCO0FBQ3RDLE9BQU9DLGdCQUFnQixNQUFNLHdCQUF3QjtBQUNyRCxPQUFPQyxXQUFXLE1BQU0sa0JBQWtCO0FBRTFDLE1BQU1DLFlBQVksQ0FBQztFQUNqQjtBQUNGO0VBQ0VDLFdBQVdBLENBQUVDLE1BQU0sRUFBRztJQUVwQjtJQUNBLElBQUksQ0FBQ0MsZUFBZSxHQUFHLElBQUlWLGNBQWMsQ0FBRUssZ0JBQWdCLENBQUNNLGFBQWEsQ0FBQ0MsZUFBZSxDQUFDLENBQUMsRUFBRTtNQUMzRkgsTUFBTSxFQUFFQSxNQUFNLENBQUNJLFlBQVksQ0FBRSxpQkFBa0IsQ0FBQztNQUNoREMsS0FBSyxFQUFFLEdBQUc7TUFDVkMsS0FBSyxFQUFFVixnQkFBZ0IsQ0FBQ00sYUFBYTtNQUNyQ0ssbUJBQW1CLEVBQUU7SUFDdkIsQ0FBRSxDQUFDOztJQUVIO0lBQ0EsSUFBSSxDQUFDQyxrQkFBa0IsR0FBRyxJQUFJakIsY0FBYyxDQUFF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