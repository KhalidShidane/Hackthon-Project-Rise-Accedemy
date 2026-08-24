const UserScheme = require("../Model/UserScheeme");

const create = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const newUser = await UserScheme.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
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
      user: newUser,
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
    const users = await UserScheme.find();

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
    const user = await UserScheme.findById(req.params.id);

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
      user,
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
      user,
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  create,
  read,
  getsingle,
  update,
  deleteUser,
};