const { userService } = require('./userService');
const { basketService } = require('./basketService');
const { brandService } = require('./brandService');
const { emailService } = require('./emailService');
const { memoryService } = require('./memoryService');
const { basketDeviceService } = require('./baksetDeviceService');
const { phoneService } = require('./phoneService');
const { tokenService } = require('./tokenService');
const { ramServices } = require('./ramServices');

module.exports = {
  userService,
  basketService,
  brandService,
  emailService,
  memoryService,
  basketDeviceService,
  phoneService,
  tokenService,
  ramServices,
};
