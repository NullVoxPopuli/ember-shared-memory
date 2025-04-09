/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

// https://github.com/emberjs/ember.js/blob/21bd70c773dcc4bfe4883d7943e8a68d203b5bad/packages/%40ember/-internals/metal/lib/decorator.ts

export type DecoratorPropertyDescriptor = (PropertyDescriptor & { initializer?: any }) | undefined;

export type Decorator = (
  target: object,
  key: string,
  desc?: DecoratorPropertyDescriptor
) => DecoratorPropertyDescriptor;

export function isElementDescriptor(
  args: any[]
): args is [object, string, DecoratorPropertyDescriptor] {
  let [maybeTarget, maybeKey, maybeDesc] = args;

  return (
    // Ensure we have the right number of args
    args.length === 3 &&
    // Make sure the target is a class or object (prototype)
    (typeof maybeTarget === 'function' ||
      (typeof maybeTarget === 'object' && maybeTarget !== null)) &&
    // Make sure the key is a string
    typeof maybeKey === 'string' &&
    // Make sure the descriptor is the right shape
    ((typeof maybeDesc === 'object' && maybeDesc !== null) || maybeDesc === undefined)
  );
}
