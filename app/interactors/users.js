const { User } = require('../models');
const ratingWeetService = require('../services/ratingWeets');
const logger = require('../logger');
const errors = require('../errors');
const { USER_POSITIONS } = require('../helpers/constants');

const getUserPosition = score => {
  let position = null;
  if (score <= 5) position = USER_POSITIONS.DEVELOPER;
  else if (score <= 9) position = USER_POSITIONS.LEAD;
  else if (score <= 19) position = USER_POSITIONS.TL;
  else if (score <= 29) position = USER_POSITIONS.EM;
  else if (score <= 49) position = USER_POSITIONS.HEAD;
  else position = USER_POSITIONS.CEO;

  return position;
};

const updateUserPosition = async (weetId, weetUserId, transaction) => {
  try {
    logger.info(
      `users-interactor::updateUserPosition::getting user data to update position::weetUserId::${weetUserId}`
    );
    const userData = await User.findOne({ where: { id: weetUserId } });

    const weetTotalScore = await ratingWeetService.getTotalScoreByWeet(weetId, transaction);
    logger.info(`users-interactor::updateUserPosition::weetTotalScore::${weetTotalScore}`);
    const position = getUserPosition(weetTotalScore);

    logger.info(`users-interactor::updateUserPosition::weetUserId::${weetUserId}::position::${position}`);
    userData.position = position;
    await userData.save({ transaction });
  } catch (error) {
    logger.error(`users-interactor::updateUserPosition::error::${error.message}`);
    throw errors.databaseError('Error updating position DB', error.message);
  }
};

module.exports = {
  updateUserPosition
};
