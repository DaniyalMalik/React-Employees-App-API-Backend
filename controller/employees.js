let Employees = require('../data/employees');
const uuid = require('uuid');

// Get all employees
exports.getEmployees = (req, res, next) => {
  res.json(Employees);
};

// Get an employee
exports.getEmployee = (req, res, next) => {
  const id = req.params.id;

  const found = Employees.some((employee) => employee.id == id);
  found
    ? res.json(Employees.filter((employee) => employee.id == id))
    : res.status(404).json({ error: `User with the id: ${id} not found!` });
};

// Create an employee
exports.createEmployee = (req, res, next) => {
  const data = req.body;
  const newEmployee = {
    id: uuid.v4(),
    name: data.name,
    email: data.email,
    phone: data.phone,
    DoJ: data.DoJ,
    salary: data.salary,
  };

  Employees.push(newEmployee);

  res.json({ error: `Data Added!`, Employees });
};

// Update an employee
exports.updateEmployee = (req, res, next) => {
  const id = req.params.id;
  const updEmployee = req.body;
  const found = Employees.some((employee) => employee.id == id);

  found
    ? Employees.forEach((employee) => {
        if (employee.id == id) {
          employee.name =
            employee.name === updEmployee.name
              ? employee.name
              : updEmployee.name;
          employee.email =
            employee.email === updEmployee.email
              ? employee.email
              : updEmployee.email;
          employee.phone =
            employee.phone === updEmployee.phone
              ? employee.phone
              : updEmployee.phone;
          employee.DoJ =
            employee.DoJ === updEmployee.DoJ ? employee.DoJ : updEmployee.DoJ;
          employee.salary =
            employee.salary === updEmployee.salary
              ? employee.salary
              : updEmployee.salary;
          res.json(Employees);
        }
      })
    : res.json({ error: `No user with the id ${id} found!` });
};

// Delete an employee
exports.deleteEmployee = (req, res, next) => {
  const id = req.params.id;
  const found = Employee.some((employee) => employee.id == id);

  found
    ? res.json((Employees = Employees.filter((employee) => employee.id != id)))
    : res.status(404).json({ error: `No user with the id: ${id} found!` });
};
