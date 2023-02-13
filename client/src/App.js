import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import noteContext from "./context/noteContext";
import NoteState from "./context/NoteState";
import Root from "./routes/root";
import LogIn from "./components/LogIn";
import ErrorPage from "./errorPage";
import Home from "./pages/Home/home";
import Feed from "./pages/Feed/feed";
import Ticket from "./pages/Ticket/tickets";
import Project from "./pages/Project/projects";
import LogOut from "./components/LogOut";
import ProjectDetails from "./components/ProjectDetails";
import SingleTicket from "./components/SingleTicket";
import UserProfile from "./components/UserProfile";
const baseURL = "http://localhost:5000";
const token = localStorage.getItem("token");

const App = () => {
  console.log("app rendered");
  const context = useContext(noteContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },

        {
          path: "home",
          element: <Home />,
        },
        {
          path: "feed",
          element: <Feed />,
        },
        {
          path: "tickets",
          element: <Ticket />,
        },

        {
          path: "projects",
          element: <Project />,
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
          path: "logout",
          element: <LogOut />,
        },

        {
          path: "profile",
          element: <UserProfile />,
        },
      ],
    },
    {
      path: "/login",
      element: <LogIn />,
    },
  ]);
  return (
    <>
      <NoteState>
        <RouterProvider router={router} path="/" />
      </NoteState>
    </>
  );
};
export default App;
