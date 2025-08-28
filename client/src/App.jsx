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
import MyPatients from "./pages/doctor/MyPatients";

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
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminHome />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/manage-doctors" 
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <ManageDoctors />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/manage-nurses" 
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <ManageNurses />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/manage-patients" 
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AllPatients />
            </PrivateRoute>
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
          path="/my-patient"
          element={
            <PrivateRoute allowedRoles={["doctor"]}>
              <MyPatients />
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
          path="/room-status"
          element={
            <PrivateRoute allowedRoles={["nurse"]}>
              <RoomStatus />
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
