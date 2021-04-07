const quotesGardenService = require('../services/qoutes_garden');

const createWeet = async (req, res, next) => {
  try {
    const response = await quotesGardenService.getRandomQuote();
    res.json({ weet: response.data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    createWeet
};