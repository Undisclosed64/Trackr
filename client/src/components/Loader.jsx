import { Bars } from "react-loader-spinner";

const Loader = () => {

  return (
    <div className="loader-container flex justify-center h-screen items-center">
      <div className="overlay"></div>
      <Bars
        height="80"
        width="80"
        color="#FF6400"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
export default Loader;
