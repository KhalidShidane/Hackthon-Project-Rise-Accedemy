const Proposal = require("../Model/Proposal");
const Project = require("../Model/Project");
const create = async (req, res) => {
  try { const project = await Project.findById(req.body.project); if (!project?.client) return res.status(400).json({ message: "Project client is missing" }); const proposal = await Proposal.create({ ...req.body, freelancer: req.user.userId, client: project.client }); res.status(201).json({ message: "Proposal sent", proposal }); }
  catch (error) { res.status(400).json({ message: error.message }); }
};
const forCompany = async (req, res) => res.json(await Proposal.find({ client: req.user.userId }).populate("freelancer", "name profileImage skills").populate("project", "name").sort({ createdAt: -1 }));
const updateStatus = async (req, res) => { const proposal = await Proposal.findOneAndUpdate({ _id: req.params.id, client: req.user.userId }, { status: req.body.status }, { new: true, runValidators: true }); if (!proposal) return res.status(404).json({ message: "Proposal not found" }); res.json(proposal); };
module.exports = { create, forCompany, updateStatus };
