const mongoose = require("mongoose");
const todomodel = require("../models/todomodel");

const getTodoTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const todoObj = await todomodel.findById(id);
    if (!todoObj) {
      res.status(200).send("todo is not available");
    } else {
      let tasks = todoObj.tasks;
      if (tasks.length == 0) {
        res.status(200).send("no tasks available");
      } else {
        res.status(200).json({
          tasks: tasks,
          title:todoObj.title,
          createdDate:todoObj.createdDate,
          modifiedDate:todoObj.modifiedDate,
          length: tasks.length,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(201).send("getTasksbyTodo API failed");
  }
};

module.exports = getTodoTasks;
