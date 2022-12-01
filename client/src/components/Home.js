import React from "react";
import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import noteContext from "../context/noteContext";

const Home = ({ navbar }) => {
  const context = useContext(noteContext);
  return (
    <div>
      {navbar}
      <Sidebar />
      <section id="home" className="toggler py-10 px-3 md:mx-4">
        <h1 className="text-xl font-semibold">Welcome {context.userName}</h1>
        {/* container for boxes */}
        <div className="information-boxes my-4 grid gap-8 msm:grid-cols-2 vlg:grid-cols-4">
          <div className="box-wrapper bg-teal-500 px-2 py-8 flex flex-col items-center rounded-lg text-white">
            <div className="text-3xl font-bold pb-2">1</div>
            <span className="text-lg">Active Projects</span>
          </div>

          <div className="box-wrapper bg-red-500 px-2 py-8 flex flex-col items-center rounded-lg text-white">
            <div className="text-3xl font-bold pb-2">20</div>
            <span className="text-lg">Total Tickets</span>
          </div>

          <div className="box-wrapper bg-cyan-500 px-2 py-8 flex flex-col items-center rounded-lg text-white">
            <div className="text-3xl font-bold pb-2">8</div>
            <span className="text-lg">Open Tickets</span>
          </div>

          <div className="box-wrapper bg-teal-200 px-2 py-8 flex flex-col items-center rounded-lg bg-yellow-500 text-white">
            <div className="text-3xl font-bold pb-2">14</div>
            <span className="text-lg">Unassigned Tickets</span>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
