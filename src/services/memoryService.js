const { Memory } = require('../models');

class MemoryService {
  async createMemory(memory) {
    return Memory.create({ memory });
  }

  async getAll() {
    return  Memory.findAll();
  }
}

module.exports = {
  memoryService: new MemoryService(),
};
