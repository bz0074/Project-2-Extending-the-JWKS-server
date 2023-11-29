
const supertest = require('supertest');
const app = require('./server');

// Mock database with test data
const db = require('./db');
db.run('INSERT INTO keys (key, exp) VALUES (?, ?)', 'test-key', Date.now() + 3600000);

// Test /auth endpoint
test('POST /auth', async () => {
  const response = await supertest(app)
    .post('/auth')
    .query({ expired: false });

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('token');
});

// Test /.well-known/jwks.json endpoint
test('GET /.well-known/jwks.json', async () => {
  const response = await supertest(app)
    .get('/.well-known/jwks.json');

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('keys');
  expect(response.body.keys.length).toBeGreaterThan(0);
});

// Add more tests as needed
