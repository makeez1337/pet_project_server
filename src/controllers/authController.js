const { Token } = require('../models');
const { userService, tokenService, basketService } = require('../services');
const { UserDto, TokenDto } = require('../dto');

class AuthController {
  async registration(req, res, next) {
    try {
      const { id, email, role } = await userService.createUser(req.body);
      const { accessToken, refreshToken } = tokenService.generateTokenPair({
        userId: id,
        userRole: role,
        userEmail: email,
      });

      const user = new UserDto({ ...req.body, role, id });

      await Token.create({ accessToken, refreshToken, userId: id });
      await basketService.createBasket(id);

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
      const { password: hashedPassword, id, role } = req.user;
      const { email, password } = req.body;
      const user = new UserDto({ ...req.user, id });

      await userService.comparePassword(password, hashedPassword);

      const { accessToken, refreshToken } = tokenService.generateTokenPair({
        userId: id,
        userRole: role,
        userEmail: email,
      });
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
    try {
      const { id } = req.user;
      const accessToken = req.accessToken;

      await tokenService.deleteTokenPairByParams({ userId: id, accessToken });

      res.clearCookie('refreshToken');
      res.json('OK');
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { email, id, role } = req.user.dataValues;

      const user = new UserDto({ ...req.user.dataValues, id });

      const { refreshToken, accessToken } = tokenService.generateTokenPair({
        userEmail: email,
        userRole: role,
        userId: id,
      });

      const tokensPair = await tokenService.saveToken(accessToken, refreshToken, id);
      const normalizedTokens = new TokenDto({ ...tokensPair });

      res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 });
      res.json({ ...normalizedTokens, user });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  authController: new AuthController(),
};
