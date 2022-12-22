const GetActivites = ({ activities }) => {
  console.log(activities);
  return (
    <div className="">
      <div className="timeline bg-veryLightGray w-0.5 h-full shadow-lg mx-10 my-4">
        {activities.map((activity) => {
          return (
            <div className="circle">
              <div className="px-4 mb-8 w-fit lg:w-max ">
                <div className="text-lg">{activity.updatedField}</div>
                <div className="text-lightBlack">
                  on {new Date(activity.date).toDateString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default GetActivites;
