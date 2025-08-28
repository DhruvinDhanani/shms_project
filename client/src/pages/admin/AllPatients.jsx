import React, { useEffect, useState } from "react";
import API from "../../utils/axios";

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      const { data } = await API.get("/api/patients");
      setPatients(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePatient = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/api/patients/${id}`);
      fetchPatients();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Patients</h1>
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Disease</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p._id}>
              <td className="border p-3">{p.name}</td>
              <td className="border p-3">{p.email}</td>
              <td className="border p-3">{p.disease}</td>
              <td className="border p-3">{p.status}</td>
              <td className="border p-3">
                <button
                  onClick={() => deletePatient(p._id)}
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

export default AllPatients;
