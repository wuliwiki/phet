// Copyright 2022, University of Colorado Boulder

/**
 * Solves the associated Legendre polynomial.  This is needed to compute the wave function for the Schrodinger
 * model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PolynomialTerm from './PolynomialTerm.js';

/**
 * This solution uses Wolfram's definition of the associated Legendre polynomial. See
 * https://mathworld.wolfram.com/AssociatedLegendrePolynomial.html
 * http://mathworld.wolfram.com/LegendrePolynomial.html
 *
 * When l > 6, this implementation starts to differ from Wolfram and "Numerical Recipes in C".
 * To compare with Mathematica online, use: x^2*(3)*( LegendreP[7,3,-0.99])
 * as the input to the Integral Calculator at http://integrals.wolfram.com/index.jsp
 *
 * For details on why this doesn't work for l > 6, see Section 6.8 of "Numerical Recipes in C, Second Edition" (1992)
 * at http://www.nrbook.com/a/bookcpdf/c6-8.pdf
 *
 * @param l - electron's secondary state
 * @param m - electron's tertiary state
 * @param x - coordinate on horizontal (x) axis
 */
function solveAssociatedLegendrePolynomial(l, m, x) {
  // For large l, the brute-force solution below encounters instabilities.
  assert && assert(Number.isInteger(l) && l >= 0 && l <= 6, `invalid l: ${l}`);
  assert && assert(Number.isInteger(m) && m >= 0 && m <= l, `invalid m: ${m}`);
  assert && assert(Math.abs(x) <= 1, `invalid x: ${x}`);
  let productTerms = [new PolynomialTerm(1, 0)]; // 1x^0

  for (let i = 0; i < l; i++) {
    // x^2-1 times each term on left side TODO what does this mean?
    const terms = [];
    for (let k = 0; k < productTerms.length; k++) {
      const term = productTerms[k];
      terms.push(new PolynomialTerm(term.coefficient, term.power + 2));
      terms.push(new PolynomialTerm(-1 * term.coefficient, term.power));
    }
    productTerms = terms;
  }
  for (let i = 0; i < productTerms.length; i++) {
    productTerms[i] = productTerms[i].derive(l + m);
  }

  // Wolfram says there is a sign convention difference here. TODO clarify this?
  return Math.pow(-1, m) / (Math.pow(2, l) * factorial(l)) * Math.pow(1 - x * x, m / 2) * evaluate(productTerms, x);
}
function evaluate(productTerms, x) {
  let sum = 0;
  for (let i = 0; i < productTerms.length; i++) {
    sum += productTerms[i].evaluate(x);
  }
  return sum;
}

/**
 * Computes the factorial of an integer n without using recursion.
 * n! = 1 * 2 * ... * ( n - 1 ) * n
 */
function factorial(n) {
  assert && assert(Number.isInteger(n));
  let f = 1;
  let i = 2;
  while (i <= n) {
    f *= i;
    i++;
  }
  return f;
}
export default solveAssociatedLegendrePolynomial;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQb2x5bm9taWFsVGVybSIsInNvbHZlQXNzb2NpYXRlZExlZ2VuZHJlUG9seW5vbWlhbCIsImwiLCJtIiwieCIsImFzc2VydCIsIk51bWJlciIsImlzSW50ZWdlciIsIk1hdGgiLCJhYnMiLCJwcm9kdWN0VGVybXMiLCJpIiwidGVybXMiLCJrIiwibGVuZ3RoIiwidGVybSIsInB1c2giLCJjb2VmZmljaWVudCIsInBvd2VyIiwiZGVyaXZlIiwicG93IiwiZmFjdG9yaWFsIiwiZXZhbHVhdGUiLCJzdW0iLCJuIiwiZiJdLCJzb3VyY2VzIjpbInNvbHZlQXNzb2NpYXRlZExlZ2VuZHJlUG9seW5vbWlhbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogU29sdmVzIHRoZSBhc3NvY2lhdGVkIExlZ2VuZHJlIHBvbHlub21pYWwuICBUaGlzIGlzIG5lZWRlZCB0byBjb21wdXRlIHRoZSB3YXZlIGZ1bmN0aW9uIGZvciB0aGUgU2Nocm9kaW5nZXJcclxuICogbW9kZWwgb2YgdGhlIGh5ZHJvZ2VuIGF0b20uXHJcbiAqXHJcbiAqIEBhdXRob3IgQ2hyaXMgTWFsbGV5IChQaXhlbFpvb20sIEluYy4pXHJcbiAqL1xyXG5cclxuaW1wb3J0IFBvbHlub21pYWxUZXJtIGZyb20gJy4vUG9seW5vbWlhbFRlcm0uanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgc29sdXRpb24gdXNlcyBXb2xmcmFtJ3MgZGVmaW5pdGlvbiBvZiB0aGUgYXNzb2NpYXRlZCBMZWdlbmRyZSBwb2x5bm9taWFsLiBTZWVcclxuICogaHR0cHM6Ly9tYXRod29ybGQud29sZnJhbS5jb20vQXNzb2NpYXRlZExlZ2VuZHJlUG9seW5vbWlhbC5odG1sXHJcbiAqIGh0dHA6Ly9tYXRod29ybGQud29sZnJhbS5jb20vTGVnZW5kcmVQb2x5bm9taWFsLmh0bWxcclxuICpcclxuICogV2hlbiBsID4gNiwgdGhpcyBpbXBsZW1lbnRhdGlvbiBzdGFydHMgdG8gZGlmZmVyIGZyb20gV29sZnJhbSBhbmQgXCJOdW1lcmljYWwgUmVjaXBlcyBpbiBDXCIuXHJcbiAqIFRvIGNvbXBhcmUgd2l0aCBNYXRoZW1hdGljYSBvbmxpbmUsIHVzZTogeF4yKigzKSooIExlZ2VuZHJlUFs3LDMsLTAuOTldKVxyXG4gKiBhcyB0aGUgaW5wdXQgdG8gdGhlIEludGVncmFsIENhbGN1bGF0b3IgYXQgaHR0cDovL2ludGVncmFscy53b2xmcmFtLmNvbS9pbmRleC5qc3BcclxuICpcclxuICogRm9yIGRldGFpbHMgb24gd2h5IHRoaXMgZG9lc24ndCB3b3JrIGZvciBsID4gNiwgc2VlIFNlY3Rpb24gNi44IG9mIFwiTnVtZXJpY2FsIFJlY2lwZXMgaW4gQywgU2Vjb25kIEVkaXRpb25cIiAoMTk5MilcclxuICogYXQgaHR0cDovL3d3dy5ucmJvb2suY29tL2EvYm9va2NwZGYvYzYtOC5wZGZcclxuICpcclxuICogQHBhcmFtIGwgLSBlbGVjdHJvbidzIHNlY29uZGFyeSBzdGF0ZVxyXG4gKiBAcGFyYW0gbSAtIGVsZWN0cm9uJ3MgdGVydGlhcnkgc3RhdGVcclxuICogQHBhcmFtIHggLSBjb29yZGluYXRlIG9uIGhvcml6b250YWwgKHgpIGF4aXNcclxuICovXHJcbmZ1bmN0aW9uIHNvbHZlQXNzb2NpYXRlZExlZ2VuZHJlUG9seW5vbWlhbCggbDogbnVtYmVyLCBtOiBudW1iZXIsIHg6IG51bWJlciApOiBudW1iZXIge1xyXG5cclxuICAvLyBGb3IgbGFyZ2UgbCwgdGhlIGJydXRlLWZvcmNlIHNvbHV0aW9uIGJlbG93IGVuY291bnRlcnMgaW5zdGFiaWxpdGllcy5cclxuICBhc3NlcnQgJiYgYXNzZXJ0KCBOdW1iZXIuaXNJbnRlZ2VyKCBsICkgJiYgbCA+PSAwICYmIGwgPD0gNiwgYGludmFsaWQgbDogJHtsfWAgKTtcclxuICBhc3NlcnQgJiYgYXNzZXJ0KCBOdW1iZXIuaXNJbnRlZ2VyKCBtICkgJiYgbSA+PSAwICYmIG0gPD0gbCwgYGludmFsaWQgbTogJHttfWAgKTtcclxuICBhc3NlcnQgJiYgYXNzZXJ0KCBNYXRoLmFicyggeCApIDw9IDEsIGBpbnZhbGlkIHg6ICR7eH1gICk7XHJcblxyXG4gIGxldCBwcm9kdWN0VGVybXMgPSBbIG5ldyBQb2x5bm9taWFsVGVybSggMSwgMCApIF07IC8vIDF4XjBcclxuXHJcbiAgZm9yICggbGV0IGkgPSAwOyBpIDwgbDsgaSsrICkge1xyXG5cclxuICAgIC8vIHheMi0xIHRpbWVzIGVhY2ggdGVybSBvbiBsZWZ0IHNpZGUgVE9ETyB3aGF0IGRvZXMgdGhpcyBtZWFuP1xyXG4gICAgY29uc3QgdGVybXM6IFBvbHlub21pYWxUZXJtW10gPSBbXTtcclxuICAgIGZvciAoIGxldCBrID0gMDsgayA8IHByb2R1Y3RUZXJtcy5sZW5ndGg7IGsrKyApIHtcclxuICAgICAgY29uc3QgdGVybSA9IHByb2R1Y3RUZXJtc1sgayBdO1xyXG4gICAgICB0ZXJtcy5wdXNoKCBuZXcgUG9seW5vbWlhbFRlcm0oIHRlcm0uY29lZmZpY2llbnQsIHRlcm0ucG93ZXIgKyAyICkgKTtcclxuICAgICAgdGVybXMucHVzaCggbmV3IFBvbHlub21pYWxUZXJtKCAtMSAqIHRlcm0uY29lZmZpY2llbnQsIHRlcm0ucG93ZXIgKSApO1xyXG4gICAgfVxyXG4gICAgcHJvZHVjdFRlcm1zID0gdGVybXM7XHJcbiAgfVxyXG5cclxuICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBwcm9kdWN0VGVybXMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICBwcm9kdWN0VGVybXNbIGkgXSA9IHByb2R1Y3RUZXJtc1sgaSBdLmRlcml2ZSggbCArIG0gKTtcclxuICB9XHJcblxyXG4gIC8vIFdvbGZyYW0gc2F5cyB0aGVyZSBpcyBhIHNpZ24gY29udmVudGlvbiBkaWZmZXJlbmNlIGhlcmUuIFRPRE8gY2xhcmlmeSB0aGlzP1xyXG4gIHJldHVybiAoIE1hdGgucG93KCAtMSwgbSApIC8gKCBNYXRoLnBvdyggMiwgbCApICogZmFjdG9yaWFsKCBsICkgKSApXHJcbiAgICAgICAgICogTWF0aC5wb3coIDEgLSB4ICogeCwgbSAvIDIgKSAqIGV2YWx1YXRlKCBwcm9kdWN0VGVybXMsIHggKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZXZhbHVhdGUoIHByb2R1Y3RUZXJtczogUG9seW5vbWlhbFRlcm1bXSwgeDogbnVtYmVyICk6IG51bWJlciB7XHJcbiAgbGV0IHN1bSA9IDA7XHJcbiAgZm9yICggbGV0IGkgPSAwOyBpIDwgcHJvZHVjdFRlcm1zLmxlbmd0aDsgaSsrICkge1xyXG4gICAgc3VtICs9IHByb2R1Y3RUZXJtc1sgaSBdLmV2YWx1YXRlKCB4ICk7XHJcbiAgfVxyXG4gIHJldHVybiBzdW07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlcyB0aGUgZmFjdG9yaWFsIG9mIGFuIGludGVnZXIgbiB3aXRob3V0IHVzaW5nIHJlY3Vyc2lvbi5cclxuICogbiEgPSAxICogMiAqIC4uLiAqICggbiAtIDEgKSAqIG5cclxuICovXHJcbmZ1bmN0aW9uIGZhY3RvcmlhbCggbjogbnVtYmVyICk6IG51bWJlciB7XHJcbiAgYXNzZXJ0ICYmIGFzc2VydCggTnVtYmVyLmlzSW50ZWdlciggbiApICk7XHJcbiAgbGV0IGYgPSAxO1xyXG4gIGxldCBpID0gMjtcclxuICB3aGlsZSAoIGkgPD0gbiApIHtcclxuICAgIGYgKj0gaTtcclxuICAgIGkrKztcclxuICB9XHJcbiAgcmV0dXJuIGY7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNvbHZlQXNzb2NpYXRlZExlZ2VuZHJlUG9seW5vbWlhbDsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxjQUFjLE1BQU0scUJBQXFCOztBQUVoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNDLGlDQUFpQ0EsQ0FBRUMsQ0FB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