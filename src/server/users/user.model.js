const { validateEmail } = require('../helpers/validators');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      validate: [validateEmail, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
  }, {
  timestamp: true
});



const Users = mongoose.model('User', UserSchema);
module.exports = Users;