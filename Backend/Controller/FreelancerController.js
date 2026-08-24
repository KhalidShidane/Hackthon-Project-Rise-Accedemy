const User = require("../Model/UserScheeme");

// Return only profile fields that are safe to display publicly.
const toFreelancerProfile = (user) => ({
  id: user._id,
  name: user.name,
  title: user.skills?.[0] || "Freelance Professional",
  image: user.profileImage ? `/images/${user.profileImage}` : "",
  description: user.bio || "Somali freelance professional available for new projects.",
  skills: user.skills || [],
  location: user.location || "Somalia",
  hourlyRate: 20,
  rating: 0,
  jobsCompleted: 0,
  verified: false,
  category: "Software Development",
});

exports.getFreelancers = async (_req, res) => {
  try {
    const users = await User.find({ role: "freelancer" }).select("name profileImage bio skills location");
    res.json({ freelancers: users.map(toFreelancerProfile) });
  } catch (error) {
    res.status(500).json({ message: "Unable to load freelancers" });
  }
};

exports.getFreelancerById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, role: "freelancer" }).select("name profileImage bio skills location");
    if (!user) return res.status(404).json({ message: "Freelancer not found" });
    res.json({ freelancer: toFreelancerProfile(user) });
  } catch (error) {
    res.status(400).json({ message: "Invalid freelancer id" });
  }
};
