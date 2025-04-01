import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../Store/auth/authSlice";
const initValue = {
  name: "",
  email: "",
  password: "",
  avatar: "",
};

const Signup = () => {
  const [signupData, setSignupData] = useState(initValue);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => {
    return state.auth;
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(register(signupData)).unwrap();
      console.log(resonse.message);
      toast.success(response.message); // ✅ Directly gets API response
    } catch (err) {
      toast.error(err.message || "Signup failed");
    }
  };

  return (
    <div>
      <form
        // enctype="multipart/form-data"
        onSubmit={handleSubmit}
        style={{
          border: "2px solid black",
          height: "250px",
          width: "300px",
          margin: "auto",
          padding: "10px",
        }}
      >
        <h1>Signup</h1>
        <input
          type="file"
          name="avatar"
          onChange={handleChange}
          value={signupData.avatar}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="enter your name"
          name="name"
          value={signupData.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="enter your email"
          name="email"
          value={signupData.email}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="enter your password"
          name="password"
          value={signupData.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">{isLoading ? "Signing" : "signup"}</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Signup;
