// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');

// Load environment variables
dotenv.load({ path: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env' });

// Controllers
const cacheController = require('./controllers/cache');

// Express server.
const app = express();

// Connect to MongoDB.
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.error('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// Config && Middleware
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Routes
app.get('/', (_, res) => res.send({}));
app.get('/cache/:key', cacheController.getItem);
app.post('/cache/:key', cacheController.setItem);
app.put('/cache/:key', cacheController.updateItem);
app.get('/cache/keys', cacheController.getKeys);
app.get('/cache/values', cacheController.getValues);
app.delete('/cache/:key', cacheController.deleteItem);
app.delete('/cache', cacheController.clearData);

// Error Handler
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
}

// Server bootstrap
app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
