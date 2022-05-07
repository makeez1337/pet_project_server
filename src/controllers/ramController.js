const { ramServices } = require('../services/ramServices');
const { memoryController } = require('./memoryController');
const { memoryService } = require('../services/memoryService');

class RamController {
  async createRam(req, res, next) {
    const { ram } = req.body;

    const response = await ramServices.createRam(ram);
    res.json(response);
  }

  async getAll(req, res, next) {
    const memory = await memoryService.getAll();

    res.json(memory);
  }
}

module.exports = {
  ramController: new RamController(),
};
