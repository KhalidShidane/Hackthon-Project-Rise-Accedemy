const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");

<<<<<<< HEAD
const UserRouter = require("./Router/UserRouter");
const ProjectRouter = require("./Router/ProjectRouter");
const PaymentRouter = require("./Router/PaymentRouter");
=======
const app = express();

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

mongoose.connect("mongodb://localhost:27017/Hackthone").then(() => {
    console.log("connected to database");
  })  .catch((err) => {
    console.log(err);
  });

  
const Router = require("./Router/UserRouter");
const ProjectRouter = require("./Router/ProjectRouter");

app.use("/user", Router);
app.use("/project", ProjectRouter);


const PaymentRouter = require("./Router/PaymentRouter");

app.use("/api/payments", PaymentRouter);


>>>>>>> 843ffd3171f55a440c18ce8b6beb4bc07f2f9f16
const MessageRouter = require("./Router/MessageRouter");

app.use("/api/messages", MessageRouter);

const ContactMessageRouter = require("./Router/ContactMessageRouter");

app.use("/api/contact-messages", ContactMessageRouter);


const ReviewRouter = require("./Router/ReviewRouter");

app.use("/api/reviews", ReviewRouter);


const ContractRouter = require("./Router/ContractRouter");

app.use("/api/contracts", ContractRouter);

app.use((error, req, res, next) => {
  if (error.name === "MulterError") {
    return res.status(400).json({ message: error.message });
  }
  res.status(400).json({ message: error.message || "Request failed" });
});



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
