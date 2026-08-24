const Invitation = require("../Model/Invitation");
const User = require("../Model/UserScheeme");

exports.createInvitation = async (req, res) => {
  try {
    const { freelancerId, job, message = "" } = req.body;
    if (!freelancerId || !job) return res.status(400).json({ message: "Freelancer and job are required" });

    const freelancer = await User.findOne({ _id: freelancerId, role: "freelancer" });
    if (!freelancer) return res.status(404).json({ message: "Freelancer not found" });

    const invitation = await Invitation.create({ freelancer: freelancerId, job, message });
    res.status(201).json({ message: "Invitation sent successfully", invitation });
  } catch (error) {
    res.status(400).json({ message: "Unable to send invitation" });
  }
};
