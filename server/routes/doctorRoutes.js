const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const auth = require("../middleware/auth");
const authMiddleware = require("../middleware/auth");

// Protected route
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: `Welcome Doctor, your ID: ${req.user.id}` });
});

module.exports = router;




// ✅ Get all patients assigned to logged-in doctor
router.get("/mypatients", auth, async (req, res) => {
  try {
    const patients = await Patient.find({ doctor: req.user.id });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Add new patient
router.post("/mypatients", auth, async (req, res) => {
  try {
    const { name, age, gender, disease, status, appointmentDate } = req.body;
    const newPatient = new Patient({
      name,
      age,
      gender,
      disease,
      status,
      appointmentDate,
      doctor: req.user.id,
    });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ message: "Error adding patient" });
  }
});

// ✅ Update patient status
router.put("/mypatients/:id", auth, async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating patient" });
  }
});

module.exports = router;
