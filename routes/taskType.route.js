const express = require('express');
const route = express.Router();
const TaskType = require('../models/TaskType.model');


//retrieve TaskTypes list
route.get("/",(req, res)=>{
    TaskType.find({})
    .then((TaskTypes)=>{
        console.log("TaskTypes", TaskTypes);
        res.status(200).json(TaskTypes);
    })
    .catch((err)=>{
        console.log("No TaskTypes were found!!", err);
        res.status(400).json({message: "No TaskTypes were found!!"});
    });

});

//get TaskType by ID
route.get("/:id",(req, res)=>{
    TaskType.findById(req.params.id)
    .then((TaskType)=>{
        console.log("TaskType: ",TaskType)
        res.status(200).json(TaskType)
    })
    .catch((err)=>{
        console.log("No TaskType was found!!", err);
        res.status(400).json({message: "No TaskType was found!!"});
    });
});

//create new TaskType
route.post("/", (req, res)=>{
    let TaskTypeInfo = req.body
    TaskType.create({
       name: TaskTypeInfo.name,
       title: TaskTypeInfo.title
    })
    .then((TaskType)=>{
        console.log("Created TaskType: ",TaskType);
        res.status(201).json(TaskType)
    })
    .catch((err)=>{
        console.log("Unable to create new TaskType", err);
    });
});

//Update TaskType
route.put("/:id", async (req, res) => {
    let userInfo = req.body;
    const { id } = req.params;
  
    await User.updateOne({ _id: id }, userInfo)
      .then((user) => {
        console.log("Updated TaskType: ", TaskType);
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log("Unable to update TaskType", err);
        res
          .status(400)
          .json({ message: `Unable to update TaskType with id ${id} !!` });
      });
  });
  
  //delete TaskType
  route.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await TaskType.findByIdAndDelete(id)
      .then((TaskType) => {
        console.log(`TaskType with id: ${id} was deleted !`);
        return res.status(200).json(TaskType);
      })
      .catch((err) => {
        console.log("Unable to delete TaskType", err);
        res
          .status(400)
          .json({ message: `Unable to delete TaskType with id ${id} !!` });
      });
  });
  
  
  

module.exports = route;