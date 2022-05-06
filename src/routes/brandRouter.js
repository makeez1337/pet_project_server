const { Router } = require('express');

const { brandController } = require('../controllers/brandController');

const router = Router();

router.post('/', brandController.createBrand);

module.exports = {
  brandRouter: router,
};
