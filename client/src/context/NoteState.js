import NoteContext from "./noteContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

const NoteState = (props) => {
  const [user, setUser] = useState(null);
  const baseURL = "http://localhost:5000/server";
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${baseURL}/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const name = response.data.user.email.split("@")[0];
        setUser(name);
      });
  }, []);

  const state = {
    userName: user,
  };
  return (
    <NoteContext.Provider value={state}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
