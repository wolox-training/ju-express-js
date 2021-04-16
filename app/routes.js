const weetsController = require('./controllers/weets');

const { validator } = require('./middlewares/validators/users');
const userController = require('./controllers/users');
const { healthCheck } = require('./controllers/healthCheck');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/weet', [], weetsController.createWeet);
  app.post('/signup', validator, userController.signUp);
};
