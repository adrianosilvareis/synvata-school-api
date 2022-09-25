const jestConfig = require('@libs/jest-config-lib');

module.exports = {
  ...jestConfig,
  rootDir: './',
  setupFilesAfterEnv: ['<rootDir>/tests/config/client-database.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!src/index.ts',
    '!src/**/index.ts',
    '!src/config/**',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^#/(.*)$': '<rootDir>/tests/$1',
  },
};
