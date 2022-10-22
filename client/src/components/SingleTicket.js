import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../App.css";
import Modal from "react-bootstrap/Modal";

const SingleTicket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const baseURL = "http://localhost:5000/server";
  const [error, setError] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    assignedDev: "",
    bugType: "",
    flag: "",
    severity: "",
    status: "",
    dueDate: "",
  });
  console.log(location.state.ticketId);
  const id = location.state.ticketId;
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${baseURL}/bugs/${id}`)
      .then((response) => {
        console.log(response.data);
        setTicket(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const showModel = () => {
    setDeleteAlert(true);
  };
  const cancelDelete = () => {
    setDeleteAlert(false);
  };
  const deleteTicket = async () => {
    console.log(ticket.createdBy.email);

    // try {
    //   await axios
    //     .delete(`${baseURL}/projects/${projectId}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //       data: {
    //         projectOwnerEmail: project.createdBy.email,
    //       },
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //       // setDeleteMsg(response.data.message);
    //     });
    // } catch (err) {
    //   if (err.response) {
    //     console.log(err);
    //     setError(err.response.data.message);
    //   } else {
    //     setError("Oops! Something went wrong!");
    //   }
    // }
  };
  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  };
  const onBlur = async (event) => {
    console.log(event.target.value);
    console.log(token);
    try {
      const res = await axios.put(`${baseURL}/bugs/${id}`, ticket, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
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
          <Form className="view-edit-form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="title"
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                value={ticket.title}
                onChange={(e) =>
                  setTicket({ ...ticket, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                value={ticket.description}
                onChange={(e) =>
                  setTicket({ ...ticket, description: e.target.value })
                }
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
                    value={ticket.assignedDev}
                    onChange={(e) =>
                      setTicket({ ...ticket, assignedDev: e.target.value })
                    }
                  />
                </Col>

                <Col>
                  <Form.Label>Bug Type</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    value={ticket.bugType}
                    onChange={(e) =>
                      setTicket({ ...ticket, bugType: e.target.value })
                    }
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
                    aria-label="Default select example"
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    value={ticket.status}
                    onChange={(e) =>
                      setTicket({ ...ticket, status: e.target.value })
                    }
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In-progress</option>
                    <option value="to be tested">To be tested</option>
                    <option value="closed">Closed</option>
                  </Form.Select>
                </Col>

                <Col>
                  <Form.Label>Due Date</Form.Label>
                  <div>{new Date(ticket.dueDate).toDateString()} </div>
                  <Form.Control
                    type="date"
                    name="dueDate"
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    value={ticket.dueDate}
                    onChange={(e) =>
                      setTicket({ ...ticket, dueDate: e.target.value })
                    }
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>Flag</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    value={ticket.flag}
                    onChange={(e) =>
                      setTicket({ ...ticket, flag: e.target.value })
                    }
                  >
                    <option value="internal">Internal</option>
                    <option value="external">External</option>
                  </Form.Select>
                </Col>

                <Col>
                  <Form.Label>Severity</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    value={ticket.severity}
                    onChange={(e) =>
                      setTicket({ ...ticket, severity: e.target.value })
                    }
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
