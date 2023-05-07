// Copyright 2022, University of Colorado Boulder

/**
 * Types related to particles (molecules, atoms, and ions).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

// Keys of all the possible particles that appear in this sim.
// Used as the key for various Maps, and in tandem names.
export const ParticleKeyValues = ['A', 'B', 'BH', 'H2O', 'H3O', 'HA', 'M', 'MOH', 'OH'];

// Data structure that describes a particle.
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQYXJ0aWNsZUtleVZhbHVlcyJdLCJzb3VyY2VzIjpbIlBhcnRpY2xlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBUeXBlcyByZWxhdGVkIHRvIHBhcnRpY2xlcyAobW9sZWN1bGVzLCBhdG9tcywgYW5kIGlvbnMpLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuXHJcbi8vIEtleXMgb2YgYWxsIHRoZSBwb3NzaWJsZSBwYXJ0aWNsZXMgdGhhdCBhcHBlYXIgaW4gdGhpcyBzaW0uXHJcbi8vIFVzZWQgYXMgdGhlIGtleSBmb3IgdmFyaW91cyBNYXBzLCBhbmQgaW4gdGFuZGVtIG5hbWVzLlxyXG5leHBvcnQgY29uc3QgUGFydGljbGVLZXlWYWx1ZXMgPSBbICdBJywgJ0InLCAnQkgnLCAnSDJPJywgJ0gzTycsICdIQScsICdNJywgJ01PSCcsICdPSCcgXSBhcyBjb25zdDtcclxuZXhwb3J0IHR5cGUgUGFydGljbGVLZXkgPSAoIHR5cGVvZiBQYXJ0aWNsZUtleVZhbHVlcyApW251bWJlcl07XHJcblxyXG4vLyBEYXRhIHN0cnVjdHVyZSB0aGF0IGRlc2NyaWJlcyBhIHBhcnRpY2xlLlxyXG5leHBvcnQgdHlwZSBQYXJ0aWNsZSA9IHtcclxuICBrZXk6IFBhcnRpY2xlS2V5OyAvLyB1c2VkIHRvIGxvb2sgdXAgdGhlIHBhcnRpY2xlIGluIHZhcmlvdXMgTWFwc1xyXG4gIGNvbG9yOiBDb2xvciB8IHN0cmluZzsgLy8gY29sb3IgdXNlZCB0byByZW5kZXIgdGhlIHBhcnRpY2xlXHJcbiAgZ2V0Q29uY2VudHJhdGlvbjogKCkgPT4gbnVtYmVyOyAvLyByZXR1cm5zIHRoZSBjb25jZW50cmF0aW9uIG9mIHRoZSBwYXJ0aWNsZVxyXG59OyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFJQTtBQUNBO0FBQ0EsT0FBTyxNQUFNQSxpQkFBaUIsR0FBRyxDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFXOztBQUdsRyJ9