import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginData } from "../Store/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";
const initialvalue = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialvalue);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(LoginData(formData)).unwrap();
      toast.success(response.message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      const errorMessage = error?.message;
      toast.error(errorMessage);
    }
    setFormData(initialvalue);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-6">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <span className="text-5xl text-orange-400">🔐</span>
        </div>

        <h2 className="text-3xl font-bold text-center mb-6 text-orange-400">
          Login
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <div className="flex items-center bg-gray-700 border border-gray-600 rounded-md p-2">
              <span className="text-gray-400 px-2">📧</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                placeholder="example@mail.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="flex items-center bg-gray-700 border border-gray-600 rounded-md p-2">
              <span className="text-gray-400 px-2">🔑</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Forgot Password & Signup */}
        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <Link to="/forgot-password" className="hover:text-orange-400">
            Forgot Password?
          </Link>
          <Link to="/signup" className="hover:text-orange-400">
            Create Account
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
