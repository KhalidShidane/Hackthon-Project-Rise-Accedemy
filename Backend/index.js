const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Images folder
app.use("/images", express.static(path.join(__dirname, "images")));

// Routers
const UserRouter = require("./Router/UserRouter");
const ProjectRouter = require("./Router/ProjectRouter");
const PaymentRouter = require("./Router/PaymentRouter");
const MessageRouter = require("./Router/MessageRouter");
const ReviewRouter = require("./Router/ReviewRouter");
const ContractRouter = require("./Router/ContractRouter");

// Routes
app.use("/user", UserRouter);
app.use("/project", ProjectRouter);
app.use("/messages", MessageRouter);
app.use("/api/payments", PaymentRouter);
app.use("/api/reviews", ReviewRouter);
app.use("/api/contracts", ContractRouter);

// Error handler
app.use((error, req, res, next) => {
  console.error(error);

  res.status(400).json({
    message: error.message || "Request failed",
  });
});

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/Hackthone")
  .then(() => {
    console.log("Connected to database");

    // Start server after database connection
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });