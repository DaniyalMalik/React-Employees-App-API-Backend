const mongoose = require('mongoose');

const MongooseSchema = new mongoose.Schema({
  //   name: String,
  name: {
    type: String,
    required: [true, 'Please enter a name!'],
    trim: true,
  },
  slug: String,
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter an email address!'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email address',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Please enter a phone number!'],
    unique: true,
  },
  DoJ: {
    type: Date,
    //  default: Date.now(),
    required: [true, 'Please enter a date!'],
  },
  salary: {
    type: String,
    required: [true, 'Please enter a salary!'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Employee', MongooseSchema);
