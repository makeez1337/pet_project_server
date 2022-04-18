const { User } = require('../model/User');

class UserService {
  async findAllUsers() {
    return User.findAll();
  }

  async createUser(fields) {
    const { firstName, lastName, email, password, role, age } = fields;

    return User.create({ firstName, lastName, email, password, role, age });
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
}

module.exports = {
  userService: new UserService(),
};
