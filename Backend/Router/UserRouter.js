const express = require('express')

const Router = express.Router();

const UserController = require("../Controller/UserController");

const upload = require("../middleware/upload")

Router.post("/", uploadimage.single("image"),UserController.create)

Router.get("/",UserController.read )

Router.delete("/:id",UserController.deleteimage)

Router.get("/:id",UserController.getsingle)

Router.put("/:id", uploadimage.single("image"),UserController.update)



module.exports=  Router