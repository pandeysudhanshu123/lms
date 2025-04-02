import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-6 w-full flex items-center justify-between px-6 sm:flex-row">
      <p className="text-lg text-white">
        &copy; 2025 Your Company. All rights reserved.
      </p>
      <div className="text-white flex gap-5">
        <Link
          to="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsFacebook size={20} className="hover:text-blue-500" />
        </Link>
        <Link
          to="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsInstagram size={20} className="hover:text-pink-500" />
        </Link>
        <Link
          to="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsTwitter size={20} className="hover:text-blue-400" />
        </Link>
        <Link
          to="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsLinkedin size={20} className="hover:text-blue-700" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
