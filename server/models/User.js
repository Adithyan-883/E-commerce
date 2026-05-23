const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  address: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
