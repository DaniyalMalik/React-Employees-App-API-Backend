// let Employees = require('../data/employees');
const Employee = require('../models/Employee');

// Get all employees
// exports.getEmployees = async (req, res, next) => {
//   // res.json(Employees);
//   try {
//     const employees = await Employee.find();

//     res.status(200).json({
//       success: true,
//       count: employees.length,
//       data: employees,
//     });
//   } catch (error) {
//     res.json({ success: false, message: 'Data cannot be retrieved!' });
//   }
// };

// Get an employee
exports.getEmployee = async (req, res, next) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.json({
        success: false,
        message: `No user with the id ${id} found!`,
      });
    }

    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    const id = req.params.id;

    res.json({ success: false, message: `No user with the id ${id} found!` });
  }

  // const found = Employees.some((employee) => employee.id == id);
  // found
  //   ? res.json(Employees.filter((employee) => employee.id == id))
  //   : res.status(404).json({ error: `User with the id: ${id} not found!` });
};

// Create an employee
exports.createEmployee = async (req, res, next) => {
  try {
    const data = req.body;
    const employee = await Employee.create(data);
    res
      .status(201)
      .json({ success: true, message: `Data Added!`, data: employee });
  } catch (error) {
    res.json({ success: false, message: `Data cannot be added!` });
  }
  // const newEmployee = {
  //   id: uuid.v4(),
  //   name: data.name,
  //   email: data.email,
  //   phone: data.phone,
  //   DoJ: data.DoJ,
  //   salary: data.salary,
  // };

  // Employees.push(newEmployee);
};

// Update an employee
exports.updateEmployee = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updEmployee = req.body;
    const employee = await Employee.findByIdAndUpdate(id, updEmployee, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      return res.json({
        success: false,
        message: `No user with the id ${id} found!`,
      });
    }

    res
      .status(200)
      .json({ success: true, message: 'Data Updated!', data: employee });
  } catch (error) {
    const id = req.params.id;

    res.json({ success: false, message: `No user with the id ${id} found!` });
  }
  // const found = Employees.some((employee) => employee.id == id);

  // found
  //   ? Employees.forEach((employee) => {
  //       if (employee.id == id) {
  //         employee.name =
  //           employee.name === updEmployee.name
  //             ? employee.name
  //             : updEmployee.name;
  //         employee.email =
  //           employee.email === updEmployee.email
  //             ? employee.email
  //             : updEmployee.email;
  //         employee.phone =
  //           employee.phone === updEmployee.phone
  //             ? employee.phone
  //             : updEmployee.phone;
  //         employee.DoJ =
  //           employee.DoJ === updEmployee.DoJ ? employee.DoJ : updEmployee.DoJ;
  //         employee.salary =
  //           employee.salary === updEmployee.salary
  //             ? employee.salary
  //             : updEmployee.salary;
  //         res.json(Employees);
  //       }
  //     })
  //   : res.json({ error: `No user with the id ${id} found!` });
};

// Delete an employee
exports.deleteEmployee = async (req, res, next) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findByIdAndDelete(id);
    const employees = await Employee.find();

    if (!employee) {
      return res.json({
        success: false,
        message: `No user with the id ${id} found!`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Data Deleted!',
      data: employee,
      employees,
    });
  } catch (error) {
    const id = req.params.id;

    res.json({ success: false, message: `No user with the id ${id} found!` });
  }
  // const id = req.params.id;
  // const found = Employee.some((employee) => employee.id == id);

  // found
  //   ? res.json((Employees = Employees.filter((employee) => employee.id != id)))
  //   : res.status(404).json({ error: `No user with the id: ${id} found!` });
};
