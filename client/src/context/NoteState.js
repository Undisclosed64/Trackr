import NoteContext from "./noteContext";
import axios from "axios";
import { useEffect, useState } from "react";

const NoteState = (props) => {
  const [username, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [user, setUser] = useState(null);
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
        setUser(response.data);
        const name = response.data.user.email.split("@")[0];
        setUserName(name);
        setEmail(response.data.user.email);
      });
  }, [user, token]);

  const checkSessionExpiration = (user) => {
    if (user) {
      const exp = user.exp;
      const now = Date.now() / 1000;
      if (now > exp) {
        console.log("session expired");
      }
    }
  };

  useEffect(() => {
    if (user) checkSessionExpiration(user);
  }, [user]);

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
    user: user,
  };

  return (
    <NoteContext.Provider value={state}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
