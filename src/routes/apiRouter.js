const { Router } = require('express');

const { userRouter } = require('./userRouter');
const { authRouter } = require('./authRouter');
const { brandRouter } = require('./brandRouter');
const { phoneRouter } = require('./phoneRouter');
const { basketDeviceRouter } = require('./basketDeviceRouter');

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/brands', brandRouter);
router.use('/phones', phoneRouter);
router.use('/basketDevice', basketDeviceRouter)
router.use('*', (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = {
  apiRouter: router,
};
