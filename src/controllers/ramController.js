const { ramServices } = require('../services/ramServices');

class RamController {
  async createRam(req, res, next) {
    const { ram } = req.body;

    const response = await ramServices.createRam(ram);
    res.json(response);
  }
}

module.exports = {
  ramController: new RamController(),
};
