const { Router } = require('express');
const { basketDeviceController } = require('../controllers/basketDeviceController');

const router = Router();

router.post('/', basketDeviceController.createBasketDevice);

module.exports = {
  basketDeviceRouter: router,
};
