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

  const resetUrl = `http://localhost:3000/verifyemail/${user.email}`;

  const message = `Click the following link to verify your email: \n${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Email Verification',
      message,
    });

    res.json({
      success: true,
      message: 'An email for verification is sent to you!',
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: `Email to ${user.email} could not be sent!`,
    });
  }
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

  if (!user.emailVerified) {
    return res.json({
      success: false,
      message: 'You must verify your email first!',
    });
  }

  sendTokenResponse(user, 200, res, 'User Logged In!');
};

// Logout a user
exports.logout = async (req, res, next) => {
  res
    .cookie('token', 'none', {
      expires: new Date(Date.now() + 1 * 1000),
      httpOnly: true,
    })
    .json({ success: true, message: 'Logged Off' });
};

// Verify email address
exports.verifyEmail = async (req, res, next) => {
  const user = await User.findOne({ email: req.params.email });

  if (!user) {
    return res.json({
      success: false,
      message: `No user with the email: ${req.params.email} found!`,
    });
  }
  user.emailVerified = true;

  await user.save({ validateBeforeSave: false });

  res.json({
    success: true,
    message: 'Email Verified!',
  });
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

  return res
    .cookie('token', token, options)
    .json({ success: true, token, message, user });
};
