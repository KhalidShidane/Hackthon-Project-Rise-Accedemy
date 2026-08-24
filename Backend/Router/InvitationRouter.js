const express = require("express");
const { createInvitation } = require("../Controller/InvitationController");

const router = express.Router();

router.post("/", createInvitation);

module.exports = router;
