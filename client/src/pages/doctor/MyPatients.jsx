import React, { useEffect, useState } from "react";
import axios from "axios";

const MyPatients = () => {
  const [patients, setPatients] = useState([]);
  const token = sessionStorage.getItem("token"); // JWT token

  // Fetch patients from backend
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

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">My Patients</h1>
      <table className="border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Phone</th>
            <th className="border px-2 py-1">Disease</th>
            <th className="border px-2 py-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p._id}>
              <td className="border px-2 py-1">{p.name}</td>
              <td className="border px-2 py-1">{p.email}</td>
              <td className="border px-2 py-1">{p.phone}</td>
              <td className="border px-2 py-1">{p.disease}</td>
              <td className="border px-2 py-1">{p.status || "Admitted"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPatients;
