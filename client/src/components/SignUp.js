import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const SignUp = () => {
  const baseURL = "http://localhost:5000";
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleErrors = (err) => {
    // console.log(err.errors[0]);
    setErrors((errors) => [...errors, err.errors]);
    // console.log(errors);
  };

  const handleSubmit = async (e) => {
    // console.log(formData);
    e.preventDefault();

    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };
    try {
      const res = await axios.post(`${baseURL}/server/users`, newUser);
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
      handleErrors(error.response.data);
    }
  };
  const handleGoogleLogin = async () => {
    window.location = `${baseURL}/auth/google`;
  };

  return (
    <section className="flex flex-row justify-between">
      <div className="section-left hidden lg:block lg:w-2/5  h-screen bg-loginImg bg-bottom">
        <img
          src="https://images.unsplash.com/photo-1669279687951-0da28b1ce769?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=60"
          alt=""
        />
      </div>
      <div className="section-right py-4 sm:px-6 sm:py-12 sm:mx-auto md:flex justify-center md:w-3/5 ">
        <form
          className="signUpForm px-6 py-3 rounded"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1 className="text-3xl text-center font-bold text-lightBlack2 mb-2 capitalize">
            Sign up
          </h1>

          {errors.length !== 0
            ? errors[0].map((err) => {
                return (
                  <div key={err.param} className="error py-2">
                    {err.msg}
                  </div>
                );
              })
            : ""}
          <div className="inputs mt-8 mb-1">
            <div className="group flex gap-3">
              <input
                type="text"
                placeholder="First name"
                name="firstName"
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="form-input px-3 py-2 rounded w-full mb-6 text-base border-lightBlue1"
                required
              />
              <input
                type="text"
                placeholder="Last name"
                name="firstName"
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="form-input px-3 py-2 rounded w-full mb-6 text-base border-lightBlue1"
              />
            </div>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="form-input px-3 py-2 rounded w-full mb-6 text-base border-lightBlue1"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="form-input px-3 py-2 rounded w-full text-base border-lightBlue1 mb-6"
              required
            />
            <select
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="px-3 py-2 rounded w-full text-lightBlack2 text-base border-lightBlue1 mb-6"
            >
              <option name="role">Select role</option>
              <option value="developer">Developer</option>
              <option value="project manager">Project manager</option>
              <option value="admin">Admin</option>
            </select>

            <div className="button-wrapper flex justify-center my-2">
              <button
                type="submit"
                className="bg-brightRed py-2 rounded text-white w-full text-base font-medium uppercase"
              >
                sign up
              </button>
            </div>
            <div className="or text-lightBlack text-center text-lg my-4">
              Or
            </div>

            <div className="social-handles">
              <div className="google-wrapper flex justify-center w-full text-lightBlack py-2  mb-4 rounded font-medium hover:cursor-pointer">
                <FcGoogle className="text-2xl mr-3" />
                <div className="google" onClick={handleGoogleLogin}>
                  Continue with Google
                </div>
              </div>
            </div>

            <div className="signUpLinkInLogin mt-8 text-center text-lightBlack">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-brightRed underline
                 uppercase"
              >
                Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
export default SignUp;
