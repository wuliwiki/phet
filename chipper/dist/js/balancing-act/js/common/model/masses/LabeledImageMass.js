// Copyright 2013-2021, University of Colorado Boulder

/**
 * This is an extension of the ImageMass type that adds a textual label.  This
 * was created in support of a request to label the mystery masses with
 * translatable labels.
 *
 * @author John Blanco
 */

import balancingAct from '../../../balancingAct.js';
import ImageMass from '../ImageMass.js';
class LabeledImageMass extends ImageMass {
  /**
   * @param {Vector2} initialPosition
   * @param {Object} config - configuration information for the labeled image mass
   */
  constructor(initialPosition, config) {
    super(config.massValue, config.image, config.height, initialPosition, config.isMystery, config);
    this.labelText = config.labelText;
  }
}
balancingAct.register('LabeledImageMass', LabeledImageMass);
export default LabeledImageMass;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJiYWxhbmNpbmdBY3QiLCJJbWFnZU1hc3MiLCJMYWJlbGVkSW1hZ2VNYXNzIiwiY29uc3RydWN0b3IiLCJpbml0aWFsUG9zaXRpb24iLCJjb25maWciLCJtYXNzVmFsdWUiLCJpbWFnZSIsImhlaWdodCIsImlzTXlzdGVyeSIsImxhYmVsVGV4dCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiTGFiZWxlZEltYWdlTWFzcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxMy0yMDIxLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIGFuIGV4dGVuc2lvbiBvZiB0aGUgSW1hZ2VNYXNzIHR5cGUgdGhhdCBhZGRzIGEgdGV4dHVhbCBsYWJlbC4gIFRoaXNcclxuICogd2FzIGNyZWF0ZWQgaW4gc3VwcG9ydCBvZiBhIHJlcXVlc3QgdG8gbGFiZWwgdGhlIG15c3RlcnkgbWFzc2VzIHdpdGhcclxuICogdHJhbnNsYXRhYmxlIGxhYmVscy5cclxuICpcclxuICogQGF1dGhvciBKb2huIEJsYW5jb1xyXG4gKi9cclxuXHJcbmltcG9ydCBiYWxhbmNpbmdBY3QgZnJvbSAnLi4vLi4vLi4vYmFsYW5jaW5nQWN0LmpzJztcclxuaW1wb3J0IEltYWdlTWFzcyBmcm9tICcuLi9JbWFnZU1hc3MuanMnO1xyXG5cclxuY2xhc3MgTGFiZWxlZEltYWdlTWFzcyBleHRlbmRzIEltYWdlTWFzcyB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yMn0gaW5pdGlhbFBvc2l0aW9uXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIGNvbmZpZ3VyYXRpb24gaW5mb3JtYXRpb24gZm9yIHRoZSBsYWJlbGVkIGltYWdlIG1hc3NcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggaW5pdGlhbFBvc2l0aW9uLCBjb25maWcgKSB7XHJcbiAgICBzdXBlciggY29uZmlnLm1hc3NWYWx1ZSwgY29uZmlnLmltYWdlLCBjb25maWcuaGVpZ2h0LCBpbml0aWFsUG9zaXRpb24sIGNvbmZpZy5pc015c3RlcnksIGNvbmZpZyApO1xyXG4gICAgdGhpcy5sYWJlbFRleHQgPSBjb25maWcubGFiZWxUZXh0O1xyXG4gIH1cclxufVxyXG5cclxuYmFsYW5jaW5nQWN0LnJlZ2lzdGVyKCAnTGFiZWxlZEltYWdlTWFzcycsIExhYmVsZWRJbWFnZU1hc3MgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhYmVsZWRJbWFnZU1hc3M7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxZQUFZLE1BQU0sMEJBQTBCO0FBQ25ELE9BQU9DLFNBQVMsTUFBTSxpQkFBaUI7QUFFdkMsTUFBTUMsZ0JBQWdCLFNBQVNELFNBQVMsQ0FBQztFQUV2QztBQUNGO0FBQ0E7QUFDQTtFQUNFRSxXQUFXQSxDQUFFQyxlQUFlLEVBQUVDLE1BQU0sRUFBRztJQUNyQyxLQUFLLENBQUVBLE1BQU0sQ0FBQ0MsU0FBUyxFQUFFRCxNQUFNLENBQUNFLEtBQUssRUFBRUYsTUFBTSxDQUFDRyxNQUFNLEVBQUVKLGVBQWUsRUFBRUMsTUFBTSxDQUFDSSxTQUFTLEVBQUVKLE1BQU8sQ0FBQztJQUNqRyxJQUFJLENBQUNLLFNBQVMsR0FBR0wsTUFBTSxDQUFDSyxTQUFTO0VBQ25DO0FBQ0Y7QUFFQVYsWUFBWSxDQUFDVyxRQUFRLENBQUUsa0JBQWtCLEVBQUVULGdCQUFpQixDQUFDO0FBRTdELGVBQWVBLGdCQUFnQiJ9