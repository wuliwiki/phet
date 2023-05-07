// Copyright 2022, University of Colorado Boulder

/**
 * ScaleCheckbox is the checkbox used to show/hide the scale on the Diffusion container.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import GasPropertiesCheckbox from '../../common/view/GasPropertiesCheckbox.js';
import GasPropertiesIconFactory from '../../common/view/GasPropertiesIconFactory.js';
import gasProperties from '../../gasProperties.js';
import GasPropertiesStrings from '../../GasPropertiesStrings.js';
export default class ScaleCheckbox extends GasPropertiesCheckbox {
  constructor(scaleVisibleProperty, providedOptions) {
    const options = optionize()({
      // GasPropertiesCheckboxOptions
      textStringProperty: GasPropertiesStrings.scaleStringProperty,
      icon: GasPropertiesIconFactory.createScaleIcon()
    }, providedOptions);
    super(scaleVisibleProperty, options);
  }
}
gasProperties.register('ScaleCheckbox', ScaleCheckbox);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25pemUiLCJHYXNQcm9wZXJ0aWVzQ2hlY2tib3giLCJHYXNQcm9wZXJ0aWVzSWNvbkZhY3RvcnkiLCJnYXNQcm9wZXJ0aWVzIiwiR2FzUHJvcGVydGllc1N0cmluZ3MiLCJTY2FsZUNoZWNrYm94IiwiY29uc3RydWN0b3IiLCJzY2FsZVZpc2libGVQcm9wZXJ0eSIsInByb3ZpZGVkT3B0aW9ucyIsIm9wdGlvbnMiLCJ0ZXh0U3RyaW5nUHJvcGVydHkiLCJzY2FsZVN0cmluZ1Byb3BlcnR5IiwiaWNvbiIsImNyZWF0ZVNjYWxlSWNvbiIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiU2NhbGVDaGVja2JveC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogU2NhbGVDaGVja2JveCBpcyB0aGUgY2hlY2tib3ggdXNlZCB0byBzaG93L2hpZGUgdGhlIHNjYWxlIG9uIHRoZSBEaWZmdXNpb24gY29udGFpbmVyLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKi9cclxuXHJcbmltcG9ydCBQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL1Byb3BlcnR5LmpzJztcclxuaW1wb3J0IG9wdGlvbml6ZSwgeyBFbXB0eVNlbGZPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL29wdGlvbml6ZS5qcyc7XHJcbmltcG9ydCBTdHJpY3RPbWl0IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy90eXBlcy9TdHJpY3RPbWl0LmpzJztcclxuaW1wb3J0IEdhc1Byb3BlcnRpZXNDaGVja2JveCwgeyBHYXNQcm9wZXJ0aWVzQ2hlY2tib3hPcHRpb25zIH0gZnJvbSAnLi4vLi4vY29tbW9uL3ZpZXcvR2FzUHJvcGVydGllc0NoZWNrYm94LmpzJztcclxuaW1wb3J0IEdhc1Byb3BlcnRpZXNJY29uRmFjdG9yeSBmcm9tICcuLi8uLi9jb21tb24vdmlldy9HYXNQcm9wZXJ0aWVzSWNvbkZhY3RvcnkuanMnO1xyXG5pbXBvcnQgZ2FzUHJvcGVydGllcyBmcm9tICcuLi8uLi9nYXNQcm9wZXJ0aWVzLmpzJztcclxuaW1wb3J0IEdhc1Byb3BlcnRpZXNTdHJpbmdzIGZyb20gJy4uLy4uL0dhc1Byb3BlcnRpZXNTdHJpbmdzLmpzJztcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSBFbXB0eVNlbGZPcHRpb25zO1xyXG5cclxudHlwZSBTY2FsZUNoZWNrYm94T3B0aW9ucyA9IFNlbGZPcHRpb25zICYgU3RyaWN0T21pdDxHYXNQcm9wZXJ0aWVzQ2hlY2tib3hPcHRpb25zLCAndGV4dFN0cmluZ1Byb3BlcnR5JyB8ICdpY29uJz47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2FsZUNoZWNrYm94IGV4dGVuZHMgR2FzUHJvcGVydGllc0NoZWNrYm94IHtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBzY2FsZVZpc2libGVQcm9wZXJ0eTogUHJvcGVydHk8Ym9vbGVhbj4sIHByb3ZpZGVkT3B0aW9uczogU2NhbGVDaGVja2JveE9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxTY2FsZUNoZWNrYm94T3B0aW9ucywgU2VsZk9wdGlvbnMsIEdhc1Byb3BlcnRpZXNDaGVja2JveE9wdGlvbnM+KCkoIHtcclxuXHJcbiAgICAgIC8vIEdhc1Byb3BlcnRpZXNDaGVja2JveE9wdGlvbnNcclxuICAgICAgdGV4dFN0cmluZ1Byb3BlcnR5OiBHYXNQcm9wZXJ0aWVzU3RyaW5ncy5zY2FsZVN0cmluZ1Byb3BlcnR5LFxyXG4gICAgICBpY29uOiBHYXNQcm9wZXJ0aWVzSWNvbkZhY3RvcnkuY3JlYXRlU2NhbGVJY29uKClcclxuICAgIH0sIHByb3ZpZGVkT3B0aW9ucyApO1xyXG5cclxuICAgIHN1cGVyKCBzY2FsZVZpc2libGVQcm9wZXJ0eSwgb3B0aW9ucyApO1xyXG4gIH1cclxufVxyXG5cclxuZ2FzUHJvcGVydGllcy5yZWdpc3RlciggJ1NjYWxlQ2hlY2tib3gnLCBTY2FsZUNoZWNrYm94ICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBLE9BQU9BLFNBQVMsTUFBNEIsdUNBQXVDO0FBRW5GLE9BQU9DLHFCQUFxQixNQUF3Qyw0Q0FBNEM7QUFDaEgsT0FBT0Msd0JBQXdCLE1BQU0sK0NBQStDO0FBQ3BGLE9BQU9DLGFBQWEsTUFBTSx3QkFBd0I7QUFDbEQsT0FBT0Msb0JBQW9CLE1BQU0sK0JBQStCO0FBTWhFLGVBQWUsTUFBTUMsYUFBYSxTQUFTSixxQkFBcUIsQ0FBQztFQUV4REssV0FBV0EsQ0FBRUMsb0JBQXVDLEVBQUVDLGVBQXFDLEVBQUc7SUFFbkcsTUFBTUMsT0FBTyxHQUFHVCxTQUFTLENBQWtFLENBQUMsQ0FBRTtNQUU1RjtNQUNBVSxrQkFBa0IsRUFBRU4sb0JBQW9CLENBQUNPLG1CQUFtQjtNQUM1REMsSUFBSSxFQUFFVix3QkFBd0IsQ0FBQ1csZUFBZSxDQUFDO0lBQ2pELENBQUMsRUFBRUwsZUFBZ0IsQ0FBQztJQUVwQixLQUFLLENBQUVELG9CQUFvQixFQUFFRSxPQUFRLENBQUM7RUFDeEM7QUFDRjtBQUVBTixhQUFhLENBQUNXLFFBQVEsQ0FBRSxlQUFlLEVBQUVULGFBQWMsQ0FBQyJ9