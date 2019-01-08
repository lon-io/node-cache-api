const HttpStatus = require('http-status-codes');

const CacheItem = require('../models/CacheItem');
const logger = require('../libs/logger');
const utils = require('../libs/utils');

/**
 * GET /cache
 * Add a item in the cached
 */
exports.getAllItems = (req, res, next) => {
  CacheItem.find({})
    .then((items) => {
      res.status(HttpStatus.OK).json(items);
    }).catch(err => next(err));
};

/**
 * GET /cache/:key
 * get cached item
 */
exports.getItem = (req, res, next) => {
  const { key, } = req.params;

  CacheItem.findOne({ key, })
    .then((cachedItem) => {
      if (cachedItem) {
        logger.info('Cache hit');

        // Generate a random value if item is expired
        if (utils.isItemExpired(cachedItem)) {
          cachedItem.value = utils.generateRandomString();
        }

        // Silently save (also Implicitly resets the expiry - see 'save' hook)
        cachedItem.save();

        return res.status(HttpStatus.OK).json(cachedItem);
      }

      logger.info('Cache miss');
      const value = utils.generateRandomString();

      const cacheItem = new CacheItem({
        key,
        value,
      });

      cacheItem.save()
        .then(() => res.status(HttpStatus.CREATED).json(cacheItem)).catch(err => next(err));
    }).catch(err => next(err));
};

/**
 * POST /cache/:key { value }
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
  const { value, ttl, } = req.body;

  CacheItem.findOne({ key, })
    .then((cachedItem) => {
      if (cachedItem) {
        cachedItem.value = value;
        res.status(HttpStatus.OK).json(cachedItem);
      } else {
        const cacheItem = new CacheItem({
          key,
          value,
          ttl,
        });

        cacheItem.save()
          .then(() => {
            res.json(cacheItem);
          }).catch(err => next(err));
      }
    }).catch(err => next(err));
};

/**
 * DELETE /cache/:key
 * Delete an item from the cache
 */
exports.deleteItem = (req, res, next) => {
  const { key, } = req.params;

  CacheItem.remove({ key, })
    .then(() => {
      res.status(HttpStatus.OK).end();
    }).catch(err => next(err));
};

/**
 * DELETE /cache
 * Clean all items from the cache
 */
exports.clearData = (req, res, next) => {
  CacheItem.remove({})
    .then(() => {
      res.status(HttpStatus.OK).end();
    }).catch(err => next(err));
};
