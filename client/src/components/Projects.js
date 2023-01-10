import React, { useEffect, useContext, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import noteContext from "../context/noteContext";
import { HiOutlineExternalLink } from "react-icons/hi";
import { HiOutlineTicket } from "react-icons/hi";
import { RiProjectorLine } from "react-icons/ri";

const baseURL = "http://localhost:5000";

const Projects = ({ navbar }) => {
  const context = useContext(noteContext);
  const projects = context.projects;

  if (!projects) return <div>Loading...</div>;

  return (
    <>
      {navbar}
      <Sidebar />
      <section
        id="projects"
        className="toggler fixed py-20 top-0 left-0 right-0"
      >
        <div
          className="filter-wrapper flex justify-center items-center msm:justify-between bg-brightWhite drop-shadow rounded-md 
          mb-6 gap-4 mx-2 py-2 px-1 md:mx-4 md:py-4"
        >
          <select className="project-sort border-none text-brightOrange bg-transparent capitalize">
            <option value="all">all projects</option>
            <option value="active">active projects </option>
            <option value="completed">completed projects</option>
          </select>
          <div className="rightSide flex items-center justify-between msm:gap-4 pr-2">
            <select className="view-sort border-none text-brightOrange bg-transparent capitalize">
              <option value="">classic</option>
              <option value="">plain</option>
            </select>
            <button
              className="bg-brightOrange text-brightWhite rounded-full baseline py-2 px-3 hover:bg-orange-400 font-medium hidden 
          sm:block"
            >
              Submit Project
            </button>
          </div>
        </div>

        <div className="tickets-container overflow-auto whitespace-nowrap py-2 h-96 md:h-80">
          <div className="ticketHeader-wrapper hidden md:grid grid-flow-col auto-cols-fr gap-12 mx-8 uppercase mb-2 pb-1 border-b-2 text-lightGray">
            <div className="flex items-center">
              <RiProjectorLine className="text-lg mr-2" />
              Project name{" "}
            </div>
            <div className="md:grid grid-flow-col gap-10">
              <div className="w-40">created by</div>
              <div className="w-32 ">Status</div>
              <div className="w-40 ">start date</div>
              <div className="w-40 ">end date</div>
              <div className="w-40 ">last modified</div>
            </div>
          </div>
          {projects.map((project) => {
            return (
              <div
                key={project._id}
                className="ticket-wrapper border-bottom hover:bg-red-50 hover:text-brightOrange hover:cursor-pointer py-2 px-8 md:grid 
grid-flow-col auto-cols-fr gap-12"
              >
                <div className="ticket-title flex justify-between items-center">
                  {project.title}
                  <HiOutlineExternalLink className="external-link text-brightOrange text-lg hidden" />
                </div>

                <div className="ticket-details-wrapper hidden md:grid grid-flow-col gap-10">
                  <div className="w-40 ">{project.createdBy.username}</div>
                  <div className="w-32 first-letter:text-center text-white">
                    <span className="w-24 h-24 py-1 px-4 rounded-full bg-blue">
                      {project.status}
                    </span>
                  </div>
                  <div className="w-40">
                    {new Date(project.startDate).toDateString()}
                  </div>

                  <div className="w-40 text-red-500">
                    {new Date(project.endDate).toDateString()}
                  </div>
                  <div className="w-40">
                    {new Date(project.lastModified).toDateString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default Projects;
