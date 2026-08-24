const express = require("express");

const Router = express.Router();

const MessageController = require("../Controller/MessageController");

Router.post("/", MessageController.create);

Router.get("/", MessageController.read);

Router.get("/:id", MessageController.getsingle);

Router.put("/:id", MessageController.update);

Router.delete("/:id", MessageController.deleteMessage);

module.exports = Router;