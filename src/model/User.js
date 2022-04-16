const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:5432/owu');

const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },

}, {
    sequelize,
    timestamps: true
});

User.sync();

module.exports = {
    User
};