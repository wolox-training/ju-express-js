const userService = require('../services/users');
const logger = require('../logger/index');
const utilities = require('../helpers/utilities');
const errors = require('../errors');
const { signUpMapper } = require('../mappers/users');
const { userObjectSerializer } = require('../serializers/users');
const { USER_ROLE } = require('../helpers/constants');

const getPagingData = (data, limit) => {
  const { count, rows: usersData } = data;

  const users = usersData.map(user => userObjectSerializer(user));
  const totalPages = Math.ceil(count / limit);

  return { count, users, totalPages };
};

const signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const userData = signUpMapper(body);

    const userByEmail = await userService.getUserByEmail(userData.email);

    if (userByEmail) {
      throw errors.conflictError('The user already exists');
    }

    userData.password = await utilities.encryptText(userData.password);
    userData.role = USER_ROLE.REGULAR;

    const result = await userService.createUser(userData);

    logger.info(`User ${result.firstName} created succesfully`);

    return res.status(201).send({ name: userData.firstName });
  } catch (error) {
    logger.error(`users-controller::signUp::error::${error.message}`);
    return next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);

    if (!user) {
      throw errors.unauthorizedError(`The user ${email} is wrong`);
    }

    const isTheSamePassword = await utilities.compareEncryptText(password, user.password);

    if (!isTheSamePassword) {
      throw errors.unauthorizedError('The password is wrong');
    }

    const userSerialized = userObjectSerializer(user);
    const { token, expires } = utilities.generateToken(userSerialized);

    logger.info(`user with email ${user.email} has logged in successfully`);

    return res.status(200).send({ token, expires });
  } catch (error) {
    logger.error(`users-controller::signIn::error::${error.message}`);
    return next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const { offset, limit } = req.query;
    let users = await userService.getUsers(limit, offset);
    users = getPagingData(users, limit);
    return res.status(200).send(users);
  } catch (error) {
    logger.error(`users-controller::getUsers::error::${error.message}`);
    return next(error);
  }
};

const signUpAdmin = async (req, res, next) => {
  try {
    const { body, token } = req;
    const userData = signUpMapper(body);

    if (token.role !== USER_ROLE.ADMIN) {
      throw errors.unauthorizedError('Only user admin can create admin user');
    }

    const userByEmail = await userService.getUserByEmail(userData.email);

    if (userByEmail && userByEmail.role === USER_ROLE.ADMIN) {
      throw errors.conflictError('The user admin already exists');
    }

    userData.password = await utilities.encryptText(userData.password);
    userData.role = USER_ROLE.ADMIN;

    const result = await userService.createUserAdmin(userData);

    logger.info(`User admin ${result.firstName} created succesfully`);

    return res.status(201).send({ name: userData.firstName });
  } catch (error) {
    logger.error(`users-controller::signUpAdmin::error::${error.message}`);
    return next(error);
  }
};

module.exports = {
  signUp,
  signIn,
  getUsers,
  signUpAdmin
};
