import { useEffect, useState } from "react";
import axios from "axios";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({ name: "", specialization: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch doctors
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/doctors");
    setDoctors(res.data);
  };

  const handleAdd = async () => {
    if (!newDoctor.name || !newDoctor.specialization || !newDoctor.email) return;
    await axios.post("http://localhost:5000/api/admin/doctors", newDoctor);
    setNewDoctor({ name: "", specialization: "", email: "" });
    fetchDoctors();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`http://localhost:5000/api/admin/doctors/${id}`);
    fetchDoctors();
  };

  const handleEdit = (doc) => {
    setNewDoctor(doc);
    setEditingId(doc._id);
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/api/admin/doctors/${editingId}`, newDoctor);
    setNewDoctor({ name: "", specialization: "", email: "" });
    setEditingId(null);
    fetchDoctors();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">Manage Doctors</h2>

      {/* Add/Edit Doctor Form */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 space-y-4">
        <input type="text" placeholder="Name"
          value={newDoctor.name}
          onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
          className="border p-2 w-full rounded" />
        <input type="text" placeholder="Specialization"
          value={newDoctor.specialization}
          onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
          className="border p-2 w-full rounded" />
        <input type="email" placeholder="Email"
          value={newDoctor.email}
          onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
          className="border p-2 w-full rounded" />

        {editingId ? (
          <button onClick={handleUpdate} className="bg-yellow-500 text-white px-4 py-2 rounded">
            Update Doctor
          </button>
        ) : (
          <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Doctor
          </button>
        )}
      </div>

      {/* Doctors Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Specialization</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id} className="border-t">
                <td className="px-4 py-2">{doctor.name}</td>
                <td className="px-4 py-2">{doctor.specialization}</td>
                <td className="px-4 py-2">{doctor.email}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => handleEdit(doctor)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(doctor._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr><td colSpan="4" className="text-center text-gray-500 py-4">No doctors found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDoctors;
