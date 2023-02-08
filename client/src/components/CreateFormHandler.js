import React from "react";
import Ticket from "../components/Ticket";
import Project from "../components/Project";
import { useState, useEffect } from "react";

export const CreateFormHandler = ({ projectCreateForm, onCancel }) => {
  const [showProjectForm, setShowProjectForm] = useState(false);

  useEffect(() => {
    if (projectCreateForm) {
      setShowProjectForm(true);
      //select elements to add overlay effect
      const overlay = document.querySelector(".overlay");
      const overlayRoot = document.querySelector(".overlay-root");
      overlay.classList.add("overlay-container");
      overlayRoot.classList.add("overlay-container");
    }
  }, [projectCreateForm]);

  return (
    <>
      <div className="overlay hidden"></div>

      {showProjectForm ? (
        <Project projectCreateForm={setShowProjectForm} onCancel={onCancel} />
      ) : (
        ""
      )}
    </>
  );
};
