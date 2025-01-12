const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String // Store image URL after upload
  }
},
  {
    timestamps: true,
  });

const User = mongoose.model("User", userSchema);

module.exports = User;
