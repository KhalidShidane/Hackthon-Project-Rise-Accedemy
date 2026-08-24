const ContactMessage = require("../Model/ContactMessage");

exports.createContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.create(req.body);
    res.status(201).json({ message: "Contact message sent successfully", item: message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markContactMessageRead = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.status(200).json({ item: message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.status(200).json({ message: "Contact message deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
