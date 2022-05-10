const bcrypt = require('bcrypt');

const { User } = require('../models');
const { constants } = require('../constants/constants');
const { ErrorHandler } = require('../error/errorHandler');

class UserService {
  async findAllUsers() {
    return User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
  }

  async createUser(fields) {
    const { firstName, lastName, email, password, role, age } = fields;

    const hashedPassword = await this.hashPassword(password);

    return User.create({ firstName, lastName, email, password: hashedPassword, role, age });
  }

  async deleteById(id) {
    await User.destroy({ where: { id } });
  }

  async updateUserById(id, fields) {
    return User.update({ ...fields }, { where: { id } });
  }

  async findUserByParams(params) {
    return User.findOne({ where: { ...params } });
  }

  hashPassword(password) {
    return bcrypt.hash(password, constants.saltOrRounds);
  }

  // todo: create password service (Single responsibility principle)
  async comparePassword(password, hashedPassword) {
    const isPasswordEqual = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordEqual) {
      throw new ErrorHandler('Email or password is not valid', 401);
    }
  }
}

module.exports = {
  userService: new UserService(),
};
