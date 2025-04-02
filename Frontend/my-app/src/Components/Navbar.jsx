import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Store/auth/authSlice";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const handleToggel = () => {
    dispatch(logout());
  };
  return (
    <div className=" relative flex items-center bg-gray-700 py-4 px-6">
      {/* Drawer Toggle Button */}
      <button className="z-50 p-2 text-white" onClick={() => setIsOpen(true)}>
        <FiMenu size={24} />
      </button>

      {/* Overlay (Closes Sidebar on Click) */}
      {isOpen && (
        <div
          className="absolute inset-0 bg-gray-700 bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72  bg-gray-700 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 text-white"
          onClick={() => setIsOpen(false)}
        >
          <IoClose size={24} />
        </button>

        {/* Drawer Navigation Links */}
        <nav className="mt-12 p-5 space-y-6 text-white text-lg">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block hover:text-blue-400"
          >
            About
          </Link>
          <Link
            to="/course"
            onClick={() => setIsOpen(false)}
            className="block hover:text-blue-400"
          >
            All Courses
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block hover:text-blue-400"
          >
            Contact
          </Link>
          <Link to={"/signup"}>
            <button className="bg-orange-400 p-1 px-6 rounded-2xl cursor-pointer">
              signup
            </button>
          </Link>
          <Link to={"/login"}>
            <button
              onClick={handleToggel}
              className="bg-white text-black ml-3 p-1 px-6 rounded-2xl cursor-pointer"
            >
              {isAuth ? "Logout" : "Login"}
            </button>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
