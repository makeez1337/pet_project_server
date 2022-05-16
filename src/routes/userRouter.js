const { Router } = require('express');

const { userController } = require('../controllers');

const router = Router();

router.get('/', userController.findAllUsers);
router.post('/', userController.createUser);
router.patch('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteById);

module.exports = {
  userRouter: router,
};
