import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { FcGoogle } from "react-icons/fc";
import { BsTwitter } from "react-icons/bs";

const LogIn = () => {
  const baseURL = "http://localhost:5000/server";

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "") {
      setError("Input field can not be empty!");
      return;
    }
    try {
      const res = await axios.post(`${baseURL}/log-in`, data);
      console.log(res.data);
      const token = res.data.accessToken;
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg);
        //console.log(error);
      } else {
        setError("Oops! Something went wrong!");
        //console.log("Oops! Something went wrong!");
      }
    }
  };
  return (
    <section className="loginPage flex flex-row justify-between ">
      <div className="section-left hidden lg:block lg:w-2/5  h-screen bg-loginImg bg-bottom">
        <img
          src="https://images.unsplash.com/photo-1669279687951-0da28b1ce769?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=60"
          alt=""
        />
      </div>

      <div className="section-right py-4 sm:px-6 sm:py-12 sm:mx-auto md:flex justify-center md:w-3/5 ">
        <form
          className="logInForm px-4 py-3 rounded"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1 className="text-3xl text-center font-bold text-lightBlack2 mb-2 ">
            Sign in to BugTracker
          </h1>
          {error ? <div className="error py-2">{error}</div> : " "}

          <div className="inputs mt-8 mb-1">
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="form-input px-3 py-2 rounded w-full mb-6 text-base"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="form-input px-3 py-2 rounded w-full text-base"
              required
            />
          </div>
          <p className="forgotPassword text-base text-right text-lightgray hover:text-blue-700 cursor-pointer">
            Forgot password?
          </p>
          <div className="button-wrapper flex justify-center mt-2 mb-2">
            <button
              type="submit"
              className="bg-brightRed py-2 rounded text-white w-full text-base font-medium"
            >
              Sign In
            </button>
          </div>
          <div className="or text-lightBlack text-center text-lg my-6">OR</div>

          <div className="social-handles">
            <div className="google-wrapper flex justify-center w-full text-lightBlack py-2  mb-6 rounded font-medium">
              <FcGoogle className="text-2xl mr-3" />
              <div className="google">Continue with Google</div>
            </div>
            <div className="twitter-wrapper flex justify-center w-full text-lightBlack py-2  mb-6 rounded font-medium">
              <BsTwitter className="text-2xl mr-3 text-blue" />
              <div className="twitter">Continue with Twitter</div>
            </div>
          </div>

          <div className="signUpLinkInLogin mt-8 text-center text-base text-lightBlack">
            New to BugTracker?{" "}
            <Link to="/sign-up" className="text-brightRed underline">
              SIGN UP
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
