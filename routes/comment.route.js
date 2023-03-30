const express = require('express');
const route = express.Router();
const Comment = require('../models/comment.model');

//retrieve comment list
route.get("/",(req, res)=>{
    Comment.find({})
    .then((comment)=>{
        console.log("comment", comment);
        res.status(200).json(comment);
    })
    .catch((err)=>{
        console.log("No comments were found!!", err);
        res.status(400).json({message: "No comments were found!!"});
    });

});

//get comment by ID
route.get("/:id",(req, res)=>{
    Comments.findById(req.params.id)
    .then((comment)=>{
        console.log("Comment: ",comment)
        res.status(200).json(comment)
    })
    .catch((err)=>{
        console.log("No comment was found!!", err);
        res.status(400).json({message: "No comment was found!!"});
    });
});

//create new comment
route.post("/", (req, res)=>{
    let commentInfo = req.body
    Comment.create({
        message: commentInfo.message,
        parent_id: commentInfo.parent_id,
        task_id: commentInfo.task_id
    })
    .then((comment)=>{
        console.log("Created comment: ",comment);
        res.status(201).json(comment)
    })
    .catch((err)=>{
        console.log("Unable to create new comment", err);
    });
});

//Update comment
route.put("/:id", async (req, res) => {
    let commentInfo = req.body;
    const { id } = req.params;
  
    await Comment.updateOne({ _id: id }, commentInfo)
      .then((comment) => {
        console.log("Updated Comment: ", Comment);
        res.status(200).json(comment);
      })
      .catch((err) => {
        console.log("Unable to update comment", err);
        res
          .status(400)
          .json({ message: `Unable to update comment with id ${id} !!` });
      });
  });
  
  //delete comment
  route.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id)
      .then((comment) => {
        console.log(`comment with id: ${id} was deleted !`);
        return res.status(200).json(comment);
      })
      .catch((err) => {
        console.log("Unable to delete comment", err);
        res
          .status(400)
          .json({ message: `Unable to delete comment with id ${id} !!` });
      });
  });
  
  
  

module.exports = route;
