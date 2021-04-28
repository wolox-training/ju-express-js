const quotesGardenService = require('../services/quotes_garden');
const weetService = require('../services/weets');
const logger = require('../logger/index');
const { weetMapper } = require('../mappers/weets');
const { weetObjectSerializer } = require('../serializers/weets');
const utilities = require('../helpers/utilities');

const createWeet = async (req, res, next) => {
  try {
    const { token } = req;
    const { id } = token;
    const quoteText = await quotesGardenService.getRandomQuote();
    const weetData = weetMapper({ id, quoteText });

    const result = await weetService.createWeet(weetData);

    logger.info(`Weet ${result.content} created succesfully`);

    return res.status(201).send({ weet: result.content });
  } catch (error) {
    logger.error(`weets-controller::createWeet::error::${error.message}`);
    return next(error);
  }
};

const getWeets = async (req, res, next) => {
  try {
    const { offset, limit } = req.query;
    const entityName = 'weets';
    let result = await weetService.getWeets(limit, offset);
    result = utilities.getPagingData(result, limit, entityName);
    let { weets } = result;
    weets = weets.map(weet => weetObjectSerializer(weet));
    result.weets = weets;

    return res.status(200).send(result);
  } catch (error) {
    logger.error(`weets-controller::getWeets::error::${error.message}`);
    return next(error);
  }
};

module.exports = { createWeet, getWeets };
