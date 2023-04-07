import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import { FcGoogle } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import { ActionMsg } from "./ActionMsg";
import noteContext from "../context/noteContext";
import { TailSpin } from "react-loader-spinner";

const LogIn = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const context = useContext(noteContext);

  const handleGoogleLogin = async () => {
    window.location = `${baseURL}/auth/google`;
  };
  const demoUserLogin = async (e) => {
    setLoading(true); // set loading state to true before making request
    try {
      const res = await axios.post(`${baseURL}/server/log-in`, data, {
        params: {
          demoUser: true,
        },
      });
      // console.log(res.data);
      const token = res.data.accessToken;
      localStorage.removeItem("token"); // Remove old token from local storage
      localStorage.setItem("token", token);
      await context.refreshToken(token);
      await navigate("/home");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg);
        setTimeout(() => {
          setError(null);
        }, 1500);
        console.log(error);
      } else {
        setError("Oops! Something went wrong!");
        setTimeout(() => {
          setError(null);
        }, 1500);
      }
    } finally {
      setLoading(false); // set loading state to false after request completes
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "") {
      setError("Input field can not be empty");
      setTimeout(() => {
        setError(null);
      }, 1500);
      return;
    }
    setLoading(true); // set loading state to true before making request

    try {
      const res = await axios.post(`${baseURL}/server/log-in`, data);
      console.log(res.data);
      const token = res.data.accessToken;
      localStorage.removeItem("token"); // Remove old token from local storage
      localStorage.setItem("token", token);
      await context.refreshToken(token);
      await navigate("/home");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg);
        setTimeout(() => {
          setError(null);
        }, 1500);
        console.log(error);
      } else {
        setError("Oops! Something went wrong!");
        setTimeout(() => {
          setError(null);
        }, 1500);
      }
    } finally {
      setLoading(false); // set loading state to false after request completes
    }
  };
  return (
    <section className="loginPage flex flex-row justify-between bg-blue-500">
      <div className="section-left hidden lg:block lg:w-2/5 h-screen bg-loginImg bg-bottom">
        <img
          src="https://images.unsplash.com/photo-1669279687951-0da28b1ce769?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=60"
          alt=""
        />
      </div>

      <div className="section-right py-4 sm:px-6 sm:py-10 mx-auto md:flex justify-center items-center md:w-3/5">
        <form
          className="logInForm px-6 py-3 rounded"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1 className="text-3xl text-center font-bold text-lightBlack2 mb-2 ">
            Sign in to Trackr
          </h1>{" "}
          {error ? <ActionMsg error={error} /> : " "}
          <div className="inputs mt-8 mb-1">
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="form-input px-3 py-2 rounded w-full mb-6 text-base border-lightBlue1"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="form-input px-3 py-2 rounded w-full text-base border-lightBlue1"
            />
          </div>
          <p className="forgotPassword text-base text-right text-lightgray hover:text-blue-700 cursor-pointer">
            Forgot password?
          </p>
          <div className="button-wrapper flex justify-center my-2">
            {loading ? (
              <button
                type="submit"
                className="py-2 rounded text-white w-full text-base font-medium uppercase bg-brightRedLight justify-center flex items-center"
                disabled
              >
                <TailSpin
                  height="25"
                  width="25"
                  color="white"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                />
              </button>
            ) : (
              <button
                type="submit"
                className="bg-brightRed py-2 rounded text-white w-full text-base font-medium uppercase"
              >
                sign in
              </button>
            )}
            {/* <button
              type="submit"
              className="bg-brightRed py-2 rounded text-white w-full text-base font-medium uppercase hover:bg-brightRedLight"
            >
            </button> */}
          </div>
          <div className="or text-lightBlack text-center my-4">Or</div>
          <div className="social-handles">
            <div className="google-wrapper flex justify-center w-full text-lightBlack py-2  mb-6 rounded  hover:cursor-pointer">
              <FcGoogle className="text-2xl mr-3" />
              <div className="google" onClick={handleGoogleLogin}>
                Continue with Google
              </div>
            </div>
            <div className="demoSignIn-wrapper flex justify-center w-full text-lightBlack py-2  mb-6 rounded hover:cursor-pointer">
              <FaUserCircle className="text-2xl mr-3 text-blue" />
              <div className="twitter" onClick={demoUserLogin}>
                Sign in as demo user
              </div>
            </div>
          </div>
          <div className="signUpLinkInLogin mt-8 text-center text-base text-lightBlack">
            New to Trackr?{" "}
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
