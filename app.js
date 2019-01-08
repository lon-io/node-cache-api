// Dependencies
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.load({ path: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env' });

// Express server.
const app = express();

console.log('>>>', process.env.MONGODB_URI);
console.log('>>>', process.env.MONGODB_URI);
console.log('>>>', process.env.MONGODB_URI);
console.log('>>>', process.env.MONGODB_URI);

// Connect to MongoDB.
mongoose.connect('mongodb://localhost:27017/nodecacheapi', { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.error('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// Config
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

// Middleware
require('./config/middleware')(app);

// Routing
require('./config/routes')(app);

// Server bootstrap
app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
