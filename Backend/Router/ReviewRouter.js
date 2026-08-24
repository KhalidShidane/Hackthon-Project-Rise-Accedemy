const express = require("express");

const Router = express.Router();

const ReviewController = require("../Controller/ReviewController");

Router.post("/", ReviewController.create);

Router.get("/", ReviewController.read);

Router.get("/:id", ReviewController.getsingle);

Router.put("/:id", ReviewController.update);

Router.delete("/:id", ReviewController.deleteReview);

module.exports = Router;