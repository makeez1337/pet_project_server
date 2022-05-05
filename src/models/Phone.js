const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/instanse');
const { Brand } = require('./Brand');

const Phone = sequelize.define('phone', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  memory: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ram: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  camera: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  processor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brandId: {
    type: DataTypes.INTEGER,
    references: {
      model: Brand,
      key: 'id',
    },
  },
});

Brand.hasMany(Phone, { foreignKey: 'brandId', onDelete: 'CASCADE' });
Phone.belongsTo(Brand);

module.exports = {
  Phone,
};
