const jwt = require('jsonwebtoken');

const { userService } = require('../services/userService');
const { Token } = require('../model/Token');
const { tokenService } = require('../services/tokenService');
const { ErrorHandler } = require('../error/errorHandler');

class AuthController {
  async registration(req, res, next) {
    try {
      const { id, email } = await userService.createUser(req.body);
      const { accessToken, refreshToken } = tokenService.generateTokenPair({ userId: id, userEmail: email });

      const userTokenData = await Token.create({ accessToken, refreshToken, userId: id });
      res.json(userTokenData.dataValues);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { password: hashedPassword, id } = req.user;
      const { email, password } = req.body;

      const isPasswordEqual = await userService.comparePassword(password, hashedPassword);

      if (!isPasswordEqual) {
        next(new ErrorHandler('Email or password is not valid'));
        return;
      }

      const { accessToken, refreshToken } = tokenService.generateTokenPair({ userId: id, userEmail: email });
      await tokenService.saveToken(accessToken, refreshToken, id);

      res.json({
        accessToken,
        refreshToken,
        user: req.user,
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  authController: new AuthController(),
};
