// Copyright 2022, University of Colorado Boulder

/**
 * CollisionCounterCheckbox is the 'Collision Counter' check box, used to control visibility of the collision counter.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import gasProperties from '../../gasProperties.js';
import GasPropertiesStrings from '../../GasPropertiesStrings.js';
import GasPropertiesCheckbox from './GasPropertiesCheckbox.js';
import GasPropertiesIconFactory from './GasPropertiesIconFactory.js';
export default class CollisionCounterCheckbox extends GasPropertiesCheckbox {
  constructor(collisionCounterVisibleProperty, providedOptions) {
    const options = optionize()({
      // GasPropertiesCheckboxOptions
      textStringProperty: GasPropertiesStrings.collisionCounterStringProperty,
      icon: GasPropertiesIconFactory.createCollisionCounterIcon()
    }, providedOptions);
    super(collisionCounterVisibleProperty, options);
  }
}
gasProperties.register('CollisionCounterCheckbox', CollisionCounterCheckbox);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25pemUiLCJnYXNQcm9wZXJ0aWVzIiwiR2FzUHJvcGVydGllc1N0cmluZ3MiLCJHYXNQcm9wZXJ0aWVzQ2hlY2tib3giLCJHYXNQcm9wZXJ0aWVzSWNvbkZhY3RvcnkiLCJDb2xsaXNpb25Db3VudGVyQ2hlY2tib3giLCJjb25zdHJ1Y3RvciIsImNvbGxpc2lvbkNvdW50ZXJWaXNpYmxlUHJvcGVydHkiLCJwcm92aWRlZE9wdGlvbnMiLCJvcHRpb25zIiwidGV4dFN0cmluZ1Byb3BlcnR5IiwiY29sbGlzaW9uQ291bnRlclN0cmluZ1Byb3BlcnR5IiwiaWNvbiIsImNyZWF0ZUNvbGxpc2lvbkNvdW50ZXJJY29uIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJDb2xsaXNpb25Db3VudGVyQ2hlY2tib3gudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIENvbGxpc2lvbkNvdW50ZXJDaGVja2JveCBpcyB0aGUgJ0NvbGxpc2lvbiBDb3VudGVyJyBjaGVjayBib3gsIHVzZWQgdG8gY29udHJvbCB2aXNpYmlsaXR5IG9mIHRoZSBjb2xsaXNpb24gY291bnRlci5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9Qcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBvcHRpb25pemUsIHsgRW1wdHlTZWxmT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9vcHRpb25pemUuanMnO1xyXG5pbXBvcnQgU3RyaWN0T21pdCBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvdHlwZXMvU3RyaWN0T21pdC5qcyc7XHJcbmltcG9ydCBnYXNQcm9wZXJ0aWVzIGZyb20gJy4uLy4uL2dhc1Byb3BlcnRpZXMuanMnO1xyXG5pbXBvcnQgR2FzUHJvcGVydGllc1N0cmluZ3MgZnJvbSAnLi4vLi4vR2FzUHJvcGVydGllc1N0cmluZ3MuanMnO1xyXG5pbXBvcnQgR2FzUHJvcGVydGllc0NoZWNrYm94LCB7IEdhc1Byb3BlcnRpZXNDaGVja2JveE9wdGlvbnMgfSBmcm9tICcuL0dhc1Byb3BlcnRpZXNDaGVja2JveC5qcyc7XHJcbmltcG9ydCBHYXNQcm9wZXJ0aWVzSWNvbkZhY3RvcnkgZnJvbSAnLi9HYXNQcm9wZXJ0aWVzSWNvbkZhY3RvcnkuanMnO1xyXG5cclxudHlwZSBTZWxmT3B0aW9ucyA9IEVtcHR5U2VsZk9wdGlvbnM7XHJcblxyXG50eXBlIENvbGxpc2lvbkNvdW50ZXJDaGVja2JveE9wdGlvbnMgPSBTZWxmT3B0aW9ucyAmIFN0cmljdE9taXQ8R2FzUHJvcGVydGllc0NoZWNrYm94T3B0aW9ucywgJ3RleHRTdHJpbmdQcm9wZXJ0eScgfCAnaWNvbic+O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGlzaW9uQ291bnRlckNoZWNrYm94IGV4dGVuZHMgR2FzUHJvcGVydGllc0NoZWNrYm94IHtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBjb2xsaXNpb25Db3VudGVyVmlzaWJsZVByb3BlcnR5OiBQcm9wZXJ0eTxib29sZWFuPiwgcHJvdmlkZWRPcHRpb25zOiBDb2xsaXNpb25Db3VudGVyQ2hlY2tib3hPcHRpb25zICkge1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25pemU8Q29sbGlzaW9uQ291bnRlckNoZWNrYm94T3B0aW9ucywgU2VsZk9wdGlvbnMsIEdhc1Byb3BlcnRpZXNDaGVja2JveE9wdGlvbnM+KCkoIHtcclxuXHJcbiAgICAgIC8vIEdhc1Byb3BlcnRpZXNDaGVja2JveE9wdGlvbnNcclxuICAgICAgdGV4dFN0cmluZ1Byb3BlcnR5OiBHYXNQcm9wZXJ0aWVzU3RyaW5ncy5jb2xsaXNpb25Db3VudGVyU3RyaW5nUHJvcGVydHksXHJcbiAgICAgIGljb246IEdhc1Byb3BlcnRpZXNJY29uRmFjdG9yeS5jcmVhdGVDb2xsaXNpb25Db3VudGVySWNvbigpXHJcbiAgICB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICBzdXBlciggY29sbGlzaW9uQ291bnRlclZpc2libGVQcm9wZXJ0eSwgb3B0aW9ucyApO1xyXG4gIH1cclxufVxyXG5cclxuZ2FzUHJvcGVydGllcy5yZWdpc3RlciggJ0NvbGxpc2lvbkNvdW50ZXJDaGVja2JveCcsIENvbGxpc2lvbkNvdW50ZXJDaGVja2JveCApOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQSxPQUFPQSxTQUFTLE1BQTRCLHVDQUF1QztBQUVuRixPQUFPQyxhQUFhLE1BQU0sd0JBQXdCO0FBQ2xELE9BQU9DLG9CQUFvQixNQUFNLCtCQUErQjtBQUNoRSxPQUFPQyxxQkFBcUIsTUFBd0MsNEJBQTRCO0FBQ2hHLE9BQU9DLHdCQUF3QixNQUFNLCtCQUErQjtBQU1wRSxlQUFlLE1BQU1DLHdCQUF3QixTQUFTRixxQkFBcUIsQ0FBQztFQUVuRUcsV0FBV0EsQ0FBRUMsK0JBQWtELEVBQUVDLGVBQWdELEVBQUc7SUFFekgsTUFBTUMsT0FBTyxHQUFHVCxTQUFTLENBQTZFLENBQUMsQ0FBRTtNQUV2RztNQUNBVSxrQkFBa0IsRUFBRVIsb0JBQW9CLENBQUNTLDhCQUE4QjtNQUN2RUMsSUFBSSxFQUFFUix3QkFBd0IsQ0FBQ1MsMEJBQTBCLENBQUM7SUFDNUQsQ0FBQyxFQUFFTCxlQUFnQixDQUFDO0lBRXBCLEtBQUssQ0FBRUQsK0JBQStCLEVBQUVFLE9BQVEsQ0FBQztFQUNuRDtBQUNGO0FBRUFSLGFBQWEsQ0FBQ2EsUUFBUSxDQUFFLDBCQUEwQixFQUFFVCx3QkFBeUIsQ0FBQyJ9