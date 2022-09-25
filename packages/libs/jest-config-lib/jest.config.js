module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/src/**',
  ],
  preset: 'ts-jest',
  setupFiles: [
    '<rootDir>/tests/setup.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
  testTimeout: 30000,
};
