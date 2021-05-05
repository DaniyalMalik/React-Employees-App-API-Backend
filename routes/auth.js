const express = require('express'),
  router = express.Router(),
  { register, login, getMe, forgotPassword, resetPassword } = require('../controllers/auth'),
  { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/me', protect, getMe);

module.exports = router;
