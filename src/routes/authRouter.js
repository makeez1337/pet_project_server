const { Router } = require('express');

const { authController } = require('../controllers/authController');

const router = Router();

router.post('/registration', authController.registration);

module.exports = {
  authRouter: router,
};
