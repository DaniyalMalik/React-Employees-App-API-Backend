const express = require('express'),
  router = express.Router(),
  { register, login, getMe } = require('../controllers/auth'),
  { protect } = require('../middleware/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protect, getMe);

module.exports = router;
