// App.jsx or Routes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import DoctorHome from "./pages/doctor/DoctorHome";
import NurseHome from "./pages/nurse/NurseHome";
import PatientHome from "./pages/patient/PatientHome";
import AdminHome from "./pages/admin/AdminHome";
import ManageDoctors from "./pages/admin/ManageDoctors";
import ManageNurses from "./pages/admin/ManageNurses";
import AllPatients from "./pages/admin/AllPatients";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Admin routes */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute role="admin">
              <AdminHome />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/manage-doctors" 
          element={
            <ProtectedRoute role="admin">
              <ManageDoctors />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/manage-nurses" 
          element={
            <ProtectedRoute role="admin">
              <ManageNurses />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/manage-patients" 
          element={
            <ProtectedRoute role="admin">
              <AllPatients />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/doctor-dashboard"
          element={
            <PrivateRoute allowedRoles={["doctor"]}>
              <DoctorHome />
            </PrivateRoute>
          }
        />

        <Route
          path="/nurse-dashboard"
          element={
            <PrivateRoute allowedRoles={["nurse"]}>
              <NurseHome />
            </PrivateRoute>
          }
        />

        <Route
          path="/patient-dashboard"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <PatientHome />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
