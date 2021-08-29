import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { shared } from 'ember-shared-memory';

module('shared', function (hooks) {
  setupTest(hooks);

  test('it shares a property', async function (assert) {
    class Test {
      @shared num = 2;
    }

    let foo1 = new Test();
    let foo2 = new Test();

    assert.equal(foo1.num, foo2.num);
    assert.equal(foo1.num, 2);

    foo1.num = 3;
    assert.equal(foo1.num, foo2.num);
    assert.equal(foo1.num, 3);

    foo2.num = 7;
    assert.equal(foo1.num, foo2.num);
    assert.equal(foo1.num, 7);
  });

  test('it shares a getter', async function (assert) {
    class Test {
      _num = 2;

      @shared
      get num() {
        return this._num;
      }
    }

    let foo1 = new Test();
    let foo2 = new Test();

    // assert.equal(foo1.num, foo2.num);
    // assert.equal(foo1.num, 2);

    foo1._num = 3;
    assert.equal(foo1.num, foo2.num);
    assert.equal(foo1.num, 3);

    // foo2._num = 7;
    // assert.equal(foo1.num, foo2.num);
    // assert.equal(foo1.num, 7);
  });
});
