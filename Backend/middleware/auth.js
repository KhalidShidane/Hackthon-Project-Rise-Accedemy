const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Authentication required" });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET || "change-this-development-secret"); next(); }
  catch { res.status(401).json({ message: "Invalid or expired token" }); }
};

const allowRoles = (...roles) => (req, res, next) => roles.includes(req.user.role) ? next() : res.status(403).json({ message: "Not authorized" });
module.exports = { authenticate, allowRoles };
