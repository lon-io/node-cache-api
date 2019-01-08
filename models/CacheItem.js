const mongoose = require('mongoose');
const config = require('../config');
const utils = require('../libs/utils');

const cacheItemSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: String,
  ttl: { type: Number, default: config.DEFAULT_TTL },
  expires: { type: Number, default: utils.getExpiryTimestamp(config.DEFAULT_TTL) },
}, { timestamps: true });

/**
 * Check that the maximum is not exceeded before saving
 */
cacheItemSchema.pre('save', function save(next) {
  const item = this;

  // Set the expiry timestamp
  if (item.ttl) item.expires = utils.getExpiryTimestamp(item.ttl);

  /* eslint-disable no-use-before-define */
  CacheItem.count()
    .then((numberOfItems) => {
      if (numberOfItems >= config.CACHE_SIZE_LIMIT) {
        // Delete the oldest item
        CacheItem.findOneAndRemove({}, {}, { sort: { created_at: 1 } })
          .then(() => next());
      } else next();
    });
  /* eslint-enable no-use-before-define */
});

const CacheItem = mongoose.model('CacheItem', cacheItemSchema);

module.exports = CacheItem;
