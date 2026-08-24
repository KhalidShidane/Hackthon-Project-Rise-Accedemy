const UserScheme = require("../Model/UserScheeme");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const publicUser = (user) => {
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

const createToken = (user) =>
  jwt.sign(
    { userId: user._id.toString(), role: user.role },
    process.env.JWT_SECRET || "change-this-development-secret",
    { expiresIn: "7d" }
  );

const signup = async (req, res) => {
  try {
    const { name, email, password, role = "client", companyName, businessType, website, bio, phone, location, skills } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    if (!["client", "company", "freelancer"].includes(role)) {
      return res.status(400).json({ message: "Role must be company, client, or freelancer" });
    }

    if (role === "client" && (!companyName || !businessType)) {
      return res.status(400).json({ message: "Company name and business type are required for clients" });
    }

    if (role === "freelancer" && (!bio || !skills)) {
      return res.status(400).json({ message: "Description and skills are required for freelancers" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await UserScheme.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await UserScheme.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
      companyName: role === "client" ? companyName : "",
      businessType: role === "client" ? businessType : "",
      website: role === "client" ? website || "" : "",
      bio: role === "freelancer" ? bio : "",
      phone: phone || "",
      location: location || "",
      skills: role === "freelancer" && skills
        ? skills.split(",").map((skill) => skill.trim()).filter(Boolean)
        : [],
    });

    res.status(201).json({
      message: "Account created successfully",
      token: createToken(user),
      user: publicUser(user),
    });
  } catch (error) {
    console.log("SIGNUP ERROR:", error);
    res.status(500).json({ message: "Unable to create account" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await UserScheme.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.status && user.status !== "active") {
      return res.status(403).json({ message: "This account is not currently active" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      message: "Login successful",
      token: createToken(user),
      user: publicUser(user),
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ message: "Unable to log in" });
  }
};

// CREATE USER
const create = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const newUser = await UserScheme.create({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
      role: req.body.role,
      profileImage: req.file ? req.file.filename : "",
      bio: req.body.bio,
      phone: req.body.phone,
      location: req.body.location,

      // Haddii skills ay string ahaan ka timaado form-data
      skills: req.body.skills
        ? Array.isArray(req.body.skills)
          ? req.body.skills
          : req.body.skills.split(",").map((skill) => skill.trim())
        : [],
    });

    res.status(201).json({
      message: "User created successfully",
      user: publicUser(newUser),
    });
  } catch (error) {
    console.log("FULL ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL USERS
const read = async (req, res) => {
  try {
    const users = await UserScheme.find().select("-password");

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.log("READ ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE USER
const getsingle = async (req, res) => {
  try {
    const user = await UserScheme.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.log("GET SINGLE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE USER
const update = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    // Haddii image cusub la soo diro
    if (req.file) {
      updateData.profileImage = req.file.filename;
    }

    // Skills haddii form-data string ahaan timaado
    if (req.body.skills) {
      updateData.skills = Array.isArray(req.body.skills)
        ? req.body.skills
        : req.body.skills.split(",").map((skill) => skill.trim());
    }

    const user = await UserScheme.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: publicUser(user),
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const user = await UserScheme.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user: publicUser(user),
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  create,
  read,
  getsingle,
  update,
  deleteUser,
};
