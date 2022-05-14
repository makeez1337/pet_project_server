const constants = {
  emailRegexp: /^\S+@\S+\.\S+$/,

  saltOrRounds: 10,

  headerAuthorization: 'Authorization',

  origin: 'http://localhost:3000',

  staticPrefix: '/phoneImg',
  static: 'static',
  uploads: 'uploads',
};

module.exports = {
  constants,
};
