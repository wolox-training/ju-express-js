const { healthCheck } = require('./controllers/healthCheck');
const userController = require('./controllers/users');
const weetsController = require('./controllers/weets');
const ratingWeetsController = require('./controllers//ratingWeets');

const {
  signUpValidator,
  signInValidator,
  validateToken,
  usersGetAllValidator
} = require('./middlewares/validators/users');
const { weetsGetAllValidator } = require('./middlewares/validators/weets');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/weets', validateToken, weetsController.createWeet);
  app.get('/weets', [weetsGetAllValidator, validateToken], weetsController.getWeets);
  app.post('/signup', signUpValidator, userController.signUp);
  app.post('/signin', signInValidator, userController.signIn);
  app.get('/users', [usersGetAllValidator, validateToken], userController.getUsers);
  app.post('/admin/users', [signUpValidator, validateToken], userController.signUpAdmin);
  app.post('/weets/:id/ratings', [validateToken], ratingWeetsController.createRatingWeet);
};
