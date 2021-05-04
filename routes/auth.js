const express = require('express'),
  router = express.Router(),
  { register, login, getMe } = require('../controllers/auth'),
  { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
