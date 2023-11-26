//test/keyUtils.test.js 
const { expect } = require('chai');
const { serializeKey, deserializeKey } = require('../keyUtils');

describe('Key Utilities', () => {
  it('should serialize and deserialize an RSA private key', () => {
    const privateKey = '...'; // Provide a valid RSA private key string
    const serializedKey = serializeKey(privateKey);
    const deserializedKey = deserializeKey(serializedKey);

    expect(deserializedKey).to.equal(privateKey);
  });
});
