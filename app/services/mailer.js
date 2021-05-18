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
    logger.info('hola::', process.env.MAILER_USER, '   uffff', process.env.MAILER_PASSWORD);
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

module.exports = {
  sendWelcomeEmail
};
