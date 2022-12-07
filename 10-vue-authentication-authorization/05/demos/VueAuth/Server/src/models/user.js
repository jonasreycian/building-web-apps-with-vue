const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  name: String,
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  dateOfBirth: String,
  roles: {
    name: String,
    description: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;