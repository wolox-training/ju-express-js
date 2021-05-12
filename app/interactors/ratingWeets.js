const { Rating, sequelize } = require('../models');
const weetService = require('../services/weets');
const ratingWeetService = require('../services/ratingWeets');
const userInteractor = require('./users');
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
  const { ratingUserId, weetId, score } = ratingWeetData;
  try {
    const weetDataSaved = await weetService.getWeetById(weetId);

    if (!weetDataSaved) {
      throw errors.conflictError('The weet does not exists');
    }

    const ratingWeetDataSaved = await ratingWeetService.getRatingWeetByRatingWeet(ratingWeetData);

    if (ratingWeetDataSaved) {
      throw errors.conflictError('The weetRating already exists');
    }

    transaction = await sequelize.transaction();

    logger.info(
      `ratingWeets-interactor::createRatingWeet::upsert::ratingWeetData::${JSON.stringify(ratingWeetData)}`
    );

    const ratingWeetToUpdate = await ratingWeetService.getRatingWeetByRatingWeet({ ratingUserId, weetId });

    if (ratingWeetToUpdate) {
      logger.info(
        `ratingWeets-interactor::updating rating weet::ratingWeetToUpdate::${JSON.stringify(
          ratingWeetToUpdate
        )}`
      );
      ratingWeetToUpdate.score = score;
      rateWeetResult = await ratingWeetToUpdate.save({ transaction });
    } else {
      logger.info(
        `ratingWeets-interactor::creating rating weet::ratingWeetData::${JSON.stringify(ratingWeetData)}`
      );
      rateWeetResult = await Rating.create(ratingWeetData, { transaction });
    }

    const { userId: weetUserId } = weetDataSaved;

    await userInteractor.updateUserPosition(weetId, weetUserId, transaction);

    await transaction.commit();

    return rateWeetResult;
  } catch (error) {
    if (transaction.rollback) await transaction.rollback();
    logger.error(`ratingWeets-interactor::createRatingWeet::error::${error.message}`);
    if (error.internalCode && error.internalCode === errors.CONFLICT_ERROR) {
      throw error;
    }
    throw errors.databaseError('Error creating rating weet into DB');
  }
};

module.exports = { createRatingWeet };
