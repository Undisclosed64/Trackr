import React, { useEffect, useContext, useState } from "react";
import Sidebar from "./Sidebar";
import Project from "../components/Project";
import axios from "axios";
import noteContext from "../context/noteContext";
import { HiOutlineExternalLink } from "react-icons/hi";
import { HiOutlineTicket } from "react-icons/hi";
import { RiProjectorLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const baseURL = "http://localhost:5000";

const Projects = ({ navbar }) => {
  const context = useContext(noteContext);
  const [projects, setProjects] = useState([]);
  const [createProject, setCreateProject] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (context.projects) {
      setProjects(context.projects);
    }
  }, [context.projects]);

  useEffect(() => {
    setCreateProject(false);
  }, []);

  console.log(createProject);
  const TakeToProjectDetails = (projectId) => {
    navigate(`/projects/${projectId}`);
  };
  const sortByValue = (e) => {
    console.log(e.target.value);
    if (e.target.value === "active") sortByActive();
    else if (e.target.value === "completed") sortByCompleted();
    else setProjects(context.projects);
  };
  //get active projects
  const sortByActive = async () => {
    try {
      const res = await axios.get(`${baseURL}/server/projects`, {
        params: {
          email: context.userEmail,
          filterActive: true,
        },
      });
      // console.log(res.data.projects);
      setProjects(res.data.projects);
    } catch (err) {
      console.log(err);
    }
  };

  //get completed projects
  const sortByCompleted = async () => {
    try {
      const res = await axios.get(`${baseURL}/server/projects`, {
        params: {
          email: context.userEmail,
          filterCompleted: true,
        },
      });
      console.log(res.data.projects);
      setProjects(res.data.projects);
    } catch (err) {
      console.log(err);
    }
  };
  if (!projects) return <div>Loading...</div>;

  return (
    <div>
      {navbar}
      <Sidebar />
      {createProject ? <Project isDisplayed={createProject} /> : ""}

      <section
        id="projects"
        className="toggler fixed py-20 top-0 left-0 right-0"
      >
        <div
          className="filter-wrapper flex justify-center items-center msm:justify-between bg-brightWhite drop-shadow rounded-md 
          mb-6 gap-4 mx-2 py-2 px-1 md:mx-4 md:py-4"
        >
          <select
            className="project-sort border-none text-brightOrange bg-transparent capitalize"
            onClick={(e) => sortByValue(e)}
          >
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
              onClick={() => setCreateProject(true)}
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
                className="ticket-wrapper border-bottom hover:bg-red-50 hover:text-brightOrange hover:cursor-pointer py-2 px-8 md:grid grid-flow-col auto-cols-fr gap-12"
                onClick={() => TakeToProjectDetails(project._id)}
              >
                <div className="ticket-title flex justify-between items-center capitalize">
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
    </div>
  );
};
export default Projects;
