const { Router } = require('express');

const {
  userRouter,
  authRouter,
  brandRouter,
  phoneRouter,
  basketDeviceRouter,
  memoryRouter,
  ramRouter,
} = require('./index');

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/brands', brandRouter);
router.use('/phones', phoneRouter);
router.use('/basketDevice', basketDeviceRouter);
router.use('/memory', memoryRouter);
router.use('/ram', ramRouter);
router.use('*', (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = {
  apiRouter: router,
};
