const { Phone } = require('../models');

class PhoneService {
  async createPhone(details) {
    return Phone.create({ ...details });
  }

  async getAll() {
    return Phone.findAll();
  }

  async deleteById(id) {
    await Phone.destroy({ where: { id } });
  }

  async getPhonesPagination(limit, page, filterObj) {
    const isFilterObj = Object.keys(filterObj).length;

    if (isFilterObj) {
      return Phone.findAndCountAll({
        limit,
        offset: (page - 1) * limit,
        where: {
          ...filterObj,
        },
      });
    }

    return Phone.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
    });
  }
}

module.exports = {
  phoneService: new PhoneService(),
};
