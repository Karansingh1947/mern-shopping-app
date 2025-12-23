const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,     // no two users with same email
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6      // basic security
  },

  role: {
    type: String,
    enum: ["buyer", "seller", "admin"],
    default: "buyer"
  },

  sellerProfile: {
    companyName: { type: String },
    verified: { type: Boolean, default: false }
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
