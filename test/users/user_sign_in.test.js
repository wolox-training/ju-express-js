const request = require('supertest');
const app = require('../../app');
const {
  userData,
  userDataAuthorized,
  userDataUnauthorizedEmail,
  userDataUnauthorizedPassword,
  userSignInMissingEmail,
  userSignInMissingPassword
} = require('./data/users');

describe('POST /signin user get authorization token', () => {
  let status = null;
  let token = null;
  let expires = null;

  beforeAll(async () => {
    let result = await request(app)
      .post('/signup')
      .send(userData);
    result = await request(app)
      .post('/signin')
      .send(userDataAuthorized);
    ({
      body: { token, expires },
      status
    } = result);
  }, 10000);

  it('Should return status code 201', () => {
    expect(status).toBe(201);
  });

  it('Should return property token', () => {
    expect(token).not.toBe(null);
  });

  it('Should return property expires', () => {
    expect(expires).not.toBe(null);
  });
});

describe('POST /signin user unauthorized email', () => {
  let message = null;
  let status = null;
  let internal_code = null;

  beforeAll(async () => {
    let result = await request(app)
      .post('/signup')
      .send(userData);
    result = await request(app)
      .post('/signin')
      .send(userDataUnauthorizedEmail);
    ({
      body: { message, internal_code },
      status
    } = result);
  }, 10000);

  it('Should fail and display a email message', () => {
    expect(message).toBe(`The user ${userDataUnauthorizedEmail.email} is wrong`);
  });

  it('Should return status code 401', () => {
    expect(status).toBe(401);
  });

  it('Should return an internal code error', () => {
    expect(internal_code).toBe('unauthorized_error');
  });
});

describe('POST /signin user unauthorized passsword', () => {
  let message = null;
  let status = null;
  let internal_code = null;

  beforeAll(async () => {
    let result = await request(app)
      .post('/signup')
      .send(userData);
    result = await request(app)
      .post('/signin')
      .send(userDataUnauthorizedPassword);
    ({
      body: { message, internal_code },
      status
    } = result);
  }, 10000);

  it('Should fail and display a email message', () => {
    expect(message).toBe('The password is wrong');
  });

  it('Should return status code 401', () => {
    expect(status).toBe(401);
  });

  it('Should return an internal code error', () => {
    expect(internal_code).toBe('unauthorized_error');
  });
});

describe('POST /signin - Email is missing', () => {
  let message = null;
  let status = null;
  let internal_code = null;
  beforeAll(async () => {
    const result = await request(app)
      .post('/signin')
      .send(userSignInMissingEmail);

    ({
      body: { message, internal_code },
      status
    } = result);
  });

  it('Should fail and display a email message', () => {
    expect(message).toBe("field 'email' is required");
  });

  it('Should return status code 400', () => {
    expect(status).toBe(400);
  });

  it('Should return an internal code error', () => {
    expect(internal_code).toBe('bad_request_error');
  });
});

describe('POST /signin - Password is missing', () => {
  let message = null;
  let status = null;
  let internal_code = null;
  beforeAll(async () => {
    const result = await request(app)
      .post('/signin')
      .send(userSignInMissingPassword);

    ({
      body: { message, internal_code },
      status
    } = result);
  });

  it('Should fail and display a password message', () => {
    expect(message).toBe("field 'password' is required");
  });

  it('Should return status code 400', () => {
    expect(status).toBe(400);
  });

  it('Should return an internal code error', () => {
    expect(internal_code).toBe('bad_request_error');
  });
});
