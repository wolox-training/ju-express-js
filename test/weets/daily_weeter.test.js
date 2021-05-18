jest.mock('cron');
const { CronJob } = require('cron');
const request = require('supertest');
const app = require('../../app');
const { userData, userDataAuthorized } = require('../users/data/users');
const { sendCongratulationsEmail } = require('../../app/controllers/weets');

describe('POST /weets user register weet into database', () => {
  let token = null;
  let emailSended = {};
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

    emailSended = await sendCongratulationsEmail();
  }, 15000);

  it('The cron task was created with correct params.', () => {
    expect(CronJob).toBeCalledWith('59 59 23 * * *', expect.any(Function), null, true, 'America/Bogota');
  });

  it('An email have to be sent to the most user witterer of the day.', () => {
    expect(emailSended.accepted).toContain(userData.email);
  });
});
