const { userService } = require('../services/userService');

class UserController {
  async findAll(req, res, next) {
    try {
      const users = await userService.findAllUsers();

      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async createUser(req, res, next) {
    try {
      const user = await userService.createUser(req.body);

      res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  userController: new UserController(),
};
