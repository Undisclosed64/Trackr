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
      <section
        id="tickets"
        className="toggler py-20 fixed top-0 left-0 right-0 "
      >
        <div
          className="filter-wrapper flex justify-center items-center msm:justify-between bg-brightWhite drop-shadow rounded-md 
          mb-6 gap-4 mx-2 py-2 px-1 md:mx-4 md:py-4"
        >
          <select
            className="ticket-sort border-none text-brightOrange bg-transparent capitalize"
            onChange={handleChange}
          >
            <option value="all">all tickets</option>
            <option value="open">all open </option>
            <option value="closed">all closed</option>
            <option value="unassigned">unassigned</option>
          </select>
          <div className="rightSide flex items-center justify-between msm:gap-4 pr-2">
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
        <div className="tickets-header flex justify-between">
          <div className="ticketHeader-wrapper">
            <div className="w-56">Ticket</div>
          </div>
          <div className="w-48">Created</div>
          <div className="w-24">Assigned developer</div>
          <div className="w-24">Status</div>
          <div className="w-24">Severity</div>
          <div className="w-24">Flag</div>
          <div className="w-48">Due date</div>
        </div>
        <div className="tickets-container h-96 bg-red-100 overflow-auto">
          {bugs.map((project) => {
            return (
              <div key={project._id}>
                {project.project_info.map((pr) => {
                  return (
                    <div
                      key={pr._id}
                      className="project-title capitalize font-medium"
                    >
                      {pr.title}
                    </div>
                  );
                })}

                {/* second loop */}
                {project.records.map((ticket) => {
                  return (
                    <div
                      key={ticket._id}
                      className="ticket py-2 border-bottom flex items-baseline"
                    >
                      <div
                        className="ticket-title w-96 bg-red-200 mr-8"
                        onClick={() => getTicketDetail(ticket._id)}
                      >
                        {ticket.title}
                      </div>
                      <div className="w-48 bg-lightWhite mr-8 ">
                        {new Date(ticket.createdOn).toDateString()}
                      </div>
                      <div className="w-48 bg-lightWhite mr-8">
                        {ticket.assignedDev}
                      </div>

                      <div className="w-24 bg-lightWhite mr-8">
                        {ticket.status}
                      </div>
                      <div className="w-24 bg-lightWhite mr-20">
                        {ticket.severity}
                      </div>
                      <div className="w-24 bg-lightWhite mr-20">
                        {ticket.flag}
                      </div>
                      <div className="w-40 bg-lightWhite mr-8">
                        {new Date(ticket.dueDate).toDateString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
export default GetTickets;
