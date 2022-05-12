const { Router } = require('express');
const multer = require('multer');

const { phoneController } = require('../controllers/phoneController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/static/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({ storage, fileFilter });

const router = Router();

router.get('/', phoneController.getAll);
router.get('/pagination', phoneController.getPhonesPagination);
router.post('/', authMiddleware.isUserAdmin, upload.single('phoneImg'), phoneController.createPhone);
router.delete('/', phoneController.deleteById);

module.exports = {
  phoneRouter: router,
};
