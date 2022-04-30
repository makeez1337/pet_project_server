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

      res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 });
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
      res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 });
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
    res.clearCookie('refreshToken');
    res.json('OK');
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken: refreshTokenFromCookie } = req.cookies;
      const { id: tokenId } = await tokenService.findTokenByParams({ refreshToken: refreshTokenFromCookie });

      if (!tokenId) {
        next(new ErrorHandler('Token is not valid', 401));
      }

      const { email, id } = req.user;

      const user = new UserDto(req.user);

      const { refreshToken, accessToken } = tokenService.generateTokenPair({ userEmail: email, userId: id });
      const tokensPair = await tokenService.saveToken(accessToken, refreshToken, id);
      const normalizedTokens = new TokenDto({ ...tokensPair });

      res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: process.env.MAX_AGE });
      res.json({ ...normalizedTokens, user });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  authController: new AuthController(),
};
