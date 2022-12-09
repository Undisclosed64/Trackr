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
      <section id="feed" className="">
        <div className="projects-dropdown"></div>
      </section>
    </div>
  );
};
export default Feed;
