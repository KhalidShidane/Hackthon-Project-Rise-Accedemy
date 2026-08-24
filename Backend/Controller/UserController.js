const UserScheme = require("../Model/UserScheeme");

const create = async (req, res) => {
  try {
    const newUser = await UserScheme.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      profileImage: req.body.profileImage,
      bio: req.body.bio,
      phone: req.body.phone,
      location: req.body.location,
      skills: req.body.skills,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log("FULL ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const read = async (req, res) => {
  try {
    const users = await UserScheme.find();

    res.status(200).json(users);
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

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
    console.log("ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getsingle = async (req, res) => {
  try {
    const user = await UserScheme.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const user = await UserScheme.findByIdAndUpdate(
      req.params.id,
      req.body,
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

    res.status(200).json(user);
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  create,
  read,
  deleteUser,
  getsingle,
  update,
};