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

const SingleTicket = () => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const location = useLocation();
  const baseURL = "http://localhost:5000/server";
  const [error, setError] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [ticket, setTicket] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedDev, setAssignedDev] = useState("");
  const [bugType, setBugType] = useState("");
  const [flag, setFlag] = useState("");
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [displayActivites, setDisplayActivities] = useState(false);

  const id = location.state.ticketId;
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${baseURL}/bugs/${id}`)
      .then((response) => {
        console.log(response.data);
        setTicket(response.data);
        setTitle(response.data.title);
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
        .delete(`/server/bugs/${ticket._id}`, {
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
        `/server/bugs/${id}`,
        { fieldName, value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
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
      {deleteAlert ? (
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
          <h1>Ticket Details</h1>
          <Button variant="danger" id="deleteProject" onClick={showModel}>
            Delete
          </Button>
          <button onClick={showActivites}>Activity Stream</button>
          {displayActivites ? (
            <TicketActivites activities={ticket.trackActivities} />
          ) : (
            ""
          )}
          <Form className="view-edit-form">
            {error ? <div className="error">{error}</div> : " "}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="title"
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>Assigned Developer</Form.Label>
                  <Form.Control
                    type="text"
                    name="assignedDev"
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    value={assignedDev}
                    onChange={(e) => setAssignedDev(e.target.value)}
                  />
                </Col>

                <Col>
                  <Form.Label>Bug Type</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
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
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    aria-label="Default select example"
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In-progress</option>
                    <option value="to be tested">To be tested</option>
                    <option value="closed">Closed</option>
                  </Form.Select>
                </Col>

                <Col>
                  <Form.Label>Due Date</Form.Label>
                  <div>{new Date(dueDate).toDateString()} </div>
                  <Form.Control
                    type="date"
                    name="dueDate"
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>Flag</Form.Label>
                  <Form.Select
                    name="flag"
                    aria-label="Default select example"
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                  >
                    <option value="internal">Internal</option>
                    <option value="external">External</option>
                  </Form.Select>
                </Col>

                <Col>
                  <Form.Label>Severity</Form.Label>
                  <Form.Select
                    name="severity"
                    aria-label="Default select example"
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                  >
                    <option value="critical">Critical</option>
                    <option value="major">Major</option>
                    <option value="minor">Minor</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </div>
      )}
      ;
    </div>
  );
};

export default SingleTicket;
