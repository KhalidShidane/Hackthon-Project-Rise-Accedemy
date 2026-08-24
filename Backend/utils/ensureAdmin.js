const bcrypt = require("bcryptjs");
const User = require("../Model/UserScheeme");

// A first-use account is created only for local development. Production must
// explicitly provide ADMIN_EMAIL and ADMIN_PASSWORD environment variables.
async function ensureAdmin() {
  const isProduction = process.env.NODE_ENV === "production";
  const email = process.env.ADMIN_EMAIL || (isProduction ? "" : "admin@freelancerhub.so");
  const password = process.env.ADMIN_PASSWORD || (isProduction ? "" : "Admin@12345");
  if (!email || !password) return;

  const username = process.env.ADMIN_USERNAME || "admin";
  const existingAdmin = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username }], role: "admin" });
  if (existingAdmin) return;

  // Do not alter a client/company that happens to use the preferred email.
  // A distinct admin address keeps all existing accounts intact.
  const emailInUse = await User.exists({ email: email.toLowerCase() });
  const adminEmail = emailInUse ? "system.admin@freelancerhub.so" : email.toLowerCase();
  await User.create({
    name: "Freelancer Hub Administrator",
    username,
    email: adminEmail,
    password: await bcrypt.hash(password, 12),
    role: "admin",
    status: "active",
  });
  console.log(`Initial administrator created for ${adminEmail}`);
}
module.exports = ensureAdmin;
