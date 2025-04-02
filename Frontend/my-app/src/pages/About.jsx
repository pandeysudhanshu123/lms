import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-col mt-20 bg-white items-center justify-center py-12 px-6 md:px-12">
      {/* Heading */}
      <h2 className="text-3xl text-gray-700 md:text-4xl font-bold text-center mb-4">
      <Link to={"/about"}>About Us</Link>
      </h2>

      {/* Description */}
      <p className="text-gray-700 text-center max-w-3xl leading-relaxed">
        LMS' mission is to permeate through every student/professional's
        outlook towards jobs and change their attitude and perspective from
        <span className="font-semibold"> "How Can I Do It?"</span> to
        <span className="font-semibold"> "Of Course I Can Do It"</span>. We aim
        to do this by providing exceptional upskilling courses at affordable
        rates, while being tech-forward so anyone, anywhere can access and
        improve their ability to be successful in life.
      </p>

      {/* Image */}
      <div className="mt-6">
        <img
          src="/assets/about-us.png"
          alt="about-us"
          className="w-64 md:w-80 h-auto"
        />
      </div>
    </div>
  );
};

export default About;
