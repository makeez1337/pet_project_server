const { basketDeviceService } = require('../services/baksetDeviceService');

class BasketDeviceController {
  async createBasketDevice(req, res, next) {
    try {
      const { phoneId, basketId } = req.body;

      const basketDevice = await basketDeviceService.createBasketDevice(phoneId, basketId);
      res.json(basketDevice);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  basketDeviceController: new BasketDeviceController(),
};
