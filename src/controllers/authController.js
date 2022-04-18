const jwt = require('jsonwebtoken');

const { userService } = require('../services/userService');
const { Token } = require('../model/Token');
const { tokenService } = require('../services/tokenService');

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
}

module.exports = {
  authController: new AuthController(),
};
