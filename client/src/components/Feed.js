import React from "react";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import noteContext from "../context/noteContext";

const Feed = ({ navbar }) => {
  const context = useContext(noteContext);
  const projects = context.projects;
  console.log(projects);
  return (
    <div>
      {navbar}
      <Sidebar />
      <section id="feed" className="py-10 px-3">
        <h3>Slecet Project</h3>
        {projects.map((project) => {
          return (
            <div className="projects-dropdown">
              <h2>{project.title}</h2>
            </div>
          );
        })}
      </section>
    </div>
  );
};
export default Feed;
