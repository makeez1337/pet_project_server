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

Basket.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Basket);

module.exports = {
  Basket,
};
