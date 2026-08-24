const User = require("../Model/UserScheeme");
const Project = require("../Model/Project");
const Proposal = require("../Model/Proposal");
const Payment = require("../Model/PaymentScheme");
const Review = require("../Model/ReviewScheme");
const Message = require("../Model/MessageScheme");
const AdminActivity = require("../Model/AdminActivity");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const safeUser = (user) => {
  const object = user.toObject ? user.toObject() : user;
  const { password, ...safe } = object;
  return safe;
};
const tokenFor = (user) => jwt.sign({ userId: user._id.toString(), role: user.role }, process.env.JWT_SECRET || "change-this-development-secret", { expiresIn: "7d" });
const log = (admin, action, targetType, targetId, description) => AdminActivity.create({ admin, action, targetType, targetId, description });
const list = (Model, populate = "") => async (_req, res) => {
  try { let query = Model.find().sort({ createdAt: -1 }); if (populate) query = query.populate(populate); res.json({ items: await query }); }
  catch { res.status(500).json({ message: "Unable to load records" }); }
};

exports.login = async (req, res) => {
  try {
    const { identity, password } = req.body;
    if (!identity || !password) return res.status(400).json({ message: "Email or username and password are required" });
    const value = identity.trim().toLowerCase();
    const user = await User.findOne({ $or: [{ email: value }, { username: value }] });
    if (!user || user.role !== "admin" || user.status !== "active" || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Invalid administrator credentials" });
    user.lastLogin = new Date(); await user.save();
    res.json({ message: "Login successful", token: tokenFor(user), user: safeUser(user) });
  } catch { res.status(500).json({ message: "Unable to log in" }); }
};

exports.dashboard = async (_req, res) => {
  try {
    const [users, freelancers, clients, activeFreelancers, activeClients, pendingUsers, projects, activeProjects, completedProjects, proposals, payments, revenue, recentActivity] = await Promise.all([
      User.countDocuments(), User.countDocuments({ role: "freelancer" }), User.countDocuments({ role: { $in: ["client", "company"] } }),
      User.countDocuments({ role: "freelancer", status: "active" }), User.countDocuments({ role: { $in: ["client", "company"] }, status: "active" }), User.countDocuments({ status: "pending" }),
      Project.countDocuments(), Project.countDocuments({ status: "Available" }), Project.countDocuments({ status: "Not Available" }), Proposal.countDocuments({ status: "pending" }),
      Payment.countDocuments(), Payment.aggregate([{ $match: { status: "paid" } }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
      AdminActivity.find().sort({ createdAt: -1 }).limit(6).populate("admin", "name")
    ]);
    res.json({ stats: { users, freelancers, clients, activeFreelancers, activeClients, pendingUsers, projects, activeProjects, completedProjects, pendingProposals: proposals, payments, revenue: revenue[0]?.total || 0 }, recentActivity });
  } catch { res.status(500).json({ message: "Unable to load dashboard data" }); }
};

exports.users = async (req, res) => {
  try { const filter = {}; if (req.query.role === "clients") filter.role = { $in: ["client", "company"] }; else if (req.query.role) filter.role = req.query.role; const users = await User.find(filter).select("-password").sort({ createdAt: -1 }); res.json({ users }); }
  catch { res.status(500).json({ message: "Unable to load users" }); }
};
exports.clients = async (_req, res) => {
  try {
    const clients = await User.aggregate([
      { $match: { role: { $in: ["client", "company"] } } },
      { $lookup: { from: "projects", localField: "_id", foreignField: "client", as: "projects" } },
      {
        $addFields: {
          status: { $ifNull: ["$status", "active"] },
          projectCount: { $size: "$projects" },
          activeProjectCount: {
            $size: {
              $filter: { input: "$projects", as: "project", cond: { $eq: ["$$project.status", "Available"] } },
            },
          },
        },
      },
      { $project: { password: 0, projects: 0 } },
      { $sort: { createdAt: -1 } },
    ]);
    res.json({ clients });
  } catch { res.status(500).json({ message: "Unable to load clients" }); }
};
exports.profile = async (req, res) => { const user = await User.findById(req.user.userId).select("-password"); res.json({ user }); };
exports.updateProfile = async (req, res) => {
  try { const { name, email, username, password } = req.body; const user = await User.findById(req.user.userId); if (!user) return res.status(404).json({ message: "Administrator not found" }); if (name) user.name = name; if (email) user.email = email.trim().toLowerCase(); if (username) user.username = username.trim().toLowerCase(); if (password) { if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" }); user.password = await bcrypt.hash(password, 12); } await user.save(); res.json({ user: safeUser(user), token: tokenFor(user) }); } catch (error) { res.status(400).json({ message: error.code === 11000 ? "Email or username is already in use" : "Unable to save settings" }); }
};
exports.freelancers = async (_req, res) => {
  try {
    const freelancers = await User.aggregate([
      { $match: { role: "freelancer" } },
      { $lookup: { from: "proposals", localField: "_id", foreignField: "freelancer", as: "proposals" } },
      { $addFields: {
        status: { $ifNull: ["$status", "active"] },
        proposalCount: { $size: "$proposals" },
        acceptedProposalCount: { $size: { $filter: { input: "$proposals", as: "proposal", cond: { $eq: ["$$proposal.status", "accepted"] } } } },
      } },
      { $project: { password: 0, proposals: 0 } },
      { $sort: { createdAt: -1 } },
    ]);
    res.json({ freelancers });
  } catch { res.status(500).json({ message: "Unable to load freelancers" }); }
};
exports.user = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); if (!user) return res.status(404).json({ message: "User not found" });
    const [projects, proposals, payments, reviews, messages, activity] = await Promise.all([
      Project.countDocuments({ client: user._id }), Proposal.countDocuments({ $or: [{ freelancer: user._id }, { client: user._id }] }), Payment.countDocuments({ recipient: user._id }),
      Review.countDocuments({ $or: [{ reviewer: user._id }, { reviewee: user._id }] }), Message.countDocuments({ receiver: user._id }), AdminActivity.find({ targetId: user._id }).sort({ createdAt: -1 }).limit(10).populate("admin", "name")
    ]);
    res.json({ user, activity, counts: { projects, proposals, payments, reviews, messages } });
  } catch { res.status(500).json({ message: "Unable to load user" }); }
};
exports.changeUserStatus = async (req, res) => {
  try {
    const { status } = req.body; if (!['active','pending','suspended','blocked'].includes(status)) return res.status(400).json({ message: "Invalid status" });
    const user = await User.findById(req.params.id); if (!user) return res.status(404).json({ message: "User not found" });
    if (user._id.toString() === req.user.userId) return res.status(400).json({ message: "You cannot change your own status" });
    user.status = status; await user.save(); await log(req.user.userId, `Changed user status to ${status}`, "user", user._id, `${user.name}'s account was marked ${status}`); res.json({ user: safeUser(user) });
  } catch { res.status(500).json({ message: "Unable to update user status" }); }
};
exports.deleteUser = async (req, res) => {
  try { const user = await User.findById(req.params.id); if (!user) return res.status(404).json({ message: "User not found" }); if (user._id.toString() === req.user.userId || user.role === "admin") return res.status(400).json({ message: "Administrator accounts cannot be deleted here" }); await User.deleteOne({ _id: user._id }); await log(req.user.userId, "Deleted user", "user", user._id, `Deleted ${user.name}'s account`); res.json({ message: "User deleted" }); }
  catch { res.status(500).json({ message: "Unable to delete user" }); }
};
exports.projects = list(Project, "client");
exports.createProject = async (req, res) => {
  try {
    const { name, description, category, skills, Budget, deadline, status, client } = req.body;
    if (!name || !description || !category || !skills || !Budget || !deadline) return res.status(400).json({ message: "Please complete all required project fields" });
    const project = await Project.create({ name, description, category, skills, Budget, deadline, status: status || "Pending", client: client || null, image: req.file ? req.file.filename : "" });
    await log(req.user.userId, "Created project", "project", project._id, `Created project: ${project.name}`);
    res.status(201).json({ project: await project.populate("client", "name email profileImage") });
  } catch { res.status(500).json({ message: "Unable to create project" }); }
};
exports.updateProject = async (req, res) => {
  try {
    const allowed = ["name", "description", "category", "skills", "Budget", "deadline", "status", "client"];
    const update = Object.fromEntries(allowed.filter((key) => req.body[key] !== undefined).map((key) => [key, req.body[key]]));
    if (req.file) update.image = req.file.filename;
    const project = await Project.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true }).populate("client", "name email profileImage");
    if (!project) return res.status(404).json({ message: "Project not found" });
    await log(req.user.userId, "Updated project", "project", project._id, `Updated project: ${project.name}`);
    res.json({ project });
  } catch { res.status(500).json({ message: "Unable to update project" }); }
};
exports.deleteProject = async (req, res) => {
  try { const project = await Project.findByIdAndDelete(req.params.id); if (!project) return res.status(404).json({ message: "Project not found" }); await log(req.user.userId, "Deleted project", "project", project._id, `Deleted project: ${project.name}`); res.json({ message: "Project deleted" }); }
  catch { res.status(500).json({ message: "Unable to delete project" }); }
};
exports.proposals = list(Proposal, "freelancer client project");
exports.updateProposalStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "accepted", "rejected"].includes(status)) return res.status(400).json({ message: "Invalid proposal status" });
    const proposal = await Proposal.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true }).populate("freelancer client project", "name email");
    if (!proposal) return res.status(404).json({ message: "Proposal not found" });
    await log(req.user.userId, `Changed proposal status to ${status}`, "proposal", proposal._id, `Updated proposal for ${proposal.project?.name || "a project"}`);
    res.json({ proposal });
  } catch { res.status(500).json({ message: "Unable to update proposal" }); }
};
exports.payments = list(Payment, "recipient project");
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "paid", "failed", "refunded"].includes(status)) return res.status(400).json({ message: "Invalid payment status" });
    const update = { status, paidAt: status === "paid" ? new Date() : null };
    const payment = await Payment.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true }).populate("recipient project", "name email");
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    await log(req.user.userId, `Changed payment status to ${status}`, "payment", payment._id, `Updated payment ${payment.transactionId || payment._id}`);
    res.json({ payment });
  } catch { res.status(500).json({ message: "Unable to update payment" }); }
};
exports.reviews = list(Review, "reviewer reviewee contract");
exports.messages = list(Message, "receiver project");
exports.activity = list(AdminActivity, "admin");
