const { userRouter } = require('./userRouter');
const { authRouter } = require('./authRouter');
const { brandRouter } = require('./brandRouter');
const { phoneRouter } = require('./phoneRouter');
const { basketDeviceRouter } = require('./basketDeviceRouter');
const { memoryRouter } = require('./memoryRouter');
const { ramRouter } = require('./ramRouter');

module.exports = {
  userRouter,
  authRouter,
  brandRouter,
  phoneRouter,
  basketDeviceRouter,
  memoryRouter,
  ramRouter,
};
