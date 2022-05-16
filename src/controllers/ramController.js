const { ramServices } = require('../services');

class RamController {
  async createRam(req, res, next) {
    try {
      const { ram } = req.body;

      const response = await ramServices.createRam(ram);

      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const ram = await ramServices.getAll();

      res.json(ram);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  ramController: new RamController(),
};
