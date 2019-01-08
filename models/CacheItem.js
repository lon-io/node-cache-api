const mongoose = require('mongoose');

const cacheItemSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: String,
}, { timestamps: true });

const CacheItem = mongoose.model('CacheItem', cacheItemSchema);

module.exports = CacheItem;
