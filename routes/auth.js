const express = require('express'),
  router = express.Router(),
  { register } = require('../controllers/auth');

router.route('/register').post(register);

module.exports = router;
