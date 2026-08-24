const express = require("express");

const Router = express.Router();

const UserController = require("../Controller/UserController");

const upload = require("../middleware/upload");


Router.post("/",upload.single("image"),UserController.create
);


Router.get( "/", UserController.read
);


Router.get( "/:id",UserController.getsingle
);

Router.put( "/:id",upload.single("image"), UserController.update
);


Router.delete( "/:id", UserController.deleteUser
);

module.exports = Router;