const express = require('express'),
  router = express.Router(),
  {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  } = require('../controller/users');

// // Get users
// router.get('/', (req, res) => {
//   res.json(Users);
//   console.log(req);
// });

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

// // Get a selected user
// router.get('/:id', (req, res) => {
//   const id = req.params.id;

//   const found = Users.some((user) => user.id == id);
//   found
//     ? res.json(Users.filter((user) => user.id == id))
//     : res.status(404).json({ error: `User with the id: ${id} not found!` });
// });

// // Deleting a user
// router.delete('/:id', (req, res) => {
//   const id = req.params.id;
//   const found = Users.some((user) => user.id == id);

//   found
//     ? res.json((Users = Users.filter((user) => user.id != id)))
//     : res.status(404).json({ error: `No user with the id: ${id} found!` });
// });

// // Add a user
// router.post('/', (req, res) => {
//   const data = req.body;
//   const newUSer = {
//     id: uuid.v4(),
//     name: data.name,
//     email: data.email,
//     phone: data.phone,
//     DoJ: data.DoJ,
//     salary: data.salary,
//   };

//   Users.push(newUSer);

//   res.json({ error: `Data Cannot be Added!`, Users });
// });

// // Update a user
// router.put('/:id', (req, res) => {
//   const id = req.params.id;
//   const updUser = req.body;
//   const found = Users.some((user) => user.id == id);

//   found
//     ? Users.forEach((user) => {
//         if (user.id == id) {
//           user.name = user.name === updUser.name ? user.name : updUser.name;
//           user.email =
//             user.email === updUser.email ? user.email : updUser.email;
//           user.phone =
//             user.phone === updUser.phone ? user.phone : updUser.phone;
//           user.DoJ = user.DoJ === updUser.DoJ ? user.DoJ : updUser.DoJ;
//           user.salary =
//             user.salary === updUser.salary ? user.salary : updUser.salary;
//           res.json(Users);
//         }
//       })
//     : res.json({ error: `No user with the id ${id} found!` });
// });

module.exports = router;
