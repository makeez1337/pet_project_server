const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/instanse');
const { Basket } = require('./Basket');
const { Phone } = require('./Phone');

const BasketDevice = sequelize.define('basketDevice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phoneId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Phone,
      key: 'id',
    },
  },
  basketId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Basket,
      key: 'id',
    },
  },
});

Basket.hasMany(BasketDevice, { foreignKey: 'basketId', onDelete: 'CASCADE' });
BasketDevice.belongsTo(Basket);

Phone.hasOne(BasketDevice, { foreignKey: 'phoneId', onDelete: 'CASCADE' });
BasketDevice.belongsTo(Phone);

module.exports = {
  BasketDevice,
};
