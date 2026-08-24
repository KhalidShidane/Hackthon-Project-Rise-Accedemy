const mongoose = require("mongoose");

const adminActivitySchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true, trim: true },
  targetType: { type: String, required: true, trim: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  description: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model("AdminActivity", adminActivitySchema);
