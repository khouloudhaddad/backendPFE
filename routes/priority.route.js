const express = require('express');
const route = express.Router();
const Priority = require('../models/priority.model');

//retrieve priority list
route.get("/",(req, res)=>{
    Priority.find({})
    .then((priority)=>{
        console.log("priority", priority);
        res.status(200).json(priority);
    })
    .catch((err)=>{
        console.log("No prioritys were found!!", err);
        res.status(400).json({message: "No prioritys were found!!"});
    });

});

//get priority by ID
route.get("/:id",(req, res)=>{
    Priority.findById(req.params.id)
    .then((priority)=>{
        console.log("priority: ",priority)
        res.status(200).json(priority)
    })
    .catch((err)=>{
        console.log("No priority was found!!", err);
        res.status(400).json({message: "No priority was found!!"});
    });
});

//create new priority
route.post("/", (req, res)=>{
    let priorityInfo = req.body
    Priority.create({
        name: priorityInfo.name,
        color: priorityInfo.color
    })
    .then((priority)=>{
        console.log("Created priority: ",priority);
        res.status(201).json(priority)
    })
    .catch((err)=>{
        console.log("Unable to create new priority", err);
    });
});

//Update priority
route.put("/:id", async (req, res) => {
    let priorityInfo = req.body;
    const { id } = req.params;
  
    await priority.updateOne({ _id: id }, priorityInfo)
      .then((priority) => {
        console.log("Updated priority: ", priority);
        res.status(200).json(priority);
      })
      .catch((err) => {
        console.log("Unable to update priority", err);
        res
          .status(400)
          .json({ message: `Unable to update priority with id ${id} !!` });
      });
  });
  
  //delete priority
  route.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Priority.findByIdAndDelete(id)
      .then((priority) => {
        console.log(`priority with id: ${id} was deleted !`);
        return res.status(200).json(priority);
      })
      .catch((err) => {
        console.log("Unable to delete priority", err);
        res
          .status(400)
          .json({ message: `Unable to delete priority with id ${id} !!` });
      });
  });
  
  
  

module.exports = route;
