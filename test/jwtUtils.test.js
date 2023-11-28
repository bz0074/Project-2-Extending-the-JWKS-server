it('should return a valid JWT when a valid key is present', () => {
  // Mock request and response objects
  const req = { query: {} };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  // Mock database response with a valid key
  const dbGetMock = jest.fn().mockImplementation((query, callback) => {
    callback(null, { kid: 1, key: 'base64url-encoded-key', exp: Date.now() + 3600000 });
  });
  // Ensure dbGetMock is in scope
const dbGetMock = jest.fn();
jest.mock('../src/db', () => ({ get: dbGetMock }));


  // Use jest.mock inside the test function
  jest.mock('../src/db', () => ({ get: dbGetMock }));

  // Call the authenticate function
  jwtUtils.authenticate(req, res);

  // Assertions
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ token: expect.any(String) });
});
