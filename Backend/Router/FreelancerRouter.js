const express = require("express");
const { getFreelancers, getFreelancerById } = require("../Controller/FreelancerController");

const router = express.Router();

router.get("/", getFreelancers);
router.get("/:id", getFreelancerById);

module.exports = router;
