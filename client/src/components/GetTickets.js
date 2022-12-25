import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/noteContext";
import Sidebar from "../components/Sidebar";
import { sortBy } from "async";

const GetTickets = ({ navbar }) => {
  const [ids, setIds] = useState([]);
  const [bugs, setBugs] = useState([]);
  const baseURL = "http://localhost:5000";
  const navigate = useNavigate();
  const context = useContext(noteContext);

  const projects = context.projects;

  //get projects id
  useEffect(() => {
    const projects = context.projects;
    for (let i = 0; i < projects.length; i++) {
      setIds((ids) => [...ids, projects[i]._id]);
    }
  }, [context.projects]);

  //get tickets of all projects
  useEffect(() => {
    console.log(ids);
    getAllTickets();
  }, [ids]);

  const getAllTickets = async () => {
    try {
      await axios
        .get(`${baseURL}/server/bugs`, {
          params: {
            ids: ids,
          },
        })
        .then((response) => {
          console.log(response.data);
          setBugs(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  //get open tickets
  const sortByOpen = () => {
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
          setBugs(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  //get unassigned tickets
  const sortByUnassigned = () => {
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
          setBugs(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  //get closed tickets
  const sortByClosed = () => {
    try {
      axios
        .get(`${baseURL}/server/bugs`, {
          params: {
            ids: ids,
            isFilterByClosed: true,
          },
        })
        .then((response) => {
          console.log(response.data);
          setBugs(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const getTicketDetail = (id) => {
    navigate(`/tickets/${id}`, {
      state: { ticketId: `${id}` },
    });
  };

  const handleChange = (e) => {
    if (e.target.value === "open") {
      sortByOpen();
    } else if (e.target.value === "unassigned") {
      sortByUnassigned();
    } else if (e.target.value === "closed") {
      sortByClosed();
    } else {
      getAllTickets();
    }
  };
  if (!projects) return <div>Loading..</div>;

  return (
    <div>
      {navbar}
      <Sidebar />
      <section id="tickets" className="toggler py-10 px-2 md:mx-20">
        <div className="filter-wrapper flex justify-center items-center mb-4 gap-4 msm:justify-between">
          <select
            className="ticket-sort border-none text-brightOrange bg-transparent capitalize msm:ml-5"
            onChange={handleChange}
          >
            <option value="all">all tickets</option>
            <option value="open">all open </option>
            <option value="closed">all closed</option>
            <option value="unassigned">unassigned</option>
          </select>
          <div className="rightSide flex items-center justify-between msm:gap-4">
            <select className="view-sort border-none text-brightOrange bg-transparent capitalize">
              <option value="">classic</option>
              <option value="">plain</option>
            </select>
            <button
              className="bg-brightOrange text-brightWhite rounded-full baseline py-2 px-3 hover:bg-orange-400 font-medium hidden 
          sm:block"
            >
              Submit Ticket
            </button>
          </div>
        </div>
        {bugs.map((project) => {
          return (
            <div key={project._id} className="bugsHeaderProject">
              {project.project_info.map((pr) => {
                return (
                  <h3 key={pr._id} className="project-title">
                    {pr.title}
                  </h3>
                );
              })}

              {/* second loop */}
              {project.records.map((ticket) => {
                return (
                  <div key={ticket._id} className="ticket">
                    <h3
                      className="ticket-title"
                      onClick={() => getTicketDetail(ticket._id)}
                    >
                      {ticket.title}
                    </h3>
                    <div>{new Date(ticket.createdOn).toDateString()}</div>
                    <div>{ticket.assignedDev}</div>
                    <div>{new Date(ticket.dueDate).toDateString()}</div>
                    <div>{ticket.status}</div>
                    <div>{ticket.severity}</div>
                    <div>{ticket.flag}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>
    </div>
  );
};
export default GetTickets;
