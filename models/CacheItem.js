const mongoose = require('mongoose');
const config = require('../config');

const cacheItemSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: String,
}, { timestamps: true });

/**
 * Check that the maximum is not exceeded before saving
 */
cacheItemSchema.pre('save', (next) => {
  /* eslint-disable no-use-before-define */
  CacheItem.count()
    .then((numberOfItems) => {
      if (numberOfItems >= config.CACHE_SIZE_LIMIT) {
        // Delete the oldest item
        CacheItem.findOneAndRemove({}, {}, { sort: { created_at: 1 } })
          .then(() => next());
      }
    });
  /* eslint-enable no-use-before-define */
});

const CacheItem = mongoose.model('CacheItem', cacheItemSchema);

module.exports = CacheItem;
