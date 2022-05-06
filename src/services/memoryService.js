const { Memory } = require('../models');

class MemoryService {
  async createMemory(memory) {
    return Memory.create({ memory });
  }
}

module.exports = {
  memoryService: new MemoryService(),
};
