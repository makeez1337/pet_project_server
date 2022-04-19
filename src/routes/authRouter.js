const { Router } = require('express');

const { authController } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = Router();

router.post('/registration', authMiddleware.isRegistrationValid, authController.registration);

module.exports = {
  authRouter: router,
};
