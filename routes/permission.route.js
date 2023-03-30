const express = require("express");
const route = express.Router();
const Permission = require("../models/permission.model");

//retrieve permissions list
route.get("/", (req, res) => {
  Permission.find({})
    .then((permissions) => {
      console.log("permissions : ", permissions);
      res.status(200).json(permissions);
    })
    .catch((err) => {
      console.log("No permissions were found!!", err);
      res.status(400).json({ message: "No permissions were found!!" });
    });
});

//get permissions by ID
route.get("/:id", (req, res) => {
  Permissions.findById(req.params.id)
    .then((permissions) => {
      console.log("Permissions : ", permissions);
      res.status(200).json(permissions);
    })
    .catch((err) => {
      console.log("No permissions was found!!", err);
      res.status(400).json({ message: "No permission  was found!!" });
    });
});

//create new permission
route.post("/", (req, res) => {
  let permissionInfo = req.body;
  Permission.create({
    name: permissionInfo.name,
    privileges: permissionInfo.privileges,
  })
    .then((permission) => {
      console.log("Created permission: ", permission);
      res.status(201).json(permission);
    })
    .catch((err) => {
      console.log("Unable to create new permission", err);
    });
});

//Update permission
route.put("/:id", async (req, res) => {
  let userInfo = req.body;
  const { id } = req.params;

  await User.updateOne({ _id: id }, userInfo)
    .then((user) => {
      console.log("Updated Permission: ", permission);
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log("Unable to update permission", err);
      res
        .status(400)
        .json({ message: `Unable to update permission with id ${id} !!` });
    });
});

//delete permission
route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Permission.findByIdAndDelete(id)
    .then((permission) => {
      console.log(`Permission with id: ${id} was deleted !`);
      return res.status(200).json(permission);
    })
    .catch((err) => {
      console.log("Unable to delete permission", err);
      res
        .status(400)
        .json({ message: `Unable to delete permission with id ${id} !!` });
    });
});

module.exports = route;
