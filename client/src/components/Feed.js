import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useContext, useState } from "react";
import noteContext from "../context/noteContext";
import axios from "axios";
import GetActivites from "./GetActivities";
import DisplayStatus from "./DisplayStatus";

const Feed = ({ navbar }) => {
  const context = useContext(noteContext);
  const projects = context.projects;
  const [projectId, setProjectId] = useState(null);
  const [project, setProject] = useState(null);
  const [showStatus, setShowStatus] = useState(false);
  const [streamActive, setStreamActive] = useState(true);
  const baseURL = "http://localhost:5000";

  useEffect(() => {
    axios
      .get(`${baseURL}/server/projects/${projectId}`)
      .then((res) => {
        setProject(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [projectId]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setProjectId(e.target.value);
  };
  const displayStatus = () => {
    setShowStatus(true);
    setStreamActive(false);
    const statusBtn = document.querySelector(".status");
    statusBtn.classList.add("addUnderline");
    const activityStreamBtn = document.querySelector(".activityStream");
    activityStreamBtn.classList.remove("addUnderline");
  };
  const displayActivity = () => {
    setShowStatus(false);
    setStreamActive(true);
    const activityStreamBtn = document.querySelector(".activityStream");
    activityStreamBtn.classList.add("addUnderline");
    const statusBtn = document.querySelector(".status");
    statusBtn.classList.remove("addUnderline");
  };
  const activityStreamBtn = document.querySelector(".activityStream");

  if (activityStreamBtn && !showStatus) {
    activityStreamBtn.classList.add("addUnderline");
  }

  return (
    <div>
      {navbar}
      <Sidebar />
      <section
        id="feed"
        className="toggler py-10 px-4 md:mx-20 flex justify-center flex-col"
      >
        <div className="projects-dropdown w-full bg-brightWhite rounded-md p-2.5 drop-shadow md:h-40 md:p-5 flex justify-center flex-col">
          <div className="mb-3 lg:text-xl font-medium">Select Project</div>
          <select
            className=" w-full msm:w-1/2 border rounded drop-shadow-sm focus:outline-none appearance-none capitalize"
            onChange={handleChange}
          >
            {projects.map((project) => {
              return (
                <option key={project._id} value={project._id} className="">
                  {project.title}
                </option>
              );
            })}
          </select>
          ;
        </div>
        <input
          type="text"
          className="py-3 px-2 bg-brightWhite rounded-md drop-shadow w-full my-8 border text-veryLightGray tracking-tight"
          placeholder="Share a quick thought and start a discussion"
        />
        <div className="status-stream-wrapper flex gap-12 border-b-[1.5px]">
          <div
            className="activityStream font-medium pb-2 hover:cursor-pointer"
            onClick={displayActivity}
          >
            Activity Stream
          </div>
          <div className="status hover:cursor-pointer" onClick={displayStatus}>
            Status
          </div>
        </div>
        {project && streamActive ? (
          <GetActivites activities={project.trackActivities} />
        ) : (
          ""
        )}
        {showStatus ? <DisplayStatus /> : ""}
      </section>
    </div>
  );
};
export default Feed;
