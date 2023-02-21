import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { BsInfoSquare } from "react-icons/bs";
import { IoIosArrowDropup } from "react-icons/io";
import ProjectDeleted from "./ProjectDeleted";
import { ActionMsg } from "./ActionMsg";
import SingleProjectTickets from "./SingleProjectTickets";
import GetActivites from "./GetActivities";
import Loader from "./Loader";
import ReverseActivitiesArr from "./ReverseActivitiesArr";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [updatedMsg, setUpdatedMsg] = useState(null);
  const [close, setClose] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";
  const token = localStorage.getItem("token");
  const [projectNotFound, setProjectNotFound] = useState(false);
  const [tickets, setTickets] = useState(false);
  const [details, setDetails] = useState(true);
  const [streamActive, setStreamActive] = useState(false);

  //make the request
  useEffect(() => {
    axios
      .get(`${baseURL}/server/projects/${projectId}`)
      .then((response) => {
        console.log(response.data);
        setProject(response.data);
        setId(response.data.id);
        setTitle(response.data.title);
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
        setDescription(response.data.description);
        setCreatedBy(response.data.createdBy);
        setStatus(response.data.status);
      })

      .catch((error) => {
        // setProjectNotFound(true);
        console.log(error);
      });
  }, [projectId]);

  const handleTicketsClick = () => {
    setTickets(true);
    setDetails(false);
  };
  const displayTickets = () => {
    setTickets(true);
    setDetails(false);
    setStreamActive(false);
    const ticketsBtn = document.querySelector(".tickets");
    console.log(ticketsBtn);
    ticketsBtn.classList.add("addUnderline");
    const detailsBtn = document.querySelector(".details");
    detailsBtn.classList.remove("addUnderline");
    const activityStreamBtn = document.querySelector(".activityStream");
    activityStreamBtn.classList.remove("addUnderline");
  };
  const displayDetails = () => {
    setDetails(true);
    setTickets(false);
    setStreamActive(false);

    const detailsBtn = document.querySelector(".details");
    detailsBtn.classList.add("addUnderline");
    const activityStreamBtn = document.querySelector(".activityStream");
    activityStreamBtn.classList.remove("addUnderline");
    const ticketsBtn = document.querySelector(".tickets");
    ticketsBtn.classList.remove("addUnderline");
  };
  const displayActivity = () => {
    setStreamActive(true);
    setDetails(false);
    setTickets(false);
    const activityStreamBtn = document.querySelector(".activityStream");
    activityStreamBtn.classList.add("addUnderline");
    const ticketsBtn = document.querySelector(".tickets");
    ticketsBtn.classList.remove("addUnderline");
    const detailsBtn = document.querySelector(".details");
    detailsBtn.classList.remove("addUnderline");
  };
  const detailsBtn = document.querySelector(".details");

  if (detailsBtn && !tickets && !streamActive) {
    detailsBtn.classList.add("addUnderline");
  }
  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  };
  const onBlur = async (event) => {
    const fieldName = event.target.name;
    let value = "";
    switch (fieldName) {
      case "title":
        value = event.target.value;
        break;
      case "createdBy":
        value = event.target.value;
        break;
      case "startDate":
        value = event.target.value;
        break;
      case "endDate":
        value = event.target.value;
        break;
      case "description":
        value = event.target.value;
        break;
      case "status":
        value = event.target.value;
        break;
      default:
        value = "";
    }

    try {
      const res = await axios.put(
        `${baseURL}/server/projects/${projectId}`,
        { fieldName, value, createdBy: createdBy },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setUpdatedMsg("Updated successfully");
      }
      setTimeout(() => {
        setUpdatedMsg(null);
      }, 2000);
    } catch (err) {
      if (err.response) {
        console.log(err);
        setError(err.response.data.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
      } else {
        setError("Oops! Something went wrong!");
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    }
  };
  const showMoreInfo = () => {
    !showMore ? setShowMore(true) : setShowMore(false);
  };
  const closeModal = () => {
    if (showMore) {
      setShowMore(false);
    }
  };

  // const showBugs = () => {
  //   navigate(`/projects/${project._id}/bugs`, {
  //     state: { projectId: `${project._id}` },
  //   });
  // };
  // const showActivites = () => {
  //   setDisplayActivities(true);
  // };
  // const showAlert = () => {
  //   setDeleteAlert(true);
  // };
  // const cancelDelete = () => {
  //   setDeleteAlert(false);
  // };
  // const deleteProject = async () => {
  //   try {
  //     await axios
  //       .delete(`/server/projects/${projectId}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         data: {
  //           projectOwnerEmail: createdBy.email,
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response.data);
  //         // setDeleteMsg(response.data.message);
  //       });
  //   } catch (err) {
  //     if (err.response) {
  //       console.log(err);
  //       setError(err.response.data.message);
  //       setTimeout(() => {
  //         setError(null);
  //       }, 3000);
  //     } else {
  //       setError("Oops! Something went wrong!");
  //       setTimeout(() => {
  //         setError(null);
  //       }, 3000);
  //     }
  //   }
  // };
  // const closeDropdown = () => {
  //   !close ? setClose(true) : setClose(false);
  // };
  console.log(project);
  if (projectNotFound) return <ProjectDeleted />;
  if (!project) return <Loader />;
  return (
    <div onClick={closeModal}>
      {/* {deleteAlert ? (
        <Modal.Dialog className="deletePopUp">
          <Modal.Header>
            <Modal.Title>
              This project will be deleted and it can not be recovered.
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to delete the project?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteProject}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      ) : ( */}
      <section className="py-14 overflow-scroll h-screen lg:w-3/4 toggler lg:px-10">
        <div className="view-edit-form text-black px-2 py-6">
          {updatedMsg ? <ActionMsg success={updatedMsg} /> : ""}
          {error ? <ActionMsg error={error} /> : " "}

          {/* <h3 onClick={showBugs}>Bugs</h3>
        <button onClick={showActivites}>Activity Stream</button>

        <Button variant="danger" id="deleteProject" onClick={showAlert}>
          Delete Project
        </Button> */}

          {/* {displayActivites ? (
          <GetActivites activities={project.trackActivities} />
        ) : (
          ""
        
        )} */}

          <div className="header flex flex-col mb-10">
            <div className="name-wrapper">
              <input
                className="text-xl lg:text-2xl font-medium 
            border-none mb-3
            capitalize"
                type="text"
                name="title"
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="header-info md:flex md:gap-3">
              <div
                className="status-wrapper bg-blue 
             py-0.5 text-white rounded-full flex justify-center w-24 mb-3 ml-3"
              >
                <div className="status ">{status}</div>
              </div>
              <span className="text-lightWhite hidden md:block">|</span>
              <div className="createdInfo flex gap-3 ml-3 md:ml-0 text-lg text-lightGray">
                <div className="">Owner: {createdBy.username}</div>
                <span className="text-lightWhite">|</span>
                <div
                  className="i-wrapper text-sm text-brightOrange hover:cursor-pointer p-2 rounded-full"
                  onClick={showMoreInfo}
                >
                  <BsInfoSquare className="moreInfo-icon" />
                </div>
                {showMore ? (
                  <div
                    className="more-info border bg-brightWhite flex justify-center items-center flex-col h-32 rounded-md absolute mx-auto w-5/6 md:w-1/3 top-36 left-8 md:right-80 mt-14 z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="pb-2 text-lightGray">Start date</div>
                    <div className="text-black">
                      {new Date(startDate).toDateString()}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="content-wrapper mx-3">
            <div className="option-headers flex gap-10 border-b-[1px] mb-10 text-lg">
              <div
                className="pb-2 hover:cursor-pointer details"
                onClick={displayDetails}
              >
                Details
              </div>
              <div
                className="tickets hover:cursor-pointer"
                onClick={displayTickets}
              >
                Tickets
              </div>
              <div
                className="activityStream hover:cursor-pointer widget capitalize"
                onClick={displayActivity}
              >
                activity stream
              </div>
            </div>
            {tickets ? <SingleProjectTickets id={projectId} /> : ""}

            {streamActive ? <ReverseActivitiesArr project={project} /> : ""}

            {details ? (
              <div className="details-wrapper bg-brightWhite px-2 py-4 border">
                <div className="description-wrapper mb-4 p-1">
                  <div className="text-lg font-medium mb-2 flex items-center">
                    <IoIosArrowDropup className="text-xl text-brightOrange mr-2" />
                    Description
                  </div>
                  {!close ? (
                    <input
                      className="border-none w-full pl-7 msm:px-6"
                      type="text"
                      name="description"
                      onKeyDown={onKeyDown}
                      onBlur={onBlur}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  ) : (
                    ""
                  )}
                </div>

                <div className="project-info-wrapper bg-brightWhite p-1">
                  <div className="capitalize text-lg font-medium mb-3 flex items-center">
                    <IoIosArrowDropup className="text-xl text-brightOrange mr-2" />
                    project information
                  </div>

                  <div className="status-wrapper mb-4 p-1 pl-1 msm:mx-6 border-b pb-2 hover:border-brightOrange">
                    <div className="pb-2 flex items-center capitalize text-lightGray">
                      Status
                    </div>

                    <select
                      name="status"
                      className="border-none w-full msm:w-1/5 pl-0 p-0"
                      onKeyDown={onKeyDown}
                      onBlur={onBlur}
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="in-progress">In-progress</option>
                      <option value="to be tested">To be tested</option>
                      <option value="delayed">Delayed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="startDate-wrapper mb-4 pl-1 msm:mx-6 border-b pb-2 hover:border-brightOrange">
                    <div className="capitalize pb-2 text-lightGray">
                      start date
                    </div>
                    {new Date(startDate).toDateString()}
                  </div>
                  <div className="dueDate-wrapper mb-4 py-2 pl-1 msm:mx-6 border-b pb-2 hover:border-brightOrange">
                    <div className="capitalize pb-2 text-lightGray">
                      end date
                    </div>
                    {new Date(endDate).toDateString()}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
