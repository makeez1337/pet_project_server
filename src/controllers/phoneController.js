const { phoneService } = require('../services/phoneService');
const { ErrorHandler } = require('../error');

class PhoneController {
  async createPhone(req, res, next) {
    try {
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
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      let { limit, page } = req.query;
      limit = limit || 6;
      page = page || 1;

      const filterQuery = await phoneService.generateQueryFilter(req.query);

      const { rows, count } = await phoneService.getPhonesPagination(limit, page, { ...filterQuery });
      const perPage = rows.length;
      const totalPages = Math.ceil(count / limit);

      res.json({
        page: Number(page),
        perPage,
        count,
        rows,
        totalPages,
      });
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

  async getById(req, res, next) {
    try {
      const { id } = req.params;

      const phone = await phoneService.getById(id);
      res.json(phone);
    } catch (e) {
      next(e);
    }
  }

  async minAndMaxPrice(req, res, next) {
    try {
      const response = await phoneService.minAndMaxPrice();

      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async updateById(req, res, next) {
    try {
      const { id } = req.params;

      let data = req.body;
      if (req.file) {
        data = { ...req.body, img: req.file.path };
        console.log(data);
      }

      const updatedPhone = await phoneService.updateById(id, data);
      res.json(updatedPhone);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  phoneController: new PhoneController(),
};
