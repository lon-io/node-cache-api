const logger = require('morgan');
const HttpStatus = require('http-status-codes');
const CacheItem = require('../models/CacheItem');
const utils = require('../libs/utils');

/**
 * GET /cache
 * get cached item
 */
exports.getItem = (req, res, next) => {
  const { key, } = req.params;

  CacheItem.findOne({ key, })
    .then((cachedItem) => {
      if (cachedItem) {
        logger.log('Cache hit');

        res.status(HttpStatus.OK).send(cachedItem);
      } else {
        logger.log('Cache miss');
        const value = utils.generateRandomString();

        const cacheItem = new CacheItem({
          key,
          value,
        });

        cacheItem.save()
          .then(() => {
            res.status(HttpStatus.CREATED).send(cacheItem);
          }).catch(err => next(err));
      }
    }).catch(err => next(err));
};

/**
 * POST /cache
 * Add a item in the cached
 */
exports.setItem = (req, res, next) => {
  req.assert('value', 'Error - value - cannot be blank').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    logger.error(errors);

    res.status(HttpStatus.BAD_REQUEST).json(errors);
  }

  const { key, } = req.params;
  const { value, } = req.body;

  CacheItem.findOne({ key, })
    .then((cachedItem) => {
      if (cachedItem) {
        cachedItem.value = value;
        res.status(HttpStatus.OK).send(cachedItem);
      } else {
        const cacheItem = new CacheItem({
          key,
          value,
        });

        cacheItem.save()
          .then(() => {
            res.send(cacheItem);
          }).catch(err => next(err));
      }
    }).catch(err => next(err));
};
