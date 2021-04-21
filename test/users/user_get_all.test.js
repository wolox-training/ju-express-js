const request = require('supertest');
const app = require('../../app');
const { usersToInsert, userDataAuthorized } = require('./data/users');

describe('POST /users get all users', () => {
  let status = null;
  let token = null;
  let users = null;

  beforeAll(async () => {
    for (const userData of usersToInsert) {
      await request(app)
        .post('/signup')
        .send(userData);
    }

    const signIn = await request(app)
      .post('/signin')
      .send(userDataAuthorized);
    ({
      body: { token }
    } = signIn);

    const result = await request(app)
      .get('/users')
      .set('authorization', `Bearer ${token}`)
      .query({ limit: 10, offset: 0 });

    ({
      body: { users },
      status
    } = result);
  }, 15000);

  it('Should return status code 200', () => {
    expect(status).toBe(200);
  });

  it('Should return property users is not null', () => {
    expect(users).not.toBe(null);
  });

  it('Should return property users array lengt == 3', () => {
    expect(users.length).toBe(3);
  });
});

describe('POST /users get all users not authorized by invalid token', () => {
  let status = null;
  const token = 'bad token';
  let message = null;
  let internal_code = null;

  beforeAll(async () => {
    const result = await request(app)
      .get('/users')
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
