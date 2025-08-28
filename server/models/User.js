const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  phone: { type: String, trim: true },
  role: {
    type: String,
    enum: ["admin", "doctor", "nurse", "patient"],
    required: true,
  },
  qualification: { type: String, trim: true }, // doctors & nurses
  disease: { type: String, trim: true }, // patients
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving if modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Hide password in JSON
userSchema.set("toJSON", {
  transform: function (_doc, ret) {
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: {
//     type: String,
//     enum: ["admin", "doctor", "nurse", "patient"],
//     default: "patient",
//   },
//   qualification: String,
//   disease: String,
//   createdAt: { type: Date, default: Date.now },
// });
// module.exports = mongoose.model("User", userSchema);
