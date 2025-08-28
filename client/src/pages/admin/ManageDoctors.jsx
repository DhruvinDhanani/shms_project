import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
  });

  const token = sessionStorage.getItem("token"); // sessionStorage token

  // Fetch all doctors
  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/doctors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Add Doctor
  const handleAddDoctor = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/doctors", newDoctor, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewDoctor({ name: "", email: "", phone: "", qualification: "" });
      fetchDoctors();
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  // Delete Doctor
  const handleDeleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/doctors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDoctors();
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  // Update Doctor phone (editable)
  const handleUpdateDoctor = async (id, phone) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/doctors/${id}`,
        { phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDoctors();
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Manage Doctors</h1>

      {/* Add Doctor Form */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newDoctor.name}
          onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newDoctor.email}
          onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          type="text"
          placeholder="Phone"
          value={newDoctor.phone}
          onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          type="text"
          placeholder="Qualification"
          value={newDoctor.qualification}
          onChange={(e) => setNewDoctor({ ...newDoctor, qualification: e.target.value })}
          className="border p-1 mr-2"
        />
        <button className="bg-green-500 text-white px-3 py-1" onClick={handleAddDoctor}>
          Add Doctor
        </button>
      </div>

      {/* Doctors Table */}
      <table className="border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Phone</th>
            <th className="border px-2 py-1">Qualification</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc._id}>
              <td className="border px-2 py-1">{doc.name}</td>
              <td className="border px-2 py-1">{doc.email}</td>
              <td className="border px-2 py-1">
                <input
                  type="text"
                  defaultValue={doc.phone}
                  onBlur={(e) => handleUpdateDoctor(doc._id, e.target.value)}
                  className="border p-1 w-full"
                />
              </td>
              <td className="border px-2 py-1">{doc.qualification}</td>
              <td className="border px-2 py-1">
                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => handleDeleteDoctor(doc._id)}
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

export default ManageDoctors;
  