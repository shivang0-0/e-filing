const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
