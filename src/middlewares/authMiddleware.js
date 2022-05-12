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
      next(new ErrorHandler('Email or password is not valid', 401));
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

      if (!userFromToken) {
        next(new ErrorHandler('Token is not valid', 401));
        return;
      }

      const tokenPair = await tokenService.findTokenByParams({ accessToken });
      if (!tokenPair) {
        next(new ErrorHandler('Token is not valid', 401));
        return;
      }

      req.user = userFromToken;
      req.accessToken = accessToken;
      next();
    } catch (e) {
      next(e);
    }
  }

  async checkRefreshToken(req, res, next) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      next(new ErrorHandler('Token is not valid', 401));
      return;
    }

    const { userEmail } = await tokenService.verifyToken(refreshToken, 'refresh');
    const userFromToken = await userService.findUserByParams({ email: userEmail });

    if (!userFromToken) {
      next(new ErrorHandler('Token is not valid', 401));
      return;
    }

    req.user = userFromToken;
    next();
  }

  async isUserAdmin(req, res, next) {
    try {
      const accessToken = req.get(constants.headerAuthorization);

      if (!accessToken) {
        next(new ErrorHandler('Token is not valid', 401));
        return;
      }

      const { userEmail, userRole } = await tokenService.verifyToken(accessToken);
      console.log(userRole);

      const userFromToken = await userService.findUserByParams({ email: userEmail });
      if (!userFromToken) {
        next(new ErrorHandler('Token is not valid', 401));
        return;
      }

      if (userRole !== 'admin') {
        next(new ErrorHandler('You dont have access for this content', 403));
        return;
      }

      const tokenPair = await tokenService.findTokenByParams({ accessToken });
      if (!tokenPair) {
        next(new ErrorHandler('Token is not valid', 401));
        return;
      }

      req.user = userFromToken;
      req.accessToken = accessToken;
      next();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  authMiddleware: new AuthMiddleware(),
};
