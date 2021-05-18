const { Op } = require('sequelize');
const { moment } = require('../../config/moment');
const { Weet, sequelize } = require('../models');
const logger = require('../logger');
const errors = require('../errors');
const { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../helpers/constants');

const createWeet = async weetData => {
  try {
    logger.info(`weets-service::createWeet::weetData::${JSON.stringify(weetData)}`);
    const result = await Weet.create(weetData);
    return result;
  } catch (error) {
    logger.error(`weets-service::createWeet::error::${error.message}`);
    throw errors.databaseError('Error creating weet into DB');
  }
};

const getWeets = async (limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET) => {
  try {
    logger.info(`weets-service::getWeets::limit::${limit}::offset::${offset}`);
    const response = await Weet.findAndCountAll({
      offset,
      limit,
      attributes: ['id', 'userId', 'content']
    });
    return response;
  } catch (error) {
    logger.error(`weets-service::getWeets::error::${error.message}`);
    throw errors.databaseError('Error trying to get weet data from the DB');
  }
};

const getWeetById = async id => {
  try {
    logger.info(`weets-service::getWeetById::id::${id}`);
    const result = await Weet.findOne({ where: { id } });
    return result;
  } catch (error) {
    logger.error(`weets-service::getWeetById::error::${error.message}`);
    throw errors.databaseError('Error getting weet by id into DB');
  }
};

const getWittererOfTheDay = async () => {
  const startDate = moment()
    .set({
      hour: '00',
      minute: '00',
      second: '00'
    })
    .format();
  const endDate = moment()
    .set({
      hour: '23',
      minute: '59',
      second: '59'
    })
    .format();
  logger.error(`weets-service::getWittererOfTheDay::startDate::${startDate}`);
  logger.error(`weets-service::getWittererOfTheDay::endDate::${endDate}`);
  const maxWitterer = await Weet.findOne({
    attributes: ['user_id', [sequelize.fn('COUNT', sequelize.col('id')), 'weets_quantity']],
    group: ['user_id'],
    where: {
      created_at: {
        [Op.between]: [startDate, endDate]
      }
    },
    order: [[sequelize.literal('weets_quantity'), 'DESC']]
  }).catch(error => {
    logger.error(`weets-service::getWittererOfTheDay::error::${error.message}`);
    throw errors.databaseError(error.message);
  });
  if (!maxWitterer) return false;
  return {
    ...maxWitterer.dataValues,
    startDate,
    endDate
  };
};

module.exports = {
  createWeet,
  getWeets,
  getWeetById,
  getWittererOfTheDay
};
