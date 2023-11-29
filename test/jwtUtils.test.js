// jwtUtils.test.js

const expect = require('chai').expect;
const jwtUtils = require('../src/jwtUtils'); // Adjust the path accordingly
const NodeRSA = require('node-rsa');

describe('JWT Utilities Tests', () => {
  it('should serialize and deserialize a key', () => {
    const key = new NodeRSA({ b: 512 });
    const serializedKey = jwtUtils.serializeKey(key.exportKey('pkcs1-pem'));
    const deserializedKey = jwtUtils.deserializeKey(serializedKey);

    expect(deserializedKey.exportKey('pkcs1-pem')).to.equal(key.exportKey('pkcs1-pem'));
  });

  // Add more JWT utility tests as needed
});
