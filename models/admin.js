const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    required: true
  },
  Password: {
    type: String,
    required: true,
    minLength: 4
  }
});

adminSchema.pre("save", function (next) {
  // console.log(this);
  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(this.Password, salt);
  this.Password = hashedPassword;
  next();
});

const adminModel = mongoose.model('Admin', adminSchema); 

module.exports = adminModel;

