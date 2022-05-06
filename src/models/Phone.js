const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/instanse');
const { Brand } = require('./Brand');
const { Memory } = require('./Memory');
const { Ram } = require('./Ram');

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
  memoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Memory,
      key: 'id',
    },
  },
  ramId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ram,
      key: 'id',
    },
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

Memory.hasMany(Phone, { foreignKey: 'memoryId', onDelete: 'CASCADE' });
Phone.belongsTo(Memory);

Ram.hasMany(Phone, { foreignKey: 'ramId', onDelete: 'CASCADE' });
Phone.belongsTo(Ram);

module.exports = {
  Phone,
};
