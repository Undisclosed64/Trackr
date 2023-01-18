import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
import { Editor } from "@tinymce/tinymce-react";

const CreateProject = ({ projectCreateForm }) => {
  const [formData, setFormData] = useState({
    title: undefined,
    startDate: undefined,
    endDate: undefined,
    description: undefined,
    status: undefined,
  });
  const editorRef = useRef(null);

  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.description);
    const token = localStorage.getItem("token");
    console.log(token);
    if (!formData.title) {
      setError(`Title can not be empty`);
      setTimeout(() => {
        setError(null);
      }, 2000);
    } else if (!formData.endDate) {
      setError(`Please provide a end date`);
      setTimeout(() => {
        setError(null);
      }, 2000);
    } else
      try {
        console.log(formData.description);
        const res = await axios.post(`${baseURL}/server/projects`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        navigate(`/projects/${res.data._id}`);
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
  };

  const cancel = () => {
    projectCreateForm(false);
  };
  return (
    <div className="projectCreateContainer py-10 bg-white overflow-y-scroll h-screen w-full sm:w-4/5 md:w-3/5 z-10 absolute right-0 top-0">
      <div className="capitalize font-semibold text-lg bg-white2 fixed w-full mb-4 px-4 py-2 z-10 top-0">
        new project
      </div>
      {errors.length !== 0
        ? errors[0].map((err) => {
            return (
              <div
                key={err.param}
                className=" bg-red-500 p-3 fixed top-0 z-10 text-brightWhite mx-auto font-medium rounded-b-lg flex items-center"
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
      <form className="" onSubmit={handleSubmit}>
        <div className="formContent px-4">
          <div className="title-wrapper my-4 flex flex-col">
            <label className="font-medium mb-2 capitalize" htmlFor="project">
              Project title <span className="text-brightOrange text-lg">*</span>
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
          <div className="description-wrapper my-4 ">
            <label htmlFor="description" className="font-medium mb-2">
              Description
            </label>
            <Editor
              className=""
              name="description"
              apiKey="g7djnctfldrwo1kkuj9879hlsnhu0t6swgxn1ri31eikvoa1"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.getContent({ format: "text" }),
                })
              }
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

          <div className="status-wrapper my-4">
            <label className="font-medium mb-2" htmlFor="status">
              Status
            </label>
            <select
              className="w-full border-veryLightWhite border rounded"
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="active">Active</option>
              <option value="in-progress">In-progress</option>
              <option value="to be tested">To be tested</option>
              <option value="delayed">Delayed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="my-4 flex flex-wrap">
            <div className="startDate-wrapper w-full msm:w-1/2 msm:pr-4 mb-4">
              <label
                className="block font-medium mb-2 capitalize"
                htmlFor="startDate"
              >
                start date
              </label>
              <input
                type="date"
                className="w-full border-veryLightWhite border rounded"
                name="startDate"
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>

            <div className="endDate-wrapper w-full msm:w-1/2">
              <label
                className="block font-medium mb-2 capitalize"
                htmlFor="endate"
              >
                end date <span className="text-brightOrange text-lg">*</span>
              </label>
              <input
                type="date"
                className="w-full border-veryLightWhite border rounded"
                name="dueDate"
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="buttons fixed bottom-0 w-full bg-brightWhite px-4 py-2">
          <button
            className="bg-brightOrange text-brightWhite rounded-full py-1 px-8 hover:bg-orange-400 mr-6"
            type="submit"
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
export default CreateProject;
