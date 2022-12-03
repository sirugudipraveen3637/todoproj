const mongoose = require("mongoose");
const todomodel = require("../models/todomodel");

const createTodo = async (req, res) => {
  try {
    const { title, tasks, userid } = req.body;

    if (!(title&&userid)) {
      res.status(200).send("Title and userid are required");
    } else {
      let todo;
      if (!tasks) {
        todo = await todomodel.create({
          title: title,
          userid:userid
        });
      } else {
        todo = await todomodel.create({
          title: title,
          tasks: tasks,
          userid:userid
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
