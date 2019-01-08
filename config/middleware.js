const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const expressValidator = require('express-validator');
const logger = require('morgan');

// Export middleware
module.exports = (app) => {
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(expressValidator());
  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });

  // Error Handler
  if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorHandler());
  }
};
