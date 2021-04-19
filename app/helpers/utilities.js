const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logger = require('../logger/index');
const errors = require('../errors');
const { secret } = require('../../config').common.session;
const { TOKEN_JWT_EXPIRES } = require('./constants');

exports.encryptText = async textToEncrypt => {
  try {
    logger.info(`utilities::encryptText::textToEncrypt::${textToEncrypt}`);
    const encryptedText = await bcrypt.hash(textToEncrypt, 15);

    return encryptedText;
  } catch (error) {
    logger.error(error);
    throw errors.defaultError('Error trying to encrypt text');
  }
};

exports.compareEncryptText = async (textSentTocompare, textEncrypted) => {
  try {
    logger.info(`utilities::compareEncryptText::textSentTocompare::${textSentTocompare}`);
    logger.info(`utilities::compareEncryptText::textEncrypted::${textEncrypted}`);
    const isThesameText = await bcrypt.compare(textSentTocompare, textEncrypted);

    return isThesameText;
  } catch (error) {
    logger.error(error);
    throw errors.defaultError('Error trying to compare encrypted text');
  }
};

exports.generateToken = data => {
  try {
    logger.info(`utilities::generateToken::data::${data}`);
    const token = jwt.sign(data, secret, { expiresIn: TOKEN_JWT_EXPIRES });

    return { token, expires: TOKEN_JWT_EXPIRES };
  } catch (error) {
    logger.error(error);
    throw errors.defaultError('Error trying to generate token');
  }
};
