const { BasketDevice } = require('../models');

class BaksetDeviceService {
  async createBasketDevice(phoneId, basketId) {
    return BasketDevice.create({ phoneId, basketId });
  }
}

module.exports = {
  basketDeviceService: new BaksetDeviceService(),
};
