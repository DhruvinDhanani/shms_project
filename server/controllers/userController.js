const User = require("../models/User");
const jwt = require("jsonwebtoken");

// 🔑 Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// 📌 Register User
exports.registerUser = async (req, res) => {
  const { name, email, password, phone, role, qualification, disease } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ 
      name, email, password, phone, role, qualification, disease 
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role)
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Get All Users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Update User
exports.updateUser = async (req, res) => {
  exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // If password is being updated, use save() to trigger hashing
    if (req.body.password) {
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      // update allowed fields
      const fields = ["name", "email", "phone", "role", "qualification", "disease", "password"];
      fields.forEach(f => {
        if (req.body[f] !== undefined) user[f] = req.body[f];
      });

      await user.save(); // triggers pre('save') -> hashes password
      return res.json(user);
    }

    // no password: safe to use findByIdAndUpdate
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

};

// 📌 Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
