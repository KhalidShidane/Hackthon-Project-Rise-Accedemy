const express = require("express");
const { createContactMessage, getContactMessages, markContactMessageRead, deleteContactMessage } = require("../Controller/ContactMessageController");

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", getContactMessages);
router.put("/:id/read", markContactMessageRead);
router.delete("/:id", deleteContactMessage);

module.exports = router;
