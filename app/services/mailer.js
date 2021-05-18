const fs = require('fs');
const path = require('path');
const mailer = require('nodemailer');
const handlebars = require('handlebars');

const constants = require('../helpers/constants');
const logger = require('../logger');
const errors = require('../errors');
const { EMAIL_SENDER } = require('../helpers/constants');

const welcomeMessage = (firstName, lastName, email, html) => ({
  from: `Weet APP <${EMAIL_SENDER}>`,
  to: email,
  subject: 'Welcome to Weet',
  text: `Welcome ${firstName} ${lastName}, thanks for joining us.`,
  html
});

const transporterConfig = () => ({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
  }
});

const sendWelcomeEmail = async userData => {
  try {
    logger.info(`mailer-service::sendWelcomeEmail::userData::${JSON.stringify(userData)}`);
    const { firstName, lastName, email } = userData;
    const transporter = mailer.createTransport(transporterConfig());
    const emailData = await fs.promises.readFile(
      path.join(__dirname, `../templates/${constants.TEMPLATES.WELCOME}`),
      'utf8'
    );
    const template = handlebars.compile(emailData);
    const html = template({ firstName, lastName });
    await transporter.sendMail(welcomeMessage(firstName, lastName, email, html));
  } catch (error) {
    logger.error(`mailer-service::sendWelcomeEmail::error::${error.message}`);
    throw errors.failedDependencyError('Error sending the welcome email');
  }
};

const dailyMailOptions = (userData, html, weets) => {
  const { firstName, lastName, email } = userData;
  return {
    from: `Weet APP <${EMAIL_SENDER}>`,
    to: email,
    subject: 'Congratulations!',
    text: `Congratulations ${firstName} ${lastName}! You are the most Witterer of the day with ${weets} Weets.`,
    html
  };
};

const sendCongratulationEmail = async (userData, dailyWeets) => {
  try {
    logger.info(
      `mailer-service::sendCongratulationEmail::userData::${JSON.stringify(
        userData
      )}::dailyWeets::${JSON.stringify(dailyWeets)}`
    );
    const { firstName, lastName } = userData;
    const { weets_quantity: weets } = dailyWeets;
    const transporter = mailer.createTransport(transporterConfig());
    const emailData = await fs.promises.readFile(
      path.join(__dirname, `../templates/${constants.TEMPLATES.CONGRATULATIONS}`),
      'utf8'
    );
    const template = handlebars.compile(emailData);
    const html = template({ firstName, lastName, weets });
    const result = await transporter.sendMail(dailyMailOptions(userData, html, weets));
    return result;
  } catch (error) {
    logger.error(`mailer-service::sendCongratulationEmail::error::${error.message}`);
    throw errors.failedDependencyError('Error sending the congratulations email');
  }
};

module.exports = {
  sendWelcomeEmail,
  sendCongratulationEmail
};
