import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import axios from "axios";
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
const baseURL = "http://localhost:5000";
const token = localStorage.getItem("token");

const App = () => {
  console.log("app rendered");
  const context = useContext(noteContext);
  // const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shouldRedirectToLogin, setShouldRedirectToLogin] = useState(false);

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
          element: <LogOut setIsLoggedIn={setIsLoggedIn} />,
        },

        // {
        //   path: "create-project",
        //   element: <CreateProject />,
        // },
        // {

        // {
        //   path: "add-ticket",
        //   element: <Ticket />,
        // },
        // {
        //   path: "profile",
        //   element: <UserProfile />,
        // },
        // {
      ],
    },
    {
      path: "/login",
      element: <LogIn />,
    },
  ]);

  useEffect(() => {
    // Check if the user is logged in
    console.log("checkIfUserIsLoggedIn is called");

    const checkIfUserIsLoggedIn = async () => {
      try {
        await axios
          .get(`${baseURL}/server/verifyUser`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            if (response.status === 200) {
              setIsLoggedIn(true);
            }
          });
      } catch (err) {
        console.log(err);
        setShouldRedirectToLogin(true);
        // window.location.href = "/login"; //starts switching between login and "/"
      }
    };
    checkIfUserIsLoggedIn();
  }, []);

  if (shouldRedirectToLogin) {
    console.log("redirecting to login page");
    // window.location.href = "/login";
  }
  console.log("isLoggedIn:" + isLoggedIn);
  return (
    <>
      <NoteState>
        <RouterProvider router={router} path="/" />
      </NoteState>
    </>
  );
};
export default App;
