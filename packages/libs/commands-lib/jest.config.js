const jestConfig = require('@libs/jest-config-lib');

module.exports = {
  ...jestConfig,
  rootDir: './dist',
  setupFiles: [],
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!src/index.js',
  ],
};
