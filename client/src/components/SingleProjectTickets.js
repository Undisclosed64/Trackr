import { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineExternalLink } from "react-icons/hi";
import { HiOutlineTicket } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const SingleProjectTickets = ({ id }) => {
  const [tickets, setTickets] = useState([]);
  const baseURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  //get tickets of the project
  useEffect(() => {
    try {
      axios
        .get(`${baseURL}/server/projects/${id}/bugs`, {})
        .then((response) => {
          console.log(response.data);
          setTickets(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const getTicketDetail = (id) => {
    navigate(`/tickets/${id}`, {
      state: { ticketId: `${id}` },
    });
  };

  console.log(tickets);

  return (
    <>
      {tickets.length > 0 ? (
        <div className="tickets-container whitespace-nowrap">
          <div className="ticketHeader-wrapper hidden md:grid grid-flow-col auto-cols-fr gap-12  uppercase mb-2 pb-1 border-b-2 text-lightGray">
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
          {tickets.map((ticket) => {
            return (
              <div
                key={ticket._id}
                className="ticket-wrapper border-bottom hover:bg-red-50 hover:text-brightOrange hover:cursor-pointer py-2 px-8 md:grid 
            grid-flow-col auto-cols-fr gap-12"
                onClick={() => getTicketDetail(ticket._id)}
              >
                <div className="ticket-title flex justify-between items-center">
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
          })}
        </div>
      ) : (
        <div className="text-lightGray">This project has no tickets.</div>
      )}
    </>
  );
};
export default SingleProjectTickets;
