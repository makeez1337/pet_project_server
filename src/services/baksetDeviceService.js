const { BasketDevice, Phone } = require('../models');
const { sequelize } = require('../db');

class BaksetDeviceService {
  async createBasketDevice(phoneId, basketId) {
    return BasketDevice.create({ phoneId, basketId });
  }

  async getByBasketId(basketId) {
    return BasketDevice.findAll({
      where: { basketId },
      include: [Phone],
      attributes: [
        'phone.id',
        [sequelize.fn('COUNT', 'phone.id'), 'count'],
        [sequelize.fn('SUM', sequelize.col('phone.price')), 'totalPrice'],
      ],
      group: ['phone.id'],
    });
  }
}

module.exports = {
  basketDeviceService: new BaksetDeviceService(),
};
