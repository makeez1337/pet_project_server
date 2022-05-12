const { Basket } = require('../models');

class BasketService {
  async createBasket(userId) {
    return Basket.create({ userId });
  }

  async findByUserId(userId) {
    return Basket.findOne({ where: { userId } });
  }
}

module.exports = {
  basketService: new BasketService(),
};
