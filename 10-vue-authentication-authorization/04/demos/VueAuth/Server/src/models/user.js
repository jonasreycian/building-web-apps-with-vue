const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  name: String,
  email: String,
  dateOfBirth: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;