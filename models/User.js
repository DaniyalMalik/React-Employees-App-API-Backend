const mongoose = require('mongoose'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  crypto = require('crypto');

const MongooseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name!'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter an email address!'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email address',
    ],
  },
  // role: {
  //   type: String,
  //   enum: ['user', 'publisher'],
  //   default: 'user',
  // },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    select: false,
  },
  // resetPasswordToken: String,
  // resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypting password
MongooseSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Creating jwt
MongooseSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Comparing passwords
MongooseSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// MongooseSchema.methods.getResetPasswordToken = async function () {
//   const resetToken = await crypto.randomBytes(20).toString('hex');

//   this.resetPasswordToken = await crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex');

//   this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

//   // this.save({ validateBeforeSave: false });

//   return resetToken;
// };

module.exports = mongoose.model('User', MongooseSchema);
