import React from "react";
import Sidebar from "../components/Sidebar";
import { useContext, useEffect, useState } from "react";
import noteContext from "../context/noteContext";
import axios from "axios";
import Ticket from "../components/Ticket";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const Home = ({ navbar }) => {
  const context = useContext(noteContext);
  const baseURL = "http://localhost:5000";
  const [ids, setIds] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [openTickets, setOpenTickets] = useState(0);
  const [unassignedTickets, setUnassignedTickets] = useState(0);

  //get projects id
  useEffect(() => {
    const projects = context.projects;
    setTotalProjects(projects.length);
    for (let i = 0; i < projects.length; i++) {
      setIds((ids) => [...ids, projects[i]._id]);
    }
  }, [context.projects]);

  //get total active projects count
  useEffect(() => {
    const getActiveProjects = async () => {
      try {
        const res = await axios.get(`${baseURL}/server/projects`, {
          params: {
            email: context.userEmail,
            filterActive: true,
          },
        });
        // console.log(res.data.projects);
        return setActiveProjects(res.data.projects.length);
      } catch {
        return null;
      }
    };
    getActiveProjects();
  }, [context.userEmail]);

  //get completed projects count
  useEffect(() => {
    const completedProjectsCount = async () => {
      try {
        const res = await axios.get(`${baseURL}/server/projects`, {
          params: {
            email: context.userEmail,
            filterCompleted: true,
          },
        });
        // console.log(res.data.projects);
        return setCompletedProjects(res.data.projects.length);
      } catch {
        return null;
      }
    };
    completedProjectsCount();
  }, [context.userEmail]);

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
          //console.log(response.data);
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

  //get unassigned tickets
  useEffect(() => {
    try {
      axios
        .get(`${baseURL}/server/bugs`, {
          params: {
            ids: ids,
            isFilterByUnassigned: true,
          },
        })
        .then((response) => {
          console.log(response.data);
          let count = 0;
          for (let i = 0; i < response.data.length; i++) {
            count = count + response.data[i].count;
          }
          console.log(count);
          setUnassignedTickets(count);
        });
    } catch (err) {
      console.log(err);
    }
  }, [ids]);

  const ticketData = {
    labels: ["Total tickets", "Open tickets", "Unassigned tickets"],
    datasets: [
      {
        label: "# of tickets",
        data: [totalTickets, openTickets, unassignedTickets],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderWidth: 4,
      },
    ],
  };
  const projectData = {
    labels: ["Total Projects", "Active Projects", "Completed Projects"],
    datasets: [
      {
        label: "# of projects",
        data: [totalProjects, activeProjects, completedProjects],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 4,
      },
    ],
  };
  return (
    <div className="">
      {navbar}
      <Sidebar />
      <section id="home" className="toggler py-10 px-3 md:mx-4">
        <h1 className="text-xl font-semibold">Welcome {context.userName}</h1>
        {/* container for boxes */}
        <div className="information-boxes my-4 grid gap-8 msm:grid-cols-2 vlg:grid-cols-4">
          <div className="box-wrapper bg-[url('svg.png')] bg-cover bg-sky-500/30 bg-no-repeat bg-center px-2 py-8 flex flex-col items-center rounded text-white ">
            <div className="text-3xl font-bold pb-2">{activeProjects}</div>
            <span className="text-lg">Active Projects</span>
          </div>

          <div className="box-wrapper bg-red-500 px-2 py-8 flex flex-col items-center rounded text-white">
            <div className="text-3xl font-bold pb-2">{totalTickets}</div>
            <span className="text-lg">Total Tickets</span>
          </div>

          <div className="box-wrapper bg-cyan-500 px-2 py-8 flex flex-col items-center rounded text-white">
            <div className="text-3xl font-bold pb-2">{openTickets}</div>
            <span className="text-lg">Open Tickets</span>
          </div>

          <div className="box-wrapper bg-teal-200 px-2 py-8 flex flex-col items-center rounded text-white">
            <div className="text-3xl font-bold pb-2">{unassignedTickets}</div>
            <span className="text-lg">Unassigned Tickets</span>
          </div>
        </div>

        <div className="chart-container my-14 px-2 flex flex-col msm:flex-row msm:w-1/2 msm:gap-8">
          <Doughnut
            data={ticketData}
            className="bg-brightWhite  rounded shadow-md msm:w-1/5 mb-4 msm:mb-0 p-2"
          />
          <Pie
            data={projectData}
            className="bg-brightWhite rounded shadow-md msm:w-1/5 p-2"
          />
        </div>
      </section>
    </div>
  );
};
export default Home;
