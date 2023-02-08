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
import { FiMenu, FiLogOut } from "react-icons/fi";
import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import ".././index.css";

const Root = () => {
  return (
    <>
      <Navbar />
      <div
        id="sidebar"
        className="bg-sidebarBg drop-shadow z-10 w-24 vlg:w-1/5 vlg:block h-screen fixed overflow-auto overflow-x-hidden sidebar"
      >
        <div className="overlay-root hidden"></div>

        <div className="header text-brightRed drop-shadow px-2 py-1.5 md:py-2 mb-3 text-2xl bg-brightWhite flex justify-between">
          <div className="brand flex items-center lg:pl-1">
            <div className="logo-wrapper w-10 h-10 rounded-full bg-brightRed mr-2 p-1">
              <IoLogoAmplify className="text-3xl text-brightWhite" />
            </div>
            <div className="brandName text-4xl hidden vlg:block vlg:font-bold">
              trackr
            </div>
          </div>
          <div className="hamburger-wrapper self-center mt-2 p-0.5">
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
              {/* other code */}
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
                to="/projects"
                className="flex items-center px-1 py-2 no-underline hover:rounded vlg:hover:bg-lightWhite hover:text-lightBlack3 text-lightBlack3"
              >
                <BsListTask className="mr-3 text-2xl text-lightBlack2" />
                <div className="hidden text-xl vlg:block">Projects</div>
              </Link>
            </li>
            <li className="mb-4 text-lg text-lightBlack3 ">
              <Link
                to="/tickets"
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
            <li className="mb-4 text-lg text-lightBlack3">
              <Link
                to="/logout"
                className="flex items-center no-underline px-1 py-2 vlg:hover:bg-lightWhite hover:text-lightBlack3 hover:rounded text-lightBlack3"
              >
                <FiLogOut className="mr-3 text-2xl text-lightBlack2" />
                <div className="hidden text-xl vlg:block">Logout</div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div id="detail" className="fixed top-0 left-0 right-0 bg-brightWhite">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
