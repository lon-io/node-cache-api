const logger = require('morgan');
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

        res.send(cachedItem);
      } else {
        logger.log('Cache miss');
        const value = utils.generateRandomString();

        const cacheItem = new CacheItem({
          key,
          value,
        });

        cacheItem.save().then(() => {
          res.send(cacheItem);
        }).catch(err => next(err));
      }
    }).catch(err => next(err));
};
