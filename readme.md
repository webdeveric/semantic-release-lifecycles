# `semantic-release-lifecycles`

[![Node.js CI](https://github.com/webdeveric/semantic-release-lifecycles/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdeveric/semantic-release-lifecycles/actions/workflows/node.js.yml)

## Install

```sh
pnpm add semantic-release-lifecycles -D
```

## Usage

Add this plugin to your `release.config.mjs`.

```js
/**
 * @type {Partial<import('semantic-release').GlobalConfig>}
 */
export default {
  branches: ['main'],
  plugins: ['semantic-release-lifecycles'],
};
```

### Options

All options are optional.

```js
/**
 * @type {Partial<import('semantic-release').GlobalConfig>}
 */
export default {
  branches: ['main'],
  plugins: [
    [
      'semantic-release-lifecycles',
      {
        // Pass in lifecycle names you want to enable. Look at `types.ts` for full list.
        enabled: ['success', 'fail'],
        // Customize where each lifecycle file is written.
        // The naming convention is `${LifecycleName}OutputFile`.
        successOutputFile: 'success.json',
      },
    ],
  ],
};
```
