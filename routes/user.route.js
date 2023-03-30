const express = require("express");
const route = express.Router();
//import User Model
const User = require("../models/user.model");

//get Users list
route.get("/", (req, res) => {
  User.find({})
    .then((users) => {
      console.log("Users List: ", users);
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(404).json({ message: "No users were found!!" });
      console.log("No users were found!!", err);
    });
});

//get User By ID
route.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      console.log("User: ", user);
      res.status(200).json(user);
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "No user with id " + req.params.id + " was found!!" });
      console.log("User unfound!!", err);
    });
});

//create new User
route.post("/", (req, res) => {
  let userInfo = req.body;
  User.create({
    full_name: userInfo.full_name,
    email: userInfo.email,
    username: userInfo.username,
    status: false,
    password: userInfo.password,
    phone: userInfo.phone,
    role: userInfo.role
    })
    .then((user) => {
      console.log("Created User: ", user);
      res.status(201).json(user);
    })
    .catch((err) => {
      console.log("Unable to create new user", err);
    });
});

//Update user
route.put("/:id", async (req, res) => {
  let userInfo = req.body;
  const { id } = req.params;

  await User.updateOne({ _id: id }, userInfo)
    .then((user) => {
      console.log("Updated User: ", user);
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log("Unable to update user", err);
      res
        .status(400)
        .json({ message: `Unable to update user with id ${id} !!` });
    });
});

//delete user
route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id)
    .then((user) => {
      console.log(`User with id: ${id} was deleted !`);
      return res.status(200).json(user);
    })
    .catch((err) => {
      console.log("Unable to delete user", err);
      res
        .status(400)
        .json({ message: `Unable to delete user with id ${id} !!` });
    });
});


module.exports = route;
