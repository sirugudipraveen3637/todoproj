const mongoose = require("mongoose");

const todoschema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title cannot be empty"],
  },
  tasks: {
    type: [{task:String,status:{type:String,default:"pending"},createdDate:{type:Date,default:Date.now},modifiedDate:{type:Date,default:Date.now}}],
  },
  createdDate: {type:Date,default:Date.now},
  modifiedDate: {type:Date,default:Date.now},
  userid:{
    type:String
  }
});

module.exports = mongoose.model("todomodel", todoschema);
