// Controllers
const cacheController = require('../controllers/cache');

// Export routing
module.exports = (app) => {
  app.get('/', (_, res) => res.send({}));
  app.get('/cache/:key', cacheController.getItem);
  app.post('/cache/:key', cacheController.setItem);
  app.put('/cache/:key', cacheController.setItem);
  app.get('/cache/keys', cacheController.getKeys);
  app.get('/cache/values', cacheController.getValues);
  app.delete('/cache/:key', cacheController.deleteItem);
  app.delete('/cache', cacheController.clearData);
};
