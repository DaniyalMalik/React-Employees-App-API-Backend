const User = require('../models/User');

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  sendTokenResponse(user, 200, res, 'User Registered!');
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.json({ success: false, message: 'Invalid Credentials!' });
  }

  const isSame = await user.matchPassword(password);

  if (!isSame) {
    return res.json({ success: false, message: 'Invalid Credentials!' });
  }

  sendTokenResponse(user, 200, res, 'User Logged In!');
};

exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
};

const sendTokenResponse = (user, status, res, message) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.cookie('token', token, options).json({ success: true, token, message });
};
