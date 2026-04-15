const request = require('supertest');
const app = require('../src/app');

describe('GET /api/health', () => {
  it('should return status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.message).toBe('App is running!');
    expect(res.body.timestamp).toBeDefined();
  });
});

describe('GET /api/hello/:name', () => {
  it('should return a greeting with the given name', async () => {
    const res = await request(app).get('/api/hello/Alice');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello, Alice! 👋');
    expect(res.body.name).toBe('Alice');
  });

  it('should handle different names', async () => {
    const res = await request(app).get('/api/hello/DevOps');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('DevOps');
  });
});

describe('GET /unknown-route', () => {
  it('should return 404', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Route not found');
  });
});
