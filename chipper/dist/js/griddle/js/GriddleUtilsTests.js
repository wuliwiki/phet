// Copyright 2020, University of Colorado Boulder

/**
 * QUnit tests for GriddleUtil
 *
 * @author Sam Reid (PhET Interactive Simulations)
 *
 * @deprecated - please use bamboo
 */

import deprecationWarning from '../../phet-core/js/deprecationWarning.js';
import GriddleUtils from './GriddleUtils.js';
QUnit.module('GriddleUtils');
QUnit.test('getValuesInRangeWithAnchor', assert => {
  assert && deprecationWarning('Please use bamboo');

  // For example, say we want to draw gridlines on a chart between xMin=50 and xMax=200 with a gridline at x=100 and
  // each other line 30 units away.  Then the answer would be: [70,100,130,160,190]
  const answer = GriddleUtils.getValuesInRangeWithAnchor(50, 200, 30, 100);
  assert.deepEqual(answer, [70, 100, 130, 160, 190]);
  const answer2 = GriddleUtils.getValuesInRangeWithAnchor(-100, 100, 10);
  assert.deepEqual(answer2, [-100, -90, -80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkZXByZWNhdGlvbldhcm5pbmciLCJHcmlkZGxlVXRpbHMiLCJRVW5pdCIsIm1vZHVsZSIsInRlc3QiLCJhc3NlcnQiLCJhbnN3ZXIiLCJnZXRWYWx1ZXNJblJhbmdlV2l0aEFuY2hvciIsImRlZXBFcXVhbCIsImFuc3dlcjIiXSwic291cmNlcyI6WyJHcmlkZGxlVXRpbHNUZXN0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMCwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogUVVuaXQgdGVzdHMgZm9yIEdyaWRkbGVVdGlsXHJcbiAqXHJcbiAqIEBhdXRob3IgU2FtIFJlaWQgKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqXHJcbiAqIEBkZXByZWNhdGVkIC0gcGxlYXNlIHVzZSBiYW1ib29cclxuICovXHJcblxyXG5pbXBvcnQgZGVwcmVjYXRpb25XYXJuaW5nIGZyb20gJy4uLy4uL3BoZXQtY29yZS9qcy9kZXByZWNhdGlvbldhcm5pbmcuanMnO1xyXG5pbXBvcnQgR3JpZGRsZVV0aWxzIGZyb20gJy4vR3JpZGRsZVV0aWxzLmpzJztcclxuXHJcblFVbml0Lm1vZHVsZSggJ0dyaWRkbGVVdGlscycgKTtcclxuXHJcblFVbml0LnRlc3QoICdnZXRWYWx1ZXNJblJhbmdlV2l0aEFuY2hvcicsIGFzc2VydCA9PiB7XHJcblxyXG4gIGFzc2VydCAmJiBkZXByZWNhdGlvbldhcm5pbmcoICdQbGVhc2UgdXNlIGJhbWJvbycgKTtcclxuXHJcbiAgLy8gRm9yIGV4YW1wbGUsIHNheSB3ZSB3YW50IHRvIGRyYXcgZ3JpZGxpbmVzIG9uIGEgY2hhcnQgYmV0d2VlbiB4TWluPTUwIGFuZCB4TWF4PTIwMCB3aXRoIGEgZ3JpZGxpbmUgYXQgeD0xMDAgYW5kXHJcbiAgLy8gZWFjaCBvdGhlciBsaW5lIDMwIHVuaXRzIGF3YXkuICBUaGVuIHRoZSBhbnN3ZXIgd291bGQgYmU6IFs3MCwxMDAsMTMwLDE2MCwxOTBdXHJcbiAgY29uc3QgYW5zd2VyID0gR3JpZGRsZVV0aWxzLmdldFZhbHVlc0luUmFuZ2VXaXRoQW5jaG9yKCA1MCwgMjAwLCAzMCwgMTAwICk7XHJcbiAgYXNzZXJ0LmRlZXBFcXVhbCggYW5zd2VyLCBbIDcwLCAxMDAsIDEzMCwgMTYwLCAxOTAgXSApO1xyXG5cclxuICBjb25zdCBhbnN3ZXIyID0gR3JpZGRsZVV0aWxzLmdldFZhbHVlc0luUmFuZ2VXaXRoQW5jaG9yKCAtMTAwLCAxMDAsIDEwICk7XHJcbiAgYXNzZXJ0LmRlZXBFcXVhbCggYW5zd2VyMiwgWyAtMTAwLCAtOTAsIC04MCwgLTcwLCAtNjAsIC01MCwgLTQwLCAtMzAsIC0yMCwgLTEwLCAwLCAxMCwgMjAsIDMwLCA0MCwgNTAsIDYwLCA3MCwgODAsIDkwLCAxMDAgXSApO1xyXG59ICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxrQkFBa0IsTUFBTSwwQ0FBMEM7QUFDekUsT0FBT0MsWUFBWSxNQUFNLG1CQUFtQjtBQUU1Q0MsS0FBSyxDQUFDQyxNQUFNLENBQUUsY0FBZSxDQUFDO0FBRTlCRCxLQUFLLENBQUNFLElBQUksQ0FBRSw0QkFBNEIsRUFBRUMsTUFBTSxJQUFJO0VBRWxEQSxNQUFNLElBQUlMLGtCQUFrQixDQUFFLG1CQUFvQixDQUFDOztFQUVuRDtFQUNBO0VBQ0EsTUFBTU0sTUFBTSxHQUFHTCxZQUFZLENBQUNNLDBCQUEwQixDQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUksQ0FBQztFQUMxRUYsTUFBTSxDQUFDRyxTQUFTLENBQUVGLE1BQU0sRUFBRSxDQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUcsQ0FBQztFQUV0RCxNQUFNRyxPQUFPLEdBQUdSLFlBQVksQ0FBQ00sMEJBQTBCLENBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUcsQ0FBQztFQUN4RUYsTUFBTSxDQUFDRyxTQUFTLENBQUVDLE9BQU8sRUFBRSxDQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUcsQ0FBQztBQUNoSSxDQUFFLENBQUMifQ==