// Copyright 2021-2023, University of Colorado Boulder

/**
 * MirrorScreenView is the view for the 'Mirror' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import GOScreenView from '../../common/view/GOScreenView.js';
import geometricOptics from '../../geometricOptics.js';
import MirrorNode from './MirrorNode.js';
import optionize from '../../../../phet-core/js/optionize.js';
export default class MirrorScreenView extends GOScreenView {
  constructor(model, providedOptions) {
    const options = optionize()({
      // GOScreenViewOptions

      // In the Basics version of the sim, we only have a flat mirror, so all objects can be dragged freely.
      // In the full version of the sim, all non-Arrow objects are drag locked.
      objectDragMode: providedOptions.isBasicsVersion ? 'freeDragging' : model.opticalObjectChoiceProperty.value.type === 'arrow' ? 'freeDragging' : 'horizontalDragging',
      // Basics version has the origin in the center, full version has the origin shifted to the right.
      // Slightly above center of the layoutBounds in both versions.
      getViewOrigin: providedOptions.isBasicsVersion ? layoutBounds => new Vector2(layoutBounds.centerX, layoutBounds.centerY - 35) : layoutBounds => new Vector2(layoutBounds.centerX + 100, layoutBounds.centerY - 35),
      // Creates the Node for the mirror
      createOpticNode: (modelViewTransform, parentTandem) => {
        return new MirrorNode(model.mirror, modelViewTransform, {
          tandem: parentTandem.createTandem('mirrorNode')
        });
      }
    }, providedOptions);
    super(model, options);

    // In the full version of the sim, the toggle button is enabled only for the Arrow object choice, so that the user
    // can change drag modes. Other objects are constrained to 'horizontalDragging', and the button is disabled.
    // In the Basics version, we only have a flat mirror, so the toggle button is enabled for all object choices.
    if (!options.isBasicsVersion) {
      model.opticalObjectChoiceProperty.link(opticalObjectChoice => {
        const isArrowObject = opticalObjectChoice.type === 'arrow';
        this.objectDragModeToggleButton.enabled = isArrowObject;
        this.objectDragModeProperty.value = isArrowObject ? 'freeDragging' : 'horizontalDragging';
      });
    }
  }
}
geometricOptics.register('MirrorScreenView', MirrorScreenView);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWZWN0b3IyIiwiR09TY3JlZW5WaWV3IiwiZ2VvbWV0cmljT3B0aWNzIiwiTWlycm9yTm9kZSIsIm9wdGlvbml6ZSIsIk1pcnJvclNjcmVlblZpZXciLCJjb25zdHJ1Y3RvciIsIm1vZGVsIiwicHJvdmlkZWRPcHRpb25zIiwib3B0aW9ucyIsIm9iamVjdERyYWdNb2RlIiwiaXNCYXNpY3NWZXJzaW9uIiwib3B0aWNhbE9iamVjdENob2ljZVByb3BlcnR5IiwidmFsdWUiLCJ0eXBlIiwiZ2V0Vmlld09yaWdpbiIsImxheW91dEJvdW5kcyIsImNlbnRlclgiLCJjZW50ZXJZIiwiY3JlYXRlT3B0aWNOb2RlIiwibW9kZWxWaWV3VHJhbnNmb3JtIiwicGFyZW50VGFuZGVtIiwibWlycm9yIiwidGFuZGVtIiwiY3JlYXRlVGFuZGVtIiwibGluayIsIm9wdGljYWxPYmplY3RDaG9pY2UiLCJpc0Fycm93T2JqZWN0Iiwib2JqZWN0RHJhZ01vZGVUb2dnbGVCdXR0b24iLCJlbmFibGVkIiwib2JqZWN0RHJhZ01vZGVQcm9wZXJ0eSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiTWlycm9yU2NyZWVuVmlldy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBNaXJyb3JTY3JlZW5WaWV3IGlzIHRoZSB2aWV3IGZvciB0aGUgJ01pcnJvcicgc2NyZWVuLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKi9cclxuXHJcbmltcG9ydCBCb3VuZHMyIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9Cb3VuZHMyLmpzJztcclxuaW1wb3J0IFZlY3RvcjIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1ZlY3RvcjIuanMnO1xyXG5pbXBvcnQgVGFuZGVtIGZyb20gJy4uLy4uLy4uLy4uL3RhbmRlbS9qcy9UYW5kZW0uanMnO1xyXG5pbXBvcnQgR09TY3JlZW5WaWV3LCB7IEdPU2NyZWVuVmlld09wdGlvbnMgfSBmcm9tICcuLi8uLi9jb21tb24vdmlldy9HT1NjcmVlblZpZXcuanMnO1xyXG5pbXBvcnQgZ2VvbWV0cmljT3B0aWNzIGZyb20gJy4uLy4uL2dlb21ldHJpY09wdGljcy5qcyc7XHJcbmltcG9ydCBNaXJyb3JNb2RlbCBmcm9tICcuLi9tb2RlbC9NaXJyb3JNb2RlbC5qcyc7XHJcbmltcG9ydCBNb2RlbFZpZXdUcmFuc2Zvcm0yIGZyb20gJy4uLy4uLy4uLy4uL3BoZXRjb21tb24vanMvdmlldy9Nb2RlbFZpZXdUcmFuc2Zvcm0yLmpzJztcclxuaW1wb3J0IE1pcnJvck5vZGUgZnJvbSAnLi9NaXJyb3JOb2RlLmpzJztcclxuaW1wb3J0IG9wdGlvbml6ZSwgeyBFbXB0eVNlbGZPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL29wdGlvbml6ZS5qcyc7XHJcbmltcG9ydCBPcHRpY2FsT2JqZWN0Q2hvaWNlIGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbC9PcHRpY2FsT2JqZWN0Q2hvaWNlLmpzJztcclxuaW1wb3J0IFBpY2tSZXF1aXJlZCBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvdHlwZXMvUGlja1JlcXVpcmVkLmpzJztcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSBFbXB0eVNlbGZPcHRpb25zO1xyXG5cclxudHlwZSBNaXJyb3JTY3JlZW5WaWV3T3B0aW9ucyA9IFNlbGZPcHRpb25zICYgUGlja1JlcXVpcmVkPEdPU2NyZWVuVmlld09wdGlvbnMsICdpc0Jhc2ljc1ZlcnNpb24nIHwgJ3RhbmRlbScgPjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pcnJvclNjcmVlblZpZXcgZXh0ZW5kcyBHT1NjcmVlblZpZXcge1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIG1vZGVsOiBNaXJyb3JNb2RlbCwgcHJvdmlkZWRPcHRpb25zOiBNaXJyb3JTY3JlZW5WaWV3T3B0aW9ucyApIHtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0gb3B0aW9uaXplPE1pcnJvclNjcmVlblZpZXdPcHRpb25zLCBTZWxmT3B0aW9ucywgR09TY3JlZW5WaWV3T3B0aW9ucz4oKSgge1xyXG4gICAgICAvLyBHT1NjcmVlblZpZXdPcHRpb25zXHJcblxyXG4gICAgICAvLyBJbiB0aGUgQmFzaWNzIHZlcnNpb24gb2YgdGhlIHNpbSwgd2Ugb25seSBoYXZlIGEgZmxhdCBtaXJyb3IsIHNvIGFsbCBvYmplY3RzIGNhbiBiZSBkcmFnZ2VkIGZyZWVseS5cclxuICAgICAgLy8gSW4gdGhlIGZ1bGwgdmVyc2lvbiBvZiB0aGUgc2ltLCBhbGwgbm9uLUFycm93IG9iamVjdHMgYXJlIGRyYWcgbG9ja2VkLlxyXG4gICAgICBvYmplY3REcmFnTW9kZTogcHJvdmlkZWRPcHRpb25zLmlzQmFzaWNzVmVyc2lvbiA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAnZnJlZURyYWdnaW5nJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAoIG1vZGVsLm9wdGljYWxPYmplY3RDaG9pY2VQcm9wZXJ0eS52YWx1ZS50eXBlID09PSAnYXJyb3cnICkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgJ2ZyZWVEcmFnZ2luZycgOiAnaG9yaXpvbnRhbERyYWdnaW5nJyxcclxuXHJcbiAgICAgIC8vIEJhc2ljcyB2ZXJzaW9uIGhhcyB0aGUgb3JpZ2luIGluIHRoZSBjZW50ZXIsIGZ1bGwgdmVyc2lvbiBoYXMgdGhlIG9yaWdpbiBzaGlmdGVkIHRvIHRoZSByaWdodC5cclxuICAgICAgLy8gU2xpZ2h0bHkgYWJvdmUgY2VudGVyIG9mIHRoZSBsYXlvdXRCb3VuZHMgaW4gYm90aCB2ZXJzaW9ucy5cclxuICAgICAgZ2V0Vmlld09yaWdpbjogcHJvdmlkZWRPcHRpb25zLmlzQmFzaWNzVmVyc2lvbiA/XHJcbiAgICAgICAgICAgICAgICAgICAgICggbGF5b3V0Qm91bmRzOiBCb3VuZHMyICkgPT4gbmV3IFZlY3RvcjIoIGxheW91dEJvdW5kcy5jZW50ZXJYLCBsYXlvdXRCb3VuZHMuY2VudGVyWSAtIDM1ICkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAoIGxheW91dEJvdW5kczogQm91bmRzMiApID0+IG5ldyBWZWN0b3IyKCBsYXlvdXRCb3VuZHMuY2VudGVyWCArIDEwMCwgbGF5b3V0Qm91bmRzLmNlbnRlclkgLSAzNSApLFxyXG5cclxuICAgICAgLy8gQ3JlYXRlcyB0aGUgTm9kZSBmb3IgdGhlIG1pcnJvclxyXG4gICAgICBjcmVhdGVPcHRpY05vZGU6ICggbW9kZWxWaWV3VHJhbnNmb3JtOiBNb2RlbFZpZXdUcmFuc2Zvcm0yLCBwYXJlbnRUYW5kZW06IFRhbmRlbSApID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IE1pcnJvck5vZGUoIG1vZGVsLm1pcnJvciwgbW9kZWxWaWV3VHJhbnNmb3JtLCB7XHJcbiAgICAgICAgICB0YW5kZW06IHBhcmVudFRhbmRlbS5jcmVhdGVUYW5kZW0oICdtaXJyb3JOb2RlJyApXHJcbiAgICAgICAgfSApO1xyXG4gICAgICB9XHJcbiAgICB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICBzdXBlciggbW9kZWwsIG9wdGlvbnMgKTtcclxuXHJcbiAgICAvLyBJbiB0aGUgZnVsbCB2ZXJzaW9uIG9mIHRoZSBzaW0sIHRoZSB0b2dnbGUgYnV0dG9uIGlzIGVuYWJsZWQgb25seSBmb3IgdGhlIEFycm93IG9iamVjdCBjaG9pY2UsIHNvIHRoYXQgdGhlIHVzZXJcclxuICAgIC8vIGNhbiBjaGFuZ2UgZHJhZyBtb2Rlcy4gT3RoZXIgb2JqZWN0cyBhcmUgY29uc3RyYWluZWQgdG8gJ2hvcml6b250YWxEcmFnZ2luZycsIGFuZCB0aGUgYnV0dG9uIGlzIGRpc2FibGVkLlxyXG4gICAgLy8gSW4gdGhlIEJhc2ljcyB2ZXJzaW9uLCB3ZSBvbmx5IGhhdmUgYSBmbGF0IG1pcnJvciwgc28gdGhlIHRvZ2dsZSBidXR0b24gaXMgZW5hYmxlZCBmb3IgYWxsIG9iamVjdCBjaG9pY2VzLlxyXG4gICAgaWYgKCAhb3B0aW9ucy5pc0Jhc2ljc1ZlcnNpb24gKSB7XHJcbiAgICAgIG1vZGVsLm9wdGljYWxPYmplY3RDaG9pY2VQcm9wZXJ0eS5saW5rKCAoIG9wdGljYWxPYmplY3RDaG9pY2U6IE9wdGljYWxPYmplY3RDaG9pY2UgKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXNBcnJvd09iamVjdCA9ICggb3B0aWNhbE9iamVjdENob2ljZS50eXBlID09PSAnYXJyb3cnICk7XHJcbiAgICAgICAgdGhpcy5vYmplY3REcmFnTW9kZVRvZ2dsZUJ1dHRvbi5lbmFibGVkID0gaXNBcnJvd09iamVjdDtcclxuICAgICAgICB0aGlzLm9iamVjdERyYWdNb2RlUHJvcGVydHkudmFsdWUgPSBpc0Fycm93T2JqZWN0ID8gJ2ZyZWVEcmFnZ2luZycgOiAnaG9yaXpvbnRhbERyYWdnaW5nJztcclxuICAgICAgfSApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZ2VvbWV0cmljT3B0aWNzLnJlZ2lzdGVyKCAnTWlycm9yU2NyZWVuVmlldycsIE1pcnJvclNjcmVlblZpZXcgKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0EsT0FBT0EsT0FBTyxNQUFNLCtCQUErQjtBQUVuRCxPQUFPQyxZQUFZLE1BQStCLG1DQUFtQztBQUNyRixPQUFPQyxlQUFlLE1BQU0sMEJBQTBCO0FBR3RELE9BQU9DLFVBQVUsTUFBTSxpQkFBaUI7QUFDeEMsT0FBT0MsU0FBUyxNQUE0Qix1Q0FBdUM7QUFRbkYsZUFBZSxNQUFNQyxnQkFBZ0IsU0FBU0osWUFBWSxDQUFDO0VBRWxESyxXQUFXQSxDQUFFQyxLQUFrQixFQUFFQyxlQUF3QyxFQUFHO0lBRWpGLE1BQU1DLE9BQU8sR0FBR0wsU0FBUyxDQUE0RCxDQUFDLENBQUU7TUFDdEY7O01BRUE7TUFDQTtNQUNBTSxjQUFjLEVBQUVGLGVBQWUsQ0FBQ0csZUFBZSxHQUMvQixjQUFjLEdBQ1pKLEtBQUssQ0FBQ0ssMkJBQTJCLENBQUNDLEtBQUssQ0FBQ0MsSUFBSSxLQUFLLE9BQU8sR0FDMUQsY0FBYyxHQUFHLG9CQUFvQjtNQUVyRDtNQUNBO01BQ0FDLGFBQWEsRUFBRVAsZUFBZSxDQUFDRyxlQUFlLEdBQzdCSyxZQUFxQixJQUFNLElBQUloQixPQUFPLENBQUVnQixZQUFZLENBQUNDLE9BQU8sRUFBRUQsWUFBWSxDQUFDRSxPQUFPLEdBQUcsRUFBRyxDQUFDLEdBQ3pGRixZQUFxQixJQUFNLElBQUloQixPQUFPLENBQUVnQixZQUFZLENBQUNDLE9BQU8sR0FBRyxHQUFHLEVBQUVELFlBQVksQ0FBQ0UsT0FBTyxHQUFHLEVBQUcsQ0FBQztNQUVoSDtNQUNBQyxlQUFlLEVBQUVBLENBQUVDLGtCQUF1QyxFQUFFQyxZQUFvQixLQUFNO1FBQ3BGLE9BQU8sSUFBSWxCLFVBQVUsQ0FBRUksS0FBSyxDQUFDZSxNQUFNLEVBQUVGLGtCQUFrQixFQUFFO1VBQ3ZERyxNQUFNLEVBQUVGLFlBQVksQ0FBQ0csWUFBWSxDQUFFLFlBQWE7UUFDbEQsQ0FBRSxDQUFDO01BQ0w7SUFDRixDQUFDLEVBQUVoQixlQUFnQixDQUFDO0lBRXBCLEtBQUssQ0FBRUQsS0FBSyxFQUFFRSxPQUFRLENBQUM7O0lBRXZCO0lBQ0E7SUFDQTtJQUNBLElBQUssQ0FBQ0EsT0FBTyxDQUFDRSxlQUFlLEVBQUc7TUFDOUJKLEtBQUssQ0FBQ0ssMkJBQTJCLENBQUNhLElBQUksQ0FBSUMsbUJBQXdDLElBQU07UUFDdEYsTUFBTUMsYUFBYSxHQUFLRCxtQkFBbUIsQ0FBQ1osSUFBSSxLQUFLLE9BQVM7UUFDOUQsSUFBSSxDQUFDYywwQkFBMEIsQ0FBQ0MsT0FBTyxHQUFHRixhQUFhO1FBQ3ZELElBQUksQ0FBQ0csc0JBQXNCLENBQUNqQixLQUFLLEdBQUdjLGFBQWEsR0FBRyxjQUFjLEdBQUcsb0JBQW9CO01BQzNGLENBQUUsQ0FBQztJQUNMO0VBQ0Y7QUFDRjtBQUVBekIsZUFBZSxDQUFDNkIsUUFBUSxDQUFFLGtCQUFrQixFQUFFMUIsZ0JBQWlCLENBQUMifQ==