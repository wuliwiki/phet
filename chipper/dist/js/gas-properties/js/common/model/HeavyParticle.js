// Copyright 2019-2022, University of Colorado Boulder

/**
 * HeavyParticle is the model for 'heavy' particles, as they are named in the design document.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import gasProperties from '../../gasProperties.js';
import GasPropertiesColors from '../GasPropertiesColors.js';
import GasPropertiesConstants from '../GasPropertiesConstants.js';
import Particle from './Particle.js';
export default class HeavyParticle extends Particle {
  constructor() {
    super({
      // ParticleOptions
      mass: 28,
      // equivalent to N2 (nitrogen), in AMU, rounded to the closest integer
      radius: GasPropertiesConstants.HEAVY_PARTICLES_RADIUS,
      // pm
      colorProperty: GasPropertiesColors.heavyParticleColorProperty,
      highlightColorProperty: GasPropertiesColors.heavyParticleHighlightColorProperty
    });
  }
}
gasProperties.register('HeavyParticle', HeavyParticle);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJnYXNQcm9wZXJ0aWVzIiwiR2FzUHJvcGVydGllc0NvbG9ycyIsIkdhc1Byb3BlcnRpZXNDb25zdGFudHMiLCJQYXJ0aWNsZSIsIkhlYXZ5UGFydGljbGUiLCJjb25zdHJ1Y3RvciIsIm1hc3MiLCJyYWRpdXMiLCJIRUFWWV9QQVJUSUNMRVNfUkFESVVTIiwiY29sb3JQcm9wZXJ0eSIsImhlYXZ5UGFydGljbGVDb2xvclByb3BlcnR5IiwiaGlnaGxpZ2h0Q29sb3JQcm9wZXJ0eSIsImhlYXZ5UGFydGljbGVIaWdobGlnaHRDb2xvclByb3BlcnR5IiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJIZWF2eVBhcnRpY2xlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE5LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIEhlYXZ5UGFydGljbGUgaXMgdGhlIG1vZGVsIGZvciAnaGVhdnknIHBhcnRpY2xlcywgYXMgdGhleSBhcmUgbmFtZWQgaW4gdGhlIGRlc2lnbiBkb2N1bWVudC5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgZ2FzUHJvcGVydGllcyBmcm9tICcuLi8uLi9nYXNQcm9wZXJ0aWVzLmpzJztcclxuaW1wb3J0IEdhc1Byb3BlcnRpZXNDb2xvcnMgZnJvbSAnLi4vR2FzUHJvcGVydGllc0NvbG9ycy5qcyc7XHJcbmltcG9ydCBHYXNQcm9wZXJ0aWVzQ29uc3RhbnRzIGZyb20gJy4uL0dhc1Byb3BlcnRpZXNDb25zdGFudHMuanMnO1xyXG5pbXBvcnQgUGFydGljbGUgZnJvbSAnLi9QYXJ0aWNsZS5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWF2eVBhcnRpY2xlIGV4dGVuZHMgUGFydGljbGUge1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigge1xyXG5cclxuICAgICAgLy8gUGFydGljbGVPcHRpb25zXHJcbiAgICAgIG1hc3M6IDI4LCAvLyBlcXVpdmFsZW50IHRvIE4yIChuaXRyb2dlbiksIGluIEFNVSwgcm91bmRlZCB0byB0aGUgY2xvc2VzdCBpbnRlZ2VyXHJcbiAgICAgIHJhZGl1czogR2FzUHJvcGVydGllc0NvbnN0YW50cy5IRUFWWV9QQVJUSUNMRVNfUkFESVVTLCAvLyBwbVxyXG4gICAgICBjb2xvclByb3BlcnR5OiBHYXNQcm9wZXJ0aWVzQ29sb3JzLmhlYXZ5UGFydGljbGVDb2xvclByb3BlcnR5LFxyXG4gICAgICBoaWdobGlnaHRDb2xvclByb3BlcnR5OiBHYXNQcm9wZXJ0aWVzQ29sb3JzLmhlYXZ5UGFydGljbGVIaWdobGlnaHRDb2xvclByb3BlcnR5XHJcbiAgICB9ICk7XHJcbiAgfVxyXG59XHJcblxyXG5nYXNQcm9wZXJ0aWVzLnJlZ2lzdGVyKCAnSGVhdnlQYXJ0aWNsZScsIEhlYXZ5UGFydGljbGUgKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsYUFBYSxNQUFNLHdCQUF3QjtBQUNsRCxPQUFPQyxtQkFBbUIsTUFBTSwyQkFBMkI7QUFDM0QsT0FBT0Msc0JBQXNCLE1BQU0sOEJBQThCO0FBQ2pFLE9BQU9DLFFBQVEsTUFBTSxlQUFlO0FBRXBDLGVBQWUsTUFBTUMsYUFBYSxTQUFTRCxRQUFRLENBQUM7RUFFM0NFLFdBQVdBLENBQUEsRUFBRztJQUNuQixLQUFLLENBQUU7TUFFTDtNQUNBQyxJQUFJLEVBQUUsRUFBRTtNQUFFO01BQ1ZDLE1BQU0sRUFBRUwsc0JBQXNCLENBQUNNLHNCQUFzQjtNQUFFO01BQ3ZEQyxhQUFhLEVBQUVSLG1CQUFtQixDQUFDUywwQkFBMEI7TUFDN0RDLHNCQUFzQixFQUFFVixtQkFBbUIsQ0FBQ1c7SUFDOUMsQ0FBRSxDQUFDO0VBQ0w7QUFDRjtBQUVBWixhQUFhLENBQUNhLFFBQVEsQ0FBRSxlQUFlLEVBQUVULGFBQWMsQ0FBQyJ9