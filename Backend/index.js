const mongoose = require("mongoose");

const express = require('express')

const app = express();




mongoose.connect("mongodb://localhost:27017/Hackthone").then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });



  
  const Router = require("./Router/UserRouter")

  app.use("/user", Router)
  
app.listen(5000, () => {
  console.log("server is running on port 5000");
});