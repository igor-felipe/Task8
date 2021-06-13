const {
  findAndCount,
  findAndList,
  findById

} = require('../controllers/microdadoController');

module.exports = (express) => {
  const router = express.Router();

  router.get('/findAndCount', findAndCount);

  router.get('/findAndList', findAndList);

  router.get('/:_id', findById);

  return router;
};
