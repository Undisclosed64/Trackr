import React from "react";
import { useContext, useEffect, useState } from "react";
import noteContext from "../../context/noteContext";
import axios from "axios";
import Loader from "../../components/Loader";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [ids, setIds] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [openTickets, setOpenTickets] = useState(0);
  const [unassignedTickets, setUnassignedTickets] = useState(0);
  const context = useContext(noteContext);

  const projects = context.projects;

  // get projects ids of the current user
  useEffect(() => {
    setTotalProjects(projects.length);
    for (let i = 0; i < projects.length; i++) {
      setIds((ids) => [...ids, projects[i]._id]);
    }
  }, [projects]);

  //get total active projects count
  useEffect(() => {
    const getActiveProjects = async () => {
      try {
        const res = await axios.get(`${baseURL}/server/projects`, {
          params: {
            email: context.user.email,
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
  }, [context.user]);

  //get completed projects count for chart
  useEffect(() => {
    const completedProjectsCount = async () => {
      try {
        const res = await axios.get(`${baseURL}/server/projects`, {
          params: {
            email: context.user.email,
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
  }, [context.user]);

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
          // console.log(response.data);
          let count = 0;
          for (let i = 0; i < response.data.length; i++) {
            count = count + response.data[i].count;
          }
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
          // console.log(response.data);
          let count = 0;
          for (let i = 0; i < response.data.length; i++) {
            count = count + response.data[i].count;
          }
          setUnassignedTickets(count);
        });
    } catch (err) {
      console.log(err);
    }
  }, [ids]);

  const data = {
    labels: ["Tickets"],
    datasets: [
      {
        label: "Total",
        // backgroundColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 105, 180, 1)",
        data: [totalTickets],
      },
      {
        label: "Open",
        // backgroundColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(88, 214, 141, 1) ",

        data: [openTickets],
      },
      {
        label: "Unassigned",
        // backgroundColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 168, 0, 1)",

        data: [unassignedTickets],
      },
    ],
  };
  // const ticketData = {
  //   labels: ["Total tickets", "Open tickets", "Unassigned tickets"],
  //   datasets: [
  //     {
  //       label: "# of tickets",
  //       data: [totalTickets, openTickets, unassignedTickets],
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //         "rgba(153, 102, 255, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(153, 102, 255, 0.2)",
  //       ],
  //       borderWidth: 4,
  //     },
  //   ],
  // };
  const projectData = {
    labels: ["Total", "Active", "Completed"],
    datasets: [
      {
        label: "projects",
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
  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        ticks: {
          beginAtZero: true,
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          display: false,
        },
        categoryPercentage: 1.0,
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "Ticket Status",
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
  };

  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 60,
    animation: {
      duration: 2000,
      easing: "easeInOutCirc",
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "Project Status",
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
  };

  if (!context.user) return <Loader />;
  return (
    <div className="">
      <section id="home" className="toggler my-20 fixed left-0 right-0">
        <h1 className="text-xl msm:text-3xl font-medium text-primaryBlack px-10">
          Welcome,{context.user.firstName}!
        </h1>
        <div className="inner-container overflow-auto h-screen py-10 pb-20 px-10">
          {/* container for boxes */}
          <div className="information-boxes my-4 grid gap-8 msm:grid-cols-2 vlg:grid-cols-4 mb-6">
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

            <div className="box-wrapper bg-yellow-500 px-2 py-8 flex flex-col items-center rounded text-white">
              <div className="text-3xl font-bold pb-2">{unassignedTickets}</div>
              <span className="text-lg">Unassigned Tickets</span>
            </div>
          </div>

          {/* <div className="chart-container my-14 msm:px-6 flex flex-col msm:flex-row msm:w-1/2 msm:gap-8">
            <Doughnut
              data={ticketData}
              className="bg-brightWhite  rounded shadow-md p-2 msm:w-1/5 mb-4 msm:mb-0"
            />
            <Pie
              data={projectData}
              className="bg-brightWhite rounded shadow-md msm:w-1/5 p-2 "
            />
          </div> */}
          {/* <div className="chart-wrapper rounded shadow-md p-2 msm:p-4 ">
              <Pie data={projectData} className="" options={options2} />
            </div> */}
          <div className="chart-container my-16 grid gap-8 msm:grid-cols-2 justify-center">
            <div
              className="chart-wrapper  p-2 msm:p-4 bg-gradient-to-b from-white to-gray-200 shadow-md rounded-lg border"
              style={{ height: "400px" }}
            >
              <Bar data={data} options={options} />
            </div>
            <div
              className="chart-wrapper p-2 msm:p-4 bg-gradient-to-b from-white to-gray-200 shadow-lg rounded-lg border"
              style={{ height: "400px" }}
            >
              <Doughnut data={projectData} className="" options={options2} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
