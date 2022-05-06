const { Router } = require('express');

const { brandController } = require('../controllers/brandController');

const router = Router();

router.get('/', brandController.getBrands)
router.post('/', brandController.createBrand);

module.exports = {
  brandRouter: router,
};
