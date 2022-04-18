const bcrypt = require('bcrypt');

const { User } = require('../model/User');

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

  async findUserById(id) {
    return User.findOne({ where: { id } });
  }

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
}

module.exports = {
  userService: new UserService(),
};
