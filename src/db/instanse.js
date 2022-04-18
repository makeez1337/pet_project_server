const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('owu', 'postgres', null, {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
