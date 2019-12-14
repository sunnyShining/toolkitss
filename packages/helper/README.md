# @toolkitss/helper

> 一些常用的工具库

# Installation

## Using npm:

```zsh
$ npm i -g npm
$ npm i --save @toolkitss/helper
```

## Using yarn:

```zsh
$ yarn add @toolkitss/helper
```

## Usage

```js
import { augment } from '@toolkitss/helper'

const parent = function () { /** pass */}

augment(parent, {
  m1 () {
    /** empty */
  },
  m2 (name: string, value: any) {
   /** empty */
  }
})
```
