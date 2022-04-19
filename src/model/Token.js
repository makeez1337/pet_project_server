const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/instanse');
const { User } = require('./User');

const Token = sequelize.define('Token', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

User.hasOne(Token, { as: 'tokenPair', foreignKey: 'userId' });

module.exports = {
  Token,
};
