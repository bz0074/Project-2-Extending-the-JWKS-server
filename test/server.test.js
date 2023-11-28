const request = require('supertest');
const app = require('../src/server');

it('your test description', (done) => {
  // Your test logic here
  console.log('Server is running on port 3000');
  done();
});

describe('POST /auth', () => {
  it('should return a valid JWT', async () => {
    const response = await request(app).post('/auth');
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});

describe('GET /.well-known/jwks.json', () => {
  it('should return a valid JWKS', async () => {
    const response = await request(app).get('/.well-known/jwks.json');
    expect(response.status).toBe(200);
    expect(response.body.keys).toBeDefined();
  });
});

describe('GET /.well-known/jwks.json', () => {
  it('should return a valid JWKS', async () => {
    const response = await request(app).get('/.well-known/jwks.json');
    expect(response.status).toBe(200);
    expect(response.body.keys).toBeDefined();
  }, 10000); // Set the timeout to 10000 ms (10 seconds) or adjust as needed
});

