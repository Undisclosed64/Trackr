import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { BsInfoSquare } from "react-icons/bs";
import { IoIosArrowDropup } from "react-icons/io";
import ProjectDeleted from "./ProjectDeleted";

const ProjectDetails = () => {
  const { projectId } = useParams();
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

  //make the request
  useEffect(() => {
    axios
      .get(`${baseURL}/server/projects/${projectId}`)
      .then((response) => {
        console.log(response.data);
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
        setUpdatedMsg("Updated Successfully");
      }
      setTimeout(() => {
        setUpdatedMsg(null);
      }, 3000);
    } catch (err) {
      if (err.response) {
        console.log(err);
        setError(err.response.data.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
      } else {
        setError("Oops! Something went wrong!");
        setTimeout(() => {
          setError(null);
        }, 3000);
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
  if (projectNotFound) return <ProjectDeleted />;
  if (!title) return <div>loading...</div>;
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
      <section className="py-10 px-4 overflow-scroll h-screen lg:w-3/4 lg:mx-auto">
        <div className="view-edit-form text-black px-2">
          {updatedMsg ? (
            <div className="sucess-msg font-medium py-3 px-1 text-center text-brightWhite">
              {updatedMsg}
            </div>
          ) : (
            ""
          )}
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

          {error ? (
            <div className="font-medium text-brightWhite bg-red-500 py-3 px-1 text-center my-2">
              {error}
            </div>
          ) : (
            " "
          )}

          <input
            className="text-xl font-medium bg-transparent w-full border-none focus:bg-brightWhite mb-2 capitalize"
            type="text"
            name="title"
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="createdInfo flex gap-2 pl-3 mb-6 items-center text-lg">
            <div className=" text-lightGray border-r-2 pr-4">
              By {createdBy.username}
            </div>
            <div
              className="i-wrapper text-brightOrange hover:cursor-pointer p-2 rounded-full hover:bg-veryLightGray"
              onClick={showMoreInfo}
            >
              <BsInfoSquare className="moreInfo-icon" />
            </div>
            {showMore ? (
              <div
                className="more-info shadow bg-brightWhite flex justify-center items-center flex-col h-32 rounded-md absolute z-10 mx-auto w-5/6 md:w-1/3 top-36 left-8 md:right-80"
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
          <div className="status-wrapper shadow bg-brightWhite mb-4 px-2 py-3 msm:px-6">
            <div className="text-lg font-medium mb-2 flex items-center capitalize">
              <IoIosArrowDropup className="text-xl text-brightOrange mr-2" />
              Current status
            </div>

            <select
              name="status"
              className="border-none w-full msm:px-6"
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

          <div className="description-wrapper mb-4 bg-brightWhite px-2 py-3 shadow">
            <div className="text-lg font-medium mb-2 flex items-center">
              <IoIosArrowDropup className="text-xl text-brightOrange mr-2" />
              Description
            </div>
            {!close ? (
              <input
                className="border-none w-full pl-1 msm:px-6"
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

          <div className="project-info-wrapper bg-brightWhite px-2 py-3 mb-4">
            <div className="capitalize text-lg font-medium mb-3 flex items-center">
              <IoIosArrowDropup className="text-xl text-brightOrange mr-2" />
              project information
            </div>
            <div className="startDate-wrapper mb-3 border-b py-2 pl-1 msm:mx-6">
              <div className="capitalize pb-2 text-lightGray">start date</div>
              {new Date(startDate).toDateString()}
            </div>
            <div className="dueDate-wrapper mb-3 border-b py-2 pl-1 msm:mx-6">
              <div className="capitalize pb-2 text-lightGray">end date</div>
              {new Date(endDate).toDateString()}
            </div>
          </div>
          {/* <Form.Group className="mb-3">
            <Row>
              <Col>
                <Form.Label>Start date</Form.Label>
                <div>{new Date(startDate).toDateString()} </div>
                <Form.Control
                  type="date"
                  name="startDate"
                  onKeyDown={onKeyDown}
                  onBlur={onBlur}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>End date</Form.Label>
                <div>{new Date(endDate).toDateString()} </div>

                <Form.Control
                  type="date"
                  name="endDate"
                  onKeyDown={onKeyDown}
                  onBlur={onBlur}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group> */}

          {/* <Form.Label>Status</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="status"
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="In-progress">In-progress</option>
            <option value="To be tested">To be tested</option>
            <option value="Delayed">Delayed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Select> */}
        </div>
      </section>
      {/* )} */}
    </div>
  );
};

export default ProjectDetails;
