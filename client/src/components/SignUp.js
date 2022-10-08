import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SignUp = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${props.baseURL}/server/users`, {}, (err, res) => {
      console.log(res.data);
    });
  };
  return (
    <Form className="signUpForm">
      <h1 className="signUpHeader">Sign Up</h1>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Full name</Form.Label>
        <Form.Control type="text" placeholder="Full name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Form.Select aria-label="Default select example">
        <option>Select role</option>
        <option value="developer">Developer</option>
        <option value="project manager">Project manager</option>
        <option value="admin">Admin</option>
      </Form.Select>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};
export default SignUp;
