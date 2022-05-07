const jwt = require('jsonwebtoken');
const { Token } = require('../models');
const { ErrorHandler } = require('../error/errorHandler');

class TokenService {
  generateTokenPair(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_KEY, {
      expiresIn: process.env.EXPIRES_ACCESS_IN,
    });
    const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_KEY, {
      expiresIn: process.env.EXPIRES_REFRESH_IN,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyToken(token, tokenType = 'access') {
    try {
      let secretKey = process.env.SECRET_ACCESS_KEY;

      if (tokenType === 'refresh') {
        secretKey = process.env.SECRET_REFRESH_KEY;
      }

      return jwt.verify(token, secretKey);
    } catch (e) {
      throw new ErrorHandler(e.message, 401);
    }
  }

  async findTokenByParams(params) {
    return Token.findOne({ where: { ...params } });
  }

  async saveToken(accessToken, refreshToken, userId) {
    const userToken = await this.findTokenByParams({ userId });

    if (userToken) {
      userToken.accessToken = accessToken;
      userToken.refreshToken = refreshToken;

      await userToken.save({});

      return { accessToken, refreshToken, userId };
    }

    return Token.create({ accessToken, refreshToken, userId });
  }

  async deleteTokenPairByParams(params) {
    await Token.destroy({ where: { ...params } });
  }
}

module.exports = {
  tokenService: new TokenService(),
};
