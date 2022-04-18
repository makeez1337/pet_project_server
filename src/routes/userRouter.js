const { Router } = require('express');

const { User } = require('../model/User');
const { Token } = require('../model/Token');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (e) {
    next(e);
  }
});
router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role, age } = req.body;

    const user = await User.create({ firstName, lastName, email, password, role, age });
    res.json(user);
  } catch (e) {
    next(e);
  }
});

module.exports = {
  userRouter: router,
};
