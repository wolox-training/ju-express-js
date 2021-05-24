const request = require('supertest');
const app = require('../../app');
const { userData, userDataAuthorized } = require('../users/data/users');

describe('POST /users/sessions/invalidate_all invalidate all sessions user', () => {
  let status = null;
  let message = null;
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
      .post('/users/sessions/invalidate_all')
      .set('authorization', `Bearer ${token}`)
      .send();
    ({
      body: { message },
      status
    } = result);
  }, 15000);

  it('Should return status code 200', () => {
    expect(status).toBe(200);
  });

  it('Should return property message invalidate sessions', () => {
    expect(message).toBe('Sessions from user invalidated successfully');
  });
});

describe('POST /users/sessions/invalidate_all user not authorized to invalidate sessions', () => {
  let status = null;
  const token = 'bad token';
  let message = null;
  let internal_code = null;

  beforeAll(async () => {
    const result = await request(app)
      .post('/users/sessions/invalidate_all')
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
