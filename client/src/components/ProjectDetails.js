import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import axios from "axios";
import "../App.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProjectDeleted from "./ProjectDeleted";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [error, setError] = useState(null);
  const [projectNotFound, setProjectNotFound] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState("");
  const baseURL = "http://localhost:5000/server";
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  //make the request
  useEffect(() => {
    axios
      .get(`${baseURL}/projects/${projectId}`)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        setProjectNotFound(true);
        // console.log(error);
      });
  }, []);

  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  };
  const onBlur = async (event) => {
    // console.log(event.target.value);
    // console.log(token);
    try {
      const res = await axios.put(`${baseURL}/projects/${projectId}`, project, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  const showBugs = () => {
    navigate(`/projects/${project._id}/bugs`, {
      state: { projectId: `${project._id}` },
    });
  };
  const showAlert = () => {
    setDeleteAlert(true);
  };
  const cancelDelete = () => {
    setDeleteAlert(false);
  };
  const deleteProject = async () => {
    console.log(project.createdBy.email);

    try {
      await axios
        .delete(`${baseURL}/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            projectOwnerEmail: project.createdBy.email,
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

  if (projectNotFound) return <ProjectDeleted />;
  if (!project) return <div>loading...</div>;

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
            <Button variant="danger" onClick={deleteProject}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      ) : (
        <div>
          <h2>Project Information</h2>

          <h3 onClick={showBugs}>Bugs</h3>
          <Button variant="danger" id="deleteProject" onClick={showAlert}>
            Delete Project
          </Button>
          <Form className="view-edit-form">
            {error ? <div className="error">{error}</div> : " "}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                value={project.title}
                onChange={(e) =>
                  setProject({ ...project, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Created By</Form.Label>
              {/* <Form.Control
                type="text"
                name="createdBy"
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                value={project.createdBy.username}
                onChange={(e) =>
                  setProject({ ...project, createdBy: e.target.value })
                }
              /> */}
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
              onChange={(e) =>
                setProject({ ...project, status: e.target.value })
              }
            >
              <option value="Active">Active</option>
              <option value="In-progress">In-progress</option>
              <option value="To be tested">To be tested</option>
              <option value="Delayed">Delayed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Select>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
