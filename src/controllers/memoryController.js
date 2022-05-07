const { memoryService } = require('../services/memoryService');

class MemoryController {
  async createMemory(req, res, next) {
    const { memory } = req.body;

    const response = await memoryService.createMemory(memory);

    res.json(response);
  }

  async getAll(req, res, next) {
    const memory = await memoryService.getAll();

    res.json(memory);
  }
}

module.exports = {
  memoryController: new MemoryController(),
};
