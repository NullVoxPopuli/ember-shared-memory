/* eslint-disable @typescript-eslint/no-explicit-any */
import { assert } from '@ember/debug';

import type { Decorator, DecoratorPropertyDescriptor } from './-private/decorator';

/* eslint-disable @typescript-eslint/ban-types */
type Stringy = string | string[] | Array<{ toString: () => string }>;

type Key = string | Stringy;

export function shared(target: object, key: string, desc?: DecoratorPropertyDescriptor): any;
export function shared(key: Key): Decorator;

/**
 * @decorator
 *
 * shares a value between any object with a matching key.
 */
export function shared(...args: any[]): Decorator | DecoratorPropertyDescriptor {
  if (args.length === 1) {
    let decorator: Decorator = (target, propName, descriptor) => {
      return decoratorCachedVia(target, propName, descriptor, args[0]);
    };

    return decorator;
  }

  if (args.length > 1) {
    let [target, propName, descriptor] = args;

    return decoratorCachedVia(target, propName, descriptor);
  }

  throw new Error(
    `Incorrect Arity for @shared. Expected either 1 or 3 (decorator), but received: ${args.length}`
  );
}

const DEFAULT_CACHE = new WeakMap<object, unknown>();

function decoratorCachedVia(
  target: object,
  propName: string | symbol,
  descriptor?: DecoratorPropertyDescriptor,
  key?: Key
) {
  assert(
    `@shared cannot be used without a descriptor-providing property/method/getter`,
    descriptor
  );

  /**
   * value is assigned a value,
   * replace with getter so we can auto-track and sync
   */
  if (descriptor.initializer) {
    let { initializer } = descriptor;

    return {
      configurable: true,
      enumerable: true,
      get: function () {
        // TODO: add in args, if they exist
        let existing = DEFAULT_CACHE.get(this.constructor);

        if (existing) {
          return existing;
        }

        let initial = initializer();

        DEFAULT_CACHE.set(this.constructor, initial);

        return initial;
      },
      set: function (newValue: unknown) {
        DEFAULT_CACHE.set(this.constructor, newValue);
      },
    };
  }

  if (descriptor.get) {
    let oldGet = descriptor.get;

    return {
      configurable: true,
      enumerable: false,
      get: function () {
        // TODO: add in args, if they exist
        let existing = DEFAULT_CACHE.get(this.constructor);

        if (existing) {
          assert(`expected cached getter to be a function`, typeof existing === 'function');

          return existing.call(this);
        }

        window.a = window.a || [];
        window.a.push(this.constructor);
        // console.log(this.constructor)

        DEFAULT_CACHE.set(this.constructor, oldGet);

        let initial = oldGet.call(this);

        return initial;
      },
      set: undefined,
    };
  }

  assert(`Descriptor not supported`);
}
