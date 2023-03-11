import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../App.css";
import TicketActivites from "./TicketActivities";
import noteContext from "../context/noteContext";
import { BsInfoSquare } from "react-icons/bs";
import { IoIosArrowDropup } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

const SingleTicket = () => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const location = useLocation();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [error, setError] = useState(null);
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
  const [createdOn, setCreatedOn] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [updatedMsg, setUpdatedMsg] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [close, setClose] = useState(false);

  const [displayActivites, setDisplayActivities] = useState(false);

  const id = location.state.ticketId;
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${baseURL}/server/bugs/${id}`)
      .then((response) => {
        console.log(response.data.createdBy);
        setTicket(response.data);
        setCreatedOn(response.data.createdOn);
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

  const closeModal = () => {
    if (showMore) {
      setShowMore(false);
    }
  };
  const showMoreInfo = () => {
    !showMore ? setShowMore(true) : setShowMore(false);
  };
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
  console.log(ticket);
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
      }, 3000);
    } catch (err) {
      if (err.response) {
        console.log(err);
        setError(err.response.data.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
      } else {
        setError("Oops! Something went wrong!");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }
  };
  const closeDropdown = () => {
    !close ? setClose(true) : setClose(false);
  };

  if (!ticket) return <div>Loading...</div>;

  return (
    <div onClick={closeModal}>
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
      <section className="singleTicket py-10 px-4 overflow-scroll h-screen lg:w-3/4 lg:mx-auto">
        <div className="view-edit-form text-black px-2">
          {updatedMsg ? (
            <div className="sucess-msg font-medium py-3 px-1 text-center text-brightWhite">
              {updatedMsg}
            </div>
          ) : (
            ""
          )}
          {error ? (
            <div className="font-medium text-brightWhite bg-red-500 py-3 px-1 text-center my-2">
              {error}
            </div>
          ) : (
            " "
          )}
          <input
            className="text-xl font-medium bg-transparent w-full border-none focus:bg-brightWhite mb-2"
            type="text"
            name="title"
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="createdInfo flex gap-2 pl-3 mb-6 items-center text-lg">
            <div className=" text-lightGray border-r-2 pr-4">
              By {createdBy}
            </div>
            <div
              className="i-wrapper text-brightOrange hover:cursor-pointer p-2 rounded-full hover:bg-veryLightGray"
              onClick={showMoreInfo}
            >
              <BsInfoSquare className="moreInfo-icon" />
            </div>
            {showMore ? (
              <div
                className="more-info shadow bg-brightWhite flex justify-center items-center flex-col h-32 rounded-md absolute z-10 mx-auto w-5/6 md:w-1/3 top-36 left-8 md:right-80"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="pb-2 text-lightGray">Created on</div>
                <div className="text-black">
                  {new Date(createdOn).toDateString()}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="status-wrapper shadow bg-brightWhite mb-4 px-3 py-3 msm:px-6">
            <div className="text-lg font-medium mb-2 flex items-center capitalize">
              <IoIosArrowDropup
                className="text-xl text-brightOrange mr-2"
                onClick={closeDropdown}
              />
              Current status
            </div>
            <select
              name="status"
              className="border-none w-full mb-2 msm:px-6"
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
          </div>
          <div className="description-wrapper mb-4 bg-brightWhite px-3 py-3 shadow">
            <div className="text-lg font-medium mb-2 flex items-center">
              <IoIosArrowDropup
                className="text-xl text-brightOrange mr-2"
                onClick={closeDropdown}
              />
              Description
            </div>
            {!close ? (
              <input
                className="border-none w-full pl-0 msm:px-6"
                type="text"
                name="description"
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : (
              ""
            )}
          </div>
          <div className="bug-info-wrapper bg-brightWhite px-3 py-2 mb-4">
            <div className="capitalize text-lg font-medium mb-3 flex items-center">
              <IoIosArrowDropup className="text-xl text-brightOrange mr-2" />
              ticket information
            </div>
            <div className="assigned-warpper mb-3 border-b msm:mx-6">
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
            <div className="dueDate-wrapper mb-3 border-b py-2 msm:mx-6">
              <div className="capitalize pb-2 text-lightGray">due date</div>
              {new Date(dueDate).toDateString()}{" "}
            </div>
            <div className="severity-wrapper border-b mb-3 msm:mx-6">
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
            <div className="type-wrapper border-b mb-3 msm:mx-6">
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

            <div className="flag-wrapper border-b mb-3 msm:mx-6">
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
