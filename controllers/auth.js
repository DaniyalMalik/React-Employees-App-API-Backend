const User = require('../models/User');

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, message: 'User Created!', token });
};

// exports.login = async (req, res, next) => {
//   const { email, password } = req.body;

//   const user = await User.findOne(email);

// if(!email || !password){
  
// }

//   !user ? res.json({ success: false, message: 'Invalid Credentials!' }) : null;



//   const token = user.getSignedJwtToken();

//   res.status(200).json({ success: true, message: 'User Created!', token });
// };
