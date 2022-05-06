const { Ram } = require('../models');

class RamServices {
  async createRam(ram) {
    return Ram.create({ ram });
  }
}

module.exports = {
  ramServices: new RamServices(),
};
