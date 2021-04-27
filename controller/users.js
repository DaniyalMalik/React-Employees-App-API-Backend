let Users = require('../data/users');
const uuid = require('uuid');

// Get all users
exports.getUsers = (req, res, next) => {
  res.json(Users);
};

// Get single user
exports.getUser = (req, res, next) => {
  const id = req.params.id;

  const found = Users.some((user) => user.id == id);
  found
    ? res.json(Users.filter((user) => user.id == id))
    : res.status(404).json({ error: `User with the id: ${id} not found!` });
};

// Create a user
exports.createUser = (req, res, next) => {
  const data = req.body;
  const newUSer = {
    id: uuid.v4(),
    name: data.name,
    email: data.email,
    phone: data.phone,
    DoJ: data.DoJ,
    salary: data.salary,
  };

  Users.push(newUSer);

  res.json({ error: `Data Added!`, Users });
};

// Update a user
exports.updateUser = (req, res, next) => {
  const id = req.params.id;
  const updUser = req.body;
  const found = Users.some((user) => user.id == id);

  found
    ? Users.forEach((user) => {
        if (user.id == id) {
          user.name = user.name === updUser.name ? user.name : updUser.name;
          user.email =
            user.email === updUser.email ? user.email : updUser.email;
          user.phone =
            user.phone === updUser.phone ? user.phone : updUser.phone;
          user.DoJ = user.DoJ === updUser.DoJ ? user.DoJ : updUser.DoJ;
          user.salary =
            user.salary === updUser.salary ? user.salary : updUser.salary;
          res.json(Users);
        }
      })
    : res.json({ error: `No user with the id ${id} found!` });
};

// Delte a user
exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  const found = Users.some((user) => user.id == id);

  found
    ? res.json((Users = Users.filter((user) => user.id != id)))
    : res.status(404).json({ error: `No user with the id: ${id} found!` });
};
