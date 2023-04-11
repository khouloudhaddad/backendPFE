const express = require("express");
const route = express.Router();
//import UserStatus Model
const UserStatus = require("../models/userStatus.model");

//get UserStatus list
route.get("/", (req, res) => {
  UserStatus.find({})
    .then((UserStatus) => {
      console.log("UserStatus List: ", UserStatus);
      res.status(200).json(UserStatus);
    })
    .catch((err) => {
      res.status(404).json({ message: "No UserStatus were found!!" });
      console.log("No UserStatus were found!!", err);
    });
});

//get UserStatus By ID
route.get("/:id", (req, res) => {
  UserStatus.findById(req.params.id)
    .then((UserStatus) => {
      console.log("UserStatus: ", UserStatus);
      res.status(200).json(UserStatus);
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "No UserStatus with id " + req.params.id + " was found!!" });
      console.log("UserStatus unfound!!", err);
    });
});

//create new UserStatus
route.post("/", (req, res) => {
  console.log("===>");
  let UserStatusInfo = req.body;
  UserStatus.create({
    availability: UserStatusInfo.availability,
    leave_date: UserStatusInfo.leave_date,
    return_date: UserStatusInfo.return_date,
  })
    .then((UserStatus) => {
      console.log("Created UserStatus: ", UserStatus);
      res.status(201).json(UserStatus);
    })
    .catch((err) => {
      console.log("Unable to create new UserStatus", err);
    });
});

//Update UserStatus
route.put("/:id", async (req, res) => {
  let UserStatusInfo = req.body;
  const { id } = req.params;

  await UserStatus.updateOne({ _id: id }, UserStatusInfo)
    .then((UserStatus) => {
      console.log("Updated UserStatus: ", UserStatus);
      res.status(200).json(UserStatus);
    })
    .catch((err) => {
      console.log("Unable to update UserStatus", err);
      res
        .status(400)
        .json({ message: `Unable to update UserStatus with id ${id} !!` });
    });
});

//delete UserStatus
route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await UserStatus.findByIdAndDelete(id)
    .then((UserStatus) => {
      console.log(`UserStatus with id: ${id} was deleted !`);
      return res.status(200).json(UserStatus);
    })
    .catch((err) => {
      console.log("Unable to delete UserStatus", err);
      res
        .status(400)
        .json({ message: `Unable to delete UserStatus with id ${id} !!` });
    });
});

module.exports = route;
