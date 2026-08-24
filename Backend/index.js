const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

mongoose.connect("mongodb://localhost:27017/Hackthone")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("Database connection failed:", error.message));
  
const UserRouter = require("./Router/UserRouter");
const ProjectRouter = require("./Router/ProjectRouter");
const ContractRouter = require("./Router/ContractRouter");
const ReviewRouter = require("./Router/ReviewRouter");
const MessageRouter = require("./Router/MessageRouter");
const PaymentRouter = require("./Router/PaymentRouter");

app.use("/api/payments", PaymentRouter);
app.use("/user", UserRouter);
app.use("/project", ProjectRouter);
app.use("/messages", MessageRouter);
app.use("/api/reviews", ReviewRouter);
app.use("/api/contracts", ContractRouter);

app.use((error, _req, res, _next) => {
  res.status(400).json({ message: error.message || "Request failed" });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
