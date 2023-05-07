// Copyright 2021-2022, University of Colorado Boulder

/**
 * Counting representation types for the 'Compare' screen.
 *
 * @author Chris Klusendorf
 */

import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import numberCompare from '../../numberCompare.js';
class CompareCountingType extends EnumerationValue {
  static BLOCKS = new CompareCountingType();
  static NUMBER_LINE = new CompareCountingType();
  static NONE = new CompareCountingType();
  static enumeration = new Enumeration(CompareCountingType);
}
numberCompare.register('CompareCountingType', CompareCountingType);
export default CompareCountingType;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFbnVtZXJhdGlvblZhbHVlIiwiRW51bWVyYXRpb24iLCJudW1iZXJDb21wYXJlIiwiQ29tcGFyZUNvdW50aW5nVHlwZSIsIkJMT0NLUyIsIk5VTUJFUl9MSU5FIiwiTk9ORSIsImVudW1lcmF0aW9uIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJDb21wYXJlQ291bnRpbmdUeXBlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIENvdW50aW5nIHJlcHJlc2VudGF0aW9uIHR5cGVzIGZvciB0aGUgJ0NvbXBhcmUnIHNjcmVlbi5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBLbHVzZW5kb3JmXHJcbiAqL1xyXG5cclxuaW1wb3J0IEVudW1lcmF0aW9uVmFsdWUgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL0VudW1lcmF0aW9uVmFsdWUuanMnO1xyXG5pbXBvcnQgRW51bWVyYXRpb24gZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL0VudW1lcmF0aW9uLmpzJztcclxuaW1wb3J0IG51bWJlckNvbXBhcmUgZnJvbSAnLi4vLi4vbnVtYmVyQ29tcGFyZS5qcyc7XHJcblxyXG5jbGFzcyBDb21wYXJlQ291bnRpbmdUeXBlIGV4dGVuZHMgRW51bWVyYXRpb25WYWx1ZSB7XHJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBCTE9DS1MgPSBuZXcgQ29tcGFyZUNvdW50aW5nVHlwZSgpO1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTlVNQkVSX0xJTkUgPSBuZXcgQ29tcGFyZUNvdW50aW5nVHlwZSgpO1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTk9ORSA9IG5ldyBDb21wYXJlQ291bnRpbmdUeXBlKCk7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZW51bWVyYXRpb24gPSBuZXcgRW51bWVyYXRpb24oIENvbXBhcmVDb3VudGluZ1R5cGUgKTtcclxufVxyXG5cclxubnVtYmVyQ29tcGFyZS5yZWdpc3RlciggJ0NvbXBhcmVDb3VudGluZ1R5cGUnLCBDb21wYXJlQ291bnRpbmdUeXBlICk7XHJcbmV4cG9ydCBkZWZhdWx0IENvbXBhcmVDb3VudGluZ1R5cGU7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLGdCQUFnQixNQUFNLDhDQUE4QztBQUMzRSxPQUFPQyxXQUFXLE1BQU0seUNBQXlDO0FBQ2pFLE9BQU9DLGFBQWEsTUFBTSx3QkFBd0I7QUFFbEQsTUFBTUMsbUJBQW1CLFNBQVNILGdCQUFnQixDQUFDO0VBQ2pELE9BQXVCSSxNQUFNLEdBQUcsSUFBSUQsbUJBQW1CLENBQUMsQ0FBQztFQUN6RCxPQUF1QkUsV0FBVyxHQUFHLElBQUlGLG1CQUFtQixDQUFDLENBQUM7RUFDOUQsT0FBdUJHLElBQUksR0FBRyxJQUFJSCxtQkFBbUIsQ0FBQyxDQUFDO0VBRXZELE9BQXVCSSxXQUFXLEdBQUcsSUFBSU4sV0FBVyxDQUFFRSxtQkFBb0IsQ0FBQztBQUM3RTtBQUVBRCxhQUFhLENBQUNNLFFBQVEsQ0FBRSxxQkFBcUIsRUFBRUwsbUJBQW9CLENBQUM7QUFDcEUsZUFBZUEsbUJBQW1CIn0=