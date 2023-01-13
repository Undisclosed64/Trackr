import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect, useContext, useRef } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/noteContext";
import { Editor } from "@tinymce/tinymce-react";

const Ticket = () => {
  const context = useContext(noteContext);
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const baseURL = "http://localhost:5000";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedDev: "Unassigned",
    bugType: "",
    flag: "",
    severity: "",
    status: "",
    dueDate: "",
    createdOn: "",
    project: "",
  });
  const [ticket, setTicket] = useState();
  const projects = context.projects;

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  // useEffect(() => {

  //   axios
  //     .get(`${baseURL}/server/projects`, {
  //       params: {
  //         email: email,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       setProjects(response.data.projects);
  //     });
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseURL}/server/bugs`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setTicket(res.data);
      // console.log(ticket._id);
      navigate(`/tickets/${ticket._id}`, {
        state: { ticketId: `${ticket._id}` },
      });
    } catch (err) {
      // console.log(err.response.data.message);
      if (err.response) {
        // console.log(err.response.data);
        if (err.response.data.message) {
          setError(err.response.data.message);
          setTimeout(() => {
            setError(null);
          }, 2000);
        } else {
          setErrors((errors) => [...errors, err.response.data.errors]);
          setTimeout(() => {
            setErrors(null);
          }, 2000);
        }
      } else {
        setError("Oops! Something went wrong!");
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    }
  };

  return (
    <div className="px-4 py-3 bg-brightWhite overflow-y-scroll h-screen float-right w-full sm:w-4/5 md:w-3/5">
      <div className="capitalize font-semibold text-lg mb-4">new ticket</div>
      {errors.length !== 0
        ? errors[0].map((err) => {
            return (
              <div
                key={err.param}
                className="bg-red-500 p-3 fixed top-0 z-10 text-brightWhite mx-auto font-medium rounded-b-lg"
              >
                {err.msg}
              </div>
            );
          })
        : ""}
      {error ? (
        <div className="bg-red-500 p-3 fixed top-0 z-10 text-brightWhite mx-auto font-medium rounded-b-lg">
          {error}
        </div>
      ) : (
        " "
      )}
      <form className="" onSubmit={handleSubmit}>
        <div className="projects-wrapper my-4">
          <label className="font-medium mb-2" htmlFor="project">
            Project
          </label>
          <select
            className="w-full capitalize border-veryLightWhite border rounded hover:border-brightOrange hover:cursor-pointer"
            onChange={(e) =>
              setFormData({ ...formData, project: e.target.value })
            }
          >
            {projects.map((project) => {
              return (
                <option value={project._id} key={project._id}>
                  {project.title}
                </option>
              );
            })}
          </select>
        </div>

        <div className="title-wrapper flex flex-col my-4">
          <label
            class=" ticket-title font-medium mb-2 capitalize"
            htmlFor="title"
          >
            ticket title
          </label>
          <input
            type="text"
            className="border-veryLightWhite border rounded hover:border-brightOrange"
            name="title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="description-wrapper my-4">
          <label htmlFor="description" className="font-medium mb-2">
            Description
          </label>
          <Editor
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className=""
            name="description"
            apiKey="g7djnctfldrwo1kkuj9879hlsnhu0t6swgxn1ri31eikvoa1"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>

        <div className="assigned-wrapper my-4 flex flex-col">
          <label className="font-medium mb-2 capitalize" htmlFor="project">
            assigned to
          </label>
          <input
            type="text"
            className="border-veryLightWhite border rounded"
            name="assignedDev"
            onChange={(e) =>
              setFormData({ ...formData, assignedDev: e.target.value })
            }
          />
        </div>
        <div className="my-4 flex flex-wrap">
          <div className="status-wrapper w-full msm:w-1/2 msm:pr-4 mb-4">
            <label
              className="block font-medium mb-2 capitalize"
              htmlFor="status"
            >
              Status
            </label>
            <select
              className="w-full border-veryLightWhite border rounded"
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="open">Open</option>
              <option value="in-progress">In-progress</option>
              <option value="to be tested">To be tested</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="dueDate-wrapper w-full msm:w-1/2">
            <label
              className="block font-medium mb-2 capitalize"
              htmlFor="dueDate"
            >
              due date
            </label>
            <input
              type="date"
              className="w-full border-veryLightWhite border rounded"
              name="dueDate"
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </div>
        </div>
        <div className="my-4 flex flex-wrap">
          <div className="flag-wrapper w-full msm:w-1/2 msm:pr-4 mb-4 msm:mb-0">
            <label className="block font-medium mb-2" htmlFor="flag">
              Flag
            </label>
            <select
              className="w-full border-veryLightWhite border rounded"
              onChange={(e) =>
                setFormData({ ...formData, flag: e.target.value })
              }
            >
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </select>
          </div>

          <div className="severity-wrapper w-full msm:w-1/2">
            <label className="block font-medium mb-2" htmlFor="severity">
              Severity
            </label>
            <select
              className="w-full border-veryLightWhite border rounded"
              onChange={(e) =>
                setFormData({ ...formData, severity: e.target.value })
              }
            >
              <option value="critical">Critical</option>
              <option value="major">Major</option>
              <option value="minor">Minor</option>
            </select>
          </div>
        </div>
        <div className="buttons absolute bottom-4">
          <button
            className="bg-brightOrange text-brightWhite rounded-full 
        py-1 px-8 hover:bg-orange-400 mr-6"
            type="submit"
          >
            Add
          </button>
          <button className="rounded-full px-10 py-1 border-2 text-brightOrange">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default Ticket;
