// jwtUtils.js

const NodeRSA = require('node-rsa');

function serializeKey(key) {
  return key.exportKey('pkcs1-pem');
}

function deserializeKey(serializedKey) {
  return new NodeRSA(serializedKey, 'pkcs1-pem');
}

module.exports = { serializeKey, deserializeKey };
