const { Router } = require('express');

const { basketDeviceController } = require('../controllers/basketDeviceController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = Router();

router.post('/', basketDeviceController.createBasketDevice);
router.post('/addItem', authMiddleware.checkAccessToken, basketDeviceController.addBasketDevice);

module.exports = {
  basketDeviceRouter: router,
};
