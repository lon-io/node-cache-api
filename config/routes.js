// Controllers
const cacheController = require('../controllers/cache');

// Export routing
module.exports = (app) => {
  app.get('/', (_, res) => res.status(200).send({}));
  app.get('/cache', cacheController.getAllItems);
  app.get('/cache/:key', cacheController.getItem);
  app.post('/cache/:key', cacheController.setItem);
  app.put('/cache/:key', cacheController.setItem);
  app.delete('/cache/:key', cacheController.deleteItem);
  app.delete('/cache', cacheController.clearData);
};
