import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("patient"); // default role
  const [qualification, setQualification] = useState("");
  const [disease, setDisease] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
        phone,
        role,
        qualification,
        disease,
      });

      // ✅ Store JWT & role in sessionStorage
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", data.role);
      sessionStorage.setItem("userId", data._id);

      // Redirect to dashboard based on role
      if (data.role === "admin") navigate("/admin/dashboard");
      else if (data.role === "doctor") navigate("/doctor/dashboard");
      else if (data.role === "nurse") navigate("/nurse/dashboard");
      else if (data.role === "patient") navigate("/patient/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 mb-3 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-3 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-3 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          className="border p-2 mb-3 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <select
          className="border p-2 mb-3 w-full"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="patient">Patient</option>
          <option value="nurse">Nurse</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>

        {role === "doctor" || role === "nurse" ? (
          <input
            type="text"
            placeholder="Qualification"
            className="border p-2 mb-3 w-full"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            required
          />
        ) : null}

        {role === "patient" ? (
          <input
            type="text"
            placeholder="Disease"
            className="border p-2 mb-3 w-full"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            required
          />
        ) : null}

        <button type="submit" className="bg-green-500 text-white p-2 w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
