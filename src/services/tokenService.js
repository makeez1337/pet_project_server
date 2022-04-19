const jwt = require('jsonwebtoken');
const { Token } = require('../model/Token');

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

  verifyToken(token, secretKey = 'access') {
    secretKey = process.env.SECRET_ACCESS_KEY;

    if (secretKey === 'refresh') {
      secretKey = process.env.SECRET_REFRESH_KEY;
    }

    return jwt.verify(token, secretKey);
  }

  async findTokenByParams(params) {
    return Token.findOne({ where: { ...params } });
  }

  async saveToken(accessToken, refreshToken, userId) {
    const userToken = await this.findTokenByParams({ userId });

    if (userToken) {
      userToken.refreshToken = refreshToken;
      userToken.accessToken = accessToken;

      return Token.update({ accessToken, refreshToken }, { where: { userId } });
    }

    return Token.create({ accessToken, refreshToken, userId });
  }
}

module.exports = {
  tokenService: new TokenService(),
};
