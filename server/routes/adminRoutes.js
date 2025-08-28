// const express = require("express");
// const Doctor = require("../models/Doctor");
// const Nurse = require("../models/Nurse");
// const User = require("../models/User");
// const router = express.Router();

// // ---- Doctors ----
// router.get("/doctors", async (req, res) => {
//   const docs = await Doctor.find();
//   res.json(docs);
// });

// router.post("/doctors", async (req, res) => {
//   try {
//     const doc = await Doctor.create(req.body);
//     res.json(doc);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// router.put("/doctors/:id", async (req, res) => {
//   const doc = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(doc);
// });

// router.delete("/doctors/:id", async (req, res) => {
//   await Doctor.findByIdAndDelete(req.params.id);
//   res.json({ message: "Doctor deleted" });
// });

// // ---- Nurses ----
// router.get("/nurses", async (req, res) => {
//   const nurses = await Nurse.find();
//   res.json(nurses);
// });

// router.post("/nurses", async (req, res) => {
//   try {
//     const nurse = await Nurse.create(req.body);
//     res.json(nurse);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// router.put("/nurses/:id", async (req, res) => {
//   const nurse = await Nurse.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(nurse);
// });

// router.delete("/nurses/:id", async (req, res) => {
//   await Nurse.findByIdAndDelete(req.params.id);
//   res.json({ message: "Nurse deleted" });
// });

// // ---- Patients ----
// router.get("/patients", async (req, res) => {
//   const patients = await User.find({ role: "patient" });
//   res.json(patients);
// });

// router.put("/patients/:id", async (req, res) => {
//   const patient = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(patient);
// });

// router.delete("/patients/:id", async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "Patient deleted" });
// });

// module.exports = router;




const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getNurses,
  createNurse,
  updateNurse,
  deleteNurse,
  getPatients,
  createPatient,   // <-- ADD THIS
  updatePatient,
  deletePatient
} = require("../controllers/adminController");

const router = express.Router();

// Doctors
router.get("/doctors", protect, admin, getDoctors);
router.post("/doctors", protect, admin, createDoctor);
router.put("/doctors/:id", protect, admin, updateDoctor);
router.delete("/doctors/:id", protect, admin, deleteDoctor);

// Nurses
router.get("/nurses", protect, admin, getNurses);
router.post("/nurses", protect, admin, createNurse);
router.put("/nurses/:id", protect, admin, updateNurse);
router.delete("/nurses/:id", protect, admin, deleteNurse);

// Patients
router.get("/patients", protect, admin, getPatients);
router.post("/patients", protect, admin, createPatient);
router.put("/patients/:id", protect, admin, updatePatient);
router.delete("/patients/:id", protect, admin, deletePatient);

module.exports = router;

