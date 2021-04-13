const bcrypt = require('bcrypt');

const logger = require('../logger/index');
const errors = require('../errors');

exports.encryptText = async textToEncrypt => {
  try {
    logger.info(`utilities::encryptText::textToEncrypt::${textToEncrypt}`);
    const encryptedText = await bcrypt.hash(textToEncrypt, 15);

    return encryptedText;
  } catch (error) {
    logger.error(error);
    throw errors.defaultError('Error trying to encrypt password');
  }
};
