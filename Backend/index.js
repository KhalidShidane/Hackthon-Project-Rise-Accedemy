const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

<<<<<<< HEAD
const app = express();

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

mongoose.connect("mongodb://localhost:27017/Hackthone").then(() => {
    console.log("connected to database");
  })  .catch((err) => {
    console.log(err);
  });
  
const ContractRouter = require("./Router/PaymentRouter");
  const MessageRouter = require("./Router/PaymentRouter");
  const Router = require("./Router/UserRouter")
  const Roouter = require("./Router/ProjectRouter")
const PaymentRouter = require("./Router/PaymentRouter");
const ReviewRouter = require("./Router/PaymentRouter");

app.use("/api/payments", PaymentRouter);


const MessageRouter = require("./Router/PaymentRouter");

app.use("/api/payments", MessageRouter);


const ReviewRouter = require("./Router/PaymentRouter");

app.use("/api/payments", ReviewRouter);


const ContractRouter = require("./Router/PaymentRouter");

app.use("/api/payments", ContractRouter);
=======
const UserRouter = require("./Router/UserRouter");
const ProjectRouter = require("./Router/ProjectRouter");
const PaymentRouter = require("./Router/PaymentRouter");
const MessageRouter = require("./Router/MessageRouter");
const ReviewRouter = require("./Router/ReviewRouter");
const ContractRouter = require("./Router/ContractRouter");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/user", UserRouter);
app.use("/project", ProjectRouter);
app.use("/messages", MessageRouter);
app.use("/api/payments", PaymentRouter);
app.use("/api/reviews", ReviewRouter);
app.use("/api/contracts", ContractRouter);
>>>>>>> 5038e8f30380e728fc05f45483141096978bdd68

app.use((error, _req, res, _next) => {
  res.status(400).json({ message: error.message || "Request failed" });
});

mongoose
  .connect("mongodb://localhost:27017/Hackthone")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("Database connection failed:", error.message));

app.listen(port, () => console.log(`Server is running on port ${port}`));
