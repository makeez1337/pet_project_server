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
    const isFilterObj = Object.keys({ ...filterObj }).length;

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

  generateQueryFilter({ ramId, memoryId, brandId }) {
    const filterQuery = {};
    
    if (ramId) {
      filterQuery.ramId = ramId;
    }

    if (memoryId) {
      filterQuery.memoryId = memoryId;
    }

    if (brandId) {
      filterQuery.brandId = brandId;
    }
    
    return filterQuery;
  }
}

module.exports = {
  phoneService: new PhoneService(),
};
