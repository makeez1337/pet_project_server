const { authValidator } = require('../validators/auth/authValidator');
const { ErrorHandler } = require('../error/errorHandler');
const { userService } = require('../services/userService');

class AuthMiddleware {
  isRegistrationValid(req, res, next) {
    try {
      const { error, value } = authValidator.registration.validate(req.body);

      if (error) {
        next(new ErrorHandler(error.details[0].message));
        return;
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  isLoginValid(req, res, next) {
    try {
      const { error, value } = authValidator.login.validate(req.body);

      if (error) {
        next(new ErrorHandler(error.details[0].message));
        return;
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  async isUserExists(req, res, next) {
    const { email } = req.body;

    const user = await userService.findUserByParams({ email });

    if (!user) {
      next(new ErrorHandler('Such user doesnt exists'));
      return;
    }

    req.user = user.dataValues;
    next();
  }
}

module.exports = {
  authMiddleware: new AuthMiddleware(),
};
