const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/instanse');

const Brand = sequelize.define('brand', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  Brand,
};
