import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../../context/noteContext";
import { IoIosArrowDropup } from "react-icons/io";
import { HiOutlineExternalLink } from "react-icons/hi";
import { HiOutlineTicket } from "react-icons/hi";
import { React } from "react";
import { CreateFormHandler } from "../../components/CreateFormHandler";

const Tickets = () => {
  const [ids, setIds] = useState([]);
  const [bugs, setBugs] = useState([]);
  const baseURL = "http://localhost:5000";
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const [dropdown, setDropDown] = useState(false);
  const [createTicket, setCreateTicket] = useState(false);
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
    getAllTickets();
  }, [ids]);

  console.log(createTicket);

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
  const closeDropDown = () => {
    !dropdown ? setDropDown(true) : setDropDown(false);
  };
  const handleCancel = () => {
    setCreateTicket(false);
    //remove overflow effects
    const overlayRoot = document.querySelector(".overlay-root");
    overlayRoot.classList.remove("overlay-container");
    const sidebar = document.querySelector("#sidebar");
    sidebar.classList.remove("hideOverflow");
    const navbar = document.querySelector("#top-navbar");
    navbar.classList.remove("removeZindex");
  };
  if (!projects) return <div>Loading..</div>;

  return (
    <div>
      {createTicket ? (
        <CreateFormHandler
          ticketCreateForm={createTicket}
          onCancel={handleCancel}
        />
      ) : (
        ""
      )}
      {/* {createTicket ? (
        <Navbar sectionName="Tickets" isDisplayed={createTicket} />
      ) : (
        <Navbar sectionName="Tickets" />
      )}
      <Sidebar /> */}
      <section
        id="tickets"
        className="toggler fixed py-20 top-0 left-0 right-0 "
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
          sm:block z-10"
              onClick={() => setCreateTicket(true)}
            >
              Submit Ticket
            </button>
          </div>
        </div>

        <div className="tickets-container overflow-auto whitespace-nowrap py-2 h-96 md:h-80">
          <div className="ticketHeader-wrapper hidden md:grid grid-flow-col auto-cols-fr gap-12 mx-8 uppercase mb-2 pb-1 border-b-2 text-lightGray">
            <div className="flex items-center">
              <HiOutlineTicket className="text-lg mr-2" />
              Ticket
            </div>
            <div className="md:grid grid-flow-col gap-6">
              <div className="w-40">Assigned developer</div>
              <div className="w-40  ">Created</div>
              <div className="w-32  ">Status</div>
              <div className="w-24  ">Severity</div>
              <div className="w-24  ">Flag</div>
              <div className="w-40  ">Due date</div>
            </div>
          </div>
          {bugs.map((project) => {
            return (
              <div key={project._id} className="text-black">
                {project.project_info.map((pr) => {
                  return (
                    <div
                      key={pr._id}
                      className="project-title capitalize font-medium flex items-center bg-lightBlue p-1 py-2"
                    >
                      <IoIosArrowDropup
                        className="text-xl text-brightOrange mr-2"
                        onClick={closeDropDown}
                      />
                      {pr.title}
                    </div>
                  );
                })}

                {/* second loop */}

                {!dropdown
                  ? project.records.map((ticket) => {
                      return (
                        <div
                          key={ticket._id}
                          className="ticket-wrapper border-bottom hover:bg-red-50 hover:text-brightOrange hover:cursor-pointer py-2 px-8 md:grid 
        grid-flow-col auto-cols-fr gap-12"
                        >
                          <div
                            className="ticket-title flex justify-between items-center"
                            onClick={() => getTicketDetail(ticket._id)}
                          >
                            {ticket.title}
                            <HiOutlineExternalLink className="external-link text-brightOrange text-lg hidden" />
                          </div>

                          <div className="ticket-details-wrapper hidden md:grid grid-flow-col gap-6">
                            <div className="w-40 ">{ticket.assignedDev}</div>
                            <div className="w-40 ">
                              {new Date(ticket.createdOn).toDateString()}
                            </div>
                            <div className="w-32 first-letter:text-center text-white">
                              <span className="w-24 h-24 py-1 px-4 rounded-full bg-blue">
                                {ticket.status}
                              </span>
                            </div>
                            <div className="w-24  ">{ticket.severity}</div>
                            <div className="w-24 ">{ticket.flag}</div>
                            <div className="w-40 text-red-600">
                              {new Date(ticket.dueDate).toDateString()}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
export default Tickets;
