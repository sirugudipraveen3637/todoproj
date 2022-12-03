const mongoose = require("mongoose");

const todoschema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title cannot be empty"],
  },
  tasks: {
    type: [String],
  },
  createdDate: Date,
  modifiedDate: Date,
});

module.exports = mongoose.model("todomodel", todoschema);
