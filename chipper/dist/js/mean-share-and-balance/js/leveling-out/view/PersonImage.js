// Copyright 2022, University of Colorado Boulder

/**
 * The node containing the image of each sim person.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import meanShareAndBalance from '../../meanShareAndBalance.js';
import { Image } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
export default class PersonImage extends Image {
  constructor(image, plate, providedOptions) {
    const options = optionize()({
      scale: 0.3,
      centerX: plate.centerX,
      bottom: plate.bottom - 55
    }, providedOptions);
    super(image, options);
  }
}
meanShareAndBalance.register('PersonImage', PersonImage);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtZWFuU2hhcmVBbmRCYWxhbmNlIiwiSW1hZ2UiLCJvcHRpb25pemUiLCJQZXJzb25JbWFnZSIsImNvbnN0cnVjdG9yIiwiaW1hZ2UiLCJwbGF0ZSIsInByb3ZpZGVkT3B0aW9ucyIsIm9wdGlvbnMiLCJzY2FsZSIsImNlbnRlclgiLCJib3R0b20iLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlBlcnNvbkltYWdlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBUaGUgbm9kZSBjb250YWluaW5nIHRoZSBpbWFnZSBvZiBlYWNoIHNpbSBwZXJzb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgTWFybGEgU2NodWx6IChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKlxyXG4gKi9cclxuXHJcbmltcG9ydCBtZWFuU2hhcmVBbmRCYWxhbmNlIGZyb20gJy4uLy4uL21lYW5TaGFyZUFuZEJhbGFuY2UuanMnO1xyXG5pbXBvcnQgeyBJbWFnZSwgSW1hZ2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IFBpY2tSZXF1aXJlZCBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvdHlwZXMvUGlja1JlcXVpcmVkLmpzJztcclxuaW1wb3J0IG9wdGlvbml6ZSwgeyBFbXB0eVNlbGZPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL29wdGlvbml6ZS5qcyc7XHJcbmltcG9ydCBUYWJsZVBsYXRlTm9kZSBmcm9tICcuL1RhYmxlUGxhdGVOb2RlLmpzJztcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSBFbXB0eVNlbGZPcHRpb25zO1xyXG50eXBlIFBlcnNvbkltYWdlT3B0aW9ucyA9IFNlbGZPcHRpb25zICYgUGlja1JlcXVpcmVkPEltYWdlT3B0aW9ucywgJ3RhbmRlbSc+ICYgSW1hZ2VPcHRpb25zO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVyc29uSW1hZ2UgZXh0ZW5kcyBJbWFnZSB7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsIHBsYXRlOiBUYWJsZVBsYXRlTm9kZSwgcHJvdmlkZWRPcHRpb25zOiBQZXJzb25JbWFnZU9wdGlvbnMgKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gb3B0aW9uaXplPFBlcnNvbkltYWdlT3B0aW9ucywgU2VsZk9wdGlvbnMsIEltYWdlT3B0aW9ucz4oKSgge1xyXG4gICAgICBzY2FsZTogMC4zLFxyXG4gICAgICBjZW50ZXJYOiBwbGF0ZS5jZW50ZXJYLFxyXG4gICAgICBib3R0b206IHBsYXRlLmJvdHRvbSAtIDU1XHJcbiAgICB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICBzdXBlciggaW1hZ2UsIG9wdGlvbnMgKTtcclxuICB9XHJcbn1cclxuXHJcbm1lYW5TaGFyZUFuZEJhbGFuY2UucmVnaXN0ZXIoICdQZXJzb25JbWFnZScsIFBlcnNvbkltYWdlICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsbUJBQW1CLE1BQU0sOEJBQThCO0FBQzlELFNBQVNDLEtBQUssUUFBc0IsbUNBQW1DO0FBRXZFLE9BQU9DLFNBQVMsTUFBNEIsdUNBQXVDO0FBTW5GLGVBQWUsTUFBTUMsV0FBVyxTQUFTRixLQUFLLENBQUM7RUFFdENHLFdBQVdBLENBQUVDLEtBQXVCLEVBQUVDLEtBQXFCLEVBQUVDLGVBQW1DLEVBQUc7SUFDeEcsTUFBTUMsT0FBTyxHQUFHTixTQUFTLENBQWdELENBQUMsQ0FBRTtNQUMxRU8sS0FBSyxFQUFFLEdBQUc7TUFDVkMsT0FBTyxFQUFFSixLQUFLLENBQUNJLE9BQU87TUFDdEJDLE1BQU0sRUFBRUwsS0FBSyxDQUFDSyxNQUFNLEdBQUc7SUFDekIsQ0FBQyxFQUFFSixlQUFnQixDQUFDO0lBRXBCLEtBQUssQ0FBRUYsS0FBSyxFQUFFRyxPQUFRLENBQUM7RUFDekI7QUFDRjtBQUVBUixtQkFBbUIsQ0FBQ1ksUUFBUSxDQUFFLGFBQWEsRUFBRVQsV0FBWSxDQUFDIn0=