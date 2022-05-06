const { phoneService } = require('../services/phoneService');

class PhoneController {
  async createPhone(req, res, next) {
    const { name, description, memory, ram, processor, camera, price, img, brandId } = req.body;

    const phone = await phoneService.createPhone({
      name,
      description,
      memory,
      ram,
      processor,
      camera,
      price,
      img,
      brandId,
    });
    res.json(phone);
  }

  async getAll(req, res, next) {
    try {
      const phones = await phoneService.getAll();
      res.json(phones);
    } catch (e) {
      next(e);
    }
  }

  async deleteById(req, res, next) {
    try {
      const { id } = req.body;

      await phoneService.deleteById(id);
      res.json('OK');
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  phoneController: new PhoneController(),
};
