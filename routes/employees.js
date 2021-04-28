const express = require('express'),
  router = express.Router(),
  {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  } = require('../controller/employees');

router.route('/').get(getEmployees).post(createEmployee);

router.route('/:id').get(getEmployee).put(updateEmployee).delete(deleteEmployee);

module.exports = router;
