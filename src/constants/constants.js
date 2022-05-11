const constants = {
  emailRegexp: /^\S+@\S+\.\S+$/,

  saltOrRounds: 10,

  headerAuthorization: 'Authorization',

  origin: 'http://localhost:3000',

  staticPrefix: '/phoneImg',
  staticPath: 'src/static/uploads',
};

module.exports = {
  constants,
};
