const request = require('supertest');
const app = require('../src/server');

let server;

beforeAll((done) => {
    server = app.listen(4000, () => {
        console.log('Server is running on port 4000');
        done();
    }, 10000);
});

describe('jwtUtils Tests', () => {
    it('should authenticate successfully', async () => {
        // Your test logic here
        const response = await request(app).get('/your-endpoint?expired=true');
        expect(response.status).toBe(200);
    });
});

afterAll((done) => {
    server.close(done);
});

describe('jwtUtils Tests', () => {
  it('should authenticate successfully', (done) => {
    // Your test logic here
    request(app)
      .get('/your-endpoint?expired=true')
      .expect(200)
      .end((err, res) => {
        // Handle the response
        done();
      });
  });
});
