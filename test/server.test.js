const request = require('supertest');
const app = require('../src/server');

let server;

beforeAll((done) => {
    // Start the server before all tests
    server = app.listen(3000, () => {
        console.log('Server is running on port 3000');
        done();
    });
});

afterAll((done) => {
    // Close the server after all tests
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
