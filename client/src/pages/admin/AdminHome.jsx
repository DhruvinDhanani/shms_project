import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminHome = () => {
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [patients, setPatients] = useState([]);
  const token = sessionStorage.getItem("token");

  // Fetch all users by role
  const fetchData = async () => {
    try {
      const doctorRes = await axios.get("http://localhost:5000/api/admin/doctors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(doctorRes.data);

      const nurseRes = await axios.get("http://localhost:5000/api/admin/nurses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNurses(nurseRes.data);

      const patientRes = await axios.get("http://localhost:5000/api/admin/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(patientRes.data);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Admin Dashboard</h1>

      {/* Doctors Table */}
      <section className="mb-6">
        <h2 className="text-2xl mb-2">Doctors</h2>
        <table className="border w-full mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Phone</th>
              <th className="border px-2 py-1">Qualification</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc._id}>
                <td className="border px-2 py-1">{doc.name}</td>
                <td className="border px-2 py-1">{doc.email}</td>
                <td className="border px-2 py-1">{doc.phone}</td>
                <td className="border px-2 py-1">{doc.qualification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Nurses Table */}
      <section className="mb-6">
        <h2 className="text-2xl mb-2">Nurses</h2>
        <table className="border w-full mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Phone</th>
              <th className="border px-2 py-1">Qualification</th>
            </tr>
          </thead>
          <tbody>
            {nurses.map((nurse) => (
              <tr key={nurse._id}>
                <td className="border px-2 py-1">{nurse.name}</td>
                <td className="border px-2 py-1">{nurse.email}</td>
                <td className="border px-2 py-1">{nurse.phone}</td>
                <td className="border px-2 py-1">{nurse.qualification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Patients Table */}
      <section>
        <h2 className="text-2xl mb-2">Patients</h2>
        <table className="border w-full mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Phone</th>
              <th className="border px-2 py-1">Disease</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td className="border px-2 py-1">{patient.name}</td>
                <td className="border px-2 py-1">{patient.email}</td>
                <td className="border px-2 py-1">{patient.phone}</td>
                <td className="border px-2 py-1">{patient.disease}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminHome;
