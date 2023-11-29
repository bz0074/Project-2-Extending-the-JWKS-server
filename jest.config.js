module.exports = {
  testEnvironment: 'node', // Set the test environment to Node.js
  roots: ['<rootDir>/src'], // Specify the root directory for tests
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$', // Regex pattern for test files
  moduleFileExtensions: ['js', 'json', 'node'], // File extensions Jest should look for
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'], // Paths to ignore in code coverage
  collectCoverageFrom: ['src/**/*.js'], // Files to include in code coverage report
};
