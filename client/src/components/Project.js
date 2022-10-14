import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "",
  });
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(null);

  const baseURL = "http://localhost:5000/server";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    // console.log(formData);

    try {
      const res = await axios.post(`${baseURL}/projects`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
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
      <h1>Create Project</h1>
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
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Control
                type="date"
                placeholder="Start date"
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                name="startDate"
              />
            </Col>
            <Col>
              <Form.Control
                type="date"
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                name="endDate"
                placeholder="End date"
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="Description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            name="description"
          />
        </Form.Group>

        <Form.Select
          aria-label="Default select example"
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="In-progress">In-progress</option>
          <option value="To be tested">To be tested</option>
          <option value="Delayed">Delayed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </Form.Select>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default CreateProject;
