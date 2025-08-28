import React, { useEffect, useState } from "react";
import API from "../../utils/axios";

const AdminHome = () => {
  const [stats, setStats] = useState({ doctors: 0, nurses: 0, patients: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const doctors = await API.get("/api/doctors");
        const nurses = await API.get("/api/nurses");
        const patients = await API.get("/api/patients");

        setStats({
          doctors: doctors.data.length,
          nurses: nurses.data.length,
          patients: patients.data.length,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">Doctors</h2>
          <p className="text-3xl">{stats.doctors}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">Nurses</h2>
          <p className="text-3xl">{stats.nurses}</p>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">Patients</h2>
          <p className="text-3xl">{stats.patients}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
