import React from "react";
import { useContext } from "react";
import noteContext from "../context/noteContext";
import { FiUser } from "react-icons/fi";

const Profile = () => {
  const context = useContext(noteContext);
  const user = context.user;
  console.log(user);
  if (!user) return <div>Loading..</div>;
  return (
    <div className="bg-profileBg h-96 pt-20 text-lightBlack3 flex flex-col justify-center items-center md:flex-row gap-2">
      <div className="img-wrapper bg-orange-100 p-2 items-center flex justify-center w-36 h-36 rounded-full border-[2px]">
        <FiUser className="text-5xl text-lightGray" />
      </div>
      <div className="info md:flex md:flex-col">
        <div className="name text-3xl font-medium">
          {user.firstName} {user.lastName}
        </div>
        <div className="text-xl text-lightGray pt-2">{user.email}</div>
      </div>
    </div>
  );
};

export default Profile;
