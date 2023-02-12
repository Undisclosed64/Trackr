import React, { useEffect } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
const baseURL = "http://localhost:5000";
const token = localStorage.getItem("token");

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const hideSidebar = () => {
    //select all elements
    const sidebar = document.querySelector("#sidebar");
    const toggleSidebar = document.querySelector("#toggleSidebar");

    //perform actions on them
    sidebar.style.display = "none";
    toggleSidebar.style.display = "block";
  };
  let activeStyle = {
    color: "#FF6400",
  };

  useEffect(() => {
    console.log("isLoggedIn:" + isLoggedIn);

    // Check if the user is logged in
    const checkIfUserIsLoggedIn = async () => {
      try {
        await axios
          .get(`${baseURL}/server/verifyUser`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            if (response.status === 200) {
              setIsLoggedIn(true);
            }
          });
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    };
    checkIfUserIsLoggedIn();
  }, [isLoggedIn]);

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
          <div
            className="hamburger-wrapper self-center mt-2 p-0.5"
            onClick={hideSidebar}
          >
            <FiMenu className="text-veryLightGray" />
          </div>
        </div>

        <nav className="mx-1 vlg:mx-3 py-3 h-screen ">
          <ul className="mr-4 text-lightBlack">
            <li className="mb-4 text-lg">
              <NavLink
                to="/home"
                className="home-link no-underline flex px-1 py-2 hover:rounded hover:bg-lightWhite"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <AiOutlineHome className="mr-3 text-2xl text-inherit" />
                <div className="hidden text-xl vlg:block">Home</div>
              </NavLink>
              {/* other code */}
            </li>
            <li className="mb-4 text-lg">
              <NavLink
                to="/feed"
                className="flex no-underline items-center px-1 py-2  hover:rounded hover:bg-lightWhite"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <MdOutlineFeed className="mr-3 text-2xl text-inherit" />
                <div className="hidden text-xl vlg:block">Feed</div>
              </NavLink>
            </li>
            <li className="mb-4 text-lg">
              <NavLink
                to="/projects"
                className="flex items-center px-1 py-2 no-underline hover:rounded hover:bg-lightWhite "
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <BsListTask className="mr-3 text-2xl text-inherit" />
                <div className="hidden text-xl vlg:block">Projects</div>
              </NavLink>
            </li>
            <li className="mb-4 text-lg">
              <NavLink
                to="/tickets"
                className="flex no-underline items-center px-1 py-2 vlg:hover:bg-lightWhite hover:rounded"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <IoTicketOutline className="mr-3 text-2xl text-inherit" />
                <div className="hidden text-xl vlg:block">Tickets</div>
              </NavLink>
            </li>
            <li className="mb-4 text-lg">
              <NavLink
                to="/discuss"
                className="flex items-center no-underline px-1 py-2 hover:bg-lightWhite 
                hover:rounded"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <GoCommentDiscussion className="mr-3 text-2xl text-inherit" />
                <div className="hidden text-xl vlg:block">Discuss</div>
              </NavLink>
            </li>
            <li className="mb-4 text-lg">
              <NavLink
                to="/logout"
                className="flex items-center no-underline px-1 py-2 hover:bg-lightWhite  hover:rounded "
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <FiLogOut className="mr-3 text-2xl text-inherit" />
                <div className="hidden text-xl vlg:block">Logout</div>
              </NavLink>
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
