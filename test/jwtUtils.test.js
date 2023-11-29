// jwtUtils.test.js
const { serializeKey, deserializeKey } = require('../src/jwtUtils');
const fs = require('fs');

describe('JWT Utilities Tests', () => {
  test('should serialize and deserialize a key', () => {
    // Assuming privateKey and publicKey are your key files
    const privateKey = fs.readFileSync('path/to/private.pem', 'utf8');
    const publicKey = fs.readFileSync('path/to/public.pem', 'utf8');

    const originalData = { user: 'John Doe' };

    // Serialize key
    const serializedKey = serializeKey(privateKey, originalData);

    // Deserialize key
    const deserializedData = deserializeKey(serializedKey, publicKey);

    // Assertion
    expect(deserializedData).toEqual(originalData);
  });
});
