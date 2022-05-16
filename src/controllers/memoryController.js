const { memoryService } = require('../services/memoryService');

class MemoryController {
  async createMemory(req, res, next) {
    try {
      const { memory } = req.body;

      const response = await memoryService.createMemory(memory);

      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const memory = await memoryService.getAll();

      res.json(memory);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  memoryController: new MemoryController(),
};
