import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/noteContext";
import { Editor } from "@tinymce/tinymce-react";
import { FiAlertTriangle } from "react-icons/fi";

const Ticket = ({ ticketCreateForm, onCancel }) => {
  const context = useContext(noteContext);
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const baseURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    project: "",
    title: "",
    description: "",
    assignedDev: undefined,
    status: undefined,
    dueDate: undefined,
    bugType: undefined,
    flag: undefined,
    severity: undefined,
    createdOn: "",
  });
  const projects = context.projects;
  const editorRef = useRef(null);
  const [ticket, setTicket] = useState();

  useEffect(() => {}, [ticket]);

  const handleSubmit = async (e) => {
    // console.log("submit called");
    e.preventDefault();

    if (!formData.project) {
      setError(`Please select a project`);
      setTimeout(() => {
        setError(null);
      }, 2000);
    } else if (!formData.title) {
      setError(`Title can not be empty`);
      setTimeout(() => {
        setError(null);
      }, 2000);
    } else {
      // console.log("proceeding to make post request");
      //no error, proceed to post request
      try {
        const res = await axios.post(`${baseURL}/server/bugs`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setTicket(res.data);
        // navigate(`/tickets/${ticket._id}`, {
        //   state: { ticketId: `${ticket._id}` },
        // });
        navigate(`/tickets/${res.data._id}`, {
          state: { ticketId: `${res.data._id}` },
        });
        cancel(); //to remove the form and the layout effects
      } catch (err) {
        console.log(err);
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
              setErrors([]);
            }, 2000);
          }
        } else {
          setError("Oops! Something went wrong!");
          setTimeout(() => {
            setError(null);
          }, 2000);
        }
      }
    }
  };
  const cancel = () => {
    ticketCreateForm(false);
    onCancel();
  };
  return (
    <div className="ticketCreateContainer py-10 bg-white overflow-y-scroll h-screen w-full sm:w-4/5 md:w-3/5 z-10 absolute right-0 top-0">
      <div className="capitalize font-semibold text-lg bg-white2 fixed w-full mb-4 px-4 py-2 z-10 top-0">
        new ticket
      </div>
      {errors.length !== 0
        ? errors[0].map((err) => {
            return (
              <div
                key={err.param}
                className="bg-red-500 p-3 fixed top-0 z-10 text-brightWhite mx-auto font-medium rounded-b-lg flex items-center"
              >
                <FiAlertTriangle className="mr-2 text-lg" />
                {err.msg}
              </div>
            );
          })
        : ""}
      {error ? (
        <div className="bg-red-500 p-3 fixed top-0 z-10 text-brightWhite mx-auto font-medium rounded-b-lg flex items-center">
          <FiAlertTriangle className="mr-2 text-lg" />
          {error}
        </div>
      ) : (
        " "
      )}
      <form className="">
        <div className="formContent px-4">
          <div className="projects-wrapper my-4">
            <label className="font-medium mb-2" htmlFor="project">
              Project <span className="text-brightOrange text-lg">*</span>
            </label>
            <select
              className="w-full capitalize border-veryLightWhite border rounded hover:border-brightOrange hover:cursor-pointer"
              defaultValue={"default"}
              onChange={(e) =>
                setFormData({ ...formData, project: e.target.value })
              }
            >
              <option value="default" className="capitalize" disabled>
                select project
              </option>
              ;
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
              className="ticket-title font-medium mb-2 capitalize"
              htmlFor="title"
            >
              ticket title <span className="text-brightOrange text-lg">*</span>
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
                setFormData({
                  ...formData,
                  description: e.target.getContent({ format: "text" }),
                })
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
        </div>
        <div className="buttons fixed bottom-0 w-full bg-brightWhite px-4 py-2">
          <button
            className="bg-brightOrange text-brightWhite rounded-full border-t
        py-1 px-8 hover:bg-orange-400 mr-6"
            type="submit"
            onClick={handleSubmit}
          >
            Add
          </button>
          <button
            className="rounded-full px-10 py-1 border-2 text-brightOrange"
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default Ticket;
