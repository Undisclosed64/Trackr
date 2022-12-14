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
      <section id="feed" className="toggler py-10 px-3">
        <div className="projects-dropdown w-full">
          <select
            className="w-full p-2.5 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600 text-center capitalize font-medium text-brightRed"
            onChange={handleChange}
          >
            {projects.map((project) => {
              return (
                <option key={project._id} value={project._id}>
                  {project.title}
                </option>
              );
            })}
          </select>
          ;
        </div>
        {project ? <GetActivites activities={project.trackActivities} /> : ""}
      </section>
    </div>
  );
};
export default Feed;
