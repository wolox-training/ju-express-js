const userController = require('./controllers/users');
const weetsController = require('./controllers/weets');
const {
  signUpValidator,
  signInValidator,
  validateToken,
  usersGetAllValidator
} = require('./middlewares/validators/users');
const { weetsGetAllValidator } = require('./middlewares/validators/weets');

exports.init = app => {
  app.post('/weet', validateToken, weetsController.createWeet);
  app.get('/weets', [weetsGetAllValidator, validateToken], weetsController.getWeets);
  app.post('/signup', signUpValidator, userController.signUp);
  app.post('/signin', signInValidator, userController.signIn);
  app.get('/users', [usersGetAllValidator, validateToken], userController.getUsers);
  app.post('/admin/users', [signUpValidator, validateToken], userController.signUpAdmin);
};
