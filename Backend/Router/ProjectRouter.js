const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("../Controller/ProjectController");


router.post("/", upload.single("image"), createProject);


router.get("/", getProjects);


router.get("/:id", getProject);


router.put("/:id", updateProject);


router.delete("/:id", deleteProject);

module.exports = router;
