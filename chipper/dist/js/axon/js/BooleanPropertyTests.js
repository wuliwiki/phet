// Copyright 2017-2022, University of Colorado Boulder

/**
 * QUnit Tests for BooleanProperty
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanIO from '../../tandem/js/types/BooleanIO.js';
import BooleanProperty from './BooleanProperty.js';
QUnit.module('BooleanProperty');
QUnit.test('BooleanProperty', assert => {
  let fixtureProperty;
  window.assert && assert.throws(() => {
    // @ts-expect-error INTENTIONAL, this is purposefully failing typescript checks for testing
    fixtureProperty = new BooleanProperty('hello');
  }, 'invalid initial value');
  fixtureProperty = new BooleanProperty(true);
  fixtureProperty.set(true);
  fixtureProperty.set(false);
  fixtureProperty.set(true);
  window.assert && assert.throws(() => {
    // @ts-expect-error INTENTIONAL, this is purposefully failing typescript checks for testing
    fixtureProperty.set(123);
  }, 'invalid set value');
  window.assert && assert.throws(() => {
    //@ts-expect-error INTENTIONAL, force set phetioType for testing.
    fixtureProperty = new BooleanProperty(true, {
      phetioType: BooleanIO
    });
  }, 'BooleanProperty');
  assert.ok(true, 'so we have at least 1 test in this set');
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCb29sZWFuSU8iLCJCb29sZWFuUHJvcGVydHkiLCJRVW5pdCIsIm1vZHVsZSIsInRlc3QiLCJhc3NlcnQiLCJmaXh0dXJlUHJvcGVydHkiLCJ3aW5kb3ciLCJ0aHJvd3MiLCJzZXQiLCJwaGV0aW9UeXBlIiwib2siXSwic291cmNlcyI6WyJCb29sZWFuUHJvcGVydHlUZXN0cy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNy0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBRVW5pdCBUZXN0cyBmb3IgQm9vbGVhblByb3BlcnR5XHJcbiAqXHJcbiAqIEBhdXRob3IgU2FtIFJlaWQgKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqIEBhdXRob3IgQ2hyaXMgTWFsbGV5IChQaXhlbFpvb20sIEluYy4pXHJcbiAqL1xyXG5cclxuaW1wb3J0IEJvb2xlYW5JTyBmcm9tICcuLi8uLi90YW5kZW0vanMvdHlwZXMvQm9vbGVhbklPLmpzJztcclxuaW1wb3J0IEJvb2xlYW5Qcm9wZXJ0eSBmcm9tICcuL0Jvb2xlYW5Qcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBQcm9wZXJ0eSBmcm9tICcuL1Byb3BlcnR5LmpzJztcclxuXHJcblFVbml0Lm1vZHVsZSggJ0Jvb2xlYW5Qcm9wZXJ0eScgKTtcclxuUVVuaXQudGVzdCggJ0Jvb2xlYW5Qcm9wZXJ0eScsIGFzc2VydCA9PiB7XHJcblxyXG4gIGxldCBmaXh0dXJlUHJvcGVydHk6IFByb3BlcnR5PGJvb2xlYW4+O1xyXG5cclxuICB3aW5kb3cuYXNzZXJ0ICYmIGFzc2VydC50aHJvd3MoICgpID0+IHtcclxuXHJcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIElOVEVOVElPTkFMLCB0aGlzIGlzIHB1cnBvc2VmdWxseSBmYWlsaW5nIHR5cGVzY3JpcHQgY2hlY2tzIGZvciB0ZXN0aW5nXHJcbiAgICBmaXh0dXJlUHJvcGVydHkgPSBuZXcgQm9vbGVhblByb3BlcnR5KCAnaGVsbG8nICk7XHJcbiAgfSwgJ2ludmFsaWQgaW5pdGlhbCB2YWx1ZScgKTtcclxuXHJcbiAgZml4dHVyZVByb3BlcnR5ID0gbmV3IEJvb2xlYW5Qcm9wZXJ0eSggdHJ1ZSApO1xyXG4gIGZpeHR1cmVQcm9wZXJ0eS5zZXQoIHRydWUgKTtcclxuICBmaXh0dXJlUHJvcGVydHkuc2V0KCBmYWxzZSApO1xyXG4gIGZpeHR1cmVQcm9wZXJ0eS5zZXQoIHRydWUgKTtcclxuICB3aW5kb3cuYXNzZXJ0ICYmIGFzc2VydC50aHJvd3MoICgpID0+IHtcclxuXHJcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIElOVEVOVElPTkFMLCB0aGlzIGlzIHB1cnBvc2VmdWxseSBmYWlsaW5nIHR5cGVzY3JpcHQgY2hlY2tzIGZvciB0ZXN0aW5nXHJcbiAgICBmaXh0dXJlUHJvcGVydHkuc2V0KCAxMjMgKTtcclxuICB9LCAnaW52YWxpZCBzZXQgdmFsdWUnICk7XHJcblxyXG4gIHdpbmRvdy5hc3NlcnQgJiYgYXNzZXJ0LnRocm93cyggKCkgPT4ge1xyXG5cclxuICAgIC8vQHRzLWV4cGVjdC1lcnJvciBJTlRFTlRJT05BTCwgZm9yY2Ugc2V0IHBoZXRpb1R5cGUgZm9yIHRlc3RpbmcuXHJcbiAgICBmaXh0dXJlUHJvcGVydHkgPSBuZXcgQm9vbGVhblByb3BlcnR5KCB0cnVlLCB7IHBoZXRpb1R5cGU6IEJvb2xlYW5JTyB9ICk7XHJcbiAgfSwgJ0Jvb2xlYW5Qcm9wZXJ0eScgKTtcclxuXHJcbiAgYXNzZXJ0Lm9rKCB0cnVlLCAnc28gd2UgaGF2ZSBhdCBsZWFzdCAxIHRlc3QgaW4gdGhpcyBzZXQnICk7XHJcbn0gKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxTQUFTLE1BQU0sb0NBQW9DO0FBQzFELE9BQU9DLGVBQWUsTUFBTSxzQkFBc0I7QUFHbERDLEtBQUssQ0FBQ0MsTUFBTSxDQUFFLGlCQUFrQixDQUFDO0FBQ2pDRCxLQUFLLENBQUNFLElBQUksQ0FBRSxpQkFBaUIsRUFBRUMsTUFBTSxJQUFJO0VBRXZDLElBQUlDLGVBQWtDO0VBRXRDQyxNQUFNLENBQUNGLE1BQU0sSUFBSUEsTUFBTSxDQUFDRyxNQUFNLENBQUUsTUFBTTtJQUVwQztJQUNBRixlQUFlLEdBQUcsSUFBSUwsZUFBZSxDQUFFLE9BQVEsQ0FBQztFQUNsRCxDQUFDLEVBQUUsdUJBQXdCLENBQUM7RUFFNUJLLGVBQWUsR0FBRyxJQUFJTCxlQUFlLENBQUUsSUFBSyxDQUFDO0VBQzdDSyxlQUFlLENBQUNHLEdBQUcsQ0FBRSxJQUFLLENBQUM7RUFDM0JILGVBQWUsQ0FBQ0csR0FBRyxDQUFFLEtBQU0sQ0FBQztFQUM1QkgsZUFBZSxDQUFDRyxHQUFHLENBQUUsSUFBSyxDQUFDO0VBQzNCRixNQUFNLENBQUNGLE1BQU0sSUFBSUEsTUFBTSxDQUFDRyxNQUFNLENBQUUsTUFBTTtJQUVwQztJQUNBRixlQUFlLENBQUNHLEdBQUcsQ0FBRSxHQUFJLENBQUM7RUFDNUIsQ0FBQyxFQUFFLG1CQUFvQixDQUFDO0VBRXhCRixNQUFNLENBQUNGLE1BQU0sSUFBSUEsTUFBTSxDQUFDRyxNQUFNLENBQUUsTUFBTTtJQUVwQztJQUNBRixlQUFlLEdBQUcsSUFBSUwsZUFBZSxDQUFFLElBQUksRUFBRTtNQUFFUyxVQUFVLEVBQUVWO0lBQVUsQ0FBRSxDQUFDO0VBQzFFLENBQUMsRUFBRSxpQkFBa0IsQ0FBQztFQUV0QkssTUFBTSxDQUFDTSxFQUFFLENBQUUsSUFBSSxFQUFFLHdDQUF5QyxDQUFDO0FBQzdELENBQUUsQ0FBQyJ9