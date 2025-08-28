// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin components
import AdminHome from "./pages/admin/AdminHome";
import AllPatients from "./pages/admin/AllPatients";
import ManageDoctors from "./pages/admin/ManageDoctors";
import ManageNurses from "./pages/admin/ManageNurses";

// Doctor components...
import DoctorHome from "./pages/doctor/DoctorHome";
import MyPatients from "./pages/doctor/MyPatients";

// Nurse components...
import NurseHome from "./pages/nurse/NurseHome";
import RoomStatus from "./pages/nurse/RoomStatus";

// Patient components...
import PatientHome from "./pages/patient/PatientHome";
import Appointments from "./pages/patient/Appointments";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminHome/>}/>
          <Route path="allpatients" element={<AllPatients/>}/>
          <Route path="manage-doctors" element={<ManageDoctors/>}/>
          <Route path="manage-nurses" element={<ManageNurses/>}/>
        </Route>

        <Route path="/doctor/*" element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DoctorHome/>}/>
          <Route path="mypatients" element={<MyPatients/>}/>
        </Route>

        <Route path="/nurse/*" element={
          <ProtectedRoute allowedRoles={['nurse']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<NurseHome/>}/>
          <Route path="room-status" element={<RoomStatus/>}/>
        </Route>

        <Route path="/patient/*" element={
          <ProtectedRoute allowedRoles={['patient']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<PatientHome/>}/>
          <Route path="appointments" element={<Appointments/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
