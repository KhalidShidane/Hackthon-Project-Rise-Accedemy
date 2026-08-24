const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    bid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
    },

    amount: {
      type: Number,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "active", "completed", "cancelled"],
      default: "pending",
    },

    startDate: {
      type: Date,
      default: null,
    },

    endDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contract", contractSchema);