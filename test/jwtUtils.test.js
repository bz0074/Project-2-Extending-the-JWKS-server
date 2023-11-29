
const jwtUtils = require('./jwtUtils');
const db = require('./db');

test('Load private keys', async () => {
  // Mock data in the database
  db.run('INSERT INTO keys (key, exp) VALUES (?, ?)', 'test-key', Date.now() + 3600000);

  const privateKeys = await jwtUtils.loadPrivateKeys();
  expect(privateKeys).toHaveLength(1);
});

// Add more tests as needed

