const { Router } = require('express');

const { userController } = require('../controllers/userController');

const router = Router();

router.get('/', userController.findAll);
router.post('/', userController.createUser);

module.exports = {
  userRouter: router,
};
