// Copyright 2018-2022, University of Colorado Boulder

/**
 * A challenge, in the form of an equation involving 1 variable.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Fraction from '../../../../phetcommon/js/model/Fraction.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import equalityExplorer from '../../equalityExplorer.js';
export default class Challenge {
  /**
   * Form: ax + b = mx + n
   * These letters correspond to the design specification, see
   * https://docs.google.com/document/d/1vG5U9HhcqVGMvmGGXry28PLqlNWj25lStDP2vSWgUOo
   *
   * @param x - value of the variable x
   * @param a - coefficient on the left side of the equation
   * @param b - constant on the left side of the equation
   * @param m - coefficient on the right side of the equation
   * @param n - constant on the right side of the equation
   * @param debugDerivation - derivation details provided by ChallengeGenerator, contains RichText markup.
   *    With the 'showAnswers' query parameter, this information is displayed in the sim.
   *    This information is provided by ChallengeGenerator subclasses, contains RichText markup,
   *    and corresponds to the challenge specification in the design document, see
   *    https://docs.google.com/document/d/1vG5U9HhcqVGMvmGGXry28PLqlNWj25lStDP2vSWgUOo
   *    DO NOT RELY ON THE FORMAT OF THIS FIELD!
   */
  constructor(x, a, b, m, n, debugDerivation) {
    this.x = x;
    this.a = a;
    this.b = b;
    this.m = m;
    this.n = n;
    this.debugDerivation = debugDerivation;
    assert && assert(Number.isInteger(x), `invalid x: ${x}`);
    assert && assert(a.timesInteger(x).plus(b).reduce().equals(m.timesInteger(x).plus(n).reduce()), `challenge must be an equality: ${this}`);
  }

  // For debugging. Do not rely on this format!
  toString() {
    return StringUtils.fillIn('{{a}} x + {{b}} = {{m}} x + {{n}} (x={{x}})', {
      a: fractionToString(this.a),
      b: fractionToString(this.b),
      m: fractionToString(this.m),
      n: fractionToString(this.n),
      x: this.x
    });
  }

  /**
   * PhET-iO serialization
   */
  toStateObject() {
    return {
      x: this.x,
      a: Fraction.FractionIO.toStateObject(this.a),
      b: Fraction.FractionIO.toStateObject(this.b),
      m: Fraction.FractionIO.toStateObject(this.m),
      n: Fraction.FractionIO.toStateObject(this.n),
      debugDerivation: this.debugDerivation //TODO https://github.com/phetsims/equality-explorer/issues/191 document in client guide?
    };
  }

  /**
   * PhET-iO deserialization
   */
  static fromStateObject(stateObject) {
    return new Challenge(stateObject.x, Fraction.FractionIO.fromStateObject(stateObject.a), Fraction.FractionIO.fromStateObject(stateObject.b), Fraction.FractionIO.fromStateObject(stateObject.m), Fraction.FractionIO.fromStateObject(stateObject.n), stateObject.debugDerivation);
  }
  static ChallengeIO = new IOType('ChallengeIO', {
    valueType: Challenge,
    stateSchema: {
      x: NumberIO,
      a: Fraction.FractionIO,
      b: Fraction.FractionIO,
      m: Fraction.FractionIO,
      n: Fraction.FractionIO,
      debugDerivation: StringIO
    },
    toStateObject: challenge => challenge.toStateObject(),
    fromStateObject: stateObject => Challenge.fromStateObject(stateObject)
  });
}

/**
 * Converts a Fraction to a string representation. This is done here because Fraction.toString is in common code,
 * and doesn't provide the format that we want for our debugging output.
 */
function fractionToString(f) {
  return f.isInteger() ? `${f.getValue()}` : `${f.numerator}/${f.denominator}`;
}
equalityExplorer.register('Challenge', Challenge);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJGcmFjdGlvbiIsIlN0cmluZ1V0aWxzIiwiSU9UeXBlIiwiTnVtYmVySU8iLCJTdHJpbmdJTyIsImVxdWFsaXR5RXhwbG9yZXIiLCJDaGFsbGVuZ2UiLCJjb25zdHJ1Y3RvciIsIngiLCJhIiwiYiIsIm0iLCJuIiwiZGVidWdEZXJpdmF0aW9uIiwiYXNzZXJ0IiwiTnVtYmVyIiwiaXNJbnRlZ2VyIiwidGltZXNJbnRlZ2VyIiwicGx1cyIsInJlZHVjZSIsImVxdWFscyIsInRvU3RyaW5nIiwiZmlsbEluIiwiZnJhY3Rpb25Ub1N0cmluZyIsInRvU3RhdGVPYmplY3QiLCJGcmFjdGlvbklPIiwiZnJvbVN0YXRlT2JqZWN0Iiwic3RhdGVPYmplY3QiLCJDaGFsbGVuZ2VJTyIsInZhbHVlVHlwZSIsInN0YXRlU2NoZW1hIiwiY2hhbGxlbmdlIiwiZiIsImdldFZhbHVlIiwibnVtZXJhdG9yIiwiZGVub21pbmF0b3IiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkNoYWxsZW5nZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBBIGNoYWxsZW5nZSwgaW4gdGhlIGZvcm0gb2YgYW4gZXF1YXRpb24gaW52b2x2aW5nIDEgdmFyaWFibGUuXHJcbiAqXHJcbiAqIEBhdXRob3IgQ2hyaXMgTWFsbGV5IChQaXhlbFpvb20sIEluYy4pXHJcbiAqL1xyXG5cclxuaW1wb3J0IEZyYWN0aW9uLCB7IEZyYWN0aW9uU3RhdGVPYmplY3QgfSBmcm9tICcuLi8uLi8uLi8uLi9waGV0Y29tbW9uL2pzL21vZGVsL0ZyYWN0aW9uLmpzJztcclxuaW1wb3J0IFN0cmluZ1V0aWxzIGZyb20gJy4uLy4uLy4uLy4uL3BoZXRjb21tb24vanMvdXRpbC9TdHJpbmdVdGlscy5qcyc7XHJcbmltcG9ydCBJT1R5cGUgZnJvbSAnLi4vLi4vLi4vLi4vdGFuZGVtL2pzL3R5cGVzL0lPVHlwZS5qcyc7XHJcbmltcG9ydCBOdW1iZXJJTyBmcm9tICcuLi8uLi8uLi8uLi90YW5kZW0vanMvdHlwZXMvTnVtYmVySU8uanMnO1xyXG5pbXBvcnQgU3RyaW5nSU8gZnJvbSAnLi4vLi4vLi4vLi4vdGFuZGVtL2pzL3R5cGVzL1N0cmluZ0lPLmpzJztcclxuaW1wb3J0IGVxdWFsaXR5RXhwbG9yZXIgZnJvbSAnLi4vLi4vZXF1YWxpdHlFeHBsb3Jlci5qcyc7XHJcblxyXG5leHBvcnQgdHlwZSBDaGFsbGVuZ2VTdGF0ZU9iamVjdCA9IHtcclxuICB4OiBudW1iZXI7XHJcbiAgYTogRnJhY3Rpb25TdGF0ZU9iamVjdDtcclxuICBiOiBGcmFjdGlvblN0YXRlT2JqZWN0O1xyXG4gIG06IEZyYWN0aW9uU3RhdGVPYmplY3Q7XHJcbiAgbjogRnJhY3Rpb25TdGF0ZU9iamVjdDtcclxuICBkZWJ1Z0Rlcml2YXRpb246IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYWxsZW5nZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvcm06IGF4ICsgYiA9IG14ICsgblxyXG4gICAqIFRoZXNlIGxldHRlcnMgY29ycmVzcG9uZCB0byB0aGUgZGVzaWduIHNwZWNpZmljYXRpb24sIHNlZVxyXG4gICAqIGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2RvY3VtZW50L2QvMXZHNVU5SGhjcVZHTXZtR0dYcnkyOFBMcWxOV2oyNWxTdERQMnZTV2dVT29cclxuICAgKlxyXG4gICAqIEBwYXJhbSB4IC0gdmFsdWUgb2YgdGhlIHZhcmlhYmxlIHhcclxuICAgKiBAcGFyYW0gYSAtIGNvZWZmaWNpZW50IG9uIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIGVxdWF0aW9uXHJcbiAgICogQHBhcmFtIGIgLSBjb25zdGFudCBvbiB0aGUgbGVmdCBzaWRlIG9mIHRoZSBlcXVhdGlvblxyXG4gICAqIEBwYXJhbSBtIC0gY29lZmZpY2llbnQgb24gdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIGVxdWF0aW9uXHJcbiAgICogQHBhcmFtIG4gLSBjb25zdGFudCBvbiB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgZXF1YXRpb25cclxuICAgKiBAcGFyYW0gZGVidWdEZXJpdmF0aW9uIC0gZGVyaXZhdGlvbiBkZXRhaWxzIHByb3ZpZGVkIGJ5IENoYWxsZW5nZUdlbmVyYXRvciwgY29udGFpbnMgUmljaFRleHQgbWFya3VwLlxyXG4gICAqICAgIFdpdGggdGhlICdzaG93QW5zd2VycycgcXVlcnkgcGFyYW1ldGVyLCB0aGlzIGluZm9ybWF0aW9uIGlzIGRpc3BsYXllZCBpbiB0aGUgc2ltLlxyXG4gICAqICAgIFRoaXMgaW5mb3JtYXRpb24gaXMgcHJvdmlkZWQgYnkgQ2hhbGxlbmdlR2VuZXJhdG9yIHN1YmNsYXNzZXMsIGNvbnRhaW5zIFJpY2hUZXh0IG1hcmt1cCxcclxuICAgKiAgICBhbmQgY29ycmVzcG9uZHMgdG8gdGhlIGNoYWxsZW5nZSBzcGVjaWZpY2F0aW9uIGluIHRoZSBkZXNpZ24gZG9jdW1lbnQsIHNlZVxyXG4gICAqICAgIGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2RvY3VtZW50L2QvMXZHNVU5SGhjcVZHTXZtR0dYcnkyOFBMcWxOV2oyNWxTdERQMnZTV2dVT29cclxuICAgKiAgICBETyBOT1QgUkVMWSBPTiBUSEUgRk9STUFUIE9GIFRISVMgRklFTEQhXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBwdWJsaWMgcmVhZG9ubHkgeDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGE6IEZyYWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGI6IEZyYWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IG06IEZyYWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IG46IEZyYWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGRlYnVnRGVyaXZhdGlvbjogc3RyaW5nICkge1xyXG5cclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIE51bWJlci5pc0ludGVnZXIoIHggKSwgYGludmFsaWQgeDogJHt4fWAgKTtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIGEudGltZXNJbnRlZ2VyKCB4ICkucGx1cyggYiApLnJlZHVjZSgpLmVxdWFscyggbS50aW1lc0ludGVnZXIoIHggKS5wbHVzKCBuICkucmVkdWNlKCkgKSxcclxuICAgICAgYGNoYWxsZW5nZSBtdXN0IGJlIGFuIGVxdWFsaXR5OiAke3RoaXN9YCApO1xyXG4gIH1cclxuXHJcbiAgLy8gRm9yIGRlYnVnZ2luZy4gRG8gbm90IHJlbHkgb24gdGhpcyBmb3JtYXQhXHJcbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gU3RyaW5nVXRpbHMuZmlsbEluKCAne3thfX0geCArIHt7Yn19ID0ge3ttfX0geCArIHt7bn19ICh4PXt7eH19KScsIHtcclxuICAgICAgYTogZnJhY3Rpb25Ub1N0cmluZyggdGhpcy5hICksXHJcbiAgICAgIGI6IGZyYWN0aW9uVG9TdHJpbmcoIHRoaXMuYiApLFxyXG4gICAgICBtOiBmcmFjdGlvblRvU3RyaW5nKCB0aGlzLm0gKSxcclxuICAgICAgbjogZnJhY3Rpb25Ub1N0cmluZyggdGhpcy5uICksXHJcbiAgICAgIHg6IHRoaXMueFxyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGhFVC1pTyBzZXJpYWxpemF0aW9uXHJcbiAgICovXHJcbiAgcHVibGljIHRvU3RhdGVPYmplY3QoKTogQ2hhbGxlbmdlU3RhdGVPYmplY3Qge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogdGhpcy54LFxyXG4gICAgICBhOiBGcmFjdGlvbi5GcmFjdGlvbklPLnRvU3RhdGVPYmplY3QoIHRoaXMuYSApLFxyXG4gICAgICBiOiBGcmFjdGlvbi5GcmFjdGlvbklPLnRvU3RhdGVPYmplY3QoIHRoaXMuYiApLFxyXG4gICAgICBtOiBGcmFjdGlvbi5GcmFjdGlvbklPLnRvU3RhdGVPYmplY3QoIHRoaXMubSApLFxyXG4gICAgICBuOiBGcmFjdGlvbi5GcmFjdGlvbklPLnRvU3RhdGVPYmplY3QoIHRoaXMubiApLFxyXG4gICAgICBkZWJ1Z0Rlcml2YXRpb246IHRoaXMuZGVidWdEZXJpdmF0aW9uIC8vVE9ETyBodHRwczovL2dpdGh1Yi5jb20vcGhldHNpbXMvZXF1YWxpdHktZXhwbG9yZXIvaXNzdWVzLzE5MSBkb2N1bWVudCBpbiBjbGllbnQgZ3VpZGU/XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGhFVC1pTyBkZXNlcmlhbGl6YXRpb25cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGZyb21TdGF0ZU9iamVjdCggc3RhdGVPYmplY3Q6IENoYWxsZW5nZVN0YXRlT2JqZWN0ICk6IENoYWxsZW5nZSB7XHJcbiAgICByZXR1cm4gbmV3IENoYWxsZW5nZShcclxuICAgICAgc3RhdGVPYmplY3QueCxcclxuICAgICAgRnJhY3Rpb24uRnJhY3Rpb25JTy5mcm9tU3RhdGVPYmplY3QoIHN0YXRlT2JqZWN0LmEgKSxcclxuICAgICAgRnJhY3Rpb24uRnJhY3Rpb25JTy5mcm9tU3RhdGVPYmplY3QoIHN0YXRlT2JqZWN0LmIgKSxcclxuICAgICAgRnJhY3Rpb24uRnJhY3Rpb25JTy5mcm9tU3RhdGVPYmplY3QoIHN0YXRlT2JqZWN0Lm0gKSxcclxuICAgICAgRnJhY3Rpb24uRnJhY3Rpb25JTy5mcm9tU3RhdGVPYmplY3QoIHN0YXRlT2JqZWN0Lm4gKSxcclxuICAgICAgc3RhdGVPYmplY3QuZGVidWdEZXJpdmF0aW9uXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBDaGFsbGVuZ2VJTyA9IG5ldyBJT1R5cGU8Q2hhbGxlbmdlLCBDaGFsbGVuZ2VTdGF0ZU9iamVjdD4oICdDaGFsbGVuZ2VJTycsIHtcclxuICAgIHZhbHVlVHlwZTogQ2hhbGxlbmdlLFxyXG4gICAgc3RhdGVTY2hlbWE6IHtcclxuICAgICAgeDogTnVtYmVySU8sXHJcbiAgICAgIGE6IEZyYWN0aW9uLkZyYWN0aW9uSU8sXHJcbiAgICAgIGI6IEZyYWN0aW9uLkZyYWN0aW9uSU8sXHJcbiAgICAgIG06IEZyYWN0aW9uLkZyYWN0aW9uSU8sXHJcbiAgICAgIG46IEZyYWN0aW9uLkZyYWN0aW9uSU8sXHJcbiAgICAgIGRlYnVnRGVyaXZhdGlvbjogU3RyaW5nSU9cclxuICAgIH0sXHJcbiAgICB0b1N0YXRlT2JqZWN0OiAoIGNoYWxsZW5nZTogQ2hhbGxlbmdlICkgPT4gY2hhbGxlbmdlLnRvU3RhdGVPYmplY3QoKSxcclxuICAgIGZyb21TdGF0ZU9iamVjdDogKCBzdGF0ZU9iamVjdDogQ2hhbGxlbmdlU3RhdGVPYmplY3QgKSA9PiBDaGFsbGVuZ2UuZnJvbVN0YXRlT2JqZWN0KCBzdGF0ZU9iamVjdCApXHJcbiAgfSApO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYSBGcmFjdGlvbiB0byBhIHN0cmluZyByZXByZXNlbnRhdGlvbi4gVGhpcyBpcyBkb25lIGhlcmUgYmVjYXVzZSBGcmFjdGlvbi50b1N0cmluZyBpcyBpbiBjb21tb24gY29kZSxcclxuICogYW5kIGRvZXNuJ3QgcHJvdmlkZSB0aGUgZm9ybWF0IHRoYXQgd2Ugd2FudCBmb3Igb3VyIGRlYnVnZ2luZyBvdXRwdXQuXHJcbiAqL1xyXG5mdW5jdGlvbiBmcmFjdGlvblRvU3RyaW5nKCBmOiBGcmFjdGlvbiApOiBzdHJpbmcge1xyXG4gIHJldHVybiAoIGYuaXNJbnRlZ2VyKCkgPyBgJHtmLmdldFZhbHVlKCl9YCA6IGAke2YubnVtZXJhdG9yfS8ke2YuZGVub21pbmF0b3J9YCApO1xyXG59XHJcblxyXG5lcXVhbGl0eUV4cGxvcmVyLnJlZ2lzdGVyKCAnQ2hhbGxlbmdlJywgQ2hhbGxlbmdlICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9B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