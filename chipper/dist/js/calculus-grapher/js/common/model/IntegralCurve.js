// Copyright 2020-2023, University of Colorado Boulder

/**
 * IntegralCurve is a Curve subclass for the curve that represents the integral of originalCurve.
 * IntegralCurve's main responsibility is to observe when the Curve changes and integrate it and update the
 * Points of the Integral. For a general background on integration, see https://en.wikipedia.org/wiki/Integral. Our
 * version uses a trapezoidal Riemann sum to approximate integrals. See https://en.wikipedia.org/wiki/Trapezoidal_rule
 * for background. Since the originalCurve exists at all Points, the Integral is also finite at all points.
 *
 * Like Curve, IntegralCurve is created at the start and persists for the lifetime of the simulation. Links are left
 * as-is and IntegralCurves are never disposed.
 *
 * @author Brandon Li
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import Curve from './Curve.js';
export default class IntegralCurve extends Curve {
  // Reference to the originalCurve that was passed-in.

  /**
   * @param originalCurve - the curve to integrate to get the values of this IntegralCurve.
   * @param tandem
   */
  constructor(originalCurve, tandem) {
    super({
      // CurveOptions
      xRange: originalCurve.xRange,
      numberOfPoints: originalCurve.numberOfPoints,
      tandem: tandem
    });
    this.originalCurve = originalCurve;

    // Observes when the originalCurve changes and update this curve to represent the integral of the originalCurve.
    // Listener is never removed since IntegralCurves are never disposed.
    originalCurve.curveChangedEmitter.addListener(this.updateIntegral.bind(this));

    // Makes the initial call to update the integral to match the originalCurve upon initialization.
    this.updateIntegral();
  }

  /**
   * Updates the y-values of the IntegralCurve to represent the integral of the originalCurve.
   *
   * The integral is approximated by performing a Riemann Sum.  A left Riemann Sum is used
   * to determine the area from a series of rectangles to approximate the area under a curve. The left Riemann Sum
   * uses the left side of the function for the height of the rectangle summing up all
   * trapezoidal areas. See https://en.wikipedia.org/wiki/Riemann_sum for more details.
   */
  updateIntegral() {
    // Loop through each adjacent pair of points on the original curve.
    for (let index = 1; index < this.originalCurve.points.length; index++) {
      const point = this.originalCurve.points[index];
      const previousPoint = this.originalCurve.points[index - 1];
      assert && assert(point.isFinite && previousPoint.isFinite);

      // Takes the integral from the minimum of curve the x-domain to the x-value of the current point using a
      // trapezoidal Riemann sum approximation. See https://en.wikipedia.org/wiki/Trapezoidal_rule for background.
      const trapezoidalArea = 0.5 * (point.y + previousPoint.y) * (point.x - previousPoint.x);

      // Sanity check that verifies that the area is well-defined at the current Point.
      assert && assert(Number.isFinite(trapezoidalArea) && point.isFinite, 'non-finite trapezoidal area');

      // Let's add the trapezoidalArea to the previous y-value to get the y-value of the current Point.
      this.points[index].y = this.points[index - 1].y + trapezoidalArea;

      // An integral smooths out a point discontinuity into a cusp and a cusp into a smooth.
      this.points[index].pointType = point.isDiscontinuous ? 'cusp' : 'smooth';
    }

    // Signals once that this Curve has changed.
    this.curveChangedEmitter.emit();
  }
}
calculusGrapher.register('IntegralCurve', IntegralCurve);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjYWxjdWx1c0dyYXBoZXIiLCJDdXJ2ZSIsIkludGVncmFsQ3VydmUiLCJjb25zdHJ1Y3RvciIsIm9yaWdpbmFsQ3VydmUiLCJ0YW5kZW0iLCJ4UmFuZ2UiLCJudW1iZXJPZlBvaW50cyIsImN1cnZlQ2hhbmdlZEVtaXR0ZXIiLCJhZGRMaXN0ZW5lciIsInVwZGF0ZUludGVncmFsIiwiYmluZCIsImluZGV4IiwicG9pbnRzIiwibGVuZ3RoIiwicG9pbnQiLCJwcmV2aW91c1BvaW50IiwiYXNzZXJ0IiwiaXNGaW5pdGUiLCJ0cmFwZXpvaWRhbEFyZWEiLCJ5IiwieCIsIk51bWJlciIsInBvaW50VHlwZSIsImlzRGlzY29udGludW91cyIsImVtaXQiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkludGVncmFsQ3VydmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogSW50ZWdyYWxDdXJ2ZSBpcyBhIEN1cnZlIHN1YmNsYXNzIGZvciB0aGUgY3VydmUgdGhhdCByZXByZXNlbnRzIHRoZSBpbnRlZ3JhbCBvZiBvcmlnaW5hbEN1cnZlLlxyXG4gKiBJbnRlZ3JhbEN1cnZlJ3MgbWFpbiByZXNwb25zaWJpbGl0eSBpcyB0byBvYnNlcnZlIHdoZW4gdGhlIEN1cnZlIGNoYW5nZXMgYW5kIGludGVncmF0ZSBpdCBhbmQgdXBkYXRlIHRoZVxyXG4gKiBQb2ludHMgb2YgdGhlIEludGVncmFsLiBGb3IgYSBnZW5lcmFsIGJhY2tncm91bmQgb24gaW50ZWdyYXRpb24sIHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JbnRlZ3JhbC4gT3VyXHJcbiAqIHZlcnNpb24gdXNlcyBhIHRyYXBlem9pZGFsIFJpZW1hbm4gc3VtIHRvIGFwcHJveGltYXRlIGludGVncmFscy4gU2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1RyYXBlem9pZGFsX3J1bGVcclxuICogZm9yIGJhY2tncm91bmQuIFNpbmNlIHRoZSBvcmlnaW5hbEN1cnZlIGV4aXN0cyBhdCBhbGwgUG9pbnRzLCB0aGUgSW50ZWdyYWwgaXMgYWxzbyBmaW5pdGUgYXQgYWxsIHBvaW50cy5cclxuICpcclxuICogTGlrZSBDdXJ2ZSwgSW50ZWdyYWxDdXJ2ZSBpcyBjcmVhdGVkIGF0IHRoZSBzdGFydCBhbmQgcGVyc2lzdHMgZm9yIHRoZSBsaWZldGltZSBvZiB0aGUgc2ltdWxhdGlvbi4gTGlua3MgYXJlIGxlZnRcclxuICogYXMtaXMgYW5kIEludGVncmFsQ3VydmVzIGFyZSBuZXZlciBkaXNwb3NlZC5cclxuICpcclxuICogQGF1dGhvciBCcmFuZG9uIExpXHJcbiAqIEBhdXRob3IgTWFydGluIFZlaWxsZXR0ZVxyXG4gKi9cclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi8uLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuaW1wb3J0IGNhbGN1bHVzR3JhcGhlciBmcm9tICcuLi8uLi9jYWxjdWx1c0dyYXBoZXIuanMnO1xyXG5pbXBvcnQgQ3VydmUgZnJvbSAnLi9DdXJ2ZS5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlZ3JhbEN1cnZlIGV4dGVuZHMgQ3VydmUge1xyXG5cclxuICAvLyBSZWZlcmVuY2UgdG8gdGhlIG9yaWdpbmFsQ3VydmUgdGhhdCB3YXMgcGFzc2VkLWluLlxyXG4gIHByaXZhdGUgcmVhZG9ubHkgb3JpZ2luYWxDdXJ2ZTogQ3VydmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBvcmlnaW5hbEN1cnZlIC0gdGhlIGN1cnZlIHRvIGludGVncmF0ZSB0byBnZXQgdGhlIHZhbHVlcyBvZiB0aGlzIEludGVncmFsQ3VydmUuXHJcbiAgICogQHBhcmFtIHRhbmRlbVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvciggb3JpZ2luYWxDdXJ2ZTogQ3VydmUsIHRhbmRlbTogVGFuZGVtICkge1xyXG5cclxuICAgIHN1cGVyKCB7XHJcblxyXG4gICAgICAvLyBDdXJ2ZU9wdGlvbnNcclxuICAgICAgeFJhbmdlOiBvcmlnaW5hbEN1cnZlLnhSYW5nZSxcclxuICAgICAgbnVtYmVyT2ZQb2ludHM6IG9yaWdpbmFsQ3VydmUubnVtYmVyT2ZQb2ludHMsXHJcbiAgICAgIHRhbmRlbTogdGFuZGVtXHJcbiAgICB9ICk7XHJcblxyXG4gICAgdGhpcy5vcmlnaW5hbEN1cnZlID0gb3JpZ2luYWxDdXJ2ZTtcclxuXHJcbiAgICAvLyBPYnNlcnZlcyB3aGVuIHRoZSBvcmlnaW5hbEN1cnZlIGNoYW5nZXMgYW5kIHVwZGF0ZSB0aGlzIGN1cnZlIHRvIHJlcHJlc2VudCB0aGUgaW50ZWdyYWwgb2YgdGhlIG9yaWdpbmFsQ3VydmUuXHJcbiAgICAvLyBMaXN0ZW5lciBpcyBuZXZlciByZW1vdmVkIHNpbmNlIEludGVncmFsQ3VydmVzIGFyZSBuZXZlciBkaXNwb3NlZC5cclxuICAgIG9yaWdpbmFsQ3VydmUuY3VydmVDaGFuZ2VkRW1pdHRlci5hZGRMaXN0ZW5lciggdGhpcy51cGRhdGVJbnRlZ3JhbC5iaW5kKCB0aGlzICkgKTtcclxuXHJcbiAgICAvLyBNYWtlcyB0aGUgaW5pdGlhbCBjYWxsIHRvIHVwZGF0ZSB0aGUgaW50ZWdyYWwgdG8gbWF0Y2ggdGhlIG9yaWdpbmFsQ3VydmUgdXBvbiBpbml0aWFsaXphdGlvbi5cclxuICAgIHRoaXMudXBkYXRlSW50ZWdyYWwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIHktdmFsdWVzIG9mIHRoZSBJbnRlZ3JhbEN1cnZlIHRvIHJlcHJlc2VudCB0aGUgaW50ZWdyYWwgb2YgdGhlIG9yaWdpbmFsQ3VydmUuXHJcbiAgICpcclxuICAgKiBUaGUgaW50ZWdyYWwgaXMgYXBwcm94aW1hdGVkIGJ5IHBlcmZvcm1pbmcgYSBSaWVtYW5uIFN1bS4gIEEgbGVmdCBSaWVtYW5uIFN1bSBpcyB1c2VkXHJcbiAgICogdG8gZGV0ZXJtaW5lIHRoZSBhcmVhIGZyb20gYSBzZXJpZXMgb2YgcmVjdGFuZ2xlcyB0byBhcHByb3hpbWF0ZSB0aGUgYXJlYSB1bmRlciBhIGN1cnZlLiBUaGUgbGVmdCBSaWVtYW5uIFN1bVxyXG4gICAqIHVzZXMgdGhlIGxlZnQgc2lkZSBvZiB0aGUgZnVuY3Rpb24gZm9yIHRoZSBoZWlnaHQgb2YgdGhlIHJlY3RhbmdsZSBzdW1taW5nIHVwIGFsbFxyXG4gICAqIHRyYXBlem9pZGFsIGFyZWFzLiBTZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUmllbWFubl9zdW0gZm9yIG1vcmUgZGV0YWlscy5cclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZUludGVncmFsKCk6IHZvaWQge1xyXG5cclxuICAgIC8vIExvb3AgdGhyb3VnaCBlYWNoIGFkamFjZW50IHBhaXIgb2YgcG9pbnRzIG9uIHRoZSBvcmlnaW5hbCBjdXJ2ZS5cclxuICAgIGZvciAoIGxldCBpbmRleCA9IDE7IGluZGV4IDwgdGhpcy5vcmlnaW5hbEN1cnZlLnBvaW50cy5sZW5ndGg7IGluZGV4KysgKSB7XHJcbiAgICAgIGNvbnN0IHBvaW50ID0gdGhpcy5vcmlnaW5hbEN1cnZlLnBvaW50c1sgaW5kZXggXTtcclxuICAgICAgY29uc3QgcHJldmlvdXNQb2ludCA9IHRoaXMub3JpZ2luYWxDdXJ2ZS5wb2ludHNbIGluZGV4IC0gMSBdO1xyXG5cclxuICAgICAgYXNzZXJ0ICYmIGFzc2VydCggcG9pbnQuaXNGaW5pdGUgJiYgcHJldmlvdXNQb2ludC5pc0Zpbml0ZSApO1xyXG5cclxuICAgICAgLy8gVGFrZXMgdGhlIGludGVncmFsIGZyb20gdGhlIG1pbmltdW0gb2YgY3VydmUgdGhlIHgtZG9tYWluIHRvIHRoZSB4LXZhbHVlIG9mIHRoZSBjdXJyZW50IHBvaW50IHVzaW5nIGFcclxuICAgICAgLy8gdHJhcGV6b2lkYWwgUmllbWFubiBzdW0gYXBwcm94aW1hdGlvbi4gU2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1RyYXBlem9pZGFsX3J1bGUgZm9yIGJhY2tncm91bmQuXHJcbiAgICAgIGNvbnN0IHRyYXBlem9pZGFsQXJlYSA9IDAuNSAqICggcG9pbnQueSArIHByZXZpb3VzUG9pbnQueSApICogKCBwb2ludC54IC0gcHJldmlvdXNQb2ludC54ICk7XHJcblxyXG4gICAgICAvLyBTYW5pdHkgY2hlY2sgdGhhdCB2ZXJpZmllcyB0aGF0IHRoZSBhcmVhIGlzIHdlbGwtZGVmaW5lZCBhdCB0aGUgY3VycmVudCBQb2ludC5cclxuICAgICAgYXNzZXJ0ICYmIGFzc2VydCggTnVtYmVyLmlzRmluaXRlKCB0cmFwZXpvaWRhbEFyZWEgKSAmJiBwb2ludC5pc0Zpbml0ZSwgJ25vbi1maW5pdGUgdHJhcGV6b2lkYWwgYXJlYScgKTtcclxuXHJcbiAgICAgIC8vIExldCdzIGFkZCB0aGUgdHJhcGV6b2lkYWxBcmVhIHRvIHRoZSBwcmV2aW91cyB5LXZhbHVlIHRvIGdldCB0aGUgeS12YWx1ZSBvZiB0aGUgY3VycmVudCBQb2ludC5cclxuICAgICAgdGhpcy5wb2ludHNbIGluZGV4IF0ueSA9IHRoaXMucG9pbnRzWyBpbmRleCAtIDEgXS55ICsgdHJhcGV6b2lkYWxBcmVhO1xyXG5cclxuICAgICAgLy8gQW4gaW50ZWdyYWwgc21vb3RocyBvdXQgYSBwb2ludCBkaXNjb250aW51aXR5IGludG8gYSBjdXNwIGFuZCBhIGN1c3AgaW50byBhIHNtb290aC5cclxuICAgICAgdGhpcy5wb2ludHNbIGluZGV4IF0ucG9pbnRUeXBlID0gcG9pbnQuaXNEaXNjb250aW51b3VzID8gJ2N1c3AnIDogJ3Ntb290aCc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2lnbmFscyBvbmNlIHRoYXQgdGhpcyBDdXJ2ZSBoYXMgY2hhbmdlZC5cclxuICAgIHRoaXMuY3VydmVDaGFuZ2VkRW1pdHRlci5lbWl0KCk7XHJcbiAgfVxyXG59XHJcblxyXG5jYWxjdWx1c0dyYXBoZXIucmVnaXN0ZXIoICdJbnRlZ3JhbEN1cnZlJywgSW50ZWdyYWxDdXJ2ZSApO1xyXG4iXSwibWFwcGluZ3Mi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