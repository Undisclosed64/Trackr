import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";

const SignUp = () => {
  const baseURL = "http://localhost:5000/server";
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState([]);

  const handleErrors = (err) => {
    // console.log(err.errors[0]);
    setErrors((errors) => [...errors, err.errors]);
    // console.log(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };
    try {
      const res = await axios.post(`${baseURL}/users`, newUser);
      console.log(res.data);
    } catch (error) {
      //console.log(error.response.data);
      handleErrors(error.response.data);
    }
  };
  return (
    <Form className="signUpForm" onSubmit={handleSubmit}>
      <h1 className="signUpHeader">Sign Up</h1>
      {errors.length !== 0
        ? errors[0].map((err) => {
            return <div key={err.param}>{err.msg}</div>;
          })
        : ""}
      <Form.Group className="mb-3">
        <Row>
          <Col>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              name="firstName"
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Last name"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              name="lastName"
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          required
          type="email"
          placeholder="Enter email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          name="email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          required
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          name="password"
        />
      </Form.Group>

      <Form.Select
        aria-label="Default select example"
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
        <option name="role">Select role</option>
        <option value="developer">Developer</option>
        <option value="project manager">Project manager</option>
        <option value="admin">Admin</option>
      </Form.Select>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
export default SignUp;
