const winston = require('winston');

winston.setLevels({
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
});
winston.config.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  debug: 'green'
});

module.exports = new winston.Logger({});
