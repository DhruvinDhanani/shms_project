import React, { useEffect, useState } from "react";
import axios from "axios";

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const token = sessionStorage.getItem("token"); // sessionStorage token

  // Fetch all patients
  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Update patient phone or disease
  const handleUpdatePatient = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/patients/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPatients();
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  // Delete patient
  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/patients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPatients();
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">All Patients</h1>

      <table className="border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Phone</th>
            <th className="border px-2 py-1">Disease</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td className="border px-2 py-1">{patient.name}</td>
              <td className="border px-2 py-1">{patient.email}</td>
              <td className="border px-2 py-1">
                <input
                  type="text"
                  defaultValue={patient.phone}
                  onBlur={(e) =>
                    handleUpdatePatient(patient._id, { phone: e.target.value })
                  }
                  className="border p-1 w-full"
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  type="text"
                  defaultValue={patient.disease}
                  onBlur={(e) =>
                    handleUpdatePatient(patient._id, { disease: e.target.value })
                  }
                  className="border p-1 w-full"
                />
              </td>
              <td className="border px-2 py-1">
                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => handleDeletePatient(patient._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPatients;
