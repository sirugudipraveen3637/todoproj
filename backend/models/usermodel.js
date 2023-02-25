const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String
    //required: [true, "password is required"],
  },
  profileurl: {
    type: String
  },
  forgotPasswordToken:String,
  forgotPasswordExpiry:Date
},
{
  timestamps:true
});

module.exports = mongoose.model("usermodel", userschema);
