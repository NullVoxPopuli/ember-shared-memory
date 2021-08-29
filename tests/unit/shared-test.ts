import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { shared } from 'ember-shared-memory';

module('shared', function (hooks) {
  setupTest(hooks);

  test('it works', async function (assert) {
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
});
