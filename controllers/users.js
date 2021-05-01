const User = require('../models/User');

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(200).json({ success: true, message: 'User Created!' });
};
