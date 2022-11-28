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
  return (
    <div
      id="sidebar"
      className="w-1/5 py-2 bg-brightBlack h-screen text-sideBarColor absolute top-0"
    >
      <div className="header px-3 mt-1 mb-3 border-b-[1px] border-sidebarBorder flex text-2xl items-center">
        <RiMenu3Line className="text-brightOrange mr-2" />
        <BiBug className="text-brightOrange mr-2" />
        <div className="text-brightWhite">BugTracker</div>
      </div>

      <nav className="mx-3">
        <ul>
          <li className="mb-3 text-lg">
            <Link
              to="/create-project"
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
  );
};
export default Sidebar;
