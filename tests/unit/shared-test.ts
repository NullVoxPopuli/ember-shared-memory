import { setOwner } from '@ember/application';
import { settled } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { shared } from 'ember-shared-memory';

module('shared', function () {
    setupTest(hooks);

    test('it works', async function (assert) {
      class Test {
        _rand = useFunction(this, () => Math.random());
        rand = shared(this, () => this._rand);
      }

      let foo1 = new Test();
      let foo2 = new Test();

      setOwner(foo1, this.owner);
      setOwner(foo2, this.owner);

      let rand1 = foo1.rand.value;

      await settled();

      assert.equal(foo2.rand.value, rand1);
    });
});
