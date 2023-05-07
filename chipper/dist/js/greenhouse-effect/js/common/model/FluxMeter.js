// Copyright 2021-2022, University of Colorado Boulder

/**
 * A model component for the FluxMeter in this simulation. Contains Properties for the position
 * of the sensor. All Property values are in model coordinates.
 *
 * @author Jesse Greenberg
 * @author John Blanco (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import greenhouseEffect from '../../greenhouseEffect.js';
import GreenhouseEffectConstants from '../GreenhouseEffectConstants.js';
import FluxSensor from './FluxSensor.js';
import LayersModel from './LayersModel.js';

// constants
const MIN_LAYER_TO_SENSOR_DISTANCE = 2200; // in meters, empirically determined

// types
// The size of the flux sensor.  Note that this is parallel to the ground, so "height" is actually the Z dimension.
const FLUX_SENSOR_SIZE = new Dimension2(GreenhouseEffectConstants.SUNLIGHT_SPAN.width * 0.76, GreenhouseEffectConstants.SUNLIGHT_SPAN.height);

// TODO: Questions: How do I require a tandem these days?  How to I prevent a tandem for a model element that is
//       included via composition?  How do I then create that tandem and pass it through to the sub-element?  I have
//       something working, but I'm not sure it is what we currently consider to be idiomatic?

class FluxMeter extends PhetioObject {
  // the model element that senses the flux, must have energy added to it by the model

  // variables that indicate where the wire should be that attaches the flux sensor to the body of the meter

  constructor(atmosphereLayers, providedOptions) {
    const options = optionize()({
      moveSensorOffLayers: false,
      fluxSensorOptions: {
        // The initial position for the flux sensor, which is placed at a level in the Photons screen where there is
        // a noticeable amount of downward IR flux.
        initialPosition: new Vector2(-LayersModel.SUNLIGHT_SPAN.width * 0.11, 4500)
      },
      // temporarily marking phet-io state to be false until serialization is added
      phetioState: false
    }, providedOptions);
    super(options);
    this.atmosphereLayers = atmosphereLayers;

    // Create the flux sensor, which is the portion that actually senses and measures the flux.
    const fluxSensorOptions = options.fluxSensorOptions;
    fluxSensorOptions.tandem = options.tandem?.createTandem('fluxSensor');
    this.fluxSensor = new FluxSensor(FLUX_SENSOR_SIZE, fluxSensorOptions);

    // the position in model coordinates where the flux meter wire connects to the sensor, in meters
    this.wireSensorAttachmentPositionProperty = new DerivedProperty([this.fluxSensor.altitudeProperty], altitude => {
      return new Vector2(this.fluxSensor.xPosition + this.fluxSensor.size.width / 2, altitude);
    }, {
      tandem: options.tandem.createTandem('wireSensorAttachmentPositionProperty'),
      phetioValueType: Vector2.Vector2IO
    });

    // {Vector2Property} - The position in model coordinates where the wire connects to the display - the
    // display for the meter is just a panel set in view coordinates to align with other components, so this should
    // be set in the view after the meter component has been positioned
    this.wireMeterAttachmentPositionProperty = new Vector2Property(new Vector2(0, 0), {
      tandem: options.tandem.createTandem('wireMeterAttachmentPositionProperty')
    });
    const checkAndUpdateSensorPosition = () => {
      if (options.moveSensorOffLayers) {
        this.checkAndUpdateSensorPosition();
      }
    };
    this.fluxSensor.isDraggingProperty.lazyLink(isDragging => {
      if (!isDragging) {
        checkAndUpdateSensorPosition();
      }
    });
    this.atmosphereLayers.forEach(atmosphereLayer => {
      atmosphereLayer.isActiveProperty.lazyLink(checkAndUpdateSensorPosition);
    });
  }

  /**
   * Restore initial state.
   */
  reset() {
    this.fluxSensor.reset();
  }

  /**
   * This method is a pass-through to the sensor, see the documentation there for details.
   */
  measureEnergyPacketFlux(energyPackets, dt) {
    this.fluxSensor.measureEnergyPacketFlux(energyPackets, dt);
  }

  /**
   * Check the sensor position and, if it is too close to any layers, move it away.
   */
  checkAndUpdateSensorPosition() {
    const activeAtmosphereLayers = this.atmosphereLayers.filter(layer => layer.isActiveProperty.value);
    activeAtmosphereLayers.forEach(atmosphereLayer => {
      const sensorToLayerYDistance = Math.abs(atmosphereLayer.altitude - this.fluxSensor.altitudeProperty.value);
      if (sensorToLayerYDistance < MIN_LAYER_TO_SENSOR_DISTANCE) {
        // Jump to the other side of the layer rather than the same side.  This works better for keyboard nav.
        if (this.fluxSensor.altitudeProperty.value < atmosphereLayer.altitude) {
          this.fluxSensor.altitudeProperty.set(atmosphereLayer.altitude + MIN_LAYER_TO_SENSOR_DISTANCE);
        } else {
          this.fluxSensor.altitudeProperty.set(atmosphereLayer.altitude - MIN_LAYER_TO_SENSOR_DISTANCE);
        }
      }
    });
  }
}
greenhouseEffect.register('FluxMeter', FluxMeter);
export default FluxMeter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEZXJpdmVkUHJvcGVydHkiLCJEaW1lbnNpb24yIiwiVmVjdG9yMiIsIlZlY3RvcjJQcm9wZXJ0eSIsIm9wdGlvbml6ZSIsIlBoZXRpb09iamVjdCIsImdyZWVuaG91c2VFZmZlY3QiLCJHcmVlbmhvdXNlRWZmZWN0Q29uc3RhbnRzIiwiRmx1eFNlbnNvciIsIkxheWVyc01vZGVsIiwiTUlOX0xBWUVSX1RPX1NFTlNPUl9ESVNUQU5DRSIsIkZMVVhfU0VOU09SX1NJWkUiLCJTVU5MSUdIVF9TUEFOIiwid2lkdGgiLCJoZWlnaHQiLCJGbHV4TWV0ZXIiLCJjb25zdHJ1Y3RvciIsImF0bW9zcGhlcmVMYXllcnMiLCJwcm92aWRlZE9wdGlvbnMiLCJvcHRpb25zIiwibW92ZVNlbnNvck9mZkxheWVycyIsImZsdXhTZW5zb3JPcHRpb25zIiwiaW5pdGlhbFBvc2l0aW9uIiwicGhldGlvU3RhdGUiLCJ0YW5kZW0iLCJjcmVhdGVUYW5kZW0iLCJmbHV4U2Vuc29yIiwid2lyZVNlbnNvckF0dGFjaG1lbnRQb3NpdGlvblByb3BlcnR5IiwiYWx0aXR1ZGVQcm9wZXJ0eSIsImFsdGl0dWRlIiwieFBvc2l0aW9uIiwic2l6ZSIsInBoZXRpb1ZhbHVlVHlwZSIsIlZlY3RvcjJJTyIsIndpcmVNZXRlckF0dGFjaG1lbnRQb3NpdGlvblByb3BlcnR5IiwiY2hlY2tBbmRVcGRhdGVTZW5zb3JQb3NpdGlvbiIsImlzRHJhZ2dpbmdQcm9wZXJ0eSIsImxhenlMaW5rIiwiaXNEcmFnZ2luZyIsImZvckVhY2giLCJhdG1vc3BoZXJlTGF5ZXIiLCJpc0FjdGl2ZVByb3BlcnR5IiwicmVzZXQiLCJtZWFzdXJlRW5lcmd5UGFja2V0Rmx1eCIsImVuZXJneVBhY2tldHMiLCJkdCIsImFjdGl2ZUF0bW9zcGhlcmVMYXllcnMiLCJmaWx0ZXIiLCJsYXllciIsInZhbHVlIiwic2Vuc29yVG9MYXllcllEaXN0YW5jZSIsIk1hdGgiLCJhYnMiLCJzZXQiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkZsdXhNZXRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBBIG1vZGVsIGNvbXBvbmVudCBmb3IgdGhlIEZsdXhNZXRlciBpbiB0aGlzIHNpbXVsYXRpb24uIENvbnRhaW5zIFByb3BlcnRpZXMgZm9yIHRoZSBwb3NpdGlvblxyXG4gKiBvZiB0aGUgc2Vuc29yLiBBbGwgUHJvcGVydHkgdmFsdWVzIGFyZSBpbiBtb2RlbCBjb29yZGluYXRlcy5cclxuICpcclxuICogQGF1dGhvciBKZXNzZSBHcmVlbmJlcmdcclxuICogQGF1dGhvciBKb2huIEJsYW5jbyAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgRGVyaXZlZFByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvRGVyaXZlZFByb3BlcnR5LmpzJztcclxuaW1wb3J0IFRSZWFkT25seVByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvVFJlYWRPbmx5UHJvcGVydHkuanMnO1xyXG5pbXBvcnQgRGltZW5zaW9uMiBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvRGltZW5zaW9uMi5qcyc7XHJcbmltcG9ydCBWZWN0b3IyIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9WZWN0b3IyLmpzJztcclxuaW1wb3J0IFZlY3RvcjJQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvVmVjdG9yMlByb3BlcnR5LmpzJztcclxuaW1wb3J0IG9wdGlvbml6ZSBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvb3B0aW9uaXplLmpzJztcclxuaW1wb3J0IFN0cmljdE9taXQgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL3R5cGVzL1N0cmljdE9taXQuanMnO1xyXG5pbXBvcnQgUGhldGlvT2JqZWN0LCB7IFBoZXRpb09iamVjdE9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi8uLi90YW5kZW0vanMvUGhldGlvT2JqZWN0LmpzJztcclxuaW1wb3J0IGdyZWVuaG91c2VFZmZlY3QgZnJvbSAnLi4vLi4vZ3JlZW5ob3VzZUVmZmVjdC5qcyc7XHJcbmltcG9ydCBHcmVlbmhvdXNlRWZmZWN0Q29uc3RhbnRzIGZyb20gJy4uL0dyZWVuaG91c2VFZmZlY3RDb25zdGFudHMuanMnO1xyXG5pbXBvcnQgQXRtb3NwaGVyZUxheWVyIGZyb20gJy4vQXRtb3NwaGVyZUxheWVyLmpzJztcclxuaW1wb3J0IEVNRW5lcmd5UGFja2V0IGZyb20gJy4vRU1FbmVyZ3lQYWNrZXQuanMnO1xyXG5pbXBvcnQgRmx1eFNlbnNvciwgeyBGbHV4U2Vuc29yT3B0aW9ucyB9IGZyb20gJy4vRmx1eFNlbnNvci5qcyc7XHJcbmltcG9ydCBMYXllcnNNb2RlbCBmcm9tICcuL0xheWVyc01vZGVsLmpzJztcclxuXHJcbi8vIGNvbnN0YW50c1xyXG5jb25zdCBNSU5fTEFZRVJfVE9fU0VOU09SX0RJU1RBTkNFID0gMjIwMDsgLy8gaW4gbWV0ZXJzLCBlbXBpcmljYWxseSBkZXRlcm1pbmVkXHJcblxyXG4vLyB0eXBlc1xyXG50eXBlIFNlbGZPcHRpb25zID0ge1xyXG5cclxuICAvLyBBIGJvb2xlYW4gZmxhZyB0aGF0IGNvbnRyb2xzIHdoZXRoZXIgdGhlIGZsdXggc2Vuc29yIHNob3VsZCBiZSBtb3ZlZCBvZmYgb2YgYSBsYXllciB3aGVuIGl0IGlzIHJlbGVhc2VkIG9uIG9yIHZlcnlcclxuICAvLyBuZWFyIG9uZS5cclxuICBtb3ZlU2Vuc29yT2ZmTGF5ZXJzPzogYm9vbGVhbjtcclxuXHJcbiAgLy8gb3B0aW9ucyBwYXNzZWQgdGhyb3VnaCB0byB0aGUgZmx1eCBzZW5zb3JcclxuICBmbHV4U2Vuc29yT3B0aW9ucz86IFN0cmljdE9taXQ8Rmx1eFNlbnNvck9wdGlvbnMsICd0YW5kZW0nPjtcclxufTtcclxuZXhwb3J0IHR5cGUgRmx1eE1ldGVyT3B0aW9ucyA9IFNlbGZPcHRpb25zICYgUGhldGlvT2JqZWN0T3B0aW9ucztcclxuXHJcbi8vIFRoZSBzaXplIG9mIHRoZSBmbHV4IHNlbnNvci4gIE5vdGUgdGhhdCB0aGlzIGlzIHBhcmFsbGVsIHRvIHRoZSBncm91bmQsIHNvIFwiaGVpZ2h0XCIgaXMgYWN0dWFsbHkgdGhlIFogZGltZW5zaW9uLlxyXG5jb25zdCBGTFVYX1NFTlNPUl9TSVpFID0gbmV3IERpbWVuc2lvbjIoXHJcbiAgR3JlZW5ob3VzZUVmZmVjdENvbnN0YW50cy5TVU5MSUdIVF9TUEFOLndpZHRoICogMC43NixcclxuICBHcmVlbmhvdXNlRWZmZWN0Q29uc3RhbnRzLlNVTkxJR0hUX1NQQU4uaGVpZ2h0XHJcbik7XHJcblxyXG4vLyBUT0RPOiBRdWVzdGlvbnM6IEhvdyBkbyBJIHJlcXVpcmUgYSB0YW5kZW0gdGhlc2UgZGF5cz8gIEhvdyB0byBJIHByZXZlbnQgYSB0YW5kZW0gZm9yIGEgbW9kZWwgZWxlbWVudCB0aGF0IGlzXHJcbi8vICAgICAgIGluY2x1ZGVkIHZpYSBjb21wb3NpdGlvbj8gIEhvdyBkbyBJIHRoZW4gY3JlYXRlIHRoYXQgdGFuZGVtIGFuZCBwYXNzIGl0IHRocm91Z2ggdG8gdGhlIHN1Yi1lbGVtZW50PyAgSSBoYXZlXHJcbi8vICAgICAgIHNvbWV0aGluZyB3b3JraW5nLCBidXQgSSdtIG5vdCBzdXJlIGl0IGlzIHdoYXQgd2UgY3VycmVudGx5IGNvbnNpZGVyIHRvIGJlIGlkaW9tYXRpYz9cclxuXHJcbmNsYXNzIEZsdXhNZXRlciBleHRlbmRzIFBoZXRpb09iamVjdCB7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgYXRtb3NwaGVyZUxheWVyczogQXRtb3NwaGVyZUxheWVyW107XHJcblxyXG4gIC8vIHRoZSBtb2RlbCBlbGVtZW50IHRoYXQgc2Vuc2VzIHRoZSBmbHV4LCBtdXN0IGhhdmUgZW5lcmd5IGFkZGVkIHRvIGl0IGJ5IHRoZSBtb2RlbFxyXG4gIHB1YmxpYyByZWFkb25seSBmbHV4U2Vuc29yOiBGbHV4U2Vuc29yO1xyXG5cclxuICAvLyB2YXJpYWJsZXMgdGhhdCBpbmRpY2F0ZSB3aGVyZSB0aGUgd2lyZSBzaG91bGQgYmUgdGhhdCBhdHRhY2hlcyB0aGUgZmx1eCBzZW5zb3IgdG8gdGhlIGJvZHkgb2YgdGhlIG1ldGVyXHJcbiAgcHVibGljIHJlYWRvbmx5IHdpcmVNZXRlckF0dGFjaG1lbnRQb3NpdGlvblByb3BlcnR5OiBWZWN0b3IyUHJvcGVydHk7XHJcbiAgcHVibGljIHJlYWRvbmx5IHdpcmVTZW5zb3JBdHRhY2htZW50UG9zaXRpb25Qcm9wZXJ0eTogVFJlYWRPbmx5UHJvcGVydHk8VmVjdG9yMj47XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggYXRtb3NwaGVyZUxheWVyczogQXRtb3NwaGVyZUxheWVyW10sIHByb3ZpZGVkT3B0aW9ucz86IEZsdXhNZXRlck9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxGbHV4TWV0ZXJPcHRpb25zLCBTZWxmT3B0aW9ucywgUGhldGlvT2JqZWN0T3B0aW9ucz4oKSgge1xyXG4gICAgICBtb3ZlU2Vuc29yT2ZmTGF5ZXJzOiBmYWxzZSxcclxuICAgICAgZmx1eFNlbnNvck9wdGlvbnM6IHtcclxuXHJcbiAgICAgICAgLy8gVGhlIGluaXRpYWwgcG9zaXRpb24gZm9yIHRoZSBmbHV4IHNlbnNvciwgd2hpY2ggaXMgcGxhY2VkIGF0IGEgbGV2ZWwgaW4gdGhlIFBob3RvbnMgc2NyZWVuIHdoZXJlIHRoZXJlIGlzXHJcbiAgICAgICAgLy8gYSBub3RpY2VhYmxlIGFtb3VudCBvZiBkb3dud2FyZCBJUiBmbHV4LlxyXG4gICAgICAgIGluaXRpYWxQb3NpdGlvbjogbmV3IFZlY3RvcjIoIC1MYXllcnNNb2RlbC5TVU5MSUdIVF9TUEFOLndpZHRoICogMC4xMSwgNDUwMCApXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyB0ZW1wb3JhcmlseSBtYXJraW5nIHBoZXQtaW8gc3RhdGUgdG8gYmUgZmFsc2UgdW50aWwgc2VyaWFsaXphdGlvbiBpcyBhZGRlZFxyXG4gICAgICBwaGV0aW9TdGF0ZTogZmFsc2VcclxuXHJcbiAgICB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICBzdXBlciggb3B0aW9ucyApO1xyXG5cclxuICAgIHRoaXMuYXRtb3NwaGVyZUxheWVycyA9IGF0bW9zcGhlcmVMYXllcnM7XHJcblxyXG4gICAgLy8gQ3JlYXRlIHRoZSBmbHV4IHNlbnNvciwgd2hpY2ggaXMgdGhlIHBvcnRpb24gdGhhdCBhY3R1YWxseSBzZW5zZXMgYW5kIG1lYXN1cmVzIHRoZSBmbHV4LlxyXG4gICAgY29uc3QgZmx1eFNlbnNvck9wdGlvbnMgPSBvcHRpb25zLmZsdXhTZW5zb3JPcHRpb25zIGFzIEZsdXhTZW5zb3JPcHRpb25zO1xyXG4gICAgZmx1eFNlbnNvck9wdGlvbnMudGFuZGVtID0gb3B0aW9ucy50YW5kZW0/LmNyZWF0ZVRhbmRlbSggJ2ZsdXhTZW5zb3InICk7XHJcbiAgICB0aGlzLmZsdXhTZW5zb3IgPSBuZXcgRmx1eFNlbnNvciggRkxVWF9TRU5TT1JfU0laRSwgZmx1eFNlbnNvck9wdGlvbnMgKTtcclxuXHJcbiAgICAvLyB0aGUgcG9zaXRpb24gaW4gbW9kZWwgY29vcmRpbmF0ZXMgd2hlcmUgdGhlIGZsdXggbWV0ZXIgd2lyZSBjb25uZWN0cyB0byB0aGUgc2Vuc29yLCBpbiBtZXRlcnNcclxuICAgIHRoaXMud2lyZVNlbnNvckF0dGFjaG1lbnRQb3NpdGlvblByb3BlcnR5ID0gbmV3IERlcml2ZWRQcm9wZXJ0eShcclxuICAgICAgWyB0aGlzLmZsdXhTZW5zb3IuYWx0aXR1ZGVQcm9wZXJ0eSBdLFxyXG4gICAgICBhbHRpdHVkZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKCB0aGlzLmZsdXhTZW5zb3IueFBvc2l0aW9uICsgdGhpcy5mbHV4U2Vuc29yLnNpemUud2lkdGggLyAyLCBhbHRpdHVkZSApO1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGFuZGVtOiBvcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICd3aXJlU2Vuc29yQXR0YWNobWVudFBvc2l0aW9uUHJvcGVydHknICksXHJcbiAgICAgICAgcGhldGlvVmFsdWVUeXBlOiBWZWN0b3IyLlZlY3RvcjJJT1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIHtWZWN0b3IyUHJvcGVydHl9IC0gVGhlIHBvc2l0aW9uIGluIG1vZGVsIGNvb3JkaW5hdGVzIHdoZXJlIHRoZSB3aXJlIGNvbm5lY3RzIHRvIHRoZSBkaXNwbGF5IC0gdGhlXHJcbiAgICAvLyBkaXNwbGF5IGZvciB0aGUgbWV0ZXIgaXMganVzdCBhIHBhbmVsIHNldCBpbiB2aWV3IGNvb3JkaW5hdGVzIHRvIGFsaWduIHdpdGggb3RoZXIgY29tcG9uZW50cywgc28gdGhpcyBzaG91bGRcclxuICAgIC8vIGJlIHNldCBpbiB0aGUgdmlldyBhZnRlciB0aGUgbWV0ZXIgY29tcG9uZW50IGhhcyBiZWVuIHBvc2l0aW9uZWRcclxuICAgIHRoaXMud2lyZU1ldGVyQXR0YWNobWVudFBvc2l0aW9uUHJvcGVydHkgPSBuZXcgVmVjdG9yMlByb3BlcnR5KCBuZXcgVmVjdG9yMiggMCwgMCApLCB7XHJcbiAgICAgIHRhbmRlbTogb3B0aW9ucy50YW5kZW0uY3JlYXRlVGFuZGVtKCAnd2lyZU1ldGVyQXR0YWNobWVudFBvc2l0aW9uUHJvcGVydHknIClcclxuICAgIH0gKTtcclxuXHJcbiAgICBjb25zdCBjaGVja0FuZFVwZGF0ZVNlbnNvclBvc2l0aW9uID0gKCkgPT4ge1xyXG4gICAgICBpZiAoIG9wdGlvbnMubW92ZVNlbnNvck9mZkxheWVycyApIHtcclxuICAgICAgICB0aGlzLmNoZWNrQW5kVXBkYXRlU2Vuc29yUG9zaXRpb24oKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmZsdXhTZW5zb3IuaXNEcmFnZ2luZ1Byb3BlcnR5LmxhenlMaW5rKCBpc0RyYWdnaW5nID0+IHtcclxuICAgICAgaWYgKCAhaXNEcmFnZ2luZyApIHtcclxuICAgICAgICBjaGVja0FuZFVwZGF0ZVNlbnNvclBvc2l0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgIH0gKTtcclxuXHJcbiAgICB0aGlzLmF0bW9zcGhlcmVMYXllcnMuZm9yRWFjaCggYXRtb3NwaGVyZUxheWVyID0+IHtcclxuICAgICAgYXRtb3NwaGVyZUxheWVyLmlzQWN0aXZlUHJvcGVydHkubGF6eUxpbmsoIGNoZWNrQW5kVXBkYXRlU2Vuc29yUG9zaXRpb24gKTtcclxuICAgIH0gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc3RvcmUgaW5pdGlhbCBzdGF0ZS5cclxuICAgKi9cclxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmZsdXhTZW5zb3IucmVzZXQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgbWV0aG9kIGlzIGEgcGFzcy10aHJvdWdoIHRvIHRoZSBzZW5zb3IsIHNlZSB0aGUgZG9jdW1lbnRhdGlvbiB0aGVyZSBmb3IgZGV0YWlscy5cclxuICAgKi9cclxuICBwdWJsaWMgbWVhc3VyZUVuZXJneVBhY2tldEZsdXgoIGVuZXJneVBhY2tldHM6IEVNRW5lcmd5UGFja2V0W10sIGR0OiBudW1iZXIgKTogdm9pZCB7XHJcbiAgICB0aGlzLmZsdXhTZW5zb3IubWVhc3VyZUVuZXJneVBhY2tldEZsdXgoIGVuZXJneVBhY2tldHMsIGR0ICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayB0aGUgc2Vuc29yIHBvc2l0aW9uIGFuZCwgaWYgaXQgaXMgdG9vIGNsb3NlIHRvIGFueSBsYXllcnMsIG1vdmUgaXQgYXdheS5cclxuICAgKi9cclxuICBwcml2YXRlIGNoZWNrQW5kVXBkYXRlU2Vuc29yUG9zaXRpb24oKTogdm9pZCB7XHJcbiAgICBjb25zdCBhY3RpdmVBdG1vc3BoZXJlTGF5ZXJzID0gdGhpcy5hdG1vc3BoZXJlTGF5ZXJzLmZpbHRlciggbGF5ZXIgPT4gbGF5ZXIuaXNBY3RpdmVQcm9wZXJ0eS52YWx1ZSApO1xyXG4gICAgYWN0aXZlQXRtb3NwaGVyZUxheWVycy5mb3JFYWNoKCBhdG1vc3BoZXJlTGF5ZXIgPT4ge1xyXG4gICAgICBjb25zdCBzZW5zb3JUb0xheWVyWURpc3RhbmNlID0gTWF0aC5hYnMoIGF0bW9zcGhlcmVMYXllci5hbHRpdHVkZSAtIHRoaXMuZmx1eFNlbnNvci5hbHRpdHVkZVByb3BlcnR5LnZhbHVlICk7XHJcbiAgICAgIGlmICggc2Vuc29yVG9MYXllcllEaXN0YW5jZSA8IE1JTl9MQVlFUl9UT19TRU5TT1JfRElTVEFOQ0UgKSB7XHJcblxyXG4gICAgICAgIC8vIEp1bXAgdG8gdGhlIG90aGVyIHNpZGUgb2YgdGhlIGxheWVyIHJhdGhlciB0aGFuIHRoZSBzYW1lIHNpZGUuICBUaGlzIHdvcmtzIGJldHRlciBmb3Iga2V5Ym9hcmQgbmF2LlxyXG4gICAgICAgIGlmICggdGhpcy5mbHV4U2Vuc29yLmFsdGl0dWRlUHJvcGVydHkudmFsdWUgPCBhdG1vc3BoZXJlTGF5ZXIuYWx0aXR1ZGUgKSB7XHJcbiAgICAgICAgICB0aGlzLmZsdXhTZW5zb3IuYWx0aXR1ZGVQcm9wZXJ0eS5zZXQoIGF0bW9zcGhlcmVMYXllci5hbHRpdHVkZSArIE1JTl9MQVlFUl9UT19TRU5TT1JfRElTVEFOQ0UgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmZsdXhTZW5zb3IuYWx0aXR1ZGVQcm9wZXJ0eS5zZXQoIGF0bW9zcGhlcmVMYXllci5hbHRpdHVkZSAtIE1JTl9MQVlFUl9UT19TRU5TT1JfRElTVEFOQ0UgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gKTtcclxuICB9XHJcbn1cclxuXHJcbmdyZWVuaG91c2VFZmZlY3QucmVnaXN0ZXIoICdGbHV4TWV0ZXInLCBGbHV4TWV0ZXIgKTtcclxuZXhwb3J0IGRlZmF1bHQgRmx1eE1ldGVyOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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