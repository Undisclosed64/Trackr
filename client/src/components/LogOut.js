import { useState } from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    }
  };
  const handleCancelClick = () => {
    navigate(-1);
  };
  return (
    <section className="flex items-center justify-center h-screen mx-2">
      {success ? (
        <div className="bg-green-500 p-3 fixed top-0 z-10 text-brightWhite mx-auto font-medium rounded-b-lg flex items-center">
          <IoCheckmarkDoneCircle className="mr-2 text-lg" />
          Logged out successfully!
        </div>
      ) : (
        " "
      )}
      <div className="wrapper p-4 bg-brightWhite rounded-md shadow h-64 w-full msm:w-1/2 mx-auto flex justify-center items-center flex-col">
        <div className="text-xl mb-4 text-center tracking-tight">
          Are you sure you want to logout?
        </div>

        <div className="options flex gap-3">
          <button
            className="rounded px-5 py-2 border text-brightOrange"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button
            className="bg-brightOrange text-brightWhite rounded border
        py-2 px-5 hover:bg-orange-400"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};
export default LogOut;
