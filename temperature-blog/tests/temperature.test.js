const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

describe('Temperature Blog API', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://sakthia:rajapandian@clusterblog.9urvzoq.mongodb.net/blogdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a temperature record', async () => {
    const res = await request(app)
      .post('/new')
      .send({ city: 'TestCity', temperature: '25' });

    expect(res.statusCode).toBe(302); // Redirect
  });

  it('should return homepage successfully', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});
