import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      <h1 className="text-7xl font-extrabold text-orange-500">404</h1>
      <h2 className="text-3xl font-bold mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-400 mt-2 text-center max-w-md">
        The page you are looking for does not exist. It might have been moved or
        deleted.
      </p>

      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-page-not-found-9152642-7488860.png"
        alt="404 Not Found"
        className="w-80 md:w-96 mt-6"
      />

      <Link to="/" className="mt-6">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
