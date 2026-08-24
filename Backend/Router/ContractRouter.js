const express = require("express");

const Router = express.Router();

const ContractController = require("../Controller/ContractController");

Router.post("/", ContractController.create);

Router.get("/", ContractController.read);

Router.get("/:id", ContractController.getsingle);

Router.put("/:id", ContractController.update);

Router.delete("/:id", ContractController.deleteContract);

module.exports = Router;