import { useEffect, useState } from "react";
import axios from "axios";

const DoctorHome = () => {
  const [patients, setPatients] = useState([]);

  // Get token from sessionStorage
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchPatients = async () => {
      if (!token) return; // stop if no token

      try {
        const res = await axios.get("http://localhost:5000/api/doctor/mypatients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(res.data);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      }
    };

    fetchPatients();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">
        Welcome Doctor
      </h1>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold dark:text-white">Total Patients</h2>
          <p className="text-3xl font-bold text-blue-600">{patients.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold dark:text-white">Today's Appointments</h2>
          <p className="text-3xl font-bold text-green-600">
            {patients.filter(
              (p) => new Date(p.appointmentDate).toDateString() === new Date().toDateString()
            ).length}
          </p>
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow dark:text-white">
        <h2 className="text-lg font-semibold mb-4">Assigned Patients</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Disease</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Appointment</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p._id} className="border-t dark:border-gray-700">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.disease}</td>
                <td className="px-4 py-2">{p.status}</td>
                <td className="px-4 py-2">
                  {new Date(p.appointmentDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorHome;
