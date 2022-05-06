const { Brand } = require('../models');

class BrandService {
  async createBrand(name) {
    return Brand.create({ name });
  }

  async getBrands() {
    return Brand.findAll();
  }
}

module.exports = {
  brandService: new BrandService(),
};
