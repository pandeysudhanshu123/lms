import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../Store/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";
import { BsPersonCircle } from "react-icons/bs";
const initialValue = {
  name: "",
  email: "",
  password: "",
  image: ""
};
const Signup = () => {
  const [formData, setFormData] = useState(initialValue);
  const [previewImage, setPreviewImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(register(formData)).unwrap();
      toast.success(response.message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      const errorMessage = err?.message;
      toast.error(errorMessage);
    }
    setFormData(initialValue);
  };
  console.log(formData);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-400">
          Sign Up
        </h2>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {/* Name */}
          <div className="flex flex-col items-center">
            <label htmlFor="image-upload" className="cursor-pointer">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="rounded-full w-24 h-24 object-cover border-2 border-gray-300"
                />
              ) : (
                <BsPersonCircle className="w-24 h-24 text-gray-500" />
              )}
            </label>

            <input
              id="image-upload"
              className="hidden"
              type="file"
              accept=".jpg,.jpeg,.png,.svg"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="example@mail.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="••••••••"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Create Account
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
