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

}

module.exports = {
  brandController: new BrandController(),
};
