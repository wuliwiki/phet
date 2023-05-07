// Copyright 2014-2022, University of Colorado Boulder

/**
 * TwoAtomsModel is the model for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import MPModel from '../../common/model/MPModel.js';
import moleculePolarity from '../../moleculePolarity.js';
import DiatomicMolecule from './DiatomicMolecule.js';
export default class TwoAtomsModel extends MPModel {
  constructor(providedOptions) {
    const diatomicMolecule = new DiatomicMolecule({
      position: new Vector2(380, 280),
      tandem: providedOptions.tandem.createTandem('molecule')
    });
    super(diatomicMolecule, providedOptions);
    this.diatomicMolecule = diatomicMolecule;
  }
  dispose() {
    assert && assert(false, 'dispose is not supported, exists for the lifetime of the sim');
    super.dispose();
  }
  reset() {
    this.diatomicMolecule.reset();
    super.reset();
  }
}
moleculePolarity.register('TwoAtomsModel', TwoAtomsModel);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWZWN0b3IyIiwiTVBNb2RlbCIsIm1vbGVjdWxlUG9sYXJpdHkiLCJEaWF0b21pY01vbGVjdWxlIiwiVHdvQXRvbXNNb2RlbCIsImNvbnN0cnVjdG9yIiwicHJvdmlkZWRPcHRpb25zIiwiZGlhdG9taWNNb2xlY3VsZSIsInBvc2l0aW9uIiwidGFuZGVtIiwiY3JlYXRlVGFuZGVtIiwiZGlzcG9zZSIsImFzc2VydCIsInJlc2V0IiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJUd29BdG9tc01vZGVsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE0LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFR3b0F0b21zTW9kZWwgaXMgdGhlIG1vZGVsIGZvciB0aGUgJ1R3byBBdG9tcycgc2NyZWVuLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKi9cclxuXHJcbmltcG9ydCBWZWN0b3IyIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9WZWN0b3IyLmpzJztcclxuaW1wb3J0IE1QTW9kZWwsIHsgTVBNb2RlbE9wdGlvbnMgfSBmcm9tICcuLi8uLi9jb21tb24vbW9kZWwvTVBNb2RlbC5qcyc7XHJcbmltcG9ydCBtb2xlY3VsZVBvbGFyaXR5IGZyb20gJy4uLy4uL21vbGVjdWxlUG9sYXJpdHkuanMnO1xyXG5pbXBvcnQgRGlhdG9taWNNb2xlY3VsZSBmcm9tICcuL0RpYXRvbWljTW9sZWN1bGUuanMnO1xyXG5pbXBvcnQgeyBFbXB0eVNlbGZPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL29wdGlvbml6ZS5qcyc7XHJcblxyXG50eXBlIFNlbGZPcHRpb25zID0gRW1wdHlTZWxmT3B0aW9ucztcclxuXHJcbnR5cGUgVHdvQXRvbXNNb2RlbE9wdGlvbnMgPSBTZWxmT3B0aW9ucyAmIE1QTW9kZWxPcHRpb25zO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHdvQXRvbXNNb2RlbCBleHRlbmRzIE1QTW9kZWwge1xyXG5cclxuICBwdWJsaWMgcmVhZG9ubHkgZGlhdG9taWNNb2xlY3VsZTogRGlhdG9taWNNb2xlY3VsZTtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBwcm92aWRlZE9wdGlvbnM6IFR3b0F0b21zTW9kZWxPcHRpb25zICkge1xyXG5cclxuICAgIGNvbnN0IGRpYXRvbWljTW9sZWN1bGUgPSBuZXcgRGlhdG9taWNNb2xlY3VsZSgge1xyXG4gICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjIoIDM4MCwgMjgwICksXHJcbiAgICAgIHRhbmRlbTogcHJvdmlkZWRPcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdtb2xlY3VsZScgKVxyXG4gICAgfSApO1xyXG5cclxuICAgIHN1cGVyKCBkaWF0b21pY01vbGVjdWxlLCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICB0aGlzLmRpYXRvbWljTW9sZWN1bGUgPSBkaWF0b21pY01vbGVjdWxlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG92ZXJyaWRlIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCBmYWxzZSwgJ2Rpc3Bvc2UgaXMgbm90IHN1cHBvcnRlZCwgZXhpc3RzIGZvciB0aGUgbGlmZXRpbWUgb2YgdGhlIHNpbScgKTtcclxuICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvdmVycmlkZSByZXNldCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZGlhdG9taWNNb2xlY3VsZS5yZXNldCgpO1xyXG4gICAgc3VwZXIucmVzZXQoKTtcclxuICB9XHJcbn1cclxuXHJcbm1vbGVjdWxlUG9sYXJpdHkucmVnaXN0ZXIoICdUd29BdG9tc01vZGVsJywgVHdvQXRvbXNNb2RlbCApOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxPQUFPLE1BQU0sK0JBQStCO0FBQ25ELE9BQU9DLE9BQU8sTUFBMEIsK0JBQStCO0FBQ3ZFLE9BQU9DLGdCQUFnQixNQUFNLDJCQUEyQjtBQUN4RCxPQUFPQyxnQkFBZ0IsTUFBTSx1QkFBdUI7QUFPcEQsZUFBZSxNQUFNQyxhQUFhLFNBQVNILE9BQU8sQ0FBQztFQUkxQ0ksV0FBV0EsQ0FBRUMsZUFBcUMsRUFBRztJQUUxRCxNQUFNQyxnQkFBZ0IsR0FBRyxJQUFJSixnQkFBZ0IsQ0FBRTtNQUM3Q0ssUUFBUSxFQUFFLElBQUlSLE9BQU8sQ0FBRSxHQUFHLEVBQUUsR0FBSSxDQUFDO01BQ2pDUyxNQUFNLEVBQUVILGVBQWUsQ0FBQ0csTUFBTSxDQUFDQyxZQUFZLENBQUUsVUFBVztJQUMxRCxDQUFFLENBQUM7SUFFSCxLQUFLLENBQUVILGdCQUFnQixFQUFFRCxlQUFnQixDQUFDO0lBRTFDLElBQUksQ0FBQ0MsZ0JBQWdCLEdBQUdBLGdCQUFnQjtFQUMxQztFQUVnQkksT0FBT0EsQ0FBQSxFQUFTO0lBQzlCQyxNQUFNLElBQUlBLE1BQU0sQ0FBRSxLQUFLLEVBQUUsOERBQStELENBQUM7SUFDekYsS0FBSyxDQUFDRCxPQUFPLENBQUMsQ0FBQztFQUNqQjtFQUVnQkUsS0FBS0EsQ0FBQSxFQUFTO0lBQzVCLElBQUksQ0FBQ04sZ0JBQWdCLENBQUNNLEtBQUssQ0FBQyxDQUFDO0lBQzdCLEtBQUssQ0FBQ0EsS0FBSyxDQUFDLENBQUM7RUFDZjtBQUNGO0FBRUFYLGdCQUFnQixDQUFDWSxRQUFRLENBQUUsZUFBZSxFQUFFVixhQUFjLENBQUMifQ==