// Copyright 2018-2022, University of Colorado Boulder

/**
 * ExploreViewProperties defines Properties that are specific to the view in the 'Explore' screen.
 * It adds no additional Properties to the base class, but is provided for symmetry in the model-view type hierarchy.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import IdealGasLawViewProperties from '../../common/view/IdealGasLawViewProperties.js';
import gasProperties from '../../gasProperties.js';
export default class ExploreViewProperties extends IdealGasLawViewProperties {
  constructor(tandem) {
    super(tandem);
  }
}
gasProperties.register('ExploreViewProperties', ExploreViewProperties);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJJZGVhbEdhc0xhd1ZpZXdQcm9wZXJ0aWVzIiwiZ2FzUHJvcGVydGllcyIsIkV4cGxvcmVWaWV3UHJvcGVydGllcyIsImNvbnN0cnVjdG9yIiwidGFuZGVtIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJFeHBsb3JlVmlld1Byb3BlcnRpZXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogRXhwbG9yZVZpZXdQcm9wZXJ0aWVzIGRlZmluZXMgUHJvcGVydGllcyB0aGF0IGFyZSBzcGVjaWZpYyB0byB0aGUgdmlldyBpbiB0aGUgJ0V4cGxvcmUnIHNjcmVlbi5cclxuICogSXQgYWRkcyBubyBhZGRpdGlvbmFsIFByb3BlcnRpZXMgdG8gdGhlIGJhc2UgY2xhc3MsIGJ1dCBpcyBwcm92aWRlZCBmb3Igc3ltbWV0cnkgaW4gdGhlIG1vZGVsLXZpZXcgdHlwZSBoaWVyYXJjaHkuXHJcbiAqXHJcbiAqIEBhdXRob3IgQ2hyaXMgTWFsbGV5IChQaXhlbFpvb20sIEluYy4pXHJcbiAqL1xyXG5cclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi8uLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuaW1wb3J0IElkZWFsR2FzTGF3Vmlld1Byb3BlcnRpZXMgZnJvbSAnLi4vLi4vY29tbW9uL3ZpZXcvSWRlYWxHYXNMYXdWaWV3UHJvcGVydGllcy5qcyc7XHJcbmltcG9ydCBnYXNQcm9wZXJ0aWVzIGZyb20gJy4uLy4uL2dhc1Byb3BlcnRpZXMuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwbG9yZVZpZXdQcm9wZXJ0aWVzIGV4dGVuZHMgSWRlYWxHYXNMYXdWaWV3UHJvcGVydGllcyB7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggdGFuZGVtOiBUYW5kZW0gKSB7XHJcbiAgICBzdXBlciggdGFuZGVtICk7XHJcbiAgfVxyXG59XHJcblxyXG5nYXNQcm9wZXJ0aWVzLnJlZ2lzdGVyKCAnRXhwbG9yZVZpZXdQcm9wZXJ0aWVzJywgRXhwbG9yZVZpZXdQcm9wZXJ0aWVzICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0EsT0FBT0EseUJBQXlCLE1BQU0sZ0RBQWdEO0FBQ3RGLE9BQU9DLGFBQWEsTUFBTSx3QkFBd0I7QUFFbEQsZUFBZSxNQUFNQyxxQkFBcUIsU0FBU0YseUJBQXlCLENBQUM7RUFFcEVHLFdBQVdBLENBQUVDLE1BQWMsRUFBRztJQUNuQyxLQUFLLENBQUVBLE1BQU8sQ0FBQztFQUNqQjtBQUNGO0FBRUFILGFBQWEsQ0FBQ0ksUUFBUSxDQUFFLHVCQUF1QixFQUFFSCxxQkFBc0IsQ0FBQyJ9