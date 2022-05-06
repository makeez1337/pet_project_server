const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/instanse');

const Memory = sequelize.define('memory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  memory: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = {
  Memory,
};
