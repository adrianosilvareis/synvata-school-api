# jest-config-lib

default configuration of tests for all project

`jest.config.js`

```
const jestConfig = require('@libs/jest-config-lib');

module.exports = {
  ...jestConfig,
  rootDir: './dist', //need define a rootDir
  // other configurations

```