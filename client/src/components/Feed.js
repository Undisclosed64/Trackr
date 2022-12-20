import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useContext, useState } from "react";
import noteContext from "../context/noteContext";
import axios from "axios";
import GetActivites from "./GetActivities";

const Feed = ({ navbar }) => {
  const context = useContext(noteContext);
  const projects = context.projects;
  const [projectId, setProjectId] = useState(null);
  const [project, setProject] = useState(null);
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
          className="py-3 px-2 bg-brightWhite rounded-md drop-shadow w-full my-6 border text-veryLightGray tracking-tight"
          placeholder="Share a quick thought and start a discussion"
        />
        {project ? <GetActivites activities={project.trackActivities} /> : ""}
      </section>
    </div>
  );
};
export default Feed;
