import React, { useEffect, useState } from "react";
import API from "../../utils/axios";

const ManageNurse = () => {
  const [nurses, setNurses] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", qualification: "" });

  const fetchNurses = async () => {
    try {
      const { data } = await API.get("/api/nurses");
      setNurses(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/nurses", form);
      setForm({ name: "", email: "", qualification: "" });
      fetchNurses();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNurse = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/api/nurses/${id}`);
      fetchNurses();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNurses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Nurses</h1>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-x-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Qualification"
          className="border p-2 rounded"
          value={form.qualification}
          onChange={(e) => setForm({ ...form, qualification: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Nurse
        </button>
      </form>

      {/* Nurse List */}
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Qualification</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {nurses.map((nurse) => (
            <tr key={nurse._id}>
              <td className="border p-3">{nurse.name}</td>
              <td className="border p-3">{nurse.email}</td>
              <td className="border p-3">{nurse.qualification}</td>
              <td className="border p-3">
                <button
                  onClick={() => deleteNurse(nurse._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md"
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

export default ManageNurse;
