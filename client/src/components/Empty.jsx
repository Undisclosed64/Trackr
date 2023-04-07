import emptyList from "../assets/emptyList.png";
import { useState } from "react";
import Project from "./Project";
import { CreateFormHandler } from "./CreateFormHandler";

const Empty = ({ name }) => {
  const [createProject, setCreateProject] = useState(false);
  const handleProjectCreate = () => {
    setCreateProject(true);
  };
  const handleCancel = () => {
    setCreateProject(false);
    //remove overflow effects
    const overlayRoot = document.querySelector(".overlay-root");
    overlayRoot.classList.remove("overlay-container");
    const sidebar = document.querySelector("#sidebar");
    sidebar.classList.remove("hideOverflow");
    const navbar = document.querySelector("#top-navbar");
    navbar.classList.remove("removeZindex");
  };
  return (
    <section
      className="empty-wrapper flex justify-center items-center h-screen flex-col px-4 
    gap-2"
    >
      {createProject ? (
        <CreateFormHandler
          projectCreateForm={createProject}
          onCancel={handleCancel}
        />
      ) : (
        ""
      )}
      <img src={emptyList} alt="emptyList" className="md:w-1/4" />
      <div className="text-lg font-medium text-center text-lightGray">
        Looks like you don't have any {name} yet.
      </div>
      <p
        className="text-center underline hover:cursor-pointer hover:text-brightOrange text-lightGray "
        onClick={handleProjectCreate}
      >
        Add a {name} to track it
      </p>
    </section>
  );
};
export default Empty;
