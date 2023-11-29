// extension.test.js

const expect = require('chai').expect;
describe('Utility Tests', () => {
  it('should reload only when needed', () => {
    // Test logic goes here
  });

describe('Extension Tests', () => {
  it('should run an extension test', () => {
    expect(true).to.equal(true); // Placeholder test
  });

  // Add more extension tests as needed
});
// jest.config.js

module.exports = {
  // ... other config options
  transformIgnorePatterns: [
    "/node_modules/(?!twxs\\.cmake-0\\.0\\.17)"
  ],
};
