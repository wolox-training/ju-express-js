const weetsController = require('./controllers/weets');

const {
  signUpValidator,
  signInValidator,
  validateToken,
  usersGetAllValidator
} = require('./middlewares/validators/users');
const userController = require('./controllers/users');
const { healthCheck } = require('./controllers/healthCheck');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/weets', validateToken, weetsController.createWeet);
  app.post('/signup', signUpValidator, userController.signUp);
  app.post('/signin', signInValidator, userController.signIn);
  app.get('/users', [usersGetAllValidator, validateToken], userController.getUsers);
  app.post('/admin/users', [signUpValidator, validateToken], userController.signUpAdmin);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
