const quotesGardenService = require('../services/quotes_garden');

const createWeet = async (req, res, next) => {
  try {
    const result = await quotesGardenService.getRandomQuote();
    res.json({ weet: result.data });
  } catch (error) {
    next(error);
  }
};

module.exports = { createWeet };
