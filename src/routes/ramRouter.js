const { Router } = require('express');

const { ramController } = require('../controllers');

const router = Router();

router.get('/', ramController.getAll);
router.post('/', ramController.createRam);

module.exports = {
  ramRouter: router,
};
