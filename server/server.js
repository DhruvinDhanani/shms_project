// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require('cors');
// const connectDB = require("./config/db");
// const app = require("./app"); 
// require('dotenv').config();
// const mongoose = require('mongoose');

// dotenv.config();

// // Connect to DB
// connectDB();

// const userRoutes = require('./routes/userRoutes');
// const adminRoutes = require('./routes/adminRoutes');

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.json());


// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// app.use('/api/users', userRoutes);
// app.use('/api/admin', adminRoutes);

// // Error Handling middleware
// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { protect, adminOnly } = require("./middleware/authMiddleware"); // we'll add adminOnly below
const { getPatients, createPatient } = require("./controllers/adminController");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("API is running..."));

// public & protected routing
app.use("/api/users", userRoutes);
app.use("/api/admin", protect, adminOnly, adminRoutes); // admin must be protected
console.log(getPatients,createPatient);

// central error handler (simple)
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
