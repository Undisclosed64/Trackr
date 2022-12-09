import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/noteContext";

const GetTickets = () => {
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
    const getBugs = async () => {
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
    getBugs();
  }, [ids]);

  const getTicketDetail = (id) => {
    navigate(`/tickets/${id}`, {
      state: { ticketId: `${id}` },
    });
  };
  if (!projects) return <div>Loading..</div>;

  return (
    <div>
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
    </div>
  );
};
export default GetTickets;
