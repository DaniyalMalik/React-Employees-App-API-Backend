const express = require('express'),
  router = express.Router(),
  { register } = require('../controllers/users');

router.route('/register').post(register);

module.exports = router;
