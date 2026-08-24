const mongoose = require("mongoose");
const proposalSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  proposedBudget: { type: Number, required: true, min: 0 },
  deliveryTime: { type: Number, required: true, min: 1 },
  coverLetter: { type: String, required: true, trim: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
}, { timestamps: true });
proposalSchema.index({ project: 1, freelancer: 1 }, { unique: true });
module.exports = mongoose.model("Proposal", proposalSchema);
