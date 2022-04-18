const { User } = require('../model/User');

class UserService {
  async findAllUsers() {
    return User.findAll();
  }

  async createUser(fields) {
    const { firstName, lastName, email, password, role, age } = fields;

    return  User.create({ firstName, lastName, email, password, role, age });
  }
}

module.exports = {
  userService: new UserService(),
};
