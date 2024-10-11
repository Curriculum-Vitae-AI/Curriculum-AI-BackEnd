const config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/core/**'
  ],
  coverageReporters: ['text'],
  coverageProvider: 'babel',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -5
    }
  },
  testMatch: ['**/src/tests/**/*.js']
};

export default config;
