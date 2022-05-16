const { sequelize } = require('../db');

const { BasketDevice, Phone } = require('../models');

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

  async deleteAllByBasketId(basketId) {
    return BasketDevice.destroy({ where: { basketId } });
  }
}

module.exports = {
  basketDeviceService: new BasketDeviceService(),
};
