const { Router } = require('express');

const { memoryController } = require('../controllers');

const router = Router();

router.get('/', memoryController.getAll);
router.post('/', memoryController.createMemory);

module.exports = {
  memoryRouter: router,
};
