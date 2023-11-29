// jwtUtils.test.js

const expect = require('chai').expect;
const jwtUtils = require('../src/jwtUtils'); // Adjust the path accordingly
const NodeRSA = require('node-rsa');

describe('JWT Utilities Tests', () => {
  it('should serialize and deserialize a key', () => {
    const key = new NodeRSA({ b: 512 });
    
    // Ensure that the key is initialized correctly
    expect(key).to.be.an.instanceOf(NodeRSA);

    // Serialize the public key using 'pkcs1-public-pem' format
    const serializedKey = jwtUtils.serializeKey(key.exportKey('pkcs1-public-pem'));

    // Deserialize the key
    const deserializedKey = jwtUtils.deserializeKey(serializedKey);

    // Ensure that the deserialized key matches the original key
    expect(deserializedKey.exportKey('pkcs1-public-pem')).to.equal(key.exportKey('pkcs1-public-pem'));
  });

  // Add more JWT utility tests as needed
});
