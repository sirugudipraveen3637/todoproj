const mongoose = require("mongoose");
const todomodel = require("../models/todomodel");

const createTodo = async (req, res) => {
  try {
    const { title, tasks, createdDate } = req.body;

    if (!title) {
      res.status(200).send("Todo Title is required");
    } else {
      let todo;
      if (!tasks) {
        todo = await todomodel.create({
          title: title,
          createdDate: createdDate,
        });
      } else {
        todo = await todomodel.create({
          title: title,
          tasks: tasks,
          createdDate: createdDate,
        });
      }
      res.status(200).json({
        success: true,
        todo,
        message: "todo created successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(201).send("todo creation failed");
  }
};

module.exports = createTodo;
