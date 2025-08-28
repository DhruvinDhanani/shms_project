import React from "react";
import { Outlet, Link } from "react-router-dom";
import { getUser, logout } from "../services/auth";

export default function DashboardLayout() {
  const user = getUser();
  const role = user?.role || "guest";
  const links = {
    admin: [
      { to: "/admin", label: "Home" },
      { to: "/admin/allpatients", label: "All Patients" },
      { to: "/admin/manage-doctors", label: "Manage Doctors" },
      { to: "/admin/manage-nurses", label: "Manage Nurses" },
    ],
    doctor: [
      { to: "/doctor", label: "Home" },
      { to: "/doctor/mypatients", label: "My Patients" },
    ],
    nurse: [
      { to: "/nurse", label: "Home" },
      { to: "/nurse/room-status", label: "Room Status" },
    ],
    patient: [
      { to: "/patient", label: "Home" },
      { to: "/patient/appointments", label: "Appointments" },
    ]
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4">
        <h2 className="text-xl font-bold">Smart Hospital</h2>
        <p className="text-sm mb-2">Role: {role}</p>
        <nav>
          {(links[role] || []).map(l => (
            <Link key={l.to} to={l.to} className="block py-2">{l.label}</Link>
          ))}
        </nav>
        <button className="mt-4" onClick={logout}>Logout</button>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
