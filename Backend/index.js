const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const UserRouter = require("./Router/UserRouter");
const ProjectRouter = require("./Router/ProjectRouter");
const PaymentRouter = require("./Router/PaymentRouter");
const MessageRouter = require("./Router/MessageRouter");
const ReviewRouter = require("./Router/ReviewRouter");
const ContractRouter = require("./Router/ContractRouter");
const FreelancerRouter = require("./Router/FreelancerRouter");
const InvitationRouter = require("./Router/InvitationRouter");

const ProposalRouter = require("./Router/ProposalRouter");
const AdminRouter = require("./Router/AdminRouter");
const ensureAdmin = require("./utils/ensureAdmin");
const ContactMessageRouter = require("./Router/ContactMessageRouter");


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/user", UserRouter);
app.use("/project", ProjectRouter);
app.use("/messages", MessageRouter);
app.use("/api/messages", MessageRouter);
app.use("/api/contact-messages", ContactMessageRouter);
app.use("/api/payments", PaymentRouter);
app.use("/api/reviews", ReviewRouter);
app.use("/api/contracts", ContractRouter);

app.use("/api/freelancers", FreelancerRouter);
app.use("/api/invitations", InvitationRouter);
app.use("/api/proposals", ProposalRouter);
app.use("/api/admin", AdminRouter);


app.use((error, _req, res, _next) => {
  res.status(400).json({ message: error.message || "Request failed" });
});

mongoose
  .connect("mongodb://localhost:27017/Hackthone")
  .then(async () => { console.log("Connected to database"); await ensureAdmin(); })
  .catch((error) => console.error("Database connection failed:", error.message));

app.listen(port, () => console.log(`Server is running on port ${port}`));
