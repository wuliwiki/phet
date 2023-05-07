// Copyright 2023, University of Colorado Boulder

/**
 * QUnit tests for MatrixBetweenProperty
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Matrix3 from '../../../dot/js/Matrix3.js';
import { MatrixBetweenProperty, Node } from '../imports.js';
QUnit.module('MatrixBetweenProperty');
QUnit.test('MatrixBetweenProperty connectivity', assert => {
  const a = new Node();
  const b = new Node();
  const c = new Node();
  const x = new Node();
  const y = new Node();
  const matrixBetweenProperty = new MatrixBetweenProperty(x, y);
  const checkMatrix = (matrix, message) => {
    const propMatrix = matrixBetweenProperty.value;
    assert.ok(propMatrix === matrix || matrix && propMatrix && matrix.equals(propMatrix), message);
  };
  checkMatrix(null, 'no connection at all');

  // a -> x
  a.addChild(x);
  checkMatrix(null, 'no connection at all');

  //   x
  //  /
  // a
  //  \
  //   y
  a.addChild(y);
  checkMatrix(Matrix3.IDENTITY, 'connected, identity');

  // b    x
  //  \  /
  //   a
  //  /  \
  // c    y
  b.addChild(a);
  c.addChild(a);
  checkMatrix(Matrix3.IDENTITY, 'ignores DAG below, identity');

  // b -> x
  //  \  /
  //   a
  //  /  \
  // c -> y
  b.addChild(x);
  c.addChild(y);
  checkMatrix(null, 'DAGs (cax/bax/bx, so null');

  // b -> x
  //  \
  //   a
  //  /  \
  // c -> y
  a.removeChild(x);
  checkMatrix(Matrix3.IDENTITY, 'ignores DAG from C, since it is not reachable to x, identity');

  // b
  //  \
  //   a
  //  /  \
  // c -> y
  //  \
  //   x
  b.removeChild(x);
  c.addChild(x);
  checkMatrix(null, 'DAG cay/cy, so null');

  // b
  //  \
  //   a
  //  /  \
  // c -> y -> x
  c.removeChild(x);
  y.addChild(x);
  checkMatrix(Matrix3.IDENTITY, 'direct child OK');

  //   a
  //  /  \
  // c -> y -> b -> x
  b.removeChild(a);
  y.removeChild(x);
  b.addChild(x);
  y.addChild(b);
  checkMatrix(Matrix3.IDENTITY, 'ancestor OK');

  //   a------
  //     \    \
  // c -> y -> b -> x
  c.removeChild(a);
  a.addChild(b);
  checkMatrix(null, 'DAG aybx/abx, null');

  //         a
  //          \
  // c -> y -> b -> x
  a.removeChild(y);
  checkMatrix(Matrix3.IDENTITY, 'back to normal');
  matrixBetweenProperty.dispose();
});
QUnit.test('MatrixBetweenProperty transforms (local)', assert => {
  const a = new Node();
  const b = new Node();
  const x = new Node();
  const y = new Node();
  const matrixBetweenProperty = new MatrixBetweenProperty(x, y);
  const checkMatrix = (matrix, message) => {
    const propMatrix = matrixBetweenProperty.value;
    assert.ok(propMatrix === matrix || matrix && propMatrix && matrix.equals(propMatrix), `message expected\n${matrix}\n\ngot\n${propMatrix}`);
  };
  checkMatrix(null, 'no connection at all');

  //   x
  //  /
  // a
  //  \
  //   y
  a.addChild(x);
  a.addChild(y);
  checkMatrix(Matrix3.IDENTITY, 'connected, identity');

  //   x (x:50)
  //  /
  // a
  //  \
  //   y
  x.x = 50;
  checkMatrix(Matrix3.rowMajor(1, 0, 50, 0, 1, 0, 0, 0, 1), 'connected, 50 translation');

  //   x (x:50)
  //  /
  // a
  //  \
  //   y (scale:2)
  y.scale(2);
  checkMatrix(Matrix3.rowMajor(0.5, 0, 25, 0, 0.5, 0, 0, 0, 1), 'connected, 50 translation + 2 scale');

  //   x (x:50)
  //  /
  // a (x:-50)
  //  \
  //   y (scale:2)
  a.x = -50;
  checkMatrix(Matrix3.rowMajor(0.5, 0, 25, 0, 0.5, 0, 0, 0, 1), 'parent translation should not affect things');

  //     x (x:50)
  //    /
  //   a (x:-50)
  //  /
  // b
  //  \
  //   y (scale:2)
  a.removeChild(y);
  b.addChild(a);
  b.addChild(y);
  checkMatrix(Matrix3.rowMajor(0.5, 0, 0, 0, 0.5, 0, 0, 0, 1), 'now 50 and -50 cancel each other out');

  //     x (x:50)
  //    /
  //   a (x:-50, y:10)
  //  /
  // b
  //  \
  //   y (scale:2)
  a.y = 10;
  checkMatrix(Matrix3.rowMajor(0.5, 0, 0, 0, 0.5, 5, 0, 0, 1), 'adjusting transform on an ancestor');

  //       x (x:50)
  //      /
  //     a (x:-50, y:10)
  //    /
  //   b
  //  /
  // y (scale:2)
  b.removeChild(y);
  y.addChild(b);
  checkMatrix(Matrix3.rowMajor(1, 0, 0, 0, 1, 10, 0, 0, 1), 'swapping to no common root, instead an ancestor (ignores y transform)');

  //       y (scale:2)
  //      /
  //     x (x:50)
  //    /
  //   a (x:-50, y:10)
  //  /
  // b
  y.removeChild(b);
  x.addChild(y);
  checkMatrix(Matrix3.rowMajor(0.5, 0, 0, 0, 0.5, 0, 0, 0, 1), 'swapping order');
});
QUnit.test('MatrixBetweenProperty transforms (parent)', assert => {
  const a = new Node();
  const b = new Node();
  const x = new Node();
  const y = new Node();
  const matrixBetweenProperty = new MatrixBetweenProperty(x, y, {
    fromCoordinateFrame: 'parent',
    toCoordinateFrame: 'parent'
  });
  const checkMatrix = (matrix, message) => {
    const propMatrix = matrixBetweenProperty.value;
    assert.ok(propMatrix === matrix || matrix && propMatrix && matrix.equals(propMatrix), `${message} expected\n${matrix}\n\ngot\n${propMatrix}`);
  };
  checkMatrix(null, 'no connection at all');

  //   x
  //  /
  // a
  //  \
  //   y
  a.addChild(x);
  a.addChild(y);
  checkMatrix(Matrix3.IDENTITY, 'connected, identity');

  //   x (x:50)
  //  /
  // a
  //  \
  //   y
  x.x = 50;
  checkMatrix(Matrix3.IDENTITY, 'x/y transforms do not matter #1');

  //   x (x:50)
  //  /
  // a
  //  \
  //   y (scale:2)
  y.scale(2);
  checkMatrix(Matrix3.IDENTITY, 'x/y transforms do not matter #2');

  //   x (x:50)
  //  /
  // a (x:-50)
  //  \
  //   y (scale:2)
  a.x = -50;
  checkMatrix(Matrix3.IDENTITY, 'x/y transforms do not matter #3');

  //     x (x:50)
  //    /
  //   a (x:-50)
  //  /
  // b
  //  \
  //   y (scale:2)
  a.removeChild(y);
  b.addChild(a);
  b.addChild(y);
  checkMatrix(Matrix3.rowMajor(1, 0, -50, 0, 1, 0, 0, 0, 1), 'now the -50 applies');

  //     x (x:50)
  //    /
  //   a (x:-50, y:10)
  //  /
  // b
  //  \
  //   y (scale:2)
  a.y = 10;
  checkMatrix(Matrix3.rowMajor(1, 0, -50, 0, 1, 10, 0, 0, 1), 'adjusting transform on an ancestor');

  //       x (x:50)
  //      /
  //     a (x:-50, y:10)
  //    /
  //   b
  //  /
  // y (scale:2)
  b.removeChild(y);
  y.addChild(b);
  checkMatrix(Matrix3.rowMajor(2, 0, -100, 0, 2, 20, 0, 0, 1), 'swapping to no common root, instead an ancestor');

  //       y (scale:2)
  //      /
  //     x (x:50)
  //    /
  //   a (x:-50, y:10)
  //  /
  // b
  y.removeChild(b);
  x.addChild(y);
  checkMatrix(Matrix3.rowMajor(1, 0, -50, 0, 1, 0, 0, 0, 1), 'swapping order');
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNYXRyaXgzIiwiTWF0cml4QmV0d2VlblByb3BlcnR5IiwiTm9kZSIsIlFVbml0IiwibW9kdWxlIiwidGVzdCIsImFzc2VydCIsImEiLCJiIiwiYyIsIngiLCJ5IiwibWF0cml4QmV0d2VlblByb3BlcnR5IiwiY2hlY2tNYXRyaXgiLCJtYXRyaXgiLCJtZXNzYWdlIiwicHJvcE1hdHJpeCIsInZhbHVlIiwib2siLCJlcXVhbHMiLCJhZGRDaGlsZCIsIklERU5USVRZIiwicmVtb3ZlQ2hpbGQiLCJkaXNwb3NlIiwicm93TWFqb3IiLCJzY2FsZSIsImZyb21Db29yZGluYXRlRnJhbWUiLCJ0b0Nvb3JkaW5hdGVGcmFtZSJdLCJzb3VyY2VzIjpbIk1hdHJpeEJldHdlZW5Qcm9wZXJ0eVRlc3RzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBRVW5pdCB0ZXN0cyBmb3IgTWF0cml4QmV0d2VlblByb3BlcnR5XHJcbiAqXHJcbiAqIEBhdXRob3IgSm9uYXRoYW4gT2xzb24gPGpvbmF0aGFuLm9sc29uQGNvbG9yYWRvLmVkdT5cclxuICovXHJcblxyXG5pbXBvcnQgTWF0cml4MyBmcm9tICcuLi8uLi8uLi9kb3QvanMvTWF0cml4My5qcyc7XHJcbmltcG9ydCB7IE1hdHJpeEJldHdlZW5Qcm9wZXJ0eSwgTm9kZSB9IGZyb20gJy4uL2ltcG9ydHMuanMnO1xyXG5cclxuUVVuaXQubW9kdWxlKCAnTWF0cml4QmV0d2VlblByb3BlcnR5JyApO1xyXG5cclxuUVVuaXQudGVzdCggJ01hdHJpeEJldHdlZW5Qcm9wZXJ0eSBjb25uZWN0aXZpdHknLCBhc3NlcnQgPT4ge1xyXG5cclxuICBjb25zdCBhID0gbmV3IE5vZGUoKTtcclxuICBjb25zdCBiID0gbmV3IE5vZGUoKTtcclxuICBjb25zdCBjID0gbmV3IE5vZGUoKTtcclxuICBjb25zdCB4ID0gbmV3IE5vZGUoKTtcclxuICBjb25zdCB5ID0gbmV3IE5vZGUoKTtcclxuXHJcbiAgY29uc3QgbWF0cml4QmV0d2VlblByb3BlcnR5ID0gbmV3IE1hdHJpeEJldHdlZW5Qcm9wZXJ0eSggeCwgeSApO1xyXG5cclxuICBjb25zdCBjaGVja01hdHJpeCA9ICggbWF0cml4OiBNYXRyaXgzIHwgbnVsbCwgbWVzc2FnZTogc3RyaW5nICkgPT4ge1xyXG4gICAgY29uc3QgcHJvcE1hdHJpeCA9IG1hdHJpeEJldHdlZW5Qcm9wZXJ0eS52YWx1ZTtcclxuICAgIGFzc2VydC5vayggcHJvcE1hdHJpeCA9PT0gbWF0cml4IHx8ICggbWF0cml4ICYmIHByb3BNYXRyaXggJiYgbWF0cml4LmVxdWFscyggcHJvcE1hdHJpeCApICksIG1lc3NhZ2UgKTtcclxuICB9O1xyXG5cclxuICBjaGVja01hdHJpeCggbnVsbCwgJ25vIGNvbm5lY3Rpb24gYXQgYWxsJyApO1xyXG5cclxuICAvLyBhIC0+IHhcclxuICBhLmFkZENoaWxkKCB4ICk7XHJcbiAgY2hlY2tNYXRyaXgoIG51bGwsICdubyBjb25uZWN0aW9uIGF0IGFsbCcgKTtcclxuXHJcbiAgLy8gICB4XHJcbiAgLy8gIC9cclxuICAvLyBhXHJcbiAgLy8gIFxcXHJcbiAgLy8gICB5XHJcbiAgYS5hZGRDaGlsZCggeSApO1xyXG4gIGNoZWNrTWF0cml4KCBNYXRyaXgzLklERU5USVRZLCAnY29ubmVjdGVkLCBpZGVudGl0eScgKTtcclxuXHJcbiAgLy8gYiAgICB4XHJcbiAgLy8gIFxcICAvXHJcbiAgLy8gICBhXHJcbiAgLy8gIC8gIFxcXHJcbiAgLy8gYyAgICB5XHJcbiAgYi5hZGRDaGlsZCggYSApO1xyXG4gIGMuYWRkQ2hpbGQoIGEgKTtcclxuICBjaGVja01hdHJpeCggTWF0cml4My5JREVOVElUWSwgJ2lnbm9yZXMgREFHIGJlbG93LCBpZGVudGl0eScgKTtcclxuXHJcbiAgLy8gYiAtPiB4XHJcbiAgLy8gIFxcICAvXHJcbiAgLy8gICBhXHJcbiAgLy8gIC8gIFxcXHJcbiAgLy8gYyAtPiB5XHJcbiAgYi5hZGRDaGlsZCggeCApO1xyXG4gIGMuYWRkQ2hpbGQoIHkgKTtcclxuICBjaGVja01hdHJpeCggbnVsbCwgJ0RBR3MgKGNheC9iYXgvYngsIHNvIG51bGwnICk7XHJcblxyXG4gIC8vIGIgLT4geFxyXG4gIC8vICBcXFxyXG4gIC8vICAgYVxyXG4gIC8vICAvICBcXFxyXG4gIC8vIGMgLT4geVxyXG4gIGEucmVtb3ZlQ2hpbGQoIHggKTtcclxuICBjaGVja01hdHJpeCggTWF0cml4My5JREVOVElUWSwgJ2lnbm9yZXMgREFHIGZyb20gQywgc2luY2UgaXQgaXMgbm90IHJlYWNoYWJsZSB0byB4LCBpZGVudGl0eScgKTtcclxuXHJcbiAgLy8gYlxyXG4gIC8vICBcXFxyXG4gIC8vICAgYVxyXG4gIC8vICAvICBcXFxyXG4gIC8vIGMgLT4geVxyXG4gIC8vICBcXFxyXG4gIC8vICAgeFxyXG4gIGIucmVtb3ZlQ2hpbGQoIHggKTtcclxuICBjLmFkZENoaWxkKCB4ICk7XHJcbiAgY2hlY2tNYXRyaXgoIG51bGwsICdEQUcgY2F5L2N5LCBzbyBudWxsJyApO1xyXG5cclxuICAvLyBiXHJcbiAgLy8gIFxcXHJcbiAgLy8gICBhXHJcbiAgLy8gIC8gIFxcXHJcbiAgLy8gYyAtPiB5IC0+IHhcclxuICBjLnJlbW92ZUNoaWxkKCB4ICk7XHJcbiAgeS5hZGRDaGlsZCggeCApO1xyXG4gIGNoZWNrTWF0cml4KCBNYXRyaXgzLklERU5USVRZLCAnZGlyZWN0IGNoaWxkIE9LJyApO1xyXG5cclxuICAvLyAgIGFcclxuICAvLyAgLyAgXFxcclxuICAvLyBjIC0+IHkgLT4gYiAtPiB4XHJcbiAgYi5yZW1vdmVDaGlsZCggYSApO1xyXG4gIHkucmVtb3ZlQ2hpbGQoIHggKTtcclxuICBiLmFkZENoaWxkKCB4ICk7XHJcbiAgeS5hZGRDaGlsZCggYiApO1xyXG4gIGNoZWNrTWF0cml4KCBNYXRyaXgzLklERU5USVRZLCAnYW5jZXN0b3IgT0snICk7XHJcblxyXG4gIC8vICAgYS0tLS0tLVxyXG4gIC8vICAgICBcXCAgICBcXFxyXG4gIC8vIGMgLT4geSAtPiBiIC0+IHhcclxuICBjLnJlbW92ZUNoaWxkKCBhICk7XHJcbiAgYS5hZGRDaGlsZCggYiApO1xyXG4gIGNoZWNrTWF0cml4KCBudWxsLCAnREFHIGF5YngvYWJ4LCBudWxsJyApO1xyXG5cclxuICAvLyAgICAgICAgIGFcclxuICAvLyAgICAgICAgICBcXFxyXG4gIC8vIGMgLT4geSAtPiBiIC0+IHhcclxuICBhLnJlbW92ZUNoaWxkKCB5ICk7XHJcbiAgY2hlY2tNYXRyaXgoIE1hdHJpeDMuSURFTlRJVFksICdiYWNrIHRvIG5vcm1hbCcgKTtcclxuXHJcbiAgbWF0cml4QmV0d2VlblByb3BlcnR5LmRpc3Bvc2UoKTtcclxufSApO1xyXG5cclxuUVVuaXQudGVzdCggJ01hdHJpeEJldHdlZW5Qcm9wZXJ0eSB0cmFuc2Zvcm1zIChsb2NhbCknLCBhc3NlcnQgPT4ge1xyXG5cclxuICBjb25zdCBhID0gbmV3IE5vZGUoKTtcclxuICBjb25zdCBiID0gbmV3IE5vZGUoKTtcclxuICBjb25zdCB4ID0gbmV3IE5vZGUoKTtcclxuICBjb25zdCB5ID0gbmV3IE5vZGUoKTtcclxuXHJcbiAgY29uc3QgbWF0cml4QmV0d2VlblByb3BlcnR5ID0gbmV3IE1hdHJpeEJldHdlZW5Qcm9wZXJ0eSggeCwgeSApO1xyXG5cclxuICBjb25zdCBjaGVja01hdHJpeCA9ICggbWF0cml4OiBNYXRyaXgzIHwgbnVsbCwgbWVzc2FnZTogc3RyaW5nICkgPT4ge1xyXG4gICAgY29uc3QgcHJvcE1hdHJpeCA9IG1hdHJpeEJldHdlZW5Qcm9wZXJ0eS52YWx1ZTtcclxuICAgIGFzc2VydC5vayggcHJvcE1hdHJpeCA9PT0gbWF0cml4IHx8ICggbWF0cml4ICYmIHByb3BNYXRyaXggJiYgbWF0cml4LmVxdWFscyggcHJvcE1hdHJpeCApICksIGBtZXNzYWdlIGV4cGVjdGVkXFxuJHttYXRyaXh9XFxuXFxuZ290XFxuJHtwcm9wTWF0cml4fWAgKTtcclxuICB9O1xyXG5cclxuICBjaGVja01hdHJpeCggbnVsbCwgJ25vIGNvbm5lY3Rpb24gYXQgYWxsJyApO1xyXG5cclxuICAvLyAgIHhcclxuICAvLyAgL1xyXG4gIC8vIGFcclxuICAvLyAgXFxcclxuICAvLyAgIHlcclxuICBhLmFkZENoaWxkKCB4ICk7XHJcbiAgYS5hZGRDaGlsZCggeSApO1xyXG4gIGNoZWNrTWF0cml4KCBNYXRyaXgzLklERU5USVRZLCAnY29ubmVjdGVkLCBpZGVudGl0eScgKTtcclxuXHJcbiAgLy8gICB4ICh4OjUwKVxyXG4gIC8vICAvXHJcbiAgLy8gYVxyXG4gIC8vICBcXFxyXG4gIC8vICAgeVxyXG4gIHgueCA9IDUwO1xyXG4gIGNoZWNrTWF0cml4KCBNYXRyaXgzLnJvd01ham9yKFxyXG4gICAgMSwgMCwgNTAsXHJcbiAgICAwLCAxLCAwLFxyXG4gICAgMCwgMCwgMVxyXG4gICksICdjb25uZWN0ZWQsIDUwIHRyYW5zbGF0aW9uJyApO1xyXG5cclxuICAvLyAgIHggKHg6NTApXHJcbiAgLy8gIC9cclxuICAvLyBhXHJcbiAgLy8gIFxcXHJcbiAgLy8gICB5IChzY2FsZToyKVxyXG4gIHkuc2NhbGUoIDIgKTtcclxuICBjaGVja01hdHJpeCggTWF0cml4My5yb3dNYWpvcihcclxuICAgIDAuNSwgMCwgMjUsXHJcbiAgICAwLCAwLjUsIDAsXHJcbiAgICAwLCAwLCAxXHJcbiAgKSwgJ2Nvbm5lY3RlZCwgNTAgdHJhbnNsYXRpb24gKyAyIHNjYWxlJyApO1xyXG5cclxuICAvLyAgIHggKHg6NTApXHJcbiAgLy8gIC9cclxuICAvLyBhICh4Oi01MClcclxuICAvLyAgXFxcclxuICAvLyAgIHkgKHNjYWxlOjIpXHJcbiAgYS54ID0gLTUwO1xyXG4gIGNoZWNrTWF0cml4KCBNYXRyaXgzLnJvd01ham9yKFxyXG4gICAgMC41LCAwLCAyNSxcclxuICAgIDAsIDAuNSwgMCxcclxuICAgIDAsIDAsIDFcclxuICApLCAncGFyZW50IHRyYW5zbGF0aW9uIHNob3VsZCBub3QgYWZmZWN0IHRoaW5ncycgKTtcclxuXHJcbiAgLy8gICAgIHggKHg6NTApXHJcbiAgLy8gICAgL1xyXG4gIC8vICAgYSAoeDotNTApXHJcbiAgLy8gIC9cclxuICAvLyBiXHJcbiAgLy8gIFxcXHJcbiAgLy8gICB5IChzY2FsZToyKVxyXG4gIGEucmVtb3ZlQ2hpbGQoIHkgKTtcclxuICBiLmFkZENoaWxkKCBhICk7XHJcbiAgYi5hZGRDaGlsZCggeSApO1xyXG4gIGNoZWNrTWF0cml4KCBNYXRyaXgzLnJvd01ham9yKFxyXG4gICAgMC41LCAwLCAwLFxyXG4gICAgMCwgMC41LCAwLFxyXG4gICAgMCwgMCwgMVxyXG4gICksICdub3cgNTAgYW5kIC01MCBjYW5jZWwgZWFjaCBvdGhlciBvdXQnICk7XHJcblxyXG4gIC8vICAgICB4ICh4OjUwKVxyXG4gIC8vICAgIC9cclxuICAvLyAgIGEgKHg6LTUwLCB5OjEwKVxyXG4gIC8vICAvXHJcbiAgLy8gYlxyXG4gIC8vICBcXFxyXG4gIC8vICAgeSAoc2NhbGU6MilcclxuICBhLnkgPSAxMDtcclxuICBjaGVja01hdHJpeCggTWF0cml4My5yb3dNYWpvcihcclxuICAgIDAuNSwgMCwgMCxcclxuICAgIDAsIDAuNSwgNSxcclxuICAgIDAsIDAsIDFcclxuICApLCAnYWRqdXN0aW5nIHRyYW5zZm9ybSBvbiBhbiBhbmNlc3RvcicgKTtcclxuXHJcbiAgLy8gICAgICAgeCAoeDo1MClcclxuICAvLyAgICAgIC9cclxuICAvLyAgICAgYSAoeDotNTAsIHk6MTApXHJcbiAgLy8gICAgL1xyXG4gIC8vICAgYlxyXG4gIC8vICAvXHJcbiAgLy8geSAoc2NhbGU6MilcclxuICBiLnJlbW92ZUNoaWxkKCB5ICk7XHJcbiAgeS5hZGRDaGlsZCggYiApO1xyXG4gIGNoZWNrTWF0cml4KCBNYXRyaXgzLnJvd01ham9yKFxyXG4gICAgMSwgMCwgMCxcclxuICAgIDAsIDEsIDEwLFxyXG4gICAgMCwgMCwgMVxyXG4gICksICdzd2FwcGluZyB0byBubyBjb21tb24gcm9vdCwgaW5zdGVhZCBhbiBhbmNlc3RvciAoaWdub3JlcyB5IHRyYW5zZm9ybSknICk7XHJcblxyXG4gIC8vICAgICAgIHkgKHNjYWxlOjIpXHJcbiAgLy8gICAgICAvXHJcbiAgLy8gICAgIHggKHg6NTApXHJcbiAgLy8gICAgL1xyXG4gIC8vICAgYSAoeDotNTAsIHk6MTApXHJcbiAgLy8gIC9cclxuICAvLyBiXHJcbiAgeS5yZW1vdmVDaGlsZCggYiApO1xyXG4gIHguYWRkQ2hpbGQoIHkgKTtcclxuICBjaGVja01hdHJpeCggTWF0cml4My5yb3dNYWpvcihcclxuICAgIDAuNSwgMCwgMCxcclxuICAgIDAsIDAuNSwgMCxcclxuICAgIDAsIDAsIDFcclxuICApLCAnc3dhcHBpbmcgb3JkZXInICk7XHJcbn0gKTtcclxuXHJcblFVbml0LnRlc3QoICdNYXRyaXhCZXR3ZWVuUHJvcGVydHkgdHJhbnNmb3JtcyAocGFyZW50KScsIGFzc2VydCA9PiB7XHJcblxyXG4gIGNvbnN0IGEgPSBuZXcgTm9kZSgpO1xyXG4gIGNvbnN0IGIgPSBuZXcgTm9kZSgpO1xyXG4gIGNvbnN0IHggPSBuZXcgTm9kZSgpO1xyXG4gIGNvbnN0IHkgPSBuZXcgTm9kZSgpO1xyXG5cclxuICBjb25zdCBtYXRyaXhCZXR3ZWVuUHJvcGVydHkgPSBuZXcgTWF0cml4QmV0d2VlblByb3BlcnR5KCB4LCB5LCB7XHJcbiAgICBmcm9tQ29vcmRpbmF0ZUZyYW1lOiAncGFyZW50JyxcclxuICAgIHRvQ29vcmRpbmF0ZUZyYW1lOiAncGFyZW50J1xyXG4gIH0gKTtcclxuXHJcbiAgY29uc3QgY2hlY2tNYXRyaXggPSAoIG1hdHJpeDogTWF0cml4MyB8IG51bGwsIG1lc3NhZ2U6IHN0cmluZyApID0+IHtcclxuICAgIGNvbnN0IHByb3BNYXRyaXggPSBtYXRyaXhCZXR3ZWVuUHJvcGVydHkudmFsdWU7XHJcbiAgICBhc3NlcnQub2soIHByb3BNYXRyaXggPT09IG1hdHJpeCB8fCAoIG1hdHJpeCAmJiBwcm9wTWF0cml4ICYmIG1hdHJpeC5lcXVhbHMoIHByb3BNYXRyaXggKSApLCBgJHttZXNzYWdlfSBleHBlY3RlZFxcbiR7bWF0cml4fVxcblxcbmdvdFxcbiR7cHJvcE1hdHJpeH1gICk7XHJcbiAgfTtcclxuXHJcbiAgY2hlY2tNYXRyaXgoIG51bGwsICdubyBjb25uZWN0aW9uIGF0IGFsbCcgKTtcclxuXHJcbiAgLy8gICB4XHJcbiAgLy8gIC9cclxuICAvLyBhXHJcbiAgLy8gIFxcXHJcbiAgLy8gICB5XHJcbiAgYS5hZGRDaGlsZCggeCApO1xyXG4gIGEuYWRkQ2hpbGQoIHkgKTtcclxuICBjaGVja01hdHJpeCggTWF0cml4My5JREVOVElUWSwgJ2Nvbm5lY3RlZCwgaWRlbnRpdHknICk7XHJcblxyXG4gIC8vICAgeCAoeDo1MClcclxuICAvLyAgL1xyXG4gIC8vIGFcclxuICAvLyAgXFxcclxuICAvLyAgIHlcclxuICB4LnggPSA1MDtcclxuICBjaGVja01hdHJpeCggTWF0cml4My5JREVOVElUWSwgJ3gveSB0cmFuc2Zvcm1zIGRvIG5vdCBtYXR0ZXIgIzEnICk7XHJcblxyXG4gIC8vICAgeCAoeDo1MClcclxuICAvLyAgL1xyXG4gIC8vIGFcclxuICAvLyAgXFxcclxuICAvLyAgIHkgKHNjYWxlOjIpXHJcbiAgeS5zY2FsZSggMiApO1xyXG4gIGNoZWNrTWF0cml4KCBNYXRyaXgzLklERU5USVRZLCAneC95IHRyYW5zZm9ybXMgZG8gbm90IG1hdHRlciAjMicgKTtcclxuXHJcbiAgLy8gICB4ICh4OjUwKVxyXG4gIC8vICAvXHJcbiAgLy8gYSAoeDotNTApXHJcbiAgLy8gIFxcXHJcbiAgLy8gICB5IChzY2FsZToyKVxyXG4gIGEueCA9IC01MDtcclxuICBjaGVja01hdHJpeCggTWF0cml4My5JREVOVElUWSwgJ3gveSB0cmFuc2Zvcm1zIGRvIG5vdCBtYXR0ZXIgIzMnICk7XHJcblxyXG4gIC8vICAgICB4ICh4OjUwKVxyXG4gIC8vICAgIC9cclxuICAvLyAgIGEgKHg6LTUwKVxyXG4gIC8vICAvXHJcbiAgLy8gYlxyXG4gIC8vICBcXFxyXG4gIC8vICAgeSAoc2NhbGU6MilcclxuICBhLnJlbW92ZUNoaWxkKCB5ICk7XHJcbiAgYi5hZGRDaGlsZCggYSApO1xyXG4gIGIuYWRkQ2hpbGQoIHkgKTtcclxuICBjaGVja01hdHJpeCggTWF0cml4My5yb3dNYWpvcihcclxuICAgIDEsIDAsIC01MCxcclxuICAgIDAsIDEsIDAsXHJcbiAgICAwLCAwLCAxXHJcbiAgKSwgJ25vdyB0aGUgLTUwIGFwcGxpZXMnICk7XHJcblxyXG4gIC8vICAgICB4ICh4OjUwKVxyXG4gIC8vICAgIC9cclxuICAvLyAgIGEgKHg6LTUwLCB5OjEwKVxyXG4gIC8vICAvXHJcbiAgLy8gYlxyXG4gIC8vICBcXFxyXG4gIC8vICAgeSAoc2NhbGU6MilcclxuICBhLnkgPSAxMDtcclxuICBjaGVja01hdHJpeCggTWF0cml4My5yb3dNYWpvcihcclxuICAgIDEsIDAsIC01MCxcclxuICAgIDAsIDEsIDEwLFxyXG4gICAgMCwgMCwgMVxyXG4gICksICdhZGp1c3RpbmcgdHJhbnNmb3JtIG9uIGFuIGFuY2VzdG9yJyApO1xyXG5cclxuICAvLyAgICAgICB4ICh4OjUwKVxyXG4gIC8vICAgICAgL1xyXG4gIC8vICAgICBhICh4Oi01MCwgeToxMClcclxuICAvLyAgICAvXHJcbiAgLy8gICBiXHJcbiAgLy8gIC9cclxuICAvLyB5IChzY2FsZToyKVxyXG4gIGIucmVtb3ZlQ2hpbGQoIHkgKTtcclxuICB5LmFkZENoaWxkKCBiICk7XHJcbiAgY2hlY2tNYXRyaXgoIE1hdHJpeDMucm93TWFqb3IoXHJcbiAgICAyLCAwLCAtMTAwLFxyXG4gICAgMCwgMiwgMjAsXHJcbiAgICAwLCAwLCAxXHJcbiAgKSwgJ3N3YXBwaW5nIHRvIG5vIGNvbW1vbiByb290LCBpbnN0ZWFkIGFuIGFuY2VzdG9yJyApO1xyXG5cclxuICAvLyAgICAgICB5IChzY2FsZToyKVxyXG4gIC8vICAgICAgL1xyXG4gIC8vICAgICB4ICh4OjUwKVxyXG4gIC8vICAgIC9cclxuICAvLyAgIGEgKHg6LTUwLCB5OjEwKVxyXG4gIC8vICAvXHJcbiAgLy8gYlxyXG4gIHkucmVtb3ZlQ2hpbGQoIGIgKTtcclxuICB4LmFkZENoaWxkKCB5ICk7XHJcbiAgY2hlY2tNYXRyaXgoIE1hdHJpeDMucm93TWFqb3IoXHJcbiAgICAxLCAwLCAtNTAsXHJcbiAgICAwLCAxLCAwLFxyXG4gICAgMCwgMCwgMVxyXG4gICksICdzd2FwcGluZyBvcmRlcicgKTtcclxufSApO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsT0FBTyxNQUFNLDRCQUE0QjtBQUNoRCxTQUFTQyxxQkFBcUIsRUFBRUMsSUFBSSxRQUFRLGVBQWU7QUFFM0RDLEtBQUssQ0FBQ0MsTUFBTSxDQUFFLHVCQUF3QixDQUFDO0FBRXZDRCxLQUFLLENBQUNFLElBQUksQ0FBRSxvQ0FBb0MsRUFBRUMsTUFBTSxJQUFJO0VBRTFELE1BQU1DLENBQUMsR0FBRyxJQUFJTCxJQUFJLENBQUMsQ0FBQztFQUNwQixNQUFNTSxDQUFDLEdBQUcsSUFBSU4sSUFBSSxDQUFDLENBQUM7RUFDcEIsTUFBTU8sQ0FBQyxHQUFHLElBQUlQLElBQUksQ0FBQyxDQUFDO0VBQ3BCLE1BQU1RLENBQUMsR0FBRyxJQUFJUixJQUFJLENBQUMsQ0FBQztFQUNwQixNQUFNUyxDQUFDLEdBQUcsSUFBSVQsSUFBSSxDQUFDLENBQUM7RUFFcEIsTUFBTVUscUJBQXFCLEdBQUcsSUFBSVgscUJBQXFCLENBQUVTLENBQUMsRUFBRUMsQ0FBRSxDQUFDO0VBRS9ELE1BQU1FLFdBQVcsR0FBR0EsQ0FBRUMsTUFBc0IsRUFBRUMsT0FBZSxLQUFNO0lBQ2pFLE1BQU1DLFVBQVUsR0FBR0oscUJBQXFCLENBQUNLLEtBQUs7SUFDOUNYLE1BQU0sQ0FBQ1ksRUFBRSxDQUFFRixVQUFVLEtBQUtGLE1BQU0sSUFBTUEsTUFBTSxJQUFJRSxVQUFVLElBQUlGLE1BQU0sQ0FBQ0ssTUFBTSxDQUFFSCxVQUFXLENBQUcsRUFBRUQsT0FBUSxDQUFDO0VBQ3hHLENBQUM7RUFF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