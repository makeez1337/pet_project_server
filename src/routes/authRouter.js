const { Router } = require('express');

const { authController } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = Router();

router.post('/registration', authMiddleware.isRegistrationValid, authController.registration);
router.post('/login', authMiddleware.isLoginValid, authMiddleware.isUserExists, authController.login);

module.exports = {
  authRouter: router,
};
