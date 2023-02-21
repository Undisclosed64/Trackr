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
    <section className="bg-profileBg h-96 pt-20 text-lightBlack3">
      <div className="header pt-10 flex flex-col justify-center items-center md:flex-row gap-2 pb-4">
        <div className="img-wrapper bg-orange-100 p-2 items-center flex justify-center w-32 h-32 rounded-full border-[2px]">
          <FiUser className="text-4xl text-lightGray" />
        </div>
        <div className="info md:flex md:flex-col md:pl-4">
          <div className="name text-3xl font-bold capitalize">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-lg font-medium text-brightOrange pt-2 capitalize">
            {user.role}
          </div>
        </div>
      </div>
      <div className="mt-8 flex text-lg bg-brightWhite drop-shadow md:w-1/2 px-2 py-4 h-1/2 mx-4 rounded justify-center md:mx-auto">
        <span className="text-lightGray font-medium mr-4">E-mail: </span>
        <div className="">{user.email}</div>
      </div>
    </section>
  );
};

export default Profile;
