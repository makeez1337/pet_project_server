const { userService } = require('../services/userService');
const { ErrorHandler } = require('../error/errorHandler');

class UserController {
  async findAllUsers(req, res, next) {
    try {
      const users = await userService.findAllUsers();

      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async findUserByParams(req, res, next) {
    try {
      const { id } = req.params;

      const user = await userService.findUserByParams({ id });

      res.json(user);
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

  async deleteById(req, res, next) {
    try {
      const { id } = req.params;

      await userService.deleteById(id);

      res.json(`User with id:${id} was deleted successfully`);
    } catch (e) {
      next(e);
    }
  }

  async updateUserById(req, res, next) {
    try {
      const { id } = req.params;
      const { ...fields } = req.body;

      const isUserUpdated = await userService.updateUserById(id, fields);

      if (!isUserUpdated[0]) {
        next(new ErrorHandler('You are sending incorrect fields'));
        return;
      }

      const user = await userService.findUserByParams({ id });
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  userController: new UserController(),
};
