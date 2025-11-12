// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple mock login (replace with backend later)
    if (email && password) {
      alert("Login Successful 🎉");
      navigate("/"); // redirect to homepage
    } else {
      alert("Please enter valid credentials ❌");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
            Welcome Back 👋
          </h2>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold 
                         hover:bg-green-700 transition duration-200"
            >
              Login
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Don’t have an account?{" "}
            <span className="text-green-600 font-medium cursor-pointer hover:underline">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
