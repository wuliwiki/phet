// Copyright 2018-2023, University of Colorado Boulder

/**
 * QUnit tests for Emitter
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import TinyEmitter from './TinyEmitter.js';
QUnit.module('TinyEmitter');
QUnit.test('TinyEmitter can emit anything', assert => {
  assert.ok(true, 'Token test, because each test must have at least one assert.');
  const e1 = new TinyEmitter();
  e1.emit(1);
  e1.emit(2, 2);
  e1.emit(true);
  e1.emit('2, 2');
  e1.emit(undefined);
  e1.emit(null);
  const e2 = new TinyEmitter();
  e2.emit(new TinyEmitter(), {}, _.noop());
  e2.emit(2, 2);
  e2.emit(true);
  e2.emit('2, 2');
  e2.emit(undefined);
  e2.emit(null);
  e2.emit(new TinyEmitter(), 7, _.noop());
  e2.emit(new TinyEmitter());
});
QUnit.test('Test emit timing TinyEmitter', assert => {
  const e = new TinyEmitter();
  let x = 0;
  e.addListener(() => {
    x++;
  });
  e.addListener(() => {
    x++;
  });
  e.addListener(() => {
    x++;
  });
  e.addListener(() => {
    x++;
  });
  e.addListener(() => {
    x++;
  });
  e.emit();
  assert.ok(x === 5, 'fired all listeners');
  const e1 = new TinyEmitter();
  e1.addListener(() => {
    _.noop();
  });

  // const testEmitter = ( emitter, numberOfLoopings ) => {
  //
  //   const start = Date.now();
  //
  //   for ( let i = 0; i < numberOfLoopings; i++ ) {
  //     emitter.emit();
  //   }
  //   const end = Date.now();
  //   const totalTime = end - start;
  //   console.log( `Time for ${numberOfLoopings}: `, totalTime, totalTime / numberOfLoopings );
  // };
  //
  // // No assertions here, but it can be nice to test how expensive emit calls are
  // testEmitter( e1, 10000000 );
  // testEmitter( e, 10000000 );
});

QUnit.test('TinyEmitter Basics', assert => {
  const stack = [];
  const emitter = new TinyEmitter();
  const a = () => {
    stack.push('a');
    emitter.removeListener(b);
  };
  const b = () => {
    stack.push('b');
  };
  emitter.addListener(a);
  emitter.addListener(b);
  emitter.emit();
  assert.equal(stack.length, 2, 'Should have received 2 callbacks');
  assert.equal(stack[0], 'a', 'true');
  assert.equal(stack[1], 'b', 'true');
  assert.equal(emitter.hasListener(b), false, 'b should have been removed');
  emitter.dispose();
  window.assert && assert.throws(() => emitter.addListener(() => {
    _.noop();
  }), 'should throw error when adding a listener to disposed');
});
QUnit.test('TinyEmitter Tricks', assert => {
  const entries = [];
  const emitter = new TinyEmitter();
  const a = arg => {
    entries.push({
      listener: 'a',
      arg: arg
    });
    if (arg === 'first') {
      emitter.emit('second');
    }
  };
  const b = arg => {
    entries.push({
      listener: 'b',
      arg: arg
    });
    if (arg === 'second') {
      emitter.addListener(c);
      emitter.emit('third');
    }
  };
  const c = arg => {
    entries.push({
      listener: 'c',
      arg: arg
    });
  };
  emitter.addListener(a);
  emitter.addListener(b);
  emitter.emit('first');

  /*
   * Expected order:
   *   a first
   *     a second
   *     b second
   *       a third
   *       b third
   *       c third
   *   b first
   *
   * It looks like "c first" is (currently?) being triggered since defendCallbacks only defends the top of the stack.
   * If the stack is [ undefended, undefended ], changing listeners copies only the top, leaving
   * [ undefended, defended ], and our first event triggers a listener that wasn't listening when it was called.
   */
  _.each(entries, entry => {
    assert.ok(!(entry.listener === 'c' && entry.arg === 'first'), 'not C,first');
  });
  assert.equal(entries.length, 7, 'Should have 7 callbacks');
  assert.equal(entries[0].listener, 'a');
  assert.equal(entries[0].arg, 'first');
  assert.equal(entries[1].listener, 'a');
  assert.equal(entries[1].arg, 'second');
  assert.equal(entries[2].listener, 'b');
  assert.equal(entries[2].arg, 'second');
  assert.equal(entries[3].listener, 'a');
  assert.equal(entries[3].arg, 'third');
  assert.equal(entries[4].listener, 'b');
  assert.equal(entries[4].arg, 'third');
  assert.equal(entries[5].listener, 'c');
  assert.equal(entries[5].arg, 'third');
  assert.equal(entries[6].listener, 'b');
  assert.equal(entries[6].arg, 'first');
});
QUnit.test('TinyEmitter onBeforeNotify', assert => {
  const state = {
    happiness: 0
  };
  const callForHappinessEmitter = new TinyEmitter(() => {
    state.happiness++;
  });
  let countCalled = 0;
  callForHappinessEmitter.addListener(() => {
    assert.ok(++countCalled === state.happiness, `happiness should change as emitted: ${countCalled}`);
  });
  callForHappinessEmitter.emit();
  callForHappinessEmitter.emit();
  callForHappinessEmitter.emit();
  callForHappinessEmitter.emit();
  callForHappinessEmitter.emit();
  assert.ok(state.happiness === 5, 'end count');
});
QUnit.test('TinyEmitter reverse and random', assert => {
  assert.ok(true, 'first test');
  const emitter = new TinyEmitter();
  const values = [];
  emitter.addListener(() => values.push('a'));
  emitter.addListener(() => values.push('b'));
  emitter.addListener(() => values.push('c'));
  emitter.addListener(() => values.push('d'));
  emitter.emit();
  assert.ok(values.join('') === 'abcd', 'normal order');

  // Check these values when running with ?listenerOrder=reverse or ?listenerOrder=random or ?listenerOrder=random(123)
  console.log(values.join(''));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUaW55RW1pdHRlciIsIlFVbml0IiwibW9kdWxlIiwidGVzdCIsImFzc2VydCIsIm9rIiwiZTEiLCJlbWl0IiwidW5kZWZpbmVkIiwiZTIiLCJfIiwibm9vcCIsImUiLCJ4IiwiYWRkTGlzdGVuZXIiLCJzdGFjayIsImVtaXR0ZXIiLCJhIiwicHVzaCIsInJlbW92ZUxpc3RlbmVyIiwiYiIsImVxdWFsIiwibGVuZ3RoIiwiaGFzTGlzdGVuZXIiLCJkaXNwb3NlIiwid2luZG93IiwidGhyb3dzIiwiZW50cmllcyIsImFyZyIsImxpc3RlbmVyIiwiYyIsImVhY2giLCJlbnRyeSIsInN0YXRlIiwiaGFwcGluZXNzIiwiY2FsbEZvckhhcHBpbmVzc0VtaXR0ZXIiLCJjb3VudENhbGxlZCIsInZhbHVlcyIsImpvaW4iLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZXMiOlsiVGlueUVtaXR0ZXJUZXN0cy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBRVW5pdCB0ZXN0cyBmb3IgRW1pdHRlclxyXG4gKlxyXG4gKiBAYXV0aG9yIFNhbSBSZWlkIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKiBAYXV0aG9yIE1pY2hhZWwgS2F1em1hbm4gKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqIEBhdXRob3IgQ2hyaXMgS2x1c2VuZG9yZiAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgVGlueUVtaXR0ZXIgZnJvbSAnLi9UaW55RW1pdHRlci5qcyc7XHJcbmltcG9ydCBURW1pdHRlciBmcm9tICcuL1RFbWl0dGVyLmpzJztcclxuXHJcblFVbml0Lm1vZHVsZSggJ1RpbnlFbWl0dGVyJyApO1xyXG5cclxuUVVuaXQudGVzdCggJ1RpbnlFbWl0dGVyIGNhbiBlbWl0IGFueXRoaW5nJywgYXNzZXJ0ID0+IHtcclxuXHJcbiAgYXNzZXJ0Lm9rKCB0cnVlLCAnVG9rZW4gdGVzdCwgYmVjYXVzZSBlYWNoIHRlc3QgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBhc3NlcnQuJyApO1xyXG5cclxuICBjb25zdCBlMTogVEVtaXR0ZXI8WyBhcmcxOiB1bmtub3duLCBhcmcyPzogdW5rbm93biBdPiA9IG5ldyBUaW55RW1pdHRlcigpO1xyXG4gIGUxLmVtaXQoIDEgKTtcclxuICBlMS5lbWl0KCAyLCAyICk7XHJcbiAgZTEuZW1pdCggdHJ1ZSApO1xyXG4gIGUxLmVtaXQoICcyLCAyJyApO1xyXG4gIGUxLmVtaXQoIHVuZGVmaW5lZCApO1xyXG4gIGUxLmVtaXQoIG51bGwgKTtcclxuXHJcbiAgY29uc3QgZTI6IFRFbWl0dGVyPFsgYXJnMTogdW5rbm93biwgYXJnMj86IHVua25vd24sIGFyZzM/OiB1bmtub3duIF0+ID0gbmV3IFRpbnlFbWl0dGVyKCk7XHJcbiAgZTIuZW1pdCggbmV3IFRpbnlFbWl0dGVyKCksIHt9LCBfLm5vb3AoKSApO1xyXG4gIGUyLmVtaXQoIDIsIDIgKTtcclxuICBlMi5lbWl0KCB0cnVlICk7XHJcbiAgZTIuZW1pdCggJzIsIDInICk7XHJcbiAgZTIuZW1pdCggdW5kZWZpbmVkICk7XHJcbiAgZTIuZW1pdCggbnVsbCApO1xyXG4gIGUyLmVtaXQoIG5ldyBUaW55RW1pdHRlcigpLCA3LCBfLm5vb3AoKSApO1xyXG4gIGUyLmVtaXQoIG5ldyBUaW55RW1pdHRlcigpICk7XHJcbn0gKTtcclxuXHJcblFVbml0LnRlc3QoICdUZXN0IGVtaXQgdGltaW5nIFRpbnlFbWl0dGVyJywgYXNzZXJ0ID0+IHtcclxuXHJcbiAgY29uc3QgZSA9IG5ldyBUaW55RW1pdHRlcigpO1xyXG4gIGxldCB4ID0gMDtcclxuICBlLmFkZExpc3RlbmVyKCAoKSA9PiB7eCsrO30gKTtcclxuICBlLmFkZExpc3RlbmVyKCAoKSA9PiB7eCsrO30gKTtcclxuICBlLmFkZExpc3RlbmVyKCAoKSA9PiB7eCsrO30gKTtcclxuICBlLmFkZExpc3RlbmVyKCAoKSA9PiB7eCsrO30gKTtcclxuICBlLmFkZExpc3RlbmVyKCAoKSA9PiB7eCsrO30gKTtcclxuXHJcbiAgZS5lbWl0KCk7XHJcblxyXG4gIGFzc2VydC5vayggeCA9PT0gNSwgJ2ZpcmVkIGFsbCBsaXN0ZW5lcnMnICk7XHJcblxyXG4gIGNvbnN0IGUxID0gbmV3IFRpbnlFbWl0dGVyKCk7XHJcbiAgZTEuYWRkTGlzdGVuZXIoICgpID0+IHsgXy5ub29wKCk7IH0gKTtcclxuXHJcbiAgLy8gY29uc3QgdGVzdEVtaXR0ZXIgPSAoIGVtaXR0ZXIsIG51bWJlck9mTG9vcGluZ3MgKSA9PiB7XHJcbiAgLy9cclxuICAvLyAgIGNvbnN0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcclxuICAvL1xyXG4gIC8vICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZMb29waW5nczsgaSsrICkge1xyXG4gIC8vICAgICBlbWl0dGVyLmVtaXQoKTtcclxuICAvLyAgIH1cclxuICAvLyAgIGNvbnN0IGVuZCA9IERhdGUubm93KCk7XHJcbiAgLy8gICBjb25zdCB0b3RhbFRpbWUgPSBlbmQgLSBzdGFydDtcclxuICAvLyAgIGNvbnNvbGUubG9nKCBgVGltZSBmb3IgJHtudW1iZXJPZkxvb3BpbmdzfTogYCwgdG90YWxUaW1lLCB0b3RhbFRpbWUgLyBudW1iZXJPZkxvb3BpbmdzICk7XHJcbiAgLy8gfTtcclxuICAvL1xyXG4gIC8vIC8vIE5vIGFzc2VydGlvbnMgaGVyZSwgYnV0IGl0IGNhbiBiZSBuaWNlIHRvIHRlc3QgaG93IGV4cGVuc2l2ZSBlbWl0IGNhbGxzIGFyZVxyXG4gIC8vIHRlc3RFbWl0dGVyKCBlMSwgMTAwMDAwMDAgKTtcclxuICAvLyB0ZXN0RW1pdHRlciggZSwgMTAwMDAwMDAgKTtcclxufSApO1xyXG5cclxuUVVuaXQudGVzdCggJ1RpbnlFbWl0dGVyIEJhc2ljcycsIGFzc2VydCA9PiB7XHJcbiAgY29uc3Qgc3RhY2s6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICBjb25zdCBlbWl0dGVyID0gbmV3IFRpbnlFbWl0dGVyKCk7XHJcbiAgY29uc3QgYSA9ICgpID0+IHtcclxuICAgIHN0YWNrLnB1c2goICdhJyApO1xyXG4gICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lciggYiApO1xyXG4gIH07XHJcbiAgY29uc3QgYiA9ICgpID0+IHtcclxuICAgIHN0YWNrLnB1c2goICdiJyApO1xyXG4gIH07XHJcbiAgZW1pdHRlci5hZGRMaXN0ZW5lciggYSApO1xyXG4gIGVtaXR0ZXIuYWRkTGlzdGVuZXIoIGIgKTtcclxuICBlbWl0dGVyLmVtaXQoKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKCBzdGFjay5sZW5ndGgsIDIsICdTaG91bGQgaGF2ZSByZWNlaXZlZCAyIGNhbGxiYWNrcycgKTtcclxuICBhc3NlcnQuZXF1YWwoIHN0YWNrWyAwIF0sICdhJywgJ3RydWUnICk7XHJcbiAgYXNzZXJ0LmVxdWFsKCBzdGFja1sgMSBdLCAnYicsICd0cnVlJyApO1xyXG5cclxuICBhc3NlcnQuZXF1YWwoIGVtaXR0ZXIuaGFzTGlzdGVuZXIoIGIgKSwgZmFsc2UsICdiIHNob3VsZCBoYXZlIGJlZW4gcmVtb3ZlZCcgKTtcclxuXHJcbiAgZW1pdHRlci5kaXNwb3NlKCk7XHJcbiAgd2luZG93LmFzc2VydCAmJiBhc3NlcnQudGhyb3dzKCAoKSA9PiBlbWl0dGVyLmFkZExpc3RlbmVyKCAoKSA9PiB7IF8ubm9vcCgpOyB9ICksICdzaG91bGQgdGhyb3cgZXJyb3Igd2hlbiBhZGRpbmcgYSBsaXN0ZW5lciB0byBkaXNwb3NlZCcgKTtcclxufSApO1xyXG5cclxuUVVuaXQudGVzdCggJ1RpbnlFbWl0dGVyIFRyaWNrcycsIGFzc2VydCA9PiB7XHJcbiAgY29uc3QgZW50cmllczogQXJyYXk8eyBsaXN0ZW5lcjogc3RyaW5nOyBhcmc6IHN0cmluZyB9PiA9IFtdO1xyXG5cclxuICBjb25zdCBlbWl0dGVyOiBURW1pdHRlcjxbIGFyZzogc3RyaW5nIF0+ID0gbmV3IFRpbnlFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0IGEgPSAoIGFyZzogc3RyaW5nICkgPT4ge1xyXG4gICAgZW50cmllcy5wdXNoKCB7IGxpc3RlbmVyOiAnYScsIGFyZzogYXJnIH0gKTtcclxuXHJcbiAgICBpZiAoIGFyZyA9PT0gJ2ZpcnN0JyApIHtcclxuICAgICAgZW1pdHRlci5lbWl0KCAnc2Vjb25kJyApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgY29uc3QgYiA9ICggYXJnOiBzdHJpbmcgKSA9PiB7XHJcbiAgICBlbnRyaWVzLnB1c2goIHsgbGlzdGVuZXI6ICdiJywgYXJnOiBhcmcgfSApO1xyXG5cclxuICAgIGlmICggYXJnID09PSAnc2Vjb25kJyApIHtcclxuICAgICAgZW1pdHRlci5hZGRMaXN0ZW5lciggYyApO1xyXG4gICAgICBlbWl0dGVyLmVtaXQoICd0aGlyZCcgKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGNvbnN0IGMgPSAoIGFyZzogc3RyaW5nICkgPT4ge1xyXG4gICAgZW50cmllcy5wdXNoKCB7IGxpc3RlbmVyOiAnYycsIGFyZzogYXJnIH0gKTtcclxuICB9O1xyXG5cclxuICBlbWl0dGVyLmFkZExpc3RlbmVyKCBhICk7XHJcbiAgZW1pdHRlci5hZGRMaXN0ZW5lciggYiApO1xyXG4gIGVtaXR0ZXIuZW1pdCggJ2ZpcnN0JyApO1xyXG5cclxuICAvKlxyXG4gICAqIEV4cGVjdGVkIG9yZGVyOlxyXG4gICAqICAgYSBmaXJzdFxyXG4gICAqICAgICBhIHNlY29uZFxyXG4gICAqICAgICBiIHNlY29uZFxyXG4gICAqICAgICAgIGEgdGhpcmRcclxuICAgKiAgICAgICBiIHRoaXJkXHJcbiAgICogICAgICAgYyB0aGlyZFxyXG4gICAqICAgYiBmaXJzdFxyXG4gICAqXHJcbiAgICogSXQgbG9va3MgbGlrZSBcImMgZmlyc3RcIiBpcyAoY3VycmVudGx5PykgYmVpbmcgdHJpZ2dlcmVkIHNpbmNlIGRlZmVuZENhbGxiYWNrcyBvbmx5IGRlZmVuZHMgdGhlIHRvcCBvZiB0aGUgc3RhY2suXHJcbiAgICogSWYgdGhlIHN0YWNrIGlzIFsgdW5kZWZlbmRlZCwgdW5kZWZlbmRlZCBdLCBjaGFuZ2luZyBsaXN0ZW5lcnMgY29waWVzIG9ubHkgdGhlIHRvcCwgbGVhdmluZ1xyXG4gICAqIFsgdW5kZWZlbmRlZCwgZGVmZW5kZWQgXSwgYW5kIG91ciBmaXJzdCBldmVudCB0cmlnZ2VycyBhIGxpc3RlbmVyIHRoYXQgd2Fzbid0IGxpc3RlbmluZyB3aGVuIGl0IHdhcyBjYWxsZWQuXHJcbiAgICovXHJcbiAgXy5lYWNoKCBlbnRyaWVzLCBlbnRyeSA9PiB7XHJcbiAgICBhc3NlcnQub2soICEoIGVudHJ5Lmxpc3RlbmVyID09PSAnYycgJiYgZW50cnkuYXJnID09PSAnZmlyc3QnICksICdub3QgQyxmaXJzdCcgKTtcclxuICB9ICk7XHJcblxyXG4gIGFzc2VydC5lcXVhbCggZW50cmllcy5sZW5ndGgsIDcsICdTaG91bGQgaGF2ZSA3IGNhbGxiYWNrcycgKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKCBlbnRyaWVzWyAwIF0ubGlzdGVuZXIsICdhJyApO1xyXG4gIGFzc2VydC5lcXVhbCggZW50cmllc1sgMCBdLmFyZywgJ2ZpcnN0JyApO1xyXG5cclxuICBhc3NlcnQuZXF1YWwoIGVudHJpZXNbIDEgXS5saXN0ZW5lciwgJ2EnICk7XHJcbiAgYXNzZXJ0LmVxdWFsKCBlbnRyaWVzWyAxIF0uYXJnLCAnc2Vjb25kJyApO1xyXG5cclxuICBhc3NlcnQuZXF1YWwoIGVudHJpZXNbIDIgXS5saXN0ZW5lciwgJ2InICk7XHJcbiAgYXNzZXJ0LmVxdWFsKCBlbnRyaWVzWyAyIF0uYXJnLCAnc2Vjb25kJyApO1xyXG5cclxuICBhc3NlcnQuZXF1YWwoIGVudHJpZXNbIDMgXS5saXN0ZW5lciwgJ2EnICk7XHJcbiAgYXNzZXJ0LmVxdWFsKCBlbnRyaWVzWyAzIF0uYXJnLCAndGhpcmQnICk7XHJcblxyXG4gIGFzc2VydC5lcXVhbCggZW50cmllc1sgNCBdLmxpc3RlbmVyLCAnYicgKTtcclxuICBhc3NlcnQuZXF1YWwoIGVudHJpZXNbIDQgXS5hcmcsICd0aGlyZCcgKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKCBlbnRyaWVzWyA1IF0ubGlzdGVuZXIsICdjJyApO1xyXG4gIGFzc2VydC5lcXVhbCggZW50cmllc1sgNSBdLmFyZywgJ3RoaXJkJyApO1xyXG5cclxuICBhc3NlcnQuZXF1YWwoIGVudHJpZXNbIDYgXS5saXN0ZW5lciwgJ2InICk7XHJcbiAgYXNzZXJ0LmVxdWFsKCBlbnRyaWVzWyA2IF0uYXJnLCAnZmlyc3QnICk7XHJcbn0gKTtcclxuXHJcblxyXG5RVW5pdC50ZXN0KCAnVGlueUVtaXR0ZXIgb25CZWZvcmVOb3RpZnknLCBhc3NlcnQgPT4ge1xyXG5cclxuICBjb25zdCBzdGF0ZSA9IHsgaGFwcGluZXNzOiAwIH07XHJcblxyXG4gIGNvbnN0IGNhbGxGb3JIYXBwaW5lc3NFbWl0dGVyID0gbmV3IFRpbnlFbWl0dGVyKCAoKSA9PiB7XHJcbiAgICBzdGF0ZS5oYXBwaW5lc3MrKztcclxuICB9ICk7XHJcblxyXG4gIGxldCBjb3VudENhbGxlZCA9IDA7XHJcbiAgY2FsbEZvckhhcHBpbmVzc0VtaXR0ZXIuYWRkTGlzdGVuZXIoICgpID0+IHtcclxuXHJcbiAgICBhc3NlcnQub2soICsrY291bnRDYWxsZWQgPT09IHN0YXRlLmhhcHBpbmVzcywgYGhhcHBpbmVzcyBzaG91bGQgY2hhbmdlIGFzIGVtaXR0ZWQ6ICR7Y291bnRDYWxsZWR9YCApO1xyXG5cclxuICB9ICk7XHJcblxyXG4gIGNhbGxGb3JIYXBwaW5lc3NFbWl0dGVyLmVtaXQoKTtcclxuICBjYWxsRm9ySGFwcGluZXNzRW1pdHRlci5lbWl0KCk7XHJcbiAgY2FsbEZvckhhcHBpbmVzc0VtaXR0ZXIuZW1pdCgpO1xyXG4gIGNhbGxGb3JIYXBwaW5lc3NFbWl0dGVyLmVtaXQoKTtcclxuICBjYWxsRm9ySGFwcGluZXNzRW1pdHRlci5lbWl0KCk7XHJcbiAgYXNzZXJ0Lm9rKCBzdGF0ZS5oYXBwaW5lc3MgPT09IDUsICdlbmQgY291bnQnICk7XHJcbn0gKTtcclxuXHJcblFVbml0LnRlc3QoICdUaW55RW1pdHRlciByZXZlcnNlIGFuZCByYW5kb20nLCBhc3NlcnQgPT4ge1xyXG5cclxuICBhc3NlcnQub2soIHRydWUsICdmaXJzdCB0ZXN0JyApO1xyXG5cclxuICBjb25zdCBlbWl0dGVyID0gbmV3IFRpbnlFbWl0dGVyKCk7XHJcbiAgY29uc3QgdmFsdWVzOiBzdHJpbmdbXSA9IFtdO1xyXG4gIGVtaXR0ZXIuYWRkTGlzdGVuZXIoICgpID0+IHZhbHVlcy5wdXNoKCAnYScgKSApO1xyXG4gIGVtaXR0ZXIuYWRkTGlzdGVuZXIoICgpID0+IHZhbHVlcy5wdXNoKCAnYicgKSApO1xyXG4gIGVtaXR0ZXIuYWRkTGlzdGVuZXIoICgpID0+IHZhbHVlcy5wdXNoKCAnYycgKSApO1xyXG4gIGVtaXR0ZXIuYWRkTGlzdGVuZXIoICgpID0+IHZhbHVlcy5wdXNoKCAnZCcgKSApO1xyXG5cclxuICBlbWl0dGVyLmVtaXQoKTtcclxuICBhc3NlcnQub2soIHZhbHVlcy5qb2luKCAnJyApID09PSAnYWJjZCcsICdub3JtYWwgb3JkZXInICk7XHJcblxyXG4gIC8vIENoZWNrIHRoZXNlIHZhbHVlcyB3aGVuIHJ1bm5pbmcgd2l0aCA/bGlzdGVuZXJPcmRlcj1yZXZlcnNlIG9yID9saXN0ZW5lck9yZGVyPXJhbmRvbSBvciA/bGlzdGVuZXJPcmRlcj1yYW5kb20oMTIzKVxyXG4gIGNvbnNvbGUubG9nKCB2YWx1ZXMuam9pbiggJycgKSApO1xyXG59ICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxXQUFXLE1BQU0sa0JBQWtCO0FBRzFDQyxLQUFLLENBQUNDLE1BQU0sQ0FBRSxhQUFjLENBQUM7QUFFN0JELEtBQUssQ0FBQ0UsSUFBSSxDQUFFLCtCQUErQixFQUFFQyxNQUFNLElBQUk7RUFFckRBLE1BQU0sQ0FBQ0MsRUFBRSxDQUFFLElBQUksRUFBRSw4REFBK0Qs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