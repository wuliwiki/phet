// Copyright 2016-2023, University of Colorado Boulder

/**
 * A card with a rational number on it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import functionBuilder from '../../../functionBuilder.js';
import RationalNumber from '../RationalNumber.js';
import Card from './Card.js';
export default class NumberCard extends Card {
  /**
   * @param {RationalNumber} rationalNumber - the input number, an integer
   * @param {Object} [options]
   */
  constructor(rationalNumber, options) {
    assert && assert(rationalNumber instanceof RationalNumber);
    assert && assert(rationalNumber.isInteger());
    super(options);

    // {RationalNumber} @public (read-only)
    this.rationalNumber = rationalNumber;
  }
}
functionBuilder.register('NumberCard', NumberCard);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmdW5jdGlvbkJ1aWxkZXIiLCJSYXRpb25hbE51bWJlciIsIkNhcmQiLCJOdW1iZXJDYXJkIiwiY29uc3RydWN0b3IiLCJyYXRpb25hbE51bWJlciIsIm9wdGlvbnMiLCJhc3NlcnQiLCJpc0ludGVnZXIiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIk51bWJlckNhcmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTYtMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogQSBjYXJkIHdpdGggYSByYXRpb25hbCBudW1iZXIgb24gaXQuXHJcbiAqXHJcbiAqIEBhdXRob3IgQ2hyaXMgTWFsbGV5IChQaXhlbFpvb20sIEluYy4pXHJcbiAqL1xyXG5cclxuaW1wb3J0IGZ1bmN0aW9uQnVpbGRlciBmcm9tICcuLi8uLi8uLi9mdW5jdGlvbkJ1aWxkZXIuanMnO1xyXG5pbXBvcnQgUmF0aW9uYWxOdW1iZXIgZnJvbSAnLi4vUmF0aW9uYWxOdW1iZXIuanMnO1xyXG5pbXBvcnQgQ2FyZCBmcm9tICcuL0NhcmQuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVtYmVyQ2FyZCBleHRlbmRzIENhcmQge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1JhdGlvbmFsTnVtYmVyfSByYXRpb25hbE51bWJlciAtIHRoZSBpbnB1dCBudW1iZXIsIGFuIGludGVnZXJcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIHJhdGlvbmFsTnVtYmVyLCBvcHRpb25zICkge1xyXG5cclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIHJhdGlvbmFsTnVtYmVyIGluc3RhbmNlb2YgUmF0aW9uYWxOdW1iZXIgKTtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIHJhdGlvbmFsTnVtYmVyLmlzSW50ZWdlcigpICk7XHJcblxyXG4gICAgc3VwZXIoIG9wdGlvbnMgKTtcclxuXHJcbiAgICAvLyB7UmF0aW9uYWxOdW1iZXJ9IEBwdWJsaWMgKHJlYWQtb25seSlcclxuICAgIHRoaXMucmF0aW9uYWxOdW1iZXIgPSByYXRpb25hbE51bWJlcjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uQnVpbGRlci5yZWdpc3RlciggJ051bWJlckNhcmQnLCBOdW1iZXJDYXJkICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLGVBQWUsTUFBTSw2QkFBNkI7QUFDekQsT0FBT0MsY0FBYyxNQUFNLHNCQUFzQjtBQUNqRCxPQUFPQyxJQUFJLE1BQU0sV0FBVztBQUU1QixlQUFlLE1BQU1DLFVBQVUsU0FBU0QsSUFBSSxDQUFDO0VBRTNDO0FBQ0Y7QUFDQTtBQUNBO0VBQ0VFLFdBQVdBLENBQUVDLGNBQWMsRUFBRUMsT0FBTyxFQUFHO0lBRXJDQyxNQUFNLElBQUlBLE1BQU0sQ0FBRUYsY0FBYyxZQUFZSixjQUFlLENBQUM7SUFDNURNLE1BQU0sSUFBSUEsTUFBTSxDQUFFRixjQUFjLENBQUNHLFNBQVMsQ0FBQyxDQUFFLENBQUM7SUFFOUMsS0FBSyxDQUFFRixPQUFRLENBQUM7O0lBRWhCO0lBQ0EsSUFBSSxDQUFDRCxjQUFjLEdBQUdBLGNBQWM7RUFDdEM7QUFDRjtBQUVBTCxlQUFlLENBQUNTLFFBQVEsQ0FBRSxZQUFZLEVBQUVOLFVBQVcsQ0FBQyJ9