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
  const [isExpanded, setIsExpanded] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("w-1/5");

  const navigate = useNavigate();

  // Get the JWT token from the cookie in google login case
  const getTokenfromURL = () => {
    console.log(document.cookie);
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      .split("=")[1];
    // console.log(cookieValue);
    if (cookieValue) {
      // Save the JWT token in local storage
      localStorage.setItem("token", cookieValue);
    }
  };

  useEffect(() => {
    // Check if the previous page was the Google authentication page
    // const isGoogleAuth = localStorage.getItem("isGoogleAuth") === "true";
    // console.log(isGoogleAuth);
    // if (isGoogleAuth) {
    //   // Set the authentication state to true
    //   getTokenfromURL();
    // }
    // getTokenfromURL();
  }, []);

  const expandMenu = () => {
    setIsExpanded(!isExpanded);
  };

  let activeStyle = {
    color: "#FF6400",
  };
  console.log("isLoggedIn:" + isLoggedIn);

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
        if (err.message !== "Network Error") {
          console.log(err);
          navigate("/login");
        }
      }
    };
    checkIfUserIsLoggedIn();
  }, []);

  return (
    <>
      <Navbar />
      <div
        id="sidebar"
        className={` bg-brightblack z-10 
        h-screen fixed overflow-auto lg:w-1/5 ${
          isExpanded
            ? "w-4/5 sm:w-3/5 msm:w-2/5 lg:w-1/5 transition-all duration-500 ease-out"
            : "w-[72px] transition-all duration-500 ease-out"
        }  `}
      >
        <div className="overlay-root hidden"></div>

        {/* <div
          className="header text-brightRed 
        border-b px-2 py-1.5 md:py-2 mb-3 text-2xl flex justify-between"
        >
          <div className="brand items-center lg:pl-1 hidden">
            <div className="logo-wrapper w-10 h-10 rounded-full bg-brightRed mr-2 p-1">
              <IoLogoAmplify className="text-3xl text-brightWhite" />
            </div>
            <div className="brandName text-4xl hidden vlg:block vlg:font-bold">
              trackr
            </div>
          </div>

          <div className="hamburger-wrapper p-0.5" onClick={hideSidebar}>
            <FiMenu className="text-veryLightGray" />
          </div>
        </div> */}

        <div
          className={`header border-b border-brightBlackHover py-1.5 flex lg:items-center px-4 gap-3 lg:justify-start
            ${isExpanded ? "items-start" : "justify-center"}`}
        >
          <div
            className="hamburger-wrapper hover:bg-brightBlackHover rounded-full p-2"
            onClick={expandMenu}
          >
            <FiMenu className="text-mainWhite text-2xl" />
          </div>

          <div
            className={`brand flex items-center ${
              isExpanded ? "expanded" : ""
            }`}
          >
            {/* <div
              className="logo-wrapper p-0.5 rounded-full bg-brightRed
             mr-1"
            > */}
            <IoLogoAmplify className="text-3xl mr-1 text-brightRed" />
            {/* </div> */}
            <div className="brandName text-brightWhite text-3xl font-medium">
              trackr
            </div>
          </div>
        </div>

        <nav
          className="h-screen flex justify-center
         text-mainWhite py-8 "
        >
          <ul className="w-full">
            <li
              className={`mb-8 w-full lg:px-4 ${isExpanded ? "px-4" : "px-2"}`}
            >
              <NavLink
                to="/home"
                className={`home-link no-underline hover:rounded hover:bg-brightBlackHover flex rounded gap-3 lg:flex-row 
                lg:w-full lg:px-2 lg:py-3 lg:items-start ${
                  isExpanded
                    ? "flex-row w-full px-2 py-3"
                    : "flex-col items-center px-1 py-2"
                }`}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <AiOutlineHome className="text-2xl text-inherit" />
                <div
                  className={`lg:text-xl ${
                    isExpanded ? "text-xl" : "text-base"
                  }`}
                >
                  Home
                </div>
              </NavLink>
            </li>

            <li
              className={`mb-8 w-full lg:px-4 ${isExpanded ? "px-4" : "px-2"}`}
            >
              <NavLink
                to="/feed"
                className={`no-underline hover:rounded hover:bg-brightBlackHover flex rounded gap-3 lg:flex-row lg:w-full lg:px-2 lg:py-3 lg:items-start  ${
                  isExpanded
                    ? "flex-row w-full px-2  py-3"
                    : "flex-col items-center px-1 py-2"
                }`}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <MdOutlineFeed className="text-2xl text-inherit" />
                <div
                  className={`lg:text-xl ${
                    isExpanded ? "text-xl" : "text-base"
                  }`}
                >
                  Feed
                </div>
              </NavLink>
            </li>
            <li
              className={`mb-8 w-full lg:px-4 ${isExpanded ? "px-4" : "px-2"}`}
            >
              <NavLink
                to="/projects"
                className={`no-underline hover:rounded hover:bg-brightBlackHover flex px-2 py-2 rounded gap-3 lg:flex-row lg:w-full lg:px-2 lg:py-3 lg:items-start ${
                  isExpanded
                    ? "flex-row w-full px-2 py-3"
                    : "flex-col items-center px-1 py-2"
                }`}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <BsListTask className="text-2xl text-inherit" />
                <div
                  className={`lg:text-xl ${
                    isExpanded ? "text-xl" : "text-base"
                  }`}
                >
                  Projects
                </div>
              </NavLink>
            </li>
            <li
              className={`mb-8 w-full lg:px-4 ${isExpanded ? "px-4" : "px-2"}`}
            >
              <NavLink
                to="/tickets"
                className={`no-underline hover:rounded hover:bg-brightBlackHover flex rounded gap-3 lg:flex-row lg:w-full lg:px-2 lg:py-3 lg:items-start ${
                  isExpanded
                    ? "flex-row w-full px-2 py-3"
                    : "flex-col items-center px-1 py-2"
                }`}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <IoTicketOutline className="text-2xl text-inherit" />
                <div
                  className={`lg:text-xl ${
                    isExpanded ? "text-xl" : "text-base"
                  }`}
                >
                  Tickets
                </div>
              </NavLink>
            </li>

            <li
              className={`mb-8 w-full lg:px-4 ${isExpanded ? "px-4" : "px-2"}`}
            >
              <NavLink
                to="/logout"
                className={`no-underline hover:rounded hover:bg-brightBlackHover flex rounded gap-3 lg:flex-row lg:w-full lg:px-2 lg:py-3 lg:items-start ${
                  isExpanded
                    ? "flex-row w-full px-2 py-3"
                    : "flex-col items-center px-1 py-2 "
                }`}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <FiLogOut className="text-2xl text-inherit" />
                <div
                  className={`lg:text-xl ${
                    isExpanded ? "text-xl" : "text-base"
                  } `}
                >
                  Logout
                </div>
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
