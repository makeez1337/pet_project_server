const { Router } = require('express');
const { phoneController } = require('../controllers/phoneController');

const router = Router();

router.get('/', phoneController.getAll);
router.post('/', phoneController.createPhone);
router.delete('/', phoneController.deleteById);

module.exports = {
  phoneRouter: router,
};
