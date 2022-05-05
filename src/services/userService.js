const bcrypt = require('bcrypt');

const { User } = require('../models/User');
const { constants } = require('../constants/constants');

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

  async hashPassword(password) {
    return bcrypt.hash(password, constants.saltOrRounds);
  }

  async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

module.exports = {
  userService: new UserService(),
};
