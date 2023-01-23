const LogOut = () => {
  return (
    <section className="flex items-center justify-center h-screen mx-2">
      <div className="wrapper p-4 bg-brightWhite rounded-md shadow h-64 w-full msm:w-1/2 mx-auto flex justify-center items-center flex-col">
        <div className="text-xl mb-4 text-center tracking-tight">
          Are you sure you want to logout?
        </div>

        <div className="options flex gap-3">
          <button className="rounded px-4 py-2 border text-brightOrange">
            Cancel
          </button>
          <button
            className="bg-brightOrange text-brightWhite rounded border
        py-2 px-4 hover:bg-orange-400"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};
export default LogOut;
