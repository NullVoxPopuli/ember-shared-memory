/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
type Stringy = string | string[] | Array<{ toString: () => string }>;

type Key = string | Stringy;

type Decorator = (
  target: object,
  key: string | symbol,
  descriptor: PropertyDescriptor
) => PropertyDescriptor;

type DecoratorFactory = Decorator | ((key: Key) => Decorator);

export function shared(target: object, key: string | symbol, descriptor: PropertyDescriptor): void;
export function shared(
  key: Key
): (target: object, key: string | symbol, descriptor: PropertyDescriptor) => void;

/**
 *
 */
export function shared(...args: any[]): ReturnType<DecoratorFactory> {
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

function decoratorCachedVia(
  target: object,
  propName: string | symbol,
  descriptor: PropertyDescriptor,
  key?: Key
) {
  let oldGet = descriptor.get;

  console.log({ target, propName, key, descriptor });

  /**
   * value is assigned a value,
   * replace with getter so we can auto-track and sync
   */
  if ('initializer' in descriptor) {
    let { initializer } = descriptor;
    // TODO: store this based on key
    let value;

    return {
      configurable: true,
      enumerable: true,
      get: function () {
        console.log(this.constructor, { target, propName, key });

        return value ?? initializer();
      },
      set: function (newValue) {
        value = newValue;

        return value;
      },
    };
  }

  descriptor.get = function () {
    console.log({ target, propName, key });
    console.log(this.constructor);

    return oldGet();
  };

  return descriptor;
}
