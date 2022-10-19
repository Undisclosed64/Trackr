import "./App.css";
import CreateProject from "./components/Project";
import SignUp from "./components/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import ProjectDetails from "./components/ProjectDetails";
import Ticket from "./components/Ticket";
import GetTickets from "./components/GetTickets";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const baseURL = "http://localhost:5000/server";
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${baseURL}/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data.user);
      });
  }, []);
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
      path: "dashboard",
      element: <Home />,
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
      path: "tickets",
      element: <GetTickets user={user} />,
    },
    {
      path: "add-ticket",
      element: <Ticket user={user} />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
