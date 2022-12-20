import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineFeed } from "react-icons/md";
import { GoCommentDiscussion } from "react-icons/go";
import { IoTicketOutline } from "react-icons/io5";
import { BsListTask } from "react-icons/bs";
import { BiBug } from "react-icons/bi";
import { RiMenu3Line } from "react-icons/ri";
import { IoLogoAmplify } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";

const Sidebar = () => {
  const displaySidebar = () => {
    //select all elements
    const sidebar = document.querySelector("#sidebar");
    const toggleSidebar = document.querySelector("#toggleSidebar");
    const navbar = document.getElementById("top-navbar");
    const sectionHome = document.querySelector("#home");
    const sectionFeed = document.querySelector("#feed");

    console.log(sectionFeed);
    //perform actions
    sidebar.style.display = "block";
    toggleSidebar.style.display = "none";
    //move it to right
    navbar.classList.add("toggler");
    // sectionHome.classList.add("toggler");
    sectionFeed.classList.add("toggler");
  };
  const hideSidebar = () => {
    //select all elements
    const sidebar = document.querySelector("#sidebar");
    const toggleSidebar = document.querySelector("#toggleSidebar");
    const navbar = document.getElementById("top-navbar");
    const sectionHome = document.querySelector("#home");
    const sectionFeed = document.querySelector("#feed");
    console.log(sectionFeed);

    //perform actions on them
    sidebar.style.display = "none";
    toggleSidebar.style.display = "block";
    //move it to left
    navbar.classList.remove("toggler");
    // sectionHome.classList.remove("toggler");
    sectionFeed.classList.remove("toggler");
  };
  return (
    <div className="container ">
      {/* sidebar hamburger for smaller sizes */}
      <div
        className="hamburger-wrapper self-center px-2 py-3 absolute top-0 left-0 text-2xl"
        id="toggleSidebar"
        onClick={displaySidebar}
      >
        <FiMenu className="text-veryLightGray" />
      </div>
      {/* <div
        className="absolute top-0 left-0 px-2 py-3 w-full text-2x"
        id="toggleSidebar"
        onClick={displaySidebar}
      >
        <RiMenu3Line className="text-brightOrange text-2xl" />
      </div> */}
      {/* Dark themed sidebar */}
      <div
        id="sidebar"
        className="bg-brightWhite fixed top-0 left-0 w-24 vlg:w-1/5 vlg:block h-screen drop-shadow z-10"
      >
        <div className="header text-brightRed drop-shadow px-2 py-1.5 md:py-2 mb-3 text-2xl bg-brightWhite flex justify-between">
          <div className="brand flex items-center lg:pl-1">
            <div className="logo-wrapper w-10 h-10 rounded-full bg-brightRed mr-2 p-1">
              <IoLogoAmplify className="text-3xl text-brightWhite" />
            </div>
            <div className="brandName text-4xl hidden vlg:block vlg:font-bold">
              trackr
            </div>
          </div>
          <div
            className="hamburger-wrapper self-center mt-2 p-0.5"
            onClick={hideSidebar}
          >
            <FiMenu className="text-veryLightGray" />
          </div>
        </div>

        <nav className="mx-1 vlg:mx-3 py-3 h-screen ">
          <ul className="font-medium mr-4 ">
            <li className="mb-4 text-lg text-lightBlack3">
              <Link
                to="/home"
                className="sidebar-link no-underline flex px-1 py-2 hover:rounded  vlg:hover:bg-lightWhite hover:text-lightBlack3 text-lightBlack3"
              >
                <AiOutlineHome className="mr-3 text-2xl text-lightBlack2" />
                <div className="hidden text-xl vlg:block">Home</div>
              </Link>
            </li>
            <li className="mb-4 text-lg text-lightBlack3">
              <Link
                to="/feed"
                className="flex no-underline items-center px-1 py-2 text-lightBlack3 hover:rounded vlg:hover:bg-lightWhite hover:text-lightBlack3"
              >
                <MdOutlineFeed className="mr-3 text-2xl text-lightBlack2" />
                <div className="hidden text-xl vlg:block">Feed</div>
              </Link>
            </li>
            <li className="mb-4 text-lg text-lightBlack3">
              <Link
                to="#"
                className="flex items-center px-1 py-2 no-underline hover:rounded vlg:hover:bg-lightWhite hover:text-lightBlack3 text-lightBlack3"
              >
                <BsListTask className="mr-3 text-2xl text-lightBlack2" />
                <div className="hidden text-xl vlg:block">Projects</div>
              </Link>
            </li>
            <li className="mb-4 text-lg text-lightBlack3 ">
              <Link
                to="/add-ticket"
                className="flex no-underline items-center px-1 py-2 vlg:hover:bg-lightWhite hover:text-lightBlack3 hover:rounded text-lightBlack3"
              >
                <IoTicketOutline className="mr-3 text-2xl text-lightBlack2" />
                <div className="hidden text-xl vlg:block">Tickets</div>
              </Link>
            </li>
            <li className="mb-4 text-lg text-lightBlack3">
              <Link
                to="/discuss"
                className="flex items-center no-underline px-1 py-2 vlg:hover:bg-lightWhite hover:text-lightBlack3 hover:rounded text-lightBlack3"
              >
                <GoCommentDiscussion className="mr-3 text-2xl text-lightBlack2" />
                <div className="hidden text-xl vlg:block">Discuss</div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
