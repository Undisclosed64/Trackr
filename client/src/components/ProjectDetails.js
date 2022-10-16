import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import axios from "axios";
import "../App.css";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({
    title: "",
    createdBy: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "",
  });
  const baseURL = "http://localhost:5000/server";

  //make the request
  useEffect(() => {
    axios.get(`${baseURL}/projects/${projectId}`).then((response) => {
      setProject(response.data);
    });
  }, []);

  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  };
  const onBlur = async (event) => {
    // console.log(event.target.value);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(`${baseURL}/projects/${projectId}`, project, {
        headers: {
          Authoriztion: `Bearer ${token}`,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!project) return <div>loading..</div>;
  return (
    <div>
      <h2>Project Information</h2>
      <Form className="viewEditForm">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Created By</Form.Label>
          <Form.Control
            type="text"
            name="createdBy"
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            value={project.createdBy}
            onChange={(e) =>
              setProject({ ...project, createdBy: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>Start date</Form.Label>
              <div>{new Date(project.startDate).toDateString()} </div>
              <Form.Control
                type="date"
                name="startDate"
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                value={project.startDate}
                onChange={(e) =>
                  setProject({ ...project, startDate: e.target.value })
                }
              />
            </Col>
            <Col>
              <Form.Label>End date</Form.Label>
              <div>{new Date(project.endDate).toDateString()} </div>

              <Form.Control
                type="date"
                name="endDate"
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                value={project.endDate}
                onChange={(e) =>
                  setProject({ ...project, endDate: e.target.value })
                }
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
          />
        </Form.Group>

        <Form.Label>Status</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          value={project.status}
          onChange={(e) => setProject({ ...project, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="In-progress">In-progress</option>
          <option value="To be tested">To be tested</option>
          <option value="Delayed">Delayed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </Form.Select>
      </Form>

      {/* <input
        type="text"
        aria-label="project-title"
        value={location.state.title}
        onChange={onChange}
      ></input>
      <input
        type="text"
        aria-label="created-by"
        value={location.state.createdBy}
        onChange={onChange}
      ></input>
      <input
        type="text"
        aria-label="start-date"
        value={location.state.startDate}
        onChange={onChange}
      ></input>
      <input
        type="text"
        aria-label="end-date"
        value={location.state.endDate}
        onChange={onChange}
      ></input>
      <input
        type="text"
        aria-label="status"
        value={location.state.status}
        onChange={onChange}
      ></input> */}
    </div>
  );
};

export default ProjectDetails;
