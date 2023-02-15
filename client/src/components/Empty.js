import emptyList from "../assets/emptyList.png";

const Empty = () => {
  return (
    <section className="empty-wrapper flex justify-center items-center h-screen flex-col px-4 text-lightGray gap-2">
      <img src={emptyList} alt="emptyList" className="md:w-1/4" />
      <div className="text-lg font-medium text-center">
        Looks like you don't have any project yet.
      </div>
      <p className="text-center">Add a project to track it.</p>
    </section>
  );
};
export default Empty;
