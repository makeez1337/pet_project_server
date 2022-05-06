const { Router } = require('express');
const { ramController } = require('../controllers/ramController');

const router = Router();

router.post('/', ramController.createRam);

module.exports = {
  ramRouter: router,
};
