# ember-shared-memory

[![npm version](https://badge.fury.io/js/ember-shared-memory.svg)](https://badge.fury.io/js/ember-shared-memory)
[![CI](https://github.com/NullVoxPopuli/ember-shared-memory/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/NullVoxPopuli/ember-shared-memory/actions/workflows/ci.yml)

Share objects and values between instances of things.

Share memory between:
- components
- components <-> services
- vanilla classes or other things
- any class

**Why would you want to do this?**

A common use case is when showing search results on a page, you may have multiple
renderings of the same component on that page -- maybe a "Top Result" that is 
duplicated further down the page under categorized results.

using `@shared` allows you to not re-compute that data for the duplicatenly
rendered components.

## Compatibility

* Ember.js v3.25+
* TypeScript v4.2+

## Installation

```bash
npm install ember-shared-memory
# or
yarn add ember-shared-memory
# or
ember install ember-shared-memory
```

## Usage

```js
import Component from '@glimmer/component';

export default class MyComponent extends Component {
  @shared
  get worksOnGetters() { /* ... */ }

  @shared 
  propertyA = 'any value';


  @shared(() => [/* custom keys */])
  propertyB = 'any value';
}
```

## Testing

TODO

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).


## Thanks

This library wouldn't be possible without the work of:
 - [@pzuraq](https://github.com/pzuraq)
 - [@josemarluedke](https://github.com/josemarluedke)

So much appreciate for the work both you have put in to Resources <3

