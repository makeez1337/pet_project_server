const jwt = require('jsonwebtoken');

const { userService } = require('../services/userService');
const { Token } = require('../model/Token');
const { tokenService } = require('../services/tokenService');
const { ErrorHandler } = require('../error/errorHandler');
const UserDto = require('../dto/userDto');
const TokenDto = require('../dto/tokenDto');
const { constants } = require('../constants/constants');

class AuthController {
  async registration(req, res, next) {
    try {
      const { id, email } = await userService.createUser(req.body);
      const { accessToken, refreshToken } = tokenService.generateTokenPair({ userId: id, userEmail: email });
      const user = new UserDto(req.body);

      const userTokenData = await Token.create({ accessToken, refreshToken, userId: id });

      res.json({
        accessToken,
        refreshToken,
        user,
      });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { password: hashedPassword, id } = req.user;
      const { email, password } = req.body;
      const user = new UserDto(req.user);

      const isPasswordEqual = await userService.comparePassword(password, hashedPassword);

      if (!isPasswordEqual) {
        next(new ErrorHandler('Email or password is not valid', 401));
        return;
      }

      const { accessToken, refreshToken } = tokenService.generateTokenPair({ userId: id, userEmail: email });
      await tokenService.saveToken(accessToken, refreshToken, id);

      res.json({
        accessToken,
        refreshToken,
        user,
      });
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    const { id } = req.user;
    const accessToken = req.accessToken;

    await tokenService.deleteTokenPairByParams({ userId: id, accessToken });
    res.json('OK');
  }

  async refresh(req, res, next) {
    const refreshTokenFromHeader = req.get(constants.headerAuthorization);
    const { id: tokenId } = await tokenService.findTokenByParams({ refreshToken: refreshTokenFromHeader });
    const { email, id } = req.user;
    const user = new UserDto(req.user);

    const { refreshToken, accessToken } = tokenService.generateTokenPair({ userEmail: email, userId: id });
    const tokensPair = await tokenService.saveToken(accessToken, refreshToken, id);
    const normalizedTokens = new TokenDto({ ...tokensPair });

    res.json({ ...normalizedTokens, user });
  }
}

module.exports = {
  authController: new AuthController(),
};
