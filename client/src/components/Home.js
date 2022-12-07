import React from "react";
import Sidebar from "../components/Sidebar";
import { useContext, useEffect, useState } from "react";
import noteContext from "../context/noteContext";
import axios from "axios";

const Home = ({ navbar }) => {
  const context = useContext(noteContext);
  const baseURL = "http://localhost:5000";
  const [ids, setIds] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);
  const [openTickets, setOpenTickets] = useState(0);

  //get projects id
  useEffect(() => {
    const projects = context.projects;
    for (let i = 0; i < projects.length; i++) {
      setIds((ids) => [...ids, projects[i]._id]);
    }
  }, [context.projects]);

  //get total tickets count
  useEffect(() => {
    try {
      axios
        .get(`${baseURL}/server/bugs`, {
          params: {
            ids: ids,
          },
        })
        .then((response) => {
          console.log(response.data);
          let count = 0;
          for (let i = 0; i < response.data.length; i++) {
            count = count + response.data[i].count;
          }
          console.log(count);
          setTotalTickets(count);
        });
    } catch (err) {
      console.log(err);
    }
  }, [ids]);

  //get total active projects count
  useEffect(() => {
    const updateProjects = async () => {
      try {
        const res = await axios.get(`${baseURL}/server/projects`, {
          params: {
            email: context.userEmail,
            filterStatus: true,
          },
        });
        // console.log(res.data.projects);
        return setActiveProjects(res.data.projects.length);
      } catch {
        return null;
      }
    };
    updateProjects();
  }, [context.userEmail]);

  //get open tickets count
  useEffect(() => {
    try {
      axios
        .get(`${baseURL}/server/bugs`, {
          params: {
            ids: ids,
            isFilterByOpenStatus: true,
          },
        })
        .then((response) => {
          console.log(response.data);
          let count = 0;
          for (let i = 0; i < response.data.length; i++) {
            count = count + response.data[i].count;
          }
          console.log(count);
          setOpenTickets(count);
        });
    } catch (err) {
      console.log(err);
    }
  }, [ids]);

  return (
    <div>
      {navbar}
      <Sidebar />
      <section id="home" className="toggler py-10 px-3 md:mx-4">
        <h1 className="text-xl font-semibold">Welcome {context.userName}</h1>
        {/* container for boxes */}
        <div className="information-boxes my-4 grid gap-8 msm:grid-cols-2 vlg:grid-cols-4">
          <div className="box-wrapper bg-teal-500 px-2 py-8 flex flex-col items-center rounded-lg text-white">
            <div className="text-3xl font-bold pb-2">{activeProjects}</div>
            <span className="text-lg">Active Projects</span>
          </div>

          <div className="box-wrapper bg-red-500 px-2 py-8 flex flex-col items-center rounded-lg text-white">
            <div className="text-3xl font-bold pb-2">{totalTickets}</div>
            <span className="text-lg">Total Tickets</span>
          </div>

          <div className="box-wrapper bg-cyan-500 px-2 py-8 flex flex-col items-center rounded-lg text-white">
            <div className="text-3xl font-bold pb-2">{openTickets}</div>
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
