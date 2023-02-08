import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { IoMdAddCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import "../App.css";
import UserProfile from "./UserProfile";
import { CreateFormHandler } from "./CreateFormHandler";

const Navbar = ({ sectionName }) => {
  const [showAddTicket, setShowAddTicket] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const displayCreateTicket = () => {
    setShowAddTicket(true);
  };

  const handleCancel = () => {
    setShowAddTicket(false);
    //remove overflow effects
    const overlayRoot = document.querySelector(".overlay-root");
    overlayRoot.classList.remove("overlay-container");
    const sidebar = document.querySelector("#sidebar");
    sidebar.classList.remove("hideOverflow");
    const navbar = document.querySelector("#top-navbar");
    navbar.classList.remove("removeZindex");
  };
  return (
    <div className="div">
      {showAddTicket ? (
        <CreateFormHandler
          ticketCreateForm={showAddTicket}
          onCancel={handleCancel}
        />
      ) : (
        ""
      )}
      <nav
        id="top-navbar"
        className="navbar toggler flex justify-between items-center px-4 py-3.5 bg-brightWhite drop-shadow text-lightBlack3 
        fixed top-0 right-0 left-0 z-10"
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
            <Link to="" className="text-lightBlack">
              <FaUserCircle className="text-xl md:text-2xl" />
            </Link>
          </li>
        </ul>
      </nav>
      {/* {showUserProfile ? <UserProfile /> : ""} */}
    </div>
  );
};
export default Navbar;
