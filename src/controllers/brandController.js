const { brandService } = require('../services/brandService');

class BrandController {
  async createBrand(req, res, next) {
    try {
      const { name } = req.body;

      const brand = await brandService.createBrand(name);
      res.json(brand);
    } catch (e) {
      next(e);
    }
  }

  async getBrands(req, res, next) {
    try {
      const brands = await brandService.getBrands();

      res.json(brands);
    } catch (e) {
      next(e);
    }
  }

  async deleteBrandById(req, res, next) {
    try {
      const { id } = req.body;

      await brandService.deleteBrandById(id);
      res.json('OK');
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  brandController: new BrandController(),
};
