const { authValidator } = require('../validators/auth/authValidator');
const { ErrorHandler } = require('../error/errorHandler');

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
}

module.exports = {
  authMiddleware: new AuthMiddleware(),
};
