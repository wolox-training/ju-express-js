const request = require('supertest');
const utilities = require('../../app/helpers/utilities');
const { USER_ROLE } = require('../../app/helpers/constants');
const { createUserAdmin } = require('../../app/services/users');
const { signUpMapper } = require('../../app/mappers/users');
const app = require('../../app');
const {
  userData,
  userDataEmailIncorrect,
  userPasswordIncomplete,
  userPasswordINotAlphanumeric,
  userDataMissingFieldFirstName,
  userDataMissingFieldLastName,
  userDataMissingFieldEmail,
  userDataMissingFieldPassword,
  userDataAuthorized,
  userAdminData,
  userAdminDataToCreate
} = require('./data/users');

describe('POST /admin/users user admin register into database', () => {
  let status = null;
  let name = null;
  let token = null;
  beforeAll(async () => {
    const encryptedPassword = await utilities.encryptText(userAdminData.password);
    let userAdminDataEncrypted = { ...userAdminData, password: encryptedPassword };
    userAdminDataEncrypted = signUpMapper(userAdminDataEncrypted);
    userAdminDataEncrypted.role = USER_ROLE.ADMIN;
    await createUserAdmin(userAdminDataEncrypted);

    const signIn = await request(app)
      .post('/signin')
      .send(userDataAuthorized);
    ({
      body: { token }
    } = signIn);

    const result = await request(app)
      .post('/admin/users')
      .set('authorization', `Bearer ${token}`)
      .send(userAdminDataToCreate);
    ({
      body: { name },
      status
    } = result);
  }, 15000);

  it('Should return status code 201', () => {
    expect(status).toBe(201);
  });

  it('Should return property name', () => {
    expect(name).toBe(userAdminDataToCreate.first_name);
  });
});

describe('POST /admin/users regular user creating admin', () => {
  let status = null;
  let token = null;
  let message = null;
  let internal_code = null;
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
      .post('/admin/users')
      .set('authorization', `Bearer ${token}`)
      .send(userAdminDataToCreate);
    ({
      body: { message, internal_code },
      status
    } = result);
  }, 15000);

  it('Should fail and display a unauthorized to create admin user message', () => {
    expect(message).toBe('Only user admin can create admin user');
  });

  it('Should return status code 401', () => {
    expect(status).toBe(401);
  });

  it('Should return an internal code error', () => {
    expect(internal_code).toBe('unauthorized_error');
  });
});

describe('POST /admin/users - Email is incorrect', () => {
  let message = null;
  let status = null;
  let internal_code = null;
  beforeAll(async () => {
    const result = await request(app)
      .post('/admin/users')
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

describe('POST /admin/users - Password without the complete length', () => {
  let message = null;
  let status = null;
  let internal_code = null;
  beforeAll(async () => {
    const result = await request(app)
      .post('/admin/users')
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

describe('POST /admin/users - Password is not alphanumeric', () => {
  let message = null;
  let status = null;
  let internal_code = null;
  beforeAll(async () => {
    const result = await request(app)
      .post('/admin/users')
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

describe('POST /admin/users - First name is missing', () => {
  let message = null;
  let status = null;
  let internal_code = null;
  beforeAll(async () => {
    const result = await request(app)
      .post('/admin/users')
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

describe('POST /admin/users - Last name is missing', () => {
  let message = null;
  let status = null;
  let internal_code = null;
  beforeAll(async () => {
    const result = await request(app)
      .post('/admin/users')
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

describe('POST /admin/users - Email is missing', () => {
  let message = null;
  let status = null;
  let internal_code = null;
  beforeAll(async () => {
    const result = await request(app)
      .post('/admin/users')
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

describe('POST /admin/users - Password is missing', () => {
  let message = null;
  let status = null;
  let internal_code = null;
  beforeAll(async () => {
    const result = await request(app)
      .post('/admin/users')
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
