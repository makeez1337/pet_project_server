const { Phone, Brand, Ram, Memory } = require('../models');
const { Op } = require('sequelize');

const { sequelize } = require('../db');

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

  async generateQueryFilter({ ramId, memoryId, brandId, gte, lte }) {
    const filterQuery = {};

    const response = await this.minAndMaxPrice();
    const { minPrice, maxPrice } = response[0];

    filterQuery.gte = Number(gte) || minPrice;
    filterQuery.lte = Number(lte) || maxPrice;

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

  async getById(id) {
    return Phone.findOne({ where: { id }, include: [Brand, Ram, Memory] });
  }

  async minAndMaxPrice() {
    return Phone.findAll({
      attributes: [
        [sequelize.fn('max', sequelize.col('price')), 'maxPrice'],
        [sequelize.fn('min', sequelize.col('price')), 'minPrice'],
      ],
      raw: true,
    });
  }

  async updateById(id, data) {
    return Phone.update(data, { where: { id: Number(id) } });
  }
}

module.exports = {
  phoneService: new PhoneService(),
};
