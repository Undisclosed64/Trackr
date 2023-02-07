import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./errorPage";
import Home from "./pages/Home/home";
import Feed from "./pages/Feed/feed";
import Ticket from "./pages/Ticket/tickets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
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
      // {
      //   path: "projects",
      //   element: <Projects />,
      // },
      // {
      //   path: "create-project",
      //   element: <CreateProject />,
      // },
      // {
      //   path: "projects/:projectId",
      //   element: <ProjectDetails />,
      // },

      // {
      //   path: "tickets/:id",
      //   element: <SingleTicket />,
      // },
      // {
      //   path: "add-ticket",
      //   element: <Ticket />,
      // },
      // {
      //   path: "profile",
      //   element: <UserProfile />,
      // },
      // {
      //   path: "logout",
      //   element: <LogOut />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
