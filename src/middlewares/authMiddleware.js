const { authValidator } = require('../validators/auth/authValidator');
const { ErrorHandler } = require('../error/errorHandler');
const { userService } = require('../services/userService');
const { constants } = require('../constants/constants');
const { tokenService } = require('../services/tokenService');

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

  async checkAccessToken(req, res, next) {
    try {
      const accessToken = req.get(constants.headerAuthorization);

      if (!accessToken) {
        next(new ErrorHandler('Token is not valid', 401));
        return;
      }

      const { userEmail } = await tokenService.verifyToken(accessToken);

      const userFromToken = await userService.findUserByParams({ email: userEmail });
      const tokenPair = await tokenService.findTokenByParams({ accessToken });

      if (!userFromToken) {
        next(new ErrorHandler('Token is not valid', 401));
        return;
      }

      if (!tokenPair) {
        next(new ErrorHandler('Token is not valid', 401));
      }

      req.user = userFromToken;
      next();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  authMiddleware: new AuthMiddleware(),
};
