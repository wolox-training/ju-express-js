const request = require('supertest');
const app = require('../../app');
const {
  userData,
  userDataEmailIncorrect,
  userPasswordIncomplete,
  userPasswordINotAlphanumeric,
  userDataMissingFieldFirstName,
  userDataMissingFieldLastName,
  userDataMissingFieldEmail,
  userDataMissingFieldPassword
} = require('./data/users');

describe('POST /signup user register into database', () => {
  let status = null;
  let name = null;

  beforeAll(async () => {
    const result = await request(app)
      .post('/signup')
      .send(userData);
    ({
      body: { name },
      status
    } = result);
  });

  it('Should return status code 201', () => {
    expect(status).toBe(201);
  });

  it('Should return property name', () => {
    expect(name).toBe(userData.first_name);
  });
});

describe('POST /signup - failed creating user user already exists', () => {
  let status = null;
  let message = null;

  beforeAll(async () => {
    let result = await request(app)
      .post('/signup')
      .send(userData);
    result = await request(app)
      .post('/signup')
      .send(userData);
    ({
      body: { message },
      status
    } = result);
  });

  it('Should return status code 409', () => {
    expect(status).toBe(409);
  });

  it('Should fail and display an existing user message', () => {
    expect(message).toBe('The user already exists');
  });
});

describe('POST /signup - Email is incorrect', () => {
  let message = null;
  let status = null;
  let internal_code = null;
  beforeAll(async () => {
    const result = await request(app)
      .post('/signup')
      .send(userDataEmailIncorrect);

    ({
      body: { message, internal_code },
      status
    } = result);
  });

  it('Should fail and display a email message', () => {
    expect(message).toBe('"email" must be a valid email');
  });

  it('Should return status code 400', () => {
    expect(status).toBe(400);
  });

  it('Should return an internal code error', () => {
    expect(internal_code).toBe('bad_request_error');
  });
});

describe('POST /signup - Password without the complete length', () => {
  let message = null;
  let status = null;
  let internal_code = null;
  beforeAll(async () => {
    const result = await request(app)
      .post('/signup')
      .send(userPasswordIncomplete);

    ({
      body: { message, internal_code },
      status
    } = result);
  });

  it('Should fail and display a password message', () => {
    expect(message).toBe('"password" length must be at least 8 characters long');
  });

  it('Should return status code 400', () => {
    expect(status).toBe(400);
  });

  it('Should return an internal code error', () => {
    expect(internal_code).toBe('bad_request_error');
  });
});

describe('POST /signup - Password is not alphanumeric', () => {
  let message = null;
  let status = null;
  let internal_code = null;
  beforeAll(async () => {
    const result = await request(app)
      .post('/signup')
      .send(userPasswordINotAlphanumeric);

    ({
      body: { message, internal_code },
      status
    } = result);
  });

  it('Should fail and display a password message', () => {
    expect(message).toBe('"password" must only contain alpha-numeric characters');
  });

  it('Should return status code 400', () => {
    expect(status).toBe(400);
  });

  it('Should return an internal code error', () => {
    expect(internal_code).toBe('bad_request_error');
  });
});

describe('POST /signup - First name is missing', () => {
  let message = null;
  let status = null;
  let internal_code = null;
  beforeAll(async () => {
    const result = await request(app)
      .post('/signup')
      .send(userDataMissingFieldFirstName);

    ({
      body: { message, internal_code },
      status
    } = result);
  });

  it('Should fail and display a first_name message', () => {
    expect(message).toBe("field 'first_name' is required");
  });

  it('Should return status code 400', () => {
    expect(status).toBe(400);
  });

  it('Should return an internal code error', () => {
    expect(internal_code).toBe('bad_request_error');
  });
});

describe('POST /signup - Last name is missing', () => {
  let message = null;
  let status = null;
  let internal_code = null;
  beforeAll(async () => {
    const result = await request(app)
      .post('/signup')
      .send(userDataMissingFieldLastName);

    ({
      body: { message, internal_code },
      status
    } = result);
  });

  it('Should fail and display a last_name message', () => {
    expect(message).toBe("field 'last_name' is required");
  });

  it('Should return status code 400', () => {
    expect(status).toBe(400);
  });

  it('Should return an internal code error', () => {
    expect(internal_code).toBe('bad_request_error');
  });
});

describe('POST /signup - Email is missing', () => {
  let message = null;
  let status = null;
  let internal_code = null;
  beforeAll(async () => {
    const result = await request(app)
      .post('/signup')
      .send(userDataMissingFieldEmail);

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

describe('POST /signup - Password is missing', () => {
  let message = null;
  let status = null;
  let internal_code = null;
  beforeAll(async () => {
    const result = await request(app)
      .post('/signup')
      .send(userDataMissingFieldPassword);

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

describe('POST /signup - failed sending welcome email', () => {
  let status = null;
  let message = null;
  let internal_code = null;

  beforeAll(async () => {
    process.env.MAILER_USER = 'badmail@Mail.com';
    process.env.MAILER_PASSWORD = 'badpass';
    const result = await request(app)
      .post('/signup')
      .send(userData);

    ({
      body: { message, internal_code },
      status
    } = result);
  });

  it('Should fail and display a password message', () => {
    expect(message).toBe('Error sending the welcome email');
  });

  it('Should return status code 424', () => {
    expect(status).toBe(424);
  });

  it('Should return a failed dependency code error', () => {
    expect(internal_code).toBe('failed_dependency_error');
  });
});
