const weetsController = require('./controllers/weets');

const { signUpValidator, signInValidator } = require('./middlewares/validators/users');
const userController = require('./controllers/users');
const { healthCheck } = require('./controllers/healthCheck');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/weet', [], weetsController.createWeet);
  app.post('/signup', signUpValidator, userController.signUp);
  app.post('/signin', signInValidator, userController.signIn);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
