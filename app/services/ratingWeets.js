const { Rating } = require('../models');
const logger = require('../logger');
const errors = require('../errors');

const getRatingWeetByRatingWeet = async ratingWeet => {
  try {
    logger.info(`ratingWeets-service::getRatingWeetByRatingWeet::ratingWeet::${JSON.stringify(ratingWeet)}`);
    const result = await Rating.findAll({
      where: ratingWeet,
      attributes: ['id', 'ratingUserId', 'weetId', 'score']
    });
    return result;
  } catch (error) {
    logger.error(`ratingWeets-service::getRatingWeetByRatingWeet::error::${error.message}`);
    throw errors.databaseError('Error getting rating weet into DB');
  }
};

module.exports = {
  getRatingWeetByRatingWeet
};
