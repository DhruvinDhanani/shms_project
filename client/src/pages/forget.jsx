import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((user) => user.email === email);

    if (foundUser) {
      setMessage(`Your password is: ${foundUser.password}`);
    } else {
      setMessage("No user found with this email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">

        <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
        <p className="text-gray-500 text-sm mb-6">Enter Email to reset password</p>

        <form onSubmit={handleReset} className="text-left">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Send Password Reset Link
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

        <p className="mt-4 text-sm text-gray-600">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline"
            type="button"
          >
            Back to Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
