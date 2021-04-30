const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logger = require('../logger/index');
const errors = require('../errors');
const { secret } = require('../../config').common.session;
const { TOKEN_JWT_EXPIRES, USER_POSITIONS } = require('./constants');

exports.encryptText = async textToEncrypt => {
  try {
    logger.info(`utilities::encryptText::textToEncrypt::${textToEncrypt}`);
    const encryptedText = await bcrypt.hash(textToEncrypt, 15);

    return encryptedText;
  } catch (error) {
    logger.error(`utilities::encryptText::error::${error.message}`);
    throw errors.defaultError('Error trying to encrypt text');
  }
};

exports.compareEncryptText = async (textSentToCompare, textEncrypted) => {
  try {
    logger.info(`utilities::compareEncryptText::textSentTocompare::${textSentToCompare}`);
    logger.info(`utilities::compareEncryptText::textEncrypted::${textEncrypted}`);
    const isTheSameText = await bcrypt.compare(textSentToCompare, textEncrypted);

    return isTheSameText;
  } catch (error) {
    logger.error(`utilities::compareEncryptText::error::${error.message}`);
    throw errors.defaultError('Error trying to compare encrypted text');
  }
};

exports.generateToken = data => {
  try {
    logger.info(`utilities::generateToken::data::${JSON.stringify(data)}`);
    const token = jwt.sign(data, secret, { expiresIn: TOKEN_JWT_EXPIRES });

    return { token, expires: TOKEN_JWT_EXPIRES };
  } catch (error) {
    logger.error(`utilities::generateToken::error::${error.message}`);
    throw errors.defaultError('Error trying to generate token');
  }
};

exports.verifyToken = token => {
  try {
    logger.info(`utilities::verifyToken::token::${token}`);
    const tokenToVerify = token.split(' ')[1];
    const verifyToken = jwt.verify(tokenToVerify, secret);

    return verifyToken;
  } catch (error) {
    logger.error(`utilities::verifyToken::error::${error.message}`);
    throw errors.defaultError('Error trying to verifyToken token');
  }
};

exports.getPagingData = (data, limit, entityName) => {
  const { count, rows } = data;

  const totalPages = Math.ceil(count / limit);

  return { count, [entityName]: rows, totalPages };
};

exports.getUserPosition = score => {
  let position = null;
  if (score <= 5) position = USER_POSITIONS.DEVELOPER;
  else if (score <= 9) position = USER_POSITIONS.LEAD;
  else if (score <= 19) position = USER_POSITIONS.TL;
  else if (score <= 29) position = USER_POSITIONS.EM;
  else if (score <= 49) position = USER_POSITIONS.HEAD;
  else position = USER_POSITIONS.CEO;

  return position;
};
