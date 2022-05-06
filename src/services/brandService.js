const { Brand } = require('../models');

class BrandService {
  async createBrand(name) {
    return Brand.create({ name });
  }
}

module.exports = {
  brandService: new BrandService(),
};
