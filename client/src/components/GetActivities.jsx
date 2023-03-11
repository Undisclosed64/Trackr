const GetActivites = ({ activities }) => {
  console.log(activities);
  return (
    <div className="timeline bg-veryLightGray w-0.5 h-full shadow-lg mx-14 my-4">
      {activities.map((activity) => {
        return (
          <div className="circle" key={activity._id}>
            <div className="px-4 mb-8 w-fit msm:w-80">
              <div className="">{activity.updatedField}</div>
              <div className="text-lightBlack">
                on {new Date(activity.date).toDateString()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default GetActivites;
