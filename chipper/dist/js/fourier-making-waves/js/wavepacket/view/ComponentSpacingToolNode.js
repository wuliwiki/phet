// Copyright 2021-2023, University of Colorado Boulder

/**
 * ComponentSpacingToolNode is the tool for measuring component spacing in the 'Wave Packet' screen.
 * Origin is at the tip of the caliper's left jaw.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import FMWColors from '../../common/FMWColors.js';
import FMWSymbols from '../../common/FMWSymbols.js';
import fourierMakingWaves from '../../fourierMakingWaves.js';
import WavePacketMeasurementToolNode from './WavePacketMeasurementToolNode.js';
export default class ComponentSpacingToolNode extends WavePacketMeasurementToolNode {
  /**
   * @param {Property.<number>} componentSpacingProperty
   * @param {ChartTransform} chartTransform
   * @param {EnumerationProperty.<Domain>} domainProperty
   * @param {Object} [options]
   */
  constructor(componentSpacingProperty, chartTransform, domainProperty, options) {
    options = merge({
      calipersNodeOptions: {
        pathOptions: {
          fill: FMWColors.componentSpacingToolFillProperty
        }
      }
    }, options);
    const spaceSymbolStringProperty = new DerivedProperty([FMWSymbols.kStringProperty], k => `${k}<sub>1</sub>`);
    const timeSymbolStringProperty = new DerivedProperty([FMWSymbols.omegaStringProperty], omega => `${omega}<sub>1</sub>`);
    super(componentSpacingProperty, chartTransform, domainProperty, spaceSymbolStringProperty, timeSymbolStringProperty, options);
  }
}
fourierMakingWaves.register('ComponentSpacingToolNode', ComponentSpacingToolNode);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtZXJnZSIsIkRlcml2ZWRQcm9wZXJ0eSIsIkZNV0NvbG9ycyIsIkZNV1N5bWJvbHMiLCJmb3VyaWVyTWFraW5nV2F2ZXMiLCJXYXZlUGFja2V0TWVhc3VyZW1lbnRUb29sTm9kZSIsIkNvbXBvbmVudFNwYWNpbmdUb29sTm9kZSIsImNvbnN0cnVjdG9yIiwiY29tcG9uZW50U3BhY2luZ1Byb3BlcnR5IiwiY2hhcnRUcmFuc2Zvcm0iLCJkb21haW5Qcm9wZXJ0eSIsIm9wdGlvbnMiLCJjYWxpcGVyc05vZGVPcHRpb25zIiwicGF0aE9wdGlvbnMiLCJmaWxsIiwiY29tcG9uZW50U3BhY2luZ1Rvb2xGaWxsUHJvcGVydHkiLCJzcGFjZVN5bWJvbFN0cmluZ1Byb3BlcnR5Iiwia1N0cmluZ1Byb3BlcnR5IiwiayIsInRpbWVTeW1ib2xTdHJpbmdQcm9wZXJ0eSIsIm9tZWdhU3RyaW5nUHJvcGVydHkiLCJvbWVnYSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiQ29tcG9uZW50U3BhY2luZ1Rvb2xOb2RlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIxLTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIENvbXBvbmVudFNwYWNpbmdUb29sTm9kZSBpcyB0aGUgdG9vbCBmb3IgbWVhc3VyaW5nIGNvbXBvbmVudCBzcGFjaW5nIGluIHRoZSAnV2F2ZSBQYWNrZXQnIHNjcmVlbi5cclxuICogT3JpZ2luIGlzIGF0IHRoZSB0aXAgb2YgdGhlIGNhbGlwZXIncyBsZWZ0IGphdy5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgbWVyZ2UgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL21lcmdlLmpzJztcclxuaW1wb3J0IERlcml2ZWRQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL0Rlcml2ZWRQcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBGTVdDb2xvcnMgZnJvbSAnLi4vLi4vY29tbW9uL0ZNV0NvbG9ycy5qcyc7XHJcbmltcG9ydCBGTVdTeW1ib2xzIGZyb20gJy4uLy4uL2NvbW1vbi9GTVdTeW1ib2xzLmpzJztcclxuaW1wb3J0IGZvdXJpZXJNYWtpbmdXYXZlcyBmcm9tICcuLi8uLi9mb3VyaWVyTWFraW5nV2F2ZXMuanMnO1xyXG5pbXBvcnQgV2F2ZVBhY2tldE1lYXN1cmVtZW50VG9vbE5vZGUgZnJvbSAnLi9XYXZlUGFja2V0TWVhc3VyZW1lbnRUb29sTm9kZS5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb25lbnRTcGFjaW5nVG9vbE5vZGUgZXh0ZW5kcyBXYXZlUGFja2V0TWVhc3VyZW1lbnRUb29sTm9kZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7UHJvcGVydHkuPG51bWJlcj59IGNvbXBvbmVudFNwYWNpbmdQcm9wZXJ0eVxyXG4gICAqIEBwYXJhbSB7Q2hhcnRUcmFuc2Zvcm19IGNoYXJ0VHJhbnNmb3JtXHJcbiAgICogQHBhcmFtIHtFbnVtZXJhdGlvblByb3BlcnR5LjxEb21haW4+fSBkb21haW5Qcm9wZXJ0eVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggY29tcG9uZW50U3BhY2luZ1Byb3BlcnR5LCBjaGFydFRyYW5zZm9ybSwgZG9tYWluUHJvcGVydHksIG9wdGlvbnMgKSB7XHJcblxyXG4gICAgb3B0aW9ucyA9IG1lcmdlKCB7XHJcbiAgICAgIGNhbGlwZXJzTm9kZU9wdGlvbnM6IHtcclxuICAgICAgICBwYXRoT3B0aW9uczoge1xyXG4gICAgICAgICAgZmlsbDogRk1XQ29sb3JzLmNvbXBvbmVudFNwYWNpbmdUb29sRmlsbFByb3BlcnR5XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LCBvcHRpb25zICk7XHJcblxyXG4gICAgY29uc3Qgc3BhY2VTeW1ib2xTdHJpbmdQcm9wZXJ0eSA9IG5ldyBEZXJpdmVkUHJvcGVydHkoIFsgRk1XU3ltYm9scy5rU3RyaW5nUHJvcGVydHkgXSxcclxuICAgICAgICBrID0+IGAke2t9PHN1Yj4xPC9zdWI+YCApO1xyXG5cclxuICAgIGNvbnN0IHRpbWVTeW1ib2xTdHJpbmdQcm9wZXJ0eSA9IG5ldyBEZXJpdmVkUHJvcGVydHkoIFsgRk1XU3ltYm9scy5vbWVnYVN0cmluZ1Byb3BlcnR5IF0sXHJcbiAgICAgIG9tZWdhID0+IGAke29tZWdhfTxzdWI+MTwvc3ViPmAgKTtcclxuXHJcbiAgICBzdXBlciggY29tcG9uZW50U3BhY2luZ1Byb3BlcnR5LCBjaGFydFRyYW5zZm9ybSwgZG9tYWluUHJvcGVydHksIHNwYWNlU3ltYm9sU3RyaW5nUHJvcGVydHksIHRpbWVTeW1ib2xTdHJpbmdQcm9wZXJ0eSwgb3B0aW9ucyApO1xyXG4gIH1cclxufVxyXG5cclxuZm91cmllck1ha2luZ1dhdmVzLnJlZ2lzdGVyKCAnQ29tcG9uZW50U3BhY2luZ1Rvb2xOb2RlJywgQ29tcG9uZW50U3BhY2luZ1Rvb2xOb2RlICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBSyxNQUFNLG1DQUFtQztBQUNyRCxPQUFPQyxlQUFlLE1BQU0sd0NBQXdDO0FBQ3BFLE9BQU9DLFNBQVMsTUFBTSwyQkFBMkI7QUFDakQsT0FBT0MsVUFBVSxNQUFNLDRCQUE0QjtBQUNuRCxPQUFPQyxrQkFBa0IsTUFBTSw2QkFBNkI7QUFDNUQsT0FBT0MsNkJBQTZCLE1BQU0sb0NBQW9DO0FBRTlFLGVBQWUsTUFBTUMsd0JBQXdCLFNBQVNELDZCQUE2QixDQUFDO0VBRWxGO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFRSxXQUFXQSxDQUFFQyx3QkFBd0IsRUFBRUMsY0FBYyxFQUFFQyxjQUFjLEVBQUVDLE9BQU8sRUFBRztJQUUvRUEsT0FBTyxHQUFHWCxLQUFLLENBQUU7TUFDZlksbUJBQW1CLEVBQUU7UUFDbkJDLFdBQVcsRUFBRTtVQUNYQyxJQUFJLEVBQUVaLFNBQVMsQ0FBQ2E7UUFDbEI7TUFDRjtJQUNGLENBQUMsRUFBRUosT0FBUSxDQUFDO0lBRVosTUFBTUsseUJBQXlCLEdBQUcsSUFBSWYsZUFBZSxDQUFFLENBQUVFLFVBQVUsQ0FBQ2MsZUFBZSxDQUFFLEVBQ2pGQyxDQUFDLElBQUssR0FBRUEsQ0FBRSxjQUFjLENBQUM7SUFFN0IsTUFBTUMsd0JBQXdCLEdBQUcsSUFBSWxCLGVBQWUsQ0FBRSxDQUFFRSxVQUFVLENBQUNpQixtQkFBbUIsQ0FBRSxFQUN0RkMsS0FBSyxJQUFLLEdBQUVBLEtBQU0sY0FBYyxDQUFDO0lBRW5DLEtBQUssQ0FBRWIsd0JBQXdCLEVBQUVDLGNBQWMsRUFBRUMsY0FBYyxFQUFFTSx5QkFBeUIsRUFBRUcsd0JBQXdCLEVBQUVSLE9BQVEsQ0FBQztFQUNqSTtBQUNGO0FBRUFQLGtCQUFrQixDQUFDa0IsUUFBUSxDQUFFLDBCQUEwQixFQUFFaEIsd0JBQXlCLENBQUMifQ==