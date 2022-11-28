import React from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import "../App.css";

const Navbar = () => {
  return (
    <nav
      id="top-navbar"
      className="flex justify-between px-4 py-3 text-lightBlack3 border-b-[1px] border-borderColor"
    >
      <div className="sectionName">Home</div>
      <ul className="flex">
        <li className="mr-4 text-xl mt-0.5">
          <Link to="#">
            <GoSearch />
          </Link>
        </li>
        <li className="mr-4 text-2xl">
          <Link to="/notifications">
            <IoMdNotificationsOutline />
          </Link>
        </li>
        <li className="mr-4 text-2xl">
          <Link to="/add-ticket">
            <IoMdAddCircle className="text-brightRed " />
          </Link>
        </li>
        <li className="mr-4 text-2xl">
          <Link to="#">
            <FaUserCircle className="text-lightGray" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
