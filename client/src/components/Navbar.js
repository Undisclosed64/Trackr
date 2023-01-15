import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { IoMdAddCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import "../App.css";
import Ticket from "../components/Ticket";

const Navbar = ({ sectionName, isDisplayed }) => {
  const [showAddTicket, setShowAddTicket] = useState(false);
  const displayCreateTicket = () => {
    setShowAddTicket(true);
    const overlay = document.querySelector(".overlay");
    overlay.classList.add("overlay-container");
  };
  console.log(isDisplayed);
  useEffect(() => {
    if (isDisplayed) {
      setShowAddTicket(true);
    }
  }, [isDisplayed]);

  return (
    <div className="div">
      <div className="overlay hidden"></div>
      <nav
        id="top-navbar"
        className="navbar toggler flex justify-between items-center px-4 py-2 bg-brightWhite drop-shadow text-lightBlack3 fixed top-0 right-0 left-0 z-10"
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
          <li className="ml-2 msm:ml-5" onClick={displayCreateTicket}>
            <Link to="" className="text-lightBlack">
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
      {showAddTicket ? <Ticket showForm={setShowAddTicket} /> : ""}
    </div>
  );
};
export default Navbar;
