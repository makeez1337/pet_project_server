const { Phone } = require('../models');

const { Op } = require('sequelize');

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

    if (!isFilterObj) {
      return Phone.findAndCountAll({
        limit,
        offset: (page - 1) * limit,
      });
    }

    const { gte, lte, ...newFilterObj } = filterObj;
    return Phone.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      where: {
        ...newFilterObj,
        price: {
          [Op.gte]: gte,
          [Op.lte]: lte,
        },
      },
    });
  }

  generateQueryFilter({ ramId, memoryId, brandId, gte, lte }) {
    const filterQuery = {};

    filterQuery.gte = Number(gte) || 0;
    filterQuery.lte = Number(lte) || 45999;

    if (ramId) {
      filterQuery.ramId = ramId.split(',');
    }

    if (memoryId) {
      filterQuery.memoryId = memoryId.split(',');
    }

    if (brandId) {
      filterQuery.brandId = brandId.split(',');
    }

    return filterQuery;
  }
}

module.exports = {
  phoneService: new PhoneService(),
};
