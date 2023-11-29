const { yourTestFunction } = require('./yourTestFile');

suite("Utility tests", () => {
    test("Reloads only when needed", function () {
        // Test logic
    });
});

// With this:
describe("Utility tests", () => {
    test("Reloads only when needed", () => {
        // Test logic
    });
});
