const jestConfig = require('@libs/jest-config-lib');

module.exports = {
  ...jestConfig,
  setupFiles: [],
  rootDir: './dist',
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!src/index.js',
  ]
};
