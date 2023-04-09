const express = require("express");
const route = express.Router();
const Task = require("../models/task.model");

//retrieve task list
route.get("/", (req, res) => {
  Task.find({})
    .then((task) => {
      console.log("task : ", task);
      res.status(200).json(task);
    })
    .catch((err) => {
      console.log("No task were found!!", err);
      res.status(400).json({ message: "No task were found!!" });
    });
});

//get task by ID
route.get("/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      console.log("task : ", task);
      res.status(200).json(task);
    })
    .catch((err) => {
      console.log("No task was found!!", err);
      res.status(400).json({ message: "No task  was found!!" });
    });
});

//create new task
route.post("/", (req, res) => {
  let taskInfo = req.body;
  Task.create({
    title: taskInfo.title,
    description: taskInfo.description,
    type_id: taskInfo.type_id,
    comments: taskInfo.comments,
    user_id: taskInfo.user_id,
    taskstatus_id: taskInfo.taskstatus_id,
    progress: taskInfo.progress, 
  })
    .then((task) => {
      console.log("Created task: ", task);
      res.status(201).json(task);
    })
    .catch((err) => {
      console.log("Unable to create new task", err);
    });
});

//Update task
route.put("/:id", async (req, res) => {
  let userInfo = req.body;
  const { id } = req.params;

  await User.updateOne({ _id: id }, userInfo)
    .then((user) => {
      console.log("Updated task: ", task);
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log("Unable to update task", err);
      res
        .status(400)
        .json({ message: `Unable to update task with id ${id} !!` });
    });
});

//delete task
route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id)
    .then((task) => {
      console.log(`task with id: ${id} was deleted !`);
      return res.status(200).json(task);
    })
    .catch((err) => {
      console.log("Unable to delete task", err);
      res
        .status(400)
        .json({ message: `Unable to delete task with id ${id} !!` });
    });
});

module.exports = route;
