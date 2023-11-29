// jwtUtils.test.js
const { serializeKey, deserializeKey } = require('../src/jwtUtils');
const fs = require('fs');

describe('JWT Utilities Tests', () => {
  test('should serialize and deserialize a key', () => {
    // Assuming privateKey and publicKey are your key files
    const privateKeyPath = 'path/to/private.pem';
    const publicKeyPath = 'path/to/public.pem';

    // Ensure the files exist before attempting to read them
    if (!fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
      console.error('Key files not found. Adjust the paths accordingly.');
      return;
    }

    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
    const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

    const originalData = { user: 'John Doe' };

    // Serialize key
    const serializedKey = serializeKey(privateKey, originalData);

    // Deserialize key
    const deserializedData = deserializeKey(serializedKey, publicKey);

    // Assertion
    expect(deserializedData).toEqual(originalData);
  });
});
