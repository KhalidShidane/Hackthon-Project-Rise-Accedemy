const router = require("express").Router();
const controller = require("../Controller/ProposalController");
const { authenticate, allowRoles } = require("../middleware/auth");
router.post("/", authenticate, allowRoles("freelancer"), controller.create);
router.get("/company", authenticate, allowRoles("client"), controller.forCompany);
router.patch("/:id/status", authenticate, allowRoles("client"), controller.updateStatus);
module.exports = router;
