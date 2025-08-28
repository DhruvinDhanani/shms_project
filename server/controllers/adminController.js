const User = require("../models/User");

// -------------------- Doctors --------------------
const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
};

const createDoctor = async (req, res) => {
  try {
    const doctor = new User({ ...req.body, role: "doctor" });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error creating doctor" });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const doctor = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor" });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor" });
  }
};

// -------------------- Nurses --------------------
const getNurses = async (req, res) => {
  try {
    const nurses = await User.find({ role: "nurse" });
    res.json(nurses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching nurses" });
  }
};

const createNurse = async (req, res) => {
  try {
    const nurse = new User({ ...req.body, role: "nurse" });
    await nurse.save();
    res.status(201).json(nurse);
  } catch (error) {
    res.status(500).json({ message: "Error creating nurse" });
  }
};

const updateNurse = async (req, res) => {
  try {
    const nurse = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(nurse);
  } catch (error) {
    res.status(500).json({ message: "Error updating nurse" });
  }
};

const deleteNurse = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Nurse deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting nurse" });
  }
};

// -------------------- Patients --------------------
const getPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients" });
  }
};

const createPatient = async (req, res) => {
  try {
    const patient = new User({ ...req.body, role: "patient" });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error creating patient" });
  }
};

const updatePatient = async (req, res) => {
  try {
    const patient = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error updating patient" });
  }
};

const deletePatient = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting patient" });
  }
};

// -------------------- Export --------------------
module.exports = {
  // Doctors
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,

  // Nurses
  getNurses,
  createNurse,
  updateNurse,
  deleteNurse,

  // Patients
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
};
