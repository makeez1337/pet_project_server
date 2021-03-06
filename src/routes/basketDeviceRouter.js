const { Router } = require('express');

const { basketDeviceController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const router = Router();

router.get('/:userId', basketDeviceController.getByUserId);
router.post('/', basketDeviceController.createBasketDevice);
router.post('/addItem', authMiddleware.checkAccessToken, basketDeviceController.addBasketDevice);
router.post('/confirmPurchase', authMiddleware.checkAccessToken, basketDeviceController.confirmPurchase);
router.delete('/', authMiddleware.checkAccessToken, basketDeviceController.deleteOneByParams);
router.delete('/all', basketDeviceController.deleteAllByBasketId);

module.exports = {
  basketDeviceRouter: router,
};
