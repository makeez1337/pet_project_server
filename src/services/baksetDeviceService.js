const { BasketDevice } = require('../models');

class BaksetDeviceService {
  createBasketDevice(phoneId, basketId) {
    return BasketDevice.create({ phoneId, basketId });
  }
}

module.exports = {
  basketDeviceService: new BaksetDeviceService(),
};
