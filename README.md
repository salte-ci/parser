**THIS LIBRARY IS CURRENTLY A WIP**

![CI](https://github.com/salte-ci/parser/workflows/CI/badge.svg)

### @salte-ci/parser

#### Prerequisites

- [NodeJS v12+](https://nodejs.org)

### Usage

```sh
# This package isn't deployed to npm yet.
$ npm i -S git+https://git@github.com/salte-ci/parser.git
```

```js
import { parse } from '@salte-ci/parser';

// Input:
// image: node:alpine
// steps:
//  - npm ci

const output = parse(fs.readFileSync('.salte-ci.yml'));

// Output:
// { 
//   "image": "node:alpine",
//   "steps": [
//     "npm ci"
//   ]
// }
console.log(output);
```

#### Testing Locally

- Just install the dependencies via `npm i`.

- After that it's a simple as running `npm test`!
