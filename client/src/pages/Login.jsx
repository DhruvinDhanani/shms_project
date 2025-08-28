// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    // ✅ Token + User data backend thi male che
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Role check karo
      if (res.data.user.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else if (res.data.user.role === "doctor") {
        window.location.href = "/doctor/dashboard";
      } else if (res.data.user.role === "nurse") {
        window.location.href = "/nurse/dashboard";
      } else {
        window.location.href = "/patient/dashboard";
      }
    } catch (err) {
      alert("Login failed: " + err.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="p-6 bg-gray-100 rounded" onSubmit={handleLogin}>
        <h2 className="text-xl mb-4">Login</h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 w-full" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
