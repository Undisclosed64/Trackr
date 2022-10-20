import axios from "axios";
import { useState, useEffect } from "react";

const GetTickets = (props) => {
  const [projects, setProjects] = useState([]);
  const [ids, setIds] = useState([]);
  const [bugs, setBugs] = useState([]);
  const baseURL = "http://localhost:5000/server";
  const email = props.user.email;

  //get projects data and update projects arr
  useEffect(() => {
    const updateProjects = async () => {
      try {
        const res = await axios.get(`${baseURL}/projects`, {
          params: {
            email: email,
          },
        });
        return setProjects(res.data.projects);
      } catch {
        return null;
      }
    };
    updateProjects();
  }, [email]);

  //update ids
  useEffect(() => {
    if (null === projects) {
      return;
    }

    updateIds();
    console.log(ids);
  }, [projects]);

  //get bugs of all projects
  useEffect(() => {
    console.log(ids);

    const getBugs = async () => {
      try {
        await axios
          .get(`${baseURL}/bugs`, {
            params: {
              ids: ids,
            },
          })
          .then((response) => {
            console.log(response.data);
            setBugs(response.data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getBugs();
  }, [ids]);

  //set ids to project ids
  const updateIds = async () => {
    for (let i = 0; i < projects.length; i++) {
      setIds((ids) => [...ids, projects[i]._id]);
    }
  };

  console.log(bugs);
  if (!projects) return <div>Loading..</div>;

  return (
    <div>
      {bugs.map((project) => {
        return (
          <div key={project._id}>
            <h1>{project._id}</h1>

            {/* second loop */}
            {project.records.map((ticket) => {
              return (
                <div key={ticket._id}>
                  <h3>{ticket.title}</h3>
                  <div>{ticket.createdOn}</div>
                  <div>{ticket.assignedDev}</div>
                  <div>{ticket.dueDate}</div>
                  <div>{ticket.status}</div>
                  <div>{ticket.severity}</div>
                  <div>{ticket.project}</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default GetTickets;
