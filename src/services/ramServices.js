const { Ram } = require('../models');

class RamServices {
  createRam(ram) {
    return Ram.create({ ram });
  }

  getAll() {
    return Ram.findAll();
  }
}

module.exports = {
  ramServices: new RamServices(),
};
