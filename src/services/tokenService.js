const jwt = require('jsonwebtoken');

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
}

module.exports = {
  tokenService: new TokenService(),
};
