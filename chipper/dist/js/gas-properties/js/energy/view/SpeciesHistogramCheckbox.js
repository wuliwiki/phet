// Copyright 2022, University of Colorado Boulder

/**
 * SpeciesHistogramCheckbox is the checkbox that shows histogram data for a specific particle species.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import GasPropertiesCheckbox from '../../common/view/GasPropertiesCheckbox.js';
import GasPropertiesIconFactory from '../../common/view/GasPropertiesIconFactory.js';
import gasProperties from '../../gasProperties.js';
import HeavyParticle from '../../common/model/HeavyParticle.js';
import LightParticle from '../../common/model/LightParticle.js';
export default class SpeciesHistogramCheckbox extends GasPropertiesCheckbox {
  // private - use static create methods
  constructor(speciesVisibleProperty, particle, modelViewTransform, providedOptions) {
    const options = optionize()({
      // GasPropertiesCheckboxOptions
      icon: GasPropertiesIconFactory.createSpeciesHistogramIcon(particle, modelViewTransform),
      spacing: 5
    }, providedOptions);
    super(speciesVisibleProperty, options);
  }

  /**
   * Creates a checkbox for heavy-particle species.
   */
  static createHeavyParticlesCheckbox(speciesVisibleProperty, modelViewTransform, providedOptions) {
    return new SpeciesHistogramCheckbox(speciesVisibleProperty, new HeavyParticle(), modelViewTransform, providedOptions);
  }

  /**
   * Creates a checkbox for light-particle species.
   */
  static createLightParticlesCheckbox(speciesVisibleProperty, modelViewTransform, providedOptions) {
    return new SpeciesHistogramCheckbox(speciesVisibleProperty, new LightParticle(), modelViewTransform, providedOptions);
  }
}
gasProperties.register('SpeciesHistogramCheckbox', SpeciesHistogramCheckbox);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25pemUiLCJHYXNQcm9wZXJ0aWVzQ2hlY2tib3giLCJHYXNQcm9wZXJ0aWVzSWNvbkZhY3RvcnkiLCJnYXNQcm9wZXJ0aWVzIiwiSGVhdnlQYXJ0aWNsZSIsIkxpZ2h0UGFydGljbGUiLCJTcGVjaWVzSGlzdG9ncmFtQ2hlY2tib3giLCJjb25zdHJ1Y3RvciIsInNwZWNpZXNWaXNpYmxlUHJvcGVydHkiLCJwYXJ0aWNsZSIsIm1vZGVsVmlld1RyYW5zZm9ybSIsInByb3ZpZGVkT3B0aW9ucyIsIm9wdGlvbnMiLCJpY29uIiwiY3JlYXRlU3BlY2llc0hpc3RvZ3JhbUljb24iLCJzcGFjaW5nIiwiY3JlYXRlSGVhdnlQYXJ0aWNsZXNDaGVja2JveCIsImNyZWF0ZUxpZ2h0UGFydGljbGVzQ2hlY2tib3giLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlNwZWNpZXNIaXN0b2dyYW1DaGVja2JveC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogU3BlY2llc0hpc3RvZ3JhbUNoZWNrYm94IGlzIHRoZSBjaGVja2JveCB0aGF0IHNob3dzIGhpc3RvZ3JhbSBkYXRhIGZvciBhIHNwZWNpZmljIHBhcnRpY2xlIHNwZWNpZXMuXHJcbiAqXHJcbiAqIEBhdXRob3IgQ2hyaXMgTWFsbGV5IChQaXhlbFpvb20sIEluYy4pXHJcbiAqL1xyXG5cclxuaW1wb3J0IFByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgb3B0aW9uaXplLCB7IEVtcHR5U2VsZk9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvb3B0aW9uaXplLmpzJztcclxuaW1wb3J0IE1vZGVsVmlld1RyYW5zZm9ybTIgZnJvbSAnLi4vLi4vLi4vLi4vcGhldGNvbW1vbi9qcy92aWV3L01vZGVsVmlld1RyYW5zZm9ybTIuanMnO1xyXG5pbXBvcnQgUGFydGljbGUgZnJvbSAnLi4vLi4vY29tbW9uL21vZGVsL1BhcnRpY2xlLmpzJztcclxuaW1wb3J0IEdhc1Byb3BlcnRpZXNDaGVja2JveCwgeyBHYXNQcm9wZXJ0aWVzQ2hlY2tib3hPcHRpb25zIH0gZnJvbSAnLi4vLi4vY29tbW9uL3ZpZXcvR2FzUHJvcGVydGllc0NoZWNrYm94LmpzJztcclxuaW1wb3J0IEdhc1Byb3BlcnRpZXNJY29uRmFjdG9yeSBmcm9tICcuLi8uLi9jb21tb24vdmlldy9HYXNQcm9wZXJ0aWVzSWNvbkZhY3RvcnkuanMnO1xyXG5pbXBvcnQgZ2FzUHJvcGVydGllcyBmcm9tICcuLi8uLi9nYXNQcm9wZXJ0aWVzLmpzJztcclxuaW1wb3J0IEhlYXZ5UGFydGljbGUgZnJvbSAnLi4vLi4vY29tbW9uL21vZGVsL0hlYXZ5UGFydGljbGUuanMnO1xyXG5pbXBvcnQgTGlnaHRQYXJ0aWNsZSBmcm9tICcuLi8uLi9jb21tb24vbW9kZWwvTGlnaHRQYXJ0aWNsZS5qcyc7XHJcbmltcG9ydCBTdHJpY3RPbWl0IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy90eXBlcy9TdHJpY3RPbWl0LmpzJztcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSBFbXB0eVNlbGZPcHRpb25zO1xyXG5cclxuZXhwb3J0IHR5cGUgU3BlY2llc0hpc3RvZ3JhbUNoZWNrYm94T3B0aW9ucyA9IFNlbGZPcHRpb25zICYgU3RyaWN0T21pdDxHYXNQcm9wZXJ0aWVzQ2hlY2tib3hPcHRpb25zLCAndGV4dFN0cmluZ1Byb3BlcnR5JyB8ICdpY29uJz47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGVjaWVzSGlzdG9ncmFtQ2hlY2tib3ggZXh0ZW5kcyBHYXNQcm9wZXJ0aWVzQ2hlY2tib3gge1xyXG5cclxuICAvLyBwcml2YXRlIC0gdXNlIHN0YXRpYyBjcmVhdGUgbWV0aG9kc1xyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoIHNwZWNpZXNWaXNpYmxlUHJvcGVydHk6IFByb3BlcnR5PGJvb2xlYW4+LCBwYXJ0aWNsZTogUGFydGljbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICBtb2RlbFZpZXdUcmFuc2Zvcm06IE1vZGVsVmlld1RyYW5zZm9ybTIsIHByb3ZpZGVkT3B0aW9uczogU3BlY2llc0hpc3RvZ3JhbUNoZWNrYm94T3B0aW9ucyApIHtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0gb3B0aW9uaXplPFNwZWNpZXNIaXN0b2dyYW1DaGVja2JveE9wdGlvbnMsIFNlbGZPcHRpb25zLCBHYXNQcm9wZXJ0aWVzQ2hlY2tib3hPcHRpb25zPigpKCB7XHJcblxyXG4gICAgICAvLyBHYXNQcm9wZXJ0aWVzQ2hlY2tib3hPcHRpb25zXHJcbiAgICAgIGljb246IEdhc1Byb3BlcnRpZXNJY29uRmFjdG9yeS5jcmVhdGVTcGVjaWVzSGlzdG9ncmFtSWNvbiggcGFydGljbGUsIG1vZGVsVmlld1RyYW5zZm9ybSApLFxyXG4gICAgICBzcGFjaW5nOiA1XHJcbiAgICB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICBzdXBlciggc3BlY2llc1Zpc2libGVQcm9wZXJ0eSwgb3B0aW9ucyApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIGNoZWNrYm94IGZvciBoZWF2eS1wYXJ0aWNsZSBzcGVjaWVzLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlSGVhdnlQYXJ0aWNsZXNDaGVja2JveChcclxuICAgIHNwZWNpZXNWaXNpYmxlUHJvcGVydHk6IFByb3BlcnR5PGJvb2xlYW4+LFxyXG4gICAgbW9kZWxWaWV3VHJhbnNmb3JtOiBNb2RlbFZpZXdUcmFuc2Zvcm0yLCBwcm92aWRlZE9wdGlvbnM6IFNwZWNpZXNIaXN0b2dyYW1DaGVja2JveE9wdGlvbnMgKTogU3BlY2llc0hpc3RvZ3JhbUNoZWNrYm94IHtcclxuICAgIHJldHVybiBuZXcgU3BlY2llc0hpc3RvZ3JhbUNoZWNrYm94KCBzcGVjaWVzVmlzaWJsZVByb3BlcnR5LCBuZXcgSGVhdnlQYXJ0aWNsZSgpLFxyXG4gICAgICBtb2RlbFZpZXdUcmFuc2Zvcm0sIHByb3ZpZGVkT3B0aW9ucyApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIGNoZWNrYm94IGZvciBsaWdodC1wYXJ0aWNsZSBzcGVjaWVzLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlTGlnaHRQYXJ0aWNsZXNDaGVja2JveChcclxuICAgIHNwZWNpZXNWaXNpYmxlUHJvcGVydHk6IFByb3BlcnR5PGJvb2xlYW4+LFxyXG4gICAgbW9kZWxWaWV3VHJhbnNmb3JtOiBNb2RlbFZpZXdUcmFuc2Zvcm0yLCBwcm92aWRlZE9wdGlvbnM6IFNwZWNpZXNIaXN0b2dyYW1DaGVja2JveE9wdGlvbnMgKTogU3BlY2llc0hpc3RvZ3JhbUNoZWNrYm94IHtcclxuICAgIHJldHVybiBuZXcgU3BlY2llc0hpc3RvZ3JhbUNoZWNrYm94KCBzcGVjaWVzVmlzaWJsZVByb3BlcnR5LCBuZXcgTGlnaHRQYXJ0aWNsZSgpLFxyXG4gICAgICBtb2RlbFZpZXdUcmFuc2Zvcm0sIHByb3ZpZGVkT3B0aW9ucyApO1xyXG4gIH1cclxufVxyXG5cclxuZ2FzUHJvcGVydGllcy5yZWdpc3RlciggJ1NwZWNpZXNIaXN0b2dyYW1DaGVja2JveCcsIFNwZWNpZXNIaXN0b2dyYW1DaGVja2JveCApOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQSxPQUFPQSxTQUFTLE1BQTRCLHVDQUF1QztBQUduRixPQUFPQyxxQkFBcUIsTUFBd0MsNENBQTRDO0FBQ2hILE9BQU9DLHdCQUF3QixNQUFNLCtDQUErQztBQUNwRixPQUFPQyxhQUFhLE1BQU0sd0JBQXdCO0FBQ2xELE9BQU9DLGFBQWEsTUFBTSxxQ0FBcUM7QUFDL0QsT0FBT0MsYUFBYSxNQUFNLHFDQUFxQztBQU8vRCxlQUFlLE1BQU1DLHdCQUF3QixTQUFTTCxxQkFBcUIsQ0FBQztFQUUxRTtFQUNRTSxXQUFXQSxDQUFFQyxzQkFBeUMsRUFBRUMsUUFBa0IsRUFDOURDLGtCQUF1QyxFQUFFQyxlQUFnRCxFQUFHO0lBRTlHLE1BQU1DLE9BQU8sR0FBR1osU0FBUyxDQUE2RSxDQUFDLENBQUU7TUFFdkc7TUFDQWEsSUFBSSxFQUFFWCx3QkFBd0IsQ0FBQ1ksMEJBQTBCLENBQUVMLFFBQVEsRUFBRUMsa0JBQW1CLENBQUM7TUFDekZLLE9BQU8sRUFBRTtJQUNYLENBQUMsRUFBRUosZUFBZ0IsQ0FBQztJQUVwQixLQUFLLENBQUVILHNCQUFzQixFQUFFSSxPQUFRLENBQUM7RUFDMUM7O0VBRUE7QUFDRjtBQUNBO0VBQ0UsT0FBY0ksNEJBQTRCQSxDQUN4Q1Isc0JBQXlDLEVBQ3pDRSxrQkFBdUMsRUFBRUMsZUFBZ0QsRUFBNkI7SUFDdEgsT0FBTyxJQUFJTCx3QkFBd0IsQ0FBRUUsc0JBQXNCLEVBQUUsSUFBSUosYUFBYSxDQUFDLENBQUMsRUFDOUVNLGtCQUFrQixFQUFFQyxlQUFnQixDQUFDO0VBQ3pDOztFQUVBO0FBQ0Y7QUFDQTtFQUNFLE9BQWNNLDRCQUE0QkEsQ0FDeENULHNCQUF5QyxFQUN6Q0Usa0JBQXVDLEVBQUVDLGVBQWdELEVBQTZCO0lBQ3RILE9BQU8sSUFBSUwsd0JBQXdCLENBQUVFLHNCQUFzQixFQUFFLElBQUlILGFBQWEsQ0FBQyxDQUFDLEVBQzlFSyxrQkFBa0IsRUFBRUMsZUFBZ0IsQ0FBQztFQUN6QztBQUNGO0FBRUFSLGFBQWEsQ0FBQ2UsUUFBUSxDQUFFLDBCQUEwQixFQUFFWix3QkFBeUIsQ0FBQyJ9