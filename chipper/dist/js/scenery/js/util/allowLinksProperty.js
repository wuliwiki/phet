// Copyright 2022, University of Colorado Boulder

/**
 * Whether links should be openable
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import Tandem from '../../../tandem/js/Tandem.js';
import { scenery } from '../imports.js';
const allowLinksProperty = new BooleanProperty(!window?.phet?.chipper?.queryParameters || window?.phet?.chipper?.queryParameters?.allowLinks, {
  tandem: Tandem.GENERAL_MODEL.createTandem('allowLinksProperty')
});
scenery.register('allowLinksProperty', allowLinksProperty);
export default allowLinksProperty;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCb29sZWFuUHJvcGVydHkiLCJUYW5kZW0iLCJzY2VuZXJ5IiwiYWxsb3dMaW5rc1Byb3BlcnR5Iiwid2luZG93IiwicGhldCIsImNoaXBwZXIiLCJxdWVyeVBhcmFtZXRlcnMiLCJhbGxvd0xpbmtzIiwidGFuZGVtIiwiR0VORVJBTF9NT0RFTCIsImNyZWF0ZVRhbmRlbSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiYWxsb3dMaW5rc1Byb3BlcnR5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBXaGV0aGVyIGxpbmtzIHNob3VsZCBiZSBvcGVuYWJsZVxyXG4gKlxyXG4gKiBAYXV0aG9yIEpvbmF0aGFuIE9sc29uIDxqb25hdGhhbi5vbHNvbkBjb2xvcmFkby5lZHU+XHJcbiAqL1xyXG5pbXBvcnQgQm9vbGVhblByb3BlcnR5IGZyb20gJy4uLy4uLy4uL2F4b24vanMvQm9vbGVhblByb3BlcnR5LmpzJztcclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuaW1wb3J0IHsgc2NlbmVyeSB9IGZyb20gJy4uL2ltcG9ydHMuanMnO1xyXG5cclxuY29uc3QgYWxsb3dMaW5rc1Byb3BlcnR5ID0gbmV3IEJvb2xlYW5Qcm9wZXJ0eSggISggd2luZG93Py5waGV0Py5jaGlwcGVyPy5xdWVyeVBhcmFtZXRlcnMgKSB8fCAoIHdpbmRvdz8ucGhldD8uY2hpcHBlcj8ucXVlcnlQYXJhbWV0ZXJzPy5hbGxvd0xpbmtzICksIHtcclxuICB0YW5kZW06IFRhbmRlbS5HRU5FUkFMX01PREVMLmNyZWF0ZVRhbmRlbSggJ2FsbG93TGlua3NQcm9wZXJ0eScgKVxyXG59ICk7XHJcblxyXG5zY2VuZXJ5LnJlZ2lzdGVyKCAnYWxsb3dMaW5rc1Byb3BlcnR5JywgYWxsb3dMaW5rc1Byb3BlcnR5ICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhbGxvd0xpbmtzUHJvcGVydHk7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU9BLGVBQWUsTUFBTSxxQ0FBcUM7QUFDakUsT0FBT0MsTUFBTSxNQUFNLDhCQUE4QjtBQUNqRCxTQUFTQyxPQUFPLFFBQVEsZUFBZTtBQUV2QyxNQUFNQyxrQkFBa0IsR0FBRyxJQUFJSCxlQUFlLENBQUUsQ0FBR0ksTUFBTSxFQUFFQyxJQUFJLEVBQUVDLE9BQU8sRUFBRUMsZUFBaUIsSUFBTUgsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLE9BQU8sRUFBRUMsZUFBZSxFQUFFQyxVQUFZLEVBQUU7RUFDckpDLE1BQU0sRUFBRVIsTUFBTSxDQUFDUyxhQUFhLENBQUNDLFlBQVksQ0FBRSxvQkFBcUI7QUFDbEUsQ0FBRSxDQUFDO0FBRUhULE9BQU8sQ0FBQ1UsUUFBUSxDQUFFLG9CQUFvQixFQUFFVCxrQkFBbUIsQ0FBQztBQUU1RCxlQUFlQSxrQkFBa0IifQ==