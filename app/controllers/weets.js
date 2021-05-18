const { CronJob } = require('cron');
const quotesGardenService = require('../services/quotes_garden');
const weetService = require('../services/weets');
const userService = require('../services/users');
const mailerService = require('../services/mailer');
const logger = require('../logger/index');
const { weetMapper } = require('../mappers/weets');
const { weetObjectSerializer } = require('../serializers/weets');
const utilities = require('../helpers/utilities');
const { CRON_TIME, TIME_ZONE } = require('../helpers/constants');

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

const sendCongratulationsEmail = async () => {
  try {
    logger.error('weets-controller::sendCongratulationsEmail::start job :)');
    const dailyWeets = await weetService.getWittererOfTheDay();
    if (!dailyWeets) return false;
    const witterer = await userService.getUserById(dailyWeets.user_id);
    if (!witterer) return false;
    const emailSended = await mailerService.sendCongratulationEmail(witterer.dataValues, dailyWeets);
    logger.error('weets-controller::sendCongratulationsEmail::emailSended::', JSON.stringify(emailSended));
    return emailSended;
  } catch (error) {
    logger.error(`weets-controller::sendCongratulationsEmail::error::${error.message}`);
    return error;
  }
};

const job = new CronJob(CRON_TIME, () => sendCongratulationsEmail(), null, true, TIME_ZONE);
job.start();

module.exports = { createWeet, getWeets, sendCongratulationsEmail };
