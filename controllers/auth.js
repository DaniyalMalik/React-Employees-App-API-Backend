const User = require('../models/User'),
  crypto = require('crypto'),
  sendEmail = require('../utils/sendEmail');

// Register a User
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  sendTokenResponse(user, 200, res, 'User Registered!');
};

// Login a User
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

// Get Current Logged In User
exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
};

// Forgot Password Token
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.json({
      success: false,
      message: `No user with the email: ${req.body.email} found!`,
    });
  }

  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // const resetUrl = `${req.protocol}://${req.get(
  //   'host',
  // )}/api/auth/resetpassword/${resetToken}`;

  const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

  const message = `Click the following link to reset your password: \n${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Reset Password Token',
      message,
    });

    res.json({
      success: true,
      message: `Email to ${user.email} sent!`,
    });
  } catch (error) {
    console.log(error);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.json({
      success: false,
      message: `Email to ${user.email} could not be sent!`,
    });
  }
};

// Reset Password
exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.json({ success: false, message: 'Invalid Token!' });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendTokenResponse(user, 200, res, 'User Logged In!');
};

// Generating token and sending it in response
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

  res
    .cookie('token', token, options)
    .json({ success: true, token, message, user });
};
