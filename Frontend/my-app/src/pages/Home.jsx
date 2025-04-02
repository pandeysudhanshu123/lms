import React from "react";
import { Link } from "react-router-dom";
import About from "./About";
const Home = () => {
  return (
    <div>
    <div className="h-100 flex items-center justify-center bg-gray-700 text-white px-6">
      <div className="text-center max-w-3xl space-y-6">
        <h1 className="text-5xl font-extrabold leading-tight">
          Find Out the Best <br />
          <span className="text-orange-400">Online Courses</span> for You
        </h1>
        <p className="text-md text-gray-300">
          Feeling stuck in your career? Upgrade with an online degree & open new
          doors! <br />
          Explore courses & take the next step toward growth.
        </p>
        <Link to={"/course"}>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300">
            Explore Courses
          </button>
        </Link>
        <Link to="/contact" className="ml-5">
          <button className="border-2 border-transparent hover:border-amber-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300">
            Contacts
          </button>
        </Link>
      </div>
      <div className="relative w-full md:w-1/2 flex justify-center">
        <img
          src="https://img.freepik.com/free-vector/finance-concept-with-fun-elements_23-2147675643.jpg?t=st=1743511621~exp=1743515221~hmac=f51654596dcae6f6c6f42c9bfb5b74ea942e9bdaee29681a59139b545e45baf2&w=900"
          alt="Online Courses"
          className="w-72 md:w-96 rounded-full shadow-lg border-4 "
        />
        {/* Floating Element for Design */}
        <div className="absolute -top-4 -right-4 w-14 h-14 bg-orange-400 rounded-full animate-bounce"></div>
      </div>
    </div>
    <About/>
    </div>
  );
};

export default Home;
