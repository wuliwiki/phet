// Copyright 2019-2022, University of Colorado Boulder

/**
 * A Scenery Node that portrays a thermometer and a triangular indicator of the precise position where the temperature
 * is being sensed. The triangular indicator can be filled with a color to make it more clear what exactly is being
 * measured.
 *
 * @author Arnab Purkayastha
 * @author John Blanco
 */

import { Shape } from '../../kite/js/imports.js';
import { Color, Node, Path } from '../../scenery/js/imports.js';
import sceneryPhet from './sceneryPhet.js';
import ThermometerNode from './ThermometerNode.js';
import optionize, { combineOptions } from '../../phet-core/js/optionize.js';
export default class TemperatureAndColorSensorNode extends Node {
  constructor(temperatureProperty, temperatureRange, colorProperty, providedOptions) {
    super();
    const options = optionize()({
      // SelfOptions
      horizontalSpace: 3,
      bottomOffset: 5,
      thermometerNodeOptions: {
        bulbDiameter: 30,
        tubeWidth: 18,
        lineWidth: 2,
        tickSpacingTemperature: 25,
        majorTickLength: 10,
        minorTickLength: 5,
        backgroundFill: new Color(256, 256, 256, 0.67)
      },
      colorIndicatorOptions: {
        fill: new Color(0, 0, 0, 0),
        lineWidth: 2,
        stroke: 'black',
        lineJoin: 'round',
        sideLength: 18
      }
    }, providedOptions);

    // Add the triangle that will display the sensed color.
    // The leftmost point of this triangle will correspond to the position of the sensor in the model.
    const s = options.colorIndicatorOptions.sideLength;
    const triangleShape = new Shape().moveTo(0, 0).lineTo(Math.cos(Math.PI / 6) * s, -Math.sin(Math.PI / 6) * s).lineTo(Math.cos(Math.PI / 6) * s, Math.sin(Math.PI / 6) * s).close();
    this.colorIndicatorNode = new Path(triangleShape, options.colorIndicatorOptions);
    colorProperty.link(color => {
      this.colorIndicatorNode.fill = color;
    });
    this.addChild(this.colorIndicatorNode);
    this.thermometerNode = new ThermometerNode(temperatureProperty, temperatureRange.min, temperatureRange.max, combineOptions({
      left: this.colorIndicatorNode.right + options.horizontalSpace,
      bottom: this.colorIndicatorNode.bottom + options.bottomOffset
    }, options.thermometerNodeOptions));
    this.addChild(this.thermometerNode);
    this.mutate(options);
  }
  getThermometerBounds() {
    return this.thermometerNode.bounds;
  }
  get thermometerBounds() {
    return this.getThermometerBounds();
  }
  getColorIndicatorBounds() {
    return this.colorIndicatorNode.bounds;
  }
  get colorIndicatorBounds() {
    return this.getColorIndicatorBounds();
  }
}
sceneryPhet.register('TemperatureAndColorSensorNode', TemperatureAndColorSensorNode);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTaGFwZSIsIkNvbG9yIiwiTm9kZSIsIlBhdGgiLCJzY2VuZXJ5UGhldCIsIlRoZXJtb21ldGVyTm9kZSIsIm9wdGlvbml6ZSIsImNvbWJpbmVPcHRpb25zIiwiVGVtcGVyYXR1cmVBbmRDb2xvclNlbnNvck5vZGUiLCJjb25zdHJ1Y3RvciIsInRlbXBlcmF0dXJlUHJvcGVydHkiLCJ0ZW1wZXJhdHVyZVJhbmdlIiwiY29sb3JQcm9wZXJ0eSIsInByb3ZpZGVkT3B0aW9ucyIsIm9wdGlvbnMiLCJob3Jpem9udGFsU3BhY2UiLCJib3R0b21PZmZzZXQiLCJ0aGVybW9tZXRlck5vZGVPcHRpb25zIiwiYnVsYkRpYW1ldGVyIiwidHViZVdpZHRoIiwibGluZVdpZHRoIiwidGlja1NwYWNpbmdUZW1wZXJhdHVyZSIsIm1ham9yVGlja0xlbmd0aCIsIm1pbm9yVGlja0xlbmd0aCIsImJhY2tncm91bmRGaWxsIiwiY29sb3JJbmRpY2F0b3JPcHRpb25zIiwiZmlsbCIsInN0cm9rZSIsImxpbmVKb2luIiwic2lkZUxlbmd0aCIsInMiLCJ0cmlhbmdsZVNoYXBlIiwibW92ZVRvIiwibGluZVRvIiwiTWF0aCIsImNvcyIsIlBJIiwic2luIiwiY2xvc2UiLCJjb2xvckluZGljYXRvck5vZGUiLCJsaW5rIiwiY29sb3IiLCJhZGRDaGlsZCIsInRoZXJtb21ldGVyTm9kZSIsIm1pbiIsIm1heCIsImxlZnQiLCJyaWdodCIsImJvdHRvbSIsIm11dGF0ZSIsImdldFRoZXJtb21ldGVyQm91bmRzIiwiYm91bmRzIiwidGhlcm1vbWV0ZXJCb3VuZHMiLCJnZXRDb2xvckluZGljYXRvckJvdW5kcyIsImNvbG9ySW5kaWNhdG9yQm91bmRzIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJUZW1wZXJhdHVyZUFuZENvbG9yU2Vuc29yTm9kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBBIFNjZW5lcnkgTm9kZSB0aGF0IHBvcnRyYXlzIGEgdGhlcm1vbWV0ZXIgYW5kIGEgdHJpYW5ndWxhciBpbmRpY2F0b3Igb2YgdGhlIHByZWNpc2UgcG9zaXRpb24gd2hlcmUgdGhlIHRlbXBlcmF0dXJlXHJcbiAqIGlzIGJlaW5nIHNlbnNlZC4gVGhlIHRyaWFuZ3VsYXIgaW5kaWNhdG9yIGNhbiBiZSBmaWxsZWQgd2l0aCBhIGNvbG9yIHRvIG1ha2UgaXQgbW9yZSBjbGVhciB3aGF0IGV4YWN0bHkgaXMgYmVpbmdcclxuICogbWVhc3VyZWQuXHJcbiAqXHJcbiAqIEBhdXRob3IgQXJuYWIgUHVya2F5YXN0aGFcclxuICogQGF1dGhvciBKb2huIEJsYW5jb1xyXG4gKi9cclxuXHJcbmltcG9ydCB7IFNoYXBlIH0gZnJvbSAnLi4vLi4va2l0ZS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IFN0cmljdE9taXQgZnJvbSAnLi4vLi4vcGhldC1jb3JlL2pzL3R5cGVzL1N0cmljdE9taXQuanMnO1xyXG5pbXBvcnQgUmFuZ2UgZnJvbSAnLi4vLi4vZG90L2pzL1JhbmdlLmpzJztcclxuaW1wb3J0IHsgQ29sb3IsIFRDb2xvciwgTm9kZSwgTm9kZU9wdGlvbnMsIFBhdGgsIFBhdGhPcHRpb25zIH0gZnJvbSAnLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IHNjZW5lcnlQaGV0IGZyb20gJy4vc2NlbmVyeVBoZXQuanMnO1xyXG5pbXBvcnQgVGhlcm1vbWV0ZXJOb2RlLCB7IFRoZXJtb21ldGVyTm9kZU9wdGlvbnMgfSBmcm9tICcuL1RoZXJtb21ldGVyTm9kZS5qcyc7XHJcbmltcG9ydCBUUHJvcGVydHkgZnJvbSAnLi4vLi4vYXhvbi9qcy9UUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgQm91bmRzMiBmcm9tICcuLi8uLi9kb3QvanMvQm91bmRzMi5qcyc7XHJcbmltcG9ydCBvcHRpb25pemUsIHsgY29tYmluZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9waGV0LWNvcmUvanMvb3B0aW9uaXplLmpzJztcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSB7XHJcblxyXG4gIC8vIGhvcml6b250YWwgc3BhY2luZyBiZXR3ZWVuIGNvbG9yIGluZGljYXRvciBhbmQgdGhlcm1vbWV0ZXJcclxuICBob3Jpem9udGFsU3BhY2U/OiBudW1iZXI7XHJcblxyXG4gIC8vIHZlcnRpY2FsIGRpZmZlcmVuY2UgYmV0d2VlbiBib3R0b20gb2YgY29sb3IgaW5kaWNhdG9yIGFuZCB0aGVybW9tZXRlclxyXG4gIGJvdHRvbU9mZnNldD86IG51bWJlcjtcclxuXHJcbiAgdGhlcm1vbWV0ZXJOb2RlT3B0aW9ucz86IFN0cmljdE9taXQ8VGhlcm1vbWV0ZXJOb2RlT3B0aW9ucywgJ2xlZnQnIHwgJ2JvdHRvbSc+O1xyXG5cclxuICBjb2xvckluZGljYXRvck9wdGlvbnM/OiB7IHNpZGVMZW5ndGg/OiBudW1iZXIgfSAmIFBhdGhPcHRpb25zO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgVGVtcGVyYXR1cmVBbmRDb2xvclNlbnNvck5vZGVPcHRpb25zID0gU2VsZk9wdGlvbnMgJiBOb2RlT3B0aW9ucztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlbXBlcmF0dXJlQW5kQ29sb3JTZW5zb3JOb2RlIGV4dGVuZHMgTm9kZSB7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgY29sb3JJbmRpY2F0b3JOb2RlOiBQYXRoO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgdGhlcm1vbWV0ZXJOb2RlOiBOb2RlO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIHRlbXBlcmF0dXJlUHJvcGVydHk6IFRQcm9wZXJ0eTxudW1iZXI+LCB0ZW1wZXJhdHVyZVJhbmdlOiBSYW5nZSwgY29sb3JQcm9wZXJ0eTogVFByb3BlcnR5PFRDb2xvcj4sXHJcbiAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlZE9wdGlvbnM/OiBUZW1wZXJhdHVyZUFuZENvbG9yU2Vuc29yTm9kZU9wdGlvbnMgKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25pemU8VGVtcGVyYXR1cmVBbmRDb2xvclNlbnNvck5vZGVPcHRpb25zLCBTZWxmT3B0aW9ucywgTm9kZU9wdGlvbnM+KCkoIHtcclxuXHJcbiAgICAgIC8vIFNlbGZPcHRpb25zXHJcbiAgICAgIGhvcml6b250YWxTcGFjZTogMyxcclxuICAgICAgYm90dG9tT2Zmc2V0OiA1LFxyXG4gICAgICB0aGVybW9tZXRlck5vZGVPcHRpb25zOiB7XHJcbiAgICAgICAgYnVsYkRpYW1ldGVyOiAzMCxcclxuICAgICAgICB0dWJlV2lkdGg6IDE4LFxyXG4gICAgICAgIGxpbmVXaWR0aDogMixcclxuICAgICAgICB0aWNrU3BhY2luZ1RlbXBlcmF0dXJlOiAyNSxcclxuICAgICAgICBtYWpvclRpY2tMZW5ndGg6IDEwLFxyXG4gICAgICAgIG1pbm9yVGlja0xlbmd0aDogNSxcclxuICAgICAgICBiYWNrZ3JvdW5kRmlsbDogbmV3IENvbG9yKCAyNTYsIDI1NiwgMjU2LCAwLjY3IClcclxuICAgICAgfSxcclxuICAgICAgY29sb3JJbmRpY2F0b3JPcHRpb25zOiB7XHJcbiAgICAgICAgZmlsbDogbmV3IENvbG9yKCAwLCAwLCAwLCAwICksXHJcbiAgICAgICAgbGluZVdpZHRoOiAyLFxyXG4gICAgICAgIHN0cm9rZTogJ2JsYWNrJyxcclxuICAgICAgICBsaW5lSm9pbjogJ3JvdW5kJyxcclxuICAgICAgICBzaWRlTGVuZ3RoOiAxOFxyXG4gICAgICB9XHJcbiAgICB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICAvLyBBZGQgdGhlIHRyaWFuZ2xlIHRoYXQgd2lsbCBkaXNwbGF5IHRoZSBzZW5zZWQgY29sb3IuXHJcbiAgICAvLyBUaGUgbGVmdG1vc3QgcG9pbnQgb2YgdGhpcyB0cmlhbmdsZSB3aWxsIGNvcnJlc3BvbmQgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBzZW5zb3IgaW4gdGhlIG1vZGVsLlxyXG4gICAgY29uc3QgcyA9IG9wdGlvbnMuY29sb3JJbmRpY2F0b3JPcHRpb25zLnNpZGVMZW5ndGghO1xyXG4gICAgY29uc3QgdHJpYW5nbGVTaGFwZSA9IG5ldyBTaGFwZSgpXHJcbiAgICAgIC5tb3ZlVG8oIDAsIDAgKVxyXG4gICAgICAubGluZVRvKCBNYXRoLmNvcyggTWF0aC5QSSAvIDYgKSAqIHMsIC1NYXRoLnNpbiggTWF0aC5QSSAvIDYgKSAqIHMgKVxyXG4gICAgICAubGluZVRvKCBNYXRoLmNvcyggTWF0aC5QSSAvIDYgKSAqIHMsIE1hdGguc2luKCBNYXRoLlBJIC8gNiApICogcyApXHJcbiAgICAgIC5jbG9zZSgpO1xyXG4gICAgdGhpcy5jb2xvckluZGljYXRvck5vZGUgPSBuZXcgUGF0aCggdHJpYW5nbGVTaGFwZSwgb3B0aW9ucy5jb2xvckluZGljYXRvck9wdGlvbnMgKTtcclxuICAgIGNvbG9yUHJvcGVydHkubGluayggY29sb3IgPT4geyB0aGlzLmNvbG9ySW5kaWNhdG9yTm9kZS5maWxsID0gY29sb3I7IH0gKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIHRoaXMuY29sb3JJbmRpY2F0b3JOb2RlICk7XHJcblxyXG4gICAgdGhpcy50aGVybW9tZXRlck5vZGUgPSBuZXcgVGhlcm1vbWV0ZXJOb2RlKCB0ZW1wZXJhdHVyZVByb3BlcnR5LCB0ZW1wZXJhdHVyZVJhbmdlLm1pbiwgdGVtcGVyYXR1cmVSYW5nZS5tYXgsIGNvbWJpbmVPcHRpb25zPFRoZXJtb21ldGVyTm9kZU9wdGlvbnM+KCB7XHJcbiAgICAgIGxlZnQ6IHRoaXMuY29sb3JJbmRpY2F0b3JOb2RlLnJpZ2h0ICsgb3B0aW9ucy5ob3Jpem9udGFsU3BhY2UsXHJcbiAgICAgIGJvdHRvbTogdGhpcy5jb2xvckluZGljYXRvck5vZGUuYm90dG9tICsgb3B0aW9ucy5ib3R0b21PZmZzZXRcclxuICAgIH0sIG9wdGlvbnMudGhlcm1vbWV0ZXJOb2RlT3B0aW9ucyApICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCB0aGlzLnRoZXJtb21ldGVyTm9kZSApO1xyXG5cclxuICAgIHRoaXMubXV0YXRlKCBvcHRpb25zICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VGhlcm1vbWV0ZXJCb3VuZHMoKTogQm91bmRzMiB7XHJcbiAgICByZXR1cm4gdGhpcy50aGVybW9tZXRlck5vZGUuYm91bmRzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB0aGVybW9tZXRlckJvdW5kcygpOiBCb3VuZHMyIHsgcmV0dXJuIHRoaXMuZ2V0VGhlcm1vbWV0ZXJCb3VuZHMoKTsgfVxyXG5cclxuICBwdWJsaWMgZ2V0Q29sb3JJbmRpY2F0b3JCb3VuZHMoKTogQm91bmRzMiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2xvckluZGljYXRvck5vZGUuYm91bmRzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBjb2xvckluZGljYXRvckJvdW5kcygpOiBCb3VuZHMyIHsgcmV0dXJuIHRoaXMuZ2V0Q29sb3JJbmRpY2F0b3JCb3VuZHMoKTsgfVxyXG59XHJcblxyXG5zY2VuZXJ5UGhldC5yZWdpc3RlciggJ1RlbXBlcmF0dXJlQW5kQ29sb3JTZW5zb3JOb2RlJywgVGVtcGVyYXR1cmVBbmRDb2xvclNlbnNvck5vZGUgKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsS0FBSyxRQUFRLDBCQUEwQjtBQUdoRCxTQUFTQyxLQUFLLEVBQVVDLElBQUksRUFBZUMsSUFBSSxRQUFxQiw2QkFBNkI7QUFDakcsT0FBT0MsV0FBVyxNQUFNLGtCQUFrQjtBQUMxQyxPQUFPQyxlQUFlLE1BQWtDLHNCQUFzQjtBQUc5RSxPQUFPQyxTQUFTLElBQUlDLGNBQWMsUUFBUSxpQ0FBaUM7QUFpQjNFLGVBQWUsTUFBTUMsNkJBQTZCLFNBQVNOLElBQUksQ0FBQztFQUt2RE8sV0FBV0EsQ0FBRUMsbUJBQXNDLEVBQUVDLGdCQUF1QixFQUFFQyxhQUFnQyxFQUNqR0MsZUFBc0QsRUFBRztJQUMzRSxLQUFL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