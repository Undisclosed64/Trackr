import React from "react";
import Ticket from "../components/Ticket";
import Project from "../components/Project";
import { useState, useEffect } from "react";

export const CreateFormHandler = ({
  projectCreateForm,
  onCancel,
  ticketCreateForm,
}) => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);

  const addOverlayEffect = () => {
    //select elements and add overlay effect
    const overlay = document.querySelector(".overlay");
    const overlayRoot = document.querySelector(".overlay-root");
    const sidebar = document.querySelector("#sidebar");
    const navbar = document.querySelector("#top-navbar");
    overlay.classList.add("overlay-container");
    overlayRoot.classList.add("overlay-container");
    navbar.classList.add("removeZindex");
    console.log(navbar);
    sidebar.classList.add("hideOverflow");
  };
  useEffect(() => {
    if (projectCreateForm) {
      setShowProjectForm(true);
      addOverlayEffect();
    } else if (ticketCreateForm) {
      setShowTicketForm(true);
      addOverlayEffect();
    }
  }, [projectCreateForm, ticketCreateForm]);

  return (
    <>
      <div className="overlay hidden"></div>

      {showProjectForm ? (
        <Project projectCreateForm={setShowProjectForm} onCancel={onCancel} />
      ) : (
        ""
      )}
      {showTicketForm ? (
        <Ticket ticketCreateForm={setShowTicketForm} onCancel={onCancel} />
      ) : (
        ""
      )}
    </>
  );
};
