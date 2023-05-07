// Copyright 2019-2022, University of Colorado Boulder

/**
 * The 'Intro' screen is a specialization of the 'Ideal' screen from Gas Properties sim.
 * It has a different title & icon, and no 'Hold Constant' control.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import GasPropertiesIconFactory from '../../../gas-properties/js/common/view/GasPropertiesIconFactory.js';
import IdealScreen from '../../../gas-properties/js/ideal/IdealScreen.js';
import gasesIntro from '../gasesIntro.js';
import GasesIntroStrings from '../GasesIntroStrings.js';
export default class IntroScreen extends IdealScreen {
  constructor(tandem) {
    super(tandem, {
      name: GasesIntroStrings.screen.introStringProperty,
      homeScreenIcon: GasPropertiesIconFactory.createIntroScreenIcon(),
      hasHoldConstantControls: false
    });
  }
}
gasesIntro.register('IntroScreen', IntroScreen);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJHYXNQcm9wZXJ0aWVzSWNvbkZhY3RvcnkiLCJJZGVhbFNjcmVlbiIsImdhc2VzSW50cm8iLCJHYXNlc0ludHJvU3RyaW5ncyIsIkludHJvU2NyZWVuIiwiY29uc3RydWN0b3IiLCJ0YW5kZW0iLCJuYW1lIiwic2NyZWVuIiwiaW50cm9TdHJpbmdQcm9wZXJ0eSIsImhvbWVTY3JlZW5JY29uIiwiY3JlYXRlSW50cm9TY3JlZW5JY29uIiwiaGFzSG9sZENvbnN0YW50Q29udHJvbHMiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkludHJvU2NyZWVuLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE5LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFRoZSAnSW50cm8nIHNjcmVlbiBpcyBhIHNwZWNpYWxpemF0aW9uIG9mIHRoZSAnSWRlYWwnIHNjcmVlbiBmcm9tIEdhcyBQcm9wZXJ0aWVzIHNpbS5cclxuICogSXQgaGFzIGEgZGlmZmVyZW50IHRpdGxlICYgaWNvbiwgYW5kIG5vICdIb2xkIENvbnN0YW50JyBjb250cm9sLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKi9cclxuXHJcbmltcG9ydCBHYXNQcm9wZXJ0aWVzSWNvbkZhY3RvcnkgZnJvbSAnLi4vLi4vLi4vZ2FzLXByb3BlcnRpZXMvanMvY29tbW9uL3ZpZXcvR2FzUHJvcGVydGllc0ljb25GYWN0b3J5LmpzJztcclxuaW1wb3J0IElkZWFsU2NyZWVuIGZyb20gJy4uLy4uLy4uL2dhcy1wcm9wZXJ0aWVzL2pzL2lkZWFsL0lkZWFsU2NyZWVuLmpzJztcclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuaW1wb3J0IGdhc2VzSW50cm8gZnJvbSAnLi4vZ2FzZXNJbnRyby5qcyc7XHJcbmltcG9ydCBHYXNlc0ludHJvU3RyaW5ncyBmcm9tICcuLi9HYXNlc0ludHJvU3RyaW5ncy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRyb1NjcmVlbiBleHRlbmRzIElkZWFsU2NyZWVuIHtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCB0YW5kZW06IFRhbmRlbSApIHtcclxuICAgIHN1cGVyKCB0YW5kZW0sIHtcclxuICAgICAgbmFtZTogR2FzZXNJbnRyb1N0cmluZ3Muc2NyZWVuLmludHJvU3RyaW5nUHJvcGVydHksXHJcbiAgICAgIGhvbWVTY3JlZW5JY29uOiBHYXNQcm9wZXJ0aWVzSWNvbkZhY3RvcnkuY3JlYXRlSW50cm9TY3JlZW5JY29uKCksXHJcbiAgICAgIGhhc0hvbGRDb25zdGFudENvbnRyb2xzOiBmYWxzZVxyXG4gICAgfSApO1xyXG4gIH1cclxufVxyXG5cclxuZ2FzZXNJbnRyby5yZWdpc3RlciggJ0ludHJvU2NyZWVuJywgSW50cm9TY3JlZW4gKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSx3QkFBd0IsTUFBTSxvRUFBb0U7QUFDekcsT0FBT0MsV0FBVyxNQUFNLGlEQUFpRDtBQUV6RSxPQUFPQyxVQUFVLE1BQU0sa0JBQWtCO0FBQ3pDLE9BQU9DLGlCQUFpQixNQUFNLHlCQUF5QjtBQUV2RCxlQUFlLE1BQU1DLFdBQVcsU0FBU0gsV0FBVyxDQUFDO0VBRTVDSSxXQUFXQSxDQUFFQyxNQUFjLEVBQUc7SUFDbkMsS0FBSyxDQUFFQSxNQUFNLEVBQUU7TUFDYkMsSUFBSSxFQUFFSixpQkFBaUIsQ0FBQ0ssTUFBTSxDQUFDQyxtQkFBbUI7TUFDbERDLGNBQWMsRUFBRVYsd0JBQXdCLENBQUNXLHFCQUFxQixDQUFDLENBQUM7TUFDaEVDLHVCQUF1QixFQUFFO0lBQzNCLENBQUUsQ0FBQztFQUNMO0FBQ0Y7QUFFQVYsVUFBVSxDQUFDVyxRQUFRLENBQUUsYUFBYSxFQUFFVCxXQUFZLENBQUMifQ==