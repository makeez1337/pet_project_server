const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/instanse');
const { User } = require('./User');

const Basket = sequelize.define('basket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

User.hasOne(Basket, { foreignKey: 'userId', unique: true, onDelete: 'CASCADE' });
Basket.belongsTo(User);

module.exports = {
  Basket,
};
