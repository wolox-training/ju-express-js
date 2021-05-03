const { Rating, User, sequelize } = require('../models');
const logger = require('../logger');
const errors = require('../errors');
const utilities = require('../helpers/utilities');

const createRatingWeet = async (ragintgWeetData, weetUserId) => {
  let transaction = {};
  let rateWeetResult = {};
  const { ratingUserId, weetId, score } = ragintgWeetData;
  try {
    transaction = await sequelize.transaction();

    logger.info(
      `ratingWeets-interactor::getting rating weet to update::ratingUserId::${ratingUserId}::weetId::${weetId}`
    );
    const ratingWeetToUpdate = await Rating.findOne({
      where: { ratingUserId, weetId },
      attributes: ['id', 'ratingUserId', 'weetId', 'score']
    });

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
        `ratingWeets-interactor::creating rating weet::ragintgWeetData::${JSON.stringify(ragintgWeetData)}`
      );
      rateWeetResult = await Rating.create(ragintgWeetData, { transaction });
    }

    logger.info(`ratingWeets-interactor::getting user data to update position::weetUserId::${weetUserId}`);
    const userData = await User.findOne({ where: { id: weetUserId } });

    const weetTotalScore = await Rating.sum('score', { where: { weetId }, transaction });
    logger.info(`ratingWeets-interactor::weetTotalScore::${weetTotalScore}`);
    const position = utilities.getUserPosition(weetTotalScore);

    logger.info(`ratingWeets-interactor::weetUserId::${weetUserId}::position::${position}`);
    userData.position = position;
    await userData.save({ transaction });

    await transaction.commit();

    return rateWeetResult;
  } catch (error) {
    if (transaction.rollback) await transaction.rollback();
    logger.error(error);
    throw errors.databaseError('Error creating rating weet into DB');
  }
};

module.exports = { createRatingWeet };
