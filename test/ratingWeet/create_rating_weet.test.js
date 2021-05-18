const request = require('supertest');
const app = require('../../app');
const { userData, userDataAuthorized } = require('../users/data/users');
const { ratingWeetData, ratingWeetDataIvalid } = require('./data/ratingWeets');

describe('POST /weets/:id/ratings rating weet register into database', () => {
  let status = null;
  let rating = null;
  let token = null;
  const weetId = 1;
  beforeAll(async () => {
    await request(app)
      .post('/signup')
      .send(userData);

    const signIn = await request(app)
      .post('/signin')
      .send(userDataAuthorized);
    ({
      body: { token }
    } = signIn);

    await request(app)
      .post('/weets')
      .set('authorization', `Bearer ${token}`)
      .send();
    const result = await request(app)
      .post(`/weets/${weetId}/ratings`)
      .set('authorization', `Bearer ${token}`)
      .send(ratingWeetData);
    ({
      body: { rating },
      status
    } = result);
  }, 15000);

  it('Should return status code 201', () => {
    expect(status).toBe(201);
  });

  it('Should return property score', () => {
    expect(rating.score).toBe(ratingWeetData.score);
  });
});

describe('POST /weets/:id/ratings rating weet not register into database invalid score', () => {
  let status = null;
  let message = null;
  let token = null;
  const weetId = 1;
  beforeAll(async () => {
    await request(app)
      .post('/signup')
      .send(userData);

    const signIn = await request(app)
      .post('/signin')
      .send(userDataAuthorized);
    ({
      body: { token }
    } = signIn);

    await request(app)
      .post('/weets')
      .set('authorization', `Bearer ${token}`)
      .send();
    const result = await request(app)
      .post(`/weets/${weetId}/ratings`)
      .set('authorization', `Bearer ${token}`)
      .send(ratingWeetDataIvalid);
    ({
      body: { message },
      status
    } = result);
  }, 15000);

  it('Should return status code 400', () => {
    expect(status).toBe(400);
  });

  it('Should fail and display a score message', () => {
    expect(message).toBe('"score" must be one of [-1, 1]');
  });
});

describe('POST /weets/:id/ratings can not create rating weet not authorized by invalid token', () => {
  let status = null;
  const token = 'bad token';
  let message = null;
  let internal_code = null;
  const weetId = 1;

  beforeAll(async () => {
    const result = await request(app)
      .post(`/weets/${weetId}/ratings`)
      .set('authorization', `Bearer ${token}`)
      .send(ratingWeetData);

    ({
      body: { message, internal_code },
      status
    } = result);
  }, 15000);

  it('Should fail and display a token message', () => {
    expect(message).toBe('Invalid token');
  });

  it('Should return status code 401', () => {
    expect(status).toBe(401);
  });

  it('Should return an internal code error', () => {
    expect(internal_code).toBe('unauthorized_error');
  });
});
