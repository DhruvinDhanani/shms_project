const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  const hashed = await bcrypt.hash("123456", 10);
  await User.create({
    name: "Admin",
    email: "admin@gmail.com",
    password: hashed,
    role: "admin",
  });
  console.log("seeded");
  process.exit();
}
seed();
