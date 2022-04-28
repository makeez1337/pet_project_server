class TokenDto {
  constructor(tokenPair) {
    this.accessToken = tokenPair.accessToken;
    this.refreshToken = tokenPair.refreshToken;
  }
}

module.exports = TokenDto;