import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineFeed } from "react-icons/md";
import { GoCommentDiscussion } from "react-icons/go";
import { IoTicketOutline } from "react-icons/io5";
import { BsListTask } from "react-icons/bs";
import { BiBug } from "react-icons/bi";
import { RiMenu3Line } from "react-icons/ri";

const Sidebar = () => {
  const displaySidebar = () => {
    //select all elements
    const sidebar = document.querySelector("#sidebar");
    const toggleSidebar = document.querySelector("#toggleSidebar");
    const navbar = document.getElementById("top-navbar");
    const sectionHome = document.querySelector("#home");

    //perform actions
    sidebar.style.display = "block";
    toggleSidebar.style.display = "none";
    //move it to right
    navbar.classList.add("toggler");
    sectionHome.classList.add("toggler");
  };
  const hideSidebar = () => {
    //select all elements
    const sidebar = document.querySelector("#sidebar");
    const toggleSidebar = document.querySelector("#toggleSidebar");
    const navbar = document.getElementById("top-navbar");
    const sectionHome = document.querySelector("#home");

    //perform actions on them
    sidebar.style.display = "none";
    toggleSidebar.style.display = "block";
    //move it to left
    navbar.classList.remove("toggler");
    sectionHome.classList.remove("toggler");
  };
  return (
    <div className="container">
      {/* sidebar toggler for smaller sizes */}
      <div
        className="absolute top-0 left-0 px-2 py-3 w-full text-2xl border-b-[1px] border-borderColor"
        id="toggleSidebar"
        onClick={displaySidebar}
      >
        <RiMenu3Line className="text-brightOrange text-2xl" />
      </div>
      {/* Dark themed sidebar */}
      <div
        id="sidebar"
        className="lg:w-1/5 py-2 bg-brightBlack h-screen text-sideBarColor absolute top-0 left-0 hidden vlg:block opacity-0.9 bg-scroll"
      >
        <div className="header px-3 mt-1 mb-3 border-b-[1px] border-sidebarBorder flex text-2xl items-center">
          <RiMenu3Line
            className="text-brightOrange mr-2"
            onClick={hideSidebar}
          />
          <BiBug className="text-brightOrange mr-2" />
          <div className="text-brightWhite">BugTracker</div>
        </div>

        <nav className="mx-3">
          <ul>
            <li className="mb-3 text-lg">
              <Link
                to="/home"
                className="sidebar-link flex items-center px-1 py-2 hover:bg-sidebarItemsHover hover:text-sideBarColor hover:rounded"
              >
                <AiOutlineHome className="mr-2" />
                <div>Home</div>
              </Link>
            </li>
            <li className="mb-3 text-lg">
              <Link
                to="/tickets"
                className="flex items-center px-1 py-2 hover:bg-sidebarItemsHover hover:text-sideBarColor hover:rounded"
              >
                <MdOutlineFeed className="mr-2" />
                <div>Feed</div>
              </Link>
            </li>
            <li className="mb-3 text-lg">
              <Link
                to="#"
                className="flex items-center px-1 py-2 hover:bg-sidebarItemsHover hover:text-sideBarColor hover:rounded"
              >
                <BsListTask className="mr-2" />
                <div>Projects</div>
              </Link>
            </li>
            <li className="mb-3 text-lg">
              <Link
                to="/add-ticket"
                className="flex items-center px-1 py-2 hover:bg-sidebarItemsHover hover:text-sideBarColor hover:rounded"
              >
                <IoTicketOutline className="mr-2" />
                <div>Tickets</div>
              </Link>
            </li>
            <li className="mb-3 text-lg">
              <Link
                to="/discuss"
                className="flex items-center px-1 py-2 hover:bg-sidebarItemsHover hover:text-sideBarColor hover:rounded"
              >
                <GoCommentDiscussion className="mr-3" />
                <div>Discuss</div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
