const mongoose = require("mongoose");

const express = require('express')
const ProjectRouter= require("./Router/ProjectRouter");

const app = express();

app.use(express.json());


app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Hackthone").then(() => {
    console.log("connected to database");
  })  .catch((err) => {
    console.log(err);
  });

  
  const Router = require("./Router/UserRouter")
  const Roouter = require("./Router/ProjectRouter")


  app.use("/user", Router)
  app.use ("/project",Roouter)
  

  




  const PaymentRouter = require("./Router/PaymentRouter");

app.use("/api/payments", PaymentRouter);



app.listen(5000, () => {
  console.log("server is running on port 5000");
});