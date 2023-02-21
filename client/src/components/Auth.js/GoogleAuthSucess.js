import React from "react";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function GoogleAuthSucess() {
  const navigate = useNavigate();

  window.addEventListener("load", async function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get("accessToken");
    if (token) {
      // store the access token in local storage
      await localStorage.setItem("token", token);
      // redirect the user to the home page
      navigate("/home");
    }
  });

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className="mb-5 text-4xl font-medium">Signing you in..</div>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="orange"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
}
