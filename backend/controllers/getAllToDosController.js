const mongoose = require("mongoose");
const todomodel = require("../models/todomodel");

const getAllTodos = async (req, res) => {
  try {
    const {sortType}=req.params;
    todos = await todomodel.find().sort({modifiedDate:sortType});
    if (!todos) {
      res.status(201).send("todo documents are not available");
    } else {
      if (todos.length == 0) {
        res.status(200).send("todo documents are not available");
      } else {
        res.status(200).json({
          todos: todos,
          length: todos.length,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(201).send("get todos failed");
  }
};

module.exports = getAllTodos;
