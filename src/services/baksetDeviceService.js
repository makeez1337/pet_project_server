const { BasketDevice, Phone } = require('../models');
const { sequelize } = require('../db');

class BasketDeviceService {
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
      raw: true,
    });
  }

  async deleteOneByParams(phoneId, basketId) {
    return BasketDevice.destroy({ where: { phoneId, basketId }, limit: 1 });
  }
}

module.exports = {
  basketDeviceService: new BasketDeviceService(),
};
