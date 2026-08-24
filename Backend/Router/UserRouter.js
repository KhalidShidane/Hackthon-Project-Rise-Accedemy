const express = require("express");

const Router = express.Router();

const UserController = require("../Controller/UserController");

const upload = require("../middleware/upload");

// CREATE
Router.post(
  "/",
  upload.single("image"),
  UserController.create
);

// GET ALL
Router.get(
  "/",
  UserController.read
);

// GET SINGLE
Router.get(
  "/:id",
  UserController.getsingle
);

// UPDATE
Router.put(
  "/:id",
  upload.single("image"),
  UserController.update
);

// DELETE
Router.delete(
  "/:id",
  UserController.deleteUser
);

module.exports = Router;