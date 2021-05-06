const { Rating, sequelize } = require('../models');
const weetService = require('../services/weets');
const ratingWeetService = require('../services/ratingWeets');
// const userInteractor = require('./users');
const logger = require('../logger');
const errors = require('../errors');

const createRatingWeet = async ratingWeetData => {
  logger.info(
    `ratingWeets-interactor::createRatingWeet::ratingUserId::ratingWeetData::${JSON.stringify(
      ratingWeetData
    )}`
  );
  let transaction = {};
  let rateWeetResult = {};
  const { ratingUserId, weetId } = ratingWeetData;
  try {
    const weetDataSaved = await weetService.getWeetById(weetId);

    if (!weetDataSaved) {
      throw errors.conflictError('The weet does not exists');
    }

    const ratingWeetDataSaved = await ratingWeetService.getRatingWeetByRatingWeet(ratingWeetData);

    if (ratingWeetDataSaved) {
      throw errors.conflictError('The weetRating already exists');
    }

    // const { userId: weetUserId } = weetDataSaved;

    transaction = await sequelize.transaction();

    logger.info(
      `ratingWeets-interactor::createRatingWeet::upsert::ratingWeetData::${JSON.stringify(ratingWeetData)}`
    );

    // await userInteractor.updateUserPosition(weetId, weetUserId, transaction);

    try {
      rateWeetResult = await Rating.create(ratingWeetData, {
        transaction,
        returning: true,
        attributes: ['ratingUserId', 'weetId', 'score']
      });
    } catch (error) {
      const { id } = await ratingWeetService.getRatingWeetByRatingWeet({ ratingUserId, weetId });
      logger.info('acaaaaaaaaaa::error');
      rateWeetResult = await Rating.update(ratingWeetData, {
        where: { id },
        transaction,
        returning: true,
        attributes: ['ratingUserId', 'weetId', 'score']
      });
    }

    await transaction.commit();

    return rateWeetResult;
  } catch (error) {
    if (transaction.rollback) await transaction.rollback();
    logger.error(`ratingWeets-interactor::createRatingWeet::error::${error.message}`);
    throw error;
  }
};

module.exports = { createRatingWeet };
