// Copyright 2023, University of Colorado Boulder

/**
 * ReferenceLine is the model element for the reference line. This is vertical line that you can slide horizontally,
 * to place it where it's useful as a reference.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import AncillaryTool from './AncillaryTool.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
export default class ReferenceLine extends AncillaryTool {
  // Color for the scrubber handle

  // Color for the vertical line

  constructor(integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, tandem) {
    super(integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, {
      // A bit right of center, see https://github.com/phetsims/calculus-grapher/issues/248
      x: CalculusGrapherConstants.CURVE_X_RANGE.min + 0.55 * CalculusGrapherConstants.CURVE_X_RANGE.getLength(),
      tandem: tandem
    });
    this.handleColorProperty = CalculusGrapherColors.referenceLineHandleColorProperty;
    this.lineColorProperty = CalculusGrapherColors.referenceLineStrokeProperty;
    this.addLinkedElement(this.handleColorProperty, {
      tandem: tandem.createTandem('handleColorProperty'),
      phetioDocumentation: 'Color of the handle for moving the reference line'
    });
    this.addLinkedElement(this.lineColorProperty, {
      tandem: tandem.createTandem('lineColorProperty'),
      phetioDocumentation: 'Color of the vertical reference line'
    });
  }
}
calculusGrapher.register('ReferenceLine', ReferenceLine);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBbmNpbGxhcnlUb29sIiwiQ2FsY3VsdXNHcmFwaGVyQ29uc3RhbnRzIiwiY2FsY3VsdXNHcmFwaGVyIiwiQ2FsY3VsdXNHcmFwaGVyQ29sb3JzIiwiUmVmZXJlbmNlTGluZSIsImNvbnN0cnVjdG9yIiwiaW50ZWdyYWxDdXJ2ZSIsIm9yaWdpbmFsQ3VydmUiLCJkZXJpdmF0aXZlQ3VydmUiLCJzZWNvbmREZXJpdmF0aXZlQ3VydmUiLCJ0YW5kZW0iLCJ4IiwiQ1VSVkVfWF9SQU5HRSIsIm1pbiIsImdldExlbmd0aCIsImhhbmRsZUNvbG9yUHJvcGVydHkiLCJyZWZlcmVuY2VMaW5lSGFuZGxlQ29sb3JQcm9wZXJ0eSIsImxpbmVDb2xvclByb3BlcnR5IiwicmVmZXJlbmNlTGluZVN0cm9rZVByb3BlcnR5IiwiYWRkTGlua2VkRWxlbWVudCIsImNyZWF0ZVRhbmRlbSIsInBoZXRpb0RvY3VtZW50YXRpb24iLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlJlZmVyZW5jZUxpbmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFJlZmVyZW5jZUxpbmUgaXMgdGhlIG1vZGVsIGVsZW1lbnQgZm9yIHRoZSByZWZlcmVuY2UgbGluZS4gVGhpcyBpcyB2ZXJ0aWNhbCBsaW5lIHRoYXQgeW91IGNhbiBzbGlkZSBob3Jpem9udGFsbHksXHJcbiAqIHRvIHBsYWNlIGl0IHdoZXJlIGl0J3MgdXNlZnVsIGFzIGEgcmVmZXJlbmNlLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKi9cclxuXHJcbmltcG9ydCBBbmNpbGxhcnlUb29sIGZyb20gJy4vQW5jaWxsYXJ5VG9vbC5qcyc7XHJcbmltcG9ydCBDYWxjdWx1c0dyYXBoZXJDb25zdGFudHMgZnJvbSAnLi4vQ2FsY3VsdXNHcmFwaGVyQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IEN1cnZlIGZyb20gJy4vQ3VydmUuanMnO1xyXG5pbXBvcnQgY2FsY3VsdXNHcmFwaGVyIGZyb20gJy4uLy4uL2NhbGN1bHVzR3JhcGhlci5qcyc7XHJcbmltcG9ydCBUYW5kZW0gZnJvbSAnLi4vLi4vLi4vLi4vdGFuZGVtL2pzL1RhbmRlbS5qcyc7XHJcbmltcG9ydCB7IFByb2ZpbGVDb2xvclByb3BlcnR5IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IENhbGN1bHVzR3JhcGhlckNvbG9ycyBmcm9tICcuLi9DYWxjdWx1c0dyYXBoZXJDb2xvcnMuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVmZXJlbmNlTGluZSBleHRlbmRzIEFuY2lsbGFyeVRvb2wge1xyXG5cclxuICAvLyBDb2xvciBmb3IgdGhlIHNjcnViYmVyIGhhbmRsZVxyXG4gIHB1YmxpYyByZWFkb25seSBoYW5kbGVDb2xvclByb3BlcnR5OiBQcm9maWxlQ29sb3JQcm9wZXJ0eTtcclxuXHJcbiAgLy8gQ29sb3IgZm9yIHRoZSB2ZXJ0aWNhbCBsaW5lXHJcbiAgcHVibGljIHJlYWRvbmx5IGxpbmVDb2xvclByb3BlcnR5OiBQcm9maWxlQ29sb3JQcm9wZXJ0eTtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBpbnRlZ3JhbEN1cnZlOiBDdXJ2ZSwgb3JpZ2luYWxDdXJ2ZTogQ3VydmUsIGRlcml2YXRpdmVDdXJ2ZTogQ3VydmUsIHNlY29uZERlcml2YXRpdmVDdXJ2ZTogQ3VydmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0YW5kZW06IFRhbmRlbSApIHtcclxuXHJcbiAgICBzdXBlciggaW50ZWdyYWxDdXJ2ZSwgb3JpZ2luYWxDdXJ2ZSwgZGVyaXZhdGl2ZUN1cnZlLCBzZWNvbmREZXJpdmF0aXZlQ3VydmUsIHtcclxuXHJcbiAgICAgIC8vIEEgYml0IHJpZ2h0IG9mIGNlbnRlciwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9jYWxjdWx1cy1ncmFwaGVyL2lzc3Vlcy8yNDhcclxuICAgICAgeDogKCBDYWxjdWx1c0dyYXBoZXJDb25zdGFudHMuQ1VSVkVfWF9SQU5HRS5taW4gKyAwLjU1ICogQ2FsY3VsdXNHcmFwaGVyQ29uc3RhbnRzLkNVUlZFX1hfUkFOR0UuZ2V0TGVuZ3RoKCkgKSxcclxuICAgICAgdGFuZGVtOiB0YW5kZW1cclxuICAgIH0gKTtcclxuXHJcbiAgICB0aGlzLmhhbmRsZUNvbG9yUHJvcGVydHkgPSBDYWxjdWx1c0dyYXBoZXJDb2xvcnMucmVmZXJlbmNlTGluZUhhbmRsZUNvbG9yUHJvcGVydHk7XHJcbiAgICB0aGlzLmxpbmVDb2xvclByb3BlcnR5ID0gQ2FsY3VsdXNHcmFwaGVyQ29sb3JzLnJlZmVyZW5jZUxpbmVTdHJva2VQcm9wZXJ0eTtcclxuXHJcbiAgICB0aGlzLmFkZExpbmtlZEVsZW1lbnQoIHRoaXMuaGFuZGxlQ29sb3JQcm9wZXJ0eSwge1xyXG4gICAgICB0YW5kZW06IHRhbmRlbS5jcmVhdGVUYW5kZW0oICdoYW5kbGVDb2xvclByb3BlcnR5JyApLFxyXG4gICAgICBwaGV0aW9Eb2N1bWVudGF0aW9uOiAnQ29sb3Igb2YgdGhlIGhhbmRsZSBmb3IgbW92aW5nIHRoZSByZWZlcmVuY2UgbGluZSdcclxuICAgIH0gKTtcclxuXHJcbiAgICB0aGlzLmFkZExpbmtlZEVsZW1lbnQoIHRoaXMubGluZUNvbG9yUHJvcGVydHksIHtcclxuICAgICAgdGFuZGVtOiB0YW5kZW0uY3JlYXRlVGFuZGVtKCAnbGluZUNvbG9yUHJvcGVydHknICksXHJcbiAgICAgIHBoZXRpb0RvY3VtZW50YXRpb246ICdDb2xvciBvZiB0aGUgdmVydGljYWwgcmVmZXJlbmNlIGxpbmUnXHJcbiAgICB9ICk7XHJcbiAgfVxyXG59XHJcblxyXG5jYWxjdWx1c0dyYXBoZXIucmVnaXN0ZXIoICdSZWZlcmVuY2VMaW5lJywgUmVmZXJlbmNlTGluZSApO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxhQUFhLE1BQU0sb0JBQW9CO0FBQzlDLE9BQU9DLHdCQUF3QixNQUFNLGdDQUFnQztBQUVyRSxPQUFPQyxlQUFlLE1BQU0sMEJBQTBCO0FBR3RELE9BQU9DLHFCQUFxQixNQUFNLDZCQUE2QjtBQUUvRCxlQUFlLE1BQU1DLGFBQWEsU0FBU0osYUFBYSxDQUFDO0VBRXZEOztFQUdBOztFQUdPSyxXQUFXQSxDQUFFQyxhQUFvQixFQUFFQyxhQUFvQixFQUFFQyxlQUFzQixFQUFFQyxxQkFBNEIsRUFDaEdDLE1BQWMsRUFBRztJQUVuQyxLQUFLLENBQUVKLGFBQWEsRUFBRUMsYUFBYSxFQUFFQyxlQUFlLEVBQUVDLHFCQUFxQixFQUFFO01BRTNFO01BQ0FFLENBQUMsRUFBSVYsd0JBQXdCLENBQUNXLGFBQWEsQ0FBQ0MsR0FBRyxHQUFHLElBQUksR0FBR1osd0JBQXdCLENBQUNXLGFBQWEsQ0FBQ0UsU0FBUyxDQUFDLENBQUc7TUFDN0dKLE1BQU0sRUFBRUE7SUFDVixDQUFFLENBQUM7SUFFSCxJQUFJLENBQUNLLG1CQUFtQixHQUFHWixxQkFBcUIsQ0FBQ2EsZ0NBQWdDO0lBQ2pGLElBQUksQ0FBQ0MsaUJBQWlCLEdBQUdkLHFCQUFxQixDQUFDZSwyQkFBMkI7SUFFMUUsSUFBSSxDQUFDQyxnQkFBZ0IsQ0FBRSxJQUFJLENBQUNKLG1CQUFtQixFQUFFO01BQy9DTCxNQUFNLEVBQUVBLE1BQU0sQ0FBQ1UsWUFBWSxDQUFFLHFCQUFzQixDQUFDO01BQ3BEQyxtQkFBbUIsRUFBRTtJQUN2QixDQUFFLENBQUM7SUFFSCxJQUFJLENBQUNGLGdCQUFnQixDQUFFLElBQUksQ0FBQ0YsaUJBQWlCLEVBQUU7TUFDN0NQLE1BQU0sRUFBRUEsTUFBTSxDQUFDVSxZQUFZLENBQUUsbUJBQW9CLENBQUM7TUFDbERDLG1CQUFtQixFQUFFO0lBQ3ZCLENBQUUsQ0FBQztFQUNMO0FBQ0Y7QUFFQW5CLGVBQWUsQ0FBQ29CLFFBQVEsQ0FBRSxlQUFlLEVBQUVsQixhQUFjLENBQUMifQ==