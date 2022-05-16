const { Router } = require('express');

const { authMiddleware } = require('../middlewares');
const { authController } = require('../controllers');

const router = Router();

router.post('/registration', authMiddleware.isRegistrationValid, authController.registration);
router.post('/login', authMiddleware.isLoginValid, authMiddleware.isUserExists, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.get('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

module.exports = {
  authRouter: router,
};
