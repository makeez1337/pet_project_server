const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/instanse');

const Ram = sequelize.define('ram', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ram: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = {
  Ram,
};
