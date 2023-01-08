import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../App.css";
import Modal from "react-bootstrap/Modal";
import TicketActivites from "./TicketActivities";
import noteContext from "../context/noteContext";
import { BsInfoSquare } from "react-icons/bs";
import { IoIosArrowDropup } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

const SingleTicket = () => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const location = useLocation();
  const baseURL = "http://localhost:5000";
  const [error, setError] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [ticket, setTicket] = useState("");
  const [title, setTitle] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [description, setDescription] = useState("");
  const [assignedDev, setAssignedDev] = useState("");
  const [bugType, setBugType] = useState("");
  const [flag, setFlag] = useState("");
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [updatedMsg, setUpdatedMsg] = useState(null);

  const [displayActivites, setDisplayActivities] = useState(false);

  const id = location.state.ticketId;
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${baseURL}/server/bugs/${id}`)
      .then((response) => {
        console.log(response.data.createdBy);
        setTicket(response.data);
        setTitle(response.data.title);
        setCreatedBy(response.data.createdBy.username);
        setDescription(response.data.description);
        setAssignedDev(response.data.assignedDev);
        setBugType(response.data.bugType);
        setFlag(response.data.flag);
        setSeverity(response.data.severity);
        setStatus(response.data.status);
        setDueDate(response.data.dueDate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const showActivites = () => {
    setDisplayActivities(true);
  };

  const showModel = () => {
    setDeleteAlert(true);
  };
  const cancelDelete = () => {
    setDeleteAlert(false);
  };
  const deleteTicket = async () => {
    console.log(ticket.createdBy.email);

    try {
      await axios
        .delete(`${baseURL}/server/bugs/${ticket._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            tickeRaiser: ticket.createdBy.email,
          },
        })
        .then((response) => {
          console.log(response.data);
          // setDeleteMsg(response.data.message);
        });
    } catch (err) {
      if (err.response) {
        console.log(err);
        setError(err.response.data.message);
      } else {
        setError("Oops! Something went wrong!");
      }
    }
  };
  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  };
  const onBlur = async (event) => {
    const fieldName = event.target.name;
    let value = "";
    switch (fieldName) {
      case "title":
        value = event.target.value;
        break;
      case "description":
        value = event.target.value;
        break;
      case "assignedDev":
        value = event.target.value;
        break;
      case "bugType":
        value = event.target.value;
        break;
      case "flag":
        value = event.target.value;
        break;
      case "severity":
        value = event.target.value;
        break;
      case "status":
        value = event.target.value;
        break;
      case "dueDate":
        value = event.target.value;
        break;
      default:
        value = "";
    }

    try {
      const res = await axios.put(
        `${baseURL}/server/bugs/${id}`,
        { fieldName, value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setUpdatedMsg("Updated Successfully");
      setTimeout(() => {
        setUpdatedMsg(null);
      }, 2000);
    } catch (err) {
      if (err.response) {
        console.log(err);
        setError(err.response.data.message);
      } else {
        setError("Oops! Something went wrong!");
      }
    }
  };
  if (!ticket) return <div>Loading...</div>;
  return (
    <div>
      {/* {deleteAlert ? (
        <Modal.Dialog className="deletePopUp">
          <Modal.Header>
            <Modal.Title>
              This project will be deleted and it can not be recovered.
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to delete the project?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteTicket}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      ) : (
        <div>
          <Button variant="danger" id="deleteProject" onClick={showModel}>
            Delete
          </Button>
          <button onClick={showActivites}>Activity Stream</button>
          {displayActivites ? (
            <TicketActivites activities={ticket.trackActivities} />
          ) : (
            ""
          )} */}
      <section className="py-10 px-4 overflow-scroll h-screen lg:w-3/4 lg:mx-auto">
        <div className="view-edit-form text-black px-2">
          {updatedMsg ? <div className="sucess-msg ">{updatedMsg}</div> : ""}
          {error ? <div className="error">{error}</div> : " "}
          <input
            className="text-xl font-medium bg-transparent w-full border-none focus:bg-brightWhite mb-2"
            type="text"
            name="title"
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="createdInfo flex gap-4 pl-3 mb-6 items-center text-lg">
            <div className=" text-lightGray border-r-2 pr-4">
              By {createdBy}
            </div>
            <BsInfoSquare className="text-brightOrange" />
            {/* <div className="info">
              <div>Created on</div>
            </div> */}
          </div>
          <div className="status-wrapper shadow bg-brightWhite h-24 mb-4">
            <select
              name="status"
              className="border-none w-full mb-2 font-medium"
              onKeyDown={onKeyDown}
              onBlur={onBlur}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="open">Open</option>
              <option value="in-progress">In-progress</option>
              <option value="to be tested">To be tested</option>
              <option value="closed">Closed</option>
            </select>
            <div className="uppercase pl-3">current status</div>
          </div>
          <div className="description-wrapper mb-4 h-28 bg-brightWhite px-3 py-2 shadow">
            <div className="text-lg font-medium mb-2 flex items-center">
              <IoIosArrowDropup className="text-xl text-brightOrange mr-2" />
              Description
            </div>
            <input
              className="border-none w-full pl-0"
              type="text"
              name="description"
              onKeyDown={onKeyDown}
              onBlur={onBlur}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="bug-info-wrapper bg-brightWhite px-3 py-2 mb-4">
            <div className="capitalize text-lg font-medium mb-3 flex items-center">
              <IoIosArrowDropup className="text-xl text-brightOrange mr-2" />
              ticket information
            </div>
            <div className="assigned-warpper mb-3 border-b">
              <div className="pb-2 text-lightGray">Assigned to </div>
              <div className="assigned-wrapper flex items-center">
                <FaUserCircle className="text-2xl text-brightOrange" />
                <input
                  type="text"
                  className="border-none font-medium"
                  name="assignedDev"
                  onKeyDown={onKeyDown}
                  onBlur={onBlur}
                  value={assignedDev}
                  onChange={(e) => setAssignedDev(e.target.value)}
                />
              </div>
            </div>
            <div className="dueDate-wrapper mb-3 border-b py-2">
              <div className="capitalize pb-2 text-lightGray">due date</div>
              {new Date(dueDate).toDateString()}{" "}
            </div>
            <div className="severity-wrapper border-b mb-3 ">
              <div className="pb-2 text-lightGray">Severity</div>
              <select
                name="severity"
                className="border-none w-full font-medium pl-0"
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
              >
                <option value="critical">Critical</option>
                <option value="major">Major</option>
                <option value="minor">Minor</option>
              </select>
            </div>
            <div className="type-wrapper border-b mb-3 ">
              <div className="pb-2 text-lightGray capitalize">ticket type</div>

              <select
                className="border-none w-full font-medium pl-0"
                name="bugType"
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                value={bugType}
                onChange={(e) => setBugType(e.target.value)}
              >
                <option value="ui">UI</option>
                <option value="maintenance">Maintenance</option>
                <option value="runtime">Runtime</option>
                <option value="new feature">New Development</option>
              </select>
            </div>

            <div className="flag-wrapper border-b mb-3">
              <div className="pb-2 text-lightGray capitalize">Flag</div>

              <select
                name="flag"
                className="border-none w-full font-medium pl-0"
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
              >
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
//       ;
//     </div>
//   );
// };

export default SingleTicket;
