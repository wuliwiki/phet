// Copyright 2022, University of Colorado Boulder

/**
 * LightSceneNode is the view of the 'Light' scene, the scene that has light objects.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Martin Veillette
 */

import geometricOptics from '../../geometricOptics.js';
import GOColors from '../../common/GOColors.js';
import RealLightRaysNode from './RealLightRaysNode.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import ProjectionScreenNode from './ProjectionScreenNode.js';
import LightSpotNode from './LightSpotNode.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import LightObjectNode from './LightObjectNode.js';
import OpticalAxisInFrontOfProjectionScreenNode from './OpticalAxisInFrontOfProjectionScreenNode.js';
import GOSceneNode from './GOSceneNode.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import ToolJumpPoint from '../model/tools/ToolJumpPoint.js';
export default class LightSceneNode extends GOSceneNode {
  // See GOSceneNode

  // Visibility of things that have labels, intended to be used to control the visibility of associated labels.

  // Resets things that are specific to this class.

  /**
   * @param scene - model element
   * @param visibleProperties
   * @param modelViewTransform
   * @param modelVisibleBoundsProperty - ScreenView's visibleBounds in the model coordinate frame, with the zoom transform applied
   * @param sceneBoundsProperty - bounds for the scene, in model coordinates
   * @param raysTypeProperty - representation used for rays
   * @param lightPropagationEnabledProperty - is light propagation enabled?
   * @param providedOptions
   */
  constructor(scene, visibleProperties, modelViewTransform, modelVisibleBoundsProperty, sceneBoundsProperty, raysTypeProperty, lightPropagationEnabledProperty, providedOptions) {
    super(scene, visibleProperties, modelViewTransform, modelVisibleBoundsProperty, sceneBoundsProperty, raysTypeProperty, providedOptions);
    this.scene = scene;
    const lightWasDraggedProperty = new BooleanProperty(false, {
      tandem: providedOptions.tandem.createTandem('lightWasDraggedProperty'),
      phetioReadOnly: true,
      phetioDocumentation: 'Was either light dragged? Dragging either light hides the cueing arrows for both lights.'
    });

    // First light
    const lightObject1Node = new LightObjectNode(scene.lightObject1, sceneBoundsProperty, scene.lens.positionProperty, modelViewTransform, providedOptions.objectDragModeProperty, lightWasDraggedProperty, {
      tandem: providedOptions.tandem.createTandem('lightObject1Node')
    });
    this.opticalObjectsLayer.addChild(lightObject1Node);

    // Second light
    const lightObject2Node = new LightObjectNode(scene.lightObject2, sceneBoundsProperty, scene.lens.positionProperty, modelViewTransform, providedOptions.objectDragModeProperty, lightWasDraggedProperty, {
      visibleProperty: visibleProperties.secondPointVisibleProperty,
      tandem: providedOptions.tandem.createTandem('lightObject2Node')
    });
    this.opticalObjectsLayer.addChild(lightObject2Node);

    // The part of the optical axis that appears to be in front of the projection screen
    const opticalAxisForegroundNode = new OpticalAxisInFrontOfProjectionScreenNode(scene.lens.positionProperty, scene.projectionScreen.positionProperty, modelVisibleBoundsProperty, modelViewTransform, {
      visibleProperty: visibleProperties.opticalAxisVisibleProperty
    });
    this.opticalAxisForegroundLayer.addChild(opticalAxisForegroundNode);

    // Real light rays associated with the first light.
    // Note that virtual rays are not shown in this scene, because no optical image is being formed.
    const realLightRays1Node = new RealLightRaysNode(scene.lightRays1, modelViewTransform, {
      stroke: GOColors.rays1StrokeProperty,
      visibleProperty: lightPropagationEnabledProperty
    });
    this.raysForegroundLayer.addChild(realLightRays1Node);

    // Real light rays associated with the second light.
    // Note that virtual rays are not shown in this scene, because no optical image is being formed.
    const realLightRays2Node = new RealLightRaysNode(scene.lightRays2, modelViewTransform, {
      stroke: GOColors.rays2StrokeProperty,
      visibleProperty: DerivedProperty.and([lightPropagationEnabledProperty, visibleProperties.secondPointVisibleProperty])
    });
    this.raysForegroundLayer.addChild(realLightRays2Node);

    // Projection screen
    const projectionScreenNode = new ProjectionScreenNode(scene.projectionScreen, scene.lens.positionProperty, sceneBoundsProperty, modelViewTransform, {
      tandem: providedOptions.tandem.createTandem('projectionScreenNode')
    });
    this.opticalImagesLayer.addChild(projectionScreenNode);

    // LightSpot associated with the first light
    const lightSpot1NodeTandem = providedOptions.tandem.createTandem('lightSpot1Node');
    const lightSpot1Node = new LightSpotNode(scene.lightSpot1, scene.projectionScreen, modelViewTransform, {
      visibleProperty: DerivedProperty.and([scene.lightSpot1.intersectsProjectionScreenProperty, lightPropagationEnabledProperty, scene.opticalImage1.visibleProperty], {
        tandem: lightSpot1NodeTandem.createTandem('visibleProperty'),
        phetioValueType: BooleanIO
      }),
      tandem: providedOptions.tandem.createTandem('lightSpot1Node')
    });
    this.opticalImagesLayer.addChild(lightSpot1Node);

    // LightSpot associated with the second light
    const lightSpot2NodeTandem = providedOptions.tandem.createTandem('lightSpot2Node');
    const lightSpot2Node = new LightSpotNode(scene.lightSpot2, scene.projectionScreen, modelViewTransform, {
      visibleProperty: DerivedProperty.and([scene.lightSpot2.intersectsProjectionScreenProperty, lightPropagationEnabledProperty, scene.opticalImage2.visibleProperty, visibleProperties.secondPointVisibleProperty], {
        tandem: lightSpot2NodeTandem.createTandem('visibleProperty'),
        phetioValueType: BooleanIO
      }),
      tandem: lightSpot2NodeTandem
    });
    this.opticalImagesLayer.addChild(lightSpot2Node);

    // Add things that are interactive in this scene to the focus traversal order.
    this.pdomOrder = [lightObject1Node, lightObject2Node, projectionScreenNode];

    // Tool jump points that are common to both lens shapes.
    const commonJumpPoints = [
    // from base class
    ...this.opticJumpPoints,
    // optical objects
    new ToolJumpPoint(scene.lightObject1.positionProperty, lightObject1Node.visibleProperty), new ToolJumpPoint(scene.lightObject2.positionProperty, lightObject2Node.visibleProperty)];

    // 'J' hotkey will cycle tools through these points, dynamically looking at left-to-right x coordinate.
    this.toolJumpPoints = [...commonJumpPoints];

    // Jump points that are interesting only for convex lenses.
    // See https://github.com/phetsims/geometric-optics/issues/426
    const convexJumpPoints = [
    // light spots on the projection screen
    {
      positionProperty: scene.lightSpot1.positionProperty,
      visibleProperty: lightSpot1Node.visibleProperty
    }, {
      positionProperty: scene.lightSpot2.positionProperty,
      visibleProperty: lightSpot2Node.visibleProperty
    }];

    // Adjust the tool jump points based on the surface type of the lens.
    // The tools have a reference to this.toolJumpPoints, so it's important that this array is modified in place.
    scene.lens.opticSurfaceTypeProperty.link(opticSurfaceType => {
      if (opticSurfaceType === 'convex') {
        // Add jump points that are interesting only for a convex lens. We're checking points before pushing
        // them in case there's any PhET-iO funny business, so we don't end up with duplicate points in the array.
        convexJumpPoints.forEach(jumpPoint => {
          if (!this.toolJumpPoints.includes(jumpPoint)) {
            this.toolJumpPoints.push(jumpPoint);
          }
        });
        assert && assert(this.toolJumpPoints.length === commonJumpPoints.length + convexJumpPoints.length);
      } else {
        // Remove jump points that are interesting only for a convex lens.
        // We're confirming that the points are in the array in case there's any PhET-iO funny business.
        convexJumpPoints.forEach(jumpPoint => {
          const index = this.toolJumpPoints.indexOf(jumpPoint);
          index !== -1 && this.toolJumpPoints.splice(index, 1);
        });
        assert && assert(this.toolJumpPoints.length === commonJumpPoints.length);
      }
    });

    // Visibility for associates labels
    this.lightObject1NodeVisibleProperty = lightObject1Node.visibleProperty;
    this.lightObject2NodeVisibleProperty = lightObject2Node.visibleProperty;
    this.projectionScreenNodeVisibleProperty = projectionScreenNode.visibleProperty;
    this.resetLightObjectSceneNode = () => {
      lightWasDraggedProperty.reset();
      projectionScreenNode.reset();
    };
  }
  reset() {
    this.resetLightObjectSceneNode();
  }
}
geometricOptics.register('LightSceneNode', LightSceneNode);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJnZW9tZXRyaWNPcHRpY3MiLCJHT0NvbG9ycyIsIlJlYWxMaWdodFJheXNOb2RlIiwiQm9vbGVhblByb3BlcnR5IiwiUHJvamVjdGlvblNjcmVlbk5vZGUiLCJMaWdodFNwb3ROb2RlIiwiRGVyaXZlZFByb3BlcnR5IiwiTGlnaHRPYmplY3ROb2RlIiwiT3B0aWNhbEF4aXNJbkZyb250T2ZQcm9qZWN0aW9uU2NyZWVuTm9kZSIsIkdPU2NlbmVOb2RlIiwiQm9vbGVhbklPIiwiVG9vbEp1bXBQb2ludCIsIkxpZ2h0U2NlbmVOb2RlIiwiY29uc3RydWN0b3IiLCJzY2VuZSIsInZpc2libGVQcm9wZXJ0aWVzIiwibW9kZWxWaWV3VHJhbnNmb3JtIiwibW9kZWxWaXNpYmxlQm91bmRzUHJvcGVydHkiLCJzY2VuZUJvdW5kc1Byb3BlcnR5IiwicmF5c1R5cGVQcm9wZXJ0eSIsImxpZ2h0UHJvcGFnYXRpb25FbmFibGVkUHJvcGVydHkiLCJwcm92aWRlZE9wdGlvbnMiLCJsaWdodFdhc0RyYWdnZWRQcm9wZXJ0eSIsInRhbmRlbSIsImNyZWF0ZVRhbmRlbSIsInBoZXRpb1JlYWRPbmx5IiwicGhldGlvRG9jdW1lbnRhdGlvbiIsImxpZ2h0T2JqZWN0MU5vZGUiLCJsaWdodE9iamVjdDEiLCJsZW5zIiwicG9zaXRpb25Qcm9wZXJ0eSIsIm9iamVjdERyYWdNb2RlUHJvcGVydHkiLCJvcHRpY2FsT2JqZWN0c0xheWVyIiwiYWRkQ2hpbGQiLCJsaWdodE9iamVjdDJOb2RlIiwibGlnaHRPYmplY3QyIiwidmlzaWJsZVByb3BlcnR5Iiwic2Vjb25kUG9pbnRWaXNpYmxlUHJvcGVydHkiLCJvcHRpY2FsQXhpc0ZvcmVncm91bmROb2RlIiwicHJvamVjdGlvblNjcmVlbiIsIm9wdGljYWxBeGlzVmlzaWJsZVByb3BlcnR5Iiwib3B0aWNhbEF4aXNGb3JlZ3JvdW5kTGF5ZXIiLCJyZWFsTGlnaHRSYXlzMU5vZGUiLCJsaWdodFJheXMxIiwic3Ryb2tlIiwicmF5czFTdHJva2VQcm9wZXJ0eSIsInJheXNGb3JlZ3JvdW5kTGF5ZXIiLCJyZWFsTGlnaHRSYXlzMk5vZGUiLCJsaWdodFJheXMyIiwicmF5czJTdHJva2VQcm9wZXJ0eSIsImFuZCIsInByb2plY3Rpb25TY3JlZW5Ob2RlIiwib3B0aWNhbEltYWdlc0xheWVyIiwibGlnaHRTcG90MU5vZGVUYW5kZW0iLCJsaWdodFNwb3QxTm9kZSIsImxpZ2h0U3BvdDEiLCJpbnRlcnNlY3RzUHJvamVjdGlvblNjcmVlblByb3BlcnR5Iiwib3B0aWNhbEltYWdlMSIsInBoZXRpb1ZhbHVlVHlwZSIsImxpZ2h0U3BvdDJOb2RlVGFuZGVtIiwibGlnaHRTcG90Mk5vZGUiLCJsaWdodFNwb3QyIiwib3B0aWNhbEltYWdlMiIsInBkb21PcmRlciIsImNvbW1vbkp1bXBQb2ludHMiLCJvcHRpY0p1bXBQb2ludHMiLCJ0b29sSnVtcFBvaW50cyIsImNvbnZleEp1bXBQb2ludHMiLCJvcHRpY1N1cmZhY2VUeXBlUHJvcGVydHkiLCJsaW5rIiwib3B0aWNTdXJmYWNlVHlwZSIsImZvckVhY2giLCJqdW1wUG9pbnQiLCJpbmNsdWRlcyIsInB1c2giLCJhc3NlcnQiLCJsZW5ndGgiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJsaWdodE9iamVjdDFOb2RlVmlzaWJsZVByb3BlcnR5IiwibGlnaHRPYmplY3QyTm9kZVZpc2libGVQcm9wZXJ0eSIsInByb2plY3Rpb25TY3JlZW5Ob2RlVmlzaWJsZVByb3BlcnR5IiwicmVzZXRMaWdodE9iamVjdFNjZW5lTm9kZSIsInJlc2V0IiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJMaWdodFNjZW5lTm9kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogTGlnaHRTY2VuZU5vZGUgaXMgdGhlIHZpZXcgb2YgdGhlICdMaWdodCcgc2NlbmUsIHRoZSBzY2VuZSB0aGF0IGhhcyBsaWdodCBvYmplY3RzLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKiBAYXV0aG9yIE1hcnRpbiBWZWlsbGV0dGVcclxuICovXHJcblxyXG5pbXBvcnQgTW9kZWxWaWV3VHJhbnNmb3JtMiBmcm9tICcuLi8uLi8uLi8uLi9waGV0Y29tbW9uL2pzL3ZpZXcvTW9kZWxWaWV3VHJhbnNmb3JtMi5qcyc7XHJcbmltcG9ydCBnZW9tZXRyaWNPcHRpY3MgZnJvbSAnLi4vLi4vZ2VvbWV0cmljT3B0aWNzLmpzJztcclxuaW1wb3J0IFZpc2libGVQcm9wZXJ0aWVzIGZyb20gJy4vVmlzaWJsZVByb3BlcnRpZXMuanMnO1xyXG5pbXBvcnQgQm91bmRzMiBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvQm91bmRzMi5qcyc7XHJcbmltcG9ydCBUUmVhZE9ubHlQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL1RSZWFkT25seVByb3BlcnR5LmpzJztcclxuaW1wb3J0IHsgUmF5c1R5cGUgfSBmcm9tICcuLi9tb2RlbC9SYXlzVHlwZS5qcyc7XHJcbmltcG9ydCBHT0NvbG9ycyBmcm9tICcuLi8uLi9jb21tb24vR09Db2xvcnMuanMnO1xyXG5pbXBvcnQgUmVhbExpZ2h0UmF5c05vZGUgZnJvbSAnLi9SZWFsTGlnaHRSYXlzTm9kZS5qcyc7XHJcbmltcG9ydCBCb29sZWFuUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9Cb29sZWFuUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgTGlnaHRTY2VuZSBmcm9tICcuLi9tb2RlbC9MaWdodFNjZW5lLmpzJztcclxuaW1wb3J0IFByb2plY3Rpb25TY3JlZW5Ob2RlIGZyb20gJy4vUHJvamVjdGlvblNjcmVlbk5vZGUuanMnO1xyXG5pbXBvcnQgTGlnaHRTcG90Tm9kZSBmcm9tICcuL0xpZ2h0U3BvdE5vZGUuanMnO1xyXG5pbXBvcnQgRGVyaXZlZFByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvRGVyaXZlZFByb3BlcnR5LmpzJztcclxuaW1wb3J0IExpZ2h0T2JqZWN0Tm9kZSBmcm9tICcuL0xpZ2h0T2JqZWN0Tm9kZS5qcyc7XHJcbmltcG9ydCBPcHRpY2FsQXhpc0luRnJvbnRPZlByb2plY3Rpb25TY3JlZW5Ob2RlIGZyb20gJy4vT3B0aWNhbEF4aXNJbkZyb250T2ZQcm9qZWN0aW9uU2NyZWVuTm9kZS5qcyc7XHJcbmltcG9ydCBHT1NjZW5lTm9kZSwgeyBHT1NjZW5lTm9kZU9wdGlvbnMgfSBmcm9tICcuL0dPU2NlbmVOb2RlLmpzJztcclxuaW1wb3J0IEJvb2xlYW5JTyBmcm9tICcuLi8uLi8uLi8uLi90YW5kZW0vanMvdHlwZXMvQm9vbGVhbklPLmpzJztcclxuaW1wb3J0IFRvb2xKdW1wUG9pbnQgZnJvbSAnLi4vbW9kZWwvdG9vbHMvVG9vbEp1bXBQb2ludC5qcyc7XHJcbmltcG9ydCB7IE9iamVjdERyYWdNb2RlIH0gZnJvbSAnLi9PYmplY3REcmFnTW9kZS5qcyc7XHJcblxyXG50eXBlIFNlbGZPcHRpb25zID0ge1xyXG4gIG9iamVjdERyYWdNb2RlUHJvcGVydHk6IFRSZWFkT25seVByb3BlcnR5PE9iamVjdERyYWdNb2RlPjtcclxufTtcclxuXHJcbnR5cGUgTGlnaHRPYmplY3RTY2VuZU5vZGVPcHRpb25zID0gU2VsZk9wdGlvbnMgJiBHT1NjZW5lTm9kZU9wdGlvbnM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaWdodFNjZW5lTm9kZSBleHRlbmRzIEdPU2NlbmVOb2RlIHtcclxuXHJcbiAgLy8gU2VlIEdPU2NlbmVOb2RlXHJcbiAgcHVibGljIHJlYWRvbmx5IHRvb2xKdW1wUG9pbnRzOiBUb29sSnVtcFBvaW50W107XHJcblxyXG4gIHB1YmxpYyByZWFkb25seSBzY2VuZTogTGlnaHRTY2VuZTtcclxuXHJcbiAgLy8gVmlzaWJpbGl0eSBvZiB0aGluZ3MgdGhhdCBoYXZlIGxhYmVscywgaW50ZW5kZWQgdG8gYmUgdXNlZCB0byBjb250cm9sIHRoZSB2aXNpYmlsaXR5IG9mIGFzc29jaWF0ZWQgbGFiZWxzLlxyXG4gIHB1YmxpYyByZWFkb25seSBsaWdodE9iamVjdDFOb2RlVmlzaWJsZVByb3BlcnR5OiBUUmVhZE9ubHlQcm9wZXJ0eTxib29sZWFuPjtcclxuICBwdWJsaWMgcmVhZG9ubHkgbGlnaHRPYmplY3QyTm9kZVZpc2libGVQcm9wZXJ0eTogVFJlYWRPbmx5UHJvcGVydHk8Ym9vbGVhbj47XHJcbiAgcHVibGljIHJlYWRvbmx5IHByb2plY3Rpb25TY3JlZW5Ob2RlVmlzaWJsZVByb3BlcnR5OiBUUmVhZE9ubHlQcm9wZXJ0eTxib29sZWFuPjtcclxuXHJcbiAgLy8gUmVzZXRzIHRoaW5ncyB0aGF0IGFyZSBzcGVjaWZpYyB0byB0aGlzIGNsYXNzLlxyXG4gIHByaXZhdGUgcmVhZG9ubHkgcmVzZXRMaWdodE9iamVjdFNjZW5lTm9kZTogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHNjZW5lIC0gbW9kZWwgZWxlbWVudFxyXG4gICAqIEBwYXJhbSB2aXNpYmxlUHJvcGVydGllc1xyXG4gICAqIEBwYXJhbSBtb2RlbFZpZXdUcmFuc2Zvcm1cclxuICAgKiBAcGFyYW0gbW9kZWxWaXNpYmxlQm91bmRzUHJvcGVydHkgLSBTY3JlZW5WaWV3J3MgdmlzaWJsZUJvdW5kcyBpbiB0aGUgbW9kZWwgY29vcmRpbmF0ZSBmcmFtZSwgd2l0aCB0aGUgem9vbSB0cmFuc2Zvcm0gYXBwbGllZFxyXG4gICAqIEBwYXJhbSBzY2VuZUJvdW5kc1Byb3BlcnR5IC0gYm91bmRzIGZvciB0aGUgc2NlbmUsIGluIG1vZGVsIGNvb3JkaW5hdGVzXHJcbiAgICogQHBhcmFtIHJheXNUeXBlUHJvcGVydHkgLSByZXByZXNlbnRhdGlvbiB1c2VkIGZvciByYXlzXHJcbiAgICogQHBhcmFtIGxpZ2h0UHJvcGFnYXRpb25FbmFibGVkUHJvcGVydHkgLSBpcyBsaWdodCBwcm9wYWdhdGlvbiBlbmFibGVkP1xyXG4gICAqIEBwYXJhbSBwcm92aWRlZE9wdGlvbnNcclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIHNjZW5lOiBMaWdodFNjZW5lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZVByb3BlcnRpZXM6IFZpc2libGVQcm9wZXJ0aWVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgbW9kZWxWaWV3VHJhbnNmb3JtOiBNb2RlbFZpZXdUcmFuc2Zvcm0yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgbW9kZWxWaXNpYmxlQm91bmRzUHJvcGVydHk6IFRSZWFkT25seVByb3BlcnR5PEJvdW5kczI+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgc2NlbmVCb3VuZHNQcm9wZXJ0eTogVFJlYWRPbmx5UHJvcGVydHk8Qm91bmRzMj4sXHJcbiAgICAgICAgICAgICAgICAgICAgICByYXlzVHlwZVByb3BlcnR5OiBUUmVhZE9ubHlQcm9wZXJ0eTxSYXlzVHlwZT4sXHJcbiAgICAgICAgICAgICAgICAgICAgICBsaWdodFByb3BhZ2F0aW9uRW5hYmxlZFByb3BlcnR5OiBUUmVhZE9ubHlQcm9wZXJ0eTxib29sZWFuPixcclxuICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVkT3B0aW9uczogTGlnaHRPYmplY3RTY2VuZU5vZGVPcHRpb25zICkge1xyXG5cclxuICAgIHN1cGVyKCBzY2VuZSwgdmlzaWJsZVByb3BlcnRpZXMsIG1vZGVsVmlld1RyYW5zZm9ybSwgbW9kZWxWaXNpYmxlQm91bmRzUHJvcGVydHksIHNjZW5lQm91bmRzUHJvcGVydHksIHJheXNUeXBlUHJvcGVydHksIHByb3ZpZGVkT3B0aW9ucyApO1xyXG5cclxuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuXHJcbiAgICBjb25zdCBsaWdodFdhc0RyYWdnZWRQcm9wZXJ0eSA9IG5ldyBCb29sZWFuUHJvcGVydHkoIGZhbHNlLCB7XHJcbiAgICAgIHRhbmRlbTogcHJvdmlkZWRPcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdsaWdodFdhc0RyYWdnZWRQcm9wZXJ0eScgKSxcclxuICAgICAgcGhldGlvUmVhZE9ubHk6IHRydWUsXHJcbiAgICAgIHBoZXRpb0RvY3VtZW50YXRpb246ICdXYXMgZWl0aGVyIGxpZ2h0IGRyYWdnZWQ/IERyYWdnaW5nIGVpdGhlciBsaWdodCBoaWRlcyB0aGUgY3VlaW5nIGFycm93cyBmb3IgYm90aCBsaWdodHMuJ1xyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIEZpcnN0IGxpZ2h0XHJcbiAgICBjb25zdCBsaWdodE9iamVjdDFOb2RlID0gbmV3IExpZ2h0T2JqZWN0Tm9kZSggc2NlbmUubGlnaHRPYmplY3QxLCBzY2VuZUJvdW5kc1Byb3BlcnR5LCBzY2VuZS5sZW5zLnBvc2l0aW9uUHJvcGVydHksXHJcbiAgICAgIG1vZGVsVmlld1RyYW5zZm9ybSwgcHJvdmlkZWRPcHRpb25zLm9iamVjdERyYWdNb2RlUHJvcGVydHksIGxpZ2h0V2FzRHJhZ2dlZFByb3BlcnR5LCB7XHJcbiAgICAgICAgdGFuZGVtOiBwcm92aWRlZE9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ2xpZ2h0T2JqZWN0MU5vZGUnIClcclxuICAgICAgfSApO1xyXG4gICAgdGhpcy5vcHRpY2FsT2JqZWN0c0xheWVyLmFkZENoaWxkKCBsaWdodE9iamVjdDFOb2RlICk7XHJcblxyXG4gICAgLy8gU2Vjb25kIGxpZ2h0XHJcbiAgICBjb25zdCBsaWdodE9iamVjdDJOb2RlID0gbmV3IExpZ2h0T2JqZWN0Tm9kZSggc2NlbmUubGlnaHRPYmplY3QyLCBzY2VuZUJvdW5kc1Byb3BlcnR5LCBzY2VuZS5sZW5zLnBvc2l0aW9uUHJvcGVydHksXHJcbiAgICAgIG1vZGVsVmlld1RyYW5zZm9ybSwgcHJvdmlkZWRPcHRpb25zLm9iamVjdERyYWdNb2RlUHJvcGVydHksIGxpZ2h0V2FzRHJhZ2dlZFByb3BlcnR5LCB7XHJcbiAgICAgICAgdmlzaWJsZVByb3BlcnR5OiB2aXNpYmxlUHJvcGVydGllcy5zZWNvbmRQb2ludFZpc2libGVQcm9wZXJ0eSxcclxuICAgICAgICB0YW5kZW06IHByb3ZpZGVkT3B0aW9ucy50YW5kZW0uY3JlYXRlVGFuZGVtKCAnbGlnaHRPYmplY3QyTm9kZScgKVxyXG4gICAgICB9ICk7XHJcbiAgICB0aGlzLm9wdGljYWxPYmplY3RzTGF5ZXIuYWRkQ2hpbGQoIGxpZ2h0T2JqZWN0Mk5vZGUgKTtcclxuXHJcbiAgICAvLyBUaGUgcGFydCBvZiB0aGUgb3B0aWNhbCBheGlzIHRoYXQgYXBwZWFycyB0byBiZSBpbiBmcm9udCBvZiB0aGUgcHJvamVjdGlvbiBzY3JlZW5cclxuICAgIGNvbnN0IG9wdGljYWxBeGlzRm9yZWdyb3VuZE5vZGUgPSBuZXcgT3B0aWNhbEF4aXNJbkZyb250T2ZQcm9qZWN0aW9uU2NyZWVuTm9kZShcclxuICAgICAgc2NlbmUubGVucy5wb3NpdGlvblByb3BlcnR5LFxyXG4gICAgICBzY2VuZS5wcm9qZWN0aW9uU2NyZWVuLnBvc2l0aW9uUHJvcGVydHksXHJcbiAgICAgIG1vZGVsVmlzaWJsZUJvdW5kc1Byb3BlcnR5LFxyXG4gICAgICBtb2RlbFZpZXdUcmFuc2Zvcm0sIHtcclxuICAgICAgICB2aXNpYmxlUHJvcGVydHk6IHZpc2libGVQcm9wZXJ0aWVzLm9wdGljYWxBeGlzVmlzaWJsZVByb3BlcnR5XHJcbiAgICAgIH0gKTtcclxuICAgIHRoaXMub3B0aWNhbEF4aXNGb3JlZ3JvdW5kTGF5ZXIuYWRkQ2hpbGQoIG9wdGljYWxBeGlzRm9yZWdyb3VuZE5vZGUgKTtcclxuXHJcbiAgICAvLyBSZWFsIGxpZ2h0IHJheXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBmaXJzdCBsaWdodC5cclxuICAgIC8vIE5vdGUgdGhhdCB2aXJ0dWFsIHJheXMgYXJlIG5vdCBzaG93biBpbiB0aGlzIHNjZW5lLCBiZWNhdXNlIG5vIG9wdGljYWwgaW1hZ2UgaXMgYmVpbmcgZm9ybWVkLlxyXG4gICAgY29uc3QgcmVhbExpZ2h0UmF5czFOb2RlID0gbmV3IFJlYWxMaWdodFJheXNOb2RlKCBzY2VuZS5saWdodFJheXMxLCBtb2RlbFZpZXdUcmFuc2Zvcm0sIHtcclxuICAgICAgc3Ryb2tlOiBHT0NvbG9ycy5yYXlzMVN0cm9rZVByb3BlcnR5LFxyXG4gICAgICB2aXNpYmxlUHJvcGVydHk6IGxpZ2h0UHJvcGFnYXRpb25FbmFibGVkUHJvcGVydHlcclxuICAgIH0gKTtcclxuICAgIHRoaXMucmF5c0ZvcmVncm91bmRMYXllci5hZGRDaGlsZCggcmVhbExpZ2h0UmF5czFOb2RlICk7XHJcblxyXG4gICAgLy8gUmVhbCBsaWdodCByYXlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgc2Vjb25kIGxpZ2h0LlxyXG4gICAgLy8gTm90ZSB0aGF0IHZpcnR1YWwgcmF5cyBhcmUgbm90IHNob3duIGluIHRoaXMgc2NlbmUsIGJlY2F1c2Ugbm8gb3B0aWNhbCBpbWFnZSBpcyBiZWluZyBmb3JtZWQuXHJcbiAgICBjb25zdCByZWFsTGlnaHRSYXlzMk5vZGUgPSBuZXcgUmVhbExpZ2h0UmF5c05vZGUoIHNjZW5lLmxpZ2h0UmF5czIsIG1vZGVsVmlld1RyYW5zZm9ybSwge1xyXG4gICAgICBzdHJva2U6IEdPQ29sb3JzLnJheXMyU3Ryb2tlUHJvcGVydHksXHJcbiAgICAgIHZpc2libGVQcm9wZXJ0eTogRGVyaXZlZFByb3BlcnR5LmFuZCggWyBsaWdodFByb3BhZ2F0aW9uRW5hYmxlZFByb3BlcnR5LCB2aXNpYmxlUHJvcGVydGllcy5zZWNvbmRQb2ludFZpc2libGVQcm9wZXJ0eSBdIClcclxuICAgIH0gKTtcclxuICAgIHRoaXMucmF5c0ZvcmVncm91bmRMYXllci5hZGRDaGlsZCggcmVhbExpZ2h0UmF5czJOb2RlICk7XHJcblxyXG4gICAgLy8gUHJvamVjdGlvbiBzY3JlZW5cclxuICAgIGNvbnN0IHByb2plY3Rpb25TY3JlZW5Ob2RlID0gbmV3IFByb2plY3Rpb25TY3JlZW5Ob2RlKFxyXG4gICAgICBzY2VuZS5wcm9qZWN0aW9uU2NyZWVuLFxyXG4gICAgICBzY2VuZS5sZW5zLnBvc2l0aW9uUHJvcGVydHksXHJcbiAgICAgIHNjZW5lQm91bmRzUHJvcGVydHksXHJcbiAgICAgIG1vZGVsVmlld1RyYW5zZm9ybSwge1xyXG4gICAgICAgIHRhbmRlbTogcHJvdmlkZWRPcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdwcm9qZWN0aW9uU2NyZWVuTm9kZScgKVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgdGhpcy5vcHRpY2FsSW1hZ2VzTGF5ZXIuYWRkQ2hpbGQoIHByb2plY3Rpb25TY3JlZW5Ob2RlICk7XHJcblxyXG4gICAgLy8gTGlnaHRTcG90IGFzc29jaWF0ZWQgd2l0aCB0aGUgZmlyc3QgbGlnaHRcclxuICAgIGNvbnN0IGxpZ2h0U3BvdDFOb2RlVGFuZGVtID0gcHJvdmlkZWRPcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdsaWdodFNwb3QxTm9kZScgKTtcclxuICAgIGNvbnN0IGxpZ2h0U3BvdDFOb2RlID0gbmV3IExpZ2h0U3BvdE5vZGUoIHNjZW5lLmxpZ2h0U3BvdDEsIHNjZW5lLnByb2plY3Rpb25TY3JlZW4sIG1vZGVsVmlld1RyYW5zZm9ybSwge1xyXG4gICAgICB2aXNpYmxlUHJvcGVydHk6IERlcml2ZWRQcm9wZXJ0eS5hbmQoIFtcclxuICAgICAgICBzY2VuZS5saWdodFNwb3QxLmludGVyc2VjdHNQcm9qZWN0aW9uU2NyZWVuUHJvcGVydHksXHJcbiAgICAgICAgbGlnaHRQcm9wYWdhdGlvbkVuYWJsZWRQcm9wZXJ0eSxcclxuICAgICAgICBzY2VuZS5vcHRpY2FsSW1hZ2UxLnZpc2libGVQcm9wZXJ0eVxyXG4gICAgICBdLCB7XHJcbiAgICAgICAgdGFuZGVtOiBsaWdodFNwb3QxTm9kZVRhbmRlbS5jcmVhdGVUYW5kZW0oICd2aXNpYmxlUHJvcGVydHknICksXHJcbiAgICAgICAgcGhldGlvVmFsdWVUeXBlOiBCb29sZWFuSU9cclxuICAgICAgfSApLFxyXG4gICAgICB0YW5kZW06IHByb3ZpZGVkT3B0aW9ucy50YW5kZW0uY3JlYXRlVGFuZGVtKCAnbGlnaHRTcG90MU5vZGUnIClcclxuICAgIH0gKTtcclxuICAgIHRoaXMub3B0aWNhbEltYWdlc0xheWVyLmFkZENoaWxkKCBsaWdodFNwb3QxTm9kZSApO1xyXG5cclxuICAgIC8vIExpZ2h0U3BvdCBhc3NvY2lhdGVkIHdpdGggdGhlIHNlY29uZCBsaWdodFxyXG4gICAgY29uc3QgbGlnaHRTcG90Mk5vZGVUYW5kZW0gPSBwcm92aWRlZE9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ2xpZ2h0U3BvdDJOb2RlJyApO1xyXG4gICAgY29uc3QgbGlnaHRTcG90Mk5vZGUgPSBuZXcgTGlnaHRTcG90Tm9kZSggc2NlbmUubGlnaHRTcG90Miwgc2NlbmUucHJvamVjdGlvblNjcmVlbiwgbW9kZWxWaWV3VHJhbnNmb3JtLCB7XHJcbiAgICAgIHZpc2libGVQcm9wZXJ0eTogRGVyaXZlZFByb3BlcnR5LmFuZCggW1xyXG4gICAgICAgIHNjZW5lLmxpZ2h0U3BvdDIuaW50ZXJzZWN0c1Byb2plY3Rpb25TY3JlZW5Qcm9wZXJ0eSxcclxuICAgICAgICBsaWdodFByb3BhZ2F0aW9uRW5hYmxlZFByb3BlcnR5LFxyXG4gICAgICAgIHNjZW5lLm9wdGljYWxJbWFnZTIudmlzaWJsZVByb3BlcnR5LFxyXG4gICAgICAgIHZpc2libGVQcm9wZXJ0aWVzLnNlY29uZFBvaW50VmlzaWJsZVByb3BlcnR5XHJcbiAgICAgIF0sIHtcclxuICAgICAgICB0YW5kZW06IGxpZ2h0U3BvdDJOb2RlVGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3Zpc2libGVQcm9wZXJ0eScgKSxcclxuICAgICAgICBwaGV0aW9WYWx1ZVR5cGU6IEJvb2xlYW5JT1xyXG4gICAgICB9ICksXHJcbiAgICAgIHRhbmRlbTogbGlnaHRTcG90Mk5vZGVUYW5kZW1cclxuICAgIH0gKTtcclxuICAgIHRoaXMub3B0aWNhbEltYWdlc0xheWVyLmFkZENoaWxkKCBsaWdodFNwb3QyTm9kZSApO1xyXG5cclxuICAgIC8vIEFkZCB0aGluZ3MgdGhhdCBhcmUgaW50ZXJhY3RpdmUgaW4gdGhpcyBzY2VuZSB0byB0aGUgZm9jdXMgdHJhdmVyc2FsIG9yZGVyLlxyXG4gICAgdGhpcy5wZG9tT3JkZXIgPSBbXHJcbiAgICAgIGxpZ2h0T2JqZWN0MU5vZGUsXHJcbiAgICAgIGxpZ2h0T2JqZWN0Mk5vZGUsXHJcbiAgICAgIHByb2plY3Rpb25TY3JlZW5Ob2RlXHJcbiAgICBdO1xyXG5cclxuICAgIC8vIFRvb2wganVtcCBwb2ludHMgdGhhdCBhcmUgY29tbW9uIHRvIGJvdGggbGVucyBzaGFwZXMuXHJcbiAgICBjb25zdCBjb21tb25KdW1wUG9pbnRzID0gW1xyXG5cclxuICAgICAgLy8gZnJvbSBiYXNlIGNsYXNzXHJcbiAgICAgIC4uLnRoaXMub3B0aWNKdW1wUG9pbnRzLFxyXG5cclxuICAgICAgLy8gb3B0aWNhbCBvYmplY3RzXHJcbiAgICAgIG5ldyBUb29sSnVtcFBvaW50KCBzY2VuZS5saWdodE9iamVjdDEucG9zaXRpb25Qcm9wZXJ0eSwgbGlnaHRPYmplY3QxTm9kZS52aXNpYmxlUHJvcGVydHkgKSxcclxuICAgICAgbmV3IFRvb2xKdW1wUG9pbnQoIHNjZW5lLmxpZ2h0T2JqZWN0Mi5wb3NpdGlvblByb3BlcnR5LCBsaWdodE9iamVjdDJOb2RlLnZpc2libGVQcm9wZXJ0eSApXHJcbiAgICBdO1xyXG5cclxuICAgIC8vICdKJyBob3RrZXkgd2lsbCBjeWNsZSB0b29scyB0aHJvdWdoIHRoZXNlIHBvaW50cywgZHluYW1pY2FsbHkgbG9va2luZyBhdCBsZWZ0LXRvLXJpZ2h0IHggY29vcmRpbmF0ZS5cclxuICAgIHRoaXMudG9vbEp1bXBQb2ludHMgPSBbIC4uLmNvbW1vbkp1bXBQb2ludHMgXTtcclxuXHJcbiAgICAvLyBKdW1wIHBvaW50cyB0aGF0IGFyZSBpbnRlcmVzdGluZyBvbmx5IGZvciBjb252ZXggbGVuc2VzLlxyXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9nZW9tZXRyaWMtb3B0aWNzL2lzc3Vlcy80MjZcclxuICAgIGNvbnN0IGNvbnZleEp1bXBQb2ludHMgPSBbXHJcblxyXG4gICAgICAvLyBsaWdodCBzcG90cyBvbiB0aGUgcHJvamVjdGlvbiBzY3JlZW5cclxuICAgICAge1xyXG4gICAgICAgIHBvc2l0aW9uUHJvcGVydHk6IHNjZW5lLmxpZ2h0U3BvdDEucG9zaXRpb25Qcm9wZXJ0eSxcclxuICAgICAgICB2aXNpYmxlUHJvcGVydHk6IGxpZ2h0U3BvdDFOb2RlLnZpc2libGVQcm9wZXJ0eVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgcG9zaXRpb25Qcm9wZXJ0eTogc2NlbmUubGlnaHRTcG90Mi5wb3NpdGlvblByb3BlcnR5LFxyXG4gICAgICAgIHZpc2libGVQcm9wZXJ0eTogbGlnaHRTcG90Mk5vZGUudmlzaWJsZVByb3BlcnR5XHJcbiAgICAgIH1cclxuICAgIF07XHJcblxyXG4gICAgLy8gQWRqdXN0IHRoZSB0b29sIGp1bXAgcG9pbnRzIGJhc2VkIG9uIHRoZSBzdXJmYWNlIHR5cGUgb2YgdGhlIGxlbnMuXHJcbiAgICAvLyBUaGUgdG9vbHMgaGF2ZSBhIHJlZmVyZW5jZSB0byB0aGlzLnRvb2xKdW1wUG9pbnRzLCBzbyBpdCdzIGltcG9ydGFudCB0aGF0IHRoaXMgYXJyYXkgaXMgbW9kaWZpZWQgaW4gcGxhY2UuXHJcbiAgICBzY2VuZS5sZW5zLm9wdGljU3VyZmFjZVR5cGVQcm9wZXJ0eS5saW5rKCBvcHRpY1N1cmZhY2VUeXBlID0+IHtcclxuICAgICAgaWYgKCBvcHRpY1N1cmZhY2VUeXBlID09PSAnY29udmV4JyApIHtcclxuXHJcbiAgICAgICAgLy8gQWRkIGp1bXAgcG9pbnRzIHRoYXQgYXJlIGludGVyZXN0aW5nIG9ubHkgZm9yIGEgY29udmV4IGxlbnMuIFdlJ3JlIGNoZWNraW5nIHBvaW50cyBiZWZvcmUgcHVzaGluZ1xyXG4gICAgICAgIC8vIHRoZW0gaW4gY2FzZSB0aGVyZSdzIGFueSBQaEVULWlPIGZ1bm55IGJ1c2luZXNzLCBzbyB3ZSBkb24ndCBlbmQgdXAgd2l0aCBkdXBsaWNhdGUgcG9pbnRzIGluIHRoZSBhcnJheS5cclxuICAgICAgICBjb252ZXhKdW1wUG9pbnRzLmZvckVhY2goIGp1bXBQb2ludCA9PiB7XHJcbiAgICAgICAgICBpZiAoICF0aGlzLnRvb2xKdW1wUG9pbnRzLmluY2x1ZGVzKCBqdW1wUG9pbnQgKSApIHtcclxuICAgICAgICAgICAgdGhpcy50b29sSnVtcFBvaW50cy5wdXNoKCBqdW1wUG9pbnQgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9ICk7XHJcbiAgICAgICAgYXNzZXJ0ICYmIGFzc2VydCggdGhpcy50b29sSnVtcFBvaW50cy5sZW5ndGggPT09IGNvbW1vbkp1bXBQb2ludHMubGVuZ3RoICsgY29udmV4SnVtcFBvaW50cy5sZW5ndGggKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGp1bXAgcG9pbnRzIHRoYXQgYXJlIGludGVyZXN0aW5nIG9ubHkgZm9yIGEgY29udmV4IGxlbnMuXHJcbiAgICAgICAgLy8gV2UncmUgY29uZmlybWluZyB0aGF0IHRoZSBwb2ludHMgYXJlIGluIHRoZSBhcnJheSBpbiBjYXNlIHRoZXJlJ3MgYW55IFBoRVQtaU8gZnVubnkgYnVzaW5lc3MuXHJcbiAgICAgICAgY29udmV4SnVtcFBvaW50cy5mb3JFYWNoKCBqdW1wUG9pbnQgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnRvb2xKdW1wUG9pbnRzLmluZGV4T2YoIGp1bXBQb2ludCApO1xyXG4gICAgICAgICAgKCBpbmRleCAhPT0gLTEgKSAmJiB0aGlzLnRvb2xKdW1wUG9pbnRzLnNwbGljZSggaW5kZXgsIDEgKTtcclxuICAgICAgICB9ICk7XHJcbiAgICAgICAgYXNzZXJ0ICYmIGFzc2VydCggdGhpcy50b29sSnVtcFBvaW50cy5sZW5ndGggPT09IGNvbW1vbkp1bXBQb2ludHMubGVuZ3RoICk7XHJcbiAgICAgIH1cclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBWaXNpYmlsaXR5IGZvciBhc3NvY2lhdGVzIGxhYmVsc1xyXG4gICAgdGhpcy5saWdodE9iamVjdDFOb2RlVmlzaWJsZVByb3BlcnR5ID0gbGlnaHRPYmplY3QxTm9kZS52aXNpYmxlUHJvcGVydHk7XHJcbiAgICB0aGlzLmxpZ2h0T2JqZWN0Mk5vZGVWaXNpYmxlUHJvcGVydHkgPSBsaWdodE9iamVjdDJOb2RlLnZpc2libGVQcm9wZXJ0eTtcclxuICAgIHRoaXMucHJvamVjdGlvblNjcmVlbk5vZGVWaXNpYmxlUHJvcGVydHkgPSBwcm9qZWN0aW9uU2NyZWVuTm9kZS52aXNpYmxlUHJvcGVydHk7XHJcblxyXG4gICAgdGhpcy5yZXNldExpZ2h0T2JqZWN0U2NlbmVOb2RlID0gKCkgPT4ge1xyXG4gICAgICBsaWdodFdhc0RyYWdnZWRQcm9wZXJ0eS5yZXNldCgpO1xyXG4gICAgICBwcm9qZWN0aW9uU2NyZWVuTm9kZS5yZXNldCgpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVzZXRMaWdodE9iamVjdFNjZW5lTm9kZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZ2VvbWV0cmljT3B0aWNzLnJlZ2lzdGVyKCAnTGlnaHRTY2VuZU5vZGUnLCBMaWdodFNjZW5lTm9kZSApOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBLE9BQU9BLGVBQWUsTUFBTSwwQkFBMEI7QUFLdEQsT0FBT0MsUUFBUSxNQUFNLDBCQUEwQjtBQUMvQyxPQUFPQyxpQkFBaUIsTUFBTSx3QkFBd0I7QUFDdEQsT0FBT0MsZUFBZSxNQUFNLHdDQUF3QztBQUVwRSxPQUFPQyxvQkFBb0IsTUFBTSwyQkFBMkI7QUFDNUQsT0FBT0MsYUFBYSxNQUFNLG9CQUFvQjtBQUM5QyxPQUFPQyxlQUFlLE1BQU0sd0NBQXdDO0FBQ3BFLE9BQU9DLGVBQWUsTUFBTSxzQkFBc0I7QUFDbEQsT0FBT0Msd0NBQXdDLE1BQU0sK0NBQStDO0FBQ3BHLE9BQU9DLFdBQVcsTUFBOEIsa0JBQWtCO0FBQ2xF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