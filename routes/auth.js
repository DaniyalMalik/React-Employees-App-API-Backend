const express = require('express'),
  router = express.Router(),
  {
    register,
    login,
    logout,
    getMe,
    forgotPassword,
    resetPassword,
    verifyEmail,
  } = require('../controllers/auth'),
  { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotpassword', forgotPassword);
router.put('/verifyemail/:email', verifyEmail);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/me', protect, getMe);

module.exports = router;
