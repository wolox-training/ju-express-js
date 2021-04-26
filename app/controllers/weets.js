const quotesGardenService = require('../services/quotes_garden');
const weetService = require('../services/weets');
const logger = require('../logger/index');
const { weetMapper } = require('../mappers/weets');

const createWeet = async (req, res, next) => {
  try {
    const { token } = req;
    const { id } = token;
    const { quoteText } = await quotesGardenService.getRandomQuote();
    const weetData = weetMapper({ id, quoteText });

    const result = await weetService.createWeet(weetData);

    logger.info(`Weet ${result.content} created succesfully`);

    return res.status(201).send({ weet: result.content });
  } catch (error) {
    logger.error(`weets-controller::signUp::error::${error.message}`);
    return next(error);
  }
};

module.exports = { createWeet };
