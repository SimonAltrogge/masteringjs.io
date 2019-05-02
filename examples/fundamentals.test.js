'use strict';

const assert = require('assert');

describe('Fundamentals', function() {
  it('timestamps', function() {
    // 1556372741848, _milliseconds_ since Jan 1 1970
    Date.now();

    // 1556372741, _seconds_ since Jan 1, 1970. This is the Unix timestamp
    Math.floor(Date.now() / 1000);
    // acquit:ignore:start
    assert.equal(typeof Date.now(), 'number');
    // acquit:ignore:end
  });

  it('get timestamp from date', function() {
    const d = new Date('2019-06-01');

    // Both get you the number of milliseconds since the Unix epoch
    d.getTime(); // 1559347200000
    d.valueOf(); // 1559347200000
    // acquit:ignore:start
    assert.equal(d.getTime(), 1559347200000);
    assert.equal(d.valueOf(), 1559347200000);
    // acquit:ignore:end
  });

  describe('valueOf', function() {
    it('for string, number, date', function() {
      const s = new String('test');
      typeof s; // 'object'
      s.valueOf(); // 'test'
      typeof s.valueOf(); // 'string'

      const n = new Number(42);
      n.valueOf(); // 42

      const d = new Date('2019-06-01');
      d.valueOf(); // 1559347200000
      // acquit:ignore:start
      assert.strictEqual(s.valueOf(), 'test');
      assert.strictEqual(n.valueOf(), 42);
      assert.strictEqual(d.valueOf(), 1559347200000);
      // acquit:ignore:end
    });

    it('compare custom objects', function() {
      class MyClass {
        valueOf() {
          return 0;
        }
      }

      const obj = new MyClass();

      // For the purposes of `<`, `>`, `>=` and `<=`, `obj` is
      // equivalent to 0.
      obj < new Number(-1); // false
      obj > new Number(-1); // true
      obj < -1; // false
      obj > -1; // true

      // For the purposes of `==`, `obj` is equivalent to 0 as a primitive,
      // but not 0 as a Number object. This is because both `obj` and
      // `new Number(0)` are objects, so JS does not call `valueOf()`.
      obj == new Number(0); // false
      obj == 0; // true
      0 == obj; // true

      // `===` skips calling `valueOf()`.
      obj === Number(0); // false
      // acquit:ignore:start
      assert.ok(!(obj < new Number(-1)));
      assert.ok(obj > new Number(-1));
      assert.ok(!(obj == new Number(0)));
      assert.ok(0 == obj);

      assert.ok(!(obj < -1));
      assert.ok(obj > -1);
      assert.ok(obj == 0);

      assert.ok(!(obj === Number(0)));
      // acquit:ignore:end
    });
  });

  it('standard deviation normal', function() {
    const math = require('mathjs');

    // Can pass an array to the `stddev()` function:
    math.std([5, 5, 5, 5]); // 0

    // Or a list of arguments (also called a "spread")
    math.std(1, 5, 9); // 4
    // acquit:ignore:start
    assert.equal(math.std([5, 5, 5, 5]), 0);
    assert.equal(math.std(1, 5, 9), 4);
    // acquit:ignore:end
  });

  it('standard deviation uncorrected', function() {
    const math = require('mathjs');

    // Must pass an array if you're using options
    math.std([1, 3], 'uncorrected'); // 1
    math.std([2, 4, 6, 8], 'biased'); // 2
    // acquit:ignore:start
    assert.equal(math.std([1, 3], 'uncorrected'), 1);
    assert.equal(math.std([2, 4, 6, 8], 'biased'), 2);
    // acquit:ignore:end
  });

  describe('toLocaleString', function() {
    it('basic', function() {
      // No 'Z' at the end means JavaScript will use the server's timezone
      // as opposed to UTC.
      const date = new Date('2019-06-01T00:00:00.000');

      // "Sat, June 01, 2019"
      date.toLocaleString('en-US', {
        weekday: 'short', // "Sat"
        month: 'long', // "June"
        day: '2-digit', // "01"
        year: 'numeric' // "2019"
      });
      // acquit:ignore:start
      assert.equal(date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      }), 'Sat, June 01, 2019');
      // acquit:ignore:end
    });

    it('vs toLocaleDateString', function() {
      const date = new Date('2019-06-01T08:00:00.000');

      // "6/1/2019, 8:00:00 AM"
      date.toLocaleString('en-US');
      // "6/1/2019" with no time portion
      date.toLocaleDateString();

      // But you can still include `hours` and `minutes` using options
      // with `toLocaleDateString()`.
      date.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit'
      }); // "June 01, 2019, 8 AM"
      // acquit:ignore:start
      assert.equal(date.toLocaleString('en-US'), '6/1/2019, 8:00:00 AM');
      assert.equal(date.toLocaleDateString('en-US'), '6/1/2019');
      assert.equal(date.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit'
      }), 'June 01, 2019, 8 AM');
      // acquit:ignore:end
    });

    it('timezone', function() {
      const date = new Date('2019-06-01T08:00:00.000Z');
      // "June 01, 2019, 2 AM"
      date.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        timeZone: 'America/Denver' // 6 hours behind UTC
      });
      // acquit:ignore:start
      assert.equal(date.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        timeZone: 'America/Denver'
      }), 'June 01, 2019, 2 AM');
      // acquit:ignore:end
    });

    it('yyyy-mm-dd', function() {
      const date = new Date('2019-06-01T00:00:00.000');
      // "June 01, 2019, 2 AM"
      date.toLocaleDateString('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      // acquit:ignore:start
      assert.equal(date.toLocaleDateString('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }), '2019-06-01');
      // acquit:ignore:end
    });
  });
});