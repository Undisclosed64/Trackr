import "./App.css";
import CreateProject from "./components/Project";
import SignUp from "./components/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./components/LogIn";
import Home from "./components/Home";

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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
