// hash.js
const bcrypt = require("bcryptjs");

async function generateHash() {
  const hashed = await bcrypt.hash("123456", 10);
  console.log(hashed);
}

generateHash();
