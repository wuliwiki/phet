// Copyright 2020-2022, University of Colorado Boulder

/**
 * BunnySpriteInstance is a specialization of OrganismSpriteInstance for bunnies.
 * Each instance corresponds to a bunny in the model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import naturalSelection from '../../../naturalSelection.js';
import NaturalSelectionConstants from '../../NaturalSelectionConstants.js';
import OrganismSpriteInstance from './OrganismSpriteInstance.js';
export default class BunnySpriteInstance extends OrganismSpriteInstance {
  constructor(bunny, sprite) {
    super(bunny, sprite, NaturalSelectionConstants.BUNNY_IMAGE_SCALE);
    this.bunny = bunny;
  }
}
naturalSelection.register('BunnySpriteInstance', BunnySpriteInstance);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJuYXR1cmFsU2VsZWN0aW9uIiwiTmF0dXJhbFNlbGVjdGlvbkNvbnN0YW50cyIsIk9yZ2FuaXNtU3ByaXRlSW5zdGFuY2UiLCJCdW5ueVNwcml0ZUluc3RhbmNlIiwiY29uc3RydWN0b3IiLCJidW5ueSIsInNwcml0ZSIsIkJVTk5ZX0lNQUdFX1NDQUxFIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJCdW5ueVNwcml0ZUluc3RhbmNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIEJ1bm55U3ByaXRlSW5zdGFuY2UgaXMgYSBzcGVjaWFsaXphdGlvbiBvZiBPcmdhbmlzbVNwcml0ZUluc3RhbmNlIGZvciBidW5uaWVzLlxyXG4gKiBFYWNoIGluc3RhbmNlIGNvcnJlc3BvbmRzIHRvIGEgYnVubnkgaW4gdGhlIG1vZGVsLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBuYXR1cmFsU2VsZWN0aW9uIGZyb20gJy4uLy4uLy4uL25hdHVyYWxTZWxlY3Rpb24uanMnO1xyXG5pbXBvcnQgQnVubnkgZnJvbSAnLi4vLi4vbW9kZWwvQnVubnkuanMnO1xyXG5pbXBvcnQgTmF0dXJhbFNlbGVjdGlvbkNvbnN0YW50cyBmcm9tICcuLi8uLi9OYXR1cmFsU2VsZWN0aW9uQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IE9yZ2FuaXNtU3ByaXRlSW5zdGFuY2UgZnJvbSAnLi9PcmdhbmlzbVNwcml0ZUluc3RhbmNlLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bm55U3ByaXRlSW5zdGFuY2UgZXh0ZW5kcyBPcmdhbmlzbVNwcml0ZUluc3RhbmNlIHtcclxuXHJcbiAgcHVibGljIHJlYWRvbmx5IGJ1bm55OiBCdW5ueTtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBidW5ueTogQnVubnksIHNwcml0ZTogU3ByaXRlICkge1xyXG4gICAgc3VwZXIoIGJ1bm55LCBzcHJpdGUsIE5hdHVyYWxTZWxlY3Rpb25Db25zdGFudHMuQlVOTllfSU1BR0VfU0NBTEUgKTtcclxuICAgIHRoaXMuYnVubnkgPSBidW5ueTtcclxuICB9XHJcbn1cclxuXHJcbm5hdHVyYWxTZWxlY3Rpb24ucmVnaXN0ZXIoICdCdW5ueVNwcml0ZUluc3RhbmNlJywgQnVubnlTcHJpdGVJbnN0YW5jZSApOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBLE9BQU9BLGdCQUFnQixNQUFNLDhCQUE4QjtBQUUzRCxPQUFPQyx5QkFBeUIsTUFBTSxvQ0FBb0M7QUFDMUUsT0FBT0Msc0JBQXNCLE1BQU0sNkJBQTZCO0FBRWhFLGVBQWUsTUFBTUMsbUJBQW1CLFNBQVNELHNCQUFzQixDQUFDO0VBSS9ERSxXQUFXQSxDQUFFQyxLQUFZLEVBQUVDLE1BQWMsRUFBRztJQUNqRCxLQUFLLENBQUVELEtBQUssRUFBRUMsTUFBTSxFQUFFTCx5QkFBeUIsQ0FBQ00saUJBQWtCLENBQUM7SUFDbkUsSUFBSSxDQUFDRixLQUFLLEdBQUdBLEtBQUs7RUFDcEI7QUFDRjtBQUVBTCxnQkFBZ0IsQ0FBQ1EsUUFBUSxDQUFFLHFCQUFxQixFQUFFTCxtQkFBb0IsQ0FBQyJ9