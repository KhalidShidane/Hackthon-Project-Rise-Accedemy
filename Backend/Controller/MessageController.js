const Message = require("../Model/MessageScheme");

const create = async (req, res) => {
  try {
    const { name, email, subject, message, project, receiver } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "Name, email, subject, and message are required." });
    }

    const newMessage = await Message.create({ name, email, subject, message, project, receiver });
    return res.status(201).json({ message: "Message sent successfully.", data: newMessage });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send message.", error: error.message });
  }
};

const read = async (_req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get messages.", error: error.message });
  }
};

const getsingle = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found." });
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get message.", error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!message) return res.status(404).json({ message: "Message not found." });
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update message.", error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found." });
    return res.status(200).json({ message: "Message deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete message.", error: error.message });
  }
};

module.exports = { create, read, getsingle, update, deleteMessage };
