import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div id="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/create-project">Create Project</Link>
          </li>
          <li>
            <Link to="/tickets">Add ticket</Link>
          </li>
          <li>
            <Link to="/discuss">Discuss</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;
