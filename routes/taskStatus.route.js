const express = require('express');
const route = express.Router();
const TaskStatus = require('../models/taskStatus.model');

//retrieve TaskStatus list
route.get("/",(req, res)=>{
    TaskStatus.find({})
    .then((TaskStatus)=>{
        console.log("TaskStatus", TaskStatus);
        res.status(200).json(TaskStatus);
    })
    .catch((err)=>{
        console.log("No TaskStatus were found!!", err);
        res.status(400).json({message: "No TaskStatus were found!!"});
    });

});

//get TaskStatus by ID
route.get("/:id",(req, res)=>{
    TaskStatus.findById(req.params.id)
    .then((TaskStatus)=>{
        console.log("TaskStatus: ",TaskStatus)
        res.status(200).json(TaskStatus)
    })
    .catch((err)=>{
        console.log("No TaskStatus was found!!", err);
        res.status(400).json({message: "No TaskStatus was found!!"});
    });
});

//create new TaskStatus
route.post("/", (req, res)=>{
    let TaskStatusInfo = req.body
    TaskStatus.create({
        name: TaskStatusInfo.name,
        title: TaskStatusInfo.title
    })
    .then((TaskStatus)=>{
        console.log("Created TaskStatus: ",TaskStatus);
        res.status(201).json(TaskStatus)
    })
    .catch((err)=>{
        console.log("Unable to create new TaskStatus", err);
    });
});

//Update TaskStatus
route.put("/:id", async (req, res) => {
    let TaskStatusInfo = req.body;
    const { id } = req.params;
  
    await TaskStatus.updateOne({ _id: id }, TaskStatusInfo)
      .then((TaskStatus) => {
        console.log("Updated TaskStatus: ", TaskStatus);
        res.status(200).json(TaskStatus);
      })
      .catch((err) => {
        console.log("Unable to update TaskStatus", err);
        res
          .status(400)
          .json({ message: `Unable to update TaskStatus with id ${id} !!` });
      });
  });
  
  //delete TaskStatus
  route.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await TaskStatus.findByIdAndDelete(id)
      .then((TaskStatus) => {
        console.log(`TaskStatus with id: ${id} was deleted !`);
        return res.status(200).json(TaskStatus);
      })
      .catch((err) => {
        console.log("Unable to delete TaskStatus", err);
        res
          .status(400)
          .json({ message: `Unable to delete TaskStatus with id ${id} !!` });
      });
  });
  
  
  

module.exports = route;
