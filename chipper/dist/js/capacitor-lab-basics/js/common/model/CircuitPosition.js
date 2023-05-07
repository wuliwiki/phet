// Copyright 2020-2021, University of Colorado Boulder

/**
 * Enumeration of wire connection points for Capacitor Lab: Basics
 *
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import capacitorLabBasics from '../../capacitorLabBasics.js';
const CircuitPosition = {
  BATTERY_TOP: 'BATTERY_TOP',
  BATTERY_BOTTOM: 'BATTERY_BOTTOM',
  LIGHT_BULB_TOP: 'LIGHT_BULB_TOP',
  LIGHT_BULB_BOTTOM: 'LIGHT_BULB_BOTTOM',
  CAPACITOR_TOP: 'CAPACITOR_TOP',
  CAPACITOR_BOTTOM: 'CAPACITOR_BOTTOM',
  CIRCUIT_SWITCH_TOP: 'CIRCUIT_SWITCH_TOP',
  CIRCUIT_SWITCH_BOTTOM: 'CIRCUIT_SWITCH_BOTTOM'
};

// @public {Array.<CircuitPosition>}
CircuitPosition.VALUES = [CircuitPosition.BATTERY_TOP, CircuitPosition.BATTERY_BOTTOM, CircuitPosition.LIGHT_BULB_TOP, CircuitPosition.LIGHT_BULB_BOTTOM, CircuitPosition.CAPACITOR_TOP, CircuitPosition.CAPACITOR_BOTTOM, CircuitPosition.CIRCUIT_SWITCH_TOP, CircuitPosition.CIRCUIT_SWITCH_BOTTOM];
CircuitPosition.isTop = circuitPosition => {
  assert && assert(_.includes(CircuitPosition.VALUES, circuitPosition));
  return circuitPosition === CircuitPosition.BATTERY_TOP || circuitPosition === CircuitPosition.LIGHT_BULB_TOP || circuitPosition === CircuitPosition.CAPACITOR_TOP || circuitPosition === CircuitPosition.CIRCUIT_SWITCH_TOP;
};
CircuitPosition.isBattery = circuitPosition => {
  assert && assert(_.includes(CircuitPosition.VALUES, circuitPosition));
  return circuitPosition === CircuitPosition.BATTERY_TOP || circuitPosition === CircuitPosition.BATTERY_BOTTOM;
};
CircuitPosition.isLightBulb = circuitPosition => {
  assert && assert(_.includes(CircuitPosition.VALUES, circuitPosition));
  return circuitPosition === CircuitPosition.LIGHT_BULB_TOP || circuitPosition === CircuitPosition.LIGHT_BULB_BOTTOM;
};
CircuitPosition.isCapacitor = circuitPosition => {
  assert && assert(_.includes(CircuitPosition.VALUES, circuitPosition));
  return circuitPosition === CircuitPosition.CAPACITOR_TOP || circuitPosition === CircuitPosition.CAPACITOR_BOTTOM;
};

// Verify that enum is immutable without runtime penalty in production code
if (assert) {
  Object.freeze(CircuitPosition);
}
capacitorLabBasics.register('CircuitPosition', CircuitPosition);
export default CircuitPosition;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjYXBhY2l0b3JMYWJCYXNpY3MiLCJDaXJjdWl0UG9zaXRpb24iLCJCQVRURVJZX1RPUCIsIkJBVFRFUllfQk9UVE9NIiwiTElHSFRfQlVMQl9UT1AiLCJMSUdIVF9CVUxCX0JPVFRPTSIsIkNBUEFDSVRPUl9UT1AiLCJDQVBBQ0lUT1JfQk9UVE9NIiwiQ0lSQ1VJVF9TV0lUQ0hfVE9QIiwiQ0lSQ1VJVF9TV0lUQ0hfQk9UVE9NIiwiVkFMVUVTIiwiaXNUb3AiLCJjaXJjdWl0UG9zaXRpb24iLCJhc3NlcnQiLCJfIiwiaW5jbHVkZXMiLCJpc0JhdHRlcnkiLCJpc0xpZ2h0QnVsYiIsImlzQ2FwYWNpdG9yIiwiT2JqZWN0IiwiZnJlZXplIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJDaXJjdWl0UG9zaXRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogRW51bWVyYXRpb24gb2Ygd2lyZSBjb25uZWN0aW9uIHBvaW50cyBmb3IgQ2FwYWNpdG9yIExhYjogQmFzaWNzXHJcbiAqXHJcbiAqIEBhdXRob3IgQW5kcmV3IEFkYXJlIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBjYXBhY2l0b3JMYWJCYXNpY3MgZnJvbSAnLi4vLi4vY2FwYWNpdG9yTGFiQmFzaWNzLmpzJztcclxuXHJcbmNvbnN0IENpcmN1aXRQb3NpdGlvbiA9IHtcclxuICBCQVRURVJZX1RPUDogJ0JBVFRFUllfVE9QJyxcclxuICBCQVRURVJZX0JPVFRPTTogJ0JBVFRFUllfQk9UVE9NJyxcclxuICBMSUdIVF9CVUxCX1RPUDogJ0xJR0hUX0JVTEJfVE9QJyxcclxuICBMSUdIVF9CVUxCX0JPVFRPTTogJ0xJR0hUX0JVTEJfQk9UVE9NJyxcclxuICBDQVBBQ0lUT1JfVE9QOiAnQ0FQQUNJVE9SX1RPUCcsXHJcbiAgQ0FQQUNJVE9SX0JPVFRPTTogJ0NBUEFDSVRPUl9CT1RUT00nLFxyXG4gIENJUkNVSVRfU1dJVENIX1RPUDogJ0NJUkNVSVRfU1dJVENIX1RPUCcsXHJcbiAgQ0lSQ1VJVF9TV0lUQ0hfQk9UVE9NOiAnQ0lSQ1VJVF9TV0lUQ0hfQk9UVE9NJ1xyXG59O1xyXG5cclxuLy8gQHB1YmxpYyB7QXJyYXkuPENpcmN1aXRQb3NpdGlvbj59XHJcbkNpcmN1aXRQb3NpdGlvbi5WQUxVRVMgPSBbXHJcbiAgQ2lyY3VpdFBvc2l0aW9uLkJBVFRFUllfVE9QLFxyXG4gIENpcmN1aXRQb3NpdGlvbi5CQVRURVJZX0JPVFRPTSxcclxuICBDaXJjdWl0UG9zaXRpb24uTElHSFRfQlVMQl9UT1AsXHJcbiAgQ2lyY3VpdFBvc2l0aW9uLkxJR0hUX0JVTEJfQk9UVE9NLFxyXG4gIENpcmN1aXRQb3NpdGlvbi5DQVBBQ0lUT1JfVE9QLFxyXG4gIENpcmN1aXRQb3NpdGlvbi5DQVBBQ0lUT1JfQk9UVE9NLFxyXG4gIENpcmN1aXRQb3NpdGlvbi5DSVJDVUlUX1NXSVRDSF9UT1AsXHJcbiAgQ2lyY3VpdFBvc2l0aW9uLkNJUkNVSVRfU1dJVENIX0JPVFRPTVxyXG5dO1xyXG5cclxuQ2lyY3VpdFBvc2l0aW9uLmlzVG9wID0gY2lyY3VpdFBvc2l0aW9uID0+IHtcclxuICBhc3NlcnQgJiYgYXNzZXJ0KCBfLmluY2x1ZGVzKCBDaXJjdWl0UG9zaXRpb24uVkFMVUVTLCBjaXJjdWl0UG9zaXRpb24gKSApO1xyXG4gIHJldHVybiBjaXJjdWl0UG9zaXRpb24gPT09IENpcmN1aXRQb3NpdGlvbi5CQVRURVJZX1RPUCB8fFxyXG4gICAgICAgICBjaXJjdWl0UG9zaXRpb24gPT09IENpcmN1aXRQb3NpdGlvbi5MSUdIVF9CVUxCX1RPUCB8fFxyXG4gICAgICAgICBjaXJjdWl0UG9zaXRpb24gPT09IENpcmN1aXRQb3NpdGlvbi5DQVBBQ0lUT1JfVE9QIHx8XHJcbiAgICAgICAgIGNpcmN1aXRQb3NpdGlvbiA9PT0gQ2lyY3VpdFBvc2l0aW9uLkNJUkNVSVRfU1dJVENIX1RPUDtcclxufTtcclxuXHJcbkNpcmN1aXRQb3NpdGlvbi5pc0JhdHRlcnkgPSBjaXJjdWl0UG9zaXRpb24gPT4ge1xyXG4gIGFzc2VydCAmJiBhc3NlcnQoIF8uaW5jbHVkZXMoIENpcmN1aXRQb3NpdGlvbi5WQUxVRVMsIGNpcmN1aXRQb3NpdGlvbiApICk7XHJcbiAgcmV0dXJuIGNpcmN1aXRQb3NpdGlvbiA9PT0gQ2lyY3VpdFBvc2l0aW9uLkJBVFRFUllfVE9QIHx8XHJcbiAgICAgICAgIGNpcmN1aXRQb3NpdGlvbiA9PT0gQ2lyY3VpdFBvc2l0aW9uLkJBVFRFUllfQk9UVE9NO1xyXG59O1xyXG5cclxuQ2lyY3VpdFBvc2l0aW9uLmlzTGlnaHRCdWxiID0gY2lyY3VpdFBvc2l0aW9uID0+IHtcclxuICBhc3NlcnQgJiYgYXNzZXJ0KCBfLmluY2x1ZGVzKCBDaXJjdWl0UG9zaXRpb24uVkFMVUVTLCBjaXJjdWl0UG9zaXRpb24gKSApO1xyXG4gIHJldHVybiBjaXJjdWl0UG9zaXRpb24gPT09IENpcmN1aXRQb3NpdGlvbi5MSUdIVF9CVUxCX1RPUCB8fFxyXG4gICAgICAgICBjaXJjdWl0UG9zaXRpb24gPT09IENpcmN1aXRQb3NpdGlvbi5MSUdIVF9CVUxCX0JPVFRPTTtcclxufTtcclxuXHJcbkNpcmN1aXRQb3NpdGlvbi5pc0NhcGFjaXRvciA9IGNpcmN1aXRQb3NpdGlvbiA9PiB7XHJcbiAgYXNzZXJ0ICYmIGFzc2VydCggXy5pbmNsdWRlcyggQ2lyY3VpdFBvc2l0aW9uLlZBTFVFUywgY2lyY3VpdFBvc2l0aW9uICkgKTtcclxuICByZXR1cm4gY2lyY3VpdFBvc2l0aW9uID09PSBDaXJjdWl0UG9zaXRpb24uQ0FQQUNJVE9SX1RPUCB8fFxyXG4gICAgICAgICBjaXJjdWl0UG9zaXRpb24gPT09IENpcmN1aXRQb3NpdGlvbi5DQVBBQ0lUT1JfQk9UVE9NO1xyXG59O1xyXG5cclxuLy8gVmVyaWZ5IHRoYXQgZW51bSBpcyBpbW11dGFibGUgd2l0aG91dCBydW50aW1lIHBlbmFsdHkgaW4gcHJvZHVjdGlvbiBjb2RlXHJcbmlmICggYXNzZXJ0ICkge1xyXG4gIE9iamVjdC5mcmVlemUoIENpcmN1aXRQb3NpdGlvbiApO1xyXG59XHJcblxyXG5jYXBhY2l0b3JMYWJCYXNpY3MucmVnaXN0ZXIoICdDaXJjdWl0UG9zaXRpb24nLCBDaXJjdWl0UG9zaXRpb24gKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENpcmN1aXRQb3NpdGlvbjtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLGtCQUFrQixNQUFNLDZCQUE2QjtBQUU1RCxNQUFNQyxlQUFlLEdBQUc7RUFDdEJDLFdBQVcsRUFBRSxhQUFhO0VBQzFCQyxjQUFjLEVBQUUsZ0JBQWdCO0VBQ2hDQyxjQUFjLEVBQUUsZ0JBQWdCO0VBQ2hDQyxpQkFBaUIsRUFBRSxtQkFBbUI7RUFDdENDLGFBQWEsRUFBRSxlQUFlO0VBQzlCQyxnQkFBZ0IsRUFBRSxrQkFBa0I7RUFDcENDLGtCQUFrQixFQUFFLG9CQUFvQjtFQUN4Q0MscUJBQXFCLEVBQUU7QUFDekIsQ0FBQzs7QUFFRDtBQUNBUixlQUFlLENBQUNTLE1BQU0sR0FBRyxDQUN2QlQsZUFBZSxDQUFDQyxXQUFXLEVBQzNCRCxlQUFlLENBQUNFLGNBQWMsRUFDOUJGLGVBQWUsQ0FBQ0csY0FBYyxFQUM5QkgsZUFBZSxDQUFDSSxpQkFBaUIsRUFDakNKLGVBQWUsQ0FBQ0ssYUFBYSxFQUM3QkwsZUFBZSxDQUFDTSxnQkFBZ0IsRUFDaENOLGVBQWUsQ0FBQ08sa0JBQWtCLEVBQ2xDUCxlQUFlLENBQUNRLHFCQUFxQixDQUN0QztBQUVEUixlQUFlLENBQUNVLEtBQUssR0FBR0MsZUFBZSxJQUFJO0VBQ3pDQyxNQUFNLElBQUlBLE1BQU0sQ0FBRUMsQ0FBQyxDQUFDQyxRQUFRLENBQUVkLGVBQWUsQ0FBQ1MsTUFBTSxFQUFFRSxlQUFnQixDQUFFLENBQUM7RUFDekUsT0FBT0EsZUFBZSxLQUFLWCxlQUFlLENBQUNDLFdBQVcsSUFDL0NVLGVBQWUsS0FBS1gsZUFBZSxDQUFDRyxjQUFjLElBQ2xEUSxlQUFlLEtBQUtYLGVBQWUsQ0FBQ0ssYUFBYSxJQUNqRE0sZUFBZSxLQUFLWCxlQUFlLENBQUNPLGtCQUFrQjtBQUMvRCxDQUFDO0FBRURQLGVBQWUsQ0FBQ2UsU0FBUyxHQUFHSixlQUFlLElBQUk7RUFDN0NDLE1BQU0sSUFBSUEsTUFBTSxDQUFFQyxDQUFDLENBQUNDLFFBQVEsQ0FBRWQsZUFBZSxDQUFDUyxNQUFNLEVBQUVFLGVBQWdCLENBQUUsQ0FBQztFQUN6RSxPQUFPQSxlQUFlLEtBQUtYLGVBQWUsQ0FBQ0MsV0FBVyxJQUMvQ1UsZUFBZSxLQUFLWCxlQUFlLENBQUNFLGNBQWM7QUFDM0QsQ0FBQztBQUVERixlQUFlLENBQUNnQixXQUFXLEdBQUdMLGVBQWUsSUFBSTtFQUMvQ0MsTUFBTSxJQUFJQSxNQUFNLENBQUVDLENBQUMsQ0FBQ0MsUUFBUSxDQUFFZCxlQUFlLENBQUNTLE1BQU0sRUFBRUUsZUFBZ0IsQ0FBRSxDQUFDO0VBQ3pFLE9BQU9BLGVBQWUsS0FBS1gsZUFBZSxDQUFDRyxjQUFjLElBQ2xEUSxlQUFlLEtBQUtYLGVBQWUsQ0FBQ0ksaUJBQWlCO0FBQzlELENBQUM7QUFFREosZUFBZSxDQUFDaUIsV0FBVyxHQUFHTixlQUFlLElBQUk7RUFDL0NDLE1BQU0sSUFBSUEsTUFBTSxDQUFFQyxDQUFDLENBQUNDLFFBQVEsQ0FBRWQsZUFBZSxDQUFDUyxNQUFNLEVBQUVFLGVBQWdCLENBQUUsQ0FBQztFQUN6RSxPQUFPQSxlQUFlLEtBQUtYLGVBQWUsQ0FBQ0ssYUFBYSxJQUNqRE0sZUFBZSxLQUFLWCxlQUFlLENBQUNNLGdCQUFnQjtBQUM3RCxDQUFDOztBQUVEO0FBQ0EsSUFBS00sTUFBTSxFQUFHO0VBQ1pNLE1BQU0sQ0FBQ0MsTUFBTSxDQUFFbkIsZUFBZ0IsQ0FBQztBQUNsQztBQUVBRCxrQkFBa0IsQ0FBQ3FCLFFBQVEsQ0FBRSxpQkFBaUIsRUFBRXBCLGVBQWdCLENBQUM7QUFFakUsZUFBZUEsZUFBZSJ9