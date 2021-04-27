const request = require('supertest');
const app = require('../../app');
const { userData, userDataAuthorized } = require('../users/data/users');

describe('POST /weets user register weet into database', () => {
  let status = null;
  let weet = null;
  let token = null;
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

    const result = await request(app)
      .post('/weet')
      .set('authorization', `Bearer ${token}`)
      .send();
    ({
      body: { weet },
      status
    } = result);
  }, 15000);

  it('Should return status code 201', () => {
    expect(status).toBe(201);
  });

  it('Should return property weet not null', () => {
    expect(weet).not.toBeNull();
  });
});

describe('POST /weet user can not register weet not authorized by invalid token', () => {
  let status = null;
  const token = 'bad token';
  let message = null;
  let internal_code = null;

  beforeAll(async () => {
    const result = await request(app)
      .post('/weet')
      .set('authorization', `Bearer ${token}`)
      .send();

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
