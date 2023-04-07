const TicketActivites = ({ activities }) => {
  console.log(activities);
  return (
    <div>
      {activities.map((activity) => {
        return (
          <div key={activity._id}>
            <div>{new Date(activity.date).toDateString()}</div>
            <div>{activity.updatedField}</div>
          </div>
        );
      })}
    </div>
  );
};
export default TicketActivites;
