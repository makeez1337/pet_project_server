const { Brand } = require('../models');

class BrandService {
  async createBrand(name) {
    return Brand.create({ name });
  }

  async getBrands() {
    return Brand.findAll();
  }

  async deleteBrandById(id) {
    await Brand.destroy({ where: { id } })
  }
}

module.exports = {
  brandService: new BrandService(),
};
