const mongoose = require("mongoose");

const express = require('express')
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

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
const MessageRouter = require("./Router/MessageRouter");

app.use("/api/payments", PaymentRouter);
app.use("/messages", MessageRouter);



app.listen(5000, () => {
  console.log("server is running on port 5000");
});
