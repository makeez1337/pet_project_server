const { phoneService } = require('../services/phoneService');
const { ErrorHandler } = require('../error/errorHandler');

class PhoneController {
  async createPhone(req, res, next) {
    const { name, description, memoryId, ramId, processor, camera, price, brandId } = req.body;

    if (!req.file) {
      next(new ErrorHandler('You have to download the image'));
      return;
    }

    const imagePath = req.file.path;

    const phone = await phoneService.createPhone({
      name,
      description,
      memoryId,
      ramId,
      processor,
      camera,
      price,
      img: imagePath,
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

  async getPhonesPagination(req, res, next) {
    try {
      const { limit, page, ...filterObj } = req.body;

      const { count, rows } = await phoneService.getPhonesPagination(limit, page, filterObj);
      res.json({
        page,
        perPage: limit,
        count,
        rows,
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  phoneController: new PhoneController(),
};
