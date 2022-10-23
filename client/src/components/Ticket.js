import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Ticket = (props) => {
  const [projects, setProjects] = useState([]);
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const baseURL = "http://localhost:5000/server";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedDev: "",
    bugType: "",
    flag: "",
    severity: "",
    status: "",
    dueDate: "",
    createdOn: "",
    project: "",
  });
  const [ticket, setTicket] = useState();
  const email = props.user.email;
  console.log(props.user);

  useEffect(() => {
    axios
      .get(`${baseURL}/projects`, {
        params: {
          email: email,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProjects(response.data.projects);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseURL}/bugs`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setTicket(res.data);
      // console.log(ticket._id);
      navigate(`/tickets/${ticket._id}`, {
        state: { ticketId: `${ticket._id}` },
      });
    } catch (err) {
      // console.log(err.response.data.message);
      if (err.response) {
        // console.log(err.response.data);
        if (err.response.data.message) setError(err.response.data.message);
        else setErrors((errors) => [...errors, err.response.data.errors]);
      } else {
        setError("Oops! Something went wrong!");
      }
    }
  };

  return (
    <div>
      <h1>Create Ticket</h1>
      {errors.length !== 0
        ? errors[0].map((err) => {
            return (
              <div key={err.param} className="error">
                {err.msg}
              </div>
            );
          })
        : ""}
      {error ? <div className="error">{error}</div> : " "}
      <Form className="signUpForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            required
            type="text"
            placeholder="Title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            name="title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            name="description"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Assigned Dev"
            onChange={(e) =>
              setFormData({ ...formData, assignedDev: e.target.value })
            }
            name="assignedDev"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
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
              <Form.Control
                type="date"
                name="dueDate"
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
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
                onChange={(e) =>
                  setFormData({ ...formData, flag: e.target.value })
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
                onChange={(e) =>
                  setFormData({ ...formData, severity: e.target.value })
                }
              >
                <option value="critical">Critical</option>
                <option value="major">Major</option>
                <option value="minor">Minor</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) =>
            setFormData({ ...formData, project: e.target.value })
          }
        >
          {projects.map((project) => {
            return (
              <option value={project._id} key={project._id}>
                {project.title}
              </option>
            );
          })}
        </Form.Select>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default Ticket;
