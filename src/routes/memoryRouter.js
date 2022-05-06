const { Router } = require('express');

const { memoryController } = require('../controllers/memoryController');

const router = Router();

router.post('/', memoryController.createMemory)

module.exports = {
  memoryRouter: router,
};
