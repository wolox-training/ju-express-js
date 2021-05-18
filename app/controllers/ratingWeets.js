const ratingWeetInteractor = require('../interactors/ratingWeets');
const logger = require('../logger/index');
const { ratingWeetMapper } = require('../mappers/ratingWeets');
const { ratingWeetObjectSerializer } = require('../serializers/ratingWeets');

const createRatingWeet = async (req, res, next) => {
  try {
    const { id: weet_id } = req.params;
    const { id: rating_user_id } = req.token;
    const { score } = req.body;

    const ratingWeetData = ratingWeetMapper({ rating_user_id, weet_id, score });

    logger.info(
      `ratingWeets-controller::createRatingWeet::ratingWeetData::${JSON.stringify(ratingWeetData)}`
    );

    const ratingWeetSaved = await ratingWeetInteractor.createRatingWeet(ratingWeetData);
    const ratingViewSerialized = ratingWeetObjectSerializer(ratingWeetSaved);

    logger.info(`Rating weet ${JSON.stringify(ratingWeetData)} created succesfully`);

    return res.status(201).send({ rating: ratingViewSerialized });
  } catch (error) {
    logger.error(`ratingWeets-controller::createRatingWeet::error::${error.message}`);
    return next(error);
  }
};

module.exports = { createRatingWeet };
