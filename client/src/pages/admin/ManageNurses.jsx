import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageNurses = () => {
  const [nurses, setNurses] = useState([]);
  const [newNurse, setNewNurse] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
  });

  const token = sessionStorage.getItem("token"); // sessionStorage token

  // Fetch all nurses
  const fetchNurses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/nurses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNurses(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchNurses();
  }, []);

  // Add Nurse
  const handleAddNurse = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/nurses", newNurse, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewNurse({ name: "", email: "", phone: "", qualification: "" });
      fetchNurses();
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  // Delete Nurse
  const handleDeleteNurse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/nurses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNurses();
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  // Update Nurse phone (editable)
  const handleUpdateNurse = async (id, phone) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/nurses/${id}`,
        { phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchNurses();
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Manage Nurses</h1>

      {/* Add Nurse Form */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newNurse.name}
          onChange={(e) => setNewNurse({ ...newNurse, name: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newNurse.email}
          onChange={(e) => setNewNurse({ ...newNurse, email: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          type="text"
          placeholder="Phone"
          value={newNurse.phone}
          onChange={(e) => setNewNurse({ ...newNurse, phone: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          type="text"
          placeholder="Qualification"
          value={newNurse.qualification}
          onChange={(e) => setNewNurse({ ...newNurse, qualification: e.target.value })}
          className="border p-1 mr-2"
        />
        <button className="bg-green-500 text-white px-3 py-1" onClick={handleAddNurse}>
          Add Nurse
        </button>
      </div>

      {/* Nurses Table */}
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
          {nurses.map((nurse) => (
            <tr key={nurse._id}>
              <td className="border px-2 py-1">{nurse.name}</td>
              <td className="border px-2 py-1">{nurse.email}</td>
              <td className="border px-2 py-1">
                <input
                  type="text"
                  defaultValue={nurse.phone}
                  onBlur={(e) => handleUpdateNurse(nurse._id, e.target.value)}
                  className="border p-1 w-full"
                />
              </td>
              <td className="border px-2 py-1">{nurse.qualification}</td>
              <td className="border px-2 py-1">
                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => handleDeleteNurse(nurse._id)}
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

export default ManageNurses;
