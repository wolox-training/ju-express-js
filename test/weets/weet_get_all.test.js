const request = require('supertest');
const app = require('../../app');
const { userData, userDataAuthorized } = require('../users/data/users');

describe('GET /weets get all weets', () => {
  let status = null;
  let token = null;
  let weets = null;

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

    for (let i = 0; i <= 2; i++) {
      await request(app)
        .post('/weets')
        .set('authorization', `Bearer ${token}`)
        .send();
    }

    const result = await request(app)
      .get('/weets')
      .set('authorization', `Bearer ${token}`)
      .query({ limit: 10, offset: 0 });

    ({
      body: { weets },
      status
    } = result);
  }, 20000);

  it('Should return status code 200', () => {
    expect(status).toBe(200);
  });

  it('Should return property weets is not null', () => {
    expect(weets).not.toBe(null);
  });

  it('Should return property weets array lengt == 3', () => {
    expect(weets.length).toBe(3);
  });
});

describe('GET /weets get all weets not authorized by invalid token', () => {
  let status = null;
  const token = 'bad token';
  let message = null;
  let internal_code = null;

  beforeAll(async () => {
    const result = await request(app)
      .get('/weets')
      .set('authorization', `Bearer ${token}`)
      .query({ limit: 10, offset: 0 });

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
