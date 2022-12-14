import NoteContext from "./noteContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

const NoteState = (props) => {
  const [username, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [projects, setProjects] = useState([]);
  const baseURL = "http://localhost:5000";
  const token = localStorage.getItem("token");

  //get the logged in user
  useEffect(() => {
    axios
      .get(`${baseURL}/server/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const name = response.data.user.email.split("@")[0];
        setUserName(name);
        setEmail(response.data.user.email);
      });
  }, []);

  //get all projects
  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await axios.get(`${baseURL}/server/projects`, {
          params: {
            email: email,
          },
        });
        // console.log(res.data.projects);
        return setProjects(res.data.projects);
      } catch {
        return null;
      }
    };
    getProjects();
  }, [email]);

  const state = {
    userName: username,
    userEmail: email,
    projects: projects,
  };

  return (
    <NoteContext.Provider value={state}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
