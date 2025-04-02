import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contacts from "../pages/Contacts";
import Courses from "../pages/Courses";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Private from "../hoc/private";
import NotFound from "../pages/NotFound";
const AllRoutes = () => {
  return (
    <div className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/course"element={<Private><Courses/></Private>}></Route>
        <Route
          path="/about"
          element={
            <Private>
              <About />
            </Private>
          }
        ></Route>
        <Route path="/contact" element={<Contacts />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;
