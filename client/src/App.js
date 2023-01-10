import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Tickets from "./components/Tickets";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import CreateProject from "./components/Project";
import ProjectDetails from "./components/ProjectDetails";
import SignUp from "./components/SignUp";
import SingleTicket from "./components/SingleTicket";
import Ticket from "./components/Ticket";
import Navbar from "./components/Navbar";
import NoteState from "./context/NoteState";
import Feed from "./components/Feed";

function App() {
  // const baseURL = "http://localhost:5000/server";
  // const token = localStorage.getItem("token");
  // useEffect(() => {
  //   axios
  //     .get(`${baseURL}/getUser`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       setUser(response.data.user);
  //     });
  // }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LogIn />,
    },
    {
      path: "sign-up",
      element: <SignUp />,
    },

    {
      path: "home",
      element: <Home navbar={<Navbar sectionName="Home" />} />,
    },
    {
      path: "feed",
      element: <Feed navbar={<Navbar sectionName="Feed" />} />,
    },
    {
      path: "tickets",
      element: <Tickets navbar={<Navbar sectionName="Tickets" />} />,
    },
    {
      path: "create-project",
      element: <CreateProject />,
    },
    {
      path: "projects/:projectId",
      element: <ProjectDetails />,
    },

    {
      path: "tickets/:id",
      element: <SingleTicket />,
    },
    {
      path: "add-ticket",
      element: <Ticket />,
    },
  ]);
  // if (!user) return <div>loading..</div>;
  return (
    <NoteState className="App">
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </NoteState>
  );
}

export default App;
