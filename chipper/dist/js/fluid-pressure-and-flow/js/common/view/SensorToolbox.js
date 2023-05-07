// Copyright 2017-2022, University of Colorado Boulder

/**
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { DragListener, HBox, SimpleDragHandler } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import fluidPressureAndFlow from '../../fluidPressureAndFlow.js';
import Constants from '../Constants.js';
import Sensor from '../model/Sensor.js';
import VelocitySensor from '../model/VelocitySensor.js';
import BarometerNode from './BarometerNode.js';
import VelocitySensorNode from './VelocitySensorNode.js';
class SensorToolbox extends Panel {
  /**
   * @param {FlowModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @param {FlowScreenView} screenView
   * @param {Object} [options]
   */
  constructor(model, modelViewTransform, screenView, options) {
    options = merge({
      // TODO padding/margin around panel edges
    }, options);

    // create icons, not real sensors
    const velocitySensorIcon = new VelocitySensorNode(ModelViewTransform2.createIdentity(), new VelocitySensor(new Vector2(0, 0), new Vector2(0, 0)), model.measureUnitsProperty, [model.pipe.flowRateProperty, model.pipe.frictionProperty], model.getVelocityAt.bind(model), Bounds2.EVERYTHING,
    // never used for the icon
    Bounds2.EVERYTHING,
    // never used for the icon
    {
      scale: 0.9,
      isIcon: true
    });
    const barometerIcon = new BarometerNode(ModelViewTransform2.createIdentity(), new Sensor(new Vector2(0, 0), new Vector2(0, 0)), model.measureUnitsProperty, [model.fluidDensityProperty, model.pipe.flowRateProperty, model.pipe.frictionProperty], model.getPressureAtCoords.bind(model), model.getPressureString.bind(model), velocitySensorIcon.localBounds,
    // never used for the icon
    velocitySensorIcon.localBounds,
    // never used for the icon
    {
      minPressure: Constants.MIN_PRESSURE,
      maxPressure: Constants.MAX_PRESSURE,
      isIcon: true
    });

    // Create the panel from the icons
    const container = new HBox({
      children: [velocitySensorIcon, barometerIcon],
      spacing: 10,
      excludeInvisibleChildrenFromBounds: false
    });
    super(container, options);

    // TODO, make sure that this is the best way to get the position of the icon in units that the sensor's positionProperty can use
    const velocitySensorInitialPosition = velocitySensorIcon.localToGlobalPoint(new Vector2(velocitySensorIcon.x, velocitySensorIcon.y));
    this.velocitySensorNodes = []; // @private

    // add velocitySensors within the sensor panel bounds
    _.each(model.speedometers, velocitySensor => {
      const velocitySensorNode = new VelocitySensorNode(modelViewTransform, velocitySensor, model.measureUnitsProperty, [model.pipe.flowRateProperty, model.pipe.frictionProperty], model.getVelocityAt.bind(model), this.visibleBounds, screenView.layoutBounds, {
        initialPosition: velocitySensorInitialPosition.roundedSymmetric(),
        scale: 0.9,
        visible: false
      });

      // show the sensor icon whenever this velocity sensor is hidden back into the toolbox
      velocitySensorNode.addInputListener(getMakeIconVisibleListener(velocitySensorNode, velocitySensorIcon));

      // center the real velocity sensor on the icon.
      // TODO, just a hack until I find something better. I'm not sure why this is different from barometers
      velocitySensor.positionProperty._initialValue = velocitySensorInitialPosition;
      velocitySensor.positionProperty.value = velocitySensorInitialPosition;
      this.velocitySensorNodes.push(velocitySensorNode);
      screenView.addChild(velocitySensorNode);
    });
    velocitySensorIcon.addInputListener(SimpleDragHandler.createForwardingListener(event => {
      handleSensorVisibilityAndDrag(this.velocitySensorNodes, velocitySensorIcon, event);
    }));

    // TODO, make sure that this is the best way to get the position of the icon in units that the sensor's positionProperty can use
    this.barometerNodes = []; // @private

    // add barometers within the sensor panel bounds
    _.each(model.barometers, barometer => {
      const barometerNode = new BarometerNode(modelViewTransform, barometer, model.measureUnitsProperty, [model.fluidDensityProperty, model.pipe.flowRateProperty, model.pipe.frictionProperty], model.getPressureAtCoords.bind(model), model.getPressureString.bind(model), this.visibleBounds, screenView.layoutBounds, {
        minPressure: Constants.MIN_PRESSURE,
        maxPressure: Constants.MAX_PRESSURE,
        scale: 0.9,
        visible: false,
        initialPosition: barometer.positionProperty.get()
      });

      // show the sensor icon whenever this barometer is hidden back into the toolbox
      barometerNode.addInputListener(getMakeIconVisibleListener(barometerNode, barometerIcon));
      this.barometerNodes.push(barometerNode);
      screenView.addChild(barometerNode);
    });
    barometerIcon.addInputListener(DragListener.createForwardingListener(event => {
      handleSensorVisibilityAndDrag(this.barometerNodes, barometerIcon, event);
    }));
  }

  /**
   * @public
   */
  reset() {
    this.velocitySensorNodes.forEach(sensor => {
      sensor.visible = false;
    });
    this.barometerNodes.forEach(sensor => {
      sensor.visible = false;
    });
  }
}

/**
 * update the visibility of the next invisible sensor. Adjust the icon's visibility if all sensors are visible, and
 * manage the drag accordingly for the sensor
 * @param {Array.<Node>} sensors
 * @param {Node} icon
 * @param {SceneryEvent} event
 * @returns {Node|null} sensor - the first invisible sensor
 */
function handleSensorVisibilityAndDrag(sensors, icon, event) {
  // Get the first sensor in the list that is invisible
  const getFirstInvisible = () => {
    for (let i = 0; i < sensors.length; i++) {
      const sensor = sensors[i];
      if (!sensor.visible) {
        return sensor;
      }
    }
    throw new Error('There should always be an invisible sensor if forwarding an event.');
  };
  const nextInvisibleSensor = getFirstInvisible();
  nextInvisibleSensor.visible = true;
  nextInvisibleSensor.dragListener.press(event);
  let visibleSensors = 0;
  for (let i = 0; i < sensors.length; i++) {
    const sensor = sensors[i];
    if (sensor.visible) {
      visibleSensors += 1;
    }
  }
  icon.visible = !(visibleSensors === sensors.length);
}

/**
 * Given a sensor and it's icon, get the listener needed to show the icon when the sensor is made invisible
 * (put back in the toolbox).
 * @param sensorNode
 * @param icon
 * @returns {{up: function, cancel: function}} - the listener object
 */
function getMakeIconVisibleListener(sensorNode, icon) {
  const makeSensorVisible = () => {
    if (sensorNode.visible === false) {
      icon.visible = true;
    }
  };

  // TODO: SR is the 'up' event robust enough here? I'm trying to add on to the enddrag of the sensorNode
  return {
    up: makeSensorVisible,
    cancel: makeSensorVisible
  };
}
fluidPressureAndFlow.register('SensorToolbox', SensorToolbox);
export default SensorToolbox;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCb3VuZHMyIiwiVmVjdG9yMiIsIm1lcmdlIiwiTW9kZWxWaWV3VHJhbnNmb3JtMiIsIkRyYWdMaXN0ZW5lciIsIkhCb3giLCJTaW1wbGVEcmFnSGFuZGxlciIsIlBhbmVsIiwiZmx1aWRQcmVzc3VyZUFuZEZsb3ciLCJDb25zdGFudHMiLCJTZW5zb3IiLCJWZWxvY2l0eVNlbnNvciIsIkJhcm9tZXRlck5vZGUiLCJWZWxvY2l0eVNlbnNvck5vZGUiLCJTZW5zb3JUb29sYm94IiwiY29uc3RydWN0b3IiLCJtb2RlbCIsIm1vZGVsVmlld1RyYW5zZm9ybSIsInNjcmVlblZpZXciLCJvcHRpb25zIiwidmVsb2NpdHlTZW5zb3JJY29uIiwiY3JlYXRlSWRlbnRpdHkiLCJtZWFzdXJlVW5pdHNQcm9wZXJ0eSIsInBpcGUiLCJmbG93UmF0ZVByb3BlcnR5IiwiZnJpY3Rpb25Qcm9wZXJ0eSIsImdldFZlbG9jaXR5QXQiLCJiaW5kIiwiRVZFUllUSElORyIsInNjYWxlIiwiaXNJY29uIiwiYmFyb21ldGVySWNvbiIsImZsdWlkRGVuc2l0eVByb3BlcnR5IiwiZ2V0UHJlc3N1cmVBdENvb3JkcyIsImdldFByZXNzdXJlU3RyaW5nIiwibG9jYWxCb3VuZHMiLCJtaW5QcmVzc3VyZSIsIk1JTl9QUkVTU1VSRSIsIm1heFByZXNzdXJlIiwiTUFYX1BSRVNTVVJFIiwiY29udGFpbmVyIiwiY2hpbGRyZW4iLCJzcGFjaW5nIiwiZXhjbHVkZUludmlzaWJsZUNoaWxkcmVuRnJvbUJvdW5kcyIsInZlbG9jaXR5U2Vuc29ySW5pdGlhbFBvc2l0aW9uIiwibG9jYWxUb0dsb2JhbFBvaW50IiwieCIsInkiLCJ2ZWxvY2l0eVNlbnNvck5vZGVzIiwiXyIsImVhY2giLCJzcGVlZG9tZXRlcnMiLCJ2ZWxvY2l0eVNlbnNvciIsInZlbG9jaXR5U2Vuc29yTm9kZSIsInZpc2libGVCb3VuZHMiLCJsYXlvdXRCb3VuZHMiLCJpbml0aWFsUG9zaXRpb24iLCJyb3VuZGVkU3ltbWV0cmljIiwidmlzaWJsZSIsImFkZElucHV0TGlzdGVuZXIiLCJnZXRNYWtlSWNvblZpc2libGVMaXN0ZW5lciIsInBvc2l0aW9uUHJvcGVydHkiLCJfaW5pdGlhbFZhbHVlIiwidmFsdWUiLCJwdXNoIiwiYWRkQ2hpbGQiLCJjcmVhdGVGb3J3YXJkaW5nTGlzdGVuZXIiLCJldmVudCIsImhhbmRsZVNlbnNvclZpc2liaWxpdHlBbmREcmFnIiwiYmFyb21ldGVyTm9kZXMiLCJiYXJvbWV0ZXJzIiwiYmFyb21ldGVyIiwiYmFyb21ldGVyTm9kZSIsImdldCIsInJlc2V0IiwiZm9yRWFjaCIsInNlbnNvciIsInNlbnNvcnMiLCJpY29uIiwiZ2V0Rmlyc3RJbnZpc2libGUiLCJpIiwibGVuZ3RoIiwiRXJyb3IiLCJuZXh0SW52aXNpYmxlU2Vuc29yIiwiZHJhZ0xpc3RlbmVyIiwicHJlc3MiLCJ2aXNpYmxlU2Vuc29ycyIsInNlbnNvck5vZGUiLCJtYWtlU2Vuc29yVmlzaWJsZSIsInVwIiwiY2FuY2VsIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJTZW5zb3JUb29sYm94LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE3LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgTWljaGFlbCBLYXV6bWFubiAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgQm91bmRzMiBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvQm91bmRzMi5qcyc7XHJcbmltcG9ydCBWZWN0b3IyIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9WZWN0b3IyLmpzJztcclxuaW1wb3J0IG1lcmdlIGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9tZXJnZS5qcyc7XHJcbmltcG9ydCBNb2RlbFZpZXdUcmFuc2Zvcm0yIGZyb20gJy4uLy4uLy4uLy4uL3BoZXRjb21tb24vanMvdmlldy9Nb2RlbFZpZXdUcmFuc2Zvcm0yLmpzJztcclxuaW1wb3J0IHsgRHJhZ0xpc3RlbmVyLCBIQm94LCBTaW1wbGVEcmFnSGFuZGxlciB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBQYW5lbCBmcm9tICcuLi8uLi8uLi8uLi9zdW4vanMvUGFuZWwuanMnO1xyXG5pbXBvcnQgZmx1aWRQcmVzc3VyZUFuZEZsb3cgZnJvbSAnLi4vLi4vZmx1aWRQcmVzc3VyZUFuZEZsb3cuanMnO1xyXG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gJy4uL0NvbnN0YW50cy5qcyc7XHJcbmltcG9ydCBTZW5zb3IgZnJvbSAnLi4vbW9kZWwvU2Vuc29yLmpzJztcclxuaW1wb3J0IFZlbG9jaXR5U2Vuc29yIGZyb20gJy4uL21vZGVsL1ZlbG9jaXR5U2Vuc29yLmpzJztcclxuaW1wb3J0IEJhcm9tZXRlck5vZGUgZnJvbSAnLi9CYXJvbWV0ZXJOb2RlLmpzJztcclxuaW1wb3J0IFZlbG9jaXR5U2Vuc29yTm9kZSBmcm9tICcuL1ZlbG9jaXR5U2Vuc29yTm9kZS5qcyc7XHJcblxyXG5jbGFzcyBTZW5zb3JUb29sYm94IGV4dGVuZHMgUGFuZWwge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge0Zsb3dNb2RlbH0gbW9kZWxcclxuICAgKiBAcGFyYW0ge01vZGVsVmlld1RyYW5zZm9ybTJ9IG1vZGVsVmlld1RyYW5zZm9ybVxyXG4gICAqIEBwYXJhbSB7Rmxvd1NjcmVlblZpZXd9IHNjcmVlblZpZXdcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIG1vZGVsLCBtb2RlbFZpZXdUcmFuc2Zvcm0sIHNjcmVlblZpZXcsIG9wdGlvbnMgKSB7XHJcblxyXG4gICAgb3B0aW9ucyA9IG1lcmdlKCB7XHJcbiAgICAgIC8vIFRPRE8gcGFkZGluZy9tYXJnaW4gYXJvdW5kIHBhbmVsIGVkZ2VzXHJcbiAgICB9LCBvcHRpb25zICk7XHJcblxyXG4gICAgLy8gY3JlYXRlIGljb25zLCBub3QgcmVhbCBzZW5zb3JzXHJcbiAgICBjb25zdCB2ZWxvY2l0eVNlbnNvckljb24gPSBuZXcgVmVsb2NpdHlTZW5zb3JOb2RlKFxyXG4gICAgICBNb2RlbFZpZXdUcmFuc2Zvcm0yLmNyZWF0ZUlkZW50aXR5KCksXHJcbiAgICAgIG5ldyBWZWxvY2l0eVNlbnNvciggbmV3IFZlY3RvcjIoIDAsIDAgKSwgbmV3IFZlY3RvcjIoIDAsIDAgKSApLFxyXG4gICAgICBtb2RlbC5tZWFzdXJlVW5pdHNQcm9wZXJ0eSxcclxuICAgICAgWyBtb2RlbC5waXBlLmZsb3dSYXRlUHJvcGVydHksIG1vZGVsLnBpcGUuZnJpY3Rpb25Qcm9wZXJ0eSBdLFxyXG4gICAgICBtb2RlbC5nZXRWZWxvY2l0eUF0LmJpbmQoIG1vZGVsICksXHJcbiAgICAgIEJvdW5kczIuRVZFUllUSElORywgLy8gbmV2ZXIgdXNlZCBmb3IgdGhlIGljb25cclxuICAgICAgQm91bmRzMi5FVkVSWVRISU5HLCAvLyBuZXZlciB1c2VkIGZvciB0aGUgaWNvblxyXG4gICAgICB7IHNjYWxlOiAwLjksIGlzSWNvbjogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGJhcm9tZXRlckljb24gPSBuZXcgQmFyb21ldGVyTm9kZShcclxuICAgICAgTW9kZWxWaWV3VHJhbnNmb3JtMi5jcmVhdGVJZGVudGl0eSgpLFxyXG4gICAgICBuZXcgU2Vuc29yKCBuZXcgVmVjdG9yMiggMCwgMCApLCBuZXcgVmVjdG9yMiggMCwgMCApICksXHJcbiAgICAgIG1vZGVsLm1lYXN1cmVVbml0c1Byb3BlcnR5LFxyXG4gICAgICBbIG1vZGVsLmZsdWlkRGVuc2l0eVByb3BlcnR5LCBtb2RlbC5waXBlLmZsb3dSYXRlUHJvcGVydHksIG1vZGVsLnBpcGUuZnJpY3Rpb25Qcm9wZXJ0eSBdLFxyXG4gICAgICBtb2RlbC5nZXRQcmVzc3VyZUF0Q29vcmRzLmJpbmQoIG1vZGVsICksXHJcbiAgICAgIG1vZGVsLmdldFByZXNzdXJlU3RyaW5nLmJpbmQoIG1vZGVsICksXHJcbiAgICAgIHZlbG9jaXR5U2Vuc29ySWNvbi5sb2NhbEJvdW5kcywgLy8gbmV2ZXIgdXNlZCBmb3IgdGhlIGljb25cclxuICAgICAgdmVsb2NpdHlTZW5zb3JJY29uLmxvY2FsQm91bmRzLCAvLyBuZXZlciB1c2VkIGZvciB0aGUgaWNvblxyXG4gICAgICB7XHJcbiAgICAgICAgbWluUHJlc3N1cmU6IENvbnN0YW50cy5NSU5fUFJFU1NVUkUsXHJcbiAgICAgICAgbWF4UHJlc3N1cmU6IENvbnN0YW50cy5NQVhfUFJFU1NVUkUsXHJcbiAgICAgICAgaXNJY29uOiB0cnVlXHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIHRoZSBwYW5lbCBmcm9tIHRoZSBpY29uc1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gbmV3IEhCb3goIHtcclxuICAgICAgY2hpbGRyZW46IFsgdmVsb2NpdHlTZW5zb3JJY29uLCBiYXJvbWV0ZXJJY29uIF0sXHJcbiAgICAgIHNwYWNpbmc6IDEwLFxyXG4gICAgICBleGNsdWRlSW52aXNpYmxlQ2hpbGRyZW5Gcm9tQm91bmRzOiBmYWxzZVxyXG4gICAgfSApO1xyXG5cclxuICAgIHN1cGVyKCBjb250YWluZXIsIG9wdGlvbnMgKTtcclxuXHJcbiAgICAvLyBUT0RPLCBtYWtlIHN1cmUgdGhhdCB0aGlzIGlzIHRoZSBiZXN0IHdheSB0byBnZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBpY29uIGluIHVuaXRzIHRoYXQgdGhlIHNlbnNvcidzIHBvc2l0aW9uUHJvcGVydHkgY2FuIHVzZVxyXG4gICAgY29uc3QgdmVsb2NpdHlTZW5zb3JJbml0aWFsUG9zaXRpb24gPSB2ZWxvY2l0eVNlbnNvckljb24ubG9jYWxUb0dsb2JhbFBvaW50KCBuZXcgVmVjdG9yMiggdmVsb2NpdHlTZW5zb3JJY29uLngsIHZlbG9jaXR5U2Vuc29ySWNvbi55ICkgKTtcclxuICAgIHRoaXMudmVsb2NpdHlTZW5zb3JOb2RlcyA9IFtdOyAvLyBAcHJpdmF0ZVxyXG5cclxuICAgIC8vIGFkZCB2ZWxvY2l0eVNlbnNvcnMgd2l0aGluIHRoZSBzZW5zb3IgcGFuZWwgYm91bmRzXHJcbiAgICBfLmVhY2goIG1vZGVsLnNwZWVkb21ldGVycywgdmVsb2NpdHlTZW5zb3IgPT4ge1xyXG5cclxuICAgICAgY29uc3QgdmVsb2NpdHlTZW5zb3JOb2RlID0gbmV3IFZlbG9jaXR5U2Vuc29yTm9kZShcclxuICAgICAgICBtb2RlbFZpZXdUcmFuc2Zvcm0sXHJcbiAgICAgICAgdmVsb2NpdHlTZW5zb3IsXHJcbiAgICAgICAgbW9kZWwubWVhc3VyZVVuaXRzUHJvcGVydHksXHJcbiAgICAgICAgWyBtb2RlbC5waXBlLmZsb3dSYXRlUHJvcGVydHksIG1vZGVsLnBpcGUuZnJpY3Rpb25Qcm9wZXJ0eSBdLFxyXG4gICAgICAgIG1vZGVsLmdldFZlbG9jaXR5QXQuYmluZCggbW9kZWwgKSxcclxuICAgICAgICB0aGlzLnZpc2libGVCb3VuZHMsXHJcbiAgICAgICAgc2NyZWVuVmlldy5sYXlvdXRCb3VuZHMsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW5pdGlhbFBvc2l0aW9uOiB2ZWxvY2l0eVNlbnNvckluaXRpYWxQb3NpdGlvbi5yb3VuZGVkU3ltbWV0cmljKCksXHJcbiAgICAgICAgICBzY2FsZTogMC45LFxyXG4gICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvLyBzaG93IHRoZSBzZW5zb3IgaWNvbiB3aGVuZXZlciB0aGlzIHZlbG9jaXR5IHNlbnNvciBpcyBoaWRkZW4gYmFjayBpbnRvIHRoZSB0b29sYm94XHJcbiAgICAgIHZlbG9jaXR5U2Vuc29yTm9kZS5hZGRJbnB1dExpc3RlbmVyKCBnZXRNYWtlSWNvblZpc2libGVMaXN0ZW5lciggdmVsb2NpdHlTZW5zb3JOb2RlLCB2ZWxvY2l0eVNlbnNvckljb24gKSApO1xyXG5cclxuICAgICAgLy8gY2VudGVyIHRoZSByZWFsIHZlbG9jaXR5IHNlbnNvciBvbiB0aGUgaWNvbi5cclxuICAgICAgLy8gVE9ETywganVzdCBhIGhhY2sgdW50aWwgSSBmaW5kIHNvbWV0aGluZyBiZXR0ZXIuIEknbSBub3Qgc3VyZSB3aHkgdGhpcyBpcyBkaWZmZXJlbnQgZnJvbSBiYXJvbWV0ZXJzXHJcbiAgICAgIHZlbG9jaXR5U2Vuc29yLnBvc2l0aW9uUHJvcGVydHkuX2luaXRpYWxWYWx1ZSA9IHZlbG9jaXR5U2Vuc29ySW5pdGlhbFBvc2l0aW9uO1xyXG4gICAgICB2ZWxvY2l0eVNlbnNvci5wb3NpdGlvblByb3BlcnR5LnZhbHVlID0gdmVsb2NpdHlTZW5zb3JJbml0aWFsUG9zaXRpb247XHJcblxyXG4gICAgICB0aGlzLnZlbG9jaXR5U2Vuc29yTm9kZXMucHVzaCggdmVsb2NpdHlTZW5zb3JOb2RlICk7XHJcbiAgICAgIHNjcmVlblZpZXcuYWRkQ2hpbGQoIHZlbG9jaXR5U2Vuc29yTm9kZSApO1xyXG4gICAgfSApO1xyXG5cclxuICAgIHZlbG9jaXR5U2Vuc29ySWNvbi5hZGRJbnB1dExpc3RlbmVyKCBTaW1wbGVEcmFnSGFuZGxlci5jcmVhdGVGb3J3YXJkaW5nTGlzdGVuZXIoIGV2ZW50ID0+IHtcclxuICAgICAgaGFuZGxlU2Vuc29yVmlzaWJpbGl0eUFuZERyYWcoIHRoaXMudmVsb2NpdHlTZW5zb3JOb2RlcywgdmVsb2NpdHlTZW5zb3JJY29uLCBldmVudCApO1xyXG4gICAgfSApICk7XHJcblxyXG5cclxuICAgIC8vIFRPRE8sIG1ha2Ugc3VyZSB0aGF0IHRoaXMgaXMgdGhlIGJlc3Qgd2F5IHRvIGdldCB0aGUgcG9zaXRpb24gb2YgdGhlIGljb24gaW4gdW5pdHMgdGhhdCB0aGUgc2Vuc29yJ3MgcG9zaXRpb25Qcm9wZXJ0eSBjYW4gdXNlXHJcbiAgICB0aGlzLmJhcm9tZXRlck5vZGVzID0gW107IC8vIEBwcml2YXRlXHJcblxyXG4gICAgLy8gYWRkIGJhcm9tZXRlcnMgd2l0aGluIHRoZSBzZW5zb3IgcGFuZWwgYm91bmRzXHJcbiAgICBfLmVhY2goIG1vZGVsLmJhcm9tZXRlcnMsIGJhcm9tZXRlciA9PiB7XHJcblxyXG4gICAgICBjb25zdCBiYXJvbWV0ZXJOb2RlID0gbmV3IEJhcm9tZXRlck5vZGUoXHJcbiAgICAgICAgbW9kZWxWaWV3VHJhbnNmb3JtLFxyXG4gICAgICAgIGJhcm9tZXRlcixcclxuICAgICAgICBtb2RlbC5tZWFzdXJlVW5pdHNQcm9wZXJ0eSxcclxuICAgICAgICBbIG1vZGVsLmZsdWlkRGVuc2l0eVByb3BlcnR5LCBtb2RlbC5waXBlLmZsb3dSYXRlUHJvcGVydHksIG1vZGVsLnBpcGUuZnJpY3Rpb25Qcm9wZXJ0eSBdLFxyXG4gICAgICAgIG1vZGVsLmdldFByZXNzdXJlQXRDb29yZHMuYmluZCggbW9kZWwgKSxcclxuICAgICAgICBtb2RlbC5nZXRQcmVzc3VyZVN0cmluZy5iaW5kKCBtb2RlbCApLFxyXG4gICAgICAgIHRoaXMudmlzaWJsZUJvdW5kcyxcclxuICAgICAgICBzY3JlZW5WaWV3LmxheW91dEJvdW5kcyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBtaW5QcmVzc3VyZTogQ29uc3RhbnRzLk1JTl9QUkVTU1VSRSxcclxuICAgICAgICAgIG1heFByZXNzdXJlOiBDb25zdGFudHMuTUFYX1BSRVNTVVJFLFxyXG4gICAgICAgICAgc2NhbGU6IDAuOSxcclxuICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgaW5pdGlhbFBvc2l0aW9uOiBiYXJvbWV0ZXIucG9zaXRpb25Qcm9wZXJ0eS5nZXQoKVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIHNob3cgdGhlIHNlbnNvciBpY29uIHdoZW5ldmVyIHRoaXMgYmFyb21ldGVyIGlzIGhpZGRlbiBiYWNrIGludG8gdGhlIHRvb2xib3hcclxuICAgICAgYmFyb21ldGVyTm9kZS5hZGRJbnB1dExpc3RlbmVyKCBnZXRNYWtlSWNvblZpc2libGVMaXN0ZW5lciggYmFyb21ldGVyTm9kZSwgYmFyb21ldGVySWNvbiApICk7XHJcblxyXG4gICAgICB0aGlzLmJhcm9tZXRlck5vZGVzLnB1c2goIGJhcm9tZXRlck5vZGUgKTtcclxuICAgICAgc2NyZWVuVmlldy5hZGRDaGlsZCggYmFyb21ldGVyTm9kZSApO1xyXG5cclxuICAgIH0gKTtcclxuXHJcbiAgICBiYXJvbWV0ZXJJY29uLmFkZElucHV0TGlzdGVuZXIoIERyYWdMaXN0ZW5lci5jcmVhdGVGb3J3YXJkaW5nTGlzdGVuZXIoIGV2ZW50ID0+IHtcclxuICAgICAgaGFuZGxlU2Vuc29yVmlzaWJpbGl0eUFuZERyYWcoIHRoaXMuYmFyb21ldGVyTm9kZXMsIGJhcm9tZXRlckljb24sIGV2ZW50ICk7XHJcbiAgICB9ICkgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICByZXNldCgpIHtcclxuXHJcbiAgICB0aGlzLnZlbG9jaXR5U2Vuc29yTm9kZXMuZm9yRWFjaCggc2Vuc29yID0+IHtcclxuICAgICAgc2Vuc29yLnZpc2libGUgPSBmYWxzZTtcclxuICAgIH0gKTtcclxuXHJcbiAgICB0aGlzLmJhcm9tZXRlck5vZGVzLmZvckVhY2goIHNlbnNvciA9PiB7XHJcbiAgICAgIHNlbnNvci52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB9ICk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBuZXh0IGludmlzaWJsZSBzZW5zb3IuIEFkanVzdCB0aGUgaWNvbidzIHZpc2liaWxpdHkgaWYgYWxsIHNlbnNvcnMgYXJlIHZpc2libGUsIGFuZFxyXG4gKiBtYW5hZ2UgdGhlIGRyYWcgYWNjb3JkaW5nbHkgZm9yIHRoZSBzZW5zb3JcclxuICogQHBhcmFtIHtBcnJheS48Tm9kZT59IHNlbnNvcnNcclxuICogQHBhcmFtIHtOb2RlfSBpY29uXHJcbiAqIEBwYXJhbSB7U2NlbmVyeUV2ZW50fSBldmVudFxyXG4gKiBAcmV0dXJucyB7Tm9kZXxudWxsfSBzZW5zb3IgLSB0aGUgZmlyc3QgaW52aXNpYmxlIHNlbnNvclxyXG4gKi9cclxuZnVuY3Rpb24gaGFuZGxlU2Vuc29yVmlzaWJpbGl0eUFuZERyYWcoIHNlbnNvcnMsIGljb24sIGV2ZW50ICkge1xyXG5cclxuICAvLyBHZXQgdGhlIGZpcnN0IHNlbnNvciBpbiB0aGUgbGlzdCB0aGF0IGlzIGludmlzaWJsZVxyXG4gIGNvbnN0IGdldEZpcnN0SW52aXNpYmxlID0gKCkgPT4ge1xyXG4gICAgZm9yICggbGV0IGkgPSAwOyBpIDwgc2Vuc29ycy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgY29uc3Qgc2Vuc29yID0gc2Vuc29yc1sgaSBdO1xyXG4gICAgICBpZiAoICFzZW5zb3IudmlzaWJsZSApIHtcclxuICAgICAgICByZXR1cm4gc2Vuc29yO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoICdUaGVyZSBzaG91bGQgYWx3YXlzIGJlIGFuIGludmlzaWJsZSBzZW5zb3IgaWYgZm9yd2FyZGluZyBhbiBldmVudC4nICk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbmV4dEludmlzaWJsZVNlbnNvciA9IGdldEZpcnN0SW52aXNpYmxlKCk7XHJcbiAgbmV4dEludmlzaWJsZVNlbnNvci52aXNpYmxlID0gdHJ1ZTtcclxuICBuZXh0SW52aXNpYmxlU2Vuc29yLmRyYWdMaXN0ZW5lci5wcmVzcyggZXZlbnQgKTtcclxuXHJcbiAgbGV0IHZpc2libGVTZW5zb3JzID0gMDtcclxuICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBzZW5zb3JzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgY29uc3Qgc2Vuc29yID0gc2Vuc29yc1sgaSBdO1xyXG4gICAgaWYgKCBzZW5zb3IudmlzaWJsZSApIHtcclxuICAgICAgdmlzaWJsZVNlbnNvcnMgKz0gMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGljb24udmlzaWJsZSA9ICEoIHZpc2libGVTZW5zb3JzID09PSBzZW5zb3JzLmxlbmd0aCApO1xyXG59XHJcblxyXG4vKipcclxuICogR2l2ZW4gYSBzZW5zb3IgYW5kIGl0J3MgaWNvbiwgZ2V0IHRoZSBsaXN0ZW5lciBuZWVkZWQgdG8gc2hvdyB0aGUgaWNvbiB3aGVuIHRoZSBzZW5zb3IgaXMgbWFkZSBpbnZpc2libGVcclxuICogKHB1dCBiYWNrIGluIHRoZSB0b29sYm94KS5cclxuICogQHBhcmFtIHNlbnNvck5vZGVcclxuICogQHBhcmFtIGljb25cclxuICogQHJldHVybnMge3t1cDogZnVuY3Rpb24sIGNhbmNlbDogZnVuY3Rpb259fSAtIHRoZSBsaXN0ZW5lciBvYmplY3RcclxuICovXHJcbmZ1bmN0aW9uIGdldE1ha2VJY29uVmlzaWJsZUxpc3RlbmVyKCBzZW5zb3JOb2RlLCBpY29uICkge1xyXG5cclxuICBjb25zdCBtYWtlU2Vuc29yVmlzaWJsZSA9ICgpID0+IHtcclxuICAgIGlmICggc2Vuc29yTm9kZS52aXNpYmxlID09PSBmYWxzZSApIHtcclxuICAgICAgaWNvbi52aXNpYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBUT0RPOiBTUiBpcyB0aGUgJ3VwJyBldmVudCByb2J1c3QgZW5vdWdoIGhlcmU/IEknbSB0cnlpbmcgdG8gYWRkIG9uIHRvIHRoZSBlbmRkcmFnIG9mIHRoZSBzZW5zb3JOb2RlXHJcbiAgcmV0dXJuIHtcclxuICAgIHVwOiBtYWtlU2Vuc29yVmlzaWJsZSxcclxuICAgIGNhbmNlbDogbWFrZVNlbnNvclZpc2libGVcclxuICB9O1xyXG59XHJcblxyXG5mbHVpZFByZXNzdXJlQW5kRmxvdy5yZWdpc3RlciggJ1NlbnNvclRvb2xib3gnLCBTZW5zb3JUb29sYm94ICk7XHJcbmV4cG9ydCBkZWZhdWx0IFNlbnNvclRvb2xib3g7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsT0FBTyxNQUFNLCtCQUErQjtBQUNuRCxPQUFPQyxPQUFPLE1BQU0sK0JBQStCO0FBQ25ELE9BQU9DLEtBQUssTUFBTSxtQ0FBbUM7QUFD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