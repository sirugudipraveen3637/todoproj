const mongoose = require("mongoose");
const todomodel = require("../models/todomodel");

const deleteTodo = async (req, res) => {
  try {
    const {id} = req.params;
    const deletestatus = await todomodel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "todo deleted successfully",
      id: id,
    });
  } catch (error) {
    res.status(201).send("todo deletion failed");
  }
};

module.exports=deleteTodo;