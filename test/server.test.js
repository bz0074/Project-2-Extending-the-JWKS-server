// server.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server'); // Adjust the path accordingly

chai.use(chaiHttp);
const expect = chai.expect;

describe('Server Tests', () => {
  it('should start the server', async () => {
    // Use an async function to handle server startup
    await new Promise((resolve) => {
      app.listen(3000, () => {
        console.log('Server is running on port 3000');
        resolve();
      });
    });

    // Make your HTTP requests here
    const res = await chai.request(app).get('/');
    
    // Assertions go here
    expect(res).to.have.status(404);
  });

  // Add more server tests as needed
});
