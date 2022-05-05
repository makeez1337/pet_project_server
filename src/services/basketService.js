const { Basket } = require('../models');

class BasketService {
  async createBasket(userId) {
    return Basket.create({ userId });
  }
}

module.exports = {
  basketService: new BasketService(),
};
