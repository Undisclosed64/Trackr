import React from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { IoMdAddCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import "../App.css";

const Navbar = ({ sectionName }) => {
  return (
    <nav
      id="top-navbar"
      className="toggler flex justify-between items-center px-4 py-2 bg-brightWhite drop-shadow text-lightBlack3 fixed top-0 right-0 left-0"
    >
      <div className="sectionName ml-4 font-medium lg:text-lg">
        {sectionName}
      </div>
      <ul className="flex">
        <li className="ml-2 msm:ml-5">
          <Link to="#" className="text-lightBlack">
            <GoSearch className="text-xl md:text-2xl" />
          </Link>
        </li>
        <li className="ml-2 msm:ml-5">
          <Link to="/add-ticket" className="text-lightBlack">
            <IoMdAddCircle className="text-xl md:text-2xl" />
          </Link>
        </li>
        <li className="ml-2 msm:ml-5">
          <Link to="#" className="text-lightBlack">
            <FaUserCircle className="text-xl md:text-2xl" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
