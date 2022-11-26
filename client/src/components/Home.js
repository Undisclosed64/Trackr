import React from "react";
import Sidebar from "../components/Sidebar";

const Home = ({ navbar }) => {
  return (
    <div>
      {navbar}
      <Sidebar />
    </div>
  );
};
export default Home;
