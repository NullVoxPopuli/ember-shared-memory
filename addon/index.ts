/* eslint-disable @typescript-eslint/ban-types */
type Stringy = string | string[] | Array<{ toString: () => string }>;

// export function shared(keyFn: () => Stringy) => PropertyDecorator;
// export function shared(key: object | string) => PropertyDecorator;
// export function shared  PropertyDecorator;

export const shared  = (...args: any[]): void | PropertyDecorator {
  if (args.length === 1 ) {
    return (target, key, descriptor) => {
      // decorator
    }
  }

  if (args.length === 3) {
    let [target, key, descriptor]  = args;
  }

  throw new Error('Incorrect Arity for @shared');
}
